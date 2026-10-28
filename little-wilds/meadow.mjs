import {W,H} from './core.mjs';
export const randomAt=n=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v);};
const offsets=Array.from({length:W*H},(_,i)=>[(randomAt(i+1)-.5)*.55,(randomAt(i+890)-.5)*.55]);
// Overlapping growth fields keep the save's coarse simulation cells invisible.
export function lifeAt(land,x,y,cover){
 let coverage=0,richness=0,weight=0,thickness=0;
 for(let yy=Math.max(0,Math.floor(y)-2);yy<=Math.min(H-1,Math.floor(y)+2);yy++)for(let xx=Math.max(0,Math.floor(x)-2);xx<=Math.min(W-1,Math.floor(x)+2);xx++){
  const i=yy*W+xx,v=land[i];if(!v)continue;
  const dx=x-xx-offsets[i][0],dy=y-yy-offsets[i][1];
  const d=Math.hypot(dx,dy),r=1.05+Math.min(v,3)*.14;
  if(d>=r)continue;
  const w=(1-d/r)**2;
  coverage+=w*Math.min(v/1.5,1.5);richness+=v*w;thickness+=(cover?.[i]||0)*w;weight+=w;
 }
 return {coverage,richness:weight?richness/weight:0,thickness:weight?thickness/weight:0};
}
export function meadowThreshold(x,y){return .1+.055*Math.sin(x*7.3+Math.sin(y*5))+.035*Math.sin(y*11.1+x*4.3);}

