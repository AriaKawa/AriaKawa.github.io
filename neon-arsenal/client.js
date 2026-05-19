import {
  BOSSES,
  LEVEL_XP,
  SHAPES,
  STAT_KEYS,
  STATS,
  TANKS,
  TAU,
  WORLD,
  angleTo,
  availableUpgrades,
  clamp,
  derivedStats,
  levelForXp,
  makeStats,
  maxStatForTank,
  normalizeAngle,
  rand,
  spentStats,
  statPointsForLevel,
} from "./shared.js";

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const mapCanvas = document.querySelector("#minimap");
const mapCtx = mapCanvas.getContext("2d");
const ui = {
  lobby: document.querySelector("#lobby"),
  form: document.querySelector("#joinForm"),
  name: document.querySelector("#nameInput"),
  practice: document.querySelector("#practiceButton"),
  status: document.querySelector("#serverStatus"),
  connection: document.querySelector("#connection"),
  healthFill: document.querySelector("#healthFill"),
  healthLabel: document.querySelector("#healthLabel"),
  xpFill: document.querySelector("#xpFill"),
  xpLabel: document.querySelector("#xpLabel"),
  fps: document.querySelector("#fps"),
  ping: document.querySelector("#ping"),
  sound: document.querySelector("#soundButton"),
  leaderboard: document.querySelector("#leaderboard"),
  stats: document.querySelector("#statsPanel"),
  classes: document.querySelector("#classPanel"),
  bossAlert: document.querySelector("#bossAlert"),
  tree: document.querySelector("#treeOverlay"),
  moveStick: document.querySelector("#moveStick"),
  touchFire: document.querySelector("#touchFire"),
};

let W = 0;
let H = 0;
let dpr = 1;
let socket = null;
let myId = null;
let mode = "idle";
let latest = null;
let lastFrame = performance.now();
let fpsSmoothing = 60;
let ping = 0;
let pingSentAt = 0;
let camera = { x: WORLD.w / 2, y: WORLD.h / 2, shake: 0 };
let pointer = { x: innerWidth / 2, y: innerHeight / 2, active: false };
let input = { mx: 0, my: 0, firing: false, repel: false, autoFire: true, autoSpin: false, aim: 0, seq: 0 };
let keys = new Set();
let particles = [];
let practice = null;
let audioCtx = null;
let masterGain = null;
let audioUnlocked = false;
let fallbackAudio = null;
let audioMuted = false;
let lastFireSound = 0;
let lastHitSound = 0;
let lastBossIncoming = "";
let bossAlertText = "";
let bossAlertUntil = 0;

function resize() {
  dpr = Math.min(devicePixelRatio || 1, 2);
  W = innerWidth;
  H = innerHeight;
  canvas.width = Math.floor(W * dpr);
  canvas.height = Math.floor(H * dpr);
  canvas.style.width = `${W}px`;
  canvas.style.height = `${H}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function connect(name) {
  unlockAudio();
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  const url = `${protocol}//${location.host}`;
  ui.status.textContent = "Connecting...";
  socket = new WebSocket(url);
  socket.addEventListener("open", () => {
    mode = "online";
    socket.send(JSON.stringify({ type: "join", name }));
    ui.lobby.classList.add("hidden");
    ui.connection.textContent = "multiplayer online";
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "welcome") myId = message.id;
    if (message.type === "snapshot") {
      latest = message;
      reconcileParticles(message);
    }
    if (message.type === "pong") ping = Math.max(0, Date.now() - message.now);
  });
  socket.addEventListener("close", () => {
    if (mode === "online") {
      ui.status.textContent = "Socket closed. Practice mode is ready.";
      ui.lobby.classList.remove("hidden");
    }
    socket = null;
  });
  socket.addEventListener("error", () => {
    ui.status.textContent = "No server detected. Practice mode is ready.";
  });
}

function startPractice() {
  unlockAudio().then(() => {
    playSfx("ready");
    playFallbackBeep();
  });
  mode = "practice";
  myId = "practice";
  ui.lobby.classList.add("hidden");
  ui.connection.textContent = "offline practice";
  const player = makePracticePlayer(myId, ui.name.value || "Pilot", false);
  practice = {
    tick: 0,
    now: Date.now(),
    world: WORLD,
    players: [player, ...Array.from({ length: 8 }, (_, i) => makePracticePlayer(`bot${i}`, botName(), true))],
    bullets: [],
    drones: [],
    shapes: [],
    bosses: [],
    leaderboard: [],
    bossAlert: "",
    bossAlertUntil: 0,
    bossTimer: 28,
  };
  for (let i = 0; i < 190; i += 1) practice.shapes.push(makePracticeShape());
  latest = practiceSnapshot();
}

function makePracticePlayer(id, name, bot) {
  const player = {
    id,
    name,
    bot,
    x: rand(160, WORLD.w - 160),
    y: rand(160, WORLD.h - 160),
    aim: rand(-Math.PI, Math.PI),
    tank: "basic",
    stats: makeStats(),
    xp: bot ? rand(0, 3600) : LEVEL_XP[45],
    score: bot ? 0 : LEVEL_XP[45],
    health: 100,
    respawn: 0,
    invuln: 0,
    kills: 0,
    deaths: 0,
    reload: 0,
    target: null,
    aiTargetId: null,
    aiRetarget: 0,
    aiStrafe: Math.random() > 0.5 ? 1 : -1,
  };
  player.level = levelForXp(player.xp);
  player.health = derivedStats(player).maxHealth;
  return player;
}

function makePracticeShape() {
  const roll = Math.random();
  const type = roll < 0.006 ? "greenPentagon" : roll < 0.02 ? "greenTriangle" : roll < 0.04 ? "greenSquare" : roll < 0.63 ? "square" : roll < 0.89 ? "triangle" : roll < 0.985 ? "pentagon" : "alphaPentagon";
  const def = SHAPES[type];
  return { id: `shape${Math.random()}`, type, x: rand(80, WORLD.w - 80), y: rand(80, WORLD.h - 80), hp: def.hp, maxHp: def.hp, spin: rand(0, TAU) };
}

function botName() {
  const bits = ["Ion", "Nova", "Vector", "Pulse", "Orbit", "Rift", "Prism", "Flux"];
  return `${bits[Math.floor(rand(0, bits.length))]}-${Math.floor(rand(10, 99))}`;
}

function sendInput() {
  if (mode !== "online" || !socket || socket.readyState !== WebSocket.OPEN) return;
  socket.send(JSON.stringify({ type: "input", ...input, seq: ++input.seq }));
  if (Date.now() - pingSentAt > 1200) {
    pingSentAt = Date.now();
    socket.send(JSON.stringify({ type: "ping", now: Date.now() }));
  }
}

function upgradeStat(stat) {
  unlockAudio();
  playSfx("upgrade");
  if (mode === "online" && socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: "upgradeStat", stat }));
  } else if (practice) {
    const player = practice.players.find((p) => p.id === myId);
    if (!player || spentStats(player.stats) >= statPointsForLevel(player.level)) return;
    if ((player.stats[stat] || 0) >= maxStatForTank(player.tank, stat)) return;
    const before = derivedStats(player).maxHealth;
    player.stats[stat] += 1;
    const after = derivedStats(player).maxHealth;
    player.health = Math.min(after, player.health + Math.max(0, after - before));
  }
}

function upgradeTank(tank) {
  unlockAudio();
  playSfx("upgrade");
  if (mode === "online" && socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: "upgradeTank", tank }));
  } else if (practice) {
    const player = practice.players.find((p) => p.id === myId);
    if (player && availableUpgrades(player).includes(tank)) {
      player.tank = tank;
      player.health = Math.min(derivedStats(player).maxHealth, player.health + 40);
    }
  }
}

function updateInput() {
  let mx = 0;
  let my = 0;
  if (keys.has("w") || keys.has("ArrowUp")) my -= 1;
  if (keys.has("s") || keys.has("ArrowDown")) my += 1;
  if (keys.has("a") || keys.has("ArrowLeft")) mx -= 1;
  if (keys.has("d") || keys.has("ArrowRight")) mx += 1;
  input.mx = mx;
  input.my = my;
  input.repel = keys.has("Shift");
  input.firing = keys.has(" ") || pointer.active;
  const player = getMe();
  if (player) {
    const worldPoint = screenToWorld(pointer.x, pointer.y);
    input.aim = input.autoSpin ? performance.now() / 360 : angleTo(player, worldPoint);
  }
}

function getMe() {
  return latest?.players?.find((p) => p.id === myId) || null;
}

function screenToWorld(x, y) {
  return { x: x + camera.x - W / 2, y: y + camera.y - H / 2 };
}

function updateCamera(dt) {
  const player = getMe();
  if (!player) return;
  const targetX = player.x;
  const targetY = player.y;
  camera.x += (targetX - camera.x) * (1 - Math.pow(0.0009, dt));
  camera.y += (targetY - camera.y) * (1 - Math.pow(0.0009, dt));
  camera.shake = Math.max(0, camera.shake - dt * 16);
}

function practiceStep(dt) {
  if (!practice) return;
  practice.tick += 1;
  const player = practice.players.find((p) => p.id === myId);
  if (!player) return;
  player.aim = input.aim;
  player.invuln = Math.max(0, (player.invuln || 0) - dt);
  if (player.respawn > 0) {
    player.respawn -= dt;
    if (player.respawn <= 0) respawnPracticePlayer(player);
  } else {
    movePracticePlayer(player, input.mx, input.my, dt);
    if (input.firing || input.autoFire) practiceFire(player, dt);
  }
  for (const bot of practice.players.filter((p) => p.bot)) {
    if (bot.respawn > 0) {
      bot.respawn -= dt;
      if (bot.respawn <= 0) respawnPracticePlayer(bot);
      continue;
    }
    bot.invuln = Math.max(0, (bot.invuln || 0) - dt);
    const target = choosePracticeTarget(bot, dt);
    if (target) {
      const targetAngle = angleTo(bot, target);
      bot.aim = turnToward(bot.aim, targetAngle, dt * 2.9);
      const dist = Math.hypot(bot.x - target.x, bot.y - target.y);
      const melee = TANKS[bot.tank]?.smasher;
      const desired = melee ? 80 : 430;
      const push = dist > desired + 80 ? 1 : dist < desired - 80 ? -0.75 : 0;
      const strafe = push === 0 ? bot.aiStrafe * 0.72 : bot.aiStrafe * 0.18;
      movePracticePlayer(bot, Math.cos(targetAngle) * push + Math.cos(targetAngle + Math.PI / 2) * strafe, Math.sin(targetAngle) * push + Math.sin(targetAngle + Math.PI / 2) * strafe, dt);
      if (!melee && dist < 900) practiceFire(bot, dt);
    }
    if (bot.level >= 15 && availableUpgrades(bot).length) bot.tank = availableUpgrades(bot)[0];
  }
  for (const bullet of practice.bullets) {
    bullet.life -= dt;
    bullet.x += bullet.vx * dt;
    bullet.y += bullet.vy * dt;
    hitPractice(bullet);
  }
  practice.bullets = practice.bullets.filter((b) => b.life > 0 && b.hp > 0);
  collidePracticeBodies(dt);
  for (const shape of practice.shapes) shape.spin += dt;
  practice.shapes = practice.shapes.filter((s) => s.hp > 0);
  while (practice.shapes.length < 190) practice.shapes.push(makePracticeShape());
  practice.bossTimer -= dt;
  if (practice.bossTimer <= 0 && practice.bosses.length < 1) {
    const type = Object.keys(BOSSES)[Math.floor(rand(0, Object.keys(BOSSES).length))];
    const def = BOSSES[type];
    practice.bosses.push({ id: `boss${Date.now()}`, type, x: rand(400, WORLD.w - 400), y: rand(400, WORLD.h - 400), hp: def.hp, maxHp: def.hp, spin: 0 });
    practice.bossAlert = `${def.name} has breached the arena.`;
    practice.bossAlertUntil = Date.now() + 800;
    practice.bossTimer = 80;
  }
  if (practice.bossAlert && Date.now() > practice.bossAlertUntil) practice.bossAlert = "";
  for (const boss of practice.bosses) {
    boss.spin += dt;
    const a = angleTo(boss, player);
    boss.x += Math.cos(a) * 45 * dt;
    boss.y += Math.sin(a) * 45 * dt;
  }
  practice.bosses = practice.bosses.filter((b) => b.hp > 0);
  latest = practiceSnapshot();
}

function movePracticePlayer(player, mx, my, dt) {
  const d = derivedStats(player);
  const len = Math.hypot(mx, my) || 1;
  player.x = clamp(player.x + (mx / len) * d.moveSpeed * dt, 35, WORLD.w - 35);
  player.y = clamp(player.y + (my / len) * d.moveSpeed * dt, 35, WORLD.h - 35);
}

function practiceFire(player, dt) {
  player.reload = Math.max(0, player.reload - dt);
  if (player.reload > 0) return;
  const tank = TANKS[player.tank] || TANKS.basic;
  const barrel = tank.barrels[0];
  if (!barrel) return;
  const d = derivedStats(player);
  player.reload = 0.45 / d.reload / (barrel.reload || 1);
  const angle = player.aim + (barrel.angle || 0) + rand(-0.035, 0.035);
  practice.bullets.push({
    id: `b${Math.random()}`,
    ownerId: player.id,
    x: player.x + Math.cos(angle) * (d.radius + 28),
    y: player.y + Math.sin(angle) * (d.radius + 28),
    vx: Math.cos(angle) * d.bulletSpeed * (barrel.speed || 1),
    vy: Math.sin(angle) * d.bulletSpeed * (barrel.speed || 1),
    hp: d.penetration,
    r: 8 * (barrel.size || 1),
    damage: d.bulletDamage * (barrel.damage || 1),
    life: 2.1,
  });
  if (player.id === myId) {
    playSfx("fire");
    ui.sound.dataset.last = "fire";
  }
}

function turnToward(current, target, amount) {
  return current + clamp(normalizeAngle(target - current), -amount, amount);
}

function findPracticeEntity(id) {
  return practice.shapes.find((shape) => shape.id === id && shape.hp > 0)
    || practice.bosses.find((boss) => boss.id === id && boss.hp > 0)
    || practice.players.find((player) => player.id === id && player.respawn <= 0);
}

function choosePracticeTarget(bot, dt) {
  bot.aiRetarget -= dt;
  const current = bot.aiTargetId ? findPracticeEntity(bot.aiTargetId) : null;
  if (current && bot.aiRetarget > 0) return current;
  const livingPlayers = practice.players.filter((player) => player.id !== bot.id && player.respawn <= 0);
  const nearbyPlayers = livingPlayers.filter((player) => Math.hypot(bot.x - player.x, bot.y - player.y) < 760);
  const entities = [
    ...nearbyPlayers,
    ...practice.shapes.filter((shape) => shape.hp > 0),
    ...practice.bosses.filter((boss) => boss.hp > 0),
  ];
  if (!entities.length) return null;
  entities.sort((a, b) => Math.hypot(bot.x - a.x, bot.y - a.y) - Math.hypot(bot.x - b.x, bot.y - b.y));
  const target = entities[0];
  bot.aiTargetId = target.id;
  bot.aiRetarget = rand(0.7, 1.6);
  if (Math.random() < 0.28) bot.aiStrafe *= -1;
  return target;
}

function hitPractice(bullet) {
  const owner = practice.players.find((p) => p.id === bullet.ownerId);
  for (const shape of practice.shapes) {
    const def = SHAPES[shape.type];
    if (Math.hypot(bullet.x - shape.x, bullet.y - shape.y) < (bullet.r || 8) + def.radius) {
      shape.hp -= bullet.damage;
      bullet.hp -= 20;
      if (shape.hp <= 0 && owner) awardPractice(owner, def.xp, def.color);
      return;
    }
  }
  for (const boss of practice.bosses) {
    const def = BOSSES[boss.type];
    if (Math.hypot(bullet.x - boss.x, bullet.y - boss.y) < (bullet.r || 8) + def.radius) {
      boss.hp -= bullet.damage;
      bullet.hp -= 35;
      if (boss.hp <= 0 && owner) awardPractice(owner, def.xp, def.color);
      return;
    }
  }
  for (const player of practice.players) {
    if (player.id === bullet.ownerId || player.respawn > 0) continue;
    const d = derivedStats(player);
    if (Math.hypot(bullet.x - player.x, bullet.y - player.y) < (bullet.r || 8) + d.radius) {
      damagePracticePlayer(player, bullet.damage, owner);
      bullet.hp -= d.bodyDamage;
      return;
    }
  }
}

function collidePracticeBodies(dt) {
  const players = practice.players.filter((p) => p.respawn <= 0);
  for (const player of players) {
    const d = derivedStats(player);
    for (const shape of practice.shapes) {
      if (shape.hp <= 0) continue;
      const def = SHAPES[shape.type];
      if (Math.hypot(player.x - shape.x, player.y - shape.y) < d.radius + def.radius) {
        shape.hp -= d.bodyDamage * dt * 7;
        damagePracticePlayer(player, Math.max(5, def.hp * 0.06) * dt * 4 * d.collisionResistance, null);
        pushApart(player, shape, d.radius + def.radius);
        if (shape.hp <= 0) awardPractice(player, def.xp, def.color);
      }
    }
    for (const boss of practice.bosses) {
      if (boss.hp <= 0) continue;
      const def = BOSSES[boss.type];
      if (Math.hypot(player.x - boss.x, player.y - boss.y) < d.radius + def.radius) {
        boss.hp -= d.bodyDamage * dt * 5;
        damagePracticePlayer(player, 34 * dt * d.collisionResistance, null);
        pushApart(player, boss, d.radius + def.radius);
        if (boss.hp <= 0) awardPractice(player, def.xp, def.color);
      }
    }
    for (const other of players) {
      if (other.id <= player.id) continue;
      const od = derivedStats(other);
      if (Math.hypot(player.x - other.x, player.y - other.y) < d.radius + od.radius) {
        damagePracticePlayer(other, d.bodyDamage * dt * 3.5 * od.collisionResistance, player);
        damagePracticePlayer(player, od.bodyDamage * dt * 3.5 * d.collisionResistance, other);
        pushApart(player, other, d.radius + od.radius);
      }
    }
  }
}

function pushApart(a, b, minDistance) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dist = Math.max(1, Math.hypot(dx, dy));
  const overlap = Math.max(0, minDistance - dist);
  a.x = clamp(a.x + dx / dist * overlap * 0.28, 35, WORLD.w - 35);
  a.y = clamp(a.y + dy / dist * overlap * 0.28, 35, WORLD.h - 35);
}

function damagePracticePlayer(player, amount, attacker) {
  if (player.respawn > 0) return;
  player.health -= amount;
  if (player.health <= 0) killPracticePlayer(player, attacker);
}

function killPracticePlayer(player, attacker) {
  player.deaths += 1;
  player.health = 0;
  player.respawn = player.bot ? 1.2 : 1.8;
  if (attacker && attacker.id !== player.id) {
    attacker.kills += 1;
    awardPractice(attacker, Math.max(220, Math.floor(player.score * 0.12)), "#ff62d2");
  }
  if (player.id === myId || attacker?.id === myId) playSfx("death");
}

function respawnPracticePlayer(player) {
  player.x = rand(160, WORLD.w - 160);
  player.y = rand(160, WORLD.h - 160);
  player.health = derivedStats(player).maxHealth;
  player.respawn = 0;
  player.invuln = 0;
}

function awardPractice(player, xp, color) {
  const old = player.level;
  player.xp += xp;
  player.score += xp;
  player.level = levelForXp(player.xp);
  if (player.level > old) {
    particles.push({ x: player.x, y: player.y, color: "#ffe45e", life: 0.8, max: 0.8, ring: true, r: 30 });
    if (player.id === myId) playSfx("upgrade");
  }
  if (player.id === myId) playSfx("hit");
  particles.push({ x: player.x + rand(-50, 50), y: player.y + rand(-50, 50), color, life: 0.5, max: 0.5, r: 5 });
}

function practiceSnapshot() {
  const players = practice.players.map((p) => {
    const d = derivedStats(p);
    return {
      ...p,
      maxHealth: d.maxHealth,
      radius: d.radius,
      statPoints: statPointsForLevel(p.level),
      upgrades: availableUpgrades(p),
    };
  });
  return {
    ...practice,
    players,
    bullets: practice.bullets.map((b) => ({ ...b, r: b.r || 8 })),
    leaderboard: [...players].sort((a, b) => b.score - a.score).slice(0, 10),
  };
}

function reconcileParticles(snapshot) {
  const known = new Set(reconcileParticles.known || []);
  for (const shape of snapshot.shapes || []) {
    if (!known.has(shape.id)) known.add(shape.id);
  }
  const next = new Set((snapshot.shapes || []).map((s) => s.id));
  for (const id of known) {
    if (!next.has(id)) particles.push({ x: camera.x + rand(-200, 200), y: camera.y + rand(-160, 160), color: "#78f7ff", life: 0.45, max: 0.45, r: rand(3, 9) });
  }
  reconcileParticles.known = next;
}

function draw(time) {
  drawBackground(time);
  if (!latest) return;
  drawWorld(() => {
    for (const shape of latest.shapes || []) drawShape(shape);
    for (const boss of latest.bosses || []) drawBoss(boss);
    for (const drone of latest.drones || []) drawProjectile(drone, true);
    for (const bullet of latest.bullets || []) drawProjectile(bullet, false);
    for (const player of latest.players || []) drawTank(player);
    drawParticles();
  });
  drawVignette();
  drawMinimap();
}

function drawBackground(time) {
  const gradient = ctx.createLinearGradient(0, 0, W, H);
  gradient.addColorStop(0, "#050812");
  gradient.addColorStop(0.55, "#09152a");
  gradient.addColorStop(1, "#150a2a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, W, H);
  drawWorld(() => {
    const size = 96;
    const startX = Math.floor((camera.x - W / 2) / size) * size;
    const startY = Math.floor((camera.y - H / 2) / size) * size;
    ctx.strokeStyle = "rgba(94, 191, 255, 0.13)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = startX; x < camera.x + W / 2 + size; x += size) {
      ctx.moveTo(x, camera.y - H / 2 - size);
      ctx.lineTo(x + Math.sin(time / 1300 + x * 0.002) * 5, camera.y + H / 2 + size);
    }
    for (let y = startY; y < camera.y + H / 2 + size; y += size) {
      ctx.moveTo(camera.x - W / 2 - size, y);
      ctx.lineTo(camera.x + W / 2 + size, y + Math.cos(time / 1200 + y * 0.002) * 5);
    }
    ctx.stroke();
    const nest = { x: WORLD.w / 2, y: WORLD.h / 2 };
    ctx.strokeStyle = "rgba(255, 98, 210, 0.18)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(nest.x, nest.y, 640 + Math.sin(time / 700) * 10, 0, TAU);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 8;
    ctx.strokeRect(0, 0, WORLD.w, WORLD.h);
  });
}

function drawWorld(drawer) {
  ctx.save();
  const shakeX = camera.shake ? rand(-camera.shake, camera.shake) : 0;
  const shakeY = camera.shake ? rand(-camera.shake, camera.shake) : 0;
  ctx.translate(W / 2 - camera.x + shakeX, H / 2 - camera.y + shakeY);
  drawer();
  ctx.restore();
}

function drawShape(shape) {
  const def = SHAPES[shape.type] || SHAPES.square;
  drawPolygon(shape.x, shape.y, def.radius, def.sides, shape.spin, def.color, def.stroke, shape.hp / shape.maxHp);
}

function drawBoss(boss) {
  const def = BOSSES[boss.type];
  drawPolygon(boss.x, boss.y, def.radius, def.sides, boss.spin, def.color, "#ffffff55", boss.hp / boss.maxHp, 26);
  ctx.fillStyle = "#f4fbff";
  ctx.font = "900 15px Inter, system-ui";
  ctx.textAlign = "center";
  ctx.fillText(def.name, boss.x, boss.y - def.radius - 18);
}

function drawPolygon(x, y, radius, sides, spin, fill, stroke, hpPct = 1, glow = 13) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(spin);
  ctx.shadowColor = fill;
  ctx.shadowBlur = glow;
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = Math.max(3, radius * 0.09);
  ctx.beginPath();
  if (sides > 12) {
    ctx.arc(0, 0, radius, 0, TAU);
  } else {
    for (let i = 0; i < sides; i += 1) {
      const a = -Math.PI / 2 + i * TAU / sides;
      const px = Math.cos(a) * radius;
      const py = Math.sin(a) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.stroke();
  ctx.restore();
  if (hpPct < 0.98) drawHp(x, y - radius - 13, radius * 1.6, hpPct);
}

function drawProjectile(p, drone) {
  ctx.fillStyle = drone ? "#ff62d2" : p.trap ? "#b8ffea" : "#dff9ff";
  ctx.shadowColor = ctx.fillStyle;
  ctx.shadowBlur = drone ? 18 : 12;
  ctx.beginPath();
  if (p.trap) {
    for (let i = 0; i < 3; i += 1) {
      const a = -Math.PI / 2 + i * TAU / 3;
      const r = p.r || 12;
      const x = p.x + Math.cos(a) * r;
      const y = p.y + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  } else {
    ctx.arc(p.x, p.y, p.r || 8, 0, TAU);
  }
  ctx.fill();
  ctx.shadowBlur = 0;
}

function drawTank(player) {
  if (player.respawn > 0) return;
  const tank = TANKS[player.tank] || TANKS.basic;
  const color = player.id === myId ? "#39d5ff" : player.bot ? "#ff7086" : "#ff62d2";
  const alpha = player.invuln > 0 ? 0.58 + Math.sin(performance.now() / 80) * 0.22 : 1;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(player.x, player.y);
  ctx.rotate(player.aim);
  drawBarrels(tank, player.radius || 30, color);
  ctx.rotate(-player.aim);
  if (tank.smasher) drawSmasher(player.radius || 34, color, tank);
  else {
    ctx.fillStyle = color;
    ctx.strokeStyle = shade(color);
    ctx.lineWidth = 5;
    ctx.shadowColor = color;
    ctx.shadowBlur = player.id === myId ? 22 : 10;
    ctx.beginPath();
    ctx.arc(0, 0, player.radius || 30, 0, TAU);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.stroke();
  }
  if (tank.autoTurrets) {
    ctx.fillStyle = "#101827";
    ctx.strokeStyle = "#8ee0ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, (player.radius || 30) * 0.42, 0, TAU);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
  drawHp(player.x, player.y - (player.radius || 30) - 18, Math.max(48, (player.radius || 30) * 1.8), player.health / player.maxHealth);
  ctx.fillStyle = player.id === myId ? "#ffffff" : "#dcecff";
  ctx.font = "900 12px Inter, system-ui";
  ctx.textAlign = "center";
  ctx.fillText(`${player.name}  Lv ${player.level}`, player.x, player.y + (player.radius || 30) + 22);
}

function drawBarrels(tank, radius, color) {
  ctx.fillStyle = "#202738";
  ctx.strokeStyle = "#070b13";
  ctx.lineWidth = 4;
  for (const barrel of tank.barrels || []) {
    const width = barrel.width || 22;
    const length = barrel.length || 52;
    const offset = barrel.offset || 0;
    ctx.save();
    ctx.rotate(barrel.angle || 0);
    ctx.translate(0, offset);
    ctx.beginPath();
    ctx.roundRect(radius * 0.15, -width / 2, length, width, 5);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  if (tank.droneLimit && !(tank.barrels || []).length) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, radius + 8, 0, TAU);
    ctx.stroke();
  }
}

function drawSmasher(radius, color, tank) {
  const spikes = tank.spike ? 12 : 6;
  ctx.fillStyle = color;
  ctx.strokeStyle = shade(color);
  ctx.lineWidth = 5;
  ctx.beginPath();
  for (let i = 0; i < spikes; i += 1) {
    const a = -Math.PI / 2 + i * TAU / spikes + performance.now() / 1600;
    const r = tank.spike ? radius * (i % 2 ? 1 : 1.22) : radius * 1.08;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function shade(color) {
  return color === "#39d5ff" ? "#197aa2" : color === "#ff7086" ? "#9a3248" : "#873171";
}

function drawHp(x, y, width, pct) {
  const value = clamp(pct || 0, 0, 1);
  ctx.fillStyle = "rgba(0,0,0,.66)";
  ctx.fillRect(x - width / 2, y, width, 7);
  ctx.fillStyle = value > 0.5 ? "#62f7a5" : value > 0.25 ? "#ffe45e" : "#ff6281";
  ctx.fillRect(x - width / 2 + 1, y + 1, (width - 2) * value, 5);
}

function drawParticles() {
  particles = particles.filter((p) => {
    p.life -= 1 / 60;
    const pct = clamp(p.life / p.max, 0, 1);
    ctx.globalAlpha = pct;
    ctx.strokeStyle = p.color;
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 18;
    if (p.ring) {
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * (1.8 - pct), 0, TAU);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * (1.2 - pct * 0.2), 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    return p.life > 0;
  });
}

function drawVignette() {
  const g = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.15, W / 2, H / 2, Math.max(W, H) * 0.72);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(0.66, "rgba(0,0,0,0.05)");
  g.addColorStop(1, "rgba(0,0,0,0.68)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

function drawMinimap() {
  if (!latest) return;
  mapCtx.clearRect(0, 0, 170, 170);
  mapCtx.fillStyle = "rgba(5, 9, 20, 0.95)";
  mapCtx.fillRect(0, 0, 170, 170);
  const sx = 170 / WORLD.w;
  const sy = 170 / WORLD.h;
  mapCtx.fillStyle = "rgba(255,228,94,.7)";
  for (const shape of latest.shapes || []) {
    if (shape.type.includes("Pentagon")) mapCtx.fillRect(shape.x * sx, shape.y * sy, 2, 2);
  }
  for (const boss of latest.bosses || []) {
    mapCtx.fillStyle = BOSSES[boss.type].color;
    mapCtx.fillRect(boss.x * sx - 2, boss.y * sy - 2, 4, 4);
  }
  for (const player of latest.players || []) {
    mapCtx.fillStyle = player.id === myId ? "#39d5ff" : player.bot ? "#ff7086" : "#ff62d2";
    mapCtx.beginPath();
    mapCtx.arc(player.x * sx, player.y * sy, player.id === myId ? 3 : 2, 0, TAU);
    mapCtx.fill();
  }
}

function updateUi() {
  const me = getMe();
  if (!me) return;
  const hpPct = clamp(me.health / me.maxHealth, 0, 1);
  ui.healthFill.style.width = `${hpPct * 100}%`;
  ui.healthLabel.textContent = `${Math.round(me.health)} / ${Math.round(me.maxHealth)}`;
  const current = LEVEL_XP[me.level] || 0;
  const next = LEVEL_XP[Math.min(45, me.level + 1)] || current + 1;
  ui.xpFill.style.width = `${clamp((me.xp - current) / Math.max(1, next - current), 0, 1) * 100}%`;
  ui.xpLabel.textContent = `Lv ${me.level} ${TANKS[me.tank]?.name || "Basic"}`;
  ui.ping.textContent = mode === "online" ? `${ping} ms` : "local";
  renderStats(me);
  renderClasses(me);
  renderLeaderboard();
  renderBossAlert();
}

function renderStats(me) {
  const available = me.statPoints - spentStats(me.stats);
  ui.stats.innerHTML = "";
  const title = document.createElement("div");
  title.className = "stat-row";
  title.innerHTML = `<b>+${Math.max(0, available)}</b><small>stat points</small><small>${spentStats(me.stats)}/${me.statPoints}</small>`;
  ui.stats.appendChild(title);
  for (const key of STAT_KEYS) {
    const stat = STATS[key];
    const cap = maxStatForTank(me.tank, key);
    const value = me.stats[key] || 0;
    const row = document.createElement("div");
    row.className = "stat-row";
    row.title = stat.label;
    const disabled = available <= 0 || value >= cap || cap === 0 ? "disabled" : "";
    row.style.setProperty("--stat-color", stat.color);
    row.innerHTML = `<button ${disabled} data-stat="${key}">+</button><div class="stat-row__body"><b>${stat.label}</b><div class="stat-row__bar"><span style="width:${cap ? value / cap * 100 : 0}%;background:${stat.color}"></span></div></div><small>${value}/${cap}</small>`;
    ui.stats.appendChild(row);
  }
}

function renderClasses(me) {
  ui.classes.innerHTML = "";
  const upgrades = me.upgrades || availableUpgrades(me);
  if (!upgrades.length) {
    const span = document.createElement("span");
    span.textContent = "No class upgrade available";
    span.style.cssText = "align-self:center;color:#9fb5c8;font-weight:900;font-size:12px;";
    ui.classes.appendChild(span);
    return;
  }
  for (const tank of upgrades) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.tank = tank;
    button.textContent = TANKS[tank]?.name || tank;
    button.title = `Upgrade to ${button.textContent}`;
    ui.classes.appendChild(button);
  }
}

function renderLeaderboard() {
  ui.leaderboard.innerHTML = "";
  for (const [index, row] of (latest.leaderboard || []).entries()) {
    const li = document.createElement("li");
    li.innerHTML = `<span>${index + 1}</span><span>${row.name}<br><small>${TANKS[row.tank]?.name || "Tank"} Lv ${row.level}</small></span><b>${Math.round(row.score).toLocaleString()}</b>`;
    ui.leaderboard.appendChild(li);
  }
}

function renderBossAlert() {
  const incoming = latest.bossAlert || "";
  if (!incoming) lastBossIncoming = "";
  if (incoming && incoming !== lastBossIncoming) {
    lastBossIncoming = incoming;
    bossAlertText = incoming;
    bossAlertUntil = Date.now() + 3600;
    playSfx("boss");
  }
  const active = bossAlertText && Date.now() < bossAlertUntil;
  ui.bossAlert.textContent = active ? bossAlertText : "";
  ui.bossAlert.classList.toggle("active", Boolean(active));
}

function updateSoundUi() {
  if (!ui.sound) return;
  const state = audioCtx?.state || (audioUnlocked ? "on" : "off");
  const on = !audioMuted && audioUnlocked && state !== "suspended";
  ui.sound.textContent = on ? "🔊" : "🔇";
  ui.sound.setAttribute("aria-label", on ? "Mute sound" : "Unmute sound");
  ui.sound.dataset.state = on ? "on" : "off";
}

function setMuted(muted) {
  audioMuted = muted;
  if (masterGain) masterGain.gain.value = audioMuted ? 0 : 0.5;
  updateSoundUi();
}

function unlockAudio() {
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) {
    updateSoundUi();
    return Promise.resolve(false);
  }
  if (!audioCtx) {
    audioCtx = new AudioCtor();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = audioMuted ? 0 : 0.5;
    masterGain.connect(audioCtx.destination);
  }
  const done = () => {
    audioUnlocked = audioCtx.state === "running";
    updateSoundUi();
    return audioUnlocked;
  };
  if (audioCtx.state === "suspended") return audioCtx.resume().then(done).catch(() => {
    updateSoundUi();
    return false;
  });
  return Promise.resolve(done());
}

function tone(freq, duration, type = "sine", gain = 0.12, delay = 0) {
  if (!audioCtx) return;
  const now = audioCtx.currentTime + delay;
  const osc = audioCtx.createOscillator();
  const amp = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  amp.gain.setValueAtTime(0.0001, now);
  amp.gain.exponentialRampToValueAtTime(gain, now + 0.015);
  amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(amp).connect(masterGain || audioCtx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

function fallbackWaveUrl() {
  const sampleRate = 8000;
  const seconds = 0.18;
  const count = Math.floor(sampleRate * seconds);
  const bytes = new Uint8Array(44 + count);
  const view = new DataView(bytes.buffer);
  const write = (offset, text) => [...text].forEach((char, i) => view.setUint8(offset + i, char.charCodeAt(0)));
  write(0, "RIFF");
  view.setUint32(4, 36 + count, true);
  write(8, "WAVEfmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate, true);
  view.setUint16(32, 1, true);
  view.setUint16(34, 8, true);
  write(36, "data");
  view.setUint32(40, count, true);
  for (let i = 0; i < count; i += 1) {
    const t = i / sampleRate;
    const envelope = 1 - i / count;
    bytes[44 + i] = 128 + Math.floor(Math.sin(t * Math.PI * 2 * 660) * 70 * envelope);
  }
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return `data:audio/wav;base64,${btoa(binary)}`;
}

function playFallbackBeep() {
  if (audioMuted) return;
  if (!fallbackAudio) fallbackAudio = new Audio(fallbackWaveUrl());
  fallbackAudio.currentTime = 0;
  fallbackAudio.volume = 1;
  fallbackAudio.play().catch(() => {});
}

function ensurePlayableAudio(kind) {
  if (audioMuted) return false;
  if (!audioCtx || audioCtx.state !== "running") {
    if (kind === "ready" || kind === "upgrade") playFallbackBeep();
    return false;
  }
  return true;
}

function playSfx(kind) {
  if (!ensurePlayableAudio(kind)) return;
  if (kind === "fire") {
    const now = performance.now();
    if (now - lastFireSound < 70) return;
    lastFireSound = now;
    tone(190, 0.045, "square", 0.18);
    tone(95, 0.06, "sawtooth", 0.12, 0.006);
    if (ui.sound) ui.sound.dataset.last = "fire";
  } else if (kind === "hit") {
    const now = performance.now();
    if (now - lastHitSound < 55) return;
    lastHitSound = now;
    tone(420, 0.08, "triangle", 0.14);
    tone(760, 0.055, "sine", 0.09, 0.025);
    if (ui.sound) ui.sound.dataset.last = "hit";
  } else if (kind === "upgrade") {
    tone(520, 0.08, "sine", 0.09);
    tone(780, 0.1, "sine", 0.075, 0.07);
    if (ui.sound) ui.sound.dataset.last = "upgrade";
  } else if (kind === "boss") {
    tone(96, 0.28, "sawtooth", 0.12);
    tone(144, 0.22, "square", 0.08, 0.09);
    if (ui.sound) ui.sound.dataset.last = "boss";
  } else if (kind === "death") {
    tone(220, 0.16, "sawtooth", 0.11);
    tone(92, 0.22, "triangle", 0.09, 0.08);
    if (ui.sound) ui.sound.dataset.last = "death";
  } else if (kind === "ready") {
    tone(330, 0.08, "triangle", 0.11);
    tone(660, 0.12, "sine", 0.09, 0.075);
    if (ui.sound) ui.sound.dataset.last = "ready";
  }
  updateSoundUi();
}

function renderTree() {
  ui.tree.innerHTML = `<h2>Class Tree</h2><div class="tree-grid"></div>`;
  const grid = ui.tree.querySelector(".tree-grid");
  for (const [id, tank] of Object.entries(TANKS)) {
    const card = document.createElement("div");
    card.className = "tree-card";
    card.innerHTML = `<b>${tank.name}</b><small>Tier ${tank.tier}${tank.smasher ? " / ram body" : ""}${tank.droneLimit ? ` / ${tank.droneLimit} drones` : ""}${tank.autoTurrets ? ` / ${tank.autoTurrets} auto` : ""}</small>`;
    grid.appendChild(card);
  }
}

function loop(time) {
  const dt = Math.min(0.05, (time - lastFrame) / 1000 || 0);
  lastFrame = time;
  fpsSmoothing = fpsSmoothing * 0.92 + (1 / Math.max(dt, 0.001)) * 0.08;
  ui.fps.textContent = `${Math.round(fpsSmoothing)} fps`;
  updateInput();
  if (mode === "practice") practiceStep(dt);
  sendInput();
  if (mode === "online" && (input.autoFire || input.firing) && getMe()?.respawn <= 0) playSfx("fire");
  updateCamera(dt);
  draw(time);
  updateUi();
  input.firing = keys.has(" ") || pointer.active;
  requestAnimationFrame(loop);
}

window.addEventListener("resize", resize);
window.addEventListener("keydown", (event) => {
  unlockAudio();
  keys.add(event.key);
  if (event.key.toLowerCase() === "e") input.autoFire = true;
  if (event.key.toLowerCase() === "c") input.autoSpin = !input.autoSpin;
  if (event.key.toLowerCase() === "y") {
    renderTree();
    ui.tree.classList.toggle("active");
  }
});
window.addEventListener("keyup", (event) => keys.delete(event.key));
window.addEventListener("pointermove", (event) => {
  pointer.active = true;
  pointer.x = event.clientX;
  pointer.y = event.clientY;
});
window.addEventListener("pointerdown", (event) => {
  unlockAudio();
  pointer.active = true;
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  if (event.button === 0) input.firing = true;
});
window.addEventListener("pointerup", () => {
  input.firing = keys.has(" ") || pointer.active;
});
window.addEventListener("pointerleave", () => {
  pointer.active = false;
  input.firing = keys.has(" ");
});
window.addEventListener("contextmenu", (event) => event.preventDefault());
window.addEventListener("mousedown", (event) => {
  if (event.button === 2) input.repel = true;
});
window.addEventListener("mouseup", (event) => {
  if (event.button === 2) input.repel = false;
});

ui.form.addEventListener("submit", (event) => {
  event.preventDefault();
  connect(ui.name.value || "Pilot");
});
ui.sound.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  event.stopPropagation();
  if (audioUnlocked && !audioMuted) {
    setMuted(true);
    return;
  }
  setMuted(false);
  unlockAudio().then(() => playSfx("ready"));
});
ui.practice.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  event.stopPropagation();
  startPractice();
});
ui.stats.addEventListener("pointerdown", (event) => {
  const button = event.target.closest("[data-stat]");
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  upgradeStat(button.dataset.stat);
});
ui.classes.addEventListener("pointerdown", (event) => {
  const button = event.target.closest("[data-tank]");
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  upgradeTank(button.dataset.tank);
});
ui.touchFire.addEventListener("pointerdown", () => {
  input.firing = true;
});
ui.touchFire.addEventListener("pointerup", () => {
  input.firing = false;
});

let touchOrigin = null;
ui.moveStick.addEventListener("pointerdown", (event) => {
  touchOrigin = { x: event.clientX, y: event.clientY };
  ui.moveStick.setPointerCapture(event.pointerId);
});
ui.moveStick.addEventListener("pointermove", (event) => {
  if (!touchOrigin) return;
  const dx = clamp(event.clientX - touchOrigin.x, -36, 36);
  const dy = clamp(event.clientY - touchOrigin.y, -36, 36);
  input.mx = dx / 36;
  input.my = dy / 36;
  ui.moveStick.querySelector("span").style.transform = `translate(${dx}px, ${dy}px)`;
});
ui.moveStick.addEventListener("pointerup", () => {
  touchOrigin = null;
  input.mx = 0;
  input.my = 0;
  ui.moveStick.querySelector("span").style.transform = "";
});

resize();
drawBackground(0);
renderTree();
updateSoundUi();
requestAnimationFrame(loop);
