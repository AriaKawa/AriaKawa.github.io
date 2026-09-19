import { generateSnow, generateJungle } from '../server/src/sim/maps.js';
import assert from 'node:assert/strict';
import {forgeLavaPools,touchesForgeLava,generateLevel} from '../server/src/sim/level.js';
import {stepPlayer} from '../server/src/sim/physics.js';
import {updateBot} from '../server/src/sim/bots.js';
import {updateMovingPlatforms} from '../server/src/sim/platforms.js';
import type {PlayerState} from '../server/src/sim/types.js';
const level=process.argv.includes('--snow') ? generateSnow() : process.argv.includes('--jungle') ? generateJungle() : generateLevel();
const bots:PlayerState[]=Array.from({length:8},(_,i)=>({id:String(i),name:'Bot',x:313,y:6972,vx:0,vy:0,alive:true,grounded:true,groundedPlatformId:'spawn',charging:false,charge01:0,chargeDirection:0,facing:0,isBot:true,colorIndex:i,maxHeight:0,skill:'cracked',input:{left:false,right:false,jumpHeld:false,seq:0},bot:{holdUntil:0,cooldownUntil:0,pattern:i,jumpCount:0,initialized:false}}));
for(let tick=0;tick<9000;tick++){const now=tick*1000/30;updateMovingPlatforms(level,now);for(const p of bots){updateBot(p,level,now);stepPlayer(p,level,1/30);assert(!touchesForgeLava(p,forgeLavaPools(level)),`Bot ${p.id} hit lava on ${p.groundedPlatformId} at ${now}`);}}
if(process.argv.includes('--debug'))console.table(bots.map(p=>({id:p.id,x:p.x,y:p.y,support:p.groundedPlatformId,target:p.bot?.targetId,launch:p.bot?.launchX,jumps:p.bot?.jumpCount})));
assert(bots.every(p=>p.groundedPlatformId==='crown'), 'Every expert bot pattern must complete the authored course');
console.log('PASS: all eight expert bot patterns reach the summit within five simulated minutes.');
