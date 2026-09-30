import test from "node:test";
import assert from "node:assert/strict";
import { Arena, trailHead, rearOffset, SpatialHash } from "../simulation.mjs";
const step=(a,count,input={})=>{for(let i=0;i<count;i++)a.step(1/60,input);};
function arena(mode="360", speedPercent=100) {
  const a=new Arena({seed:22,bots:0,food:0,mode,speedPercent});
  a.food=[]; a.rebuildFoodHash(); Object.assign(a.player,{x:0,z:250,angle:0,grace:0,length:200});
  a.player.trail=a.initialTrail(a.player); return a;
}
for(const speed of [50,100,300])test(`${speed}%: wheelie brakes progressively to zero in two seconds`,()=>{
  const a=arena("360",speed),p=a.player; step(a,1);
  const initial=p.speed; step(a,60,{wheelie:true});
  assert(Math.abs(p.speed-initial/2)<1e-8); assert(p.alive); assert(p.wheelie>0.95);
  step(a,60,{wheelie:true}); assert(p.speed<1e-8); assert(p.alive);
  const x=p.x; step(a,90,{wheelie:true}); assert(Math.abs(p.x-x)<1e-8);
  step(a,1); assert(p.speed>0&&p.speed<initial/10); step(a,60); assert.equal(p.speed,initial);
});
for(const mode of ["90","360"])test(`${mode}: stopped wheelie pivots around a fixed rear contact without adding trail`,()=>{
  const a=arena(mode),p=a.player; step(a,120,{wheelie:true});
  const pivot=trailHead(p),tail=p.trail.length;
  step(a,90,{wheelie:true,steer:1});
  const after=trailHead(p);
  assert(Math.hypot(after.x-pivot.x,after.z-pivot.z)<1e-7);
  assert(Math.abs(p.angle-3.3)<1e-7); assert.equal(p.trail.length,tail); assert(p.alive);
  assert(Math.abs(Math.hypot(p.x-pivot.x,p.z-pivot.z)-rearOffset(p))<1e-7);
  step(a,45,{wheelie:true,steer:-1}); assert(Math.abs(p.angle-1.65)<1e-7);
});
test("wheelie suppresses boost costs and prevents a jump while pivoting",()=>{
  const a=arena(),p=a.player; const length=p.length;
  step(a,120,{wheelie:true,boost:true}); assert.equal(p.boost,false); assert.equal(p.length,length);
  assert.equal(a.jump(p),false); assert.equal(p.cooldown,0);
});
test("90-degree driving returns to a cardinal heading after a free pivot",()=>{
  const a=arena("90"),p=a.player; step(a,120,{wheelie:true}); step(a,31,{wheelie:true,steer:1}); step(a,1);
  assert(Math.abs(p.angle-Math.PI/2)<1e-8);
});
test("ordinary 90-degree turns keep square trail corners",()=>{
  const a=arena("90"); step(a,11); step(a,15,{angle:Math.PI/2});
  for(let i=1;i<a.player.trail.length;i++) {
    const p=a.player.trail[i-1],q=a.player.trail[i];
    assert(Math.abs(p.x-q.x)<1e-8||Math.abs(p.z-q.z)<1e-8);
  }
});
test("incremental food indexing moves pickups and maintains swapped bucket slots",()=>{
  const hash=new SpatialHash(24),a={x:1,z:1},b={x:2,z:2},c={x:3,z:3};
  for(const item of [a,b,c])hash.insert(item,item.x,item.z);
  hash.move(b,200,200); hash.remove(c);
  assert.deepEqual(hash.query(1,1,1),[a]); assert.deepEqual(hash.query(200,200,1),[b]);
  hash.clear(); assert.deepEqual(hash.query(200,200,1),[]);
  hash.insert(a,1,1); assert.deepEqual(hash.query(1,1,1),[a]);
});
test("normal pickups update in place without rebuilding the whole food index",()=>{
  const a=arena(),p=a.player; a.addFood(p.x+2,p.z,2,1);
  let rebuilds=0; const old=a.rebuildFoodHash.bind(a); a.rebuildFoodHash=()=>{rebuilds++;old();};
  const length=p.length; step(a,1);
  assert(p.length>length); assert.equal(rebuilds,0);
});
