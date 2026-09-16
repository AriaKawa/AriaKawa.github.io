import Phaser from 'phaser';
import { outfitTexture, sanitizeOutfit } from '../assets/cosmetics';
import { GAME_WIDTH, GAME_HEIGHT } from './constants';

export const WALLPAPERS = [
  {id:'forged-command',name:'The Forge',image:'forged-command/background.png',locked:false},
  {id:'starlight',name:'Starlight',image:'wallpapers/starlight.png',locked:true},
  {id:'moonveil',name:'Moonveil',image:'wallpapers/moonveil.png',locked:true},
] as const;

export function createWallpapers(scene:Phaser.Scene,ui:HTMLElement,onPreview:(id:string)=>void) {
  const toggle=document.createElement('button');
  toggle.type='button';toggle.className='wallpaper-toggle';toggle.title='Wallpapers';
  toggle.setAttribute('aria-label','Wallpapers');toggle.setAttribute('aria-haspopup','dialog');
  toggle.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="4" width="26" height="24" rx="2"/><circle cx="22" cy="11" r="3"/><path d="m5 25 8-12 6 8 4-5 5 9"/></svg><span>Wallpapers</span>';
  const dialog=document.createElement('dialog');dialog.className='wallpaper-dialog';dialog.setAttribute('aria-label','Wallpapers');
  dialog.innerHTML='<header><h2>Wallpapers</h2><button class="wallpaper-close" aria-label="Close wallpapers">×</button></header><div class="wallpaper-carousel"><button aria-label="Previous wallpaper">‹</button><div class="wallpaper-window"><div class="wallpaper-track"></div></div><button aria-label="Next wallpaper">›</button></div><h3 aria-live="polite"></h3><p class="wallpaper-status"></p><div class="wallpaper-dots" aria-hidden="true"></div><button class="wallpaper-equip">Equipped</button>';
  const track=dialog.querySelector<HTMLElement>('.wallpaper-track')!;
  for(const item of WALLPAPERS){const img=document.createElement('img');img.src=import.meta.env.BASE_URL+'assets/menu/'+item.image;img.alt=item.name+' wallpaper';img.draggable=false;track.append(img);}
  ui.append(toggle,dialog);
  let index=0;
  const effects:Phaser.GameObjects.GameObject[]=[];
  let timer:Phaser.Time.TimerEvent|undefined;
  const clear=()=>{timer?.remove();timer=undefined;for(const object of effects){scene.tweens.killTweensOf(object);object.destroy();}effects.length=0;};
  const animate=(id:string)=>{
    clear();if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    if(id==='moonveil')for(let i=0;i<12;i++){
      const glow=scene.add.circle(GAME_WIDTH*(.18+Math.random()*.4),GAME_HEIGHT*(.2+Math.random()*.65),5+Math.random()*5,0x49cfff,.13).setDepth(-1).setBlendMode(Phaser.BlendModes.ADD);
      const core=scene.add.circle(glow.x,glow.y,2,0xaff7ff,.85).setDepth(-1).setBlendMode(Phaser.BlendModes.ADD);
      effects.push(glow,core);scene.tweens.add({targets:[glow,core],y:glow.y-24,alpha:0,duration:1800+Math.random()*2500,delay:i*270,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
    }
    if(id==='starlight'){
      const key=outfitTexture(scene,sanitizeOutfit({character:'magical-girl'}));
      const fairy=scene.add.sprite(-80,GAME_HEIGHT*.28,key).setDepth(-1).setScale(1.4).setAlpha(.8);effects.push(fairy);
      const fly=()=>{fairy.setPosition(-80,GAME_HEIGHT*(.22+Math.random()*.18)).setVisible(true);fairy.play(key+'-jump',true);scene.tweens.add({targets:fairy,x:GAME_WIDTH+80,y:fairy.y-45,duration:7500,ease:'Sine.easeInOut',onComplete:()=>fairy.setVisible(false)});};
      fly();timer=scene.time.addEvent({delay:18000,loop:true,callback:fly});
    }
  };
  const render=()=>{
    const item=WALLPAPERS[index];track.style.transform=`translateX(-${index*100}%)`;
    dialog.querySelector('h3')!.textContent=item.name;
    dialog.querySelector('.wallpaper-status')!.textContent=item.locked?'🔒 Locked · Preview only':'Your current wallpaper';
    dialog.querySelector('.wallpaper-dots')!.textContent=WALLPAPERS.map((_,i)=>i===index?'●':'○').join('  ');
    const equip=dialog.querySelector<HTMLButtonElement>('.wallpaper-equip')!;equip.disabled=item.locked;equip.textContent=item.locked?'Locked':'Equipped';
    onPreview(item.id);animate(item.id);
  };
  toggle.addEventListener('click',()=>{index=0;dialog.showModal();render();});
  dialog.querySelectorAll('.wallpaper-carousel>button').forEach((button,i)=>button.addEventListener('click',()=>{index=(index+(i?1:-1)+WALLPAPERS.length)%WALLPAPERS.length;render();}));
  dialog.querySelector('.wallpaper-close')!.addEventListener('click',()=>dialog.close());
  dialog.querySelector('.wallpaper-equip')!.addEventListener('click',()=>{if(index===0)dialog.close();});
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{clear();onPreview('forged-command');toggle.focus();});
  return {open:()=>dialog.open,destroy:()=>{clear();dialog.remove();toggle.remove();}};
}
