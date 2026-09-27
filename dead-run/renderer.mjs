import {solidBox,NEAR_Z,FAR_Z,CAMERA_Z} from './geometry.mjs?v=slots-v8';
import {platformHeight} from './model.mjs?v=slots-v8';
import {POWERUPS} from './endless.mjs?v=slots-v8';
import {playerAnimation,zombieFrame} from './animation.mjs?v=slots-v8';

// Geometry controls movement and occlusion; all pictured materials, props,
// characters, weapons, shadows and effects come from the generated art pack.
export function createRenderer(canvas,images,reduced=false){
 const ctx=canvas.getContext('2d',{alpha:false});let W=720,H=420,run,state;
 const stats={buildings:0,clippedBuildings:0,buildingFaces:0,vehicles:0,zombies:0,playerFrame:0,playerPose:'run',rollFrame:-1,bloodBursts:0,fragments:0};
 const stimSprites=new Map(),gaitSprites=new Map();
 function resize(width,height){W=width;H=height;canvas.width=W;canvas.height=H;ctx.imageSmoothingEnabled=false;}
 function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.ceil(w),Math.ceil(h));}
 function poly(points,c){ctx.fillStyle=c;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(Math.round(x),Math.round(y)):ctx.moveTo(Math.round(x),Math.round(y)));ctx.closePath();ctx.fill();}
 function point(l,z,height=0){const s=24/(Math.max(NEAR_Z,z)+24),h=H*.32,g=H*.80,lw=W*(W<500?.22:.18);return{x:W/2+l*lw*s-run.x*W*.012*(1-s),y:h+(g-h)*s-height*s,s,lw};}
 function xy(l,z,height=0){const p=point(l,z,height);return[p.x,p.y];}
 function unit(){return Math.min(H*.075,W*.055);}
 function sprite(name,x,y,h,w,stim=false,gait=-1){let im=images[name];if(!im)return;const key=name+':'+gait;
  // A shared leg layer gives both feet equal airtime and keeps the stride
  // continuous across weapons. Mirroring only the legs preserves handedness.
  if(gait>=0){if(!gaitSprites.has(key)){const pose=document.createElement('canvas');pose.width=96;pose.height=112;const c=pose.getContext('2d');c.imageSmoothingEnabled=false;c.drawImage(im,0,0);c.clearRect(29,62,38,50);c.save();c.beginPath();c.rect(29,62,38,50);c.clip();if(gait>=4){c.translate(96,0);c.scale(-1,1);}c.drawImage(images['v6-gait-'+[3,5,0,5][gait%4]],0,0);c.restore();gaitSprites.set(key,pose);}im=gaitSprites.get(key);}
  if(stim){if(!stimSprites.has(key)){const tint=document.createElement('canvas');tint.width=im.width;tint.height=im.height;const c=tint.getContext('2d');c.drawImage(im,0,0);c.globalCompositeOperation='source-atop';c.fillStyle='rgba(114,240,84,.34)';c.fillRect(0,0,im.width,im.height);stimSprites.set(key,tint);}im=stimSprites.get(key);}
  w=w||h*im.width/im.height;ctx.drawImage(im,Math.round(x-w/2),Math.round(y-h),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)));}
 function texture(im,points,sx=0,sy=0,sw=im?.width,sh=im?.height){
  if(!im||sw<=0||sh<=0)return;const[a,b,c,d]=points;
  // Affine triangles share the same edges; each building side is split into
  // short depth strips to preserve perspective and a watertight silhouette.
  for(const second of [false,true]){
   const tri=second?[b,c,d]:[a,b,d];ctx.save();ctx.beginPath();tri.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.clip();
   const ax=(second?c[0]-d[0]:b[0]-a[0])/sw,ay=(second?c[1]-d[1]:b[1]-a[1])/sw,bx=(second?c[0]-b[0]:d[0]-a[0])/sh,by=(second?c[1]-b[1]:d[1]-a[1])/sh;
   const tx=second?c[0]-ax*sw-bx*sh:a[0],ty=second?c[1]-ay*sw-by*sh:a[1];
   ctx.transform(ax,ay,bx,by,tx,ty);ctx.drawImage(im,sx,sy,sw,sh,0,0,sw,sh);ctx.restore();
  }
 }
 function ground(a,b,far,near,name){const points=[xy(a,far),xy(b,far),xy(b,near),xy(a,near)];poly(points,name==='asphalt'?'#3c3c32':'#56533f');texture(images[name],points);}
 function shadow(x,y,w){sprite('shadow',x,y+w*.05,w*.13,w);}
 function building(side,z,index){
  const type=(index+(side>0?1:0))%4,facade=images['facade'+type];if(!facade)return;
  const inner=side*(2.48+(index%3)*.055),outer=inner+side*(.88+(index%3)*.22),depth=23+(index%2)*2;
  const height=H*(W<500?.34:.54)*[1.12,.83,1.02,.63][type];
  const box=solidBox({x0:Math.min(inner,outer),x1:Math.max(inner,outer),z0:z,z1:z+depth,top:height},{x:-run.x*W*.012/point(0,0).lw,y:H*.48,z:CAMERA_Z});if(!box)return;
  stats.buildings++;if(box.nearClipped)stats.clippedBuildings++;
  for(const face of box.faces){
   if(!face.visible)continue;stats.buildingFaces++;
   const p=face.points.map(([x,y,z])=>xy(x,z,y));poly(p,face.name==='roof'?'#414333':'#242b22');
   if(face.name==='front'||face.name==='back')texture(facade,p);
   else if(face.name==='roof')texture(images.roof,p);
   else if(face.name==='left'||face.name==='right'){
    const x=face.points[0][0];
    for(let far=box.far;far>box.near;far-=3){const near=Math.max(box.near,far-3),sx=(near-z)/depth*facade.width,sw=(far-near)/depth*facade.width;
     texture(facade,[xy(x,near,height),xy(x,far,height),xy(x,far),xy(x,near)],sx,0,sw,facade.height);
    }
    poly(p,side<0?'#14201944':'#111c164f');
   }
  }
 }
 function street(){
  rect(0,0,W,H,'#2d3529');if(images.city)ctx.drawImage(images.city,-W*.08-run.x*3,-H*.21,W*1.16,H*1.13);
  // One uninterrupted asphalt surface. Sparse world-anchored decals carry
  // the wear; there is no repeated square texture under every lane.
  poly([xy(-2.06,FAR_Z),xy(2.06,FAR_Z),xy(2.06,NEAR_Z),xy(-2.06,NEAR_Z)],'#353a32');
  for(let at=Math.floor((run.distance+FAR_Z)/8)*8;at>run.distance+NEAR_Z;at-=8){
   const far=at-run.distance,near=Math.max(NEAR_Z,far-8),n=Math.floor(at/8);
   for(const side of [-1,1])ground(side*2.06,side*2.62,far,near,'sidewalk');
   const killLane=run.killLaneAt(at-4);poly([xy(killLane-.47,far),xy(killLane+.47,far),xy(killLane+.47,near),xy(killLane-.47,near)],'#812b2224');
   // Road markings and UI meters are functional geometry over generated skins.
   if(n%2===0)for(const lane of [-1,0,1])poly([xy(lane-.013,far),xy(lane+.013,far),xy(lane+.013,Math.max(near,far-4)),xy(lane-.013,Math.max(near,far-4))],'#b6aa777d');
  }
  for(let at=Math.floor((run.distance+220)/37)*37;at>run.distance+NEAR_Z;at-=37){
   const n=Math.floor(at/37),lane=((n*17)%35)/10-1.7,z=at-run.distance,near=Math.max(NEAR_Z,z-3.5),name=['cracks','oil','debris'][n%3];
   ctx.globalAlpha=name==='debris'?.65:.45;texture(images[name],[xy(lane-.28,z),xy(lane+.28,z),xy(lane+.28,near),xy(lane-.28,near)]);ctx.globalAlpha=1;
  }
  for(let at=Math.floor((run.distance+FAR_Z)/29)*29;at>run.distance+NEAR_Z-26;at-=29){const index=Math.floor(at/29),z=at-run.distance;building(-1,z,index);building(1,z+11,index);}
  // Small roadside sprites share the buildings' perspective and world motion.
  for(let at=Math.floor((run.distance+200)/24)*24;at>run.distance-8;at-=24){const z=at-run.distance,n=Math.floor(at/24);for(const side of [-1,1]){const p=point(side*2.29,z);if(n%2===0)sprite('lamp',p.x,p.y,Math.min(H*.35,W*.23)*p.s);else if(n%3===0){const h=32*p.s;sprite('barrel',p.x,p.y,h);if(!reduced){ctx.globalAlpha=.7;sprite('fire',p.x,p.y-h*.6,h*(.5+Math.sin(run.time*9+n)*.05));ctx.globalAlpha=1;}}}}
  if(run.sector%3===1)rect(0,0,W,H,'#47290913');if(run.sector%3===2)rect(0,0,W,H,'#183b2b1e');
 }
 function vehicleSlice(p,nearAt,farAt){
  const near=nearAt-run.distance,far=farAt-run.distance,left=p.lane-.44,right=p.lane+.44,h0=platformHeight(p,nearAt)*unit(),h1=platformHeight(p,farAt)*unit(),descent=p.exitRamp&&nearAt>=p.end-p.exitRamp,ramp=nearAt<p.at+p.ramp||descent,bodyEnd=p.end-(p.exitRamp||0),bodyLength=bodyEnd-p.at-p.ramp;
  const sideL=[xy(left,near,h0),xy(left,far,h1),xy(left,far),xy(left,near)],sideR=[xy(right,far,h1),xy(right,near,h0),xy(right,near),xy(right,far)];
  if(p.lane<0){poly(sideR,'#22281f');if(!ramp)texture(images[p.kind+'-side'],sideR,(bodyEnd-farAt)/bodyLength*192,0,(farAt-nearAt)/bodyLength*192,128);}
  else{poly(sideL,'#22281f');if(!ramp)texture(images[p.kind+'-side'],sideL,(nearAt-p.at-p.ramp)/bodyLength*192,0,(farAt-nearAt)/bodyLength*192,128);}
  const top=[xy(left,far,h1),xy(right,far,h1),xy(right,near,h0),xy(left,near,h0)];poly(top,ramp?'#30372b':p.kind==='bus'?'#94824c':'#414738');
  if(ramp){const im=images.ramp,length=descent?p.exitRamp:p.ramp,offset=descent?p.end-farAt:p.at+p.ramp-farAt;texture(im,top,0,offset/length*im.height,im.width,(farAt-nearAt)/length*im.height);}
  else{const im=images[p.kind+'-roof'];texture(im,top,0,(bodyEnd-farAt)/bodyLength*im.height,im.width,(farAt-nearAt)/bodyLength*im.height);}
  poly(top,'#202a252e');
  // Only the actual rear wall is drawn, never artificial faces between slices.
  if(!ramp&&Math.abs(nearAt-(p.at+p.ramp))<.01){const back=[xy(left,near,h0),xy(right,near,h0),xy(right,near),xy(left,near)];texture(images[p.kind+'-back'],back);}
 }
 function drawables(){
  const draw=run.entities.map(e=>({at:e.at,draw:()=>entity(e)}));
  for(const p of run.platforms){if(p.end<run.distance+NEAR_Z||p.at>run.distance+FAR_Z)continue;stats.vehicles++;
   const start=Math.max(p.at,run.distance+NEAR_Z),end=Math.min(p.end,run.distance+FAR_Z),cuts=[start,end];
   for(let at=start+3;at<end;at+=3)cuts.push(at);
   for(const at of [p.at+p.ramp,p.end-(p.exitRamp||0),run.distance])if(at>start&&at<end)cuts.push(at);
   cuts.sort((a,b)=>a-b);for(let i=1;i<cuts.length;i++){const a=cuts[i-1],b=cuts[i];if(b-a>.001)draw.push({at:(a+b)/2,draw:()=>vehicleSlice(p,a,b)});}
  }
  for(const e of state.effects)if(e.type==='burst'||e.type==='stain')draw.push({at:e.at,draw:()=>bloodEffect(e)});
  for(const e of state.effects)if(e.type==='crumble'||e.type==='dust')draw.push({at:e.at,draw:()=>crumbleEffect(e)});
  draw.push({at:run.distance,draw:player});return draw.sort((a,b)=>b.at-a.at);
 }
 function entity(e){
  const z=e.at-run.distance;if(z<-6||z>225)return;const p=point(e.lane,z,(e.elevation||0)*unit()),base=Math.min(H*.225,W*.15)*p.s;shadow(p.x,p.y,base*.75);
  if(e.hp>0)stats.zombies++;
  if(e.hp>0){const name=`v6-${e.kind}-${zombieFrame(e.kind,run.time,e.id)}`,h=base*(e.kind==='brute'?1.32:1)*(e.elite?1.18:1),sway=0;
   if(e.elite){ctx.save();ctx.shadowColor='#e68b39';ctx.shadowBlur=4*p.s;sprite(name,p.x+sway,p.y,h);ctx.restore();sprite('control-skull',p.x,p.y-h-10*p.s,9*p.s);}else sprite(name,p.x+sway,p.y,h);
   if(e.hit>0){ctx.globalAlpha=.8;sprite('impact',p.x+sway,p.y-h*.42,h*.33);ctx.globalAlpha=1;}
   if(e.hp<e.maxHp||e.kind==='brute'){const w=base*.58,ratio=Math.max(0,e.hp/e.maxHp);sprite('panel-hud',p.x,p.y-h-3*p.s,5*p.s,w);rect(p.x-w*.43,p.y-h-6.5*p.s,w*.86*ratio,1.4*p.s,e.kind==='brute'?'#c59053':'#a8b379');}
   if(e.chilled>0){ctx.save();ctx.globalAlpha=.6;ctx.strokeStyle='#a6e7f5';ctx.lineWidth=2*p.s;ctx.strokeRect(p.x-base*.26,p.y-h*.75,base*.52,h*.7);ctx.restore();}
   if(e.burning>0&&run.burn){ctx.globalAlpha=.8;sprite('fire',p.x,p.y,base*(.6+Math.sin(run.time*14)*.06));ctx.globalAlpha=1;}
  }
  if(e.kind==='car')sprite('car',p.x,p.y,base*1.12,base*1.38);
  if(e.kind==='barrier')sprite('barrier',p.x,p.y,base*.48,base*1.25);
  if(e.kind==='gate')sprite('gate',p.x,p.y,base*1.32,base*1.36);
  if(e.kind==='spikes')sprite('spikes',p.x,p.y,base*.27,base*1.25);
  if(e.kind==='barrels')sprite('barrels',p.x,p.y,base*.64,base*1.15);
  if(e.kind==='supply')sprite('supply',p.x,p.y+(reduced?0:Math.sin(run.time*4+e.id)*2*p.s),base*.44);
  if(e.kind==='weaponcrate'){ctx.save();ctx.shadowColor='#f2c36d';ctx.shadowBlur=10*p.s;sprite('weaponcrate',p.x,p.y+(reduced?0:Math.sin(run.time*4)*2*p.s),base*.6,base*.9);ctx.restore();}
  if(e.kind==='powerup'){
   const size=base*.66,bob=reduced?0:Math.sin(run.time*4+e.id)*3*p.s;ctx.save();ctx.shadowColor=POWERUPS[e.powerup].color;ctx.shadowBlur=9*p.s;
   sprite('panel-rare',p.x,p.y+3*p.s,size*.9,size*1.1);sprite(e.powerup,p.x,p.y-size*.08+bob,size*.7);ctx.restore();
  }
 }
 function player(){
  const p=point(run.x,0),base=Math.min(H*.235,W*.155),lift=run.elevation*unit();
  shadow(p.x,p.y-run.supportHeight*unit()+3,base*.75);
  if(run.grounded&&state.mode==='playing'&&!reduced){ctx.globalAlpha=.18;sprite('smoke',p.x-5,p.y-lift+6,base*.3);ctx.globalAlpha=1;}
  if(run.invincible>0&&Math.floor(run.time*15)%2===0)ctx.globalAlpha=.45;
  const animation=playerAnimation(run),stim=run.powers.stim>0;
  stats.playerFrame=animation.frame;stats.playerPose=animation.pose;stats.rollFrame=animation.pose==='roll'?animation.frame:-1;
  // Locomotion owns the legs. Aiming changes the upper-body sheet while
  // retaining its stride phase; flight follows velocity through a real leap.
  const recoil=reduced||animation.pose==='jump'?0:animation.pose==='swap'?Math.sin(animation.swapPhase*Math.PI)*base*.045:run.firePose/.12*base*.012;
  ctx.save();if(stim){ctx.shadowColor='#81ed59';ctx.shadowBlur=reduced?4:9;}
  sprite(animation.asset,p.x,p.y-lift+base*.036+recoil,base*(animation.asset.startsWith('v7-')?1.28:1.12),undefined,stim,!animation.asset.startsWith('v7-')&&['run','aim'].includes(animation.gaitPose||animation.pose)?animation.frame:-1);ctx.restore();
  if(run.activeBoard&&run.grounded&&!reduced){ctx.globalAlpha=.4;sprite('smoke',p.x,p.y-lift+base*.1,base*.27,base*.55);}
  ctx.globalAlpha=1;
 }
 function crumbleEffect(e){
  const z=e.at-run.distance;if(z<-6||z>225)return;const p=point(e.lane,z,(e.elevation||0)*unit());
  if(e.type==='dust'){ctx.globalAlpha=Math.min(.4,e.life);sprite('smoke',p.x,p.y,Math.min(H*.2,W*.14)*p.s*(1.7-e.life),Math.min(H*.28,W*.2)*p.s);ctx.globalAlpha=1;return;}
  const im=images[e.asset];if(!im)return;stats.fragments++;
  const size=e.size*p.s,cw=im.width/3,ch=im.height/3;
  ctx.save();ctx.globalAlpha=Math.min(1,e.life*3);ctx.translate(p.x+e.dx*p.s,p.y-e.dy*p.s);ctx.rotate(e.angle);
  ctx.drawImage(im,e.cell%3*cw,Math.floor(e.cell/3)*ch,cw,ch,-size/2,-size/2,size,size);ctx.restore();
 }
 function bloodEffect(e){
  const z=e.at-run.distance;if(z<-6||z>225)return;
  const floor=(e.elevation||0)*unit(),p=point(e.lane,z,floor),base=Math.min(H*.225,W*.15)*p.s;
  if(e.type==='burst'){stats.bloodBursts++;const age=1-e.life/.55,frame=Math.min(3,Math.floor(age*4)),h=base*(e.brute?1.55:1.12);ctx.globalAlpha=Math.min(1,e.life*6);sprite('blood'+frame,p.x,p.y-base*.12,h);ctx.globalAlpha=1;}
  else{ctx.globalAlpha=Math.min(.7,e.life*.3);texture(images[e.variant?'blood-pool':'blood-splatter'],[xy(e.lane-.28,z+2,floor),xy(e.lane+.28,z+2,floor),xy(e.lane+.28,Math.max(NEAR_Z,z-2),floor),xy(e.lane-.28,Math.max(NEAR_Z,z-2),floor)]);ctx.globalAlpha=1;}
 }
 function effects(){
  const base=Math.min(H*.235,W*.155),a=point(run.x,0),mx=a.x+base*(run.activeMinigun?.2:.13),my=a.y-run.elevation*unit()-base*(run.activeMinigun?.96:.87);
  for(const e of state.effects){
   if(e.type==='wildfire'||e.type==='thorns'){const p=point(e.lane,e.z,(e.elevation||0)*unit());ctx.globalAlpha=Math.min(1,e.life*4);sprite(e.type==='wildfire'?'blast1':'spikes',p.x,p.y,base*p.s*.8,base*p.s*1.4);ctx.globalAlpha=1;}
   if(e.type==='shot'){const shotX=e.weapon==='glocks'?a.x+base*(e.hand?-.22:.22):mx;const b=point(e.lane,e.z,(e.elevation||0)*unit()+Math.min(H*.14,W*.09)),im=images.bullet,spread=e.weapon==='shotgun'?3:1;
    for(let pellet=0;pellet<spread;pellet++){const dx=b.x-shotX+(pellet-(spread-1)/2)*5,dy=b.y-my,len=Math.hypot(dx,dy);ctx.save();ctx.globalAlpha=pellet===0?.8:.4;ctx.translate(shotX,my);ctx.rotate(Math.atan2(dy,dx));if(im)ctx.drawImage(im,0,-.7,len,1.4);ctx.restore();}
    sprite('muzzle',shotX,my+5,e.weapon==='minigun'?24:e.weapon==='shotgun'?22:e.critical?18:12);
   }
   if(e.type==='rearShot'){sprite('muzzle',a.x+base*.3,a.y-base*.4,11);}
   if(e.type==='blood'){const z=e.at-run.distance;if(z<-6)continue;const p=point(e.lane,z,(e.elevation||0)*unit());ctx.globalAlpha=Math.min(1,e.life*4);sprite('blood-drops',p.x+e.dx*p.s,p.y-e.dy*p.s,Math.max(3,8*p.s));ctx.globalAlpha=1;}
   if(e.type==='xpMote'&&!reduced){const p=point(e.lane,e.at-run.distance,(e.elevation||0)*unit()+45),t=1-e.life/.8,k=t*t,endY=H-(W<500?100:30);sprite('blood-drops',p.x+(W/2-p.x)*k,p.y+(endY-p.y)*k-Math.sin(t*Math.PI)*25,8);}
   if(e.type==='blast'){const p=point(e.lane,30),age=1-e.life/.48;ctx.globalAlpha=Math.min(1,e.life*4);sprite(age<.35?'blast0':'blast1',p.x,p.y+8,50+age*45);ctx.globalAlpha=1;}
  }
 }
 function render(current,frameState){run=current;state=frameState;stats.buildings=stats.clippedBuildings=stats.buildingFaces=0;ctx.save();if(state.shake>0&&!reduced)ctx.translate((Math.random()-.5)*state.shake,(Math.random()-.5)*state.shake);
  stats.vehicles=stats.zombies=stats.bloodBursts=stats.fragments=0;
  if(state.mode==='title'||state.mode==='loading'){rect(0,0,W,H,'#1c261c');if(images.city)ctx.drawImage(images.city,0,0,W,H);ctx.restore();return;}
  street();for(const item of drawables())item.draw();effects();ctx.restore();if(state.flash>0)rect(0,0,W,H,`rgba(153,44,25,${state.flash*.2})`);
 }
 return{resize,render,stats};
}
