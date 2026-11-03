// Rules of restoration. No DOM: runs in the game, offline catch-up and the pacing test alike.
import { CW, CH, CN, ZONES, FINALE, LANDS } from './world.mjs';

const WORLD_VERSION = 3, LAND_BASE = 8000, LAND_GROW = 2.5;
export const GREEN = .6;           // the height a cell counts as restored
export const SPIRITS = [
  { name: 'Mossling', job: 'Walks to bare ground and wakes the soil.', cost: 30, need: 0, r: 2.2, rate: .05, cap: GREEN, speed: 3.6 },
  { name: 'Petalkin', job: 'Follows the grass and turns it to wildflowers.', cost: 400, need: 1, r: 2.6, rate: .04, cap: 1, speed: 3.2, blooms: true },
  { name: 'Rainwisp', job: 'Drifts over the land, raining on wide patches.', cost: 2500, need: 2, r: 6.5, rate: .016, cap: GREEN, speed: 6 },
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
export const isComplete = (s, id) => id === s.land ? s.zones.every(z => z.done) : !!s.atlas[id]?.complete;
export const mapsDone = s => LANDS.filter((_, id) => isComplete(s, id)).length;
// Any land can be bought at any time. Each one costs more than the last, whichever you pick.
export const landsOwned = s => Object.keys(s.opened).length;
export const landPrice = s => Math.floor(LAND_BASE * Math.pow(LAND_GROW, landsOwned(s) - 1));
export const canBuyLand = (s, id) => !s.opened[id] && s.seeds >= landPrice(s);
// A sleeping glade next to open ground can be woken with seeds, or for free by finishing its neighbour.
export const gladeBuyable = (s, z) => !s.zones[z].open && ZONES[z].adj.some(n => s.zones[n].open);
export const gladePrice = (s, z) => Math.floor(350 * (1 + z * 1.1) * Math.pow(1.5, s.level));
export const upgradeMax = (s, u) => u.max + (u.more || 0) * mapsDone(s);
export const mapPct = (s, w, id) => id === s.land ? valleyPct(s, w) : s.atlas[id]?.pct || 0;
export const crewOf = (s, id) => id === s.land ? s.spirits.length : s.atlas[id]?.spirits?.length ?? (s.atlas[id] ? 1 : 0);
// Restored lands keep earning wherever you are.
export const mapIncome = (s, id) => isComplete(s, id) ? 40 * Math.pow(1.6, id === s.land ? s.level : s.atlas[id].level) : 0;
export const income = s => LANDS.reduce((a, _, id) => a + mapIncome(s, id), 0);
export const doneCount = s => s.zones.filter(z => z.done).length + Object.values(s.atlas).reduce((a, m) => a + (m.done || 0), 0);
export const spiritCost = (s, t) => Math.floor(SPIRITS[t].cost * Math.pow(1.5, s.level) * Math.pow(1.6, s.spirits.filter(a => a.type === t).length - (t === 0 ? 1 : 0)));
export const spiritOpen = (s, t) => doneCount(s) >= SPIRITS[t].need;
export const upgradeCost = (s, u) => Math.floor(u.cost * Math.pow(u.grow, lvl(s, u.id)));
export const upgradeOpen = (s, u) => doneCount(s) >= (u.need || 0);
export const brushRadius = s => 3 + lvl(s, 'reach') * .45;
export const zonePct = (s, w, z) => w.count[z] ? Math.min(1, s.zones[z].g / (GREEN * w.count[z])) : 1;
export const zoneBloom = (s, w, z) => Math.min(1, Math.max(0, (s.zones[z].l / w.count[z] - GREEN) / (1 - GREEN)));
export const valleyPct = (s, w) => s.zones.reduce((a, z, i) => a + zonePct(s, w, i), 0) / s.zones.length;
export const valleyComplete = s => s.zones.every(z => z.done);

const freshZones = () => ZONES.map(z => ({ open: z.id === 0, done: false, g: 0, l: 0, water: -1, sweep: -1, sweepLift: GREEN, bloomed: false }));
export function newLand(land = 0) {
  return {
    v: 4, land, level: 0, seeds: 0, upgrades: {}, h: new Float32Array(CN), atlas: {}, opened: { 0: true }, gateFill: {},
    spirits: [{ type: 0, x: 40, y: 118, tx: -1, ty: -1, work: 0, walk: 0 }],
    zones: freshZones(),
    objHp: null, trees: [], age: 0, played: 0, last: Date.now(), touched: false, paused: false,
  };
}
export const gateState = (s, g) => s.opened[g.target] ? 'open' : canBuyLand(s, g.target) ? 'ready' : 'locked';
const firstCrew = () => [{ type: 0, x: 40, y: 118, tx: -1, ty: -1, work: 0, walk: 0 }];
export function buyLand(s, id) {
  if (!canBuyLand(s, id)) return false;
  s.seeds -= landPrice(s);
  s.atlas[id] = { zones: freshZones(), spirits: firstCrew(), objHp: null, trees: [], wv: WORLD_VERSION, level: landsOwned(s), complete: false, done: 0, pct: 0, p: ZONES.map(() => 0) };
  s.opened[id] = true;
  return true;
}
export function buyGlade(s, z) {
  if (!gladeBuyable(s, z) || s.seeds < gladePrice(s, z)) return false;
  s.seeds -= gladePrice(s, z);
  s.zones[z].open = true;
  return true;
}
// Only one map is live at a time. The rest wait in the atlas as compact strings.
export function leaveMap(s, w) {
  const bytes = new Uint8Array(CN);
  for (let i = 0; i < CN; i++) bytes[i] = Math.round(s.h[i] * 255);
  s.atlas[s.land] = { h: b64(bytes), zones: s.zones.map(z => ({ ...z, g: 0, l: 0 })), spirits: s.spirits.map(({ held, rx, ry, anim, px, py, ...a }) => a), objHp: s.objHp, trees: s.trees, wv: s.wv, level: s.level, complete: isComplete(s, s.land), done: s.zones.filter(z => z.done).length, pct: valleyPct(s, w), p: s.zones.map((_, i) => zonePct(s, w, i)), counts: w.count };
}
// `w` must already be the world of map `id`.
export function enterMap(s, w, id) {
  const m = s.atlas[id];
  delete s.atlas[id];
  s.level = m ? m.level : landsOwned(s) - (s.opened[id] ? 1 : 0);
  s.spirits = m?.spirits || firstCrew();
  s.land = id; s.opened[id] = true;
  s.zones = m ? m.zones : freshZones(); s.objHp = m ? m.objHp : null; s.trees = m ? m.trees : []; s.wv = m ? m.wv : WORLD_VERSION;
  s.h = new Float32Array(CN);
  loadField(s, w, m?.h);
  if (m?.p) growTo(s, w, m.p);
  w.pend.fill(0); w.active.length = 0;
  const at = s.zones.findIndex(z => z.open && !z.done), home = ZONES[at < 0 ? 0 : at];
  s.spirits.forEach((a, i) => { a.x = home.px / 4 + (i % 8 - 4) * 1.5; a.y = home.py / 4 + 2 + (i >> 3) * 1.5; a.rx = a.ry = undefined; a.tx = -1; a.work = 0; a.nap = 0; });
}
// Catches the ground up with what the crew did while nobody was looking, spreading out from each pond.
function growTo(s, w, p) {
  s.zones.forEach((z, id) => {
    const want = (z.done ? 1 : p[id]) * GREEN * w.count[id], list = w.order[id];
    for (let k = 0; k < list.length && z.g < want; k++) { const i = list[k], v = s.h[i]; if (v < GREEN) { s.h[i] = GREEN; z.g += GREEN - v; z.l += GREEN - v; } }
  });
  if (s.objHp) w.objects.forEach(o => { if (s.zones[o.zone].done) s.objHp[o.id] = 0; });
}
function loadField(s, w, text) {
  s.zones.forEach(z => { z.g = 0; z.l = 0; });
  if (!text && text !== '') return;
  const raw = text ? atob(text) : null;
  if (raw && raw.length !== CN) throw Error('Bad land data.');
  for (let i = 0; i < CN; i++) {
    if (w.blocked[i]) continue;
    const v = raw ? raw.charCodeAt(i) / 255 : 1, z = s.zones[w.zone[i]];
    s.h[i] = v; z.g += Math.min(v, GREEN); z.l += v;
  }
}
export const initObjects = (s, w) => { if (s.objHp?.length !== w.objects.length || s.wv !== WORLD_VERSION) { s.objHp = w.objects.map(o => s.zones[o.zone].done ? 0 : o.hp); if (s.wv !== WORLD_VERSION) s.zones.forEach(z => { if (z.done) z.sweep = 0; }); s.wv = WORLD_VERSION; } };

const hardness = s => 1 + s.level * .6;
const toughness = (s, z) => (1 + z * 1.3) * hardness(s);
const multAt = (s, z, level) => (1 + z * 1.1) * (1 + lvl(s, 'earth') * .3) * Math.pow(1.5, level);
const seedMult = (s, z) => multAt(s, z, s.level);
// Lands you are not on run on a simple model: their crew's work is shared across the open glades.
const AWAY_RATE = [.9, 0, 1.1, 2.6], AWAY_CELLS = 3400;
function stepAway(s, dt, ev) {
  for (const id in s.atlas) {
    const m = s.atlas[id];
    if (m.complete || !m.zones) continue;
    m.spirits ||= firstCrew();
    m.p ||= m.zones.map(z => z.done ? 1 : 0);
    const live = m.zones.map((z, i) => z.open && !z.done ? i : -1).filter(i => i >= 0);
    if (!live.length) continue;
    const pace = 1 + lvl(s, 'feet') * .25, reach = m.p.reduce((a, v) => a + v, 0) / m.p.length;
    const work = m.spirits.reduce((a, q) => a + AWAY_RATE[q.type] * pace, 0) + 2 * Math.pow(1.35, lvl(s, 'roots')) * Math.min(1, reach * 2);
    for (const z of live) {
      const amount = work / live.length * dt / ((1 + z * 1.3) * (1 + m.level * .6)), cells = m.counts?.[z] || AWAY_CELLS;
      const room = (1 - m.p[z]) * GREEN * cells, gain = Math.min(room, amount);
      m.p[z] += gain / (GREEN * cells);
      s.seeds += gain * .4 * multAt(s, z, m.level);
      if (m.p[z] < .97) continue;
      m.p[z] = 1; m.zones[z].done = true; m.done = (m.done || 0) + 1;
      for (const n of ZONES[z].adj) m.zones[n].open = true;
      s.seeds += 300 * multAt(s, z, m.level);
      m.complete = m.zones.every(q => q.done);
      ev.push({ t: 'away', land: +id, zone: z, complete: m.complete });
    }
    m.pct = Math.max(m.pct || 0, m.p.reduce((a, v) => a + v, 0) / m.p.length);
  }
}
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
// A touch soaks the ground and the land drinks it over the next moment, so green blooms
// in a wake behind the hand instead of only under it.
const TOUCH = 3.2, DRINK = 1.7;
function soak(s, w, cx, cy, r, amount, cap) {
  let total = 0;
  const x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(CW - 1, Math.ceil(cx + r)), y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(CH - 1, Math.ceil(cy + r));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const d = Math.hypot(x - cx, y - cy) / r, i = y * CW + x, z = w.zone[i];
    if (d >= 1 || !s.zones[z].open || w.blocked[i]) continue;
    const room = cap - s.h[i] - w.pend[i];
    if (room <= 0) continue;
    const add = Math.min(room, amount * (1 - d * d * .6) / ((1 + z * 1.5) * hardness(s)));
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

const openCells = (s, w) => { const out = []; s.zones.forEach((z, i) => { if (z.open) out.push(w.cellsOf[i]); }); return out; };
function seek(s, w, a, lists) {
  const def = SPIRITS[a.type];
  if (a.type === 3) {
    let best = null, bd = Infinity;
    for (const o of w.objects) if (s.objHp[o.id] > 0 && s.zones[o.zone].open) { const d = Math.hypot(o.x - a.x, o.y - a.y); if (d < bd) { bd = d; best = o; } }
    if (best) { a.tx = best.x; a.ty = best.y + .5; return true; }
  }
  const test = a.type === 1 ? v => v >= .5 && v < .97 : a.type === 3 ? v => v >= .5 && v < 1 : a.type === 0 ? v => v < .34 : v => v < .5;
  let best = -1, bd = Infinity, thin = -1, td = Infinity;
  for (let k = 0; k < 40 && lists.length; k++) {
    const list = lists[Math.floor(Math.random() * lists.length)], i = list[Math.floor(Math.random() * list.length)], d = Math.hypot(i % CW - a.x, Math.floor(i / CW) - a.y);
    if (test(s.h[i])) { if (d < bd) { bd = d; best = i; } }
    else if (s.h[i] < GREEN * .98 && a.type !== 1 && d < td) { td = d; thin = i; } // Ground that looks green but is not finished, so no glade stalls just short.
  }
  if (best < 0) best = thin;
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
    if (a.type === 3 && s.trees.length < 90 && s.h[Math.round(a.y) * CW + Math.round(a.x)] > .7 && !w.road[Math.round(a.y * 4) * CW * 4 + Math.round(a.x * 4)] && Math.random() < .3) {
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
// `slice`/`of` let the game walk a fraction of the spirits each frame instead of all at once.
export function tick(s, w, dt, ev = [], slice = 0, of = 1) {
  if (s.paused) return ev;
  initObjects(s, w);
  s.age += dt;
  s.seeds += income(s) * dt;
  s.awayT = (s.awayT || 0) + dt;
  if (s.awayT >= 1) { stepAway(s, s.awayT, ev); s.awayT = 0; }
  if (!carries.has(s)) carries.set(s, { v: Math.random() });
  drink(s, w, dt);
  const lists = openCells(s, w);
  for (let n = slice; n < s.spirits.length; n += of) stepSpirit(s, w, s.spirits[n], dt * of, lists, ev);
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
  for (let i = 0; i < steps; i++) tick(s, w, dt, ev);
  s.spirits.forEach((a, i) => { a.held = saved[i]; });
  return { seconds: span, seeds: s.seeds - before, ev };
}

function b64(bytes) { let t = ''; for (let i = 0; i < bytes.length; i += 8192) t += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192)); return btoa(t); }
export function encode(s) {
  const bytes = new Uint8Array(CN);
  for (let i = 0; i < CN; i++) bytes[i] = Math.round(s.h[i] * 255);
  return JSON.stringify({ ...s, h: b64(bytes), spirits: s.spirits.map(({ held, rx, ry, anim, px, py, ...a }) => a), last: Date.now() });
}
export function decode(text, w) {
  const o = JSON.parse(text);
  if (o?.v !== 3 && o?.v !== 4 || typeof o.h !== 'string' || !Array.isArray(o.spirits) || !Array.isArray(o.zones) || o.zones.length !== ZONES.length || !Number.isFinite(o.seeds)) throw Error('Not a Little Wilds 2 save.');
  if (o.v === 3) { // Before the continent, "Travel on" discarded each finished land. Those count as restored.
    const L = saveMap(o), full = ZONES.map(() => ({ open: true, done: true, g: 0, l: 0, water: 1, sweep: -1, sweepLift: 1, bloomed: true }));
    o.v = 4; o.land = L; o.level = L; o.atlas = {}; o.opened = { [L]: true }; o.gateFill = {};
    for (let n = 0; n < L; n++) { o.atlas[n] = { h: '', zones: full.map(z => ({ ...z })), objHp: null, trees: [], wv: WORLD_VERSION, level: n, complete: true, done: ZONES.length, pct: 1 }; o.opened[n] = true; }
  }
  const text2 = o.h;
  o.h = new Float32Array(CN);
  loadField(o, w, text2);
  return o;
}
// Which map a save belongs on, so the caller can build that world before decoding.
export const saveMap = o => o.v === 3 ? Math.min(o.land || 0, LANDS.length - 1) : o.land || 0;
