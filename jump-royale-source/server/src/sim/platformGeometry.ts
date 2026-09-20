import type {Platform} from './types.js';
import {solidBoxes} from './terrainGeometry.js';
import {bucketPolygons} from './bucketGeometry.js';
import {PLAYER_WIDTH as W,PLAYER_HEIGHT as H} from './constants.js';

export type Point={x:number;y:number};
export type Contact={time:number;normal:Point;platform:Platform};
export const angle=(p:Platform)=>(p.rotation??0)*Math.PI/180;
export function toWorld(p:Platform,x:number,y:number):Point{
 const a=angle(p),c=Math.cos(a),s=Math.sin(a),dx=x-p.w/2,dy=y-p.h/2;
 return{x:p.x+p.w/2+dx*c-dy*s,y:p.y+p.h/2+dx*s+dy*c};
}
export function toLocal(p:Platform,x:number,y:number):Point{
 const a=angle(p),c=Math.cos(a),s=Math.sin(a),dx=x-p.x-p.w/2,dy=y-p.y-p.h/2;
 return{x:p.w/2+dx*c+dy*s,y:p.h/2-dx*s+dy*c};
}
export const corners=(p:Platform)=>[[0,0],[p.w,0],[p.w,p.h],[0,p.h]].map(([x,y])=>toWorld(p,x,y));
export function platformBounds(p:Platform){
 const pts=corners(p),x=Math.min(...pts.map(q=>q.x)),y=Math.min(...pts.map(q=>q.y));
 return{x,y,w:Math.max(...pts.map(q=>q.x))-x,h:Math.max(...pts.map(q=>q.y))-y};
}
export function polygons(p:Platform):Point[][]{
 if(p.forest&&p.bucket)return bucketPolygons(p).map(poly=>poly.map(q=>toWorld(p,q.x,q.y)));
 if(p.slope)return [[[0,p.h],[p.w,0],[p.w,p.h]].map(([x,y])=>toWorld(p,x,y))];
 const boxes=solidBoxes({...p,solid:true});
 return boxes.map(b=>[[b.x-p.x,b.y-p.y],[b.x+b.w-p.x,b.y-p.y],[b.x+b.w-p.x,b.y+b.h-p.y],[b.x-p.x,b.y+b.h-p.y]].map(([x,y])=>toWorld(p,x,y)));
}
/** Swept SAT: the player remains upright; the terrain rotates, with no raster stair steps. */
function sweepPolygon(x:number,y:number,dx:number,dy:number,poly:Point[]):Omit<Contact,'platform'>|undefined{
 const axes:Point[]=[{x:1,y:0},{x:0,y:1}];
 for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],len=Math.hypot(b.x-a.x,b.y-a.y);if(len>1e-7)axes.push({x:-(b.y-a.y)/len,y:(b.x-a.x)/len});}
 let enter=-Infinity,leave=Infinity,normal={x:0,y:0};
 for(const n of axes){
  const projection=poly.map(p=>p.x*n.x+p.y*n.y),r=W/2*Math.abs(n.x)+H/2*Math.abs(n.y);
  const lo=Math.min(...projection)-r,hi=Math.max(...projection)+r,pos=(x+W/2)*n.x+(y+H/2)*n.y,v=dx*n.x+dy*n.y;
  if(Math.abs(v)<1e-9){if(pos<=lo+1e-7||pos>=hi-1e-7)return;continue;}
  let t1=(lo-pos)/v,t2=(hi-pos)/v;const sign=v>0?-1:1;
  if(t1>t2)[t1,t2]=[t2,t1];
  if(t1>enter){enter=t1;normal={x:n.x*sign,y:n.y*sign};}
  leave=Math.min(leave,t2);if(enter>leave+1e-8)return;
 }
 if(enter< -1e-6||enter>1||leave<0||dx*normal.x+dy*normal.y>=-1e-8)return;
 return{time:Math.max(0,enter),normal};
}
export function sweep(x:number,y:number,dx:number,dy:number,platforms:Platform[]):Contact|undefined{
 let best:Contact|undefined;
 for(const p of platforms){
  const b=platformBounds(p);
  if(Math.max(x,x+dx)+W<b.x||Math.min(x,x+dx)>b.x+b.w||Math.max(y,y+dy)+H<b.y||Math.min(y,y+dy)>b.y+b.h+100)continue;
  for(const poly of polygons(p)){
   const hit=sweepPolygon(x,y,dx,dy,poly);if(!hit)continue;
   // Non-solid parts remain one-way floors, including when rotated.
   if(!p.solid&&(hit.normal.y>=-.01||dy<0))continue;
   if(!best||hit.time<best.time-1e-8||(Math.abs(hit.time-best.time)<1e-8&&hit.normal.y<best.normal.y))best={...hit,platform:p};
  }
 }
 return best;
}
export const canStand=(n:Point)=>n.y<0&&Math.abs(n.x)<=-n.y+1e-7;
export function supportAt(x:number,y:number,platforms:Platform[],distance=2):Contact|undefined{
 const hit=sweep(x,y,0,distance,platforms);return hit&&hit.normal.y<-.01?hit:undefined;
}
export function moveBody(x:number,y:number,dx:number,dy:number,platforms:Platform[]){
  let floor:Contact|undefined;
  const contacts:Contact[]=[];
 for(let i=0;i<6&&(Math.abs(dx)+Math.abs(dy)>1e-8);i++){
  const hit=sweep(x,y,dx,dy,platforms);
  if(!hit){x+=dx;y+=dy;break;}
  x+=dx*hit.time;y+=dy*hit.time;
  contacts.push(hit);
  if(hit.normal.y<-.01)floor=hit;
  dx*=1-hit.time;dy*=1-hit.time;
  const into=dx*hit.normal.x+dy*hit.normal.y;
  dx-=into*hit.normal.x;dy-=into*hit.normal.y;
 }
 return{x,y,floor,contacts};
}
/** Player's top-left Y at first contact when lowered over a chosen platform. */
export function standingY(p:Platform,x:number):number{
 const b=platformBounds(p),start=b.y-H-2;
 const hit=sweep(x,start,0,b.h+H+104,[p]);
 return hit?start+(b.h+H+104)*hit.time:p.y-H;
}
