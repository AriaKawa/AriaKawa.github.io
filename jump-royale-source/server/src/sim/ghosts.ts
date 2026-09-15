import type { PlayerState } from './types.js';
import { SHAFT_LEFT, SHAFT_RIGHT, PLAYER_WIDTH, PLAYER_HEIGHT, WORLD_HEIGHT } from './constants.js';

export function becomeGhost(p:PlayerState):void {
  if(p.alive)return;
  p.ghost=true;p.departed=false;p.charging=false;p.grounded=false;p.vx=0;p.vy=0;
}
/** Spectators never change their final competitive height or return to play. */
export function stepGhosts(players:Iterable<PlayerState>,now:number,dt:number,bounds={left:SHAFT_LEFT,right:SHAFT_RIGHT,height:WORLD_HEIGHT}):void {
  for(const p of players) {
    if(p.alive)continue;
    if(p.isBot && !p.ghost && !p.departed && now-(p.eliminatedAt??now)>1200) {
      if((p.bot?.pattern??0)%5===0)becomeGhost(p);else p.departed=true;
    }
    if(!p.ghost)continue;
    const dx=p.isBot?Math.sin(now/1900+p.colorIndex):Number(p.input.right)-Number(p.input.left);
    const dy=p.isBot?-.35+Math.sin(now/2300+p.colorIndex)*.3:Number(!!p.input.down)-Number(!!p.input.up);
    const speed=(p.isBot?90:440)/Math.max(1,Math.hypot(dx,dy));
    p.vx=dx*speed;p.vy=dy*speed;
    p.x=Math.max(bounds.left,Math.min(bounds.right-PLAYER_WIDTH,p.x+p.vx*dt));
    p.y=Math.max(0,Math.min(bounds.height-PLAYER_HEIGHT,p.y+p.vy*dt));
    if(dx)p.facing=dx<0?-1:1;
  }
}
