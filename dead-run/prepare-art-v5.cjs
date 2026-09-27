const fs=require('node:fs'),path=require('node:path');
const sharp=require(process.env.DEAD_RUN_SHARP||'C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=path.join(__dirname,'assets/v5');
async function prepare(name){
 const source=path.join(root,name+'-source.png'),{data,info}=await sharp(source).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 let x0=info.width,y0=info.height,x1=-1,y1=-1;
 for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>150){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}
 if(x1<0)throw new Error('Empty asset: '+name);
 const sprite=name.startsWith('survivor-');
 await sharp(source).extract({left:x0,top:y0,width:x1-x0+1,height:y1-y0+1}).resize(sprite?{height:112,kernel:'nearest'}:{width:160,height:128,fit:'inside',kernel:'nearest'}).png().toFile(path.join(root,name+'.png'));
}
Promise.all(['minigun','stim','skateboard','survivor-minigun','survivor-skateboard'].map(prepare)).then(()=>console.log('Prepared five endless gear assets.')).catch(e=>{console.error(e);process.exitCode=1;});
