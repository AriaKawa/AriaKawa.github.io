/** One Back action, addressed to the frontmost menu. */
export function installMenuBack(openSettings:()=>void):()=>void {
 const dialogs:HTMLDialogElement[]=[];
 const top=()=>{
  document.querySelectorAll<HTMLDialogElement>('dialog[open]').forEach(d=>{if(!dialogs.includes(d))dialogs.push(d);});
  return dialogs.filter(d=>d.open&&d.isConnected).at(-1);
 };
 const observer=new MutationObserver(records=>{for(const record of records){const d=record.target;if(d instanceof HTMLDialogElement&&d.open){const i=dialogs.indexOf(d);if(i>=0)dialogs.splice(i,1);dialogs.push(d);}}});
 observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
 const back=(event:KeyboardEvent)=>{
  if(event.key!=='Escape')return;
  event.preventDefault();event.stopImmediatePropagation();if(event.repeat)return;
  const d=top();
  if(d){
   const help=d.querySelector<HTMLElement>('#loot-free-help:not([hidden])');
   if(help){help.hidden=true;d.querySelector('.loot-help-toggle')?.setAttribute('aria-expanded','false');return;}
   const icons=d.querySelector<HTMLElement>('.profile-icons:not([hidden])');
   if(icons){icons.hidden=true;d.querySelector('.profile-button')?.setAttribute('aria-expanded','false');return;}
   if(d.dispatchEvent(new Event('cancel',{cancelable:true})))d.close();return;
  }
  const wardrobe=document.querySelector<HTMLElement>('.wardrobe-overlay:not([hidden]) .wardrobe-close');
  if(wardrobe){wardrobe.click();return;}
  openSettings();
 };
 const outside=(event:MouseEvent)=>{
  const d=top();if(!d)return;
  const r=d.getBoundingClientRect();
  if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom){event.preventDefault();event.stopImmediatePropagation();d.close();}
 };
 window.addEventListener('keydown',back,true);document.addEventListener('click',outside,true);
 return ()=>{observer.disconnect();window.removeEventListener('keydown',back,true);document.removeEventListener('click',outside,true);};
}
