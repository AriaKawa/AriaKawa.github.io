import {generateForest} from './forest.js';
import {generateMountain} from './mountain.js';
import { generateLevel } from './level.js';
import { SPAWN_Y } from './constants.js';
import type { Platform } from './types.js';
import {sizePlatforms} from './platformSizing.js';

export type MapId = 'forge' | 'jungle' | 'snow' | 'mountain' | 'forest';
export const MAPS = [
  {id:'forest',name:'Moonveil Forest',subtitle:'Nightfall · Branching trails · 16-bit',description:'A moonlit forest of outstretched boughs and mossy cliffs. Cross long switchbacks, choose your route, and climb to the moon shrine.'},
  {id:'mountain',name:'The Long Mountain',subtitle:'Ten regions · One enormous ascent',description:'Cross abandoned roofs, climb the bell tower, and reach the stars. Committed jumps, moving lifts, secrets and long falls. Flood rises after two minutes.'},
  { id: 'forge', name: 'The Crown Forge', subtitle: 'Embers · Steel · Precision', description: 'The original six-chapter ascent.' },
  { id: 'jungle', name: 'Verdant Canopy', subtitle: 'Cliffs · Canopy · Rising flood', description: 'Climb the wild terrain. Outrun the flood.' },
  { id: 'snow', name: 'Frostpeak Summit', subtitle: 'Ice · Long jumps · Crumbling ledges', description: 'Cross the chasm. Ice slides; Space grips. Cracked ice breaks only for you.' }
] as const;

/** Authored terrain phrases: side-attached cliffs, small stones, logs and ruins. */
export function generateJungle(): Platform[] {
  const result: Platform[] = [{id:'spawn',x:54,y:SPAWN_Y+32,w:532,h:320,type:'stone',terrain:'ground',solid:true}];
  const phrase: {x:number;w:number;h:number;terrain:Platform['terrain']}[] = [
    {x:402,w:184,h:180,terrain:'right'},
    {x:276,w:88,h:38,terrain:'island'},
    {x:54,w:136,h:210,terrain:'left'},
    {x:224,w:174,h:26,terrain:'log'},
    {x:456,w:130,h:185,terrain:'right'},
    {x:316,w:68,h:64,terrain:'ruin'},
    {x:54,w:242,h:195,terrain:'left'},
    {x:308,w:78,h:42,terrain:'island'},
    {x:426,w:160,h:205,terrain:'right'},
    {x:238,w:122,h:28,terrain:'log'},
    {x:54,w:152,h:175,terrain:'left'},
    {x:265,w:196,h:62,terrain:'ruin'}
  ];
  let y=SPAWN_Y+32;
  for(let i=0;y>240;i++){
    y-=Math.min([92,112,106,118,105,124,108,116,98,128,110,120][i%12],y-180);
    const p={...phrase[i%12]};

    result.push({id:'jungle-'+i,...p,y,type:p.terrain==='log'?'wood':p.terrain==='ruin'?'anvil':'stone',solid:true});
  }
  result.push({id:'crown',x:224,y:72,w:192,h:48,type:'anvil',terrain:'ruin',solid:true});
  return sizePlatforms(result,'jungle');
}

export function generateSnow(): Platform[] {
  const result: Platform[] = [{id:'spawn',x:54,y:SPAWN_Y+32,w:532,h:180,type:'stone',terrain:'ground'}];
  let y=SPAWN_Y+32;
  for(let i=0;y>180;i++) {
    y-=Math.min([86,94,82,102,90,96,84,100][i%8],y-180);
    const rest=i%8===7;
    const fragile=i%8===2||i%8===5;
    const w=rest?230:fragile?190:200;
    // Alternate banks: crossing requires walking/sliding to the lip and a strong charge.
    result.push({id:'snow-'+i,x:i%2===0?586-w:54,y,w,h:rest?48:35,
      type:rest?'anvil':fragile?'cracked':'ice',slippery:!rest,
      crumbleSeconds:fragile?3.2:undefined,terrain:rest?'ruin':'island'});
  }
  result.push({id:'crown',x:224,y:72,w:192,h:56,type:'anvil',terrain:'ruin'});
  return sizePlatforms(result,'snow');
}
export const levelForMap = (map: MapId): Platform[] => map === 'forest' ? generateForest() : map === 'mountain' ? generateMountain() : map === 'snow' ? generateSnow() : map === 'jungle' ? generateJungle() : generateLevel();
