import type {Platform} from './types.js';

export const MAGICAL_WIDTH=2880;
export const MAGICAL_HEIGHT=15600;
export const MAGICAL_SPAWN=MAGICAL_HEIGHT-240;
export const MAGICAL_CHAPTERS=['WISHING PLAZA','RIBBON ROOFTOPS','ROSEGLASS GARDENS','STAR CRYSTAL ARCADE','LUNAR SANCTUARY','HEART OF THE MOON'];
export const magicalSection=(y:number)=>Math.max(0,Math.min(5,Math.floor((MAGICAL_SPAWN+32-y)/2560)));

/** Long switchbacks. Every branch rejoins the main trail; all exposed tops are solid. */
export function generateMagical():Platform[]{
 const out:Platform[]=[{id:'spawn',x:54,y:MAGICAL_SPAWN+32,w:650,h:208,type:'stone',magical:true,solid:true}];
 let x=470,y=MAGICAL_SPAWN+32,direction=1,index=0;
 while(y>200){
  const section=magicalSection(y),rise=[100,112,118,140,126,110,136,116][index%8];
  y-=Math.min(rise,y-180);
  if(x>2460)direction=-1;if(x<360)direction=1;
  x+=direction*[160,148,178,156][index%4];
  const rest=index%8===7;
  const w=rest?260:Math.max(126,234-section*18-(index%3)*12);
  out.push({id:'magical-'+index,x:x-w/2,y,w,h:rest?28:24+(index%3)*5,type:index%4===2?'wood':'stone',magical:true,solid:true});
  // A second, narrow route beside the trail: two short rises rejoin the next shelf.
  // It also creates a useful catch ledge below a missed main jump.
  if(index%8===3 && y>400){
   out.push({id:'magical-branch-'+index,x:x-direction*240-42,y:y+70,w:84,h:24,type:'wood',magical:true,solid:true});
  }
  index++;
 }
 out.push({id:'crown',x:x+direction*175-110,y:72,w:220,h:28,type:'anvil',magical:true,solid:true});
 return out;
}
