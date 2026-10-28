const palettes={press:{bg:'#e5deca',line:'#575f49',colors:['#b4c6b8','#a9a2b5','#93b39e','#8397a8','#d6a156','#c3bb83','#be7255','#48534c'],ink:'#faf4e1'},flight:{bg:'#181c18',line:'#737c51',colors:['#84a888','#afa781','#799b79','#81998a','#d4ae54','#b9b17c','#b58151','#3d4837'],ink:'#efdfac'},arcade:{bg:'#e8d6b1',line:'#2a2154',colors:['#a4d5d3','#bba3e0','#80bc97','#7d9bd9','#f3bb49','#ecd87e','#ed8290','#3d3569'],ink:'#f8eccd'}};
const pieces=[[7,153,423,86],[7,333,444,86],[6,99,274,67],[5,372,296,55],[4,268,306,43],[3,221,216,34],[2,288,207,27],[1,355,197,21],[0,315,261,15],[2,97,530,27],[1,155,551,21],[2,232,553,27],[0,200,596,15],[1,283,553,21],[0,375,551,15]];
const symbols=['H','He','C','O','Ne','Mg','Si','Fe'];
document.querySelectorAll('[data-art]').forEach((board,index)=>{
  const theme=board.dataset.art,p=palettes[theme],arcade=theme==='arcade',flight=theme==='flight';
  const texture=flight?'stroke-dasharray="2 4"':'';
  const orbs=pieces.map(([tier,x,y,r])=>{
    const ring=arcade?`<path d="M${x-r*.56} ${y-r*.62}Q${x} ${y-r*1.03} ${x+r*.55} ${y-r*.62}" fill="none" stroke="#fff7" stroke-width="4" stroke-linecap="round"/>`:`<circle cx="${x}" cy="${y}" r="${r-5}" fill="none" stroke="${p.ink}" opacity=".13" ${texture}/><path d="M${x-r*.7} ${y+r*.2} Q${x+r*.9} ${y-r} ${x+r*.6} ${y+r*.5}" fill="none" stroke="${p.ink}" opacity=".12"/>`;
    return `<g><circle cx="${x+(arcade?3:0)}" cy="${y+(arcade?5:0)}" r="${r}" fill="${arcade?'#2a2154':'#141810'}" opacity="${arcade?1:.12}"/><circle cx="${x}" cy="${y}" r="${r}" fill="${p.colors[tier]}" stroke="${arcade?'#2a2154':p.line}" stroke-width="${arcade?3:1.5}"/>${ring}<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" fill="${tier===7?p.ink:arcade?'#2a2154':flight?'#e8e0b6':'#f3efdb'}" font-family="${arcade?'Arial Black, Arial':flight?'Consolas, monospace':'Georgia, serif'}" font-size="${r*.75}" font-weight="${arcade?900:400}">${symbols[tier]}</text></g>`;
  }).join('');
  board.insertAdjacentHTML('beforeend',`<svg viewBox="0 0 500 645" role="img" aria-label="${theme} concept material packets"><defs><pattern id="dots-${index}" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".6" fill="${p.line}" opacity=".22"/></pattern></defs><path d="M30 125V420A220 220 0 0 0 470 420V125" fill="${p.bg}" stroke="${p.line}" stroke-width="${arcade?5:1.5}"/><path d="M30 125V420A220 220 0 0 0 470 420V125Z" fill="url(#dots-${index})"/><path d="M48 158H452" stroke="${theme==='press'?'#a35b42':theme==='flight'?'#d29c3f':'#ad4261'}" stroke-dasharray="6 7" opacity=".55"/><text x="48" y="146" fill="${p.line}" font-family="monospace" font-size="8" letter-spacing="2">OVERFLOW</text><path d="M250 88V155" stroke="${p.line}" stroke-dasharray="4 5"/><circle cx="250" cy="55" r="29" fill="${p.colors[2]}" stroke="${p.line}" stroke-width="${arcade?3:1}"/><text x="250" y="57" fill="${arcade?'#2a2154':p.ink}" text-anchor="middle" dominant-baseline="central" font-family="${arcade?'Arial Black':'Georgia'}" font-size="24">C</text>${orbs}</svg>`);
});
const grid=document.getElementById('concept-grid');
function setView(view){
  grid.classList.toggle('focused',view!=='all');
  document.querySelectorAll('.concept').forEach(el=>el.hidden=view!=='all'&&el.dataset.concept!==view);
  document.querySelectorAll('.view-buttons [data-view]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.view===view)));
  document.getElementById('feedback').textContent=view==='all'?'All three directions use the same board and rules.':`Viewing ${document.querySelector(`[data-concept="${view}"] h2`).textContent}.`;
}
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>setView(button.dataset.view)));
document.getElementById('size-toggle').addEventListener('click',event=>{const on=grid.classList.toggle('portrait');event.currentTarget.setAttribute('aria-pressed',String(on));event.currentTarget.textContent=on?'Full-size preview':'Portrait preview';});
document.querySelectorAll('.study-control').forEach(button=>button.addEventListener('click',()=>{
  const mock=button.closest('.mockup'),board=mock.querySelector('.board-art');
  if(button.dataset.action==='pause'){
    const paused=board.classList.toggle('paused');button.dataset.original??=button.textContent;button.textContent=paused?'▶':button.dataset.original;button.setAttribute('aria-pressed',String(paused));
  }else if(button.dataset.action==='sound'){
    const muted=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(muted));button.textContent=muted?'×':'♪';
  }else{
    board.classList.remove('flash');void board.offsetWidth;board.classList.add('flash');
    document.getElementById('feedback').textContent='Control feel preview. Open “Drop the final iron” for the playable explosion.';
  }
}));
const initial=new URLSearchParams(location.search).get('view');if(['press','flight','arcade'].includes(initial))setView(initial);
