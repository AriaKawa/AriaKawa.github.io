// The whole continent as one picture, one pixel per restoration cell. Unvisited lands never need their full world built.
// The land tiles are bent through one shared warp, so the coast and the borders read as a real map rather than a grid.
import { TW, CW, CH, CN, CELL, LANDS, SEA, BEACH, ROCK, terrain, edgeDepth, fbm, hash, makeWorld, dressZones } from './world.mjs';
import { isComplete, mapPct, crewOf, landPrice } from './sim.mjs';

const OUT = 60, SCALE = 2, VW = CW * 3 + OUT * 2, VH = CH * 3 + OUT * 2, BEND = 11;
const FLOWER = [[255, 244, 220], [255, 170, 200], [255, 214, 100]];
const masks = new Map();
function maskOf(id) { // Terrain class plus a little shading, cached since it never changes.
  if (masks.has(id)) return masks.get(id);
  const l = LANDS[id], kind = new Uint8Array(CN), depth = new Float32Array(CN), shade = new Float32Array(CN);
  let cx = 0, cy = 0, n = 0;
  for (let y = 0, i = 0; y < CH; y++) for (let x = 0; x < CW; x++, i++) {
    const tx = x * CELL + 2, ty = y * CELL + 2;
    kind[i] = terrain(l.col, l.row, tx, ty); depth[i] = edgeDepth;
    shade[i] = .76 + fbm((l.col * CW + x) / 16, (l.row * CH + y) / 16, 201) * .42 + (hash(l.col * CW + x, l.row * CH + y, 203) > .86 ? .05 : 0);
    if (kind[i] !== SEA) { cx += x; cy += y; n++; }
  }
  const m = { kind, depth, shade, cx: cx / n, cy: cy / n };
  masks.set(id, m);
  return m;
}
let warpX = null, warpY = null;
function warp() { // For each picture pixel, which unbent pixel it shows.
  if (warpX) return;
  warpX = new Int16Array(VW * VH); warpY = new Int16Array(VW * VH);
  for (let y = 0, i = 0; y < VH; y++) for (let x = 0; x < VW; x++, i++) {
    warpX[i] = Math.round(x + (fbm(x / 46, y / 46, 301) - .5) * BEND * 3.4);
    warpY[i] = Math.round(y + (fbm(x / 46, y / 46, 307) - .5) * BEND * 3.4);
  }
}
const fieldOf = (s, id) => {
  if (id === s.land) return i => s.h[i];
  const a = s.atlas[id];
  if (!a) return () => 0;
  if (a.h === '') return () => 1;
  const raw = a.h ? atob(a.h) : null, pct = a.pct || 0;
  // Work done while away is not in the saved field yet, so it shows as soft patches of green.
  return i => { const v = raw ? raw.charCodeAt(i) / 255 : 0; return v < .6 && (fbm((i % CW) / 11, Math.floor(i / CW) / 11, 311) - .28) / .44 < pct ? .6 : v; };
};
// Village roads, fields and rooftops at one pixel per cell. Planning an unvisited village means building its world once.
const towns = new Map();
function townOf(id, here) {
  if (!LANDS[id].village) return null;
  if (towns.has(id)) return towns.get(id);
  const w = id === here.mapId ? here : makeWorld(1 + id * 17, id), m = new Uint8Array(CN);
  if (w !== here) dressZones(here.mapId);
  for (let y = 0, i = 0; y < CH; y++) for (let x = 0; x < CW; x++, i++) m[i] = w.road[(y * CELL + 2) * TW + x * CELL + 2];
  for (const o of w.objects) if (o.mark) for (let b = -2; b <= 0; b++) for (let a = -1; a <= 1; a++) { const x = Math.round(o.x) + a, y = Math.round(o.y) + b; if (x >= 0 && y >= 0 && x < CW && y < CH) m[y * CW + x] = b < 0 ? 4 : 5; }
  towns.set(id, m);
  return m;
}
// Writes one land's colours into the shared unbent picture.
function paint(px, owner, id, field, live, veil, town = null) {
  const P = LANDS[id], { kind, depth, shade } = maskOf(id), sand = P.sand || [226, 206, 158], peak = P.peak || [214, 208, 196], ox = OUT + P.col * CW, oy = OUT + P.row * CH;
  for (let i = 0; i < CN; i++) {
    const e = kind[i], sh = shade[i];
    if (e === SEA) continue;
    let col;
    if (e === BEACH) col = live ? sand : P.dead.map(v => v * 1.14);
    else if (e === ROCK) { const h = depth[i] * sh; col = live ? (h > .62 ? peak : h > .3 ? [112, 104, 100] : P.grass) : P.crack.map((v, n) => v + (P.dead[n] - v) * h); }
    else if (e) col = live ? P.soil.map((v, n) => v + (sand[n] - v) * .55) : P.crack;
    else { const v = field(i), r = hash(i, id, 207); col = v < .1 ? (r > .95 ? P.crack : P.dead) : v < .3 ? P.soil : r > .985 && v > .7 ? FLOWER[i % 3] : r > .93 ? P.grass.map(q => q * .58) : v < .74 ? P.grass : P.lush; }
    if (town?.[i] && !e) { const t = town[i], up = field(i) >= .3 || live; col = t === 4 ? (up ? [196, 84, 58] : P.crack) : t === 5 ? (up ? [238, 222, 188] : P.dead) : t === 3 ? (up ? P.soil : P.crack) : up ? P.road : P.crack; }
    const at = (oy + Math.floor(i / CW)) * VW + ox + i % CW, k = at * 4;
    px[k] = col[0] * sh + (222 - col[0] * sh) * veil; px[k + 1] = col[1] * sh + (218 - col[1] * sh) * veil; px[k + 2] = col[2] * sh + (210 - col[2] * sh) * veil; px[k + 3] = 255;
    owner[at] = id + 1;
  }
}
// Bends an unbent picture into a canvas.
function bend(px) {
  warp();
  const c = document.createElement('canvas'); c.width = VW; c.height = VH;
  const g = c.getContext('2d'), im = g.createImageData(VW, VH), out = new Uint32Array(im.data.buffer), src = new Uint32Array(px.buffer);
  for (let i = 0; i < out.length; i++) { const x = warpX[i], y = warpY[i]; if (x >= 0 && y >= 0 && x < VW && y < VH) out[i] = src[y * VW + x]; }
  g.putImageData(im, 0, 0);
  return c;
}
const stamp = (land, colour, blur) => { const c = document.createElement('canvas'); c.width = VW; c.height = VH; const g = c.getContext('2d'); g.filter = `blur(${blur}px)`; g.drawImage(land, 0, 0); g.filter = 'none'; g.globalCompositeOperation = 'source-in'; g.fillStyle = colour; g.fillRect(0, 0, VW, VH); return c; };

export function openContinent(canvas, { s, world, flood = -1, price, isOpen, choose }) {
  const g = canvas.getContext('2d'), start = performance.now(), here = LANDS[s.land];
  const paintAll = deadId => {
    const px = new Uint8ClampedArray(VW * VH * 4), owner = new Uint8Array(VW * VH);
    LANDS.forEach((_, id) => { const dead = id === deadId; paint(px, owner, id, dead ? () => 0 : fieldOf(s, id), !dead && isComplete(s, id), dead || s.opened[id] ? 0 : .3, townOf(id, world)); });
    return { px, owner };
  };
  const now = paintAll(-1), landNow = bend(now.px), landThen = flood >= 0 ? bend(paintAll(flood).px) : null;
  // Deep water, then a pale shelf and a line of surf hugging the shore.
  const ocean = document.createElement('canvas'); ocean.width = VW; ocean.height = VH;
  const og = ocean.getContext('2d'), deep = og.createLinearGradient(0, 0, VW, VH); deep.addColorStop(0, '#17557f'); deep.addColorStop(1, '#1d6a8e');
  og.fillStyle = deep; og.fillRect(0, 0, VW, VH);
  og.globalAlpha = .7; og.drawImage(stamp(landNow, '#2f8fa8', 9), 0, 0); og.globalAlpha = .75; og.drawImage(stamp(landNow, '#62c4c4', 3), 0, 0); og.globalAlpha = 1; og.drawImage(stamp(landNow, '#dff4ea', .8), 0, 0);
  const glints = [];
  for (let k = 0; k < 900 && glints.length < 90; k++) { const x = Math.floor(hash(k, 1, 313) * VW), y = Math.floor(hash(k, 2, 313) * VH); if (!landNow.getContext('2d').getImageData(x, y, 1, 1).data[3]) glints.push([x, y, hash(k, 3, 313)]); }
  // Where each land's name sits, on its real ground rather than the middle of its tile.
  const spot = LANDS.map((l, id) => { const m = maskOf(id); return { x: (OUT + l.col * CW + m.cx) * SCALE, y: (OUT + l.row * CH + m.cy) * SCALE }; });
  const halo = new Map();
  const glow = id => { // One land's silhouette, built the first time it is needed.
    if (halo.has(id)) return halo.get(id);
    const px = new Uint8ClampedArray(VW * VH * 4);
    for (let i = 0; i < now.owner.length; i++) if (now.owner[i] === id + 1) { const k = i * 4; px[k] = 255; px[k + 1] = 240; px[k + 2] = 190; px[k + 3] = 255; }
    const c = bend(px); halo.set(id, c);
    return c;
  };
  const FLOOD_AT = 1200, FLOOD_FOR = 2600;
  let hover = -1;
  const tileAt = e => {
    const r = canvas.getBoundingClientRect(), k = Math.min(r.width / VW, r.height / VH), x = Math.round((e.clientX - r.left - (r.width - VW * k) / 2) / k), y = Math.round((e.clientY - r.top - (r.height - VH * k) / 2) / k);
    if (x < 0 || y < 0 || x >= VW || y >= VH) return -1;
    warp();
    const i = y * VW + x, sx = warpX[i], sy = warpY[i];
    return sx >= 0 && sy >= 0 && sx < VW && sy < VH ? now.owner[sy * VW + sx] - 1 : -1;
  };
  canvas.onpointermove = e => { hover = tileAt(e); canvas.style.cursor = hover >= 0 ? 'pointer' : 'default'; };
  canvas.onpointerleave = () => { hover = -1; };
  canvas.onclick = e => { const id = tileAt(e); if (id >= 0) choose(id); };
  function frame(time) {
    if (!isOpen() || !canvas.isConnected) return;
    requestAnimationFrame(frame);
    const t = time - start, zoomK = Math.min(1, t / (flood >= 0 ? 1200 : 700)), ez = 1 - (1 - zoomK) ** 3, floodK = flood >= 0 ? Math.max(0, Math.min(1, (t - FLOOD_AT) / FLOOD_FOR)) : 1;
    // Zoom out from wherever you were standing.
    const z = SCALE * (1 + (1 - ez) * 2.4), fx = OUT + here.col * CW + CW / 2, fy = OUT + here.row * CH + CH / 2, cx = VW / 2 + (fx - VW / 2) * (1 - ez), cy = VH / 2 + (fy - VH / 2) * (1 - ez);
    g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#17557f'; g.fillRect(0, 0, canvas.width, canvas.height);
    g.setTransform(z, 0, 0, z, canvas.width / 2 - cx * z, canvas.height / 2 - cy * z); g.imageSmoothingEnabled = false;
    g.drawImage(ocean, 0, 0);
    for (const [x, y, ph] of glints) { const b = Math.sin(time * .0012 + ph * 40); if (b < .45) continue; g.fillStyle = `rgba(235,250,250,${(b - .45) * .7})`; g.fillRect(x + Math.sin(time * .0005 + ph * 9) * 2, y, 3, 1); }
    if (flood >= 0 && floodK < 1) {
      const c = spot[flood];
      g.drawImage(landThen, 0, 0);
      g.save(); g.beginPath(); g.arc(c.x / SCALE, c.y / SCALE, Math.hypot(CW, CH) * .62 * floodK ** .8, 0, 7); g.clip(); g.drawImage(landNow, 0, 0); g.restore();
    } else g.drawImage(landNow, 0, 0);
    if (ez >= .98) {
      g.globalAlpha = .16; g.drawImage(glow(s.land), 0, 0);
      if (hover >= 0) { g.globalAlpha = .2; g.drawImage(glow(hover), 0, 0); }
      g.globalAlpha = 1;
    }
    g.setTransform(1, 0, 0, 1, 0, 0);
    if (flood >= 0 && floodK > 0 && floodK < 1) { const c = spot[flood]; g.strokeStyle = `rgba(255,243,184,${(1 - floodK) * .8})`; g.lineWidth = 10; g.beginPath(); g.arc(c.x, c.y, Math.hypot(CW, CH) * SCALE * .62 * floodK ** .8, 0, 7); g.stroke(); }
    if (ez < .98) return;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    LANDS.forEach((l, id) => {
      const { x, y } = spot[id], own = s.opened[id], done = isComplete(s, id), crew = crewOf(s, id), pct = mapPct(s, world, id);
      const sub = id === s.land ? `you are here · ${Math.floor(pct * 100)}%` : done ? 'restored ✿' : own ? `${Math.floor(pct * 100)}% · ${crew} spirit${crew > 1 ? 's' : ''} working` : `buy for ${price}`;
      const can = !own && s.seeds >= landPrice(s);
      g.font = '600 42px "Pixelify Sans",Georgia,serif'; g.fillStyle = '#231a12'; g.fillText(l.name, x + 2, y - 16); g.fillStyle = '#fff6df'; g.fillText(l.name, x, y - 18);
      g.font = '30px "Pixelify Sans",Georgia,serif'; g.fillStyle = '#231a12'; g.fillText(sub, x + 2, y + 28); g.fillStyle = own ? '#ffe9a8' : can ? '#ffd36b' : '#e4d9c6'; g.fillText(sub, x, y + 26);
    });
  }
  requestAnimationFrame(frame);
}
