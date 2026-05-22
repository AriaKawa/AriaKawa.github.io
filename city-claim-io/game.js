const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const ui = {
  score: document.querySelector("#score"),
  share: document.querySelector("#share"),
  kills: document.querySelector("#kills"),
  rank: document.querySelector("#rank"),
  status: document.querySelector("#statusLine"),
  splash: document.querySelector("#splash"),
  start: document.querySelector("#startBtn"),
  restart: document.querySelector("#restartBtn"),
  skins: [...document.querySelectorAll(".skin")]
};

const TAU = Math.PI * 2;
const CELL = 20;
const COLS = 112;
const ROWS = 112;
const WORLD_W = COLS * CELL;
const WORLD_H = ROWS * CELL;
const PLAYER_ID = 1;
const NEUTRAL = 0;
const BOT_COUNT = 10;
const TOTAL_CELLS = COLS * ROWS;

const skins = [
  {
    name: "Crownlight",
    body: "#ffd447",
    trail: "#ffe27a",
    land: "#d49f2c",
    roof: "#fff1a8",
    road: "#65481d",
    park: "#68d07c",
    tower: "#f7f1d4"
  },
  {
    name: "Harbor",
    body: "#41d8ff",
    trail: "#8beaff",
    land: "#2f9cc7",
    roof: "#d7f8ff",
    road: "#1e5569",
    park: "#65dca1",
    tower: "#eafcff"
  },
  {
    name: "Arcology",
    body: "#b28cff",
    trail: "#d3bdff",
    land: "#7657c7",
    roof: "#efe4ff",
    road: "#3b2b62",
    park: "#71d69b",
    tower: "#f4eeff"
  }
];

const botPalettes = [
  ["#ff6d86", "#ff9aaa", "#9f3346"],
  ["#61df92", "#9cffbd", "#287c4c"],
  ["#ff9f43", "#ffc072", "#96511d"],
  ["#67a7ff", "#a2c8ff", "#2b5d9f"],
  ["#f26cff", "#f6a9ff", "#8b3294"],
  ["#b8d75d", "#ddf28b", "#697d28"]
];

const personalities = ["cautious", "aggressive", "wide-loop", "opportunist"];
const owner = new Int16Array(TOTAL_CELLS);
const trailOwner = new Int16Array(TOTAL_CELLS);
const age = new Float32Array(TOTAL_CELLS);
const stolenHeat = new Float32Array(TOTAL_CELLS);

let W = 0;
let H = 0;
let dpr = 1;
let last = 0;
let time = 0;
let running = false;
let gameOver = false;
let selectedSkin = 0;
let players = [];
let particles = [];
let camera = { x: WORLD_W / 2, y: WORLD_H / 2, zoom: 1 };
let keys = new Set();
let pointer = { active: false, x: 0, y: 0 };

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function wrapAngle(angle) {
  while (angle > Math.PI) angle -= TAU;
  while (angle < -Math.PI) angle += TAU;
  return angle;
}

function turnToward(current, target, amount) {
  return current + clamp(wrapAngle(target - current), -amount, amount);
}

function dist(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

function hash(n, salt = 0) {
  const x = Math.sin(n * 127.1 + salt * 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

function mixColor(a, b, t) {
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

function cellIndex(cx, cy) {
  if (cx < 0 || cy < 0 || cx >= COLS || cy >= ROWS) return -1;
  return cy * COLS + cx;
}

function indexAt(x, y) {
  return cellIndex(Math.floor(x / CELL), Math.floor(y / CELL));
}

function cellCenter(i) {
  const cx = i % COLS;
  const cy = Math.floor(i / COLS);
  return { x: cx * CELL + CELL / 2, y: cy * CELL + CELL / 2 };
}

function screenToWorld(x, y) {
  return {
    x: (x - W / 2) / camera.zoom + camera.x,
    y: (y - H / 2) / camera.zoom + camera.y
  };
}

function worldToScreen(x, y) {
  return {
    x: (x - camera.x) * camera.zoom + W / 2,
    y: (y - camera.y) * camera.zoom + H / 2
  };
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
  camera.zoom = clamp(Math.min(W, H) / 760, 0.68, 1.12);
}

function createPlayer(id, name, x, y, palette, ai = true) {
  return {
    id,
    name,
    x,
    y,
    spawnX: x,
    spawnY: y,
    angle: hash(id, 3) * TAU,
    targetAngle: hash(id, 4) * TAU,
    speed: ai ? 158 + hash(id, 9) * 22 : 178,
    color: palette[0],
    trailColor: palette[1],
    landColor: palette[2],
    roadColor: mixColor(palette[2], "#111820", 0.45),
    alive: true,
    ai,
    personality: ai ? personalities[id % personalities.length] : "human",
    outside: false,
    trailPoints: [],
    trailCells: new Set(),
    lastOwn: { x, y },
    kills: 0,
    score: 0,
    territory: 0,
    aiTimer: 0,
    respawn: 0,
    loopGoal: 70 + hash(id, 16) * 95,
    wander: hash(id, 19) * TAU
  };
}

function resetGrid() {
  owner.fill(NEUTRAL);
  trailOwner.fill(NEUTRAL);
  age.fill(0);
  stolenHeat.fill(0);
}

function claimDisk(id, x, y, radius) {
  const minX = clamp(Math.floor((x - radius) / CELL), 0, COLS - 1);
  const maxX = clamp(Math.floor((x + radius) / CELL), 0, COLS - 1);
  const minY = clamp(Math.floor((y - radius) / CELL), 0, ROWS - 1);
  const maxY = clamp(Math.floor((y + radius) / CELL), 0, ROWS - 1);
  for (let cy = minY; cy <= maxY; cy++) {
    for (let cx = minX; cx <= maxX; cx++) {
      const i = cellIndex(cx, cy);
      const c = cellCenter(i);
      if (Math.hypot(c.x - x, c.y - y) <= radius) {
        owner[i] = id;
        age[i] = 8 + hash(i, id) * 7;
      }
    }
  }
}

function resetGame() {
  resetGrid();
  particles = [];
  time = 0;
  gameOver = false;
  running = true;
  ui.splash.querySelector("h2").textContent = "City Claim.io";
  ui.splash.querySelector("p").textContent = "Carve territory, close loops, and watch your city climb out of the map.";
  ui.start.textContent = "Start Run";

  const skin = skins[selectedSkin];
  players = [
    null,
    createPlayer(PLAYER_ID, "You", WORLD_W / 2, WORLD_H / 2, [skin.body, skin.trail, skin.land], false)
  ];

  const margin = 260;
  for (let b = 0; b < BOT_COUNT; b++) {
    const angle = (b / BOT_COUNT) * TAU + hash(b, 4) * 0.28;
    const ring = 520 + hash(b, 7) * 470;
    const x = clamp(WORLD_W / 2 + Math.cos(angle) * ring, margin, WORLD_W - margin);
    const y = clamp(WORLD_H / 2 + Math.sin(angle) * ring, margin, WORLD_H - margin);
    const pal = botPalettes[b % botPalettes.length];
    players.push(createPlayer(b + 2, `Claimant ${b + 1}`, x, y, pal, true));
  }

  for (const p of players) {
    if (!p) continue;
    claimDisk(p.id, p.x, p.y, p.id === PLAYER_ID ? 118 : 92);
  }
  updateStats();
  ui.splash.classList.add("hidden");
  ui.status.textContent = "Close a loop to raise new blocks.";
}

function clearTrail(p) {
  for (const i of p.trailCells) {
    if (trailOwner[i] === p.id) trailOwner[i] = NEUTRAL;
  }
  p.trailCells.clear();
  p.trailPoints.length = 0;
  p.outside = false;
}

function nearestOwnedPoint(p) {
  let best = { x: p.spawnX, y: p.spawnY, d: Infinity };
  const cx = Math.floor(p.x / CELL);
  const cy = Math.floor(p.y / CELL);
  for (let r = 1; r < 18; r++) {
    for (let y = cy - r; y <= cy + r; y++) {
      for (let x = cx - r; x <= cx + r; x++) {
        if (x !== cx - r && x !== cx + r && y !== cy - r && y !== cy + r) continue;
        const i = cellIndex(x, y);
        if (i < 0 || owner[i] !== p.id) continue;
        const c = cellCenter(i);
        const d = Math.hypot(c.x - p.x, c.y - p.y);
        if (d < best.d) best = { x: c.x, y: c.y, d };
      }
    }
    if (best.d < Infinity) return best;
  }
  return best;
}

function pointInPoly(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x;
    const yi = poly[i].y;
    const xj = poly[j].x;
    const yj = poly[j].y;
    const cross = (yi > y) !== (yj > y);
    if (cross && x < ((xj - xi) * (y - yi)) / (yj - yi + 0.00001) + xi) inside = !inside;
  }
  return inside;
}

function captureLoop(p) {
  if (p.trailPoints.length < 5 || p.trailCells.size < 7) {
    clearTrail(p);
    return;
  }

  const poly = [...p.trailPoints, { x: p.x, y: p.y }];
  let minX = WORLD_W;
  let minY = WORLD_H;
  let maxX = 0;
  let maxY = 0;
  for (const pt of poly) {
    minX = Math.min(minX, pt.x);
    minY = Math.min(minY, pt.y);
    maxX = Math.max(maxX, pt.x);
    maxY = Math.max(maxY, pt.y);
  }

  const pad = CELL * 2;
  const cminX = clamp(Math.floor((minX - pad) / CELL), 0, COLS - 1);
  const cmaxX = clamp(Math.floor((maxX + pad) / CELL), 0, COLS - 1);
  const cminY = clamp(Math.floor((minY - pad) / CELL), 0, ROWS - 1);
  const cmaxY = clamp(Math.floor((maxY + pad) / CELL), 0, ROWS - 1);
  let gained = 0;
  let stolen = 0;

  for (let y = cminY; y <= cmaxY; y++) {
    for (let x = cminX; x <= cmaxX; x++) {
      const i = cellIndex(x, y);
      const c = cellCenter(i);
      if (pointInPoly(c.x, c.y, poly) || p.trailCells.has(i)) {
        if (owner[i] !== p.id) {
          if (owner[i] !== NEUTRAL) stolen++;
          owner[i] = p.id;
          age[i] = Math.max(age[i] * 0.25, 0.4);
          stolenHeat[i] = stolen ? 1 : Math.max(stolenHeat[i], 0.28);
          gained++;
        }
      }
    }
  }

  clearTrail(p);
  if (gained > 0) {
    burst(p.x, p.y, p.trailColor, Math.min(46, 16 + gained * 0.18));
    p.score += Math.round(gained * (stolen ? 3.5 : 2));
    ui.status.textContent = p.id === PLAYER_ID ? `Claimed ${gained} blocks. The city grows.` : ui.status.textContent;
  }
}

function burst(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    const a = hash(time * 100 + i, 2) * TAU;
    const s = 60 + hash(time * 90 + i, 5) * 170;
    particles.push({
      x,
      y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      life: 0.45 + hash(i, time) * 0.35,
      max: 0.8,
      color
    });
  }
}

function eliminate(id, killerId = 0) {
  const p = players[id];
  if (!p || !p.alive) return;
  burst(p.x, p.y, p.trailColor, id === PLAYER_ID ? 80 : 36);
  clearTrail(p);

  if (killerId && players[killerId]) {
    players[killerId].kills++;
    players[killerId].score += id === PLAYER_ID ? 500 : 260;
  }

  if (id === PLAYER_ID) {
    p.alive = false;
    gameOver = true;
    running = false;
    ui.status.textContent = "Your route was cut. Restart to build again.";
    ui.splash.classList.remove("hidden");
    ui.splash.querySelector("h2").textContent = "Route Cut";
    ui.splash.querySelector("p").textContent = "Your city stands, but this run is over.";
    ui.start.textContent = "Restart Run";
    return;
  }

  p.alive = false;
  p.respawn = 2.8 + hash(id, time) * 2.2;
  for (let i = 0; i < TOTAL_CELLS; i++) {
    if (owner[i] === id && hash(i, time) > 0.32) {
      owner[i] = NEUTRAL;
      age[i] = 0;
      stolenHeat[i] = 0.5;
    }
  }
}

function respawnBot(p) {
  const angle = hash(p.id, time + 8) * TAU;
  const ring = 500 + hash(p.id, time + 12) * 520;
  p.x = clamp(WORLD_W / 2 + Math.cos(angle) * ring, 220, WORLD_W - 220);
  p.y = clamp(WORLD_H / 2 + Math.sin(angle) * ring, 220, WORLD_H - 220);
  p.spawnX = p.x;
  p.spawnY = p.y;
  p.angle = angle + Math.PI;
  p.targetAngle = p.angle;
  p.alive = true;
  p.outside = false;
  p.trailPoints = [];
  p.trailCells = new Set();
  p.lastOwn = { x: p.x, y: p.y };
  claimDisk(p.id, p.x, p.y, 82);
}

function handleInput(p, dt) {
  let x = 0;
  let y = 0;
  if (keys.has("arrowleft") || keys.has("a")) x -= 1;
  if (keys.has("arrowright") || keys.has("d")) x += 1;
  if (keys.has("arrowup") || keys.has("w")) y -= 1;
  if (keys.has("arrowdown") || keys.has("s")) y += 1;

  if (x || y) {
    p.targetAngle = Math.atan2(y, x);
  } else if (pointer.active) {
    const target = screenToWorld(pointer.x, pointer.y);
    p.targetAngle = Math.atan2(target.y - p.y, target.x - p.x);
  }

  p.angle = turnToward(p.angle, p.targetAngle, dt * 5.8);
}

function findNearestEnemyTrail(p, range) {
  let best = null;
  let bestD = range;
  for (const rival of players) {
    if (!rival || rival.id === p.id || !rival.alive || rival.trailCells.size === 0) continue;
    for (const i of rival.trailCells) {
      const c = cellCenter(i);
      const d = Math.hypot(c.x - p.x, c.y - p.y);
      if (d < bestD) {
        bestD = d;
        best = c;
      }
    }
  }
  return best;
}

function thinkBot(p, dt) {
  p.aiTimer -= dt;
  if (p.aiTimer > 0) return;
  p.aiTimer = 0.28 + hash(p.id, time) * 0.34;

  const idx = indexAt(p.x, p.y);
  const inHome = idx >= 0 && owner[idx] === p.id;
  const nearestHome = nearestOwnedPoint(p);
  const exposed = p.outside && p.trailCells.size > p.loopGoal * (p.personality === "wide-loop" ? 1.8 : 1);
  const hunter = findNearestEnemyTrail(p, p.personality === "opportunist" || p.personality === "aggressive" ? 360 : 190);

  if (hunter && (!p.outside || p.personality === "aggressive")) {
    p.targetAngle = Math.atan2(hunter.y - p.y, hunter.x - p.x);
    return;
  }

  if (p.outside && (exposed || p.personality === "cautious" || nearestHome.d < 220)) {
    p.targetAngle = Math.atan2(nearestHome.y - p.y, nearestHome.x - p.x);
    return;
  }

  if (inHome && hash(p.id, Math.floor(time * 2)) > 0.38) {
    p.wander += (hash(p.id, time) - 0.5) * 1.5;
    const outward = Math.atan2(p.y - p.spawnY, p.x - p.spawnX);
    p.targetAngle = outward + Math.sin(time * 0.45 + p.id) * 1.1 + p.wander * 0.1;
    return;
  }

  p.targetAngle += (hash(p.id, time * 4) - 0.5) * 1.4;
}

function addTrailCell(p, idx) {
  if (idx < 0) return;
  const existing = trailOwner[idx];
  if (existing === p.id && p.trailCells.size > 8) {
    eliminate(p.id, p.id);
    return;
  }
  if (existing && existing !== p.id) {
    eliminate(existing, p.id);
  }
  trailOwner[idx] = p.id;
  p.trailCells.add(idx);
}

function updatePlayer(p, dt) {
  if (!p.alive) {
    if (p.ai) {
      p.respawn -= dt;
      if (p.respawn <= 0) respawnBot(p);
    }
    return;
  }

  if (p.ai) {
    thinkBot(p, dt);
    p.angle = turnToward(p.angle, p.targetAngle, dt * (p.personality === "aggressive" ? 4.2 : 3.25));
  } else {
    handleInput(p, dt);
  }

  p.x += Math.cos(p.angle) * p.speed * dt;
  p.y += Math.sin(p.angle) * p.speed * dt;

  if (p.x < 0 || p.y < 0 || p.x > WORLD_W || p.y > WORLD_H) {
    eliminate(p.id, 0);
    return;
  }

  const idx = indexAt(p.x, p.y);
  if (idx < 0) return;

  const cutter = trailOwner[idx];
  if (cutter && cutter !== p.id) {
    eliminate(cutter, p.id);
  }

  const inOwn = owner[idx] === p.id;
  if (inOwn) {
    p.lastOwn.x = p.x;
    p.lastOwn.y = p.y;
    if (p.outside) captureLoop(p);
    return;
  }

  if (!p.outside) {
    p.outside = true;
    p.trailPoints = [{ x: p.lastOwn.x, y: p.lastOwn.y }];
    p.trailCells.clear();
  }

  const lastPoint = p.trailPoints[p.trailPoints.length - 1];
  if (!lastPoint || Math.hypot(lastPoint.x - p.x, lastPoint.y - p.y) > 12) {
    p.trailPoints.push({ x: p.x, y: p.y });
  }
  addTrailCell(p, idx);
}

function updateAges(dt) {
  for (let i = 0; i < TOTAL_CELLS; i++) {
    if (owner[i] !== NEUTRAL) age[i] = Math.min(60, age[i] + dt);
    if (stolenHeat[i] > 0) stolenHeat[i] = Math.max(0, stolenHeat[i] - dt * 0.45);
  }
}

function updateStats() {
  for (const p of players) {
    if (!p) continue;
    p.territory = 0;
  }
  for (let i = 0; i < TOTAL_CELLS; i++) {
    const id = owner[i];
    if (id && players[id]) players[id].territory++;
  }
  for (const p of players) {
    if (!p) continue;
    p.score = Math.max(p.score, Math.floor(p.territory * 1.35 + p.kills * 300));
  }
}

function update(dt) {
  if (!running) return;
  time += dt;
  for (const p of players) {
    if (p) updatePlayer(p, dt);
  }
  updateAges(dt);
  updateStats();

  const player = players[PLAYER_ID];
  if (player) {
    camera.x = lerp(camera.x, player.x, 1 - Math.pow(0.001, dt));
    camera.y = lerp(camera.y, player.y, 1 - Math.pow(0.001, dt));
    camera.x = clamp(camera.x, W / (2 * camera.zoom), WORLD_W - W / (2 * camera.zoom));
    camera.y = clamp(camera.y, H / (2 * camera.zoom), WORLD_H - H / (2 * camera.zoom));
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= Math.pow(0.05, dt);
    p.vy *= Math.pow(0.05, dt);
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function ownerStyle(id, i) {
  const p = players[id];
  if (!p) return "#20292e";
  const lift = id === PLAYER_ID ? 0.24 : 0.13;
  const pulse = stolenHeat[i] > 0 ? stolenHeat[i] * 0.28 : 0;
  return mixColor(p.landColor, "#f6fbff", lift + pulse);
}

function ownedNeighbor(i, dx, dy, id) {
  const x = i % COLS;
  const y = Math.floor(i / COLS);
  const ni = cellIndex(x + dx, y + dy);
  return ni >= 0 && owner[ni] === id;
}

function development(i, id) {
  let n = 0;
  n += ownedNeighbor(i, 1, 0, id) ? 1 : 0;
  n += ownedNeighbor(i, -1, 0, id) ? 1 : 0;
  n += ownedNeighbor(i, 0, 1, id) ? 1 : 0;
  n += ownedNeighbor(i, 0, -1, id) ? 1 : 0;
  return clamp(age[i] / 34 + n * 0.09 + (id === PLAYER_ID ? 0.18 : 0), 0, 1);
}

function drawCellCity(i, sx, sy, scale) {
  const id = owner[i];
  const p = players[id];
  if (!p) return;

  const dev = development(i, id);
  const rich = id === PLAYER_ID ? 1 : 0.62;
  const local = hash(i, id);
  const s = CELL * scale;
  const pad = Math.max(1, s * 0.1);

  ctx.save();
  ctx.globalAlpha = 0.62 + dev * 0.32;
  ctx.strokeStyle = id === PLAYER_ID ? p.roadColor : mixColor(p.roadColor, "#1a2025", 0.35);
  ctx.lineWidth = Math.max(1, s * 0.1);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(sx + s * 0.5, sy + pad);
  ctx.lineTo(sx + s * 0.5, sy + s - pad);
  if (dev > 0.18) {
    ctx.moveTo(sx + pad, sy + s * 0.5);
    ctx.lineTo(sx + s - pad, sy + s * 0.5);
  }
  ctx.stroke();
  ctx.restore();

  if (dev < 0.15) return;

  const buildingCount = id === PLAYER_ID ? 2 + Math.floor(dev * 3) : 1 + Math.floor(dev * 2);
  for (let b = 0; b < buildingCount; b++) {
    const r = hash(i * 11 + b, id);
    const bx = sx + pad + hash(i * 17 + b, id) * (s - pad * 3);
    const by = sy + pad + hash(i * 19 + b, id) * (s - pad * 3);
    const bw = clamp(s * (0.16 + hash(i * 23 + b, id) * 0.16), 2, s * 0.36);
    const bh = clamp(s * (0.13 + dev * 0.26 * rich + hash(i * 29 + b, id) * 0.16), 2, s * 0.48);

    if (r < 0.16 && dev > 0.42) {
      ctx.fillStyle = p.park || "#68d07c";
      ctx.globalAlpha = 0.72;
      ctx.beginPath();
      ctx.arc(bx + bw * 0.5, by + bh * 0.5, Math.max(2, bw * 0.72), 0, TAU);
      ctx.fill();
      ctx.globalAlpha = 1;
      continue;
    }

    ctx.fillStyle = mixColor(p.landColor, "#f8fbff", 0.5 + dev * 0.2);
    ctx.fillRect(bx, by, bw, bh);
    ctx.fillStyle = id === PLAYER_ID ? skins[selectedSkin].roof : mixColor(p.trailColor, "#ffffff", 0.2);
    ctx.fillRect(bx, by, bw, Math.max(1.5, bh * 0.25));

    if (dev > 0.72 && r > 0.78) {
      ctx.fillStyle = id === PLAYER_ID ? skins[selectedSkin].tower : mixColor(p.trailColor, "#ffffff", 0.45);
      ctx.fillRect(bx + bw * 0.32, by - bh * 0.55, bw * 0.38, bh * 0.6);
    }
  }

  if (dev > 0.85 && local > 0.88 && id === PLAYER_ID) {
    ctx.fillStyle = skins[selectedSkin].tower;
    ctx.beginPath();
    ctx.moveTo(sx + s * 0.5, sy + s * 0.12);
    ctx.lineTo(sx + s * 0.76, sy + s * 0.78);
    ctx.lineTo(sx + s * 0.24, sy + s * 0.78);
    ctx.closePath();
    ctx.fill();
  }
}

function drawWorld() {
  const scale = camera.zoom;
  const left = clamp(Math.floor((camera.x - W / (2 * scale)) / CELL) - 2, 0, COLS - 1);
  const right = clamp(Math.ceil((camera.x + W / (2 * scale)) / CELL) + 2, 0, COLS - 1);
  const top = clamp(Math.floor((camera.y - H / (2 * scale)) / CELL) - 2, 0, ROWS - 1);
  const bottom = clamp(Math.ceil((camera.y + H / (2 * scale)) / CELL) + 2, 0, ROWS - 1);

  ctx.fillStyle = "#121a1f";
  ctx.fillRect(0, 0, W, H);

  for (let y = top; y <= bottom; y++) {
    for (let x = left; x <= right; x++) {
      const i = cellIndex(x, y);
      const sx = (x * CELL - camera.x) * scale + W / 2;
      const sy = (y * CELL - camera.y) * scale + H / 2;
      const s = CELL * scale;

      if (owner[i] === NEUTRAL) {
        const checker = (x + y) % 2 ? 0.03 : 0;
        ctx.fillStyle = checker ? "#162026" : "#141d22";
        ctx.fillRect(sx, sy, s + 0.5, s + 0.5);
        ctx.strokeStyle = "rgba(255,255,255,0.035)";
        ctx.strokeRect(sx, sy, s, s);
      } else {
        ctx.fillStyle = ownerStyle(owner[i], i);
        ctx.fillRect(sx + 0.8, sy + 0.8, s - 1.4, s - 1.4);
        drawCellCity(i, sx, sy, scale);
      }

      const t = trailOwner[i];
      if (t && players[t]) {
        ctx.fillStyle = players[t].trailColor;
        ctx.globalAlpha = 0.68;
        ctx.fillRect(sx + s * 0.22, sy + s * 0.22, s * 0.56, s * 0.56);
        ctx.globalAlpha = 1;
      }
    }
  }

  const border = worldToScreen(0, 0);
  ctx.strokeStyle = "rgba(255,255,255,0.32)";
  ctx.lineWidth = 3;
  ctx.strokeRect(border.x, border.y, WORLD_W * scale, WORLD_H * scale);
}

function drawTrail(p) {
  if (!p.alive || p.trailPoints.length < 2) return;
  ctx.strokeStyle = p.trailColor;
  ctx.lineWidth = Math.max(5, 7 * camera.zoom);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  const first = worldToScreen(p.trailPoints[0].x, p.trailPoints[0].y);
  ctx.moveTo(first.x, first.y);
  for (let i = 1; i < p.trailPoints.length; i++) {
    const pt = worldToScreen(p.trailPoints[i].x, p.trailPoints[i].y);
    ctx.lineTo(pt.x, pt.y);
  }
  const head = worldToScreen(p.x, p.y);
  ctx.lineTo(head.x, head.y);
  ctx.stroke();
}

function drawRunner(p) {
  if (!p.alive) return;
  const s = worldToScreen(p.x, p.y);
  const r = (p.id === PLAYER_ID ? 13 : 10) * camera.zoom;

  ctx.save();
  ctx.translate(s.x, s.y);
  ctx.rotate(p.angle);
  ctx.fillStyle = p.color;
  ctx.strokeStyle = "#f8fbff";
  ctx.lineWidth = p.id === PLAYER_ID ? 2.6 : 1.5;
  ctx.beginPath();
  ctx.moveTo(r * 1.25, 0);
  ctx.lineTo(-r * 0.76, -r * 0.82);
  ctx.lineTo(-r * 0.48, 0);
  ctx.lineTo(-r * 0.76, r * 0.82);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  if (p.outside) {
    ctx.strokeStyle = p.trailColor;
    ctx.globalAlpha = 0.35 + Math.sin(time * 10) * 0.12;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(s.x, s.y, r * 1.65, 0, TAU);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function drawParticles() {
  for (const p of particles) {
    const s = worldToScreen(p.x, p.y);
    ctx.globalAlpha = clamp(p.life / p.max, 0, 1);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(s.x, s.y, 2.8 + p.life * 4, 0, TAU);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function draw() {
  drawWorld();
  for (const p of players) if (p) drawTrail(p);
  for (const p of players) if (p) drawRunner(p);
  drawParticles();
}

function updateHud() {
  const player = players[PLAYER_ID];
  if (!player) return;
  const active = players.filter(p => p && p.alive);
  const ranked = [...players].filter(Boolean).sort((a, b) => b.territory - a.territory);
  const rank = ranked.findIndex(p => p.id === PLAYER_ID) + 1;
  ui.score.textContent = Math.floor(player.score).toLocaleString();
  ui.share.textContent = `${((player.territory / TOTAL_CELLS) * 100).toFixed(1)}%`;
  ui.kills.textContent = player.kills.toString();
  ui.rank.textContent = `#${rank || active.length}`;
}

function frame(now) {
  const dt = Math.min(0.033, (now - last) / 1000 || 0);
  last = now;
  update(dt);
  draw();
  updateHud();
  requestAnimationFrame(frame);
}

function setSkin(index) {
  selectedSkin = index;
  ui.skins.forEach((button, i) => button.classList.toggle("active", i === index));
  if (players[PLAYER_ID]) {
    const skin = skins[selectedSkin];
    const player = players[PLAYER_ID];
    player.color = skin.body;
    player.trailColor = skin.trail;
    player.landColor = skin.land;
    player.roadColor = skin.road;
  }
}

window.addEventListener("resize", resize);
window.addEventListener("keydown", event => {
  const key = event.key.toLowerCase();
  keys.add(key);
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) event.preventDefault();
});
window.addEventListener("keyup", event => keys.delete(event.key.toLowerCase()));

canvas.addEventListener("pointermove", event => {
  pointer.active = true;
  pointer.x = event.clientX;
  pointer.y = event.clientY;
});

canvas.addEventListener("pointerdown", event => {
  pointer.active = true;
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  canvas.setPointerCapture(event.pointerId);
});

canvas.addEventListener("pointerup", event => {
  try {
    canvas.releasePointerCapture(event.pointerId);
  } catch {}
});

canvas.addEventListener("pointerleave", () => {
  pointer.active = false;
});

ui.start.addEventListener("click", resetGame);
ui.restart.addEventListener("click", resetGame);
ui.skins.forEach(button => {
  button.addEventListener("click", () => setSkin(Number(button.dataset.skin)));
});

resize();
setSkin(0);
resetGame();
running = false;
ui.splash.classList.remove("hidden");
requestAnimationFrame(frame);
