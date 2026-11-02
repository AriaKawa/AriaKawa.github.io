// The valley: deterministic geography shared by the simulation and the renderer.
// Texels are the land's pixels; cells are the 4x4 texel blocks that hold restoration.
export const TW = 960, TH = 640, CELL = 4, CW = TW / CELL, CH = TH / CELL, CN = CW * CH;

const grid = [
  ['Hearthfield', 0, 2, -1], ['Clover Downs', 1, 2, 0], ['Willow Draw', 0, 1, 0],
  ['Pebble Hollow', 1, 1, 1], ['Honey Meadow', 2, 2, 1], ['Dry Creek Bend', 0, 0, 2],
  ['Birch Knoll', 2, 1, 3], ['Daisy Vale', 1, 0, 3], ["Mother's Rise", 2, 0, 6],
];
export const ZONES = grid.map(([name, col, row, parent], id) => ({
  id, name, col, row, parent, px: 160 + col * 320, py: 110 + row * 210,
}));
ZONES.forEach(z => { z.adj = ZONES.filter(o => Math.abs(o.col - z.col) + Math.abs(o.row - z.row) === 1).map(o => o.id); });
export const FINALE = 8;

// windmill, cottage, well, greenhouse, barn, watchtower, beehives, gateway
const LANDMARKS = [[1, 50], [0, 66], [2, 38], [4, 60], [6, 38], [5, 62], [3, 54], [1, 50], [7, 52]];
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

export function makeWorld(seed = 1) {
  const zone = new Uint8Array(CN), cellsOf = ZONES.map(() => []);
  for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) {
    const tx = x * CELL + 2, ty = y * CELL + 2;
    const wx = tx + (fbm(tx / 70, ty / 70, seed + 11) - .5) * 85 + (fbm(tx / 19, ty / 19, seed + 13) - .5) * 46, wy = ty + (fbm(tx / 70, ty / 70, seed + 29) - .5) * 85 + (fbm(tx / 19, ty / 19, seed + 31) - .5) * 46;
    let best = 0, bd = Infinity;
    for (const z of ZONES) { const d = (wx - z.px) ** 2 + (wy - z.py) ** 2; if (d < bd) { bd = d; best = z.id; } }
    zone[y * CW + x] = best;
    cellsOf[best].push(y * CW + x);
  }

  // Ponds sit near each glade's heart; streams run to them from the parent's pond.
  const ponds = ZONES.map(z => ({
    x: z.px + (hash(z.id, 3, seed) - .5) * 70, y: z.py + (hash(z.id, 7, seed) - .5) * 50,
    r: z.id === FINALE ? 26 : 13 + hash(z.id, 9, seed) * 9,
  }));
  const waterT = new Float32Array(TW * TH).fill(-1), waterZ = new Uint8Array(TW * TH);
  const stamp = (x, y, r, t, z) => {
    for (let yy = Math.floor(y - r); yy <= y + r; yy++) for (let xx = Math.floor(x - r); xx <= x + r; xx++) {
      if (xx < 0 || yy < 0 || xx >= TW || yy >= TH || (xx - x) ** 2 + (yy - y) ** 2 > r * r) continue;
      const i = yy * TW + xx;
      if (waterT[i] < 0) { waterT[i] = t; waterZ[i] = z; }
    }
  };
  const streams = ZONES.map(z => {
    const end = ponds[z.id], p = z.parent >= 0 ? ponds[z.parent] : { x: -6, y: end.y + 30 };
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
      if (x < 0 || y < 0 || x >= TW || y >= TH) continue;
      const a = Math.atan2(y - p.y, x - p.x), d = Math.hypot(x - p.x, y - p.y);
      const edge = p.r * (.82 + noise(a * 1.6 + 9, id, seed + 77) * .36);
      if (d < edge) { const i = y * TW + x; waterT[i] = .7 + .3 * d / edge; waterZ[i] = id; }
    }
  });
  const nearWater = (x, y, r) => {
    for (let k = 0; k < 10; k++) {
      const a = k * .628, xx = Math.round(x + Math.cos(a) * r), yy = Math.round(y + Math.sin(a) * r);
      if (xx >= 0 && yy >= 0 && xx < TW && yy < TH && waterT[yy * TW + xx] >= 0) return true;
    }
    return xx0(x, y);
  };
  const xx0 = (x, y) => { const i = Math.round(y) * TW + Math.round(x); return waterT[i] >= 0; };

  // Dead things to bring back: each has one withered sprite and one living sprite.
  const objects = [];
  const place = (z, dead, live, x, y, size) => objects.push({ id: objects.length, zone: z, dead, live, x: x / CELL, y: y / CELL, size, hp: size > 40 ? 3 : size > 22 ? 1.5 : .8 });
  const clear = (x, y, gap) => !objects.some(o => (o.x * CELL - x) ** 2 + (o.y * CELL - y) ** 2 < gap * gap);
  for (const z of ZONES) {
    const pond = ponds[z.id];
    place(z.id, KIND.shrineDead, KIND.shrine, pond.x + pond.r + 18, pond.y - 4, 30);
    if (z.id === FINALE) place(z.id, KIND.deadTree, KIND.blossom, pond.x - pond.r - 34, pond.y + 6, 110);
    // Each glade's landmark: frames come in dead, restored pairs in the landmarks atlas.
    const [mark, size] = LANDMARKS[z.id];
    for (let k = 0; k < 16; k++) {
      const a = 1.2 + k * .79, x = pond.x + Math.cos(a) * (pond.r + size * .9), y = pond.y + Math.sin(a) * (pond.r + size * .55) + size * .3;
      if (y < size + 8 || x < size || x > TW - size || y > TH - 8 || nearWater(x, y, 8) || !clear(x, y, 40)) continue;
      place(z.id, mark * 2, mark * 2 + 1, x, y, size);
      objects[objects.length - 1].mark = true;
      break;
    }
    const list = cellsOf[z.id];
    const quota = [[KIND.deadTree, hash(z.id, 21, seed) > .5 ? KIND.blossom : KIND.tree, 34, 7], [KIND.boulder, KIND.mossy, 18, 8], [KIND.bramble, KIND.flowering, 15, 11], [KIND.column, KIND.ruin, 24, 2]];
    let tries = 0;
    for (const [dead, live, size, count] of quota) for (let n = 0; n < count && tries < 900;) {
      tries++;
      const c = list[Math.floor(hash(tries, z.id * 13 + dead, seed + 3) * list.length)], x = c % CW * CELL + 2, y = Math.floor(c / CW) * CELL + 2;
      if (x < 20 || y < 34 || x > TW - 20 || y > TH - 10 || nearWater(x, y, 10) || !clear(x, y, 22)) continue;
      place(z.id, dead, dead === KIND.deadTree && n % 3 === 2 ? KIND.tree : live, x, y, size + hash(tries, 5, seed) * 6);
      n++;
    }
  }

  // Flora appear when their cell passes a threshold. They are stored per chunk for culling.
  const FC = 64, floraCols = Math.ceil(TW / FC), floraRows = Math.ceil(TH / FC), flora = Array.from({ length: floraCols * floraRows }, () => []);
  for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) for (let k = 0; k < 2; k++) {
    const r = hash(x * 3 + k, y * 5 - k, seed + 101), r2 = hash(x + k * 9, y + k * 3, seed + 107);
    const tx = (x + hash(x, y + k, seed + 103)) * CELL, ty = (y + hash(x + k, y, seed + 105)) * CELL;
    if (xx0(Math.min(TW - 1, tx), Math.min(TH - 1, ty))) continue;
    let kind, thr;
    if (r < .46) { kind = 0; thr = .33 + r2 * .12; }       // short tuft
    else if (r < .66) { kind = 1; thr = .46 + r2 * .12; }   // tall grass
    else if (r < .9) { kind = 2 + Math.floor(fbm(x / 13, y / 13, seed + 121) * 7) % 5; thr = .7 + r2 * .28; } // flowers, drifting in colour patches
    else if (r < .935) { kind = 7; thr = .8 + r2 * .18; }  // fern
    else continue;
    flora[Math.floor(ty / FC) * floraCols + Math.floor(tx / FC)].push({ x: tx, y: ty, cell: y * CW + x, kind, thr, phase: r2 });
  }
  for (const list of flora) list.sort((a, b) => a.y - b.y);

  const order = cellsOf.map((list, z) => {
    const p = ponds[z];
    return Uint32Array.from(list.map(i => [i, Math.hypot(i % CW * CELL - p.x, Math.floor(i / CW) * CELL - p.y) + hash(i, 1, seed) * 26]).sort((a, b) => a[1] - b[1]).map(e => e[0]));
  });
  return { seed, pend: new Float32Array(CN), active: [], zone, cellsOf, order, ponds, streams, waterT, waterZ, objects, flora, floraCols, floraRows, FC, count: cellsOf.map(l => l.length), dirty: () => {} };
}

export const LANDS = [
  { name: 'Hollow Vale', dead: [132, 121, 106], crack: [86, 76, 66], soil: [78, 58, 44], grass: [88, 138, 68], lush: [116, 160, 76], water: [66, 150, 182], flowers: ['#fff4f0', '#ffd34d', '#ff8fb1', '#b890ff', '#ff9d5c'], mist: [214, 208, 192] },
  { name: 'Ember Basin', dead: [92, 86, 88], crack: [48, 42, 46], soil: [70, 48, 44], grass: [66, 138, 106], lush: [214, 160, 66], water: [56, 170, 170], flowers: ['#ffe9b0', '#ff7a4d', '#ffc247', '#ff5f7e', '#fff4e0'], mist: [190, 180, 178] },
  { name: 'Frostmere', dead: [156, 162, 172], crack: [104, 112, 128], soil: [84, 78, 88], grass: [84, 158, 124], lush: [132, 204, 150], water: [84, 176, 224], flowers: ['#ffffff', '#ffc9e4', '#b8e0ff', '#d7b8ff', '#fff2a8'], mist: [226, 232, 240] },
];
export const landAt = i => LANDS[i % LANDS.length];
