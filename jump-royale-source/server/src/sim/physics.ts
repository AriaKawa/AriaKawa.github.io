import {worldForMap} from './world.js';
import {mountainWind} from './mountain.js';
import {
  AIR_CONTROL, GRAVITY, HORIZONTAL_JUMP_SPEED, MAX_CHARGE_MS, MAX_JUMP_VELOCITY_Y,
  MIN_JUMP_VELOCITY_Y, PLAYER_HEIGHT, PLAYER_WIDTH, SHAFT_LEFT, SHAFT_RIGHT, SPAWN_Y, WALK_SPEED
} from "./constants.js";
import type { Platform, PlayerState } from "./types.js";

import { solidBoxes } from "./terrainGeometry.js";
export { solidBoxes } from "./terrainGeometry.js";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

export interface WorldBounds { left:number; right:number; top:number; bounce?:number; jumpSpeedScale?:number; time?:number }
const SHAFT_BOUNDS:WorldBounds={left:SHAFT_LEFT,right:SHAFT_RIGHT,top:0};
export function stepPlayer(player: PlayerState, platforms: Platform[], dt: number, bounds:WorldBounds=SHAFT_BOUNDS): void {
  if (!player.alive) return;
  const magical=!!platforms[0]?.magical;
  if(magical)bounds={...worldForMap('magical'),...bounds,left:54,right:worldForMap('magical').right};
  const forest=!!platforms[0]?.forest;
  if(forest)bounds={...worldForMap('forest'),...bounds,left:54,right:worldForMap('forest').right};
  const mountain=!!platforms[0]?.mountain;
  if(mountain)bounds={...worldForMap('mountain'),...bounds,left:54,right:worldForMap('mountain').right};
  // Each climber owns their collapse timers; never mutate the shared level.
  const collapse = player.crumblingPlatforms ??= {};
  for (const id of Object.keys(collapse)) collapse[id] = Math.max(0, collapse[id] - dt);
  platforms = platforms.filter(p => collapse[p.id] !== 0);
  if (player.groundedPlatformId && collapse[player.groundedPlatformId] === 0) {
    player.grounded = false; player.groundedPlatformId = undefined;
    player.charging = false; player.charge01 = 0; player.chargeDirection = 0;
  }
  const input = player.input;
  const direction = input.left === input.right ? 0 : input.left ? -1 : 1;
  if (player.grounded) {
    const support = platforms.find((platform) => platform.id === player.groundedPlatformId);
    if (support?.deltaX) player.x += support.deltaX;
    if (support?.deltaY) player.y += support.deltaY;
    if (input.jumpHeld) {
      player.vx = 0;
      player.charging = true;
      // Aim is live, not latched: releasing the direction before Space makes
      // this a vertical jump, and switching directions immediately changes aim.
      player.chargeDirection = direction;
      if (direction) {
        player.facing = direction;
      }
      player.charge01 = clamp01(player.charge01 + (dt * 1000) / MAX_CHARGE_MS);
    } else if (player.charging) {
      const easedCharge = player.charge01 * player.charge01 * (3 - 2 * player.charge01);
      player.vy = (MIN_JUMP_VELOCITY_Y + (MAX_JUMP_VELOCITY_Y - MIN_JUMP_VELOCITY_Y) * easedCharge) * (bounds.jumpSpeedScale ?? 1);
      player.vx = direction * HORIZONTAL_JUMP_SPEED;
      if (direction) player.facing = direction;
      player.grounded = false;
      player.groundedPlatformId = undefined;
      player.charging = false;
      player.charge01 = 0;
      player.chargeDirection = 0;
    } else {
      if (support?.slippery) {
        // Landing momentum carries across ice. Countersteering brakes; charging grips.
        const target=direction*WALK_SPEED;
        const change=(direction ? 620 : 80)*dt;
        player.vx += Math.max(-change,Math.min(change,target-player.vx));
      } else player.vx = direction * WALK_SPEED;
      if (direction) player.facing = direction;
    }
  } else if (direction) {
    player.vx += direction * HORIZONTAL_JUMP_SPEED * AIR_CONTROL * dt;
  }

  if (!player.grounded && platforms[0]?.mountain) player.vx += mountainWind(player.x,player.y,bounds.time ?? 0)*dt;
  const oldY = player.y;
  const oldX = player.x;
  if (!player.grounded) player.vy += GRAVITY * dt;
  const wantedX=oldX+player.vx*dt;
  let resolvedX=wantedX;
  // Broad phase uses authored terrain extents; narrow phase uses only traced,
  // opaque rock pixels. Roots/vines and open undercuts never block a jump.
  for(const platform of platforms){
    if(!platform.solid||oldY+PLAYER_HEIGHT<=platform.y||oldY>=platform.y+platform.h+8)continue;
    for(const box of solidBoxes(platform)){
      if(oldY+PLAYER_HEIGHT<=box.y+.01||oldY>=box.y+box.h-.01)continue;
      if(wantedX>oldX&&oldX+PLAYER_WIDTH<=box.x+.01&&wantedX+PLAYER_WIDTH>box.x)resolvedX=Math.min(resolvedX,box.x-PLAYER_WIDTH);
      if(wantedX<oldX&&oldX>=box.x+box.w-.01&&wantedX<box.x+box.w)resolvedX=Math.max(resolvedX,box.x+box.w);
    }
  }
  player.x=resolvedX;
  if(resolvedX!==wantedX)player.vx=player.grounded?0:-player.vx*(bounds.bounce ?? 1);
  const wantedY=oldY+player.vy*dt;
  player.y=wantedY;
  if(player.vy<0){
    let ceiling=wantedY;
    for(const platform of platforms){
      if(!platform.solid||oldY<platform.y||wantedY>platform.y+platform.h+8)continue;
      for(const box of solidBoxes(platform)){
        if(player.x+PLAYER_WIDTH<=box.x+.01||player.x>=box.x+box.w-.01)continue;
        const bottom=box.y+box.h;
        if(oldY>=bottom-.01&&wantedY<bottom)ceiling=Math.max(ceiling,bottom);
      }
    }
    if(ceiling!==wantedY){player.y=ceiling;player.vy=0;}
  }

  if (player.x < bounds.left) {
    player.x = bounds.left;
    if (player.vx < 0) player.vx = -player.vx * (player.grounded?0:(bounds.bounce ?? 1));
  } else if (player.x + PLAYER_WIDTH > bounds.right) {
    player.x = bounds.right - PLAYER_WIDTH;
    if (player.vx > 0) player.vx = -player.vx * (player.grounded?0:(bounds.bounce ?? 1));
  }
  if (player.y < bounds.top) {
    player.y = bounds.top;
    if (player.vy < 0) player.vy = 80;
  }

  let landed = false;
  if (player.vy >= 0) {
    const oldBottom = oldY + PLAYER_HEIGHT;
    const newBottom = player.y + PLAYER_HEIGHT;
    for (const platform of [...platforms].sort((a, b) => a.y - b.y)) {
      if (oldBottom <= platform.y + 3 && newBottom >= platform.y &&
          player.x + PLAYER_WIDTH > platform.x + 2 && player.x < platform.x + platform.w - 2) {
        player.y = platform.y - PLAYER_HEIGHT;
        if (!platform.slippery) player.vx = 0;
        player.vy = 0;
        player.grounded = true;
        player.groundedPlatformId = platform.id;
        if (platform.crumbleSeconds && collapse[platform.id] === undefined) collapse[platform.id] = platform.crumbleSeconds;
        landed = true;
        break;
      }
    }
  }

  if (!landed && player.grounded) {
    const feet = player.y + PLAYER_HEIGHT + 2;
    const supported = platforms.find((p) => feet >= p.y && feet <= p.y + 5 &&
      player.x + PLAYER_WIDTH > p.x + 2 && player.x < p.x + p.w - 2);
    if (supported) player.groundedPlatformId = supported.id;
    else {
      player.grounded = false;
      player.groundedPlatformId = undefined;
    }
  }
  player.maxHeight = Math.max(player.maxHeight, Math.max(0, (magical?worldForMap('magical').spawnY:forest?worldForMap('forest').spawnY:mountain?worldForMap('mountain').spawnY:SPAWN_Y) - player.y));
}
