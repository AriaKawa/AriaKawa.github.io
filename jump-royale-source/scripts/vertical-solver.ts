import type {Platform,PlayerState} from '../server/src/sim/types.js';
import {stepPlayer} from '../server/src/sim/physics.js';
import {updateMovingPlatforms} from '../server/src/sim/platforms.js';
import {worldForMap} from '../server/src/sim/world.js';
import {GRAVITY,MIN_JUMP_VELOCITY_Y,MAX_JUMP_VELOCITY_Y} from '../server/src/sim/constants.js';
export type Action={direction:number;held:boolean;ticks:number};
export function solve(player:PlayerState,level:Platform[],time:number,target:Platform){
 const source=level.find(p=>p.id===player.groundedPlatformId)!;
 const near=level.filter(p=>p.y>=source.y-220&&p.y<=source.y+260);
 for(const ticks of [24,23,22,21,20,19,18,17,16,15,14,12,10,8]){
  const q=ticks/24,e=q*q*(3-2*q);let vy=MIN_JUMP_VELOCITY_Y+(MAX_JUMP_VELOCITY_Y-MIN_JUMP_VELOCITY_Y)*e,feet=source.y,frames=0;
  for(let f=1;f<40;f++){const old=feet;vy+=GRAVITY/30;feet+=vy/30;if(vy>=0&&old<=target.y+3&&feet>=target.y){frames=f;break;}}
  if(!frames)continue;
  for(const direction of [Math.sign(target.x+target.w/2-player.x)||1,0,-Math.sign(target.x+target.w/2-player.x)||-1])for(const offset of [0,-3,3,-6,6,-12,12,-24,24,-48,48]){
   const desired=Math.max(source.x-2,Math.min(source.x+source.w-12,target.x+target.w/2-7-direction*350*frames/30+offset));
   const p=structuredClone(player),platforms=structuredClone(near);let t=time;const actions:Action[]=[];
   const tick=(d:number,held:boolean)=>{
    const last=actions.at(-1);if(last&&last.direction===d&&last.held===held)last.ticks++;else actions.push({direction:d,held,ticks:1});
    p.input={left:d<0,right:d>0,jumpHeld:held,seq:0};updateMovingPlatforms(platforms,t*1000);stepPlayer(p,platforms,1/30,{...worldForMap('mountain'),time:t});t+=1/30;
   };
   if(source.slippery&&Math.abs(p.vx)>1){tick(0,true);for(let n=0;n<40;n++){tick(0,false);if(p.grounded)break;}if(p.groundedPlatformId!==source.id)continue;}
   // Countersteer on ice until the required launch point; charge grips afterward.
   for(let n=0;n<260&&Math.abs(p.x-desired)>2.3;n++){
    const dx=desired-p.x,steer=source.slippery?dx-p.vx*Math.abs(p.vx)/(2*620):dx;tick(Math.sign(steer),false);if(!p.grounded)break;
   }
   if(!p.grounded||Math.abs(p.x-desired)>5)continue;
   for(let n=0;n<ticks;n++)tick(direction,true);
   if(!p.grounded)continue;
   for(let n=0;n<40;n++){tick(direction,false);if(p.grounded)break;}
   if(p.groundedPlatformId!==target.id)continue;
   const actual=platforms.find(v=>v.id===target.id)!;
   const margin=Math.min(p.x-actual.x,actual.x+actual.w-p.x-14);
   if(margin<Math.min(2,Math.max(.1,(actual.w-14)/2-1.8)))continue;
   return {player:p,time:t,actions,margin};
  }
 }
 return undefined;
}
