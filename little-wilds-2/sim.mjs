// Rules of restoration. No DOM: runs in the game, offline catch-up and the pacing test alike.
// One field covers the whole continent; glades are bought outward from the middle, and one army of spirits works all of it.
import { CW, CN, LCW, LCH, LCN, ZONES, LANDS } from './world.mjs?v=28';
import { buildNav, markTree, steer, standable, escape } from './nav.mjs?v=28';
// The ground map spirits and animals walk by, rebuilt when a different set of planted trees is in play.
export function navOf(s, w) { if (!w.nav || w.navTrees !== s.trees) { buildNav(w); for (const t of s.trees) markTree(w, t); w.navTrees = s.trees; } return w.nav; }

const WORLD_VERSION = 9, FIELD_VERSION = 4; // objects / the shape of the glades
export const SPIRIT_CAP = 60;
export const GREEN = .6;           // the height a cell counts as restored
export const SPIRITS = [
  { name: 'Mossling', job: 'Walks to bare ground and wakes the soil.', cost: 30, need: 0, r: 2.2, rate: .05, cap: GREEN, speed: 3.6 },
  { name: 'Petalkin', job: 'Follows the grass and turns it to wildflowers.', cost: 400, need: 1, r: 2.6, rate: .04, cap: 1, speed: 3.2, blooms: true },
  { name: 'Rainwisp', job: 'Fills dry riverbeds with water, then drifts over the land raining on wide patches.', cost: 2500, need: 2, r: 6.5, rate: .016, cap: GREEN, speed: 6 },
  { name: 'Elderoot', job: 'Revives dead trees and stones, then plants new trees.', cost: 15000, need: 4, r: 3.4, rate: .07, cap: 1, speed: 2.4 },
];
export const UPGRADES = [
  { id: 'reach', name: 'Wider hands', desc: 'Your touch heals a wider circle.', cost: 60, grow: 2.7, max: 7 },
  { id: 'warmth', name: 'Warm touch', desc: 'Your touch wakes the ground 20% faster.', cost: 100, grow: 2.8, max: 7, more: 1 },
  { id: 'roots', name: 'Creeping roots', desc: 'Green land spreads on its own, 35% faster.', cost: 220, grow: 2.6, max: 8, more: 1 },
  { id: 'feet', name: 'Light feet', desc: 'Spirits move and work 25% faster.', cost: 800, grow: 3, max: 5, more: 1 },
  { id: 'earth', name: 'Generous earth', desc: 'Restored land gives 30% more seeds.', cost: 1500, grow: 3, max: 6, more: 1 },
  { id: 'bloom', name: 'Blooming touch', desc: 'Your touch can raise wildflowers too.', cost: 6000, grow: 1, max: 1, need: 1 },
];
const lvl = (s, id) => s.upgrades[id] || 0;
const landZones = l => ZONES.slice(l * 9, l * 9 + 9).map(z => z.id);
export const landDone = (s, l) => landZones(l).every(z => s.zones[z].done);
export const mapsDone = s => LANDS.filter((_, l) => landDone(s, l)).length;
export const landTouched = (s, l) => s.levels[l] !== undefined;
export const upgradeMax = (s, u) => u.max + (u.more || 0) * mapsDone(s);
// Restored lands keep earning on their own.
export const landIncome = (s, l) => landDone(s, l) ? 40 * Math.pow(1.6, s.levels[l] || 0) : 0;
export const income = s => LANDS.reduce((a, _, l) => a + landIncome(s, l), 0);
export const doneCount = s => s.zones.filter(z => z.done).length;
export const spiritCost = (s, t) => Math.floor(SPIRITS[t].cost * Math.pow(1.6, s.spirits.filter(a => a.type === t).length - (t === 0 ? 1 : 0)));
export const spiritOpen = (s, t) => doneCount(s) >= SPIRITS[t].need;
export const upgradeCost = (s, u) => Math.floor(u.cost * Math.pow(u.grow, lvl(s, u.id)));
export const upgradeOpen = (s, u) => doneCount(s) >= (u.need || 0);
export const brushRadius = s => 3 + lvl(s, 'reach') * .45;
export const zonePct = (s, w, z) => w.count[z] ? Math.min(1, s.zones[z].g / (GREEN * w.count[z])) : 1;
export const zoneBloom = (s, w, z) => Math.min(1, Math.max(0, (s.zones[z].l / w.count[z] - GREEN) / (1 - GREEN)));
export const landPct = (s, w, l) => landZones(l).reduce((a, z) => a + zonePct(s, w, z), 0) / 9;

// Buying: any sleeping glade that touches open ground. The first glade in a new land is the big step;
// after that a land's glades get dearer the more of it you hold, and later lands are richer and tougher.
export const gladeBuyable = (s, z) => !s.zones[z].open && ZONES[z].adj.some(n => s.zones[n].open);
const openIn = (s, l) => landZones(l).filter(z => s.zones[z].open).length;
export const gladePrice = (s, z) => {
  const l = ZONES[z].land;
  if (!landTouched(s, l)) return Math.floor(8000 * Math.pow(2.5, Object.keys(s.levels).length - 1));
  return Math.floor(350 * (1 + openIn(s, l) * 1.1) * Math.pow(1.5, s.levels[l]));
};
export function buyGlade(s, z) {
  if (!gladeBuyable(s, z) || s.seeds < gladePrice(s, z)) return false;
  const l = ZONES[z].land;
  s.seeds -= gladePrice(s, z);
  if (!landTouched(s, l)) s.levels[l] = Object.keys(s.levels).length;
  s.zones[z].rank = openIn(s, l);
  s.zones[z].open = true;
  return true;
}

const freshZones = () => ZONES.map(z => ({ open: z.id === 0, done: false, g: 0, l: 0, water: -1, sweep: -1, sweepLift: GREEN, bloomed: false, rank: z.id === 0 ? 0 : undefined }));
const firstSpirit = () => ({ type: 0, x: ZONES[0].px / 4, y: ZONES[0].py / 4 + 2, tx: -1, ty: -1, work: 0, walk: 0 });
export function newLand() {
  return {
    v: 5, levels: { 0: 0 }, seeds: 0, upgrades: {}, h: new Float32Array(CN),
    spirits: [firstSpirit()], zones: freshZones(),
    objHp: null, trees: [], age: 0, played: 0, last: Date.now(), touched: false, paused: false,
  };
}
export const initObjects = (s, w) => { if (s.objHp?.length !== w.objects.length || s.wv !== WORLD_VERSION) { s.objHp = w.objects.map(o => s.zones[o.zone].done ? 0 : o.hp); if (s.wv !== WORLD_VERSION) s.zones.forEach(z => { if (z.done) z.sweep = 0; }); s.wv = WORLD_VERSION; } };

const levelOf = (s, z) => s.levels[ZONES[z].land] || 0, rankOf = (s, z) => s.zones[z].rank || 0;
const toughness = (s, z) => (1 + rankOf(s, z) * 1.3) * (1 + levelOf(s, z) * .6);
const seedMult = (s, z) => (1 + rankOf(s, z) * 1.1) * (1 + lvl(s, 'earth') * .3) * Math.pow(1.5, levelOf(s, z));
function raise(s, w, i, amount, cap, soft = true) {
  const z = w.zone[i], st = s.zones[z];
  if (!st.open || w.blocked[i]) return 0;
  const v = s.h[i];
  if (v >= cap) return 0;
  const n = Math.min(cap, v + (soft ? amount / toughness(s, z) : amount)), gain = n - v;
  s.h[i] = n;
  st.g += Math.min(n, GREEN) - Math.min(v, GREEN);
  st.l += gain;
  s.seeds += gain * .4 * seedMult(s, z);
  w.dirty(i);
  return gain;
}
export function heal(s, w, cx, cy, r, amount, cap) {
  let total = 0;
  const x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(CW - 1, Math.ceil(cx + r)), y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(CN / CW - 1, Math.ceil(cy + r));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const d = Math.hypot(x - cx, y - cy) / r;
    if (d < 1) total += raise(s, w, y * CW + x, amount * (1 - d * d * .6), cap);
  }
  return total;
}
function hitObjects(s, w, cx, cy, r, amount, ev) {
  for (const o of w.objects) {
    if (s.objHp[o.id] <= 0 || Math.abs(o.x - cx) > r + 8 || Math.abs(o.y - cy) > r + 8 || !s.zones[o.zone].open || Math.hypot(o.x - cx, o.y - cy) > r + o.size / 16) continue;
    s.objHp[o.id] -= amount;
    if (s.objHp[o.id] <= 0) revive(s, w, o, ev);
  }
}
function revive(s, w, o, ev) {
  s.objHp[o.id] = 0;
  heal(s, w, o.x, o.y, 4 + (o.worth ?? o.size) / 12, GREEN * 2, GREEN);
  const reward = (o.worth ?? o.size) * 1.5 * seedMult(s, o.zone);
  s.seeds += reward;
  ev.push({ t: 'revive', o, reward });
}
// A touch soaks the ground and the land drinks it over the next moment, so green blooms
// in a wake behind the hand instead of only under it.
const TOUCH = 3.2, DRINK = 1.7;
function soak(s, w, cx, cy, r, amount, cap) {
  let total = 0;
  const x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(CW - 1, Math.ceil(cx + r)), y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(CN / CW - 1, Math.ceil(cy + r));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const d = Math.hypot(x - cx, y - cy) / r, i = y * CW + x, z = w.zone[i];
    if (d >= 1 || !s.zones[z].open || w.blocked[i]) continue;
    const room = cap - s.h[i] - w.pend[i];
    if (room <= 0) continue;
    const add = Math.min(room, amount * (1 - d * d * .6) / ((1 + rankOf(s, z) * 1.5) * (1 + levelOf(s, z) * .6)));
    if (!w.pend[i]) w.active.push(i);
    w.pend[i] += add;
    total += add;
  }
  return total;
}
function drink(s, w, dt) {
  const a = w.active;
  for (let k = a.length - 1; k >= 0; k--) {
    const i = a[k], take = Math.min(w.pend[i], DRINK * dt);
    raise(s, w, i, take, 1, false);
    w.pend[i] -= take;
    if (w.pend[i] <= 1e-4) { w.pend[i] = 0; a[k] = a[a.length - 1]; a.pop(); }
  }
}
// The player's touch. Returns how much land woke up, which drives the sound and sparkle.
export function touch(s, w, cx, cy, dt, ev) {
  const cap = lvl(s, 'bloom') ? 1 : GREEN, strength = TOUCH * (1 + lvl(s, 'warmth') * .2), r = brushRadius(s);
  s.touched = true;
  const gain = soak(s, w, cx, cy, r, strength * dt, cap);
  hitObjects(s, w, cx, cy, r * .9, dt * .9 * (1 + lvl(s, 'warmth') * .25), ev);
  return gain;
}

// Spirits work the open glades nearest them that still need their kind of work, so the army spreads
// across the frontier instead of all walking to the far side of the continent.
const WANT = [z => !z.done, z => z.done && !z.bloomed, z => !z.done, z => !z.bloomed];
function nearLists(s, w, a) {
  const want = WANT[a.type], near = [];
  for (let z = 0; z < s.zones.length; z++) {
    const st = s.zones[z]; if (!st.open || !want(st)) continue;
    near.push([(ZONES[z].px / 4 - a.x) ** 2 + (ZONES[z].py / 4 - a.y) ** 2, z]);
  }
  near.sort((p, q) => p[0] - q[0]);
  return near.slice(0, 3).map(p => w.cellsOf[p[1]]);
}
function seek(s, w, a) {
  const def = SPIRITS[a.type];
  // Riverbeds stay dry until a Rainwisp comes: it drifts to the head of the nearest dry one and fills it.
  if (a.type === 2) {
    let best = -1, bd = Infinity;
    s.zones.forEach((z, id) => { if (!z.open || z.water >= 0 || !w.streams[id]?.length) return; const p = w.streams[id][0], d = Math.hypot(p[0] / 4 - a.x, p[1] / 4 - a.y); if (d < bd) { bd = d; best = id; } });
    if (best >= 0) { const p = w.streams[best][0]; a.tx = p[0] / 4; a.ty = p[1] / 4; a.fill = best; return true; }
  }
  if (a.type === 3) {
    let best = null, bd = Infinity;
    for (const o of w.objects) if (s.objHp[o.id] > 0 && s.zones[o.zone].open) { const d = Math.hypot(o.x - a.x, o.y - a.y); if (d < bd) { bd = d; best = o; } }
    if (best && bd < 160) { // Stands on open ground just in front of it, or beside it.
      for (const [dx, dy] of [[0, 1.6], [-2.2, 1.2], [2.2, 1.2], [0, 2.6], [-3, .2], [3, .2], [-2, 2.8], [2, 2.8]]) { const x = best.x + dx, y = best.y + dy; if (standable(w, Math.floor(y) * CW + Math.floor(x))) { a.tx = x; a.ty = y; return true; } }
    }
  }
  const lists = nearLists(s, w, a);
  const test = a.type === 1 ? v => v >= .5 && v < .97 : a.type === 3 ? v => v >= .5 && v < 1 : a.type === 0 ? v => v < .34 : v => v < .5;
  let best = -1, bd = Infinity, thin = -1, td = Infinity;
  for (let k = 0; k < 40 && lists.length; k++) {
    const list = lists[Math.floor(Math.random() * lists.length)], i = list[Math.floor(Math.random() * list.length)], d = Math.hypot(i % CW - a.x, Math.floor(i / CW) - a.y);
    if (a.type !== 2 && !standable(w, i)) continue; // walkers want ground they can stand on; the Rainwisp floats
    if (test(s.h[i])) { if (d < bd) { bd = d; best = i; } }
    else if (s.h[i] < GREEN * .98 && a.type !== 1 && d < td) { td = d; thin = i; } // Ground that looks green but is not finished, so no glade stalls just short.
  }
  if (best < 0) best = thin;
  if (best < 0) { a.tx = -1; a.nap = 3 + Math.random() * 5; return false; }
  a.tx = best % CW + Math.random() - .5; a.ty = Math.floor(best / CW) + Math.random() - .5;
  return def != null;
}
function stepSpirit(s, w, a, dt, ev) {
  const def = SPIRITS[a.type], pace = 1 + lvl(s, 'feet') * .25;
  if (a.held) return;
  if (a.type !== 2 && !w.rough && escape(w, a, def.speed * pace * dt)) { a.nap = 0; a.working = false; a.walk = (a.walk || 0) + dt; return; }
  if (a.nap > 0) { a.nap -= dt; if (a.nap > 0) return; }
  if (a.tx < 0) { if (!seek(s, w, a)) return; a.work = 0; }
  const dx = a.tx - a.x, dy = a.ty - a.y, d = Math.hypot(dx, dy), step = def.speed * pace * dt;
  const lift = a.type === 1 ? (s.h[Math.round(a.y) * CW + Math.round(a.x)] >= .5 ? 1 : 0) : 1;
  if (d > .3) {
    // Walk round trees, stones, houses and ponds, bounding over streams. The Rainwisp floats over water.
    const r = w.rough ? (a.x += dx * Math.min(1, step / d), a.y += dy * Math.min(1, step / d), Math.hypot(a.tx - a.x, a.ty - a.y) < .3 ? 'arrived' : 'moving') : steer(w, a, a.tx, a.ty, step, dt, a.type === 2);
    if (r === 'stuck') { w.stuck = (w.stuck || 0) + 1; a.tx = -1; a.nap = .4 + Math.random() * .8; return; }
    if (r === 'moving') {
      a.walk = (a.walk || 0) + dt; a.working = false;
      if (lift) heal(s, w, a.x, a.y, def.r * .75, def.rate * pace * dt * .6, def.cap);
      return;
    }
    a.tx = a.x; a.ty = a.y;
  }
  if (a.fill != null) { // A Rainwisp at the head of a dry riverbed: the water starts here.
    const z = s.zones[a.fill];
    if (z.water < 0) { z.water = 0; ev.push({ t: 'water', zone: a.fill }); }
    a.fill = null; a.tx = -1; a.work = 0; a.nap = 1.5;
    return;
  }
  if (!a.working) w.reached = (w.reached || 0) + 1;
  a.working = true;
  a.work += dt * pace;
  if (lift) heal(s, w, a.x, a.y, def.r, def.rate * pace * dt, def.cap);
  if (a.type === 3 || a.type === 0) hitObjects(s, w, a.x, a.y, def.r, dt * (a.type === 3 ? 1.1 : .25) * pace, ev);
  if (a.work > 1.4) {
    if (a.type === 3 && s.trees.length < 160 && s.h[Math.round(a.y) * CW + Math.round(a.x)] > .7 && Math.random() < .3 && w.free(a.x * 4, a.y * 4) && s.trees.every(q => Math.hypot(q.x - a.x, q.y - a.y) > 6)) {
      const t = { x: a.x, y: a.y, born: s.age, blossom: Math.random() < .35 };
      s.trees.push(t); markTree(w, t); ev.push({ t: 'tree', tree: t });
    }
    a.tx = -1; a.work = 0;
  }
}
// Green spreads on its own. The rate scales with how much ground is open, as it did on a single land.
function creep(s, w, dt, carry) {
  const lists = [], ends = [];
  let total = 0;
  s.zones.forEach((z, i) => { if (z.open && w.count[i]) { lists.push(w.cellsOf[i]); total += w.count[i]; ends.push(total); } });
  if (!total) return;
  const rate = 30 * Math.pow(1.35, lvl(s, 'roots')) * total / LCN, hits = rate * dt + carry.v, all = Math.floor(hits);
  carry.v = hits - all;
  // Long steps (offline catch-up) take fewer, bigger hops, so hours of growth cost a moment to work out.
  const n = Math.min(all, 2500), push = Math.min(GREEN, .11 * all / Math.max(1, n));
  for (let k = 0; k < n; k++) {
    const r = Math.random() * total; let q = 0; while (ends[q] <= r) q++;
    const list = lists[q], i = list[Math.floor(Math.random() * list.length)];
    if (s.h[i] < .4) continue;
    const x = i % CW, y = Math.floor(i / CW);
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const xx = x + dx, yy = y + dy;
      if (xx >= 0 && yy >= 0 && xx < CW && yy * CW < CN) raise(s, w, yy * CW + xx, push, GREEN);
    }
  }
}
function completeZone(s, w, id, ev) {
  const z = s.zones[id];
  z.done = true; z.sweep = 0; z.sweepLift = GREEN;
  for (const o of w.objects) if (o.zone === id && s.objHp[o.id] > 0) revive(s, w, o, ev);
  s.seeds += 300 * seedMult(s, id);
  const land = ZONES[id].land, whole = landDone(s, land);
  ev.push({ t: 'zone', zone: id, final: whole });
  if (whole) ev.push({ t: 'valley', land });
}
const carries = new WeakMap();
// `slice`/`of` let the game walk a fraction of the spirits each frame instead of all at once.
export function tick(s, w, dt, ev = [], slice = 0, of = 1) {
  if (s.paused) return ev;
  initObjects(s, w);
  s.age += dt;
  s.seeds += income(s) * dt;
  if (!carries.has(s)) carries.set(s, { v: Math.random() });
  drink(s, w, dt);
  navOf(s, w);
  for (let n = slice; n < s.spirits.length; n += of) stepSpirit(s, w, s.spirits[n], dt * of, ev);
  creep(s, w, dt, carries.get(s));
  s.zones.forEach((z, id) => {
    if (!z.open) return;
    const pct = zonePct(s, w, id);
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
  if (s.spirits.length >= SPIRIT_CAP || !spiritOpen(s, t)) return false;
  const cost = spiritCost(s, t);
  if (s.seeds < cost) return false;
  s.seeds -= cost;
  const home = s.spirits[0] || firstSpirit();
  s.spirits.push({ type: t, x: home.x + Math.random() * 2 - 1, y: home.y + Math.random() * 2 - 1, tx: -1, ty: -1, work: 0, walk: 0, born: s.age });
  return true;
}
export function buyUpgrade(s, id) {
  const u = UPGRADES.find(q => q.id === id);
  if (!u || lvl(s, id) >= upgradeMax(s, u) || !upgradeOpen(s, u)) return false;
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
  w.rough = true; // While away, spirits walk straight to their work: nobody is watching, and it keeps this quick.
  try { for (let i = 0; i < steps; i++) tick(s, w, dt, ev); } finally { w.rough = false; }
  s.spirits.forEach((a, i) => { a.held = saved[i]; a.goalX = undefined; a.route = null; });
  return { seconds: span, seeds: s.seeds - before, ev };
}

function b64(bytes) { let t = ''; for (let i = 0; i < bytes.length; i += 8192) t += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192)); return btoa(t); }
export function encode(s) {
  const bytes = new Uint8Array(CN);
  for (let i = 0; i < CN; i++) bytes[i] = Math.round(s.h[i] * 255);
  return JSON.stringify({ ...s, h: b64(bytes), spirits: s.spirits.map(({ held, rx, ry, anim, px, py, ...a }) => a), last: Date.now() });
}
function loadField(s, w) {
  s.zones.forEach(z => { z.g = 0; z.l = 0; });
  for (let i = 0; i < CN; i++) { if (w.blocked[i]) { s.h[i] = 0; continue; } const v = s.h[i], z = s.zones[w.zone[i]]; z.g += Math.min(v, GREEN); z.l += v; }
}
// Raises each glade to at least the share of green it had reached, spreading out from its pond.
function growTo(s, w, want) {
  s.zones.forEach((z, id) => {
    const p = want[id];
    if (p == null && !z.done) return;
    const goal = (z.done ? 1 : p) * GREEN * w.count[id], list = w.order[id];
    for (let k = 0; k < list.length && z.g < goal; k++) { const i = list[k], v = s.h[i]; if (v < GREEN) { s.h[i] = GREEN; z.g += GREEN - v; z.l += GREEN - v; } }
  });
}
// When the shape of the glades changes, each glade's share of green is laid back down around its own pond,
// so old progress never keeps the outline of the old borders.
function reshape(s, w, share) {
  s.h = new Float32Array(CN);
  s.zones.forEach((z, id) => {
    if (!z.open) return;
    const list = w.order[id], n = Math.round((z.done ? 1 : Math.min(1, share[id] || 0)) * list.length), v = z.bloomed ? .99 : z.done ? .75 : GREEN;
    for (let k = 0; k < n; k++) s.h[list[k]] = v;
  });
  loadField(s, w);
}
// Before the open continent, each land was its own map. Their saved pieces are laid back into place here.
function fromLands(o, w) {
  const h = new Float32Array(CN), zones = freshZones(), levels = {}, spirits = [], trees = [], hp = new Array(w.objects.length).fill(-1), want = [];
  zones[0].open = false;
  const lands = { ...o.atlas, [o.land]: { h: o.h, zones: o.zones, spirits: o.spirits, objHp: o.objHp, trees: o.trees, level: o.level } };
  for (const key in lands) {
    const id = +key, m = lands[key], L = LANDS[id], cx = L.col * LCW, cy = L.row * LCH, raw = m.h ? atob(m.h) : null, full = m.h === '';
    if (!m.zones || (raw && raw.length !== LCN)) continue;
    levels[id] = m.level || 0;
    for (let y = 0; y < LCH; y++) for (let x = 0; x < LCW; x++) h[(cy + y) * CW + cx + x] = full ? 1 : raw ? raw.charCodeAt(y * LCW + x) / 255 : 0;
    const open = m.zones.map((z, j) => z.open ? j : -1).filter(j => j >= 0);
    m.zones.forEach((z, j) => { zones[id * 9 + j] = { open: !!z.open, done: !!z.done, g: 0, l: 0, water: z.water ?? -1, sweep: -1, sweepLift: z.bloomed ? 1 : GREEN, bloomed: !!z.bloomed, rank: z.open ? (id === 0 ? j : open.indexOf(j)) : undefined }; if (m.p) want[id * 9 + j] = m.p[j]; });
    for (const a of m.spirits || [{ type: 0, x: 40, y: 118 }]) spirits.push({ type: a.type, x: a.x + cx, y: a.y + cy, tx: -1, ty: -1, work: 0, walk: 0, born: a.born });
    for (const t of m.trees || []) trees.push({ ...t, x: t.x + cx, y: t.y + cy });
    const start = w.objStart[id], end = w.objStart[id + 1] ?? w.objects.length;
    if (m.objHp?.length === end - start) m.objHp.forEach((v, k) => { hp[start + k] = v; });
  }
  if (!Object.keys(levels).length) throw Error('Nothing to keep.');
  const s = { ...o, v: 5, levels, h, zones, spirits: spirits.slice(0, SPIRIT_CAP), trees: trees.slice(0, 160), objHp: null, wv: WORLD_VERSION };
  delete s.atlas; delete s.land; delete s.level; delete s.opened; delete s.gateFill; delete s.awayT;
  loadField(s, w);
  growTo(s, w, want);
  reshape(s, w, s.zones.map((_, id) => zonePct(s, w, id)));
  s.objHp = w.objects.map((ob, k) => hp[k] >= 0 && !s.zones[ob.zone].done ? hp[k] : s.zones[ob.zone].done ? 0 : ob.hp);
  return s;
}
export function decode(text, w) {
  const o = JSON.parse(text);
  if (![3, 4, 5].includes(o?.v) || typeof o.h !== 'string' || !Array.isArray(o.spirits) || !Array.isArray(o.zones) || !Number.isFinite(o.seeds)) throw Error('Not a Little Wilds 2 save.');
  if (o.v === 3) { // Before the continent, "Travel on" discarded each finished land. Those count as restored.
    const L = Math.min(o.land || 0, LANDS.length - 1), full = () => Array.from({ length: 9 }, () => ({ open: true, done: true, water: 1, bloomed: true }));
    o.v = 4; o.land = L; o.level = L; o.atlas = {};
    for (let n = 0; n < L; n++) o.atlas[n] = { h: '', zones: full(), trees: [], level: n };
  }
  if (o.v === 4) { if (o.zones.length !== 9) throw Error('Not a Little Wilds 2 save.'); return dryUnlessWisp(fromLands(o, w)); }
  if (o.zones.length !== ZONES.length) throw Error('Not a Little Wilds 2 save.');
  const raw = atob(o.h);
  if (raw.length !== CN) throw Error('Bad land data.');
  o.h = new Float32Array(CN);
  for (let i = 0; i < CN; i++) o.h[i] = raw.charCodeAt(i) / 255;
  const share = o.zones.map((z, id) => (z.g || 0) / (GREEN * w.count[id]));
  loadField(o, w);
  if ((o.wv || 0) < FIELD_VERSION) reshape(o, w, share.map((v, id) => Math.max(v, zonePct(o, w, id))));
  // Trees planted before they had to find clear ground: any in water, on a road or on top of another are gone.
  o.trees = (o.trees || []).filter((q, n, all) => w.free(q.x * 4, q.y * 4) && all.slice(0, n).every(r => Math.hypot(r.x - q.x, r.y - q.y) > 6));
  return dryUnlessWisp(o);
}
// Water only comes with a Rainwisp. Saves from before that rule, with no Rainwisp yet, have their riverbeds dry again.
function dryUnlessWisp(o) {
  if (!o.spirits.some(a => a.type === 2)) for (const z of o.zones) z.water = -1;
  return o;
}
