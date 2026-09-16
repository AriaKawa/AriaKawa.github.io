import {wallet,openLoot,rollLoot,LOOT_ODDS,type LootEntry} from './economy';
import {LOOT_POOL,RARITIES} from './lootCatalog';
import './lootBox.css';

const chest='<span class="loot-chest" aria-hidden="true"><i></i><b>★</b></span>';
export function createLootBox(root:HTMLElement,onOpen:()=>void,onChange:()=>void,draw:(canvas:HTMLCanvasElement,item:LootEntry)=>void) {
 const toggle=document.createElement('button');toggle.className='loot-toggle';toggle.type='button';
 toggle.setAttribute('aria-label','Open loot box');toggle.setAttribute('aria-haspopup','dialog');toggle.setAttribute('aria-controls','loot-dialog');
 const dialog=document.createElement('dialog');dialog.id='loot-dialog';dialog.className='loot-dialog';dialog.setAttribute('aria-labelledby','loot-title');
 dialog.innerHTML=`<header><div><small>JUMP ROYALE · THE FIRST COLLECTION</small><h2 id="loot-title">A little luck. A new look.</h2></div><button class="loot-close" aria-label="Close loot box">×</button></header><div class="loot-intro">${chest}<div><h3>Climber's Cache</h3><p>Crack it open. Find your next favorite.</p></div></div><div class="loot-balances"></div><div class="loot-window"><div class="loot-reel"></div><span class="loot-pointer" aria-hidden="true"></span></div><p class="loot-result" role="status" aria-live="polite">Your next look is waiting.</p><div class="loot-actions"><button class="loot-buy">Buy · 2 gold</button><button class="loot-free">Use free spin</button></div><p class="loot-rules">Duplicates return <strong>1 gold + 1 point</strong>. Every <strong>3 points</strong> banks a free spin.<br>Earn 1 point by staying until elimination or match completion. Free spins stack!</p><details class="loot-contents"><summary>Inside the cache · skins & drop chances</summary><p>Each skin within a rarity has an equal chance. Starter items are excluded. Costumes unlock the complete look; hairstyles are for Ember.</p><div class="loot-odds"></div><div class="loot-grid"></div></details>`;
 root.append(toggle,dialog);
 let busy=false,animation:Animation|undefined;
 const reel=dialog.querySelector<HTMLElement>('.loot-reel')!,status=dialog.querySelector<HTMLElement>('.loot-result')!,buy=dialog.querySelector<HTMLButtonElement>('.loot-buy')!,free=dialog.querySelector<HTMLButtonElement>('.loot-free')!;
 const refresh=()=>{const w=wallet();toggle.innerHTML=chest+`<span>LOOT BOX<small>${w.freeSpins?`${w.freeSpins} FREE`:'2 GOLD'} · ${w.spinPoints}/3</small></span>`;dialog.querySelector('.loot-balances')!.innerHTML=`<span>◆ ${w.gold} GOLD</span><span>✦ ${w.freeSpins} FREE SPINS</span><span>${'●'.repeat(w.spinPoints)}${'○'.repeat(3-w.spinPoints)} ${w.spinPoints}/3 POINTS</span>`;buy.disabled=busy||w.gold<2;free.disabled=busy||w.freeSpins<1;free.textContent=`Use free spin · ${w.freeSpins}`;};
 const card=(item:LootEntry)=>{const el=document.createElement('article');el.className='loot-card';el.style.setProperty('--rarity',RARITIES[item.rarity].color);el.innerHTML=`<small>${RARITIES[item.rarity].name}</small><canvas width="64" height="64" aria-hidden="true"></canvas><strong>${item.name}</strong><span>${item.slot==='animalHat'?'Animal hat':item.slot}</span>`;draw(el.querySelector('canvas')!,item);return el;};
 const populate=(items:LootEntry[])=>{reel.replaceChildren(...items.map(card));};
 const preview=()=>{animation?.cancel();reel.style.transform='translateX(-696px)';populate(Array.from({length:12},()=>rollLoot(LOOT_POOL)));};
 const spin=async(useFree:boolean)=>{
  if(busy)return;busy=true;refresh();
  const result=openLoot(LOOT_POOL,useFree);
  if(!result){busy=false;status.textContent='Could not open: check your balance and browser storage.';refresh();return;}
  onChange();refresh();status.textContent='Opening your cache…';dialog.classList.remove('loot-won');
  animation?.cancel();reel.style.transform='translateX(-696px)';
  const items=Array.from({length:48},()=>rollLoot(LOOT_POOL));items[40]=result.item;populate(items);
  // Anchor the reel at the viewport center so resizing never changes the winner.
  const distance=40*156+72;
  animation=reel.animate([{transform:'translateX(-696px)'},{transform:`translateX(-${distance}px)`}],{duration:matchMedia('(prefers-reduced-motion: reduce)').matches?180:5400,easing:'cubic-bezier(.12,.72,.12,1)',fill:'forwards'});
  try{await animation.finished;}catch{return;}
  busy=false;dialog.classList.add('loot-won');
  status.textContent=`${result.item.name} · ${RARITIES[result.item.rarity].name} — ${result.duplicate?'Duplicate! +1 gold and +1 point.':'Unlocked! Find it in your wardrobe.'}`;
  refresh();onChange();if(dialog.open)(buy.disabled?free:buy).focus();
 };
 buy.onclick=()=>void spin(false);free.onclick=()=>void spin(true);
 dialog.querySelector<HTMLButtonElement>('.loot-close')!.onclick=()=>dialog.close();
 dialog.addEventListener('close',()=>{toggle.focus();});
 dialog.addEventListener('keydown',e=>e.stopPropagation());dialog.addEventListener('keyup',e=>e.stopPropagation());
 toggle.onclick=()=>{onOpen();refresh();if(!busy&&!dialog.classList.contains('loot-won'))preview();dialog.showModal();};
 dialog.querySelector('.loot-odds')!.innerHTML=RARITIES.map((r,i)=>`<span style="--rarity:${r.color}">${r.name} <b>${LOOT_ODDS[i]}%</b></span>`).join('');
 dialog.querySelector('.loot-grid')!.replaceChildren(...LOOT_POOL.map(card));refresh();
 return {open:()=>dialog.open,destroy:()=>{animation?.cancel();dialog.remove();toggle.remove();}};
}
