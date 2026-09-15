export let GAME_WIDTH = 960;
export let GAME_HEIGHT = 540;
export function updateViewport(): void {
  const aspect = window.innerWidth / window.innerHeight;
  GAME_WIDTH = Math.max(896, 480 * aspect);
  GAME_HEIGHT = GAME_WIDTH / aspect;
}
export const WORLD_WIDTH = 640;
export const WORLD_HEIGHT = 7200;
export const PLAYER_WIDTH = 14;
export const PLAYER_HEIGHT = 20;
export const SHAFT_LEFT = 54;
export const SHAFT_RIGHT = WORLD_WIDTH - 54;
export const SHAFT_SCREEN_X = 160;
export const COLORS = [0xf6b34a, 0x62c6d9, 0xe76d55, 0x9bd36a, 0xc77fe7, 0xf4dd73, 0x6f8fe8, 0xe786b4];
