// Articulated, resolution-independent arcade cast. Coordinates use a 100-unit rig.
const TAU=Math.PI*2;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const mix=(a,b,t)=>a+(b-a)*t;

export function animationPose(state={}) {
  const time=Number(state.time)||0, reduced=Boolean(state.reduced);
  const action=state.action||'idle', elapsed=Math.max(0,Number(state.actionTime)||0);
  const moving=state.moving??(action==='walk'||state.walk===true);
  const phase=typeof state.walk==='number'?state.walk:time*12.5, stride=moving?(reduced?.32:1):0;
  const wave=Math.sin(phase)*stride, breathe=reduced?0:Math.sin(time*2.5);
  const pose={leftLeg:wave*.52,rightLeg:-wave*.52,leftArm:-wave*.55,rightArm:wave*.55,
    bob:moving?-Math.abs(Math.cos(phase))*2.3*stride:breathe*.65,
    squash:1+(moving?Math.cos(phase*2)*.018:breathe*.012),lean:wave*.025,
    crouch:0,reach:0,blink:!reduced&&((time%4.7)>4.52),mouth:'smile',spin:0,alpha:clamp(state.alpha??1)};
  if(action==='charge') {
    const charge=clamp(Number(state.charge)||0), tremble=reduced?0:Math.sin(time*39)*charge;
    pose.leftArm=-.65;pose.rightArm=.65;pose.crouch=4+charge*4;
    pose.squash=.97-charge*.04;pose.lean=tremble*.018;pose.bob=tremble*.45;pose.mouth='tense';
  } else if(action==='plant') {
    const bend=Math.sin(clamp(elapsed/.32)*Math.PI);
    pose.crouch=12*bend;pose.squash=1-.1*bend;pose.reach=bend;
    pose.rightArm=-.5-bend*.7;pose.leftArm=.4*bend;pose.lean=.14*bend;
  } else if(action==='hit') {
    const kick=1-clamp(elapsed/.48);
    pose.lean=-.24*kick;pose.leftArm=1.3*kick;pose.rightArm=-1.3*kick;
    pose.bob=-5*Math.sin(kick*Math.PI);pose.squash=1+.16*kick;pose.mouth='open';
  } else if(action==='victory') {
    const hop=reduced?0:Math.max(0,Math.sin(time*7));
    pose.bob=-hop*10;pose.leftArm=2.25;pose.rightArm=-2.25;
    pose.leftLeg=-.14-hop*.15;pose.rightLeg=.14+hop*.15;pose.mouth='open';pose.lean=reduced?0:Math.sin(time*5)*.07;
  } else if(action==='death') {
    const fall=clamp(elapsed/.55);
    pose.crouch=fall*39;pose.squash=mix(1,.24,fall);pose.lean=-fall*.15;
    pose.leftArm=-1.4*fall;pose.rightArm=1.4*fall;pose.mouth='open';pose.blink=true;
  }
  return pose;
}

function gradient(ctx,x,y,r,light,base,dark) {
  const g=ctx.createRadialGradient(x-r*.34,y-r*.45,r*.06,x,y,r);
  g.addColorStop(0,light);g.addColorStop(.58,base);g.addColorStop(1,dark);return g;
}
function ellipse(ctx,x,y,rx,ry,fill,stroke='#203040',width=1.8) {
  ctx.beginPath();ctx.ellipse(x,y,Math.max(.01,rx),Math.max(.01,ry),0,0,TAU);
  ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.stroke();}
}
function path(ctx,points,fill,stroke='#203040',width=1.8) {
  ctx.beginPath();points(ctx);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.stroke();}
}
function line(ctx,x,y,x2,y2,color,width=2) {
  ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x2,y2);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.stroke();
}
function limb(ctx,x,y,angle,length,width,colors,shoe=false) {
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);
  line(ctx,0,0,0,length,'#243140',width+2.4);
  line(ctx,0,0,0,length,colors[1],width);
  line(ctx,-width*.17,1,-width*.17,length-1,colors[0],width*.36);
  if(shoe) {
    ellipse(ctx,1,length+1,width*.86,width*.47,'#ced9e1');
    ellipse(ctx,0,length-1,width*.88,width*.5,gradient(ctx,0,length-2,width,colors[2]||'#fff','#e7eff4','#a5b7c8'));
    line(ctx,-width*.35,length-2,width*.32,length-2,'#fff',1.7);
  }
  ctx.restore();
}
function glove(ctx,x,y,size=6) {
  ellipse(ctx,x,y,size,size*.91,gradient(ctx,x,y,size,'#fff','#edf3f7','#a9bccc'));
  ellipse(ctx,x+size*.64,y-1,size*.34,size*.44,'#f5fafc','#526677',1);
  line(ctx,x-2,y-2,x+1,y-2,'#b8c9d3',.9);
}

function face(ctx,x,y,scale,p,back,side,beard=false) {
  if(back)return;
  ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
  const shift=side*3;
  if(beard) path(ctx,c=>{c.moveTo(-14,-1);c.quadraticCurveTo(-17,16,0,19);c.quadraticCurveTo(16,16,15,-2);c.lineTo(11,7);c.quadraticCurveTo(0,2,-11,7);c.closePath();},'#75402a','#492c22',1.2);
  const eyeXs=side?[side*6]:[-6,6];
  for(const ex of eyeXs) {
    if(p.blink)line(ctx,ex-2+shift,-3,ex+2+shift,-3,'#252c38',1.8);
    else {ellipse(ctx,ex+shift,-4,2.3,4.6,'#202937',null);ellipse(ctx,ex+shift-.5,-5.5,.7,1.2,'#fff',null);}
    line(ctx,ex-2+shift,-11,ex+2+shift,-11.6,'#433124',1.5);
  }
  if(side)ellipse(ctx,side*13,-.5,3.4,3,'#edaf7b','#875a3d',.8);
  if(p.mouth==='open')ellipse(ctx,shift,8,4.1,4.8,'#472d2d',null);
  else if(p.mouth==='tense')line(ctx,-3+shift,8,3+shift,8,'#48322c',1.8);
  else {ctx.beginPath();ctx.moveTo(-4+shift,6);ctx.quadraticCurveTo(shift,11,4+shift,6);ctx.strokeStyle='#49332c';ctx.lineWidth=1.6;ctx.stroke();}
  ctx.restore();
}

function peanut(ctx,p,side,back,time,reduced) {
  const legColor=['#ffe7ae','#b17d3d','#fff'];
  limb(ctx,-9,-24,p.leftLeg,20,8,legColor,true);limb(ctx,9,-24,p.rightLeg,20,8,legColor,true);
  const arm=(sign,angle)=>{
    ctx.save();ctx.translate(sign*24,-49);ctx.rotate(angle);
    limb(ctx,0,0,sign*.17,18,5,['#f5c977','#c7914d']);glove(ctx,sign*3,20+p.reach*7,6);ctx.restore();
  };
  arm(-1,p.leftArm);arm(1,p.rightArm);
  const shell=gradient(ctx,-3,-53,39,'#ffe6a6','#dfa64f','#966029');
  path(ctx,c=>{c.moveTo(0,-88);c.bezierCurveTo(-22,-89,-28,-70,-19,-56);c.bezierCurveTo(-36,-39,-20,-17,0,-18);c.bezierCurveTo(22,-17,34,-39,19,-56);c.bezierCurveTo(29,-72,20,-88,0,-88);},shell,'#684421',2.2);
  // Shallow shell grooves follow the volume; a few are legible at game size.
  for(const sign of [-1,1]) {
    ctx.beginPath();ctx.moveTo(sign*12,-79);ctx.bezierCurveTo(sign*18,-66,sign*6,-55,sign*16,-43);ctx.quadraticCurveTo(sign*20,-31,sign*11,-24);ctx.strokeStyle='#bc803b';ctx.lineWidth=1.2;ctx.stroke();
    for(const yy of [-72,-38,-30])line(ctx,sign*12,yy,sign*19,yy+3,'#c38b44',1.1);
  }
  // Front-facing arms layer over the shell so bracing and reaching stay visible.
  if(!back){arm(-1,p.leftArm);arm(1,p.rightArm);}
  if(!back)face(ctx,side*3,-60,1,p,false,side);
  else line(ctx,0,-79,0,-27,'#bc823a',1.2);
  // Bright segmented cap and physically turning propeller.
  ellipse(ctx,0,-86,19,7,'#36b4db','#244958',1.7);
  path(ctx,c=>{c.moveTo(-18,-87);c.quadraticCurveTo(-15,-101,0,-99);c.lineTo(0,-86);c.closePath();},'#ed6253','#624437',1.3);
  path(ctx,c=>{c.moveTo(0,-99);c.quadraticCurveTo(14,-100,18,-87);c.lineTo(0,-86);c.closePath();},'#f5cf4f','#624437',1.3);
  line(ctx,0,-100,0,-106,'#714b2a',2.5);
  const span=reduced?15:5+Math.abs(Math.cos(time*16))*11;
  ellipse(ctx,-span*.46,-106,span*.61,2.4,'#50d9ec','#29647b',1);
  ellipse(ctx,span*.46,-106,span*.61,2.4,'#f35c58','#844132',1);
  ellipse(ctx,0,-106,2.2,2.2,'#ffe78c',null);
}

function human(ctx,p,side,back,type,time) {
  const hutch=type==='hutch',wide=hutch?29:17;
  const skin=['#ffe0b5','#eab183','#ad7251'];
  limb(ctx,-(hutch?12:8),-25,p.leftLeg,20,hutch?13:9,['#8ba8be','#426984','#fff'],true);
  limb(ctx,hutch?12:8,-25,p.rightLeg,20,hutch?13:9,['#8ba8be','#426984','#fff'],true);
  const arm=(sign,angle,behind=false)=>{
    ctx.save();ctx.translate(sign*(wide+1),-55);ctx.rotate(angle+sign*.07);
    limb(ctx,0,0,sign*.17,11,hutch?12:9,hutch?['#565b60','#222932']:['#65c9ff','#2679b5']);
    limb(ctx,sign*2,10,sign*.1,11+p.reach*7,hutch?10:6,skin);
    if(hutch&&sign===-1&&!behind){line(ctx,0,11,4,17,'#547071',1.7);line(ctx,4,12,0,20,'#547071',1.2);line(ctx,1,16,5,20,'#547071',1.3);}
    ellipse(ctx,sign*3,23+p.reach*7,hutch?5.6:4.7,5.6,gradient(ctx,sign*3,23,7,...skin),'#74523d',1.3);ctx.restore();
  };
  // Far arm is occluded by body when turned; near arm remains articulated.
  if(side)arm(-side,-side===-1?p.leftArm:p.rightArm,true);
  else {arm(-1,p.leftArm);arm(1,p.rightArm);}
  if(hutch) {
    path(ctx,c=>{c.moveTo(-18,-61);c.quadraticCurveTo(-32,-57,-34,-34);c.quadraticCurveTo(-35,-17,0,-17);c.quadraticCurveTo(35,-17,34,-34);c.quadraticCurveTo(32,-58,18,-61);c.closePath();},gradient(ctx,-6,-42,42,'#63676b','#303438','#141b24'),'#17222c',2);
    // Curved belly highlight makes the large silhouette read even from behind.
    ctx.beginPath();ctx.moveTo(-25,-30);ctx.quadraticCurveTo(0,-20,26,-30);ctx.strokeStyle='#555b60';ctx.lineWidth=1.2;ctx.stroke();
    if(!back){path(ctx,c=>{c.moveTo(-9,-61);c.lineTo(-2,-48);c.lineTo(1,-57);c.lineTo(6,-48);c.lineTo(12,-61);},'#202832','#111923',1);ellipse(ctx,1,-44,1,1,'#a5abae',null);}
  } else {
    path(ctx,c=>{c.moveTo(-12,-63);c.quadraticCurveTo(-22,-57,-19,-25);c.quadraticCurveTo(0,-18,19,-25);c.quadraticCurveTo(22,-57,12,-63);c.closePath();},gradient(ctx,-5,-43,31,'#83dcff','#328ac7','#215083'),'#233d57',1.8);
    if(!back){line(ctx,-5,-60,-5,-43,'#e0f8ff',1.5);line(ctx,5,-60,5,-43,'#e0f8ff',1.5);path(ctx,c=>{c.moveTo(-10,-36);c.quadraticCurveTo(0,-31,10,-36);c.lineTo(8,-28);c.lineTo(-8,-28);c.closePath();},'#2876ae','#24628e',1);}
    else path(ctx,c=>{c.moveTo(-12,-62);c.quadraticCurveTo(0,-40,12,-62);c.quadraticCurveTo(0,-72,-12,-62);},'#439bd1','#2b638b',1.3);
  }
  if(side)arm(side,side===-1?p.leftArm:p.rightArm);
  else if(!back){arm(-1,p.leftArm);arm(1,p.rightArm);}
  const hx=side*3,hy=hutch?-78:-79,headW=hutch?21:19;
  ellipse(ctx,hx-headW,hy,4.2,6,skin[1],'#976649',1);ellipse(ctx,hx+headW,hy,4.2,6,skin[1],'#976649',1);
  ellipse(ctx,hx,hy,headW,hutch?22:23,gradient(ctx,hx-3,hy,27,...skin),'#855a43',1.6);
  face(ctx,hx+side*3,hy+3,hutch?1.04:1,p,back,side,hutch);
  if(hutch) {
    path(ctx,c=>{c.moveTo(hx-21,hy-6);c.bezierCurveTo(hx-23,hy-32,hx+23,hy-32,hx+21,hy-6);c.quadraticCurveTo(hx,hy-15,hx-21,hy-6);},gradient(ctx,hx-4,hy-20,24,'#59646b','#29343c','#111d27'),'#1d2b32',1.7);
    if(back){path(ctx,c=>{c.moveTo(hx-10,hy-8);c.quadraticCurveTo(hx,hy-21,hx+10,hy-8);c.closePath();},'#c08a61','#192932',1.2);line(ctx,hx-10,hy-7,hx+10,hy-7,'#6d7880',3);}
    else {line(ctx,hx-15,hy-13,hx+15,hy-13,'#71808a',1.2);}
    ellipse(ctx,hx-side*12,hy-19,side?12:8,3,'#1b2934','#11212c',1);
  } else {
    path(ctx,c=>{c.moveTo(hx-20,hy-3);c.lineTo(hx-23,hy-21);c.lineTo(hx-14,hy-19);c.lineTo(hx-13,hy-32);c.lineTo(hx-4,hy-26);c.lineTo(hx+4,hy-38);c.lineTo(hx+8,hy-27);c.lineTo(hx+22,hy-31);c.lineTo(hx+17,hy-21);c.lineTo(hx+26,hy-18);c.lineTo(hx+19,hy-4);c.lineTo(hx+14,hy-13);c.lineTo(hx+3,hy-12);c.lineTo(hx-8,hy-16);c.closePath();},gradient(ctx,hx-3,hy-23,28,'#8af0ff','#19a9e0','#2263ab'),'#174870',1.7);
    line(ctx,hx-18,hy-9,hx+18,hy-9,'#ffe46c',5);
    line(ctx,hx-17,hy-10,hx+17,hy-10,'#fff2ac',1.2);
    if(side||back){const sign=side||1,sway=Math.sin(time*7)*3;path(ctx,c=>{c.moveTo(hx-sign*17,hy-10);c.lineTo(hx-sign*30,hy-4+sway);c.lineTo(hx-sign*24,hy+1+sway);c.closePath();},'#f6c73c','#ad842a',1);}
  }
}

/** Draw with feet anchored at (x,feet). State time/actionTime are seconds. */
export function drawCharacter(ctx,x,feet,height,character='peanut',state={}) {
  const name=typeof character==='string'?character:character?.id||character?.key||'peanut';
  const p=animationPose(state),side=state.dir==='left'?-1:state.dir==='right'?1:0,back=state.dir==='up';
  ctx.save();ctx.translate(x,feet);ctx.scale(height/112,height/112);
  ctx.globalAlpha*=p.alpha;ctx.lineJoin='round';ctx.lineCap='round';
  ctx.translate(0,p.bob);ctx.rotate(p.lean);
  ctx.scale(Math.min(1.65,1/p.squash)*(side?.86:1),p.squash);
  if(name==='hutch'||name==='ninja')human(ctx,p,side,back,name,Number(state.time)||0);
  else peanut(ctx,p,side,back,Number(state.time)||0,Boolean(state.reduced));
  ctx.restore();
}
