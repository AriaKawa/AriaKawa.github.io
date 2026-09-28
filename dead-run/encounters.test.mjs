import test from 'node:test';
import assert from 'node:assert/strict';
import {Run,blockades,LANES,CARDS} from './model.mjs';
import {startEvent} from './random-events.mjs';
import {zombieFrame} from './animation.mjs';
import {zombieAsset} from './infected-art.mjs';
import {ASSETS} from './visuals.mjs';
import {existsSync,readFileSync} from 'node:fs';
function empty(){const r=new Run(42);r.entities=[];r.platforms=[];r.blockades=[];r.exits=[];r.nextRow=r.nextPowerup=r.nextCrate=r.nextPlatformGroup=r.nextEventAt=Infinity;r.shotTimer=100;return r;}
function step(r,t){for(let i=0;i<Math.ceil(t*60);i++)r.update(1/60);}
test('crawler is weak, slow, nonelite, and a standard jump avoids it while ground contact hurts',()=>{
 const r=empty(),c=r.zombie('crawler',r.lane,50),w=r.zombie('walker',1.5,50);assert(c.hp<w.hp/2);assert(c.damage<w.damage);assert(!c.elite);step(r,.1);assert(c.at<50&&c.at>49);
 const jumper=empty();jumper.action('jump');step(jumper,.18);jumper.zombie('crawler',jumper.lane,jumper.distance+2);step(jumper,.1);assert.equal(jumper.hp,100);
 const grounded=empty();grounded.zombie('crawler',grounded.lane,2);grounded.update(.02);assert(grounded.hp<100);
 const kill=empty(),z=kill.zombie('crawler',kill.lane,60);kill.hit(z,24);assert(z.done);assert.equal(kill.totalXp,3);
});
test('walker appearances are deterministic and share health, damage and eight real animation frames',()=>{
 const r=empty(),seen=new Set();for(let i=0;i<12;i++){const z=r.zombie('walker',r.lane,50);seen.add(z.appearance);assert.equal(z.maxHp,35.625);}
 assert.deepEqual([...seen].sort(),['walker','walker2','woman']);
 for(const appearance of ['walker2','woman','crawler']){const frames=new Set();for(let i=0;i<8;i++){const asset=zombieAsset({appearance},i);assert(existsSync(new URL(ASSETS[asset],import.meta.url)));frames.add(readFileSync(new URL(ASSETS[asset],import.meta.url)).toString('base64'));}assert.equal(frames.size,8);}
 assert.equal(new Set(Array.from({length:16},(_,i)=>zombieFrame('crawler',i/4))).size,8);
});
test('brute loses hands then arms once at health thresholds, including multi-part hits, and dies once',()=>{
 const r=empty(),z=r.zombie('brute',r.lane,50);z.hp=z.maxHp=100;r.events=[];
 r.hit(z,21);assert.equal(z.limbsLost,1);r.hit(z,3);assert.equal(z.limbsLost,1);r.hit(z,38);assert.equal(z.limbsLost,3);assert.deepEqual(r.events.filter(e=>e.type==='limb').map(e=>e.part),[0,1,2]);
 r.hit(z,100);r.hit(z,100);assert.equal(z.limbsLost,4);assert.equal(r.kills,1);assert.equal(r.events.filter(e=>e.type==='limb').length,4);
 const fire=r.zombie('brute',1.5,50);r.hit(fire,10,'fire');assert.equal(fire.limbsLost,0);
});
test('container blockages vary by seed, reserve a long lane and never overlap bus routes',()=>{
 const placements=new Set();for(let seed=0;seed<50;seed++){const r=new Run(seed);assert.deepEqual(r.blockades,blockades(seed));for(const p of r.blockades){placements.add(p.lane);assert.equal(p.ramp,0);assert.equal(p.exitRamp,0);assert(p.end-p.at>=80);assert(p.end-p.at<=115);assert(!r.platforms.some(v=>v.end>p.at&&v.at<p.end));assert(r.clearExit(p.lane,p.at+5));}
 r.distance=380;r.generate();for(const e of r.entities)assert(!r.blockades.some(p=>e.lane===p.lane&&e.at>=p.at&&e.at<p.end));}assert.equal(placements.size,4);
});
test('normal jump cannot reach container roof; Air Attunement lands on it and can drop off',()=>{
 for(const high of [false,true]){const r=empty();if(high)CARDS.find(c=>c.id==='air').apply(r);r.blockades=[{id:'test',kind:'blockade',lane:r.lane,at:10,end:100,height:2.8,ramp:0,exitRamp:0}];r.action('jump');step(r,1);
 if(high){assert.equal(r.hp,100);assert.equal(r.elevation,2.8);assert(r.grounded);r.action('right');step(r,.8);assert.equal(r.elevation,0);}else{assert(r.hp<100);assert.notEqual(r.lane,-.5);assert(r.elevation<2.8);}}
});
test('container blocks low shots, preserves roof occupants under shield, and breaks ahead of shield',()=>{
 const r=empty(),p={id:'test',kind:'blockade',lane:r.lane,at:5,end:90,height:2.8,ramp:0,exitRamp:0};r.blockades=[p];r.zombie('walker',r.lane,100);assert(!r.shoot());r.elevation=3;assert(r.shoot());
 r.distance=15;r.elevation=r.supportHeight=2.8;r.grounded=true;r.activatePowerup('skateboard');r.update(.02);assert.equal(r.blockades.length,1);
 const a=empty();a.blockades=[p];a.activatePowerup('skateboard');a.update(.02);assert.equal(a.blockades.length,0);assert(a.events.some(e=>e.type==='crush'&&e.kind==='blockade'));
});
test('horde begins behind the farthest surviving zombie even beyond the generated window',()=>{
 const r=empty(),a=r.zombie('runner',-.5,70),b=r.zombie('brute',1.5,215);startEvent(r,'horde');r.generate();assert(r.entities.includes(a)&&r.entities.includes(b));assert(!r.entities.some(e=>e.horde));r.distance=30;r.generate();assert(r.entities.filter(e=>e.horde).every(e=>e.at>=233));assert(r.entities.some(e=>e.horde));
});
test('no marked Kill Lane exists in the UI or renderer; one lane retains a spawn-density bias',()=>{
 const html=readFileSync(new URL('index.html',import.meta.url),'utf8');assert(!html.includes('kill-lane'));const renderer=readFileSync(new URL('renderer.mjs',import.meta.url),'utf8');assert(!renderer.includes('pressureLaneAt'));
 const r=new Run(88);assert(LANES.includes(r.pressureLaneAt()));assert.notEqual(r.pressureLaneAt(0),r.pressureLaneAt(210));
});
