import {Run,BASE_SPEED,DISTRICTS} from './model.mjs';

const $ = id => document.getElementById(id);
const canvas = $('game'), ctx = canvas.getContext('2d',{alpha:false});
let W=640,H=360, mode='loading', run=new Run(77), last=0, ambient=0, shake=0, flash=0, toastUntil=0, lastDistrict=0, saved=false;
const images={}, particles=[], reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
let best=0,bank=0,muted=false;
try { const data=JSON.parse(localStorage.getItem('neon-rail-rush-v1')||'{}'); best=Math.max(0,Number(data.best)||0); bank=Math.max(0,Number(data.bank)||0); muted=!!data.muted; } catch {}
function persist(){try{localStorage.setItem('neon-rail-rush-v1',JSON.stringify({best,bank,muted}));}catch{}}
function updatePersonal(){ $('best-intro').textContent=Math.floor(best).toLocaleString(); $('bank-intro').textContent=bank.toLocaleString(); $('sound').setAttribute('aria-pressed',String(muted)); $('sound').setAttribute('aria-label',muted?'Enable audio':'Mute audio'); $('sound').innerHTML=`SOUND <span>${muted?'OFF':'ON'}</span>`; }
updatePersonal();

class AudioEngine {
  constructor(){this.context=null;this.master=null;this.step=0;this.next=0;this.playing=false;}
  start(){
    try{
      if(!this.context){ const AC=window.AudioContext||window.webkitAudioContext; if(!AC)return; this.context=new AC();this.master=this.context.createGain();this.master.gain.value=muted?0:0.19;this.master.connect(this.context.destination); }
      this.context.resume().catch(()=>{});this.playing=true;this.next=this.context.currentTime+.08;
    }catch{}
  }
  tone(f,duration=.1,type='square',volume=.12,when=0,slide=0){
    if(!this.context||!this.master||muted)return;
    const time=when||this.context.currentTime, o=this.context.createOscillator(),g=this.context.createGain();
    o.type=type;o.frequency.setValueAtTime(f,time);if(slide)o.frequency.exponentialRampToValueAtTime(slide,time+duration);
    g.gain.setValueAtTime(.0001,time);g.gain.exponentialRampToValueAtTime(volume,time+.008);g.gain.exponentialRampToValueAtTime(.0001,time+duration);
    o.connect(g);g.connect(this.master);o.start(time);o.stop(time+duration+.01);o.onended=()=>{o.disconnect();g.disconnect();};
  }
  tick(){
    if(!this.context||!this.playing||muted||mode!=='playing')return;
    const now=this.context.currentTime;if(this.next<now-.5)this.next=now;
    const melody=[76,0,79,83,81,79,76,0,74,0,76,79,78,74,71,0,72,0,76,79,83,79,76,72,74,78,81,78,74,71,74,0];
    while(this.next<now+.15){
      const n=this.step%32, note=melody[n];
      if(note)this.tone(440*2**((note-69)/12),.13,'square',.08,this.next);
      if(n%2===0)this.tone(440*2**(([40,36,43,38][Math.floor(n/8)]-69)/12),.19,'triangle',.32,this.next);
      if(n%4===0)this.tone(110,.12,'sine',.42,this.next,30);
      if(n%4===2)this.tone(170,.05,'triangle',.12,this.next,55);
      this.step++;this.next+=.138;
    }
  }
  effect(type){
    if(type==='coin'){this.tone(1175,.065,'square',.12);this.tone(1568,.12,'square',.09,this.context?.currentTime+.055);}
    if(type==='jump')this.tone(240,.17,'square',.10,0,720);
    if(type==='slide')this.tone(340,.12,'triangle',.14,0,80);
    if(type==='step')this.tone(180,.035,'triangle',.08);
    if(type==='crash'){this.tone(140,.35,'sawtooth',.2,0,28);this.playing=false;}
    if(['shield','magnet','save'].includes(type)){[523,659,784].forEach((n,i)=>this.tone(n,.18,'square',.13,(this.context?.currentTime||0)+i*.07));}
  }
  toggle(){muted=!muted;if(this.master)this.master.gain.setTargetAtTime(muted?0:.19,this.context.currentTime,.03);if(!muted&&mode==='playing')this.start();updatePersonal();persist();}
}
const audio=new AudioEngine();

function resize(){
  const r=$('stage').getBoundingClientRect();W=r.width<700?360:640;H=Math.round(W*r.height/r.width);
  canvas.width=W;canvas.height=H;ctx.imageSmoothingEnabled=false;
}
new ResizeObserver(resize).observe($('stage')); resize();
const palettes=[{road:'#29203d',road2:'#30233f',edge:'#17203b',rail:'#937a9f',glow:'#58efde',wall:'#211833'}, {road:'#142d3b',road2:'#173440',edge:'#101d34',rail:'#658ba0',glow:'#5eeed7',wall:'#152235'}, {road:'#292043',road2:'#34254c',edge:'#181c39',rail:'#8a799f',glow:'#ff85cb',wall:'#1b1631'}];
function projection(lane,z,height=0){
  const s=24/(Math.max(-12,z)+24), horizon=H*.34, ground=H*.855, laneWidth=W*(W<500?.267:.211);
  const curve=Math.sin((run.distance+Math.max(z,0))/240)*W*.035*(1-s);
  return {x:W/2+lane*laneWidth*s+curve-run.x*W*.013*(1-s),y:horizon+(ground-horizon)*s-height*H*.076*s,s,laneWidth};
}
function rect(x,y,w,h,color){ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),Math.ceil(w),Math.ceil(h));}
function poly(points,color){ctx.fillStyle=color;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(Math.round(x),Math.round(y)):ctx.moveTo(Math.round(x),Math.round(y)));ctx.closePath();ctx.fill();}
function quad(l1,l2,z1,z2,color){const a=projection(l1,z1),b=projection(l2,z1),c=projection(l2,z2),d=projection(l1,z2);poly([[a.x,a.y],[b.x,b.y],[c.x,c.y],[d.x,d.y]],color);}
function sprite(name,x,y,w,h){const img=images[name];if(img)ctx.drawImage(img,Math.round(x-w/2),Math.round(y-h),Math.round(w),Math.round(h));}
function text(str,x,y,color='#d9deff',size=5){ctx.fillStyle=color;ctx.font=`bold ${size}px monospace`;ctx.textAlign='center';ctx.fillText(str,Math.round(x),Math.round(y));}
function drawScenery(){
  const pal=palettes[run.district];
  rect(0,0,W,H,'#171329');
  if(images.city)ctx.drawImage(images.city,0,0,images.city.width,images.city.height,Math.round(-W*.06-run.x*2),Math.round(-H*.04),Math.round(W*1.12),Math.round(H*.52));
  if(run.district){ctx.fillStyle=run.district===1?'#032c6338':'#24155f5c';ctx.fillRect(0,0,W,H*.4);}
  rect(0,H*.34,W,H*.66,pal.edge);
  // Far-to-near geometry is rasterized at a deliberately low resolution.
  for(let world=Math.floor((run.distance+240)/4)*4;world>run.distance-12;world-=4){
    const z=world-run.distance,n=Math.floor(world/4);
    quad(-1.55,1.55,z,z-4,n%2?pal.road:pal.road2);
    quad(-1.78,-1.57,z,z-4,n%4<2?'#384059':'#28283e');quad(1.57,1.78,z,z-4,n%4<2?'#384059':'#28283e');
    for(const lane of [-1,0,1]){
      if(n%2===0)quad(lane-.41,lane+.41,z,z-.55,'#51405a');
      for(const edge of [-.3,.3]){
        quad(lane+edge-.035,lane+edge+.035,z,z-4,'#191c30');
        quad(lane+edge-.014,lane+edge+.008,z,z-4,pal.rail);
      }
      if(n%8===0)quad(lane-.19,lane+.19,z,z-.14,'#b1768360');
    }
    if(n%3===0){quad(-1.60,-1.57,z,z-2,pal.glow);quad(1.57,1.60,z,z-2,pal.glow);}
  }
  // Platforms, passing shop fronts, signal posts and overhead power lines.
  const landmarks=[];
  const first=Math.floor((run.distance-15)/23)*23;
  for(let at=first;at<run.distance+240;at+=23)landmarks.push(at);
  landmarks.reverse().forEach(at=>{
    const z=at-run.distance;if(z<-10)return;
    const n=Math.abs(Math.floor(at/23));
    for(const side of [-1,1]){
      const p=projection(side*2.02,z),s=p.s;
      const building=images[`building${(n+(side>0?2:0))%4}`],bh=(185+n%4*22)*s,bw=bh*(building?building.width/building.height:.67);
      sprite(`building${(n+(side>0?2:0))%4}`,p.x+side*bw*.45,p.y,bw,bh);
      const post=projection(side*1.74,z),height=H*.43*s;
      rect(post.x-1*s,post.y-height,2*s,height,'#0e142a');
      rect(post.x-(side>0?12*s:0),post.y-height,12*s,2*s,'#343355');
      const lightX=post.x-side*10*s;
      rect(lightX-2*s,post.y-height+2*s,4*s,6*s,'#ffdcaa');
      rect(lightX-5*s,post.y-height,10*s,9*s,'#ffc98115');
      if(n%3===1){
        const sign=projection(side*1.98,z,1.3);
        rect(sign.x-14*s,sign.y-8*s,28*s,14*s,n%2?'#235a64':'#663568');
        rect(sign.x-14*s,sign.y-8*s,28*s,1*s,pal.glow);
        if(s>.12)text(n%2?'RUSH':'24 / 7',sign.x,sign.y+1*s,'#faf0d6',Math.max(3,6*s));
      }
    }
    if(n%3===0){
      const a=projection(-1.75,z),b=projection(1.75,z),height=H*.5*a.s;
      rect(a.x,a.y-height,b.x-a.x,3*a.s,'#13162c');
      for(let t=0;t<8;t++){const x=a.x+(b.x-a.x)*t/8;poly([[x,a.y-height],[x+8*a.s,a.y-height+5*a.s],[x+16*a.s,a.y-height]],'#34304a');}
    }
  });
  const van=projection(0,240);
  for(const lane of [-1.65,1.65]){const a=projection(lane,-10);ctx.strokeStyle='#161729';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,-4);ctx.lineTo(van.x+lane*4,H*.31);ctx.stroke();}
}
function drawEntity(e){
  const z=e.at-run.distance;if(z>230||z<-11)return;
  const p=projection(e.lane,z),s=p.s,laneW=p.laneWidth;
  if(e.kind==='coin'){
    if(e.done)return;
    const y=projection(e.lane,z,(e.height||.58)+Math.sin(ambient*4+e.id)*.07).y;
    const size=H*.044*s,stretch=.65+Math.abs(Math.sin(ambient*3+e.id*.4))*.35;
    sprite('coin',p.x,y,size*.85*stretch,size);return;
  }
  if(e.kind==='shield'||e.kind==='magnet'){
    if(e.done)return;
    const y=projection(e.lane,z,.9+Math.sin(ambient*4)*.1).y, r=H*.033*s;
    poly([[p.x,y-r*2],[p.x+r,y-r],[p.x,y],[p.x-r,y-r]],e.kind==='shield'?'#6ffee4':'#ff79c9');
    poly([[p.x,y-r*1.7],[p.x+r*.7,y-r],[p.x,y-r*.3],[p.x-r*.7,y-r]],'#20334f');
    text(e.kind==='shield'?'S':'M',p.x,y-r*.72,e.kind==='shield'?'#8affec':'#ff9bde',Math.max(4,r));return;
  }
  const unit=Math.min(H*.205,laneW*.75);
  const heights={train:unit*1.85,barrier:unit*.6,gate:unit*1.15};
  const widths=Object.fromEntries(['train','barrier','gate'].map(kind=>[kind,heights[kind]*(images[kind].width/images[kind].height)]));
  if(e.kind==='train'){
    // A receding carriage adds depth to the generated front-facing train sprite.
    const rear=projection(e.lane,z+14),w=widths.train*s,h=heights.train*s,rw=widths.train*rear.s,rh=heights.train*rear.s;
    poly([[p.x-w*.44,p.y-h*.87],[rear.x-rw*.44,rear.y-rh*.87],[rear.x+rw*.44,rear.y-rh*.87],[p.x+w*.44,p.y-h*.87]],'#306176');
  }
  sprite(e.kind,p.x,p.y,widths[e.kind]*s,heights[e.kind]*s);
}
function drawPlayer(){
  const p=projection(run.x,0),h=Math.min(H*.205,p.laneWidth*.75),w=h*.46;
  // Shadow stays on the rails while the sprite jumps.
  ctx.fillStyle='#0b102774';ctx.beginPath();ctx.ellipse(p.x,p.y+2,w*.65,4,0,0,Math.PI*2);ctx.fill();
  let y=p.y-run.y*H*.076;
  if(run.invincible>0&&Math.floor(ambient*15)%2===0)return;
  const frame=run.y>0?2:Math.floor(run.distance*.48)%4;
  const sliding=run.slide>0;const bob=run.y>0||sliding?0:Math.sin(run.distance*2.9)*1.3;
  if(run.shield){
    ctx.strokeStyle='#7cffe3';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(p.x,y-h*.48,w*.7,h*.58,0,0,Math.PI*2);ctx.stroke();
    ctx.strokeStyle='#a1ffeb44';ctx.beginPath();ctx.ellipse(p.x,y-h*.48,w*.78,h*.62,0,0,Math.PI*2);ctx.stroke();
  }
  if(run.magnet>0){ctx.strokeStyle='#ff85cbaa';ctx.beginPath();ctx.ellipse(p.x,p.y-h*.2,w*1.1,7,0,ambient*4,ambient*4+4);ctx.stroke();}
  const name=sliding?'slide':run.y>0?'jump':`runner${frame}`;
  const spriteHeight=sliding?h*.47:run.y>0?h*.82:h, spriteWidth=spriteHeight*(images[name].width/images[name].height);
  sprite(name,p.x+(run.lane-run.x)*3,y+bob,spriteWidth,spriteHeight);
  if(mode==='playing'&&!reducedMotion&&run.y===0&&Math.random()<.3)particles.push({x:p.x+(Math.random()-.5)*w,y:p.y,color:'#e797b4',vx:(Math.random()-.5)*14,vy:10,life:.22,max:.22,size:2});
}
function burst(lane,color,count=10){const p=projection(lane,0,.5);for(let i=0;i<count;i++)particles.push({x:p.x,y:p.y,color,vx:(Math.random()-.5)*90,vy:-Math.random()*65,life:.4+Math.random()*.2,max:.6,size:Math.random()> .6?3:2});}
function draw(dt){
  ctx.save();if(shake>0&&!reducedMotion)ctx.translate(Math.round((Math.random()-.5)*shake*9),Math.round((Math.random()-.5)*shake*6));
  drawScenery();
  const list=run.entities.filter(e=>e.at-run.distance>-11&&e.at-run.distance<240&&(!e.done||!['coin','shield','magnet'].includes(e.kind))).map(e=>({z:e.at-run.distance,e}));
  list.push({z:0,player:true});list.sort((a,b)=>b.z-a.z);
  list.forEach(item=>item.player?drawPlayer():drawEntity(item.e));
  if(!reducedMotion&&run.speed>35&&mode==='playing'){
    for(let i=0;i<9;i++){const f=(ambient*.8+i*.13)%1,side=i%2?1:-1;const x=W/2+side*(W*.45+f*W*.1),y=H*.4+f*H*.7;rect(x,y,1,8+f*30,'#cc99c038');}
  }
  for(let i=particles.length-1;i>=0;i--){const p=particles[i];if(mode==='playing'||mode==='ended'){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=70*dt;p.life-=dt;}ctx.globalAlpha=Math.max(0,p.life/p.max);rect(p.x,p.y,p.size,p.size,p.color);if(p.life<=0)particles.splice(i,1);}ctx.globalAlpha=1;
  ctx.restore();
  if(flash>0){ctx.fillStyle=`rgba(255,130,162,${flash*.32})`;ctx.fillRect(0,0,W,H);flash=Math.max(0,flash-dt*2);}
  shake=Math.max(0,shake-dt*3);
}
function toast(message,seconds=2){$('toast').textContent=message;$('toast').style.opacity='1';toastUntil=ambient+seconds;}
function hud(){
  $('distance').innerHTML=`${Math.floor(run.distance).toLocaleString()}<span> m</span>`;
  $('coins').textContent=run.coins;$('speed').textContent=`${(run.speed/BASE_SPEED).toFixed(1)}× SPEED`;
  $('district').textContent=DISTRICTS[run.district];$('progress').style.width=`${(run.distance%700)/7}%`;
  $('powerups').innerHTML=(run.shield?'<span>◇ SHIELD READY</span>':'')+(run.magnet>0?`<span>⊂ MAGNET ${Math.ceil(run.magnet)}s</span>`:'');
}
function setMode(value){
  mode=value;$('intro').hidden=value!=='menu'&&value!=='loading';$('pause-screen').hidden=value!=='paused';$('end-screen').hidden=value!=='ended';
  $('hud').hidden=value==='menu'||value==='loading';$('touch-controls').hidden=value!=='playing';$('powerups').hidden=value!=='playing';
  $('pause').disabled=value!=='playing'&&value!=='paused';$('pause').textContent=value==='paused'?'▶':'Ⅱ';$('pause').setAttribute('aria-label',value==='paused'?'Resume game':'Pause game');
}
function begin(){
  if(mode==='loading')return;run=new Run(crypto.getRandomValues(new Uint32Array(1))[0]);particles.length=0;saved=false;lastDistrict=0;shake=0;flash=0;
  setMode('playing');audio.start();hud();canvas.focus({preventScroll:true});toast('SWIPE / ← → TO SWITCH LANES',3);
}
function finish(){
  if(saved)return;saved=true;const record=run.distance>best;best=Math.max(best,Math.floor(run.distance));bank+=run.coins;persist();updatePersonal();
  $('end-distance').textContent=Math.floor(run.distance).toLocaleString();$('end-coins').textContent=run.coins;$('end-best').textContent=best.toLocaleString();
  $('end-tip').textContent=run.reason;$('end-eyebrow').textContent=record?'✦ NEW PERSONAL BEST':'NICE RUN, COURIER.';
  shake=1;flash=1;setMode('ended');$('toast').style.opacity='0';$('retry').focus({preventScroll:true});
}
function pause(){if(mode==='playing'){setMode('paused');audio.playing=false;$('resume').focus({preventScroll:true});}else if(mode==='paused'){setMode('playing');audio.start();canvas.focus({preventScroll:true});}}
function home(){if(mode==='playing'||mode==='paused'){best=Math.max(best,Math.floor(run.distance));bank+=run.coins;persist();}audio.playing=false;setMode('menu');run=new Run(77);particles.length=0;updatePersonal();$('toast').style.opacity='0';$('start').focus({preventScroll:true});}
function action(name){if(mode==='playing'){run.action(name);canvas.focus({preventScroll:true});}}
$('start').addEventListener('click',begin);$('retry').addEventListener('click',begin);$('pause-retry').addEventListener('click',()=>{best=Math.max(best,Math.floor(run.distance));bank+=run.coins;persist();begin();});
$('pause').addEventListener('click',pause);$('resume').addEventListener('click',pause);$('pause-home').addEventListener('click',home);$('end-home').addEventListener('click',home);$('sound').addEventListener('click',()=>audio.toggle());
$('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{toast('Fullscreen is unavailable in this browser.');}});
document.addEventListener('fullscreenchange',()=>{$('fullscreen').setAttribute('aria-label',document.fullscreenElement?'Exit fullscreen':'Enter fullscreen');resize();});
window.addEventListener('keydown',event=>{
  if(event.ctrlKey||event.metaKey||event.altKey)return;
  const key=event.key.toLowerCase(),actions={arrowleft:'left',a:'left',arrowright:'right',d:'right',arrowup:'jump',w:'jump',' ':'jump',arrowdown:'slide',s:'slide'};
  if(key==='escape'||key==='p'){event.preventDefault();if(!event.repeat)pause();return;}
  // Leave native keyboard activation intact for focused menu buttons.
  if(mode!=='playing'&&document.activeElement?.tagName==='BUTTON')return;
  if(actions[key]){event.preventDefault();if(event.repeat)return;if(mode==='menu'||mode==='ended'){if(key===' '||key==='arrowup')begin();}else action(actions[key]);}
});
let gesture=null;
canvas.addEventListener('pointerdown',event=>{if(mode!=='playing')return;event.preventDefault();gesture={id:event.pointerId,x:event.clientX,y:event.clientY,used:false};canvas.setPointerCapture(event.pointerId);});
function gestureMove(event){
  if(!gesture||event.pointerId!==gesture.id||gesture.used)return;
  const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;
  if(Math.max(Math.abs(dx),Math.abs(dy))>=24){gesture.used=true;action(Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'slide':'jump');}
}
canvas.addEventListener('pointermove',gestureMove);
canvas.addEventListener('pointerup',event=>{if(gesture&&event.pointerId===gesture.id){gestureMove(event);if(!gesture.used)action('jump');gesture=null;}});
canvas.addEventListener('pointercancel',()=>{gesture=null;});
document.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('pointerdown',event=>{event.preventDefault();action(button.dataset.action);}));
document.addEventListener('visibilitychange',()=>{if(document.hidden&&mode==='playing')pause();});
window.addEventListener('blur',()=>{if(mode==='playing')pause();});

function loop(time){
  const dt=Math.min((time-last)/1000||0,.05);last=time;ambient+=dt;
  if(mode==='playing'){
    run.update(dt);
    for(const e of run.events){audio.effect(e.type);if(e.type==='coin')burst(e.lane,'#ffdc7d',4);if(e.type==='shield')toast('SHIELD · ONE FREE HIT');if(e.type==='magnet')toast('COIN MAGNET · 9 SECONDS');if(e.type==='save'){toast('SHIELD SAVED YOU');burst(run.x,'#79ffe0',24);shake=.5;}}
    run.events.length=0;
    if(run.district!==lastDistrict){lastDistrict=run.district;toast(DISTRICTS[run.district],3);}
    if(run.distance>45&&run.distance<46)toast('ORANGE = JUMP · PINK = SLIDE',3);
    hud();audio.tick();if(run.dead)finish();
  }
  if(ambient>toastUntil)$('toast').style.opacity='0';
  if(mode!=='menu'&&mode!=='loading')draw(dt);
  requestAnimationFrame(loop);
}
async function loadImage(name,path,cutout=false){
  const img=new Image();img.src=path;await img.decode();
  if(cutout){
    // Binary sprite alpha is intentional: no translucent fringes at pixel scale.
    const off=document.createElement('canvas');off.width=img.width;off.height=img.height;const c=off.getContext('2d');c.drawImage(img,0,0);
    const data=c.getImageData(0,0,off.width,off.height);for(let i=3;i<data.data.length;i+=4)data.data[i]=data.data[i]<160?0:255;c.putImageData(data,0,0);images[name]=off;
  }else images[name]=img;
}
async function load(){
  try{
    await Promise.all([loadImage('city','assets/city.webp'),...['train','barrier','gate','coin','jump','slide'].map(n=>loadImage(n,`assets/${n}.png`,true)),...[0,1,2,3].flatMap(n=>[loadImage(`runner${n}`,`assets/runner-${n}.png`,true),loadImage(`building${n}`,`assets/building-${n}.png`,true)])]);
    $('start').disabled=false;$('start-label').textContent="LET’S RUN";$('load-status').textContent='PRESS SPACE OR TAP TO START';setMode('menu');
  }catch(error){
    console.error('Could not load runner assets',error);$('start-label').textContent='RETRY LOADING';$('load-status').textContent='An asset could not load. Tap to retry.';$('start').disabled=false;
    $('start').addEventListener('click',()=>{if(mode==='loading'){$('start').disabled=true;load();}},{once:true});
  }
}
load();requestAnimationFrame(loop);

// A read-only snapshot supports diagnostics without exposing game controls.
Object.defineProperty(window,'neonRailRush',{value:Object.freeze({snapshot:()=>({mode,distance:run.distance,speed:run.speed,lane:run.lane,x:run.x,y:run.y,slide:run.slide,coins:run.coins,seed:run.seed,entities:run.entities.map(e=>({...e,z:e.at-run.distance})),best,bank,assets:Object.keys(images).length})})});
