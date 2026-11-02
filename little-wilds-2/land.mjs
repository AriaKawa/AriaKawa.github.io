// The ground as one pixel canvas. Every texel keeps a colour per growth stage and picks one
// from the restoration field, so the front line between dead and alive stays crisp and organic.
import { TW, TH, CW, CH, CELL, fbm, noise, hash, landAt } from './world.mjs';

const packed = (r, g, b) => (255 << 24) | (Math.max(0, Math.min(255, b)) << 16) | (Math.max(0, Math.min(255, g)) << 8) | Math.max(0, Math.min(255, r));
const SOIL_AT = .1, GRASS_AT = .3, LUSH_AT = .74, CHUNK = 32, COLS = TW / CHUNK, ROWS = TH / CHUNK;

export function createLand(w, landIndex) {
  const P = landAt(landIndex), N = TW * TH, dead = new Uint32Array(N), soil = new Uint32Array(N), grass = new Uint32Array(N), lush = new Uint32Array(N), rimA = new Uint32Array(N), rimB = new Uint32Array(N), wet = new Uint32Array(N), jitter = new Float32Array(N);
  const s = w.seed;
  for (let y = 0, i = 0; y < TH; y++) for (let x = 0; x < TW; x++, i++) {
    const e = fbm(x / 58, y / 58, s + 200), ex = fbm((x + 3) / 58, y / 58, s + 200), ey = fbm(x / 58, (y + 3) / 58, s + 200);
    const shade = 1 + Math.max(-.13, Math.min(.13, (e - ex) * 10 + (e - ey) * 14)) + (e - .5) * .12;
    const grain = hash(x, y, s + 3), blotch = fbm(x / 14, y / 14, s + 210), fine = noise(x / 3.4, y / 3.4, s + 220);
    jitter[i] = (fbm(x / 7, y / 7, s + 230) - .5) * 1.1 + (grain - .5) * .45;

    // Dead: cracked hardpan in dull bands, with pale salt and dark fissures.
    const crackField = Math.abs(noise(x / 11, y / 11, s + 240) - noise(x / 11, y / 11, s + 241)), crack = crackField < .026;
    const band = Math.floor(blotch * 6) / 6 + (grain > .9 ? .08 : 0) - .5, salt = grain > .992;
    const dk = shade * (1 + band * .13) * (crack ? 0 : 1);
    dead[i] = crack ? packed(P.crack[0] * shade, P.crack[1] * shade, P.crack[2] * shade)
      : salt ? packed(P.dead[0] * 1.25, P.dead[1] * 1.25, P.dead[2] * 1.25) : packed(P.dead[0] * dk, P.dead[1] * dk, P.dead[2] * dk);

    // Soil: dark and damp, so grey ground visibly drinks as the touch passes.
    const sk = shade * (.9 + Math.floor(fine * 4) * .07 + (grain > .95 ? .14 : 0));
    soil[i] = packed(P.soil[0] * sk, P.soil[1] * sk, P.soil[2] * sk);

    // Grass: bright, mottled, in the same landforms the dead ground had.
    const mottled = Math.floor(fine * 4) / 4 - .4, gk = shade * (1 + mottled * .2 + (grain > .9 ? .1 : 0));
    grass[i] = packed(P.grass[0] * gk, P.grass[1] * gk, P.grass[2] * gk);
    const sun = blotch > .55 ? .05 : 0, lk = shade * (1 + mottled * .18 + sun + (grain > .88 ? .1 : 0));
    lush[i] = packed(P.lush[0] * lk, P.lush[1] * lk, P.lush[2] * lk);
    rimA[i] = packed(P.soil[0] * 1.9 * shade, P.soil[1] * 1.9 * shade, P.soil[2] * 1.7 * shade);
    rimB[i] = packed(P.lush[0] * 1.4 * shade + 22, P.lush[1] * 1.28 * shade + 18, P.lush[2] * 1.05 * shade);

    if (w.waterT[i] >= 0) {
      const edge = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => { const j = i + b * TW + a; return j >= 0 && j < N && w.waterT[j] < 0; });
      const wk = (edge ? .78 : .92 + Math.floor(fine * 3) * .07) * (w.waterT[i] >= .7 ? 1 - (1 - w.waterT[i]) * .6 : 1);
      wet[i] = packed(P.water[0] * wk, P.water[1] * wk, P.water[2] * wk);
      dead[i] = packed(P.crack[0] * .82, P.crack[1] * .82, P.crack[2] * .82);
      soil[i] = packed(P.soil[0] * .7, P.soil[1] * .7, P.soil[2] * .7);
    }
  }
  const canvas = document.createElement('canvas');
  canvas.width = TW; canvas.height = TH;
  const g = canvas.getContext('2d'), image = g.createImageData(TW, TH), out = new Uint32Array(image.data.buffer);
  const dirty = new Uint8Array(COLS * ROWS);
  let view = null, zonesState = null;

  function paint(cx, cy) {
    const x0 = cx * CHUNK, y0 = cy * CHUNK, f = view;
    for (let y = y0; y < y0 + CHUNK; y++) {
      const fy = Math.min(CH - 1.001, Math.max(0, y / CELL - .5)), iy = Math.floor(fy), ty = fy - iy;
      for (let x = x0, i = y * TW + x0; x < x0 + CHUNK; x++, i++) {
        const t = w.waterT[i];
        if (t >= 0 && zonesState[w.waterZ[i]].water >= t) { out[i] = wet[i]; continue; }
        const fx = Math.min(CW - 1.001, Math.max(0, x / CELL - .5)), ix = Math.floor(fx), tx = fx - ix, c = iy * CW + ix;
        const raw = (f[c] * (1 - tx) + f[c + 1] * tx) * (1 - ty) + (f[c + CW] * (1 - tx) + f[c + CW + 1] * tx) * ty;
        if (raw <= .002) { out[i] = dead[i]; continue; }
        const v = raw + jitter[i] * .2 * Math.min(1, raw * 6);
        out[i] = v < SOIL_AT ? dead[i] : v < SOIL_AT + .03 ? rimA[i] : v < GRASS_AT ? soil[i] : v < GRASS_AT + .025 ? rimB[i] : v < LUSH_AT ? grass[i] : lush[i];
      }
    }
    g.putImageData(image, 0, 0, x0, y0, CHUNK, CHUNK);
  }
  return {
    canvas, dead, P,
    setSource(field, zones) { view = field; zonesState = zones; dirty.fill(1); },
    setField(field) { view = field; },
    markCell(i) {
      const x = i % CW, y = Math.floor(i / CW), a = Math.floor(x * CELL / CHUNK), b = Math.floor(y * CELL / CHUNK);
      dirty[b * COLS + a] = 1;
      const a2 = Math.min(COLS - 1, Math.floor((x * CELL + 6) / CHUNK)), a1 = Math.max(0, Math.floor((x * CELL - 6) / CHUNK)), b2 = Math.min(ROWS - 1, Math.floor((y * CELL + 6) / CHUNK)), b1 = Math.max(0, Math.floor((y * CELL - 6) / CHUNK));
      if (a1 !== a || a2 !== a || b1 !== b || b2 !== b) { dirty[b1 * COLS + a1] = 1; dirty[b1 * COLS + a2] = 1; dirty[b2 * COLS + a1] = 1; dirty[b2 * COLS + a2] = 1; }
    },
    markWater(zone) { for (const [x, y] of w.streams[zone]) { if (Math.round(x) % 12 < 2 || Math.round(y) % 12 < 2) { const a = Math.floor(x / CHUNK), b = Math.floor(y / CHUNK); if (a >= 0 && b >= 0 && a < COLS && b < ROWS) dirty[b * COLS + a] = 1; } } const p = w.ponds[zone]; for (let b = Math.floor((p.y - p.r - 6) / CHUNK); b <= (p.y + p.r + 6) / CHUNK; b++) for (let a = Math.floor((p.x - p.r - 6) / CHUNK); a <= (p.x + p.r + 6) / CHUNK; a++) if (a >= 0 && b >= 0 && a < COLS && b < ROWS) dirty[b * COLS + a] = 1; },
    markAll() { dirty.fill(1); },
    flush(budget = 90) { for (let i = 0, n = 0; i < dirty.length && n < budget; i++) if (dirty[i]) { dirty[i] = 0; paint(i % COLS, Math.floor(i / COLS)); n++; } },
    flushAll() { this.flush(Infinity); },
    makeThen() { // The land as it was on day one.
      const c = document.createElement('canvas'); c.width = TW; c.height = TH;
      const cg = c.getContext('2d'), im = cg.createImageData(TW, TH); new Uint32Array(im.data.buffer).set(dead); cg.putImageData(im, 0, 0); return c;
    },
  };
}
