import { levelForMap, MAPS, type MapId } from '../../../server/src/sim/maps';
import { worldForMap } from '../../../server/src/sim/world';
import { PLAYER_HEIGHT, PLAYER_WIDTH } from '../../../server/src/sim/constants';
import type { Platform } from '../../../server/src/sim/types';
import type {SpawnPoint} from '../../../server/src/sim/spawn';
import {attachSpawn} from '../../../server/src/sim/spawn';
import {fitBucket} from '../../../server/src/sim/bucketGeometry';

export interface MapDraft {
  format: 'jump-royale-map';
  version: 1;
  id: string;
  name: string;
  baseMapId: MapId;
  platforms: Platform[];
  spawn: SpawnPoint;
  updatedAt: string;
}
export const LIBRARY_KEY = 'jump-royale-maps-v1';
export const RECOVERY_KEY = 'jump-royale-editor-recovery-v1';
export const MAX_MAP_BYTES = 2_000_000;
export const EDITOR_LIMIT=10_000_000;
export const clone = <T>(value: T): T => structuredClone(value);
export const newId = () => crypto.randomUUID();
const types = ['stone', 'wood', 'anvil', 'ice', 'cracked', 'moving'];
const terrains = ['ground', 'left', 'right', 'island', 'log', 'ruin'];
const number = (value: unknown, label: string, min: number, max: number): number => {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) throw new Error(`${label} must be between ${min} and ${max}.`);
  return value;
};

/** Imported files are data only. Rebuild a known schema; never spread arbitrary input. */
export function parseDraft(text: string): MapDraft {
  if (text.length > MAX_MAP_BYTES) throw new Error('This map is too large (maximum 2 MB).');
  const raw = JSON.parse(text);
  if (!raw || raw.format !== 'jump-royale-map' || raw.version !== 1) throw new Error('Choose a Jump Royale map file (version 1).');
  if (!MAPS.some(m => m.id === raw.baseMapId)) throw new Error('Unknown map theme.');
  if (typeof raw.name !== 'string' || !raw.name.trim() || raw.name.length > 80) throw new Error('Map names must contain 1–80 characters.');
  if (typeof raw.id !== 'string' || raw.id.length > 100 || !raw.id) throw new Error('Invalid map ID.');
  if (!Array.isArray(raw.platforms) || raw.platforms.length > 2000) throw new Error('Maps support up to 2,000 objects.');
  const baseMapId = raw.baseMapId as MapId;
  const world = worldForMap(baseMapId), ids = new Set<string>();
  const platforms = raw.platforms.map((p: Record<string, unknown>, i: number): Platform => {
    if (!p || typeof p !== 'object' || typeof p.id !== 'string' || !p.id || p.id.length > 100 || ids.has(p.id)) throw new Error(`Object ${i + 1} has an invalid or duplicate ID.`);
    ids.add(p.id);
    if (!types.includes(p.type as string)) throw new Error(`Unknown object type on ${p.id}.`);
    const result: Platform = { id: p.id, type: p.type as Platform['type'],
      x: number(p.x, 'X', -EDITOR_LIMIT, EDITOR_LIMIT), y: number(p.y, 'Y', -EDITOR_LIMIT, world.height),
      w: number(p.w, 'Width', 8, EDITOR_LIMIT), h: number(p.h, 'Height', 4, EDITOR_LIMIT) };
    for (const key of ['solid', 'slope', 'slippery', 'ceiling', 'route', 'secret', 'magical', 'forest', 'mountain'] as const) {
      if (p[key] !== undefined) {
        if (typeof p[key] !== 'boolean') throw new Error(`Invalid ${key}.`);
        result[key] = p[key] as boolean;
      }
    }
    // Environment physics follows the chosen theme, including wind and world bounds.
    for (const key of ['magical', 'forest', 'mountain'] as const) result[key] = baseMapId === key;
    if (p.terrain !== undefined) {
      if (!terrains.includes(p.terrain as string)) throw new Error('Unknown terrain style.');
      result.terrain = p.terrain as Platform['terrain'];
    }
    for (const key of ['baseX', 'baseY', 'moveRange', 'movePeriodMs', 'movePhase', 'orbitY', 'crumbleSeconds', 'region'] as const) {
      if (p[key] !== undefined) result[key] = number(p[key], key, key === 'movePhase' || key === 'baseX' || key === 'baseY' ? -EDITOR_LIMIT : 0, EDITOR_LIMIT);
    }
    if (result.region !== undefined && (!Number.isInteger(result.region) || result.region > 9)) throw new Error('Unknown mountain region.');
    if (p.artVariant !== undefined) {
      result.artVariant = number(p.artVariant, 'Art variant', 0, baseMapId === 'mountain' ? 3 : 2);
      if (!Number.isInteger(result.artVariant)) throw new Error('Invalid art variant.');
    }
    if(p.rotation!==undefined)result.rotation=number(p.rotation,'Rotation',-180,180);
    if(result.slope)result.rotation??=0;
    if (result.type === 'moving') {
      if (!result.movePeriodMs || result.movePeriodMs < 250) throw new Error('Moving platforms need a period of at least 250 ms.');
      result.baseX ??= result.x;
      result.baseY ??= result.y;
    }
    if (p.structure !== undefined) {
      if (typeof p.structure !== 'string' || p.structure.length > 100) throw new Error('Invalid structure.');
      result.structure = p.structure;
    }
    if (p.bucket !== undefined) {
      const b = p.bucket as Record<string, unknown>;
      if (!b || typeof b !== 'object') throw new Error('Invalid hollow platform.');
      result.bucket = { left: number(b.left, 'Left wall', .01, .99), right: number(b.right, 'Right wall', .01, .99), depth: number(b.depth, 'Hollow depth', 0, result.h) };
      if (result.bucket.left >= result.bucket.right) throw new Error('Hollow platform walls overlap.');
    }
    fitBucket(result);
    if(result.bucket)result.rotation??=0;
    return result;
  });
  if (!raw.spawn) throw new Error('Map needs a player start.');
  const spawn:SpawnPoint = { x: number(raw.spawn.x, 'Start X', -EDITOR_LIMIT, EDITOR_LIMIT), y: number(raw.spawn.y, 'Start Y', -EDITOR_LIMIT, world.height - PLAYER_HEIGHT) };
  if(raw.spawn.platformId!==undefined){if(typeof raw.spawn.platformId!=='string'||raw.spawn.platformId.length>100)throw new Error('Invalid spawn platform.');spawn.platformId=raw.spawn.platformId;}
  if(raw.spawn.u!==undefined)spawn.u=number(raw.spawn.u,'Spawn center',0,1);
  if(raw.spawn.v!==undefined)spawn.v=number(raw.spawn.v,'Spawn height',0,1);
  return { format: 'jump-royale-map', version: 1, id: raw.id, name: raw.name.trim(), baseMapId, platforms, spawn,
    updatedAt: typeof raw.updatedAt === 'string' && Number.isFinite(Date.parse(raw.updatedAt)) ? raw.updatedAt : new Date().toISOString() };
}

export function createDraft(baseMapId: MapId, blank = false): MapDraft {
  const world = worldForMap(baseMapId);
  const platforms = levelForMap(baseMapId);
  const floor = platforms.find(p => p.id === 'spawn') ?? platforms[0];
  const x = baseMapId === 'jungle' ? 494 : Math.max(world.left, Math.min(world.right - PLAYER_WIDTH, floor.x + floor.w / 2 - PLAYER_WIDTH / 2));
  const draft: MapDraft = { format: 'jump-royale-map', version: 1, id: newId(),
    name: blank ? 'My first climb' : `${MAPS.find(m => m.id === baseMapId)!.name} remix`, baseMapId,
    platforms: blank ? [floor, { id: 'crown', x: x - 35, y: floor.y - 300, w: 120, h: 24, type: 'anvil', solid: true }] : platforms,
    spawn: attachSpawn(floor,x+PLAYER_WIDTH/2), updatedAt: new Date().toISOString() };
  return parseDraft(JSON.stringify(draft));
}

export function readLibrary(storage: Pick<Storage, 'getItem'> = localStorage): MapDraft[] {
  const raw = JSON.parse(storage.getItem(LIBRARY_KEY) || '[]');
  if (!Array.isArray(raw) || raw.length > 100) throw new Error('The saved map library could not be read. Export your open draft before clearing browser data.');
  return raw.map(item => parseDraft(JSON.stringify(item)));
}
export function saveDraft(draft: MapDraft, storage: Pick<Storage, 'getItem' | 'setItem'> = localStorage): void {
  const valid = parseDraft(JSON.stringify(draft));
  const maps = readLibrary(storage).filter(m => m.id !== valid.id);
  if (maps.length >= 100) throw new Error('Your library is full. Export and remove a map first.');
  storage.setItem(LIBRARY_KEY, JSON.stringify([valid, ...maps]));
}
export function movePlatform(p: Platform, x: number, y: number): void {
  const dx = x - p.x, dy = y - p.y;
  p.x = x; p.y = y;
  if (p.baseX !== undefined) p.baseX += dx;
  if (p.baseY !== undefined) p.baseY += dy;
}

export class DraftHistory {
  private past: string[] = [];
  private future: string[] = [];
  record(before: MapDraft, after: MapDraft): boolean {
    const a = JSON.stringify(before), b = JSON.stringify(after);
    if (a === b) return false;
    this.past.push(a); if (this.past.length > 80) this.past.shift();
    this.future = []; return true;
  }
  undo(current: MapDraft): MapDraft | undefined {
    const previous = this.past.pop(); if (!previous) return;
    this.future.push(JSON.stringify(current)); return JSON.parse(previous);
  }
  redo(current: MapDraft): MapDraft | undefined {
    const next = this.future.pop(); if (!next) return;
    this.past.push(JSON.stringify(current)); return JSON.parse(next);
  }
  get canUndo() { return !!this.past.length; }
  get canRedo() { return !!this.future.length; }
}
