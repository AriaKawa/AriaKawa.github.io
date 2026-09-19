import type Phaser from 'phaser';
import type {PlayerState} from '../../../server/src/sim/types';
import {isExpedition} from './expeditionWorlds';

import './expedition.css';

export function createExpeditionInteraction(scene:Phaser.Scene,ui:HTMLElement,player:PlayerState,_viewport:()=>{width:number;height:number}) {
 const target=document.createElement('div');target.className='expedition-hotspot';target.hidden=true;target.tabIndex=0;target.setAttribute('role','button');ui.append(target);
 let wallpaper='',readyAt=0;
 const effects=new Set<Phaser.GameObjects.Arc>();
 const clear=()=>{for(const effect of effects){scene.tweens.killTweensOf(effect);effect.destroy();}effects.clear();};
 const puff=(x:number,y:number,r:number,color:number,alpha:number,dx:number,dy:number,duration:number,scale:number)=>{
  const effect=scene.add.circle(x,y,r,color,alpha).setDepth(2);effects.add(effect);
  scene.tweens.add({targets:effect,x:x+dx,y:y+dy,alpha:0,scale,duration,onComplete:()=>{effects.delete(effect);effect.destroy();}});return effect;
 };
 const fire=()=>{
  if(target.hidden||ui.querySelector('dialog[open]')||ui.classList.contains('forge-wardrobe-open')||ui.classList.contains('wallpaper-open')||scene.time.now<readyAt)return;
  readyAt=scene.time.now+1200;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  {
   player.grounded=false;player.groundedPlatformId=undefined;player.charging=false;player.charge01=0;player.vy=-850;player.vx=0;
   const x=player.x+7,y=player.y+20;
   for(let i=0;i<(reduced?4:22);i++)puff(x,y,2+i%5,wallpaper==='tidal-sanctuary'?0x8ef6ff:0xfac3f1,.6,(Math.random()-.3)*170,-30-Math.random()*200,900+Math.random()*600,.3);
  }
  scene.game.canvas.focus({preventScroll:true});
 };
 target.addEventListener('click',fire);target.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();fire();}});
 return {
  setWallpaper(id:string){
   clear();wallpaper=id;readyAt=0;ui.classList.toggle('expedition-wallpaper',isExpedition(id));
   target.hidden=!['tidal-sanctuary','cloud-garden'].includes(id);
   target.dataset.world=id;target.setAttribute('aria-label',id==='tidal-sanctuary'?'Ride bubble current':'Call a breeze');
  },
  destroy(){clear();target.remove();ui.classList.remove('expedition-wallpaper');},
 };
}

