import { CONVOYS,TURRETS,SUPPLY_COSTS,hideout,purchase,convoyStats } from '../game/Hideout';
import { EQUIPMENT_INFO } from '../game/Equipment';
import { TOWER_INFO } from '../game/constants';
import type { EquipmentType, TowerType } from '../game/types';
import Phaser from 'phaser';
import { campMap } from '../ui/CampMap';
import type { GameClient } from '../net/GameClient';
import { playBackgroundMusic } from '../audio/BackgroundMusic';
import { primeConvoyEngineAudio } from '../audio/ConvoyEngineAudio';
import { primeCombatAudio } from '../audio/CombatAudio';
import { activeCharacter, loadCampaign, saveCampaign, createCharacter, buyUpgrade, upgradeCost, UPGRADES, type Upgrade } from '../game/Campaign';
const esc = (s: string) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export class MenuScene extends Phaser.Scene {
  private section = 'expeditions';
  private launching = false;
  private selectedItem = '';
  private controlsOpen = false;
  constructor() { super('MenuScene'); }
  create(): void {
    document.querySelector<HTMLElement>('#main-menu')!.hidden = false;
    document.querySelector<HTMLElement>('#hud')!.hidden = true;
    this.launching = false; this.game.canvas.style.opacity = '0';
    const c = loadCampaign(); saveCampaign(c); const ch = activeCharacter(c);
    document.querySelector<HTMLButtonElement>('#open-expeditions')!.onclick = () => this.render('expeditions');
    document.querySelector<HTMLButtonElement>('#open-hideout')!.onclick = () => this.render('hideout');
    document.querySelector<HTMLButtonElement>('#menu-settings')!.onclick = () => { document.querySelector<HTMLElement>('#pause-overlay')!.hidden = false; document.querySelector<HTMLElement>('#pause-main-actions')!.hidden = true; document.querySelector<HTMLElement>('#settings-panel')!.hidden = false; };
    if (this.registry.get('showHideout')) { this.registry.set('showHideout', false); this.render('hideout'); }
    else document.querySelector<HTMLElement>('#campaign-panel')!.hidden = true;
  }
  private render(section = this.section): void {
    if(section!==this.section){this.controlsOpen=false;this.selectedItem='';} this.section = section; const c = loadCampaign(); const ch = activeCharacter(c);
    const p = document.querySelector<HTMLElement>('#campaign-panel')!; p.hidden = false; p.classList.toggle('immersive',section!=='expeditions');
    const away = c.slots.some(s => s?.status === 'alive' && s.run?.bases?.length);
    p.innerHTML = `<header class="hideout-top"><h2>${section==='expeditions'?'JOIN THE EXPEDITION':''}</h2>${section==='expeditions'?'':`<div class="bank"><span>XP<strong>${c.bank.xp}</strong></span><span>SCRAP<strong>${c.bank.scrap}</strong></span></div>`}<button data-close aria-label="Back to menu">✕</button></header>${section==='expeditions'||section==='hideout'?'': '<nav class="hideout-nav"><button data-tab="hideout">← BASE CAMP</button></nav>'}<div class="hideout-content" id="hideout-content"></div>`;
    const body = p.querySelector<HTMLElement>('#hideout-content')!;
    if (section === 'expeditions') {
      body.innerHTML = `<div class="save-grid">${c.slots.map((s,i) => `<button class="save-card ${s?.status==='alive'?'occupied':'empty'}" data-slot="${i}" aria-label="${s?.status==='alive'?'Continue '+esc(s.name):'Start new character in slot '+(i+1)}">${s?.status==='alive'?`<div class="convoy-portrait"></div><h4>${esc(s.name)}</h4><p>${s.xp} XP</p><span class="slot-action">CONTINUE →</span>`:'<span class="empty-plus">+</span>'}</button>`).join('')}</div><button class="hero-secondary slots-hideout" data-tab="hideout">HIDEOUT</button>`;
      body.querySelectorAll<HTMLButtonElement>('[data-slot]').forEach(b => b.onclick = () => {
        if(this.launching) return;
        c.selected = Number(b.dataset.slot); saveCampaign(c);
        if(activeCharacter(c)?.status !== 'alive') createCharacter(c, ['Roadwarden','Rook','Mara'][c.selected]);
        void this.begin();
      });
    } else if (section === 'hideout') {
      body.innerHTML = campMap();
    } else {
      const h=hideout(c);
      const button=(kind:string,id:string,stat:string,level:number,cost:number)=>`<button data-buy="${kind}" data-id="${id}" data-stat="${stat}" ${level>=5||c.bank.scrap<cost?'disabled':''}>${level>=5?'MAX LEVEL':cost+' SCRAP · UPGRADE'}</button>`;
      if(section==='turrets') {
        const id=TURRETS.includes(this.selectedItem)?this.selectedItem:TURRETS[0];this.selectedItem=id;const level=h.turrets[id]||0;
        body.innerHTML=`<h3>Turret workshop</h3><div class="item-bar">${TURRETS.map(t=>`<button data-item="${t}" class="${id===t?'selected':''}">${TOWER_INFO[t as TowerType].name}<small>LV ${h.turrets[t]||0}</small></button>`).join('')}</div><article class="upgrade-card"><h4>${TOWER_INFO[id as TowerType].name}</h4><p>Permanent fabrication · Level ${level} / 5</p><p>Each level adds 15% base damage, 4% range and 5% fire rate. Every new turret starts with these bonuses, across all survivors.</p>${button('turret',id,'',level,125*(level+1))}</article>`;
      } else if(section==='armor') {
        const rig=CONVOYS.find(v=>v.id===this.selectedItem)||CONVOYS.find(v=>v.id===h.convoy)||CONVOYS[0];this.selectedItem=rig.id;const u=h.convoys[rig.id]||{};
        body.innerHTML=`<h3>Convoy bay</h3><div class="item-bar convoy-bar">${CONVOYS.map(v=>`<button data-item="${v.id}" class="${v.id===rig.id?'selected':''}">${v.name}<small>${v.id===h.convoy?'EQUIPPED':'AVAILABLE'}</small></button>`).join('')}${Array.from({length:7},(_,i)=>`<button disabled aria-label="Locked convoy ${i+4}">?<small>LOCKED</small></button>`).join('')}</div><h4>${rig.name}</h4><p>${rig.description} · ${rig.hull} base hull · 6 turret slots</p><button data-equip="${rig.id}" ${away?'disabled':''}>${rig.id===h.convoy?'EQUIPPED':'EQUIP CONVOY'}</button><p>${away?'Extract all convoys to change the equipped rig.':'Selected rig applies on your next insertion.'}</p><div class="upgrade-grid">${[['health','Hull integrity','+150 health'],['speed','Engine speed','+5% base speed'],['capacity','Turret capacity','+2 turret slots']].map(([stat,name,desc])=>`<article class="upgrade-card"><h4>${name}</h4><p>${desc} per level · ${u[stat]||0} / 5</p>${button('convoy',rig.id,stat,u[stat]||0,100*((u[stat]||0)+1))}</article>`).join('')}</div>`;
      } else if(section==='field') {
        body.innerHTML=`<h3>Field supply shop</h3><p>Purchased supplies travel with the next convoy you launch. Consumed on use; lost if that survivor dies.</p><div class="supply-grid">${Object.entries(SUPPLY_COSTS).map(([id,cost])=>{const info=EQUIPMENT_INFO[id as EquipmentType];return `<article class="upgrade-card"><h4>${info.name}</h4><small>${id==='airstrike'?'SHOP EXCLUSIVE · NEVER IN SALVAGE':'FIELD SUPPLY'}</small><p>${info.description}</p><p>In locker: ${h.supplies[id as EquipmentType]||0}</p><button data-buy="supply" data-id="${id}" ${c.bank.scrap<cost?'disabled':''}>BUY · ${cost} SCRAP</button></article>`;}).join('')}</div>`;
      } else if(section==='market') body.innerHTML='<h3>Player market</h3><div class="market-empty"><h4>Trading offline</h4><p>The stalls are closed. Player listings and trades will appear here when the market opens.</p><button disabled>MARKET UNAVAILABLE</button></div>';
    }
    const interiors: Record<string, [string,string]> = { armor:['convoy-bay','Armored convoy in the garage'], turrets:['turret-workshop','Turret being serviced in the workshop'], field:['field-upgrades','Supplies inside the field tent'], market:['player-market','Salvage stalls in the player market'] };
    if (interiors[section]) {
      const [asset,alt] = interiors[section];
      const stage = document.createElement('div'); stage.className='workshop-stage';
      const art = document.createElement('img'); art.className='workshop-art'; art.src='./assets/'+asset+'.png'; art.alt=alt;
      const controls=document.createElement('div'); controls.className='workshop-controls'; controls.hidden=!this.controlsOpen; controls.setAttribute('role','dialog'); controls.setAttribute('aria-label','Workshop controls');
      const close=document.createElement('button');close.textContent='CLOSE ×';close.onclick=()=>{this.controlsOpen=false;controls.hidden=true;open.focus();};controls.append(close);
      while(body.firstChild) controls.append(body.firstChild);
      const open=document.createElement('button');open.className='open-workshop';open.textContent=section==='field'?'OPEN SUPPLY SHOP':section==='market'?'OPEN MARKET':'OPEN UPGRADES';open.onclick=()=>{this.controlsOpen=true;controls.hidden=false;close.focus();};
      controls.onkeydown=e=>{if(e.key==='Escape'){close.click();}if(e.key==='Tab'){const nodes=Array.from(controls.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'));const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}};
      stage.append(art,open,controls); body.append(stage);
    }
    p.querySelectorAll<HTMLButtonElement>('[data-item]').forEach(b=>b.onclick=()=>{this.selectedItem=b.dataset.item!;this.render();p.querySelector<HTMLButtonElement>('[data-item="'+this.selectedItem+'"]')?.focus();});
    p.querySelectorAll<HTMLButtonElement>('[data-buy]').forEach(b=>b.onclick=()=>{purchase(b.dataset.buy!,b.dataset.id!,b.dataset.stat);this.render();});
    p.querySelectorAll<HTMLButtonElement>('[data-equip]').forEach(b=>b.onclick=()=>{const fresh=loadCampaign();if(fresh.slots.some(s=>s?.run?.bases?.length))return;hideout(fresh).convoy=b.dataset.equip!;saveCampaign(fresh);this.render();});
    p.querySelector<HTMLButtonElement>('[data-close]')!.onclick = () => { p.hidden = true; this.create(); };
    p.querySelectorAll<HTMLElement>('[data-tab]').forEach(b => {
      b.onclick = () => this.render(b.dataset.tab);
      if(b.getAttribute('role')==='button') b.onkeydown = e => { if(e.key==='Enter'||e.key===' ') { e.preventDefault(); this.render(b.dataset.tab); } };
    });
    p.querySelectorAll<HTMLButtonElement>('[data-upgrade]').forEach(b => b.onclick = () => { buyUpgrade(loadCampaign(), b.dataset.upgrade as Upgrade); this.render(); });
  }
  private async begin(): Promise<void> {
    if(this.launching) return; const ch = activeCharacter(); if(ch?.status !== 'alive') { this.render('expeditions'); return; }
    this.launching = true;
    try {
      playBackgroundMusic(); primeConvoyEngineAudio(); primeCombatAudio();
      const network=this.registry.get('network') as GameClient;
      const url=new URL(location.href); url.searchParams.set('offline','1'); history.replaceState({},'',url);
      await network.connect(ch.name); network.setPaused(true); await new Promise(resolve=>window.setTimeout(resolve,0));
      document.querySelector<HTMLElement>('#campaign-panel')!.hidden=true; document.querySelector<HTMLElement>('#main-menu')!.hidden=true;
      if(ch.battleSeed && ch.run?.bases?.length) { this.registry.set('battleSeed',ch.battleSeed); this.scene.start('WorldScene'); }
      else this.scene.start('GlobeDeployScene');
    } catch(error) { this.launching=false; const status=document.querySelector<HTMLElement>('#menu-status')!; status.hidden=false; status.textContent='Could not load your expedition. Your save has been kept.'; document.querySelector<HTMLElement>('#campaign-panel')!.hidden=true; console.error(error); }
  }
}
