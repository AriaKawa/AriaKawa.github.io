import { botControl } from "./bots.mjs?v=wheelie-2";
import {
  normalizeLoadout,
  BODIES,
  WHEELS,
  RIDERS,
} from "../grid-io/customization.mjs?v=speed-1";

export const WORLD_SIZE = 2400;
export const HALF = WORLD_SIZE / 2;
export const BASE_LENGTH = 48;
export const JUMP_DURATION = 1.05;
export const JUMP_COOLDOWN = 5.5;
export const WALL_HEIGHT = 3;
export const WALL_BOTTOM = 0.12;
export const RIDER_HEIGHT = 3.2;
export function normalizeSpeed(value = 100) {
  const number = Number(value);
  return Number.isFinite(number) ? clamp(Math.round(number), 0, 300) : 100;
}
export const cardinalAngle = (angle) =>
  Math.round(angle / (Math.PI / 2)) * (Math.PI / 2);
export const trailDistance = (a, b) =>
  Math.hypot(b.x - a.x, b.z - a.z, (b.y ?? 0) - (a.y ?? 0));
// Only the fresh attachment immediately behind a bike is excluded from
// self-collision. The rest of its wall is as lethal as another rider's.
export const SELF_CLEARANCE = 8;
export const WHEELIE_STOP_TIME = 2;
export const rearOffset = r => 2.65 * (r.player ? 1.35 : 1.17);
export function trailHead(r, height = jumpHeight(r)) {
  const offset = rearOffset(r);
  return { x: r.x - Math.cos(r.angle) * offset, y: height, z: r.z - Math.sin(r.angle) * offset };
}
export const COLORS = [
  "#ff302a",
  "#ff7160",
  "#ffae6a",
  "#f4eee8",
  "#ff5878",
  "#be243a",
];
export const SKINS = ["Red", "Coral", "Amber", "White", "Rose", "Crimson"];
export const LANDMARKS = [
  {
    x: -430,
    z: -440,
    r: 36,
    name: "Violet Foundry",
    kind: "spire",
    color: 0xff5145,
  },
  {
    x: 470,
    z: -430,
    r: 32,
    name: "Prism Gardens",
    kind: "garden",
    color: 0xff7860,
  },
  {
    x: -470,
    z: 450,
    r: 35,
    name: "Solar Relay",
    kind: "relay",
    color: 0xffa06a,
  },
  {
    x: 460,
    z: 480,
    r: 37,
    name: "The Archives",
    kind: "spire",
    color: 0xee3040,
  },
  {
    x: 0,
    z: -840,
    r: 23,
    name: "North Uplink",
    kind: "relay",
    color: 0xff302a,
  },
  { x: 850, z: 0, r: 24, name: "East Uplink", kind: "garden", color: 0xff5540 },
  { x: 0, z: 840, r: 24, name: "South Uplink", kind: "relay", color: 0xff5145 },
  {
    x: -850,
    z: 0,
    r: 24,
    name: "West Uplink",
    kind: "garden",
    color: 0xffa06a,
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
  constructor(size = 28) { this.size = size; this.cells = new Map(); }
  key(x, z) { return Math.floor(x / this.size) * 65536 + Math.floor(z / this.size) + 32768; }
  clear() { for (const cell of this.cells.values()) cell.length = 0; }
  insert(item, x, z) {
    const key = this.key(x, z);
    let cell = this.cells.get(key);
    if (!cell) { cell = []; this.cells.set(key, cell); }
    item._cell = key; item._slot = cell.length; cell.push(item);
  }
  remove(item) {
    const cell = this.cells.get(item._cell);
    if (!cell || cell[item._slot] !== item) return;
    const last = cell.pop();
    if (last !== item) { cell[item._slot] = last; last._slot = item._slot; }
    item._cell = null;
  }
  move(item, x, z) { this.remove(item); item.x = x; item.z = z; this.insert(item, x, z); }
  query(x, z, r = 1, found = []) {
    found.length = 0;
    const loX = Math.floor((x-r)/this.size), hiX = Math.floor((x+r)/this.size);
    const loZ = Math.floor((z-r)/this.size), hiZ = Math.floor((z+r)/this.size);
    for(let i=loX;i<=hiX;i++) for(let j=loZ;j<=hiZ;j++) {
      const cell=this.cells.get(i*65536+j+32768);
      if(cell) for(let k=0;k<cell.length;k++) found.push(cell[k]);
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
    loadout = {},
    mode = "360",
    speedPercent = 100,
  } = {}) {
    this.mode = String(mode) === "90" ? "90" : "360";
    this.speedPercent = normalizeSpeed(speedPercent);
    this.speedMultiplier = this.speedPercent / 100;
    this.random = seeded(seed);
    this.time = 0;
    this.events = [];
    this.nextId = 1;
    this.food = [];
    this.foodHash = new SpatialHash(36);
    this.trailHash = new SpatialHash(24);
    this.riders = [];
    this.segmentPool = [];
    this.trailCandidates = [];
    this.foodCandidates = [];
    this.foodRevision = 0;
    this.stepCount = 0;
    this.player = this.makeRider(name, skin, true, { x: -45, z: 85 });
    this.player.loadout = normalizeLoadout(loadout);
    for (let i = 0; i < bots; i++) {
      const a = this.random() * Math.PI * 2,
        r = 90 + this.random() * 230;
      const p =
        i < 14
          ? this.safePosition(Math.cos(a) * r, 125 + Math.sin(a) * r)
          : this.randomPosition();
      const b = this.makeRider(NAMES[i % NAMES.length], (i + 1) % 6, false, p);
      b.loadout = {
        body: BODIES[i % 3].id,
        wheels: WHEELS[Math.floor(i / 3) % 3].id,
        rider: RIDERS[i % 2].id,
      };
      b.length = 65 + this.random() * 180;
      b.peak = b.length;
      b.angle = this.random() * Math.PI * 2;
      if (this.mode === "90") b.angle = cardinalAngle(b.angle);
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
    const origin = trailHead(r);
    for (let d = r.length; d >= 0; d -= 2.8) {
      const x = origin.x - Math.cos(r.angle) * d,
        z = origin.z - Math.sin(r.angle) * d;
      if (!this.blocked(x, z, 2)) pts.push({ x, y: 0, z });
    }
    pts.push(origin);
    return pts;
  }
  recordTrail(r, height = jumpHeight(r)) {
    const point = trailHead(r, height);
    if (!r.trail.length || trailDistance(r.trail.at(-1), point) > 0.00001)
      r.trail.push(point);
  }
  makeRider(name, skin, player, pos) {
    const r = {
      id: this.nextId++,
      name,
      skin,
      loadout: normalizeLoadout(),
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
      speed: 29 * this.speedMultiplier,
      wheelie: 0,
      wheelieActive: false,
      brakeTime: 0,
      recovery: false,
      think: this.random() * 0.16,
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
      this.foodHash.remove(f);
      Object.assign(f, { x, z, value, skin });
    }
    this.foodHash.insert(f, f.x, f.z);
    this.foodRevision++;
    return f;
  }
  rebuildFoodHash() {
    this.foodHash.clear();
    for (const f of this.food) this.foodHash.insert(f, f.x, f.z);
  }
  rebuildTrails() {
    this.trailHash.clear();
    let segmentIndex = 0;
    for (const rider of this.riders) {
      if (!rider.alive) continue;
      const head = trailHead(rider);
      let distanceFromHead = 0;
      for (let i = rider.trail.length; i > 0; i--) {
        const a = rider.trail[i - 1],
          b = i === rider.trail.length ? head : rider.trail[i];
        const length = trailDistance(a, b);
        let segment = this.segmentPool[segmentIndex];
        if (!segment) this.segmentPool[segmentIndex] = segment = {};
        segmentIndex++;
        segment.a = a; segment.b = b; segment.rider = rider; segment.distanceFromHead = distanceFromHead;
        distanceFromHead += length;
        if (length < 0.00001 || Math.hypot(a.x - b.x, a.z - b.z) > 6) continue;
        this.trailHash.insert(segment, (a.x + b.x) / 2, (a.z + b.z) / 2);
      }
    }
  }
  trailAt(r, x, z, radius = 2.3, altitude = jumpHeight(r)) {
    for (const s of this.trailHash.query(x, z, radius + 3, this.trailCandidates)) {
      if (!s.rider.alive || s.rider.grace > 0) continue;
      if (s.rider === r && s.distanceFromHead < SELF_CLEARANCE) continue;
      if (pointSegmentDistanceSq(x, z, s.a, s.b) >= radius * radius) continue;
      // Test the whole span inside the bike's horizontal footprint, including
      // sloping takeoff/landing sections, against its vertical body interval.
      const dx = s.b.x - s.a.x,
        dz = s.b.z - s.a.z;
      const lengthSq = dx * dx + dz * dz;
      const t = lengthSq ? ((x - s.a.x) * dx + (z - s.a.z) * dz) / lengthSq : 0;
      const perpendicularSq =
        (x - s.a.x - t * dx) ** 2 + (z - s.a.z - t * dz) ** 2;
      const reach = lengthSq
        ? Math.sqrt(Math.max(0, radius * radius - perpendicularSq) / lengthSq)
        : 1;
      const ya = s.a.y ?? 0,
        dy = (s.b.y ?? 0) - ya;
      const y0 = ya + dy * clamp(t - reach, 0, 1),
        y1 = ya + dy * clamp(t + reach, 0, 1);
      if (
        altitude < Math.max(y0, y1) + WALL_HEIGHT + 0.1 &&
        altitude + RIDER_HEIGHT > Math.min(y0, y1) + WALL_BOTTOM - 0.1
      )
        return s.rider;
    }
    return null;
  }
  jump(r) {
    if (this.speedMultiplier > 0 && r.alive && r.cooldown <= 0 && !r.wheelieActive) {
      this.recordTrail(r);
      r.jump = JUMP_DURATION;
      r.cooldown = JUMP_COOLDOWN;
      this.events.push({ type: "jump", rider: r });
      return true;
    }
    return false;
  }
  botControl(r, dt) { return botControl(this, r, dt); }
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
  }
  respawn(r) {
    let p;
    for (let i = 0; i < 40; i++) {
      p = this.randomPosition();
      if (
        Math.hypot(p.x - this.player.x, p.z - this.player.z) > 140 &&
        !this.trailAt(r, p.x, p.z, 30, 0)
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
      brain: null,
      wheelie: 0,
      wheelieActive: false,
      brakeTime: 0,
      recovery: false,
      previousX: p.x,
      previousZ: p.z,
      think: 0,
      speed: 29 * this.speedMultiplier,
    });
    if (this.mode === "90") r.angle = cardinalAngle(r.angle);
    r.previousAngle = r.angle;
    r.previousJump = r.previousWheelie = 0;
    r.trail = this.initialTrail(r);
  }
  step(dt, input = {}) {
    this.events = [];
    if (this.speedMultiplier === 0) return this.events;
    dt = clamp(dt, 0, 1 / 30);
    this.time += dt;
    this.stepCount++;
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
      r.previousX = r.x; r.previousZ = r.z; r.previousAngle = r.angle;
      r.previousJump = r.jump; r.previousWheelie = r.wheelie;
      const previousHeight = jumpHeight(r),
        previousJump = r.jump,
        wasJumping = previousJump > 0;
      r.jump = Math.max(0, r.jump - dt);
      const control = r.player ? input : this.botControl(r, dt);
      if (control.jump) this.jump(r);
      const wheelie = !!control.wheelie && r.jump <= 0;
      const wasWheelie = r.wheelieActive;
      if (wheelie && !wasWheelie) {
        r.brakeEntrySpeed = r.speed; r.brakeTime = 0;
        const pivot = trailHead(r); r.pivotX = pivot.x; r.pivotZ = pivot.z;
        this.recordTrail(r, previousHeight);
      }
      r.wheelieActive = wheelie;
      r.wheelie += ((wheelie ? 1 : 0) - r.wheelie) * (1 - Math.exp(-dt * (wheelie ? 9 : 7)));
      const target = Number.isFinite(control.angle) ? control.angle : r.angle;
      if (wheelie) {
        r.angle += clamp(control.steer || 0, -1, 1) * 2.2 * dt;
        r.brakeTime = Math.min(WHEELIE_STOP_TIME, r.brakeTime + dt);
        r.speed = r.brakeEntrySpeed * Math.max(0, 1 - r.brakeTime / WHEELIE_STOP_TIME);
        r.boost = false;
      } else {
        if (wasWheelie) {
          r.recovery = true;
          if (this.mode === "90") {
            r.angle = cardinalAngle(r.angle);
            r.x = r.pivotX + Math.cos(r.angle) * rearOffset(r);
            r.z = r.pivotZ + Math.sin(r.angle) * rearOffset(r);
          }
          this.recordTrail(r, previousHeight);
        }
        if (this.mode === "90") {
          const direction = cardinalAngle(target), turn = Math.abs(angleDifference(direction, r.angle));
          if (turn > 0.01 && turn < Math.PI - 0.01) {
            this.recordTrail(r, previousHeight);
            // The axle swings through the bike center during a right-angle
            // turn. Preserve a square corner instead of a diagonal shortcut.
            r.trail.push({x:r.x,y:previousHeight,z:r.z});
            r.angle = direction;
            this.recordTrail(r, previousHeight);
          }
        } else r.angle += clamp(angleDifference(target, r.angle), -2.9 * dt, 2.9 * dt);
        r.boost = !!control.boost && r.length > BASE_LENGTH + 1;
        const cruising = 29 * this.speedMultiplier * (r.boost ? 1.72 : 1) * (r.jump > 0 ? 1.08 : 1);
        if (r.recovery) {
          r.speed = Math.min(cruising, r.speed + 29 * this.speedMultiplier * dt / 0.65);
          if (r.speed >= cruising) r.recovery = false;
        } else r.speed = cruising;
      }
      if (r.boost) {
        r.length = Math.max(BASE_LENGTH, r.length - 7 * dt);
        r.drop += dt;
        if (r.drop > 0.24) {
          r.drop = 0;
          const t = r.trail[0];
          if (t) {
            this.addFood(t.x, t.z, 1, r.skin);
          }
        }
      }
      if (wheelie) {
        r.pivotX += Math.cos(r.angle) * r.speed * dt;
        r.pivotZ += Math.sin(r.angle) * r.speed * dt;
        r.x = r.pivotX + Math.cos(r.angle) * rearOffset(r);
        r.z = r.pivotZ + Math.sin(r.angle) * rearOffset(r);
      } else {
        r.x += Math.cos(r.angle) * r.speed * dt;
        r.z += Math.sin(r.angle) * r.speed * dt;
      }
      const last = r.trail[r.trail.length - 1],
        head = trailHead(r);
      if (
        !last ||
        trailDistance(last, head) >= 2.8 ||
        (previousJump > JUMP_DURATION / 2 &&
          r.jump <= JUMP_DURATION / 2 &&
          r.jump > 0) ||
        (wasJumping && r.jump === 0)
      )
        this.recordTrail(r);
      let total = trailDistance(r.trail.at(-1), head),
        cut = 0;
      for (let i = r.trail.length - 1; i > 0; i--) {
        total += trailDistance(r.trail[i - 1], r.trail[i]);
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
        const killer = this.trailAt(r, r.x, r.z);
        if (killer) {
          this.kill(r, killer, killer === r ? "self" : "trail");
          continue;
        }
      }
      for (const f of this.foodHash.query(r.x, r.z, 5.8, this.foodCandidates)) {
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
          this.foodHash.move(f, p.x, p.z);
          f.value = 1 + this.random();
          this.foodRevision++;
        }
      }
    }
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
