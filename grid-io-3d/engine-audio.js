// Layered electric drive + combustion pulse, synthesized locally and unlocked by Play.
export class BikeEngine {
  constructor(context) {
    this.context=context;this.rpm=0;this.level=0;
    const c=context;this.output=c.createGain();this.output.gain.value=0;
    this.compressor=c.createDynamicsCompressor();this.compressor.threshold.value=-18;this.compressor.ratio.value=5;
    this.filter=c.createBiquadFilter();this.filter.type='lowpass';this.filter.frequency.value=700;
    this.filter.connect(this.output);this.output.connect(this.compressor);this.compressor.connect(c.destination);
    this.oscillators=[];
    for(const [type,frequency,volume] of [['sawtooth',55,.13],['triangle',110,.18],['sine',440,.055]]) {
      const oscillator=c.createOscillator(),gain=c.createGain();oscillator.type=type;oscillator.frequency.value=frequency;gain.gain.value=volume;
      oscillator.connect(gain);gain.connect(this.filter);oscillator.start();this.oscillators.push(oscillator);
    }
    const buffer=c.createBuffer(1,c.sampleRate,c.sampleRate),data=buffer.getChannelData(0);let previous=0;
    for(let i=0;i<data.length;i++){previous=(previous+(Math.random()*2-1)*.07)/1.03;data[i]=previous;}
    this.noise=c.createBufferSource();this.noise.buffer=buffer;this.noise.loop=true;
    this.air=c.createGain();this.air.gain.value=0;this.noise.connect(this.air);this.air.connect(this.output);this.noise.start();
    this.delay=c.createDelay(.3);this.delay.delayTime.value=.12;this.echo=c.createGain();this.echo.gain.value=0;
    this.output.connect(this.delay);this.delay.connect(this.echo);this.echo.connect(this.compressor);
  }
  update(rider,playing,soundOn) {
    const c=this.context,t=c.currentTime,speed=rider?.speed||0,enabled=playing&&soundOn&&rider?.alive;
    this.rpm=42+Math.min(speed,165)*2.8+(rider?.boost?35:0);
    this.level=enabled?(speed<.1?.15:.34):0;
    this.output.gain.setTargetAtTime(this.level,t,.09);
    this.oscillators[0].frequency.setTargetAtTime(this.rpm,t,.1);
    this.oscillators[1].frequency.setTargetAtTime(this.rpm*2.015,t,.1);
    this.oscillators[2].frequency.setTargetAtTime(220+this.rpm*3,t,.12);
    this.filter.frequency.setTargetAtTime(480+speed*15+(rider?.boost?600:0),t,.12);
    this.air.gain.setTargetAtTime(Math.min(.25,speed*.002),t,.12);
    this.echo.gain.setTargetAtTime((rider?.y||0)<-8?.32:0,t,.2);
  }
}
