// All sound is synthesized. Dead land is lonely wind; each restored glade adds a layer back.
const SCALE = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24];
const CHORDS = [[0, 7, 12, 16], [-3, 4, 9, 12], [-7, 0, 5, 12], [-5, 2, 7, 14]];
const midi = n => 220 * Math.pow(2, n / 12);

export function createAudio() {
  let ac, master, wind, windGain, water, waterGain, pad, muted = false, life = 0, streak = 0, lastPluck = 0, nextChord = 0, chord = 0, nextBird = 0;
  const noiseBuffer = () => { const b = ac.createBuffer(1, ac.sampleRate * 3, ac.sampleRate), d = b.getChannelData(0); let v = 0; for (let i = 0; i < d.length; i++) { v = v * .985 + (Math.random() * 2 - 1) * .1; d[i] = v; } return b; };
  function start() {
    if (ac) { if (ac.state === 'suspended') ac.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    ac = new AC(); master = ac.createGain(); master.gain.value = muted ? 0 : .8; master.connect(ac.destination);
    const loop = (freq, q, type) => { const n = ac.createBufferSource(); n.buffer = noiseBuffer(); n.loop = true; const f = ac.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q; const g = ac.createGain(); g.gain.value = 0; n.connect(f); f.connect(g); g.connect(master); n.start(); return { g, f }; };
    wind = loop(520, .6, 'lowpass'); windGain = wind.g;
    water = loop(1700, 1.2, 'bandpass'); waterGain = water.g;
    pad = ac.createGain(); pad.gain.value = 0; const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; pad.connect(lp); lp.connect(master);
  }
  function tone(freq, when, dur, peak, type = 'sine', dest = master) {
    const o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(0, when); g.gain.linearRampToValueAtTime(peak, when + Math.min(.02, dur * .2)); g.gain.exponentialRampToValueAtTime(.0005, when + dur);
    o.connect(g); g.connect(dest); o.start(when); o.stop(when + dur + .05);
  }
  function chirp() {
    const t = ac.currentTime, base = 2200 + Math.random() * 1900, n = 2 + Math.floor(Math.random() * 4);
    for (let k = 0; k < n; k++) { const o = ac.createOscillator(), g = ac.createGain(), at = t + k * (.09 + Math.random() * .05); o.frequency.setValueAtTime(base * (1 + Math.random() * .2), at); o.frequency.exponentialRampToValueAtTime(base * (.8 + Math.random() * .5), at + .07); g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(.022, at + .012); g.gain.exponentialRampToValueAtTime(.0004, at + .08); o.connect(g); g.connect(master); o.start(at); o.stop(at + .1); }
  }
  return {
    start,
    get muted() { return muted; },
    setMuted(v) { muted = v; if (ac) master.gain.setTargetAtTime(v ? 0 : .8, ac.currentTime, .1); },
    // Called a few times a second: progress 0..1, whether any water is running, paused state.
    update(progress, hasWater) {
      if (!ac || ac.state !== 'running') return;
      life = progress; const t = ac.currentTime;
      windGain.gain.setTargetAtTime(.2 * (1 - life * .72), t, 1.2);
      wind.f.frequency.setTargetAtTime(380 + Math.sin(t * .13) * 130 + Math.sin(t * .37) * 60, t, 1);
      waterGain.gain.setTargetAtTime(hasWater ? .03 : 0, t, 1.5);
      if (life > .03 && t > nextChord) {
        nextChord = t + 8; chord = (chord + 1) % CHORDS.length;
        pad.gain.setTargetAtTime(Math.min(.09, .025 + life * .08), t, 2);
        CHORDS[chord].forEach((n, k) => { if (k / 4 <= life + .4) tone(midi(n - 12), t, 9, .34, 'triangle', pad); });
      }
      if (life > .08 && t > nextBird) { nextBird = t + (2 + Math.random() * 9) / (.25 + life); chirp(); }
    },
    // Each bit of ground that wakes plucks a note that climbs while the stroke continues.
    pluck(amount) {
      if (!ac || ac.state !== 'running' || amount < .35) return;
      const t = ac.currentTime; if (t - lastPluck < .085) return;
      if (t - lastPluck > .5) streak = 0;
      lastPluck = t; streak = Math.min(SCALE.length * 3 - 1, streak + 1);
      const degree = SCALE[Math.floor(streak / 3) % SCALE.length] + (Math.random() < .25 ? 12 : 0);
      tone(midi(degree + 12), t, .34, .035, 'triangle');
    },
    pop() { if (!ac) return; const t = ac.currentTime; [0, 7, 12].forEach((n, k) => tone(midi(n + 12 + Math.floor(Math.random() * 3) * 2), t + k * .055, .4, .07, 'triangle')); },
    water() { if (!ac) return; const t = ac.currentTime; [0, 4, 7, 12, 16].forEach((n, k) => tone(midi(n + 7), t + k * .13, .9, .05, 'sine')); },
    chime(big = false) { if (!ac) return; const t = ac.currentTime, seq = big ? [0, 4, 7, 12, 16, 19, 24, 28] : [0, 4, 7, 12, 16, 24]; seq.forEach((n, k) => { tone(midi(n + 12), t + k * .14, 2.2, .09, 'sine'); tone(midi(n + 24), t + k * .14, 1.1, .018, 'triangle'); }); },
    buy() { if (!ac) return; const t = ac.currentTime; tone(midi(12), t, .18, .05, 'triangle'); tone(midi(19), t + .07, .28, .05, 'triangle'); },
  };
}
