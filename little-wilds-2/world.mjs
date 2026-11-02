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

// The continent is 3x3 maps. Coasts and ridges come from continent-wide coordinates, so neighbours line up.
const GW = TW * 3, GH = TH * 3, CORNER = 240;
export const SEA = 1, BEACH = 2, ROCK = 3, PATH = 4;
export let edgeDepth = 0;
export function terrain(col, row, x, y, pad = 0) {
  const gx = col * TW + x, gy = row * TH + y;
  const qx = Math.max(CORNER - gx, gx - (GW - CORNER), 0), qy = Math.max(CORNER - gy, gy - (GH - CORNER), 0);
  const inset = qx || qy ? CORNER - Math.hypot(qx, qy) : CORNER;
  if (inset < 100) {
    const shore = 44 + (fbm(gx / 85, gy / 85, 71) - .5) * 70 + (fbm(gx / 24, gy / 24, 72) - .5) * 16;
    if (inset < shore - pad) { edgeDepth = Math.min(1, (shore - inset) / 40); return SEA; }
    if (inset < shore + 9 - pad) { edgeDepth = 0; return BEACH; }
  }
  const vx = gx < TW * 1.5 ? TW : TW * 2, hy = gy < TH * 1.5 ? TH : TH * 2;
  if (Math.abs(gx - vx) < 70) {
    const d = Math.abs(gx - vx + (fbm(gy / 60, 3, 73) - .5) * 26), wide = 18 + fbm(gy / 23, 8, 74) * 14;
    if (d < wide - pad) { edgeDepth = 1 - d / wide; return Math.abs(y - TH / 2) < 30 + fbm(x / 9, gy / 9, 77) * 16 ? PATH : ROCK; }
  }
  if (Math.abs(gy - hy) < 70) {
    const d = Math.abs(gy - hy + (fbm(gx / 60, 5, 75) - .5) * 26), wide = 18 + fbm(gx / 23, 9, 76) * 14;
    if (d < wide - pad) { edgeDepth = 1 - d / wide; return Math.abs(x - TW / 2) < 32 + fbm(gx / 9, y / 9, 78) * 16 ? PATH : ROCK; }
  }
  return 0;
}

export function makeWorld(seed = 1, mapId = 0) {
  // Each map dresses the same glade tree in its own names, opening on the side nearest the heartland.
  const map = LANDS[mapId], flipX = map.col === 0, flipY = map.row === 2;
  for (const z of ZONES) { const c = flipX ? 2 - z.col : z.col, r = flipY ? 2 - z.row : z.row; z.name = map.glades[z.id]; z.px = 160 + c * 320; z.py = 110 + r * 210; }
  const edge = new Uint8Array(TW * TH), edgeD = new Float32Array(TW * TH), blocked = new Uint8Array(CN), near = new Uint8Array(CN);
  for (let y = 0, i = 0; y < TH; y++) for (let x = 0; x < TW; x++, i++) { const e = terrain(map.col, map.row, x, y); if (e) { edge[i] = e; edgeD[i] = edgeDepth; } }
  // A cell is off limits only if it sits well inside the edge, so restored ground always reaches the shore.
  for (let y = 0, i = 0; y < CH; y++) for (let x = 0; x < CW; x++, i++) if (terrain(map.col, map.row, x * CELL + 2, y * CELL + 2, 3)) blocked[i] = 1;
  for (let y = 0, i = 0; y < CH; y++) for (let x = 0; x < CW; x++, i++) for (let b = -1; b < 3 && !near[i]; b++) for (let a = -1; a < 3; a++) { const xx = x + a, yy = y + b; if (xx >= 0 && yy >= 0 && xx < CW && yy < CH && blocked[yy * CW + xx]) { near[i] = 1; break; } }
  const blockedAt = (x, y, r = 0) => { for (const [a, b] of [[0, 0], [r, 0], [-r, 0], [0, r], [0, -r]]) { const xx = Math.floor((x + a) / CELL), yy = Math.floor((y + b) / CELL); if (xx < 0 || yy < 0 || xx >= CW || yy >= CH || blocked[yy * CW + xx]) return true; } return false; };
  const zone = new Uint8Array(CN), cellsOf = ZONES.map(() => []);
  for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) {
    const tx = x * CELL + 2, ty = y * CELL + 2;
    const wx = tx + (fbm(tx / 70, ty / 70, seed + 11) - .5) * 85 + (fbm(tx / 19, ty / 19, seed + 13) - .5) * 46, wy = ty + (fbm(tx / 70, ty / 70, seed + 29) - .5) * 85 + (fbm(tx / 19, ty / 19, seed + 31) - .5) * 46;
    let best = 0, bd = Infinity;
    for (const z of ZONES) { const d = (wx - z.px) ** 2 + (wy - z.py) ** 2; if (d < bd) { bd = d; best = z.id; } }
    zone[y * CW + x] = best;
    if (!blocked[y * CW + x]) cellsOf[best].push(y * CW + x);
  }

  // Ponds sit near each glade's heart; streams run to them from the parent's pond.
  const ponds = ZONES.map(z => ({
    x: z.px + (hash(z.id, 3, seed) - .5) * 70, y: z.py + (hash(z.id, 7, seed) - .5) * 50,
    r: z.id === FINALE ? 26 : 13 + hash(z.id, 9, seed) * 9,
  }));
  for (const p of ponds) for (let k = 0; k < 40 && blockedAt(p.x, p.y, p.r + 16); k++) { const d = Math.hypot(TW / 2 - p.x, TH / 2 - p.y); p.x += (TW / 2 - p.x) / d * 6; p.y += (TH / 2 - p.y) / d * 6; }
  const waterT = new Float32Array(TW * TH).fill(-1), waterZ = new Uint8Array(TW * TH);
  const stamp = (x, y, r, t, z) => {
    for (let yy = Math.floor(y - r); yy <= y + r; yy++) for (let xx = Math.floor(x - r); xx <= x + r; xx++) {
      if (xx < 0 || yy < 0 || xx >= TW || yy >= TH || (xx - x) ** 2 + (yy - y) ** 2 > r * r) continue;
      const i = yy * TW + xx;
      if (waterT[i] < 0 && !edge[i]) { waterT[i] = t; waterZ[i] = z; }
    }
  };
  const streams = ZONES.map(z => {
    const end = ponds[z.id], p = z.parent >= 0 ? ponds[z.parent] : { x: flipX ? TW + 6 : -6, y: end.y + 30 };
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
    const shrineSide = blockedAt(pond.x + pond.r + 18, pond.y - 4, 8) ? -1 : 1;
    place(z.id, KIND.shrineDead, KIND.shrine, pond.x + shrineSide * (pond.r + 18), pond.y - 4, 30);
    if (z.id === FINALE) { const side = blockedAt(pond.x - shrineSide * (pond.r + 34), pond.y + 6, 24) ? shrineSide : -shrineSide; place(z.id, KIND.deadTree, KIND.blossom, pond.x + side * (pond.r + 34), pond.y + 6, 110); }
    // Each glade's landmark: frames come in dead, restored pairs in the landmarks atlas.
    const [mark, size] = LANDMARKS[z.id];
    for (let k = 0; k < 16; k++) {
      const a = 1.2 + k * .79, x = pond.x + Math.cos(a) * (pond.r + size * .9), y = pond.y + Math.sin(a) * (pond.r + size * .55) + size * .3;
      if (y < size + 8 || x < size || x > TW - size || y > TH - 8 || blockedAt(x, y, 14) || nearWater(x, y, 8) || !clear(x, y, 40)) continue;
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
      if (x < 20 || y < 34 || x > TW - 20 || y > TH - 10 || blockedAt(x, y, 6) || nearWater(x, y, 10) || !clear(x, y, 22)) continue;
      place(z.id, dead, dead === KIND.deadTree && n % 3 === 2 ? KIND.tree : live, x, y, size + hash(tries, 5, seed) * 6);
      n++;
    }
  }

  // Flora appear when their cell passes a threshold. They are stored per chunk for culling.
  const FC = 64, floraCols = Math.ceil(TW / FC), floraRows = Math.ceil(TH / FC), flora = Array.from({ length: floraCols * floraRows }, () => []);
  for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) for (let k = 0; k < 2; k++) {
    const r = hash(x * 3 + k, y * 5 - k, seed + 101), r2 = hash(x + k * 9, y + k * 3, seed + 107);
    const tx = (x + hash(x, y + k, seed + 103)) * CELL, ty = (y + hash(x + k, y, seed + 105)) * CELL;
    if (blocked[y * CW + x] || edge[Math.min(TH - 1, Math.floor(ty)) * TW + Math.min(TW - 1, Math.floor(tx))] || xx0(Math.min(TW - 1, tx), Math.min(TH - 1, ty))) continue;
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
  // A gateway stands in the pass on each inland side.
  const gates = [];
  for (const [dc, dr, x, y] of [[0, -1, TW / 2, 50], [1, 0, TW - 50, TH / 2 + 18], [0, 1, TW / 2, TH - 26], [-1, 0, 50, TH / 2 + 18]]) {
    const target = LANDS.findIndex(l => l.col === map.col + dc && l.row === map.row + dr);
    if (target >= 0 && (LANDS[target].needs.includes(mapId) || map.needs.includes(target))) gates.push({ x, y, target, size: 58 });
  }
  return { seed, mapId, gates, edge, edgeD, blocked, near, pend: new Float32Array(CN), active: [], zone, cellsOf, order, ponds, streams, waterT, waterZ, objects, flora, floraCols, floraRows, FC, count: cellsOf.map(l => l.length), dirty: () => {} };
}

// id 1 and 2 keep the palettes older saves travelled to.
export const LANDS = [
  { name: 'Hollow Vale', col: 1, row: 1, needs: [], glades: ['Hearthfield', 'Clover Downs', 'Willow Draw', 'Pebble Hollow', 'Honey Meadow', 'Dry Creek Bend', 'Birch Knoll', 'Daisy Vale', "Mother's Rise"], dead: [132, 121, 106], crack: [86, 76, 66], soil: [78, 58, 44], grass: [88, 138, 68], lush: [116, 160, 76], water: [66, 150, 182], flowers: ['#fff4f0', '#ffd34d', '#ff8fb1', '#b890ff', '#ff9d5c'], mist: [214, 208, 192] },
  { name: 'Ember Basin', col: 2, row: 1, needs: [0], native: { label: 'A cinder fox', size: 24, speed: 9 }, glades: ['Ashfall Gate', 'Kiln Hollow', 'Smoulder Run', 'Red Terrace', 'Coalbloom', 'Charcoal Bend', 'Lantern Scarp', 'Sparkfield', 'The Warm Heart'], dead: [92, 86, 88], crack: [48, 42, 46], soil: [70, 48, 44], grass: [66, 138, 106], lush: [214, 160, 66], water: [56, 170, 170], flowers: ['#ffe9b0', '#ff7a4d', '#ffc247', '#ff5f7e', '#fff4e0'], mist: [190, 180, 178] },
  { name: 'Frostmere', col: 1, row: 0, needs: [0], native: { label: 'A snow lynx', size: 26, speed: 8 }, glades: ['Thaw Gate', 'Rimewood', 'Icicle Draw', 'Hushed Fell', 'Silverbrook', 'Glass Bend', 'Pine Knoll', 'Winterbell', 'The First Melt'], dead: [156, 162, 172], crack: [104, 112, 128], soil: [84, 78, 88], grass: [84, 158, 124], lush: [132, 204, 150], water: [84, 176, 224], flowers: ['#ffffff', '#ffc9e4', '#b8e0ff', '#d7b8ff', '#fff2a8'], mist: [226, 232, 240], peak: [244, 248, 255] },
  { name: 'Sunfall Coast', col: 1, row: 2, needs: [0], native: { label: 'A sun tortoise', size: 20, speed: 4 }, glades: ['Tidegate', 'Palm Hollow', 'Saltgrass', 'Shell Rise', 'Gull Rest', 'Driftwood Bend', 'Lighthouse Knoll', 'Hibiscus Vale', 'Sunfall Point'], dead: [168, 150, 118], crack: [112, 94, 70], soil: [112, 82, 54], grass: [122, 172, 76], lush: [170, 196, 84], water: [52, 176, 190], flowers: ['#fff6d8', '#ff6f6f', '#ffb347', '#ff8fc8', '#7fd8d0'], mist: [232, 222, 196], sand: [240, 216, 160] },
  { name: 'Mistfen', col: 0, row: 1, needs: [0], native: { label: 'A reed otter', size: 20, speed: 8 }, glades: ['Reedgate', 'Sedge Hollow', 'Lily Draw', 'Heron Rest', 'Willow Sink', 'Peat Bend', 'Lantern Bog', 'Cattail Vale', 'The Still Eye'], dead: [104, 104, 92], crack: [62, 64, 56], soil: [52, 48, 40], grass: [72, 130, 96], lush: [96, 156, 118], water: [78, 142, 150], flowers: ['#e8fff0', '#b8f0d0', '#d8b8ff', '#fff2a8', '#88d8c8'], mist: [196, 210, 200] },
  { name: 'Auric Steppe', col: 2, row: 0, needs: [1, 2], native: { label: 'A golden ram', size: 28, speed: 7 }, glades: ['Windgate', 'Barley Downs', 'Amber Draw', 'Harrow Rise', 'Gildengrass', 'Thresher Bend', 'Maple Knoll', 'Sheaf Vale', 'The Long Light'], dead: [146, 124, 92], crack: [94, 76, 54], soil: [88, 62, 40], grass: [176, 164, 70], lush: [224, 170, 62], water: [82, 150, 170], flowers: ['#fff2c8', '#ff9040', '#e8503c', '#ffd34d', '#c86a3c'], mist: [226, 208, 176] },
  { name: 'Coral Reach', col: 2, row: 2, needs: [1, 3], native: { label: 'A coral crab', size: 15, speed: 7 }, glades: ['Pearlgate', 'Anemone Hollow', 'Brine Draw', 'Conch Rise', 'Rosereef', 'Urchin Bend', 'Foam Knoll', 'Starfish Vale', 'The Pink Tide'], dead: [150, 134, 136], crack: [98, 84, 92], soil: [98, 66, 80], grass: [82, 170, 150], lush: [236, 140, 160], water: [64, 196, 206], flowers: ['#fff0f4', '#ff7fa8', '#ffb09a', '#a0f0e0', '#ffe28a'], mist: [234, 212, 220], sand: [250, 214, 200] },
  { name: 'Sporewood', col: 0, row: 2, needs: [3, 4], native: { label: 'A spore toadling', size: 17, speed: 6 }, glades: ['Capgate', 'Gill Hollow', 'Puffball Draw', 'Mycel Rise', 'Glowcap', 'Rootrot Bend', 'Moss Knoll', 'Dapple Vale', 'The Great Cap'], dead: [106, 92, 104], crack: [64, 52, 66], soil: [60, 44, 58], grass: [84, 128, 92], lush: [132, 110, 180], water: [92, 130, 190], flowers: ['#f0e0ff', '#c890ff', '#ff90c8', '#90f0d0', '#ffd890'], mist: [204, 192, 214] },
  { name: 'Glimmerdeep', col: 0, row: 0, needs: [2, 4], native: { label: 'A crystal hedgehog', size: 16, speed: 6 }, glades: ['Shardgate', 'Quartz Hollow', 'Prism Draw', 'Echo Rise', 'Geode Meadow', 'Facet Bend', 'Amethyst Knoll', 'Glint Vale', 'The Deep Light'], dead: [116, 116, 134], crack: [68, 68, 90], soil: [62, 56, 86], grass: [78, 158, 160], lush: [120, 190, 220], water: [110, 150, 240], flowers: ['#ffffff', '#b8e8ff', '#d0b0ff', '#90f0e0', '#ffc0f0'], mist: [212, 214, 236], peak: [214, 196, 255] },
];
export const landAt = i => LANDS[i % LANDS.length];
