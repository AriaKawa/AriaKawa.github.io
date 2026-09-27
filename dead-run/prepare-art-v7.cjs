const fs=require('node:fs'),path=require('node:path');
const sharp=require(process.env.DEAD_RUN_SHARP||'C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=path.join(__dirname,'assets/v7'),manifest=require('./assets/v7/generation.json');
async function components(source){
 const {data,info}=await sharp(source).ensureAlpha().raw().toBuffer({resolveWithObject:true}),seen=new Uint8Array(info.width*info.height),parts=[];
 for(let n=0;n<seen.length;n++){
  if(seen[n]||data[n*4+3]<180)continue;
  const queue=[n];seen[n]=1;let x0=info.width,y0=info.height,x1=0,y1=0;
  for(let i=0;i<queue.length;i++){const p=queue[i],x=p%info.width,y=Math.floor(p/info.width);x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);
   for(const v of [x>0?p-1:-1,x<info.width-1?p+1:-1,p-info.width,p+info.width])if(v>=0&&v<seen.length&&!seen[v]&&data[v*4+3]>=180){seen[v]=1;queue.push(v);}
  }
  if(queue.length>100)parts.push({left:x0,top:y0,width:x1-x0+1,height:y1-y0+1,count:queue.length});
 }
 return {parts,info};
}
async function crop(source,cell){
 const {data,info}=await sharp(source).extract(cell).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 let x0=info.width,y0=info.height,x1=0,y1=0,rx=0,count=0;
 for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++){const n=(y*info.width+x)*4;if(data[n+3]<100)continue;x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);if(data[n]>data[n+1]*1.35&&data[n+1]>data[n+2]*1.1&&y<info.height*.7){rx+=x;count++;}}
 return {box:{left:cell.left+x0,top:cell.top+y0,width:x1-x0+1,height:y1-y0+1},pivot:count?rx/count-x0:(x1-x0)/2};
}
(async()=>{
 for(const {id,source,originalSource} of manifest){
  const local=path.join(root,id+'-source.png');if(fs.existsSync(source))fs.copyFileSync(source,local);
  if(originalSource&&fs.existsSync(originalSource))fs.copyFileSync(originalSource,path.join(root,id+'-original-source.png'));
  if(id==='crate'){await sharp(local).trim().resize(144,112,{fit:'inside',kernel:'nearest'}).png().toFile(path.join(root,'weaponcrate.png'));continue;}
  const {parts,info}=await components(local),figures=parts.filter(p=>p.top+p.height/2<info.height*.83).sort((a,b)=>b.count-a.count).slice(0,12).sort((a,b)=>a.top+a.height/2-b.top-b.height/2),ordered=[];
  if(figures.length!==12)throw Error('Missing character frames: '+id);
  for(let row=0;row<3;row++)ordered.push(...figures.slice(row*4,row*4+4).sort((a,b)=>a.left+a.width/2-b.left-b.width/2));
  const cells=[];for(const {count,...box} of ordered)cells.push(await crop(local,box));
  const icons=parts.filter(p=>p.top+p.height/2>info.height*.85&&p.left+p.width/2<info.width/4).sort((a,b)=>b.count-a.count).slice(0,id==='glocks'?2:1);
  if(!icons.length)throw Error('Missing inventory icon: '+id);
  const left=Math.min(...icons.map(p=>p.left)),top=Math.min(...icons.map(p=>p.top)),right=Math.max(...icons.map(p=>p.left+p.width)),bottom=Math.max(...icons.map(p=>p.top+p.height));cells.push({box:{left,top,width:right-left,height:bottom-top}});
  const scale=Math.min(100/Math.max(...cells.slice(0,4).map(c=>c.box.height)),124/Math.max(...cells.slice(0,12).map(c=>c.box.width)));
  for(let i=0;i<12;i++){
   const {box,pivot}=cells[i],width=Math.round(box.width*scale),height=Math.min(124,Math.round(box.height*scale)),input=await sharp(local).extract(box).resize(width,height,{kernel:'nearest'}).png().toBuffer();
   const left=Math.max(0,Math.min(128-width,Math.round(64-pivot*scale))),top=i===9?Math.min(20,128-height):124-height;
   const pose=i<4?'run':i<8?(id==='katana'?'slash':'aim'):'jump';
   await sharp({create:{width:128,height:128,channels:4,background:'#00000000'}}).composite([{input,left,top}]).png().toFile(path.join(root,`v7-${id}-${pose}-${i%4}.png`));
  }
  await sharp(local).extract(cells[12].box).resize(176,72,{fit:'inside',kernel:'nearest'}).png().toFile(path.join(root,'weapon-'+id+'.png'));
 }
 console.log('Prepared 60 character frames, five inventory weapons and the crate.');
})().catch(e=>{console.error(e);process.exitCode=1;});
