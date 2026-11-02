// The whole continent as one picture, one pixel per restoration cell. Unvisited lands never need their full world built.
import { TW, TH, CW, CH, CN, CELL, LANDS, SEA, BEACH, ROCK, terrain, edgeDepth, fbm, hash } from './world.mjs';
import { isComplete, mapPct, mapReady } from './sim.mjs';

const OUT = 60, SCALE = 2, VW = CW * 3 + OUT * 2, VH = CH * 3 + OUT * 2;
const masks = new Map();
function maskOf(id) { // Terrain class plus a little shading, cached since it never changes.
  if (masks.has(id)) return masks.get(id);
  const l = LANDS[id], kind = new Uint8Array(CN), depth = new Float32Array(CN), shade = new Float32Array(CN);
  for (let y = 0, i = 0; y < CH; y++) for (let x = 0; x < CW; x++, i++) {
    const tx = x * CELL + 2, ty = y * CELL + 2;
    kind[i] = terrain(l.col, l.row, tx, ty); depth[i] = edgeDepth;
    shade[i] = .76 + fbm((l.col * CW + x) / 16, (l.row * CH + y) / 16, 201) * .42 + (hash(l.col * CW + x, l.row * CH + y, 203) > .86 ? .05 : 0);
  }
  const m = { kind, depth, shade };
  masks.set(id, m);
  return m;
}
const fieldOf = (s, id) => {
  if (id === s.land) return i => s.h[i];
  const a = s.atlas[id];
  if (!a) return () => 0;
  if (!a.h) return () => 1;
  const raw = atob(a.h);
  return i => raw.charCodeAt(i) / 255;
};
function paint(id, field, live, veil = 0) {
  const P = LANDS[id], { kind, depth, shade } = maskOf(id), c = document.createElement('canvas');
  c.width = CW; c.height = CH;
  const g = c.getContext('2d'), im = g.createImageData(CW, CH), d = im.data, sand = P.sand || [226, 206, 158], peak = P.peak || [214, 208, 196];
  for (let i = 0, k = 0; i < CN; i++, k += 4) {
    const e = kind[i], sh = shade[i];
    let col;
    if (e === SEA) { d[k + 3] = 0; continue; }
    if (e === BEACH) col = live ? sand : P.dead.map(v => v * 1.14);
    else if (e === ROCK) { const h = depth[i] * sh; col = live ? (h > .62 ? peak : h > .3 ? [112, 104, 100] : P.grass) : P.crack.map((v, n) => v + (P.dead[n] - v) * h); }
    else if (e) col = live ? P.soil.map((v, n) => v + (sand[n] - v) * .55) : P.crack;
    else { const v = field(i), r = hash(i, id, 207); col = v < .1 ? (r > .95 ? P.crack : P.dead) : v < .3 ? P.soil : r > .985 && v > .7 ? FLOWER[i % 3] : r > .93 ? P.grass.map(q => q * .58) : v < .74 ? P.grass : P.lush; }
    d[k] = col[0] * sh + (222 - col[0] * sh) * veil; d[k + 1] = col[1] * sh + (218 - col[1] * sh) * veil; d[k + 2] = col[2] * sh + (210 - col[2] * sh) * veil; d[k + 3] = 255;
  }
  g.putImageData(im, 0, 0);
  return c;
}
const GREY = [74, 76, 82], FLOWER = [[255, 244, 220], [255, 170, 200], [255, 214, 100]];
const seaColour = (P, live) => live ? P.water : GREY;

export function openContinent(canvas, { s, world, flood = -1, isOpen, choose }) {
  const g = canvas.getContext('2d'), start = performance.now(), here = LANDS[s.land];
  const look = LANDS.map((_, id) => ({ now: paint(id, fieldOf(s, id), isComplete(s, id), s.opened[id] ? 0 : mapReady(s, id) ? .15 : .42) }));
  if (flood >= 0) look[flood].then = paint(flood, () => 0, false);
  const sea = document.createElement('canvas'); sea.width = 5; sea.height = 5; // Blurs the waters of neighbouring lands together.
  const seaG = sea.getContext('2d');
  const FLOOD_AT = 1200, FLOOD_FOR = 2600;
  let hover = -1;
  const tileAt = e => { const r = canvas.getBoundingClientRect(), k = Math.min(r.width / VW, r.height / VH), x = (e.clientX - r.left - (r.width - VW * k) / 2) / k - OUT, y = (e.clientY - r.top - (r.height - VH * k) / 2) / k - OUT, c = Math.floor(x / CW), w = Math.floor(y / CH); return LANDS.findIndex(l => l.col === c && l.row === w); };
  canvas.onpointermove = e => { hover = tileAt(e); };
  canvas.onpointerleave = () => { hover = -1; };
  canvas.onclick = e => { const id = tileAt(e); if (id >= 0) choose(id); };
  function frame(now) {
    if (!isOpen() || !canvas.isConnected) return;
    requestAnimationFrame(frame);
    const t = now - start, zoomK = Math.min(1, t / (flood >= 0 ? 1200 : 700)), ez = 1 - (1 - zoomK) ** 3, floodK = flood >= 0 ? Math.max(0, Math.min(1, (t - FLOOD_AT) / FLOOD_FOR)) : 1;
    // The waters: each land's shore colours the nearest pixel, then bilinear scaling softens it.
    for (let y = 0; y < 5; y++) for (let x = 0; x < 5; x++) {
      const c = Math.max(0, Math.min(2, x - 1)), r = Math.max(0, Math.min(2, y - 1)), id = LANDS.findIndex(l => l.col === c && l.row === r), P = LANDS[id], k = id === flood ? floodK : isComplete(s, id) ? 1 : 0, b = seaColour(P, true);
      seaG.fillStyle = `rgb(${GREY.map((v, n) => v + (b[n] - v) * k).join(',')})`; seaG.fillRect(x, y, 1, 1);
    }
    g.setTransform(1, 0, 0, 1, 0, 0); g.imageSmoothingEnabled = true; g.drawImage(sea, 0, 0, VW * SCALE, VH * SCALE);
    // Zoom out from wherever you were standing.
    const z = SCALE * (1 + (1 - ez) * 2.4), fx = OUT + here.col * CW + CW / 2, fy = OUT + here.row * CH + CH / 2, cx = VW / 2 + (fx - VW / 2) * (1 - ez), cy = VH / 2 + (fy - VH / 2) * (1 - ez);
    g.setTransform(z, 0, 0, z, canvas.width / 2 - cx * z, canvas.height / 2 - cy * z); g.imageSmoothingEnabled = false;
    LANDS.forEach((l, id) => {
      const x = OUT + l.col * CW, y = OUT + l.row * CH, L = look[id];
      if (id === flood && floodK < 1) {
        g.drawImage(L.then, x, y);
        g.save(); g.beginPath(); g.arc(x + CW / 2, y + CH / 2, Math.hypot(CW, CH) * .55 * floodK ** .8, 0, 7); g.clip(); g.drawImage(L.now, x, y); g.restore();
      } else g.drawImage(L.now, x, y);
    });
    g.setTransform(1, 0, 0, 1, 0, 0);
    if (flood >= 0 && floodK > 0 && floodK < 1) { const l = LANDS[flood], x = canvas.width / 2 + (OUT + l.col * CW + CW / 2 - VW / 2) * SCALE, y = canvas.height / 2 + (OUT + l.row * CH + CH / 2 - VH / 2) * SCALE; g.strokeStyle = `rgba(255,243,184,${(1 - floodK) * .8})`; g.lineWidth = 10; g.beginPath(); g.arc(x, y, Math.hypot(CW, CH) * SCALE * .55 * floodK ** .8, 0, 7); g.stroke(); }
    if (ez < .98) return;
    // Names over everything, and a veil on lands still out of reach.
    g.textAlign = 'center'; g.textBaseline = 'middle';
    LANDS.forEach((l, id) => {
      const x = (OUT + l.col * CW) * SCALE, y = (OUT + l.row * CH) * SCALE, w = CW * SCALE, h = CH * SCALE, open = s.opened[id], ready = !open && mapReady(s, id), pct = mapPct(s, world, id);
      if (id === hover) { g.fillStyle = 'rgba(255,240,190,.13)'; g.fillRect(x, y, w, h); }
      if (id === s.land) { g.strokeStyle = 'rgba(255,233,168,.95)'; g.lineWidth = 5; g.setLineDash([18, 12]); g.lineDashOffset = -now * .02; g.strokeRect(x + 20, y + 20, w - 40, h - 40); g.setLineDash([]); }
      const sub = id === s.land ? `you are here · ${(mapPctHere(s, id) * 100).toFixed(0)}%` : isComplete(s, id) ? 'restored ✿' : open ? `${Math.floor(pct * 100)}%` : ready ? 'gateway ready' : 'asleep';
      g.font = '600 42px "Pixelify Sans",Georgia,serif'; g.fillStyle = '#231a12'; g.fillText(l.name, x + w / 2 + 2, y + h / 2 - 16); g.fillStyle = '#fff6df'; g.fillText(l.name, x + w / 2, y + h / 2 - 18);
      g.font = '30px "Pixelify Sans",Georgia,serif'; g.fillStyle = '#231a12'; g.fillText(sub, x + w / 2 + 2, y + h / 2 + 28); g.fillStyle = '#ffe9a8'; g.fillText(sub, x + w / 2, y + h / 2 + 26);
    });
  }
  const mapPctHere = (st, id) => st.zones.reduce((a, z) => a + (z.done ? 1 : 0), 0) / st.zones.length;
  requestAnimationFrame(frame);
}
