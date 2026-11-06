import { planetOneAuthoredRoads, planetOneWorldRoads } from './src/game/roadEditor/PlanetOneRoadNetwork';
import { PlanetOneReferenceMap } from './src/game/roadEditor/PlanetOneReferenceMap';
import { theaterPoint } from './src/game/AmericasTheater';
const canvas=document.querySelector('canvas')!,ctx=canvas.getContext('2d')!,out=document.querySelector('#result')!;
const map=new PlanetOneReferenceMap(planetOneWorldRoads()); await map.load();
const worker=new Worker(new URL('./src/game/PlanetOneRoadWorker.ts',import.meta.url),{type:'module'});
const roads=planetOneAuthoredRoads(),dirt=roads.find(r=>r.id==='curated-usa-dirt-ks')!;
let id=0;
async function draw(left:number,top:number,zoom:number){
 await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
 let frames=0,maxGap=0,last=performance.now(),active=true;const gaps:number[]=[];
 const frame=(t:number)=>{if(!active)return;gaps.push(t-last);maxGap=Math.max(maxGap,t-last);last=t;frames++;requestAnimationFrame(frame);};requestAnimationFrame(frame);
 const result:any=await new Promise((resolve,reject)=>{worker.onmessage=e=>resolve(e.data);worker.onerror=reject;worker.postMessage({id:++id,left,top,width:1400,height:760,zoom});});active=false;
 ctx.clearRect(0,0,1400,760);map.draw(ctx,p=>({x:(p.x-left)*zoom,y:(p.y-top)*zoom}),zoom);
 if(result.bitmap){ctx.drawImage(result.bitmap,0,0);result.bitmap.close();}
 const sorted=gaps.sort((a,b)=>a-b);return {zoom,renderMs:Math.round(result.renderMs),frames,maxFrameGapMs:Math.round(maxGap),p95FrameGapMs:Math.round(sorted[Math.floor(sorted.length*.95)]??0),error:result.error??null};
}
async function region(north:number,west:number,south:number,east:number){const a=theaterPoint(north,west),b=theaterPoint(south,east);const z=Math.min(1380/(b.x-a.x),720/(b.y-a.y));out.textContent=JSON.stringify(await draw(a.x-10/z,a.y-10/z,z));}
const actions=[()=>region(50,-125,24,-66),()=>region(49.5,-115,41,-88),()=>region(43,-124,32,-113),()=>region(48,-76,40,-66),async()=>{out.textContent=JSON.stringify(await draw(dirt.points[0].x-650/.9,dirt.points[0].y-350/.9,.9));},async()=>{const result=[];for(const z of [.012,.02,.06,.3,.31,.34,1.2]){out.textContent='Testing '+z;result.push(await draw(dirt.points[0].x-700/z,dirt.points[0].y-380/z,z));}out.textContent=JSON.stringify(result);document.title=result.every(r=>!r.error)?'PASS — road performance':'FAIL — road performance';}];
document.querySelectorAll('button').forEach((b,i)=>b.onclick=()=>void actions[i]());await actions[0]();
