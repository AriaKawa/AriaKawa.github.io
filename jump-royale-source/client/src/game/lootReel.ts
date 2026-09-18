import {rollLoot,type LootEntry} from './economy';

export const SPIN_DURATION=6750;
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
