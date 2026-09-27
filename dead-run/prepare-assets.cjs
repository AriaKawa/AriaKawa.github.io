const path=require('node:path');
const sharp=require(process.env.DEAD_RUN_SHARP||'C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const dir=path.join(__dirname,'assets');
(async()=>{
 await sharp(path.join(dir,'city-source.png')).resize(1200).webp({quality:88}).toFile(path.join(dir,'city.webp'));
 const regions=[['survivor0',0,0,384,512,92],['survivor1',384,0,384,512,92],['walker0',768,0,384,512,92],['walker1',1152,0,384,512,92],['brute',0,512,414,512,106],['runner',414,512,336,512,86],['car',750,512,395,512,95],['barrier',1145,512,391,512,44]];
 for(const [name,left,top,width,height,size] of regions){
  const {data,info}=await sharp(path.join(dir,'sprites-source.png')).extract({left,top,width,height}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  let x0=width,y0=height,x1=0,y1=0;
  for(let y=0;y<height;y++)for(let x=0;x<width;x++)if(data[(y*width+x)*4+3]>180){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);}
  const crop=await sharp(data,{raw:info}).extract({left:x0,top:y0,width:x1-x0+1,height:y1-y0+1}).resize({height:size,kernel:'nearest'}).raw().toBuffer({resolveWithObject:true});
  for(let i=3;i<crop.data.length;i+=4)crop.data[i]=crop.data[i]>180?255:0;
  await sharp(crop.data,{raw:crop.info}).png().toFile(path.join(dir,name+'.png'));
 }
 const source=path.join(dir,'horde-source.png'),m=await sharp(source).metadata(),cw=m.width/2,ch=m.height/2;
 for(let i=0;i<4;i++){
  const box={left:i%2*cw,top:Math.floor(i/2)*ch,width:cw,height:ch};
  const {data,info}=await sharp(source).extract(box).ensureAlpha().raw().toBuffer({resolveWithObject:true});let x0=cw,y0=ch,x1=0,y1=0;
  for(let y=0;y<ch;y++)for(let x=0;x<cw;x++)if(data[(y*cw+x)*4+3]>180){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);}
  const crop=await sharp(data,{raw:info}).extract({left:x0,top:y0,width:x1-x0+1,height:y1-y0+1}).resize({height:90,kernel:'nearest'}).raw().toBuffer({resolveWithObject:true});for(let j=3;j<crop.data.length;j+=4)crop.data[j]=crop.data[j]>180?255:0;
  await sharp(crop.data,{raw:crop.info}).png().toFile(path.join(dir,'horde'+i+'.png'));
 }
})();
