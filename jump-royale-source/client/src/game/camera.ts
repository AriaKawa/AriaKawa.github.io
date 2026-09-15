import { GAME_HEIGHT, WORLD_HEIGHT } from "./constants";

export function desiredCameraY(playerY: number, worldHeight=WORLD_HEIGHT): number {
  return Math.max(0, Math.min(worldHeight - GAME_HEIGHT, playerY - GAME_HEIGHT * 0.62));
}
