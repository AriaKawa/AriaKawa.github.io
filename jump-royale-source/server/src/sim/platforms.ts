import type { Platform } from "./types.js";

export function updateMovingPlatforms(platforms: Platform[], elapsedMs: number): void {
  for (const platform of platforms) {
    if (platform.type !== "moving" || platform.baseX === undefined || !platform.moveRange || !platform.movePeriodMs) {
      platform.deltaX = 0; platform.deltaY=0;
      continue;
    }
    const previousX = platform.x;
    const angle = elapsedMs / platform.movePeriodMs * Math.PI * 2 + (platform.movePhase ?? 0);
    platform.x = platform.baseX + Math.sin(angle) * platform.moveRange;
    platform.deltaX = platform.x - previousX;
    const previousY=platform.y;
    if(platform.baseY!==undefined&&platform.orbitY)platform.y=platform.baseY+Math.cos(angle)*platform.orbitY;
    platform.deltaY=platform.y-previousY;
  }
}
