// Painted sprites become true pixel art on the ground's own grid: one art pixel per ground texel, a small
// palette with no smooth gradients, lone stray pixels tidied away and a dark rim, so buildings, animals and
// spirits sit in the same chunky world as the grass instead of floating over it as glossy paintings.
const cache = new Map(), sources = new Map();
let ids = 0, spent = 0;
// Converting costs a millisecond or two per sprite, so only a few are made each frame; the rest wait a frame.
export const newFrame = () => { spent = 0; };
const RIM = [40, 30, 26];

function source(img, sx, sy, sw, sh) {
  img.__pix ??= ++ids;
  const key = `${img.__pix}:${sx}:${sy}:${sw}:${sh}`;
  let d = sources.get(key);
  if (!d) { const c = document.createElement('canvas'); c.width = sw; c.height = sh; const g = c.getContext('2d'); g.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh); d = g.getImageData(0, 0, sw, sh).data; sources.set(key, d); }
  return d;
}
// Median cut: split the colour cloud along its widest channel until there are k boxes, then use each box's mean.
function palette(cols, k) {
  let boxes = [cols];
  while (boxes.length < k) {
    let best = -1, span = 0, ch = 0;
    boxes.forEach((b, n) => { if (b.length < 2) return; for (let c = 0; c < 3; c++) { let lo = 255, hi = 0; for (const p of b) { if (p[c] < lo) lo = p[c]; if (p[c] > hi) hi = p[c]; } if (hi - lo > span) { span = hi - lo; best = n; ch = c; } } });
    if (best < 0 || span < 10) break;
    const b = boxes[best].sort((p, q) => p[ch] - q[ch]), mid = b.length >> 1;
    boxes.splice(best, 1, b.slice(0, mid), b.slice(mid));
  }
  return boxes.map(b => [0, 1, 2].map(c => b.reduce((a, p) => a + p[c], 0) / b.length));
}
// `tw` x `th` is the sprite's size in ground texels.
export function pixelize(img, sx, sy, sw, sh, tw, th, flip = false) {
  tw = Math.max(1, Math.round(tw)); th = Math.max(1, Math.round(th));
  // A number, not a string, so looking up thousands of sprites a frame stays cheap.
  const key = ((((img.__pix ??= ++ids) * 2048 + sx) * 2048 + sy) * 256 + Math.min(255, tw)) * 512 + Math.min(255, th) * 2 + (flip ? 1 : 0);
  let out = cache.get(key);
  if (out) return out;
  if (spent > 4) return null;
  const began = performance.now();
  const src = source(img, sx, sy, sw, sh), n = tw * th, rgb = new Float32Array(n * 3), solid = new Uint8Array(n);
  // Box filter: every texel is the alpha-weighted average of the painted pixels under it.
  for (let ty = 0; ty < th; ty++) for (let tx = 0; tx < tw; tx++) {
    const x0 = Math.floor(tx * sw / tw), x1 = Math.max(x0 + 1, Math.floor((tx + 1) * sw / tw)), y0 = Math.floor(ty * sh / th), y1 = Math.max(y0 + 1, Math.floor((ty + 1) * sh / th));
    let r = 0, g = 0, b = 0, a = 0;
    for (let y = y0; y < y1; y++) for (let x = x0, i = (y * sw + x0) * 4; x < x1; x++, i += 4) { const w = src[i + 3]; r += src[i] * w; g += src[i + 1] * w; b += src[i + 2] * w; a += w; }
    const k = ty * tw + (flip ? tw - 1 - tx : tx);
    if (a / ((x1 - x0) * (y1 - y0) * 255) < .45) continue;
    solid[k] = 1; rgb[k * 3] = r / a; rgb[k * 3 + 1] = g / a; rgb[k * 3 + 2] = b / a;
  }
  // A handful of flat colours, fewer for small sprites, the way a pixel artist would pick them.
  const cols = []; for (let k = 0; k < n; k++) if (solid[k]) cols.push([rgb[k * 3], rgb[k * 3 + 1], rgb[k * 3 + 2]]);
  const pal = cols.length ? palette(cols, Math.max(4, Math.min(7, Math.round(2 + Math.sqrt(n) / 10)))) : [[0, 0, 0]];
  const idx = new Int16Array(n).fill(-1);
  for (let k = 0; k < n; k++) if (solid[k]) { let best = 0, bd = Infinity; pal.forEach((p, m) => { const d = (p[0] - rgb[k * 3]) ** 2 * .3 + (p[1] - rgb[k * 3 + 1]) ** 2 * .59 + (p[2] - rgb[k * 3 + 2]) ** 2 * .11; if (d < bd) { bd = d; best = m; } }); idx[k] = best; }
  // Fussy detail goes: a pixel outvoted by five of its eight neighbours takes their colour. The silhouette stays.
  const at = (x, y) => x < 0 || y < 0 || x >= tw || y >= th ? -1 : idx[y * tw + x];
  const next = idx.slice(), votes = new Int16Array(pal.length);
  for (let y = 0; y < th; y++) for (let x = 0; x < tw; x++) {
    const v = at(x, y); if (v < 0) continue;
    votes.fill(0);
    for (let b = -1; b <= 1; b++) for (let a = -1; a <= 1; a++) { const q = (a || b) ? at(x + a, y + b) : -1; if (q >= 0) votes[q]++; }
    let top = v; for (let m = 0; m < pal.length; m++) if (votes[m] > votes[top]) top = m;
    if (top !== v && votes[top] >= 5) next[y * tw + x] = top;
  }
  idx.set(next);
  const c = document.createElement('canvas'); c.width = tw; c.height = th;
  const g = c.getContext('2d'), im = g.createImageData(tw, th), d = im.data;
  for (let y = 0; y < th; y++) for (let x = 0; x < tw; x++) {
    const v = at(x, y); if (v < 0) continue;
    // Pixels on the silhouette darken into a soft rim, which keeps small sprites readable on busy grass.
    const edge = at(x + 1, y) < 0 || at(x - 1, y) < 0 || at(x, y + 1) < 0 || at(x, y - 1) < 0, p = pal[v], m = edge ? .38 : 0, i = (y * tw + x) * 4;
    d[i] = p[0] + (RIM[0] - p[0]) * m; d[i + 1] = p[1] + (RIM[1] - p[1]) * m; d[i + 2] = p[2] + (RIM[2] - p[2]) * m; d[i + 3] = 255;
  }
  g.putImageData(im, 0, 0);
  cache.set(key, c);
  spent += performance.now() - began;
  return c;
}
