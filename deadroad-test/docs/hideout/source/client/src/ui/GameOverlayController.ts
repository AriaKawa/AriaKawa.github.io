import { activeCharacter } from '../game/Campaign';
import type Phaser from "phaser";
import { setMusicVolume } from "../audio/BackgroundMusic";
import { setCombatVolume } from "../audio/CombatAudio";
import { setConvoyEngineVolume } from "../audio/ConvoyEngineAudio";
import { setUiVolume } from "../audio/UiAudio";
import type { ChatMessage, GameClient } from "../net/GameClient";

const SETTINGS_KEY = "deadroad-audio-settings";

type AudioSettings = { music: number; effects: number };

function loadAudioSettings(): AudioSettings {
  try {
    const parsed = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? "{}") as Partial<AudioSettings>;
    return { music: Number.isFinite(parsed.music) ? Math.max(0, Math.min(1, parsed.music!)) : .18, effects: Number.isFinite(parsed.effects) ? Math.max(0, Math.min(1, parsed.effects!)) : .5 };
  } catch { return { music: .18, effects: .5 }; }
}

export function setupGameOverlays(_game: Phaser.Game, network: GameClient): void {
  const pause = document.querySelector<HTMLElement>("#pause-overlay")!;
  const pauseActions = document.querySelector<HTMLElement>("#pause-main-actions")!;
  const settingsPanel = document.querySelector<HTMLElement>("#settings-panel")!;
  const chat = document.querySelector<HTMLElement>("#chat-panel")!;
  const chatInput = document.querySelector<HTMLInputElement>("#chat-input")!;
  const chatMessages = document.querySelector<HTMLElement>("#chat-messages")!;
  const musicSlider = document.querySelector<HTMLInputElement>("#music-volume")!;
  const effectsSlider = document.querySelector<HTMLInputElement>("#sfx-volume")!;
  const audio = loadAudioSettings();

  const setPauseOpen = (open: boolean) => {
    network.setPaused(open); pause.hidden = !open; document.body.classList.toggle("menu-open", open);
    if (!open) { pauseActions.hidden = false; settingsPanel.hidden = true; }
  };
  const setChatOpen = (open: boolean) => {
    chat.classList.toggle("closed", !open); chat.setAttribute("aria-hidden", String(!open)); document.body.classList.toggle("chat-open", open);
    if (open) window.setTimeout(() => chatInput.focus(), 0); else chatInput.blur();
  };
  const inGame = () => document.querySelector<HTMLElement>("#main-menu")?.hidden === true && document.body.dataset.deadroadPlanet !== "planet3-road-editor";
  const addChatMessage = (message: ChatMessage) => {
    const row = document.createElement("p"); row.className = message.system ? "system" : message.playerId === network.localId ? "mine" : "";
    const name = document.createElement("b"); name.textContent = message.system ? "ROADWATCH" : message.playerName;
    const text = document.createElement("span"); text.textContent = message.text;
    const time = document.createElement("time"); time.textContent = new Date(message.sentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    row.append(name, text, time); chatMessages.append(row); chatMessages.scrollTop = chatMessages.scrollHeight;
  };
  const applyAudio = () => {
    setMusicVolume(audio.music); setCombatVolume(audio.effects); setConvoyEngineVolume(audio.effects); setUiVolume(audio.effects);
    musicSlider.value = String(Math.round(audio.music * 100)); effectsSlider.value = String(Math.round(audio.effects * 100));
    document.querySelector<HTMLOutputElement>("#music-volume-value")!.value = `${musicSlider.value}%`;
    document.querySelector<HTMLOutputElement>("#sfx-volume-value")!.value = `${effectsSlider.value}%`;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(audio));
  };

  document.querySelector<HTMLButtonElement>("#resume-button")!.onclick = () => setPauseOpen(false);
  document.querySelector<HTMLButtonElement>("#settings-button")!.onclick = () => { pauseActions.hidden = true; settingsPanel.hidden = false; };
  document.querySelector<HTMLButtonElement>("#settings-back-button")!.onclick = () => { settingsPanel.hidden = true; pauseActions.hidden = false; };
  const returnToTitle = (hideout = false) => {
    network.disconnect(); setPauseOpen(false);
    for (const id of ['hud','globe-deploy','deployment-loading','road-editor']) document.querySelector<HTMLElement>('#'+id)!.hidden = true;
    for (const scene of _game.scene.getScenes(true)) _game.scene.stop(scene.scene.key);
    _game.registry.set('showHideout', hideout); _game.scene.start('MenuScene');
  };
  const titleButton = document.querySelector<HTMLButtonElement>('#main-menu-button')!;
  titleButton.textContent = 'SAVE & RETURN TO TITLE'; titleButton.onclick = () => returnToTitle();
  const extract = document.createElement('button'); extract.id = 'extract-hideout'; extract.className = titleButton.className; extract.textContent = 'EXTRACT TO HIDEOUT';
  titleButton.before(extract); extract.onclick = () => { if (network.extractToHideout()) returnToTitle(true); else { setPauseOpen(false); } };
  window.addEventListener('deadroad-character-died', () => {
    // Finish the lethal simulation update before stopping scenes and showing the memorial.
    queueMicrotask(() => {
      network.disconnect(); setPauseOpen(false);
      for (const scene of _game.scene.getScenes(true)) _game.scene.stop(scene.scene.key);
      for(const id of ['hud','globe-deploy','deployment-loading']) document.querySelector<HTMLElement>('#'+id)!.hidden=true;
      const character=activeCharacter(); const report=document.createElement('section'); report.className='death-report'; report.setAttribute('role','dialog'); report.setAttribute('aria-modal','true');
      report.innerHTML='<div><small>ROADWATCH / SIGNAL LOST</small><h2>SURVIVOR FALLEN</h2><p class="fallen-name"></p><p>The road took a life. It did not take everything.</p><p class="recovered"></p><button>RETURN TO THE HIDEOUT →</button></div>';
      report.querySelector('.fallen-name')!.textContent=character?.name || 'Roadwarden';
      report.querySelector('.recovered')!.textContent=(character?.obituary?.xp || 0)+' legacy XP and '+(character?.obituary?.scrap || 0)+' scrap recovered. Your Hideout upgrades remain.';
      report.querySelector('button')!.onclick=()=>{report.remove();returnToTitle(true);}; document.body.append(report); report.querySelector('button')!.focus();
    });
  });
  document.querySelector<HTMLButtonElement>("#chat-close-button")!.onclick = () => setChatOpen(false);
  musicSlider.oninput = () => { audio.music = Number(musicSlider.value) / 100; applyAudio(); };
  effectsSlider.oninput = () => { audio.effects = Number(effectsSlider.value) / 100; applyAudio(); };
  document.querySelector<HTMLFormElement>("#chat-form")!.onsubmit = (event) => {
    event.preventDefault(); const text = chatInput.value.trim(); if (!text) return; network.sendChat(text); chatInput.value = ""; chatInput.focus();
  };
  network.on("chat", addChatMessage);
  addChatMessage({ id: "roadwatch-welcome", playerId: "system", playerName: "ROADWATCH", text: "Sector comms ready. Messages are shared with connected commanders.", sentAt: Date.now(), system: true });
  window.addEventListener("keydown", (event) => {
    if (!inGame()) return;
    if (event.key === "Enter") {
      if (pause.hidden && !document.body.classList.contains("chat-open")) { event.preventDefault(); event.stopImmediatePropagation(); setChatOpen(true); }
      return;
    }
    if (event.key !== "Escape") return;
    event.preventDefault(); event.stopImmediatePropagation();
    if (document.body.classList.contains("chat-open")) { setChatOpen(false); return; }
    setPauseOpen(pause.hidden);
  }, true);
  applyAudio();
}
