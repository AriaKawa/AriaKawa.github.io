// Package the authored poses; never synthesize movement by stretching a still.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require(process.env.SHARP_MODULE || 'C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root = path.resolve(__dirname, '..');
const docs = path.join(root, 'docs/axolotl-animation');
const output = path.join(root, '../forge-climb-royale/assets/reforged/cosmetics/axolotl-classic-v3.png');
const columns = [0, 333, 661, 982, 1295], rows = [0, 326, 628, 903, 1214];
// Torso anchors, measured in the authored source, prevent tail width from
// shifting the body sideways. One common scale preserves pose proportions.
const anchors = [196, 517, 839, 1155, 193, 526, 843, 1171, 211, 532, 850, 1174, 200, 523, 837, 1167];
const frameNames = ['idle', 'breathe', 'charge', 'crouch', 'jump', 'fall', 'land', 'dazed', 'run-contact-left', 'run-pass-left', 'run-contact-right', 'run-pass-right', 'cheer-rise', 'cheer-up', 'cheer-wide', 'blink', 'walk-left-contact', 'walk-left-down', 'walk-left-pass', 'walk-right-contact', 'walk-right-down', 'walk-right-pass'];
const clips = {
  idle: {frames:[0,0,0,0,0,0,15,0], delay:200},
  run: {frames:[16,17,18,19,20,21], delay:100},
  jump: {frames:[0,2,3,3,4,4,5,5,6,2,0], delay:110},
  victory: {frames:[12,13,14,13], delay:170},
  defeated: {frames:[0,6,7,7,7,7], delay:180}
};
async function main() {
  fs.mkdirSync(path.join(docs, 'frames'), {recursive:true});
  const frames = [], report = [];
  for(let i=0;i<22;i++) {
    const col=i%4,row=Math.floor(i/4),blinkPair=i===0||i===15,run=i>=16;
    const left=run?(i-16)%3*512:blinkPair?(i===0?0:887):columns[col],top=run?Math.floor((i-16)/3)*512:blinkPair?0:rows[row];
    const width=run?512:blinkPair?887:columns[col+1]-left,height=run?512:blinkPair?887:rows[row+1]-top;
    const {data}=await sharp(path.join(docs,run?'generated-run.png':blinkPair?'generated-idle.png':'generated-sheet.png')).extract({left,top,width,height}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
    // The run strip was authored on an explicit green key for clean extraction.
    if(run)for(let p=0;p<data.length;p+=4)if(data[p+1]>data[p]*1.4&&data[p+1]>data[p+2]*1.4)data[p+3]=0;
    // Binary alpha removes generator matte fringes. Keep the largest connected
    // silhouette so detached background speckles cannot affect foot detection.
    const seen=new Uint8Array(width*height);let largest=[];
    for(let p=0;p<seen.length;p++) {
      if(seen[p]||data[p*4+3]<160)continue;
      const component=[p];seen[p]=1;
      for(let q=0;q<component.length;q++) {
        const at=component[q],x=at%width,y=Math.floor(at/width);
        for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]) {
          const nx=x+dx,ny=y+dy,n=ny*width+nx;
          if(nx>=0&&nx<width&&ny>=0&&ny<height&&!seen[n]&&data[n*4+3]>=160){seen[n]=1;component.push(n);}
        }
      }
      if(component.length>largest.length)largest=component;
    }
    const keep=new Set(largest);let minX=width,minY=height,maxX=0,maxY=0;
    for(let p=0;p<seen.length;p++) {
      if(keep.has(p)){data[p*4+3]=255;const x=p%width,y=Math.floor(p/width);minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}
      else data.fill(0,p*4,p*4+4);
    }
    const crop={left:minX,top:minY,width:maxX-minX+1,height:maxY-minY+1};
    const scale=run?.235:blinkPair?.134:.30,w=Math.round(crop.width*scale),h=Math.round(crop.height*scale);
    const sprite=await sharp(data,{raw:{width,height,channels:4}}).extract(crop).resize(w,h,{kernel:'nearest'}).png().toBuffer();
    const anchor=run?[284,799,1304,307,799,1304][i-16]:blinkPair?(i===0?490:1378):anchors[i];
    const x=64-Math.round((anchor-left-minX)*scale),y=116-h;
    if(x<2||y<2||x+w>126||y+h>126)throw Error('Clipped frame '+i);
    const frame=await sharp({create:{width:128,height:128,channels:4,background:'#00000000'}}).composite([{input:sprite,left:x,top:y}]).png().toBuffer();
    const packed=await sharp(frame).resize(256,256,{kernel:'nearest'}).png().toBuffer();
    frames.push(packed);fs.writeFileSync(path.join(docs,'frames',`${String(i).padStart(2,'0')}-${frameNames[i]}.png`),packed);
    report.push({frame:i,name:frameNames[i],sourceBounds:crop,x:x*2,y:y*2,width:w*2,height:h*2,footBaseline:232});
  }
  await sharp({create:{width:1024,height:1536,channels:4,background:'#00000000'}}).composite(frames.map((input,i)=>({input,left:i%4*256,top:Math.floor(i/4)*256}))).png().toFile(output);
  for(const [name,clip] of Object.entries(clips)) {
    const raw=[];
    for(const index of clip.frames)raw.push(await sharp(frames[index]).flatten({background:'#27243d'}).ensureAlpha().raw().toBuffer());
    await sharp(Buffer.concat(raw),{raw:{width:256,height:256*raw.length,channels:4,pageHeight:256}}).gif({loop:0,delay:clip.delay,dither:0}).toFile(path.join(docs,`${name}.gif`));
  }
  fs.writeFileSync(path.join(docs,'frames.json'),JSON.stringify({frameWidth:256,frameHeight:256,columns:4,frames:report,clips},null,2)+'\n');
  console.log('Packed 22 authored poses, 5 animated previews:',output);
}
main().catch(e=>{console.error(e);process.exit(1)});
