import type { Snapshot, Vec2 } from '../game/types';
import type { ScenerySite } from '../game/SceneryWorld';

export type AiViewport = { left: number; top: number; right: number; bottom: number; detail: boolean };
export type AiReference = { anchor: Vec2; origin: Vec2 };
export const AI_FRAME_KEYS = ['players', 'lots', 'bases', 'towers', 'zombies', 'contracts', 'warOperations'] as const;
export type AiFrame = Pick<Snapshot, typeof AI_FRAME_KEYS[number]>;
export function emptyAiFrame(): AiFrame {
  return { players: [], lots: [], bases: [], towers: [], zombies: [], contracts: [], warOperations: [] };
}
export type AiScenery = { roads: Vec2[][]; sites: ScenerySite[]; roadWidths: number[]; land: Vec2[][] };
export type AiRequest = { type: 'step'; generation: number; add: number; reference: AiReference; viewport?: AiViewport }
  | { type: 'clear'; generation: number } | { type: 'scenery'; data: AiScenery };
export type AiResponse = { generation: number; reference: AiReference; frame: AiFrame; elapsedMs: number };
