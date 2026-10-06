// CORE COLLAPSE II — procedural orb sprites. Every element has its own inner motif.
import { ELEMENTS, NEUTRON, DARK } from './data.js';

function rng(seed) {
  let s = seed >>> 0;
  return () => { s += 0x6d2b79f5; let t = Math.imul(s ^ (s >>> 15), 1 | s); t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const hexA = (hex, a) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};
const mk = (w, h = w) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };

function motif(g, kind, R, el, rand) {
  g.save();
  switch (kind) {
    case 0: // hydrogen: soft wisps
      g.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 14; i++) {
        const a = rand() * Math.PI * 2, d = rand() * R * 0.7;
        g.strokeStyle = hexA(el.color, 0.08 + rand() * 0.14);
        g.lineWidth = R * (0.08 + rand() * 0.14);
        g.lineCap = 'round';
        g.beginPath();
        g.arc(Math.cos(a) * d, Math.sin(a) * d, R * (0.3 + rand() * 0.6), rand() * 6, rand() * 6 + 1.6);
        g.stroke();
      }
      break;
    case 1: // helium: nested rings
      g.globalCompositeOperation = 'lighter';
      for (let i = 1; i < 7; i++) {
        g.strokeStyle = hexA(el.color, 0.06 + (i % 2) * 0.1);
        g.lineWidth = R * 0.07;
        g.beginPath(); g.ellipse(R * 0.06, -R * 0.04, R * i * 0.14, R * i * 0.12, 0.4, 0, Math.PI * 2); g.stroke();
      }
      break;
    case 2: { // carbon: crystal lattice facets
      g.globalCompositeOperation = 'lighter';
      const s = R * 0.36;
      for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) {
        const cx = (x + (y % 2) * 0.5) * s * 1.1, cy = y * s * 0.95;
        if (cx * cx + cy * cy > R * R * 1.2) continue;
        g.beginPath();
        for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2 + Math.PI / 6; g.lineTo(cx + Math.cos(a) * s * 0.55, cy + Math.sin(a) * s * 0.55); }
        g.closePath();
        g.fillStyle = hexA(el.color, rand() * 0.16);
        g.fill();
        g.strokeStyle = hexA('#ffffff', 0.12); g.lineWidth = R * 0.02; g.stroke();
      }
      break;
    }
    case 3: // oxygen: caustics
      g.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 26; i++) {
        const a = rand() * Math.PI * 2, d = rand() * R * 0.85, rr = R * (0.08 + rand() * 0.22);
        g.strokeStyle = hexA(i % 3 ? el.color : '#e8f4ff', 0.12 + rand() * 0.2);
        g.lineWidth = R * 0.035;
        g.beginPath(); g.ellipse(Math.cos(a) * d, Math.sin(a) * d, rr, rr * (0.5 + rand() * 0.5), rand() * 3, 0, Math.PI * 2); g.stroke();
      }
      break;
    case 4: // neon: lightning filaments
      g.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 9; i++) {
        g.strokeStyle = hexA(i % 2 ? '#fff1c4' : el.color, 0.35);
        g.lineWidth = R * (0.025 + rand() * 0.03);
        g.shadowColor = el.glow; g.shadowBlur = R * 0.15;
        g.beginPath();
        let a = rand() * Math.PI * 2, x = Math.cos(a) * R * 0.1, y = Math.sin(a) * R * 0.1;
        g.moveTo(x, y);
        for (let k = 0; k < 7; k++) { a += (rand() - 0.5) * 1.6; x += Math.cos(a) * R * 0.15; y += Math.sin(a) * R * 0.15; g.lineTo(x, y); }
        g.stroke();
      }
      break;
    case 5: // magnesium: bright speckle burn
      g.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 90; i++) {
        const a = rand() * Math.PI * 2, d = Math.sqrt(rand()) * R * 0.95, rr = R * (0.015 + rand() * 0.05);
        const gr = g.createRadialGradient(Math.cos(a) * d, Math.sin(a) * d, 0, Math.cos(a) * d, Math.sin(a) * d, rr * 3);
        gr.addColorStop(0, hexA('#ffffff', 0.6)); gr.addColorStop(0.3, hexA(el.color, 0.35)); gr.addColorStop(1, hexA(el.color, 0));
        g.fillStyle = gr; g.beginPath(); g.arc(Math.cos(a) * d, Math.sin(a) * d, rr * 3, 0, Math.PI * 2); g.fill();
      }
      break;
    case 6: // silicon: gas-giant bands
      for (let i = -8; i <= 8; i++) {
        const y = i * R * 0.12 + (rand() - 0.5) * R * 0.05;
        g.fillStyle = hexA(i % 2 ? '#fff4c0' : el.deep, 0.12 + rand() * 0.18);
        g.beginPath();
        g.moveTo(-R, y);
        for (let x = -R; x <= R; x += R * 0.1) g.lineTo(x, y + Math.sin(x / R * 6 + i) * R * 0.03);
        g.lineTo(R, y + R * 0.07); g.lineTo(-R, y + R * 0.07); g.closePath(); g.fill();
      }
      g.fillStyle = hexA('#7a3b00', 0.35);
      g.beginPath(); g.ellipse(R * 0.25, R * 0.28, R * 0.2, R * 0.1, 0, 0, Math.PI * 2); g.fill();
      break;
    case 7: { // iron: brushed metal + hex plates
      for (let i = 0; i < 70; i++) {
        g.strokeStyle = hexA(rand() > 0.5 ? '#ffffff' : '#20243a', 0.05 + rand() * 0.07);
        g.lineWidth = R * 0.01 + rand() * R * 0.02;
        const y = (rand() * 2 - 1) * R;
        g.beginPath(); g.moveTo(-R, y); g.lineTo(R, y + (rand() - 0.5) * R * 0.2); g.stroke();
      }
      const s = R * 0.5;
      g.strokeStyle = hexA('#0b0e1c', 0.45); g.lineWidth = R * 0.03;
      for (let y = -2; y <= 2; y++) for (let x = -2; x <= 2; x++) {
        const cx = (x + (y % 2) * 0.5) * s * 1.05, cy = y * s * 0.9;
        g.beginPath();
        for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2 + Math.PI / 6; g.lineTo(cx + Math.cos(a) * s * 0.56, cy + Math.sin(a) * s * 0.56); }
        g.closePath(); g.stroke();
      }
      break;
    }
    case 'n': // neutron: pulsar beams
      g.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 2; i++) {
        const gr = g.createLinearGradient(0, -R, 0, R);
        gr.addColorStop(0, hexA('#bff3ff', 0.0)); gr.addColorStop(0.5, hexA('#ffffff', 0.5)); gr.addColorStop(1, hexA('#bff3ff', 0.0));
        g.fillStyle = gr; g.rotate(Math.PI / 2);
        g.fillRect(-R * 0.12, -R, R * 0.24, R * 2);
      }
      break;
    case 'd': // dark matter: void sparkles
      g.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 30; i++) {
        const a = rand() * Math.PI * 2, d = Math.sqrt(rand()) * R * 0.9;
        g.fillStyle = hexA(rand() > 0.5 ? '#b78cff' : '#5c3cff', 0.3 + rand() * 0.5);
        g.beginPath(); g.arc(Math.cos(a) * d, Math.sin(a) * d, R * (0.015 + rand() * 0.03), 0, Math.PI * 2); g.fill();
      }
      for (let i = 0; i < 5; i++) {
        g.strokeStyle = hexA('#8a4dff', 0.18); g.lineWidth = R * 0.05;
        g.beginPath(); g.arc(0, 0, R * (0.3 + i * 0.12), rand() * 6, rand() * 6 + 2); g.stroke();
      }
      break;
  }
  g.restore();
}

function buildOrb(el, kind, px) {
  const R = Math.max(4, Math.ceil(px));
  const pad = 2;
  const D = R * 2 + pad * 2;
  const rand = rng(typeof kind === 'number' ? kind * 977 + 13 : kind.charCodeAt(0) * 31);

  // --- body (rotates with the packet) ---
  const body = mk(D);
  let g = body.getContext('2d');
  g.translate(D / 2, D / 2);
  g.beginPath(); g.arc(0, 0, R, 0, Math.PI * 2); g.clip();
  const base = g.createRadialGradient(-R * 0.25, -R * 0.3, R * 0.05, 0, 0, R);
  if (kind === 'd') {
    base.addColorStop(0, '#2a1846'); base.addColorStop(0.7, '#0c0618'); base.addColorStop(1, '#000000');
  } else if (kind === 7) {
    base.addColorStop(0, '#f4f6ff'); base.addColorStop(0.45, '#a9aec8'); base.addColorStop(1, '#2a2d44');
  } else {
    base.addColorStop(0, '#ffffff'); base.addColorStop(0.18, el.color); base.addColorStop(0.75, el.glow); base.addColorStop(1, el.deep);
  }
  g.fillStyle = base; g.fillRect(-R, -R, R * 2, R * 2);
  motif(g, kind, R, el, rand);

  // --- shading (fixed light direction) ---
  const shade = mk(D);
  g = shade.getContext('2d');
  g.translate(D / 2, D / 2);
  g.save();
  g.beginPath(); g.arc(0, 0, R, 0, Math.PI * 2); g.clip();
  const sh = g.createRadialGradient(-R * 0.35, -R * 0.4, R * 0.2, 0, 0, R * 1.05);
  sh.addColorStop(0, 'rgba(0,0,0,0)'); sh.addColorStop(0.65, 'rgba(0,0,0,0.08)'); sh.addColorStop(1, 'rgba(0,0,10,0.62)');
  g.fillStyle = sh; g.fillRect(-R, -R, R * 2, R * 2);
  // subsurface bounce light at the bottom
  const bl = g.createRadialGradient(R * 0.3, R * 0.65, 0, R * 0.3, R * 0.65, R * 0.7);
  bl.addColorStop(0, hexA(el.glow, 0.35)); bl.addColorStop(1, hexA(el.glow, 0));
  g.globalCompositeOperation = 'lighter';
  g.fillStyle = bl; g.fillRect(-R, -R, R * 2, R * 2);
  // specular
  const sp = g.createRadialGradient(-R * 0.38, -R * 0.45, 0, -R * 0.38, -R * 0.45, R * 0.45);
  sp.addColorStop(0, 'rgba(255,255,255,0.75)'); sp.addColorStop(0.35, 'rgba(255,255,255,0.18)'); sp.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = sp; g.fillRect(-R, -R, R * 2, R * 2);
  g.fillStyle = 'rgba(255,255,255,0.85)';
  g.beginPath(); g.ellipse(-R * 0.42, -R * 0.5, R * 0.14, R * 0.07, -0.6, 0, Math.PI * 2); g.fill();
  g.restore();
  // fresnel rim
  g.globalCompositeOperation = 'lighter';
  g.strokeStyle = hexA(kind === 'd' ? '#9a6bff' : el.color, 0.9);
  g.lineWidth = Math.max(1, R * 0.06);
  g.beginPath(); g.arc(0, 0, R - g.lineWidth / 2, 0, Math.PI * 2); g.stroke();
  g.strokeStyle = 'rgba(255,255,255,0.35)';
  g.lineWidth = Math.max(0.6, R * 0.025);
  g.beginPath(); g.arc(0, 0, R * 0.96, Math.PI * 1.05, Math.PI * 1.6); g.stroke();
  // symbol
  if (el.sym) {
    const fs = Math.round(R * (el.sym.length > 1 ? 0.72 : 0.86));
    g.globalCompositeOperation = 'source-over';
    g.font = `800 ${fs}px Orbitron, "Exo 2", system-ui, sans-serif`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.shadowColor = kind === 7 ? 'rgba(10,12,30,0.9)' : hexA(el.deep, 0.95);
    g.shadowBlur = R * 0.25;
    g.fillStyle = kind === 7 ? '#11142a' : 'rgba(255,255,255,0.96)';
    g.fillText(el.sym, 0, R * 0.04);
    g.shadowBlur = 0;
  }

  // --- glow (additive halo) ---
  const GR = Math.ceil(R * 2.1);
  const glow = mk(GR * 2);
  g = glow.getContext('2d');
  const gg = g.createRadialGradient(GR, GR, R * 0.6, GR, GR, GR);
  gg.addColorStop(0, hexA(el.glow, 0.55)); gg.addColorStop(0.35, hexA(el.glow, 0.18)); gg.addColorStop(1, hexA(el.glow, 0));
  g.fillStyle = gg; g.fillRect(0, 0, GR * 2, GR * 2);

  return { body, shade, glow, R, GR, D };
}

export class Sprites {
  constructor() { this.orbs = []; this.px = 1; }
  build(pxPerUnit) {
    this.px = pxPerUnit;
    this.orbs = ELEMENTS.map((el, i) => buildOrb(el, i, el.radius * pxPerUnit));
    this.neutron = buildOrb(NEUTRON, 'n', NEUTRON.radius * pxPerUnit);
    this.dark = buildOrb(DARK, 'd', DARK.radius * pxPerUnit);
    // soft particle dot
    const s = 64;
    this.dot = mk(s);
    const g = this.dot.getContext('2d');
    const gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.2, 'rgba(255,255,255,0.7)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, s, s);
    this.tinted = new Map();
  }
  // cached colored soft dot for additive particles
  dotFor(color) {
    let c = this.tinted.get(color);
    if (c) return c;
    c = mk(64);
    const g = c.getContext('2d');
    const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.15, hexA(color, 0.9)); gr.addColorStop(0.5, hexA(color, 0.25)); gr.addColorStop(1, hexA(color, 0));
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    this.tinted.set(color, c);
    return c;
  }
  // small icon for HUD (data URL)
  icon(kind, size = 72) {
    const el = kind === 'n' ? NEUTRON : kind === 'd' ? DARK : ELEMENTS[kind];
    const o = buildOrb(el, kind, size / 2 - 3);
    const c = mk(o.D);
    const g = c.getContext('2d');
    g.drawImage(o.body, 0, 0); g.drawImage(o.shade, 0, 0);
    return c.toDataURL();
  }
}
