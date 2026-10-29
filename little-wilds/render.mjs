import{W,H}from './core.mjs';
import{FRAMES}from './spirit-frames.mjs';
import{fallPose,isFalling}from './carry.mjs';
import{createCamera}from './camera.mjs';
import{createGrassMotion}from './grass-motion.mjs';
import{createMapCache}from './map-cache.mjs';
export function createRenderer(canvas){
 const motion=createGrassMotion(),ctx=canvas.getContext('2d'),imgs={},camera=createCamera(),cache=createMapCache(imgs),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let vw=innerWidth,vh=innerHeight,scale=1,lastLand=null,particles=[],selected=0,selectedUntil=0,loaded=false,frames=FRAMES,unit=313.5;
 const px=x=>camera.screen(x*48,0).x,py=y=>camera.screen(0,y*48).y;
 function resize(){vw=innerWidth;vh=innerHeight;camera.width=vw;camera.height=vh;canvas.width=vw;canvas.height=vh;ctx.imageSmoothingEnabled=false;}
 function indexAt(x,y){const p=camera.world(x,y),xx=Math.round(p.x/48),yy=Math.round(p.y/48);return xx<0||xx>=W||yy<0||yy>=H?-1:yy*W+xx;}
 function sprite(name,index,x,y,size,alpha=1,squash=1){const im=imgs[name];ctx.globalAlpha=alpha;
 if(frames[name]){const[sx,sy,sw,sh]=frames[name][index],ratio=size/unit,w=sw*ratio/squash,h=sh*ratio*squash;ctx.drawImage(im,sx,sy,sw,sh,Math.round(x-w/2),Math.round(y-h),w,h);}else{const cw=im.width/4,ch=im.height/4;ctx.drawImage(im,index%4*cw,Math.floor(index/4)*ch,cw,ch,Math.round(x-size/2),Math.round(y-size),size,size);}ctx.globalAlpha=1;}
 function heldPose(carry,time){const a=carry.spirit,size=Math.max(45,(a.type===3?76:66)*camera.zoom),frame=a.type*4+(reduced?0:Math.floor(time/110)%4);return{size,frame,height:frames.struggle[frame][3]*size/unit};}
 function dropAt(carry){const pose=heldPose(carry,performance.now()),feet=carry.y+6+pose.height,world=camera.world(carry.x,feet+40*camera.zoom);world.x=Math.max(0,Math.min((W-1)*48,world.x));world.y=Math.max(0,Math.min((H-1)*48,world.y));return{world,height:Math.max(0,(camera.screen(world.x,world.y).y-feet)/camera.zoom)};}
 function grow(i,p,type){if(p>0)cache.invalidate(i);if(!reduced){particles.push({x:i%W,y:Math.floor(i/W),born:performance.now(),type});if(particles.length>80)particles.shift();}}
 function hitSpirit(s,x,y){for(let i=s.spirits.length-1;i>=0;i--){const a=s.spirits[i],size=(a.type===3?71:61)*camera.zoom;if(Math.abs(x-px(a.x))<Math.max(13,size*.36)&&y>py(a.y)-size*.86&&y<py(a.y)+5)return a;}return null;}
 function patch(tiles,x,y,w,h,base=false,shift=0){for(const tile of tiles){const left=Math.max(x,tile.x),top=Math.max(y,tile.y),right=Math.min(x+w,tile.x+tile.size),bottom=Math.min(y+h,tile.y+tile.size);if(right<=left||bottom<=top)continue;const p=camera.screen(left,top),r=tile.res,pad=base?0:tile.pad;ctx.drawImage(base?tile.base:tile.grass,(left-tile.x+pad-shift)*r,(top-tile.y+pad)*r,(right-left)*r,(bottom-top)*r,p.x,p.y,(right-left)*scale,(bottom-top)*scale);}}
 function draw(s,time,carry){if(!loaded)return;scale=camera.zoom;if(lastLand!==s.land){cache.clear();lastLand=s.land;}motion.update(s.spirits,time,carry?.spirit,reduced||s.paused);const t=reduced||s.paused?0:time/1000,tiles=cache.visible(s,camera,vw,vh);
 ctx.drawImage(imgs.dirt,0,0,vw,vh);
 for(const tile of tiles){const p=camera.screen(tile.x,tile.y),z=tile.size*scale,x=Math.round(p.x),y=Math.round(p.y),w=Math.round(p.x+z)-x,h=Math.round(p.y+z)-y;ctx.drawImage(tile.base,x,y,w,h);ctx.drawImage(tile.grass,tile.pad*tile.res,tile.pad*tile.res,256,256,x,y,w,h);}
 for(const c of motion.contacts(time)){const p=camera.screen(c.x,c.y);if(p.x< -24||p.y< -24||p.x>vw||p.y>vh)continue;patch(tiles,c.x,c.y,18,18,true);patch(tiles,c.x,c.y,18,18,false,c.bend*5);}
 for(const a of [...s.spirits].sort((a,b)=>a.y-b.y)){if(a===carry?.spirit)continue;const x=px(a.x),y=py(a.y);if(x< -100||x>vw+100||y< -100||y>vh+100)continue;const landing=isFalling(a),pose=fallPose(a),walking=a.work<=.01,frame=s.paused||reduced||landing?0:walking?[0,2,0,1][Math.floor(t*4)%4]:3,bob=!landing&&walking&&!s.paused&&!reduced?-Math.abs(Math.sin(t*6))*2*scale:0;sprite('spirits',a.type*4+frame,x,y-pose.height*scale+bob,(a.type===3?71:61)*scale,1,pose.squash);if(pose.height<4)patch(tiles,a.x*48-20,a.y*48-5,40,10);}
 for(const p of particles){const age=(time-p.born)/1000;if(age<1.3)sprite('plants',p.type===2?13:12,px(p.x),py(p.y)-age*35*scale,18*scale,1-age/1.3);}particles=particles.filter(p=>time-p.born<1300);
 if(carry?.spirit){const pose=heldPose(carry,time),wiggle=reduced?0:Math.sin(time*.022)*.16;ctx.save();ctx.translate(carry.x,carry.y+6);ctx.rotate(wiggle);sprite('struggle',pose.frame,0,pose.height,pose.size);ctx.restore();}}
 resize();addEventListener('resize',resize);return{draw,grow,indexAt,hitSpirit,dropAt,worldAt:(x,y)=>camera.world(x,y),pan(dx,dy){camera.pan(dx,dy);},zoom(f,x=vw/2,y=vh/2){camera.zoomAt(f,x,y);},select(type){selected=type;selectedUntil=performance.now()+2500;},clear(){particles=[];motion.clear();cache.clear();},async load(){const {loadStyle}=await import('./styles.mjs');this.setArt(await loadStyle('original'));},setArt(bundle){Object.assign(imgs,bundle.images);frames=bundle.frames;unit=bundle.unit;cache.clear();cache.init();particles=[];motion.clear();loaded=true;}};

}


