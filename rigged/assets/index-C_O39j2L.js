(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Zl="179",vp=0,Wh=1,yp=2,Hd=1,Vd=2,di=3,Zn=0,dn=1,It=2,zi=0,Ys=1,Wr=2,Xh=3,qh=4,Mp=5,ls=100,Sp=101,wp=102,Ep=103,Tp=104,bp=200,Ap=201,Rp=202,Cp=203,Yc=204,Kc=205,Pp=206,Lp=207,Ip=208,Dp=209,Np=210,Up=211,Fp=212,Op=213,Bp=214,jc=0,$c=1,Zc=2,tr=3,Jc=4,Qc=5,el=6,tl=7,Jl=0,zp=1,kp=2,ki=0,Hp=1,Vp=2,Gp=3,Gd=4,Wp=5,Xp=6,qp=7,Yh="attached",Yp="detached",Wd=300,nr=301,ir=302,ma=303,nl=304,Ra=306,Gi=1e3,Ni=1001,ga=1002,on=1003,Xd=1004,Nr=1005,vn=1006,na=1007,pi=1008,Jn=1009,qd=1010,Yd=1011,Xr=1012,Ql=1013,xs=1014,Vn=1015,uo=1016,eh=1017,th=1018,qr=1020,Kd=35902,jd=1021,$d=1022,Pn=1023,Yr=1026,Kr=1027,nh=1028,ih=1029,Zd=1030,sh=1031,rh=1033,ia=33776,sa=33777,ra=33778,oa=33779,il=35840,sl=35841,rl=35842,ol=35843,al=36196,cl=37492,ll=37496,hl=37808,ul=37809,dl=37810,fl=37811,pl=37812,ml=37813,gl=37814,_l=37815,xl=37816,vl=37817,yl=37818,Ml=37819,Sl=37820,wl=37821,aa=36492,El=36494,Tl=36495,Jd=36283,bl=36284,Al=36285,Rl=36286,jr=2300,$r=2301,Ga=2302,Kh=2400,jh=2401,$h=2402,Kp=2500,jp=0,Qd=1,Cl=2,$p=3200,Zp=3201,oh=0,Jp=1,Ii="",yt="srgb",an="srgb-linear",_a="linear",ut="srgb",Rs=7680,Zh=519,Qp=512,em=513,tm=514,ef=515,nm=516,im=517,sm=518,rm=519,Pl=35044,Jh="300 es",jn=2e3,xa=2001;class pr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Qh=1234567;const zr=Math.PI/180,sr=180/Math.PI;function Dn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]).toLowerCase()}function je(i,e,t){return Math.max(e,Math.min(t,i))}function ah(i,e){return(i%e+e)%e}function om(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function am(i,e,t){return i!==e?(t-i)/(e-i):0}function kr(i,e,t){return(1-t)*i+t*e}function cm(i,e,t,n){return kr(i,e,1-Math.exp(-t*n))}function lm(i,e=1){return e-Math.abs(ah(i,e*2)-e)}function hm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function um(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function dm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function fm(i,e){return i+Math.random()*(e-i)}function pm(i){return i*(.5-Math.random())}function mm(i){i!==void 0&&(Qh=i);let e=Qh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function gm(i){return i*zr}function _m(i){return i*sr}function xm(i){return(i&i-1)===0&&i!==0}function vm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function ym(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Mm(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),m=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*m,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*m,a*l);break;case"ZYZ":i.set(c*m,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function kn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ct(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ae={DEG2RAD:zr,RAD2DEG:sr,generateUUID:Dn,clamp:je,euclideanModulo:ah,mapLinear:om,inverseLerp:am,lerp:kr,damp:cm,pingpong:lm,smoothstep:hm,smootherstep:um,randInt:dm,randFloat:fm,randFloatSpread:pm,seededRandom:mm,degToRad:gm,radToDeg:_m,isPowerOfTwo:xm,ceilPowerOfTwo:vm,floorPowerOfTwo:ym,setQuaternionFromProperEuler:Mm,normalize:ct,denormalize:kn};class ce{constructor(e=0,t=0){ce.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Un{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],m=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=_;return}if(u!==_||c!==d||l!==f||h!==m){let g=1-a;const p=c*d+l*f+h*m+u*_,y=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const R=Math.sqrt(S),A=Math.atan2(R,p*y);g=Math.sin(g*A)/R,a=Math.sin(a*A)/R}const x=a*y;if(c=c*g+d*x,l=l*g+f*x,h=h*g+m*x,u=u*g+_*x,g===1-a){const R=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=R,l*=R,h*=R,u*=R}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return e[t]=a*m+h*u+c*f-l*d,e[t+1]=c*m+h*d+l*u-a*f,e[t+2]=l*m+h*f+a*d-c*u,e[t+3]=h*m-a*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"YZX":this._x=d*h*u+l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u-d*f*m;break;case"XZY":this._x=d*h*u-l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(je(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class b{constructor(e=0,t=0,n=0){b.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(eu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(eu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Wa.copy(this).projectOnVector(e),this.sub(Wa)}reflect(e){return this.sub(Wa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Wa=new b,eu=new Un;class We{constructor(e,t,n,s,r,o,a,c,l){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],_=s[0],g=s[3],p=s[6],y=s[1],S=s[4],x=s[7],R=s[2],A=s[5],P=s[8];return r[0]=o*_+a*y+c*R,r[3]=o*g+a*S+c*A,r[6]=o*p+a*x+c*P,r[1]=l*_+h*y+u*R,r[4]=l*g+h*S+u*A,r[7]=l*p+h*x+u*P,r[2]=d*_+f*y+m*R,r[5]=d*g+f*S+m*A,r[8]=d*p+f*x+m*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,m=t*u+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=u*_,e[1]=(s*l-h*n)*_,e[2]=(a*n-s*o)*_,e[3]=d*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-a*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Xa.makeScale(e,t)),this}rotate(e){return this.premultiply(Xa.makeRotation(-e)),this}translate(e,t){return this.premultiply(Xa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Xa=new We;function tf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Zr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Sm(){const i=Zr("canvas");return i.style.display="block",i}const tu={};function Ks(i){i in tu||(tu[i]=!0,console.warn(i))}function wm(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const nu=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),iu=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Em(){const i={enabled:!0,workingColorSpace:an,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ut&&(s.r=vi(s.r),s.g=vi(s.g),s.b=vi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ut&&(s.r=js(s.r),s.g=js(s.g),s.b=js(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ii?_a:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ks("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ks("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[an]:{primaries:e,whitePoint:n,transfer:_a,toXYZ:nu,fromXYZ:iu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:yt},outputColorSpaceConfig:{drawingBufferColorSpace:yt}},[yt]:{primaries:e,whitePoint:n,transfer:ut,toXYZ:nu,fromXYZ:iu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:yt}}}),i}const Ze=Em();function vi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function js(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Cs;class Tm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Cs===void 0&&(Cs=Zr("canvas")),Cs.width=e.width,Cs.height=e.height;const s=Cs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Cs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Zr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=vi(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(vi(t[n]/255)*255):t[n]=vi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let bm=0;class ch{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bm++}),this.uuid=Dn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(qa(s[o].image)):r.push(qa(s[o]))}else r=qa(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function qa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Tm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Am=0;const Ya=new b;class qt extends pr{constructor(e=qt.DEFAULT_IMAGE,t=qt.DEFAULT_MAPPING,n=Ni,s=Ni,r=vn,o=pi,a=Pn,c=Jn,l=qt.DEFAULT_ANISOTROPY,h=Ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Am++}),this.uuid=Dn(),this.name="",this.source=new ch(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ya).x}get height(){return this.source.getSize(Ya).y}get depth(){return this.source.getSize(Ya).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Wd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gi:e.x=e.x-Math.floor(e.x);break;case Ni:e.x=e.x<0?0:1;break;case ga:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Gi:e.y=e.y-Math.floor(e.y);break;case Ni:e.y=e.y<0?0:1;break;case ga:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}qt.DEFAULT_IMAGE=null;qt.DEFAULT_MAPPING=Wd;qt.DEFAULT_ANISOTROPY=1;class ot{constructor(e=0,t=0,n=0,s=1){ot.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,x=(f+1)/2,R=(p+1)/2,A=(h+d)/4,P=(u+_)/4,D=(m+g)/4;return S>x&&S>R?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=A/n,r=P/n):x>R?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=A/s,r=D/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=P/r,s=D/r),this.set(n,s,r,t),this}let y=Math.sqrt((g-m)*(g-m)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(u-_)/y,this.z=(d-h)/y,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this.w=je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this.w=je(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Rm extends pr{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new qt(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:vn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new ch(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vs extends Rm{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class nf extends qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Cm extends qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Sn{constructor(e=new b(1/0,1/0,1/0),t=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(On.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(On.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=On.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,On):On.fromBufferAttribute(r,o),On.applyMatrix4(e.matrixWorld),this.expandByPoint(On);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),yo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),yo.copy(n.boundingBox)),yo.applyMatrix4(e.matrixWorld),this.union(yo)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,On),On.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(wr),Mo.subVectors(this.max,wr),Ps.subVectors(e.a,wr),Ls.subVectors(e.b,wr),Is.subVectors(e.c,wr),wi.subVectors(Ls,Ps),Ei.subVectors(Is,Ls),ji.subVectors(Ps,Is);let t=[0,-wi.z,wi.y,0,-Ei.z,Ei.y,0,-ji.z,ji.y,wi.z,0,-wi.x,Ei.z,0,-Ei.x,ji.z,0,-ji.x,-wi.y,wi.x,0,-Ei.y,Ei.x,0,-ji.y,ji.x,0];return!Ka(t,Ps,Ls,Is,Mo)||(t=[1,0,0,0,1,0,0,0,1],!Ka(t,Ps,Ls,Is,Mo))?!1:(So.crossVectors(wi,Ei),t=[So.x,So.y,So.z],Ka(t,Ps,Ls,Is,Mo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,On).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(On).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const si=[new b,new b,new b,new b,new b,new b,new b,new b],On=new b,yo=new Sn,Ps=new b,Ls=new b,Is=new b,wi=new b,Ei=new b,ji=new b,wr=new b,Mo=new b,So=new b,$i=new b;function Ka(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){$i.fromArray(i,r);const a=s.x*Math.abs($i.x)+s.y*Math.abs($i.y)+s.z*Math.abs($i.z),c=e.dot($i),l=t.dot($i),h=n.dot($i);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Pm=new Sn,Er=new b,ja=new b;class ei{constructor(e=new b,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Pm.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Er.subVectors(e,this.center);const t=Er.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Er,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ja.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Er.copy(e.center).add(ja)),this.expandByPoint(Er.copy(e.center).sub(ja))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const ri=new b,$a=new b,wo=new b,Ti=new b,Za=new b,Eo=new b,Ja=new b;class fo{constructor(e=new b,t=new b(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ri)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ri.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ri.copy(this.origin).addScaledVector(this.direction,t),ri.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){$a.copy(e).add(t).multiplyScalar(.5),wo.copy(t).sub(e).normalize(),Ti.copy(this.origin).sub($a);const r=e.distanceTo(t)*.5,o=-this.direction.dot(wo),a=Ti.dot(this.direction),c=-Ti.dot(wo),l=Ti.lengthSq(),h=Math.abs(1-o*o);let u,d,f,m;if(h>0)if(u=o*c-a,d=o*a-c,m=r*h,u>=0)if(d>=-m)if(d<=m){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=m?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy($a).addScaledVector(wo,d),f}intersectSphere(e,t){ri.subVectors(e.center,this.origin);const n=ri.dot(this.direction),s=ri.dot(ri)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ri)!==null}intersectTriangle(e,t,n,s,r){Za.subVectors(t,e),Eo.subVectors(n,e),Ja.crossVectors(Za,Eo);let o=this.direction.dot(Ja),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ti.subVectors(this.origin,e);const c=a*this.direction.dot(Eo.crossVectors(Ti,Eo));if(c<0)return null;const l=a*this.direction.dot(Za.cross(Ti));if(l<0||c+l>o)return null;const h=-a*Ti.dot(Ja);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ve{constructor(e,t,n,s,r,o,a,c,l,h,u,d,f,m,_,g){Ve.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,d,f,m,_,g)}set(e,t,n,s,r,o,a,c,l,h,u,d,f,m,_,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ve().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Ds.setFromMatrixColumn(e,0).length(),r=1/Ds.setFromMatrixColumn(e,1).length(),o=1/Ds.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,f=o*u,m=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+m*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=m+f*l,t[10]=o*c}else if(e.order==="YXZ"){const d=c*h,f=c*u,m=l*h,_=l*u;t[0]=d+_*a,t[4]=m*a-f,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-m,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){const d=c*h,f=c*u,m=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=m+f*a,t[1]=f+m*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const d=o*h,f=o*u,m=a*h,_=a*u;t[0]=c*h,t[4]=m*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-m,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,f=o*l,m=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=m*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*u+m,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*c,f=o*l,m=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-m,t[2]=m*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Lm,e,Im)}lookAt(e,t,n){const s=this.elements;return mn.subVectors(e,t),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),bi.crossVectors(n,mn),bi.lengthSq()===0&&(Math.abs(n.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),bi.crossVectors(n,mn)),bi.normalize(),To.crossVectors(mn,bi),s[0]=bi.x,s[4]=To.x,s[8]=mn.x,s[1]=bi.y,s[5]=To.y,s[9]=mn.y,s[2]=bi.z,s[6]=To.z,s[10]=mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],y=n[3],S=n[7],x=n[11],R=n[15],A=s[0],P=s[4],D=s[8],E=s[12],T=s[1],L=s[5],H=s[9],V=s[13],X=s[2],Z=s[6],K=s[10],Q=s[14],G=s[3],ue=s[7],ge=s[11],Pe=s[15];return r[0]=o*A+a*T+c*X+l*G,r[4]=o*P+a*L+c*Z+l*ue,r[8]=o*D+a*H+c*K+l*ge,r[12]=o*E+a*V+c*Q+l*Pe,r[1]=h*A+u*T+d*X+f*G,r[5]=h*P+u*L+d*Z+f*ue,r[9]=h*D+u*H+d*K+f*ge,r[13]=h*E+u*V+d*Q+f*Pe,r[2]=m*A+_*T+g*X+p*G,r[6]=m*P+_*L+g*Z+p*ue,r[10]=m*D+_*H+g*K+p*ge,r[14]=m*E+_*V+g*Q+p*Pe,r[3]=y*A+S*T+x*X+R*G,r[7]=y*P+S*L+x*Z+R*ue,r[11]=y*D+S*H+x*K+R*ge,r[15]=y*E+S*V+x*Q+R*Pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],m=e[3],_=e[7],g=e[11],p=e[15];return m*(+r*c*u-s*l*u-r*a*d+n*l*d+s*a*f-n*c*f)+_*(+t*c*f-t*l*d+r*o*d-s*o*f+s*l*h-r*c*h)+g*(+t*l*u-t*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+p*(-s*a*h-t*c*u+t*a*d+s*o*u-n*o*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],m=e[12],_=e[13],g=e[14],p=e[15],y=u*g*l-_*d*l+_*c*f-a*g*f-u*c*p+a*d*p,S=m*d*l-h*g*l-m*c*f+o*g*f+h*c*p-o*d*p,x=h*_*l-m*u*l+m*a*f-o*_*f-h*a*p+o*u*p,R=m*u*c-h*_*c-m*a*d+o*_*d+h*a*g-o*u*g,A=t*y+n*S+s*x+r*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/A;return e[0]=y*P,e[1]=(_*d*r-u*g*r-_*s*f+n*g*f+u*s*p-n*d*p)*P,e[2]=(a*g*r-_*c*r+_*s*l-n*g*l-a*s*p+n*c*p)*P,e[3]=(u*c*r-a*d*r-u*s*l+n*d*l+a*s*f-n*c*f)*P,e[4]=S*P,e[5]=(h*g*r-m*d*r+m*s*f-t*g*f-h*s*p+t*d*p)*P,e[6]=(m*c*r-o*g*r-m*s*l+t*g*l+o*s*p-t*c*p)*P,e[7]=(o*d*r-h*c*r+h*s*l-t*d*l-o*s*f+t*c*f)*P,e[8]=x*P,e[9]=(m*u*r-h*_*r-m*n*f+t*_*f+h*n*p-t*u*p)*P,e[10]=(o*_*r-m*a*r+m*n*l-t*_*l-o*n*p+t*a*p)*P,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*f-t*a*f)*P,e[12]=R*P,e[13]=(h*_*s-m*u*s+m*n*d-t*_*d-h*n*g+t*u*g)*P,e[14]=(m*a*s-o*_*s-m*n*c+t*_*c+o*n*g-t*a*g)*P,e[15]=(o*u*s-h*a*s+h*n*c-t*u*c-o*n*d+t*a*d)*P,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,m=r*u,_=o*h,g=o*u,p=a*u,y=c*l,S=c*h,x=c*u,R=n.x,A=n.y,P=n.z;return s[0]=(1-(_+p))*R,s[1]=(f+x)*R,s[2]=(m-S)*R,s[3]=0,s[4]=(f-x)*A,s[5]=(1-(d+p))*A,s[6]=(g+y)*A,s[7]=0,s[8]=(m+S)*P,s[9]=(g-y)*P,s[10]=(1-(d+_))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Ds.set(s[0],s[1],s[2]).length();const o=Ds.set(s[4],s[5],s[6]).length(),a=Ds.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Bn.copy(this);const l=1/r,h=1/o,u=1/a;return Bn.elements[0]*=l,Bn.elements[1]*=l,Bn.elements[2]*=l,Bn.elements[4]*=h,Bn.elements[5]*=h,Bn.elements[6]*=h,Bn.elements[8]*=u,Bn.elements[9]*=u,Bn.elements[10]*=u,t.setFromRotationMatrix(Bn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=jn,c=!1){const l=this.elements,h=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s);let m,_;if(c)m=r/(o-r),_=o*r/(o-r);else if(a===jn)m=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===xa)m=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=jn,c=!1){const l=this.elements,h=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s);let m,_;if(c)m=1/(o-r),_=o/(o-r);else if(a===jn)m=-2/(o-r),_=-(o+r)/(o-r);else if(a===xa)m=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ds=new b,Bn=new Ve,Lm=new b(0,0,0),Im=new b(1,1,1),bi=new b,To=new b,mn=new b,su=new Ve,ru=new Un;class Nn{constructor(e=0,t=0,n=0,s=Nn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(je(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-je(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return su.makeRotationFromQuaternion(e),this.setFromRotationMatrix(su,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ru.setFromEuler(this),this.setFromQuaternion(ru,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Nn.DEFAULT_ORDER="XYZ";class lh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Dm=0;const ou=new b,Ns=new Un,oi=new Ve,bo=new b,Tr=new b,Nm=new b,Um=new Un,au=new b(1,0,0),cu=new b(0,1,0),lu=new b(0,0,1),hu={type:"added"},Fm={type:"removed"},Us={type:"childadded",child:null},Qa={type:"childremoved",child:null};class mt extends pr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Dm++}),this.uuid=Dn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new b,t=new Nn,n=new Un,s=new b(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ve},normalMatrix:{value:new We}}),this.matrix=new Ve,this.matrixWorld=new Ve,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ns.setFromAxisAngle(e,t),this.quaternion.multiply(Ns),this}rotateOnWorldAxis(e,t){return Ns.setFromAxisAngle(e,t),this.quaternion.premultiply(Ns),this}rotateX(e){return this.rotateOnAxis(au,e)}rotateY(e){return this.rotateOnAxis(cu,e)}rotateZ(e){return this.rotateOnAxis(lu,e)}translateOnAxis(e,t){return ou.copy(e).applyQuaternion(this.quaternion),this.position.add(ou.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(au,e)}translateY(e){return this.translateOnAxis(cu,e)}translateZ(e){return this.translateOnAxis(lu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(oi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?bo.copy(e):bo.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Tr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?oi.lookAt(Tr,bo,this.up):oi.lookAt(bo,Tr,this.up),this.quaternion.setFromRotationMatrix(oi),s&&(oi.extractRotation(s.matrixWorld),Ns.setFromRotationMatrix(oi),this.quaternion.premultiply(Ns.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(hu),Us.child=e,this.dispatchEvent(Us),Us.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Fm),Qa.child=e,this.dispatchEvent(Qa),Qa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(oi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(hu),Us.child=e,this.dispatchEvent(Us),Us.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Tr,e,Nm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Tr,Um,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}mt.DEFAULT_UP=new b(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const zn=new b,ai=new b,ec=new b,ci=new b,Fs=new b,Os=new b,uu=new b,tc=new b,nc=new b,ic=new b,sc=new ot,rc=new ot,oc=new ot;class Hn{constructor(e=new b,t=new b,n=new b){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),zn.subVectors(e,t),s.cross(zn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){zn.subVectors(s,t),ai.subVectors(n,t),ec.subVectors(e,t);const o=zn.dot(zn),a=zn.dot(ai),c=zn.dot(ec),l=ai.dot(ai),h=ai.dot(ec),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,m=(o*h-a*c)*d;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ci)===null?!1:ci.x>=0&&ci.y>=0&&ci.x+ci.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,ci)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ci.x),c.addScaledVector(o,ci.y),c.addScaledVector(a,ci.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return sc.setScalar(0),rc.setScalar(0),oc.setScalar(0),sc.fromBufferAttribute(e,t),rc.fromBufferAttribute(e,n),oc.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(sc,r.x),o.addScaledVector(rc,r.y),o.addScaledVector(oc,r.z),o}static isFrontFacing(e,t,n,s){return zn.subVectors(n,t),ai.subVectors(e,t),zn.cross(ai).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zn.subVectors(this.c,this.b),ai.subVectors(this.a,this.b),zn.cross(ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Hn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Hn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Hn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Hn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Hn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Fs.subVectors(s,n),Os.subVectors(r,n),tc.subVectors(e,n);const c=Fs.dot(tc),l=Os.dot(tc);if(c<=0&&l<=0)return t.copy(n);nc.subVectors(e,s);const h=Fs.dot(nc),u=Os.dot(nc);if(h>=0&&u<=h)return t.copy(s);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Fs,o);ic.subVectors(e,r);const f=Fs.dot(ic),m=Os.dot(ic);if(m>=0&&f<=m)return t.copy(r);const _=f*l-c*m;if(_<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(n).addScaledVector(Os,a);const g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return uu.subVectors(r,s),a=(u-h)/(u-h+(f-m)),t.copy(s).addScaledVector(uu,a);const p=1/(g+_+d);return o=_*p,a=d*p,t.copy(n).addScaledVector(Fs,o).addScaledVector(Os,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const sf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ai={h:0,s:0,l:0},Ao={h:0,s:0,l:0};function ac(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class xe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ze.workingColorSpace){if(e=ah(e,1),t=je(t,0,1),n=je(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=ac(o,r,e+1/3),this.g=ac(o,r,e),this.b=ac(o,r,e-1/3)}return Ze.colorSpaceToWorking(this,s),this}setStyle(e,t=yt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){const n=sf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=vi(e.r),this.g=vi(e.g),this.b=vi(e.b),this}copyLinearToSRGB(e){return this.r=js(e.r),this.g=js(e.g),this.b=js(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return Ze.workingToColorSpace(jt.copy(this),e),Math.round(je(jt.r*255,0,255))*65536+Math.round(je(jt.g*255,0,255))*256+Math.round(je(jt.b*255,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.workingToColorSpace(jt.copy(this),t);const n=jt.r,s=jt.g,r=jt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ze.workingColorSpace){return Ze.workingToColorSpace(jt.copy(this),t),e.r=jt.r,e.g=jt.g,e.b=jt.b,e}getStyle(e=yt){Ze.workingToColorSpace(jt.copy(this),e);const t=jt.r,n=jt.g,s=jt.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ai),this.setHSL(Ai.h+e,Ai.s+t,Ai.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ai),e.getHSL(Ao);const n=kr(Ai.h,Ao.h,t),s=kr(Ai.s,Ao.s,t),r=kr(Ai.l,Ao.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const jt=new xe;xe.NAMES=sf;let Om=0;class yn extends pr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Om++}),this.uuid=Dn(),this.name="",this.type="Material",this.blending=Ys,this.side=Zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yc,this.blendDst=Kc,this.blendEquation=ls,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new xe(0,0,0),this.blendAlpha=0,this.depthFunc=tr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Rs,this.stencilZFail=Rs,this.stencilZPass=Rs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ys&&(n.blending=this.blending),this.side!==Zn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Yc&&(n.blendSrc=this.blendSrc),this.blendDst!==Kc&&(n.blendDst=this.blendDst),this.blendEquation!==ls&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==tr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Rs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Rs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Rs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class et extends yn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.combine=Jl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Dt=new b,Ro=new ce;let Bm=0;class Ot{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Bm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Pl,this.updateRanges=[],this.gpuType=Vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ro.fromBufferAttribute(this,t),Ro.applyMatrix3(e),this.setXY(t,Ro.x,Ro.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix3(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=kn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=kn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=kn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=kn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=kn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),s=ct(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),s=ct(s,this.array),r=ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Pl&&(e.usage=this.usage),e}}class rf extends Ot{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class of extends Ot{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ze extends Ot{constructor(e,t,n){super(new Float32Array(e),t,n)}}let zm=0;const Tn=new Ve,cc=new mt,Bs=new b,gn=new Sn,br=new Sn,Wt=new b;class xt extends pr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zm++}),this.uuid=Dn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(tf(e)?of:rf)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new We().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Tn.makeRotationFromQuaternion(e),this.applyMatrix4(Tn),this}rotateX(e){return Tn.makeRotationX(e),this.applyMatrix4(Tn),this}rotateY(e){return Tn.makeRotationY(e),this.applyMatrix4(Tn),this}rotateZ(e){return Tn.makeRotationZ(e),this.applyMatrix4(Tn),this}translate(e,t,n){return Tn.makeTranslation(e,t,n),this.applyMatrix4(Tn),this}scale(e,t,n){return Tn.makeScale(e,t,n),this.applyMatrix4(Tn),this}lookAt(e){return cc.lookAt(e),cc.updateMatrix(),this.applyMatrix4(cc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bs).negate(),this.translate(Bs.x,Bs.y,Bs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ze(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];gn.setFromBufferAttribute(r),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ei);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new b,1/0);return}if(e){const n=this.boundingSphere.center;if(gn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];br.setFromBufferAttribute(a),this.morphTargetsRelative?(Wt.addVectors(gn.min,br.min),gn.expandByPoint(Wt),Wt.addVectors(gn.max,br.max),gn.expandByPoint(Wt)):(gn.expandByPoint(br.min),gn.expandByPoint(br.max))}gn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Wt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Wt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Wt.fromBufferAttribute(a,l),c&&(Bs.fromBufferAttribute(e,l),Wt.add(Bs)),s=Math.max(s,n.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ot(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let D=0;D<n.count;D++)a[D]=new b,c[D]=new b;const l=new b,h=new b,u=new b,d=new ce,f=new ce,m=new ce,_=new b,g=new b;function p(D,E,T){l.fromBufferAttribute(n,D),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,T),d.fromBufferAttribute(r,D),f.fromBufferAttribute(r,E),m.fromBufferAttribute(r,T),h.sub(l),u.sub(l),f.sub(d),m.sub(d);const L=1/(f.x*m.y-m.x*f.y);isFinite(L)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(L),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(L),a[D].add(_),a[E].add(_),a[T].add(_),c[D].add(g),c[E].add(g),c[T].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let D=0,E=y.length;D<E;++D){const T=y[D],L=T.start,H=T.count;for(let V=L,X=L+H;V<X;V+=3)p(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const S=new b,x=new b,R=new b,A=new b;function P(D){R.fromBufferAttribute(s,D),A.copy(R);const E=a[D];S.copy(E),S.sub(R.multiplyScalar(R.dot(E))).normalize(),x.crossVectors(A,E);const L=x.dot(c[D])<0?-1:1;o.setXYZW(D,S.x,S.y,S.z,L)}for(let D=0,E=y.length;D<E;++D){const T=y[D],L=T.start,H=T.count;for(let V=L,X=L+H;V<X;V+=3)P(e.getX(V+0)),P(e.getX(V+1)),P(e.getX(V+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ot(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new b,r=new b,o=new b,a=new b,c=new b,l=new b,h=new b,u=new b;if(e)for(let d=0,f=e.count;d<f;d+=3){const m=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,m=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let p=0;p<h;p++)d[m++]=l[f++]}return new Ot(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new xt,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const du=new Ve,Zi=new fo,Co=new ei,fu=new b,Po=new b,Lo=new b,Io=new b,lc=new b,Do=new b,pu=new b,No=new b;class j extends mt{constructor(e=new xt,t=new et){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Do.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(lc.fromBufferAttribute(u,e),o?Do.addScaledVector(lc,h):Do.addScaledVector(lc.sub(t),h))}t.add(Do)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Co.copy(n.boundingSphere),Co.applyMatrix4(r),Zi.copy(e.ray).recast(e.near),!(Co.containsPoint(Zi.origin)===!1&&(Zi.intersectSphere(Co,fu)===null||Zi.origin.distanceToSquared(fu)>(e.far-e.near)**2))&&(du.copy(r).invert(),Zi.copy(e.ray).applyMatrix4(du),!(n.boundingBox!==null&&Zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Zi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=o[g.materialIndex],y=Math.max(g.start,f.start),S=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let x=y,R=S;x<R;x+=3){const A=a.getX(x),P=a.getX(x+1),D=a.getX(x+2);s=Uo(this,p,e,n,l,h,u,A,P,D),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const y=a.getX(g),S=a.getX(g+1),x=a.getX(g+2);s=Uo(this,o,e,n,l,h,u,y,S,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=o[g.materialIndex],y=Math.max(g.start,f.start),S=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let x=y,R=S;x<R;x+=3){const A=x,P=x+1,D=x+2;s=Uo(this,p,e,n,l,h,u,A,P,D),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const y=g,S=g+1,x=g+2;s=Uo(this,o,e,n,l,h,u,y,S,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function km(i,e,t,n,s,r,o,a){let c;if(e.side===dn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Zn,a),c===null)return null;No.copy(a),No.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(No);return l<t.near||l>t.far?null:{distance:l,point:No.clone(),object:i}}function Uo(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,Po),i.getVertexPosition(c,Lo),i.getVertexPosition(l,Io);const h=km(i,e,t,n,Po,Lo,Io,pu);if(h){const u=new b;Hn.getBarycoord(pu,Po,Lo,Io,u),s&&(h.uv=Hn.getInterpolatedAttribute(s,a,c,l,u,new ce)),r&&(h.uv1=Hn.getInterpolatedAttribute(r,a,c,l,u,new ce)),o&&(h.normal=Hn.getInterpolatedAttribute(o,a,c,l,u,new b),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new b,materialIndex:0};Hn.getNormal(Po,Lo,Io,d.normal),h.face=d,h.barycoord=u}return h}class Ke extends xt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,s,o,2),m("x","z","y",1,-1,e,n,-t,s,o,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ze(l,3)),this.setAttribute("normal",new ze(h,3)),this.setAttribute("uv",new ze(u,2));function m(_,g,p,y,S,x,R,A,P,D,E){const T=x/P,L=R/D,H=x/2,V=R/2,X=A/2,Z=P+1,K=D+1;let Q=0,G=0;const ue=new b;for(let ge=0;ge<K;ge++){const Pe=ge*L-V;for(let qe=0;qe<Z;qe++){const St=qe*T-H;ue[_]=St*y,ue[g]=Pe*S,ue[p]=X,l.push(ue.x,ue.y,ue.z),ue[_]=0,ue[g]=0,ue[p]=A>0?1:-1,h.push(ue.x,ue.y,ue.z),u.push(qe/P),u.push(1-ge/D),Q+=1}}for(let ge=0;ge<D;ge++)for(let Pe=0;Pe<P;Pe++){const qe=d+Pe+Z*ge,St=d+Pe+Z*(ge+1),dt=d+(Pe+1)+Z*(ge+1),Y=d+(Pe+1)+Z*ge;c.push(qe,St,Y),c.push(St,dt,Y),G+=6}a.addGroup(f,G,E),f+=G,d+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ke(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function rr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function tn(i){const e={};for(let t=0;t<i.length;t++){const n=rr(i[t]);for(const s in n)e[s]=n[s]}return e}function Hm(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function af(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}const Vm={clone:rr,merge:tn};var Gm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mi extends yn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gm,this.fragmentShader=Wm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=rr(e.uniforms),this.uniformsGroups=Hm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class cf extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ve,this.projectionMatrix=new Ve,this.projectionMatrixInverse=new Ve,this.coordinateSystem=jn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ri=new b,mu=new ce,gu=new ce;class sn extends cf{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=sr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return sr*2*Math.atan(Math.tan(zr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ri.x,Ri.y).multiplyScalar(-e/Ri.z),Ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ri.x,Ri.y).multiplyScalar(-e/Ri.z)}getViewSize(e,t){return this.getViewBounds(e,mu,gu),t.subVectors(gu,mu)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(zr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const zs=-90,ks=1;class Xm extends mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new sn(zs,ks,e,t);s.layers=this.layers,this.add(s);const r=new sn(zs,ks,e,t);r.layers=this.layers,this.add(r);const o=new sn(zs,ks,e,t);o.layers=this.layers,this.add(o);const a=new sn(zs,ks,e,t);a.layers=this.layers,this.add(a);const c=new sn(zs,ks,e,t);c.layers=this.layers,this.add(c);const l=new sn(zs,ks,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===jn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===xa)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class lf extends qt{constructor(e=[],t=nr,n,s,r,o,a,c,l,h){super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class qm extends vs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new lf(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ke(5,5,5),r=new Mi({name:"CubemapFromEquirect",uniforms:rr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:dn,blending:zi});r.uniforms.tEquirect.value=t;const o=new j(s,r),a=t.minFilter;return t.minFilter===pi&&(t.minFilter=vn),new Xm(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}class st extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ym={type:"move"};class hc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new st,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new st,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new st,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;l.inputState.pinching&&d>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ym)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new st;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class hh{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new xe(e),this.density=t}clone(){return new hh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Km extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Nn,this.environmentIntensity=1,this.environmentRotation=new Nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class jm{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Pl,this.updateRanges=[],this.version=0,this.uuid=Dn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const en=new b;class uh{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=kn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=kn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=kn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=kn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=kn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),s=ct(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),s=ct(s,this.array),r=ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ot(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new uh(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const _u=new b,xu=new ot,vu=new ot,$m=new b,yu=new Ve,Fo=new b,uc=new ei,Mu=new Ve,dc=new fo;class Zm extends j{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Yh,this.bindMatrix=new Ve,this.bindMatrixInverse=new Ve,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Sn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Fo),this.boundingBox.expandByPoint(Fo)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ei),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Fo),this.boundingSphere.expandByPoint(Fo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),uc.copy(this.boundingSphere),uc.applyMatrix4(s),e.ray.intersectsSphere(uc)!==!1&&(Mu.copy(s).invert(),dc.copy(e.ray).applyMatrix4(Mu),!(this.boundingBox!==null&&dc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,dc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ot,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Yh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Yp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;xu.fromBufferAttribute(s.attributes.skinIndex,e),vu.fromBufferAttribute(s.attributes.skinWeight,e),_u.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=vu.getComponent(r);if(o!==0){const a=xu.getComponent(r);yu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector($m.copy(_u).applyMatrix4(yu),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class hf extends mt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class uf extends qt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=on,h=on,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Su=new Ve,Jm=new Ve;class dh{constructor(e=[],t=[]){this.uuid=Dn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ve)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ve;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:Jm;Su.multiplyMatrices(a,t[r]),Su.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new dh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new uf(t,e,e,Pn,Vn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new hf),this.bones.push(o),this.boneInverses.push(new Ve().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const o=t[s];e.bones.push(o.uuid);const a=n[s];e.boneInverses.push(a.toArray())}return e}}class Ll extends Ot{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Hs=new Ve,wu=new Ve,Oo=[],Eu=new Sn,Qm=new Ve,Ar=new j,Rr=new ei;class eg extends j{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ll(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Qm)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Sn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hs),Eu.copy(e.boundingBox).applyMatrix4(Hs),this.boundingBox.union(Eu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ei),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hs),Rr.copy(e.boundingSphere).applyMatrix4(Hs),this.boundingSphere.union(Rr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Ar.geometry=this.geometry,Ar.material=this.material,Ar.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Rr.copy(this.boundingSphere),Rr.applyMatrix4(n),e.ray.intersectsSphere(Rr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Hs),wu.multiplyMatrices(n,Hs),Ar.matrixWorld=wu,Ar.raycast(e,Oo);for(let o=0,a=Oo.length;o<a;o++){const c=Oo[o];c.instanceId=r,c.object=this,t.push(c)}Oo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ll(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new uf(new Float32Array(s*this.count),s,this.count,nh,Vn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const fc=new b,tg=new b,ng=new We;class Pi{constructor(e=new b(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=fc.subVectors(n,t).cross(tg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(fc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||ng.getNormalMatrix(e),s=this.coplanarPoint(fc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ji=new ei,ig=new ce(.5,.5),Bo=new b;class fh{constructor(e=new Pi,t=new Pi,n=new Pi,s=new Pi,r=new Pi,o=new Pi){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=jn,n=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],m=r[8],_=r[9],g=r[10],p=r[11],y=r[12],S=r[13],x=r[14],R=r[15];if(s[0].setComponents(l-o,f-h,p-m,R-y).normalize(),s[1].setComponents(l+o,f+h,p+m,R+y).normalize(),s[2].setComponents(l+a,f+u,p+_,R+S).normalize(),s[3].setComponents(l-a,f-u,p-_,R-S).normalize(),n)s[4].setComponents(c,d,g,x).normalize(),s[5].setComponents(l-c,f-d,p-g,R-x).normalize();else if(s[4].setComponents(l-c,f-d,p-g,R-x).normalize(),t===jn)s[5].setComponents(l+c,f+d,p+g,R+x).normalize();else if(t===xa)s[5].setComponents(c,d,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ji.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ji.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ji)}intersectsSprite(e){Ji.center.set(0,0,0);const t=ig.distanceTo(e.center);return Ji.radius=.7071067811865476+t,Ji.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ji)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Bo.x=s.normal.x>0?e.max.x:e.min.x,Bo.y=s.normal.y>0?e.max.y:e.min.y,Bo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Bo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Hi extends yn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new xe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const va=new b,ya=new b,Tu=new Ve,Cr=new fo,zo=new ei,pc=new b,bu=new b;class Ca extends mt{constructor(e=new xt,t=new Hi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)va.fromBufferAttribute(t,s-1),ya.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=va.distanceTo(ya);e.setAttribute("lineDistance",new ze(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zo.copy(n.boundingSphere),zo.applyMatrix4(s),zo.radius+=r,e.ray.intersectsSphere(zo)===!1)return;Tu.copy(s).invert(),Cr.copy(e.ray).applyMatrix4(Tu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let _=f,g=m-1;_<g;_+=l){const p=h.getX(_),y=h.getX(_+1),S=ko(this,e,Cr,c,p,y,_);S&&t.push(S)}if(this.isLineLoop){const _=h.getX(m-1),g=h.getX(f),p=ko(this,e,Cr,c,_,g,m-1);p&&t.push(p)}}else{const f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let _=f,g=m-1;_<g;_+=l){const p=ko(this,e,Cr,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=ko(this,e,Cr,c,m-1,f,m-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ko(i,e,t,n,s,r,o){const a=i.geometry.attributes.position;if(va.fromBufferAttribute(a,s),ya.fromBufferAttribute(a,r),t.distanceSqToSegment(va,ya,pc,bu)>n)return;pc.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(pc);if(!(l<e.near||l>e.far))return{distance:l,point:bu.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Au=new b,Ru=new b;class Jr extends Ca{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Au.fromBufferAttribute(t,s),Ru.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Au.distanceTo(Ru);e.setAttribute("lineDistance",new ze(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class sg extends Ca{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class us extends yn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Cu=new Ve,Il=new fo,Ho=new ei,Vo=new b;class Hr extends mt{constructor(e=new xt,t=new us){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ho.copy(n.boundingSphere),Ho.applyMatrix4(s),Ho.radius+=r,e.ray.intersectsSphere(Ho)===!1)return;Cu.copy(s).invert(),Il.copy(e.ray).applyMatrix4(Cu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let m=d,_=f;m<_;m++){const g=l.getX(m);Vo.fromBufferAttribute(u,g),Pu(Vo,g,c,s,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let m=d,_=f;m<_;m++)Vo.fromBufferAttribute(u,m),Pu(Vo,m,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Pu(i,e,t,n,s,r,o){const a=Il.distanceSqToPoint(i);if(a<t){const c=new b;Il.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class df extends qt{constructor(e,t,n=xs,s,r,o,a=on,c=on,l,h=Yr,u=1){if(h!==Yr&&h!==Kr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ch(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Qr extends xt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],c=[],l=new b,h=new ce;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*s;l.x=e*Math.cos(f),l.y=e*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ze(o,3)),this.setAttribute("normal",new ze(a,3)),this.setAttribute("uv",new ze(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qr(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Mt extends xt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let m=0;const _=[],g=n/2;let p=0;y(),o===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new ze(u,3)),this.setAttribute("normal",new ze(d,3)),this.setAttribute("uv",new ze(f,2));function y(){const x=new b,R=new b;let A=0;const P=(t-e)/n;for(let D=0;D<=r;D++){const E=[],T=D/r,L=T*(t-e)+e;for(let H=0;H<=s;H++){const V=H/s,X=V*c+a,Z=Math.sin(X),K=Math.cos(X);R.x=L*Z,R.y=-T*n+g,R.z=L*K,u.push(R.x,R.y,R.z),x.set(Z,P,K).normalize(),d.push(x.x,x.y,x.z),f.push(V,1-T),E.push(m++)}_.push(E)}for(let D=0;D<s;D++)for(let E=0;E<r;E++){const T=_[E][D],L=_[E+1][D],H=_[E+1][D+1],V=_[E][D+1];(e>0||E!==0)&&(h.push(T,L,V),A+=3),(t>0||E!==r-1)&&(h.push(L,H,V),A+=3)}l.addGroup(p,A,0),p+=A}function S(x){const R=m,A=new ce,P=new b;let D=0;const E=x===!0?e:t,T=x===!0?1:-1;for(let H=1;H<=s;H++)u.push(0,g*T,0),d.push(0,T,0),f.push(.5,.5),m++;const L=m;for(let H=0;H<=s;H++){const X=H/s*c+a,Z=Math.cos(X),K=Math.sin(X);P.x=E*K,P.y=g*T,P.z=E*Z,u.push(P.x,P.y,P.z),d.push(0,T,0),A.x=Z*.5+.5,A.y=K*.5*T+.5,f.push(A.x,A.y),m++}for(let H=0;H<s;H++){const V=R+H,X=L+H;x===!0?h.push(X,X+1,V):h.push(X+1,X,V),D+=3}l.addGroup(p,D,x===!0?1:2),p+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class eo extends Mt{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new eo(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Pa extends xt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new ze(r,3)),this.setAttribute("normal",new ze(r.slice(),3)),this.setAttribute("uv",new ze(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const S=new b,x=new b,R=new b;for(let A=0;A<t.length;A+=3)f(t[A+0],S),f(t[A+1],x),f(t[A+2],R),c(S,x,R,y)}function c(y,S,x,R){const A=R+1,P=[];for(let D=0;D<=A;D++){P[D]=[];const E=y.clone().lerp(x,D/A),T=S.clone().lerp(x,D/A),L=A-D;for(let H=0;H<=L;H++)H===0&&D===A?P[D][H]=E:P[D][H]=E.clone().lerp(T,H/L)}for(let D=0;D<A;D++)for(let E=0;E<2*(A-D)-1;E++){const T=Math.floor(E/2);E%2===0?(d(P[D][T+1]),d(P[D+1][T]),d(P[D][T])):(d(P[D][T+1]),d(P[D+1][T+1]),d(P[D+1][T]))}}function l(y){const S=new b;for(let x=0;x<r.length;x+=3)S.x=r[x+0],S.y=r[x+1],S.z=r[x+2],S.normalize().multiplyScalar(y),r[x+0]=S.x,r[x+1]=S.y,r[x+2]=S.z}function h(){const y=new b;for(let S=0;S<r.length;S+=3){y.x=r[S+0],y.y=r[S+1],y.z=r[S+2];const x=g(y)/2/Math.PI+.5,R=p(y)/Math.PI+.5;o.push(x,1-R)}m(),u()}function u(){for(let y=0;y<o.length;y+=6){const S=o[y+0],x=o[y+2],R=o[y+4],A=Math.max(S,x,R),P=Math.min(S,x,R);A>.9&&P<.1&&(S<.2&&(o[y+0]+=1),x<.2&&(o[y+2]+=1),R<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,S){const x=y*3;S.x=e[x+0],S.y=e[x+1],S.z=e[x+2]}function m(){const y=new b,S=new b,x=new b,R=new b,A=new ce,P=new ce,D=new ce;for(let E=0,T=0;E<r.length;E+=9,T+=6){y.set(r[E+0],r[E+1],r[E+2]),S.set(r[E+3],r[E+4],r[E+5]),x.set(r[E+6],r[E+7],r[E+8]),A.set(o[T+0],o[T+1]),P.set(o[T+2],o[T+3]),D.set(o[T+4],o[T+5]),R.copy(y).add(S).add(x).divideScalar(3);const L=g(R);_(A,T+0,y,L),_(P,T+2,S,L),_(D,T+4,x,L)}}function _(y,S,x,R){R<0&&y.x===1&&(o[S]=y.x-1),x.x===0&&x.z===0&&(o[S]=R/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pa(e.vertices,e.indices,e.radius,e.details)}}class mr extends Pa{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new mr(e.radius,e.detail)}}class ti{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new ce:new b);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new b,s=[],r=[],o=[],a=new b,c=new Ve;for(let f=0;f<=e;f++){const m=f/e;s[f]=this.getTangentAt(m,new b)}r[0]=new b,o[0]=new b;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(je(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(je(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ph extends ti{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new ce){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class rg extends ph{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function mh(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const Go=new b,mc=new mh,gc=new mh,_c=new mh;class og extends ti{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new b){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Go.subVectors(s[0],s[1]).add(s[0]),l=Go);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Go.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Go),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),mc.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,m,_,g),gc.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,m,_,g),_c.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,m,_,g)}else this.curveType==="catmullrom"&&(mc.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),gc.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),_c.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(mc.calc(c),gc.calc(c),_c.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new b().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Lu(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function ag(i,e){const t=1-i;return t*t*e}function cg(i,e){return 2*(1-i)*i*e}function lg(i,e){return i*i*e}function Vr(i,e,t,n){return ag(i,e)+cg(i,t)+lg(i,n)}function hg(i,e){const t=1-i;return t*t*t*e}function ug(i,e){const t=1-i;return 3*t*t*i*e}function dg(i,e){return 3*(1-i)*i*i*e}function fg(i,e){return i*i*i*e}function Gr(i,e,t,n,s){return hg(i,e)+ug(i,t)+dg(i,n)+fg(i,s)}class ff extends ti{constructor(e=new ce,t=new ce,n=new ce,s=new ce){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ce){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Gr(e,s.x,r.x,o.x,a.x),Gr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class pg extends ti{constructor(e=new b,t=new b,n=new b,s=new b){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new b){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Gr(e,s.x,r.x,o.x,a.x),Gr(e,s.y,r.y,o.y,a.y),Gr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class pf extends ti{constructor(e=new ce,t=new ce){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ce){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ce){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mg extends ti{constructor(e=new b,t=new b){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new b){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new b){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mf extends ti{constructor(e=new ce,t=new ce,n=new ce){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ce){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Vr(e,s.x,r.x,o.x),Vr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class gg extends ti{constructor(e=new b,t=new b,n=new b){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new b){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Vr(e,s.x,r.x,o.x),Vr(e,s.y,r.y,o.y),Vr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class gf extends ti{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ce){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Lu(a,c.x,l.x,h.x,u.x),Lu(a,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new ce().fromArray(s))}return this}}var Iu=Object.freeze({__proto__:null,ArcCurve:rg,CatmullRomCurve3:og,CubicBezierCurve:ff,CubicBezierCurve3:pg,EllipseCurve:ph,LineCurve:pf,LineCurve3:mg,QuadraticBezierCurve:mf,QuadraticBezierCurve3:gg,SplineCurve:gf});class _g extends ti{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Iu[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Iu[s.type]().fromJSON(s))}return this}}class Du extends _g{constructor(e){super(),this.type="Path",this.currentPoint=new ce,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new pf(this.currentPoint.clone(),new ce(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new mf(this.currentPoint.clone(),new ce(e,t),new ce(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new ff(this.currentPoint.clone(),new ce(e,t),new ce(n,s),new ce(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new gf(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){const l=new ph(e,t,n,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class _f extends Du{constructor(e){super(e),this.uuid=Dn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new Du().fromJSON(s))}return this}}function xg(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=xf(i,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=wg(i,e,r,t)),i.length>80*t){a=1/0,c=1/0;let h=-1/0,u=-1/0;for(let d=t;d<s;d+=t){const f=i[d],m=i[d+1];f<a&&(a=f),m<c&&(c=m),f>h&&(h=f),m>u&&(u=m)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return to(r,o,t,a,c,l,0),o}function xf(i,e,t,n,s){let r;if(s===Ng(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=Nu(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Nu(o/n|0,i[o],i[o+1],r);return r&&or(r,r.next)&&(io(r),r=r.next),r}function ys(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(or(t,t.next)||At(t.prev,t,t.next)===0)){if(io(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function to(i,e,t,n,s,r,o){if(!i)return;!o&&r&&Rg(i,n,s,r);let a=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(r?yg(i,n,s,r):vg(i)){e.push(c.i,i.i,l.i),io(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Mg(ys(i),e),to(i,e,t,n,s,r,2)):o===2&&Sg(i,e,t,n,s,r):to(ys(i),e,t,n,s,r,1);break}}}function vg(i){const e=i.prev,t=i,n=i.next;if(At(e,t,n)>=0)return!1;const s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=Math.min(s,r,o),u=Math.min(a,c,l),d=Math.max(s,r,o),f=Math.max(a,c,l);let m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&Ur(s,a,r,c,o,l,m.x,m.y)&&At(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function yg(i,e,t,n){const s=i.prev,r=i,o=i.next;if(At(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,d=o.y,f=Math.min(a,c,l),m=Math.min(h,u,d),_=Math.max(a,c,l),g=Math.max(h,u,d),p=Dl(f,m,e,t,n),y=Dl(_,g,e,t,n);let S=i.prevZ,x=i.nextZ;for(;S&&S.z>=p&&x&&x.z<=y;){if(S.x>=f&&S.x<=_&&S.y>=m&&S.y<=g&&S!==s&&S!==o&&Ur(a,h,c,u,l,d,S.x,S.y)&&At(S.prev,S,S.next)>=0||(S=S.prevZ,x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==s&&x!==o&&Ur(a,h,c,u,l,d,x.x,x.y)&&At(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;S&&S.z>=p;){if(S.x>=f&&S.x<=_&&S.y>=m&&S.y<=g&&S!==s&&S!==o&&Ur(a,h,c,u,l,d,S.x,S.y)&&At(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;x&&x.z<=y;){if(x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==s&&x!==o&&Ur(a,h,c,u,l,d,x.x,x.y)&&At(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Mg(i,e){let t=i;do{const n=t.prev,s=t.next.next;!or(n,s)&&yf(n,t,t.next,s)&&no(n,s)&&no(s,n)&&(e.push(n.i,t.i,s.i),io(t),io(t.next),t=i=s),t=t.next}while(t!==i);return ys(t)}function Sg(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Lg(o,a)){let c=Mf(o,a);o=ys(o,o.next),c=ys(c,c.next),to(o,e,t,n,s,r,0),to(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function wg(i,e,t,n){const s=[];for(let r=0,o=e.length;r<o;r++){const a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,l=xf(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(Pg(l))}s.sort(Eg);for(let r=0;r<s.length;r++)t=Tg(s[r],t);return t}function Eg(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Tg(i,e){const t=bg(i,e);if(!t)return e;const n=Mf(t,i);return ys(n,n.next),ys(t,t.next)}function bg(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,o;if(or(i,t))return t;do{if(or(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;const a=o,c=o.x,l=o.y;let h=1/0;t=o;do{if(n>=t.x&&t.x>=c&&n!==t.x&&vf(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){const u=Math.abs(s-t.y)/(n-t.x);no(t,i)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&Ag(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function Ag(i,e){return At(i.prev,i,e.prev)<0&&At(e.next,i,i.next)<0}function Rg(i,e,t,n){let s=i;do s.z===0&&(s.z=Dl(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Cg(s)}function Cg(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let l=0;l<t&&(a++,o=o.nextZ,!!o);l++);let c=t;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function Dl(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Pg(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function vf(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function Ur(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&vf(i,e,t,n,s,r,o,a)}function Lg(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Ig(i,e)&&(no(i,e)&&no(e,i)&&Dg(i,e)&&(At(i.prev,i,e.prev)||At(i,e.prev,e))||or(i,e)&&At(i.prev,i,i.next)>0&&At(e.prev,e,e.next)>0)}function At(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function or(i,e){return i.x===e.x&&i.y===e.y}function yf(i,e,t,n){const s=Xo(At(i,e,t)),r=Xo(At(i,e,n)),o=Xo(At(t,n,i)),a=Xo(At(t,n,e));return!!(s!==r&&o!==a||s===0&&Wo(i,t,e)||r===0&&Wo(i,n,e)||o===0&&Wo(t,i,n)||a===0&&Wo(t,e,n))}function Wo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Xo(i){return i>0?1:i<0?-1:0}function Ig(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&yf(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function no(i,e){return At(i.prev,i,i.next)<0?At(i,e,i.next)>=0&&At(i,i.prev,e)>=0:At(i,e,i.prev)<0||At(i,i.next,e)<0}function Dg(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Mf(i,e){const t=Nl(i.i,i.x,i.y),n=Nl(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Nu(i,e,t,n){const s=Nl(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function io(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Nl(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Ng(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class Ug{static triangulate(e,t,n=2){return xg(e,t,n)}}class $s{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return $s.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Uu(e),Fu(n,e);let o=e.length;t.forEach(Uu);for(let c=0;c<t.length;c++)s.push(o),o+=t[c].length,Fu(n,t[c]);const a=Ug.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function Uu(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Fu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class gh extends Pa{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new gh(e.radius,e.detail)}}class gr extends xt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,d=t/c,f=[],m=[],_=[],g=[];for(let p=0;p<h;p++){const y=p*d-o;for(let S=0;S<l;S++){const x=S*u-r;m.push(x,-y,0),_.push(0,0,1),g.push(S/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<a;y++){const S=y+l*p,x=y+l*(p+1),R=y+1+l*(p+1),A=y+1+l*p;f.push(S,x,A),f.push(x,R,A)}this.setIndex(f),this.setAttribute("position",new ze(m,3)),this.setAttribute("normal",new ze(_,3)),this.setAttribute("uv",new ze(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Si extends xt{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=e;const d=(t-e)/s,f=new b,m=new ce;for(let _=0;_<=s;_++){for(let g=0;g<=n;g++){const p=r+g/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,h.push(m.x,m.y)}u+=d}for(let _=0;_<s;_++){const g=_*(n+1);for(let p=0;p<n;p++){const y=p+g,S=y,x=y+n+1,R=y+n+2,A=y+1;a.push(S,x,A),a.push(x,R,A)}}this.setIndex(a),this.setAttribute("position",new ze(c,3)),this.setAttribute("normal",new ze(l,3)),this.setAttribute("uv",new ze(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Si(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class _h extends xt{constructor(e=new _f([new ce(0,.5),new ce(-.5,-.5),new ce(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new ze(s,3)),this.setAttribute("normal",new ze(r,3)),this.setAttribute("uv",new ze(o,2));function l(h){const u=s.length/3,d=h.extractPoints(t);let f=d.shape;const m=d.holes;$s.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){const y=m[g];$s.isClockWise(y)===!0&&(m[g]=y.reverse())}const _=$s.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){const y=m[g];f=f.concat(y)}for(let g=0,p=f.length;g<p;g++){const y=f[g];s.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let g=0,p=_.length;g<p;g++){const y=_[g],S=y[0]+u,x=y[1]+u,R=y[2]+u;n.push(S,x,R),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Fg(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const o=t[e.shapes[s]];n.push(o)}return new _h(n,e.curveSegments)}}function Fg(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class bs extends xt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new b,d=new b,f=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){const y=[],S=p/n;let x=0;p===0&&o===0?x=.5/t:p===n&&c===Math.PI&&(x=-.5/t);for(let R=0;R<=t;R++){const A=R/t;u.x=-e*Math.cos(s+A*r)*Math.sin(o+S*a),u.y=e*Math.cos(o+S*a),u.z=e*Math.sin(s+A*r)*Math.sin(o+S*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(A+x,1-S),y.push(l++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<t;y++){const S=h[p][y+1],x=h[p][y],R=h[p+1][y],A=h[p+1][y+1];(p!==0||o>0)&&f.push(S,x,A),(p!==n-1||c<Math.PI)&&f.push(x,R,A)}this.setIndex(f),this.setAttribute("position",new ze(m,3)),this.setAttribute("normal",new ze(_,3)),this.setAttribute("uv",new ze(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ar extends xt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new b,u=new b,d=new b;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){const _=m/s*r,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(_),u.y=(e+t*Math.cos(g))*Math.sin(_),u.z=t*Math.sin(g),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(m/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){const _=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,y=(s+1)*f+m;o.push(_,g,y),o.push(g,p,y)}this.setIndex(o),this.setAttribute("position",new ze(a,3)),this.setAttribute("normal",new ze(c,3)),this.setAttribute("uv",new ze(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ar(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Bt extends yn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oh,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ni extends Bt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ce(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return je(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new xe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new xe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new xe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class xh extends yn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new xe(16777215),this.specular=new xe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oh,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.combine=Jl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Og extends yn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=$p,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Bg extends yn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function qo(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function zg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function kg(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Ou(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function Sf(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}class po{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Hg extends po{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Kh,endingEnd:Kh}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case jh:r=e,a=2*t-n;break;case $h:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case jh:o=e,c=2*n-t;break;case $h:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(s-t),_=m*m,g=_*m,p=-d*g+2*d*_-d*m,y=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*m+1,S=(-1-f)*g+(1.5+f)*_+.5*m,x=f*g-f*_;for(let R=0;R!==a;++R)r[R]=p*o[h+R]+y*o[l+R]+S*o[c+R]+x*o[u+R];return r}}class Vg extends po{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}}class Gg extends po{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Wn{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=qo(t,this.TimeBufferType),this.values=qo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:qo(e.times,Array),values:qo(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Gg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Vg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Hg(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case jr:t=this.InterpolantFactoryMethodDiscrete;break;case $r:t=this.InterpolantFactoryMethodLinear;break;case Ga:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return jr;case this.InterpolantFactoryMethodLinear:return $r;case this.InterpolantFactoryMethodSmooth:return Ga}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&zg(s))for(let a=0,c=s.length;a!==c;++a){const l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ga,r=e.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{const u=a*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){const _=t[u+m];if(_!==t[d+m]||_!==t[f+m]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Wn.prototype.ValueTypeName="";Wn.prototype.TimeBufferType=Float32Array;Wn.prototype.ValueBufferType=Float32Array;Wn.prototype.DefaultInterpolation=$r;class _r extends Wn{constructor(e,t,n){super(e,t,n)}}_r.prototype.ValueTypeName="bool";_r.prototype.ValueBufferType=Array;_r.prototype.DefaultInterpolation=jr;_r.prototype.InterpolantFactoryMethodLinear=void 0;_r.prototype.InterpolantFactoryMethodSmooth=void 0;class wf extends Wn{constructor(e,t,n,s){super(e,t,n,s)}}wf.prototype.ValueTypeName="color";class cr extends Wn{constructor(e,t,n,s){super(e,t,n,s)}}cr.prototype.ValueTypeName="number";class Wg extends po{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t);let l=e*a;for(let h=l+a;l!==h;l+=4)Un.slerpFlat(r,0,o,l-a,o,l,c);return r}}class lr extends Wn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Wg(this.times,this.values,this.getValueSize(),e)}}lr.prototype.ValueTypeName="quaternion";lr.prototype.InterpolantFactoryMethodSmooth=void 0;class xr extends Wn{constructor(e,t,n){super(e,t,n)}}xr.prototype.ValueTypeName="string";xr.prototype.ValueBufferType=Array;xr.prototype.DefaultInterpolation=jr;xr.prototype.InterpolantFactoryMethodLinear=void 0;xr.prototype.InterpolantFactoryMethodSmooth=void 0;class hr extends Wn{constructor(e,t,n,s){super(e,t,n,s)}}hr.prototype.ValueTypeName="vector";class Xg{constructor(e="",t=-1,n=[],s=Kp){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Dn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Yg(n[o]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Wn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const h=kg(c);c=Ou(c,1,h),l=Ou(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new cr(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],h=l.name.match(r);if(h&&h.length>1){const u=h[1];let d=s[u];d||(s[u]=d=[]),d.push(l)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,m,_){if(f.length!==0){const g=[],p=[];Sf(f,g,p,m),g.length!==0&&_.push(new u(d,g,p))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let _=0;_<d[m].morphTargets.length;_++)f[d[m].morphTargets[_]]=-1;for(const _ in f){const g=[],p=[];for(let y=0;y!==d[m].morphTargets.length;++y){const S=d[m];g.push(S.time),p.push(S.morphTarget===_?1:0)}s.push(new cr(".morphTargetInfluence["+_+"]",g,p))}c=f.length*o}else{const f=".bones["+t[u].name+"]";n(hr,f+".position",d,"pos",s),n(lr,f+".quaternion",d,"rot",s),n(hr,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function qg(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return cr;case"vector":case"vector2":case"vector3":case"vector4":return hr;case"color":return wf;case"quaternion":return lr;case"bool":case"boolean":return _r;case"string":return xr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Yg(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=qg(i.type);if(i.times===void 0){const t=[],n=[];Sf(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const mi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Kg{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],m=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const Ef=new Kg;class qi{constructor(e){this.manager=e!==void 0?e:Ef,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}qi.DEFAULT_MATERIAL_NAME="__DEFAULT";const li={};class jg extends Error{constructor(e,t){super(e),this.response=t}}class La extends qi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=mi.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(li[e]!==void 0){li[e].push({onLoad:t,onProgress:n,onError:s});return}li[e]=[],li[e].push({onLoad:t,onProgress:n,onError:s});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=li[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let _=0;const g=new ReadableStream({start(p){y();function y(){u.read().then(({done:S,value:x})=>{if(S)p.close();else{_+=x.byteLength;const R=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:f});for(let A=0,P=h.length;A<P;A++){const D=h[A];D.onProgress&&D.onProgress(R)}p.enqueue(x),y()}},S=>{p.error(S)})}}});return new Response(g)}else throw new jg(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a==="")return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(m=>f.decode(m))}}}).then(l=>{mi.add(`file:${e}`,l);const h=li[e];delete li[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=li[e];if(h===void 0)throw this.manager.itemError(e),l;delete li[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Vs=new WeakMap;class $g extends qi{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=mi.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let u=Vs.get(o);u===void 0&&(u=[],Vs.set(o,u)),u.push({onLoad:t,onError:s})}return o}const a=Zr("img");function c(){h(),t&&t(this);const u=Vs.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}Vs.delete(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),mi.remove(`image:${e}`);const d=Vs.get(this)||[];for(let f=0;f<d.length;f++){const m=d[f];m.onError&&m.onError(u)}Vs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),mi.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}}class vh extends qi{constructor(e){super(e)}load(e,t,n,s){const r=new qt,o=new $g(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class Ia extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new xe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Zg extends Ia{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new xe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const xc=new Ve,Bu=new b,zu=new b;class yh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.mapType=Jn,this.map=null,this.mapPass=null,this.matrix=new Ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fh,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Bu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bu),zu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zu),t.updateMatrixWorld(),xc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(xc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Jg extends yh{constructor(){super(new sn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=sr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Qg extends Ia{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Jg}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const ku=new Ve,Pr=new b,vc=new b;class e0 extends yh{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ce(4,2),this._viewportCount=6,this._viewports=[new ot(2,1,1,1),new ot(0,1,1,1),new ot(3,1,1,1),new ot(1,1,1,1),new ot(3,0,1,1),new ot(1,0,1,1)],this._cubeDirections=[new b(1,0,0),new b(-1,0,0),new b(0,0,1),new b(0,0,-1),new b(0,1,0),new b(0,-1,0)],this._cubeUps=[new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,0,1),new b(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Pr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Pr),vc.copy(n.position),vc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(vc),n.updateMatrixWorld(),s.makeTranslation(-Pr.x,-Pr.y,-Pr.z),ku.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ku,n.coordinateSystem,n.reversedDepth)}}class vr extends Ia{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new e0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Mh extends cf{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class t0 extends yh{constructor(){super(new Mh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Tf extends Ia{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new t0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Zs{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const yc=new WeakMap;class n0 extends qi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=mi.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{if(yc.has(o)===!0)s&&s(yc.get(o)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(l),r.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return mi.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),yc.set(c,l),mi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});mi.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class i0 extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class s0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const Sh="\\[\\]\\.:\\/",r0=new RegExp("["+Sh+"]","g"),wh="[^"+Sh+"]",o0="[^"+Sh.replace("\\.","")+"]",a0=/((?:WC+[\/:])*)/.source.replace("WC",wh),c0=/(WCOD+)?/.source.replace("WCOD",o0),l0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",wh),h0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",wh),u0=new RegExp("^"+a0+c0+l0+h0+"$"),d0=["material","materials","bones","map"];class f0{constructor(e,t,n){const s=n||lt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class lt{constructor(e,t,n){this.path=t,this.parsedPath=n||lt.parseTrackName(t),this.node=lt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new lt.Composite(e,t,n):new lt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(r0,"")}static parseTrackName(e){const t=u0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);d0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=lt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[s];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}lt.Composite=f0;lt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};lt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};lt.prototype.GetterByBindingType=[lt.prototype._getValue_direct,lt.prototype._getValue_array,lt.prototype._getValue_arrayElement,lt.prototype._getValue_toArray];lt.prototype.SetterByBindingTypeAndVersioning=[[lt.prototype._setValue_direct,lt.prototype._setValue_direct_setNeedsUpdate,lt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_array,lt.prototype._setValue_array_setNeedsUpdate,lt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_arrayElement,lt.prototype._setValue_arrayElement_setNeedsUpdate,lt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_fromArray,lt.prototype._setValue_fromArray_setNeedsUpdate,lt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Hu=new Ve;class bf{constructor(e,t,n=0,s=1/0){this.ray=new fo(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new lh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Hu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Hu),this}intersectObject(e,t=!0,n=[]){return Ul(e,this,n,t),n.sort(Vu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Ul(e[s],this,n,t);return n.sort(Vu),n}}function Vu(i,e){return i.distance-e.distance}function Ul(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Ul(r[o],e,t,!0)}}const Yo=new Sn;class p0 extends Jr{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),s=new Float32Array(24),r=new xt;r.setIndex(new Ot(n,1)),r.setAttribute("position",new Ot(s,3)),super(r,new Hi({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&Yo.setFromObject(this.object),Yo.isEmpty())return;const e=Yo.min,t=Yo.max,n=this.geometry.attributes.position,s=n.array;s[0]=t.x,s[1]=t.y,s[2]=t.z,s[3]=e.x,s[4]=t.y,s[5]=t.z,s[6]=e.x,s[7]=e.y,s[8]=t.z,s[9]=t.x,s[10]=e.y,s[11]=t.z,s[12]=t.x,s[13]=t.y,s[14]=e.z,s[15]=e.x,s[16]=t.y,s[17]=e.z,s[18]=e.x,s[19]=e.y,s[20]=e.z,s[21]=t.x,s[22]=e.y,s[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}const Gu=new b;let Ko,Mc;class mo extends mt{constructor(e=new b(0,0,1),t=new b(0,0,0),n=1,s=16776960,r=n*.2,o=r*.2){super(),this.type="ArrowHelper",Ko===void 0&&(Ko=new xt,Ko.setAttribute("position",new ze([0,0,0,0,1,0],3)),Mc=new eo(.5,1,5,1),Mc.translate(0,-.5,0)),this.position.copy(t),this.line=new Ca(Ko,new Hi({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new j(Mc,new et({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,o)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Gu.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Gu,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}function Wu(i,e,t,n){const s=m0(n);switch(t){case jd:return i*e;case nh:return i*e/s.components*s.byteLength;case ih:return i*e/s.components*s.byteLength;case Zd:return i*e*2/s.components*s.byteLength;case sh:return i*e*2/s.components*s.byteLength;case $d:return i*e*3/s.components*s.byteLength;case Pn:return i*e*4/s.components*s.byteLength;case rh:return i*e*4/s.components*s.byteLength;case ia:case sa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ra:case oa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case sl:case ol:return Math.max(i,16)*Math.max(e,8)/4;case il:case rl:return Math.max(i,8)*Math.max(e,8)/2;case al:case cl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ll:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case hl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ul:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case dl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case fl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case pl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ml:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case gl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case _l:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case xl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case vl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case yl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ml:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Sl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case wl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case aa:case El:case Tl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Jd:case bl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Al:case Rl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function m0(i){switch(i){case Jn:case qd:return{byteLength:1,components:1};case Xr:case Yd:case uo:return{byteLength:2,components:1};case eh:case th:return{byteLength:2,components:4};case xs:case Ql:case Vn:return{byteLength:4,components:1};case Kd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zl);function Af(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function g0(i){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],_=u[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const _=u[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var _0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,x0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,v0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,y0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,M0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,S0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,w0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,E0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,T0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,b0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,A0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,R0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,C0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,P0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,L0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,I0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,D0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,N0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,U0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,F0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,O0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,B0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,z0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,k0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,H0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,V0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,G0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,W0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,X0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,q0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Y0="gl_FragColor = linearToOutputTexel( gl_FragColor );",K0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,j0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,$0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Z0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,J0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Q0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,e_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,t_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,n_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,i_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,s_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,r_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,o_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,a_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,c_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,l_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,h_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,u_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,d_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,f_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,p_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,m_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,g_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,__=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,x_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,v_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,y_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,M_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,S_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,w_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,E_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,T_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,b_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,A_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,R_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,C_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,P_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,L_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,I_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,D_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,N_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,U_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,F_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,O_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,B_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,z_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,k_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,H_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,V_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,G_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,W_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,X_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,q_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Y_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,K_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,j_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Z_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,J_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSEDEPTHBUF
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSEDEPTHBUF
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare , distribution.x );
		#endif
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Q_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ex=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,tx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,nx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ix=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,sx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ox=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ax=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,hx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ux=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,px=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,mx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const gx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_x=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,wx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSEDEPTHBUF
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ex=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Tx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,bx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ax=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Cx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Px=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Lx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ix=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ux=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ox=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Bx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Hx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Xx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Kx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xe={alphahash_fragment:_0,alphahash_pars_fragment:x0,alphamap_fragment:v0,alphamap_pars_fragment:y0,alphatest_fragment:M0,alphatest_pars_fragment:S0,aomap_fragment:w0,aomap_pars_fragment:E0,batching_pars_vertex:T0,batching_vertex:b0,begin_vertex:A0,beginnormal_vertex:R0,bsdfs:C0,iridescence_fragment:P0,bumpmap_pars_fragment:L0,clipping_planes_fragment:I0,clipping_planes_pars_fragment:D0,clipping_planes_pars_vertex:N0,clipping_planes_vertex:U0,color_fragment:F0,color_pars_fragment:O0,color_pars_vertex:B0,color_vertex:z0,common:k0,cube_uv_reflection_fragment:H0,defaultnormal_vertex:V0,displacementmap_pars_vertex:G0,displacementmap_vertex:W0,emissivemap_fragment:X0,emissivemap_pars_fragment:q0,colorspace_fragment:Y0,colorspace_pars_fragment:K0,envmap_fragment:j0,envmap_common_pars_fragment:$0,envmap_pars_fragment:Z0,envmap_pars_vertex:J0,envmap_physical_pars_fragment:l_,envmap_vertex:Q0,fog_vertex:e_,fog_pars_vertex:t_,fog_fragment:n_,fog_pars_fragment:i_,gradientmap_pars_fragment:s_,lightmap_pars_fragment:r_,lights_lambert_fragment:o_,lights_lambert_pars_fragment:a_,lights_pars_begin:c_,lights_toon_fragment:h_,lights_toon_pars_fragment:u_,lights_phong_fragment:d_,lights_phong_pars_fragment:f_,lights_physical_fragment:p_,lights_physical_pars_fragment:m_,lights_fragment_begin:g_,lights_fragment_maps:__,lights_fragment_end:x_,logdepthbuf_fragment:v_,logdepthbuf_pars_fragment:y_,logdepthbuf_pars_vertex:M_,logdepthbuf_vertex:S_,map_fragment:w_,map_pars_fragment:E_,map_particle_fragment:T_,map_particle_pars_fragment:b_,metalnessmap_fragment:A_,metalnessmap_pars_fragment:R_,morphinstance_vertex:C_,morphcolor_vertex:P_,morphnormal_vertex:L_,morphtarget_pars_vertex:I_,morphtarget_vertex:D_,normal_fragment_begin:N_,normal_fragment_maps:U_,normal_pars_fragment:F_,normal_pars_vertex:O_,normal_vertex:B_,normalmap_pars_fragment:z_,clearcoat_normal_fragment_begin:k_,clearcoat_normal_fragment_maps:H_,clearcoat_pars_fragment:V_,iridescence_pars_fragment:G_,opaque_fragment:W_,packing:X_,premultiplied_alpha_fragment:q_,project_vertex:Y_,dithering_fragment:K_,dithering_pars_fragment:j_,roughnessmap_fragment:$_,roughnessmap_pars_fragment:Z_,shadowmap_pars_fragment:J_,shadowmap_pars_vertex:Q_,shadowmap_vertex:ex,shadowmask_pars_fragment:tx,skinbase_vertex:nx,skinning_pars_vertex:ix,skinning_vertex:sx,skinnormal_vertex:rx,specularmap_fragment:ox,specularmap_pars_fragment:ax,tonemapping_fragment:cx,tonemapping_pars_fragment:lx,transmission_fragment:hx,transmission_pars_fragment:ux,uv_pars_fragment:dx,uv_pars_vertex:fx,uv_vertex:px,worldpos_vertex:mx,background_vert:gx,background_frag:_x,backgroundCube_vert:xx,backgroundCube_frag:vx,cube_vert:yx,cube_frag:Mx,depth_vert:Sx,depth_frag:wx,distanceRGBA_vert:Ex,distanceRGBA_frag:Tx,equirect_vert:bx,equirect_frag:Ax,linedashed_vert:Rx,linedashed_frag:Cx,meshbasic_vert:Px,meshbasic_frag:Lx,meshlambert_vert:Ix,meshlambert_frag:Dx,meshmatcap_vert:Nx,meshmatcap_frag:Ux,meshnormal_vert:Fx,meshnormal_frag:Ox,meshphong_vert:Bx,meshphong_frag:zx,meshphysical_vert:kx,meshphysical_frag:Hx,meshtoon_vert:Vx,meshtoon_frag:Gx,points_vert:Wx,points_frag:Xx,shadow_vert:qx,shadow_frag:Yx,sprite_vert:Kx,sprite_frag:jx},le={common:{diffuse:{value:new xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new xe(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},Yn={basic:{uniforms:tn([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:tn([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new xe(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:tn([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new xe(0)},specular:{value:new xe(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:tn([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:tn([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new xe(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:tn([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:tn([le.points,le.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:tn([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:tn([le.common,le.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:tn([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:tn([le.sprite,le.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:tn([le.common,le.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:tn([le.lights,le.fog,{color:{value:new xe(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};Yn.physical={uniforms:tn([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new xe(0)},specularColor:{value:new xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const jo={r:0,b:0,g:0},Qi=new Nn,$x=new Ve;function Zx(i,e,t,n,s,r,o){const a=new xe(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function m(S){let x=S.isScene===!0?S.background:null;return x&&x.isTexture&&(x=(S.backgroundBlurriness>0?t:e).get(x)),x}function _(S){let x=!1;const R=m(S);R===null?p(a,c):R&&R.isColor&&(p(R,1),x=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(S,x){const R=m(x);R&&(R.isCubeTexture||R.mapping===Ra)?(h===void 0&&(h=new j(new Ke(1,1,1),new Mi({name:"BackgroundCubeMaterial",uniforms:rr(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,P,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Qi.copy(x.backgroundRotation),Qi.x*=-1,Qi.y*=-1,Qi.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Qi.y*=-1,Qi.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4($x.makeRotationFromEuler(Qi)),h.material.toneMapped=Ze.getTransfer(R.colorSpace)!==ut,(u!==R||d!==R.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=R,d=R.version,f=i.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(l===void 0&&(l=new j(new gr(2,2),new Mi({name:"BackgroundMaterial",uniforms:rr(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=R,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=Ze.getTransfer(R.colorSpace)!==ut,R.matrixAutoUpdate===!0&&R.updateMatrix(),l.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||d!==R.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=R,d=R.version,f=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,x){S.getRGB(jo,af(i)),n.buffers.color.setClear(jo.r,jo.g,jo.b,x,o)}function y(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,x=1){a.set(S),c=x,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,p(a,c)},render:_,addToRenderList:g,dispose:y}}function Jx(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(T,L,H,V,X){let Z=!1;const K=u(V,H,L);r!==K&&(r=K,l(r.object)),Z=f(T,V,H,X),Z&&m(T,V,H,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,x(T,L,H,V),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function c(){return i.createVertexArray()}function l(T){return i.bindVertexArray(T)}function h(T){return i.deleteVertexArray(T)}function u(T,L,H){const V=H.wireframe===!0;let X=n[T.id];X===void 0&&(X={},n[T.id]=X);let Z=X[L.id];Z===void 0&&(Z={},X[L.id]=Z);let K=Z[V];return K===void 0&&(K=d(c()),Z[V]=K),K}function d(T){const L=[],H=[],V=[];for(let X=0;X<t;X++)L[X]=0,H[X]=0,V[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:H,attributeDivisors:V,object:T,attributes:{},index:null}}function f(T,L,H,V){const X=r.attributes,Z=L.attributes;let K=0;const Q=H.getAttributes();for(const G in Q)if(Q[G].location>=0){const ge=X[G];let Pe=Z[G];if(Pe===void 0&&(G==="instanceMatrix"&&T.instanceMatrix&&(Pe=T.instanceMatrix),G==="instanceColor"&&T.instanceColor&&(Pe=T.instanceColor)),ge===void 0||ge.attribute!==Pe||Pe&&ge.data!==Pe.data)return!0;K++}return r.attributesNum!==K||r.index!==V}function m(T,L,H,V){const X={},Z=L.attributes;let K=0;const Q=H.getAttributes();for(const G in Q)if(Q[G].location>=0){let ge=Z[G];ge===void 0&&(G==="instanceMatrix"&&T.instanceMatrix&&(ge=T.instanceMatrix),G==="instanceColor"&&T.instanceColor&&(ge=T.instanceColor));const Pe={};Pe.attribute=ge,ge&&ge.data&&(Pe.data=ge.data),X[G]=Pe,K++}r.attributes=X,r.attributesNum=K,r.index=V}function _(){const T=r.newAttributes;for(let L=0,H=T.length;L<H;L++)T[L]=0}function g(T){p(T,0)}function p(T,L){const H=r.newAttributes,V=r.enabledAttributes,X=r.attributeDivisors;H[T]=1,V[T]===0&&(i.enableVertexAttribArray(T),V[T]=1),X[T]!==L&&(i.vertexAttribDivisor(T,L),X[T]=L)}function y(){const T=r.newAttributes,L=r.enabledAttributes;for(let H=0,V=L.length;H<V;H++)L[H]!==T[H]&&(i.disableVertexAttribArray(H),L[H]=0)}function S(T,L,H,V,X,Z,K){K===!0?i.vertexAttribIPointer(T,L,H,X,Z):i.vertexAttribPointer(T,L,H,V,X,Z)}function x(T,L,H,V){_();const X=V.attributes,Z=H.getAttributes(),K=L.defaultAttributeValues;for(const Q in Z){const G=Z[Q];if(G.location>=0){let ue=X[Q];if(ue===void 0&&(Q==="instanceMatrix"&&T.instanceMatrix&&(ue=T.instanceMatrix),Q==="instanceColor"&&T.instanceColor&&(ue=T.instanceColor)),ue!==void 0){const ge=ue.normalized,Pe=ue.itemSize,qe=e.get(ue);if(qe===void 0)continue;const St=qe.buffer,dt=qe.type,Y=qe.bytesPerElement,de=dt===i.INT||dt===i.UNSIGNED_INT||ue.gpuType===Ql;if(ue.isInterleavedBufferAttribute){const oe=ue.data,Ne=oe.stride,Ue=ue.offset;if(oe.isInstancedInterleavedBuffer){for(let ke=0;ke<G.locationSize;ke++)p(G.location+ke,oe.meshPerAttribute);T.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let ke=0;ke<G.locationSize;ke++)g(G.location+ke);i.bindBuffer(i.ARRAY_BUFFER,St);for(let ke=0;ke<G.locationSize;ke++)S(G.location+ke,Pe/G.locationSize,dt,ge,Ne*Y,(Ue+Pe/G.locationSize*ke)*Y,de)}else{if(ue.isInstancedBufferAttribute){for(let oe=0;oe<G.locationSize;oe++)p(G.location+oe,ue.meshPerAttribute);T.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let oe=0;oe<G.locationSize;oe++)g(G.location+oe);i.bindBuffer(i.ARRAY_BUFFER,St);for(let oe=0;oe<G.locationSize;oe++)S(G.location+oe,Pe/G.locationSize,dt,ge,Pe*Y,Pe/G.locationSize*oe*Y,de)}}else if(K!==void 0){const ge=K[Q];if(ge!==void 0)switch(ge.length){case 2:i.vertexAttrib2fv(G.location,ge);break;case 3:i.vertexAttrib3fv(G.location,ge);break;case 4:i.vertexAttrib4fv(G.location,ge);break;default:i.vertexAttrib1fv(G.location,ge)}}}}y()}function R(){D();for(const T in n){const L=n[T];for(const H in L){const V=L[H];for(const X in V)h(V[X].object),delete V[X];delete L[H]}delete n[T]}}function A(T){if(n[T.id]===void 0)return;const L=n[T.id];for(const H in L){const V=L[H];for(const X in V)h(V[X].object),delete V[X];delete L[H]}delete n[T.id]}function P(T){for(const L in n){const H=n[L];if(H[T.id]===void 0)continue;const V=H[T.id];for(const X in V)h(V[X].object),delete V[X];delete H[T.id]}}function D(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:D,resetDefaultState:E,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function Qx(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];t.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<l.length;m++)o(l[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let m=0;for(let _=0;_<u;_++)m+=h[_]*d[_];t.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function ev(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(P){return!(P!==Pn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const D=P===uo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Jn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Vn&&!D)}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=m>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:S,maxFragmentUniforms:x,vertexTextures:R,maxSamples:A}}function tv(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new Pi,a=new We,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{const y=r?0:n,S=y*4;let x=p.clippingState||null;c.value=x,x=h(m,d,S,f);for(let R=0;R!==S;++R)x[R]=t[R];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,m){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=c.value,m!==!0||g===null){const p=f+_*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let S=0,x=f;S!==_;++S,x+=4)o.copy(u[S]).applyMatrix4(y,a),o.normal.toArray(g,x),g[x+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function nv(i){let e=new WeakMap;function t(o,a){return a===ma?o.mapping=nr:a===nl&&(o.mapping=ir),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ma||a===nl)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new qm(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const qs=4,Xu=[.125,.215,.35,.446,.526,.582],hs=20,Sc=new Mh,qu=new xe;let wc=null,Ec=0,Tc=0,bc=!1;const os=(1+Math.sqrt(5))/2,Gs=1/os,Yu=[new b(-os,Gs,0),new b(os,Gs,0),new b(-Gs,0,os),new b(Gs,0,os),new b(0,os,-Gs),new b(0,os,Gs),new b(-1,1,-1),new b(1,1,-1),new b(-1,1,1),new b(1,1,1)],iv=new b;class Ku{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:o=256,position:a=iv}=r;wc=this._renderer.getRenderTarget(),Ec=this._renderer.getActiveCubeFace(),Tc=this._renderer.getActiveMipmapLevel(),bc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$u(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(wc,Ec,Tc),this._renderer.xr.enabled=bc,e.scissorTest=!1,$o(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===nr||e.mapping===ir?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),wc=this._renderer.getRenderTarget(),Ec=this._renderer.getActiveCubeFace(),Tc=this._renderer.getActiveMipmapLevel(),bc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:vn,minFilter:vn,generateMipmaps:!1,type:uo,format:Pn,colorSpace:an,depthBuffer:!1},s=ju(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ju(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=sv(r)),this._blurMaterial=rv(r,e,t)}return s}_compileMaterial(e){const t=new j(this._lodPlanes[0],e);this._renderer.compile(t,Sc)}_sceneToCubeUV(e,t,n,s,r){const c=new sn(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(qu),u.toneMapping=ki,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const _=new et({name:"PMREM.Background",side:dn,depthWrite:!1,depthTest:!1}),g=new j(new Ke,_);let p=!1;const y=e.background;y?y.isColor&&(_.color.copy(y),e.background=null,p=!0):(_.color.copy(qu),p=!0);for(let S=0;S<6;S++){const x=S%3;x===0?(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[S],r.y,r.z)):x===1?(c.up.set(0,0,l[S]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[S],r.z)):(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[S]));const R=this._cubeSize;$o(s,x*R,S>2?R:0,R,R),u.setRenderTarget(s),p&&u.render(g,c),u.render(e,c)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=y}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===nr||e.mapping===ir;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$u());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new j(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;$o(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Sc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Yu[(s-r-1)%Yu.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new j(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*hs-1),_=r/m,g=isFinite(r)?1+Math.floor(h*_):hs;g>hs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${hs}`);const p=[];let y=0;for(let P=0;P<hs;++P){const D=P/_,E=Math.exp(-D*D/2);p.push(E),P===0?y+=E:P<g&&(y+=2*E)}for(let P=0;P<p.length;P++)p[P]=p[P]/y;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:S}=this;d.dTheta.value=m,d.mipInt.value=S-n;const x=this._sizeLods[s],R=3*x*(s>S-qs?s-S+qs:0),A=4*(this._cubeSize-x);$o(t,R,A,3*x,2*x),c.setRenderTarget(t),c.render(u,Sc)}}function sv(i){const e=[],t=[],n=[];let s=i;const r=i-qs+1+Xu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-qs?c=Xu[o-i+qs-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,_=3,g=2,p=1,y=new Float32Array(_*m*f),S=new Float32Array(g*m*f),x=new Float32Array(p*m*f);for(let A=0;A<f;A++){const P=A%3*2/3-1,D=A>2?0:-1,E=[P,D,0,P+2/3,D,0,P+2/3,D+1,0,P,D,0,P+2/3,D+1,0,P,D+1,0];y.set(E,_*m*A),S.set(d,g*m*A);const T=[A,A,A,A,A,A];x.set(T,p*m*A)}const R=new xt;R.setAttribute("position",new Ot(y,_)),R.setAttribute("uv",new Ot(S,g)),R.setAttribute("faceIndex",new Ot(x,p)),e.push(R),s>qs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ju(i,e,t){const n=new vs(i,e,t);return n.texture.mapping=Ra,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $o(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function rv(i,e,t){const n=new Float32Array(hs),s=new b(0,1,0);return new Mi({name:"SphericalGaussianBlur",defines:{n:hs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Eh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:zi,depthTest:!1,depthWrite:!1})}function $u(){return new Mi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Eh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:zi,depthTest:!1,depthWrite:!1})}function Zu(){return new Mi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Eh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zi,depthTest:!1,depthWrite:!1})}function Eh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ov(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===ma||c===nl,h=c===nr||c===ir;if(l||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Ku(i)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new Ku(i)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function av(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Ks("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function cv(i,e,t,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function l(u){const d=[],f=u.index,m=u.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let S=0,x=y.length;S<x;S+=3){const R=y[S+0],A=y[S+1],P=y[S+2];d.push(R,A,A,P,P,R)}}else if(m!==void 0){const y=m.array;_=m.version;for(let S=0,x=y.length/3-1;S<x;S+=3){const R=S+0,A=S+1,P=S+2;d.push(R,A,A,P,P,R)}}else return;const g=new(tf(d)?of:rf)(d,1);g.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,g)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function lv(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*o),t.update(f,n,1)}function l(d,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,d*o,m),t.update(f,n,m))}function h(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function u(d,f,m,_){if(m===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)l(d[p]/o,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,m);let p=0;for(let y=0;y<m;y++)p+=f[y]*_[y];t.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function hv(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function uv(i,e,t){const n=new WeakMap,s=new ot;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let T=function(){D.dispose(),n.delete(a),a.removeEventListener("dispose",T)};var f=T;d!==void 0&&d.texture.dispose();const m=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let x=0;m===!0&&(x=1),_===!0&&(x=2),g===!0&&(x=3);let R=a.attributes.position.count*x,A=1;R>e.maxTextureSize&&(A=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const P=new Float32Array(R*A*4*u),D=new nf(P,R,A,u);D.type=Vn,D.needsUpdate=!0;const E=x*4;for(let L=0;L<u;L++){const H=p[L],V=y[L],X=S[L],Z=R*A*4*L;for(let K=0;K<H.count;K++){const Q=K*E;m===!0&&(s.fromBufferAttribute(H,K),P[Z+Q+0]=s.x,P[Z+Q+1]=s.y,P[Z+Q+2]=s.z,P[Z+Q+3]=0),_===!0&&(s.fromBufferAttribute(V,K),P[Z+Q+4]=s.x,P[Z+Q+5]=s.y,P[Z+Q+6]=s.z,P[Z+Q+7]=0),g===!0&&(s.fromBufferAttribute(X,K),P[Z+Q+8]=s.x,P[Z+Q+9]=s.y,P[Z+Q+10]=s.z,P[Z+Q+11]=X.itemSize===4?s.w:1)}}d={count:u,texture:D,size:new ce(R,A)},n.set(a,d),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let m=0;for(let g=0;g<l.length;g++)m+=l[g];const _=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function dv(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}const Rf=new qt,Ju=new df(1,1),Cf=new nf,Pf=new Cm,Lf=new lf,Qu=[],ed=[],td=new Float32Array(16),nd=new Float32Array(9),id=new Float32Array(4);function yr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Qu[s];if(r===void 0&&(r=new Float32Array(s),Qu[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Ht(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Da(i,e){let t=ed[e];t===void 0&&(t=new Int32Array(e),ed[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function fv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function pv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2fv(this.addr,e),Vt(t,e)}}function mv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;i.uniform3fv(this.addr,e),Vt(t,e)}}function gv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4fv(this.addr,e),Vt(t,e)}}function _v(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;id.set(n),i.uniformMatrix2fv(this.addr,!1,id),Vt(t,n)}}function xv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;nd.set(n),i.uniformMatrix3fv(this.addr,!1,nd),Vt(t,n)}}function vv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;td.set(n),i.uniformMatrix4fv(this.addr,!1,td),Vt(t,n)}}function yv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Mv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2iv(this.addr,e),Vt(t,e)}}function Sv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3iv(this.addr,e),Vt(t,e)}}function wv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4iv(this.addr,e),Vt(t,e)}}function Ev(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Tv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2uiv(this.addr,e),Vt(t,e)}}function bv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3uiv(this.addr,e),Vt(t,e)}}function Av(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4uiv(this.addr,e),Vt(t,e)}}function Rv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ju.compareFunction=ef,r=Ju):r=Rf,t.setTexture2D(e||r,s)}function Cv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Pf,s)}function Pv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Lf,s)}function Lv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Cf,s)}function Iv(i){switch(i){case 5126:return fv;case 35664:return pv;case 35665:return mv;case 35666:return gv;case 35674:return _v;case 35675:return xv;case 35676:return vv;case 5124:case 35670:return yv;case 35667:case 35671:return Mv;case 35668:case 35672:return Sv;case 35669:case 35673:return wv;case 5125:return Ev;case 36294:return Tv;case 36295:return bv;case 36296:return Av;case 35678:case 36198:case 36298:case 36306:case 35682:return Rv;case 35679:case 36299:case 36307:return Cv;case 35680:case 36300:case 36308:case 36293:return Pv;case 36289:case 36303:case 36311:case 36292:return Lv}}function Dv(i,e){i.uniform1fv(this.addr,e)}function Nv(i,e){const t=yr(e,this.size,2);i.uniform2fv(this.addr,t)}function Uv(i,e){const t=yr(e,this.size,3);i.uniform3fv(this.addr,t)}function Fv(i,e){const t=yr(e,this.size,4);i.uniform4fv(this.addr,t)}function Ov(i,e){const t=yr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Bv(i,e){const t=yr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function zv(i,e){const t=yr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function kv(i,e){i.uniform1iv(this.addr,e)}function Hv(i,e){i.uniform2iv(this.addr,e)}function Vv(i,e){i.uniform3iv(this.addr,e)}function Gv(i,e){i.uniform4iv(this.addr,e)}function Wv(i,e){i.uniform1uiv(this.addr,e)}function Xv(i,e){i.uniform2uiv(this.addr,e)}function qv(i,e){i.uniform3uiv(this.addr,e)}function Yv(i,e){i.uniform4uiv(this.addr,e)}function Kv(i,e,t){const n=this.cache,s=e.length,r=Da(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Rf,r[o])}function jv(i,e,t){const n=this.cache,s=e.length,r=Da(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Pf,r[o])}function $v(i,e,t){const n=this.cache,s=e.length,r=Da(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Lf,r[o])}function Zv(i,e,t){const n=this.cache,s=e.length,r=Da(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Cf,r[o])}function Jv(i){switch(i){case 5126:return Dv;case 35664:return Nv;case 35665:return Uv;case 35666:return Fv;case 35674:return Ov;case 35675:return Bv;case 35676:return zv;case 5124:case 35670:return kv;case 35667:case 35671:return Hv;case 35668:case 35672:return Vv;case 35669:case 35673:return Gv;case 5125:return Wv;case 36294:return Xv;case 36295:return qv;case 36296:return Yv;case 35678:case 36198:case 36298:case 36306:case 35682:return Kv;case 35679:case 36299:case 36307:return jv;case 35680:case 36300:case 36308:case 36293:return $v;case 36289:case 36303:case 36311:case 36292:return Zv}}class Qv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Iv(t.type)}}class ey{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Jv(t.type)}}class ty{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Ac=/(\w+)(\])?(\[|\.)?/g;function sd(i,e){i.seq.push(e),i.map[e.id]=e}function ny(i,e,t){const n=i.name,s=n.length;for(Ac.lastIndex=0;;){const r=Ac.exec(n),o=Ac.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){sd(t,l===void 0?new Qv(a,i,e):new ey(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new ty(a),sd(t,u)),t=u}}}class ca{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);ny(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function rd(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const iy=37297;let sy=0;function ry(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const od=new We;function oy(i){Ze._getMatrix(od,Ze.workingColorSpace,i);const e=`mat3( ${od.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(i)){case _a:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function ad(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+ry(i.getShaderSource(e),a)}else return r}function ay(i,e){const t=oy(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function cy(i,e){let t;switch(e){case Hp:t="Linear";break;case Vp:t="Reinhard";break;case Gp:t="Cineon";break;case Gd:t="ACESFilmic";break;case Xp:t="AgX";break;case qp:t="Neutral";break;case Wp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Zo=new b;function ly(){Ze.getLuminanceCoefficients(Zo);const i=Zo.x.toFixed(4),e=Zo.y.toFixed(4),t=Zo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fr).join(`
`)}function uy(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function dy(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Fr(i){return i!==""}function cd(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ld(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const fy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fl(i){return i.replace(fy,my)}const py=new Map;function my(i,e){let t=Xe[e];if(t===void 0){const n=py.get(e);if(n!==void 0)t=Xe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Fl(t)}const gy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hd(i){return i.replace(gy,_y)}function _y(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ud(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function xy(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Hd?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Vd?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===di&&(e="SHADOWMAP_TYPE_VSM"),e}function vy(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case nr:case ir:e="ENVMAP_TYPE_CUBE";break;case Ra:e="ENVMAP_TYPE_CUBE_UV";break}return e}function yy(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===ir&&(e="ENVMAP_MODE_REFRACTION"),e}function My(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Jl:e="ENVMAP_BLENDING_MULTIPLY";break;case zp:e="ENVMAP_BLENDING_MIX";break;case kp:e="ENVMAP_BLENDING_ADD";break}return e}function Sy(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function wy(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=xy(t),l=vy(t),h=yy(t),u=My(t),d=Sy(t),f=hy(t),m=uy(r),_=s.createProgram();let g,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Fr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Fr).join(`
`),p.length>0&&(p+=`
`)):(g=[ud(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fr).join(`
`),p=[ud(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ki?"#define TONE_MAPPING":"",t.toneMapping!==ki?Xe.tonemapping_pars_fragment:"",t.toneMapping!==ki?cy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,ay("linearToOutputTexel",t.outputColorSpace),ly(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fr).join(`
`)),o=Fl(o),o=cd(o,t),o=ld(o,t),a=Fl(a),a=cd(a,t),a=ld(a,t),o=hd(o),a=hd(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Jh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Jh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=y+g+o,x=y+p+a,R=rd(s,s.VERTEX_SHADER,S),A=rd(s,s.FRAGMENT_SHADER,x);s.attachShader(_,R),s.attachShader(_,A),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function P(L){if(i.debug.checkShaderErrors){const H=s.getProgramInfoLog(_)||"",V=s.getShaderInfoLog(R)||"",X=s.getShaderInfoLog(A)||"",Z=H.trim(),K=V.trim(),Q=X.trim();let G=!0,ue=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,R,A);else{const ge=ad(s,R,"vertex"),Pe=ad(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+Z+`
`+ge+`
`+Pe)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(K===""||Q==="")&&(ue=!1);ue&&(L.diagnostics={runnable:G,programLog:Z,vertexShader:{log:K,prefix:g},fragmentShader:{log:Q,prefix:p}})}s.deleteShader(R),s.deleteShader(A),D=new ca(s,_),E=dy(s,_)}let D;this.getUniforms=function(){return D===void 0&&P(this),D};let E;this.getAttributes=function(){return E===void 0&&P(this),E};let T=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=s.getProgramParameter(_,iy)),T},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=sy++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=A,this}let Ey=0;class Ty{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new by(e),t.set(e,n)),n}}class by{constructor(e){this.id=Ey++,this.code=e,this.usedTimes=0}}function Ay(i,e,t,n,s,r,o){const a=new lh,c=new Ty,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function g(E,T,L,H,V){const X=H.fog,Z=V.geometry,K=E.isMeshStandardMaterial?H.environment:null,Q=(E.isMeshStandardMaterial?t:e).get(E.envMap||K),G=Q&&Q.mapping===Ra?Q.image.height:null,ue=m[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const ge=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Pe=ge!==void 0?ge.length:0;let qe=0;Z.morphAttributes.position!==void 0&&(qe=1),Z.morphAttributes.normal!==void 0&&(qe=2),Z.morphAttributes.color!==void 0&&(qe=3);let St,dt,Y,de;if(ue){const at=Yn[ue];St=at.vertexShader,dt=at.fragmentShader}else St=E.vertexShader,dt=E.fragmentShader,c.update(E),Y=c.getVertexShaderID(E),de=c.getFragmentShaderID(E);const oe=i.getRenderTarget(),Ne=i.state.buffers.depth.getReversed(),Ue=V.isInstancedMesh===!0,ke=V.isBatchedMesh===!0,Pt=!!E.map,nt=!!E.matcap,I=!!Q,gt=!!E.aoMap,Ie=!!E.lightMap,rt=!!E.bumpMap,Ce=!!E.normalMap,wt=!!E.displacementMap,ye=!!E.emissiveMap,Ye=!!E.metalnessMap,Gt=!!E.roughnessMap,Lt=E.anisotropy>0,C=E.clearcoat>0,M=E.dispersion>0,B=E.iridescence>0,q=E.sheen>0,ee=E.transmission>0,W=Lt&&!!E.anisotropyMap,be=C&&!!E.clearcoatMap,re=C&&!!E.clearcoatNormalMap,we=C&&!!E.clearcoatRoughnessMap,Ee=B&&!!E.iridescenceMap,ie=B&&!!E.iridescenceThicknessMap,me=q&&!!E.sheenColorMap,Oe=q&&!!E.sheenRoughnessMap,Te=!!E.specularMap,fe=!!E.specularColorMap,Ge=!!E.specularIntensityMap,N=ee&&!!E.transmissionMap,se=ee&&!!E.thicknessMap,ae=!!E.gradientMap,ve=!!E.alphaMap,te=E.alphaTest>0,$=!!E.alphaHash,Se=!!E.extensions;let He=ki;E.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(He=i.toneMapping);const _t={shaderID:ue,shaderType:E.type,shaderName:E.name,vertexShader:St,fragmentShader:dt,defines:E.defines,customVertexShaderID:Y,customFragmentShaderID:de,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:ke,batchingColor:ke&&V._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&V.instanceColor!==null,instancingMorph:Ue&&V.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:oe===null?i.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:an,alphaToCoverage:!!E.alphaToCoverage,map:Pt,matcap:nt,envMap:I,envMapMode:I&&Q.mapping,envMapCubeUVHeight:G,aoMap:gt,lightMap:Ie,bumpMap:rt,normalMap:Ce,displacementMap:d&&wt,emissiveMap:ye,normalMapObjectSpace:Ce&&E.normalMapType===Jp,normalMapTangentSpace:Ce&&E.normalMapType===oh,metalnessMap:Ye,roughnessMap:Gt,anisotropy:Lt,anisotropyMap:W,clearcoat:C,clearcoatMap:be,clearcoatNormalMap:re,clearcoatRoughnessMap:we,dispersion:M,iridescence:B,iridescenceMap:Ee,iridescenceThicknessMap:ie,sheen:q,sheenColorMap:me,sheenRoughnessMap:Oe,specularMap:Te,specularColorMap:fe,specularIntensityMap:Ge,transmission:ee,transmissionMap:N,thicknessMap:se,gradientMap:ae,opaque:E.transparent===!1&&E.blending===Ys&&E.alphaToCoverage===!1,alphaMap:ve,alphaTest:te,alphaHash:$,combine:E.combine,mapUv:Pt&&_(E.map.channel),aoMapUv:gt&&_(E.aoMap.channel),lightMapUv:Ie&&_(E.lightMap.channel),bumpMapUv:rt&&_(E.bumpMap.channel),normalMapUv:Ce&&_(E.normalMap.channel),displacementMapUv:wt&&_(E.displacementMap.channel),emissiveMapUv:ye&&_(E.emissiveMap.channel),metalnessMapUv:Ye&&_(E.metalnessMap.channel),roughnessMapUv:Gt&&_(E.roughnessMap.channel),anisotropyMapUv:W&&_(E.anisotropyMap.channel),clearcoatMapUv:be&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:re&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:me&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&_(E.sheenRoughnessMap.channel),specularMapUv:Te&&_(E.specularMap.channel),specularColorMapUv:fe&&_(E.specularColorMap.channel),specularIntensityMapUv:Ge&&_(E.specularIntensityMap.channel),transmissionMapUv:N&&_(E.transmissionMap.channel),thicknessMapUv:se&&_(E.thicknessMap.channel),alphaMapUv:ve&&_(E.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Ce||Lt),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!Z.attributes.uv&&(Pt||ve),fog:!!X,useFog:E.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ne,skinning:V.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:Pe,morphTextureStride:qe,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:He,decodeVideoTexture:Pt&&E.map.isVideoTexture===!0&&Ze.getTransfer(E.map.colorSpace)===ut,decodeVideoTextureEmissive:ye&&E.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(E.emissiveMap.colorSpace)===ut,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===It,flipSided:E.side===dn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Se&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&E.extensions.multiDraw===!0||ke)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return _t.vertexUv1s=l.has(1),_t.vertexUv2s=l.has(2),_t.vertexUv3s=l.has(3),l.clear(),_t}function p(E){const T=[];if(E.shaderID?T.push(E.shaderID):(T.push(E.customVertexShaderID),T.push(E.customFragmentShaderID)),E.defines!==void 0)for(const L in E.defines)T.push(L),T.push(E.defines[L]);return E.isRawShaderMaterial===!1&&(y(T,E),S(T,E),T.push(i.outputColorSpace)),T.push(E.customProgramCacheKey),T.join()}function y(E,T){E.push(T.precision),E.push(T.outputColorSpace),E.push(T.envMapMode),E.push(T.envMapCubeUVHeight),E.push(T.mapUv),E.push(T.alphaMapUv),E.push(T.lightMapUv),E.push(T.aoMapUv),E.push(T.bumpMapUv),E.push(T.normalMapUv),E.push(T.displacementMapUv),E.push(T.emissiveMapUv),E.push(T.metalnessMapUv),E.push(T.roughnessMapUv),E.push(T.anisotropyMapUv),E.push(T.clearcoatMapUv),E.push(T.clearcoatNormalMapUv),E.push(T.clearcoatRoughnessMapUv),E.push(T.iridescenceMapUv),E.push(T.iridescenceThicknessMapUv),E.push(T.sheenColorMapUv),E.push(T.sheenRoughnessMapUv),E.push(T.specularMapUv),E.push(T.specularColorMapUv),E.push(T.specularIntensityMapUv),E.push(T.transmissionMapUv),E.push(T.thicknessMapUv),E.push(T.combine),E.push(T.fogExp2),E.push(T.sizeAttenuation),E.push(T.morphTargetsCount),E.push(T.morphAttributeCount),E.push(T.numDirLights),E.push(T.numPointLights),E.push(T.numSpotLights),E.push(T.numSpotLightMaps),E.push(T.numHemiLights),E.push(T.numRectAreaLights),E.push(T.numDirLightShadows),E.push(T.numPointLightShadows),E.push(T.numSpotLightShadows),E.push(T.numSpotLightShadowsWithMaps),E.push(T.numLightProbes),E.push(T.shadowMapType),E.push(T.toneMapping),E.push(T.numClippingPlanes),E.push(T.numClipIntersection),E.push(T.depthPacking)}function S(E,T){a.disableAll(),T.supportsVertexTextures&&a.enable(0),T.instancing&&a.enable(1),T.instancingColor&&a.enable(2),T.instancingMorph&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),T.dispersion&&a.enable(20),T.batchingColor&&a.enable(21),T.gradientMap&&a.enable(22),E.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),E.push(a.mask)}function x(E){const T=m[E.type];let L;if(T){const H=Yn[T];L=Vm.clone(H.uniforms)}else L=E.uniforms;return L}function R(E,T){let L;for(let H=0,V=h.length;H<V;H++){const X=h[H];if(X.cacheKey===T){L=X,++L.usedTimes;break}}return L===void 0&&(L=new wy(i,T,E,r),h.push(L)),L}function A(E){if(--E.usedTimes===0){const T=h.indexOf(E);h[T]=h[h.length-1],h.pop(),E.destroy()}}function P(E){c.remove(E)}function D(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:x,acquireProgram:R,releaseProgram:A,releaseShaderCache:P,programs:h,dispose:D}}function Ry(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Cy(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function dd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function fd(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,d,f,m,_,g){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:_,group:g},i[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=_,p.group=g),e++,p}function a(u,d,f,m,_,g){const p=o(u,d,f,m,_,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(u,d,f,m,_,g){const p=o(u,d,f,m,_,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function l(u,d){t.length>1&&t.sort(u||Cy),n.length>1&&n.sort(d||dd),s.length>1&&s.sort(d||dd)}function h(){for(let u=e,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Py(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new fd,i.set(n,[o])):s>=r.length?(o=new fd,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Ly(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new b,color:new xe};break;case"SpotLight":t={position:new b,direction:new b,color:new xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new b,color:new xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new b,skyColor:new xe,groundColor:new xe};break;case"RectAreaLight":t={color:new xe,position:new b,halfWidth:new b,halfHeight:new b};break}return i[e.id]=t,t}}}function Iy(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Dy=0;function Ny(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Uy(i){const e=new Ly,t=Iy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new b);const s=new b,r=new Ve,o=new Ve;function a(l){let h=0,u=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,y=0,S=0,x=0,R=0,A=0,P=0;l.sort(Ny);for(let E=0,T=l.length;E<T;E++){const L=l[E],H=L.color,V=L.intensity,X=L.distance,Z=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=H.r*V,u+=H.g*V,d+=H.b*V;else if(L.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(L.sh.coefficients[K],V);P++}else if(L.isDirectionalLight){const K=e.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Q=L.shadow,G=t.get(L);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=Z,n.directionalShadowMatrix[f]=L.shadow.matrix,y++}n.directional[f]=K,f++}else if(L.isSpotLight){const K=e.get(L);K.position.setFromMatrixPosition(L.matrixWorld),K.color.copy(H).multiplyScalar(V),K.distance=X,K.coneCos=Math.cos(L.angle),K.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),K.decay=L.decay,n.spot[_]=K;const Q=L.shadow;if(L.map&&(n.spotLightMap[R]=L.map,R++,Q.updateMatrices(L),L.castShadow&&A++),n.spotLightMatrix[_]=Q.matrix,L.castShadow){const G=t.get(L);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=Z,x++}_++}else if(L.isRectAreaLight){const K=e.get(L);K.color.copy(H).multiplyScalar(V),K.halfWidth.set(L.width*.5,0,0),K.halfHeight.set(0,L.height*.5,0),n.rectArea[g]=K,g++}else if(L.isPointLight){const K=e.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity),K.distance=L.distance,K.decay=L.decay,L.castShadow){const Q=L.shadow,G=t.get(L);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,G.shadowCameraNear=Q.camera.near,G.shadowCameraFar=Q.camera.far,n.pointShadow[m]=G,n.pointShadowMap[m]=Z,n.pointShadowMatrix[m]=L.shadow.matrix,S++}n.point[m]=K,m++}else if(L.isHemisphereLight){const K=e.get(L);K.skyColor.copy(L.color).multiplyScalar(V),K.groundColor.copy(L.groundColor).multiplyScalar(V),n.hemi[p]=K,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=le.LTC_FLOAT_1,n.rectAreaLTC2=le.LTC_FLOAT_2):(n.rectAreaLTC1=le.LTC_HALF_1,n.rectAreaLTC2=le.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const D=n.hash;(D.directionalLength!==f||D.pointLength!==m||D.spotLength!==_||D.rectAreaLength!==g||D.hemiLength!==p||D.numDirectionalShadows!==y||D.numPointShadows!==S||D.numSpotShadows!==x||D.numSpotMaps!==R||D.numLightProbes!==P)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=x+R-A,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=P,D.directionalLength=f,D.pointLength=m,D.spotLength=_,D.rectAreaLength=g,D.hemiLength=p,D.numDirectionalShadows=y,D.numPointShadows=S,D.numSpotShadows=x,D.numSpotMaps=R,D.numLightProbes=P,n.version=Dy++)}function c(l,h){let u=0,d=0,f=0,m=0,_=0;const g=h.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const S=l[p];if(S.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),u++}else if(S.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),f++}else if(S.isRectAreaLight){const x=n.rectArea[m];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(g),o.identity(),r.copy(S.matrixWorld),r.premultiply(g),o.extractRotation(r),x.halfWidth.set(S.width*.5,0,0),x.halfHeight.set(0,S.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),m++}else if(S.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(g),d++}else if(S.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(S.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:a,setupView:c,state:n}}function pd(i){const e=new Uy(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Fy(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new pd(i),e.set(s,[a])):r>=o.length?(a=new pd(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const Oy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,By=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function zy(i,e,t){let n=new fh;const s=new ce,r=new ce,o=new ot,a=new Og({depthPacking:Zp}),c=new Bg,l={},h=t.maxTextureSize,u={[Zn]:dn,[dn]:Zn,[It]:It},d=new Mi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4}},vertexShader:Oy,fragmentShader:By}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new xt;m.setAttribute("position",new Ot(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new j(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hd;let p=this.type;this.render=function(A,P,D){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;const E=i.getRenderTarget(),T=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),H=i.state;H.setBlending(zi),H.buffers.depth.getReversed()?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const V=p!==di&&this.type===di,X=p===di&&this.type!==di;for(let Z=0,K=A.length;Z<K;Z++){const Q=A[Z],G=Q.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const ue=G.getFrameExtents();if(s.multiply(ue),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ue.x),s.x=r.x*ue.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ue.y),s.y=r.y*ue.y,G.mapSize.y=r.y)),G.map===null||V===!0||X===!0){const Pe=this.type!==di?{minFilter:on,magFilter:on}:{};G.map!==null&&G.map.dispose(),G.map=new vs(s.x,s.y,Pe),G.map.texture.name=Q.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const ge=G.getViewportCount();for(let Pe=0;Pe<ge;Pe++){const qe=G.getViewport(Pe);o.set(r.x*qe.x,r.y*qe.y,r.x*qe.z,r.y*qe.w),H.viewport(o),G.updateMatrices(Q,Pe),n=G.getFrustum(),x(P,D,G.camera,Q,this.type)}G.isPointLightShadow!==!0&&this.type===di&&y(G,D),G.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(E,T,L)};function y(A,P){const D=e.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new vs(s.x,s.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(P,null,D,d,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(P,null,D,f,_,null)}function S(A,P,D,E){let T=null;const L=D.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)T=L;else if(T=D.isPointLight===!0?c:a,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const H=T.uuid,V=P.uuid;let X=l[H];X===void 0&&(X={},l[H]=X);let Z=X[V];Z===void 0&&(Z=T.clone(),X[V]=Z,P.addEventListener("dispose",R)),T=Z}if(T.visible=P.visible,T.wireframe=P.wireframe,E===di?T.side=P.shadowSide!==null?P.shadowSide:P.side:T.side=P.shadowSide!==null?P.shadowSide:u[P.side],T.alphaMap=P.alphaMap,T.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,T.map=P.map,T.clipShadows=P.clipShadows,T.clippingPlanes=P.clippingPlanes,T.clipIntersection=P.clipIntersection,T.displacementMap=P.displacementMap,T.displacementScale=P.displacementScale,T.displacementBias=P.displacementBias,T.wireframeLinewidth=P.wireframeLinewidth,T.linewidth=P.linewidth,D.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const H=i.properties.get(T);H.light=D}return T}function x(A,P,D,E,T){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&T===di)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,A.matrixWorld);const V=e.update(A),X=A.material;if(Array.isArray(X)){const Z=V.groups;for(let K=0,Q=Z.length;K<Q;K++){const G=Z[K],ue=X[G.materialIndex];if(ue&&ue.visible){const ge=S(A,ue,E,T);A.onBeforeShadow(i,A,P,D,V,ge,G),i.renderBufferDirect(D,null,V,ge,A,G),A.onAfterShadow(i,A,P,D,V,ge,G)}}}else if(X.visible){const Z=S(A,X,E,T);A.onBeforeShadow(i,A,P,D,V,Z,null),i.renderBufferDirect(D,null,V,Z,A,null),A.onAfterShadow(i,A,P,D,V,Z,null)}}const H=A.children;for(let V=0,X=H.length;V<X;V++)x(H[V],P,D,E,T)}function R(A){A.target.removeEventListener("dispose",R);for(const D in l){const E=l[D],T=A.target.uuid;T in E&&(E[T].dispose(),delete E[T])}}}const ky={[jc]:$c,[Zc]:el,[Jc]:tl,[tr]:Qc,[$c]:jc,[el]:Zc,[tl]:Jc,[Qc]:tr};function Hy(i,e){function t(){let N=!1;const se=new ot;let ae=null;const ve=new ot(0,0,0,0);return{setMask:function(te){ae!==te&&!N&&(i.colorMask(te,te,te,te),ae=te)},setLocked:function(te){N=te},setClear:function(te,$,Se,He,_t){_t===!0&&(te*=He,$*=He,Se*=He),se.set(te,$,Se,He),ve.equals(se)===!1&&(i.clearColor(te,$,Se,He),ve.copy(se))},reset:function(){N=!1,ae=null,ve.set(-1,0,0,0)}}}function n(){let N=!1,se=!1,ae=null,ve=null,te=null;return{setReversed:function($){if(se!==$){const Se=e.get("EXT_clip_control");$?Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.ZERO_TO_ONE_EXT):Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.NEGATIVE_ONE_TO_ONE_EXT),se=$;const He=te;te=null,this.setClear(He)}},getReversed:function(){return se},setTest:function($){$?oe(i.DEPTH_TEST):Ne(i.DEPTH_TEST)},setMask:function($){ae!==$&&!N&&(i.depthMask($),ae=$)},setFunc:function($){if(se&&($=ky[$]),ve!==$){switch($){case jc:i.depthFunc(i.NEVER);break;case $c:i.depthFunc(i.ALWAYS);break;case Zc:i.depthFunc(i.LESS);break;case tr:i.depthFunc(i.LEQUAL);break;case Jc:i.depthFunc(i.EQUAL);break;case Qc:i.depthFunc(i.GEQUAL);break;case el:i.depthFunc(i.GREATER);break;case tl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ve=$}},setLocked:function($){N=$},setClear:function($){te!==$&&(se&&($=1-$),i.clearDepth($),te=$)},reset:function(){N=!1,ae=null,ve=null,te=null,se=!1}}}function s(){let N=!1,se=null,ae=null,ve=null,te=null,$=null,Se=null,He=null,_t=null;return{setTest:function(at){N||(at?oe(i.STENCIL_TEST):Ne(i.STENCIL_TEST))},setMask:function(at){se!==at&&!N&&(i.stencilMask(at),se=at)},setFunc:function(at,ii,Xn){(ae!==at||ve!==ii||te!==Xn)&&(i.stencilFunc(at,ii,Xn),ae=at,ve=ii,te=Xn)},setOp:function(at,ii,Xn){($!==at||Se!==ii||He!==Xn)&&(i.stencilOp(at,ii,Xn),$=at,Se=ii,He=Xn)},setLocked:function(at){N=at},setClear:function(at){_t!==at&&(i.clearStencil(at),_t=at)},reset:function(){N=!1,se=null,ae=null,ve=null,te=null,$=null,Se=null,He=null,_t=null}}}const r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,y=null,S=null,x=null,R=null,A=null,P=new xe(0,0,0),D=0,E=!1,T=null,L=null,H=null,V=null,X=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,Q=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(G)[1]),K=Q>=1):G.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),K=Q>=2);let ue=null,ge={};const Pe=i.getParameter(i.SCISSOR_BOX),qe=i.getParameter(i.VIEWPORT),St=new ot().fromArray(Pe),dt=new ot().fromArray(qe);function Y(N,se,ae,ve){const te=new Uint8Array(4),$=i.createTexture();i.bindTexture(N,$),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Se=0;Se<ae;Se++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,ve,0,i.RGBA,i.UNSIGNED_BYTE,te):i.texImage2D(se+Se,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,te);return $}const de={};de[i.TEXTURE_2D]=Y(i.TEXTURE_2D,i.TEXTURE_2D,1),de[i.TEXTURE_CUBE_MAP]=Y(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[i.TEXTURE_2D_ARRAY]=Y(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),de[i.TEXTURE_3D]=Y(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),oe(i.DEPTH_TEST),o.setFunc(tr),rt(!1),Ce(Wh),oe(i.CULL_FACE),gt(zi);function oe(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function Ne(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function Ue(N,se){return u[N]!==se?(i.bindFramebuffer(N,se),u[N]=se,N===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=se),N===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=se),!0):!1}function ke(N,se){let ae=f,ve=!1;if(N){ae=d.get(se),ae===void 0&&(ae=[],d.set(se,ae));const te=N.textures;if(ae.length!==te.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let $=0,Se=te.length;$<Se;$++)ae[$]=i.COLOR_ATTACHMENT0+$;ae.length=te.length,ve=!0}}else ae[0]!==i.BACK&&(ae[0]=i.BACK,ve=!0);ve&&i.drawBuffers(ae)}function Pt(N){return m!==N?(i.useProgram(N),m=N,!0):!1}const nt={[ls]:i.FUNC_ADD,[Sp]:i.FUNC_SUBTRACT,[wp]:i.FUNC_REVERSE_SUBTRACT};nt[Ep]=i.MIN,nt[Tp]=i.MAX;const I={[bp]:i.ZERO,[Ap]:i.ONE,[Rp]:i.SRC_COLOR,[Yc]:i.SRC_ALPHA,[Np]:i.SRC_ALPHA_SATURATE,[Ip]:i.DST_COLOR,[Pp]:i.DST_ALPHA,[Cp]:i.ONE_MINUS_SRC_COLOR,[Kc]:i.ONE_MINUS_SRC_ALPHA,[Dp]:i.ONE_MINUS_DST_COLOR,[Lp]:i.ONE_MINUS_DST_ALPHA,[Up]:i.CONSTANT_COLOR,[Fp]:i.ONE_MINUS_CONSTANT_COLOR,[Op]:i.CONSTANT_ALPHA,[Bp]:i.ONE_MINUS_CONSTANT_ALPHA};function gt(N,se,ae,ve,te,$,Se,He,_t,at){if(N===zi){_===!0&&(Ne(i.BLEND),_=!1);return}if(_===!1&&(oe(i.BLEND),_=!0),N!==Mp){if(N!==g||at!==E){if((p!==ls||x!==ls)&&(i.blendEquation(i.FUNC_ADD),p=ls,x=ls),at)switch(N){case Ys:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wr:i.blendFunc(i.ONE,i.ONE);break;case Xh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case qh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Ys:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Xh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case qh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}y=null,S=null,R=null,A=null,P.set(0,0,0),D=0,g=N,E=at}return}te=te||se,$=$||ae,Se=Se||ve,(se!==p||te!==x)&&(i.blendEquationSeparate(nt[se],nt[te]),p=se,x=te),(ae!==y||ve!==S||$!==R||Se!==A)&&(i.blendFuncSeparate(I[ae],I[ve],I[$],I[Se]),y=ae,S=ve,R=$,A=Se),(He.equals(P)===!1||_t!==D)&&(i.blendColor(He.r,He.g,He.b,_t),P.copy(He),D=_t),g=N,E=!1}function Ie(N,se){N.side===It?Ne(i.CULL_FACE):oe(i.CULL_FACE);let ae=N.side===dn;se&&(ae=!ae),rt(ae),N.blending===Ys&&N.transparent===!1?gt(zi):gt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);const ve=N.stencilWrite;a.setTest(ve),ve&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ye(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?oe(i.SAMPLE_ALPHA_TO_COVERAGE):Ne(i.SAMPLE_ALPHA_TO_COVERAGE)}function rt(N){T!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),T=N)}function Ce(N){N!==vp?(oe(i.CULL_FACE),N!==L&&(N===Wh?i.cullFace(i.BACK):N===yp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ne(i.CULL_FACE),L=N}function wt(N){N!==H&&(K&&i.lineWidth(N),H=N)}function ye(N,se,ae){N?(oe(i.POLYGON_OFFSET_FILL),(V!==se||X!==ae)&&(i.polygonOffset(se,ae),V=se,X=ae)):Ne(i.POLYGON_OFFSET_FILL)}function Ye(N){N?oe(i.SCISSOR_TEST):Ne(i.SCISSOR_TEST)}function Gt(N){N===void 0&&(N=i.TEXTURE0+Z-1),ue!==N&&(i.activeTexture(N),ue=N)}function Lt(N,se,ae){ae===void 0&&(ue===null?ae=i.TEXTURE0+Z-1:ae=ue);let ve=ge[ae];ve===void 0&&(ve={type:void 0,texture:void 0},ge[ae]=ve),(ve.type!==N||ve.texture!==se)&&(ue!==ae&&(i.activeTexture(ae),ue=ae),i.bindTexture(N,se||de[N]),ve.type=N,ve.texture=se)}function C(){const N=ge[ue];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function M(){try{i.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function B(){try{i.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function q(){try{i.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ee(){try{i.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function be(){try{i.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function re(){try{i.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function we(){try{i.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ee(){try{i.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ie(){try{i.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function me(N){St.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),St.copy(N))}function Oe(N){dt.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),dt.copy(N))}function Te(N,se){let ae=l.get(se);ae===void 0&&(ae=new WeakMap,l.set(se,ae));let ve=ae.get(N);ve===void 0&&(ve=i.getUniformBlockIndex(se,N.name),ae.set(N,ve))}function fe(N,se){const ve=l.get(se).get(N);c.get(se)!==ve&&(i.uniformBlockBinding(se,ve,N.__bindingPointIndex),c.set(se,ve))}function Ge(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ue=null,ge={},u={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,y=null,S=null,x=null,R=null,A=null,P=new xe(0,0,0),D=0,E=!1,T=null,L=null,H=null,V=null,X=null,St.set(0,0,i.canvas.width,i.canvas.height),dt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:oe,disable:Ne,bindFramebuffer:Ue,drawBuffers:ke,useProgram:Pt,setBlending:gt,setMaterial:Ie,setFlipSided:rt,setCullFace:Ce,setLineWidth:wt,setPolygonOffset:ye,setScissorTest:Ye,activeTexture:Gt,bindTexture:Lt,unbindTexture:C,compressedTexImage2D:M,compressedTexImage3D:B,texImage2D:Ee,texImage3D:ie,updateUBOMapping:Te,uniformBlockBinding:fe,texStorage2D:re,texStorage3D:we,texSubImage2D:q,texSubImage3D:ee,compressedTexSubImage2D:W,compressedTexSubImage3D:be,scissor:me,viewport:Oe,reset:Ge}}function Vy(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ce,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,M){return f?new OffscreenCanvas(C,M):Zr("canvas")}function _(C,M,B){let q=1;const ee=Lt(C);if((ee.width>B||ee.height>B)&&(q=B/Math.max(ee.width,ee.height)),q<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const W=Math.floor(q*ee.width),be=Math.floor(q*ee.height);u===void 0&&(u=m(W,be));const re=M?m(W,be):u;return re.width=W,re.height=be,re.getContext("2d").drawImage(C,0,0,W,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+W+"x"+be+")."),re}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),C;return C}function g(C){return C.generateMipmaps}function p(C){i.generateMipmap(C)}function y(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(C,M,B,q,ee=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let W=M;if(M===i.RED&&(B===i.FLOAT&&(W=i.R32F),B===i.HALF_FLOAT&&(W=i.R16F),B===i.UNSIGNED_BYTE&&(W=i.R8)),M===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(W=i.R8UI),B===i.UNSIGNED_SHORT&&(W=i.R16UI),B===i.UNSIGNED_INT&&(W=i.R32UI),B===i.BYTE&&(W=i.R8I),B===i.SHORT&&(W=i.R16I),B===i.INT&&(W=i.R32I)),M===i.RG&&(B===i.FLOAT&&(W=i.RG32F),B===i.HALF_FLOAT&&(W=i.RG16F),B===i.UNSIGNED_BYTE&&(W=i.RG8)),M===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(W=i.RG8UI),B===i.UNSIGNED_SHORT&&(W=i.RG16UI),B===i.UNSIGNED_INT&&(W=i.RG32UI),B===i.BYTE&&(W=i.RG8I),B===i.SHORT&&(W=i.RG16I),B===i.INT&&(W=i.RG32I)),M===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(W=i.RGB8UI),B===i.UNSIGNED_SHORT&&(W=i.RGB16UI),B===i.UNSIGNED_INT&&(W=i.RGB32UI),B===i.BYTE&&(W=i.RGB8I),B===i.SHORT&&(W=i.RGB16I),B===i.INT&&(W=i.RGB32I)),M===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(W=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(W=i.RGBA16UI),B===i.UNSIGNED_INT&&(W=i.RGBA32UI),B===i.BYTE&&(W=i.RGBA8I),B===i.SHORT&&(W=i.RGBA16I),B===i.INT&&(W=i.RGBA32I)),M===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(W=i.RGB9_E5),M===i.RGBA){const be=ee?_a:Ze.getTransfer(q);B===i.FLOAT&&(W=i.RGBA32F),B===i.HALF_FLOAT&&(W=i.RGBA16F),B===i.UNSIGNED_BYTE&&(W=be===ut?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(W=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(W=i.RGB5_A1)}return(W===i.R16F||W===i.R32F||W===i.RG16F||W===i.RG32F||W===i.RGBA16F||W===i.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function x(C,M){let B;return C?M===null||M===xs||M===qr?B=i.DEPTH24_STENCIL8:M===Vn?B=i.DEPTH32F_STENCIL8:M===Xr&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===xs||M===qr?B=i.DEPTH_COMPONENT24:M===Vn?B=i.DEPTH_COMPONENT32F:M===Xr&&(B=i.DEPTH_COMPONENT16),B}function R(C,M){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==on&&C.minFilter!==vn?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function A(C){const M=C.target;M.removeEventListener("dispose",A),D(M),M.isVideoTexture&&h.delete(M)}function P(C){const M=C.target;M.removeEventListener("dispose",P),T(M)}function D(C){const M=n.get(C);if(M.__webglInit===void 0)return;const B=C.source,q=d.get(B);if(q){const ee=q[M.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&E(C),Object.keys(q).length===0&&d.delete(B)}n.remove(C)}function E(C){const M=n.get(C);i.deleteTexture(M.__webglTexture);const B=C.source,q=d.get(B);delete q[M.__cacheKey],o.memory.textures--}function T(C){const M=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(M.__webglFramebuffer[q]))for(let ee=0;ee<M.__webglFramebuffer[q].length;ee++)i.deleteFramebuffer(M.__webglFramebuffer[q][ee]);else i.deleteFramebuffer(M.__webglFramebuffer[q]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[q])}else{if(Array.isArray(M.__webglFramebuffer))for(let q=0;q<M.__webglFramebuffer.length;q++)i.deleteFramebuffer(M.__webglFramebuffer[q]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let q=0;q<M.__webglColorRenderbuffer.length;q++)M.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[q]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const B=C.textures;for(let q=0,ee=B.length;q<ee;q++){const W=n.get(B[q]);W.__webglTexture&&(i.deleteTexture(W.__webglTexture),o.memory.textures--),n.remove(B[q])}n.remove(C)}let L=0;function H(){L=0}function V(){const C=L;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),L+=1,C}function X(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function Z(C,M){const B=n.get(C);if(C.isVideoTexture&&Ye(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&B.__version!==C.version){const q=C.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{de(B,C,M);return}}else C.isExternalTexture&&(B.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+M)}function K(C,M){const B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){de(B,C,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+M)}function Q(C,M){const B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){de(B,C,M);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+M)}function G(C,M){const B=n.get(C);if(C.version>0&&B.__version!==C.version){oe(B,C,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+M)}const ue={[Gi]:i.REPEAT,[Ni]:i.CLAMP_TO_EDGE,[ga]:i.MIRRORED_REPEAT},ge={[on]:i.NEAREST,[Xd]:i.NEAREST_MIPMAP_NEAREST,[Nr]:i.NEAREST_MIPMAP_LINEAR,[vn]:i.LINEAR,[na]:i.LINEAR_MIPMAP_NEAREST,[pi]:i.LINEAR_MIPMAP_LINEAR},Pe={[Qp]:i.NEVER,[rm]:i.ALWAYS,[em]:i.LESS,[ef]:i.LEQUAL,[tm]:i.EQUAL,[sm]:i.GEQUAL,[nm]:i.GREATER,[im]:i.NOTEQUAL};function qe(C,M){if(M.type===Vn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===vn||M.magFilter===na||M.magFilter===Nr||M.magFilter===pi||M.minFilter===vn||M.minFilter===na||M.minFilter===Nr||M.minFilter===pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,ue[M.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,ue[M.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,ue[M.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,ge[M.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,ge[M.minFilter]),M.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Pe[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===on||M.minFilter!==Nr&&M.minFilter!==pi||M.type===Vn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function St(C,M){let B=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",A));const q=M.source;let ee=d.get(q);ee===void 0&&(ee={},d.set(q,ee));const W=X(M);if(W!==C.__cacheKey){ee[W]===void 0&&(ee[W]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),ee[W].usedTimes++;const be=ee[C.__cacheKey];be!==void 0&&(ee[C.__cacheKey].usedTimes--,be.usedTimes===0&&E(M)),C.__cacheKey=W,C.__webglTexture=ee[W].texture}return B}function dt(C,M,B){return Math.floor(Math.floor(C/B)/M)}function Y(C,M,B,q){const W=C.updateRanges;if(W.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,B,q,M.data);else{W.sort((ie,me)=>ie.start-me.start);let be=0;for(let ie=1;ie<W.length;ie++){const me=W[be],Oe=W[ie],Te=me.start+me.count,fe=dt(Oe.start,M.width,4),Ge=dt(me.start,M.width,4);Oe.start<=Te+1&&fe===Ge&&dt(Oe.start+Oe.count-1,M.width,4)===fe?me.count=Math.max(me.count,Oe.start+Oe.count-me.start):(++be,W[be]=Oe)}W.length=be+1;const re=i.getParameter(i.UNPACK_ROW_LENGTH),we=i.getParameter(i.UNPACK_SKIP_PIXELS),Ee=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let ie=0,me=W.length;ie<me;ie++){const Oe=W[ie],Te=Math.floor(Oe.start/4),fe=Math.ceil(Oe.count/4),Ge=Te%M.width,N=Math.floor(Te/M.width),se=fe,ae=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ge),i.pixelStorei(i.UNPACK_SKIP_ROWS,N),t.texSubImage2D(i.TEXTURE_2D,0,Ge,N,se,ae,B,q,M.data)}C.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,re),i.pixelStorei(i.UNPACK_SKIP_PIXELS,we),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ee)}}function de(C,M,B){let q=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(q=i.TEXTURE_3D);const ee=St(C,M),W=M.source;t.bindTexture(q,C.__webglTexture,i.TEXTURE0+B);const be=n.get(W);if(W.version!==be.__version||ee===!0){t.activeTexture(i.TEXTURE0+B);const re=Ze.getPrimaries(Ze.workingColorSpace),we=M.colorSpace===Ii?null:Ze.getPrimaries(M.colorSpace),Ee=M.colorSpace===Ii||re===we?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);let ie=_(M.image,!1,s.maxTextureSize);ie=Gt(M,ie);const me=r.convert(M.format,M.colorSpace),Oe=r.convert(M.type);let Te=S(M.internalFormat,me,Oe,M.colorSpace,M.isVideoTexture);qe(q,M);let fe;const Ge=M.mipmaps,N=M.isVideoTexture!==!0,se=be.__version===void 0||ee===!0,ae=W.dataReady,ve=R(M,ie);if(M.isDepthTexture)Te=x(M.format===Kr,M.type),se&&(N?t.texStorage2D(i.TEXTURE_2D,1,Te,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,Te,ie.width,ie.height,0,me,Oe,null));else if(M.isDataTexture)if(Ge.length>0){N&&se&&t.texStorage2D(i.TEXTURE_2D,ve,Te,Ge[0].width,Ge[0].height);for(let te=0,$=Ge.length;te<$;te++)fe=Ge[te],N?ae&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,fe.width,fe.height,me,Oe,fe.data):t.texImage2D(i.TEXTURE_2D,te,Te,fe.width,fe.height,0,me,Oe,fe.data);M.generateMipmaps=!1}else N?(se&&t.texStorage2D(i.TEXTURE_2D,ve,Te,ie.width,ie.height),ae&&Y(M,ie,me,Oe)):t.texImage2D(i.TEXTURE_2D,0,Te,ie.width,ie.height,0,me,Oe,ie.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){N&&se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ve,Te,Ge[0].width,Ge[0].height,ie.depth);for(let te=0,$=Ge.length;te<$;te++)if(fe=Ge[te],M.format!==Pn)if(me!==null)if(N){if(ae)if(M.layerUpdates.size>0){const Se=Wu(fe.width,fe.height,M.format,M.type);for(const He of M.layerUpdates){const _t=fe.data.subarray(He*Se/fe.data.BYTES_PER_ELEMENT,(He+1)*Se/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,He,fe.width,fe.height,1,me,_t)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,fe.width,fe.height,ie.depth,me,fe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,te,Te,fe.width,fe.height,ie.depth,0,fe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?ae&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,fe.width,fe.height,ie.depth,me,Oe,fe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,te,Te,fe.width,fe.height,ie.depth,0,me,Oe,fe.data)}else{N&&se&&t.texStorage2D(i.TEXTURE_2D,ve,Te,Ge[0].width,Ge[0].height);for(let te=0,$=Ge.length;te<$;te++)fe=Ge[te],M.format!==Pn?me!==null?N?ae&&t.compressedTexSubImage2D(i.TEXTURE_2D,te,0,0,fe.width,fe.height,me,fe.data):t.compressedTexImage2D(i.TEXTURE_2D,te,Te,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?ae&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,fe.width,fe.height,me,Oe,fe.data):t.texImage2D(i.TEXTURE_2D,te,Te,fe.width,fe.height,0,me,Oe,fe.data)}else if(M.isDataArrayTexture)if(N){if(se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ve,Te,ie.width,ie.height,ie.depth),ae)if(M.layerUpdates.size>0){const te=Wu(ie.width,ie.height,M.format,M.type);for(const $ of M.layerUpdates){const Se=ie.data.subarray($*te/ie.data.BYTES_PER_ELEMENT,($+1)*te/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,$,ie.width,ie.height,1,me,Oe,Se)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,me,Oe,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Te,ie.width,ie.height,ie.depth,0,me,Oe,ie.data);else if(M.isData3DTexture)N?(se&&t.texStorage3D(i.TEXTURE_3D,ve,Te,ie.width,ie.height,ie.depth),ae&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,me,Oe,ie.data)):t.texImage3D(i.TEXTURE_3D,0,Te,ie.width,ie.height,ie.depth,0,me,Oe,ie.data);else if(M.isFramebufferTexture){if(se)if(N)t.texStorage2D(i.TEXTURE_2D,ve,Te,ie.width,ie.height);else{let te=ie.width,$=ie.height;for(let Se=0;Se<ve;Se++)t.texImage2D(i.TEXTURE_2D,Se,Te,te,$,0,me,Oe,null),te>>=1,$>>=1}}else if(Ge.length>0){if(N&&se){const te=Lt(Ge[0]);t.texStorage2D(i.TEXTURE_2D,ve,Te,te.width,te.height)}for(let te=0,$=Ge.length;te<$;te++)fe=Ge[te],N?ae&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,me,Oe,fe):t.texImage2D(i.TEXTURE_2D,te,Te,me,Oe,fe);M.generateMipmaps=!1}else if(N){if(se){const te=Lt(ie);t.texStorage2D(i.TEXTURE_2D,ve,Te,te.width,te.height)}ae&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,me,Oe,ie)}else t.texImage2D(i.TEXTURE_2D,0,Te,me,Oe,ie);g(M)&&p(q),be.__version=W.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function oe(C,M,B){if(M.image.length!==6)return;const q=St(C,M),ee=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+B);const W=n.get(ee);if(ee.version!==W.__version||q===!0){t.activeTexture(i.TEXTURE0+B);const be=Ze.getPrimaries(Ze.workingColorSpace),re=M.colorSpace===Ii?null:Ze.getPrimaries(M.colorSpace),we=M.colorSpace===Ii||be===re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const Ee=M.isCompressedTexture||M.image[0].isCompressedTexture,ie=M.image[0]&&M.image[0].isDataTexture,me=[];for(let $=0;$<6;$++)!Ee&&!ie?me[$]=_(M.image[$],!0,s.maxCubemapSize):me[$]=ie?M.image[$].image:M.image[$],me[$]=Gt(M,me[$]);const Oe=me[0],Te=r.convert(M.format,M.colorSpace),fe=r.convert(M.type),Ge=S(M.internalFormat,Te,fe,M.colorSpace),N=M.isVideoTexture!==!0,se=W.__version===void 0||q===!0,ae=ee.dataReady;let ve=R(M,Oe);qe(i.TEXTURE_CUBE_MAP,M);let te;if(Ee){N&&se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,Ge,Oe.width,Oe.height);for(let $=0;$<6;$++){te=me[$].mipmaps;for(let Se=0;Se<te.length;Se++){const He=te[Se];M.format!==Pn?Te!==null?N?ae&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Se,0,0,He.width,He.height,Te,He.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Se,Ge,He.width,He.height,0,He.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Se,0,0,He.width,He.height,Te,fe,He.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Se,Ge,He.width,He.height,0,Te,fe,He.data)}}}else{if(te=M.mipmaps,N&&se){te.length>0&&ve++;const $=Lt(me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,Ge,$.width,$.height)}for(let $=0;$<6;$++)if(ie){N?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,me[$].width,me[$].height,Te,fe,me[$].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ge,me[$].width,me[$].height,0,Te,fe,me[$].data);for(let Se=0;Se<te.length;Se++){const _t=te[Se].image[$].image;N?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Se+1,0,0,_t.width,_t.height,Te,fe,_t.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Se+1,Ge,_t.width,_t.height,0,Te,fe,_t.data)}}else{N?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Te,fe,me[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ge,Te,fe,me[$]);for(let Se=0;Se<te.length;Se++){const He=te[Se];N?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Se+1,0,0,Te,fe,He.image[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Se+1,Ge,Te,fe,He.image[$])}}}g(M)&&p(i.TEXTURE_CUBE_MAP),W.__version=ee.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Ne(C,M,B,q,ee,W){const be=r.convert(B.format,B.colorSpace),re=r.convert(B.type),we=S(B.internalFormat,be,re,B.colorSpace),Ee=n.get(M),ie=n.get(B);if(ie.__renderTarget=M,!Ee.__hasExternalTextures){const me=Math.max(1,M.width>>W),Oe=Math.max(1,M.height>>W);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,W,we,me,Oe,M.depth,0,be,re,null):t.texImage2D(ee,W,we,me,Oe,0,be,re,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),ye(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,ee,ie.__webglTexture,0,wt(M)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,ee,ie.__webglTexture,W),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ue(C,M,B){if(i.bindRenderbuffer(i.RENDERBUFFER,C),M.depthBuffer){const q=M.depthTexture,ee=q&&q.isDepthTexture?q.type:null,W=x(M.stencilBuffer,ee),be=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=wt(M);ye(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re,W,M.width,M.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,re,W,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,W,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,be,i.RENDERBUFFER,C)}else{const q=M.textures;for(let ee=0;ee<q.length;ee++){const W=q[ee],be=r.convert(W.format,W.colorSpace),re=r.convert(W.type),we=S(W.internalFormat,be,re,W.colorSpace),Ee=wt(M);B&&ye(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee,we,M.width,M.height):ye(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ee,we,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,we,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ke(C,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(M.depthTexture);q.__renderTarget=M,(!q.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Z(M.depthTexture,0);const ee=q.__webglTexture,W=wt(M);if(M.depthTexture.format===Yr)ye(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0);else if(M.depthTexture.format===Kr)ye(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Pt(C){const M=n.get(C),B=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){const q=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),q){const ee=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,q.removeEventListener("dispose",ee)};q.addEventListener("dispose",ee),M.__depthDisposeCallback=ee}M.__boundDepthTexture=q}if(C.depthTexture&&!M.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");const q=C.texture.mipmaps;q&&q.length>0?ke(M.__webglFramebuffer[0],C):ke(M.__webglFramebuffer,C)}else if(B){M.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[q]),M.__webglDepthbuffer[q]===void 0)M.__webglDepthbuffer[q]=i.createRenderbuffer(),Ue(M.__webglDepthbuffer[q],C,!1);else{const ee=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=M.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,W)}}else{const q=C.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),Ue(M.__webglDepthbuffer,C,!1);else{const ee=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,W)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function nt(C,M,B){const q=n.get(C);M!==void 0&&Ne(q.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Pt(C)}function I(C){const M=C.texture,B=n.get(C),q=n.get(M);C.addEventListener("dispose",P);const ee=C.textures,W=C.isWebGLCubeRenderTarget===!0,be=ee.length>1;if(be||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=M.version,o.memory.textures++),W){B.__webglFramebuffer=[];for(let re=0;re<6;re++)if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[re]=[];for(let we=0;we<M.mipmaps.length;we++)B.__webglFramebuffer[re][we]=i.createFramebuffer()}else B.__webglFramebuffer[re]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let re=0;re<M.mipmaps.length;re++)B.__webglFramebuffer[re]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(be)for(let re=0,we=ee.length;re<we;re++){const Ee=n.get(ee[re]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&ye(C)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let re=0;re<ee.length;re++){const we=ee[re];B.__webglColorRenderbuffer[re]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[re]);const Ee=r.convert(we.format,we.colorSpace),ie=r.convert(we.type),me=S(we.internalFormat,Ee,ie,we.colorSpace,C.isXRRenderTarget===!0),Oe=wt(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Oe,me,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,B.__webglColorRenderbuffer[re])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),Ue(B.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(W){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),qe(i.TEXTURE_CUBE_MAP,M);for(let re=0;re<6;re++)if(M.mipmaps&&M.mipmaps.length>0)for(let we=0;we<M.mipmaps.length;we++)Ne(B.__webglFramebuffer[re][we],C,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,we);else Ne(B.__webglFramebuffer[re],C,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);g(M)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let re=0,we=ee.length;re<we;re++){const Ee=ee[re],ie=n.get(Ee);let me=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(me=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(me,ie.__webglTexture),qe(me,Ee),Ne(B.__webglFramebuffer,C,Ee,i.COLOR_ATTACHMENT0+re,me,0),g(Ee)&&p(me)}t.unbindTexture()}else{let re=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(re=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,q.__webglTexture),qe(re,M),M.mipmaps&&M.mipmaps.length>0)for(let we=0;we<M.mipmaps.length;we++)Ne(B.__webglFramebuffer[we],C,M,i.COLOR_ATTACHMENT0,re,we);else Ne(B.__webglFramebuffer,C,M,i.COLOR_ATTACHMENT0,re,0);g(M)&&p(re),t.unbindTexture()}C.depthBuffer&&Pt(C)}function gt(C){const M=C.textures;for(let B=0,q=M.length;B<q;B++){const ee=M[B];if(g(ee)){const W=y(C),be=n.get(ee).__webglTexture;t.bindTexture(W,be),p(W),t.unbindTexture()}}}const Ie=[],rt=[];function Ce(C){if(C.samples>0){if(ye(C)===!1){const M=C.textures,B=C.width,q=C.height;let ee=i.COLOR_BUFFER_BIT;const W=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,be=n.get(C),re=M.length>1;if(re)for(let Ee=0;Ee<M.length;Ee++)t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);const we=C.texture.mipmaps;we&&we.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Ee=0;Ee<M.length;Ee++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),re){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,be.__webglColorRenderbuffer[Ee]);const ie=n.get(M[Ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ie,0)}i.blitFramebuffer(0,0,B,q,0,0,B,q,ee,i.NEAREST),c===!0&&(Ie.length=0,rt.length=0,Ie.push(i.COLOR_ATTACHMENT0+Ee),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Ie.push(W),rt.push(W),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,rt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ie))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),re)for(let Ee=0;Ee<M.length;Ee++){t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,be.__webglColorRenderbuffer[Ee]);const ie=n.get(M[Ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,ie,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const M=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function wt(C){return Math.min(s.maxSamples,C.samples)}function ye(C){const M=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ye(C){const M=o.render.frame;h.get(C)!==M&&(h.set(C,M),C.update())}function Gt(C,M){const B=C.colorSpace,q=C.format,ee=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||B!==an&&B!==Ii&&(Ze.getTransfer(B)===ut?(q!==Pn||ee!==Jn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),M}function Lt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=V,this.resetTextureUnits=H,this.setTexture2D=Z,this.setTexture2DArray=K,this.setTexture3D=Q,this.setTextureCube=G,this.rebindTextures=nt,this.setupRenderTarget=I,this.updateRenderTargetMipmap=gt,this.updateMultisampleRenderTarget=Ce,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=ye}function Gy(i,e){function t(n,s=Ii){let r;const o=Ze.getTransfer(s);if(n===Jn)return i.UNSIGNED_BYTE;if(n===eh)return i.UNSIGNED_SHORT_4_4_4_4;if(n===th)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Kd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===qd)return i.BYTE;if(n===Yd)return i.SHORT;if(n===Xr)return i.UNSIGNED_SHORT;if(n===Ql)return i.INT;if(n===xs)return i.UNSIGNED_INT;if(n===Vn)return i.FLOAT;if(n===uo)return i.HALF_FLOAT;if(n===jd)return i.ALPHA;if(n===$d)return i.RGB;if(n===Pn)return i.RGBA;if(n===Yr)return i.DEPTH_COMPONENT;if(n===Kr)return i.DEPTH_STENCIL;if(n===nh)return i.RED;if(n===ih)return i.RED_INTEGER;if(n===Zd)return i.RG;if(n===sh)return i.RG_INTEGER;if(n===rh)return i.RGBA_INTEGER;if(n===ia||n===sa||n===ra||n===oa)if(o===ut)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ia)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ia)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===sa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ra)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===oa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===il||n===sl||n===rl||n===ol)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===il)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===sl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===rl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ol)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===al||n===cl||n===ll)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===al||n===cl)return o===ut?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ll)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===hl||n===ul||n===dl||n===fl||n===pl||n===ml||n===gl||n===_l||n===xl||n===vl||n===yl||n===Ml||n===Sl||n===wl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===hl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ul)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===dl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===pl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ml)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===gl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===_l)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===xl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===vl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===yl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ml)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Sl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===wl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===aa||n===El||n===Tl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===aa)return o===ut?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===El)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Tl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Jd||n===bl||n===Al||n===Rl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===aa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===bl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Al)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Rl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===qr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class If extends qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}}const Wy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class qy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new If(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Mi({vertexShader:Wy,fragmentShader:Xy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new j(new gr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Yy extends pr{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,m=null;const _=new qy,g={},p=t.getContextAttributes();let y=null,S=null;const x=[],R=[],A=new ce;let P=null;const D=new sn;D.viewport=new ot;const E=new sn;E.viewport=new ot;const T=[D,E],L=new i0;let H=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let de=x[Y];return de===void 0&&(de=new hc,x[Y]=de),de.getTargetRaySpace()},this.getControllerGrip=function(Y){let de=x[Y];return de===void 0&&(de=new hc,x[Y]=de),de.getGripSpace()},this.getHand=function(Y){let de=x[Y];return de===void 0&&(de=new hc,x[Y]=de),de.getHandSpace()};function X(Y){const de=R.indexOf(Y.inputSource);if(de===-1)return;const oe=x[de];oe!==void 0&&(oe.update(Y.inputSource,Y.frame,l||o),oe.dispatchEvent({type:Y.type,data:Y.inputSource}))}function Z(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",K);for(let Y=0;Y<x.length;Y++){const de=R[Y];de!==null&&(R[Y]=null,x[Y].disconnect(de))}H=null,V=null,_.reset();for(const Y in g)delete g[Y];e.setRenderTarget(y),f=null,d=null,u=null,s=null,S=null,dt.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",K),p.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(A),typeof XRWebGLBinding<"u"&&(u=new XRWebGLBinding(s,t)),u!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let oe=null,Ne=null,Ue=null;p.depth&&(Ue=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=p.stencil?Kr:Yr,Ne=p.stencil?qr:xs);const ke={colorFormat:t.RGBA8,depthFormat:Ue,scaleFactor:r};d=u.createProjectionLayer(ke),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new vs(d.textureWidth,d.textureHeight,{format:Pn,type:Jn,depthTexture:new df(d.textureWidth,d.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const oe={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,oe),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new vs(f.framebufferWidth,f.framebufferHeight,{format:Pn,type:Jn,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),dt.setContext(s),dt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function K(Y){for(let de=0;de<Y.removed.length;de++){const oe=Y.removed[de],Ne=R.indexOf(oe);Ne>=0&&(R[Ne]=null,x[Ne].disconnect(oe))}for(let de=0;de<Y.added.length;de++){const oe=Y.added[de];let Ne=R.indexOf(oe);if(Ne===-1){for(let ke=0;ke<x.length;ke++)if(ke>=R.length){R.push(oe),Ne=ke;break}else if(R[ke]===null){R[ke]=oe,Ne=ke;break}if(Ne===-1)break}const Ue=x[Ne];Ue&&Ue.connect(oe)}}const Q=new b,G=new b;function ue(Y,de,oe){Q.setFromMatrixPosition(de.matrixWorld),G.setFromMatrixPosition(oe.matrixWorld);const Ne=Q.distanceTo(G),Ue=de.projectionMatrix.elements,ke=oe.projectionMatrix.elements,Pt=Ue[14]/(Ue[10]-1),nt=Ue[14]/(Ue[10]+1),I=(Ue[9]+1)/Ue[5],gt=(Ue[9]-1)/Ue[5],Ie=(Ue[8]-1)/Ue[0],rt=(ke[8]+1)/ke[0],Ce=Pt*Ie,wt=Pt*rt,ye=Ne/(-Ie+rt),Ye=ye*-Ie;if(de.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ye),Y.translateZ(ye),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Ue[10]===-1)Y.projectionMatrix.copy(de.projectionMatrix),Y.projectionMatrixInverse.copy(de.projectionMatrixInverse);else{const Gt=Pt+ye,Lt=nt+ye,C=Ce-Ye,M=wt+(Ne-Ye),B=I*nt/Lt*Gt,q=gt*nt/Lt*Gt;Y.projectionMatrix.makePerspective(C,M,B,q,Gt,Lt),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ge(Y,de){de===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(de.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let de=Y.near,oe=Y.far;_.texture!==null&&(_.depthNear>0&&(de=_.depthNear),_.depthFar>0&&(oe=_.depthFar)),L.near=E.near=D.near=de,L.far=E.far=D.far=oe,(H!==L.near||V!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),H=L.near,V=L.far),L.layers.mask=Y.layers.mask|6,D.layers.mask=L.layers.mask&3,E.layers.mask=L.layers.mask&5;const Ne=Y.parent,Ue=L.cameras;ge(L,Ne);for(let ke=0;ke<Ue.length;ke++)ge(Ue[ke],Ne);Ue.length===2?ue(L,D,E):L.projectionMatrix.copy(D.projectionMatrix),Pe(Y,L,Ne)};function Pe(Y,de,oe){oe===null?Y.matrix.copy(de.matrixWorld):(Y.matrix.copy(oe.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(de.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(de.projectionMatrix),Y.projectionMatrixInverse.copy(de.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=sr*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(Y){c=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(L)},this.getCameraTexture=function(Y){return g[Y]};let qe=null;function St(Y,de){if(h=de.getViewerPose(l||o),m=de,h!==null){const oe=h.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let Ne=!1;oe.length!==L.cameras.length&&(L.cameras.length=0,Ne=!0);for(let nt=0;nt<oe.length;nt++){const I=oe[nt];let gt=null;if(f!==null)gt=f.getViewport(I);else{const rt=u.getViewSubImage(d,I);gt=rt.viewport,nt===0&&(e.setRenderTargetTextures(S,rt.colorTexture,rt.depthStencilTexture),e.setRenderTarget(S))}let Ie=T[nt];Ie===void 0&&(Ie=new sn,Ie.layers.enable(nt),Ie.viewport=new ot,T[nt]=Ie),Ie.matrix.fromArray(I.transform.matrix),Ie.matrix.decompose(Ie.position,Ie.quaternion,Ie.scale),Ie.projectionMatrix.fromArray(I.projectionMatrix),Ie.projectionMatrixInverse.copy(Ie.projectionMatrix).invert(),Ie.viewport.set(gt.x,gt.y,gt.width,gt.height),nt===0&&(L.matrix.copy(Ie.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Ne===!0&&L.cameras.push(Ie)}const Ue=s.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&u){const nt=u.getDepthInformation(oe[0]);nt&&nt.isValid&&nt.texture&&_.init(nt,s.renderState)}if(Ue&&Ue.includes("camera-access")&&(e.state.unbindTexture(),u))for(let nt=0;nt<oe.length;nt++){const I=oe[nt].camera;if(I){let gt=g[I];gt||(gt=new If,g[I]=gt);const Ie=u.getCameraImage(I);gt.sourceTexture=Ie}}}for(let oe=0;oe<x.length;oe++){const Ne=R[oe],Ue=x[oe];Ne!==null&&Ue!==void 0&&Ue.update(Ne,de,l||o)}qe&&qe(Y,de),de.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:de}),m=null}const dt=new Af;dt.setAnimationLoop(St),this.setAnimationLoop=function(Y){qe=Y},this.dispose=function(){}}}const es=new Nn,Ky=new Ve;function jy(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,af(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,y,S,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,x)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,y,S):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===dn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===dn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=e.get(p),S=y.envMap,x=y.envMapRotation;S&&(g.envMap.value=S,es.copy(x),es.x*=-1,es.y*=-1,es.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(es.y*=-1,es.z*=-1),g.envMapRotation.value.setFromMatrix4(Ky.makeRotationFromEuler(es)),g.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,y,S){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=S*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===dn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const y=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function $y(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,S){const x=S.program;n.uniformBlockBinding(y,x)}function l(y,S){let x=s[y.id];x===void 0&&(m(y),x=h(y),s[y.id]=x,y.addEventListener("dispose",g));const R=S.program;n.updateUBOMapping(y,R);const A=e.render.frame;r[y.id]!==A&&(d(y),r[y.id]=A)}function h(y){const S=u();y.__bindingPointIndex=S;const x=i.createBuffer(),R=y.__size,A=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,R,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,x),x}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const S=s[y.id],x=y.uniforms,R=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let A=0,P=x.length;A<P;A++){const D=Array.isArray(x[A])?x[A]:[x[A]];for(let E=0,T=D.length;E<T;E++){const L=D[E];if(f(L,A,E,R)===!0){const H=L.__offset,V=Array.isArray(L.value)?L.value:[L.value];let X=0;for(let Z=0;Z<V.length;Z++){const K=V[Z],Q=_(K);typeof K=="number"||typeof K=="boolean"?(L.__data[0]=K,i.bufferSubData(i.UNIFORM_BUFFER,H+X,L.__data)):K.isMatrix3?(L.__data[0]=K.elements[0],L.__data[1]=K.elements[1],L.__data[2]=K.elements[2],L.__data[3]=0,L.__data[4]=K.elements[3],L.__data[5]=K.elements[4],L.__data[6]=K.elements[5],L.__data[7]=0,L.__data[8]=K.elements[6],L.__data[9]=K.elements[7],L.__data[10]=K.elements[8],L.__data[11]=0):(K.toArray(L.__data,X),X+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,S,x,R){const A=y.value,P=S+"_"+x;if(R[P]===void 0)return typeof A=="number"||typeof A=="boolean"?R[P]=A:R[P]=A.clone(),!0;{const D=R[P];if(typeof A=="number"||typeof A=="boolean"){if(D!==A)return R[P]=A,!0}else if(D.equals(A)===!1)return D.copy(A),!0}return!1}function m(y){const S=y.uniforms;let x=0;const R=16;for(let P=0,D=S.length;P<D;P++){const E=Array.isArray(S[P])?S[P]:[S[P]];for(let T=0,L=E.length;T<L;T++){const H=E[T],V=Array.isArray(H.value)?H.value:[H.value];for(let X=0,Z=V.length;X<Z;X++){const K=V[X],Q=_(K),G=x%R,ue=G%Q.boundary,ge=G+ue;x+=ue,ge!==0&&R-ge<Q.storage&&(x+=R-ge),H.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=x,x+=Q.storage}}}const A=x%R;return A>0&&(x+=R-A),y.__size=x,y.__cache={},this}function _(y){const S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=48,S.storage=48):y.isMatrix4?(S.boundary=64,S.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),S}function g(y){const S=y.target;S.removeEventListener("dispose",g);const x=o.indexOf(S.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function p(){for(const y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class Zy{constructor(e={}){const{canvas:t=Sm(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const y=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ki,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let R=!1;this._outputColorSpace=yt;let A=0,P=0,D=null,E=-1,T=null;const L=new ot,H=new ot;let V=null;const X=new xe(0);let Z=0,K=t.width,Q=t.height,G=1,ue=null,ge=null;const Pe=new ot(0,0,K,Q),qe=new ot(0,0,K,Q);let St=!1;const dt=new fh;let Y=!1,de=!1;const oe=new Ve,Ne=new b,Ue=new ot,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Pt=!1;function nt(){return D===null?G:1}let I=n;function gt(w,F){return t.getContext(w,F)}try{const w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Zl}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",ve,!1),t.addEventListener("webglcontextcreationerror",te,!1),I===null){const F="webgl2";if(I=gt(F,w),I===null)throw gt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Ie,rt,Ce,wt,ye,Ye,Gt,Lt,C,M,B,q,ee,W,be,re,we,Ee,ie,me,Oe,Te,fe,Ge;function N(){Ie=new av(I),Ie.init(),Te=new Gy(I,Ie),rt=new ev(I,Ie,e,Te),Ce=new Hy(I,Ie),rt.reversedDepthBuffer&&d&&Ce.buffers.depth.setReversed(!0),wt=new hv(I),ye=new Ry,Ye=new Vy(I,Ie,Ce,ye,rt,Te,wt),Gt=new nv(x),Lt=new ov(x),C=new g0(I),fe=new Jx(I,C),M=new cv(I,C,wt,fe),B=new dv(I,M,C,wt),ie=new uv(I,rt,Ye),re=new tv(ye),q=new Ay(x,Gt,Lt,Ie,rt,fe,re),ee=new jy(x,ye),W=new Py,be=new Fy(Ie),Ee=new Zx(x,Gt,Lt,Ce,B,f,c),we=new zy(x,B,rt),Ge=new $y(I,wt,rt,Ce),me=new Qx(I,Ie,wt),Oe=new lv(I,Ie,wt),wt.programs=q.programs,x.capabilities=rt,x.extensions=Ie,x.properties=ye,x.renderLists=W,x.shadowMap=we,x.state=Ce,x.info=wt}N();const se=new Yy(x,I);this.xr=se,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const w=Ie.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Ie.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(w){w!==void 0&&(G=w,this.setSize(K,Q,!1))},this.getSize=function(w){return w.set(K,Q)},this.setSize=function(w,F,z=!0){if(se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=w,Q=F,t.width=Math.floor(w*G),t.height=Math.floor(F*G),z===!0&&(t.style.width=w+"px",t.style.height=F+"px"),this.setViewport(0,0,w,F)},this.getDrawingBufferSize=function(w){return w.set(K*G,Q*G).floor()},this.setDrawingBufferSize=function(w,F,z){K=w,Q=F,G=z,t.width=Math.floor(w*z),t.height=Math.floor(F*z),this.setViewport(0,0,w,F)},this.getCurrentViewport=function(w){return w.copy(L)},this.getViewport=function(w){return w.copy(Pe)},this.setViewport=function(w,F,z,k){w.isVector4?Pe.set(w.x,w.y,w.z,w.w):Pe.set(w,F,z,k),Ce.viewport(L.copy(Pe).multiplyScalar(G).round())},this.getScissor=function(w){return w.copy(qe)},this.setScissor=function(w,F,z,k){w.isVector4?qe.set(w.x,w.y,w.z,w.w):qe.set(w,F,z,k),Ce.scissor(H.copy(qe).multiplyScalar(G).round())},this.getScissorTest=function(){return St},this.setScissorTest=function(w){Ce.setScissorTest(St=w)},this.setOpaqueSort=function(w){ue=w},this.setTransparentSort=function(w){ge=w},this.getClearColor=function(w){return w.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor(...arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha(...arguments)},this.clear=function(w=!0,F=!0,z=!0){let k=0;if(w){let O=!1;if(D!==null){const ne=D.texture.format;O=ne===rh||ne===sh||ne===ih}if(O){const ne=D.texture.type,pe=ne===Jn||ne===xs||ne===Xr||ne===qr||ne===eh||ne===th,Me=Ee.getClearColor(),_e=Ee.getClearAlpha(),Fe=Me.r,Be=Me.g,Le=Me.b;pe?(m[0]=Fe,m[1]=Be,m[2]=Le,m[3]=_e,I.clearBufferuiv(I.COLOR,0,m)):(_[0]=Fe,_[1]=Be,_[2]=Le,_[3]=_e,I.clearBufferiv(I.COLOR,0,_))}else k|=I.COLOR_BUFFER_BIT}F&&(k|=I.DEPTH_BUFFER_BIT),z&&(k|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",ve,!1),t.removeEventListener("webglcontextcreationerror",te,!1),Ee.dispose(),W.dispose(),be.dispose(),ye.dispose(),Gt.dispose(),Lt.dispose(),B.dispose(),fe.dispose(),Ge.dispose(),q.dispose(),se.dispose(),se.removeEventListener("sessionstart",Xn),se.removeEventListener("sessionend",Bh),Yi.stop()};function ae(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ve(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const w=wt.autoReset,F=we.enabled,z=we.autoUpdate,k=we.needsUpdate,O=we.type;N(),wt.autoReset=w,we.enabled=F,we.autoUpdate=z,we.needsUpdate=k,we.type=O}function te(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function $(w){const F=w.target;F.removeEventListener("dispose",$),Se(F)}function Se(w){He(w),ye.remove(w)}function He(w){const F=ye.get(w).programs;F!==void 0&&(F.forEach(function(z){q.releaseProgram(z)}),w.isShaderMaterial&&q.releaseShaderCache(w))}this.renderBufferDirect=function(w,F,z,k,O,ne){F===null&&(F=ke);const pe=O.isMesh&&O.matrixWorld.determinant()<0,Me=fp(w,F,z,k,O);Ce.setMaterial(k,pe);let _e=z.index,Fe=1;if(k.wireframe===!0){if(_e=M.getWireframeAttribute(z),_e===void 0)return;Fe=2}const Be=z.drawRange,Le=z.attributes.position;let Qe=Be.start*Fe,ht=(Be.start+Be.count)*Fe;ne!==null&&(Qe=Math.max(Qe,ne.start*Fe),ht=Math.min(ht,(ne.start+ne.count)*Fe)),_e!==null?(Qe=Math.max(Qe,0),ht=Math.min(ht,_e.count)):Le!=null&&(Qe=Math.max(Qe,0),ht=Math.min(ht,Le.count));const Rt=ht-Qe;if(Rt<0||Rt===1/0)return;fe.setup(O,k,Me,z,_e);let vt,ft=me;if(_e!==null&&(vt=C.get(_e),ft=Oe,ft.setIndex(vt)),O.isMesh)k.wireframe===!0?(Ce.setLineWidth(k.wireframeLinewidth*nt()),ft.setMode(I.LINES)):ft.setMode(I.TRIANGLES);else if(O.isLine){let De=k.linewidth;De===void 0&&(De=1),Ce.setLineWidth(De*nt()),O.isLineSegments?ft.setMode(I.LINES):O.isLineLoop?ft.setMode(I.LINE_LOOP):ft.setMode(I.LINE_STRIP)}else O.isPoints?ft.setMode(I.POINTS):O.isSprite&&ft.setMode(I.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Ks("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ft.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Ie.get("WEBGL_multi_draw"))ft.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const De=O._multiDrawStarts,Tt=O._multiDrawCounts,it=O._multiDrawCount,fn=_e?C.get(_e).bytesPerElement:1,As=ye.get(k).currentProgram.getUniforms();for(let pn=0;pn<it;pn++)As.setValue(I,"_gl_DrawID",pn),ft.render(De[pn]/fn,Tt[pn])}else if(O.isInstancedMesh)ft.renderInstances(Qe,Rt,O.count);else if(z.isInstancedBufferGeometry){const De=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Tt=Math.min(z.instanceCount,De);ft.renderInstances(Qe,Rt,Tt)}else ft.render(Qe,Rt)};function _t(w,F,z){w.transparent===!0&&w.side===It&&w.forceSinglePass===!1?(w.side=dn,w.needsUpdate=!0,vo(w,F,z),w.side=Zn,w.needsUpdate=!0,vo(w,F,z),w.side=It):vo(w,F,z)}this.compile=function(w,F,z=null){z===null&&(z=w),p=be.get(z),p.init(F),S.push(p),z.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),w!==z&&w.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const k=new Set;return w.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ne=O.material;if(ne)if(Array.isArray(ne))for(let pe=0;pe<ne.length;pe++){const Me=ne[pe];_t(Me,z,O),k.add(Me)}else _t(ne,z,O),k.add(ne)}),p=S.pop(),k},this.compileAsync=function(w,F,z=null){const k=this.compile(w,F,z);return new Promise(O=>{function ne(){if(k.forEach(function(pe){ye.get(pe).currentProgram.isReady()&&k.delete(pe)}),k.size===0){O(w);return}setTimeout(ne,10)}Ie.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let at=null;function ii(w){at&&at(w)}function Xn(){Yi.stop()}function Bh(){Yi.start()}const Yi=new Af;Yi.setAnimationLoop(ii),typeof self<"u"&&Yi.setContext(self),this.setAnimationLoop=function(w){at=w,se.setAnimationLoop(w),w===null?Yi.stop():Yi.start()},se.addEventListener("sessionstart",Xn),se.addEventListener("sessionend",Bh),this.render=function(w,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(F),F=se.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,F,D),p=be.get(w,S.length),p.init(F),S.push(p),oe.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),dt.setFromProjectionMatrix(oe,jn,F.reversedDepth),de=this.localClippingEnabled,Y=re.init(this.clippingPlanes,de),g=W.get(w,y.length),g.init(),y.push(g),se.enabled===!0&&se.isPresenting===!0){const ne=x.xr.getDepthSensingMesh();ne!==null&&Ha(ne,F,-1/0,x.sortObjects)}Ha(w,F,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(ue,ge),Pt=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Pt&&Ee.addToRenderList(g,w),this.info.render.frame++,Y===!0&&re.beginShadows();const z=p.state.shadowsArray;we.render(z,w,F),Y===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=g.opaque,O=g.transmissive;if(p.setupLights(),F.isArrayCamera){const ne=F.cameras;if(O.length>0)for(let pe=0,Me=ne.length;pe<Me;pe++){const _e=ne[pe];kh(k,O,w,_e)}Pt&&Ee.render(w);for(let pe=0,Me=ne.length;pe<Me;pe++){const _e=ne[pe];zh(g,w,_e,_e.viewport)}}else O.length>0&&kh(k,O,w,F),Pt&&Ee.render(w),zh(g,w,F);D!==null&&P===0&&(Ye.updateMultisampleRenderTarget(D),Ye.updateRenderTargetMipmap(D)),w.isScene===!0&&w.onAfterRender(x,w,F),fe.resetDefaultState(),E=-1,T=null,S.pop(),S.length>0?(p=S[S.length-1],Y===!0&&re.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function Ha(w,F,z,k){if(w.visible===!1)return;if(w.layers.test(F.layers)){if(w.isGroup)z=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(F);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||dt.intersectsSprite(w)){k&&Ue.setFromMatrixPosition(w.matrixWorld).applyMatrix4(oe);const pe=B.update(w),Me=w.material;Me.visible&&g.push(w,pe,Me,z,Ue.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||dt.intersectsObject(w))){const pe=B.update(w),Me=w.material;if(k&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Ue.copy(w.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),Ue.copy(pe.boundingSphere.center)),Ue.applyMatrix4(w.matrixWorld).applyMatrix4(oe)),Array.isArray(Me)){const _e=pe.groups;for(let Fe=0,Be=_e.length;Fe<Be;Fe++){const Le=_e[Fe],Qe=Me[Le.materialIndex];Qe&&Qe.visible&&g.push(w,pe,Qe,z,Ue.z,Le)}}else Me.visible&&g.push(w,pe,Me,z,Ue.z,null)}}const ne=w.children;for(let pe=0,Me=ne.length;pe<Me;pe++)Ha(ne[pe],F,z,k)}function zh(w,F,z,k){const O=w.opaque,ne=w.transmissive,pe=w.transparent;p.setupLightsView(z),Y===!0&&re.setGlobalState(x.clippingPlanes,z),k&&Ce.viewport(L.copy(k)),O.length>0&&xo(O,F,z),ne.length>0&&xo(ne,F,z),pe.length>0&&xo(pe,F,z),Ce.buffers.depth.setTest(!0),Ce.buffers.depth.setMask(!0),Ce.buffers.color.setMask(!0),Ce.setPolygonOffset(!1)}function kh(w,F,z,k){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[k.id]===void 0&&(p.state.transmissionRenderTarget[k.id]=new vs(1,1,{generateMipmaps:!0,type:Ie.has("EXT_color_buffer_half_float")||Ie.has("EXT_color_buffer_float")?uo:Jn,minFilter:pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace}));const ne=p.state.transmissionRenderTarget[k.id],pe=k.viewport||L;ne.setSize(pe.z*x.transmissionResolutionScale,pe.w*x.transmissionResolutionScale);const Me=x.getRenderTarget(),_e=x.getActiveCubeFace(),Fe=x.getActiveMipmapLevel();x.setRenderTarget(ne),x.getClearColor(X),Z=x.getClearAlpha(),Z<1&&x.setClearColor(16777215,.5),x.clear(),Pt&&Ee.render(z);const Be=x.toneMapping;x.toneMapping=ki;const Le=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),p.setupLightsView(k),Y===!0&&re.setGlobalState(x.clippingPlanes,k),xo(w,z,k),Ye.updateMultisampleRenderTarget(ne),Ye.updateRenderTargetMipmap(ne),Ie.has("WEBGL_multisampled_render_to_texture")===!1){let Qe=!1;for(let ht=0,Rt=F.length;ht<Rt;ht++){const vt=F[ht],ft=vt.object,De=vt.geometry,Tt=vt.material,it=vt.group;if(Tt.side===It&&ft.layers.test(k.layers)){const fn=Tt.side;Tt.side=dn,Tt.needsUpdate=!0,Hh(ft,z,k,De,Tt,it),Tt.side=fn,Tt.needsUpdate=!0,Qe=!0}}Qe===!0&&(Ye.updateMultisampleRenderTarget(ne),Ye.updateRenderTargetMipmap(ne))}x.setRenderTarget(Me,_e,Fe),x.setClearColor(X,Z),Le!==void 0&&(k.viewport=Le),x.toneMapping=Be}function xo(w,F,z){const k=F.isScene===!0?F.overrideMaterial:null;for(let O=0,ne=w.length;O<ne;O++){const pe=w[O],Me=pe.object,_e=pe.geometry,Fe=pe.group;let Be=pe.material;Be.allowOverride===!0&&k!==null&&(Be=k),Me.layers.test(z.layers)&&Hh(Me,F,z,_e,Be,Fe)}}function Hh(w,F,z,k,O,ne){w.onBeforeRender(x,F,z,k,O,ne),w.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),O.onBeforeRender(x,F,z,k,w,ne),O.transparent===!0&&O.side===It&&O.forceSinglePass===!1?(O.side=dn,O.needsUpdate=!0,x.renderBufferDirect(z,F,k,O,w,ne),O.side=Zn,O.needsUpdate=!0,x.renderBufferDirect(z,F,k,O,w,ne),O.side=It):x.renderBufferDirect(z,F,k,O,w,ne),w.onAfterRender(x,F,z,k,O,ne)}function vo(w,F,z){F.isScene!==!0&&(F=ke);const k=ye.get(w),O=p.state.lights,ne=p.state.shadowsArray,pe=O.state.version,Me=q.getParameters(w,O.state,ne,F,z),_e=q.getProgramCacheKey(Me);let Fe=k.programs;k.environment=w.isMeshStandardMaterial?F.environment:null,k.fog=F.fog,k.envMap=(w.isMeshStandardMaterial?Lt:Gt).get(w.envMap||k.environment),k.envMapRotation=k.environment!==null&&w.envMap===null?F.environmentRotation:w.envMapRotation,Fe===void 0&&(w.addEventListener("dispose",$),Fe=new Map,k.programs=Fe);let Be=Fe.get(_e);if(Be!==void 0){if(k.currentProgram===Be&&k.lightsStateVersion===pe)return Gh(w,Me),Be}else Me.uniforms=q.getUniforms(w),w.onBeforeCompile(Me,x),Be=q.acquireProgram(Me,_e),Fe.set(_e,Be),k.uniforms=Me.uniforms;const Le=k.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Le.clippingPlanes=re.uniform),Gh(w,Me),k.needsLights=mp(w),k.lightsStateVersion=pe,k.needsLights&&(Le.ambientLightColor.value=O.state.ambient,Le.lightProbe.value=O.state.probe,Le.directionalLights.value=O.state.directional,Le.directionalLightShadows.value=O.state.directionalShadow,Le.spotLights.value=O.state.spot,Le.spotLightShadows.value=O.state.spotShadow,Le.rectAreaLights.value=O.state.rectArea,Le.ltc_1.value=O.state.rectAreaLTC1,Le.ltc_2.value=O.state.rectAreaLTC2,Le.pointLights.value=O.state.point,Le.pointLightShadows.value=O.state.pointShadow,Le.hemisphereLights.value=O.state.hemi,Le.directionalShadowMap.value=O.state.directionalShadowMap,Le.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Le.spotShadowMap.value=O.state.spotShadowMap,Le.spotLightMatrix.value=O.state.spotLightMatrix,Le.spotLightMap.value=O.state.spotLightMap,Le.pointShadowMap.value=O.state.pointShadowMap,Le.pointShadowMatrix.value=O.state.pointShadowMatrix),k.currentProgram=Be,k.uniformsList=null,Be}function Vh(w){if(w.uniformsList===null){const F=w.currentProgram.getUniforms();w.uniformsList=ca.seqWithValue(F.seq,w.uniforms)}return w.uniformsList}function Gh(w,F){const z=ye.get(w);z.outputColorSpace=F.outputColorSpace,z.batching=F.batching,z.batchingColor=F.batchingColor,z.instancing=F.instancing,z.instancingColor=F.instancingColor,z.instancingMorph=F.instancingMorph,z.skinning=F.skinning,z.morphTargets=F.morphTargets,z.morphNormals=F.morphNormals,z.morphColors=F.morphColors,z.morphTargetsCount=F.morphTargetsCount,z.numClippingPlanes=F.numClippingPlanes,z.numIntersection=F.numClipIntersection,z.vertexAlphas=F.vertexAlphas,z.vertexTangents=F.vertexTangents,z.toneMapping=F.toneMapping}function fp(w,F,z,k,O){F.isScene!==!0&&(F=ke),Ye.resetTextureUnits();const ne=F.fog,pe=k.isMeshStandardMaterial?F.environment:null,Me=D===null?x.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:an,_e=(k.isMeshStandardMaterial?Lt:Gt).get(k.envMap||pe),Fe=k.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Be=!!z.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Le=!!z.morphAttributes.position,Qe=!!z.morphAttributes.normal,ht=!!z.morphAttributes.color;let Rt=ki;k.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(Rt=x.toneMapping);const vt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ft=vt!==void 0?vt.length:0,De=ye.get(k),Tt=p.state.lights;if(Y===!0&&(de===!0||w!==T)){const Qt=w===T&&k.id===E;re.setState(k,w,Qt)}let it=!1;k.version===De.__version?(De.needsLights&&De.lightsStateVersion!==Tt.state.version||De.outputColorSpace!==Me||O.isBatchedMesh&&De.batching===!1||!O.isBatchedMesh&&De.batching===!0||O.isBatchedMesh&&De.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&De.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&De.instancing===!1||!O.isInstancedMesh&&De.instancing===!0||O.isSkinnedMesh&&De.skinning===!1||!O.isSkinnedMesh&&De.skinning===!0||O.isInstancedMesh&&De.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&De.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&De.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&De.instancingMorph===!1&&O.morphTexture!==null||De.envMap!==_e||k.fog===!0&&De.fog!==ne||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==re.numPlanes||De.numIntersection!==re.numIntersection)||De.vertexAlphas!==Fe||De.vertexTangents!==Be||De.morphTargets!==Le||De.morphNormals!==Qe||De.morphColors!==ht||De.toneMapping!==Rt||De.morphTargetsCount!==ft)&&(it=!0):(it=!0,De.__version=k.version);let fn=De.currentProgram;it===!0&&(fn=vo(k,F,O));let As=!1,pn=!1,Sr=!1;const bt=fn.getUniforms(),wn=De.uniforms;if(Ce.useProgram(fn.program)&&(As=!0,pn=!0,Sr=!0),k.id!==E&&(E=k.id,pn=!0),As||T!==w){Ce.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),bt.setValue(I,"projectionMatrix",w.projectionMatrix),bt.setValue(I,"viewMatrix",w.matrixWorldInverse);const ln=bt.map.cameraPosition;ln!==void 0&&ln.setValue(I,Ne.setFromMatrixPosition(w.matrixWorld)),rt.logarithmicDepthBuffer&&bt.setValue(I,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&bt.setValue(I,"isOrthographic",w.isOrthographicCamera===!0),T!==w&&(T=w,pn=!0,Sr=!0)}if(O.isSkinnedMesh){bt.setOptional(I,O,"bindMatrix"),bt.setOptional(I,O,"bindMatrixInverse");const Qt=O.skeleton;Qt&&(Qt.boneTexture===null&&Qt.computeBoneTexture(),bt.setValue(I,"boneTexture",Qt.boneTexture,Ye))}O.isBatchedMesh&&(bt.setOptional(I,O,"batchingTexture"),bt.setValue(I,"batchingTexture",O._matricesTexture,Ye),bt.setOptional(I,O,"batchingIdTexture"),bt.setValue(I,"batchingIdTexture",O._indirectTexture,Ye),bt.setOptional(I,O,"batchingColorTexture"),O._colorsTexture!==null&&bt.setValue(I,"batchingColorTexture",O._colorsTexture,Ye));const En=z.morphAttributes;if((En.position!==void 0||En.normal!==void 0||En.color!==void 0)&&ie.update(O,z,fn),(pn||De.receiveShadow!==O.receiveShadow)&&(De.receiveShadow=O.receiveShadow,bt.setValue(I,"receiveShadow",O.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(wn.envMap.value=_e,wn.flipEnvMap.value=_e.isCubeTexture&&_e.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&F.environment!==null&&(wn.envMapIntensity.value=F.environmentIntensity),pn&&(bt.setValue(I,"toneMappingExposure",x.toneMappingExposure),De.needsLights&&pp(wn,Sr),ne&&k.fog===!0&&ee.refreshFogUniforms(wn,ne),ee.refreshMaterialUniforms(wn,k,G,Q,p.state.transmissionRenderTarget[w.id]),ca.upload(I,Vh(De),wn,Ye)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(ca.upload(I,Vh(De),wn,Ye),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&bt.setValue(I,"center",O.center),bt.setValue(I,"modelViewMatrix",O.modelViewMatrix),bt.setValue(I,"normalMatrix",O.normalMatrix),bt.setValue(I,"modelMatrix",O.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Qt=k.uniformsGroups;for(let ln=0,Va=Qt.length;ln<Va;ln++){const Ki=Qt[ln];Ge.update(Ki,fn),Ge.bind(Ki,fn)}}return fn}function pp(w,F){w.ambientLightColor.needsUpdate=F,w.lightProbe.needsUpdate=F,w.directionalLights.needsUpdate=F,w.directionalLightShadows.needsUpdate=F,w.pointLights.needsUpdate=F,w.pointLightShadows.needsUpdate=F,w.spotLights.needsUpdate=F,w.spotLightShadows.needsUpdate=F,w.rectAreaLights.needsUpdate=F,w.hemisphereLights.needsUpdate=F}function mp(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(w,F,z){const k=ye.get(w);k.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),ye.get(w.texture).__webglTexture=F,ye.get(w.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:z,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,F){const z=ye.get(w);z.__webglFramebuffer=F,z.__useDefaultFramebuffer=F===void 0};const gp=I.createFramebuffer();this.setRenderTarget=function(w,F=0,z=0){D=w,A=F,P=z;let k=!0,O=null,ne=!1,pe=!1;if(w){const _e=ye.get(w);if(_e.__useDefaultFramebuffer!==void 0)Ce.bindFramebuffer(I.FRAMEBUFFER,null),k=!1;else if(_e.__webglFramebuffer===void 0)Ye.setupRenderTarget(w);else if(_e.__hasExternalTextures)Ye.rebindTextures(w,ye.get(w.texture).__webglTexture,ye.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Le=w.depthTexture;if(_e.__boundDepthTexture!==Le){if(Le!==null&&ye.has(Le)&&(w.width!==Le.image.width||w.height!==Le.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ye.setupDepthRenderbuffer(w)}}const Fe=w.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(pe=!0);const Be=ye.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Be[F])?O=Be[F][z]:O=Be[F],ne=!0):w.samples>0&&Ye.useMultisampledRTT(w)===!1?O=ye.get(w).__webglMultisampledFramebuffer:Array.isArray(Be)?O=Be[z]:O=Be,L.copy(w.viewport),H.copy(w.scissor),V=w.scissorTest}else L.copy(Pe).multiplyScalar(G).floor(),H.copy(qe).multiplyScalar(G).floor(),V=St;if(z!==0&&(O=gp),Ce.bindFramebuffer(I.FRAMEBUFFER,O)&&k&&Ce.drawBuffers(w,O),Ce.viewport(L),Ce.scissor(H),Ce.setScissorTest(V),ne){const _e=ye.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+F,_e.__webglTexture,z)}else if(pe){const _e=F;for(let Fe=0;Fe<w.textures.length;Fe++){const Be=ye.get(w.textures[Fe]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Fe,Be.__webglTexture,z,_e)}}else if(w!==null&&z!==0){const _e=ye.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,_e.__webglTexture,z)}E=-1},this.readRenderTargetPixels=function(w,F,z,k,O,ne,pe,Me=0){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=ye.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&pe!==void 0&&(_e=_e[pe]),_e){Ce.bindFramebuffer(I.FRAMEBUFFER,_e);try{const Fe=w.textures[Me],Be=Fe.format,Le=Fe.type;if(!rt.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!rt.textureTypeReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=w.width-k&&z>=0&&z<=w.height-O&&(w.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Me),I.readPixels(F,z,k,O,Te.convert(Be),Te.convert(Le),ne))}finally{const Fe=D!==null?ye.get(D).__webglFramebuffer:null;Ce.bindFramebuffer(I.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(w,F,z,k,O,ne,pe,Me=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=ye.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&pe!==void 0&&(_e=_e[pe]),_e)if(F>=0&&F<=w.width-k&&z>=0&&z<=w.height-O){Ce.bindFramebuffer(I.FRAMEBUFFER,_e);const Fe=w.textures[Me],Be=Fe.format,Le=Fe.type;if(!rt.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!rt.textureTypeReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Qe=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Qe),I.bufferData(I.PIXEL_PACK_BUFFER,ne.byteLength,I.STREAM_READ),w.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Me),I.readPixels(F,z,k,O,Te.convert(Be),Te.convert(Le),0);const ht=D!==null?ye.get(D).__webglFramebuffer:null;Ce.bindFramebuffer(I.FRAMEBUFFER,ht);const Rt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await wm(I,Rt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Qe),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ne),I.deleteBuffer(Qe),I.deleteSync(Rt),ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,F=null,z=0){const k=Math.pow(2,-z),O=Math.floor(w.image.width*k),ne=Math.floor(w.image.height*k),pe=F!==null?F.x:0,Me=F!==null?F.y:0;Ye.setTexture2D(w,0),I.copyTexSubImage2D(I.TEXTURE_2D,z,0,0,pe,Me,O,ne),Ce.unbindTexture()};const _p=I.createFramebuffer(),xp=I.createFramebuffer();this.copyTextureToTexture=function(w,F,z=null,k=null,O=0,ne=null){ne===null&&(O!==0?(Ks("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ne=O,O=0):ne=0);let pe,Me,_e,Fe,Be,Le,Qe,ht,Rt;const vt=w.isCompressedTexture?w.mipmaps[ne]:w.image;if(z!==null)pe=z.max.x-z.min.x,Me=z.max.y-z.min.y,_e=z.isBox3?z.max.z-z.min.z:1,Fe=z.min.x,Be=z.min.y,Le=z.isBox3?z.min.z:0;else{const En=Math.pow(2,-O);pe=Math.floor(vt.width*En),Me=Math.floor(vt.height*En),w.isDataArrayTexture?_e=vt.depth:w.isData3DTexture?_e=Math.floor(vt.depth*En):_e=1,Fe=0,Be=0,Le=0}k!==null?(Qe=k.x,ht=k.y,Rt=k.z):(Qe=0,ht=0,Rt=0);const ft=Te.convert(F.format),De=Te.convert(F.type);let Tt;F.isData3DTexture?(Ye.setTexture3D(F,0),Tt=I.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Ye.setTexture2DArray(F,0),Tt=I.TEXTURE_2D_ARRAY):(Ye.setTexture2D(F,0),Tt=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,F.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,F.unpackAlignment);const it=I.getParameter(I.UNPACK_ROW_LENGTH),fn=I.getParameter(I.UNPACK_IMAGE_HEIGHT),As=I.getParameter(I.UNPACK_SKIP_PIXELS),pn=I.getParameter(I.UNPACK_SKIP_ROWS),Sr=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,vt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,vt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Fe),I.pixelStorei(I.UNPACK_SKIP_ROWS,Be),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Le);const bt=w.isDataArrayTexture||w.isData3DTexture,wn=F.isDataArrayTexture||F.isData3DTexture;if(w.isDepthTexture){const En=ye.get(w),Qt=ye.get(F),ln=ye.get(En.__renderTarget),Va=ye.get(Qt.__renderTarget);Ce.bindFramebuffer(I.READ_FRAMEBUFFER,ln.__webglFramebuffer),Ce.bindFramebuffer(I.DRAW_FRAMEBUFFER,Va.__webglFramebuffer);for(let Ki=0;Ki<_e;Ki++)bt&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ye.get(w).__webglTexture,O,Le+Ki),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ye.get(F).__webglTexture,ne,Rt+Ki)),I.blitFramebuffer(Fe,Be,pe,Me,Qe,ht,pe,Me,I.DEPTH_BUFFER_BIT,I.NEAREST);Ce.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ce.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(O!==0||w.isRenderTargetTexture||ye.has(w)){const En=ye.get(w),Qt=ye.get(F);Ce.bindFramebuffer(I.READ_FRAMEBUFFER,_p),Ce.bindFramebuffer(I.DRAW_FRAMEBUFFER,xp);for(let ln=0;ln<_e;ln++)bt?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,En.__webglTexture,O,Le+ln):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,En.__webglTexture,O),wn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Qt.__webglTexture,ne,Rt+ln):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Qt.__webglTexture,ne),O!==0?I.blitFramebuffer(Fe,Be,pe,Me,Qe,ht,pe,Me,I.COLOR_BUFFER_BIT,I.NEAREST):wn?I.copyTexSubImage3D(Tt,ne,Qe,ht,Rt+ln,Fe,Be,pe,Me):I.copyTexSubImage2D(Tt,ne,Qe,ht,Fe,Be,pe,Me);Ce.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ce.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else wn?w.isDataTexture||w.isData3DTexture?I.texSubImage3D(Tt,ne,Qe,ht,Rt,pe,Me,_e,ft,De,vt.data):F.isCompressedArrayTexture?I.compressedTexSubImage3D(Tt,ne,Qe,ht,Rt,pe,Me,_e,ft,vt.data):I.texSubImage3D(Tt,ne,Qe,ht,Rt,pe,Me,_e,ft,De,vt):w.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ne,Qe,ht,pe,Me,ft,De,vt.data):w.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ne,Qe,ht,vt.width,vt.height,ft,vt.data):I.texSubImage2D(I.TEXTURE_2D,ne,Qe,ht,pe,Me,ft,De,vt);I.pixelStorei(I.UNPACK_ROW_LENGTH,it),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,fn),I.pixelStorei(I.UNPACK_SKIP_PIXELS,As),I.pixelStorei(I.UNPACK_SKIP_ROWS,pn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Sr),ne===0&&F.generateMipmaps&&I.generateMipmap(Tt),Ce.unbindTexture()},this.copyTextureToTexture3D=function(w,F,z=null,k=null,O=0){return Ks('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,F,z,k,O)},this.initRenderTarget=function(w){ye.get(w).__webglFramebuffer===void 0&&Ye.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Ye.setTextureCube(w,0):w.isData3DTexture?Ye.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Ye.setTexture2DArray(w,0):Ye.setTexture2D(w,0),Ce.unbindTexture()},this.resetState=function(){A=0,P=0,D=null,Ce.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}}function md(i,e){if(e===jp)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Cl||e===Qd){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===Cl)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class Jy extends qi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new iM(t)}),this.register(function(t){return new sM(t)}),this.register(function(t){return new fM(t)}),this.register(function(t){return new pM(t)}),this.register(function(t){return new mM(t)}),this.register(function(t){return new oM(t)}),this.register(function(t){return new aM(t)}),this.register(function(t){return new cM(t)}),this.register(function(t){return new lM(t)}),this.register(function(t){return new nM(t)}),this.register(function(t){return new hM(t)}),this.register(function(t){return new rM(t)}),this.register(function(t){return new dM(t)}),this.register(function(t){return new uM(t)}),this.register(function(t){return new eM(t)}),this.register(function(t){return new gM(t)}),this.register(function(t){return new _M(t)})}load(e,t,n,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Zs.extractUrlBase(e);o=Zs.resolveURL(l,this.path)}else o=Zs.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new La(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Df){try{o[Je.KHR_BINARY_GLTF]=new xM(e)}catch(u){s&&s(u);return}r=JSON.parse(o[Je.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new LM(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case Je.KHR_MATERIALS_UNLIT:o[u]=new tM;break;case Je.KHR_DRACO_MESH_COMPRESSION:o[u]=new vM(r,this.dracoLoader);break;case Je.KHR_TEXTURE_TRANSFORM:o[u]=new yM;break;case Je.KHR_MESH_QUANTIZATION:o[u]=new MM;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function Qy(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const Je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class eM{constructor(e){this.parser=e,this.name=Je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const h=new xe(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],an);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Tf(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new vr(h),l.distance=u;break;case"spot":l=new Qg(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),fi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class tM{constructor(){this.name=Je.KHR_MATERIALS_UNLIT}getMaterialType(){return et}extendParams(e,t,n){const s=[];e.color=new xe(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],an),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,yt))}return Promise.all(s)}}class nM{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class iM{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ce(a,a)}return Promise.all(r)}}class sM{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class rM{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class oM{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new xe(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],an)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,yt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class aM{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class cM{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new xe().setRGB(a[0],a[1],a[2],an),Promise.all(r)}}class lM{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class hM{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new xe().setRGB(a[0],a[1],a[2],an),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,yt)),Promise.all(r)}}class uM{constructor(e){this.parser=e,this.name=Je.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class dM{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class fM{constructor(e){this.parser=e,this.name=Je.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class pM{constructor(e){this.parser=e,this.name=Je.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}}class mM{constructor(e){this.parser=e,this.name=Je.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}}class gM{constructor(e){this.name=Je.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,s.mode,s.filter),f})})}else return null}}class _M{constructor(e){this.name=Je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==An.TRIANGLES&&l.mode!==An.TRIANGLE_STRIP&&l.mode!==An.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(const m of u){const _=new Ve,g=new b,p=new Un,y=new b(1,1,1),S=new eg(m.geometry,m.material,d);for(let x=0;x<d;x++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,x),c.SCALE&&y.fromBufferAttribute(c.SCALE,x),S.setMatrixAt(x,_.compose(g,p,y));for(const x in c)if(x==="_COLOR_0"){const R=c[x];S.instanceColor=new Ll(R.array,R.itemSize,R.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&m.geometry.setAttribute(x,c[x]);mt.prototype.copy.call(S,m),this.parser.assignFinalMaterial(S),f.push(S)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Df="glTF",Lr=12,gd={JSON:1313821514,BIN:5130562};class xM{constructor(e){this.name=Je.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Lr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Df)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Lr,r=new DataView(e,Lr);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===gd.JSON){const l=new Uint8Array(e,Lr+o,a);this.content=n.decode(l)}else if(c===gd.BIN){const l=Lr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class vM{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const h in o){const u=Ol[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=Ol[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Js[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(f){for(const m in f.attributes){const _=f.attributes[m],g=c[m];g!==void 0&&(_.normalized=g)}u(f)},a,l,an,d)})})}}class yM{constructor(){this.name=Je.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class MM{constructor(){this.name=Je.KHR_MESH_QUANTIZATION}}class Nf extends po{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-t,u=(n-t)/h,d=u*u,f=d*u,m=e*l,_=m-l,g=-2*f+3*d,p=f-d,y=1-g,S=p-d+u;for(let x=0;x!==a;x++){const R=o[_+x+a],A=o[_+x+c]*h,P=o[m+x+a],D=o[m+x]*h;r[x]=y*R+S*A+g*P+p*D}return r}}const SM=new Un;class wM extends Nf{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return SM.fromArray(r).normalize().toArray(r),r}}const An={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Js={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},_d={9728:on,9729:vn,9984:Xd,9985:na,9986:Nr,9987:pi},xd={33071:Ni,33648:ga,10497:Gi},Rc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ol={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ci={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},EM={CUBICSPLINE:void 0,LINEAR:$r,STEP:jr},Cc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function TM(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Bt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Zn})),i.DefaultMaterial}function ts(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function fi(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function bM(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){const u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){const u=e[l];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;o.push(d)}if(s){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function AM(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function RM(i){let e;const t=i.extensions&&i.extensions[Je.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Pc(t.attributes):e=i.indices+":"+Pc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Pc(i.targets[n]);return e}function Pc(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Bl(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function CM(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const PM=new Ve;class LM{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Qy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new vh(this.options.manager):this.textureLoader=new n0(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new La(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return ts(r,a,s),fi(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Je.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){n.load(Zs.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const o=Rc[s.type],a=Js[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new Ot(l,o,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=Rc[s.type],l=Js[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0;let _,g;if(f&&f!==u){const p=Math.floor(d/f),y="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let S=t.cache.get(y);S||(_=new l(a,p*f,s.count*f/h),S=new jm(_,f/h),t.cache.add(y,S)),g=new uh(S,c,d%f/h,m)}else a===null?_=new l(s.count*c):_=new l(a,d,s.count*c),g=new Ot(_,c,m);if(s.sparse!==void 0){const p=Rc.SCALAR,y=Js[s.sparse.indices.componentType],S=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,R=new y(o[1],S,s.sparse.count*p),A=new l(o[2],x,s.sparse.count*c);a!==null&&(g=new Ot(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let P=0,D=R.length;P<D;P++){const E=R[P];if(g.setX(E,A[P*c]),c>=2&&g.setY(E,A[P*c+1]),c>=3&&g.setZ(E,A[P*c+2]),c>=4&&g.setW(E,A[P*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=_d[d.magFilter]||vn,h.minFilter=_d[d.minFilter]||pi,h.wrapS=xd[d.wrapS]||Gi,h.wrapT=xd[d.wrapT]||Gi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==on&&h.minFilter!==vn,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=s.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let m=d;t.isImageBitmapLoader===!0&&(m=function(_){const g=new qt(_);g.needsUpdate=!0,d(g)}),t.load(Zs.resolveURL(u,r.path),m,void 0,f)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),fi(u,o),u.userData.mimeType=o.mimeType||CM(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[Je.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Je.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[Je.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new us,yn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Hi,yn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Bt}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let o;const a={},c=r.extensions||{},l=[];if(c[Je.KHR_MATERIALS_UNLIT]){const u=s[Je.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new xe(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],an),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,yt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=It);const h=r.alphaMode||Cc.OPAQUE;if(h===Cc.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Cc.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==et&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ce(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==et&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==et){const u=r.emissiveFactor;a.emissive=new xe().setRGB(u[0],u[1],u[2],an)}return r.emissiveTexture!==void 0&&o!==et&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,yt)),Promise.all(l).then(function(){const u=new o(a);return r.name&&(u.name=r.name),fi(u,r),t.associations.set(u,{materials:e}),r.extensions&&ts(s,u,r),u})}createUniqueName(e){const t=lt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[Je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return vd(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],h=RM(l),u=s[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[Je.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=vd(new xt,l,t),s[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const h=o[c].material===void 0?TM(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,m=h.length;f<m;f++){const _=h[f],g=o[f];let p;const y=l[f];if(g.mode===An.TRIANGLES||g.mode===An.TRIANGLE_STRIP||g.mode===An.TRIANGLE_FAN||g.mode===void 0)p=r.isSkinnedMesh===!0?new Zm(_,y):new j(_,y),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===An.TRIANGLE_STRIP?p.geometry=md(p.geometry,Qd):g.mode===An.TRIANGLE_FAN&&(p.geometry=md(p.geometry,Cl));else if(g.mode===An.LINES)p=new Jr(_,y);else if(g.mode===An.LINE_STRIP)p=new Ca(_,y);else if(g.mode===An.LINE_LOOP)p=new sg(_,y);else if(g.mode===An.POINTS)p=new Hr(_,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&AM(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),fi(p,r),g.extensions&&ts(s,p,g),t.assignFinalMaterial(p),u.push(p)}for(let f=0,m=u.length;f<m;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&ts(s,u[0],r),u[0];const d=new st;r.extensions&&ts(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,m=u.length;f<m;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new sn(Ae.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Mh(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),fi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){const u=o[l];if(u){a.push(u);const d=new Ve;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new dh(a,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){const f=s.channels[u],m=s.samplers[f.sampler],_=f.target,g=_.node,p=s.parameters!==void 0?s.parameters[m.input]:m.input,y=s.parameters!==void 0?s.parameters[m.output]:m.output;_.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",y)),l.push(m),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],m=u[2],_=u[3],g=u[4],p=[];for(let y=0,S=d.length;y<S;y++){const x=d[y],R=f[y],A=m[y],P=_[y],D=g[y];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const E=n._createAnimationTracks(x,R,A,P,D);if(E)for(let T=0;T<E.length;T++)p.push(E[T])}return new Xg(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,PM)});for(let f=0,m=u.length;f<m;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new hf:l.length>1?h=new st:l.length===1?h=l[0]:h=new mt,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),fi(h,r),r.extensions&&ts(n,h,r),r.matrix!==void 0){const u=new Ve;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new st;n.name&&(r.name=s.createUniqueName(n.name)),fi(r,n),n.extensions&&ts(t,r,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);const l=h=>{const u=new Map;for(const[d,f]of s.associations)(d instanceof yn||d instanceof qt)&&u.set(d,f);return h.traverse(d=>{const f=s.associations.get(d);f!=null&&u.set(d,f)}),u};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const o=[],a=e.name?e.name:e.uuid,c=[];Ci[r.path]===Ci.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(Ci[r.path]){case Ci.weights:l=cr;break;case Ci.rotation:l=lr;break;case Ci.translation:case Ci.scale:l=hr;break;default:n.itemSize===1?l=cr:l=hr;break}const h=s.interpolation!==void 0?EM[s.interpolation]:$r,u=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const m=new l(c[d]+"."+Ci[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),o.push(m)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Bl(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof lr?wM:Nf;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function IM(i,e,t){const n=e.attributes,s=new Sn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new b(c[0],c[1],c[2]),new b(l[0],l[1],l[2])),a.normalized){const h=Bl(Js[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new b,c=new b;for(let l=0,h=r.length;l<h;l++){const u=r[l];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){const _=Bl(Js[d.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;const o=new ei;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function vd(i,e,t){const n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(const o in n){const a=Ol[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return Ze.workingColorSpace!==an&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ze.workingColorSpace}" not supported.`),fi(i,e),IM(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?bM(i,e.targets,t):i})}class DM extends qi{constructor(e){super(e)}load(e,t,n,s){const r=this,o=this.path===""?Zs.extractUrlBase(e):this.path,a=new La(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(c){try{t(r.parse(c,o))}catch(l){s?s(l):console.error(l),r.manager.itemError(e)}},n,s)}setMaterialOptions(e){return this.materialOptions=e,this}parse(e,t){const n=e.split(`
`);let s={};const r=/\s+/,o={};for(let c=0;c<n.length;c++){let l=n[c];if(l=l.trim(),l.length===0||l.charAt(0)==="#")continue;const h=l.indexOf(" ");let u=h>=0?l.substring(0,h):l;u=u.toLowerCase();let d=h>=0?l.substring(h+1):"";if(d=d.trim(),u==="newmtl")s={name:d},o[d]=s;else if(u==="ka"||u==="kd"||u==="ks"||u==="ke"){const f=d.split(r,3);s[u]=[parseFloat(f[0]),parseFloat(f[1]),parseFloat(f[2])]}else s[u]=d}const a=new NM(this.resourcePath||t,this.materialOptions);return a.setCrossOrigin(this.crossOrigin),a.setManager(this.manager),a.setMaterials(o),a}}class NM{constructor(e="",t={}){this.baseUrl=e,this.options=t,this.materialsInfo={},this.materials={},this.materialsArray=[],this.nameLookup={},this.crossOrigin="anonymous",this.side=this.options.side!==void 0?this.options.side:Zn,this.wrap=this.options.wrap!==void 0?this.options.wrap:Gi}setCrossOrigin(e){return this.crossOrigin=e,this}setManager(e){this.manager=e}setMaterials(e){this.materialsInfo=this.convert(e),this.materials={},this.materialsArray=[],this.nameLookup={}}convert(e){if(!this.options)return e;const t={};for(const n in e){const s=e[n],r={};t[n]=r;for(const o in s){let a=!0,c=s[o];const l=o.toLowerCase();switch(l){case"kd":case"ka":case"ks":this.options&&this.options.normalizeRGB&&(c=[c[0]/255,c[1]/255,c[2]/255]),this.options&&this.options.ignoreZeroRGBs&&c[0]===0&&c[1]===0&&c[2]===0&&(a=!1);break}a&&(r[l]=c)}}return t}preload(){for(const e in this.materialsInfo)this.create(e)}getIndex(e){return this.nameLookup[e]}getAsArray(){let e=0;for(const t in this.materialsInfo)this.materialsArray[e]=this.create(t),this.nameLookup[t]=e,e++;return this.materialsArray}create(e){return this.materials[e]===void 0&&this.createMaterial_(e),this.materials[e]}createMaterial_(e){const t=this,n=this.materialsInfo[e],s={name:e,side:this.side};function r(a,c){return typeof c!="string"||c===""?"":/^https?:\/\//i.test(c)?c:a+c}function o(a,c){if(s[a])return;const l=t.getTextureParams(c,s),h=t.loadTexture(r(t.baseUrl,l.url));h.repeat.copy(l.scale),h.offset.copy(l.offset),h.wrapS=t.wrap,h.wrapT=t.wrap,(a==="map"||a==="emissiveMap")&&(h.colorSpace=yt),s[a]=h}for(const a in n){const c=n[a];let l;if(c!=="")switch(a.toLowerCase()){case"kd":s.color=Ze.colorSpaceToWorking(new xe().fromArray(c),yt);break;case"ks":s.specular=Ze.colorSpaceToWorking(new xe().fromArray(c),yt);break;case"ke":s.emissive=Ze.colorSpaceToWorking(new xe().fromArray(c),yt);break;case"map_kd":o("map",c);break;case"map_ks":o("specularMap",c);break;case"map_ke":o("emissiveMap",c);break;case"norm":o("normalMap",c);break;case"map_bump":case"bump":o("bumpMap",c);break;case"disp":o("displacementMap",c);break;case"map_d":o("alphaMap",c),s.transparent=!0;break;case"ns":s.shininess=parseFloat(c);break;case"d":l=parseFloat(c),l<1&&(s.opacity=l,s.transparent=!0);break;case"tr":l=parseFloat(c),this.options&&this.options.invertTrProperty&&(l=1-l),l>0&&(s.opacity=1-l,s.transparent=!0);break}}return this.materials[e]=new xh(s),this.materials[e]}getTextureParams(e,t){const n={scale:new ce(1,1),offset:new ce(0,0)},s=e.split(/\s+/);let r;return r=s.indexOf("-bm"),r>=0&&(t.bumpScale=parseFloat(s[r+1]),s.splice(r,2)),r=s.indexOf("-mm"),r>=0&&(t.displacementBias=parseFloat(s[r+1]),t.displacementScale=parseFloat(s[r+2]),s.splice(r,3)),r=s.indexOf("-s"),r>=0&&(n.scale.set(parseFloat(s[r+1]),parseFloat(s[r+2])),s.splice(r,4)),r=s.indexOf("-o"),r>=0&&(n.offset.set(parseFloat(s[r+1]),parseFloat(s[r+2])),s.splice(r,4)),n.url=s.join(" ").trim(),n}loadTexture(e,t,n,s,r){const o=this.manager!==void 0?this.manager:Ef;let a=o.getHandler(e);a===null&&(a=new vh(o)),a.setCrossOrigin&&a.setCrossOrigin(this.crossOrigin);const c=a.load(e,n,s,r);return t!==void 0&&(c.mapping=t),c}}const UM=/^[og]\s*(.+)?/,FM=/^mtllib /,OM=/^usemtl /,BM=/^usemap /,yd=/\s+/,Md=new b,Lc=new b,Sd=new b,wd=new b,bn=new b,Jo=new xe;function zM(){const i={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=t!==!1;return}const n=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:t!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(s,r){const o=this._finalize(!1);o&&(o.inherited||o.groupCount<=0)&&this.materials.splice(o.index,1);const a={index:this.materials.length,name:s||"",mtllib:Array.isArray(r)&&r.length>0?r[r.length-1]:"",smooth:o!==void 0?o.smooth:this.smooth,groupStart:o!==void 0?o.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(c){const l={index:typeof c=="number"?c:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return l.clone=this.clone.bind(l),l}};return this.materials.push(a),a},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(s){const r=this.currentMaterial();if(r&&r.groupEnd===-1&&(r.groupEnd=this.geometry.vertices.length/3,r.groupCount=r.groupEnd-r.groupStart,r.inherited=!1),s&&this.materials.length>1)for(let o=this.materials.length-1;o>=0;o--)this.materials[o].groupCount<=0&&this.materials.splice(o,1);return s&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),r}},n&&n.name&&typeof n.clone=="function"){const s=n.clone(0);s.inherited=!0,this.object.materials.push(s)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseNormalIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseUVIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/2)*2},addVertex:function(e,t,n){const s=this.vertices,r=this.object.geometry.vertices;r.push(s[e+0],s[e+1],s[e+2]),r.push(s[t+0],s[t+1],s[t+2]),r.push(s[n+0],s[n+1],s[n+2])},addVertexPoint:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,n){const s=this.normals,r=this.object.geometry.normals;r.push(s[e+0],s[e+1],s[e+2]),r.push(s[t+0],s[t+1],s[t+2]),r.push(s[n+0],s[n+1],s[n+2])},addFaceNormal:function(e,t,n){const s=this.vertices,r=this.object.geometry.normals;Md.fromArray(s,e),Lc.fromArray(s,t),Sd.fromArray(s,n),bn.subVectors(Sd,Lc),wd.subVectors(Md,Lc),bn.cross(wd),bn.normalize(),r.push(bn.x,bn.y,bn.z),r.push(bn.x,bn.y,bn.z),r.push(bn.x,bn.y,bn.z)},addColor:function(e,t,n){const s=this.colors,r=this.object.geometry.colors;s[e]!==void 0&&r.push(s[e+0],s[e+1],s[e+2]),s[t]!==void 0&&r.push(s[t+0],s[t+1],s[t+2]),s[n]!==void 0&&r.push(s[n+0],s[n+1],s[n+2])},addUV:function(e,t,n){const s=this.uvs,r=this.object.geometry.uvs;r.push(s[e+0],s[e+1]),r.push(s[t+0],s[t+1]),r.push(s[n+0],s[n+1])},addDefaultUV:function(){const e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){const t=this.uvs;this.object.geometry.uvs.push(t[e+0],t[e+1])},addFace:function(e,t,n,s,r,o,a,c,l){const h=this.vertices.length;let u=this.parseVertexIndex(e,h),d=this.parseVertexIndex(t,h),f=this.parseVertexIndex(n,h);if(this.addVertex(u,d,f),this.addColor(u,d,f),a!==void 0&&a!==""){const m=this.normals.length;u=this.parseNormalIndex(a,m),d=this.parseNormalIndex(c,m),f=this.parseNormalIndex(l,m),this.addNormal(u,d,f)}else this.addFaceNormal(u,d,f);if(s!==void 0&&s!==""){const m=this.uvs.length;u=this.parseUVIndex(s,m),d=this.parseUVIndex(r,m),f=this.parseUVIndex(o,m),this.addUV(u,d,f),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";const t=this.vertices.length;for(let n=0,s=e.length;n<s;n++){const r=this.parseVertexIndex(e[n],t);this.addVertexPoint(r),this.addColor(r)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";const n=this.vertices.length,s=this.uvs.length;for(let r=0,o=e.length;r<o;r++)this.addVertexLine(this.parseVertexIndex(e[r],n));for(let r=0,o=t.length;r<o;r++)this.addUVLine(this.parseUVIndex(t[r],s))}};return i.startObject("",!1),i}class kM extends qi{constructor(e){super(e),this.materials=null}load(e,t,n,s){const r=this,o=new La(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{t(r.parse(a))}catch(c){s?s(c):console.error(c),r.manager.itemError(e)}},n,s)}setMaterials(e){return this.materials=e,this}parse(e){const t=new zM;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));const n=e.split(`
`);let s=[];for(let a=0,c=n.length;a<c;a++){const l=n[a].trimStart();if(l.length===0)continue;const h=l.charAt(0);if(h!=="#")if(h==="v"){const u=l.split(yd);switch(u[0]){case"v":t.vertices.push(parseFloat(u[1]),parseFloat(u[2]),parseFloat(u[3])),u.length>=7?(Jo.setRGB(parseFloat(u[4]),parseFloat(u[5]),parseFloat(u[6]),yt),t.colors.push(Jo.r,Jo.g,Jo.b)):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(u[1]),parseFloat(u[2]),parseFloat(u[3]));break;case"vt":t.uvs.push(parseFloat(u[1]),parseFloat(u[2]));break}}else if(h==="f"){const d=l.slice(1).trim().split(yd),f=[];for(let _=0,g=d.length;_<g;_++){const p=d[_];if(p.length>0){const y=p.split("/");f.push(y)}}const m=f[0];for(let _=1,g=f.length-1;_<g;_++){const p=f[_],y=f[_+1];t.addFace(m[0],p[0],y[0],m[1],p[1],y[1],m[2],p[2],y[2])}}else if(h==="l"){const u=l.substring(1).trim().split(" ");let d=[];const f=[];if(l.indexOf("/")===-1)d=u;else for(let m=0,_=u.length;m<_;m++){const g=u[m].split("/");g[0]!==""&&d.push(g[0]),g[1]!==""&&f.push(g[1])}t.addLineGeometry(d,f)}else if(h==="p"){const d=l.slice(1).trim().split(" ");t.addPointGeometry(d)}else if((s=UM.exec(l))!==null){const u=(" "+s[0].slice(1).trim()).slice(1);t.startObject(u)}else if(OM.test(l))t.object.startMaterial(l.substring(7).trim(),t.materialLibraries);else if(FM.test(l))t.materialLibraries.push(l.substring(7).trim());else if(BM.test(l))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(h==="s"){if(s=l.split(" "),s.length>1){const d=s[1].trim().toLowerCase();t.object.smooth=d!=="0"&&d!=="off"}else t.object.smooth=!0;const u=t.object.currentMaterial();u&&(u.smooth=t.object.smooth)}else{if(l==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+l+'"')}}t.finalize();const r=new st;if(r.materialLibraries=[].concat(t.materialLibraries),!(t.objects.length===1&&t.objects[0].geometry.vertices.length===0)===!0)for(let a=0,c=t.objects.length;a<c;a++){const l=t.objects[a],h=l.geometry,u=l.materials,d=h.type==="Line",f=h.type==="Points";let m=!1;if(h.vertices.length===0)continue;const _=new xt;_.setAttribute("position",new ze(h.vertices,3)),h.normals.length>0&&_.setAttribute("normal",new ze(h.normals,3)),h.colors.length>0&&(m=!0,_.setAttribute("color",new ze(h.colors,3))),h.hasUVIndices===!0&&_.setAttribute("uv",new ze(h.uvs,2));const g=[];for(let y=0,S=u.length;y<S;y++){const x=u[y],R=x.name+"_"+x.smooth+"_"+m;let A=t.materials[R];if(this.materials!==null){if(A=this.materials.create(x.name),d&&A&&!(A instanceof Hi)){const P=new Hi;yn.prototype.copy.call(P,A),P.color.copy(A.color),A=P}else if(f&&A&&!(A instanceof us)){const P=new us({size:10,sizeAttenuation:!1});yn.prototype.copy.call(P,A),P.color.copy(A.color),P.map=A.map,A=P}}A===void 0&&(d?A=new Hi:f?A=new us({size:1,sizeAttenuation:!1}):A=new xh,A.name=x.name,A.flatShading=!x.smooth,A.vertexColors=m,t.materials[R]=A),g.push(A)}let p;if(g.length>1){for(let y=0,S=u.length;y<S;y++){const x=u[y];_.addGroup(x.groupStart,x.groupCount,y)}d?p=new Jr(_,g):f?p=new Hr(_,g):p=new j(_,g)}else d?p=new Jr(_,g[0]):f?p=new Hr(_,g[0]):p=new j(_,g[0]);p.name=l.name,r.add(p)}else if(t.vertices.length>0){const a=new us({size:1,sizeAttenuation:!1}),c=new xt;c.setAttribute("position",new ze(t.vertices,3)),t.colors.length>0&&t.colors[0]!==void 0&&(c.setAttribute("color",new ze(t.colors,3)),a.vertexColors=!0);const l=new Hr(c,a);r.add(l)}return r}}const Ic={vehicle:{model:"./assets/rigged/vehicles/kenney-suv.glb",wheelNodes:["wheel-back-left","wheel-back-right","wheel-front-left","wheel-front-right"]}},Ed="./assets/rigged/racekart-hilly",Nt=(i,e)=>({obj:`${Ed}/${i}.obj`,mtl:`${Ed}/${i}.mtl`,category:e}),so={terrainFlat:Nt("Terrain_Grass_Flat_1x1","terrain"),terrainHillSide:Nt("Terrain_Hill_Side_1x3","terrain"),terrainHillCorner:Nt("Terrain_Hill_Corner_Outer_4x4","terrain"),trackStraight:Nt("Track_Standard_Straight_Double","track"),trackStraightStriped:Nt("Track_Striped_Straight_Double","track"),trackCurve:Nt("Track_Standard_Curve_Double_4x4","track"),trackCurveStriped:Nt("Track_Striped_Curve_Double_4x4","track"),trackBank:Nt("Track_Standard_Incline_Double","track"),trackBankStriped:Nt("Track_Striped_Incline_Double","track"),bridgeStart:Nt("Track_Bridge_Start","bridge"),bridgeIncline:Nt("Track_Bridge_Incline_Gentle_Supported","bridge"),bridgeFlat:Nt("Track_Bridge_Flat_Supported","bridge"),bridgeCurve:Nt("Track_Bridge_Curve_3x3","bridge"),stuntRamp:Nt("Prop_Track_Ramp","stunt"),stuntRailing:Nt("Prop_Track_Ramp_Railing","stunt"),trackArch:Nt("Prop_Track_Arch_1x4","prop"),fence:Nt("Prop_Decorative_Fence_Railing","prop"),rockWide:Nt("Prop_Decorative_Rock_2","prop"),rockTall:Nt("Prop_Decorative_Rock_5","prop"),hayBale:Nt("Prop_Decorative_Hay_Bale_Box","prop")},_n=Math.PI/2,Td=Math.PI,Ma={dustring:{id:"dustring",name:"Dust Ring",callsign:"LEVEL 01 // SCRAP RING",description:"One clean combat loop with an open center, four readable jumps, and room to hunt the rival.",difficulty:"COMBAT READY",arenaKind:"ring",radius:100,ringInnerRadius:60,ringOuterRadius:88,spawn:{x:0,z:-74,heading:0},opponentSpawn:{x:0,z:74,heading:Td},objective:"Run the circuit. Hit the ramps. Scrap the rival.",surfaces:[{asset:"stuntRamp",kind:"ramp",x:0,z:-57,rotation:0,width:12,length:22,startHeight:0,endHeight:4.8,scale:11,assetYaw:_n,label:"south inward ramp"},{asset:"stuntRamp",kind:"ramp",x:0,z:57,rotation:0,width:12,length:22,startHeight:0,endHeight:4.8,scale:11,assetYaw:_n,label:"north outward ramp"},{asset:"stuntRamp",kind:"ramp",x:-57,z:0,rotation:-_n,width:12,length:22,startHeight:0,endHeight:4.8,scale:11,assetYaw:_n,label:"west outward ramp"},{asset:"stuntRamp",kind:"ramp",x:57,z:0,rotation:-_n,width:12,length:22,startHeight:0,endHeight:4.8,scale:11,assetYaw:_n,label:"east inward ramp"}],track:[],terrain:[],props:[{asset:"rockWide",x:-23,z:19,rotation:.25,scale:5.2,label:"center west rock"},{asset:"rockTall",x:-18,z:-18,rotation:-.4,scale:4.2,label:"center south rock"},{asset:"hayBale",x:18,z:-24,rotation:.15,scale:3.8,label:"center hay one"},{asset:"hayBale",x:23,z:-24,rotation:-.12,scale:3.8,label:"center hay two"}],barriers:[{x:31,z:-21,rotation:_n,length:19},{x:31,z:21,rotation:_n,length:19},{x:-8,z:31,rotation:0,length:13},{x:-31,z:-4,rotation:_n,length:13}],targets:[],pickups:[{x:-73,z:-22,kind:"tires"},{x:73,z:24,kind:"engine"},{x:-24,z:73,kind:"weapon"},{x:24,z:-73,kind:"armor"},{x:-7,z:-38,kind:"repair"}]},ovalbowl:{id:"ovalbowl",name:"Capsule Circuit",callsign:"ARENA 02 // CAPSULE WALL-RIDE",description:"A flat capsule stadium with long straights, rounded ends, a layered bank, and a hard upper guard.",difficulty:"WALL RIDE READY",arenaKind:"capsule",radius:112,ringInnerRadius:44,ringOuterRadius:62,bowl:{straightHalfLength:46,flatRadius:44,outerRadius:62,wallRise:11.5,guardHeight:4.5},spawn:{x:0,z:-22,heading:0},opponentSpawn:{x:0,z:22,heading:Td},objective:"Own the open floor. Carry speed into the bank. Scrap the rival.",surfaces:[],track:[],terrain:[],props:[{asset:"stuntRailing",x:-63.2,z:-17,rotation:_n,scale:8,label:"west rim racing rail south"},{asset:"stuntRailing",x:-63.2,z:17,rotation:_n,scale:8,label:"west rim racing rail north"},{asset:"stuntRailing",x:63.2,z:-17,rotation:_n,scale:8,label:"east rim racing rail south"},{asset:"stuntRailing",x:63.2,z:17,rotation:_n,scale:8,label:"east rim racing rail north"}],barriers:[],targets:[],pickups:[{x:-20,z:-18,kind:"tires"},{x:20,z:18,kind:"engine"},{x:0,z:30,kind:"weapon"},{x:0,z:-35,kind:"repair"}]}},Uf="dustring",HM=new b(0,-1,0);function VM(i,e){i.updateWorldMatrix(!0,!0);const t=new Sn().setFromObject(i),n=e.sampleSpacing??1.15,s=Ae.clamp(Math.ceil(e.width/n)+1,3,49),r=Ae.clamp(Math.ceil(e.length/n)+1,3,49),o=new Float32Array(s*r),a=new Uint8Array(s*r),c=new bf,l=Math.cos(e.rotation),h=Math.sin(e.rotation),u=t.max.y+2,d=Math.max(8,t.max.y-t.min.y+4),f=e.width*.995,m=e.length*.995;for(let _=0;_<r;_++){const g=-m*.5+_/(r-1)*m;for(let p=0;p<s;p++){const y=-f*.5+p/(s-1)*f,S=e.centerX+y*l+g*h,x=e.centerZ-y*h+g*l;c.set(new b(S,u,x),HM),c.far=d;const R=c.intersectObject(i,!0)[0],A=_*s+p;R&&(o[A]=R.point.y,a[A]=1)}}return{label:e.label,center:new ce(e.centerX,e.centerZ),rotation:e.rotation,width:e.width,length:e.length,columns:s,rows:r,heights:o,valid:a,metadata:e.metadata}}function GM(i,e,t){const n=e-i.center.x,s=t-i.center.y,r=Math.cos(i.rotation),o=Math.sin(i.rotation),a=n*r-s*o,c=n*o+s*r,l=a/i.width+.5,h=c/i.length+.5;if(l<0||l>1||h<0||h>1)return null;const u=l*(i.columns-1),d=h*(i.rows-1),f=Math.min(Math.floor(u),i.columns-2),m=Math.min(Math.floor(d),i.rows-2),_=u-f,g=d-m,p=[[m*i.columns+f,(1-_)*(1-g)],[m*i.columns+f+1,_*(1-g)],[(m+1)*i.columns+f,(1-_)*g],[(m+1)*i.columns+f+1,_*g]];let y=0,S=0;for(const[x,R]of p)i.valid[x]&&(y+=i.heights[x]*R,S+=R);return S>.24?y/S:null}function WM(i,e){const t=[],n=Math.cos(i.rotation),s=Math.sin(i.rotation),r=(h,u)=>{const d=-i.width*.5+h/(i.columns-1)*i.width,f=-i.length*.5+u/(i.rows-1)*i.length,m=i.center.x+d*n+f*s,_=i.center.y-d*s+f*n;return[m,i.heights[u*i.columns+h]+.055,_]},o=(h,u,d,f)=>{const m=u*i.columns+h,_=f*i.columns+d;!i.valid[m]||!i.valid[_]||t.push(...r(h,u),...r(d,f))};for(let h=0;h<i.rows;h++)for(let u=0;u<i.columns;u++)u+1<i.columns&&o(u,h,u+1,h),h+1<i.rows&&o(u,h,u,h+1);const a=new xt;a.setAttribute("position",new ze(t,3));const c=new Hi({color:e,transparent:!0,opacity:.9,depthTest:!1}),l=new Jr(a,c);return l.name=`heightfield-debug-${i.label}`,l.renderOrder=20,l.visible=!1,l}const XM=(i,e)=>Math.sin(i*.075)*Math.cos(e*.058)*.035,Dc=i=>i*i*(3-2*i),Nc=i=>6*i*(1-i);function qM(i,e,t){if(i<=0)return{height:0,slope:0,band:"floor"};if(i<.28){const s=i/.28;return{height:t*.14*Dc(s),slope:t*.14*Nc(s)/(.28*e),band:"transition"}}if(i<.78){const s=(i-.28)/.5;return{height:t*(.14+.66*Dc(s)),slope:t*.66*Nc(s)/(.5*e),band:"bank"}}const n=(i-.78)/.22;return{height:t*(.8+.2*Dc(n)),slope:t*.2*Nc(n)/(.22*e),band:"upper-bank"}}function Ft(i,e,t){const n=Ae.clamp(t,-i.straightHalfLength,i.straightHalfLength),s=e,r=t-n,o=Math.hypot(s,r),a=o>1e-4?s/o:1,c=o>1e-4?r/o:0,l=i.outerRadius-i.flatRadius,h=Ae.clamp((o-i.flatRadius)/l,0,1),u=qM(h,l,i.wallRise),d=1-Ae.smoothstep(o,i.flatRadius-8,i.flatRadius),f=XM(e,t)*d+u.height,m=u.slope,_=new b(-a*m,1,-c*m).normalize();return{height:f,distance:o,progress:h,anchorZ:n,outwardX:a,outwardZ:c,normal:_,band:u.band}}function Ff(i,e,t,n,s,r){let o=e,a=t,c=!1,l=0,h=0,u=0;const d=i.outerRadius-r-.12;for(let f=0;f<3;f++){let m=0,_=0,g=0;for(const p of[-s,0,s]){const y=o+Math.sin(n)*p,S=a+Math.cos(n)*p,x=Ft(i,y,S),R=x.distance-d;R<=m||(m=R,_=x.outwardX,g=x.outwardZ)}if(m<=0)break;o-=_*(m+.015),a-=g*(m+.015),c=!0,l=_,h=g,u=Math.max(u,m)}return{x:o,z:a,collided:c,normalX:l,normalZ:h,penetration:u}}function Th(i,e,t=48,n=40){const s=[];for(let r=0;r<t;r++){const o=r/t*Math.PI;s.push(new ce(Math.cos(o)*i,e+Math.sin(o)*i))}for(let r=0;r<n;r++){const o=r/n;s.push(new ce(-i,Ae.lerp(e,-e,o)))}for(let r=0;r<t;r++){const o=Math.PI+r/t*Math.PI;s.push(new ce(Math.cos(o)*i,-e+Math.sin(o)*i))}for(let r=0;r<n;r++){const o=r/n;s.push(new ce(i,Ae.lerp(-e,e,o)))}return s}function Of(i,e){i.setAttribute("color",new ze(e,3));const t=i.getAttribute("position"),n=new Float32Array(t.count*2);for(let s=0;s<t.count;s++)n[s*2]=t.getX(s)/7.5,n[s*2+1]=t.getZ(s)/7.5;i.setAttribute("uv",new ze(n,2)),i.computeVertexNormals(),i.computeBoundingSphere()}function YM(i){const e=Th(i.flatRadius,i.straightHalfLength),t=[],n=[],s=new xe(12429711),r=new xe(14796193),o=new xe;for(const h of e){const u=Ft(i,h.x,h.y).height;t.push(h.x,u,h.y);const d=Ae.clamp(.48+Math.sin(h.x*.13+h.y*.09)*.12,0,1);o.copy(s).lerp(r,d).toArray(n,n.length)}const a=$s.triangulateShape(e,[]),c=[];for(const[h,u,d]of a)c.push(h,d,u);const l=new xt;return l.setAttribute("position",new ze(t,3)),l.setIndex(c),Of(l,n),l}function KM(i,e=30){const t=[];for(let d=0;d<=e;d++){const f=Ae.lerp(i.flatRadius,i.outerRadius,d/e);t.push(Th(f,i.straightHalfLength))}const n=t[0].length,s=[],r=[],o=new xe(12764608),a=new xe(7764856),c=new xe(12020290),l=new xe;for(let d=0;d<t.length;d++){const f=d/e;for(const m of t[d])s.push(m.x,Ft(i,m.x,m.y).height,m.y),l.copy(o).lerp(a,f),(f>.28&&f<.32||f>.76&&f<.8)&&l.lerp(c,.68),l.toArray(r,r.length)}const h=[];for(let d=0;d<e;d++)for(let f=0;f<n;f++){const m=(f+1)%n,_=d*n+f,g=d*n+m,p=(d+1)*n+f,y=(d+1)*n+m;h.push(_,g,p,g,y,p)}const u=new xt;return u.setAttribute("position",new ze(s,3)),u.setIndex(h),Of(u,r),u}function jM(i){const e=Th(i.outerRadius,i.straightHalfLength),t=[],n=[],s=[],r=[0];for(let a=1;a<=e.length;a++)r.push(r[a-1]+e[(a-1)%e.length].distanceTo(e[a%e.length]));for(let a=0;a<e.length;a++){const c=e[a],l=Ft(i,c.x,c.y).height;t.push(c.x,l-.08,c.y),t.push(c.x,l+i.guardHeight,c.y);const h=r[a]/7.5;n.push(h,0,h,i.guardHeight/7.5)}for(let a=0;a<e.length;a++){const c=(a+1)%e.length,l=a*2,h=l+1,u=c*2,d=u+1;s.push(l,h,u,u,h,d)}const o=new xt;return o.setAttribute("position",new ze(t,3)),o.setAttribute("uv",new ze(n,2)),o.setIndex(s),o.computeVertexNormals(),o.computeBoundingSphere(),o}const Qo=11.5,ea=6.3,bd=2.6,Ad=4.5;class $M{mode="chase";camera;desiredPosition=new b;desiredLook=new b;smoothedLook=new b;forward=new b;toEnemy=new b;orbitYaw=0;followDistance=Qo;followHeight=ea;initialized=!1;constructor(e){this.camera=e}toggle(e){return this.mode==="enemy"?(this.mode="chase",{mode:this.mode,noTarget:!1}):e?(this.mode="enemy",{mode:this.mode,noTarget:!1}):{mode:this.mode,noTarget:!0}}snapToChase(e,t,n){this.orbitYaw=t,this.followDistance=Qo,this.followHeight=ea,this.forward.set(Math.sin(t),0,Math.cos(t)),this.camera.position.copy(e).addScaledVector(this.forward,-Qo),this.camera.position.y=Math.max(e.y+ea,n(this.camera.position.x,this.camera.position.z)+bd),this.smoothedLook.copy(e).addScaledVector(this.forward,4),this.smoothedLook.y=e.y+1.2,this.camera.lookAt(this.smoothedLook),this.initialized=!0}update(e){const t=Ae.clamp(e.dt,0,.03333333333333333);let n=!1;this.mode==="enemy"&&(!e.enemyAvailable||!e.enemyPosition)&&(this.mode="chase",n=!0),this.forward.set(Math.sin(e.playerHeading),0,Math.cos(e.playerHeading));let s=null;if(this.mode==="enemy"&&e.enemyPosition){if(this.toEnemy.copy(e.enemyPosition).sub(e.playerPosition),this.toEnemy.y=0,s=this.toEnemy.length(),s>.75){const c=Math.atan2(this.toEnemy.x,this.toEnemy.z),l=Math.atan2(Math.sin(c-this.orbitYaw),Math.cos(c-this.orbitYaw));this.orbitYaw+=l*this.response(5.4,t)}const r=Ae.clamp(8.9+s*.105,9.5,14.5),o=Ae.clamp(6.4+s*.035,6.4,9.2);this.followDistance=Ae.lerp(this.followDistance,r,this.response(4.2,t)),this.followHeight=Ae.lerp(this.followHeight,o,this.response(4.2,t)),this.forward.set(Math.sin(this.orbitYaw),0,Math.cos(this.orbitYaw)),this.desiredPosition.copy(e.playerPosition).addScaledVector(this.forward,-this.followDistance),this.desiredPosition.y=e.playerPosition.y+this.followHeight;const a=Ae.clamp(.36+s*.002,.36,.54);this.desiredLook.lerpVectors(e.playerPosition,e.enemyPosition,a),this.desiredLook.y+=1.25}else this.orbitYaw=e.playerHeading,this.followDistance=Ae.lerp(this.followDistance,Qo,this.response(4.8,t)),this.followHeight=Ae.lerp(this.followHeight,ea,this.response(4.8,t)),this.desiredPosition.copy(e.playerPosition).addScaledVector(this.forward,-this.followDistance),this.desiredPosition.y=e.playerPosition.y+this.followHeight,this.desiredLook.copy(e.playerPosition).addScaledVector(this.forward,4),this.desiredLook.y=e.playerPosition.y+1.2;return e.shake&&this.desiredPosition.add(e.shake),this.constrainToArena(this.desiredPosition,e.bounds),this.desiredPosition.y=Math.max(this.desiredPosition.y,e.groundHeight(this.desiredPosition.x,this.desiredPosition.z)+bd),this.initialized||this.snapToChase(e.playerPosition,e.playerHeading,e.groundHeight),this.camera.position.lerp(this.desiredPosition,this.response(6.5,t)),this.smoothedLook.lerp(this.desiredLook,this.response(8.5,t)),this.camera.up.set(0,1,0),this.camera.lookAt(this.smoothedLook),{mode:this.mode,fellBackToChase:n,targetDistance:s}}get lookAt(){return this.smoothedLook}response(e,t){return 1-Math.exp(-e*t)}constrainToArena(e,t){if(t.kind==="ring"){const c=Math.max(1,t.radius-Ad),l=Math.hypot(e.x,e.z);l>c&&(e.x*=c/l,e.z*=c/l);return}const n=Ae.clamp(e.z,-t.straightHalfLength,t.straightHalfLength),s=e.x,r=e.z-n,o=Math.hypot(s,r),a=Math.max(1,t.outerRadius-Ad);o<=a||(e.x=s*a/o,e.z=n+r*a/o)}}const U=Et("game"),$e={health:Et("health-value"),healthBar:Et("health-bar"),boost:Et("boost-value"),boostBar:Et("boost-bar"),boostMeter:document.querySelector(".status-meter--boost"),weapon:Et("weapon-part"),weaponState:Et("weapon-state"),message:Et("message"),controls:Et("controls"),pause:Et("pause"),debug:Et("physics-debug"),levelSelect:Et("level-select"),round:Et("round-value"),playerRounds:Et("player-rounds"),enemyRounds:Et("enemy-rounds"),countdown:Et("round-countdown"),countdownValue:Et("round-countdown-value"),countdownArena:Et("round-countdown-arena"),rivalHealth:Et("rival-health-value"),rivalHealthBar:Et("rival-health-bar"),cameraMode:Et("camera-mode-value")},bh=new URLSearchParams(location.search),Ah=(i,e)=>Ae.clamp(Number.parseInt(bh.get(i)??"0",10)||0,0,e);let gi=Ah("pw",3),Ui=Ah("ew",3),ro=Math.max(1,Ah("round",99)||1),zl=!1,Jt="loading";const ZM=3.55,JM=.55;let Bf=0,kl=3,Rd=0;function Rh(){$e.round.textContent=String(ro).padStart(2,"0"),$e.playerRounds.querySelectorAll("i").forEach((i,e)=>i.classList.toggle("won",e<gi)),$e.enemyRounds.querySelectorAll("i").forEach((i,e)=>i.classList.toggle("won",e<Ui)),U.dataset.currentRound=String(ro),U.dataset.playerRoundWins=String(gi),U.dataset.enemyRoundWins=String(Ui)}function QM(){lp("player")}function eS(){lp("opponent")}const Mn=new Zy({canvas:U,antialias:!0,powerPreference:"high-performance"});Mn.setPixelRatio(Math.min(devicePixelRatio,1.5));Mn.setSize(innerWidth,innerHeight,!1);Mn.shadowMap.enabled=!0;Mn.shadowMap.type=Vd;Mn.outputColorSpace=yt;Mn.toneMapping=Gd;Mn.toneMappingExposure=1.08;const Re=new Km;Re.background=new xe(8227218);Re.fog=new hh(7567998,.0068);const zf=new vh,Na=zf.load("./assets/cloudy-sky.png");Na.mapping=ma;Na.colorSpace=yt;Re.background=Na;Re.backgroundIntensity=.72;Re.environment=Na;Re.environmentIntensity=.58;function Ch(i,e=1,t=e){const n=zf.load(i);return n.wrapS=n.wrapT=Gi,n.repeat.set(e,t),n.colorSpace=yt,n.anisotropy=Math.min(8,Mn.capabilities.getMaxAnisotropy()),n}const Fi=Ch("./assets/materials/dirty-arena-ground-v1.png"),Sa=Ch("./assets/materials/weathered-arena-metal-v1.png"),Ms=Ch("./assets/materials/gritty-turret-metal-v1.png",2.4,2.4);function Uc(i,e=7.5){const t=i.getAttribute("position"),n=new Float32Array(t.count*2);for(let s=0;s<t.count;s++)n[s*2]=t.getX(s)/e,n[s*2+1]=t.getZ(s)/e;i.setAttribute("uv",new Ot(n,2))}const tS=new Jy,Cd=new Map,Pd=new Map;function nS(i){const e=Cd.get(i);if(e)return e;const t=new Promise((n,s)=>{tS.load(i,({scene:r})=>{r.updateMatrixWorld(!0);const o=new Sn().setFromObject(r),a=o.getCenter(new b);r.position.set(-a.x,-o.min.y,-a.z),r.traverse(l=>{if(!(l instanceof j))return;l.castShadow=!1,l.receiveShadow=!0;const h=Array.isArray(l.material)?l.material:[l.material];for(const u of h)u instanceof Bt&&(u.roughness=Math.max(u.roughness,.66),u.metalness=Math.min(u.metalness,.35))});const c=new st;c.add(r),n(c)},void 0,s)});return Cd.set(i,t),t}async function iS(i){const t=(await nS(i)).clone(!0),n=Number(U.dataset.assetsLoaded??0)+1;return U.dataset.assetsLoaded=String(n),t}function Ua(i,e){U.dataset.assetErrors=String(Number(U.dataset.assetErrors??0)+1),console.error(`[Rigged] Failed to load licensed asset: ${i}`,e)}function sS(i){const e=Pd.get(i);if(e)return e;const t=so[i],n=new Promise((s,r)=>{new DM().load(t.mtl,o=>{o.preload();const a=new kM;a.setMaterials(o),a.load(t.obj,c=>{c.updateMatrixWorld(!0);const l=new Sn().setFromObject(c),h=l.getCenter(new b);c.position.set(-h.x,-l.min.y,-h.z),c.traverse(d=>{if(!(d instanceof j))return;d.castShadow=!0,d.receiveShadow=!0;const f=Array.isArray(d.material)?d.material:[d.material];for(const m of f)m instanceof xh&&(m.shininess=Math.min(m.shininess,8),m.specular.setHex(1380877))});const u=new st;u.name=`racekart-hilly-${i}`,u.userData.sourceSize=l.getSize(new b),u.add(c),s(u)},void 0,r)},void 0,r)});return Pd.set(i,n),n}async function Ph(i){const e=await sS(i);return U.dataset.assetsLoaded=String(Number(U.dataset.assetsLoaded??0)+1),e.clone(!0)}const Xt=new sn(58,innerWidth/innerHeight,.1,520);Xt.position.set(0,7,-11);const Oi=new $M(Xt),rS=new Zg(12372951,3944487,1.35);Re.add(rS);const Fn=new Tf(16771792,3.25);Fn.position.set(-28,42,-18);Fn.castShadow=!0;Fn.shadow.mapSize.set(2048,2048);Fn.shadow.camera.left=-125;Fn.shadow.camera.right=125;Fn.shadow.camera.top=125;Fn.shadow.camera.bottom=-125;Fn.shadow.camera.near=2;Fn.shadow.camera.far=180;Fn.shadow.bias=-35e-5;Fn.shadow.normalBias=.035;Re.add(Fn);const Fa=new st;Fa.name="cloud-break-volumetric-light";const oS=new Mi({transparent:!0,depthWrite:!1,side:It,blending:Wr,vertexShader:"varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:"varying vec2 vUv; void main(){float edge=pow(max(0.0,1.0-abs(vUv.x-.5)*2.0),1.8);float fade=smoothstep(0.0,.2,vUv.y)*(1.0-smoothstep(.7,1.0,vUv.y));gl_FragColor=vec4(1.0,.91,.76,edge*fade*.042);}"});for(const[i,e,t,n]of[[-48,-34,18,.08],[-12,8,13,-.05],[28,-10,17,.06],[54,34,12,-.08],[-62,48,10,.04]]){const s=new st;s.position.set(i,37,e),s.rotation.z=n;for(const r of[0,Math.PI/3,Math.PI*2/3]){const o=new j(new gr(t*1.7,78),oS);o.rotation.y=r,o.renderOrder=-1,s.add(o)}Fa.add(s)}Re.add(Fa);let hi=23063;const la=new Float32Array(760*3);for(let i=0;i<760;i++){hi=hi*1664525+1013904223>>>0;const e=hi/4294967295;hi=hi*1664525+1013904223>>>0;const t=hi/4294967295;hi=hi*1664525+1013904223>>>0;const n=hi/4294967295;la[i*3]=(e-.5)*236,la[i*3+1]=.6+t*22,la[i*3+2]=(n-.5)*236}const kf=new xt;kf.setAttribute("position",new Ot(la,3));const Lh=new Hr(kf,new us({color:14862756,size:.13,transparent:!0,opacity:.22,depthWrite:!1,blending:Wr}));Lh.name="volumetric-dust-motes";Re.add(Lh);const ds=new Bt({color:12081725,map:Ms,bumpMap:Ms,bumpScale:.025,roughness:.74,metalness:.48}),un=new Bt({color:12631733,map:Ms,bumpMap:Ms,bumpScale:.035,roughness:.48,metalness:.84}),hn=new Bt({color:7633010,map:Ms,bumpMap:Ms,bumpScale:.04,roughness:.59,metalness:.82}),Hl=new Bt({color:11449006,map:Sa,bumpMap:Sa,bumpScale:.055,roughness:.48,metalness:.74,side:It}),aS=new Bt({color:16777215,map:Fi,bumpMap:Fi,bumpScale:.07,roughness:.96,metalness:0,vertexColors:!0}),Ih=new Bt({color:1052945,roughness:.9,metalness:.08});let J=Ma[Uf],Gn=J.radius,Qn=!1,Fc=!1;const Ln=1.12,Rn=.95,cS=.72,Ut=1/60,lS=.1,Ld=5,Id=1.15,oo=[],ur=[],go=[],Ss=[],yi=[],fs=[];let as=!1;const Mr=new j(new bs(.3,10,7),new et({color:5439472,depthTest:!1}));Mr.name="vehicle-surface-contact";Mr.renderOrder=30;Mr.visible=!1;Re.add(Mr);yi.push(Mr);const ws=new b,Vl=new mo(new b(0,1,0),ws,3.2,7536488,.55,.28),Gl=new mo(new b(0,1,0),ws,3.8,5505009,.6,.3),Wl=new mo(new b(0,0,1),ws,4.5,16768099,.65,.32),ha=new mo(new b(0,0,1),ws,3,16749375,.6,.3),ua=new mo(new b(1,0,0),ws,3.5,16731726,.6,.3),Kn=new b(0,1,0);for(const i of[Vl,Gl,Wl,ha,ua])i.visible=!1,i.renderOrder=31,Re.add(i),yi.push(i);function pt(i,e){return J.arenaKind==="capsule"&&J.bowl?Ft(J.bowl,i,e).height:Math.sin(i*.055)*Math.cos(e*.05)*.035}function hS(i,e){if(J.arenaKind!=="capsule"||!J.bowl)return null;const t=Ft(J.bowl,i,e);return t.progress<=.001?null:{ramp:{kind:"wall",label:`${t.band} capsule collider band`,rotation:Math.atan2(t.outwardX,t.outwardZ),length:J.bowl.outerRadius-J.bowl.flatRadius,rise:J.bowl.wallRise},height:t.height,localZ:t.progress}}function Hf(i,e){const t=e.contact??{kind:e.kind,label:e.label,rotation:e.rotation,length:e.length,rise:0},n=VM(i,{label:e.label,centerX:e.x,centerZ:e.z,rotation:e.rotation,width:e.width,length:e.length,metadata:t});let s=Number.POSITIVE_INFINITY,r=Number.NEGATIVE_INFINITY,o=0;for(let c=0;c<n.heights.length;c++)n.valid[c]&&(s=Math.min(s,n.heights[c]),r=Math.max(r,n.heights[c]),o++);t.rise=o?r-s:0,fs.push(n),Ss.push(i);const a=WM(n,e.kind==="bridge"?5505009:e.kind==="ramp"?16760405:7536488);return Re.add(a),yi.push(a),n}async function ao(i){try{const e=await Ph(i.asset),t=i.scale??10,n=e.userData.sourceSize,s=so[i.asset],r=s.category==="track"&&n?-n.y*t+.08:0;e.name=`racekart-hilly-${i.asset}${i.label?`-${i.label}`:""}`,e.scale.setScalar(t),e.position.set(i.x,pt(i.x,i.z)+(i.y??r),i.z),e.rotation.y=i.rotation??0,Re.add(e),(s.category==="terrain"||s.category==="track")&&n&&Hf(e,{label:i.label??i.asset,x:i.x,z:i.z,rotation:i.rotation??0,width:n.x*t,length:n.z*t,kind:s.category})}catch(e){Ua(so[i.asset].obj,e)}}function wa(i,e,t,n=!1){const s=new j(new Si(4.2,5.2,24),new et({color:n?11094834:14195270,side:It,transparent:!0,opacity:.68}));s.rotateX(-Math.PI/2),s.rotation.z=t,s.position.set(i,pt(i,e)+.11,e),s.name=n?"opponent-spawn-placeholder":"player-spawn",Re.add(s)}async function uS(){if(J.arenaKind==="capsule"){await dS();return}const i=Gn*2+18,e=new gr(i,i,112,112);e.rotateX(-Math.PI/2);const t=e.attributes.position;for(let m=0;m<t.count;m++)t.setY(m,pt(t.getX(m),t.getZ(m)));Uc(e);const n=new Float32Array(t.count*3),s=new xe(12758417),r=new xe(15783083),o=new xe;for(let m=0;m<t.count;m++){const _=t.getX(m),g=t.getZ(m),p=Ae.clamp(.46+Math.sin(_*.19+g*.13)*.1+Math.cos(_*.07-g*.11)*.06,0,1);o.copy(s).lerp(r,p),o.toArray(n,m*3)}e.setAttribute("color",new Ot(n,3)),t.needsUpdate=!0,e.computeVertexNormals();const a=new j(e,aS);a.receiveShadow=!0,a.name="arena-ground-aim-surface",Re.add(a),Ss.push(a);const c=new Bt({color:7827818,map:Fi,bumpMap:Fi,bumpScale:.035,roughness:.9,metalness:.04,side:It}),l=new Si(J.ringInnerRadius,J.ringOuterRadius,128);l.rotateX(-Math.PI/2),Uc(l);const h=new j(l,c);h.position.y=.055,h.receiveShadow=!0,h.name="continuous-circular-ring-track",Re.add(h);const u=new Qr(J.ringInnerRadius-2.5,96);u.rotateX(-Math.PI/2),Uc(u);const d=new j(u,new Bt({color:13677453,map:Fi,bumpMap:Fi,bumpScale:.07,roughness:.97,metalness:0,side:It}));d.position.y=.04,d.receiveShadow=!0,d.name="central-combat-bowl",Re.add(d);for(const[m,_,g]of[[J.ringInnerRadius,12151346,.65],[J.ringOuterRadius,9343886,.85]]){const p=new j(new Si(m-g,m+g,128),new et({color:_,side:It}));p.rotateX(-Math.PI/2),p.position.y=.075,p.name=m===J.ringInnerRadius?"rust-inner-track-edge":"concrete-outer-track-edge",Re.add(p)}const f=(J.ringInnerRadius+J.ringOuterRadius)*.5;for(let m=0;m<32;m++){const _=m/32*Math.PI*2,g=new j(new Ke(.32,.035,4.8),new et({color:13150836}));g.position.set(Math.sin(_)*f,.095,Math.cos(_)*f),g.rotation.y=_,g.name="ring-lane-marker",Re.add(g)}await Promise.all([...J.terrain.map(ao),...J.track.map(ao),...J.surfaces.map(Vf)]);for(const m of J.barriers)Xl(m.x,m.z,m.rotation,m.length,m.boundary);for(let m=0;m<36;m++){const _=m/36*Math.PI*2;Xl(Math.sin(_)*(Gn-2),Math.cos(_)*(Gn-2),_,Math.PI*(Gn-2)/18+.6,!0)}wa(J.spawn.x,J.spawn.z,J.spawn.heading),wa(J.opponentSpawn.x,J.opponentSpawn.z,J.opponentSpawn.heading,!0)}async function dS(){if(!J.bowl)throw new Error("Capsule Circuit layout is missing its surface configuration");const i=J.bowl,e=new Bt({color:16777215,map:Fi,bumpMap:Fi,bumpScale:.07,vertexColors:!0,roughness:.96,metalness:0,side:It}),t=new j(YM(i),e);t.name="capsule-flat-floor-collider",t.receiveShadow=!0,Re.add(t),Ss.push(t);const n=new Bt({color:13751247,map:Sa,bumpMap:Sa,bumpScale:.05,vertexColors:!0,roughness:.52,metalness:.64,side:It}),s=new j(KM(i),n);s.name="capsule-continuous-layered-wall-ride-surface",s.receiveShadow=!0,Re.add(s),Ss.push(s);const r=new j(jM(i),Hl);r.name="capsule-solid-upper-guard-collider",r.castShadow=!0,r.receiveShadow=!0,Re.add(r);const o=new j(t.geometry,new et({color:7536488,wireframe:!0,transparent:!0,opacity:.34,depthTest:!1}));o.name="capsule-flat-floor-collider-debug",o.visible=!1,o.renderOrder=21,Re.add(o),yi.push(o);const a=new j(s.geometry,new et({color:5636066,wireframe:!0,transparent:!0,opacity:.56,depthTest:!1}));a.name="capsule-transition-and-bank-collider-debug",a.visible=!1,a.renderOrder=22,Re.add(a),yi.push(a);const c=new j(r.geometry,new et({color:16738882,wireframe:!0,transparent:!0,opacity:.72,depthTest:!1}));c.name="capsule-upper-guard-collider-debug",c.visible=!1,c.renderOrder=23,Re.add(c),yi.push(c);const l=new j(new Si(7.2,7.7,48),new et({color:10770997,side:It,transparent:!0,opacity:.8}));l.rotateX(-Math.PI/2),l.position.y=.08,l.name="capsule-center-mark",Re.add(l);for(let h=-5;h<=5;h++){if(h===0)continue;const u=new j(new Ke(.28,.035,4.6),new et({color:12163689}));u.position.set(0,.09,h*7.3),u.name="capsule-centerline-marker",Re.add(u)}await Promise.all([...J.terrain.map(ao),...J.track.map(ao),...J.surfaces.map(Vf)]);for(const h of J.barriers)Xl(h.x,h.z,h.rotation,h.length,h.boundary);wa(J.spawn.x,J.spawn.z,J.spawn.heading),wa(J.opponentSpawn.x,J.opponentSpawn.z,J.opponentSpawn.heading,!0),U.dataset.capsuleCollision="three-disc-analytic-bands",U.dataset.bowlShape="capsule",U.dataset.bankedWallColliders="3",U.dataset.transitionCollider="continuous",U.dataset.upperGuardCollider="continuous",U.dataset.wallRideSurface="continuous"}async function Vf(i){const{x:e,z:t,rotation:n=0,width:s,length:r}=i,o=e-Math.sin(n)*r*.5,a=t-Math.cos(n)*r*.5,c=e+Math.sin(n)*r*.5,l=t+Math.cos(n)*r*.5,h=pt(o,a)+i.startHeight,u=pt(c,l)+i.endHeight,d=u-h,f=Math.atan2(d,r),m=new st,_=new et({color:i.kind==="bridge"?5625797:16753995,wireframe:!0,transparent:!0,opacity:0}),g=new j(new Ke(s,.32,r),_);g.rotation.x=-f,g.position.y=(h+u)*.5,g.name=`${i.kind}-collider-surface`,g.castShadow=!1,g.receiveShadow=!0,m.add(g),m.position.set(e,0,t),m.rotation.y=n,Re.add(m);const p={group:m,deck:g,position:new b(e,h,t),rotation:n,width:s,length:r,baseHeight:h,rise:d,kind:i.kind,label:i.label??i.asset};if(oo.push(p),Ss.push(g),i.kind==="bridge")for(const y of[-s*.47,s*.47]){const S=e+Math.cos(n)*y,x=t-Math.sin(n)*y;go.push({position:new b(S,0,x),halfWidth:r*.5,halfLength:.35,rotation:n+Math.PI/2,label:"bridge rail"})}try{const y=await Ph(i.asset),S=y.userData.sourceSize??new b(2,1,1),x=Math.max(.7,i.kind==="bridge"?Math.max(i.startHeight,i.endHeight):Math.abs(i.endHeight-i.startHeight));y.name=`racekart-hilly-driveable-${i.label??i.asset}`,y.scale.set(r/S.x,x/S.y,s/S.z),y.position.y=Math.min(pt(o,a),pt(c,l)),y.rotation.y=i.assetYaw??0,m.add(y),m.updateWorldMatrix(!0,!0),Hf(y,{label:p.label,x:e,z:t,rotation:n,width:s*(i.kind==="bridge"?.72:.94),length:r*.995,kind:i.kind,contact:p})}catch(y){Ua(so[i.asset].obj,y)}}function Xl(i,e,t,n,s=!1){const r=Hl.clone();r.color.setHex(s?9080715:9401959);const o=new j(new Ke(n,1.35,.8),r);o.position.set(i,pt(i,e)+.68,e),o.rotation.y=t,o.castShadow=!1,o.receiveShadow=!0,o.material.transparent=!0,o.material.opacity=.12,o.material.depthWrite=!1,Re.add(o),Ph("fence").then(c=>{const l=c.userData.sourceSize??new b(1,.4,.05);c.name=s?"racekart-hilly-arena-fence":"racekart-hilly-scrap-fence",c.scale.set(n/l.x,(s?2.6:1.8)/l.y,.8/l.z),c.position.set(i,pt(i,e),e),c.rotation.y=t,c.traverse(h=>{h instanceof j&&(h.castShadow=!0,h.receiveShadow=!0,h.material=Hl)}),Re.add(c)}).catch(c=>Ua(so.fence.obj,c)),go.push({position:new b(i,0,e),halfWidth:n*.5,halfLength:.4,rotation:t,label:s?"arena wall":"scrap barrier"});const a=new p0(o,16757575);a.visible=!1,Re.add(a),yi.push(a)}async function fS(){const i=J.props.map(e=>{const t=e.scale??10;return(e.asset==="rockWide"||e.asset==="rockTall")&&ur.push({position:new b(e.x,0,e.z),radius:t*.48,top:pt(e.x,e.z)+t,label:"racekart rock"}),e.asset==="hayBale"&&ur.push({position:new b(e.x,0,e.z),radius:t*.3,top:pt(e.x,e.z)+t*.55,label:"hay obstacle"}),ao(e)});await Promise.all(i)}function pS(i,e){for(const t of oo){const n=i-t.position.x,s=e-t.position.z,r=n*Math.cos(t.rotation)-s*Math.sin(t.rotation),o=n*Math.sin(t.rotation)+s*Math.cos(t.rotation),a=-t.length*.5;if(Math.abs(r)<=t.width*.5&&o>=a-Id&&o<=t.length*.5){const c=Ae.clamp((o-a)/t.length,0,1),l=t.baseHeight+c*t.rise+.25;if(o<a){const h=Ae.smoothstep(o,a-Id,a);return{ramp:t,height:Ae.lerp(pt(i,e),l,h),localZ:o}}return{ramp:t,height:l,localZ:o}}}return null}function Ea(i,e){const t=pt(i,e);let n=null;for(const s of fs){const r=GM(s,i,e);r===null||r<t-.12||(!n||r>n.height)&&(n={ramp:s.metadata,height:r,localZ:0})}return n??pS(i,e)??hS(i,e)}function _i(i,e){return Ea(i,e)?.height??pt(i,e)}function mS(){let i=0,e=0;for(const t of fs){let n=0,s=0;const r=Math.cos(t.rotation),o=Math.sin(t.rotation);for(let a=0;a<t.rows;a++){const c=-t.length*.5+a/(t.rows-1)*t.length;for(let l=0;l<t.columns;l++){const h=a*t.columns+l;if(!t.valid[h])continue;n++;const u=-t.width*.5+l/(t.columns-1)*t.width,d=t.center.x+u*r+c*o,f=t.center.y-u*o+c*r;s=Math.max(s,t.heights[h]-pt(d,f))}}n>0&&i++,s>.35&&e++}U.dataset.heightfieldCoverage=i===fs.length?"passed":"failed",U.dataset.heightfieldCoverageCount=`${i}/${fs.length}`,U.dataset.raisedSurfaceColliders=String(e)}function gS(i,e){const t=v.position.x+Math.sin(v.heading)*e,n=v.position.z+Math.cos(v.heading)*e,s=t-i.position.x,r=n-i.position.z,o=Math.cos(i.rotation),a=Math.sin(i.rotation),c=s*o-r*a,l=s*a+r*o,h=Ae.clamp(c,-i.halfWidth,i.halfWidth),u=Ae.clamp(l,-i.halfLength,i.halfLength);let d=c-h,f=l-u;const m=Math.hypot(d,f);if(m>=Ln)return!1;let _;if(m<.001){const y=i.halfWidth+Ln-Math.abs(c),S=i.halfLength+Ln-Math.abs(l);y<S?(d=Math.sign(c||1),f=0,_=y+.02):(d=0,f=Math.sign(l||1),_=S+.02)}else d/=m,f/=m,_=Ln-m+.02;const g=d*o+f*a,p=-d*a+f*o;return v.position.x+=g*_,v.position.z+=p*_,!0}function _S(i,e){const t=v.position.x+Math.sin(v.heading)*e,n=v.position.z+Math.cos(v.heading)*e,s=t-i.position.x,r=n-i.position.z,o=Math.hypot(s,r),a=i.radius+Ln;if(o>=a)return!1;const c=o>.001?s/o:Math.sin(v.heading),l=o>.001?r/o:Math.cos(v.heading),h=a-o+.02;return v.position.x+=c*h,v.position.z+=l*h,!0}function xS(){const i=new et({color:16747834,wireframe:!0,transparent:!0,opacity:.65});for(const e of ur){const t=pt(e.position.x,e.position.z),n=Math.max(.12,e.top-t),s=new j(new Mt(e.radius,e.radius,n,18),i);s.position.set(e.position.x,t+n*.5,e.position.z),s.visible=!1,Re.add(s),yi.push(s)}}function vS(){if(J.arenaKind==="capsule"&&J.bowl){const n=J.bowl,s=[[0,0],[-20,-24],[20,-24],[-20,24],[20,24],[0,-38],[0,38]],r=s.every(([c,l])=>Ft(n,c,l).progress===0),a=[[n.flatRadius+7,0],[-(n.flatRadius+7),0],[0,n.straightHalfLength+n.flatRadius+7],[0,-(n.straightHalfLength+n.flatRadius+7)]].every(([c,l])=>{const h=Ft(n,c,l);return h.progress>.25&&h.progress<.75&&h.height>2});U.dataset.ringSampleCount=String(s.length),U.dataset.ringClearSamples=String(s.length),U.dataset.ringTrackDrivable=a?"passed":"failed",U.dataset.centralCombatArea=r?"passed":"failed",U.dataset.targetArea=J.targets.length>=3&&J.targets.length<=5?"passed":"failed",U.dataset.futureSpawnSides=J.spawn.z*J.opponentSpawn.z<0?"passed":"failed",U.dataset.ovalBoundary="enclosed",U.dataset.wallSeam=Ft(n,n.flatRadius+.05,0).height<.01?"smooth":"failed";return}const i=(J.ringInnerRadius+J.ringOuterRadius)*.5,e=72;let t=0;for(let n=0;n<e;n++){const s=n/e*Math.PI*2,r=Math.sin(s)*i,o=Math.cos(s)*i,a=ur.some(l=>Math.hypot(r-l.position.x,o-l.position.z)<l.radius+2.2),c=go.some(l=>{if(l.label==="arena wall")return!1;const h=r-l.position.x,u=o-l.position.z,d=Math.cos(l.rotation),f=Math.sin(l.rotation),m=h*d-u*f,_=h*f+u*d;return Math.abs(m)<l.halfWidth+2.2&&Math.abs(_)<l.halfLength+2.2});!a&&!c&&Math.abs(pt(r,o))<.1&&t++}U.dataset.ringSampleCount=String(e),U.dataset.ringClearSamples=String(t),U.dataset.ringTrackDrivable=t===e?"passed":"failed",U.dataset.centralCombatArea=J.ringInnerRadius>=50?"passed":"failed",U.dataset.targetArea=J.targets.length>=3?"passed":"failed",U.dataset.futureSpawnSides=J.spawn.z*J.opponentSpawn.z<0?"passed":"failed"}const Zt=new st,zt=new st,Or=[],da=[],ps=new st,Oa={mg:{kind:"mg",label:"SCRAP RATTLER",stateLabel:"READY",fireRate:6.7,damage:15,projectileSpeed:58,range:136,automatic:!0,impactColor:16758088},rocket:{kind:"rocket",label:"HELLBOX ROCKETS",stateLabel:"ARMED",fireRate:.78,damage:82,projectileSpeed:34,range:112,automatic:!1,impactColor:16735008,splashRadius:5.4},sniper:{kind:"sniper",label:"LONGLANCE RAIL",stateLabel:"CHARGED",fireRate:.58,damage:110,projectileSpeed:320,range:188,automatic:!1,impactColor:6809599}},Gf=new Map;let nn="mg",ql=new st,Wf=new mt,Br;function Oc(i,e=.4){for(const t of[-1,1]){const n=new j(new Mt(.09,.13,.68,8),un);n.position.set(t*e,.12,.02),n.rotation.z=t*.42,n.castShadow=!0,i.add(n)}}function yS(i){const e=new st;e.name=`turret-${i}`;const t=new st;let n=new mt;if(i==="mg"){const s=new j(new mr(.48,0),hn);s.scale.set(1,.7,1.28),s.position.set(0,.28,.1),s.castShadow=!0,e.add(s);const r=new j(new Ke(.82,.42,.5),un);r.position.set(0,.18,-.52),r.rotation.x=.08,r.castShadow=!0,e.add(r),Oc(e);const o=new j(new Ke(1.24,.72,.12),ds);o.position.set(0,.24,.43),o.rotation.x=-.12,o.castShadow=!0,e.add(o),t.position.set(0,.34,.35),e.add(t);const a=new j(new Mt(.17,.2,.72,10),hn);a.rotation.x=Math.PI/2,a.position.z=.34,a.castShadow=!0,t.add(a);const c=new j(new Mt(.075,.095,1.82,10),un);c.rotation.x=Math.PI/2,c.position.z=1.53,c.castShadow=!0,t.add(c);const l=new j(new Mt(.15,.15,.34,10),hn);l.rotation.x=Math.PI/2,l.position.z=2.45,l.castShadow=!0,t.add(l);const h=new j(new Si(.055,.13,10),new et({color:16747317}));h.position.z=2.63,t.add(h),n.position.z=2.66,t.add(n)}else if(i==="rocket"){const s=new j(new Ke(1.34,.58,1.18),hn);s.position.set(0,.28,-.05),s.rotation.x=-.05,s.castShadow=!0,e.add(s);const r=new j(new Ke(1.58,.72,.12),ds);r.position.set(0,.28,.54),r.rotation.x=-.13,r.castShadow=!0,e.add(r),Oc(e,.5),t.position.set(0,.48,.18),e.add(t);const o=new j(new Ke(1.28,.9,1.72),hn);o.position.z=.62,o.castShadow=!0,t.add(o);for(const c of[-.34,.34])for(const l of[-.23,.23]){const h=new j(new Mt(.19,.23,1.92,10),hn);h.rotation.x=Math.PI/2,h.position.set(c,l,.72),h.castShadow=!0,t.add(h);const u=new j(new ar(.205,.045,7,12),ds);u.position.set(c,l,1.69),t.add(u);const d=new j(new Qr(.14,10),new et({color:16738852}));d.position.set(c,l,1.7),t.add(d)}const a=new j(new Ke(.86,.08,.04),new et({color:16758077}));a.position.set(0,.48,1.5),t.add(a),n.position.z=1.86,t.add(n)}else{const s=new j(new Ke(1.12,.52,1.48),hn);s.position.set(0,.29,.15),s.castShadow=!0,e.add(s);const r=new j(new Ke(.82,.46,.72),un);r.position.set(0,.25,-.75),r.castShadow=!0,e.add(r),Oc(e,.43),t.position.set(0,.43,.36),e.add(t);for(const h of[-.25,.25]){const u=new j(new Ke(.12,.12,3.18),un);u.position.set(h,0,1.52),u.castShadow=!0,t.add(u)}const o=new j(new Mt(.085,.12,3.5,10),hn);o.rotation.x=Math.PI/2,o.position.z=1.72,o.castShadow=!0,t.add(o);const a=new j(new Ke(.68,.34,.48),hn);a.position.z=3.45,a.castShadow=!0,t.add(a);for(const h of[-.27,.27]){const u=new j(new Ke(.13,.13,.62),new et({color:5824504}));u.position.set(h,0,3.47),t.add(u)}const c=new j(new Ke(.32,.26,.7),un);c.position.set(0,.39,.45),t.add(c);const l=new j(new Qr(.12,12),new et({color:9171967}));l.position.set(0,.39,.81),t.add(l),n.position.z=3.76,t.add(n)}return e.visible=i===nn,{root:e,barrelPivot:t,muzzle:n}}function Ba(i,e=!0){nn=i;const t=Oa[i];rn.fireRate=t.fireRate,rn.damage=t.damage,rn.projectileSpeed=t.projectileSpeed,rn.range=t.range,rn.automatic=t.automatic,co=0,cn(!1);for(const[n,s]of Gf)s.root.visible=n===i,n===i&&(ql=s.barrelPivot,Wf=s.muzzle);$e.weapon.textContent=t.label,$e.weaponState.textContent=t.stateLabel,document.querySelectorAll("[data-weapon]").forEach(n=>{const s=n.dataset.weapon===i;n.classList.toggle("selected",s),n.setAttribute("aria-pressed",String(s))}),U.dataset.selectedTurret=i,U.dataset.weaponVfx=i==="rocket"?"large-world-detonation":i==="sniper"?"tight-cyan-laser-tracer":"scrap-sparks",e&&Qn&&Yt(`${t.label} // TEST MOUNTED`)}function MS(){const i=new st;i.name="vehicle-fallback";const e=new j(new Ke(2.7,.65,4.55),ds);e.position.y=1.05,e.castShadow=e.receiveShadow=!0,i.add(e);const t=new j(new mr(1.18,0),hn);t.scale.set(1,.66,1.05),t.position.set(0,1.72,-.32),t.castShadow=!0,i.add(t);for(const r of[-1.45,1.45])for(const o of[-1.45,1.45]){const a=new st;a.position.set(r,.72,o),i.add(a);const c=new j(new Mt(.57,.57,.42,14),Ih);c.rotation.z=Math.PI/2,c.castShadow=!0,a.add(c),Or.push(c),o>0&&da.push(a);const l=new j(new Mt(.22,.22,.45,10),un);l.rotation.z=Math.PI/2,c.add(l)}Zt.add(i),U.dataset.vehicleAsset="loading-kenney-suv",iS(Ic.vehicle.model).then(r=>{r.name="kenney-car-kit-suv",r.scale.setScalar(1.84),r.position.y=.06;const o=new xe(14200973);r.traverse(a=>{if(!(a instanceof j))return;a.castShadow=!0;const l=(Array.isArray(a.material)?a.material:[a.material]).map(h=>{const u=h.clone();return u instanceof Bt&&(u.color.multiply(o),u.roughness=.78,u.metalness=.2,u.envMapIntensity=.55),u});a.material=Array.isArray(a.material)?l:l[0]}),i.removeFromParent(),Or.length=0,da.length=0;for(const a of Ic.vehicle.wheelNodes){const c=r.getObjectByName(a);c&&(Or.push(c),a.includes("front")&&da.push(c))}Zt.add(r),U.dataset.vehicleAsset="kenney-car-kit-suv",U.dataset.vehicleWheels=String(Or.length)}).catch(r=>{U.dataset.vehicleAsset="fallback-low-poly",Ua(Ic.vehicle.model,r)});const n=new j(new Mt(.62,.76,.22,12),un);n.position.y=2.38,n.castShadow=!0,Zt.add(n);const s=new j(new ar(.62,.08,8,16),hn);s.rotation.x=Math.PI/2,s.position.y=2.5,s.castShadow=!0,Zt.add(s),ps.position.y=2.54,Zt.add(ps);for(const r of["mg","rocket","sniper"]){const o=yS(r);Gf.set(r,o),ps.add(o.root)}Ba(nn,!1),Br=new j(new Ke(Ln*2,cS,(Rn+Ln)*2),new et({color:5046256,wireframe:!0,transparent:!0,opacity:.8})),Br.position.y=.52,Br.visible=!1,Zt.add(Br),Zt.position.set(0,pt(0,-28),-28),Re.add(Zt)}function SS(){zt.name="rival-ai-combat-car";const i=new Bt({color:6501275,map:Ms,roughness:.68,metalness:.5}),e=new j(new Ke(2.75,.72,4.45),i);e.position.y=1.02,e.castShadow=!0,zt.add(e);const t=new j(new mr(1.15,0),hn.clone());t.scale.set(1,.66,1.05),t.position.set(0,1.68,-.28),t.castShadow=!0,zt.add(t);for(const a of[-1.43,1.43])for(const c of[-1.42,1.42]){const l=new j(new Mt(.56,.56,.42,14),Ih);l.rotation.z=Math.PI/2,l.position.set(a,.7,c),l.castShadow=!0,zt.add(l)}const n=new j(new Mt(.58,.72,.24,12),i);n.position.y=2.32,zt.add(n);const s=new st;s.name="rival-tracking-turret",s.position.y=2.5,zt.add(s);const r=new j(new Ke(.82,.48,1.05),hn);r.position.y=.18,s.add(r);for(const a of[-.18,.18]){const c=new j(new Mt(.065,.08,1.72,9),un);c.rotation.x=Math.PI/2,c.position.set(a,.18,1.16),s.add(c)}const o=new j(new bs(.1,10,7),new et({color:14249215}));o.position.set(0,.38,.52),s.add(o),zt.userData.turret=s,Re.add(zt),Ss.push(zt)}const wS={maxHealth:100,acceleration:16.5,maxSpeed:27,handling:1.62,traction:7.4,boostPower:1.3,armor:0,weaponDamage:15,fireRate:6.7,projectileSpeed:58},Ct={...wS},rn={fireRate:Ct.fireRate,damage:Ct.weaponDamage,projectileSpeed:Ct.projectileSpeed,range:136,automatic:!1},ES={},v={position:new b(0,0,-28),heading:0,speed:0,driftAngle:0,verticalVelocity:0,pitch:0,roll:0,grounded:!0,activeRamp:null,health:100,boost:100,collisionCooldown:0,orientation:new Un,surfaceNormal:new b(0,1,0),projectedForward:new b(0,0,1),velocity:new b,wallContactNormal:new b,wallAssistActive:!1,downforce:0},he={position:new b,heading:Math.PI,speed:0,health:140,maxHealth:140,fireCooldown:1.4,steerBias:1,collisionCooldown:0},TS={tires:{id:"better-tires",name:"All-Terrain Tires",slot:"tires",stats:{traction:9.2,handling:1.85}},engine:{id:"turbo-engine",name:"Turbo V8",slot:"engine",stats:{maxSpeed:32,acceleration:24}},armor:{id:"armor-plates",name:"Riveted Armor",slot:"armor",stats:{maxHealth:145,armor:.22}},weapon:{id:"roof-machine-gun",name:"Twin Roof MG",slot:"roof_weapon",stats:{weaponDamage:24,fireRate:10.5,projectileSpeed:68}}},Dh=[];function bS(i,e,t){const n=new st,s={tires:5228510,engine:15772997,armor:12898426,weapon:15162424,repair:6803330},r=new j(new Mt(.08,.22,4,8,1,!0),new et({color:s[t],transparent:!0,opacity:.15,side:It}));r.position.y=2,n.add(r);const o=new j(new ar(.75,.07,8,24),new et({color:s[t]}));o.rotation.x=Math.PI/2,o.position.y=.12,n.add(o);const a=new st;if(a.position.y=1.15,n.add(a),t==="tires"){const l=new j(new ar(.48,.2,10,18),Ih);l.rotation.y=Math.PI/2,a.add(l)}if(t==="engine"){const l=new j(new Ke(.9,.65,.65),un);a.add(l);for(const h of[-.3,.3]){const u=new j(new Mt(.08,.08,.8,8),ds);u.position.set(h,.45,0),a.add(u)}}if(t==="armor")for(const l of[-.18,.18]){const h=new j(new Ke(1.05,.68,.1),new Bt({color:s[t],roughness:.65,metalness:.55}));h.position.z=l,h.rotation.y=l*1.5,a.add(h)}if(t==="weapon"){const l=new j(new Ke(.36,.32,1.2),un);l.position.z=.22,a.add(l);const h=new j(new Mt(.06,.06,1.2,8),un);h.rotation.x=Math.PI/2,h.position.z=1,a.add(h)}if(t==="repair"){const l=new j(new Ke(.85,.7,.55),new Bt({color:s[t],roughness:.6}));a.add(l);const h=new j(new Ke(.16,.5,.08),new et({color:15855827}));h.position.z=.3,a.add(h);const u=h.clone();u.rotation.z=Math.PI/2,a.add(u)}n.position.set(i,pt(i,e)+.12,e),Re.add(n);const c=t==="repair"?null:TS[t];Dh.push({group:n,part:c,repair:t==="repair"?45:void 0,collected:!1,label:c?.name??"Repair Kit"})}const dr=[];function AS(i,e,t){const n=new st,s=new j(new Mt(.75,.9,.35,10),hn);s.position.y=.18,s.castShadow=!0,n.add(s);const r=new j(new Ke(.3,1.8,.3),un);r.position.y=1.2,r.castShadow=!0,n.add(r);const o=new j(new Mt(.62,.78,1.35,8),new Bt({color:9518119,roughness:.7,metalness:.45,emissive:0}));o.position.y=1.55,o.castShadow=!0,o.name="target-body",n.add(o);const a=new j(new bs(.13,10,8),new et({color:16757830}));a.position.set(0,1.72,.65),n.add(a);for(const c of[-1,1]){const l=new j(new Ke(.8,.16,.16),un);l.position.set(c*.78,1.7,0),l.rotation.z=c*.25,n.add(l)}n.position.set(i,pt(i,e),e),n.rotation.y=t,Re.add(n),dr.push({group:n,health:55,alive:!0,hitFlash:0})}const ms=[],Vi=[],$n=[];let Xf=1;const RS=new et({color:16764762}),CS=new et({color:12683865,transparent:!0,opacity:.35,depthWrite:!1}),PS=new Ke(.09,.09,.72),LS=new bs(.3,6,4),IS=new mr(.14,0),DS=new Si(.48,.68,28),qf=new gh(.55,1),NS=new bs(.18,7,5),Di=new vr(16747044,8,5,2);Di.visible=!1;Re.add(Di);let co=0,Yf=!1,fa=0,pa=0,Qs=0,er=0,Yl=0,xi=!1,Es=0;const Wi=new URLSearchParams(location.search).get("physics-smoke")==="ramp",fr=new URLSearchParams(location.search).get("physics-smoke")==="all-surfaces",lo=new URLSearchParams(location.search).get("physics-smoke")==="wall",ho=new URLSearchParams(location.search).get("input-smoke")==="hold-fire",za=new URLSearchParams(location.search).get("input-smoke")==="boost",Nh=new URLSearchParams(location.search).get("combat-smoke")==="round-win",Cn=new Audio("./assets/nitro-games.wav");Cn.loop=!0;Cn.volume=.12;Cn.preload="metadata";Cn.id="soundtrack";Cn.hidden=!0;Cn.dataset.playback="waiting-for-interaction";const kt=new Audio("./assets/audio/sfx/vehicle-engine-loop.wav");kt.loop=!0;kt.volume=.001;kt.playbackRate=.68;kt.preservesPitch=!1;kt.preload="auto";kt.id="vehicle-engine-loop";kt.hidden=!0;kt.dataset.playback="waiting-for-interaction";document.body.append(Cn,kt);const Kf={"turret-mg":"./assets/audio/sfx/turret-mg-fire.wav","turret-rocket":"./assets/audio/sfx/turret-rocket-fire.ogg","turret-sniper":"./assets/audio/sfx/turret-sniper-fire.ogg","vehicle-hit":"./assets/audio/sfx/vehicle-hit-clank.ogg","confirmed-hit":"./assets/audio/sfx/confirmed-hit-clank.ogg"},jf=new Map,Bc=new Set,$f=new Map;let xn=null,Dd=!1;const US=bh.get("audio-smoke")==="fail";for(const[i,e]of Object.entries(Kf)){const t=new Audio(e);t.preload="auto",jf.set(i,t)}function gs(i,e,t=.035,n){const s=$f.get(i);if(xn&&s){const a=xn.createBufferSource(),c=xn.createGain(),l=xn.createPanner();a.buffer=s,a.playbackRate.value=1+(Math.random()*2-1)*t,c.gain.value=Ae.clamp(e,0,1),l.panningModel="HRTF",l.distanceModel="inverse",l.refDistance=7,l.maxDistance=150,l.rolloffFactor=.72;const h=n??v.position;l.positionX&&l.positionY&&l.positionZ?(l.positionX.value=h.x,l.positionY.value=h.y+1,l.positionZ.value=h.z):l.setPosition?.(h.x,h.y+1,h.z),a.connect(c).connect(l).connect(xn.destination),a.start(),U.dataset.lastSfx=i,U.dataset.spatialAudio="hrtf-world-positioned";return}const r=jf.get(i);if(!r)return;const o=r.cloneNode(!0);o.volume=Ae.clamp(e,0,1),o.preservesPitch=!1,o.playbackRate=1+(Math.random()*2-1)*t,Bc.add(o),o.addEventListener("ended",()=>Bc.delete(o),{once:!0}),o.play().catch(()=>Bc.delete(o)),U.dataset.lastSfx=i}function Uh(){if(!xn){xn=new AudioContext;for(const[i,e]of Object.entries(Kf))fetch(e).then(t=>t.arrayBuffer()).then(t=>xn.decodeAudioData(t)).then(t=>$f.set(i,t)).catch(()=>{})}xn.state==="suspended"&&xn.resume(),Cn.paused&&(Cn.dataset.playback="starting",Cn.play().then(()=>{Cn.dataset.playback="playing"}).catch(()=>{Cn.dataset.playback="blocked"})),kt.paused&&(kt.dataset.playback="starting",kt.play().then(()=>{kt.dataset.playback="playing"}).catch(()=>{kt.dataset.playback="blocked"}))}const ns=new b,is=new b;function FS(){if(!xn)return;Xt.getWorldDirection(ns),is.set(0,1,0).applyQuaternion(Xt.quaternion);const i=xn.listener,e=xn.currentTime,t=i;i.positionX&&i.positionY&&i.positionZ?(i.positionX.setTargetAtTime(Xt.position.x,e,.02),i.positionY.setTargetAtTime(Xt.position.y,e,.02),i.positionZ.setTargetAtTime(Xt.position.z,e,.02)):t.setPosition?.(Xt.position.x,Xt.position.y,Xt.position.z),i.forwardX&&i.forwardY&&i.forwardZ&&i.upX&&i.upY&&i.upZ?(i.forwardX.setTargetAtTime(ns.x,e,.02),i.forwardY.setTargetAtTime(ns.y,e,.02),i.forwardZ.setTargetAtTime(ns.z,e,.02),i.upX.setTargetAtTime(is.x,e,.02),i.upY.setTargetAtTime(is.y,e,.02),i.upZ.setTargetAtTime(is.z,e,.02)):t.setOrientation?.(ns.x,ns.y,ns.z,is.x,is.y,is.z)}let zc=0;function OS(i){const e=Ae.clamp(Math.abs(v.speed)/Math.max(1,Ct.maxSpeed),0,1.25),t=tt.has("KeyW")||tt.has("KeyS"),n=tt.has("ShiftLeft")&&v.boost>0,r=Qn&&!xi&&v.health>0?.055+e*.16+(t?.025:0):0,o=.68+e*.82+(n?.12:0);zc=Ae.damp(zc,r,6,i),kt.volume=Ae.clamp(zc,0,.26),kt.playbackRate=Ae.damp(kt.playbackRate,o,7,i),U.dataset.engineVolume=kt.volume.toFixed(3),U.dataset.enginePlaybackRate=kt.playbackRate.toFixed(2)}function BS(i){if(!Dd)try{if(OS(i),US)throw new Error("Simulated audio-frame failure");FS(),U.dataset.audioFrame="active"}catch(e){Dd=!0,U.dataset.audioFrame="disabled",console.warn("[Rigged] Spatial audio disabled; gameplay will continue.",e)}}const tt=new Set,Kl=new ce(0,.15),$t=new b,kc=new bf,Nd=new Pi(new b(0,1,0),0),Zf=new b(0,0,1);let ka=!1;const _s=new st,Jf=new et({color:16762972,transparent:!0,opacity:.92,depthTest:!1}),Qf=new j(new Si(.65,.82,24),Jf);Qf.rotation.x=-Math.PI/2;_s.add(Qf);for(const i of[0,Math.PI/2]){const e=new j(new Ke(2.25,.025,.08),Jf);e.rotation.y=i,e.position.y=.015,_s.add(e)}_s.renderOrder=10;Re.add(_s);const ui=new b,Ir=new b,ep=new b(0,0,1);function zS(i=10,e=1.35,t=.34){const n=new _f;for(let s=0;s<i*2;s++){const r=s/(i*2)*Math.PI*2-Math.PI/2,o=s%2===0?e:t,a=Math.cos(r)*o,c=Math.sin(r)*o;s===0?n.moveTo(a,c):n.lineTo(a,c)}return n.closePath(),new _h(n)}const kS=zS();function In(i,e=1){const t=new et({color:i,transparent:!0,opacity:e,depthWrite:!1,side:It,blending:Wr});return t.userData.baseOpacity=e,t}function Ta(i,e,t=!0){const n=Oa[i],s=new st;s.position.copy(e),s.userData.billboard=!0;const r=i==="rocket",o=t&&r?1.8:t?1:.28,a=new j(qf,In(r?16758063:16766575,.95));a.scale.setScalar(o),s.add(a);const c=new j(kS,In(n.impactColor,i==="mg"?.72:.96));c.scale.setScalar(t?1.24:.26),s.add(c),t&&r&&c.scale.setScalar(2.15);const l=t&&r?5:1;for(let u=0;u<l;u++){const d=new j(DS,In(u===0?16777215:n.impactColor,.9-u*.18));d.scale.setScalar((t?1.1:.2)+u*.46),d.position.z=-.03-u*.015,s.add(d)}if(t&&r){for(let f=0;f<20;f++){const m=new j(new Ke(.13,3.25,.04),In(f%3?n.impactColor:16777215,.88)),_=f/20*Math.PI*2;m.rotation.z=_,m.position.set(Math.cos(_)*2.1,Math.sin(_)*2.1,-.06),s.add(m)}const d=new vr(n.impactColor,52,21,2);s.add(d),Qs=.38,er=.62,U.dataset.lastImpactEffect="rocket-world-detonation"}const h=t&&r?.82:t?.3:.13;Re.add(s),$n.push({group:s,life:h,maxLife:h,kind:"impact",growth:t&&r?7.2:t?2.2:1.3})}function HS(i){const e=new st;e.position.copy(i),e.userData.billboard=!0;const t=new j(qf,In(16777215,.96));t.scale.setScalar(.22),e.add(t);for(let s=0;s<8;s++){const r=s/8*Math.PI*2,o=new j(new Ke(.025,.86,.025),In(s%2?6153727:16777215,.9));o.rotation.z=r,o.position.set(Math.cos(r)*.38,Math.sin(r)*.38,0),e.add(o)}const n=new vr(7072255,10,5,2);e.add(n),Re.add(e),$n.push({group:e,life:.16,maxLife:.16,kind:"impact",growth:.5}),Qs=.055,er=.08,U.dataset.lastImpactEffect="sniper-pinpoint-spark"}function VS(i,e,t){const n=Math.min(t,Math.max(18,i.distanceTo($t)+8)),s=i.clone().addScaledVector(e,n*.5),r=new st;r.position.copy(s),r.quaternion.setFromUnitVectors(new b(0,1,0),e);const o=new j(new Mt(.2,.2,n,8,1,!0),In(3657727,.34));r.add(o);const a=new j(new Mt(.055,.055,n,8),In(15334911,1));r.add(a);const c=new j(new Mt(.018,.018,n,6),In(16777215,1));r.add(c),Re.add(r),$n.push({group:r,life:.48,maxLife:.48,kind:"laser",growth:0}),U.dataset.sniperTracerLength=n.toFixed(1)}function GS(i,e){const t=new st;t.position.copy(i).add(new b((Math.random()-.5)*.12,(Math.random()-.5)*.12,(Math.random()-.5)*.12));const n=new j(NS,In(Math.random()>.45?16742947:16767066,.72));t.add(n),Re.add(t),$n.push({group:t,life:.28,maxLife:.28,kind:"trail",growth:2.2,sourceId:e})}function tp(i){for(let e=$n.length-1;e>=0;e--){const t=$n[e];t.kind!=="trail"||t.sourceId!==i||(Re.remove(t.group),$n.splice(e,1))}U.dataset.rocketTrailCleanup="detonation-synced"}function np(i){if(i==="mg")return new j(PS,RS);if(i==="sniper"){const o=new st,a=new j(new Ke(.06,.06,9),new et({color:16777215}));o.add(a);const c=new j(new Ke(.24,.24,8.2),In(5627135,.58));return o.add(c),o}const e=new st,t=new j(new Mt(.12,.15,.78,9),new Bt({color:3421747,roughness:.55,metalness:.7}));t.rotation.x=Math.PI/2,e.add(t);const n=new j(new eo(.15,.34,9),ds);n.rotation.x=Math.PI/2,n.position.z=.55,e.add(n);for(const o of[-1,1]){const a=new j(new Ke(.38,.04,.32),ds);a.position.set(o*.14,0,-.28),a.rotation.z=o*.42,e.add(a)}const s=new j(new eo(.18,.85,9),In(16747304,.92));s.rotation.x=-Math.PI/2,s.position.z=-.78,e.add(s);const r=new vr(16738852,8,4,2);return r.position.z=-.3,e.add(r),e}function ip(){if(xi||Jt!=="active"||v.health<=0||!ka||co>0||ms.length>=120)return!1;const i=Oa[nn];co=1/rn.fireRate,Wf.getWorldPosition(ui),Ir.copy($t).sub(ui).normalize(),Zf.copy(Ir);const e=np(nn);return e.position.copy(ui),e.quaternion.setFromUnitVectors(ep,Ir),Re.add(e),ms.push({id:Xf++,mesh:e,velocity:Ir.clone().multiplyScalar(rn.projectileSpeed),life:rn.range/rn.projectileSpeed,kind:nn,owner:"player",damage:rn.damage,splashRadius:i.splashRadius??0,trailTimer:0}),U.dataset.shotsFired=String(Number(U.dataset.shotsFired??0)+1),$e.weaponState.textContent="FIRING",pa=.08,Di.color.setHex(i.impactColor),Di.intensity=nn==="rocket"?22:nn==="sniper"?28:8,Di.distance=nn==="rocket"?10:7,Di.position.copy(ui),Di.visible=!0,fa=nn==="mg"?.045:.09,nn==="mg"?gs("turret-mg",.1,.025,ui):nn==="rocket"?gs("turret-rocket",.44,.025,ui):gs("turret-sniper",.38,.018,ui),nn==="sniper"?VS(ui,Ir,rn.range):Ta(nn,ui,!1),!0}function WS(){if(Jt!=="active"||he.health<=0||v.health<=0)return;const i=he.position.clone().add(new b(0,2.72,0)),t=v.position.clone().add(new b((Math.random()-.5)*1.2,1.05+(Math.random()-.5)*.45,(Math.random()-.5)*1.2)).sub(i).normalize(),n=np("mg");n.position.copy(i),n.quaternion.setFromUnitVectors(ep,t),Re.add(n),ms.push({id:Xf++,mesh:n,velocity:t.multiplyScalar(48),life:2.3,kind:"mg",owner:"opponent",damage:8,splashRadius:0,trailTimer:0}),gs("turret-mg",.075,.045,i),Ta("mg",i,!1),U.dataset.aiShotsFired=String(Number(U.dataset.aiShotsFired??0)+1)}function cn(i){Yf=i,U.dataset.fireHeld=String(i),i&&ip()}function sp(i){co=Math.max(0,co-i),pa=Math.max(0,pa-i),fa=Math.max(0,fa-i),pa===0&&$e.weaponState.textContent==="FIRING"&&($e.weaponState.textContent=Oa[nn].stateLabel),fa===0&&(Di.visible=!1),Yf&&ip()}function XS(i){if(Vi.length>=80||Math.abs(v.speed)<3||Math.random()>i*Math.min(Math.abs(v.speed),20)*1.5)return;const e=new b(-Math.sin(v.heading)*2,0,-Math.cos(v.heading)*2),t=new j(LS,CS.clone());t.scale.setScalar(.6+Math.random()*.7),t.position.copy(v.position).add(e).add(new b((Math.random()-.5)*1.8,.25,(Math.random()-.5)*.8)),Re.add(t),Vi.push({mesh:t,life:.7+Math.random()*.5,velocity:new b((Math.random()-.5)*.5,.45+Math.random()*.3,(Math.random()-.5)*.5)})}function Fh(i,e=1.4,t=12){for(let n=0;n<Math.min(t,80-Vi.length);n++){const s=new j(IS,new et({color:n%3===0?16761678:12077609}));s.scale.setScalar(.6+Math.random()),s.position.copy(i).add(new b(0,e,0)),Re.add(s),Vi.push({mesh:s,life:.7+Math.random()*.8,velocity:new b((Math.random()-.5)*7,2+Math.random()*5,(Math.random()-.5)*7)})}}function jl(i,e){if(i.alive&&(i.health-=e,i.hitFlash=.09,qS(),i.health<=0)){i.alive=!1,Fh(i.group.position),Re.remove(i.group);const t=dr.filter(n=>n.alive).length;U.dataset.targetsRemaining=String(t),Yt(t?`TARGET SCRAPPED // ${t} REMAIN`:"TARGET LANE CLEARED // FIND THE RIVAL")}}let Ud=-1/0;function qS(){const i=performance.now();i-Ud<70||(Ud=i,gs("confirmed-hit",.23,.02))}function YS(i){if(i.collected=!0,Re.remove(i.group),i.repair){v.health=Math.min(Ct.maxHealth,v.health+i.repair),Yt(`REPAIR KIT // HULL RESTORED +${i.repair}`);return}i.part&&(ES[i.part.slot]=i.part,Object.assign(Ct,i.part.stats),i.part.slot==="armor"&&(v.health=Math.min(Ct.maxHealth,v.health+45)),i.part.slot==="roof_weapon"&&(Ba("mg",!1),rn.fireRate=Ct.fireRate,rn.damage=Ct.weaponDamage,rn.projectileSpeed=Ct.projectileSpeed,$e.weapon.textContent="TWIN SCRAP RATTLER",ps.scale.set(1.18,1.12,1.18)),Yt(`EQUIPPED // ${i.part.name.toUpperCase()}`))}function Yt(i){$e.message.textContent=i,$e.message.classList.add("show"),clearTimeout(Yl),Yl=window.setTimeout(()=>$e.message.classList.remove("show"),1900)}const Xi=new b(0,1,0),Hc=new b,ss=new b,Vc=new b,qn=new b,Fd=new Ve,Od=new Un,cs=new Nn(0,0,0,"YXZ"),Bi=.93;function KS(i,e,t,n){if(n.set(Math.sin(i),0,Math.cos(i)),J.arenaKind!=="capsule"||!J.bowl)return n;const s=Ft(J.bowl,e,t);return s.progress<=.001?n:(n.addScaledVector(s.normal,-n.dot(s.normal)),n.lengthSq()<1e-4&&n.set(Math.sin(i),0,Math.cos(i)),n.normalize())}function jS(i,e,t,n){const r=J.arenaKind==="capsule"&&!!J.bowl?Ft(J.bowl,v.position.x,v.position.z):null,o=!!(r&&r.progress>.001&&v.grounded),a=r?Ae.smoothstep(r.progress,.025,.34):0;ss.copy(Xi),r&&ss.lerp(r.normal,a*.88).normalize(),v.surfaceNormal.copy(r?.normal??Xi),v.wallAssistActive=o,v.downforce=o?3.5+a*5.5:0,qn.set(Math.sin(v.heading),0,Math.cos(v.heading)),qn.addScaledVector(ss,-qn.dot(ss)),qn.lengthSq()<1e-4&&qn.set(Math.sin(v.heading),0,Math.cos(v.heading)),qn.normalize(),Vc.crossVectors(ss,qn).normalize(),qn.crossVectors(Vc,ss).normalize(),v.projectedForward.copy(qn),Fd.makeBasis(Vc,ss,qn),Od.setFromRotationMatrix(Fd),v.orientation.slerp(Od,1-Math.exp(-(o?11:15)*i)),cs.setFromQuaternion(v.orientation,"YXZ"),v.pitch=Ae.clamp(cs.x,-Bi,Bi),v.roll=Ae.clamp(cs.z,-Bi,Bi)+(e?t*.035*n:0),cs.set(v.pitch,cs.y,v.roll,"YXZ"),v.orientation.setFromEuler(cs)}function $S(i,e,t){let n=Math.sin(t)*v.speed,s=Math.cos(t)*v.speed;const r=n*i+s*e;if(r<=0)return;n-=i*r*1.08,s-=e*r*1.08;const o=Math.hypot(n,s);if(v.speed=Math.min(Math.abs(v.speed),o),o>.05){const a=Math.atan2(n,s);v.heading=a-v.driftAngle}v.driftAngle*=.35}function Ts(i){v.collisionCooldown=Math.max(0,v.collisionCooldown-i),v.wallContactNormal.set(0,0,0);const e=tt.has("KeyW")?1:0,t=tt.has("KeyS")?1:0,n=(tt.has("KeyA")?1:0)-(tt.has("KeyD")?1:0),s=tt.has("Space"),r=tt.has("ShiftLeft")&&e>0&&v.boost>0;e&&(v.speed+=Ct.acceleration*(r?Ct.boostPower??1.3:1)*i),t&&(v.speed-=v.speed>1?Ct.acceleration*2.35*i:Ct.acceleration*.68*i),r?v.boost=Math.max(0,v.boost-24*i):v.boost=Math.min(100,v.boost+6*i);const o=Ct.maxSpeed*(r?Ct.boostPower??1.3:1);if(v.speed=Ae.clamp(v.speed,-11,o),!e&&!t){const x=(s?4.4:2.15)*i;v.speed=Math.abs(v.speed)<=x?0:v.speed-Math.sign(v.speed)*x}const a=Math.min(Math.abs(v.speed)/Ct.maxSpeed,1),c=v.speed>=0?1:-1,l=.2+a*.8-Math.max(0,a-.72)*.34;v.heading+=n*Ct.handling*l*(s?1.3:1)*c*i;const h=s&&a>.16?-n*.28*a*c:0;v.driftAngle=Ae.damp(v.driftAngle,h,s?4.2:Ct.traction,i);const u=v.heading+v.driftAngle;KS(u,v.position.x,v.position.z,Hc),v.velocity.copy(Hc).multiplyScalar(v.speed),v.position.x+=v.velocity.x*i,v.position.z+=v.velocity.z*i;let d=!1,f=!1;if(J.arenaKind==="capsule"&&J.bowl){const x=Ff(J.bowl,v.position.x,v.position.z,v.heading,Rn,Ln);x.collided?(v.position.x=x.x,v.position.z=x.z,d=!0,f=!0,$S(x.normalX,x.normalZ,u),v.wallContactNormal.set(-x.normalX,0,-x.normalZ),U.dataset.guardContact="active",U.dataset.guardPenetration=x.penetration.toFixed(3),v.collisionCooldown<=0&&Yt("UPPER GUARD // SLIDE BACK INTO THE ARENA")):U.dataset.guardContact="clear"}else{const x=Math.hypot(v.position.x,v.position.z),R=Gn-(Rn+Ln);if(x>R){const A=v.position.x/x,P=v.position.z/x;v.position.x=A*R,v.position.z=P*R,d=!0,Yt("BOUNDARY IMPACT // TURN BACK")}}for(const x of ur)if(!(v.position.y>x.top+.2))for(const R of[-Rn,0,Rn])_S(x,R)&&(d=!0);for(const x of go)for(const R of[-Rn,0,Rn])gS(x,R)&&(d=!0);const m=v.activeRamp;let _=Ea(v.position.x,v.position.z);if(d&&(Math.abs(v.speed)>6&&(Aa(Math.round(Math.abs(v.speed)*.32)),Yt("SCRAP COLLISION // HULL DAMAGED")),f||(v.speed*=-.18),v.driftAngle*=.25),_=Ea(v.position.x,v.position.z),_){if(v.activeRamp=_.ramp,v.grounded=!0,v.verticalVelocity=0,v.position.y=_.height+.06,_.ramp.kind==="wall"){const x=_.localZ,R=Ae.smoothstep(x,.08,.42),A=Ft(J.bowl,v.position.x,v.position.z),P=Math.sin(u)*A.outwardX+Math.cos(u)*A.outwardZ,D=Ae.smoothstep(x,.62,.9);v.speed-=P*(5.8*R+12*D)*i,v.speed=Ae.clamp(v.speed,-11,o),v.driftAngle=Ae.damp(v.driftAngle,0,5+R*7,i),v.speed*=Math.exp(-.18*D*i),U.dataset.wallRideGrip=(R*.85+.15).toFixed(2),U.dataset.wallSurfaceBand=A.band,U.dataset.wallSurfaceNormal=`${A.normal.x.toFixed(2)},${A.normal.y.toFixed(2)},${A.normal.z.toFixed(2)}`,x>.18&&Math.abs(v.speed)>5&&(U.dataset.wallRideContact="passed")}}else{const x=pt(v.position.x,v.position.z)+.06;if(m&&m.kind!=="wall"&&v.position.y>x+.45){const R=Math.cos(u-m.rotation),A=v.speed*R*m.rise/m.length,P=Math.abs(v.speed)*Math.max(0,-Math.sin(v.pitch));v.verticalVelocity=Math.max(0,A,P),v.grounded=!1}v.activeRamp=null,v.grounded?v.position.y=x:(v.verticalVelocity-=12.5*i,v.position.y+=v.verticalVelocity*i,v.position.y<=x&&(v.position.y=x,v.verticalVelocity=0,v.grounded=!0))}const g=_i(v.position.x+Math.sin(v.heading)*2,v.position.z+Math.cos(v.heading)*2),p=_i(v.position.x-Math.sin(v.heading)*2,v.position.z-Math.cos(v.heading)*2),y=_i(v.position.x+Math.cos(v.heading)*1.2,v.position.z-Math.sin(v.heading)*1.2),S=_i(v.position.x-Math.cos(v.heading)*1.2,v.position.z+Math.sin(v.heading)*1.2);J.arenaKind==="capsule"?jS(i,s,n,a):(v.pitch=v.grounded?Math.atan2(p-g,4):0,v.roll=(v.grounded?Math.atan2(y-S,2.4):0)+(s?n*.055*a:0),v.orientation.setFromEuler(cs.set(v.pitch,v.heading,v.roll,"YXZ")),v.surfaceNormal.set(0,1,0),v.projectedForward.set(Math.sin(v.heading),0,Math.cos(v.heading)),v.wallAssistActive=!1,v.downforce=0),v.velocity.copy(Hc).multiplyScalar(v.speed),Or.forEach(x=>x.rotation.x+=v.speed*i/.57),da.forEach(x=>x.rotation.y=Ae.damp(x.rotation.y,-n*.38,12,i));for(const x of Dh)!x.collected&&x.group.position.distanceTo(v.position)<2.25&&YS(x);for(const x of dr)x.alive&&x.group.position.distanceTo(v.position)<1.85&&Math.abs(v.speed)>5&&(jl(x,Math.abs(v.speed)*1.8),v.speed*=-.35,Aa(4));if(!Number.isFinite(v.position.x)||!Number.isFinite(v.position.y)||!Number.isFinite(v.position.z)||v.position.y<-8||Math.abs(v.position.x)>Gn*1.8||Math.abs(v.position.z)>Gn*1.8){Yt("OUT OF BOUNDS // AUTO RECOVERY"),_o();return}XS(i)}function ba(i){he.health<=0||Jt==="ended"||(he.health=Math.max(0,he.health-i),gs("confirmed-hit",.18,.025,he.position),U.dataset.opponentHealth=he.health.toFixed(0),he.health<=0&&(Fh(he.position,1,28),zt.visible=!1,Yt("RIVAL SCRAPPED // ROUND SECURED"),QM()))}function ZS(i){if(Jt!=="active"||he.health<=0)return;he.collisionCooldown=Math.max(0,he.collisionCooldown-i),he.fireCooldown-=i;const e=v.position.x-he.position.x,t=v.position.z-he.position.z,n=Math.hypot(e,t),s=Math.atan2(e,t)+he.steerBias*(n<18?.72:.18),r=Math.atan2(Math.sin(s-he.heading),Math.cos(s-he.heading));he.heading+=Ae.clamp(r,-1.35*i,1.35*i);const o=n>13?17:n<8?6:11;if(he.speed=Ae.damp(he.speed,o,2.2,i),he.position.x+=Math.sin(he.heading)*he.speed*i,he.position.z+=Math.cos(he.heading)*he.speed*i,J.arenaKind==="capsule"&&J.bowl){const c=Ff(J.bowl,he.position.x,he.position.z,he.heading,Rn,Ln);c.collided&&(he.position.x=c.x,he.position.z=c.z,he.heading+=he.steerBias*.7,he.steerBias*=-1)}else{const c=Gn-4,l=Math.hypot(he.position.x,he.position.z);l>c&&(he.position.multiplyScalar(c/l),he.heading=Math.atan2(-he.position.x,-he.position.z)+he.steerBias*.5,he.steerBias*=-1)}he.position.y=_i(he.position.x,he.position.z)+.06,zt.position.copy(he.position),zt.rotation.y=he.heading;const a=zt.userData.turret;if(a){const c=Math.atan2(e,t);a.rotation.y=Ae.damp(a.rotation.y,Math.atan2(Math.sin(c-he.heading),Math.cos(c-he.heading)),8,i)}n<62&&he.fireCooldown<=0&&(WS(),he.fireCooldown=.82+Math.random()*.45),n<2.35&&he.collisionCooldown<=0&&(he.collisionCooldown=.8,Aa(10),ba(5),he.heading+=Math.PI*.65)}function Aa(i){v.collisionCooldown>0||Jt==="ended"||(v.collisionCooldown=.45,v.health=Math.max(0,v.health-i*(1-(Ct.armor??0))),gs("vehicle-hit",.26,.045,v.position),v.health<=0&&(Yt("RIG DISABLED // RIVAL TAKES THE ROUND"),eS()))}function JS(i){kc.setFromCamera(Kl,Xt);const e=kc.intersectObjects(Ss,!0)[0];if(e)$t.copy(e.point);else{if(Nd.constant=0,!kc.ray.intersectPlane(Nd,$t))return;$t.y=_i($t.x,$t.z)}const t=new b;ps.getWorldPosition(t);const n=$t.x-t.x,s=$t.z-t.z;if(Math.hypot(n,s)<1.8)return;let o=Math.atan2(n,s)-v.heading;o=Math.atan2(Math.sin(o),Math.cos(o)),ps.rotation.y=Ae.damp(ps.rotation.y,o,12,i);const a=-Math.atan2($t.y-t.y,Math.hypot(n,s));ql.rotation.x=Ae.damp(ql.rotation.x,Ae.clamp(a,-.42,.2),11,i),Zf.copy($t).sub(t).normalize(),ka=!0,_s.position.copy($t),_s.position.y+=.09,_s.scale.setScalar(1+Math.sin(Es*5)*.06)}const ta=new b,Li=new b,Bd=new b,Ws=new b;function Gc(i,e,t){const n=e.clone().sub(i),s=n.lengthSq();if(s<=1e-6)return t.distanceToSquared(i);const r=Ae.clamp(t.clone().sub(i).dot(n)/s,0,1);return Bd.copy(i).addScaledVector(n,r),Bd.distanceToSquared(t)}function QS(i,e,t,n=!1,s=!1){if(U.dataset.lastWeaponImpact=i.kind,i.owner==="player"&&i.kind==="rocket"){for(const o of dr){if(!o.alive)continue;Li.copy(o.group.position).add(new b(0,1.4,0));const a=Li.distanceTo(e);if(a>i.splashRadius)continue;const c=o===t?i.damage:i.damage*Math.max(.28,1-a/i.splashRadius);jl(o,c)}const r=he.position.clone().add(new b(0,1.1,0)).distanceTo(e);he.health>0&&r<=i.splashRadius&&ba(i.damage*Math.max(.3,1-r/i.splashRadius))}else i.owner==="player"&&t&&jl(t,i.damage);i.owner==="player"&&n&&i.kind!=="rocket"&&ba(i.damage),i.owner==="opponent"&&s&&Aa(i.damage),i.kind==="rocket"?(tp(i.id),Ta("rocket",e,!0),Fh(e,.2,22)):i.kind==="sniper"?HS(e):Ta("mg",e,!1)}function zd(i){for(let e=ms.length-1;e>=0;e--){const t=ms[e];ta.copy(t.mesh.position),t.mesh.position.addScaledVector(t.velocity,i),t.life-=i,t.kind==="rocket"&&(t.trailTimer-=i,t.trailTimer<=0&&(t.trailTimer=.035,GS(t.mesh.position,t.id)));let n=null;if(t.owner==="player")for(const c of dr){if(!c.alive)continue;Li.copy(c.group.position).add(new b(0,1.4,0));const l=t.kind==="rocket"?1.15:.95;if(Gc(ta,t.mesh.position,Li)<l*l){n=c;break}}Li.copy(he.position).add(new b(0,1.1,0));const s=t.owner==="player"&&he.health>0&&Gc(ta,t.mesh.position,Li)<(t.kind==="rocket"?1.6:1.35)**2;Li.copy(v.position).add(new b(0,1.05,0));const r=t.owner==="opponent"&&v.health>0&&Gc(ta,t.mesh.position,Li)<1.4**2,o=_i(t.mesh.position.x,t.mesh.position.z)+.1,a=t.mesh.position.y<=o;(n||s||r||a||t.life<=0)&&(n?Ws.copy(n.group.position).add(new b(0,1.4,0)):s?Ws.copy(he.position).add(new b(0,1.1,0)):r?Ws.copy(v.position).add(new b(0,1.05,0)):(Ws.copy(t.mesh.position),a&&(Ws.y=o+.08)),(n||s||r||a||t.kind==="rocket")&&QS(t,Ws,n,s,r),t.kind==="rocket"&&tp(t.id),Re.remove(t.mesh),ms.splice(e,1))}for(let e=Vi.length-1;e>=0;e--){const t=Vi[e];t.life-=i,t.mesh.position.addScaledVector(t.velocity,i),t.velocity.y-=3.5*i,t.mesh.scale.multiplyScalar(1+i*.55);const n=t.mesh.material;n.opacity=Math.max(0,Math.min(n.opacity,t.life*.45)),t.life<=0&&(Re.remove(t.mesh),n.dispose(),Vi.splice(e,1))}for(let e=$n.length-1;e>=0;e--){const t=$n[e];t.life-=i;const n=Ae.clamp(1-t.life/t.maxLife,0,1),s=Math.pow(1-n,1.45);t.group.userData.billboard&&t.group.quaternion.copy(Xt.quaternion),t.kind!=="laser"&&t.group.scale.setScalar((t.kind==="impact"?.48:.68)+n*t.growth),t.group.traverse(r=>{if(r instanceof vr&&(r.intensity*=Math.max(0,1-i*8)),!(r instanceof j))return;const o=Array.isArray(r.material)?r.material:[r.material];for(const a of o)a.transparent=!0,a.opacity=Number(a.userData.baseOpacity??1)*s}),t.life<=0&&(Re.remove(t.group),$n.splice(e,1))}Qs=Math.max(0,Qs-i),Qs===0&&(er=0);for(const e of dr)e.alive&&(e.hitFlash>0?(e.hitFlash-=i,e.group.getObjectByName("target-body").material.emissive.setHex(16739116)):e.group.getObjectByName("target-body").material.emissive.setHex(0))}const Wc=new b;function ew(){return J.arenaKind==="capsule"&&J.bowl?{kind:"capsule",straightHalfLength:J.bowl.straightHalfLength,outerRadius:J.bowl.outerRadius}:{kind:"ring",radius:Gn}}function Oh(){const i=Oi.mode==="enemy";$e.cameraMode.textContent=i?"ENEMY CAM":"CHASE CAM",$e.cameraMode.parentElement?.classList.toggle("enemy",i),U.dataset.cameraMode=Oi.mode,U.dataset.enemyCam=i?"locked":"off"}function tw(i){Qs>0?Wc.set((Math.random()-.5)*er,(Math.random()-.5)*er,(Math.random()-.5)*er):Wc.set(0,0,0);const e=Oi.update({dt:i,playerPosition:Zt.position,playerHeading:v.heading,enemyPosition:zt.position,enemyAvailable:he.health>0&&zt.visible,groundHeight:_i,bounds:ew(),shake:Wc});e.fellBackToChase&&(Oh(),Yt("NO TARGET // CHASE CAM")),U.dataset.cameraAimMode=e.mode==="enemy"?"enemy-target":"drive-forward",U.dataset.cameraPositionMode=e.mode,U.dataset.cameraTargetDistance=e.targetDistance?.toFixed(2)??"none",U.dataset.cameraPosition=`${Xt.position.x.toFixed(2)},${Xt.position.y.toFixed(2)},${Xt.position.z.toFixed(2)}`,U.dataset.cameraLookAt=`${Oi.lookAt.x.toFixed(2)},${Oi.lookAt.y.toFixed(2)},${Oi.lookAt.z.toFixed(2)}`}function nw(i){for(const e of Dh){if(e.collected)continue;e.group.rotation.y+=i*.8;const t=e.group.children[2];t.position.y=1.1+Math.sin(Es*2.4+e.group.position.x)*.18}}function rp(){$e.boost.textContent=String(Math.round(v.boost)),$e.health.textContent=String(Math.round(v.health)),$e.healthBar.style.width=`${v.health/Ct.maxHealth*100}%`,$e.boostBar.style.width=`${v.boost}%`,$e.rivalHealth.textContent=String(Math.round(he.health)),$e.rivalHealthBar.style.width=`${he.health/he.maxHealth*100}%`,$e.boostMeter.classList.toggle("recharging",v.boost<99.5&&!tt.has("ShiftLeft")),U.dataset.boost=v.boost.toFixed(1),U.dataset.boostRechargeRate="6-per-second";const i=Ea(v.position.x,v.position.z),e=pt(v.position.x,v.position.z),t=J.arenaKind==="capsule"?"flat-floor":"terrain";U.dataset.groundContact=v.grounded?v.activeRamp?v.activeRamp.kind:t:"airborne",U.dataset.aimRay=ka?"locked":"searching",U.dataset.aimPoint=`${$t.x.toFixed(1)},${$t.y.toFixed(1)},${$t.z.toFixed(1)}`,U.dataset.vehiclePosition=`${v.position.x.toFixed(1)},${v.position.y.toFixed(1)},${v.position.z.toFixed(1)}`,U.dataset.surfaceLabel=i?.ramp.label??(J.arenaKind==="capsule"?"flat center floor":"base terrain"),U.dataset.surfaceHeight=(i?.height??e).toFixed(2),U.dataset.baseGroundHeight=e.toFixed(2),U.dataset.contactDelta=((i?.height??e)-e).toFixed(2),U.dataset.heightMismatch=i?Math.abs(v.position.y-.06-i.height).toFixed(3):"0.000",U.dataset.wallRideActive=String(i?.ramp.kind==="wall"),Mr.position.set(v.position.x,(i?.height??e)+.16,v.position.z),Kn.set(0,1,0).applyQuaternion(v.orientation).normalize(),ws.copy(v.position).addScaledVector(Kn,.7);for(const a of[Vl,Gl,Wl,ha,ua])a.position.copy(ws);Vl.setDirection(Kn),Gl.setDirection(v.surfaceNormal),Wl.setDirection(v.projectedForward);const n=v.velocity.length();ha.setDirection(n>.01?v.velocity.clone().normalize():v.projectedForward),ha.setLength(Ae.clamp(n*.24,1.2,7),.6,.3);const s=v.wallContactNormal.lengthSq()>.001;ua.visible=as&&s,s&&ua.setDirection(v.wallContactNormal);const r=J.arenaKind==="capsule"&&J.bowl?Ft(J.bowl,v.position.x,v.position.z):null,o=v.grounded?U.dataset.guardContact==="active"?"upper-lip":r&&r.progress>.001?r.band:"flat-floor":"airborne";U.dataset.surfaceType=o,U.dataset.carUp=`${Kn.x.toFixed(2)},${Kn.y.toFixed(2)},${Kn.z.toFixed(2)}`,U.dataset.surfaceNormal=`${v.surfaceNormal.x.toFixed(2)},${v.surfaceNormal.y.toFixed(2)},${v.surfaceNormal.z.toFixed(2)}`,U.dataset.projectedForward=`${v.projectedForward.x.toFixed(2)},${v.projectedForward.y.toFixed(2)},${v.projectedForward.z.toFixed(2)}`,U.dataset.velocityVector=`${v.velocity.x.toFixed(2)},${v.velocity.y.toFixed(2)},${v.velocity.z.toFixed(2)}`,U.dataset.wallContactNormal=`${v.wallContactNormal.x.toFixed(2)},${v.wallContactNormal.y.toFixed(2)},${v.wallContactNormal.z.toFixed(2)}`,U.dataset.wallAssist=v.wallAssistActive?"active":"off",U.dataset.wallDownforce=v.downforce.toFixed(2),U.dataset.carRoll=v.roll.toFixed(3),U.dataset.carPitch=v.pitch.toFixed(3),Wi&&v.activeRamp?.kind==="ramp"&&(U.dataset.rampDriveUp="passed"),Wi&&!v.grounded&&U.dataset.rampDriveUp==="passed"&&(U.dataset.rampLaunch="passed")}const op=new b(0,0,-28),ap=new Un,kd=new Un;function cp(){op.copy(v.position),ap.copy(v.orientation)}function iw(i){Zt.position.lerpVectors(op,v.position,i),kd.slerpQuaternions(ap,v.orientation,i),Zt.quaternion.copy(kd)}function _o(i=!0){const e=J.spawn;cn(!1),v.position.set(e.x,pt(e.x,e.z)+.06,e.z),v.heading=e.heading,v.speed=0,v.driftAngle=0,v.verticalVelocity=0,v.pitch=0,v.roll=0,v.grounded=!0,v.activeRamp=null,v.health=Ct.maxHealth,v.boost=100,v.orientation.setFromAxisAngle(Xi,e.heading),v.surfaceNormal.copy(Xi),v.projectedForward.set(Math.sin(e.heading),0,Math.cos(e.heading)),v.velocity.set(0,0,0),v.wallContactNormal.set(0,0,0),v.wallAssistActive=!1,v.downforce=0,cp(),Zt.position.copy(v.position),Zt.quaternion.copy(v.orientation),Oi.snapToChase(v.position,v.heading,_i),i&&Yt("RIG RECOVERED // SYSTEMS ONLINE")}function sw(){const i=J.opponentSpawn;he.position.set(i.x,pt(i.x,i.z)+.06,i.z),he.heading=i.heading,he.speed=0,he.health=he.maxHealth,he.fireCooldown=1.25,he.collisionCooldown=0,zt.visible=!0,zt.position.copy(he.position),zt.rotation.y=he.heading,U.dataset.opponentHealth=String(he.health),U.dataset.aiState="countdown-ready"}function rw(){Jt="countdown",Bf=performance.now()+ZM*1e3,kl=3,clearTimeout(Yl),$e.message.classList.remove("show"),$e.countdown.hidden=!1,$e.countdownArena.textContent=J.name,$e.countdownValue.textContent="3",$e.countdown.querySelector("span").textContent="GET READY",U.dataset.roundPhase=Jt}function ow(){if(Jt!=="countdown")return;const i=Math.max(0,(Bf-performance.now())/1e3),e=Math.max(0,Math.ceil(i-JM));e!==kl&&(kl=e,$e.countdownValue.textContent=e>0?String(e):"DRIVE",$e.countdown.querySelector("span").textContent=e>0?"GET READY":"FIGHT BACK"),i<=0&&(Jt="active",$e.countdown.hidden=!0,U.dataset.roundPhase=Jt,U.dataset.aiState="hunting",Yt(`ROUND ${ro} // ${J.name.toUpperCase()}`))}function lp(i){if(zl)return;zl=!0,Jt="ended",cn(!1),i==="player"?gi=Math.min(3,gi+1):Ui=Math.min(3,Ui+1),Rh(),U.dataset.roundWinner=i,U.dataset.roundPhase=Jt,$e.countdown.hidden=!1,$e.countdownValue.textContent=i==="player"?"WIN":"LOST",$e.countdownArena.textContent=gi>=3||Ui>=3?"MATCH COMPLETE":`ROUND ${ro} COMPLETE`,$e.countdown.querySelector("span").textContent="NEXT ARENA INCOMING",Wi||fr||lo||ho||za||Nh||(clearTimeout(Rd),Rd=window.setTimeout(aw,gi>=3||Ui>=3?4200:2800))}function aw(){const i=gi>=3||Ui>=3,e=J.id==="dustring"?"ovalbowl":"dustring",t=new URL(location.href);t.searchParams.set("level",e),t.searchParams.set("round",String(i?1:ro+1)),t.searchParams.set("pw",String(i?0:gi)),t.searchParams.set("ew",String(i?0:Ui)),t.searchParams.set("auto","1"),location.assign(t)}function hp(i){Qn&&(xi=i??!xi,xi&&cn(!1),$e.pause.hidden=!xi)}function cw(i){$e.controls.classList.toggle("closed",!0)}function lw(){Qn&&(as=!as,yi.forEach(i=>i.visible=as),Br.visible=as,$e.debug.hidden=!as,Yt(as?`PHYSICS DEBUG // ${v.grounded?"GROUNDED":"AIRBORNE"}`:"PHYSICS DEBUG // OFF"))}function hw(){if(!Qn)return;const i=Oi.toggle(he.health>0&&zt.visible);Oh(),Yt(i.noTarget?"NO TARGET // CHASE CAM":i.mode==="enemy"?"ENEMY CAM // ON":"CHASE CAM // ON")}U.dataset.assetsLoaded="0";U.dataset.assetErrors="0";U.dataset.assetManifest="riggedAssetManifest";function uw(i){const e=new b(0,0,-i.length*.5-3).applyAxisAngle(new b(0,1,0),i.rotation),t=i.position.x+e.x,n=i.position.z+e.z;v.position.set(t,pt(t,n)+.06,n),v.heading=i.rotation,v.speed=0,v.driftAngle=0,v.verticalVelocity=0,v.pitch=0,v.roll=0,v.grounded=!0,v.activeRamp=null,v.orientation.setFromAxisAngle(Xi,i.rotation),Zt.position.copy(v.position),Zt.quaternion.copy(v.orientation)}function dw(){const i=oo.filter(n=>n.kind==="ramp"),e=[];let t=0;for(const n of i){uw(n);let s=!1,r=!1,o=!1;tt.add("KeyW");for(let a=0;a<600;a++)if(Es+=Ut,Ts(Ut),rp(),v.activeRamp?.label===n.label&&(s=!0),s&&!v.grounded&&(r=!0),r&&v.grounded&&v.activeRamp?.label!==n.label){o=!0;break}tt.delete("KeyW"),o&&t++,(!s||!r||!o)&&e.push(`${n.label}:${s?r?"no-landing":"no-launch":"no-contact"}`)}return U.dataset.allRampExpected=String(i.length),U.dataset.allRampPasses=String(i.length-e.length),U.dataset.allRampLandings=String(t),U.dataset.allRampFailures=e.join("|")||"none",U.dataset.rampDriveUp=e.some(n=>n.endsWith("no-contact"))?"failed":"passed",U.dataset.rampLaunch=e.some(n=>n.endsWith("no-launch"))?"failed":"passed",U.dataset.rampLanding=t===i.length?"passed":"failed",e.length===0}function fw(i){const e=i.outerRadius-i.flatRadius,t=i.flatRadius+e*.48,n=Math.PI*.25,s=[{label:"straight-along-bank",x:t,z:-30,heading:0,steps:180,drive:!1,steer:"none"},{label:"turn-left-while-climbing",x:i.flatRadius+2,z:-18,heading:Math.PI/2,steps:170,drive:!0,steer:"left"},{label:"turn-right-while-climbing",x:i.flatRadius+2,z:18,heading:Math.PI/2,steps:170,drive:!0,steer:"right"},{label:"steer-around-rounded-cap",x:Math.cos(n)*t,z:i.straightHalfLength+Math.sin(n)*t,heading:-n,steps:210,drive:!1,steer:"cap"}],r=[];let o=0,a=0,c=1;for(const h of s){v.position.set(h.x,pt(h.x,h.z)+.06,h.z),v.heading=h.heading,v.speed=h.drive?8:14,v.driftAngle=0,v.verticalVelocity=0,v.pitch=0,v.roll=0,v.grounded=!0,v.activeRamp=null,v.orientation.setFromAxisAngle(Xi,h.heading);let u=0,d=0,f=0,m=1,_=!0,g=!0;h.drive&&tt.add("KeyW");for(let y=0;y<h.steps;y++){h.steer==="left"&&y>=34&&y<72?tt.add("KeyA"):tt.delete("KeyA"),h.steer==="right"&&y>=34&&y<72||h.steer==="cap"&&y%6===0?tt.add("KeyD"):tt.delete("KeyD"),Es+=Ut,Ts(Ut),h.steer==="cap"&&tt.delete("KeyD");const S=Ft(i,v.position.x,v.position.z);S.progress>.001&&u++,Kn.set(0,1,0).applyQuaternion(v.orientation).normalize();const x=Kn.dot(S.normal);y>18&&(m=Math.min(m,x)),d=Math.max(d,Math.abs(v.roll)),f=Math.max(f,Math.abs(v.pitch)),g=g&&Number.isFinite(v.position.x)&&Number.isFinite(v.position.y)&&Number.isFinite(v.position.z)&&Number.isFinite(v.roll)&&Number.isFinite(v.pitch);for(const R of[-Rn,0,Rn]){const A=Ft(i,v.position.x+Math.sin(v.heading)*R,v.position.z+Math.cos(v.heading)*R);_=_&&A.distance<=i.outerRadius-Ln+.05}}tt.delete("KeyW"),tt.delete("KeyA"),tt.delete("KeyD"),o=Math.max(o,d),a=Math.max(a,f),c=Math.min(c,m),g&&_&&u>=Math.min(90,h.steps*.6)&&d<=Bi+.025&&f<=Bi+.025&&m>.72||r.push(`${h.label}:${g?_?u<90?"lost-wall":d>Bi+.025?"roll":f>Bi+.025?"pitch":"up-vector":"escaped":"non-finite"}`)}const l=r.length===0;return U.dataset.wallTurningSmoke=l?"passed":"failed",U.dataset.wallTurningCases=String(s.length),U.dataset.wallTurningFailures=r.join("|")||"none",U.dataset.wallTurningMaxRoll=Ae.radToDeg(o).toFixed(1),U.dataset.wallTurningMaxPitch=Ae.radToDeg(a).toFixed(1),U.dataset.wallTurningMinUpDot=c.toFixed(3),l}function pw(){if(J.arenaKind!=="capsule"||!J.bowl)return U.dataset.wallRideSmoke="skipped-non-bowl",!0;const i=J.bowl,e=[{label:"east-straight",x:i.flatRadius-5,z:0,heading:Math.PI/2},{label:"east-diagonal",x:i.flatRadius-5,z:-14,heading:Math.PI/2-.34},{label:"north-cap",x:0,z:i.straightHalfLength+i.flatRadius-5,heading:0},{label:"north-cap-diagonal",x:-14,z:i.straightHalfLength+i.flatRadius-5,heading:.34}],t=[];let n=0,s=0,r=!0,o=!0;for(const h of e){v.position.set(h.x,pt(h.x,h.z)+.06,h.z),v.heading=h.heading,v.speed=8,v.driftAngle=0,v.verticalVelocity=0,v.pitch=0,v.roll=0,v.grounded=!0,v.activeRamp=null,v.orientation.setFromAxisAngle(Xi,h.heading);let u=0,d=0,f=!1;tt.add("KeyW");for(let p=0;p<210;p++){Es+=Ut,Ts(Ut);const y=Ft(i,v.position.x,v.position.z);u=Math.max(u,y.progress),d=Math.max(d,v.position.y),n=Math.max(n,u),s=Math.max(s,d),f=f||y.progress>.001;for(const S of[-Rn,0,Rn]){const x=Ft(i,v.position.x+Math.sin(v.heading)*S,v.position.z+Math.cos(v.heading)*S);r=r&&x.distance<=i.outerRadius-Ln+.05}}const m=Ft(i,v.position.x,v.position.z);v.heading=Math.atan2(-m.outwardX,-m.outwardZ),v.driftAngle=0,v.speed=Math.max(7,Math.abs(v.speed));for(let p=0;p<180;p++)Es+=Ut,Ts(Ut);tt.delete("KeyW");const g=Ft(i,v.position.x,v.position.z).progress<.08&&v.grounded;o=o&&g,(!f||u<=.28||d<=2||!g)&&t.push(`${h.label}:${f?u<=.28?"too-low":d<=2?"no-rise":"no-return":"no-contact"}`)}const a=fw(i);let c=t.length===0&&r&&o&&a;U.dataset.wallRideApproaches=String(e.length),U.dataset.wallRideFailures=t.join("|")||"none",U.dataset.wallRideMaxProgress=n.toFixed(2),U.dataset.wallRideMaxHeight=s.toFixed(2),U.dataset.wallRideBoundary=r?"passed":"failed",U.dataset.wallRideReturn=o?"passed":"failed",_o(),Kn.set(0,1,0).applyQuaternion(v.orientation);const l=v.position.x===J.spawn.x&&v.position.z===J.spawn.z&&v.speed===0&&v.velocity.lengthSq()===0&&v.verticalVelocity===0&&v.pitch===0&&v.roll===0&&Kn.dot(Xi)>.999&&v.grounded&&!v.wallAssistActive&&Ft(i,v.position.x,v.position.z).progress===0;return U.dataset.wallReset=l?"passed":"failed",c=c&&l,U.dataset.wallRideSmoke=c?"passed":"failed",c}function mw(){let i=!0;if((Wi||fr)&&(i=dw()&&i),(Wi||fr)&&(U.dataset.physicsSmoke=i?"passed":"failed"),lo&&(U.dataset.physicsSmoke=pw()?"passed":"failed"),ho){$t.copy(v.position).add(new b(0,1,40)),ka=!0,Zt.updateMatrixWorld(!0),cn(!0);for(let n=0;n<120;n++)sp(Ut);cn(!1);const e=Number(U.dataset.shotsFired??0),t=Math.ceil(2*rn.fireRate)+1;U.dataset.holdFireSmoke=e>=2&&e<=t?"passed":"failed",U.dataset.fireRateLimited=e<=t?"passed":"failed",U.dataset.holdFireShots=String(e)}if(za){v.boost=100,tt.add("KeyW"),tt.add("ShiftLeft");for(let n=0;n<60;n++)Ts(Ut);const e=v.boost;tt.delete("ShiftLeft");for(let n=0;n<60;n++)Ts(Ut);const t=v.boost;tt.clear(),U.dataset.boostAfterUse=e.toFixed(1),U.dataset.boostAfterRecharge=t.toFixed(1),U.dataset.boostSmoke=e<80&&t>e&&t<95?"passed":"failed",_o()}Nh&&(Jt="active",ba(999),U.dataset.roundHudSmoke=gi===1&&U.dataset.roundWinner==="player"?"passed":"failed")}async function up(i){Qn||Fc||(Fc=!0,J=Ma[i],Gn=J.radius,Yt(`ASSEMBLING // ${J.name.toUpperCase()}`),document.querySelectorAll("[data-level]").forEach(e=>e.disabled=!0),await uS(),await fS(),xS(),vS(),MS(),SS(),J.pickups.forEach(e=>bS(e.x,e.z,e.kind)),J.targets.forEach(e=>AS(e.x,e.z,e.rotation)),zl=!1,Rh(),U.dataset.targetsRemaining=String(J.targets.length),U.dataset.prototype="rigged-1v1-combat",U.dataset.audioSystem="hrtf-directional-combat-sfx-v2",U.dataset.arenaLayout=J.id,U.dataset.arenaKind=J.arenaKind,U.dataset.arenaRadius=String(Gn),U.dataset.ringInnerRadius=String(J.ringInnerRadius),U.dataset.ringOuterRadius=String(J.ringOuterRadius),U.dataset.rampColliders=String(oo.filter(e=>e.kind==="ramp").length),U.dataset.bridgeColliders=String(oo.filter(e=>e.kind==="bridge").length),U.dataset.heightfieldColliders=String(fs.length),U.dataset.majorColliders=String(ur.length+go.length+(J.arenaKind==="capsule"?3:0)),U.dataset.vehicleCollider="three-disc-capsule-2.24x4.14x0.72",U.dataset.shotsFired="0",U.dataset.aiShotsFired="0",U.dataset.fireHeld="false",U.dataset.racekartAssets="modular-racekart-track-hilly",U.dataset.racingAssetsUsage=J.arenaKind==="capsule"?"rim-railings":"ramps-fences-props",U.dataset.colliderSource=J.arenaKind==="capsule"?"analytic-capsule-bands":"visual-asset-heightfields",U.dataset.wallRideContact="pending",U.dataset.mapRotation="alternate-every-round",mS(),Qn=!0,Fc=!1,xi=!1,$e.levelSelect.hidden=!0,_o(!1),sw(),Oh(),rw(),bh.get("auto")==="1"&&Uh(),mw(),Jt!=="ended"&&(Wi||fr||lo||ho||za)&&Yt(Wi?"RAMP SUITE // AUTO DRIVE":fr?"ALL RAMPS // AUTO DRIVE":lo?"WALL-RIDE SUITE // AUTO DRIVE":ho?"HOLD-FIRE SMOKE TEST // COMPLETE":"BOOST STAMINA TEST // COMPLETE"))}document.querySelectorAll("[data-level]").forEach(i=>{i.addEventListener("click",()=>{up(i.dataset.level)})});document.querySelectorAll("[data-weapon]").forEach(i=>{i.addEventListener("click",()=>Ba(i.dataset.weapon))});Ba("mg",!1);Rh();const Dr=new URLSearchParams(location.search).get("level");(Wi||fr||lo||ho||za||Nh||Dr&&Dr in Ma)&&up(Dr&&Dr in Ma?Dr:Uf);window.addEventListener("keydown",i=>{if(["KeyW","KeyA","KeyS","KeyD","Space","ShiftLeft","KeyC","KeyF","F3"].includes(i.code)&&i.preventDefault(),!(i.repeat||!Qn)){if(i.code==="Escape"){hp();return}if(i.code==="KeyC"){hw();return}i.code==="KeyR"&&_o(),(i.code==="KeyB"||i.code==="KeyH"||i.code==="F3")&&lw(),i.code==="KeyF"&&cn(!0),tt.add(i.code)}});window.addEventListener("keyup",i=>{tt.delete(i.code),i.code==="KeyF"&&cn(!1)});U.addEventListener("pointermove",i=>{const e=U.getBoundingClientRect();Kl.x=(i.clientX-e.left)/e.width*2-1,Kl.y=-(i.clientY-e.top)/e.height*2+1;const t=Et("crosshair");t.style.left=`${i.clientX}px`,t.style.top=`${i.clientY}px`});U.addEventListener("pointerdown",i=>{i.button===0&&cn(!0)});window.addEventListener("pointerup",i=>{i.button===0&&cn(!1)});U.addEventListener("pointerleave",i=>{i.buttons&1&&cn(!1)});window.addEventListener("blur",()=>{tt.clear(),cn(!1)});document.addEventListener("visibilitychange",()=>{document.hidden&&(tt.clear(),cn(!1))});window.addEventListener("keydown",Uh,{capture:!0});window.addEventListener("pointerdown",Uh,{capture:!0});U.addEventListener("contextmenu",i=>i.preventDefault());Et("controls-close").addEventListener("click",()=>cw());Et("resume-button").addEventListener("click",()=>hp(!1));document.querySelectorAll("[data-key]").forEach(i=>{const e=i.dataset.key??"",t=s=>{s.preventDefault(),e==="Fire"?cn(!0):tt.add(e)},n=s=>{s.preventDefault(),e==="Fire"?cn(!1):tt.delete(e)};i.addEventListener("pointerdown",t),i.addEventListener("pointerup",n),i.addEventListener("pointercancel",n),i.addEventListener("pointerleave",n)});window.addEventListener("resize",()=>{Xt.aspect=innerWidth/innerHeight,Xt.updateProjectionMatrix(),Mn.setSize(innerWidth,innerHeight,!1),Mn.setPixelRatio(Math.min(devicePixelRatio,1.5))});const gw=new s0;let rs=0,Xc=0,qc=0,Xs=1/60,$l=0;function _w(i){if(Xs=Ae.lerp(Xs,i,.08),qc+=i,qc<.2)return;qc=0;const e=Xs>0?1/Xs:0,t=v.grounded?v.activeRamp?v.activeRamp.kind.toUpperCase():J.arenaKind==="capsule"?"FLAT FLOOR":"TERRAIN":"AIRBORNE",n=J.arenaKind==="capsule"?3:fs.length;$e.debug.textContent=`COLLISION DEBUG
${t} // ${(U.dataset.surfaceType??"flat-floor").toUpperCase()} // ${U.dataset.surfaceLabel??"base terrain"}
UP [${U.dataset.carUp??"0.00,1.00,0.00"}]  NORMAL [${U.dataset.surfaceNormal??"0.00,1.00,0.00"}]
SURFACE FWD [${U.dataset.projectedForward??"0.00,0.00,1.00"}]
VELOCITY [${U.dataset.velocityVector??"0.00,0.00,0.00"}]  CONTACT N [${U.dataset.wallContactNormal??"0.00,0.00,0.00"}]
ASSIST ${(U.dataset.wallAssist??"off").toUpperCase()}  DOWNFORCE ${U.dataset.wallDownforce??"0.00"}  ROLL ${Ae.radToDeg(v.roll).toFixed(1)}°  PITCH ${Ae.radToDeg(v.pitch).toFixed(1)}°
SURFACE ${U.dataset.surfaceHeight??"0.00"}M  BASE ${U.dataset.baseGroundHeight??"0.00"}M  ERROR ${U.dataset.heightMismatch??"0.000"}M
${Math.abs(v.speed*4.2).toFixed(0)} KM/H  ${e.toFixed(0)} FPS  ${(Xs*1e3).toFixed(1)} MS FRAME
${$l.toFixed(2)} MS PHYSICS  60 HZ  ${n} COLLIDERS
${Mn.info.render.calls} DRAWS  ${Mn.info.render.triangles.toLocaleString()} TRIS  ${Re.children.length+ms.length+Vi.length} OBJECTS`,U.dataset.physicsFps="60",U.dataset.frameDeltaMs=(Xs*1e3).toFixed(2),U.dataset.physicsStepMs=$l.toFixed(2)}function dp(){requestAnimationFrame(dp);const i=Math.min(gw.getDelta(),lS);if(!xi&&Qn&&ow(),Fa.rotation.y+=i*.0025,Lh.rotation.y-=i*.0015,BS(i),!xi&&Qn){if(Jt==="active"){rs=Math.min(rs+i,Ut*Ld);const e=performance.now();let t=0;for(;rs>=Ut&&t<Ld;)cp(),Es+=Ut,Ts(Ut),ZS(Ut),sp(Ut),zd(Ut),rs-=Ut,t++;$l=performance.now()-e,iw(rs/Ut)}else rs=0,Jt==="ended"&&zd(i);tw(i),JS(i),nw(i),Xc+=i,Xc>.1&&(Xc=0,rp())}else rs=0;Mn.render(Re,Xt),_w(i)}dp();function Et(i){const e=document.getElementById(i);if(!e)throw new Error(`Missing #${i}`);return e}
