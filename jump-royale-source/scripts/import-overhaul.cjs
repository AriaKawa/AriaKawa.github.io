const fs=require('fs'),path=require('path'),sharp=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const manifest=JSON.parse(fs.readFileSync('docs/overhaul-art.json','utf8'));
(async()=>{const previews=[];for(const asset of manifest){
 const {data,info}=await sharp(asset.source).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 // Chroma-key the atlas packing backdrop; preserve the authored sprite pixels.
 for(let p=0;p<data.length;p+=4)if(data[p]>100&&data[p+2]>100&&data[p]>data[p+1]*1.7&&data[p+2]>data[p+1]*1.7)data[p+3]=0;
 const frames=[];
 for(let f=0;f<12;f++){
  const x=Math.round(f%4*info.width/4),y=Math.round(Math.floor(f/4)*info.height/3),w=Math.round((f%4+1)*info.width/4)-x,h=Math.round((Math.floor(f/4)+1)*info.height/3)-y;
  const {data:d,info:i}=await sharp(data,{raw:info}).extract({left:x,top:y,width:w,height:h}).raw().toBuffer({resolveWithObject:true});
  let l=w,r=-1,t=h,b=-1;for(let yy=0;yy<h;yy++)for(let xx=0;xx<w;xx++)if(d[(yy*w+xx)*4+3]>100){l=Math.min(l,xx);r=Math.max(r,xx);t=Math.min(t,yy);b=Math.max(b,yy);}
  if(r<l)throw Error('Empty frame '+asset.id+':'+f);frames.push({d,i,l,t,w:r-l+1,h:b-t+1});
 }
 const scale=Math.min(56/frames[0].h,60/Math.max(...frames.map(f=>f.w)),60/Math.max(...frames.map(f=>f.h))),cells=[];
 for(let f=0;f<12;f++){const v=frames[f],w=Math.max(1,Math.round(v.w*scale)),h=Math.max(1,Math.round(v.h*scale));cells.push({input:await sharp(v.d,{raw:v.i}).extract({left:v.l,top:v.t,width:v.w,height:v.h}).resize(w,h,{kernel:'nearest'}).png().toBuffer(),left:f*64+Math.floor((64-w)/2),top:62-h});}
 const output='../forge-climb-royale/assets/reforged/cosmetics/'+asset.id+'.png';
 await sharp({create:{width:768,height:64,channels:4,background:'#00000000'}}).composite(cells).png().toFile(output);
 previews.push({input:await sharp(output).extract({left:0,top:0,width:64,height:64}).resize(192,192,{kernel:'nearest'}).png().toBuffer(),left:(previews.length%4)*192,top:Math.floor(previews.length/4)*192});
 console.log(asset.id+' 12 frames');
 }
 await sharp({create:{width:768,height:Math.ceil(previews.length/4)*192,channels:4,background:'#27334b'}}).composite(previews).png().toFile('docs/overhaul-preview.png');
})();
