import type {Platform} from './types.js';
import {PLAYER_WIDTH} from './constants.js';
/** Shared physical surface; artwork uses the same dimensions. */
export function platformSurfaceY(p:Platform,playerX:number):number {
 const t=Math.max(0,Math.min(1,(playerX+PLAYER_WIDTH/2-p.x)/p.w));
 if(p.slope)return p.y+(1-t)*p.h;
 if(p.bucket&&t>p.bucket.left&&t<p.bucket.right)return p.y+p.bucket.depth;
 return p.y;
}
