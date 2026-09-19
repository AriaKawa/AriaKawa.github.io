import {rollLoot,type LootEntry} from './economy';

export const SPIN_DURATION=8437.5;
const identity=(item:LootEntry)=>item.slot+':'+item.id;
/** Visual filler only. Payment, odds and the awarded item remain in openLoot. */
export function buildLootReel(pool:readonly LootEntry[],count:number,winner?:LootEntry,winningIndex=40):LootEntry[] {
 const items:LootEntry[]=[];
 for(let i=0;i<count;i++) {
  if(winner&&i===winningIndex){items.push(winner);continue;}
  const blocked=new Set([items[i-1]&&identity(items[i-1]),winner&&i===winningIndex-1&&identity(winner)]);
  let item=rollLoot(pool);
  if(blocked.has(identity(item))) {
   const candidates=pool.filter(p=>!blocked.has(identity(p)));
   if(!candidates.length)throw new Error('Reel requires distinct items');
   item=candidates[Math.floor(Math.random()*candidates.length)];
  }
  items.push(item);
 }
 return items;
}

/** Vary presentation timing only; naturally adjacent high rarities get longer suspense. */
export function spinDuration(items:readonly LootEntry[],winningIndex=40,random=Math.random):number {
 const high=items.slice(winningIndex-1,winningIndex+2).some(item=>item.rarity>=3),roll=random();
 return SPIN_DURATION*(roll<.15?.85:roll<.15+(high?.7:.2)?1.3:1);
}
