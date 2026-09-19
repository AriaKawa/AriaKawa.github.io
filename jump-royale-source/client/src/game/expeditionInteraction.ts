import type Phaser from 'phaser';
import type {PlayerState} from '../../../server/src/sim/types';
import {isExpedition} from './expeditionWorlds';
import {audio} from './audio';
import './expedition.css';

export function createExpeditionInteraction(scene:Phaser.Scene,ui:HTMLElement,player:PlayerState,viewport:()=>{width:number;height:number}) {
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
  const {width,height}=viewport(),reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(wallpaper==='corsair-cove'){
   const x=width*.455,y=height*.455;
   void audio.cannon();
   const ball=scene.add.circle(x,y,Math.max(5,height*.012),0x16191e).setStrokeStyle(1,0x777e88).setDepth(3).setName('cannonball');effects.add(ball);
   const flight={t:0};
   // Ballistic flight, with powder igniting at the real muzzle.
   scene.tweens.add({targets:ball,duration:1400,x:width*1.15,onUpdate:()=>{flight.t=ball.x-x;ball.y=y-flight.t*.6+.0006*flight.t*flight.t;},onComplete:()=>{effects.delete(ball);ball.destroy();}});
   puff(x,y,height*.025,0xffe5a0,1,width*.035,-height*.026,140,2.4).setName('cannon-flash');
   for(let i=0;i<(reduced?5:24);i++)puff(x,y,4+i%7,[0xc7bca5,0xeee0cb,0x857f77][i%3],.65,25+Math.random()*100,-15-Math.random()*70,600+Math.random()*700,3.5).setName('powder-cloud');
   for(let i=0;i<(reduced?3:10);i++)puff(width*(.24+Math.random()*.18),height*.815,4+i%4,0xb49a76,.45,(Math.random()-.5)*85,-8-Math.random()*25,650,3).setName('deck-dust');
  }else{
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
   target.hidden=!['corsair-cove','tidal-sanctuary','cloud-garden'].includes(id);
   target.dataset.world=id;target.setAttribute('aria-label',id==='corsair-cove'?'Fire cannon':id==='tidal-sanctuary'?'Ride bubble current':'Call a breeze');
  },
  destroy(){clear();target.remove();ui.classList.remove('expedition-wallpaper');},
 };
}
