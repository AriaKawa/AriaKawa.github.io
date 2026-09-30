import test from 'node:test';
import assert from 'node:assert/strict';
import {Arena} from '../simulation.mjs';

test('kilometre trails do not reinsert every static segment each tick',()=>{
  const a=new Arena({seed:42,food:0});let inserts=0;const insert=a.trailHash.insert.bind(a.trailHash);
  a.trailHash.insert=(...args)=>{inserts++;return insert(...args);};
  for(let i=0;i<30;i++)a.step(1/60);
  assert(inserts<41*30*2);assert(a.riders.some(r=>r.trail.length>1000));
});
test('incremental and explicit full rebuilds give the same driving and collision results',()=>{
  const a=new Arena({seed:17,bots:5,food:0}),b=new Arena({seed:17,bots:5,food:0});
  for(let i=0;i<1200;i++) {
    const control={angle:i*.003,boost:i%160<30,wheelie:i>100&&i<280,steer:.1};
    b.rebuildTrails();a.step(1/60,control);b.step(1/60,control);
    for(let j=0;j<a.riders.length;j++) {
      const x=a.riders[j],y=b.riders[j];assert.equal(x.alive,y.alive);assert(Math.abs(x.x-y.x)<1e-7);assert(Math.abs(x.z-y.z)<1e-7);assert.equal(x.kills,y.kills);
    }
  }
});
test('death and replacement remove old indexed geometry and index the new elevation',()=>{
  const a=new Arena({bots:0,food:0}),r=a.makeRider('Wall',1,false,{x:500,z:500});r.grace=0;
  r.trail=[{x:200,y:32,z:20},{x:204,y:32,z:20}];a.updateTrails();
  assert.equal(a.trailAt(a.player,202,20,2.3,32),r);assert.equal(a.trailAt(a.player,202,20,2.3,0),null);
  a.kill(r);a.updateTrails();assert.equal(a.trailAt(a.player,202,20,2.3,32),null);
  r.alive=true;r.trail=[{x:300,y:-24,z:20},{x:304,y:-24,z:20}];a.updateTrails();
  assert.equal(a.trailAt(a.player,302,20,2.3,-24),r);assert.equal(a.trailAt(a.player,202,20,2.3,32),null);
});
