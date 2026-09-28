import {SKILLS,skillState,buySkill} from './progression.mjs?v=encounters-v11';
import {assetUrl} from './visuals.mjs?v=encounters-v11';
export function createSkillTree(getProfile,onPurchase){
 const root=document.getElementById('skill-tree');let branch='SURVIVAL';
 function render(focusId){
  const profile=getProfile();document.getElementById('skill-wallet').textContent=profile.scrap.toLocaleString();
  root.replaceChildren(...['SURVIVAL','FIREPOWER','SCAVENGING'].map(name=>{
   const column=document.createElement('section');column.className='skill-branch'+(name===branch?' selected':'');column.setAttribute('aria-label',name);column.innerHTML=`<h3>${name}</h3>`;
   for(const skill of SKILLS.filter(s=>s.branch===name)){
    const state=skillState(profile,skill.id),button=document.createElement('button'),parent=SKILLS.find(s=>s.id===skill.parent);
    button.className='skill-node'+(!state.unlocked?' locked':'')+(state.maxed?' maxed':'');button.dataset.skill=skill.id;button.disabled=!state.canBuy;
    const status=state.maxed?'MAX RANK':!state.unlocked?`${parent.name} rank ${skill.requires} required`:`${state.cost} SCRAP${profile.scrap<state.cost?' · '+(state.cost-profile.scrap)+' MORE NEEDED':''}`;
    button.innerHTML=`<img src="${assetUrl(skill.art)}" alt=""><span class="skill-name">${skill.name}</span><span class="skill-rank">${state.rank} / ${skill.max}</span><span class="skill-desc">${skill.desc}</span><span class="rank-pips" aria-hidden="true">${Array.from({length:skill.max},(_,i)=>`<i class="${i<state.rank?'filled':''}"></i>`).join('')}</span><span class="skill-cost">${status}</span>`;
    button.setAttribute('aria-label',`${skill.name}, rank ${state.rank} of ${skill.max}. ${skill.desc} ${status}`);
    button.onclick=()=>{if(!buySkill(profile,skill.id))return;onPurchase();document.getElementById('skill-feedback').textContent=`${skill.name} upgraded to rank ${profile.ranks[skill.id]}. Applies next run.`;render(skill.id);};column.append(button);
   }return column;
  }));
  if(focusId){const target=root.querySelector(`[data-skill="${focusId}"]`);if(!target.disabled)target.focus();else document.getElementById('close-skills').focus();}
 }
 for(const button of document.querySelectorAll('[data-branch]'))button.onclick=()=>{branch=button.dataset.branch;for(const b of document.querySelectorAll('[data-branch]'))b.setAttribute('aria-pressed',String(b===button));render();};
 return {render};
}
