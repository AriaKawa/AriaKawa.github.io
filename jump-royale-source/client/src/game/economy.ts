import type { Outfit, CosmeticSlot } from '../assets/cosmetics';
import {COSTUMES,costumeFields,costumePieces} from '../assets/costumeSets';
const KEY='jump-royale-wallet-v1';
export type Wallet={gold:number;owned:string[];rewards:string[];spinPoints:number;freeSpins:number};
export function wallet():Wallet {try{const w=JSON.parse(localStorage.getItem(KEY)||'null');if(w&&Number.isSafeInteger(w.gold)&&w.gold>=0&&Array.isArray(w.owned)&&Array.isArray(w.rewards))return {...w,spinPoints:Number.isSafeInteger(w.spinPoints)&&w.spinPoints>=0?w.spinPoints%3:0,freeSpins:Number.isSafeInteger(w.freeSpins)&&w.freeSpins>=0?w.freeSpins:0};}catch{}return {gold:0,owned:[],rewards:[],spinPoints:0,freeSpins:0};}
function persist(w:Wallet):boolean {try{localStorage.setItem(KEY,JSON.stringify(w));return true;}catch{return false;}}
function addSpinPoint(w:Wallet):void {w.spinPoints++;if(w.spinPoints>=3){w.freeSpins++;w.spinPoints-=3;}}
export function rewardSpinPoint(round:string):boolean {
 const w=wallet(),receipt='spin-point:'+round;if(w.rewards.includes(receipt))return false;
 addSpinPoint(w);w.rewards.push(receipt);return persist(w);
}
export type LootEntry={slot:string;id:string;name:string;rarity:number};
export const LOOT_ODDS=[60,25,10,4,1] as const;
export function rollLoot<T extends LootEntry>(pool:readonly T[],random=()=>crypto.getRandomValues(new Uint32Array(1))[0]/4294967296):T {
 let roll=random()*100,tier=0;while(tier<LOOT_ODDS.length-1&&roll>=LOOT_ODDS[tier])roll-=LOOT_ODDS[tier++];
 const items=pool.filter(p=>p.rarity===tier);if(!items.length)throw new Error('Empty loot tier');
 return items[Math.floor(random()*items.length)];
}
/** Save payment and prize together, before starting the visual reveal. */
export function openLoot<T extends LootEntry>(pool:readonly T[],free:boolean):{item:T;duplicate:boolean}|null {
 const w=wallet();if(free?w.freeSpins<1:w.gold<2)return null;
 const item=rollLoot(pool),key=item.slot+':'+item.id,duplicate=owns(item.slot,item.id);
 if(free)w.freeSpins--;else w.gold-=2;
 if(duplicate){w.gold++;addSpinPoint(w);}else w.owned.push(key);
 return persist(w)?{item,duplicate}:null;
}
// A specific, one-time browser-wallet credit requested by the site owner.
export function claimGoldGift(hash:string):boolean {
  const gift=hash==='#gift=loot-cache-20260916-c739a2'?'loot-cache-20260916-c739a2':'menu-fix-20260911-7c4b9e';
  if(hash!=='#gift='+gift)return false;
  const w=wallet(),receipt='gift:'+gift;
  if(w.rewards.includes(receipt))return true;
  if(!Number.isSafeInteger(w.gold+100))return false;
  w.gold+=100;w.rewards.push(receipt);return persist(w);
}
export const goldForPlace=(place:number)=>place===1?5:place>=2&&place<=3?3:place>=4&&place<=6?1:0;
export function price(slot:string,id:string):number {
  if(slot==='character'&&id==='mushroom'&&(wallet().owned.includes('costume:mushroom')||['helmet','shirt','pants'].every(s=>owns(s,'mushroom'))))return 0;
  if(slot==='costume'){
    if(!COSTUMES.some(c=>c.id===id))return Infinity;
    return costumePieces(id).reduce((sum,[s,p])=>sum+(owns(s,p)?0:price(s,p)),0);
  }
  return id==='none'||(id==='original'&&slot!=='helmet')?0:slot==='character'||id==='party'?5:3;
}
export function owns(slot:string,id:string):boolean {return wallet().owned.includes(slot+':'+id)||price(slot,id)===0;}
export function buy(slot:string,id:string):boolean {const w=wallet(),cost=price(slot,id);if(owns(slot,id))return true;if(w.gold<cost)return false;w.gold-=cost;w.owned.push(slot+':'+id);return persist(w);}
export function reward(round:string,place:number):number {const w=wallet();if(w.rewards.includes(round))return 0;const amount=goldForPlace(place);w.gold+=amount;w.rewards.push(round);return persist(w)?amount:0;}
export function lockedPieces(o:Outfit):[string,string][] {
  if(['cerberus','skeleton','magical-girl'].includes(o.character)){
    const pieces:[string,string][]=[['character',o.character]];
    if(o.character==='magical-girl'&&o.hair==='star-buns')pieces.push(['hair','star-buns']);
    return pieces.filter(([s,id])=>!owns(s,id));
  }
  if(o.character==='original'&&o.costume)return owns('costume',o.costume)?[]:[['costume',o.costume]];
  if(o.character==='mushroom')return owns('character','mushroom')?[]:[['character','mushroom']];
  if(o.character==='demon')return ([['character','demon'],['hair',o.hair]] as [string,string][]).filter(([s,id])=>!owns(s,id));
  const animal=['puppy','cat','rat'].includes(o.character);
  const pieces:[string,string][] = animal?[['character',o.character],['animalHat',o.animalHat??'none']]:(['character','helmet','shirt','pants','hair'] as CosmeticSlot[]).map(s=>[s,o[s]]);
  return pieces.filter(([s,id])=>!owns(s,id));
}
export function playableOutfit(o:Outfit):Outfit {
 const result={...o};
 if(!owns('character',result.character))result.character='original';
 if(result.character==='mushroom')return result;
 if(result.character==='original'&&result.costume)return {...result,...costumeFields(owns('costume',result.costume)?result.costume:'classic')};
 for(const slot of ['character','helmet','shirt','pants','hair'] as CosmeticSlot[]){if(!owns(slot,result[slot]))result[slot]=slot==='helmet'?'none':'original';}
 if(!owns('animalHat',result.animalHat??'none'))result.animalHat='none';return result;
}
