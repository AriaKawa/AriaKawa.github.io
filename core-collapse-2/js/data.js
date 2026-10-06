// CORE COLLAPSE II — static game data

export const ELEMENTS = [
  { sym: 'H',  name: 'Hydrogen',  color: '#ff6f91', glow: '#ff3d6e', deep: '#5a0f27', radius: 13 },
  { sym: 'He', name: 'Helium',    color: '#c48bff', glow: '#a45bff', deep: '#2c0e5a', radius: 17.5 },
  { sym: 'C',  name: 'Carbon',    color: '#8ff0b0', glow: '#2fe08a', deep: '#06402a', radius: 23 },
  { sym: 'O',  name: 'Oxygen',    color: '#6fb1ff', glow: '#2f7dff', deep: '#0a2560', radius: 30 },
  { sym: 'Ne', name: 'Neon',      color: '#ffb14d', glow: '#ff7a1a', deep: '#5c2600', radius: 38.5 },
  { sym: 'Mg', name: 'Magnesium', color: '#5ff0ff', glow: '#12c6ff', deep: '#003f55', radius: 48 },
  { sym: 'Si', name: 'Silicon',   color: '#ffe06a', glow: '#ffbf1f', deep: '#5a3c00', radius: 59 },
  { sym: 'Fe', name: 'Iron',      color: '#d9dcec', glow: '#9aa6ff', deep: '#1c1f33', radius: 70 },
];
export const FE = ELEMENTS.length - 1;

// Special packets
export const NEUTRON = { sym: 'n', name: 'Neutron Star Shard', color: '#f4fbff', glow: '#9fe8ff', deep: '#1a3550', radius: 14 };
export const DARK = { sym: '', name: 'Dark Matter', color: '#3a2457', glow: '#8a4dff', deep: '#07020f', radius: 21 };

export const CFG = {
  launchR: 262,        // where packets are released
  dangerR: 210,        // instability threshold
  coreR0: 18,          // base core radius
  coreGrow: 5,         // core radius gain per absorbed iron
  gravity: 1150,       // world units / s^2 (max)
  gravSoft: 70,        // softening radius
  drag: 1.35,          // linear damping /s
  launchSpeed: 520,
  cooldown: 0.34,
  restitution: 0.12,
  friction: 0.06,
  maxSpeed: 900,
  overflowTime: 2.6,   // seconds outside danger ring before ejection
  launchGrace: 1.25,   // new packets ignore the danger ring briefly
  chainWindow: 1.1,
  maxMult: 6,
  flareCharge: 2400,   // score-equivalent needed to fill the flare meter
  affinityRange: 42,   // gap (world units) within which identical elements attract
  affinity: 950,       // attraction acceleration at contact
};

// The stellar campaign: each star is a level. Modifiers stack difficulty.
export const STARS = [
  { name: 'PROXIMA',   cls: 'Red dwarf',       iron: 1, weights: [10, 7, 3, 1, 0],   hue: [0.95, 0.30, 0.25], hue2: [0.35, 0.06, 0.16], mods: [] },
  { name: 'SOL',       cls: 'Yellow dwarf',    iron: 2, weights: [8, 7, 4, 2, 1],    hue: [1.00, 0.70, 0.30], hue2: [0.30, 0.10, 0.28], mods: ['neutron'] },
  { name: 'SIRIUS',    cls: 'White star',      iron: 2, weights: [8, 6, 4, 2, 1],    hue: [0.75, 0.85, 1.00], hue2: [0.10, 0.16, 0.38], mods: ['neutron', 'swirl'] },
  { name: 'RIGEL',     cls: 'Blue supergiant', iron: 3, weights: [7, 6, 4, 3, 1],    hue: [0.35, 0.60, 1.00], hue2: [0.05, 0.10, 0.35], mods: ['neutron', 'dark'] },
  { name: 'ANTARES',   cls: 'Red supergiant',  iron: 3, weights: [7, 6, 4, 3, 2],    hue: [1.00, 0.38, 0.18], hue2: [0.28, 0.04, 0.10], mods: ['neutron', 'companion'] },
  { name: 'BETELGEUSE',cls: 'Red supergiant',  iron: 3, weights: [6, 6, 4, 3, 2],    hue: [1.00, 0.50, 0.22], hue2: [0.25, 0.05, 0.18], mods: ['neutron', 'swirl', 'dark'] },
  { name: 'ETA CARINAE',cls: 'Hypergiant',     iron: 4, weights: [6, 5, 4, 3, 2],    hue: [0.95, 0.45, 0.85], hue2: [0.18, 0.04, 0.28], mods: ['neutron', 'dark', 'companion', 'flares'] },
];
// After the last authored star the campaign continues procedurally.
export function starFor(index) {
  if (index < STARS.length) return { ...STARS[index], index };
  const n = index - STARS.length;
  const pal = [
    [[0.6, 1.0, 0.8], [0.03, 0.18, 0.2]],
    [[1.0, 0.85, 0.5], [0.25, 0.12, 0.05]],
    [[0.7, 0.55, 1.0], [0.12, 0.05, 0.3]],
    [[1.0, 0.4, 0.5], [0.3, 0.03, 0.12]],
  ][n % 4];
  const greek = ['ALPHA', 'BETA', 'GAMMA', 'DELTA', 'EPSILON', 'ZETA', 'THETA', 'KAPPA', 'LAMBDA', 'SIGMA', 'OMEGA'];
  return {
    name: `${greek[n % greek.length]} ${['CYGNI', 'DRACONIS', 'ORIONIS', 'LYRAE', 'CENTAURI'][n % 5]}`,
    cls: 'Uncharted star', iron: Math.min(6, 4 + Math.floor(n / 2)),
    weights: [6, 5, 4, 3, 2], hue: pal[0], hue2: pal[1],
    mods: ['neutron', 'dark', ...(n % 2 ? ['companion'] : ['swirl']), 'flares'], index,
  };
}

export const MOD_INFO = {
  neutron:   { label: 'Neutron shards', desc: 'Silver shards upgrade any element they touch.' },
  swirl:     { label: 'Magnetic swirl', desc: 'The field rotates. Packets spiral as they fall.' },
  dark:      { label: 'Dark matter',    desc: 'Inert clumps. Three nearby fusions dissolve them.' },
  companion: { label: 'Binary companion', desc: 'A companion star tugs packets outward as it orbits.' },
  flares:    { label: 'Stellar flares', desc: 'Telegraphed eruptions push the outer layers out.' },
};

// Boons picked after each supernova. `max` is how many times it can stack.
export const BOONS = [
  { id: 'gravity',  icon: '◉', name: 'Deep Gravity',     max: 3, desc: 'Gravity +14%. Everything packs tighter.' },
  { id: 'shield',   icon: '⬡', name: 'Magnetosphere',    max: 3, desc: 'Packets survive +0.9s beyond the danger ring.' },
  { id: 'foresight',icon: '◈', name: 'Foresight',        max: 2, desc: 'See one more element in your queue.' },
  { id: 'catalyst', icon: '✦', name: 'Catalyst',         max: 3, desc: '10% chance a fusion skips a tier.' },
  { id: 'flare',    icon: '☀', name: 'Coronal Battery',  max: 3, desc: 'Solar Flare charges 35% faster.' },
  { id: 'neutron',  icon: '✧', name: 'Neutron Rain',     max: 2, desc: 'Neutron shards appear twice as often.' },
  { id: 'compress', icon: '⊙', name: 'Degenerate Matter',max: 2, desc: 'All elements are 7% smaller.' },
  { id: 'golden',   icon: '✺', name: 'Resonance',        max: 4, desc: 'Chain multiplier builds 50% faster.' },
  { id: 'phoenix',  icon: '❂', name: 'Second Dawn',      max: 1, desc: 'Once: a fatal ejection triggers a free flare instead.' },
  { id: 'hold',     icon: '⇄', name: 'Pocket Dimension', max: 1, desc: 'Unlocks a second HOLD slot.' },
];
