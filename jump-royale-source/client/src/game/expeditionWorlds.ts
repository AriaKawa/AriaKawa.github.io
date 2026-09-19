import type {PlayerState,Platform} from '../../../server/src/sim/types';
import {PLAYER_HEIGHT,PLAYER_WIDTH} from '../../../server/src/sim/constants';

export const EXPEDITION_WALLPAPERS=[
 {id:'corsair-cove',name:'Corsair Cove',rarity:2,description:'Your own pirate deck. Fire the signal cannon.'},
 {id:'moonwalk',name:'Little Moon',rarity:3,description:'Walk all the way around. Hold and release Space to orbit-jump.'},
 {id:'neon-rooftops',name:'Neon Rooftops',rarity:1,description:'A quiet rooftop above a glittering city.'},
 {id:'tidal-sanctuary',name:'Tidal Sanctuary',rarity:2,description:'Wake the bubble current for an underwater lift.'},
 {id:'cloud-garden',name:'Cloud Garden',rarity:1,description:'Call a breeze and leap above the clouds.'},
] as const;
export const isExpedition=(id:string)=>EXPEDITION_WALLPAPERS.some(w=>w.id===id);
export function expeditionPlatform(id:string,width:number,height:number):Platform|undefined {
 if(!isExpedition(id)||id==='moonwalk')return;
 const ledges:Record<string,[number,number,number]>={'corsair-cove':[0,.83,1],'neon-rooftops':[.02,.518,.54],'tidal-sanctuary':[0,.433,.55],'cloud-garden':[0,.416,.62]};
 const [x,y,w]=ledges[id];
 return {id:'forged-pedestal',x:width*x,y:height*y,w:width*w,h:12,type:id==='corsair-cove'?'wood':'stone'};
}
// Traced circle of the generated 1536 x 1024 lunar cap; most is below the viewport.
export const moonGeometry=(width:number,height:number)=>({x:width*.5,y:height*1.29,radius:height*.706});
// Keep attraction radial around the entire moon, including below the viewport.
type Orbit={angle:number;altitude:number;speed:number};
const orbits=new WeakMap<PlayerState,Orbit>();
export function resetMoon(player:PlayerState):void {orbits.set(player,{angle:0,altitude:0,speed:0});player.grounded=true;player.groundedPlatformId='little-moon';player.charging=false;player.charge01=0;player.vx=0;player.vy=0;}
export function stepMoon(player:PlayerState,dt:number,width:number,height:number,_surfaces:Platform[]=[]):number {
 const moon=moonGeometry(width,height);
 let orbit=orbits.get(player);
 if(!orbit||player.groundedPlatformId?.startsWith('ui-')){
  const dx=player.x+PLAYER_WIDTH/2-moon.x,dy=moon.y-player.y-PLAYER_HEIGHT;
  orbit={angle:Math.atan2(dx,dy),altitude:Math.max(0,Math.hypot(dx,dy)-moon.radius),speed:0};
  orbits.set(player,orbit);player.grounded=orbit.altitude===0;
 }
 // Menu cards never cancel lunar attraction. Only the moon supports the player.
 if(orbit.altitude>0)player.grounded=false;
 const crouching=player.grounded&&(player.input.jumpHeld||player.charging);
 const direction=crouching?0:Number(player.input.right)-Number(player.input.left);
 if(direction)player.facing=direction<0?-1:1;
 orbit.angle+=direction*115/(moon.radius+orbit.altitude)*dt;
 if(player.grounded&&player.input.jumpHeld){player.charging=true;player.charge01=Math.min(1,player.charge01+dt/.8);}
 if(player.charging&&!player.input.jumpHeld){orbit.speed=145+player.charge01*110;player.grounded=false;player.charging=false;player.charge01=0;}
 if(!player.grounded){orbit.speed-=110*dt;orbit.altitude+=orbit.speed*dt;if(orbit.altitude<=0){orbit.altitude=0;orbit.speed=0;player.grounded=true;}}
 const radius=moon.radius+orbit.altitude;
 player.x=moon.x+Math.sin(orbit.angle)*radius-PLAYER_WIDTH/2;
 player.y=moon.y-Math.cos(orbit.angle)*radius-PLAYER_HEIGHT;
 player.vy=-orbit.speed;player.vx=direction*115;player.groundedPlatformId=player.grounded?'little-moon':undefined;
 return orbit.angle;
}
