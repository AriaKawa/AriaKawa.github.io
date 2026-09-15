import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

const root = join(process.cwd(), "client", "public", "assets", "art_v2");
const required = [
  "characters/blacksmith_climber.png", "characters/blacksmith_climber.json", "characters/bot_ghost_variants.png",
  "tiles/forge_platform_tiles.png", "tiles/forge_wall_tiles.png", "tiles/furnace_background_tiles.png", "tiles/trim_tiles.png",
  "hazards/lava_surface_strip.png", "hazards/lava_body_tile.png", "hazards/lava_bubbles.png",
  "particles/spark.png", "particles/ember.png", "particles/dust.png", "particles/smoke.png",
  "props/chains.png", "props/rivets.png", "props/hanging_hooks.png", "props/vents.png", "props/anvils.png", "props/broken_platform_edges.png",
  "ui/panel_frame.png", "ui/button_frame.png", "ui/charge_bar_frame.png", "ui/charge_bar_fill.png"
];

function dimensions(bytes: Buffer): { width: number; height: number } | undefined {
  if (bytes.length < 24 || bytes.toString("ascii", 1, 4) !== "PNG") return undefined;
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

let failures = 0;
for (const relative of required) {
  const path = join(root, relative);
  try { await access(path); }
  catch { console.warn(`MISSING  ${relative} — run npm run assets or add a drop-in replacement.`); failures++; }
}

async function check(relative: string, rule: (size: { width: number; height: number }) => boolean, expectation: string): Promise<void> {
  try {
    const size = dimensions(await readFile(join(root, relative)));
    if (!size) { console.warn(`WARNING  ${relative} is not a readable PNG.`); failures++; return; }
    if (!rule(size)) { console.warn(`INVALID  ${relative} is ${size.width}x${size.height}; expected ${expectation}.`); failures++; }
    else console.log(`OK       ${relative} (${size.width}x${size.height})`);
  } catch { /* Missing files are already reported above. */ }
}

await check("characters/blacksmith_climber.png", ({ width, height }) => height === 32 && width >= 576 && width % 32 === 0, "18 or more 32x32 frames in one row");
await check("characters/bot_ghost_variants.png", ({ width, height }) => height === 32 && width >= 256 && width % 32 === 0, "8 or more 32x32 frames");
await check("tiles/forge_platform_tiles.png", ({ width, height }) => width % 16 === 0 && height % 16 === 0, "a 16x16-aligned tile grid");
await check("tiles/forge_wall_tiles.png", ({ width, height }) => width % 16 === 0 && height % 16 === 0, "a 16x16-aligned tile grid");
await check("hazards/lava_surface_strip.png", ({ width, height }) => width % 64 === 0 && height === 16, "64x16 animation frames that tile horizontally");
await check("hazards/lava_body_tile.png", ({ width, height }) => width === 32 && height === 32, "one 32x32 seamless tile");

if (failures) {
  console.warn(`Asset validation finished with ${failures} problem${failures === 1 ? "" : "s"}. V2 loader fallbacks will keep the game runnable.`);
  process.exitCode = 1;
} else console.log(`Asset validation passed: ${required.length} Art V2 files are present.`);
