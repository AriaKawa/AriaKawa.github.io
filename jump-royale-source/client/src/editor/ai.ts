import type {Platform,PlayerState,InputMessage} from '../../../server/src/sim/types';
import type {WorldBounds} from '../../../server/src/sim/physics';
import {stepPlayer} from '../../../server/src/sim/physics';
import {updateMovingPlatforms} from '../../../server/src/sim/platforms';
import {platformBounds,supportAt,canStand} from '../../../server/src/sim/platformGeometry';
import {spawnLocations,type SpawnPoint} from '../../../server/src/sim/spawn';
const idle=():InputMessage=>({left:false,right:false,jumpHeld:false,seq:0});
type BotWorld=WorldBounds&{height:number};
export class EditorBot{
 player:PlayerState;plan:InputMessage[]=[];nextThink=0;attempts=0;status='Ready';
 constructor(readonly id:string,readonly origin:SpawnPoint,platforms:Platform[],readonly slot=0,readonly count=1){
  const start=spawnLocations(platforms,origin,count)[slot%count];
  this.player={id,name:'AI '+id.split('-').at(-1),x:start.x,y:start.y,vx:0,vy:0,alive:true,grounded:!!start.platformId,groundedPlatformId:start.platformId,charging:false,charge01:0,chargeDirection:0,facing:1,isBot:true,colorIndex:slot%8,maxHeight:0,input:idle()};
 }
 reset(platforms:Platform[],time:number){const p=spawnLocations(platforms,this.origin,this.count)[this.slot%this.count];Object.assign(this.player,{x:p.x,y:p.y,vx:0,vy:0,grounded:!!p.platformId,groundedPlatformId:p.platformId,charging:false,charge01:0,chargeDirection:0,crumblingPlatforms:{},input:idle(),vineId:undefined});this.plan=[];this.nextThink=time+.4;this.status='Retrying';this.attempts++;}
 think(platforms:Platform[],world:BotWorld,time:number):void{
  const player=this.player;if(!player.grounded||this.plan.length||time<this.nextThink||player.groundedPlatformId==='crown')return;
  const supportId=player.groundedPlatformId;
  // Only nearby geometry can affect these short trials. Candidates replay real inputs,
  // moving-platform timing, collisions, charge grip, and the same fixed timestep.
  const nearby=platforms.filter(p=>{const b=platformBounds(p);return b.x<player.x+700&&b.x+b.w>player.x-700&&b.y<player.y+320&&b.y+b.h>player.y-500;});
  let best:InputMessage[]|undefined,bestScore=-Infinity;
  for(const walk of player.charging?[0]:[0,-8,8])for(const charge of [10,18,24])for(const direction of [-1,0,1]){
   const probe=structuredClone(player),geometry=structuredClone(nearby),steps:InputMessage[]=[];let clock=time;
   const tick=(input:InputMessage)=>{steps.push(input);probe.input=input;updateMovingPlatforms(geometry,clock*1000);stepPlayer(probe,geometry,1/30,{...world,time:clock});clock+=1/30;};
   for(let i=0;i<Math.abs(walk);i++)tick({...idle(),left:walk<0,right:walk>0});
   if(!probe.grounded)continue;
   for(let i=0;i<charge;i++)tick({...idle(),left:direction<0,right:direction>0,jumpHeld:true});
   for(let i=0;i<65;i++){tick({...idle(),left:direction<0,right:direction>0});if(probe.grounded)break;if(probe.y>world.height)break;}
   if(!probe.grounded||probe.groundedPlatformId===supportId)continue;
   const rise=player.y-probe.y;if(rise< -40)continue;
   const score=rise+(probe.groundedPlatformId==='crown'?10000:0)-steps.length*.15-Math.abs(probe.x-player.x)*.01;
   if(score>bestScore){bestScore=score;best=steps;}
  }
  this.plan=best??[];this.status=best?'Jumping':'No jump found';this.nextThink=time+(best?.25:1.5);
 }
 step(platforms:Platform[],world:BotWorld,time:number):void{
  const p=this.player;
  if(p.groundedPlatformId==='crown'){p.input=idle();this.status='Finish reached';return;}
  const contact=p.grounded?supportAt(p.x,p.y,platforms):undefined;
  p.input=this.plan.shift()??{...idle(),jumpHeld:!!contact&&!canStand(contact.normal)};
  stepPlayer(p,platforms,1/30,{...world,time});
  if(p.y>world.height||!Number.isFinite(p.x+p.y))this.reset(platforms,time);
 }
}
