import assert from 'node:assert/strict';
import {EditorSimulation} from '../client/src/editor/simulation';
import {createDraft,parseDraft,movePlatform} from '../client/src/editor/maps';
import {attachSpawn,spawnLocations} from '../server/src/sim/spawn';
import {supportAt} from '../server/src/sim/platformGeometry';
import {stepPlayer} from '../server/src/sim/physics';
import {generateCourse} from '../client/src/editor/randomCourse';
const idle={left:false,right:false,jumpHeld:false,seq:0};
const draft=createDraft('forge',true);
draft.platforms=[{id:'spawn',x:-2400,y:-800,w:520,h:30,type:'stone',solid:true,rotation:0},{id:'crown',x:-2300,y:-925,w:180,h:30,type:'stone',solid:true,rotation:0}];
draft.spawn=attachSpawn(draft.platforms[0],-2140);
const loaded=parseDraft(JSON.stringify(draft));assert.equal(loaded.platforms[0].y,-800);
const slots=spawnLocations(loaded.platforms,loaded.spawn,24);
assert.equal(new Set(slots.map(s=>s.x)).size,24);
for(const p of slots)assert(supportAt(p.x,p.y,loaded.platforms),'All player slots stand on the platform');
const old=slots[0];movePlatform(loaded.platforms[0],-5400,-1800);
assert.equal(spawnLocations(loaded.platforms,loaded.spawn,24)[0].x,old.x-3000,'Spawn follows moved platform');
const sim=new EditorSimulation(draft);
assert(sim.player.x<0&&sim.player.y<0);sim.flying=true;for(let i=0;i<90;i++)sim.step({...idle,left:true,up:true});
assert(sim.player.x< -2500&&sim.player.y< -1500,'No side or top clamp in flight');
sim.flying=false;sim.player.y=sim.world.height+20;sim.step(idle);assert.equal(sim.deaths,1,'Fixed bottom remains');
for(const rotation of [60,-60,44]){
 const slope={...draft.platforms[0],x:0,y:1000,w:400,rotation};const s=new EditorSimulation({...draft,platforms:[slope]});s.placeOn(slope);
 const {x,y}=s.player;
 for(let i=0;i<24;i++)s.step({...idle,jumpHeld:true});
 assert(Math.abs(s.player.x-x)<.01&&Math.abs(s.player.y-y)<.01,'Crouch grips slope '+rotation);
 assert(s.player.charge01>.99);
 s.step({...idle,right:rotation>0,jumpHeld:false});assert(!s.player.grounded&&s.player.vy<0,'Release launches off slope '+rotation);
}
const generated=await generateCourse({theme:'forge',jumps:4,width:128,difficulty:'gentle',seed:'ai-probe'});
const ai=new EditorSimulation(generated.draft);ai.addBot();let climbed=false;
const start=ai.bots[0].player.y;
for(let i=0;i<1500;i++){ai.step(idle);if(ai.bots[0].player.y<start-90&&ai.bots[0].player.grounded){climbed=true;break;}}
assert(climbed,'AI plans and executes a real jump without teleporting');
ai.addBot({x:-6000,y:-500,platformId:'@air'});assert.equal(ai.bots[1].player.x,-6000,'Dropped AI starts at requested air position');
ai.removeBot();assert.equal(ai.bots.length,1);
const p=ai.bots[0].player;const before=p.x;stepPlayer(p,ai.platforms,1/30,ai.world);assert(Number.isFinite(p.x-before));
console.log('PASS open sides/top, fixed bottom, 24 shared spawn slots, platform attachment, slope crouch/release and autonomous AI jump/drop/remove.');
