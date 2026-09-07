// Build-time authoring aid. Output is checked-in static geometry, never generated in gameplay.
import { writeFileSync } from 'node:fs';
import { planetOneAuthoredRoads } from '../client/src/game/roadEditor/PlanetOneRoadNetwork.ts';
import { sampleCatmullRom, type AuthoredRoad } from '../client/src/game/roadEditor/RoadEditorData.ts';
import { theaterLatLon, theaterPoint } from '../client/src/game/AmericasTheater.ts';
import { usStateAt, usStateBoundaryData } from '../client/src/map/UsStateBoundaries.ts';
import { LOWER_48_TACTICAL_RING } from '../client/src/map/AmericasCountryGeometry.ts';
const land = (q: {x:number,y:number}) => { const {lat,lon}=theaterLatLon(q);let hit=false;const ring=LOWER_48_TACTICAL_RING;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a[1]>lat)!==(b[1]>lat)&&lon<(b[0]-a[0])*(lat-a[1])/(b[1]-a[1])+a[0])hit=!hit;}return hit; };
const parents=planetOneAuthoredRoads(false).map(r=>({...r,points:sampleCatmullRom(r.points,20)}));
const result:AuthoredRoad[]=[];
for(const state of usStateBoundaryData.states.filter(s=>!['AK','HI','DC'].includes(s.code))){
 const center=theaterPoint(state.centroid.lat,state.centroid.lon);
 const candidates=parents.flatMap(r=>r.points.slice(3,-8).map((p,j)=>({r,i:j+3,p}))).filter(c=>{const q=theaterLatLon(c.p);return usStateAt(q.lat,q.lon)?.code===state.code;}).sort((a,b)=>Math.hypot(a.p.x-center.x,a.p.y-center.y)-Math.hypot(b.p.x-center.x,b.p.y-center.y));
 let chosen:AuthoredRoad|undefined;
 // Prefer a short through connection between different corridors where the
 // state's existing network supports one, rather than repetitive bypass loops.
 through: for(const a of candidates){
  const ends=candidates.filter(b=>b.r.id!==a.r.id && Math.hypot(b.p.x-a.p.x,b.p.y-a.p.y)>700 && Math.hypot(b.p.x-a.p.x,b.p.y-a.p.y)<3500).sort((b,c)=>Math.hypot(b.p.x-a.p.x,b.p.y-a.p.y)-Math.hypot(c.p.x-a.p.x,c.p.y-a.p.y));
  for(const b of ends.slice(0,12))for(const side of [1,-1]){
   const dx=b.p.x-a.p.x,dy=b.p.y-a.p.y;
   const points=[a.p,{x:a.p.x+dx*.3-dy*.08*side,y:a.p.y+dy*.3+dx*.08*side},{x:a.p.x+dx*.7-dy*.1*side,y:a.p.y+dy*.7+dx*.1*side},b.p].map(q=>({x:q.x,y:q.y}));
   const samples=sampleCatmullRom(points,30);
   if(!samples.every(q=>{const ll=theaterLatLon(q);return land(q)&&usStateAt(ll.lat,ll.lon)?.code===state.code;}))continue;
   if(samples.slice(15,-15).some(q=>parents.some(parent=>parent.points.some(v=>Math.hypot(v.x-q.x,v.y-q.y)<100))))continue;
   chosen={id:`curated-usa-dirt-${state.code.toLowerCase()}`,name:`${state.name} rural dirt connection`,roadClass:'dirt_road',width:18,points,source:'manual_editor',locked:false,visible:true,tags:['state-dirt',state.code],notes:`Static through connection from ${a.r.name} to ${b.r.name}.`};break through;
  }
 }
 for(const {r,i} of candidates){
  if(chosen)break;
  search: for(const span of [14,10,6,4,2])for(const side of [1,-1])for(const bend of [.22,.4,.65]){
   const a=r.points[i],b=r.points[i+span];if(!b)continue;const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy);if(len<240||len>6000)continue;
   const offset=Math.min(900,len*bend)*side;
   const points=[a,...[[.16,.8],[.43,1],[.76,.65]].map(([t,k])=>({x:a.x+dx*t-dy/len*offset*k,y:a.y+dy*t+dx/len*offset*k})),b].map(q=>({x:q.x,y:q.y}));
   const samples=sampleCatmullRom(points,30);
   if(!samples.every(q=>{const ll=theaterLatLon(q);return land(q)&&usStateAt(ll.lat,ll.lon)?.code===state.code;}))continue;
   // Keep interior well clear of every paved centerline, including its parent.
   const interior=samples.slice(15,-15);
   if(interior.some(q=>parents.some(parent=>parent.points.some(v=>Math.hypot(v.x-q.x,v.y-q.y)<100))))continue;
   chosen={id:`curated-usa-dirt-${state.code.toLowerCase()}`,name:`${state.name} rural dirt connection`,roadClass:'dirt_road',width:18,points,source:'manual_editor',locked:false,visible:true,tags:['state-dirt',state.code],notes:`Two shared endpoints on ${r.name}; static state-contained geometry.`};break search;
  }
  if(chosen)break;
 }
 if(!chosen)throw new Error(`No valid dirt connection for ${state.code}`);
 result.push(chosen);
}
writeFileSync('client/src/game/roadEditor/usa-dirt-roads.json',JSON.stringify(result,null,2)+'\n');
console.log(`Authored ${result.length} state dirt connections.`);

