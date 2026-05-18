import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getDatabase, get, onValue, ref, update } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import { firebaseConfig } from "../assets/js/firebase-config.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ui = {
  level: document.getElementById("levelReadout"),
  kills: document.getElementById("killsReadout"),
  xpFill: document.getElementById("xpFill"),
  buildButton: document.getElementById("buildButton"),
  upgradesButton: document.getElementById("upgradesButton"),
  buildDrawer: document.getElementById("buildDrawer"),
  upgradesDrawer: document.getElementById("upgradesDrawer"),
  closeBuildButton: document.getElementById("closeBuildButton"),
  closeUpgradesButton: document.getElementById("closeUpgradesButton"),
  buildList: document.getElementById("buildList"),
  money: document.getElementById("moneyReadout"),
  lifetimeKills: document.getElementById("lifetimeKillsReadout"),
  strategy: document.getElementById("strategyReadout"),
  shopList: document.getElementById("shopList"),
  upgradeLog: document.getElementById("upgradeLog"),
  startOverlay: document.getElementById("startOverlay"),
  roomStatus: document.getElementById("roomStatus"),
  playersList: document.getElementById("playersList"),
  playerNameInput: document.getElementById("playerNameInput"),
  roomCodeInput: document.getElementById("roomCodeInput"),
  createRoomButton: document.getElementById("createRoomButton"),
  joinRoomButton: document.getElementById("joinRoomButton"),
  startButton: document.getElementById("startButton"),
  upgradeOverlay: document.getElementById("upgradeOverlay"),
  upgradeChoices: document.getElementById("upgradeChoices"),
  draftLevel: document.getElementById("draftLevel"),
  endOverlay: document.getElementById("endOverlay"),
  endEyebrow: document.getElementById("endEyebrow"),
  endTitle: document.getElementById("endTitle"),
  endBody: document.getElementById("endBody"),
  endTime: document.getElementById("endTime"),
  endKills: document.getElementById("endKills"),
  endLevel: document.getElementById("endLevel"),
  bossBanner: document.getElementById("bossBanner"),
  bossName: document.getElementById("bossName"),
  pauseButton: document.getElementById("pauseButton"),
  followButton: document.getElementById("followButton"),
  speedButtons: Array.from(document.querySelectorAll("[data-speed]")),
  restartButton: document.getElementById("restartButton")
};

const TAU = Math.PI * 2;
const WORLD = {
  chunkSize: 1600,
  tileSize: 1024,
  spawnMin: 720,
  spawnMax: 1280,
  despawnEnemy: 3400,
  despawnLoot: 3000,
  obstacleChance: 0.32
};
const RUN_DURATION = 600;
const ROOM_COLLECTION = "tables";
const PLAYER_COLORS = ["#49f4ff", "#ff4f87", "#77ff9b", "#ffd166"];
const FOLLOW_ZOOM = 1.06;
const MANUAL_ZOOM_MIN = 0.24;
const MANUAL_ZOOM_MAX = 1.22;
const bossSchedule = [
  { at: 120, name: "Orbital Devourer" },
  { at: 240, name: "The Prism Maw" },
  { at: 360, name: "Moonless Leviathan" },
  { at: 480, name: "Choir of Pulsars" },
  { at: 555, name: "Dawnless Singularity" }
];

const enemyTypes = {
  starMite: { name: "Star Mite", hp: 16, speed: 70, damage: 7, radius: 10, xp: 2, color: "#70f5ff" },
  voidBat: { name: "Void Ray", hp: 14, speed: 136, damage: 6, radius: 12, xp: 2, color: "#a56bff" },
  spaceRat: { name: "Helmet Space Rat", hp: 34, speed: 96, damage: 10, radius: 15, xp: 4, color: "#f2d37b", swims: true },
  crystalKnight: { name: "Crystal Drone", hp: 82, speed: 46, damage: 16, radius: 20, xp: 8, color: "#7dffdb" },
  plasmaCultist: { name: "Plasma Caster", hp: 42, speed: 58, damage: 8, radius: 16, xp: 6, color: "#ff5cb8", ranged: true },
  novaShade: { name: "Nova Shade", hp: 32, speed: 94, damage: 24, radius: 16, xp: 5, color: "#ffb84a", explodes: true },
  boss: { name: "Boss", hp: 1150, speed: 40, damage: 28, radius: 40, xp: 58, color: "#ff395d" }
};

const weaponCatalog = {
  orbit: { name: "Blood Orbit", color: "#ff3f7d", level: 1, cooldown: 0, damage: 18, count: 2, radius: 76, description: "Red plasma blades circle the UFO and carve nearby enemies." },
  crossbow: { name: "Moonshot Crossbow", color: "#6be7ff", level: 1, cooldown: 0, delay: 0.72, damage: 24, count: 1, speed: 540, description: "Icy lunar bolts auto-fire at the closest target." },
  sigil: { name: "Gravefire Sigil", color: "#b15cff", level: 0, cooldown: 1.4, delay: 3.2, damage: 34, radius: 118, description: "A violet ritual ring blooms outward and burns everything it touches." },
  bats: { name: "Bat Swarm", color: "#b4ff4f", level: 0, cooldown: 0.9, delay: 1.9, damage: 17, count: 2, speed: 360, description: "Green-gold familiars launch from the hull and home into enemies." }
};

const upgradeMeta = {
  "Crimson Heart": { color: "#ff5b8e", description: "Adds max blood and gives an instant heal." },
  "Velvet Thirst": { color: "#ff8cc8", description: "Improves passive regeneration between hits." },
  "Magnet Moon": { color: "#55f2ff", description: "Expands pickup range so XP reaches the UFO sooner." },
  "Silver Boots": { color: "#ffd166", description: "Increases AI movement speed and dodge spacing." }
};

const assetImages = {
  background: loadAsset("assets/cosmic-space-tile.webp"),
  enemies: loadAsset("assets/enemy-atlas.png")
};

const enemyAtlas = {
  starMite: { col: 0, row: 0, scale: 3.25 },
  voidBat: { col: 1, row: 0, scale: 4.65 },
  spaceRat: { col: 2, row: 0, scale: 4.3 },
  crystalKnight: { col: 3, row: 0, scale: 4.25 },
  plasmaCultist: { col: 0, row: 1, scale: 4.45 },
  novaShade: { col: 1, row: 1, scale: 4.35 },
  boss: { col: 2, row: 1, scale: 4.8 },
  prismBoss: { col: 3, row: 1, scale: 4.8 }
};

const obstacleKinds = [
  { id: "violet-planet", color: "#7058ff", ring: "#f1b8ff", radius: [148, 255], ringed: true },
  { id: "ember-moon", color: "#ffba5d", ring: "#ff6b9e", radius: [118, 205], ringed: false },
  { id: "cold-asteroid", color: "#7cd5ff", ring: "#b7f7ff", radius: [96, 170], ringed: false },
  { id: "opal-planet", color: "#7fffe4", ring: "#d8fbff", radius: [135, 235], ringed: true }
];
const obstacleCache = new Map();

const starField = makeStarField(230);
const shopCatalog = [
  { id: "damage", name: "Honed Rituals", type: "Passive", max: 18, base: 35, scale: 1.36, text: "+8% all weapon damage." },
  { id: "health", name: "Crimson Training", type: "Passive", max: 16, base: 30, scale: 1.32, text: "+14 starting blood." },
  { id: "income", name: "Gilded Fangs", type: "Passive", max: 12, base: 45, scale: 1.42, text: "+10% kill money." },
  { id: "magnet", name: "Moon Magnet", type: "Passive", max: 10, base: 28, scale: 1.34, text: "+22 pickup range." },
  { id: "speed", name: "Court Footwork", type: "Passive", max: 10, base: 32, scale: 1.35, text: "+10 movement speed." },
  { id: "regen", name: "Velvet Recovery", type: "Passive", max: 10, base: 40, scale: 1.38, text: "+0.22 blood regen." },
  { id: "startSigil", name: "Starter Sigil", type: "Active Item", max: 1, base: 120, scale: 1, text: "Begin every run with Gravefire Sigil." },
  { id: "startBats", name: "Starter Bat Swarm", type: "Active Item", max: 1, base: 150, scale: 1, text: "Begin every run with homing familiars." },
  { id: "extraBolt", name: "Twin Moonshot", type: "Active Item", max: 1, base: 210, scale: 1, text: "Begin with an extra crossbow bolt." },
  { id: "aegis", name: "First-Blood Aegis", type: "Active Item", max: 1, base: 260, scale: 1, text: "Start each run with a one-hit shield." }
];

let width = 0;
let height = 0;
let dpr = 1;
let lastFrame = performance.now();
let renderCamera = {
  x: 0,
  y: 0,
  zoom: 0.64,
  follow: true,
  snap: false,
  initialized: false,
  dragging: false,
  dragX: 0,
  dragY: 0,
  pinchDistance: 0
};
const cameraPointers = new Map();
let services = null;
let roomRef = null;
let unsubscribeRoom = null;
let clientId = localStorage.getItem("nightboundAutobattler.clientId");
if (!clientId) {
  clientId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  localStorage.setItem("nightboundAutobattler.clientId", clientId);
}

const state = {
  roomCode: "",
  isHost: false,
  remoteRoom: null,
  mode: "lobby",
  sim: null,
  render: null,
  particles: [],
  floaters: [],
  lastSnapshotWrite: 0
};

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function hasFirebaseConfig() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.databaseURL && firebaseConfig.projectId && firebaseConfig.appId);
}

async function boot() {
  resize();
  window.addEventListener("resize", resize);
  ui.playerNameInput.value = localStorage.getItem("nightboundAutobattler.name") || "";
  ui.roomCodeInput.value = new URLSearchParams(location.search).get("room") || "";
  ui.createRoomButton.addEventListener("click", () => createRoom().catch((error) => setStatus(error.message)));
  ui.joinRoomButton.addEventListener("click", () => joinRoom().catch((error) => setStatus(error.message)));
  ui.startButton.addEventListener("click", () => startMatch().catch((error) => setStatus(error.message)));
  ui.restartButton.addEventListener("click", () => startMatch().catch((error) => setStatus(error.message)));
  ui.pauseButton.addEventListener("click", togglePause);
  ui.followButton.addEventListener("click", focusFollowCamera);
  ui.speedButtons.forEach((button) => {
    button.addEventListener("click", () => setRoomSpeed(Number(button.dataset.speed)).catch((error) => setStatus(error.message)));
  });
  ui.buildButton.addEventListener("click", () => openDrawer(ui.buildDrawer));
  ui.upgradesButton.addEventListener("click", () => openDrawer(ui.upgradesDrawer));
  ui.closeBuildButton.addEventListener("click", () => closeDrawer(ui.buildDrawer));
  ui.closeUpgradesButton.addEventListener("click", () => closeDrawer(ui.upgradesDrawer));
  ui.buildDrawer.addEventListener("click", closeDrawerFromBackdrop);
  ui.upgradesDrawer.addEventListener("click", closeDrawerFromBackdrop);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawers();
  });
  setupCameraInput();

  if (!hasFirebaseConfig()) {
    ui.roomStatus.textContent = "Firebase config missing.";
  } else {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    await signInAnonymously(auth);
    services = { auth, db: getDatabase(app) };
    ui.roomStatus.textContent = "Firebase ready. Create a room or join a friend.";
  }

  if (ui.roomCodeInput.value.trim()) {
    joinRoom().catch((error) => setStatus(error.message));
  }

  requestAnimationFrame(loop);
}

function setStatus(message) {
  ui.roomStatus.textContent = message;
}

async function setRoomSpeed(speed) {
  const value = clamp(Number(speed) || 1, 1, 4);
  setSpeedButtons(value);
  if (!services || !state.roomCode) return;
  await update(ref(services.db), {
    [`${ROOM_COLLECTION}/${state.roomCode}/speedMultiplier`]: value,
    [`${ROOM_COLLECTION}/${state.roomCode}/updatedAt`]: Date.now()
  });
}

function setSpeedButtons(speed) {
  ui.speedButtons.forEach((button) => {
    const active = Number(button.dataset.speed) === Number(speed || 1);
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function openDrawer(drawer) {
  closeDrawers();
  drawer.hidden = false;
}

function closeDrawer(drawer) {
  drawer.hidden = true;
}

function closeDrawers() {
  ui.buildDrawer.hidden = true;
  ui.upgradesDrawer.hidden = true;
}

function closeDrawerFromBackdrop(event) {
  if (event.target === event.currentTarget) closeDrawer(event.currentTarget);
}

function setupCameraInput() {
  canvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    zoomCamera(event.deltaY > 0 ? 0.9 : 1.1);
  }, { passive: false });

  canvas.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    cameraPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    renderCamera.dragging = true;
    renderCamera.dragX = event.clientX;
    renderCamera.dragY = event.clientY;
    if (cameraPointers.size >= 2) {
      renderCamera.dragging = false;
      renderCamera.pinchDistance = pointerDistance();
    }
    canvas.classList.add("is-camera-dragging");
    canvas.setPointerCapture?.(event.pointerId);
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!cameraPointers.has(event.pointerId)) return;
    cameraPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (cameraPointers.size >= 2) {
      const distance = pointerDistance();
      if (renderCamera.pinchDistance > 0 && distance > 0) {
        zoomCamera(distance / renderCamera.pinchDistance);
      }
      renderCamera.pinchDistance = distance;
      return;
    }
    if (!renderCamera.dragging) return;
    const dx = event.clientX - renderCamera.dragX;
    const dy = event.clientY - renderCamera.dragY;
    renderCamera.dragX = event.clientX;
    renderCamera.dragY = event.clientY;
    setFollowCamera(false);
    panCamera(-dx / renderCamera.zoom, -dy / renderCamera.zoom);
  });

  const stopCameraDrag = (event) => {
    cameraPointers.delete(event.pointerId);
    renderCamera.pinchDistance = 0;
    if (cameraPointers.size === 1) {
      const pointer = Array.from(cameraPointers.values())[0];
      renderCamera.dragging = true;
      renderCamera.dragX = pointer.x;
      renderCamera.dragY = pointer.y;
      return;
    }
    renderCamera.dragging = false;
    if (!cameraPointers.size) canvas.classList.remove("is-camera-dragging");
  };
  window.addEventListener("pointerup", stopCameraDrag);
  window.addEventListener("pointercancel", stopCameraDrag);
}

function pointerDistance() {
  const points = Array.from(cameraPointers.values());
  if (points.length < 2) return 0;
  return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
}

function loadAsset(src) {
  const image = new Image();
  image.decoding = "async";
  image.src = src;
  return image;
}

function setFollowCamera(enabled) {
  renderCamera.follow = enabled;
  ui.followButton.classList.toggle("is-active", enabled);
  ui.followButton.setAttribute("aria-pressed", enabled ? "true" : "false");
}

function focusFollowCamera() {
  setFollowCamera(true);
  renderCamera.zoom = FOLLOW_ZOOM;
  renderCamera.snap = true;
}

function zoomCamera(multiplier) {
  setFollowCamera(false);
  const before = screenToWorld(width / 2, height / 2);
  renderCamera.zoom = clamp(renderCamera.zoom * multiplier, MANUAL_ZOOM_MIN, MANUAL_ZOOM_MAX);
  renderCamera.x = before.x - width / 2 / renderCamera.zoom;
  renderCamera.y = before.y - height / 2 / renderCamera.zoom;
  settleCamera();
}

function panCamera(dx, dy) {
  renderCamera.x += dx;
  renderCamera.y += dy;
  settleCamera();
}

function screenToWorld(x, y) {
  return {
    x: renderCamera.x + x / renderCamera.zoom,
    y: renderCamera.y + y / renderCamera.zoom
  };
}

function settleCamera() {
  if (!Number.isFinite(renderCamera.x)) renderCamera.x = -width / 2 / Math.max(0.1, renderCamera.zoom);
  if (!Number.isFinite(renderCamera.y)) renderCamera.y = -height / 2 / Math.max(0.1, renderCamera.zoom);
  renderCamera.initialized = true;
}

function cleanName() {
  const name = ui.playerNameInput.value.trim().slice(0, 18) || `AI ${clientId.slice(0, 4)}`;
  localStorage.setItem("nightboundAutobattler.name", name);
  return name;
}

function makeRoomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "NB";
  for (let i = 0; i < 4; i += 1) code += alphabet[Math.floor(Math.random() * alphabet.length)];
  return code;
}

function makeStarField(count) {
  let seed = 917263;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  return Array.from({ length: count }, () => ({
    x: random() * 2200,
    y: random() * 1400,
    size: 0.8 + random() * 2.2,
    alpha: random() * 0.4,
    depth: 0.025 + random() * 0.12,
    phase: random() * TAU,
    color: random() > 0.78 ? "#d7b8ff" : random() > 0.55 ? "#9ff8ff" : "#ffffff"
  }));
}

function chunkKey(cx, cy) {
  return `${cx}:${cy}`;
}

function hashUnit(cx, cy, salt = 0) {
  let value = Math.imul(cx, 374761393) ^ Math.imul(cy, 668265263) ^ Math.imul(salt + 17, 2246822519);
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
}

function obstacleForChunk(cx, cy) {
  const key = chunkKey(cx, cy);
  if (obstacleCache.has(key)) return obstacleCache.get(key);
  if (Math.abs(cx) <= 1 && Math.abs(cy) <= 1) {
    obstacleCache.set(key, []);
    return [];
  }
  const roll = hashUnit(cx, cy, 1);
  if (roll > WORLD.obstacleChance) {
    obstacleCache.set(key, []);
    return [];
  }
  const kind = obstacleKinds[Math.floor(hashUnit(cx, cy, 2) * obstacleKinds.length) % obstacleKinds.length];
  const sizeRoll = hashUnit(cx, cy, 3);
  const radius = kind.radius[0] + (kind.radius[1] - kind.radius[0]) * sizeRoll;
  const margin = radius + 180;
  const span = WORLD.chunkSize - margin * 2;
  const x = cx * WORLD.chunkSize + margin + hashUnit(cx, cy, 4) * span;
  const y = cy * WORLD.chunkSize + margin + hashUnit(cx, cy, 5) * span;
  const obstacle = {
    id: `${kind.id}-${key}`,
    kind: kind.id,
    x,
    y,
    radius,
    color: kind.color,
    ring: kind.ring,
    ringed: kind.ringed,
    spin: hashUnit(cx, cy, 6) * TAU
  };
  obstacleCache.set(key, [obstacle]);
  return [obstacle];
}

function obstaclesInRect(left, top, right, bottom) {
  const margin = 420;
  const minX = Math.floor((left - margin) / WORLD.chunkSize);
  const maxX = Math.floor((right + margin) / WORLD.chunkSize);
  const minY = Math.floor((top - margin) / WORLD.chunkSize);
  const maxY = Math.floor((bottom + margin) / WORLD.chunkSize);
  const obstacles = [];
  for (let cx = minX; cx <= maxX; cx += 1) {
    for (let cy = minY; cy <= maxY; cy += 1) {
      obstacles.push(...obstacleForChunk(cx, cy));
    }
  }
  return obstacles;
}

function obstaclesNearPoint(x, y, radius = 0) {
  return obstaclesInRect(x - radius - 520, y - radius - 520, x + radius + 520, y + radius + 520);
}

function visibleObstacles(cam) {
  const viewWidth = width / cam.zoom;
  const viewHeight = height / cam.zoom;
  return obstaclesInRect(cam.x, cam.y, cam.x + viewWidth, cam.y + viewHeight);
}

function snapshotObstacles(sim) {
  const seen = new Map();
  sim.players.forEach((player) => {
    obstaclesNearPoint(player.x, player.y, 2200).forEach((obstacle) => seen.set(obstacle.id, obstacle));
  });
  return Array.from(seen.values()).slice(0, 24);
}

function insideObstacle(point, padding = 0) {
  return obstaclesNearPoint(point.x, point.y, padding).some((obstacle) => distance(point, obstacle) < obstacle.radius + padding);
}

function resolveObstacleCollision(entity, padding = 0) {
  obstaclesNearPoint(entity.x, entity.y, padding).forEach((obstacle) => {
    const dx = entity.x - obstacle.x;
    const dy = entity.y - obstacle.y;
    const d = Math.hypot(dx, dy) || 1;
    const minDistance = obstacle.radius + padding;
    if (d >= minDistance) return;
    const push = minDistance - d;
    entity.x += (dx / d) * push;
    entity.y += (dy / d) * push;
    if ("vx" in entity) entity.vx *= 0.45;
    if ("vy" in entity) entity.vy *= 0.45;
  });
}

function wrap(value, max) {
  return ((value % max) + max) % max;
}

async function createRoom() {
  if (!services) return setStatus("Firebase is not ready yet.");
  setStatus("Creating Firebase room...");
  const code = makeRoomCode();
  const player = makeRoomPlayer(cleanName(), 0);
  roomRef = ref(services.db, `${ROOM_COLLECTION}/${code}`);
  await update(ref(services.db), {
    [`${ROOM_COLLECTION}/${code}`]: {
    code,
    gameType: "nightbound-autobattler",
    hostId: clientId,
    status: "lobby",
    maxPlayers: 4,
    speedMultiplier: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    players: { [clientId]: player },
    snapshot: null,
    eventLog: [`${player.name} created room ${code}.`]
    }
  });
  connectRoom(code);
}

async function joinRoom() {
  if (!services) return setStatus("Firebase is not ready yet.");
  const code = ui.roomCodeInput.value.trim().toUpperCase();
  if (!code) return setStatus("Enter a room code first.");
  setStatus(`Joining room ${code}...`);
  const targetRef = ref(services.db, `${ROOM_COLLECTION}/${code}`);
  const snap = await get(targetRef);
  if (!snap.exists()) return setStatus("Room not found.");
  const room = snap.val();
  const players = room.players || {};
  if (!players[clientId] && Object.keys(players).length >= 4) return setStatus("That room already has 4 players.");
  const player = makeRoomPlayer(cleanName(), Object.keys(players).length);
  await update(ref(services.db), {
    [`${ROOM_COLLECTION}/${code}/players/${clientId}`]: Object.assign({}, players[clientId] || {}, player),
    [`${ROOM_COLLECTION}/${code}/updatedAt`]: Date.now()
  });
  roomRef = targetRef;
  connectRoom(code);
}

function makeRoomPlayer(name, index) {
  return {
    id: clientId,
    name,
    color: PLAYER_COLORS[index % PLAYER_COLORS.length],
    money: 0,
    lifetimeKills: 0,
    shop: {},
    joinedAt: Date.now()
  };
}

function connectRoom(code) {
  state.roomCode = code;
  ui.roomCodeInput.value = code;
  const url = new URL(location.href);
  url.searchParams.set("room", code);
  history.replaceState(null, "", url);
  if (unsubscribeRoom) unsubscribeRoom();
  roomRef = ref(services.db, `${ROOM_COLLECTION}/${code}`);
  unsubscribeRoom = onValue(roomRef, (snap) => {
    if (!snap.exists()) {
      setStatus("Room disappeared.");
      return;
    }
    state.remoteRoom = snap.val();
    state.isHost = state.remoteRoom.hostId === clientId;
    handleRoomUpdate();
  }, (error) => setStatus(error.message));
}

function handleRoomUpdate() {
  const room = state.remoteRoom;
  const players = sortedRoomPlayers(room);
  setSpeedButtons(room.speedMultiplier || 1);
  ui.startOverlay.hidden = room.status !== "lobby";
  ui.startButton.hidden = !state.isHost || room.status !== "lobby";
  setStatus(`Room ${room.code} · ${players.length}/4 players · ${state.isHost ? "you host the simulation" : "waiting for host"}`);
  renderPlayersList(players, room.hostId);

  if (room.status === "playing") {
    state.mode = "playing";
    ui.endOverlay.hidden = true;
    if (state.isHost && !state.sim) {
      startLocalSimulation(room);
    }
    if (state.isHost && state.sim) state.sim.speedMultiplier = room.speedMultiplier || 1;
    state.render = state.isHost ? state.sim : room.snapshot;
  } else if (room.status === "ended") {
    state.mode = "ended";
    state.render = room.snapshot;
    showEnd(room.snapshot);
  } else {
    state.mode = "lobby";
    state.render = room.snapshot;
  }

  updateHudFromSnapshot(state.render);
  updateShopFromRoom();
}

function sortedRoomPlayers(room) {
  return Object.values(room?.players || {}).sort((a, b) => (a.joinedAt || 0) - (b.joinedAt || 0));
}

function renderPlayersList(players, hostId) {
  ui.playersList.innerHTML = "";
  players.forEach((player) => {
    const row = document.createElement("div");
    row.innerHTML = `<strong style="color:${player.color}">${player.name}</strong><span>${player.id === hostId ? "Host" : "Joined"}</span>`;
    ui.playersList.appendChild(row);
  });
}

async function startMatch() {
  if (!state.isHost || !state.remoteRoom) return;
  startLocalSimulation(state.remoteRoom);
  await update(ref(services.db), {
    [`${ROOM_COLLECTION}/${state.roomCode}/status`]: "playing",
    [`${ROOM_COLLECTION}/${state.roomCode}/startedAt`]: Date.now(),
    [`${ROOM_COLLECTION}/${state.roomCode}/snapshot`]: compactSnapshot(state.sim),
    [`${ROOM_COLLECTION}/${state.roomCode}/eventLog`]: [`Room ${state.roomCode} started with ${state.sim.players.length} AI survivors.`],
    [`${ROOM_COLLECTION}/${state.roomCode}/updatedAt`]: Date.now()
  });
}

function startLocalSimulation(room) {
  state.sim = makeSimulation(room);
  state.render = state.sim;
  ui.endOverlay.hidden = true;
  ui.bossBanner.hidden = true;
}

function makeSimulation(room) {
  const roomPlayers = sortedRoomPlayers(room).slice(0, 4);
  const playerCount = Math.max(1, roomPlayers.length);
  const players = roomPlayers.map((roomPlayer, index) => makeFighter(roomPlayer, index, playerCount));
  const sim = {
    elapsed: 0,
    status: "playing",
    level: 1,
    xp: 0,
    xpNeeded: scaledXpNeeded(1, playerCount),
    kills: 0,
    runMoney: 0,
    players,
    enemies: [],
    projectiles: [],
    enemyShots: [],
    pulses: [],
    gems: [],
    pickups: [],
    particles: [],
    bossesSeen: [],
    eventLog: [`Shared XP enabled for ${playerCount} AI survivor${playerCount === 1 ? "" : "s"}.`],
    spawnBudget: 0,
    draftTimer: 0,
    draftChoices: null,
    playerCount,
    speedMultiplier: room.speedMultiplier || 1
  };
  for (let i = 0; i < 18 + playerCount * 8; i += 1) spawnEnemy(sim, "starMite");
  return sim;
}

function makeFighter(roomPlayer, index, playerCount) {
  const shop = roomPlayer.shop || {};
  const angle = (index / playerCount) * TAU;
  const fighter = {
    id: roomPlayer.id,
    name: roomPlayer.name,
    color: roomPlayer.color || PLAYER_COLORS[index % PLAYER_COLORS.length],
    x: Math.cos(angle) * 90,
    y: Math.sin(angle) * 90,
    vx: 0,
    vy: 0,
    steerX: 0,
    steerY: 0,
    radius: 17,
    speed: 132 + shopLevel(shop, "speed") * 6,
    health: 100 + shopLevel(shop, "health") * 14,
    maxHealth: 100 + shopLevel(shop, "health") * 14,
    regen: 0.55 + shopLevel(shop, "regen") * 0.22,
    pickup: 86 + shopLevel(shop, "magnet") * 22,
    hurtTimer: 0,
    angle: 0,
    alive: true,
    shield: shopLevel(shop, "aegis") > 0 ? 1 : 0,
    money: roomPlayer.money || 0,
    lifetimeKills: roomPlayer.lifetimeKills || 0,
    shop,
    upgrades: [],
    weapons: {
      orbit: cloneWeapon("orbit"),
      crossbow: cloneWeapon("crossbow"),
      sigil: cloneWeapon("sigil"),
      bats: cloneWeapon("bats")
    }
  };
  if (shopLevel(shop, "startSigil") > 0) fighter.weapons.sigil.level = 1;
  if (shopLevel(shop, "startBats") > 0) fighter.weapons.bats.level = 1;
  if (shopLevel(shop, "extraBolt") > 0) fighter.weapons.crossbow.count += 1;
  const damageMultiplier = 1 + shopLevel(shop, "damage") * 0.08;
  Object.values(fighter.weapons).forEach((weapon) => {
    if (typeof weapon.damage === "number") weapon.damage = Math.round(weapon.damage * damageMultiplier);
  });
  return fighter;
}

function shopLevel(shop, id) {
  return Number(shop[id] || 0);
}

function scaledXpNeeded(level, playerCount) {
  return Math.round((8 + level * 5.4 + level ** 1.25) * (1 + (playerCount - 1) * 0.68));
}

function loop(now) {
  const dt = Math.min(0.05, (now - lastFrame) / 1000);
  lastFrame = now;
  if (state.isHost && state.sim && state.remoteRoom?.status === "playing") {
    updateSimulation(state.sim, dt * 1.18 * clamp(state.remoteRoom?.speedMultiplier || 1, 1, 4));
    state.render = state.sim;
    maybePublishSnapshot();
  }
  updateEffects(dt);
  draw();
  requestAnimationFrame(loop);
}

function updateSimulation(sim, dt) {
  if (sim.status !== "playing") return;
  sim.elapsed += dt;
  if (sim.draftTimer > 0) {
    sim.draftTimer -= dt;
    if (sim.draftTimer <= 0) applyTeamDraft(sim);
    return;
  }
  if (sim.elapsed >= RUN_DURATION) return endSimulation(sim, true);
  updatePlayers(sim, dt);
  updateDirector(sim, dt);
  updateWeapons(sim, dt);
  updateProjectiles(sim, dt);
  updateEnemies(sim, dt);
  updateGems(sim, dt);
  updatePickups(sim, dt);
  updateSimParticles(sim, dt);
  cleanupDistantEntities(sim);
  if (!sim.players.some((player) => player.alive)) endSimulation(sim, false);
}

function updatePlayers(sim, dt) {
  sim.players.forEach((player) => {
    if (!player.alive) return;
    const move = aiMove(sim, player);
    const targetVx = move.moving ? move.x * player.speed : 0;
    const targetVy = move.moving ? move.y * player.speed : 0;
    const accel = 1 - Math.exp(-dt * 4.2);
    player.vx += (targetVx - player.vx) * accel;
    player.vy += (targetVy - player.vy) * accel;
    player.x += player.vx * dt;
    player.y += player.vy * dt;
    resolveObstacleCollision(player, player.radius + 6);
    if (Math.hypot(player.vx, player.vy) > 4) {
      player.angle = Math.atan2(player.vy, player.vx);
    }
    player.hurtTimer = Math.max(0, player.hurtTimer - dt);
    player.health = Math.min(player.maxHealth, player.health + player.regen * dt);
  });
}

function aiMove(sim, player) {
  let x = 0;
  let y = 0;
  let closeThreats = 0;
  let nearest = null;
  let nearestDistance = Infinity;
  sim.enemies.forEach((enemy) => {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const d = Math.hypot(dx, dy) || 1;
    if (d < nearestDistance) {
      nearest = enemy;
      nearestDistance = d;
    }
    if (d < 300) {
      const pressure = (300 - d) / 300;
      x += (dx / d) * pressure * (enemy.boss ? 2.45 : 1.72);
      y += (dy / d) * pressure * (enemy.boss ? 2.45 : 1.72);
      closeThreats += 1;
    }
  });

  const gem = bestGemTarget(sim, player);
  if (gem && (closeThreats < 4 || distance(player, gem) < player.pickup * 1.45)) {
    const dx = gem.x - player.x;
    const dy = gem.y - player.y;
    const d = Math.hypot(dx, dy) || 1;
    x += (dx / d) * 0.82;
    y += (dy / d) * 0.82;
  } else if (nearest && nearestDistance > 380) {
    const dx = nearest.x - player.x;
    const dy = nearest.y - player.y;
    const d = Math.hypot(dx, dy) || 1;
    x += (dx / d) * 0.42;
    y += (dy / d) * 0.42;
  }

  const pack = playerPackCenter(sim, player);
  if (pack) {
    const dx = pack.x - player.x;
    const dy = pack.y - player.y;
    const d = Math.hypot(dx, dy) || 1;
    if (d > 520) {
      x += (dx / d) * 0.28;
      y += (dy / d) * 0.28;
    }
  }
  const length = Math.hypot(x, y) || 1;
  const desiredX = x / length;
  const desiredY = y / length;
  const steerBlend = 0.08;
  player.steerX += (desiredX - player.steerX) * steerBlend;
  player.steerY += (desiredY - player.steerY) * steerBlend;
  const steerLength = Math.hypot(player.steerX, player.steerY) || 1;
  return {
    x: player.steerX / steerLength,
    y: player.steerY / steerLength,
    moving: Math.abs(x) + Math.abs(y) > 0.08
  };
}

function playerPackCenter(sim, current) {
  const allies = sim.players.filter((player) => player.alive && player.id !== current.id);
  if (!allies.length) return null;
  return {
    x: allies.reduce((sum, player) => sum + player.x, 0) / allies.length,
    y: allies.reduce((sum, player) => sum + player.y, 0) / allies.length
  };
}

function bestGemTarget(sim, player) {
  let best = null;
  let score = -Infinity;
  sim.gems.forEach((gem) => {
    const next = gem.value * 18 - distance(player, gem);
    if (next > score) {
      score = next;
      best = gem;
    }
  });
  return best;
}

function updateDirector(sim, dt) {
  const minute = sim.elapsed / 60;
  const scale = 1 + (sim.playerCount - 1) * 0.55;
  sim.spawnBudget += dt * (1.55 + minute * 1.12) * scale;
  const cap = Math.min(310, 72 + minute * 30 + (sim.playerCount - 1) * 30);
  while (sim.spawnBudget >= 1 && sim.enemies.length < cap) {
    sim.spawnBudget -= 1;
    spawnEnemy(sim, chooseEnemyType(minute));
  }
  bossSchedule.forEach((boss) => {
    if (sim.elapsed >= boss.at && !sim.bossesSeen.includes(boss.name)) {
      sim.bossesSeen.push(boss.name);
      spawnEnemy(sim, "boss", boss.name);
      sim.eventLog.unshift(`${boss.name} entered the room.`);
    }
  });
}

function chooseEnemyType(minute) {
  const candidates = [
    ["starMite", Math.max(0.04, 1.35 - minute * 0.24)],
    ["voidBat", minute > 0.45 ? Math.max(0.08, 0.86 - Math.max(0, minute - 4) * 0.16) : 0],
    ["spaceRat", minute > 0.9 ? Math.max(0.16, 0.68 - Math.max(0, minute - 5.5) * 0.09) : 0],
    ["crystalKnight", minute > 1.7 ? 0.26 + minute * 0.045 : 0],
    ["plasmaCultist", minute > 2.25 ? 0.24 + minute * 0.055 : 0],
    ["novaShade", minute > 3.1 ? 0.18 + minute * 0.07 : 0]
  ];
  const total = candidates.reduce((sum, item) => sum + item[1], 0);
  let roll = Math.random() * total;
  for (const [kind, weight] of candidates) {
    roll -= weight;
    if (roll <= 0) return kind;
  }
  return "starMite";
}

function spawnEnemy(sim, kind, bossName) {
  const base = enemyTypes[kind];
  const minute = sim.elapsed / 60;
  const hpScale = 1 + minute * 0.2 + (sim.playerCount - 1) * 0.45;
  const point = spawnPoint(sim, kind === "boss" ? 190 : 115);
  sim.enemies.push({
    id: `${Date.now()}-${Math.random()}`,
    x: point.x,
    y: point.y,
    vx: 0,
    vy: 0,
    radius: base.radius,
    kind,
    name: bossName || base.name,
    hp: Math.round(base.hp * hpScale * (kind === "boss" ? 1.6 + sim.playerCount * 0.35 : 1)),
    maxHp: Math.round(base.hp * hpScale * (kind === "boss" ? 1.6 + sim.playerCount * 0.35 : 1)),
    speed: base.speed * (1 + Math.min(0.28, minute * 0.025)),
    touchTimer: 0,
    shotTimer: 1.2 + Math.random(),
    swim: Math.random() * TAU,
    flash: 0,
    boss: kind === "boss",
    color: base.color,
    xp: base.xp,
    damage: base.damage,
    ranged: base.ranged,
    explodes: base.explodes,
    swims: base.swims,
    dead: false
  });
}

function spawnPoint(sim, margin) {
  const targets = sim.players.filter((player) => player.alive);
  const fallback = targets[0] || sim.players[0] || { x: 0, y: 0 };
  for (let tries = 0; tries < 18; tries += 1) {
    const target = targets[Math.floor(Math.random() * targets.length)] || fallback;
    const angle = Math.random() * TAU;
    const distance = WORLD.spawnMin + margin + Math.random() * (WORLD.spawnMax - WORLD.spawnMin);
    const point = {
      x: target.x + Math.cos(angle) * distance,
      y: target.y + Math.sin(angle) * distance
    };
    if (!insideObstacle(point, 80)) return point;
  }
  return {
    x: fallback.x + (Math.random() - 0.5) * 900,
    y: fallback.y + (Math.random() - 0.5) * 900
  };
}

function updateWeapons(sim, dt) {
  sim.players.forEach((player) => {
    if (!player.alive) return;
    updateCrossbow(sim, player, dt);
    updateBats(sim, player, dt);
    updateSigil(sim, player, dt);
    updateOrbit(sim, player, dt);
  });
}

function updateCrossbow(sim, player, dt) {
  const weapon = player.weapons.crossbow;
  weapon.cooldown -= dt;
  if (weapon.cooldown > 0) return;
  for (let i = 0; i < weapon.count; i += 1) {
    const target = nearestEnemy(sim, player, 760);
    const angle = target ? angleTo(player, target) + (i - (weapon.count - 1) / 2) * 0.14 : player.angle;
    sim.projectiles.push({
      ownerId: player.id,
      x: player.x,
      y: player.y,
      vx: Math.cos(angle) * weapon.speed,
      vy: Math.sin(angle) * weapon.speed,
      radius: 5,
      damage: weapon.damage,
      pierce: 1 + Math.floor(weapon.level / 4),
      life: 1.75,
      color: weapon.color,
      hit: []
    });
  }
  weapon.cooldown = Math.max(0.24, weapon.delay);
}

function updateBats(sim, player, dt) {
  const weapon = player.weapons.bats;
  if (weapon.level <= 0) return;
  weapon.cooldown -= dt;
  if (weapon.cooldown > 0) return;
  for (let i = 0; i < weapon.count; i += 1) {
    const angle = player.angle + (Math.random() - 0.5) * 1.4;
    sim.projectiles.push({
      ownerId: player.id,
      x: player.x,
      y: player.y,
      vx: Math.cos(angle) * weapon.speed,
      vy: Math.sin(angle) * weapon.speed,
      radius: 7,
      damage: weapon.damage,
      pierce: 2,
      life: 3.2,
      color: weapon.color,
      hit: [],
      homing: true
    });
  }
  weapon.cooldown = Math.max(0.32, weapon.delay);
}

function updateSigil(sim, player, dt) {
  const weapon = player.weapons.sigil;
  if (weapon.level <= 0) return;
  weapon.cooldown -= dt;
  if (weapon.cooldown > 0) return;
  sim.pulses.push({
    ownerId: player.id,
    x: player.x,
    y: player.y,
    radius: 18,
    maxRadius: weapon.radius,
    life: 0.62,
    age: 0,
    damage: weapon.damage,
    color: weapon.color,
    hit: []
  });
  weapon.cooldown = Math.max(0.8, weapon.delay);
}

function updateOrbit(sim, player, dt) {
  const weapon = player.weapons.orbit;
  const time = sim.elapsed * (1.8 + weapon.level * 0.08);
  sim.enemies.forEach((enemy) => {
    enemy.orbitTimers = enemy.orbitTimers || {};
    enemy.orbitTimers[player.id] = Math.max(0, (enemy.orbitTimers[player.id] || 0) - dt);
    for (let i = 0; i < weapon.count; i += 1) {
      const angle = time + (i / weapon.count) * TAU;
      const blade = { x: player.x + Math.cos(angle) * weapon.radius, y: player.y + Math.sin(angle) * weapon.radius };
      if (enemy.orbitTimers[player.id] <= 0 && distance(blade, enemy) < enemy.radius + 18) {
        damageEnemy(sim, enemy, weapon.damage, player.id);
        enemy.orbitTimers[player.id] = 0.38;
      }
    }
  });
}

function updateProjectiles(sim, dt) {
  sim.projectiles.forEach((shot) => {
    if (shot.homing) {
      const target = nearestEnemy(sim, shot, 460);
      if (target) {
        const desired = angleTo(shot, target);
        const current = Math.atan2(shot.vy, shot.vx);
        const delta = Math.atan2(Math.sin(desired - current), Math.cos(desired - current));
        const next = current + clamp(delta, -7.2 * dt, 7.2 * dt);
        const speed = Math.hypot(shot.vx, shot.vy);
        shot.vx = Math.cos(next) * speed;
        shot.vy = Math.sin(next) * speed;
      }
    }
    shot.x += shot.vx * dt;
    shot.y += shot.vy * dt;
    shot.life -= dt;
    if (insideObstacle(shot, shot.radius + 2)) {
      shot.life = -1;
      addBurst(sim, shot.x, shot.y, shot.color, 4, 0.42);
      return;
    }
    sim.enemies.forEach((enemy) => {
      if (enemy.dead || shot.hit.includes(enemy.id)) return;
      if (distance(shot, enemy) < shot.radius + enemy.radius) {
        shot.hit.push(enemy.id);
        shot.pierce -= 1;
        damageEnemy(sim, enemy, shot.damage, shot.ownerId);
        addBurst(sim, enemy.x, enemy.y, shot.color, 3, 0.34);
        if (shot.pierce <= 0) shot.life = -1;
      }
    });
  });
  sim.projectiles = sim.projectiles.filter((shot) => shot.life > 0);

  sim.pulses.forEach((pulse) => {
    pulse.age += dt;
    pulse.radius = pulse.maxRadius * easeOut(pulse.age / pulse.life);
    sim.enemies.forEach((enemy) => {
      if (enemy.dead || pulse.hit.includes(enemy.id)) return;
      if (distance(pulse, enemy) < pulse.radius + enemy.radius * 0.5) {
        pulse.hit.push(enemy.id);
        damageEnemy(sim, enemy, pulse.damage, pulse.ownerId);
      }
    });
  });
  sim.pulses = sim.pulses.filter((pulse) => pulse.age < pulse.life);
}

function updateEnemies(sim, dt) {
  sim.enemies.forEach((enemy) => {
    if (enemy.dead) return;
    enemy.flash = Math.max(0, enemy.flash - dt * 8);
    enemy.touchTimer = Math.max(0, enemy.touchTimer - dt);
    const target = nearestAlivePlayer(sim, enemy);
    if (!target) return;
    const a = angleTo(enemy, target);
    const d = distance(enemy, target);
    const desiredDistance = enemy.ranged ? 245 : 0;
    const direction = d < desiredDistance ? -1 : 1;
    const wobble = enemy.swims ? Math.sin(sim.elapsed * 4.1 + enemy.swim) * 0.62 : 0;
    enemy.vx = Math.cos(a + wobble) * enemy.speed * direction;
    enemy.vy = Math.sin(a + wobble) * enemy.speed * direction;
    enemy.x += enemy.vx * dt;
    enemy.y += enemy.vy * dt;
    resolveObstacleCollision(enemy, enemy.radius + 8);
    if (enemy.explodes && d < enemy.radius + target.radius + 8) {
      hurtPlayer(sim, target, enemy.damage);
      enemy.dead = true;
    } else if (d < enemy.radius + target.radius && enemy.touchTimer <= 0) {
      hurtPlayer(sim, target, enemy.damage);
      enemy.touchTimer = 0.62;
    }
  });
}

function cleanupDistantEntities(sim) {
  sim.enemies = sim.enemies.filter((enemy) => !enemy.dead && (enemy.boss || isNearAnyPlayer(sim, enemy, WORLD.despawnEnemy)));
  sim.gems = sim.gems.filter((gem) => gem.vacuum || isNearAnyPlayer(sim, gem, WORLD.despawnLoot)).slice(-260);
  sim.pickups = sim.pickups.filter((pickup) => isNearAnyPlayer(sim, pickup, WORLD.despawnLoot)).slice(-32);
}

function isNearAnyPlayer(sim, entity, range) {
  return sim.players.some((player) => player.alive && distance(player, entity) <= range);
}

function updateGems(sim, dt) {
  sim.gems.forEach((gem) => {
    gem.spin += dt * 4;
    const player = nearestAlivePlayer(sim, gem);
    if (!player) return;
    const d = distance(gem, player);
    if (d < player.pickup) gem.magnet = true;
    if (gem.magnet) {
      const a = angleTo(gem, player);
      const speed = gem.vacuum ? 980 : 290 + (player.pickup - Math.min(player.pickup, d)) * 8;
      gem.x += Math.cos(a) * speed * dt;
      gem.y += Math.sin(a) * speed * dt;
    }
    if (d < player.radius + gem.radius + 4) {
      gainSharedXp(sim, gem.value);
      gem.collected = true;
    }
  });
  sim.gems = sim.gems.filter((gem) => !gem.collected);
}

function updatePickups(sim, dt) {
  sim.pickups.forEach((pickup) => {
    pickup.spin += dt * 2.2;
    pickup.life -= dt;
    const player = nearestAlivePlayer(sim, pickup);
    if (!player) return;
    if (distance(player, pickup) < player.radius + pickup.radius + 6) {
      if (pickup.kind === "vacuum") activateVacuum(sim, player);
      pickup.collected = true;
    }
  });
  sim.pickups = sim.pickups.filter((pickup) => !pickup.collected && pickup.life > 0);
}

function activateVacuum(sim, player) {
  sim.gems.forEach((gem) => {
    gem.magnet = true;
    gem.vacuum = true;
  });
  addBurst(sim, player.x, player.y, "#74f7ff", 38, 1.1);
  sim.eventLog.unshift(`${player.name} triggered a vacuum surge.`);
}

function updateSimParticles(sim, dt) {
  sim.particles.forEach((particle) => {
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.life -= dt;
    particle.age += dt;
  });
  sim.particles = sim.particles.filter((particle) => particle.life > 0).slice(-180);
}

function addBurst(sim, x, y, color, count, life) {
  if (!sim?.particles) return;
  for (let i = 0; i < count && sim.particles.length < 220; i += 1) {
    const angle = Math.random() * TAU;
    const speed = 45 + Math.random() * 170;
    sim.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 2 + Math.random() * 4,
      color,
      life: life * (0.55 + Math.random() * 0.65),
      age: 0
    });
  }
}

function gainSharedXp(sim, amount) {
  sim.xp += amount;
  if (sim.xp >= sim.xpNeeded && sim.draftTimer <= 0) {
    sim.xp -= sim.xpNeeded;
    sim.level += 1;
    sim.xpNeeded = scaledXpNeeded(sim.level, sim.playerCount);
    openSharedDraft(sim);
  }
}

function openSharedDraft(sim) {
  sim.draftTimer = 0.42;
  sim.draftChoices = {};
  sim.players.forEach((player) => {
    if (!player.alive) return;
    sim.draftChoices[player.id] = draftUpgrades(player).sort((a, b) => scoreUpgrade(player, b, sim) - scoreUpgrade(player, a, sim))[0];
  });
  sim.eventLog.unshift(`Level ${sim.level}: all AIs draft together.`);
}

function applyTeamDraft(sim) {
  Object.entries(sim.draftChoices || {}).forEach(([playerId, choice]) => {
    const player = sim.players.find((item) => item.id === playerId);
    if (!player || !choice) return;
    choice.apply(player);
    player.upgrades.push(choice.title);
    sim.eventLog.unshift(`${player.name} drafted ${choice.title}.`);
  });
  sim.draftChoices = null;
}

function draftUpgrades(player) {
  return [
    { title: "Blood Orbit", apply: (p) => { const w = p.weapons.orbit; w.level += 1; w.damage += 7; w.radius += 5; if (w.level % 2 === 0) w.count += 1; } },
    { title: "Moonshot Crossbow", apply: (p) => { const w = p.weapons.crossbow; w.level += 1; w.damage += 8; w.delay *= 0.88; if (w.level % 3 === 0) w.count += 1; } },
    { title: "Gravefire Sigil", apply: (p) => { const w = p.weapons.sigil; w.level += 1; w.damage += 10; w.radius += 16; w.delay *= 0.88; } },
    { title: "Bat Swarm", apply: (p) => { const w = p.weapons.bats; w.level += 1; w.damage += 5; w.delay *= 0.9; if (w.level % 2 === 0) w.count += 1; } },
    { title: "Crimson Heart", apply: (p) => { p.maxHealth += 22; p.health = Math.min(p.maxHealth, p.health + 38); } },
    { title: "Velvet Thirst", apply: (p) => { p.regen += 0.45; } },
    { title: "Magnet Moon", apply: (p) => { p.pickup += 34; } },
    { title: "Silver Boots", apply: (p) => { p.speed += 20; } }
  ].sort(() => Math.random() - 0.5).slice(0, 3);
}

function scoreUpgrade(player, choice, sim) {
  const healthRatio = player.health / player.maxHealth;
  const scores = {
    "Moonshot Crossbow": 96 + sim.elapsed / 18,
    "Blood Orbit": sim.enemies.length > 34 ? 110 : 78,
    "Gravefire Sigil": player.weapons.sigil.level ? 88 : 104,
    "Bat Swarm": player.weapons.bats.level ? 82 : 98,
    "Crimson Heart": healthRatio < 0.55 ? 125 : 48,
    "Velvet Thirst": healthRatio < 0.72 ? 76 : 42,
    "Magnet Moon": sim.gems.length > 18 ? 92 : 45,
    "Silver Boots": sim.elapsed > 180 ? 88 : 54
  };
  return (scores[choice.title] || 0) + Math.random() * 8;
}

function hurtPlayer(sim, player, amount) {
  if (player.hurtTimer > 0 || !player.alive) return;
  if (player.shield > 0) {
    player.shield -= 1;
    player.hurtTimer = 0.5;
    sim.eventLog.unshift(`${player.name}'s aegis blocked a hit.`);
    return;
  }
  player.health -= amount;
  player.hurtTimer = 0.42;
  if (player.health <= 0) {
    player.health = 0;
    player.alive = false;
    sim.eventLog.unshift(`${player.name} fell.`);
  }
}

function damageEnemy(sim, enemy, amount, ownerId) {
  enemy.hp -= amount;
  enemy.lastHitBy = ownerId;
  enemy.flash = 1;
  if (enemy.hp <= 0 && !enemy.dead) killEnemy(sim, enemy, ownerId);
}

function killEnemy(sim, enemy, ownerId) {
  enemy.dead = true;
  sim.kills += enemy.boss ? 8 : 1;
  sim.runMoney += earnMoney(enemy, sim.playerCount);
  const earner = sim.players.find((player) => player.id === ownerId) || nearestAlivePlayer(sim, enemy);
  if (earner) {
    const money = earnMoney(enemy, sim.playerCount, earner);
    earner.money += money;
    earner.lifetimeKills += enemy.boss ? 8 : 1;
  }
  sim.gems.push({ x: enemy.x, y: enemy.y, value: enemy.xp, radius: enemy.boss ? 7 : 4.5 + Math.min(2.5, enemy.xp * 0.35), spin: Math.random() * TAU, magnet: false });
  if (enemy.boss) sim.gems.push({ x: enemy.x + 28, y: enemy.y, value: Math.floor(enemy.xp * 0.65), radius: 8, spin: 0, magnet: false });
  const vacuumChance = enemy.boss ? 0.38 : enemy.kind === "novaShade" ? 0.014 : 0.006;
  if (Math.random() < vacuumChance) {
    sim.pickups.push({ kind: "vacuum", x: enemy.x, y: enemy.y, radius: 13, spin: Math.random() * TAU, life: 18 });
  }
  addBurst(sim, enemy.x, enemy.y, enemy.color, enemy.boss ? 24 : 7, enemy.boss ? 0.9 : 0.48);
}

function earnMoney(enemy, playerCount, player) {
  const base = enemy.boss ? 45 : enemy.xp + 2;
  const income = player ? shopLevel(player.shop, "income") * 0.1 : 0;
  return Math.max(1, Math.round(base * (1 + income) * (1 + (playerCount - 1) * 0.18)));
}

function endSimulation(sim, won) {
  sim.status = won ? "victory" : "ended";
  sim.eventLog.unshift(won ? "The room survived until dawn." : "The room wiped. Auto-shop is spending and resetting.");
  autoBuyForPlayers(sim);
  publishEnded(sim, won);
}

function autoBuyForPlayers(sim) {
  sim.players.forEach((player) => {
    for (let guard = 0; guard < 10; guard += 1) {
      const affordable = shopCatalog
        .filter((item) => shopLevel(player.shop, item.id) < item.max && shopCost(player.shop, item) <= player.money)
        .sort((a, b) => shopPriority(player, b, sim) - shopPriority(player, a, sim));
      if (!affordable.length) break;
      const item = affordable[0];
      player.money -= shopCost(player.shop, item);
      player.shop[item.id] = shopLevel(player.shop, item.id) + 1;
      sim.eventLog.unshift(`${player.name} bought ${item.name}.`);
    }
  });
}

async function publishEnded(sim, won) {
  if (!state.isHost || !roomRef) return;
  const playersUpdate = {};
  sim.players.forEach((player) => {
    playersUpdate[`${ROOM_COLLECTION}/${state.roomCode}/players/${player.id}/money`] = Math.round(player.money);
    playersUpdate[`${ROOM_COLLECTION}/${state.roomCode}/players/${player.id}/lifetimeKills`] = player.lifetimeKills;
    playersUpdate[`${ROOM_COLLECTION}/${state.roomCode}/players/${player.id}/shop`] = player.shop;
  });
  await update(ref(services.db), Object.assign(playersUpdate, {
    [`${ROOM_COLLECTION}/${state.roomCode}/status`]: "lobby",
    [`${ROOM_COLLECTION}/${state.roomCode}/snapshot`]: compactSnapshot(sim),
    [`${ROOM_COLLECTION}/${state.roomCode}/lastResult`]: won ? "victory" : "wipe",
    [`${ROOM_COLLECTION}/${state.roomCode}/eventLog`]: sim.eventLog.slice(0, 8),
    [`${ROOM_COLLECTION}/${state.roomCode}/updatedAt`]: Date.now()
  }));
  state.sim = null;
  setTimeout(() => {
    if (state.isHost && state.remoteRoom?.status === "lobby") {
      startMatch().catch((error) => setStatus(error.message));
    }
  }, 2200);
}

function shopCost(shop, item) {
  return Math.round(item.base * Math.pow(item.scale, shopLevel(shop, item.id)));
}

function shopPriority(player, item, sim) {
  const level = shopLevel(player.shop, item.id);
  const pressure = sim.elapsed / RUN_DURATION;
  const scores = {
    startSigil: level ? 0 : 140,
    startBats: level ? 0 : 132,
    damage: 118 + pressure * 34 - level * 2,
    health: player.health < player.maxHealth * 0.55 ? 130 : 90 - level,
    income: 112 - level * 4,
    extraBolt: level ? 0 : 104,
    speed: 76 + pressure * 28,
    magnet: sim.level < 8 ? 84 : 68,
    regen: 74,
    aegis: level ? 0 : 82
  };
  return (scores[item.id] || 0) - shopCost(player.shop, item) / 22;
}

function maybePublishSnapshot() {
  const now = performance.now();
  if (!roomRef || now - state.lastSnapshotWrite < 260) return;
  state.lastSnapshotWrite = now;
  update(ref(services.db), {
    [`${ROOM_COLLECTION}/${state.roomCode}/snapshot`]: compactSnapshot(state.sim),
    [`${ROOM_COLLECTION}/${state.roomCode}/eventLog`]: state.sim.eventLog.slice(0, 8),
    [`${ROOM_COLLECTION}/${state.roomCode}/updatedAt`]: Date.now()
  }).catch(() => {});
}

function compactSnapshot(sim) {
  if (!sim) return null;
  return {
    elapsed: sim.elapsed,
    status: sim.status,
    level: sim.level,
    xp: sim.xp,
    xpNeeded: sim.xpNeeded,
    kills: sim.kills,
    runMoney: sim.runMoney,
    draftTimer: sim.draftTimer,
    playerCount: sim.playerCount,
    speedMultiplier: sim.speedMultiplier || 1,
    obstacles: snapshotObstacles(sim),
    players: sim.players.map((player) => ({
      id: player.id,
      name: player.name,
      color: player.color,
      x: player.x,
      y: player.y,
      vx: player.vx || 0,
      vy: player.vy || 0,
      health: player.health,
      maxHealth: player.maxHealth,
      alive: player.alive,
      money: player.money,
      lifetimeKills: player.lifetimeKills,
      upgrades: player.upgrades.slice(-24),
      weapons: summarizeWeapons(player.weapons)
    })),
    enemies: sim.enemies.slice(0, 220).map((enemy) => ({ x: enemy.x, y: enemy.y, radius: enemy.radius, color: enemy.color, boss: enemy.boss, kind: enemy.kind, name: enemy.name, swim: enemy.swim, flash: enemy.flash, hp: enemy.hp, maxHp: enemy.maxHp })),
    gems: sim.gems.slice(0, 120).map((gem) => ({ x: gem.x, y: gem.y, radius: gem.radius, value: gem.value })),
    pickups: sim.pickups.slice(0, 30).map((pickup) => ({ kind: pickup.kind, x: pickup.x, y: pickup.y, radius: pickup.radius, spin: pickup.spin })),
    projectiles: sim.projectiles.slice(0, 140).map((shot) => ({ x: shot.x, y: shot.y, radius: shot.radius, color: shot.color })),
    pulses: sim.pulses.map((pulse) => ({ x: pulse.x, y: pulse.y, radius: pulse.radius, color: pulse.color, age: pulse.age, life: pulse.life })),
    particles: sim.particles.slice(-120).map((particle) => ({ x: particle.x, y: particle.y, radius: particle.radius, color: particle.color, life: particle.life, age: particle.age })),
    eventLog: sim.eventLog.slice(0, 8)
  };
}

function summarizeWeapons(weapons) {
  return Object.fromEntries(Object.entries(weapons).map(([key, weapon]) => [key, { key, name: weapon.name, color: weapon.color, level: weapon.level, count: weapon.count || 0, description: weapon.description }]));
}

function updateHudFromSnapshot(snapshot) {
  if (!snapshot) {
    ui.level.textContent = "1";
    ui.kills.textContent = "0";
    ui.xpFill.style.width = "0%";
    ui.buildList.innerHTML = `<p class="empty-state">Waiting for a room.</p>`;
    return;
  }
  ui.level.textContent = snapshot.level.toString();
  ui.kills.textContent = snapshot.kills.toString();
  ui.xpFill.style.width = `${clamp(snapshot.xp / snapshot.xpNeeded, 0, 1) * 100}%`;
  ui.strategy.textContent = snapshot.draftTimer > 0 ? "Shared XP level-up: every AI is drafting at super speed." : "Host is simulating the room and streaming the fight.";
  updateLoadout(snapshot);
  renderEventLog(snapshot.eventLog || []);
}

function updateLoadout(snapshot) {
  ui.buildList.innerHTML = "";
  snapshot.players.forEach((player) => {
    const panel = document.createElement("article");
    panel.className = "build-card";
    panel.style.borderColor = player.color;
    const health = `${Math.ceil(player.health)} / ${Math.ceil(player.maxHealth)}`;
    panel.innerHTML = `<header><div><span>${player.alive ? "Online" : "Down"}</span><strong>${player.name}</strong></div><b>${health}</b></header>`;
    const weapons = document.createElement("div");
    weapons.className = "build-chips";
    Object.values(player.weapons || {}).forEach((weapon) => {
      if (weapon.level <= 0) return;
      const chip = document.createElement("div");
      chip.className = "weapon-chip";
      const canvas = document.createElement("canvas");
      canvas.className = "card-art";
      canvas.width = 150;
      canvas.height = 86;
      chip.appendChild(canvas);
      const body = document.createElement("div");
      body.innerHTML = `<strong>${weapon.name}</strong><span>Rank ${weapon.level}${weapon.count ? ` · ${weapon.count}x` : ""}</span><p>${weapon.description || weaponCatalog[weapon.key]?.description || "A strange cosmic weapon."}</p>`;
      chip.appendChild(body);
      drawCardArt(canvas, weapon.key || weapon.name, weapon.color || player.color);
      weapons.appendChild(chip);
    });
    panel.appendChild(weapons);
    const passiveList = (player.upgrades || []).filter((name) => !Object.values(player.weapons || {}).some((weapon) => weapon.name === name));
    if (passiveList.length) {
      const passiveWrap = document.createElement("div");
      passiveWrap.className = "build-chips passive-chips";
      [...new Set(passiveList)].forEach((name) => {
        const meta = upgradeMeta[name] || { color: player.color, description: "A drafted passive upgrade." };
        const card = document.createElement("div");
        card.className = "weapon-chip passive-card";
        const art = document.createElement("canvas");
        art.className = "card-art";
        art.width = 150;
        art.height = 86;
        card.appendChild(art);
        const count = passiveList.filter((item) => item === name).length;
        const body = document.createElement("div");
        body.innerHTML = `<strong>${name}</strong><span>${count} upgrade${count === 1 ? "" : "s"}</span><p>${meta.description}</p>`;
        card.appendChild(body);
        drawCardArt(art, name, meta.color);
        passiveWrap.appendChild(card);
      });
      panel.appendChild(passiveWrap);
    }
    const upgrades = document.createElement("p");
    upgrades.className = "upgrade-history";
    upgrades.textContent = player.upgrades?.length ? `Choices: ${player.upgrades.join(", ")}` : "Choices: opening kit only";
    panel.appendChild(upgrades);
    ui.buildList.appendChild(panel);
  });
}

function updateShopFromRoom() {
  const roomPlayer = state.remoteRoom?.players?.[clientId];
  if (!roomPlayer) return;
  ui.money.textContent = `$${Math.round(roomPlayer.money || 0)}`;
  ui.lifetimeKills.textContent = (roomPlayer.lifetimeKills || 0).toString();
  ui.shopList.innerHTML = "";
  shopCatalog.forEach((item) => {
    const level = shopLevel(roomPlayer.shop || {}, item.id);
    const done = level >= item.max;
    const row = document.createElement("div");
    row.className = `shop-item${done ? " is-bought" : ""}`;
    row.innerHTML = `<div><span>${item.type} ${done ? "max" : `rank ${level}/${item.max}`}</span><strong>${item.name}</strong><span>${item.text}</span></div><b>${done ? "Owned" : `$${shopCost(roomPlayer.shop || {}, item)}`}</b>`;
    ui.shopList.appendChild(row);
  });
}

function drawCardArt(canvas, key, color) {
  const artKey = String(key).toLowerCase();
  const art = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const gradient = art.createLinearGradient(0, 0, w, h);
  gradient.addColorStop(0, "rgba(255,255,255,0.13)");
  gradient.addColorStop(1, "rgba(0,0,0,0.28)");
  art.fillStyle = "#080b19";
  art.fillRect(0, 0, w, h);
  art.fillStyle = gradient;
  art.fillRect(0, 0, w, h);
  const glow = art.createRadialGradient(w * 0.54, h * 0.5, 2, w * 0.54, h * 0.5, w * 0.48);
  glow.addColorStop(0, color);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  art.globalAlpha = 0.42;
  art.fillStyle = glow;
  art.fillRect(0, 0, w, h);
  art.globalAlpha = 1;
  art.strokeStyle = color;
  art.lineWidth = 4;
  art.fillStyle = color;
  art.save();
  art.translate(w / 2, h / 2);
  if (artKey.includes("orbit")) {
    art.beginPath();
    art.ellipse(0, 0, 48, 18, -0.22, 0, TAU);
    art.stroke();
    for (let i = 0; i < 3; i += 1) {
      const a = (i / 3) * TAU;
      art.beginPath();
      art.arc(Math.cos(a) * 40, Math.sin(a) * 16, 8, 0, TAU);
      art.fill();
    }
  } else if (artKey.includes("crossbow")) {
    art.beginPath();
    art.moveTo(-42, 0);
    art.lineTo(46, 0);
    art.moveTo(14, -24);
    art.quadraticCurveTo(42, 0, 14, 24);
    art.moveTo(-8, -24);
    art.quadraticCurveTo(-36, 0, -8, 24);
    art.stroke();
  } else if (artKey.includes("sigil")) {
    art.beginPath();
    art.arc(0, 0, 30, 0, TAU);
    art.stroke();
    art.beginPath();
    for (let i = 0; i < 6; i += 1) {
      const a = (i / 6) * TAU - Math.PI / 2;
      const x = Math.cos(a) * 28;
      const y = Math.sin(a) * 28;
      if (i === 0) art.moveTo(x, y);
      else art.lineTo(x, y);
    }
    art.closePath();
    art.stroke();
  } else if (artKey.includes("bats") || artKey.includes("swarm")) {
    for (let i = 0; i < 3; i += 1) {
      art.beginPath();
      art.moveTo(-38 + i * 32, 2);
      art.quadraticCurveTo(-26 + i * 32, -18, -12 + i * 32, 1);
      art.quadraticCurveTo(-1 + i * 32, -18, 12 + i * 32, 1);
      art.quadraticCurveTo(-2 + i * 32, 9, -12 + i * 32, 18);
      art.quadraticCurveTo(-22 + i * 32, 9, -38 + i * 32, 2);
      art.fill();
    }
  } else {
    art.beginPath();
    for (let i = 0; i < 8; i += 1) {
      const a = (i / 8) * TAU;
      const radius = i % 2 ? 18 : 38;
      const x = Math.cos(a) * radius;
      const y = Math.sin(a) * radius;
      if (i === 0) art.moveTo(x, y);
      else art.lineTo(x, y);
    }
    art.closePath();
    art.fill();
  }
  art.restore();
}

function renderEventLog(events) {
  ui.upgradeLog.innerHTML = "";
  events.slice(0, 7).forEach((event) => {
    const line = document.createElement("p");
    line.textContent = event;
    ui.upgradeLog.appendChild(line);
  });
}

function showEnd(snapshot) {
  if (!snapshot) return;
  ui.endEyebrow.textContent = snapshot.status === "victory" ? "Dawn survived" : "Room wiped";
  ui.endTitle.textContent = snapshot.status === "victory" ? "The party reached dawn." : "The room is buying upgrades.";
  ui.endBody.textContent = "The host returned the room to lobby. Start again to use the new shop strength.";
  ui.endTime.textContent = formatTime(snapshot.elapsed);
  ui.endKills.textContent = snapshot.kills.toString();
  ui.endLevel.textContent = snapshot.level.toString();
  ui.endOverlay.hidden = false;
}

function draw() {
  const snapshot = state.render;
  const cam = cameraForRender(snapshot);
  drawWorld(cam);
  if (!snapshot) return;
  drawGems(snapshot, cam);
  drawPickups(snapshot, cam);
  drawProjectiles(snapshot, cam);
  drawEnemies(snapshot, cam);
  drawPlayers(snapshot, cam);
  drawParticles(snapshot, cam);
}

function drawWorld(cam) {
  ctx.clearRect(0, 0, width, height);
  drawSpaceTile(cam, 0.26, 1.45, 0.74);
  drawSpaceTile(cam, 0.54, 0.9, 0.54);
  const shade = ctx.createRadialGradient(width * 0.5, height * 0.44, 80, width * 0.5, height * 0.5, Math.max(width, height) * 0.74);
  shade.addColorStop(0, "rgba(10, 14, 34, 0)");
  shade.addColorStop(1, "rgba(1, 2, 10, 0.72)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, width, height);
  drawStars(cam);
  drawObstacles(visibleObstacles(cam), cam);
}

function drawSpaceTile(cam, depth, scale, alpha) {
  const image = assetImages.background;
  if (!image.complete || !image.naturalWidth) {
    ctx.fillStyle = "#040715";
    ctx.fillRect(0, 0, width, height);
    drawNebula(cam);
    return;
  }
  const tile = WORLD.tileSize * scale * cam.zoom;
  const offsetX = wrap(-cam.x * depth * cam.zoom, tile) - tile;
  const offsetY = wrap(-cam.y * depth * cam.zoom, tile) - tile;
  ctx.save();
  ctx.globalAlpha = alpha;
  for (let x = offsetX, ix = 0; x < width + tile; x += tile, ix += 1) {
    for (let y = offsetY, iy = 0; y < height + tile; y += tile, iy += 1) {
      drawMirroredTile(image, x, y, tile + 1, ix % 2 === 1, iy % 2 === 1);
    }
  }
  ctx.restore();
}

function drawMirroredTile(image, x, y, size, flipX, flipY) {
  ctx.save();
  ctx.translate(x + (flipX ? size : 0), y + (flipY ? size : 0));
  ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
  ctx.drawImage(image, 0, 0, size, size);
  ctx.restore();
}

function drawNebula(cam) {
  const drift = (performance.now() % 100000) / 100000;
  [
    { x: 0.18, y: 0.3, color: "rgba(166, 85, 255, 0.22)", r: 520 },
    { x: 0.76, y: 0.24, color: "rgba(73, 244, 255, 0.14)", r: 460 },
    { x: 0.48, y: 0.76, color: "rgba(255, 79, 135, 0.16)", r: 620 }
  ].forEach((cloud, index) => {
    const x = width * cloud.x - (cam.x * (0.015 + index * 0.005)) % width + Math.sin(drift * TAU + index) * 32;
    const y = height * cloud.y - (cam.y * (0.012 + index * 0.004)) % height;
    const nebula = ctx.createRadialGradient(x, y, 12, x, y, cloud.r);
    nebula.addColorStop(0, cloud.color);
    nebula.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = nebula;
    ctx.beginPath();
    ctx.arc(x, y, cloud.r, 0, TAU);
    ctx.fill();
  });
}

function drawStars(cam) {
  ctx.save();
  starField.forEach((star) => {
    const sx = wrap(star.x - cam.x * star.depth, width + 120) - 60;
    const sy = wrap(star.y - cam.y * star.depth, height + 120) - 60;
    const twinkle = 0.45 + Math.sin(performance.now() * 0.002 + star.phase) * 0.25 + star.alpha;
    ctx.globalAlpha = clamp(twinkle, 0.18, 1);
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(sx, sy, star.size, 0, TAU);
    ctx.fill();
  });
  ctx.restore();
}

function drawObstacles(obstacles, cam) {
  obstacles.forEach((obstacle) => {
    const p = worldToScreen(obstacle, cam);
    const r = obstacle.radius * cam.zoom;
    if (p.x < -r * 3 || p.y < -r * 3 || p.x > width + r * 3 || p.y > height + r * 3) return;
    drawGlow(p.x, p.y, r * 2.7, obstacle.color, 0.22);
    if (obstacle.ringed) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(-0.24 + obstacle.spin * 0.08);
      ctx.strokeStyle = obstacle.ring;
      ctx.lineWidth = Math.max(2, 8 * cam.zoom);
      ctx.globalAlpha = 0.56;
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 1.75, r * 0.42, 0, 0, TAU);
      ctx.stroke();
      ctx.restore();
    }
    const shade = ctx.createRadialGradient(p.x - r * 0.35, p.y - r * 0.42, r * 0.1, p.x, p.y, r);
    shade.addColorStop(0, "#ffffff");
    shade.addColorStop(0.12, obstacle.color);
    shade.addColorStop(1, "#121023");
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, TAU);
    ctx.fill();
  });
}

function drawGems(snapshot, cam) {
  snapshot.gems.forEach((gem) => {
    const p = worldToScreen(gem, cam);
    drawGlow(p.x, p.y, 18, "rgba(73, 244, 255, 0.55)", 0.34);
    ctx.fillStyle = "#49f4ff";
    ctx.beginPath();
    ctx.arc(p.x, p.y, gem.radius, 0, TAU);
    ctx.fill();
  });
}

function drawPickups(snapshot, cam) {
  (snapshot.pickups || []).forEach((pickup) => {
    const p = worldToScreen(pickup, cam);
    const pulse = 1 + Math.sin(performance.now() * 0.006 + pickup.spin) * 0.12;
    drawGlow(p.x, p.y, 50, "rgba(116, 247, 255, 0.75)", 0.48);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((pickup.spin || 0) + performance.now() * 0.002);
    ctx.strokeStyle = "#74f7ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, pickup.radius * pulse, 0, TAU);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-pickup.radius * 0.8, 0);
    ctx.lineTo(pickup.radius * 0.8, 0);
    ctx.moveTo(0, -pickup.radius * 0.8);
    ctx.lineTo(0, pickup.radius * 0.8);
    ctx.stroke();
    ctx.restore();
  });
}

function drawProjectiles(snapshot, cam) {
  snapshot.pulses.forEach((pulse) => {
    const p = worldToScreen(pulse, cam);
    ctx.save();
    ctx.globalAlpha = 1 - pulse.age / pulse.life;
    ctx.strokeStyle = pulse.color;
    ctx.lineWidth = 4;
    drawGlow(p.x, p.y, pulse.radius * 0.42, pulse.color, 0.15);
    ctx.beginPath();
    ctx.arc(p.x, p.y, pulse.radius, 0, TAU);
    ctx.stroke();
    ctx.restore();
  });
  snapshot.projectiles.forEach((shot) => {
    const p = worldToScreen(shot, cam);
    drawGlow(p.x, p.y, shot.radius * 4, shot.color, 0.58);
    ctx.fillStyle = shot.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, shot.radius, 0, TAU);
    ctx.fill();
  });
}

function drawEnemies(snapshot, cam) {
  snapshot.enemies.forEach((enemy) => {
    const p = worldToScreen(enemy, cam);
    const size = enemy.radius * cam.zoom;
    if (p.x < -120 || p.y < -120 || p.x > width + 120 || p.y > height + 120) return;
    drawEnemySprite(enemy, p.x, p.y, Math.max(0.72, cam.zoom), snapshot.elapsed || 0);
  });
}

function drawPlayers(snapshot, cam) {
  snapshot.players.forEach((player) => {
    const p = worldToScreen(player, cam);
    drawGlow(p.x, p.y, 76, player.color, player.alive ? 0.34 : 0.16);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.globalAlpha = player.alive ? 1 : 0.35;
    const bob = Math.sin((snapshot.elapsed || 0) * 4 + player.x * 0.01) * 2;
    ctx.translate(0, bob);
    ctx.fillStyle = "rgba(7, 14, 28, 0.98)";
    ctx.strokeStyle = player.color;
    ctx.lineWidth = 2.7;
    ctx.beginPath();
    ctx.ellipse(0, 5, 31, 10, 0, 0, TAU);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "rgba(210, 250, 255, 0.28)";
    ctx.beginPath();
    ctx.ellipse(0, 1, 22, 5, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = player.color;
    ctx.globalAlpha *= 0.35;
    ctx.beginPath();
    ctx.ellipse(0, 10, 40, 8, 0, 0, TAU);
    ctx.fill();
    ctx.globalAlpha = player.alive ? 1 : 0.35;
    ctx.fillStyle = "rgba(210, 250, 255, 0.92)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.72)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(0, -8, 12, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.26)";
    ctx.beginPath();
    ctx.ellipse(0, 5, 31, 10, 0, Math.PI, 0);
    ctx.stroke();
    for (let i = -2; i <= 2; i += 1) {
      ctx.fillStyle = i === 0 ? "#ffffff" : player.color;
      ctx.beginPath();
      ctx.arc(i * 11, 6, 2.4, 0, TAU);
      ctx.fill();
    }
    ctx.fillStyle = "rgba(116,247,255,0.38)";
    ctx.beginPath();
    ctx.ellipse(0, 17, 15 + Math.sin((snapshot.elapsed || 0) * 12) * 4, 5, 0, 0, TAU);
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = player.color;
    ctx.font = "900 12px Segoe UI, system-ui";
    ctx.textAlign = "center";
    ctx.fillText(player.name, p.x, p.y - 26);
  });
}

function drawParticles(snapshot, cam) {
  (snapshot.particles || []).forEach((particle) => {
    const p = worldToScreen(particle, cam);
    const alpha = clamp(particle.life / Math.max(0.01, particle.life + particle.age), 0.08, 0.9);
    drawGlow(p.x, p.y, particle.radius * 5, particle.color, alpha * 0.32);
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, particle.radius, 0, TAU);
    ctx.fill();
    ctx.globalAlpha = 1;
  });
}

function drawEnemySprite(enemy, x, y, scale, time) {
  const r = enemy.radius * scale;
  const wobble = Math.sin(time * 5 + (enemy.swim || 0)) * 0.18;
  drawGlow(x, y, r * (enemy.boss ? 4.2 : 2.6), enemy.color, enemy.boss ? 0.36 : 0.24);
  if (drawAtlasEnemy(enemy, x, y, r, wobble, time)) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(wobble);
  ctx.lineWidth = Math.max(1.2, 2 * scale);
  ctx.strokeStyle = "rgba(255,255,255,0.72)";
  ctx.fillStyle = enemy.color;
  if (enemy.boss) drawBossEnemy(r, enemy.color, time);
  else if (enemy.kind === "voidBat") drawVoidBat(r, enemy.color);
  else if (enemy.kind === "spaceRat") drawSpaceRat(r, enemy.color, time);
  else if (enemy.kind === "crystalKnight") drawCrystalKnight(r, enemy.color);
  else if (enemy.kind === "plasmaCultist") drawPlasmaCultist(r, enemy.color, time);
  else if (enemy.kind === "novaShade") drawNovaShade(r, enemy.color, time);
  else drawStarMite(r, enemy.color);
  ctx.restore();
}

function drawAtlasEnemy(enemy, x, y, r, wobble, time) {
  const image = assetImages.enemies;
  if (!image.complete || !image.naturalWidth) return false;
  const key = enemy.boss && /prism|singularity|maw/i.test(enemy.name || "") ? "prismBoss" : enemy.kind;
  const meta = enemyAtlas[key] || enemyAtlas[enemy.kind] || enemyAtlas.starMite;
  const cellW = image.naturalWidth / 4;
  const cellH = image.naturalHeight / 2;
  const size = r * meta.scale;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(wobble * (enemy.boss ? 0.55 : 1));
  const pulse = enemy.boss ? 1 + Math.sin(time * 3) * 0.03 : 1;
  ctx.globalAlpha = enemy.flash > 0 ? 0.68 : 1;
  ctx.drawImage(
    image,
    meta.col * cellW,
    meta.row * cellH,
    cellW,
    cellH,
    -size * pulse,
    -size * pulse,
    size * 2 * pulse,
    size * 2 * pulse
  );
  if (enemy.flash > 0) {
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = 0.42;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.52, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
  return true;
}

function drawStarMite(r, color) {
  ctx.fillStyle = color;
  for (let i = 0; i < 6; i += 1) {
    const a = (i / 6) * TAU;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * r * 0.35, Math.sin(a) * r * 0.35);
    ctx.lineTo(Math.cos(a) * r * 1.1, Math.sin(a) * r * 1.1);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.62, 0, TAU);
  ctx.fill();
}

function drawVoidBat(r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-r * 1.25, -r * 0.2);
  ctx.quadraticCurveTo(-r * 0.3, -r * 1.05, 0, -r * 0.2);
  ctx.quadraticCurveTo(r * 0.3, -r * 1.05, r * 1.25, -r * 0.2);
  ctx.quadraticCurveTo(r * 0.34, r * 0.18, 0, r * 0.85);
  ctx.quadraticCurveTo(-r * 0.34, r * 0.18, -r * 1.25, -r * 0.2);
  ctx.fill();
  ctx.stroke();
}

function drawSpaceRat(r, color, time) {
  ctx.fillStyle = "#c89863";
  ctx.beginPath();
  ctx.ellipse(0, r * 0.08, r * 1.05, r * 0.58, 0, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "#ffd166";
  ctx.lineWidth = Math.max(1.5, r * 0.14);
  ctx.beginPath();
  ctx.moveTo(-r * 0.95, r * 0.12);
  ctx.bezierCurveTo(-r * 1.5, r * (0.2 + Math.sin(time * 7) * 0.2), -r * 1.9, -r * 0.15, -r * 2.25, r * 0.2);
  ctx.stroke();
  ctx.fillStyle = "rgba(205,245,255,0.72)";
  ctx.strokeStyle = "rgba(255,255,255,0.86)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(r * 0.48, -r * 0.18, r * 0.46, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#101622";
  ctx.beginPath();
  ctx.arc(r * 0.6, -r * 0.2, r * 0.11, 0, TAU);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(-r * 0.1, r * 0.64, r * 0.16, 0, TAU);
  ctx.arc(r * 0.38, r * 0.62, r * 0.16, 0, TAU);
  ctx.fill();
}

function drawCrystalKnight(r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, -r * 1.25);
  ctx.lineTo(r * 0.95, -r * 0.2);
  ctx.lineTo(r * 0.52, r * 1.0);
  ctx.lineTo(-r * 0.52, r * 1.0);
  ctx.lineTo(-r * 0.95, -r * 0.2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,0.42)";
  ctx.beginPath();
  ctx.moveTo(0, -r * 1.05);
  ctx.lineTo(0, r * 0.86);
  ctx.moveTo(-r * 0.68, -r * 0.12);
  ctx.lineTo(r * 0.68, -r * 0.12);
  ctx.stroke();
}

function drawPlasmaCultist(r, color, time) {
  ctx.fillStyle = "rgba(20,8,32,0.96)";
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(0, 0, r * (0.38 + Math.sin(time * 8) * 0.06), 0, TAU);
  ctx.fill();
  for (let i = 0; i < 3; i += 1) {
    const a = time * 2 + (i / 3) * TAU;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * r * 0.92, Math.sin(a) * r * 0.92, r * 0.14, 0, TAU);
    ctx.fill();
  }
}

function drawNovaShade(r, color, time) {
  ctx.fillStyle = "rgba(255,184,74,0.78)";
  ctx.beginPath();
  for (let i = 0; i < 10; i += 1) {
    const a = (i / 10) * TAU;
    const point = r * (i % 2 ? 0.55 : 1.18 + Math.sin(time * 6) * 0.08);
    const x = Math.cos(a) * point;
    const y = Math.sin(a) * point;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawBossEnemy(r, color, time) {
  ctx.fillStyle = "rgba(29, 8, 28, 0.96)";
  ctx.beginPath();
  ctx.ellipse(0, 0, r * 1.32, r, 0, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(2, r * 0.08);
  ctx.stroke();
  for (let i = 0; i < 5; i += 1) {
    const a = time * 1.2 + (i / 5) * TAU;
    ctx.fillStyle = i % 2 ? "#ffd166" : color;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * r * 0.92, Math.sin(a) * r * 0.62, r * 0.16, 0, TAU);
    ctx.fill();
  }
}

function drawGlow(x, y, radius, color, alpha) {
  const glow = ctx.createRadialGradient(x, y, 1, x, y, radius);
  glow.addColorStop(0, color);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function cameraForRender(snapshot) {
  const players = snapshot?.players || [];
  const alive = players.filter((player) => player.alive);
  const local = players.find((player) => player.id === clientId && player.alive) || players.find((player) => player.id === clientId);
  const focus = renderCamera.follow && local ? [local] : alive.length ? alive : players;
  const x = focus.length ? focus.reduce((sum, player) => sum + player.x, 0) / focus.length : 0;
  const y = focus.length ? focus.reduce((sum, player) => sum + player.y, 0) / focus.length : 0;
  if (!renderCamera.initialized) {
    renderCamera.zoom = renderCamera.follow ? FOLLOW_ZOOM : width < 760 ? 0.72 : 0.48;
  }
  if (renderCamera.follow) {
    const viewWidth = width / renderCamera.zoom;
    const viewHeight = height / renderCamera.zoom;
    const targetX = x - viewWidth / 2;
    const targetY = y - viewHeight / 2;
    if (!renderCamera.initialized || renderCamera.snap) {
      renderCamera.x = targetX;
      renderCamera.y = targetY;
      renderCamera.initialized = true;
      renderCamera.snap = false;
    } else {
      renderCamera.x += (targetX - renderCamera.x) * 0.055;
      renderCamera.y += (targetY - renderCamera.y) * 0.055;
    }
  } else {
    settleCamera();
  }
  return { x: renderCamera.x, y: renderCamera.y, zoom: renderCamera.zoom };
}

function worldToScreen(entity, cam) {
  return { x: (entity.x - cam.x) * cam.zoom, y: (entity.y - cam.y) * cam.zoom };
}

function nearestEnemy(sim, origin, range) {
  let best = null;
  let bestDistance = range;
  sim.enemies.forEach((enemy) => {
    if (enemy.dead) return;
    const d = distance(origin, enemy);
    if (d < bestDistance) {
      best = enemy;
      bestDistance = d;
    }
  });
  return best;
}

function nearestAlivePlayer(sim, origin) {
  let best = null;
  let bestDistance = Infinity;
  sim.players.forEach((player) => {
    if (!player.alive) return;
    const d = distance(origin, player);
    if (d < bestDistance) {
      best = player;
      bestDistance = d;
    }
  });
  return best;
}

function togglePause() {
  if (!state.isHost || !state.sim) return;
  state.sim.status = state.sim.status === "paused" ? "playing" : "paused";
}

function updateEffects() {}

function cloneWeapon(key) {
  return Object.assign({}, weaponCatalog[key]);
}

function formatTime(seconds) {
  const value = Math.max(0, Math.floor(seconds || 0));
  return `${Math.floor(value / 60).toString().padStart(2, "0")}:${(value % 60).toString().padStart(2, "0")}`;
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function angleTo(a, b) {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function easeOut(value) {
  const t = clamp(value, 0, 1);
  return 1 - (1 - t) * (1 - t);
}

boot().catch((error) => setStatus(error.message));
