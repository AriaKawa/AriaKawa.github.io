import type { Platform, PlayerState } from './types.js';
import { PLAYER_HEIGHT, SHAFT_LEFT, SHAFT_RIGHT } from './constants.js';
import { stepPlayer } from './physics.js';
import { updateBot } from './bots.js';

export const SURGE_MS = 6500;
export const VICTORY_MS = 3750;
export const SURGE_TOP = 100;
export function surgeHeight(startY: number, elapsedMs: number): number {
  return startY + (SURGE_TOP - startY) * Math.min(1, Math.max(0, elapsedMs / SURGE_MS));
}
export function prepareWinner(player: PlayerState, platforms: Platform[]): void {
  const crown = platforms.find(p => p.id === 'crown')!;
  player.vineId=undefined;player.vineRadius=undefined;
  player.alive = true;
  if (player.y + PLAYER_HEIGHT > crown.y + 2) {
    player.x = crown.x + crown.w / 2; player.y = crown.y - PLAYER_HEIGHT;
    player.vx = 0; player.vy = 0; player.grounded = true; player.groundedPlatformId = crown.id;
  }
}
export function stepFinale(players: Iterable<PlayerState>, platforms: Platform[], winnerId: string | undefined, hazardY: number, now: number, dt: number, eliminated: (p: PlayerState) => void): void {
  for (const p of players) {
    const height=p.maxHeight;
    if (p.isBot && p.id !== winnerId) updateBot(p, platforms, now);
    if (p.id === winnerId && p.isBot) p.input={left:false,right:false,jumpHeld:Math.floor(now/1000)%2===0,seq:0};
    stepPlayer(p, platforms, dt, p.id===winnerId ? {left:SHAFT_LEFT,right:SHAFT_RIGHT,top:-220} : undefined);
    p.maxHeight=height; // The celebration cannot change the final standings.
    if (p.id === winnerId) { if(p.y+PLAYER_HEIGHT>=hazardY) prepareWinner(p,platforms); }
    else if(p.alive && (p.y+PLAYER_HEIGHT>=hazardY || hazardY<=SURGE_TOP)) {p.alive=false;p.charging=false;p.eliminatedAt=now;eliminated(p);}
  }
}
