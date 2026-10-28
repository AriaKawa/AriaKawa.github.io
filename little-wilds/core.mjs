import{isFalling}from './carry.mjs';
import{wander}from './wander.mjs';
export const TYPES=[{name:'Mossling',title:'The small beginnings',cost:12,power:1,tier:1,desc:'Patient little paws. Coaxes moss and grass from the dust.'},{name:'Petalkin',title:'A little color returns',cost:90,power:2.4,tier:2,need:'bloom',desc:'A sunny soul that grows wildflowers and fragrant ferns.'},{name:'Rainwisp',title:'Every drop, a promise',cost:320,power:4,tier:3,need:'rain',desc:'Nourishes shrubs and young trees. Gathers extra dew.'},{name:'Elderoot',title:'The forest remembers',cost:1100,power:8,tier:4,need:'elder',desc:'An ancient, gentle guardian. Raises flowering woodland.'}];
export const UPGRADES=[
 {id:'roots',name:'Gentle roots',desc:'+35% life from every planting.',cost:20,dew:0,max:5,parents:[],kind:'growth'},
 {id:'steps',name:'Wandering feet',desc:'Spirits work 20% faster.',cost:35,dew:0,max:5,parents:[],kind:'speed'},
 {id:'bloom',name:'First blossoms',desc:'Unlock Petalkin and wildflowers.',cost:70,dew:5,max:1,parents:['roots'],kind:'unlock'},
 {id:'harvest',name:'Generous earth',desc:'+30% seeds from every planting.',cost:80,dew:8,max:5,parents:['steps'],kind:'yield'},
 {id:'rain',name:'Call the rain',desc:'Unlock Rainwisps and young trees.',cost:230,dew:25,max:1,parents:['bloom'],kind:'unlock'},
 {id:'dew',name:'Morning dew',desc:'+50% dew gathered by spirits.',cost:180,dew:15,max:4,parents:['harvest'],kind:'yield'},
 {id:'elder',name:'Ancient promise',desc:'Unlock Elderoots and flowering trees.',cost:720,dew:65,max:1,parents:['rain'],kind:'unlock'},
 {id:'harmony',name:'Wild harmony',desc:'+25% life from all spirits.',cost:400,dew:40,max:4,parents:['rain','dew'],kind:'growth'}];
export const W=96,H=64,N=W*H,MAX=12;
export function fresh(){return {v:2,seeds:0,dew:0,memories:0,earnedMemories:0,cycle:1,age:0,upgrades:{},spirits:[{type:0,x:W/2,y:H/2,target:0,work:0}],land:Array(N).fill(0),cover:Array(N).fill(0),last:Date.now(),paused:false,totalLife:0};}
export const level=(s,id)=>s.upgrades[id]||0;
export function restoration(s){return s.land.reduce((a,b)=>a+b,0)/(N*MAX);}
export function spiritCost(s,t){return Math.floor(TYPES[t].cost*Math.pow(1.55,s.spirits.filter(a=>a.type===t).length-(t===0?1:0)));}
export function summon(s,t){const def=TYPES[t];if(!def||s.spirits.length>=40||(def.need&&!level(s,def.need)))return false;const cost=spiritCost(s,t);if(s.seeds<cost)return false;s.seeds-=cost;s.spirits.push({type:t,x:W/2-1+Math.random()*2,y:H/2-1+Math.random()*2,target:-1,work:0});return true;}
export function upgradeCost(s,u){return {seeds:Math.floor(u.cost*Math.pow(1.9,level(s,u.id))),dew:Math.floor(u.dew*Math.pow(1.6,level(s,u.id)))};}
export function buy(s,id){const u=UPGRADES.find(u=>u.id===id);if(!u||level(s,id)>=u.max||u.parents.some(p=>!level(s,p)))return false;const c=upgradeCost(s,u);if(s.seeds<c.seeds||s.dew<c.dew)return false;s.seeds-=c.seeds;s.dew-=c.dew;s.upgrades[id]=level(s,id)+1;return true;}
export const prestigeReward=s=>restoration(s)>=.25?Math.floor(restoration(s)*12):0;
export function prestige(s){const reward=prestigeReward(s);if(!reward)return null;const n=fresh();n.memories=s.memories+reward;n.earnedMemories=n.memories;n.cycle=s.cycle+1;n.seeds=12;return n;}
const capacity=s=>3*(1+Math.max(...s.spirits.map(a=>a.type)));
export function nurture(s,a,index,amount,onGrow,walking=false){
 if(!s.cover)s.cover=s.land.map(v=>Math.min(.3,v*.04));
 const power=TYPES[a.type].power*(1+level(s,'roots')*.35+level(s,'harmony')*.25)*(1+s.memories*.1),grown=Math.max(0,Math.min(capacity(s)-s.land[index],power*amount));
 const before=s.cover[index];s.cover[index]=Math.min(1,before+(walking?.022:.055));
 s.land[index]+=grown;s.totalLife+=grown;const yieldLife=grown||power*amount*.35;
 s.seeds+=yieldLife*(1+level(s,'harvest')*.3)*1.4;s.dew+=yieldLife*.12*(a.type===2?2:1)*(1+level(s,'dew')*.5);
 onGrow?.(index,Math.max(grown,s.cover[index]-before),a.type);
}
export function tick(s,dt,onGrow,carried=null){
 if(s.paused)return;s.age+=dt;
 for(const a of s.spirits){
  if(a===carried||isFalling(a))continue;
  if(a.target<0||a.work===0||!Number.isFinite(a.goalX)||!Number.isFinite(a.goalY))wander(s,a);
  const dx=a.goalX-a.x,dy=a.goalY-a.y,d=Math.hypot(dx,dy),speed=2.1*(1+level(s,'steps')*.2);
  if(d>.08){const m=Math.min(1,speed*dt/d);a.x+=dx*m;a.y+=dy*m;a.work=.001;a.stride+=Math.min(dt,d/speed);
   while(a.stride>=.7){a.stride-=.7;const index=Math.round(a.y)*W+Math.round(a.x);nurture(s,a,index,.18,onGrow,true);}continue;}
  a.work+=dt*(1+level(s,'steps')*.2);if(a.work<a.rest)continue;
  nurture(s,a,Math.round(a.y)*W+Math.round(a.x),.7,onGrow);wander(s,a);
 }
}
export function offline(s,seconds){const duration=Math.min(14400,Math.max(0,seconds));const before={seeds:s.seeds,dew:s.dew};for(let t=0;t<duration;t++)tick(s,Math.min(1,duration-t));return {seconds:duration,seeds:s.seeds-before.seeds,dew:s.dew-before.dew};}
export function validate(o){if(o?.v===1&&o.land?.length===384){const land=Array(N).fill(0);for(let y=0;y<16;y++)for(let x=0;x<24;x++)land[(y+24)*W+x+36]=o.land[y*24+x];o={...o,v:2,land,spirits:o.spirits.map(a=>({...a,x:a.x+36,y:a.y+24,target:-1,work:0}))};}if(!o||o.v!==2||!Array.isArray(o.land)||o.land.length!==N||!Array.isArray(o.spirits)||o.spirits.length<1||o.spirits.length>40)throw Error('Not a Little Wilds save.');for(const k of ['seeds','dew','memories','cycle','age','totalLife','last'])if(!Number.isFinite(o[k])||o[k]<0)throw Error('Invalid save values.');if(o.land.some(x=>!Number.isFinite(x)||x<0||x>MAX))throw Error('Invalid land.');for(const a of o.spirits)if(!Number.isInteger(a.type)||a.type<0||a.type>3||!Number.isFinite(a.x)||!Number.isFinite(a.y)||!Number.isFinite(a.work)||!Number.isInteger(a.target)||a.target< -1||a.target>=N)throw Error('Invalid spirit.');if(o.cover===undefined)o.cover=o.land.map(v=>Math.min(.3,v*.04));if(!Array.isArray(o.cover)||o.cover.length!==N||o.cover.some(v=>!Number.isFinite(v)||v<0||v>1))throw Error('Invalid grass cover.');for(const a of o.spirits){for(const k of ['goalX','goalY','heading','stride','rest'])if(a[k]!==undefined&&!Number.isFinite(a[k]))throw Error('Invalid wandering state.');if(a.stride!==undefined&&(a.stride<0||a.stride>1))throw Error('Invalid walking timer.');if(a.goalX!==undefined&&(a.goalX<0||a.goalX>W-1)||a.goalY!==undefined&&(a.goalY<0||a.goalY>H-1))throw Error('Invalid destination.');}if(!o.upgrades||typeof o.upgrades!=='object')throw Error('Invalid upgrades.');for(const [k,v]of Object.entries(o.upgrades)){const u=UPGRADES.find(u=>u.id===k);if(!u||!Number.isInteger(v)||v<0||v>u.max)throw Error('Invalid upgrade.');}return o;}





