// CORE COLLAPSE II — WebGL stellar backdrop: nebula, star plasma, corona, shockwave refraction, supernova shell.

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform vec2 uCenter;
uniform float uRing;     // danger ring radius (px)
uniform float uTime;
uniform float uHeat;
uniform vec3 uCol1;
uniform vec3 uCol2;
uniform vec4 uShock[4];
uniform float uCore;     // core radius (px)
uniform float uNova;     // 0..1 supernova shell progress
uniform float uImplode;  // 0..1 collapse
uniform float uEject;    // 0..1 mass ejection
uniform float uFlash;
uniform float uFlare;    // player flare 0..1
uniform float uWarn;     // stellar flare telegraph 0..1
uniform vec4 uComp;      // companion star x,y,radius,on
uniform float uQuality;
uniform float uStar;     // 0..1 presence of the star itself (fades out after a supernova)

float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++){ v += a*noise(p); p = m*p; a *= 0.5; }
  return v;
}
float fbm3(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 3; i++){ v += a*noise(p); p = m*p; a *= 0.5; }
  return v;
}

vec3 stars(vec2 uv, float scale, float t){
  vec2 g = uv*scale;
  vec2 id = floor(g), f = fract(g) - 0.5;
  float h = hash(id);
  if (h < 0.86) return vec3(0.0);
  vec2 o = vec2(hash(id+1.7), hash(id+3.1)) - 0.5;
  float d = length(f - o*0.7);
  float tw = 0.6 + 0.4*sin(t*(1.0+h*3.0) + h*40.0);
  float s = smoothstep(0.09, 0.0, d) * tw;
  s += smoothstep(0.35, 0.0, d) * 0.12 * tw;
  vec3 c = mix(vec3(0.7,0.8,1.0), vec3(1.0,0.85,0.7), hash(id+9.0));
  return c * s * (h - 0.86) * 7.0;
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 p = frag - uCenter;
  float glow = 0.0;

  // shockwave refraction
  for (int i = 0; i < 4; i++){
    vec4 s = uShock[i];
    if (s.w <= 0.0) continue;
    vec2 d = frag - s.xy;
    float r = length(d) + 0.001;
    float band = (r - s.z) / (18.0 + s.z*0.12);
    float w = exp(-band*band) * s.w;
    p -= d/r * w * 22.0;
    glow += w * 0.35;
  }

  vec2 q = p / uRing;
  float r = length(q);
  vec2 dir = q / max(r, 0.0001);
  float t = uTime;

  // ---------- deep space ----------
  vec2 uv = (frag - uRes*0.5) / uRes.y;
  vec2 warp = vec2(fbm(uv*1.6 + t*0.006), fbm(uv*1.6 + vec2(5.2,1.3) - t*0.005));
  float neb = fbm(uv*2.2 + warp*1.8 + q*0.04);
  float neb2 = fbm(uv*4.0 - warp + 11.0);
  vec3 space = vec3(0.006, 0.01, 0.025);
  space += uCol2 * pow(neb, 2.2) * 1.15;
  space += mix(uCol1, vec3(0.2,0.35,0.9), 0.55) * pow(neb2, 4.0) * 0.55;
  space += vec3(0.05,0.02,0.08) * smoothstep(0.4, 0.9, neb*neb2*2.0);
  // dust lanes
  space *= 0.55 + 0.45*smoothstep(0.25, 0.65, fbm(uv*3.0 - warp*0.6 + 3.0));
  space += stars(uv + q*0.004, 90.0, t) + stars(uv*1.3 + 4.0, 160.0, t*1.3)*0.6 + stars(uv*0.7 + 2.0, 50.0, t*0.6)*1.2;

  vec3 col = space;

  // ---------- corona (outside the ring) ----------
  float outside = r - 1.0;
  float swirlT = t * 0.12;
  vec2 cuv = dir * 2.4 + vec2(cos(swirlT), sin(swirlT)) * 0.4;
  float flame = fbm(cuv*1.6 + vec2(0.0, -r*2.2 + t*0.35));
  float flame2 = fbm3(dir*7.0 + vec2(r*3.0 - t*0.6, 1.0));
  float coronaFall = exp(-max(outside, 0.0) * (5.0 - uHeat*1.5 - uWarn*1.5));
  float corona = coronaFall * (0.35 + 1.1*pow(flame, 2.0) + 0.5*pow(flame2, 3.0));
  corona *= smoothstep(-0.02, 0.03, outside);
  vec3 coronaCol = mix(uCol1, vec3(1.0, 0.25, 0.12), uHeat*0.7 + uWarn*0.5);
  col += coronaCol * corona * (0.75 + uWarn*1.4 + uFlare*1.5) * (1.0 - uEject*0.6) * (1.0 - uImplode) * uStar;

  // prominences: occasional arcs
  float prom = smoothstep(0.62, 0.9, fbm3(dir*3.0 + t*0.05)) * exp(-max(outside,0.0)*9.0) * smoothstep(-0.01, 0.02, outside);
  col += coronaCol * prom * 1.3 * (1.0 - uImplode) * uStar;

  // ---------- stellar interior ----------
  float inside = 1.0 - smoothstep(0.985, 1.005, r);
  if (inside > 0.0){
    float ang = t*0.03 + (1.0 - r)*1.4;
    mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
    vec2 iq = rot * q;
    float pl = fbm(iq*3.2 + vec2(fbm(iq*2.0 - t*0.04), fbm(iq*2.0 + t*0.035))*1.3);
    float gran = fbm3(q*14.0 + t*0.08);
    vec3 deep = uCol2 * 0.18 + vec3(0.004, 0.006, 0.014);
    vec3 interior = deep;
    interior += uCol1 * pow(pl, 3.0) * 0.32;
    interior += uCol1 * gran * 0.025;
    interior += uCol1 * smoothstep(0.7, 1.0, r) * 0.12 * (0.6 + 0.4*pl);
    // convective cells shimmer toward center
    float coreGlow = exp(-(r * uRing - uCore) / (uRing*0.18));
    interior += mix(uCol1, vec3(1.0), 0.6) * clamp(coreGlow, 0.0, 1.5) * 0.18;
    // heat flush
    interior += vec3(0.5, 0.05, 0.02) * uHeat * (0.3 + 0.3*sin(t*9.0)) * smoothstep(0.5, 1.0, r);
    interior *= 1.0 - uImplode*0.85;
    col = mix(col, interior, inside * (1.0 - uEject) * uStar);
  }
  // bright limb line
  float limb = exp(-pow((r - 1.0) * uRing / 2.6, 2.0));
  col += mix(uCol1, vec3(1.0, 0.2, 0.1), uHeat) * limb * 0.45 * (1.0 - uImplode) * uStar * (1.0 - uEject);

  // ---------- companion star ----------
  if (uComp.w > 0.0){
    vec2 cd = frag - uComp.xy;
    float cr = length(cd) / uComp.z;
    vec3 cc = vec3(0.55, 0.75, 1.0);
    col += cc * exp(-cr*cr*1.2) * 1.4 * uComp.w;
    col += cc * 0.35 * exp(-cr*0.6) * uComp.w * (0.7 + 0.3*fbm3(cd/uComp.z*1.5 + t*0.3));
    // tidal stream toward the main star
    vec2 axis = normalize(uCenter - uComp.xy);
    float along = dot(frag - uComp.xy, axis);
    float perp = abs(dot(frag - uComp.xy, vec2(-axis.y, axis.x)));
    float span = length(uCenter - uComp.xy);
    float stream = smoothstep(0.0, 1.0, along/span) * (1.0 - smoothstep(0.75, 1.0, along/span));
    stream *= exp(-perp / (uComp.z*0.6)) * fbm3(vec2(along*0.02 - t*0.8, perp*0.03));
    col += cc * stream * 0.4 * uComp.w;
  }

  // ---------- supernova shell ----------
  if (uNova > 0.0){
    float R = uNova * 4.2;
    float shellD = r - R;
    float filaments = fbm(dir*5.0 + vec2(r*1.5, t*0.2)) ;
    float shell = exp(-shellD*shellD*18.0) * (0.6 + 1.6*pow(filaments, 1.5));
    float inner = smoothstep(R, 0.0, r) * (1.0 - uNova) * 1.6;
    vec3 shellCol = mix(vec3(1.0, 0.95, 0.85), mix(uCol1, vec3(0.4,0.7,1.0), 0.5), smoothstep(0.0, 0.6, uNova));
    col += shellCol * shell * (1.4 - uNova) * 1.6;
    col += mix(vec3(1.0), uCol1, 0.3) * inner * 0.6;
    // remnant nebula wisps
    float wisp = pow(fbm(q*1.5 + vec2(fbm(q*2.5 + 3.0), fbm(q*2.5 - 1.7)) - t*0.02), 2.5) * smoothstep(R*1.05, R*0.2, r);
    col += mix(uCol1, vec3(0.3,0.5,1.0), 0.5) * wisp * 2.2 * smoothstep(0.0, 0.25, uNova);
  }

  // ---------- mass ejection ----------
  if (uEject > 0.0){
    float R = 1.0 + uEject * 1.8;
    float shellD = r - R;
    float fil = fbm(dir*4.0 + vec2(r, t*0.1));
    float shell = exp(-shellD*shellD*10.0) * (0.4 + 1.2*fil) * (1.0 - uEject*0.6);
    col += vec3(1.0, 0.35, 0.25) * shell * 0.9;
    // small surviving star
    float small = exp(-r*r*40.0);
    col += vec3(1.0, 0.7, 0.5) * small * 1.2 * uEject;
  }

  col += vec3(0.6, 0.8, 1.0) * glow;
  col += vec3(1.0, 0.97, 0.92) * uFlash;

  // vignette + tone map
  float vig = 1.0 - 0.55 * pow(length((frag - uRes*0.5) / uRes.xy) * 1.25, 2.2);
  col *= vig;
  col = 1.0 - exp(-col * 1.25);
  col = pow(col, vec3(0.95));
  gl_FragColor = vec4(col, 1.0);
}`;

export class Background {
  constructor(canvas) {
    this.canvas = canvas;
    this.scale = 0.6;
    this.ok = false;
    this.u = {};
    try { this.initGL(); } catch (e) { console.warn('WebGL backdrop unavailable', e); this.ok = false; }
    if (!this.ok) this.ctx2d = canvas.getContext('2d');
  }

  initGL() {
    const gl = this.canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance', preserveDrawingBuffer: true });
    if (!gl) return;
    this.gl = gl;
    const sh = (type, src) => {
      const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    gl.useProgram(prog);
    this.prog = prog;
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    for (const n of ['uRes', 'uCenter', 'uRing', 'uTime', 'uHeat', 'uCol1', 'uCol2', 'uShock', 'uCore', 'uNova', 'uImplode', 'uEject', 'uFlash', 'uFlare', 'uWarn', 'uComp', 'uQuality', 'uStar']) {
      this.u[n] = gl.getUniformLocation(prog, n);
    }
    this.canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); this.ok = false; });
    this.canvas.addEventListener('webglcontextrestored', () => { try { this.initGL(); } catch { /* stay on fallback */ } });
    this.ok = true;
  }

  resize(w, h, quality) {
    this.scale = quality === 'low' ? 0.38 : quality === 'high' ? 0.8 : 0.58;
    this.canvas.width = Math.max(2, Math.round(w * this.scale));
    this.canvas.height = Math.max(2, Math.round(h * this.scale));
    this.cssH = h;
  }

  // s: state from the game in CSS pixels
  render(s) {
    const k = this.scale;
    const W = this.canvas.width, H = this.canvas.height;
    if (!this.ok) return this.fallback(s);
    const gl = this.gl, u = this.u;
    gl.viewport(0, 0, W, H);
    gl.uniform2f(u.uRes, W, H);
    gl.uniform2f(u.uCenter, s.cx * k, H - s.cy * k);
    gl.uniform1f(u.uRing, s.ring * k);
    gl.uniform1f(u.uTime, s.time);
    gl.uniform1f(u.uHeat, s.heat);
    gl.uniform3fv(u.uCol1, s.col1);
    gl.uniform3fv(u.uCol2, s.col2);
    const sh = new Float32Array(16);
    for (let i = 0; i < 4; i++) {
      const w = s.shocks[i];
      if (!w) continue;
      sh[i * 4] = w.x * k; sh[i * 4 + 1] = H - w.y * k; sh[i * 4 + 2] = w.r * k; sh[i * 4 + 3] = w.s;
    }
    gl.uniform4fv(u.uShock, sh);
    gl.uniform1f(u.uCore, s.core * k);
    gl.uniform1f(u.uNova, s.nova);
    gl.uniform1f(u.uImplode, s.implode);
    gl.uniform1f(u.uEject, s.eject);
    gl.uniform1f(u.uFlash, s.flash);
    gl.uniform1f(u.uFlare, s.flare);
    gl.uniform1f(u.uWarn, s.warn);
    gl.uniform1f(u.uStar, s.star ?? 1);
    if (s.comp) gl.uniform4f(u.uComp, s.comp.x * k, H - s.comp.y * k, s.comp.r * k, s.comp.on);
    else gl.uniform4f(u.uComp, 0, 0, 1, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  fallback(s) {
    const c = this.ctx2d, k = this.scale, W = this.canvas.width, H = this.canvas.height;
    const col = (a, m = 1) => `rgb(${a.map((v) => Math.round(Math.min(1, v * m) * 255)).join(',')})`;
    c.fillStyle = '#03050c'; c.fillRect(0, 0, W, H);
    const g = c.createRadialGradient(s.cx * k, s.cy * k, s.ring * k * 0.9, s.cx * k, s.cy * k, s.ring * k * 1.6);
    g.addColorStop(0, col(s.col1, 0.8)); g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    c.fillStyle = col(s.col2, 0.25);
    c.beginPath(); c.arc(s.cx * k, s.cy * k, s.ring * k, 0, Math.PI * 2); c.fill();
    if (s.flash > 0) { c.fillStyle = `rgba(255,250,240,${s.flash})`; c.fillRect(0, 0, W, H); }
  }
}
