import {drawLabSheet,labSize,FINNS,LOOKS,type LabLook} from '../assets/wardrobe2';
import './wardrobe2.css';

/** The second wardrobe uses the existing wardrobe's art, tabs and item cards. */
export function createWardrobe2(root:HTMLElement,initial:LabLook|undefined,onOpen:()=>void,onEquip:(look:LabLook)=>void):{open:()=>boolean;destroy:()=>void} {
 let selection={...(initial??{variant:0,look:0})},category:'character'|'outfits'='character',tick=0;
 const toggle=document.createElement('button');toggle.type='button';toggle.className='wardrobe-toggle w2-toggle';toggle.setAttribute('aria-label','Open Wardrobe 2');toggle.title='Wardrobe 2';toggle.setAttribute('aria-haspopup','dialog');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','wardrobe2-panel');
 toggle.innerHTML=`<span class="wardrobe-art" aria-hidden="true"><img src="${import.meta.env.BASE_URL}assets/menu/wardrobe-pixel.png" alt=""><img src="${import.meta.env.BASE_URL}assets/menu/wardrobe-pixel-open.png" alt=""></span><span class="w2-label">2</span>`;
 const dialog=document.createElement('dialog');dialog.id='wardrobe2-panel';dialog.className='wardrobe-panel w2-dialog';dialog.setAttribute('aria-label','Wardrobe 2');
 dialog.innerHTML='<header><h2>Wardrobe 2</h2><button class="wardrobe-close pixel-button" type="button" aria-label="Close Wardrobe 2">×</button></header><div class="wardrobe-tabs" role="tablist" aria-label="Wardrobe 2 category"><button id="w2-tab-character" type="button" role="tab" data-category="character" aria-controls="w2-grid" aria-selected="true">Character</button><button id="w2-tab-outfits" type="button" role="tab" data-category="outfits" aria-controls="w2-grid" aria-selected="false" tabindex="-1">Outfits</button></div><div id="w2-grid" class="equipment-grid" role="tabpanel" aria-labelledby="w2-tab-character"></div><div class="purchase-bar" role="status" aria-live="polite"></div>';
 root.append(toggle,dialog);
 const sheets=new Map<string,HTMLCanvasElement>();
 const sheet=(s:LabLook)=>{const key=JSON.stringify(s);if(!sheets.has(key))sheets.set(key,drawLabSheet(s));return sheets.get(key)!;};
 const draw=(canvas:HTMLCanvasElement,s:LabLook,frame:number)=>{const c=canvas.getContext('2d')!,n=labSize(s);c.imageSmoothingEnabled=false;c.clearRect(0,0,64,64);c.drawImage(sheet(s),frame*n,0,n,n,0,0,64,64);};
 const grid=dialog.querySelector<HTMLElement>('.equipment-grid')!;
 const candidate=(id:number):LabLook=>({...selection,[category==='character'?'variant':'look']:id});
 const render=()=>{
  dialog.querySelectorAll<HTMLButtonElement>('[data-category]').forEach(b=>{const active=b.dataset.category===category;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
  grid.setAttribute('aria-labelledby','w2-tab-'+category);
  grid.innerHTML=(category==='character'?FINNS:LOOKS).map((name,id)=>`<button type="button" class="equipment-card" data-item="${id}" aria-label="${name}" aria-pressed="${id===(category==='character'?selection.variant:selection.look)}"><canvas width="64" height="64" aria-hidden="true"></canvas><span>${name}</span></button>`).join('');
  grid.querySelectorAll<HTMLButtonElement>('[data-item]').forEach(b=>{draw(b.querySelector('canvas')!,candidate(Number(b.dataset.item)),0);b.onclick=()=>{selection=candidate(Number(b.dataset.item));onEquip({...selection});grid.querySelectorAll<HTMLButtonElement>('[data-item]').forEach(card=>card.setAttribute('aria-pressed',String(card===b)));dialog.querySelector('.purchase-bar')!.textContent=(category==='character'?FINNS[selection.variant]:LOOKS[selection.look])+' equipped.';};});
 };
 dialog.querySelectorAll<HTMLButtonElement>('[data-category]').forEach((b,index)=>{b.onclick=()=>{category=b.dataset.category as typeof category;render();};b.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const tabs=dialog.querySelectorAll<HTMLButtonElement>('[data-category]');const next=e.key==='Home'?0:e.key==='End'?1:1-index;tabs[next].click();tabs[next].focus();};});
 dialog.querySelector<HTMLButtonElement>('.wardrobe-close')!.onclick=()=>dialog.close();
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{toggle.setAttribute('aria-expanded','false');toggle.focus();});
 toggle.onclick=()=>{onOpen();render();dialog.querySelector('.purchase-bar')!.textContent='';dialog.showModal();toggle.setAttribute('aria-expanded','true');dialog.querySelector<HTMLButtonElement>('[aria-selected=true]')!.focus();};
 const animate=(time:number)=>{if(dialog.open)grid.querySelectorAll<HTMLButtonElement>('[data-item]').forEach(b=>draw(b.querySelector('canvas')!,candidate(Number(b.dataset.item)),Math.floor(time/333)%2));tick=requestAnimationFrame(animate);};
 tick=requestAnimationFrame(animate);render();
 return {open:()=>dialog.open,destroy:()=>{cancelAnimationFrame(tick);dialog.remove();toggle.remove();}};
}
