import assert from 'node:assert/strict';
import {generateJungle} from '../server/src/sim/maps.js';
import {stepPlayer} from '../server/src/sim/physics.js';
import {stepVine,vinePose,CANOPY_VINE} from '../server/src/sim/vines.js';
import {SPAWN_Y,PLAYER_WIDTH,GRAVITY} from '../server/src/sim/constants.js';
import type {PlayerState} from '../server/src/sim/types.js';
const platforms=generateJungle(),dt=1/30;
const make=():PlayerState=>({id:'qa',name:'QA',x:472,y:SPAWN_Y+12,vx:0,vy:0,alive:true,grounded:true,groundedPlatformId:'spawn',charging:false,charge01:0,chargeDirection:0,facing:-1,isBot:false,colorIndex:0,maxHeight:0,input:{left:false,right:false,jumpHeld:false,seq:0}});
// Real charged jump from the authored right spawn must catch without teleportation.
let caught:PlayerState|undefined,catchTime=0;
for(let wait=0;wait<2&&!caught;wait+=.1){for(let charge=12;charge<=24&&!caught;charge+=2){const p=make();let time=wait;for(let i=0;i<charge+35;i++){time+=dt;p.input={left:true,right:false,jumpHeld:i<charge,seq:i};stepPlayer(p,platforms,dt,{left:54,right:586,top:0,time});if(p.vineId){caught=p;catchTime=time;console.log('catch',{wait,charge,time,x:p.x,y:p.y});break;}}}}
assert(caught,'Jump from right spawn auto catches');const p=caught;
p.input={left:false,right:false,jumpHeld:false,up:true,seq:0};const radius=p.vineRadius!;
for(let i=0;i<12;i++)stepPlayer(p,platforms,dt,{left:54,right:586,top:0,time:catchTime+=dt});
assert(p.vineId);assert(p.vineRadius!<radius-20,'Up climbs');const upper=p.vineRadius!;p.input.up=false;p.input.down=true;
for(let i=0;i<6;i++)stepPlayer(p,platforms,dt,{left:54,right:586,top:0,time:catchTime+=dt});assert(p.vineRadius!>upper+10,'Down descends');
p.input.down=false;p.input.jumpHeld=true;const release=vinePose(catchTime+dt,p.vineRadius);stepPlayer(p,platforms,dt,{left:54,right:586,top:0,time:catchTime+=dt});assert(!p.vineId);assert(Math.abs(p.vx-release.vx)<1e-8);assert(Math.abs(p.vy-release.vy-GRAVITY*dt)<1e-8);assert(p.vineCooldown!>0);
for(let i=0;i<5;i++){stepPlayer(p,platforms,dt,{left:54,right:586,top:0,time:catchTime+=dt});assert(!p.vineId,'Release cooldown prevents immediate regrab');}
// A controlled release on the left-going swing reaches the actual left bank.
let landed=false;
for(let time=1;time<2.5&&!landed;time+=.03){const pose=vinePose(time),q=make();Object.assign(q,{x:pose.x-PLAYER_WIDTH/2,y:pose.y-4,grounded:false,groundedPlatformId:undefined,vineId:CANOPY_VINE.id,vineRadius:CANOPY_VINE.length});q.input.jumpHeld=true;for(let i=0;i<50;i++){stepPlayer(q,platforms,dt,{left:54,right:586,top:0,time:time+(i+1)*dt});if(q.grounded){if(q.groundedPlatformId==='jungle-0'){landed=true;console.log('left landing',{time,x:q.x,y:q.y});}break;}}}
assert(landed,'Momentum release can land on left bank');
// Grounded/dead characters do not latch, and a held button at catch is not a new release.
const q=make();assert.equal(stepVine(q,platforms,dt,0),false);q.alive=false;stepPlayer(q,platforms,dt);assert(!q.vineId);
console.log('PASS right-side jump, auto-grab, climb up/down, exact release momentum, cooldown, left landing, grounded/dead guards');
