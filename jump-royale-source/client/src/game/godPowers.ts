import {worldForMap} from '../../../server/src/sim/world';
import { solidBoxes } from "../../../server/src/sim/physics";
import { PLAYER_HEIGHT, PLAYER_WIDTH, SHAFT_LEFT, SHAFT_RIGHT, SPAWN_Y, WORLD_HEIGHT } from "../../../server/src/sim/constants";
import type { Platform, PlayerState } from "../../../server/src/sim/types";

/** Flight belongs only to the local practice client; multiplayer input cannot enable it. */
export function landPlayer(player: PlayerState, platforms: Platform[]): void {
  player.vineId=undefined;player.vineRadius=undefined;
  const bounds=worldForMap(platforms[0]?.magical?'magical':platforms[0]?.forest?'forest':platforms[0]?.mountain?'mountain':'forge');
  const fits = (x: number, y: number) => !platforms.some(p => solidBoxes(p).some(b =>
    x < b.x + b.w && x + PLAYER_WIDTH > b.x && y < b.y + b.h && y + PLAYER_HEIGHT > b.y + .01));
  const below = platforms.filter(p => p.y >= player.y + PLAYER_HEIGHT - 1 &&
    player.x + PLAYER_WIDTH > p.x && player.x < p.x + p.w && fits(player.x, p.y - PLAYER_HEIGHT))
    .sort((a,b) => a.y-b.y)[0];
  player.vx = 0; player.vy = 0; player.charging = false; player.charge01 = 0;
  player.input.jumpHeld = false;
  player.grounded = !!below; player.groundedPlatformId = below?.id;
  if (below) player.y = below.y - PLAYER_HEIGHT;
  // Inside terrain or below the floor, restore a nearby clear ledge.
  else {
    const ledges = platforms.map(p => ({p, x: Math.max(bounds.left, Math.min(bounds.right-PLAYER_WIDTH,p.x+p.w/2-PLAYER_WIDTH/2))}))
      .filter(({p,x}) => fits(x,p.y-PLAYER_HEIGHT)).sort((a,b) => Math.abs(a.p.y-player.y)-Math.abs(b.p.y-player.y));
    if (ledges[0]) { const {p,x}=ledges[0]; player.x=x; player.y=p.y-PLAYER_HEIGHT; player.grounded=true; player.groundedPlatformId=p.id; }
  }
}

export function stepFlight(player: PlayerState, dt: number, bounds:{left:number;right:number;height:number;spawnY:number;top?:number}={left:SHAFT_LEFT,right:SHAFT_RIGHT,height:WORLD_HEIGHT,spawnY:SPAWN_Y}): void {
  player.vineId=undefined;player.vineRadius=undefined;
  const dx = Number(player.input.right)-Number(player.input.left);
  const dy = Number(!!player.input.down)-Number(!!player.input.up);
  const speed = 440 / Math.max(1, Math.hypot(dx,dy));
  player.vx=dx*speed; player.vy=dy*speed;
  player.x=Math.max(bounds.left,Math.min(bounds.right-PLAYER_WIDTH,player.x+player.vx*dt));
  player.y=Math.max(bounds.top??0,Math.min(bounds.height-PLAYER_HEIGHT,player.y+player.vy*dt));
  player.grounded=false; player.groundedPlatformId=undefined; player.charging=false; player.charge01=0;
  if(dx) player.facing=dx<0?-1:1;
  player.maxHeight=Math.max(player.maxHeight,bounds.spawnY-player.y);
}
