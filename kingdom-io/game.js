const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const ui = {
  gold: document.querySelector("#gold"),
  food: document.querySelector("#food"),
  land: document.querySelector("#land"),
  alive: document.querySelector("#alive"),
  status: document.querySelector("#status"),
  selected: document.querySelector("#selected"),
  hint: document.querySelector("#hint"),
  victory: document.querySelector("#victory"),
  splash: document.querySelector("#splash"),
  splashStart: document.querySelector("#splashStart"),
  start: document.querySelector("#startBtn"),
  pause: document.querySelector("#pauseBtn"),
  reset: document.querySelector("#resetBtn"),
  buildButtons: [...document.querySelectorAll("[data-build]")]
};

const COLS = 72;
const ROWS = 46;
const TILE = 18;
const WORLD_W = COLS * TILE;
const WORLD_H = ROWS * TILE;
const NEUTRAL = -1;
const WIN_SHARE = 0.6;
const BUILDINGS = {
  farm: { label: "Farm", gold: 25, food: 0, incomeGold: 0.75, incomeFood: 1.45, defense: 0, tower: 0 },
  barracks: { label: "Barracks", gold: 45, food: 15, incomeGold: 0.05, incomeFood: -0.08, defense: 0.2, tower: 0 },
  tower: { label: "Watchtower", gold: 55, food: 10, incomeGold: 0, incomeFood: -0.03, defense: 0.08, tower: 5 }
};

const terrainColors = ["#355f32", "#42713b", "#2e5530", "#54713b", "#3e6634"];
const keys = new Set();
const pointer = { x: 0, y: 0, worldX: 0, worldY: 0 };
const terrain = new Uint8Array(COLS * ROWS);
const territory = new Int16Array(COLS * ROWS);
const trailOwner = new Int16Array(COLS * ROWS);
const buildingAt = new Int16Array(COLS * ROWS);
const particles = [];

let W = 0;
let H = 0;
let dpr = 1;
let last = 0;
let running = false;
let paused = false;
let ended = false;
let selectedBuild = "farm";
let kingdoms = [];
let player = null;
let camera = { x: 0, y: 0 };
let uiTimer = 0;
let matchTime = 0;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function index(x, y) {
  return y * COLS + x;
}

function inBounds(x, y) {
  return x >= 0 && y >= 0 && x < COLS && y < ROWS;
}

function hash(x, y, salt = 0) {
  const n = Math.sin(x * 127.1 + y * 311.7 + salt * 41.9) * 43758.5453123;
  return n - Math.floor(n);
}

function cellFromWorld(x, y) {
  return {
    x: clamp(Math.floor(x / TILE), 0, COLS - 1),
    y: clamp(Math.floor(y / TILE), 0, ROWS - 1)
  };
}

function colorMix(a, b, t) {
  const ca = parseInt(a.slice(1), 16);
  const cb = parseInt(b.slice(1), 16);
  const ar = (ca >> 16) & 255;
  const ag = (ca >> 8) & 255;
  const ab = ca & 255;
  const br = (cb >> 16) & 255;
  const bg = (cb >> 8) & 255;
  const bb = cb & 255;
  const r = Math.round(lerp(ar, br, t));
  const g = Math.round(lerp(ag, bg, t));
  const bl = Math.round(lerp(ab, bb, t));
  return `rgb(${r}, ${g}, ${bl})`;
}

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = Math.floor(W * dpr);
  canvas.height = Math.floor(H * dpr);
  canvas.style.width = `${W}px`;
  canvas.style.height = `${H}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;
}

function makeKingdom(id, name, color, homeX, homeY, ai = false) {
  return {
    id,
    name,
    color,
    dark: colorMix(color, "#111111", 0.42),
    x: homeX + 0.5,
    y: homeY + 0.5,
    dirX: 1,
    dirY: 0,
    lastCell: -1,
    homeX,
    homeY,
    ai,
    alive: true,
    gold: ai ? 70 : 90,
    food: ai ? 34 : 50,
    baseGold: 1.2,
    baseFood: 0.65,
    buildings: [],
    trail: [],
    trailSet: new Set(),
    trailGrace: 0,
    think: 0,
    buildThink: 1 + hash(homeX, homeY, 12) * 4,
    aiMode: "home",
    targetX: homeX,
    targetY: homeY,
    desiredTrail: 7,
    respawnFlash: 0
  };
}

function generateTerrain() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const ridge = Math.sin(x * 0.34) + Math.cos(y * 0.27) + hash(x, y, 3) * 1.4;
      terrain[index(x, y)] = clamp(Math.floor(ridge + 2), 0, terrainColors.length - 1);
    }
  }
}

function resetArrays() {
  territory.fill(NEUTRAL);
  trailOwner.fill(NEUTRAL);
  buildingAt.fill(NEUTRAL);
}

function claimDisk(ownerId, cx, cy, radius) {
  for (let y = cy - radius; y <= cy + radius; y++) {
    for (let x = cx - radius; x <= cx + radius; x++) {
      if (!inBounds(x, y)) continue;
      const dx = x - cx;
      const dy = y - cy;
      if (dx * dx + dy * dy <= radius * radius + 1) {
        territory[index(x, y)] = ownerId;
      }
    }
  }
}

function initGame() {
  generateTerrain();
  resetArrays();
  particles.length = 0;
  kingdoms = [
    makeKingdom(0, "Crownhold", "#f5c84c", 10, 23, false),
    makeKingdom(1, "Berry Court", "#e95a6a", 58, 11, true),
    makeKingdom(2, "Azure Keep", "#56a8f5", 56, 35, true),
    makeKingdom(3, "Moss Barony", "#67c66a", 20, 10, true),
    makeKingdom(4, "Violet Duchy", "#b579e8", 28, 35, true)
  ];
  player = kingdoms[0];
  for (const k of kingdoms) claimDisk(k.id, k.homeX, k.homeY, 4);
  selectedBuild = "farm";
  running = false;
  paused = false;
  ended = false;
  matchTime = 0;
  last = 0;
  updateBuildButtons();
  updateUI(true);
  centerCamera();
}

function centerCamera() {
  camera.x = clamp(player.x * TILE - W / 2, 0, Math.max(0, WORLD_W - W));
  camera.y = clamp(player.y * TILE - H / 2, 0, Math.max(0, WORLD_H - H));
}

function worldToScreenX(x) {
  return Math.floor(x - camera.x);
}

function worldToScreenY(y) {
  return Math.floor(y - camera.y);
}

function screenToWorld(x, y) {
  return { x: x + camera.x, y: y + camera.y };
}

function setStatus(text) {
  ui.status.textContent = text;
}

function startGame() {
  running = true;
  paused = false;
  ui.splash.classList.add("hidden");
  setStatus("The crown is moving.");
}

function endGame(won, text) {
  ended = true;
  running = false;
  ui.splash.classList.remove("hidden");
  ui.splash.querySelector("h2").textContent = won ? "Realm United" : "Crown Fallen";
  ui.splash.querySelector("p").textContent = text;
  ui.splashStart.textContent = "Play Again";
  setStatus(text);
}

function territoryCount(ownerId) {
  let count = 0;
  for (let i = 0; i < territory.length; i++) {
    if (territory[i] === ownerId) count++;
  }
  return count;
}

function aliveKingdoms() {
  return kingdoms.filter(k => k.alive);
}

function incomeFor(k) {
  let gold = k.baseGold + territoryCount(k.id) * 0.012;
  let food = k.baseFood + territoryCount(k.id) * 0.006;
  let defense = 0.05;
  for (const b of k.buildings) {
    const spec = BUILDINGS[b.type];
    gold += spec.incomeGold;
    food += spec.incomeFood;
    defense += spec.defense;
  }
  return { gold, food: Math.max(0.05, food), defense: clamp(defense, 0, 0.82) };
}

function updateEconomy(dt) {
  for (const k of kingdoms) {
    if (!k.alive) continue;
    const income = incomeFor(k);
    k.gold += income.gold * dt;
    k.food += income.food * dt;
  }
}

function addTrailCell(k, cellIndex) {
  if (k.trailSet.has(cellIndex)) return;
  k.trail.push(cellIndex);
  k.trailSet.add(cellIndex);
  trailOwner[cellIndex] = k.id;
  const x = cellIndex % COLS;
  const y = Math.floor(cellIndex / COLS);
  spawnParticles((x + 0.5) * TILE, (y + 0.5) * TILE, k.color, 2);
}

function clearTrail(k) {
  for (const idx of k.trail) {
    if (trailOwner[idx] === k.id) trailOwner[idx] = NEUTRAL;
  }
  k.trail.length = 0;
  k.trailSet.clear();
}

function closeLoop(k) {
  if (!k.trail.length) return;
  const barrier = new Uint8Array(COLS * ROWS);
  for (let i = 0; i < territory.length; i++) {
    if (territory[i] === k.id) barrier[i] = 1;
  }
  for (const idx of k.trail) barrier[idx] = 1;

  const outside = new Uint8Array(COLS * ROWS);
  const queue = [];
  for (let x = 0; x < COLS; x++) {
    queueEdge(x, 0, barrier, outside, queue);
    queueEdge(x, ROWS - 1, barrier, outside, queue);
  }
  for (let y = 0; y < ROWS; y++) {
    queueEdge(0, y, barrier, outside, queue);
    queueEdge(COLS - 1, y, barrier, outside, queue);
  }
  for (let head = 0; head < queue.length; head++) {
    const idx = queue[head];
    const x = idx % COLS;
    const y = Math.floor(idx / COLS);
    queueEdge(x + 1, y, barrier, outside, queue);
    queueEdge(x - 1, y, barrier, outside, queue);
    queueEdge(x, y + 1, barrier, outside, queue);
    queueEdge(x, y - 1, barrier, outside, queue);
  }

  let gained = 0;
  for (let i = 0; i < territory.length; i++) {
    if (barrier[i] && territory[i] !== k.id) {
      territory[i] = k.id;
      gained++;
    } else if (!outside[i] && territory[i] !== k.id) {
      territory[i] = k.id;
      gained++;
    }
  }
  clearTrail(k);
  k.gold += Math.min(40, gained * 0.18);
  k.food += Math.min(24, gained * 0.1);
  if (gained > 0) {
    const px = k.x * TILE;
    const py = k.y * TILE;
    spawnParticles(px, py, k.color, 18);
  }
  if (!k.ai) setStatus(`Border closed. ${gained} tiles joined the realm.`);
}

function queueEdge(x, y, barrier, outside, queue) {
  if (!inBounds(x, y)) return;
  const idx = index(x, y);
  if (barrier[idx] || outside[idx]) return;
  outside[idx] = 1;
  queue.push(idx);
}

function neutralizeKingdom(k) {
  for (let i = 0; i < territory.length; i++) {
    if (territory[i] === k.id) territory[i] = NEUTRAL;
    if (trailOwner[i] === k.id) trailOwner[i] = NEUTRAL;
  }
  for (const b of k.buildings) {
    buildingAt[index(b.x, b.y)] = NEUTRAL;
  }
  k.buildings.length = 0;
  clearTrail(k);
  k.alive = false;
}

function killKingdom(victim, cause) {
  if (!victim.alive) return;
  spawnParticles(victim.x * TILE, victim.y * TILE, victim.color, 34);
  if (victim === player) {
    neutralizeKingdom(victim);
    endGame(false, cause || "Your royal trail was cut.");
  } else {
    neutralizeKingdom(victim);
    setStatus(`${victim.name} fell.`);
  }
}

function setbackPlayerTrail(cause) {
  spawnParticles(player.x * TILE, player.y * TILE, player.color, 22);
  clearTrail(player);
  player.x = player.homeX + 0.5;
  player.y = player.homeY + 0.5;
  player.lastCell = -1;
  player.gold = Math.max(0, player.gold - 18);
  player.food = Math.max(0, player.food - 10);
  setStatus(cause || "Your royal trail was cut. The crown returned home.");
}

function towerProtected(ownerId, cellX, cellY) {
  const owner = kingdoms[ownerId];
  if (!owner || !owner.alive) return false;
  for (const b of owner.buildings) {
    if (b.type !== "tower") continue;
    const dx = b.x - cellX;
    const dy = b.y - cellY;
    if (dx * dx + dy * dy <= BUILDINGS.tower.tower * BUILDINGS.tower.tower) return true;
  }
  return false;
}

function resolveTrailConflict(attacker, trailId, cellX, cellY) {
  const victim = kingdoms[trailId];
  if (!victim || !victim.alive || victim === attacker) return;
  if (victim === player && matchTime < 8) {
    killKingdom(attacker, "Your opening escort protected the royal trail.");
    return;
  }
  if (victim === player) {
    setbackPlayerTrail(`${attacker.name} cut your exposed trail.`);
    return;
  }
  const guarded = towerProtected(victim.id, cellX, cellY);
  const defense = incomeFor(victim).defense + (guarded ? 0.45 : 0);
  if (hash(cellX, cellY, performance.now() * 0.001) < defense) {
    killKingdom(attacker, `${victim.name}'s guards caught your royal party.`);
  } else {
    killKingdom(victim, `${attacker.name} cut an exposed trail.`);
  }
}

function handleCellStep(k) {
  if (!k.alive) return;
  const cx = clamp(Math.floor(k.x), 0, COLS - 1);
  const cy = clamp(Math.floor(k.y), 0, ROWS - 1);
  const idx = index(cx, cy);
  if (idx === k.lastCell) return;
  k.lastCell = idx;

  const trailId = trailOwner[idx];
  if (trailId !== NEUTRAL && trailId !== k.id) {
    resolveTrailConflict(k, trailId, cx, cy);
    if (!k.alive) return;
  }

  const owner = territory[idx];
  if (owner === k.id) {
    closeLoop(k);
    return;
  }

  if (owner !== NEUTRAL && owner !== k.id && towerProtected(owner, cx, cy) && k.trail.length > 2) {
    const defender = kingdoms[owner];
    killKingdom(k, `${defender.name}'s watchtower caught your trail.`);
    return;
  }

  addTrailCell(k, idx);
}

function updatePlayerDirection() {
  let dx = 0;
  let dy = 0;
  if (keys.has("w") || keys.has("arrowup")) dy -= 1;
  if (keys.has("s") || keys.has("arrowdown")) dy += 1;
  if (keys.has("a") || keys.has("arrowleft")) dx -= 1;
  if (keys.has("d") || keys.has("arrowright")) dx += 1;
  if (dx || dy) {
    const len = Math.hypot(dx, dy);
    player.dirX = dx / len;
    player.dirY = dy / len;
  }
}

function updateLeader(k, dt) {
  const speed = k.ai ? 5.15 : 6.25;
  k.x = clamp(k.x + k.dirX * speed * dt, 0.25, COLS - 0.25);
  k.y = clamp(k.y + k.dirY * speed * dt, 0.25, ROWS - 0.25);
  handleCellStep(k);
}

function nearestOwnedCell(k) {
  let best = { x: k.homeX, y: k.homeY, d: Infinity };
  const cx = Math.floor(k.x);
  const cy = Math.floor(k.y);
  for (let r = 0; r < 11; r++) {
    for (let y = cy - r; y <= cy + r; y++) {
      for (let x = cx - r; x <= cx + r; x++) {
        if (!inBounds(x, y) || territory[index(x, y)] !== k.id) continue;
        const d = Math.abs(x - k.x) + Math.abs(y - k.y);
        if (d < best.d) best = { x, y, d };
      }
    }
    if (best.d < Infinity) return best;
  }
  return best;
}

function steerToward(k, tx, ty, wobble = 0) {
  let dx = tx + 0.5 - k.x;
  let dy = ty + 0.5 - k.y;
  if (Math.abs(dx) + Math.abs(dy) < 0.1) {
    dx = hash(k.id, tx, 1) - 0.5;
    dy = hash(k.id, ty, 2) - 0.5;
  }
  if (wobble) {
    dx += (hash(Math.floor(k.x), Math.floor(k.y), k.id) - 0.5) * wobble;
    dy += (hash(Math.floor(k.y), Math.floor(k.x), k.id + 5) - 0.5) * wobble;
  }
  const len = Math.hypot(dx, dy) || 1;
  k.dirX = dx / len;
  k.dirY = dy / len;
}

function updateAI(k, dt) {
  k.think -= dt;
  k.buildThink -= dt;
  const cx = Math.floor(k.x);
  const cy = Math.floor(k.y);
  const own = territory[index(cx, cy)] === k.id;

  if (k.buildThink <= 0) {
    k.buildThink = 3 + hash(cx, cy, k.id) * 5;
    aiBuild(k);
  }

  if (k.think <= 0) {
    k.think = 0.45 + hash(cx, cy, k.id + 2) * 0.45;
    if (k.trail.length > k.desiredTrail || (!own && k.trail.length > 4 && hash(cx, cy, k.id + 8) > 0.74)) {
      k.aiMode = "return";
      const target = nearestOwnedCell(k);
      k.targetX = target.x;
      k.targetY = target.y;
    } else if (own) {
      k.aiMode = "raid";
      const angle = hash(cx, cy, k.id + 13) * Math.PI * 2;
      k.targetX = clamp(Math.floor(k.x + Math.cos(angle) * (7 + hash(cx, cy, 9) * 7)), 1, COLS - 2);
      k.targetY = clamp(Math.floor(k.y + Math.sin(angle) * (5 + hash(cy, cx, 9) * 6)), 1, ROWS - 2);
      k.desiredTrail = 5 + Math.floor(hash(cx, cy, k.id + 20) * 12);
    }
  }

  if (k.aiMode === "return") {
    const target = nearestOwnedCell(k);
    steerToward(k, target.x, target.y, 0.18);
  } else {
    steerToward(k, k.targetX, k.targetY, 0.32);
  }

  if (k.x < 1 || k.x > COLS - 2) k.dirX *= -1;
  if (k.y < 1 || k.y > ROWS - 2) k.dirY *= -1;
}

function aiBuild(k) {
  const choices = ["farm", "farm", "barracks", "tower"];
  const type = choices[Math.floor(hash(k.buildings.length, k.id, 4) * choices.length)];
  const spec = BUILDINGS[type];
  if (k.gold < spec.gold || k.food < spec.food) return;
  const owned = [];
  for (let i = 0; i < territory.length; i++) {
    if (territory[i] === k.id && buildingAt[i] === NEUTRAL) owned.push(i);
  }
  if (!owned.length) return;
  const pick = owned[Math.floor(hash(k.id, owned.length, k.gold) * owned.length)];
  const x = pick % COLS;
  const y = Math.floor(pick / COLS);
  placeBuilding(k, x, y, type);
}

function placeBuilding(k, x, y, type) {
  if (!inBounds(x, y)) return false;
  const idx = index(x, y);
  const spec = BUILDINGS[type];
  if (!spec || territory[idx] !== k.id || buildingAt[idx] !== NEUTRAL) return false;
  if (k.gold < spec.gold || k.food < spec.food) return false;
  k.gold -= spec.gold;
  k.food -= spec.food;
  buildingAt[idx] = k.id;
  k.buildings.push({ x, y, type });
  spawnParticles((x + 0.5) * TILE, (y + 0.5) * TILE, k.color, 10);
  if (!k.ai) setStatus(`${spec.label} built.`);
  return true;
}

function spawnParticles(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    const a = hash(i, x, y) * Math.PI * 2;
    const s = 12 + hash(y, i, x) * 48;
    particles.push({
      x,
      y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      life: 0.35 + hash(i, y, 2) * 0.45,
      max: 0.8,
      color
    });
  }
}

function updateParticles(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 20 * dt;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function update(dt) {
  if (!running || paused || ended) return;
  matchTime += dt;
  updatePlayerDirection();
  updateEconomy(dt);
  for (const k of kingdoms) {
    if (!k.alive) continue;
    if (k.ai) updateAI(k, dt);
    updateLeader(k, dt);
  }
  updateParticles(dt);
  camera.x = lerp(camera.x, clamp(player.x * TILE - W / 2, 0, Math.max(0, WORLD_W - W)), 0.12);
  camera.y = lerp(camera.y, clamp(player.y * TILE - H / 2, 0, Math.max(0, WORLD_H - H)), 0.12);
  checkVictory();
  uiTimer -= dt;
  if (uiTimer <= 0) {
    uiTimer = 0.16;
    updateUI();
  }
}

function checkVictory() {
  if (!player.alive || ended) return;
  const share = territoryCount(player.id) / territory.length;
  const alive = aliveKingdoms();
  if (share >= WIN_SHARE) {
    endGame(true, "Your realm controls the majority of the map.");
  } else if (alive.length === 1 && alive[0] === player) {
    endGame(true, "Every rival crown has fallen.");
  }
}

function updateUI(force = false) {
  if (!force && !player) return;
  const landShare = territoryCount(player.id) / territory.length;
  ui.gold.textContent = Math.floor(player.gold);
  ui.food.textContent = Math.floor(player.food);
  ui.land.textContent = `${Math.floor(landShare * 100)}%`;
  ui.alive.textContent = aliveKingdoms().length;
  ui.victory.style.width = `${clamp((landShare / WIN_SHARE) * 100, 0, 100)}%`;
  for (const button of ui.buildButtons) {
    const type = button.dataset.build;
    const spec = BUILDINGS[type];
    button.disabled = player.gold < spec.gold || player.food < spec.food || !player.alive;
  }
}

function updateBuildButtons() {
  for (const button of ui.buildButtons) {
    button.classList.toggle("active", button.dataset.build === selectedBuild);
  }
  const spec = BUILDINGS[selectedBuild];
  ui.selected.textContent = `${spec.label} selected`;
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  ctx.imageSmoothingEnabled = false;
  drawMap();
  drawBuildings();
  drawTrails();
  drawLeaders();
  drawParticles();
  drawPointerCell();
}

function drawMap() {
  const startX = clamp(Math.floor(camera.x / TILE) - 1, 0, COLS - 1);
  const endX = clamp(Math.ceil((camera.x + W) / TILE) + 1, 0, COLS - 1);
  const startY = clamp(Math.floor(camera.y / TILE) - 1, 0, ROWS - 1);
  const endY = clamp(Math.ceil((camera.y + H) / TILE) + 1, 0, ROWS - 1);
  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      const idx = index(x, y);
      const sx = worldToScreenX(x * TILE);
      const sy = worldToScreenY(y * TILE);
      ctx.fillStyle = terrainColors[terrain[idx]];
      ctx.fillRect(sx, sy, TILE, TILE);
      const owner = territory[idx];
      if (owner !== NEUTRAL) {
        ctx.fillStyle = kingdoms[owner].dark;
        ctx.globalAlpha = 0.78;
        ctx.fillRect(sx + 1, sy + 1, TILE - 2, TILE - 2);
        ctx.globalAlpha = 1;
        ctx.fillStyle = kingdoms[owner].color;
        ctx.fillRect(sx + 2, sy + 2, TILE - 4, 2);
      }
      if (hash(x, y, 40) > 0.9) {
        ctx.fillStyle = "rgba(20, 34, 20, 0.28)";
        ctx.fillRect(sx + 4, sy + 12, 3, 3);
        ctx.fillRect(sx + 12, sy + 5, 2, 2);
      }
    }
  }
}

function drawTrails() {
  for (const k of kingdoms) {
    if (!k.alive) continue;
    for (const idx of k.trail) {
      const x = idx % COLS;
      const y = Math.floor(idx / COLS);
      const sx = worldToScreenX(x * TILE);
      const sy = worldToScreenY(y * TILE);
      ctx.fillStyle = k.color;
      ctx.fillRect(sx + 3, sy + 3, TILE - 6, TILE - 6);
      ctx.fillStyle = "#fff3b0";
      ctx.globalAlpha = 0.34;
      ctx.fillRect(sx + 5, sy + 5, TILE - 10, 2);
      ctx.globalAlpha = 1;
    }
  }
}

function drawBuildings() {
  for (const k of kingdoms) {
    if (!k.alive) continue;
    for (const b of k.buildings) {
      const sx = worldToScreenX(b.x * TILE);
      const sy = worldToScreenY(b.y * TILE);
      drawBuildingSprite(b.type, sx + 1, sy + 1, k.color);
    }
  }
}

function drawLeaders() {
  for (const k of kingdoms) {
    if (!k.alive) continue;
    const sx = worldToScreenX(k.x * TILE) - 8;
    const sy = worldToScreenY(k.y * TILE) - 11;
    drawLeaderSprite(sx, sy, k.color, k.ai);
    if (k.trail.length) {
      ctx.fillStyle = "#fff8c9";
      ctx.fillRect(sx + 5, sy - 4, 6, 2);
    }
  }
}

function drawParticles() {
  for (const p of particles) {
    const alpha = clamp(p.life / p.max, 0, 1);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.fillRect(worldToScreenX(p.x), worldToScreenY(p.y), 4, 4);
  }
  ctx.globalAlpha = 1;
}

function drawPointerCell() {
  if (!player || !player.alive) return;
  const cell = cellFromWorld(pointer.worldX, pointer.worldY);
  const idx = index(cell.x, cell.y);
  if (territory[idx] !== player.id) return;
  const sx = worldToScreenX(cell.x * TILE);
  const sy = worldToScreenY(cell.y * TILE);
  ctx.strokeStyle = BUILDINGS[selectedBuild].gold <= player.gold ? "#f5c84c" : "#ef5f5f";
  ctx.lineWidth = 2;
  ctx.strokeRect(sx + 2, sy + 2, TILE - 4, TILE - 4);
}

function drawPixel(pattern, palette, x, y, scale) {
  for (let row = 0; row < pattern.length; row++) {
    for (let col = 0; col < pattern[row].length; col++) {
      const key = pattern[row][col];
      const color = palette[key];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(Math.floor(x + col * scale), Math.floor(y + row * scale), scale, scale);
    }
  }
}

function drawLeaderSprite(x, y, color, ai) {
  const pattern = [
    "..yyyy..",
    ".yYyyYy.",
    ".oooooo.",
    "obbssbbo",
    "obssssbo",
    ".bBbbB.",
    "..b..b..",
    ".bb..bb."
  ];
  drawPixel(pattern, {
    y: "#c27b25",
    Y: "#ffe68a",
    o: color,
    b: "#2c1f1a",
    s: ai ? "#ddd6c2" : "#fff2cf",
    B: "#5a3822"
  }, x, y, 2);
}

function drawBuildingSprite(type, x, y, color) {
  const sprites = {
    farm: [
      "..gggg..",
      ".gyyyyg.",
      "ggGggGgg",
      "gGggGggg",
      "gggggggg",
      "..wwww..",
      ".wrrrrw.",
      "wwrrrrww"
    ],
    barracks: [
      "...rr...",
      "..rrrr..",
      ".rryyrr.",
      "rrrrrrrr",
      "rbbbbbr.",
      "rbwbbwr.",
      "rbbbbbr.",
      "bbbbbbbb"
    ],
    tower: [
      ".ssssss.",
      ".spssps.",
      "..ssss..",
      "..sccs..",
      "..sccs..",
      "..sccs..",
      ".ssccss.",
      "ssssssss"
    ]
  };
  drawPixel(sprites[type], {
    g: "#6fbf4b",
    G: "#e5d16c",
    y: "#f0d87a",
    w: "#8a5c33",
    r: color,
    b: "#4b3325",
    s: "#aeb8aa",
    p: "#3e3e46",
    c: "#6b7370"
  }, x, y, 2);
}

function frame(ts) {
  const dt = Math.min(0.05, (ts - last) / 1000 || 0);
  last = ts;
  update(dt);
  draw();
  requestAnimationFrame(frame);
}

canvas.addEventListener("pointermove", e => {
  const rect = canvas.getBoundingClientRect();
  pointer.x = e.clientX - rect.left;
  pointer.y = e.clientY - rect.top;
  const world = screenToWorld(pointer.x, pointer.y);
  pointer.worldX = world.x;
  pointer.worldY = world.y;
});

canvas.addEventListener("pointerdown", e => {
  if (!player || !player.alive || e.button !== 0) return;
  const rect = canvas.getBoundingClientRect();
  const world = screenToWorld(e.clientX - rect.left, e.clientY - rect.top);
  const cell = cellFromWorld(world.x, world.y);
  if (!placeBuilding(player, cell.x, cell.y, selectedBuild)) {
    ui.hint.textContent = "Build only on your empty territory with enough resources.";
    setStatus("The royal builders cannot place that there.");
  } else {
    ui.hint.textContent = "WASD to trace loops. Click your land to build.";
  }
  updateUI(true);
});

window.addEventListener("keydown", e => {
  const key = e.key.toLowerCase();
  keys.add(key);
  if (["w", "a", "s", "d", "arrowup", "arrowleft", "arrowdown", "arrowright"].includes(key)) {
    e.preventDefault();
  }
  if (key === " ") {
    paused = !paused;
    setStatus(paused ? "The court is paused." : "The crown is moving.");
  }
});

window.addEventListener("keyup", e => {
  keys.delete(e.key.toLowerCase());
});

ui.buildButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectedBuild = button.dataset.build;
    updateBuildButtons();
  });
});

ui.splashStart.addEventListener("click", () => {
  if (ended) {
    ui.splash.querySelector("h2").textContent = "Kingdom.io";
    ui.splash.querySelector("p").textContent = "Draw borders with your royal trail, then fill your realm with tiny farms, barracks, and watchtowers.";
    ui.splashStart.textContent = "Crown Up";
    initGame();
  }
  startGame();
});

ui.start.addEventListener("click", startGame);
ui.pause.addEventListener("click", () => {
  paused = !paused;
  setStatus(paused ? "The court is paused." : "The crown is moving.");
});
ui.reset.addEventListener("click", () => {
  ui.splash.classList.remove("hidden");
  ui.splash.querySelector("h2").textContent = "Kingdom.io";
  ui.splash.querySelector("p").textContent = "Draw borders with your royal trail, then fill your realm with tiny farms, barracks, and watchtowers.";
  ui.splashStart.textContent = "Crown Up";
  initGame();
});

window.addEventListener("resize", () => {
  resize();
  centerCamera();
});

resize();
initGame();
requestAnimationFrame(frame);
