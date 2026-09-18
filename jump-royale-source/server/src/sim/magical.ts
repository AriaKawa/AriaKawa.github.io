import {MAGICAL_BRANCHES} from './magicalBranches.js';
import type {Platform} from './types.js';

export const MAGICAL_WIDTH=2880;
export const MAGICAL_HEIGHT=10920;
export const MAGICAL_SPAWN=MAGICAL_HEIGHT-240;
export const MAGICAL_CHAPTERS=['WISHING PLAZA','RIBBON ROOFTOPS','ROSEGLASS GARDENS','STAR CRYSTAL ARCADE','LUNAR SANCTUARY','HEART OF THE MOON'];
export const magicalSection=(y:number)=>Math.max(0,Math.min(5,Math.floor((MAGICAL_SPAWN+32-y)/1780)));

type Step=readonly [dx:number,rise:number,width:number];
/** Authored courses: long traverses, hooks, offset stairs, staggered needles,
 * wide recovery landings and asymmetric detours. No repeating four-step fork. */
const COURSES:readonly (readonly Step[])[]=[
 [[170,90,190],[205,100,170],[180,120,142],[-130,110,180],[205,125,150]],
 [[185,130,128],[-145,100,176],[-180,120,118],[135,140,104],[205,90,210],[160,115,155]],
 [[220,100,134],[155,140,96],[-180,115,150],[225,105,120],[-140,135,180]],
 [[-195,125,160],[-220,90,200],[-150,145,92],[180,115,128],[-215,110,166],[-160,130,138]],
 [[-230,95,180],[145,140,104],[-180,115,132],[-210,100,190],[160,135,116]],
 [[180,150,90],[210,90,158],[145,125,116],[-195,105,185],[225,120,128],[150,110,170]],
 [[-185,110,166],[155,145,94],[235,90,155],[170,130,112],[-145,105,196]],
 [[210,115,142],[-165,130,110],[220,100,178],[-195,145,96],[-150,95,205],[225,120,136]],
 [[-220,105,148],[-175,135,102],[160,100,184],[-205,125,126],[145,145,88]],
 [[-180,140,108],[215,95,176],[-155,120,144],[-235,105,132],[180,135,104],[-150,100,192]],
 [[205,90,210],[160,150,94],[-190,110,148],[230,100,130],[175,140,108]],
 [[210,120,140],[-150,145,90],[-195,100,184],[165,130,114],[235,90,156],[-170,120,172]],
 [[-220,100,150],[155,130,116],[-180,145,90],[-225,95,174],[165,125,136]],
 [[190,135,102],[225,95,168],[-145,120,142],[180,150,88],[-210,100,184],[155,115,156]],
 [[-185,125,130],[-220,105,162],[165,140,98],[-150,90,214],[205,130,116]],
 [[225,100,144],[-180,150,90],[155,110,164],[205,125,120],[-235,95,180],[165,140,102]],
 [[-205,140,100],[180,110,154],[-155,125,130],[230,95,178],[-190,145,94]],
];
export function buildMagicalCourse(includeBranches=true){
 const platforms:Platform[]=[{id:'spawn',x:54,y:MAGICAL_SPAWN+32,w:650,h:208,type:'stone',magical:true,solid:true}];
 const main=['spawn'],branches:string[][]=[];
 let cx=480,y=MAGICAL_SPAWN+32,index=0;
 const add=(id:string,x:number,py:number,w:number)=>{const p:Platform={id,x:x-w/2,y:py,w,h:w<110?22:28,type:w<110?'wood':'stone',magical:true,solid:true};platforms.push(p);return p;};
 for(let section=0;section<COURSES.length;section++){
  const steps=COURSES[section];
  // Reflect a complete authored section at the map edge, preserving its shape.
  const offsets=steps.reduce<number[]>((a,s)=>[...a,(a.at(-1)??0)+s[0]],[]);
  const fits=(sign:number)=>offsets.every(x=>cx+x*sign>430&&cx+x*sign<2450);
  const sign=fits(1)?1:fits(-1)?-1:cx<1440?1:-1;
  for(const [dx,rise,w] of steps){cx+=dx*sign;y-=Math.round(rise*.94);const p=add('magical-'+index++,cx,y,w);main.push(p.id);}

 }
 // Finish the remaining height with a short alternating staircase.
 while(y>225){cx+=index%2?165:-175;y-=Math.min(120,y-180);const p=add('magical-'+index++,cx,y,140);main.push(p.id);}
 const crown=add('crown',cx+170,72,220);crown.type='anvil';main.push(crown.id);
 if(includeBranches)MAGICAL_BRANCHES.forEach((route,i)=>{const ids=[route.start];route.steps.forEach(([x,py,w],j)=>{const p=add(`magical-branch-${i}-${j}`,x,py,w);ids.push(p.id);});ids.push(route.end);branches.push(ids);});
 return {platforms,main,branches};
}
export function generateMagical():Platform[]{return buildMagicalCourse().platforms;}
