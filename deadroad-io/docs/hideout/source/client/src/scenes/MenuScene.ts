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
    const resume = document.querySelector<HTMLButtonElement>('#continue-expedition')!;
    resume.disabled = ch?.status !== 'alive'; resume.onclick = () => void this.begin();
    document.querySelector<HTMLButtonElement>('#open-expeditions')!.onclick = () => this.render('expeditions');
    document.querySelector<HTMLButtonElement>('#open-hideout')!.onclick = () => this.render('hideout');
    document.querySelector<HTMLButtonElement>('#credits-button')!.onclick = () => { const p = document.querySelector<HTMLElement>('#credits-panel')!; p.hidden = !p.hidden; };
    document.querySelector<HTMLButtonElement>('#field-manual')!.onclick = () => this.render('manual');
    document.querySelector<HTMLButtonElement>('#menu-settings')!.onclick = () => { document.querySelector<HTMLElement>('#pause-overlay')!.hidden = false; document.querySelector<HTMLElement>('#pause-main-actions')!.hidden = true; document.querySelector<HTMLElement>('#settings-panel')!.hidden = false; };
    document.querySelector<HTMLElement>('#menu-status')!.textContent = ch?.status === 'alive' ? `${ch.name} · ${ch.xp} XP · ${ch.run?.bases?.length ? 'Expedition saved' : 'Ready at the Hideout'}` : 'Your character can die. Your legacy lives on.';
    if (this.registry.get('showHideout')) { this.registry.set('showHideout', false); this.render('hideout'); }
    else document.querySelector<HTMLElement>('#campaign-panel')!.hidden = true;
  }
  private render(section = this.section): void {
    this.section = section; const c = loadCampaign(); const ch = activeCharacter(c);
    const p = document.querySelector<HTMLElement>('#campaign-panel')!; p.hidden = false;
    const away = c.slots.some(s => s?.status === 'alive' && s.run?.bases?.length);
    p.innerHTML = `<header class="hideout-top"><div><small>ROADWATCH / SAFEHOUSE 07</small><h2>THE HIDEOUT<span>KEEP THE LIGHTS ON.</span></h2></div><div class="bank"><span>LEGACY XP<strong>${c.bank.xp}</strong></span><span>BANKED SCRAP<strong>${c.bank.scrap}</strong></span></div><button data-close aria-label="Close Hideout">✕</button></header><nav class="hideout-nav" aria-label="Hideout sections">${[['expeditions','Expeditions'],['hideout','Base overview'],['armor','Convoy bay'],['turrets','Turret workshop'],['field','Field upgrades'],['market','Player market']].map(([id,label]) => `<button data-tab="${id}" class="${section===id?'active':''}" ${section===id?'aria-current="page"':''}>${label}</button>`).join('')}</nav><div class="hideout-content" id="hideout-content"></div><footer class="hideout-footer"><span>● SAFE PERIMETER</span><span>Saved on this browser · 3 character slots · Permanent death</span></footer>`;
    const body = p.querySelector<HTMLElement>('#hideout-content')!;
    if (section === 'expeditions') {
      body.innerHTML = `<div class="section-heading"><div><small>YOUR PEOPLE / YOUR STORIES</small><h3>Choose who takes the road.</h3></div><p>Each survivor has their own expedition.<br>Death is permanent. The Hideout is shared.</p></div><div class="save-grid">${c.slots.map((s,i) => `<button class="save-card ${i===c.selected?'selected':''} ${s?.status==='dead'?'fallen':''}" data-slot="${i}" aria-pressed="${i===c.selected}"><small>SAVE SLOT 0${i+1}<span>${s?.status==='alive'?'● ALIVE':s?'† FALLEN':'— VACANT'}</span></small><div class="survivor-emblem">${s?.status==='dead'?'†':s?'◈':'+'}</div><h4>${s?esc(s.name):'A new survivor'}</h4><p>${s?`${s.xp} XP · ${s.status==='dead'?'Lost on the road':s.run?.bases?.length?'In the field':'At the Hideout'}`:'A name. A convoy. A chance.'}</p><span class="slot-action">${i===c.selected?'SELECTED':'SELECT SLOT'} →</span></button>`).join('')}</div><div class="expedition-launch">${ch?.status==='alive'?`<div><strong>${esc(ch.name)}</strong><p>${ch.run?.bases?.length?'Resume your saved convoy, defenses, and horde.':'Choose a location on the war globe and head out.'}</p></div><button id="play-button" class="hero-primary">${ch.run?.bases?.length?'CONTINUE':'START'} EXPEDITION ↗</button>`:`<div><label for="commander-name">${ch?'RECRUIT A SUCCESSOR':'SURVIVOR CALLSIGN'}</label><input id="commander-name" maxlength="18" placeholder="Enter a name" value="Roadwarden" autocomplete="off">${ch?.obituary?`<p>Recovered ${ch.obituary.xp} XP and ${ch.obituary.scrap} scrap. ${esc(ch.name)} is remembered.</p>`:''}</div><button id="recruit-button" class="hero-primary">RECRUIT & DEPLOY ↗</button>`}</div><p class="retention-note">EXTRACT SAFELY: bank 100% of earned XP and surplus scrap. ON DEATH: recover 50% XP and ${25+c.upgrades.salvage*5}% surplus scrap. The initial 250 supply scrap stays in the field.</p>`;
      body.querySelectorAll<HTMLButtonElement>('[data-slot]').forEach(b => b.onclick = () => { c.selected = Number(b.dataset.slot); saveCampaign(c); this.render(); });
      body.querySelector<HTMLButtonElement>('#play-button')?.addEventListener('click', () => void this.begin());
      const recruit = () => { if(this.launching)return; createCharacter(c, body.querySelector<HTMLInputElement>('#commander-name')!.value); void this.begin(); };
      body.querySelector<HTMLButtonElement>('#recruit-button')?.addEventListener('click', recruit);
      body.querySelector<HTMLInputElement>('#commander-name')?.addEventListener('keydown', e => { if(e.key==='Enter') recruit(); });
    } else if (section === 'hideout') {
      body.innerHTML = `<div class="section-heading"><div><small>A LITTLE LIGHT IN THE DARK</small><h3>Everything you bring back matters.</h3></div><p>A shared home for all three survivors.<br>Permanent upgrades survive every loss.</p></div><div class="base-map"><div class="base-road"></div><div class="base-center"><span>⌂</span><strong>ROADWATCH</strong><small>SAFEHOUSE 07</small></div>${[['armor','01','CONVOY BAY','▰'],['turrets','02','TURRET WORKSHOP','⌖'],['field','03','FIELD UPGRADES','✚'],['market','04','PLAYER MARKET','⇄']].map(([id,no,name,icon])=>`<button class="base-building building-${id}" data-tab="${id}"><span>${icon}</span><small>BUILDING ${no}</small><strong>${name}</strong><em>${id==='market'?'LOCAL SALVAGE COUNTER':`LEVEL ${c.upgrades[id as Upgrade]} / 5`} ↗</em></button>`).join('')}<div class="base-caption">PERIMETER SECURE / GENERATOR ONLINE</div></div><div class="hideout-note">${away?'A survivor is in the field. Extract all active convoys to install Hideout upgrades.':'Workshops ready. Spend banked XP and scrap to improve the next expedition.'}</div>${c.history.length?`<div class="memorial"><small>WE REMEMBER</small><p>${c.history.slice(0,6).map(h=>esc(h.name)).join(' · ')}</p></div>`:''}`;
    } else if (section === 'market') {
      const rewards = ch?.run?.player?.turretRewards || [];
      body.innerHTML = `<div class="section-heading"><div><small>THE EXCHANGE</small><h3>Player market</h3></div><p>Trade recovered hardware.<br>Give unused equipment a second life.</p></div><div class="market-status"><span>○ PLAYER TRADING OFFLINE</span><p>Online listings need a connected market server. No player listings are available in this browser edition.</p></div><h4 class="market-label">HIDEOUT SALVAGE COUNTER</h4><p>Sell your selected survivor’s recovered turrets for 40 banked scrap each. Extract before selling.</p><div class="upgrade-grid">${rewards.length?rewards.map((r:any,i:number)=>`<article class="upgrade-card"><span class="upgrade-icon">⌖</span><small>RECOVERED HARDWARE</small><h4>${esc(String(r.type))} turret</h4><p>Tier ${Number(r.tier)} · ${esc(String(r.path))}</p><button data-sell="${i}" ${ch?.run?.bases?.length?'disabled':''}>SALVAGE / +40 SCRAP</button></article>`).join(''):'<div class="market-empty"><span>◇</span><h4>No recovered hardware</h4><p>Survive hordes to recover turrets, then bring them home.</p><button data-tab="expeditions">CHOOSE AN EXPEDITION ↗</button></div>'}</div>`;
      body.querySelectorAll<HTMLButtonElement>('[data-sell]').forEach(b => b.onclick = () => { const fresh=loadCampaign(); const survivor=activeCharacter(fresh); if(!survivor || survivor.run?.bases?.length) return; const inventory=survivor.run?.player?.turretRewards; const index=Number(b.dataset.sell); if(!inventory?.[index]) return; inventory.splice(index,1); fresh.bank.scrap+=40; saveCampaign(fresh); this.render(); });
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
    } catch(error) { this.launching=false; document.querySelector<HTMLElement>('#menu-status')!.textContent='Could not load your expedition. Your save has been kept.'; console.error(error); }
  }
}
