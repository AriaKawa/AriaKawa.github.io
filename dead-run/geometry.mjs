export const CAMERA_Z = -24;
export const NEAR_Z = -22;
export const FAR_Z = 240;

// Clip the solid, not just its individual walls: a near-plane cut retains a cap.
export function solidBox({x0,x1,z0,z1,bottom=0,top},camera={x:0,y:200,z:CAMERA_Z}) {
  if (![x0,x1,z0,z1,bottom,top].every(Number.isFinite) || x1<=x0 || z1<=z0 || top<=bottom || z1<=NEAR_Z || z0>=FAR_Z) return null;
  const near=Math.max(z0,NEAR_Z),far=Math.min(z1,FAR_Z);
  const uv=[(near-z0)/(z1-z0),(far-z0)/(z1-z0)];
  const faces=[];
  function face(name,normal,points) {
    const center=points.reduce((a,p)=>a.map((v,i)=>v+p[i]/4),[0,0,0]);
    const visible=normal[0]*(camera.x-center[0])+normal[1]*(camera.y-center[1])+normal[2]*(camera.z-center[2])>1e-7;
    faces.push({name,normal,points,visible,uv});
  }
  face('back',[0,0,1],[[x1,top,far],[x0,top,far],[x0,bottom,far],[x1,bottom,far]]);
  face('left',[-1,0,0],[[x0,top,near],[x0,top,far],[x0,bottom,far],[x0,bottom,near]]);
  face('right',[1,0,0],[[x1,top,near],[x1,top,far],[x1,bottom,far],[x1,bottom,near]]);
  face('floor',[0,-1,0],[[x0,bottom,near],[x0,bottom,far],[x1,bottom,far],[x1,bottom,near]]);
  face('roof',[0,1,0],[[x0,top,near],[x0,top,far],[x1,top,far],[x1,top,near]]);
  face('front',[0,0,-1],[[x0,top,near],[x1,top,near],[x1,bottom,near],[x0,bottom,near]]);
  return {faces,near,far,nearClipped:z0<NEAR_Z,farClipped:z1>FAR_Z};
}
