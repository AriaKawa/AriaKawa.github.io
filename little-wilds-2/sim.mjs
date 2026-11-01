// Rules of restoration. No DOM: runs in the game, offline catch-up and the pacing test alike.
import { CW, CH, CN, ZONES, FINALE } from './world.mjs';

export const GREEN = .6;           // the height a cell counts as restored
export const SPIRITS = [
  { name: 'Mossling', job: 'Walks to bare ground and wakes the soil.', cost: 30, need: 0, r: 2.2, rate: .05, cap: GREEN, speed: 3.6 },
  { name: 'Petalkin', job: 'Follows the grass and turns it to wildflowers.', cost: 400, need: 1, r: 2.6, rate: .04, cap: 1, speed: 3.2, blooms: true },
  { name: 'Rainwisp', job: 'Drifts over the land, raining on wide patches.', cost: 2500, need: 2, r: 6.5, rate: .016, cap: GREEN, speed: 6 },
  { name: 'Elderoot', job: 'Revives dead trees and stones, then plants new trees.', cost: 15000, need: 4, r: 3.4, rate: .07, cap: 1, speed: 2.4 },
];
export const UPGRADES = [
  { id: 'reach', name: 'Wider hands', desc: 'Your touch heals a wider circle.', cost: 60, grow: 2.7, max: 7 },
  { id: 'warmth', name: 'Warm touch', desc: 'Your touch wakes the ground 25% faster.', cost: 100, grow: 2.8, max: 7 },
  { id: 'roots', name: 'Creeping roots', desc: 'Green land spreads on its own, 35% faster.', cost: 220, grow: 2.6, max: 8 },
  { id: 'feet', name: 'Light feet', desc: 'Spirits move and work 25% faster.', cost: 800, grow: 3, max: 5 },
  { id: 'earth', name: 'Generous earth', desc: 'Restored land gives 30% more seeds.', cost: 1500, grow: 3, max: 6 },
  { id: 'bloom', name: 'Blooming touch', desc: 'Your touch can raise wildflowers too.', cost: 6000, grow: 1, max: 1, need: 1 },
];
const lvl = (s, id) => s.upgrades[id] || 0;
export const doneCount = s => s.zones.filter(z => z.done).length;
export const spiritCost = (s, t) => Math.floor(SPIRITS[t].cost * Math.pow(1.6, s.spirits.filter(a => a.type === t).length - (t === 0 ? 1 : 0)));
export const spiritOpen = (s, t) => doneCount(s) >= SPIRITS[t].need;
export const upgradeCost = (s, u) => Math.floor(u.cost * Math.pow(u.grow, lvl(s, u.id)));
export const upgradeOpen = (s, u) => doneCount(s) >= (u.need || 0);
export const brushRadius = s => 3 + lvl(s, 'reach') * .6;
export const zonePct = (s, w, z) => Math.min(1, s.zones[z].g / (GREEN * w.count[z]));
export const zoneBloom = (s, w, z) => Math.min(1, Math.max(0, (s.zones[z].l / w.count[z] - GREEN) / (1 - GREEN)));
export const valleyPct = (s, w) => s.zones.reduce((a, z, i) => a + zonePct(s, w, i), 0) / s.zones.length;
export const valleyComplete = s => s.zones.every(z => z.done);

export function newLand(land = 0) {
  return {
    v: 3, land, seeds: 0, upgrades: {}, h: new Float32Array(CN),
    spirits: [{ type: 0, x: 40, y: 118, tx: -1, ty: -1, work: 0, walk: 0 }],
    zones: ZONES.map(z => ({ open: z.id === 0, done: false, g: 0, l: 0, water: -1, sweep: -1, sweepLift: GREEN, bloomed: false })),
    objHp: null, trees: [], age: 0, played: 0, last: Date.now(), touched: false, paused: false,
  };
}
export function travel(s) {
  const n = newLand(s.land + 1);
  n.seeds = s.seeds; n.upgrades = s.upgrades; n.played = s.played; n.touched = true;
  n.spirits = s.spirits.map((a, i) => ({ ...a, x: 34 + i % 8 * 2, y: 112 + (i >> 3) * 2, tx: -1, ty: -1, work: 0 }));
  return n;
}
export const initObjects = (s, w) => { if (!s.objHp) s.objHp = w.objects.map(o => o.hp); };

const toughness = z => 1 + z * 1.3;
const seedMult = (s, z) => (1 + z * 1.1) * (1 + lvl(s, 'earth') * .3) * Math.pow(1.5, s.land);
function raise(s, w, i, amount, cap, soft = true) {
  const z = w.zone[i], st = s.zones[z];
  if (!st.open) return 0;
  const v = s.h[i];
  if (v >= cap) return 0;
  const n = Math.min(cap, v + (soft ? amount / toughness(z) : amount)), gain = n - v;
  s.h[i] = n;
  st.g += Math.min(n, GREEN) - Math.min(v, GREEN);
  st.l += gain;
  s.seeds += gain * .4 * seedMult(s, z);
  w.dirty(i);
  return gain;
}
export function heal(s, w, cx, cy, r, amount, cap) {
  let total = 0;
  const x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(CW - 1, Math.ceil(cx + r)), y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(CH - 1, Math.ceil(cy + r));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const d = Math.hypot(x - cx, y - cy) / r;
    if (d < 1) total += raise(s, w, y * CW + x, amount * (1 - d * d * .6), cap);
  }
  return total;
}
function hitObjects(s, w, cx, cy, r, amount, ev) {
  for (const o of w.objects) {
    if (s.objHp[o.id] <= 0 || !s.zones[o.zone].open || Math.hypot(o.x - cx, o.y - cy) > r + o.size / 16) continue;
    s.objHp[o.id] -= amount;
    if (s.objHp[o.id] <= 0) revive(s, w, o, ev);
  }
}
function revive(s, w, o, ev) {
  s.objHp[o.id] = 0;
  heal(s, w, o.x, o.y, 4 + o.size / 12, GREEN * 2, GREEN);
  const reward = o.size * 1.5 * seedMult(s, o.zone);
  s.seeds += reward;
  ev.push({ t: 'revive', o, reward });
}
// The player's touch. Returns how much land woke up, which drives the sound and sparkle.
export function touch(s, w, cx, cy, dt, ev) {
  const cap = lvl(s, 'bloom') ? 1 : GREEN, strength = .8 * (1 + lvl(s, 'warmth') * .25), r = brushRadius(s);
  s.touched = true;
  const gain = heal(s, w, cx, cy, r, strength * dt, cap);
  hitObjects(s, w, cx, cy, r * .9, dt * .9 * (1 + lvl(s, 'warmth') * .25), ev);
  return gain;
}

const openCells = (s, w) => { const out = []; s.zones.forEach((z, i) => { if (z.open) out.push(w.cellsOf[i]); }); return out; };
function seek(s, w, a, lists) {
  const def = SPIRITS[a.type];
  if (a.type === 3) {
    let best = null, bd = Infinity;
    for (const o of w.objects) if (s.objHp[o.id] > 0 && s.zones[o.zone].open) { const d = Math.hypot(o.x - a.x, o.y - a.y); if (d < bd) { bd = d; best = o; } }
    if (best) { a.tx = best.x; a.ty = best.y + .5; return true; }
  }
  const test = a.type === 1 ? v => v >= .5 && v < .97 : a.type === 3 ? v => v >= .5 && v < 1 : a.type === 0 ? v => v < .34 : v => v < .5;
  let best = -1, bd = Infinity;
  for (let k = 0; k < 40 && lists.length; k++) {
    const list = lists[Math.floor(Math.random() * lists.length)], i = list[Math.floor(Math.random() * list.length)];
    if (!test(s.h[i])) continue;
    const d = Math.hypot(i % CW - a.x, Math.floor(i / CW) - a.y);
    if (d < bd) { bd = d; best = i; }
  }
  if (best < 0) { a.tx = -1; a.nap = 3 + Math.random() * 5; return false; }
  a.tx = best % CW + Math.random() - .5; a.ty = Math.floor(best / CW) + Math.random() - .5;
  return def != null;
}
function stepSpirit(s, w, a, dt, lists, ev) {
  const def = SPIRITS[a.type], pace = 1 + lvl(s, 'feet') * .25;
  if (a.held) return;
  if (a.nap > 0) { a.nap -= dt; if (a.nap > 0) return; }
  if (a.tx < 0) { if (!seek(s, w, a, lists)) return; a.work = 0; }
  const dx = a.tx - a.x, dy = a.ty - a.y, d = Math.hypot(dx, dy), step = def.speed * pace * dt;
  const lift = a.type === 1 ? (s.h[Math.round(a.y) * CW + Math.round(a.x)] >= .5 ? 1 : 0) : 1;
  if (d > .3) {
    const m = Math.min(1, step / d);
    a.x += dx * m; a.y += dy * m; a.walk = (a.walk || 0) + dt; a.dir = dx < 0 ? -1 : 1; a.working = false;
    if (lift) heal(s, w, a.x, a.y, def.r * .75, def.rate * pace * dt * .6, def.cap);
    return;
  }
  a.working = true;
  a.work += dt * pace;
  if (lift) heal(s, w, a.x, a.y, def.r, def.rate * pace * dt, def.cap);
  if (a.type === 3 || a.type === 0) hitObjects(s, w, a.x, a.y, def.r, dt * (a.type === 3 ? 1.1 : .25) * pace, ev);
  if (a.work > 1.4) {
    if (a.type === 3 && s.trees.length < 90 && s.h[Math.round(a.y) * CW + Math.round(a.x)] > .7 && Math.random() < .3) {
      const t = { x: a.x, y: a.y, born: s.age, blossom: Math.random() < .35 };
      s.trees.push(t); ev.push({ t: 'tree', tree: t });
    }
    a.tx = -1; a.work = 0;
  }
}
function creep(s, w, dt, carry) {
  const rate = 30 * Math.pow(1.35, lvl(s, 'roots')), hits = rate * dt + carry.v, n = Math.floor(hits);
  carry.v = hits - n;
  for (let k = 0; k < n; k++) {
    const i = Math.floor(Math.random() * CN);
    if (s.h[i] < .4 || !s.zones[w.zone[i]].open) continue;
    const x = i % CW, y = Math.floor(i / CW);
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const xx = x + dx, yy = y + dy;
      if (xx >= 0 && yy >= 0 && xx < CW && yy < CH) raise(s, w, yy * CW + xx, .11, GREEN);
    }
  }
}
function completeZone(s, w, id, ev) {
  const z = s.zones[id];
  z.done = true; z.sweep = 0; z.sweepLift = GREEN;
  for (const o of w.objects) if (o.zone === id && s.objHp[o.id] > 0) revive(s, w, o, ev);
  const opened = [];
  for (const n of ZONES[id].adj) if (!s.zones[n].open) { s.zones[n].open = true; opened.push(n); }
  s.seeds += 300 * seedMult(s, id);
  ev.push({ t: 'zone', zone: id, opened, final: id === FINALE });
  if (s.zones.every(q => q.done)) ev.push({ t: 'valley' });
}
const carries = new WeakMap();
export function tick(s, w, dt, ev = []) {
  if (s.paused) return ev;
  initObjects(s, w);
  s.age += dt;
  if (!carries.has(s)) carries.set(s, { v: Math.random() });
  const lists = openCells(s, w);
  for (const a of s.spirits) stepSpirit(s, w, a, dt, lists, ev);
  creep(s, w, dt, carries.get(s));
  s.zones.forEach((z, id) => {
    if (!z.open) return;
    const pct = zonePct(s, w, id);
    if (z.water < 0 && pct >= .4) { z.water = 0; ev.push({ t: 'water', zone: id }); }
    if (z.water >= 0 && z.water < 1) {
      const before = z.water;
      z.water = Math.min(1, z.water + dt / 9);
      const path = w.streams[id], p = path[Math.min(path.length - 1, Math.floor(z.water / .7 * path.length))];
      if (z.water < .7) heal(s, w, p[0] / 4, p[1] / 4, 8, dt * 1.4, GREEN); // green runs along behind the water's head
      else if (before < .7 || z.water < 1) { const pond = w.ponds[id]; heal(s, w, pond.x / 4, pond.y / 4, (pond.r + 14) / 4, dt * .5, GREEN); }
      w.waterMoved?.(id);
    }
    if (!z.done && pct >= .97) completeZone(s, w, id, ev);
    if (z.sweep >= 0) { // A wave rolls out from the pond and finishes the stragglers, so nobody hunts for the last pixel.
      const list = w.order[id], from = Math.floor(z.sweep), to = Math.min(list.length, from + Math.ceil(list.length / 4.5 * dt));
      for (let k = from; k < to; k++) raise(s, w, list[k], 1, z.sweepLift, false);
      z.sweep = to >= list.length ? -1 : to;
    }
    if (z.done && !z.bloomed && zoneBloom(s, w, id) >= .85) {
      z.bloomed = true; z.sweep = 0; z.sweepLift = 1;
      s.seeds += 900 * seedMult(s, id);
      ev.push({ t: 'bloom', zone: id });
    }
  });
  return ev;
}
export function buySpirit(s, t) {
  if (s.spirits.length >= 40 || !spiritOpen(s, t)) return false;
  const cost = spiritCost(s, t);
  if (s.seeds < cost) return false;
  s.seeds -= cost;
  const home = s.spirits[0] || { x: 40, y: 118 };
  s.spirits.push({ type: t, x: home.x + Math.random() * 2 - 1, y: home.y + Math.random() * 2 - 1, tx: -1, ty: -1, work: 0, walk: 0, born: s.age });
  return true;
}
export function buyUpgrade(s, id) {
  const u = UPGRADES.find(q => q.id === id);
  if (!u || lvl(s, id) >= u.max || !upgradeOpen(s, u)) return false;
  const cost = upgradeCost(s, u);
  if (s.seeds < cost) return false;
  s.seeds -= cost;
  s.upgrades[id] = lvl(s, id) + 1;
  return true;
}
// Offline: spirits and roots keep working in coarse steps, up to four hours.
export function catchUp(s, w, seconds) {
  const span = Math.min(14400, Math.max(0, seconds)), ev = [];
  if (span < 20) return { seconds: 0, seeds: 0, ev };
  const before = s.seeds, steps = Math.min(600, Math.ceil(span / 2)), dt = span / steps;
  const saved = s.spirits.map(a => a.held); s.spirits.forEach(a => { a.held = false; });
  for (let i = 0; i < steps; i++) tick(s, w, dt, ev);
  s.spirits.forEach((a, i) => { a.held = saved[i]; });
  return { seconds: span, seeds: s.seeds - before, ev };
}

const b64 = bytes => { let t = ''; for (let i = 0; i < bytes.length; i += 8192) t += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192)); return btoa(t); };
export function encode(s) {
  const bytes = new Uint8Array(CN);
  for (let i = 0; i < CN; i++) bytes[i] = Math.round(s.h[i] * 255);
  return JSON.stringify({ ...s, h: b64(bytes), spirits: s.spirits.map(({ held, ...a }) => a), last: Date.now() });
}
export function decode(text, w) {
  const o = JSON.parse(text);
  if (o?.v !== 3 || typeof o.h !== 'string' || !Array.isArray(o.spirits) || !Array.isArray(o.zones) || o.zones.length !== ZONES.length || !Number.isFinite(o.seeds)) throw Error('Not a Little Wilds 2 save.');
  const raw = atob(o.h);
  if (raw.length !== CN) throw Error('Bad land data.');
  o.h = new Float32Array(CN);
  o.zones.forEach(z => { z.g = 0; z.l = 0; });
  for (let i = 0; i < CN; i++) {
    const v = raw.charCodeAt(i) / 255, z = o.zones[w.zone[i]];
    o.h[i] = v; z.g += Math.min(v, GREEN); z.l += v;
  }
  return o;
}
