import assert from 'node:assert/strict';
import {sizePlatforms} from '../server/src/sim/platformSizing';
import {levelForMap,MAPS} from '../server/src/sim/maps';
import type {Platform} from '../server/src/sim/types';
for(const map of MAPS){
 const level=levelForMap(map.id);assert.deepEqual(level,levelForMap(map.id),'Stable geometry across clients and restarts');
 assert(level.every(p=>p.w>=18&&p.h>=8));
 for(const p of level)if(p.baseX!==undefined)assert.equal(p.x,p.baseX,'Moving platform origin matches resized landing');
 console.log('PASS',map.id,level.length,'deterministic sized platforms');
}
const original:Platform[]=[{id:'spawn',x:54,y:10000,w:532,h:180,type:'stone'},{id:'crown',x:224,y:0,w:192,h:16,type:'stone'}];
for(let i=0;i<1000;i++)original.push({id:'test-'+i,x:200,y:9990-i*10,w:160,h:16,type:'stone'});
const sized=sizePlatforms(original,'test');
for(let i=0;i<sized.length;i++){
 const p=sized[i],base=original[i];assert(p.w!==base.w||p.h!==base.h,'Every platform varies');assert.equal(p.y,base.y,'Landing elevation preserved');
 if(p.id==='spawn')assert.equal(p.w,base.w);else {assert(Math.abs(p.x+p.w/2-(base.x+base.w/2))<.001);assert(p.w>=base.w*.875&&p.w<=base.w*1.065);}
}
const route=sized.slice(2),mean=(ps:Platform[])=>ps.reduce((sum,p)=>sum+p.w,0)/ps.length;
assert(mean(route.slice(0,200))>mean(route.slice(-200))+5,'Upper landings taper gradually');
assert(new Set(route.map(p=>p.w)).size>12,'Local variation remains throughout the climb');
console.log('PASS local size variety, gentle elevation taper, safety coverage and unchanged landing centers/heights.');
