import {difficultyAt,POWERUPS,ZOMBIE_PRESSURE} from './endless.mjs?v=slots-v8';
import {applyProfile} from './progression.mjs?v=slots-v8';
export const SECTOR_LENGTH=450, FINISH=Infinity;
export const LANES=[-1.5,-.5,.5,1.5],ROLL_DURATION=.72;
export const MAPS=[{id:'dead-city',name:'Dead City',distance:FINISH}];
export const xpRequired=level=>60+(level-1)*35;
export const nearestLane=x=>LANES.reduce((a,b)=>Math.abs(b-x)<Math.abs(a-x)?b:a);
export const DISTRICTS=['THE QUARANTINE','BURNT QUARTER','DEAD INDUSTRY','HOSPITAL MILE','THE OUTSKIRTS','LAST EXIT'];
import {WEAPONS,replacementStats} from './arsenal.mjs?v=slots-v8';
import {CARDS} from './cards.mjs?v=slots-v8';
export {WEAPONS,CARDS};
export const XP_GAIN=.5;
export const SWAP_DURATION=.42;
export function rng(seed){let n=seed>>>0;return()=>{n+=0x6D2B79F5;let t=n;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
export const ROOF_HEIGHT=3;
export function convoy(seed=1,startGroup=0,count=4){
 const vehicles=[];
 for(let group=startGroup;group<startGroup+count;group++){
  const random=rng(seed^0x6ac052^Math.imul(group,7919));
  const start=150+group*625,lane=random()<.5?-1.5:1.5;
  for(let i=0;i<6;i++)vehicles.push({id:`vehicle-${group}-${i}`,group,kind:i===3?'truck':'bus',lane,at:start+i*32,end:start+(i+1)*32,height:ROOF_HEIGHT,ramp:i===0?18:0,exitRamp:i===5?18:0});
 }
 return vehicles;
}
export function platformHeight(p,at){return p.height*Math.min(1,p.ramp?Math.max(0,(at-p.at)/p.ramp):1,p.exitRamp?Math.max(0,(p.end-at)/p.exitRamp):1);}
export function killLaneSchedule(seed){
 const random=rng(seed^0xa67c82),schedule=[];let previous;
 for(let at=0;at<3150;at+=210){const choices=LANES.filter(l=>l!==previous),lane=choices[Math.floor(random()*choices.length)];schedule.push({at,end:at+210,lane});previous=lane;}
 return schedule;
}
export class Run{
 constructor(seed=Date.now(),weapon='carbine',map='dead-city',profile={}){
  this.seed=seed;this.random=rng(seed);this.weapon=Object.hasOwn(WEAPONS,weapon)?weapon:'carbine';Object.assign(this,WEAPONS[this.weapon]);
  Object.assign(this,{distance:0,time:0,speed:27,lane:0,x:0,y:0,vy:0,hp:100,maxHp:100,armor:1,invincible:0,chase:23,chaseRate:1,kills:0,supplies:0,grenades:2,blast:130,crit:0,burn:0,leech:0,scavenge:0,rations:0,rerolls:1,shotTimer:.4,dead:false,won:false,drafting:false,reason:'',nextRow:65,safeLane:0,id:0,sector:0,rows:0,nextCheckpoint:SECTOR_LENGTH});
  Object.assign(this,{lane:-.5,x:-.5,safeLane:-.5,lastLane:-.5,elevation:0,supportHeight:0,grounded:true,aim:0,firePose:0,roofTime:0,roll:0,rollQueued:false,xp:0,totalXp:0,level:1,spawnBudget:0,map:MAPS.some(m=>m.id===map)?map:'dead-city'});
  this.platforms=convoy(seed);this.killLanes=killLaneSchedule(seed);this.exits=this.platforms.filter(p=>p.exitRamp).map(p=>({lane:p.lane,start:p.end-p.exitRamp,end:p.end+65}));
  Object.assign(this,{nextPlatformGroup:4,nextKillAt:3150,nextPowerup:230+this.random()*100,powers:{minigun:0,stim:0,skateboard:0},powerDuration:1,scrapBonus:1,testRun:false,lastSurge:false});
  Object.assign(this,{stride:0,airTime:0,jumping:false,landing:0});
  Object.assign(this,{critDamage:2,chill:0,jumpPower:9,fireBonus:0,burnDuration:2.4,wildfire:0,fireGrenades:false,fireLeech:0,thorns:0,thornScaling:0,retribution:false,regen:0,choosingWeapon:false,weaponChoices:[],nextCrate:180,shotHand:0,slashTimer:0});
  applyProfile(this,profile);
  this.weaponSlots=[this.weapon,null];this.activeSlot=0;this.slotCooldowns=[0,0];this.swapTimer=0;this.swapFrom=this.weapon;
  this.entities=[];this.events=[];this.deck={};this.choices=[];this.generate();
 }
 add(kind,lane,at,extra={}){const e={id:++this.id,kind,lane,at,done:false,...extra};this.entities.push(e);return e;}
 platformAt(lane,at){return this.platforms.find(p=>Math.abs(p.lane-lane)<.46&&at>=p.at&&at<p.end);}
 clearExit(lane,at){return this.exits.some(e=>e.lane===lane&&at>=e.start&&at<e.end);}
 killLaneAt(at=this.distance){return (this.killLanes.find(k=>at>=k.at&&at<k.end)||this.killLanes.at(-1)).lane;}
 zombie(kind,lane,at){const d=difficultyAt(this.time+Math.max(0,at-this.distance)/Math.max(27,this.speed)),elite=this.random()<d.eliteChance,hp=({walker:38,runner:28,brute:135}[kind]||38)*.75*d.health*(elite?1.8:1),p=this.platformAt(lane,at);return this.add(kind,lane,at,{hp,maxHp:hp,elite,elevation:p?platformHeight(p,at):0,speed:kind==='runner'?d.runnerSpeed:0,damage:(kind==='brute'?32:22)*.75*d.damage*(elite?1.35:1),burning:0,hit:0});}
 ensureWorld(){
  while(150+this.nextPlatformGroup*625<this.distance+600){const vehicles=convoy(this.seed,this.nextPlatformGroup++,1);this.platforms.push(...vehicles);const p=vehicles.at(-1);this.exits.push({lane:p.lane,start:p.end-p.exitRamp,end:p.end+65});}
  while(this.nextKillAt<this.distance+600){const choices=LANES.filter(l=>l!==this.killLanes.at(-1).lane),random=rng(this.seed^Math.imul(this.nextKillAt,8191)),lane=choices[Math.floor(random()*choices.length)];this.killLanes.push({at:this.nextKillAt,end:this.nextKillAt+210,lane});this.nextKillAt+=210;}
  this.platforms=this.platforms.filter(p=>p.end>this.distance-30);this.exits=this.exits.filter(p=>p.end>this.distance-30);this.killLanes=this.killLanes.filter(p=>p.end>this.distance-30);
 }
 activatePowerup(kind,testing=false){
  if(!POWERUPS[kind]||this.dead||this.drafting||this.choosingWeapon)return false;
  if(testing)this.testRun=true;
  this.powers[kind]=POWERUPS[kind].duration*this.powerDuration;
  if(kind==='minigun'){this.shotTimer=0;this.aim=1;}
  this.events.push({type:'powerup',kind});return true;
 }
 openWeaponCrate(testing=false){
  if(this.dead||this.drafting||this.choosingWeapon)return false;
  if(testing)this.testRun=true;
  const pool=Object.keys(WEAPONS).filter(id=>!this.weaponSlots.includes(id));this.weaponChoices=[];
  while(this.weaponChoices.length<3)this.weaponChoices.push(pool.splice(Math.floor(this.random()*pool.length),1)[0]);
  this.choosingWeapon=true;this.events.push({type:'weaponcrate'});return true;
 }
 equipSlot(slot){
  const id=this.weaponSlots[slot],previous=this.weapon;
  this.slotCooldowns[this.activeSlot]=this.shotTimer;
  Object.assign(this,replacementStats(this,id));this.weapon=id;this.activeSlot=slot;this.name=WEAPONS[id].name;this.description=WEAPONS[id].description;
  this.shotTimer=this.slotCooldowns[slot];this.slashTimer=0;this.firePose=0;this.shotHand=0;this.aim=0;
  this.swapFrom=previous;this.swapTimer=SWAP_DURATION;this.events.push({type:'weaponswap',slot,name:WEAPONS[id].name});
 }
 swapWeapon(slot){
  if(this.dead||this.drafting||this.choosingWeapon||this.swapTimer>0||![0,1].includes(slot)||slot===this.activeSlot||!this.weaponSlots[slot])return false;
  this.equipSlot(slot);return true;
 }
 chooseWeapon(id,slot=this.activeSlot){
  if(!this.choosingWeapon||(id!=='keep'&&!this.weaponChoices.includes(id)))return false;
  if(id!=='keep'){
   if(![0,1].includes(slot))return false;
   this.weaponSlots[slot]=id;this.equipSlot(slot);this.slotCooldowns[slot]=this.shotTimer=0;
  }
  this.choosingWeapon=false;this.weaponChoices=[];this.events.push({type:'weaponchange',name:WEAPONS[this.weapon].name});this.checkLevelUp();return true;
 }
 get thornsDamage(){return this.thorns+this.maxHp*this.thornScaling;}
 get damageMultiplier(){return this.powers.stim>0?1.5:1;}
 get activeMinigun(){return this.powers.minigun>0;}
 get activeBoard(){return this.powers.skateboard>0;}
 generate(){
  this.ensureWorld();
  // Skip obsolete rows after a debug seek and retain a bounded live window.
  this.nextRow=Math.max(this.nextRow,this.distance-10);
  while(this.nextRow<this.distance+220){
   const at=this.nextRow,d=difficultyAt(this.time+Math.max(0,at-this.distance)/Math.max(27,this.speed)),nearCheckpoint=(at%SECTOR_LENGTH)>SECTOR_LENGTH-12||(at%SECTOR_LENGTH)<12;
   if(!nearCheckpoint){
    const killLane=this.killLaneAt(at),quiet=LANES.filter(l=>l!==killLane);this.safeLane=quiet[(this.rows+Math.floor(at/210))%quiet.length];
    this.spawnBudget+=d.pack;const count=Math.floor(this.spawnBudget);this.spawnBudget-=count;
    for(let i=0;i<count;i++){
     const pos=at+i*4,available=LANES.filter(l=>!this.clearExit(l,pos)&&!((p=>p&&pos<p.at+p.ramp+3)(this.platformAt(l,pos))));
     const roll=this.random(),preferred=i===0?LANES[this.rows%4]:this.random()<.72?killLane:LANES[Math.floor(this.random()*4)],lane=available.includes(preferred)?preferred:available[Math.floor(this.random()*available.length)];
     if(lane!==undefined)this.zombie(roll<d.bruteChance?'brute':roll<d.bruteChance+d.runnerChance?'runner':'walker',lane,pos);
    }
    if(this.rows%3===0){const lane=this.safeLane,pos=at+9,p=this.platformAt(lane,pos);this.add('supply',lane,pos,{elevation:p?platformHeight(p,pos):0});}
    if(this.rows%2===0){
     const available=LANES.filter(l=>l!==this.safeLane&&!this.platformAt(l,at+12)&&!this.clearExit(l,at+12)),lane=available[Math.floor(this.random()*available.length)],types=['car','barrier','gate','spikes','barrels'],kind=types[Math.floor(this.random()*types.length)];
     if(lane!==undefined)this.add(kind,lane,at+12,{elevation:0});
    }
    if(this.rows%5===3){const pos=at+11,p=this.platforms.find(p=>pos>p.at+p.ramp+5&&pos<p.end-5&&!this.clearExit(p.lane,pos));if(p)this.add(this.rows%2?'barrier':'gate',p.lane,pos,{elevation:p.height});}
   }
   this.rows++;this.nextRow+=d.spacing+this.random()*4;
  }
  if(this.nextCrate<this.distance+200){
   const at=Math.max(this.distance+65,this.nextCrate),available=LANES.filter(l=>!this.platformAt(l,at)&&!this.clearExit(l,at)&&!this.entities.some(e=>e.lane===l&&Math.abs(e.at-at)<12)),lane=available[Math.floor(this.random()*available.length)];
   if(lane!==undefined){this.add('weaponcrate',lane,at,{elevation:0});this.nextCrate=at+420+this.random()*220;}else this.nextCrate=at+35;
  }
  if(this.nextPowerup<this.distance+200){const at=Math.max(this.distance+75,this.nextPowerup),available=LANES.filter(l=>!this.platformAt(l,at)&&!this.clearExit(l,at)&&!this.entities.some(e=>e.lane===l&&e.kind!=='supply'&&Math.abs(e.at-at)<12)),lane=available[Math.floor(this.random()*available.length)];if(lane!==undefined){const kind=Object.keys(POWERUPS)[Math.floor(this.random()*3)];this.add('powerup',lane,at,{powerup:kind,elevation:0});}this.nextPowerup=at+330+this.random()*270;}
 }
 action(action){
  if(this.dead||this.won||this.drafting||this.choosingWeapon)return false;
  if(action==='left'||action==='right'){const next=Math.max(LANES[0],Math.min(LANES.at(-1),this.lane+(action==='left'?-1:1)));if(next===this.lane)return false;this.lastLane=this.lane;this.lane=next;return true;}
  if(action==='jump'&&this.grounded&&this.roll<=0){this.vy=this.jumpPower;this.grounded=false;this.rollQueued=false;this.jumping=true;this.airTime=0;this.landing=0;this.events.push({type:'jump'});return true;}
  if(action==='roll'&&this.roll<=0){if(!this.grounded){this.vy=Math.min(this.vy,-10);this.rollQueued=true;}else{this.roll=ROLL_DURATION;this.events.push({type:'roll'});}return true;}
  if(action==='grenade'&&this.grenades>0){this.grenades--;this.chase=Math.max(0,this.chase-22);for(const e of this.entities)if(e.hp>0&&e.at-this.distance<115&&e.at-this.distance>-8){if(this.fireGrenades)this.ignite(e);this.hit(e,this.blast*this.damageMultiplier,this.fireGrenades?'fire':'grenade');}this.events.push({type:'grenade'});return true;}
  return false;
 }
 ignite(e){if(this.burn>0&&!e.done)e.burning=this.burnDuration;}
 hit(e,damage,type='weapon'){
  if(e.done||!(e.hp>0))return;
  e.hp-=damage*(type==='fire'?1+this.fireBonus:1);e.hit=.14;
  if(e.hp>0)return;
  e.done=true;this.kills++;const xp=({walker:10,runner:14,brute:30}[e.kind]||10)*(e.elite?2:1)*XP_GAIN;
  this.xp+=xp;this.totalXp+=xp;this.chase=Math.max(0,this.chase-1.2);
  if(!this.dead)this.hp=Math.min(this.maxHp,this.hp+this.leech+(e.burning>0?this.fireLeech:0));
  this.events.push({type:'kill',lane:e.lane,z:e.at-this.distance,elevation:e.elevation||0,brute:e.kind==='brute',xp});
  if(e.burning>0&&this.wildfire){
   this.events.push({type:'wildfire',lane:e.lane,z:e.at-this.distance,elevation:e.elevation||0});
   for(const other of this.entities)if(!other.done&&other.hp>0&&Math.abs(other.at-e.at)<16&&Math.abs(other.lane-e.lane)<=1&&Math.abs((other.elevation||0)-(e.elevation||0))<1.5){this.ignite(other);this.hit(other,this.wildfire*this.damageMultiplier,'fire');}
  }
 }
 checkLevelUp(){if(this.dead||this.won||this.drafting||this.choosingWeapon||this.xp<xpRequired(this.level))return false;this.xp-=xpRequired(this.level);this.level++;this.drafting=true;this.rollCards();this.events.push({type:'levelup',level:this.level});return true;}
 targets(lane){return this.entities.filter(e=>{
  const z=e.at-this.distance;if(e.done||e.lane!==lane||z<=0||z>(this.activeMinigun?190:this.range)||!(e.hp>0))return false;
  if(this.activeMinigun)return true;
  if(this.weapon==='katana'&&Math.abs(this.elevation-(e.elevation||0))>1.8)return false;
  // A bus body stops a shot; a survivor on its roof can shoot over it.
  return !this.platforms.some(p=>p.lane===lane&&p.end>this.distance&&p.at<e.at&&(()=>{
   const at=Math.max(this.distance,p.at+p.ramp),t=Math.min(1,Math.max(0,(at-this.distance)/z));
   const bulletHeight=this.elevation+1.1+((e.elevation||0)+.9-this.elevation-1.1)*t;
   return at<e.at&&bulletHeight<platformHeight(p,at)-.05;
  })());
 }).sort((a,b)=>a.at-b.at).slice(0,this.activeMinigun?100:this.pierce);}
 aimLanes(){
  const lane=nearestLane(this.x);if(this.activeMinigun)return LANES;
  if(this.weapon==='scorpion'){
   const adjacent=LANES.filter(l=>Math.abs(l-lane)===1),fallback=lane<0?lane+1:lane-1;
   adjacent.sort((a,b)=>(this.targets(a)[0]?.at??Infinity)-(this.targets(b)[0]?.at??Infinity));
   return [lane,this.targets(adjacent[0]).length?adjacent[0]:fallback];
  }
  return this.spread?LANES.filter(l=>Math.abs(l-lane)<=1):[lane];
 }
 shoot(){
  if(this.swapTimer>0)return false;
  const split=this.weapon==='scorpion'&&!this.activeMinigun,lanes=this.aimLanes();
  if(!lanes.some(l=>this.targets(l).length))return false;
  let fired=false;
  for(const lane of lanes){
   const targets=this.targets(lane);
   if(!targets.length&&!split)continue;
   const critical=this.random()<Math.min(1,this.crit);
   for(const e of targets){const falloff=this.weapon==='shotgun'&&!this.activeMinigun?1-.35*(e.at-this.distance)/this.range:1;this.ignite(e);if(this.chill)e.chilled=3;this.hit(e,(this.activeMinigun?Math.max(180,this.damage*4):this.damage)*this.damageMultiplier*falloff*(split?.5:1)*(critical?this.critDamage:1));}
   this.events.push({type:this.weapon==='katana'&&!this.activeMinigun?'slash':'shot',lane,z:targets.length?targets[0].at-this.distance:this.range,elevation:targets[0]?.elevation||0,critical,hand:this.shotHand,weapon:this.activeMinigun?'minigun':this.weapon});fired=true;
  }
  if(fired){this.firePose=.12;this.aim=1;this.shotHand=1-this.shotHand;if(this.weapon==='katana'&&!this.activeMinigun)this.slashTimer=.28;}
  return fired;
 }
 hurt(damage,reason){if(this.invincible>0||this.dead||this.activeBoard)return;this.hp=Math.max(0,this.hp-damage*this.armor);this.invincible=1.15;this.chase=Math.min(100,this.chase+12);this.events.push({type:'hurt'});if(this.hp<=0){this.dead=true;this.reason=reason;this.events.push({type:'death'});}}
 rollCards(){
  const eligible=CARDS.filter(c=>(this.deck[c.id]||0)<c.max&&(!c.eligible||c.eligible(this)));
  // Endless runs must never strand a fully upgraded survivor in an empty draft.
  if(!eligible.length)eligible.push(CARDS.find(c=>c.id==='reserves'));
  this.choices=[];
  while(this.choices.length<3&&eligible.length){const weights=eligible.map(c=>({common:5,rare:3,epic:1.5}[c.rarity]));let roll=this.random()*weights.reduce((a,b)=>a+b,0),idx=0;while(idx<weights.length-1&&roll>=weights[idx])roll-=weights[idx++];this.choices.push(eligible.splice(idx,1)[0].id);}
  return this.choices;
 }
 choose(id){if(!this.drafting||!this.choices.includes(id))return false;const c=CARDS.find(c=>c.id===id);c.apply(this);this.deck[id]=(this.deck[id]||0)+1;this.drafting=false;this.choices=[];this.events.push({type:'upgrade',name:c.name});this.checkLevelUp();return true;}
 reroll(){if(!this.drafting||this.rerolls<=0)return false;this.rerolls--;this.rollCards();return true;}
 update(dt){
  if(this.dead||this.won||this.drafting||this.choosingWeapon||!Number.isFinite(dt)||dt<=0)return;
  // Bounded substeps keep collisions and weapons reliable at low frame rates.
  let remaining=Math.min(dt,.25);while(remaining>1e-8&&!this.dead&&!this.won&&!this.drafting&&!this.choosingWeapon){const step=Math.min(remaining,1/60);this.step(step);remaining-=step;}
 }
 step(dt){
  this.swapTimer=Math.max(0,this.swapTimer-dt);this.slotCooldowns=this.slotCooldowns.map(t=>Math.max(0,t-dt));
  this.slashTimer=Math.max(0,this.slashTimer-dt);if(this.regen&&this.hp<this.maxHp*.5)this.hp=Math.min(this.maxHp*.5,this.hp+this.regen*dt);
  const before=this.distance;this.time+=dt;const difficulty=difficultyAt(this.time);
  for(const kind of Object.keys(this.powers))this.powers[kind]=Math.max(0,this.powers[kind]-dt);
  this.speed=difficulty.speed*(this.activeBoard?1.35:1);this.distance+=this.speed*dt;
  if(difficulty.surge&&!this.lastSurge)this.events.push({type:'surge'});this.lastSurge=difficulty.surge;
  this.landing=Math.max(0,this.landing-dt);
  if(this.grounded&&this.roll<=0&&this.landing===0)this.stride=(this.stride+dt*this.speed/15)%1;
  if(!this.grounded)this.airTime+=dt;
  this.x+=(this.lane-this.x)*Math.min(1,dt*17);this.roll=Math.max(0,this.roll-dt);this.invincible=Math.max(0,this.invincible-dt);
  // The hand-held shield smashes vehicle bodies before their wall collision.
  // Roofs under the rider's feet remain support until the rider leaves them.
  if(this.activeBoard){this.platforms=this.platforms.filter(p=>{
   const carrying=this.grounded&&this.supportHeight>0&&this.distance>=p.at&&this.distance<p.end;
   if(!carrying&&Math.abs(p.lane-this.x)<.65&&p.end>this.distance&&p.at<this.distance+10&&this.elevation<p.height-.5){
    this.events.push({type:'crush',kind:p.kind,lane:p.lane,z:Math.max(4,p.at-this.distance),elevation:0});
    for(const e of this.entities)if(e.lane===p.lane&&e.at>=p.at&&e.at<p.end)e.elevation=0;
    return false;
   }return true;
  });}
  const platform=this.platformAt(this.x,this.distance),floor=platform?platformHeight(platform,this.distance):0,previousHeight=this.elevation;
  const onDescent=platform?.exitRamp&&this.distance>platform.end-platform.exitRamp;
  if(this.grounded&&floor<this.elevation-.12&&!onDescent){this.grounded=false;this.vy=0;this.jumping=false;this.airTime=0;}
  if(!this.grounded){this.elevation+=this.vy*dt-11*dt*dt;this.vy-=22*dt;}
  if((this.grounded&&floor<=previousHeight+.18)||(!this.grounded&&this.elevation<=floor&&previousHeight>=floor-.12)){
   const landed=!this.grounded;this.elevation=floor;this.vy=0;this.grounded=true;if(landed){this.landing=.12;this.stride=0;this.jumping=false;this.events.push({type:'land'});}if(this.rollQueued){this.rollQueued=false;this.action('roll');}
  }else if(platform&&this.elevation<floor-.2){
   if(this.vehicleHit!==platform.id){this.vehicleHit=platform.id;this.hurt(36,'Use the striped ramp to reach the bus roof. Jump broken connections and change lanes to drop down.');}
   this.lane=this.lastLane!==platform.lane?this.lastLane:nearestLane(platform.lane+(platform.lane>0?-1:1));
  }
  this.supportHeight=this.grounded?floor:(platform&&this.elevation>=floor?floor:0);this.y=Math.max(0,this.elevation-this.supportHeight);
  if(this.elevation>2.8)this.roofTime+=dt;
  // Staying underleveled remains playable, but avoidance alone cannot keep
  // the pursuing horde at bay through the later districts.
  const levelGap=Math.max(0,this.sector+1-this.level);
  this.chase=Math.min(100,Math.max(0,this.chase+dt*(this.activeBoard?-5:(1.6+this.time/150)*(1+levelGap*.45)*this.chaseRate*ZOMBIE_PRESSURE)));
  if(this.chase>=100){this.hurt(20*difficulty.damage,'The horde closed in. Kills, supplies and grenades push it back.');this.chase=78;}
  this.firePose=Math.max(0,this.firePose-dt);this.shotTimer=Math.max(0,this.shotTimer-dt);
  const hasTarget=this.swapTimer<=0&&this.roll<=0&&this.aimLanes().some(l=>this.targets(l).length),wantAim=hasTarget&&(this.shotTimer<.17||this.firePose>0);
  this.aim=Math.max(0,Math.min(1,this.aim+(wantAim?8:-7)*dt));
  if(hasTarget&&this.shotTimer<=0&&this.aim>=.85){if(this.shoot())this.shotTimer=this.activeMinigun?.065:this.interval;}
  for(const e of this.entities){
   if(e.done)continue;e.hit=Math.max(0,(e.hit||0)-dt);
   if(e.burning>0&&e.hp>0){const burningTime=Math.min(dt,e.burning);if(this.burn)this.hit(e,this.burn*this.damageMultiplier*burningTime,'fire');e.burning=Math.max(0,e.burning-dt);if(e.done)continue;}
   const slow=e.chilled>0?this.chill:0;e.chilled=Math.max(0,(e.chilled||0)-dt);
   if(slow&&e.hp>0)e.at+=this.speed*slow*dt;
   if(e.kind==='runner'){const next=e.at-e.speed*(1-slow)*dt,exit=this.exits.find(x=>x.lane===e.lane&&next<x.end&&e.at>=x.end&&this.distance<x.end);e.at=exit?exit.end:next;const p=this.platformAt(e.lane,e.at);e.elevation=p?platformHeight(p,e.at):0;}
   const z=e.at-this.distance,old=e.at-before,aligned=Math.abs(e.lane-this.x)<.53,height=this.elevation-(e.elevation||0);
   if(this.activeBoard&&z<8&&z>-4&&Math.abs(e.lane-this.x)<.8&&Math.abs(height)<1.6&&e.kind!=='supply'&&e.kind!=='powerup'&&e.kind!=='weaponcrate'){
    if(e.hp>0)this.hit(e,e.hp);else{e.done=true;this.events.push({type:'crush',kind:e.kind,lane:e.lane,z,elevation:e.elevation||0});}continue;
   }
   if(z<2&&old>-3&&aligned){
    if(e.kind==='weaponcrate'){if(Math.abs(height)<1){e.done=true;this.openWeaponCrate();return;}}
    else if(e.kind==='powerup'){if(Math.abs(height)<1){e.done=true;this.activatePowerup(e.powerup);}}
    else if(e.kind==='supply'){if(Math.abs(height)<1){e.done=true;this.supplies++;this.hp=Math.min(this.maxHp,this.hp+8+this.scavenge);this.chase=Math.max(0,this.chase-8);if(this.supplies%5===0)this.grenades=Math.min(9,this.grenades+1);this.events.push({type:'supply'});}}
    else{
     const avoided=height>2||height<-.7||(['barrier','barrels','spikes'].includes(e.kind)&&height>(e.kind==='spikes'?.35:.7))||(e.kind==='gate'&&this.roll>0)||(e.kind==='walker'&&height>1.1)||(e.kind==='runner'&&height>1.1);
     if(!avoided&&!e.collided){e.collided=true;this.hurt(e.damage||(e.kind==='car'?36:22),{car:'Change lanes to avoid wrecks.',barrier:'Jump barricades.',barrels:'Jump barrel piles or change lanes.',spikes:'Jump spike strips.',gate:'Dodge roll under the wire with ↓.',brute:'Use a grenade or change lanes to avoid brutes.',walker:'Kill zombies to earn XP and upgrades.',runner:'Jump or change lanes to avoid runners.'}[e.kind]);
      if(e.hp>0&&this.thornsDamage>0){const damage=this.thornsDamage*this.damageMultiplier;this.events.push({type:'thorns',lane:e.lane,z,elevation:e.elevation||0});this.hit(e,damage,'thorns');
       if(this.retribution)for(const other of this.entities)if(other!==e&&!other.done&&other.hp>0&&Math.abs(other.at-e.at)<12&&Math.abs(other.lane-e.lane)<=1&&Math.abs((other.elevation||0)-(e.elevation||0))<1.5)this.hit(other,damage*.5,'thorns');
      }
     }
    }
   }
   if(z<-7)e.done=true;
  }
  this.entities=this.entities.filter(e=>!e.done);this.generate();
  if(this.dead)return;
  if(this.distance>=this.nextCheckpoint){this.sector++;this.nextCheckpoint+=SECTOR_LENGTH;this.chase=Math.max(10,this.chase-15);this.hp=Math.min(this.maxHp,this.hp+5+this.rations);this.events.push({type:'district'});}
  this.checkLevelUp();
 }
}
