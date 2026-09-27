const fs=require('node:fs'),path=require('node:path');
const sharp=require(process.env.DEAD_RUN_SHARP||'C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=path.join(__dirname,'assets','v3');
async function bounds(source,region){
 const {data,info}=await sharp(source).extract(region).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 let x0=info.width,y0=info.height,x1=-1,y1=-1;
 for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>180){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}
 if(x1<0)throw Error('Empty image');
 let sum=0,count=0;for(let y=y0;y<y0+(y1-y0)*.14;y++)for(let x=x0;x<=x1;x++)if(data[(y*info.width+x)*4+3]>180){sum+=x;count++;}
 return{x0,y0,x1,y1,pivot:count?sum/count:(x0+x1)/2};
}
async function main(){
 for(const weapon of ['carbine','shotgun','revolver']){
  const source=path.join(root,'animation-'+weapon+'-source.png'),m=await sharp(source).metadata(),cw=m.width/4,ch=m.height/2;
  const cells=Array.from({length:8},(_,i)=>({left:i%4*cw,top:Math.floor(i/4)*ch,width:cw,height:ch}));
  const boxes=await Promise.all(cells.map(c=>bounds(source,c)));
  // Shared scale and foot baseline; keep the slide's low silhouette intact.
  const tallest=Math.max(...boxes.map(b=>b.y1-b.y0+1)),scale=100/tallest;
  for(let i=0;i<8;i++){
   const b=boxes[i],w=b.x1-b.x0+1,h=b.y1-b.y0+1;
   const buf=await sharp(source).extract({left:cells[i].left+b.x0,top:cells[i].top+b.y0,width:w,height:h}).resize({width:Math.round(w*scale),height:Math.round(h*scale),kernel:'nearest'}).png().toBuffer();
   const bm=await sharp(buf).metadata(),left=i===7?Math.round((96-bm.width)/2):Math.max(0,Math.min(96-bm.width,Math.round(48-(b.pivot-b.x0)*scale)));
   await sharp({create:{width:96,height:112,channels:4,background:'#00000000'}}).composite([{input:buf,left,top:108-bm.height}]).png().toFile(path.join(root,`survivor-${weapon}-${i}.png`));
  }
 }
 const aim=path.join(root,'aim-source.png'),am=await sharp(aim).metadata();
 for(let i=0;i<6;i++){
  const cell={left:i%3*am.width/3,top:Math.floor(i/3)*am.height/2,width:am.width/3,height:am.height/2},b=await bounds(aim,cell);
  const buf=await sharp(aim).extract({left:cell.left+b.x0,top:cell.top+b.y0,width:b.x1-b.x0+1,height:b.y1-b.y0+1}).resize({height:100,kernel:'nearest'}).png().toBuffer(),m=await sharp(buf).metadata();
  const left=Math.max(0,Math.min(96-m.width,Math.round(48-(b.pivot-b.x0)*100/(b.y1-b.y0+1))));
  await sharp({create:{width:96,height:112,channels:4,background:'#00000000'}}).composite([{input:buf,left,top:8}]).png().toFile(path.join(root,`aim-${['carbine','shotgun','revolver'][i%3]}-${Math.floor(i/3)}.png`));
 }
 const source=path.join(root,'vehicles-source.png');
 const rects=[[0,0,768,512],[768,0,336,512],[1104,0,432,512],[0,512,768,512],[768,512,336,512],[1104,512,432,512]];
 const names=['bus-side','bus-back','bus-roof','truck-side','truck-back','truck-roof'];
 for(let i=0;i<6;i++){const [left,top,width,height]=rects[i];await sharp(source).extract({left,top,width,height}).resize({width:i%3===0?192:96,height:128,kernel:'nearest'}).png().toFile(path.join(root,names[i]+'.png'));}
 const kit=path.join(root,'road-kit-source.png'),m=await sharp(kit).metadata();
 const kitNames=['cracks','oil','debris','spikes','barrels','ramp'];
 for(let i=0;i<6;i++){const cell={left:i%3*m.width/3,top:Math.floor(i/3)*m.height/2,width:m.width/3,height:m.height/2},b=await bounds(kit,cell);await sharp(kit).extract({left:cell.left+b.x0,top:cell.top+b.y0,width:b.x1-b.x0+1,height:b.y1-b.y0+1}).resize({width:i<3?96:i===5?128:112,kernel:'nearest'}).png().toFile(path.join(root,kitNames[i]+'.png'));}
 console.log('Prepared 30 aligned animation frames, 6 vehicle textures and 6 road assets.');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
