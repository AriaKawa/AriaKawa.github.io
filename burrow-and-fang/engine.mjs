export const VERSION = 1;
export const CLANS = ["rats", "wolves"];
export const XP = [0, 0, 2, 6, 10, 18, 28, 42, 60];
export const ODDS = {
  3: [75, 25, 0, 0, 0],
  4: [55, 30, 15, 0, 0],
  5: [40, 35, 20, 5, 0],
  6: [28, 35, 25, 10, 2],
  7: [20, 30, 30, 17, 3],
  8: [15, 20, 30, 27, 8],
};
const def = (id, name, cost, kind, art, stats, detail) => ({
  id,
  name,
  cost,
  kind,
  art,
  ...stats,
  detail,
});
export const CATALOG = {
  rats: [
    def(
      "warren",
      "Warren",
      1,
      "unit",
      1,
      { unit: "rat", count: 5 },
      "5 knife rats",
    ),
    def(
      "scout",
      "Scout Post",
      2,
      "unit",
      2,
      { unit: "scout", count: 2 },
      "2 ranged scouts",
    ),
    def(
      "mage",
      "Mage Tower",
      3,
      "unit",
      3,
      { unit: "mage", count: 1 },
      "Poison splash",
    ),
    def(
      "guard",
      "Iron Gate",
      4,
      "unit",
      4,
      { unit: "guard", count: 2 },
      "2 armored rats",
    ),
    def(
      "king",
      "Rat Court",
      5,
      "unit",
      0,
      { unit: "king", count: 1 },
      "Rat King · summons a swarm",
    ),
    def(
      "market",
      "Scrap Market",
      1,
      "economy",
      5,
      { income: 1 },
      "+1 gold each round",
    ),
    def(
      "farm",
      "Spore Farm",
      2,
      "economy",
      6,
      { income: 2 },
      "+2 gold each round",
    ),
    def(
      "totem",
      "Plague Bell",
      2,
      "support",
      7,
      { buff: "haste" },
      "Nearby units: +20% attack speed",
    ),
    def(
      "well",
      "Alchemy Vat",
      3,
      "support",
      8,
      { buff: "heal" },
      "Nearby units: +25% health",
    ),
  ],
  wolves: [
    def(
      "warren",
      "Wolf Den",
      1,
      "unit",
      1,
      { unit: "wolf", count: 2 },
      "2 wolves · stronger together",
    ),
    def(
      "scout",
      "Ranger Post",
      2,
      "unit",
      2,
      { unit: "ranger", count: 1 },
      "1 ranged ranger",
    ),
    def(
      "mage",
      "Moon Shrine",
      3,
      "unit",
      3,
      { unit: "shaman", count: 1 },
      "Moonburst · heals the pack",
    ),
    def(
      "guard",
      "Fang Hall",
      4,
      "unit",
      4,
      { unit: "guardian", count: 1 },
      "1 armored fangguard",
    ),
    def(
      "king",
      "Alpha Lodge",
      5,
      "unit",
      0,
      { unit: "alpha", count: 1 },
      "Pack Leader · nearby allies +35% damage",
    ),
    def(
      "market",
      "Fur Market",
      1,
      "economy",
      5,
      { income: 1 },
      "+1 gold each round",
    ),
    def(
      "farm",
      "Smokehouse",
      2,
      "economy",
      6,
      { income: 2 },
      "+2 gold each round",
    ),
    def(
      "totem",
      "Howling Totem",
      2,
      "support",
      7,
      { buff: "haste" },
      "Nearby units: +20% attack speed",
    ),
    def(
      "well",
      "Moonwell",
      3,
      "support",
      8,
      { buff: "heal" },
      "Nearby units: +25% health",
    ),
  ],
};
export const UNIT = {
  rat: {
    hp: 48,
    damage: 9,
    speed: 55,
    range: 28,
    rate: 0.85,
    art: 0,
    size: 33,
  },
  scout: {
    hp: 72,
    damage: 16,
    speed: 52,
    range: 170,
    rate: 1.25,
    art: 1,
    size: 37,
    projectile: "arrow",
  },
  mage: {
    hp: 145,
    damage: 38,
    speed: 37,
    range: 155,
    rate: 1.8,
    art: 2,
    size: 43,
    projectile: "poison",
    splash: 75,
  },
  guard: {
    hp: 200,
    damage: 18,
    speed: 34,
    range: 27,
    rate: 1.2,
    art: 0,
    size: 44,
    armor: 0.3,
  },
  king: {
    hp: 360,
    damage: 32,
    speed: 40,
    range: 32,
    rate: 1.0,
    art: 3,
    size: 54,
    summon: true,
  },
  wolf: {
    hp: 108,
    damage: 19,
    speed: 60,
    range: 29,
    rate: 1.1,
    art: 0,
    size: 44,
  },
  ranger: {
    hp: 112,
    damage: 30,
    speed: 48,
    range: 185,
    rate: 1.2,
    art: 1,
    size: 47,
    projectile: "arrow",
  },
  shaman: {
    hp: 142,
    damage: 29,
    speed: 36,
    range: 160,
    rate: 1.8,
    art: 2,
    size: 50,
    projectile: "moon",
    splash: 55,
    healer: true,
  },
  guardian: {
    hp: 330,
    damage: 31,
    speed: 31,
    range: 33,
    rate: 1.3,
    art: 0,
    size: 59,
    armor: 0.35,
  },
  alpha: {
    hp: 460,
    damage: 42,
    speed: 44,
    range: 36,
    rate: 1.25,
    art: 3,
    size: 66,
    leader: true,
  },
};
export const definition = (clan, id) => CATALOG[clan]?.find((d) => d.id === id);
export const hexDistance = (a, b) =>
  (Math.abs(a.q - b.q) +
    Math.abs(a.r - b.r) +
    Math.abs(a.q + a.r - b.q - b.r)) /
  2;
export const CELLS = [];
for (let q = -3; q <= 3; q++)
  for (let r = -3; r <= 3; r++)
    if (hexDistance({ q, r }, { q: 0, r: 0 }) <= 3) CELLS.push({ q, r });
export function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s += 0x6d2b79f5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function random(s) {
  s.seed = (Math.imul(s.seed, 1664525) + 1013904223) >>> 0;
  return s.seed / 4294967296;
}
export function makeBuilding(s, type, q = null, r = null, star = 1) {
  return { uid: ++s.nextId, type, q, r, star };
}
export function newGame(clan, seed = Date.now() >>> 0) {
  const s = {
    version: VERSION,
    clan,
    seed,
    nextId: 0,
    gold: 10,
    hp: 100,
    level: 3,
    xp: 0,
    round: 1,
    wins: 0,
    losses: 0,
    streak: 0,
    locked: false,
    phase: "build",
    buildings: [],
    rules: 3,
    shop: [],
    history: [],
    runId:
      seed.toString(36) + "-" + Math.floor(Math.random() * 1e9).toString(36),
  };
  s.buildings.push(
    makeBuilding(s, "warren", 1, 0),
    makeBuilding(s, "scout", 0, 1),
  );
  roll(s, true);
  s.shop[0] = "warren";
  s.shop[1] = "market";
  s.shop[2] = "totem";
  return s;
}
export function roll(s, free = false) {
  if (s.phase !== "build") return "Finish the battle first";
  if (!free && s.gold < 2) return "Need 2 gold";
  if (!free) s.gold -= 2;
  const odds = ODDS[s.level] || ODDS[8];
  s.shop = Array.from({ length: 4 }, () => {
    let n = random(s) * 100,
      tier = 1;
    for (const p of odds) {
      n -= p;
      if (n < 0) break;
      tier++;
    }
    const available = CATALOG[s.clan].filter(
      (d) => !s.buildings.some((b) => b.type === d.id && b.star >= 3),
    );
    const choices = available.filter((d) => d.cost === tier);
    return (
      (
        choices[Math.floor(random(s) * choices.length)] ||
        available[Math.floor(random(s) * available.length)]
      )?.id || null
    );
  });
  return null;
}
export const bench = (s) => s.buildings.filter((b) => b.q === null);
export const onBoard = (s) => s.buildings.filter((b) => b.q !== null);
export const armyBuildings = (s) =>
  onBoard(s).filter((b) => definition(s.clan, b.type).kind === "unit");
export const upgradeHue = (type) =>
  [
    "#d5acff",
    "#86e1ae",
    "#ffd181",
    "#89cafa",
    "#ff9eae",
    "#e5e78b",
    "#96e4dd",
    "#e8b894",
    "#c6b9ff",
  ][
    [
      "warren",
      "scout",
      "mage",
      "guard",
      "king",
      "market",
      "farm",
      "totem",
      "well",
    ].indexOf(type)
  ] || "#efca76";
export function migrateBuildings(s) {
  if (s.rules === 3) return;
  const kept = new Map();
  for (const b of [...s.buildings].sort(
    (a, b) => (a.q === null) - (b.q === null) || b.star - a.star,
  )) {
    const cost = definition(s.clan, b.type).cost;
    if (kept.has(b.type)) s.gold += cost * 3 ** (b.star - 1);
    else {
      kept.set(b.type, b);
      s.gold += cost * (3 ** (b.star - 1) - b.star);
    }
  }
  s.buildings = [...kept.values()];
  s.rules = 3;
}
export function buy(s, index) {
  if (s.phase !== "build") return { error: "Finish the battle first" };
  migrateBuildings(s);
  const d = definition(s.clan, s.shop[index]);
  if (!d) return { error: "Sold" };
  const existing = s.buildings.find((b) => b.type === d.id);
  if (existing?.star >= 3) return { error: "Maximum upgrade" };
  if (s.gold < d.cost) return { error: "Not enough gold" };
  if (!existing && bench(s).length >= 8) return { error: "Reserve is full" };
  s.gold -= d.cost;
  s.shop[index] = null;
  if (existing) {
    existing.star++;
    return { building: existing, merged: [existing.uid], upgraded: true };
  }
  const building = makeBuilding(s, d.id);
  s.buildings.push(building);
  return { building, merged: [], upgraded: false };
}
export function place(s, uid, q, r) {
  if (s.phase !== "build") return "Finish the battle first";
  const b = s.buildings.find((x) => x.uid === uid);
  if (!b) return "Choose a building";
  if (!CELLS.some((c) => c.q === q && c.r === r) || (q === 0 && r === 0))
    return "Choose an empty plot";
  const target = s.buildings.find(
    (x) => x.q === q && x.r === r && x.uid !== uid,
  );
  if (
    s.buildings.some((x) => x.uid !== uid && x.type === b.type && x.q !== null)
  )
    return "Upgrade the existing building";
  const type = definition(s.clan, b.type).kind;
  if (b.q === null) {
    const current = onBoard(s).filter(
      (x) => (definition(s.clan, x.type).kind === "unit") === (type === "unit"),
    ).length;
    const targetSame =
      target &&
      (definition(s.clan, target.type).kind === "unit") === (type === "unit");
    if (current - (targetSame ? 1 : 0) >= s.level)
      return type === "unit" ? "Army full · buy XP" : "Village full · buy XP";
  }
  if (target) {
    target.q = b.q;
    target.r = b.r;
  }
  b.q = q;
  b.r = r;
  return null;
}
export function stash(s, uid) {
  if (s.phase !== "build") return "Finish the battle first";
  if (bench(s).length >= 8) return "Reserve is full";
  const b = s.buildings.find((x) => x.uid === uid);
  if (b) {
    b.q = null;
    b.r = null;
  }
  return null;
}
export const sellPrice = (s, b) => definition(s.clan, b.type).cost * b.star;
export function sell(s, uid) {
  if (s.phase !== "build") return 0;
  const b = s.buildings.find((x) => x.uid === uid);
  if (!b) return 0;
  const gold = sellPrice(s, b);
  s.gold += gold;
  s.buildings = s.buildings.filter((x) => x !== b);
  return gold;
}
export function gainXP(s, n) {
  s.xp += n;
  while (s.level < 8 && s.xp >= XP[s.level]) {
    s.xp -= XP[s.level];
    s.level++;
  }
  if (s.level === 8) s.xp = 0;
}
export function buyXP(s) {
  if (s.phase !== "build") return "Finish the battle first";
  if (s.level >= 8) return "Maximum level";
  if (s.gold < 4) return "Need 4 gold";
  s.gold -= 4;
  gainXP(s, 4);
  return null;
}
export function income(s, won = false) {
  const economy = onBoard(s).reduce(
    (n, b) => n + (definition(s.clan, b.type).income || 0) * b.star,
    0,
  );
  const length = Math.abs(s.streak),
    streak = length >= 5 ? 3 : length >= 4 ? 2 : length >= 2 ? 1 : 0;
  return {
    base: 5,
    interest: Math.min(5, Math.floor(s.gold / 10)),
    economy,
    streak,
    victory: won ? 1 : 0,
  };
}
export function settle(s, result) {
  if (s.phase !== "battle") return null;
  const won = result.winner === 0,
    draw = result.winner === -1;
  s.streak = won ? Math.max(0, s.streak) + 1 : Math.min(0, s.streak) - 1;
  if (won) s.wins++;
  else {
    s.losses++;
    s.hp = Math.max(
      0,
      s.hp -
        (draw
          ? 5
          : 6 +
            Math.floor(s.round / 3) * 2 +
            Math.min(10, result.survivors || 0)),
    );
  }
  const earnings = income(s, won);
  s.gold += Object.values(earnings).reduce((a, b) => a + b, 0);
  gainXP(s, 2);
  s.history.push({ won, draw, round: s.round, earnings });
  s.phase = s.hp <= 0 || s.wins >= 10 || s.round >= 25 ? "end" : "result";
  s.lastResult = { won, draw, earnings };
  return s.lastResult;
}
export function nextRound(s) {
  if (s.phase !== "result") return;
  s.round++;
  s.phase = "build";
  migrateBuildings(s);
  s.opponent = null;
  if (!s.locked) roll(s, true);
}
export function snapshot(s) {
  return {
    version: VERSION,
    clan: s.clan,
    round: s.round,
    level: s.level,
    runId: s.runId,
    buildings: onBoard(s).map(({ type, q, r, star }) => ({ type, q, r, star })),
    created: Date.now(),
  };
}
export function validateSnapshot(v, round) {
  if (
    !v ||
    v.version !== VERSION ||
    !CLANS.includes(v.clan) ||
    v.round !== round ||
    !Number.isInteger(v.level) ||
    v.level < 3 ||
    v.level > 8 ||
    !Array.isArray(v.buildings) ||
    v.buildings.length > 16
  )
    return null;
  const occupied = new Set();
  let units = 0,
    other = 0;
  for (const b of v.buildings) {
    if (
      !b ||
      !definition(v.clan, b.type) ||
      !Number.isInteger(b.star) ||
      b.star < 1 ||
      b.star > 3 ||
      !CELLS.some((c) => c.q === b.q && c.r === b.r) ||
      (!b.q && !b.r)
    )
      return null;
    const key = b.q + "," + b.r;
    if (occupied.has(key)) return null;
    occupied.add(key);
    definition(v.clan, b.type).kind === "unit" ? units++ : other++;
  }
  if (!units || units > v.level || other > v.level) return null;
  return {
    version: VERSION,
    clan: v.clan,
    round,
    level: v.level,
    runId: String(v.runId || "").slice(0, 60),
    buildings: v.buildings.map((b) => ({
      type: b.type,
      q: b.q,
      r: b.r,
      star: b.star,
    })),
    created: Number(v.created) || 0,
  };
}
export function makeOpponent(s) {
  const r = rng(s.seed + s.round * 193),
    clan = r() > 0.5 ? "wolves" : "rats",
    level = Math.min(8, 3 + Math.floor(s.round / 3));
  const positions = [
    { q: -1, r: 0 },
    { q: 0, r: 1 },
    { q: -2, r: 1 },
    { q: 1, r: 0 },
    { q: 1, r: 1 },
    { q: -1, r: 2 },
    { q: 2, r: 0 },
    { q: -2, r: 2 },
  ];
  const b = [];
  const count = Math.min(level, 2 + Math.floor(s.round / 2));
  for (let i = 0; i < count; i++) {
    const type =
      i === 0
        ? "warren"
        : i === 1
          ? "scout"
          : i === 2
            ? "guard"
            : i === 3
              ? "mage"
              : s.round > 8 && i === 4
                ? "king"
                : r() > 0.4
                  ? "warren"
                  : "mage";
    const star =
      s.round >= 15
        ? 2 + (i === 0 && s.round >= 21 ? 1 : 0)
        : s.round >= 7 && i < Math.floor((s.round - 5) / 3)
          ? 2
          : 1;
    b.push({ type, star, ...positions[i] });
  }
  if (s.round >= 4)
    b.push({
      type: "totem",
      star: Math.min(3, 1 + Math.floor(s.round / 10)),
      q: 0,
      r: 2,
    });
  if (s.round >= 9) b.push({ type: "well", star: 1, q: 1, r: 2 });
  return {
    version: VERSION,
    clan,
    round: s.round,
    level,
    buildings: b,
    runId: "practice",
    created: 0,
  };
}
export const HEX_R = 54,
  HEX_Y = 0.92;
export function point(q, r, side = 0) {
  return {
    x: 455 + side * 890 + Math.sqrt(3) * HEX_R * (q + r / 2),
    y: 490 + HEX_R * 1.5 * r * HEX_Y,
  };
}
export function createBattle(own, enemy, seed) {
  const sim = {
    units: [],
    projectiles: [],
    events: [],
    time: 0,
    nextId: 0,
    done: false,
    winner: null,
    seed,
    random: rng(seed),
    summons: [0, 0],
  };
  [own, enemy].forEach((city, side) => {
    for (const b of city.buildings) {
      const d = definition(city.clan, b.type);
      if (!d || d.kind !== "unit" || b.q === null) continue;
      const pos = point(side === 0 ? b.q : -b.q, side === 0 ? b.r : -b.r, side);
      const supports = city.buildings.filter(
        (x) =>
          x.q !== null &&
          hexDistance(x, b) <= 1 &&
          definition(city.clan, x.type)?.kind === "support",
      );
      const haste = supports.reduce(
        (n, x) =>
          n +
          (definition(city.clan, x.type).buff === "haste" ? 0.2 * x.star : 0),
        0,
      );
      const health = supports.reduce(
        (n, x) =>
          n +
          (definition(city.clan, x.type).buff === "heal" ? 0.25 * x.star : 0),
        0,
      );
      for (let i = 0; i < d.count; i++)
        spawn(
          sim,
          d.unit,
          city.clan,
          side,
          pos.x + (i % 2) * 24 - 12,
          pos.y + Math.floor(i / 2) * 22,
          b.star,
          haste,
          health,
        );
    }
  });
  return sim;
}
function spawn(sim, type, clan, side, x, y, star = 1, haste = 0, health = 0) {
  const t = UNIT[type],
    power = [0, 1, 1.85, 3.5][star];
  const u = {
    ...t,
    id: ++sim.nextId,
    type,
    clan,
    side,
    x,
    y,
    star,
    maxHP: t.hp * power * (1 + Math.min(1, health)),
    hp: t.hp * power * (1 + Math.min(1, health)),
    damage: t.damage * power,
    rate: t.rate / (1 + Math.min(1, haste)),
    cooldown: sim.random() * 0.5,
    cast: 3 + sim.random() * 2,
    poison: 0,
    poisonPower: 0,
    flash: 0,
    attack: 0,
    moving: false,
    facing: side === 0 ? 1 : -1,
    dead: 0,
    buff: 0,
  };
  sim.units.push(u);
  return u;
}
const distance = (a, b) => Math.hypot(a.x - b.x, (a.y - b.y) * 1.15);
function event(sim, type, x, y, color, extra = {}) {
  sim.events.push({
    type,
    x,
    y,
    color,
    life: type === "text" ? 0.8 : 0.55,
    max: type === "text" ? 0.8 : 0.55,
    ...extra,
  });
}
function hit(sim, u, damage, color = "#f4d99a") {
  if (u.hp <= 0) return;
  const n = damage * (1 - (u.armor || 0));
  u.hp = Math.max(0, u.hp - n);
  u.flash = 0.11;
  event(sim, "text", u.x, u.y - 22, color, { text: String(Math.round(n)) });
  if (u.hp <= 0) {
    u.dead = 0.7;
    event(sim, "death", u.x, u.y, u.side === 0 ? "#b9d88a" : "#d98282");
  }
}
function impact(sim, p) {
  const victims = sim.units.filter(
    (u) =>
      u.hp > 0 &&
      u.side !== p.side &&
      (u.id === p.target || (p.splash && distance(u, p) < p.splash)),
  );
  for (const u of victims) {
    hit(
      sim,
      u,
      p.damage,
      p.kind === "poison"
        ? "#b9e979"
        : p.kind === "moon"
          ? "#9de6ef"
          : "#f0d9a0",
    );
    if (p.kind === "poison") {
      u.poison = 3;
      u.poisonPower = p.damage * 0.12;
    }
  }
  event(
    sim,
    p.kind === "arrow" ? "spark" : p.kind,
    p.x,
    p.y,
    p.kind === "poison" ? "#aeea6a" : "#a1e7ff",
    { radius: p.splash || 18 },
  );
}
export function stepBattle(sim, dt) {
  if (sim.done) return;
  dt = Math.min(0.05, dt);
  sim.time += dt;
  sim.events = sim.events.filter((e) => (e.life -= dt) > 0);
  const alive = sim.units.filter((u) => u.hp > 0);
  for (const u of sim.units) {
    u.flash = Math.max(0, u.flash - dt);
    u.attack = Math.max(0, u.attack - dt);
    if (u.hp <= 0) {
      u.dead = Math.max(0, u.dead - dt);
      continue;
    }
    u.cooldown -= dt;
    u.cast -= dt;
    u.moving = false;
    if (u.poison > 0) {
      u.poison -= dt;
      u.hp = Math.max(0, u.hp - u.poisonPower * dt);
      if (u.hp <= 0) {
        u.dead = 0.7;
        continue;
      }
    }
    const friends = alive.filter((v) => v.side === u.side && v.hp > 0),
      enemies = alive.filter((v) => v.side !== u.side && v.hp > 0);
    if (!enemies.length) continue;
    const pack =
      u.clan === "wolves"
        ? Math.min(
            3,
            friends.filter((v) => v !== u && distance(u, v) < 90).length,
          ) * 0.06
        : 0;
    u.buff =
      (friends.some((v) => v.leader && distance(u, v) < 165) ? 1.35 : 1) + pack;
    if (u.leader && u.cast <= 0) {
      event(sim, "howl", u.x, u.y, "#bceaff", { radius: 165 });
      u.cast = 4.5;
    }
    if (u.summon && u.cast <= 0 && sim.summons[u.side] < 16) {
      for (let i = 0; i < 3; i++)
        spawn(
          sim,
          "rat",
          u.clan,
          u.side,
          u.x + (sim.random() - 0.5) * 65,
          u.y + (sim.random() - 0.5) * 55,
          u.star,
        );
      sim.summons[u.side] += 3;
      event(sim, "summon", u.x, u.y, "#b5e76b", { radius: 48 });
      u.cast = 7;
    }
    if (u.healer && u.cast <= 0) {
      for (const f of friends)
        if (distance(u, f) < 150) f.hp = Math.min(f.maxHP, f.hp + 22 * u.star);
      event(sim, "heal", u.x, u.y, "#8bded2", { radius: 150 });
      u.cast = 5;
    }
    let target = enemies.reduce(
      (best, v) => (!best || distance(u, v) < distance(u, best) ? v : best),
      null,
    );
    if (!target) continue;
    const dx = target.x - u.x,
      dy = target.y - u.y,
      dist = distance(u, target);
    u.facing = dx >= 0 ? 1 : -1;
    if (dist > u.range) {
      let mx = dx,
        my = dy;
      // The whole meadow is traversable; approach across the full front.
      const len = Math.hypot(mx, my) || 1;
      u.x += (mx / len) * u.speed * dt;
      u.y += (my / len) * u.speed * dt;
      u.moving = true;
    } else if (u.cooldown <= 0) {
      u.cooldown = u.rate;
      u.attack = 0.38;
      const rage = sim.time > 45 ? 1 + (sim.time - 45) * 0.06 : 1;
      if (u.projectile) {
        sim.projectiles.push({
          x: u.x,
          y: u.y - 12,
          target: target.id,
          tx: target.x,
          ty: target.y,
          side: u.side,
          kind: u.projectile,
          damage: u.damage * u.buff * rage,
          splash: u.splash || 0,
          speed: u.projectile === "arrow" ? 410 : 270,
          life: 3,
        });
      } else {
        hit(sim, target, u.damage * u.buff * rage);
        event(
          sim,
          "slash",
          (u.x + target.x) / 2,
          (u.y + target.y) / 2,
          "#f2e1ba",
          { flip: u.facing },
        );
      }
    }
  }
  // Gentle separation keeps the swarm readable without blocking melee contact.
  const living = sim.units.filter((u) => u.hp > 0);
  for (let i = 0; i < living.length; i++)
    for (let j = i + 1; j < living.length; j++) {
      const a = living[i],
        b = living[j];
      const dx = a.x - b.x,
        dy = a.y - b.y,
        len = Math.hypot(dx, dy),
        min = a.side === b.side ? 18 : 15;
      if (len < min) {
        const angle = len > 0.001 ? Math.atan2(dy, dx) : (i + j) * 2.4,
          push = (min - len) * Math.min(0.4, dt * 5);
        a.x += Math.cos(angle) * push;
        a.y += Math.sin(angle) * push;
        b.x -= Math.cos(angle) * push;
        b.y -= Math.sin(angle) * push;
      }
    }
  for (const p of sim.projectiles) {
    p.life -= dt;
    const target = sim.units.find((u) => u.id === p.target && u.hp > 0);
    if (target) {
      p.tx = target.x;
      p.ty = target.y;
    }
    const dx = p.tx - p.x,
      dy = p.ty - p.y,
      len = Math.hypot(dx, dy);
    if (len < p.speed * dt + 5) {
      p.x = p.tx;
      p.y = p.ty;
      impact(sim, p);
      p.life = 0;
    } else {
      p.x += (dx / len) * p.speed * dt;
      p.y += (dy / len) * p.speed * dt;
    }
  }
  sim.projectiles = sim.projectiles.filter((p) => p.life > 0);
  const teams = [
    living.filter((u) => u.side === 0 && u.hp > 0),
    living.filter((u) => u.side === 1 && u.hp > 0),
  ];
  if (!teams[0].length || !teams[1].length || sim.time >= 75) {
    sim.done = true;
    sim.winner =
      !teams[0].length && !teams[1].length
        ? -1
        : !teams[0].length
          ? 1
          : !teams[1].length
            ? 0
            : -1;
    sim.survivors = sim.winner >= 0 ? teams[sim.winner].length : 0;
  }
}
export function simulate(own, enemy, seed) {
  const sim = createBattle(own, enemy, seed);
  for (let i = 0; i < 4600 && !sim.done; i++) stepBattle(sim, 1 / 60);
  return sim;
}
export function restore(raw) {
  try {
    const s = JSON.parse(raw);
    if (
      s.version !== VERSION ||
      !CLANS.includes(s.clan) ||
      !Number.isFinite(s.gold) ||
      s.gold < 0 ||
      s.gold > 1e6 ||
      !Number.isInteger(s.level) ||
      s.level < 3 ||
      s.level > 8 ||
      !Number.isInteger(s.round) ||
      s.round < 1 ||
      s.round > 25 ||
      !["build", "battle", "result", "end"].includes(s.phase) ||
      !Array.isArray(s.buildings) ||
      s.buildings.length > 24 ||
      !Array.isArray(s.shop) ||
      s.shop.length !== 4
    )
      return null;
    const ids = new Set(),
      plots = new Set();
    for (const b of s.buildings) {
      if (
        !Number.isInteger(b.uid) ||
        ids.has(b.uid) ||
        !definition(s.clan, b.type) ||
        !Number.isInteger(b.star) ||
        b.star < 1 ||
        b.star > 3
      )
        return null;
      ids.add(b.uid);
      if (b.q !== null) {
        if (
          !CELLS.some((c) => c.q === b.q && c.r === b.r) ||
          (b.q === 0 && b.r === 0) ||
          plots.has(b.q + "," + b.r)
        )
          return null;
        plots.add(b.q + "," + b.r);
      }
    }
    if (
      s.shop.some((x) => x !== null && !definition(s.clan, x)) ||
      !Number.isFinite(s.hp) ||
      s.hp < 0 ||
      s.hp > 100 ||
      !Number.isFinite(s.xp) ||
      s.xp < 0 ||
      !Number.isInteger(s.wins) ||
      !Number.isInteger(s.losses) ||
      !Array.isArray(s.history) ||
      !Number.isFinite(s.seed) ||
      !Number.isInteger(s.streak) ||
      typeof s.runId !== "string"
    )
      return null;
    if (
      ["result", "end"].includes(s.phase) &&
      (!s.lastResult || !s.lastResult.earnings)
    )
      return null;
    s.nextId = Math.max(0, ...s.buildings.map((b) => b.uid));
    if (s.phase === "battle" && !validateSnapshot(s.opponent, s.round))
      s.phase = "build";
    if (s.phase !== "battle") migrateBuildings(s);
    return s;
  } catch {
    return null;
  }
}
