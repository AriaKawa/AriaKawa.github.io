import { GAME_HEIGHT, WORLD_HEIGHT } from "./constants";

export function desiredCameraY(playerY: number, worldHeight=WORLD_HEIGHT,zoom=1): number {
  return Math.max((GAME_HEIGHT/zoom-GAME_HEIGHT)/2, Math.min(worldHeight-GAME_HEIGHT+(GAME_HEIGHT-GAME_HEIGHT/zoom)/2, playerY-GAME_HEIGHT*.5-GAME_HEIGHT*.12/zoom));
}
