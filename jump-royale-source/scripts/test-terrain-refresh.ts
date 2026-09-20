import assert from 'node:assert/strict';
import {generateForest} from '../server/src/sim/forest';
import {generateMountain} from '../server/src/sim/mountain';
import {generateSnow} from '../server/src/sim/maps';
import {stepPlayer} from '../server/src/sim/physics';
import {platformSurfaceY} from '../server/src/sim/platformSurface';
import {PLAYER_HEIGHT} from '../server/src/sim/constants';
import type {Platform,PlayerState} from '../server/src/sim/types';
import {SPIN_DURATION,spinDuration} from '../client/src/game/lootReel';

const player=(p:Platform,x:number):PlayerState=>({id:'test',name:'Test',x,y:platformSurfaceY(p,x)-PLAYER_HEIGHT,vx:0,vy:0,alive:true,grounded:true,groundedPlatformId:p.id,charging:false,charge01:0,chargeDirection:0,facing:0,isBot:false,colorIndex:0,maxHeight:0,input:{left:false,right:false,jumpHeld:false,seq:0}});
const bounds={left:0,right:3000,top:0};
const mountain=generateMountain(),slope=mountain.find(p=>p.slope)!;
for(const hold of [false,true]){
 const p=player(slope,slope.x+120),x=p.x;
 p.input.jumpHeld=hold;
 for(let i=0;i<15;i++)stepPlayer(p,[slope],1/30,bounds);
 assert(p.grounded,'Slope retains support');
 if(hold)assert.equal(p.x,x,'Crouching grips a slope while charging');else assert(p.x<x-12,'Idle drifts downhill');
 assert(Math.abs(p.y+PLAYER_HEIGHT-platformSurfaceY(slope,p.x))<.001,'Feet follow the slant');
 if(hold){p.input.jumpHeld=false;stepPlayer(p,[slope],1/30,bounds);assert(!p.grounded&&p.vy<0,'Charging on a slope can launch');}
}
const uphill=player(slope,slope.x+120);uphill.input.right=true;
for(let i=0;i<15;i++)stepPlayer(uphill,[slope],1/30,bounds);
assert(uphill.x>slope.x+120&&uphill.x<slope.x+140,'Uphill progress is slow and possible');

function solutions(level:Platform[],a:Platform,b:Platform){
 let count=0;const nearby=level.filter(p=>p.y>a.y-400&&p.y<a.y+300);
 for(let x=a.x+8;x<a.x+a.w-20;x+=6)for(const dir of [-1,0,1])for(let hold=6;hold<=24;hold++){
  const p=player(a,x);p.charging=true;p.charge01=hold/24;p.input.left=dir<0;p.input.right=dir>0;
  for(let t=0;t<50;t++){stepPlayer(p,nearby,1/30,bounds);if(p.grounded){if(p.groundedPlatformId===b.id)count++;break;}}
 }return count;
}
const branch=['foothills-4','slope-branch-entry','slope-branch-hill','slope-branch-exit','foothills-7'].map(id=>mountain.find(p=>p.id===id)!);
for(let i=1;i<branch.length;i++){const n=solutions(mountain,branch[i-1],branch[i]);console.log(branch[i-1].id,'->',branch[i].id,n);assert(n>0,'Slope branch must connect');}

const forest=generateForest(),pit=forest.find(p=>p.bucket)!;
const falling=player(pit,pit.x+pit.w/2);Object.assign(falling,{y:pit.y-90,grounded:false,groundedPlatformId:undefined});
for(let i=0;i<45&&!falling.grounded;i++)stepPlayer(falling,[pit],1/30,bounds);
assert.equal(falling.y+PLAYER_HEIGHT,pit.y+pit.bucket!.depth,'The pit opening must not have an invisible lid');
assert.equal(falling.groundedPlatformId,pit.id);
falling.charging=true;falling.charge01=1;falling.input.right=true;let escaped=false;
for(let i=0;i<50;i++){stepPlayer(falling,[pit],1/30,bounds);if(falling.y+PLAYER_HEIGHT<pit.y&&falling.x>pit.x+pit.w*pit.bucket!.right)escaped=true;}
assert(escaped,'A player can jump out of the pit');
assert(solutions(forest,forest.find(p=>p.id==='forest-0')!,pit)>0,'Optional pit can be reached from the first ledge');

const snow=generateSnow();assert(snow.every(p=>!p.crumbleSeconds&&p.type!=='cracked'));
assert(snow.filter(p=>p.slippery).length/snow.length<.22,'Ice must be occasional');
const widths=new Set(snow.filter(p=>p.id.startsWith('snow-')).map(p=>p.w));assert(widths.size>15);
assert.equal(SPIN_DURATION,6750*1.25);
const low=Array.from({length:48},()=>({slot:'test',id:'blue',name:'Blue',rarity:0}));
const nearRed=[...low];nearRed[41]={slot:'test',id:'red',name:'Red',rarity:3};
assert.equal(spinDuration(low,40,()=>.1),SPIN_DURATION*.85);
assert.equal(spinDuration(low,40,()=>.2),SPIN_DURATION*1.3);
assert.equal(spinDuration(low,40,()=>.5),SPIN_DURATION);
assert.equal(spinDuration(nearRed,40,()=>.5),SPIN_DURATION*1.3);
console.log('PASS continuous slope drift/charge/launch, connected mountain branch, open pit and escape, permanent varied snow terrain and suspense timing.');
