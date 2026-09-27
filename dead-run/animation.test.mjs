import test from 'node:test';
import assert from 'node:assert/strict';
import {Run} from './model.mjs';
import {difficultyAt} from './endless.mjs';
import {playerAnimation,zombieFrame,crumblePieces} from './animation.mjs';
import {ASSETS} from './visuals.mjs';
import {existsSync} from 'node:fs';
function empty(){const r=new Run(42);r.entities=[];r.platforms=[];r.exits=[];r.nextRow=r.nextPowerup=r.nextPlatformGroup=Infinity;return r;}
function step(r,seconds){for(let t=0;t<seconds;t+=1/60)r.update(1/60);}

test('starting zombies gain exactly 25% health, contact damage, pack size, pursuit speed and pressure',()=>{
 const r=empty(),d=difficultyAt(0);assert.equal(d.pack,3*1.25);assert.equal(d.runnerSpeed,3.8*1.25);
 for(const [kind,hp,damage] of [['walker',28.5,16.5],['runner',21,16.5],['brute',101.25,24]]){
  const e=r.zombie(kind,r.lane,40);assert.equal(e.hp,hp*1.25);assert.equal(e.damage,damage*1.25);
 }
 r.entities=[];r.chase=0;r.update(1/60);assert(Math.abs(r.chase-(1.6+r.time/150)*1.25/60)<1e-10);
});
test('running visits eight phases and firing never resets the legs',()=>{
 const r=empty(),frames=new Set();for(let i=0;i<40;i++){r.update(1/60);const idle=playerAnimation(r);frames.add(idle.frame);assert.equal(idle.pose,'run');r.aim=1;assert.equal(playerAnimation(r).frame,idle.frame);assert.equal(playerAnimation(r).pose,'aim');r.aim=0;}
 assert.equal(frames.size,8);
});
test('a jump follows all leap phases, plants on landing and returns to the running loop',()=>{
 for(const kind of [null,'minigun','skateboard']){
  const r=empty();if(kind)r.activatePowerup(kind);r.action('jump');const frames=new Set([playerAnimation(r).frame]);
  while(!r.grounded){r.update(1/60);assert.equal(playerAnimation(r).pose,'jump');frames.add(playerAnimation(r).frame);}
  assert.equal(frames.size,8);assert.equal(playerAnimation(r).frame,7);step(r,.16);assert.equal(playerAnimation(r).pose,kind==='skateboard'?'ride':kind==='minigun'?'aim':'run');
 }
});
test('roof drops use descent poses and drafts freeze flight and stride',()=>{
 const r=empty();r.elevation=3;r.update(1/60);assert(!r.grounded);assert.equal(playerAnimation(r).pose,'jump');assert.equal(playerAnimation(r).frame,5);
 const before=[r.stride,r.airTime,r.elevation,r.vy];r.drafting=true;r.update(.2);assert.deepEqual([r.stride,r.airTime,r.elevation,r.vy],before);
});
test('shield crushes vehicle bodies once, drops their occupants, and preserves support beneath a rider',()=>{
 const r=empty();r.platforms=[{id:'a',kind:'bus',lane:r.lane,at:8,end:40,height:3,ramp:0}];const z=r.zombie('walker',r.lane,30);assert.equal(z.elevation,3);r.activatePowerup('skateboard');r.update(1/60);
 assert.equal(r.platforms.length,0);assert.equal(z.elevation,0);assert.equal(r.hp,100);step(r,.1);const events=r.events.filter(e=>e.type==='crush');assert.equal(events.length,1);assert.equal(events[0].kind,'bus');assert(events[0].z>0);
 const roof=empty();roof.platforms=[{id:'b',kind:'truck',lane:roof.lane,at:0,end:80,height:3,ramp:0}];roof.elevation=roof.supportHeight=3;roof.activatePowerup('skateboard');roof.update(1/60);assert.equal(roof.platforms.length,1);assert.equal(roof.elevation,3);assert(roof.grounded);
 roof.platforms[0].exitRamp=20;roof.distance=70;roof.elevation=roof.supportHeight=1.5;roof.update(1/60);assert.equal(roof.platforms.length,1);assert(roof.grounded);assert(roof.elevation<1.5);
});
test('shield hits all obstacle types ahead and debris retains material, lane and height',()=>{
 for(const kind of ['car','barrier','gate','spikes','barrels']){
  const r=empty();r.add(kind,r.lane,7);r.activatePowerup('skateboard');r.update(1/60);assert.equal(r.entities.length,0);assert.equal(r.hp,100);
  const event=r.events.find(e=>e.type==='crush');assert.equal(event.kind,kind);const pieces=crumblePieces({...event,at:7},()=>.5);assert(pieces.length>=10);assert(pieces.every(p=>p.asset===kind&&p.lane===r.lane&&p.at===7&&p.life>0));assert.equal(crumblePieces({...event,at:7},Math.random,true).length,4);
 }
 assert.equal(crumblePieces({kind:'truck',at:10,lane:0})[0].asset,'truck-back');
});
test('every zombie type has a full eight-frame loop and individual phase offsets',()=>{
 for(const kind of ['walker','runner','brute','horde']){const frames=new Set();for(let i=0;i<120;i++)frames.add(zombieFrame(kind,i/60));assert.equal(frames.size,8);assert.notEqual(zombieFrame(kind,0,0),zombieFrame(kind,0,1));}
});
test('all locomotion variants resolve to real packaged assets',()=>{
 for(const weapon of ['carbine','shotgun','revolver'])for(const power of [null,'minigun','skateboard']){
  const r=empty();r.weapon=weapon;if(power)r.activatePowerup(power);
  for(let i=0;i<8;i++){r.stride=(i+.01)/8;r.time=i/7;for(const aim of [0,1]){r.aim=aim;const name=playerAnimation(r).asset;assert(ASSETS[name]);assert(existsSync(new URL(ASSETS[name],import.meta.url)));}}
  r.action('jump');for(let i=0;i<65;i++){const name=playerAnimation(r).asset;assert(ASSETS[name],name);assert(existsSync(new URL(ASSETS[name],import.meta.url)));r.update(1/60);}
 }
});
