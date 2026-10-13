export const PACK_IDS=['16bit','64bit','cartoon'];
export const ASSET_IDS=['peanut','hutch','ninja','logo','floor','wall','crate','bomb','pickup','blast','paused','won','lost','roundWon'];
const cache=new Map();
function bounds(img){
 const c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;
 const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(img,0,0);const pixels=x.getImageData(0,0,c.width,c.height).data;
 let left=c.width,top=c.height,right=-1,bottom=-1;
 for(let y=0;y<c.height;y++)for(let xx=0;xx<c.width;xx++)if(pixels[(y*c.width+xx)*4+3]>40){left=Math.min(left,xx);right=Math.max(right,xx);top=Math.min(top,y);bottom=Math.max(bottom,y);}
 return right<0?[0,0,c.width,c.height]:[left,top,right-left+1,bottom-top+1];
}
export async function loadPack(id){
 if(!PACK_IDS.includes(id))throw new Error('Unknown art style');
 if(cache.has(id))return cache.get(id);
 const promise=Promise.all(ASSET_IDS.map(name=>new Promise((resolve,reject)=>{
 const img=new Image();img.onload=()=>{try{resolve([name,{img,bounds:bounds(img)}]);}catch(e){reject(e);}};img.onerror=()=>reject(new Error('Missing asset: '+id+'/'+name));img.src='assets/'+id+'/'+name+'.png';
 }))).then(entries=>({id,assets:Object.fromEntries(entries)}));
 cache.set(id,promise);try{return await promise;}catch(e){cache.delete(id);throw e;}
}
export function drawAsset(c,pack,id,x,y,w,h,{contain=true,alpha=1}={}){
 const asset=pack?.assets[id];if(!asset)return false;const b=asset.bounds;
 if(contain){const scale=Math.min(w/b[2],h/b[3]),nw=b[2]*scale,nh=b[3]*scale;x+=(w-nw)/2;y+=(h-nh)/2;w=nw;h=nh;}
 c.save();c.imageSmoothingEnabled=pack.id!=='16bit';c.globalAlpha*=alpha;c.drawImage(asset.img,...b,x,y,w,h);c.restore();return true;
}
