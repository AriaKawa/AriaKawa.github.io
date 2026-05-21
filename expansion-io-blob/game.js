const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const ui = {
  money: document.querySelector("#money"),
  troops: document.querySelector("#troops"),
  income: document.querySelector("#income"),
  share: document.querySelector("#share"),
  statusLine: document.querySelector("#statusLine"),
  playerBadge: document.querySelector("#playerBadge"),
  selectedName: document.querySelector("#selectedName"),
  selectedMeta: document.querySelector("#selectedMeta"),
  victoryFill: document.querySelector("#victoryFill"),
  splash: document.querySelector("#splash"),
  splashStart: document.querySelector("#splashStart"),
  start: document.querySelector("#startBtn"),
  pause: document.querySelector("#pauseBtn"),
  speed: document.querySelector("#speedBtn"),
  reset: document.querySelector("#resetBtn"),
  expansion: document.querySelector("#expansionBtn"),
  expansionMenu: document.querySelector("#expansionMenu"),
  expansionLabel: document.querySelector("#expansionLabel"),
  expansionOptions: [...document.querySelectorAll("[data-expansion]")],
  factory: document.querySelector("#factoryBtn"),
  barracks: document.querySelector("#barracksBtn"),
  depot: document.querySelector("#depotBtn"),
  nuke: document.querySelector("#nukeBtn"),
  front: document.querySelector("#frontBtn"),
  supply: document.querySelector("#supplyBtn"),
  clear: document.querySelector("#clearBtn")
};

const SQRT3 = Math.sqrt(3);
const TAU = Math.PI * 2;
const COLS = 114;
const ROWS = 84;
const HEX = 28;
const BLOB_RADIUS = HEX * 0.96;
const GAME_PACE = 0.82;
const PLAYER = "you";
const NEUTRAL = "neutral";
const MINOR_COUNT = 78;
const MAJOR_IDS = ["ember", "azure", "viridian", "violet", "copper"];
const minorColors = ["#d77d68", "#d7b45d", "#8ccf79", "#6cc6a3", "#6aaee8", "#8b91e8", "#c47bd8", "#d56f9f", "#b9c26d", "#6fcfd2"];
const BUILDINGS = {
  factory: { label: "Factory", cost: 80, money: 4.8, troops: 0.05, supply: 0.18 },
  barracks: { label: "Barracks", cost: 70, money: 0.3, troops: 0.86, supply: 0.12 },
  depot: { label: "Depot", cost: 60, money: 0.1, troops: 0.06, supply: 0.72 }
};

const terrains = {
  plains: { color: "#263b31", money: 1, troops: 1, defense: 1, expand: 1, supply: 1 },
  forest: { color: "#1f4638", money: 0.92, troops: 1.06, defense: 1.13, expand: 0.92, supply: 0.94 },
  hills: { color: "#51462d", money: 0.82, troops: 0.95, defense: 1.25, expand: 0.82, supply: 0.86 },
  mountain: { color: "#5a5960", money: 0.62, troops: 0.72, defense: 1.48, expand: 0.62, supply: 0.7 },
  city: { color: "#475f68", money: 1.58, troops: 1.34, defense: 1.12, expand: 1.05, supply: 1.18 }
};

const dirs = [
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [0, 1]
];

let W = 0;
let H = 0;
let dpr = 1;
let last = 0;
let cells = [];
let cellMap = new Map();
let players = {};
let particles = [];
let nuke = { active: false, time: 0, done: false };
let camera = { x: 0, y: 0, zoom: 0.58 };
let selected = null;
let hovered = null;
let mode = "focus";
let expansionMode = "free";
let expansionMenuOpen = false;
let directionVector = { x: 1, y: 0, set: false };
let directionAnchor = null;
let running = false;
let ended = false;
let speed = 1;
let showFront = true;
let showSupply = false;
let pointer = { down: false, panning: false, x: 0, y: 0, lastX: 0, lastY: 0 };
let world = { w: 0, h: 0 };
let supplyTimer = 0;
let aiTimer = 0;
let uiTimer = 0;
let expandBank = 0;
let combatBank = 0;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function hash(q, r, salt = 0) {
  const x = Math.sin(q * 127.1 + r * 311.7 + salt * 74.7) * 43758.5453123;
  return x - Math.floor(x);
}

function key(q, r) {
  return `${q},${r}`;
}

function hexDistance(a, b) {
  return (Math.abs(a.q - b.q) + Math.abs(a.q + a.r - b.q - b.r) + Math.abs(a.r - b.r)) / 2;
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
  clampCamera();
}

function createPlayers() {
  players = {
    you: { id: "you", name: "Auric Command", role: "human", tier: "human", color: "#f5c849", money: 150, reserves: 72, moneyIncome: 0, troopIncome: 0, alive: true, ai: false, buildTimer: 0 },
    ember: { id: "ember", name: "Ember League", role: "major", tier: "major", color: "#f06b61", money: 170, reserves: 96, moneyIncome: 0, troopIncome: 0, alive: true, ai: true, buildTimer: 2 },
    azure: { id: "azure", name: "Azure Pact", role: "major", tier: "major", color: "#57b8ff", money: 170, reserves: 96, moneyIncome: 0, troopIncome: 0, alive: true, ai: true, buildTimer: 4 },
    viridian: { id: "viridian", name: "Viridian Bloc", role: "major", tier: "major", color: "#67d391", money: 170, reserves: 96, moneyIncome: 0, troopIncome: 0, alive: true, ai: true, buildTimer: 6 },
    violet: { id: "violet", name: "Violet Directorate", role: "major", tier: "major", color: "#b286ff", money: 170, reserves: 96, moneyIncome: 0, troopIncome: 0, alive: true, ai: true, buildTimer: 8 },
    copper: { id: "copper", name: "Copper Union", role: "major", tier: "major", color: "#e39450", money: 170, reserves: 96, moneyIncome: 0, troopIncome: 0, alive: true, ai: true, buildTimer: 10 }
  };
  for (let i = 0; i < MINOR_COUNT; i++) {
    const id = `minor${i}`;
    const color = colorMix(minorColors[i % minorColors.length], "#f8fbff", hash(i, 4, 12) * 0.18);
    players[id] = {
      id,
      name: `Minor State ${i + 1}`,
      role: "minor",
      tier: "minor",
      color,
      money: 18 + hash(i, 0, 2) * 28,
      reserves: 10 + hash(i, 1, 3) * 18,
      moneyIncome: 0,
      troopIncome: 0,
      alive: true,
      ai: true,
      buildTimer: 999 + i
    };
  }
}

function earthProfile(q, r) {
  const x = q / (COLS - 1);
  const y = r / (ROWS - 1);
  const continents = [
    { name: "North America", x: 0.19, y: 0.27, w: 0.17, h: 0.22, tilt: -0.18 },
    { name: "South America", x: 0.28, y: 0.65, w: 0.11, h: 0.26, tilt: 0.22 },
    { name: "Europe", x: 0.51, y: 0.27, w: 0.11, h: 0.13, tilt: -0.05 },
    { name: "Africa", x: 0.53, y: 0.56, w: 0.13, h: 0.24, tilt: -0.02 },
    { name: "Asia", x: 0.69, y: 0.36, w: 0.23, h: 0.23, tilt: 0.1 },
    { name: "Oceania", x: 0.78, y: 0.73, w: 0.14, h: 0.12, tilt: 0.18 }
  ];
  let best = { name: "Frontier", score: 0 };
  for (const c of continents) {
    const dx = x - c.x;
    const dy = y - c.y;
    const rx = dx * Math.cos(c.tilt) - dy * Math.sin(c.tilt);
    const ry = dx * Math.sin(c.tilt) + dy * Math.cos(c.tilt);
    const d = (rx * rx) / (c.w * c.w) + (ry * ry) / (c.h * c.h);
    const score = clamp(1 - d, 0, 1);
    if (score > best.score) best = { name: c.name, score };
  }
  const latitude = Math.abs(y - 0.48);
  const coastish = clamp(1 - best.score, 0, 1);
  const mountain =
    Math.abs(y - (0.15 + x * 0.72)) < 0.025 ||
    Math.abs(x - (0.34 + y * 0.1)) < 0.024 ||
    Math.abs(y - (0.58 - x * 0.21)) < 0.02 ||
    (x > 0.62 && x < 0.87 && Math.abs(y - (0.5 - x * 0.19)) < 0.03);
  const city =
    (best.score > 0.52 && latitude < 0.22 && hash(q, r, 21) > 0.77) ||
    (best.name === "Europe" && hash(q, r, 23) > 0.58) ||
    (best.name === "Asia" && y > 0.25 && y < 0.58 && hash(q, r, 25) > 0.7);
  return { ...best, latitude, coastish, mountain, city };
}

function generateMap() {
  cells = [];
  cellMap = new Map();
  for (let r = 0; r < ROWS; r++) {
    for (let q = 0; q < COLS; q++) {
      const x = HEX * SQRT3 * (q + r / 2) + 80;
      const y = HEX * 1.5 * r + 80;
      const geo = earthProfile(q, r);
      const ridge = Math.sin(q * 0.22 + r * 0.08) + Math.cos(r * 0.19 - q * 0.05) + (geo.mountain ? 1.2 : 0);
      const wet = Math.sin(q * 0.13 - r * 0.17) + hash(q, r, 2) * 1.35 + geo.score * 0.3;
      let terrain = "plains";
      if (ridge > 1.55) terrain = "mountain";
      else if (ridge > 0.86 || geo.coastish > 0.78) terrain = "hills";
      else if (wet > 1.18 && geo.latitude < 0.38) terrain = "forest";
      if (geo.city && terrain !== "mountain") terrain = "city";
      const pop = clamp(
        0.45 + geo.score * 2.45 + hash(q, r, 5) * 1.25 + (terrain === "city" ? 3.2 : 0) - (terrain === "mountain" ? 0.7 : 0),
        0.28,
        7.2
      );
      const cell = {
        id: cells.length,
        q,
        r,
        x,
        y,
        terrain,
        geo: geo.name,
        earth: geo.score,
        pop,
        owner: NEUTRAL,
        troops: 0,
        org: 100,
        supply: 0.25,
        focus: 0,
        aiFocus: 0,
        building: null,
        claimOwner: null,
        claimProgress: 0,
        battle: 0,
        pulse: hash(q, r, 9) * TAU,
        neighbors: []
      };
      cells.push(cell);
      cellMap.set(key(q, r), cell);
    }
  }

  for (const cell of cells) {
    cell.neighbors = dirs.map(([dq, dr]) => cellMap.get(key(cell.q + dq, cell.r + dr))).filter(Boolean);
  }

  world.w = Math.max(...cells.map(c => c.x)) + 120;
  world.h = Math.max(...cells.map(c => c.y)) + 120;
}

function resetGame() {
  createPlayers();
  generateMap();
  particles = [];
  nuke = { active: false, time: 0, done: false };
  selected = null;
  hovered = null;
  running = false;
  ended = false;
  speed = 1;
  supplyTimer = 0;
  aiTimer = 0;
  uiTimer = 0;
  expandBank = 0;
  combatBank = 0;
  camera.zoom = Math.min(W / world.w, H / world.h) * 0.92;
  camera.zoom = clamp(camera.zoom, 0.34, 1.2);
  camera.x = W / 2 - world.w * camera.zoom / 2;
  camera.y = H / 2 - world.h * camera.zoom / 2;

  assignModernWorldStart();

  computeSupply();
  setMode("focus");
  setExpansionMode("free");
  ui.splash.classList.remove("hidden");
  ui.start.textContent = "Start";
  ui.pause.textContent = "Pause";
  ui.speed.textContent = "1x";
  ui.statusLine.textContent = "You are Auric Command - yellow blobs are yours";
  updateUI(true);
}

function assignModernWorldStart() {
  const majorSeeds = [
    { owner: "ember", q: 96, r: 16, radius: 8 },
    { owner: "azure", q: 18, r: 68, radius: 8 },
    { owner: "viridian", q: 96, r: 67, radius: 8 },
    { owner: "violet", q: 58, r: 15, radius: 7 },
    { owner: "copper", q: 60, r: 66, radius: 7 }
  ];
  const minorSeeds = [];
  for (let i = 0; i < MINOR_COUNT; i++) {
    minorSeeds.push({
      owner: `minor${i}`,
      q: Math.floor(4 + hash(i, 2, 31) * (COLS - 8)),
      r: Math.floor(4 + hash(i, 7, 37) * (ROWS - 8)),
      spread: 0.86 + hash(i, 12, 41) * 0.34
    });
  }

  for (const seed of minorSeeds) {
    const cell = cellMap.get(key(seed.q, seed.r));
    if (cell) {
      claimCell(cell, seed.owner, 7 + hash(seed.q, seed.r, 43) * 5);
      cell.org = 42;
      cell.building = "hq";
    }
  }
  for (const cell of cells) {
    if (cell.owner !== NEUTRAL) continue;
    if (hash(cell.q, cell.r, 44) > 0.885 && cell.earth < 0.86) continue;
    let best = null;
    let bestScore = Infinity;
    for (const seed of minorSeeds) {
      const dq = cell.q - seed.q;
      const dr = cell.r - seed.r;
      const score = (dq * dq + dr * dr * 1.12) / seed.spread + hash(cell.q, cell.r, seed.q) * 9;
      if (score < bestScore) {
        bestScore = score;
        best = seed;
      }
    }
    if (best) {
      claimCell(cell, best.owner, 3 + cell.pop * 0.75 + hash(cell.q, cell.r, 48) * 4);
      cell.org = 34 + hash(cell.q, cell.r, 49) * 18;
    }
  }

  for (const seed of majorSeeds) {
    seedFaction(seed.owner, seed.q, seed.r, seed.radius, 22, true);
  }
  seedFaction(PLAYER, 15, 15, 3, 20, true);

  for (const cell of cells) {
    if (cell.owner === NEUTRAL) continue;
    const owner = players[cell.owner];
    if (!owner) continue;
    if (owner.role === "minor") {
      cell.troops = Math.min(cell.troops, 11 + cell.pop * 1.2);
      cell.org = Math.min(cell.org, 58);
      if (cell.building && hash(cell.q, cell.r, 52) > 0.88) cell.building = null;
    }
  }
}

function seedFaction(owner, q, r, radius = 2, troopBase = 12, hq = true) {
  const center = cellMap.get(key(q, r));
  if (!center) return;
  for (const cell of cells) {
    const d = hexDistance(center, cell);
    if (d <= radius) {
      claimCell(cell, owner, troopBase + Math.max(0, radius - d) * 4.5 + cell.pop);
      cell.org = owner === PLAYER ? 92 : 68 + (players[owner]?.role === "major" ? 12 : 0);
    }
  }
  if (hq) center.building = "hq";
  center.troops += 24;
  center.org = owner === PLAYER ? 100 : 86;
}

function claimCell(cell, owner, troops = 6) {
  cell.owner = owner;
  cell.troops = Math.max(troops, 3);
  cell.org = clamp(55 + cell.supply * 28, 45, 100);
  cell.focus = 0;
  cell.aiFocus = 0;
  cell.claimOwner = null;
  cell.claimProgress = 0;
}

function setMode(next) {
  mode = next;
  if (mode !== "focus") {
    expansionMenuOpen = false;
    ui.expansion.parentElement.classList.remove("open");
  }
  ui.expansion.classList.toggle("active", mode === "focus");
  ui.factory.classList.toggle("active", mode === "factory");
  ui.barracks.classList.toggle("active", mode === "barracks");
  ui.depot.classList.toggle("active", mode === "depot");
}

function startGame() {
  running = true;
  ended = false;
  ui.splash.classList.add("hidden");
  ui.start.textContent = "Running";
  ui.statusLine.textContent = "War clock started";
}

function playerOf(id) {
  return players[id] || players[NEUTRAL];
}

function screenToWorld(x, y) {
  return {
    x: (x - camera.x) / camera.zoom,
    y: (y - camera.y) / camera.zoom
  };
}

function worldToScreen(x, y) {
  return {
    x: x * camera.zoom + camera.x,
    y: y * camera.zoom + camera.y
  };
}

function clampCamera() {
  if (!world.w || !world.h) return;
  const minX = W - world.w * camera.zoom - 120;
  const minY = H - world.h * camera.zoom - 120;
  camera.x = clamp(camera.x, Math.min(120, minX), 120);
  camera.y = clamp(camera.y, Math.min(120, minY), 120);
}

function cellAt(worldPoint) {
  let best = null;
  let bestD = Infinity;
  const radius = HEX * 1.08;
  for (const cell of cells) {
    const dx = cell.x - worldPoint.x;
    const dy = cell.y - worldPoint.y;
    if (Math.abs(dx) > radius || Math.abs(dy) > radius) continue;
    const d = dx * dx + dy * dy;
    if (d < bestD) {
      bestD = d;
      best = cell;
    }
  }
  return bestD <= radius * radius ? best : null;
}

function isBorder(cell) {
  return cell.owner !== NEUTRAL && cell.neighbors.some(n => n.owner !== cell.owner);
}

function enemyNeighborCount(cell) {
  if (cell.owner === NEUTRAL) return 0;
  return cell.neighbors.filter(n => n.owner !== cell.owner && n.owner !== NEUTRAL).length;
}

function update(dt) {
  if (nuke.active) {
    updateNuke(dt);
    updateParticles(dt);
    if (uiTimer <= 0) {
      updateUI();
      uiTimer = 0.16;
    } else {
      uiTimer -= dt;
    }
    return;
  }
  if (!running || ended) return;
  const scaled = dt * speed * GAME_PACE;
  supplyTimer -= scaled;
  uiTimer -= scaled;
  if (supplyTimer <= 0) {
    computeSupply();
    supplyTimer = 0.65;
  }
  applyExpansionDoctrine(scaled);
  economy(scaled);
  reinforce(scaled);
  expandBank += scaled;
  combatBank += scaled;
  if (expandBank >= 0.18) {
    expand(expandBank);
    expandBank = 0;
  }
  if (combatBank >= 0.09) {
    combat(combatBank);
    combatBank = 0;
  }
  aiThink(scaled);
  updateParticles(scaled);
  checkEnd();
  if (uiTimer <= 0) {
    updateUI();
    uiTimer = 0.16;
  }
}

function computeSupply() {
  const sources = cells.filter(c => c.owner !== NEUTRAL && (c.building === "hq" || c.building === "depot" || c.building === "factory" || c.building === "barracks"));
  for (const cell of cells) {
    if (cell.owner === NEUTRAL) {
      cell.supply = 0.22;
      continue;
    }
    let supply = 0.34 + terrains[cell.terrain].supply * 0.08;
    for (const source of sources) {
      if (source.owner !== cell.owner) continue;
      const sourcePower = source.building === "hq" ? 1.25 : source.building === "depot" ? 0.98 : 0.42;
      const range = source.building === "hq" ? 16 : source.building === "depot" ? 10 : 6;
      const d = hexDistance(source, cell);
      if (d > range) continue;
      const pathLoss = 1 - d / (range + 1);
      supply = Math.max(supply, 0.28 + sourcePower * pathLoss * terrains[cell.terrain].supply);
    }
    if (cell.building && BUILDINGS[cell.building]) supply += BUILDINGS[cell.building].supply;
    cell.supply = clamp(supply, 0.18, 1.35);
  }
}

function economy(dt) {
  for (const p of Object.values(players)) {
    p.moneyIncome = 0;
    p.troopIncome = 0;
    p.territory = 0;
  }

  for (const cell of cells) {
    if (cell.owner === NEUTRAL) continue;
    const p = players[cell.owner];
    if (!p) continue;
    const terrain = terrains[cell.terrain];
    p.territory += 1;
    p.moneyIncome += cell.pop * 0.04 * terrain.money * (0.65 + cell.supply * 0.45);
    p.troopIncome += cell.pop * 0.023 * terrain.troops * (0.72 + cell.supply * 0.34);
    if (cell.building === "factory") p.moneyIncome += BUILDINGS.factory.money;
    if (cell.building === "barracks") p.troopIncome += BUILDINGS.barracks.troops;
    if (cell.building === "depot") p.moneyIncome += 0.12;
    if (cell.building === "hq") {
      p.moneyIncome += 1.1;
      p.troopIncome += 0.18;
    }
  }

  for (const p of Object.values(players)) {
    if (!p.alive) continue;
    if (p.role === "minor") {
      p.moneyIncome *= 0.42;
      p.troopIncome *= 0.36;
    } else if (p.role === "major") {
      p.moneyIncome *= 1.08;
      p.troopIncome *= 1.08;
    }
    p.money = Math.min(9999, p.money + p.moneyIncome * dt);
    p.reserves = Math.min(9999, p.reserves + p.troopIncome * dt);
  }
}

function reinforce(dt) {
  const ownedBy = ownedGroups();
  for (const p of Object.values(players)) {
    if (!p.alive || p.reserves <= 0) continue;
    const owned = ownedBy.get(p.id) || [];
    if (!owned.length) continue;
    const border = owned.filter(isBorder);
    const candidates = (border.length ? border : owned)
      .map(c => {
        const focus = c.owner === PLAYER ? c.focus : c.aiFocus;
        const need = targetTroops(c) - c.troops;
        const priority = need + focus * 22 + enemyNeighborCount(c) * 9 + (c.building === "barracks" ? 5 : 0);
        return { cell: c, priority };
      })
      .filter(x => x.priority > 0)
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 26);
    if (!candidates.length) continue;
    let pool = Math.min(p.reserves, dt * (12 + p.troopIncome * 6));
    for (const item of candidates) {
      if (pool <= 0) break;
      const amount = Math.min(pool, Math.max(0, targetTroops(item.cell) - item.cell.troops), 2.2 + item.priority * 0.05);
      item.cell.troops += amount;
      pool -= amount;
      p.reserves -= amount;
    }
  }
}

function ownedGroups() {
  const groups = new Map();
  for (const cell of cells) {
    if (cell.owner === NEUTRAL) continue;
    if (!groups.has(cell.owner)) groups.set(cell.owner, []);
    groups.get(cell.owner).push(cell);
  }
  return groups;
}

function targetTroops(cell) {
  const focus = cell.owner === PLAYER ? cell.focus : cell.aiFocus;
  return 10 + cell.pop * 4 + enemyNeighborCount(cell) * 8 + focus * 30 + (cell.building === "hq" ? 16 : 0) + (cell.building === "barracks" ? 10 : 0);
}

function expand(dt) {
  const claims = new Map();
  for (const cell of cells) {
    if (cell.owner === NEUTRAL) continue;
    const p = players[cell.owner];
    if (!p || !p.alive) continue;
    const focus = cell.owner === PLAYER ? cell.focus : cell.aiFocus;
    const borderPressure = 0.38 + focus * 0.75 + Math.min(cell.troops, 28) * 0.013;
    for (const n of cell.neighbors) {
      if (n.owner !== NEUTRAL) continue;
      const power = borderPressure * cell.supply * terrains[n.terrain].expand * (n.terrain === "mountain" ? 0.72 : 1);
      const old = claims.get(n.id);
      if (!old || old.power < power) claims.set(n.id, { owner: cell.owner, power });
    }
  }

  for (const cell of cells) {
    if (cell.owner !== NEUTRAL) continue;
    const claim = claims.get(cell.id);
    if (!claim) {
      cell.claimProgress = Math.max(0, cell.claimProgress - dt * 1.2);
      continue;
    }
    if (cell.claimOwner !== claim.owner) {
      cell.claimProgress -= dt * claim.power * 2.2;
      if (cell.claimProgress <= 0) {
        cell.claimOwner = claim.owner;
        cell.claimProgress = 0;
      }
    } else {
      cell.claimProgress += dt * claim.power * 4.3;
    }
    const threshold = 14 + cell.pop * 4 + (cell.terrain === "mountain" ? 10 : 0);
    if (cell.claimProgress >= threshold) {
      const p = players[claim.owner];
      const reserve = p ? Math.min(p.reserves, 4) : 0;
      if (p) p.reserves -= reserve;
      claimCell(cell, claim.owner, 4 + reserve + cell.pop * 0.5);
      puff(cell.x, cell.y, players[claim.owner].color, 8, 0.35);
    }
  }
}

function combat(dt) {
  const damage = new Map();
  const incoming = new Map();
  for (const cell of cells) {
    cell.battle = Math.max(0, cell.battle - dt * 2.1);
    if (cell.owner !== NEUTRAL) {
      const contested = enemyNeighborCount(cell) > 0;
      const recover = contested ? 1.6 : 7.5;
      cell.org = clamp(cell.org + dt * recover * cell.supply, 0, 100);
    }
  }

  for (const cell of cells) {
    if (cell.owner === NEUTRAL) continue;
    for (const n of cell.neighbors) {
      if (n.owner === NEUTRAL || n.owner === cell.owner || cell.id > n.id) continue;
      exchange(cell, n, dt, damage, incoming);
      exchange(n, cell, dt, damage, incoming);
    }
  }

  for (const [id, d] of damage) {
    const cell = cells[id];
    cell.org = clamp(cell.org - d.org, 0, 100);
    cell.troops = Math.max(0, cell.troops - d.troops);
    cell.battle = Math.min(1, cell.battle + d.flash);
  }

  for (const [id, attacks] of incoming) {
    const cell = cells[id];
    if (cell.owner === NEUTRAL || (cell.org > 2 && cell.troops > 1.5)) continue;
    attacks.sort((a, b) => b.power - a.power);
    const winner = attacks[0];
    if (!winner || winner.owner === cell.owner) continue;
    const old = cell.owner;
    claimCell(cell, winner.owner, clamp(winner.power * 0.75, 3, 18));
    cell.org = 38;
    puff(cell.x, cell.y, players[winner.owner].color, 14, 0.55);
    if (old === PLAYER || winner.owner === PLAYER) {
      selected = cell;
      ui.statusLine.textContent = winner.owner === PLAYER ? "Breakthrough secured" : "Line collapsed";
    }
  }
}

function exchange(attacker, defender, dt, damage, incoming) {
  const focus = attacker.owner === PLAYER ? attacker.focus : attacker.aiFocus;
  const enemyFronts = Math.max(1, enemyNeighborCount(attacker));
  const width = 16 + focus * 34 + attacker.supply * 8;
  const effectiveTroops = Math.min(attacker.troops, width) / Math.sqrt(enemyFronts);
  const orgFactor = clamp(attacker.org / 100, 0.15, 1);
  const terrainAttack = attacker.terrain === "mountain" ? 0.8 : attacker.terrain === "hills" ? 0.92 : 1;
  const attackerRole = players[attacker.owner]?.role;
  const defenderRole = players[defender.owner]?.role;
  const defense = terrains[defender.terrain].defense * (0.75 + defender.supply * 0.35) * (defenderRole === "minor" ? 0.78 : 1);
  const focusKick = 1 + focus * 1.18;
  const rolePower = attackerRole === "minor" ? 0.62 : attackerRole === "major" ? 1.08 : 1.12;
  const power = Math.max(0, (effectiveTroops * 0.62 + focus * 10) * attacker.supply * orgFactor * terrainAttack * focusKick * rolePower / defense);
  const orgDamage = power * dt * 1.8;
  const troopDamage = power * dt * (defender.org < 35 ? 0.42 : 0.13);
  const current = damage.get(defender.id) || { org: 0, troops: 0, flash: 0 };
  current.org += orgDamage;
  current.troops += troopDamage;
  current.flash += 0.04;
  damage.set(defender.id, current);
  const list = incoming.get(defender.id) || [];
  list.push({ owner: attacker.owner, power });
  incoming.set(defender.id, list);
  if (Math.random() < dt * 0.8 && power > 3) {
    spark(attacker, defender, players[attacker.owner].color);
  }
}

function aiThink(dt) {
  aiTimer -= dt;
  if (aiTimer > 0) return;
  aiTimer = 0.9;
  const ownedBy = ownedGroups();

  for (const p of Object.values(players)) {
    if (!p.ai || !p.alive) continue;
    const owned = ownedBy.get(p.id) || [];
    if (!owned.length) continue;
    for (const cell of owned) cell.aiFocus *= p.role === "minor" ? 0.72 : 0.78;
    const border = owned.filter(isBorder);
    if (p.role === "minor") {
      border
        .map(c => ({ cell: c, score: enemyNeighborCount(c) * 8 + (c.troops < 9 ? 6 : 0) + hash(c.q, c.r, Date.now() * 0.0001) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, Math.min(2, border.length))
        .forEach(item => {
          item.cell.aiFocus = clamp(item.cell.aiFocus + 0.28, 0, 0.48);
        });
      continue;
    }
    border
      .map(c => {
        const weakEnemy = c.neighbors.filter(n => n.owner !== p.id).sort((a, b) => (a.troops + a.org * 0.08) - (b.troops + b.org * 0.08))[0];
        const score = (weakEnemy ? 22 - weakEnemy.troops : 0) + c.supply * 8 + c.troops * 0.12 + hash(c.q, c.r, Date.now() * 0.0001);
        return { cell: c, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, Math.max(4, Math.floor(border.length * 0.24)))
      .forEach(item => {
        item.cell.aiFocus = clamp(item.cell.aiFocus + 0.75, 0, 1);
      });
    aiBuild(p, owned);
  }
}

function aiBuild(player, owned) {
  if (player.role === "minor") return;
  player.buildTimer -= 0.9;
  if (player.buildTimer > 0 || player.money < 62) return;
  player.buildTimer = 3.5 + hash(player.money, owned.length, 3) * 4;
  const empty = owned.filter(c => !c.building && c.supply > 0.45);
  if (!empty.length) return;
  const border = empty.filter(isBorder);
  let type = "factory";
  if (player.troopIncome < player.moneyIncome * 0.22) type = "barracks";
  if (border.length && Math.random() < 0.42) type = "depot";
  const cost = BUILDINGS[type].cost;
  if (player.money < cost) return;
  const candidates = type === "depot" && border.length ? border : empty;
  candidates.sort((a, b) => {
    const av = a.pop + (isBorder(a) ? 1.2 : 0) + a.supply;
    const bv = b.pop + (isBorder(b) ? 1.2 : 0) + b.supply;
    return bv - av;
  });
  candidates[0].building = type;
  player.money -= cost;
}

function buildOn(cell, type) {
  if (!cell || cell.owner !== PLAYER || cell.building || !BUILDINGS[type]) return false;
  const cost = BUILDINGS[type].cost;
  const p = players[PLAYER];
  if (p.money < cost) {
    ui.statusLine.textContent = "Insufficient money";
    return false;
  }
  p.money -= cost;
  cell.building = type;
  selected = cell;
  computeSupply();
  puff(cell.x, cell.y, "#f5c849", 10, 0.42);
  ui.statusLine.textContent = `${BUILDINGS[type].label} built`;
  return true;
}

function setExpansionMode(next) {
  expansionMode = next;
  expansionMenuOpen = false;
  ui.expansion.parentElement.classList.remove("open");
  ui.expansionLabel.textContent = next[0].toUpperCase() + next.slice(1);
  for (const option of ui.expansionOptions) {
    option.classList.toggle("active", option.dataset.expansion === next);
  }
  setMode("focus");
  if (next !== "free") {
    clearPlayerFocus(false);
    applyExpansionDoctrine(1);
  }
  const hints = {
    radius: "Expansion set to Radius: all borders push evenly.",
    blitz: "Expansion set to Blitz: pressure hunts weak borders.",
    direction: "Expansion set to Direction: drag from your land to aim.",
    free: "Expansion set to Free: paint precise pressure by hand."
  };
  ui.statusLine.textContent = hints[next];
  updateUI();
}

function playerBorders() {
  return cells.filter(c => c.owner === PLAYER && isBorder(c));
}

function clearPlayerFocus(updateStatus = true) {
  for (const cell of cells) {
    if (cell.owner === PLAYER) cell.focus = 0;
  }
  if (updateStatus) ui.statusLine.textContent = "Focus cleared";
}

function applyExpansionDoctrine(dt) {
  if (mode !== "focus") return;
  if (expansionMode === "free") return;
  const borders = playerBorders();
  if (!borders.length) return;
  if (expansionMode === "radius") {
    for (const cell of cells) {
      if (cell.owner === PLAYER) cell.focus = isBorder(cell) ? lerp(cell.focus, 0.48, clamp(dt * 0.8, 0, 1)) : cell.focus * Math.max(0, 1 - dt * 1.2);
    }
  } else if (expansionMode === "blitz") {
    const scored = borders
      .map(cell => {
        const weak = cell.neighbors
          .filter(n => n.owner !== PLAYER)
          .sort((a, b) => (a.troops + a.org * 0.08 + (players[a.owner]?.role === "major" ? 18 : 0)) - (b.troops + b.org * 0.08 + (players[b.owner]?.role === "major" ? 18 : 0)))[0];
        const score = weak ? 80 - weak.troops - weak.org * 0.14 - (players[weak.owner]?.role === "major" ? 16 : 0) + cell.supply * 8 : 0;
        return { cell, score };
      })
      .sort((a, b) => b.score - a.score);
    const chosen = new Set(scored.slice(0, Math.max(4, Math.floor(scored.length * 0.08))).map(x => x.cell.id));
    for (const cell of cells) {
      if (cell.owner !== PLAYER) continue;
      const target = chosen.has(cell.id) ? 1 : isBorder(cell) ? 0.12 : 0;
      cell.focus = lerp(cell.focus, target, clamp(dt * 1.3, 0, 1));
    }
  } else if (expansionMode === "direction") {
    for (const cell of cells) {
      if (cell.owner !== PLAYER) continue;
      if (!isBorder(cell)) {
        cell.focus *= Math.max(0, 1 - dt * 1.2);
        continue;
      }
      const facing = borderFacing(cell);
      const dot = facing.x * directionVector.x + facing.y * directionVector.y;
      const target = clamp((dot + 0.28) / 1.28, 0.06, 0.92);
      cell.focus = lerp(cell.focus, target, clamp(dt * 1.1, 0, 1));
    }
  }
}

function borderFacing(cell) {
  let x = 0;
  let y = 0;
  for (const n of cell.neighbors) {
    if (n.owner === PLAYER) continue;
    const dx = n.x - cell.x;
    const dy = n.y - cell.y;
    const d = Math.hypot(dx, dy) || 1;
    x += dx / d;
    y += dy / d;
  }
  const mag = Math.hypot(x, y) || 1;
  return { x: x / mag, y: y / mag };
}

function setDirectionFromPoints(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const mag = Math.hypot(dx, dy);
  if (mag < HEX * 0.7) return false;
  directionVector = { x: dx / mag, y: dy / mag, set: true };
  clearPlayerFocus(false);
  applyExpansionDoctrine(1);
  ui.statusLine.textContent = "Directional expansion aimed";
  return true;
}

function paintFocus(cell, amount = 0.28) {
  if (!cell || cell.owner !== PLAYER) return;
  const targets = [cell, ...cell.neighbors.filter(n => n.owner === PLAYER && hexDistance(n, cell) <= 1)];
  for (const target of targets) {
    if (!isBorder(target)) continue;
    target.focus = clamp(target.focus + amount * 0.72, 0, 1);
  }
  selected = cell;
}

function clearFocus() {
  clearPlayerFocus(true);
}

function checkEnd() {
  const counts = {};
  for (const cell of cells) {
    if (cell.owner !== NEUTRAL) counts[cell.owner] = (counts[cell.owner] || 0) + 1;
  }
  const youCells = counts[PLAYER] || 0;
  const total = cells.length;
  players[PLAYER].alive = youCells > 0;
  for (const p of Object.values(players)) {
    if (p.id === PLAYER) continue;
    p.alive = (counts[p.id] || 0) > 0;
  }
  if (ended) return;
  if (youCells <= 0) {
    ended = true;
    running = false;
    ui.splash.querySelector("h2").textContent = "Command Collapsed";
    ui.splash.querySelector("p").textContent = "Your final command region was overrun.";
    ui.splashStart.textContent = "Redeploy";
    ui.splash.classList.remove("hidden");
  } else if (youCells / total >= 0.58) {
    ended = true;
    running = false;
    ui.splash.querySelector("h2").textContent = "Theater Secured";
    ui.splash.querySelector("p").textContent = "Your front network controls the map.";
    ui.splashStart.textContent = "New War";
    ui.splash.classList.remove("hidden");
  }
}

function updateParticles(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function puff(x, y, color, count, force) {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * TAU;
    const s = (30 + Math.random() * 120) * force;
    particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0.45 + Math.random() * 0.35, max: 0.8, color, r: 2 + Math.random() * 4 });
  }
}

function spark(a, b, color) {
  const t = Math.random();
  particles.push({
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    vx: (Math.random() - 0.5) * 28,
    vy: (Math.random() - 0.5) * 28,
    life: 0.24 + Math.random() * 0.18,
    max: 0.42,
    color,
    r: 1.4 + Math.random() * 2.6
  });
}

function launchNuke() {
  if (nuke.active || ended) return;
  running = true;
  nuke = { active: true, time: 0, done: false };
  ui.splash.classList.add("hidden");
  ui.statusLine.textContent = "Nuclear launch detected";
  camera.zoom = Math.max(camera.zoom, Math.min(W / world.w, H / world.h) * 1.08);
  camera.x = W / 2 - world.w * camera.zoom / 2;
  camera.y = H / 2 - world.h * camera.zoom / 2;
  clampCamera();
  for (let i = 0; i < 260; i++) {
    const cell = cells[Math.floor(Math.random() * cells.length)];
    puff(cell.x, cell.y, i % 2 ? "#ff5b4a" : "#ffe187", 1, 1.2);
  }
}

function updateNuke(dt) {
  nuke.time += dt;
  camera.shake = Math.max(camera.shake || 0, 18 * Math.max(0, 1 - nuke.time / 3.2));
  if (Math.random() < dt * 36) {
    const cell = cells[Math.floor(Math.random() * cells.length)];
    puff(cell.x, cell.y, Math.random() < 0.5 ? "#ff5b4a" : "#ffe187", 8, 1.4);
  }
  if (!nuke.done && nuke.time > 2.35) {
    nuke.done = true;
    for (const cell of cells) {
      cell.owner = PLAYER;
      cell.troops = Math.max(cell.troops, 18 + cell.pop * 2);
      cell.org = 100;
      cell.focus = 0;
      cell.aiFocus = 0;
      cell.claimOwner = null;
      cell.claimProgress = 0;
      cell.battle = 1;
    }
    for (const p of Object.values(players)) {
      p.alive = p.id === PLAYER;
    }
    players[PLAYER].money += 500;
    players[PLAYER].reserves += 500;
    ui.statusLine.textContent = "Nuclear victory achieved";
    updateUI();
  }
  if (nuke.time > 4.2) {
    nuke.active = false;
    ended = true;
    running = false;
    ui.splash.querySelector("h2").textContent = "Total Victory";
    ui.splash.querySelector("p").textContent = "The entire theater has been absorbed by Auric Command.";
    ui.splashStart.textContent = "New War";
    ui.splash.classList.remove("hidden");
  }
}

function updateUI(force = false) {
  const p = players[PLAYER];
  if (!p) return;
  const owned = cells.filter(c => c.owner === PLAYER).length;
  const share = owned / cells.length;
  ui.money.textContent = Math.floor(p.money);
  ui.troops.textContent = Math.floor(p.reserves);
  ui.income.textContent = `+$${p.moneyIncome.toFixed(1)} / +${p.troopIncome.toFixed(1)}`;
  ui.share.textContent = `${Math.round(share * 100)}%`;
  if (ui.playerBadge) {
    ui.playerBadge.querySelector("b").textContent = `You are ${p.name}`;
    ui.playerBadge.querySelector("span").style.background = p.color;
  }
  ui.expansionLabel.textContent = expansionMode[0].toUpperCase() + expansionMode.slice(1);
  ui.victoryFill.style.width = `${clamp(share / 0.58 * 100, 0, 100)}%`;
  ui.factory.disabled = p.money < BUILDINGS.factory.cost;
  ui.barracks.disabled = p.money < BUILDINGS.barracks.cost;
  ui.depot.disabled = p.money < BUILDINGS.depot.cost;
  ui.front.classList.toggle("active", showFront);
  ui.supply.classList.toggle("active", showSupply);
  if (!selected || selected.owner === NEUTRAL) {
    ui.selectedName.textContent = hovered ? cellName(hovered) : "No region selected";
    ui.selectedMeta.textContent = hovered ? metaLine(hovered) : "Paint a border or place a building.";
  } else {
    ui.selectedName.textContent = cellName(selected);
    ui.selectedMeta.textContent = metaLine(selected);
  }
  if (force) render();
}

function cellName(cell) {
  if (!cell) return "Unknown cell";
  const owner = cell.owner === NEUTRAL ? "Neutral" : players[cell.owner].name;
  return `${owner} ${cell.q}.${cell.r}`;
}

function metaLine(cell) {
  const building = cell.building ? (cell.building === "hq" ? "HQ" : BUILDINGS[cell.building].label) : "Open";
  return `${cell.terrain} - ${Math.floor(cell.troops)} div - org ${Math.floor(cell.org)} - supply ${Math.round(cell.supply * 100)}% - ${building}`;
}

function render() {
  ctx.clearRect(0, 0, W, H);
  drawBackground();
  ctx.save();
  const shake = camera.shake || 0;
  if (shake > 0) {
    camera.shake = Math.max(0, shake - 0.55);
    ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
  }
  ctx.translate(camera.x, camera.y);
  ctx.scale(camera.zoom, camera.zoom);
  drawCells();
  drawParticles();
  ctx.restore();
  drawNukeOverlay();
}

function drawBackground() {
  ctx.fillStyle = "#091015";
  ctx.fillRect(0, 0, W, H);
}

function drawNukeOverlay() {
  if (!nuke.active) return;
  const t = nuke.time;
  const cx = W / 2;
  const cy = H / 2;
  const maxR = Math.hypot(W, H) * 0.95;
  const shock = clamp(t / 2.6, 0, 1);
  const flash = Math.max(0, 1 - t / 1.4);
  ctx.save();
  ctx.globalAlpha = flash * 0.74;
  ctx.fillStyle = "#fff3c3";
  ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = 1;
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * shock);
  glow.addColorStop(0, `rgba(255, 255, 225, ${0.68 * (1 - shock * 0.3)})`);
  glow.addColorStop(0.22, `rgba(255, 199, 72, ${0.5 * (1 - shock * 0.2)})`);
  glow.addColorStop(0.58, `rgba(255, 85, 64, ${0.35 * (1 - shock)})`);
  glow.addColorStop(1, "rgba(255, 85, 64, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 3; i++) {
    const r = maxR * clamp(shock - i * 0.12, 0, 1);
    if (r <= 0) continue;
    ctx.globalAlpha = 0.55 * (1 - shock) + 0.16;
    ctx.strokeStyle = i === 0 ? "#fff6cf" : i === 1 ? "#ffbe4f" : "#ff5b4a";
    ctx.lineWidth = 10 - i * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, TAU);
    ctx.stroke();
  }
  if (t > 2.1) {
    ctx.globalAlpha = clamp((t - 2.1) / 0.9, 0, 0.55);
    ctx.fillStyle = "#f5c849";
    ctx.fillRect(0, 0, W, H);
  }
  ctx.restore();
}

function visible(cell) {
  const s = worldToScreen(cell.x, cell.y);
  const pad = HEX * camera.zoom * 2;
  return s.x > -pad && s.x < W + pad && s.y > -pad && s.y < H + pad;
}

function drawCells() {
  const visibleCells = cells.filter(visible);
  drawBlobLayer(visibleCells, NEUTRAL, "#15221d", 0.72);

  const owners = new Map();
  for (const cell of visibleCells) {
    if (cell.owner === NEUTRAL) continue;
    if (!owners.has(cell.owner)) owners.set(cell.owner, []);
    owners.get(cell.owner).push(cell);
  }

  for (const [owner, owned] of owners) {
    const p = players[owner];
    if (!p) continue;
    const color = showSupply ? supplyColor(owned) : p.color;
    drawBlobLayer(owned, owner, color, owner === PLAYER ? 0.98 : 0.9);
  }

  for (const cell of visibleCells) {
    if (cell.claimProgress > 0 && cell.claimOwner) drawClaim(cell);
    if (cell.focus > 0 && cell.owner === PLAYER) drawFocus(cell, cell.focus, players[PLAYER].color);
    if (cell.aiFocus > 0 && cell.owner !== PLAYER && cell.owner !== NEUTRAL) drawFocus(cell, cell.aiFocus, players[cell.owner].color);
    if (showFront && isBorder(cell) && cell.owner !== NEUTRAL) drawFront(cell);
    if (cell.battle > 0) drawBattle(cell);
    drawBuilding(cell);
    if (camera.zoom > 0.42 && cell.owner !== NEUTRAL && (cell.troops > 7 || cell === selected || cell === hovered)) drawTroops(cell);
  }

  drawSelection(hovered, "rgba(255,255,255,0.82)", 2);
  drawSelection(selected, "#f5c849", 3);
}

function drawBlobLayer(group, owner, color, alpha) {
  if (!group.length) return;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = BLOB_RADIUS * 2.04;

  ctx.beginPath();
  for (const cell of group) {
    for (const n of cell.neighbors) {
      if (n.owner !== owner || cell.id > n.id || !visible(n)) continue;
      ctx.moveTo(cell.x, cell.y);
      ctx.lineTo(n.x, n.y);
    }
  }
  ctx.stroke();

  ctx.beginPath();
  for (const cell of group) {
    ctx.moveTo(cell.x + BLOB_RADIUS, cell.y);
    ctx.arc(cell.x, cell.y, BLOB_RADIUS, 0, TAU);
  }
  ctx.fill();
  ctx.restore();
}

function supplyColor(group) {
  const supply = group.reduce((sum, cell) => sum + cell.supply, 0) / Math.max(1, group.length);
  return colorMix("#4a2020", "#3fd182", clamp(supply / 1.25, 0, 1));
}

function drawClaim(cell) {
  const t = clamp(cell.claimProgress / (15 + cell.pop * 4), 0, 1);
  ctx.beginPath();
  ctx.arc(cell.x, cell.y, HEX * 0.48 + HEX * 0.34 * t, 0, TAU);
  ctx.fillStyle = players[cell.claimOwner].color;
  ctx.globalAlpha = 0.18 + t * 0.24;
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawFocus(cell, value, color) {
  ctx.beginPath();
  ctx.arc(cell.x, cell.y, HEX * (0.72 + value * 0.2), 0, TAU);
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.36 + value * 0.42;
  ctx.lineWidth = (2 + value * 4) / camera.zoom;
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.lineWidth = 1 / camera.zoom;
}

function drawFront(cell) {
  const ownerColor = players[cell.owner].color;
  for (const n of cell.neighbors) {
    if (n.owner === cell.owner || n.owner === NEUTRAL) continue;
    const mx = (cell.x + n.x) / 2;
    const my = (cell.y + n.y) / 2;
    ctx.beginPath();
    ctx.arc(mx, my, 3.5 + cell.battle * 3, 0, TAU);
    ctx.fillStyle = ownerColor;
    ctx.globalAlpha = 0.5;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function drawBattle(cell) {
  ctx.beginPath();
  ctx.arc(cell.x, cell.y, HEX * (0.64 + cell.battle * 0.24), 0, TAU);
  ctx.strokeStyle = `rgba(255, 245, 208, ${cell.battle * 0.78})`;
  ctx.lineWidth = (2 + cell.battle * 4) / camera.zoom;
  ctx.stroke();
}

function drawSelection(cell, color, width) {
  if (!cell) return;
  ctx.beginPath();
  ctx.arc(cell.x, cell.y, BLOB_RADIUS * 1.08, 0, TAU);
  ctx.strokeStyle = color;
  ctx.lineWidth = width / camera.zoom;
  ctx.stroke();
}

function drawBuilding(cell) {
  if (!cell.building || cell.owner === NEUTRAL) return;
  const y = cell.y - HEX * 0.28;
  ctx.fillStyle = cell.owner === PLAYER ? "#1d1604" : "#071018";
  ctx.strokeStyle = "rgba(255,255,255,0.54)";
  ctx.lineWidth = 1.2 / camera.zoom;
  if (cell.building === "hq") {
    ctx.beginPath();
    ctx.moveTo(cell.x, y - 8);
    ctx.lineTo(cell.x + 9, y + 8);
    ctx.lineTo(cell.x - 9, y + 8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.roundRect(cell.x - 8, y - 6, 16, 13, 2);
  ctx.fill();
  ctx.stroke();
  if (cell.building === "factory") {
    ctx.beginPath();
    ctx.moveTo(cell.x - 8, y - 6);
    ctx.lineTo(cell.x - 3, y - 11);
    ctx.lineTo(cell.x + 1, y - 6);
    ctx.lineTo(cell.x + 6, y - 11);
    ctx.lineTo(cell.x + 8, y - 6);
    ctx.stroke();
  } else if (cell.building === "barracks") {
    ctx.beginPath();
    ctx.moveTo(cell.x - 7, y + 1);
    ctx.lineTo(cell.x + 7, y + 1);
    ctx.moveTo(cell.x - 4, y - 4);
    ctx.lineTo(cell.x - 4, y + 6);
    ctx.moveTo(cell.x + 4, y - 4);
    ctx.lineTo(cell.x + 4, y + 6);
    ctx.stroke();
  } else if (cell.building === "depot") {
    ctx.beginPath();
    ctx.arc(cell.x, y, 7, 0, TAU);
    ctx.stroke();
  }
}

function drawTroops(cell) {
  ctx.fillStyle = cell.owner === PLAYER ? "#1d1604" : "#f8fbff";
  ctx.font = `900 ${Math.max(10, 14 / camera.zoom)}px Inter, system-ui`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(Math.floor(cell.troops)), cell.x, cell.y + HEX * 0.32);
}

function drawParticles() {
  for (const p of particles) {
    ctx.globalAlpha = clamp(p.life / p.max, 0, 1);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, TAU);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function hexPath(x, y, r) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 6 + i * Math.PI / 3;
    const px = x + Math.cos(a) * r;
    const py = y + Math.sin(a) * r;
    if (i) ctx.lineTo(px, py);
    else ctx.moveTo(px, py);
  }
  ctx.closePath();
}

function handlePointer(x, y, button = 0) {
  const worldPoint = screenToWorld(x, y);
  const cell = cellAt(worldPoint);
  hovered = cell;
  if (!cell) return;
  selected = cell;
  if (mode === "focus") {
    if (expansionMode === "free") paintFocus(cell);
    else if (expansionMode === "direction" && cell.owner === PLAYER && directionAnchor) setDirectionFromPoints(directionAnchor, worldPoint);
    else applyExpansionDoctrine(1);
  } else {
    buildOn(cell, mode);
  }
  updateUI();
}

canvas.addEventListener("contextmenu", e => e.preventDefault());

canvas.addEventListener("pointerdown", e => {
  const worldPoint = screenToWorld(e.clientX, e.clientY);
  pointer.down = true;
  pointer.panning = e.button === 1 || e.button === 2 || e.altKey;
  directionAnchor = !pointer.panning && mode === "focus" && expansionMode === "direction" ? worldPoint : null;
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  pointer.lastX = e.clientX;
  pointer.lastY = e.clientY;
  canvas.setPointerCapture(e.pointerId);
  if (!pointer.panning) handlePointer(e.clientX, e.clientY, e.button);
});

canvas.addEventListener("pointermove", e => {
  const worldPoint = screenToWorld(e.clientX, e.clientY);
  hovered = cellAt(worldPoint);
  if (pointer.down && pointer.panning) {
    camera.x += e.clientX - pointer.lastX;
    camera.y += e.clientY - pointer.lastY;
    clampCamera();
  } else if (pointer.down && mode === "focus" && (expansionMode === "free" || expansionMode === "direction")) {
    handlePointer(e.clientX, e.clientY);
  }
  pointer.lastX = e.clientX;
  pointer.lastY = e.clientY;
});

canvas.addEventListener("pointerup", e => {
  if (!pointer.panning && mode === "focus" && expansionMode === "direction" && directionAnchor) {
    setDirectionFromPoints(directionAnchor, screenToWorld(e.clientX, e.clientY));
  }
  pointer.down = false;
  pointer.panning = false;
  directionAnchor = null;
  try {
    canvas.releasePointerCapture(e.pointerId);
  } catch {}
});

canvas.addEventListener("wheel", e => {
  e.preventDefault();
  const before = screenToWorld(e.clientX, e.clientY);
  const factor = e.deltaY > 0 ? 0.9 : 1.1;
  camera.zoom = clamp(camera.zoom * factor, 0.28, 1.75);
  const after = screenToWorld(e.clientX, e.clientY);
  camera.x += (after.x - before.x) * camera.zoom;
  camera.y += (after.y - before.y) * camera.zoom;
  clampCamera();
}, { passive: false });

window.addEventListener("keydown", e => {
  const pan = 42;
  if (e.key === "a" || e.key === "ArrowLeft") camera.x += pan;
  if (e.key === "d" || e.key === "ArrowRight") camera.x -= pan;
  if (e.key === "w" || e.key === "ArrowUp") camera.y += pan;
  if (e.key === "s" || e.key === "ArrowDown") camera.y -= pan;
  if (e.key === " ") running = !running;
  clampCamera();
});

ui.splashStart.addEventListener("click", () => {
  if (ended) resetGame();
  startGame();
});
ui.start.addEventListener("click", startGame);
ui.pause.addEventListener("click", () => {
  running = !running;
  ui.pause.textContent = running ? "Pause" : "Resume";
  ui.statusLine.textContent = running ? "War clock resumed" : "War clock paused";
});
ui.speed.addEventListener("click", () => {
  speed = speed === 1 ? 2 : speed === 2 ? 4 : 1;
  ui.speed.textContent = `${speed}x`;
});
ui.reset.addEventListener("click", resetGame);
ui.expansion.addEventListener("click", () => {
  setMode("focus");
  expansionMenuOpen = !expansionMenuOpen;
  ui.expansion.parentElement.classList.toggle("open", expansionMenuOpen);
});
for (const option of ui.expansionOptions) {
  option.addEventListener("click", () => setExpansionMode(option.dataset.expansion));
}
ui.factory.addEventListener("click", () => setMode("factory"));
ui.barracks.addEventListener("click", () => setMode("barracks"));
ui.depot.addEventListener("click", () => setMode("depot"));
ui.nuke.addEventListener("click", launchNuke);
ui.front.addEventListener("click", () => {
  showFront = !showFront;
  updateUI();
});
ui.supply.addEventListener("click", () => {
  showSupply = !showSupply;
  updateUI();
});
ui.clear.addEventListener("click", () => {
  clearFocus();
  updateUI();
});

function frame(ts) {
  const dt = Math.min(0.05, (ts - last) / 1000 || 0);
  last = ts;
  update(dt);
  render();
  requestAnimationFrame(frame);
}

window.addEventListener("resize", resize);
resize();
resetGame();
requestAnimationFrame(frame);
