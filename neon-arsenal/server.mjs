import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import {
  BOSSES,
  BOT_TARGET_COUNT,
  SHAPES,
  SHAPE_TARGET_COUNT,
  SNAPSHOT_RATE,
  STAT_PRESETS,
  TANKS,
  TICK_RATE,
  WORLD,
  angleTo,
  availableUpgrades,
  canUpgradeTank,
  clamp,
  derivedStats,
  distance,
  levelForXp,
  makeId,
  makeStats,
  maxStatForTank,
  rand,
  sanitizeName,
  spentStats,
  statPointsForLevel,
  validateClientMessage,
} from "./shared.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PORT = Number(process.env.PORT || 8787);
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const state = {
  startedAt: Date.now(),
  tick: 0,
  players: new Map(),
  sockets: new Map(),
  bullets: [],
  drones: [],
  shapes: [],
  bosses: [],
  killFeed: [],
  bossAlert: "",
  bossTimer: 75,
};

function safePath(url) {
  const path = decodeURIComponent(new URL(url, `http://localhost:${PORT}`).pathname);
  const target = path === "/" ? "index.html" : path.replace(/^\/+/, "");
  const full = normalize(join(__dirname, target));
  return full.startsWith(normalize(__dirname)) ? full : join(__dirname, "index.html");
}

const server = http.createServer(async (req, res) => {
  try {
    const path = safePath(req.url || "/");
    const body = await readFile(path);
    res.writeHead(200, { "content-type": MIME[extname(path)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
});

let WebSocketServer = null;
try {
  ({ WebSocketServer } = await import("ws"));
} catch {
  console.warn("Install dependencies with `npm install` for multiplayer WebSockets. Static practice mode will still load.");
}

if (WebSocketServer) {
  const wss = new WebSocketServer({ server });
  wss.on("connection", (ws) => {
    const id = makeId("p");
    const player = createPlayer(id, "Pilot");
    state.players.set(id, player);
    state.sockets.set(id, ws);
    send(ws, { type: "welcome", id, world: WORLD, tickRate: TICK_RATE });
    broadcastEvent(`${player.name} entered the arena.`);

    ws.on("message", (raw) => {
      let message = null;
      try {
        message = JSON.parse(String(raw));
      } catch {
        return;
      }
      if (!validateClientMessage(message)) return;
      handleMessage(id, message, ws);
    });

    ws.on("close", () => {
      state.sockets.delete(id);
      state.players.delete(id);
      broadcastEvent(`${player.name} disconnected.`);
    });
  });
}

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Neon Arsenal Arena running at http://127.0.0.1:${PORT}/`);
});

function send(ws, payload) {
  if (ws.readyState === 1) ws.send(JSON.stringify(payload));
}

function broadcast(payload) {
  const text = JSON.stringify(payload);
  for (const ws of state.sockets.values()) {
    if (ws.readyState === 1) ws.send(text);
  }
}

function broadcastEvent(text) {
  state.killFeed.unshift({ id: makeId("feed"), text, t: Date.now() });
  state.killFeed = state.killFeed.slice(0, 8);
}

function createPlayer(id, name, bot = false) {
  const pos = randomSpawn();
  return {
    id,
    name: sanitizeName(name),
    bot,
    x: pos.x,
    y: pos.y,
    vx: 0,
    vy: 0,
    aim: rand(-Math.PI, Math.PI),
    input: { mx: 0, my: 0, firing: false, repel: false, autoFire: bot, autoSpin: false },
    tank: "basic",
    stats: makeStats(),
    xp: 0,
    level: 1,
    score: 0,
    health: 100,
    respawn: 0,
    invuln: 2.4,
    lastDamageAt: 0,
    reloads: [],
    autoReloads: [],
    kills: 0,
    deaths: 0,
    targetId: null,
    botTurn: 0,
  };
}

function randomSpawn() {
  return { x: rand(160, WORLD.w - 160), y: rand(160, WORLD.h - 160) };
}

function handleMessage(id, message, ws) {
  const player = state.players.get(id);
  if (!player) return;
  if (message.type === "join") {
    player.name = sanitizeName(message.name);
    send(ws, { type: "joined", id });
  } else if (message.type === "input") {
    player.input.mx = clamp(Number(message.mx) || 0, -1, 1);
    player.input.my = clamp(Number(message.my) || 0, -1, 1);
    player.input.firing = Boolean(message.firing);
    player.input.repel = Boolean(message.repel);
    player.input.autoFire = Boolean(message.autoFire);
    player.input.autoSpin = Boolean(message.autoSpin);
    player.aim = Number(message.aim) || 0;
  } else if (message.type === "upgradeStat") {
    applyStatUpgrade(player, message.stat);
  } else if (message.type === "upgradeTank") {
    applyTankUpgrade(player, message.tank);
  } else if (message.type === "preset") {
    applyPreset(player, message.preset);
  } else if (message.type === "ping") {
    send(ws, { type: "pong", now: message.now, serverNow: Date.now() });
  }
}

function applyStatUpgrade(player, stat) {
  if (player.respawn > 0 || spentStats(player.stats) >= statPointsForLevel(player.level)) return false;
  if ((player.stats[stat] || 0) >= maxStatForTank(player.tank, stat)) return false;
  player.stats[stat] = (player.stats[stat] || 0) + 1;
  return true;
}

function applyPreset(player, presetId) {
  const preset = STAT_PRESETS[presetId];
  if (!preset) return;
  for (let guard = 0; guard < 40; guard += 1) {
    let changed = false;
    for (const [stat, target] of Object.entries(preset.stats)) {
      if ((player.stats[stat] || 0) < target && applyStatUpgrade(player, stat)) changed = true;
    }
    if (!changed) break;
  }
}

function applyTankUpgrade(player, tankId) {
  if (!canUpgradeTank(player, tankId)) return false;
  player.tank = tankId;
  player.reloads = [];
  player.autoReloads = [];
  const derived = derivedStats(player);
  player.health = Math.min(derived.maxHealth, player.health + derived.maxHealth * 0.22);
  for (const key of Object.keys(player.stats)) {
    const cap = maxStatForTank(tankId, key);
    if (player.stats[key] > cap) player.stats[key] = cap;
  }
  return true;
}

function ensureBots() {
  const bots = [...state.players.values()].filter((p) => p.bot);
  const humans = [...state.players.values()].filter((p) => !p.bot);
  const target = humans.length ? BOT_TARGET_COUNT : 7;
  while (bots.length < target) {
    const bot = createPlayer(makeId("bot"), botName(), true);
    bot.xp = rand(0, 4600);
    bot.level = levelForXp(bot.xp);
    bot.health = derivedStats(bot).maxHealth;
    state.players.set(bot.id, bot);
    bots.push(bot);
  }
  while (bots.length > target) {
    const bot = bots.pop();
    if (bot) state.players.delete(bot.id);
  }
}

function botName() {
  const left = ["Vector", "Nova", "Ion", "Pulse", "Prism", "Vanta", "Orbit", "Flux", "Kairo", "Echo"];
  const right = ["Ace", "Drift", "Crown", "Wing", "Lancer", "Ghost", "Core", "Rift", "Pilot", "Byte"];
  return `${left[Math.floor(rand(0, left.length))]} ${right[Math.floor(rand(0, right.length))]}`;
}

function ensureShapes() {
  const nest = { x: WORLD.w / 2, y: WORLD.h / 2 };
  while (state.shapes.length < SHAPE_TARGET_COUNT) {
    const roll = Math.random();
    const nearNest = roll > 0.74;
    const type = nearNest
      ? roll > 0.985 ? "alphaPentagon" : roll > 0.93 ? "largeCrasher" : roll > 0.86 ? "smallCrasher" : "pentagon"
      : roll < 0.006 ? "greenPentagon" : roll < 0.018 ? "greenTriangle" : roll < 0.035 ? "greenSquare" : roll < 0.62 ? "square" : roll < 0.88 ? "triangle" : "pentagon";
    const def = stateShapeDef(type);
    const angle = rand(0, Math.PI * 2);
    const radius = nearNest ? rand(120, 620) : 0;
    const pos = nearNest ? { x: nest.x + Math.cos(angle) * radius, y: nest.y + Math.sin(angle) * radius } : randomSpawn();
    state.shapes.push({
      id: makeId("shape"),
      type,
      x: clamp(pos.x, 80, WORLD.w - 80),
      y: clamp(pos.y, 80, WORLD.h - 80),
      vx: rand(-def.drift, def.drift),
      vy: rand(-def.drift, def.drift),
      hp: def.hp,
      maxHp: def.hp,
      spin: rand(0, Math.PI),
    });
  }
}

function stateShapeDef(type) {
  return SHAPES[type];
}

function step(dt) {
  state.tick += 1;
  ensureBots();
  ensureShapes();
  stepBossTimer(dt);
  stepPlayers(dt);
  stepBullets(dt);
  stepDrones(dt);
  stepShapes(dt);
  stepBosses(dt);
}

function stepBossTimer(dt) {
  state.bossTimer -= dt;
  if (state.bossTimer <= 0 && state.bosses.length < 2) {
    const ids = Object.keys(BOSSES);
    const type = ids[Math.floor(rand(0, ids.length))];
    const def = BOSSES[type];
    const pos = randomSpawn();
    state.bosses.push({ id: makeId("boss"), type, x: pos.x, y: pos.y, hp: def.hp, maxHp: def.hp, reload: 1, targetId: null, spin: 0 });
    state.bossAlert = `${def.name} has breached the arena.`;
    broadcastEvent(state.bossAlert);
    state.bossTimer = rand(92, 150);
  }
}

function stepPlayers(dt) {
  const players = [...state.players.values()];
  for (const player of players) {
    if (player.bot) steerBot(player, players);
    const d = derivedStats(player);
    if (player.respawn > 0) {
      player.respawn -= dt;
      if (player.respawn <= 0) respawnPlayer(player);
      continue;
    }
    player.invuln = Math.max(0, player.invuln - dt);
    const len = Math.hypot(player.input.mx, player.input.my) || 1;
    const speed = d.moveSpeed * (player.input.repel ? 0.92 : 1);
    player.vx = (player.input.mx / len) * speed;
    player.vy = (player.input.my / len) * speed;
    player.x = clamp(player.x + player.vx * dt, 35, WORLD.w - 35);
    player.y = clamp(player.y + player.vy * dt, 35, WORLD.h - 35);

    if (Date.now() - player.lastDamageAt > 30000) {
      player.health = Math.min(d.maxHealth, player.health + d.regenPerSecond * dt * 7);
    } else if (d.activeRegenPerSecond) {
      player.health = Math.min(d.maxHealth, player.health + d.activeRegenPerSecond * dt);
    }
    if (player.input.firing || player.input.autoFire || player.bot) fireTank(player, dt);
    fireAutoTurrets(player, dt);
  }
  collideBodies(players, dt);
}

function steerBot(bot, players) {
  bot.botTurn -= 1 / TICK_RATE;
  if (bot.botTurn <= 0 || !bot.targetId) {
    const candidates = [...state.shapes, ...players.filter((p) => p.id !== bot.id && p.respawn <= 0), ...state.bosses];
    candidates.sort((a, b) => distance(bot, a) - distance(bot, b));
    bot.targetId = candidates[0]?.id || null;
    bot.botTurn = rand(0.4, 1.5);
  }
  const target = findEntity(bot.targetId) || { x: WORLD.w / 2, y: WORLD.h / 2 };
  bot.aim = angleTo(bot, target);
  const keep = distance(bot, target) < 340 ? -1 : 1;
  bot.input.mx = Math.cos(bot.aim) * keep + rand(-0.35, 0.35);
  bot.input.my = Math.sin(bot.aim) * keep + rand(-0.35, 0.35);
  bot.input.firing = true;
  if (bot.level >= 15 && availableUpgrades(bot).length) applyTankUpgrade(bot, availableUpgrades(bot)[0]);
  const preset = bot.tank.includes("Smasher") || TANKS[bot.tank]?.smasher ? "ram" : bot.tank.includes("over") ? "drone" : "storm";
  applyPreset(bot, preset);
}

function findEntity(id) {
  return state.players.get(id) || state.shapes.find((s) => s.id === id) || state.bosses.find((b) => b.id === id);
}

function fireTank(player, dt) {
  const tank = TANKS[player.tank] || TANKS.basic;
  const d = derivedStats(player);
  player.reloads.length = Math.max(player.reloads.length, tank.barrels.length);
  tank.barrels.forEach((barrel, index) => {
    player.reloads[index] = Math.max(0, (player.reloads[index] || 0) - dt);
    if (player.reloads[index] > 0) return;
    const cooldown = 0.58 / d.reload / (barrel.reload || 1);
    player.reloads[index] = cooldown;
    const shots = barrel.pellets || 1;
    for (let i = 0; i < shots; i += 1) {
      spawnShot(player, barrel, i, shots, d);
    }
  });
}

function spawnShot(player, barrel, pelletIndex, pellets, d) {
  const spread = (barrel.spread || 0) * (pellets > 1 ? (pelletIndex / Math.max(1, pellets - 1) - 0.5) * 2 : rand(-0.5, 0.5));
  const angle = player.aim + (barrel.angle || 0) + spread + rand(-0.025, 0.025);
  const side = barrel.offset || 0;
  const sx = player.x + Math.cos(player.aim + Math.PI / 2) * side + Math.cos(angle) * (derivedStats(player).radius + (barrel.length || 48) * 0.45);
  const sy = player.y + Math.sin(player.aim + Math.PI / 2) * side + Math.sin(angle) * (derivedStats(player).radius + (barrel.length || 48) * 0.45);
  if (barrel.type === "drone") {
    const tank = TANKS[player.tank] || TANKS.basic;
    const owned = state.drones.filter((drone) => drone.ownerId === player.id);
    if (owned.length >= (tank.droneLimit || 8)) return;
    state.drones.push({ id: makeId("drone"), ownerId: player.id, x: sx, y: sy, vx: Math.cos(angle) * 100, vy: Math.sin(angle) * 100, hp: d.penetration * (barrel.size || 1), maxHp: d.penetration * (barrel.size || 1), damage: d.bulletDamage * (barrel.damage || 1.2), radius: 15 * (barrel.size || 1), life: 16 });
    return;
  }
  const isTrap = barrel.type === "trap";
  state.bullets.push({
    id: makeId(isTrap ? "trap" : "bullet"),
    ownerId: player.id,
    x: sx,
    y: sy,
    vx: Math.cos(angle) * d.bulletSpeed * (barrel.speed || 1),
    vy: Math.sin(angle) * d.bulletSpeed * (barrel.speed || 1),
    hp: d.penetration * (barrel.size || 1),
    damage: d.bulletDamage * (barrel.damage || 1),
    radius: (isTrap ? 13 : 8) * (barrel.size || 1),
    life: isTrap ? 8 : 2.4,
    trap: isTrap,
    spin: rand(0, Math.PI),
  });
  player.vx -= Math.cos(angle) * (barrel.recoil || 1) * 7;
  player.vy -= Math.sin(angle) * (barrel.recoil || 1) * 7;
}

function fireAutoTurrets(player, dt) {
  const tank = TANKS[player.tank] || TANKS.basic;
  const count = tank.autoTurrets || 0;
  if (!count) return;
  const d = derivedStats(player);
  player.autoReloads.length = Math.max(player.autoReloads.length, count);
  for (let i = 0; i < count; i += 1) {
    player.autoReloads[i] = Math.max(0, (player.autoReloads[i] || 0) - dt);
    if (player.autoReloads[i] > 0) continue;
    const target = nearestEnemy(player, 720);
    if (!target) continue;
    player.autoReloads[i] = 0.52 / d.reload;
    spawnShot({ ...player, aim: angleTo(player, target) + i * 0.02 }, { ...TANKS.basic.barrels[0], damage: 0.55, size: 0.76, recoil: 0.1 }, 0, 1, d);
  }
}

function nearestEnemy(player, range) {
  const entities = [...state.shapes, ...state.bosses, ...state.players.values()].filter((e) => e.id !== player.id && e.respawn <= 0);
  let best = null;
  let bestDist = range;
  for (const entity of entities) {
    const d = distance(player, entity);
    if (d < bestDist) {
      best = entity;
      bestDist = d;
    }
  }
  return best;
}

function stepBullets(dt) {
  for (const bullet of state.bullets) {
    bullet.life -= dt;
    if (bullet.trap) {
      bullet.vx *= 0.91;
      bullet.vy *= 0.91;
      bullet.spin += dt * 3;
    }
    bullet.x += bullet.vx * dt;
    bullet.y += bullet.vy * dt;
    hitEntities(bullet);
  }
  state.bullets = state.bullets.filter((b) => b.life > 0 && b.hp > 0 && b.x > -100 && b.y > -100 && b.x < WORLD.w + 100 && b.y < WORLD.h + 100);
}

function stepDrones(dt) {
  for (const drone of state.drones) {
    const owner = state.players.get(drone.ownerId);
    if (!owner || owner.respawn > 0) {
      drone.life = 0;
      continue;
    }
    drone.life -= dt;
    const target = owner.input.repel ? { x: owner.x - Math.cos(owner.aim) * 360, y: owner.y - Math.sin(owner.aim) * 360 } : owner.input.firing || owner.input.autoFire || owner.bot ? { x: owner.x + Math.cos(owner.aim) * 520, y: owner.y + Math.sin(owner.aim) * 520 } : orbitPoint(owner, drone);
    const a = angleTo(drone, target);
    drone.vx = drone.vx * 0.88 + Math.cos(a) * 46;
    drone.vy = drone.vy * 0.88 + Math.sin(a) * 46;
    const speed = Math.hypot(drone.vx, drone.vy);
    if (speed > 360) {
      drone.vx = drone.vx / speed * 360;
      drone.vy = drone.vy / speed * 360;
    }
    drone.x += drone.vx * dt;
    drone.y += drone.vy * dt;
    hitEntities(drone);
  }
  state.drones = state.drones.filter((d) => d.life > 0 && d.hp > 0);
}

function orbitPoint(owner, drone) {
  const a = Date.now() / 700 + Number(drone.id.replace(/\D/g, "").slice(-2) || 0);
  return { x: owner.x + Math.cos(a) * 95, y: owner.y + Math.sin(a) * 95 };
}

function hitEntities(projectile) {
  const owner = state.players.get(projectile.ownerId);
  for (const shape of state.shapes) {
    const def = SHAPES[shape.type];
    if (distance(projectile, shape) < projectile.radius + def.radius) {
      damageShape(shape, projectile.damage, owner);
      projectile.hp -= def.hp * 0.18;
      return;
    }
  }
  for (const boss of state.bosses) {
    if (boss.id === projectile.ownerId) continue;
    const def = BOSSES[boss.type];
    if (distance(projectile, boss) < projectile.radius + def.radius) {
      damageBoss(boss, projectile.damage, owner);
      projectile.hp -= 36;
      return;
    }
  }
  for (const player of state.players.values()) {
    if (player.id === projectile.ownerId || player.respawn > 0 || player.invuln > 0) continue;
    const d = derivedStats(player);
    if (distance(projectile, player) < projectile.radius + d.radius) {
      damagePlayer(player, projectile.damage, owner);
      projectile.hp -= d.bodyDamage * 1.2;
      return;
    }
  }
}

function stepShapes(dt) {
  const players = [...state.players.values()].filter((p) => p.respawn <= 0);
  for (const shape of state.shapes) {
    const def = SHAPES[shape.type];
    shape.spin += dt * (def.hostile ? 4 : 0.8);
    if (def.hostile && players.length) {
      const target = players.reduce((best, p) => (distance(shape, p) < distance(shape, best) ? p : best), players[0]);
      if (distance(shape, target) < 620) {
        const a = angleTo(shape, target);
        shape.vx = shape.vx * 0.93 + Math.cos(a) * def.drift * 0.12;
        shape.vy = shape.vy * 0.93 + Math.sin(a) * def.drift * 0.12;
      }
    }
    shape.x = clamp(shape.x + shape.vx * dt, 40, WORLD.w - 40);
    shape.y = clamp(shape.y + shape.vy * dt, 40, WORLD.h - 40);
    if (shape.x <= 45 || shape.x >= WORLD.w - 45) shape.vx *= -1;
    if (shape.y <= 45 || shape.y >= WORLD.h - 45) shape.vy *= -1;
  }
  state.shapes = state.shapes.filter((shape) => shape.hp > 0);
}

function stepBosses(dt) {
  const players = [...state.players.values()].filter((p) => p.respawn <= 0);
  for (const boss of state.bosses) {
    const def = BOSSES[boss.type];
    boss.spin += dt;
    if (!players.length) continue;
    const target = players.reduce((best, p) => (distance(boss, p) < distance(boss, best) ? p : best), players[0]);
    const a = angleTo(boss, target);
    const speed = def.kind === "ram" ? 155 : 86;
    boss.x = clamp(boss.x + Math.cos(a) * speed * dt, 80, WORLD.w - 80);
    boss.y = clamp(boss.y + Math.sin(a) * speed * dt, 80, WORLD.h - 80);
    boss.reload -= dt;
    if (boss.reload <= 0 && def.kind !== "ram") {
      boss.reload = def.kind === "trap" ? 0.9 : 0.6;
      state.bullets.push({ id: makeId("bossShot"), ownerId: boss.id, boss: true, x: boss.x, y: boss.y, vx: Math.cos(a) * 360, vy: Math.sin(a) * 360, hp: 70, damage: 24, radius: def.kind === "trap" ? 17 : 10, life: 4, trap: def.kind === "trap", spin: 0 });
    }
  }
  state.bosses = state.bosses.filter((boss) => boss.hp > 0);
}

function collideBodies(players, dt) {
  for (const player of players) {
    if (player.respawn > 0 || player.invuln > 0) continue;
    const d = derivedStats(player);
    for (const shape of state.shapes) {
      const def = SHAPES[shape.type];
      if (distance(player, shape) < d.radius + def.radius) {
        damageShape(shape, d.bodyDamage * dt * 7, player);
        damagePlayer(player, Math.max(5, def.hp * 0.06) * dt * 4 * d.collisionResistance, null);
      }
    }
    for (const boss of state.bosses) {
      const def = BOSSES[boss.type];
      if (distance(player, boss) < d.radius + def.radius) {
        damageBoss(boss, d.bodyDamage * dt * 5, player);
        damagePlayer(player, 34 * dt * d.collisionResistance, null);
      }
    }
    for (const other of players) {
      if (other === player || other.respawn > 0 || other.invuln > 0) continue;
      const od = derivedStats(other);
      if (distance(player, other) < d.radius + od.radius) {
        damagePlayer(other, d.bodyDamage * dt * 3.5 * od.collisionResistance, player);
        damagePlayer(player, od.bodyDamage * dt * 3.5 * d.collisionResistance, other);
      }
    }
  }
}

function damageShape(shape, amount, attacker) {
  shape.hp -= amount;
  if (shape.hp <= 0 && attacker) award(attacker, SHAPES[shape.type].xp, shape.type);
}

function damageBoss(boss, amount, attacker) {
  boss.hp -= amount;
  if (boss.hp <= 0 && attacker) {
    award(attacker, BOSSES[boss.type].xp, BOSSES[boss.type].name);
    broadcastEvent(`${attacker.name} shattered ${BOSSES[boss.type].name}.`);
  }
}

function damagePlayer(player, amount, attacker) {
  if (player.respawn > 0 || player.invuln > 0) return;
  player.health -= amount;
  player.lastDamageAt = Date.now();
  if (player.health <= 0) killPlayer(player, attacker);
}

function award(player, xp, source) {
  const oldLevel = player.level;
  player.xp += xp;
  player.score += xp;
  player.level = levelForXp(player.xp);
  if (player.level > oldLevel) {
    player.health = Math.min(derivedStats(player).maxHealth, player.health + 34);
  }
  if (source && source !== "square") player.targetId = null;
}

function killPlayer(player, attacker) {
  player.deaths += 1;
  player.respawn = player.bot ? 1.4 : 2.8;
  player.health = 0;
  if (attacker && attacker.id && state.players.has(attacker.id)) {
    attacker.kills += 1;
    award(attacker, Math.max(250, Math.floor(player.score * 0.18)), player.name);
    broadcastEvent(`${attacker.name} eliminated ${player.name}.`);
  } else {
    broadcastEvent(`${player.name} was crushed by the arena.`);
  }
}

function respawnPlayer(player) {
  const pos = randomSpawn();
  player.x = pos.x;
  player.y = pos.y;
  player.vx = 0;
  player.vy = 0;
  player.invuln = 2.5;
  player.xp = Math.floor(player.xp * 0.72);
  player.level = levelForXp(player.xp);
  player.score = Math.floor(player.score * 0.72);
  player.health = derivedStats(player).maxHealth;
  player.respawn = 0;
}

function snapshot() {
  const players = [...state.players.values()].map((p) => {
    const d = derivedStats(p);
    return {
      id: p.id,
      name: p.name,
      bot: p.bot,
      x: Math.round(p.x),
      y: Math.round(p.y),
      aim: p.aim,
      tank: p.tank,
      level: p.level,
      xp: p.xp,
      score: p.score,
      health: Math.max(0, Math.round(p.health)),
      maxHealth: Math.round(d.maxHealth),
      radius: Math.round(d.radius),
      stats: p.stats,
      statPoints: statPointsForLevel(p.level),
      upgrades: availableUpgrades(p),
      respawn: Math.max(0, p.respawn),
      invuln: p.invuln,
      kills: p.kills,
      deaths: p.deaths,
    };
  });
  return {
    type: "snapshot",
    tick: state.tick,
    now: Date.now(),
    world: WORLD,
    players,
    bullets: state.bullets.map((b) => ({ id: b.id, ownerId: b.ownerId, x: Math.round(b.x), y: Math.round(b.y), r: Math.round(b.radius), trap: b.trap })),
    drones: state.drones.map((d) => ({ id: d.id, ownerId: d.ownerId, x: Math.round(d.x), y: Math.round(d.y), r: Math.round(d.radius) })),
    shapes: state.shapes.map((s) => ({ id: s.id, type: s.type, x: Math.round(s.x), y: Math.round(s.y), hp: Math.max(0, Math.round(s.hp)), maxHp: s.maxHp, spin: s.spin })),
    bosses: state.bosses.map((b) => ({ id: b.id, type: b.type, x: Math.round(b.x), y: Math.round(b.y), hp: Math.max(0, Math.round(b.hp)), maxHp: b.maxHp, spin: b.spin })),
    leaderboard: players.sort((a, b) => b.score - a.score).slice(0, 10).map((p) => ({ id: p.id, name: p.name, score: p.score, level: p.level, tank: p.tank })),
    killFeed: state.killFeed,
    bossAlert: state.bossAlert,
  };
}

setInterval(() => step(1 / TICK_RATE), 1000 / TICK_RATE);
setInterval(() => {
  state.bossAlert = "";
  broadcast(snapshot());
}, 1000 / SNAPSHOT_RATE);
