export const WORLD={w:1600,h:1050};
export const TOWERS=[
 {id:'rifle',name:'Watchman',role:'RAPID FIRE',cost:70,range:225,damage:17,rate:.38,color:'#e7c77f',icon:'⌖',desc:'Reliable single-target fire. Your first line of defense.',weapon:'mg_barrel'},
 {id:'cannon',name:'Breaker',role:'AREA DAMAGE',cost:120,range:255,damage:58,rate:1.8,color:'#ed9768',icon:'◉',desc:'Explosive shells punish tightly packed hordes.',weapon:'autocannon_barrel'},
 {id:'shock',name:'Arc coil',role:'CHAIN + SLOW',cost:110,range:190,damage:21,rate:1.1,color:'#85d6de',icon:'ϟ',desc:'Arcs between four targets and slows their advance.',weapon:'tesla_emitter'},
 {id:'flame',name:'Cinder',role:'CLOSE CONTROL',cost:95,range:150,damage:12,rate:.22,color:'#f3a16c',icon:'♨',desc:'Scorches a close-range cone. Ignores armor.',weapon:'flamer_nozzle'},
 {id:'sniper',name:'Longshot',role:'ARMOR PIERCING',cost:140,range:340,damage:100,rate:2.2,color:'#b8c6ed',icon:'⟐',desc:'Prioritizes the strongest enemy. Built for brutes.',weapon:'shotgun_barrel'}
];
export const SECTORS=[
 {name:'Pinefall Junction',region:'OZARK EXCLUSION ZONE',subtitle:'The forest took the towns. The road is still ours.',color:'#3d5547',ground:'#243930',risk:'Two approach lanes',lanes:[[[0,240],[350,240],[560,450],[780,450]],[[1600,300],[1190,300],[1010,450],[780,450]]]},
 {name:'Sunken Crossing',region:'LOWLAND QUARANTINE',subtitle:'Three roads in. One convoy out.',color:'#425b5e',ground:'#243c3e',risk:'Three approach lanes',lanes:[[[0,360],[420,360],[640,520],[830,520]],[[1300,0],[1300,290],[1090,520],[830,520]],[[1600,850],[1230,850],[1080,650],[830,520]]]},
 {name:'Ashline Terminal',region:'FINAL TRANSMISSION',subtitle:'Bring the relay online. Give the living a way home.',color:'#695744',ground:'#40392e',risk:'Elite horde · final boss',lanes:[[[0,190],[420,190],[620,420],[790,460]],[[1600,200],[1200,200],[980,460],[790,460]],[[1600,930],[1190,930],[1050,660],[790,460]]]}
];
export const BOONS=[
 {id:'damage',name:'Hand-loaded rounds',tag:'FIREPOWER',desc:'All defenses deal 22% more damage.',icon:'⌖'},
 {id:'range',name:'Long-range optics',tag:'REACH',desc:'All defense ranges increase by 18%.',icon:'◎'},
 {id:'economy',name:'Salvage protocol',tag:'ECONOMY',desc:'Enemy scrap rewards increase by 35%.',icon:'◇'},
 {id:'armor',name:'Reinforced hull',tag:'SURVIVAL',desc:'Gain 180 maximum hull and repair 240.',icon:'⬡'},
 {id:'haste',name:'Hot-swapped barrels',tag:'FIRE RATE',desc:'All defenses fire 20% faster.',icon:'ϟ'},
 {id:'support',name:'Orbital handshake',tag:'SUPPORT',desc:'Support cooldowns are 30% shorter. Reset them now.',icon:'✳'}
];
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export function seeded(seed){return ()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
export class Expedition {
 constructor({rig='warden',difficulty='standard',seed=Date.now()%1000000}={}){
  this.seed=seed;this.rng=seeded(seed);this.rig=rig;this.difficulty=difficulty;this.sector=0;this.wave=0;this.phase='convoy';this.scrap=rig==='scout'?370:300;this.maxHp=rig==='bastion'?1200:1000;this.hp=this.maxHp;this.core={x:790,y:675,a:-Math.PI/2};this.towers=[];this.enemies=[];this.effects=[];this.loot=[];this.pads=[];this.kills=0;this.time=0;this.id=1;this.spawnLeft=0;this.spawnClock=0;this.waveTime=0;this.cooldowns={strike:0,pulse:0};this.boons=[];this.damageMult=1;this.rangeMult=1;this.rateMult=1;this.scrapMult=rig==='scout'?1.2:1;this.supportMult=1;this.events=[];this.speed=0;this.shake=0;this.score=0;this.setSector();
 }
 setSector(){this.core={x:790,y:675,a:-Math.PI/2};this.phase='convoy';this.pads=[];this.enemies=[];this.effects=[];this.loot=[{x:420,y:655,value:65},{x:1100,y:590,value:65},{x:930,y:850,value:55}];this.routes=SECTORS[this.sector].lanes.map(l=>l.map(([x,y])=>({x,y})));}
 emit(type,data={}){this.events.push({type,...data});}
 deploy(){if(this.phase!=='convoy')return false;this.phase='build';this.speed=0;this.pads=Array.from({length:10},(_,i)=>{let a=i*Math.PI/5;return {x:this.core.x+Math.cos(a)*175,y:this.core.y+Math.sin(a)*155};});this.towers.forEach((t,i)=>{Object.assign(t,this.pads[i]);t.pad=i;t.cooldown=0;});this.routes=SECTORS[this.sector].lanes.map(l=>[...l.map(([x,y])=>({x,y})),{...this.core}]);this.emit('deployed');return true;}
 build(type,pad){const def=TOWERS[type];if(!def||!this.pads[pad]||!['build','wave'].includes(this.phase)||this.towers.some(t=>t.pad===pad)||this.scrap<def.cost)return false;this.scrap-=def.cost;this.towers.push({id:this.id++,type,pad,...this.pads[pad],level:1,cooldown:0,a:-Math.PI/2,kills:0,spent:def.cost});this.emit('build');return true;}
 upgrade(id){const t=this.towers.find(t=>t.id===id);if(!t||t.level>=3||!['build','wave'].includes(this.phase))return false;let cost=this.upgradeCost(t);if(this.scrap<cost)return false;this.scrap-=cost;t.spent+=cost;t.level++;this.emit('build');return true;}
 upgradeCost(t){return Math.round(TOWERS[t.type].cost*(t.level===1?.8:1.2));}
 sell(id){if(!['build','wave'].includes(this.phase))return false;let t=this.towers.find(t=>t.id===id);if(!t)return false;this.scrap+=Math.floor(t.spent*.7);this.towers=this.towers.filter(t=>t!==id&&t.id!==id);return true;}
 repair(){if(this.scrap<65||this.hp>=this.maxHp||!['build','wave'].includes(this.phase))return false;this.scrap-=65;this.hp=Math.min(this.maxHp,this.hp+250);this.emit('repair');return true;}
 startWave(){if(this.phase!=='build')return false;this.phase='wave';this.wave++;this.spawnLeft=16+this.wave*8;this.spawnClock=0;this.waveTime=0;this.bossSpawned=false;this.emit('wave',{wave:this.wave});return true;}
 spawn(boss=false){let lane=Math.floor(this.rng()*this.routes.length),r=this.rng();let type=boss?'boss':r<.12&&this.wave>2?'armored':r<.24&&this.wave>1?'bloater':r<.45?'runner':'shambler';let stats={shambler:[45,38,18],runner:[30,73,13],bloater:[150,28,45],armored:[230,28,30],boss:[700+this.wave*150,21,260]}[type];let scale=1+(this.wave-1)*.15;let difficulty=this.difficulty==='veteran'?1.3:this.difficulty==='story'?.72:1;let hp=stats[0]*scale*difficulty;let p=this.routes[lane][0];this.enemies.push({id:this.id++,x:p.x,y:p.y,lane,step:1,type,hp,maxHp:hp,speed:stats[1],damage:stats[2]*difficulty,slow:0,hit:0,wobble:this.rng()*6.28,offset:(this.rng()-.5)*28});}
 hurt(e,damage,source){if(e.hp<=0)return;e.hp-=damage*(e.type==='armored'&&source!==4&&source!==3&&source!=='strike'?.55:1);e.hit=.1;if(e.hp<=0){this.kills++;this.score+=e.type==='boss'?500:10;this.scrap+=Math.ceil((e.type==='boss'?95:e.type==='armored'?9:4)*this.scrapMult);this.effects.push({type:'death',x:e.x,y:e.y,t:.6,max:.6,color:e.type==='boss'?'#ed9b62':'#a3aa77'});if(e.type==='boss')this.emit('bossDown');}}
 strike(x,y){if(this.phase!=='wave'||this.cooldowns.strike>0)return false;this.cooldowns.strike=36*this.supportMult;this.effects.push({type:'strike',x,y,t:.8,max:.8});this.enemies.forEach(e=>{if(dist(e,{x,y})<175)this.hurt(e,360,'strike');});this.shake=.4;this.emit('strike');return true;}
 pulse(){if(this.phase!=='wave'||this.cooldowns.pulse>0)return false;this.cooldowns.pulse=24*this.supportMult;this.effects.push({type:'pulse',...this.core,t:.7,max:.7});this.enemies.forEach(e=>{if(dist(e,this.core)<340){e.slow=7;this.hurt(e,35,'strike');}});this.emit('pulse');return true;}
 chooseBoon(id){if(this.phase!=='reward'||!BOONS.some(b=>b.id===id))return false;this.boons.push(id);if(id==='damage')this.damageMult*=1.22;if(id==='range')this.rangeMult*=1.18;if(id==='economy')this.scrapMult*=1.35;if(id==='armor'){this.maxHp+=180;this.hp=Math.min(this.maxHp,this.hp+240);}if(id==='haste')this.rateMult*=.8;if(id==='support'){this.supportMult*=.7;this.cooldowns={strike:0,pulse:0};}if(this.wave%3===0){this.sector++;this.setSector();this.emit('sector');}else this.phase='build';this.emit('checkpoint');return true;}
 update(dt,input={}){
  if(!['convoy','wave','build'].includes(this.phase))return;this.time+=dt;this.shake=Math.max(0,this.shake-dt);for(const key in this.cooldowns)this.cooldowns[key]=Math.max(0,this.cooldowns[key]-dt);
  this.effects=this.effects.filter(e=>(e.t-=dt)>0);
  if(this.phase==='convoy'){
   let ix=input.x||0,iy=input.y||0,len=Math.hypot(ix,iy);if(len){ix/=Math.max(1,len);iy/=Math.max(1,len);this.core.a=Math.atan2(iy,ix);this.speed=Math.min(190,this.speed+dt*380);}else this.speed=Math.max(0,this.speed-dt*500);
   if(len){this.core.x=clamp(this.core.x+ix*this.speed*dt,220,1380);this.core.y=clamp(this.core.y+iy*this.speed*dt,560,850);}
   this.loot=this.loot.filter(l=>{if(dist(l,this.core)<55){this.scrap+=Math.round(l.value*this.scrapMult);this.emit('salvage',{amount:l.value});return false;}return true;});return;
  }
  if(this.phase!=='wave')return;
  this.waveTime+=dt;this.spawnClock-=dt;
  if(this.spawnLeft>0&&this.spawnClock<=0){this.spawn();this.spawnLeft--;this.spawnClock=Math.max(.19,.63-this.wave*.035);}
  if(this.wave%3===0&&!this.bossSpawned&&this.spawnLeft<10){this.spawn(true);this.bossSpawned=true;this.emit('boss');}
  for(const e of this.enemies){if(e.hp<=0)continue;e.slow=Math.max(0,e.slow-dt);e.hit=Math.max(0,e.hit-dt);let target=this.routes[e.lane][e.step],distance=dist(e,target),move=e.speed*(e.slow>0?.38:1)*dt;e.a=Math.atan2(target.y-e.y,target.x-e.x);if(distance<=move){e.x=target.x;e.y=target.y;e.step++;if(e.step>=this.routes[e.lane].length){this.hp-=e.damage;e.hp=0;this.shake=.17;this.emit('hit');}}else{e.x+=Math.cos(e.a)*move;e.y+=Math.sin(e.a)*move;}}
  if(this.hp<=0){this.hp=0;this.phase='lost';this.emit('lost');return;}
  for(const t of this.towers){t.cooldown-=dt;if(t.cooldown>0)continue;let def=TOWERS[t.type],range=def.range*this.rangeMult*(1+(t.level-1)*.09);let near=this.enemies.filter(e=>e.hp>0&&dist(e,t)<range);if(!near.length)continue;near.sort((a,b)=>t.type===4?b.maxHp-a.maxHp:dist(a,this.core)-dist(b,this.core));let target=near[0];t.a=Math.atan2(target.y-t.y,target.x-t.x);let damage=def.damage*this.damageMult*(1+(t.level-1)*.65);t.cooldown=def.rate*this.rateMult;
   let hits=t.type===1?this.enemies.filter(e=>e.hp>0&&dist(e,target)<80):t.type===2?[target,...near.filter(e=>e!==target&&dist(e,target)<125).slice(0,3)]:t.type===3?near.filter(e=>Math.abs(Math.atan2(Math.sin(Math.atan2(e.y-t.y,e.x-t.x)-t.a),Math.cos(Math.atan2(e.y-t.y,e.x-t.x)-t.a)))<.65):[target];
   for(const e of hits){if(t.type===2)e.slow=2;let alive=e.hp>0;this.hurt(e,damage,t.type);if(alive&&e.hp<=0)t.kills++;if(t.type===2)this.effects.push({type:'beam',x:target.x,y:target.y,tx:e.x,ty:e.y,color:def.color,t:.16,max:.16});}
   this.effects.push({type:t.type===1?'shell':t.type===3?'flame':'beam',x:t.x,y:t.y,tx:target.x,ty:target.y,color:def.color,t:t.type===1?.3:.13,max:t.type===1?.3:.13});this.emit('shot',{weapon:t.type});
  }
  this.enemies=this.enemies.filter(e=>e.hp>0);
  if(this.spawnLeft===0&&this.enemies.length===0){let reward=90+this.wave*15;this.scrap+=reward;this.hp=Math.min(this.maxHp,this.hp+50);this.score+=250;this.phase=this.wave===9?'won':'reward';this.emit(this.phase==='won'?'won':'clear',{reward});}
 }
 serialize(){return JSON.stringify({version:2,rig:this.rig,difficulty:this.difficulty,seed:this.seed,sector:this.sector,wave:this.wave,phase:this.phase,scrap:this.scrap,maxHp:this.maxHp,hp:this.hp,core:this.core,towers:this.towers,loot:this.loot,kills:this.kills,time:this.time,id:this.id,cooldowns:this.cooldowns,boons:this.boons,damageMult:this.damageMult,rangeMult:this.rangeMult,rateMult:this.rateMult,scrapMult:this.scrapMult,supportMult:this.supportMult,score:this.score});}
 static restore(json){let data=JSON.parse(json);if(data.version!==2||!['build','convoy'].includes(data.phase)||!Number.isInteger(data.sector)||data.sector<0||data.sector>2||!Array.isArray(data.towers)||data.towers.length>10||!Number.isFinite(data.hp)||data.hp<=0)throw Error('Invalid checkpoint');let game=new Expedition(data);Object.assign(game,data);if(data.phase==='build'){game.phase='convoy';game.deploy();}return game;}
}
