import { getFirebaseServices, hasFirebaseConfig } from "../assets/js/firebase-client.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ui = {
  time: document.getElementById("timeReadout"),
  level: document.getElementById("levelReadout"),
  kills: document.getElementById("killsReadout"),
  health: document.getElementById("healthReadout"),
  healthFill: document.getElementById("healthFill"),
  xp: document.getElementById("xpReadout"),
  xpFill: document.getElementById("xpFill"),
  loadout: document.getElementById("loadout"),
  best: document.getElementById("bestReadout"),
  wins: document.getElementById("winsReadout"),
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
  restartButton: document.getElementById("restartButton")
};

const TAU = Math.PI * 2;
const WORLD = { width: 3600, height: 2600 };
const RUN_DURATION = 600;
const ROOM_COLLECTION = "nightboundAutobattlerRooms";
const PLAYER_COLORS = ["#49f4ff", "#ff4f87", "#77ff9b", "#ffd166"];
const bossSchedule = [
  { at: 120, name: "The Bellkeeper" },
  { at: 240, name: "Duchess of Static" },
  { at: 360, name: "The Moon Warden" },
  { at: 480, name: "Choir of Fangs" },
  { at: 555, name: "Dawnless Count" }
];

const enemyTypes = {
  thrall: { name: "Thrall", hp: 18, speed: 62, damage: 8, radius: 13, xp: 2, color: "#8b5cf6" },
  bat: { name: "Glass Bat", hp: 12, speed: 126, damage: 6, radius: 10, xp: 2, color: "#49f4ff" },
  knight: { name: "Grave Knight", hp: 68, speed: 42, damage: 15, radius: 18, xp: 7, color: "#ffd166" },
  cultist: { name: "Choir Cultist", hp: 32, speed: 50, damage: 7, radius: 14, xp: 5, color: "#ff4f87", ranged: true },
  shade: { name: "Burst Shade", hp: 26, speed: 88, damage: 22, radius: 15, xp: 4, color: "#77ff9b", explodes: true },
  boss: { name: "Boss", hp: 900, speed: 38, damage: 24, radius: 34, xp: 48, color: "#ff395d" }
};

const weaponCatalog = {
  orbit: { name: "Blood Orbit", color: "#ff4f87", level: 1, cooldown: 0, damage: 18, count: 2, radius: 76 },
  crossbow: { name: "Moonshot Crossbow", color: "#49f4ff", level: 1, cooldown: 0, delay: 0.72, damage: 24, count: 1, speed: 540 },
  sigil: { name: "Gravefire Sigil", color: "#9b66ff", level: 0, cooldown: 1.4, delay: 3.2, damage: 34, radius: 118 },
  bats: { name: "Bat Swarm", color: "#77ff9b", level: 0, cooldown: 0.9, delay: 1.9, damage: 17, count: 2, speed: 360 }
};

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

  if (!hasFirebaseConfig()) {
    ui.roomStatus.textContent = "Firebase config missing.";
  } else {
    services = await getFirebaseServices();
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

function cleanName() {
  const name = ui.playerNameInput.value.trim().slice(0, 18) || `AI ${clientId.slice(0, 4)}`;
  localStorage.setItem("nightboundAutobattler.name", name);
  return name;
}

function makeRoomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i += 1) code += alphabet[Math.floor(Math.random() * alphabet.length)];
  return code;
}

async function createRoom() {
  if (!services) return setStatus("Firebase is not ready yet.");
  setStatus("Creating Firebase room...");
  const code = makeRoomCode();
  const player = makeRoomPlayer(cleanName(), 0);
  roomRef = services.firestore.doc(services.db, ROOM_COLLECTION, code);
  await services.firestore.setDoc(roomRef, {
    code,
    hostId: clientId,
    status: "lobby",
    maxPlayers: 4,
    createdAt: services.firestore.serverTimestamp(),
    updatedAt: services.firestore.serverTimestamp(),
    players: { [clientId]: player },
    snapshot: null,
    eventLog: [`${player.name} created room ${code}.`]
  });
  connectRoom(code);
}

async function joinRoom() {
  if (!services) return setStatus("Firebase is not ready yet.");
  const code = ui.roomCodeInput.value.trim().toUpperCase();
  if (!code) return setStatus("Enter a room code first.");
  setStatus(`Joining room ${code}...`);
  const ref = services.firestore.doc(services.db, ROOM_COLLECTION, code);
  const snap = await services.firestore.getDoc(ref);
  if (!snap.exists()) return setStatus("Room not found.");
  const room = snap.data();
  const players = room.players || {};
  if (!players[clientId] && Object.keys(players).length >= 4) return setStatus("That room already has 4 players.");
  const player = makeRoomPlayer(cleanName(), Object.keys(players).length);
  await services.firestore.updateDoc(ref, {
    [`players.${clientId}`]: Object.assign({}, players[clientId] || {}, player),
    updatedAt: services.firestore.serverTimestamp()
  });
  roomRef = ref;
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
  roomRef = services.firestore.doc(services.db, ROOM_COLLECTION, code);
  unsubscribeRoom = services.firestore.onSnapshot(roomRef, (snap) => {
    if (!snap.exists()) {
      setStatus("Room disappeared.");
      return;
    }
    state.remoteRoom = snap.data();
    state.isHost = state.remoteRoom.hostId === clientId;
    handleRoomUpdate();
  }, (error) => setStatus(error.message));
}

function handleRoomUpdate() {
  const room = state.remoteRoom;
  const players = sortedRoomPlayers(room);
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
  await services.firestore.updateDoc(roomRef, {
    status: "playing",
    startedAt: Date.now(),
    snapshot: compactSnapshot(state.sim),
    eventLog: [`Room ${state.roomCode} started with ${state.sim.players.length} AI survivors.`],
    updatedAt: services.firestore.serverTimestamp()
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
    bossesSeen: [],
    eventLog: [`Shared XP enabled for ${playerCount} AI survivor${playerCount === 1 ? "" : "s"}.`],
    spawnBudget: 0,
    draftTimer: 0,
    draftChoices: null,
    playerCount
  };
  for (let i = 0; i < 18 + playerCount * 8; i += 1) spawnEnemy(sim, "thrall");
  return sim;
}

function makeFighter(roomPlayer, index, playerCount) {
  const shop = roomPlayer.shop || {};
  const angle = (index / playerCount) * TAU;
  const fighter = {
    id: roomPlayer.id,
    name: roomPlayer.name,
    color: roomPlayer.color || PLAYER_COLORS[index % PLAYER_COLORS.length],
    x: WORLD.width / 2 + Math.cos(angle) * 90,
    y: WORLD.height / 2 + Math.sin(angle) * 90,
    radius: 17,
    speed: 225 + shopLevel(shop, "speed") * 10,
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
    updateSimulation(state.sim, dt * 1.65);
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
  sim.enemies = sim.enemies.filter((enemy) => !enemy.dead);
  if (!sim.players.some((player) => player.alive)) endSimulation(sim, false);
}

function updatePlayers(sim, dt) {
  sim.players.forEach((player) => {
    if (!player.alive) return;
    const move = aiMove(sim, player);
    if (move.moving) {
      player.x = clamp(player.x + move.x * player.speed * dt, 28, WORLD.width - 28);
      player.y = clamp(player.y + move.y * player.speed * dt, 28, WORLD.height - 28);
      player.angle = Math.atan2(move.y, move.x);
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
    if (d < 250) {
      const pressure = (250 - d) / 250;
      x += (dx / d) * pressure * (enemy.boss ? 3.2 : 2.2);
      y += (dy / d) * pressure * (enemy.boss ? 3.2 : 2.2);
      closeThreats += 1;
    }
  });

  const gem = bestGemTarget(sim, player);
  if (gem && (closeThreats < 5 || distance(player, gem) < player.pickup * 1.8)) {
    const dx = gem.x - player.x;
    const dy = gem.y - player.y;
    const d = Math.hypot(dx, dy) || 1;
    x += (dx / d) * 1.35;
    y += (dy / d) * 1.35;
  } else if (nearest && nearestDistance > 310) {
    const dx = nearest.x - player.x;
    const dy = nearest.y - player.y;
    const d = Math.hypot(dx, dy) || 1;
    x += (dx / d) * 0.78;
    y += (dy / d) * 0.78;
  }

  x += (WORLD.width / 2 - player.x) / WORLD.width * 0.62;
  y += (WORLD.height / 2 - player.y) / WORLD.height * 0.62;
  const length = Math.hypot(x, y) || 1;
  return { x: x / length, y: y / length, moving: Math.abs(x) + Math.abs(y) > 0.05 };
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
  sim.spawnBudget += dt * (1.6 + minute * 0.92) * scale;
  const cap = 65 + minute * 22 + (sim.playerCount - 1) * 28;
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
    ["thrall", 1.2],
    ["bat", minute > 0.7 ? 0.72 : 0],
    ["knight", minute > 1.7 ? 0.3 + minute * 0.04 : 0],
    ["cultist", minute > 2.2 ? 0.28 + minute * 0.035 : 0],
    ["shade", minute > 3.2 ? 0.26 + minute * 0.035 : 0]
  ];
  const total = candidates.reduce((sum, item) => sum + item[1], 0);
  let roll = Math.random() * total;
  for (const [kind, weight] of candidates) {
    roll -= weight;
    if (roll <= 0) return kind;
  }
  return "thrall";
}

function spawnEnemy(sim, kind, bossName) {
  const base = enemyTypes[kind];
  const minute = sim.elapsed / 60;
  const hpScale = 1 + minute * 0.2 + (sim.playerCount - 1) * 0.45;
  const point = spawnPoint(kind === "boss" ? 160 : 95);
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
    flash: 0,
    boss: kind === "boss",
    color: base.color,
    xp: base.xp,
    damage: base.damage,
    ranged: base.ranged,
    explodes: base.explodes,
    dead: false
  });
}

function spawnPoint(margin) {
  const side = Math.floor(Math.random() * 4);
  const cam = cameraForRender(state.render || state.sim);
  if (side === 0) return { x: clamp(cam.x + Math.random() * width, 20, WORLD.width - 20), y: clamp(cam.y - margin, 20, WORLD.height - 20) };
  if (side === 1) return { x: clamp(cam.x + width + margin, 20, WORLD.width - 20), y: clamp(cam.y + Math.random() * height, 20, WORLD.height - 20) };
  if (side === 2) return { x: clamp(cam.x + Math.random() * width, 20, WORLD.width - 20), y: clamp(cam.y + height + margin, 20, WORLD.height - 20) };
  return { x: clamp(cam.x - margin, 20, WORLD.width - 20), y: clamp(cam.y + Math.random() * height, 20, WORLD.height - 20) };
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
    sim.enemies.forEach((enemy) => {
      if (enemy.dead || shot.hit.includes(enemy.id)) return;
      if (distance(shot, enemy) < shot.radius + enemy.radius) {
        shot.hit.push(enemy.id);
        shot.pierce -= 1;
        damageEnemy(sim, enemy, shot.damage, shot.ownerId);
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
    enemy.vx = Math.cos(a) * enemy.speed * direction;
    enemy.vy = Math.sin(a) * enemy.speed * direction;
    enemy.x = clamp(enemy.x + enemy.vx * dt, 18, WORLD.width - 18);
    enemy.y = clamp(enemy.y + enemy.vy * dt, 18, WORLD.height - 18);
    if (enemy.explodes && d < enemy.radius + target.radius + 8) {
      hurtPlayer(sim, target, enemy.damage);
      enemy.dead = true;
    } else if (d < enemy.radius + target.radius && enemy.touchTimer <= 0) {
      hurtPlayer(sim, target, enemy.damage);
      enemy.touchTimer = 0.62;
    }
  });
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
      const speed = 290 + (player.pickup - Math.min(player.pickup, d)) * 8;
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
  sim.gems.push({ x: enemy.x, y: enemy.y, value: enemy.xp, radius: 7 + Math.min(6, enemy.xp), spin: Math.random() * TAU, magnet: false });
  if (enemy.boss) sim.gems.push({ x: enemy.x + 28, y: enemy.y, value: Math.floor(enemy.xp * 0.65), radius: 12, spin: 0, magnet: false });
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
    playersUpdate[`players.${player.id}.money`] = Math.round(player.money);
    playersUpdate[`players.${player.id}.lifetimeKills`] = player.lifetimeKills;
    playersUpdate[`players.${player.id}.shop`] = player.shop;
  });
  await services.firestore.updateDoc(roomRef, Object.assign(playersUpdate, {
    status: "lobby",
    snapshot: compactSnapshot(sim),
    lastResult: won ? "victory" : "wipe",
    eventLog: sim.eventLog.slice(0, 8),
    updatedAt: services.firestore.serverTimestamp()
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
  services.firestore.updateDoc(roomRef, {
    snapshot: compactSnapshot(state.sim),
    eventLog: state.sim.eventLog.slice(0, 8),
    updatedAt: services.firestore.serverTimestamp()
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
    players: sim.players.map((player) => ({
      id: player.id,
      name: player.name,
      color: player.color,
      x: player.x,
      y: player.y,
      health: player.health,
      maxHealth: player.maxHealth,
      alive: player.alive,
      money: player.money,
      lifetimeKills: player.lifetimeKills,
      weapons: summarizeWeapons(player.weapons)
    })),
    enemies: sim.enemies.slice(0, 180).map((enemy) => ({ x: enemy.x, y: enemy.y, radius: enemy.radius, color: enemy.color, boss: enemy.boss, hp: enemy.hp, maxHp: enemy.maxHp })),
    gems: sim.gems.slice(0, 120).map((gem) => ({ x: gem.x, y: gem.y, radius: gem.radius, value: gem.value })),
    projectiles: sim.projectiles.slice(0, 140).map((shot) => ({ x: shot.x, y: shot.y, radius: shot.radius, color: shot.color })),
    pulses: sim.pulses.map((pulse) => ({ x: pulse.x, y: pulse.y, radius: pulse.radius, color: pulse.color, age: pulse.age, life: pulse.life })),
    eventLog: sim.eventLog.slice(0, 8)
  };
}

function summarizeWeapons(weapons) {
  return Object.fromEntries(Object.entries(weapons).map(([key, weapon]) => [key, { name: weapon.name, color: weapon.color, level: weapon.level, count: weapon.count || 0 }]));
}

function updateHudFromSnapshot(snapshot) {
  if (!snapshot) {
    ui.time.textContent = "00:00";
    ui.level.textContent = "1";
    ui.kills.textContent = "0";
    ui.health.textContent = "Waiting";
    ui.xp.textContent = "0 / 8";
    ui.healthFill.style.width = "100%";
    ui.xpFill.style.width = "0%";
    ui.loadout.innerHTML = "";
    return;
  }
  const alive = snapshot.players.filter((player) => player.alive);
  const totalHealth = snapshot.players.reduce((sum, player) => sum + player.health, 0);
  const totalMax = snapshot.players.reduce((sum, player) => sum + player.maxHealth, 0) || 1;
  ui.time.textContent = formatTime(snapshot.elapsed);
  ui.level.textContent = snapshot.level.toString();
  ui.kills.textContent = snapshot.kills.toString();
  ui.health.textContent = `${alive.length}/${snapshot.players.length} alive`;
  ui.healthFill.style.width = `${clamp(totalHealth / totalMax, 0, 1) * 100}%`;
  ui.xp.textContent = `${Math.floor(snapshot.xp)} / ${snapshot.xpNeeded}`;
  ui.xpFill.style.width = `${clamp(snapshot.xp / snapshot.xpNeeded, 0, 1) * 100}%`;
  ui.best.textContent = formatTime(snapshot.elapsed);
  ui.wins.textContent = `${snapshot.playerCount || 1} linked AI players`;
  ui.strategy.textContent = snapshot.draftTimer > 0 ? "Shared XP level-up: every AI is drafting at super speed." : "Host is simulating the room and streaming the fight.";
  updateLoadout(snapshot);
  renderEventLog(snapshot.eventLog || []);
}

function updateLoadout(snapshot) {
  ui.loadout.innerHTML = "";
  snapshot.players.forEach((player) => {
    Object.values(player.weapons || {}).forEach((weapon) => {
      if (weapon.level <= 0) return;
      const chip = document.createElement("div");
      chip.className = "weapon-chip";
      chip.style.borderColor = player.color;
      chip.innerHTML = `<strong>${player.name}: ${weapon.name}</strong><span>Rank ${weapon.level}</span>`;
      ui.loadout.appendChild(chip);
    });
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
  drawWorld();
  const snapshot = state.render;
  if (!snapshot) return;
  drawGems(snapshot);
  drawProjectiles(snapshot);
  drawEnemies(snapshot);
  drawPlayers(snapshot);
}

function drawWorld() {
  ctx.clearRect(0, 0, width, height);
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#080a17");
  gradient.addColorStop(0.55, "#09111b");
  gradient.addColorStop(1, "#06070d");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  drawMoon();
  drawCastle();
  drawGroundGrid(cameraForRender(state.render));
}

function drawMoon() {
  const mx = width * 0.72;
  const my = height * 0.18;
  const glow = ctx.createRadialGradient(mx, my, 10, mx, my, 190);
  glow.addColorStop(0, "rgba(200, 246, 255, 0.78)");
  glow.addColorStop(0.22, "rgba(73, 244, 255, 0.18)");
  glow.addColorStop(1, "rgba(73, 244, 255, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(mx, my, 190, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "rgba(233, 252, 255, 0.92)";
  ctx.beginPath();
  ctx.arc(mx, my, 38, 0, TAU);
  ctx.fill();
}

function drawCastle() {
  const cam = cameraForRender(state.render);
  ctx.save();
  ctx.translate(-cam.x * 0.06, 0);
  ctx.fillStyle = "rgba(5, 6, 12, 0.72)";
  const baseY = height * 0.28;
  for (let i = -1; i < 10; i += 1) {
    const x = i * 220;
    ctx.fillRect(x, baseY + 80, 170, height);
    ctx.fillRect(x + 52, baseY, 66, 110);
    ctx.beginPath();
    ctx.moveTo(x + 52, baseY);
    ctx.lineTo(x + 85, baseY - 46);
    ctx.lineTo(x + 118, baseY);
    ctx.fill();
  }
  ctx.restore();
}

function drawGroundGrid(cam) {
  ctx.save();
  ctx.translate(-cam.x, -cam.y);
  ctx.strokeStyle = "rgba(73, 244, 255, 0.065)";
  ctx.lineWidth = 1;
  const step = 120;
  for (let x = Math.floor(cam.x / step) * step; x <= cam.x + width + step; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, cam.y);
    ctx.lineTo(x, cam.y + height + step);
    ctx.stroke();
  }
  for (let y = Math.floor(cam.y / step) * step; y <= cam.y + height + step; y += step) {
    ctx.beginPath();
    ctx.moveTo(cam.x, y);
    ctx.lineTo(cam.x + width + step, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawGems(snapshot) {
  snapshot.gems.forEach((gem) => {
    const p = worldToScreen(gem, snapshot);
    drawGlow(p.x, p.y, 28, "rgba(73, 244, 255, 0.55)", 0.45);
    ctx.fillStyle = "#49f4ff";
    ctx.beginPath();
    ctx.arc(p.x, p.y, gem.radius, 0, TAU);
    ctx.fill();
  });
}

function drawProjectiles(snapshot) {
  snapshot.pulses.forEach((pulse) => {
    const p = worldToScreen(pulse, snapshot);
    ctx.save();
    ctx.globalAlpha = 1 - pulse.age / pulse.life;
    ctx.strokeStyle = pulse.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(p.x, p.y, pulse.radius, 0, TAU);
    ctx.stroke();
    ctx.restore();
  });
  snapshot.projectiles.forEach((shot) => {
    const p = worldToScreen(shot, snapshot);
    drawGlow(p.x, p.y, shot.radius * 4, shot.color, 0.58);
    ctx.fillStyle = shot.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, shot.radius, 0, TAU);
    ctx.fill();
  });
}

function drawEnemies(snapshot) {
  snapshot.enemies.forEach((enemy) => {
    const p = worldToScreen(enemy, snapshot);
    if (p.x < -90 || p.y < -90 || p.x > width + 90 || p.y > height + 90) return;
    drawGlow(p.x, p.y, enemy.radius * (enemy.boss ? 3.2 : 2.2), enemy.color, enemy.boss ? 0.34 : 0.22);
    ctx.fillStyle = enemy.color;
    ctx.strokeStyle = enemy.boss ? "#ffd166" : "rgba(255,255,255,0.7)";
    ctx.lineWidth = enemy.boss ? 3 : 1.5;
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, enemy.radius * 1.1, enemy.radius * 0.86, 0, 0, TAU);
    ctx.fill();
    ctx.stroke();
  });
}

function drawPlayers(snapshot) {
  snapshot.players.forEach((player) => {
    const p = worldToScreen(player, snapshot);
    drawGlow(p.x, p.y, 54, player.color, player.alive ? 0.4 : 0.16);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.globalAlpha = player.alive ? 1 : 0.35;
    ctx.fillStyle = "#0b1222";
    ctx.strokeStyle = player.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(-12, 16);
    ctx.lineTo(-8, 0);
    ctx.lineTo(-12, -16);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.fillStyle = player.color;
    ctx.font = "900 12px Segoe UI, system-ui";
    ctx.textAlign = "center";
    ctx.fillText(player.name, p.x, p.y - 26);
  });
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
  const focus = alive.length ? alive : players;
  const x = focus.length ? focus.reduce((sum, player) => sum + player.x, 0) / focus.length : WORLD.width / 2;
  const y = focus.length ? focus.reduce((sum, player) => sum + player.y, 0) / focus.length : WORLD.height / 2;
  return { x: clamp(x - width / 2, 0, Math.max(0, WORLD.width - width)), y: clamp(y - height / 2, 0, Math.max(0, WORLD.height - height)) };
}

function worldToScreen(entity, snapshot) {
  const cam = cameraForRender(snapshot);
  return { x: entity.x - cam.x, y: entity.y - cam.y };
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
