import type {Platform} from './types.js';
// bucket-16.webp is 1024 x 221: inner walls x=378/647, floor cap y=107.
export const BUCKET_ART={left:378/1024,right:647/1024,depth:107/221};
// Opaque rock silhouette sampled in 32-pixel strips; isolated roots are decorative.
const bottom=[45,110,126,157,170,156,150,159,169,173,174,179,183,189,187,190,197,209,202,187,184,176,183,174,168,162,169,156,171,144,124,40];
export function bucketPolygons(p:Platform):{x:number;y:number}[][]{
  const height=(x:number)=>{const t=Math.max(0,Math.min(31,(x-16)/32)),i=Math.floor(t);return (bottom[i]+(bottom[Math.min(31,i+1)]-bottom[i])*(t-i))/221*p.h;};
  const xs=[0,378,647,1024,...bottom.map((_,i)=>16+i*32)].sort((a,b)=>a-b);
  return xs.slice(0,-1).map((x,i)=>{const end=xs[i+1],top=(x>=378&&end<=647?107:0)/221*p.h;return [{x:x/1024*p.w,y:top},{x:end/1024*p.w,y:top},{x:end/1024*p.w,y:height(end)},{x:x/1024*p.w,y:height(x)}];});
}
export function fitBucket(p:Platform):void{
  if(p.bucket&&p.forest)p.bucket={left:BUCKET_ART.left,right:BUCKET_ART.right,depth:p.h*BUCKET_ART.depth};
}
