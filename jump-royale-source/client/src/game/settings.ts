export interface Preferences { music:number; effects:number; names:boolean }
const KEY='jump-royale-settings-v1';
const clamp=(v:unknown,fallback:number)=>typeof v==='number'&&Number.isFinite(v)?Math.max(0,Math.min(1,v)):fallback;
function read():Preferences {try{const p=JSON.parse(localStorage.getItem(KEY)||'{}');return {music:clamp(p.music,.3),effects:clamp(p.effects,1),names:typeof p.names==='boolean'?p.names:true};}catch{return {music:.3,effects:1,names:true};}}
export const preferences=read();
export const settingsOpen=()=>!!document.querySelector('.game-settings[open]');
export function createSettings(parent:HTMLElement,onOpen?:()=>void,returnToMenu?:()=>void):()=>void {
 const button=document.createElement('button');button.className='settings-cog pixel-button';button.type='button';button.setAttribute('aria-label','Open settings');button.title='Settings (Esc)';button.setAttribute('aria-haspopup','dialog');
 button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M9 1h6v3l2 1 3-1 3 5-3 2v2l3 2-3 5-3-1-2 1v3H9v-3l-2-1-3 1-3-5 3-2v-2L1 9l3-5 3 1 2-1V1zm3 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>';
 const dialog=document.createElement('dialog');dialog.className='game-settings';dialog.setAttribute('aria-label','Settings');
 dialog.innerHTML='<header><h2>Settings</h2><button type="button" class="pixel-button" aria-label="Close settings"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6L18 18M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2"/></svg></button></header><label>Music <output></output><input type="range" min="0" max="100" step="1" aria-label="Music volume"></label><label>Sound effects <output></output><input type="range" min="0" max="100" step="1" aria-label="Sound effects volume"></label><label class="names-setting"><span>Show player names</span><input type="checkbox" aria-label="Show player names"></label>';
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(preferences));}catch{}window.dispatchEvent(new Event('jump-settings-change'));};
 dialog.querySelectorAll<HTMLInputElement>('input[type=range]').forEach((input,i)=>{const key=i?'effects':'music',output=input.previousElementSibling!;input.value=String(Math.round(preferences[key]*100));output.textContent=input.value+'%';input.addEventListener('input',()=>{preferences[key]=Number(input.value)/100;output.textContent=input.value+'%';save();});});
 const names=dialog.querySelector<HTMLInputElement>('input[type=checkbox]')!;names.checked=preferences.names;names.addEventListener('change',()=>{preferences.names=names.checked;save();});
 if(returnToMenu){const back=document.createElement('button');back.className='pixel-button return-main';back.textContent='Leave match';back.onclick=()=>{dialog.close();returnToMenu();};dialog.append(back);}
 const close=()=>{dialog.close();button.focus();};
 const open=()=>{if(dialog.open)return;onOpen?.();dialog.showModal();};
 button.onclick=open;dialog.querySelector('header button')!.addEventListener('click',close);
 dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
 const escape=(event:KeyboardEvent)=>{if(event.code!=='Escape'||document.querySelector('.wardrobe-overlay:not([hidden])'))return;event.preventDefault();event.stopImmediatePropagation();if(event.repeat)return;const fitting=document.querySelector<HTMLDialogElement>('.gold-store[open],.w2-dialog[open],.loot-dialog[open],.wallpaper-dialog[open]');if(fitting){fitting.close();return;}if(dialog.open)close();else{document.querySelectorAll<HTMLDialogElement>('dialog[open]').forEach(d=>d.close());open();}};
 window.addEventListener('keydown',escape,true);parent.append(button,dialog);
 return ()=>{window.removeEventListener('keydown',escape,true);dialog.remove();button.remove();};
}
