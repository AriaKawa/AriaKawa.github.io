export const TICK_RATE = 30;
export const SNAPSHOT_RATE = 15;
export const WORLD = { w: 5200, h: 5200 };
export const MAX_LEVEL = 45;
export const MAX_STAT_POINTS = 33;
export const BOT_TARGET_COUNT = 12;
export const SHAPE_TARGET_COUNT = 220;
export const TAU = Math.PI * 2;

export const STAT_KEYS = [
  "regen",
  "maxHealth",
  "bodyDamage",
  "bulletSpeed",
  "penetration",
  "bulletDamage",
  "reload",
  "moveSpeed",
];

export const STATS = {
  regen: { label: "Health Regen", short: "Health Regen", color: "#28f0a6" },
  maxHealth: { label: "Health", short: "Health", color: "#5de0ff" },
  bodyDamage: { label: "Melee Damage", short: "Melee Damage", color: "#ff6b85" },
  bulletSpeed: { label: "Bullet Speed", short: "Bullet Speed", color: "#ffe45e" },
  penetration: { label: "Bullet Health", short: "Bullet Health", color: "#8eb9ff" },
  bulletDamage: { label: "Damage", short: "Damage", color: "#c084ff" },
  reload: { label: "Attack Speed", short: "Attack Speed", color: "#ff8cf3" },
  moveSpeed: { label: "Movement Speed", short: "Movement Speed", color: "#ffbd72" },
};

export const STAT_PRESETS = {
  glass: { name: "Glass Cannon", stats: { bulletSpeed: 6, penetration: 7, bulletDamage: 7, reload: 7, moveSpeed: 6 } },
  drone: { name: "Drone Commander", stats: { maxHealth: 2, bulletSpeed: 5, penetration: 7, bulletDamage: 7, reload: 6, moveSpeed: 6 } },
  ram: { name: "Ramming Core", stats: { regen: 5, maxHealth: 7, bodyDamage: 7, moveSpeed: 7 } },
  storm: { name: "Bullet Storm", stats: { penetration: 6, bulletDamage: 6, reload: 7, moveSpeed: 7, bulletSpeed: 7 } },
  trap: { name: "Trap Fortress", stats: { maxHealth: 4, penetration: 7, bulletDamage: 7, reload: 7, moveSpeed: 3 } },
  jet: { name: "Recoil Jet", stats: { bulletSpeed: 5, penetration: 5, bulletDamage: 5, reload: 7, moveSpeed: 7, maxHealth: 4 } },
};

export const LEVEL_XP = Array.from({ length: MAX_LEVEL + 1 }, (_, level) => {
  if (level <= 1) return 0;
  return Math.floor(26 * Math.pow(level - 1, 1.62) + level * 9);
});

export const SHAPES = {
  square: { sides: 4, hp: 18, xp: 12, radius: 18, color: "#ffe45e", stroke: "#9f8b2d", drift: 22 },
  triangle: { sides: 3, hp: 42, xp: 35, radius: 23, color: "#ff7086", stroke: "#a33348", drift: 26 },
  pentagon: { sides: 5, hp: 125, xp: 120, radius: 33, color: "#6f8dff", stroke: "#3d55b8", drift: 14 },
  alphaPentagon: { sides: 5, hp: 1200, xp: 1800, radius: 68, color: "#6f8dff", stroke: "#314aa8", drift: 6 },
  greenSquare: { sides: 4, hp: 26, xp: 180, radius: 19, color: "#65ff9a", stroke: "#229e55", drift: 26 },
  greenTriangle: { sides: 3, hp: 54, xp: 420, radius: 24, color: "#65ff9a", stroke: "#229e55", drift: 28 },
  greenPentagon: { sides: 5, hp: 180, xp: 1800, radius: 35, color: "#65ff9a", stroke: "#229e55", drift: 14 },
  smallCrasher: { sides: 3, hp: 20, xp: 25, radius: 15, color: "#ff5ad7", stroke: "#9d3190", drift: 82, hostile: true },
  largeCrasher: { sides: 3, hp: 58, xp: 70, radius: 24, color: "#ff5ad7", stroke: "#9d3190", drift: 64, hostile: true },
};

export const BOSSES = {
  guardian: { name: "Guardian", hp: 1900, radius: 86, color: "#ff5ad7", sides: 3, xp: 3200, kind: "drone" },
  defender: { name: "Defender", hp: 2200, radius: 88, color: "#ff6464", sides: 3, xp: 3400, kind: "trap" },
  summoner: { name: "Summoner", hp: 2100, radius: 88, color: "#ffe45e", sides: 4, xp: 3400, kind: "drone" },
  fallenOverlord: { name: "Fallen Overlord", hp: 2400, radius: 82, color: "#c9d1dc", sides: 48, xp: 3800, kind: "drone" },
  fallenBooster: { name: "Fallen Booster", hp: 2600, radius: 82, color: "#c9d1dc", sides: 48, xp: 3800, kind: "ram" },
};

const baseBarrel = { angle: 0, offset: 0, width: 22, length: 52, reload: 1, damage: 1, speed: 1, size: 1, recoil: 1, spread: 0, type: "bullet" };
const barrel = (options) => ({ ...baseBarrel, ...options });

export const TANKS = {
  basic: {
    name: "Basic",
    tier: 1,
    color: "#39d5ff",
    body: 28,
    fov: 1,
    barrels: [barrel({})],
    upgrades: ["twin", "sniper", "machineGun", "flankGuard"],
  },
  twin: {
    name: "Twin",
    tier: 2,
    body: 29,
    barrels: [barrel({ offset: -11, damage: 0.82 }), barrel({ offset: 11, damage: 0.82 })],
    upgrades: ["tripleShot", "quadTank", "twinFlank"],
  },
  sniper: {
    name: "Sniper",
    tier: 2,
    body: 29,
    fov: 1.16,
    barrels: [barrel({ length: 70, width: 20, speed: 1.45, reload: 0.72 })],
    upgrades: ["assassin", "overseer", "hunter", "trapper"],
  },
  machineGun: {
    name: "Machine Gun",
    tier: 2,
    body: 30,
    barrels: [barrel({ length: 54, width: 30, reload: 1.55, damage: 0.78, spread: 0.16, recoil: 0.72 })],
    upgrades: ["destroyer", "gunner", "shotgun", "sprayer"],
  },
  flankGuard: {
    name: "Flank Guard",
    tier: 2,
    body: 29,
    barrels: [barrel({}), barrel({ angle: Math.PI, width: 18, length: 42, damage: 0.65 })],
    upgrades: ["triAngle", "quadTank", "twinFlank", "auto3"],
  },
  tripleShot: {
    name: "Triple Shot",
    tier: 3,
    body: 31,
    barrels: [barrel({ angle: -0.28, damage: 0.72 }), barrel({ damage: 0.72 }), barrel({ angle: 0.28, damage: 0.72 })],
    upgrades: ["triplet", "pentaShot", "spreadShot"],
  },
  quadTank: {
    name: "Quad Tank",
    tier: 3,
    body: 31,
    barrels: [0, Math.PI / 2, Math.PI, -Math.PI / 2].map((angle) => barrel({ angle, damage: 0.72, recoil: 0.2 })),
    upgrades: ["octoTank", "auto5"],
  },
  twinFlank: {
    name: "Twin Flank",
    tier: 3,
    body: 31,
    barrels: [barrel({ offset: -10, damage: 0.76 }), barrel({ offset: 10, damage: 0.76 }), barrel({ angle: Math.PI, offset: -10, damage: 0.76 }), barrel({ angle: Math.PI, offset: 10, damage: 0.76 })],
    upgrades: ["tripleTwin", "battleship"],
  },
  assassin: {
    name: "Assassin",
    tier: 3,
    body: 30,
    fov: 1.28,
    barrels: [barrel({ length: 82, width: 19, speed: 1.72, reload: 0.58, damage: 1.05 })],
    upgrades: ["ranger", "stalker"],
  },
  overseer: {
    name: "Overseer",
    tier: 3,
    body: 31,
    droneLimit: 8,
    barrels: [barrel({ angle: Math.PI / 2, type: "drone", width: 26, length: 38 }), barrel({ angle: -Math.PI / 2, type: "drone", width: 26, length: 38 })],
    upgrades: ["overlord", "necromancer", "manager", "factory"],
  },
  hunter: {
    name: "Hunter",
    tier: 3,
    body: 30,
    fov: 1.18,
    barrels: [barrel({ length: 78, width: 25, speed: 1.45, reload: 0.7, damage: 0.92, burst: 2 })],
    upgrades: ["predator", "streamliner"],
  },
  trapper: {
    name: "Trapper",
    tier: 3,
    body: 30,
    barrels: [barrel({ type: "trap", length: 45, width: 28, reload: 0.72, damage: 1.35, speed: 0.62, size: 1.25 })],
    upgrades: ["autoTrapper", "overtrapper", "megaTrapper", "gunnerTrapper"],
  },
  destroyer: {
    name: "Destroyer",
    tier: 3,
    body: 32,
    barrels: [barrel({ length: 66, width: 42, reload: 0.38, damage: 4.4, speed: 0.72, size: 2.2, recoil: 2.1 })],
    upgrades: ["annihilator", "hybrid"],
  },
  gunner: {
    name: "Gunner",
    tier: 3,
    body: 30,
    barrels: [-13, -4, 5, 14].map((offset) => barrel({ offset, width: 11, length: 58, reload: 2.6, damage: 0.38, size: 0.66, recoil: 0.25 })),
    upgrades: ["autoGunner", "streamliner", "gunnerTrapper"],
  },
  shotgun: {
    name: "Shotgun",
    tier: 3,
    body: 31,
    barrels: [barrel({ width: 38, length: 58, reload: 0.42, damage: 0.48, speed: 1.25, spread: 0.38, pellets: 10, recoil: 1.4 })],
    upgrades: ["pelletShot", "dualBarrel"],
  },
  sprayer: {
    name: "Sprayer",
    tier: 4,
    body: 33,
    barrels: [barrel({ width: 34, length: 60, reload: 1.7, damage: 0.72, spread: 0.12 }), barrel({ width: 12, length: 72, reload: 2.8, damage: 0.28, size: 0.62 })],
  },
  triAngle: {
    name: "Tri-Angle",
    tier: 3,
    body: 31,
    barrels: [barrel({}), barrel({ angle: Math.PI + 0.42, width: 17, length: 45, damage: 0.25, recoil: 1.6 }), barrel({ angle: Math.PI - 0.42, width: 17, length: 45, damage: 0.25, recoil: 1.6 })],
    upgrades: ["booster", "fighter"],
  },
  auto3: {
    name: "Auto 3",
    tier: 3,
    body: 31,
    autoTurrets: 3,
    barrels: [],
    upgrades: ["auto5", "autoGunner"],
  },
  smasher: {
    name: "Smasher",
    tier: 3,
    body: 34,
    smasher: true,
    fov: 1.12,
    barrels: [],
    upgrades: ["landmine", "autoSmasher", "spike"],
  },
  triplet: { name: "Triplet", tier: 4, body: 33, barrels: [barrel({ offset: -13, damage: 0.82 }), barrel({ damage: 0.82, length: 62 }), barrel({ offset: 13, damage: 0.82 })] },
  pentaShot: { name: "Penta Shot", tier: 4, body: 33, barrels: [-0.42, -0.2, 0, 0.2, 0.42].map((angle) => barrel({ angle, damage: 0.68, recoil: 0.65 })) },
  spreadShot: { name: "Spread Shot", tier: 4, body: 33, barrels: [-0.55, -0.31, -0.13, 0, 0.13, 0.31, 0.55].map((angle, index) => barrel({ angle, width: index === 3 ? 22 : 13, damage: index === 3 ? 0.95 : 0.34, size: index === 3 ? 1 : 0.58, reload: index === 3 ? 1 : 1.65 })) },
  octoTank: { name: "Octo Tank", tier: 4, body: 33, barrels: Array.from({ length: 8 }, (_, i) => barrel({ angle: i * TAU / 8, damage: 0.58, recoil: 0.15 })) },
  auto5: { name: "Auto 5", tier: 4, body: 33, autoTurrets: 5, barrels: [] },
  tripleTwin: { name: "Triple Twin", tier: 4, body: 33, barrels: [0, TAU / 3, -TAU / 3].flatMap((angle) => [barrel({ angle, offset: -9, damage: 0.66 }), barrel({ angle, offset: 9, damage: 0.66 })]) },
  battleship: { name: "Battleship", tier: 4, body: 33, droneLimit: 10, barrels: [barrel({ angle: 0.45, type: "drone" }), barrel({ angle: -0.45, type: "drone" }), barrel({ angle: Math.PI + 0.45, type: "drone" }), barrel({ angle: Math.PI - 0.45, type: "drone" })] },
  ranger: { name: "Ranger", tier: 4, body: 32, fov: 1.42, barrels: [barrel({ length: 95, width: 19, speed: 1.92, reload: 0.5, damage: 1.12 })] },
  stalker: { name: "Stalker", tier: 4, body: 32, fov: 1.32, invisible: true, barrels: [barrel({ length: 82, width: 19, speed: 1.72, reload: 0.58, damage: 1.12 })] },
  predator: { name: "Predator", tier: 4, body: 32, fov: 1.36, barrels: [barrel({ length: 86, width: 28, speed: 1.6, reload: 0.52, damage: 0.95, burst: 3 })] },
  overlord: { name: "Overlord", tier: 4, body: 33, droneLimit: 8, barrels: [0, Math.PI / 2, Math.PI, -Math.PI / 2].map((angle) => barrel({ angle, type: "drone" })) },
  necromancer: { name: "Necromancer", tier: 4, body: 33, droneLimit: 16, barrels: [barrel({ type: "drone" })], necromancer: true },
  manager: { name: "Manager", tier: 4, body: 33, droneLimit: 8, invisible: true, barrels: [barrel({ type: "drone" })] },
  factory: { name: "Factory", tier: 4, body: 34, droneLimit: 6, barrels: [barrel({ type: "drone", damage: 1.35, size: 1.35 })] },
  autoTrapper: { name: "Auto Trapper", tier: 4, body: 33, autoTurrets: 1, barrels: [barrel({ type: "trap", length: 45, width: 28, reload: 0.72, damage: 1.35, speed: 0.62, size: 1.25 })] },
  overtrapper: { name: "Overtrapper", tier: 4, body: 33, droneLimit: 4, barrels: [barrel({ type: "trap", reload: 0.74, damage: 1.2 }), barrel({ angle: Math.PI / 2, type: "drone" }), barrel({ angle: -Math.PI / 2, type: "drone" })] },
  megaTrapper: { name: "Mega Trapper", tier: 4, body: 33, barrels: [barrel({ type: "trap", length: 56, width: 38, reload: 0.5, damage: 2.4, speed: 0.5, size: 1.8 })] },
  gunnerTrapper: { name: "Gunner Trapper", tier: 4, body: 33, barrels: [barrel({ offset: -8, width: 12, reload: 2.2, damage: 0.44 }), barrel({ offset: 8, width: 12, reload: 2.2, damage: 0.44 }), barrel({ angle: Math.PI, type: "trap", damage: 1.15 })] },
  annihilator: { name: "Annihilator", tier: 4, body: 34, barrels: [barrel({ length: 74, width: 52, reload: 0.31, damage: 5.4, speed: 0.68, size: 2.55, recoil: 2.6 })] },
  hybrid: { name: "Hybrid", tier: 4, body: 34, droneLimit: 2, barrels: [barrel({ length: 68, width: 44, reload: 0.36, damage: 4.4, speed: 0.72, size: 2.25, recoil: 2.1 }), barrel({ type: "drone", damage: 0.9 })] },
  autoGunner: { name: "Auto Gunner", tier: 4, body: 33, autoTurrets: 1, barrels: [-12, -4, 4, 12].map((offset) => barrel({ offset, width: 11, length: 58, reload: 2.5, damage: 0.38, size: 0.66, recoil: 0.25 })) },
  streamliner: { name: "Streamliner", tier: 4, body: 32, fov: 1.18, barrels: [0, 8, 16, 24, 32].map((delay) => barrel({ width: 13, length: 68 - delay * 0.34, reload: 3.3, damage: 0.34, size: 0.64, delay })) },
  pelletShot: { name: "Pellet Shot", tier: 4, body: 33, barrels: [barrel({ width: 46, length: 60, reload: 0.34, damage: 0.32, speed: 1.35, spread: 0.52, pellets: 18, recoil: 1.7 })] },
  dualBarrel: { name: "Dual-Barrel", tier: 4, body: 33, barrels: [barrel({ offset: -13, width: 28, length: 58, reload: 0.44, damage: 0.46, speed: 1.2, spread: 0.32, pellets: 8 }), barrel({ offset: 13, width: 28, length: 58, reload: 0.44, damage: 0.46, speed: 1.2, spread: 0.32, pellets: 8 })] },
  booster: { name: "Booster", tier: 4, body: 33, barrels: [barrel({}), barrel({ angle: Math.PI + 0.52, width: 16, length: 45, damage: 0.22, recoil: 1.8 }), barrel({ angle: Math.PI - 0.52, width: 16, length: 45, damage: 0.22, recoil: 1.8 }), barrel({ angle: Math.PI + 0.22, width: 14, length: 42, damage: 0.18, recoil: 1.5 }), barrel({ angle: Math.PI - 0.22, width: 14, length: 42, damage: 0.18, recoil: 1.5 })] },
  fighter: { name: "Fighter", tier: 4, body: 33, barrels: [barrel({}), barrel({ angle: Math.PI + 0.42, width: 16, length: 45, damage: 0.24, recoil: 1.5 }), barrel({ angle: Math.PI - 0.42, width: 16, length: 45, damage: 0.24, recoil: 1.5 }), barrel({ angle: Math.PI / 2, width: 14, length: 38, damage: 0.45 }), barrel({ angle: -Math.PI / 2, width: 14, length: 38, damage: 0.45 })] },
  landmine: { name: "Landmine", tier: 4, body: 36, smasher: true, invisible: true, barrels: [] },
  autoSmasher: { name: "Auto Smasher", tier: 4, body: 36, smasher: true, autoTurrets: 1, barrels: [] },
  spike: { name: "Spike", tier: 4, body: 38, smasher: true, spike: true, barrels: [] },
  autoTank: { name: "Auto Tank", tier: 4, body: 33, autoTurrets: 1, barrels: [barrel({})] },
};

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function angleTo(a, b) {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

export function normalizeAngle(angle) {
  let value = angle % TAU;
  if (value < -Math.PI) value += TAU;
  if (value > Math.PI) value -= TAU;
  return value;
}

export function rand(min, max, random = Math.random) {
  return min + random() * (max - min);
}

export function levelForXp(xp) {
  let level = 1;
  for (let i = 2; i <= MAX_LEVEL; i += 1) {
    if (xp >= LEVEL_XP[i]) level = i;
    else break;
  }
  return level;
}

export function statPointsForLevel(level) {
  let points = 0;
  for (let i = 2; i <= Math.min(level, MAX_LEVEL); i += 1) {
    if (i <= 28 || i === 30 || (i > 30 && i % 3 === 0)) points += 1;
  }
  return Math.min(MAX_STAT_POINTS, points);
}

export function maxStatForTank(tankId, statKey) {
  const tank = TANKS[tankId] || TANKS.basic;
  if (tank.smasher && tankId !== "autoSmasher" && !["regen", "maxHealth", "bodyDamage", "moveSpeed"].includes(statKey)) return 0;
  return tank.smasher ? 10 : 7;
}

export function spentStats(stats) {
  return STAT_KEYS.reduce((sum, key) => sum + (stats[key] || 0), 0);
}

export function availableUpgrades(player) {
  const tank = TANKS[player.tank] || TANKS.basic;
  const upgrades = [];
  if (player.level >= 15 && tank.tier === 1) upgrades.push(...(tank.upgrades || []));
  if (player.level >= 30 && tank.tier === 2) upgrades.push(...(tank.upgrades || []));
  if (player.level >= 30 && player.tank === "basic") upgrades.push("smasher");
  if (player.level >= 45 && tank.tier === 3) upgrades.push(...(tank.upgrades || []));
  if (player.level >= 45 && player.tank === "basic") upgrades.push("autoTank");
  if (player.level >= 45 && player.tank === "machineGun") upgrades.push("sprayer");
  return [...new Set(upgrades)].filter(Boolean);
}

export function canUpgradeTank(player, tankId) {
  return availableUpgrades(player).includes(tankId);
}

export function derivedStats(player) {
  const stats = player.stats || {};
  const tank = TANKS[player.tank] || TANKS.basic;
  const levelScale = 1 + Math.max(0, player.level - 1) * 0.008;
  const maxHealth = (100 + (stats.maxHealth || 0) * 22) * levelScale * (tank.smasher ? 1.28 : 1);
  const bodyDamage = (10 + (stats.bodyDamage || 0) * 4.2) * (tank.smasher ? 1.65 : 1) + (tank.spike ? 26 : 0);
  return {
    radius: (tank.body || 28) + Math.max(0, player.level - 1) * 0.16,
    maxHealth,
    bodyDamage,
    collisionResistance: tank.smasher ? 0.48 : 1,
    regenPerSecond: (stats.regen || 0) * 0.95 + 5,
    activeRegenPerSecond: (stats.regen || 0) * 1.45,
    moveSpeed: (168 + (stats.moveSpeed || 0) * 12) * (tank.smasher ? 1.09 : 1),
    bulletSpeed: 390 + (stats.bulletSpeed || 0) * 43,
    bulletDamage: 18 + (stats.bulletDamage || 0) * 5.3,
    penetration: 24 + (stats.penetration || 0) * 8,
    reload: 1 + (stats.reload || 0) * 0.115,
    fov: tank.fov || 1,
  };
}

export function makeStats() {
  return Object.fromEntries(STAT_KEYS.map((key) => [key, 0]));
}

export function makeId(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`;
}

export function validateClientMessage(message) {
  if (!message || typeof message !== "object") return false;
  if (message.type === "join") return typeof message.name === "string" && message.name.length <= 22;
  if (message.type === "input") return typeof message.seq === "number" && typeof message.aim === "number";
  if (message.type === "upgradeStat") return STAT_KEYS.includes(message.stat);
  if (message.type === "upgradeTank") return typeof message.tank === "string" && Boolean(TANKS[message.tank]);
  if (message.type === "preset") return typeof message.preset === "string" && Boolean(STAT_PRESETS[message.preset]);
  if (message.type === "ping") return typeof message.now === "number";
  return false;
}

export function sanitizeName(name) {
  const normalized = String(name || "Pilot").replace(/\s+/g, " ").trim().slice(0, 18);
  return normalized || "Pilot";
}
