// CORE COLLAPSE II — fully procedural Web Audio: generative ambient score + synthesized SFX.

const SCALE = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24, 26, 28, 31]; // major pentatonic, extended
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

export class Audio {
  constructor() {
    this.ctx = null;
    this.musicVol = 0.55;
    this.sfxVol = 0.8;
    this.muted = false;
    this.lastImpact = 0;
    this.chordIndex = 0;
    this.intensity = 0; // 0..1 drives music brightness
    this.musicTimer = null;
  }

  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = this.ctx = new AC();
    this.master = ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.9;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.knee.value = 12; comp.ratio.value = 4;
    comp.attack.value = 0.004; comp.release.value = 0.22;
    this.master.connect(comp).connect(ctx.destination);

    this.reverb = ctx.createConvolver();
    this.reverb.buffer = this.impulse(3.4, 2.6);
    this.revGain = ctx.createGain(); this.revGain.gain.value = 0.55;
    this.reverb.connect(this.revGain).connect(this.master);

    this.sfx = ctx.createGain(); this.sfx.gain.value = this.sfxVol;
    this.sfx.connect(this.master);
    this.sfxSend = ctx.createGain(); this.sfxSend.gain.value = 0.35;
    this.sfx.connect(this.sfxSend).connect(this.reverb);

    this.music = ctx.createGain(); this.music.gain.value = this.musicVol * 0.5;
    this.musicFilter = ctx.createBiquadFilter();
    this.musicFilter.type = 'lowpass'; this.musicFilter.frequency.value = 900; this.musicFilter.Q.value = 0.6;
    this.music.connect(this.musicFilter);
    this.musicFilter.connect(this.master);
    const mSend = ctx.createGain(); mSend.gain.value = 0.8;
    this.musicFilter.connect(mSend).connect(this.reverb);

    this.noiseBuf = this.makeNoise(2);
    this.startMusic();
  }

  impulse(sec, decay) {
    const ctx = this.ctx, len = Math.floor(ctx.sampleRate * sec);
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return buf;
  }
  makeNoise(sec) {
    const ctx = this.ctx, len = Math.floor(ctx.sampleRate * sec);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  setMuted(m) {
    this.muted = m;
    if (this.master) this.master.gain.setTargetAtTime(m ? 0 : 0.9, this.ctx.currentTime, 0.05);
  }
  setMusic(v) { this.musicVol = v; if (this.music) this.music.gain.setTargetAtTime(v * 0.5, this.ctx.currentTime, 0.2); }
  setSfx(v) { this.sfxVol = v; if (this.sfx) this.sfx.gain.setTargetAtTime(v, this.ctx.currentTime, 0.05); }
  suspend(s) { if (!this.ctx) return; s ? this.ctx.suspend() : this.ctx.resume(); }

  // ---------- music ----------
  startMusic() {
    const progression = [
      [50, 57, 62, 66, 69], // D maj9-ish
      [47, 54, 59, 62, 66], // Bm
      [43, 50, 55, 59, 64], // G
      [45, 52, 57, 61, 64], // A
    ];
    const ctx = this.ctx;
    let next = ctx.currentTime + 0.1;
    const barLen = 6.4;
    const tick = () => {
      if (!this.ctx) return;
      while (next < ctx.currentTime + 1.5) {
        const chord = progression[this.chordIndex % progression.length];
        this.chordIndex++;
        this.pad(chord, next, barLen);
        // sparse arpeggio / sparkles, denser with intensity
        const notes = 3 + Math.floor(this.intensity * 6);
        for (let i = 0; i < notes; i++) {
          if (Math.random() < 0.55) {
            const t = next + (i / notes) * barLen + Math.random() * 0.08;
            const base = chord[0] + 24;
            const m = base + SCALE[Math.floor(Math.random() * 8)];
            this.pluck(m, t, 0.05 + this.intensity * 0.04);
          }
        }
        this.sub(chord[0] - 12, next, barLen);
        next += barLen;
      }
      this.musicFilter.frequency.setTargetAtTime(700 + this.intensity * 2600, ctx.currentTime, 1.5);
    };
    tick();
    this.musicTimer = setInterval(tick, 400);
  }
  pad(chord, t, dur) {
    const ctx = this.ctx;
    for (const m of chord.slice(1)) {
      for (const det of [-7, 7]) {
        const o = ctx.createOscillator();
        o.type = 'sawtooth';
        o.frequency.value = mtof(m);
        o.detune.value = det + (Math.random() - 0.5) * 4;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.018, t + dur * 0.35);
        g.gain.linearRampToValueAtTime(0.0, t + dur * 1.05);
        o.connect(g).connect(this.music);
        o.start(t); o.stop(t + dur * 1.1);
      }
    }
  }
  sub(m, t, dur) {
    const ctx = this.ctx;
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = mtof(m);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.09, t + 1.2);
    g.gain.linearRampToValueAtTime(0, t + dur);
    o.connect(g).connect(this.music);
    o.start(t); o.stop(t + dur + 0.1);
  }
  pluck(m, t, vol) {
    const ctx = this.ctx;
    const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = mtof(m);
    const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = mtof(m + 12);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
    o.connect(g); o2.connect(g); g.connect(this.music);
    o.start(t); o2.start(t); o.stop(t + 2.3); o2.stop(t + 2.3);
  }

  // ---------- sfx helpers ----------
  get ok() { return this.ctx && this.ctx.state === 'running'; }
  env(g, t, a, peak, d) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  }
  noise(t, dur, { type = 'bandpass', f0 = 1000, f1 = 1000, q = 1, vol = 0.3, a = 0.005, pan = 0 } = {}) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource(); src.buffer = this.noiseBuf;
    const f = ctx.createBiquadFilter(); f.type = type; f.Q.value = q;
    f.frequency.setValueAtTime(f0, t);
    f.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    const g = ctx.createGain(); this.env(g, t, a, vol, dur);
    const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    src.connect(f).connect(g);
    if (p) { p.pan.value = pan; g.connect(p).connect(this.sfx); } else g.connect(this.sfx);
    src.start(t, Math.random()); src.stop(t + a + dur + 0.05);
  }
  tone(t, freq, dur, { type = 'sine', vol = 0.2, a = 0.004, slide = 0, pan = 0, dest } = {}) {
    const ctx = this.ctx;
    const o = ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq * slide), t + dur);
    const g = ctx.createGain(); this.env(g, t, a, vol, dur);
    const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    o.connect(g);
    if (p) { p.pan.value = pan; g.connect(p).connect(dest || this.sfx); } else g.connect(dest || this.sfx);
    o.start(t); o.stop(t + a + dur + 0.05);
  }

  // ---------- game sounds ----------
  launch(pan) {
    if (!this.ok) return;
    const t = this.ctx.currentTime;
    this.noise(t, 0.28, { f0: 3000, f1: 500, q: 1.5, vol: 0.14, a: 0.02, pan });
    this.tone(t, 520, 0.16, { type: 'sine', vol: 0.06, slide: 0.5, pan });
  }
  impact(strength, pan) {
    if (!this.ok) return;
    const t = this.ctx.currentTime;
    if (t - this.lastImpact < 0.045) return;
    this.lastImpact = t;
    const v = Math.min(1, strength);
    this.noise(t, 0.07, { f0: 1800 + v * 1500, f1: 600, q: 3, vol: 0.05 + v * 0.1, pan });
    this.tone(t, 160 + v * 90, 0.09, { type: 'sine', vol: 0.06 * v, slide: 0.6, pan });
  }
  merge(tier, combo, pan) {
    if (!this.ok) return;
    const t = this.ctx.currentTime;
    const idx = Math.min(SCALE.length - 1, tier + Math.min(combo - 1, 6));
    const m = 62 + SCALE[idx];
    const f = mtof(m);
    this.tone(t, f, 1.1, { type: 'sine', vol: 0.16, pan });
    this.tone(t, f * 2.01, 0.6, { type: 'sine', vol: 0.06, pan });
    this.tone(t, f * 3.0, 0.35, { type: 'triangle', vol: 0.03, pan });
    this.tone(t, f / 2, 0.25, { type: 'triangle', vol: 0.08, slide: 0.7, pan });
    this.noise(t, 0.18, { type: 'highpass', f0: 4000, f1: 9000, vol: 0.05, pan });
    if (tier >= 4) {
      this.tone(t, mtof(m - 24), 0.9, { type: 'sine', vol: 0.18 + tier * 0.02, slide: 0.5 });
      this.noise(t, 0.6, { type: 'lowpass', f0: 1200, f1: 80, vol: 0.12 + tier * 0.02 });
    }
    this.intensity = Math.min(1, this.intensity + 0.04 + tier * 0.015);
  }
  neutron(pan) {
    if (!this.ok) return;
    const t = this.ctx.currentTime;
    for (let i = 0; i < 4; i++) this.tone(t + i * 0.05, mtof(86 + SCALE[i * 2]), 0.5, { type: 'sine', vol: 0.06, pan });
  }
  absorb() {
    if (!this.ok) return;
    const t = this.ctx.currentTime;
    this.tone(t, 90, 1.8, { type: 'sine', vol: 0.45, slide: 0.35 });
    this.tone(t, 45, 2.2, { type: 'sine', vol: 0.35, slide: 0.5 });
    this.noise(t, 1.4, { type: 'lowpass', f0: 2500, f1: 60, vol: 0.3, a: 0.01 });
    [74, 78, 81, 86].forEach((m, i) => this.tone(t + 0.12 + i * 0.07, mtof(m), 1.6, { vol: 0.05 }));
  }
  danger(level) {
    if (!this.ok) return;
    const t = this.ctx.currentTime;
    this.tone(t, 880 + level * 220, 0.12, { type: 'square', vol: 0.025 });
    this.tone(t, 440 + level * 110, 0.2, { type: 'sine', vol: 0.06 });
  }
  hold() {
    if (!this.ok) return;
    const t = this.ctx.currentTime;
    this.tone(t, 660, 0.12, { vol: 0.07, slide: 1.5 });
    this.tone(t + 0.06, 990, 0.14, { vol: 0.05 });
  }
  denied() {
    if (!this.ok) return;
    const t = this.ctx.currentTime;
    this.tone(t, 180, 0.15, { type: 'triangle', vol: 0.08, slide: 0.8 });
  }
  flareReady() {
    if (!this.ok) return;
    const t = this.ctx.currentTime;
    [69, 74, 78, 81].forEach((m, i) => this.tone(t + i * 0.06, mtof(m + 12), 0.5, { vol: 0.06 }));
  }
  flare() {
    if (!this.ok) return;
    const t = this.ctx.currentTime;
    this.noise(t, 1.2, { type: 'bandpass', f0: 300, f1: 6000, q: 0.7, vol: 0.4, a: 0.25 });
    this.tone(t, 110, 1.5, { type: 'sawtooth', vol: 0.08, slide: 4 });
    this.tone(t + 0.3, 55, 1.6, { type: 'sine', vol: 0.4, slide: 0.6 });
  }
  stellarFlare() {
    if (!this.ok) return;
    const t = this.ctx.currentTime;
    this.noise(t, 1.6, { type: 'bandpass', f0: 200, f1: 1600, q: 1.2, vol: 0.35, a: 0.4 });
    this.tone(t, 70, 1.6, { type: 'sine', vol: 0.3, slide: 1.6 });
  }
  warnFlare() {
    if (!this.ok) return;
    const t = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) this.tone(t + i * 0.22, 1046, 0.1, { type: 'triangle', vol: 0.06 });
  }
  collapse() { // implosion rumble
    if (!this.ok) return;
    const t = this.ctx.currentTime;
    this.tone(t, 220, 1.4, { type: 'sawtooth', vol: 0.12, slide: 0.12, a: 0.3 });
    this.noise(t, 1.4, { type: 'lowpass', f0: 4000, f1: 60, vol: 0.35, a: 0.6 });
    this.music.gain.setTargetAtTime(0.0001, t, 0.3);
  }
  supernova() {
    if (!this.ok) return;
    const t = this.ctx.currentTime;
    this.noise(t, 4.5, { type: 'lowpass', f0: 9000, f1: 50, q: 0.5, vol: 0.9, a: 0.01 });
    this.tone(t, 60, 4, { type: 'sine', vol: 0.8, slide: 0.4 });
    this.tone(t, 30, 5, { type: 'sine', vol: 0.6, slide: 0.6 });
    // shimmering choir-like chord swell
    [62, 66, 69, 74, 78, 81, 86].forEach((m, i) => {
      this.tone(t + 0.6 + i * 0.05, mtof(m), 5, { type: 'sine', vol: 0.05, a: 1.2 });
      this.tone(t + 0.6 + i * 0.05, mtof(m) * 1.003, 5, { type: 'triangle', vol: 0.025, a: 1.4 });
    });
    this.music.gain.setTargetAtTime(this.musicVol * 0.5, t + 4, 1.2);
    this.intensity = 0;
  }
  ejection() {
    if (!this.ok) return;
    const t = this.ctx.currentTime;
    this.noise(t, 3.5, { type: 'bandpass', f0: 800, f1: 100, q: 0.8, vol: 0.5, a: 0.3 });
    [62, 61, 57, 50].forEach((m, i) => this.tone(t + i * 0.45, mtof(m), 1.4, { type: 'triangle', vol: 0.08 }));
    this.music.gain.setTargetAtTime(this.musicVol * 0.2, t, 0.8);
    this.intensity = 0;
  }
  restoreMusic() { if (this.music) this.music.gain.setTargetAtTime(this.musicVol * 0.5, this.ctx.currentTime, 0.8); }
  ui() {
    if (!this.ok) return;
    const t = this.ctx.currentTime;
    this.tone(t, 880, 0.08, { vol: 0.05 });
  }
  boon() {
    if (!this.ok) return;
    const t = this.ctx.currentTime;
    [62, 69, 74, 78, 86].forEach((m, i) => this.tone(t + i * 0.07, mtof(m), 1.2, { vol: 0.07 }));
  }
  decay(dt) { this.intensity = Math.max(0, this.intensity - dt * 0.03); }
}
