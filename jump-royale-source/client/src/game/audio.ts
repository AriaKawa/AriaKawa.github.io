import {preferences} from './settings';
type Cue='step'|'snow'|'grass'|'jump'|'button'|'wardrobe'|'ruff';
class GameAudio {
  private context?:AudioContext;
  private buffers=new Map<string,AudioBuffer>();
  private loading?:Promise<void>;
  private lava?:AudioBufferSourceNode;
  private gain?:GainNode;
  private lastStep=0;
  private muted=false;
  private target=0;
  private musicGain?:GainNode;
  private musicTimer?:ReturnType<typeof setInterval>;
  private musicBeat=0;
  private musicMap='';
  private magicalTrack?:HTMLAudioElement;
  private magicalSource?:MediaElementAudioSourceNode;
  private magicalGain?:GainNode;
  private musicFilter?:BiquadFilterNode;
  private musicDistanceGain?:GainNode;
  private musicDead=false;
  setMusicDead(dead:boolean):void {
    if(this.musicDead===dead)return;
    this.musicDead=dead;
    this.syncMusic();
  }
  private ensureMusicGraph():void {
    const c=this.context;if(!c)return;
    if(!this.musicFilter){
      this.musicFilter=c.createBiquadFilter();this.musicFilter.type='lowpass';
      this.musicFilter.Q.value=.5;
      this.musicFilter.frequency.value=this.musicDead?850:20000;
      this.musicDistanceGain=c.createGain();this.musicDistanceGain.gain.value=this.musicDead?.32:1;
      this.musicFilter.connect(this.musicDistanceGain).connect(c.destination);
      this.musicGain=c.createGain();this.musicGain.gain.value=0;this.musicGain.connect(this.musicFilter);
    }
    if(this.magicalTrack&&!this.magicalSource){
      this.magicalSource=c.createMediaElementSource(this.magicalTrack);
      this.magicalGain=c.createGain();this.magicalGain.gain.value=0;
      this.magicalSource.connect(this.magicalGain).connect(this.musicFilter);
    }
  }
  setMusicMap(map=''):void {
    this.musicMap=map;
    this.musicDead=false;
    if(map==='magical'&&!this.magicalTrack){
      this.magicalTrack=new Audio(`${import.meta.env.BASE_URL}assets/audio/mahou-shoujo.mp3`);
      this.magicalTrack.loop=true;
    }
    if(map!=='magical'&&this.magicalTrack){this.magicalTrack.pause();this.magicalTrack.currentTime=0;}
    this.syncMusic();
  }
  private syncMusic():void {
    this.ensureMusicGraph();
    const active=this.musicMap==='magical';
    if(this.context){
      const now=this.context.currentTime;
      this.musicGain?.gain.setTargetAtTime(active||document.hidden?0:preferences.music*.12,now,.03);
      this.magicalGain?.gain.setTargetAtTime(active&&!document.hidden?preferences.music:0,now,.03);
      // Let the current song recede smoothly while the player is a ghost.
      this.musicFilter?.frequency.setTargetAtTime(this.musicDead?850:20000,now,.22);
      this.musicDistanceGain?.gain.setTargetAtTime(this.musicDead?.32:1,now,.22);
    }
    if(!this.magicalTrack)return;
    this.magicalTrack.volume=1;
    if(active&&!document.hidden&&preferences.music>0&&this.context?.state==='running'){
      if(this.magicalTrack.paused)void this.magicalTrack.play().catch(()=>{});
    }else this.magicalTrack.pause();
  }
  private musicTick():void {
    const c=this.context;if(!c||c.state!=='running'||document.hidden||this.musicMap==='magical')return;
    this.ensureMusicGraph();
    this.musicGain!.gain.setTargetAtTime(preferences.music*.12,c.currentTime,.05);
    const melody=[64,67,71,67,62,66,69,66,60,64,67,64,62,66,69,71];
    const note=melody[this.musicBeat++%melody.length],o=c.createOscillator(),g=c.createGain();
    o.type='triangle';o.frequency.value=440*Math.pow(2,(note-69)/12);g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(.25,c.currentTime+.02);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.55);
    o.connect(g).connect(this.musicGain!);o.start();o.stop(c.currentTime+.6);o.onended=()=>{o.disconnect();g.disconnect();};
  }
  init():void {
    window.addEventListener('jump-settings-change',()=>{this.lavaDistance(this.target);this.syncMusic();});
    document.addEventListener('pointerdown',()=>void this.unlock());
    document.addEventListener('keydown',()=>void this.unlock());
    document.addEventListener('click',e=>{if((e.target as Element)?.closest('button'))this.play('button',.18);});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)this.gain?.gain.setTargetAtTime(0,this.context!.currentTime,.06);else this.lavaDistance(this.target);this.syncMusic();});
  }
  async unlock():Promise<void> {
    this.context??=new AudioContext();await this.context.resume();
    this.syncMusic();
    this.musicTimer??=setInterval(()=>this.musicTick(),360);
    this.loading??=Promise.all(['step','snow','grass','jump','button','wardrobe','ruff','lava'].map(async name=>{
      try{const r=await fetch(`${import.meta.env.BASE_URL}assets/audio/${name}.${name==='ruff'?'wav':'ogg'}`);if(!r.ok)return;this.buffers.set(name,await this.context!.decodeAudioData(await r.arrayBuffer()));}catch{}
    })).then(()=>{this.lavaDistance(this.target);});await this.loading;
  }
  play(cue:Cue,volume=.28):void {const b=this.buffers.get(cue);if(!b||!this.context||this.muted||document.hidden)return;const s=this.context.createBufferSource(),g=this.context.createGain();s.buffer=b;g.gain.value=volume*preferences.effects;s.connect(g).connect(this.context.destination);s.start();s.onended=()=>{s.disconnect();g.disconnect();};}
  step(moving:boolean,map='forge'):void {if(moving&&performance.now()-this.lastStep>270){this.lastStep=performance.now();this.play(map==='snow'?'snow':map==='jungle'?'grass':'step',.18);}}
  countdown(go=false):void {
    const c=this.context;if(!c||c.state!=='running'||this.muted||preferences.effects===0||document.hidden)return;
    const tone=c.createOscillator(),gain=c.createGain(),now=c.currentTime,duration=go?.32:.1;
    tone.type='sine';tone.frequency.setValueAtTime(go?1046.5:660,now);
    if(go)tone.frequency.exponentialRampToValueAtTime(1568,now+duration);
    gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.14*preferences.effects,now+.008);gain.gain.exponentialRampToValueAtTime(.001,now+duration);
    tone.connect(gain).connect(c.destination);tone.start(now);tone.stop(now+duration+.02);
    tone.onended=()=>{tone.disconnect();gain.disconnect();};
  }
  jump(dog:boolean):void{this.play(dog?'ruff':'jump',dog?.3:.22);}
  lavaDistance(intensity:number):void {
    this.target=intensity;if(!this.context)return;
    if(!this.lava&&this.buffers.has('lava')){this.lava=this.context.createBufferSource();this.lava.buffer=this.buffers.get('lava')!;this.lava.loop=true;this.gain=this.context.createGain();this.gain.gain.value=0;this.lava.connect(this.gain).connect(this.context.destination);this.lava.start();}
    this.gain?.gain.setTargetAtTime(this.muted||document.hidden?0:Math.max(0,Math.min(1,intensity))*.38*preferences.effects,this.context.currentTime,.16);
  }
}
export const audio=new GameAudio();
