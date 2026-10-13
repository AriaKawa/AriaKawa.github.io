/** Original arcade arena artwork. Coordinates stay aligned with the collision grid. */
const T=30, OX=13, OY=11, W=416, H=352, TAU=Math.PI*2;
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(x,y,w,h);}
function oval(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fill();}
function gradient(c,x,y,h,colors){const g=c.createLinearGradient(x,y,x,y+h);colors.forEach((v,i)=>g.addColorStop(i/(colors.length-1),v));return g;}
function polygon(c,points,color){c.fillStyle=color;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill();}
function metal(c,x,y,edge=false){
 rect(c,x,y,30,30,'#123b31');rect(c,x+2,y+3,28,27,'#063c2bb3');
 rect(c,x+1,y,28,28,'#354d51');
 polygon(c,[[x+1,y],[x+29,y],[x+25,y+4],[x+5,y+4]],'#d2e2df');
 polygon(c,[[x+1,y],[x+5,y+4],[x+5,y+24],[x+1,y+28]],'#a4b7b8');
 polygon(c,[[x+29,y],[x+25,y+4],[x+25,y+24],[x+29,y+28]],'#556c71');
 polygon(c,[[x+1,y+28],[x+5,y+24],[x+25,y+24],[x+29,y+28]],'#789297');
 rect(c,x+5,y+4,20,20,gradient(c,x,y,24,['#526c71','#97adaf']));
 rect(c,x+7,y+6,16,16,gradient(c,x,y+6,16,['#172e38','#526e76']));
 polygon(c,[[x+7,y+6],[x+23,y+6],[x+19,y+10],[x+11,y+10],[x+11,y+18],[x+7,y+22]],'#30454d');
 rect(c,x+7,y+22,17,1,'#c1d0c6');rect(c,x+2,y+1,26,1,'#ecf6dd');
 if(edge){rect(c,x+10,y+10,10,7,'#18353b');rect(c,x+11,y+11,8,2,'#506970');}
}
function brick(c,x,y,seed){
 rect(c,x+1,y+2,30,28,'#092d23aa');rect(c,x,y,29,28,'#442a22');
 for(let row=0;row<3;row++){
  const widths=row%2?[7,15,7]:[14,15];let bx=x;
  for(let j=0;j<widths.length;j++){
   const width=widths[j], yy=y+row*9;
   rect(c,bx+1,yy+1,width-1,8,gradient(c,bx,yy,9,[(seed+j+row)%3?'#c68d57':'#b67a47','#815034','#613a2a']));
   rect(c,bx+1,yy+1,width-2,1,'#e0aa75');rect(c,bx+1,yy+2,1,5,'#b48150');
   rect(c,bx+width-1,yy+3,1,5,'#472b22');rect(c,bx+2,yy+7,width-3,1,'#563223');
   bx+=width;
  }
 }
 rect(c,x,y+27,29,2,'#352921');
}
export function drawArena(ctx,game,{time=0,reduced=false}={}){
 ctx.save();rect(ctx,0,0,W,H,'#172c37');
 // Machinery surrounds the playable grid, with a restrained hazard stripe rail.
 rect(ctx,6,4,W-12,H-8,gradient(ctx,0,0,H,['#a4b5b0','#334d5b','#78908e']));
 for(let y=12;y<H-10;y+=10){for(const x of [6,W-10]){rect(ctx,x,y,4,7,'#d2b338');polygon(ctx,[[x,y+1],[x+4,y+5],[x+4,y+9],[x,y+5]],'#243338');}}
 rect(ctx,OX-2,OY-2,394,334,'#203b41');
 for(let y=0;y<game.grid.length;y++)for(let x=0;x<game.grid[y].length;x++){
  const sx=OX+x*T,sy=OY+y*T;
  rect(ctx,sx,sy,T,T,'#08602c');
  rect(ctx,sx+1,sy+1,T-2,T-2,gradient(ctx,sx,sy,T,[(x+y)%2?'#139d43':'#12973e','#087a32']));
  rect(ctx,sx+3,sy+3,24,1,'#29b256');rect(ctx,sx+3,sy+4,1,22,'#1ca647');
  rect(ctx,sx+5,sy+5,21,1,'#0f8838');rect(ctx,sx+26,sy+4,1,23,'#075d2b');rect(ctx,sx+4,sy+26,22,1,'#07622b');
  if(game.grid[y][x]===1)metal(ctx,sx,sy,x===0||y===0||x===12||y===10);
  else if(game.grid[y][x]===2)brick(ctx,sx,sy,x*7+y*3);
 }
 for(let x=28;x<W-22;x+=60){rect(ctx,x,4,12,4,'#183038');rect(ctx,x+1,4,9,2,!reduced&&Math.sin(time*2+x)>.8?'#ffb257':'#f05732');}
 ctx.restore();
}
export function drawBomb(ctx,x,y,bomb={}, {time=0,reduced=false}={}){
 const fuse=Math.max(0,bomb.fuse??2),max=bomb.maxFuse??2.45,age=Math.max(0,max-fuse),urgency=clamp(1-fuse/max);
 const pulse=reduced?0:Math.pow((1+Math.sin(time*(8+urgency*22)))/2,3)*(.055+urgency*.12);
 const bounce=reduced?0:Math.sin(clamp(age/.27)*Math.PI)*4;
 const land=reduced?0:Math.sin(clamp(age/.36)*TAU)*Math.exp(-age*10)*.2;
 oval(ctx,x,y+9,10+urgency,3,'#03251db3');
 ctx.save();ctx.translate(x,y+7-bounce);ctx.scale(1+pulse+land,1+pulse-land);ctx.translate(0,-7);
 const g=ctx.createRadialGradient(-4,-5,1,0,0,11);g.addColorStop(0,'#8995a5');g.addColorStop(.23,'#495769');g.addColorStop(.63,'#1b2332');g.addColorStop(1,'#090d19');
 oval(ctx,0,0,10,10,'#08101b');oval(ctx,0,-1,9.3,9.3,g);
 oval(ctx,-3.6,-5,3.1,1.9,'#bacbd585');
 ctx.strokeStyle='#060c18';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(1,-8);ctx.quadraticCurveTo(2,-12,5,-11);ctx.stroke();
 ctx.strokeStyle='#d6a455';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(1,-9);ctx.quadraticCurveTo(2,-14,5,-12);ctx.stroke();
 if(bomb.heat>.4){ctx.strokeStyle='#efaa4866';ctx.lineWidth=1;ctx.beginPath();ctx.arc(0,-1,8.5,.1,2.7);ctx.stroke();}
 const spark=reduced?1:1+Math.sin(time*35)*.35;
 oval(ctx,5,-12,2.8*spark,2.8*spark,'#ff7a2559');oval(ctx,5,-12,1.5,1.5,'#fff3aa');
 if(!reduced)for(let i=0;i<4;i++){const p=(time*3+i*.25)%1,a=i*2.4;ctx.globalAlpha=1-p;rect(ctx,5+Math.cos(a)*p*7,-12+Math.sin(a)*p*6-p*4,1.2,1.2,i%2?'#fffac0':'#ff9d3a');}
 ctx.restore();
}
export function drawFlames(ctx,game,{time=0,reduced=false}={}){
 if(!game.flames.length)return;
 const cells=new Map();for(const f of game.flames){const k=f.x+','+f.y;if(!cells.has(k)||cells.get(k).life<f.life)cells.set(k,f);}
 const has=(x,y)=>cells.has(x+','+y);
 ctx.save();
 // Each arm reaches its neighbour's cell boundary; the full blast is a continuous cross.
 for(const [width,color] of [[12.2,'#e44316'],[10.1,'#ff8222'],[7.4,'#ffd447'],[3.8,'#fff7ba']]){
  for(const f of cells.values()){
   const age=(f.max??.62)-f.life,ignition=reduced?1:clamp(age/.045),fade=clamp(f.life/.15);
   const x=OX+f.x*T+15,y=OY+f.y*T+15;
   const ripple=reduced?0:Math.sin(time*34+f.x*2+f.y*3)*1.05;
   const r=Math.max(.3,(width+ripple)*ignition*(.5+.5*fade));
   ctx.fillStyle=color;ctx.globalAlpha=fade;
   ctx.beginPath();ctx.arc(x,y,r,0,TAU);
   if(has(f.x-1,f.y))ctx.rect(x-15,y-r,15,r*2);
   if(has(f.x+1,f.y))ctx.rect(x,y-r,15,r*2);
   if(has(f.x,f.y-1))ctx.rect(x-r,y-15,r*2,15);
   if(has(f.x,f.y+1))ctx.rect(x-r,y,r*2,15);
   ctx.fill();
   if(!reduced&&width>7){for(let i=0;i<4;i++){const a=i*Math.PI/2+Math.sin(time*19+f.x)*.13,d=r*.67;oval(ctx,x+Math.cos(a)*d,y+Math.sin(a)*d,r*.43,r*.43,color);}}
  }
 }
 if(!reduced)for(const f of cells.values())for(let i=0;i<3;i++){
  const p=(time*2.8+f.x*.17+f.y*.31+i/3)%1;ctx.globalAlpha=clamp(f.life*4)*(1-p);
  rect(ctx,OX+f.x*T+5+((f.x*13+f.y*7+i*11)%20),OY+f.y*T+22-p*20,1.5,2.5,i%2?'#fffac8':'#ffae36');
 }
 ctx.restore();
}
export function drawRain(ctx,game,options={}){
 const {time=0,reduced=false}=options;ctx.save();
 for(const r of game.rain??[]){
  const x=OX+r.x*T+15,y=OY+r.y*T+15,p=clamp(1-r.delay/(r.maxDelay??1.2));
  const pulse=reduced?1:.75+.25*Math.sin(time*19);ctx.globalAlpha=.6+.4*p;
  oval(ctx,x,y,12,9,'#ff57282a');ctx.strokeStyle='#ffbd58';ctx.lineWidth=1.6;ctx.beginPath();ctx.ellipse(x,y,11,8,0,0,TAU);ctx.stroke();
  ctx.strokeStyle='#ff663e';ctx.lineWidth=2;ctx.globalAlpha=pulse;
  ctx.beginPath();ctx.moveTo(x-4,y-4);ctx.lineTo(x+4,y+4);ctx.moveTo(x+4,y-4);ctx.lineTo(x-4,y+4);ctx.stroke();
  ctx.globalAlpha=1;
  if(p>.48){const fall=clamp((p-.48)/.52),height=reduced?18:85*(1-fall*fall);const yy=y-height;
   if(!reduced){ctx.strokeStyle='#fff3a273';ctx.lineWidth=2;for(let i=-1;i<=1;i++){ctx.beginPath();ctx.moveTo(x+i*5,yy-13);ctx.lineTo(x+i*5,yy-22-fall*8);ctx.stroke();}}
   drawBomb(ctx,x,yy,{fuse:1.35,maxFuse:1.35,heat:.6},{...options,reduced:true});
  }
 }
 ctx.restore();
}
