import assert from 'node:assert/strict';
import { LocalSimulation } from '../client/src/net/LocalSimulation';
import { SceneryWorld } from '../client/src/game/SceneryWorld';
import { treeRetention, propRandom } from '../client/src/game/SceneryDensity';
class EmptyWorld extends SceneryWorld { override query(){return [];} }
const road=new EmptyWorld([[{x:-6000,y:0},{x:6000,y:0}]],[],()=>true);
const spawns=road.roadsideSpawns({x:0,y:0},2600);
assert(spawns.length>0 && spawns.length<=4);
assert.deepEqual(spawns,road.roadsideSpawns({x:0,y:0},2600));
assert(spawns.every(p=>Math.abs(p.y)<=12));
assert.equal(treeRetention(2),1); assert.equal(treeRetention(9),.7);
const retained=Array.from({length:10000},(_,i)=>propRandom('prop:'+i+':27',91)).filter(v=>v<treeRetention(9)).length/10000;
assert(Math.abs(retained-.7)<.03);
const sim=new LocalSimulation('World test',()=>{},()=>{},true), s=sim as any;
const lot=s.lots.find((l:any)=>l.status==='empty');sim.deploy(lot.id);
const base=s.bases[0];base.coreX=0;base.coreY=0;base.heading=0;base.lastMovedAt=0;
sim.setScenery(road,p=>p,p=>p,1);s.managed=false;s.updateAmbientPopulation(10000);s.managed=true;
assert(s.zombies.length>0);assert(s.zombies.every((z:any)=>z.contractId==='ambient'));
const z=s.zombies[0];z.x=200;z.y=0;z.home={x:200,y:0};s.moveAmbient(z,1,10000);assert(z.chasing && z.x<200,'nearby zombie pursues');
base.coreX=1500;s.moveAmbient(z,1,11000);assert(!z.chasing,'distant convoy breaks pursuit');assert.equal(z.x,200,'zombie returns home');
base.coreX=0;const victim={...z,id:'ambient:test',x:28,y:0,hp:9999,home:{x:28,y:0}};s.zombies=[victim];
sim.driveBase(0,1,50,true);assert.equal(s.zombies.length,0,'run-over kills regardless of health');assert.equal(s.worldDeaths.length,1,'exactly one guaranteed splat event');assert(s.ambientDefeated.has(victim.id));
const reverse={...victim,id:'ambient:reverse',x:base.coreX-28,hp:999};s.zombies=[reverse];base.driveSpeed=-100;sim.driveBase(0,-1,50,true);assert.equal(s.zombies.length,0,'reversing also kills');
const parked={...victim,id:'ambient:parked',x:base.coreX,hp:999};s.zombies=[parked];base.driveSpeed=0;sim.driveBase(0,0,50,true);assert.equal(s.zombies.length,1,'parked convoy does not kill on contact');

console.log('World validation passed: deterministic road populations, 30% thinning, chase/disengage/return, high-HP run-over, reverse, guaranteed splats, parked contact.');


import { ambientType } from '../client/src/game/AmbientPopulation';
const lesserTypes=new Set(Array.from({length:100},(_,i)=>ambientType('ambient:0:0:'+i)));
assert.deepEqual([...lesserTypes].sort(),['crawler','runner','shambler','walker']);
for(const a of spawns) for(const b of spawns) if(a!==b) assert(Math.hypot(a.x-b.x,a.y-b.y)>=900,'ambient spawn sites stay far apart');
let collisionQueries=0;road.query=()=>{collisionQueries++;return [];};
road.roadsideSpawns({x:0,y:0},2600);assert.equal(collisionQueries,0,'population scan must not generate collision scenery');
s.zombies=[];s.managed=false;
for(let i=0;i<20;i++){base.coreX=i*90;s.updateAmbientPopulation(100000+i*3000);assert(s.zombies.length<=4,'streaming never accumulates more than four zombies');}
s.managed=true;
console.log('Sparse population checks passed: only four lesser types, wide spacing, hard cap during travel, no collision chunk generation during scans.');
