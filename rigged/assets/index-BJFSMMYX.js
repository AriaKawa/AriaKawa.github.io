(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Zu="179",Mg=0,ed=1,Sg=2,Ju=1,wg=2,wi=3,ai=0,xn=1,Vt=2,$i=0,ar=1,vr=2,td=3,nd=4,bg=5,Ss=100,Tg=101,Eg=102,Ag=103,Rg=104,Cg=200,Pg=201,Lg=202,Ig=203,Vl=204,Gl=205,Dg=206,Ng=207,Ug=208,Fg=209,Og=210,kg=211,Bg=212,zg=213,Hg=214,Wl=0,Xl=1,ql=2,xr=3,Yl=4,Kl=5,jl=6,$l=7,Qu=0,Vg=1,Gg=2,Zi=0,Wg=1,Xg=2,qg=3,pp=4,Yg=5,Kg=6,jg=7,id="attached",$g="detached",mp=300,yr=301,Mr=302,zo=303,Zl=304,cc=306,ns=1e3,qi=1001,Ho=1002,fn=1003,gp=1004,Jr=1005,En=1006,To=1007,Ai=1008,oi=1009,_p=1010,vp=1011,ha=1012,eh=1013,Ps=1014,jn=1015,Ra=1016,th=1017,nh=1018,da=1020,xp=35902,yp=1021,Mp=1022,Fn=1023,fa=1026,pa=1027,ih=1028,sh=1029,Sp=1030,rh=1031,ah=1033,Eo=33776,Ao=33777,Ro=33778,Co=33779,Jl=35840,Ql=35841,eu=35842,tu=35843,nu=36196,iu=37492,su=37496,ru=37808,au=37809,ou=37810,cu=37811,lu=37812,uu=37813,hu=37814,du=37815,fu=37816,pu=37817,mu=37818,gu=37819,_u=37820,vu=37821,Po=36492,xu=36494,yu=36495,wp=36283,Mu=36284,Su=36285,wu=36286,ma=2300,ga=2301,Rc=2302,sd=2400,rd=2401,ad=2402,Zg=2500,Jg=0,bp=1,bu=2,Qg=3200,e0=3201,oh=0,t0=1,Xi="",At="srgb",mn="srgb-linear",Vo="linear",_t="srgb",Vs=7680,od=519,n0=512,i0=513,s0=514,Tp=515,r0=516,a0=517,o0=518,c0=519,Tu=35044,cd="300 es",ii=2e3,Go=2001;class Lr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ld=1234567;const ia=Math.PI/180,Sr=180/Math.PI;function kn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]+"-"+tn[e&255]+tn[e>>8&255]+"-"+tn[e>>16&15|64]+tn[e>>24&255]+"-"+tn[t&63|128]+tn[t>>8&255]+"-"+tn[t>>16&255]+tn[t>>24&255]+tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]).toLowerCase()}function Je(i,e,t){return Math.max(e,Math.min(t,i))}function ch(i,e){return(i%e+e)%e}function l0(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function u0(i,e,t){return i!==e?(t-i)/(e-i):0}function sa(i,e,t){return(1-t)*i+t*e}function h0(i,e,t,n){return sa(i,e,1-Math.exp(-t*n))}function d0(i,e=1){return e-Math.abs(ch(i,e*2)-e)}function f0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function p0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function m0(i,e){return i+Math.floor(Math.random()*(e-i+1))}function g0(i,e){return i+Math.random()*(e-i)}function _0(i){return i*(.5-Math.random())}function v0(i){i!==void 0&&(ld=i);let e=ld+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function x0(i){return i*ia}function y0(i){return i*Sr}function M0(i){return(i&i-1)===0&&i!==0}function S0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function w0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function b0(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),m=a((n-e)/2);switch(s){case"XYX":i.set(o*u,c*h,c*d,o*l);break;case"YZY":i.set(c*d,o*u,c*h,o*l);break;case"ZXZ":i.set(c*h,c*d,o*u,o*l);break;case"XZX":i.set(o*u,c*m,c*f,o*l);break;case"YXY":i.set(c*f,o*u,c*m,o*l);break;case"ZYZ":i.set(c*m,c*f,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function qn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ee={DEG2RAD:ia,RAD2DEG:Sr,generateUUID:kn,clamp:Je,euclideanModulo:ch,mapLinear:l0,inverseLerp:u0,lerp:sa,damp:h0,pingpong:d0,smoothstep:f0,smootherstep:p0,randInt:m0,randFloat:g0,randFloatSpread:_0,seededRandom:v0,degToRad:x0,radToDeg:y0,isPowerOfTwo:M0,ceilPowerOfTwo:S0,floorPowerOfTwo:w0,setQuaternionFromProperEuler:b0,normalize:pt,denormalize:qn};class ue{constructor(e=0,t=0){ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Hn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3];const d=r[a+0],f=r[a+1],m=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=_;return}if(h!==_||c!==d||l!==f||u!==m){let g=1-o;const p=c*d+l*f+u*m+h*_,y=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const R=Math.sqrt(S),A=Math.atan2(R,p*y);g=Math.sin(g*A)/R,o=Math.sin(o*A)/R}const v=o*y;if(c=c*g+d*v,l=l*g+f*v,u=u*g+m*v,h=h*g+_*v,g===1-o){const R=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=R,l*=R,u*=R,h*=R}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[a],d=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+u*h+c*f-l*d,e[t+1]=c*m+u*d+l*h-o*f,e[t+2]=l*m+u*f+o*d-c*h,e[t+3]=u*m-o*h-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),h=o(r/2),d=c(n/2),f=c(s/2),m=c(r/2);switch(a){case"XYZ":this._x=d*u*h+l*f*m,this._y=l*f*h-d*u*m,this._z=l*u*m+d*f*h,this._w=l*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+l*f*m,this._y=l*f*h-d*u*m,this._z=l*u*m-d*f*h,this._w=l*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-l*f*m,this._y=l*f*h+d*u*m,this._z=l*u*m+d*f*h,this._w=l*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-l*f*m,this._y=l*f*h+d*u*m,this._z=l*u*m-d*f*h,this._w=l*u*h+d*f*m;break;case"YZX":this._x=d*u*h+l*f*m,this._y=l*f*h+d*u*m,this._z=l*u*m-d*f*h,this._w=l*u*h-d*f*m;break;case"XZY":this._x=d*u*h-l*f*m,this._y=l*f*h-d*u*m,this._z=l*u*m+d*f*h,this._w=l*u*h+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-t)*u)/l,d=Math.sin(t*u)/l;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class E{constructor(e=0,t=0,n=0){E.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ud.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ud.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),u=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=s+c*h+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Cc.copy(this).projectOnVector(e),this.sub(Cc)}reflect(e){return this.sub(Cc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Cc=new E,ud=new Hn;class Ke{constructor(e,t,n,s,r,a,o,c,l){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],f=n[5],m=n[8],_=s[0],g=s[3],p=s[6],y=s[1],S=s[4],v=s[7],R=s[2],A=s[5],L=s[8];return r[0]=a*_+o*y+c*R,r[3]=a*g+o*S+c*A,r[6]=a*p+o*v+c*L,r[1]=l*_+u*y+h*R,r[4]=l*g+u*S+h*A,r[7]=l*p+u*v+h*L,r[2]=d*_+f*y+m*R,r[5]=d*g+f*S+m*A,r[8]=d*p+f*v+m*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,d=o*c-u*r,f=l*r-a*c,m=t*h+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=h*_,e[1]=(s*l-u*n)*_,e[2]=(o*n-s*a)*_,e[3]=d*_,e[4]=(u*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Pc.makeScale(e,t)),this}rotate(e){return this.premultiply(Pc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Pc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Pc=new Ke;function Ep(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function _a(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function T0(){const i=_a("canvas");return i.style.display="block",i}const hd={};function or(i){i in hd||(hd[i]=!0,console.warn(i))}function E0(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const dd=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fd=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function A0(){const i={enabled:!0,workingColorSpace:mn,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===_t&&(s.r=Pi(s.r),s.g=Pi(s.g),s.b=Pi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===_t&&(s.r=cr(s.r),s.g=cr(s.g),s.b=cr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Xi?Vo:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return or("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return or("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[mn]:{primaries:e,whitePoint:n,transfer:Vo,toXYZ:dd,fromXYZ:fd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:At},outputColorSpaceConfig:{drawingBufferColorSpace:At}},[At]:{primaries:e,whitePoint:n,transfer:_t,toXYZ:dd,fromXYZ:fd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:At}}}),i}const Qe=A0();function Pi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function cr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Gs;class R0{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Gs===void 0&&(Gs=_a("canvas")),Gs.width=e.width,Gs.height=e.height;const s=Gs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Gs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=_a("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Pi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Pi(t[n]/255)*255):t[n]=Pi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let C0=0;class lh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:C0++}),this.uuid=kn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Lc(s[a].image)):r.push(Lc(s[a]))}else r=Lc(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Lc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?R0.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let P0=0;const Ic=new E;class en extends Lr{constructor(e=en.DEFAULT_IMAGE,t=en.DEFAULT_MAPPING,n=qi,s=qi,r=En,a=Ai,o=Fn,c=oi,l=en.DEFAULT_ANISOTROPY,u=Xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:P0++}),this.uuid=kn(),this.name="",this.source=new lh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ic).x}get height(){return this.source.getSize(Ic).y}get depth(){return this.source.getSize(Ic).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==mp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ns:e.x=e.x-Math.floor(e.x);break;case qi:e.x=e.x<0?0:1;break;case Ho:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ns:e.y=e.y-Math.floor(e.y);break;case qi:e.y=e.y<0?0:1;break;case Ho:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=mp;en.DEFAULT_ANISOTROPY=1;class ut{constructor(e=0,t=0,n=0,s=1){ut.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,v=(f+1)/2,R=(p+1)/2,A=(u+d)/4,L=(h+_)/4,N=(m+g)/4;return S>v&&S>R?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=A/n,r=L/n):v>R?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=A/s,r=N/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=L/r,s=N/r),this.set(n,s,r,t),this}let y=Math.sqrt((g-m)*(g-m)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(h-_)/y,this.z=(d-u)/y,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class L0 extends Lr{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:En,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new en(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:En,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new lh(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ls extends L0{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ap extends en{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class I0 extends en{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cn{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Gn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Gn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Gn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Gn):Gn.fromBufferAttribute(r,a),Gn.applyMatrix4(e.matrixWorld),this.expandByPoint(Gn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ba.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ba.copy(n.boundingBox)),Ba.applyMatrix4(e.matrixWorld),this.union(Ba)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Gn),Gn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hr),za.subVectors(this.max,Hr),Ws.subVectors(e.a,Hr),Xs.subVectors(e.b,Hr),qs.subVectors(e.c,Hr),Fi.subVectors(Xs,Ws),Oi.subVectors(qs,Xs),ls.subVectors(Ws,qs);let t=[0,-Fi.z,Fi.y,0,-Oi.z,Oi.y,0,-ls.z,ls.y,Fi.z,0,-Fi.x,Oi.z,0,-Oi.x,ls.z,0,-ls.x,-Fi.y,Fi.x,0,-Oi.y,Oi.x,0,-ls.y,ls.x,0];return!Dc(t,Ws,Xs,qs,za)||(t=[1,0,0,0,1,0,0,0,1],!Dc(t,Ws,Xs,qs,za))?!1:(Ha.crossVectors(Fi,Oi),t=[Ha.x,Ha.y,Ha.z],Dc(t,Ws,Xs,qs,za))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Gn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Gn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const fi=[new E,new E,new E,new E,new E,new E,new E,new E],Gn=new E,Ba=new Cn,Ws=new E,Xs=new E,qs=new E,Fi=new E,Oi=new E,ls=new E,Hr=new E,za=new E,Ha=new E,us=new E;function Dc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){us.fromArray(i,r);const o=s.x*Math.abs(us.x)+s.y*Math.abs(us.y)+s.z*Math.abs(us.z),c=e.dot(us),l=t.dot(us),u=n.dot(us);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const D0=new Cn,Vr=new E,Nc=new E;class li{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):D0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Vr.subVectors(e,this.center);const t=Vr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Vr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Nc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Vr.copy(e.center).add(Nc)),this.expandByPoint(Vr.copy(e.center).sub(Nc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const pi=new E,Uc=new E,Va=new E,ki=new E,Fc=new E,Ga=new E,Oc=new E;class Ca{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pi.copy(this.origin).addScaledVector(this.direction,t),pi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Uc.copy(e).add(t).multiplyScalar(.5),Va.copy(t).sub(e).normalize(),ki.copy(this.origin).sub(Uc);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Va),o=ki.dot(this.direction),c=-ki.dot(Va),l=ki.lengthSq(),u=Math.abs(1-a*a);let h,d,f,m;if(u>0)if(h=a*c-o,d=a*o-c,m=r*u,h>=0)if(d>=-m)if(d<=m){const _=1/u;h*=_,d*=_,f=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d<=-m?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l):d<=m?(h=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Uc).addScaledVector(Va,d),f}intersectSphere(e,t){pi.subVectors(e.center,this.origin);const n=pi.dot(this.direction),s=pi.dot(pi)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,pi)!==null}intersectTriangle(e,t,n,s,r){Fc.subVectors(t,e),Ga.subVectors(n,e),Oc.crossVectors(Fc,Ga);let a=this.direction.dot(Oc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ki.subVectors(this.origin,e);const c=o*this.direction.dot(Ga.crossVectors(ki,Ga));if(c<0)return null;const l=o*this.direction.dot(Fc.cross(ki));if(l<0||c+l>a)return null;const u=-o*ki.dot(Oc);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class qe{constructor(e,t,n,s,r,a,o,c,l,u,h,d,f,m,_,g){qe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,u,h,d,f,m,_,g)}set(e,t,n,s,r,a,o,c,l,u,h,d,f,m,_,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Ys.setFromMatrixColumn(e,0).length(),r=1/Ys.setFromMatrixColumn(e,1).length(),a=1/Ys.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=a*u,f=a*h,m=o*u,_=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=f+m*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=m+f*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*u,f=c*h,m=l*u,_=l*h;t[0]=d+_*o,t[4]=m*o-f,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-m,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*u,f=c*h,m=l*u,_=l*h;t[0]=d-_*o,t[4]=-a*h,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*u,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*u,f=a*h,m=o*u,_=o*h;t[0]=c*u,t[4]=m*l-f,t[8]=d*l+_,t[1]=c*h,t[5]=_*l+d,t[9]=f*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,f=a*l,m=o*c,_=o*l;t[0]=c*u,t[4]=_-d*h,t[8]=m*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=f*h+m,t[10]=d-_*h}else if(e.order==="XZY"){const d=a*c,f=a*l,m=o*c,_=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=d*h+_,t[5]=a*u,t[9]=f*h-m,t[2]=m*h-f,t[6]=o*u,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(N0,e,U0)}lookAt(e,t,n){const s=this.elements;return wn.subVectors(e,t),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Bi.crossVectors(n,wn),Bi.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Bi.crossVectors(n,wn)),Bi.normalize(),Wa.crossVectors(wn,Bi),s[0]=Bi.x,s[4]=Wa.x,s[8]=wn.x,s[1]=Bi.y,s[5]=Wa.y,s[9]=wn.y,s[2]=Bi.z,s[6]=Wa.z,s[10]=wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],y=n[3],S=n[7],v=n[11],R=n[15],A=s[0],L=s[4],N=s[8],b=s[12],T=s[1],I=s[5],H=s[9],G=s[13],q=s[2],ee=s[6],j=s[10],te=s[14],W=s[3],de=s[7],_e=s[11],Ie=s[15];return r[0]=a*A+o*T+c*q+l*W,r[4]=a*L+o*I+c*ee+l*de,r[8]=a*N+o*H+c*j+l*_e,r[12]=a*b+o*G+c*te+l*Ie,r[1]=u*A+h*T+d*q+f*W,r[5]=u*L+h*I+d*ee+f*de,r[9]=u*N+h*H+d*j+f*_e,r[13]=u*b+h*G+d*te+f*Ie,r[2]=m*A+_*T+g*q+p*W,r[6]=m*L+_*I+g*ee+p*de,r[10]=m*N+_*H+g*j+p*_e,r[14]=m*b+_*G+g*te+p*Ie,r[3]=y*A+S*T+v*q+R*W,r[7]=y*L+S*I+v*ee+R*de,r[11]=y*N+S*H+v*j+R*_e,r[15]=y*b+S*G+v*te+R*Ie,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],d=e[10],f=e[14],m=e[3],_=e[7],g=e[11],p=e[15];return m*(+r*c*h-s*l*h-r*o*d+n*l*d+s*o*f-n*c*f)+_*(+t*c*f-t*l*d+r*a*d-s*a*f+s*l*u-r*c*u)+g*(+t*l*h-t*o*f-r*a*h+n*a*f+r*o*u-n*l*u)+p*(-s*o*u-t*c*h+t*o*d+s*a*h-n*a*d+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],d=e[10],f=e[11],m=e[12],_=e[13],g=e[14],p=e[15],y=h*g*l-_*d*l+_*c*f-o*g*f-h*c*p+o*d*p,S=m*d*l-u*g*l-m*c*f+a*g*f+u*c*p-a*d*p,v=u*_*l-m*h*l+m*o*f-a*_*f-u*o*p+a*h*p,R=m*h*c-u*_*c-m*o*d+a*_*d+u*o*g-a*h*g,A=t*y+n*S+s*v+r*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/A;return e[0]=y*L,e[1]=(_*d*r-h*g*r-_*s*f+n*g*f+h*s*p-n*d*p)*L,e[2]=(o*g*r-_*c*r+_*s*l-n*g*l-o*s*p+n*c*p)*L,e[3]=(h*c*r-o*d*r-h*s*l+n*d*l+o*s*f-n*c*f)*L,e[4]=S*L,e[5]=(u*g*r-m*d*r+m*s*f-t*g*f-u*s*p+t*d*p)*L,e[6]=(m*c*r-a*g*r-m*s*l+t*g*l+a*s*p-t*c*p)*L,e[7]=(a*d*r-u*c*r+u*s*l-t*d*l-a*s*f+t*c*f)*L,e[8]=v*L,e[9]=(m*h*r-u*_*r-m*n*f+t*_*f+u*n*p-t*h*p)*L,e[10]=(a*_*r-m*o*r+m*n*l-t*_*l-a*n*p+t*o*p)*L,e[11]=(u*o*r-a*h*r-u*n*l+t*h*l+a*n*f-t*o*f)*L,e[12]=R*L,e[13]=(u*_*s-m*h*s+m*n*d-t*_*d-u*n*g+t*h*g)*L,e[14]=(m*o*s-a*_*s-m*n*c+t*_*c+a*n*g-t*o*g)*L,e[15]=(a*h*s-u*o*s+u*n*c-t*h*c-a*n*d+t*o*d)*L,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,h=o+o,d=r*l,f=r*u,m=r*h,_=a*u,g=a*h,p=o*h,y=c*l,S=c*u,v=c*h,R=n.x,A=n.y,L=n.z;return s[0]=(1-(_+p))*R,s[1]=(f+v)*R,s[2]=(m-S)*R,s[3]=0,s[4]=(f-v)*A,s[5]=(1-(d+p))*A,s[6]=(g+y)*A,s[7]=0,s[8]=(m+S)*L,s[9]=(g-y)*L,s[10]=(1-(d+_))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Ys.set(s[0],s[1],s[2]).length();const a=Ys.set(s[4],s[5],s[6]).length(),o=Ys.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Wn.copy(this);const l=1/r,u=1/a,h=1/o;return Wn.elements[0]*=l,Wn.elements[1]*=l,Wn.elements[2]*=l,Wn.elements[4]*=u,Wn.elements[5]*=u,Wn.elements[6]*=u,Wn.elements[8]*=h,Wn.elements[9]*=h,Wn.elements[10]*=h,t.setFromRotationMatrix(Wn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=ii,c=!1){const l=this.elements,u=2*r/(t-e),h=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s);let m,_;if(c)m=r/(a-r),_=a*r/(a-r);else if(o===ii)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Go)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=ii,c=!1){const l=this.elements,u=2/(t-e),h=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s);let m,_;if(c)m=1/(a-r),_=a/(a-r);else if(o===ii)m=-2/(a-r),_=-(a+r)/(a-r);else if(o===Go)m=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=h,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ys=new E,Wn=new qe,N0=new E(0,0,0),U0=new E(1,1,1),Bi=new E,Wa=new E,wn=new E,pd=new qe,md=new Hn;class zn{constructor(e=0,t=0,n=0,s=zn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Je(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return pd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(pd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return md.setFromEuler(this),this.setFromQuaternion(md,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}zn.DEFAULT_ORDER="XYZ";class uh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let F0=0;const gd=new E,Ks=new Hn,mi=new qe,Xa=new E,Gr=new E,O0=new E,k0=new Hn,_d=new E(1,0,0),vd=new E(0,1,0),xd=new E(0,0,1),yd={type:"added"},B0={type:"removed"},js={type:"childadded",child:null},kc={type:"childremoved",child:null};class yt extends Lr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:F0++}),this.uuid=kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new E,t=new zn,n=new Hn,s=new E(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new qe},normalMatrix:{value:new Ke}}),this.matrix=new qe,this.matrixWorld=new qe,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new uh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ks.setFromAxisAngle(e,t),this.quaternion.multiply(Ks),this}rotateOnWorldAxis(e,t){return Ks.setFromAxisAngle(e,t),this.quaternion.premultiply(Ks),this}rotateX(e){return this.rotateOnAxis(_d,e)}rotateY(e){return this.rotateOnAxis(vd,e)}rotateZ(e){return this.rotateOnAxis(xd,e)}translateOnAxis(e,t){return gd.copy(e).applyQuaternion(this.quaternion),this.position.add(gd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_d,e)}translateY(e){return this.translateOnAxis(vd,e)}translateZ(e){return this.translateOnAxis(xd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Xa.copy(e):Xa.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mi.lookAt(Gr,Xa,this.up):mi.lookAt(Xa,Gr,this.up),this.quaternion.setFromRotationMatrix(mi),s&&(mi.extractRotation(s.matrixWorld),Ks.setFromRotationMatrix(mi),this.quaternion.premultiply(Ks.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yd),js.child=e,this.dispatchEvent(js),js.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(B0),kc.child=e,this.dispatchEvent(kc),kc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(mi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yd),js.child=e,this.dispatchEvent(js),js.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,e,O0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,k0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}yt.DEFAULT_UP=new E(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Xn=new E,gi=new E,Bc=new E,_i=new E,$s=new E,Zs=new E,Md=new E,zc=new E,Hc=new E,Vc=new E,Gc=new ut,Wc=new ut,Xc=new ut;class Yn{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Xn.subVectors(e,t),s.cross(Xn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Xn.subVectors(s,t),gi.subVectors(n,t),Bc.subVectors(e,t);const a=Xn.dot(Xn),o=Xn.dot(gi),c=Xn.dot(Bc),l=gi.dot(gi),u=gi.dot(Bc),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(l*c-o*u)*d,m=(a*u-o*c)*d;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,_i)===null?!1:_i.x>=0&&_i.y>=0&&_i.x+_i.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,_i)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,_i.x),c.addScaledVector(a,_i.y),c.addScaledVector(o,_i.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Gc.setScalar(0),Wc.setScalar(0),Xc.setScalar(0),Gc.fromBufferAttribute(e,t),Wc.fromBufferAttribute(e,n),Xc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Gc,r.x),a.addScaledVector(Wc,r.y),a.addScaledVector(Xc,r.z),a}static isFrontFacing(e,t,n,s){return Xn.subVectors(n,t),gi.subVectors(e,t),Xn.cross(gi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xn.subVectors(this.c,this.b),gi.subVectors(this.a,this.b),Xn.cross(gi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Yn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Yn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Yn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Yn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Yn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;$s.subVectors(s,n),Zs.subVectors(r,n),zc.subVectors(e,n);const c=$s.dot(zc),l=Zs.dot(zc);if(c<=0&&l<=0)return t.copy(n);Hc.subVectors(e,s);const u=$s.dot(Hc),h=Zs.dot(Hc);if(u>=0&&h<=u)return t.copy(s);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector($s,a);Vc.subVectors(e,r);const f=$s.dot(Vc),m=Zs.dot(Vc);if(m>=0&&f<=m)return t.copy(r);const _=f*l-c*m;if(_<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Zs,o);const g=u*m-f*h;if(g<=0&&h-u>=0&&f-m>=0)return Md.subVectors(r,s),o=(h-u)/(h-u+(f-m)),t.copy(s).addScaledVector(Md,o);const p=1/(g+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector($s,a).addScaledVector(Zs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Rp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zi={h:0,s:0,l:0},qa={h:0,s:0,l:0};function qc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class xe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=At){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Qe.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Qe.workingColorSpace){if(e=ch(e,1),t=Je(t,0,1),n=Je(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=qc(a,r,e+1/3),this.g=qc(a,r,e),this.b=qc(a,r,e-1/3)}return Qe.colorSpaceToWorking(this,s),this}setStyle(e,t=At){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=At){const n=Rp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pi(e.r),this.g=Pi(e.g),this.b=Pi(e.b),this}copyLinearToSRGB(e){return this.r=cr(e.r),this.g=cr(e.g),this.b=cr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=At){return Qe.workingToColorSpace(nn.copy(this),e),Math.round(Je(nn.r*255,0,255))*65536+Math.round(Je(nn.g*255,0,255))*256+Math.round(Je(nn.b*255,0,255))}getHexString(e=At){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(nn.copy(this),t);const n=nn.r,s=nn.g,r=nn.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(nn.copy(this),t),e.r=nn.r,e.g=nn.g,e.b=nn.b,e}getStyle(e=At){Qe.workingToColorSpace(nn.copy(this),e);const t=nn.r,n=nn.g,s=nn.b;return e!==At?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(zi),this.setHSL(zi.h+e,zi.s+t,zi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(zi),e.getHSL(qa);const n=sa(zi.h,qa.h,t),s=sa(zi.s,qa.s,t),r=sa(zi.l,qa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const nn=new xe;xe.NAMES=Rp;let z0=0;class Rn extends Lr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:z0++}),this.uuid=kn(),this.name="",this.type="Material",this.blending=ar,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vl,this.blendDst=Gl,this.blendEquation=Ss,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new xe(0,0,0),this.blendAlpha=0,this.depthFunc=xr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=od,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vs,this.stencilZFail=Vs,this.stencilZPass=Vs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ar&&(n.blending=this.blending),this.side!==ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Vl&&(n.blendSrc=this.blendSrc),this.blendDst!==Gl&&(n.blendDst=this.blendDst),this.blendEquation!==Ss&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==xr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==od&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Vs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Vs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class tt extends Rn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=Qu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Bt=new E,Ya=new ue;let H0=0;class qt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:H0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Tu,this.updateRanges=[],this.gpuType=jn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ya.fromBufferAttribute(this,t),Ya.applyMatrix3(e),this.setXY(t,Ya.x,Ya.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=qn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=qn(t,this.array)),t}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=qn(t,this.array)),t}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=qn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=qn(t,this.array)),t}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),s=pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),s=pt(s,this.array),r=pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Tu&&(e.usage=this.usage),e}}class Cp extends qt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Pp extends qt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ge extends qt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let V0=0;const In=new qe,Yc=new yt,Js=new E,bn=new Cn,Wr=new Cn,Jt=new E;class bt extends Lr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:V0++}),this.uuid=kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ep(e)?Pp:Cp)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,t,n){return In.makeTranslation(e,t,n),this.applyMatrix4(In),this}scale(e,t,n){return In.makeScale(e,t,n),this.applyMatrix4(In),this}lookAt(e){return Yc.lookAt(e),Yc.updateMatrix(),this.applyMatrix4(Yc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Js).negate(),this.translate(Js.x,Js.y,Js.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ge(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];bn.setFromBufferAttribute(r),this.morphTargetsRelative?(Jt.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(Jt),Jt.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(Jt)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new li);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(e){const n=this.boundingSphere.center;if(bn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Wr.setFromBufferAttribute(o),this.morphTargetsRelative?(Jt.addVectors(bn.min,Wr.min),bn.expandByPoint(Jt),Jt.addVectors(bn.max,Wr.max),bn.expandByPoint(Jt)):(bn.expandByPoint(Wr.min),bn.expandByPoint(Wr.max))}bn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Jt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Jt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Jt.fromBufferAttribute(o,l),c&&(Js.fromBufferAttribute(e,l),Jt.add(Js)),s=Math.max(s,n.distanceToSquared(Jt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new qt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let N=0;N<n.count;N++)o[N]=new E,c[N]=new E;const l=new E,u=new E,h=new E,d=new ue,f=new ue,m=new ue,_=new E,g=new E;function p(N,b,T){l.fromBufferAttribute(n,N),u.fromBufferAttribute(n,b),h.fromBufferAttribute(n,T),d.fromBufferAttribute(r,N),f.fromBufferAttribute(r,b),m.fromBufferAttribute(r,T),u.sub(l),h.sub(l),f.sub(d),m.sub(d);const I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(I),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(I),o[N].add(_),o[b].add(_),o[T].add(_),c[N].add(g),c[b].add(g),c[T].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let N=0,b=y.length;N<b;++N){const T=y[N],I=T.start,H=T.count;for(let G=I,q=I+H;G<q;G+=3)p(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const S=new E,v=new E,R=new E,A=new E;function L(N){R.fromBufferAttribute(s,N),A.copy(R);const b=o[N];S.copy(b),S.sub(R.multiplyScalar(R.dot(b))).normalize(),v.crossVectors(A,b);const I=v.dot(c[N])<0?-1:1;a.setXYZW(N,S.x,S.y,S.z,I)}for(let N=0,b=y.length;N<b;++N){const T=y[N],I=T.start,H=T.count;for(let G=I,q=I+H;G<q;G+=3)L(e.getX(G+0)),L(e.getX(G+1)),L(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new qt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new E,r=new E,a=new E,o=new E,c=new E,l=new E,u=new E,h=new E;if(e)for(let d=0,f=e.count;d<f;d+=3){const m=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),o.add(u),c.add(u),l.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Jt.fromBufferAttribute(e,t),Jt.normalize(),e.setXYZ(t,Jt.x,Jt.y,Jt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u);let f=0,m=0;for(let _=0,g=c.length;_<g;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*u;for(let p=0;p<u;p++)d[m++]=l[f++]}return new qt(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new bt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const d=l[u],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const f=l[h];u.push(f.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Sd=new qe,hs=new Ca,Ka=new li,wd=new E,ja=new E,$a=new E,Za=new E,Kc=new E,Ja=new E,bd=new E,Qa=new E;class Z extends yt{constructor(e=new bt,t=new tt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Ja.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(Kc.fromBufferAttribute(h,e),a?Ja.addScaledVector(Kc,u):Ja.addScaledVector(Kc.sub(t),u))}t.add(Ja)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ka.copy(n.boundingSphere),Ka.applyMatrix4(r),hs.copy(e.ray).recast(e.near),!(Ka.containsPoint(hs.origin)===!1&&(hs.intersectSphere(Ka,wd)===null||hs.origin.distanceToSquared(wd)>(e.far-e.near)**2))&&(Sd.copy(r).invert(),hs.copy(e.ray).applyMatrix4(Sd),!(n.boundingBox!==null&&hs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,hs)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a[g.materialIndex],y=Math.max(g.start,f.start),S=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let v=y,R=S;v<R;v+=3){const A=o.getX(v),L=o.getX(v+1),N=o.getX(v+2);s=eo(this,p,e,n,l,u,h,A,L,N),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const y=o.getX(g),S=o.getX(g+1),v=o.getX(g+2);s=eo(this,a,e,n,l,u,h,y,S,v),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a[g.materialIndex],y=Math.max(g.start,f.start),S=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let v=y,R=S;v<R;v+=3){const A=v,L=v+1,N=v+2;s=eo(this,p,e,n,l,u,h,A,L,N),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const y=g,S=g+1,v=g+2;s=eo(this,a,e,n,l,u,h,y,S,v),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function G0(i,e,t,n,s,r,a,o){let c;if(e.side===xn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===ai,o),c===null)return null;Qa.copy(o),Qa.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Qa);return l<t.near||l>t.far?null:{distance:l,point:Qa.clone(),object:i}}function eo(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,ja),i.getVertexPosition(c,$a),i.getVertexPosition(l,Za);const u=G0(i,e,t,n,ja,$a,Za,bd);if(u){const h=new E;Yn.getBarycoord(bd,ja,$a,Za,h),s&&(u.uv=Yn.getInterpolatedAttribute(s,o,c,l,h,new ue)),r&&(u.uv1=Yn.getInterpolatedAttribute(r,o,c,l,h,new ue)),a&&(u.normal=Yn.getInterpolatedAttribute(a,o,c,l,h,new E),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new E,materialIndex:0};Yn.getNormal(ja,$a,Za,d.normal),u.face=d,u.barycoord=h}return u}class it extends bt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let d=0,f=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Ge(l,3)),this.setAttribute("normal",new Ge(u,3)),this.setAttribute("uv",new Ge(h,2));function m(_,g,p,y,S,v,R,A,L,N,b){const T=v/L,I=R/N,H=v/2,G=R/2,q=A/2,ee=L+1,j=N+1;let te=0,W=0;const de=new E;for(let _e=0;_e<j;_e++){const Ie=_e*I-G;for(let $e=0;$e<ee;$e++){const Rt=$e*T-H;de[_]=Rt*y,de[g]=Ie*S,de[p]=q,l.push(de.x,de.y,de.z),de[_]=0,de[g]=0,de[p]=A>0?1:-1,u.push(de.x,de.y,de.z),h.push($e/L),h.push(1-_e/N),te+=1}}for(let _e=0;_e<N;_e++)for(let Ie=0;Ie<L;Ie++){const $e=d+Ie+ee*_e,Rt=d+Ie+ee*(_e+1),vt=d+(Ie+1)+ee*(_e+1),K=d+(Ie+1)+ee*_e;c.push($e,Rt,K),c.push(Rt,vt,K),W+=6}o.addGroup(f,W,b),f+=W,d+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new it(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function wr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function un(i){const e={};for(let t=0;t<i.length;t++){const n=wr(i[t]);for(const s in n)e[s]=n[s]}return e}function W0(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Lp(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const X0={clone:wr,merge:un};var q0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Y0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ii extends Rn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=q0,this.fragmentShader=Y0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=wr(e.uniforms),this.uniformsGroups=W0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ip extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qe,this.projectionMatrix=new qe,this.projectionMatrixInverse=new qe,this.coordinateSystem=ii,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Hi=new E,Td=new ue,Ed=new ue;class dn extends Ip{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Sr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ia*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Sr*2*Math.atan(Math.tan(ia*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z),Hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z)}getViewSize(e,t){return this.getViewBounds(e,Td,Ed),t.subVectors(Ed,Td)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ia*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Qs=-90,er=1;class K0 extends yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new dn(Qs,er,e,t);s.layers=this.layers,this.add(s);const r=new dn(Qs,er,e,t);r.layers=this.layers,this.add(r);const a=new dn(Qs,er,e,t);a.layers=this.layers,this.add(a);const o=new dn(Qs,er,e,t);o.layers=this.layers,this.add(o);const c=new dn(Qs,er,e,t);c.layers=this.layers,this.add(c);const l=new dn(Qs,er,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===ii)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Go)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Dp extends en{constructor(e=[],t=yr,n,s,r,a,o,c,l,u){super(e,t,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class j0 extends Ls{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Dp(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new it(5,5,5),r=new Ii({name:"CubemapFromEquirect",uniforms:wr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:xn,blending:$i});r.uniforms.tEquirect.value=t;const a=new Z(s,r),o=t.minFilter;return t.minFilter===Ai&&(t.minFilter=En),new K0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class ct extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $0={type:"move"};class jc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ct,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ct,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ct,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,m=.005;l.inputState.pinching&&d>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent($0)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ct;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class hh{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new xe(e),this.density=t}clone(){return new hh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Z0 extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zn,this.environmentIntensity=1,this.environmentRotation=new zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class J0{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Tu,this.updateRanges=[],this.version=0,this.uuid=kn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ln=new E;class dh{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ln.fromBufferAttribute(this,t),ln.applyMatrix4(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ln.fromBufferAttribute(this,t),ln.applyNormalMatrix(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ln.fromBufferAttribute(this,t),ln.transformDirection(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=qn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=qn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=qn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=qn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=qn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),s=pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),s=pt(s,this.array),r=pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new qt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new dh(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Ad=new E,Rd=new ut,Cd=new ut,Q0=new E,Pd=new qe,to=new E,$c=new li,Ld=new qe,Zc=new Ca;class e_ extends Z{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=id,this.bindMatrix=new qe,this.bindMatrixInverse=new qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Cn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,to),this.boundingBox.expandByPoint(to)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new li),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,to),this.boundingSphere.expandByPoint(to)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$c.copy(this.boundingSphere),$c.applyMatrix4(s),e.ray.intersectsSphere($c)!==!1&&(Ld.copy(s).invert(),Zc.copy(e.ray).applyMatrix4(Ld),!(this.boundingBox!==null&&Zc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Zc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ut,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===id?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===$g?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;Rd.fromBufferAttribute(s.attributes.skinIndex,e),Cd.fromBufferAttribute(s.attributes.skinWeight,e),Ad.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=Cd.getComponent(r);if(a!==0){const o=Rd.getComponent(r);Pd.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Q0.copy(Ad).applyMatrix4(Pd),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Np extends yt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Up extends en{constructor(e=null,t=1,n=1,s,r,a,o,c,l=fn,u=fn,h,d){super(null,a,o,c,l,u,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Id=new qe,t_=new qe;class fh{constructor(e=[],t=[]){this.uuid=kn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new qe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new qe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:t_;Id.multiplyMatrices(o,t[r]),Id.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new fh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Up(t,e,e,Fn,jn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Np),this.bones.push(a),this.boneInverses.push(new qe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class Eu extends qt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const tr=new qe,Dd=new qe,no=[],Nd=new Cn,n_=new qe,Xr=new Z,qr=new li;class i_ extends Z{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Eu(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,n_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Cn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,tr),Nd.copy(e.boundingBox).applyMatrix4(tr),this.boundingBox.union(Nd)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new li),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,tr),qr.copy(e.boundingSphere).applyMatrix4(tr),this.boundingSphere.union(qr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Xr.geometry=this.geometry,Xr.material=this.material,Xr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qr.copy(this.boundingSphere),qr.applyMatrix4(n),e.ray.intersectsSphere(qr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,tr),Dd.multiplyMatrices(n,tr),Xr.matrixWorld=Dd,Xr.raycast(e,no);for(let a=0,o=no.length;a<o;a++){const c=no[a];c.instanceId=r,c.object=this,t.push(c)}no.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Eu(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Up(new Float32Array(s*this.count),s,this.count,ih,jn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Jc=new E,s_=new E,r_=new Ke;class Gi{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Jc.subVectors(n,t).cross(s_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Jc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||r_.getNormalMatrix(e),s=this.coplanarPoint(Jc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ds=new li,a_=new ue(.5,.5),io=new E;class ph{constructor(e=new Gi,t=new Gi,n=new Gi,s=new Gi,r=new Gi,a=new Gi){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ii,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],h=r[5],d=r[6],f=r[7],m=r[8],_=r[9],g=r[10],p=r[11],y=r[12],S=r[13],v=r[14],R=r[15];if(s[0].setComponents(l-a,f-u,p-m,R-y).normalize(),s[1].setComponents(l+a,f+u,p+m,R+y).normalize(),s[2].setComponents(l+o,f+h,p+_,R+S).normalize(),s[3].setComponents(l-o,f-h,p-_,R-S).normalize(),n)s[4].setComponents(c,d,g,v).normalize(),s[5].setComponents(l-c,f-d,p-g,R-v).normalize();else if(s[4].setComponents(l-c,f-d,p-g,R-v).normalize(),t===ii)s[5].setComponents(l+c,f+d,p+g,R+v).normalize();else if(t===Go)s[5].setComponents(c,d,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ds.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(e){ds.center.set(0,0,0);const t=a_.distanceTo(e.center);return ds.radius=.7071067811865476+t,ds.applyMatrix4(e.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(io.x=s.normal.x>0?e.max.x:e.min.x,io.y=s.normal.y>0?e.max.y:e.min.y,io.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(io)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ji extends Rn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new xe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Wo=new E,Xo=new E,Ud=new qe,Yr=new Ca,so=new li,Qc=new E,Fd=new E;class lc extends yt{constructor(e=new bt,t=new Ji){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Wo.fromBufferAttribute(t,s-1),Xo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Wo.distanceTo(Xo);e.setAttribute("lineDistance",new Ge(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),so.copy(n.boundingSphere),so.applyMatrix4(s),so.radius+=r,e.ray.intersectsSphere(so)===!1)return;Ud.copy(s).invert(),Yr.copy(e.ray).applyMatrix4(Ud);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=l){const p=u.getX(_),y=u.getX(_+1),S=ro(this,e,Yr,c,p,y,_);S&&t.push(S)}if(this.isLineLoop){const _=u.getX(m-1),g=u.getX(f),p=ro(this,e,Yr,c,_,g,m-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=l){const p=ro(this,e,Yr,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=ro(this,e,Yr,c,m-1,f,m-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ro(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(Wo.fromBufferAttribute(o,s),Xo.fromBufferAttribute(o,r),t.distanceSqToSegment(Wo,Xo,Qc,Fd)>n)return;Qc.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Qc);if(!(l<e.near||l>e.far))return{distance:l,point:Fd.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Od=new E,kd=new E;class va extends lc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Od.fromBufferAttribute(t,s),kd.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Od.distanceTo(kd);e.setAttribute("lineDistance",new Ge(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class o_ extends lc{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class bs extends Rn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Bd=new qe,Au=new Ca,ao=new li,oo=new E;class ra extends yt{constructor(e=new bt,t=new bs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ao.copy(n.boundingSphere),ao.applyMatrix4(s),ao.radius+=r,e.ray.intersectsSphere(ao)===!1)return;Bd.copy(s).invert(),Au.copy(e.ray).applyMatrix4(Bd);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let m=d,_=f;m<_;m++){const g=l.getX(m);oo.fromBufferAttribute(h,g),zd(oo,g,c,s,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let m=d,_=f;m<_;m++)oo.fromBufferAttribute(h,m),zd(oo,m,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function zd(i,e,t,n,s,r,a){const o=Au.distanceSqToPoint(i);if(o<t){const c=new E;Au.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Fp extends en{constructor(e,t,n=Ps,s,r,a,o=fn,c=fn,l,u=fa,h=1){if(u!==fa&&u!==pa)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new lh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class br extends bt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new E,u=new ue;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const f=n+h/t*s;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[d]/e+1)/2,u.y=(a[d+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Ge(a,3)),this.setAttribute("normal",new Ge(o,3)),this.setAttribute("uv",new Ge(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new br(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ut extends bt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],d=[],f=[];let m=0;const _=[],g=n/2;let p=0;y(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new Ge(h,3)),this.setAttribute("normal",new Ge(d,3)),this.setAttribute("uv",new Ge(f,2));function y(){const v=new E,R=new E;let A=0;const L=(t-e)/n;for(let N=0;N<=r;N++){const b=[],T=N/r,I=T*(t-e)+e;for(let H=0;H<=s;H++){const G=H/s,q=G*c+o,ee=Math.sin(q),j=Math.cos(q);R.x=I*ee,R.y=-T*n+g,R.z=I*j,h.push(R.x,R.y,R.z),v.set(ee,L,j).normalize(),d.push(v.x,v.y,v.z),f.push(G,1-T),b.push(m++)}_.push(b)}for(let N=0;N<s;N++)for(let b=0;b<r;b++){const T=_[b][N],I=_[b+1][N],H=_[b+1][N+1],G=_[b][N+1];(e>0||b!==0)&&(u.push(T,I,G),A+=3),(t>0||b!==r-1)&&(u.push(I,H,G),A+=3)}l.addGroup(p,A,0),p+=A}function S(v){const R=m,A=new ue,L=new E;let N=0;const b=v===!0?e:t,T=v===!0?1:-1;for(let H=1;H<=s;H++)h.push(0,g*T,0),d.push(0,T,0),f.push(.5,.5),m++;const I=m;for(let H=0;H<=s;H++){const q=H/s*c+o,ee=Math.cos(q),j=Math.sin(q);L.x=b*j,L.y=g*T,L.z=b*ee,h.push(L.x,L.y,L.z),d.push(0,T,0),A.x=ee*.5+.5,A.y=j*.5*T+.5,f.push(A.x,A.y),m++}for(let H=0;H<s;H++){const G=R+H,q=I+H;v===!0?u.push(q,q+1,G):u.push(q+1,q,G),N+=3}l.addGroup(p,N,v===!0?1:2),p+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ut(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Pa extends Ut{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Pa(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class uc extends bt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),l(n),u(),this.setAttribute("position",new Ge(r,3)),this.setAttribute("normal",new Ge(r.slice(),3)),this.setAttribute("uv",new Ge(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const S=new E,v=new E,R=new E;for(let A=0;A<t.length;A+=3)f(t[A+0],S),f(t[A+1],v),f(t[A+2],R),c(S,v,R,y)}function c(y,S,v,R){const A=R+1,L=[];for(let N=0;N<=A;N++){L[N]=[];const b=y.clone().lerp(v,N/A),T=S.clone().lerp(v,N/A),I=A-N;for(let H=0;H<=I;H++)H===0&&N===A?L[N][H]=b:L[N][H]=b.clone().lerp(T,H/I)}for(let N=0;N<A;N++)for(let b=0;b<2*(A-N)-1;b++){const T=Math.floor(b/2);b%2===0?(d(L[N][T+1]),d(L[N+1][T]),d(L[N][T])):(d(L[N][T+1]),d(L[N+1][T+1]),d(L[N+1][T]))}}function l(y){const S=new E;for(let v=0;v<r.length;v+=3)S.x=r[v+0],S.y=r[v+1],S.z=r[v+2],S.normalize().multiplyScalar(y),r[v+0]=S.x,r[v+1]=S.y,r[v+2]=S.z}function u(){const y=new E;for(let S=0;S<r.length;S+=3){y.x=r[S+0],y.y=r[S+1],y.z=r[S+2];const v=g(y)/2/Math.PI+.5,R=p(y)/Math.PI+.5;a.push(v,1-R)}m(),h()}function h(){for(let y=0;y<a.length;y+=6){const S=a[y+0],v=a[y+2],R=a[y+4],A=Math.max(S,v,R),L=Math.min(S,v,R);A>.9&&L<.1&&(S<.2&&(a[y+0]+=1),v<.2&&(a[y+2]+=1),R<.2&&(a[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,S){const v=y*3;S.x=e[v+0],S.y=e[v+1],S.z=e[v+2]}function m(){const y=new E,S=new E,v=new E,R=new E,A=new ue,L=new ue,N=new ue;for(let b=0,T=0;b<r.length;b+=9,T+=6){y.set(r[b+0],r[b+1],r[b+2]),S.set(r[b+3],r[b+4],r[b+5]),v.set(r[b+6],r[b+7],r[b+8]),A.set(a[T+0],a[T+1]),L.set(a[T+2],a[T+3]),N.set(a[T+4],a[T+5]),R.copy(y).add(S).add(v).divideScalar(3);const I=g(R);_(A,T+0,y,I),_(L,T+2,S,I),_(N,T+4,v,I)}}function _(y,S,v,R){R<0&&y.x===1&&(a[S]=y.x-1),v.x===0&&v.z===0&&(a[S]=R/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new uc(e.vertices,e.indices,e.radius,e.details)}}class Ir extends uc{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ir(e.radius,e.detail)}}class ui{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);const u=n[s],d=n[s+1]-u,f=(a-u)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new ue:new E);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new E,s=[],r=[],a=[],o=new E,c=new qe;for(let f=0;f<=e;f++){const m=f/e;s[f]=this.getTangentAt(m,new E)}r[0]=new E,a[0]=new E;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(Je(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,m))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Je(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],f*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class mh extends ui{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new ue){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*u-f*h+this.aX,l=d*h+f*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class c_ extends mh{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function gh(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,h){let d=(a-r)/l-(o-r)/(l+u)+(o-a)/u,f=(o-a)/u-(c-a)/(u+h)+(c-o)/h;d*=u,f*=u,s(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const co=new E,el=new gh,tl=new gh,nl=new gh;class l_ extends ui{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new E){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=s[(o-1)%r]:(co.subVectors(s[0],s[1]).add(s[0]),l=co);const h=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(co.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=co),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(h),f),_=Math.pow(h.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(u),f);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),el.initNonuniformCatmullRom(l.x,h.x,d.x,u.x,m,_,g),tl.initNonuniformCatmullRom(l.y,h.y,d.y,u.y,m,_,g),nl.initNonuniformCatmullRom(l.z,h.z,d.z,u.z,m,_,g)}else this.curveType==="catmullrom"&&(el.initCatmullRom(l.x,h.x,d.x,u.x,this.tension),tl.initCatmullRom(l.y,h.y,d.y,u.y,this.tension),nl.initCatmullRom(l.z,h.z,d.z,u.z,this.tension));return n.set(el.calc(c),tl.calc(c),nl.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new E().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Hd(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function u_(i,e){const t=1-i;return t*t*e}function h_(i,e){return 2*(1-i)*i*e}function d_(i,e){return i*i*e}function aa(i,e,t,n){return u_(i,e)+h_(i,t)+d_(i,n)}function f_(i,e){const t=1-i;return t*t*t*e}function p_(i,e){const t=1-i;return 3*t*t*i*e}function m_(i,e){return 3*(1-i)*i*i*e}function g_(i,e){return i*i*i*e}function oa(i,e,t,n,s){return f_(i,e)+p_(i,t)+m_(i,n)+g_(i,s)}class Op extends ui{constructor(e=new ue,t=new ue,n=new ue,s=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ue){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(oa(e,s.x,r.x,a.x,o.x),oa(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class __ extends ui{constructor(e=new E,t=new E,n=new E,s=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new E){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(oa(e,s.x,r.x,a.x,o.x),oa(e,s.y,r.y,a.y,o.y),oa(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class kp extends ui{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class v_ extends ui{constructor(e=new E,t=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new E){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new E){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Bp extends ui{constructor(e=new ue,t=new ue,n=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ue){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(aa(e,s.x,r.x,a.x),aa(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class x_ extends ui{constructor(e=new E,t=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new E){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(aa(e,s.x,r.x,a.x),aa(e,s.y,r.y,a.y),aa(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class zp extends ui{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],h=s[a>s.length-3?s.length-1:a+2];return n.set(Hd(o,c.x,l.x,u.x,h.x),Hd(o,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new ue().fromArray(s))}return this}}var Vd=Object.freeze({__proto__:null,ArcCurve:c_,CatmullRomCurve3:l_,CubicBezierCurve:Op,CubicBezierCurve3:__,EllipseCurve:mh,LineCurve:kp,LineCurve3:v_,QuadraticBezierCurve:Bp,QuadraticBezierCurve3:x_,SplineCurve:zp});class y_ extends ui{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Vd[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Vd[s.type]().fromJSON(s))}return this}}class Gd extends y_{constructor(e){super(),this.type="Path",this.currentPoint=new ue,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new kp(this.currentPoint.clone(),new ue(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Bp(this.currentPoint.clone(),new ue(e,t),new ue(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const o=new Op(this.currentPoint.clone(),new ue(e,t),new ue(n,s),new ue(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new zp(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,r,a,o,c),this}absellipse(e,t,n,s,r,a,o,c){const l=new mh(e,t,n,s,r,a,o,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Hp extends Gd{constructor(e){super(e),this.uuid=kn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new Gd().fromJSON(s))}return this}}function M_(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=Vp(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=E_(i,e,r,t)),i.length>80*t){o=1/0,c=1/0;let u=-1/0,h=-1/0;for(let d=t;d<s;d+=t){const f=i[d],m=i[d+1];f<o&&(o=f),m<c&&(c=m),f>u&&(u=f),m>h&&(h=m)}l=Math.max(u-o,h-c),l=l!==0?32767/l:0}return xa(r,a,t,o,c,l,0),a}function Vp(i,e,t,n,s){let r;if(s===O_(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=Wd(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Wd(a/n|0,i[a],i[a+1],r);return r&&Tr(r,r.next)&&(Ma(r),r=r.next),r}function Is(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Tr(t,t.next)||Dt(t.prev,t,t.next)===0)){if(Ma(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function xa(i,e,t,n,s,r,a){if(!i)return;!a&&r&&L_(i,n,s,r);let o=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(r?w_(i,n,s,r):S_(i)){e.push(c.i,i.i,l.i),Ma(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=b_(Is(i),e),xa(i,e,t,n,s,r,2)):a===2&&T_(i,e,t,n,s,r):xa(Is(i),e,t,n,s,r,1);break}}}function S_(i){const e=i.prev,t=i,n=i.next;if(Dt(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,u=Math.min(s,r,a),h=Math.min(o,c,l),d=Math.max(s,r,a),f=Math.max(o,c,l);let m=n.next;for(;m!==e;){if(m.x>=u&&m.x<=d&&m.y>=h&&m.y<=f&&Qr(s,o,r,c,a,l,m.x,m.y)&&Dt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function w_(i,e,t,n){const s=i.prev,r=i,a=i.next;if(Dt(s,r,a)>=0)return!1;const o=s.x,c=r.x,l=a.x,u=s.y,h=r.y,d=a.y,f=Math.min(o,c,l),m=Math.min(u,h,d),_=Math.max(o,c,l),g=Math.max(u,h,d),p=Ru(f,m,e,t,n),y=Ru(_,g,e,t,n);let S=i.prevZ,v=i.nextZ;for(;S&&S.z>=p&&v&&v.z<=y;){if(S.x>=f&&S.x<=_&&S.y>=m&&S.y<=g&&S!==s&&S!==a&&Qr(o,u,c,h,l,d,S.x,S.y)&&Dt(S.prev,S,S.next)>=0||(S=S.prevZ,v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==s&&v!==a&&Qr(o,u,c,h,l,d,v.x,v.y)&&Dt(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;S&&S.z>=p;){if(S.x>=f&&S.x<=_&&S.y>=m&&S.y<=g&&S!==s&&S!==a&&Qr(o,u,c,h,l,d,S.x,S.y)&&Dt(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;v&&v.z<=y;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==s&&v!==a&&Qr(o,u,c,h,l,d,v.x,v.y)&&Dt(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function b_(i,e){let t=i;do{const n=t.prev,s=t.next.next;!Tr(n,s)&&Wp(n,t,t.next,s)&&ya(n,s)&&ya(s,n)&&(e.push(n.i,t.i,s.i),Ma(t),Ma(t.next),t=i=s),t=t.next}while(t!==i);return Is(t)}function T_(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&N_(a,o)){let c=Xp(a,o);a=Is(a,a.next),c=Is(c,c.next),xa(a,e,t,n,s,r,0),xa(c,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function E_(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const o=e[r]*n,c=r<a-1?e[r+1]*n:i.length,l=Vp(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(D_(l))}s.sort(A_);for(let r=0;r<s.length;r++)t=R_(s[r],t);return t}function A_(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function R_(i,e){const t=C_(i,e);if(!t)return e;const n=Xp(t,i);return Is(n,n.next),Is(t,t.next)}function C_(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(Tr(i,t))return t;do{if(Tr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const h=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>r&&(r=h,a=t.x<t.next.x?t:t.next,h===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,c=a.x,l=a.y;let u=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Gp(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){const h=Math.abs(s-t.y)/(n-t.x);ya(t,i)&&(h<u||h===u&&(t.x>a.x||t.x===a.x&&P_(a,t)))&&(a=t,u=h)}t=t.next}while(t!==o);return a}function P_(i,e){return Dt(i.prev,i,e.prev)<0&&Dt(e.next,i,i.next)<0}function L_(i,e,t,n){let s=i;do s.z===0&&(s.z=Ru(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,I_(s)}function I_(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Ru(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function D_(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Gp(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function Qr(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&Gp(i,e,t,n,s,r,a,o)}function N_(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!U_(i,e)&&(ya(i,e)&&ya(e,i)&&F_(i,e)&&(Dt(i.prev,i,e.prev)||Dt(i,e.prev,e))||Tr(i,e)&&Dt(i.prev,i,i.next)>0&&Dt(e.prev,e,e.next)>0)}function Dt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Tr(i,e){return i.x===e.x&&i.y===e.y}function Wp(i,e,t,n){const s=uo(Dt(i,e,t)),r=uo(Dt(i,e,n)),a=uo(Dt(t,n,i)),o=uo(Dt(t,n,e));return!!(s!==r&&a!==o||s===0&&lo(i,t,e)||r===0&&lo(i,n,e)||a===0&&lo(t,i,n)||o===0&&lo(t,e,n))}function lo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function uo(i){return i>0?1:i<0?-1:0}function U_(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Wp(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function ya(i,e){return Dt(i.prev,i,i.next)<0?Dt(i,e,i.next)>=0&&Dt(i,i.prev,e)>=0:Dt(i,e,i.prev)<0||Dt(i,i.next,e)<0}function F_(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Xp(i,e){const t=Cu(i.i,i.x,i.y),n=Cu(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Wd(i,e,t,n){const s=Cu(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Ma(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Cu(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function O_(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class k_{static triangulate(e,t,n=2){return M_(e,t,n)}}class lr{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return lr.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Xd(e),qd(n,e);let a=e.length;t.forEach(Xd);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,qd(n,t[c]);const o=k_.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}}function Xd(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function qd(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class _h extends uc{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new _h(e.radius,e.detail)}}class Dr extends bt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,h=e/o,d=t/c,f=[],m=[],_=[],g=[];for(let p=0;p<u;p++){const y=p*d-a;for(let S=0;S<l;S++){const v=S*h-r;m.push(v,-y,0),_.push(0,0,1),g.push(S/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<o;y++){const S=y+l*p,v=y+l*(p+1),R=y+1+l*(p+1),A=y+1+l*p;f.push(S,v,A),f.push(v,R,A)}this.setIndex(f),this.setAttribute("position",new Ge(m,3)),this.setAttribute("normal",new Ge(_,3)),this.setAttribute("uv",new Ge(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Di extends bt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],u=[];let h=e;const d=(t-e)/s,f=new E,m=new ue;for(let _=0;_<=s;_++){for(let g=0;g<=n;g++){const p=r+g/n*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,u.push(m.x,m.y)}h+=d}for(let _=0;_<s;_++){const g=_*(n+1);for(let p=0;p<n;p++){const y=p+g,S=y,v=y+n+1,R=y+n+2,A=y+1;o.push(S,v,A),o.push(v,R,A)}}this.setIndex(o),this.setAttribute("position",new Ge(c,3)),this.setAttribute("normal",new Ge(l,3)),this.setAttribute("uv",new Ge(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Di(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class vh extends bt{constructor(e=new Hp([new ue(0,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],a=[];let o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let u=0;u<e.length;u++)l(e[u]),this.addGroup(o,c,u),o+=c,c=0;this.setIndex(n),this.setAttribute("position",new Ge(s,3)),this.setAttribute("normal",new Ge(r,3)),this.setAttribute("uv",new Ge(a,2));function l(u){const h=s.length/3,d=u.extractPoints(t);let f=d.shape;const m=d.holes;lr.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){const y=m[g];lr.isClockWise(y)===!0&&(m[g]=y.reverse())}const _=lr.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){const y=m[g];f=f.concat(y)}for(let g=0,p=f.length;g<p;g++){const y=f[g];s.push(y.x,y.y,0),r.push(0,0,1),a.push(y.x,y.y)}for(let g=0,p=_.length;g<p;g++){const y=_[g],S=y[0]+h,v=y[1]+h,R=y[2]+h;n.push(S,v,R),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return B_(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const a=t[e.shapes[s]];n.push(a)}return new vh(n,e.curveSegments)}}function B_(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class ks extends bt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new E,d=new E,f=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){const y=[],S=p/n;let v=0;p===0&&a===0?v=.5/t:p===n&&c===Math.PI&&(v=-.5/t);for(let R=0;R<=t;R++){const A=R/t;h.x=-e*Math.cos(s+A*r)*Math.sin(a+S*o),h.y=e*Math.cos(a+S*o),h.z=e*Math.sin(s+A*r)*Math.sin(a+S*o),m.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),g.push(A+v,1-S),y.push(l++)}u.push(y)}for(let p=0;p<n;p++)for(let y=0;y<t;y++){const S=u[p][y+1],v=u[p][y],R=u[p+1][y],A=u[p+1][y+1];(p!==0||a>0)&&f.push(S,v,A),(p!==n-1||c<Math.PI)&&f.push(v,R,A)}this.setIndex(f),this.setAttribute("position",new Ge(m,3)),this.setAttribute("normal",new Ge(_,3)),this.setAttribute("uv",new Ge(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ks(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class hc extends bt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],c=[],l=[],u=new E,h=new E,d=new E;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){const _=m/s*r,g=f/n*Math.PI*2;h.x=(e+t*Math.cos(g))*Math.cos(_),h.y=(e+t*Math.cos(g))*Math.sin(_),h.z=t*Math.sin(g),o.push(h.x,h.y,h.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),d.subVectors(h,u).normalize(),c.push(d.x,d.y,d.z),l.push(m/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){const _=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,y=(s+1)*f+m;a.push(_,g,y),a.push(g,p,y)}this.setIndex(a),this.setAttribute("position",new Ge(o,3)),this.setAttribute("normal",new Ge(c,3)),this.setAttribute("uv",new Ge(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hc(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Kt extends Rn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oh,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class hi extends Kt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Je(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new xe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new xe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new xe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class xh extends Rn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new xe(16777215),this.specular=new xe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oh,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=Qu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class z_ extends Rn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Qg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class H_ extends Rn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function ho(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function V_(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function G_(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Yd(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function qp(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}class La{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class W_ extends La{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:sd,endingEnd:sd}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case rd:r=e,o=2*t-n;break;case ad:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case rd:a=e,c=2*n-t;break;case ad:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(s-t),_=m*m,g=_*m,p=-d*g+2*d*_-d*m,y=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*m+1,S=(-1-f)*g+(1.5+f)*_+.5*m,v=f*g-f*_;for(let R=0;R!==o;++R)r[R]=p*a[u+R]+y*a[l+R]+S*a[c+R]+v*a[h+R];return r}}class X_ extends La{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(s-t),h=1-u;for(let d=0;d!==o;++d)r[d]=a[l+d]*h+a[c+d]*u;return r}}class q_ extends La{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class $n{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ho(t,this.TimeBufferType),this.values=ho(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ho(e.times,Array),values:ho(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new q_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new X_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new W_(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ma:t=this.InterpolantFactoryMethodDiscrete;break;case ga:t=this.InterpolantFactoryMethodLinear;break;case Rc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ma;case this.InterpolantFactoryMethodLinear:return ga;case this.InterpolantFactoryMethodSmooth:return Rc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&V_(s))for(let o=0,c=s.length;o!==c;++o){const l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Rc,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(s)c=!0;else{const h=o*n,d=h-n,f=h+n;for(let m=0;m!==n;++m){const _=t[h+m];if(_!==t[d+m]||_!==t[f+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const h=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}$n.prototype.ValueTypeName="";$n.prototype.TimeBufferType=Float32Array;$n.prototype.ValueBufferType=Float32Array;$n.prototype.DefaultInterpolation=ga;class Nr extends $n{constructor(e,t,n){super(e,t,n)}}Nr.prototype.ValueTypeName="bool";Nr.prototype.ValueBufferType=Array;Nr.prototype.DefaultInterpolation=ma;Nr.prototype.InterpolantFactoryMethodLinear=void 0;Nr.prototype.InterpolantFactoryMethodSmooth=void 0;class Yp extends $n{constructor(e,t,n,s){super(e,t,n,s)}}Yp.prototype.ValueTypeName="color";class Er extends $n{constructor(e,t,n,s){super(e,t,n,s)}}Er.prototype.ValueTypeName="number";class Y_ extends La{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t);let l=e*o;for(let u=l+o;l!==u;l+=4)Hn.slerpFlat(r,0,a,l-o,a,l,c);return r}}class Ar extends $n{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Y_(this.times,this.values,this.getValueSize(),e)}}Ar.prototype.ValueTypeName="quaternion";Ar.prototype.InterpolantFactoryMethodSmooth=void 0;class Ur extends $n{constructor(e,t,n){super(e,t,n)}}Ur.prototype.ValueTypeName="string";Ur.prototype.ValueBufferType=Array;Ur.prototype.DefaultInterpolation=ma;Ur.prototype.InterpolantFactoryMethodLinear=void 0;Ur.prototype.InterpolantFactoryMethodSmooth=void 0;class Rr extends $n{constructor(e,t,n,s){super(e,t,n,s)}}Rr.prototype.ValueTypeName="vector";class K_{constructor(e="",t=-1,n=[],s=Zg){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=kn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push($_(n[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push($n.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const u=G_(c);c=Yd(c,1,u),l=Yd(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Er(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let d=s[h];d||(s[h]=d=[]),d.push(l)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,m,_){if(f.length!==0){const g=[],p=[];qp(f,g,p,m),g.length!==0&&_.push(new h(d,g,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let h=0;h<l.length;h++){const d=l[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let _=0;_<d[m].morphTargets.length;_++)f[d[m].morphTargets[_]]=-1;for(const _ in f){const g=[],p=[];for(let y=0;y!==d[m].morphTargets.length;++y){const S=d[m];g.push(S.time),p.push(S.morphTarget===_?1:0)}s.push(new Er(".morphTargetInfluence["+_+"]",g,p))}c=f.length*a}else{const f=".bones["+t[h].name+"]";n(Rr,f+".position",d,"pos",s),n(Ar,f+".quaternion",d,"rot",s),n(Rr,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function j_(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Er;case"vector":case"vector2":case"vector3":case"vector4":return Rr;case"color":return Yp;case"quaternion":return Ar;case"bool":case"boolean":return Nr;case"string":return Ur}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function $_(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=j_(i.type);if(i.times===void 0){const t=[],n=[];qp(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Ri={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Z_{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){const f=l[h],m=l[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const Kp=new Z_;class as{constructor(e){this.manager=e!==void 0?e:Kp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}as.DEFAULT_MATERIAL_NAME="__DEFAULT";const vi={};class J_ extends Error{constructor(e,t){super(e),this.response=t}}class dc extends as{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Ri.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(vi[e]!==void 0){vi[e].push({onLoad:t,onProgress:n,onError:s});return}vi[e]=[],vi[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=vi[e],h=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let _=0;const g=new ReadableStream({start(p){y();function y(){h.read().then(({done:S,value:v})=>{if(S)p.close();else{_+=v.byteLength;const R=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:f});for(let A=0,L=u.length;A<L;A++){const N=u[A];N.onProgress&&N.onProgress(R)}p.enqueue(v),y()}},S=>{p.error(S)})}}});return new Response(g)}else throw new J_(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o==="")return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(m=>f.decode(m))}}}).then(l=>{Ri.add(`file:${e}`,l);const u=vi[e];delete vi[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(l)}}).catch(l=>{const u=vi[e];if(u===void 0)throw this.manager.itemError(e),l;delete vi[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const nr=new WeakMap;class Q_ extends as{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ri.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let h=nr.get(a);h===void 0&&(h=[],nr.set(a,h)),h.push({onLoad:t,onError:s})}return a}const o=_a("img");function c(){u(),t&&t(this);const h=nr.get(this)||[];for(let d=0;d<h.length;d++){const f=h[d];f.onLoad&&f.onLoad(this)}nr.delete(this),r.manager.itemEnd(e)}function l(h){u(),s&&s(h),Ri.remove(`image:${e}`);const d=nr.get(this)||[];for(let f=0;f<d.length;f++){const m=d[f];m.onError&&m.onError(h)}nr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ri.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class yh extends as{constructor(e){super(e)}load(e,t,n,s){const r=new en,a=new Q_(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class fc extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new xe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class ev extends fc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new xe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const il=new qe,Kd=new E,jd=new E;class Mh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=oi,this.map=null,this.mapPass=null,this.matrix=new qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ph,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Kd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Kd),jd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(jd),t.updateMatrixWorld(),il.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(il,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(il)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class tv extends Mh{constructor(){super(new dn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Sr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class nv extends fc{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new tv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const $d=new qe,Kr=new E,sl=new E;class iv extends Mh{constructor(){super(new dn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ue(4,2),this._viewportCount=6,this._viewports=[new ut(2,1,1,1),new ut(0,1,1,1),new ut(3,1,1,1),new ut(1,1,1,1),new ut(3,0,1,1),new ut(1,0,1,1)],this._cubeDirections=[new E(1,0,0),new E(-1,0,0),new E(0,0,1),new E(0,0,-1),new E(0,1,0),new E(0,-1,0)],this._cubeUps=[new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,0,1),new E(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Kr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Kr),sl.copy(n.position),sl.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(sl),n.updateMatrixWorld(),s.makeTranslation(-Kr.x,-Kr.y,-Kr.z),$d.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix($d,n.coordinateSystem,n.reversedDepth)}}class Sh extends fc{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new iv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class wh extends Ip{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class sv extends Mh{constructor(){super(new wh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class jp extends fc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new sv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ur{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const rl=new WeakMap;class rv extends as{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ri.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{if(rl.has(a)===!0)s&&s(rl.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(l),r.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Ri.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),rl.set(c,l),Ri.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Ri.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class av extends dn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class ov{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const bh="\\[\\]\\.:\\/",cv=new RegExp("["+bh+"]","g"),Th="[^"+bh+"]",lv="[^"+bh.replace("\\.","")+"]",uv=/((?:WC+[\/:])*)/.source.replace("WC",Th),hv=/(WCOD+)?/.source.replace("WCOD",lv),dv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Th),fv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Th),pv=new RegExp("^"+uv+hv+dv+fv+"$"),mv=["material","materials","bones","map"];class gv{constructor(e,t,n){const s=n||mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class mt{constructor(e,t,n){this.path=t,this.parsedPath=n||mt.parseTrackName(t),this.node=mt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new mt.Composite(e,t,n):new mt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(cv,"")}static parseTrackName(e){const t=pv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);mv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=mt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[s];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}mt.Composite=gv;mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};mt.prototype.GetterByBindingType=[mt.prototype._getValue_direct,mt.prototype._getValue_array,mt.prototype._getValue_arrayElement,mt.prototype._getValue_toArray];mt.prototype.SetterByBindingTypeAndVersioning=[[mt.prototype._setValue_direct,mt.prototype._setValue_direct_setNeedsUpdate,mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_array,mt.prototype._setValue_array_setNeedsUpdate,mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_arrayElement,mt.prototype._setValue_arrayElement_setNeedsUpdate,mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_fromArray,mt.prototype._setValue_fromArray_setNeedsUpdate,mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Zd=new qe;class $p{constructor(e,t,n=0,s=1/0){this.ray=new Ca(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new uh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Zd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Zd),this}intersectObject(e,t=!0,n=[]){return Pu(e,this,n,t),n.sort(Jd),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Pu(e[s],this,n,t);return n.sort(Jd),n}}function Jd(i,e){return i.distance-e.distance}function Pu(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Pu(r[a],e,t,!0)}}const fo=new Cn;class _v extends va{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),s=new Float32Array(24),r=new bt;r.setIndex(new qt(n,1)),r.setAttribute("position",new qt(s,3)),super(r,new Ji({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&fo.setFromObject(this.object),fo.isEmpty())return;const e=fo.min,t=fo.max,n=this.geometry.attributes.position,s=n.array;s[0]=t.x,s[1]=t.y,s[2]=t.z,s[3]=e.x,s[4]=t.y,s[5]=t.z,s[6]=e.x,s[7]=e.y,s[8]=t.z,s[9]=t.x,s[10]=e.y,s[11]=t.z,s[12]=t.x,s[13]=t.y,s[14]=e.z,s[15]=e.x,s[16]=t.y,s[17]=e.z,s[18]=e.x,s[19]=e.y,s[20]=e.z,s[21]=t.x,s[22]=e.y,s[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}const Qd=new E;let po,al;class Ia extends yt{constructor(e=new E(0,0,1),t=new E(0,0,0),n=1,s=16776960,r=n*.2,a=r*.2){super(),this.type="ArrowHelper",po===void 0&&(po=new bt,po.setAttribute("position",new Ge([0,0,0,0,1,0],3)),al=new Pa(.5,1,5,1),al.translate(0,-.5,0)),this.position.copy(t),this.line=new lc(po,new Ji({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Z(al,new tt({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Qd.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Qd,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}function ef(i,e,t,n){const s=vv(n);switch(t){case yp:return i*e;case ih:return i*e/s.components*s.byteLength;case sh:return i*e/s.components*s.byteLength;case Sp:return i*e*2/s.components*s.byteLength;case rh:return i*e*2/s.components*s.byteLength;case Mp:return i*e*3/s.components*s.byteLength;case Fn:return i*e*4/s.components*s.byteLength;case ah:return i*e*4/s.components*s.byteLength;case Eo:case Ao:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ro:case Co:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ql:case tu:return Math.max(i,16)*Math.max(e,8)/4;case Jl:case eu:return Math.max(i,8)*Math.max(e,8)/2;case nu:case iu:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case su:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ru:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case au:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ou:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case cu:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case lu:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case uu:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case hu:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case du:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case fu:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case pu:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case mu:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case gu:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case _u:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case vu:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Po:case xu:case yu:return Math.ceil(i/4)*Math.ceil(e/4)*16;case wp:case Mu:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Su:case wu:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function vv(i){switch(i){case oi:case _p:return{byteLength:1,components:1};case ha:case vp:case Ra:return{byteLength:2,components:1};case th:case nh:return{byteLength:2,components:4};case Ps:case eh:case jn:return{byteLength:4,components:1};case xp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zu);function Zp(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function xv(i){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,h=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,o),h.length===0)i.bufferSubData(l,0,u);else{h.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<h.length;f++){const m=h[d],_=h[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,h[d]=_)}h.length=d+1;for(let f=0,m=h.length;f<m;f++){const _=h[f];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var yv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Mv=`#ifdef USE_ALPHAHASH
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
#endif`,Sv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Tv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ev=`#ifdef USE_AOMAP
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
#endif`,Av=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rv=`#ifdef USE_BATCHING
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
#endif`,Cv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Pv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Lv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Iv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Dv=`#ifdef USE_IRIDESCENCE
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
#endif`,Nv=`#ifdef USE_BUMPMAP
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
#endif`,Uv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Fv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ov=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,zv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Hv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Vv=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Gv=`#define PI 3.141592653589793
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
} // validated`,Wv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Xv=`vec3 transformedNormal = objectNormal;
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
#endif`,qv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Kv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,jv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$v="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jv=`#ifdef USE_ENVMAP
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
#endif`,Qv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ex=`#ifdef USE_ENVMAP
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
#endif`,tx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nx=`#ifdef USE_ENVMAP
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
#endif`,ix=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ax=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ox=`#ifdef USE_GRADIENTMAP
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
}`,cx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ux=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hx=`uniform bool receiveShadow;
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
#endif`,dx=`#ifdef USE_ENVMAP
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
#endif`,fx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,px=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_x=`PhysicalMaterial material;
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
#endif`,vx=`struct PhysicalMaterial {
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
}`,xx=`
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
#endif`,yx=`#if defined( RE_IndirectDiffuse )
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
#endif`,Mx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Sx=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wx=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bx=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tx=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ex=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ax=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Cx=`#if defined( USE_POINTS_UV )
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
#endif`,Px=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ix=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Dx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ux=`#ifdef USE_MORPHTARGETS
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
#endif`,Fx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ox=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,kx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Bx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Vx=`#ifdef USE_NORMALMAP
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
#endif`,Gx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Wx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,jx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$x=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Jx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Qx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ey=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ty=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ny=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,iy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,sy=`float getShadowMask() {
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
}`,ry=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ay=`#ifdef USE_SKINNING
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
#endif`,oy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cy=`#ifdef USE_SKINNING
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
#endif`,ly=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,uy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,dy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,fy=`#ifdef USE_TRANSMISSION
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
#endif`,py=`#ifdef USE_TRANSMISSION
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
#endif`,my=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_y=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const xy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yy=`uniform sampler2D t2D;
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
}`,My=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,wy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,by=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ty=`#include <common>
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
}`,Ey=`#if DEPTH_PACKING == 3200
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
}`,Ay=`#define DISTANCE
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
}`,Ry=`#define DISTANCE
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
}`,Cy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Py=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ly=`uniform float scale;
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
}`,Iy=`uniform vec3 diffuse;
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
}`,Dy=`#include <common>
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
}`,Ny=`uniform vec3 diffuse;
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
}`,Uy=`#define LAMBERT
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
}`,Fy=`#define LAMBERT
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
}`,Oy=`#define MATCAP
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
}`,ky=`#define MATCAP
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
}`,By=`#define NORMAL
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
}`,zy=`#define NORMAL
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
}`,Hy=`#define PHONG
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
}`,Vy=`#define PHONG
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
}`,Gy=`#define STANDARD
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
}`,Wy=`#define STANDARD
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
}`,Xy=`#define TOON
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
}`,qy=`#define TOON
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
}`,Yy=`uniform float size;
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
}`,Ky=`uniform vec3 diffuse;
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
}`,jy=`#include <common>
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
}`,$y=`uniform vec3 color;
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
}`,Zy=`uniform float rotation;
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
}`,Jy=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:yv,alphahash_pars_fragment:Mv,alphamap_fragment:Sv,alphamap_pars_fragment:wv,alphatest_fragment:bv,alphatest_pars_fragment:Tv,aomap_fragment:Ev,aomap_pars_fragment:Av,batching_pars_vertex:Rv,batching_vertex:Cv,begin_vertex:Pv,beginnormal_vertex:Lv,bsdfs:Iv,iridescence_fragment:Dv,bumpmap_pars_fragment:Nv,clipping_planes_fragment:Uv,clipping_planes_pars_fragment:Fv,clipping_planes_pars_vertex:Ov,clipping_planes_vertex:kv,color_fragment:Bv,color_pars_fragment:zv,color_pars_vertex:Hv,color_vertex:Vv,common:Gv,cube_uv_reflection_fragment:Wv,defaultnormal_vertex:Xv,displacementmap_pars_vertex:qv,displacementmap_vertex:Yv,emissivemap_fragment:Kv,emissivemap_pars_fragment:jv,colorspace_fragment:$v,colorspace_pars_fragment:Zv,envmap_fragment:Jv,envmap_common_pars_fragment:Qv,envmap_pars_fragment:ex,envmap_pars_vertex:tx,envmap_physical_pars_fragment:dx,envmap_vertex:nx,fog_vertex:ix,fog_pars_vertex:sx,fog_fragment:rx,fog_pars_fragment:ax,gradientmap_pars_fragment:ox,lightmap_pars_fragment:cx,lights_lambert_fragment:lx,lights_lambert_pars_fragment:ux,lights_pars_begin:hx,lights_toon_fragment:fx,lights_toon_pars_fragment:px,lights_phong_fragment:mx,lights_phong_pars_fragment:gx,lights_physical_fragment:_x,lights_physical_pars_fragment:vx,lights_fragment_begin:xx,lights_fragment_maps:yx,lights_fragment_end:Mx,logdepthbuf_fragment:Sx,logdepthbuf_pars_fragment:wx,logdepthbuf_pars_vertex:bx,logdepthbuf_vertex:Tx,map_fragment:Ex,map_pars_fragment:Ax,map_particle_fragment:Rx,map_particle_pars_fragment:Cx,metalnessmap_fragment:Px,metalnessmap_pars_fragment:Lx,morphinstance_vertex:Ix,morphcolor_vertex:Dx,morphnormal_vertex:Nx,morphtarget_pars_vertex:Ux,morphtarget_vertex:Fx,normal_fragment_begin:Ox,normal_fragment_maps:kx,normal_pars_fragment:Bx,normal_pars_vertex:zx,normal_vertex:Hx,normalmap_pars_fragment:Vx,clearcoat_normal_fragment_begin:Gx,clearcoat_normal_fragment_maps:Wx,clearcoat_pars_fragment:Xx,iridescence_pars_fragment:qx,opaque_fragment:Yx,packing:Kx,premultiplied_alpha_fragment:jx,project_vertex:$x,dithering_fragment:Zx,dithering_pars_fragment:Jx,roughnessmap_fragment:Qx,roughnessmap_pars_fragment:ey,shadowmap_pars_fragment:ty,shadowmap_pars_vertex:ny,shadowmap_vertex:iy,shadowmask_pars_fragment:sy,skinbase_vertex:ry,skinning_pars_vertex:ay,skinning_vertex:oy,skinnormal_vertex:cy,specularmap_fragment:ly,specularmap_pars_fragment:uy,tonemapping_fragment:hy,tonemapping_pars_fragment:dy,transmission_fragment:fy,transmission_pars_fragment:py,uv_pars_fragment:my,uv_pars_vertex:gy,uv_vertex:_y,worldpos_vertex:vy,background_vert:xy,background_frag:yy,backgroundCube_vert:My,backgroundCube_frag:Sy,cube_vert:wy,cube_frag:by,depth_vert:Ty,depth_frag:Ey,distanceRGBA_vert:Ay,distanceRGBA_frag:Ry,equirect_vert:Cy,equirect_frag:Py,linedashed_vert:Ly,linedashed_frag:Iy,meshbasic_vert:Dy,meshbasic_frag:Ny,meshlambert_vert:Uy,meshlambert_frag:Fy,meshmatcap_vert:Oy,meshmatcap_frag:ky,meshnormal_vert:By,meshnormal_frag:zy,meshphong_vert:Hy,meshphong_frag:Vy,meshphysical_vert:Gy,meshphysical_frag:Wy,meshtoon_vert:Xy,meshtoon_frag:qy,points_vert:Yy,points_frag:Ky,shadow_vert:jy,shadow_frag:$y,sprite_vert:Zy,sprite_frag:Jy},he={common:{diffuse:{value:new xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new xe(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Qn={basic:{uniforms:un([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:un([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new xe(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:un([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new xe(0)},specular:{value:new xe(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:un([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:un([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new xe(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:un([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:un([he.points,he.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:un([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:un([he.common,he.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:un([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:un([he.sprite,he.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:un([he.common,he.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:un([he.lights,he.fog,{color:{value:new xe(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};Qn.physical={uniforms:un([Qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new xe(0)},specularColor:{value:new xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const mo={r:0,b:0,g:0},fs=new zn,Qy=new qe;function eM(i,e,t,n,s,r,a){const o=new xe(0);let c=r===!0?0:1,l,u,h=null,d=0,f=null;function m(S){let v=S.isScene===!0?S.background:null;return v&&v.isTexture&&(v=(S.backgroundBlurriness>0?t:e).get(v)),v}function _(S){let v=!1;const R=m(S);R===null?p(o,c):R&&R.isColor&&(p(R,1),v=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(S,v){const R=m(v);R&&(R.isCubeTexture||R.mapping===cc)?(u===void 0&&(u=new Z(new it(1,1,1),new Ii({name:"BackgroundCubeMaterial",uniforms:wr(Qn.backgroundCube.uniforms),vertexShader:Qn.backgroundCube.vertexShader,fragmentShader:Qn.backgroundCube.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,L,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),fs.copy(v.backgroundRotation),fs.x*=-1,fs.y*=-1,fs.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(fs.y*=-1,fs.z*=-1),u.material.uniforms.envMap.value=R,u.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Qy.makeRotationFromEuler(fs)),u.material.toneMapped=Qe.getTransfer(R.colorSpace)!==_t,(h!==R||d!==R.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=R,d=R.version,f=i.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):R&&R.isTexture&&(l===void 0&&(l=new Z(new Dr(2,2),new Ii({name:"BackgroundMaterial",uniforms:wr(Qn.background.uniforms),vertexShader:Qn.background.vertexShader,fragmentShader:Qn.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=R,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=Qe.getTransfer(R.colorSpace)!==_t,R.matrixAutoUpdate===!0&&R.updateMatrix(),l.material.uniforms.uvTransform.value.copy(R.matrix),(h!==R||d!==R.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=R,d=R.version,f=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,v){S.getRGB(mo,Lp(i)),n.buffers.color.setClear(mo.r,mo.g,mo.b,v,a)}function y(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,v=1){o.set(S),c=v,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,p(o,c)},render:_,addToRenderList:g,dispose:y}}function tM(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(T,I,H,G,q){let ee=!1;const j=h(G,H,I);r!==j&&(r=j,l(r.object)),ee=f(T,G,H,q),ee&&m(T,G,H,q),q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),(ee||a)&&(a=!1,v(T,I,H,G),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function c(){return i.createVertexArray()}function l(T){return i.bindVertexArray(T)}function u(T){return i.deleteVertexArray(T)}function h(T,I,H){const G=H.wireframe===!0;let q=n[T.id];q===void 0&&(q={},n[T.id]=q);let ee=q[I.id];ee===void 0&&(ee={},q[I.id]=ee);let j=ee[G];return j===void 0&&(j=d(c()),ee[G]=j),j}function d(T){const I=[],H=[],G=[];for(let q=0;q<t;q++)I[q]=0,H[q]=0,G[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:H,attributeDivisors:G,object:T,attributes:{},index:null}}function f(T,I,H,G){const q=r.attributes,ee=I.attributes;let j=0;const te=H.getAttributes();for(const W in te)if(te[W].location>=0){const _e=q[W];let Ie=ee[W];if(Ie===void 0&&(W==="instanceMatrix"&&T.instanceMatrix&&(Ie=T.instanceMatrix),W==="instanceColor"&&T.instanceColor&&(Ie=T.instanceColor)),_e===void 0||_e.attribute!==Ie||Ie&&_e.data!==Ie.data)return!0;j++}return r.attributesNum!==j||r.index!==G}function m(T,I,H,G){const q={},ee=I.attributes;let j=0;const te=H.getAttributes();for(const W in te)if(te[W].location>=0){let _e=ee[W];_e===void 0&&(W==="instanceMatrix"&&T.instanceMatrix&&(_e=T.instanceMatrix),W==="instanceColor"&&T.instanceColor&&(_e=T.instanceColor));const Ie={};Ie.attribute=_e,_e&&_e.data&&(Ie.data=_e.data),q[W]=Ie,j++}r.attributes=q,r.attributesNum=j,r.index=G}function _(){const T=r.newAttributes;for(let I=0,H=T.length;I<H;I++)T[I]=0}function g(T){p(T,0)}function p(T,I){const H=r.newAttributes,G=r.enabledAttributes,q=r.attributeDivisors;H[T]=1,G[T]===0&&(i.enableVertexAttribArray(T),G[T]=1),q[T]!==I&&(i.vertexAttribDivisor(T,I),q[T]=I)}function y(){const T=r.newAttributes,I=r.enabledAttributes;for(let H=0,G=I.length;H<G;H++)I[H]!==T[H]&&(i.disableVertexAttribArray(H),I[H]=0)}function S(T,I,H,G,q,ee,j){j===!0?i.vertexAttribIPointer(T,I,H,q,ee):i.vertexAttribPointer(T,I,H,G,q,ee)}function v(T,I,H,G){_();const q=G.attributes,ee=H.getAttributes(),j=I.defaultAttributeValues;for(const te in ee){const W=ee[te];if(W.location>=0){let de=q[te];if(de===void 0&&(te==="instanceMatrix"&&T.instanceMatrix&&(de=T.instanceMatrix),te==="instanceColor"&&T.instanceColor&&(de=T.instanceColor)),de!==void 0){const _e=de.normalized,Ie=de.itemSize,$e=e.get(de);if($e===void 0)continue;const Rt=$e.buffer,vt=$e.type,K=$e.bytesPerElement,fe=vt===i.INT||vt===i.UNSIGNED_INT||de.gpuType===eh;if(de.isInterleavedBufferAttribute){const ce=de.data,Fe=ce.stride,Oe=de.offset;if(ce.isInstancedInterleavedBuffer){for(let We=0;We<W.locationSize;We++)p(W.location+We,ce.meshPerAttribute);T.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let We=0;We<W.locationSize;We++)g(W.location+We);i.bindBuffer(i.ARRAY_BUFFER,Rt);for(let We=0;We<W.locationSize;We++)S(W.location+We,Ie/W.locationSize,vt,_e,Fe*K,(Oe+Ie/W.locationSize*We)*K,fe)}else{if(de.isInstancedBufferAttribute){for(let ce=0;ce<W.locationSize;ce++)p(W.location+ce,de.meshPerAttribute);T.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let ce=0;ce<W.locationSize;ce++)g(W.location+ce);i.bindBuffer(i.ARRAY_BUFFER,Rt);for(let ce=0;ce<W.locationSize;ce++)S(W.location+ce,Ie/W.locationSize,vt,_e,Ie*K,Ie/W.locationSize*ce*K,fe)}}else if(j!==void 0){const _e=j[te];if(_e!==void 0)switch(_e.length){case 2:i.vertexAttrib2fv(W.location,_e);break;case 3:i.vertexAttrib3fv(W.location,_e);break;case 4:i.vertexAttrib4fv(W.location,_e);break;default:i.vertexAttrib1fv(W.location,_e)}}}}y()}function R(){N();for(const T in n){const I=n[T];for(const H in I){const G=I[H];for(const q in G)u(G[q].object),delete G[q];delete I[H]}delete n[T]}}function A(T){if(n[T.id]===void 0)return;const I=n[T.id];for(const H in I){const G=I[H];for(const q in G)u(G[q].object),delete G[q];delete I[H]}delete n[T.id]}function L(T){for(const I in n){const H=n[I];if(H[T.id]===void 0)continue;const G=H[T.id];for(const q in G)u(G[q].object),delete G[q];delete H[T.id]}}function N(){b(),a=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:N,resetDefaultState:b,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfProgram:L,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function nM(i,e,t){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function o(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let f=0;for(let m=0;m<h;m++)f+=u[m];t.update(f,n,1)}function c(l,u,h,d){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<l.length;m++)a(l[m],u[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let m=0;for(let _=0;_<h;_++)m+=u[_]*d[_];t.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function iM(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==Fn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const N=L===Ra&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==oi&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==jn&&!N)}function c(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=m>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:R,maxSamples:A}}function sM(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Gi,o=new Ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const m=h.clippingPlanes,_=h.clipIntersection,g=h.clipShadows,p=i.get(h);if(!s||m===null||m.length===0||r&&!g)r?u(null):l();else{const y=r?0:n,S=y*4;let v=p.clippingState||null;c.value=v,v=u(m,d,S,f);for(let R=0;R!==S;++R)v[R]=t[R];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,m){const _=h!==null?h.length:0;let g=null;if(_!==0){if(g=c.value,m!==!0||g===null){const p=f+_*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let S=0,v=f;S!==_;++S,v+=4)a.copy(h[S]).applyMatrix4(y,o),a.normal.toArray(g,v),g[v+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function rM(i){let e=new WeakMap;function t(a,o){return o===zo?a.mapping=yr:o===Zl&&(a.mapping=Mr),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===zo||o===Zl)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new j0(c.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const rr=4,tf=[.125,.215,.35,.446,.526,.582],ws=20,ol=new wh,nf=new xe;let cl=null,ll=0,ul=0,hl=!1;const ys=(1+Math.sqrt(5))/2,ir=1/ys,sf=[new E(-ys,ir,0),new E(ys,ir,0),new E(-ir,0,ys),new E(ir,0,ys),new E(0,ys,-ir),new E(0,ys,ir),new E(-1,1,-1),new E(1,1,-1),new E(-1,1,1),new E(1,1,1)],aM=new E;class rf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=aM}=r;cl=this._renderer.getRenderTarget(),ll=this._renderer.getActiveCubeFace(),ul=this._renderer.getActiveMipmapLevel(),hl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=of(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(cl,ll,ul),this._renderer.xr.enabled=hl,e.scissorTest=!1,go(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===yr||e.mapping===Mr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),cl=this._renderer.getRenderTarget(),ll=this._renderer.getActiveCubeFace(),ul=this._renderer.getActiveMipmapLevel(),hl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:En,minFilter:En,generateMipmaps:!1,type:Ra,format:Fn,colorSpace:mn,depthBuffer:!1},s=af(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=af(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=oM(r)),this._blurMaterial=cM(r,e,t)}return s}_compileMaterial(e){const t=new Z(this._lodPlanes[0],e);this._renderer.compile(t,ol)}_sceneToCubeUV(e,t,n,s,r){const c=new dn(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(nf),h.toneMapping=Zi,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));const _=new tt({name:"PMREM.Background",side:xn,depthWrite:!1,depthTest:!1}),g=new Z(new it,_);let p=!1;const y=e.background;y?y.isColor&&(_.color.copy(y),e.background=null,p=!0):(_.color.copy(nf),p=!0);for(let S=0;S<6;S++){const v=S%3;v===0?(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[S],r.y,r.z)):v===1?(c.up.set(0,0,l[S]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[S],r.z)):(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[S]));const R=this._cubeSize;go(s,v*R,S>2?R:0,R,R),h.setRenderTarget(s),p&&h.render(g,c),h.render(e,c)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=y}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===yr||e.mapping===Mr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=cf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=of());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Z(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;go(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,ol)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=sf[(s-r-1)%sf.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Z(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ws-1),_=r/m,g=isFinite(r)?1+Math.floor(u*_):ws;g>ws&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ws}`);const p=[];let y=0;for(let L=0;L<ws;++L){const N=L/_,b=Math.exp(-N*N/2);p.push(b),L===0?y+=b:L<g&&(y+=2*b)}for(let L=0;L<p.length;L++)p[L]=p[L]/y;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:S}=this;d.dTheta.value=m,d.mipInt.value=S-n;const v=this._sizeLods[s],R=3*v*(s>S-rr?s-S+rr:0),A=4*(this._cubeSize-v);go(t,R,A,3*v,2*v),c.setRenderTarget(t),c.render(h,ol)}}function oM(i){const e=[],t=[],n=[];let s=i;const r=i-rr+1+tf.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-rr?c=tf[a-i+rr-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,m=6,_=3,g=2,p=1,y=new Float32Array(_*m*f),S=new Float32Array(g*m*f),v=new Float32Array(p*m*f);for(let A=0;A<f;A++){const L=A%3*2/3-1,N=A>2?0:-1,b=[L,N,0,L+2/3,N,0,L+2/3,N+1,0,L,N,0,L+2/3,N+1,0,L,N+1,0];y.set(b,_*m*A),S.set(d,g*m*A);const T=[A,A,A,A,A,A];v.set(T,p*m*A)}const R=new bt;R.setAttribute("position",new qt(y,_)),R.setAttribute("uv",new qt(S,g)),R.setAttribute("faceIndex",new qt(v,p)),e.push(R),s>rr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function af(i,e,t){const n=new Ls(i,e,t);return n.texture.mapping=cc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function go(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function cM(i,e,t){const n=new Float32Array(ws),s=new E(0,1,0);return new Ii({name:"SphericalGaussianBlur",defines:{n:ws,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Eh(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function of(){return new Ii({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Eh(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function cf(){return new Ii({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Eh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Eh(){return`

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
	`}function lM(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===zo||c===Zl,u=c===yr||c===Mr;if(l||u){let h=e.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new rf(i)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return l&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new rf(i)),h=l?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function uM(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&or("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function hM(i,e,t,n){const s={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function c(h){const d=h.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function l(h){const d=[],f=h.index,m=h.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let S=0,v=y.length;S<v;S+=3){const R=y[S+0],A=y[S+1],L=y[S+2];d.push(R,A,A,L,L,R)}}else if(m!==void 0){const y=m.array;_=m.version;for(let S=0,v=y.length/3-1;S<v;S+=3){const R=S+0,A=S+1,L=S+2;d.push(R,A,A,L,L,R)}}else return;const g=new(Ep(d)?Pp:Cp)(d,1);g.version=_;const p=r.get(h);p&&e.remove(p),r.set(h,g)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function dM(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*a),t.update(f,n,1)}function l(d,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,d*a,m),t.update(f,n,m))}function u(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function h(d,f,m,_){if(m===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,m);let p=0;for(let y=0;y<m;y++)p+=f[y]*_[y];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function fM(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function pM(i,e,t){const n=new WeakMap,s=new ut;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let T=function(){N.dispose(),n.delete(o),o.removeEventListener("dispose",T)};var f=T;d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let v=0;m===!0&&(v=1),_===!0&&(v=2),g===!0&&(v=3);let R=o.attributes.position.count*v,A=1;R>e.maxTextureSize&&(A=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const L=new Float32Array(R*A*4*h),N=new Ap(L,R,A,h);N.type=jn,N.needsUpdate=!0;const b=v*4;for(let I=0;I<h;I++){const H=p[I],G=y[I],q=S[I],ee=R*A*4*I;for(let j=0;j<H.count;j++){const te=j*b;m===!0&&(s.fromBufferAttribute(H,j),L[ee+te+0]=s.x,L[ee+te+1]=s.y,L[ee+te+2]=s.z,L[ee+te+3]=0),_===!0&&(s.fromBufferAttribute(G,j),L[ee+te+4]=s.x,L[ee+te+5]=s.y,L[ee+te+6]=s.z,L[ee+te+7]=0),g===!0&&(s.fromBufferAttribute(q,j),L[ee+te+8]=s.x,L[ee+te+9]=s.y,L[ee+te+10]=s.z,L[ee+te+11]=q.itemSize===4?s.w:1)}}d={count:h,texture:N,size:new ue(R,A)},n.set(o,d),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let g=0;g<l.length;g++)m+=l[g];const _=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function mM(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return h}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}const Jp=new en,lf=new Fp(1,1),Qp=new Ap,em=new I0,tm=new Dp,uf=[],hf=[],df=new Float32Array(16),ff=new Float32Array(9),pf=new Float32Array(4);function Fr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=uf[s];if(r===void 0&&(r=new Float32Array(s),uf[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function jt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function $t(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function pc(i,e){let t=hf[e];t===void 0&&(t=new Int32Array(e),hf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function gM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function _M(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;i.uniform2fv(this.addr,e),$t(t,e)}}function vM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(jt(t,e))return;i.uniform3fv(this.addr,e),$t(t,e)}}function xM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;i.uniform4fv(this.addr,e),$t(t,e)}}function yM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(jt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),$t(t,e)}else{if(jt(t,n))return;pf.set(n),i.uniformMatrix2fv(this.addr,!1,pf),$t(t,n)}}function MM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(jt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),$t(t,e)}else{if(jt(t,n))return;ff.set(n),i.uniformMatrix3fv(this.addr,!1,ff),$t(t,n)}}function SM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(jt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),$t(t,e)}else{if(jt(t,n))return;df.set(n),i.uniformMatrix4fv(this.addr,!1,df),$t(t,n)}}function wM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function bM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;i.uniform2iv(this.addr,e),$t(t,e)}}function TM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(jt(t,e))return;i.uniform3iv(this.addr,e),$t(t,e)}}function EM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;i.uniform4iv(this.addr,e),$t(t,e)}}function AM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function RM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;i.uniform2uiv(this.addr,e),$t(t,e)}}function CM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(jt(t,e))return;i.uniform3uiv(this.addr,e),$t(t,e)}}function PM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;i.uniform4uiv(this.addr,e),$t(t,e)}}function LM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(lf.compareFunction=Tp,r=lf):r=Jp,t.setTexture2D(e||r,s)}function IM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||em,s)}function DM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||tm,s)}function NM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Qp,s)}function UM(i){switch(i){case 5126:return gM;case 35664:return _M;case 35665:return vM;case 35666:return xM;case 35674:return yM;case 35675:return MM;case 35676:return SM;case 5124:case 35670:return wM;case 35667:case 35671:return bM;case 35668:case 35672:return TM;case 35669:case 35673:return EM;case 5125:return AM;case 36294:return RM;case 36295:return CM;case 36296:return PM;case 35678:case 36198:case 36298:case 36306:case 35682:return LM;case 35679:case 36299:case 36307:return IM;case 35680:case 36300:case 36308:case 36293:return DM;case 36289:case 36303:case 36311:case 36292:return NM}}function FM(i,e){i.uniform1fv(this.addr,e)}function OM(i,e){const t=Fr(e,this.size,2);i.uniform2fv(this.addr,t)}function kM(i,e){const t=Fr(e,this.size,3);i.uniform3fv(this.addr,t)}function BM(i,e){const t=Fr(e,this.size,4);i.uniform4fv(this.addr,t)}function zM(i,e){const t=Fr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function HM(i,e){const t=Fr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function VM(i,e){const t=Fr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function GM(i,e){i.uniform1iv(this.addr,e)}function WM(i,e){i.uniform2iv(this.addr,e)}function XM(i,e){i.uniform3iv(this.addr,e)}function qM(i,e){i.uniform4iv(this.addr,e)}function YM(i,e){i.uniform1uiv(this.addr,e)}function KM(i,e){i.uniform2uiv(this.addr,e)}function jM(i,e){i.uniform3uiv(this.addr,e)}function $M(i,e){i.uniform4uiv(this.addr,e)}function ZM(i,e,t){const n=this.cache,s=e.length,r=pc(t,s);jt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Jp,r[a])}function JM(i,e,t){const n=this.cache,s=e.length,r=pc(t,s);jt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||em,r[a])}function QM(i,e,t){const n=this.cache,s=e.length,r=pc(t,s);jt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||tm,r[a])}function eS(i,e,t){const n=this.cache,s=e.length,r=pc(t,s);jt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Qp,r[a])}function tS(i){switch(i){case 5126:return FM;case 35664:return OM;case 35665:return kM;case 35666:return BM;case 35674:return zM;case 35675:return HM;case 35676:return VM;case 5124:case 35670:return GM;case 35667:case 35671:return WM;case 35668:case 35672:return XM;case 35669:case 35673:return qM;case 5125:return YM;case 36294:return KM;case 36295:return jM;case 36296:return $M;case 35678:case 36198:case 36298:case 36306:case 35682:return ZM;case 35679:case 36299:case 36307:return JM;case 35680:case 36300:case 36308:case 36293:return QM;case 36289:case 36303:case 36311:case 36292:return eS}}class nS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=UM(t.type)}}class iS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tS(t.type)}}class sS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const dl=/(\w+)(\])?(\[|\.)?/g;function mf(i,e){i.seq.push(e),i.map[e.id]=e}function rS(i,e,t){const n=i.name,s=n.length;for(dl.lastIndex=0;;){const r=dl.exec(n),a=dl.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){mf(t,l===void 0?new nS(o,i,e):new iS(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new sS(o),mf(t,h)),t=h}}}class Lo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);rS(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function gf(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const aS=37297;let oS=0;function cS(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const _f=new Ke;function lS(i){Qe._getMatrix(_f,Qe.workingColorSpace,i);const e=`mat3( ${_f.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(i)){case Vo:return[e,"LinearTransferOETF"];case _t:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function vf(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+cS(i.getShaderSource(e),o)}else return r}function uS(i,e){const t=lS(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function hS(i,e){let t;switch(e){case Wg:t="Linear";break;case Xg:t="Reinhard";break;case qg:t="Cineon";break;case pp:t="ACESFilmic";break;case Kg:t="AgX";break;case jg:t="Neutral";break;case Yg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const _o=new E;function dS(){Qe.getLuminanceCoefficients(_o);const i=_o.x.toFixed(4),e=_o.y.toFixed(4),t=_o.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fS(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ea).join(`
`)}function pS(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function mS(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ea(i){return i!==""}function xf(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function yf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const gS=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lu(i){return i.replace(gS,vS)}const _S=new Map;function vS(i,e){let t=je[e];if(t===void 0){const n=_S.get(e);if(n!==void 0)t=je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Lu(t)}const xS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mf(i){return i.replace(xS,yS)}function yS(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Sf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function MS(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ju?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===wg?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===wi&&(e="SHADOWMAP_TYPE_VSM"),e}function SS(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case yr:case Mr:e="ENVMAP_TYPE_CUBE";break;case cc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function wS(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Mr&&(e="ENVMAP_MODE_REFRACTION"),e}function bS(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Qu:e="ENVMAP_BLENDING_MULTIPLY";break;case Vg:e="ENVMAP_BLENDING_MIX";break;case Gg:e="ENVMAP_BLENDING_ADD";break}return e}function TS(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function ES(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=MS(t),l=SS(t),u=wS(t),h=bS(t),d=TS(t),f=fS(t),m=pS(r),_=s.createProgram();let g,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ea).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ea).join(`
`),p.length>0&&(p+=`
`)):(g=[Sf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ea).join(`
`),p=[Sf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Zi?"#define TONE_MAPPING":"",t.toneMapping!==Zi?je.tonemapping_pars_fragment:"",t.toneMapping!==Zi?hS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,uS("linearToOutputTexel",t.outputColorSpace),dS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ea).join(`
`)),a=Lu(a),a=xf(a,t),a=yf(a,t),o=Lu(o),o=xf(o,t),o=yf(o,t),a=Mf(a),o=Mf(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===cd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===cd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=y+g+a,v=y+p+o,R=gf(s,s.VERTEX_SHADER,S),A=gf(s,s.FRAGMENT_SHADER,v);s.attachShader(_,R),s.attachShader(_,A),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function L(I){if(i.debug.checkShaderErrors){const H=s.getProgramInfoLog(_)||"",G=s.getShaderInfoLog(R)||"",q=s.getShaderInfoLog(A)||"",ee=H.trim(),j=G.trim(),te=q.trim();let W=!0,de=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,R,A);else{const _e=vf(s,R,"vertex"),Ie=vf(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+ee+`
`+_e+`
`+Ie)}else ee!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ee):(j===""||te==="")&&(de=!1);de&&(I.diagnostics={runnable:W,programLog:ee,vertexShader:{log:j,prefix:g},fragmentShader:{log:te,prefix:p}})}s.deleteShader(R),s.deleteShader(A),N=new Lo(s,_),b=mS(s,_)}let N;this.getUniforms=function(){return N===void 0&&L(this),N};let b;this.getAttributes=function(){return b===void 0&&L(this),b};let T=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=s.getProgramParameter(_,aS)),T},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=oS++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=A,this}let AS=0;class RS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new CS(e),t.set(e,n)),n}}class CS{constructor(e){this.id=AS++,this.code=e,this.usedTimes=0}}function PS(i,e,t,n,s,r,a){const o=new uh,c=new RS,l=new Set,u=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function g(b,T,I,H,G){const q=H.fog,ee=G.geometry,j=b.isMeshStandardMaterial?H.environment:null,te=(b.isMeshStandardMaterial?t:e).get(b.envMap||j),W=te&&te.mapping===cc?te.image.height:null,de=m[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const _e=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,Ie=_e!==void 0?_e.length:0;let $e=0;ee.morphAttributes.position!==void 0&&($e=1),ee.morphAttributes.normal!==void 0&&($e=2),ee.morphAttributes.color!==void 0&&($e=3);let Rt,vt,K,fe;if(de){const dt=Qn[de];Rt=dt.vertexShader,vt=dt.fragmentShader}else Rt=b.vertexShader,vt=b.fragmentShader,c.update(b),K=c.getVertexShaderID(b),fe=c.getFragmentShaderID(b);const ce=i.getRenderTarget(),Fe=i.state.buffers.depth.getReversed(),Oe=G.isInstancedMesh===!0,We=G.isBatchedMesh===!0,Ot=!!b.map,at=!!b.matcap,D=!!te,Mt=!!b.aoMap,Ne=!!b.lightMap,lt=!!b.bumpMap,Pe=!!b.normalMap,Ct=!!b.displacementMap,Me=!!b.emissiveMap,Ze=!!b.metalnessMap,Zt=!!b.roughnessMap,kt=b.anisotropy>0,C=b.clearcoat>0,M=b.dispersion>0,k=b.iridescence>0,Y=b.sheen>0,ne=b.transmission>0,X=kt&&!!b.anisotropyMap,Ce=C&&!!b.clearcoatMap,oe=C&&!!b.clearcoatNormalMap,Te=C&&!!b.clearcoatRoughnessMap,Ae=k&&!!b.iridescenceMap,re=k&&!!b.iridescenceThicknessMap,ge=Y&&!!b.sheenColorMap,Be=Y&&!!b.sheenRoughnessMap,Re=!!b.specularMap,pe=!!b.specularColorMap,Ye=!!b.specularIntensityMap,U=ne&&!!b.transmissionMap,ae=ne&&!!b.thicknessMap,le=!!b.gradientMap,ye=!!b.alphaMap,ie=b.alphaTest>0,Q=!!b.alphaHash,we=!!b.extensions;let Xe=Zi;b.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(Xe=i.toneMapping);const St={shaderID:de,shaderType:b.type,shaderName:b.name,vertexShader:Rt,fragmentShader:vt,defines:b.defines,customVertexShaderID:K,customFragmentShaderID:fe,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:We,batchingColor:We&&G._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&G.instanceColor!==null,instancingMorph:Oe&&G.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ce===null?i.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:mn,alphaToCoverage:!!b.alphaToCoverage,map:Ot,matcap:at,envMap:D,envMapMode:D&&te.mapping,envMapCubeUVHeight:W,aoMap:Mt,lightMap:Ne,bumpMap:lt,normalMap:Pe,displacementMap:d&&Ct,emissiveMap:Me,normalMapObjectSpace:Pe&&b.normalMapType===t0,normalMapTangentSpace:Pe&&b.normalMapType===oh,metalnessMap:Ze,roughnessMap:Zt,anisotropy:kt,anisotropyMap:X,clearcoat:C,clearcoatMap:Ce,clearcoatNormalMap:oe,clearcoatRoughnessMap:Te,dispersion:M,iridescence:k,iridescenceMap:Ae,iridescenceThicknessMap:re,sheen:Y,sheenColorMap:ge,sheenRoughnessMap:Be,specularMap:Re,specularColorMap:pe,specularIntensityMap:Ye,transmission:ne,transmissionMap:U,thicknessMap:ae,gradientMap:le,opaque:b.transparent===!1&&b.blending===ar&&b.alphaToCoverage===!1,alphaMap:ye,alphaTest:ie,alphaHash:Q,combine:b.combine,mapUv:Ot&&_(b.map.channel),aoMapUv:Mt&&_(b.aoMap.channel),lightMapUv:Ne&&_(b.lightMap.channel),bumpMapUv:lt&&_(b.bumpMap.channel),normalMapUv:Pe&&_(b.normalMap.channel),displacementMapUv:Ct&&_(b.displacementMap.channel),emissiveMapUv:Me&&_(b.emissiveMap.channel),metalnessMapUv:Ze&&_(b.metalnessMap.channel),roughnessMapUv:Zt&&_(b.roughnessMap.channel),anisotropyMapUv:X&&_(b.anisotropyMap.channel),clearcoatMapUv:Ce&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:oe&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:re&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Be&&_(b.sheenRoughnessMap.channel),specularMapUv:Re&&_(b.specularMap.channel),specularColorMapUv:pe&&_(b.specularColorMap.channel),specularIntensityMapUv:Ye&&_(b.specularIntensityMap.channel),transmissionMapUv:U&&_(b.transmissionMap.channel),thicknessMapUv:ae&&_(b.thicknessMap.channel),alphaMapUv:ye&&_(b.alphaMap.channel),vertexTangents:!!ee.attributes.tangent&&(Pe||kt),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!ee.attributes.uv&&(Ot||ye),fog:!!q,useFog:b.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Fe,skinning:G.isSkinnedMesh===!0,morphTargets:ee.morphAttributes.position!==void 0,morphNormals:ee.morphAttributes.normal!==void 0,morphColors:ee.morphAttributes.color!==void 0,morphTargetsCount:Ie,morphTextureStride:$e,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Xe,decodeVideoTexture:Ot&&b.map.isVideoTexture===!0&&Qe.getTransfer(b.map.colorSpace)===_t,decodeVideoTextureEmissive:Me&&b.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(b.emissiveMap.colorSpace)===_t,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Vt,flipSided:b.side===xn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:we&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(we&&b.extensions.multiDraw===!0||We)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return St.vertexUv1s=l.has(1),St.vertexUv2s=l.has(2),St.vertexUv3s=l.has(3),l.clear(),St}function p(b){const T=[];if(b.shaderID?T.push(b.shaderID):(T.push(b.customVertexShaderID),T.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)T.push(I),T.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(y(T,b),S(T,b),T.push(i.outputColorSpace)),T.push(b.customProgramCacheKey),T.join()}function y(b,T){b.push(T.precision),b.push(T.outputColorSpace),b.push(T.envMapMode),b.push(T.envMapCubeUVHeight),b.push(T.mapUv),b.push(T.alphaMapUv),b.push(T.lightMapUv),b.push(T.aoMapUv),b.push(T.bumpMapUv),b.push(T.normalMapUv),b.push(T.displacementMapUv),b.push(T.emissiveMapUv),b.push(T.metalnessMapUv),b.push(T.roughnessMapUv),b.push(T.anisotropyMapUv),b.push(T.clearcoatMapUv),b.push(T.clearcoatNormalMapUv),b.push(T.clearcoatRoughnessMapUv),b.push(T.iridescenceMapUv),b.push(T.iridescenceThicknessMapUv),b.push(T.sheenColorMapUv),b.push(T.sheenRoughnessMapUv),b.push(T.specularMapUv),b.push(T.specularColorMapUv),b.push(T.specularIntensityMapUv),b.push(T.transmissionMapUv),b.push(T.thicknessMapUv),b.push(T.combine),b.push(T.fogExp2),b.push(T.sizeAttenuation),b.push(T.morphTargetsCount),b.push(T.morphAttributeCount),b.push(T.numDirLights),b.push(T.numPointLights),b.push(T.numSpotLights),b.push(T.numSpotLightMaps),b.push(T.numHemiLights),b.push(T.numRectAreaLights),b.push(T.numDirLightShadows),b.push(T.numPointLightShadows),b.push(T.numSpotLightShadows),b.push(T.numSpotLightShadowsWithMaps),b.push(T.numLightProbes),b.push(T.shadowMapType),b.push(T.toneMapping),b.push(T.numClippingPlanes),b.push(T.numClipIntersection),b.push(T.depthPacking)}function S(b,T){o.disableAll(),T.supportsVertexTextures&&o.enable(0),T.instancing&&o.enable(1),T.instancingColor&&o.enable(2),T.instancingMorph&&o.enable(3),T.matcap&&o.enable(4),T.envMap&&o.enable(5),T.normalMapObjectSpace&&o.enable(6),T.normalMapTangentSpace&&o.enable(7),T.clearcoat&&o.enable(8),T.iridescence&&o.enable(9),T.alphaTest&&o.enable(10),T.vertexColors&&o.enable(11),T.vertexAlphas&&o.enable(12),T.vertexUv1s&&o.enable(13),T.vertexUv2s&&o.enable(14),T.vertexUv3s&&o.enable(15),T.vertexTangents&&o.enable(16),T.anisotropy&&o.enable(17),T.alphaHash&&o.enable(18),T.batching&&o.enable(19),T.dispersion&&o.enable(20),T.batchingColor&&o.enable(21),T.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),b.push(o.mask)}function v(b){const T=m[b.type];let I;if(T){const H=Qn[T];I=X0.clone(H.uniforms)}else I=b.uniforms;return I}function R(b,T){let I;for(let H=0,G=u.length;H<G;H++){const q=u[H];if(q.cacheKey===T){I=q,++I.usedTimes;break}}return I===void 0&&(I=new ES(i,T,b,r),u.push(I)),I}function A(b){if(--b.usedTimes===0){const T=u.indexOf(b);u[T]=u[u.length-1],u.pop(),b.destroy()}}function L(b){c.remove(b)}function N(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:R,releaseProgram:A,releaseShaderCache:L,programs:u,dispose:N}}function LS(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function IS(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function wf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function bf(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,d,f,m,_,g){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:m,renderOrder:h.renderOrder,z:_,group:g},i[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=h.renderOrder,p.z=_,p.group=g),e++,p}function o(h,d,f,m,_,g){const p=a(h,d,f,m,_,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(h,d,f,m,_,g){const p=a(h,d,f,m,_,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function l(h,d){t.length>1&&t.sort(h||IS),n.length>1&&n.sort(d||wf),s.length>1&&s.sort(d||wf)}function u(){for(let h=e,d=i.length;h<d;h++){const f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:u,sort:l}}function DS(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new bf,i.set(n,[a])):s>=r.length?(a=new bf,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function NS(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new E,color:new xe};break;case"SpotLight":t={position:new E,direction:new E,color:new xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new xe,groundColor:new xe};break;case"RectAreaLight":t={color:new xe,position:new E,halfWidth:new E,halfHeight:new E};break}return i[e.id]=t,t}}}function US(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let FS=0;function OS(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function kS(i){const e=new NS,t=US(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new E);const s=new E,r=new qe,a=new qe;function o(l){let u=0,h=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,y=0,S=0,v=0,R=0,A=0,L=0;l.sort(OS);for(let b=0,T=l.length;b<T;b++){const I=l[b],H=I.color,G=I.intensity,q=I.distance,ee=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=H.r*G,h+=H.g*G,d+=H.b*G;else if(I.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(I.sh.coefficients[j],G);L++}else if(I.isDirectionalLight){const j=e.get(I);if(j.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const te=I.shadow,W=t.get(I);W.shadowIntensity=te.intensity,W.shadowBias=te.bias,W.shadowNormalBias=te.normalBias,W.shadowRadius=te.radius,W.shadowMapSize=te.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=ee,n.directionalShadowMatrix[f]=I.shadow.matrix,y++}n.directional[f]=j,f++}else if(I.isSpotLight){const j=e.get(I);j.position.setFromMatrixPosition(I.matrixWorld),j.color.copy(H).multiplyScalar(G),j.distance=q,j.coneCos=Math.cos(I.angle),j.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),j.decay=I.decay,n.spot[_]=j;const te=I.shadow;if(I.map&&(n.spotLightMap[R]=I.map,R++,te.updateMatrices(I),I.castShadow&&A++),n.spotLightMatrix[_]=te.matrix,I.castShadow){const W=t.get(I);W.shadowIntensity=te.intensity,W.shadowBias=te.bias,W.shadowNormalBias=te.normalBias,W.shadowRadius=te.radius,W.shadowMapSize=te.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=ee,v++}_++}else if(I.isRectAreaLight){const j=e.get(I);j.color.copy(H).multiplyScalar(G),j.halfWidth.set(I.width*.5,0,0),j.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=j,g++}else if(I.isPointLight){const j=e.get(I);if(j.color.copy(I.color).multiplyScalar(I.intensity),j.distance=I.distance,j.decay=I.decay,I.castShadow){const te=I.shadow,W=t.get(I);W.shadowIntensity=te.intensity,W.shadowBias=te.bias,W.shadowNormalBias=te.normalBias,W.shadowRadius=te.radius,W.shadowMapSize=te.mapSize,W.shadowCameraNear=te.camera.near,W.shadowCameraFar=te.camera.far,n.pointShadow[m]=W,n.pointShadowMap[m]=ee,n.pointShadowMatrix[m]=I.shadow.matrix,S++}n.point[m]=j,m++}else if(I.isHemisphereLight){const j=e.get(I);j.skyColor.copy(I.color).multiplyScalar(G),j.groundColor.copy(I.groundColor).multiplyScalar(G),n.hemi[p]=j,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=he.LTC_FLOAT_1,n.rectAreaLTC2=he.LTC_FLOAT_2):(n.rectAreaLTC1=he.LTC_HALF_1,n.rectAreaLTC2=he.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const N=n.hash;(N.directionalLength!==f||N.pointLength!==m||N.spotLength!==_||N.rectAreaLength!==g||N.hemiLength!==p||N.numDirectionalShadows!==y||N.numPointShadows!==S||N.numSpotShadows!==v||N.numSpotMaps!==R||N.numLightProbes!==L)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+R-A,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=L,N.directionalLength=f,N.pointLength=m,N.spotLength=_,N.rectAreaLength=g,N.hemiLength=p,N.numDirectionalShadows=y,N.numPointShadows=S,N.numSpotShadows=v,N.numSpotMaps=R,N.numLightProbes=L,n.version=FS++)}function c(l,u){let h=0,d=0,f=0,m=0,_=0;const g=u.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const S=l[p];if(S.isDirectionalLight){const v=n.directional[h];v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),h++}else if(S.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),f++}else if(S.isRectAreaLight){const v=n.rectArea[m];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(g),a.identity(),r.copy(S.matrixWorld),r.premultiply(g),a.extractRotation(r),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),m++}else if(S.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(g),d++}else if(S.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(g),_++}}}return{setup:o,setupView:c,state:n}}function Tf(i){const e=new kS(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function BS(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Tf(i),e.set(s,[o])):r>=a.length?(o=new Tf(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const zS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,HS=`uniform sampler2D shadow_pass;
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
}`;function VS(i,e,t){let n=new ph;const s=new ue,r=new ue,a=new ut,o=new z_({depthPacking:e0}),c=new H_,l={},u=t.maxTextureSize,h={[ai]:xn,[xn]:ai,[Vt]:Vt},d=new Ii({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:zS,fragmentShader:HS}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new bt;m.setAttribute("position",new qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Z(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ju;let p=this.type;this.render=function(A,L,N){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;const b=i.getRenderTarget(),T=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),H=i.state;H.setBlending($i),H.buffers.depth.getReversed()?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const G=p!==wi&&this.type===wi,q=p===wi&&this.type!==wi;for(let ee=0,j=A.length;ee<j;ee++){const te=A[ee],W=te.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const de=W.getFrameExtents();if(s.multiply(de),r.copy(W.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/de.x),s.x=r.x*de.x,W.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/de.y),s.y=r.y*de.y,W.mapSize.y=r.y)),W.map===null||G===!0||q===!0){const Ie=this.type!==wi?{minFilter:fn,magFilter:fn}:{};W.map!==null&&W.map.dispose(),W.map=new Ls(s.x,s.y,Ie),W.map.texture.name=te.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const _e=W.getViewportCount();for(let Ie=0;Ie<_e;Ie++){const $e=W.getViewport(Ie);a.set(r.x*$e.x,r.y*$e.y,r.x*$e.z,r.y*$e.w),H.viewport(a),W.updateMatrices(te,Ie),n=W.getFrustum(),v(L,N,W.camera,te,this.type)}W.isPointLightShadow!==!0&&this.type===wi&&y(W,N),W.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(b,T,I)};function y(A,L){const N=e.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Ls(s.x,s.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(L,null,N,d,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(L,null,N,f,_,null)}function S(A,L,N,b){let T=null;const I=N.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(I!==void 0)T=I;else if(T=N.isPointLight===!0?c:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const H=T.uuid,G=L.uuid;let q=l[H];q===void 0&&(q={},l[H]=q);let ee=q[G];ee===void 0&&(ee=T.clone(),q[G]=ee,L.addEventListener("dispose",R)),T=ee}if(T.visible=L.visible,T.wireframe=L.wireframe,b===wi?T.side=L.shadowSide!==null?L.shadowSide:L.side:T.side=L.shadowSide!==null?L.shadowSide:h[L.side],T.alphaMap=L.alphaMap,T.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,T.map=L.map,T.clipShadows=L.clipShadows,T.clippingPlanes=L.clippingPlanes,T.clipIntersection=L.clipIntersection,T.displacementMap=L.displacementMap,T.displacementScale=L.displacementScale,T.displacementBias=L.displacementBias,T.wireframeLinewidth=L.wireframeLinewidth,T.linewidth=L.linewidth,N.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const H=i.properties.get(T);H.light=N}return T}function v(A,L,N,b,T){if(A.visible===!1)return;if(A.layers.test(L.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&T===wi)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,A.matrixWorld);const G=e.update(A),q=A.material;if(Array.isArray(q)){const ee=G.groups;for(let j=0,te=ee.length;j<te;j++){const W=ee[j],de=q[W.materialIndex];if(de&&de.visible){const _e=S(A,de,b,T);A.onBeforeShadow(i,A,L,N,G,_e,W),i.renderBufferDirect(N,null,G,_e,A,W),A.onAfterShadow(i,A,L,N,G,_e,W)}}}else if(q.visible){const ee=S(A,q,b,T);A.onBeforeShadow(i,A,L,N,G,ee,null),i.renderBufferDirect(N,null,G,ee,A,null),A.onAfterShadow(i,A,L,N,G,ee,null)}}const H=A.children;for(let G=0,q=H.length;G<q;G++)v(H[G],L,N,b,T)}function R(A){A.target.removeEventListener("dispose",R);for(const N in l){const b=l[N],T=A.target.uuid;T in b&&(b[T].dispose(),delete b[T])}}}const GS={[Wl]:Xl,[ql]:jl,[Yl]:$l,[xr]:Kl,[Xl]:Wl,[jl]:ql,[$l]:Yl,[Kl]:xr};function WS(i,e){function t(){let U=!1;const ae=new ut;let le=null;const ye=new ut(0,0,0,0);return{setMask:function(ie){le!==ie&&!U&&(i.colorMask(ie,ie,ie,ie),le=ie)},setLocked:function(ie){U=ie},setClear:function(ie,Q,we,Xe,St){St===!0&&(ie*=Xe,Q*=Xe,we*=Xe),ae.set(ie,Q,we,Xe),ye.equals(ae)===!1&&(i.clearColor(ie,Q,we,Xe),ye.copy(ae))},reset:function(){U=!1,le=null,ye.set(-1,0,0,0)}}}function n(){let U=!1,ae=!1,le=null,ye=null,ie=null;return{setReversed:function(Q){if(ae!==Q){const we=e.get("EXT_clip_control");Q?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),ae=Q;const Xe=ie;ie=null,this.setClear(Xe)}},getReversed:function(){return ae},setTest:function(Q){Q?ce(i.DEPTH_TEST):Fe(i.DEPTH_TEST)},setMask:function(Q){le!==Q&&!U&&(i.depthMask(Q),le=Q)},setFunc:function(Q){if(ae&&(Q=GS[Q]),ye!==Q){switch(Q){case Wl:i.depthFunc(i.NEVER);break;case Xl:i.depthFunc(i.ALWAYS);break;case ql:i.depthFunc(i.LESS);break;case xr:i.depthFunc(i.LEQUAL);break;case Yl:i.depthFunc(i.EQUAL);break;case Kl:i.depthFunc(i.GEQUAL);break;case jl:i.depthFunc(i.GREATER);break;case $l:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ye=Q}},setLocked:function(Q){U=Q},setClear:function(Q){ie!==Q&&(ae&&(Q=1-Q),i.clearDepth(Q),ie=Q)},reset:function(){U=!1,le=null,ye=null,ie=null,ae=!1}}}function s(){let U=!1,ae=null,le=null,ye=null,ie=null,Q=null,we=null,Xe=null,St=null;return{setTest:function(dt){U||(dt?ce(i.STENCIL_TEST):Fe(i.STENCIL_TEST))},setMask:function(dt){ae!==dt&&!U&&(i.stencilMask(dt),ae=dt)},setFunc:function(dt,di,Zn){(le!==dt||ye!==di||ie!==Zn)&&(i.stencilFunc(dt,di,Zn),le=dt,ye=di,ie=Zn)},setOp:function(dt,di,Zn){(Q!==dt||we!==di||Xe!==Zn)&&(i.stencilOp(dt,di,Zn),Q=dt,we=di,Xe=Zn)},setLocked:function(dt){U=dt},setClear:function(dt){St!==dt&&(i.clearStencil(dt),St=dt)},reset:function(){U=!1,ae=null,le=null,ye=null,ie=null,Q=null,we=null,Xe=null,St=null}}}const r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let u={},h={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,y=null,S=null,v=null,R=null,A=null,L=new xe(0,0,0),N=0,b=!1,T=null,I=null,H=null,G=null,q=null;const ee=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,te=0;const W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(W)[1]),j=te>=1):W.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),j=te>=2);let de=null,_e={};const Ie=i.getParameter(i.SCISSOR_BOX),$e=i.getParameter(i.VIEWPORT),Rt=new ut().fromArray(Ie),vt=new ut().fromArray($e);function K(U,ae,le,ye){const ie=new Uint8Array(4),Q=i.createTexture();i.bindTexture(U,Q),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let we=0;we<le;we++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ae,0,i.RGBA,1,1,ye,0,i.RGBA,i.UNSIGNED_BYTE,ie):i.texImage2D(ae+we,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ie);return Q}const fe={};fe[i.TEXTURE_2D]=K(i.TEXTURE_2D,i.TEXTURE_2D,1),fe[i.TEXTURE_CUBE_MAP]=K(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),fe[i.TEXTURE_2D_ARRAY]=K(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),fe[i.TEXTURE_3D]=K(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ce(i.DEPTH_TEST),a.setFunc(xr),lt(!1),Pe(ed),ce(i.CULL_FACE),Mt($i);function ce(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function Fe(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function Oe(U,ae){return h[U]!==ae?(i.bindFramebuffer(U,ae),h[U]=ae,U===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ae),U===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ae),!0):!1}function We(U,ae){let le=f,ye=!1;if(U){le=d.get(ae),le===void 0&&(le=[],d.set(ae,le));const ie=U.textures;if(le.length!==ie.length||le[0]!==i.COLOR_ATTACHMENT0){for(let Q=0,we=ie.length;Q<we;Q++)le[Q]=i.COLOR_ATTACHMENT0+Q;le.length=ie.length,ye=!0}}else le[0]!==i.BACK&&(le[0]=i.BACK,ye=!0);ye&&i.drawBuffers(le)}function Ot(U){return m!==U?(i.useProgram(U),m=U,!0):!1}const at={[Ss]:i.FUNC_ADD,[Tg]:i.FUNC_SUBTRACT,[Eg]:i.FUNC_REVERSE_SUBTRACT};at[Ag]=i.MIN,at[Rg]=i.MAX;const D={[Cg]:i.ZERO,[Pg]:i.ONE,[Lg]:i.SRC_COLOR,[Vl]:i.SRC_ALPHA,[Og]:i.SRC_ALPHA_SATURATE,[Ug]:i.DST_COLOR,[Dg]:i.DST_ALPHA,[Ig]:i.ONE_MINUS_SRC_COLOR,[Gl]:i.ONE_MINUS_SRC_ALPHA,[Fg]:i.ONE_MINUS_DST_COLOR,[Ng]:i.ONE_MINUS_DST_ALPHA,[kg]:i.CONSTANT_COLOR,[Bg]:i.ONE_MINUS_CONSTANT_COLOR,[zg]:i.CONSTANT_ALPHA,[Hg]:i.ONE_MINUS_CONSTANT_ALPHA};function Mt(U,ae,le,ye,ie,Q,we,Xe,St,dt){if(U===$i){_===!0&&(Fe(i.BLEND),_=!1);return}if(_===!1&&(ce(i.BLEND),_=!0),U!==bg){if(U!==g||dt!==b){if((p!==Ss||v!==Ss)&&(i.blendEquation(i.FUNC_ADD),p=Ss,v=Ss),dt)switch(U){case ar:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case vr:i.blendFunc(i.ONE,i.ONE);break;case td:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nd:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case ar:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case vr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case td:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case nd:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}y=null,S=null,R=null,A=null,L.set(0,0,0),N=0,g=U,b=dt}return}ie=ie||ae,Q=Q||le,we=we||ye,(ae!==p||ie!==v)&&(i.blendEquationSeparate(at[ae],at[ie]),p=ae,v=ie),(le!==y||ye!==S||Q!==R||we!==A)&&(i.blendFuncSeparate(D[le],D[ye],D[Q],D[we]),y=le,S=ye,R=Q,A=we),(Xe.equals(L)===!1||St!==N)&&(i.blendColor(Xe.r,Xe.g,Xe.b,St),L.copy(Xe),N=St),g=U,b=!1}function Ne(U,ae){U.side===Vt?Fe(i.CULL_FACE):ce(i.CULL_FACE);let le=U.side===xn;ae&&(le=!le),lt(le),U.blending===ar&&U.transparent===!1?Mt($i):Mt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const ye=U.stencilWrite;o.setTest(ye),ye&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Me(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ce(i.SAMPLE_ALPHA_TO_COVERAGE):Fe(i.SAMPLE_ALPHA_TO_COVERAGE)}function lt(U){T!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),T=U)}function Pe(U){U!==Mg?(ce(i.CULL_FACE),U!==I&&(U===ed?i.cullFace(i.BACK):U===Sg?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Fe(i.CULL_FACE),I=U}function Ct(U){U!==H&&(j&&i.lineWidth(U),H=U)}function Me(U,ae,le){U?(ce(i.POLYGON_OFFSET_FILL),(G!==ae||q!==le)&&(i.polygonOffset(ae,le),G=ae,q=le)):Fe(i.POLYGON_OFFSET_FILL)}function Ze(U){U?ce(i.SCISSOR_TEST):Fe(i.SCISSOR_TEST)}function Zt(U){U===void 0&&(U=i.TEXTURE0+ee-1),de!==U&&(i.activeTexture(U),de=U)}function kt(U,ae,le){le===void 0&&(de===null?le=i.TEXTURE0+ee-1:le=de);let ye=_e[le];ye===void 0&&(ye={type:void 0,texture:void 0},_e[le]=ye),(ye.type!==U||ye.texture!==ae)&&(de!==le&&(i.activeTexture(le),de=le),i.bindTexture(U,ae||fe[U]),ye.type=U,ye.texture=ae)}function C(){const U=_e[de];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function M(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function k(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Y(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ce(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function oe(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Te(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ae(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function re(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ge(U){Rt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Rt.copy(U))}function Be(U){vt.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),vt.copy(U))}function Re(U,ae){let le=l.get(ae);le===void 0&&(le=new WeakMap,l.set(ae,le));let ye=le.get(U);ye===void 0&&(ye=i.getUniformBlockIndex(ae,U.name),le.set(U,ye))}function pe(U,ae){const ye=l.get(ae).get(U);c.get(ae)!==ye&&(i.uniformBlockBinding(ae,ye,U.__bindingPointIndex),c.set(ae,ye))}function Ye(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},de=null,_e={},h={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,y=null,S=null,v=null,R=null,A=null,L=new xe(0,0,0),N=0,b=!1,T=null,I=null,H=null,G=null,q=null,Rt.set(0,0,i.canvas.width,i.canvas.height),vt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ce,disable:Fe,bindFramebuffer:Oe,drawBuffers:We,useProgram:Ot,setBlending:Mt,setMaterial:Ne,setFlipSided:lt,setCullFace:Pe,setLineWidth:Ct,setPolygonOffset:Me,setScissorTest:Ze,activeTexture:Zt,bindTexture:kt,unbindTexture:C,compressedTexImage2D:M,compressedTexImage3D:k,texImage2D:Ae,texImage3D:re,updateUBOMapping:Re,uniformBlockBinding:pe,texStorage2D:oe,texStorage3D:Te,texSubImage2D:Y,texSubImage3D:ne,compressedTexSubImage2D:X,compressedTexSubImage3D:Ce,scissor:ge,viewport:Be,reset:Ye}}function XS(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ue,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,M){return f?new OffscreenCanvas(C,M):_a("canvas")}function _(C,M,k){let Y=1;const ne=kt(C);if((ne.width>k||ne.height>k)&&(Y=k/Math.max(ne.width,ne.height)),Y<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const X=Math.floor(Y*ne.width),Ce=Math.floor(Y*ne.height);h===void 0&&(h=m(X,Ce));const oe=M?m(X,Ce):h;return oe.width=X,oe.height=Ce,oe.getContext("2d").drawImage(C,0,0,X,Ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+X+"x"+Ce+")."),oe}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),C;return C}function g(C){return C.generateMipmaps}function p(C){i.generateMipmap(C)}function y(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(C,M,k,Y,ne=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let X=M;if(M===i.RED&&(k===i.FLOAT&&(X=i.R32F),k===i.HALF_FLOAT&&(X=i.R16F),k===i.UNSIGNED_BYTE&&(X=i.R8)),M===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.R8UI),k===i.UNSIGNED_SHORT&&(X=i.R16UI),k===i.UNSIGNED_INT&&(X=i.R32UI),k===i.BYTE&&(X=i.R8I),k===i.SHORT&&(X=i.R16I),k===i.INT&&(X=i.R32I)),M===i.RG&&(k===i.FLOAT&&(X=i.RG32F),k===i.HALF_FLOAT&&(X=i.RG16F),k===i.UNSIGNED_BYTE&&(X=i.RG8)),M===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.RG8UI),k===i.UNSIGNED_SHORT&&(X=i.RG16UI),k===i.UNSIGNED_INT&&(X=i.RG32UI),k===i.BYTE&&(X=i.RG8I),k===i.SHORT&&(X=i.RG16I),k===i.INT&&(X=i.RG32I)),M===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.RGB8UI),k===i.UNSIGNED_SHORT&&(X=i.RGB16UI),k===i.UNSIGNED_INT&&(X=i.RGB32UI),k===i.BYTE&&(X=i.RGB8I),k===i.SHORT&&(X=i.RGB16I),k===i.INT&&(X=i.RGB32I)),M===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),k===i.UNSIGNED_INT&&(X=i.RGBA32UI),k===i.BYTE&&(X=i.RGBA8I),k===i.SHORT&&(X=i.RGBA16I),k===i.INT&&(X=i.RGBA32I)),M===i.RGB&&k===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),M===i.RGBA){const Ce=ne?Vo:Qe.getTransfer(Y);k===i.FLOAT&&(X=i.RGBA32F),k===i.HALF_FLOAT&&(X=i.RGBA16F),k===i.UNSIGNED_BYTE&&(X=Ce===_t?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function v(C,M){let k;return C?M===null||M===Ps||M===da?k=i.DEPTH24_STENCIL8:M===jn?k=i.DEPTH32F_STENCIL8:M===ha&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Ps||M===da?k=i.DEPTH_COMPONENT24:M===jn?k=i.DEPTH_COMPONENT32F:M===ha&&(k=i.DEPTH_COMPONENT16),k}function R(C,M){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==fn&&C.minFilter!==En?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function A(C){const M=C.target;M.removeEventListener("dispose",A),N(M),M.isVideoTexture&&u.delete(M)}function L(C){const M=C.target;M.removeEventListener("dispose",L),T(M)}function N(C){const M=n.get(C);if(M.__webglInit===void 0)return;const k=C.source,Y=d.get(k);if(Y){const ne=Y[M.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&b(C),Object.keys(Y).length===0&&d.delete(k)}n.remove(C)}function b(C){const M=n.get(C);i.deleteTexture(M.__webglTexture);const k=C.source,Y=d.get(k);delete Y[M.__cacheKey],a.memory.textures--}function T(C){const M=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(M.__webglFramebuffer[Y]))for(let ne=0;ne<M.__webglFramebuffer[Y].length;ne++)i.deleteFramebuffer(M.__webglFramebuffer[Y][ne]);else i.deleteFramebuffer(M.__webglFramebuffer[Y]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[Y])}else{if(Array.isArray(M.__webglFramebuffer))for(let Y=0;Y<M.__webglFramebuffer.length;Y++)i.deleteFramebuffer(M.__webglFramebuffer[Y]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Y=0;Y<M.__webglColorRenderbuffer.length;Y++)M.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[Y]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const k=C.textures;for(let Y=0,ne=k.length;Y<ne;Y++){const X=n.get(k[Y]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),a.memory.textures--),n.remove(k[Y])}n.remove(C)}let I=0;function H(){I=0}function G(){const C=I;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),I+=1,C}function q(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function ee(C,M){const k=n.get(C);if(C.isVideoTexture&&Ze(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&k.__version!==C.version){const Y=C.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{fe(k,C,M);return}}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+M)}function j(C,M){const k=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){fe(k,C,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+M)}function te(C,M){const k=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){fe(k,C,M);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+M)}function W(C,M){const k=n.get(C);if(C.version>0&&k.__version!==C.version){ce(k,C,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+M)}const de={[ns]:i.REPEAT,[qi]:i.CLAMP_TO_EDGE,[Ho]:i.MIRRORED_REPEAT},_e={[fn]:i.NEAREST,[gp]:i.NEAREST_MIPMAP_NEAREST,[Jr]:i.NEAREST_MIPMAP_LINEAR,[En]:i.LINEAR,[To]:i.LINEAR_MIPMAP_NEAREST,[Ai]:i.LINEAR_MIPMAP_LINEAR},Ie={[n0]:i.NEVER,[c0]:i.ALWAYS,[i0]:i.LESS,[Tp]:i.LEQUAL,[s0]:i.EQUAL,[o0]:i.GEQUAL,[r0]:i.GREATER,[a0]:i.NOTEQUAL};function $e(C,M){if(M.type===jn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===En||M.magFilter===To||M.magFilter===Jr||M.magFilter===Ai||M.minFilter===En||M.minFilter===To||M.minFilter===Jr||M.minFilter===Ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,de[M.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,de[M.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,de[M.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,_e[M.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,_e[M.minFilter]),M.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Ie[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===fn||M.minFilter!==Jr&&M.minFilter!==Ai||M.type===jn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Rt(C,M){let k=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",A));const Y=M.source;let ne=d.get(Y);ne===void 0&&(ne={},d.set(Y,ne));const X=q(M);if(X!==C.__cacheKey){ne[X]===void 0&&(ne[X]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),ne[X].usedTimes++;const Ce=ne[C.__cacheKey];Ce!==void 0&&(ne[C.__cacheKey].usedTimes--,Ce.usedTimes===0&&b(M)),C.__cacheKey=X,C.__webglTexture=ne[X].texture}return k}function vt(C,M,k){return Math.floor(Math.floor(C/k)/M)}function K(C,M,k,Y){const X=C.updateRanges;if(X.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,k,Y,M.data);else{X.sort((re,ge)=>re.start-ge.start);let Ce=0;for(let re=1;re<X.length;re++){const ge=X[Ce],Be=X[re],Re=ge.start+ge.count,pe=vt(Be.start,M.width,4),Ye=vt(ge.start,M.width,4);Be.start<=Re+1&&pe===Ye&&vt(Be.start+Be.count-1,M.width,4)===pe?ge.count=Math.max(ge.count,Be.start+Be.count-ge.start):(++Ce,X[Ce]=Be)}X.length=Ce+1;const oe=i.getParameter(i.UNPACK_ROW_LENGTH),Te=i.getParameter(i.UNPACK_SKIP_PIXELS),Ae=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let re=0,ge=X.length;re<ge;re++){const Be=X[re],Re=Math.floor(Be.start/4),pe=Math.ceil(Be.count/4),Ye=Re%M.width,U=Math.floor(Re/M.width),ae=pe,le=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ye),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,Ye,U,ae,le,k,Y,M.data)}C.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,oe),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Te),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ae)}}function fe(C,M,k){let Y=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Y=i.TEXTURE_3D);const ne=Rt(C,M),X=M.source;t.bindTexture(Y,C.__webglTexture,i.TEXTURE0+k);const Ce=n.get(X);if(X.version!==Ce.__version||ne===!0){t.activeTexture(i.TEXTURE0+k);const oe=Qe.getPrimaries(Qe.workingColorSpace),Te=M.colorSpace===Xi?null:Qe.getPrimaries(M.colorSpace),Ae=M.colorSpace===Xi||oe===Te?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let re=_(M.image,!1,s.maxTextureSize);re=Zt(M,re);const ge=r.convert(M.format,M.colorSpace),Be=r.convert(M.type);let Re=S(M.internalFormat,ge,Be,M.colorSpace,M.isVideoTexture);$e(Y,M);let pe;const Ye=M.mipmaps,U=M.isVideoTexture!==!0,ae=Ce.__version===void 0||ne===!0,le=X.dataReady,ye=R(M,re);if(M.isDepthTexture)Re=v(M.format===pa,M.type),ae&&(U?t.texStorage2D(i.TEXTURE_2D,1,Re,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,Re,re.width,re.height,0,ge,Be,null));else if(M.isDataTexture)if(Ye.length>0){U&&ae&&t.texStorage2D(i.TEXTURE_2D,ye,Re,Ye[0].width,Ye[0].height);for(let ie=0,Q=Ye.length;ie<Q;ie++)pe=Ye[ie],U?le&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,pe.width,pe.height,ge,Be,pe.data):t.texImage2D(i.TEXTURE_2D,ie,Re,pe.width,pe.height,0,ge,Be,pe.data);M.generateMipmaps=!1}else U?(ae&&t.texStorage2D(i.TEXTURE_2D,ye,Re,re.width,re.height),le&&K(M,re,ge,Be)):t.texImage2D(i.TEXTURE_2D,0,Re,re.width,re.height,0,ge,Be,re.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){U&&ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Re,Ye[0].width,Ye[0].height,re.depth);for(let ie=0,Q=Ye.length;ie<Q;ie++)if(pe=Ye[ie],M.format!==Fn)if(ge!==null)if(U){if(le)if(M.layerUpdates.size>0){const we=ef(pe.width,pe.height,M.format,M.type);for(const Xe of M.layerUpdates){const St=pe.data.subarray(Xe*we/pe.data.BYTES_PER_ELEMENT,(Xe+1)*we/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,Xe,pe.width,pe.height,1,ge,St)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,pe.width,pe.height,re.depth,ge,pe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,Re,pe.width,pe.height,re.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?le&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,pe.width,pe.height,re.depth,ge,Be,pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,Re,pe.width,pe.height,re.depth,0,ge,Be,pe.data)}else{U&&ae&&t.texStorage2D(i.TEXTURE_2D,ye,Re,Ye[0].width,Ye[0].height);for(let ie=0,Q=Ye.length;ie<Q;ie++)pe=Ye[ie],M.format!==Fn?ge!==null?U?le&&t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,pe.width,pe.height,ge,pe.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,Re,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?le&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,pe.width,pe.height,ge,Be,pe.data):t.texImage2D(i.TEXTURE_2D,ie,Re,pe.width,pe.height,0,ge,Be,pe.data)}else if(M.isDataArrayTexture)if(U){if(ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Re,re.width,re.height,re.depth),le)if(M.layerUpdates.size>0){const ie=ef(re.width,re.height,M.format,M.type);for(const Q of M.layerUpdates){const we=re.data.subarray(Q*ie/re.data.BYTES_PER_ELEMENT,(Q+1)*ie/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,re.width,re.height,1,ge,Be,we)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,ge,Be,re.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Re,re.width,re.height,re.depth,0,ge,Be,re.data);else if(M.isData3DTexture)U?(ae&&t.texStorage3D(i.TEXTURE_3D,ye,Re,re.width,re.height,re.depth),le&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,ge,Be,re.data)):t.texImage3D(i.TEXTURE_3D,0,Re,re.width,re.height,re.depth,0,ge,Be,re.data);else if(M.isFramebufferTexture){if(ae)if(U)t.texStorage2D(i.TEXTURE_2D,ye,Re,re.width,re.height);else{let ie=re.width,Q=re.height;for(let we=0;we<ye;we++)t.texImage2D(i.TEXTURE_2D,we,Re,ie,Q,0,ge,Be,null),ie>>=1,Q>>=1}}else if(Ye.length>0){if(U&&ae){const ie=kt(Ye[0]);t.texStorage2D(i.TEXTURE_2D,ye,Re,ie.width,ie.height)}for(let ie=0,Q=Ye.length;ie<Q;ie++)pe=Ye[ie],U?le&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,ge,Be,pe):t.texImage2D(i.TEXTURE_2D,ie,Re,ge,Be,pe);M.generateMipmaps=!1}else if(U){if(ae){const ie=kt(re);t.texStorage2D(i.TEXTURE_2D,ye,Re,ie.width,ie.height)}le&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge,Be,re)}else t.texImage2D(i.TEXTURE_2D,0,Re,ge,Be,re);g(M)&&p(Y),Ce.__version=X.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function ce(C,M,k){if(M.image.length!==6)return;const Y=Rt(C,M),ne=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+k);const X=n.get(ne);if(ne.version!==X.__version||Y===!0){t.activeTexture(i.TEXTURE0+k);const Ce=Qe.getPrimaries(Qe.workingColorSpace),oe=M.colorSpace===Xi?null:Qe.getPrimaries(M.colorSpace),Te=M.colorSpace===Xi||Ce===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const Ae=M.isCompressedTexture||M.image[0].isCompressedTexture,re=M.image[0]&&M.image[0].isDataTexture,ge=[];for(let Q=0;Q<6;Q++)!Ae&&!re?ge[Q]=_(M.image[Q],!0,s.maxCubemapSize):ge[Q]=re?M.image[Q].image:M.image[Q],ge[Q]=Zt(M,ge[Q]);const Be=ge[0],Re=r.convert(M.format,M.colorSpace),pe=r.convert(M.type),Ye=S(M.internalFormat,Re,pe,M.colorSpace),U=M.isVideoTexture!==!0,ae=X.__version===void 0||Y===!0,le=ne.dataReady;let ye=R(M,Be);$e(i.TEXTURE_CUBE_MAP,M);let ie;if(Ae){U&&ae&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,Ye,Be.width,Be.height);for(let Q=0;Q<6;Q++){ie=ge[Q].mipmaps;for(let we=0;we<ie.length;we++){const Xe=ie[we];M.format!==Fn?Re!==null?U?le&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,0,0,Xe.width,Xe.height,Re,Xe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,Ye,Xe.width,Xe.height,0,Xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,0,0,Xe.width,Xe.height,Re,pe,Xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,Ye,Xe.width,Xe.height,0,Re,pe,Xe.data)}}}else{if(ie=M.mipmaps,U&&ae){ie.length>0&&ye++;const Q=kt(ge[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,Ye,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(re){U?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ge[Q].width,ge[Q].height,Re,pe,ge[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ye,ge[Q].width,ge[Q].height,0,Re,pe,ge[Q].data);for(let we=0;we<ie.length;we++){const St=ie[we].image[Q].image;U?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,0,0,St.width,St.height,Re,pe,St.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,Ye,St.width,St.height,0,Re,pe,St.data)}}else{U?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Re,pe,ge[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ye,Re,pe,ge[Q]);for(let we=0;we<ie.length;we++){const Xe=ie[we];U?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,0,0,Re,pe,Xe.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,Ye,Re,pe,Xe.image[Q])}}}g(M)&&p(i.TEXTURE_CUBE_MAP),X.__version=ne.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Fe(C,M,k,Y,ne,X){const Ce=r.convert(k.format,k.colorSpace),oe=r.convert(k.type),Te=S(k.internalFormat,Ce,oe,k.colorSpace),Ae=n.get(M),re=n.get(k);if(re.__renderTarget=M,!Ae.__hasExternalTextures){const ge=Math.max(1,M.width>>X),Be=Math.max(1,M.height>>X);ne===i.TEXTURE_3D||ne===i.TEXTURE_2D_ARRAY?t.texImage3D(ne,X,Te,ge,Be,M.depth,0,Ce,oe,null):t.texImage2D(ne,X,Te,ge,Be,0,Ce,oe,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),Me(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,ne,re.__webglTexture,0,Ct(M)):(ne===i.TEXTURE_2D||ne>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,ne,re.__webglTexture,X),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Oe(C,M,k){if(i.bindRenderbuffer(i.RENDERBUFFER,C),M.depthBuffer){const Y=M.depthTexture,ne=Y&&Y.isDepthTexture?Y.type:null,X=v(M.stencilBuffer,ne),Ce=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=Ct(M);Me(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,oe,X,M.width,M.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,oe,X,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,X,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ce,i.RENDERBUFFER,C)}else{const Y=M.textures;for(let ne=0;ne<Y.length;ne++){const X=Y[ne],Ce=r.convert(X.format,X.colorSpace),oe=r.convert(X.type),Te=S(X.internalFormat,Ce,oe,X.colorSpace),Ae=Ct(M);k&&Me(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ae,Te,M.width,M.height):Me(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ae,Te,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Te,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function We(C,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(M.depthTexture);Y.__renderTarget=M,(!Y.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),ee(M.depthTexture,0);const ne=Y.__webglTexture,X=Ct(M);if(M.depthTexture.format===fa)Me(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0);else if(M.depthTexture.format===pa)Me(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Ot(C){const M=n.get(C),k=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){const Y=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Y){const ne=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Y.removeEventListener("dispose",ne)};Y.addEventListener("dispose",ne),M.__depthDisposeCallback=ne}M.__boundDepthTexture=Y}if(C.depthTexture&&!M.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const Y=C.texture.mipmaps;Y&&Y.length>0?We(M.__webglFramebuffer[0],C):We(M.__webglFramebuffer,C)}else if(k){M.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[Y]),M.__webglDepthbuffer[Y]===void 0)M.__webglDepthbuffer[Y]=i.createRenderbuffer(),Oe(M.__webglDepthbuffer[Y],C,!1);else{const ne=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=M.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,X)}}else{const Y=C.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),Oe(M.__webglDepthbuffer,C,!1);else{const ne=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,X)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function at(C,M,k){const Y=n.get(C);M!==void 0&&Fe(Y.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Ot(C)}function D(C){const M=C.texture,k=n.get(C),Y=n.get(M);C.addEventListener("dispose",L);const ne=C.textures,X=C.isWebGLCubeRenderTarget===!0,Ce=ne.length>1;if(Ce||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=M.version,a.memory.textures++),X){k.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer[oe]=[];for(let Te=0;Te<M.mipmaps.length;Te++)k.__webglFramebuffer[oe][Te]=i.createFramebuffer()}else k.__webglFramebuffer[oe]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer=[];for(let oe=0;oe<M.mipmaps.length;oe++)k.__webglFramebuffer[oe]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(Ce)for(let oe=0,Te=ne.length;oe<Te;oe++){const Ae=n.get(ne[oe]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&Me(C)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let oe=0;oe<ne.length;oe++){const Te=ne[oe];k.__webglColorRenderbuffer[oe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[oe]);const Ae=r.convert(Te.format,Te.colorSpace),re=r.convert(Te.type),ge=S(Te.internalFormat,Ae,re,Te.colorSpace,C.isXRRenderTarget===!0),Be=Ct(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Be,ge,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,k.__webglColorRenderbuffer[oe])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),Oe(k.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),$e(i.TEXTURE_CUBE_MAP,M);for(let oe=0;oe<6;oe++)if(M.mipmaps&&M.mipmaps.length>0)for(let Te=0;Te<M.mipmaps.length;Te++)Fe(k.__webglFramebuffer[oe][Te],C,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Te);else Fe(k.__webglFramebuffer[oe],C,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);g(M)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ce){for(let oe=0,Te=ne.length;oe<Te;oe++){const Ae=ne[oe],re=n.get(Ae);let ge=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ge=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ge,re.__webglTexture),$e(ge,Ae),Fe(k.__webglFramebuffer,C,Ae,i.COLOR_ATTACHMENT0+oe,ge,0),g(Ae)&&p(ge)}t.unbindTexture()}else{let oe=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(oe=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(oe,Y.__webglTexture),$e(oe,M),M.mipmaps&&M.mipmaps.length>0)for(let Te=0;Te<M.mipmaps.length;Te++)Fe(k.__webglFramebuffer[Te],C,M,i.COLOR_ATTACHMENT0,oe,Te);else Fe(k.__webglFramebuffer,C,M,i.COLOR_ATTACHMENT0,oe,0);g(M)&&p(oe),t.unbindTexture()}C.depthBuffer&&Ot(C)}function Mt(C){const M=C.textures;for(let k=0,Y=M.length;k<Y;k++){const ne=M[k];if(g(ne)){const X=y(C),Ce=n.get(ne).__webglTexture;t.bindTexture(X,Ce),p(X),t.unbindTexture()}}}const Ne=[],lt=[];function Pe(C){if(C.samples>0){if(Me(C)===!1){const M=C.textures,k=C.width,Y=C.height;let ne=i.COLOR_BUFFER_BIT;const X=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ce=n.get(C),oe=M.length>1;if(oe)for(let Ae=0;Ae<M.length;Ae++)t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer);const Te=C.texture.mipmaps;Te&&Te.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let Ae=0;Ae<M.length;Ae++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ne|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ne|=i.STENCIL_BUFFER_BIT)),oe){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[Ae]);const re=n.get(M[Ae]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,re,0)}i.blitFramebuffer(0,0,k,Y,0,0,k,Y,ne,i.NEAREST),c===!0&&(Ne.length=0,lt.length=0,Ne.push(i.COLOR_ATTACHMENT0+Ae),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Ne.push(X),lt.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,lt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ne))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),oe)for(let Ae=0;Ae<M.length;Ae++){t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[Ae]);const re=n.get(M[Ae]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,re,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const M=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function Ct(C){return Math.min(s.maxSamples,C.samples)}function Me(C){const M=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ze(C){const M=a.render.frame;u.get(C)!==M&&(u.set(C,M),C.update())}function Zt(C,M){const k=C.colorSpace,Y=C.format,ne=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||k!==mn&&k!==Xi&&(Qe.getTransfer(k)===_t?(Y!==Fn||ne!==oi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),M}function kt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=H,this.setTexture2D=ee,this.setTexture2DArray=j,this.setTexture3D=te,this.setTextureCube=W,this.rebindTextures=at,this.setupRenderTarget=D,this.updateRenderTargetMipmap=Mt,this.updateMultisampleRenderTarget=Pe,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=Fe,this.useMultisampledRTT=Me}function qS(i,e){function t(n,s=Xi){let r;const a=Qe.getTransfer(s);if(n===oi)return i.UNSIGNED_BYTE;if(n===th)return i.UNSIGNED_SHORT_4_4_4_4;if(n===nh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===xp)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===_p)return i.BYTE;if(n===vp)return i.SHORT;if(n===ha)return i.UNSIGNED_SHORT;if(n===eh)return i.INT;if(n===Ps)return i.UNSIGNED_INT;if(n===jn)return i.FLOAT;if(n===Ra)return i.HALF_FLOAT;if(n===yp)return i.ALPHA;if(n===Mp)return i.RGB;if(n===Fn)return i.RGBA;if(n===fa)return i.DEPTH_COMPONENT;if(n===pa)return i.DEPTH_STENCIL;if(n===ih)return i.RED;if(n===sh)return i.RED_INTEGER;if(n===Sp)return i.RG;if(n===rh)return i.RG_INTEGER;if(n===ah)return i.RGBA_INTEGER;if(n===Eo||n===Ao||n===Ro||n===Co)if(a===_t)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Eo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Eo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ao)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ro)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Co)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Jl||n===Ql||n===eu||n===tu)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Jl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ql)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===eu)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===tu)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===nu||n===iu||n===su)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===nu||n===iu)return a===_t?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===su)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ru||n===au||n===ou||n===cu||n===lu||n===uu||n===hu||n===du||n===fu||n===pu||n===mu||n===gu||n===_u||n===vu)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ru)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===au)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ou)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===cu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===lu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===uu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===hu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===du)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===fu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===pu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===mu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===gu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_u)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Po||n===xu||n===yu)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Po)return a===_t?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===yu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===wp||n===Mu||n===Su||n===wu)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Po)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Mu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Su)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===da?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class nm extends en{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}}const YS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,KS=`
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

}`;class jS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new nm(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ii({vertexShader:YS,fragmentShader:KS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Z(new Dr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $S extends Lr{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,f=null,m=null;const _=new jS,g={},p=t.getContextAttributes();let y=null,S=null;const v=[],R=[],A=new ue;let L=null;const N=new dn;N.viewport=new ut;const b=new dn;b.viewport=new ut;const T=[N,b],I=new av;let H=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let fe=v[K];return fe===void 0&&(fe=new jc,v[K]=fe),fe.getTargetRaySpace()},this.getControllerGrip=function(K){let fe=v[K];return fe===void 0&&(fe=new jc,v[K]=fe),fe.getGripSpace()},this.getHand=function(K){let fe=v[K];return fe===void 0&&(fe=new jc,v[K]=fe),fe.getHandSpace()};function q(K){const fe=R.indexOf(K.inputSource);if(fe===-1)return;const ce=v[fe];ce!==void 0&&(ce.update(K.inputSource,K.frame,l||a),ce.dispatchEvent({type:K.type,data:K.inputSource}))}function ee(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",ee),s.removeEventListener("inputsourceschange",j);for(let K=0;K<v.length;K++){const fe=R[K];fe!==null&&(R[K]=null,v[K].disconnect(fe))}H=null,G=null,_.reset();for(const K in g)delete g[K];e.setRenderTarget(y),f=null,d=null,h=null,s=null,S=null,vt.stop(),n.isPresenting=!1,e.setPixelRatio(L),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",ee),s.addEventListener("inputsourceschange",j),p.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(A),typeof XRWebGLBinding<"u"&&(h=new XRWebGLBinding(s,t)),h!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let ce=null,Fe=null,Oe=null;p.depth&&(Oe=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=p.stencil?pa:fa,Fe=p.stencil?da:Ps);const We={colorFormat:t.RGBA8,depthFormat:Oe,scaleFactor:r};d=h.createProjectionLayer(We),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new Ls(d.textureWidth,d.textureHeight,{format:Fn,type:oi,depthTexture:new Fp(d.textureWidth,d.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ce={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ce),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Ls(f.framebufferWidth,f.framebufferHeight,{format:Fn,type:oi,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),vt.setContext(s),vt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function j(K){for(let fe=0;fe<K.removed.length;fe++){const ce=K.removed[fe],Fe=R.indexOf(ce);Fe>=0&&(R[Fe]=null,v[Fe].disconnect(ce))}for(let fe=0;fe<K.added.length;fe++){const ce=K.added[fe];let Fe=R.indexOf(ce);if(Fe===-1){for(let We=0;We<v.length;We++)if(We>=R.length){R.push(ce),Fe=We;break}else if(R[We]===null){R[We]=ce,Fe=We;break}if(Fe===-1)break}const Oe=v[Fe];Oe&&Oe.connect(ce)}}const te=new E,W=new E;function de(K,fe,ce){te.setFromMatrixPosition(fe.matrixWorld),W.setFromMatrixPosition(ce.matrixWorld);const Fe=te.distanceTo(W),Oe=fe.projectionMatrix.elements,We=ce.projectionMatrix.elements,Ot=Oe[14]/(Oe[10]-1),at=Oe[14]/(Oe[10]+1),D=(Oe[9]+1)/Oe[5],Mt=(Oe[9]-1)/Oe[5],Ne=(Oe[8]-1)/Oe[0],lt=(We[8]+1)/We[0],Pe=Ot*Ne,Ct=Ot*lt,Me=Fe/(-Ne+lt),Ze=Me*-Ne;if(fe.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Ze),K.translateZ(Me),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Oe[10]===-1)K.projectionMatrix.copy(fe.projectionMatrix),K.projectionMatrixInverse.copy(fe.projectionMatrixInverse);else{const Zt=Ot+Me,kt=at+Me,C=Pe-Ze,M=Ct+(Fe-Ze),k=D*at/kt*Zt,Y=Mt*at/kt*Zt;K.projectionMatrix.makePerspective(C,M,k,Y,Zt,kt),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function _e(K,fe){fe===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(fe.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let fe=K.near,ce=K.far;_.texture!==null&&(_.depthNear>0&&(fe=_.depthNear),_.depthFar>0&&(ce=_.depthFar)),I.near=b.near=N.near=fe,I.far=b.far=N.far=ce,(H!==I.near||G!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),H=I.near,G=I.far),I.layers.mask=K.layers.mask|6,N.layers.mask=I.layers.mask&3,b.layers.mask=I.layers.mask&5;const Fe=K.parent,Oe=I.cameras;_e(I,Fe);for(let We=0;We<Oe.length;We++)_e(Oe[We],Fe);Oe.length===2?de(I,N,b):I.projectionMatrix.copy(N.projectionMatrix),Ie(K,I,Fe)};function Ie(K,fe,ce){ce===null?K.matrix.copy(fe.matrixWorld):(K.matrix.copy(ce.matrixWorld),K.matrix.invert(),K.matrix.multiply(fe.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(fe.projectionMatrix),K.projectionMatrixInverse.copy(fe.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Sr*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(K){c=K,d!==null&&(d.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(I)},this.getCameraTexture=function(K){return g[K]};let $e=null;function Rt(K,fe){if(u=fe.getViewerPose(l||a),m=fe,u!==null){const ce=u.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let Fe=!1;ce.length!==I.cameras.length&&(I.cameras.length=0,Fe=!0);for(let at=0;at<ce.length;at++){const D=ce[at];let Mt=null;if(f!==null)Mt=f.getViewport(D);else{const lt=h.getViewSubImage(d,D);Mt=lt.viewport,at===0&&(e.setRenderTargetTextures(S,lt.colorTexture,lt.depthStencilTexture),e.setRenderTarget(S))}let Ne=T[at];Ne===void 0&&(Ne=new dn,Ne.layers.enable(at),Ne.viewport=new ut,T[at]=Ne),Ne.matrix.fromArray(D.transform.matrix),Ne.matrix.decompose(Ne.position,Ne.quaternion,Ne.scale),Ne.projectionMatrix.fromArray(D.projectionMatrix),Ne.projectionMatrixInverse.copy(Ne.projectionMatrix).invert(),Ne.viewport.set(Mt.x,Mt.y,Mt.width,Mt.height),at===0&&(I.matrix.copy(Ne.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Fe===!0&&I.cameras.push(Ne)}const Oe=s.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&h){const at=h.getDepthInformation(ce[0]);at&&at.isValid&&at.texture&&_.init(at,s.renderState)}if(Oe&&Oe.includes("camera-access")&&(e.state.unbindTexture(),h))for(let at=0;at<ce.length;at++){const D=ce[at].camera;if(D){let Mt=g[D];Mt||(Mt=new nm,g[D]=Mt);const Ne=h.getCameraImage(D);Mt.sourceTexture=Ne}}}for(let ce=0;ce<v.length;ce++){const Fe=R[ce],Oe=v[ce];Fe!==null&&Oe!==void 0&&Oe.update(Fe,fe,l||a)}$e&&$e(K,fe),fe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:fe}),m=null}const vt=new Zp;vt.setAnimationLoop(Rt),this.setAnimationLoop=function(K){$e=K},this.dispose=function(){}}}const ps=new zn,ZS=new qe;function JS(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Lp(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,y,S,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),h(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,y,S):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===xn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===xn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=e.get(p),S=y.envMap,v=y.envMapRotation;S&&(g.envMap.value=S,ps.copy(v),ps.x*=-1,ps.y*=-1,ps.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ps.y*=-1,ps.z*=-1),g.envMapRotation.value.setFromMatrix4(ZS.makeRotationFromEuler(ps)),g.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,y,S){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=S*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===xn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const y=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function QS(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,S){const v=S.program;n.uniformBlockBinding(y,v)}function l(y,S){let v=s[y.id];v===void 0&&(m(y),v=u(y),s[y.id]=v,y.addEventListener("dispose",g));const R=S.program;n.updateUBOMapping(y,R);const A=e.render.frame;r[y.id]!==A&&(d(y),r[y.id]=A)}function u(y){const S=h();y.__bindingPointIndex=S;const v=i.createBuffer(),R=y.__size,A=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,R,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,v),v}function h(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const S=s[y.id],v=y.uniforms,R=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let A=0,L=v.length;A<L;A++){const N=Array.isArray(v[A])?v[A]:[v[A]];for(let b=0,T=N.length;b<T;b++){const I=N[b];if(f(I,A,b,R)===!0){const H=I.__offset,G=Array.isArray(I.value)?I.value:[I.value];let q=0;for(let ee=0;ee<G.length;ee++){const j=G[ee],te=_(j);typeof j=="number"||typeof j=="boolean"?(I.__data[0]=j,i.bufferSubData(i.UNIFORM_BUFFER,H+q,I.__data)):j.isMatrix3?(I.__data[0]=j.elements[0],I.__data[1]=j.elements[1],I.__data[2]=j.elements[2],I.__data[3]=0,I.__data[4]=j.elements[3],I.__data[5]=j.elements[4],I.__data[6]=j.elements[5],I.__data[7]=0,I.__data[8]=j.elements[6],I.__data[9]=j.elements[7],I.__data[10]=j.elements[8],I.__data[11]=0):(j.toArray(I.__data,q),q+=te.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,S,v,R){const A=y.value,L=S+"_"+v;if(R[L]===void 0)return typeof A=="number"||typeof A=="boolean"?R[L]=A:R[L]=A.clone(),!0;{const N=R[L];if(typeof A=="number"||typeof A=="boolean"){if(N!==A)return R[L]=A,!0}else if(N.equals(A)===!1)return N.copy(A),!0}return!1}function m(y){const S=y.uniforms;let v=0;const R=16;for(let L=0,N=S.length;L<N;L++){const b=Array.isArray(S[L])?S[L]:[S[L]];for(let T=0,I=b.length;T<I;T++){const H=b[T],G=Array.isArray(H.value)?H.value:[H.value];for(let q=0,ee=G.length;q<ee;q++){const j=G[q],te=_(j),W=v%R,de=W%te.boundary,_e=W+de;v+=de,_e!==0&&R-_e<te.storage&&(v+=R-_e),H.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=v,v+=te.storage}}}const A=v%R;return A>0&&(v+=R-A),y.__size=v,y.__cache={},this}function _(y){const S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=48,S.storage=48):y.isMatrix4?(S.boundary=64,S.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),S}function g(y){const S=y.target;S.removeEventListener("dispose",g);const v=a.indexOf(S.__bindingPointIndex);a.splice(v,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function p(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}class ew{constructor(e={}){const{canvas:t=T0(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const y=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Zi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let R=!1;this._outputColorSpace=At;let A=0,L=0,N=null,b=-1,T=null;const I=new ut,H=new ut;let G=null;const q=new xe(0);let ee=0,j=t.width,te=t.height,W=1,de=null,_e=null;const Ie=new ut(0,0,j,te),$e=new ut(0,0,j,te);let Rt=!1;const vt=new ph;let K=!1,fe=!1;const ce=new qe,Fe=new E,Oe=new ut,We={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ot=!1;function at(){return N===null?W:1}let D=n;function Mt(w,F){return t.getContext(w,F)}try{const w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Zu}`),t.addEventListener("webglcontextlost",le,!1),t.addEventListener("webglcontextrestored",ye,!1),t.addEventListener("webglcontextcreationerror",ie,!1),D===null){const F="webgl2";if(D=Mt(F,w),D===null)throw Mt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Ne,lt,Pe,Ct,Me,Ze,Zt,kt,C,M,k,Y,ne,X,Ce,oe,Te,Ae,re,ge,Be,Re,pe,Ye;function U(){Ne=new uM(D),Ne.init(),Re=new qS(D,Ne),lt=new iM(D,Ne,e,Re),Pe=new WS(D,Ne),lt.reversedDepthBuffer&&d&&Pe.buffers.depth.setReversed(!0),Ct=new fM(D),Me=new LS,Ze=new XS(D,Ne,Pe,Me,lt,Re,Ct),Zt=new rM(v),kt=new lM(v),C=new xv(D),pe=new tM(D,C),M=new hM(D,C,Ct,pe),k=new mM(D,M,C,Ct),re=new pM(D,lt,Ze),oe=new sM(Me),Y=new PS(v,Zt,kt,Ne,lt,pe,oe),ne=new JS(v,Me),X=new DS,Ce=new BS(Ne),Ae=new eM(v,Zt,kt,Pe,k,f,c),Te=new VS(v,k,lt),Ye=new QS(D,Ct,lt,Pe),ge=new nM(D,Ne,Ct),Be=new dM(D,Ne,Ct),Ct.programs=Y.programs,v.capabilities=lt,v.extensions=Ne,v.properties=Me,v.renderLists=X,v.shadowMap=Te,v.state=Pe,v.info=Ct}U();const ae=new $S(v,D);this.xr=ae,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const w=Ne.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Ne.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(w){w!==void 0&&(W=w,this.setSize(j,te,!1))},this.getSize=function(w){return w.set(j,te)},this.setSize=function(w,F,B=!0){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=w,te=F,t.width=Math.floor(w*W),t.height=Math.floor(F*W),B===!0&&(t.style.width=w+"px",t.style.height=F+"px"),this.setViewport(0,0,w,F)},this.getDrawingBufferSize=function(w){return w.set(j*W,te*W).floor()},this.setDrawingBufferSize=function(w,F,B){j=w,te=F,W=B,t.width=Math.floor(w*B),t.height=Math.floor(F*B),this.setViewport(0,0,w,F)},this.getCurrentViewport=function(w){return w.copy(I)},this.getViewport=function(w){return w.copy(Ie)},this.setViewport=function(w,F,B,z){w.isVector4?Ie.set(w.x,w.y,w.z,w.w):Ie.set(w,F,B,z),Pe.viewport(I.copy(Ie).multiplyScalar(W).round())},this.getScissor=function(w){return w.copy($e)},this.setScissor=function(w,F,B,z){w.isVector4?$e.set(w.x,w.y,w.z,w.w):$e.set(w,F,B,z),Pe.scissor(H.copy($e).multiplyScalar(W).round())},this.getScissorTest=function(){return Rt},this.setScissorTest=function(w){Pe.setScissorTest(Rt=w)},this.setOpaqueSort=function(w){de=w},this.setTransparentSort=function(w){_e=w},this.getClearColor=function(w){return w.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor(...arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha(...arguments)},this.clear=function(w=!0,F=!0,B=!0){let z=0;if(w){let O=!1;if(N!==null){const se=N.texture.format;O=se===ah||se===rh||se===sh}if(O){const se=N.texture.type,me=se===oi||se===Ps||se===ha||se===da||se===th||se===nh,Se=Ae.getClearColor(),ve=Ae.getClearAlpha(),ke=Se.r,He=Se.g,De=Se.b;me?(m[0]=ke,m[1]=He,m[2]=De,m[3]=ve,D.clearBufferuiv(D.COLOR,0,m)):(_[0]=ke,_[1]=He,_[2]=De,_[3]=ve,D.clearBufferiv(D.COLOR,0,_))}else z|=D.COLOR_BUFFER_BIT}F&&(z|=D.DEPTH_BUFFER_BIT),B&&(z|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",le,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),Ae.dispose(),X.dispose(),Ce.dispose(),Me.dispose(),Zt.dispose(),kt.dispose(),k.dispose(),pe.dispose(),Ye.dispose(),Y.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",Zn),ae.removeEventListener("sessionend",Kh),os.stop()};function le(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ye(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const w=Ct.autoReset,F=Te.enabled,B=Te.autoUpdate,z=Te.needsUpdate,O=Te.type;U(),Ct.autoReset=w,Te.enabled=F,Te.autoUpdate=B,Te.needsUpdate=z,Te.type=O}function ie(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Q(w){const F=w.target;F.removeEventListener("dispose",Q),we(F)}function we(w){Xe(w),Me.remove(w)}function Xe(w){const F=Me.get(w).programs;F!==void 0&&(F.forEach(function(B){Y.releaseProgram(B)}),w.isShaderMaterial&&Y.releaseShaderCache(w))}this.renderBufferDirect=function(w,F,B,z,O,se){F===null&&(F=We);const me=O.isMesh&&O.matrixWorld.determinant()<0,Se=mg(w,F,B,z,O);Pe.setMaterial(z,me);let ve=B.index,ke=1;if(z.wireframe===!0){if(ve=M.getWireframeAttribute(B),ve===void 0)return;ke=2}const He=B.drawRange,De=B.attributes.position;let nt=He.start*ke,gt=(He.start+He.count)*ke;se!==null&&(nt=Math.max(nt,se.start*ke),gt=Math.min(gt,(se.start+se.count)*ke)),ve!==null?(nt=Math.max(nt,0),gt=Math.min(gt,ve.count)):De!=null&&(nt=Math.max(nt,0),gt=Math.min(gt,De.count));const Nt=gt-nt;if(Nt<0||Nt===1/0)return;pe.setup(O,z,Se,B,ve);let Tt,xt=ge;if(ve!==null&&(Tt=C.get(ve),xt=Be,xt.setIndex(Tt)),O.isMesh)z.wireframe===!0?(Pe.setLineWidth(z.wireframeLinewidth*at()),xt.setMode(D.LINES)):xt.setMode(D.TRIANGLES);else if(O.isLine){let Ue=z.linewidth;Ue===void 0&&(Ue=1),Pe.setLineWidth(Ue*at()),O.isLineSegments?xt.setMode(D.LINES):O.isLineLoop?xt.setMode(D.LINE_LOOP):xt.setMode(D.LINE_STRIP)}else O.isPoints?xt.setMode(D.POINTS):O.isSprite&&xt.setMode(D.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)or("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),xt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Ne.get("WEBGL_multi_draw"))xt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ue=O._multiDrawStarts,Pt=O._multiDrawCounts,ot=O._multiDrawCount,Mn=ve?C.get(ve).bytesPerElement:1,Hs=Me.get(z).currentProgram.getUniforms();for(let Sn=0;Sn<ot;Sn++)Hs.setValue(D,"_gl_DrawID",Sn),xt.render(Ue[Sn]/Mn,Pt[Sn])}else if(O.isInstancedMesh)xt.renderInstances(nt,Nt,O.count);else if(B.isInstancedBufferGeometry){const Ue=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Pt=Math.min(B.instanceCount,Ue);xt.renderInstances(nt,Nt,Pt)}else xt.render(nt,Nt)};function St(w,F,B){w.transparent===!0&&w.side===Vt&&w.forceSinglePass===!1?(w.side=xn,w.needsUpdate=!0,ka(w,F,B),w.side=ai,w.needsUpdate=!0,ka(w,F,B),w.side=Vt):ka(w,F,B)}this.compile=function(w,F,B=null){B===null&&(B=w),p=Ce.get(B),p.init(F),S.push(p),B.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),w!==B&&w.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const z=new Set;return w.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const se=O.material;if(se)if(Array.isArray(se))for(let me=0;me<se.length;me++){const Se=se[me];St(Se,B,O),z.add(Se)}else St(se,B,O),z.add(se)}),p=S.pop(),z},this.compileAsync=function(w,F,B=null){const z=this.compile(w,F,B);return new Promise(O=>{function se(){if(z.forEach(function(me){Me.get(me).currentProgram.isReady()&&z.delete(me)}),z.size===0){O(w);return}setTimeout(se,10)}Ne.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let dt=null;function di(w){dt&&dt(w)}function Zn(){os.stop()}function Kh(){os.start()}const os=new Zp;os.setAnimationLoop(di),typeof self<"u"&&os.setContext(self),this.setAnimationLoop=function(w){dt=w,ae.setAnimationLoop(w),w===null?os.stop():os.start()},ae.addEventListener("sessionstart",Zn),ae.addEventListener("sessionend",Kh),this.render=function(w,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(F),F=ae.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,F,N),p=Ce.get(w,S.length),p.init(F),S.push(p),ce.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),vt.setFromProjectionMatrix(ce,ii,F.reversedDepth),fe=this.localClippingEnabled,K=oe.init(this.clippingPlanes,fe),g=X.get(w,y.length),g.init(),y.push(g),ae.enabled===!0&&ae.isPresenting===!0){const se=v.xr.getDepthSensingMesh();se!==null&&Ec(se,F,-1/0,v.sortObjects)}Ec(w,F,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(de,_e),Ot=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,Ot&&Ae.addToRenderList(g,w),this.info.render.frame++,K===!0&&oe.beginShadows();const B=p.state.shadowsArray;Te.render(B,w,F),K===!0&&oe.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=g.opaque,O=g.transmissive;if(p.setupLights(),F.isArrayCamera){const se=F.cameras;if(O.length>0)for(let me=0,Se=se.length;me<Se;me++){const ve=se[me];$h(z,O,w,ve)}Ot&&Ae.render(w);for(let me=0,Se=se.length;me<Se;me++){const ve=se[me];jh(g,w,ve,ve.viewport)}}else O.length>0&&$h(z,O,w,F),Ot&&Ae.render(w),jh(g,w,F);N!==null&&L===0&&(Ze.updateMultisampleRenderTarget(N),Ze.updateRenderTargetMipmap(N)),w.isScene===!0&&w.onAfterRender(v,w,F),pe.resetDefaultState(),b=-1,T=null,S.pop(),S.length>0?(p=S[S.length-1],K===!0&&oe.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function Ec(w,F,B,z){if(w.visible===!1)return;if(w.layers.test(F.layers)){if(w.isGroup)B=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(F);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||vt.intersectsSprite(w)){z&&Oe.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ce);const me=k.update(w),Se=w.material;Se.visible&&g.push(w,me,Se,B,Oe.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||vt.intersectsObject(w))){const me=k.update(w),Se=w.material;if(z&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Oe.copy(w.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Oe.copy(me.boundingSphere.center)),Oe.applyMatrix4(w.matrixWorld).applyMatrix4(ce)),Array.isArray(Se)){const ve=me.groups;for(let ke=0,He=ve.length;ke<He;ke++){const De=ve[ke],nt=Se[De.materialIndex];nt&&nt.visible&&g.push(w,me,nt,B,Oe.z,De)}}else Se.visible&&g.push(w,me,Se,B,Oe.z,null)}}const se=w.children;for(let me=0,Se=se.length;me<Se;me++)Ec(se[me],F,B,z)}function jh(w,F,B,z){const O=w.opaque,se=w.transmissive,me=w.transparent;p.setupLightsView(B),K===!0&&oe.setGlobalState(v.clippingPlanes,B),z&&Pe.viewport(I.copy(z)),O.length>0&&Oa(O,F,B),se.length>0&&Oa(se,F,B),me.length>0&&Oa(me,F,B),Pe.buffers.depth.setTest(!0),Pe.buffers.depth.setMask(!0),Pe.buffers.color.setMask(!0),Pe.setPolygonOffset(!1)}function $h(w,F,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new Ls(1,1,{generateMipmaps:!0,type:Ne.has("EXT_color_buffer_half_float")||Ne.has("EXT_color_buffer_float")?Ra:oi,minFilter:Ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));const se=p.state.transmissionRenderTarget[z.id],me=z.viewport||I;se.setSize(me.z*v.transmissionResolutionScale,me.w*v.transmissionResolutionScale);const Se=v.getRenderTarget(),ve=v.getActiveCubeFace(),ke=v.getActiveMipmapLevel();v.setRenderTarget(se),v.getClearColor(q),ee=v.getClearAlpha(),ee<1&&v.setClearColor(16777215,.5),v.clear(),Ot&&Ae.render(B);const He=v.toneMapping;v.toneMapping=Zi;const De=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),K===!0&&oe.setGlobalState(v.clippingPlanes,z),Oa(w,B,z),Ze.updateMultisampleRenderTarget(se),Ze.updateRenderTargetMipmap(se),Ne.has("WEBGL_multisampled_render_to_texture")===!1){let nt=!1;for(let gt=0,Nt=F.length;gt<Nt;gt++){const Tt=F[gt],xt=Tt.object,Ue=Tt.geometry,Pt=Tt.material,ot=Tt.group;if(Pt.side===Vt&&xt.layers.test(z.layers)){const Mn=Pt.side;Pt.side=xn,Pt.needsUpdate=!0,Zh(xt,B,z,Ue,Pt,ot),Pt.side=Mn,Pt.needsUpdate=!0,nt=!0}}nt===!0&&(Ze.updateMultisampleRenderTarget(se),Ze.updateRenderTargetMipmap(se))}v.setRenderTarget(Se,ve,ke),v.setClearColor(q,ee),De!==void 0&&(z.viewport=De),v.toneMapping=He}function Oa(w,F,B){const z=F.isScene===!0?F.overrideMaterial:null;for(let O=0,se=w.length;O<se;O++){const me=w[O],Se=me.object,ve=me.geometry,ke=me.group;let He=me.material;He.allowOverride===!0&&z!==null&&(He=z),Se.layers.test(B.layers)&&Zh(Se,F,B,ve,He,ke)}}function Zh(w,F,B,z,O,se){w.onBeforeRender(v,F,B,z,O,se),w.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),O.onBeforeRender(v,F,B,z,w,se),O.transparent===!0&&O.side===Vt&&O.forceSinglePass===!1?(O.side=xn,O.needsUpdate=!0,v.renderBufferDirect(B,F,z,O,w,se),O.side=ai,O.needsUpdate=!0,v.renderBufferDirect(B,F,z,O,w,se),O.side=Vt):v.renderBufferDirect(B,F,z,O,w,se),w.onAfterRender(v,F,B,z,O,se)}function ka(w,F,B){F.isScene!==!0&&(F=We);const z=Me.get(w),O=p.state.lights,se=p.state.shadowsArray,me=O.state.version,Se=Y.getParameters(w,O.state,se,F,B),ve=Y.getProgramCacheKey(Se);let ke=z.programs;z.environment=w.isMeshStandardMaterial?F.environment:null,z.fog=F.fog,z.envMap=(w.isMeshStandardMaterial?kt:Zt).get(w.envMap||z.environment),z.envMapRotation=z.environment!==null&&w.envMap===null?F.environmentRotation:w.envMapRotation,ke===void 0&&(w.addEventListener("dispose",Q),ke=new Map,z.programs=ke);let He=ke.get(ve);if(He!==void 0){if(z.currentProgram===He&&z.lightsStateVersion===me)return Qh(w,Se),He}else Se.uniforms=Y.getUniforms(w),w.onBeforeCompile(Se,v),He=Y.acquireProgram(Se,ve),ke.set(ve,He),z.uniforms=Se.uniforms;const De=z.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(De.clippingPlanes=oe.uniform),Qh(w,Se),z.needsLights=_g(w),z.lightsStateVersion=me,z.needsLights&&(De.ambientLightColor.value=O.state.ambient,De.lightProbe.value=O.state.probe,De.directionalLights.value=O.state.directional,De.directionalLightShadows.value=O.state.directionalShadow,De.spotLights.value=O.state.spot,De.spotLightShadows.value=O.state.spotShadow,De.rectAreaLights.value=O.state.rectArea,De.ltc_1.value=O.state.rectAreaLTC1,De.ltc_2.value=O.state.rectAreaLTC2,De.pointLights.value=O.state.point,De.pointLightShadows.value=O.state.pointShadow,De.hemisphereLights.value=O.state.hemi,De.directionalShadowMap.value=O.state.directionalShadowMap,De.directionalShadowMatrix.value=O.state.directionalShadowMatrix,De.spotShadowMap.value=O.state.spotShadowMap,De.spotLightMatrix.value=O.state.spotLightMatrix,De.spotLightMap.value=O.state.spotLightMap,De.pointShadowMap.value=O.state.pointShadowMap,De.pointShadowMatrix.value=O.state.pointShadowMatrix),z.currentProgram=He,z.uniformsList=null,He}function Jh(w){if(w.uniformsList===null){const F=w.currentProgram.getUniforms();w.uniformsList=Lo.seqWithValue(F.seq,w.uniforms)}return w.uniformsList}function Qh(w,F){const B=Me.get(w);B.outputColorSpace=F.outputColorSpace,B.batching=F.batching,B.batchingColor=F.batchingColor,B.instancing=F.instancing,B.instancingColor=F.instancingColor,B.instancingMorph=F.instancingMorph,B.skinning=F.skinning,B.morphTargets=F.morphTargets,B.morphNormals=F.morphNormals,B.morphColors=F.morphColors,B.morphTargetsCount=F.morphTargetsCount,B.numClippingPlanes=F.numClippingPlanes,B.numIntersection=F.numClipIntersection,B.vertexAlphas=F.vertexAlphas,B.vertexTangents=F.vertexTangents,B.toneMapping=F.toneMapping}function mg(w,F,B,z,O){F.isScene!==!0&&(F=We),Ze.resetTextureUnits();const se=F.fog,me=z.isMeshStandardMaterial?F.environment:null,Se=N===null?v.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:mn,ve=(z.isMeshStandardMaterial?kt:Zt).get(z.envMap||me),ke=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,He=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),De=!!B.morphAttributes.position,nt=!!B.morphAttributes.normal,gt=!!B.morphAttributes.color;let Nt=Zi;z.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Nt=v.toneMapping);const Tt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,xt=Tt!==void 0?Tt.length:0,Ue=Me.get(z),Pt=p.state.lights;if(K===!0&&(fe===!0||w!==T)){const cn=w===T&&z.id===b;oe.setState(z,w,cn)}let ot=!1;z.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==Pt.state.version||Ue.outputColorSpace!==Se||O.isBatchedMesh&&Ue.batching===!1||!O.isBatchedMesh&&Ue.batching===!0||O.isBatchedMesh&&Ue.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ue.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ue.instancing===!1||!O.isInstancedMesh&&Ue.instancing===!0||O.isSkinnedMesh&&Ue.skinning===!1||!O.isSkinnedMesh&&Ue.skinning===!0||O.isInstancedMesh&&Ue.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ue.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ue.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ue.instancingMorph===!1&&O.morphTexture!==null||Ue.envMap!==ve||z.fog===!0&&Ue.fog!==se||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==oe.numPlanes||Ue.numIntersection!==oe.numIntersection)||Ue.vertexAlphas!==ke||Ue.vertexTangents!==He||Ue.morphTargets!==De||Ue.morphNormals!==nt||Ue.morphColors!==gt||Ue.toneMapping!==Nt||Ue.morphTargetsCount!==xt)&&(ot=!0):(ot=!0,Ue.__version=z.version);let Mn=Ue.currentProgram;ot===!0&&(Mn=ka(z,F,O));let Hs=!1,Sn=!1,zr=!1;const Lt=Mn.getUniforms(),Pn=Ue.uniforms;if(Pe.useProgram(Mn.program)&&(Hs=!0,Sn=!0,zr=!0),z.id!==b&&(b=z.id,Sn=!0),Hs||T!==w){Pe.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),Lt.setValue(D,"projectionMatrix",w.projectionMatrix),Lt.setValue(D,"viewMatrix",w.matrixWorldInverse);const gn=Lt.map.cameraPosition;gn!==void 0&&gn.setValue(D,Fe.setFromMatrixPosition(w.matrixWorld)),lt.logarithmicDepthBuffer&&Lt.setValue(D,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&Lt.setValue(D,"isOrthographic",w.isOrthographicCamera===!0),T!==w&&(T=w,Sn=!0,zr=!0)}if(O.isSkinnedMesh){Lt.setOptional(D,O,"bindMatrix"),Lt.setOptional(D,O,"bindMatrixInverse");const cn=O.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),Lt.setValue(D,"boneTexture",cn.boneTexture,Ze))}O.isBatchedMesh&&(Lt.setOptional(D,O,"batchingTexture"),Lt.setValue(D,"batchingTexture",O._matricesTexture,Ze),Lt.setOptional(D,O,"batchingIdTexture"),Lt.setValue(D,"batchingIdTexture",O._indirectTexture,Ze),Lt.setOptional(D,O,"batchingColorTexture"),O._colorsTexture!==null&&Lt.setValue(D,"batchingColorTexture",O._colorsTexture,Ze));const Ln=B.morphAttributes;if((Ln.position!==void 0||Ln.normal!==void 0||Ln.color!==void 0)&&re.update(O,B,Mn),(Sn||Ue.receiveShadow!==O.receiveShadow)&&(Ue.receiveShadow=O.receiveShadow,Lt.setValue(D,"receiveShadow",O.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Pn.envMap.value=ve,Pn.flipEnvMap.value=ve.isCubeTexture&&ve.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&F.environment!==null&&(Pn.envMapIntensity.value=F.environmentIntensity),Sn&&(Lt.setValue(D,"toneMappingExposure",v.toneMappingExposure),Ue.needsLights&&gg(Pn,zr),se&&z.fog===!0&&ne.refreshFogUniforms(Pn,se),ne.refreshMaterialUniforms(Pn,z,W,te,p.state.transmissionRenderTarget[w.id]),Lo.upload(D,Jh(Ue),Pn,Ze)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Lo.upload(D,Jh(Ue),Pn,Ze),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&Lt.setValue(D,"center",O.center),Lt.setValue(D,"modelViewMatrix",O.modelViewMatrix),Lt.setValue(D,"normalMatrix",O.normalMatrix),Lt.setValue(D,"modelMatrix",O.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const cn=z.uniformsGroups;for(let gn=0,Ac=cn.length;gn<Ac;gn++){const cs=cn[gn];Ye.update(cs,Mn),Ye.bind(cs,Mn)}}return Mn}function gg(w,F){w.ambientLightColor.needsUpdate=F,w.lightProbe.needsUpdate=F,w.directionalLights.needsUpdate=F,w.directionalLightShadows.needsUpdate=F,w.pointLights.needsUpdate=F,w.pointLightShadows.needsUpdate=F,w.spotLights.needsUpdate=F,w.spotLightShadows.needsUpdate=F,w.rectAreaLights.needsUpdate=F,w.hemisphereLights.needsUpdate=F}function _g(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(w,F,B){const z=Me.get(w);z.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),Me.get(w.texture).__webglTexture=F,Me.get(w.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:B,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,F){const B=Me.get(w);B.__webglFramebuffer=F,B.__useDefaultFramebuffer=F===void 0};const vg=D.createFramebuffer();this.setRenderTarget=function(w,F=0,B=0){N=w,A=F,L=B;let z=!0,O=null,se=!1,me=!1;if(w){const ve=Me.get(w);if(ve.__useDefaultFramebuffer!==void 0)Pe.bindFramebuffer(D.FRAMEBUFFER,null),z=!1;else if(ve.__webglFramebuffer===void 0)Ze.setupRenderTarget(w);else if(ve.__hasExternalTextures)Ze.rebindTextures(w,Me.get(w.texture).__webglTexture,Me.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const De=w.depthTexture;if(ve.__boundDepthTexture!==De){if(De!==null&&Me.has(De)&&(w.width!==De.image.width||w.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ze.setupDepthRenderbuffer(w)}}const ke=w.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(me=!0);const He=Me.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(He[F])?O=He[F][B]:O=He[F],se=!0):w.samples>0&&Ze.useMultisampledRTT(w)===!1?O=Me.get(w).__webglMultisampledFramebuffer:Array.isArray(He)?O=He[B]:O=He,I.copy(w.viewport),H.copy(w.scissor),G=w.scissorTest}else I.copy(Ie).multiplyScalar(W).floor(),H.copy($e).multiplyScalar(W).floor(),G=Rt;if(B!==0&&(O=vg),Pe.bindFramebuffer(D.FRAMEBUFFER,O)&&z&&Pe.drawBuffers(w,O),Pe.viewport(I),Pe.scissor(H),Pe.setScissorTest(G),se){const ve=Me.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+F,ve.__webglTexture,B)}else if(me){const ve=F;for(let ke=0;ke<w.textures.length;ke++){const He=Me.get(w.textures[ke]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+ke,He.__webglTexture,B,ve)}}else if(w!==null&&B!==0){const ve=Me.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ve.__webglTexture,B)}b=-1},this.readRenderTargetPixels=function(w,F,B,z,O,se,me,Se=0){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=Me.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&me!==void 0&&(ve=ve[me]),ve){Pe.bindFramebuffer(D.FRAMEBUFFER,ve);try{const ke=w.textures[Se],He=ke.format,De=ke.type;if(!lt.textureFormatReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!lt.textureTypeReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=w.width-z&&B>=0&&B<=w.height-O&&(w.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Se),D.readPixels(F,B,z,O,Re.convert(He),Re.convert(De),se))}finally{const ke=N!==null?Me.get(N).__webglFramebuffer:null;Pe.bindFramebuffer(D.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(w,F,B,z,O,se,me,Se=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=Me.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&me!==void 0&&(ve=ve[me]),ve)if(F>=0&&F<=w.width-z&&B>=0&&B<=w.height-O){Pe.bindFramebuffer(D.FRAMEBUFFER,ve);const ke=w.textures[Se],He=ke.format,De=ke.type;if(!lt.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!lt.textureTypeReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const nt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,nt),D.bufferData(D.PIXEL_PACK_BUFFER,se.byteLength,D.STREAM_READ),w.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Se),D.readPixels(F,B,z,O,Re.convert(He),Re.convert(De),0);const gt=N!==null?Me.get(N).__webglFramebuffer:null;Pe.bindFramebuffer(D.FRAMEBUFFER,gt);const Nt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await E0(D,Nt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,nt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,se),D.deleteBuffer(nt),D.deleteSync(Nt),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,F=null,B=0){const z=Math.pow(2,-B),O=Math.floor(w.image.width*z),se=Math.floor(w.image.height*z),me=F!==null?F.x:0,Se=F!==null?F.y:0;Ze.setTexture2D(w,0),D.copyTexSubImage2D(D.TEXTURE_2D,B,0,0,me,Se,O,se),Pe.unbindTexture()};const xg=D.createFramebuffer(),yg=D.createFramebuffer();this.copyTextureToTexture=function(w,F,B=null,z=null,O=0,se=null){se===null&&(O!==0?(or("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),se=O,O=0):se=0);let me,Se,ve,ke,He,De,nt,gt,Nt;const Tt=w.isCompressedTexture?w.mipmaps[se]:w.image;if(B!==null)me=B.max.x-B.min.x,Se=B.max.y-B.min.y,ve=B.isBox3?B.max.z-B.min.z:1,ke=B.min.x,He=B.min.y,De=B.isBox3?B.min.z:0;else{const Ln=Math.pow(2,-O);me=Math.floor(Tt.width*Ln),Se=Math.floor(Tt.height*Ln),w.isDataArrayTexture?ve=Tt.depth:w.isData3DTexture?ve=Math.floor(Tt.depth*Ln):ve=1,ke=0,He=0,De=0}z!==null?(nt=z.x,gt=z.y,Nt=z.z):(nt=0,gt=0,Nt=0);const xt=Re.convert(F.format),Ue=Re.convert(F.type);let Pt;F.isData3DTexture?(Ze.setTexture3D(F,0),Pt=D.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Ze.setTexture2DArray(F,0),Pt=D.TEXTURE_2D_ARRAY):(Ze.setTexture2D(F,0),Pt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,F.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,F.unpackAlignment);const ot=D.getParameter(D.UNPACK_ROW_LENGTH),Mn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Hs=D.getParameter(D.UNPACK_SKIP_PIXELS),Sn=D.getParameter(D.UNPACK_SKIP_ROWS),zr=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,Tt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Tt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ke),D.pixelStorei(D.UNPACK_SKIP_ROWS,He),D.pixelStorei(D.UNPACK_SKIP_IMAGES,De);const Lt=w.isDataArrayTexture||w.isData3DTexture,Pn=F.isDataArrayTexture||F.isData3DTexture;if(w.isDepthTexture){const Ln=Me.get(w),cn=Me.get(F),gn=Me.get(Ln.__renderTarget),Ac=Me.get(cn.__renderTarget);Pe.bindFramebuffer(D.READ_FRAMEBUFFER,gn.__webglFramebuffer),Pe.bindFramebuffer(D.DRAW_FRAMEBUFFER,Ac.__webglFramebuffer);for(let cs=0;cs<ve;cs++)Lt&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Me.get(w).__webglTexture,O,De+cs),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Me.get(F).__webglTexture,se,Nt+cs)),D.blitFramebuffer(ke,He,me,Se,nt,gt,me,Se,D.DEPTH_BUFFER_BIT,D.NEAREST);Pe.bindFramebuffer(D.READ_FRAMEBUFFER,null),Pe.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(O!==0||w.isRenderTargetTexture||Me.has(w)){const Ln=Me.get(w),cn=Me.get(F);Pe.bindFramebuffer(D.READ_FRAMEBUFFER,xg),Pe.bindFramebuffer(D.DRAW_FRAMEBUFFER,yg);for(let gn=0;gn<ve;gn++)Lt?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ln.__webglTexture,O,De+gn):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ln.__webglTexture,O),Pn?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,cn.__webglTexture,se,Nt+gn):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,cn.__webglTexture,se),O!==0?D.blitFramebuffer(ke,He,me,Se,nt,gt,me,Se,D.COLOR_BUFFER_BIT,D.NEAREST):Pn?D.copyTexSubImage3D(Pt,se,nt,gt,Nt+gn,ke,He,me,Se):D.copyTexSubImage2D(Pt,se,nt,gt,ke,He,me,Se);Pe.bindFramebuffer(D.READ_FRAMEBUFFER,null),Pe.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Pn?w.isDataTexture||w.isData3DTexture?D.texSubImage3D(Pt,se,nt,gt,Nt,me,Se,ve,xt,Ue,Tt.data):F.isCompressedArrayTexture?D.compressedTexSubImage3D(Pt,se,nt,gt,Nt,me,Se,ve,xt,Tt.data):D.texSubImage3D(Pt,se,nt,gt,Nt,me,Se,ve,xt,Ue,Tt):w.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,se,nt,gt,me,Se,xt,Ue,Tt.data):w.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,se,nt,gt,Tt.width,Tt.height,xt,Tt.data):D.texSubImage2D(D.TEXTURE_2D,se,nt,gt,me,Se,xt,Ue,Tt);D.pixelStorei(D.UNPACK_ROW_LENGTH,ot),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Mn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Hs),D.pixelStorei(D.UNPACK_SKIP_ROWS,Sn),D.pixelStorei(D.UNPACK_SKIP_IMAGES,zr),se===0&&F.generateMipmaps&&D.generateMipmap(Pt),Pe.unbindTexture()},this.copyTextureToTexture3D=function(w,F,B=null,z=null,O=0){return or('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,F,B,z,O)},this.initRenderTarget=function(w){Me.get(w).__webglFramebuffer===void 0&&Ze.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Ze.setTextureCube(w,0):w.isData3DTexture?Ze.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Ze.setTexture2DArray(w,0):Ze.setTexture2D(w,0),Pe.unbindTexture()},this.resetState=function(){A=0,L=0,N=null,Pe.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}function Ef(i,e){if(e===Jg)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===bu||e===bp){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===bu)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class tw extends as{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new aw(t)}),this.register(function(t){return new ow(t)}),this.register(function(t){return new gw(t)}),this.register(function(t){return new _w(t)}),this.register(function(t){return new vw(t)}),this.register(function(t){return new lw(t)}),this.register(function(t){return new uw(t)}),this.register(function(t){return new hw(t)}),this.register(function(t){return new dw(t)}),this.register(function(t){return new rw(t)}),this.register(function(t){return new fw(t)}),this.register(function(t){return new cw(t)}),this.register(function(t){return new mw(t)}),this.register(function(t){return new pw(t)}),this.register(function(t){return new iw(t)}),this.register(function(t){return new xw(t)}),this.register(function(t){return new yw(t)})}load(e,t,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=ur.extractUrlBase(e);a=ur.resolveURL(l,this.path)}else a=ur.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new dc(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===im){try{a[et.KHR_BINARY_GLTF]=new Mw(e)}catch(h){s&&s(h);return}r=JSON.parse(a[et.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new Nw(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case et.KHR_MATERIALS_UNLIT:a[h]=new sw;break;case et.KHR_DRACO_MESH_COMPRESSION:a[h]=new Sw(r,this.dracoLoader);break;case et.KHR_TEXTURE_TRANSFORM:a[h]=new ww;break;case et.KHR_MESH_QUANTIZATION:a[h]=new bw;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function nw(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const et={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class iw{constructor(e){this.parser=e,this.name=et.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const u=new xe(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],mn);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new jp(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Sh(u),l.distance=h;break;case"spot":l=new nv(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Ei(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class sw{constructor(){this.name=et.KHR_MATERIALS_UNLIT}getMaterialType(){return tt}extendParams(e,t,n){const s=[];e.color=new xe(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],mn),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,At))}return Promise.all(s)}}class rw{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class aw{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ue(o,o)}return Promise.all(r)}}class ow{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class cw{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class lw{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new xe(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],mn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,At)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class uw{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class hw{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new xe().setRGB(o[0],o[1],o[2],mn),Promise.all(r)}}class dw{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class fw{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new xe().setRGB(o[0],o[1],o[2],mn),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,At)),Promise.all(r)}}class pw{constructor(e){this.parser=e,this.name=et.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class mw{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class gw{constructor(e){this.parser=e,this.name=et.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class _w{constructor(e){this.parser=e,this.name=et.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class vw{constructor(e){this.parser=e,this.name=et.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class xw{constructor(e){this.name=et.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=s.byteOffset||0,l=s.byteLength||0,u=s.count,h=s.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(f),u,h,d,s.mode,s.filter),f})})}else return null}}class yw{constructor(e){this.name=et.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==Nn.TRIANGLES&&l.mode!==Nn.TRIANGLE_STRIP&&l.mode!==Nn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],d=l[0].count,f=[];for(const m of h){const _=new qe,g=new E,p=new Hn,y=new E(1,1,1),S=new i_(m.geometry,m.material,d);for(let v=0;v<d;v++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,v),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,v),c.SCALE&&y.fromBufferAttribute(c.SCALE,v),S.setMatrixAt(v,_.compose(g,p,y));for(const v in c)if(v==="_COLOR_0"){const R=c[v];S.instanceColor=new Eu(R.array,R.itemSize,R.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&m.geometry.setAttribute(v,c[v]);yt.prototype.copy.call(S,m),this.parser.assignFinalMaterial(S),f.push(S)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const im="glTF",jr=12,Af={JSON:1313821514,BIN:5130562};class Mw{constructor(e){this.name=et.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,jr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==im)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-jr,r=new DataView(e,jr);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===Af.JSON){const l=new Uint8Array(e,jr+a,o);this.content=n.decode(l)}else if(c===Af.BIN){const l=jr+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Sw{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=et.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const u in a){const h=Iu[u]||u.toLowerCase();o[h]=a[u]}for(const u in e.attributes){const h=Iu[u]||u.toLowerCase();if(a[u]!==void 0){const d=n.accessors[e.attributes[u]],f=hr[d.componentType];l[h]=f.name,c[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){s.decodeDracoFile(u,function(f){for(const m in f.attributes){const _=f.attributes[m],g=c[m];g!==void 0&&(_.normalized=g)}h(f)},o,l,mn,d)})})}}class ww{constructor(){this.name=et.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class bw{constructor(){this.name=et.KHR_MESH_QUANTIZATION}}class sm extends La{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=s-t,h=(n-t)/u,d=h*h,f=d*h,m=e*l,_=m-l,g=-2*f+3*d,p=f-d,y=1-g,S=p-d+h;for(let v=0;v!==o;v++){const R=a[_+v+o],A=a[_+v+c]*u,L=a[m+v+o],N=a[m+v]*u;r[v]=y*R+S*A+g*L+p*N}return r}}const Tw=new Hn;class Ew extends sm{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return Tw.fromArray(r).normalize().toArray(r),r}}const Nn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},hr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Rf={9728:fn,9729:En,9984:gp,9985:To,9986:Jr,9987:Ai},Cf={33071:qi,33648:Ho,10497:ns},fl={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Iu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Vi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Aw={CUBICSPLINE:void 0,LINEAR:ga,STEP:ma},pl={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Rw(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Kt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ai})),i.DefaultMaterial}function ms(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ei(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Cw(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,u=e.length;l<u;l++){const h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];if(n){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;a.push(d)}if(s){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;o.push(d)}if(r){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],d=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function Pw(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Lw(i){let e;const t=i.extensions&&i.extensions[et.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ml(t.attributes):e=i.indices+":"+ml(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+ml(i.targets[n]);return e}function ml(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Du(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Iw(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Dw=new qe;class Nw{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new nw,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new yh(this.options.manager):this.textureLoader=new rv(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new dc(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return ms(r,o,s),Ei(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,u]of a.children.entries())r(u,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[et.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(ur.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=fl[s.type],o=hr[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new qt(l,a,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=fl[s.type],l=hr[s.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0;let _,g;if(f&&f!==h){const p=Math.floor(d/f),y="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let S=t.cache.get(y);S||(_=new l(o,p*f,s.count*f/u),S=new J0(_,f/u),t.cache.add(y,S)),g=new dh(S,c,d%f/u,m)}else o===null?_=new l(s.count*c):_=new l(o,d,s.count*c),g=new qt(_,c,m);if(s.sparse!==void 0){const p=fl.SCALAR,y=hr[s.sparse.indices.componentType],S=s.sparse.indices.byteOffset||0,v=s.sparse.values.byteOffset||0,R=new y(a[1],S,s.sparse.count*p),A=new l(a[2],v,s.sparse.count*c);o!==null&&(g=new qt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let L=0,N=R.length;L<N;L++){const b=R[L];if(g.setX(b,A[L*c]),c>=2&&g.setY(b,A[L*c+1]),c>=3&&g.setZ(b,A[L*c+2]),c>=4&&g.setW(b,A[L*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return u.magFilter=Rf[d.magFilter]||En,u.minFilter=Rf[d.minFilter]||Ai,u.wrapS=Cf[d.wrapS]||ns,u.wrapT=Cf[d.wrapT]||ns,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==fn&&u.minFilter!==En,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=s.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(h){l=!0;const d=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(d,f){let m=d;t.isImageBitmapLoader===!0&&(m=function(_){const g=new en(_);g.needsUpdate=!0,d(g)}),t.load(ur.resolveURL(h,r.path),m,void 0,f)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),Ei(h,a),h.userData.mimeType=a.mimeType||Iw(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[et.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[et.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[et.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new bs,Rn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Ji,Rn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Kt}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},l=[];if(c[et.KHR_MATERIALS_UNLIT]){const h=s[et.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,r,t))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new xe(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],mn),o.opacity=d[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,At)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Vt);const u=r.alphaMode||pl.OPAQUE;if(u===pl.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===pl.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==tt&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ue(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==tt&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==tt){const h=r.emissiveFactor;o.emissive=new xe().setRGB(h[0],h[1],h[2],mn)}return r.emissiveTexture!==void 0&&a!==tt&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,At)),Promise.all(l).then(function(){const h=new a(o);return r.name&&(h.name=r.name),Ei(h,r),t.associations.set(h,{materials:e}),r.extensions&&ms(s,h,r),h})}createUniqueName(e){const t=mt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[et.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Pf(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],u=Lw(l),h=s[u];if(h)a.push(h.promise);else{let d;l.extensions&&l.extensions[et.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=Pf(new bt,l,t),s[u]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const u=a[c].material===void 0?Rw(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let f=0,m=u.length;f<m;f++){const _=u[f],g=a[f];let p;const y=l[f];if(g.mode===Nn.TRIANGLES||g.mode===Nn.TRIANGLE_STRIP||g.mode===Nn.TRIANGLE_FAN||g.mode===void 0)p=r.isSkinnedMesh===!0?new e_(_,y):new Z(_,y),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===Nn.TRIANGLE_STRIP?p.geometry=Ef(p.geometry,bp):g.mode===Nn.TRIANGLE_FAN&&(p.geometry=Ef(p.geometry,bu));else if(g.mode===Nn.LINES)p=new va(_,y);else if(g.mode===Nn.LINE_STRIP)p=new lc(_,y);else if(g.mode===Nn.LINE_LOOP)p=new o_(_,y);else if(g.mode===Nn.POINTS)p=new ra(_,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&Pw(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Ei(p,r),g.extensions&&ms(s,p,g),t.assignFinalMaterial(p),h.push(p)}for(let f=0,m=h.length;f<m;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return r.extensions&&ms(s,h[0],r),h[0];const d=new ct;r.extensions&&ms(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,m=h.length;f<m;f++)d.add(h[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new dn(Ee.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new wh(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ei(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],c=[];for(let l=0,u=a.length;l<u;l++){const h=a[l];if(h){o.push(h);const d=new qe;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new fh(o,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let h=0,d=s.channels.length;h<d;h++){const f=s.channels[h],m=s.samplers[f.sampler],_=f.target,g=_.node,p=s.parameters!==void 0?s.parameters[m.input]:m.input,y=s.parameters!==void 0?s.parameters[m.output]:m.output;_.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",y)),l.push(m),u.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const d=h[0],f=h[1],m=h[2],_=h[3],g=h[4],p=[];for(let y=0,S=d.length;y<S;y++){const v=d[y],R=f[y],A=m[y],L=_[y],N=g[y];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const b=n._createAnimationTracks(v,R,A,L,N);if(b)for(let T=0;T<b.length;T++)p.push(b[T])}return new K_(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const u=l[0],h=l[1],d=l[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Dw)});for(let f=0,m=h.length;f<m;f++)u.add(h[f]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new Np:l.length>1?u=new ct:l.length===1?u=l[0]:u=new yt,u!==l[0])for(let h=0,d=l.length;h<d;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=a),Ei(u,r),r.extensions&&ms(n,u,r),r.matrix!==void 0){const h=new qe;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const h=s.associations.get(u);s.associations.set(u,{...h})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new ct;n.name&&(r.name=s.createUniqueName(n.name)),Ei(r,n),n.extensions&&ms(t,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);const l=u=>{const h=new Map;for(const[d,f]of s.associations)(d instanceof Rn||d instanceof en)&&h.set(d,f);return u.traverse(d=>{const f=s.associations.get(d);f!=null&&h.set(d,f)}),h};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const a=[],o=e.name?e.name:e.uuid,c=[];Vi[r.path]===Vi.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(Vi[r.path]){case Vi.weights:l=Er;break;case Vi.rotation:l=Ar;break;case Vi.translation:case Vi.scale:l=Rr;break;default:n.itemSize===1?l=Er:l=Rr;break}const u=s.interpolation!==void 0?Aw[s.interpolation]:ga,h=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const m=new l(c[d]+"."+Vi[r.path],t.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Du(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Ar?Ew:sm;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Uw(i,e,t){const n=e.attributes,s=new Cn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new E(c[0],c[1],c[2]),new E(l[0],l[1],l[2])),o.normalized){const u=Du(hr[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new E,c=new E;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){const _=Du(hr[d.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new li;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function Pf(i,e,t){const n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(const a in n){const o=Iu[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return Qe.workingColorSpace!==mn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Qe.workingColorSpace}" not supported.`),Ei(i,e),Uw(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?Cw(i,e.targets,t):i})}class Fw extends as{constructor(e){super(e)}load(e,t,n,s){const r=this,a=this.path===""?ur.extractUrlBase(e):this.path,o=new dc(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(c){try{t(r.parse(c,a))}catch(l){s?s(l):console.error(l),r.manager.itemError(e)}},n,s)}setMaterialOptions(e){return this.materialOptions=e,this}parse(e,t){const n=e.split(`
`);let s={};const r=/\s+/,a={};for(let c=0;c<n.length;c++){let l=n[c];if(l=l.trim(),l.length===0||l.charAt(0)==="#")continue;const u=l.indexOf(" ");let h=u>=0?l.substring(0,u):l;h=h.toLowerCase();let d=u>=0?l.substring(u+1):"";if(d=d.trim(),h==="newmtl")s={name:d},a[d]=s;else if(h==="ka"||h==="kd"||h==="ks"||h==="ke"){const f=d.split(r,3);s[h]=[parseFloat(f[0]),parseFloat(f[1]),parseFloat(f[2])]}else s[h]=d}const o=new Ow(this.resourcePath||t,this.materialOptions);return o.setCrossOrigin(this.crossOrigin),o.setManager(this.manager),o.setMaterials(a),o}}class Ow{constructor(e="",t={}){this.baseUrl=e,this.options=t,this.materialsInfo={},this.materials={},this.materialsArray=[],this.nameLookup={},this.crossOrigin="anonymous",this.side=this.options.side!==void 0?this.options.side:ai,this.wrap=this.options.wrap!==void 0?this.options.wrap:ns}setCrossOrigin(e){return this.crossOrigin=e,this}setManager(e){this.manager=e}setMaterials(e){this.materialsInfo=this.convert(e),this.materials={},this.materialsArray=[],this.nameLookup={}}convert(e){if(!this.options)return e;const t={};for(const n in e){const s=e[n],r={};t[n]=r;for(const a in s){let o=!0,c=s[a];const l=a.toLowerCase();switch(l){case"kd":case"ka":case"ks":this.options&&this.options.normalizeRGB&&(c=[c[0]/255,c[1]/255,c[2]/255]),this.options&&this.options.ignoreZeroRGBs&&c[0]===0&&c[1]===0&&c[2]===0&&(o=!1);break}o&&(r[l]=c)}}return t}preload(){for(const e in this.materialsInfo)this.create(e)}getIndex(e){return this.nameLookup[e]}getAsArray(){let e=0;for(const t in this.materialsInfo)this.materialsArray[e]=this.create(t),this.nameLookup[t]=e,e++;return this.materialsArray}create(e){return this.materials[e]===void 0&&this.createMaterial_(e),this.materials[e]}createMaterial_(e){const t=this,n=this.materialsInfo[e],s={name:e,side:this.side};function r(o,c){return typeof c!="string"||c===""?"":/^https?:\/\//i.test(c)?c:o+c}function a(o,c){if(s[o])return;const l=t.getTextureParams(c,s),u=t.loadTexture(r(t.baseUrl,l.url));u.repeat.copy(l.scale),u.offset.copy(l.offset),u.wrapS=t.wrap,u.wrapT=t.wrap,(o==="map"||o==="emissiveMap")&&(u.colorSpace=At),s[o]=u}for(const o in n){const c=n[o];let l;if(c!=="")switch(o.toLowerCase()){case"kd":s.color=Qe.colorSpaceToWorking(new xe().fromArray(c),At);break;case"ks":s.specular=Qe.colorSpaceToWorking(new xe().fromArray(c),At);break;case"ke":s.emissive=Qe.colorSpaceToWorking(new xe().fromArray(c),At);break;case"map_kd":a("map",c);break;case"map_ks":a("specularMap",c);break;case"map_ke":a("emissiveMap",c);break;case"norm":a("normalMap",c);break;case"map_bump":case"bump":a("bumpMap",c);break;case"disp":a("displacementMap",c);break;case"map_d":a("alphaMap",c),s.transparent=!0;break;case"ns":s.shininess=parseFloat(c);break;case"d":l=parseFloat(c),l<1&&(s.opacity=l,s.transparent=!0);break;case"tr":l=parseFloat(c),this.options&&this.options.invertTrProperty&&(l=1-l),l>0&&(s.opacity=1-l,s.transparent=!0);break}}return this.materials[e]=new xh(s),this.materials[e]}getTextureParams(e,t){const n={scale:new ue(1,1),offset:new ue(0,0)},s=e.split(/\s+/);let r;return r=s.indexOf("-bm"),r>=0&&(t.bumpScale=parseFloat(s[r+1]),s.splice(r,2)),r=s.indexOf("-mm"),r>=0&&(t.displacementBias=parseFloat(s[r+1]),t.displacementScale=parseFloat(s[r+2]),s.splice(r,3)),r=s.indexOf("-s"),r>=0&&(n.scale.set(parseFloat(s[r+1]),parseFloat(s[r+2])),s.splice(r,4)),r=s.indexOf("-o"),r>=0&&(n.offset.set(parseFloat(s[r+1]),parseFloat(s[r+2])),s.splice(r,4)),n.url=s.join(" ").trim(),n}loadTexture(e,t,n,s,r){const a=this.manager!==void 0?this.manager:Kp;let o=a.getHandler(e);o===null&&(o=new yh(a)),o.setCrossOrigin&&o.setCrossOrigin(this.crossOrigin);const c=o.load(e,n,s,r);return t!==void 0&&(c.mapping=t),c}}const kw=/^[og]\s*(.+)?/,Bw=/^mtllib /,zw=/^usemtl /,Hw=/^usemap /,Lf=/\s+/,If=new E,gl=new E,Df=new E,Nf=new E,Dn=new E,vo=new xe;function Vw(){const i={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=t!==!1;return}const n=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:t!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(s,r){const a=this._finalize(!1);a&&(a.inherited||a.groupCount<=0)&&this.materials.splice(a.index,1);const o={index:this.materials.length,name:s||"",mtllib:Array.isArray(r)&&r.length>0?r[r.length-1]:"",smooth:a!==void 0?a.smooth:this.smooth,groupStart:a!==void 0?a.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(c){const l={index:typeof c=="number"?c:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return l.clone=this.clone.bind(l),l}};return this.materials.push(o),o},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(s){const r=this.currentMaterial();if(r&&r.groupEnd===-1&&(r.groupEnd=this.geometry.vertices.length/3,r.groupCount=r.groupEnd-r.groupStart,r.inherited=!1),s&&this.materials.length>1)for(let a=this.materials.length-1;a>=0;a--)this.materials[a].groupCount<=0&&this.materials.splice(a,1);return s&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),r}},n&&n.name&&typeof n.clone=="function"){const s=n.clone(0);s.inherited=!0,this.object.materials.push(s)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseNormalIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseUVIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/2)*2},addVertex:function(e,t,n){const s=this.vertices,r=this.object.geometry.vertices;r.push(s[e+0],s[e+1],s[e+2]),r.push(s[t+0],s[t+1],s[t+2]),r.push(s[n+0],s[n+1],s[n+2])},addVertexPoint:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,n){const s=this.normals,r=this.object.geometry.normals;r.push(s[e+0],s[e+1],s[e+2]),r.push(s[t+0],s[t+1],s[t+2]),r.push(s[n+0],s[n+1],s[n+2])},addFaceNormal:function(e,t,n){const s=this.vertices,r=this.object.geometry.normals;If.fromArray(s,e),gl.fromArray(s,t),Df.fromArray(s,n),Dn.subVectors(Df,gl),Nf.subVectors(If,gl),Dn.cross(Nf),Dn.normalize(),r.push(Dn.x,Dn.y,Dn.z),r.push(Dn.x,Dn.y,Dn.z),r.push(Dn.x,Dn.y,Dn.z)},addColor:function(e,t,n){const s=this.colors,r=this.object.geometry.colors;s[e]!==void 0&&r.push(s[e+0],s[e+1],s[e+2]),s[t]!==void 0&&r.push(s[t+0],s[t+1],s[t+2]),s[n]!==void 0&&r.push(s[n+0],s[n+1],s[n+2])},addUV:function(e,t,n){const s=this.uvs,r=this.object.geometry.uvs;r.push(s[e+0],s[e+1]),r.push(s[t+0],s[t+1]),r.push(s[n+0],s[n+1])},addDefaultUV:function(){const e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){const t=this.uvs;this.object.geometry.uvs.push(t[e+0],t[e+1])},addFace:function(e,t,n,s,r,a,o,c,l){const u=this.vertices.length;let h=this.parseVertexIndex(e,u),d=this.parseVertexIndex(t,u),f=this.parseVertexIndex(n,u);if(this.addVertex(h,d,f),this.addColor(h,d,f),o!==void 0&&o!==""){const m=this.normals.length;h=this.parseNormalIndex(o,m),d=this.parseNormalIndex(c,m),f=this.parseNormalIndex(l,m),this.addNormal(h,d,f)}else this.addFaceNormal(h,d,f);if(s!==void 0&&s!==""){const m=this.uvs.length;h=this.parseUVIndex(s,m),d=this.parseUVIndex(r,m),f=this.parseUVIndex(a,m),this.addUV(h,d,f),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";const t=this.vertices.length;for(let n=0,s=e.length;n<s;n++){const r=this.parseVertexIndex(e[n],t);this.addVertexPoint(r),this.addColor(r)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";const n=this.vertices.length,s=this.uvs.length;for(let r=0,a=e.length;r<a;r++)this.addVertexLine(this.parseVertexIndex(e[r],n));for(let r=0,a=t.length;r<a;r++)this.addUVLine(this.parseUVIndex(t[r],s))}};return i.startObject("",!1),i}class Gw extends as{constructor(e){super(e),this.materials=null}load(e,t,n,s){const r=this,a=new dc(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(r.parse(o))}catch(c){s?s(c):console.error(c),r.manager.itemError(e)}},n,s)}setMaterials(e){return this.materials=e,this}parse(e){const t=new Vw;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));const n=e.split(`
`);let s=[];for(let o=0,c=n.length;o<c;o++){const l=n[o].trimStart();if(l.length===0)continue;const u=l.charAt(0);if(u!=="#")if(u==="v"){const h=l.split(Lf);switch(h[0]){case"v":t.vertices.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3])),h.length>=7?(vo.setRGB(parseFloat(h[4]),parseFloat(h[5]),parseFloat(h[6]),At),t.colors.push(vo.r,vo.g,vo.b)):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3]));break;case"vt":t.uvs.push(parseFloat(h[1]),parseFloat(h[2]));break}}else if(u==="f"){const d=l.slice(1).trim().split(Lf),f=[];for(let _=0,g=d.length;_<g;_++){const p=d[_];if(p.length>0){const y=p.split("/");f.push(y)}}const m=f[0];for(let _=1,g=f.length-1;_<g;_++){const p=f[_],y=f[_+1];t.addFace(m[0],p[0],y[0],m[1],p[1],y[1],m[2],p[2],y[2])}}else if(u==="l"){const h=l.substring(1).trim().split(" ");let d=[];const f=[];if(l.indexOf("/")===-1)d=h;else for(let m=0,_=h.length;m<_;m++){const g=h[m].split("/");g[0]!==""&&d.push(g[0]),g[1]!==""&&f.push(g[1])}t.addLineGeometry(d,f)}else if(u==="p"){const d=l.slice(1).trim().split(" ");t.addPointGeometry(d)}else if((s=kw.exec(l))!==null){const h=(" "+s[0].slice(1).trim()).slice(1);t.startObject(h)}else if(zw.test(l))t.object.startMaterial(l.substring(7).trim(),t.materialLibraries);else if(Bw.test(l))t.materialLibraries.push(l.substring(7).trim());else if(Hw.test(l))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(u==="s"){if(s=l.split(" "),s.length>1){const d=s[1].trim().toLowerCase();t.object.smooth=d!=="0"&&d!=="off"}else t.object.smooth=!0;const h=t.object.currentMaterial();h&&(h.smooth=t.object.smooth)}else{if(l==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+l+'"')}}t.finalize();const r=new ct;if(r.materialLibraries=[].concat(t.materialLibraries),!(t.objects.length===1&&t.objects[0].geometry.vertices.length===0)===!0)for(let o=0,c=t.objects.length;o<c;o++){const l=t.objects[o],u=l.geometry,h=l.materials,d=u.type==="Line",f=u.type==="Points";let m=!1;if(u.vertices.length===0)continue;const _=new bt;_.setAttribute("position",new Ge(u.vertices,3)),u.normals.length>0&&_.setAttribute("normal",new Ge(u.normals,3)),u.colors.length>0&&(m=!0,_.setAttribute("color",new Ge(u.colors,3))),u.hasUVIndices===!0&&_.setAttribute("uv",new Ge(u.uvs,2));const g=[];for(let y=0,S=h.length;y<S;y++){const v=h[y],R=v.name+"_"+v.smooth+"_"+m;let A=t.materials[R];if(this.materials!==null){if(A=this.materials.create(v.name),d&&A&&!(A instanceof Ji)){const L=new Ji;Rn.prototype.copy.call(L,A),L.color.copy(A.color),A=L}else if(f&&A&&!(A instanceof bs)){const L=new bs({size:10,sizeAttenuation:!1});Rn.prototype.copy.call(L,A),L.color.copy(A.color),L.map=A.map,A=L}}A===void 0&&(d?A=new Ji:f?A=new bs({size:1,sizeAttenuation:!1}):A=new xh,A.name=v.name,A.flatShading=!v.smooth,A.vertexColors=m,t.materials[R]=A),g.push(A)}let p;if(g.length>1){for(let y=0,S=h.length;y<S;y++){const v=h[y];_.addGroup(v.groupStart,v.groupCount,y)}d?p=new va(_,g):f?p=new ra(_,g):p=new Z(_,g)}else d?p=new va(_,g[0]):f?p=new ra(_,g[0]):p=new Z(_,g[0]);p.name=l.name,r.add(p)}else if(t.vertices.length>0){const o=new bs({size:1,sizeAttenuation:!1}),c=new bt;c.setAttribute("position",new Ge(t.vertices,3)),t.colors.length>0&&t.colors[0]!==void 0&&(c.setAttribute("color",new Ge(t.colors,3)),o.vertexColors=!0);const l=new ra(c,o);r.add(l)}return r}}const ci={"hatchback-sports":{label:"Hatchback Sport",callout:"LIGHT // QUICK",model:"./assets/rigged/vehicles/kenney-hatchback-sports.glb",preview:"./assets/rigged/vehicles/previews/hatchback-sports.png",turretHeight:2.34},police:{label:"Police Interceptor",callout:"PURSUIT // TOUGH",model:"./assets/rigged/vehicles/kenney-police.glb",preview:"./assets/rigged/vehicles/previews/police.png",turretHeight:2.56},"race-future":{label:"Future Racer",callout:"LOW // EXOTIC",model:"./assets/rigged/vehicles/kenney-race-future.glb",preview:"./assets/rigged/vehicles/previews/race-future.png",turretHeight:2.16},race:{label:"Track Racer",callout:"LOW // FAST",model:"./assets/rigged/vehicles/kenney-race.glb",preview:"./assets/rigged/vehicles/previews/race.png",turretHeight:2.12},"sedan-sports":{label:"Sport Sedan",callout:"BALANCED // SHARP",model:"./assets/rigged/vehicles/kenney-sedan-sports.glb",preview:"./assets/rigged/vehicles/previews/sedan-sports.png",turretHeight:2.28},sedan:{label:"Street Sedan",callout:"BALANCED // CLEAN",model:"./assets/rigged/vehicles/kenney-sedan.glb",preview:"./assets/rigged/vehicles/previews/sedan.png",turretHeight:2.38},"suv-luxury":{label:"Luxury SUV",callout:"HIGH // HEAVY",model:"./assets/rigged/vehicles/kenney-suv-luxury.glb",preview:"./assets/rigged/vehicles/previews/suv-luxury.png",turretHeight:2.64},suv:{label:"Scrap SUV",callout:"RUGGED // READY",model:"./assets/rigged/vehicles/kenney-suv.glb",preview:"./assets/rigged/vehicles/previews/suv.png",turretHeight:2.54},taxi:{label:"Battle Taxi",callout:"LOUD // ICONIC",model:"./assets/rigged/vehicles/kenney-taxi.glb",preview:"./assets/rigged/vehicles/previews/taxi.png",turretHeight:2.67}},rm={vehicle:{defaultId:"suv",models:ci,palette:"./assets/rigged/vehicles/Textures/colormap.png",wheelNodes:["wheel-back-left","wheel-back-right","wheel-front-left","wheel-front-right"]},weapon:{model:null,fallback:"Three original low-poly roof turrets and anime-style weapon VFX assembled in Three.js"},arena:{ramp:"./assets/rigged/arena/kenney-ramp.glb",barrier:"./assets/rigged/arena/kenney-barrier-wall.glb",pylon:"./assets/rigged/arena/kenney-pylon.glb"},props:{palette:"./assets/rigged/props/Textures/colormap.png",crate:"./assets/rigged/props/kenney-crate.glb",tire:"./assets/rigged/props/kenney-debris-tire.glb",bumper:"./assets/rigged/props/kenney-debris-bumper.glb"},packs:{carKit:{name:"Kenney Car Kit 3.1",creator:"Kenney",source:"https://kenney.nl/assets/car-kit",license:"CC0 1.0",creditRequired:!1,licenseFile:"./assets/rigged/licenses/kenney-car-kit.txt"},racingKit:{name:"Kenney Racing Kit 2.0",creator:"Kenney",source:"https://kenney.nl/assets/racing-kit",license:"CC0 1.0",creditRequired:!1,licenseFile:"./assets/rigged/licenses/kenney-racing-kit.txt"}}},Uf="./assets/rigged/racekart-hilly",zt=(i,e)=>({obj:`${Uf}/${i}.obj`,mtl:`${Uf}/${i}.mtl`,category:e}),Sa={terrainFlat:zt("Terrain_Grass_Flat_1x1","terrain"),terrainHillSide:zt("Terrain_Hill_Side_1x3","terrain"),terrainHillCorner:zt("Terrain_Hill_Corner_Outer_4x4","terrain"),trackStraight:zt("Track_Standard_Straight_Double","track"),trackStraightStriped:zt("Track_Striped_Straight_Double","track"),trackCurve:zt("Track_Standard_Curve_Double_4x4","track"),trackCurveStriped:zt("Track_Striped_Curve_Double_4x4","track"),trackBank:zt("Track_Standard_Incline_Double","track"),trackBankStriped:zt("Track_Striped_Incline_Double","track"),bridgeStart:zt("Track_Bridge_Start","bridge"),bridgeIncline:zt("Track_Bridge_Incline_Gentle_Supported","bridge"),bridgeFlat:zt("Track_Bridge_Flat_Supported","bridge"),bridgeCurve:zt("Track_Bridge_Curve_3x3","bridge"),stuntRamp:zt("Prop_Track_Ramp","stunt"),stuntRailing:zt("Prop_Track_Ramp_Railing","stunt"),trackArch:zt("Prop_Track_Arch_1x4","prop"),fence:zt("Prop_Decorative_Fence_Railing","prop"),rockWide:zt("Prop_Decorative_Rock_2","prop"),rockTall:zt("Prop_Decorative_Rock_5","prop"),hayBale:zt("Prop_Decorative_Hay_Bale_Box","prop")},Tn=Math.PI/2,Ff=Math.PI,mc={dustring:{id:"dustring",name:"Dust Ring",callsign:"LEVEL 01 // SCRAP RING",description:"One clean combat loop with an open center, four readable jumps, and room to hunt the rival.",difficulty:"COMBAT READY",arenaKind:"ring",radius:100,ringInnerRadius:60,ringOuterRadius:88,spawn:{x:0,z:-74,heading:0},opponentSpawn:{x:0,z:74,heading:Ff},objective:"Run the circuit. Hit the ramps. Scrap the rival.",surfaces:[{asset:"stuntRamp",kind:"ramp",x:0,z:-57,rotation:0,width:12,length:22,startHeight:0,endHeight:4.8,scale:11,assetYaw:Tn,label:"south inward ramp"},{asset:"stuntRamp",kind:"ramp",x:0,z:57,rotation:0,width:12,length:22,startHeight:0,endHeight:4.8,scale:11,assetYaw:Tn,label:"north outward ramp"},{asset:"stuntRamp",kind:"ramp",x:-57,z:0,rotation:-Tn,width:12,length:22,startHeight:0,endHeight:4.8,scale:11,assetYaw:Tn,label:"west outward ramp"},{asset:"stuntRamp",kind:"ramp",x:57,z:0,rotation:-Tn,width:12,length:22,startHeight:0,endHeight:4.8,scale:11,assetYaw:Tn,label:"east inward ramp"}],track:[],terrain:[],props:[{asset:"rockWide",x:-23,z:19,rotation:.25,scale:5.2,label:"center west rock"},{asset:"rockTall",x:-18,z:-18,rotation:-.4,scale:4.2,label:"center south rock"},{asset:"hayBale",x:18,z:-24,rotation:.15,scale:3.8,label:"center hay one"},{asset:"hayBale",x:23,z:-24,rotation:-.12,scale:3.8,label:"center hay two"}],barriers:[{x:31,z:-21,rotation:Tn,length:19},{x:31,z:21,rotation:Tn,length:19},{x:-8,z:31,rotation:0,length:13},{x:-31,z:-4,rotation:Tn,length:13}],targets:[]},ovalbowl:{id:"ovalbowl",name:"Capsule Circuit",callsign:"ARENA 02 // CAPSULE WALL-RIDE",description:"A flat capsule stadium with long straights, rounded ends, a layered bank, and a hard upper guard.",difficulty:"WALL RIDE READY",arenaKind:"capsule",radius:112,ringInnerRadius:44,ringOuterRadius:62,bowl:{straightHalfLength:46,flatRadius:44,outerRadius:62,wallRise:11.5,guardHeight:4.5},spawn:{x:0,z:-22,heading:0},opponentSpawn:{x:0,z:22,heading:Ff},objective:"Own the open floor. Carry speed into the bank. Scrap the rival.",surfaces:[],track:[],terrain:[],props:[{asset:"stuntRailing",x:-63.2,z:-17,rotation:Tn,scale:8,label:"west rim racing rail south"},{asset:"stuntRailing",x:-63.2,z:17,rotation:Tn,scale:8,label:"west rim racing rail north"},{asset:"stuntRailing",x:63.2,z:-17,rotation:Tn,scale:8,label:"east rim racing rail south"},{asset:"stuntRailing",x:63.2,z:17,rotation:Tn,scale:8,label:"east rim racing rail north"}],barriers:[],targets:[]}},am="dustring",Ww=new E(0,-1,0);function Xw(i,e){i.updateWorldMatrix(!0,!0);const t=new Cn().setFromObject(i),n=e.sampleSpacing??1.15,s=Ee.clamp(Math.ceil(e.width/n)+1,3,49),r=Ee.clamp(Math.ceil(e.length/n)+1,3,49),a=new Float32Array(s*r),o=new Uint8Array(s*r),c=new $p,l=Math.cos(e.rotation),u=Math.sin(e.rotation),h=t.max.y+2,d=Math.max(8,t.max.y-t.min.y+4),f=e.width*.995,m=e.length*.995;for(let _=0;_<r;_++){const g=-m*.5+_/(r-1)*m;for(let p=0;p<s;p++){const y=-f*.5+p/(s-1)*f,S=e.centerX+y*l+g*u,v=e.centerZ-y*u+g*l;c.set(new E(S,h,v),Ww),c.far=d;const R=c.intersectObject(i,!0)[0],A=_*s+p;R&&(a[A]=R.point.y,o[A]=1)}}return{label:e.label,center:new ue(e.centerX,e.centerZ),rotation:e.rotation,width:e.width,length:e.length,columns:s,rows:r,heights:a,valid:o,metadata:e.metadata}}function qw(i,e,t){const n=e-i.center.x,s=t-i.center.y,r=Math.cos(i.rotation),a=Math.sin(i.rotation),o=n*r-s*a,c=n*a+s*r,l=o/i.width+.5,u=c/i.length+.5;if(l<0||l>1||u<0||u>1)return null;const h=l*(i.columns-1),d=u*(i.rows-1),f=Math.min(Math.floor(h),i.columns-2),m=Math.min(Math.floor(d),i.rows-2),_=h-f,g=d-m,p=[[m*i.columns+f,(1-_)*(1-g)],[m*i.columns+f+1,_*(1-g)],[(m+1)*i.columns+f,(1-_)*g],[(m+1)*i.columns+f+1,_*g]];let y=0,S=0;for(const[v,R]of p)i.valid[v]&&(y+=i.heights[v]*R,S+=R);return S>.24?y/S:null}function Yw(i,e){const t=[],n=Math.cos(i.rotation),s=Math.sin(i.rotation),r=(u,h)=>{const d=-i.width*.5+u/(i.columns-1)*i.width,f=-i.length*.5+h/(i.rows-1)*i.length,m=i.center.x+d*n+f*s,_=i.center.y-d*s+f*n;return[m,i.heights[h*i.columns+u]+.055,_]},a=(u,h,d,f)=>{const m=h*i.columns+u,_=f*i.columns+d;!i.valid[m]||!i.valid[_]||t.push(...r(u,h),...r(d,f))};for(let u=0;u<i.rows;u++)for(let h=0;h<i.columns;h++)h+1<i.columns&&a(h,u,h+1,u),u+1<i.rows&&a(h,u,h,u+1);const o=new bt;o.setAttribute("position",new Ge(t,3));const c=new Ji({color:e,transparent:!0,opacity:.9,depthTest:!1}),l=new va(o,c);return l.name=`heightfield-debug-${i.label}`,l.renderOrder=20,l.visible=!1,l}const Kw=(i,e)=>Math.sin(i*.075)*Math.cos(e*.058)*.035,_l=i=>i*i*(3-2*i),vl=i=>6*i*(1-i);function jw(i,e,t){if(i<=0)return{height:0,slope:0,band:"floor"};if(i<.28){const s=i/.28;return{height:t*.14*_l(s),slope:t*.14*vl(s)/(.28*e),band:"transition"}}if(i<.78){const s=(i-.28)/.5;return{height:t*(.14+.66*_l(s)),slope:t*.66*vl(s)/(.5*e),band:"bank"}}const n=(i-.78)/.22;return{height:t*(.8+.2*_l(n)),slope:t*.2*vl(n)/(.22*e),band:"upper-bank"}}function Gt(i,e,t){const n=Ee.clamp(t,-i.straightHalfLength,i.straightHalfLength),s=e,r=t-n,a=Math.hypot(s,r),o=a>1e-4?s/a:1,c=a>1e-4?r/a:0,l=i.outerRadius-i.flatRadius,u=Ee.clamp((a-i.flatRadius)/l,0,1),h=jw(u,l,i.wallRise),d=1-Ee.smoothstep(a,i.flatRadius-8,i.flatRadius),f=Kw(e,t)*d+h.height,m=h.slope,_=new E(-o*m,1,-c*m).normalize();return{height:f,distance:a,progress:u,anchorZ:n,outwardX:o,outwardZ:c,normal:_,band:h.band}}function om(i,e,t,n,s,r){let a=e,o=t,c=!1,l=0,u=0,h=0;const d=i.outerRadius-r-.12;for(let f=0;f<3;f++){let m=0,_=0,g=0;for(const p of[-s,0,s]){const y=a+Math.sin(n)*p,S=o+Math.cos(n)*p,v=Gt(i,y,S),R=v.distance-d;R<=m||(m=R,_=v.outwardX,g=v.outwardZ)}if(m<=0)break;a-=_*(m+.015),o-=g*(m+.015),c=!0,l=_,u=g,h=Math.max(h,m)}return{x:a,z:o,collided:c,normalX:l,normalZ:u,penetration:h}}function Ah(i,e,t=48,n=40){const s=[];for(let r=0;r<t;r++){const a=r/t*Math.PI;s.push(new ue(Math.cos(a)*i,e+Math.sin(a)*i))}for(let r=0;r<n;r++){const a=r/n;s.push(new ue(-i,Ee.lerp(e,-e,a)))}for(let r=0;r<t;r++){const a=Math.PI+r/t*Math.PI;s.push(new ue(Math.cos(a)*i,-e+Math.sin(a)*i))}for(let r=0;r<n;r++){const a=r/n;s.push(new ue(i,Ee.lerp(-e,e,a)))}return s}function cm(i,e){i.setAttribute("color",new Ge(e,3));const t=i.getAttribute("position"),n=new Float32Array(t.count*2);for(let s=0;s<t.count;s++)n[s*2]=t.getX(s)/7.5,n[s*2+1]=t.getZ(s)/7.5;i.setAttribute("uv",new Ge(n,2)),i.computeVertexNormals(),i.computeBoundingSphere()}function $w(i){const e=Ah(i.flatRadius,i.straightHalfLength),t=[],n=[],s=new xe(12429711),r=new xe(14796193),a=new xe;for(const u of e){const h=Gt(i,u.x,u.y).height;t.push(u.x,h,u.y);const d=Ee.clamp(.48+Math.sin(u.x*.13+u.y*.09)*.12,0,1);a.copy(s).lerp(r,d).toArray(n,n.length)}const o=lr.triangulateShape(e,[]),c=[];for(const[u,h,d]of o)c.push(u,d,h);const l=new bt;return l.setAttribute("position",new Ge(t,3)),l.setIndex(c),cm(l,n),l}function Zw(i,e=30){const t=[];for(let d=0;d<=e;d++){const f=Ee.lerp(i.flatRadius,i.outerRadius,d/e);t.push(Ah(f,i.straightHalfLength))}const n=t[0].length,s=[],r=[],a=new xe(12764608),o=new xe(7764856),c=new xe(12020290),l=new xe;for(let d=0;d<t.length;d++){const f=d/e;for(const m of t[d])s.push(m.x,Gt(i,m.x,m.y).height,m.y),l.copy(a).lerp(o,f),(f>.28&&f<.32||f>.76&&f<.8)&&l.lerp(c,.68),l.toArray(r,r.length)}const u=[];for(let d=0;d<e;d++)for(let f=0;f<n;f++){const m=(f+1)%n,_=d*n+f,g=d*n+m,p=(d+1)*n+f,y=(d+1)*n+m;u.push(_,g,p,g,y,p)}const h=new bt;return h.setAttribute("position",new Ge(s,3)),h.setIndex(u),cm(h,r),h}function Jw(i){const e=Ah(i.outerRadius,i.straightHalfLength),t=[],n=[],s=[],r=[0];for(let o=1;o<=e.length;o++)r.push(r[o-1]+e[(o-1)%e.length].distanceTo(e[o%e.length]));for(let o=0;o<e.length;o++){const c=e[o],l=Gt(i,c.x,c.y).height;t.push(c.x,l-.08,c.y),t.push(c.x,l+i.guardHeight,c.y);const u=r[o]/7.5;n.push(u,0,u,i.guardHeight/7.5)}for(let o=0;o<e.length;o++){const c=(o+1)%e.length,l=o*2,u=l+1,h=c*2,d=h+1;s.push(l,u,h,h,u,d)}const a=new bt;return a.setAttribute("position",new Ge(t,3)),a.setAttribute("uv",new Ge(n,2)),a.setIndex(s),a.computeVertexNormals(),a.computeBoundingSphere(),a}const xo=11.5,yo=6.3,Of=2.6,kf=4.5;class Qw{mode="chase";camera;desiredPosition=new E;desiredLook=new E;smoothedLook=new E;forward=new E;toEnemy=new E;orbitYaw=0;followDistance=xo;followHeight=yo;initialized=!1;constructor(e){this.camera=e}toggle(e){return this.mode==="enemy"?(this.mode="chase",{mode:this.mode,noTarget:!1}):e?(this.mode="enemy",{mode:this.mode,noTarget:!1}):{mode:this.mode,noTarget:!0}}snapToChase(e,t,n){this.orbitYaw=t,this.followDistance=xo,this.followHeight=yo,this.forward.set(Math.sin(t),0,Math.cos(t)),this.camera.position.copy(e).addScaledVector(this.forward,-xo),this.camera.position.y=Math.max(e.y+yo,n(this.camera.position.x,this.camera.position.z)+Of),this.smoothedLook.copy(e).addScaledVector(this.forward,4),this.smoothedLook.y=e.y+1.2,this.camera.lookAt(this.smoothedLook),this.initialized=!0}update(e){const t=Ee.clamp(e.dt,0,.03333333333333333);let n=!1;this.mode==="enemy"&&(!e.enemyAvailable||!e.enemyPosition)&&(this.mode="chase",n=!0),this.forward.set(Math.sin(e.playerHeading),0,Math.cos(e.playerHeading));let s=null;if(this.mode==="enemy"&&e.enemyPosition){if(this.toEnemy.copy(e.enemyPosition).sub(e.playerPosition),this.toEnemy.y=0,s=this.toEnemy.length(),s>.75){const c=Math.atan2(this.toEnemy.x,this.toEnemy.z),l=Math.atan2(Math.sin(c-this.orbitYaw),Math.cos(c-this.orbitYaw));this.orbitYaw+=l*this.response(5.4,t)}const r=Ee.clamp(8.9+s*.105,9.5,14.5),a=Ee.clamp(6.4+s*.035,6.4,9.2);this.followDistance=Ee.lerp(this.followDistance,r,this.response(4.2,t)),this.followHeight=Ee.lerp(this.followHeight,a,this.response(4.2,t)),this.forward.set(Math.sin(this.orbitYaw),0,Math.cos(this.orbitYaw)),this.desiredPosition.copy(e.playerPosition).addScaledVector(this.forward,-this.followDistance),this.desiredPosition.y=e.playerPosition.y+this.followHeight;const o=Ee.clamp(.36+s*.002,.36,.54);this.desiredLook.lerpVectors(e.playerPosition,e.enemyPosition,o),this.desiredLook.y+=1.25}else this.orbitYaw=e.playerHeading,this.followDistance=Ee.lerp(this.followDistance,xo,this.response(4.8,t)),this.followHeight=Ee.lerp(this.followHeight,yo,this.response(4.8,t)),this.desiredPosition.copy(e.playerPosition).addScaledVector(this.forward,-this.followDistance),this.desiredPosition.y=e.playerPosition.y+this.followHeight,this.desiredLook.copy(e.playerPosition).addScaledVector(this.forward,4),this.desiredLook.y=e.playerPosition.y+1.2;return e.shake&&this.desiredPosition.add(e.shake),this.constrainToArena(this.desiredPosition,e.bounds),this.desiredPosition.y=Math.max(this.desiredPosition.y,e.groundHeight(this.desiredPosition.x,this.desiredPosition.z)+Of),this.initialized||this.snapToChase(e.playerPosition,e.playerHeading,e.groundHeight),this.camera.position.lerp(this.desiredPosition,this.response(6.5,t)),this.smoothedLook.lerp(this.desiredLook,this.response(8.5,t)),this.camera.up.set(0,1,0),this.camera.lookAt(this.smoothedLook),{mode:this.mode,fellBackToChase:n,targetDistance:s}}get lookAt(){return this.smoothedLook}response(e,t){return 1-Math.exp(-e*t)}constrainToArena(e,t){if(t.kind==="ring"){const c=Math.max(1,t.radius-kf),l=Math.hypot(e.x,e.z);l>c&&(e.x*=c/l,e.z*=c/l);return}const n=Ee.clamp(e.z,-t.straightHalfLength,t.straightHalfLength),s=e.x,r=e.z-n,a=Math.hypot(s,r),o=Math.max(1,t.outerRadius-kf);a<=o||(e.x=s*o/a,e.z=n+r*o/a)}}const xl=()=>({damageMultiplier:1,fireRateMultiplier:1,projectileSpeedMultiplier:1,rangeMultiplier:1,projectileCount:1,spread:0,ricochets:0,pierces:0,burnDps:0,burnDuration:0,heavyRounds:!1});function Rh(i,e=1){return{version:1,round:e,ownedTurrets:[i],activeTurret:i,turretStats:{mg:xl(),rocket:xl(),sniper:xl()},vehicleStats:{maxHealthMultiplier:1,accelerationMultiplier:1,maxSpeedMultiplier:1,handlingMultiplier:1,tractionMultiplier:1,boostMultiplier:1,armorBonus:0,ramMultiplier:1,stabilityMultiplier:1},upgrades:[],repairAfterRound:0,roundShield:0,swapCooldown:.16,tireVisual:"stock"}}const bi=i=>i.turretStats[i.activeTurret],Ti=i=>({...i,category:"weapon",scope:"Current turret"}),gs=i=>({...i,category:"vehicle",scope:"Vehicle"}),yl=i=>({...i,category:"utility",scope:"Whole rig"}),qo=[Ti({id:"double-tap",name:"Double Tap",rarity:"common",description:"A twitchy trigger job for the turret you have mounted.",stats:["+35% fire rate","-10% damage"],quote:"Twice the noise. Almost twice the trouble.",apply:i=>{const e=bi(i);e.fireRateMultiplier*=1.35,e.damageMultiplier*=.9}}),Ti({id:"heavy-rounds",name:"Heavy Rounds",rarity:"rare",description:"Turns the active turret into a slow, brutal wrecking tool.",stats:["+100% damage","-50% fire rate","Larger shot VFX"],quote:"Slow. Loud. Final.",apply:i=>{const e=bi(i);e.damageMultiplier*=2,e.fireRateMultiplier*=.5,e.heavyRounds=!0}}),Ti({id:"multishot",name:"Multishot",rarity:"epic",description:"The active turret throws a fan of scrap downrange.",stats:["+2 projectiles","-35% damage","+12° spread"],quote:"Accuracy is a problem for the other car.",apply:i=>{const e=bi(i);e.projectileCount+=2,e.damageMultiplier*=.65,e.spread+=Math.PI/15}}),Ti({id:"ricochet-rounds",name:"Ricochet Rounds",rarity:"rare",description:"Shots from the active turret rebound from the arena once.",stats:["+1 ricochet","-15% projectile speed"],quote:"Miss once. Hit later.",apply:i=>{const e=bi(i);e.ricochets+=1,e.projectileSpeedMultiplier*=.85}}),Ti({id:"incendiary-rounds",name:"Incendiary Rounds",rarity:"epic",description:"Orange-hot shots ignite the rival and leave ember impacts.",stats:["12 burn damage / sec","3 sec burn","-20% impact damage"],quote:"Make the whole arena smell like bad decisions.",apply:i=>{const e=bi(i);e.burnDps+=12,e.burnDuration=Math.max(e.burnDuration,3),e.damageMultiplier*=.8}}),Ti({id:"piercing-rounds",name:"Piercing Rounds",rarity:"rare",description:"The active turret punches through one target before stopping.",stats:["Pierces 1 target","-20% damage","Brighter tracer"],quote:"Armor is just scenery.",apply:i=>{const e=bi(i);e.pierces+=1,e.damageMultiplier*=.8}}),Ti({id:"overclocked-trigger",name:"Overclocked Trigger",rarity:"epic",description:"Unsafe wiring makes the active turret frantic and inaccurate.",stats:["+60% fire rate","+20° spread"],quote:"The red wire was probably optional.",apply:i=>{const e=bi(i);e.fireRateMultiplier*=1.6,e.spread+=Math.PI/9}}),Ti({id:"long-barrel",name:"Long Barrel",rarity:"common",description:"More velocity and reach, paid for with a heavier firing cycle.",stats:["+30% projectile speed","+20% range","-10% fire rate"],quote:"Reach out and ruin somebody's afternoon.",apply:i=>{const e=bi(i);e.projectileSpeedMultiplier*=1.3,e.rangeMultiplier*=1.2,e.fireRateMultiplier*=.9}}),gs({id:"racing-tires",name:"Racing Tires",rarity:"common",description:"Sleek dark rubber bites hard on fast corners.",stats:["+30% handling","+18% traction","-8% max health"],quote:"Grip now. Regret the pothole later.",apply:i=>{i.vehicleStats.handlingMultiplier*=1.3,i.vehicleStats.tractionMultiplier*=1.18,i.vehicleStats.maxHealthMultiplier*=.92,i.tireVisual="racing"}}),gs({id:"offroad-tires",name:"Offroad Tires",rarity:"common",description:"Chunky tires calm the rig on ramps and rough ground.",stats:["+32% traction","+20% stability","-5% top speed"],quote:"Ugly tires. Beautiful landings.",apply:i=>{i.vehicleStats.tractionMultiplier*=1.32,i.vehicleStats.stabilityMultiplier*=1.2,i.vehicleStats.maxSpeedMultiplier*=.95,i.tireVisual="offroad"}}),gs({id:"turbocharger",name:"Turbocharger",rarity:"rare",description:"Violent spool turns every straight into a launch lane.",stats:["+35% acceleration","+18% top speed","-12% handling"],quote:"Point first. Boost second.",apply:i=>{i.vehicleStats.accelerationMultiplier*=1.35,i.vehicleStats.maxSpeedMultiplier*=1.18,i.vehicleStats.handlingMultiplier*=.88}}),gs({id:"reinforced-plating",name:"Reinforced Plating",rarity:"common",description:"Riveted steel keeps the hull together at the cost of response.",stats:["+45% max health","+10% armor","-18% acceleration"],quote:"Fast is temporary. Steel is stubborn.",apply:i=>{i.vehicleStats.maxHealthMultiplier*=1.45,i.vehicleStats.armorBonus+=.1,i.vehicleStats.accelerationMultiplier*=.82}}),gs({id:"light-frame",name:"Light Frame",rarity:"rare",description:"Strip the rig down until speed is the only defense left.",stats:["+18% top speed","+25% acceleration","-30% max health"],quote:"If they hit you, the build was wrong.",apply:i=>{i.vehicleStats.maxSpeedMultiplier*=1.18,i.vehicleStats.accelerationMultiplier*=1.25,i.vehicleStats.maxHealthMultiplier*=.7}}),gs({id:"heavy-frame",name:"Heavy Frame",rarity:"rare",description:"A wide, dark wheel-and-frame package built for ramming.",stats:["+55% ramming force","+8% armor","-22% handling"],quote:"Cornering is optional when the other car moves.",apply:i=>{i.vehicleStats.ramMultiplier*=1.55,i.vehicleStats.armorBonus+=.08,i.vehicleStats.handlingMultiplier*=.78,i.tireVisual="heavy"}}),gs({id:"stabilizer-kit",name:"Stabilizer Kit",rarity:"common",description:"Bracing resists ugly rolls and keeps the tires under you.",stats:["+35% stability","+12% traction","-6% top speed"],quote:"Land dirty. Drive away clean.",apply:i=>{i.vehicleStats.stabilityMultiplier*=1.35,i.vehicleStats.tractionMultiplier*=1.12,i.vehicleStats.maxSpeedMultiplier*=.94}}),yl({id:"field-repair",name:"Field Repair",rarity:"common",description:"The pit crew patches the hull after every round.",stats:["Repair 25 hull after each round"],quote:"Nothing a hammer and optimism can't fix.",apply:i=>{i.repairAfterRound+=25}}),yl({id:"emergency-shield",name:"Emergency Shield",rarity:"rare",description:"A disposable field catches the opening burst each round.",stats:["Start rounds with 35 shield"],quote:"One free mistake. Spend it loudly.",apply:i=>{i.roundShield+=35}}),yl({id:"quick-swap",name:"Quick Swap",rarity:"common",description:"Powered bearings snap owned turrets into place faster.",stats:["-65% turret swap delay","+8% handling"],quote:"Wrong gun? Not for long.",apply:i=>{i.swapCooldown=Math.max(.035,i.swapCooldown*.35),i.vehicleStats.handlingMultiplier*=1.08}})],Yo={mg:"Scrap Rattler",rocket:"Hellbox Rockets",sniper:"Longlance Rail"};function gc(i){return{id:`add-${i}`,name:`Add ${Yo[i]}`,rarity:"epic",category:"turret",scope:"New turret slot",description:`Bolt ${Yo[i]} into the rig's owned turret loadout and equip it now.`,stats:["+1 owned turret","Mouse wheel / number-key swapping"],quote:"A new answer to an old problem.",apply:e=>{e.ownedTurrets.includes(i)||e.ownedTurrets.push(i),e.activeTurret=i}}}function Ml(i,e){const t=[...i];let n=(e||1)>>>0;for(let s=t.length-1;s>0;s--){n=n*1664525+1013904223>>>0;const r=n%(s+1);[t[s],t[r]]=[t[r],t[s]]}return t}function _c(i){const e=i.round*7919+i.upgrades.length*104729+i.ownedTurrets.length*31,t=Ml(qo.filter(r=>!i.upgrades.includes(r.id)),e),n=t.length>=3?t:Ml(qo,e);if(i.round%3!==0)return n.slice(0,3);const s=Object.keys(Yo).filter(r=>!i.ownedTurrets.includes(r));return s.length===0?[Ti({id:`mastery-${i.activeTurret}-${i.round}`,name:`${Yo[i.activeTurret]} Mastery`,rarity:"epic",description:"With every turret slot filled, refine the active weapon instead.",stats:["+45% damage","+20% projectile speed"],quote:"Three guns. One favorite.",apply:a=>{const o=bi(a);o.damageMultiplier*=1.45,o.projectileSpeedMultiplier*=1.2}}),...n.slice(0,2)]:[gc(Ml(s,e)[0]),...n.slice(0,2)]}function Ko(i,e){return e.apply(i),i.upgrades.push(e.id),i}function eb(i){if(!i||typeof i!="object")return!1;const e=i;return e.version===1&&Array.isArray(e.ownedTurrets)&&e.ownedTurrets.length>0&&typeof e.activeTurret=="string"&&!!e.turretStats&&!!e.vehicleStats&&Array.isArray(e.upgrades)}const tb={apiKey:"AIzaSyDRniZatGeylxphjHQadYjucOcirNBRIdk",authDomain:"multiplayer-640ec.firebaseapp.com",databaseURL:"https://multiplayer-640ec-default-rtdb.firebaseio.com",projectId:"multiplayer-640ec",storageBucket:"multiplayer-640ec.firebasestorage.app",messagingSenderId:"94914236381",appId:"1:94914236381:web:55ab00cc690140180cf034"},Bf="riggedRooms",zf="rigged_ai",Hf="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",nb="https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js",ib="https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js",sb="https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";function jo(i){return i.replace(/\s+/g," ").trim().slice(0,18)||"Road warrior"}function Nu(i){return i.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,5)}function rb(i=Math.random){return Array.from({length:5},()=>Hf[Math.floor(i()*Hf.length)]).join("")}function Bs(i){return i?Object.entries(i.players??{}).map(([e,t])=>({id:e,...t})).sort((e,t)=>e.joinedAt-t.joinedAt):[]}function Sl(i,e){return i?.players?.[e]?.isAI===!0}function ab(i,e,t=Date.now()){if(i.hostId!==e||i.phase!=="lobby"||Object.keys(i.players??{}).length>=2)return;const n={...i.players,[zf]:{name:"Gearhead AI",joinedAt:t,isAI:!0}};return{...i,players:n,playerOrder:[i.hostId,zf],updatedAt:t}}function ob(i){if(!i)return null;const e=i.runState?{...i.runState,upgrades:i.runState.upgrades??[]}:null;return{...i,players:i.players??{},playerOrder:i.playerOrder??[],draftOptions:i.draftOptions??[],lastPick:i.lastPick??null,vehicleSelections:i.vehicleSelections??{},roundReady:i.roundReady??{},runState:e}}function Vf(i,e,t,n=Date.now()){if(!(i.phase==="starter_draft"||i.phase==="upgrade_draft")||i.activePickerId!==e||!i.draftOptions.includes(t.optionId))return;const r=wa(i),a=i.draftTurn+1,o=a>=r.length,c=o&&i.phase==="starter_draft";return{...i,phase:c?"vehicle_select":o?"playing":i.phase,round:o&&i.phase==="upgrade_draft"?i.round+1:i.round,activePickerId:c?r[0]:o?"":r[a],draftOptions:c?t.nextOptions:o?[]:t.nextOptions,draftTurn:c?0:a,pickSequence:(i.pickSequence??0)+1,lastPick:{id:(i.pickSequence??0)+1,playerId:e,optionId:t.optionId,optionName:t.optionName,pickedAt:n},roundReady:o?{}:i.roundReady??{},runState:t.nextRunState,updatedAt:n}}function Gf(i,e,t,n,s=Date.now()){if(i.phase!=="vehicle_select"||i.activePickerId!==e||!i.draftOptions.includes(t))return;const r=wa(i),a=i.draftTurn+1,o=a>=r.length;return{...i,phase:o?"playing":"vehicle_select",activePickerId:o?"":r[a],draftTurn:a,draftOptions:o?[]:i.draftOptions,pickSequence:(i.pickSequence??0)+1,lastPick:{id:(i.pickSequence??0)+1,playerId:e,optionId:t,optionName:n,pickedAt:s},vehicleSelections:{...i.vehicleSelections??{},[e]:t},updatedAt:s}}function Wf(i,e,t,n,s=Date.now()){if(i.phase!=="playing")return;const r=wa(i),a={...i.roundReady??{},[e]:!0},o=r.length===2&&r.every(c=>a[c]);return{...i,phase:o?"upgrade_draft":i.phase,activePickerId:o?r[0]:i.activePickerId,draftOptions:o?t:i.draftOptions,draftTurn:o?0:i.draftTurn,lastPick:o?null:i.lastPick,roundReady:a,runState:n,updatedAt:s}}async function cb(){const[i,e,t]=await Promise.all([import(nb),import(ib),import(sb)]),n=i.initializeApp(tb);return{auth:e.getAuth(n),db:t.getDatabase(n),ref:t.ref,get:t.get,onValue:t.onValue,onDisconnect:t.onDisconnect,runTransaction:t.runTransaction,signInAnonymously:e.signInAnonymously}}class Ch{playerId;room=null;sdk;unsubscribe=null;roomListener=()=>{};constructor(e,t){this.sdk=e,this.playerId=t}static async connect(){const e=await cb(),t=await e.signInAnonymously(e.auth);return new Ch(e,t.user.uid)}onRoom(e){this.roomListener=e,e(this.room)}isHost(){return this.room?.hostId===this.playerId}isMyTurn(){return this.room?.activePickerId===this.playerId}async createRoom(e){for(let t=0;t<8;t+=1){const n=rb(),s=Date.now(),r={code:n,hostId:this.playerId,phase:"lobby",round:1,players:{[this.playerId]:{name:jo(e),joinedAt:s}},playerOrder:[this.playerId],activePickerId:"",draftOptions:[],draftTurn:0,pickSequence:0,lastPick:null,vehicleSelections:{},roundReady:{},runState:null,createdAt:s,updatedAt:s};if((await this.sdk.runTransaction(this.roomRef(n),o=>o?void 0:r)).committed)return await this.watchRoom(n),n}throw new Error("Could not reserve a room code. Try again.")}async joinRoom(e,t){const n=Nu(e);if(n.length!==5)throw new Error("Enter the five-character room code.");const s=Date.now();if(!(await this.sdk.runTransaction(this.roomRef(n),a=>{if(!a||a.phase!=="lobby")return;const o=Object.keys(a.players??{});if(!a.players?.[this.playerId]&&o.length>=2)return;const c={...a.players??{},[this.playerId]:{name:jo(t),joinedAt:a.players?.[this.playerId]?.joinedAt??s}},l=[...(a.playerOrder??[]).filter(u=>c[u])];return l.includes(this.playerId)||l.push(this.playerId),{...a,players:c,playerOrder:l,updatedAt:s}})).committed)throw(await this.sdk.get(this.roomRef(n))).exists()?new Error("That room is already running or full."):new Error("That room does not exist.");return await this.watchRoom(n),n}async startRun(){if(!await this.transact(t=>{const n=wa(t);if(!(t.hostId!==this.playerId||t.phase!=="lobby"||n.length!==2))return{...t,phase:"starter_draft",playerOrder:n,activePickerId:n[0],draftOptions:["mg","rocket","sniper"],draftTurn:0,pickSequence:0,lastPick:null,vehicleSelections:{},runState:null,updatedAt:Date.now()}}))throw new Error("The host can launch once two players are in the room.")}async addAI(){if(!await this.transact(t=>ab(t,this.playerId)))throw new Error("Only the host can add AI to an open seat.")}async submitPick(e){if(!await this.transact(n=>Vf(n,this.playerId,e)))throw new Error("That pick is no longer available.")}async submitAiPick(e){if(!await this.transact(n=>n.hostId===this.playerId&&Sl(n,n.activePickerId)?Vf(n,n.activePickerId,e):void 0))throw new Error("The AI pick is no longer available.")}async submitVehiclePick(e,t){if(!await this.transact(s=>Gf(s,this.playerId,e,t)))throw new Error("That vehicle pick is no longer available.")}async submitAiVehiclePick(e,t){if(!await this.transact(s=>s.hostId===this.playerId&&Sl(s,s.activePickerId)?Gf(s,s.activePickerId,e,t):void 0))throw new Error("The AI vehicle pick is no longer available.")}async markRoundComplete(e,t){if(!await this.transact(s=>{const r=Wf(s,this.playerId,e,t);if(!r||s.hostId!==this.playerId)return r;const a=wa(r).find(o=>Sl(r,o));return a?Wf(r,a,e,t)??r:r}))throw new Error("The room is not accepting round results.")}roomRef(e=this.room?.code??""){return this.sdk.ref(this.sdk.db,`${Bf}/${e}`)}async transact(e){return this.room?.code?(await this.sdk.runTransaction(this.roomRef(),n=>n?e(n):void 0)).committed:!1}async watchRoom(e){this.unsubscribe?.();const t=this.sdk.ref(this.sdk.db,`${Bf}/${e}/players/${this.playerId}`);await this.sdk.onDisconnect(t).remove(),this.unsubscribe=this.sdk.onValue(this.roomRef(e),n=>{this.room=ob(n.val()??null),this.roomListener(this.room)})}}function wa(i){const e=new Set(Object.keys(i.players??{})),t=[...(i.playerOrder??[]).filter(n=>e.has(n))];for(const n of Bs(i))t.includes(n.id)||t.push(n.id);return t.slice(0,2)}const P=Le("game"),V={health:Le("health-value"),healthBar:Le("health-bar"),boost:Le("boost-value"),boostBar:Le("boost-bar"),playerHealthTag:Le("player-health-tag"),rivalHealthTag:Le("rival-health-tag"),boostMeter:document.querySelector(".status-meter--boost"),weapon:Le("weapon-part"),weaponState:Le("weapon-state"),message:Le("message"),controls:Le("controls"),pause:Le("pause"),debug:Le("physics-debug"),multiplayerLobby:Le("multiplayer-lobby"),round:Le("round-value"),playerRounds:Le("player-rounds"),enemyRounds:Le("enemy-rounds"),countdown:Le("round-countdown"),countdownValue:Le("round-countdown-value"),countdownArena:Le("round-countdown-arena"),rivalHealth:Le("rival-health-value"),rivalHealthBar:Le("rival-health-bar"),cameraMode:Le("camera-mode-value"),starterSelect:Le("starter-select"),starterGrid:Le("starter-grid"),cardDraft:Le("card-draft"),cardGrid:Le("card-grid"),vehicleSelect:Le("vehicle-select"),vehicleGrid:Le("vehicle-grid"),vehicleTurn:Le("vehicle-turn"),vehiclePickReveal:Le("vehicle-pick-reveal"),draftEyebrow:Le("draft-eyebrow"),draftTitle:Le("card-draft-title"),draftSubtitle:Le("draft-subtitle"),starterTurn:Le("starter-turn"),starterPickReveal:Le("starter-pick-reveal"),draftPickReveal:Le("draft-pick-reveal"),roomEntry:Le("room-entry"),roomWaiting:Le("room-waiting"),playerName:Le("player-name"),roomCodeInput:Le("room-code-input"),roomCodeDisplay:Le("room-code-display"),roomPlayers:Le("room-players"),roomStatus:Le("room-status"),hostRoom:Le("host-room"),joinRoomForm:Le("join-room-form"),addAI:Le("add-ai"),startRun:Le("start-run"),musicMuted:Le("music-muted"),activeUpgrades:Le("active-upgrades"),weaponSelect:Le("weapon-select")},Or=new URLSearchParams(location.search),$o="rigged-roguelike-run-v1";function lb(){try{const i=JSON.parse(sessionStorage.getItem($o)??"null");return eb(i)?i:null}catch{return null}}function Da(){ze&&sessionStorage.setItem($o,JSON.stringify(ze))}let ze=lb();const Ph=(i,e)=>Ee.clamp(Number.parseInt(Or.get(i)??"0",10)||0,0,e);let Qi=Ph("pw",3),As=Ph("ew",3),Ft=Math.max(1,Ph("round",99)||1),Zo=!1;ze&&(ze.round=Ft);let ht="loading";const ub=3.55,hb=.55;let lm=0,Uu=3,Xf=0,ft=null,Ve=null,qf=0,Lh=!1,Jo=0,wl=!1,Io=0,ba=rm.vehicle.defaultId;function Na(){V.round.textContent=String(Ft).padStart(2,"0"),V.playerRounds.querySelectorAll("i").forEach((i,e)=>i.classList.toggle("won",e<Qi)),V.enemyRounds.querySelectorAll("i").forEach((i,e)=>i.classList.toggle("won",e<As)),P.dataset.currentRound=String(Ft),P.dataset.playerRoundWins=String(Qi),P.dataset.enemyRoundWins=String(As)}function db(){lg("player")}function fb(){lg("opponent")}const um=1.25,yn=new ew({canvas:P,antialias:!0,powerPreference:"high-performance"});yn.setPixelRatio(Math.min(devicePixelRatio,um));yn.setSize(innerWidth,innerHeight,!1);yn.shadowMap.enabled=!0;yn.shadowMap.type=Ju;yn.outputColorSpace=At;yn.toneMapping=pp;yn.toneMappingExposure=1.08;const be=new Z0;be.background=new xe(8227218);be.fog=new hh(7567998,.0068);const hm=new yh,vc=hm.load("./assets/cloudy-sky.png");vc.mapping=zo;vc.colorSpace=At;be.background=vc;be.backgroundIntensity=.72;be.environment=vc;be.environmentIntensity=.58;function Ih(i,e=1,t=e){const n=hm.load(i);return n.wrapS=n.wrapT=ns,n.repeat.set(e,t),n.colorSpace=At,n.anisotropy=Math.min(8,yn.capabilities.getMaxAnisotropy()),n}const Yi=Ih("./assets/materials/dirty-arena-ground-v1.png"),Qo=Ih("./assets/materials/weathered-arena-metal-v1.png"),Ds=Ih("./assets/materials/gritty-turret-metal-v1.png",2.4,2.4);function bl(i,e=7.5){const t=i.getAttribute("position"),n=new Float32Array(t.count*2);for(let s=0;s<t.count;s++)n[s*2]=t.getX(s)/e,n[s*2+1]=t.getZ(s)/e;i.setAttribute("uv",new qt(n,2))}const pb=new tw,Yf=new Map,Kf=new Map;function mb(i){const e=Yf.get(i);if(e)return e;const t=new Promise((n,s)=>{pb.load(i,({scene:r})=>{r.updateMatrixWorld(!0);const a=new Cn().setFromObject(r),o=a.getCenter(new E);r.position.set(-o.x,-a.min.y,-o.z),r.traverse(l=>{if(!(l instanceof Z))return;l.castShadow=!1,l.receiveShadow=!0;const u=Array.isArray(l.material)?l.material:[l.material];for(const h of u)h instanceof Kt&&(h.roughness=Math.max(h.roughness,.66),h.metalness=Math.min(h.metalness,.35))});const c=new ct;c.add(r),n(c)},void 0,s)});return Yf.set(i,t),t}async function gb(i){const t=(await mb(i)).clone(!0),n=Number(P.dataset.assetsLoaded??0)+1;return P.dataset.assetsLoaded=String(n),t}function xc(i,e){P.dataset.assetErrors=String(Number(P.dataset.assetErrors??0)+1),console.error(`[Rigged] Failed to load licensed asset: ${i}`,e)}function _b(i){const e=Kf.get(i);if(e)return e;const t=Sa[i],n=new Promise((s,r)=>{new Fw().load(t.mtl,a=>{a.preload();const o=new Gw;o.setMaterials(a),o.load(t.obj,c=>{c.updateMatrixWorld(!0);const l=new Cn().setFromObject(c),u=l.getCenter(new E);c.position.set(-u.x,-l.min.y,-u.z),c.traverse(d=>{if(!(d instanceof Z))return;d.castShadow=!1,d.receiveShadow=!0;const f=Array.isArray(d.material)?d.material:[d.material];for(const m of f)m instanceof xh&&(m.shininess=Math.min(m.shininess,8),m.specular.setHex(1380877))});const h=new ct;h.name=`racekart-hilly-${i}`,h.userData.sourceSize=l.getSize(new E),h.add(c),s(h)},void 0,r)},void 0,r)});return Kf.set(i,n),n}async function Dh(i){const e=await _b(i);return P.dataset.assetsLoaded=String(Number(P.dataset.assetsLoaded??0)+1),e.clone(!0)}const pn=new dn(58,innerWidth/innerHeight,.1,520);pn.position.set(0,7,-11);const Ki=new Qw(pn),vb=new ev(12372951,3944487,1.35);be.add(vb);const Vn=new jp(16771792,3.25);Vn.position.set(-28,42,-18);Vn.castShadow=!0;Vn.shadow.mapSize.set(1024,1024);Vn.shadow.camera.left=-125;Vn.shadow.camera.right=125;Vn.shadow.camera.top=125;Vn.shadow.camera.bottom=-125;Vn.shadow.camera.near=2;Vn.shadow.camera.far=180;Vn.shadow.bias=-35e-5;Vn.shadow.normalBias=.035;be.add(Vn);const yc=new ct;yc.name="cloud-break-volumetric-light";const xb=new Ii({transparent:!0,depthWrite:!1,side:Vt,blending:vr,vertexShader:"varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:"varying vec2 vUv; void main(){float edge=pow(max(0.0,1.0-abs(vUv.x-.5)*2.0),1.8);float fade=smoothstep(0.0,.2,vUv.y)*(1.0-smoothstep(.7,1.0,vUv.y));gl_FragColor=vec4(1.0,.91,.76,edge*fade*.042);}"});for(const[i,e,t,n]of[[-48,-34,18,.08],[-12,8,13,-.05],[28,-10,17,.06],[54,34,12,-.08],[-62,48,10,.04]]){const s=new ct;s.position.set(i,37,e),s.rotation.z=n;for(const r of[0,Math.PI/3,Math.PI*2/3]){const a=new Z(new Dr(t*1.7,78),xb);a.rotation.y=r,a.renderOrder=-1,s.add(a)}yc.add(s)}be.add(yc);let xi=23063;const Do=new Float32Array(760*3);for(let i=0;i<760;i++){xi=xi*1664525+1013904223>>>0;const e=xi/4294967295;xi=xi*1664525+1013904223>>>0;const t=xi/4294967295;xi=xi*1664525+1013904223>>>0;const n=xi/4294967295;Do[i*3]=(e-.5)*236,Do[i*3+1]=.6+t*22,Do[i*3+2]=(n-.5)*236}const dm=new bt;dm.setAttribute("position",new qt(Do,3));const Nh=new ra(dm,new bs({color:14862756,size:.13,transparent:!0,opacity:.22,depthWrite:!1,blending:vr}));Nh.name="volumetric-dust-motes";be.add(Nh);const dr=new Kt({color:12081725,map:Ds,bumpMap:Ds,bumpScale:.025,roughness:.74,metalness:.48}),Kn=new Kt({color:12631733,map:Ds,bumpMap:Ds,bumpScale:.035,roughness:.48,metalness:.84}),rn=new Kt({color:7633010,map:Ds,bumpMap:Ds,bumpScale:.04,roughness:.59,metalness:.82}),Fu=new Kt({color:11449006,map:Qo,bumpMap:Qo,bumpScale:.055,roughness:.48,metalness:.74,side:Vt}),yb=new Kt({color:16777215,map:Yi,bumpMap:Yi,bumpScale:.07,roughness:.96,metalness:0,vertexColors:!0}),fm=new Kt({color:1052945,roughness:.9,metalness:.08});let J=mc[am],An=J.radius,an=!1,Tl=!1;const On=1.12,Un=.95,Mb=.72,Ht=1/60,Sb=.1,jf=5,$f=1.15,Cr=[],Ns=[],kr=[],Ni=[],Bn=[],es=[];let Wi=!1;const Br=new Z(new ks(.3,10,7),new tt({color:5439472,depthTest:!1}));Br.name="vehicle-surface-contact";Br.renderOrder=30;Br.visible=!1;be.add(Br);Bn.push(Br);const Us=new E,Ou=new Ia(new E(0,1,0),Us,3.2,7536488,.55,.28),ku=new Ia(new E(0,1,0),Us,3.8,5505009,.6,.3),Bu=new Ia(new E(0,0,1),Us,4.5,16768099,.65,.32),No=new Ia(new E(0,0,1),Us,3,16749375,.6,.3),Uo=new Ia(new E(1,0,0),Us,3.5,16731726,.6,.3),ei=new E(0,1,0);for(const i of[Ou,ku,Bu,No,Uo])i.visible=!1,i.renderOrder=31,be.add(i),Bn.push(i);const ta=new Set,pm=new Set;function wt(i,e){return J.arenaKind==="capsule"&&J.bowl?Gt(J.bowl,i,e).height:Math.sin(i*.055)*Math.cos(e*.05)*.035}function wb(i,e){if(J.arenaKind!=="capsule"||!J.bowl)return null;const t=Gt(J.bowl,i,e);return t.progress<=.001?null:{ramp:{kind:"wall",label:`${t.band} capsule collider band`,rotation:Math.atan2(t.outwardX,t.outwardZ),length:J.bowl.outerRadius-J.bowl.flatRadius,rise:J.bowl.wallRise},height:t.height,localZ:t.progress}}function mm(i,e){const t=e.contact??{kind:e.kind,label:e.label,rotation:e.rotation,length:e.length,rise:0},n=Xw(i,{label:e.label,centerX:e.x,centerZ:e.z,rotation:e.rotation,width:e.width,length:e.length,metadata:t});let s=Number.POSITIVE_INFINITY,r=Number.NEGATIVE_INFINITY,a=0;for(let c=0;c<n.heights.length;c++)n.valid[c]&&(s=Math.min(s,n.heights[c]),r=Math.max(r,n.heights[c]),a++);t.rise=a?r-s:0,es.push(n),Ni.push(i);const o=Yw(n,e.kind==="bridge"?5505009:e.kind==="ramp"?16760405:7536488);return be.add(o),Bn.push(o),n}async function Ta(i){try{const e=await Dh(i.asset),t=i.scale??10,n=e.userData.sourceSize,s=Sa[i.asset],r=s.category==="track"&&n?-n.y*t+.08:0;e.name=`racekart-hilly-${i.asset}${i.label?`-${i.label}`:""}`,e.scale.setScalar(t),e.position.set(i.x,wt(i.x,i.z)+(i.y??r),i.z),e.rotation.y=i.rotation??0,be.add(e),(s.category==="terrain"||s.category==="track")&&n&&mm(e,{label:i.label??i.asset,x:i.x,z:i.z,rotation:i.rotation??0,width:n.x*t,length:n.z*t,kind:s.category})}catch(e){xc(Sa[i.asset].obj,e)}}function ec(i,e,t,n=!1){const s=new Z(new Di(4.2,5.2,24),new tt({color:n?11094834:14195270,side:Vt,transparent:!0,opacity:.68}));s.rotateX(-Math.PI/2),s.rotation.z=t,s.position.set(i,wt(i,e)+.11,e),s.name=n?"opponent-spawn-placeholder":"player-spawn",be.add(s)}async function gm(){if(J.arenaKind==="capsule"){await bb();return}const i=An*2+18,e=new Dr(i,i,112,112);e.rotateX(-Math.PI/2);const t=e.attributes.position;for(let m=0;m<t.count;m++)t.setY(m,wt(t.getX(m),t.getZ(m)));bl(e);const n=new Float32Array(t.count*3),s=new xe(12758417),r=new xe(15783083),a=new xe;for(let m=0;m<t.count;m++){const _=t.getX(m),g=t.getZ(m),p=Ee.clamp(.46+Math.sin(_*.19+g*.13)*.1+Math.cos(_*.07-g*.11)*.06,0,1);a.copy(s).lerp(r,p),a.toArray(n,m*3)}e.setAttribute("color",new qt(n,3)),t.needsUpdate=!0,e.computeVertexNormals();const o=new Z(e,yb);o.receiveShadow=!0,o.name="arena-ground-aim-surface",be.add(o),Ni.push(o);const c=new Kt({color:7827818,map:Yi,bumpMap:Yi,bumpScale:.035,roughness:.9,metalness:.04,side:Vt}),l=new Di(J.ringInnerRadius,J.ringOuterRadius,128);l.rotateX(-Math.PI/2),bl(l);const u=new Z(l,c);u.position.y=.055,u.receiveShadow=!0,u.name="continuous-circular-ring-track",be.add(u);const h=new br(J.ringInnerRadius-2.5,96);h.rotateX(-Math.PI/2),bl(h);const d=new Z(h,new Kt({color:13677453,map:Yi,bumpMap:Yi,bumpScale:.07,roughness:.97,metalness:0,side:Vt}));d.position.y=.04,d.receiveShadow=!0,d.name="central-combat-bowl",be.add(d);for(const[m,_,g]of[[J.ringInnerRadius,12151346,.65],[J.ringOuterRadius,9343886,.85]]){const p=new Z(new Di(m-g,m+g,128),new tt({color:_,side:Vt}));p.rotateX(-Math.PI/2),p.position.y=.075,p.name=m===J.ringInnerRadius?"rust-inner-track-edge":"concrete-outer-track-edge",be.add(p)}const f=(J.ringInnerRadius+J.ringOuterRadius)*.5;for(let m=0;m<32;m++){const _=m/32*Math.PI*2,g=new Z(new it(.32,.035,4.8),new tt({color:13150836}));g.position.set(Math.sin(_)*f,.095,Math.cos(_)*f),g.rotation.y=_,g.name="ring-lane-marker",be.add(g)}await Promise.all([...J.terrain.map(Ta),...J.track.map(Ta),...J.surfaces.map(_m)]);for(const m of J.barriers)zu(m.x,m.z,m.rotation,m.length,m.boundary);for(let m=0;m<36;m++){const _=m/36*Math.PI*2;zu(Math.sin(_)*(An-2),Math.cos(_)*(An-2),_,Math.PI*(An-2)/18+.6,!0)}ec(J.spawn.x,J.spawn.z,J.spawn.heading),ec(J.opponentSpawn.x,J.opponentSpawn.z,J.opponentSpawn.heading,!0)}async function bb(){if(!J.bowl)throw new Error("Capsule Circuit layout is missing its surface configuration");const i=J.bowl,e=new Kt({color:16777215,map:Yi,bumpMap:Yi,bumpScale:.07,vertexColors:!0,roughness:.96,metalness:0,side:Vt}),t=new Z($w(i),e);t.name="capsule-flat-floor-collider",t.receiveShadow=!0,be.add(t),Ni.push(t);const n=new Kt({color:13751247,map:Qo,bumpMap:Qo,bumpScale:.05,vertexColors:!0,roughness:.52,metalness:.64,side:Vt}),s=new Z(Zw(i),n);s.name="capsule-continuous-layered-wall-ride-surface",s.receiveShadow=!0,be.add(s),Ni.push(s);const r=new Z(Jw(i),Fu);r.name="capsule-solid-upper-guard-collider",r.castShadow=!1,r.receiveShadow=!0,be.add(r);const a=new Z(t.geometry,new tt({color:7536488,wireframe:!0,transparent:!0,opacity:.34,depthTest:!1}));a.name="capsule-flat-floor-collider-debug",a.visible=!1,a.renderOrder=21,be.add(a),Bn.push(a);const o=new Z(s.geometry,new tt({color:5636066,wireframe:!0,transparent:!0,opacity:.56,depthTest:!1}));o.name="capsule-transition-and-bank-collider-debug",o.visible=!1,o.renderOrder=22,be.add(o),Bn.push(o);const c=new Z(r.geometry,new tt({color:16738882,wireframe:!0,transparent:!0,opacity:.72,depthTest:!1}));c.name="capsule-upper-guard-collider-debug",c.visible=!1,c.renderOrder=23,be.add(c),Bn.push(c);const l=new Z(new Di(7.2,7.7,48),new tt({color:10770997,side:Vt,transparent:!0,opacity:.8}));l.rotateX(-Math.PI/2),l.position.y=.08,l.name="capsule-center-mark",be.add(l);for(let u=-5;u<=5;u++){if(u===0)continue;const h=new Z(new it(.28,.035,4.6),new tt({color:12163689}));h.position.set(0,.09,u*7.3),h.name="capsule-centerline-marker",be.add(h)}await Promise.all([...J.terrain.map(Ta),...J.track.map(Ta),...J.surfaces.map(_m)]);for(const u of J.barriers)zu(u.x,u.z,u.rotation,u.length,u.boundary);ec(J.spawn.x,J.spawn.z,J.spawn.heading),ec(J.opponentSpawn.x,J.opponentSpawn.z,J.opponentSpawn.heading,!0),P.dataset.capsuleCollision="three-disc-analytic-bands",P.dataset.bowlShape="capsule",P.dataset.bankedWallColliders="3",P.dataset.transitionCollider="continuous",P.dataset.upperGuardCollider="continuous",P.dataset.wallRideSurface="continuous"}async function _m(i){const{x:e,z:t,rotation:n=0,width:s,length:r}=i,a=e-Math.sin(n)*r*.5,o=t-Math.cos(n)*r*.5,c=e+Math.sin(n)*r*.5,l=t+Math.cos(n)*r*.5,u=wt(a,o)+i.startHeight,h=wt(c,l)+i.endHeight,d=h-u,f=Math.atan2(d,r),m=new ct,_=new tt({color:i.kind==="bridge"?5625797:16753995,wireframe:!0,transparent:!0,opacity:0}),g=new Z(new it(s,.32,r),_);g.rotation.x=-f,g.position.y=(u+h)*.5,g.name=`${i.kind}-collider-surface`,g.castShadow=!1,g.receiveShadow=!0,m.add(g),m.position.set(e,0,t),m.rotation.y=n,be.add(m);const p={group:m,deck:g,position:new E(e,u,t),rotation:n,width:s,length:r,baseHeight:u,rise:d,kind:i.kind,label:i.label??i.asset};if(Cr.push(p),Ni.push(g),i.kind==="bridge")for(const y of[-s*.47,s*.47]){const S=e+Math.cos(n)*y,v=t-Math.sin(n)*y;kr.push({position:new E(S,0,v),halfWidth:r*.5,halfLength:.35,rotation:n+Math.PI/2,label:"bridge rail"})}try{const y=await Dh(i.asset),S=y.userData.sourceSize??new E(2,1,1),v=Math.max(.7,i.kind==="bridge"?Math.max(i.startHeight,i.endHeight):Math.abs(i.endHeight-i.startHeight));y.name=`racekart-hilly-driveable-${i.label??i.asset}`,y.scale.set(r/S.x,v/S.y,s/S.z),y.position.y=Math.min(wt(a,o),wt(c,l)),y.rotation.y=i.assetYaw??0,m.add(y),m.updateWorldMatrix(!0,!0),mm(y,{label:p.label,x:e,z:t,rotation:n,width:s*(i.kind==="bridge"?.72:.94),length:r*.995,kind:i.kind,contact:p})}catch(y){xc(Sa[i.asset].obj,y)}}function zu(i,e,t,n,s=!1){const r=Fu.clone();r.color.setHex(s?9080715:9401959);const a=new Z(new it(n,1.35,.8),r);a.position.set(i,wt(i,e)+.68,e),a.rotation.y=t,a.castShadow=!1,a.receiveShadow=!0,a.material.transparent=!0,a.material.opacity=.12,a.material.depthWrite=!1,be.add(a),Dh("fence").then(c=>{const l=c.userData.sourceSize??new E(1,.4,.05);c.name=s?"racekart-hilly-arena-fence":"racekart-hilly-scrap-fence",c.scale.set(n/l.x,(s?2.6:1.8)/l.y,.8/l.z),c.position.set(i,wt(i,e),e),c.rotation.y=t,c.traverse(u=>{u instanceof Z&&(u.castShadow=!1,u.receiveShadow=!0,u.material=Fu)}),be.add(c)}).catch(c=>xc(Sa.fence.obj,c)),kr.push({position:new E(i,0,e),halfWidth:n*.5,halfLength:.4,rotation:t,label:s?"arena wall":"scrap barrier"});const o=new _v(a,16757575);o.visible=!1,be.add(o),Bn.push(o)}async function vm(){const i=J.props.map(e=>{const t=e.scale??10;return(e.asset==="rockWide"||e.asset==="rockTall")&&Ns.push({position:new E(e.x,0,e.z),radius:t*.48,top:wt(e.x,e.z)+t,label:"racekart rock"}),e.asset==="hayBale"&&Ns.push({position:new E(e.x,0,e.z),radius:t*.3,top:wt(e.x,e.z)+t*.55,label:"hay obstacle"}),Ta(e)});await Promise.all(i)}function Tb(i,e){for(const t of Cr){const n=i-t.position.x,s=e-t.position.z,r=n*Math.cos(t.rotation)-s*Math.sin(t.rotation),a=n*Math.sin(t.rotation)+s*Math.cos(t.rotation),o=-t.length*.5;if(Math.abs(r)<=t.width*.5&&a>=o-$f&&a<=t.length*.5){const c=Ee.clamp((a-o)/t.length,0,1),l=t.baseHeight+c*t.rise+.25;if(a<o){const u=Ee.smoothstep(a,o-$f,o);return{ramp:t,height:Ee.lerp(wt(i,e),l,u),localZ:a}}return{ramp:t,height:l,localZ:a}}}return null}function tc(i,e){const t=wt(i,e);let n=null;for(const s of es){const r=qw(s,i,e);r===null||r<t-.12||(!n||r>n.height)&&(n={ramp:s.metadata,height:r,localZ:0})}return n??Tb(i,e)??wb(i,e)}function Ci(i,e){return tc(i,e)?.height??wt(i,e)}function xm(){let i=0,e=0;for(const t of es){let n=0,s=0;const r=Math.cos(t.rotation),a=Math.sin(t.rotation);for(let o=0;o<t.rows;o++){const c=-t.length*.5+o/(t.rows-1)*t.length;for(let l=0;l<t.columns;l++){const u=o*t.columns+l;if(!t.valid[u])continue;n++;const h=-t.width*.5+l/(t.columns-1)*t.width,d=t.center.x+h*r+c*a,f=t.center.y-h*a+c*r;s=Math.max(s,t.heights[u]-wt(d,f))}}n>0&&i++,s>.35&&e++}P.dataset.heightfieldCoverage=i===es.length?"passed":"failed",P.dataset.heightfieldCoverageCount=`${i}/${es.length}`,P.dataset.raisedSurfaceColliders=String(e)}function Eb(i,e){const t=x.position.x+Math.sin(x.heading)*e,n=x.position.z+Math.cos(x.heading)*e,s=t-i.position.x,r=n-i.position.z,a=Math.cos(i.rotation),o=Math.sin(i.rotation),c=s*a-r*o,l=s*o+r*a,u=Ee.clamp(c,-i.halfWidth,i.halfWidth),h=Ee.clamp(l,-i.halfLength,i.halfLength);let d=c-u,f=l-h;const m=Math.hypot(d,f);if(m>=On)return!1;let _;if(m<.001){const y=i.halfWidth+On-Math.abs(c),S=i.halfLength+On-Math.abs(l);y<S?(d=Math.sign(c||1),f=0,_=y+.02):(d=0,f=Math.sign(l||1),_=S+.02)}else d/=m,f/=m,_=On-m+.02;const g=d*a+f*o,p=-d*o+f*a;return x.position.x+=g*_,x.position.z+=p*_,!0}function Ab(i,e){const t=x.position.x+Math.sin(x.heading)*e,n=x.position.z+Math.cos(x.heading)*e,s=t-i.position.x,r=n-i.position.z,a=Math.hypot(s,r),o=i.radius+On;if(a>=o)return!1;const c=a>.001?s/a:Math.sin(x.heading),l=a>.001?r/a:Math.cos(x.heading),u=o-a+.02;return x.position.x+=c*u,x.position.z+=l*u,!0}function ym(){const i=new tt({color:16747834,wireframe:!0,transparent:!0,opacity:.65});for(const e of Ns){const t=wt(e.position.x,e.position.z),n=Math.max(.12,e.top-t),s=new Z(new Ut(e.radius,e.radius,n,18),i);s.position.set(e.position.x,t+n*.5,e.position.z),s.visible=!1,be.add(s),Bn.push(s)}}function Mm(){if(J.arenaKind==="capsule"&&J.bowl){const n=J.bowl,s=[[0,0],[-20,-24],[20,-24],[-20,24],[20,24],[0,-38],[0,38]],r=s.every(([c,l])=>Gt(n,c,l).progress===0),o=[[n.flatRadius+7,0],[-(n.flatRadius+7),0],[0,n.straightHalfLength+n.flatRadius+7],[0,-(n.straightHalfLength+n.flatRadius+7)]].every(([c,l])=>{const u=Gt(n,c,l);return u.progress>.25&&u.progress<.75&&u.height>2});P.dataset.ringSampleCount=String(s.length),P.dataset.ringClearSamples=String(s.length),P.dataset.ringTrackDrivable=o?"passed":"failed",P.dataset.centralCombatArea=r?"passed":"failed",P.dataset.targetArea=J.targets.length>=3&&J.targets.length<=5?"passed":"failed",P.dataset.futureSpawnSides=J.spawn.z*J.opponentSpawn.z<0?"passed":"failed",P.dataset.ovalBoundary="enclosed",P.dataset.wallSeam=Gt(n,n.flatRadius+.05,0).height<.01?"smooth":"failed";return}const i=(J.ringInnerRadius+J.ringOuterRadius)*.5,e=72;let t=0;for(let n=0;n<e;n++){const s=n/e*Math.PI*2,r=Math.sin(s)*i,a=Math.cos(s)*i,o=Ns.some(l=>Math.hypot(r-l.position.x,a-l.position.z)<l.radius+2.2),c=kr.some(l=>{if(l.label==="arena wall")return!1;const u=r-l.position.x,h=a-l.position.z,d=Math.cos(l.rotation),f=Math.sin(l.rotation),m=u*d-h*f,_=u*f+h*d;return Math.abs(m)<l.halfWidth+2.2&&Math.abs(_)<l.halfLength+2.2});!o&&!c&&Math.abs(wt(r,a))<.1&&t++}P.dataset.ringSampleCount=String(e),P.dataset.ringClearSamples=String(t),P.dataset.ringTrackDrivable=t===e?"passed":"failed",P.dataset.centralCombatArea=J.ringInnerRadius>=50?"passed":"failed",P.dataset.targetArea=J.targets.length>=3?"passed":"failed",P.dataset.futureSpawnSides=J.spawn.z*J.opponentSpawn.z<0?"passed":"failed"}const Yt=new ct,It=new ct,fr=[],nc=[],pr=new ct,is={mg:{kind:"mg",label:"SCRAP RATTLER",stateLabel:"READY",fireRate:6.7,damage:15,projectileSpeed:58,range:136,automatic:!0,impactColor:16758088},rocket:{kind:"rocket",label:"HELLBOX ROCKETS",stateLabel:"ARMED",fireRate:.78,damage:82,projectileSpeed:34,range:112,automatic:!1,impactColor:16735008,splashRadius:5.4},sniper:{kind:"sniper",label:"LONGLANCE RAIL",stateLabel:"CHARGED",fireRate:.58,damage:110,projectileSpeed:320,range:188,automatic:!1,impactColor:6809599}},Sm=new Map;let Et=ze?.activeTurret??"mg",Hu=new ct,wm=new yt,na,Zf=-1/0,bm=null,Jf=null,El=0,Vu=null,Gu=null;function Al(i,e=.4){for(const t of[-1,1]){const n=new Z(new Ut(.09,.13,.68,8),Kn);n.position.set(t*e,.12,.02),n.rotation.z=t*.42,n.castShadow=!0,i.add(n)}}function Rb(i){const e=new ct;e.name=`turret-${i}`;const t=new ct;let n=new yt;if(i==="mg"){const s=new Z(new Ir(.48,0),rn);s.scale.set(1,.7,1.28),s.position.set(0,.28,.1),s.castShadow=!0,e.add(s);const r=new Z(new it(.82,.42,.5),Kn);r.position.set(0,.18,-.52),r.rotation.x=.08,r.castShadow=!0,e.add(r),Al(e);const a=new Z(new it(1.24,.72,.12),dr);a.position.set(0,.24,.43),a.rotation.x=-.12,a.castShadow=!0,e.add(a),t.position.set(0,.34,.35),e.add(t);const o=new Z(new Ut(.17,.2,.72,10),rn);o.rotation.x=Math.PI/2,o.position.z=.34,o.castShadow=!0,t.add(o);const c=new Z(new Ut(.075,.095,1.82,10),Kn);c.rotation.x=Math.PI/2,c.position.z=1.53,c.castShadow=!0,t.add(c);const l=new Z(new Ut(.15,.15,.34,10),rn);l.rotation.x=Math.PI/2,l.position.z=2.45,l.castShadow=!0,t.add(l);const u=new Z(new Di(.055,.13,10),new tt({color:16747317}));u.position.z=2.63,t.add(u),n.position.z=2.66,t.add(n)}else if(i==="rocket"){const s=new Z(new it(1.34,.58,1.18),rn);s.position.set(0,.28,-.05),s.rotation.x=-.05,s.castShadow=!0,e.add(s);const r=new Z(new it(1.58,.72,.12),dr);r.position.set(0,.28,.54),r.rotation.x=-.13,r.castShadow=!0,e.add(r),Al(e,.5),t.position.set(0,.48,.18),e.add(t);const a=new Z(new it(1.28,.9,1.72),rn);a.position.z=.62,a.castShadow=!0,t.add(a);for(const c of[-.34,.34])for(const l of[-.23,.23]){const u=new Z(new Ut(.19,.23,1.92,10),rn);u.rotation.x=Math.PI/2,u.position.set(c,l,.72),u.castShadow=!0,t.add(u);const h=new Z(new hc(.205,.045,7,12),dr);h.position.set(c,l,1.69),t.add(h);const d=new Z(new br(.14,10),new tt({color:16738852}));d.position.set(c,l,1.7),t.add(d)}const o=new Z(new it(.86,.08,.04),new tt({color:16758077}));o.position.set(0,.48,1.5),t.add(o),n.position.z=1.86,t.add(n)}else{const s=new Z(new it(1.12,.52,1.48),rn);s.position.set(0,.29,.15),s.castShadow=!0,e.add(s);const r=new Z(new it(.82,.46,.72),Kn);r.position.set(0,.25,-.75),r.castShadow=!0,e.add(r),Al(e,.43),t.position.set(0,.43,.36),e.add(t);for(const u of[-.25,.25]){const h=new Z(new it(.12,.12,3.18),Kn);h.position.set(u,0,1.52),h.castShadow=!0,t.add(h)}const a=new Z(new Ut(.085,.12,3.5,10),rn);a.rotation.x=Math.PI/2,a.position.z=1.72,a.castShadow=!0,t.add(a);const o=new Z(new it(.68,.34,.48),rn);o.position.z=3.45,o.castShadow=!0,t.add(o);for(const u of[-.27,.27]){const h=new Z(new it(.13,.13,.62),new tt({color:5824504}));h.position.set(u,0,3.47),t.add(h)}const c=new Z(new it(.32,.26,.7),Kn);c.position.set(0,.39,.45),t.add(c);const l=new Z(new br(.12,12),new tt({color:9171967}));l.position.set(0,.39,.81),t.add(l),n.position.z=3.76,t.add(n)}return e.visible=i===Et,{root:e,barrelPivot:t,muzzle:n}}function ss(i,e=!0){if(ze&&!ze.ownedTurrets.includes(i)){e&&Qt("TURRET SLOT LOCKED // EARN IT AFTER ROUND 3");return}const t=performance.now()/1e3;if(e&&ze&&t-Zf<ze.swapCooldown)return;Zf=t,Et=i,ze&&(ze.activeTurret=i,Da());const n=is[i];Cm(),Ea=0,on(!1);for(const[s,r]of Sm)r.root.visible=s===i,s===i&&(Hu=r.barrelPivot,wm=r.muzzle);V.weapon.textContent=n.label,V.weaponState.textContent=n.stateLabel,Gh(),P.dataset.selectedTurret=i,P.dataset.weaponVfx=i==="rocket"?"large-world-detonation":i==="sniper"?"tight-cyan-laser-tracer":"scrap-sparks",e&&an&&Qt(`${n.label} // ACTIVE TURRET`)}function Tm(i){return!!(i&&i in ci)}function Em(i){const e=ci[i].turretHeight;Vu&&(Vu.position.y=e-.16),Gu&&(Gu.position.y=e-.04),pr.position.y=e}async function Am(i){const e=ci[i],t=++El;P.dataset.vehicleAsset=`loading-kenney-${i}`,Em(i);try{const n=await gb(e.model);if(t!==El)return;n.name=`kenney-car-kit-${i}`,n.scale.setScalar(1.84),n.position.y=.06;const s=new xe(14200973);n.traverse(r=>{if(!(r instanceof Z))return;r.castShadow=!0;const o=(Array.isArray(r.material)?r.material:[r.material]).map(c=>{const l=c.clone();return l instanceof Kt&&(l.color.multiply(s),l.roughness=.78,l.metalness=.2,l.envMapIntensity=.55),l});r.material=Array.isArray(r.material)?o:o[0]}),Jf?.removeFromParent(),bm?.removeFromParent(),fr.length=0,nc.length=0;for(const r of rm.vehicle.wheelNodes){const a=n.getObjectByName(r);a&&(fr.push(a),r.includes("front")&&nc.push(a))}Yt.add(n),Jf=n,ba=i,P.dataset.vehicleAsset=`kenney-car-kit-${i}`,P.dataset.vehicleWheels=String(fr.length),P.dataset.selectedVehicle=i,Pm()}catch(n){if(t!==El)return;P.dataset.vehicleAsset="fallback-low-poly",xc(e.model,n)}}function Cb(){const i=new ct;i.name="vehicle-fallback";const e=new Z(new it(2.7,.65,4.55),dr);e.position.y=1.05,e.castShadow=e.receiveShadow=!0,i.add(e);const t=new Z(new Ir(1.18,0),rn);t.scale.set(1,.66,1.05),t.position.set(0,1.72,-.32),t.castShadow=!0,i.add(t);for(const r of[-1.45,1.45])for(const a of[-1.45,1.45]){const o=new ct;o.position.set(r,.72,a),i.add(o);const c=new Z(new Ut(.57,.57,.42,14),fm);c.rotation.z=Math.PI/2,c.castShadow=!0,o.add(c),fr.push(c),a>0&&nc.push(o);const l=new Z(new Ut(.22,.22,.45,10),Kn);l.rotation.z=Math.PI/2,c.add(l)}Yt.add(i),bm=i,Am(ba);const n=new Z(new Ut(.62,.76,.22,12),Kn);Vu=n,n.castShadow=!0,Yt.add(n);const s=new Z(new hc(.62,.08,8,16),rn);Gu=s,s.rotation.x=Math.PI/2,s.castShadow=!0,Yt.add(s),Yt.add(pr),Em(ba);for(const r of["mg","rocket","sniper"]){const a=Rb(r);Sm.set(r,a),pr.add(a.root)}ss(Et,!1),na=new Z(new it(On*2,Mb,(Un+On)*2),new tt({color:5046256,wireframe:!0,transparent:!0,opacity:.8})),na.position.y=.52,na.visible=!1,Yt.add(na),Yt.position.set(0,wt(0,-28),-28),be.add(Yt)}function Pb(){It.name="rival-ai-combat-car";const i=new Kt({color:6501275,map:Ds,roughness:.68,metalness:.5}),e=new Z(new it(2.75,.72,4.45),i);e.position.y=1.02,e.castShadow=!0,It.add(e);const t=new Z(new Ir(1.15,0),rn.clone());t.scale.set(1,.66,1.05),t.position.set(0,1.68,-.28),t.castShadow=!0,It.add(t);for(const l of[-1.43,1.43])for(const u of[-1.42,1.42]){const h=new Z(new Ut(.56,.56,.42,14),fm);h.rotation.z=Math.PI/2,h.position.set(l,.7,u),h.castShadow=!0,It.add(h)}const n=new Z(new Ut(.58,.72,.24,12),i);n.position.y=2.32,It.add(n);const s=new ct;s.name="rival-longlance-tracking-turret",s.position.y=2.5,It.add(s);const r=new Z(new it(1.12,.52,1.48),rn);r.position.set(0,.25,.12),r.castShadow=!0,s.add(r);for(const l of[-.25,.25]){const u=new Z(new it(.12,.12,3.18),Kn);u.position.set(l,.27,1.58),u.castShadow=!0,s.add(u)}const a=new Z(new Ut(.085,.12,3.5,10),rn);a.rotation.x=Math.PI/2,a.position.set(0,.27,1.78),a.castShadow=!0,s.add(a);const o=new Z(new it(.68,.34,.48),rn);o.position.set(0,.27,3.52),s.add(o);const c=new Z(new ks(.12,10,7),new tt({color:6809599}));c.position.set(0,.52,.68),s.add(c),It.userData.turret=s,P.dataset.aiTurret="sniper",be.add(It),Ni.push(It)}const Rm={maxHealth:150,acceleration:16.5,maxSpeed:27,handling:1.62,traction:7.4,boostPower:1.3,armor:0,ramPower:1,stability:1,weaponDamage:15,fireRate:6.7,projectileSpeed:58},st={...Rm},_n={fireRate:st.fireRate,damage:st.weaponDamage,projectileSpeed:st.projectileSpeed,range:136,automatic:!1};function Cm(){const i=is[Et],e=ze?.turretStats[Et];_n.fireRate=i.fireRate*(e?.fireRateMultiplier??1),_n.damage=i.damage*(e?.damageMultiplier??1),_n.projectileSpeed=i.projectileSpeed*(e?.projectileSpeedMultiplier??1),_n.range=i.range*(e?.rangeMultiplier??1),_n.automatic=i.automatic,P.dataset.weaponDamage=_n.damage.toFixed(2),P.dataset.weaponFireRate=_n.fireRate.toFixed(2),P.dataset.weaponProjectileCount=String(e?.projectileCount??1)}function Pm(){const i=ze?.tireVisual??"stock",e=i==="racing"?1514530:i==="offroad"?2696216:i==="heavy"?526602:1052945,t=i==="racing"?new E(.92,1,.9):i==="offroad"?new E(1.16,1.12,1.16):i==="heavy"?new E(1.13,1.28,1.13):new E(1,1,1);fr.forEach(n=>{n.scale.copy(t),n.traverse(s=>{if(!(s instanceof Z))return;const r=Array.isArray(s.material)?s.material:[s.material];for(const a of r)a instanceof Kt&&a.color.r<.35&&a.color.g<.35&&a.color.b<.35&&a.color.setHex(e)})}),P.dataset.tireVisual=i}function Fo(){Object.assign(st,Rm);const i=ze?.vehicleStats;i&&(st.maxHealth*=i.maxHealthMultiplier,st.acceleration*=i.accelerationMultiplier,st.maxSpeed*=i.maxSpeedMultiplier,st.handling*=i.handlingMultiplier,st.traction*=i.tractionMultiplier,st.boostPower=(st.boostPower??1.3)*i.boostMultiplier,st.armor=Math.min(.72,(st.armor??0)+i.armorBonus),st.ramPower=i.ramMultiplier,st.stability=i.stabilityMultiplier),Cm(),Pm(),P.dataset.vehicleUpgradeStats=`hp:${st.maxHealth.toFixed(0)},accel:${st.acceleration.toFixed(1)},speed:${st.maxSpeed.toFixed(1)},handling:${st.handling.toFixed(2)},traction:${st.traction.toFixed(2)}`}const x={position:new E(0,0,-28),heading:0,speed:0,driftAngle:0,verticalVelocity:0,pitch:0,roll:0,grounded:!0,activeRamp:null,health:150,shield:0,boost:100,collisionCooldown:0,orientation:new Hn,surfaceNormal:new E(0,1,0),projectedForward:new E(0,0,1),velocity:new E,wallContactNormal:new E,wallAssistActive:!1,downforce:0},$={position:new E,heading:Math.PI,speed:0,health:210,maxHealth:210,fireCooldown:1.4,steerBias:1,collisionCooldown:0,burnTime:0,burnDps:0,burnFxCooldown:0,maneuverTimer:0,preferredDistance:24,speedMultiplier:1,weavePhase:0,weaveRate:1.5},Fs=[];function Lm(i,e,t){const n=new ct,s=new Z(new Ut(.75,.9,.35,10),rn);s.position.y=.18,s.castShadow=!0,n.add(s);const r=new Z(new it(.3,1.8,.3),Kn);r.position.y=1.2,r.castShadow=!0,n.add(r);const a=new Z(new Ut(.62,.78,1.35,8),new Kt({color:9518119,roughness:.7,metalness:.45,emissive:0}));a.position.y=1.55,a.castShadow=!0,a.name="target-body",n.add(a);const o=new Z(new ks(.13,10,8),new tt({color:16757830}));o.position.set(0,1.72,.65),n.add(o);for(const c of[-1,1]){const l=new Z(new it(.8,.16,.16),Kn);l.position.set(c*.78,1.7,0),l.rotation.z=c*.25,n.add(l)}n.position.set(i,wt(i,e),e),n.rotation.y=t,be.add(n),Fs.push({group:n,health:55,alive:!0,hitFlash:0})}const Li=[],ri=[],Ui=[];let Im=1;const Lb=new tt({color:12683865,transparent:!0,opacity:.35,depthWrite:!1}),Dm=new it(.09,.09,.72),Ib=new ks(.3,6,4),Db=new Ir(.14,0),Nm=new Di(.48,.68,28),Uh=new _h(.55,1),Um=new ks(.18,7,5),Nb=new it(.13,3.25,.04),Ub=new it(.025,.86,.025),Fb=new Ut(.2,.2,1,8,1,!0),Ob=new Ut(.055,.055,1,8),kb=new Ut(.018,.018,1,6),Bb=new br(.15,7),Ts=new Sh(16747044,0,5,2);be.add(Ts);let Ea=0,Fm=!1,Oo=0,ko=0,mr=0,gr=0,Wu=0,si=!1,Pr=0;const ts=new URLSearchParams(location.search).get("physics-smoke")==="ramp",_r=new URLSearchParams(location.search).get("physics-smoke")==="all-surfaces",ca=new URLSearchParams(location.search).get("physics-smoke")==="wall",la=new URLSearchParams(location.search).get("input-smoke")==="hold-fire",ic=new URLSearchParams(location.search).get("input-smoke")==="boost",Fh=new URLSearchParams(location.search).get("combat-smoke")==="round-win",Oh=Or.get("ui-preview")==="vehicles",Mc=Or.get("ui-preview")==="deck",Xu=Mc&&Or.get("team")==="rival",vn=new Audio("./assets/nitro-games.wav");vn.loop=!0;vn.volume=.09;vn.preload="auto";vn.id="soundtrack";vn.hidden=!0;vn.dataset.playback="waiting-for-interaction";const Wt=new Audio("./assets/audio/sfx/vehicle-engine-loop.wav");Wt.loop=!0;Wt.volume=.001;Wt.playbackRate=.68;Wt.preservesPitch=!1;Wt.preload="auto";Wt.id="vehicle-engine-loop";Wt.hidden=!0;Wt.dataset.playback="waiting-for-interaction";document.body.append(vn,Wt);const Om="rigged-music-muted";function km(i){vn.muted=i,V.musicMuted.checked=i,localStorage.setItem(Om,i?"1":"0"),P.dataset.musicMuted=String(i)}km(localStorage.getItem(Om)==="1");V.musicMuted.addEventListener("change",()=>km(V.musicMuted.checked));const zb={"turret-mg":"./assets/audio/sfx/turret-mg-fire.wav","turret-rocket":"./assets/audio/sfx/turret-rocket-fire.ogg","turret-sniper":"./assets/audio/sfx/turret-sniper-fire.ogg","vehicle-hit":"./assets/audio/sfx/vehicle-hit-clank.ogg","confirmed-hit":"./assets/audio/sfx/confirmed-hit-clank.ogg"},Bm=new Map,Rl=new Set,zm=new Map,Hm=new Map;let ti=null,qu=null,Qf=!1;const Hb=Or.get("audio-smoke")==="fail";for(const[i,e]of Object.entries(zb)){const t=new Audio(e);t.preload="auto",t.load(),Bm.set(i,t),Hm.set(i,fetch(e).then(n=>n.arrayBuffer()))}vn.load();Wt.load();const Cl=new E,ep=new E;function Rs(i,e,t=.035,n){const s=zm.get(i);if(ti&&s){const o=ti.createBufferSource(),c=ti.createGain(),l=ti.createStereoPanner();o.buffer=s,o.playbackRate.value=1+(Math.random()*2-1)*t;const u=n??x.position;Cl.copy(u).sub(pn.position);const h=Cl.length();ep.set(1,0,0).applyQuaternion(pn.quaternion);const d=h>.001?Cl.dot(ep)/h:0,f=1/(1+Math.max(0,h-7)/28);c.gain.value=Ee.clamp(e*f,0,1),l.pan.value=Ee.clamp(d,-1,1),o.connect(c).connect(l).connect(ti.destination),o.onended=()=>{o.disconnect(),c.disconnect(),l.disconnect()},o.start(),P.dataset.lastSfx=i,P.dataset.spatialAudio="stereo-world-positioned";return}const r=Bm.get(i);if(!r)return;const a=r.cloneNode(!0);a.volume=Ee.clamp(e,0,1),a.preservesPitch=!1,a.playbackRate=1+(Math.random()*2-1)*t,Rl.add(a),a.addEventListener("ended",()=>Rl.delete(a),{once:!0}),a.play().catch(()=>Rl.delete(a)),P.dataset.lastSfx=i}function Ua(){ti||(ti=new AudioContext,qu=Promise.all([...Hm].map(([i,e])=>e.then(t=>ti.decodeAudioData(t.slice(0))).then(t=>zm.set(i,t)).catch(()=>{}))).then(()=>{P.dataset.combatAudio="decoded"})),ti.state==="suspended"&&ti.resume(),vn.paused&&(vn.dataset.playback="starting",vn.play().then(()=>{vn.dataset.playback="playing"}).catch(()=>{vn.dataset.playback="blocked"})),Wt.paused&&(Wt.dataset.playback="starting",Wt.play().then(()=>{Wt.dataset.playback="playing"}).catch(()=>{Wt.dataset.playback="blocked"})),P.dataset.musicContinuity="single-document-loop"}let Pl=0;function Vb(i){const e=Ee.clamp(Math.abs(x.speed)/Math.max(1,st.maxSpeed),0,1.25),t=rt.has("KeyW")||rt.has("KeyS"),n=rt.has("ShiftLeft")&&x.boost>0,r=an&&!si&&x.health>0?.055+e*.16+(t?.025:0):0,a=.68+e*.82+(n?.12:0);Pl=Ee.damp(Pl,r,6,i),Wt.volume=Ee.clamp(Pl,0,.26),Wt.playbackRate=Ee.damp(Wt.playbackRate,a,7,i),P.dataset.engineVolume=Wt.volume.toFixed(3),P.dataset.enginePlaybackRate=Wt.playbackRate.toFixed(2)}function Gb(i){if(!Qf)try{if(Vb(i),Hb)throw new Error("Simulated audio-frame failure");P.dataset.audioFrame="active"}catch(e){Qf=!0,P.dataset.audioFrame="disabled",console.warn("[Rigged] Audio frame updates disabled; gameplay will continue.",e)}}const rt=new Set,Yu=new ue(0,.15),sn=new E,Ll=new $p,tp=new Gi(new E(0,1,0),0),Vm=new E(0,0,1);let Sc=!1;const Cs=new ct,Gm=new tt({color:16762972,transparent:!0,opacity:.92,depthTest:!1}),Wm=new Z(new Di(.65,.82,24),Gm);Wm.rotation.x=-Math.PI/2;Cs.add(Wm);for(const i of[0,Math.PI/2]){const e=new Z(new it(2.25,.025,.08),Gm);e.rotation.y=i,e.position.y=.015,Cs.add(e)}Cs.renderOrder=10;be.add(Cs);const yi=new E,Mo=new E,Xm=new E(0,0,1);function Wb(i=10,e=1.35,t=.34){const n=new Hp;for(let s=0;s<i*2;s++){const r=s/(i*2)*Math.PI*2-Math.PI/2,a=s%2===0?e:t,o=Math.cos(r)*a,c=Math.sin(r)*a;s===0?n.moveTo(o,c):n.lineTo(o,c)}return n.closePath(),new vh(n)}const qm=Wb(),Ku=new E,Ym=new E(0,1,0),sc=[],Km=()=>new tt({transparent:!0,depthWrite:!1,side:Vt,blending:vr});function Xt(i,e=1){const t=sc.pop()??Km();return t.color.setHex(i),t.opacity=e,t.visible=!0,t.userData.baseOpacity=e,t}function jm(i){i instanceof tt&&i.transparent&&i.blending===vr?(i.opacity=0,sc.push(i)):i.dispose()}function Fa(i){const e=[],t=[];i.group.traverse(n=>{n instanceof Z?e.push(n):n instanceof Sh&&t.push(n)}),Ui.push({...i,meshes:e,lights:t})}function kh(i){const e=Ui[i];be.remove(e.group);for(const t of e.meshes){const n=Array.isArray(t.material)?t.material:[t.material];for(const s of n)jm(s)}Ui.splice(i,1)}function rc(i,e,t=!0){const n=is[i],s=new ct;s.position.copy(e),s.userData.billboard=!0;const r=i==="rocket",a=t&&r?1.8:t?1:.28,o=new Z(Uh,Xt(r?16758063:16766575,.95));o.scale.setScalar(a),s.add(o);const c=new Z(qm,Xt(n.impactColor,i==="mg"?.72:.96));c.scale.setScalar(t?1.24:.26),s.add(c),t&&r&&c.scale.setScalar(2.15);const l=t&&r?5:1;for(let h=0;h<l;h++){const d=new Z(Nm,Xt(h===0?16777215:n.impactColor,.9-h*.18));d.scale.setScalar((t?1.1:.2)+h*.46),d.position.z=-.03-h*.015,s.add(d)}if(t&&r){for(let d=0;d<20;d++){const f=new Z(Nb,Xt(d%3?n.impactColor:16777215,.88)),m=d/20*Math.PI*2;f.rotation.z=m,f.position.set(Math.cos(m)*2.1,Math.sin(m)*2.1,-.06),s.add(f)}mr=.38,gr=.62,P.dataset.lastImpactEffect="rocket-world-detonation"}const u=t&&r?.82:t?.3:.13;be.add(s),Fa({group:s,life:u,maxLife:u,kind:"impact",growth:t&&r?7.2:t?2.2:1.3})}function Xb(i){const e=new ct;e.position.copy(i),e.userData.billboard=!0;const t=new Z(Uh,Xt(16777215,.96));t.scale.setScalar(.22),e.add(t);for(let n=0;n<8;n++){const s=n/8*Math.PI*2,r=new Z(Ub,Xt(n%2?6153727:16777215,.9));r.rotation.z=s,r.position.set(Math.cos(s)*.38,Math.sin(s)*.38,0),e.add(r)}be.add(e),Fa({group:e,life:.16,maxLife:.16,kind:"impact",growth:.5}),mr=.055,gr=.08,P.dataset.lastImpactEffect="sniper-pinpoint-spark"}function $m(i,e,t){const n=Math.min(t,Math.max(18,i.distanceTo(sn)+8)),s=new ct;Ku.copy(i).addScaledVector(e,n*.5),s.position.copy(Ku),s.quaternion.setFromUnitVectors(Ym,e);const r=new Z(Fb,Xt(3657727,.34));r.scale.y=n,s.add(r);const a=new Z(Ob,Xt(15334911,1));a.scale.y=n,s.add(a);const o=new Z(kb,Xt(16777215,1));o.scale.y=n,s.add(o),be.add(s),Fa({group:s,life:.48,maxLife:.48,kind:"laser",growth:0}),P.dataset.sniperTracerLength=n.toFixed(1)}function qb(i,e){const t=new ct;t.position.copy(i).add(new E((Math.random()-.5)*.12,(Math.random()-.5)*.12,(Math.random()-.5)*.12));const n=new Z(Um,Xt(Math.random()>.45?16742947:16767066,.72));t.add(n),be.add(t),Fa({group:t,life:.28,maxLife:.28,kind:"trail",growth:2.2,sourceId:e})}function Zm(i){for(let e=Ui.length-1;e>=0;e--){const t=Ui[e];t.kind!=="trail"||t.sourceId!==i||kh(e)}P.dataset.rocketTrailCleanup="detonation-synced"}const Bo={standard:new tt({color:16764762}),incendiary:new tt({color:16730904}),piercing:new tt({color:15334399})},Yb=new it(.06,.06,9),Kb=new it(.24,.24,8.2),np={standard:new tt({color:16777215}),incendiary:new tt({color:16747061})},Il={standard:Xt(5627135,.58),incendiary:Xt(16726804,.58),piercing:Xt(13236479,.58)},jb=new Ut(.12,.15,.78,9),$b=new Kt({color:3421747,roughness:.55,metalness:.7}),Zb=new Pa(.15,.34,9),Jb=new it(.38,.04,.32),Qb=new Pa(.18,.85,9),ip={standard:Xt(16747304,.92),incendiary:Xt(16723984,.92)},ua=[];function eT(i,e){const t=ua.pop()??new Z(Dm,i);return t.material=i,t.scale.setScalar(e),t.visible=!0,t}function Bh(i,e){i.removeFromParent(),e==="mg"&&i instanceof Z&&(i.visible=!1,i.position.set(0,0,0),i.quaternion.identity(),ua.push(i))}function zh(i,e=!1,t=!1,n=!1){if(i==="mg"){const c=e?Bo.incendiary:t?Bo.piercing:Bo.standard;return eT(c,n?1.75:t?1.25:1)}if(i==="sniper"){const c=new ct,l=new Z(Yb,e?np.incendiary:np.standard);c.add(l);const u=e?Il.incendiary:t?Il.piercing:Il.standard,h=new Z(Kb,u);return c.add(h),c.scale.setScalar(n?1.55:1),c}const s=new ct,r=new Z(jb,$b);r.rotation.x=Math.PI/2,s.add(r);const a=new Z(Zb,dr);a.rotation.x=Math.PI/2,a.position.z=.55,s.add(a);for(const c of[-1,1]){const l=new Z(Jb,dr);l.position.set(c*.14,0,-.28),l.rotation.z=c*.42,s.add(l)}const o=new Z(Qb,e?ip.incendiary:ip.standard);return o.rotation.x=-Math.PI/2,o.position.z=-.78,s.add(o),s}let So=null;function tT(){return So||(So=(async()=>{const i=new ct;for(i.name="offscreen-combat-resource-warmup",i.position.set(0,-500,0);ua.length<32;)ua.push(new Z(Dm,Bo.standard));for(;sc.length<48;)sc.push(Km());const e=[["mg",!1,!1,!1],["mg",!0,!1,!1],["mg",!1,!0,!0],["rocket",!1,!1,!1],["rocket",!0,!1,!0],["sniper",!1,!1,!1],["sniper",!0,!0,!0]],t=[];e.forEach(([s,r,a,o],c)=>{const l=zh(s,r,a,o);l.position.x=c*2,i.add(l),t.push(l)});const n=[Xt(16758063,.95),Xt(16735008,.92),Xt(6809599,.9),Xt(16730904,.8)];i.add(new Z(Uh,n[0]),new Z(qm,n[1]),new Z(Nm,n[2]),new Z(Um,n[3])),be.add(i);try{await yn.compileAsync(be,pn),qu&&await qu,P.dataset.combatPrewarm="complete"}catch(s){P.dataset.combatPrewarm="partial",console.warn("[Rigged] Combat pre-warm completed with a fallback.",s)}finally{be.remove(i),t.forEach((s,r)=>Bh(s,e[r][0])),n.forEach(jm),P.dataset.projectilePool=String(ua.length)}})(),So)}function Jm(i){const e=new ct;e.position.copy(i).add(new E((Math.random()-.5)*1.4,.7+Math.random()*1.2,(Math.random()-.5)*1.4)),e.userData.billboard=!0;const t=new Z(Bb,Xt(Math.random()>.35?16730396:16760133,.9));t.scale.setScalar(.73+Math.random()*.6),e.add(t),be.add(e),Fa({group:e,life:.45,maxLife:.45,kind:"trail",growth:1.7}),P.dataset.burnVfx="ember-active"}function Qm(){if(si||ht!=="active"||x.health<=0||!Sc||Ea>0||Li.length>=120)return!1;const i=is[Et],e=ze?.turretStats[Et];Ea=1/_n.fireRate,wm.getWorldPosition(yi),Mo.copy(sn).sub(yi).normalize(),Vm.copy(Mo);const t=e?.projectileCount??1,n=e?.spread??0;for(let s=0;s<t;s++){const r=t===1?0:s/(t-1)-.5,a=r*n+(Math.random()-.5)*n*.12,o=Mo.clone().applyAxisAngle(Ym,a).normalize(),c=zh(Et,(e?.burnDps??0)>0,(e?.pierces??0)>0,e?.heavyRounds??!1);c.position.copy(yi),c.quaternion.setFromUnitVectors(Xm,o),be.add(c),Li.push({id:Im++,mesh:c,velocity:o.multiplyScalar(_n.projectileSpeed),life:_n.range/_n.projectileSpeed,kind:Et,owner:"player",damage:_n.damage,splashRadius:i.splashRadius??0,trailTimer:0,ricochetsRemaining:e?.ricochets??0,piercesRemaining:e?.pierces??0,burnDps:e?.burnDps??0,burnDuration:e?.burnDuration??0,hitOpponent:!1,hitTargets:new Set})}return P.dataset.shotsFired=String(Number(P.dataset.shotsFired??0)+t),V.weaponState.textContent="FIRING",ko=.08,Ts.color.setHex(i.impactColor),Ts.intensity=Et==="rocket"?22:Et==="sniper"?28:8,Ts.distance=Et==="rocket"?10:7,Ts.position.copy(yi),Oo=Et==="mg"?.045:.09,Et==="mg"?Rs("turret-mg",.1,.025,yi):Et==="rocket"?Rs("turret-rocket",.44,.025,yi):Rs("turret-sniper",.38,.018,yi),Et==="sniper"?$m(yi,Mo,_n.range):rc(Et,yi,!1),!0}const _s=new E,wo=new E;function nT(){if(ht!=="active"||$.health<=0||x.health<=0)return;const i=is.sniper;_s.copy($.position),_s.y+=2.72;const e=Math.min(.45,_s.distanceTo(x.position)/i.projectileSpeed);wo.copy(x.position).addScaledVector(x.velocity,e).add(Ku.set((Math.random()-.5)*.34,1.05+(Math.random()-.5)*.18,(Math.random()-.5)*.34)).sub(_s).normalize();const t=zh("sniper");t.position.copy(_s),t.quaternion.setFromUnitVectors(Xm,wo),be.add(t),Li.push({id:Im++,mesh:t,velocity:wo.clone().multiplyScalar(i.projectileSpeed),life:i.range/i.projectileSpeed,kind:"sniper",owner:"opponent",damage:i.damage,splashRadius:0,trailTimer:0,ricochetsRemaining:0,piercesRemaining:0,burnDps:0,burnDuration:0,hitOpponent:!1,hitTargets:new Set}),Rs("turret-sniper",.3,.025,_s),$m(_s,wo,i.range),P.dataset.aiShotsFired=String(Number(P.dataset.aiShotsFired??0)+1)}function on(i){Fm=i,P.dataset.fireHeld=String(i),i&&Qm()}function eg(i){Ea=Math.max(0,Ea-i),ko=Math.max(0,ko-i),Oo=Math.max(0,Oo-i),ko===0&&V.weaponState.textContent==="FIRING"&&(V.weaponState.textContent=is[Et].stateLabel),Oo===0&&(Ts.intensity=0),Fm&&Qm()}const tg=48;function iT(i){if(ri.length>=tg||Math.abs(x.speed)<3||Math.random()>i*Math.min(Math.abs(x.speed),20)*1.15)return;const e=new E(-Math.sin(x.heading)*2,0,-Math.cos(x.heading)*2),t=new Z(Ib,Lb.clone());t.scale.setScalar(.6+Math.random()*.7),t.position.copy(x.position).add(e).add(new E((Math.random()-.5)*1.8,.25,(Math.random()-.5)*.8)),be.add(t),ri.push({mesh:t,life:.7+Math.random()*.5,velocity:new E((Math.random()-.5)*.5,.45+Math.random()*.3,(Math.random()-.5)*.5)})}function Hh(i,e=1.4,t=12){for(let n=0;n<Math.min(t,tg-ri.length);n++){const s=new Z(Db,new tt({color:n%3===0?16761678:12077609}));s.scale.setScalar(.6+Math.random()),s.position.copy(i).add(new E(0,e,0)),be.add(s),ri.push({mesh:s,life:.7+Math.random()*.8,velocity:new E((Math.random()-.5)*7,2+Math.random()*5,(Math.random()-.5)*7)})}}function ju(i,e){if(i.alive&&(i.health-=e,i.hitFlash=.09,sT(),i.health<=0)){i.alive=!1,Hh(i.group.position),be.remove(i.group);const t=Fs.filter(n=>n.alive).length;P.dataset.targetsRemaining=String(t),Qt(t?`TARGET SCRAPPED // ${t} REMAIN`:"TARGET LANE CLEARED // FIND THE RIVAL")}}let sp=-1/0;function sT(){const i=performance.now();i-sp<70||(sp=i,Rs("confirmed-hit",.23,.02))}function Qt(i){V.message.textContent=i,V.message.classList.add("show"),clearTimeout(Wu),Wu=window.setTimeout(()=>V.message.classList.remove("show"),1900)}const Vh={mg:"SCRAP RATTLER",rocket:"HELLBOX",sniper:"LONGLANCE"};function Gh(){document.querySelectorAll("[data-weapon]").forEach(t=>{const n=t.dataset.weapon,s=!!ze?.ownedTurrets.includes(n),r=s&&Et===n;t.classList.toggle("owned",s),t.classList.toggle("selected",r),t.disabled=!s,t.setAttribute("aria-pressed",String(r));const a=t.querySelector("small");a&&(a.textContent=r?"ACTIVE":s?"OWNED":`LOCKED // ROUND ${Math.max(3,Math.ceil(Ft/3)*3)}`)});const i=new Map(qo.map(t=>[t.id,t.name])),e=(ze?.upgrades??[]).map(t=>i.get(t)??(t.startsWith("add-")?`Added ${Vh[t.slice(4)]??"Turret"}`:t.startsWith("mastery-")?"Turret Mastery":t));V.activeUpgrades.replaceChildren(...(e.length?e.slice(-7):["No cards installed"]).map(t=>{const n=document.createElement("li");return n.textContent=t,n})),P.dataset.ownedTurrets=ze?.ownedTurrets.join(",")??"none",P.dataset.activeUpgrades=ze?.upgrades.join(",")??"none"}const rT=".starter-card,.upgrade-card,.vehicle-card",aT=1250,rp=110,oT=1320,ap=85,cT=2250,lT=1900;function Wh(i,e){i.dataset.cardTeam=e?"player":"rival",P.dataset.cardTeam=e?"player-purple":"rival-orange"}function ng(i){return Array.from(i.querySelectorAll(rT)).filter(e=>!e.hidden)}function ig(i,e,t,n){const s=i.getBoundingClientRect(),r=e.getBoundingClientRect();i.style.setProperty("--deck-x",`${(r.left+r.width/2-s.left-s.width/2).toFixed(1)}px`),i.style.setProperty("--deck-y",`${(r.top+r.height/2-s.top-s.height/2).toFixed(1)}px`),i.style.setProperty("--deck-rotation",`${((t-(n-1)/2)*4.5).toFixed(1)}deg`)}function Xh(i){const e=++Jo,t=i.closest(".draft-shell")?.querySelector(".deck-stack");if(!t)return;const n=ng(i);t.classList.remove("is-collecting","is-dealing"),n.forEach((s,r)=>{s.classList.remove("is-picked","is-shuffling-in","is-dealing"),ig(s,t,r,n.length),s.style.setProperty("--deal-delay",`${r*rp}ms`)}),i.offsetWidth,t.classList.add("is-dealing"),n.forEach(s=>s.classList.add("is-dealing")),P.dataset.deckAnimation="dealing",window.setTimeout(()=>{e===Jo&&(n.forEach(s=>s.classList.remove("is-dealing")),t.classList.remove("is-dealing"),P.dataset.deckAnimation="ready")},aT+n.length*rp+80)}function uT(i,e){const t=++Jo,n=i.closest(".draft-shell")?.querySelector(".deck-stack");if(!n)return;const s=ng(i);n.classList.remove("is-dealing","is-collecting"),s.forEach((r,a)=>{const o=r.dataset.optionId===e;r.classList.remove("is-dealing","is-shuffling-in"),r.classList.toggle("is-picked",o),ig(r,n,a,s.length),r.style.setProperty("--shuffle-delay",`${o?260:(s.length-1-a)*ap}ms`),r.querySelectorAll("button").forEach(c=>c.disabled=!0)}),i.offsetWidth,n.classList.add("is-collecting"),s.forEach(r=>r.classList.add("is-shuffling-in")),P.dataset.deckAnimation="collecting",window.setTimeout(()=>{t===Jo&&(P.dataset.deckAnimation="stacked")},oT+s.length*ap+80)}function wc(){if(!Ve||Ve.phase!=="starter_draft")return;ht="starter_turret_select",V.starterSelect.hidden=!1,V.vehicleSelect.hidden=!0,V.cardDraft.hidden=!0,V.countdown.hidden=!0,V.weaponSelect.classList.add("draft-open"),P.dataset.roundPhase=ht,P.dataset.starterSelection="visible",Gh();const i=Bs(Ve).find(t=>t.id===Ve?.activePickerId),e=Mc&&!Xu||(ft?.isMyTurn()??!1);Wh(V.starterSelect,e),V.starterTurn.textContent=e?"YOUR PICK // Choose the next roof turret.":`${i?.name??"The other driver"} is choosing. Watch their pick resolve.`,V.starterPickReveal.hidden=!0,document.querySelectorAll(".starter-card").forEach(t=>{const n=t.querySelector("[data-starter-turret]"),s=n.dataset.starterTurret,r=Ve?.draftOptions.includes(s)??!1;t.hidden=!r,t.dataset.optionId=s,t.classList.remove("is-picked","is-dealing","is-shuffling-in"),t.classList.toggle("is-watching",!e),n.disabled=!e,n.textContent=e?`MOUNT ${s==="mg"?"RATTLER":s==="rocket"?"HELLBOX":"LONGLANCE"}`:"RIVAL IS CHOOSING"}),Xh(V.starterGrid)}async function hT(i){if(!ft?.isMyTurn()||!Ve?.draftOptions.includes(i))return;const e=Ve.runState?structuredClone(Ve.runState):Rh(i,Ft);Ve.runState&&Ko(e,gc(i)),document.querySelectorAll("[data-starter-turret]").forEach(n=>n.disabled=!0);const t=Ve.draftTurn===0?["mg","rocket","sniper"].filter(n=>n!==i):Object.keys(ci);try{await ft.submitPick({optionId:i,optionName:Vh[i],nextRunState:e,nextOptions:t})}catch(n){ni(n),wc()}}function bc(){if(!Ve||Ve.phase!=="vehicle_select")return;ht="starter_turret_select",V.starterSelect.hidden=!0,V.cardDraft.hidden=!0,V.vehicleSelect.hidden=!1,V.countdown.hidden=!0,V.weaponSelect.classList.add("draft-open");const i=Bs(Ve),e=i.find(s=>s.id===Ve?.activePickerId),t=Oh||(ft?.isMyTurn()??!1);Wh(V.vehicleSelect,t),V.vehicleTurn.textContent=t?"YOUR PICK // Choose the car you will drive.":`${e?.name??"The other driver"} is choosing their car.`,V.vehiclePickReveal.hidden=!0;const n=Object.entries(ci).map(([s,r])=>{const a=s,o=document.createElement("button");o.type="button",o.className="vehicle-card",o.dataset.vehicle=a,o.dataset.optionId=a,o.disabled=!t||!Ve?.draftOptions.includes(a),o.classList.toggle("is-watching",!t);const c=document.createElement("img");c.src=r.preview,c.alt="";const l=document.createElement("span"),u=document.createElement("b"),h=document.createElement("small"),d=document.createElement("em");u.textContent=r.label.toUpperCase(),h.textContent=r.callout;const f=i.filter(m=>Ve?.vehicleSelections?.[m.id]===a).map(m=>m.name);return d.textContent=f.length?`${f.join(" + ")} PICKED THIS`:t?"SELECT VEHICLE":"RIVAL IS CHOOSING",l.append(u,h,d),o.append(c,l),o.addEventListener("click",()=>{dT(a)}),o});V.vehicleGrid.replaceChildren(...n),P.dataset.roundPhase="vehicle_select",P.dataset.vehicleSelection="visible",Xh(V.vehicleGrid)}async function dT(i){if(!(!ft?.isMyTurn()||Ve?.phase!=="vehicle_select")){V.vehicleGrid.querySelectorAll("button").forEach(e=>e.disabled=!0);try{await ft.submitVehiclePick(i,ci[i].label)}catch(e){ni(e),bc()}}}function fT(i){const e=document.createElement("article");e.className="upgrade-card",e.dataset.category=i.category,e.dataset.optionId=i.id;const t=document.createElement("div");t.className="upgrade-card__meta";const n=document.createElement("span");n.textContent=i.category.toUpperCase();const s=document.createElement("span");s.textContent=i.scope.toUpperCase(),t.append(n,s);const r=document.createElement("h2");r.textContent=i.name.toUpperCase();const a=document.createElement("p");a.textContent=i.description;const o=document.createElement("ul");o.className="upgrade-card__stats";for(const u of i.stats){const h=document.createElement("li");h.textContent=u,o.append(h)}const c=document.createElement("p");c.className="upgrade-card__quote",c.textContent=`“${i.quote}”`;const l=document.createElement("button");return l.type="button",l.textContent=i.category==="turret"?"ADD TO LOADOUT":"CHOOSE CARD",l.disabled=!(ft?.isMyTurn()??!1),l.addEventListener("click",()=>{pT(i)}),e.classList.toggle("is-watching",l.disabled),e.append(t,r,a,o,c,l),e}function qh(){if(!ze||!Ve||Ve.phase!=="upgrade_draft")return;const i=sg(Ve.draftOptions,ze),e=Ft%3===0,t=Bs(Ve).find(s=>s.id===Ve?.activePickerId),n=ft?.isMyTurn()??!1;Wh(V.cardDraft,n),ht="card_select",V.countdown.hidden=!0,V.starterSelect.hidden=!0,V.vehicleSelect.hidden=!0,V.cardDraft.hidden=!1,V.weaponSelect.classList.add("draft-open"),V.draftEyebrow.textContent=e?`ROUND ${Ft} // TURRET SALVAGE`:`ROUND ${Ft} COMPLETE // SALVAGE DRAFT`,V.draftTitle.textContent=n?e?"EXPAND THE RIG OR UPGRADE":"CHOOSE ONE UPGRADE":`${(t?.name??"RIVAL").toUpperCase()} IS PICKING`,V.draftSubtitle.textContent=n?"YOUR PICK // Install one card into the shared rig.":`You can see every option. ${t?.name??"The other driver"} has control.`,V.draftPickReveal.hidden=!0,V.cardGrid.replaceChildren(...i.map(fT)),P.dataset.roundPhase=ht,P.dataset.cardDraft="visible",P.dataset.turretReward=e?"offered":"not-due",Xh(V.cardGrid)}async function pT(i){if(!ze||ht!=="card_select"||!ft?.isMyTurn()||!Ve?.draftOptions.includes(i.id))return;const e=structuredClone(ze);Ko(e,i),e.round=Ft,V.cardGrid.querySelectorAll("button").forEach(n=>n.disabled=!0);const t=Ve.draftTurn===0?_c(e).map(n=>n.id):[];try{await ft.submitPick({optionId:i.id,optionName:i.name,nextRunState:e,nextOptions:t})}catch(n){ni(n),qh()}}function sg(i,e){const t=_c(e),n=[...t,...qo];for(const s of["mg","rocket","sniper"])n.push(gc(s));return i.map(s=>n.find(r=>r.id===s)).filter(s=>!!s)}function mT(i){if(!ze||ze.ownedTurrets.length<2||ht!=="active")return;const e=ze.ownedTurrets.indexOf(Et),t=(e+i+ze.ownedTurrets.length)%ze.ownedTurrets.length;ss(ze.ownedTurrets[t])}const rs=new E(0,1,0),Dl=new E,vs=new E,Nl=new E,Jn=new E,op=new qe,cp=new Hn,Ms=new zn(0,0,0,"YXZ"),ji=.93;function gT(i,e,t,n){if(n.set(Math.sin(i),0,Math.cos(i)),J.arenaKind!=="capsule"||!J.bowl)return n;const s=Gt(J.bowl,e,t);return s.progress<=.001?n:(n.addScaledVector(s.normal,-n.dot(s.normal)),n.lengthSq()<1e-4&&n.set(Math.sin(i),0,Math.cos(i)),n.normalize())}function _T(i,e,t,n){const r=J.arenaKind==="capsule"&&!!J.bowl?Gt(J.bowl,x.position.x,x.position.z):null,a=!!(r&&r.progress>.001&&x.grounded),o=r?Ee.smoothstep(r.progress,.025,.34):0;vs.copy(rs),r&&vs.lerp(r.normal,o*.88).normalize(),x.surfaceNormal.copy(r?.normal??rs),x.wallAssistActive=a,x.downforce=a?3.5+o*5.5:0,Jn.set(Math.sin(x.heading),0,Math.cos(x.heading)),Jn.addScaledVector(vs,-Jn.dot(vs)),Jn.lengthSq()<1e-4&&Jn.set(Math.sin(x.heading),0,Math.cos(x.heading)),Jn.normalize(),Nl.crossVectors(vs,Jn).normalize(),Jn.crossVectors(Nl,vs).normalize(),x.projectedForward.copy(Jn),op.makeBasis(Nl,vs,Jn),cp.setFromRotationMatrix(op),x.orientation.slerp(cp,1-Math.exp(-(a?11:15)*i)),Ms.setFromQuaternion(x.orientation,"YXZ"),x.pitch=Ee.clamp(Ms.x,-ji,ji),x.roll=Ee.clamp(Ms.z,-ji,ji)+(e?t*.035*n:0),Ms.set(x.pitch,Ms.y,x.roll,"YXZ"),x.orientation.setFromEuler(Ms)}function vT(i,e,t){let n=Math.sin(t)*x.speed,s=Math.cos(t)*x.speed;const r=n*i+s*e;if(r<=0)return;n-=i*r*1.08,s-=e*r*1.08;const a=Math.hypot(n,s);if(x.speed=Math.min(Math.abs(x.speed),a),a>.05){const o=Math.atan2(n,s);x.heading=o-x.driftAngle}x.driftAngle*=.35}function Os(i){x.collisionCooldown=Math.max(0,x.collisionCooldown-i),x.wallContactNormal.set(0,0,0);const e=rt.has("KeyW")?1:0,t=rt.has("KeyS")?1:0,n=(rt.has("KeyA")?1:0)-(rt.has("KeyD")?1:0),s=rt.has("Space"),r=rt.has("ShiftLeft")&&e>0&&x.boost>0;e&&(x.speed+=st.acceleration*(r?st.boostPower??1.3:1)*i),t&&(x.speed-=x.speed>1?st.acceleration*2.35*i:st.acceleration*.68*i),r?x.boost=Math.max(0,x.boost-24*i):x.boost=Math.min(100,x.boost+6*i);const a=st.maxSpeed*(r?st.boostPower??1.3:1);if(x.speed=Ee.clamp(x.speed,-11,a),!e&&!t){const v=(s?4.4:2.15)*i;x.speed=Math.abs(x.speed)<=v?0:x.speed-Math.sign(x.speed)*v}const o=Math.min(Math.abs(x.speed)/st.maxSpeed,1),c=x.speed>=0?1:-1,l=.2+o*.8-Math.max(0,o-.72)*.34;x.heading+=n*st.handling*l*(s?1.3:1)*c*i;const u=s&&o>.16?-n*.28*o*c:0;x.driftAngle=Ee.damp(x.driftAngle,u,s?4.2:st.traction,i);const h=x.heading+x.driftAngle;gT(h,x.position.x,x.position.z,Dl),x.velocity.copy(Dl).multiplyScalar(x.speed),x.position.x+=x.velocity.x*i,x.position.z+=x.velocity.z*i;let d=!1,f=!1;if(J.arenaKind==="capsule"&&J.bowl){const v=om(J.bowl,x.position.x,x.position.z,x.heading,Un,On);v.collided?(x.position.x=v.x,x.position.z=v.z,d=!0,f=!0,vT(v.normalX,v.normalZ,h),x.wallContactNormal.set(-v.normalX,0,-v.normalZ),P.dataset.guardContact="active",P.dataset.guardPenetration=v.penetration.toFixed(3),x.collisionCooldown<=0&&Qt("UPPER GUARD // SLIDE BACK INTO THE ARENA")):P.dataset.guardContact="clear"}else{const v=Math.hypot(x.position.x,x.position.z),R=An-(Un+On);if(v>R){const A=x.position.x/v,L=x.position.z/v;x.position.x=A*R,x.position.z=L*R,d=!0,Qt("BOUNDARY IMPACT // TURN BACK")}}for(const v of Ns)if(!(x.position.y>v.top+.2))for(const R of[-Un,0,Un])Ab(v,R)&&(d=!0);for(const v of kr)for(const R of[-Un,0,Un])Eb(v,R)&&(d=!0);const m=x.activeRamp;let _=tc(x.position.x,x.position.z);if(d&&(Math.abs(x.speed)>6&&(ac(Math.round(Math.abs(x.speed)*.32)),Qt("SCRAP COLLISION // HULL DAMAGED")),f||(x.speed*=-.18),x.driftAngle*=.25),_=tc(x.position.x,x.position.z),_){if(x.activeRamp=_.ramp,x.grounded=!0,x.verticalVelocity=0,x.position.y=_.height+.06,_.ramp.kind==="wall"){const v=_.localZ,R=Ee.smoothstep(v,.08,.42),A=Gt(J.bowl,x.position.x,x.position.z),L=Math.sin(h)*A.outwardX+Math.cos(h)*A.outwardZ,N=Ee.smoothstep(v,.62,.9);x.speed-=L*(5.8*R+12*N)*i,x.speed=Ee.clamp(x.speed,-11,a),x.driftAngle=Ee.damp(x.driftAngle,0,5+R*7,i),x.speed*=Math.exp(-.18*N*i),P.dataset.wallRideGrip=(R*.85+.15).toFixed(2),P.dataset.wallSurfaceBand=A.band,P.dataset.wallSurfaceNormal=`${A.normal.x.toFixed(2)},${A.normal.y.toFixed(2)},${A.normal.z.toFixed(2)}`,v>.18&&Math.abs(x.speed)>5&&(P.dataset.wallRideContact="passed")}}else{const v=wt(x.position.x,x.position.z)+.06;if(m&&m.kind!=="wall"&&x.position.y>v+.45){const R=Math.cos(h-m.rotation),A=x.speed*R*m.rise/m.length,L=Math.abs(x.speed)*Math.max(0,-Math.sin(x.pitch));x.verticalVelocity=Math.max(0,A,L),x.grounded=!1}x.activeRamp=null,x.grounded?x.position.y=v:(x.verticalVelocity-=12.5*i,x.position.y+=x.verticalVelocity*i,x.position.y<=v&&(x.position.y=v,x.verticalVelocity=0,x.grounded=!0))}const g=Ci(x.position.x+Math.sin(x.heading)*2,x.position.z+Math.cos(x.heading)*2),p=Ci(x.position.x-Math.sin(x.heading)*2,x.position.z-Math.cos(x.heading)*2),y=Ci(x.position.x+Math.cos(x.heading)*1.2,x.position.z-Math.sin(x.heading)*1.2),S=Ci(x.position.x-Math.cos(x.heading)*1.2,x.position.z+Math.sin(x.heading)*1.2);J.arenaKind==="capsule"?_T(i,s,n,o):(x.pitch=x.grounded?Math.atan2(p-g,4):0,x.roll=((x.grounded?Math.atan2(y-S,2.4):0)+(s?n*.055*o:0))/(st.stability??1),x.orientation.setFromEuler(Ms.set(x.pitch,x.heading,x.roll,"YXZ")),x.surfaceNormal.set(0,1,0),x.projectedForward.set(Math.sin(x.heading),0,Math.cos(x.heading)),x.wallAssistActive=!1,x.downforce=0),x.velocity.copy(Dl).multiplyScalar(x.speed),fr.forEach(v=>v.rotation.x+=x.speed*i/.57),nc.forEach(v=>v.rotation.y=Ee.damp(v.rotation.y,-n*.38,12,i));for(const v of Fs)v.alive&&v.group.position.distanceTo(x.position)<1.85&&Math.abs(x.speed)>5&&(ju(v,Math.abs(x.speed)*1.8),x.speed*=-.35,ac(4));if(!Number.isFinite(x.position.x)||!Number.isFinite(x.position.y)||!Number.isFinite(x.position.z)||x.position.y<-8||Math.abs(x.position.x)>An*1.8||Math.abs(x.position.z)>An*1.8){Qt("OUT OF BOUNDS // AUTO RECOVERY"),zs();return}iT(i)}function Aa(i,e=!1){$.health<=0||ht==="ended"||ht==="card_select"||($.health=Math.max(0,$.health-i),e||Rs("confirmed-hit",.18,.025,$.position),P.dataset.opponentHealth=$.health.toFixed(0),$.health<=0&&(Hh($.position,1,28),It.visible=!1,Qt("RIVAL SCRAPPED // ROUND SECURED"),db()))}function xT(i){if(ht!=="active"||$.health<=0||$.burnTime>0&&($.burnTime=Math.max(0,$.burnTime-i),$.burnFxCooldown-=i,Aa($.burnDps*i,!0),$.burnFxCooldown<=0&&($.burnFxCooldown=.14,Jm($.position.clone().add(new E(0,.5,0)))),P.dataset.burnRemaining=$.burnTime.toFixed(2),$.health<=0))return;$.collisionCooldown=Math.max(0,$.collisionCooldown-i),$.fireCooldown-=i;const e=x.position.x-$.position.x,t=x.position.z-$.position.z,n=Math.hypot(e,t);$.maneuverTimer-=i,$.weavePhase+=i*$.weaveRate,$.maneuverTimer<=0&&($.maneuverTimer=.75+Math.random()*1.65,$.steerBias=Math.random()<.5?-1:1,$.preferredDistance=17+Math.random()*22,$.speedMultiplier=.78+Math.random()*.5,$.weaveRate=1.1+Math.random()*2.1,P.dataset.aiManeuver="rerolled");const s=Math.atan2(e,t),r=n/$.preferredDistance,a=$.steerBias*(.62+Math.sin($.weavePhase)*.32),o=r<.58?s+Math.PI+$.steerBias*.28:r>1.42?s+Math.sin($.weavePhase)*.2:s+a,c=Math.atan2(Math.sin(o-$.heading),Math.cos(o-$.heading));$.heading+=Ee.clamp(c,-2.05*i,2.05*i);const l=(r>1.35?20:r<.58?18:13+Math.abs(Math.sin($.weavePhase))*6)*$.speedMultiplier;if($.speed=Ee.damp($.speed,l,3,i),$.position.x+=Math.sin($.heading)*$.speed*i,$.position.z+=Math.cos($.heading)*$.speed*i,J.arenaKind==="capsule"&&J.bowl){const h=om(J.bowl,$.position.x,$.position.z,$.heading,Un,On);h.collided&&($.position.x=h.x,$.position.z=h.z,$.heading+=$.steerBias*.7,$.steerBias*=-1)}else{const h=An-4,d=Math.hypot($.position.x,$.position.z);d>h&&($.position.multiplyScalar(h/d),$.heading=Math.atan2(-$.position.x,-$.position.z)+$.steerBias*.5,$.steerBias*=-1)}$.position.y=Ci($.position.x,$.position.z)+.06,It.position.copy($.position),It.rotation.y=$.heading;const u=It.userData.turret;if(u){const h=Math.atan2(e,t);u.rotation.y=Ee.damp(u.rotation.y,Math.atan2(Math.sin(h-$.heading),Math.cos(h-$.heading)),8,i)}n<is.sniper.range&&$.fireCooldown<=0&&(nT(),$.fireCooldown=1/is.sniper.fireRate+.18+Math.random()*.55),n<2.35&&$.collisionCooldown<=0&&($.collisionCooldown=.8,ac(10),Aa(5*(st.ramPower??1)),$.heading+=Math.PI*.65)}function ac(i){if(x.collisionCooldown>0||ht==="ended"||ht==="card_select")return;x.collisionCooldown=.45;let e=i*(1-(st.armor??0));if(x.shield>0){const t=Math.min(x.shield,e);x.shield-=t,e-=t,P.dataset.shieldAbsorbed=t.toFixed(1),Qt("EMERGENCY SHIELD // IMPACT ABSORBED")}x.health=Math.max(0,x.health-e),Rs("vehicle-hit",.26,.045,x.position),x.health<=0&&(Qt("RIG DISABLED // RIVAL TAKES THE ROUND"),fb())}const Ul=[],$r=new E;function yT(i){Ll.setFromCamera(Yu,pn),Ul.length=0,Ll.intersectObjects(Ni,!0,Ul);const e=Ul[0];if(e)sn.copy(e.point);else{if(tp.constant=0,!Ll.ray.intersectPlane(tp,sn))return;sn.y=Ci(sn.x,sn.z)}pr.getWorldPosition($r);const t=sn.x-$r.x,n=sn.z-$r.z;if(Math.hypot(t,n)<1.8)return;let r=Math.atan2(t,n)-x.heading;r=Math.atan2(Math.sin(r),Math.cos(r)),pr.rotation.y=Ee.damp(pr.rotation.y,r,12,i);const a=-Math.atan2(sn.y-$r.y,Math.hypot(t,n));Hu.rotation.x=Ee.damp(Hu.rotation.x,Ee.clamp(a,-.42,.2),11,i),Vm.copy(sn).sub($r).normalize(),Sc=!0,Cs.position.copy(sn),Cs.position.y+=.09,Cs.scale.setScalar(1+Math.sin(Pr*5)*.06)}const Zr=new E,hn=new E,lp=new E,Mi=new E,bo=new E,MT=new E;function Fl(i,e,t){bo.copy(e).sub(i);const n=bo.lengthSq();if(n<=1e-6)return t.distanceToSquared(i);const s=Ee.clamp(MT.copy(t).sub(i).dot(bo)/n,0,1);return lp.copy(i).addScaledVector(bo,s),lp.distanceToSquared(t)}function ST(i,e,t,n=!1,s=!1){if(P.dataset.lastWeaponImpact=i.kind,i.owner==="player"&&i.kind==="rocket"){for(const a of Fs){if(!a.alive)continue;hn.copy(a.group.position),hn.y+=1.4;const o=hn.distanceTo(e);if(o>i.splashRadius)continue;const c=a===t?i.damage:i.damage*Math.max(.28,1-o/i.splashRadius);ju(a,c)}hn.copy($.position),hn.y+=1.1;const r=hn.distanceTo(e);$.health>0&&r<=i.splashRadius&&Aa(i.damage*Math.max(.3,1-r/i.splashRadius))}else i.owner==="player"&&t&&ju(t,i.damage);i.owner==="player"&&n&&i.kind!=="rocket"&&Aa(i.damage),i.owner==="player"&&n&&i.burnDps>0&&($.burnDps=Math.max($.burnDps,i.burnDps),$.burnTime=Math.max($.burnTime,i.burnDuration),Jm(e),P.dataset.burnStatus="applied"),i.owner==="opponent"&&s&&ac(i.damage),i.kind==="rocket"?(Zm(i.id),rc("rocket",e,!0),Hh(e,.2,22)):i.kind==="sniper"?Xb(e):rc("mg",e,!1)}function up(i){for(let e=Li.length-1;e>=0;e--){const t=Li[e];Zr.copy(t.mesh.position),t.mesh.position.addScaledVector(t.velocity,i),t.life-=i,t.kind==="rocket"&&(t.trailTimer-=i,t.trailTimer<=0&&(t.trailTimer=.06,qb(t.mesh.position,t.id)));let n=null;if(t.owner==="player")for(const c of Fs){if(!c.alive||t.hitTargets.has(c))continue;hn.copy(c.group.position),hn.y+=1.4;const l=t.kind==="rocket"?1.15:.95;if(Fl(Zr,t.mesh.position,hn)<l*l){n=c;break}}hn.copy($.position),hn.y+=1.1;const s=t.owner==="player"&&!t.hitOpponent&&$.health>0&&Fl(Zr,t.mesh.position,hn)<(t.kind==="rocket"?1.6:1.35)**2;hn.copy(x.position),hn.y+=1.05;const r=t.owner==="opponent"&&x.health>0&&Fl(Zr,t.mesh.position,hn)<1.4**2,a=Ci(t.mesh.position.x,t.mesh.position.z)+.1,o=t.mesh.position.y<=a;if(o&&t.ricochetsRemaining>0){t.ricochetsRemaining--,t.mesh.position.copy(Zr),t.velocity.y=Math.abs(t.velocity.y)+4,t.velocity.multiplyScalar(.82),rc("mg",t.mesh.position,!1),P.dataset.ricochetVfx="spark";continue}if(n||s||r||o||t.life<=0){if(n?(Mi.copy(n.group.position),Mi.y+=1.4):s?(Mi.copy($.position),Mi.y+=1.1):r?(Mi.copy(x.position),Mi.y+=1.05):(Mi.copy(t.mesh.position),o&&(Mi.y=a+.08)),(n||s||r||o||t.kind==="rocket")&&ST(t,Mi,n,s,r),t.owner==="player"&&(!!n||s)&&t.piercesRemaining>0&&t.kind!=="rocket"){t.piercesRemaining--,n&&t.hitTargets.add(n),s&&(t.hitOpponent=!0),t.mesh.position.addScaledVector(t.velocity.clone().normalize(),1.8),P.dataset.piercingVfx="bright-tracer";continue}t.kind==="rocket"&&Zm(t.id),Bh(t.mesh,t.kind),Li.splice(e,1)}}for(let e=ri.length-1;e>=0;e--){const t=ri[e];t.life-=i,t.mesh.position.addScaledVector(t.velocity,i),t.velocity.y-=3.5*i,t.mesh.scale.multiplyScalar(1+i*.55);const n=t.mesh.material;n.opacity=Math.max(0,Math.min(n.opacity,t.life*.45)),t.life<=0&&(be.remove(t.mesh),n.dispose(),ri.splice(e,1))}for(let e=Ui.length-1;e>=0;e--){const t=Ui[e];t.life-=i;const n=Ee.clamp(1-t.life/t.maxLife,0,1),s=Math.pow(1-n,1.45);t.group.userData.billboard&&t.group.quaternion.copy(pn.quaternion),t.kind!=="laser"&&t.group.scale.setScalar((t.kind==="impact"?.48:.68)+n*t.growth);for(const r of t.lights)r.intensity*=Math.max(0,1-i*8);for(const r of t.meshes){const a=Array.isArray(r.material)?r.material:[r.material];for(const o of a)o.opacity=Number(o.userData.baseOpacity??1)*s}t.life<=0&&kh(e)}mr=Math.max(0,mr-i),mr===0&&(gr=0);for(const e of Fs)e.alive&&(e.hitFlash>0?(e.hitFlash-=i,e.group.getObjectByName("target-body").material.emissive.setHex(16739116)):e.group.getObjectByName("target-body").material.emissive.setHex(0))}const Ol=new E;let kl=.1;function wT(){return J.arenaKind==="capsule"&&J.bowl?{kind:"capsule",straightHalfLength:J.bowl.straightHalfLength,outerRadius:J.bowl.outerRadius}:{kind:"ring",radius:An}}function Tc(){const i=Ki.mode==="enemy";V.cameraMode.textContent=i?"ENEMY CAM":"CHASE CAM",V.cameraMode.parentElement?.classList.toggle("enemy",i),P.dataset.cameraMode=Ki.mode,P.dataset.enemyCam=i?"locked":"off"}function bT(i){mr>0?Ol.set((Math.random()-.5)*gr,(Math.random()-.5)*gr,(Math.random()-.5)*gr):Ol.set(0,0,0);const e=Ki.update({dt:i,playerPosition:Yt.position,playerHeading:x.heading,enemyPosition:It.position,enemyAvailable:$.health>0&&It.visible,groundHeight:Ci,bounds:wT(),shake:Ol});e.fellBackToChase&&(Tc(),Qt("NO TARGET // CHASE CAM")),kl+=i,kl>=.1&&(kl=0,P.dataset.cameraAimMode=e.mode==="enemy"?"enemy-target":"drive-forward",P.dataset.cameraPositionMode=e.mode,P.dataset.cameraTargetDistance=e.targetDistance?.toFixed(2)??"none",P.dataset.cameraPosition=`${pn.position.x.toFixed(2)},${pn.position.y.toFixed(2)},${pn.position.z.toFixed(2)}`,P.dataset.cameraLookAt=`${Ki.lookAt.x.toFixed(2)},${Ki.lookAt.y.toFixed(2)},${Ki.lookAt.z.toFixed(2)}`)}const Si=new E;function hp(i,e,t,n){Si.copy(e),Si.y+=t,Si.project(pn);const s=n&&Si.z>-1&&Si.z<1&&Math.abs(Si.x)<1.15&&Math.abs(Si.y)<1.15;if(i.classList.toggle("world-health--hidden",!s),i.setAttribute("aria-hidden",String(!s)),!s)return;const r=(Si.x*.5+.5)*innerWidth,a=(-Si.y*.5+.5)*innerHeight,o=Ee.clamp(1.08-pn.position.distanceTo(e)*.0055,.78,1.02);i.style.transform=`translate3d(${r.toFixed(1)}px,${a.toFixed(1)}px,0) translate(-50%,-100%) scale(${o.toFixed(3)})`}function dp(){const i=an&&(ht==="countdown"||ht==="active"||ht==="ended");hp(V.playerHealthTag,Yt.position,3.7,i&&x.health>0&&Yt.visible),hp(V.rivalHealthTag,It.position,3.85,i&&$.health>0&&It.visible),P.dataset.worldHealthHud="projected-car-anchors"}function rg(){V.boost.textContent=String(Math.round(x.boost)),V.health.textContent=String(Math.round(x.health)),V.healthBar.style.width=`${x.health/st.maxHealth*100}%`,V.boostBar.style.width=`${x.boost}%`,V.health.parentElement.title=x.shield>0?`${Math.round(x.shield)} temporary shield active`:"Hull integrity",P.dataset.shield=x.shield.toFixed(1),V.rivalHealth.textContent=String(Math.round($.health)),V.rivalHealthBar.style.width=`${$.health/$.maxHealth*100}%`,V.boostMeter.classList.toggle("recharging",x.boost<99.5&&!rt.has("ShiftLeft")),P.dataset.boost=x.boost.toFixed(1),P.dataset.boostRechargeRate="6-per-second";const i=tc(x.position.x,x.position.z),e=wt(x.position.x,x.position.z),t=J.arenaKind==="capsule"?"flat-floor":"terrain";P.dataset.groundContact=x.grounded?x.activeRamp?x.activeRamp.kind:t:"airborne",P.dataset.aimRay=Sc?"locked":"searching",P.dataset.aimPoint=`${sn.x.toFixed(1)},${sn.y.toFixed(1)},${sn.z.toFixed(1)}`,P.dataset.vehiclePosition=`${x.position.x.toFixed(1)},${x.position.y.toFixed(1)},${x.position.z.toFixed(1)}`,P.dataset.surfaceLabel=i?.ramp.label??(J.arenaKind==="capsule"?"flat center floor":"base terrain"),P.dataset.surfaceHeight=(i?.height??e).toFixed(2),P.dataset.baseGroundHeight=e.toFixed(2),P.dataset.contactDelta=((i?.height??e)-e).toFixed(2),P.dataset.heightMismatch=i?Math.abs(x.position.y-.06-i.height).toFixed(3):"0.000",P.dataset.wallRideActive=String(i?.ramp.kind==="wall"),Br.position.set(x.position.x,(i?.height??e)+.16,x.position.z),ei.set(0,1,0).applyQuaternion(x.orientation).normalize(),Us.copy(x.position).addScaledVector(ei,.7);for(const o of[Ou,ku,Bu,No,Uo])o.position.copy(Us);Ou.setDirection(ei),ku.setDirection(x.surfaceNormal),Bu.setDirection(x.projectedForward);const n=x.velocity.length();No.setDirection(n>.01?x.velocity.clone().normalize():x.projectedForward),No.setLength(Ee.clamp(n*.24,1.2,7),.6,.3);const s=x.wallContactNormal.lengthSq()>.001;Uo.visible=Wi&&s,s&&Uo.setDirection(x.wallContactNormal);const r=J.arenaKind==="capsule"&&J.bowl?Gt(J.bowl,x.position.x,x.position.z):null,a=x.grounded?P.dataset.guardContact==="active"?"upper-lip":r&&r.progress>.001?r.band:"flat-floor":"airborne";P.dataset.surfaceType=a,P.dataset.carUp=`${ei.x.toFixed(2)},${ei.y.toFixed(2)},${ei.z.toFixed(2)}`,P.dataset.surfaceNormal=`${x.surfaceNormal.x.toFixed(2)},${x.surfaceNormal.y.toFixed(2)},${x.surfaceNormal.z.toFixed(2)}`,P.dataset.projectedForward=`${x.projectedForward.x.toFixed(2)},${x.projectedForward.y.toFixed(2)},${x.projectedForward.z.toFixed(2)}`,P.dataset.velocityVector=`${x.velocity.x.toFixed(2)},${x.velocity.y.toFixed(2)},${x.velocity.z.toFixed(2)}`,P.dataset.wallContactNormal=`${x.wallContactNormal.x.toFixed(2)},${x.wallContactNormal.y.toFixed(2)},${x.wallContactNormal.z.toFixed(2)}`,P.dataset.wallAssist=x.wallAssistActive?"active":"off",P.dataset.wallDownforce=x.downforce.toFixed(2),P.dataset.carRoll=x.roll.toFixed(3),P.dataset.carPitch=x.pitch.toFixed(3),ts&&x.activeRamp?.kind==="ramp"&&(P.dataset.rampDriveUp="passed"),ts&&!x.grounded&&P.dataset.rampDriveUp==="passed"&&(P.dataset.rampLaunch="passed")}const ag=new E(0,0,-28),og=new Hn,fp=new Hn;function cg(){ag.copy(x.position),og.copy(x.orientation)}function TT(i){Yt.position.lerpVectors(ag,x.position,i),fp.slerpQuaternions(og,x.orientation,i),Yt.quaternion.copy(fp)}function zs(i=!0){const e=J.spawn;on(!1),x.position.set(e.x,wt(e.x,e.z)+.06,e.z),x.heading=e.heading,x.speed=0,x.driftAngle=0,x.verticalVelocity=0,x.pitch=0,x.roll=0,x.grounded=!0,x.activeRamp=null,x.health=st.maxHealth,x.shield=ze?.roundShield??0,x.boost=100,x.orientation.setFromAxisAngle(rs,e.heading),x.surfaceNormal.copy(rs),x.projectedForward.set(Math.sin(e.heading),0,Math.cos(e.heading)),x.velocity.set(0,0,0),x.wallContactNormal.set(0,0,0),x.wallAssistActive=!1,x.downforce=0,cg(),Yt.position.copy(x.position),Yt.quaternion.copy(x.orientation),Ki.snapToChase(x.position,x.heading,Ci),P.dataset.roundShield=x.shield.toFixed(0),i&&Qt("RIG RECOVERED // SYSTEMS ONLINE")}function Yh(){const i=J.opponentSpawn;$.maxHealth=210*(1+Math.min(.6,(Ft-1)*.06)),$.position.set(i.x,wt(i.x,i.z)+.06,i.z),$.heading=i.heading,$.speed=0,$.health=$.maxHealth,$.fireCooldown=Math.max(.72,1.25-(Ft-1)*.025),$.collisionCooldown=0,$.burnTime=0,$.burnDps=0,$.burnFxCooldown=0,$.maneuverTimer=0,$.preferredDistance=24,$.speedMultiplier=1,$.weavePhase=Math.random()*Math.PI*2,$.weaveRate=1.5,It.visible=!0,It.position.copy($.position),It.rotation.y=$.heading,P.dataset.opponentHealth=String($.health),P.dataset.aiScaling=(1+Math.min(.6,(Ft-1)*.06)).toFixed(2),P.dataset.aiState="countdown-ready"}function oc(){ht="countdown",lm=performance.now()+ub*1e3,Uu=3,clearTimeout(Wu),V.message.classList.remove("show"),V.countdown.hidden=!1,V.countdownArena.textContent=J.name,V.countdownValue.textContent="3",V.countdown.querySelector("span").textContent="GET READY",P.dataset.roundPhase=ht}function ET(){if(ht!=="countdown")return;const i=Math.max(0,(lm-performance.now())/1e3),e=Math.max(0,Math.ceil(i-hb));e!==Uu&&(Uu=e,V.countdownValue.textContent=e>0?String(e):"DRIVE",V.countdown.querySelector("span").textContent=e>0?"GET READY":"FIGHT BACK"),i<=0&&(ht="active",V.countdown.hidden=!0,P.dataset.roundPhase=ht,P.dataset.aiState="hunting",Qt(`ROUND ${Ft} // ${J.name.toUpperCase()}`))}function lg(i){if(Zo)return;Zo=!0,ht="ended",on(!1),i==="player"?Qi=Math.min(3,Qi+1):As=Math.min(3,As+1),Na(),P.dataset.roundWinner=i,P.dataset.roundPhase=ht,V.countdown.hidden=!1,V.countdownValue.textContent=i==="player"?"WIN":"LOST",V.countdownArena.textContent=Qi>=3||As>=3?"MATCH COMPLETE":`ROUND ${Ft} COMPLETE`,V.countdown.querySelector("span").textContent="WAITING FOR BOTH DRIVERS",ts||_r||ca||la||ic||Fh||(clearTimeout(Xf),Xf=window.setTimeout(()=>{AT()},1500))}async function AT(){if(!(!ze||!ft)){ze.round=Ft,Da(),V.countdown.querySelector("span").textContent="YOU'RE READY // WAITING FOR RIVAL";try{await ft.markRoundComplete(_c(ze).map(i=>i.id),structuredClone(ze)),P.dataset.roundReady="submitted"}catch(i){ni(i)}}}function RT(){on(!1),rt.clear(),Ts.intensity=0;for(const i of Li)Bh(i.mesh,i.kind);Li.length=0;for(const i of ri)be.remove(i.mesh);for(ri.length=0;Ui.length;)kh(Ui.length-1);for(const i of[...be.children])ta.has(i)||be.remove(i);Cr.length=0,Ns.length=0,kr.length=0,Ni.length=0,es.length=0,Fs.length=0,Bn.length=0,Bn.push(...pm),P.dataset.roundWorldCleanup="complete"}async function CT(i=Ft+1){if(ht==="loading")return;const e=Qi>=3||As>=3,t=J.id==="dustring"?"ovalbowl":"dustring",n=Math.max(Ft+1,i);ht="loading",P.dataset.roundPhase=ht,P.dataset.seamlessTransition="loading",V.cardDraft.hidden=!0,V.countdown.hidden=!1,V.countdownValue.textContent="…",V.countdownArena.textContent="NEXT ARENA",V.countdown.querySelector("span").textContent="REBUILDING THE RING",Ua(),e&&(Qi=0,As=0),Ft=n,ze&&(ze.round=n,Da()),Na(),RT(),J=mc[t],An=J.radius,await gm(),await vm(),ym(),Mm(),J.targets.forEach(s=>Lm(s.x,s.z,s.rotation)),Ni.push(It),xm(),Zo=!1,zs(!1),Yh(),Tc(),P.dataset.targetsRemaining=String(J.targets.length),P.dataset.arenaLayout=J.id,P.dataset.arenaKind=J.arenaKind,P.dataset.arenaRadius=String(An),P.dataset.ringInnerRadius=String(J.ringInnerRadius),P.dataset.ringOuterRadius=String(J.ringOuterRadius),P.dataset.mapRotation="alternate-in-document",P.dataset.seamlessTransition="complete",oc()}function ug(i){an&&(si=i??!si,si&&on(!1),V.pause.hidden=!si)}function PT(i){V.controls.classList.toggle("closed",!0)}function LT(){an&&(Wi=!Wi,Bn.forEach(i=>i.visible=Wi),na.visible=Wi,V.debug.hidden=!Wi,Qt(Wi?`PHYSICS DEBUG // ${x.grounded?"GROUNDED":"AIRBORNE"}`:"PHYSICS DEBUG // OFF"))}function IT(){if(!an)return;const i=Ki.toggle($.health>0&&It.visible);Tc(),Qt(i.noTarget?"NO TARGET // CHASE CAM":i.mode==="enemy"?"ENEMY CAM // ON":"CHASE CAM // ON")}P.dataset.assetsLoaded="0";P.dataset.assetErrors="0";P.dataset.assetManifest="riggedAssetManifest";function DT(i){const e=new E(0,0,-i.length*.5-3).applyAxisAngle(new E(0,1,0),i.rotation),t=i.position.x+e.x,n=i.position.z+e.z;x.position.set(t,wt(t,n)+.06,n),x.heading=i.rotation,x.speed=0,x.driftAngle=0,x.verticalVelocity=0,x.pitch=0,x.roll=0,x.grounded=!0,x.activeRamp=null,x.orientation.setFromAxisAngle(rs,i.rotation),Yt.position.copy(x.position),Yt.quaternion.copy(x.orientation)}function NT(){const i=Cr.filter(n=>n.kind==="ramp"),e=[];let t=0;for(const n of i){DT(n);let s=!1,r=!1,a=!1;rt.add("KeyW");for(let o=0;o<600;o++)if(Pr+=Ht,Os(Ht),rg(),x.activeRamp?.label===n.label&&(s=!0),s&&!x.grounded&&(r=!0),r&&x.grounded&&x.activeRamp?.label!==n.label){a=!0;break}rt.delete("KeyW"),a&&t++,(!s||!r||!a)&&e.push(`${n.label}:${s?r?"no-landing":"no-launch":"no-contact"}`)}return P.dataset.allRampExpected=String(i.length),P.dataset.allRampPasses=String(i.length-e.length),P.dataset.allRampLandings=String(t),P.dataset.allRampFailures=e.join("|")||"none",P.dataset.rampDriveUp=e.some(n=>n.endsWith("no-contact"))?"failed":"passed",P.dataset.rampLaunch=e.some(n=>n.endsWith("no-launch"))?"failed":"passed",P.dataset.rampLanding=t===i.length?"passed":"failed",e.length===0}function UT(i){const e=i.outerRadius-i.flatRadius,t=i.flatRadius+e*.48,n=Math.PI*.25,s=[{label:"straight-along-bank",x:t,z:-30,heading:0,steps:180,drive:!1,steer:"none"},{label:"turn-left-while-climbing",x:i.flatRadius+2,z:-18,heading:Math.PI/2,steps:170,drive:!0,steer:"left"},{label:"turn-right-while-climbing",x:i.flatRadius+2,z:18,heading:Math.PI/2,steps:170,drive:!0,steer:"right"},{label:"steer-around-rounded-cap",x:Math.cos(n)*t,z:i.straightHalfLength+Math.sin(n)*t,heading:-n,steps:210,drive:!1,steer:"cap"}],r=[];let a=0,o=0,c=1;for(const u of s){x.position.set(u.x,wt(u.x,u.z)+.06,u.z),x.heading=u.heading,x.speed=u.drive?8:14,x.driftAngle=0,x.verticalVelocity=0,x.pitch=0,x.roll=0,x.grounded=!0,x.activeRamp=null,x.orientation.setFromAxisAngle(rs,u.heading);let h=0,d=0,f=0,m=1,_=!0,g=!0;u.drive&&rt.add("KeyW");for(let y=0;y<u.steps;y++){u.steer==="left"&&y>=34&&y<72?rt.add("KeyA"):rt.delete("KeyA"),u.steer==="right"&&y>=34&&y<72||u.steer==="cap"&&y%6===0?rt.add("KeyD"):rt.delete("KeyD"),Pr+=Ht,Os(Ht),u.steer==="cap"&&rt.delete("KeyD");const S=Gt(i,x.position.x,x.position.z);S.progress>.001&&h++,ei.set(0,1,0).applyQuaternion(x.orientation).normalize();const v=ei.dot(S.normal);y>18&&(m=Math.min(m,v)),d=Math.max(d,Math.abs(x.roll)),f=Math.max(f,Math.abs(x.pitch)),g=g&&Number.isFinite(x.position.x)&&Number.isFinite(x.position.y)&&Number.isFinite(x.position.z)&&Number.isFinite(x.roll)&&Number.isFinite(x.pitch);for(const R of[-Un,0,Un]){const A=Gt(i,x.position.x+Math.sin(x.heading)*R,x.position.z+Math.cos(x.heading)*R);_=_&&A.distance<=i.outerRadius-On+.05}}rt.delete("KeyW"),rt.delete("KeyA"),rt.delete("KeyD"),a=Math.max(a,d),o=Math.max(o,f),c=Math.min(c,m),g&&_&&h>=Math.min(90,u.steps*.6)&&d<=ji+.025&&f<=ji+.025&&m>.72||r.push(`${u.label}:${g?_?h<90?"lost-wall":d>ji+.025?"roll":f>ji+.025?"pitch":"up-vector":"escaped":"non-finite"}`)}const l=r.length===0;return P.dataset.wallTurningSmoke=l?"passed":"failed",P.dataset.wallTurningCases=String(s.length),P.dataset.wallTurningFailures=r.join("|")||"none",P.dataset.wallTurningMaxRoll=Ee.radToDeg(a).toFixed(1),P.dataset.wallTurningMaxPitch=Ee.radToDeg(o).toFixed(1),P.dataset.wallTurningMinUpDot=c.toFixed(3),l}function FT(){if(J.arenaKind!=="capsule"||!J.bowl)return P.dataset.wallRideSmoke="skipped-non-bowl",!0;const i=J.bowl,e=[{label:"east-straight",x:i.flatRadius-5,z:0,heading:Math.PI/2},{label:"east-diagonal",x:i.flatRadius-5,z:-14,heading:Math.PI/2-.34},{label:"north-cap",x:0,z:i.straightHalfLength+i.flatRadius-5,heading:0},{label:"north-cap-diagonal",x:-14,z:i.straightHalfLength+i.flatRadius-5,heading:.34}],t=[];let n=0,s=0,r=!0,a=!0;for(const u of e){x.position.set(u.x,wt(u.x,u.z)+.06,u.z),x.heading=u.heading,x.speed=8,x.driftAngle=0,x.verticalVelocity=0,x.pitch=0,x.roll=0,x.grounded=!0,x.activeRamp=null,x.orientation.setFromAxisAngle(rs,u.heading);let h=0,d=0,f=!1;rt.add("KeyW");for(let p=0;p<210;p++){Pr+=Ht,Os(Ht);const y=Gt(i,x.position.x,x.position.z);h=Math.max(h,y.progress),d=Math.max(d,x.position.y),n=Math.max(n,h),s=Math.max(s,d),f=f||y.progress>.001;for(const S of[-Un,0,Un]){const v=Gt(i,x.position.x+Math.sin(x.heading)*S,x.position.z+Math.cos(x.heading)*S);r=r&&v.distance<=i.outerRadius-On+.05}}const m=Gt(i,x.position.x,x.position.z);x.heading=Math.atan2(-m.outwardX,-m.outwardZ),x.driftAngle=0,x.speed=Math.max(7,Math.abs(x.speed));for(let p=0;p<180;p++)Pr+=Ht,Os(Ht);rt.delete("KeyW");const g=Gt(i,x.position.x,x.position.z).progress<.08&&x.grounded;a=a&&g,(!f||h<=.28||d<=2||!g)&&t.push(`${u.label}:${f?h<=.28?"too-low":d<=2?"no-rise":"no-return":"no-contact"}`)}const o=UT(i);let c=t.length===0&&r&&a&&o;P.dataset.wallRideApproaches=String(e.length),P.dataset.wallRideFailures=t.join("|")||"none",P.dataset.wallRideMaxProgress=n.toFixed(2),P.dataset.wallRideMaxHeight=s.toFixed(2),P.dataset.wallRideBoundary=r?"passed":"failed",P.dataset.wallRideReturn=a?"passed":"failed",zs(),ei.set(0,1,0).applyQuaternion(x.orientation);const l=x.position.x===J.spawn.x&&x.position.z===J.spawn.z&&x.speed===0&&x.velocity.lengthSq()===0&&x.verticalVelocity===0&&x.pitch===0&&x.roll===0&&ei.dot(rs)>.999&&x.grounded&&!x.wallAssistActive&&Gt(i,x.position.x,x.position.z).progress===0;return P.dataset.wallReset=l?"passed":"failed",c=c&&l,P.dataset.wallRideSmoke=c?"passed":"failed",c}function OT(){let i=!0;if((ts||_r)&&(i=NT()&&i),(ts||_r)&&(P.dataset.physicsSmoke=i?"passed":"failed"),ca&&(P.dataset.physicsSmoke=FT()?"passed":"failed"),la){sn.copy(x.position).add(new E(0,1,40)),Sc=!0,Yt.updateMatrixWorld(!0),on(!0);for(let n=0;n<120;n++)eg(Ht);on(!1);const e=Number(P.dataset.shotsFired??0),t=Math.ceil(2*_n.fireRate)+1;P.dataset.holdFireSmoke=e>=2&&e<=t?"passed":"failed",P.dataset.fireRateLimited=e<=t?"passed":"failed",P.dataset.holdFireShots=String(e)}if(ic){x.boost=100,rt.add("KeyW"),rt.add("ShiftLeft");for(let n=0;n<60;n++)Os(Ht);const e=x.boost;rt.delete("ShiftLeft");for(let n=0;n<60;n++)Os(Ht);const t=x.boost;rt.clear(),P.dataset.boostAfterUse=e.toFixed(1),P.dataset.boostAfterRecharge=t.toFixed(1),P.dataset.boostSmoke=e<80&&t>e&&t<95?"passed":"failed",zs()}Fh&&(ht="active",Aa(999),P.dataset.roundHudSmoke=Qi===1&&P.dataset.roundWinner==="player"?"passed":"failed")}function ni(i){const e=i instanceof Error?i.message:"Multiplayer connection failed.";V.roomStatus.textContent=e,Qt(e.toUpperCase())}function kT(i){if(!i){V.roomEntry.hidden=!1,V.roomWaiting.hidden=!0,V.addAI.hidden=!0;return}const e=Bs(i),t=i.phase==="lobby";V.multiplayerLobby.hidden=!t,V.roomEntry.hidden=!0,V.roomWaiting.hidden=!1,V.roomCodeDisplay.textContent=i.code;const n=e.map(r=>{const a=document.createElement("div");a.className="room-player";const o=document.createElement("b");o.textContent=r.name;const c=document.createElement("span");return c.textContent=r.id===i.hostId?"HOST // PICKS FIRST":r.isAI?"AI RIVAL // PICKS SECOND":"RIVAL // PICKS SECOND",a.append(o,c),a});if(e.length<2){const r=document.createElement("div");r.className="room-player room-player--empty";const a=document.createElement("b");a.textContent="OPEN SEAT";const o=document.createElement("span");o.textContent="SHARE THE ROOM CODE",r.append(a,o),n.push(r)}V.roomPlayers.replaceChildren(...n);const s=ft?.isHost()===!0&&e.length===2;V.addAI.hidden=ft?.isHost()!==!0||e.length>=2,V.addAI.disabled=!t,V.startRun.disabled=!s,V.startRun.textContent=s?"START SHARED RUN":ft?.isHost()?"WAITING FOR RIVAL":"WAITING FOR HOST",V.roomStatus.textContent=e.length<2?"Room ready. Invite a friend or add an AI rival.":s?"Both drivers connected. Launch when ready.":"Both drivers connected. Waiting for the host."}function Es(i){const e=Bs(i).find(n=>n.isAI);if(!e||i.activePickerId!==e.id||ft?.isHost()!==!0||wl||!["starter_draft","vehicle_select","upgrade_draft"].includes(i.phase))return;wl=!0;const t=i.pickSequence;window.setTimeout(async()=>{try{if(!ft||!Ve||Ve.pickSequence!==t||Ve.activePickerId!==e.id)return;const n=Ve.draftOptions;if(!n.length)return;const s=Ve.phase==="starter_draft"?["sniper","rocket","mg"].find(c=>n.includes(c))??n[0]:n[Math.floor(Math.random()*n.length)];if(Ve.phase==="vehicle_select"){Tm(s)&&await ft.submitAiVehiclePick(s,ci[s].label);return}if(Ve.phase==="starter_draft"){const c=s,l=Ve.runState?structuredClone(Ve.runState):Rh(c,Ft);Ve.runState&&Ko(l,gc(c));const u=Ve.draftTurn===0?["mg","rocket","sniper"].filter(h=>h!==c):Object.keys(ci);await ft.submitAiPick({optionId:c,optionName:Vh[c],nextRunState:l,nextOptions:u});return}if(!ze)return;const r=sg(n,ze).find(c=>c.id===s);if(!r)return;const a=structuredClone(ze);Ko(a,r),a.round=Ft;const o=Ve.draftTurn===0?_c(a).map(c=>c.id):[];await ft.submitAiPick({optionId:r.id,optionName:r.name,nextRunState:a,nextOptions:o})}catch(n){ni(n)}finally{wl=!1}},lT)}function BT(i){i.runState&&(ze=structuredClone(i.runState),Da(),Et=ze.activeTurret,an&&(Fo(),ss(Et,!1),Gh()),P.dataset.runState="shared",P.dataset.roomCode=i.code)}function zT(i){if(!ft)return;const e=i.vehicleSelections?.[ft.playerId];!Tm(e)||e===ba||(ba=e,an&&Am(e))}function hg(i){const e=V.starterSelect.hidden?V.vehicleSelect.hidden?"upgrade":"vehicle":"starter",t=e==="starter"?V.starterGrid:e==="vehicle"?V.vehicleGrid:V.cardGrid,n=e==="starter"?V.starterPickReveal:e==="vehicle"?V.vehiclePickReveal:V.draftPickReveal,s=Ve?Bs(Ve).find(r=>r.id===i.playerId):null;uT(t,i.optionId),n.textContent=`${s?.name??"Driver"} picked ${i.optionName}`,n.hidden=!1,Lh=!0,P.dataset.pickAnimation="deck-shuffle",P.dataset.lastCardChosen=i.optionId,window.setTimeout(dg,cT)}function dg(){Lh=!1;const i=Ve;if(!i)return;if(i.phase==="starter_draft"){wc(),Es(i);return}if(i.phase==="vehicle_select"){bc(),Es(i);return}if(i.phase==="upgrade_draft"){qh(),Es(i);return}if(i.phase!=="playing"||i.round<=Io)return;V.starterSelect.hidden=!0,V.vehicleSelect.hidden=!0,V.cardDraft.hidden=!0,V.weaponSelect.classList.remove("draft-open"),P.dataset.starterSelection="complete",P.dataset.vehicleSelection="complete",P.dataset.cardApplied="true",Ua();const e=Io===0;Io=i.round,e?(Ft=i.round,Na(),zs(!1),Yh(),oc()):CT(i.round)}function fg(i){if(Ve=i,kT(i),!i)return;if(BT(i),zT(i),Es(i),i.lastPick&&i.lastPick.id>qf){qf=i.lastPick.id,an&&hg(i.lastPick);return}if(!(!an||Lh)){if(i.phase==="starter_draft"){wc(),Es(i);return}if(i.phase==="vehicle_select"){bc(),Es(i);return}if(i.phase==="upgrade_draft"){qh(),Es(i);return}i.phase==="playing"&&i.round>Io&&dg()}}async function HT(){const i=localStorage.getItem("rigged-player-name")??"";V.playerName.value=i;const e=Nu(new URLSearchParams(location.search).get("room")??"");e&&(V.roomCodeInput.value=e),V.hostRoom.disabled=!0,V.startRun.disabled=!0;try{ft=await Ch.connect(),ft.onRoom(fg),V.hostRoom.disabled=!1,V.roomStatus.textContent="Firebase online. Host a room or join a friend."}catch(t){ni(t),V.roomStatus.textContent="Could not connect to Firebase. Check the network and reload.";return}V.hostRoom.addEventListener("click",async()=>{if(!ft)return;V.hostRoom.disabled=!0;const t=jo(V.playerName.value);localStorage.setItem("rigged-player-name",t);try{const n=await ft.createRoom(t),s=new URL(location.href);s.searchParams.set("room",n),history.replaceState(null,"",s),sessionStorage.removeItem($o),ze=null}catch(n){ni(n),V.hostRoom.disabled=!1}}),V.joinRoomForm.addEventListener("submit",async t=>{if(t.preventDefault(),!ft)return;const n=V.joinRoomForm.querySelector("button");n.disabled=!0;const s=jo(V.playerName.value);localStorage.setItem("rigged-player-name",s);try{const r=await ft.joinRoom(V.roomCodeInput.value,s),a=new URL(location.href);a.searchParams.set("room",r),history.replaceState(null,"",a),sessionStorage.removeItem($o),ze=null}catch(r){ni(r),n.disabled=!1}}),V.startRun.addEventListener("click",()=>ft?.startRun().catch(ni)),V.addAI.addEventListener("click",()=>{V.addAI.disabled=!0,ft?.addAI().catch(t=>{ni(t),V.addAI.disabled=!1})}),V.roomCodeDisplay.addEventListener("click",()=>{Ve&&(navigator.clipboard?.writeText(Ve.code).catch(()=>{}),V.roomStatus.textContent="Room code copied.")}),V.roomCodeInput.addEventListener("input",()=>{V.roomCodeInput.value=Nu(V.roomCodeInput.value)})}async function VT(i){if(an||Tl)return;Tl=!0,ta.size===0&&(be.children.forEach(t=>ta.add(t)),Bn.forEach(t=>pm.add(t))),J=mc[i],An=J.radius,Qt(`ASSEMBLING // ${J.name.toUpperCase()}`),document.querySelectorAll("[data-level]").forEach(t=>t.disabled=!0),await gm(),await vm(),ym(),Mm(),Cb(),Pb(),ta.add(Yt),ta.add(It),Fo(),J.targets.forEach(t=>Lm(t.x,t.z,t.rotation)),Zo=!1,Na(),P.dataset.targetsRemaining=String(J.targets.length),P.dataset.prototype="rigged-1v1-combat",P.dataset.audioSystem="pooled-stereo-combat-sfx-v3",P.dataset.arenaLayout=J.id,P.dataset.arenaKind=J.arenaKind,P.dataset.arenaRadius=String(An),P.dataset.ringInnerRadius=String(J.ringInnerRadius),P.dataset.ringOuterRadius=String(J.ringOuterRadius),P.dataset.rampColliders=String(Cr.filter(t=>t.kind==="ramp").length),P.dataset.bridgeColliders=String(Cr.filter(t=>t.kind==="bridge").length),P.dataset.heightfieldColliders=String(es.length),P.dataset.majorColliders=String(Ns.length+kr.length+(J.arenaKind==="capsule"?3:0)),P.dataset.vehicleCollider="three-disc-capsule-2.24x4.14x0.72",P.dataset.shotsFired="0",P.dataset.aiShotsFired="0",P.dataset.fireHeld="false",P.dataset.arenaDrops="disabled",P.dataset.racekartAssets="modular-racekart-track-hilly",P.dataset.racingAssetsUsage=J.arenaKind==="capsule"?"rim-railings":"ramps-fences-props",P.dataset.colliderSource=J.arenaKind==="capsule"?"analytic-capsule-bands":"visual-asset-heightfields",P.dataset.wallRideContact="pending",P.dataset.mapRotation="alternate-in-document",xm(),await tT(),an=!0,Tl=!1,si=!1,zs(!1),Yh(),Tc();const e=ts||_r||ca||la||ic||Fh;if(e&&(V.multiplayerLobby.hidden=!0),e&&!ze)ze=Rh("mg",Ft),Et="mg",Da(),Fo(),ss("mg",!1),oc();else if(e&&ze)Et=ze.activeTurret,Fo(),ss(Et,!1),oc();else if(Mc){const t=Xu?"rival":"preview-player";Ve={code:"DECK",hostId:"preview-player",phase:"starter_draft",round:1,players:{"preview-player":{name:"Preview Driver",joinedAt:1},rival:{name:"Rival Driver",joinedAt:2}},playerOrder:["preview-player","rival"],activePickerId:t,draftOptions:["mg","rocket","sniper"],draftTurn:Xu?1:0,pickSequence:0,lastPick:null,vehicleSelections:{},roundReady:{},runState:null,createdAt:1,updatedAt:1},V.multiplayerLobby.hidden=!0,wc(),window.setTimeout(()=>hg({playerId:t,optionId:"rocket",optionName:"HELLBOX"}),1700)}else Oh?(Ve={code:"PREVIEW",hostId:"preview-player",phase:"vehicle_select",round:1,players:{"preview-player":{name:"Preview Driver",joinedAt:1},rival:{name:"Rival Driver",joinedAt:2}},playerOrder:["preview-player","rival"],activePickerId:"preview-player",draftOptions:Object.keys(ci),draftTurn:0,pickSequence:0,lastPick:null,vehicleSelections:{},roundReady:{},runState:null,createdAt:1,updatedAt:1},V.multiplayerLobby.hidden=!0,bc()):Ve&&fg(Ve);Or.get("auto")==="1"&&ze&&Ua(),OT(),ht!=="ended"&&(ts||_r||ca||la||ic)&&Qt(ts?"RAMP SUITE // AUTO DRIVE":_r?"ALL RAMPS // AUTO DRIVE":ca?"WALL-RIDE SUITE // AUTO DRIVE":la?"HOLD-FIRE SMOKE TEST // COMPLETE":"BOOST STAMINA TEST // COMPLETE")}document.querySelectorAll("[data-weapon]").forEach(i=>{i.addEventListener("click",()=>ss(i.dataset.weapon))});document.querySelectorAll("[data-starter-turret]").forEach(i=>{i.addEventListener("click",()=>{hT(i.dataset.starterTurret)})});ss("mg",!1);Na();const Bl=new URLSearchParams(location.search).get("level");!Oh&&!Mc&&HT();VT(Bl&&Bl in mc?Bl:am);window.addEventListener("keydown",i=>{if(["KeyW","KeyA","KeyS","KeyD","Space","ShiftLeft","KeyC","KeyF","F3","Digit1","Digit2","Digit3"].includes(i.code)&&i.preventDefault(),!(i.repeat||!an)){if(i.code==="Escape"){ug();return}if(i.code==="KeyC"){IT();return}if(i.code.startsWith("Digit")){const e=["mg","rocket","sniper"][Number(i.code.slice(5))-1];e&&ss(e);return}i.code==="KeyR"&&zs(),(i.code==="KeyB"||i.code==="KeyH"||i.code==="F3")&&LT(),i.code==="KeyF"&&on(!0),rt.add(i.code)}});window.addEventListener("keyup",i=>{rt.delete(i.code),i.code==="KeyF"&&on(!1)});P.addEventListener("pointermove",i=>{const e=P.getBoundingClientRect();Yu.x=(i.clientX-e.left)/e.width*2-1,Yu.y=-(i.clientY-e.top)/e.height*2+1;const t=Le("crosshair");t.style.left=`${i.clientX}px`,t.style.top=`${i.clientY}px`});P.addEventListener("pointerdown",i=>{i.button===0&&on(!0)});window.addEventListener("pointerup",i=>{i.button===0&&on(!1)});P.addEventListener("pointerleave",i=>{i.buttons&1&&on(!1)});P.addEventListener("wheel",i=>{i.preventDefault(),mT(i.deltaY>0?1:-1)},{passive:!1});window.addEventListener("blur",()=>{rt.clear(),on(!1)});document.addEventListener("visibilitychange",()=>{document.hidden&&(rt.clear(),on(!1))});window.addEventListener("keydown",Ua,{capture:!0});window.addEventListener("pointerdown",Ua,{capture:!0});P.addEventListener("contextmenu",i=>i.preventDefault());Le("controls-close").addEventListener("click",()=>PT());Le("resume-button").addEventListener("click",()=>ug(!1));document.querySelectorAll("[data-key]").forEach(i=>{const e=i.dataset.key??"",t=s=>{s.preventDefault(),e==="Fire"?on(!0):rt.add(e)},n=s=>{s.preventDefault(),e==="Fire"?on(!1):rt.delete(e)};i.addEventListener("pointerdown",t),i.addEventListener("pointerup",n),i.addEventListener("pointercancel",n),i.addEventListener("pointerleave",n)});window.addEventListener("resize",()=>{pn.aspect=innerWidth/innerHeight,pn.updateProjectionMatrix(),yn.setSize(innerWidth,innerHeight,!1),yn.setPixelRatio(Math.min(devicePixelRatio,um))});const GT=new ov;let xs=0,zl=0,Hl=0,sr=1/60,$u=0;function WT(i){if(!Wi||(sr=Ee.lerp(sr,i,.08),Hl+=i,Hl<.2))return;Hl=0;const e=sr>0?1/sr:0,t=x.grounded?x.activeRamp?x.activeRamp.kind.toUpperCase():J.arenaKind==="capsule"?"FLAT FLOOR":"TERRAIN":"AIRBORNE",n=J.arenaKind==="capsule"?3:es.length;V.debug.textContent=`COLLISION DEBUG
${t} // ${(P.dataset.surfaceType??"flat-floor").toUpperCase()} // ${P.dataset.surfaceLabel??"base terrain"}
UP [${P.dataset.carUp??"0.00,1.00,0.00"}]  NORMAL [${P.dataset.surfaceNormal??"0.00,1.00,0.00"}]
SURFACE FWD [${P.dataset.projectedForward??"0.00,0.00,1.00"}]
VELOCITY [${P.dataset.velocityVector??"0.00,0.00,0.00"}]  CONTACT N [${P.dataset.wallContactNormal??"0.00,0.00,0.00"}]
ASSIST ${(P.dataset.wallAssist??"off").toUpperCase()}  DOWNFORCE ${P.dataset.wallDownforce??"0.00"}  ROLL ${Ee.radToDeg(x.roll).toFixed(1)}°  PITCH ${Ee.radToDeg(x.pitch).toFixed(1)}°
SURFACE ${P.dataset.surfaceHeight??"0.00"}M  BASE ${P.dataset.baseGroundHeight??"0.00"}M  ERROR ${P.dataset.heightMismatch??"0.000"}M
${Math.abs(x.speed*4.2).toFixed(0)} KM/H  ${e.toFixed(0)} FPS  ${(sr*1e3).toFixed(1)} MS FRAME
${$u.toFixed(2)} MS PHYSICS  60 HZ  ${n} COLLIDERS
${yn.info.render.calls} DRAWS  ${yn.info.render.triangles.toLocaleString()} TRIS  ${be.children.length+Li.length+ri.length} OBJECTS`,P.dataset.physicsFps="60",P.dataset.frameDeltaMs=(sr*1e3).toFixed(2),P.dataset.physicsStepMs=$u.toFixed(2)}function pg(){requestAnimationFrame(pg);const i=Math.min(GT.getDelta(),Sb);if(!si&&an&&ET(),yc.rotation.y+=i*.0025,Nh.rotation.y-=i*.0015,Gb(i),!si&&an){if(ht==="active"){xs=Math.min(xs+i,Ht*jf);const e=performance.now();let t=0;for(;xs>=Ht&&t<jf;)cg(),Pr+=Ht,Os(Ht),xT(Ht),eg(Ht),up(Ht),xs-=Ht,t++;$u=performance.now()-e,TT(xs/Ht)}else xs=0,ht==="ended"&&up(i);bT(i),dp(),yT(i),zl+=i,zl>.1&&(zl=0,rg())}else xs=0;(!an||si)&&dp(),yn.render(be,pn),WT(i)}pg();function Le(i){const e=document.getElementById(i);if(!e)throw new Error(`Missing #${i}`);return e}
