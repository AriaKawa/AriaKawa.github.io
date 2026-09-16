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
  const section=forestSection(y),rise=[94,108,122,140,132,104,142,112][index%8];
  y-=Math.min(rise,y-180);
  if(x>2180)direction=-1;if(x<360)direction=1;
  x+=direction*[152,166,140,172][index%4];
  const rest=index%8===7;
  const w=rest?300:Math.max(126,226-section*17-(index%3)*12);
  out.push({id:'forest-'+index,x:x-w/2,y,w,h:rest?28:24+(index%3)*5,type:index%4===2?'wood':'stone',forest:true,solid:true});
  // A second, narrow route beside the trail: two short rises rejoin the next shelf.
  // It also creates a useful catch ledge below a missed main jump.
  if(index%8===3 && y>400){
   out.push({id:'forest-branch-'+index,x:x-direction*240-42,y:y+70,w:84,h:24,type:'wood',forest:true,solid:true});
  }
  index++;
 }
 out.push({id:'crown',x:x+direction*175-110,y:72,w:220,h:28,type:'anvil',forest:true,solid:true});
 return out;
}
