import test from 'node:test';
import assert from 'node:assert/strict';
import {Arena,riderHeight,trailDistance} from '../simulation.mjs';
import {ROADS,LOOP,roadPoint,roadProfile,loopPoint,updateSurface,terrainBlocked} from '../terrain.mjs';
import {PICKUP_COLORS,pickupKind} from '../population.mjs';
const run=(a,n,input={})=>{for(let i=0;i<n;i++)a.step(1/60,input);};
function place(a,p){Object.assign(a.player,{...p,y:p.y||0,pitch:0,road:null,loopS:null,grace:0,jump:0});a.player.trail=a.initialTrail(a.player);}
for(const road of ROADS)for(const direction of [1,-1])test(`${road.name}: drive the complete route ${direction>0?'forward':'backward'}`,()=>{
  const a=new Arena({bots:0,food:0}),length=road.end-road.start;
  const p=roadPoint(road,direction>0?-8:length+8);place(a,{...p,angle:p.angle+(direction<0?Math.PI:0)});
  let lowest=0,highest=0,attached=false;
  for(let i=0;i<Math.ceil((length+25)/29*60);i++){a.step(1/60);lowest=Math.min(lowest,a.player.y);highest=Math.max(highest,a.player.y);attached ||=a.player.road===road.id;assert(a.player.alive,`crashed at ${a.player.x}, ${a.player.y}, ${a.player.z}`);}
  assert(attached);assert.equal(a.player.road,null);assert.equal(a.player.y,0);
  assert.equal(road.kind==='tunnel'?lowest:highest,road.height);
});
test('a ground rider crosses under both elevated roads without snapping up',()=>{
  const a=new Arena({bots:0,food:0});place(a,{x:0,z:-220,angle:Math.PI/2});run(a,60);
  assert.equal(a.player.y,0);assert.equal(a.player.road,null);
});
test('skyway supports are solid at ground level but do not extend underground',()=>{
  const road=ROADS[0],p=roadPoint(road,road.ramp+60);
  assert(terrainBlocked({y:0},p.x,p.z+13,2.3));assert(!terrainBlocked({y:-24},p.x,p.z+13,2.3));
});
test('highway, ground and underground laser collisions use their actual elevation',()=>{
  const a=new Arena({bots:0,food:0}),p=a.player,b=a.makeRider('Wall',1,false,{x:500,z:500});b.grace=0;
  b.trail=[{x:-2,y:32,z:0},{x:2,y:32,z:0}];a.rebuildTrails();
  assert.equal(a.trailAt(p,0,0,2.3,0),null);assert.equal(a.trailAt(p,0,0,2.3,32),b);
  b.trail=[{x:-2,y:-24,z:0},{x:2,y:-24,z:0}];a.rebuildTrails();
  assert.equal(a.trailAt(p,0,0,2.3,0),null);assert.equal(a.trailAt(p,0,0,2.3,-24),b);
});
for(const direction of [1,-1])test(`the single helix completes a full inversion and exits safely (${direction})`,()=>{
  const a=new Arena({bots:0,food:0}),start=loopPoint(direction>0?0:LOOP.length);
  place(a,{...start,angle:start.angle+(direction<0?Math.PI:0)});a.player.length=1200;
  let top=0,inverted=false,attached=false;
  for(let i=0;i<Math.ceil((LOOP.length+30)/29*60);i++){
    a.step(1/60);top=Math.max(top,a.player.y);inverted ||=Math.cos(a.player.pitch)<-.95;attached ||=Number.isFinite(a.player.loopS);
    assert(a.player.alive,`loop crash at step ${i}, s=${a.player.loopS}`);
  }
  assert(attached&&inverted);assert(top>63);assert.equal(a.player.loopS,null);assert.equal(a.player.y,0);assert(Math.abs(a.player.pitch)<1e-8);
});
test('pickup values have stable neon colors and structured routes regenerate in place',()=>{
  const a=new Arena({bots:0,seed:42});assert.equal(PICKUP_COLORS.length,4);
  for(const f of a.food)assert.equal(f.kind,pickupKind(f.value));
  assert(a.food.filter(f=>f.pattern==='line').length>1500);assert(a.food.filter(f=>f.pattern==='cache').length>1000);assert(a.food.filter(f=>f.pattern==='scatter').length>1500);
  const f=a.food.find(f=>f.pattern==='line');place(a,{x:f.x,z:f.z,angle:0});a.player.grace=100;
  const home={...f.home};run(a,1);assert(f.availableAt>a.time);assert.deepEqual(f.home,home);assert.equal(f.x,home.x);assert.equal(f.z,home.z);
});
test('a pickup on a bridge cannot be collected from underneath',()=>{
  const a=new Arena({bots:0,food:0});place(a,{x:0,z:0,angle:0});const f=a.addFood(2,0,6,0,{y:32});const length=a.player.length;run(a,2);assert.equal(a.player.length,length);assert.equal(f.y,32);
});
test('a fresh arena contains a varied established field with real long trails and a clear spawn',()=>{
  const a=new Arena({seed:42});const bots=a.riders.slice(1);assert(bots.filter(r=>r.length>2000).length>=6);assert(bots.some(r=>r.length<300));
  for(const r of bots){let length=0;for(let i=1;i<r.trail.length;i++)length+=trailDistance(r.trail[i-1],r.trail[i]);assert(length>=r.length*.9);for(const p of r.trail)assert(Math.hypot(p.x-a.player.x,p.z-a.player.z)>85);}
});
