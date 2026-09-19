import {wallet,openLoot,lootChance,type LootEntry} from './economy';
import {LOOT_POOL,RARITIES} from './lootCatalog';
import './lootBox.css';
import {buildLootReel,spinDuration} from './lootReel';

const chest=()=>`<img class="loot-chest" src="${import.meta.env.BASE_URL}assets/menu/forged-command/chest.png" alt="">`;
export function createLootBox(root:HTMLElement,onOpen:()=>void,onChange:()=>void,draw:(canvas:HTMLCanvasElement,item:LootEntry,frame?:number)=>void,onGold:()=>void) {
 const toggle=document.createElement('button');toggle.className='loot-toggle';toggle.type='button';
 toggle.setAttribute('aria-label','Open loot box');toggle.setAttribute('aria-haspopup','dialog');toggle.setAttribute('aria-controls','loot-dialog');
 const dialog=document.createElement('dialog');dialog.id='loot-dialog';dialog.className='loot-dialog';dialog.setAttribute('aria-label','Loot box');
 dialog.innerHTML=`<header><div class="loot-gold"><img src="${import.meta.env.BASE_URL}assets/menu/gold-bars.png" alt="Gold"><span class="loot-gold-amount" aria-live="polite"></span><button class="gold-add loot-gold-add" type="button" aria-label="Buy gold" aria-haspopup="dialog" aria-controls="gold-store"><span class="plus-icon" aria-hidden="true"></span></button></div><button class="loot-close" aria-label="Close loot box"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6L18 18M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2"/></svg></button></header><div class="loot-window"><div class="loot-reel"></div><span class="loot-pointer" aria-hidden="true"></span></div><p class="loot-result" role="status" aria-live="polite"></p><footer class="loot-controls"><div class="loot-actions"><button class="loot-buy">Buy · 2 gold</button><div class="loot-free-group"><button class="loot-free">Free spin</button><div class="loot-points" role="img"></div></div></div></footer><details class="loot-contents"><summary>Cache & drop chances</summary><p>Finish in the top 15 to earn 1 loot box point. Every 3 points earns a free spin. Final standings are required. Rarity odds: blue 60%, purple 25%, pink 10%, red 4%, gold 1%. Within each rarity, unowned items are selected equally; duplicates only drop once you own that entire rarity. Individual odds below update with your collection.</p><div class="loot-grid"></div></details><div class="loot-help"><p id="loot-free-help" role="note" hidden>Finish in the top 15 to earn 1 point. Every 3 points earns a free spin. Stay until final standings. Duplicate prizes also return 1 point and 1 gold.</p><button type="button" class="loot-help-toggle" aria-expanded="false" aria-controls="loot-free-help">Free Spins?</button></div>`;
 (root.querySelector('.gold-marker')??root).append(toggle);root.append(dialog);
 const reveal=document.createElement('dialog');reveal.className='loot-reveal';reveal.setAttribute('aria-label','Mystery box reward');root.append(reveal);
 let revealTick=0,pending: {item:LootEntry;duplicate:boolean}|undefined;
 const stopReveal=()=>{cancelAnimationFrame(revealTick);revealTick=0;};
 reveal.addEventListener('click',()=>reveal.close());
 reveal.addEventListener('close',()=>{stopReveal();if(dialog.open)(buy.disabled?free:buy).focus();});
 const showReveal=(result:{item:LootEntry;duplicate:boolean})=>{
  stopReveal();pending=undefined;
  const item=result.item,jumping=['character','costume','retroCostume','hdCostume','magicalCostume'].includes(item.slot),legendary=item.rarity===RARITIES.length-1;
  reveal.dataset.rarity=String(item.rarity);reveal.dataset.jumping=String(jumping);reveal.style.setProperty('--rarity',RARITIES[item.rarity].color);
  reveal.innerHTML='<div class="reward-confetti" aria-hidden="true"></div><p class="reward-rarity"></p><div class="reward-stage"><canvas width="64" height="64" aria-hidden="true"></canvas></div><h2></h2><p class="reward-duplicate"></p><button type="button">Click anywhere to return</button>';
  reveal.querySelector('h2')!.textContent=item.name;
  reveal.querySelector('.reward-rarity')!.textContent=RARITIES[item.rarity].name;
  reveal.querySelector('.reward-duplicate')!.textContent=result.duplicate?'Duplicate · +1 gold · +1 spin point':'Added to your collection';
  if(legendary){const confetti=reveal.querySelector('.reward-confetti')!;for(let i=0;i<64;i++){const p=document.createElement('i');p.style.cssText='--x:'+Math.random()*100+'%;--delay:'+Math.random()*1.6+'s;--turn:'+Math.random()*720+'deg;background:'+['#ffd36b','#ff79bc','#8adfff','#fff4c7'][i%4];confetti.append(p);}}
  const canvas=reveal.querySelector('canvas')!,start=performance.now(),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate=(now:number)=>{const phase=((now-start)%1600)/1600;
   draw(canvas,item,jumping&&!reduced?(phase<.15?2:phase<.47?4:phase<.8?5:phase<.9?6:0):0);
   canvas.style.transform=jumping&&!reduced?'translateY('+(-Math.sin(Math.max(0,Math.min(1,(phase-.15)/.65))*Math.PI)*65)+'px)':'none';
   if(jumping&&!reduced)revealTick=requestAnimationFrame(animate);
  };
  reveal.showModal();animate(start);
 };
 let busy=false,animation:Animation|undefined,gridDirty=true;
 const iconCache=new Map<string,HTMLCanvasElement>();
 const contents=dialog.querySelector<HTMLDetailsElement>('.loot-contents')!;
 const refreshGrid=()=>{if(!contents.open||!gridDirty)return;dialog.querySelector('.loot-grid')!.replaceChildren(...LOOT_POOL.map(item=>card(item,true)));gridDirty=false;};
 contents.addEventListener('toggle',refreshGrid);
 const reel=dialog.querySelector<HTMLElement>('.loot-reel')!,status=dialog.querySelector<HTMLElement>('.loot-result')!,buy=dialog.querySelector<HTMLButtonElement>('.loot-buy')!,free=dialog.querySelector<HTMLButtonElement>('.loot-free')!;
 const refresh=()=>{
  gridDirty=true;refreshGrid();
  const w=wallet();toggle.dataset.freeSpins=String(w.freeSpins);toggle.innerHTML=chest()+`<span>Loot box</span>${w.freeSpins?`<b class="loot-badge">${w.freeSpins}</b>`:''}`;
  toggle.setAttribute('aria-label',`Open loot box${w.freeSpins?`, ${w.freeSpins} free spins`:''}`);
  dialog.querySelector('.loot-gold-amount')!.textContent=String(w.gold);
  const points=dialog.querySelector('.loot-points')!;points.setAttribute('aria-label',`${w.spinPoints} of 3 points toward a free spin`);
  points.innerHTML=Array.from({length:3},(_,i)=>`<i class="${i<w.spinPoints?'filled':''}"></i>`).join('');
  buy.disabled=busy||w.gold<2;free.disabled=busy||w.freeSpins<1;
 };
 const card=(item:LootEntry,odds=false)=>{
  const el=document.createElement('article');el.className='loot-card';el.dataset.item=item.slot+':'+item.id;el.dataset.rarity=String(item.rarity);el.style.setProperty('--rarity',RARITIES[item.rarity].color);
  const chance=lootChance(item,LOOT_POOL);
  el.innerHTML=`<canvas width="64" height="64" aria-hidden="true"></canvas><strong>${item.name}</strong>${odds?`<span>${Number(chance.toFixed(2))}%</span>`:''}`;
  const key=item.slot+':'+item.id;let icon=iconCache.get(key);if(!icon){icon=document.createElement('canvas');icon.width=64;icon.height=64;draw(icon,item);iconCache.set(key,icon);}
  el.querySelector('canvas')!.getContext('2d')!.drawImage(icon,0,0);return el;
 };
 const populate=(items:LootEntry[])=>{reel.replaceChildren(...items.map(item=>card(item)));};
 const preview=()=>{animation?.cancel();reel.style.transform='translate3d(-696px,0,0)';populate(buildLootReel(LOOT_POOL,12));};
 const spin=async(useFree:boolean)=>{
  if(busy)return;busy=true;refresh();
  const result=openLoot(LOOT_POOL,useFree);
  if(!result){busy=false;status.textContent='Unable to save spin.';refresh();return;}
  onChange();refresh();status.textContent='';dialog.classList.remove('loot-won');
  animation?.cancel();reel.style.transform='translate3d(-696px,0,0)';
  const items=buildLootReel(LOOT_POOL,48,result.item);populate(items);
  const distance=40*156+72;
  await new Promise<void>(resolve=>requestAnimationFrame(()=>resolve()));
  animation=reel.animate([{transform:'translate3d(-696px,0,0)'},{transform:`translate3d(-${distance}px,0,0)`}],{duration:matchMedia('(prefers-reduced-motion: reduce)').matches?180:spinDuration(items),easing:'cubic-bezier(.12,.64,.18,1)',fill:'forwards'});
  try{await animation.finished;}catch{return;}
  busy=false;dialog.classList.add('loot-won');
  status.textContent=result.item.name+(result.duplicate?' · Duplicate':'');
  refresh();onChange();if(dialog.open)showReveal(result);else pending=result;
 };
 const help=dialog.querySelector<HTMLElement>('.loot-help')!,helpButton=dialog.querySelector<HTMLButtonElement>('.loot-help-toggle')!,helpText=dialog.querySelector<HTMLElement>('#loot-free-help')!;
 const closeHelp=()=>{helpText.hidden=true;helpButton.setAttribute('aria-expanded','false');};
 helpButton.onclick=()=>{helpText.hidden=!helpText.hidden;helpButton.setAttribute('aria-expanded',String(!helpText.hidden));};
 const outsideHelp=(event:Event)=>{if(!help.contains(event.target as Node))closeHelp();};
 document.addEventListener('click',outsideHelp);
 dialog.addEventListener('close',closeHelp);
 dialog.addEventListener('keydown',event=>{if(event.key==='Escape'&&!helpText.hidden){event.preventDefault();closeHelp();}});
 buy.onclick=()=>void spin(false);free.onclick=()=>void spin(true);
 dialog.querySelector<HTMLButtonElement>('.loot-close')!.onclick=()=>dialog.close();
 dialog.querySelector<HTMLButtonElement>('.loot-gold-add')!.onclick=onGold;
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
 dialog.addEventListener('close',()=>{toggle.focus();});
 dialog.addEventListener('keydown',e=>e.stopPropagation());dialog.addEventListener('keyup',e=>e.stopPropagation());
 toggle.onclick=()=>{onOpen();refresh();if(!busy&&!dialog.classList.contains('loot-won'))preview();dialog.showModal();if(pending)showReveal(pending);};
 refresh();
 return {open:()=>dialog.open,refresh,destroy:()=>{document.removeEventListener('click',outsideHelp);animation?.cancel();stopReveal();reveal.remove();dialog.remove();toggle.remove();}};
}
