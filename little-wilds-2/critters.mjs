// Hand-drawn pixel animals at the grass's own scale: one character per ground texel, facing right.
// Each creature is drawn once standing; walking, grazing and sleeping are derived from that pose.
// Letters: o outline, b body, d shade, l light, e eye, n nose, k legs, x and y accents, w white.
export const CRITTERS = {
  deer: { // Spirit deer: pale, with mint antlers that glow.
    pal: { o: '#4a3b2c', b: '#e9dcc0', d: '#c9b896', l: '#fff6e2', e: '#2a2018', n: '#6b4a3a', k: '#5e4a36', x: '#8ff0cf', y: '#d4fff1' },
    art: [
      '...........x...x..',
      '...........xy.yx..',
      '............xxx...',
      '...........obbo...',
      '...........obeb...',
      '...........obbbbn.',
      '..........obbbo...',
      '..l......obbbo....',
      '.lloooooobbbbo....',
      '.obbbbbbbbbbbo....',
      'obblbbblbbbbbo....',
      'obbbbbbbbbbbo.....',
      '.odbbbbbbbbdo.....',
      '..k.k....k.k......',
      '..k.k....k.k......',
      '..k.k....k.k......',
    ], legs: 3,
  },
  fawn: {
    pal: { o: '#4a3b2c', b: '#d9b98c', d: '#b8956a', l: '#fff3dc', e: '#2a2018', n: '#6b4a3a', k: '#5e4a36' },
    art: [
      '.........o.o',
      '.........obo',
      '........obeb',
      '........obbbn',
      '.......obbo.',
      '.l....obbo..',
      '.looooobbo..',
      '.oblbblbbo..',
      'obbbbbbbbo..',
      '.obdbbbbdo..',
      '..k.k..k.k..',
      '..k.k..k.k..',
    ], legs: 2,
  },
  rabbit: { // Moss rabbit: cream, with a mossy back.
    pal: { o: '#3f3a2a', b: '#efe3c4', l: '#fffaf0', e: '#2a2018', n: '#e78fa0', k: '#8a7a5a', m: '#7fa65a', y: '#f2b8c0' },
    art: [
      '......o.o.',
      '.....oyoyo',
      '.....oyoyo',
      '..oooobbbo',
      '.ommmmbbeo',
      'obmmmmbbbn',
      'obbbbbbllo',
      '.obbbbbllo',
      '..kk..kk..',
    ], legs: 1,
  },
  fox: { // Ember Basin: a cinder fox with an ember-tipped tail.
    pal: { o: '#3a1f14', b: '#e0702a', d: '#b4501e', l: '#fff0d8', e: '#1e120c', n: '#1e120c', k: '#3a1f14', x: '#ffd36b', y: '#ff9a3c' },
    art: [
      '............o..o.',
      '............oboob',
      'x...........obbbo',
      'yx..........obebbn',
      'yyo........obblll',
      '.ybooooooobbbbo..',
      '..obbbbbbbbbbbo..',
      '..obbbbbbbbbllo..',
      '...odbbbbbbdlo...',
      '....k.k...k.k....',
      '....k.k...k.k....',
    ], legs: 2,
  },
  lynx: { // Frostmere: a snow lynx with tufted ears.
    pal: { o: '#3c4250', b: '#eef0f4', d: '#c4cad6', l: '#ffffff', e: '#2a3a2a', n: '#d48a9a', k: '#8a92a4', x: '#3c4250', s: '#9aa2b4' },
    art: [
      '............x...x',
      '............ob.bo',
      '............obbbo',
      '...........obebeo',
      '..o........obbnbo',
      '.oso.......obbbo.',
      '..obooooooobbbo..',
      '..obsbbsbbbbbbo..',
      '..obbbbbsbbsbbo..',
      '...odbbbbbbbdo...',
      '....kk.k..k.kk...',
      '....k..k..k..k...',
    ], legs: 2,
  },
  tortoise: { // Sunfall Coast: a sun tortoise with a sunburst on its shell.
    pal: { o: '#3a2e1a', b: '#7aa046', d: '#5a7e32', l: '#c9d870', e: '#1e160c', n: '#3a2e1a', k: '#c9a46a', x: '#ffd34d', y: '#ff9a3c' },
    art: [
      '....ooooo.....',
      '...obbxbbo....',
      '..obxyyxbbo...',
      '.obbbxyxbbbooo',
      '.oddbbxbbddokke',
      'ooooooooooookkn',
      '..kk.....kk...',
    ], legs: 1,
  },
  otter: { // Mistfen: a reed otter, long and low.
    pal: { o: '#2e2016', b: '#8a5a36', d: '#6a4226', l: '#e8cfa6', e: '#140c08', n: '#140c08', k: '#4a3020' },
    art: [
      '..............oo.',
      '.............obbo',
      '.............obebn',
      'o.........oooblllo',
      'ooooooooobbbbllo..',
      '.odbbbbbbbbbbllo..',
      '..odbbbbbbbbbbo...',
      '...k.k.....k.k....',
    ], legs: 1,
  },
  ram: { // Auric Steppe: a golden ram with curled horns.
    pal: { o: '#3a2a16', b: '#f4e6c2', d: '#d8c494', l: '#fffaea', e: '#1e140a', n: '#5a4026', k: '#5a4026', x: '#e0a83a', y: '#b07a1e', f: '#8a6a44' },
    art: [
      '............xxx..',
      '...........xy.xo.',
      '...........xyfffo',
      '...........ofefn.',
      '..obbbbbbbbbffo..',
      '.obllbbllbbbbo...',
      'obbbbbbbbbbbbbo..',
      'obllbbbllbbbllo..',
      '.odbbbbbbbbbdo...',
      '..k.k.....k.k....',
      '..k.k.....k.k....',
    ], legs: 2,
  },
  crab: { // Coral Reach: a coral crab, claws up.
    pal: { o: '#4a1e24', b: '#f07a7a', d: '#c45058', l: '#ffc0b0', e: '#1e0c0c', k: '#c45058', x: '#ffd0c4' },
    art: [
      '.oo.......oo.',
      'obbo.....obbo',
      'obxo.e.e.oxbo',
      '.oo..o.o..oo.',
      '..o.obbbo.o..',
      '...obllbbo...',
      '..obbbbbbbo..',
      '.k.odbbbdo.k.',
      'k..k.k.k.k..k',
    ], legs: 1,
  },
  toadling: { // Sporewood: a toadling wearing a spotted mushroom cap.
    pal: { o: '#2e2238', b: '#8aa86a', d: '#66844e', l: '#d8e8b0', e: '#140c18', n: '#140c18', k: '#66844e', x: '#a46ad8', y: '#f4e8ff' },
    art: [
      '....ooooo...',
      '..oxxyxxxxo.',
      '.oxyxxxyxxxo',
      '.oooooooooo.',
      '..obbbbbebo.',
      '.obbbbbbbbbo',
      '.obllllllbo.',
      '..odbbbbdo..',
      '..kk....kk..',
    ], legs: 1,
  },
  hedgehog: { // Glimmerdeep: a crystal hedgehog with glassy quills.
    pal: { o: '#262a44', b: '#9a8a7a', d: '#6a5e54', l: '#e0d4c4', e: '#140c08', n: '#140c08', k: '#6a5e54', x: '#8ae0ff', y: '#d8f6ff', z: '#b8a0ff' },
    art: [
      '...x.z.x.....',
      '..xyxzyxz....',
      '.xzxyxzxyxo..',
      'oxxzxxzxxxbbo',
      'oxzxxzxxxbbebo',
      '.oxxxxxxbbbbn',
      '..oddddblllo.',
      '...k.k..k.k..',
    ], legs: 1,
  },
};
// Each land's own creature takes the deer's place there; rabbits are everywhere.
export const NATIVE = [null, 'fox', 'lynx', 'tortoise', 'otter', 'ram', 'crab', 'toadling', 'hedgehog'];

const made = new Map();
// frame: 0 standing, 1 walking, 2 grazing, 3 asleep.
export function critterCanvas(name, frame, flip) {
  const key = `${name}:${frame}:${flip ? 1 : 0}`;
  if (made.has(key)) return made.get(key);
  const { art, pal, legs } = CRITTERS[name], w = Math.max(...art.map(r => r.length)), h = art.length;
  let rows = art.map(r => r.padEnd(w, '.').split(''));
  const body = h - legs;
  if (frame === 1) rows = rows.map((r, y) => y < body ? r : r.map((_, x) => r[x + ((x < w / 2) === (y % 2 === 0) ? 1 : -1)] || '.')); // legs scissor
  if (frame === 2) { // Head down to the grass: the front third drops two texels.
    const from = Math.floor(w * .62), out = rows.map(r => r.slice());
    for (let y = 0; y < body; y++) for (let x = from; x < w; x++) out[y][x] = '.';
    for (let y = 0; y < body; y++) for (let x = from; x < w; x++) if (rows[y][x] !== '.' && y + 2 < body + 1) out[y + 2][x] = rows[y][x];
    rows = out;
  }
  if (frame === 3) rows = [...Array.from({ length: legs }, () => Array(w).fill('.')), ...rows.slice(0, body).map(r => r.map(c => c === 'e' ? 'o' : c))]; // lying down, eyes shut
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d');
  rows.forEach((r, y) => r.forEach((ch, x) => { const col = pal[ch]; if (!col) return; g.fillStyle = col; g.fillRect(flip ? w - 1 - x : x, y, 1, 1); }));
  made.set(key, c);
  return c;
}
