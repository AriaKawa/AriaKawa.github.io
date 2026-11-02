// Everything above the ground: flora, the dead-and-revived objects, spirits, wildlife, weather and fog.
import { TW, TH, CW, CH, CELL, ZONES, landAt, hash, fbm } from './world.mjs';
import { GREEN, brushRadius, SPIRITS } from './sim.mjs';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const SIZE = 64, LIVE_SHARE = .22;

// Tiny hand-placed pixel art. Letters index a small per-sprite palette.
const art = (rows, pal) => {
  const c = document.createElement('canvas'); c.width = rows[0].length; c.height = rows.length;
  const g = c.getContext('2d');
  rows.forEach((row, y) => [...row].forEach((ch, x) => { if (pal[ch]) { g.fillStyle = pal[ch]; g.fillRect(x, y, 1, 1); } }));
  return c;
};
const CRITTERS = {
  butterfly: ['#ffd166', '#ff9dc4', '#fff'].map(a => [false, true].map(open => art(open ? ['a.a', 'aba', 'a.a'] : ['...', 'aba', '...'], { a, b: '#4a3324' }))),
  bird: [false, true].map(up => art(up ? ['a...a', '.a.a.', '..b..'] : ['.....', 'aabaa', 'a...a'], { a: '#3d4a55', b: '#2a333b' })),
};
const HEART = art(['.a.a.', 'aaaaa', 'aaaaa', '.aaa.', '..a..'], { a: '#ff9dbb' });
const PETS = { deer: { row: 0, size: 34, speed: 6, label: 'A spirit deer' }, fawn: { row: 0, size: 23, speed: 7, label: 'A spirit fawn' }, rabbit: { row: 1, size: 14, speed: 9, label: 'A moss rabbit' } };

function floraAtlas(P) {
  // Rows: 0 tuft, 1 tall grass, 2-6 flowers, 7 fern. Columns: three wind poses.
  const cw = 9, ch = 11, c = document.createElement('canvas'); c.width = cw * 3; c.height = ch * 8;
  const g = c.getContext('2d'), tone = (k, a = 0) => `rgb(${P.grass.map((v, i) => clamp(v * k + (i === 1 ? a : 0), 0, 255) | 0).join(',')})`;
  const dot = (x, y, col, w = 1, h = 1) => { g.fillStyle = col; g.fillRect(x, y, w, h); };
  for (let pose = 0; pose < 3; pose++) {
    const lean = pose - 1, X = pose * cw;
    [[3, 8, 0], [5, 7, 1], [4, 6, 1]].forEach(([x, top, l], k) => { for (let y = top; y < ch; y++) dot(X + x + (y < 9 ? lean * l : 0), y, tone(.72 + k * .22)); });
    [[2, 3], [4, 1], [6, 4], [3, 5]].forEach(([x, top], k) => { for (let y = top; y < ch; y++) dot(X + x + (y < 6 ? lean : 0) + (y < 3 ? lean : 0), ch + y, tone(.7 + k * .17, 8)); });
    P.flowers.forEach((col, f) => {
      const r = 2 + f; const fx = X + 4 + lean, fy = r * ch + 3;
      for (let y = fy + 1; y < (r + 1) * ch; y++) dot(X + 4 + (y < fy + 4 ? lean : 0), y, tone(.78));
      dot(X + 5, (r + 1) * ch - 3, tone(1)); dot(X + 3, (r + 1) * ch - 2, tone(.9));
      dot(fx - 1, fy, col); dot(fx + 1, fy, col); dot(fx, fy - 1, col); dot(fx, fy + 1, col); dot(fx, fy, f === 0 ? '#ffc93c' : '#fff3c4');
    });
    for (const [dx, dy] of [[-3, 5], [-2, 4], [-1, 3], [3, 5], [2, 4], [1, 3], [0, 2], [-2, 6], [2, 6]]) dot(X + 4 + dx + (dy < 4 ? lean : 0), 7 * ch + dy + 1, tone(.85));
    for (let y = 3; y < ch; y++) dot(X + 4 + (y < 5 ? lean : 0), 7 * ch + y, tone(.66));
  }
  return { c, cw, ch };
}

export function createRenderer(canvas, world, land, images) {
  const ctx = canvas.getContext('2d'), cam = { x: 160, y: 530, z: 3.4, tx: 160, ty: 530, tz: 3.4 };
  let fogTick = 0, quality = 2, greeted = false, flyers = [], floaters = [], glows = [], W = 0, H = 0, dpr = 1, flora = floraAtlas(land.P), particles = [], rings = [], thenC = null, shown = null, critters = [], glints = [];
  const fog = document.createElement('canvas'); fog.width = CW; fog.height = CH;
  const fogG = fog.getContext('2d'), fogAlpha = ZONES.map(() => -1), revives = new Map(), rises = new Map(), baked = new Map(), floraDirty = new Uint8Array(world.flora.length).fill(1), fogSoft = document.createElement('canvas'), wisps = new Float32Array(CW * CH);
  fogSoft.width = CW; fogSoft.height = CH; const fogSoftG = fogSoft.getContext('2d');
  for (let i = 0; i < wisps.length; i++) wisps[i] = fbm((i % CW) / 11, Math.floor(i / CW) / 11, 91);
  const glintSpots = ZONES.map(z => { const out = [], p = world.ponds[z.id]; for (let k = 0; k < 26; k++) { const a = hash(k, z.id, 3) * 6.28, r = Math.sqrt(hash(k, z.id, 5)) * p.r * .8; out.push([p.x + Math.cos(a) * r, p.y + Math.sin(a) * r, hash(k, z.id, 7)]); } return out; });
  const padSpots = ZONES.map(z => { const p = world.ponds[z.id]; return [0, 1, 2, 3].map(k => [p.x + (hash(k, z.id, 11) - .5) * p.r * 1.2, p.y + (hash(k, z.id, 13) - .5) * p.r * 1.1, hash(k, z.id, 17)]); });

  function resize() {
    W = innerWidth; H = innerHeight; dpr = Math.min(quality > 1 ? 2 : 1, devicePixelRatio || 1, Math.sqrt(3.7e6 / (W * H)));
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  }
  addEventListener('resize', resize); resize();
  const minZoom = () => Math.max(W / TW, H / TH);
  const sx = x => (x - cam.x) * cam.z + W / 2, sy = y => (y - cam.y) * cam.z + H / 2;
  const clampCam = () => {
    const hw = W / 2 / cam.tz, hh = H / 2 / cam.tz;
    cam.tx = clamp(cam.tx, Math.min(hw, TW / 2), Math.max(TW - hw, TW / 2));
    cam.ty = clamp(cam.ty, Math.min(hh, TH / 2), Math.max(TH - hh, TH / 2));
  };
  function focusZone(z, snap = false) {
    cam.tx = ZONES[z].px; cam.ty = ZONES[z].py; cam.tz = clamp(Math.min((W - 40) / 340, (H - 200) / 230), minZoom(), 7);
    clampCam(); if (snap) { cam.x = cam.tx; cam.y = cam.ty; cam.z = cam.tz; }
  }
  function focusAll() { cam.tx = TW / 2; cam.ty = TH / 2; cam.tz = minZoom(); clampCam(); }
  function zoomAt(f, px = W / 2, py = H / 2) {
    const before = toWorld(px, py); cam.tz = cam.z = clamp(cam.tz * f, minZoom(), 9);
    const hw = (px - W / 2) / cam.z, hh = (py - H / 2) / cam.z;
    cam.tx = cam.x = before.x - hw; cam.ty = cam.y = before.y - hh; clampCam(); cam.x = cam.tx; cam.y = cam.ty;
  }
  function pan(dx, dy) { cam.tx -= dx / cam.z; cam.ty -= dy / cam.z; clampCam(); cam.x = cam.tx; cam.y = cam.ty; }
  function toWorld(px, py) { return { x: (px - W / 2) / cam.z + cam.x, y: (py - H / 2) / cam.z + cam.y }; }
  const toCell = (px, py) => { const p = toWorld(px, py); return { x: p.x / CELL, y: p.y / CELL }; };

  function updateFog(s) {
    if (++fogTick % 5 && fogAlpha[0] >= 0) return;
    let changed = false;
    s.zones.forEach((z, i) => { const want = z.open ? 0 : 1, cur = fogAlpha[i] < 0 ? want : fogAlpha[i], next = cur + clamp(want - cur, -.05, .05); if (next !== fogAlpha[i]) { fogAlpha[i] = next; changed = true; } });
    if (!changed) return;
    const im = fogG.createImageData(CW, CH), m = land.P.mist;
    for (let i = 0; i < world.zone.length; i++) {
      const a = fogAlpha[world.zone[i]]; if (!a) continue;
      const k = i * 4, wisp = wisps[i];
      im.data[k] = m[0]; im.data[k + 1] = m[1]; im.data[k + 2] = m[2]; im.data[k + 3] = a * (120 + wisp * 150);
    }
    fogG.putImageData(im, 0, 0);
    fogSoftG.clearRect(0, 0, CW, CH); fogSoftG.filter = 'blur(2px)'; fogSoftG.drawImage(fog, 0, 0); fogSoftG.filter = 'none';
  }
  function sprite(atlas, frame, x, y, w, h = w, flip = false, cols = 4) {
    const fx = frame % cols * SIZE, fy = Math.floor(frame / cols) * SIZE;
    if (flip) { ctx.save(); ctx.translate(x, 0); ctx.scale(-1, 1); ctx.drawImage(atlas, fx, fy, SIZE, SIZE, -w / 2, y - h, w, h); ctx.restore(); }
    else ctx.drawImage(atlas, fx, fy, SIZE, SIZE, x - w / 2, y - h, w, h);
  }
  function drawGround(canvasSource) {
    const vw = W / cam.z, vh = H / cam.z, x0 = cam.x - vw / 2, y0 = cam.y - vh / 2;
    ctx.drawImage(canvasSource, x0, y0, vw, vh, 0, 0, W, H);
  }
  function bakeChunk(index, s) {
    let b = baked.get(index);
    if (!b) { const c = document.createElement('canvas'); c.width = world.FC + 18; c.height = world.FC + 14; b = { c, g: c.getContext('2d') }; b.g.imageSmoothingEnabled = false; baked.set(index, b); }
    const { c: atlas, cw, ch } = flora, cx = index % world.floraCols * world.FC, cy = Math.floor(index / world.floraCols) * world.FC, f = shown || s.h;
    b.g.clearRect(0, 0, b.c.width, b.c.height); b.empty = true;
    for (const p of world.flora[index]) {
      const h = f[p.cell];
      if (h < p.thr || p.phase < LIVE_SHARE) continue;
      b.empty = false;
      const grow = Math.min(1, (h - p.thr) / .07 + .25), dh = Math.round(ch * grow);
      b.g.drawImage(atlas, cw, p.kind * ch, cw, ch, Math.round(p.x - cx + 9 - cw / 2), Math.round(p.y - cy + 14 - dh), cw, dh);
    }
  }
  // Most plants are baked into per-chunk images, so a full meadow costs a few draws rather than thousands.
  // A smaller share stays live to carry the wind.
  function drawFlora(s, time, dt) {
    const t = reduced || s.paused ? 0 : time / 1000, z = cam.z, { c, cw, ch } = flora, FC = world.FC, f = shown || s.h;
    const x0 = cam.x - W / 2 / z - 12, x1 = cam.x + W / 2 / z + 12, y0 = cam.y - H / 2 / z, y1 = cam.y + H / 2 / z + 14;
    const visible = [];
    for (let cy = Math.max(0, Math.floor(y0 / FC)); cy <= Math.min(world.floraRows - 1, Math.floor(y1 / FC)); cy++) for (let cx = Math.max(0, Math.floor(x0 / FC)); cx <= Math.min(world.floraCols - 1, Math.floor(x1 / FC)); cx++) visible.push(cy * world.floraCols + cx);
    const end = performance.now() + 2.5;
    for (const i of visible) if ((floraDirty[i] || !baked.has(i)) && (performance.now() < end || !baked.has(i))) { floraDirty[i] = 0; bakeChunk(i, s); }
    for (const i of visible) { const b = baked.get(i); if (!b.empty) ctx.drawImage(b.c, sx(i % world.floraCols * FC - 9), sy(Math.floor(i / world.floraCols) * FC - 14), b.c.width * z, b.c.height * z); }
    if (z < 1.7 || quality < 1) return;
    for (const i of visible) for (const p of world.flora[i]) {
      if (p.phase >= LIVE_SHARE) continue;
      const h = f[p.cell];
      if (h < p.thr) continue;
      const gust = Math.sin(t * 1.3 - p.x * .018 - p.y * .009) + Math.sin(t * 2.7 + p.phase * 18) * .25, pose = gust > .55 ? 2 : gust < -.75 ? 0 : 1, grow = Math.min(1, (h - p.thr) / .07 + .25), dw = cw * z, dh = ch * z * grow;
      ctx.drawImage(c, pose * cw, p.kind * ch, cw, ch, sx(p.x) - dw / 2, sy(p.y) - dh, dw, dh);
    }
  }
  function drawProps(s, time, dt, carry) {
    const items = [], z = cam.z, lx = cam.x - W / 2 / z - 70, hx = cam.x + W / 2 / z + 70, ly = cam.y - H / 2 / z - 10, hy = cam.y + H / 2 / z + 120;
    for (const o of world.objects) { const x = o.x * CELL, y = o.y * CELL; if (x > lx && x < hx && y > ly && y < hy) items.push({ y, o }); }
    for (const a of s.spirits) if (a !== carry) items.push({ y: (a.ry ?? a.y) * CELL, a });
    const night = clamp((Math.cos((s.age / 480) % 1 * 6.283) * -1 - .35) / .65, 0, 1) > .4;
    for (const c of critters) if (PETS[c.kind]) { if (!s.paused) stepPet(s, c, dt, night); const x = c.x, y = c.y; if (x > lx && x < hx && y > ly && y < hy) items.push({ y, c }); }
    for (const t of s.trees) { const y = t.y * CELL; if (t.x * CELL > lx && t.x * CELL < hx && y > ly && y < hy) items.push({ y, t }); }
    items.sort((a, b) => a.y - b.y);
    const atlas = images.world, spirits = images.spirits, tNow = time / 1000;
    const art = (o, frame, x, y, w, h = w) => o.mark ? ctx.drawImage(images.landmarks, frame % 4 * 96, Math.floor(frame / 4) * 96, 96, 96, x - w / 2, y - h, w, h) : sprite(atlas, frame, x, y, w, h);
    for (const it of items) {
      if (it.o) {
        const o = it.o, x = sx(o.x * CELL), y = sy(o.y * CELL), hp = s.objHp ? s.objHp[o.id] : o.hp, size = o.size * z, born = revives.get(o.id);
        ctx.fillStyle = 'rgba(30,24,18,.22)'; ctx.beginPath(); ctx.ellipse(x, y - z, size * .34, size * .1, 0, 0, 7); ctx.fill();
        if (hp > 0) {
          art(o, o.dead, x, y, size);
          const goal = 1 - hp / o.hp, was = rises.get(o.id) || 0, rise = was + (goal - was) * Math.min(1, dt * 10);
          if (goal > 0) { // Life climbs through the object from the ground up, like a tide of colour.
            rises.set(o.id, rise);
            const edge = y - size * rise;
            ctx.save(); ctx.beginPath(); ctx.rect(x - size, edge, size * 2, y - edge + z); ctx.clip(); art(o, o.live, x, y, size); ctx.restore();
            if (rise > was + .002 && Math.random() < .55) addParticle({ x: o.x * CELL + (Math.random() - .5) * o.size * .55, y: o.y * CELL - o.size * rise, vx: (Math.random() - .5) * 5, vy: -9 - Math.random() * 12, g: 2, life: .6 + Math.random() * .5, age: 0, size: .9, color: ['#fff2ab', '#d8f58f', '#fff'][Math.floor(Math.random() * 3)] });
          }
        } else {
          let k = 1;
          if (born !== undefined) { const a = (time - born) / 620; if (a < 1) k = 1 + Math.sin(a * Math.PI) * .22 * (1 - a) + (a < .25 ? (a / .25 - 1) * .55 : 0); else revives.delete(o.id); }
          const sway = o.size > 26 && !o.mark && !reduced ? Math.sin(tNow * 1.3 - o.x * .07) * .02 : 0;
          ctx.save(); ctx.translate(x, y); ctx.transform(1, 0, sway, 1, 0, 0); art(o, o.live, 0, 0, size * (2 - k) ** .4, size * k); ctx.restore();
          if (o.live === 11 && !o.mark && !reduced) { const b = .5 + Math.sin(tNow * 2 + o.x) * .5; ctx.globalAlpha = .18 + b * .2; ctx.fillStyle = '#b8ffe6'; ctx.beginPath(); ctx.arc(x, y - size * .55, size * .32, 0, 7); ctx.fill(); ctx.globalAlpha = 1; }
        }
      } else if (it.t) {
        const t = it.t, g = Math.min(1, (s.age - t.born) / 9), x = sx(t.x * CELL), y = sy(t.y * CELL), size = (10 + 28 * g) * z;
        ctx.fillStyle = 'rgba(30,24,18,.2)'; ctx.beginPath(); ctx.ellipse(x, y - z, size * .3, size * .09, 0, 0, 7); ctx.fill();
        sprite(atlas, t.blossom ? 2 : 1, x, y, size);
      } else if (it.c) { drawPet(it.c, tNow);
      } else {
        const a = it.a, k = 1 - Math.exp(-dt * 11);
        a.rx ??= a.x; a.ry ??= a.y;
        const mx = (a.x - a.rx) * k, my = (a.y - a.ry) * k, walking = Math.hypot(mx, my) > dt * .25 && !a.working && !(a.nap > 0);
        a.rx += mx; a.ry += my;
        if (walking && !s.paused) a.anim = (a.anim || 0) + dt;
        const x = sx(a.rx * CELL), y = sy(a.ry * CELL), still = reduced || s.paused;
        // One pose squashing and stretching in a hop: smooth at any frame rate, with no sprite popping.
        const hop = walking && !still ? Math.abs(Math.sin((a.anim || 0) * 8)) : 0, q = still ? 0 : walking ? (hop - .45) * .13 : a.working ? Math.sin(tNow * 5 + a.x) * .05 : Math.sin(tNow * 2 + a.x) * .018;
        const frame = still ? 0 : a.nap > 0 ? 1 : a.working ? 3 : 0, float = a.type === 2 ? 3 + Math.sin(tNow * 2 + a.x) : 0, size = (a.type === 3 ? 20 : 15) * z;
        ctx.fillStyle = 'rgba(30,24,18,.28)'; ctx.beginPath(); ctx.ellipse(x, y, size * (.28 - hop * .06), size * .09, 0, 0, 7); ctx.fill();
        sprite(spirits, a.type * 4 + frame, x, y - (float + hop * 2.4) * z, size * (1 - q), size * (1 + q), a.dir < 0);
        if (a.type === 2 && !s.paused && !reduced && quality > 0) { // Rainwisps carry their own little weather.
          const r = SPIRITS[2].r * CELL * z * .75; ctx.fillStyle = 'rgba(170,220,255,.7)';
          for (let n = 0; n < 7; n++) { const q2 = (tNow * 1.5 + n * .37) % 1, px = x + (hash(n, 1, 8) - .5) * r * 2, py = y - z * 2 + (hash(n, 2, 8) - .5) * r - (1 - q2) * 18 * z; ctx.fillRect(px, py, Math.max(1, z * .5), z * 2); }
        }
      }
    }
  }
  function drawWater(s, time) {
    if (reduced) return;
    const t = time / 1000, z = cam.z;
    s.zones.forEach((st, id) => {
      if (st.water < .7) return;
      const fill = (st.water - .7) / .3;
      for (const [x, y, ph] of glintSpots[id]) { const b = Math.sin(t * 1.4 + ph * 40); if (b < .55) continue; ctx.fillStyle = `rgba(255,255,255,${(b - .55) * 1.3 * fill})`; ctx.fillRect(sx(x + Math.sin(t * .4 + ph * 9) * 2), sy(y), z * 3, z); }
      if (st.water >= 1) for (const [x, y, ph] of padSpots[id]) { ctx.fillStyle = '#4f9c5a'; ctx.fillRect(sx(x), sy(y), z * 3, z * 2); if (ph > .5) { ctx.fillStyle = '#ffc6dd'; ctx.fillRect(sx(x + 1), sy(y), z, z); } }
      const path = world.streams[id];
      for (let k = 0; k < 16; k++) { const q = ((t * .06 + k / 16) % 1) * .7; if (q > st.water) continue; const p = path[Math.floor(q / .7 * (path.length - 1))]; ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(sx(p[0]), sy(p[1]), z * 2, z); }
    });
  }
  // Wildlife arrives as the land heals. Butterflies and birds pass through; pets stay and graze.
  function spawnCritters(s) {
    const want = [];
    s.zones.forEach((z, id) => {
      if (!z.open) return;
      const p = z.g / (GREEN * world.count[id]);
      if (p > .25) want.push(['butterfly', id, 0], ['butterfly', id, 1]);
      if (p > .5) want.push(['rabbit', id, 4]);
      if (p > .6) want.push(['butterfly', id, 2], ['bird', id, 3]);
      if (z.done) want.push(['deer', id, 7], ['rabbit', id, 5], ['bird', id, 6]);
      if (z.bloomed) want.push(['fawn', id, 8], ['rabbit', id, 9], ['butterfly', id, 10]);
    });
    if (critters.length === want.length) return;
    const first = !critters.length && !greeted;
    critters = want.map(([kind, zone, n]) => {
      const old = critters.find(c => c.zone === zone && c.n === n);
      if (old) return old;
      const P = ZONES[zone], side = hash(zone, n, 35) * 6.28, far = PETS[kind] ? 150 : 0;
      const c = { kind, zone, n, x: P.px + Math.cos(side) * far + (hash(zone, n, 31) - .5) * 120, y: P.py + Math.sin(side) * far * .7 + (hash(n, zone, 33) - .5) * 90, tx: 0, ty: 0, pause: 0, dir: 1, variant: n % 3, alpha: first ? 1 : 0, state: 'walk', step: 0, hearts: 0, seen: hash(zone, n, 39) * 5 };
      if (PETS[kind] && !first) api.onPet?.(PETS[kind].label, zone);
      return c;
    });
    greeted = true;
  }
  function petTarget(s, c) {
    const P = ZONES[c.zone], list = world.cellsOf[c.zone];
    for (let k = 0; k < 12; k++) {
      const i = list[Math.floor(Math.random() * list.length)];
      if (s.h[i] >= .5) { const x = i % CW * CELL, y = Math.floor(i / CW) * CELL; if (Math.hypot(x - c.x, y - c.y) < 150 || k > 8) { c.tx = x; c.ty = y; return; } }
    }
    c.tx = P.px; c.ty = P.py;
  }
  function stepPet(s, c, dt, night) {
    const def = PETS[c.kind];
    c.alpha = Math.min(1, c.alpha + dt * .5);
    if (c.hearts > 0) { c.hearts -= dt; c.state = 'idle'; return; }
    if (c.pause > 0) {
      c.pause -= dt;
      if (c.pause <= 0) c.state = 'walk';
      return;
    }
    if (!c.tx) petTarget(s, c);
    const d = Math.hypot(c.tx - c.x, c.ty - c.y);
    if (d < 1.5) {
      c.tx = 0; const r = Math.random();
      c.state = night && r < .6 ? 'sleep' : r < .68 ? 'idle' : 'graze';
      c.pause = c.state === 'sleep' ? 25 + Math.random() * 30 : c.state === 'graze' ? 4 + Math.random() * 7 : 2 + Math.random() * 3;
      return;
    }
    c.step += dt; c.dir = c.tx < c.x ? -1 : 1;
    const v = Math.min(d, def.speed * dt);
    c.x += (c.tx - c.x) / d * v; c.y += (c.ty - c.y) / d * v;
  }
  function drawPet(c, t) {
    const def = PETS[c.kind], z = cam.z, x = sx(c.x), y = sy(c.y), hopping = c.state === 'walk' && c.kind === 'rabbit', hop = hopping ? Math.abs(Math.sin(c.step * 5)) : 0;
    const frame = c.state === 'sleep' ? 3 : c.state === 'graze' ? 2 : c.state === 'idle' ? 0 : c.kind === 'rabbit' ? (hop > .25 ? 1 : 0) : (Math.sin(c.step * 4.5) > 0 ? 1 : 0);
    const breath = c.state === 'walk' || reduced ? 0 : Math.sin(t * 1.8 + c.n) * .012, size = def.size * z, lift = hop * 3 * z, walkBob = c.state === 'walk' && c.kind !== 'rabbit' ? Math.abs(Math.sin(c.step * 4.5)) * .5 * z : 0;
    ctx.globalAlpha = c.alpha;
    ctx.fillStyle = 'rgba(30,24,18,.24)'; ctx.beginPath(); ctx.ellipse(x, y, size * .3, size * .08, 0, 0, 7); ctx.fill();
    ctx.save(); ctx.translate(x, y - lift - walkBob); if (c.dir < 0) ctx.scale(-1, 1);
    ctx.drawImage(images.pets, frame * 96, def.row * 96, 96, 96, -size / 2, -size * (1 + breath), size, size * (1 + breath));
    ctx.restore();
    if (def.row === 0 && !reduced && quality > 0) { // Spirit deer shed slow motes of light.
      for (let k = 0; k < 3; k++) { const q = (t * .22 + k / 3 + c.n * .13) % 1; ctx.globalAlpha = c.alpha * Math.sin(q * 3.14) * .85; ctx.fillStyle = '#b8fff0'; ctx.fillRect(x + (hash(k, c.n, 41) - .5) * size * .8 + Math.sin(t + k) * z, y - size * (.35 + q * .85), Math.max(1, z * .7), Math.max(1, z * .7)); }
    }
    ctx.globalAlpha = 1;
    if (c.hearts > 0) { const a = 1 - c.hearts / 1.6; for (let k = 0; k < 3; k++) { const q = Math.max(0, a * 1.6 - k * .2); if (q > 0 && q < 1) { ctx.globalAlpha = 1 - q; ctx.drawImage(HEART, x + (k - 1) * 4 * z + Math.sin(q * 6 + k) * z, y - size * .9 - q * 14 * z, 5 * z, 5 * z); } } ctx.globalAlpha = 1; }
  }
  function drawCritters(s, time, dt) {
    if (reduced && s.paused) return;
    const t = time / 1000, z = cam.z;
    for (const c of critters) {
      if (PETS[c.kind]) continue;
      c.pause -= dt;
      const speed = c.kind === 'bird' ? 34 : 9;
      const P = ZONES[c.zone], d = Math.hypot(c.tx - c.x, c.ty - c.y);
      if (d < 2 || !c.tx) { c.tx = P.px + (Math.random() - .5) * 240; c.ty = P.py + (Math.random() - .5) * 150; }
      else { c.x += (c.tx - c.x) / d * speed * dt; c.y += (c.ty - c.y) / d * speed * dt; c.dir = c.tx < c.x ? -1 : 1; }
      const x = sx(c.x), y = sy(c.y);
      if (x < -60 || y < -60 || x > W + 60 || y > H + 60) continue;
      const im = c.kind === 'butterfly' ? CRITTERS.butterfly[c.variant][Math.sin(t * 11 + c.n) > 0 ? 1 : 0] : CRITTERS.bird[Math.sin(t * 9 + c.n) > 0 ? 1 : 0], lift = c.kind === 'bird' ? 26 : 7 + Math.sin(t * 2 + c.n) * 3, w = im.width * z, h = im.height * z;
      ctx.fillStyle = 'rgba(30,24,18,.12)'; ctx.fillRect(x - w / 3, y, w * .66, z);
      ctx.drawImage(im, x - w / 2, y - lift * z - h, w, h);
    }
  }
  function addParticle(p) { if (!reduced && particles.length < 340) particles.push(p); }
  function burst(x, y, n, colors, power = 22) {
    for (let k = 0; k < n; k++) { const a = Math.random() * 6.28, v = power * (.35 + Math.random() * .65); addParticle({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 12, g: 26, life: .8 + Math.random() * .7, age: 0, size: 1 + Math.random() * 1.1, color: colors[k % colors.length] }); }
  }
  function drawParticles(dt) {
    const z = cam.z;
    for (const p of particles) {
      p.age += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += p.g * dt;
      ctx.globalAlpha = Math.max(0, 1 - (p.age / p.life) ** 2); ctx.fillStyle = p.color;
      ctx.fillRect(sx(p.x), sy(p.y), p.size * z, p.size * z);
    }
    ctx.globalAlpha = 1; particles = particles.filter(p => p.age < p.life);
    for (const r of rings) {
      r.age += dt; const k = r.age / r.life, rad = r.from + (r.to - r.from) * (1 - (1 - k) ** 2);
      ctx.globalAlpha = (1 - k) * .55; ctx.strokeStyle = r.color; ctx.lineWidth = Math.max(2, (8 * (1 - k) + 1) * z);
      ctx.beginPath(); ctx.arc(sx(r.x), sy(r.y), rad * z, 0, 7); ctx.stroke();
    }
    ctx.globalAlpha = 1; rings = rings.filter(r => r.age < r.life);
    if (glows.length) {
      ctx.globalCompositeOperation = 'lighter';
      for (const g of glows) {
        g.age += dt; const k = g.age / g.life, rad = (70 + 230 * k) * z, x = sx(g.x), y = sy(g.y), fill = ctx.createRadialGradient(x, y, 0, x, y, rad);
        fill.addColorStop(0, `rgba(${g.color},${.36 * (1 - k)})`); fill.addColorStop(1, `rgba(${g.color},0)`);
        ctx.fillStyle = fill; ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
      }
      ctx.globalCompositeOperation = 'source-over'; glows = glows.filter(g => g.age < g.life);
    }
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '600 ' + Math.round(clamp(z * 7, 17, 30)) + 'px "Pixelify Sans",Georgia,serif';
    for (const f of floaters) { f.age += dt; const k = f.age / 1.3; ctx.globalAlpha = Math.min(1, (1 - k) * 2); ctx.fillStyle = '#2a2017'; ctx.fillText(f.text, sx(f.x) + 1, sy(f.y) - k * 26 * z + 2); ctx.fillStyle = '#ffe28a'; ctx.fillText(f.text, sx(f.x), sy(f.y) - k * 26 * z); }
    ctx.globalAlpha = 1; floaters = floaters.filter(f => f.age < 1.3);
    for (const f of flyers) { f.age += dt; if (f.age < 0) continue; const k = Math.min(1, f.age / f.life), e = k * k * (3 - 2 * k), s = 24 - k * 8; ctx.drawImage(images.world, 64, 192, 64, 64, f.x + (34 - f.x) * e - s / 2, f.y + (32 - f.y) * e - Math.sin(k * 3.14) * 46 - s / 2, s, s); }
    flyers = flyers.filter(f => f.age < f.life);
  }
  // Light across the day. A full cycle is about eight minutes, and nights keep their fireflies.
  function drawLight(s, time) {
    const day = (s.age / 480) % 1, night = clamp((Math.cos(day * 6.283) * -1 - .35) / .65, 0, 1), dusk = clamp(1 - Math.abs(Math.cos(day * 6.283) + .35) * 3.2, 0, 1) * .8;
    ctx.globalCompositeOperation = 'multiply';
    if (night > 0) { ctx.fillStyle = `rgba(${150 - night * 40},${150 - night * 22},${200},${night * .55})`; ctx.fillRect(0, 0, W, H); }
    if (dusk > 0) { ctx.fillStyle = `rgba(255,190,130,${dusk * .55})`; ctx.fillRect(0, 0, W, H); }
    ctx.globalCompositeOperation = 'source-over';
    if (night > .15 && !reduced && quality > 0) {
      const t = time / 1000;
      for (let k = 0; k < 70; k++) {
        const fx = hash(k, 1, 77) * TW + Math.sin(t * .3 + k) * 14, fy = hash(k, 2, 77) * TH + Math.cos(t * .23 + k * 2) * 10;
        const c = Math.floor(fy / CELL) * CW + Math.floor(fx / CELL);
        if (c < 0 || c >= s.h.length || s.h[c] < .5) continue;
        const b = Math.sin(t * 1.7 + k * 3); if (b < .25) continue;
        const x = sx(fx), y = sy(fy);
        ctx.globalAlpha = night * (b - .25) * .4; ctx.fillStyle = '#e7ff8c'; ctx.beginPath(); ctx.arc(x, y, cam.z * 3, 0, 7); ctx.fill();
        ctx.globalAlpha = night * b; ctx.fillRect(x, y, cam.z, cam.z); ctx.globalAlpha = 1;
      }
    }
  }
  function drawLabels(s) {
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ZONES.forEach((z, i) => {
      if (fogAlpha[i] < .5) return;
      const x = sx(z.px), y = sy(z.py); if (x < -120 || y < -40 || x > W + 120 || y > H + 40) return;
      ctx.globalAlpha = fogAlpha[i] * .85; ctx.fillStyle = '#4b4438'; ctx.font = '600 ' + Math.round(clamp(cam.z * 7, 15, 30)) + 'px "Pixelify Sans",Georgia,serif'; ctx.fillText(z.name, x, y);
      const openable = z.adj.some(n => s.zones[n].open);
      if (openable) { ctx.font = Math.round(clamp(cam.z * 4, 11, 16)) + 'px "Pixelify Sans",Georgia,serif'; ctx.fillText('wakes when its neighbor is restored', x, y + clamp(cam.z * 7, 16, 30)); }
      ctx.globalAlpha = 1;
    });
  }
  const api = {
    onPet: null,
    floraCell(i) { floraDirty[Math.floor(Math.floor(i / CW) * CELL / world.FC) * world.floraCols + Math.floor(i % CW * CELL / world.FC)] = 1; },
    allFlora() { floraDirty.fill(1); },
    get quality() { return quality; },
    setQuality(q) { quality = q; resize(); },
    hitPet(px, py) { for (const c of critters) { const d = PETS[c.kind]; if (!d) continue; const size = d.size * cam.z, x = sx(c.x), y = sy(c.y); if (Math.abs(px - x) < Math.max(16, size * .45) && py > y - Math.max(24, size) && py < y + 8) return c; } return null; },
    pet(c) { c.hearts = 1.6; c.dir = c.dir || 1; },
    cam, resize, focusZone, focusAll, zoomAt, pan, toCell, toWorld,
    screenOf(x, y) { return { x: sx(x), y: sy(y) }; },
    setShown(f) { shown = f; floraDirty.fill(1); },
    reward(x, y, amount, fly = 6) { // World position. A number rises and seeds fly home to the counter.
      if (reduced) return;
      floaters.push({ x, y, text: '+' + (amount >= 1e4 ? (amount / 1e3).toFixed(1) + 'k' : Math.round(amount)), age: 0 });
      const from = { x: sx(x), y: sy(y) };
      for (let k = 0; k < fly && flyers.length < 40; k++) flyers.push({ x: from.x + (Math.random() - .5) * 26, y: from.y + (Math.random() - .5) * 26, age: -k * .05, life: .75 });
    },
    glow(z, color = '255,236,170') { const p = world.ponds[z]; glows.push({ x: p.x, y: p.y, age: 0, life: 3.4, color }); },
    pop(cellX, cellY) { burst(cellX * CELL, cellY * CELL - 6, 18, ['#fff', '#d8f58f', '#ffe28a'], 26); rings.push({ x: cellX * CELL, y: cellY * CELL - 6, from: 2, to: 18, age: 0, life: .5, color: '#fff3b8' }); },
    revived(o, time) { revives.set(o.id, time); const x = o.x * CELL, y = o.y * CELL - o.size * .4; burst(x, y, 12 + o.size * .5 | 0, ['#c9f07a', '#ffe28a', '#fff', '#8ad05a'], 30); rings.push({ x, y: y + o.size * .3, from: 4, to: 16 + o.size * .5, age: 0, life: .6, color: '#fff3b8' }); },
    sweep(z, color = '#fff3c4') { const p = world.ponds[z]; rings.push({ x: p.x, y: p.y, from: 8, to: 220, age: 0, life: 4.2, color }); burst(p.x, p.y, 70, ['#fff', '#ffe28a', '#c9f07a', '#ffc6dd'], 58); },
    spark(cellX, cellY, amount, r) { const n = Math.min(4, amount * .28); for (let k = 0; k < n; k++) { if (Math.random() > n / 4 + .2) continue; const a = Math.random() * 6.28, q = Math.random() * r * CELL; addParticle({ x: cellX * CELL + Math.cos(a) * q, y: cellY * CELL + Math.sin(a) * q, vx: (Math.random() - .5) * 8, vy: -8 - Math.random() * 16, g: 3, life: .55 + Math.random() * .6, age: 0, size: .8 + Math.random() * .6, color: ['#d8f58f', '#fff2ab', '#9ddc6a'][k % 3] }); } },
    hitSpirit(s, px, py) { for (let i = s.spirits.length - 1; i >= 0; i--) { const a = s.spirits[i], size = (a.type === 3 ? 20 : 15) * cam.z, x = sx((a.rx ?? a.x) * CELL), y = sy((a.ry ?? a.y) * CELL); if (Math.abs(px - x) < Math.max(14, size * .4) && py > y - size && py < y + 6) return a; } return null; },
    draw(s, time, dt, opts) {
      if (cam.x !== cam.tx || cam.y !== cam.ty || cam.z !== cam.tz) { const k = 1 - Math.exp(-dt * (opts.camSpeed || 3.2)); cam.x += (cam.tx - cam.x) * k; cam.y += (cam.ty - cam.y) * k; cam.z += (cam.tz - cam.z) * k; if (Math.abs(cam.x - cam.tx) + Math.abs(cam.y - cam.ty) + Math.abs(cam.z - cam.tz) < .004) { cam.x = cam.tx; cam.y = cam.ty; cam.z = cam.tz; } }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.imageSmoothingEnabled = false;
      updateFog(s); spawnCritters(s);
      drawGround(land.canvas); drawWater(s, time); drawFlora(s, time, dt); drawProps(s, time, dt, opts.carry); drawCritters(s, time, dt); drawLight(s, time);
      drawParticles(dt);
      if (fogAlpha.some(a => a > 0)) { ctx.imageSmoothingEnabled = true; const drift = reduced || quality < 1 ? 0 : Math.sin(time * .00016) * 7 * cam.z; ctx.globalAlpha = .72; ctx.drawImage(fogSoft, 0, 0, CW, CH, sx(0), sy(0), TW * cam.z, TH * cam.z); ctx.globalAlpha = quality > 1 ? .5 : .35; if (quality > 1) ctx.drawImage(fogSoft, 0, 0, CW, CH, sx(0) + drift, sy(0) - drift * .5, TW * cam.z, TH * cam.z); ctx.globalAlpha = 1; ctx.imageSmoothingEnabled = false; }
      drawLabels(s);
      if (opts.then !== null && opts.then !== undefined) {
        thenC ||= land.makeThen();
        ctx.save(); ctx.beginPath(); ctx.rect(0, 0, opts.then, H); ctx.clip(); drawGround(thenC);
        for (const o of world.objects) { const x = sx(o.x * CELL), y = sy(o.y * CELL); if (x > -160 && x < W + 160 && y > -40 && y < H + 300) { if (o.mark) ctx.drawImage(images.landmarks, o.dead % 4 * 96, Math.floor(o.dead / 4) * 96, 96, 96, x - o.size * cam.z / 2, y - o.size * cam.z, o.size * cam.z, o.size * cam.z); else sprite(images.world, o.dead, x, y, o.size * cam.z); } }
        ctx.fillStyle = 'rgba(58,52,44,.12)'; ctx.fillRect(0, 0, W, H); ctx.restore();
        ctx.fillStyle = '#fff6df'; ctx.fillRect(opts.then - 2, 0, 4, H);
        ctx.beginPath(); ctx.arc(opts.then, H / 2, 20, 0, 7); ctx.fill(); ctx.fillStyle = '#4b4438'; ctx.font = '600 16px "Pixelify Sans",Georgia,serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('< >', opts.then, H / 2 + 1);
        ctx.font = '600 22px "Pixelify Sans",Georgia,serif'; ctx.fillStyle = '#fff6df'; ctx.shadowColor = '#0009'; ctx.shadowBlur = 5; ctx.fillText('Then', Math.max(46, opts.then - 54), H / 2 - 44); ctx.fillText('Now', Math.min(W - 46, opts.then + 54), H / 2 - 44); ctx.shadowBlur = 0;
      }
      if (opts.pointer && opts.then == null) {
        const r = brushRadius(s) * CELL * cam.z, b = opts.holding ? .22 + Math.sin(time * .012) * .04 : .08;
        ctx.fillStyle = `rgba(255,236,170,${b})`; ctx.beginPath(); ctx.arc(opts.pointer.x, opts.pointer.y, r, 0, 7); ctx.fill();
        ctx.strokeStyle = `rgba(255,246,214,${opts.holding ? .85 : .5})`; ctx.lineWidth = 2; ctx.setLineDash([5, 6]); ctx.lineDashOffset = -time * .02; ctx.stroke(); ctx.setLineDash([]);
      }
      if (opts.carry) {
        const a = opts.carry, size = (a.type === 3 ? 24 : 19) * cam.z, wiggle = reduced ? 0 : Math.sin(time * .02) * .14;
        ctx.save(); ctx.translate(a.px, a.py + 4); ctx.rotate(wiggle); sprite(images.spirits, 16 + a.type * 4 + (reduced ? 0 : Math.floor(time / 110) % 4), 0, size, size); ctx.restore();
      }
    },
    snapshot(thenSide, width = 480) { // A small postcard of the whole valley.
      const h = Math.round(width * TH / TW), c = document.createElement('canvas'); c.width = width; c.height = h;
      const g = c.getContext('2d'); g.imageSmoothingEnabled = true; thenC ||= land.makeThen(); g.drawImage(thenSide ? thenC : land.canvas, 0, 0, width, h);
      return c.toDataURL('image/jpeg', .72);
    },
  };
  return api;
}
