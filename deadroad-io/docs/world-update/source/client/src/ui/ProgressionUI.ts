import { commanderLevel, xpForLevel, difficultyLabel, PATH_LABELS, RESEARCH_PATHS, researchCost } from '../../../server/src/sim/progression';
import { TOWER_INFO, COMBAT_PROGRESSION } from '../game/constants';
import type { GameClient } from '../net/GameClient';
import type { TowerState, TowerType } from '../game/types';
export type DeploymentPreview = NonNullable<Awaited<ReturnType<GameClient['previewDeployment']>>>;

export class ProgressionUI {
  private hud = document.createElement('div');
  private dialog = document.createElement('dialog');
  private off: () => void;
  private armorySelection?: { towerId?: string; type: TowerType };
  private armorySignature = '';
  constructor(private network: GameClient, private captureMap?: (preview: DeploymentPreview) => Promise<HTMLCanvasElement>) {
    this.hud.className = 'commander-progression'; this.hud.innerHTML = '<button type="button" class="rank-button"></button><span class="threat-legend">THREAT <i></i> 1 — 10</span>';
    this.dialog.className = 'progression-dialog'; this.dialog.setAttribute('aria-label', 'Commander operations');
    document.body.append(this.hud, this.dialog); this.hud.querySelector('button')!.onclick = () => this.armory();
    this.dialog.addEventListener('keydown', e => e.stopPropagation()); this.dialog.addEventListener('click', e => e.stopPropagation());
    this.dialog.addEventListener('close', () => { this.armorySelection = undefined; });
    this.off = network.on('snapshot', () => { this.refresh(); const selection = this.armorySelection; if (!selection || !this.dialog.open) return; const tower = this.network.latestSnapshot?.towers.find(t => t.id === selection.towerId); const signature = JSON.stringify([this.player(), tower]); if (signature !== this.armorySignature) { this.armorySignature = signature; this.armory(tower, selection.type); } }); this.refresh();
  }
  private player() { return this.network.latestSnapshot?.players.find(p => p.id === this.network.localId); }
  private refresh() { const p = this.player(); const level = commanderLevel(p?.xp); this.hud.querySelector('button')!.textContent = `COMMANDER ${level}  ·  ${p?.xp ?? 0} / ${xpForLevel(level + 1)} XP  ·  RESEARCH`; }
  destroy() { this.off(); this.hud.remove(); this.dialog.remove(); }
  private shell(eyebrow: string, title: string) {
    this.dialog.replaceChildren(); const top = document.createElement('div'); top.className = 'progression-top';
    const text = document.createElement('div'); const small = document.createElement('small'); small.textContent = eyebrow; const heading = document.createElement('h2'); heading.textContent = title; text.append(small, heading);
    const close = document.createElement('button'); close.textContent = 'CLOSE ×'; close.onclick = () => this.dialog.close(); top.append(text, close); this.dialog.append(top);
    if (!this.dialog.open) this.dialog.showModal();
  }
  async preview(confirm: (stamp: string) => void, reroll = false): Promise<boolean> {
    this.armorySelection = undefined;
    const preview = await this.network.previewDeployment(reroll); if (!preview || !this.dialog.isConnected) return false;
    const { difficulty, rewards } = preview; this.shell('DEPLOYMENT INTELLIGENCE', `${difficultyLabel(difficulty, this.player()?.xp)} · mission rating ${difficulty.toFixed(1)}`);
    const briefing = document.createElement('p'); briefing.textContent = 'Approach route confirmed. Rewards are paid for each cleared wave; subsequent waves grow stronger. Reroll changes only the approach; your convoy stays here until you drive away.'; this.dialog.append(briefing);
    const map = document.createElement('div'); map.className = 'deployment-map'; this.dialog.append(map);
    const loading = document.createElement('p'); loading.className = 'map-loading'; loading.textContent = 'Surveying the deployment site…'; loading.setAttribute('role','status'); map.append(loading);
    let canvas: HTMLCanvasElement;
    try { if (!this.captureMap) throw new Error('Map renderer unavailable'); canvas = await this.captureMap(preview); }
    catch { loading.textContent = 'Map survey unavailable. Close this briefing and try again.'; return true; }
    if (!this.dialog.open || !this.dialog.isConnected) return true;
    loading.remove(); canvas.className = 'route-preview'; canvas.setAttribute('aria-label','Actual terrain, roads and convoy with the proposed horde approach'); map.append(canvas);
    const rerollButton = document.createElement('button'); rerollButton.className = 'reroll-route'; rerollButton.textContent = '⟳ REROLL PATH'; rerollButton.onclick = async () => { rerollButton.disabled = true; await this.preview(confirm, true); }; map.append(rerollButton);
    const loot = document.createElement('div'); loot.className = 'mission-loot'; loot.innerHTML = `<div><small>FIRST WAVE XP</small><strong>+${rewards.xp}</strong></div><div><small>SCRAP · BEFORE BONUSES</small><strong>+${rewards.scrap}</strong></div><div><small>FREE TURRET CHANCE</small><strong>${Math.round(rewards.turretChance * 100)}% · Tier ${rewards.turretTier}</strong></div>`; this.dialog.append(loot);
    const footer = document.createElement('div'); footer.className = 'progression-actions'; const cancel = document.createElement('button'); cancel.textContent = 'KEEP DRIVING'; cancel.onclick = () => this.dialog.close(); const deploy = document.createElement('button'); deploy.className = 'primary-button'; deploy.textContent = 'CONFIRM DEPLOYMENT'; deploy.onclick = () => { this.dialog.close(); confirm(preview.stamp); }; footer.append(cancel, deploy); this.dialog.append(footer); return true;
  }
  armory(tower?: TowerState, selected: TowerType = tower?.type ?? 'rifle') {
    this.armorySelection = { towerId: tower?.id, type: selected }; this.armorySignature = JSON.stringify([this.player(), tower]);
    const p = this.player(); this.shell(`ARMORY · ${p?.researchXp ?? 0} RESEARCH XP`, tower ? TOWER_INFO[tower.type].name : 'Tower research');
    const intro = document.createElement('p'); intro.textContent = 'Unlock tiers with XP, then install them with scrap. Each turret supports one main branch through tier 3 and one tier-1 support branch. Research is permanent; rank XP is never spent.'; this.dialog.append(intro);
    if (!tower) { const select = document.createElement('select'); select.setAttribute('aria-label', 'Tower to research'); for (const type of ['rifle','cannon','flame','shock','floodlight'] as TowerType[]) { const option = new Option(TOWER_INFO[type].name, type, false, type === selected); select.add(option); } select.onchange = () => this.armory(undefined, select.value as TowerType); this.dialog.append(select); }
    const cards = document.createElement('div'); cards.className = 'research-paths';
    for (const path of RESEARCH_PATHS) { const unlocked = p?.research?.[`${selected}:${path}`] ?? 0; const installed = tower?.pathTiers?.[path] ?? 0; const card = document.createElement('section'); const title = document.createElement('h3'); title.textContent = PATH_LABELS[path]; card.append(title); const effect = document.createElement('p'); effect.textContent = path === 'power' ? '+30% damage per tier' : path === 'reach' ? '+12% range, +10% damage per tier' : '+20% fire rate per tier'; card.append(effect);
      for (let tier = 1; tier <= 3; tier++) { const node = document.createElement('div'); node.className = `research-node ${tier <= unlocked ? 'unlocked' : 'locked'}`; node.textContent = `T${tier} · ${tier <= installed ? 'INSTALLED' : tier <= unlocked ? 'RESEARCHED' : `${researchCost(tier)} XP`}`; card.append(node); }
      const research = document.createElement('button'); research.textContent = unlocked >= 3 ? 'FULLY RESEARCHED' : `RESEARCH T${unlocked + 1}`; research.disabled = unlocked >= 3 || (p?.researchXp ?? 0) < researchCost(unlocked + 1); research.onclick = () => { this.network.research(selected, path); this.armory(tower, selected); }; card.append(research);
      if (tower) { const install = document.createElement('button'); const other = RESEARCH_PATHS.filter(v => v !== path && (tower.pathTiers?.[v] ?? 0) > 0); const crossLocked = other.length >= 2 || installed + 1 > 1 && other.some(v => (tower.pathTiers?.[v] ?? 0) > 1); install.textContent = crossLocked ? 'BRANCH LOCKED' : `INSTALL T${installed + 1} · ${COMBAT_PROGRESSION.towerUpgradeCostBase * (installed + 1)} SCRAP`; install.disabled = installed >= unlocked || installed >= 3 || crossLocked || (p?.scrap ?? 0) < COMBAT_PROGRESSION.towerUpgradeCostBase * (installed + 1); install.onclick = () => { this.network.upgrade(tower.id, path); this.armory(this.network.latestSnapshot?.towers.find(t => t.id === tower.id), selected); }; card.append(install); }
      cards.append(card);
    }
    this.dialog.append(cards); const stash = document.createElement('p'); stash.textContent = `RECOVERED TURRETS: ${(p?.turretRewards ?? []).map(r => `${r.type} T${r.tier} ${PATH_LABELS[r.path]}`).join(' · ') || 'None yet — clear waves in dangerous zones.'} Free turrets are used automatically when building their type.`; this.dialog.append(stash);
  }
}
