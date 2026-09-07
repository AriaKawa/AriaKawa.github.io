import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
import { planetOneAuthoredRoads, planetOneWorldRoads } from '../client/src/game/roadEditor/PlanetOneRoadNetwork.ts';
import { sampleCatmullRom, validateRoads } from '../client/src/game/roadEditor/RoadEditorData.ts';
import { compileRoadNetwork } from '../client/src/game/roadEditor/RoadNetworkGeometry.ts';
import { theaterLatLon } from '../client/src/game/AmericasTheater.ts';
import { usStateAt } from '../client/src/map/UsStateBoundaries.ts';
import { LOWER_48_TACTICAL_RING } from '../client/src/map/AmericasCountryGeometry.ts';
const roads=planetOneAuthoredRoads();
assert.deepEqual(validateRoads(roads),[]);
const outside:string[]=[];
const land=(lat:number,lon:number)=>{let hit=false;const ring=LOWER_48_TACTICAL_RING;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a[1]>lat)!==(b[1]>lat)&&lon<(b[0]-a[0])*(lat-a[1])/(b[1]-a[1])+a[0])hit=!hit;}return hit;};
for(const r of roads)for(const q of sampleCatmullRom(r.points,100)){const ll=theaterLatLon(q);if(!land(ll.lat,ll.lon))outside.push(`${r.id} ${ll.lat.toFixed(3)},${ll.lon.toFixed(3)}`);}
assert.equal(outside.length,0,outside.slice(0,12).join('; '));
const dirt=roads.filter(r=>r.roadClass==='dirt_road');assert.equal(dirt.length,48);
for(const r of dirt)for(const q of sampleCatmullRom(r.points,30)){const ll=theaterLatLon(q);assert.equal(usStateAt(ll.lat,ll.lon)?.code,r.tags![1],r.id);}
const start=performance.now(),network=compileRoadNetwork(roads),compileMs=performance.now()-start;
const adjacency=new Map(network.nodes.map(n=>[n.id,new Set<string>()]));for(const e of network.edges){adjacency.get(e.start)!.add(e.end);adjacency.get(e.end)!.add(e.start);}
const visited=new Set<string>(),pending=[network.nodes[0].id];while(pending.length){const id=pending.pop()!;if(visited.has(id))continue;visited.add(id);pending.push(...adjacency.get(id)!);}
assert.equal(visited.size,network.nodes.length,'Disconnected roads');
const excessive=network.nodes.filter(n=>n.edges.length>4);assert.equal(excessive.length,0,JSON.stringify(excessive.map(n=>({...theaterLatLon(n),arms:n.edges.length}))));
for(const r of roads.filter(r=>r.tags?.includes('authored-expansion')||r.tags?.includes('state-dirt')||['i15','i35','i80','i5'].some(id=>r.id===`curated-usa-${id}`))){for(const p of [r.points[0],r.points.at(-1)!]){const n=network.nodes.find(n=>Math.hypot(n.x-p.x,n.y-p.y)<.01);assert(n&&n.edges.length>=2,`${r.id} has dangling endpoint`);}}
const world=planetOneWorldRoads();assert.equal(world.filter(r=>r.surface==='dirt').length,48);
const report={roads:roads.length,dirtStates:48,connected:true,onLand:true,maxJunctionArms:Math.max(...network.nodes.map(n=>n.edges.length)),compileMs:Math.round(compileMs),edges:network.edges.length};
writeFileSync('docs/network-expansion/validation.json',JSON.stringify(report,null,2));console.log(report);
