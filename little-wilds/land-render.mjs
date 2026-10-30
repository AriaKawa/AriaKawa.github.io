import{PLOTS,FEATURES,owned,canReach,plotCost,PLOT_W,PLOT_H}from './land.mjs';
export function drawFeatures(ctx,image,x0,y0,size){
 if(!image)return;const cw=image.width/2,ch=image.height/2;
 for(const f of FEATURES){const x=(f.x-f.w/2)*48,y=(f.y-f.h/2)*48,w=f.w*48,h=f.h*48;if(x+w<x0||y+h<y0||x>x0+size||y>y0+size)continue;ctx.drawImage(image,f.type%2*cw,Math.floor(f.type/2)*ch,cw,ch,x,y,w,h);}
}
export function drawBoundaries(ctx,camera,s,width,height,style){
 const colors=style==='pixel'?['#d3e0bb','#607d68','#fff7df']:style==='soft'?['#d4ccac','#876b48','#fff0d6']:['#59664d','#b5bd8b','#f3ebcf'];
 ctx.save();
 for(const p of PLOTS){const a=camera.screen((p.x-.5)*48,(p.y-.5)*48),b=camera.screen((p.x+PLOT_W-.5)*48,(p.y+PLOT_H-.5)*48),w=b.x-a.x,h=b.y-a.y;if(b.x<0||b.y<0||a.x>width||a.y>height)continue;
  const unlocked=owned(s,p.id),reachable=canReach(s,p.id);
  if(!unlocked){ctx.globalAlpha=style==='original'?.58:.63;ctx.fillStyle=colors[0];ctx.fillRect(a.x,a.y,w,h);ctx.globalAlpha=1;}
  ctx.strokeStyle=colors[1];ctx.lineWidth=unlocked?2:1;ctx.setLineDash(unlocked?[]:[5,7]);ctx.strokeRect(a.x,a.y,w,h);ctx.setLineDash([]);
  // Corner posts make the plot edges readable without fencing in the view.
  for(const [x,y]of [[a.x,a.y],[b.x,a.y],[a.x,b.y],[b.x,b.y]]){ctx.fillStyle=colors[1];ctx.fillRect(x-3,y-6,6,12);}
  if(!unlocked&&w>100&&h>80){const x=a.x+w/2,y=a.y+h/2;ctx.font='bold 12px Trebuchet MS';ctx.textAlign='center';const label=p.name,tw=Math.max(ctx.measureText(label).width+28,136);if(x-tw/2<8||x+tw/2>width-8||y<90||y>height-180)continue;ctx.fillStyle=colors[2];ctx.globalAlpha=.94;ctx.beginPath();ctx.roundRect(x-tw/2,y-24,tw,48,8);ctx.fill();ctx.globalAlpha=1;ctx.fillStyle='#354935';ctx.fillText(label,x,y-4);ctx.font='11px Trebuchet MS';ctx.fillText(reachable?plotCost(s,p.id).toLocaleString()+' seeds · Land menu':'Unlock neighboring land',x,y+13);}
 }
 ctx.restore();
}
