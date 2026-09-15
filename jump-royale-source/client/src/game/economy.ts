import type { Outfit, CosmeticSlot } from '../assets/cosmetics';
import {COSTUMES,costumeFields,costumePieces} from '../assets/costumeSets';
const KEY='jump-royale-wallet-v1';
type Wallet={gold:number;owned:string[];rewards:string[]};
export function wallet():Wallet {try{const w=JSON.parse(localStorage.getItem(KEY)||'null');if(w&&Number.isSafeInteger(w.gold)&&w.gold>=0&&Array.isArray(w.owned)&&Array.isArray(w.rewards))return w;}catch{}return {gold:0,owned:[],rewards:[]};}
function persist(w:Wallet):boolean {try{localStorage.setItem(KEY,JSON.stringify(w));return true;}catch{return false;}}
// A specific, one-time browser-wallet credit requested by the site owner.
export function claimGoldGift(hash:string):boolean {
  const gift='menu-fix-20260911-7c4b9e';
  if(hash!=='#gift='+gift)return false;
  const w=wallet(),receipt='gift:'+gift;
  if(w.rewards.includes(receipt))return true;
  if(!Number.isSafeInteger(w.gold+100))return false;
  w.gold+=100;w.rewards.push(receipt);return persist(w);
}
export const goldForPlace=(place:number)=>place===1?5:place>=2&&place<=3?3:place>=4&&place<=6?1:0;
export function price(slot:string,id:string):number {
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
  if(o.character==='original'&&o.costume)return owns('costume',o.costume)?[]:[['costume',o.costume]];
  if(o.character==='demon')return owns('character','demon')?[]:[['character','demon']];
  const animal=['puppy','cat','rat'].includes(o.character);
  const pieces:[string,string][] = animal?[['character',o.character],['animalHat',o.animalHat??'none']]:(['character','helmet','shirt','pants','hair'] as CosmeticSlot[]).map(s=>[s,o[s]]);
  return pieces.filter(([s,id])=>!owns(s,id));
}
export function playableOutfit(o:Outfit):Outfit {
 const result={...o};
 if(!owns('character',result.character))result.character='original';
 if(result.character==='original'&&result.costume)return {...result,...costumeFields(owns('costume',result.costume)?result.costume:'classic')};
 for(const slot of ['character','helmet','shirt','pants','hair'] as CosmeticSlot[]){if(!owns(slot,result[slot]))result[slot]=slot==='helmet'?'none':'original';}
 if(!owns('animalHat',result.animalHat??'none'))result.animalHat='none';return result;
}
