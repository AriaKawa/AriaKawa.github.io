const path=require('node:path');
const sharp=require(process.env.DEAD_RUN_SHARP||'C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=path.join(__dirname,'assets','v4');
async function cells(name){const source=path.join(root,name+'-source.png'),m=await sharp(source).metadata(),items=[];
 for(let i=0;i<8;i++){const left=Math.round(i%4*m.width/4),top=Math.round(Math.floor(i/4)*m.height/2),region={left,top,width:Math.round((i%4+1)*m.width/4)-left,height:Math.round((Math.floor(i/4)+1)*m.height/2)-top};
  const {data,info}=await sharp(source).extract(region).ensureAlpha().raw().toBuffer({resolveWithObject:true});let x0=info.width,y0=info.height,x1=-1,y1=-1;
  for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>180){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}
  items.push({source,left:region.left+x0,top:region.top+y0,width:x1-x0+1,height:y1-y0+1});
 }return items;
}
(async()=>{
 const roll=await cells('roll'),scale=Math.min(100/Math.max(...roll.map(c=>c.height)),94/Math.max(...roll.map(c=>c.width)));
 for(let i=0;i<8;i++){const {source,...region}=roll[i],w=Math.round(region.width*scale),h=Math.round(region.height*scale),buf=await sharp(source).extract(region).resize(w,h,{kernel:'nearest'}).png().toBuffer();await sharp({create:{width:96,height:112,channels:4,background:'#00000000'}}).composite([{input:buf,left:Math.round((96-w)/2),top:108-h}]).png().toFile(path.join(root,'roll'+i+'.png'));}
 const blood=await cells('blood'),names=['blood0','blood1','blood2','blood3','blood-pool','blood-splatter','blood-fill','blood-drops'];
 for(let i=0;i<8;i++){const {source,...region}=blood[i];await sharp(source).extract(region).resize({width:i===6?256:i===7?24:96,kernel:'nearest'}).png().toFile(path.join(root,names[i]+'.png'));}
 console.log('Prepared 8 dodge roll frames and 8 blood effects.');
})().catch(e=>{console.error(e);process.exitCode=1;});
