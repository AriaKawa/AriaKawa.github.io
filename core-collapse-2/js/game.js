// CORE COLLAPSE II — main game: physics, campaign, abilities, rendering and UI.
import { ELEMENTS, FE, NEUTRON, DARK, CFG, starFor, MOD_INFO, BOONS } from './data.js';
import { Audio } from './audio.js';
import { Background } from './background.js';
import { Sprites } from './sprites.js';

const $ = (id) => document.getElementById(id);
const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeOut = (t) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const fmt = (n) => Math.round(n).toLocaleString('en-US');
const rgb = (a) => `rgb(${a.map((v) => Math.round(clamp(v, 0, 1) * 255)).join(',')})`;
const rgbHex = (a) => '#' + a.map((v) => Math.round(clamp(v, 0, 1) * 255).toString(16).padStart(2, '0')).join('');
const angDiff = (a, b) => { let d = (a - b) % TAU; if (d > Math.PI) d -= TAU; if (d < -Math.PI) d += TAU; return d; };

const store = {
  get(k, d) { try { const v = localStorage.getItem('cc2.' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('cc2.' + k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
};

const WORLD_EXTENT = 334;   // world radius that must fit on screen during play
const COMP_RX = 470, COMP_RY = 345; // binary companion orbit (elliptical so it stays in view)
const STEP = 1 / 120;

const info = (k) => (k === 'n' ? NEUTRON : k === 'd' ? DARK : ELEMENTS[k]);

class Game {
  constructor() {
    this.bgCanvas = $('bg');
    this.cv = $('fg');
    this.g = this.cv.getContext('2d');
    this.bg = new Background(this.bgCanvas);
    this.sprites = new Sprites();
    this.audio = new Audio();

    this.settings = Object.assign({ music: 0.55, sfx: 0.8, shake: true, reducedFlash: false, quality: 'med', mute: false }, store.get('settings', {}));
    this.audio.musicVol = this.settings.music; this.audio.sfxVol = this.settings.sfx; this.audio.muted = this.settings.mute;
    this.records = Object.assign({ best: 0, furthest: 0, novae: 0 }, store.get('records', {}));
    this.tutorialDone = store.get('tutorial', false);

    this.state = 'title';
    this.time = 0; this.rtime = 0;
    this.bodies = []; this.particles = []; this.shocks = []; this.texts = [];
    this.trauma = 0; this.flash = 0; this.hitstop = 0; this.zoom = 0;
    this.aim = -Math.PI / 2; this.keyAim = 0;
    this.pointer = { x: 0, y: 0, down: false, touch: false };
    this.acc = 0;
    this.heat = 0;
    this.star = starFor(0);
    this.dangerR = CFG.dangerR;
    this.core = { r: CFG.coreR0, iron: 0, pulse: 0 };
    this.uiCache = {};
    this.demo = this.makeDemo();
    this.nova = 0; this.implode = 0; this.eject = 0; this.flareFx = 0; this.warnFx = 0;
    this.frameTimes = []; this.autoQualityChecked = false;
    this.nextId = 1;
    this.lastFrame = performance.now();

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.bindInput();
    this.bindUI();
    this.applySettingsUI();
    this.renderRecords();
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { this.buildSprites(); this.buildIcons(); });
    this.buildSprites();
    requestAnimationFrame((t) => this.loop(t));
  }

  // ======================================================================
  // layout
  // ======================================================================
  resize() {
    const W = window.innerWidth, H = window.innerHeight;
    this.W = W; this.H = H;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.cv.width = Math.round(W * this.dpr); this.cv.height = Math.round(H * this.dpr);
    this.bg.resize(W, H, this.settings.quality);
    const landscape = W / H >= 1.25;
    let avail;
    if (landscape) avail = Math.min(H - 20, W - 2 * (W > 1100 ? 240 : 225));
    else avail = Math.min(W - 6, H - 2 * 112);
    avail = Math.max(avail, Math.min(W, H) * 0.7);
    if (this.coverMode) avail = H * 1.08;
    this.playScale = avail / 2 / WORLD_EXTENT;
    this.playCx = W / 2; this.playCy = landscape ? H / 2 : H / 2 + 6;
    this.landscape = landscape;
    if (this.cx == null) { this.cx = this.state === 'title' ? this.titleCx() : this.playCx; this.cy = this.playCy; }
    this.scale = this.state === 'title' ? this.titleScale() : this.playScale;
    if (this.sprites.orbs.length && Math.abs(this.sprites.px - this.scale * this.dpr * 1.15) > 0.05) this.buildSprites();
  }
  titleScale() { return this.landscape ? Math.min(this.H * 0.52, this.W * 0.31) / WORLD_EXTENT : Math.min(this.W, this.H) * 0.42 / WORLD_EXTENT; }
  titleCx() { return this.landscape ? this.W * 0.67 : this.W / 2; }
  buildSprites() { this.sprites.build(this.playScale * this.dpr * 1.15); }
  buildIcons() {
    this.icons = {};
    for (let i = 0; i < ELEMENTS.length; i++) this.icons[i] = this.sprites.icon(i, 96);
    this.icons.n = this.sprites.icon('n', 96);
    this.icons.d = this.sprites.icon('d', 96);
    const lad = $('ladder');
    lad.innerHTML = ELEMENTS.map((e, i) => `<div data-t="${i}"><img src="${this.icons[i]}" alt="">${e.sym}</div>`).join('');
    this.uiCache = {};
  }

  // ======================================================================
  // run / star lifecycle
  // ======================================================================
  newRun() {
    this.audio.init();
    this.score = 0; this.shownScore = 0;
    this.starIndex = 0;
    this.boons = {};
    this.phoenixUsed = false;
    this.flareMeter = 0;
    this.stats = { fusions: 0, bestChain: 0, topTier: 0, novae: 0, started: performance.now() };
    this.seenTiers = new Set([0]);
    this.holds = [];
    this.tut = this.tutorialDone ? 99 : 0; this.tutT = 0;
    this.startStar(0);
  }
  boon(id) { return (this.boons && this.boons[id]) || 0; }

  startStar(i) {
    this.starIndex = i;
    this.star = starFor(i);
    this.dangerR = CFG.dangerR - Math.min(30, Math.max(0, i - 1) * 5);
    this.bodies = [];
    this.core = { r: CFG.coreR0, iron: 0, pulse: 0 };
    this.queue = [];
    this.streakKind = null; this.streak = 0;
    this.current = this.rollKind(true);
    this.fillQueue();
    this.holdUsed = false;
    this.cooldown = 0;
    this.combo = 0; this.lastMergeT = -10;
    this.darkTimer = 14 + Math.random() * 8;
    this.flareEvent = { next: 16 + Math.random() * 6, warn: 0, active: 0, ang: 0 };
    this.compAng = Math.random() * TAU;
    this.novaTriggered = false;
    this.formT = 0;
    this.state = 'forming';
    this.time = 0;
    this.nova0 = this.nova;
    this.scale = this.playScale;
    document.documentElement.style.setProperty('--star1', rgbHex(this.star.hue));
    this.showIntro();
    this.uiCache = {};
    this.showHUD(true);
  }

  fillQueue() {
    const n = 1 + Math.min(2, this.boon('foresight')) + 1;
    while (this.queue.length < n) this.queue.push(this.rollKind());
  }
  rollKind(first) {
    const st = this.star;
    if (!first && st.mods.includes('neutron') && Math.random() < 0.045 * (1 + this.boon('neutron'))) return 'n';
    const w = st.weights;
    for (let tries = 0; tries < 6; tries++) {
      let total = w.reduce((a, b) => a + b, 0), r = Math.random() * total, k = 0;
      for (; k < w.length; k++) { r -= w[k]; if (r <= 0) break; }
      k = Math.min(k, w.length - 1);
      if (k === this.streakKind && this.streak >= 2) continue;
      if (k === this.streakKind) this.streak++; else { this.streakKind = k; this.streak = 1; }
      return k;
    }
    return 0;
  }

  // ======================================================================
  // bodies
  // ======================================================================
  radiusOf(kind) { return info(kind).radius * (1 - 0.07 * this.boon('compress')); }
  makeBody(kind, x, y, vx = 0, vy = 0) {
    const r = this.radiusOf(kind);
    return {
      id: this.nextId++, kind, x, y, vx, vy, r, tr: r, m: kind === 'd' ? r * r * 3 : r * r,
      angle: Math.random() * TAU, spin: (Math.random() - 0.5) * 0.6,
      born: this.time, launched: -99, danger: 0, alive: true, hits: 0,
      sq: 0, sqv: 0, sqa: 0, pop: 0, popv: 0, flash: 0,
      absorbing: 0, ghost: false, merging: false, trail: [], alpha: 1, ironAge: 0,
    };
  }
  setKind(b, kind) {
    b.kind = kind; b.tr = this.radiusOf(kind); b.m = kind === 'd' ? b.tr * b.tr * 3 : b.tr * b.tr; b.born = this.time; b.ironAge = 0;
  }

  // ======================================================================
  // actions
  // ======================================================================
  launch() {
    if (this.state !== 'play' || this.cooldown > 0) return;
    const a = this.aim;
    const L = CFG.launchR;
    const b = this.makeBody(this.current, Math.cos(a) * L, Math.sin(a) * L, -Math.cos(a) * CFG.launchSpeed, -Math.sin(a) * CFG.launchSpeed);
    b.launched = this.time;
    b.pop = -0.25;
    this.bodies.push(b);
    this.current = this.queue.shift();
    this.fillQueue();
    this.cooldown = CFG.cooldown;
    this.holdUsed = false;
    this.audio.launch(Math.cos(a) * 0.6);
    // muzzle sparkle
    const col = info(b.kind).color;
    for (let i = 0; i < 10; i++) {
      const s = (Math.random() - 0.5) * 1.4;
      this.spawn(b.x, b.y, -Math.cos(a + s) * (80 + Math.random() * 160), -Math.sin(a + s) * (80 + Math.random() * 160), col, 0.4, 3 + Math.random() * 3, 'dot');
    }
    if (this.tut === 0) this.advanceTut(1);
  }

  hold() {
    if (this.state !== 'play') return;
    if (this.holdUsed) { this.audio.denied(); return; }
    const cap = 1 + this.boon('hold');
    if (this.holds.length < cap) {
      this.holds.push(this.current);
      this.current = this.queue.shift();
      this.fillQueue();
    } else {
      const h = this.holds.shift();
      this.holds.push(this.current);
      this.current = h;
    }
    this.holdUsed = true;
    this.audio.hold();
    if (this.tut === 4) this.advanceTut(5);
  }

  flare(free = false) {
    if (this.state !== 'play') return;
    if (!free && this.flareMeter < 1) { this.audio.denied(); return; }
    if (!free) this.flareMeter = 0;
    this.flareWave = { r: this.core.r, speed: 620 };
    this.flareFx = 1;
    this.flashOn(0.35);
    this.trauma = Math.min(1, this.trauma + 0.35);
    this.audio.flare();
    this.addShock(0, 0, 0, CFG.launchR * 1.25, 1.1, '#ffd59a', 7);
    if (this.tut === 5) this.advanceTut(6);
  }

  // ======================================================================
  // forces
  // ======================================================================
  accel(x, y, kind, out) {
    const d = Math.hypot(x, y) + 1e-6;
    const G = CFG.gravity * (1 + 0.14 * this.boon('gravity')) * (kind === FE ? 2.6 : 1);
    const a = G * d / Math.sqrt(d * d + CFG.gravSoft * CFG.gravSoft);
    let ax = -x / d * a, ay = -y / d * a;
    const mods = this.star.mods;
    if (mods.includes('swirl')) {
      const s = 210 * Math.min(1, d / 160) * (d < CFG.launchR + 20 ? 1 : 0);
      ax += -y / d * s; ay += x / d * s;
    }
    if (mods.includes('companion')) {
      const cx = Math.cos(this.compAng) * COMP_RX, cy = Math.sin(this.compAng) * COMP_RY;
      const dx = cx - x, dy = cy - y, dd = Math.hypot(dx, dy);
      const f = Math.min(340, 1.5e7 / (dd * dd));
      ax += dx / dd * f; ay += dy / dd * f;
    }
    const fe = this.flareEvent;
    if (fe && fe.active > 0 && mods.includes('flares')) {
      const ang = Math.atan2(y, x);
      const w = Math.max(0, 1 - Math.abs(angDiff(ang, fe.ang)) / 1.05);
      const f = 2100 * w * Math.pow(d / this.dangerR, 2) * Math.sin(Math.PI * (1 - fe.active / 0.8));
      ax += x / d * f; ay += y / d * f;
    }
    out.x = ax; out.y = ay;
  }

  // ======================================================================
  // physics step
  // ======================================================================
  physics(h) {
    const bodies = this.bodies;
    const tmp = { x: 0, y: 0 };
    const dragK = Math.exp(-CFG.drag * h);
    for (const b of bodies) {
      if (!b.alive) continue;
      if (b.absorbing > 0) continue;
      // grow newborns smoothly so fusions push neighbours rather than teleport them
      const age = this.time - b.born;
      b.r = b.tr * (age < 0.14 ? 0.62 + 0.38 * (age / 0.14) : 1);
      this.accel(b.x, b.y, b.kind, tmp);
      if (b.ghost) { tmp.x *= 3; tmp.y *= 3; }
      b.vx += tmp.x * h; b.vy += tmp.y * h;
      const k = b.ghost ? Math.exp(-3 * h) : dragK;
      b.vx *= k; b.vy *= k;
      const sp = Math.hypot(b.vx, b.vy);
      if (sp > CFG.maxSpeed) { b.vx *= CFG.maxSpeed / sp; b.vy *= CFG.maxSpeed / sp; }
      b.x += b.vx * h; b.y += b.vy * h;
      // roll: spin from tangential motion around the core
      const d = Math.hypot(b.x, b.y) + 1e-6;
      const tang = (-b.y * b.vx + b.x * b.vy) / d;
      b.spin = lerp(b.spin, tang / b.r * 0.6, 0.02);
      b.angle += b.spin * h;
    }

    // fusion affinity: identical elements that are nearly touching pull toward each other
    const n = bodies.length;
    const AFF = CFG.affinityRange;
    for (let i = 0; i < n; i++) {
      const a = bodies[i];
      if (!a.alive || a.absorbing || a.ghost || typeof a.kind !== 'number' || a.kind >= FE) continue;
      for (let j = i + 1; j < n; j++) {
        const b = bodies[j];
        if (b.kind !== a.kind || !b.alive || b.absorbing || b.ghost) continue;
        const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) + 1e-6;
        const gap = d - a.r - b.r;
        if (gap > AFF) continue;
        const f = CFG.affinity * (1 - Math.max(0, gap) / AFF) * h;
        a.vx += dx / d * f; a.vy += dy / d * f;
        b.vx -= dx / d * f; b.vy -= dy / d * f;
      }
    }

    // collisions
    const merges = [];
    for (let it = 0; it < 4; it++) {
      for (let i = 0; i < n; i++) {
        const a = bodies[i];
        if (!a.alive || a.absorbing || a.ghost) continue;
        // core
        const da = Math.hypot(a.x, a.y) + 1e-6;
        const cr = this.core.r;
        if (da < cr + a.r) {
          if (a.kind === FE) { this.beginAbsorb(a); continue; }
          if (a.kind === 'n') { this.fizzle(a); continue; }
          const nx = a.x / da, ny = a.y / da;
          a.x = nx * (cr + a.r); a.y = ny * (cr + a.r);
          const vn = a.vx * nx + a.vy * ny;
          if (vn < 0) { a.vx -= (1 + CFG.restitution) * vn * nx; a.vy -= (1 + CFG.restitution) * vn * ny; }
        }
        for (let j = i + 1; j < n; j++) {
          const b = bodies[j];
          if (!b.alive || b.absorbing || b.ghost) continue;
          let dx = b.x - a.x, dy = b.y - a.y;
          const rr = a.r + b.r;
          if (dx > rr || dx < -rr || dy > rr || dy < -rr) continue;
          let d2 = dx * dx + dy * dy;
          if (d2 >= rr * rr) continue;
          let d = Math.sqrt(d2);
          if (d < 1e-4) { dx = Math.random() - 0.5; dy = Math.random() - 0.5; d = Math.hypot(dx, dy); }
          const nx = dx / d, ny = dy / d;
          // special interactions
          if (it === 0 && !a.merging && !b.merging) {
            if (typeof a.kind === 'number' && a.kind === b.kind && a.kind < FE) { a.merging = b.merging = true; merges.push([a, b]); continue; }
            if (a.kind === 'n' || b.kind === 'n') {
              const sh = a.kind === 'n' ? a : b, o = a.kind === 'n' ? b : a;
              if (typeof o.kind === 'number' && o.kind < FE) { this.neutronHit(sh, o); continue; }
              if (o.kind === 'd') { this.neutronHit(sh, o); continue; }
            }
          }
          if (a.merging || b.merging) continue;
          const ima = 1 / a.m, imb = 1 / b.m, ims = ima + imb;
          const pen = rr - d;
          const corr = Math.max(pen - 0.15, 0) / ims * 0.75;
          a.x -= nx * corr * ima; a.y -= ny * corr * ima;
          b.x += nx * corr * imb; b.y += ny * corr * imb;
          const rvx = b.vx - a.vx, rvy = b.vy - a.vy;
          const vn = rvx * nx + rvy * ny;
          if (vn < 0) {
            const jn = -(1 + CFG.restitution) * vn / ims;
            a.vx -= jn * nx * ima; a.vy -= jn * ny * ima;
            b.vx += jn * nx * imb; b.vy += jn * ny * imb;
            const tx = -ny, ty = nx;
            const vt = rvx * tx + rvy * ty;
            const jt = clamp(-vt / ims, -jn * CFG.friction, jn * CFG.friction);
            a.vx -= jt * tx * ima; a.vy -= jt * ty * ima;
            b.vx += jt * tx * imb; b.vy += jt * ty * imb;
            if (it === 0 && -vn > 110) this.impact(a, b, -vn, nx, ny);
          }
        }
      }
    }
    for (const b of bodies) b.merging = false;
    for (const [a, b] of merges) if (a.alive && b.alive) this.merge(a, b);
  }

  impact(a, b, v, nx, ny) {
    const s = Math.min(0.22, v / 2600);
    const ang = Math.atan2(ny, nx);
    for (const o of [a, b]) { o.sq = Math.max(o.sq, s * (o === a ? b.m / (a.m + b.m) : a.m / (a.m + b.m)) * 2); o.sqa = ang; }
    this.audio.impact(v / 700, clamp(((a.x + b.x) / 2) / CFG.launchR, -1, 1) * 0.6);
  }

  // ======================================================================
  // fusion
  // ======================================================================
  merge(a, b) {
    let tier = a.kind + 1;
    let skipped = false;
    if (tier < FE && Math.random() < 0.1 * this.boon('catalyst')) { tier++; skipped = true; }
    const mx = (a.x * a.m + b.x * b.m) / (a.m + b.m), my = (a.y * a.m + b.y * b.m) / (a.m + b.m);
    a.alive = b.alive = false;
    const nb = this.makeBody(tier, mx, my, (a.vx + b.vx) * 0.35, (a.vy + b.vy) * 0.35);
    nb.r = nb.tr * 0.62;
    nb.pop = 0.38; nb.flash = 1;
    nb.launched = Math.max(a.launched, b.launched);
    this.bodies.push(nb);

    // chain
    if (this.time - this.lastMergeT < CFG.chainWindow) this.combo++; else this.combo = 1;
    this.lastMergeT = this.time;
    const mult = this.mult();
    const pts = Math.round(10 * Math.pow(2, tier) * mult);
    this.addScore(pts);
    this.stats.fusions++;
    this.stats.bestChain = Math.max(this.stats.bestChain, this.combo);
    this.flareMeter = Math.min(1, this.flareMeter + (10 * Math.pow(2, tier)) / CFG.flareCharge * (1 + 0.35 * this.boon('flare')));

    // effects
    const el = info(tier);
    const sx = clamp(mx / CFG.launchR, -1, 1) * 0.7;
    this.audio.merge(tier, this.combo, sx);
    const count = 14 + tier * 9;
    for (let i = 0; i < count; i++) {
      const ang = Math.random() * TAU, sp = 60 + Math.random() * (140 + tier * 50);
      this.spawn(mx + Math.cos(ang) * nb.tr * 0.5, my + Math.sin(ang) * nb.tr * 0.5, Math.cos(ang) * sp, Math.sin(ang) * sp,
        Math.random() < 0.3 ? '#ffffff' : el.color, 0.5 + Math.random() * 0.6, 2 + Math.random() * (3 + tier), Math.random() < 0.45 ? 'spark' : 'dot');
    }
    this.addShock(mx, my, nb.tr * 0.6, nb.tr * (2.2 + tier * 0.15), 0.55 + tier * 0.04, el.color, 2 + tier * 0.5);
    this.trauma = Math.min(1, this.trauma + 0.05 + tier * 0.035);
    if (tier >= 5) this.zoom = Math.min(0.03, this.zoom + 0.008 * (tier - 4));
    if (tier >= 6) this.hitstop = Math.max(this.hitstop, 0.05);
    if (tier === FE) { this.hitstop = 0.1; this.flashOn(0.25); this.toast('IRON FORGED · FEED THE CORE', 'gold'); }
    this.floatText(mx, my - nb.tr * 0.2, `+${fmt(pts)}`, el.color, 13 + tier * 2);
    if ([3, 5, 8, 12, 16, 20].includes(this.combo) || (this.combo > 20 && this.combo % 5 === 0)) {
      this.floatText(mx, my + nb.tr * 0.6 + 8, `CHAIN ×${this.combo}`, '#ffd59a', 14 + Math.min(this.combo, 10));
      if (this.combo >= 5) this.toast(`CHAIN ×${this.combo} · MULTIPLIER ×${this.mult().toFixed(2).replace(/0$/, '')}`, 'gold');
    }
    if (skipped) this.floatText(mx, my - nb.tr - 14, 'CATALYZED!', '#bff3ff', 13);

    // merge pulse nudges neighbours outward
    const pr = nb.tr + 60 + tier * 6;
    for (const o of this.bodies) {
      if (!o.alive || o === nb || o.absorbing || o.ghost) continue;
      const dx = o.x - mx, dy = o.y - my, d = Math.hypot(dx, dy) + 1e-6;
      if (d < pr + o.r) {
        const f = (1 - d / (pr + o.r)) * (50 + tier * 18) * (o.kind === FE ? 0.3 : 1);
        o.vx += dx / d * f; o.vy += dy / d * f;
      }
      if (o.kind === 'd' && d < nb.tr + o.r + 55) this.damageDark(o, 1);
    }

    // discovery
    if (!this.seenTiers.has(tier)) {
      this.seenTiers.add(tier);
      if (tier > 2 && tier < FE) this.toast(`NEW ELEMENT · ${el.name.toUpperCase()}`);
    }
    this.stats.topTier = Math.max(this.stats.topTier, tier);
    if (this.tut === 1) this.advanceTut(2);
  }
  mult() {
    const growth = 0.25 * (1 + 0.5 * this.boon('golden'));
    return Math.min(CFG.maxMult, 1 + (this.combo - 1) * growth);
  }

  neutronHit(n, o) {
    n.alive = false;
    const col = '#dff6ff';
    if (o.kind === 'd') { this.damageDark(o, 3); }
    else {
      this.setKind(o, o.kind + 1);
      o.r = o.tr * 0.7; o.pop = 0.4; o.flash = 1;
      this.floatText(o.x, o.y - o.tr - 10, `${info(o.kind).sym}!`, info(o.kind).color, 16);
      this.addScore(25 * Math.pow(2, o.kind));
      if (!this.seenTiers.has(o.kind)) this.seenTiers.add(o.kind);
      this.stats.topTier = Math.max(this.stats.topTier, o.kind);
      if (o.kind === FE) this.toast('IRON FORGED · FEED THE CORE', 'gold');
    }
    for (let i = 0; i < 26; i++) {
      const a = Math.random() * TAU, s = 80 + Math.random() * 260;
      this.spawn(n.x, n.y, Math.cos(a) * s, Math.sin(a) * s, i % 2 ? col : '#9fe8ff', 0.6, 2 + Math.random() * 3, 'spark');
    }
    this.addShock(n.x, n.y, 4, 70, 0.6, '#bff3ff', 3);
    this.audio.neutron(clamp(n.x / CFG.launchR, -1, 1) * 0.6);
  }
  fizzle(n) {
    n.alive = false;
    for (let i = 0; i < 16; i++) { const a = Math.random() * TAU; this.spawn(n.x, n.y, Math.cos(a) * 140, Math.sin(a) * 140, '#bff3ff', 0.5, 3, 'dot'); }
    this.audio.denied();
  }
  damageDark(d, amt) {
    d.hits += amt; d.flash = 1;
    if (d.hits >= 3 && d.alive) {
      d.alive = false;
      this.addScore(300);
      this.floatText(d.x, d.y, 'DISSOLVED +300', '#c9a8ff', 14);
      for (let i = 0; i < 50; i++) {
        const a = Math.random() * TAU, s = 40 + Math.random() * 220;
        this.spawn(d.x, d.y, Math.cos(a) * s, Math.sin(a) * s, i % 3 ? '#8a4dff' : '#e0ccff', 0.9, 2 + Math.random() * 4, 'dot');
      }
      this.addShock(d.x, d.y, 10, 90, 0.7, '#a77bff', 4);
      this.audio.neutron(0);
    }
  }

  // ======================================================================
  // the core
  // ======================================================================
  beginAbsorb(b) {
    if (b.absorbing) return;
    b.absorbing = 0.0001; b.ax = b.x; b.ay = b.y;
    this.audio.absorb();
  }
  updateAbsorb(b, dt) {
    b.absorbing += dt / 0.75;
    const t = easeInOut(Math.min(1, b.absorbing));
    b.x = b.ax * (1 - t); b.y = b.ay * (1 - t);
    b.angle += dt * 12 * t;
    if (Math.random() < 0.8) {
      const a = Math.random() * TAU, d = b.tr * (1.5 + Math.random());
      this.spawn(b.x + Math.cos(a) * d, b.y + Math.sin(a) * d, -Math.cos(a) * d * 3, -Math.sin(a) * d * 3, Math.random() < 0.5 ? '#dfe4ff' : rgbHex(this.star.hue), 0.35, 2 + Math.random() * 2, 'spark');
    }
    if (b.absorbing >= 1) {
      b.alive = false;
      this.core.iron++;
      this.core.r = CFG.coreR0 + this.core.iron * CFG.coreGrow;
      this.core.pulse = 1;
      this.addScore(2000);
      this.floatText(0, -this.core.r - 30, '+2,000 IRON CORE', '#e6ebff', 18);
      this.flareMeter = Math.min(1, this.flareMeter + 0.25);
      this.trauma = Math.min(1, this.trauma + 0.5);
      this.hitstop = 0.08;
      this.flashOn(0.3);
      this.addShock(0, 0, this.core.r, CFG.launchR * 1.1, 1.0, '#e8ecff', 6);
      for (let i = 0; i < 120; i++) {
        const a = Math.random() * TAU, s = 120 + Math.random() * 520;
        this.spawn(Math.cos(a) * this.core.r, Math.sin(a) * this.core.r, Math.cos(a) * s, Math.sin(a) * s, i % 3 ? '#e6ebff' : rgbHex(this.star.hue), 0.9, 2 + Math.random() * 4, i % 2 ? 'spark' : 'dot');
      }
      // gravitational kick: everything is shoved outward a little, then falls back in
      for (const o of this.bodies) {
        if (!o.alive || o.absorbing) continue;
        const d = Math.hypot(o.x, o.y) + 1e-6;
        const f = 180 * Math.max(0, 1 - d / 320);
        o.vx += o.x / d * f; o.vy += o.y / d * f;
      }
      if (this.core.iron >= this.star.iron && !this.novaTriggered) {
        this.novaTriggered = true;
        this.novaDelay = 0.7;
        this.toast('THE STAR CAN NO LONGER HOLD', 'warn');
      } else {
        this.toast(`IRON CORE ${this.core.iron} / ${this.star.iron}`, 'gold');
      }
      if (this.tut <= 3) this.advanceTut(4);
    }
  }

  // ======================================================================
  // update
  // ======================================================================
  update(dt, rdt) {
    this.time += dt;
    this.updateFx(dt, rdt);
    this.audio.decay(rdt);

    if (this.state === 'title') { this.updateDemo(dt); return; }
    if (this.state === 'forming') {
      this.formT += rdt;
      this.nova = this.nova0 * Math.max(0, 1 - this.formT / 1.2);
      this.implode = Math.max(0, 1 - this.formT / 1.4);
      if (this.formT > 1.4) { this.state = 'play'; this.implode = 0; this.nova = 0; if (this.tut === 0) this.showTut(); }
      return;
    }
    if (this.state === 'nova') { this.updateNova(dt, rdt); return; }
    if (this.state === 'eject') { this.updateEject(dt, rdt); return; }
    if (this.state === 'boons' || this.state === 'over') { this.nova = Math.min(1, this.nova + rdt * 0.05); this.stepParticles(dt); return; }
    if (this.state !== 'play') return;

    this.cooldown -= dt;
    if (this.keyAim) this.aim += this.keyAim * dt * 2.6;
    if (this.auto) this.botStep(dt);

    // modifiers
    const mods = this.star.mods;
    if (mods.includes('companion')) this.compAng += dt * TAU / 48;
    if (mods.includes('dark')) {
      this.darkTimer -= dt;
      if (this.darkTimer <= 0) {
        this.darkTimer = 22 + Math.random() * 12;
        if (this.bodies.filter((b) => b.alive && b.kind === 'd').length < 2) {
          const a = Math.random() * TAU;
          const d = this.makeBody('d', Math.cos(a) * CFG.launchR, Math.sin(a) * CFG.launchR, -Math.cos(a) * 260, -Math.sin(a) * 260);
          d.launched = this.time;
          this.bodies.push(d);
          this.toast('DARK MATTER DRIFTS IN');
        }
      }
    }
    if (mods.includes('flares')) {
      const fe = this.flareEvent;
      if (fe.active > 0) { fe.active -= dt; if (fe.active <= 0) fe.next = 18 + Math.random() * 10; }
      else if (fe.warn > 0) {
        fe.warn -= dt;
        if (fe.warn <= 0) { fe.active = 0.8; this.audio.stellarFlare(); this.trauma = Math.min(1, this.trauma + 0.4); }
      } else {
        fe.next -= dt;
        if (fe.next <= 0) { fe.warn = 2.6; fe.ang = Math.random() * TAU; this.audio.warnFlare(); this.toast('STELLAR FLARE INCOMING', 'warn'); }
      }
    }

    // fixed-step physics
    this.acc += dt;
    let steps = 0;
    while (this.acc >= STEP && steps < 6) { this.physics(STEP); this.acc -= STEP; steps++; }
    if (steps === 6) this.acc = 0;

    // per-body bookkeeping
    let worst = 0;
    const overflow = CFG.overflowTime + 0.9 * this.boon('shield');
    for (const b of this.bodies) {
      if (!b.alive) continue;
      if (b.absorbing) { this.updateAbsorb(b, dt); continue; }
      if (b.kind === FE) {
        b.ironAge += dt;
        if (b.ironAge > 4.5 && !b.ghost) { b.ghost = true; }
        if (b.ghost && Math.hypot(b.x, b.y) < this.core.r + b.r * 0.6) this.beginAbsorb(b);
      }
      const d = Math.hypot(b.x, b.y);
      const grace = this.time - b.launched < CFG.launchGrace;
      if (!grace && !b.ghost && d + b.r * 0.35 > this.dangerR) b.danger += dt;
      else b.danger = Math.max(0, b.danger - dt * 1.6);
      worst = Math.max(worst, b.danger / overflow);
      // trails for fast movers
      const sp = Math.hypot(b.vx, b.vy);
      if (sp > 200 || b.ghost) { b.trail.push(b.x, b.y); if (b.trail.length > 24) b.trail.splice(0, 2); }
      else if (b.trail.length) b.trail.splice(0, 2);
      this.springs(b, dt);
    }
    this.bodies = this.bodies.filter((b) => b.alive);
    this.heat = lerp(this.heat, Math.min(1, worst), 1 - Math.exp(-dt * 6));
    if (worst > 0.15) {
      this.alarmT = (this.alarmT || 0) - dt;
      if (this.alarmT <= 0) { this.audio.danger(worst); this.alarmT = lerp(0.6, 0.18, worst); }
    }
    if (worst >= 1) this.die();

    // flare wave
    if (this.flareWave) {
      const w = this.flareWave;
      w.r += w.speed * dt;
      for (const b of this.bodies) {
        if (!b.alive || b.absorbing) continue;
        const d = Math.hypot(b.x, b.y);
        if (d > w.r) continue;
        if (b.kind === 0 || b.kind === 1) this.vaporize(b);
        else if (b.kind === 'd' && !b.flared) { b.flared = true; this.damageDark(b, 3); }
      }
      if (w.r > CFG.launchR + 40) { this.flareWave = null; this.bodies.forEach((b) => (b.flared = false)); }
    }

    // nova trigger
    if (this.novaTriggered) { this.novaDelay -= dt; if (this.novaDelay <= 0) this.startNova(); }

    this.stepParticles(dt);
    if (this.tut < 90) this.tutTick(dt);
  }

  springs(b, dt) {
    b.sqv += (-260 * b.sq - 14 * b.sqv) * dt; b.sq += b.sqv * dt;
    b.popv += (-220 * b.pop - 11 * b.popv) * dt; b.pop += b.popv * dt;
    b.flash = Math.max(0, b.flash - dt * 3);
  }

  vaporize(b) {
    b.alive = false;
    const el = info(b.kind);
    this.addScore(15);
    for (let i = 0; i < 12; i++) {
      const a = Math.atan2(b.y, b.x) + (Math.random() - 0.5) * 0.9, s = 150 + Math.random() * 250;
      this.spawn(b.x, b.y, Math.cos(a) * s, Math.sin(a) * s, i % 2 ? '#ffe6b0' : el.color, 0.6, 2 + Math.random() * 3, 'spark');
    }
  }

  die() {
    if (this.boon('phoenix') && !this.phoenixUsed) {
      this.phoenixUsed = true;
      this.bodies.forEach((b) => (b.danger = 0));
      this.toast('SECOND DAWN', 'gold');
      this.flare(true);
      return;
    }
    this.state = 'eject';
    this.ejT = 0;
    this.audio.ejection();
    this.showHUD(false);
    this.hideCoach();
    for (const b of this.bodies) { b.ghost = true; b.danger = 0; }
    this.trauma = 0.7;
  }

  updateEject(dt, rdt) {
    this.ejT += rdt;
    this.eject = easeOut(this.ejT / 3.2);
    for (const b of this.bodies) {
      const d = Math.hypot(b.x, b.y) + 1e-6;
      const f = 220 + d * 1.4;
      b.vx += b.x / d * f * dt; b.vy += b.y / d * f * dt;
      b.vx *= Math.exp(-0.4 * dt); b.vy *= Math.exp(-0.4 * dt);
      b.x += b.vx * dt; b.y += b.vy * dt;
      b.alpha = clamp(1 - (d - CFG.launchR) / 260, 0, 1);
      b.angle += b.spin * dt;
      b.trail.push(b.x, b.y); if (b.trail.length > 30) b.trail.splice(0, 2);
      if (Math.random() < 0.3) this.spawn(b.x, b.y, b.vx * 0.3, b.vy * 0.3, info(b.kind).color, 0.8, 2 + Math.random() * 3, 'dot');
    }
    this.core.r = lerp(this.core.r, 10, dt * 1.5);
    this.stepParticles(dt);
    if (this.ejT > 3.3 && this.state === 'eject') this.gameOver();
  }

  startNova() {
    this.state = 'nova';
    this.novaT = 0;
    this.exploded = false;
    this.audio.collapse();
    this.hideCoach();
    for (const b of this.bodies) { b.ghost = true; b.danger = 0; }
  }

  updateNova(dt, rdt) {
    this.novaT += rdt;
    const t = this.novaT;
    if (t < 1.5) {
      const k = t / 1.5;
      this.implode = easeInOut(k);
      this.trauma = Math.min(1, 0.2 + k * 0.6);
      for (const b of this.bodies) {
        b.x *= 1 - rdt * (1.5 + k * 6); b.y *= 1 - rdt * (1.5 + k * 6);
        b.angle += rdt * 8;
        b.trail.push(b.x, b.y); if (b.trail.length > 20) b.trail.splice(0, 2);
        b.alpha = 1 - k * 0.6;
      }
      this.core.r = lerp(this.core.r, 6, rdt * 2);
      // gas sucked in from the ring
      for (let i = 0; i < 6; i++) {
        const a = Math.random() * TAU, R = this.dangerR * (0.9 + Math.random() * 0.5);
        this.spawn(Math.cos(a) * R, Math.sin(a) * R, -Math.cos(a) * R * 2.2, -Math.sin(a) * R * 2.2, Math.random() < 0.5 ? rgbHex(this.star.hue) : '#ffffff', 0.42, 2 + Math.random() * 2, 'spark');
      }
    } else if (!this.exploded) {
      this.exploded = true;
      this.bodies = [];
      this.implode = 0;
      this.nova = 0.001;
      this.flashOn(1);
      this.trauma = 1;
      this.zoom = 0.05;
      this.audio.supernova();
      const bonus = 5000 * (this.starIndex + 1);
      this.novaBonus = bonus;
      this.addScore(bonus);
      this.stats.novae++;
      this.records.novae++;
      this.saveRecords();
      for (let i = 0; i < 4; i++) this.addShock(0, 0, 10, CFG.launchR * (2.4 + i * 0.6), 1.4 - i * 0.2, i % 2 ? '#ffffff' : rgbHex(this.star.hue), 12 - i * 2, 1.4 + i * 0.5);
      const cols = ['#ffffff', '#fff1d0', rgbHex(this.star.hue), '#8fd0ff', '#ff9a6a'];
      for (let i = 0; i < 900; i++) {
        const a = Math.random() * TAU, s = 150 + Math.pow(Math.random(), 0.6) * 1300;
        this.spawn(0, 0, Math.cos(a) * s, Math.sin(a) * s, cols[i % cols.length], 1.2 + Math.random() * 2.2, 2 + Math.random() * 5, i % 3 ? 'spark' : 'dot', 0.6);
      }
      this.core.r = 8;
    } else {
      this.nova = Math.min(1, easeOut((t - 1.5) / 6) );
      if (t > 4.4 && this.state === 'nova') this.showBoons();
    }
    this.stepParticles(dt);
  }

  // ======================================================================
  // fx primitives
  // ======================================================================
  spawn(x, y, vx, vy, color, life, size, kind = 'dot', drag = 1.6) {
    if (this.particles.length > 2200) return;
    this.particles.push({ x, y, vx, vy, color, life, max: life, size, kind, drag });
  }
  stepParticles(dt) {
    const ps = this.particles;
    let w = 0;
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      p.life -= dt;
      if (p.life <= 0) continue;
      const k = Math.exp(-p.drag * dt);
      p.vx *= k; p.vy *= k;
      p.x += p.vx * dt; p.y += p.vy * dt;
      ps[w++] = p;
    }
    ps.length = w;
  }
  addShock(x, y, r0, r1, amp, color, width = 3, dur = 0.7) {
    this.shocks.push({ x, y, r0, r1, amp, color, width, t: 0, dur });
  }
  floatText(x, y, text, color, size) {
    this.texts.push({ x, y, text, color, size, t: 0 });
    if (this.texts.length > 7) this.texts.splice(0, this.texts.length - 7);
  }
  flashOn(v) { this.flash = Math.max(this.flash, v * (this.settings.reducedFlash ? 0.25 : 1)); }
  updateFx(dt, rdt) {
    this.trauma = Math.max(0, this.trauma - rdt * 1.4);
    this.flash = Math.max(0, this.flash - rdt * 2.2);
    this.zoom = Math.max(0, this.zoom - rdt * 0.12);
    this.flareFx = Math.max(0, this.flareFx - rdt * 1.2);
    this.core.pulse = Math.max(0, this.core.pulse - rdt * 1.5);
    const fe = this.flareEvent;
    const target = fe && this.state === 'play' && this.star.mods.includes('flares') ? (fe.warn > 0 ? 0.5 + 0.5 * Math.sin(this.time * 14) : fe.active > 0 ? 1 : 0) : 0;
    this.warnFx = lerp(this.warnFx, target, 1 - Math.exp(-rdt * 8));
    for (const s of this.shocks) s.t += rdt;
    this.shocks = this.shocks.filter((s) => s.t < s.dur);
    for (const t of this.texts) t.t += rdt;
    this.texts = this.texts.filter((t) => t.t < 1.3);
  }

  addScore(p) {
    this.score += p;
    if (this.score > this.records.best) { this.records.best = Math.round(this.score); this.newBest = true; }
  }
  saveRecords() { if (!this.auto) store.set('records', this.records); }

  // ======================================================================
  // aim prediction
  // ======================================================================
  predict() {
    const r = this.radiusOf(this.current);
    const a = this.aim, L = CFG.launchR;
    let x = Math.cos(a) * L, y = Math.sin(a) * L, vx = -Math.cos(a) * CFG.launchSpeed, vy = -Math.sin(a) * CFG.launchSpeed;
    const pts = [x, y];
    const tmp = { x: 0, y: 0 };
    const h = 1 / 60;
    const k = Math.exp(-CFG.drag * h);
    const kind = this.current;
    for (let i = 0; i < 150; i++) {
      this.accel(x, y, kind, tmp);
      vx = (vx + tmp.x * h) * k; vy = (vy + tmp.y * h) * k;
      x += vx * h; y += vy * h;
      pts.push(x, y);
      const d = Math.hypot(x, y);
      if (d < this.core.r + r) return { pts, x, y, hit: 'core' };
      for (const b of this.bodies) {
        if (!b.alive || b.absorbing || b.ghost) continue;
        const dx = b.x - x, dy = b.y - y, rr = b.r + r;
        if (dx * dx + dy * dy < rr * rr) {
          // back off to the exact contact point
          const dd = Math.hypot(dx, dy) + 1e-6, back = rr - dd;
          return { pts, x: x - dx / dd * back, y: y - dy / dd * back, hit: b };
        }
      }
    }
    return { pts, x, y, hit: null };
  }

  botStep(dt) {
    this.botT = (this.botT || 0) - dt;
    if (this.botT > 0 || this.cooldown > 0) return;
    this.botT = 0.35 + Math.random() * 0.3;
    if (this.flareMeter >= 1 && this.heat > 0.3) { this.flare(); return; }
    const save = this.aim;
    let best = save, bestScore = -1e9;
    for (let i = 0; i < 48; i++) {
      this.aim = i / 48 * TAU;
      const p = this.predict();
      let sc = -Math.hypot(p.x, p.y) * 0.4 + Math.random() * 20;
      if (p.hit && p.hit !== 'core' && p.hit.kind === this.current) sc += 200 + p.hit.r;
      for (const b of this.bodies) if (b.kind === this.current && Math.hypot(b.x - p.x, b.y - p.y) < b.r + this.radiusOf(this.current) + CFG.affinityRange) sc += 120;
      if (sc > bestScore) { bestScore = sc; best = this.aim; }
    }
    this.aim = best;
    this.launch();
  }

  // ======================================================================
  // rendering
  // ======================================================================
  w2s(x, y) { return [this.cx + x * this.scale, this.cy + y * this.scale]; }

  render(rdt) {
    const g = this.g, dpr = this.dpr;
    const targetScale = this.state === 'title' ? this.titleScale() : this.playScale;
    const ease = 1 - Math.exp(-rdt * 3);
    this.scale = lerp(this.scale || targetScale, targetScale, ease);
    this.cx = lerp(this.cx, this.state === 'title' ? this.titleCx() : this.playCx, ease);
    this.cy = lerp(this.cy, this.playCy, ease);

    // camera shake
    const sh = this.settings.shake ? this.trauma * this.trauma : 0;
    const t = this.rtime;
    const ox = sh * 16 * (Math.sin(t * 47.3) + Math.sin(t * 91.7) * 0.5);
    const oy = sh * 16 * (Math.cos(t * 53.1) + Math.sin(t * 77.9) * 0.5);
    const S = this.scale * (1 + this.zoom);
    const cx = this.cx + ox, cy = this.cy + oy;

    // ---- background shader ----
    const shocks = this.shocks
      .map((s) => { const k = s.t / s.dur; return { x: cx + s.x * S, y: cy + s.y * S, r: lerp(s.r0, s.r1, easeOut(k)) * S, s: s.amp * (1 - k) }; })
      .sort((a, b) => b.s - a.s).slice(0, 4);
    let comp = null;
    if (this.star.mods.includes('companion') && this.state !== 'title') {
      comp = { x: cx + Math.cos(this.compAng) * COMP_RX * S, y: cy + Math.sin(this.compAng) * COMP_RY * S, r: 46 * S, on: this.state === 'eject' ? 1 - this.eject : 1 };
    }
    const titleStar = this.state === 'title';
    this.bg.render({
      cx, cy, ring: this.dangerR * S, time: this.rtime, heat: this.heat,
      col1: titleStar ? [1.0, 0.62, 0.3] : this.star.hue, col2: titleStar ? [0.22, 0.08, 0.3] : this.star.hue2,
      shocks, core: this.core.r * S, nova: this.nova, implode: this.implode, eject: this.eject,
      flash: this.flash * 0.6, flare: this.flareFx, warn: this.warnFx, comp, star: this.starPresence(),
    });
    $('flash').style.opacity = (this.flash * 0.55).toFixed(3);

    // ---- foreground ----
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, this.cv.width, this.cv.height);
    g.setTransform(dpr * S, 0, 0, dpr * S, dpr * cx, dpr * cy);
    this.S = S;

    if (this.state === 'title') { this.drawRings(g, 1); this.drawCore(g); this.drawDemo(g); return; }

    const ringAlpha = this.state === 'forming' ? easeOut(this.formT / 1.4) : this.state === 'eject' ? 1 - this.eject : this.state === 'nova' ? (this.exploded ? 0 : 1 - this.implode * 0.7) : this.state === 'boons' ? 0 : 1;
    if (ringAlpha > 0.01) this.drawRings(g, ringAlpha);
    if (this.star.mods.includes('swirl') && ringAlpha > 0.01) this.drawSwirl(g, ringAlpha);
    if (this.state === 'play' && this.flareEvent && (this.flareEvent.warn > 0 || this.flareEvent.active > 0) && this.star.mods.includes('flares')) this.drawFlareWarn(g);
    if (this.state !== 'boons' && this.state !== 'over' && !(this.state === 'nova' && this.exploded)) this.drawCore(g);
    this.drawTethers(g);
    if (this.state === 'play') this.drawAffinity(g);
    this.drawTrails(g);
    this.drawBodies(g);
    if (this.state === 'play') this.drawAim(g);
    this.drawParticles(g);
    this.drawShocks(g);
    if (this.flareWave) this.drawFlareWave(g);
    this.drawTexts(g);
  }

  starPresence() {
    if (this.state === 'forming') return easeOut(this.formT / 1.4);
    if (this.state === 'boons' || (this.state === 'nova' && this.exploded)) return 0;
    return 1;
  }

  drawRings(g, alpha) {
    const S = this.S;
    const t = this.rtime;
    const col = this.state === 'title' ? [1.0, 0.62, 0.3] : this.star.hue;
    const heat = this.heat;
    const rc = [lerp(col[0], 1, heat), lerp(col[1], 0.25, heat), lerp(col[2], 0.2, heat)];
    g.save();
    g.globalAlpha = alpha;
    // launch ring + ticks
    g.lineWidth = 1 / S;
    g.strokeStyle = 'rgba(160,200,255,0.16)';
    g.beginPath(); g.arc(0, 0, CFG.launchR, 0, TAU); g.stroke();
    const rot = t * 0.04;
    g.strokeStyle = 'rgba(160,200,255,0.28)';
    g.beginPath();
    for (let i = 0; i < 96; i++) {
      const a = rot + i / 96 * TAU, len = i % 8 === 0 ? 10 : 4;
      g.moveTo(Math.cos(a) * (CFG.launchR + 4), Math.sin(a) * (CFG.launchR + 4));
      g.lineTo(Math.cos(a) * (CFG.launchR + 4 + len), Math.sin(a) * (CFG.launchR + 4 + len));
    }
    g.stroke();
    // inner orbit guides
    g.setLineDash([2, 10]);
    g.strokeStyle = 'rgba(160,200,255,0.07)';
    for (const rr of [70, 125, 170]) { g.beginPath(); g.arc(0, 0, rr, 0, TAU); g.stroke(); }
    g.setLineDash([]);
    // danger ring (glow + core line)
    g.globalCompositeOperation = 'lighter';
    const pulse = heat > 0.05 ? 0.5 + 0.5 * Math.sin(t * (6 + heat * 14)) : 0.5;
    g.strokeStyle = `rgba(${rc.map((v) => Math.round(v * 255)).join(',')},${0.12 + heat * 0.25 * pulse})`;
    g.lineWidth = 9 / S + heat * 6;
    g.beginPath(); g.arc(0, 0, this.dangerR, 0, TAU); g.stroke();
    g.strokeStyle = `rgba(${rc.map((v) => Math.round(lerp(v, 1, 0.45) * 255)).join(',')},${0.75 + 0.25 * pulse})`;
    g.lineWidth = 1.8 / S;
    g.beginPath(); g.arc(0, 0, this.dangerR, 0, TAU); g.stroke();
    // hot segments where packets are overflowing
    const overflow = CFG.overflowTime + 0.9 * this.boon('shield');
    for (const b of this.bodies) {
      if (!b.alive || b.danger <= 0) continue;
      const a = Math.atan2(b.y, b.x), w = b.r / this.dangerR * 1.4;
      const k = b.danger / overflow;
      g.strokeStyle = `rgba(255,${Math.round(120 - k * 100)},80,${0.4 + 0.6 * k})`;
      g.lineWidth = (3 + k * 5) / S * 1.5;
      g.beginPath(); g.arc(0, 0, this.dangerR, a - w, a + w); g.stroke();
    }
    g.restore();
  }

  drawSwirl(g, alpha) {
    const t = this.rtime;
    g.save();
    g.globalCompositeOperation = 'lighter';
    g.globalAlpha = alpha * 0.5;
    g.lineWidth = 1.2 / this.S;
    for (let i = 0; i < 10; i++) {
      const a0 = i / 10 * TAU + t * 0.45;
      g.strokeStyle = 'rgba(140,210,255,0.12)';
      g.beginPath();
      for (let s = 0; s <= 1.0001; s += 0.05) {
        const r = 50 + s * (this.dangerR - 50), a = a0 + s * 2.2;
        if (s === 0) g.moveTo(Math.cos(a) * r, Math.sin(a) * r); else g.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      g.stroke();
    }
    g.restore();
  }

  drawFlareWarn(g) {
    const fe = this.flareEvent;
    const t = this.rtime;
    g.save();
    g.globalCompositeOperation = 'lighter';
    const warn = fe.warn > 0;
    const k = warn ? 0.5 + 0.5 * Math.sin(t * 16) : 1;
    const grad = g.createRadialGradient(0, 0, this.dangerR * 0.6, 0, 0, CFG.launchR + 30);
    grad.addColorStop(0, 'rgba(255,120,40,0)');
    grad.addColorStop(0.7, `rgba(255,120,40,${0.1 * k + (warn ? 0 : 0.2)})`);
    grad.addColorStop(1, 'rgba(255,60,20,0)');
    g.fillStyle = grad;
    g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, CFG.launchR + 30, fe.ang - 1.05, fe.ang + 1.05); g.closePath(); g.fill();
    g.strokeStyle = `rgba(255,150,70,${0.5 + 0.5 * k})`;
    g.lineWidth = 4 / this.S;
    g.beginPath(); g.arc(0, 0, this.dangerR + 8, fe.ang - 1.05, fe.ang + 1.05); g.stroke();
    if (warn) {
      g.globalCompositeOperation = 'source-over';
      g.fillStyle = `rgba(255,190,120,${0.6 + 0.4 * k})`;
      g.font = `800 ${13}px Orbitron, sans-serif`;
      g.textAlign = 'center';
      g.fillText(`FLARE ${fe.warn.toFixed(1)}`, Math.cos(fe.ang) * (CFG.launchR + 30), Math.sin(fe.ang) * (CFG.launchR + 30) + 4);
    } else if (Math.random() < 0.9) {
      for (let i = 0; i < 6; i++) {
        const a = fe.ang + (Math.random() - 0.5) * 2, r = this.dangerR * (0.8 + Math.random() * 0.3);
        this.spawn(Math.cos(a) * r, Math.sin(a) * r, Math.cos(a) * 500, Math.sin(a) * 500, Math.random() < 0.5 ? '#ffb35c' : '#ffe2b0', 0.5, 2 + Math.random() * 3, 'spark', 0.5);
      }
    }
    g.restore();
  }

  drawCore(g) {
    const t = this.rtime;
    const r = this.core.r * (1 + this.core.pulse * 0.35 + Math.sin(t * 3) * 0.04);
    const ironK = this.state === 'title' ? 0 : this.core.iron / Math.max(1, this.star.iron);
    const hue = this.state === 'title' ? [1, 0.7, 0.4] : this.star.hue;
    g.save();
    g.globalCompositeOperation = 'lighter';
    const halo = this.sprites.dotFor(rgbHex(hue.map((v) => lerp(v, 1, 0.4))));
    const hs = r * (7 + this.core.pulse * 6) * (1 - this.implode * 0.5);
    g.globalAlpha = 0.55;
    g.drawImage(halo, -hs, -hs, hs * 2, hs * 2);
    g.globalAlpha = 0.9;
    const ws = r * 2.6;
    g.drawImage(this.sprites.dot, -ws, -ws, ws * 2, ws * 2);
    // corona rays
    g.globalAlpha = 0.35 + this.core.pulse * 0.5;
    g.strokeStyle = rgb(hue.map((v) => lerp(v, 1, 0.5)));
    g.lineCap = 'round';
    for (let i = 0; i < 14; i++) {
      const a = i / 14 * TAU + t * 0.3 + Math.sin(t * 1.3 + i) * 0.1;
      const len = r * (1.8 + 0.8 * Math.sin(t * 2.1 + i * 2.3) + this.core.pulse * 2);
      g.lineWidth = r * 0.12;
      g.beginPath(); g.moveTo(Math.cos(a) * r, Math.sin(a) * r); g.lineTo(Math.cos(a) * (r + len), Math.sin(a) * (r + len)); g.stroke();
    }
    g.restore();
    // body
    const grd = g.createRadialGradient(-r * 0.3, -r * 0.3, 0, 0, 0, r);
    grd.addColorStop(0, '#ffffff');
    grd.addColorStop(0.45, rgb(hue.map((v, i) => lerp(lerp(v, 1, 0.6), [0.85, 0.88, 1][i], ironK))));
    grd.addColorStop(1, rgb(hue.map((v, i) => lerp(v * 0.8, [0.35, 0.38, 0.55][i], ironK))));
    g.fillStyle = grd;
    g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill();
    // iron progress pips
    if (this.state !== 'title' && this.state !== 'nova') {
      const n = this.star.iron;
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + (i - (n - 1) / 2) * 0.42;
        const pr = r + 9;
        g.beginPath(); g.arc(Math.cos(a) * pr, Math.sin(a) * pr, 3, 0, TAU);
        if (i < this.core.iron) { g.fillStyle = '#eef1ff'; g.fill(); }
        else { g.strokeStyle = 'rgba(220,230,255,0.55)'; g.lineWidth = 1.2 / this.S * 1.2; g.stroke(); }
      }
    }
  }

  drawTethers(g) {
    const t = this.rtime;
    g.save();
    g.globalCompositeOperation = 'lighter';
    for (const b of this.bodies) {
      if (!b.alive || b.kind !== FE || b.absorbing) continue;
      const d = Math.hypot(b.x, b.y);
      const nx = b.x / d, ny = b.y / d;
      const x0 = nx * this.core.r, y0 = ny * this.core.r, x1 = b.x - nx * b.r, y1 = b.y - ny * b.r;
      for (let k = 0; k < 2; k++) {
        g.strokeStyle = k ? 'rgba(255,255,255,0.7)' : 'rgba(150,170,255,0.35)';
        g.lineWidth = (k ? 1.2 : 4) / this.S * 1.4;
        g.beginPath(); g.moveTo(x0, y0);
        const segs = 9;
        for (let i = 1; i < segs; i++) {
          const s = i / segs;
          const j = (Math.sin(t * 40 + i * 7.3 + b.id) + Math.sin(t * 23 + i * 3.1)) * 5 * Math.sin(s * Math.PI);
          g.lineTo(lerp(x0, x1, s) - ny * j, lerp(y0, y1, s) + nx * j);
        }
        g.lineTo(x1, y1); g.stroke();
      }
    }
    g.restore();
  }

  drawAffinity(g) {
    const bs = this.bodies, t = this.rtime, AFF = CFG.affinityRange;
    g.save();
    g.globalCompositeOperation = 'lighter';
    g.lineCap = 'round';
    for (let i = 0; i < bs.length; i++) {
      const a = bs[i];
      if (typeof a.kind !== 'number' || a.kind >= FE || a.absorbing) continue;
      for (let j = i + 1; j < bs.length; j++) {
        const b = bs[j];
        if (b.kind !== a.kind || b.absorbing) continue;
        const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) + 1e-6;
        const gap = d - a.r - b.r;
        if (gap > AFF) continue;
        const k = 1 - Math.max(0, gap) / AFF;
        const nx = dx / d, ny = dy / d;
        const x0 = a.x + nx * a.r * 0.8, y0 = a.y + ny * a.r * 0.8, x1 = b.x - nx * b.r * 0.8, y1 = b.y - ny * b.r * 0.8;
        const col = info(a.kind).color;
        for (let s = 0; s < 3; s++) {
          const off = (s - 1) * 5 * Math.sin(t * 9 + s * 2 + a.id);
          g.strokeStyle = col;
          g.globalAlpha = (0.25 + 0.35 * k) * (s === 1 ? 1 : 0.5);
          g.lineWidth = (s === 1 ? 2.2 : 1.2) / this.S * 1.3;
          g.beginPath(); g.moveTo(x0, y0);
          g.quadraticCurveTo((x0 + x1) / 2 - ny * off, (y0 + y1) / 2 + nx * off, x1, y1);
          g.stroke();
        }
        if (Math.random() < 0.15 * k) this.spawn(lerp(x0, x1, Math.random()), lerp(y0, y1, Math.random()), (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, col, 0.4, 2, 'dot');
      }
    }
    g.restore();
  }

  drawTrails(g) {
    g.save();
    g.globalCompositeOperation = 'lighter';
    g.lineCap = 'round';
    for (const b of this.bodies) {
      const tr = b.trail;
      if (tr.length < 4) continue;
      const col = info(b.kind).glow;
      const n = tr.length / 2;
      for (let i = 1; i < n; i++) {
        const k = i / n;
        g.strokeStyle = col;
        g.globalAlpha = k * 0.35 * (b.alpha ?? 1);
        g.lineWidth = b.r * 1.3 * k;
        g.beginPath(); g.moveTo(tr[i * 2 - 2], tr[i * 2 - 1]); g.lineTo(tr[i * 2], tr[i * 2 + 1]); g.stroke();
      }
    }
    g.restore();
  }

  spriteFor(kind) { return kind === 'n' ? this.sprites.neutron : kind === 'd' ? this.sprites.dark : this.sprites.orbs[kind]; }

  drawBodies(g) {
    if (!this.sprites.orbs.length) return;
    const t = this.rtime;
    const px = this.sprites.px; // sprite px per world unit
    // glow pass
    g.save();
    g.globalCompositeOperation = 'lighter';
    for (const b of this.bodies) {
      const sp = this.spriteFor(b.kind);
      const scale = this.bodyScale(b);
      const k = (b.r / info(b.kind).radius) * scale;
      const gr = sp.GR / px * k * (1 + 0.06 * Math.sin(t * 3 + b.id));
      g.globalAlpha = (0.55 + b.flash * 0.8 + (b.kind === 'n' ? 0.4 * Math.sin(t * 10) : 0)) * (b.alpha ?? 1);
      g.drawImage(sp.glow, b.x - gr, b.y - gr, gr * 2, gr * 2);
    }
    g.restore();

    const overflow = CFG.overflowTime + 0.9 * this.boon('shield');
    for (const b of this.bodies) {
      const sp = this.spriteFor(b.kind);
      const scale = this.bodyScale(b);
      const k = (b.r / info(b.kind).radius) * scale;
      const half = sp.D / 2 / px * k;
      g.save();
      g.globalAlpha = b.alpha ?? 1;
      g.translate(b.x, b.y);
      // squash & stretch along the last impact normal
      if (Math.abs(b.sq) > 0.002) {
        g.rotate(b.sqa); g.scale(1 - b.sq, 1 + b.sq * 0.7); g.rotate(-b.sqa);
      }
      g.rotate(b.angle);
      g.drawImage(sp.body, -half, -half, half * 2, half * 2);
      g.rotate(-b.angle);
      g.drawImage(sp.shade, -half, -half, half * 2, half * 2);
      if (b.flash > 0) {
        g.globalCompositeOperation = 'lighter';
        g.globalAlpha = b.flash * 0.5;
        g.drawImage(this.sprites.dot, -b.r * 1.2, -b.r * 1.2, b.r * 2.4, b.r * 2.4);
        g.globalCompositeOperation = 'source-over';
        g.globalAlpha = 1;
      }
      g.restore();

      // danger countdown ring
      if (b.danger > 0.02) {
        const kk = clamp(b.danger / overflow, 0, 1);
        g.save();
        g.lineWidth = 3 / this.S * 1.4;
        g.strokeStyle = `rgba(255,${Math.round(150 - kk * 120)},90,${0.5 + 0.5 * Math.sin(t * 20)})`;
        g.beginPath(); g.arc(b.x, b.y, b.r + 5, -Math.PI / 2, -Math.PI / 2 + kk * TAU); g.stroke();
        g.restore();
      }
      // dark matter health pips
      if (b.kind === 'd' && this.state === 'play' && b.hits > 0) {
        for (let i = 0; i < 3; i++) {
          const a = -Math.PI / 2 + (i - 1) * 0.5;
          g.beginPath(); g.arc(b.x + Math.cos(a) * (b.r + 7), b.y + Math.sin(a) * (b.r + 7), 2.6, 0, TAU);
          g.fillStyle = i < 3 - b.hits ? '#b38cff' : 'rgba(180,140,255,0.2)'; g.fill();
        }
      }
    }
  }
  bodyScale(b) {
    let s = (1 + b.pop) * (b.absorbing ? 1 - easeInOut(Math.min(1, b.absorbing)) * 0.85 : 1);
    if (this.state === 'nova' && !this.exploded) s *= 1 - this.implode * 0.7;
    return Math.max(0.05, s);
  }

  drawAim(g) {
    if (!this.sprites.orbs.length || this.current == null) return;
    const t = this.rtime;
    const a = this.aim;
    const L = CFG.launchR;
    const pred = this.predict();
    const kind = this.current;
    const el = info(kind);
    const r = this.radiusOf(kind);
    const match = pred.hit && pred.hit !== 'core' && ((pred.hit.kind === kind && typeof kind === 'number' && kind < FE) || (kind === 'n' && typeof pred.hit.kind === 'number' && pred.hit.kind < FE));
    const ready = this.cooldown <= 0;

    // path
    g.save();
    g.lineCap = 'round';
    g.setLineDash([2 / this.S * 2, 9 / this.S * 1.4]);
    g.lineDashOffset = -t * 40;
    g.strokeStyle = match ? 'rgba(170,255,210,0.85)' : 'rgba(210,225,255,0.5)';
    g.lineWidth = 2 / this.S * 1.3;
    g.beginPath();
    const p = pred.pts;
    g.moveTo(p[0], p[1]);
    for (let i = 2; i < p.length; i += 2) g.lineTo(p[i], p[i + 1]);
    g.stroke();
    g.setLineDash([]);
    // landing ghost
    g.strokeStyle = match ? 'rgba(170,255,210,0.9)' : `rgba(${el.color.slice(1).match(/../g).map((h) => parseInt(h, 16)).join(',')},0.55)`;
    g.lineWidth = 1.6 / this.S * 1.3;
    g.setLineDash([4, 4]);
    g.beginPath(); g.arc(pred.x, pred.y, r, 0, TAU); g.stroke();
    g.setLineDash([]);
    if (match) {
      g.globalCompositeOperation = 'lighter';
      g.globalAlpha = 0.5 + 0.3 * Math.sin(t * 10);
      const hb = pred.hit;
      g.drawImage(this.sprites.dotFor('#9dffcf'), hb.x - hb.r * 1.6, hb.y - hb.r * 1.6, hb.r * 3.2, hb.r * 3.2);
      g.globalAlpha = 1;
      g.globalCompositeOperation = 'source-over';
    }
    g.restore();

    // aim bracket on launch ring
    g.save();
    g.globalCompositeOperation = 'lighter';
    g.strokeStyle = ready ? 'rgba(220,235,255,0.9)' : 'rgba(220,235,255,0.3)';
    g.lineWidth = 2.5 / this.S * 1.3;
    const span = (r + 10) / L;
    g.beginPath(); g.arc(0, 0, L, a - span, a + span); g.stroke();
    g.beginPath(); g.arc(0, 0, L + 16, a - span * 0.6, a + span * 0.6); g.stroke();
    g.restore();

    // the packet waiting at the launcher
    const sp = this.spriteFor(kind);
    const px = this.sprites.px;
    const x = Math.cos(a) * L, y = Math.sin(a) * L;
    const cdK = ready ? 1 : 1 - this.cooldown / CFG.cooldown;
    const half = sp.D / 2 / px * (r / el.radius) * (0.6 + 0.4 * easeOut(cdK));
    g.save();
    g.globalCompositeOperation = 'lighter';
    g.globalAlpha = 0.7;
    const gr = sp.GR / px * (r / el.radius);
    g.drawImage(sp.glow, x - gr, y - gr, gr * 2, gr * 2);
    g.restore();
    g.save();
    g.globalAlpha = 0.5 + 0.5 * cdK;
    g.translate(x, y);
    g.rotate(t * 0.8);
    g.drawImage(sp.body, -half, -half, half * 2, half * 2);
    g.rotate(-t * 0.8);
    g.drawImage(sp.shade, -half, -half, half * 2, half * 2);
    g.restore();
  }

  drawParticles(g) {
    g.save();
    g.globalCompositeOperation = 'lighter';
    const inv = 1 / this.S;
    const k0 = this.dpr * this.S;
    const m = g.getTransform();
    for (const p of this.particles) {
      const k = p.life / p.max;
      g.globalAlpha = Math.min(1, k * 1.4);
      const s = p.size * inv * (0.5 + k * 0.7) * 1.6;
      const img = this.sprites.dotFor(p.color);
      if (p.kind === 'spark') {
        // soft streak: a glow sprite stretched along the velocity
        const sp = Math.hypot(p.vx, p.vy) + 1e-6;
        const len = Math.max(s * 3, sp * 0.05) * 1.6, wid = s * 2.2;
        const c = p.vx / sp, si = p.vy / sp;
        g.setTransform(c * len * k0, si * len * k0, -si * wid * k0, c * wid * k0, m.e + p.x * m.a, m.f + p.y * m.d);
        g.drawImage(img, -0.5, -0.5, 1, 1);
      } else {
        g.setTransform(m);
        g.drawImage(img, p.x - s * 2, p.y - s * 2, s * 4, s * 4);
      }
    }
    g.setTransform(m);
    g.restore();
  }

  drawShocks(g) {
    g.save();
    g.globalCompositeOperation = 'lighter';
    for (const s of this.shocks) {
      const k = s.t / s.dur;
      const r = lerp(s.r0, s.r1, easeOut(k));
      g.globalAlpha = (1 - k) * Math.min(1, s.amp);
      g.strokeStyle = s.color;
      g.lineWidth = s.width * (1 - k * 0.6) / this.S * 1.5;
      g.beginPath(); g.arc(s.x, s.y, r, 0, TAU); g.stroke();
    }
    g.restore();
  }

  drawFlareWave(g) {
    const w = this.flareWave;
    g.save();
    g.globalCompositeOperation = 'lighter';
    const grad = g.createRadialGradient(0, 0, Math.max(0, w.r - 40), 0, 0, w.r + 6);
    grad.addColorStop(0, 'rgba(255,200,120,0)');
    grad.addColorStop(0.8, 'rgba(255,210,140,0.35)');
    grad.addColorStop(1, 'rgba(255,240,200,0)');
    g.fillStyle = grad;
    g.beginPath(); g.arc(0, 0, w.r + 6, 0, TAU); g.fill();
    g.restore();
  }

  drawTexts(g) {
    g.save();
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    const inv = 1 / this.S;
    for (const tx of this.texts) {
      const k = tx.t / 1.3;
      const rise = easeOut(k) * 34;
      const sc = k < 0.12 ? 0.6 + k / 0.12 * 0.4 : 1;
      g.globalAlpha = k > 0.7 ? 1 - (k - 0.7) / 0.3 : 1;
      g.font = `800 ${tx.size * sc * inv * 1.15}px Orbitron, sans-serif`;
      g.shadowColor = tx.color; g.shadowBlur = 12;
      g.fillStyle = '#ffffff';
      g.fillText(tx.text, tx.x, tx.y - rise);
      g.shadowBlur = 0;
      g.globalAlpha *= 0.85;
      g.fillStyle = tx.color;
      g.fillText(tx.text, tx.x, tx.y - rise);
    }
    g.restore();
  }

  // ======================================================================
  // title demo
  // ======================================================================
  makeDemo() {
    const rings = [
      { R: 78, w: 0.55, tiers: [0, 1, 0, 2] },
      { R: 140, w: -0.32, tiers: [3, 1, 4, 0, 2] },
      { R: 215, w: 0.16, tiers: [7, 2, 5, 0, 6, 1, 3] },
    ];
    const out = [];
    rings.forEach((rg, ri) => rg.tiers.forEach((tier, i) => out.push({ tier, R: rg.R, w: rg.w, p: i / rg.tiers.length * TAU + ri, bob: ri * 2 + i })));
    return out;
  }
  updateDemo(dt) {
    if (Math.random() < dt * 3) {
      const a = Math.random() * TAU, R = 120 + Math.random() * 160;
      this.spawn(Math.cos(a) * R, Math.sin(a) * R, -Math.sin(a) * 40, Math.cos(a) * 40, ['#ff6f91', '#c48bff', '#ffb14d', '#5ff0ff'][Math.floor(Math.random() * 4)], 2, 2 + Math.random() * 2, 'dot', 0.2);
    }
    this.stepParticles(dt);
  }
  drawDemo(g) {
    if (!this.sprites.orbs.length) return;
    const t = this.rtime;
    const px = this.sprites.px;
    this.drawParticles(g);
    const items = this.demo.map((d) => {
      const a = d.p + t * d.w;
      const R = d.R + Math.sin(t * 0.7 + d.bob) * 4;
      return { ...d, x: Math.cos(a) * R, y: Math.sin(a) * R, a };
    });
    g.save();
    g.globalCompositeOperation = 'lighter';
    for (const it of items) {
      const sp = this.sprites.orbs[it.tier];
      const gr = sp.GR / px * 0.62;
      g.globalAlpha = 0.5;
      g.drawImage(sp.glow, it.x - gr, it.y - gr, gr * 2, gr * 2);
    }
    g.restore();
    for (const it of items) {
      const sp = this.sprites.orbs[it.tier];
      const half = sp.D / 2 / px * 0.62;
      g.save();
      g.translate(it.x, it.y);
      g.rotate(it.a * 2);
      g.drawImage(sp.body, -half, -half, half * 2, half * 2);
      g.rotate(-it.a * 2);
      g.drawImage(sp.shade, -half, -half, half * 2, half * 2);
      g.restore();
    }
  }

  // ======================================================================
  // main loop
  // ======================================================================
  loop(now, manual) {
    if (!manual) requestAnimationFrame((t) => this.loop(t));
    this.lastLoop = performance.now();
    const rdt = Math.min(0.05, Math.max(0, (now - this.lastFrame) / 1000));
    this.lastFrame = now;
    this.rtime += rdt;
    if (this.state === 'paused') { this.render(0); return; }
    let dt = rdt;
    if (this.hitstop > 0) { this.hitstop -= rdt; dt = rdt * 0.1; }
    this.update(dt, rdt);
    this.render(rdt);
    this.updateHUD(rdt);
    this.autoQuality(rdt);
  }

  autoQuality(rdt) {
    if (this.autoQualityChecked || this.state !== 'play') return;
    this.frameTimes.push(rdt);
    if (this.frameTimes.length < 180) return;
    this.autoQualityChecked = true;
    const avg = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    if (avg > 0.024 && this.settings.quality !== 'low' && !store.get('qualityTouched', false)) {
      this.settings.quality = this.settings.quality === 'high' ? 'med' : 'low';
      this.resize();
      this.applySettingsUI();
    }
  }

  // ======================================================================
  // HUD & UI
  // ======================================================================
  showHUD(on) { $('hud').classList.toggle('hidden', !on); }

  updateHUD(rdt) {
    if (!this.icons || this.state === 'title') return;
    const c = this.uiCache;
    // score roll-up
    if (this.shownScore !== this.score) {
      const diff = this.score - this.shownScore;
      this.shownScore = Math.abs(diff) < 1 ? this.score : this.shownScore + diff * Math.min(1, rdt * 10);
      const txt = fmt(this.shownScore);
      if (c.score !== txt) {
        $('score').textContent = txt; c.score = txt;
        if (diff > 400 && !c.bumping) { const el = $('score'); el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
      }
    }
    const best = fmt(Math.max(this.records.best, this.score));
    if (c.best !== best) { $('best').textContent = best; c.best = best; }
    const chainLeft = clamp(1 - (this.time - this.lastMergeT) / CFG.chainWindow, 0, 1);
    const mult = chainLeft > 0 ? this.mult() : 1;
    const mtxt = `×${mult.toFixed(2).replace(/0$/, "")}`;
    if (c.mult !== mtxt) { $('multVal').textContent = mtxt; $('mult').classList.toggle('hot', mult > 1); c.mult = mtxt; }
    $('chainBar').style.width = `${(chainLeft * 100).toFixed(1)}%`;

    // queue
    const qKey = [this.current, ...this.queue].join(',');
    if (c.queue !== qKey) {
      c.queue = qKey;
      const show = [this.current, ...this.queue.slice(0, 1 + this.boon('foresight'))];
      $('queue').innerHTML = show.map((k) => `<img src="${this.icons[k]}" alt="${info(k).name}">`).join('') + `<div class="q-name">${info(this.current).name}</div>`;
    }
    const hKey = this.holds.join(',') + '|' + this.holdUsed + '|' + this.boon('hold');
    if (c.holds !== hKey) {
      c.holds = hKey;
      const cap = 1 + this.boon('hold');
      let html = '';
      for (let i = 0; i < cap; i++) { const k = this.holds[i]; html += `<div class="slot">${k != null ? `<img src="${this.icons[k]}" alt="${info(k).name}">` : ''}</div>`; }
      $('holds').innerHTML = html;
      $('holdBtn').classList.toggle('used', this.holdUsed);
    }
    // star panel
    const sKey = `${this.starIndex}|${this.core.iron}|${Object.entries(this.boons).join()}`;
    if (c.star !== sKey) {
      c.star = sKey;
      $('starIndex').textContent = `STAR ${this.starIndex + 1}`;
      $('starName').textContent = this.star.name;
      $('starCls').textContent = this.star.cls;
      let pips = '';
      for (let i = 0; i < this.star.iron; i++) pips += `<i class="${i < this.core.iron ? 'on' : ''}"></i>`;
      $('ironPips').innerHTML = pips;
      const mods = this.star.mods.map((m) => `<span title="${MOD_INFO[m].desc}">${MOD_INFO[m].label}</span>`);
      const boons = Object.entries(this.boons).map(([id, n]) => { const b = BOONS.find((x) => x.id === id); return `<span class="boon" title="${b.desc}">${b.icon} ${b.name}${n > 1 ? ' ×' + n : ''}</span>`; });
      $('mods').innerHTML = mods.concat(boons).join('');
    }
    // ladder
    const lKey = [...this.seenTiers].sort().join(',') + '|' + this.stats.topTier;
    if (c.ladder !== lKey) {
      c.ladder = lKey;
      document.querySelectorAll('#ladder > div').forEach((d) => {
        const t = +d.dataset.t;
        d.classList.toggle('seen', this.seenTiers.has(t));
        d.classList.toggle('top', t === this.stats.topTier);
      });
    }
    // flare
    const fk = Math.round(this.flareMeter * 100);
    if (c.flare !== fk) {
      const wasReady = c.flare === 100;
      c.flare = fk;
      $('flareRing').style.strokeDashoffset = (276.5 * (1 - this.flareMeter)).toFixed(1);
      $('flareBtn').classList.toggle('ready', fk >= 100);
      if (fk >= 100 && !wasReady && this.state === 'play') { this.audio.flareReady(); this.toast('SOLAR FLARE READY · PRESS F', 'gold'); }
    }
  }

  toast(text, cls = '') {
    const el = document.createElement('div');
    el.className = `toast ${cls}`;
    el.textContent = text;
    const box = $('toasts');
    box.appendChild(el);
    while (box.children.length > 3) box.firstChild.remove();
    setTimeout(() => el.remove(), 2700);
  }

  showIntro() {
    const st = this.star;
    $('introKicker').textContent = `STAR ${st.index + 1} · ${st.cls.toUpperCase()}`;
    $('introName').textContent = st.name;
    $('introGoal').textContent = `Feed ${st.iron} iron to the core`;
    $('introMods').innerHTML = st.mods.filter((m) => m !== 'neutron' || st.index === 1).map((m) => `<div>⚠ ${MOD_INFO[m].label}: ${MOD_INFO[m].desc}</div>`).join('');
    const el = $('intro');
    el.classList.add('hidden'); void el.offsetWidth; el.classList.remove('hidden');
    clearTimeout(this.introTimer);
    this.introTimer = setTimeout(() => el.classList.add('hidden'), 3700);
  }

  showBoons() {
    this.state = 'boons';
    this.showHUD(false);
    const avail = BOONS.filter((b) => this.boon(b.id) < b.max);
    const picks = [];
    while (picks.length < 3 && avail.length) picks.push(avail.splice(Math.floor(Math.random() * avail.length), 1)[0]);
    $('novaKicker').textContent = `STAR ${this.starIndex + 1} · ${this.star.name}`;
    $('novaScore').textContent = `+${fmt(this.novaBonus)}  ·  ${fmt(this.score)} total`;
    const cards = $('boonCards');
    cards.innerHTML = picks.map((b, i) => `
      <button class="boon panel" data-id="${b.id}" style="animation-delay:${0.25 + i * 0.12}s" type="button">
        <div class="bi">${b.icon}</div><h3>${b.name}</h3><p>${b.desc}</p>
        <div class="lvl">${this.boon(b.id) ? `LEVEL ${this.boon(b.id)} → ${this.boon(b.id) + 1}` : 'NEW'}</div><kbd>${i + 1}</kbd>
      </button>`).join('');
    cards.querySelectorAll('.boon').forEach((btn) => btn.addEventListener('click', () => this.pickBoon(btn.dataset.id)));
    this.boonPicks = picks;
    if (!picks.length) { this.pickBoon(null); return; }
    if (this.auto) setTimeout(() => this.pickBoon(picks[0].id), 2500);
    $('boons').classList.remove('hidden');
    if (this.starIndex + 1 > this.records.furthest) { this.records.furthest = this.starIndex + 1; this.saveRecords(); }
  }
  pickBoon(id) {
    if (this.state !== 'boons') return;
    if (id) { this.boons[id] = (this.boons[id] || 0) + 1; this.audio.boon(); }
    $('boons').classList.add('hidden');
    this.audio.restoreMusic();
    this.startStar(this.starIndex + 1);
  }

  gameOver() {
    this.state = 'over';
    const secs = Math.round((performance.now() - this.stats.started) / 1000);
    const top = ELEMENTS[this.stats.topTier];
    $('goKicker').textContent = `STAR ${this.starIndex + 1} · ${this.star.name}`;
    $('goStats').innerHTML = [
      ['SCORE', fmt(this.score)], ['SUPERNOVAE', this.stats.novae],
      ['HEAVIEST', `${top.sym} · ${top.name}`], ['BEST CHAIN', `×${Math.max(1, this.stats.bestChain)}`],
      ['FUSIONS', this.stats.fusions], ['TIME', `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`],
    ].map(([k, v]) => `<div class="stat"><span>${k}</span><b>${v}</b></div>`).join('');
    const isBest = this.score >= this.records.best && this.score > 0;
    $('goBest').textContent = isBest ? '★ NEW PERSONAL BEST ★' : `BEST ${fmt(this.records.best)}`;
    if (this.starIndex + 1 > this.records.furthest) this.records.furthest = this.starIndex + 1;
    this.saveRecords();
    $('gameover').classList.remove('hidden');
  }

  toTitle() {
    ['gameover', 'pause', 'boons'].forEach((id) => $(id).classList.add('hidden'));
    this.showHUD(false);
    this.hideCoach();
    this.state = 'title';
    this.bodies = []; this.particles = []; this.shocks = []; this.texts = [];
    this.nova = 0; this.eject = 0; this.implode = 0; this.heat = 0;
    this.star = starFor(0);
    this.dangerR = CFG.dangerR;
    this.core = { r: CFG.coreR0, iron: 0, pulse: 0 };
    this.audio.restoreMusic();
    this.renderRecords();
    $('title').classList.remove('hidden');
  }
  startGame() {
    $('title').classList.add('hidden');
    $('gameover').classList.add('hidden');
    this.nova = 0; this.eject = 0; this.particles = []; this.shocks = []; this.texts = [];
    this.newRun();
    this.audio.restoreMusic();
  }
  renderRecords() {
    const r = this.records;
    $('records').innerHTML = `<div>BEST<b>${fmt(r.best)}</b></div><div>FURTHEST<b>STAR ${Math.max(1, r.furthest)}</b></div><div>SUPERNOVAE<b>${r.novae}</b></div>`;
  }

  pause(on) {
    if (on && this.state === 'play') {
      this.prevState = 'play';
      this.state = 'paused';
      this.audio.suspend(true);
      const secs = Math.round((performance.now() - this.stats.started) / 1000);
      $('pauseStats').innerHTML = [
        ['SCORE', fmt(this.score)], ['STAR', `${this.starIndex + 1} · ${this.star.name}`],
        ['IRON', `${this.core.iron} / ${this.star.iron}`], ['TIME', `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`],
      ].map(([k, v]) => `<div class="stat"><span>${k}</span><b>${v}</b></div>`).join('');
      $('pause').classList.remove('hidden');
    } else if (!on && this.state === 'paused') {
      this.state = this.prevState || 'play';
      this.audio.suspend(false);
      $('pause').classList.add('hidden');
      this.lastFrame = performance.now();
    }
  }

  // ---------- tutorial coach ----------
  showTut() {
    const msgs = [
      'Move around the star to <b>aim</b>. <b>Click</b> or tap to release the element toward the core.',
      'Land two <b>identical</b> elements together to <b>fuse</b> them. Near-misses glow and pull together.',
      'Keep everything <b>inside the glowing ring</b>. Anything lingering outside starts a countdown.',
      'Climb to <b>Iron (Fe)</b>. The core devours iron. Feed it to trigger a <b>supernova</b>.',
      'Tip: <b>Right-click / C</b> stashes the current element in <b>HOLD</b>.',
      'Fusions charge the <b>Solar Flare</b>. When it glows, press <b>F</b> to vaporize all H &amp; He.',
    ];
    if (this.tut >= msgs.length) { this.hideCoach(); this.tut = 99; this.tutorialDone = true; store.set('tutorial', true); return; }
    const el = $('coach');
    el.innerHTML = msgs[this.tut];
    el.classList.remove('hidden');
    this.tutT = 0;
  }
  advanceTut(n) { if (this.tut >= 90) return; this.tut = Math.max(this.tut, n); this.showTut(); }
  tutTick(dt) {
    this.tutT += dt;
    if (this.tut === 2 && this.tutT > 6) this.advanceTut(3);
    else if (this.tut === 3 && this.tutT > 9) this.advanceTut(4);
    else if (this.tut === 4 && this.tutT > 8) this.advanceTut(5);
    else if (this.tut === 5 && this.tutT > 9) this.advanceTut(6);
  }
  hideCoach() { $('coach').classList.add('hidden'); }

  // ---------- settings ----------
  applySettingsUI() {
    const s = this.settings;
    $('optMusic').value = s.music; $('optSfx').value = s.sfx;
    $('optShake').checked = s.shake; $('optFlash').checked = s.reducedFlash;
    $('optQuality').value = s.quality; $('optMute').checked = s.mute;
  }
  saveSettings() { store.set('settings', this.settings); }

  bindUI() {
    const open = (id) => { this.audio.ui(); $(id).classList.remove('hidden'); };
    $('playBtn').addEventListener('click', () => { this.audio.init(); this.startGame(); });
    $('howBtn').addEventListener('click', () => { this.audio.init(); open('howto'); });
    $('setBtn').addEventListener('click', () => { this.audio.init(); open('settings'); });
    $('pauseSetBtn').addEventListener('click', () => open('settings'));
    $('pauseHowBtn').addEventListener('click', () => open('howto'));
    document.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => { this.audio.ui(); b.closest('.screen').classList.add('hidden'); }));
    $('resumeBtn').addEventListener('click', () => this.pause(false));
    $('quitBtn').addEventListener('click', () => { this.pause(false); this.state = 'play'; this.phoenixUsed = true; this.die(); });
    $('pauseBtn').addEventListener('click', () => this.pause(true));
    $('againBtn').addEventListener('click', () => this.startGame());
    $('menuBtn').addEventListener('click', () => this.toTitle());
    $('holdBtn').addEventListener('click', (e) => { e.stopPropagation(); this.hold(); });
    $('flareBtn').addEventListener('click', (e) => { e.stopPropagation(); this.flare(); });
    $('optMusic').addEventListener('input', (e) => { this.settings.music = +e.target.value; this.audio.setMusic(this.settings.music); this.saveSettings(); });
    $('optSfx').addEventListener('input', (e) => { this.settings.sfx = +e.target.value; this.audio.setSfx(this.settings.sfx); this.saveSettings(); });
    $('optShake').addEventListener('change', (e) => { this.settings.shake = e.target.checked; this.saveSettings(); });
    $('optFlash').addEventListener('change', (e) => { this.settings.reducedFlash = e.target.checked; this.saveSettings(); });
    $('optMute').addEventListener('change', (e) => { this.settings.mute = e.target.checked; this.audio.setMuted(this.settings.mute); this.saveSettings(); });
    $('optQuality').addEventListener('change', (e) => { this.settings.quality = e.target.value; store.set('qualityTouched', true); this.saveSettings(); this.resize(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden && !this.auto) this.pause(true); });
  }

  bindInput() {
    const cv = this.cv;
    const setAim = (e) => {
      this.pointer.x = e.clientX; this.pointer.y = e.clientY;
      const dx = e.clientX - this.cx, dy = e.clientY - this.cy;
      if (dx * dx + dy * dy > 64) this.aim = Math.atan2(dy, dx);
    };
    cv.addEventListener('contextmenu', (e) => e.preventDefault());
    cv.addEventListener('pointermove', (e) => {
      if (this.state !== 'play') return;
      if (e.pointerType === 'mouse' || this.pointer.down) setAim(e);
    });
    cv.addEventListener('pointerdown', (e) => {
      this.audio.init();
      if (this.state !== 'play') return;
      if (e.pointerType === 'mouse') {
        if (e.button === 2) { this.hold(); return; }
        if (e.button !== 0) return;
        setAim(e); this.launch();
      } else {
        this.pointer.down = true; this.pointer.touch = true;
        cv.setPointerCapture(e.pointerId);
        setAim(e);
      }
    });
    const up = (e) => {
      if (e.pointerType === 'mouse' || !this.pointer.down) return;
      this.pointer.down = false;
      if (this.state === 'play') { setAim(e); this.launch(); }
    };
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', () => { this.pointer.down = false; });

    const held = new Set();
    window.addEventListener('keydown', (e) => {
      const k = e.key.toLowerCase();
      if (this.state === 'boons' && ['1', '2', '3'].includes(k)) { const p = this.boonPicks[+k - 1]; if (p) this.pickBoon(p.id); return; }
      if (k === 'escape' || k === 'p') {
        const open = ['howto', 'settings'].find((id) => !$(id).classList.contains('hidden'));
        if (open) { $(open).classList.add('hidden'); return; }
        if (this.state === 'play') this.pause(true); else if (this.state === 'paused') this.pause(false);
        return;
      }
      if (this.state !== 'play') { if ((k === 'enter' || k === ' ') && this.state === 'title' && document.activeElement === document.body) { e.preventDefault(); this.audio.init(); this.startGame(); } return; }
      this.audio.init();
      if (k === 'arrowleft' || k === 'a') { held.add('l'); e.preventDefault(); }
      else if (k === 'arrowright' || k === 'd') { held.add('r'); e.preventDefault(); }
      else if (k === ' ' || k === 'enter' || k === 'arrowdown' || k === 's') { e.preventDefault(); if (!e.repeat) this.launch(); }
      else if (k === 'c' || k === 'shift' || k === 'arrowup' || k === 'w') { e.preventDefault(); if (!e.repeat) this.hold(); }
      else if (k === 'f' || k === 'e' || k === 'q') { if (!e.repeat) this.flare(); }
      this.keyAim = (held.has('r') ? 1 : 0) - (held.has('l') ? 1 : 0);
    });
    window.addEventListener('keyup', (e) => {
      const k = e.key.toLowerCase();
      if (k === 'arrowleft' || k === 'a') held.delete('l');
      if (k === 'arrowright' || k === 'd') held.delete('r');
      this.keyAim = (held.has('r') ? 1 : 0) - (held.has('l') ? 1 : 0);
    });
    window.addEventListener('blur', () => { held.clear(); this.keyAim = 0; });
  }
}

const game = new Game();
window.__cc2 = game;

// ---- debug / attract hooks: ?auto (bot plays), &star=N (start at star N), &speed=N ----
const params = new URLSearchParams(location.search);
if (params.has('cover')) {
  game.coverMode = true;
  document.body.classList.add('cover-mode');
  game.resize();
}
if (params.has('auto')) {
  game.tutorialDone = true;
  game.auto = true;
  // keep simulating even when the tab is backgrounded (rAF throttled) so automated runs progress
  setInterval(() => { if (performance.now() - (game.lastLoop || 0) > 60) game.loop(performance.now(), true); }, 16);
  setTimeout(() => {
    game.startGame();
    const s = +params.get('star') || 0;
    if (s) game.startStar(s);
  }, 300);
}
