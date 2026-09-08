import assert from 'node:assert/strict';
import { roadRasterCovers, roadRasterNeedsRefresh, roadRasterView } from '../client/src/game/PlanetOneRoadRaster.ts';
import { PlanetOneTexturedRoads } from '../client/src/game/PlanetOneTexturedRoads.ts';

const view = {left:1000,top:2000,width:1280,height:720,zoom:.3};
const raster = roadRasterView(view.left,view.top,view.width,view.height,view.zoom);
assert(roadRasterCovers(raster,view));
assert(roadRasterCovers(raster,{...view,left:view.left+100,top:view.top+100}));
assert(!roadRasterCovers(raster,{...view,left:view.left+10000}));
assert(!roadRasterCovers(raster,{...view,zoom:.21}), 'LOD transitions must refresh');
assert(!roadRasterCovers(raster,{...view,width:4000}), 'Resizes must refresh');
assert(!roadRasterNeedsRefresh(raster,view));
const nearEdge={...view,left:view.left+300/view.zoom};
assert(roadRasterCovers(raster,nearEdge),'old texture still covers prefetch threshold');
assert(roadRasterNeedsRefresh(raster,nearEdge),'refresh before exposing the raster boundary');
const huge = { ...view, width:7680,height:4320 };
const bounded = roadRasterView(huge.left,huge.top,huge.width,huge.height,huge.zoom);
assert(bounded.width<=2560 && bounded.height<=2560);
assert(roadRasterCovers(bounded,huge), 'A bounded high-DPI raster must not request a new image every frame');

class FakeWorker {
  static last: FakeWorker;
  requests:any[]=[]; onmessage?: (event:any)=>void; onerror?: ()=>void; terminated=false;
  constructor(){FakeWorker.last=this;}
  postMessage(request:any){this.requests.push(request);}
  terminate(){this.terminated=true;}
}
Object.assign(globalThis,{Worker:FakeWorker,OffscreenCanvas:class {}});
let paints=0, closed=0, destroyed=0, removed=0;
const image:any={};
for(const name of ['setOrigin','setDepth','setVisible','setPosition','setDisplaySize']) image[name]=()=>image;
image.setVisible=(visible:boolean)=>{image.visible=visible;return image;};
image.destroy=()=>destroyed++;
const scene:any={textures:{createCanvas:()=>({setSize(){},context:{clearRect(){},drawImage(){paints++;}},refresh(){}}),remove(){removed++;}},add:{image:()=>image},game:{canvas:{dataset:{}}}};
const camera:any={worldView:{left:2000,top:4000},width:1280,height:720};
const layer=new PlanetOneTexturedRoads(scene), worker=FakeWorker.last;
layer.refresh(camera,.3);
assert.equal(worker.requests.length,1);
const finish=(request:any)=>worker.onmessage!({data:{...request,renderMs:1,bitmap:{close(){closed++;}}}});
finish(worker.requests[0]);assert(layer.ready);assert.equal(paints,1);
for(let i=0;i<120;i++){camera.worldView.left+=1;layer.refresh(camera,.3);}
assert.equal(worker.requests.length,1,'Covered pans should only transform the cached image');
assert.equal(paints,1,'Covered pans must not repaint');
await new Promise(r=>setTimeout(r,130));
camera.worldView.left+=20000;layer.refresh(camera,.3);assert(layer.ready, "Camera movement must not switch back to legacy roads");
assert.equal(worker.requests.length,2);
camera.worldView.left+=20000;
for(let i=0;i<120;i++)layer.refresh(camera,.3);
assert.equal(worker.requests.length,2,'Only one request may be in flight');
assert(layer.ready && image.visible,'Keep textured layer visible throughout delayed camera refresh');
finish(worker.requests[1]);assert.equal(paints,1,'Stale distant results must be discarded');assert.equal(closed,2);
await new Promise(r=>setTimeout(r,130));layer.refresh(camera,.3);assert.equal(worker.requests.length,3);
layer.destroy();finish(worker.requests[2]);assert(worker.terminated);assert.equal(paints,1);assert.equal(closed,3);assert.equal(destroyed,1);assert.equal(removed,1);
const fallback=new PlanetOneTexturedRoads(scene);FakeWorker.last.onerror!();fallback.refresh(camera,.3);assert(!fallback.ready);assert.equal(scene.game.canvas.dataset.planetOneRoadRenderer,'vector-fallback');fallback.destroy();
console.log('PASS: raster bounds, 8K memory cap, pan reuse, LOD/resize invalidation, single in-flight request, stale bitmap disposal, shutdown and worker-error fallback.');

