import assert from 'node:assert/strict';
import {generateLevel,forgeLavaPools,touchesForgeLava} from '../server/src/sim/level';
import {stepPlayer} from '../server/src/sim/physics';
import {updateMovingPlatforms} from '../server/src/sim/platforms';
import {updateBot} from '../server/src/sim/bots';
import type {Platform,PlayerState} from '../server/src/sim/types';
const level=generateLevel();
const player=(a:Platform,x=a.x+a.w/2-7):PlayerState=>({id:'test',name:'Test',x,y:a.y-20,vx:0,vy:0,alive:true,grounded:true,groundedPlatformId:a.id,charging:false,charge01:0,chargeDirection:0,facing:0,isBot:false,colorIndex:0,maxHeight:0,input:{left:false,right:false,jumpHeld:false,seq:0}});
let minimum=Infinity;
for(let i=1;i<level.length;i++){
 const a=level[i-1],b=level[i];if(a.type==='moving'||b.type==='moving')continue;
 let n=0;
 for(let x=a.x+2;x<a.x+a.w-16;x+=4)for(const dir of [-1,0,1])for(let hold=10;hold<=24;hold++){
 const p=player(a,x);p.charging=true;p.charge01=hold/24;p.input.left=dir<0;p.input.right=dir>0;
 for(let t=0;t<38;t++){stepPlayer(p,level.filter(q=>Math.abs(q.y-a.y)<400),1/30);if(p.grounded){if(p.groundedPlatformId===b.id)n++;break;}}
 }
 assert(n>0,`${a.id} -> ${b.id} unreachable`);minimum=Math.min(minimum,n);
}
assert(level.every(p=>p.solid));
const ceiling=level[1],head=player(level[0],ceiling.x+30);head.y=ceiling.y+ceiling.h+1;head.grounded=false;head.vy=-600;stepPlayer(head,[ceiling],1/30);assert.equal(head.vy,0);assert.equal(head.y,ceiling.y+ceiling.h);
for(let chapter=0;chapter<6;chapter++){
 const dock=level.find(p=>p.id===`dock-${chapter}`)!,ferry=level.find(p=>p.id===`ferry-${chapter}`)!,exit=level.find(p=>p.id===`exit-${chapter}`)!;
 assert(dock.y-exit.y>200);assert.equal(ferry.moveRange,176);
 for(const startTime of [0,2300,5700,8100]){
 const copies=level.map(p=>({...p}));updateMovingPlatforms(copies,startTime);
 const p=player(dock);p.isBot=true;p.skill='cracked';p.bot={holdUntil:0,cooldownUntil:0,pattern:0,jumpCount:0,initialized:true};let boarded=false,rideFrames=0;
 for(let t=0;t<900;t++){
 updateMovingPlatforms(copies,startTime+t*1000/30);updateBot(p,copies,t*1000/30);stepPlayer(p,copies,1/30);
 if(p.groundedPlatformId===ferry.id){boarded=true;rideFrames++;}
 if(touchesForgeLava(p,forgeLavaPools(copies)))throw Error(`lava chapter ${chapter} phase ${startTime}`);
 if(p.groundedPlatformId===exit.id)break;
 }
 assert(boarded);assert.equal(p.groundedPlatformId,exit.id,`ferry ${chapter} start ${startTime}`);assert(rideFrames>5,'Must stay aboard');
 }
}
const pool=forgeLavaPools(level)[0];assert(touchesForgeLava({x:pool.x+20,y:pool.y-19},[pool]));assert(!touchesForgeLava({x:54,y:pool.y},[pool]));
console.log(`PASS ${level.length} solid platforms; min ${minimum} static jump solutions; 24 timed ferry traversals; head collision; lava contact.`);
