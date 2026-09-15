import { stepPlayer } from '../../../server/src/sim/physics';
import { PLAYER_HEIGHT, PLAYER_WIDTH } from '../../../server/src/sim/constants';
import type { PlayerState, Platform } from '../../../server/src/sim/types';

export const LOBBY_SPRITE_SCALE=3.5;
const SPRITE_HALF=32*LOBBY_SPRITE_SCALE/2;
export const lobbyFloor=(height:number)=>height-2;
// Include the visible sprite so tails and paws stay inside the screen walls.
export const lobbyBounds=(width:number)=>({left:SPRITE_HALF-PLAYER_WIDTH/2,right:width-SPRITE_HALF+PLAYER_WIDTH/2,top:-180,bounce:.85});
export function createLobbyPlayer(width=896,height=540): PlayerState {
  return { id: 'lobby', name: '', x:width/2-PLAYER_WIDTH/2, y:lobbyFloor(height)-PLAYER_HEIGHT, vx: 0, vy: 0,
    alive: true, grounded: true, groundedPlatformId: 'lobby', charging: false,
    charge01: 0, chargeDirection: 0, facing: 1, isBot: false, colorIndex: 0, maxHeight: 0,
    input: { left: false, right: false, jumpHeld: false, seq: 0 } };
}
export function resizeLobbyPlayer(player:PlayerState,width:number,height:number,previousHeight:number):void {
  const bounds=lobbyBounds(width);
  player.x=Math.max(bounds.left,Math.min(bounds.right-PLAYER_WIDTH,player.x));
  player.y=Math.max(bounds.top,Math.min(lobbyFloor(height)-PLAYER_HEIGHT,player.y+height-previousHeight));
  if(player.grounded)player.y=lobbyFloor(height)-PLAYER_HEIGHT;
}
export function stepLobbyPlayer(player: PlayerState, dt: number,width=896,height=540, surfaces:Platform[]=[]): void {
  const floor:Platform[]=[{id:'lobby',x:0,y:lobbyFloor(height),w:width,h:32,type:'stone'}];
  // Menu platforms spread with the viewport; keep them reachable in portrait too.
  stepPlayer(player,[...floor,...surfaces],dt,{...lobbyBounds(width),jumpSpeedScale:1.35*Math.sqrt(Math.max(560,height)/560)});
}
