const fs=require('node:fs'),path=require('node:path');
const sharp=require(process.env.DEAD_RUN_SHARP||'C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=path.join(__dirname,'assets','v6'),manifest=require('./v6-generation.json');
async function bounds(source,region){
 const {data,info}=await sharp(source).extract(region).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 let x0=info.width,y0=info.height,x1=-1,y1=-1;
 for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>180){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}
 if(x1<0)throw Error('Empty cell');
 let sum=0,count=0;for(let y=y0;y<y0+(y1-y0)*.14;y++)for(let x=x0;x<=x1;x++)if(data[(y*info.width+x)*4+3]>180){sum+=x;count++;}
 return{x0,y0,x1,y1,pivot:count?sum/count:(x0+x1)/2};
}
async function figures(source,rows){
 const {data,info}=await sharp(source).ensureAlpha().raw().toBuffer({resolveWithObject:true}),seen=new Uint8Array(info.width*info.height),parts=[];
 for(let at=0;at<seen.length;at++){
  if(seen[at]||data[at*4+3]<=180)continue;
  const queue=[at];seen[at]=1;let count=0,x0=info.width,y0=info.height,x1=0,y1=0;
  for(let i=0;i<queue.length;i++){
   const n=queue[i],x=n%info.width,y=Math.floor(n/info.width);count++;x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);
   for(const next of [x>0?n-1:-1,x<info.width-1?n+1:-1,n-info.width,n+info.width])if(next>=0&&next<seen.length&&!seen[next]&&data[next*4+3]>180){seen[next]=1;queue.push(next);}
  }
  if(count>200)parts.push({left:x0,top:y0,width:x1-x0+1,height:y1-y0+1,count});
 }
 const sorted=parts.sort((a,b)=>b.count-a.count).slice(0,rows*4).sort((a,b)=>a.top+a.height/2-b.top-b.height/2),cells=[];
 if(sorted.length!==rows*4)throw Error(`Expected ${rows*4} figures in ${source}, found ${sorted.length}`);
 for(let row=0;row<rows;row++)cells.push(...sorted.slice(row*4,row*4+4).sort((a,b)=>a.left-b.left));
 return cells.map(({count,...box})=>box);
}
async function main(){
 fs.mkdirSync(root,{recursive:true});let total=0;const alignment={};
 for(const spec of manifest){
  const {id}=spec,normal=['carbine','shotgun','revolver'].includes(id),gear=['minigun','shieldboard'].includes(id),rows=normal?6:gear?4:2;
  const source=path.join(root,id+'-source.png');
  if(fs.existsSync(spec.source))fs.copyFileSync(spec.source,source);
  const cells=await figures(source,rows),sources=cells.map(()=>source);
  if(spec.runSource){const corrected=path.join(root,id+'-run-corrected-source.png');if(fs.existsSync(spec.runSource))fs.copyFileSync(spec.runSource,corrected);const fixes=await figures(corrected,rows);for(let i=0;i<8;i++){cells[i]=fixes[i];sources[i]=corrected;}}
  const boxes=await Promise.all(cells.map((c,i)=>bounds(sources[i],c))),standing=boxes.slice(0,normal?16:8);
  // All frames share scale: a tucked jump never expands to standing height.
  const scale=Math.min(100/Math.max(...standing.map(b=>b.y1-b.y0+1)),90/Math.max(...boxes.map(b=>b.x1-b.x0+1)));
  const frameSources=Array.from({length:cells.length},(_,i)=>i);
  // Hold the fully tucked pose through the apex rather than popping upright.
  if(normal||gear)frameSources[cells.length-4]=cells.length-5;
  alignment[id]=[];
  for(let i=0;i<cells.length;i++){
   const index=frameSources[i],b=boxes[index],cell=cells[index],w=b.x1-b.x0+1,h=b.y1-b.y0+1;
   const width=Math.round(w*scale),height=Math.round(h*scale),input=await sharp(sources[index]).extract({left:cell.left+b.x0,top:cell.top+b.y0,width:w,height:h}).resize({width,height,kernel:'nearest'}).png().toBuffer();
   const jump=(normal||gear)&&i>=cells.length-8,frame=i%8,pose=jump?'jump':normal?(i<8?'run':'aim'):id==='shieldboard'?'ride':gear?'aim':null;
   const left=Math.max(0,Math.min(96-width,Math.round(48-(b.pivot-b.x0)*scale))),top=jump&&frame>0&&frame<7?Math.min(8,112-height):108-height;
   const name=`v6-${id}${pose?'-'+pose:''}-${frame}`;
   await sharp({create:{width:96,height:112,channels:4,background:'#00000000'}}).composite([{input,left,top}]).png().toFile(path.join(root,name+'.png'));
   alignment[id].push({name,sourceFrame:index,left,top,width,height});total++;
  }
 }
 fs.writeFileSync(path.join(root,'alignment.json'),JSON.stringify(alignment,null,2)+'\n');
 console.log(`Prepared ${total} aligned frames in assets/v6.`);
}
main().catch(e=>{console.error(e);process.exitCode=1;});
