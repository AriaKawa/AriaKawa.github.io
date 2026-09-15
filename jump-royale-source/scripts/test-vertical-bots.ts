import assert from 'node:assert/strict';
import {generateMountain,MOUNTAIN_FLOOR} from '../server/src/sim/mountain.js';
import {stepPlayer} from '../server/src/sim/physics.js';
import {updateBot} from '../server/src/sim/bots.js';
import {updateMovingPlatforms} from '../server/src/sim/platforms.js';
import {worldForMap} from '../server/src/sim/world.js';
import type {PlayerState} from '../server/src/sim/types.js';
const level=generateMountain();
for(const pattern of [0,1]){
 const p:PlayerState={id:'expert-'+pattern,name:'expert',x:313,y:MOUNTAIN_FLOOR-20,vx:0,vy:0,grounded:true,groundedPlatformId:'spawn',alive:true,charging:false,charge01:0,chargeDirection:0,facing:0,isBot:true,colorIndex:0,maxHeight:0,skill:'cracked',input:{left:false,right:false,jumpHeld:false,seq:0},bot:{holdUntil:0,cooldownUntil:0,pattern,jumpCount:0,initialized:false}};
 let t=0;
 for(;t<2400&&p.groundedPlatformId!=='crown';t+=1/30){updateMovingPlatforms(level,t*1000);updateBot(p,level,t*1000);stepPlayer(p,level,1/30,{...worldForMap('mountain'),time:t});}
 console.log(pattern,'time',t.toFixed(1),'platform',p.groundedPlatformId,'height',p.maxHeight);assert.equal(p.groundedPlatformId,'crown');
}
