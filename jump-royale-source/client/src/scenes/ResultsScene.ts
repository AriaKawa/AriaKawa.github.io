import {party} from '../game/online';
import {createSettings,preferences} from '../game/settings';
import Phaser from 'phaser';
import type { Placement } from '../game/types';
import {goldForPlace} from '../game/economy';
import type {MapId} from '../../../server/src/sim/maps';
import { scoreTime } from '../game/scores';
export class ResultsScene extends Phaser.Scene {
  constructor(){super('Results');}
  create(data:{name:string;winner:string;placements:Placement[];localId:string;assisted?:boolean;goldEarned?:number;mapId?:MapId;leftEarly?:boolean}):void {
    this.input.keyboard?.disableGlobalCapture();
    this.cameras.main.setBackgroundColor('#100c12');
    const ui=document.createElement('section');ui.className='results-ui';ui.setAttribute('aria-label','Round scoreboard');
    const map=data.mapId??this.registry.get('mapId')??'forge';
    const paths:Record<MapId,string>={magical:'menu/map-previews/magical.png',forest:'menu/map-previews/forest.png',forge:'reforged/backdrop.png',jungle:'jungle-hd/background.webp',snow:'snow/background.png',mountain:'jump-royale-ai/summit/background.webp'};
    ui.style.backgroundImage=`linear-gradient(#07121c55,#07121c99),url("${import.meta.env.BASE_URL}assets/${paths[map as MapId]}")`;
    ui.style.backgroundSize='cover';ui.style.backgroundPosition='center';
    ui.innerHTML='<header><p>ROUND COMPLETE</p><h1></h1><p>Furthest climbed · ties go to the first to reach that height</p></header><div class="score-table-wrap"><table><thead><tr><th>Place</th><th>Climber</th><th>Height</th><th>Time to height</th></tr></thead><tbody></tbody></table></div><footer><p></p><button type="button">Climb again</button><button type="button">Lobby</button></footer>';
    ui.querySelector('h1')!.textContent=data.leftEarly?'Standings when you left':(preferences.names?data.winner:'A climber')+' wins!';
    if(data.leftEarly)ui.querySelector('header p')!.textContent='MATCH SNAPSHOT';
    for(const p of data.placements??[]) {
      const tr=document.createElement('tr');
      if(p.id===data.localId){tr.className='your-score';tr.setAttribute('aria-label','Your score');}
      for(const value of ['#'+p.place,(preferences.names?p.name:'Climber')+(p.id===data.localId?' · YOU':''),(p.maxHeight/10).toFixed(1)+'m',scoreTime(p.timeMs)]){
        const td=document.createElement('td');td.textContent=value;tr.appendChild(td);
      }
      const earned=data.assisted?0:p.id===data.localId?(data.goldEarned??0):data.leftEarly?0:goldForPlace(p.place);
      if(earned>0){const bonus=document.createElement('span');bonus.className='score-gold';bonus.setAttribute('aria-label',`Earned ${earned} gold`);bonus.innerHTML=`<i class="gold-coin" aria-hidden="true"></i>+${earned}`;tr.children[1].appendChild(bonus);}
      ui.querySelector('tbody')!.appendChild(tr);
    }
    ui.querySelector('footer p')!.textContent=data.assisted?'God powers round · personal records unchanged':data.leftEarly?'Standings frozen at departure':'';
    const [again,lobby]=ui.querySelectorAll('button');
    again.textContent=party.code?'Return to party':'Climb again';
    again.addEventListener('click',()=>party.code?this.scene.start('Menu'):this.scene.start('Game',{name:data.name,mapId:map}));
    lobby.addEventListener('click',()=>this.scene.start('Menu'));
    document.getElementById('game')!.appendChild(ui);
    const refreshNames=()=>{
      ui.querySelector('h1')!.textContent=data.leftEarly?'Standings when you left':(preferences.names?data.winner:'A climber')+' wins!';
      ui.querySelectorAll('tbody tr').forEach((row,i)=>{const p=data.placements[i],cell=row.children[1];cell.firstChild!.textContent=(preferences.names?p.name:'Climber')+(p.id===data.localId?' · YOU':'');});
    };
    window.addEventListener('jump-settings-change',refreshNames);
    const removeSettings=createSettings(ui);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN,()=>{window.removeEventListener('jump-settings-change',refreshNames);removeSettings();ui.remove();});
  }
}
