import type {Platform} from './types.js';
import {PLAYER_WIDTH as W,PLAYER_HEIGHT as H} from './constants.js';
import {platformBounds,standingY,supportAt,toWorld,toLocal} from './platformGeometry.js';
export interface SpawnPoint{x:number;y:number;platformId?:string;u?:number;v?:number}
export interface SpawnLocation{x:number;y:number;platformId?:string}
export function attachSpawn(p:Platform,worldX:number):SpawnPoint{
 const b=platformBounds(p),x=Math.max(b.x,Math.min(b.x+b.w-W,worldX-W/2)),y=standingY(p,x);
 const local=toLocal(p,x+W/2,y+H);
 return{x,y,platformId:p.id,u:Math.max(0,Math.min(1,local.x/p.w)),v:Math.max(0,Math.min(1,local.y/p.h))};
}
export function spawnPlatform(platforms:Platform[],spawn:SpawnPoint):Platform|undefined{
 if(spawn.platformId)return platforms.find(p=>p.id===spawn.platformId);
 return platforms.filter(p=>{const b=platformBounds(p);return spawn.x+W>b.x&&spawn.x<b.x+b.w;})
 .sort((a,b)=>Math.abs(standingY(a,spawn.x)-spawn.y)-Math.abs(standingY(b,spawn.x)-spawn.y))[0];
}
export function spawnLocations(platforms:Platform[],spawn:SpawnPoint,count:number):SpawnLocation[]{
 if(count<1)return[];
 const p=spawnPlatform(platforms,spawn);if(!p)return Array.from({length:count},()=>({x:spawn.x,y:spawn.y}));
 const b=platformBounds(p),middle=spawn.u!==undefined?toWorld(p,spawn.u*p.w,(spawn.v??0)*p.h).x:spawn.x+W/2;
 // Probe real support, including rotated ledges and recessed bucket floors.
 const candidates:SpawnLocation[]=[];
 const samples=Math.max(32,Math.min(256,Math.ceil(b.w/4)));
 for(let i=0;i<=samples;i++){
  const x=b.x+Math.max(0,b.w-W)*i/samples,y=standingY(p,x),hit=supportAt(x,y,[p],.1);
  if(hit)candidates.push({x,y,platformId:p.id});
 }
 if(!candidates.length)return Array.from({length:count},()=>({x:spawn.x,y:spawn.y}));
 const first=candidates[0].x,last=candidates.at(-1)!.x;
 const span=Math.min(last-first,Math.max(0,count-1)*(W+5)),start=Math.max(first,Math.min(last-span,middle-W/2-span/2));
 return Array.from({length:count},(_,i)=>{
  const desired=start+(count===1?0:span*i/(count-1));
  const sample=candidates.reduce((a,b)=>Math.abs(a.x-desired)<=Math.abs(b.x-desired)?a:b);
  const y=standingY(p,desired),hit=supportAt(desired,y,[p],.1);
  return hit?{x:desired,y,platformId:p.id}:{...sample};
 });
}
export function defaultSpawn(platforms:Platform[],fallbackY:number):SpawnPoint{
 const p=platforms.find(p=>p.id==='spawn'||p.id==='jungle-0')??platforms[0];
 return p?attachSpawn(p,p.x+p.w/2):{x:313,y:fallbackY};
}
