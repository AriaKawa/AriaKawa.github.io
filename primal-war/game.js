const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const ui = {
  gold: document.querySelector("#gold"),
  xp: document.querySelector("#xp"),
  speed: document.querySelector("#speed"),
  playerHp: document.querySelector("#playerHp"),
  enemyHp: document.querySelector("#enemyHp"),
  playerHpBar: document.querySelector("#playerHpBar"),
  enemyHpBar: document.querySelector("#enemyHpBar"),
  status: document.querySelector("#status"),
  banner: document.querySelector("#banner"),
  pause: document.querySelector("#pauseBtn"),
  speedBtn: document.querySelector("#speedBtn"),
  restart: document.querySelector("#restartBtn"),
  turret: document.querySelector("#turretBtn"),
  special: document.querySelector("#specialBtn"),
  buyButtons: [...document.querySelectorAll("[data-buy]")],
};

const WORLD = { w: 1366, h: 768, laneY: 555, floorY: 637 };
const TEAM = { player: 1, enemy: -1 };
const BASE_MAX_HP = 1600;
const FIXED_DT = 1 / 60;

const UNITS = {
  clubber: {
    name: "Clubber",
    cost: 55,
    hp: 115,
    damage: 16,
    range: 48,
    speed: 42,
    attackRate: 0.82,
    reward: 31,
    xpReward: 15,
    sprite: "clubber",
    scale: 0.82,
    hitFrame: 0.42,
    projectile: null,
  },
  hurler: {
    name: "Pebble Hurler",
    cost: 85,
    hp: 82,
    damage: 13,
    range: 215,
    speed: 36,
    attackRate: 1.18,
    reward: 45,
    xpReward: 19,
    sprite: "hurler",
    scale: 0.82,
    hitFrame: 0.54,
    projectile: { speed: 520, radius: 8 },
  },
  raptor: {
    name: "Raptor Rider",
    cost: 165,
    hp: 275,
    damage: 34,
    range: 62,
    speed: 58,
    attackRate: 1.05,
    reward: 88,
    xpReward: 36,
    sprite: "raptor",
    scale: 0.96,
    hitFrame: 0.46,
    projectile: null,
  },
};

const TURRET = {
  cost: 190,
  damage: 21,
  range: 285,
  fireRate: 0.86,
  projectileSpeed: 620,
};

const SPECIAL = {
  xpCost: 120,
  cooldown: 26,
  damage: 105,
  radius: 165,
};

const SPRITES = {
  playerBase: { x: 2, y: 34, w: 356, h: 244, ox: 178, oy: 205 },
  enemyBase: { x: 1148, y: 34, w: 360, h: 248, ox: 182, oy: 207 },
  turretIdle: [
    { x: 954, y: 342, w: 190, h: 176, ox: 92, oy: 144 },
    { x: 1154, y: 340, w: 190, h: 176, ox: 92, oy: 144 },
  ],
  clubber: {
    idle: [{ x: 428, y: 82, w: 150, h: 220, ox: 76, oy: 194 }],
    walk: [
      { x: 548, y: 82, w: 160, h: 220, ox: 78, oy: 194 },
      { x: 684, y: 82, w: 160, h: 220, ox: 78, oy: 194 },
    ],
    attack: [
      { x: 806, y: 72, w: 176, h: 230, ox: 88, oy: 204 },
      { x: 936, y: 78, w: 190, h: 224, ox: 96, oy: 198 },
    ],
    hurt: [{ x: 684, y: 82, w: 160, h: 220, ox: 78, oy: 194 }],
    death: [{ x: 936, y: 78, w: 190, h: 224, ox: 96, oy: 198 }],
  },
  hurler: {
    idle: [{ x: 18, y: 322, w: 168, h: 210, ox: 82, oy: 184 }],
    walk: [
      { x: 188, y: 322, w: 172, h: 210, ox: 84, oy: 184 },
      { x: 350, y: 322, w: 174, h: 210, ox: 84, oy: 184 },
    ],
    attack: [
      { x: 520, y: 314, w: 178, h: 220, ox: 86, oy: 194 },
      { x: 674, y: 320, w: 210, h: 212, ox: 100, oy: 186 },
    ],
    hurt: [{ x: 350, y: 322, w: 174, h: 210, ox: 84, oy: 184 }],
    death: [{ x: 674, y: 320, w: 210, h: 212, ox: 100, oy: 186 }],
  },
  raptor: {
    idle: [{ x: 0, y: 520, w: 220, h: 220, ox: 108, oy: 188 }],
    walk: [
      { x: 194, y: 520, w: 220, h: 220, ox: 108, oy: 188 },
      { x: 386, y: 520, w: 220, h: 220, ox: 108, oy: 188 },
    ],
    attack: [
      { x: 582, y: 512, w: 265, h: 230, ox: 134, oy: 196 },
      { x: 790, y: 512, w: 292, h: 230, ox: 142, oy: 196 },
    ],
    hurt: [{ x: 386, y: 520, w: 220, h: 220, ox: 108, oy: 188 }],
    death: [{ x: 790, y: 512, w: 292, h: 230, ox: 142, oy: 196 }],
  },
  rock: [
    { x: 1078, y: 604, w: 44, h: 42, ox: 22, oy: 21 },
    { x: 1134, y: 604, w: 56, h: 48, ox: 28, oy: 24 },
    { x: 1202, y: 604, w: 62, h: 54, ox: 31, oy: 27 },
  ],
  meteor: [
    { x: 8, y: 766, w: 112, h: 126, ox: 56, oy: 86 },
    { x: 112, y: 746, w: 142, h: 152, ox: 72, oy: 104 },
    { x: 250, y: 730, w: 170, h: 176, ox: 86, oy: 126 },
    { x: 430, y: 744, w: 148, h: 176, ox: 74, oy: 130 },
    { x: 590, y: 754, w: 156, h: 164, ox: 78, oy: 122 },
  ],
  dust: [
    { x: 950, y: 800, w: 70, h: 44, ox: 35, oy: 28 },
    { x: 1046, y: 790, w: 94, h: 60, ox: 47, oy: 38 },
    { x: 1178, y: 776, w: 118, h: 76, ox: 59, oy: 50 },
    { x: 1328, y: 760, w: 150, h: 92, ox: 75, oy: 62 },
  ],
  spark: [
    { x: 1034, y: 902, w: 38, h: 42, ox: 19, oy: 21 },
    { x: 1092, y: 892, w: 54, h: 58, ox: 27, oy: 29 },
    { x: 1166, y: 878, w: 74, h: 76, ox: 37, oy: 38 },
    { x: 1260, y: 878, w: 74, h: 76, ox: 37, oy: 38 },
  ],
};

const assets = {
  bg: new Image(),
  atlasSource: new Image(),
  atlas: null,
  ready: false,
};

let dpr = 1;
let accumulator = 0;
let lastTime = 0;
let state;

function makeInitialState() {
  const qaMode = new URLSearchParams(window.location.search).has("qa");
  return {
    time: 0,
    paused: false,
    ended: false,
    winner: null,
    speed: 1,
    gold: qaMode ? 1000 : 170,
    xp: qaMode ? 180 : 0,
    playerBaseHp: BASE_MAX_HP,
    enemyBaseHp: BASE_MAX_HP,
    playerTurret: null,
    enemyTurret: { x: WORLD.w - 178, y: 370, cooldown: 0.8, flash: 0 },
    units: [],
    projectiles: [],
    particles: [],
    floats: [],
    aiGold: 145,
    aiThink: 2.0,
    spawnPulse: 0,
    specialCooldown: 0,
    shake: 0,
    nextId: 1,
  };
}

function uid(prefix) {
  state.nextId += 1;
  return `${prefix}_${state.nextId}`;
}

function loadImage(img, src) {
  return new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
}

async function loadAssets() {
  await Promise.all([
    loadImage(assets.bg, "assets/stone-age-battlefield.png"),
    loadImage(assets.atlasSource, "assets/stone-age-atlas-keyed.png"),
  ]);
  assets.atlas = makeTransparentAtlas(assets.atlasSource);
  assets.ready = true;
}

function makeTransparentAtlas(img) {
  const off = document.createElement("canvas");
  off.width = img.naturalWidth;
  off.height = img.naturalHeight;
  const offCtx = off.getContext("2d", { willReadFrequently: true });
  offCtx.drawImage(img, 0, 0);
  const data = offCtx.getImageData(0, 0, off.width, off.height);
  const p = data.data;
  const mask = floodKeyMask(p, off.width, off.height);
  for (let i = 0; i < p.length; i += 4) {
    const r = p[i];
    const g = p[i + 1];
    const b = p[i + 2];
    if (mask[i / 4]) {
      p[i + 3] = 0;
    } else if (g > 115 && r < 125 && b < 125 && g > r * 1.25 && g > b * 1.25) {
      p[i + 3] = Math.min(p[i + 3], 90);
      p[i + 1] = Math.max(0, g - 45);
    }
  }
  offCtx.putImageData(data, 0, 0);
  return off;
}

function floodKeyMask(p, width, height) {
  const total = width * height;
  const mask = new Uint8Array(total);
  const queue = [];
  const enqueue = (idx) => {
    if (idx < 0 || idx >= total || mask[idx] || !isKeyBackground(p, idx * 4)) return;
    mask[idx] = 1;
    queue.push(idx);
  };
  for (let x = 0; x < width; x += 1) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 0; y < height; y += 1) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }
  for (let head = 0; head < queue.length; head += 1) {
    const idx = queue[head];
    const x = idx % width;
    if (x > 0) enqueue(idx - 1);
    if (x < width - 1) enqueue(idx + 1);
    if (idx >= width) enqueue(idx - width);
    if (idx < total - width) enqueue(idx + width);
  }
  return mask;
}

function isKeyBackground(p, i) {
  const r = p[i];
  const g = p[i + 1];
  const b = p[i + 2];
  const pureKey = g > 135 && g > r * 1.22 && g > b * 1.22;
  const keyShadow = g > 48 && r < 128 && b < 120 && g > r * 1.04 && g > b * 1.04;
  return pureKey || keyShadow;
}

function resize() {
  const rect = canvas.parentElement.getBoundingClientRect();
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function buyUnit(type) {
  const def = UNITS[type];
  if (!def || state.ended || state.paused) return;
  if (state.gold < def.cost) {
    setStatus(`Need ${Math.ceil(def.cost - state.gold)} more gold for ${def.name}.`);
    pulseButton(`[data-buy="${type}"]`);
    return;
  }
  state.gold -= def.cost;
  spawnUnit("player", type);
  setStatus(`${def.name} joined the charge.`);
  spawnDust(174, WORLD.laneY + 18, "player");
}

function spawnUnit(team, type) {
  const def = UNITS[type];
  const x = team === "player" ? 178 : WORLD.w - 178;
  state.units.push({
    id: uid("unit"),
    team,
    type,
    x,
    y: WORLD.laneY,
    hp: def.hp,
    maxHp: def.hp,
    state: "walk",
    stateTime: 0,
    attackTimer: 0,
    attackProgress: 0,
    didHit: false,
    targetId: null,
    hurtFlash: 0,
    dead: false,
    deathTimer: 0,
  });
}

function buildTurret() {
  if (state.playerTurret || state.ended || state.paused) return;
  if (state.gold < TURRET.cost) {
    setStatus(`Need ${Math.ceil(TURRET.cost - state.gold)} more gold for the turret.`);
    pulseButton("#turretBtn");
    return;
  }
  state.gold -= TURRET.cost;
  state.playerTurret = { x: 176, y: 370, cooldown: 0.2, flash: 0 };
  setStatus("Rock-sling turret built.");
  ring(176, 396, 58, "#ffe29a");
}

function castSpecial() {
  if (state.ended || state.paused) return;
  if (state.specialCooldown > 0) {
    setStatus(`Stone Rain cools down for ${Math.ceil(state.specialCooldown)}s.`);
    pulseButton("#specialBtn");
    return;
  }
  if (state.xp < SPECIAL.xpCost) {
    setStatus(`Need ${SPECIAL.xpCost - Math.floor(state.xp)} more XP for Stone Rain.`);
    pulseButton("#specialBtn");
    return;
  }
  state.xp -= SPECIAL.xpCost;
  state.specialCooldown = SPECIAL.cooldown;
  state.shake = 0.45;
  setStatus("Stone Rain crashes into the enemy line.");
  const centers = [WORLD.w - 490, WORLD.w - 370, WORLD.w - 250, WORLD.w - 135];
  for (const [i, x] of centers.entries()) {
    state.particles.push({
      id: uid("meteor"),
      kind: "meteor",
      x: x - 220 + i * 28,
      y: 120 - i * 22,
      vx: 290,
      vy: 620,
      life: 1.2,
      maxLife: 1.2,
      frameOffset: i,
      hitAt: 0.5 + i * 0.08,
      hit: false,
      damageX: x,
    });
  }
}

function update(dt) {
  if (state.paused || state.ended) {
    updateParticles(dt);
    return;
  }
  state.time += dt;
  state.gold += 5.5 * dt;
  state.xp += 0.55 * dt;
  state.aiGold += 5.3 * dt;
  state.specialCooldown = Math.max(0, state.specialCooldown - dt);
  state.shake = Math.max(0, state.shake - dt);
  updateAI(dt);
  updateUnits(dt);
  updateTurrets(dt);
  updateProjectiles(dt);
  updateParticles(dt);
  checkBases();
  updateUI();
}

function updateAI(dt) {
  state.aiThink -= dt;
  if (state.aiThink > 0) return;
  const pressure = state.units.filter((u) => u.team === "player" && !u.dead).length;
  const enemyCount = state.units.filter((u) => u.team === "enemy" && !u.dead).length;
  let choice = "clubber";
  if (state.time > 35 && state.aiGold >= UNITS.raptor.cost && Math.random() < 0.35) choice = "raptor";
  else if (state.time > 13 && state.aiGold >= UNITS.hurler.cost && Math.random() < 0.55) choice = "hurler";
  if (pressure > enemyCount + 2 && state.aiGold >= UNITS.raptor.cost) choice = "raptor";
  if (state.aiGold >= UNITS[choice].cost) {
    state.aiGold -= UNITS[choice].cost;
    spawnUnit("enemy", choice);
    spawnDust(WORLD.w - 178, WORLD.laneY + 18, "enemy");
  }
  if (!state.enemyTurret && state.time > 45 && state.aiGold >= TURRET.cost) {
    state.aiGold -= TURRET.cost;
    state.enemyTurret = { x: WORLD.w - 178, y: 370, cooldown: 0.5, flash: 0 };
  }
  state.aiThink = 2.0 + Math.random() * 1.1 - Math.min(0.65, state.time / 120);
}

function updateUnits(dt) {
  const liveUnits = state.units.filter((u) => !u.dead);
  for (const unit of state.units) {
    const def = UNITS[unit.type];
    unit.stateTime += dt;
    unit.hurtFlash = Math.max(0, unit.hurtFlash - dt);
    if (unit.dead) {
      unit.deathTimer += dt;
      continue;
    }
    const dir = TEAM[unit.team];
    const enemies = liveUnits
      .filter((other) => other.team !== unit.team && other.hp > 0)
      .sort((a, b) => Math.abs(a.x - unit.x) - Math.abs(b.x - unit.x));
    const target = enemies.find((other) => Math.abs(other.x - unit.x) <= def.range + spriteBodyWidth(other) * 0.25);
    const baseDistance = unit.team === "player" ? WORLD.w - 160 - unit.x : unit.x - 160;
    if (target) {
      unit.state = "attack";
      unit.targetId = target.id;
      runAttack(unit, target, def, dt);
    } else if (baseDistance <= def.range + 26) {
      unit.state = "attack";
      unit.targetId = `${unit.team === "player" ? "enemy" : "player"}Base`;
      runBaseAttack(unit, def, dt);
    } else {
      unit.state = "walk";
      unit.targetId = null;
      unit.attackProgress = 0;
      unit.didHit = false;
      unit.x += dir * def.speed * dt;
    }
  }
  state.units = state.units.filter((u) => !u.dead || u.deathTimer < 1.1);
}

function runAttack(unit, target, def, dt) {
  unit.attackProgress += dt / def.attackRate;
  if (!unit.didHit && unit.attackProgress >= def.hitFrame) {
    unit.didHit = true;
    if (def.projectile) {
      const dir = TEAM[unit.team];
      state.projectiles.push({
        id: uid("proj"),
        team: unit.team,
        x: unit.x + dir * 42,
        y: unit.y - 104,
        vx: dir * def.projectile.speed,
        vy: -24,
        damage: def.damage,
        targetId: target.id,
        radius: def.projectile.radius,
        kind: "rock",
        life: 1.8,
      });
    } else {
      damageUnit(target, def.damage, unit);
    }
  }
  if (unit.attackProgress >= 1) {
    unit.attackProgress = 0;
    unit.didHit = false;
  }
}

function runBaseAttack(unit, def, dt) {
  unit.attackProgress += dt / def.attackRate;
  if (!unit.didHit && unit.attackProgress >= def.hitFrame) {
    unit.didHit = true;
    if (def.projectile) {
      const dir = TEAM[unit.team];
      state.projectiles.push({
        id: uid("proj"),
        team: unit.team,
        x: unit.x + dir * 42,
        y: unit.y - 104,
        vx: dir * def.projectile.speed,
        vy: -18,
        damage: def.damage,
        targetId: unit.team === "player" ? "enemyBase" : "playerBase",
        radius: def.projectile.radius,
        kind: "rock",
        life: 1.8,
      });
    } else {
      damageBase(unit.team === "player" ? "enemy" : "player", def.damage, unit.x + TEAM[unit.team] * 48);
    }
  }
  if (unit.attackProgress >= 1) {
    unit.attackProgress = 0;
    unit.didHit = false;
  }
}

function updateTurrets(dt) {
  for (const [team, turret] of [
    ["player", state.playerTurret],
    ["enemy", state.enemyTurret],
  ]) {
    if (!turret) continue;
    turret.cooldown -= dt;
    turret.flash = Math.max(0, turret.flash - dt);
    if (turret.cooldown > 0) continue;
    const dir = TEAM[team];
    const target = state.units
      .filter((u) => u.team !== team && !u.dead && Math.abs(u.x - turret.x) < TURRET.range)
      .sort((a, b) => Math.abs(a.x - turret.x) - Math.abs(b.x - turret.x))[0];
    if (!target) continue;
    turret.flash = 0.16;
    turret.cooldown = TURRET.fireRate;
    state.projectiles.push({
      id: uid("turretRock"),
      team,
      x: turret.x + dir * 54,
      y: turret.y - 62,
      vx: dir * TURRET.projectileSpeed,
      vy: -40,
      damage: TURRET.damage,
      targetId: target.id,
      radius: 10,
      kind: "rock",
      life: 1.5,
    });
  }
}

function updateProjectiles(dt) {
  for (const p of state.projectiles) {
    p.life -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 130 * dt;
    const baseHit =
      (p.targetId === "enemyBase" && p.x >= WORLD.w - 176) || (p.targetId === "playerBase" && p.x <= 176);
    if (baseHit) {
      damageBase(p.targetId === "enemyBase" ? "enemy" : "player", p.damage, p.x);
      p.life = 0;
      continue;
    }
    const target = state.units.find((u) => u.id === p.targetId && !u.dead);
    if (!target && p.targetId && !p.targetId.endsWith("Base")) {
      p.life = Math.min(p.life, 0.05);
      continue;
    }
    if (target && Math.abs(target.x - p.x) < 38 && Math.abs(target.y - 98 - p.y) < 78) {
      damageUnit(target, p.damage, p);
      p.life = 0;
    }
  }
  state.projectiles = state.projectiles.filter((p) => p.life > 0 && p.x > -80 && p.x < WORLD.w + 80);
}

function damageUnit(unit, amount, source) {
  if (unit.dead) return;
  unit.hp -= amount;
  unit.hurtFlash = 0.16;
  state.xp += source.team === "player" ? amount * 0.16 : 0;
  hitSpark(unit.x, unit.y - 86);
  floatText(`-${Math.round(amount)}`, unit.x, unit.y - 142, "#fff0a7");
  if (unit.hp <= 0) {
    killUnit(unit, source);
  }
}

function killUnit(unit, source) {
  unit.dead = true;
  unit.state = "death";
  unit.deathTimer = 0;
  unit.hp = 0;
  spawnDust(unit.x, unit.y + 18, unit.team);
  if (source.team === "player") {
    const def = UNITS[unit.type];
    state.gold += def.reward;
    state.xp += def.xpReward;
    floatText(`+${def.reward}g`, unit.x, unit.y - 178, "#ffe081");
  }
}

function damageBase(base, amount, x) {
  if (base === "enemy") {
    state.enemyBaseHp = Math.max(0, state.enemyBaseHp - amount);
    state.xp += amount * 0.08;
    hitSpark(WORLD.w - 160, WORLD.laneY - 90);
  } else {
    state.playerBaseHp = Math.max(0, state.playerBaseHp - amount);
    hitSpark(160, WORLD.laneY - 90);
  }
  state.shake = Math.max(state.shake, 0.08);
  floatText(`-${Math.round(amount)}`, x, WORLD.laneY - 170, "#ffcf8f");
}

function checkBases() {
  if (state.enemyBaseHp <= 0) endGame("player");
  if (state.playerBaseHp <= 0) endGame("enemy");
}

function endGame(winner) {
  if (state.ended) return;
  state.ended = true;
  state.winner = winner;
  ui.banner.textContent = winner === "player" ? "Enemy Cave Broken" : "Your Cave Fell";
  ui.banner.classList.remove("hidden");
  setStatus(winner === "player" ? "Victory. The Stone Age is yours." : "Defeat. Restart and build earlier pressure.");
}

function updateParticles(dt) {
  for (const p of state.particles) {
    p.life -= dt;
    if (p.kind === "meteor") {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (!p.hit && p.maxLife - p.life >= p.hitAt) {
        p.hit = true;
        meteorImpact(p.damageX);
      }
    } else {
      p.x += (p.vx || 0) * dt;
      p.y += (p.vy || 0) * dt;
      if (p.gravity) p.vy += p.gravity * dt;
    }
  }
  for (const f of state.floats) {
    f.y -= 40 * dt;
    f.life -= dt;
  }
  state.particles = state.particles.filter((p) => p.life > 0);
  state.floats = state.floats.filter((f) => f.life > 0);
}

function meteorImpact(x) {
  state.shake = Math.max(state.shake, 0.25);
  ring(x, WORLD.laneY - 38, SPECIAL.radius, "#ffde7a");
  for (const unit of state.units) {
    if (unit.team === "enemy" && !unit.dead && Math.abs(unit.x - x) <= SPECIAL.radius) {
      damageUnit(unit, SPECIAL.damage, { team: "player" });
    }
  }
  damageBase("enemy", Math.round(SPECIAL.damage * 0.45), x);
  for (let i = 0; i < 18; i += 1) {
    state.particles.push({
      id: uid("debris"),
      kind: "debris",
      x,
      y: WORLD.laneY - 42,
      vx: -180 + Math.random() * 360,
      vy: -220 - Math.random() * 120,
      gravity: 520,
      life: 0.7 + Math.random() * 0.3,
      maxLife: 1,
      size: 3 + Math.random() * 4,
    });
  }
}

function spawnDust(x, y, team) {
  for (let i = 0; i < 7; i += 1) {
    state.particles.push({
      id: uid("dust"),
      kind: "dust",
      x: x + (Math.random() - 0.5) * 28,
      y: y + Math.random() * 10,
      vx: (team === "player" ? -1 : 1) * (18 + Math.random() * 34),
      vy: -20 - Math.random() * 30,
      life: 0.6 + Math.random() * 0.25,
      maxLife: 0.85,
      frameOffset: Math.floor(Math.random() * SPRITES.dust.length),
    });
  }
}

function hitSpark(x, y) {
  state.particles.push({
    id: uid("spark"),
    kind: "spark",
    x,
    y,
    life: 0.28,
    maxLife: 0.28,
    frameOffset: Math.floor(Math.random() * SPRITES.spark.length),
  });
}

function ring(x, y, radius, color) {
  state.particles.push({ id: uid("ring"), kind: "ring", x, y, radius, color, life: 0.38, maxLife: 0.38 });
}

function floatText(text, x, y, color) {
  state.floats.push({ id: uid("float"), text, x, y, color, life: 0.9 });
}

function draw() {
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.save();
  const scale = Math.min(rect.width / WORLD.w, rect.height / WORLD.h);
  const ox = (rect.width - WORLD.w * scale) / 2;
  const oy = (rect.height - WORLD.h * scale) / 2;
  ctx.translate(ox, oy);
  ctx.scale(scale, scale);
  if (state.shake > 0) {
    ctx.translate((Math.random() - 0.5) * state.shake * 14, (Math.random() - 0.5) * state.shake * 9);
  }
  drawScene();
  ctx.restore();
}

function drawScene() {
  if (!assets.ready) {
    ctx.fillStyle = "#203226";
    ctx.fillRect(0, 0, WORLD.w, WORLD.h);
    ctx.fillStyle = "#fff1be";
    ctx.font = "900 32px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Loading Stone Age...", WORLD.w / 2, WORLD.h / 2);
    return;
  }
  drawBackground();
  drawBases();
  drawTurrets();
  drawGroundDetails();
  drawProjectiles();
  drawUnits();
  drawParticles();
  drawFloats();
  drawCooldownOverlay();
}

function drawBackground() {
  ctx.drawImage(assets.bg, 0, 0, WORLD.w, WORLD.h);
  const shade = ctx.createLinearGradient(0, 0, 0, WORLD.h);
  shade.addColorStop(0, "rgba(20, 34, 44, 0.02)");
  shade.addColorStop(0.68, "rgba(42, 28, 14, 0.04)");
  shade.addColorStop(1, "rgba(22, 18, 13, 0.24)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, WORLD.w, WORLD.h);
  ctx.fillStyle = "rgba(58, 41, 22, 0.34)";
  ctx.beginPath();
  ctx.ellipse(WORLD.w / 2, WORLD.floorY + 6, 560, 38, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawBases() {
  drawSprite(SPRITES.playerBase, 120, WORLD.laneY - 20, 0.86, false);
  drawSprite(SPRITES.enemyBase, WORLD.w - 120, WORLD.laneY - 20, 0.86, false);
  drawBaseHp(144, 220, state.playerBaseHp, "#5edb91");
  drawBaseHp(WORLD.w - 144, 220, state.enemyBaseHp, "#ec7c61");
}

function drawBaseHp(x, y, hp, color) {
  const w = 170;
  const pct = Math.max(0, hp / BASE_MAX_HP);
  ctx.fillStyle = "rgba(8, 10, 9, 0.66)";
  ctx.fillRect(x - w / 2, y, w, 10);
  ctx.fillStyle = color;
  ctx.fillRect(x - w / 2 + 2, y + 2, (w - 4) * pct, 6);
}

function drawTurrets() {
  if (state.playerTurret) drawTurret(state.playerTurret, "player");
  if (state.enemyTurret) drawTurret(state.enemyTurret, "enemy");
}

function drawTurret(turret, team) {
  const dirEnemy = team === "enemy";
  const frame = turret.flash > 0 ? SPRITES.turretIdle[1] : SPRITES.turretIdle[0];
  drawSprite(frame, turret.x, turret.y, 0.66, dirEnemy);
  if (turret.flash > 0) {
    ctx.globalAlpha = turret.flash / 0.16;
    ctx.fillStyle = "#ffe184";
    ctx.beginPath();
    ctx.arc(turret.x + TEAM[team] * 56, turret.y - 46, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function drawGroundDetails() {
  ctx.fillStyle = "rgba(13, 10, 8, 0.22)";
  for (const x of [212, 380, 548, 742, 936, 1114]) {
    ctx.beginPath();
    ctx.ellipse(x, WORLD.floorY - 12 + Math.sin(state.time + x) * 2, 54, 7, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawUnits() {
  const ordered = [...state.units].sort((a, b) => a.y - b.y || a.x - b.x);
  for (const unit of ordered) {
    const def = UNITS[unit.type];
    const spriteSet = SPRITES[def.sprite];
    const frame = frameFor(unit, spriteSet);
    const flip = unit.team === "enemy";
    const bob = unit.state === "walk" && !unit.dead ? Math.sin((state.time + unit.x * 0.01) * 10) * 2 : 0;
    ctx.globalAlpha = unit.dead ? Math.max(0, 1 - unit.deathTimer / 1.1) : 1;
    drawShadow(unit.x, unit.y + 20, spriteBodyWidth(unit) * def.scale);
    if (unit.hurtFlash > 0) {
      ctx.save();
      ctx.globalAlpha = 0.65;
      ctx.filter = "brightness(1.85) saturate(1.2)";
      drawSprite(frame, unit.x, unit.y + bob, def.scale, flip);
      ctx.restore();
    } else {
      drawSprite(frame, unit.x, unit.y + bob, def.scale, flip);
    }
    ctx.globalAlpha = 1;
    if (!unit.dead) drawUnitHp(unit);
  }
}

function frameFor(unit, set) {
  if (unit.dead) return set.death[0];
  if (unit.state === "attack") {
    const frames = set.attack;
    return frames[Math.min(frames.length - 1, Math.floor(unit.attackProgress * frames.length))];
  }
  if (unit.state === "walk") {
    const frames = set.walk;
    return frames[Math.floor(state.time * 8 + unit.x * 0.03) % frames.length];
  }
  return set.idle[0];
}

function drawUnitHp(unit) {
  const w = Math.max(42, spriteBodyWidth(unit) * 0.5);
  const pct = Math.max(0, unit.hp / unit.maxHp);
  ctx.fillStyle = "rgba(7, 9, 8, 0.72)";
  ctx.fillRect(unit.x - w / 2, unit.y - 172, w, 7);
  ctx.fillStyle = unit.team === "player" ? "#5de08e" : "#ef755e";
  ctx.fillRect(unit.x - w / 2 + 1, unit.y - 171, (w - 2) * pct, 5);
}

function drawShadow(x, y, width) {
  ctx.fillStyle = "rgba(17, 11, 8, 0.26)";
  ctx.beginPath();
  ctx.ellipse(x, y, Math.max(34, width * 0.34), 11, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawProjectiles() {
  for (const p of state.projectiles) {
    const frame = SPRITES.rock[Math.min(SPRITES.rock.length - 1, Math.floor((state.time * 10) % SPRITES.rock.length))];
    drawSprite(frame, p.x, p.y, 0.5, p.vx < 0);
  }
}

function drawParticles() {
  for (const p of state.particles) {
    const alpha = Math.max(0, Math.min(1, p.life / p.maxLife));
    ctx.globalAlpha = alpha;
    if (p.kind === "dust") {
      const frame = SPRITES.dust[p.frameOffset % SPRITES.dust.length];
      drawSprite(frame, p.x, p.y, 0.5 + (1 - alpha) * 0.3, false);
    } else if (p.kind === "spark") {
      const frame = SPRITES.spark[p.frameOffset % SPRITES.spark.length];
      drawSprite(frame, p.x, p.y, 0.55 + (1 - alpha) * 0.3, false);
    } else if (p.kind === "meteor") {
      const frame = SPRITES.meteor[(p.frameOffset + Math.floor(state.time * 8)) % SPRITES.meteor.length];
      drawSprite(frame, p.x, p.y, 0.72, false);
    } else if (p.kind === "ring") {
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * (1.15 - alpha * 0.15), 0, Math.PI * 2);
      ctx.stroke();
    } else if (p.kind === "debris") {
      ctx.fillStyle = "#6f5b44";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}

function drawFloats() {
  ctx.font = "900 18px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const f of state.floats) {
    ctx.globalAlpha = Math.max(0, f.life);
    ctx.fillStyle = "rgba(18, 12, 8, 0.72)";
    ctx.fillText(f.text, f.x + 2, f.y + 2);
    ctx.fillStyle = f.color;
    ctx.fillText(f.text, f.x, f.y);
  }
  ctx.globalAlpha = 1;
}

function drawCooldownOverlay() {
  if (state.paused || state.ended) {
    ctx.fillStyle = "rgba(12, 15, 14, 0.38)";
    ctx.fillRect(0, 0, WORLD.w, WORLD.h);
    ctx.fillStyle = "#fff0bc";
    ctx.font = "900 46px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(state.ended ? "" : "Paused", WORLD.w / 2, WORLD.h / 2 - 30);
  }
}

function drawSprite(frame, x, y, scale = 1, flip = false) {
  if (!assets.atlas || !frame) return;
  ctx.save();
  ctx.translate(x, y);
  if (flip) ctx.scale(-1, 1);
  ctx.drawImage(
    assets.atlas,
    frame.x,
    frame.y,
    frame.w,
    frame.h,
    -frame.ox * scale,
    -frame.oy * scale,
    frame.w * scale,
    frame.h * scale,
  );
  ctx.restore();
}

function spriteBodyWidth(unit) {
  const def = UNITS[unit.type];
  const set = SPRITES[def.sprite];
  return set.idle[0].w * def.scale;
}

function setStatus(text) {
  ui.status.textContent = text;
}

function pulseButton(selector) {
  const button = document.querySelector(selector);
  if (!button) return;
  button.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-4px)" },
      { transform: "translateX(4px)" },
      { transform: "translateX(0)" },
    ],
    { duration: 180 },
  );
}

function updateUI() {
  ui.gold.textContent = Math.floor(state.gold);
  ui.xp.textContent = Math.floor(state.xp);
  ui.speed.textContent = `${state.speed}x`;
  ui.playerHp.textContent = `${Math.ceil(state.playerBaseHp)} / ${BASE_MAX_HP}`;
  ui.enemyHp.textContent = `${Math.ceil(state.enemyBaseHp)} / ${BASE_MAX_HP}`;
  ui.playerHpBar.style.width = `${Math.max(0, (state.playerBaseHp / BASE_MAX_HP) * 100)}%`;
  ui.enemyHpBar.style.width = `${Math.max(0, (state.enemyBaseHp / BASE_MAX_HP) * 100)}%`;
  ui.pause.textContent = state.paused ? "Resume" : "Pause";
  ui.speedBtn.textContent = state.speed === 1 ? "Speed x2" : state.speed === 2 ? "Speed x3" : "Speed x1";
  for (const button of ui.buyButtons) {
    const def = UNITS[button.dataset.buy];
    button.classList.toggle("cant", state.gold < def.cost);
  }
  ui.turret.classList.toggle("cant", state.gold < TURRET.cost || Boolean(state.playerTurret));
  ui.turret.disabled = Boolean(state.playerTurret);
  ui.turret.querySelector("small").textContent = state.playerTurret ? "Built" : "190g";
  const specialReady = state.xp >= SPECIAL.xpCost && state.specialCooldown <= 0;
  ui.special.classList.toggle("ready", specialReady);
  ui.special.classList.toggle("cant", !specialReady);
  ui.special.querySelector("small").textContent =
    state.specialCooldown > 0 ? `${Math.ceil(state.specialCooldown)}s` : "120xp";
  publishQaState();
}

function restart() {
  state = makeInitialState();
  accumulator = 0;
  lastTime = 0;
  ui.banner.classList.add("hidden");
  setStatus("Buy units, build one turret, and break the enemy cave.");
  updateUI();
}

window.__PRIMAL_DEBUG = {
  summary: summaryForQa,
  reset() {
    restart();
  },
  buy(type) {
    buyUnit(type);
  },
  spawn(team, type) {
    spawnUnit(team, type);
  },
  buildTurret() {
    buildTurret();
  },
  castSpecial() {
    castSpecial();
  },
  grant(resources = {}) {
    state.gold += resources.gold || 0;
    state.xp += resources.xp || 0;
    updateUI();
  },
  step(seconds = 1) {
    const steps = Math.min(6000, Math.max(1, Math.floor(seconds / FIXED_DT)));
    for (let i = 0; i < steps; i += 1) update(FIXED_DT);
    draw();
  },
  canvasStats() {
    return canvasStatsForQa();
  },
};

function summaryForQa() {
  return {
    ready: assets.ready,
    gold: Math.floor(state.gold),
    xp: Math.floor(state.xp),
    playerBaseHp: Math.ceil(state.playerBaseHp),
    enemyBaseHp: Math.ceil(state.enemyBaseHp),
    playerUnits: state.units.filter((unit) => unit.team === "player" && !unit.dead).length,
    enemyUnits: state.units.filter((unit) => unit.team === "enemy" && !unit.dead).length,
    projectiles: state.projectiles.length,
    particles: state.particles.length,
    hasPlayerTurret: Boolean(state.playerTurret),
    hasEnemyTurret: Boolean(state.enemyTurret),
    specialCooldown: Number(state.specialCooldown.toFixed(2)),
    paused: state.paused,
    ended: state.ended,
    winner: state.winner,
  };
}

function canvasStatsForQa() {
  const rect = canvas.getBoundingClientRect();
  const sample = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let nonBlank = 0;
  let transparent = 0;
  for (let i = 0; i < sample.length; i += 64) {
    const alpha = sample[i + 3];
    if (alpha === 0) transparent += 1;
    if (alpha > 0 && (sample[i] > 20 || sample[i + 1] > 20 || sample[i + 2] > 20)) nonBlank += 1;
  }
  return {
    cssWidth: Math.round(rect.width),
    cssHeight: Math.round(rect.height),
    bitmapWidth: canvas.width,
    bitmapHeight: canvas.height,
    nonBlank,
    transparent,
  };
}

function publishQaState() {
  document.documentElement.dataset.primalState = JSON.stringify(summaryForQa());
}

function handleQaCommand() {
  const raw = document.documentElement.dataset.primalCommand;
  if (!raw) return;
  delete document.documentElement.dataset.primalCommand;
  let result;
  try {
    const command = JSON.parse(raw);
    if (command.type === "reset") restart();
    if (command.type === "buy") buyUnit(command.unit);
    if (command.type === "spawn") spawnUnit(command.team, command.unit);
    if (command.type === "turret") buildTurret();
    if (command.type === "special") castSpecial();
    if (command.type === "grant") {
      state.gold += command.gold || 0;
      state.xp += command.xp || 0;
      updateUI();
    }
    if (command.type === "step") {
      const steps = Math.min(6000, Math.max(1, Math.floor((command.seconds || 1) / FIXED_DT)));
      for (let i = 0; i < steps; i += 1) update(FIXED_DT);
      draw();
    }
    result = { ok: true, state: summaryForQa(), canvas: canvasStatsForQa() };
  } catch (error) {
    result = { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
  document.documentElement.dataset.primalResult = JSON.stringify(result);
  publishQaState();
}

function frame(ts) {
  if (!lastTime) lastTime = ts;
  const frameDt = Math.min(0.08, (ts - lastTime) / 1000 || 0);
  lastTime = ts;
  handleQaCommand();
  accumulator += frameDt * state.speed;
  let steps = 0;
  while (accumulator >= FIXED_DT && steps < 8) {
    update(FIXED_DT);
    accumulator -= FIXED_DT;
    steps += 1;
  }
  draw();
  requestAnimationFrame(frame);
}

ui.buyButtons.forEach((button) => {
  button.addEventListener("click", () => buyUnit(button.dataset.buy));
});
ui.turret.addEventListener("click", buildTurret);
ui.special.addEventListener("click", castSpecial);
ui.pause.addEventListener("click", () => {
  state.paused = !state.paused;
  setStatus(state.paused ? "Battle paused." : "Battle resumed.");
  updateUI();
});
ui.speedBtn.addEventListener("click", () => {
  state.speed = state.speed === 1 ? 2 : state.speed === 2 ? 3 : 1;
  updateUI();
});
ui.restart.addEventListener("click", restart);
window.addEventListener("resize", resize);

resize();
restart();
loadAssets()
  .then(() => {
    setStatus("Stone Age assets loaded. Send the first wave.");
    draw();
  })
  .catch(() => {
    setStatus("Asset loading failed. Check the assets folder.");
  });
requestAnimationFrame(frame);
