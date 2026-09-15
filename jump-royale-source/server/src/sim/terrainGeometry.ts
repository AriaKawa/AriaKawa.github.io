import type { Platform } from './types.js';
import { TERRAIN_PROFILES } from './terrainProfiles.js';

export type CollisionBox = { x:number; y:number; w:number; h:number };
export function terrainProfile(p: Platform) {
  if(p.terrain==='left'||p.terrain==='right')return TERRAIN_PROFILES.cliff;
  if(p.terrain==='island'||p.terrain==='log'||p.terrain==='ruin')return TERRAIN_PROFILES[p.terrain];
  return undefined;
}

/** Both rendering and collision use these exact image-to-world scales. */
export function terrainArtScale(p: Platform) {
  const profile=terrainProfile(p);
  return profile ? {profile,x:p.w/(profile.right-profile.left),y:p.h/(profile.bottom-profile.landing)} : undefined;
}

const EMPTY: CollisionBox[]=[];
const cached=new WeakMap<Platform,{signature:string;boxes:CollisionBox[]}>();
export function solidBoxes(p: Platform): CollisionBox[] {
  if(!p.solid)return EMPTY;
  const signature=[p.x,p.y,p.w,p.h,p.terrain].join(':');
  const previous=cached.get(p);if(previous?.signature===signature)return previous.boxes;
  const scale=terrainArtScale(p);
  const boxes=scale ? scale.profile.rects.map(([x,y,w,h])=>({
    x:p.terrain==='right' ? p.x+p.w-(x+w-scale.profile.left)*scale.x : p.x+(x-scale.profile.left)*scale.x,
    y:p.y+(y-scale.profile.landing)*scale.y,w:w*scale.x,h:h*scale.y
  })) : [{x:p.x,y:p.y,w:p.w,h:p.h}];
  cached.set(p,{signature,boxes});return boxes;
}
