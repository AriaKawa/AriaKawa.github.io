import type {Platform} from './types.js';

export const MAGICAL_WIDTH=2880;
export const MAGICAL_HEIGHT=15600;
export const MAGICAL_SPAWN=MAGICAL_HEIGHT-240;
export const MAGICAL_CHAPTERS=['WISHING PLAZA','RIBBON ROOFTOPS','ROSEGLASS GARDENS','STAR CRYSTAL ARCADE','LUNAR SANCTUARY','HEART OF THE MOON'];
export const magicalSection=(y:number)=>Math.max(0,Math.min(5,Math.floor((MAGICAL_SPAWN+32-y)/2560)));

/** Repeating two-jump left/right forks merge before each small precision landing. */
export function generateMagical():Platform[]{
 const out:Platform[]=[{id:'spawn',x:54,y:MAGICAL_SPAWN+32,w:650,h:208,type:'stone',magical:true,solid:true}];
 let center=480,y=MAGICAL_SPAWN+32,direction=1,index=0;
 while(y>200){
  const section=magicalSection(y),phase=index%4;
  y-=Math.min([110,112,118,110][phase],y-180);
  if(center>2250)direction=-1;if(center<500)direction=1;
  // Difficulty tuning: 25% less landing width on both routes.
  const small=phase===3,w=(small?84:Math.max(164,214-section*8))*.75;
  const x=center+(phase===0?160:phase===1?290:phase===3?direction*150:0);
  out.push({id:'magical-'+index,x:x-w/2,y,w,h:small?22:28,type:small?'wood':'stone',magical:true,solid:true});
  if(phase<2){
   const left=center-(phase===0?160:290);
   out.push({id:'magical-branch-'+index,x:left-w/2,y,w,h:28,type:'stone',magical:true,solid:true});
  }
  if(small)center=x;
  index++;
 }
 const last=out.find(p=>p.id==='magical-'+(index-1))!;
 out.push({id:'crown',x:last.x+last.w/2+direction*175-110,y:72,w:220,h:28,type:'anvil',magical:true,solid:true});
 return out;
}
