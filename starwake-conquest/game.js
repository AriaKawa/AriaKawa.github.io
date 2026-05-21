"use strict";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const statusLine = document.getElementById("statusLine");
const scoreStrip = document.getElementById("scoreStrip");
const selectedTitle = document.getElementById("selectedTitle");
const selectedMeta = document.getElementById("selectedMeta");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");
const splash = document.getElementById("splash");
const startBtn = document.getElementById("startBtn");
const quickBtn = document.getElementById("quickBtn");

const TAU = Math.PI * 2;
const PLAYER = "player";
const NEUTRAL = "neutral";
const WORLD = { width: 1600, height: 940 };
const COLORS = {
  player: "#f9c74f",
  ember: "#ff5f80",
  volta: "#55d6ff",
  moss: "#5ee49d",
  neutral: "#6e7b91"
};

const COMMANDERS = [
  { id: PLAYER, name: "Auric", color: COLORS.player, ai: false },
  { id: "ember", name: "Ember", color: COLORS.ember, ai: true, bias: 0.92 },
  { id: "volta", name: "Volta", color: COLORS.volta, ai: true, bias: 1.08 },
  { id: "moss", name: "Moss", color: COLORS.moss, ai: true, bias: 1 }
];

let W = 0;
let H = 0;
let dpr = 1;
let planets = [];
let fleets = [];
let sparks = [];
let stars = [];
let selected = new Set();
let hovered = null;
let drag = null;
let running = false;
let paused = false;
let ended = false;
let speed = 1;
let sendRatio = 0.35;
let last = 0;
let seed = Date.now() % 999999;
let camera = { x: 0, y: 0, scale: 1 };
let scoreTimer = 0;

function mulberry32(value) {
  return function random() {
    value |= 0;
    value = value + 0x6d2b79f5 | 0;
    let t = Math.imul(value ^ value >>> 15, 1 | value);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

let random = mulberry32(seed);

function rand(min, max) {
  return min + random() * (max - min);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
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
  fitCamera();
}

function fitCamera() {
  const topPad = W < 860 ? 210 : 126;
  const bottomPad = W < 860 ? 290 : 96;
  const sidePad = W < 860 ? 24 : 44;
  const usableW = Math.max(320, W - sidePad * 2);
  const usableH = Math.max(260, H - topPad - bottomPad);
  camera.scale = Math.min(usableW / WORLD.width, usableH / WORLD.height);
  camera.x = (W - WORLD.width * camera.scale) / 2;
  camera.y = topPad + (usableH - WORLD.height * camera.scale) / 2;
}

function worldToScreen(point) {
  return {
    x: camera.x + point.x * camera.scale,
    y: camera.y + point.y * camera.scale
  };
}

function screenToWorld(x, y) {
  return {
    x: (x - camera.x) / camera.scale,
    y: (y - camera.y) / camera.scale
  };
}

function makeStars() {
  stars = Array.from({ length: 180 }, () => ({
    x: random() * WORLD.width,
    y: random() * WORLD.height,
    r: rand(0.6, 1.9),
    a: rand(0.18, 0.82),
    tw: rand(0.6, 1.8)
  }));
}

function planetName(index) {
  const names = [
    "Vega", "Nadir", "Kite", "Orison", "Helio", "Cinder", "Lumen", "Aster",
    "Morrow", "Talus", "Cobalt", "Eon", "Sable", "Rift", "Juniper", "Solace",
    "Ardent", "Pulse", "Halcyon", "Lyric", "Vale", "Nova", "Meridian", "Anchor"
  ];
  return names[index % names.length];
}

function makePlanet(index, x, y, radius, owner = NEUTRAL, ships = 14) {
  return {
    id: index,
    name: planetName(index),
    x,
    y,
    radius,
    owner,
    ships,
    maxShips: Math.round(52 + radius * 4.2),
    growth: radius < 24 ? 1.2 : radius < 34 ? 1.8 : 2.5,
    pulse: rand(0, TAU),
    aiClock: rand(0.4, 2.4)
  };
}

function farEnough(candidate, list, minGap = 18) {
  return list.every(planet => dist(candidate, planet) > candidate.radius + planet.radius + minGap);
}

function generateSector(nextSeed = seed) {
  seed = nextSeed;
  random = mulberry32(seed);
  makeStars();
  fleets = [];
  sparks = [];
  selected.clear();
  ended = false;
  paused = false;
  running = false;
  speed = 1;
  scoreTimer = 0;
  updateSpeedButtons();
  pauseBtn.textContent = "Pause";

  const starts = [
    { owner: PLAYER, x: 178, y: WORLD.height * 0.5 },
    { owner: "ember", x: WORLD.width - 178, y: WORLD.height * 0.5 },
    { owner: "volta", x: WORLD.width * 0.52, y: 138 },
    { owner: "moss", x: WORLD.width * 0.52, y: WORLD.height - 138 }
  ];

  planets = starts.map((start, index) => makePlanet(index, start.x, start.y, 36, start.owner, 58));
  let index = planets.length;
  let tries = 0;
  while (planets.length < 26 && tries < 900) {
    tries++;
    const radius = rand(17, 42);
    const candidate = makePlanet(
      index,
      rand(98 + radius, WORLD.width - 98 - radius),
      rand(92 + radius, WORLD.height - 92 - radius),
      radius,
      NEUTRAL,
      Math.round(rand(8, radius * 2.3))
    );
    if (!farEnough(candidate, planets, 38)) continue;
    planets.push(candidate);
    index++;
  }
  statusLine.textContent = "Claim the sector before the rival fleets do.";
  updateSelectionText();
  updateScores();
}

function ownerInfo(owner) {
  return COMMANDERS.find(commander => commander.id === owner) || { name: "Neutral", color: COLORS.neutral, ai: false };
}

function planetAt(x, y) {
  const point = screenToWorld(x, y);
  return planets.find(planet => Math.hypot(planet.x - point.x, planet.y - point.y) <= planet.radius + 8) || null;
}

function selectPlanet(planet, additive = false) {
  if (!planet || planet.owner !== PLAYER) return;
  if (!additive) selected.clear();
  if (selected.has(planet.id)) selected.delete(planet.id);
  else selected.add(planet.id);
  updateSelectionText();
}

function selectedPlanets() {
  return planets.filter(planet => selected.has(planet.id) && planet.owner === PLAYER && planet.ships >= 2);
}

function sendFleet(from, to, ratio, owner = from.owner) {
  if (!from || !to || from === to || from.owner !== owner) return false;
  const amount = Math.floor(from.ships * ratio);
  if (amount < 1) return false;
  from.ships -= amount;
  const travel = Math.max(0.7, dist(from, to) / 245);
  fleets.push({
    owner,
    from: from.id,
    to: to.id,
    x: from.x,
    y: from.y,
    sx: from.x,
    sy: from.y,
    tx: to.x,
    ty: to.y,
    amount,
    t: 0,
    travel
  });
  createSpark(from.x, from.y, ownerInfo(owner).color, 8);
  return true;
}

function launchSelected(target) {
  if (!target) return;
  const sources = selectedPlanets().filter(source => source !== target);
  let launched = 0;
  for (const source of sources) {
    if (sendFleet(source, target, sendRatio)) launched++;
  }
  if (launched) {
    statusLine.textContent = `Launched ${launched} fleet${launched === 1 ? "" : "s"} toward ${target.name}.`;
  }
  updateSelectionText();
}

function createSpark(x, y, color, count = 10) {
  for (let i = 0; i < count; i++) {
    sparks.push({
      x,
      y,
      vx: rand(-38, 38),
      vy: rand(-38, 38),
      life: rand(0.32, 0.7),
      max: 0.7,
      color
    });
  }
}

function update(dt) {
  if (!running || paused || ended) return;
  const scaled = dt * speed;
  for (const planet of planets) {
    if (planet.owner !== NEUTRAL) {
      planet.ships = Math.min(planet.maxShips, planet.ships + planet.growth * scaled);
    }
    if (planet.owner !== PLAYER && planet.owner !== NEUTRAL) {
      planet.aiClock -= scaled;
      if (planet.aiClock <= 0) {
        aiMove(planet);
        planet.aiClock = rand(1.6, 3.6) / (ownerInfo(planet.owner).bias || 1);
      }
    }
    planet.pulse += scaled;
  }

  for (let i = fleets.length - 1; i >= 0; i--) {
    const fleet = fleets[i];
    fleet.t += scaled / fleet.travel;
    const ease = fleet.t * fleet.t * (3 - 2 * fleet.t);
    fleet.x = fleet.sx + (fleet.tx - fleet.sx) * ease;
    fleet.y = fleet.sy + (fleet.ty - fleet.sy) * ease;
    if (fleet.t >= 1) {
      const target = planets.find(planet => planet.id === fleet.to);
      if (target) resolveArrival(fleet, target);
      fleets.splice(i, 1);
    }
  }

  for (let i = sparks.length - 1; i >= 0; i--) {
    const spark = sparks[i];
    spark.life -= scaled;
    spark.x += spark.vx * scaled;
    spark.y += spark.vy * scaled;
    if (spark.life <= 0) sparks.splice(i, 1);
  }

  checkEnd();
  scoreTimer -= scaled;
  if (scoreTimer <= 0) {
    updateScores();
    scoreTimer = 0.35;
  }
}

function resolveArrival(fleet, target) {
  const color = ownerInfo(fleet.owner).color;
  createSpark(target.x, target.y, color, 14);
  if (target.owner === fleet.owner) {
    target.ships = Math.min(target.maxShips, target.ships + fleet.amount);
    return;
  }
  target.ships -= fleet.amount;
  if (target.ships < 0) {
    target.owner = fleet.owner;
    target.ships = Math.abs(target.ships);
    selected.delete(target.id);
    createSpark(target.x, target.y, color, 20);
  }
}

function aiMove(source) {
  if (source.ships < 22) return;
  const myPlanets = planets.filter(planet => planet.owner === source.owner);
  const enemies = planets.filter(planet => planet.owner !== source.owner);
  const nearby = enemies
    .map(target => {
      const distance = dist(source, target);
      const ownerWeight = target.owner === NEUTRAL ? 0 : 28;
      const growthValue = target.growth * 9;
      const score = target.ships + distance * 0.035 + ownerWeight - growthValue;
      return { target, score };
    })
    .sort((a, b) => a.score - b.score);
  const help = myPlanets
    .filter(planet => planet !== source && planet.ships < 16)
    .sort((a, b) => dist(source, a) - dist(source, b))[0];
  if (help && source.ships > 42 && random() < 0.18) {
    sendFleet(source, help, 0.28, source.owner);
    return;
  }
  const choice = nearby[0]?.target;
  if (!choice) return;
  const ratio = choice.owner === NEUTRAL ? 0.38 : 0.52;
  if (source.ships * ratio > choice.ships * 0.75 || random() < 0.28) {
    sendFleet(source, choice, ratio, source.owner);
  }
}

function standings() {
  return COMMANDERS.map(commander => {
    const owned = planets.filter(planet => planet.owner === commander.id);
    const ships = owned.reduce((sum, planet) => sum + planet.ships, 0)
      + fleets.filter(fleet => fleet.owner === commander.id).reduce((sum, fleet) => sum + fleet.amount, 0);
    return { ...commander, worlds: owned.length, ships: Math.round(ships) };
  });
}

function checkEnd() {
  const live = standings().filter(row => row.worlds > 0 || row.ships > 0);
  const player = live.find(row => row.id === PLAYER);
  if (!player) {
    endMatch("Sector Lost", "Your last planet fell. Rebuild the fleet and try a sharper opening.");
    return;
  }
  if (live.length === 1 && player) {
    endMatch("Sector Secured", "Auric command controls every active world in the sector.");
  }
}

function endMatch(title, body) {
  ended = true;
  running = false;
  splash.querySelector("h2").textContent = title;
  splash.querySelector("p").textContent = body;
  startBtn.textContent = "Play Again";
  splash.classList.remove("is-hidden");
}

function updateScores() {
  scoreStrip.innerHTML = standings().map(row => `
    <div class="score-card" style="--color:${row.color}">
      <strong>${row.name}</strong>
      <span>${row.worlds} worlds / ${row.ships} ships</span>
    </div>
  `).join("");
}

function updateSelectionText() {
  const sources = selectedPlanets();
  if (!sources.length) {
    selectedTitle.textContent = "No fleet selected";
    selectedMeta.textContent = "Click one of your yellow planets, then click any target.";
    return;
  }
  const ships = sources.reduce((sum, planet) => sum + Math.floor(planet.ships * sendRatio), 0);
  selectedTitle.textContent = `${sources.length} planet${sources.length === 1 ? "" : "s"} selected`;
  selectedMeta.textContent = `${ships} ships ready at ${Math.round(sendRatio * 100)}% launch strength.`;
}

function updateSpeedButtons() {
  document.querySelectorAll("[data-speed]").forEach(button => {
    button.classList.toggle("is-active", Number(button.dataset.speed) === speed);
  });
}

function render(time = 0) {
  ctx.clearRect(0, 0, W, H);
  drawBackground(time);
  ctx.save();
  ctx.translate(camera.x, camera.y);
  ctx.scale(camera.scale, camera.scale);
  drawLanes();
  drawPlanets();
  drawFleets();
  drawDragBox();
  drawSparks();
  ctx.restore();
}

function drawBackground(time) {
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "#070914");
  grad.addColorStop(0.46, "#10121c");
  grad.addColorStop(1, "#06070b");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.translate(camera.x, camera.y);
  ctx.scale(camera.scale, camera.scale);
  for (const star of stars) {
    ctx.globalAlpha = star.a + Math.sin(time * 0.001 * star.tw + star.x) * 0.12;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, TAU);
    ctx.fillStyle = "#f7fbff";
    ctx.fill();
  }
  ctx.restore();
  ctx.globalAlpha = 1;
}

function drawLanes() {
  ctx.lineWidth = 1.2 / camera.scale;
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const a = planets[i];
      const b = planets[j];
      const distance = dist(a, b);
      if (distance > 265) continue;
      ctx.globalAlpha = clamp(1 - distance / 285, 0.08, 0.22);
      ctx.strokeStyle = "#8aa1c4";
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
}

function drawPlanets() {
  for (const planet of planets) {
    const info = ownerInfo(planet.owner);
    const isSelected = selected.has(planet.id);
    const isHovered = hovered && hovered.id === planet.id;
    const glow = isSelected ? 28 : isHovered ? 18 : 10;
    const ring = planet.radius + (isSelected ? 10 : 5) + Math.sin(planet.pulse * 2) * 1.4;

    ctx.save();
    ctx.shadowColor = info.color;
    ctx.shadowBlur = glow;
    const gradient = ctx.createRadialGradient(
      planet.x - planet.radius * 0.38,
      planet.y - planet.radius * 0.42,
      planet.radius * 0.2,
      planet.x,
      planet.y,
      planet.radius * 1.25
    );
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(0.17, info.color);
    gradient.addColorStop(1, planet.owner === NEUTRAL ? "#273044" : "#111827");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(planet.x, planet.y, planet.radius, 0, TAU);
    ctx.fill();
    ctx.restore();

    ctx.lineWidth = (isSelected ? 4 : 2) / camera.scale;
    ctx.strokeStyle = planet.owner === NEUTRAL ? "rgba(194, 204, 221, 0.45)" : info.color;
    ctx.beginPath();
    ctx.arc(planet.x, planet.y, ring, 0, TAU);
    ctx.stroke();

    ctx.fillStyle = "#f8fbff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${Math.max(13, planet.radius * 0.54)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(String(Math.floor(planet.ships)), planet.x, planet.y);

    if (camera.scale > 0.45) {
      ctx.fillStyle = "rgba(248, 251, 255, 0.76)";
      ctx.font = `700 ${12 / camera.scale}px "Plus Jakarta Sans", sans-serif`;
      ctx.fillText(planet.name, planet.x, planet.y + planet.radius + 18 / camera.scale);
    }
  }
}

function drawFleets() {
  for (const fleet of fleets) {
    const info = ownerInfo(fleet.owner);
    const angle = Math.atan2(fleet.ty - fleet.sy, fleet.tx - fleet.sx);
    const size = clamp(6 + Math.sqrt(fleet.amount) * 1.4, 8, 19);
    ctx.save();
    ctx.translate(fleet.x, fleet.y);
    ctx.rotate(angle);
    ctx.fillStyle = info.color;
    ctx.shadowColor = info.color;
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.moveTo(size, 0);
    ctx.lineTo(-size * 0.72, size * 0.48);
    ctx.lineTo(-size * 0.42, 0);
    ctx.lineTo(-size * 0.72, -size * 0.48);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

function drawSparks() {
  for (const spark of sparks) {
    const alpha = clamp(spark.life / spark.max, 0, 1);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = spark.color;
    ctx.beginPath();
    ctx.arc(spark.x, spark.y, 3.4, 0, TAU);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawDragBox() {
  if (!drag || !drag.active) return;
  const a = screenToWorld(drag.startX, drag.startY);
  const b = screenToWorld(drag.x, drag.y);
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  const w = Math.abs(a.x - b.x);
  const h = Math.abs(a.y - b.y);
  ctx.fillStyle = "rgba(249, 199, 79, 0.08)";
  ctx.strokeStyle = "rgba(249, 199, 79, 0.82)";
  ctx.lineWidth = 2 / camera.scale;
  ctx.fillRect(x, y, w, h);
  ctx.strokeRect(x, y, w, h);
}

function pointerPosition(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

canvas.addEventListener("pointerdown", event => {
  if (!running || ended) return;
  const pos = pointerPosition(event);
  canvas.setPointerCapture(event.pointerId);
  drag = { startX: pos.x, startY: pos.y, x: pos.x, y: pos.y, active: false };
});

canvas.addEventListener("pointermove", event => {
  const pos = pointerPosition(event);
  hovered = planetAt(pos.x, pos.y);
  if (drag) {
    drag.x = pos.x;
    drag.y = pos.y;
    drag.active = Math.hypot(drag.x - drag.startX, drag.y - drag.startY) > 12;
  }
});

canvas.addEventListener("pointerup", event => {
  if (!drag) return;
  const pos = pointerPosition(event);
  const target = planetAt(pos.x, pos.y);
  if (drag.active) {
    const a = screenToWorld(drag.startX, drag.startY);
    const b = screenToWorld(drag.x, drag.y);
    const minX = Math.min(a.x, b.x);
    const maxX = Math.max(a.x, b.x);
    const minY = Math.min(a.y, b.y);
    const maxY = Math.max(a.y, b.y);
    selected.clear();
    for (const planet of planets) {
      if (planet.owner === PLAYER && planet.x >= minX && planet.x <= maxX && planet.y >= minY && planet.y <= maxY) {
        selected.add(planet.id);
      }
    }
    updateSelectionText();
  } else if (target && target.owner === PLAYER && (!selected.size || event.shiftKey)) {
    selectPlanet(target, event.shiftKey);
  } else if (target && selected.size) {
    launchSelected(target);
  } else {
    selected.clear();
    updateSelectionText();
  }
  drag = null;
});

document.querySelectorAll("[data-send]").forEach(button => {
  button.addEventListener("click", () => {
    sendRatio = Number(button.dataset.send);
    document.querySelectorAll("[data-send]").forEach(item => item.classList.toggle("is-active", item === button));
    updateSelectionText();
  });
});

document.querySelectorAll("[data-speed]").forEach(button => {
  button.addEventListener("click", () => {
    speed = Number(button.dataset.speed);
    updateSpeedButtons();
  });
});

pauseBtn.addEventListener("click", () => {
  if (!running || ended) return;
  paused = !paused;
  pauseBtn.textContent = paused ? "Resume" : "Pause";
  statusLine.textContent = paused ? "Battle paused." : "Battle resumed.";
});

restartBtn.addEventListener("click", () => {
  generateSector(seed);
  running = true;
  splash.classList.add("is-hidden");
});

startBtn.addEventListener("click", () => {
  running = true;
  paused = false;
  splash.classList.add("is-hidden");
});

quickBtn.addEventListener("click", () => {
  generateSector(Math.floor(Math.random() * 999999));
  running = true;
  splash.classList.add("is-hidden");
});

window.addEventListener("keydown", event => {
  if (event.code === "Space") {
    event.preventDefault();
    pauseBtn.click();
  }
  if (event.key.toLowerCase() === "r") restartBtn.click();
  if (event.key === "1") document.querySelector('[data-speed="1"]').click();
  if (event.key === "2") document.querySelector('[data-speed="1.5"]').click();
  if (event.key === "3") document.querySelector('[data-speed="2.25"]').click();
});

function frame(timestamp) {
  const dt = Math.min(0.045, (timestamp - last) / 1000 || 0);
  last = timestamp;
  update(dt);
  render(timestamp);
  requestAnimationFrame(frame);
}

window.addEventListener("resize", resize);
generateSector(seed);
resize();
requestAnimationFrame(frame);
