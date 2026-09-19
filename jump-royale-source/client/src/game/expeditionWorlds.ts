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
 const ledges:Record<string,[number,number,number]>={'corsair-cove':[.13,.494,.4],'neon-rooftops':[.02,.518,.54],'tidal-sanctuary':[0,.433,.55],'cloud-garden':[0,.416,.62]};
 const [x,y,w]=ledges[id];
 return {id:'forged-pedestal',x:width*x,y:height*y,w:width*w,h:12,type:id==='corsair-cove'?'wood':'stone'};
}
export const moonGeometry=(width:number,height:number)=>({x:width*.5,y:height*.5,radius:height*.198});
type Orbit={angle:number;altitude:number;speed:number};
const orbits=new WeakMap<PlayerState,Orbit>();
export function resetMoon(player:PlayerState):void {orbits.set(player,{angle:0,altitude:0,speed:0});player.grounded=true;player.charging=false;player.charge01=0;}
export function stepMoon(player:PlayerState,dt:number,width:number,height:number):number {
 const orbit=orbits.get(player)??{angle:0,altitude:0,speed:0};orbits.set(player,orbit);
 const moon=moonGeometry(width,height),direction=Number(player.input.right)-Number(player.input.left);
 if(direction)player.facing=direction<0?-1:1;
 orbit.angle+=direction*115/(moon.radius+orbit.altitude)*dt;
 if(player.grounded&&player.input.jumpHeld){player.charging=true;player.charge01=Math.min(1,player.charge01+dt/.8);}
 if(player.charging&&!player.input.jumpHeld){orbit.speed=180+player.charge01*140;player.grounded=false;player.charging=false;player.charge01=0;}
 if(!player.grounded){orbit.speed-=420*dt;orbit.altitude+=orbit.speed*dt;if(orbit.altitude<=0){orbit.altitude=0;orbit.speed=0;player.grounded=true;}}
 const radius=moon.radius+orbit.altitude;
 player.x=moon.x+Math.sin(orbit.angle)*radius-PLAYER_WIDTH/2;
 player.y=moon.y-Math.cos(orbit.angle)*radius-PLAYER_HEIGHT;
 player.vy=-orbit.speed;player.vx=direction*115;player.groundedPlatformId=player.grounded?'little-moon':undefined;
 return orbit.angle;
}
