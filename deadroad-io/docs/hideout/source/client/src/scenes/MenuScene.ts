import Phaser from 'phaser';
import type { GameClient } from '../net/GameClient';
import { playBackgroundMusic } from '../audio/BackgroundMusic';
import { primeConvoyEngineAudio } from '../audio/ConvoyEngineAudio';
import { primeCombatAudio } from '../audio/CombatAudio';
import { activeCharacter, loadCampaign, saveCampaign, createCharacter, buyUpgrade, upgradeCost, UPGRADES, type Upgrade } from '../game/Campaign';
const esc = (s: string) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export class MenuScene extends Phaser.Scene {
  private section = 'expeditions';
  private launching = false;
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
    this.section = section; const c = loadCampaign(); const ch = activeCharacter(c);
    const p = document.querySelector<HTMLElement>('#campaign-panel')!; p.hidden = false;
    const away = c.slots.some(s => s?.status === 'alive' && s.run?.bases?.length);
    p.innerHTML = `<header class="hideout-top"><h2>${section==='expeditions'?'JOIN THE EXPEDITION':'HIDEOUT'}</h2>${section==='expeditions'?'':`<div class="bank"><span>XP<strong>${c.bank.xp}</strong></span><span>SCRAP<strong>${c.bank.scrap}</strong></span></div>`}<button data-close aria-label="Back to menu">✕</button></header>${section==='expeditions'||section==='hideout'?'': '<nav class="hideout-nav"><button data-tab="hideout">← BASE CAMP</button></nav>'}<div class="hideout-content" id="hideout-content"></div>`;
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
      body.innerHTML = `<div class="camp-map" aria-label="Base camp"><img src="./assets/hideout-camp.png" alt="A fortified base camp with a convoy garage, turret workshop, field tent and market">${[['armor','CONVOY BAY'],['turrets','TURRET WORKSHOP'],['field','FIELD UPGRADES'],['market','PLAYER MARKET']].map(([id,name])=>`<button class="camp-building camp-${id}" data-tab="${id}" aria-label="${name}"><span class="camp-highlight"></span><strong>${name}</strong></button>`).join('')}</div>`;
    } else if (section === 'market') {
      const rewards = c.stash;
      body.innerHTML = `<div class="section-heading"><div><small>THE EXCHANGE</small><h3>Player market</h3></div><p>Trade recovered hardware.<br>Give unused equipment a second life.</p></div><div class="market-status"><span>○ PLAYER TRADING OFFLINE</span><p>Online listings need a connected market server. No player listings are available in this browser edition.</p></div><h4 class="market-label">HIDEOUT SALVAGE COUNTER</h4><p>Shared recovered turrets · 40 scrap each.</p><div class="upgrade-grid">${rewards.length?rewards.map((r:any,i:number)=>`<article class="upgrade-card"><span class="upgrade-icon">⌖</span><small>RECOVERED HARDWARE</small><h4>${esc(String(r.type))} turret</h4><p>Tier ${Number(r.tier)} · ${esc(String(r.path))}</p><button data-sell="${i}" >SALVAGE / +40 SCRAP</button></article>`).join(''):'<div class="market-empty"><span>◇</span><h4>No recovered hardware</h4><p>Survive hordes to recover turrets, then bring them home.</p><button data-tab="expeditions">CHOOSE AN EXPEDITION ↗</button></div>'}</div>`;
      body.querySelectorAll<HTMLButtonElement>('[data-sell]').forEach(b => b.onclick = () => { const fresh=loadCampaign(); const inventory=fresh.stash; const index=Number(b.dataset.sell); if(!inventory?.[index]) return; inventory.splice(index,1); fresh.bank.scrap+=40; saveCampaign(fresh); this.render(); });
    } else if (section === 'manual') {
      body.innerHTML = `<div class="manual"><small>FIELD MANUAL / 01</small><h3>Bring your people home.</h3><p>Pick one of three slots and recruit a survivor. Choose land on the war globe. Drive with WASD, deploy the convoy, and build turrets on the pads. Survive hordes to earn XP, scrap, and recovered hardware.</p><h4>Return before it is too late.</h4><p>Open the menu with Escape and choose “Extract to Hideout” between hordes. All newly earned XP and scrap above your 250 field supplies go into the shared bank. Spend both currencies in the Hideout workshops.</p><h4>One life. A lasting legacy.</h4><p>If your convoy is destroyed, that character dies permanently. You retain 50% of unbanked XP and 25% of surplus scrap, increased by recovery upgrades. Recruit a successor in the fallen slot; your Hideout and memorial remain.</p><h4>Take a break.</h4><p>“Save & return to title” pauses and saves the full expedition. Continue picks up the same run. Automatic saves happen every two seconds and when leaving the page. Saves belong to this browser; clearing site data removes them.</p></div>`;
    } else {
      const list = UPGRADES.filter(u => section==='field'?u.id==='field'||u.id==='salvage':u.id===section);
      body.innerHTML = `<div class="section-heading"><div><small>PERMANENT HIDEOUT RESEARCH</small><h3>${list[0]?.section || 'Workshop'}</h3></div><p>Built for the survivors who come after.<br>Upgrades apply to future equipment and insertions.</p></div><div class="upgrade-grid">${list.map(u=> {const level=c.upgrades[u.id];const cost=upgradeCost(level);return `<article class="upgrade-card"><span class="upgrade-icon">${u.icon}</span><small>${u.section.toUpperCase()}</small><h4>${u.name}</h4><p>${u.description}</p><div class="upgrade-levels">${[1,2,3,4,5].map(n=>`<i class="${n<=level?'filled':''}"></i>`).join('')}<span>${level} / 5</span></div><button data-upgrade="${u.id}" ${level>=5||away||c.bank.xp<cost.xp||c.bank.scrap<cost.scrap?'disabled':''}>${level>=5?'FULLY UPGRADED':`UPGRADE / ${cost.scrap} SCRAP + ${cost.xp} XP`}</button><small>${away?'EXTRACT ALL CONVOYS TO UPGRADE':level>=5?'READY FOR THE ROAD':'PAID FROM THE SHARED HIDEOUT BANK'}</small></article>`;}).join('')}</div>`;
    }
    p.querySelector<HTMLButtonElement>('[data-close]')!.onclick = () => { p.hidden = true; this.create(); };
    p.querySelectorAll<HTMLButtonElement>('[data-tab]').forEach(b => b.onclick = () => this.render(b.dataset.tab));
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
