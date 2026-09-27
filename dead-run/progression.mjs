// Permanent upgrades are separate from the disposable run build.
export const SKILLS=[
 {id:'vitality',branch:'SURVIVAL',name:'Thick Skin',desc:'+10 starting health per rank.',art:'upgrade-vital',max:5,cost:25,step:20},
 {id:'plating',branch:'SURVIVAL',name:'Salvaged Plating',desc:'4% less incoming damage per rank.',art:'upgrade-armor',max:4,cost:60,step:35,parent:'vitality',requires:2},
 {id:'recovery',branch:'SURVIVAL',name:'Second Wind',desc:'Heal 3 more at each district per rank.',art:'upgrade-rations',max:3,cost:110,step:55,parent:'plating',requires:2},
 {id:'power',branch:'FIREPOWER',name:'Stopping Power',desc:'+8% starting weapon damage per rank.',art:'upgrade-caliber',max:5,cost:25,step:20},
 {id:'haste',branch:'FIREPOWER',name:'Quick Hands',desc:'5% faster starting fire rate per rank.',art:'upgrade-trigger',max:4,cost:60,step:35,parent:'power',requires:2},
 {id:'critical',branch:'FIREPOWER',name:'Weak Points',desc:'+5% critical-hit chance per rank.',art:'upgrade-crit',max:3,cost:110,step:55,parent:'haste',requires:2},
 {id:'fortune',branch:'SCAVENGING',name:'Scrap Hunter',desc:'+10% earned scrap per rank.',art:'upgrade-scavenge',max:5,cost:25,step:20},
 {id:'duration',branch:'SCAVENGING',name:'Overcharge',desc:'Power-ups last 10% longer per rank.',art:'upgrade-burn',max:4,cost:60,step:35,parent:'fortune',requires:2},
 {id:'prepared',branch:'SCAVENGING',name:'Well Prepared',desc:'+1 starting grenade and reroll per rank.',art:'upgrade-grenade',max:2,cost:110,step:55,parent:'duration',requires:2}
];
const integer=(value,max=Number.MAX_SAFE_INTEGER)=>Number.isFinite(value)?Math.min(max,Math.max(0,Math.floor(value))):0;
export function normalizeProfile(value={}){
 if(!value||typeof value!=='object')value={};
 const ranks={};for(const s of SKILLS){const rank=integer(value.ranks?.[s.id],s.max);ranks[s.id]=!s.parent||(ranks[s.parent]||0)>=s.requires?rank:0;}
 return {version:1,scrap:integer(value.scrap),runs:integer(value.runs),ranks};
}
export const skillCost=(skill,rank)=>skill.cost+skill.step*rank;
export function skillState(profile,id){
 const skill=SKILLS.find(s=>s.id===id);if(!skill)return null;
 const rank=profile.ranks[skill.id]||0,unlocked=!skill.parent||(profile.ranks[skill.parent]||0)>=skill.requires,cost=skillCost(skill,rank);
 return {skill,rank,cost,unlocked,maxed:rank>=skill.max,canBuy:unlocked&&rank<skill.max&&profile.scrap>=cost};
}
export function buySkill(profile,id){const state=skillState(profile,id);if(!state?.canBuy)return false;profile.scrap-=state.cost;profile.ranks[id]=state.rank+1;return true;}
export function applyProfile(run,profile){
 const p=normalizeProfile(profile).ranks;
 run.maxHp+=p.vitality*10;run.hp=run.maxHp;run.armor*=1-p.plating*.04;run.rations+=p.recovery*3;
 run.damage*=1+p.power*.08;run.interval/=1+p.haste*.05;run.crit+=p.critical*.05;
 run.powerDuration=1+p.duration*.1;run.scrapBonus=1+p.fortune*.1;run.grenades+=p.prepared;run.rerolls+=p.prepared;
}
export function runReward(run){return run.testRun?0:Math.floor((Math.floor(run.distance/100)+Math.floor(run.kills/4)+Math.floor(run.time/30)*2)*(run.scrapBonus||1));}
