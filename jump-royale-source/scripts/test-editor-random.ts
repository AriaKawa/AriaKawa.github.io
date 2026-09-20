import assert from 'node:assert/strict';
import {generateCourse,verifyCourse} from '../client/src/editor/randomCourse';
import {MAPS} from '../server/src/sim/maps';
import {parseDraft} from '../client/src/editor/maps';
let total=0;
for(const theme of MAPS)for(const difficulty of ['gentle','steady','bold'] as const)for(const seed of ['maker-one','maker-two']){
 const options={theme:theme.id,difficulty,jumps:12,width:128,seed};
 const result=await generateCourse(options);assert(verifyCourse(result.draft,result.actions));assert.equal(result.draft.platforms.length,13);
 assert.equal(result.actions.length,12);assert(result.draft.platforms.every(p=>p.type==='stone'&&!p.slippery&&!p.crumbleSeconds));
 for(let i=2;i<result.draft.platforms.length;i++)assert(result.draft.platforms[i-2].y-result.draft.platforms[i].y>220);
 total+=12;
}
for(const theme of MAPS)for(const difficulty of ['gentle','steady','bold'] as const)for(const width of [80,160]){
 const result=await generateCourse({theme:theme.id,difficulty,jumps:40,width,seed:'limits'});assert(verifyCourse(result.draft,result.actions));total+=40;
}
const options={theme:'forest' as const,difficulty:'gentle' as const,jumps:8,width:128,seed:'repeatable'};
const a=await generateCourse(options),b=await generateCourse(options);assert.deepEqual(a.draft.platforms,b.draft.platforms);assert.deepEqual(a.actions,b.actions);
assert.deepEqual(parseDraft(JSON.stringify({...a.draft,platforms:[]})).platforms,[],'Area erase can clear the entire course');
assert.throws(()=>parseDraft(JSON.stringify({...a.draft,platforms:[{...a.draft.platforms[0],artVariant:99}]})));
const controller=new AbortController();controller.abort();await assert.rejects(()=>generateCourse(options,undefined,controller.signal),/cancelled/);
await assert.rejects(()=>generateCourse({...options,jumps:100}),/4–40/);
console.log('PASS '+total+' verified jumps across all six themes, three difficulties, seed replay, width extremes, 40-jump routes, empty maps and cancellation.');
