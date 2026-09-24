export const WORLD_SIZE = 2400;
export const HALF = WORLD_SIZE / 2;
export const BASE_LENGTH = 48;
export const JUMP_DURATION = 1.05;
export const JUMP_COOLDOWN = 5.5;
export const COLORS = [
  "#86f9d4",
  "#bb8eff",
  "#ff8d94",
  "#ffc875",
  "#76cfff",
  "#f2f4ff",
];
export const SKINS = [
  "Mint Phantom",
  "Violet Specter",
  "Coral Comet",
  "Solar Flare",
  "Arctic Pulse",
  "Pearl Ghost",
];
export const LANDMARKS = [
  {
    x: 0,
    z: 0,
    r: 26,
    name: "The Confluence",
    kind: "reactor",
    color: 0x8ef9d6,
  },
  {
    x: -430,
    z: -440,
    r: 36,
    name: "Violet Foundry",
    kind: "spire",
    color: 0xb78aff,
  },
  {
    x: 470,
    z: -430,
    r: 32,
    name: "Prism Gardens",
    kind: "garden",
    color: 0x70caff,
  },
  {
    x: -470,
    z: 450,
    r: 35,
    name: "Solar Relay",
    kind: "relay",
    color: 0xffc775,
  },
  {
    x: 460,
    z: 480,
    r: 37,
    name: "The Archives",
    kind: "spire",
    color: 0xff8eaf,
  },
  {
    x: 0,
    z: -840,
    r: 23,
    name: "North Uplink",
    kind: "relay",
    color: 0x8ef9d6,
  },
  { x: 850, z: 0, r: 24, name: "East Uplink", kind: "garden", color: 0x76cfff },
  { x: 0, z: 840, r: 24, name: "South Uplink", kind: "relay", color: 0xb78aff },
  {
    x: -850,
    z: 0,
    r: 24,
    name: "West Uplink",
    kind: "garden",
    color: 0xffc875,
  },
];
const NAMES = [
  "Afterglow",
  "Ghostline",
  "Lumen",
  "Static",
  "Velvet",
  "Halcyon",
  "Arc",
  "Solstice",
  "Nightshift",
  "Ion",
  "Wavelength",
  "Echo",
  "Parallax",
  "Haze",
  "Comet",
  "Flux",
  "Orchid",
  "Daybreak",
  "Kairo",
  "Neonfox",
  "Stratos",
  "Drift",
  "Pulse",
  "Supernova",
  "Mira",
  "Frostbyte",
  "Zenith",
  "Vapor",
  "Nimbus",
  "Astra",
  "Polaris",
  "Glitch",
  "Spectra",
  "Orbit",
  "Rune",
  "Sundown",
  "Switch",
  "Nova",
  "Photon",
  "Wisp",
];
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export function seeded(seed = 42) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function angleDifference(a, b) {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}
export function pointSegmentDistanceSq(x, z, a, b) {
  const dx = b.x - a.x,
    dz = b.z - a.z,
    l = dx * dx + dz * dz,
    t = l ? clamp(((x - a.x) * dx + (z - a.z) * dz) / l, 0, 1) : 0;
  return (x - a.x - t * dx) ** 2 + (z - a.z - t * dz) ** 2;
}
export function jumpHeight(rider) {
  return rider.jump > 0
    ? Math.sin(Math.PI * (1 - rider.jump / JUMP_DURATION)) * 10.5
    : 0;
}
export class SpatialHash {
  constructor(size = 28) {
    this.size = size;
    this.cells = new Map();
  }
  clear() {
    this.cells.clear();
  }
  insert(item, x, z) {
    const k = `${Math.floor(x / this.size)},${Math.floor(z / this.size)}`;
    let c = this.cells.get(k);
    if (!c) {
      c = [];
      this.cells.set(k, c);
    }
    c.push(item);
  }
  query(x, z, r = 1) {
    const found = [];
    for (
      let i = Math.floor((x - r) / this.size);
      i <= Math.floor((x + r) / this.size);
      i++
    )
      for (
        let j = Math.floor((z - r) / this.size);
        j <= Math.floor((z + r) / this.size);
        j++
      ) {
        const c = this.cells.get(`${i},${j}`);
        if (c) found.push(...c);
      }
    return found;
  }
}
export class Arena {
  constructor({
    seed = Date.now(),
    bots = 40,
    food = 6400,
    name = "Rider",
    skin = 0,
  } = {}) {
    this.random = seeded(seed);
    this.time = 0;
    this.events = [];
    this.nextId = 1;
    this.food = [];
    this.foodHash = new SpatialHash(36);
    this.trailHash = new SpatialHash(24);
    this.riders = [];
    this.foodRevision = 0;
    this.stepCount = 0;
    this.player = this.makeRider(name, skin, true, { x: -45, z: 85 });
    for (let i = 0; i < bots; i++) {
      const a = this.random() * Math.PI * 2,
        r = 90 + this.random() * 230;
      const p =
        i < 14
          ? this.safePosition(Math.cos(a) * r, 125 + Math.sin(a) * r)
          : this.randomPosition();
      const b = this.makeRider(NAMES[i % NAMES.length], (i + 1) % 6, false, p);
      b.length = 65 + this.random() * 180;
      b.peak = b.length;
      b.angle = this.random() * Math.PI * 2;
      b.trail = this.initialTrail(b);
    }
    for (let i = 0; i < food; i++) {
      const p = this.randomPosition();
      this.addFood(
        p.x,
        p.z,
        1 + Math.floor(this.random() * 2),
        Math.floor(this.random() * 6),
      );
    }
    // A gentle ribbon of energy welcomes the first ride.
    for (let i = 0; i < 60; i++)
      this.addFood(
        this.player.x + 8 + i * 3.4,
        this.player.z + Math.sin(i * 0.12) * 12,
        2,
        i % 3 === 0 ? 1 : 0,
      );
    this.rebuildFoodHash();
    this.rebuildTrails();
  }
  safePosition(x, z) {
    if (this.blocked(x, z, 12)) return this.randomPosition();
    return { x, z };
  }
  randomPosition() {
    let x, z;
    do {
      x = (this.random() * 2 - 1) * (HALF - 40);
      z = (this.random() * 2 - 1) * (HALF - 40);
    } while (this.blocked(x, z, 15));
    return { x, z };
  }
  blocked(x, z, pad = 0) {
    return (
      Math.abs(x) > HALF - pad ||
      Math.abs(z) > HALF - pad ||
      LANDMARKS.some((o) => (x - o.x) ** 2 + (z - o.z) ** 2 < (o.r + pad) ** 2)
    );
  }
  initialTrail(r) {
    const pts = [];
    for (let d = r.length; d >= 0; d -= 2.8) {
      const x = r.x - Math.cos(r.angle) * d,
        z = r.z - Math.sin(r.angle) * d;
      if (!this.blocked(x, z, 2)) pts.push({ x, z });
    }
    pts.push({ x: r.x, z: r.z });
    return pts;
  }
  makeRider(name, skin, player, pos) {
    const r = {
      id: this.nextId++,
      name,
      skin,
      player,
      ...pos,
      angle: 0,
      length: BASE_LENGTH,
      peak: BASE_LENGTH,
      kills: 0,
      jump: 0,
      cooldown: 0,
      alive: true,
      grace: 3.5,
      boost: false,
      speed: 29,
      think: 0,
      target: null,
      drop: 0,
      respawn: 0,
      trail: [],
    };
    r.trail = this.initialTrail(r);
    this.riders.push(r);
    return r;
  }
  addFood(x, z, value = 1, skin = 0) {
    let f;
    if (this.food.length < 8200) {
      f = { x, z, value, skin, index: this.food.length };
      this.food.push(f);
    } else {
      f = this.food[Math.floor(this.random() * this.food.length)];
      Object.assign(f, { x, z, value, skin });
    }
    this.foodRevision++;
    return f;
  }
  rebuildFoodHash() {
    this.foodHash.clear();
    for (const f of this.food) this.foodHash.insert(f, f.x, f.z);
  }
  rebuildTrails() {
    this.trailHash.clear();
    for (const rider of this.riders) {
      if (!rider.alive) continue;
      for (let i = 1; i < rider.trail.length; i++) {
        const a = rider.trail[i - 1],
          b = rider.trail[i];
        if (Math.hypot(a.x - b.x, a.z - b.z) > 6) continue;
        const segment = { a, b, rider };
        this.trailHash.insert(segment, (a.x + b.x) / 2, (a.z + b.z) / 2);
      }
    }
  }
  trailAt(r, x, z, radius = 2.3) {
    for (const s of this.trailHash.query(x, z, radius + 3)) {
      if (s.rider === r || !s.rider.alive || s.rider.grace > 0) continue;
      if (pointSegmentDistanceSq(x, z, s.a, s.b) < radius * radius)
        return s.rider;
    }
    return null;
  }
  jump(r) {
    if (r.alive && r.cooldown <= 0) {
      r.jump = JUMP_DURATION;
      r.cooldown = JUMP_COOLDOWN;
      this.events.push({ type: "jump", rider: r });
      return true;
    }
    return false;
  }
  botControl(r, dt) {
    r.think -= dt;
    if (r.think <= 0) {
      r.think = 0.12 + this.random() * 0.1;
      let nearest = null,
        best = Infinity;
      for (const f of this.foodHash.query(r.x, r.z, 100)) {
        const d = (f.x - r.x) ** 2 + (f.z - r.z) ** 2;
        if (d < best) {
          best = d;
          nearest = f;
        }
      }
      if (nearest) r.target = { x: nearest.x, z: nearest.z };
      else if (!r.target || Math.hypot(r.x - r.target.x, r.z - r.target.z) < 20)
        r.target = this.randomPosition();
      let want = Math.atan2(r.target.z - r.z, r.target.x - r.x),
        choice = r.angle,
        bestCost = Infinity;
      for (const offset of [
        0,
        0.45,
        -0.45,
        0.9,
        -0.9,
        1.5,
        -1.5,
        2.3,
        -2.3,
        Math.PI,
      ]) {
        const a = r.angle + offset;
        let cost =
          Math.abs(angleDifference(want, a)) * 10 + Math.abs(offset) * 2;
        for (const dist of [9, 20, 35, 50]) {
          const x = r.x + Math.cos(a) * dist,
            z = r.z + Math.sin(a) * dist;
          if (this.blocked(x, z, 10)) cost += 120 * (55 - dist);
          if (this.trailAt(r, x, z, 6)) cost += 60 * (55 - dist);
        }
        if (cost < bestCost) {
          bestCost = cost;
          choice = a;
        }
      }
      r.desired = choice;
      r.wantsBoost = bestCost < 14 && r.length > 90 && this.random() < 0.13;
      if (
        this.trailAt(
          r,
          r.x + Math.cos(r.angle) * 13,
          r.z + Math.sin(r.angle) * 13,
          7,
        ) &&
        this.random() < 0.65
      )
        this.jump(r);
    }
    return { angle: r.desired ?? r.angle, boost: r.wantsBoost };
  }
  kill(r, killer = null, reason = "trail") {
    if (!r.alive) return;
    r.alive = false;
    r.respawn = 3 + this.random() * 4;
    r.boost = false;
    if (killer && killer !== r) {
      killer.kills++;
      if (killer.player)
        this.events.push({ type: "elimination", rider: killer, victim: r });
    }
    for (let i = 0; i < r.trail.length; i += 2) {
      const p = r.trail[i];
      this.addFood(
        p.x + (this.random() - 0.5) * 4,
        p.z + (this.random() - 0.5) * 4,
        3 + this.random() * 2,
        r.skin,
      );
    }
    for (let i = 0; i < 12; i++)
      this.addFood(
        r.x + (this.random() - 0.5) * 12,
        r.z + (this.random() - 0.5) * 12,
        3,
        r.skin,
      );
    this.events.push({ type: "death", rider: r, killer, reason });
    this.rebuildFoodHash();
  }
  respawn(r) {
    let p;
    for (let i = 0; i < 40; i++) {
      p = this.randomPosition();
      if (
        Math.hypot(p.x - this.player.x, p.z - this.player.z) > 140 &&
        !this.trailAt(r, p.x, p.z, 30)
      )
        break;
    }
    Object.assign(r, p, {
      alive: true,
      length: 65 + this.random() * 110,
      angle: this.random() * Math.PI * 2,
      jump: 0,
      cooldown: 0,
      grace: 3,
      boost: false,
      target: null,
      think: 0,
    });
    r.trail = this.initialTrail(r);
  }
  step(dt, input = {}) {
    dt = clamp(dt, 0, 1 / 30);
    this.time += dt;
    this.stepCount++;
    this.events = [];
    let foodChanged = false;
    this.rebuildTrails();
    for (const r of this.riders) {
      if (!r.alive) {
        if (!r.player) {
          r.respawn -= dt;
          if (r.respawn <= 0) this.respawn(r);
        }
        continue;
      }
      r.grace = Math.max(0, r.grace - dt);
      r.cooldown = Math.max(0, r.cooldown - dt);
      r.jump = Math.max(0, r.jump - dt);
      const control = r.player ? input : this.botControl(r, dt);
      if (control.jump) this.jump(r);
      const target = Number.isFinite(control.angle) ? control.angle : r.angle;
      r.angle += clamp(angleDifference(target, r.angle), -2.9 * dt, 2.9 * dt);
      r.boost = !!control.boost && r.length > BASE_LENGTH + 1;
      r.speed = 29 * (r.boost ? 1.72 : 1) * (r.jump > 0 ? 1.08 : 1);
      if (r.boost) {
        r.length = Math.max(BASE_LENGTH, r.length - 7 * dt);
        r.drop += dt;
        if (r.drop > 0.24) {
          r.drop = 0;
          const t = r.trail[0];
          if (t) {
            this.addFood(t.x, t.z, 1, r.skin);
            foodChanged = true;
          }
        }
      }
      r.x += Math.cos(r.angle) * r.speed * dt;
      r.z += Math.sin(r.angle) * r.speed * dt;
      const last = r.trail[r.trail.length - 1];
      if (!last || Math.hypot(r.x - last.x, r.z - last.z) >= 2.8)
        r.trail.push({ x: r.x, z: r.z });
      let total = 0,
        cut = 0;
      for (let i = r.trail.length - 1; i > 0; i--) {
        total += Math.hypot(
          r.trail[i].x - r.trail[i - 1].x,
          r.trail[i].z - r.trail[i - 1].z,
        );
        if (total > r.length) {
          cut = i;
          break;
        }
      }
      if (cut > 0) r.trail.splice(0, cut);
      if (r.grace <= 0) {
        if (this.blocked(r.x, r.z, 2.3)) {
          this.kill(
            r,
            null,
            Math.abs(r.x) > HALF - 3 || Math.abs(r.z) > HALF - 3
              ? "boundary"
              : "reactor",
          );
          continue;
        }
        if (jumpHeight(r) < 3.1) {
          const killer = this.trailAt(r, r.x, r.z);
          if (killer) {
            this.kill(r, killer);
            continue;
          }
        }
      }
      for (const f of this.foodHash.query(r.x, r.z, 5.8)) {
        if ((r.x - f.x) ** 2 + (r.z - f.z) ** 2 < 5.8 ** 2) {
          r.length = Math.min(1500, r.length + f.value * 1.4);
          r.peak = Math.max(r.peak, r.length);
          if (r.player)
            this.events.push({
              type: "pickup",
              x: f.x,
              z: f.z,
              value: f.value,
              skin: f.skin,
            });
          const p = this.randomPosition();
          f.x = p.x;
          f.z = p.z;
          f.value = 1 + this.random();
          this.foodRevision++;
          foodChanged = true;
        }
      }
    }
    if (foodChanged) this.rebuildFoodHash();
    return this.events;
  }
  ranking() {
    return this.riders
      .filter((r) => r.alive)
      .sort((a, b) => b.length - a.length);
  }
  sector() {
    const p = this.player;
    let nearest = LANDMARKS[0],
      dist = Infinity;
    for (const o of LANDMARKS) {
      const d = (o.x - p.x) ** 2 + (o.z - p.z) ** 2;
      if (d < dist) {
        dist = d;
        nearest = o;
      }
    }
    return nearest.name;
  }
}
