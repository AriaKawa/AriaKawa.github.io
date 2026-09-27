export const RANDOM_EVENTS={
 horde:{name:'Horde Incoming',duration:14,desc:'Walkers flood every lane. Shoot, jump, survive.',color:'#df865b'},
 swords:{name:'Sword Fight',duration:16,desc:'Runners carry swords. Contact deals 2.5× damage.',color:'#e6b779'},
 buckets:{name:'Bucket Heads',duration:16,desc:'Bucket helmets block headshot critical bonuses.',color:'#acbcc6'},
 clear:{name:'Clear Skies',duration:12,desc:'No zombies. Double speed. Survive for 60 XP.',color:'#9fd8d6'},
 supply:{name:'Supply Drop',duration:16,desc:'Double health supply pickups on the track.',color:'#b5d484'},
};
export function initEvents(run,random){
 run.eventRandom=random;run.activeEvent=null;run.eventWarning=null;run.eventBag=[];run.lastEvent=null;run.nextEventAt=45+random()*20;
}
export function tickEvents(run){
 if(run.activeEvent&&run.time>=run.activeEvent.endsAt){
  const id=run.activeEvent.id;run.activeEvent=null;
  if(id==='clear'&&!run.dead){run.xp+=60;run.totalXp+=60;}
  run.events.push({type:'eventend',id,reward:id==='clear'?60:0});run.nextEventAt=run.time+40+run.eventRandom()*20;
 }
 if(!run.activeEvent&&!run.eventWarning&&run.time>=run.nextEventAt-4){
  if(!run.eventBag.length){run.eventBag=Object.keys(RANDOM_EVENTS);for(let i=run.eventBag.length-1;i>0;i--){const j=Math.floor(run.eventRandom()*(i+1));[run.eventBag[i],run.eventBag[j]]=[run.eventBag[j],run.eventBag[i]];}if(run.eventBag.at(-1)===run.lastEvent)[run.eventBag[0],run.eventBag[run.eventBag.length-1]]=[run.eventBag.at(-1),run.eventBag[0]];}
  run.eventWarning={id:run.eventBag.pop(),startsAt:run.nextEventAt};run.events.push({type:'eventwarning',id:run.eventWarning.id});
 }
 if(run.eventWarning&&run.time>=run.eventWarning.startsAt)startEvent(run,run.eventWarning.id);
}
export function startEvent(run,id){
 if(!RANDOM_EVENTS[id]||run.activeEvent||run.dead)return false;
 run.activeEvent={id,endsAt:run.time+RANDOM_EVENTS[id].duration,nextHorde:run.distance+40};run.eventWarning=null;run.lastEvent=id;
 // Existing generated rows must change too: the live window extends 220 m ahead.
 if(id==='clear'||id==='horde')run.entities=run.entities.filter(e=>!(e.hp>0));
 if(id==='supply')for(const e of [...run.entities])if(e.kind==='supply'&&!e.done&&e.at>run.distance+15)addBonusSupply(run,e);
 run.events.push({type:'eventstart',id});return true;
}
export function addBonusSupply(run,e){
 if(e.bonusSupply||e.doubled)return;e.doubled=true;
 // Paired pickups share a safe lane and surface, avoiding new obstacle conflicts.
 run.add('supply',e.lane,e.at+2,{elevation:e.elevation||0,bonusSupply:true});
}
export function fillHorde(run,lanes){
 if(run.activeEvent?.id!=='horde')return;
 while(run.activeEvent.nextHorde<run.distance+220){const at=run.activeEvent.nextHorde;
  for(const lane of lanes){const p=run.platformAt(lane,at);if(!run.clearExit(lane,at)&&!(p&&at<p.at+p.ramp+3))run.zombie('walker',lane,at);}
  run.activeEvent.nextHorde+=16;
 }
}
