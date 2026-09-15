import { SPAWN_Y, WORLD_WIDTH } from "./constants.js";
import type { Platform } from "./types.js";
import {sizePlatforms} from './platformSizing.js';

export const CHAPTERS = [
  { name: "THE EMBER YARD", lesson: "Short holds. Wide landings.", color: "#ffc178" },
  { name: "THE CHAINWORKS", lesson: "Choose your takeoff point.", color: "#b8d6d6" },
  { name: "THE COPPER BELFRY", lesson: "Find a rhythm. Keep climbing.", color: "#edac72" },
  { name: "THE QUENCH", lesson: "Small ledges. Steady hands.", color: "#85e0dd" },
  { name: "THE STARLESS SPIRE", lesson: "Commit to the crossing.", color: "#b9b7ed" },
  { name: "THE CROWN FORGE", lesson: "One last climb.", color: "#ffe5a0" }
] as const;

/** Authored jump phrases. Optional lifts never form a required route link. */
export function generateLevel(_seed = 0xf04e): Platform[] {
  const platforms: Platform[] = [{ id: "spawn", x: 54, y: SPAWN_Y + 32, w: WORLD_WIDTH - 108, h: 16, type: "stone" }];
  const centers = [320, 190, 100, 230, 365, 495, 370, 240, 110, 320];
  let y = SPAWN_Y + 32;
  for (let chapter = 0; chapter < 6; chapter++) {
    for (let step = 0; step < 10; step++) {
      const rest = step === 9;
      y -= 96 + chapter * 5 + (step % 3) * 5;
      const w = rest ? 256 : Math.max(96, 160 - chapter * 16 - (step % 3) * 16);
      const center = chapter % 2 ? 640 - centers[step] : centers[step];
      platforms.push({ id: `route-${chapter}-${step}`, x: center - w / 2, y, w, h: 16,
        type: rest ? "anvil" : chapter === 3 ? "ice" : step % 4 === 2 ? "wood" : chapter > 2 && step % 3 === 1 ? "cracked" : "stone" });
      if (chapter > 0 && step === 4) {
        const nextCenter = chapter % 2 ? 640 - centers[step + 1] : centers[step + 1];
        const x = (center + nextCenter) / 2 - 40;
        platforms.push({ id: `pocket-${chapter}`, x, baseX: x, y: y - 60, w: 80, h: 16, type: "moving", moveRange: 28, movePeriodMs: 4200, movePhase: 0 });
      }
    }
  }
  while (y > 215) {
    y -= Math.min(125, y - 180);
    platforms.push({ id: `summit-${y}`, x: 272, y, w: 96, h: 16, type: "anvil" });
  }
  platforms.push({ id: "crown", x: 224, y: 72, w: 192, h: 16, type: "anvil" });
  return sizePlatforms(platforms,'forge');
}
