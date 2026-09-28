const fs=require('node:fs'),path=require('node:path');
const sharp=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const generated='C:/Users/Swagg/.codex/generated_images/01a0e575-cf69-79e3-b310-de82fde01384';
const root=path.join(__dirname,'assets/v11');
const specs=[['bucket','exec-41e1c94c-f057-438a-8b42-6b1330c9fcb8.png'],['crawler','exec-47151a33-da8a-44ea-a210-02b48d297ead.png'],['woman','exec-2d8660ec-eb1c-4438-9688-11ff629ee918.png'],['walker2','exec-6247e523-362f-4548-8d23-6b7163704fcd.png']];
(async()=>{fs.mkdirSync(root,{recursive:true});const report={};
for(const [id,file] of specs){
const source=path.join(root,id+'-source.png');if(!fs.existsSync(source))fs.copyFileSync(path.join(generated,file),source);
const {data,info}=await sharp(source).ensureAlpha().raw().toBuffer({resolveWithObject:true});const cw=info.width/4,ch=info.height/2,boxes=[];
for(let i=0;i<8;i++){let x0=cw,y0=ch,x1=-1,y1=-1;const ox=i%4*cw,oy=Math.floor(i/4)*ch;
for(let y=0;y<ch;y++)for(let x=0;x<cw;x++)if(data[((y+oy)*info.width+x+ox)*4+3]>180){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}
if(x1<0)throw Error('Empty '+id+' '+i);boxes.push({left:ox+x0,top:oy+y0,width:x1-x0+1,height:y1-y0+1});}
const maxW=Math.max(...boxes.map(b=>b.width)),maxH=Math.max(...boxes.map(b=>b.height));
const scale=Math.min((id==='bucket'?54:88)/maxW,(id==='crawler'?60:id==='bucket'?52:100)/maxH);
for(let i=0;i<8;i++){const b=boxes[i],width=Math.round(b.width*scale),height=Math.round(b.height*scale);const input=await sharp(source).extract(b).resize(width,height,{kernel:'nearest'}).png().toBuffer();
await sharp({create:{width:96,height:112,channels:4,background:'#00000000'}}).composite([{input,left:Math.round((96-width)/2),top:108-height}]).png().toFile(path.join(root,`v11-${id}-${i}.png`));}
report[id]={boxes,scale};
}
const container=path.join(root,'blockade-source.png');
if(!fs.existsSync(container))fs.copyFileSync(path.join(generated,'exec-95d7fbb2-7a51-418b-855f-932ea61ab876.png'),container);
for(const [i,name] of ['side','back','roof'].entries())await sharp(container).extract({left:i*512,top:0,width:512,height:1024}).resize(192,256,{kernel:'nearest'}).png().toFile(path.join(root,'blockade-'+name+'.png'));
fs.writeFileSync(path.join(root,'alignment.json'),JSON.stringify(report,null,2));console.log('Prepared 32 animation frames and 3 container textures.');
})().catch(e=>{console.error(e);process.exitCode=1;});
