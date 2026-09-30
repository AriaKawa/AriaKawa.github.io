import { bikeSpheres, sphereTriangle } from './collisions.mjs?v=pixel-freedom-1';
import { Vector3 } from '../grid-io/vendor/three.module.min.js';
import { botControl } from "./bots.mjs?v=pixel-freedom-1";
import { updateSurface, advanceLoop, advanceAirborne, surfaceForward, roadById, terrainBlocked, inGroundCut, surfaceUp, LOOP } from './terrain.mjs?v=pixel-freedom-1';
import { populateFood, matureTrail, pickupKind } from './population.mjs?v=pixel-freedom-1';
import { TrailIndex } from './trail-index.mjs?v=pixel-freedom-1';
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
  Math.sqrt((b.x-a.x)**2+(b.z-a.z)**2+((b.y??0)-(a.y??0))**2);
// Only the fresh attachment immediately behind a bike is excluded from
// self-collision. The rest of its wall is as lethal as another rider's.
export const SELF_CLEARANCE = 12;
export const WHEELIE_STOP_TIME = 2;
export const WHEELIE_HOLD_TIME = 1;
export const rearOffset = r => 2.65 * (r.player ? 1.35 : 1.17);
export const riderHeight = r => (r.y || 0) + jumpHeight(r);
export function rearContact(r, height = riderHeight(r)) {
  const offset = rearOffset(r);
  const f=surfaceForward(r),up=surfaceUp(r);
  return { x:r.x-f.x*offset,y:height-f.y*offset,z:r.z-f.z*offset,nx:up.x,ny:up.y,nz:up.z };
}
export function trailHead(r, height = riderHeight(r)) {return rearContact(r,height);}
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
    established = true,
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
    this.trailIndex = new TrailIndex(this.trailHash,trailHead);
    this.trailCandidates = [];
    this.foodCandidates = [];
    this.foodRevision = 0;
    this.stepCount = 0;
    this.player = this.makeRider(name, skin, true, { x: -45, z: 85 });
    this.player.loadout = normalizeLoadout(loadout);
    for (let i = 0; i < bots; i++) {
      const a = this.random() * Math.PI * 2,
        r = i<6?450+this.random()*350:160+this.random()*230;
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
      if(established)matureTrail(this,b,i);
    }
    populateFood(this,food);
    this.rebuildFoodHash();
    this.rebuildTrails();
  }
  safePosition(x, z) {
    if (this.blocked(x, z, 12)||inGroundCut(x,z,12)||terrainBlocked({},x,z,4)) return this.randomPosition();
    return { x, z };
  }
  randomPosition() {
    let x, z;
    do {
      x = (this.random() * 2 - 1) * (HALF - 40);
      z = (this.random() * 2 - 1) * (HALF - 40);
    } while (this.blocked(x, z, 15)||inGroundCut(x,z,12)||terrainBlocked({},x,z,4));
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
  recordTrail(r, height = riderHeight(r)) {
    const point = trailHead(r, height);
    if (!r.trail.length || trailDistance(r.trail.at(-1), point) > 0.00001)
      this.appendTrail(r,point);
  }
  appendTrail(r,point) {
    const last=r.trail.at(-1);
    if(last) {
      const length=trailDistance(last,point),parts=Math.ceil(length/3);
      for(let i=1;i<parts;i++) {
        const t=i/parts,p={};
        for(const key of ['x','y','z','nx','ny','nz'])p[key]=(last[key]??(key==='ny'?1:0))+((point[key]??(key==='ny'?1:0))-(last[key]??(key==='ny'?1:0)))*t;
        p._distance=(last._distance||0)+length*t;r.trail.push(p);
      }
    }
    point._distance=last?(last._distance||0)+trailDistance(last,point):0;
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
      y:0, pitch:0, road:null, loopS:null,
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
      wheelieElapsed:0, wheelieLocked:false, wheelieCooldown:0,
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
  addFood(x, z, value = 1, skin = 0, data = {}) {
    let f;
    if (this.food.length < 8200) {
      f = { index: this.food.length };
      this.food.push(f);
    } else {
      f = this.food[Math.floor(this.random() * this.food.length)];
      this.foodHash.remove(f);
    }
    Object.assign(f,{x,z,y:0,nx:0,ny:1,nz:0,value,skin,kind:pickupKind(value),pattern:'scatter',home:null,route:null,availableAt:0},data);
    this.foodHash.insert(f, f.x, f.z);
    this.foodRevision++;
    return f;
  }
  rebuildFoodHash() {
    this.foodHash.clear();
    for (const f of this.food) this.foodHash.insert(f, f.x, f.z);
  }
  rebuildTrails() {
    this.trailIndex.reset(this.riders);
  }
  updateTrails() {this.trailIndex.update(this.riders);}
  trailAt(r, x, z, radius = 2.3, altitude = riderHeight(r)) {
    for (const s of this.trailHash.query(x, z, radius + 3, this.trailCandidates)) {
      if (!s.rider.alive || s.rider.grace > 0) continue;
      if (s.rider === r && r._trailHeadDistance-s.endDistance < SELF_CLEARANCE) continue;
      if ((s.a.ny??1)<0.9 || (s.b.ny??1)<0.9 || Math.cos(r.pitch||0)<0.9) {
        const up=surfaceUp(r),ax=s.a.x+(s.a.nx||0)*1.5,ay=(s.a.y||0)+(s.a.ny??1)*1.5,az=s.a.z+(s.a.nz||0)*1.5;
        const dx=s.b.x+(s.b.nx||0)*1.5-ax,dy=(s.b.y||0)+(s.b.ny??1)*1.5-ay,dz=s.b.z+(s.b.nz||0)*1.5-az;
        const px=x+up.x*1.6-ax,py=altitude+up.y*1.6-ay,pz=z+up.z*1.6-az;
        const t=clamp((px*dx+py*dy+pz*dz)/(dx*dx+dy*dy+dz*dz||1),0,1);
        if((px-dx*t)**2+(py-dy*t)**2+(pz-dz*t)**2<(radius+1.3)**2)return s.rider;
        continue;
      }
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
  contactAt(r,spheres) {
    const vertices=[new Vector3(),new Vector3(),new Vector3(),new Vector3()];
    for(const sphere of spheres) {
      for(const s of this.trailHash.query(sphere.x,sphere.z,sphere.radius+6,this.trailCandidates)) {
        if(!s.rider.alive||s.rider.grace>0)continue;
        if(s.rider===r&&r._trailHeadDistance-s.endDistance<SELF_CLEARANCE)continue;
        for(const [i,p] of [[0,s.a],[1,s.b]]) {
          vertices[i].set(p.x+(p.nx||0)*WALL_BOTTOM,(p.y||0)+(p.ny??1)*WALL_BOTTOM,p.z+(p.nz||0)*WALL_BOTTOM);
          vertices[i+2].set(p.x+(p.nx||0)*WALL_HEIGHT,(p.y||0)+(p.ny??1)*WALL_HEIGHT,p.z+(p.nz||0)*WALL_HEIGHT);
        }
        if(sphereTriangle(sphere,vertices[0],vertices[1],vertices[2])||sphereTriangle(sphere,vertices[1],vertices[3],vertices[2]))return s.rider;
      }
    }
    for(const other of this.riders) {
      if(other===r||!other.alive||other.grace>0||Math.hypot(r.x-other.x,r.z-other.z)>16)continue;
      const body=bikeSpheres(other,riderHeight(other));
      for(const a of spheres)for(const b of body)if((a.x-b.x)**2+(a.y-b.y)**2+(a.z-b.z)**2<(a.radius+b.radius)**2)return other;
    }
    return null;
  }
  jump(r) {
    if (this.speedMultiplier > 0 && r.alive && r.cooldown <= 0 && !r.wheelieActive && !r.airborne) {
      this.recordTrail(r);
      if(Number.isFinite(r.loopS)) {
        const up=surfaceUp(r),f=surfaceForward(r);
        r.airborne={vy:f.y*r.speed+up.y*31.4,vx:f.x*r.speed+up.x*31.4,vz:f.z*r.speed+up.z*31.4,pitch:r.pitch,angle:r.angle,time:0};
        r.x+=up.x*.3;r.y+=up.y*.3;r.z+=up.z*.3;
        r.loopS=null;r.jump=0;
      } else r.jump = JUMP_DURATION;
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
        r.skin, {y:p.y||0},
      );
    }
    for (let i = 0; i < 12; i++)
      this.addFood(
        r.x + (this.random() - 0.5) * 12,
        r.z + (this.random() - 0.5) * 12,
        3,
        r.skin, {y:r.y||0},
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
      y:0,pitch:0,road:null,loopS:null,airborne:null,
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
      wheelieElapsed:0,wheelieLocked:false,wheelieCooldown:0,loopPivotS:null,
      recovery: false,
      previousX: p.x,
      previousZ: p.z,
      think: 0,
      speed: 29 * this.speedMultiplier,
    });
    if (this.mode === "90") r.angle = cardinalAngle(r.angle);
    r.previousAngle = r.angle;
    r.previousJump = r.previousWheelie = 0;
    r.previousY=r.previousPitch=0;
    r.trail = this.initialTrail(r);
  }
  step(dt, input = {}) {
    this.events = [];
    if (this.speedMultiplier === 0) return this.events;
    dt = clamp(dt, 0, 1 / 30);
    this.time += dt;
    this.stepCount++;
    this.updateTrails();
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
      r.previousY=r.y||0;r.previousPitch=r.pitch||0;
      const previousBody=this.worldCollision?bikeSpheres(r,riderHeight(r)):null;
      const previousHeight = riderHeight(r),
        previousJump = r.jump,
        wasJumping = previousJump > 0;
      r.jump = Math.max(0, r.jump - dt);
      const control = r.player ? input : this.botControl(r, dt);
      if (control.jump) this.jump(r);
      r.wheelieCooldown=Math.max(0,(r.wheelieCooldown||0)-dt);
      if(!control.wheelie)r.wheelieLocked=false;
      if(r.wheelieActive)r.wheelieElapsed+=dt;
      if(r.wheelieActive&&r.wheelieElapsed>=WHEELIE_STOP_TIME+WHEELIE_HOLD_TIME-1e-8)r.wheelieLocked=true;
      const wheelie = !!control.wheelie && !r.wheelieLocked && r.wheelieCooldown<=0 && r.jump <= 0 && !r.airborne;
      const wasWheelie = r.wheelieActive;
      if (wheelie && !wasWheelie) {
        r.brakeEntrySpeed = r.speed; r.brakeTime = 0;
        r.wheelieElapsed=dt;
        const pivot = rearContact(r); r.pivotX = pivot.x; r.pivotZ = pivot.z;
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
          r.wheelieCooldown=1.2;
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
            this.appendTrail(r,{x:r.x,y:previousHeight,z:r.z});
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
      if (advanceAirborne(r,dt) || advanceLoop(r,dt,control.steer||0)) {
        // Surface coordinates preserve the rider's heading and free steering.
      } else if (wheelie) {
        r.pivotX += Math.cos(r.angle) * r.speed * dt;
        r.pivotZ += Math.sin(r.angle) * r.speed * dt;
        r.x = r.pivotX + Math.cos(r.angle) * rearOffset(r);
        r.z = r.pivotZ + Math.sin(r.angle) * rearOffset(r);
      } else {
        r.x += Math.cos(r.angle) * r.speed * dt;
        r.z += Math.sin(r.angle) * r.speed * dt;
      }
      updateSurface(r);
      const last = r.trail[r.trail.length - 1],
        head = trailHead(r);
      if ((
        !last ||
        trailDistance(last, head) >= 2.8 ||
        (previousJump > JUMP_DURATION / 2 &&
          r.jump <= JUMP_DURATION / 2 &&
          r.jump > 0) ||
        (wasJumping && r.jump === 0)
      ))
        this.recordTrail(r);
      if(!wheelie) {
        const end=r.trail.at(-1),distanceAtHead=end._distance+trailDistance(end,head);
        let cut=0;
        while(cut<r.trail.length-1&&distanceAtHead-r.trail[cut]._distance>r.length)cut++;
        if(cut)r.trail.splice(0,cut);
      }
      if (r.grace <= 0) {
        const spheres=bikeSpheres(r,riderHeight(r));
        const hit=this.worldCollision?.sweep(r,previousBody,spheres);
        const fallback=!this.worldCollision && (this.blocked(r.x,r.z,2.3)||terrainBlocked({...r,y:riderHeight(r)},r.x,r.z,2.3));
        if (hit || fallback) {
          this.kill(
            r,
            null,
            Math.abs(r.x) > HALF - 3 || Math.abs(r.z) > HALF - 3
              ? "boundary"
              : hit ? "barrier" : terrainBlocked(r,r.x,r.z,2.3)?"barrier":"reactor",
          );
          continue;
        }
        const killer = this.worldCollision ? this.contactAt(r,spheres) : this.trailAt(r, r.x, r.z);
        if (killer) {
          this.kill(r, killer, killer === r ? "self" : "trail");
          continue;
        }
      }
      for (const f of this.foodHash.query(r.x, r.z, 5.8, this.foodCandidates)) {
        if (f.availableAt<=this.time && Math.abs(riderHeight(r)-(f.y||0))<6 && (r.x - f.x) ** 2 + (r.z - f.z) ** 2 < 5.8 ** 2) {
          r.length = Math.min(6000, r.length + f.value * 1.4);
          r.peak = Math.max(r.peak, r.length);
          if (r.player)
            this.events.push({
              type: "pickup",
              x: f.x,
              z: f.z,
              y:f.y||0,kind:f.kind,
              value: f.value,
              skin: f.skin,
            });
          if(f.home)f.availableAt=this.time+12+this.random()*8;
          else {
            const p = this.randomPosition();
            this.foodHash.move(f, p.x, p.z);f.y=0;
            f.value = this.random()<.3?2:1;f.kind=pickupKind(f.value);
          }
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
    if(Number.isFinite(p.loopS))return LOOP.name;
    if(p.road)return roadById(p.road).name;
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
