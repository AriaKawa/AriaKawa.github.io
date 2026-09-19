import {wallet,type LootEntry} from './economy';

export const UNLOCK_TOKEN='collection-20260919-f81c4b';
/** Explicit owner link: preserve currency, rewards, and existing ownership. */
export function unlockCollection(hash:string,pool:readonly LootEntry[]):boolean {
 if(hash!=='#unlock='+UNLOCK_TOKEN)return false;
 try {
  const current=wallet();
  const owned=[...new Set([...current.owned,...pool.map(item=>item.slot+':'+item.id)])];
  localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({...current,owned}));
  return true;
 }catch{return false;}
}
