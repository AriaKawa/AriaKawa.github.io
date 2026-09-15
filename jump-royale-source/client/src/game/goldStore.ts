/** Prices are in USD cents. Paid checkout stays off until PayPal and a
 * server-verified, durable wallet are connected. Never grant gold on a click. */
export const GOLD_PACKS = [
  {id:'single',name:'Pocket Gold',baseGold:1,bonusGold:0,usdCents:100},
  {id:'five',name:'Gold Pouch',baseGold:5,bonusGold:1,usdCents:500},
  {id:'ten',name:'Treasure Chest',baseGold:10,bonusGold:2,usdCents:1000},
] as const;

export function createGoldStore(onOpen:()=>void,onClose:()=>void):HTMLDialogElement {
  const dialog=document.createElement('dialog');
  dialog.className='gold-store';dialog.id='gold-store';
  dialog.setAttribute('aria-labelledby','gold-store-title');
  dialog.setAttribute('aria-describedby','gold-store-status');
  const goldImage=import.meta.env.BASE_URL+'assets/menu/gold-bars.png';
  dialog.innerHTML=`<header class="gold-store-header"><div><p class="gold-store-eyebrow">JUMP ROYALE</p><h2 id="gold-store-title">A little more gold.</h2><p>Make your next look your own.</p></div><button class="gold-store-close pixel-button" type="button" aria-label="Close gold store" autofocus>×</button></header>
    <div class="gold-packs">${GOLD_PACKS.map((pack,i)=>`<article class="gold-pack" data-pack="${pack.id}"><span class="gold-pack-badge">${pack.bonusGold?'+'+pack.bonusGold+' BONUS GOLD':'THE LITTLE TOP-UP'}</span><div class="gold-pack-art gold-pack-art-${i}" aria-hidden="true">${Array.from({length:i+1},()=>`<img src="${goldImage}" alt="">`).join('')}</div><h3>${pack.name}</h3><p class="gold-pack-amount">${pack.baseGold+pack.bonusGold}<span> GOLD</span></p><p class="gold-pack-breakdown">${pack.bonusGold?pack.baseGold+' gold + '+pack.bonusGold+' bonus':'Just the gold you need'}</p><p class="gold-pack-price">$${(pack.usdCents/100).toFixed(2)} <small>USD</small></p><button type="button" disabled aria-describedby="gold-store-status">Coming soon</button></article>`).join('')}</div>
    <footer><p id="gold-store-status"><span class="gold-store-status-dot" aria-hidden="true"></span>Gold purchases are coming soon.</p><p>PayPal checkout will be available here. For now, earn gold by climbing.</p><small>Gold buys cosmetics. Every climber keeps the same abilities.</small></footer>`;
  dialog.querySelector('button')!.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',onClose);
  // A native modal supplies focus containment, Escape and background inertness.
  dialog.addEventListener('keydown',event=>{
    event.stopPropagation();
    if(event.key==='Tab') {
      const buttons=Array.from(dialog.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'));
      const first=buttons[0],last=buttons[buttons.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  });
  dialog.addEventListener('keyup',event=>event.stopPropagation());
  dialog.addEventListener('gold-store-open',()=>{if(!dialog.open){onOpen();dialog.showModal();}});
  return dialog;
}
