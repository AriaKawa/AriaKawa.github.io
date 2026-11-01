import{canWork}from './land.mjs';
import{createPrairieMaps,drawPrairie,terrainAt,terrainColor,colorCSS,PALETTES}from './prairie.mjs';
import{W,H}from './core.mjs';
import{lifeAt,meadowThreshold,randomAt}from './meadow.mjs';
import{fullness}from './grass-motion.mjs';
export function createMapCache(imgs){
 const tiles=new Map(),ground=new Map(),stamp=[];let version=0,carpet,maps;
 const surface=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.imageSmoothingEnabled=false;return[c,g];};
 function init(){maps=createPrairieMaps(imgs.prairie,imgs.artStyle);ground.clear();stamp.length=0;const[c,g]=surface(16,16);g.drawImage(imgs.meadow,0,0,16,16);carpet=c;for(let row=0;row<4;row++){const[c,g]=surface(12,16),im=imgs.blades_simple;g.drawImage(im,im.width/4,row*im.height/4,im.width/4,im.height/4,0,0,12,16);g.globalCompositeOperation='source-atop';g.globalAlpha=.72;g.fillStyle=colorCSS((PALETTES[imgs.artStyle]||PALETTES.original).green);g.fillRect(0,0,12,16);g.globalAlpha=1;g.globalCompositeOperation='source-over';stamp.push(c);}}
 function build(s,cx,cy,lod){const res=lod===0?1:lod===1?.5:.25,size=256/res,pad=32,x0=cx*size,y0=cy*size;
 const[base,bg]=surface(256,256),[grass,gg]=surface(256+pad*2*res,256+pad*2*res);
 const key=cx+','+cy+','+lod;
 if(ground.has(key))bg.drawImage(ground.get(key),0,0);else{bg.save();bg.scale(res,res);bg.translate(-x0,-y0);if(maps)bg.drawImage(maps.dry,0,0,W*48,H*48);else drawPrairie(bg,x0,y0,size,imgs.artStyle);bg.restore();ground.set(key,base);if(ground.size>192)ground.delete(ground.keys().next().value);}
 gg.scale(res,res);gg.translate(pad-x0,pad-y0);const spacing=8,flowers=[],tufts=[];
 for(let yy=Math.max(0,Math.floor((y0-pad)/spacing));yy<=Math.min(H*48/spacing,Math.ceil((y0+size+pad)/spacing));yy++)for(let xx=Math.max(0,Math.floor((x0-pad)/spacing));xx<=Math.min(W*48/spacing,Math.ceil((x0+size+pad)/spacing));xx++){const n=yy*10007+xx,wx=(xx+randomAt(n+47))*spacing,wy=(yy+randomAt(n+93))*spacing,gx=wx/48,gy=wy/48,f=lifeAt(s.land,gx,gy,s.cover);if(!canWork(s,gx,gy))continue;if(f.coverage<meadowThreshold(gx,gy))continue;const density=fullness(gx,gy,f.richness,f.thickness),terrain=terrainAt(gx,gy),growth=Math.min(1,Math.max(0,(f.coverage-meadowThreshold(gx,gy))*1.8));
 gg.globalAlpha=growth*(.5+f.thickness*.5);gg.fillStyle=maps?'#fff':colorCSS(terrainColor(imgs.artStyle,terrain,1));gg.fillRect(xx*spacing,yy*spacing,spacing,spacing);gg.globalAlpha=1;
 if(randomAt(n+719)>(.1+density*.16)*growth)continue;const row=f.richness>4&&randomAt(n+61)<.2?3:Math.floor(randomAt(n+61)*3),z=.65+density*.55+randomAt(n+91)*.15,w=Math.round((10+f.thickness*3)*z),h=Math.round(9*z);tufts.push({wx,wy,w,h,row,thickness:f.thickness});if(f.richness>3.3&&randomAt(n+401)<.015)flowers.push({x:wx,y:wy,i:2+n%2});}
 if(maps){gg.globalCompositeOperation='source-in';gg.drawImage(maps.green,0,0,W*48,H*48);gg.globalCompositeOperation='source-over';}
 for(const t of tufts){gg.globalAlpha=.7;gg.drawImage(stamp[t.row],Math.round(t.wx-t.w/2),Math.round(t.wy-t.h),t.w,t.h);gg.globalAlpha=1;}
 for(const f of flowers){const im=imgs.plants,cw=im.width/4,ch=im.height/4;gg.drawImage(im,f.i%4*cw,Math.floor(f.i/4)*ch,cw,ch,f.x-9,f.y-18,18,18);}
 return{base,grass,x:x0,y:y0,size,res,pad,dirty:false,used:version};}
 return{init,clear(){tiles.clear();},invalidate(index){const x=index%W*48,y=Math.floor(index/W)*48;for(const t of tiles.values())if(x+110>=t.x&&x-110<=t.x+t.size&&y+110>=t.y&&y-110<=t.y+t.size)t.dirty=true;},
 visible(s,camera,vw,vh){version++;const lod=1,size=512,lo=camera.world(0,0),hi=camera.world(vw,vh),list=[];for(let y=Math.floor(lo.y/size);y<=Math.floor(hi.y/size);y++)for(let x=Math.floor(lo.x/size);x<=Math.floor(hi.x/size);x++)list.push({key:lod+','+x+','+y,x,y});
 list.sort((a,b)=>Math.hypot((a.x+.5)*size-camera.x,(a.y+.5)*size-camera.y)-Math.hypot((b.x+.5)*size-camera.x,(b.y+.5)*size-camera.y));const start=performance.now();let builds=0;
 for(const p of list){let t=tiles.get(p.key);if(!t||(t.dirty&&builds<3&&performance.now()-start<5)){t=build(s,p.x,p.y,lod);tiles.set(p.key,t);builds++;}if(t)t.used=version;}
 const capacity=Math.max(128,list.length+32);if(tiles.size>capacity){const old=[...tiles.entries()].sort((a,b)=>a[1].used-b[1].used);for(let i=0;i<old.length-capacity;i++)tiles.delete(old[i][0]);}
 return list.map(p=>tiles.get(p.key)).filter(Boolean);}
 };
}


