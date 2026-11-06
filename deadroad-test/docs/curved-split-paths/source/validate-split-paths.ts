import assert from 'node:assert/strict';
import {createContinentLots,generateDefenseContractLayout,defenseContractSeed} from '../client/src/game/continentData';
import {SceneryWorld} from '../client/src/game/SceneryWorld';
const lot={...createContinentLots()[0],x:0,y:300,worldX:100,worldY:100};
class OpenField extends SceneryWorld {override query(){return [];}}
const field=new OpenField([[{x:-1500,y:0},{x:1500,y:0}]],[],()=>true);
let curved=0;
for(let s=0;s<100;s++){
 const seed=defenseContractSeed(`lane-test-${s}`);
 const layout=generateDefenseContractLayout(lot,5,'t',seed,(points,lane)=>field.deploymentRoute(points,22,1,s,lane>0));
 assert.equal(layout.routes.length,2);
 assert(layout.buildPads.length>=8 && layout.buildPads.length<=10);
 assert.deepEqual(layout,generateDefenseContractLayout(lot,5,'t',seed,(points,lane)=>field.deploymentRoute(points,22,1,s,lane>0)));
 for(const route of layout.routes){assert.deepEqual(route.points.at(-1),{x:0,y:300});assert(route.routeLength<=1650);const first=route.points[0];if(route.routeLength>Math.hypot(first.x,first.y-300)*1.12)curved++;for(let i=1;i<route.points.length;i++)assert(field.clear(route.points[i-1],route.points[i],22));}
}
assert(curved>=190,`Expected mostly curved lanes, got ${curved}/200`);
console.log(`100 hard layouts: two deterministic lanes, bounded lengths, ${curved}/200 curved routes, shared pad budget and obstacle clearance.`);
