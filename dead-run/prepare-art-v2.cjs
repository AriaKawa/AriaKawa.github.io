const fs=require('node:fs'),path=require('node:path');
const sharp=require(process.env.DEAD_RUN_SHARP||'C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=path.join(__dirname,'assets','v2');
const specs=[
 ['facades',2,2,['facade0','facade1','facade2','facade3'],256,false],
 ['surfaces',2,2,['asphalt','sidewalk','roof','wall'],128,false],
 ['props',3,2,['car','barrier','gate','supply','lamp','barrel'],[110,58,130,55,180,72],true],
 ['weapons',3,2,['weapon-carbine','weapon-shotgun','weapon-revolver','grenade','ammo','holster'],[60,60,60,64,48,64],true],
 ['upgrades',4,4,['caliber','trigger','pierce','spread','crit','burn','vital','armor','medic','leech','ghost','grenade','scavenge','rations','reroll','skull'].map(n=>'upgrade-'+n),72,true],
 ['panels',3,2,['panel-dialog','panel-common','panel-rare','panel-epic','panel-button','panel-hud'],[320,360,360,360,100,120],true],
 ['controls',4,4,['left','right','up','down','pause','play','fullscreen','sound','muted','health','grenade','reroll','home','exit','check','skull'].map(n=>'control-'+n),36,true],
 ['effects',4,2,['bullet','muzzle','blast0','blast1','fire','smoke','impact','shadow'],[16,48,90,120,80,80,55,24],true],
 ['logo',1,1,['logo'],220,true]
];
async function cropSheet(key,cols,rows,names,heights,alpha){
 const source=path.join(root,key+'-source.png'),m=await sharp(source).metadata();
 // The generated UI panel widths intentionally differ. Preserve whole corners
 // and gun barrels where a painted silhouette crosses the nominal grid line.
 const custom={panels:[[0,0,640,512],[640,0,432,512],[1072,0,464,512],[0,512,460,512],[460,512,540,512],[1000,512,536,512]],weapons:[[0,0,540,512],[540,0,470,512],[1010,0,526,512],[0,512,512,512],[512,512,512,512],[1024,512,512,512]]}[key];
 for(let i=0;i<names.length;i++){
  let left=Math.round((i%cols)*m.width/cols),top=Math.round(Math.floor(i/cols)*m.height/rows),width=Math.round((i%cols+1)*m.width/cols)-left,height=Math.round((Math.floor(i/cols)+1)*m.height/rows)-top;
  if(custom){const r=custom[i];left=Math.round(r[0]*m.width/1536);top=Math.round(r[1]*m.height/1024);width=Math.round((r[0]+r[2])*m.width/1536)-left;height=Math.round((r[1]+r[3])*m.height/1024)-top;}
  let pipeline=sharp(source).extract({left,top,width,height});
  if(alpha){
   const {data,info}=await pipeline.ensureAlpha().raw().toBuffer({resolveWithObject:true});let x0=width,y0=height,x1=-1,y1=-1;
   for(let y=0;y<height;y++)for(let x=0;x<width;x++)if(data[(y*width+x)*4+3]>180){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}
   if(x1<x0)throw Error('Empty asset '+names[i]);
   pipeline=sharp(data,{raw:info}).extract({left:x0,top:y0,width:x1-x0+1,height:y1-y0+1});
  }
  const h=Array.isArray(heights)?heights[i]:heights;
  pipeline=pipeline.resize(alpha?{height:h,kernel:'nearest'}:{width:h,height:h,kernel:'nearest'});
  if(alpha){const {data,info}=await pipeline.ensureAlpha().raw().toBuffer({resolveWithObject:true});for(let j=3;j<data.length;j+=4)data[j]=data[j]>180?255:0;pipeline=sharp(data,{raw:info});}
  await pipeline.png().toFile(path.join(root,names[i]+'.png'));
 }
 console.log(key+': '+names.length+' assets prepared');
}
(async()=>{fs.mkdirSync(root,{recursive:true});for(const spec of specs)await cropSheet(...spec);})();
