import assert from 'node:assert/strict';
import {generateMagical,MAGICAL_SPAWN} from '../server/src/sim/magical';
import {stepPlayer} from '../server/src/sim/physics';
import {floodForMap} from '../server/src/sim/world';
import {updateBot} from '../server/src/sim/bots';
import type {Platform,PlayerState} from '../server/src/sim/types';
import {rewardSpinPoint,wallet} from '../client/src/game/economy';
const memory=new Map<string,string>();Object.assign(globalThis,{localStorage:{getItem:(k:string)=>memory.get(k)??null,setItem:(k:string,v:string)=>memory.set(k,v)}});
for(const p of [0,16,24,-1,NaN,1.5])assert.equal(rewardSpinPoint('bad-'+p,p),false);
for(const p of [1,8,15]){assert(rewardSpinPoint('good-'+p,p));assert(!rewardSpinPoint('good-'+p,p));}
assert.equal(wallet().freeSpins,1);assert.equal(wallet().spinPoints,0);
const level=generateMagical(),route=level.filter(p=>!p.id.includes('branch'));
const player=(p:Platform,x:number):PlayerState=>({id:'test',name:'Test',x,y:p.y-20,vx:0,vy:0,alive:true,grounded:true,groundedPlatformId:p.id,charging:false,charge01:0,chargeDirection:0,facing:0,isBot:false,colorIndex:0,maxHeight:0,input:{left:false,right:false,jumpHeld:false,seq:0}});
function solutions(a:Platform,b:Platform){let count=0;const nearby=level.filter(p=>p.id==='spawn'||(p.y>a.y-240&&p.y<a.y+80&&p.x<a.x+a.w+350&&p.x+p.w>a.x-350));
 for(let x=a.x+8;x<a.x+a.w-22;x+=4)for(const dir of [-1,0,1])for(let hold=6;hold<=24;hold++){
  const p=player(a,x);p.charging=true;p.charge01=Math.min(1,hold/24);p.input.left=dir<0;p.input.right=dir>0;
  for(let t=0;t<45;t++){stepPlayer(p,nearby,1/30);if(p.grounded){if(p.groundedPlatformId===b.id)count++;break;}}
 }return count;
}
let minimum=Infinity;
for(let i=1;i<route.length;i++){const n=solutions(route[i-1],route[i]);assert(n>0,`${route[i-1].id} -> ${route[i].id} unreachable`);minimum=Math.min(n,minimum);}
for(const b of level.filter(p=>p.id.includes('branch'))){const i=Number(b.id.split('-').at(-1));for(const [a,z] of [[level.find(p=>p.id==='magical-'+(i-1))!,b],[b,level.find(p=>p.id==='magical-'+i)!]])assert(solutions(a,z)>0,`branch ${a.id} -> ${z.id} unreachable`);}
console.log(`PASS ${route.length-1} main jumps; ${level.filter(p=>p.id.includes('branch')).length} connected alternative routes; minimum ${minimum} launch solutions. Top-15 reward boundaries and duplicate protection pass.`);
const bots=Array.from({length:4},(_,i)=>({...player(level[0],313),id:'bot-'+i,isBot:true,skill:'cracked' as const,bot:{holdUntil:0,cooldownUntil:0,pattern:i,jumpCount:0,initialized:false}}));
let water=MAGICAL_SPAWN+90;const flood=floodForMap('magical');
for(let tick=0;tick<36000;tick++){if(tick/30>flood.grace)water-=Math.min(flood.max,flood.base+(tick/30-flood.grace)*flood.acceleration)/30;for(const p of bots){if(p.groundedPlatformId==='crown')continue;updateBot(p,level,tick*1000/30);stepPlayer(p,level,1/30);assert(p.y+20<water,`${p.id} caught by flood at ${tick/30}s on ${p.groundedPlatformId}`);}if(bots.every(p=>p.groundedPlatformId==='crown'))break;}
console.table(bots.map(p=>({id:p.id,support:p.groundedPlatformId,height:Math.round(MAGICAL_SPAWN-p.y)})));
assert(bots.every(p=>p.groundedPlatformId==='crown'),'Expert bots must finish all switchbacks');
