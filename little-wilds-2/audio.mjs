// All sound is synthesized and kept low, slow and round: sine tones with gentle attacks,
// rolled-off highs and a little room around them. Nothing should ever poke out.
const SCALE = [0, 2, 4, 7, 9, 12];
const CHORDS = [[0, 7, 12, 16], [-3, 4, 9, 12], [-7, 0, 5, 12], [-5, 2, 7, 14]];
const pitch = n => 196 * Math.pow(2, n / 12);

export function createAudio() {
  let ac, master, soft, wind, water, rustle, pad, muted = false, volume = .6;
  let lastNote = 0, lastPop = 0, lastHeal = 0, degree = 2, nextChord = 0, chord = 0, nextCoo = 0;
  const level = () => muted ? 0 : volume;
  const brownNoise = () => {
    const b = ac.createBuffer(1, ac.sampleRate * 4, ac.sampleRate), d = b.getChannelData(0);
    let v = 0;
    for (let i = 0; i < d.length; i++) { v = (v + (Math.random() * 2 - 1) * .02) / 1.02; d[i] = v * 3.5; }
    return b;
  };
  function start() {
    if (ac) { if (ac.state === 'suspended') ac.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ac = new AC();
    master = ac.createGain(); master.gain.value = level();
    const limiter = ac.createDynamicsCompressor(); limiter.threshold.value = -24; limiter.ratio.value = 6; limiter.attack.value = .02; limiter.release.value = .4;
    master.connect(limiter); limiter.connect(ac.destination);

    // Every note passes through this: highs rolled off, with a quiet room echo behind it.
    soft = ac.createBiquadFilter(); soft.type = 'lowpass'; soft.frequency.value = 1500; soft.Q.value = .3;
    const dry = ac.createGain(); dry.gain.value = .8; soft.connect(dry); dry.connect(master);
    const delay = ac.createDelay(1); delay.delayTime.value = .34;
    const back = ac.createGain(); back.gain.value = .38;
    const dark = ac.createBiquadFilter(); dark.type = 'lowpass'; dark.frequency.value = 850;
    const wet = ac.createGain(); wet.gain.value = .3;
    soft.connect(delay); delay.connect(dark); dark.connect(back); back.connect(delay); dark.connect(wet); wet.connect(master);

    const bed = (freq, type = 'lowpass') => {
      const n = ac.createBufferSource(); n.buffer = brownNoise(); n.loop = true;
      const f = ac.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = .4;
      const g = ac.createGain(); g.gain.value = 0;
      n.connect(f); f.connect(g); g.connect(master); n.start();
      return { g, f };
    };
    wind = bed(260); water = bed(620); rustle = bed(520);
    pad = ac.createGain(); pad.gain.value = 0; pad.connect(soft);
  }
  // A rounded note: never a sharp attack, always a long fade.
  function note(freq, when, peak, attack = .04, dur = 1.4, dest = soft) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(peak, when + attack);
    g.gain.exponentialRampToValueAtTime(.0003, when + attack + dur);
    o.connect(g); g.connect(dest); o.start(when); o.stop(when + attack + dur + .05);
  }
  // A far-off wood dove, in place of bright chirping.
  function coo() {
    const t = ac.currentTime, base = pitch(10 + Math.floor(Math.random() * 3));
    [0, .42, .78].forEach((at, k) => { const o = ac.createOscillator(), g = ac.createGain(), w = t + at; o.frequency.setValueAtTime(base * (k === 1 ? 1.06 : 1), w); o.frequency.linearRampToValueAtTime(base * .94, w + .32); g.gain.setValueAtTime(0, w); g.gain.linearRampToValueAtTime(.009, w + .1); g.gain.linearRampToValueAtTime(0, w + .34); o.connect(g); g.connect(soft); o.start(w); o.stop(w + .36); });
  }
  return {
    start,
    get muted() { return muted; },
    get volume() { return volume; },
    setMuted(v) { muted = v; if (ac) master.gain.setTargetAtTime(level(), ac.currentTime, .15); },
    setVolume(v) { volume = v; if (ac) master.gain.setTargetAtTime(level(), ac.currentTime, .08); },
    // Called a few times a second: progress 0..1 and whether any water is running.
    update(progress, hasWater) {
      if (!ac || ac.state !== 'running') return;
      const t = ac.currentTime;
      wind.g.gain.setTargetAtTime(.075 * (1 - progress * .75), t, 2);
      wind.f.frequency.setTargetAtTime(240 + Math.sin(t * .11) * 60, t, 2);
      water.g.gain.setTargetAtTime(hasWater ? .035 : 0, t, 2.5);
      if (t - lastHeal > .25) rustle.g.gain.setTargetAtTime(0, t, .35);
      if (progress > .02 && t > nextChord) {
        nextChord = t + 11; chord = (chord + 1) % CHORDS.length;
        pad.gain.setTargetAtTime(Math.min(.05, .018 + progress * .04), t, 3);
        CHORDS[chord].forEach((n, k) => { if (k / 4 <= progress + .4) note(pitch(n - 12), t + k * .25, .3, 3, 10, pad); });
      }
      if (progress > .2 && t > nextCoo) { nextCoo = t + 24 + Math.random() * 40; coo(); }
    },
    // Healing is a soft rustle of earth, with an occasional quiet note rather than a run of them.
    pluck(amount) {
      if (!ac || ac.state !== 'running' || amount < .35) return;
      const t = ac.currentTime;
      lastHeal = t;
      rustle.g.gain.setTargetAtTime(.05, t, .18);
      if (t - lastNote < .9) return;
      lastNote = t;
      degree = Math.max(0, Math.min(SCALE.length - 1, degree + (Math.random() < .5 ? -1 : 1)));
      note(pitch(SCALE[degree] + 12), t, .03, .05, 1.5);
    },
    pop() { if (!ac) return; const t = ac.currentTime; if (t - lastPop < .3) return; lastPop = t; note(pitch(SCALE[Math.floor(Math.random() * 4)] + 7), t, .05, .03, .8); },
    water() { if (!ac) return; const t = ac.currentTime; [0, 4, 7].forEach((n, k) => note(pitch(n + 7), t + k * .3, .03, .1, 2)); },
    chime(big = false) { if (!ac) return; const t = ac.currentTime; (big ? [0, 4, 7, 12, 16] : [0, 4, 7, 12]).forEach((n, k) => note(pitch(n + 12), t + k * .36, .045, .05, 2.8)); },
    buy() { if (!ac) return; const t = ac.currentTime; note(pitch(12), t, .035, .03, .6); note(pitch(16), t + .12, .03, .03, .7); },
  };
}
