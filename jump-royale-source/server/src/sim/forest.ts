import type {Platform} from './types.js';

export const FOREST_WIDTH=2560;
export const FOREST_HEIGHT=14400;
export const FOREST_SPAWN=FOREST_HEIGHT-240;
export const FOREST_CHAPTERS=['LANTERN GROVE','THE ROOTWAYS','MOTHWOOD','BROKEN MONASTERY','STARLIT BOUGHS','MOONVEIL CROWN'];
export const forestSection=(y:number)=>Math.max(0,Math.min(5,Math.floor((FOREST_SPAWN+32-y)/2360)));

/** Long switchbacks. Every branch rejoins the main trail; all exposed tops are solid. */
export function generateForest():Platform[]{
 const out:Platform[]=[{id:'spawn',x:54,y:FOREST_SPAWN+32,w:650,h:208,type:'stone',forest:true,solid:true}];
 let x=470,y=FOREST_SPAWN+32,direction=1,index=0;
 while(y>200){
  const section=forestSection(y),rise=[94,108,30,28,36,134,142,112][index%8];
  y-=Math.min(rise,y-180);
  direction=Math.floor(index/8)%2===0?1:-1;
  const previousX=x;
  x+=direction*[152,184,278,272,268,190,172,166][index%8];
  const rest=index%8===7;
  const w=rest?180:Math.max(76,158-section*12-(index%3)*10);
  out.push({id:'forest-'+index,x:x-w/2,y,w,h:rest?28:24+(index%3)*5,type:index%4===2?'wood':'stone',forest:true,solid:true});
  // Occasional inverted shelves make a low passage across the long jumps.
  // Leave both ends open so the next switchback remains accessible.
  if(index%16===3 && y>650){
   out.push({id:'forest-ceiling-'+index,x:(x+previousX)/2-w/2,y:y-185,w,h:34,type:'stone',forest:true,solid:true,ceiling:true});
  }
  // A tiny lower branch splits each horizontal crossing and rejoins its far shelf.
  // It also creates a useful catch ledge below a missed main jump.
  if(index%8===3 && y>400){
   out.push({id:'forest-branch-'+index,x:(x+previousX)/2-12,y:y+58,w:24,h:24,type:'wood',forest:true,solid:true});
  }
  index++;
 }
 out.push({id:'crown',x:x+direction*175-110,y:72,w:220,h:28,type:'anvil',forest:true,solid:true});
 // Optional pit beside the first climb, clear of every required launch arc.
 out.push({id:'forest-pit-0',x:760,y:FOREST_SPAWN-18,w:400,h:96,type:'stone',forest:true,solid:true,bucket:{left:.37,right:.63,depth:46.5}});
 return out;
}

