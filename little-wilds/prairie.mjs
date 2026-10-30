// One continuous landform field drives both dormant ground and restored grass.
// Coordinates are world cells, never parcel-local: buying land cannot change terrain.
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
const hash=(x,y)=>{let n=Math.imul(x,374761393)^Math.imul(y,668265263);n=Math.imul(n^(n>>>13),1274126177);return((n^(n>>>16))>>>0)/4294967295;};
const smooth=t=>t*t*(3-2*t);
function noise(x,y){const ix=Math.floor(x),iy=Math.floor(y),u=smooth(x-ix),v=smooth(y-iy);return (hash(ix,iy)*(1-u)+hash(ix+1,iy)*u)*(1-v)+(hash(ix,iy+1)*(1-u)+hash(ix+1,iy+1)*u)*v;}
export const PALETTES={
 original:{dry:[166,158,114],loam:[112,112,82],ridge:[191,177,128],green:[112,139,85],wetGreen:[77,113,80],stone:[153,149,130]},
 pixel:{dry:[190,184,140],loam:[140,144,109],ridge:[214,201,155],green:[146,176,123],wetGreen:[113,151,118],stone:[178,177,155]},
 soft:{dry:[185,177,131],loam:[134,137,99],ridge:[211,194,143],green:[136,166,110],wetGreen:[99,141,104],stone:[177,168,145]}
};
function elevation(x,y){
 const ridge=Math.sin(x*.13+y*.065+noise(x/17,y/17)*2.3);
 return .45+ridge*.19+(noise(x/14,y/14)-.5)*.34+(noise(x/5,y/5)-.5)*.06;
}
export function terrainAt(x,y){
 const a=27+Math.sin(x*.075)*5.5+Math.sin(x*.19)*1.6,b=50+Math.sin(x*.062+1.4)*5;
 const distance=Math.min(Math.abs(y-a),Math.abs(y-b)),swale=Math.exp(-distance*distance/7),channel=Math.exp(-distance*distance/.35);
 const h=elevation(x,y)-swale*.13,dx=(elevation(x+.3,y)-elevation(x-.3,y))/.6,dy=(elevation(x,y+.3)-elevation(x,y-.3))/.6;
 const shade=clamp(1-dx*4.2-dy*6.5-swale*.055,.69,1.22);
 return {height:h,shade,swale,channel,soil:noise(x/3.5+12,y/3.5),detail:noise(x*2.3,y*2.3),stone:hash(Math.floor(x*2),Math.floor(y*2))};
}
export function terrainColor(style,t,growth=0){
 const p=PALETTES[style]||PALETTES.original;
 let dry=mix(p.dry,p.ridge,clamp((t.height-.35)*1.9));dry=mix(dry,p.loam,clamp(t.swale*.5+t.channel*.32+(t.soil-.5)*.2));
 let green=mix(p.green,p.wetGreen,t.swale*.72);green=mix(green,p.ridge,t.channel*.26);
 const color=mix(dry,green,clamp(growth)),grain=(Math.floor(t.detail*5)-2)*2.2;
 return color.map(v=>Math.round(clamp(v*t.shade+grain,0,255)));
}
export const colorCSS=rgb=>'rgb('+rgb.join(',')+')';
export function createPrairieMaps(image,style){
 if(!image)return null;
 const make=()=>{const c=document.createElement('canvas');c.width=image.naturalWidth||image.width;c.height=image.naturalHeight||image.height;return c;};
 const dry=make(),green=make(),dg=dry.getContext('2d'),gg=green.getContext('2d');
 if(!dg.getImageData)return null;
 dg.drawImage(image,0,0);const raw=dg.getImageData(0,0,dry.width,dry.height),grown=gg.createImageData(dry.width,dry.height),palette=PALETTES[style]||PALETTES.original;
 const lift=style==='pixel'?16:style==='soft'?9:0;
 for(let i=0;i<raw.data.length;i+=4){const r=raw.data[i],g=raw.data[i+1],b=raw.data[i+2],luma=.3*r+.59*g+.11*b;
  const light=.25+luma/205,moisture=clamp((145-luma)/95),target=mix(palette.green,palette.wetGreen,moisture*.55);
  const mineral=clamp((25-(Math.max(r,g,b)-Math.min(r,g,b)))/15)*clamp((luma-145)/35);
  for(let c=0;c<3;c++){grown.data[i+c]=Math.round(clamp(target[c]*light*(1-mineral)+raw.data[i+c]*mineral,0,255));raw.data[i+c]=Math.round(clamp(raw.data[i+c]+lift,0,255));}grown.data[i+3]=raw.data[i+3];
 }
 dg.putImageData(raw,0,0);gg.putImageData(grown,0,0);return{dry,green};
}
export function drawPrairie(ctx,x0,y0,size,style){
 const step=8;
 for(let y=y0;y<y0+size;y+=step)for(let x=x0;x<x0+size;x+=step){const t=terrainAt((x+4)/48,(y+4)/48);ctx.fillStyle=colorCSS(terrainColor(style,t));ctx.fillRect(x,y,step,step);
  // Fine, sparse dormant litter and embedded gravel; no pre-grown grass patches.
  if(t.stone>.963){ctx.fillStyle=colorCSS(terrainColor(style,t).map(v=>Math.min(255,v+11)));ctx.fillRect(x+2,y+4,4,2);}
  if(t.channel>.3&&t.stone<.07){ctx.fillStyle=colorCSS((PALETTES[style]||PALETTES.original).stone);ctx.fillRect(x+2,y+2,4,4);}
 }
}
