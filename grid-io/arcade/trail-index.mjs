const distance=(a,b)=>Math.sqrt((b.x-a.x)**2+(b.z-a.z)**2+((b.y||0)-(a.y||0))**2);

// Static trail edges stay indexed. Only the moving attachment, newly emitted
// edges, expired tail, or replaced/dead rider need work each physics tick.
export class TrailIndex {
  constructor(hash,head) {this.hash=hash;this.head=head;this.states=new Map();this.pool=[];}
  release(segment) {this.hash.remove(segment);this.pool.push(segment);}
  insert(segment,a,b,rider,endDistance) {
    Object.assign(segment,{a,b,rider,endDistance});
    const dx=b.x-a.x,dz=b.z-a.z,dy=(b.y||0)-(a.y||0),horizontal=dx*dx+dz*dz;
    if(horizontal<=36&&horizontal+dy*dy>1e-10)this.hash.insert(segment,(a.x+b.x)*.5,(a.z+b.z)*.5);
  }
  discard(rider) {
    const state=this.states.get(rider);if(!state)return;
    for(let i=state.offset;i<state.segments.length;i++)this.release(state.segments[i]);
    this.release(state.head);this.states.delete(rider);
  }
  reset(riders) {
    for(const rider of this.states.keys())this.discard(rider);
    this.hash.clear();this.update(riders);
  }
  update(riders) {
    for(const rider of riders) {
      const points=rider.trail;
      if(!rider.alive||!points.length){this.discard(rider);continue;}
      let state=this.states.get(rider),known=-1;
      if(state&&state.points===points) {
        for(let i=points.length-1;i>=0;i--)if(points[i]===state.last){known=i;break;}
      }
      if(known<0) {
        this.discard(rider);
        points[0]._distance=0;
        state={points,segments:[],offset:0,last:points[0],head:this.pool.pop()||{}};
        this.states.set(rider,state);known=0;
      } else {
        while(state.offset<state.segments.length&&state.segments[state.offset].a!==points[0])this.release(state.segments[state.offset++]);
        if(state.offset>256){state.segments.splice(0,state.offset);state.offset=0;}
      }
      for(let i=known+1;i<points.length;i++) {
        const a=points[i-1],b=points[i];b._distance=a._distance+distance(a,b);
        const segment=this.pool.pop()||{};this.insert(segment,a,b,rider,b._distance);state.segments.push(segment);
      }
      state.last=points.at(-1);
      const head=this.head(rider);rider._trailHeadDistance=state.last._distance+distance(state.last,head);
      this.hash.remove(state.head);this.insert(state.head,state.last,head,rider,rider._trailHeadDistance);
    }
  }
}
