import{canWork}from './land.mjs';
import {W,H} from './core.mjs';
export const PLANT_SECONDS=2.8;
export function advancePlanting(s,hand,dt,held,index,onGrow){
 if(!held||s.paused||!Number.isInteger(index)||index<0||index>=W*H||!canWork(s,index%W,Math.floor(index/W))){hand.charge=0;return 0;}
 hand.charge+=Math.max(0,Math.min(dt,.25));if(hand.charge<PLANT_SECONDS)return 0;hand.charge-=PLANT_SECONDS;
 const x=index%W,y=Math.floor(index/W),near=[];
 for(let yy=Math.max(0,y-1);yy<=Math.min(H-1,y+1);yy++)for(let xx=Math.max(0,x-1);xx<=Math.min(W-1,x+1);xx++){const i=yy*W+xx;if(s.land[i]<3&&canWork(s,xx,yy))near.push(i);}
 if(!near.length)return 0;
 near.sort((a,b)=>s.land[a]-s.land[b]||Math.hypot(a%W-x,Math.floor(a/W)-y)-Math.hypot(b%W-x,Math.floor(b/W)-y));
 const i=near[0],grown=Math.min(.65,3-s.land[i]);s.land[i]+=grown;s.totalLife+=grown;s.seeds+=grown*1.4;s.dew+=grown*.12;onGrow?.(i,grown,0);return grown;
}
