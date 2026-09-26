const fs=require('node:fs'),path=require('node:path');
const sharp=require(process.env.NEON_SHARP_MODULE||'sharp');
const dir=path.join(__dirname,'assets');
async function boundedCrop(source,box,name,height){
  const image=sharp(source).extract(box).ensureAlpha();
  const {data,info}=await image.raw().toBuffer({resolveWithObject:true});
  let x0=info.width,y0=info.height,x1=0,y1=0;
  for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>180){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);}
  const width=x1-x0+1,h=y1-y0+1;
  await sharp(source).extract({left:box.left+x0,top:box.top+y0,width,height:h}).resize({height,kernel:'nearest'}).png().toFile(path.join(dir,name+'.png'));
  console.log(name,width,h);
}
(async()=>{
  await sharp(path.join(dir,'cover-source.png')).resize(1440).webp({quality:86}).toFile(path.join(dir,'cover.webp'));
  await sharp(path.join(dir,'city-source.png')).resize(960).webp({quality:88}).toFile(path.join(dir,'city.webp'));
  const props=path.join(dir,'props-source.png'),m=await sharp(props).metadata(),half=Math.floor(m.width/2);
  for(const [i,name]of ['train','barrier','gate','coin'].entries())await boundedCrop(props,{left:(i%2)*half,top:Math.floor(i/2)*half,width:half,height:half},name,[144,58,98,32][i]);
  const runner=path.join(dir,'runner-source.png');
  for(let i=0;i<4;i++)await boundedCrop(runner,{left:i*384,top:100,width:384,height:824},'runner-'+i,80);
  const environment=path.join(dir,'environment-source.png'),em=await sharp(environment).metadata(),ew=Math.floor(em.width/2),eh=Math.floor(em.height/2);
  for(let i=0;i<4;i++)await boundedCrop(environment,{left:(i%2)*ew,top:Math.floor(i/2)*eh,width:ew,height:eh},'building-'+i,192);
  const actions=path.join(dir,'actions-source.png'),am=await sharp(actions).metadata(),aw=Math.floor(am.width/2);
  await boundedCrop(actions,{left:0,top:0,width:aw,height:am.height},'jump',64);
  await boundedCrop(actions,{left:aw,top:0,width:aw,height:am.height},'slide',38);
  const carriage=path.join(dir,'carriage-source.png'),cm=await sharp(carriage).metadata();
  await boundedCrop(carriage,{left:0,top:0,width:cm.width,height:cm.height},'carriage',80);
})();
