import {grantMissionGold} from './economy';
const key='jump-daily-v1';
const day=()=>new Date().toISOString().slice(0,10);
type Daily={day:string;height:number;top10:number;rounds:number;seen:string[];claimed:string[]};
function load():Daily{try{const d=JSON.parse(localStorage.getItem(key)||'null');if(d?.day===day())return d;}catch{}return {day:day(),height:0,top10:0,rounds:0,seen:[],claimed:[]};}
export function missionProgress(round:string,height:number,place?:number){const d=load();if(place===undefined&&Math.floor(height/10)<=d.height)return;d.height=Math.max(d.height,Math.floor(height/10));if(place!==undefined&&!d.seen.includes(round)){d.seen.push(round);d.rounds++;if(place<=10)d.top10++;}localStorage.setItem(key,JSON.stringify(d));}
export function createMissions(root:HTMLElement,onReward:()=>void){
 const box=document.createElement('section');box.className='daily-missions';box.setAttribute('aria-label','Daily missions');root.append(box);
 const tasks=[{id:'height',label:'Climb 100m',target:100,gold:2},{id:'top10',label:'Finish top 10 twice',target:2,gold:4},{id:'rounds',label:'Finish 3 rounds',target:3,gold:3}] as const;
 const render=()=>{const d=load();box.innerHTML='<h3>Daily missions</h3><small>Resets at 00:00 UTC</small>';for(const t of tasks){const row=document.createElement('div'),label=document.createElement('span'),claim=document.createElement('button');label.textContent=`${t.label} · ${Math.min(d[t.id],t.target)}/${t.target}`;claim.textContent=d.claimed.includes(t.id)?'Claimed':`+${t.gold} gold`;claim.disabled=d.claimed.includes(t.id)||d[t.id]<t.target;claim.onclick=()=>{const now=load();if(now[t.id]<t.target||now.claimed.includes(t.id))return;if(grantMissionGold(now.day+':'+t.id,t.gold)){now.claimed.push(t.id);localStorage.setItem(key,JSON.stringify(now));onReward();render();}};row.append(label,claim);box.append(row);}};
 render();const timer=setInterval(render,30000);return ()=>{clearInterval(timer);box.remove();};
}
