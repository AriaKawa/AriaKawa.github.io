// The valley: deterministic geography shared by the simulation and the renderer.
// Texels are the land's pixels; cells are the 4x4 texel blocks that hold restoration.
export const LW = 960, LH = 640, CELL = 4, LCW = LW / CELL, LCH = LH / CELL, LCN = LCW * LCH;
// The whole continent: the nine lands side by side.
export const TW = LW * 3, TH = LH * 3, CW = TW / CELL, CH = TH / CELL, CN = CW * CH;

const grid = [
  ['Hearthfield', 0, 2, -1], ['Clover Downs', 1, 2, 0], ['Willow Draw', 0, 1, 0],
  ['Pebble Hollow', 1, 1, 1], ['Honey Meadow', 2, 2, 1], ['Dry Creek Bend', 0, 0, 2],
  ['Birch Knoll', 2, 1, 3], ['Daisy Vale', 1, 0, 3], ["Mother's Rise", 2, 0, 6],
];
const GLADES = grid.map(([name, col, row, parent], id) => ({
  id, name, col, row, parent, px: 160 + col * 320, py: 110 + row * 210,
}));
GLADES.forEach(z => { z.adj = GLADES.filter(o => Math.abs(o.col - z.col) + Math.abs(o.row - z.row) === 1).map(o => o.id); });
export const FINALE = 8;

// Village buildings: [dead frame, size, frame is in the land's own sheet]. The living frame is always the next one.
const MILL = [0, 66], COTTAGE = [2, 58], WELL = [4, 34], GREENHOUSE = [6, 56], BARN = [8, 64], TOWER = [10, 62], HIVES = [12, 36], OWN_A = [8, 54, 1], OWN_B = [10, 62, 1];
// One list per glade. On the coast the land's own pair is a fishing hut and a lighthouse; in the snow, a log cabin and a bell arch.
const COAST_VILLAGE = [[WELL, COTTAGE, OWN_A, COTTAGE, HIVES], [OWN_A, COTTAGE, GREENHOUSE, COTTAGE], [COTTAGE, BARN, OWN_A, HIVES], [WELL, COTTAGE, COTTAGE, OWN_A, MILL], [OWN_A, COTTAGE, OWN_A, GREENHOUSE], [COTTAGE, OWN_A, BARN, COTTAGE], [OWN_B, COTTAGE, OWN_A, WELL], [COTTAGE, GREENHOUSE, COTTAGE, HIVES], [OWN_B, WELL, COTTAGE, OWN_A, COTTAGE, TOWER]];
const SNOW_VILLAGE = [[WELL, OWN_A, OWN_A, BARN], [OWN_A, COTTAGE, GREENHOUSE, OWN_A], [OWN_A, BARN, OWN_A, HIVES], [OWN_B, WELL, OWN_A, COTTAGE, OWN_A], [OWN_A, MILL, OWN_A, HIVES], [OWN_A, COTTAGE, BARN], [TOWER, OWN_A, OWN_A, WELL], [OWN_B, OWN_A, GREENHOUSE, OWN_A], [OWN_B, WELL, OWN_A, TOWER, OWN_A, COTTAGE]];
export const KIND = { deadTree: 0, tree: 1, blossom: 2, boulder: 3, mossy: 4, bramble: 5, bush: 6, flowering: 7, column: 8, ruin: 9, shrineDead: 10, shrine: 11, fern: 12, seed: 13, dew: 14, star: 15 };

export function hash(x, y, seed = 0) {
  let n = Math.imul(x + seed * 131, 374761393) ^ Math.imul(y - seed * 57, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}
const smooth = t => t * t * (3 - 2 * t);
export function noise(x, y, seed = 0) {
  const ix = Math.floor(x), iy = Math.floor(y), u = smooth(x - ix), v = smooth(y - iy);
  return (hash(ix, iy, seed) * (1 - u) + hash(ix + 1, iy, seed) * u) * (1 - v)
    + (hash(ix, iy + 1, seed) * (1 - u) + hash(ix + 1, iy + 1, seed) * u) * v;
}
export function fbm(x, y, seed = 0) {
  return noise(x, y, seed) * .55 + noise(x * 2.1, y * 2.1, seed + 1) * .3 + noise(x * 4.3, y * 4.3, seed + 2) * .15;
}

// The continent is 3x3 maps. Coasts and ridges come from continent-wide coordinates, so neighbours line up.
// The coast is a lobed, warped blob, so bays and headlands cut through the outer maps. Sampled coarsely since it is smooth.
const GW = LW * 3, GH = LH * 3, COAST_STEP = 16, COAST_W = GW / COAST_STEP + 2, COAST_H = GH / COAST_STEP + 2;
let coastGrid = null;
function buildCoast() {
  coastGrid = new Float32Array(COAST_W * COAST_H);
  for (let b = 0, i = 0; b < COAST_H; b++) for (let a = 0; a < COAST_W; a++, i++) {
    const gx = a * COAST_STEP, gy = b * COAST_STEP;
    const u = (gx - GW / 2) / (GW / 2) + (fbm(gx / 520, gy / 520, 81) - .5) * .26, v0 = (gy - GH / 2) / (GH / 2), v = v0 * (v0 > 0 ? .84 : 1) + (fbm(gx / 520, gy / 520, 83) - .5) * .26;
    const rho = Math.pow(Math.abs(u) ** 2.5 + Math.abs(v) ** 2.5, 1 / 2.5), th = Math.atan2(v, u);
    coastGrid[i] = (.93 + .05 * Math.sin(3 * th + 2.6) + .05 * Math.sin(5 * th + .4) + .025 * Math.sin(8 * th + 4) - rho) * 1000;
  }
}
export function coastInset(gx, gy) { // Roughly how many texels inland this point is.
  if (!coastGrid) buildCoast();
  const fx = Math.max(0, Math.min(COAST_W - 1.001, gx / COAST_STEP)), fy = Math.max(0, Math.min(COAST_H - 1.001, gy / COAST_STEP)), a = Math.floor(fx), b = Math.floor(fy), u = fx - a, v = fy - b, i = b * COAST_W + a;
  return (coastGrid[i] * (1 - u) + coastGrid[i + 1] * u) * (1 - v) + (coastGrid[i + COAST_W] * (1 - u) + coastGrid[i + COAST_W + 1] * u) * v;
}
export const SEA = 1, BEACH = 2, ROCK = 3, PATH = 4;
export let edgeDepth = 0;
export function terrain(col, row, x, y, pad = 0) {
  const gx = col * LW + x, gy = row * LH + y;
  const inset = coastInset(gx, gy);
  if (inset < 100) {
    const shore = 44 + (fbm(gx / 85, gy / 85, 71) - .5) * 70 + (fbm(gx / 24, gy / 24, 72) - .5) * 16;
    if (inset < shore - pad) { edgeDepth = Math.min(1, (shore - inset) / 40); return SEA; }
    if (inset < shore + 9 - pad) { edgeDepth = 0; return BEACH; }
  }
  // No walls between lands: rocky outcrops rise here and there along wandering ridgelines instead.
  // The old valley in the middle stays open meadow, fading in so no straight edge shows.
  const away = Math.hypot(Math.max(LW - gx, gx - LW * 2, 0), Math.max(LH - gy, gy - LH * 2, 0));
  const ridge = 1 - Math.abs(fbm(gx / 230, gy / 230, 91) * 2 - 1), lump = fbm(gx / 64, gy / 64, 93);
  const rise = ridge * .78 + lump * .42 - Math.max(0, .3 - away / 500) - .985 + pad * .012;
  if (rise > 0) { edgeDepth = Math.min(1, rise / .1); return ROCK; }
  return 0;
}

// Each map dresses the same glade tree in its own names, opening on the side nearest the heartland.
function dressZones(mapId) {
  const map = LANDS[mapId], flipX = map.col === 0, flipY = map.row === 2;
  for (const z of GLADES) { const c = flipX ? 2 - z.col : z.col, r = flipY ? 2 - z.row : z.row; z.name = map.glades[z.id]; z.px = 160 + c * 320; z.py = 110 + r * 210; }
  if (mapId) fitGlades(map);
}
// Coastal maps squeeze their nine glades onto the ground that is actually there.
function fitGlades(map) {
  const ground = [];
  let x0 = LW, x1 = 0, y0 = LH, y1 = 0;
  for (let y = 8; y < LH; y += 16) for (let x = 8; x < LW; x += 16) if (!terrain(map.col, map.row, x, y)) { ground.push(x, y); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  for (const z of GLADES) { z.px = x0 + z.px / LW * (x1 - x0); z.py = y0 + z.py / LH * (y1 - y0); }
  for (let k = 0; k < 14; k++) { // Each glade drifts to the middle of the ground nearest it, which evens out their sizes.
    const sum = GLADES.map(() => [0, 0, 0]);
    for (let g = 0; g < ground.length; g += 2) { let best = 0, bd = Infinity; for (const z of GLADES) { const d = (ground[g] - z.px) ** 2 + (ground[g + 1] - z.py) ** 2; if (d < bd) { bd = d; best = z.id; } } sum[best][0] += ground[g]; sum[best][1] += ground[g + 1]; sum[best][2]++; }
    let big = 0; sum.forEach((q, n) => { if (q[2] > sum[big][2]) big = n; });
    for (const z of GLADES) if (sum[z.id][2]) { z.px = sum[z.id][0] / sum[z.id][2]; z.py = sum[z.id][1] / sum[z.id][2]; } else { z.px = GLADES[big].px + 40 + z.id * 9; z.py = GLADES[big].py + 30 - z.id * 7; } // A glade stranded in the sea takes half of the biggest one.
  }
}

export function makeLand(seed = 1, mapId = 0) {
  dressZones(mapId);
  const map = LANDS[mapId], flipX = map.col === 0;
  const edge = new Uint8Array(LW * LH), edgeD = new Float32Array(LW * LH), blocked = new Uint8Array(LCN), near = new Uint8Array(LCN);
  for (let y = 0, i = 0; y < LH; y++) for (let x = 0; x < LW; x++, i++) { const e = terrain(map.col, map.row, x, y); if (e) { edge[i] = e; edgeD[i] = edgeDepth; } }
  // A cell is off limits only if it sits well inside the edge, so restored ground always reaches the shore.
  for (let y = 0, i = 0; y < LCH; y++) for (let x = 0; x < LCW; x++, i++) if (terrain(map.col, map.row, x * CELL + 2, y * CELL + 2, 3)) blocked[i] = 1;
  for (let y = 0, i = 0; y < LCH; y++) for (let x = 0; x < LCW; x++, i++) for (let b = -1; b < 3 && !near[i]; b++) for (let a = -1; a < 3; a++) { const xx = x + a, yy = y + b; if (xx >= 0 && yy >= 0 && xx < LCW && yy < LCH && blocked[yy * LCW + xx]) { near[i] = 1; break; } }
  const blockedAt = (x, y, r = 0) => { for (const [a, b] of [[0, 0], [r, 0], [-r, 0], [0, r], [0, -r]]) { const xx = Math.floor((x + a) / CELL), yy = Math.floor((y + b) / CELL); if (xx < 0 || yy < 0 || xx >= LCW || yy >= LCH || blocked[yy * LCW + xx]) return true; } return false; };
  const zone = new Uint8Array(LCN), cellsOf = GLADES.map(() => []);
  for (let y = 0; y < LCH; y++) for (let x = 0; x < LCW; x++) {
    const tx = x * CELL + 2, ty = y * CELL + 2;
    const wx = tx + (fbm(tx / 70, ty / 70, seed + 11) - .5) * 85 + (fbm(tx / 19, ty / 19, seed + 13) - .5) * 46, wy = ty + (fbm(tx / 70, ty / 70, seed + 29) - .5) * 85 + (fbm(tx / 19, ty / 19, seed + 31) - .5) * 46;
    let best = 0, bd = Infinity;
    for (const z of GLADES) { const d = (wx - z.px) ** 2 + (wy - z.py) ** 2; if (d < bd) { bd = d; best = z.id; } }
    zone[y * LCW + x] = best;
    if (!blocked[y * LCW + x]) cellsOf[best].push(y * LCW + x);
  }

  // Ponds sit near each glade's heart; streams run to them from the parent's pond.
  const ponds = GLADES.map(z => ({
    x: z.px + (hash(z.id, 3, seed) - .5) * 70, y: z.py + (hash(z.id, 7, seed) - .5) * 50,
    r: z.id === FINALE ? 26 : 13 + hash(z.id, 9, seed) * 9,
  }));
  for (const p of ponds) for (let k = 0; k < 40 && blockedAt(p.x, p.y, p.r + 16); k++) { const d = Math.hypot(LW / 2 - p.x, LH / 2 - p.y); p.x += (LW / 2 - p.x) / d * 6; p.y += (LH / 2 - p.y) / d * 6; }
  const waterT = new Float32Array(LW * LH).fill(-1), waterZ = new Uint8Array(LW * LH);
  const stamp = (x, y, r, t, z) => {
    for (let yy = Math.floor(y - r); yy <= y + r; yy++) for (let xx = Math.floor(x - r); xx <= x + r; xx++) {
      if (xx < 0 || yy < 0 || xx >= LW || yy >= LH || (xx - x) ** 2 + (yy - y) ** 2 > r * r) continue;
      const i = yy * LW + xx;
      if (waterT[i] < 0 && !edge[i]) { waterT[i] = t; waterZ[i] = z; }
    }
  };
  const streams = GLADES.map(z => {
    const end = ponds[z.id], p = z.parent >= 0 ? ponds[z.parent] : { x: flipX ? LW + 6 : -6, y: end.y + 30 };
    const len = Math.hypot(end.x - p.x, end.y - p.y), nx = -(end.y - p.y) / len, ny = (end.x - p.x) / len, path = [];
    for (let d = 0; d <= len; d += 1) {
      const t = d / len, sway = (fbm(d / 46, z.id * 7.3, seed + 41) - .5) * 110 * Math.sin(t * Math.PI);
      const x = p.x + (end.x - p.x) * t + nx * sway, y = p.y + (end.y - p.y) * t + ny * sway;
      path.push([x, y]);
      stamp(x, y, 1.4 + noise(d / 18, z.id, seed + 5) * 1.5 + t, t * .7, z.id);
    }
    return path;
  });
  ponds.forEach((p, id) => {
    const R = p.r + 4;
    for (let y = Math.floor(p.y - R); y <= p.y + R; y++) for (let x = Math.floor(p.x - R); x <= p.x + R; x++) {
      if (x < 0 || y < 0 || x >= LW || y >= LH) continue;
      const a = Math.atan2(y - p.y, x - p.x), d = Math.hypot(x - p.x, y - p.y);
      const edge = p.r * (.82 + noise(a * 1.6 + 9, id, seed + 77) * .36);
      if (d < edge) { const i = y * LW + x; waterT[i] = .7 + .3 * d / edge; waterZ[i] = id; }
    }
  });
  const nearWater = (x, y, r) => {
    for (let k = 0; k < 10; k++) {
      const a = k * .628, xx = Math.round(x + Math.cos(a) * r), yy = Math.round(y + Math.sin(a) * r);
      if (xx >= 0 && yy >= 0 && xx < LW && yy < LH && waterT[yy * LW + xx] >= 0) return true;
    }
    return xx0(x, y);
  };
  const xx0 = (x, y) => { const i = Math.round(y) * LW + Math.round(x); return waterT[i] >= 0; };

  // Dead things to bring back: each has one withered sprite and one living sprite.
  const objects = [];
  const place = (z, dead, live, x, y, size) => objects.push({ id: objects.length, zone: z, dead, live, x: x / CELL, y: y / CELL, size, hp: size > 40 ? 3 : size > 22 ? 1.5 : .8 });
  const clear = (x, y, gap) => !objects.some(o => (o.x * CELL - x) ** 2 + (o.y * CELL - y) ** 2 < gap * gap);
  // A gateway stands in the pass on each inland side.
  const gates = [];
  for (const [dc, dr, x, y] of [[0, -1, LW / 2, 50], [1, 0, LW - 50, LH / 2 + 18], [0, 1, LW / 2, LH - 26], [-1, 0, 50, LH / 2 + 18]]) {
    const target = LANDS.findIndex(l => l.col === map.col + dc && l.row === map.row + dr);
    if (target >= 0) gates.push({ x, y, target, size: 58 });
  }
  // Villages: dirt roads link the glades and run out to the gateways. 1 road, 2 plank bridge, 3 crop rows.
  const road = new Uint8Array(LW * LH), roadPoints = [];
  const lay = (x, y, r) => {
    for (let yy = Math.floor(y - r); yy <= y + r; yy++) for (let xx = Math.floor(x - r); xx <= x + r; xx++) {
      if (xx < 0 || yy < 0 || xx >= LW || yy >= LH || (xx - x) ** 2 + (yy - y) ** 2 > r * r) continue;
      const i = yy * LW + xx;
      if (edge[i] || waterT[i] >= .7) continue;
      if (waterT[i] >= 0) { waterT[i] = -1; road[i] = 2; } else road[i] ||= 1;
    }
  };
  const route = (a, b, id) => {
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1, nx = -(b.y - a.y) / len, ny = (b.x - a.x) / len;
    let last = null;
    for (let d = 0; d <= len; d++) {
      const t = d / len, sway = (fbm(d / 60, id * 3.1, seed + 51) - .5) * 70 * Math.sin(t * Math.PI);
      let x = a.x + (b.x - a.x) * t + nx * sway, y = a.y + (b.y - a.y) * t + ny * sway;
      for (const p of ponds) { const q = Math.hypot(x - p.x, y - p.y), keep = p.r + 30; if (q < keep && q > 0) { x = p.x + (x - p.x) / q * keep; y = p.y + (y - p.y) / q * keep; } }
      lay(x, y, 3.6 + noise(d / 14, id, seed + 53) * 1.6);
      if (d % 14 === 0) { if (last) roadPoints.push({ x, y, nx: -(y - last.y) / 14, ny: (x - last.x) / 14 }); last = { x, y }; }
    }
  };
  const scan = (test, x, y, w, up, down) => { for (let yy = Math.floor(y - up); yy <= y + down; yy += 3) for (let xx = Math.floor(x - w); xx <= x + w; xx += 3) if (xx >= 0 && yy >= 0 && xx < LW && yy < LH && test(yy * LW + xx)) return true; return false; };
  const roadNear = (...box) => scan(i => road[i], ...box), wetNear = (...box) => scan(i => waterT[i] >= 0, ...box);
  const roomy = (x, y, size) => !objects.some(o => Math.abs(o.x * CELL - x) < (o.size + size) * .4 && y - size * .8 < o.y * CELL && o.y * CELL - o.size * .8 < y);
  const hubs = GLADES.map(z => { const p = ponds[z.id]; let x = p.x, y = p.y + p.r + 32; for (let k = 0; k < 40 && blockedAt(x, y, 18); k++) { const d = Math.hypot(LW / 2 - x, LH / 2 - y); x += (LW / 2 - x) / d * 6; y += (LH / 2 - y) / d * 6; } return { x, y }; });
  if (map.village) {
    GLADES.forEach(z => { if (z.parent >= 0) route(hubs[z.parent], hubs[z.id], z.id); });
    gates.forEach((g, n) => { const hub = hubs.reduce((a, b) => Math.hypot(b.x - g.x, b.y - g.y) < Math.hypot(a.x - g.x, a.y - g.y) ? b : a); route(hub, g, 20 + n); });
    for (const h of hubs) for (let a = 0; a < 6.28; a += .5) lay(h.x + Math.cos(a) * 12, h.y + Math.sin(a) * 8, 7);
  }
  // Homes stand beside a road, never on it, each with a footpath to the door. Barns and greenhouses get crop rows.
  const raiseVillage = id => {
    const hub = hubs[id], spots = roadPoints.filter(q => zone[(Math.floor(q.y) >> 2) * LCW + (Math.floor(q.x) >> 2)] === id || Math.hypot(q.x - hub.x, q.y - hub.y) < 130).map((q, n) => [q, Math.hypot(q.x - hub.x, q.y - hub.y) + hash(n, id, seed + 57) * 60]).sort((a, b) => a[1] - b[1]).map(e => e[0]);
    for (const item of map.village[id]) {
      const [dead, size, own] = item;
      let done = false;
      for (const q of spots) {
        for (const side of [1, -1]) {
          const dx = q.nx * side, dy = q.ny * side, x = q.x + dx * (8 + size * .42), y = q.y + (dy > 0 ? dy * (8 + size * .95) : dy * 8) - (dy > 0 ? 0 : 3);
          if (y < size + 8 || y > LH - 8 || x < size * .5 + 8 || x > LW - size * .5 - 8 || blockedAt(x, y, 10) || blockedAt(x, y - size * .6, 10)) continue;
          if (roadNear(x, y, size * .36, size * .75, 1) || wetNear(x, y, size * .42, size * .8, 4) || !roomy(x, y, size)) continue;
          place(id, dead, dead + 1, x, y, size);
          const o = objects[objects.length - 1]; o.mark = true; o.local = !!own;
          for (let t = 0; t <= 1; t += .1) lay(x + (q.x - x) * t, y + 1 + (q.y - y - 1) * t, 1.2);
          if (item === BARN || item === GREENHOUSE) for (const way of [1, -1]) {
            const w = 26, h = 15, fx = x + way * (size * .4 + w + 3), fy = y - h - 1;
            if (fx < w + 8 || fx > LW - w - 8 || blockedAt(fx, fy, w) || blockedAt(fx, fy, h) || roadNear(fx, fy, w, h, h) || wetNear(fx, fy, w, h, h) || !roomy(fx, fy + h, w * 2)) continue;
            for (let yy = fy - h; yy <= fy + h; yy++) for (let xx = fx - w; xx <= fx + w; xx++) { const i = Math.floor(yy) * LW + Math.floor(xx); if (!edge[i] && !road[i]) road[i] = 3; }
            break;
          }
          done = true; break;
        }
        if (done) break;
      }
    }
  };
  for (const z of GLADES) {
    const pond = ponds[z.id];
    const shrineSide = blockedAt(pond.x + pond.r + 18, pond.y - 4, 8) ? -1 : 1;
    place(z.id, KIND.shrineDead, KIND.shrine, pond.x + shrineSide * (pond.r + 18), pond.y - 4, 30);
    if (z.id === FINALE && !map.village) { const side = blockedAt(pond.x - shrineSide * (pond.r + 34), pond.y + 6, 24) ? shrineSide : -shrineSide; place(z.id, KIND.deadTree, KIND.blossom, pond.x + side * (pond.r + 34), pond.y + 6, 110); }
    if (map.village) raiseVillage(z.id);
    else { // The wild lands have no buildings: each glade's landmark is a great old tree or outcrop.
      const big = z.id % 2 === 0, size = big ? 62 : 50;
      for (let k = 0; k < 16; k++) {
        const a = 1.2 + k * .79, x = pond.x + Math.cos(a) * (pond.r + size * .9), y = pond.y + Math.sin(a) * (pond.r + size * .55) + size * .3;
        if (y < size + 8 || x < size || x > LW - size || y > LH - 8 || blockedAt(x, y, 14) || nearWater(x, y, 8) || !clear(x, y, 40)) continue;
        place(z.id, big ? KIND.deadTree : KIND.boulder, big ? KIND.tree : KIND.mossy, x, y, size);
        break;
      }
    }
    const list = cellsOf[z.id];
    const quota = map.village ? [[KIND.deadTree, hash(z.id, 21, seed) > .5 ? KIND.blossom : KIND.tree, 34, 4], [KIND.boulder, KIND.mossy, 18, 2], [KIND.bramble, KIND.flowering, 15, 8]] : [[KIND.deadTree, hash(z.id, 21, seed) > .5 ? KIND.blossom : KIND.tree, 34, 7], [KIND.boulder, KIND.mossy, 18, 8], [KIND.bramble, KIND.flowering, 15, 11], map.carved ? [KIND.bramble, KIND.flowering, 15, 2] : [KIND.column, KIND.ruin, 24, 2]];
    let tries = 0;
    for (const [dead, live, size, count] of quota) for (let n = 0; n < count && tries < 900;) {
      tries++;
      const c = list[Math.floor(hash(tries, z.id * 13 + dead, seed + 3) * list.length)], x = c % LCW * CELL + 2, y = Math.floor(c / LCW) * CELL + 2;
      if (x < 20 || y < 34 || x > LW - 20 || y > LH - 10 || blockedAt(x, y, 6) || nearWater(x, y, 10) || !clear(x, y, 22) || roadNear(x, y, 9, 4, 4) || (map.village && !roomy(x, y, size))) continue;
      place(z.id, dead, dead === KIND.deadTree && n % 3 === 2 ? KIND.tree : live, x, y, size + hash(tries, 5, seed) * 6);
      n++;
    }
  }

  // Flora appear when their cell passes a threshold. They are stored per chunk for culling.
  const FC = 64, floraCols = Math.ceil(LW / FC), floraRows = Math.ceil(LH / FC), flora = Array.from({ length: floraCols * floraRows }, () => []);
  for (let y = 0; y < LCH; y++) for (let x = 0; x < LCW; x++) for (let k = 0; k < 2; k++) {
    const r = hash(x * 3 + k, y * 5 - k, seed + 101), r2 = hash(x + k * 9, y + k * 3, seed + 107);
    const tx = (x + hash(x, y + k, seed + 103)) * CELL, ty = (y + hash(x + k, y, seed + 105)) * CELL;
    // A blade whose cell is just inside rock or shore still grows if its own spot is ground, taking its growth
    // from an open neighbour, so the meadow runs right up to the stone instead of stopping a cell short.
    let cell = y * LCW + x;
    if (blocked[cell]) { cell = -1; for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) { const xx = x + a, yy = y + b; if (xx >= 0 && yy >= 0 && xx < LCW && yy < LCH && !blocked[yy * LCW + xx]) { cell = yy * LCW + xx; break; } } }
    if (cell < 0 || edge[Math.min(LH - 1, Math.floor(ty)) * LW + Math.min(LW - 1, Math.floor(tx))] || road[Math.min(LH - 1, Math.floor(ty)) * LW + Math.min(LW - 1, Math.floor(tx))] || xx0(Math.min(LW - 1, tx), Math.min(LH - 1, ty))) continue;
    let kind, thr;
    if (r < .46) { kind = 0; thr = .33 + r2 * .12; }       // short tuft
    else if (r < .66) { kind = 1; thr = .46 + r2 * .12; }   // tall grass
    else if (r < .9) { kind = 2 + Math.floor(fbm(x / 13, y / 13, seed + 121) * 7) % 5; thr = .7 + r2 * .28; } // flowers, drifting in colour patches
    else if (r < .935) { kind = 7; thr = .8 + r2 * .18; }  // fern
    else continue;
    flora[Math.floor(ty / FC) * floraCols + Math.floor(tx / FC)].push({ x: tx, y: ty, cell, kind, thr, phase: r2 });
  }
  for (const list of flora) list.sort((a, b) => a.y - b.y);

  const order = cellsOf.map((list, z) => {
    const p = ponds[z];
    return Uint32Array.from(list.map(i => [i, Math.hypot(i % LCW * CELL - p.x, Math.floor(i / LCW) * CELL - p.y) + hash(i, 1, seed) * 26]).sort((a, b) => a[1] - b[1]).map(e => e[0]));
  });
  return { seed, mapId, gates, road, edge, edgeD, blocked, near, pend: new Float32Array(LCN), active: [], zone, cellsOf, order, ponds, streams, waterT, waterZ, objects, flora, floraCols, floraRows, FC, count: cellsOf.map(l => l.length), dirty: () => {} };
}

// id 1 and 2 keep the palettes older saves travelled to.
export const LANDS = [
  { name: 'Hollow Vale', col: 1, row: 1, needs: [], carved: true, glades: ['Hearthfield', 'Clover Downs', 'Willow Draw', 'Pebble Hollow', 'Honey Meadow', 'Dry Creek Bend', 'Birch Knoll', 'Daisy Vale', "Mother's Rise"], dead: [132, 121, 106], crack: [86, 76, 66], soil: [78, 58, 44], grass: [88, 138, 68], lush: [116, 160, 76], water: [66, 150, 182], flowers: ['#fff4f0', '#ffd34d', '#ff8fb1', '#b890ff', '#ff9d5c'], mist: [214, 208, 192] },
  { name: 'Ember Basin', col: 2, row: 1, needs: [0], native: { label: 'A cinder fox', size: 24, speed: 9 }, glades: ['Ashfall Gate', 'Kiln Hollow', 'Smoulder Run', 'Red Terrace', 'Coalbloom', 'Charcoal Bend', 'Lantern Scarp', 'Sparkfield', 'The Warm Heart'], dead: [92, 86, 88], crack: [48, 42, 46], soil: [70, 48, 44], grass: [66, 138, 106], lush: [214, 160, 66], water: [56, 170, 170], flowers: ['#ffe9b0', '#ff7a4d', '#ffc247', '#ff5f7e', '#fff4e0'], mist: [190, 180, 178] },
  { name: 'Frostmere', col: 1, row: 0, needs: [0], native: { label: 'A snow lynx', size: 26, speed: 8 }, village: SNOW_VILLAGE, road: [138, 116, 104],glades: ['Thaw Gate', 'Rimewood', 'Icicle Draw', 'Hushed Fell', 'Silverbrook', 'Glass Bend', 'Pine Knoll', 'Winterbell', 'The First Melt'], dead: [156, 162, 172], crack: [104, 112, 128], soil: [84, 78, 88], grass: [84, 158, 124], lush: [132, 204, 150], water: [84, 176, 224], flowers: ['#ffffff', '#ffc9e4', '#b8e0ff', '#d7b8ff', '#fff2a8'], mist: [226, 232, 240], peak: [244, 248, 255] },
  { name: 'Sunfall Coast', col: 1, row: 2, needs: [0], native: { label: 'A sun tortoise', size: 20, speed: 4 }, village: COAST_VILLAGE, road: [188, 156, 108], glades: ['Tidegate', 'Palm Hollow', 'Saltgrass', 'Shell Rise', 'Gull Rest', 'Driftwood Bend', 'Lighthouse Knoll', 'Hibiscus Vale', 'Sunfall Point'], dead: [168, 150, 118], crack: [112, 94, 70], soil: [112, 82, 54], grass: [122, 172, 76], lush: [170, 196, 84], water: [52, 176, 190], flowers: ['#fff6d8', '#ff6f6f', '#ffb347', '#ff8fc8', '#7fd8d0'], mist: [232, 222, 196], sand: [240, 216, 160] },
  { name: 'Mistfen', col: 0, row: 1, needs: [0], native: { label: 'A reed otter', size: 20, speed: 8 }, carved: true, glades: ['Reedgate', 'Sedge Hollow', 'Lily Draw', 'Heron Rest', 'Willow Sink', 'Peat Bend', 'Lantern Bog', 'Cattail Vale', 'The Still Eye'], dead: [104, 104, 92], crack: [62, 64, 56], soil: [52, 48, 40], grass: [72, 130, 96], lush: [96, 156, 118], water: [78, 142, 150], flowers: ['#e8fff0', '#b8f0d0', '#d8b8ff', '#fff2a8', '#88d8c8'], mist: [196, 210, 200] },
  { name: 'Auric Steppe', col: 2, row: 0, needs: [1, 2], native: { label: 'A golden ram', size: 28, speed: 7 }, glades: ['Windgate', 'Barley Downs', 'Amber Draw', 'Harrow Rise', 'Gildengrass', 'Thresher Bend', 'Maple Knoll', 'Sheaf Vale', 'The Long Light'], dead: [146, 124, 92], crack: [94, 76, 54], soil: [88, 62, 40], grass: [176, 164, 70], lush: [224, 170, 62], water: [82, 150, 170], flowers: ['#fff2c8', '#ff9040', '#e8503c', '#ffd34d', '#c86a3c'], mist: [226, 208, 176] },
  { name: 'Coral Reach', col: 2, row: 2, needs: [1, 3], native: { label: 'A coral crab', size: 15, speed: 7 }, carved: true, glades: ['Pearlgate', 'Anemone Hollow', 'Brine Draw', 'Conch Rise', 'Rosereef', 'Urchin Bend', 'Foam Knoll', 'Starfish Vale', 'The Pink Tide'], dead: [150, 134, 136], crack: [98, 84, 92], soil: [98, 66, 80], grass: [82, 170, 150], lush: [236, 140, 160], water: [64, 196, 206], flowers: ['#fff0f4', '#ff7fa8', '#ffb09a', '#a0f0e0', '#ffe28a'], mist: [234, 212, 220], sand: [250, 214, 200] },
  { name: 'Sporewood', col: 0, row: 2, needs: [3, 4], native: { label: 'A spore toadling', size: 17, speed: 6 }, glades: ['Capgate', 'Gill Hollow', 'Puffball Draw', 'Mycel Rise', 'Glowcap', 'Rootrot Bend', 'Moss Knoll', 'Dapple Vale', 'The Great Cap'], dead: [106, 92, 104], crack: [64, 52, 66], soil: [60, 44, 58], grass: [84, 128, 92], lush: [132, 110, 180], water: [92, 130, 190], flowers: ['#f0e0ff', '#c890ff', '#ff90c8', '#90f0d0', '#ffd890'], mist: [204, 192, 214] },
  { name: 'Glimmerdeep', col: 0, row: 0, needs: [2, 4], native: { label: 'A crystal hedgehog', size: 16, speed: 6 }, glades: ['Shardgate', 'Quartz Hollow', 'Prism Draw', 'Echo Rise', 'Geode Meadow', 'Facet Bend', 'Amethyst Knoll', 'Glint Vale', 'The Deep Light'], dead: [116, 116, 134], crack: [68, 68, 90], soil: [62, 56, 86], grass: [78, 158, 160], lush: [120, 190, 220], water: [110, 150, 240], flowers: ['#ffffff', '#b8e8ff', '#d0b0ff', '#90f0e0', '#ffc0f0'], mist: [212, 214, 236], peak: [214, 196, 255] },
];
export const landAt = i => LANDS[i % LANDS.length];

// Every glade on the continent: land * 9 + its place in that land's tree.
export const ZONES = [];
export const FC = 64, FCOLS = TW / FC, FROWS = TH / FC;
// The nine lands are generated one at a time on their own, exactly as before, then laid side by side.
// Texel layers shrink to bytes here, since the whole continent is nine times the size of one land.
export async function makeWorld(progress = async () => {}) {
  const N = TW * TH, edge = new Uint8Array(N), edgeD = new Uint8Array(N), road = new Uint8Array(N), waterT = new Uint8Array(N).fill(255), waterZ = new Uint8Array(N);
  const blocked = new Uint8Array(CN), near = new Uint8Array(CN), zone = new Uint8Array(CN), cellsOf = [], order = [], ponds = [], streams = [], objects = [], objStart = [];
  const cap = CN * 2, fx = new Float32Array(cap), fy = new Float32Array(cap), fcell = new Uint32Array(cap), fkind = new Uint8Array(cap), fthr = new Float32Array(cap), fphase = new Float32Array(cap), fstart = new Uint32Array(FCOLS * FROWS), fcount = new Uint32Array(FCOLS * FROWS);
  let fn = 0;
  ZONES.length = 0;
  for (let id = 0; id < LANDS.length; id++) {
    await progress(id);
    const L = makeLand(1 + id * 17, id), map = LANDS[id], ox = map.col * LW, oy = map.row * LH, cx = map.col * LCW, cy = map.row * LCH, zb = id * 9;
    GLADES.forEach(g => { ZONES[zb + g.id] = { id: zb + g.id, land: id, glade: g.id, name: map.glades[g.id], px: g.px + ox, py: g.py + oy, adj: [] }; });
    for (let y = 0; y < LH; y++) for (let x = 0, a = y * LW, b = (oy + y) * TW + ox; x < LW; x++, a++, b++) {
      edge[b] = L.edge[a]; edgeD[b] = Math.round(L.edgeD[a] * 255); road[b] = L.road[a];
      const t = L.waterT[a]; if (t >= 0) { waterT[b] = Math.round(t * 254); waterZ[b] = zb + L.waterZ[a]; }
    }
    for (let y = 0; y < LCH; y++) for (let x = 0, a = y * LCW, b = (cy + y) * CW + cx; x < LCW; x++, a++, b++) { blocked[b] = L.blocked[a]; near[b] = L.near[a]; zone[b] = zb + L.zone[a]; }
    const toG = i => (cy + Math.floor(i / LCW)) * CW + cx + i % LCW;
    L.cellsOf.forEach((l, j) => { cellsOf[zb + j] = l.map(toG); order[zb + j] = Uint32Array.from(L.order[j], toG); });
    for (const p of L.ponds) ponds.push({ x: p.x + ox, y: p.y + oy, r: p.r });
    for (const path of L.streams) streams.push(path.map(([x, y]) => [x + ox, y + oy]));
    objStart[id] = objects.length;
    for (const o of L.objects) objects.push({ ...o, id: objects.length, zone: zb + o.zone, land: id, x: o.x + cx, y: o.y + cy });
    L.flora.forEach((list, k) => {
      const c = (map.row * L.floraRows + Math.floor(k / L.floraCols)) * FCOLS + map.col * L.floraCols + k % L.floraCols;
      fstart[c] = fn; fcount[c] = list.length;
      for (const p of list) { fx[fn] = p.x + ox; fy[fn] = p.y + oy; fcell[fn] = toG(p.cell); fkind[fn] = p.kind; fthr[fn] = p.thr; fphase[fn] = p.phase; fn++; }
    });
  }
  // Glades belong to the whole continent, not to a rectangle: each cell joins the nearest glade through
  // the same wavy warp the lands used, so glade edges (and the mist on them) wander across the old seams.
  for (let y = 0, i = 0; y < CH; y++) for (let x = 0; x < CW; x++, i++) {
    const tx = x * CELL + 2, ty = y * CELL + 2;
    const wx = tx + (fbm(tx / 70, ty / 70, 511) - .5) * 85 + (fbm(tx / 19, ty / 19, 513) - .5) * 46, wy = ty + (fbm(tx / 70, ty / 70, 529) - .5) * 85 + (fbm(tx / 19, ty / 19, 531) - .5) * 46;
    let best = 0, bd = Infinity;
    for (const z of ZONES) { const d = (wx - z.px) ** 2 + (wy - z.py) ** 2; if (d < bd) { bd = d; best = z.id; } }
    zone[i] = best;
  }
  for (let z = 0; z < ZONES.length; z++) cellsOf[z] = [];
  for (let i = 0; i < CN; i++) if (!blocked[i]) cellsOf[zone[i]].push(i);
  cellsOf.forEach((list, z) => { const p = ponds[z]; order[z] = Uint32Array.from(list.map(i => [i, Math.hypot(i % CW * CELL - p.x, Math.floor(i / CW) * CELL - p.y) + hash(i, 1, 7) * 26]).sort((a, b) => a[1] - b[1]).map(e => e[0])); });
  near.fill(0);
  for (let y = 0, i = 0; y < CH; y++) for (let x = 0; x < CW; x++, i++) for (let b = -1; b < 3 && !near[i]; b++) for (let a = -1; a < 3; a++) { const xx = x + a, yy = y + b; if (xx >= 0 && yy >= 0 && xx < CW && yy < CH && blocked[yy * CW + xx]) { near[i] = 1; break; } }
  // Which land's ground each texel shows. The borders wander in broad bays and long fingers, and the last few
  // texels are dithered, so one country runs into the next the way a meadow fades into heath.
  const biome = new Uint8Array(N), gw = CW + 1, wxG = new Float32Array(gw * (CH + 1)), wyG = new Float32Array(gw * (CH + 1));
  for (let gy = 0, k = 0; gy <= CH; gy++) for (let gx = 0; gx <= CW; gx++, k++) {
    const x = gx * CELL, y = gy * CELL;
    wxG[k] = (fbm(x / 620, y / 620, 601) - .5) * 560 + (fbm(x / 150, y / 150, 603) - .5) * 190 + (fbm(x / 38, y / 38, 605) - .5) * 46;
    wyG[k] = (fbm(x / 620, y / 620, 611) - .5) * 560 + (fbm(x / 150, y / 150, 613) - .5) * 190 + (fbm(x / 38, y / 38, 615) - .5) * 46;
  }
  for (let y = 0, i = 0; y < TH; y++) {
    const gy = y >> 2, ty = (y & 3) / 4;
    for (let x = 0; x < TW; x++, i++) {
      const gx = x >> 2, tx = (x & 3) / 4, k = gy * gw + gx, d = hash(x, y, 617) - .5;
      const dx = (wxG[k] * (1 - tx) + wxG[k + 1] * tx) * (1 - ty) + (wxG[k + gw] * (1 - tx) + wxG[k + gw + 1] * tx) * ty, dy = (wyG[k] * (1 - tx) + wyG[k + 1] * tx) * (1 - ty) + (wyG[k + gw] * (1 - tx) + wyG[k + gw + 1] * tx) * ty;
      biome[i] = landAtTexel(x + dx + d * 16, y + dy - d * 16);
    }
  }
  // A last look over the whole continent: nothing stands in water, on a road or crop row, on rock or sand, or on
  // top of something else. A misplaced tree or stone shuffles a little way over, or is left out.
  const solid = (x, y) => { x |= 0; y |= 0; if (x < 0 || y < 0 || x >= TW || y >= TH) return true; const i = y * TW + x; return edge[i] || road[i] || waterT[i] < 255; };
  const footClear = (x, y, half) => { for (let yy = y - 6; yy <= y + 3; yy += 2) for (let xx = x - half; xx <= x + half; xx += 2) if (solid(xx, yy)) return false; return true; };
  const BUCKET = 48, buckets = new Map(), bucketAt = (x, y) => Math.floor(x / BUCKET) * 1000 + Math.floor(y / BUCKET);
  const crowded = (x, y, size, skip) => { for (let b = -1; b <= 1; b++) for (let a = -1; a <= 1; a++) for (const q of buckets.get(bucketAt(x + a * BUCKET, y + b * BUCKET)) || []) { if (q === skip) continue; const qx = q.x * CELL, qy = q.y * CELL; if (Math.abs(qx - x) < (q.size + size) * .3 && Math.abs(qy - y) < Math.max(8, (q.size + size) * .16)) return true; } return false; };
  const keep = o => { const k = bucketAt(o.x * CELL, o.y * CELL); if (!buckets.has(k)) buckets.set(k, []); buckets.get(k).push(o); };
  const kept = [];
  for (const o of objects) if (o.mark) { kept.push(o); keep(o); } // Village buildings were laid out with their roads.
  for (const o of objects) {
    if (o.mark) continue;
    const half = Math.max(3, Math.round(o.size * .22)), x0 = o.x * CELL, y0 = o.y * CELL;
    let spot = footClear(x0, y0, half) && !crowded(x0, y0, o.size) ? [x0, y0] : null;
    for (let r = 6; !spot && r <= 36; r += 6) for (let a = 0; a < 8 && !spot; a++) { const x = x0 + Math.cos(a * .785) * r, y = y0 + Math.sin(a * .785) * r * .7; if (!blocked[Math.floor(y / CELL) * CW + Math.floor(x / CELL)] && footClear(x, y, half) && !crowded(x, y, o.size)) spot = [x, y]; }
    if (!spot) continue;
    o.x = spot[0] / CELL; o.y = spot[1] / CELL; kept.push(o); keep(o);
  }
  kept.sort((a, b) => a.land - b.land || a.id - b.id);
  objects.length = 0; kept.forEach((o, i) => { o.id = i; objects.push(o); });
  LANDS.forEach((_, id) => { const i = objects.findIndex(o => o.land === id); objStart[id] = i < 0 ? objects.length : i; });
  // Planted trees ask the same question: is this a clear patch of ground?
  const free = (x, y, half = 5) => footClear(x, y, half) && !crowded(x, y, 30);
  // Village buildings keep their own land's art; trees and stones take the look of the ground they stand on.
  for (const o of objects) { o.zone = zone[Math.min(CN - 1, Math.floor(o.y) * CW + Math.floor(o.x))]; o.art = o.local ? o.land : biome[Math.min(N - 1, Math.floor(o.y * CELL) * TW + Math.floor(o.x * CELL))]; }
  // Neighbouring glades: they touch, or face each other across a ridge of rock.
  const links = ZONES.map(() => new Set()), across = (i, step, n) => { for (let k = 1; k <= n; k++) { const j = i + step * k; if (!blocked[j]) return j; const x = j % CW, y = Math.floor(j / CW), e = edge[(y * CELL + 2) * TW + x * CELL + 2]; if (e !== ROCK && e !== PATH) return -1; } return -1; };
  for (let y = 0; y < CH - 1; y++) for (let x = 0; x < CW - 1; x++) {
    const i = y * CW + x; if (blocked[i]) continue;
    for (const step of [1, CW]) {
      const j = blocked[i + step] ? (step === 1 ? (x + 16 < CW ? across(i, 1, 16) : -1) : (y + 16 < CH ? across(i, CW, 16) : -1)) : i + step;
      if (j >= 0 && zone[j] !== zone[i]) { links[zone[i]].add(zone[j]); links[zone[j]].add(zone[i]); }
    }
  }
  ZONES.forEach((z, n) => { z.adj = [...links[n]]; });
  const sub = a => a.slice(0, fn);
  return { free, biome, edge, edgeD, road, waterT, waterZ, blocked, near, zone, cellsOf, order, ponds, streams, objects, objStart, count: cellsOf.map(l => l.length), pend: new Float32Array(CN), active: [], dirty: () => {},
    flora: { x: sub(fx), y: sub(fy), cell: sub(fcell), kind: sub(fkind), thr: sub(fthr), phase: sub(fphase), start: fstart, count: fcount } };
}
export const landOfCell = (w, i) => ZONES[w.zone[i]].land;
export const landAtTexel = (x, y) => LAND_GRID[Math.min(2, Math.max(0, Math.floor(y / LH))) * 3 + Math.min(2, Math.max(0, Math.floor(x / LW)))];
const LAND_GRID = [];
LANDS.forEach((l, id) => { LAND_GRID[l.row * 3 + l.col] = id; });
