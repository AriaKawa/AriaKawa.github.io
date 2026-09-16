import {wallet} from './economy';

// Opt-in link for the owner's browser save. Ordinary visits never reset anyone.
export const RESET_TOKEN='wardrobe-20260916-8d43';
const KEY='jump-royale-wallet-v1',BACKUP='jump-royale-wardrobe-backup-'+RESET_TOKEN,RECEIPT='wardrobe-reset:'+RESET_TOKEN;
export function resetWardrobe():boolean {
 try {
  const current=wallet();if(current.rewards.includes(RECEIPT))return true;
  localStorage.setItem(BACKUP,JSON.stringify(current.owned));
  localStorage.setItem(KEY,JSON.stringify({...current,owned:[],rewards:[...current.rewards,RECEIPT]}));
  return true;
 }catch{return false;}
}
export function restoreWardrobe():boolean {
 try {
  const backup=JSON.parse(localStorage.getItem(BACKUP)||'null');
  if(!Array.isArray(backup)||!backup.every(p=>typeof p==='string'))return false;
  const current=wallet();
  localStorage.setItem(KEY,JSON.stringify({...current,owned:[...new Set([...current.owned,...backup])]}));
  return true;
 }catch{return false;}
}
export function handleWardrobeReset():void {
 const reset=location.hash==='#lock='+RESET_TOKEN,restore=location.hash==='#restore='+RESET_TOKEN;
 if(!reset&&!restore)return;
 const already=reset&&wallet().rewards.includes(RECEIPT);
 const ok=reset?resetWardrobe():restoreWardrobe();
 if(ok)history.replaceState(null,'',location.pathname+location.search);
 const notice=document.createElement('aside');notice.setAttribute('role','status');
 notice.style.cssText='position:fixed;z-index:10000;top:8px;left:50%;transform:translateX(-50%);max-width:90vw;padding:12px 16px;background:#191e24;color:#ffe3a0;border:2px solid #c79a51;font:14px/1.4 monospace;box-shadow:0 5px 25px #000';
 notice.append(document.createTextNode(ok?already?'This reset link has already been used. No changes made. ':reset?'Cosmetics locked. Starter items, gold and spins preserved. ':'Previous cosmetic unlocks restored. ':'Could not update this browser’s wardrobe. Check storage access. '));
 if(ok&&reset){const undo=document.createElement('button');undo.textContent='Undo';undo.onclick=()=>{if(restoreWardrobe())location.reload();};notice.append(undo);}
 const close=document.createElement('button');close.textContent='Dismiss';close.onclick=()=>notice.remove();notice.append(close);document.body.append(notice);
}
