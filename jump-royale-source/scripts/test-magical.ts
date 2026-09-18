import assert from 'node:assert/strict';
import {generateMagical,buildMagicalCourse,MAGICAL_SPAWN} from '../server/src/sim/magical';
import {stepPlayer} from '../server/src/sim/physics';
import {floodForMap} from '../server/src/sim/world';
import {updateBot} from '../server/src/sim/bots';
import type {Platform,PlayerState} from '../server/src/sim/types';
import {rewardSpinPoint,wallet} from '../client/src/game/economy';
const memory=new Map<string,string>();Object.assign(globalThis,{localStorage:{getItem:(k:string)=>memory.get(k)??null,setItem:(k:string,v:string)=>memory.set(k,v)}});
for(const p of [0,16,24,-1,NaN,1.5])assert.equal(rewardSpinPoint('bad-'+p,p),false);
for(const p of [1,8,15]){assert(rewardSpinPoint('good-'+p,p));assert(!rewardSpinPoint('good-'+p,p));}
assert.equal(wallet().freeSpins,1);assert.equal(wallet().spinPoints,0);
const course=buildMagicalCourse(),level=course.platforms,route=course.main.map(id=>level.find(p=>p.id===id)!);
const player=(p:Platform,x:number):PlayerState=>({id:'test',name:'Test',x,y:p.y-20,vx:0,vy:0,alive:true,grounded:true,groundedPlatformId:p.id,charging:false,charge01:0,chargeDirection:0,facing:0,isBot:false,colorIndex:0,maxHeight:0,input:{left:false,right:false,jumpHeld:false,seq:0}});
function solutions(a:Platform,b:Platform){let count=0;const nearby=level.filter(p=>p.id==='spawn'||(p.y>a.y-240&&p.y<a.y+80&&p.x<a.x+a.w+350&&p.x+p.w>a.x-350));
 for(let x=a.x+8;x<a.x+a.w-22;x+=4)for(const dir of [-1,0,1])for(let hold=6;hold<=24;hold++){
  const p=player(a,x);p.charging=true;p.charge01=Math.min(1,hold/24);p.input.left=dir<0;p.input.right=dir>0;
  for(let t=0;t<45;t++){stepPlayer(p,nearby,1/30);if(p.grounded){if(p.groundedPlatformId===b.id)count++;break;}}
 }return count;
}
let minimum=Infinity;
for(let i=1;i<route.length;i++){const n=solutions(route[i-1],route[i]);assert(n>0,`${route[i-1].id} -> ${route[i].id} unreachable`);minimum=Math.min(n,minimum);}
for(const path of course.branches)for(let i=1;i<path.length;i++){
 const a=level.find(p=>p.id===path[i-1])!,b=level.find(p=>p.id===path[i])!;
 assert(solutions(a,b)>0,`branch ${a.id} -> ${b.id} unreachable`);
}
assert(course.branches.length>=30);
const shapes=route.slice(1,-3).map((_,i)=>route.slice(i,i+4).map((p,j,a)=>j?[Math.round(p.x-a[j-1].x),a[j-1].y-p.y,p.w].join(':'):'').join('|'));
assert.equal(new Set(shapes).size,shapes.length,'No repeated four-platform shapes');
assert(new Set(route.slice(1).map((p,i)=>Math.round(route[i].y-p.y))).size>=10,'Varied jump heights');
assert(new Set(level.map(p=>p.w)).size>=20,'Varied landing widths');
for(const p of level){assert(p.x>=54&&p.x+p.w<=2826,`${p.id} outside map`);}
console.log(`PASS ${route.length-1} main jumps; ${course.branches.length} side routes / ${level.filter(p=>p.id.includes('branch')).length} side platforms; minimum ${minimum} launch solutions. Top-15 reward boundaries and duplicate protection pass.`);
const bots=Array.from({length:4},(_,i)=>({...player(level[0],313),id:'bot-'+i,isBot:true,skill:'cracked' as const,bot:{holdUntil:0,cooldownUntil:0,pattern:i,jumpCount:0,initialized:false}}));
let water=MAGICAL_SPAWN+90;const flood=floodForMap('magical');
for(let tick=0;tick<36000;tick++){if(tick/30>flood.grace)water-=Math.min(flood.max,flood.base+(tick/30-flood.grace)*flood.acceleration)/30;for(const p of bots){if(p.groundedPlatformId==='crown')continue;updateBot(p,level,tick*1000/30);stepPlayer(p,level,1/30);assert(p.y+20<water,`${p.id} caught by flood at ${tick/30}s on ${p.groundedPlatformId}`);}if(bots.every(p=>p.groundedPlatformId==='crown'))break;}
console.table(bots.map(p=>({id:p.id,support:p.groundedPlatformId,height:Math.round(MAGICAL_SPAWN-p.y)})));
assert(bots.every(p=>p.groundedPlatformId==='crown'),'Expert bots must finish all switchbacks');
