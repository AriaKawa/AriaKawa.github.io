import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from '../../grid-io/vendor/three.module.min.js';
import {MeshCollisionWorld,bikeSpheres} from '../collisions.mjs';
import {Arena,riderHeight} from '../simulation.mjs';
import {LOOP,loopPoint,advanceLoop} from '../terrain.mjs';

test('mesh collision follows the visible shape, including elevation and open space',()=>{
 const scene=new THREE.Group(),box=new THREE.Mesh(new THREE.BoxGeometry(2,3,2));box.name='block';box.position.set(0,1.5,0);scene.add(box);
 const world=new MeshCollisionWorld(scene),r={};
 assert.equal(world.hit(r,[{x:1.5,y:1,z:0,radius:.6}]),'block');
 assert.equal(world.hit(r,[{x:2,y:1,z:0,radius:.6}]),null);
 assert.equal(world.hit(r,[{x:0,y:5,z:0,radius:.6}]),null);
 assert.equal(world.hit(r,[{x:0,y:-2,z:0,radius:.6}]),null);
});
test('a fast step cannot tunnel through a thin visible pole',()=>{
 const scene=new THREE.Group(),pole=new THREE.Mesh(new THREE.BoxGeometry(.2,8,.2));pole.name='pole';pole.position.y=4;scene.add(pole);
 const world=new MeshCollisionWorld(scene),before=[{x:-4,y:2,z:0,radius:.7}],after=[{x:4,y:2,z:0,radius:.7}];
 assert.equal(world.hit({},after),null);assert.equal(world.sweep({},before,after),'pole');
});
test('mesh instance transforms are the source of collision locations',()=>{
 const scene=new THREE.Group(),blocks=new THREE.InstancedMesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshBasicMaterial(),2);
 blocks.name='instanced blocks';blocks.setMatrixAt(0,new THREE.Matrix4().makeTranslation(10,1,0));blocks.setMatrixAt(1,new THREE.Matrix4().makeTranslation(-10,21,0));scene.add(blocks);
 const world=new MeshCollisionWorld(scene);
 assert(world.hit({},[{x:10,y:1,z:1.2,radius:.5}]));
 assert.equal(world.hit({},[{x:-10,y:1,z:0,radius:.5}]),null);
 assert(world.hit({},[{x:-10,y:21,z:1.2,radius:.5}]));
});
test('visible trail contact distinguishes a jump from a grounded crossing',()=>{
 const a=new Arena({bots:0,food:0}),r=a.player,b=a.makeRider('Wall',1,false,{x:100,z:100});b.grace=r.grace=0;
 Object.assign(r,{x:0,z:0,angle:0});r.trail=[];b.trail=[{x:0,y:0,z:-3},{x:0,y:0,z:3}];a.rebuildTrails();
 assert.equal(a.contactAt(r,bikeSpheres(r,0)),b);
 assert.equal(a.contactAt(r,bikeSpheres(r,10)),null);
});
test('free loop steering can reverse course instead of snapping back to the route heading',()=>{
 const s=LOOP.approach+LOOP.circle*.25,p=loopPoint(s),r={...p,loopS:s,loopLane:0,angle:Math.PI/2,speed:29,jump:0};
 advanceLoop(r,1/60);assert(r.loopS<s);assert.equal(r.angle,Math.PI/2);
 r.angle=0;const old=r.loopS,lane=r.loopLane;advanceLoop(r,1/60);assert(Math.abs(r.loopS-old)<1e-8);assert(r.loopLane>lane);
});
test('jump detaches from an inverted loop and returns to ground',()=>{
 const a=new Arena({bots:0,food:0}),s=LOOP.approach+LOOP.circle/2;
 Object.assign(a.player,{...loopPoint(s),loopS:s,loopLane:0,grace:100});a.player.trail=[];
 assert(a.jump(a.player));assert.equal(a.player.loopS,null);assert(a.player.airborne);
 for(let i=0;i<120;i++)a.step(1/60);
 assert.equal(a.player.airborne,null);assert.equal(riderHeight(a.player),0);
});
