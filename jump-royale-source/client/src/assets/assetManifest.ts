const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const ROOT = `${BASE}/assets/reforged`;
export const PLAYER_ANIMATIONS = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  charge_start: { start: 2, end: 3, frameRate: 8, repeat: 0 },
  charge_loop: { start: 3, end: 3, frameRate: 4, repeat: -1 },
  jump: { start: 4, end: 4, frameRate: 8, repeat: 0 },
  fall: { start: 5, end: 5, frameRate: 8, repeat: -1 },
  land: { start: 2, end: 2, frameRate: 10, repeat: 0 },
  eliminated: { start: 5, end: 5, frameRate: 6, repeat: 0 }
} as const;
const asset = (key: string, file: string, frameWidth?: number, frameHeight?: number) => ({key, image: `${ROOT}/${file}.png`, frameWidth, frameHeight});
export const ASSETS = {
  player: asset('climber-v2','climber',32,32),
  bots: asset('bot-ghosts-v2','climber',32,32),
  platformTiles: asset('platforms-new','platforms',96,32),
  restPlatform: asset('rest-platform-new','rest-platform'),
  wallTiles: asset('wall-new','wall'), trim: asset('trim-new','trim'),
  background: asset('background-new','backdrop'),
  lavaSurface: asset('lava-new','lava'), lavaBody: asset('lava-body-new','lava-body'),
  spark: asset('spark-new','spark'), ember: asset('ember-new','spark'),
  dust: asset('dust-new','dust'),
  chains: asset('chains-new','chain'), hooks: asset('hooks-new','hook'),
  vents: asset('vents-new','vent'), anvils: asset('anvils-new','anvil')
} as const;
export const BOT_ALPHA = 0.864;
export const BOT_NAME_ALPHA = 0.48;
export const LOCAL_PLAYER_ALPHA = 1;
export const LAVA_SURFACE_VISUAL_OFFSET = 0;
export const LAVA_PARTICLE_RATE = 12;
export type AssetName = keyof typeof ASSETS;
