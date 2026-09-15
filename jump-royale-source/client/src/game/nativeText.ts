import Phaser from 'phaser';

/** Draw game labels with the browser font renderer at physical display resolution.
 * World sprites retain their original pixel grid and camera scale. */
export class NativeGameText {
  private root=document.createElement('div');
  private labels=new Map<Phaser.GameObjects.Text,HTMLSpanElement>();
  constructor(private scene:Phaser.Scene){
    this.root.className='native-game-text';document.getElementById('game')!.append(this.root);
  }
  sync():void {
    const camera=this.scene.cameras.main,canvas=this.scene.game.canvas,rect=canvas.getBoundingClientRect();
    const sx=rect.width/this.scene.scale.width,sy=rect.height/this.scene.scale.height;
    const texts=this.scene.children.list.filter((o):o is Phaser.GameObjects.Text=>o instanceof Phaser.GameObjects.Text);
    const active=new Set(texts);
    for(const [text,label] of this.labels)if(!active.has(text)){label.remove();this.labels.delete(text);}
    for(const text of texts){
      let label=this.labels.get(text);
      if(!label){label=document.createElement('span');this.root.append(label);this.labels.set(text,label);camera.ignore(text);}
      label.hidden=!text.visible||text.alpha<=0;
      if(label.hidden)continue;
      const style=text.style;
      if(label.textContent!==text.text)label.textContent=text.text;
      Object.assign(label.style,{
        left:`${rect.left+(text.x-camera.scrollX*text.scrollFactorX)*sx}px`,
        top:`${rect.top+(text.y-camera.scrollY*text.scrollFactorY)*sy}px`,
        transform:`translate(${-text.originX*100}%,${-text.originY*100}%)`,
        fontFamily:style.fontFamily,fontSize:`${parseFloat(String(style.fontSize))*sy}px`,
        fontWeight:style.fontStyle.includes('bold')?'700':'500',
        lineHeight:`${(parseFloat(String(style.fontSize))+text.lineSpacing+3)*sy}px`,
        color:String(style.color),opacity:String(text.alpha),zIndex:String(Math.round(text.depth)),
        textAlign:style.align,backgroundColor:style.backgroundColor||'transparent',
        textShadow:style.strokeThickness?'0 1px 3px #08101a,0 0 3px #08101a':'none'
      });
    }
  }
  destroy():void {this.root.remove();this.labels.clear();}
}
