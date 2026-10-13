import {Game,CAST,COLS,ROWS} from './engine.js';
import {PACK_IDS,loadPack,drawAsset} from './packs.js';
const $=id=>document.getElementById(id),canvas=$('game'),ctx=canvas.getContext('2d');
const W=416,H=352,T=30,OX=13,OY=11;
canvas.width=W*3;canvas.height=H*3;ctx.scale(3,3);
ctx.imageSmoothingEnabled=false;
let selected='peanut',game=new Game(),paused=false,keys=new Set(),last=performance.now(),clock=0,particles=[],floaters=[],puddles=[],shake=0,toastTimer=0,best=0,sound=false,audio=null,menuState='select';
try{best=Number(localStorage.getItem('bungerman-best-v1'))||0;}catch{}
$('best').textContent=String(best).padStart(5,'0');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let pack=null,loadTicket=0,packReady=false;
function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));}
function drawCast(c,x,bottom,height,character,frame=0,flip=false,alpha=1){
 if(!pack)return;const asset=pack.assets[character],width=height*asset.bounds[2]/asset.bounds[3];
 c.save();c.translate(x,bottom);if(flip)c.scale(-1,1);if(frame&&!reduced)c.rotate(Math.sin(clock*18)*.035);
 drawAsset(c,pack,character,-width/2,-height,width,height,{alpha});c.restore();
}
function smallCanvas(id,w,h){const el=typeof id==='string'?$(id):id;if(el.width!==w*3){el.width=w*3;el.height=h*3;}const c=el.getContext('2d');c.setTransform(3,0,0,3,0,0);c.clearRect(0,0,w,h);return c;}
function drawPortraits(){document.querySelectorAll('.portrait').forEach(p=>{const c=smallCanvas(p,88,100),char=p.dataset.portrait;drawCast(c,44,94,char==='hutch'?84:76,char);});drawCast(smallCanvas('hud-face',32,36),16,35,34,game.character);}
function drawLogo(){drawAsset(smallCanvas('logo',320,84),pack,'logo',0,4,320,76);}
function drawMenuArt(state){const c=smallCanvas('menu-art',160,124);if(['paused','won','lost','roundWon'].includes(state))drawAsset(c,pack,state,5,4,150,116);}
async function choosePack(id){
 const ticket=++loadTicket;packReady=false;$('play').disabled=true;$('pack-status').textContent='LOADING…';
 document.querySelectorAll('[data-style]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.style===id));});
 try{const next=await loadPack(id);if(ticket!==loadTicket)return;pack=next;packReady=true;document.body.dataset.style=id;
 canvas.width=W*(id==='16bit'?1:3);canvas.height=H*(id==='16bit'?1:3);ctx.setTransform(id==='16bit'?1:3,0,0,id==='16bit'?1:3,0,0);
 $('play').disabled=false;$('pack-status').textContent='';drawLogo();drawPortraits();drawMenuArt(menuState);
 try{localStorage.setItem('bungerman-style',id);}catch{}
 }catch(error){if(ticket!==loadTicket)return;$('pack-status').textContent='LOAD FAILED · TAP STYLE TO RETRY';console.error(error);}
}
document.querySelectorAll('[data-style]').forEach(b=>b.addEventListener('click',()=>choosePack(b.dataset.style)));
let initialStyle=new URLSearchParams(location.search).get('style');try{initialStyle??=localStorage.getItem('bungerman-style');}catch{}
choosePack(PACK_IDS.includes(initialStyle)?initialStyle:'cartoon');
function tone(freq,duration=.07,type='square',volume=.035,end){if(!sound||!audio)return;try{const osc=audio.createOscillator(),gain=audio.createGain();osc.type=type;osc.frequency.setValueAtTime(freq,audio.currentTime);if(end)osc.frequency.exponentialRampToValueAtTime(end,audio.currentTime+duration);gain.gain.setValueAtTime(volume,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+duration);osc.connect(gain);gain.connect(audio.destination);osc.start();osc.stop(audio.currentTime+duration);}catch{}}
function sfx(kind){if(kind==='drop')tone(190,.09,'triangle',.06,95);if(kind==='explosion'){tone(105,.2,'sawtooth',.05,25);tone(59,.23,'triangle',.08,22);}if(kind==='charge')tone(210,.15,'triangle',.04,350);if(kind==='hit')tone(380,.2,'square',.035,80);if(kind==='pickup'){tone(670,.08,'sine',.08);setTimeout(()=>tone(890,.09,'sine',.06),70);}if(kind==='win')[440,550,660,880].forEach((f,i)=>setTimeout(()=>tone(f,.2,'triangle',.07),i*90));if(kind==='lost')[220,170,100].forEach((f,i)=>setTimeout(()=>tone(f,.16,'triangle',.07),i*120));}
function toast(text){$('toast').textContent=text;$('toast').classList.add('visible');toastTimer=1.4;}
function updateBest(){if(game.score>best){best=game.score;try{localStorage.setItem('bungerman-best-v1',String(best));}catch{}}$('best').textContent=String(best).padStart(5,'0');}
function showState(state){menuState=state;toastTimer=0;$('toast').classList.remove('visible');keys.clear();game.cancelCharge();$('menu').classList.remove('hidden');$('menu').dataset.view=state;$('select-view').hidden=state!=='select';$('state-view').hidden=state==='select';$('state-view').dataset.state=state;document.body.classList.remove('playing');$('pause').disabled=true;
 if(state==='select')return;const content={paused:['PAUSED','RESUME'],roundWon:['CLEAR!','NEXT'],won:['YOU WIN!','REPLAY'],lost:['COOKED.','RETRY']}[state];$('state-title').textContent=content[0];$('continue').innerHTML=content[1]+' <span aria-hidden="true">▶</span>';$('state-score').hidden=state==='paused';$('state-score').textContent=state==='roundWon'?game.round+' / 3':String(game.score).padStart(5,'0');drawMenuArt(state);}
function hideMenu(){menuState=null;toastTimer=0;$('toast').classList.remove('visible');$('menu').classList.add('hidden');document.body.classList.add('playing');$('pause').disabled=false;canvas.focus({preventScroll:true});}
function start(){if(!packReady)return;game=new Game(selected,Math.floor(Math.random()*999999));paused=false;keys.clear();particles=[];floaters=[];puddles=[];game.start();hideMenu();drawPortraits();tone(440,.12,'triangle',.04);updateHud();}
function home(){updateBest();paused=false;keys.clear();game.cancelCharge();game=new Game(selected);particles=[];floaters=[];puddles=[];showState('select');drawPortraits();updateHud();}
function pause(){if(game.status!=='playing')return;paused=!paused;keys.clear();game.cancelCharge();if(paused)showState('paused');else hideMenu();}
function proceed(){if(paused){pause();return;}if(game.status==='roundWon'){game.next();particles=[];puddles=[];hideMenu();updateHud();return;}start();}
$('play').addEventListener('click',start);$('continue').addEventListener('click',proceed);$('home').addEventListener('click',home);$('change-character').addEventListener('click',home);$('pause').addEventListener('click',pause);
document.querySelectorAll('[data-character]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.character;document.querySelectorAll('.character').forEach(c=>{const active=c===b;c.classList.toggle('selected',active);c.setAttribute('aria-pressed',String(active));});game=new Game(selected);drawPortraits();tone(460,.05,'triangle',.04);updateHud();}));
$('sound').addEventListener('click',()=>{sound=!sound;if(sound){try{audio??=new(window.AudioContext||window.webkitAudioContext)();audio.resume();}catch{sound=false;}}$('sound-off').hidden=sound;$('sound').setAttribute('aria-label',sound?'Mute sound':'Enable sound');$('sound').setAttribute('aria-pressed',String(sound));tone(660,.08,'sine',.04);});
const mapped={KeyW:[0,-1],ArrowUp:[0,-1],KeyD:[1,0],ArrowRight:[1,0],KeyS:[0,1],ArrowDown:[0,1],KeyA:[-1,0],ArrowLeft:[-1,0]};
window.addEventListener('keydown',e=>{if(e.code==='Escape'){e.preventDefault();if(!e.repeat)pause();return;}if(game.status!=='playing'||paused)return;if(mapped[e.code]||e.code==='Space'){e.preventDefault();if(!e.repeat){keys.delete(e.code);keys.add(e.code);if(e.code==='Space')game.startCharge();}}});
window.addEventListener('keyup',e=>{keys.delete(e.code);if(e.code==='Space'&&!paused){if(game.status==='playing')e.preventDefault();game.releaseCharge();}});
window.addEventListener('blur',()=>{keys.clear();game.cancelCharge();if(game.status==='playing'&&!paused)pause();});document.addEventListener('visibilitychange',()=>{if(document.hidden&&game.status==='playing'&&!paused)pause();});
const touchMap={up:'ArrowUp',right:'ArrowRight',down:'ArrowDown',left:'ArrowLeft'};
document.querySelectorAll('[data-move]').forEach(b=>{const k=touchMap[b.dataset.move];b.addEventListener('pointerdown',e=>{e.preventDefault();if(menuState)return;b.setPointerCapture(e.pointerId);keys.delete(k);keys.add(k);});const up=()=>keys.delete(k);b.addEventListener('pointerup',up);b.addEventListener('pointercancel',up);b.addEventListener('lostpointercapture',up);});
$('touch-bomb').addEventListener('pointerdown',e=>{e.preventDefault();if(menuState)return;$('touch-bomb').setPointerCapture(e.pointerId);game.startCharge();});$('touch-bomb').addEventListener('pointerup',()=>{if(!paused)game.releaseCharge();});$('touch-bomb').addEventListener('pointercancel',()=>game.cancelCharge());
const px=x=>OX+(x+.5)*T,py=y=>OY+(y+.5)*T;
function burst(x,y,count,color){if(reduced)count=Math.ceil(count/3);for(let i=0;i<count;i++){const a=Math.random()*Math.PI*2,v=20+Math.random()*80;particles.push({x:px(x),y:py(y),vx:Math.cos(a)*v,vy:Math.sin(a)*v-20,life:.35+Math.random()*.35,max:.7,color,size:2+Math.floor(Math.random()*3)});}}
function events(){for(const ev of game.events.splice(0)){if(['drop','charge'].includes(ev.type))sfx(ev.type);if(ev.type==='overtime'){toast('BOMB RAIN!');tone(420,.2,'sawtooth',.03,180);}if(ev.type==='rainLand')burst(ev.x,ev.y,5,'#f9d07b');if(ev.type==='explosion'){sfx('explosion');shake=reduced?0:3;burst(ev.x,ev.y,14,'#ffb538');}if(ev.type==='crate')burst(ev.x,ev.y,7,'#bd965b');if(ev.type==='hit'){sfx('hit');if(ev.player){shake=reduced?0:5;if(ev.reason==='overcooked')toast('TOO HOT!');}}if(ev.type==='death'){puddles.push({x:ev.x,y:ev.y,character:ev.character});burst(ev.x,ev.y,10,'#d8913d');if(!ev.player)floaters.push({x:px(ev.x),y:py(ev.y)-12,text:'KO',life:1});}if(ev.type==='pickup'){sfx('pickup');floaters.push({x:px(ev.x),y:py(ev.y),text:'+75',life:1});}if(ev.type==='empty')toast('WAIT!');if(ev.type==='blocked')toast('MOVE!');if(['roundWon','won','lost'].includes(ev.type)){updateBest();sfx(ev.type==='lost'?'lost':'win');showState(ev.type);}}}
function updateHud(){$('score').textContent=String(game.score).padStart(5,'0');$('score').setAttribute('aria-label','Score '+game.score);$('hearts').textContent='♥'.repeat(Math.max(0,game.player.hp))+'♡'.repeat(3-Math.max(0,game.player.hp));$('hearts').setAttribute('aria-label',game.player.hp+' health');const seconds=Math.ceil(Math.max(0,game.time));$('timer').textContent=String(seconds).padStart(2,'0');$('timer').style.color=game.overtime?'#ff9162':'';document.querySelector('.machine').classList.toggle('overtime',game.overtime);$('timer').setAttribute('aria-label',seconds+' seconds');$('round').textContent=game.round+' / 3';$('round').setAttribute('aria-label','Round '+game.round+' of 3');const heat=game.charge;$('heat-fill').style.width=(Math.min(1,heat)*100)+'%';$('heat-fill').style.background=heat>.83?'#f46145':heat>.5?'#f29c37':'#fdd56d';document.querySelector('.heat').setAttribute('aria-valuenow',String(Math.round(heat*100)));const available=2-game.bombs.filter(b=>b.owner===game.player).length;$('bomb-stock').textContent=available===2?'● ●':available===1?'● ○':'○ ○';$('bomb-stock').setAttribute('aria-label',available+' bombs available');}
function rounded(x,y,w,h,r,fill){ctx.fillStyle=fill;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
function ellipse(x,y,rx,ry,fill){ctx.fillStyle=fill;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fill();}
function gradient(x,y,h,a,b){const g=ctx.createLinearGradient(x,y,x,y+h);g.addColorStop(0,a);g.addColorStop(1,b);return g;}
function block(x,y,boundary){
 if(pack){drawAsset(ctx,pack,'wall',x,y,T,T,{contain:false});return;}
 rounded(x+1,y+4,29,27,5,'#082e32a0');
 rounded(x+1,y+1,28,28,4,'#233e51');
 rounded(x+1,y,28,25,4,gradient(x,y,25,boundary?'#718da0':'#90aeb3',boundary?'#40586e':'#537a86'));
 rounded(x+3,y+2,24,2,1,boundary?'#a3bcc4':'#c2dcd5');
 rounded(x+4,y+5,22,16,3,gradient(x,y+5,16,boundary?'#7896a5':'#a2bdb8',boundary?'#5c778c':'#789e9e'));
 if(!boundary){rounded(x+9,y+10,12,2,1,'#c4d9cf55');rounded(x+12,y+13,6,2,1,'#c4d9cf33');}
}
function brick(x,y){
 if(pack){drawAsset(ctx,pack,'crate',x+1,y,T-2,T,{contain:false});return;}
 rounded(x+2,y+4,27,26,4,'#123e2b99');rounded(x+2,y+1,26,27,3,'#73422e');
 rounded(x+2,y,26,24,3,gradient(x,y,24,'#e9b767','#b5773b'));
 rounded(x+4,y+2,22,2,1,'#ffe0a0');rounded(x+5,y+6,20,15,2,'#aa713c');rounded(x+6,y+6,18,13,2,gradient(x,y+6,13,'#c58b48','#dba459'));
 for(const xx of [x+5,x+24]){ellipse(xx,y+4,1,1,'#80532e');ellipse(xx,y+21,1,1,'#80532e');}
 ctx.save();ctx.translate(x+15,y+13);ctx.rotate(.55);ellipse(0,-3,3.5,4.5,'#81512e');ellipse(0,3,3.5,4.5,'#81512e');ellipse(-.5,-3,2,3,'#f9d387');ellipse(-.5,3,2,3,'#f9d387');ctx.restore();
}
function floor(){
 rounded(0,0,W,H,0,'#152e3c');rounded(OX-4,OY-4,COLS*T+8,ROWS*T+8,5,'#85a3a5');
 for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++){
 const sx=OX+x*T,sy=OY+y*T,v=game.grid[y][x];
 rect(ctx,sx,sy,T,T,'#318960');if(pack){drawAsset(ctx,pack,'floor',sx,sy,T,T,{contain:false});rect(ctx,sx,sy,T,T,pack.id==='16bit'?'#185b3b70':'#174d342b');}
 rect(ctx,sx+1,sy+1,T-2,1,'#6fb38620');rect(ctx,sx,sy+29,T,1,'#134c3828');
 for(let i=0;i<3;i++){const gx=sx+5+(x*7+y*11+i*9)%22,gy=sy+5+(x*13+y*3+i*7)%22;rect(ctx,gx,gy,1,2,'#92c78a25');}
 if(v===1)block(sx,sy,x===0||y===0||x===COLS-1||y===ROWS-1);if(v===2)brick(sx,sy);
 }
}
function bomb(x,y,heat,enemy,fuse){
 if(pack){const p=reduced?0:Math.max(0,1-fuse)*Math.sin(clock*18)*1.2;ellipse(x,y+9,10,3,'#10292b77');drawAsset(ctx,pack,'bomb',x-12-p/2,y-18-p,24+p,30+p);return;}
 const pulse=reduced?0:Math.max(0,1-fuse)*(.5+.5*Math.sin(clock*18));
 ellipse(x,y+9,11,4,'#103d3290');ctx.save();ctx.translate(x,y);ctx.scale(1+pulse*.1,1+pulse*.1);
 const g=ctx.createRadialGradient(-4,-5,1,0,0,11);g.addColorStop(0,enemy?'#83b9c6':'#9baabc');g.addColorStop(.32,enemy?'#385d75':'#4b5569');g.addColorStop(1,'#101e30');ellipse(0,0,10,10,g);
 ellipse(-4,-5,3,1.6,'#deefff90');rounded(-2,-12,6,4,1,'#b29a6b');
 ctx.strokeStyle='#f9d086';ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(2,-11);ctx.quadraticCurveTo(7,-16,5,-18);ctx.stroke();
 ctx.shadowColor='#ffb536';ctx.shadowBlur=8;ellipse(5,-18,2+Math.sin(clock*22)*.5,2,'#fff2ba');ctx.shadowBlur=0;
 if(heat>.65)ellipse(1,3,2,2,'#ffad49');ctx.restore();
}
function fireTile(f){
 if(pack){const x=OX+f.x*T,y=OY+f.y*T;drawAsset(ctx,pack,'blast',x-3,y-3,T+6,T+6,{alpha:Math.min(1,f.life*4)});return;}
 const x=OX+f.x*T,y=OY+f.y*T,at=(xx,yy)=>game.flames.some(n=>n.x===xx&&n.y===yy);
 const l=at(f.x-1,f.y),r=at(f.x+1,f.y),u=at(f.x,f.y-1),d=at(f.x,f.y+1);
 ctx.save();ctx.globalAlpha=Math.min(1,f.life*4);ctx.shadowColor='#ff882d';ctx.shadowBlur=12;
 for(const [width,color] of [[21,'#f87927'],[14,'#ffbe4b'],[6,'#fff2b1']]){
 const wobble=reduced?0:Math.sin(clock*22+f.x+f.y)*1.3;
 ctx.strokeStyle=color;ctx.lineWidth=width+wobble;ctx.lineCap='round';ctx.beginPath();
 if(l||r){ctx.moveTo(x+(l?0:15),y+15);ctx.lineTo(x+(r?30:15),y+15);}
 if(u||d){ctx.moveTo(x+15,y+(u?0:15));ctx.lineTo(x+15,y+(d?30:15));}ctx.stroke();
 ellipse(x+15,y+15,width*.5,width*.5,color);ctx.shadowBlur=0;
 }
 ctx.restore();
}
function render(){ctx.save();ctx.imageSmoothingEnabled=pack?.id!=='16bit';if(shake>0)ctx.translate(Math.round((Math.random()-.5)*shake),Math.round((Math.random()-.5)*shake));floor();
 for(const p of puddles){const x=px(p.x),y=py(p.y);rect(ctx,x-11,y+6,22,5,'#865320');rect(ctx,x-8,y+3,16,8,'#c08a3c');rect(ctx,x-5,y+2,10,4,'#e1ac55');rect(ctx,x-4,y+5,2,2,'#252434');rect(ctx,x+4,y+5,2,2,'#252434');rect(ctx,x-8,y,8,3,CAST[p.character].color);}
 for(const p of game.pickups){const x=px(p.x),y=py(p.y)+Math.sin(clock*4);drawAsset(ctx,pack,'pickup',x-7,y-9,14,18);}
 for(const r of game.rain){const x=px(r.x),y=py(r.y),progress=1-r.delay/r.maxDelay;ctx.save();ctx.strokeStyle='#ffba5a';ctx.lineWidth=1.5;ctx.setLineDash([3,2]);ctx.beginPath();ctx.arc(x,y,11,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);ctx.strokeStyle='#ff6349';ctx.beginPath();ctx.moveTo(x-5,y-5);ctx.lineTo(x+5,y+5);ctx.moveTo(x+5,y-5);ctx.lineTo(x-5,y+5);ctx.stroke();ctx.restore();if(progress>.55){const height=(1-progress)/.45*65;drawAsset(ctx,pack,'bomb',x-9,y-height-20,18,23,{alpha:.85});}}
 for(const b of game.bombs)bomb(px(b.x),py(b.y)+2,b.heat,b.owner!==game.player,b.fuse);
 for(const f of game.flames)fireTile(f);
 const entities=[...game.bots.filter(b=>b.alive),...(game.player.alive?[game.player]:[])].sort((a,b)=>a.ry-b.ry);
 for(const e of entities){const x=px(e.rx),y=py(e.ry),isPlayer=e===game.player;ellipse(x,y+12,e.character==='hutch'?12:8,3.5,'#103e3599');if(isPlayer){rect(ctx,x-10,y+13,20,2,'#fde089');rect(ctx,x-12,y+10,2,3,'#fde089');rect(ctx,x+10,y+10,2,3,'#fde089');}const moving=Math.abs(e.rx-e.x)+Math.abs(e.ry-e.y)>.03,frame=moving?Math.floor(clock*9)%2:0;const height=e.character==='hutch'?38:35;drawCast(ctx,x,y+13+(moving&&!reduced?Math.sin(clock*18)*.65:0),height,e.character,frame,e.face<0,e.inv>0&&Math.sin(clock*25)<0?.45:1);if(isPlayer){rect(ctx,x-3,y-31,6,2,'#ffdb65');rect(ctx,x-2,y-29,4,2,'#ffdb65');rect(ctx,x-1,y-27,2,2,'#ffdb65');if(game.charging){rect(ctx,x-12,y-37,24,4,'#15243d');rect(ctx,x-11,y-36,22*game.charge,2,game.charge>.83?'#ff6031':'#ffcf58');}}}
 for(const p of particles){ctx.globalAlpha=Math.max(0,p.life/p.max);rect(ctx,p.x,p.y,p.size,p.size,p.color);}ctx.globalAlpha=1;
 for(const f of floaters){ctx.globalAlpha=Math.min(1,f.life*2);ctx.font='bold 8px monospace';ctx.textAlign='center';ctx.fillStyle='#1b2434';ctx.fillText(f.text,Math.round(f.x)+1,Math.round(f.y)+1);ctx.fillStyle='#fff6b4';ctx.fillText(f.text,Math.round(f.x),Math.round(f.y));}ctx.globalAlpha=1;ctx.restore();
}
let hudTimer=0;
function frame(now){const dt=Math.min((now-last)/1000,.05);last=now;clock+=dt;if(!paused){if(game.status==='playing'){const codes=[...keys].reverse(),dir=mapped[codes.find(k=>mapped[k])];game.update(dt,dir?{dx:dir[0],dy:dir[1]}:{});events();}for(const p of particles){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=140*dt;}particles=particles.filter(p=>p.life>0);for(const f of floaters){f.life-=dt;f.y-=13*dt;}floaters=floaters.filter(f=>f.life>0);shake=Math.max(0,shake-dt*20);}toastTimer-=dt;if(toastTimer<=0)$('toast').classList.remove('visible');hudTimer-=dt;if(hudTimer<=0){updateHud();hudTimer=.07;}render();requestAnimationFrame(frame);}
drawLogo();drawPortraits();updateHud();requestAnimationFrame(frame);



