import type Phaser from 'phaser';
import type {PlayerState} from '../../../server/src/sim/types';
import {EXPEDITION_WALLPAPERS,expeditionPlatform} from './expeditionWorlds';
import './expedition.css';

export function createExpeditionInteraction(scene:Phaser.Scene,ui:HTMLElement,player:PlayerState,viewport:()=>{width:number;height:number}) {
 const panel=document.createElement('section');panel.className='expedition-interaction';panel.hidden=true;
 const hint=document.createElement('p'),button=document.createElement('button');button.type='button';panel.append(hint,button);ui.append(panel);
 let wallpaper='',readyAt=0;
 const effects=new Set<Phaser.GameObjects.Arc>();
 const clear=()=>{for(const effect of effects){scene.tweens.killTweensOf(effect);effect.destroy();}effects.clear();};
 button.addEventListener('click',()=>{
  if(scene.time.now<readyAt)return;readyAt=scene.time.now+1200;
  const {width,height}=viewport(),platform=expeditionPlatform(wallpaper,width,height);
  const launch=wallpaper==='tidal-sanctuary'||wallpaper==='cloud-garden';
  if(launch){player.grounded=false;player.groundedPlatformId=undefined;player.charging=false;player.charge01=0;player.vy=-850;player.vx=0;}
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const x=launch?player.x+7:width*.5,y=launch?player.y+20:platform?.y??height*.65;
  for(let i=0;i<(reduced?4:22);i++){
   const color=wallpaper==='corsair-cove'?[0xffd980,0xffb858,0xffece0][i%3]:wallpaper==='tidal-sanctuary'?0x8ef6ff:0xfac3f1;
   const bubble=scene.add.circle(x,y,2+i%5,color,wallpaper==='tidal-sanctuary'?.28:.85).setDepth(1);
   if(wallpaper==='tidal-sanctuary')bubble.setStrokeStyle(1,0xb4fcff,.8);
   effects.add(bubble);scene.tweens.add({targets:bubble,x:x+(Math.random()-.3)*170,y:y-30-Math.random()*(reduced?30:200),alpha:0,scale:.3,duration:reduced?350:900+Math.random()*600,onComplete:()=>{effects.delete(bubble);bubble.destroy();}});
  }
  scene.game.canvas.focus({preventScroll:true});
 });
 return {
  setWallpaper(id:string){clear();wallpaper=id;readyAt=0;const world=EXPEDITION_WALLPAPERS.find(w=>w.id===id);panel.hidden=!world;hint.textContent=world?.description??'';button.hidden=!['corsair-cove','tidal-sanctuary','cloud-garden'].includes(id);button.textContent=id==='corsair-cove'?'Fire signal cannon':id==='tidal-sanctuary'?'Ride bubble current':'Call a breeze';},
  destroy(){clear();panel.remove();},
 };
}
