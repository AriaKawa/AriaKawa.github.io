import {wallet,openLoot,rollLoot,LOOT_ODDS,type LootEntry} from './economy';
import {LOOT_POOL,RARITIES} from './lootCatalog';
import './lootBox.css';

const chest=()=>`<img class="loot-chest" src="${import.meta.env.BASE_URL}assets/menu/loot-chest.png" alt="">`;
export function createLootBox(root:HTMLElement,onOpen:()=>void,onChange:()=>void,draw:(canvas:HTMLCanvasElement,item:LootEntry)=>void,onGold:()=>void) {
 const toggle=document.createElement('button');toggle.className='loot-toggle';toggle.type='button';
 toggle.setAttribute('aria-label','Open loot box');toggle.setAttribute('aria-haspopup','dialog');toggle.setAttribute('aria-controls','loot-dialog');
 const dialog=document.createElement('dialog');dialog.id='loot-dialog';dialog.className='loot-dialog';dialog.setAttribute('aria-label','Loot box');
 dialog.innerHTML=`<header><div class="loot-gold"><img src="${import.meta.env.BASE_URL}assets/menu/gold-bars.png" alt="Gold"><span class="loot-gold-amount" aria-live="polite"></span><button class="gold-add loot-gold-add" type="button" aria-label="Buy gold" aria-haspopup="dialog" aria-controls="gold-store"><span class="plus-icon" aria-hidden="true"></span></button></div><button class="loot-close" aria-label="Close loot box">×</button></header><div class="loot-window"><div class="loot-reel"></div><span class="loot-pointer" aria-hidden="true"></span></div><p class="loot-result" role="status" aria-live="polite"></p><footer class="loot-controls"><div class="loot-actions"><button class="loot-buy">Buy · 2 gold</button><button class="loot-free">Free spin</button></div><div class="loot-points" role="img"></div></footer><details class="loot-contents"><summary>Cache & drop chances</summary><div class="loot-grid"></div></details>`;
 (root.querySelector('.gold-marker')??root).append(toggle);root.append(dialog);
 let busy=false,animation:Animation|undefined;
 const reel=dialog.querySelector<HTMLElement>('.loot-reel')!,status=dialog.querySelector<HTMLElement>('.loot-result')!,buy=dialog.querySelector<HTMLButtonElement>('.loot-buy')!,free=dialog.querySelector<HTMLButtonElement>('.loot-free')!;
 const refresh=()=>{
  const w=wallet();toggle.innerHTML=chest()+`<span>Loot box</span>${w.freeSpins?`<b class="loot-badge">${w.freeSpins}</b>`:''}`;
  toggle.setAttribute('aria-label',`Open loot box${w.freeSpins?`, ${w.freeSpins} free spins`:''}`);
  dialog.querySelector('.loot-gold-amount')!.textContent='× '+w.gold;
  const points=dialog.querySelector('.loot-points')!;points.setAttribute('aria-label',`${w.spinPoints} of 3 points toward a free spin`);
  points.innerHTML=Array.from({length:3},(_,i)=>`<i class="${i<w.spinPoints?'filled':''}"></i>`).join('');
  buy.disabled=busy||w.gold<2;free.disabled=busy||w.freeSpins<1;
 };
 const card=(item:LootEntry,odds=false)=>{
  const el=document.createElement('article');el.className='loot-card';el.dataset.item=item.slot+':'+item.id;el.style.setProperty('--rarity',RARITIES[item.rarity].color);
  const chance=LOOT_ODDS[item.rarity]/LOOT_POOL.filter(p=>p.rarity===item.rarity).length;
  el.innerHTML=`<canvas width="64" height="64" aria-hidden="true"></canvas><strong>${item.name}</strong>${odds?`<span>${Number(chance.toFixed(2))}%</span>`:''}`;
  draw(el.querySelector('canvas')!,item);return el;
 };
 const populate=(items:LootEntry[])=>{reel.replaceChildren(...items.map(item=>card(item)));};
 const preview=()=>{animation?.cancel();reel.style.transform='translateX(-696px)';populate(Array.from({length:12},()=>rollLoot(LOOT_POOL)));};
 const spin=async(useFree:boolean)=>{
  if(busy)return;busy=true;refresh();
  const result=openLoot(LOOT_POOL,useFree);
  if(!result){busy=false;status.textContent='Unable to save spin.';refresh();return;}
  onChange();refresh();status.textContent='';dialog.classList.remove('loot-won');
  animation?.cancel();reel.style.transform='translateX(-696px)';
  const items=Array.from({length:48},()=>rollLoot(LOOT_POOL));items[40]=result.item;populate(items);
  const distance=40*156+72;
  animation=reel.animate([{transform:'translateX(-696px)'},{transform:`translateX(-${distance}px)`}],{duration:matchMedia('(prefers-reduced-motion: reduce)').matches?180:5400,easing:'cubic-bezier(.12,.72,.12,1)',fill:'forwards'});
  try{await animation.finished;}catch{return;}
  busy=false;dialog.classList.add('loot-won');
  status.textContent=result.item.name+(result.duplicate?' · Duplicate':'');
  refresh();onChange();if(dialog.open)(buy.disabled?free:buy).focus();
 };
 buy.onclick=()=>void spin(false);free.onclick=()=>void spin(true);
 dialog.querySelector<HTMLButtonElement>('.loot-close')!.onclick=()=>dialog.close();
 dialog.querySelector<HTMLButtonElement>('.loot-gold-add')!.onclick=onGold;
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
 dialog.addEventListener('close',()=>{toggle.focus();});
 dialog.addEventListener('keydown',e=>e.stopPropagation());dialog.addEventListener('keyup',e=>e.stopPropagation());
 toggle.onclick=()=>{onOpen();refresh();if(!busy&&!dialog.classList.contains('loot-won'))preview();dialog.showModal();};
 dialog.querySelector('.loot-grid')!.replaceChildren(...LOOT_POOL.map(item=>card(item,true)));refresh();
 return {open:()=>dialog.open,refresh,destroy:()=>{animation?.cancel();dialog.remove();toggle.remove();}};
}
