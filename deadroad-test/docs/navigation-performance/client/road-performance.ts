import { TexturedRoadRenderer } from './src/game/roadEditor/TexturedRoadRenderer';
import { planetOneAuthoredRoads } from './src/game/roadEditor/PlanetOneRoadNetwork';
import { roadRasterView, roadRasterCovers } from './src/game/PlanetOneRoadRaster';
const out = document.querySelector('#result')!;
const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d')!;
const roads = planetOneAuthoredRoads();
const report: any = { baseline: [], worker: [], cacheChecks: [] };
const show = () => out.textContent = JSON.stringify(report, null, 2);
const baseline = new TexturedRoadRenderer();
for (const zoom of [.012,.013,.014]) {
  const started = performance.now(); let error;
  try { baseline.drawNetwork(ctx, roads, p => ({x:(p.x-78000)*zoom, y:(p.y-80000)*zoom}), zoom); } catch(e) { error = String(e); }
  report.baseline.push({zoom, ms: performance.now()-started, error}); show();
}
const w = new Worker(new URL('./src/game/PlanetOneRoadWorker.ts', import.meta.url), { type: 'module' });
let id = 0;
const anchor = roads[0].points[4];
for (const zoom of [.012,.013,.014,.06,.3,.31,.34,1.2,.3]) {
  const left = zoom < .1 ? 78000 : anchor.x-640/zoom, top = zoom < .1 ? 80000 : anchor.y-360/zoom;
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  let frames = 0, maxGap = 0, active = true, previous = performance.now();
  const frame = (t:number) => { if(!active) return; maxGap = Math.max(maxGap,t-previous); previous=t; frames++; requestAnimationFrame(frame); };
  requestAnimationFrame(frame);
  const started = performance.now();
  const result:any = await new Promise((resolve,reject)=>{w.onmessage=e=>resolve(e.data);w.onerror=reject; w.postMessage({id:++id,left,top,width:1280,height:720,zoom});});
  active = false;
  if(result.bitmap) {ctx.clearRect(0,0,1280,720);ctx.drawImage(result.bitmap,0,0);result.bitmap.close();}
  const pixels = ctx.getImageData(0,0,1280,720).data;
  let visiblePixels=0; for(let p=3;p<pixels.length;p+=4) if(pixels[p])visiblePixels++;
  report.worker.push({zoom,workerMs:result.renderMs,elapsedMs:performance.now()-started,frames,maxFrameGapMs:maxGap,visiblePixels,error:result.error});show();
}
const v = {left:100,top:200,width:1280,height:720,zoom:.3};
const r = roadRasterView(v.left,v.top,v.width,v.height,v.zoom);
report.cacheChecks = [roadRasterCovers(r,v), roadRasterCovers(r,{...v,left:v.left+100}), !roadRasterCovers(r,{...v,left:v.left+10000}), !roadRasterCovers(r,{...v,zoom:.1})];
report.pass = report.worker.every((v:any)=>!v.error && v.visiblePixels>0) && report.cacheChecks.every(Boolean);
w.terminate();show();document.title=report.pass?'PASS — Deadroad road performance':'FAIL — Deadroad road performance';

