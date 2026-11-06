import assert from 'node:assert/strict';
import { SceneryWorld, sceneryBodies, type SceneryProp } from '../client/src/game/SceneryWorld';
import { LocalSimulation } from '../client/src/net/LocalSimulation';
import type { Snapshot, BaseState, Vec2 } from '../client/src/game/types';
class FixtureWorld extends SceneryWorld {
 props: SceneryProp[]=[];
 constructor(){super([],[],()=>true);}
 override query(){return this.props;}
}
const world=new FixtureWorld();
const tree={id:'tree',x:0,y:0,frame:1,size:120};world.props=[tree];
const trunk=sceneryBodies(tree)[0];
assert(world.blocked(trunk,1),'tree trunk must block');
assert(!world.blocked({x:0,y:-30},5),'canopy must remain passable');
let stop=world.move({x:-400,y:trunk.y},{x:400,y:trunk.y},20);
assert(stop.x<0 && !world.blocked(stop,20),'swept driving must stop before trunk');
const path=world.route([{x:-200,y:trunk.y},{x:200,y:trunk.y}],18);
assert(path.length>2,'zombies must detour');
for(let i=1;i<path.length;i++) assert(world.clear(path[i-1],path[i],18),'all detour edges clear');
world.props=[{id:'car',x:0,y:0,frame:8,size:170}];
assert(world.blocked({x:0,y:0},10),'wreck body blocks');
stop=world.move({x:-500,y:0},{x:500,y:0},45);
assert(stop.x<0 && !world.blocked(stop,45),'cannot tunnel through car');
const generated=new SceneryWorld([[{x:0,y:0},{x:5000,y:0}]],[{id:'poi',kind:'fuel',x:1250,y:600}],()=>true);
const wide=generated.query(-1000,-1000,5000,4000);
for(const p of wide){const narrow=generated.query(p.x-1,p.y-1,p.x+1,p.y+1).find(q=>q.id===p.id);assert.deepEqual(narrow,p,'camera-independent scenery');}
// Route through actual generated terrain, including multiple obstacles.
const start=performance.now();const actual=generated.route([{x:0,y:600},{x:4500,y:600}],18);
for(let i=1;i<actual.length;i++)assert(generated.clear(actual[i-1],actual[i],18));
console.log(`Generated route: ${actual.length} points in ${Math.round(performance.now()-start)}ms`);
const scheduled: (()=>void)[]=[];
(globalThis as any).window={setInterval:()=>0,setTimeout:(f:()=>void)=>scheduled.push(f)};
(globalThis as any).sessionStorage={getItem:()=>null,setItem:()=>{}};
let snapshot!: Snapshot,notice='';
const sim=new LocalSimulation('Obstacle tester',s=>snapshot=structuredClone(s),n=>notice=n.text);
scheduled.splice(0).forEach(f=>f());
const lot=snapshot.lots.find(l=>l.status==='empty')!;sim.deploy(lot.id);
const internal=sim as any,base=internal.bases[0] as BaseState;
world.props=[{...tree,x:base.coreX+220,y:base.coreY-43.2}];
sim.setScenery(world,p=>p,p=>p,1);base.heading=0;
for(let i=0;i<200;i++)sim.driveBase(0,1,50,true);
assert(base.coreX<world.props[0].x,'simulation driving stops at tree');
assert(!world.blocked({x:base.coreX,y:base.coreY},11));
base.lastMovedAt=0;sim.deployConvoy(true);
assert.match(notice,/solid object/,'core placement rejects obstacle');
world.props=[];sim.deployConvoy(true);
assert.notEqual(base.status,'packed');
const pad=internal.lots.find((l:any)=>l.id===base.lotId).pads[0];
world.props=[{id:'car',x:pad.x,y:pad.y,frame:8,size:170}];
const scrap=internal.player.scrap;sim.build(pad.id,'rifle');
assert.match(notice,/solid object/);assert.equal(internal.player.scrap,scrap);assert(!pad.occupiedBy);
console.log('Scenery valid: stable generation, trunk-only trees, solid cars, swept vehicle collision, zombie detours, core and tower rejection.');
// Exercise both road-following and direct approaches in the live simulation.
world.props=[];
const contract=internal.contracts[0], route=contract.routes[0];
const midpoint={x:(route.points[0].x+route.points[1].x)/2,y:(route.points[0].y+route.points[1].y)/2};
world.props=[{id:'route-car',...midpoint,frame:8,size:170}];
for(const roadFollowing of [true,false]) {
 internal.sceneryRoutes.clear();
 internal.spawn(contract,{routeId:route.id,spawnpointId:route.spawnpointId,zombieType:'brute',roadFollowing});
 const zombie=internal.zombies[internal.zombies.length-1];
 for(let i=1;i<zombie.routePoints.length;i++)assert(world.clear(zombie.routePoints[i-1],zombie.routePoints[i],18));
 for(let i=0;i<2000 && internal.zombies.includes(zombie);i++) {
  internal.moveZombie(zombie,.2,Date.now());
  assert(!world.blocked(zombie,18),'live zombie must never overlap solid scenery');
 }
 assert(!internal.zombies.includes(zombie),'zombie must reach the core, not get stuck at the obstacle');
}
console.log('Both live zombie approach modes reach the core without obstacle overlap.');

// Deployment saves the same clear curve that is painted and followed.
world.props=[{id:'bend-tree',x:500,y:-43.2,frame:1,size:120}];
const curved=world.deploymentRoute([{x:0,y:0},{x:1000,y:0}],22);
assert(curved.some(p=>Math.abs(p.y)>1));
assert.deepEqual(curved.at(-1),{x:1000,y:0});
for(let i=1;i<curved.length;i++)assert(world.clear(curved[i-1],curved[i],22));
assert.deepEqual(curved,world.deploymentRoute([{x:0,y:0},{x:1000,y:0}],22),'deterministic curves');
const roadWorld=new SceneryWorld([[{x:-1500,y:0},{x:1500,y:0}]],[],()=>true);
const connected=roadWorld.deploymentRoute([{x:1000,y:300},{x:0,y:300}],22);
assert(Math.abs(connected[0].y-24)<.001,'road starts on the highway edge, not its center');
assert(connected.every(p=>p.y>=24-.001),'no saved dirt centerline inside the highway');
assert.deepEqual(connected.at(-1),{x:0,y:300});
const farWorld=new SceneryWorld([[{x:-1500,y:-2000},{x:1500,y:-2000}]],[],()=>true);
const unconnected=farWorld.deploymentRoute([{x:1000,y:300},{x:0,y:300}],22);
assert(unconnected[0].y>-100,'must not stretch to a distant highway');
for(const p of [connected,unconnected]) assert(p.slice(1).reduce((n,b,i)=>n+Math.hypot(b.x-p[i].x,b.y-p[i].y),0)<=1650);
// Driving can pass within the former circular hitbox, but still stops at a trunk.
world.props=[{...tree,x:base.coreX+100,y:base.coreY+22-43.2}];
base.status='packed';base.heading=0;base.driveSpeed=0;
const before=base.coreX;
for(let i=0;i<40;i++)sim.driveBase(0,1,50,true);
assert(base.coreX>before+150,'truck must pass beside a trunk without canopy collision');
console.log('Deployment curves, bounded road connections, deterministic clearance and close trunk passes valid.');

const flooded=new SceneryWorld([],[],p=>p.x<100 || p.x>200);
assert.throws(()=>flooded.deploymentRoute([{x:0,y:0},{x:300,y:0}],22),/route|detour/i,'no road through impassable water');

const narrowRoad=new SceneryWorld([[{x:-1500,y:0},{x:1500,y:0}]],[],()=>true,[24]);
const southEntry=narrowRoad.deploymentRoute([{x:1000,y:-300},{x:0,y:-300}],22);
assert(Math.abs(southEntry[0].y+12)<.001,'opposite-side entry uses the actual narrow-road width');
assert(southEntry.every(p=>p.y<=-12+.001),'branch must stay outside asphalt after the mouth');
