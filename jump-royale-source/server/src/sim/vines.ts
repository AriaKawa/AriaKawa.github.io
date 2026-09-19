import {PLAYER_HEIGHT, PLAYER_WIDTH, SPAWN_Y} from './constants.js';
import {solidBoxes} from './terrainGeometry.js';
import type {Platform, PlayerState} from './types.js';

export const CANOPY_VINE={id:'canopy-vine',x:320,y:SPAWN_Y+32-320,length:260,amplitude:.72,speed:1.65};
export function vinePose(time:number,radius=CANOPY_VINE.length){
  const v=CANOPY_VINE,angle=v.amplitude*Math.cos(time*v.speed);
  const angularVelocity=-v.amplitude*v.speed*Math.sin(time*v.speed);
  return {angle,x:v.x+Math.sin(angle)*radius,y:v.y+Math.cos(angle)*radius,
    vx:Math.cos(angle)*angularVelocity*radius,vy:-Math.sin(angle)*angularVelocity*radius};
}
function clearAt(x:number,y:number,platforms:Platform[]):boolean{
  return !platforms.some(p=>p.solid&&solidBoxes(p).some(b=>x+PLAYER_WIDTH>b.x+.5&&x<b.x+b.w-.5&&y+PLAYER_HEIGHT>b.y+.5&&y<b.y+b.h-.5));
}

/** Shared pendulum clock drives both the authoritative attachment and its artwork. */
export function stepVine(player:PlayerState,platforms:Platform[],dt:number,time:number):boolean{
  const wasHeld=!!player.vineJumpHeld;
  player.vineJumpHeld=player.input.jumpHeld;
  player.vineCooldown=Math.max(0,(player.vineCooldown??0)-dt);
  if(player.vineId){
    const radius=player.vineRadius??CANOPY_VINE.length;
    const climb=(Number(!!player.input.down)-Number(!!player.input.up))*90;
    const nextRadius=Math.max(80,Math.min(CANOPY_VINE.length,radius+climb*dt));
    let pose=vinePose(time,nextRadius);
    if(!clearAt(pose.x-PLAYER_WIDTH/2,pose.y-4,platforms))pose=vinePose(time,radius);
    else player.vineRadius=nextRadius;
    const release=player.input.jumpHeld&&!wasHeld;
    if(release||!clearAt(pose.x-PLAYER_WIDTH/2,pose.y-4,platforms)){
      player.vineId=undefined;player.vineRadius=undefined;player.vineCooldown=.65;
      player.vx=pose.vx;player.vy=pose.vy;
      return false;
    }
    player.x=pose.x-PLAYER_WIDTH/2;player.y=pose.y-4;
    player.vx=pose.vx;player.vy=pose.vy;
    player.grounded=false;player.groundedPlatformId=undefined;
    player.charging=false;player.charge01=0;player.chargeDirection=0;
    if(Math.abs(pose.vx)>2)player.facing=pose.vx<0?-1:1;
    player.maxHeight=Math.max(player.maxHeight,SPAWN_Y-player.y);
    return true;
  }
  if(player.grounded||player.ghost||player.vineCooldown)return false;
  // Sweep the hand and rope over a simulation step so fast jumps cannot tunnel through it.
  for(let i=0;i<=6;i++){
    const f=i/6,pose=vinePose(time-dt+dt*f);
    const handX=player.x+PLAYER_WIDTH/2+player.vx*dt*f,handY=player.y+4+player.vy*dt*f;
    const dx=handX-CANOPY_VINE.x,dy=handY-CANOPY_VINE.y;
    const radius=dx*Math.sin(pose.angle)+dy*Math.cos(pose.angle);
    const distance=Math.abs(dx*Math.cos(pose.angle)-dy*Math.sin(pose.angle));
    if(radius<80||radius>CANOPY_VINE.length+10||distance>15)continue;
    const grip=Math.min(CANOPY_VINE.length,radius),now=vinePose(time,grip);
    if(!clearAt(now.x-PLAYER_WIDTH/2,now.y-4,platforms))continue;
    player.vineId=CANOPY_VINE.id;player.vineRadius=grip;
    player.x=now.x-PLAYER_WIDTH/2;player.y=now.y-4;
    player.vx=now.vx;player.vy=now.vy;player.grounded=false;player.groundedPlatformId=undefined;
    player.charging=false;player.charge01=0;player.chargeDirection=0;
    return true;
  }
  return false;
}
