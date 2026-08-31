(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Eh="179",d0=0,Dd=1,f0=2,Ah=1,p0=2,Li=3,mi=0,yn=1,Xt=2,ss=0,gr=1,Lr=2,Nd=3,Ud=4,m0=5,Ds=100,g0=101,_0=102,v0=103,x0=104,y0=200,M0=201,S0=202,w0=203,fu=204,pu=205,b0=206,T0=207,E0=208,A0=209,R0=210,C0=211,P0=212,L0=213,I0=214,mu=0,gu=1,_u=2,Ir=3,vu=4,xu=5,yu=6,Mu=7,Rh=0,D0=1,N0=2,rs=0,U0=1,F0=2,O0=3,$p=4,k0=5,B0=6,z0=7,Fd="attached",H0="detached",Zp=300,Dr=301,Nr=302,dc=303,Su=304,Pc=306,us=1e3,ts=1001,fc=1002,pn=1003,Jp=1004,ha=1005,Rn=1006,Yo=1007,Di=1008,gi=1009,Qp=1010,em=1011,Ta=1012,Ch=1013,zs=1014,ti=1015,Ya=1016,Ph=1017,Lh=1018,Ea=1020,tm=35902,nm=1021,im=1022,Bn=1023,Aa=1026,Ra=1027,Ih=1028,Dh=1029,sm=1030,Nh=1031,Uh=1033,Ko=33776,jo=33777,$o=33778,Zo=33779,wu=35840,bu=35841,Tu=35842,Eu=35843,Au=36196,Ru=37492,Cu=37496,Pu=37808,Lu=37809,Iu=37810,Du=37811,Nu=37812,Uu=37813,Fu=37814,Ou=37815,ku=37816,Bu=37817,zu=37818,Hu=37819,Vu=37820,Gu=37821,Jo=36492,Wu=36494,Xu=36495,rm=36283,qu=36284,Yu=36285,Ku=36286,Ca=2300,Pa=2301,tl=2302,Od=2400,kd=2401,Bd=2402,V0=2500,G0=0,am=1,ju=2,W0=3200,X0=3201,Fh=0,q0=1,es="",At="srgb",gn="srgb-linear",pc="linear",_t="srgb",$s=7680,zd=519,Y0=512,K0=513,j0=514,om=515,$0=516,Z0=517,J0=518,Q0=519,$u=35044,Hd="300 es",hi=2e3,mc=2001;class Gr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Vd=1234567;const _a=Math.PI/180,Ur=180/Math.PI;function Vn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]+"-"+nn[e&255]+nn[e>>8&255]+"-"+nn[e>>16&15|64]+nn[e>>24&255]+"-"+nn[t&63|128]+nn[t>>8&255]+"-"+nn[t>>16&255]+nn[t>>24&255]+nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]).toLowerCase()}function Je(i,e,t){return Math.max(e,Math.min(t,i))}function Oh(i,e){return(i%e+e)%e}function e_(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function t_(i,e,t){return i!==e?(t-i)/(e-i):0}function va(i,e,t){return(1-t)*i+t*e}function n_(i,e,t,n){return va(i,e,1-Math.exp(-t*n))}function i_(i,e=1){return e-Math.abs(Oh(i,e*2)-e)}function s_(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function r_(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function a_(i,e){return i+Math.floor(Math.random()*(e-i+1))}function o_(i,e){return i+Math.random()*(e-i)}function c_(i){return i*(.5-Math.random())}function l_(i){i!==void 0&&(Vd=i);let e=Vd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function u_(i){return i*_a}function h_(i){return i*Ur}function d_(i){return(i&i-1)===0&&i!==0}function f_(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function p_(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function m_(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),m=a((n-e)/2);switch(s){case"XYX":i.set(o*u,c*h,c*d,o*l);break;case"YZY":i.set(c*d,o*u,c*h,o*l);break;case"ZXZ":i.set(c*h,c*d,o*u,o*l);break;case"XZX":i.set(o*u,c*m,c*f,o*l);break;case"YXY":i.set(c*f,o*u,c*m,o*l);break;case"ZYZ":i.set(c*m,c*f,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Jn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Re={DEG2RAD:_a,RAD2DEG:Ur,generateUUID:Vn,clamp:Je,euclideanModulo:Oh,mapLinear:e_,inverseLerp:t_,lerp:va,damp:n_,pingpong:i_,smoothstep:s_,smootherstep:r_,randInt:a_,randFloat:o_,randFloatSpread:c_,seededRandom:l_,degToRad:u_,radToDeg:h_,isPowerOfTwo:d_,ceilPowerOfTwo:f_,floorPowerOfTwo:p_,setQuaternionFromProperEuler:m_,normalize:pt,denormalize:Jn};class he{constructor(e=0,t=0){he.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3];const d=r[a+0],f=r[a+1],m=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=_;return}if(h!==_||c!==d||l!==f||u!==m){let g=1-o;const p=c*d+l*f+u*m+h*_,y=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const P=Math.sqrt(S),A=Math.atan2(P,p*y);g=Math.sin(g*A)/P,o=Math.sin(o*A)/P}const v=o*y;if(c=c*g+d*v,l=l*g+f*v,u=u*g+m*v,h=h*g+_*v,g===1-o){const P=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=P,l*=P,u*=P,h*=P}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[a],d=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+u*h+c*f-l*d,e[t+1]=c*m+u*d+l*h-o*f,e[t+2]=l*m+u*f+o*d-c*h,e[t+3]=u*m-o*h-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),h=o(r/2),d=c(n/2),f=c(s/2),m=c(r/2);switch(a){case"XYZ":this._x=d*u*h+l*f*m,this._y=l*f*h-d*u*m,this._z=l*u*m+d*f*h,this._w=l*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+l*f*m,this._y=l*f*h-d*u*m,this._z=l*u*m-d*f*h,this._w=l*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-l*f*m,this._y=l*f*h+d*u*m,this._z=l*u*m+d*f*h,this._w=l*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-l*f*m,this._y=l*f*h+d*u*m,this._z=l*u*m-d*f*h,this._w=l*u*h+d*f*m;break;case"YZX":this._x=d*u*h+l*f*m,this._y=l*f*h+d*u*m,this._z=l*u*m-d*f*h,this._w=l*u*h-d*f*m;break;case"XZY":this._x=d*u*h-l*f*m,this._y=l*f*h-d*u*m,this._z=l*u*m+d*f*h,this._w=l*u*h+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-t)*u)/l,d=Math.sin(t*u)/l;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class E{constructor(e=0,t=0,n=0){E.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Gd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Gd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),u=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=s+c*h+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return nl.copy(this).projectOnVector(e),this.sub(nl)}reflect(e){return this.sub(nl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const nl=new E,Gd=new Xn;class Ke{constructor(e,t,n,s,r,a,o,c,l){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],f=n[5],m=n[8],_=s[0],g=s[3],p=s[6],y=s[1],S=s[4],v=s[7],P=s[2],A=s[5],L=s[8];return r[0]=a*_+o*y+c*P,r[3]=a*g+o*S+c*A,r[6]=a*p+o*v+c*L,r[1]=l*_+u*y+h*P,r[4]=l*g+u*S+h*A,r[7]=l*p+u*v+h*L,r[2]=d*_+f*y+m*P,r[5]=d*g+f*S+m*A,r[8]=d*p+f*v+m*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,d=o*c-u*r,f=l*r-a*c,m=t*h+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=h*_,e[1]=(s*l-u*n)*_,e[2]=(o*n-s*a)*_,e[3]=d*_,e[4]=(u*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(il.makeScale(e,t)),this}rotate(e){return this.premultiply(il.makeRotation(-e)),this}translate(e,t){return this.premultiply(il.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const il=new Ke;function cm(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function La(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function g_(){const i=La("canvas");return i.style.display="block",i}const Wd={};function _r(i){i in Wd||(Wd[i]=!0,console.warn(i))}function __(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Xd=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qd=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function v_(){const i={enabled:!0,workingColorSpace:gn,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===_t&&(s.r=Ui(s.r),s.g=Ui(s.g),s.b=Ui(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===_t&&(s.r=vr(s.r),s.g=vr(s.g),s.b=vr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===es?pc:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return _r("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return _r("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[gn]:{primaries:e,whitePoint:n,transfer:pc,toXYZ:Xd,fromXYZ:qd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:At},outputColorSpaceConfig:{drawingBufferColorSpace:At}},[At]:{primaries:e,whitePoint:n,transfer:_t,toXYZ:Xd,fromXYZ:qd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:At}}}),i}const tt=v_();function Ui(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function vr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Zs;class x_{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Zs===void 0&&(Zs=La("canvas")),Zs.width=e.width,Zs.height=e.height;const s=Zs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Zs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=La("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ui(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ui(t[n]/255)*255):t[n]=Ui(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let y_=0;class kh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:y_++}),this.uuid=Vn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(sl(s[a].image)):r.push(sl(s[a]))}else r=sl(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function sl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?x_.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let M_=0;const rl=new E;class Qt extends Gr{constructor(e=Qt.DEFAULT_IMAGE,t=Qt.DEFAULT_MAPPING,n=ts,s=ts,r=Rn,a=Di,o=Bn,c=gi,l=Qt.DEFAULT_ANISOTROPY,u=es){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:M_++}),this.uuid=Vn(),this.name="",this.source=new kh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(rl).x}get height(){return this.source.getSize(rl).y}get depth(){return this.source.getSize(rl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Zp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case us:e.x=e.x-Math.floor(e.x);break;case ts:e.x=e.x<0?0:1;break;case fc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case us:e.y=e.y-Math.floor(e.y);break;case ts:e.y=e.y<0?0:1;break;case fc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=Zp;Qt.DEFAULT_ANISOTROPY=1;class ht{constructor(e=0,t=0,n=0,s=1){ht.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,v=(f+1)/2,P=(p+1)/2,A=(u+d)/4,L=(h+_)/4,D=(m+g)/4;return S>v&&S>P?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=A/n,r=L/n):v>P?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=A/s,r=D/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=L/r,s=D/r),this.set(n,s,r,t),this}let y=Math.sqrt((g-m)*(g-m)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(h-_)/y,this.z=(d-u)/y,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class S_ extends Gr{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ht(0,0,e,t),this.scissorTest=!1,this.viewport=new ht(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new Qt(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Rn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new kh(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Hs extends S_{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class lm extends Qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=pn,this.minFilter=pn,this.wrapR=ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class w_ extends Qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=pn,this.minFilter=pn,this.wrapR=ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ln{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Yn):Yn.fromBufferAttribute(r,a),Yn.applyMatrix4(e.matrixWorld),this.expandByPoint(Yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ro.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ro.copy(n.boundingBox)),ro.applyMatrix4(e.matrixWorld),this.union(ro)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yn),Yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ea),ao.subVectors(this.max,ea),Js.subVectors(e.a,ea),Qs.subVectors(e.b,ea),er.subVectors(e.c,ea),Vi.subVectors(Qs,Js),Gi.subVectors(er,Qs),Ss.subVectors(Js,er);let t=[0,-Vi.z,Vi.y,0,-Gi.z,Gi.y,0,-Ss.z,Ss.y,Vi.z,0,-Vi.x,Gi.z,0,-Gi.x,Ss.z,0,-Ss.x,-Vi.y,Vi.x,0,-Gi.y,Gi.x,0,-Ss.y,Ss.x,0];return!al(t,Js,Qs,er,ao)||(t=[1,0,0,0,1,0,0,0,1],!al(t,Js,Qs,er,ao))?!1:(oo.crossVectors(Vi,Gi),t=[oo.x,oo.y,oo.z],al(t,Js,Qs,er,ao))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Si=[new E,new E,new E,new E,new E,new E,new E,new E],Yn=new E,ro=new Ln,Js=new E,Qs=new E,er=new E,Vi=new E,Gi=new E,Ss=new E,ea=new E,ao=new E,oo=new E,ws=new E;function al(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ws.fromArray(i,r);const o=s.x*Math.abs(ws.x)+s.y*Math.abs(ws.y)+s.z*Math.abs(ws.z),c=e.dot(ws),l=t.dot(ws),u=n.dot(ws);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const b_=new Ln,ta=new E,ol=new E;class vi{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):b_.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ta.subVectors(e,this.center);const t=ta.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ta,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ol.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ta.copy(e.center).add(ol)),this.expandByPoint(ta.copy(e.center).sub(ol))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const wi=new E,cl=new E,co=new E,Wi=new E,ll=new E,lo=new E,ul=new E;class Ka{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,wi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=wi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(wi.copy(this.origin).addScaledVector(this.direction,t),wi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){cl.copy(e).add(t).multiplyScalar(.5),co.copy(t).sub(e).normalize(),Wi.copy(this.origin).sub(cl);const r=e.distanceTo(t)*.5,a=-this.direction.dot(co),o=Wi.dot(this.direction),c=-Wi.dot(co),l=Wi.lengthSq(),u=Math.abs(1-a*a);let h,d,f,m;if(u>0)if(h=a*c-o,d=a*o-c,m=r*u,h>=0)if(d>=-m)if(d<=m){const _=1/u;h*=_,d*=_,f=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d<=-m?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l):d<=m?(h=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(cl).addScaledVector(co,d),f}intersectSphere(e,t){wi.subVectors(e.center,this.origin);const n=wi.dot(this.direction),s=wi.dot(wi)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,wi)!==null}intersectTriangle(e,t,n,s,r){ll.subVectors(t,e),lo.subVectors(n,e),ul.crossVectors(ll,lo);let a=this.direction.dot(ul),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Wi.subVectors(this.origin,e);const c=o*this.direction.dot(lo.crossVectors(Wi,lo));if(c<0)return null;const l=o*this.direction.dot(ll.cross(Wi));if(l<0||c+l>a)return null;const u=-o*Wi.dot(ul);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Xe{constructor(e,t,n,s,r,a,o,c,l,u,h,d,f,m,_,g){Xe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,u,h,d,f,m,_,g)}set(e,t,n,s,r,a,o,c,l,u,h,d,f,m,_,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/tr.setFromMatrixColumn(e,0).length(),r=1/tr.setFromMatrixColumn(e,1).length(),a=1/tr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=a*u,f=a*h,m=o*u,_=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=f+m*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=m+f*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*u,f=c*h,m=l*u,_=l*h;t[0]=d+_*o,t[4]=m*o-f,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-m,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*u,f=c*h,m=l*u,_=l*h;t[0]=d-_*o,t[4]=-a*h,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*u,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*u,f=a*h,m=o*u,_=o*h;t[0]=c*u,t[4]=m*l-f,t[8]=d*l+_,t[1]=c*h,t[5]=_*l+d,t[9]=f*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,f=a*l,m=o*c,_=o*l;t[0]=c*u,t[4]=_-d*h,t[8]=m*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=f*h+m,t[10]=d-_*h}else if(e.order==="XZY"){const d=a*c,f=a*l,m=o*c,_=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=d*h+_,t[5]=a*u,t[9]=f*h-m,t[2]=m*h-f,t[6]=o*u,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(T_,e,E_)}lookAt(e,t,n){const s=this.elements;return bn.subVectors(e,t),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),Xi.crossVectors(n,bn),Xi.lengthSq()===0&&(Math.abs(n.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),Xi.crossVectors(n,bn)),Xi.normalize(),uo.crossVectors(bn,Xi),s[0]=Xi.x,s[4]=uo.x,s[8]=bn.x,s[1]=Xi.y,s[5]=uo.y,s[9]=bn.y,s[2]=Xi.z,s[6]=uo.z,s[10]=bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],y=n[3],S=n[7],v=n[11],P=n[15],A=s[0],L=s[4],D=s[8],b=s[12],T=s[1],I=s[5],V=s[9],G=s[13],q=s[2],ee=s[6],Z=s[10],te=s[14],W=s[3],fe=s[7],ve=s[11],De=s[15];return r[0]=a*A+o*T+c*q+l*W,r[4]=a*L+o*I+c*ee+l*fe,r[8]=a*D+o*V+c*Z+l*ve,r[12]=a*b+o*G+c*te+l*De,r[1]=u*A+h*T+d*q+f*W,r[5]=u*L+h*I+d*ee+f*fe,r[9]=u*D+h*V+d*Z+f*ve,r[13]=u*b+h*G+d*te+f*De,r[2]=m*A+_*T+g*q+p*W,r[6]=m*L+_*I+g*ee+p*fe,r[10]=m*D+_*V+g*Z+p*ve,r[14]=m*b+_*G+g*te+p*De,r[3]=y*A+S*T+v*q+P*W,r[7]=y*L+S*I+v*ee+P*fe,r[11]=y*D+S*V+v*Z+P*ve,r[15]=y*b+S*G+v*te+P*De,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],d=e[10],f=e[14],m=e[3],_=e[7],g=e[11],p=e[15];return m*(+r*c*h-s*l*h-r*o*d+n*l*d+s*o*f-n*c*f)+_*(+t*c*f-t*l*d+r*a*d-s*a*f+s*l*u-r*c*u)+g*(+t*l*h-t*o*f-r*a*h+n*a*f+r*o*u-n*l*u)+p*(-s*o*u-t*c*h+t*o*d+s*a*h-n*a*d+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],d=e[10],f=e[11],m=e[12],_=e[13],g=e[14],p=e[15],y=h*g*l-_*d*l+_*c*f-o*g*f-h*c*p+o*d*p,S=m*d*l-u*g*l-m*c*f+a*g*f+u*c*p-a*d*p,v=u*_*l-m*h*l+m*o*f-a*_*f-u*o*p+a*h*p,P=m*h*c-u*_*c-m*o*d+a*_*d+u*o*g-a*h*g,A=t*y+n*S+s*v+r*P;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/A;return e[0]=y*L,e[1]=(_*d*r-h*g*r-_*s*f+n*g*f+h*s*p-n*d*p)*L,e[2]=(o*g*r-_*c*r+_*s*l-n*g*l-o*s*p+n*c*p)*L,e[3]=(h*c*r-o*d*r-h*s*l+n*d*l+o*s*f-n*c*f)*L,e[4]=S*L,e[5]=(u*g*r-m*d*r+m*s*f-t*g*f-u*s*p+t*d*p)*L,e[6]=(m*c*r-a*g*r-m*s*l+t*g*l+a*s*p-t*c*p)*L,e[7]=(a*d*r-u*c*r+u*s*l-t*d*l-a*s*f+t*c*f)*L,e[8]=v*L,e[9]=(m*h*r-u*_*r-m*n*f+t*_*f+u*n*p-t*h*p)*L,e[10]=(a*_*r-m*o*r+m*n*l-t*_*l-a*n*p+t*o*p)*L,e[11]=(u*o*r-a*h*r-u*n*l+t*h*l+a*n*f-t*o*f)*L,e[12]=P*L,e[13]=(u*_*s-m*h*s+m*n*d-t*_*d-u*n*g+t*h*g)*L,e[14]=(m*o*s-a*_*s-m*n*c+t*_*c+a*n*g-t*o*g)*L,e[15]=(a*h*s-u*o*s+u*n*c-t*h*c-a*n*d+t*o*d)*L,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,h=o+o,d=r*l,f=r*u,m=r*h,_=a*u,g=a*h,p=o*h,y=c*l,S=c*u,v=c*h,P=n.x,A=n.y,L=n.z;return s[0]=(1-(_+p))*P,s[1]=(f+v)*P,s[2]=(m-S)*P,s[3]=0,s[4]=(f-v)*A,s[5]=(1-(d+p))*A,s[6]=(g+y)*A,s[7]=0,s[8]=(m+S)*L,s[9]=(g-y)*L,s[10]=(1-(d+_))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=tr.set(s[0],s[1],s[2]).length();const a=tr.set(s[4],s[5],s[6]).length(),o=tr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Kn.copy(this);const l=1/r,u=1/a,h=1/o;return Kn.elements[0]*=l,Kn.elements[1]*=l,Kn.elements[2]*=l,Kn.elements[4]*=u,Kn.elements[5]*=u,Kn.elements[6]*=u,Kn.elements[8]*=h,Kn.elements[9]*=h,Kn.elements[10]*=h,t.setFromRotationMatrix(Kn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=hi,c=!1){const l=this.elements,u=2*r/(t-e),h=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s);let m,_;if(c)m=r/(a-r),_=a*r/(a-r);else if(o===hi)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===mc)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=hi,c=!1){const l=this.elements,u=2/(t-e),h=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s);let m,_;if(c)m=1/(a-r),_=a/(a-r);else if(o===hi)m=-2/(a-r),_=-(a+r)/(a-r);else if(o===mc)m=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=h,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const tr=new E,Kn=new Xe,T_=new E(0,0,0),E_=new E(1,1,1),Xi=new E,uo=new E,bn=new E,Yd=new Xe,Kd=new Xn;class Wn{constructor(e=0,t=0,n=0,s=Wn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Je(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Yd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Kd.setFromEuler(this),this.setFromQuaternion(Kd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wn.DEFAULT_ORDER="XYZ";class Bh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let A_=0;const jd=new E,nr=new Xn,bi=new Xe,ho=new E,na=new E,R_=new E,C_=new Xn,$d=new E(1,0,0),Zd=new E(0,1,0),Jd=new E(0,0,1),Qd={type:"added"},P_={type:"removed"},ir={type:"childadded",child:null},hl={type:"childremoved",child:null};class yt extends Gr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:A_++}),this.uuid=Vn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new E,t=new Wn,n=new Xn,s=new E(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Xe},normalMatrix:{value:new Ke}}),this.matrix=new Xe,this.matrixWorld=new Xe,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return nr.setFromAxisAngle(e,t),this.quaternion.multiply(nr),this}rotateOnWorldAxis(e,t){return nr.setFromAxisAngle(e,t),this.quaternion.premultiply(nr),this}rotateX(e){return this.rotateOnAxis($d,e)}rotateY(e){return this.rotateOnAxis(Zd,e)}rotateZ(e){return this.rotateOnAxis(Jd,e)}translateOnAxis(e,t){return jd.copy(e).applyQuaternion(this.quaternion),this.position.add(jd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($d,e)}translateY(e){return this.translateOnAxis(Zd,e)}translateZ(e){return this.translateOnAxis(Jd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ho.copy(e):ho.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),na.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt(na,ho,this.up):bi.lookAt(ho,na,this.up),this.quaternion.setFromRotationMatrix(bi),s&&(bi.extractRotation(s.matrixWorld),nr.setFromRotationMatrix(bi),this.quaternion.premultiply(nr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Qd),ir.child=e,this.dispatchEvent(ir),ir.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(P_),hl.child=e,this.dispatchEvent(hl),hl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(bi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Qd),ir.child=e,this.dispatchEvent(ir),ir.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(na,e,R_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(na,C_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}yt.DEFAULT_UP=new E(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const jn=new E,Ti=new E,dl=new E,Ei=new E,sr=new E,rr=new E,ef=new E,fl=new E,pl=new E,ml=new E,gl=new ht,_l=new ht,vl=new ht;class Qn{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),jn.subVectors(e,t),s.cross(jn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){jn.subVectors(s,t),Ti.subVectors(n,t),dl.subVectors(e,t);const a=jn.dot(jn),o=jn.dot(Ti),c=jn.dot(dl),l=Ti.dot(Ti),u=Ti.dot(dl),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(l*c-o*u)*d,m=(a*u-o*c)*d;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ei)===null?!1:Ei.x>=0&&Ei.y>=0&&Ei.x+Ei.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Ei)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ei.x),c.addScaledVector(a,Ei.y),c.addScaledVector(o,Ei.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return gl.setScalar(0),_l.setScalar(0),vl.setScalar(0),gl.fromBufferAttribute(e,t),_l.fromBufferAttribute(e,n),vl.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(gl,r.x),a.addScaledVector(_l,r.y),a.addScaledVector(vl,r.z),a}static isFrontFacing(e,t,n,s){return jn.subVectors(n,t),Ti.subVectors(e,t),jn.cross(Ti).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jn.subVectors(this.c,this.b),Ti.subVectors(this.a,this.b),jn.cross(Ti).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Qn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Qn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;sr.subVectors(s,n),rr.subVectors(r,n),fl.subVectors(e,n);const c=sr.dot(fl),l=rr.dot(fl);if(c<=0&&l<=0)return t.copy(n);pl.subVectors(e,s);const u=sr.dot(pl),h=rr.dot(pl);if(u>=0&&h<=u)return t.copy(s);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(sr,a);ml.subVectors(e,r);const f=sr.dot(ml),m=rr.dot(ml);if(m>=0&&f<=m)return t.copy(r);const _=f*l-c*m;if(_<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(rr,o);const g=u*m-f*h;if(g<=0&&h-u>=0&&f-m>=0)return ef.subVectors(r,s),o=(h-u)/(h-u+(f-m)),t.copy(s).addScaledVector(ef,o);const p=1/(g+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(sr,a).addScaledVector(rr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const um={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},fo={h:0,s:0,l:0};function xl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ye{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=At){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,tt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=tt.workingColorSpace){if(e=Oh(e,1),t=Je(t,0,1),n=Je(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=xl(a,r,e+1/3),this.g=xl(a,r,e),this.b=xl(a,r,e-1/3)}return tt.colorSpaceToWorking(this,s),this}setStyle(e,t=At){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=At){const n=um[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}copyLinearToSRGB(e){return this.r=vr(e.r),this.g=vr(e.g),this.b=vr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=At){return tt.workingToColorSpace(sn.copy(this),e),Math.round(Je(sn.r*255,0,255))*65536+Math.round(Je(sn.g*255,0,255))*256+Math.round(Je(sn.b*255,0,255))}getHexString(e=At){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.workingToColorSpace(sn.copy(this),t);const n=sn.r,s=sn.g,r=sn.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=tt.workingColorSpace){return tt.workingToColorSpace(sn.copy(this),t),e.r=sn.r,e.g=sn.g,e.b=sn.b,e}getStyle(e=At){tt.workingToColorSpace(sn.copy(this),e);const t=sn.r,n=sn.g,s=sn.b;return e!==At?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(qi),this.setHSL(qi.h+e,qi.s+t,qi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(qi),e.getHSL(fo);const n=va(qi.h,fo.h,t),s=va(qi.s,fo.s,t),r=va(qi.l,fo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const sn=new ye;ye.NAMES=um;let L_=0;class Pn extends Gr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:L_++}),this.uuid=Vn(),this.name="",this.type="Material",this.blending=gr,this.side=mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fu,this.blendDst=pu,this.blendEquation=Ds,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ye(0,0,0),this.blendAlpha=0,this.depthFunc=Ir,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$s,this.stencilZFail=$s,this.stencilZPass=$s,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==gr&&(n.blending=this.blending),this.side!==mi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==fu&&(n.blendSrc=this.blendSrc),this.blendDst!==pu&&(n.blendDst=this.blendDst),this.blendEquation!==Ds&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ir&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$s&&(n.stencilFail=this.stencilFail),this.stencilZFail!==$s&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==$s&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Qe extends Pn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=Rh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Gt=new E,po=new he;let I_=0;class Yt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:I_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=$u,this.updateRanges=[],this.gpuType=ti,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)po.fromBufferAttribute(this,t),po.applyMatrix3(e),this.setXY(t,po.x,po.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix3(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Jn(t,this.array)),t}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Jn(t,this.array)),t}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Jn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Jn(t,this.array)),t}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),s=pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),s=pt(s,this.array),r=pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==$u&&(e.usage=this.usage),e}}class hm extends Yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class dm extends Yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ve extends Yt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let D_=0;const Nn=new Xe,yl=new yt,ar=new E,Tn=new Ln,ia=new Ln,Jt=new E;class bt extends Gr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:D_++}),this.uuid=Vn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(cm(e)?dm:hm)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Nn.makeRotationFromQuaternion(e),this.applyMatrix4(Nn),this}rotateX(e){return Nn.makeRotationX(e),this.applyMatrix4(Nn),this}rotateY(e){return Nn.makeRotationY(e),this.applyMatrix4(Nn),this}rotateZ(e){return Nn.makeRotationZ(e),this.applyMatrix4(Nn),this}translate(e,t,n){return Nn.makeTranslation(e,t,n),this.applyMatrix4(Nn),this}scale(e,t,n){return Nn.makeScale(e,t,n),this.applyMatrix4(Nn),this}lookAt(e){return yl.lookAt(e),yl.updateMatrix(),this.applyMatrix4(yl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ar).negate(),this.translate(ar.x,ar.y,ar.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ve(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ln);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Jt.addVectors(this.boundingBox.min,Tn.min),this.boundingBox.expandByPoint(Jt),Jt.addVectors(this.boundingBox.max,Tn.max),this.boundingBox.expandByPoint(Jt)):(this.boundingBox.expandByPoint(Tn.min),this.boundingBox.expandByPoint(Tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(e){const n=this.boundingSphere.center;if(Tn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ia.setFromBufferAttribute(o),this.morphTargetsRelative?(Jt.addVectors(Tn.min,ia.min),Tn.expandByPoint(Jt),Jt.addVectors(Tn.max,ia.max),Tn.expandByPoint(Jt)):(Tn.expandByPoint(ia.min),Tn.expandByPoint(ia.max))}Tn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Jt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Jt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Jt.fromBufferAttribute(o,l),c&&(ar.fromBufferAttribute(e,l),Jt.add(ar)),s=Math.max(s,n.distanceToSquared(Jt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Yt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let D=0;D<n.count;D++)o[D]=new E,c[D]=new E;const l=new E,u=new E,h=new E,d=new he,f=new he,m=new he,_=new E,g=new E;function p(D,b,T){l.fromBufferAttribute(n,D),u.fromBufferAttribute(n,b),h.fromBufferAttribute(n,T),d.fromBufferAttribute(r,D),f.fromBufferAttribute(r,b),m.fromBufferAttribute(r,T),u.sub(l),h.sub(l),f.sub(d),m.sub(d);const I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(I),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(I),o[D].add(_),o[b].add(_),o[T].add(_),c[D].add(g),c[b].add(g),c[T].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let D=0,b=y.length;D<b;++D){const T=y[D],I=T.start,V=T.count;for(let G=I,q=I+V;G<q;G+=3)p(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const S=new E,v=new E,P=new E,A=new E;function L(D){P.fromBufferAttribute(s,D),A.copy(P);const b=o[D];S.copy(b),S.sub(P.multiplyScalar(P.dot(b))).normalize(),v.crossVectors(A,b);const I=v.dot(c[D])<0?-1:1;a.setXYZW(D,S.x,S.y,S.z,I)}for(let D=0,b=y.length;D<b;++D){const T=y[D],I=T.start,V=T.count;for(let G=I,q=I+V;G<q;G+=3)L(e.getX(G+0)),L(e.getX(G+1)),L(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Yt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new E,r=new E,a=new E,o=new E,c=new E,l=new E,u=new E,h=new E;if(e)for(let d=0,f=e.count;d<f;d+=3){const m=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),o.add(u),c.add(u),l.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Jt.fromBufferAttribute(e,t),Jt.normalize(),e.setXYZ(t,Jt.x,Jt.y,Jt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u);let f=0,m=0;for(let _=0,g=c.length;_<g;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*u;for(let p=0;p<u;p++)d[m++]=l[f++]}return new Yt(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new bt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const d=l[u],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const f=l[h];u.push(f.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const tf=new Xe,bs=new Ka,mo=new vi,nf=new E,go=new E,_o=new E,vo=new E,Ml=new E,xo=new E,sf=new E,yo=new E;class j extends yt{constructor(e=new bt,t=new Qe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){xo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(Ml.fromBufferAttribute(h,e),a?xo.addScaledVector(Ml,u):xo.addScaledVector(Ml.sub(t),u))}t.add(xo)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),mo.copy(n.boundingSphere),mo.applyMatrix4(r),bs.copy(e.ray).recast(e.near),!(mo.containsPoint(bs.origin)===!1&&(bs.intersectSphere(mo,nf)===null||bs.origin.distanceToSquared(nf)>(e.far-e.near)**2))&&(tf.copy(r).invert(),bs.copy(e.ray).applyMatrix4(tf),!(n.boundingBox!==null&&bs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,bs)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a[g.materialIndex],y=Math.max(g.start,f.start),S=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let v=y,P=S;v<P;v+=3){const A=o.getX(v),L=o.getX(v+1),D=o.getX(v+2);s=Mo(this,p,e,n,l,u,h,A,L,D),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const y=o.getX(g),S=o.getX(g+1),v=o.getX(g+2);s=Mo(this,a,e,n,l,u,h,y,S,v),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a[g.materialIndex],y=Math.max(g.start,f.start),S=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let v=y,P=S;v<P;v+=3){const A=v,L=v+1,D=v+2;s=Mo(this,p,e,n,l,u,h,A,L,D),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const y=g,S=g+1,v=g+2;s=Mo(this,a,e,n,l,u,h,y,S,v),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function N_(i,e,t,n,s,r,a,o){let c;if(e.side===yn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===mi,o),c===null)return null;yo.copy(o),yo.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(yo);return l<t.near||l>t.far?null:{distance:l,point:yo.clone(),object:i}}function Mo(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,go),i.getVertexPosition(c,_o),i.getVertexPosition(l,vo);const u=N_(i,e,t,n,go,_o,vo,sf);if(u){const h=new E;Qn.getBarycoord(sf,go,_o,vo,h),s&&(u.uv=Qn.getInterpolatedAttribute(s,o,c,l,h,new he)),r&&(u.uv1=Qn.getInterpolatedAttribute(r,o,c,l,h,new he)),a&&(u.normal=Qn.getInterpolatedAttribute(a,o,c,l,h,new E),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new E,materialIndex:0};Qn.getNormal(go,_o,vo,d.normal),u.face=d,u.barycoord=h}return u}class st extends bt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let d=0,f=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Ve(l,3)),this.setAttribute("normal",new Ve(u,3)),this.setAttribute("uv",new Ve(h,2));function m(_,g,p,y,S,v,P,A,L,D,b){const T=v/L,I=P/D,V=v/2,G=P/2,q=A/2,ee=L+1,Z=D+1;let te=0,W=0;const fe=new E;for(let ve=0;ve<Z;ve++){const De=ve*I-G;for(let $e=0;$e<ee;$e++){const Rt=$e*T-V;fe[_]=Rt*y,fe[g]=De*S,fe[p]=q,l.push(fe.x,fe.y,fe.z),fe[_]=0,fe[g]=0,fe[p]=A>0?1:-1,u.push(fe.x,fe.y,fe.z),h.push($e/L),h.push(1-ve/D),te+=1}}for(let ve=0;ve<D;ve++)for(let De=0;De<L;De++){const $e=d+De+ee*ve,Rt=d+De+ee*(ve+1),vt=d+(De+1)+ee*(ve+1),K=d+(De+1)+ee*ve;c.push($e,Rt,K),c.push(Rt,vt,K),W+=6}o.addGroup(f,W,b),f+=W,d+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new st(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Fr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function hn(i){const e={};for(let t=0;t<i.length;t++){const n=Fr(i[t]);for(const s in n)e[s]=n[s]}return e}function U_(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function fm(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const F_={clone:Fr,merge:hn};var O_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,k_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Oi extends Pn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=O_,this.fragmentShader=k_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fr(e.uniforms),this.uniformsGroups=U_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class pm extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Xe,this.projectionMatrix=new Xe,this.projectionMatrixInverse=new Xe,this.coordinateSystem=hi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Yi=new E,rf=new he,af=new he;class fn extends pm{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ur*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(_a*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ur*2*Math.atan(Math.tan(_a*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Yi.x,Yi.y).multiplyScalar(-e/Yi.z),Yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yi.x,Yi.y).multiplyScalar(-e/Yi.z)}getViewSize(e,t){return this.getViewBounds(e,rf,af),t.subVectors(af,rf)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(_a*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const or=-90,cr=1;class B_ extends yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new fn(or,cr,e,t);s.layers=this.layers,this.add(s);const r=new fn(or,cr,e,t);r.layers=this.layers,this.add(r);const a=new fn(or,cr,e,t);a.layers=this.layers,this.add(a);const o=new fn(or,cr,e,t);o.layers=this.layers,this.add(o);const c=new fn(or,cr,e,t);c.layers=this.layers,this.add(c);const l=new fn(or,cr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===hi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===mc)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class mm extends Qt{constructor(e=[],t=Dr,n,s,r,a,o,c,l,u){super(e,t,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class z_ extends Hs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new mm(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new st(5,5,5),r=new Oi({name:"CubemapFromEquirect",uniforms:Fr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:yn,blending:ss});r.uniforms.tEquirect.value=t;const a=new j(s,r),o=t.minFilter;return t.minFilter===Di&&(t.minFilter=Rn),new B_(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class ot extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const H_={type:"move"};class Sl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ot,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ot,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ot,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,m=.005;l.inputState.pinching&&d>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(H_)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ot;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class zh{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ye(e),this.density=t}clone(){return new zh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class V_ extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wn,this.environmentIntensity=1,this.environmentRotation=new Wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class G_{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=$u,this.updateRanges=[],this.version=0,this.uuid=Vn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const un=new E;class Hh{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyMatrix4(e),this.setXYZ(t,un.x,un.y,un.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyNormalMatrix(e),this.setXYZ(t,un.x,un.y,un.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.transformDirection(e),this.setXYZ(t,un.x,un.y,un.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Jn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Jn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Jn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Jn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),s=pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),s=pt(s,this.array),r=pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Yt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Hh(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const of=new E,cf=new ht,lf=new ht,W_=new E,uf=new Xe,So=new E,wl=new vi,hf=new Xe,bl=new Ka;class X_ extends j{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Fd,this.bindMatrix=new Xe,this.bindMatrixInverse=new Xe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ln),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,So),this.boundingBox.expandByPoint(So)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new vi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,So),this.boundingSphere.expandByPoint(So)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wl.copy(this.boundingSphere),wl.applyMatrix4(s),e.ray.intersectsSphere(wl)!==!1&&(hf.copy(s).invert(),bl.copy(e.ray).applyMatrix4(hf),!(this.boundingBox!==null&&bl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,bl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ht,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Fd?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===H0?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;cf.fromBufferAttribute(s.attributes.skinIndex,e),lf.fromBufferAttribute(s.attributes.skinWeight,e),of.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=lf.getComponent(r);if(a!==0){const o=cf.getComponent(r);uf.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(W_.copy(of).applyMatrix4(uf),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class gm extends yt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class _m extends Qt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=pn,u=pn,h,d){super(null,a,o,c,l,u,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const df=new Xe,q_=new Xe;class Vh{constructor(e=[],t=[]){this.uuid=Vn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Xe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Xe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:q_;df.multiplyMatrices(o,t[r]),df.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Vh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new _m(t,e,e,Bn,ti);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new gm),this.bones.push(a),this.boneInverses.push(new Xe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class Zu extends Yt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const lr=new Xe,ff=new Xe,wo=[],pf=new Ln,Y_=new Xe,sa=new j,ra=new vi;class K_ extends j{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Zu(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Y_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ln),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,lr),pf.copy(e.boundingBox).applyMatrix4(lr),this.boundingBox.union(pf)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new vi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,lr),ra.copy(e.boundingSphere).applyMatrix4(lr),this.boundingSphere.union(ra)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(sa.geometry=this.geometry,sa.material=this.material,sa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ra.copy(this.boundingSphere),ra.applyMatrix4(n),e.ray.intersectsSphere(ra)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,lr),ff.multiplyMatrices(n,lr),sa.matrixWorld=ff,sa.raycast(e,wo);for(let a=0,o=wo.length;a<o;a++){const c=wo[a];c.instanceId=r,c.object=this,t.push(c)}wo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Zu(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new _m(new Float32Array(s*this.count),s,this.count,Ih,ti));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Tl=new E,j_=new E,$_=new Ke;class Ji{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Tl.subVectors(n,t).cross(j_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Tl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||$_.getNormalMatrix(e),s=this.coplanarPoint(Tl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ts=new vi,Z_=new he(.5,.5),bo=new E;class Gh{constructor(e=new Ji,t=new Ji,n=new Ji,s=new Ji,r=new Ji,a=new Ji){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=hi,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],h=r[5],d=r[6],f=r[7],m=r[8],_=r[9],g=r[10],p=r[11],y=r[12],S=r[13],v=r[14],P=r[15];if(s[0].setComponents(l-a,f-u,p-m,P-y).normalize(),s[1].setComponents(l+a,f+u,p+m,P+y).normalize(),s[2].setComponents(l+o,f+h,p+_,P+S).normalize(),s[3].setComponents(l-o,f-h,p-_,P-S).normalize(),n)s[4].setComponents(c,d,g,v).normalize(),s[5].setComponents(l-c,f-d,p-g,P-v).normalize();else if(s[4].setComponents(l-c,f-d,p-g,P-v).normalize(),t===hi)s[5].setComponents(l+c,f+d,p+g,P+v).normalize();else if(t===mc)s[5].setComponents(c,d,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ts.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ts.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ts)}intersectsSprite(e){Ts.center.set(0,0,0);const t=Z_.distanceTo(e.center);return Ts.radius=.7071067811865476+t,Ts.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ts)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(bo.x=s.normal.x>0?e.max.x:e.min.x,bo.y=s.normal.y>0?e.max.y:e.min.y,bo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(bo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class as extends Pn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const gc=new E,_c=new E,mf=new Xe,aa=new Ka,To=new vi,El=new E,gf=new E;class Lc extends yt{constructor(e=new bt,t=new as){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)gc.fromBufferAttribute(t,s-1),_c.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=gc.distanceTo(_c);e.setAttribute("lineDistance",new Ve(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),To.copy(n.boundingSphere),To.applyMatrix4(s),To.radius+=r,e.ray.intersectsSphere(To)===!1)return;mf.copy(s).invert(),aa.copy(e.ray).applyMatrix4(mf);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=l){const p=u.getX(_),y=u.getX(_+1),S=Eo(this,e,aa,c,p,y,_);S&&t.push(S)}if(this.isLineLoop){const _=u.getX(m-1),g=u.getX(f),p=Eo(this,e,aa,c,_,g,m-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=l){const p=Eo(this,e,aa,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=Eo(this,e,aa,c,m-1,f,m-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Eo(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(gc.fromBufferAttribute(o,s),_c.fromBufferAttribute(o,r),t.distanceSqToSegment(gc,_c,El,gf)>n)return;El.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(El);if(!(l<e.near||l>e.far))return{distance:l,point:gf.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const _f=new E,vf=new E;class Ia extends Lc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)_f.fromBufferAttribute(t,s),vf.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+_f.distanceTo(vf);e.setAttribute("lineDistance",new Ve(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class J_ extends Lc{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Us extends Pn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const xf=new Xe,Ju=new Ka,Ao=new vi,Ro=new E;class xa extends yt{constructor(e=new bt,t=new Us){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ao.copy(n.boundingSphere),Ao.applyMatrix4(s),Ao.radius+=r,e.ray.intersectsSphere(Ao)===!1)return;xf.copy(s).invert(),Ju.copy(e.ray).applyMatrix4(xf);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let m=d,_=f;m<_;m++){const g=l.getX(m);Ro.fromBufferAttribute(h,g),yf(Ro,g,c,s,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let m=d,_=f;m<_;m++)Ro.fromBufferAttribute(h,m),yf(Ro,m,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function yf(i,e,t,n,s,r,a){const o=Ju.distanceSqToPoint(i);if(o<t){const c=new E;Ju.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class vm extends Qt{constructor(e,t,n=zs,s,r,a,o=pn,c=pn,l,u=Aa,h=1){if(u!==Aa&&u!==Ra)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new kh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Or extends bt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new E,u=new he;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const f=n+h/t*s;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[d]/e+1)/2,u.y=(a[d+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Ve(a,3)),this.setAttribute("normal",new Ve(o,3)),this.setAttribute("uv",new Ve(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Or(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ot extends bt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],d=[],f=[];let m=0;const _=[],g=n/2;let p=0;y(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new Ve(h,3)),this.setAttribute("normal",new Ve(d,3)),this.setAttribute("uv",new Ve(f,2));function y(){const v=new E,P=new E;let A=0;const L=(t-e)/n;for(let D=0;D<=r;D++){const b=[],T=D/r,I=T*(t-e)+e;for(let V=0;V<=s;V++){const G=V/s,q=G*c+o,ee=Math.sin(q),Z=Math.cos(q);P.x=I*ee,P.y=-T*n+g,P.z=I*Z,h.push(P.x,P.y,P.z),v.set(ee,L,Z).normalize(),d.push(v.x,v.y,v.z),f.push(G,1-T),b.push(m++)}_.push(b)}for(let D=0;D<s;D++)for(let b=0;b<r;b++){const T=_[b][D],I=_[b+1][D],V=_[b+1][D+1],G=_[b][D+1];(e>0||b!==0)&&(u.push(T,I,G),A+=3),(t>0||b!==r-1)&&(u.push(I,V,G),A+=3)}l.addGroup(p,A,0),p+=A}function S(v){const P=m,A=new he,L=new E;let D=0;const b=v===!0?e:t,T=v===!0?1:-1;for(let V=1;V<=s;V++)h.push(0,g*T,0),d.push(0,T,0),f.push(.5,.5),m++;const I=m;for(let V=0;V<=s;V++){const q=V/s*c+o,ee=Math.cos(q),Z=Math.sin(q);L.x=b*Z,L.y=g*T,L.z=b*ee,h.push(L.x,L.y,L.z),d.push(0,T,0),A.x=ee*.5+.5,A.y=Z*.5*T+.5,f.push(A.x,A.y),m++}for(let V=0;V<s;V++){const G=P+V,q=I+V;v===!0?u.push(q,q+1,G):u.push(q+1,q,G),D+=3}l.addGroup(p,D,v===!0?1:2),p+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ot(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ja extends Ot{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new ja(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ic extends bt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),l(n),u(),this.setAttribute("position",new Ve(r,3)),this.setAttribute("normal",new Ve(r.slice(),3)),this.setAttribute("uv",new Ve(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const S=new E,v=new E,P=new E;for(let A=0;A<t.length;A+=3)f(t[A+0],S),f(t[A+1],v),f(t[A+2],P),c(S,v,P,y)}function c(y,S,v,P){const A=P+1,L=[];for(let D=0;D<=A;D++){L[D]=[];const b=y.clone().lerp(v,D/A),T=S.clone().lerp(v,D/A),I=A-D;for(let V=0;V<=I;V++)V===0&&D===A?L[D][V]=b:L[D][V]=b.clone().lerp(T,V/I)}for(let D=0;D<A;D++)for(let b=0;b<2*(A-D)-1;b++){const T=Math.floor(b/2);b%2===0?(d(L[D][T+1]),d(L[D+1][T]),d(L[D][T])):(d(L[D][T+1]),d(L[D+1][T+1]),d(L[D+1][T]))}}function l(y){const S=new E;for(let v=0;v<r.length;v+=3)S.x=r[v+0],S.y=r[v+1],S.z=r[v+2],S.normalize().multiplyScalar(y),r[v+0]=S.x,r[v+1]=S.y,r[v+2]=S.z}function u(){const y=new E;for(let S=0;S<r.length;S+=3){y.x=r[S+0],y.y=r[S+1],y.z=r[S+2];const v=g(y)/2/Math.PI+.5,P=p(y)/Math.PI+.5;a.push(v,1-P)}m(),h()}function h(){for(let y=0;y<a.length;y+=6){const S=a[y+0],v=a[y+2],P=a[y+4],A=Math.max(S,v,P),L=Math.min(S,v,P);A>.9&&L<.1&&(S<.2&&(a[y+0]+=1),v<.2&&(a[y+2]+=1),P<.2&&(a[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,S){const v=y*3;S.x=e[v+0],S.y=e[v+1],S.z=e[v+2]}function m(){const y=new E,S=new E,v=new E,P=new E,A=new he,L=new he,D=new he;for(let b=0,T=0;b<r.length;b+=9,T+=6){y.set(r[b+0],r[b+1],r[b+2]),S.set(r[b+3],r[b+4],r[b+5]),v.set(r[b+6],r[b+7],r[b+8]),A.set(a[T+0],a[T+1]),L.set(a[T+2],a[T+3]),D.set(a[T+4],a[T+5]),P.copy(y).add(S).add(v).divideScalar(3);const I=g(P);_(A,T+0,y,I),_(L,T+2,S,I),_(D,T+4,v,I)}}function _(y,S,v,P){P<0&&y.x===1&&(a[S]=y.x-1),v.x===0&&v.z===0&&(a[S]=P/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ic(e.vertices,e.indices,e.radius,e.details)}}class Wr extends Ic{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Wr(e.radius,e.detail)}}class xi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);const u=n[s],d=n[s+1]-u,f=(a-u)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new he:new E);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new E,s=[],r=[],a=[],o=new E,c=new Xe;for(let f=0;f<=e;f++){const m=f/e;s[f]=this.getTangentAt(m,new E)}r[0]=new E,a[0]=new E;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(Je(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,m))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Je(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],f*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Wh extends xi{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new he){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*u-f*h+this.aX,l=d*h+f*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Q_ extends Wh{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Xh(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,h){let d=(a-r)/l-(o-r)/(l+u)+(o-a)/u,f=(o-a)/u-(c-a)/(u+h)+(c-o)/h;d*=u,f*=u,s(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const Co=new E,Al=new Xh,Rl=new Xh,Cl=new Xh;class ev extends xi{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new E){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=s[(o-1)%r]:(Co.subVectors(s[0],s[1]).add(s[0]),l=Co);const h=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(Co.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Co),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(h),f),_=Math.pow(h.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(u),f);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),Al.initNonuniformCatmullRom(l.x,h.x,d.x,u.x,m,_,g),Rl.initNonuniformCatmullRom(l.y,h.y,d.y,u.y,m,_,g),Cl.initNonuniformCatmullRom(l.z,h.z,d.z,u.z,m,_,g)}else this.curveType==="catmullrom"&&(Al.initCatmullRom(l.x,h.x,d.x,u.x,this.tension),Rl.initCatmullRom(l.y,h.y,d.y,u.y,this.tension),Cl.initCatmullRom(l.z,h.z,d.z,u.z,this.tension));return n.set(Al.calc(c),Rl.calc(c),Cl.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new E().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Mf(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function tv(i,e){const t=1-i;return t*t*e}function nv(i,e){return 2*(1-i)*i*e}function iv(i,e){return i*i*e}function ya(i,e,t,n){return tv(i,e)+nv(i,t)+iv(i,n)}function sv(i,e){const t=1-i;return t*t*t*e}function rv(i,e){const t=1-i;return 3*t*t*i*e}function av(i,e){return 3*(1-i)*i*i*e}function ov(i,e){return i*i*i*e}function Ma(i,e,t,n,s){return sv(i,e)+rv(i,t)+av(i,n)+ov(i,s)}class xm extends xi{constructor(e=new he,t=new he,n=new he,s=new he){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new he){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ma(e,s.x,r.x,a.x,o.x),Ma(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class cv extends xi{constructor(e=new E,t=new E,n=new E,s=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new E){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ma(e,s.x,r.x,a.x,o.x),Ma(e,s.y,r.y,a.y,o.y),Ma(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ym extends xi{constructor(e=new he,t=new he){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new he){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new he){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class lv extends xi{constructor(e=new E,t=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new E){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new E){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Mm extends xi{constructor(e=new he,t=new he,n=new he){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new he){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ya(e,s.x,r.x,a.x),ya(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class uv extends xi{constructor(e=new E,t=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new E){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ya(e,s.x,r.x,a.x),ya(e,s.y,r.y,a.y),ya(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Sm extends xi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new he){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],h=s[a>s.length-3?s.length-1:a+2];return n.set(Mf(o,c.x,l.x,u.x,h.x),Mf(o,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new he().fromArray(s))}return this}}var Sf=Object.freeze({__proto__:null,ArcCurve:Q_,CatmullRomCurve3:ev,CubicBezierCurve:xm,CubicBezierCurve3:cv,EllipseCurve:Wh,LineCurve:ym,LineCurve3:lv,QuadraticBezierCurve:Mm,QuadraticBezierCurve3:uv,SplineCurve:Sm});class hv extends xi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Sf[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Sf[s.type]().fromJSON(s))}return this}}class wf extends hv{constructor(e){super(),this.type="Path",this.currentPoint=new he,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new ym(this.currentPoint.clone(),new he(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Mm(this.currentPoint.clone(),new he(e,t),new he(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const o=new xm(this.currentPoint.clone(),new he(e,t),new he(n,s),new he(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Sm(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,r,a,o,c),this}absellipse(e,t,n,s,r,a,o,c){const l=new Wh(e,t,n,s,r,a,o,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class wm extends wf{constructor(e){super(e),this.uuid=Vn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new wf().fromJSON(s))}return this}}function dv(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=bm(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=_v(i,e,r,t)),i.length>80*t){o=1/0,c=1/0;let u=-1/0,h=-1/0;for(let d=t;d<s;d+=t){const f=i[d],m=i[d+1];f<o&&(o=f),m<c&&(c=m),f>u&&(u=f),m>h&&(h=m)}l=Math.max(u-o,h-c),l=l!==0?32767/l:0}return Da(r,a,t,o,c,l,0),a}function bm(i,e,t,n,s){let r;if(s===Rv(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=bf(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=bf(a/n|0,i[a],i[a+1],r);return r&&kr(r,r.next)&&(Ua(r),r=r.next),r}function Vs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(kr(t,t.next)||Ut(t.prev,t,t.next)===0)){if(Ua(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Da(i,e,t,n,s,r,a){if(!i)return;!a&&r&&Sv(i,n,s,r);let o=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(r?pv(i,n,s,r):fv(i)){e.push(c.i,i.i,l.i),Ua(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=mv(Vs(i),e),Da(i,e,t,n,s,r,2)):a===2&&gv(i,e,t,n,s,r):Da(Vs(i),e,t,n,s,r,1);break}}}function fv(i){const e=i.prev,t=i,n=i.next;if(Ut(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,u=Math.min(s,r,a),h=Math.min(o,c,l),d=Math.max(s,r,a),f=Math.max(o,c,l);let m=n.next;for(;m!==e;){if(m.x>=u&&m.x<=d&&m.y>=h&&m.y<=f&&da(s,o,r,c,a,l,m.x,m.y)&&Ut(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function pv(i,e,t,n){const s=i.prev,r=i,a=i.next;if(Ut(s,r,a)>=0)return!1;const o=s.x,c=r.x,l=a.x,u=s.y,h=r.y,d=a.y,f=Math.min(o,c,l),m=Math.min(u,h,d),_=Math.max(o,c,l),g=Math.max(u,h,d),p=Qu(f,m,e,t,n),y=Qu(_,g,e,t,n);let S=i.prevZ,v=i.nextZ;for(;S&&S.z>=p&&v&&v.z<=y;){if(S.x>=f&&S.x<=_&&S.y>=m&&S.y<=g&&S!==s&&S!==a&&da(o,u,c,h,l,d,S.x,S.y)&&Ut(S.prev,S,S.next)>=0||(S=S.prevZ,v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==s&&v!==a&&da(o,u,c,h,l,d,v.x,v.y)&&Ut(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;S&&S.z>=p;){if(S.x>=f&&S.x<=_&&S.y>=m&&S.y<=g&&S!==s&&S!==a&&da(o,u,c,h,l,d,S.x,S.y)&&Ut(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;v&&v.z<=y;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==s&&v!==a&&da(o,u,c,h,l,d,v.x,v.y)&&Ut(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function mv(i,e){let t=i;do{const n=t.prev,s=t.next.next;!kr(n,s)&&Em(n,t,t.next,s)&&Na(n,s)&&Na(s,n)&&(e.push(n.i,t.i,s.i),Ua(t),Ua(t.next),t=i=s),t=t.next}while(t!==i);return Vs(t)}function gv(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Tv(a,o)){let c=Am(a,o);a=Vs(a,a.next),c=Vs(c,c.next),Da(a,e,t,n,s,r,0),Da(c,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function _v(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const o=e[r]*n,c=r<a-1?e[r+1]*n:i.length,l=bm(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(bv(l))}s.sort(vv);for(let r=0;r<s.length;r++)t=xv(s[r],t);return t}function vv(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function xv(i,e){const t=yv(i,e);if(!t)return e;const n=Am(t,i);return Vs(n,n.next),Vs(t,t.next)}function yv(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(kr(i,t))return t;do{if(kr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const h=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>r&&(r=h,a=t.x<t.next.x?t:t.next,h===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,c=a.x,l=a.y;let u=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Tm(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){const h=Math.abs(s-t.y)/(n-t.x);Na(t,i)&&(h<u||h===u&&(t.x>a.x||t.x===a.x&&Mv(a,t)))&&(a=t,u=h)}t=t.next}while(t!==o);return a}function Mv(i,e){return Ut(i.prev,i,e.prev)<0&&Ut(e.next,i,i.next)<0}function Sv(i,e,t,n){let s=i;do s.z===0&&(s.z=Qu(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,wv(s)}function wv(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Qu(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function bv(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Tm(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function da(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&Tm(i,e,t,n,s,r,a,o)}function Tv(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Ev(i,e)&&(Na(i,e)&&Na(e,i)&&Av(i,e)&&(Ut(i.prev,i,e.prev)||Ut(i,e.prev,e))||kr(i,e)&&Ut(i.prev,i,i.next)>0&&Ut(e.prev,e,e.next)>0)}function Ut(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function kr(i,e){return i.x===e.x&&i.y===e.y}function Em(i,e,t,n){const s=Lo(Ut(i,e,t)),r=Lo(Ut(i,e,n)),a=Lo(Ut(t,n,i)),o=Lo(Ut(t,n,e));return!!(s!==r&&a!==o||s===0&&Po(i,t,e)||r===0&&Po(i,n,e)||a===0&&Po(t,i,n)||o===0&&Po(t,e,n))}function Po(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Lo(i){return i>0?1:i<0?-1:0}function Ev(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Em(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Na(i,e){return Ut(i.prev,i,i.next)<0?Ut(i,e,i.next)>=0&&Ut(i,i.prev,e)>=0:Ut(i,e,i.prev)<0||Ut(i,i.next,e)<0}function Av(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Am(i,e){const t=eh(i.i,i.x,i.y),n=eh(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function bf(i,e,t,n){const s=eh(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Ua(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function eh(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Rv(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Cv{static triangulate(e,t,n=2){return dv(e,t,n)}}class xr{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return xr.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Tf(e),Ef(n,e);let a=e.length;t.forEach(Tf);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,Ef(n,t[c]);const o=Cv.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}}function Tf(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Ef(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class qh extends Ic{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new qh(e.radius,e.detail)}}class Xr extends bt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,h=e/o,d=t/c,f=[],m=[],_=[],g=[];for(let p=0;p<u;p++){const y=p*d-a;for(let S=0;S<l;S++){const v=S*h-r;m.push(v,-y,0),_.push(0,0,1),g.push(S/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<o;y++){const S=y+l*p,v=y+l*(p+1),P=y+1+l*(p+1),A=y+1+l*p;f.push(S,v,A),f.push(v,P,A)}this.setIndex(f),this.setAttribute("position",new Ve(m,3)),this.setAttribute("normal",new Ve(_,3)),this.setAttribute("uv",new Ve(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xr(e.width,e.height,e.widthSegments,e.heightSegments)}}class ki extends bt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],u=[];let h=e;const d=(t-e)/s,f=new E,m=new he;for(let _=0;_<=s;_++){for(let g=0;g<=n;g++){const p=r+g/n*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,u.push(m.x,m.y)}h+=d}for(let _=0;_<s;_++){const g=_*(n+1);for(let p=0;p<n;p++){const y=p+g,S=y,v=y+n+1,P=y+n+2,A=y+1;o.push(S,v,A),o.push(v,P,A)}}this.setIndex(o),this.setAttribute("position",new Ve(c,3)),this.setAttribute("normal",new Ve(l,3)),this.setAttribute("uv",new Ve(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ki(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Yh extends bt{constructor(e=new wm([new he(0,.5),new he(-.5,-.5),new he(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],a=[];let o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let u=0;u<e.length;u++)l(e[u]),this.addGroup(o,c,u),o+=c,c=0;this.setIndex(n),this.setAttribute("position",new Ve(s,3)),this.setAttribute("normal",new Ve(r,3)),this.setAttribute("uv",new Ve(a,2));function l(u){const h=s.length/3,d=u.extractPoints(t);let f=d.shape;const m=d.holes;xr.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){const y=m[g];xr.isClockWise(y)===!0&&(m[g]=y.reverse())}const _=xr.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){const y=m[g];f=f.concat(y)}for(let g=0,p=f.length;g<p;g++){const y=f[g];s.push(y.x,y.y,0),r.push(0,0,1),a.push(y.x,y.y)}for(let g=0,p=_.length;g<p;g++){const y=_[g],S=y[0]+h,v=y[1]+h,P=y[2]+h;n.push(S,v,P),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Pv(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const a=t[e.shapes[s]];n.push(a)}return new Yh(n,e.curveSegments)}}function Pv(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class Hi extends bt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new E,d=new E,f=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){const y=[],S=p/n;let v=0;p===0&&a===0?v=.5/t:p===n&&c===Math.PI&&(v=-.5/t);for(let P=0;P<=t;P++){const A=P/t;h.x=-e*Math.cos(s+A*r)*Math.sin(a+S*o),h.y=e*Math.cos(a+S*o),h.z=e*Math.sin(s+A*r)*Math.sin(a+S*o),m.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),g.push(A+v,1-S),y.push(l++)}u.push(y)}for(let p=0;p<n;p++)for(let y=0;y<t;y++){const S=u[p][y+1],v=u[p][y],P=u[p+1][y],A=u[p+1][y+1];(p!==0||a>0)&&f.push(S,v,A),(p!==n-1||c<Math.PI)&&f.push(v,P,A)}this.setIndex(f),this.setAttribute("position",new Ve(m,3)),this.setAttribute("normal",new Ve(_,3)),this.setAttribute("uv",new Ve(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Dc extends bt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],c=[],l=[],u=new E,h=new E,d=new E;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){const _=m/s*r,g=f/n*Math.PI*2;h.x=(e+t*Math.cos(g))*Math.cos(_),h.y=(e+t*Math.cos(g))*Math.sin(_),h.z=t*Math.sin(g),o.push(h.x,h.y,h.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),d.subVectors(h,u).normalize(),c.push(d.x,d.y,d.z),l.push(m/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){const _=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,y=(s+1)*f+m;a.push(_,g,y),a.push(g,p,y)}this.setIndex(a),this.setAttribute("position",new Ve(o,3)),this.setAttribute("normal",new Ve(c,3)),this.setAttribute("uv",new Ve(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dc(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Kt extends Pn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fh,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class yi extends Kt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new he(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Je(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ye(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ye(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ye(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Kh extends Pn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new ye(16777215),this.specular=new ye(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fh,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=Rh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Lv extends Pn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=W0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Iv extends Pn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Io(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Dv(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Nv(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Af(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function Rm(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}class $a{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Uv extends $a{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Od,endingEnd:Od}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case kd:r=e,o=2*t-n;break;case Bd:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case kd:a=e,c=2*n-t;break;case Bd:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(s-t),_=m*m,g=_*m,p=-d*g+2*d*_-d*m,y=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*m+1,S=(-1-f)*g+(1.5+f)*_+.5*m,v=f*g-f*_;for(let P=0;P!==o;++P)r[P]=p*a[u+P]+y*a[l+P]+S*a[c+P]+v*a[h+P];return r}}class Fv extends $a{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(s-t),h=1-u;for(let d=0;d!==o;++d)r[d]=a[l+d]*h+a[c+d]*u;return r}}class Ov extends $a{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class ii{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Io(t,this.TimeBufferType),this.values=Io(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Io(e.times,Array),values:Io(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ov(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Fv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Uv(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ca:t=this.InterpolantFactoryMethodDiscrete;break;case Pa:t=this.InterpolantFactoryMethodLinear;break;case tl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ca;case this.InterpolantFactoryMethodLinear:return Pa;case this.InterpolantFactoryMethodSmooth:return tl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&Dv(s))for(let o=0,c=s.length;o!==c;++o){const l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===tl,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(s)c=!0;else{const h=o*n,d=h-n,f=h+n;for(let m=0;m!==n;++m){const _=t[h+m];if(_!==t[d+m]||_!==t[f+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const h=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}ii.prototype.ValueTypeName="";ii.prototype.TimeBufferType=Float32Array;ii.prototype.ValueBufferType=Float32Array;ii.prototype.DefaultInterpolation=Pa;class qr extends ii{constructor(e,t,n){super(e,t,n)}}qr.prototype.ValueTypeName="bool";qr.prototype.ValueBufferType=Array;qr.prototype.DefaultInterpolation=Ca;qr.prototype.InterpolantFactoryMethodLinear=void 0;qr.prototype.InterpolantFactoryMethodSmooth=void 0;class Cm extends ii{constructor(e,t,n,s){super(e,t,n,s)}}Cm.prototype.ValueTypeName="color";class Br extends ii{constructor(e,t,n,s){super(e,t,n,s)}}Br.prototype.ValueTypeName="number";class kv extends $a{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t);let l=e*o;for(let u=l+o;l!==u;l+=4)Xn.slerpFlat(r,0,a,l-o,a,l,c);return r}}class zr extends ii{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new kv(this.times,this.values,this.getValueSize(),e)}}zr.prototype.ValueTypeName="quaternion";zr.prototype.InterpolantFactoryMethodSmooth=void 0;class Yr extends ii{constructor(e,t,n){super(e,t,n)}}Yr.prototype.ValueTypeName="string";Yr.prototype.ValueBufferType=Array;Yr.prototype.DefaultInterpolation=Ca;Yr.prototype.InterpolantFactoryMethodLinear=void 0;Yr.prototype.InterpolantFactoryMethodSmooth=void 0;class Hr extends ii{constructor(e,t,n,s){super(e,t,n,s)}}Hr.prototype.ValueTypeName="vector";class Bv{constructor(e="",t=-1,n=[],s=V0){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Vn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Hv(n[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(ii.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const u=Nv(c);c=Af(c,1,u),l=Af(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Br(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let d=s[h];d||(s[h]=d=[]),d.push(l)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,m,_){if(f.length!==0){const g=[],p=[];Rm(f,g,p,m),g.length!==0&&_.push(new h(d,g,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let h=0;h<l.length;h++){const d=l[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let _=0;_<d[m].morphTargets.length;_++)f[d[m].morphTargets[_]]=-1;for(const _ in f){const g=[],p=[];for(let y=0;y!==d[m].morphTargets.length;++y){const S=d[m];g.push(S.time),p.push(S.morphTarget===_?1:0)}s.push(new Br(".morphTargetInfluence["+_+"]",g,p))}c=f.length*a}else{const f=".bones["+t[h].name+"]";n(Hr,f+".position",d,"pos",s),n(zr,f+".quaternion",d,"rot",s),n(Hr,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function zv(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Br;case"vector":case"vector2":case"vector3":case"vector4":return Hr;case"color":return Cm;case"quaternion":return zr;case"bool":case"boolean":return qr;case"string":return Yr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Hv(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=zv(i.type);if(i.times===void 0){const t=[],n=[];Rm(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Ni={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Vv{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){const f=l[h],m=l[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const Pm=new Vv;class _s{constructor(e){this.manager=e!==void 0?e:Pm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}_s.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ai={};class Gv extends Error{constructor(e,t){super(e),this.response=t}}class Nc extends _s{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Ni.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Ai[e]!==void 0){Ai[e].push({onLoad:t,onProgress:n,onError:s});return}Ai[e]=[],Ai[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=Ai[e],h=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let _=0;const g=new ReadableStream({start(p){y();function y(){h.read().then(({done:S,value:v})=>{if(S)p.close();else{_+=v.byteLength;const P=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:f});for(let A=0,L=u.length;A<L;A++){const D=u[A];D.onProgress&&D.onProgress(P)}p.enqueue(v),y()}},S=>{p.error(S)})}}});return new Response(g)}else throw new Gv(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o==="")return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(m=>f.decode(m))}}}).then(l=>{Ni.add(`file:${e}`,l);const u=Ai[e];delete Ai[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(l)}}).catch(l=>{const u=Ai[e];if(u===void 0)throw this.manager.itemError(e),l;delete Ai[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const ur=new WeakMap;class Wv extends _s{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ni.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let h=ur.get(a);h===void 0&&(h=[],ur.set(a,h)),h.push({onLoad:t,onError:s})}return a}const o=La("img");function c(){u(),t&&t(this);const h=ur.get(this)||[];for(let d=0;d<h.length;d++){const f=h[d];f.onLoad&&f.onLoad(this)}ur.delete(this),r.manager.itemEnd(e)}function l(h){u(),s&&s(h),Ni.remove(`image:${e}`);const d=ur.get(this)||[];for(let f=0;f<d.length;f++){const m=d[f];m.onError&&m.onError(h)}ur.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ni.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class jh extends _s{constructor(e){super(e)}load(e,t,n,s){const r=new Qt,a=new Wv(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class Uc extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Xv extends Uc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ye(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Pl=new Xe,Rf=new E,Cf=new E;class $h{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.mapType=gi,this.map=null,this.mapPass=null,this.matrix=new Xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gh,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Rf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Rf),Cf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Cf),t.updateMatrixWorld(),Pl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Pl,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Pl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class qv extends $h{constructor(){super(new fn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Ur*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Yv extends Uc{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new qv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Pf=new Xe,oa=new E,Ll=new E;class Kv extends $h{constructor(){super(new fn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new he(4,2),this._viewportCount=6,this._viewports=[new ht(2,1,1,1),new ht(0,1,1,1),new ht(3,1,1,1),new ht(1,1,1,1),new ht(3,0,1,1),new ht(1,0,1,1)],this._cubeDirections=[new E(1,0,0),new E(-1,0,0),new E(0,0,1),new E(0,0,-1),new E(0,1,0),new E(0,-1,0)],this._cubeUps=[new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,0,1),new E(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),oa.setFromMatrixPosition(e.matrixWorld),n.position.copy(oa),Ll.copy(n.position),Ll.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ll),n.updateMatrixWorld(),s.makeTranslation(-oa.x,-oa.y,-oa.z),Pf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Pf,n.coordinateSystem,n.reversedDepth)}}class Zh extends Uc{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Kv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Jh extends pm{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class jv extends $h{constructor(){super(new Jh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Lm extends Uc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new jv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class yr{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Il=new WeakMap;class $v extends _s{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ni.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{if(Il.has(a)===!0)s&&s(Il.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(l),r.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Ni.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Il.set(c,l),Ni.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Ni.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Zv extends fn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Jv{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const Qh="\\[\\]\\.:\\/",Qv=new RegExp("["+Qh+"]","g"),ed="[^"+Qh+"]",ex="[^"+Qh.replace("\\.","")+"]",tx=/((?:WC+[\/:])*)/.source.replace("WC",ed),nx=/(WCOD+)?/.source.replace("WCOD",ex),ix=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ed),sx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ed),rx=new RegExp("^"+tx+nx+ix+sx+"$"),ax=["material","materials","bones","map"];class ox{constructor(e,t,n){const s=n||mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class mt{constructor(e,t,n){this.path=t,this.parsedPath=n||mt.parseTrackName(t),this.node=mt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new mt.Composite(e,t,n):new mt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Qv,"")}static parseTrackName(e){const t=rx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);ax.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=mt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[s];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}mt.Composite=ox;mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};mt.prototype.GetterByBindingType=[mt.prototype._getValue_direct,mt.prototype._getValue_array,mt.prototype._getValue_arrayElement,mt.prototype._getValue_toArray];mt.prototype.SetterByBindingTypeAndVersioning=[[mt.prototype._setValue_direct,mt.prototype._setValue_direct_setNeedsUpdate,mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_array,mt.prototype._setValue_array_setNeedsUpdate,mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_arrayElement,mt.prototype._setValue_arrayElement_setNeedsUpdate,mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_fromArray,mt.prototype._setValue_fromArray_setNeedsUpdate,mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Lf=new Xe;class Im{constructor(e,t,n=0,s=1/0){this.ray=new Ka(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Bh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Lf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Lf),this}intersectObject(e,t=!0,n=[]){return th(e,this,n,t),n.sort(If),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)th(e[s],this,n,t);return n.sort(If),n}}function If(i,e){return i.distance-e.distance}function th(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)th(r[a],e,t,!0)}}const Do=new Ln;class cx extends Ia{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),s=new Float32Array(24),r=new bt;r.setIndex(new Yt(n,1)),r.setAttribute("position",new Yt(s,3)),super(r,new as({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&Do.setFromObject(this.object),Do.isEmpty())return;const e=Do.min,t=Do.max,n=this.geometry.attributes.position,s=n.array;s[0]=t.x,s[1]=t.y,s[2]=t.z,s[3]=e.x,s[4]=t.y,s[5]=t.z,s[6]=e.x,s[7]=e.y,s[8]=t.z,s[9]=t.x,s[10]=e.y,s[11]=t.z,s[12]=t.x,s[13]=t.y,s[14]=e.z,s[15]=e.x,s[16]=t.y,s[17]=e.z,s[18]=e.x,s[19]=e.y,s[20]=e.z,s[21]=t.x,s[22]=e.y,s[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}const Df=new E;let No,Dl;class Za extends yt{constructor(e=new E(0,0,1),t=new E(0,0,0),n=1,s=16776960,r=n*.2,a=r*.2){super(),this.type="ArrowHelper",No===void 0&&(No=new bt,No.setAttribute("position",new Ve([0,0,0,0,1,0],3)),Dl=new ja(.5,1,5,1),Dl.translate(0,-.5,0)),this.position.copy(t),this.line=new Lc(No,new as({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new j(Dl,new Qe({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Df.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Df,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}function Nf(i,e,t,n){const s=lx(n);switch(t){case nm:return i*e;case Ih:return i*e/s.components*s.byteLength;case Dh:return i*e/s.components*s.byteLength;case sm:return i*e*2/s.components*s.byteLength;case Nh:return i*e*2/s.components*s.byteLength;case im:return i*e*3/s.components*s.byteLength;case Bn:return i*e*4/s.components*s.byteLength;case Uh:return i*e*4/s.components*s.byteLength;case Ko:case jo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case $o:case Zo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case bu:case Eu:return Math.max(i,16)*Math.max(e,8)/4;case wu:case Tu:return Math.max(i,8)*Math.max(e,8)/2;case Au:case Ru:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Cu:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Pu:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Lu:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Iu:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Du:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Nu:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Uu:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Fu:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ou:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ku:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Bu:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case zu:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Hu:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Vu:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Gu:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Jo:case Wu:case Xu:return Math.ceil(i/4)*Math.ceil(e/4)*16;case rm:case qu:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Yu:case Ku:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function lx(i){switch(i){case gi:case Qp:return{byteLength:1,components:1};case Ta:case em:case Ya:return{byteLength:2,components:1};case Ph:case Lh:return{byteLength:2,components:4};case zs:case Ch:case ti:return{byteLength:4,components:1};case tm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Eh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Eh);function Dm(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function ux(i){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,h=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,o),h.length===0)i.bufferSubData(l,0,u);else{h.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<h.length;f++){const m=h[d],_=h[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,h[d]=_)}h.length=d+1;for(let f=0,m=h.length;f<m;f++){const _=h[f];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var hx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,dx=`#ifdef USE_ALPHAHASH
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
#endif`,fx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,px=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_x=`#ifdef USE_AOMAP
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
#endif`,vx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xx=`#ifdef USE_BATCHING
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
#endif`,yx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Mx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Sx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,bx=`#ifdef USE_IRIDESCENCE
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
#endif`,Tx=`#ifdef USE_BUMPMAP
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
#endif`,Ex=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ax=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Px=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Lx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ix=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Dx=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Nx=`#define PI 3.141592653589793
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
} // validated`,Ux=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Fx=`vec3 transformedNormal = objectNormal;
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
#endif`,Ox=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Bx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gx=`#ifdef USE_ENVMAP
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
#endif`,Wx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xx=`#ifdef USE_ENVMAP
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
#endif`,qx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Yx=`#ifdef USE_ENVMAP
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
#endif`,Kx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$x=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Zx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jx=`#ifdef USE_GRADIENTMAP
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
}`,Qx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ey=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ty=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ny=`uniform bool receiveShadow;
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
#endif`,iy=`#ifdef USE_ENVMAP
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
#endif`,sy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ry=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ay=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,oy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cy=`PhysicalMaterial material;
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
#endif`,ly=`struct PhysicalMaterial {
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
}`,uy=`
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
#endif`,hy=`#if defined( RE_IndirectDiffuse )
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
#endif`,dy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fy=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,py=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,my=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gy=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_y=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,yy=`#if defined( USE_POINTS_UV )
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
#endif`,My=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Sy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,by=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ty=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ey=`#ifdef USE_MORPHTARGETS
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
#endif`,Ay=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ry=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Cy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Py=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ly=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Iy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Dy=`#ifdef USE_NORMALMAP
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
#endif`,Ny=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Uy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Fy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Oy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ky=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,By=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,zy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Hy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Gy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Wy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ky=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,jy=`float getShadowMask() {
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
}`,$y=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Zy=`#ifdef USE_SKINNING
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
#endif`,Jy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Qy=`#ifdef USE_SKINNING
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
#endif`,eM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,nM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,iM=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,sM=`#ifdef USE_TRANSMISSION
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
#endif`,rM=`#ifdef USE_TRANSMISSION
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
#endif`,aM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,oM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const uM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hM=`uniform sampler2D t2D;
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
}`,dM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,pM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gM=`#include <common>
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
}`,_M=`#if DEPTH_PACKING == 3200
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
}`,vM=`#define DISTANCE
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
}`,xM=`#define DISTANCE
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
}`,yM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,MM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,SM=`uniform float scale;
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
}`,wM=`uniform vec3 diffuse;
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
}`,bM=`#include <common>
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
}`,TM=`uniform vec3 diffuse;
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
}`,EM=`#define LAMBERT
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
}`,AM=`#define LAMBERT
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
}`,RM=`#define MATCAP
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
}`,CM=`#define MATCAP
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
}`,PM=`#define NORMAL
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
}`,LM=`#define NORMAL
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
}`,IM=`#define PHONG
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
}`,DM=`#define PHONG
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
}`,NM=`#define STANDARD
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
}`,UM=`#define STANDARD
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
}`,FM=`#define TOON
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
}`,OM=`#define TOON
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
}`,kM=`uniform float size;
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
}`,BM=`uniform vec3 diffuse;
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
}`,zM=`#include <common>
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
}`,HM=`uniform vec3 color;
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
}`,VM=`uniform float rotation;
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
}`,GM=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:hx,alphahash_pars_fragment:dx,alphamap_fragment:fx,alphamap_pars_fragment:px,alphatest_fragment:mx,alphatest_pars_fragment:gx,aomap_fragment:_x,aomap_pars_fragment:vx,batching_pars_vertex:xx,batching_vertex:yx,begin_vertex:Mx,beginnormal_vertex:Sx,bsdfs:wx,iridescence_fragment:bx,bumpmap_pars_fragment:Tx,clipping_planes_fragment:Ex,clipping_planes_pars_fragment:Ax,clipping_planes_pars_vertex:Rx,clipping_planes_vertex:Cx,color_fragment:Px,color_pars_fragment:Lx,color_pars_vertex:Ix,color_vertex:Dx,common:Nx,cube_uv_reflection_fragment:Ux,defaultnormal_vertex:Fx,displacementmap_pars_vertex:Ox,displacementmap_vertex:kx,emissivemap_fragment:Bx,emissivemap_pars_fragment:zx,colorspace_fragment:Hx,colorspace_pars_fragment:Vx,envmap_fragment:Gx,envmap_common_pars_fragment:Wx,envmap_pars_fragment:Xx,envmap_pars_vertex:qx,envmap_physical_pars_fragment:iy,envmap_vertex:Yx,fog_vertex:Kx,fog_pars_vertex:jx,fog_fragment:$x,fog_pars_fragment:Zx,gradientmap_pars_fragment:Jx,lightmap_pars_fragment:Qx,lights_lambert_fragment:ey,lights_lambert_pars_fragment:ty,lights_pars_begin:ny,lights_toon_fragment:sy,lights_toon_pars_fragment:ry,lights_phong_fragment:ay,lights_phong_pars_fragment:oy,lights_physical_fragment:cy,lights_physical_pars_fragment:ly,lights_fragment_begin:uy,lights_fragment_maps:hy,lights_fragment_end:dy,logdepthbuf_fragment:fy,logdepthbuf_pars_fragment:py,logdepthbuf_pars_vertex:my,logdepthbuf_vertex:gy,map_fragment:_y,map_pars_fragment:vy,map_particle_fragment:xy,map_particle_pars_fragment:yy,metalnessmap_fragment:My,metalnessmap_pars_fragment:Sy,morphinstance_vertex:wy,morphcolor_vertex:by,morphnormal_vertex:Ty,morphtarget_pars_vertex:Ey,morphtarget_vertex:Ay,normal_fragment_begin:Ry,normal_fragment_maps:Cy,normal_pars_fragment:Py,normal_pars_vertex:Ly,normal_vertex:Iy,normalmap_pars_fragment:Dy,clearcoat_normal_fragment_begin:Ny,clearcoat_normal_fragment_maps:Uy,clearcoat_pars_fragment:Fy,iridescence_pars_fragment:Oy,opaque_fragment:ky,packing:By,premultiplied_alpha_fragment:zy,project_vertex:Hy,dithering_fragment:Vy,dithering_pars_fragment:Gy,roughnessmap_fragment:Wy,roughnessmap_pars_fragment:Xy,shadowmap_pars_fragment:qy,shadowmap_pars_vertex:Yy,shadowmap_vertex:Ky,shadowmask_pars_fragment:jy,skinbase_vertex:$y,skinning_pars_vertex:Zy,skinning_vertex:Jy,skinnormal_vertex:Qy,specularmap_fragment:eM,specularmap_pars_fragment:tM,tonemapping_fragment:nM,tonemapping_pars_fragment:iM,transmission_fragment:sM,transmission_pars_fragment:rM,uv_pars_fragment:aM,uv_pars_vertex:oM,uv_vertex:cM,worldpos_vertex:lM,background_vert:uM,background_frag:hM,backgroundCube_vert:dM,backgroundCube_frag:fM,cube_vert:pM,cube_frag:mM,depth_vert:gM,depth_frag:_M,distanceRGBA_vert:vM,distanceRGBA_frag:xM,equirect_vert:yM,equirect_frag:MM,linedashed_vert:SM,linedashed_frag:wM,meshbasic_vert:bM,meshbasic_frag:TM,meshlambert_vert:EM,meshlambert_frag:AM,meshmatcap_vert:RM,meshmatcap_frag:CM,meshnormal_vert:PM,meshnormal_frag:LM,meshphong_vert:IM,meshphong_frag:DM,meshphysical_vert:NM,meshphysical_frag:UM,meshtoon_vert:FM,meshtoon_frag:OM,points_vert:kM,points_frag:BM,shadow_vert:zM,shadow_frag:HM,sprite_vert:VM,sprite_frag:GM},de={common:{diffuse:{value:new ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new ye(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},oi={basic:{uniforms:hn([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:hn([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new ye(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:hn([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new ye(0)},specular:{value:new ye(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:hn([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:hn([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new ye(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:hn([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:hn([de.points,de.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:hn([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:hn([de.common,de.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:hn([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:hn([de.sprite,de.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:hn([de.common,de.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:hn([de.lights,de.fog,{color:{value:new ye(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};oi.physical={uniforms:hn([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new ye(0)},specularColor:{value:new ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const Uo={r:0,b:0,g:0},Es=new Wn,WM=new Xe;function XM(i,e,t,n,s,r,a){const o=new ye(0);let c=r===!0?0:1,l,u,h=null,d=0,f=null;function m(S){let v=S.isScene===!0?S.background:null;return v&&v.isTexture&&(v=(S.backgroundBlurriness>0?t:e).get(v)),v}function _(S){let v=!1;const P=m(S);P===null?p(o,c):P&&P.isColor&&(p(P,1),v=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(S,v){const P=m(v);P&&(P.isCubeTexture||P.mapping===Pc)?(u===void 0&&(u=new j(new st(1,1,1),new Oi({name:"BackgroundCubeMaterial",uniforms:Fr(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,L,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Es.copy(v.backgroundRotation),Es.x*=-1,Es.y*=-1,Es.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(Es.y*=-1,Es.z*=-1),u.material.uniforms.envMap.value=P,u.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(WM.makeRotationFromEuler(Es)),u.material.toneMapped=tt.getTransfer(P.colorSpace)!==_t,(h!==P||d!==P.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=P,d=P.version,f=i.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):P&&P.isTexture&&(l===void 0&&(l=new j(new Xr(2,2),new Oi({name:"BackgroundMaterial",uniforms:Fr(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:mi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=P,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=tt.getTransfer(P.colorSpace)!==_t,P.matrixAutoUpdate===!0&&P.updateMatrix(),l.material.uniforms.uvTransform.value.copy(P.matrix),(h!==P||d!==P.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=P,d=P.version,f=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,v){S.getRGB(Uo,fm(i)),n.buffers.color.setClear(Uo.r,Uo.g,Uo.b,v,a)}function y(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,v=1){o.set(S),c=v,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,p(o,c)},render:_,addToRenderList:g,dispose:y}}function qM(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(T,I,V,G,q){let ee=!1;const Z=h(G,V,I);r!==Z&&(r=Z,l(r.object)),ee=f(T,G,V,q),ee&&m(T,G,V,q),q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),(ee||a)&&(a=!1,v(T,I,V,G),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function c(){return i.createVertexArray()}function l(T){return i.bindVertexArray(T)}function u(T){return i.deleteVertexArray(T)}function h(T,I,V){const G=V.wireframe===!0;let q=n[T.id];q===void 0&&(q={},n[T.id]=q);let ee=q[I.id];ee===void 0&&(ee={},q[I.id]=ee);let Z=ee[G];return Z===void 0&&(Z=d(c()),ee[G]=Z),Z}function d(T){const I=[],V=[],G=[];for(let q=0;q<t;q++)I[q]=0,V[q]=0,G[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:V,attributeDivisors:G,object:T,attributes:{},index:null}}function f(T,I,V,G){const q=r.attributes,ee=I.attributes;let Z=0;const te=V.getAttributes();for(const W in te)if(te[W].location>=0){const ve=q[W];let De=ee[W];if(De===void 0&&(W==="instanceMatrix"&&T.instanceMatrix&&(De=T.instanceMatrix),W==="instanceColor"&&T.instanceColor&&(De=T.instanceColor)),ve===void 0||ve.attribute!==De||De&&ve.data!==De.data)return!0;Z++}return r.attributesNum!==Z||r.index!==G}function m(T,I,V,G){const q={},ee=I.attributes;let Z=0;const te=V.getAttributes();for(const W in te)if(te[W].location>=0){let ve=ee[W];ve===void 0&&(W==="instanceMatrix"&&T.instanceMatrix&&(ve=T.instanceMatrix),W==="instanceColor"&&T.instanceColor&&(ve=T.instanceColor));const De={};De.attribute=ve,ve&&ve.data&&(De.data=ve.data),q[W]=De,Z++}r.attributes=q,r.attributesNum=Z,r.index=G}function _(){const T=r.newAttributes;for(let I=0,V=T.length;I<V;I++)T[I]=0}function g(T){p(T,0)}function p(T,I){const V=r.newAttributes,G=r.enabledAttributes,q=r.attributeDivisors;V[T]=1,G[T]===0&&(i.enableVertexAttribArray(T),G[T]=1),q[T]!==I&&(i.vertexAttribDivisor(T,I),q[T]=I)}function y(){const T=r.newAttributes,I=r.enabledAttributes;for(let V=0,G=I.length;V<G;V++)I[V]!==T[V]&&(i.disableVertexAttribArray(V),I[V]=0)}function S(T,I,V,G,q,ee,Z){Z===!0?i.vertexAttribIPointer(T,I,V,q,ee):i.vertexAttribPointer(T,I,V,G,q,ee)}function v(T,I,V,G){_();const q=G.attributes,ee=V.getAttributes(),Z=I.defaultAttributeValues;for(const te in ee){const W=ee[te];if(W.location>=0){let fe=q[te];if(fe===void 0&&(te==="instanceMatrix"&&T.instanceMatrix&&(fe=T.instanceMatrix),te==="instanceColor"&&T.instanceColor&&(fe=T.instanceColor)),fe!==void 0){const ve=fe.normalized,De=fe.itemSize,$e=e.get(fe);if($e===void 0)continue;const Rt=$e.buffer,vt=$e.type,K=$e.bytesPerElement,pe=vt===i.INT||vt===i.UNSIGNED_INT||fe.gpuType===Ch;if(fe.isInterleavedBufferAttribute){const ce=fe.data,Oe=ce.stride,ke=fe.offset;if(ce.isInstancedInterleavedBuffer){for(let Ge=0;Ge<W.locationSize;Ge++)p(W.location+Ge,ce.meshPerAttribute);T.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Ge=0;Ge<W.locationSize;Ge++)g(W.location+Ge);i.bindBuffer(i.ARRAY_BUFFER,Rt);for(let Ge=0;Ge<W.locationSize;Ge++)S(W.location+Ge,De/W.locationSize,vt,ve,Oe*K,(ke+De/W.locationSize*Ge)*K,pe)}else{if(fe.isInstancedBufferAttribute){for(let ce=0;ce<W.locationSize;ce++)p(W.location+ce,fe.meshPerAttribute);T.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ce=0;ce<W.locationSize;ce++)g(W.location+ce);i.bindBuffer(i.ARRAY_BUFFER,Rt);for(let ce=0;ce<W.locationSize;ce++)S(W.location+ce,De/W.locationSize,vt,ve,De*K,De/W.locationSize*ce*K,pe)}}else if(Z!==void 0){const ve=Z[te];if(ve!==void 0)switch(ve.length){case 2:i.vertexAttrib2fv(W.location,ve);break;case 3:i.vertexAttrib3fv(W.location,ve);break;case 4:i.vertexAttrib4fv(W.location,ve);break;default:i.vertexAttrib1fv(W.location,ve)}}}}y()}function P(){D();for(const T in n){const I=n[T];for(const V in I){const G=I[V];for(const q in G)u(G[q].object),delete G[q];delete I[V]}delete n[T]}}function A(T){if(n[T.id]===void 0)return;const I=n[T.id];for(const V in I){const G=I[V];for(const q in G)u(G[q].object),delete G[q];delete I[V]}delete n[T.id]}function L(T){for(const I in n){const V=n[I];if(V[T.id]===void 0)continue;const G=V[T.id];for(const q in G)u(G[q].object),delete G[q];delete V[T.id]}}function D(){b(),a=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:D,resetDefaultState:b,dispose:P,releaseStatesOfGeometry:A,releaseStatesOfProgram:L,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function YM(i,e,t){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function o(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let f=0;for(let m=0;m<h;m++)f+=u[m];t.update(f,n,1)}function c(l,u,h,d){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<l.length;m++)a(l[m],u[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let m=0;for(let _=0;_<h;_++)m+=u[_]*d[_];t.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function KM(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==Bn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const D=L===Ya&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==gi&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==ti&&!D)}function c(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=m>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:P,maxSamples:A}}function jM(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Ji,o=new Ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const m=h.clippingPlanes,_=h.clipIntersection,g=h.clipShadows,p=i.get(h);if(!s||m===null||m.length===0||r&&!g)r?u(null):l();else{const y=r?0:n,S=y*4;let v=p.clippingState||null;c.value=v,v=u(m,d,S,f);for(let P=0;P!==S;++P)v[P]=t[P];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,m){const _=h!==null?h.length:0;let g=null;if(_!==0){if(g=c.value,m!==!0||g===null){const p=f+_*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let S=0,v=f;S!==_;++S,v+=4)a.copy(h[S]).applyMatrix4(y,o),a.normal.toArray(g,v),g[v+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function $M(i){let e=new WeakMap;function t(a,o){return o===dc?a.mapping=Dr:o===Su&&(a.mapping=Nr),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===dc||o===Su)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new z_(c.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const fr=4,Uf=[.125,.215,.35,.446,.526,.582],Ns=20,Nl=new Jh,Ff=new ye;let Ul=null,Fl=0,Ol=0,kl=!1;const Ls=(1+Math.sqrt(5))/2,hr=1/Ls,Of=[new E(-Ls,hr,0),new E(Ls,hr,0),new E(-hr,0,Ls),new E(hr,0,Ls),new E(0,Ls,-hr),new E(0,Ls,hr),new E(-1,1,-1),new E(1,1,-1),new E(-1,1,1),new E(1,1,1)],ZM=new E;class kf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=ZM}=r;Ul=this._renderer.getRenderTarget(),Fl=this._renderer.getActiveCubeFace(),Ol=this._renderer.getActiveMipmapLevel(),kl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ul,Fl,Ol),this._renderer.xr.enabled=kl,e.scissorTest=!1,Fo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Dr||e.mapping===Nr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ul=this._renderer.getRenderTarget(),Fl=this._renderer.getActiveCubeFace(),Ol=this._renderer.getActiveMipmapLevel(),kl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Rn,minFilter:Rn,generateMipmaps:!1,type:Ya,format:Bn,colorSpace:gn,depthBuffer:!1},s=Bf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bf(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=JM(r)),this._blurMaterial=QM(r,e,t)}return s}_compileMaterial(e){const t=new j(this._lodPlanes[0],e);this._renderer.compile(t,Nl)}_sceneToCubeUV(e,t,n,s,r){const c=new fn(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Ff),h.toneMapping=rs,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));const _=new Qe({name:"PMREM.Background",side:yn,depthWrite:!1,depthTest:!1}),g=new j(new st,_);let p=!1;const y=e.background;y?y.isColor&&(_.color.copy(y),e.background=null,p=!0):(_.color.copy(Ff),p=!0);for(let S=0;S<6;S++){const v=S%3;v===0?(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[S],r.y,r.z)):v===1?(c.up.set(0,0,l[S]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[S],r.z)):(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[S]));const P=this._cubeSize;Fo(s,v*P,S>2?P:0,P,P),h.setRenderTarget(s),p&&h.render(g,c),h.render(e,c)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=y}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Dr||e.mapping===Nr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zf());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new j(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;Fo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Nl)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Of[(s-r-1)%Of.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new j(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ns-1),_=r/m,g=isFinite(r)?1+Math.floor(u*_):Ns;g>Ns&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ns}`);const p=[];let y=0;for(let L=0;L<Ns;++L){const D=L/_,b=Math.exp(-D*D/2);p.push(b),L===0?y+=b:L<g&&(y+=2*b)}for(let L=0;L<p.length;L++)p[L]=p[L]/y;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:S}=this;d.dTheta.value=m,d.mipInt.value=S-n;const v=this._sizeLods[s],P=3*v*(s>S-fr?s-S+fr:0),A=4*(this._cubeSize-v);Fo(t,P,A,3*v,2*v),c.setRenderTarget(t),c.render(h,Nl)}}function JM(i){const e=[],t=[],n=[];let s=i;const r=i-fr+1+Uf.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-fr?c=Uf[a-i+fr-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,m=6,_=3,g=2,p=1,y=new Float32Array(_*m*f),S=new Float32Array(g*m*f),v=new Float32Array(p*m*f);for(let A=0;A<f;A++){const L=A%3*2/3-1,D=A>2?0:-1,b=[L,D,0,L+2/3,D,0,L+2/3,D+1,0,L,D,0,L+2/3,D+1,0,L,D+1,0];y.set(b,_*m*A),S.set(d,g*m*A);const T=[A,A,A,A,A,A];v.set(T,p*m*A)}const P=new bt;P.setAttribute("position",new Yt(y,_)),P.setAttribute("uv",new Yt(S,g)),P.setAttribute("faceIndex",new Yt(v,p)),e.push(P),s>fr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Bf(i,e,t){const n=new Hs(i,e,t);return n.texture.mapping=Pc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Fo(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function QM(i,e,t){const n=new Float32Array(Ns),s=new E(0,1,0);return new Oi({name:"SphericalGaussianBlur",defines:{n:Ns,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:td(),fragmentShader:`

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
		`,blending:ss,depthTest:!1,depthWrite:!1})}function zf(){return new Oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:td(),fragmentShader:`

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
		`,blending:ss,depthTest:!1,depthWrite:!1})}function Hf(){return new Oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:td(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ss,depthTest:!1,depthWrite:!1})}function td(){return`

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
	`}function eS(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===dc||c===Su,u=c===Dr||c===Nr;if(l||u){let h=e.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new kf(i)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return l&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new kf(i)),h=l?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function tS(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&_r("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function nS(i,e,t,n){const s={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function c(h){const d=h.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function l(h){const d=[],f=h.index,m=h.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let S=0,v=y.length;S<v;S+=3){const P=y[S+0],A=y[S+1],L=y[S+2];d.push(P,A,A,L,L,P)}}else if(m!==void 0){const y=m.array;_=m.version;for(let S=0,v=y.length/3-1;S<v;S+=3){const P=S+0,A=S+1,L=S+2;d.push(P,A,A,L,L,P)}}else return;const g=new(cm(d)?dm:hm)(d,1);g.version=_;const p=r.get(h);p&&e.remove(p),r.set(h,g)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function iS(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*a),t.update(f,n,1)}function l(d,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,d*a,m),t.update(f,n,m))}function u(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function h(d,f,m,_){if(m===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,m);let p=0;for(let y=0;y<m;y++)p+=f[y]*_[y];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function sS(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function rS(i,e,t){const n=new WeakMap,s=new ht;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let T=function(){D.dispose(),n.delete(o),o.removeEventListener("dispose",T)};var f=T;d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let v=0;m===!0&&(v=1),_===!0&&(v=2),g===!0&&(v=3);let P=o.attributes.position.count*v,A=1;P>e.maxTextureSize&&(A=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const L=new Float32Array(P*A*4*h),D=new lm(L,P,A,h);D.type=ti,D.needsUpdate=!0;const b=v*4;for(let I=0;I<h;I++){const V=p[I],G=y[I],q=S[I],ee=P*A*4*I;for(let Z=0;Z<V.count;Z++){const te=Z*b;m===!0&&(s.fromBufferAttribute(V,Z),L[ee+te+0]=s.x,L[ee+te+1]=s.y,L[ee+te+2]=s.z,L[ee+te+3]=0),_===!0&&(s.fromBufferAttribute(G,Z),L[ee+te+4]=s.x,L[ee+te+5]=s.y,L[ee+te+6]=s.z,L[ee+te+7]=0),g===!0&&(s.fromBufferAttribute(q,Z),L[ee+te+8]=s.x,L[ee+te+9]=s.y,L[ee+te+10]=s.z,L[ee+te+11]=q.itemSize===4?s.w:1)}}d={count:h,texture:D,size:new he(P,A)},n.set(o,d),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let g=0;g<l.length;g++)m+=l[g];const _=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function aS(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return h}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}const Nm=new Qt,Vf=new vm(1,1),Um=new lm,Fm=new w_,Om=new mm,Gf=[],Wf=[],Xf=new Float32Array(16),qf=new Float32Array(9),Yf=new Float32Array(4);function Kr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Gf[s];if(r===void 0&&(r=new Float32Array(s),Gf[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function jt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function $t(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Fc(i,e){let t=Wf[e];t===void 0&&(t=new Int32Array(e),Wf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function oS(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function cS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;i.uniform2fv(this.addr,e),$t(t,e)}}function lS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(jt(t,e))return;i.uniform3fv(this.addr,e),$t(t,e)}}function uS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;i.uniform4fv(this.addr,e),$t(t,e)}}function hS(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(jt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),$t(t,e)}else{if(jt(t,n))return;Yf.set(n),i.uniformMatrix2fv(this.addr,!1,Yf),$t(t,n)}}function dS(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(jt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),$t(t,e)}else{if(jt(t,n))return;qf.set(n),i.uniformMatrix3fv(this.addr,!1,qf),$t(t,n)}}function fS(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(jt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),$t(t,e)}else{if(jt(t,n))return;Xf.set(n),i.uniformMatrix4fv(this.addr,!1,Xf),$t(t,n)}}function pS(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function mS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;i.uniform2iv(this.addr,e),$t(t,e)}}function gS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(jt(t,e))return;i.uniform3iv(this.addr,e),$t(t,e)}}function _S(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;i.uniform4iv(this.addr,e),$t(t,e)}}function vS(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function xS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;i.uniform2uiv(this.addr,e),$t(t,e)}}function yS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(jt(t,e))return;i.uniform3uiv(this.addr,e),$t(t,e)}}function MS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;i.uniform4uiv(this.addr,e),$t(t,e)}}function SS(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Vf.compareFunction=om,r=Vf):r=Nm,t.setTexture2D(e||r,s)}function wS(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Fm,s)}function bS(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Om,s)}function TS(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Um,s)}function ES(i){switch(i){case 5126:return oS;case 35664:return cS;case 35665:return lS;case 35666:return uS;case 35674:return hS;case 35675:return dS;case 35676:return fS;case 5124:case 35670:return pS;case 35667:case 35671:return mS;case 35668:case 35672:return gS;case 35669:case 35673:return _S;case 5125:return vS;case 36294:return xS;case 36295:return yS;case 36296:return MS;case 35678:case 36198:case 36298:case 36306:case 35682:return SS;case 35679:case 36299:case 36307:return wS;case 35680:case 36300:case 36308:case 36293:return bS;case 36289:case 36303:case 36311:case 36292:return TS}}function AS(i,e){i.uniform1fv(this.addr,e)}function RS(i,e){const t=Kr(e,this.size,2);i.uniform2fv(this.addr,t)}function CS(i,e){const t=Kr(e,this.size,3);i.uniform3fv(this.addr,t)}function PS(i,e){const t=Kr(e,this.size,4);i.uniform4fv(this.addr,t)}function LS(i,e){const t=Kr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function IS(i,e){const t=Kr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function DS(i,e){const t=Kr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function NS(i,e){i.uniform1iv(this.addr,e)}function US(i,e){i.uniform2iv(this.addr,e)}function FS(i,e){i.uniform3iv(this.addr,e)}function OS(i,e){i.uniform4iv(this.addr,e)}function kS(i,e){i.uniform1uiv(this.addr,e)}function BS(i,e){i.uniform2uiv(this.addr,e)}function zS(i,e){i.uniform3uiv(this.addr,e)}function HS(i,e){i.uniform4uiv(this.addr,e)}function VS(i,e,t){const n=this.cache,s=e.length,r=Fc(t,s);jt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Nm,r[a])}function GS(i,e,t){const n=this.cache,s=e.length,r=Fc(t,s);jt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Fm,r[a])}function WS(i,e,t){const n=this.cache,s=e.length,r=Fc(t,s);jt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Om,r[a])}function XS(i,e,t){const n=this.cache,s=e.length,r=Fc(t,s);jt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Um,r[a])}function qS(i){switch(i){case 5126:return AS;case 35664:return RS;case 35665:return CS;case 35666:return PS;case 35674:return LS;case 35675:return IS;case 35676:return DS;case 5124:case 35670:return NS;case 35667:case 35671:return US;case 35668:case 35672:return FS;case 35669:case 35673:return OS;case 5125:return kS;case 36294:return BS;case 36295:return zS;case 36296:return HS;case 35678:case 36198:case 36298:case 36306:case 35682:return VS;case 35679:case 36299:case 36307:return GS;case 35680:case 36300:case 36308:case 36293:return WS;case 36289:case 36303:case 36311:case 36292:return XS}}class YS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ES(t.type)}}class KS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=qS(t.type)}}class jS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Bl=/(\w+)(\])?(\[|\.)?/g;function Kf(i,e){i.seq.push(e),i.map[e.id]=e}function $S(i,e,t){const n=i.name,s=n.length;for(Bl.lastIndex=0;;){const r=Bl.exec(n),a=Bl.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Kf(t,l===void 0?new YS(o,i,e):new KS(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new jS(o),Kf(t,h)),t=h}}}class Qo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);$S(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function jf(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const ZS=37297;let JS=0;function QS(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const $f=new Ke;function ew(i){tt._getMatrix($f,tt.workingColorSpace,i);const e=`mat3( ${$f.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(i)){case pc:return[e,"LinearTransferOETF"];case _t:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Zf(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+QS(i.getShaderSource(e),o)}else return r}function tw(i,e){const t=ew(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function nw(i,e){let t;switch(e){case U0:t="Linear";break;case F0:t="Reinhard";break;case O0:t="Cineon";break;case $p:t="ACESFilmic";break;case B0:t="AgX";break;case z0:t="Neutral";break;case k0:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Oo=new E;function iw(){tt.getLuminanceCoefficients(Oo);const i=Oo.x.toFixed(4),e=Oo.y.toFixed(4),t=Oo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sw(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fa).join(`
`)}function rw(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function aw(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function fa(i){return i!==""}function Jf(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Qf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ow=/^[ \t]*#include +<([\w\d./]+)>/gm;function nh(i){return i.replace(ow,lw)}const cw=new Map;function lw(i,e){let t=je[e];if(t===void 0){const n=cw.get(e);if(n!==void 0)t=je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return nh(t)}const uw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ep(i){return i.replace(uw,hw)}function hw(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function tp(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function dw(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ah?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===p0?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Li&&(e="SHADOWMAP_TYPE_VSM"),e}function fw(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Dr:case Nr:e="ENVMAP_TYPE_CUBE";break;case Pc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function pw(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Nr&&(e="ENVMAP_MODE_REFRACTION"),e}function mw(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Rh:e="ENVMAP_BLENDING_MULTIPLY";break;case D0:e="ENVMAP_BLENDING_MIX";break;case N0:e="ENVMAP_BLENDING_ADD";break}return e}function gw(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function _w(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=dw(t),l=fw(t),u=pw(t),h=mw(t),d=gw(t),f=sw(t),m=rw(r),_=s.createProgram();let g,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(fa).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(fa).join(`
`),p.length>0&&(p+=`
`)):(g=[tp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fa).join(`
`),p=[tp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==rs?"#define TONE_MAPPING":"",t.toneMapping!==rs?je.tonemapping_pars_fragment:"",t.toneMapping!==rs?nw("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,tw("linearToOutputTexel",t.outputColorSpace),iw(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fa).join(`
`)),a=nh(a),a=Jf(a,t),a=Qf(a,t),o=nh(o),o=Jf(o,t),o=Qf(o,t),a=ep(a),o=ep(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Hd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Hd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=y+g+a,v=y+p+o,P=jf(s,s.VERTEX_SHADER,S),A=jf(s,s.FRAGMENT_SHADER,v);s.attachShader(_,P),s.attachShader(_,A),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function L(I){if(i.debug.checkShaderErrors){const V=s.getProgramInfoLog(_)||"",G=s.getShaderInfoLog(P)||"",q=s.getShaderInfoLog(A)||"",ee=V.trim(),Z=G.trim(),te=q.trim();let W=!0,fe=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,P,A);else{const ve=Zf(s,P,"vertex"),De=Zf(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+ee+`
`+ve+`
`+De)}else ee!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ee):(Z===""||te==="")&&(fe=!1);fe&&(I.diagnostics={runnable:W,programLog:ee,vertexShader:{log:Z,prefix:g},fragmentShader:{log:te,prefix:p}})}s.deleteShader(P),s.deleteShader(A),D=new Qo(s,_),b=aw(s,_)}let D;this.getUniforms=function(){return D===void 0&&L(this),D};let b;this.getAttributes=function(){return b===void 0&&L(this),b};let T=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=s.getProgramParameter(_,ZS)),T},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=JS++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=A,this}let vw=0;class xw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new yw(e),t.set(e,n)),n}}class yw{constructor(e){this.id=vw++,this.code=e,this.usedTimes=0}}function Mw(i,e,t,n,s,r,a){const o=new Bh,c=new xw,l=new Set,u=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function g(b,T,I,V,G){const q=V.fog,ee=G.geometry,Z=b.isMeshStandardMaterial?V.environment:null,te=(b.isMeshStandardMaterial?t:e).get(b.envMap||Z),W=te&&te.mapping===Pc?te.image.height:null,fe=m[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const ve=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,De=ve!==void 0?ve.length:0;let $e=0;ee.morphAttributes.position!==void 0&&($e=1),ee.morphAttributes.normal!==void 0&&($e=2),ee.morphAttributes.color!==void 0&&($e=3);let Rt,vt,K,pe;if(fe){const dt=oi[fe];Rt=dt.vertexShader,vt=dt.fragmentShader}else Rt=b.vertexShader,vt=b.fragmentShader,c.update(b),K=c.getVertexShaderID(b),pe=c.getFragmentShaderID(b);const ce=i.getRenderTarget(),Oe=i.state.buffers.depth.getReversed(),ke=G.isInstancedMesh===!0,Ge=G.isBatchedMesh===!0,kt=!!b.map,at=!!b.matcap,N=!!te,Mt=!!b.aoMap,Ue=!!b.lightMap,ut=!!b.bumpMap,Ie=!!b.normalMap,Ct=!!b.displacementMap,Se=!!b.emissiveMap,Ze=!!b.metalnessMap,Zt=!!b.roughnessMap,Bt=b.anisotropy>0,C=b.clearcoat>0,M=b.dispersion>0,B=b.iridescence>0,Y=b.sheen>0,ne=b.transmission>0,X=Bt&&!!b.anisotropyMap,Le=C&&!!b.clearcoatMap,oe=C&&!!b.clearcoatNormalMap,Ee=C&&!!b.clearcoatRoughnessMap,Ce=B&&!!b.iridescenceMap,re=B&&!!b.iridescenceThicknessMap,_e=Y&&!!b.sheenColorMap,ze=Y&&!!b.sheenRoughnessMap,Pe=!!b.specularMap,me=!!b.specularColorMap,Ye=!!b.specularIntensityMap,U=ne&&!!b.transmissionMap,ae=ne&&!!b.thicknessMap,le=!!b.gradientMap,Me=!!b.alphaMap,ie=b.alphaTest>0,Q=!!b.alphaHash,be=!!b.extensions;let We=rs;b.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(We=i.toneMapping);const St={shaderID:fe,shaderType:b.type,shaderName:b.name,vertexShader:Rt,fragmentShader:vt,defines:b.defines,customVertexShaderID:K,customFragmentShaderID:pe,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Ge,batchingColor:Ge&&G._colorsTexture!==null,instancing:ke,instancingColor:ke&&G.instanceColor!==null,instancingMorph:ke&&G.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ce===null?i.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:gn,alphaToCoverage:!!b.alphaToCoverage,map:kt,matcap:at,envMap:N,envMapMode:N&&te.mapping,envMapCubeUVHeight:W,aoMap:Mt,lightMap:Ue,bumpMap:ut,normalMap:Ie,displacementMap:d&&Ct,emissiveMap:Se,normalMapObjectSpace:Ie&&b.normalMapType===q0,normalMapTangentSpace:Ie&&b.normalMapType===Fh,metalnessMap:Ze,roughnessMap:Zt,anisotropy:Bt,anisotropyMap:X,clearcoat:C,clearcoatMap:Le,clearcoatNormalMap:oe,clearcoatRoughnessMap:Ee,dispersion:M,iridescence:B,iridescenceMap:Ce,iridescenceThicknessMap:re,sheen:Y,sheenColorMap:_e,sheenRoughnessMap:ze,specularMap:Pe,specularColorMap:me,specularIntensityMap:Ye,transmission:ne,transmissionMap:U,thicknessMap:ae,gradientMap:le,opaque:b.transparent===!1&&b.blending===gr&&b.alphaToCoverage===!1,alphaMap:Me,alphaTest:ie,alphaHash:Q,combine:b.combine,mapUv:kt&&_(b.map.channel),aoMapUv:Mt&&_(b.aoMap.channel),lightMapUv:Ue&&_(b.lightMap.channel),bumpMapUv:ut&&_(b.bumpMap.channel),normalMapUv:Ie&&_(b.normalMap.channel),displacementMapUv:Ct&&_(b.displacementMap.channel),emissiveMapUv:Se&&_(b.emissiveMap.channel),metalnessMapUv:Ze&&_(b.metalnessMap.channel),roughnessMapUv:Zt&&_(b.roughnessMap.channel),anisotropyMapUv:X&&_(b.anisotropyMap.channel),clearcoatMapUv:Le&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:oe&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:re&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:ze&&_(b.sheenRoughnessMap.channel),specularMapUv:Pe&&_(b.specularMap.channel),specularColorMapUv:me&&_(b.specularColorMap.channel),specularIntensityMapUv:Ye&&_(b.specularIntensityMap.channel),transmissionMapUv:U&&_(b.transmissionMap.channel),thicknessMapUv:ae&&_(b.thicknessMap.channel),alphaMapUv:Me&&_(b.alphaMap.channel),vertexTangents:!!ee.attributes.tangent&&(Ie||Bt),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!ee.attributes.uv&&(kt||Me),fog:!!q,useFog:b.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Oe,skinning:G.isSkinnedMesh===!0,morphTargets:ee.morphAttributes.position!==void 0,morphNormals:ee.morphAttributes.normal!==void 0,morphColors:ee.morphAttributes.color!==void 0,morphTargetsCount:De,morphTextureStride:$e,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:We,decodeVideoTexture:kt&&b.map.isVideoTexture===!0&&tt.getTransfer(b.map.colorSpace)===_t,decodeVideoTextureEmissive:Se&&b.emissiveMap.isVideoTexture===!0&&tt.getTransfer(b.emissiveMap.colorSpace)===_t,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Xt,flipSided:b.side===yn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:be&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&b.extensions.multiDraw===!0||Ge)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return St.vertexUv1s=l.has(1),St.vertexUv2s=l.has(2),St.vertexUv3s=l.has(3),l.clear(),St}function p(b){const T=[];if(b.shaderID?T.push(b.shaderID):(T.push(b.customVertexShaderID),T.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)T.push(I),T.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(y(T,b),S(T,b),T.push(i.outputColorSpace)),T.push(b.customProgramCacheKey),T.join()}function y(b,T){b.push(T.precision),b.push(T.outputColorSpace),b.push(T.envMapMode),b.push(T.envMapCubeUVHeight),b.push(T.mapUv),b.push(T.alphaMapUv),b.push(T.lightMapUv),b.push(T.aoMapUv),b.push(T.bumpMapUv),b.push(T.normalMapUv),b.push(T.displacementMapUv),b.push(T.emissiveMapUv),b.push(T.metalnessMapUv),b.push(T.roughnessMapUv),b.push(T.anisotropyMapUv),b.push(T.clearcoatMapUv),b.push(T.clearcoatNormalMapUv),b.push(T.clearcoatRoughnessMapUv),b.push(T.iridescenceMapUv),b.push(T.iridescenceThicknessMapUv),b.push(T.sheenColorMapUv),b.push(T.sheenRoughnessMapUv),b.push(T.specularMapUv),b.push(T.specularColorMapUv),b.push(T.specularIntensityMapUv),b.push(T.transmissionMapUv),b.push(T.thicknessMapUv),b.push(T.combine),b.push(T.fogExp2),b.push(T.sizeAttenuation),b.push(T.morphTargetsCount),b.push(T.morphAttributeCount),b.push(T.numDirLights),b.push(T.numPointLights),b.push(T.numSpotLights),b.push(T.numSpotLightMaps),b.push(T.numHemiLights),b.push(T.numRectAreaLights),b.push(T.numDirLightShadows),b.push(T.numPointLightShadows),b.push(T.numSpotLightShadows),b.push(T.numSpotLightShadowsWithMaps),b.push(T.numLightProbes),b.push(T.shadowMapType),b.push(T.toneMapping),b.push(T.numClippingPlanes),b.push(T.numClipIntersection),b.push(T.depthPacking)}function S(b,T){o.disableAll(),T.supportsVertexTextures&&o.enable(0),T.instancing&&o.enable(1),T.instancingColor&&o.enable(2),T.instancingMorph&&o.enable(3),T.matcap&&o.enable(4),T.envMap&&o.enable(5),T.normalMapObjectSpace&&o.enable(6),T.normalMapTangentSpace&&o.enable(7),T.clearcoat&&o.enable(8),T.iridescence&&o.enable(9),T.alphaTest&&o.enable(10),T.vertexColors&&o.enable(11),T.vertexAlphas&&o.enable(12),T.vertexUv1s&&o.enable(13),T.vertexUv2s&&o.enable(14),T.vertexUv3s&&o.enable(15),T.vertexTangents&&o.enable(16),T.anisotropy&&o.enable(17),T.alphaHash&&o.enable(18),T.batching&&o.enable(19),T.dispersion&&o.enable(20),T.batchingColor&&o.enable(21),T.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),b.push(o.mask)}function v(b){const T=m[b.type];let I;if(T){const V=oi[T];I=F_.clone(V.uniforms)}else I=b.uniforms;return I}function P(b,T){let I;for(let V=0,G=u.length;V<G;V++){const q=u[V];if(q.cacheKey===T){I=q,++I.usedTimes;break}}return I===void 0&&(I=new _w(i,T,b,r),u.push(I)),I}function A(b){if(--b.usedTimes===0){const T=u.indexOf(b);u[T]=u[u.length-1],u.pop(),b.destroy()}}function L(b){c.remove(b)}function D(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:P,releaseProgram:A,releaseShaderCache:L,programs:u,dispose:D}}function Sw(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function ww(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function np(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function ip(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,d,f,m,_,g){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:m,renderOrder:h.renderOrder,z:_,group:g},i[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=h.renderOrder,p.z=_,p.group=g),e++,p}function o(h,d,f,m,_,g){const p=a(h,d,f,m,_,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(h,d,f,m,_,g){const p=a(h,d,f,m,_,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function l(h,d){t.length>1&&t.sort(h||ww),n.length>1&&n.sort(d||np),s.length>1&&s.sort(d||np)}function u(){for(let h=e,d=i.length;h<d;h++){const f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:u,sort:l}}function bw(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new ip,i.set(n,[a])):s>=r.length?(a=new ip,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Tw(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new E,color:new ye};break;case"SpotLight":t={position:new E,direction:new E,color:new ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new ye,groundColor:new ye};break;case"RectAreaLight":t={color:new ye,position:new E,halfWidth:new E,halfHeight:new E};break}return i[e.id]=t,t}}}function Ew(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Aw=0;function Rw(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Cw(i){const e=new Tw,t=Ew(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new E);const s=new E,r=new Xe,a=new Xe;function o(l){let u=0,h=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,y=0,S=0,v=0,P=0,A=0,L=0;l.sort(Rw);for(let b=0,T=l.length;b<T;b++){const I=l[b],V=I.color,G=I.intensity,q=I.distance,ee=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=V.r*G,h+=V.g*G,d+=V.b*G;else if(I.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(I.sh.coefficients[Z],G);L++}else if(I.isDirectionalLight){const Z=e.get(I);if(Z.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const te=I.shadow,W=t.get(I);W.shadowIntensity=te.intensity,W.shadowBias=te.bias,W.shadowNormalBias=te.normalBias,W.shadowRadius=te.radius,W.shadowMapSize=te.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=ee,n.directionalShadowMatrix[f]=I.shadow.matrix,y++}n.directional[f]=Z,f++}else if(I.isSpotLight){const Z=e.get(I);Z.position.setFromMatrixPosition(I.matrixWorld),Z.color.copy(V).multiplyScalar(G),Z.distance=q,Z.coneCos=Math.cos(I.angle),Z.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Z.decay=I.decay,n.spot[_]=Z;const te=I.shadow;if(I.map&&(n.spotLightMap[P]=I.map,P++,te.updateMatrices(I),I.castShadow&&A++),n.spotLightMatrix[_]=te.matrix,I.castShadow){const W=t.get(I);W.shadowIntensity=te.intensity,W.shadowBias=te.bias,W.shadowNormalBias=te.normalBias,W.shadowRadius=te.radius,W.shadowMapSize=te.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=ee,v++}_++}else if(I.isRectAreaLight){const Z=e.get(I);Z.color.copy(V).multiplyScalar(G),Z.halfWidth.set(I.width*.5,0,0),Z.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=Z,g++}else if(I.isPointLight){const Z=e.get(I);if(Z.color.copy(I.color).multiplyScalar(I.intensity),Z.distance=I.distance,Z.decay=I.decay,I.castShadow){const te=I.shadow,W=t.get(I);W.shadowIntensity=te.intensity,W.shadowBias=te.bias,W.shadowNormalBias=te.normalBias,W.shadowRadius=te.radius,W.shadowMapSize=te.mapSize,W.shadowCameraNear=te.camera.near,W.shadowCameraFar=te.camera.far,n.pointShadow[m]=W,n.pointShadowMap[m]=ee,n.pointShadowMatrix[m]=I.shadow.matrix,S++}n.point[m]=Z,m++}else if(I.isHemisphereLight){const Z=e.get(I);Z.skyColor.copy(I.color).multiplyScalar(G),Z.groundColor.copy(I.groundColor).multiplyScalar(G),n.hemi[p]=Z,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const D=n.hash;(D.directionalLength!==f||D.pointLength!==m||D.spotLength!==_||D.rectAreaLength!==g||D.hemiLength!==p||D.numDirectionalShadows!==y||D.numPointShadows!==S||D.numSpotShadows!==v||D.numSpotMaps!==P||D.numLightProbes!==L)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+P-A,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=L,D.directionalLength=f,D.pointLength=m,D.spotLength=_,D.rectAreaLength=g,D.hemiLength=p,D.numDirectionalShadows=y,D.numPointShadows=S,D.numSpotShadows=v,D.numSpotMaps=P,D.numLightProbes=L,n.version=Aw++)}function c(l,u){let h=0,d=0,f=0,m=0,_=0;const g=u.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const S=l[p];if(S.isDirectionalLight){const v=n.directional[h];v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),h++}else if(S.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),f++}else if(S.isRectAreaLight){const v=n.rectArea[m];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(g),a.identity(),r.copy(S.matrixWorld),r.premultiply(g),a.extractRotation(r),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),m++}else if(S.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(g),d++}else if(S.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(g),_++}}}return{setup:o,setupView:c,state:n}}function sp(i){const e=new Cw(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Pw(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new sp(i),e.set(s,[o])):r>=a.length?(o=new sp(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Lw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Iw=`uniform sampler2D shadow_pass;
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
}`;function Dw(i,e,t){let n=new Gh;const s=new he,r=new he,a=new ht,o=new Lv({depthPacking:X0}),c=new Iv,l={},u=t.maxTextureSize,h={[mi]:yn,[yn]:mi,[Xt]:Xt},d=new Oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:Lw,fragmentShader:Iw}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new bt;m.setAttribute("position",new Yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new j(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ah;let p=this.type;this.render=function(A,L,D){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;const b=i.getRenderTarget(),T=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),V=i.state;V.setBlending(ss),V.buffers.depth.getReversed()?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const G=p!==Li&&this.type===Li,q=p===Li&&this.type!==Li;for(let ee=0,Z=A.length;ee<Z;ee++){const te=A[ee],W=te.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const fe=W.getFrameExtents();if(s.multiply(fe),r.copy(W.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/fe.x),s.x=r.x*fe.x,W.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/fe.y),s.y=r.y*fe.y,W.mapSize.y=r.y)),W.map===null||G===!0||q===!0){const De=this.type!==Li?{minFilter:pn,magFilter:pn}:{};W.map!==null&&W.map.dispose(),W.map=new Hs(s.x,s.y,De),W.map.texture.name=te.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const ve=W.getViewportCount();for(let De=0;De<ve;De++){const $e=W.getViewport(De);a.set(r.x*$e.x,r.y*$e.y,r.x*$e.z,r.y*$e.w),V.viewport(a),W.updateMatrices(te,De),n=W.getFrustum(),v(L,D,W.camera,te,this.type)}W.isPointLightShadow!==!0&&this.type===Li&&y(W,D),W.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(b,T,I)};function y(A,L){const D=e.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Hs(s.x,s.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(L,null,D,d,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(L,null,D,f,_,null)}function S(A,L,D,b){let T=null;const I=D.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(I!==void 0)T=I;else if(T=D.isPointLight===!0?c:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const V=T.uuid,G=L.uuid;let q=l[V];q===void 0&&(q={},l[V]=q);let ee=q[G];ee===void 0&&(ee=T.clone(),q[G]=ee,L.addEventListener("dispose",P)),T=ee}if(T.visible=L.visible,T.wireframe=L.wireframe,b===Li?T.side=L.shadowSide!==null?L.shadowSide:L.side:T.side=L.shadowSide!==null?L.shadowSide:h[L.side],T.alphaMap=L.alphaMap,T.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,T.map=L.map,T.clipShadows=L.clipShadows,T.clippingPlanes=L.clippingPlanes,T.clipIntersection=L.clipIntersection,T.displacementMap=L.displacementMap,T.displacementScale=L.displacementScale,T.displacementBias=L.displacementBias,T.wireframeLinewidth=L.wireframeLinewidth,T.linewidth=L.linewidth,D.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const V=i.properties.get(T);V.light=D}return T}function v(A,L,D,b,T){if(A.visible===!1)return;if(A.layers.test(L.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&T===Li)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,A.matrixWorld);const G=e.update(A),q=A.material;if(Array.isArray(q)){const ee=G.groups;for(let Z=0,te=ee.length;Z<te;Z++){const W=ee[Z],fe=q[W.materialIndex];if(fe&&fe.visible){const ve=S(A,fe,b,T);A.onBeforeShadow(i,A,L,D,G,ve,W),i.renderBufferDirect(D,null,G,ve,A,W),A.onAfterShadow(i,A,L,D,G,ve,W)}}}else if(q.visible){const ee=S(A,q,b,T);A.onBeforeShadow(i,A,L,D,G,ee,null),i.renderBufferDirect(D,null,G,ee,A,null),A.onAfterShadow(i,A,L,D,G,ee,null)}}const V=A.children;for(let G=0,q=V.length;G<q;G++)v(V[G],L,D,b,T)}function P(A){A.target.removeEventListener("dispose",P);for(const D in l){const b=l[D],T=A.target.uuid;T in b&&(b[T].dispose(),delete b[T])}}}const Nw={[mu]:gu,[_u]:yu,[vu]:Mu,[Ir]:xu,[gu]:mu,[yu]:_u,[Mu]:vu,[xu]:Ir};function Uw(i,e){function t(){let U=!1;const ae=new ht;let le=null;const Me=new ht(0,0,0,0);return{setMask:function(ie){le!==ie&&!U&&(i.colorMask(ie,ie,ie,ie),le=ie)},setLocked:function(ie){U=ie},setClear:function(ie,Q,be,We,St){St===!0&&(ie*=We,Q*=We,be*=We),ae.set(ie,Q,be,We),Me.equals(ae)===!1&&(i.clearColor(ie,Q,be,We),Me.copy(ae))},reset:function(){U=!1,le=null,Me.set(-1,0,0,0)}}}function n(){let U=!1,ae=!1,le=null,Me=null,ie=null;return{setReversed:function(Q){if(ae!==Q){const be=e.get("EXT_clip_control");Q?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),ae=Q;const We=ie;ie=null,this.setClear(We)}},getReversed:function(){return ae},setTest:function(Q){Q?ce(i.DEPTH_TEST):Oe(i.DEPTH_TEST)},setMask:function(Q){le!==Q&&!U&&(i.depthMask(Q),le=Q)},setFunc:function(Q){if(ae&&(Q=Nw[Q]),Me!==Q){switch(Q){case mu:i.depthFunc(i.NEVER);break;case gu:i.depthFunc(i.ALWAYS);break;case _u:i.depthFunc(i.LESS);break;case Ir:i.depthFunc(i.LEQUAL);break;case vu:i.depthFunc(i.EQUAL);break;case xu:i.depthFunc(i.GEQUAL);break;case yu:i.depthFunc(i.GREATER);break;case Mu:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Me=Q}},setLocked:function(Q){U=Q},setClear:function(Q){ie!==Q&&(ae&&(Q=1-Q),i.clearDepth(Q),ie=Q)},reset:function(){U=!1,le=null,Me=null,ie=null,ae=!1}}}function s(){let U=!1,ae=null,le=null,Me=null,ie=null,Q=null,be=null,We=null,St=null;return{setTest:function(dt){U||(dt?ce(i.STENCIL_TEST):Oe(i.STENCIL_TEST))},setMask:function(dt){ae!==dt&&!U&&(i.stencilMask(dt),ae=dt)},setFunc:function(dt,Mi,si){(le!==dt||Me!==Mi||ie!==si)&&(i.stencilFunc(dt,Mi,si),le=dt,Me=Mi,ie=si)},setOp:function(dt,Mi,si){(Q!==dt||be!==Mi||We!==si)&&(i.stencilOp(dt,Mi,si),Q=dt,be=Mi,We=si)},setLocked:function(dt){U=dt},setClear:function(dt){St!==dt&&(i.clearStencil(dt),St=dt)},reset:function(){U=!1,ae=null,le=null,Me=null,ie=null,Q=null,be=null,We=null,St=null}}}const r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let u={},h={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,y=null,S=null,v=null,P=null,A=null,L=new ye(0,0,0),D=0,b=!1,T=null,I=null,V=null,G=null,q=null;const ee=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,te=0;const W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(W)[1]),Z=te>=1):W.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Z=te>=2);let fe=null,ve={};const De=i.getParameter(i.SCISSOR_BOX),$e=i.getParameter(i.VIEWPORT),Rt=new ht().fromArray(De),vt=new ht().fromArray($e);function K(U,ae,le,Me){const ie=new Uint8Array(4),Q=i.createTexture();i.bindTexture(U,Q),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let be=0;be<le;be++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ae,0,i.RGBA,1,1,Me,0,i.RGBA,i.UNSIGNED_BYTE,ie):i.texImage2D(ae+be,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ie);return Q}const pe={};pe[i.TEXTURE_2D]=K(i.TEXTURE_2D,i.TEXTURE_2D,1),pe[i.TEXTURE_CUBE_MAP]=K(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[i.TEXTURE_2D_ARRAY]=K(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),pe[i.TEXTURE_3D]=K(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ce(i.DEPTH_TEST),a.setFunc(Ir),ut(!1),Ie(Dd),ce(i.CULL_FACE),Mt(ss);function ce(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function Oe(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function ke(U,ae){return h[U]!==ae?(i.bindFramebuffer(U,ae),h[U]=ae,U===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ae),U===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ae),!0):!1}function Ge(U,ae){let le=f,Me=!1;if(U){le=d.get(ae),le===void 0&&(le=[],d.set(ae,le));const ie=U.textures;if(le.length!==ie.length||le[0]!==i.COLOR_ATTACHMENT0){for(let Q=0,be=ie.length;Q<be;Q++)le[Q]=i.COLOR_ATTACHMENT0+Q;le.length=ie.length,Me=!0}}else le[0]!==i.BACK&&(le[0]=i.BACK,Me=!0);Me&&i.drawBuffers(le)}function kt(U){return m!==U?(i.useProgram(U),m=U,!0):!1}const at={[Ds]:i.FUNC_ADD,[g0]:i.FUNC_SUBTRACT,[_0]:i.FUNC_REVERSE_SUBTRACT};at[v0]=i.MIN,at[x0]=i.MAX;const N={[y0]:i.ZERO,[M0]:i.ONE,[S0]:i.SRC_COLOR,[fu]:i.SRC_ALPHA,[R0]:i.SRC_ALPHA_SATURATE,[E0]:i.DST_COLOR,[b0]:i.DST_ALPHA,[w0]:i.ONE_MINUS_SRC_COLOR,[pu]:i.ONE_MINUS_SRC_ALPHA,[A0]:i.ONE_MINUS_DST_COLOR,[T0]:i.ONE_MINUS_DST_ALPHA,[C0]:i.CONSTANT_COLOR,[P0]:i.ONE_MINUS_CONSTANT_COLOR,[L0]:i.CONSTANT_ALPHA,[I0]:i.ONE_MINUS_CONSTANT_ALPHA};function Mt(U,ae,le,Me,ie,Q,be,We,St,dt){if(U===ss){_===!0&&(Oe(i.BLEND),_=!1);return}if(_===!1&&(ce(i.BLEND),_=!0),U!==m0){if(U!==g||dt!==b){if((p!==Ds||v!==Ds)&&(i.blendEquation(i.FUNC_ADD),p=Ds,v=Ds),dt)switch(U){case gr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Lr:i.blendFunc(i.ONE,i.ONE);break;case Nd:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ud:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case gr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Lr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Nd:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ud:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}y=null,S=null,P=null,A=null,L.set(0,0,0),D=0,g=U,b=dt}return}ie=ie||ae,Q=Q||le,be=be||Me,(ae!==p||ie!==v)&&(i.blendEquationSeparate(at[ae],at[ie]),p=ae,v=ie),(le!==y||Me!==S||Q!==P||be!==A)&&(i.blendFuncSeparate(N[le],N[Me],N[Q],N[be]),y=le,S=Me,P=Q,A=be),(We.equals(L)===!1||St!==D)&&(i.blendColor(We.r,We.g,We.b,St),L.copy(We),D=St),g=U,b=!1}function Ue(U,ae){U.side===Xt?Oe(i.CULL_FACE):ce(i.CULL_FACE);let le=U.side===yn;ae&&(le=!le),ut(le),U.blending===gr&&U.transparent===!1?Mt(ss):Mt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const Me=U.stencilWrite;o.setTest(Me),Me&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Se(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ce(i.SAMPLE_ALPHA_TO_COVERAGE):Oe(i.SAMPLE_ALPHA_TO_COVERAGE)}function ut(U){T!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),T=U)}function Ie(U){U!==d0?(ce(i.CULL_FACE),U!==I&&(U===Dd?i.cullFace(i.BACK):U===f0?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Oe(i.CULL_FACE),I=U}function Ct(U){U!==V&&(Z&&i.lineWidth(U),V=U)}function Se(U,ae,le){U?(ce(i.POLYGON_OFFSET_FILL),(G!==ae||q!==le)&&(i.polygonOffset(ae,le),G=ae,q=le)):Oe(i.POLYGON_OFFSET_FILL)}function Ze(U){U?ce(i.SCISSOR_TEST):Oe(i.SCISSOR_TEST)}function Zt(U){U===void 0&&(U=i.TEXTURE0+ee-1),fe!==U&&(i.activeTexture(U),fe=U)}function Bt(U,ae,le){le===void 0&&(fe===null?le=i.TEXTURE0+ee-1:le=fe);let Me=ve[le];Me===void 0&&(Me={type:void 0,texture:void 0},ve[le]=Me),(Me.type!==U||Me.texture!==ae)&&(fe!==le&&(i.activeTexture(le),fe=le),i.bindTexture(U,ae||pe[U]),Me.type=U,Me.texture=ae)}function C(){const U=ve[fe];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function M(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function B(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Y(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Le(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function oe(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ee(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ce(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function re(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function _e(U){Rt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Rt.copy(U))}function ze(U){vt.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),vt.copy(U))}function Pe(U,ae){let le=l.get(ae);le===void 0&&(le=new WeakMap,l.set(ae,le));let Me=le.get(U);Me===void 0&&(Me=i.getUniformBlockIndex(ae,U.name),le.set(U,Me))}function me(U,ae){const Me=l.get(ae).get(U);c.get(ae)!==Me&&(i.uniformBlockBinding(ae,Me,U.__bindingPointIndex),c.set(ae,Me))}function Ye(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},fe=null,ve={},h={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,y=null,S=null,v=null,P=null,A=null,L=new ye(0,0,0),D=0,b=!1,T=null,I=null,V=null,G=null,q=null,Rt.set(0,0,i.canvas.width,i.canvas.height),vt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ce,disable:Oe,bindFramebuffer:ke,drawBuffers:Ge,useProgram:kt,setBlending:Mt,setMaterial:Ue,setFlipSided:ut,setCullFace:Ie,setLineWidth:Ct,setPolygonOffset:Se,setScissorTest:Ze,activeTexture:Zt,bindTexture:Bt,unbindTexture:C,compressedTexImage2D:M,compressedTexImage3D:B,texImage2D:Ce,texImage3D:re,updateUBOMapping:Pe,uniformBlockBinding:me,texStorage2D:oe,texStorage3D:Ee,texSubImage2D:Y,texSubImage3D:ne,compressedTexSubImage2D:X,compressedTexSubImage3D:Le,scissor:_e,viewport:ze,reset:Ye}}function Fw(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new he,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,M){return f?new OffscreenCanvas(C,M):La("canvas")}function _(C,M,B){let Y=1;const ne=Bt(C);if((ne.width>B||ne.height>B)&&(Y=B/Math.max(ne.width,ne.height)),Y<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const X=Math.floor(Y*ne.width),Le=Math.floor(Y*ne.height);h===void 0&&(h=m(X,Le));const oe=M?m(X,Le):h;return oe.width=X,oe.height=Le,oe.getContext("2d").drawImage(C,0,0,X,Le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+X+"x"+Le+")."),oe}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),C;return C}function g(C){return C.generateMipmaps}function p(C){i.generateMipmap(C)}function y(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(C,M,B,Y,ne=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let X=M;if(M===i.RED&&(B===i.FLOAT&&(X=i.R32F),B===i.HALF_FLOAT&&(X=i.R16F),B===i.UNSIGNED_BYTE&&(X=i.R8)),M===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(X=i.R8UI),B===i.UNSIGNED_SHORT&&(X=i.R16UI),B===i.UNSIGNED_INT&&(X=i.R32UI),B===i.BYTE&&(X=i.R8I),B===i.SHORT&&(X=i.R16I),B===i.INT&&(X=i.R32I)),M===i.RG&&(B===i.FLOAT&&(X=i.RG32F),B===i.HALF_FLOAT&&(X=i.RG16F),B===i.UNSIGNED_BYTE&&(X=i.RG8)),M===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(X=i.RG8UI),B===i.UNSIGNED_SHORT&&(X=i.RG16UI),B===i.UNSIGNED_INT&&(X=i.RG32UI),B===i.BYTE&&(X=i.RG8I),B===i.SHORT&&(X=i.RG16I),B===i.INT&&(X=i.RG32I)),M===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(X=i.RGB8UI),B===i.UNSIGNED_SHORT&&(X=i.RGB16UI),B===i.UNSIGNED_INT&&(X=i.RGB32UI),B===i.BYTE&&(X=i.RGB8I),B===i.SHORT&&(X=i.RGB16I),B===i.INT&&(X=i.RGB32I)),M===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),B===i.UNSIGNED_INT&&(X=i.RGBA32UI),B===i.BYTE&&(X=i.RGBA8I),B===i.SHORT&&(X=i.RGBA16I),B===i.INT&&(X=i.RGBA32I)),M===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),M===i.RGBA){const Le=ne?pc:tt.getTransfer(Y);B===i.FLOAT&&(X=i.RGBA32F),B===i.HALF_FLOAT&&(X=i.RGBA16F),B===i.UNSIGNED_BYTE&&(X=Le===_t?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function v(C,M){let B;return C?M===null||M===zs||M===Ea?B=i.DEPTH24_STENCIL8:M===ti?B=i.DEPTH32F_STENCIL8:M===Ta&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===zs||M===Ea?B=i.DEPTH_COMPONENT24:M===ti?B=i.DEPTH_COMPONENT32F:M===Ta&&(B=i.DEPTH_COMPONENT16),B}function P(C,M){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==pn&&C.minFilter!==Rn?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function A(C){const M=C.target;M.removeEventListener("dispose",A),D(M),M.isVideoTexture&&u.delete(M)}function L(C){const M=C.target;M.removeEventListener("dispose",L),T(M)}function D(C){const M=n.get(C);if(M.__webglInit===void 0)return;const B=C.source,Y=d.get(B);if(Y){const ne=Y[M.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&b(C),Object.keys(Y).length===0&&d.delete(B)}n.remove(C)}function b(C){const M=n.get(C);i.deleteTexture(M.__webglTexture);const B=C.source,Y=d.get(B);delete Y[M.__cacheKey],a.memory.textures--}function T(C){const M=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(M.__webglFramebuffer[Y]))for(let ne=0;ne<M.__webglFramebuffer[Y].length;ne++)i.deleteFramebuffer(M.__webglFramebuffer[Y][ne]);else i.deleteFramebuffer(M.__webglFramebuffer[Y]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[Y])}else{if(Array.isArray(M.__webglFramebuffer))for(let Y=0;Y<M.__webglFramebuffer.length;Y++)i.deleteFramebuffer(M.__webglFramebuffer[Y]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Y=0;Y<M.__webglColorRenderbuffer.length;Y++)M.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[Y]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const B=C.textures;for(let Y=0,ne=B.length;Y<ne;Y++){const X=n.get(B[Y]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),a.memory.textures--),n.remove(B[Y])}n.remove(C)}let I=0;function V(){I=0}function G(){const C=I;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),I+=1,C}function q(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function ee(C,M){const B=n.get(C);if(C.isVideoTexture&&Ze(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&B.__version!==C.version){const Y=C.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{pe(B,C,M);return}}else C.isExternalTexture&&(B.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+M)}function Z(C,M){const B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){pe(B,C,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+M)}function te(C,M){const B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){pe(B,C,M);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+M)}function W(C,M){const B=n.get(C);if(C.version>0&&B.__version!==C.version){ce(B,C,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+M)}const fe={[us]:i.REPEAT,[ts]:i.CLAMP_TO_EDGE,[fc]:i.MIRRORED_REPEAT},ve={[pn]:i.NEAREST,[Jp]:i.NEAREST_MIPMAP_NEAREST,[ha]:i.NEAREST_MIPMAP_LINEAR,[Rn]:i.LINEAR,[Yo]:i.LINEAR_MIPMAP_NEAREST,[Di]:i.LINEAR_MIPMAP_LINEAR},De={[Y0]:i.NEVER,[Q0]:i.ALWAYS,[K0]:i.LESS,[om]:i.LEQUAL,[j0]:i.EQUAL,[J0]:i.GEQUAL,[$0]:i.GREATER,[Z0]:i.NOTEQUAL};function $e(C,M){if(M.type===ti&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Rn||M.magFilter===Yo||M.magFilter===ha||M.magFilter===Di||M.minFilter===Rn||M.minFilter===Yo||M.minFilter===ha||M.minFilter===Di)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,fe[M.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,fe[M.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,fe[M.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,ve[M.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,ve[M.minFilter]),M.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,De[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===pn||M.minFilter!==ha&&M.minFilter!==Di||M.type===ti&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Rt(C,M){let B=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",A));const Y=M.source;let ne=d.get(Y);ne===void 0&&(ne={},d.set(Y,ne));const X=q(M);if(X!==C.__cacheKey){ne[X]===void 0&&(ne[X]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),ne[X].usedTimes++;const Le=ne[C.__cacheKey];Le!==void 0&&(ne[C.__cacheKey].usedTimes--,Le.usedTimes===0&&b(M)),C.__cacheKey=X,C.__webglTexture=ne[X].texture}return B}function vt(C,M,B){return Math.floor(Math.floor(C/B)/M)}function K(C,M,B,Y){const X=C.updateRanges;if(X.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,B,Y,M.data);else{X.sort((re,_e)=>re.start-_e.start);let Le=0;for(let re=1;re<X.length;re++){const _e=X[Le],ze=X[re],Pe=_e.start+_e.count,me=vt(ze.start,M.width,4),Ye=vt(_e.start,M.width,4);ze.start<=Pe+1&&me===Ye&&vt(ze.start+ze.count-1,M.width,4)===me?_e.count=Math.max(_e.count,ze.start+ze.count-_e.start):(++Le,X[Le]=ze)}X.length=Le+1;const oe=i.getParameter(i.UNPACK_ROW_LENGTH),Ee=i.getParameter(i.UNPACK_SKIP_PIXELS),Ce=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let re=0,_e=X.length;re<_e;re++){const ze=X[re],Pe=Math.floor(ze.start/4),me=Math.ceil(ze.count/4),Ye=Pe%M.width,U=Math.floor(Pe/M.width),ae=me,le=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ye),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,Ye,U,ae,le,B,Y,M.data)}C.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,oe),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ee),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ce)}}function pe(C,M,B){let Y=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Y=i.TEXTURE_3D);const ne=Rt(C,M),X=M.source;t.bindTexture(Y,C.__webglTexture,i.TEXTURE0+B);const Le=n.get(X);if(X.version!==Le.__version||ne===!0){t.activeTexture(i.TEXTURE0+B);const oe=tt.getPrimaries(tt.workingColorSpace),Ee=M.colorSpace===es?null:tt.getPrimaries(M.colorSpace),Ce=M.colorSpace===es||oe===Ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);let re=_(M.image,!1,s.maxTextureSize);re=Zt(M,re);const _e=r.convert(M.format,M.colorSpace),ze=r.convert(M.type);let Pe=S(M.internalFormat,_e,ze,M.colorSpace,M.isVideoTexture);$e(Y,M);let me;const Ye=M.mipmaps,U=M.isVideoTexture!==!0,ae=Le.__version===void 0||ne===!0,le=X.dataReady,Me=P(M,re);if(M.isDepthTexture)Pe=v(M.format===Ra,M.type),ae&&(U?t.texStorage2D(i.TEXTURE_2D,1,Pe,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,Pe,re.width,re.height,0,_e,ze,null));else if(M.isDataTexture)if(Ye.length>0){U&&ae&&t.texStorage2D(i.TEXTURE_2D,Me,Pe,Ye[0].width,Ye[0].height);for(let ie=0,Q=Ye.length;ie<Q;ie++)me=Ye[ie],U?le&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,me.width,me.height,_e,ze,me.data):t.texImage2D(i.TEXTURE_2D,ie,Pe,me.width,me.height,0,_e,ze,me.data);M.generateMipmaps=!1}else U?(ae&&t.texStorage2D(i.TEXTURE_2D,Me,Pe,re.width,re.height),le&&K(M,re,_e,ze)):t.texImage2D(i.TEXTURE_2D,0,Pe,re.width,re.height,0,_e,ze,re.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){U&&ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Me,Pe,Ye[0].width,Ye[0].height,re.depth);for(let ie=0,Q=Ye.length;ie<Q;ie++)if(me=Ye[ie],M.format!==Bn)if(_e!==null)if(U){if(le)if(M.layerUpdates.size>0){const be=Nf(me.width,me.height,M.format,M.type);for(const We of M.layerUpdates){const St=me.data.subarray(We*be/me.data.BYTES_PER_ELEMENT,(We+1)*be/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,We,me.width,me.height,1,_e,St)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,me.width,me.height,re.depth,_e,me.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,Pe,me.width,me.height,re.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?le&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,me.width,me.height,re.depth,_e,ze,me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,Pe,me.width,me.height,re.depth,0,_e,ze,me.data)}else{U&&ae&&t.texStorage2D(i.TEXTURE_2D,Me,Pe,Ye[0].width,Ye[0].height);for(let ie=0,Q=Ye.length;ie<Q;ie++)me=Ye[ie],M.format!==Bn?_e!==null?U?le&&t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,me.width,me.height,_e,me.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,Pe,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?le&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,me.width,me.height,_e,ze,me.data):t.texImage2D(i.TEXTURE_2D,ie,Pe,me.width,me.height,0,_e,ze,me.data)}else if(M.isDataArrayTexture)if(U){if(ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Me,Pe,re.width,re.height,re.depth),le)if(M.layerUpdates.size>0){const ie=Nf(re.width,re.height,M.format,M.type);for(const Q of M.layerUpdates){const be=re.data.subarray(Q*ie/re.data.BYTES_PER_ELEMENT,(Q+1)*ie/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,re.width,re.height,1,_e,ze,be)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,_e,ze,re.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Pe,re.width,re.height,re.depth,0,_e,ze,re.data);else if(M.isData3DTexture)U?(ae&&t.texStorage3D(i.TEXTURE_3D,Me,Pe,re.width,re.height,re.depth),le&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,_e,ze,re.data)):t.texImage3D(i.TEXTURE_3D,0,Pe,re.width,re.height,re.depth,0,_e,ze,re.data);else if(M.isFramebufferTexture){if(ae)if(U)t.texStorage2D(i.TEXTURE_2D,Me,Pe,re.width,re.height);else{let ie=re.width,Q=re.height;for(let be=0;be<Me;be++)t.texImage2D(i.TEXTURE_2D,be,Pe,ie,Q,0,_e,ze,null),ie>>=1,Q>>=1}}else if(Ye.length>0){if(U&&ae){const ie=Bt(Ye[0]);t.texStorage2D(i.TEXTURE_2D,Me,Pe,ie.width,ie.height)}for(let ie=0,Q=Ye.length;ie<Q;ie++)me=Ye[ie],U?le&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,_e,ze,me):t.texImage2D(i.TEXTURE_2D,ie,Pe,_e,ze,me);M.generateMipmaps=!1}else if(U){if(ae){const ie=Bt(re);t.texStorage2D(i.TEXTURE_2D,Me,Pe,ie.width,ie.height)}le&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,_e,ze,re)}else t.texImage2D(i.TEXTURE_2D,0,Pe,_e,ze,re);g(M)&&p(Y),Le.__version=X.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function ce(C,M,B){if(M.image.length!==6)return;const Y=Rt(C,M),ne=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+B);const X=n.get(ne);if(ne.version!==X.__version||Y===!0){t.activeTexture(i.TEXTURE0+B);const Le=tt.getPrimaries(tt.workingColorSpace),oe=M.colorSpace===es?null:tt.getPrimaries(M.colorSpace),Ee=M.colorSpace===es||Le===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const Ce=M.isCompressedTexture||M.image[0].isCompressedTexture,re=M.image[0]&&M.image[0].isDataTexture,_e=[];for(let Q=0;Q<6;Q++)!Ce&&!re?_e[Q]=_(M.image[Q],!0,s.maxCubemapSize):_e[Q]=re?M.image[Q].image:M.image[Q],_e[Q]=Zt(M,_e[Q]);const ze=_e[0],Pe=r.convert(M.format,M.colorSpace),me=r.convert(M.type),Ye=S(M.internalFormat,Pe,me,M.colorSpace),U=M.isVideoTexture!==!0,ae=X.__version===void 0||Y===!0,le=ne.dataReady;let Me=P(M,ze);$e(i.TEXTURE_CUBE_MAP,M);let ie;if(Ce){U&&ae&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,Ye,ze.width,ze.height);for(let Q=0;Q<6;Q++){ie=_e[Q].mipmaps;for(let be=0;be<ie.length;be++){const We=ie[be];M.format!==Bn?Pe!==null?U?le&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,0,0,We.width,We.height,Pe,We.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,Ye,We.width,We.height,0,We.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,0,0,We.width,We.height,Pe,me,We.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,Ye,We.width,We.height,0,Pe,me,We.data)}}}else{if(ie=M.mipmaps,U&&ae){ie.length>0&&Me++;const Q=Bt(_e[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,Ye,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(re){U?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,_e[Q].width,_e[Q].height,Pe,me,_e[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ye,_e[Q].width,_e[Q].height,0,Pe,me,_e[Q].data);for(let be=0;be<ie.length;be++){const St=ie[be].image[Q].image;U?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,0,0,St.width,St.height,Pe,me,St.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,Ye,St.width,St.height,0,Pe,me,St.data)}}else{U?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Pe,me,_e[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ye,Pe,me,_e[Q]);for(let be=0;be<ie.length;be++){const We=ie[be];U?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,0,0,Pe,me,We.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,Ye,Pe,me,We.image[Q])}}}g(M)&&p(i.TEXTURE_CUBE_MAP),X.__version=ne.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Oe(C,M,B,Y,ne,X){const Le=r.convert(B.format,B.colorSpace),oe=r.convert(B.type),Ee=S(B.internalFormat,Le,oe,B.colorSpace),Ce=n.get(M),re=n.get(B);if(re.__renderTarget=M,!Ce.__hasExternalTextures){const _e=Math.max(1,M.width>>X),ze=Math.max(1,M.height>>X);ne===i.TEXTURE_3D||ne===i.TEXTURE_2D_ARRAY?t.texImage3D(ne,X,Ee,_e,ze,M.depth,0,Le,oe,null):t.texImage2D(ne,X,Ee,_e,ze,0,Le,oe,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),Se(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,ne,re.__webglTexture,0,Ct(M)):(ne===i.TEXTURE_2D||ne>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,ne,re.__webglTexture,X),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ke(C,M,B){if(i.bindRenderbuffer(i.RENDERBUFFER,C),M.depthBuffer){const Y=M.depthTexture,ne=Y&&Y.isDepthTexture?Y.type:null,X=v(M.stencilBuffer,ne),Le=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=Ct(M);Se(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,oe,X,M.width,M.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,oe,X,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,X,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Le,i.RENDERBUFFER,C)}else{const Y=M.textures;for(let ne=0;ne<Y.length;ne++){const X=Y[ne],Le=r.convert(X.format,X.colorSpace),oe=r.convert(X.type),Ee=S(X.internalFormat,Le,oe,X.colorSpace),Ce=Ct(M);B&&Se(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ce,Ee,M.width,M.height):Se(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ce,Ee,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Ee,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ge(C,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(M.depthTexture);Y.__renderTarget=M,(!Y.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),ee(M.depthTexture,0);const ne=Y.__webglTexture,X=Ct(M);if(M.depthTexture.format===Aa)Se(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0);else if(M.depthTexture.format===Ra)Se(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function kt(C){const M=n.get(C),B=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){const Y=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Y){const ne=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Y.removeEventListener("dispose",ne)};Y.addEventListener("dispose",ne),M.__depthDisposeCallback=ne}M.__boundDepthTexture=Y}if(C.depthTexture&&!M.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");const Y=C.texture.mipmaps;Y&&Y.length>0?Ge(M.__webglFramebuffer[0],C):Ge(M.__webglFramebuffer,C)}else if(B){M.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[Y]),M.__webglDepthbuffer[Y]===void 0)M.__webglDepthbuffer[Y]=i.createRenderbuffer(),ke(M.__webglDepthbuffer[Y],C,!1);else{const ne=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=M.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,X)}}else{const Y=C.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),ke(M.__webglDepthbuffer,C,!1);else{const ne=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,X)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function at(C,M,B){const Y=n.get(C);M!==void 0&&Oe(Y.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&kt(C)}function N(C){const M=C.texture,B=n.get(C),Y=n.get(M);C.addEventListener("dispose",L);const ne=C.textures,X=C.isWebGLCubeRenderTarget===!0,Le=ne.length>1;if(Le||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=M.version,a.memory.textures++),X){B.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[oe]=[];for(let Ee=0;Ee<M.mipmaps.length;Ee++)B.__webglFramebuffer[oe][Ee]=i.createFramebuffer()}else B.__webglFramebuffer[oe]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let oe=0;oe<M.mipmaps.length;oe++)B.__webglFramebuffer[oe]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Le)for(let oe=0,Ee=ne.length;oe<Ee;oe++){const Ce=n.get(ne[oe]);Ce.__webglTexture===void 0&&(Ce.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&Se(C)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let oe=0;oe<ne.length;oe++){const Ee=ne[oe];B.__webglColorRenderbuffer[oe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[oe]);const Ce=r.convert(Ee.format,Ee.colorSpace),re=r.convert(Ee.type),_e=S(Ee.internalFormat,Ce,re,Ee.colorSpace,C.isXRRenderTarget===!0),ze=Ct(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,ze,_e,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,B.__webglColorRenderbuffer[oe])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),ke(B.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),$e(i.TEXTURE_CUBE_MAP,M);for(let oe=0;oe<6;oe++)if(M.mipmaps&&M.mipmaps.length>0)for(let Ee=0;Ee<M.mipmaps.length;Ee++)Oe(B.__webglFramebuffer[oe][Ee],C,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ee);else Oe(B.__webglFramebuffer[oe],C,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);g(M)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Le){for(let oe=0,Ee=ne.length;oe<Ee;oe++){const Ce=ne[oe],re=n.get(Ce);let _e=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(_e=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(_e,re.__webglTexture),$e(_e,Ce),Oe(B.__webglFramebuffer,C,Ce,i.COLOR_ATTACHMENT0+oe,_e,0),g(Ce)&&p(_e)}t.unbindTexture()}else{let oe=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(oe=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(oe,Y.__webglTexture),$e(oe,M),M.mipmaps&&M.mipmaps.length>0)for(let Ee=0;Ee<M.mipmaps.length;Ee++)Oe(B.__webglFramebuffer[Ee],C,M,i.COLOR_ATTACHMENT0,oe,Ee);else Oe(B.__webglFramebuffer,C,M,i.COLOR_ATTACHMENT0,oe,0);g(M)&&p(oe),t.unbindTexture()}C.depthBuffer&&kt(C)}function Mt(C){const M=C.textures;for(let B=0,Y=M.length;B<Y;B++){const ne=M[B];if(g(ne)){const X=y(C),Le=n.get(ne).__webglTexture;t.bindTexture(X,Le),p(X),t.unbindTexture()}}}const Ue=[],ut=[];function Ie(C){if(C.samples>0){if(Se(C)===!1){const M=C.textures,B=C.width,Y=C.height;let ne=i.COLOR_BUFFER_BIT;const X=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Le=n.get(C),oe=M.length>1;if(oe)for(let Ce=0;Ce<M.length;Ce++)t.bindFramebuffer(i.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Le.__webglMultisampledFramebuffer);const Ee=C.texture.mipmaps;Ee&&Ee.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Le.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Le.__webglFramebuffer);for(let Ce=0;Ce<M.length;Ce++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ne|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ne|=i.STENCIL_BUFFER_BIT)),oe){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Le.__webglColorRenderbuffer[Ce]);const re=n.get(M[Ce]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,re,0)}i.blitFramebuffer(0,0,B,Y,0,0,B,Y,ne,i.NEAREST),c===!0&&(Ue.length=0,ut.length=0,Ue.push(i.COLOR_ATTACHMENT0+Ce),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Ue.push(X),ut.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ut)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ue))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),oe)for(let Ce=0;Ce<M.length;Ce++){t.bindFramebuffer(i.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.RENDERBUFFER,Le.__webglColorRenderbuffer[Ce]);const re=n.get(M[Ce]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.TEXTURE_2D,re,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Le.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const M=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function Ct(C){return Math.min(s.maxSamples,C.samples)}function Se(C){const M=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ze(C){const M=a.render.frame;u.get(C)!==M&&(u.set(C,M),C.update())}function Zt(C,M){const B=C.colorSpace,Y=C.format,ne=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||B!==gn&&B!==es&&(tt.getTransfer(B)===_t?(Y!==Bn||ne!==gi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),M}function Bt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=V,this.setTexture2D=ee,this.setTexture2DArray=Z,this.setTexture3D=te,this.setTextureCube=W,this.rebindTextures=at,this.setupRenderTarget=N,this.updateRenderTargetMipmap=Mt,this.updateMultisampleRenderTarget=Ie,this.setupDepthRenderbuffer=kt,this.setupFrameBufferTexture=Oe,this.useMultisampledRTT=Se}function Ow(i,e){function t(n,s=es){let r;const a=tt.getTransfer(s);if(n===gi)return i.UNSIGNED_BYTE;if(n===Ph)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Lh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===tm)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Qp)return i.BYTE;if(n===em)return i.SHORT;if(n===Ta)return i.UNSIGNED_SHORT;if(n===Ch)return i.INT;if(n===zs)return i.UNSIGNED_INT;if(n===ti)return i.FLOAT;if(n===Ya)return i.HALF_FLOAT;if(n===nm)return i.ALPHA;if(n===im)return i.RGB;if(n===Bn)return i.RGBA;if(n===Aa)return i.DEPTH_COMPONENT;if(n===Ra)return i.DEPTH_STENCIL;if(n===Ih)return i.RED;if(n===Dh)return i.RED_INTEGER;if(n===sm)return i.RG;if(n===Nh)return i.RG_INTEGER;if(n===Uh)return i.RGBA_INTEGER;if(n===Ko||n===jo||n===$o||n===Zo)if(a===_t)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ko)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===jo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===$o)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Zo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ko)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===jo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===$o)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Zo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wu||n===bu||n===Tu||n===Eu)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===wu)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===bu)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Tu)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Eu)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Au||n===Ru||n===Cu)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Au||n===Ru)return a===_t?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Cu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Pu||n===Lu||n===Iu||n===Du||n===Nu||n===Uu||n===Fu||n===Ou||n===ku||n===Bu||n===zu||n===Hu||n===Vu||n===Gu)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Pu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Lu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Iu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Du)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Nu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Uu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Fu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ou)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ku)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Bu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===zu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Hu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Vu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Gu)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Jo||n===Wu||n===Xu)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Jo)return a===_t?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Wu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Xu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===rm||n===qu||n===Yu||n===Ku)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Jo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===qu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Yu)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ku)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ea?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class km extends Qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}}const kw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Bw=`
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

}`;class zw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new km(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Oi({vertexShader:kw,fragmentShader:Bw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new j(new Xr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Hw extends Gr{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,f=null,m=null;const _=new zw,g={},p=t.getContextAttributes();let y=null,S=null;const v=[],P=[],A=new he;let L=null;const D=new fn;D.viewport=new ht;const b=new fn;b.viewport=new ht;const T=[D,b],I=new Zv;let V=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let pe=v[K];return pe===void 0&&(pe=new Sl,v[K]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(K){let pe=v[K];return pe===void 0&&(pe=new Sl,v[K]=pe),pe.getGripSpace()},this.getHand=function(K){let pe=v[K];return pe===void 0&&(pe=new Sl,v[K]=pe),pe.getHandSpace()};function q(K){const pe=P.indexOf(K.inputSource);if(pe===-1)return;const ce=v[pe];ce!==void 0&&(ce.update(K.inputSource,K.frame,l||a),ce.dispatchEvent({type:K.type,data:K.inputSource}))}function ee(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",ee),s.removeEventListener("inputsourceschange",Z);for(let K=0;K<v.length;K++){const pe=P[K];pe!==null&&(P[K]=null,v[K].disconnect(pe))}V=null,G=null,_.reset();for(const K in g)delete g[K];e.setRenderTarget(y),f=null,d=null,h=null,s=null,S=null,vt.stop(),n.isPresenting=!1,e.setPixelRatio(L),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",ee),s.addEventListener("inputsourceschange",Z),p.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(A),typeof XRWebGLBinding<"u"&&(h=new XRWebGLBinding(s,t)),h!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let ce=null,Oe=null,ke=null;p.depth&&(ke=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=p.stencil?Ra:Aa,Oe=p.stencil?Ea:zs);const Ge={colorFormat:t.RGBA8,depthFormat:ke,scaleFactor:r};d=h.createProjectionLayer(Ge),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new Hs(d.textureWidth,d.textureHeight,{format:Bn,type:gi,depthTexture:new vm(d.textureWidth,d.textureHeight,Oe,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ce={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ce),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Hs(f.framebufferWidth,f.framebufferHeight,{format:Bn,type:gi,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),vt.setContext(s),vt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Z(K){for(let pe=0;pe<K.removed.length;pe++){const ce=K.removed[pe],Oe=P.indexOf(ce);Oe>=0&&(P[Oe]=null,v[Oe].disconnect(ce))}for(let pe=0;pe<K.added.length;pe++){const ce=K.added[pe];let Oe=P.indexOf(ce);if(Oe===-1){for(let Ge=0;Ge<v.length;Ge++)if(Ge>=P.length){P.push(ce),Oe=Ge;break}else if(P[Ge]===null){P[Ge]=ce,Oe=Ge;break}if(Oe===-1)break}const ke=v[Oe];ke&&ke.connect(ce)}}const te=new E,W=new E;function fe(K,pe,ce){te.setFromMatrixPosition(pe.matrixWorld),W.setFromMatrixPosition(ce.matrixWorld);const Oe=te.distanceTo(W),ke=pe.projectionMatrix.elements,Ge=ce.projectionMatrix.elements,kt=ke[14]/(ke[10]-1),at=ke[14]/(ke[10]+1),N=(ke[9]+1)/ke[5],Mt=(ke[9]-1)/ke[5],Ue=(ke[8]-1)/ke[0],ut=(Ge[8]+1)/Ge[0],Ie=kt*Ue,Ct=kt*ut,Se=Oe/(-Ue+ut),Ze=Se*-Ue;if(pe.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Ze),K.translateZ(Se),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),ke[10]===-1)K.projectionMatrix.copy(pe.projectionMatrix),K.projectionMatrixInverse.copy(pe.projectionMatrixInverse);else{const Zt=kt+Se,Bt=at+Se,C=Ie-Ze,M=Ct+(Oe-Ze),B=N*at/Bt*Zt,Y=Mt*at/Bt*Zt;K.projectionMatrix.makePerspective(C,M,B,Y,Zt,Bt),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ve(K,pe){pe===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(pe.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let pe=K.near,ce=K.far;_.texture!==null&&(_.depthNear>0&&(pe=_.depthNear),_.depthFar>0&&(ce=_.depthFar)),I.near=b.near=D.near=pe,I.far=b.far=D.far=ce,(V!==I.near||G!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),V=I.near,G=I.far),I.layers.mask=K.layers.mask|6,D.layers.mask=I.layers.mask&3,b.layers.mask=I.layers.mask&5;const Oe=K.parent,ke=I.cameras;ve(I,Oe);for(let Ge=0;Ge<ke.length;Ge++)ve(ke[Ge],Oe);ke.length===2?fe(I,D,b):I.projectionMatrix.copy(D.projectionMatrix),De(K,I,Oe)};function De(K,pe,ce){ce===null?K.matrix.copy(pe.matrixWorld):(K.matrix.copy(ce.matrixWorld),K.matrix.invert(),K.matrix.multiply(pe.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(pe.projectionMatrix),K.projectionMatrixInverse.copy(pe.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Ur*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(K){c=K,d!==null&&(d.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(I)},this.getCameraTexture=function(K){return g[K]};let $e=null;function Rt(K,pe){if(u=pe.getViewerPose(l||a),m=pe,u!==null){const ce=u.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let Oe=!1;ce.length!==I.cameras.length&&(I.cameras.length=0,Oe=!0);for(let at=0;at<ce.length;at++){const N=ce[at];let Mt=null;if(f!==null)Mt=f.getViewport(N);else{const ut=h.getViewSubImage(d,N);Mt=ut.viewport,at===0&&(e.setRenderTargetTextures(S,ut.colorTexture,ut.depthStencilTexture),e.setRenderTarget(S))}let Ue=T[at];Ue===void 0&&(Ue=new fn,Ue.layers.enable(at),Ue.viewport=new ht,T[at]=Ue),Ue.matrix.fromArray(N.transform.matrix),Ue.matrix.decompose(Ue.position,Ue.quaternion,Ue.scale),Ue.projectionMatrix.fromArray(N.projectionMatrix),Ue.projectionMatrixInverse.copy(Ue.projectionMatrix).invert(),Ue.viewport.set(Mt.x,Mt.y,Mt.width,Mt.height),at===0&&(I.matrix.copy(Ue.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Oe===!0&&I.cameras.push(Ue)}const ke=s.enabledFeatures;if(ke&&ke.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&h){const at=h.getDepthInformation(ce[0]);at&&at.isValid&&at.texture&&_.init(at,s.renderState)}if(ke&&ke.includes("camera-access")&&(e.state.unbindTexture(),h))for(let at=0;at<ce.length;at++){const N=ce[at].camera;if(N){let Mt=g[N];Mt||(Mt=new km,g[N]=Mt);const Ue=h.getCameraImage(N);Mt.sourceTexture=Ue}}}for(let ce=0;ce<v.length;ce++){const Oe=P[ce],ke=v[ce];Oe!==null&&ke!==void 0&&ke.update(Oe,pe,l||a)}$e&&$e(K,pe),pe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:pe}),m=null}const vt=new Dm;vt.setAnimationLoop(Rt),this.setAnimationLoop=function(K){$e=K},this.dispose=function(){}}}const As=new Wn,Vw=new Xe;function Gw(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,fm(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,y,S,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),h(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,y,S):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===yn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===yn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=e.get(p),S=y.envMap,v=y.envMapRotation;S&&(g.envMap.value=S,As.copy(v),As.x*=-1,As.y*=-1,As.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(As.y*=-1,As.z*=-1),g.envMapRotation.value.setFromMatrix4(Vw.makeRotationFromEuler(As)),g.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,y,S){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=S*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===yn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const y=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Ww(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,S){const v=S.program;n.uniformBlockBinding(y,v)}function l(y,S){let v=s[y.id];v===void 0&&(m(y),v=u(y),s[y.id]=v,y.addEventListener("dispose",g));const P=S.program;n.updateUBOMapping(y,P);const A=e.render.frame;r[y.id]!==A&&(d(y),r[y.id]=A)}function u(y){const S=h();y.__bindingPointIndex=S;const v=i.createBuffer(),P=y.__size,A=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,P,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,v),v}function h(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const S=s[y.id],v=y.uniforms,P=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let A=0,L=v.length;A<L;A++){const D=Array.isArray(v[A])?v[A]:[v[A]];for(let b=0,T=D.length;b<T;b++){const I=D[b];if(f(I,A,b,P)===!0){const V=I.__offset,G=Array.isArray(I.value)?I.value:[I.value];let q=0;for(let ee=0;ee<G.length;ee++){const Z=G[ee],te=_(Z);typeof Z=="number"||typeof Z=="boolean"?(I.__data[0]=Z,i.bufferSubData(i.UNIFORM_BUFFER,V+q,I.__data)):Z.isMatrix3?(I.__data[0]=Z.elements[0],I.__data[1]=Z.elements[1],I.__data[2]=Z.elements[2],I.__data[3]=0,I.__data[4]=Z.elements[3],I.__data[5]=Z.elements[4],I.__data[6]=Z.elements[5],I.__data[7]=0,I.__data[8]=Z.elements[6],I.__data[9]=Z.elements[7],I.__data[10]=Z.elements[8],I.__data[11]=0):(Z.toArray(I.__data,q),q+=te.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,S,v,P){const A=y.value,L=S+"_"+v;if(P[L]===void 0)return typeof A=="number"||typeof A=="boolean"?P[L]=A:P[L]=A.clone(),!0;{const D=P[L];if(typeof A=="number"||typeof A=="boolean"){if(D!==A)return P[L]=A,!0}else if(D.equals(A)===!1)return D.copy(A),!0}return!1}function m(y){const S=y.uniforms;let v=0;const P=16;for(let L=0,D=S.length;L<D;L++){const b=Array.isArray(S[L])?S[L]:[S[L]];for(let T=0,I=b.length;T<I;T++){const V=b[T],G=Array.isArray(V.value)?V.value:[V.value];for(let q=0,ee=G.length;q<ee;q++){const Z=G[q],te=_(Z),W=v%P,fe=W%te.boundary,ve=W+fe;v+=fe,ve!==0&&P-ve<te.storage&&(v+=P-ve),V.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=v,v+=te.storage}}}const A=v%P;return A>0&&(v+=P-A),y.__size=v,y.__cache={},this}function _(y){const S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=48,S.storage=48):y.isMatrix4?(S.boundary=64,S.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),S}function g(y){const S=y.target;S.removeEventListener("dispose",g);const v=a.indexOf(S.__bindingPointIndex);a.splice(v,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function p(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}class Xw{constructor(e={}){const{canvas:t=g_(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const y=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=rs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let P=!1;this._outputColorSpace=At;let A=0,L=0,D=null,b=-1,T=null;const I=new ht,V=new ht;let G=null;const q=new ye(0);let ee=0,Z=t.width,te=t.height,W=1,fe=null,ve=null;const De=new ht(0,0,Z,te),$e=new ht(0,0,Z,te);let Rt=!1;const vt=new Gh;let K=!1,pe=!1;const ce=new Xe,Oe=new E,ke=new ht,Ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let kt=!1;function at(){return D===null?W:1}let N=n;function Mt(w,F){return t.getContext(w,F)}try{const w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Eh}`),t.addEventListener("webglcontextlost",le,!1),t.addEventListener("webglcontextrestored",Me,!1),t.addEventListener("webglcontextcreationerror",ie,!1),N===null){const F="webgl2";if(N=Mt(F,w),N===null)throw Mt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Ue,ut,Ie,Ct,Se,Ze,Zt,Bt,C,M,B,Y,ne,X,Le,oe,Ee,Ce,re,_e,ze,Pe,me,Ye;function U(){Ue=new tS(N),Ue.init(),Pe=new Ow(N,Ue),ut=new KM(N,Ue,e,Pe),Ie=new Uw(N,Ue),ut.reversedDepthBuffer&&d&&Ie.buffers.depth.setReversed(!0),Ct=new sS(N),Se=new Sw,Ze=new Fw(N,Ue,Ie,Se,ut,Pe,Ct),Zt=new $M(v),Bt=new eS(v),C=new ux(N),me=new qM(N,C),M=new nS(N,C,Ct,me),B=new aS(N,M,C,Ct),re=new rS(N,ut,Ze),oe=new jM(Se),Y=new Mw(v,Zt,Bt,Ue,ut,me,oe),ne=new Gw(v,Se),X=new bw,Le=new Pw(Ue),Ce=new XM(v,Zt,Bt,Ie,B,f,c),Ee=new Dw(v,B,ut),Ye=new Ww(N,Ct,ut,Ie),_e=new YM(N,Ue,Ct),ze=new iS(N,Ue,Ct),Ct.programs=Y.programs,v.capabilities=ut,v.extensions=Ue,v.properties=Se,v.renderLists=X,v.shadowMap=Ee,v.state=Ie,v.info=Ct}U();const ae=new Hw(v,N);this.xr=ae,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const w=Ue.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Ue.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(w){w!==void 0&&(W=w,this.setSize(Z,te,!1))},this.getSize=function(w){return w.set(Z,te)},this.setSize=function(w,F,z=!0){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=w,te=F,t.width=Math.floor(w*W),t.height=Math.floor(F*W),z===!0&&(t.style.width=w+"px",t.style.height=F+"px"),this.setViewport(0,0,w,F)},this.getDrawingBufferSize=function(w){return w.set(Z*W,te*W).floor()},this.setDrawingBufferSize=function(w,F,z){Z=w,te=F,W=z,t.width=Math.floor(w*z),t.height=Math.floor(F*z),this.setViewport(0,0,w,F)},this.getCurrentViewport=function(w){return w.copy(I)},this.getViewport=function(w){return w.copy(De)},this.setViewport=function(w,F,z,H){w.isVector4?De.set(w.x,w.y,w.z,w.w):De.set(w,F,z,H),Ie.viewport(I.copy(De).multiplyScalar(W).round())},this.getScissor=function(w){return w.copy($e)},this.setScissor=function(w,F,z,H){w.isVector4?$e.set(w.x,w.y,w.z,w.w):$e.set(w,F,z,H),Ie.scissor(V.copy($e).multiplyScalar(W).round())},this.getScissorTest=function(){return Rt},this.setScissorTest=function(w){Ie.setScissorTest(Rt=w)},this.setOpaqueSort=function(w){fe=w},this.setTransparentSort=function(w){ve=w},this.getClearColor=function(w){return w.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor(...arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha(...arguments)},this.clear=function(w=!0,F=!0,z=!0){let H=0;if(w){let O=!1;if(D!==null){const se=D.texture.format;O=se===Uh||se===Nh||se===Dh}if(O){const se=D.texture.type,ge=se===gi||se===zs||se===Ta||se===Ea||se===Ph||se===Lh,we=Ce.getClearColor(),xe=Ce.getClearAlpha(),Be=we.r,He=we.g,Ne=we.b;ge?(m[0]=Be,m[1]=He,m[2]=Ne,m[3]=xe,N.clearBufferuiv(N.COLOR,0,m)):(_[0]=Be,_[1]=He,_[2]=Ne,_[3]=xe,N.clearBufferiv(N.COLOR,0,_))}else H|=N.COLOR_BUFFER_BIT}F&&(H|=N.DEPTH_BUFFER_BIT),z&&(H|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",le,!1),t.removeEventListener("webglcontextrestored",Me,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),Ce.dispose(),X.dispose(),Le.dispose(),Se.dispose(),Zt.dispose(),Bt.dispose(),B.dispose(),me.dispose(),Ye.dispose(),Y.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",si),ae.removeEventListener("sessionend",Ad),ys.stop()};function le(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function Me(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const w=Ct.autoReset,F=Ee.enabled,z=Ee.autoUpdate,H=Ee.needsUpdate,O=Ee.type;U(),Ct.autoReset=w,Ee.enabled=F,Ee.autoUpdate=z,Ee.needsUpdate=H,Ee.type=O}function ie(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Q(w){const F=w.target;F.removeEventListener("dispose",Q),be(F)}function be(w){We(w),Se.remove(w)}function We(w){const F=Se.get(w).programs;F!==void 0&&(F.forEach(function(z){Y.releaseProgram(z)}),w.isShaderMaterial&&Y.releaseShaderCache(w))}this.renderBufferDirect=function(w,F,z,H,O,se){F===null&&(F=Ge);const ge=O.isMesh&&O.matrixWorld.determinant()<0,we=a0(w,F,z,H,O);Ie.setMaterial(H,ge);let xe=z.index,Be=1;if(H.wireframe===!0){if(xe=M.getWireframeAttribute(z),xe===void 0)return;Be=2}const He=z.drawRange,Ne=z.attributes.position;let it=He.start*Be,gt=(He.start+He.count)*Be;se!==null&&(it=Math.max(it,se.start*Be),gt=Math.min(gt,(se.start+se.count)*Be)),xe!==null?(it=Math.max(it,0),gt=Math.min(gt,xe.count)):Ne!=null&&(it=Math.max(it,0),gt=Math.min(gt,Ne.count));const Ft=gt-it;if(Ft<0||Ft===1/0)return;me.setup(O,H,we,z,xe);let Tt,xt=_e;if(xe!==null&&(Tt=C.get(xe),xt=ze,xt.setIndex(Tt)),O.isMesh)H.wireframe===!0?(Ie.setLineWidth(H.wireframeLinewidth*at()),xt.setMode(N.LINES)):xt.setMode(N.TRIANGLES);else if(O.isLine){let Fe=H.linewidth;Fe===void 0&&(Fe=1),Ie.setLineWidth(Fe*at()),O.isLineSegments?xt.setMode(N.LINES):O.isLineLoop?xt.setMode(N.LINE_LOOP):xt.setMode(N.LINE_STRIP)}else O.isPoints?xt.setMode(N.POINTS):O.isSprite&&xt.setMode(N.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)_r("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),xt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Ue.get("WEBGL_multi_draw"))xt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Fe=O._multiDrawStarts,Lt=O._multiDrawCounts,ct=O._multiDrawCount,Sn=xe?C.get(xe).bytesPerElement:1,js=Se.get(H).currentProgram.getUniforms();for(let wn=0;wn<ct;wn++)js.setValue(N,"_gl_DrawID",wn),xt.render(Fe[wn]/Sn,Lt[wn])}else if(O.isInstancedMesh)xt.renderInstances(it,Ft,O.count);else if(z.isInstancedBufferGeometry){const Fe=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Lt=Math.min(z.instanceCount,Fe);xt.renderInstances(it,Ft,Lt)}else xt.render(it,Ft)};function St(w,F,z){w.transparent===!0&&w.side===Xt&&w.forceSinglePass===!1?(w.side=yn,w.needsUpdate=!0,so(w,F,z),w.side=mi,w.needsUpdate=!0,so(w,F,z),w.side=Xt):so(w,F,z)}this.compile=function(w,F,z=null){z===null&&(z=w),p=Le.get(z),p.init(F),S.push(p),z.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),w!==z&&w.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const H=new Set;return w.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const se=O.material;if(se)if(Array.isArray(se))for(let ge=0;ge<se.length;ge++){const we=se[ge];St(we,z,O),H.add(we)}else St(se,z,O),H.add(se)}),p=S.pop(),H},this.compileAsync=function(w,F,z=null){const H=this.compile(w,F,z);return new Promise(O=>{function se(){if(H.forEach(function(ge){Se.get(ge).currentProgram.isReady()&&H.delete(ge)}),H.size===0){O(w);return}setTimeout(se,10)}Ue.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let dt=null;function Mi(w){dt&&dt(w)}function si(){ys.stop()}function Ad(){ys.start()}const ys=new Dm;ys.setAnimationLoop(Mi),typeof self<"u"&&ys.setContext(self),this.setAnimationLoop=function(w){dt=w,ae.setAnimationLoop(w),w===null?ys.stop():ys.start()},ae.addEventListener("sessionstart",si),ae.addEventListener("sessionend",Ad),this.render=function(w,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(F),F=ae.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,F,D),p=Le.get(w,S.length),p.init(F),S.push(p),ce.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),vt.setFromProjectionMatrix(ce,hi,F.reversedDepth),pe=this.localClippingEnabled,K=oe.init(this.clippingPlanes,pe),g=X.get(w,y.length),g.init(),y.push(g),ae.enabled===!0&&ae.isPresenting===!0){const se=v.xr.getDepthSensingMesh();se!==null&&Qc(se,F,-1/0,v.sortObjects)}Qc(w,F,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(fe,ve),kt=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,kt&&Ce.addToRenderList(g,w),this.info.render.frame++,K===!0&&oe.beginShadows();const z=p.state.shadowsArray;Ee.render(z,w,F),K===!0&&oe.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=g.opaque,O=g.transmissive;if(p.setupLights(),F.isArrayCamera){const se=F.cameras;if(O.length>0)for(let ge=0,we=se.length;ge<we;ge++){const xe=se[ge];Cd(H,O,w,xe)}kt&&Ce.render(w);for(let ge=0,we=se.length;ge<we;ge++){const xe=se[ge];Rd(g,w,xe,xe.viewport)}}else O.length>0&&Cd(H,O,w,F),kt&&Ce.render(w),Rd(g,w,F);D!==null&&L===0&&(Ze.updateMultisampleRenderTarget(D),Ze.updateRenderTargetMipmap(D)),w.isScene===!0&&w.onAfterRender(v,w,F),me.resetDefaultState(),b=-1,T=null,S.pop(),S.length>0?(p=S[S.length-1],K===!0&&oe.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function Qc(w,F,z,H){if(w.visible===!1)return;if(w.layers.test(F.layers)){if(w.isGroup)z=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(F);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||vt.intersectsSprite(w)){H&&ke.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ce);const ge=B.update(w),we=w.material;we.visible&&g.push(w,ge,we,z,ke.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||vt.intersectsObject(w))){const ge=B.update(w),we=w.material;if(H&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ke.copy(w.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),ke.copy(ge.boundingSphere.center)),ke.applyMatrix4(w.matrixWorld).applyMatrix4(ce)),Array.isArray(we)){const xe=ge.groups;for(let Be=0,He=xe.length;Be<He;Be++){const Ne=xe[Be],it=we[Ne.materialIndex];it&&it.visible&&g.push(w,ge,it,z,ke.z,Ne)}}else we.visible&&g.push(w,ge,we,z,ke.z,null)}}const se=w.children;for(let ge=0,we=se.length;ge<we;ge++)Qc(se[ge],F,z,H)}function Rd(w,F,z,H){const O=w.opaque,se=w.transmissive,ge=w.transparent;p.setupLightsView(z),K===!0&&oe.setGlobalState(v.clippingPlanes,z),H&&Ie.viewport(I.copy(H)),O.length>0&&io(O,F,z),se.length>0&&io(se,F,z),ge.length>0&&io(ge,F,z),Ie.buffers.depth.setTest(!0),Ie.buffers.depth.setMask(!0),Ie.buffers.color.setMask(!0),Ie.setPolygonOffset(!1)}function Cd(w,F,z,H){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new Hs(1,1,{generateMipmaps:!0,type:Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float")?Ya:gi,minFilter:Di,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));const se=p.state.transmissionRenderTarget[H.id],ge=H.viewport||I;se.setSize(ge.z*v.transmissionResolutionScale,ge.w*v.transmissionResolutionScale);const we=v.getRenderTarget(),xe=v.getActiveCubeFace(),Be=v.getActiveMipmapLevel();v.setRenderTarget(se),v.getClearColor(q),ee=v.getClearAlpha(),ee<1&&v.setClearColor(16777215,.5),v.clear(),kt&&Ce.render(z);const He=v.toneMapping;v.toneMapping=rs;const Ne=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),K===!0&&oe.setGlobalState(v.clippingPlanes,H),io(w,z,H),Ze.updateMultisampleRenderTarget(se),Ze.updateRenderTargetMipmap(se),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let it=!1;for(let gt=0,Ft=F.length;gt<Ft;gt++){const Tt=F[gt],xt=Tt.object,Fe=Tt.geometry,Lt=Tt.material,ct=Tt.group;if(Lt.side===Xt&&xt.layers.test(H.layers)){const Sn=Lt.side;Lt.side=yn,Lt.needsUpdate=!0,Pd(xt,z,H,Fe,Lt,ct),Lt.side=Sn,Lt.needsUpdate=!0,it=!0}}it===!0&&(Ze.updateMultisampleRenderTarget(se),Ze.updateRenderTargetMipmap(se))}v.setRenderTarget(we,xe,Be),v.setClearColor(q,ee),Ne!==void 0&&(H.viewport=Ne),v.toneMapping=He}function io(w,F,z){const H=F.isScene===!0?F.overrideMaterial:null;for(let O=0,se=w.length;O<se;O++){const ge=w[O],we=ge.object,xe=ge.geometry,Be=ge.group;let He=ge.material;He.allowOverride===!0&&H!==null&&(He=H),we.layers.test(z.layers)&&Pd(we,F,z,xe,He,Be)}}function Pd(w,F,z,H,O,se){w.onBeforeRender(v,F,z,H,O,se),w.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),O.onBeforeRender(v,F,z,H,w,se),O.transparent===!0&&O.side===Xt&&O.forceSinglePass===!1?(O.side=yn,O.needsUpdate=!0,v.renderBufferDirect(z,F,H,O,w,se),O.side=mi,O.needsUpdate=!0,v.renderBufferDirect(z,F,H,O,w,se),O.side=Xt):v.renderBufferDirect(z,F,H,O,w,se),w.onAfterRender(v,F,z,H,O,se)}function so(w,F,z){F.isScene!==!0&&(F=Ge);const H=Se.get(w),O=p.state.lights,se=p.state.shadowsArray,ge=O.state.version,we=Y.getParameters(w,O.state,se,F,z),xe=Y.getProgramCacheKey(we);let Be=H.programs;H.environment=w.isMeshStandardMaterial?F.environment:null,H.fog=F.fog,H.envMap=(w.isMeshStandardMaterial?Bt:Zt).get(w.envMap||H.environment),H.envMapRotation=H.environment!==null&&w.envMap===null?F.environmentRotation:w.envMapRotation,Be===void 0&&(w.addEventListener("dispose",Q),Be=new Map,H.programs=Be);let He=Be.get(xe);if(He!==void 0){if(H.currentProgram===He&&H.lightsStateVersion===ge)return Id(w,we),He}else we.uniforms=Y.getUniforms(w),w.onBeforeCompile(we,v),He=Y.acquireProgram(we,xe),Be.set(xe,He),H.uniforms=we.uniforms;const Ne=H.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ne.clippingPlanes=oe.uniform),Id(w,we),H.needsLights=c0(w),H.lightsStateVersion=ge,H.needsLights&&(Ne.ambientLightColor.value=O.state.ambient,Ne.lightProbe.value=O.state.probe,Ne.directionalLights.value=O.state.directional,Ne.directionalLightShadows.value=O.state.directionalShadow,Ne.spotLights.value=O.state.spot,Ne.spotLightShadows.value=O.state.spotShadow,Ne.rectAreaLights.value=O.state.rectArea,Ne.ltc_1.value=O.state.rectAreaLTC1,Ne.ltc_2.value=O.state.rectAreaLTC2,Ne.pointLights.value=O.state.point,Ne.pointLightShadows.value=O.state.pointShadow,Ne.hemisphereLights.value=O.state.hemi,Ne.directionalShadowMap.value=O.state.directionalShadowMap,Ne.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ne.spotShadowMap.value=O.state.spotShadowMap,Ne.spotLightMatrix.value=O.state.spotLightMatrix,Ne.spotLightMap.value=O.state.spotLightMap,Ne.pointShadowMap.value=O.state.pointShadowMap,Ne.pointShadowMatrix.value=O.state.pointShadowMatrix),H.currentProgram=He,H.uniformsList=null,He}function Ld(w){if(w.uniformsList===null){const F=w.currentProgram.getUniforms();w.uniformsList=Qo.seqWithValue(F.seq,w.uniforms)}return w.uniformsList}function Id(w,F){const z=Se.get(w);z.outputColorSpace=F.outputColorSpace,z.batching=F.batching,z.batchingColor=F.batchingColor,z.instancing=F.instancing,z.instancingColor=F.instancingColor,z.instancingMorph=F.instancingMorph,z.skinning=F.skinning,z.morphTargets=F.morphTargets,z.morphNormals=F.morphNormals,z.morphColors=F.morphColors,z.morphTargetsCount=F.morphTargetsCount,z.numClippingPlanes=F.numClippingPlanes,z.numIntersection=F.numClipIntersection,z.vertexAlphas=F.vertexAlphas,z.vertexTangents=F.vertexTangents,z.toneMapping=F.toneMapping}function a0(w,F,z,H,O){F.isScene!==!0&&(F=Ge),Ze.resetTextureUnits();const se=F.fog,ge=H.isMeshStandardMaterial?F.environment:null,we=D===null?v.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:gn,xe=(H.isMeshStandardMaterial?Bt:Zt).get(H.envMap||ge),Be=H.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,He=!!z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ne=!!z.morphAttributes.position,it=!!z.morphAttributes.normal,gt=!!z.morphAttributes.color;let Ft=rs;H.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(Ft=v.toneMapping);const Tt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,xt=Tt!==void 0?Tt.length:0,Fe=Se.get(H),Lt=p.state.lights;if(K===!0&&(pe===!0||w!==T)){const ln=w===T&&H.id===b;oe.setState(H,w,ln)}let ct=!1;H.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==Lt.state.version||Fe.outputColorSpace!==we||O.isBatchedMesh&&Fe.batching===!1||!O.isBatchedMesh&&Fe.batching===!0||O.isBatchedMesh&&Fe.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Fe.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Fe.instancing===!1||!O.isInstancedMesh&&Fe.instancing===!0||O.isSkinnedMesh&&Fe.skinning===!1||!O.isSkinnedMesh&&Fe.skinning===!0||O.isInstancedMesh&&Fe.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Fe.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Fe.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Fe.instancingMorph===!1&&O.morphTexture!==null||Fe.envMap!==xe||H.fog===!0&&Fe.fog!==se||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==oe.numPlanes||Fe.numIntersection!==oe.numIntersection)||Fe.vertexAlphas!==Be||Fe.vertexTangents!==He||Fe.morphTargets!==Ne||Fe.morphNormals!==it||Fe.morphColors!==gt||Fe.toneMapping!==Ft||Fe.morphTargetsCount!==xt)&&(ct=!0):(ct=!0,Fe.__version=H.version);let Sn=Fe.currentProgram;ct===!0&&(Sn=so(H,F,O));let js=!1,wn=!1,Qr=!1;const It=Sn.getUniforms(),In=Fe.uniforms;if(Ie.useProgram(Sn.program)&&(js=!0,wn=!0,Qr=!0),H.id!==b&&(b=H.id,wn=!0),js||T!==w){Ie.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),It.setValue(N,"projectionMatrix",w.projectionMatrix),It.setValue(N,"viewMatrix",w.matrixWorldInverse);const _n=It.map.cameraPosition;_n!==void 0&&_n.setValue(N,Oe.setFromMatrixPosition(w.matrixWorld)),ut.logarithmicDepthBuffer&&It.setValue(N,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&It.setValue(N,"isOrthographic",w.isOrthographicCamera===!0),T!==w&&(T=w,wn=!0,Qr=!0)}if(O.isSkinnedMesh){It.setOptional(N,O,"bindMatrix"),It.setOptional(N,O,"bindMatrixInverse");const ln=O.skeleton;ln&&(ln.boneTexture===null&&ln.computeBoneTexture(),It.setValue(N,"boneTexture",ln.boneTexture,Ze))}O.isBatchedMesh&&(It.setOptional(N,O,"batchingTexture"),It.setValue(N,"batchingTexture",O._matricesTexture,Ze),It.setOptional(N,O,"batchingIdTexture"),It.setValue(N,"batchingIdTexture",O._indirectTexture,Ze),It.setOptional(N,O,"batchingColorTexture"),O._colorsTexture!==null&&It.setValue(N,"batchingColorTexture",O._colorsTexture,Ze));const Dn=z.morphAttributes;if((Dn.position!==void 0||Dn.normal!==void 0||Dn.color!==void 0)&&re.update(O,z,Sn),(wn||Fe.receiveShadow!==O.receiveShadow)&&(Fe.receiveShadow=O.receiveShadow,It.setValue(N,"receiveShadow",O.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(In.envMap.value=xe,In.flipEnvMap.value=xe.isCubeTexture&&xe.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&F.environment!==null&&(In.envMapIntensity.value=F.environmentIntensity),wn&&(It.setValue(N,"toneMappingExposure",v.toneMappingExposure),Fe.needsLights&&o0(In,Qr),se&&H.fog===!0&&ne.refreshFogUniforms(In,se),ne.refreshMaterialUniforms(In,H,W,te,p.state.transmissionRenderTarget[w.id]),Qo.upload(N,Ld(Fe),In,Ze)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Qo.upload(N,Ld(Fe),In,Ze),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&It.setValue(N,"center",O.center),It.setValue(N,"modelViewMatrix",O.modelViewMatrix),It.setValue(N,"normalMatrix",O.normalMatrix),It.setValue(N,"modelMatrix",O.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const ln=H.uniformsGroups;for(let _n=0,el=ln.length;_n<el;_n++){const Ms=ln[_n];Ye.update(Ms,Sn),Ye.bind(Ms,Sn)}}return Sn}function o0(w,F){w.ambientLightColor.needsUpdate=F,w.lightProbe.needsUpdate=F,w.directionalLights.needsUpdate=F,w.directionalLightShadows.needsUpdate=F,w.pointLights.needsUpdate=F,w.pointLightShadows.needsUpdate=F,w.spotLights.needsUpdate=F,w.spotLightShadows.needsUpdate=F,w.rectAreaLights.needsUpdate=F,w.hemisphereLights.needsUpdate=F}function c0(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(w,F,z){const H=Se.get(w);H.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),Se.get(w.texture).__webglTexture=F,Se.get(w.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:z,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,F){const z=Se.get(w);z.__webglFramebuffer=F,z.__useDefaultFramebuffer=F===void 0};const l0=N.createFramebuffer();this.setRenderTarget=function(w,F=0,z=0){D=w,A=F,L=z;let H=!0,O=null,se=!1,ge=!1;if(w){const xe=Se.get(w);if(xe.__useDefaultFramebuffer!==void 0)Ie.bindFramebuffer(N.FRAMEBUFFER,null),H=!1;else if(xe.__webglFramebuffer===void 0)Ze.setupRenderTarget(w);else if(xe.__hasExternalTextures)Ze.rebindTextures(w,Se.get(w.texture).__webglTexture,Se.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Ne=w.depthTexture;if(xe.__boundDepthTexture!==Ne){if(Ne!==null&&Se.has(Ne)&&(w.width!==Ne.image.width||w.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ze.setupDepthRenderbuffer(w)}}const Be=w.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(ge=!0);const He=Se.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(He[F])?O=He[F][z]:O=He[F],se=!0):w.samples>0&&Ze.useMultisampledRTT(w)===!1?O=Se.get(w).__webglMultisampledFramebuffer:Array.isArray(He)?O=He[z]:O=He,I.copy(w.viewport),V.copy(w.scissor),G=w.scissorTest}else I.copy(De).multiplyScalar(W).floor(),V.copy($e).multiplyScalar(W).floor(),G=Rt;if(z!==0&&(O=l0),Ie.bindFramebuffer(N.FRAMEBUFFER,O)&&H&&Ie.drawBuffers(w,O),Ie.viewport(I),Ie.scissor(V),Ie.setScissorTest(G),se){const xe=Se.get(w.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+F,xe.__webglTexture,z)}else if(ge){const xe=F;for(let Be=0;Be<w.textures.length;Be++){const He=Se.get(w.textures[Be]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Be,He.__webglTexture,z,xe)}}else if(w!==null&&z!==0){const xe=Se.get(w.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,xe.__webglTexture,z)}b=-1},this.readRenderTargetPixels=function(w,F,z,H,O,se,ge,we=0){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=Se.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ge!==void 0&&(xe=xe[ge]),xe){Ie.bindFramebuffer(N.FRAMEBUFFER,xe);try{const Be=w.textures[we],He=Be.format,Ne=Be.type;if(!ut.textureFormatReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ut.textureTypeReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=w.width-H&&z>=0&&z<=w.height-O&&(w.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+we),N.readPixels(F,z,H,O,Pe.convert(He),Pe.convert(Ne),se))}finally{const Be=D!==null?Se.get(D).__webglFramebuffer:null;Ie.bindFramebuffer(N.FRAMEBUFFER,Be)}}},this.readRenderTargetPixelsAsync=async function(w,F,z,H,O,se,ge,we=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=Se.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ge!==void 0&&(xe=xe[ge]),xe)if(F>=0&&F<=w.width-H&&z>=0&&z<=w.height-O){Ie.bindFramebuffer(N.FRAMEBUFFER,xe);const Be=w.textures[we],He=Be.format,Ne=Be.type;if(!ut.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ut.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const it=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,it),N.bufferData(N.PIXEL_PACK_BUFFER,se.byteLength,N.STREAM_READ),w.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+we),N.readPixels(F,z,H,O,Pe.convert(He),Pe.convert(Ne),0);const gt=D!==null?Se.get(D).__webglFramebuffer:null;Ie.bindFramebuffer(N.FRAMEBUFFER,gt);const Ft=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await __(N,Ft,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,it),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,se),N.deleteBuffer(it),N.deleteSync(Ft),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,F=null,z=0){const H=Math.pow(2,-z),O=Math.floor(w.image.width*H),se=Math.floor(w.image.height*H),ge=F!==null?F.x:0,we=F!==null?F.y:0;Ze.setTexture2D(w,0),N.copyTexSubImage2D(N.TEXTURE_2D,z,0,0,ge,we,O,se),Ie.unbindTexture()};const u0=N.createFramebuffer(),h0=N.createFramebuffer();this.copyTextureToTexture=function(w,F,z=null,H=null,O=0,se=null){se===null&&(O!==0?(_r("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),se=O,O=0):se=0);let ge,we,xe,Be,He,Ne,it,gt,Ft;const Tt=w.isCompressedTexture?w.mipmaps[se]:w.image;if(z!==null)ge=z.max.x-z.min.x,we=z.max.y-z.min.y,xe=z.isBox3?z.max.z-z.min.z:1,Be=z.min.x,He=z.min.y,Ne=z.isBox3?z.min.z:0;else{const Dn=Math.pow(2,-O);ge=Math.floor(Tt.width*Dn),we=Math.floor(Tt.height*Dn),w.isDataArrayTexture?xe=Tt.depth:w.isData3DTexture?xe=Math.floor(Tt.depth*Dn):xe=1,Be=0,He=0,Ne=0}H!==null?(it=H.x,gt=H.y,Ft=H.z):(it=0,gt=0,Ft=0);const xt=Pe.convert(F.format),Fe=Pe.convert(F.type);let Lt;F.isData3DTexture?(Ze.setTexture3D(F,0),Lt=N.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Ze.setTexture2DArray(F,0),Lt=N.TEXTURE_2D_ARRAY):(Ze.setTexture2D(F,0),Lt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,F.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,F.unpackAlignment);const ct=N.getParameter(N.UNPACK_ROW_LENGTH),Sn=N.getParameter(N.UNPACK_IMAGE_HEIGHT),js=N.getParameter(N.UNPACK_SKIP_PIXELS),wn=N.getParameter(N.UNPACK_SKIP_ROWS),Qr=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,Tt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Tt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Be),N.pixelStorei(N.UNPACK_SKIP_ROWS,He),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ne);const It=w.isDataArrayTexture||w.isData3DTexture,In=F.isDataArrayTexture||F.isData3DTexture;if(w.isDepthTexture){const Dn=Se.get(w),ln=Se.get(F),_n=Se.get(Dn.__renderTarget),el=Se.get(ln.__renderTarget);Ie.bindFramebuffer(N.READ_FRAMEBUFFER,_n.__webglFramebuffer),Ie.bindFramebuffer(N.DRAW_FRAMEBUFFER,el.__webglFramebuffer);for(let Ms=0;Ms<xe;Ms++)It&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Se.get(w).__webglTexture,O,Ne+Ms),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Se.get(F).__webglTexture,se,Ft+Ms)),N.blitFramebuffer(Be,He,ge,we,it,gt,ge,we,N.DEPTH_BUFFER_BIT,N.NEAREST);Ie.bindFramebuffer(N.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(O!==0||w.isRenderTargetTexture||Se.has(w)){const Dn=Se.get(w),ln=Se.get(F);Ie.bindFramebuffer(N.READ_FRAMEBUFFER,u0),Ie.bindFramebuffer(N.DRAW_FRAMEBUFFER,h0);for(let _n=0;_n<xe;_n++)It?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Dn.__webglTexture,O,Ne+_n):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Dn.__webglTexture,O),In?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ln.__webglTexture,se,Ft+_n):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ln.__webglTexture,se),O!==0?N.blitFramebuffer(Be,He,ge,we,it,gt,ge,we,N.COLOR_BUFFER_BIT,N.NEAREST):In?N.copyTexSubImage3D(Lt,se,it,gt,Ft+_n,Be,He,ge,we):N.copyTexSubImage2D(Lt,se,it,gt,Be,He,ge,we);Ie.bindFramebuffer(N.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else In?w.isDataTexture||w.isData3DTexture?N.texSubImage3D(Lt,se,it,gt,Ft,ge,we,xe,xt,Fe,Tt.data):F.isCompressedArrayTexture?N.compressedTexSubImage3D(Lt,se,it,gt,Ft,ge,we,xe,xt,Tt.data):N.texSubImage3D(Lt,se,it,gt,Ft,ge,we,xe,xt,Fe,Tt):w.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,se,it,gt,ge,we,xt,Fe,Tt.data):w.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,se,it,gt,Tt.width,Tt.height,xt,Tt.data):N.texSubImage2D(N.TEXTURE_2D,se,it,gt,ge,we,xt,Fe,Tt);N.pixelStorei(N.UNPACK_ROW_LENGTH,ct),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Sn),N.pixelStorei(N.UNPACK_SKIP_PIXELS,js),N.pixelStorei(N.UNPACK_SKIP_ROWS,wn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Qr),se===0&&F.generateMipmaps&&N.generateMipmap(Lt),Ie.unbindTexture()},this.copyTextureToTexture3D=function(w,F,z=null,H=null,O=0){return _r('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,F,z,H,O)},this.initRenderTarget=function(w){Se.get(w).__webglFramebuffer===void 0&&Ze.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Ze.setTextureCube(w,0):w.isData3DTexture?Ze.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Ze.setTexture2DArray(w,0):Ze.setTexture2D(w,0),Ie.unbindTexture()},this.resetState=function(){A=0,L=0,D=null,Ie.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}}function rp(i,e){if(e===G0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===ju||e===am){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===ju)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class qw extends _s{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Zw(t)}),this.register(function(t){return new Jw(t)}),this.register(function(t){return new ob(t)}),this.register(function(t){return new cb(t)}),this.register(function(t){return new lb(t)}),this.register(function(t){return new eb(t)}),this.register(function(t){return new tb(t)}),this.register(function(t){return new nb(t)}),this.register(function(t){return new ib(t)}),this.register(function(t){return new $w(t)}),this.register(function(t){return new sb(t)}),this.register(function(t){return new Qw(t)}),this.register(function(t){return new ab(t)}),this.register(function(t){return new rb(t)}),this.register(function(t){return new Kw(t)}),this.register(function(t){return new ub(t)}),this.register(function(t){return new hb(t)})}load(e,t,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=yr.extractUrlBase(e);a=yr.resolveURL(l,this.path)}else a=yr.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Nc(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Bm){try{a[nt.KHR_BINARY_GLTF]=new db(e)}catch(h){s&&s(h);return}r=JSON.parse(a[nt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new Tb(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case nt.KHR_MATERIALS_UNLIT:a[h]=new jw;break;case nt.KHR_DRACO_MESH_COMPRESSION:a[h]=new fb(r,this.dracoLoader);break;case nt.KHR_TEXTURE_TRANSFORM:a[h]=new pb;break;case nt.KHR_MESH_QUANTIZATION:a[h]=new mb;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function Yw(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const nt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Kw{constructor(e){this.parser=e,this.name=nt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const u=new ye(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],gn);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Lm(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Zh(u),l.distance=h;break;case"spot":l=new Yv(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Ii(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class jw{constructor(){this.name=nt.KHR_MATERIALS_UNLIT}getMaterialType(){return Qe}extendParams(e,t,n){const s=[];e.color=new ye(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],gn),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,At))}return Promise.all(s)}}class $w{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Zw{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new he(o,o)}return Promise.all(r)}}class Jw{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class Qw{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class eb{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new ye(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],gn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,At)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class tb{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class nb{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new ye().setRGB(o[0],o[1],o[2],gn),Promise.all(r)}}class ib{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class sb{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new ye().setRGB(o[0],o[1],o[2],gn),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,At)),Promise.all(r)}}class rb{constructor(e){this.parser=e,this.name=nt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class ab{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class ob{constructor(e){this.parser=e,this.name=nt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class cb{constructor(e){this.parser=e,this.name=nt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class lb{constructor(e){this.parser=e,this.name=nt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class ub{constructor(e){this.name=nt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=s.byteOffset||0,l=s.byteLength||0,u=s.count,h=s.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(f),u,h,d,s.mode,s.filter),f})})}else return null}}class hb{constructor(e){this.name=nt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==On.TRIANGLES&&l.mode!==On.TRIANGLE_STRIP&&l.mode!==On.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],d=l[0].count,f=[];for(const m of h){const _=new Xe,g=new E,p=new Xn,y=new E(1,1,1),S=new K_(m.geometry,m.material,d);for(let v=0;v<d;v++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,v),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,v),c.SCALE&&y.fromBufferAttribute(c.SCALE,v),S.setMatrixAt(v,_.compose(g,p,y));for(const v in c)if(v==="_COLOR_0"){const P=c[v];S.instanceColor=new Zu(P.array,P.itemSize,P.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&m.geometry.setAttribute(v,c[v]);yt.prototype.copy.call(S,m),this.parser.assignFinalMaterial(S),f.push(S)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const Bm="glTF",ca=12,ap={JSON:1313821514,BIN:5130562};class db{constructor(e){this.name=nt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ca),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Bm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-ca,r=new DataView(e,ca);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===ap.JSON){const l=new Uint8Array(e,ca+a,o);this.content=n.decode(l)}else if(c===ap.BIN){const l=ca+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class fb{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=nt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const u in a){const h=ih[u]||u.toLowerCase();o[h]=a[u]}for(const u in e.attributes){const h=ih[u]||u.toLowerCase();if(a[u]!==void 0){const d=n.accessors[e.attributes[u]],f=Mr[d.componentType];l[h]=f.name,c[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){s.decodeDracoFile(u,function(f){for(const m in f.attributes){const _=f.attributes[m],g=c[m];g!==void 0&&(_.normalized=g)}h(f)},o,l,gn,d)})})}}class pb{constructor(){this.name=nt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class mb{constructor(){this.name=nt.KHR_MESH_QUANTIZATION}}class zm extends $a{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=s-t,h=(n-t)/u,d=h*h,f=d*h,m=e*l,_=m-l,g=-2*f+3*d,p=f-d,y=1-g,S=p-d+h;for(let v=0;v!==o;v++){const P=a[_+v+o],A=a[_+v+c]*u,L=a[m+v+o],D=a[m+v]*u;r[v]=y*P+S*A+g*L+p*D}return r}}const gb=new Xn;class _b extends zm{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return gb.fromArray(r).normalize().toArray(r),r}}const On={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Mr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},op={9728:pn,9729:Rn,9984:Jp,9985:Yo,9986:ha,9987:Di},cp={33071:ts,33648:fc,10497:us},zl={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ih={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ki={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},vb={CUBICSPLINE:void 0,LINEAR:Pa,STEP:Ca},Hl={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function xb(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Kt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:mi})),i.DefaultMaterial}function Rs(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ii(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function yb(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,u=e.length;l<u;l++){const h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];if(n){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;a.push(d)}if(s){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;o.push(d)}if(r){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],d=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function Mb(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Sb(i){let e;const t=i.extensions&&i.extensions[nt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Vl(t.attributes):e=i.indices+":"+Vl(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Vl(i.targets[n]);return e}function Vl(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function sh(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function wb(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const bb=new Xe;class Tb{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Yw,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new jh(this.options.manager):this.textureLoader=new $v(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Nc(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Rs(r,o,s),Ii(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,u]of a.children.entries())r(u,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[nt.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(yr.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=zl[s.type],o=Mr[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new Yt(l,a,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=zl[s.type],l=Mr[s.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0;let _,g;if(f&&f!==h){const p=Math.floor(d/f),y="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let S=t.cache.get(y);S||(_=new l(o,p*f,s.count*f/u),S=new G_(_,f/u),t.cache.add(y,S)),g=new Hh(S,c,d%f/u,m)}else o===null?_=new l(s.count*c):_=new l(o,d,s.count*c),g=new Yt(_,c,m);if(s.sparse!==void 0){const p=zl.SCALAR,y=Mr[s.sparse.indices.componentType],S=s.sparse.indices.byteOffset||0,v=s.sparse.values.byteOffset||0,P=new y(a[1],S,s.sparse.count*p),A=new l(a[2],v,s.sparse.count*c);o!==null&&(g=new Yt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let L=0,D=P.length;L<D;L++){const b=P[L];if(g.setX(b,A[L*c]),c>=2&&g.setY(b,A[L*c+1]),c>=3&&g.setZ(b,A[L*c+2]),c>=4&&g.setW(b,A[L*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return u.magFilter=op[d.magFilter]||Rn,u.minFilter=op[d.minFilter]||Di,u.wrapS=cp[d.wrapS]||us,u.wrapT=cp[d.wrapT]||us,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==pn&&u.minFilter!==Rn,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=s.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(h){l=!0;const d=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(d,f){let m=d;t.isImageBitmapLoader===!0&&(m=function(_){const g=new Qt(_);g.needsUpdate=!0,d(g)}),t.load(yr.resolveURL(h,r.path),m,void 0,f)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),Ii(h,a),h.userData.mimeType=a.mimeType||wb(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[nt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[nt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[nt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Us,Pn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new as,Pn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Kt}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},l=[];if(c[nt.KHR_MATERIALS_UNLIT]){const h=s[nt.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,r,t))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new ye(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],gn),o.opacity=d[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,At)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Xt);const u=r.alphaMode||Hl.OPAQUE;if(u===Hl.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Hl.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Qe&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new he(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==Qe&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Qe){const h=r.emissiveFactor;o.emissive=new ye().setRGB(h[0],h[1],h[2],gn)}return r.emissiveTexture!==void 0&&a!==Qe&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,At)),Promise.all(l).then(function(){const h=new a(o);return r.name&&(h.name=r.name),Ii(h,r),t.associations.set(h,{materials:e}),r.extensions&&Rs(s,h,r),h})}createUniqueName(e){const t=mt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[nt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return lp(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],u=Sb(l),h=s[u];if(h)a.push(h.promise);else{let d;l.extensions&&l.extensions[nt.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=lp(new bt,l,t),s[u]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const u=a[c].material===void 0?xb(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let f=0,m=u.length;f<m;f++){const _=u[f],g=a[f];let p;const y=l[f];if(g.mode===On.TRIANGLES||g.mode===On.TRIANGLE_STRIP||g.mode===On.TRIANGLE_FAN||g.mode===void 0)p=r.isSkinnedMesh===!0?new X_(_,y):new j(_,y),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===On.TRIANGLE_STRIP?p.geometry=rp(p.geometry,am):g.mode===On.TRIANGLE_FAN&&(p.geometry=rp(p.geometry,ju));else if(g.mode===On.LINES)p=new Ia(_,y);else if(g.mode===On.LINE_STRIP)p=new Lc(_,y);else if(g.mode===On.LINE_LOOP)p=new J_(_,y);else if(g.mode===On.POINTS)p=new xa(_,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&Mb(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Ii(p,r),g.extensions&&Rs(s,p,g),t.assignFinalMaterial(p),h.push(p)}for(let f=0,m=h.length;f<m;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return r.extensions&&Rs(s,h[0],r),h[0];const d=new ot;r.extensions&&Rs(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,m=h.length;f<m;f++)d.add(h[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new fn(Re.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Jh(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ii(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],c=[];for(let l=0,u=a.length;l<u;l++){const h=a[l];if(h){o.push(h);const d=new Xe;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Vh(o,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let h=0,d=s.channels.length;h<d;h++){const f=s.channels[h],m=s.samplers[f.sampler],_=f.target,g=_.node,p=s.parameters!==void 0?s.parameters[m.input]:m.input,y=s.parameters!==void 0?s.parameters[m.output]:m.output;_.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",y)),l.push(m),u.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const d=h[0],f=h[1],m=h[2],_=h[3],g=h[4],p=[];for(let y=0,S=d.length;y<S;y++){const v=d[y],P=f[y],A=m[y],L=_[y],D=g[y];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const b=n._createAnimationTracks(v,P,A,L,D);if(b)for(let T=0;T<b.length;T++)p.push(b[T])}return new Bv(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const u=l[0],h=l[1],d=l[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,bb)});for(let f=0,m=h.length;f<m;f++)u.add(h[f]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new gm:l.length>1?u=new ot:l.length===1?u=l[0]:u=new yt,u!==l[0])for(let h=0,d=l.length;h<d;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=a),Ii(u,r),r.extensions&&Rs(n,u,r),r.matrix!==void 0){const h=new Xe;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const h=s.associations.get(u);s.associations.set(u,{...h})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new ot;n.name&&(r.name=s.createUniqueName(n.name)),Ii(r,n),n.extensions&&Rs(t,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);const l=u=>{const h=new Map;for(const[d,f]of s.associations)(d instanceof Pn||d instanceof Qt)&&h.set(d,f);return u.traverse(d=>{const f=s.associations.get(d);f!=null&&h.set(d,f)}),h};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const a=[],o=e.name?e.name:e.uuid,c=[];Ki[r.path]===Ki.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(Ki[r.path]){case Ki.weights:l=Br;break;case Ki.rotation:l=zr;break;case Ki.translation:case Ki.scale:l=Hr;break;default:n.itemSize===1?l=Br:l=Hr;break}const u=s.interpolation!==void 0?vb[s.interpolation]:Pa,h=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const m=new l(c[d]+"."+Ki[r.path],t.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=sh(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof zr?_b:zm;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Eb(i,e,t){const n=e.attributes,s=new Ln;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new E(c[0],c[1],c[2]),new E(l[0],l[1],l[2])),o.normalized){const u=sh(Mr[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new E,c=new E;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){const _=sh(Mr[d.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new vi;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function lp(i,e,t){const n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(const a in n){const o=ih[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return tt.workingColorSpace!==gn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${tt.workingColorSpace}" not supported.`),Ii(i,e),Eb(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?yb(i,e.targets,t):i})}class Ab extends _s{constructor(e){super(e)}load(e,t,n,s){const r=this,a=this.path===""?yr.extractUrlBase(e):this.path,o=new Nc(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(c){try{t(r.parse(c,a))}catch(l){s?s(l):console.error(l),r.manager.itemError(e)}},n,s)}setMaterialOptions(e){return this.materialOptions=e,this}parse(e,t){const n=e.split(`
`);let s={};const r=/\s+/,a={};for(let c=0;c<n.length;c++){let l=n[c];if(l=l.trim(),l.length===0||l.charAt(0)==="#")continue;const u=l.indexOf(" ");let h=u>=0?l.substring(0,u):l;h=h.toLowerCase();let d=u>=0?l.substring(u+1):"";if(d=d.trim(),h==="newmtl")s={name:d},a[d]=s;else if(h==="ka"||h==="kd"||h==="ks"||h==="ke"){const f=d.split(r,3);s[h]=[parseFloat(f[0]),parseFloat(f[1]),parseFloat(f[2])]}else s[h]=d}const o=new Rb(this.resourcePath||t,this.materialOptions);return o.setCrossOrigin(this.crossOrigin),o.setManager(this.manager),o.setMaterials(a),o}}class Rb{constructor(e="",t={}){this.baseUrl=e,this.options=t,this.materialsInfo={},this.materials={},this.materialsArray=[],this.nameLookup={},this.crossOrigin="anonymous",this.side=this.options.side!==void 0?this.options.side:mi,this.wrap=this.options.wrap!==void 0?this.options.wrap:us}setCrossOrigin(e){return this.crossOrigin=e,this}setManager(e){this.manager=e}setMaterials(e){this.materialsInfo=this.convert(e),this.materials={},this.materialsArray=[],this.nameLookup={}}convert(e){if(!this.options)return e;const t={};for(const n in e){const s=e[n],r={};t[n]=r;for(const a in s){let o=!0,c=s[a];const l=a.toLowerCase();switch(l){case"kd":case"ka":case"ks":this.options&&this.options.normalizeRGB&&(c=[c[0]/255,c[1]/255,c[2]/255]),this.options&&this.options.ignoreZeroRGBs&&c[0]===0&&c[1]===0&&c[2]===0&&(o=!1);break}o&&(r[l]=c)}}return t}preload(){for(const e in this.materialsInfo)this.create(e)}getIndex(e){return this.nameLookup[e]}getAsArray(){let e=0;for(const t in this.materialsInfo)this.materialsArray[e]=this.create(t),this.nameLookup[t]=e,e++;return this.materialsArray}create(e){return this.materials[e]===void 0&&this.createMaterial_(e),this.materials[e]}createMaterial_(e){const t=this,n=this.materialsInfo[e],s={name:e,side:this.side};function r(o,c){return typeof c!="string"||c===""?"":/^https?:\/\//i.test(c)?c:o+c}function a(o,c){if(s[o])return;const l=t.getTextureParams(c,s),u=t.loadTexture(r(t.baseUrl,l.url));u.repeat.copy(l.scale),u.offset.copy(l.offset),u.wrapS=t.wrap,u.wrapT=t.wrap,(o==="map"||o==="emissiveMap")&&(u.colorSpace=At),s[o]=u}for(const o in n){const c=n[o];let l;if(c!=="")switch(o.toLowerCase()){case"kd":s.color=tt.colorSpaceToWorking(new ye().fromArray(c),At);break;case"ks":s.specular=tt.colorSpaceToWorking(new ye().fromArray(c),At);break;case"ke":s.emissive=tt.colorSpaceToWorking(new ye().fromArray(c),At);break;case"map_kd":a("map",c);break;case"map_ks":a("specularMap",c);break;case"map_ke":a("emissiveMap",c);break;case"norm":a("normalMap",c);break;case"map_bump":case"bump":a("bumpMap",c);break;case"disp":a("displacementMap",c);break;case"map_d":a("alphaMap",c),s.transparent=!0;break;case"ns":s.shininess=parseFloat(c);break;case"d":l=parseFloat(c),l<1&&(s.opacity=l,s.transparent=!0);break;case"tr":l=parseFloat(c),this.options&&this.options.invertTrProperty&&(l=1-l),l>0&&(s.opacity=1-l,s.transparent=!0);break}}return this.materials[e]=new Kh(s),this.materials[e]}getTextureParams(e,t){const n={scale:new he(1,1),offset:new he(0,0)},s=e.split(/\s+/);let r;return r=s.indexOf("-bm"),r>=0&&(t.bumpScale=parseFloat(s[r+1]),s.splice(r,2)),r=s.indexOf("-mm"),r>=0&&(t.displacementBias=parseFloat(s[r+1]),t.displacementScale=parseFloat(s[r+2]),s.splice(r,3)),r=s.indexOf("-s"),r>=0&&(n.scale.set(parseFloat(s[r+1]),parseFloat(s[r+2])),s.splice(r,4)),r=s.indexOf("-o"),r>=0&&(n.offset.set(parseFloat(s[r+1]),parseFloat(s[r+2])),s.splice(r,4)),n.url=s.join(" ").trim(),n}loadTexture(e,t,n,s,r){const a=this.manager!==void 0?this.manager:Pm;let o=a.getHandler(e);o===null&&(o=new jh(a)),o.setCrossOrigin&&o.setCrossOrigin(this.crossOrigin);const c=o.load(e,n,s,r);return t!==void 0&&(c.mapping=t),c}}const Cb=/^[og]\s*(.+)?/,Pb=/^mtllib /,Lb=/^usemtl /,Ib=/^usemap /,up=/\s+/,hp=new E,Gl=new E,dp=new E,fp=new E,Un=new E,ko=new ye;function Db(){const i={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=t!==!1;return}const n=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:t!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(s,r){const a=this._finalize(!1);a&&(a.inherited||a.groupCount<=0)&&this.materials.splice(a.index,1);const o={index:this.materials.length,name:s||"",mtllib:Array.isArray(r)&&r.length>0?r[r.length-1]:"",smooth:a!==void 0?a.smooth:this.smooth,groupStart:a!==void 0?a.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(c){const l={index:typeof c=="number"?c:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return l.clone=this.clone.bind(l),l}};return this.materials.push(o),o},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(s){const r=this.currentMaterial();if(r&&r.groupEnd===-1&&(r.groupEnd=this.geometry.vertices.length/3,r.groupCount=r.groupEnd-r.groupStart,r.inherited=!1),s&&this.materials.length>1)for(let a=this.materials.length-1;a>=0;a--)this.materials[a].groupCount<=0&&this.materials.splice(a,1);return s&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),r}},n&&n.name&&typeof n.clone=="function"){const s=n.clone(0);s.inherited=!0,this.object.materials.push(s)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseNormalIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseUVIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/2)*2},addVertex:function(e,t,n){const s=this.vertices,r=this.object.geometry.vertices;r.push(s[e+0],s[e+1],s[e+2]),r.push(s[t+0],s[t+1],s[t+2]),r.push(s[n+0],s[n+1],s[n+2])},addVertexPoint:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,n){const s=this.normals,r=this.object.geometry.normals;r.push(s[e+0],s[e+1],s[e+2]),r.push(s[t+0],s[t+1],s[t+2]),r.push(s[n+0],s[n+1],s[n+2])},addFaceNormal:function(e,t,n){const s=this.vertices,r=this.object.geometry.normals;hp.fromArray(s,e),Gl.fromArray(s,t),dp.fromArray(s,n),Un.subVectors(dp,Gl),fp.subVectors(hp,Gl),Un.cross(fp),Un.normalize(),r.push(Un.x,Un.y,Un.z),r.push(Un.x,Un.y,Un.z),r.push(Un.x,Un.y,Un.z)},addColor:function(e,t,n){const s=this.colors,r=this.object.geometry.colors;s[e]!==void 0&&r.push(s[e+0],s[e+1],s[e+2]),s[t]!==void 0&&r.push(s[t+0],s[t+1],s[t+2]),s[n]!==void 0&&r.push(s[n+0],s[n+1],s[n+2])},addUV:function(e,t,n){const s=this.uvs,r=this.object.geometry.uvs;r.push(s[e+0],s[e+1]),r.push(s[t+0],s[t+1]),r.push(s[n+0],s[n+1])},addDefaultUV:function(){const e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){const t=this.uvs;this.object.geometry.uvs.push(t[e+0],t[e+1])},addFace:function(e,t,n,s,r,a,o,c,l){const u=this.vertices.length;let h=this.parseVertexIndex(e,u),d=this.parseVertexIndex(t,u),f=this.parseVertexIndex(n,u);if(this.addVertex(h,d,f),this.addColor(h,d,f),o!==void 0&&o!==""){const m=this.normals.length;h=this.parseNormalIndex(o,m),d=this.parseNormalIndex(c,m),f=this.parseNormalIndex(l,m),this.addNormal(h,d,f)}else this.addFaceNormal(h,d,f);if(s!==void 0&&s!==""){const m=this.uvs.length;h=this.parseUVIndex(s,m),d=this.parseUVIndex(r,m),f=this.parseUVIndex(a,m),this.addUV(h,d,f),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";const t=this.vertices.length;for(let n=0,s=e.length;n<s;n++){const r=this.parseVertexIndex(e[n],t);this.addVertexPoint(r),this.addColor(r)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";const n=this.vertices.length,s=this.uvs.length;for(let r=0,a=e.length;r<a;r++)this.addVertexLine(this.parseVertexIndex(e[r],n));for(let r=0,a=t.length;r<a;r++)this.addUVLine(this.parseUVIndex(t[r],s))}};return i.startObject("",!1),i}class Nb extends _s{constructor(e){super(e),this.materials=null}load(e,t,n,s){const r=this,a=new Nc(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(r.parse(o))}catch(c){s?s(c):console.error(c),r.manager.itemError(e)}},n,s)}setMaterials(e){return this.materials=e,this}parse(e){const t=new Db;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));const n=e.split(`
`);let s=[];for(let o=0,c=n.length;o<c;o++){const l=n[o].trimStart();if(l.length===0)continue;const u=l.charAt(0);if(u!=="#")if(u==="v"){const h=l.split(up);switch(h[0]){case"v":t.vertices.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3])),h.length>=7?(ko.setRGB(parseFloat(h[4]),parseFloat(h[5]),parseFloat(h[6]),At),t.colors.push(ko.r,ko.g,ko.b)):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3]));break;case"vt":t.uvs.push(parseFloat(h[1]),parseFloat(h[2]));break}}else if(u==="f"){const d=l.slice(1).trim().split(up),f=[];for(let _=0,g=d.length;_<g;_++){const p=d[_];if(p.length>0){const y=p.split("/");f.push(y)}}const m=f[0];for(let _=1,g=f.length-1;_<g;_++){const p=f[_],y=f[_+1];t.addFace(m[0],p[0],y[0],m[1],p[1],y[1],m[2],p[2],y[2])}}else if(u==="l"){const h=l.substring(1).trim().split(" ");let d=[];const f=[];if(l.indexOf("/")===-1)d=h;else for(let m=0,_=h.length;m<_;m++){const g=h[m].split("/");g[0]!==""&&d.push(g[0]),g[1]!==""&&f.push(g[1])}t.addLineGeometry(d,f)}else if(u==="p"){const d=l.slice(1).trim().split(" ");t.addPointGeometry(d)}else if((s=Cb.exec(l))!==null){const h=(" "+s[0].slice(1).trim()).slice(1);t.startObject(h)}else if(Lb.test(l))t.object.startMaterial(l.substring(7).trim(),t.materialLibraries);else if(Pb.test(l))t.materialLibraries.push(l.substring(7).trim());else if(Ib.test(l))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(u==="s"){if(s=l.split(" "),s.length>1){const d=s[1].trim().toLowerCase();t.object.smooth=d!=="0"&&d!=="off"}else t.object.smooth=!0;const h=t.object.currentMaterial();h&&(h.smooth=t.object.smooth)}else{if(l==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+l+'"')}}t.finalize();const r=new ot;if(r.materialLibraries=[].concat(t.materialLibraries),!(t.objects.length===1&&t.objects[0].geometry.vertices.length===0)===!0)for(let o=0,c=t.objects.length;o<c;o++){const l=t.objects[o],u=l.geometry,h=l.materials,d=u.type==="Line",f=u.type==="Points";let m=!1;if(u.vertices.length===0)continue;const _=new bt;_.setAttribute("position",new Ve(u.vertices,3)),u.normals.length>0&&_.setAttribute("normal",new Ve(u.normals,3)),u.colors.length>0&&(m=!0,_.setAttribute("color",new Ve(u.colors,3))),u.hasUVIndices===!0&&_.setAttribute("uv",new Ve(u.uvs,2));const g=[];for(let y=0,S=h.length;y<S;y++){const v=h[y],P=v.name+"_"+v.smooth+"_"+m;let A=t.materials[P];if(this.materials!==null){if(A=this.materials.create(v.name),d&&A&&!(A instanceof as)){const L=new as;Pn.prototype.copy.call(L,A),L.color.copy(A.color),A=L}else if(f&&A&&!(A instanceof Us)){const L=new Us({size:10,sizeAttenuation:!1});Pn.prototype.copy.call(L,A),L.color.copy(A.color),L.map=A.map,A=L}}A===void 0&&(d?A=new as:f?A=new Us({size:1,sizeAttenuation:!1}):A=new Kh,A.name=v.name,A.flatShading=!v.smooth,A.vertexColors=m,t.materials[P]=A),g.push(A)}let p;if(g.length>1){for(let y=0,S=h.length;y<S;y++){const v=h[y];_.addGroup(v.groupStart,v.groupCount,y)}d?p=new Ia(_,g):f?p=new xa(_,g):p=new j(_,g)}else d?p=new Ia(_,g[0]):f?p=new xa(_,g[0]):p=new j(_,g[0]);p.name=l.name,r.add(p)}else if(t.vertices.length>0){const o=new Us({size:1,sizeAttenuation:!1}),c=new bt;c.setAttribute("position",new Ve(t.vertices,3)),t.colors.length>0&&t.colors[0]!==void 0&&(c.setAttribute("color",new Ve(t.colors,3)),o.vertexColors=!0);const l=new xa(c,o);r.add(l)}return r}}const _i={"hatchback-sports":{label:"Hatchback Sport",callout:"LIGHT // QUICK",model:"./assets/rigged/vehicles/kenney-hatchback-sports.glb",preview:"./assets/rigged/vehicles/previews/hatchback-sports.png",turretHeight:2.34},police:{label:"Police Interceptor",callout:"PURSUIT // TOUGH",model:"./assets/rigged/vehicles/kenney-police.glb",preview:"./assets/rigged/vehicles/previews/police.png",turretHeight:2.56},"race-future":{label:"Future Racer",callout:"LOW // EXOTIC",model:"./assets/rigged/vehicles/kenney-race-future.glb",preview:"./assets/rigged/vehicles/previews/race-future.png",turretHeight:2.16},race:{label:"Track Racer",callout:"LOW // FAST",model:"./assets/rigged/vehicles/kenney-race.glb",preview:"./assets/rigged/vehicles/previews/race.png",turretHeight:2.12},"sedan-sports":{label:"Sport Sedan",callout:"BALANCED // SHARP",model:"./assets/rigged/vehicles/kenney-sedan-sports.glb",preview:"./assets/rigged/vehicles/previews/sedan-sports.png",turretHeight:2.28},sedan:{label:"Street Sedan",callout:"BALANCED // CLEAN",model:"./assets/rigged/vehicles/kenney-sedan.glb",preview:"./assets/rigged/vehicles/previews/sedan.png",turretHeight:2.38},"suv-luxury":{label:"Luxury SUV",callout:"HIGH // HEAVY",model:"./assets/rigged/vehicles/kenney-suv-luxury.glb",preview:"./assets/rigged/vehicles/previews/suv-luxury.png",turretHeight:2.64},suv:{label:"Scrap SUV",callout:"RUGGED // READY",model:"./assets/rigged/vehicles/kenney-suv.glb",preview:"./assets/rigged/vehicles/previews/suv.png",turretHeight:2.54},taxi:{label:"Battle Taxi",callout:"LOUD // ICONIC",model:"./assets/rigged/vehicles/kenney-taxi.glb",preview:"./assets/rigged/vehicles/previews/taxi.png",turretHeight:2.67}},Hm={vehicle:{defaultId:"suv",models:_i,palette:"./assets/rigged/vehicles/Textures/colormap.png",wheelNodes:["wheel-back-left","wheel-back-right","wheel-front-left","wheel-front-right"]},weapon:{model:null,fallback:"Three original low-poly roof turrets and anime-style weapon VFX assembled in Three.js"},arena:{ramp:"./assets/rigged/arena/kenney-ramp.glb",barrier:"./assets/rigged/arena/kenney-barrier-wall.glb",pylon:"./assets/rigged/arena/kenney-pylon.glb"},props:{palette:"./assets/rigged/props/Textures/colormap.png",crate:"./assets/rigged/props/kenney-crate.glb",tire:"./assets/rigged/props/kenney-debris-tire.glb",bumper:"./assets/rigged/props/kenney-debris-bumper.glb"},packs:{carKit:{name:"Kenney Car Kit 3.1",creator:"Kenney",source:"https://kenney.nl/assets/car-kit",license:"CC0 1.0",creditRequired:!1,licenseFile:"./assets/rigged/licenses/kenney-car-kit.txt"},racingKit:{name:"Kenney Racing Kit 2.0",creator:"Kenney",source:"https://kenney.nl/assets/racing-kit",license:"CC0 1.0",creditRequired:!1,licenseFile:"./assets/rigged/licenses/kenney-racing-kit.txt"}}},pp="./assets/rigged/racekart-hilly",Wt=(i,e)=>({obj:`${pp}/${i}.obj`,mtl:`${pp}/${i}.mtl`,category:e}),Fa={terrainFlat:Wt("Terrain_Grass_Flat_1x1","terrain"),terrainHillSide:Wt("Terrain_Hill_Side_1x3","terrain"),terrainHillCorner:Wt("Terrain_Hill_Corner_Outer_4x4","terrain"),trackStraight:Wt("Track_Standard_Straight_Double","track"),trackStraightStriped:Wt("Track_Striped_Straight_Double","track"),trackCurve:Wt("Track_Standard_Curve_Double_4x4","track"),trackCurveStriped:Wt("Track_Striped_Curve_Double_4x4","track"),trackBank:Wt("Track_Standard_Incline_Double","track"),trackBankStriped:Wt("Track_Striped_Incline_Double","track"),bridgeStart:Wt("Track_Bridge_Start","bridge"),bridgeIncline:Wt("Track_Bridge_Incline_Gentle_Supported","bridge"),bridgeFlat:Wt("Track_Bridge_Flat_Supported","bridge"),bridgeCurve:Wt("Track_Bridge_Curve_3x3","bridge"),stuntRamp:Wt("Prop_Track_Ramp","stunt"),stuntRailing:Wt("Prop_Track_Ramp_Railing","stunt"),trackArch:Wt("Prop_Track_Arch_1x4","prop"),fence:Wt("Prop_Decorative_Fence_Railing","prop"),rockWide:Wt("Prop_Decorative_Rock_2","prop"),rockTall:Wt("Prop_Decorative_Rock_5","prop"),hayBale:Wt("Prop_Decorative_Hay_Bale_Box","prop")},En=Math.PI/2,mp=Math.PI,Oc={dustring:{id:"dustring",name:"Dust Ring",callsign:"LEVEL 01 // SCRAP RING",description:"One clean combat loop with an open center, four readable jumps, and room to hunt the rival.",difficulty:"COMBAT READY",arenaKind:"ring",radius:100,ringInnerRadius:60,ringOuterRadius:88,spawn:{x:0,z:-74,heading:0},opponentSpawn:{x:0,z:74,heading:mp},objective:"Run the circuit. Hit the ramps. Scrap the rival.",surfaces:[{asset:"stuntRamp",kind:"ramp",x:0,z:-57,rotation:0,width:12,length:22,startHeight:0,endHeight:4.8,scale:11,assetYaw:En,label:"south inward ramp"},{asset:"stuntRamp",kind:"ramp",x:0,z:57,rotation:0,width:12,length:22,startHeight:0,endHeight:4.8,scale:11,assetYaw:En,label:"north outward ramp"},{asset:"stuntRamp",kind:"ramp",x:-57,z:0,rotation:-En,width:12,length:22,startHeight:0,endHeight:4.8,scale:11,assetYaw:En,label:"west outward ramp"},{asset:"stuntRamp",kind:"ramp",x:57,z:0,rotation:-En,width:12,length:22,startHeight:0,endHeight:4.8,scale:11,assetYaw:En,label:"east inward ramp"}],track:[],terrain:[],props:[{asset:"rockWide",x:-23,z:19,rotation:.25,scale:5.2,label:"center west rock"},{asset:"rockTall",x:-18,z:-18,rotation:-.4,scale:4.2,label:"center south rock"},{asset:"hayBale",x:18,z:-24,rotation:.15,scale:3.8,label:"center hay one"},{asset:"hayBale",x:23,z:-24,rotation:-.12,scale:3.8,label:"center hay two"}],barriers:[{x:31,z:-21,rotation:En,length:19},{x:31,z:21,rotation:En,length:19},{x:-8,z:31,rotation:0,length:13},{x:-31,z:-4,rotation:En,length:13}],targets:[]},ovalbowl:{id:"ovalbowl",name:"Capsule Circuit",callsign:"ARENA 02 // CAPSULE WALL-RIDE",description:"A flat capsule stadium with long straights, rounded ends, a layered bank, and a hard upper guard.",difficulty:"WALL RIDE READY",arenaKind:"capsule",radius:112,ringInnerRadius:44,ringOuterRadius:62,bowl:{straightHalfLength:46,flatRadius:44,outerRadius:62,wallRise:11.5,guardHeight:4.5},spawn:{x:0,z:-22,heading:0},opponentSpawn:{x:0,z:22,heading:mp},objective:"Own the open floor. Carry speed into the bank. Scrap the rival.",surfaces:[],track:[],terrain:[],props:[{asset:"stuntRailing",x:-63.2,z:-17,rotation:En,scale:8,label:"west rim racing rail south"},{asset:"stuntRailing",x:-63.2,z:17,rotation:En,scale:8,label:"west rim racing rail north"},{asset:"stuntRailing",x:63.2,z:-17,rotation:En,scale:8,label:"east rim racing rail south"},{asset:"stuntRailing",x:63.2,z:17,rotation:En,scale:8,label:"east rim racing rail north"}],barriers:[],targets:[]}},Vm="dustring",Ub=new E(0,-1,0);function Fb(i,e){i.updateWorldMatrix(!0,!0);const t=new Ln().setFromObject(i),n=e.sampleSpacing??1.15,s=Re.clamp(Math.ceil(e.width/n)+1,3,49),r=Re.clamp(Math.ceil(e.length/n)+1,3,49),a=new Float32Array(s*r),o=new Uint8Array(s*r),c=new Im,l=Math.cos(e.rotation),u=Math.sin(e.rotation),h=t.max.y+2,d=Math.max(8,t.max.y-t.min.y+4),f=e.width*.995,m=e.length*.995;for(let _=0;_<r;_++){const g=-m*.5+_/(r-1)*m;for(let p=0;p<s;p++){const y=-f*.5+p/(s-1)*f,S=e.centerX+y*l+g*u,v=e.centerZ-y*u+g*l;c.set(new E(S,h,v),Ub),c.far=d;const P=c.intersectObject(i,!0)[0],A=_*s+p;P&&(a[A]=P.point.y,o[A]=1)}}return{label:e.label,center:new he(e.centerX,e.centerZ),rotation:e.rotation,width:e.width,length:e.length,columns:s,rows:r,heights:a,valid:o,metadata:e.metadata}}function Ob(i,e,t){const n=e-i.center.x,s=t-i.center.y,r=Math.cos(i.rotation),a=Math.sin(i.rotation),o=n*r-s*a,c=n*a+s*r,l=o/i.width+.5,u=c/i.length+.5;if(l<0||l>1||u<0||u>1)return null;const h=l*(i.columns-1),d=u*(i.rows-1),f=Math.min(Math.floor(h),i.columns-2),m=Math.min(Math.floor(d),i.rows-2),_=h-f,g=d-m,p=[[m*i.columns+f,(1-_)*(1-g)],[m*i.columns+f+1,_*(1-g)],[(m+1)*i.columns+f,(1-_)*g],[(m+1)*i.columns+f+1,_*g]];let y=0,S=0;for(const[v,P]of p)i.valid[v]&&(y+=i.heights[v]*P,S+=P);return S>.24?y/S:null}function kb(i,e){const t=[],n=Math.cos(i.rotation),s=Math.sin(i.rotation),r=(u,h)=>{const d=-i.width*.5+u/(i.columns-1)*i.width,f=-i.length*.5+h/(i.rows-1)*i.length,m=i.center.x+d*n+f*s,_=i.center.y-d*s+f*n;return[m,i.heights[h*i.columns+u]+.055,_]},a=(u,h,d,f)=>{const m=h*i.columns+u,_=f*i.columns+d;!i.valid[m]||!i.valid[_]||t.push(...r(u,h),...r(d,f))};for(let u=0;u<i.rows;u++)for(let h=0;h<i.columns;h++)h+1<i.columns&&a(h,u,h+1,u),u+1<i.rows&&a(h,u,h,u+1);const o=new bt;o.setAttribute("position",new Ve(t,3));const c=new as({color:e,transparent:!0,opacity:.9,depthTest:!1}),l=new Ia(o,c);return l.name=`heightfield-debug-${i.label}`,l.renderOrder=20,l.visible=!1,l}const Bb=(i,e)=>Math.sin(i*.075)*Math.cos(e*.058)*.035,Wl=i=>i*i*(3-2*i),Xl=i=>6*i*(1-i);function zb(i,e,t){if(i<=0)return{height:0,slope:0,band:"floor"};if(i<.28){const s=i/.28;return{height:t*.14*Wl(s),slope:t*.14*Xl(s)/(.28*e),band:"transition"}}if(i<.78){const s=(i-.28)/.5;return{height:t*(.14+.66*Wl(s)),slope:t*.66*Xl(s)/(.5*e),band:"bank"}}const n=(i-.78)/.22;return{height:t*(.8+.2*Wl(n)),slope:t*.2*Xl(n)/(.22*e),band:"upper-bank"}}function qt(i,e,t){const n=Re.clamp(t,-i.straightHalfLength,i.straightHalfLength),s=e,r=t-n,a=Math.hypot(s,r),o=a>1e-4?s/a:1,c=a>1e-4?r/a:0,l=i.outerRadius-i.flatRadius,u=Re.clamp((a-i.flatRadius)/l,0,1),h=zb(u,l,i.wallRise),d=1-Re.smoothstep(a,i.flatRadius-8,i.flatRadius),f=Bb(e,t)*d+h.height,m=h.slope,_=new E(-o*m,1,-c*m).normalize();return{height:f,distance:a,progress:u,anchorZ:n,outwardX:o,outwardZ:c,normal:_,band:h.band}}function Gm(i,e,t,n,s,r){let a=e,o=t,c=!1,l=0,u=0,h=0;const d=i.outerRadius-r-.12;for(let f=0;f<3;f++){let m=0,_=0,g=0;for(const p of[-s,0,s]){const y=a+Math.sin(n)*p,S=o+Math.cos(n)*p,v=qt(i,y,S),P=v.distance-d;P<=m||(m=P,_=v.outwardX,g=v.outwardZ)}if(m<=0)break;a-=_*(m+.015),o-=g*(m+.015),c=!0,l=_,u=g,h=Math.max(h,m)}return{x:a,z:o,collided:c,normalX:l,normalZ:u,penetration:h}}function nd(i,e,t=48,n=40){const s=[];for(let r=0;r<t;r++){const a=r/t*Math.PI;s.push(new he(Math.cos(a)*i,e+Math.sin(a)*i))}for(let r=0;r<n;r++){const a=r/n;s.push(new he(-i,Re.lerp(e,-e,a)))}for(let r=0;r<t;r++){const a=Math.PI+r/t*Math.PI;s.push(new he(Math.cos(a)*i,-e+Math.sin(a)*i))}for(let r=0;r<n;r++){const a=r/n;s.push(new he(i,Re.lerp(-e,e,a)))}return s}function Wm(i,e){i.setAttribute("color",new Ve(e,3));const t=i.getAttribute("position"),n=new Float32Array(t.count*2);for(let s=0;s<t.count;s++)n[s*2]=t.getX(s)/7.5,n[s*2+1]=t.getZ(s)/7.5;i.setAttribute("uv",new Ve(n,2)),i.computeVertexNormals(),i.computeBoundingSphere()}function Hb(i){const e=nd(i.flatRadius,i.straightHalfLength),t=[],n=[],s=new ye(12429711),r=new ye(14796193),a=new ye;for(const u of e){const h=qt(i,u.x,u.y).height;t.push(u.x,h,u.y);const d=Re.clamp(.48+Math.sin(u.x*.13+u.y*.09)*.12,0,1);a.copy(s).lerp(r,d).toArray(n,n.length)}const o=xr.triangulateShape(e,[]),c=[];for(const[u,h,d]of o)c.push(u,d,h);const l=new bt;return l.setAttribute("position",new Ve(t,3)),l.setIndex(c),Wm(l,n),l}function Vb(i,e=30){const t=[];for(let d=0;d<=e;d++){const f=Re.lerp(i.flatRadius,i.outerRadius,d/e);t.push(nd(f,i.straightHalfLength))}const n=t[0].length,s=[],r=[],a=new ye(12764608),o=new ye(7764856),c=new ye(12020290),l=new ye;for(let d=0;d<t.length;d++){const f=d/e;for(const m of t[d])s.push(m.x,qt(i,m.x,m.y).height,m.y),l.copy(a).lerp(o,f),(f>.28&&f<.32||f>.76&&f<.8)&&l.lerp(c,.68),l.toArray(r,r.length)}const u=[];for(let d=0;d<e;d++)for(let f=0;f<n;f++){const m=(f+1)%n,_=d*n+f,g=d*n+m,p=(d+1)*n+f,y=(d+1)*n+m;u.push(_,g,p,g,y,p)}const h=new bt;return h.setAttribute("position",new Ve(s,3)),h.setIndex(u),Wm(h,r),h}function Gb(i){const e=nd(i.outerRadius,i.straightHalfLength),t=[],n=[],s=[],r=[0];for(let o=1;o<=e.length;o++)r.push(r[o-1]+e[(o-1)%e.length].distanceTo(e[o%e.length]));for(let o=0;o<e.length;o++){const c=e[o],l=qt(i,c.x,c.y).height;t.push(c.x,l-.08,c.y),t.push(c.x,l+i.guardHeight,c.y);const u=r[o]/7.5;n.push(u,0,u,i.guardHeight/7.5)}for(let o=0;o<e.length;o++){const c=(o+1)%e.length,l=o*2,u=l+1,h=c*2,d=h+1;s.push(l,u,h,h,u,d)}const a=new bt;return a.setAttribute("position",new Ve(t,3)),a.setAttribute("uv",new Ve(n,2)),a.setIndex(s),a.computeVertexNormals(),a.computeBoundingSphere(),a}const Bo=11.5,zo=6.3,gp=2.6,_p=4.5;class Wb{mode="chase";camera;desiredPosition=new E;desiredLook=new E;smoothedLook=new E;forward=new E;toEnemy=new E;orbitYaw=0;followDistance=Bo;followHeight=zo;initialized=!1;constructor(e){this.camera=e}setMode(e){this.mode=e}toggle(e){return this.mode==="enemy"?(this.mode="chase",{mode:this.mode,noTarget:!1}):(this.mode="enemy",{mode:this.mode,noTarget:!e})}snapToChase(e,t,n){this.orbitYaw=t,this.followDistance=Bo,this.followHeight=zo,this.forward.set(Math.sin(t),0,Math.cos(t)),this.camera.position.copy(e).addScaledVector(this.forward,-Bo),this.camera.position.y=Math.max(e.y+zo,n(this.camera.position.x,this.camera.position.z)+gp),this.smoothedLook.copy(e).addScaledVector(this.forward,4),this.smoothedLook.y=e.y+1.2,this.camera.lookAt(this.smoothedLook),this.initialized=!0}update(e){const t=Re.clamp(e.dt,0,.03333333333333333),n=this.mode==="enemy"&&e.enemyAvailable&&!!e.enemyPosition,s=!1;this.forward.set(Math.sin(e.playerHeading),0,Math.cos(e.playerHeading));let r=null;if(n&&e.enemyPosition){if(this.toEnemy.copy(e.enemyPosition).sub(e.playerPosition),this.toEnemy.y=0,r=this.toEnemy.length(),r>.75){const l=Math.atan2(this.toEnemy.x,this.toEnemy.z),u=Math.atan2(Math.sin(l-this.orbitYaw),Math.cos(l-this.orbitYaw));this.orbitYaw+=u*this.response(5.4,t)}const a=Re.clamp(8.9+r*.105,9.5,14.5),o=Re.clamp(6.4+r*.035,6.4,9.2);this.followDistance=Re.lerp(this.followDistance,a,this.response(4.2,t)),this.followHeight=Re.lerp(this.followHeight,o,this.response(4.2,t)),this.forward.set(Math.sin(this.orbitYaw),0,Math.cos(this.orbitYaw)),this.desiredPosition.copy(e.playerPosition).addScaledVector(this.forward,-this.followDistance),this.desiredPosition.y=e.playerPosition.y+this.followHeight;const c=Re.clamp(.36+r*.002,.36,.54);this.desiredLook.lerpVectors(e.playerPosition,e.enemyPosition,c),this.desiredLook.y+=1.25}else this.orbitYaw=e.playerHeading,this.followDistance=Re.lerp(this.followDistance,Bo,this.response(4.8,t)),this.followHeight=Re.lerp(this.followHeight,zo,this.response(4.8,t)),this.desiredPosition.copy(e.playerPosition).addScaledVector(this.forward,-this.followDistance),this.desiredPosition.y=e.playerPosition.y+this.followHeight,this.desiredLook.copy(e.playerPosition).addScaledVector(this.forward,4),this.desiredLook.y=e.playerPosition.y+1.2;return e.shake&&this.desiredPosition.add(e.shake),this.constrainToArena(this.desiredPosition,e.bounds),this.desiredPosition.y=Math.max(this.desiredPosition.y,e.groundHeight(this.desiredPosition.x,this.desiredPosition.z)+gp),this.initialized||this.snapToChase(e.playerPosition,e.playerHeading,e.groundHeight),this.camera.position.lerp(this.desiredPosition,this.response(6.5,t)),this.smoothedLook.lerp(this.desiredLook,this.response(8.5,t)),this.camera.up.set(0,1,0),this.camera.lookAt(this.smoothedLook),{mode:this.mode,fellBackToChase:s,targetDistance:r}}get lookAt(){return this.smoothedLook}response(e,t){return 1-Math.exp(-e*t)}constrainToArena(e,t){if(t.kind==="ring"){const c=Math.max(1,t.radius-_p),l=Math.hypot(e.x,e.z);l>c&&(e.x*=c/l,e.z*=c/l);return}const n=Re.clamp(e.z,-t.straightHalfLength,t.straightHalfLength),s=e.x,r=e.z-n,a=Math.hypot(s,r),o=Math.max(1,t.outerRadius-_p);a<=o||(e.x=s*o/a,e.z=n+r*o/a)}}const Xb=420,vp=40,xp=35,qb=340,yp=24,Yb=".starter-card,.upgrade-card,.vehicle-card",ec=["weapon","body","wheel"];let Oa=0;function kc(i){return Array.from(i.querySelectorAll(Yb)).filter(e=>!e.hidden)}function id(i,e,t){const n=i.dataset.category;if(n==="weapon"||n==="turret")return"weapon";if(n==="body")return"body";if(n==="wheel")return"wheel";const s=t?.dataset.activeDeck;if(s&&ec.includes(s))return s;const r=i.dataset.optionId??String(e),a=Array.from(r).reduce((o,c)=>o+c.charCodeAt(0),0);return ec[a%ec.length]}function Kb(i,e,t){const n=id(i,e,t);return t.matches(".deck-stack")?t:t.querySelector(`[data-deck-pile="${n}"] .deck-cards`)??t.querySelector(".deck-cards")??t}function Xm(i,e){i.map((n,s)=>({card:n,index:s,deckId:id(n,s,e),sourceRect:Kb(n,s,e).getBoundingClientRect(),cardRect:n.getBoundingClientRect()})).forEach(({card:n,index:s,deckId:r,sourceRect:a,cardRect:o})=>{n.dataset.sourceDeck=n.dataset.category==="ability"?"wildcard":r,n.style.setProperty("--deck-x",`${a.left+a.width/2-o.left-o.width/2}px`),n.style.setProperty("--deck-y",`${a.top+a.height/2-o.top-o.height/2}px`),n.style.setProperty("--deal-rotate",`${(s-1)*5.5}deg`)})}function qm(i,e,t){e.classList.add("draft-motion-pending"),window.requestAnimationFrame(()=>{i===Oa&&(e.classList.remove("draft-motion-pending"),t())})}function Ym(i,e){const t=e[0]?id(e[0],0):"weapon";i.dataset.activeDeck=t,i.querySelectorAll("[data-deck-pile]").forEach(n=>n.classList.toggle("is-active-draw",n.dataset.deckPile===t))}function sd(i,e){const t=++Oa,n=i.closest(".draft-shell")?.querySelector(".deck-stack,.deck-rack");if(!n)return;const s=kc(i);n.classList.remove("is-collecting","is-dealing"),Ym(n,s),s.forEach((r,a)=>{r.classList.remove("is-picked","is-pending","is-shuffling-in","is-dealing","is-revealed"),r.style.setProperty("--deal-delay",`${vp+a*xp}ms`)}),i.classList.remove("is-pick-pending"),Xm(s,n),qm(t,i,()=>{n.classList.add("is-dealing"),s.forEach(r=>r.classList.add("is-dealing"))}),e.dataset.deckAnimation="shuffling-and-dealing",window.setTimeout(()=>{t===Oa&&(s.forEach(r=>{r.classList.remove("is-dealing"),r.classList.add("is-revealed")}),n.classList.remove("is-dealing"),e.dataset.deckAnimation="ready")},vp+Xb+Math.max(0,s.length-1)*xp+70)}function Km(i,e,t){const n=++Oa,s=i.closest(".draft-shell")?.querySelector(".deck-stack,.deck-rack");if(!s)return;const r=kc(i);s.classList.remove("is-dealing","is-collecting"),Ym(s,r),r.forEach((a,o)=>{const c=a.dataset.optionId===e;a.classList.remove("is-dealing","is-pending","is-shuffling-in"),a.classList.toggle("is-picked",c),a.style.setProperty("--shuffle-delay",`${c?70:(r.length-1-o)*yp}ms`),a.querySelectorAll("button").forEach(l=>{l.disabled=!0})}),i.classList.remove("is-pick-pending"),Xm(r,s),qm(n,i,()=>{s.classList.add("is-collecting"),r.forEach(a=>a.classList.add("is-shuffling-in"))}),t.dataset.deckAnimation="applying-pick",window.setTimeout(()=>{n===Oa&&(t.dataset.deckAnimation="stacked")},qb+r.length*yp+90)}function rd(i,e,t){const n=kc(i);i.classList.add("is-pick-pending"),n.forEach(s=>{s.classList.toggle("is-pending",s.dataset.optionId===e);const r=s.matches("button")?s:s.querySelector("button");r&&(r.disabled=!0)}),t.dataset.deckAnimation="pick-pending"}function jb(i,e){for(const t of ec){const n=i.querySelector(`[data-deck-pile="${t}"]`),s=e[t];if(!n||s===void 0)continue;const r=Number(n.dataset.deckTotal)||Math.max(1,s),a=n.dataset.remaining,o=Math.max(0,Math.min(1,s/r));n.dataset.remaining=String(s),n.style.setProperty("--deck-fill",String(o)),n.classList.toggle("is-low",o<=.25),n.classList.toggle("is-empty",s===0);const c=n.querySelector("small");c&&(c.textContent=`×${s}`),n.querySelectorAll(".deck-cards i").forEach((l,u,h)=>{const d=s===0?0:Math.max(1,Math.ceil(o*h.length));l.style.opacity=u<d?"1":".12"}),a!==void 0&&a!==String(s)&&(n.classList.remove("count-changed"),n.offsetWidth,n.classList.add("count-changed"))}}function jm(i){return i.classList.contains("draft-motion-pending")||kc(i).some(e=>e.classList.contains("is-dealing"))}const Sr=()=>({damageMultiplier:1,fireRateMultiplier:1,projectileSpeedMultiplier:1,rangeMultiplier:1,projectileCount:1,spread:0,ricochets:0,pierces:0,burnDps:0,burnDuration:0,heavyRounds:!1,splitChambers:0}),$m=()=>({maxHealthMultiplier:1,accelerationMultiplier:1,maxSpeedMultiplier:1,handlingMultiplier:1,tractionMultiplier:1,boostMultiplier:1,armorBonus:0,ramMultiplier:1,stabilityMultiplier:1,sizeMultiplier:1,massMultiplier:1,driftControlMultiplier:1,wallGripMultiplier:1}),$n=(i,e)=>{Object.keys(i.turretStats).forEach(t=>e(i.turretStats[t]))},ri=i=>({...i,category:"weapon",deck:"weapon",scope:"All Turrets",copies:2}),ji=i=>({...i,category:"body",deck:"body",scope:"Vehicle Body",copies:2}),$i=i=>({...i,category:"wheel",deck:"wheel",scope:"Wheels & Handling",copies:2}),Ho=i=>({...i,category:"ability",deck:"ability",scope:"Q Ability",copies:1}),Zm=[ri({id:"quick-trigger",name:"Quick Trigger",rarity:"common",description:"A clean trigger tune for every mounted weapon.",stats:["+20% fire rate"],quote:"A little quicker is a lot louder.",apply:i=>$n(i,e=>{e.fireRateMultiplier*=1.2})}),ri({id:"sharpened-rounds",name:"Sharpened Rounds",rarity:"common",description:"Better-machined ammunition for the whole turret rack.",stats:["+15% damage"],quote:"File the edges. Find the weak spot.",apply:i=>$n(i,e=>{e.damageMultiplier*=1.15})}),ri({id:"heavy-rounds",name:"Heavy Rounds",rarity:"rare",description:"All turret weapons trade cadence for crushing hits.",stats:["+80% damage","-35% fire rate","Heavier shot VFX"],quote:"Slow. Loud. Final.",apply:i=>$n(i,e=>{e.damageMultiplier*=1.8,e.fireRateMultiplier*=.65,e.heavyRounds=!0})}),ri({id:"hair-trigger",name:"Hair Trigger",rarity:"rare",description:"Your turrets fire frantically, with lighter and less disciplined shots.",stats:["+45% fire rate","-20% damage","+10° spread"],quote:"Accuracy can wait. The trigger cannot.",apply:i=>$n(i,e=>{e.fireRateMultiplier*=1.45,e.damageMultiplier*=.8,e.spread+=Math.PI/18})}),ri({id:"multishot",name:"Multishot",rarity:"epic",description:"All mounted weapons throw an extra projectile downrange.",stats:["+1 projectile","-25% damage","+8° spread"],quote:"Accuracy is a problem for the other car.",apply:i=>$n(i,e=>{e.projectileCount+=1,e.damageMultiplier*=.75,e.spread+=Math.PI/22.5})}),ri({id:"ricochet-rounds",name:"Ricochet Rounds",rarity:"rare",description:"Every turret shot can rebound from the arena floor.",stats:["+1 ricochet","-15% projectile speed","-10% damage"],quote:"Miss once. Hit later.",apply:i=>$n(i,e=>{e.ricochets+=1,e.projectileSpeedMultiplier*=.85,e.damageMultiplier*=.9})}),ri({id:"incendiary-rounds",name:"Incendiary Rounds",rarity:"epic",description:"All turret shots glow orange and ignite the rival on impact.",stats:["Shots apply burn","10 burn damage / sec","-15% direct damage"],quote:"Make the arena smell like bad decisions.",apply:i=>$n(i,e=>{e.burnDps+=10,e.burnDuration=Math.max(e.burnDuration,3),e.damageMultiplier*=.85})}),ri({id:"piercing-rounds",name:"Piercing Rounds",rarity:"rare",description:"All turret projectiles punch through one additional target.",stats:["Pierces +1 target","-15% damage","Bright tracer"],quote:"Armor is just scenery.",apply:i=>$n(i,e=>{e.pierces+=1,e.damageMultiplier*=.85})}),ri({id:"long-barrel",name:"Long Barrel",rarity:"common",description:"Every turret gains velocity and reach at a modest cadence cost.",stats:["+25% projectile speed","+20% range","-10% fire rate"],quote:"Reach out and ruin somebody's afternoon.",apply:i=>$n(i,e=>{e.projectileSpeedMultiplier*=1.25,e.rangeMultiplier*=1.2,e.fireRateMultiplier*=.9})}),ri({id:"split-chamber",name:"Split Chamber",rarity:"epic",description:"Every fourth trigger pull adds a side-projectile pair to all turrets.",stats:["Every 4th shot: +2 side shots","-10% base damage"],quote:"One chamber. Three bad outcomes.",apply:i=>$n(i,e=>{e.splitChambers+=1,e.damageMultiplier*=.9})})],Jm=[ji({id:"reinforced-frame",name:"Reinforced Frame",rarity:"common",description:"Cross-bracing toughens the body with a small acceleration cost.",stats:["+20% max health","-5% acceleration"],quote:"Brace it, weld it, send it.",apply:i=>{i.vehicleStats.maxHealthMultiplier*=1.2,i.vehicleStats.accelerationMultiplier*=.95}}),ji({id:"steel-plating",name:"Steel Plating",rarity:"rare",description:"Layered body armor shrugs off impacts but weighs down the rig.",stats:["+18% damage reduction","-10% top speed"],quote:"Steel does not need to dodge.",apply:i=>{i.vehicleStats.armorBonus+=.18,i.vehicleStats.maxSpeedMultiplier*=.9}}),ji({id:"light-frame",name:"Light Frame",rarity:"common",description:"Strip the body down until speed becomes the armor.",stats:["+12% acceleration","+10% top speed","-15% max health"],quote:"If they hit you, the build was wrong.",apply:i=>{i.vehicleStats.accelerationMultiplier*=1.12,i.vehicleStats.maxSpeedMultiplier*=1.1,i.vehicleStats.maxHealthMultiplier*=.85}}),ji({id:"heavy-chassis",name:"Heavy Chassis",rarity:"rare",description:"A dense chassis hits harder and stays together longer.",stats:["+25% max health","+20% mass & ramming","-12% handling"],quote:"Cornering is optional when the other car moves.",apply:i=>{i.vehicleStats.maxHealthMultiplier*=1.25,i.vehicleStats.massMultiplier*=1.2,i.vehicleStats.ramMultiplier*=1.2,i.vehicleStats.handlingMultiplier*=.88}}),ji({id:"roll-cage",name:"Roll Cage",rarity:"common",description:"Internal bracing resists ugly rolls and protects the cabin.",stats:["+25% stability","+10% max health"],quote:"Land dirty. Drive away clean.",apply:i=>{i.vehicleStats.stabilityMultiplier*=1.25,i.vehicleStats.maxHealthMultiplier*=1.1}}),ji({id:"battle-bumper",name:"Battle Bumper",rarity:"rare",description:"A reinforced prow rewards direct, aggressive contact.",stats:["+35% ramming damage","+8% frontal armor","-5% handling"],quote:"The shortest route is through them.",apply:i=>{i.vehicleStats.ramMultiplier*=1.35,i.vehicleStats.armorBonus+=.08,i.vehicleStats.handlingMultiplier*=.95}}),ji({id:"compact-rig",name:"Compact Rig",rarity:"rare",description:"A smaller body changes direction quickly but carries less hull.",stats:["-10% vehicle size","+12% handling","-10% max health"],quote:"Harder to hit. Easier to dent.",apply:i=>{i.vehicleStats.sizeMultiplier*=.9,i.vehicleStats.handlingMultiplier*=1.12,i.vehicleStats.maxHealthMultiplier*=.9}}),ji({id:"overbuilt-hull",name:"Overbuilt Hull",rarity:"epic",description:"An excessive slab-sided rebuild turns the car into a moving bunker.",stats:["+45% max health","-15% acceleration","-10% handling"],quote:"Too much steel is almost enough.",apply:i=>{i.vehicleStats.maxHealthMultiplier*=1.45,i.vehicleStats.accelerationMultiplier*=.85,i.vehicleStats.handlingMultiplier*=.9}})],Qm=[$i({id:"racing-tires",name:"Racing Tires",rarity:"common",description:"Fast rubber sharpens turn-in and raises the pace.",stats:["+18% handling","+10% top speed","-8% rough stability"],quote:"Grip now. Regret the pothole later.",apply:i=>{i.vehicleStats.handlingMultiplier*=1.18,i.vehicleStats.maxSpeedMultiplier*=1.1,i.vehicleStats.stabilityMultiplier*=.92,i.tireVisual="racing"}}),$i({id:"offroad-tires",name:"Offroad Tires",rarity:"common",description:"Chunky tread keeps the rig composed on banks and rough ground.",stats:["+20% traction","+20% rough stability","-5% top speed"],quote:"Ugly tires. Beautiful landings.",apply:i=>{i.vehicleStats.tractionMultiplier*=1.2,i.vehicleStats.stabilityMultiplier*=1.2,i.vehicleStats.maxSpeedMultiplier*=.95,i.tireVisual="offroad"}}),$i({id:"drift-tires",name:"Drift Tires",rarity:"rare",description:"Predictable slip makes broad slides easier to hold and recover.",stats:["+25% drift control","+15% turn-in","-10% traction"],quote:"Sideways is still forward.",apply:i=>{i.vehicleStats.driftControlMultiplier*=1.25,i.vehicleStats.handlingMultiplier*=1.15,i.vehicleStats.tractionMultiplier*=.9,i.tireVisual="drift"}}),$i({id:"grip-tread",name:"Grip Tread",rarity:"common",description:"Soft tread bites hard at the expense of flat-out speed.",stats:["+25% traction","-8% top speed"],quote:"Make every tire earn its keep.",apply:i=>{i.vehicleStats.tractionMultiplier*=1.25,i.vehicleStats.maxSpeedMultiplier*=.92,i.tireVisual="grip"}}),$i({id:"turbo-wheels",name:"Turbo Wheels",rarity:"rare",description:"Light high-speed wheels trade calm steering for raw pace.",stats:["+15% acceleration","+15% top speed","-10% handling"],quote:"Point first. Launch second.",apply:i=>{i.vehicleStats.accelerationMultiplier*=1.15,i.vehicleStats.maxSpeedMultiplier*=1.15,i.vehicleStats.handlingMultiplier*=.9,i.tireVisual="turbo"}}),$i({id:"armored-wheels",name:"Armored Wheels",rarity:"rare",description:"Heavy hubs and reinforced sidewalls resist roll and impact.",stats:["+20% wheel stability","+10% anti-roll","-8% acceleration"],quote:"Keep four on the ground.",apply:i=>{i.vehicleStats.stabilityMultiplier*=1.3,i.vehicleStats.accelerationMultiplier*=.92,i.tireVisual="heavy"}}),$i({id:"wall-grip-tires",name:"Wall-Grip Tires",rarity:"epic",description:"Special tread clings to banks, slopes, and Arena 2 walls.",stats:["+25% wall traction","+15% wall stability","-5% flat top speed"],quote:"The wall is another road.",apply:i=>{i.vehicleStats.wallGripMultiplier*=1.25,i.vehicleStats.stabilityMultiplier*=1.15,i.vehicleStats.maxSpeedMultiplier*=.95,i.tireVisual="wall"}}),$i({id:"lightweight-rims",name:"Lightweight Rims",rarity:"common",description:"Cut rotating mass for a livelier rig that hits with less authority.",stats:["+15% acceleration","+10% handling","-10% mass & ramming"],quote:"Less wheel. More response.",apply:i=>{i.vehicleStats.accelerationMultiplier*=1.15,i.vehicleStats.handlingMultiplier*=1.1,i.vehicleStats.massMultiplier*=.9,i.vehicleStats.ramMultiplier*=.9,i.tireVisual="light"}})],eg=[Ho({id:"ability-bunny-hop",abilityId:"bunny_hop",name:"Bunny Hop",rarity:"epic",description:"Tap Q to pop the car into a short recovery hop.",stats:["Q: short upward hop","7 second cooldown","Replaces current ability"],quote:"Four wheels. Briefly optional.",apply:i=>{i.activeAbility="bunny_hop"}}),Ho({id:"ability-mega-boost",abilityId:"mega_boost",name:"Mega Boost",rarity:"epic",description:"Tap Q for a violent 1.5-second forward burst.",stats:["Q: massive acceleration","1.5 second duration","10 second cooldown"],quote:"The horizon can catch up later.",apply:i=>{i.activeAbility="mega_boost"}}),Ho({id:"ability-reflect",abilityId:"reflect",name:"Reflect",rarity:"epic",description:"Tap Q to raise a brief shield that returns incoming shots.",stats:["Q: 2 second reflect shield","14 second cooldown","Replaces current ability"],quote:"Return to sender. Add dents.",apply:i=>{i.activeAbility="reflect"}}),Ho({id:"ability-mega-shroom",abilityId:"mega_shroom",name:"Mega Shroom",rarity:"epic",description:"Tap Q to become a glowing, oversized wrecking machine.",stats:["Q: 5 seconds at double size","+100% temporary health & damage","18 second cooldown"],quote:"Make the rig everybody else's problem.",apply:i=>{i.activeAbility="mega_shroom"}})],Bc=[...Zm,...Jm,...Qm,...eg];function $b(){const i=(e,t)=>e.flatMap(n=>Array.from({length:t},()=>n.id));return{weapon:i(Zm,2),body:i(Jm,2),wheel:i(Qm,2),ability:i(eg,1)}}function ka(i,e=1){return{version:2,round:e,ownedTurrets:[i],activeTurret:i,turretStats:{mg:Sr(),rocket:Sr(),sniper:Sr()},vehicleStats:$m(),activeAbility:"none",upgrades:[],pickedCards:[],remainingDecks:$b(),repairAfterRound:0,roundShield:0,swapCooldown:.16,tireVisual:"stock",cameraMode:"chase"}}const rh={mg:"Scrap Rattler",rocket:"Hellbox Rockets",sniper:"Longlance Rail"};function zc(i){return{id:`add-${i}`,name:`Add ${rh[i]}`,rarity:"epic",category:"turret",deck:null,copies:1,scope:"New Turret",description:`Bolt ${rh[i]} into the owned loadout. It inherits every All Turrets upgrade immediately.`,stats:["+1 owned turret","Inherits weapon modifiers","Wheel / number-key swapping"],quote:"A new answer to an old problem.",apply:e=>{e.ownedTurrets.includes(i)||e.ownedTurrets.push(i),e.activeTurret=i}}}function Zb(i){return{id:`all-turret-mastery-${i}`,name:"All-Turret Mastery",rarity:"epic",category:"weapon",deck:null,copies:1,scope:"All Turrets",description:"Every turret slot is filled, so the whole weapon rack gets refined instead.",stats:["+25% damage","+15% projectile speed"],quote:"Three guns. One ruthless system.",apply:e=>$n(e,t=>{t.damageMultiplier*=1.25,t.projectileSpeedMultiplier*=1.15})}}function ql(i,e){const t=[...i];let n=(e||1)>>>0;for(let s=t.length-1;s>0;s--){n=n*1664525+1013904223>>>0;const r=n%(s+1);[t[s],t[r]]=[t[r],t[s]]}return t}function Jb(i){let e=i>>>0;return e^=e>>>16,e=Math.imul(e,2146121005),e^=e>>>15,e=Math.imul(e,2221713035),(e^e>>>16)>>>0}function Yl(i,e){const t=new Set(i.remainingDecks[e]);return Bc.filter(n=>n.deck===e&&t.has(n.id))}function tg(i){return Jb(Math.max(1,Math.floor(i))*104729+5370206)%3===0?2:1}function Ja(i,e={}){const t=i.round*7919+i.pickedCards.length*104729+i.ownedTurrets.length*31,n=Yl(i,"ability").filter(l=>l.abilityId!==i.activeAbility),s=e.forceAbility===!0||n.length>0&&(t>>>2)%8===0,r=["weapon","body","wheel"].filter(l=>Yl(i,l).length>0),a=i.round%3===0?"weapon":s&&n.length?"ability":ql(r,t+1613)[0],o=a==="ability"?n:a?Yl(i,a):[],c=ql(o,t+8191).slice(0,3);if(i.round%3===0){const l=Object.keys(rh).filter(h=>!i.ownedTurrets.includes(h)),u=l.length?zc(ql(l,t+43)[0]):Zb(i.round);c.length>=3?c[0]=u:c.unshift(u)}return c.slice(0,3)}function Ba(i,e){if(e.deck){const t=i.remainingDecks[e.deck],n=t.indexOf(e.id);if(n<0)return i;t.splice(n,1)}return e.apply(i),i.upgrades.push(e.id),i.pickedCards.push(e.id),i}function Hc(i){if(!i||typeof i!="object")return null;const e=i;if(!Array.isArray(e.ownedTurrets)||e.ownedTurrets.length===0||!e.ownedTurrets.every(s=>s==="mg"||s==="rocket"||s==="sniper"))return null;const t=e.activeTurret;if(t!=="mg"&&t!=="rocket"&&t!=="sniper")return null;const n=ka(t,typeof e.round=="number"?e.round:1);if(n.ownedTurrets=[...e.ownedTurrets],e.turretStats&&(n.turretStats={mg:{...Sr(),...e.turretStats.mg},rocket:{...Sr(),...e.turretStats.rocket},sniper:{...Sr(),...e.turretStats.sniper}}),e.vehicleStats&&(n.vehicleStats={...$m(),...e.vehicleStats}),n.activeAbility=e.activeAbility??"none",n.upgrades=[...e.upgrades??[]],n.pickedCards=[...e.pickedCards??e.upgrades??[]],n.repairAfterRound=e.repairAfterRound??0,n.roundShield=e.roundShield??0,n.swapCooldown=e.swapCooldown??.16,n.tireVisual=e.tireVisual??"stock",n.cameraMode=e.cameraMode??"chase",e.remainingDecks)for(const s of["weapon","body","wheel","ability"])Array.isArray(e.remainingDecks[s])&&(n.remainingDecks[s]=[...e.remainingDecks[s]]);else for(const s of n.pickedCards){const r=Bc.find(o=>o.id===s);if(!r?.deck)continue;const a=n.remainingDecks[r.deck].indexOf(s);a>=0&&n.remainingDecks[r.deck].splice(a,1)}return n}function pr(i,e){return i.remainingDecks[e].length}const Vc={none:"None",bunny_hop:"Bunny Hop",mega_boost:"Mega Boost",reflect:"Reflect",mega_shroom:"Mega Shroom"},Qb={apiKey:"AIzaSyDRniZatGeylxphjHQadYjucOcirNBRIdk",authDomain:"multiplayer-640ec.firebaseapp.com",databaseURL:"https://multiplayer-640ec-default-rtdb.firebaseio.com",projectId:"multiplayer-640ec",storageBucket:"multiplayer-640ec.firebasestorage.app",messagingSenderId:"94914236381",appId:"1:94914236381:web:55ab00cc690140180cf034"},Mp="riggedRooms",Sp="rigged_ai",wp="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",eT="https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js",tT="https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js",nT="https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";function vc(i){return i.replace(/\s+/g," ").trim().slice(0,18)||"Road warrior"}function ah(i){return i.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,5)}function iT(i=Math.random){return Array.from({length:5},()=>wp[Math.floor(i()*wp.length)]).join("")}function vs(i){return i?Object.entries(i.players??{}).map(([e,t])=>({id:e,...t})).sort((e,t)=>e.joinedAt-t.joinedAt):[]}function Kl(i,e){return i?.players?.[e]?.isAI===!0}function sT(i,e,t=Date.now()){if(i.hostId!==e||i.phase!=="lobby"||Object.keys(i.players??{}).length>=2)return;const n={...i.players,[Sp]:{name:"Gearhead AI",joinedAt:t,isAI:!0}};return{...i,players:n,playerOrder:[i.hostId,Sp],updatedAt:t}}function rT(i){if(!i)return null;const e=Hc(i.runState);return{...i,players:i.players??{},playerOrder:i.playerOrder??[],draftOptions:i.draftOptions??[],lastPick:i.lastPick??null,vehicleSelections:i.vehicleSelections??{},roundReady:i.roundReady??{},runState:e}}function bp(i,e,t,n=Date.now()){if(!(i.phase==="starter_draft"||i.phase==="upgrade_draft")||i.activePickerId!==e||!i.draftOptions.includes(t.optionId))return;const r=za(i),a=i.draftTurn+1,o=i.phase==="upgrade_draft"?r.length*tg(i.round):r.length,c=a>=o,l=c&&i.phase==="starter_draft";return{...i,phase:l?"vehicle_select":c?"playing":i.phase,round:c&&i.phase==="upgrade_draft"?i.round+1:i.round,activePickerId:l?r[0]:c?"":r[a%r.length],draftOptions:l?t.nextOptions:c?[]:t.nextOptions,draftTurn:l?0:a,pickSequence:(i.pickSequence??0)+1,lastPick:{id:(i.pickSequence??0)+1,playerId:e,optionId:t.optionId,optionName:t.optionName,pickedAt:n},roundReady:c?{}:i.roundReady??{},runState:t.nextRunState,updatedAt:n}}function Tp(i,e,t,n,s=Date.now()){if(i.phase!=="vehicle_select"||i.activePickerId!==e||!i.draftOptions.includes(t))return;const r=za(i),a=i.draftTurn+1,o=a>=r.length;return{...i,phase:o?"playing":"vehicle_select",activePickerId:o?"":r[a],draftTurn:a,draftOptions:o?[]:i.draftOptions,pickSequence:(i.pickSequence??0)+1,lastPick:{id:(i.pickSequence??0)+1,playerId:e,optionId:t,optionName:n,pickedAt:s},vehicleSelections:{...i.vehicleSelections??{},[e]:t},updatedAt:s}}function Ep(i,e,t,n,s=Date.now()){if(i.phase!=="playing")return;const r=za(i),a={...i.roundReady??{},[e]:!0},o=r.length===2&&r.every(c=>a[c]);return{...i,phase:o?"upgrade_draft":i.phase,activePickerId:o?r[0]:i.activePickerId,draftOptions:o?t:i.draftOptions,draftTurn:o?0:i.draftTurn,lastPick:o?null:i.lastPick,roundReady:a,runState:n,updatedAt:s}}async function aT(){const[i,e,t]=await Promise.all([import(eT),import(tT),import(nT)]),n=i.initializeApp(Qb);return{auth:e.getAuth(n),db:t.getDatabase(n),ref:t.ref,get:t.get,onValue:t.onValue,onDisconnect:t.onDisconnect,runTransaction:t.runTransaction,signInAnonymously:e.signInAnonymously}}class ad{playerId;room=null;sdk;unsubscribe=null;roomListener=()=>{};constructor(e,t){this.sdk=e,this.playerId=t}static async connect(){const e=await aT(),t=await e.signInAnonymously(e.auth);return new ad(e,t.user.uid)}onRoom(e){this.roomListener=e,e(this.room)}isHost(){return this.room?.hostId===this.playerId}isMyTurn(){return this.room?.activePickerId===this.playerId}async createRoom(e){for(let t=0;t<8;t+=1){const n=iT(),s=Date.now(),r={code:n,hostId:this.playerId,phase:"lobby",round:1,players:{[this.playerId]:{name:vc(e),joinedAt:s}},playerOrder:[this.playerId],activePickerId:"",draftOptions:[],draftTurn:0,pickSequence:0,lastPick:null,vehicleSelections:{},roundReady:{},runState:null,createdAt:s,updatedAt:s};if((await this.sdk.runTransaction(this.roomRef(n),o=>o?void 0:r)).committed)return await this.watchRoom(n),n}throw new Error("Could not reserve a room code. Try again.")}async joinRoom(e,t){const n=ah(e);if(n.length!==5)throw new Error("Enter the five-character room code.");const s=Date.now();if(!(await this.sdk.runTransaction(this.roomRef(n),a=>{if(!a||a.phase!=="lobby")return;const o=Object.keys(a.players??{});if(!a.players?.[this.playerId]&&o.length>=2)return;const c={...a.players??{},[this.playerId]:{name:vc(t),joinedAt:a.players?.[this.playerId]?.joinedAt??s}},l=[...(a.playerOrder??[]).filter(u=>c[u])];return l.includes(this.playerId)||l.push(this.playerId),{...a,players:c,playerOrder:l,updatedAt:s}})).committed)throw(await this.sdk.get(this.roomRef(n))).exists()?new Error("That room is already running or full."):new Error("That room does not exist.");return await this.watchRoom(n),n}async startRun(){if(!await this.transact(t=>{const n=za(t);if(!(t.hostId!==this.playerId||t.phase!=="lobby"||n.length!==2))return{...t,phase:"starter_draft",playerOrder:n,activePickerId:n[0],draftOptions:["mg","rocket","sniper"],draftTurn:0,pickSequence:0,lastPick:null,vehicleSelections:{},runState:null,updatedAt:Date.now()}}))throw new Error("The host can launch once two players are in the room.")}async addAI(){if(!await this.transact(t=>sT(t,this.playerId)))throw new Error("Only the host can add AI to an open seat.")}async submitPick(e){if(!await this.transact(n=>bp(n,this.playerId,e)))throw new Error("That pick is no longer available.")}async submitAiPick(e){if(!await this.transact(n=>n.hostId===this.playerId&&Kl(n,n.activePickerId)?bp(n,n.activePickerId,e):void 0))throw new Error("The AI pick is no longer available.")}async submitVehiclePick(e,t){if(!await this.transact(s=>Tp(s,this.playerId,e,t)))throw new Error("That vehicle pick is no longer available.")}async submitAiVehiclePick(e,t){if(!await this.transact(s=>s.hostId===this.playerId&&Kl(s,s.activePickerId)?Tp(s,s.activePickerId,e,t):void 0))throw new Error("The AI vehicle pick is no longer available.")}async markRoundComplete(e,t){if(!await this.transact(s=>{const r=Ep(s,this.playerId,e,t);if(!r||s.hostId!==this.playerId)return r;const a=za(r).find(o=>Kl(r,o));return a?Ep(r,a,e,t)??r:r}))throw new Error("The room is not accepting round results.")}roomRef(e=this.room?.code??""){return this.sdk.ref(this.sdk.db,`${Mp}/${e}`)}async transact(e){return this.room?.code?(await this.sdk.runTransaction(this.roomRef(),n=>n?e(n):void 0)).committed:!1}async watchRoom(e){this.unsubscribe?.();const t=this.sdk.ref(this.sdk.db,`${Mp}/${e}/players/${this.playerId}`);await this.sdk.onDisconnect(t).remove(),this.unsubscribe=this.sdk.onValue(this.roomRef(e),n=>{this.room=rT(n.val()??null),this.roomListener(this.room)})}}function za(i){const e=new Set(Object.keys(i.players??{})),t=[...(i.playerOrder??[]).filter(n=>e.has(n))];for(const n of vs(i))t.includes(n.id)||t.push(n.id);return t.slice(0,2)}const R=Ae("game"),k={health:Ae("health-value"),healthBar:Ae("health-bar"),boost:Ae("boost-value"),boostBar:Ae("boost-bar"),playerHealthTag:Ae("player-health-tag"),rivalHealthTag:Ae("rival-health-tag"),boostMeter:document.querySelector(".status-meter--boost"),weapon:Ae("weapon-part"),weaponState:Ae("weapon-state"),message:Ae("message"),controls:Ae("controls"),pause:Ae("pause"),debug:Ae("physics-debug"),multiplayerLobby:Ae("multiplayer-lobby"),round:Ae("round-value"),playerRounds:Ae("player-rounds"),enemyRounds:Ae("enemy-rounds"),countdown:Ae("round-countdown"),countdownValue:Ae("round-countdown-value"),countdownArena:Ae("round-countdown-arena"),rivalHealth:Ae("rival-health-value"),rivalHealthBar:Ae("rival-health-bar"),cameraMode:Ae("camera-mode-value"),starterSelect:Ae("starter-select"),starterGrid:Ae("starter-grid"),cardDraft:Ae("card-draft"),cardGrid:Ae("card-grid"),vehicleSelect:Ae("vehicle-select"),vehicleGrid:Ae("vehicle-grid"),vehicleTurn:Ae("vehicle-turn"),vehiclePickReveal:Ae("vehicle-pick-reveal"),starterTurn:Ae("starter-turn"),starterPickReveal:Ae("starter-pick-reveal"),draftPickReveal:Ae("draft-pick-reveal"),roomEntry:Ae("room-entry"),roomWaiting:Ae("room-waiting"),playerName:Ae("player-name"),roomCodeInput:Ae("room-code-input"),roomCodeDisplay:Ae("room-code-display"),roomPlayers:Ae("room-players"),roomStatus:Ae("room-status"),hostRoom:Ae("host-room"),joinRoomForm:Ae("join-room-form"),addAI:Ae("add-ai"),startRun:Ae("start-run"),musicMuted:Ae("music-muted"),activeUpgrades:Ae("active-upgrades"),weaponSelect:Ae("weapon-select"),abilityName:Ae("ability-name"),abilityState:Ae("ability-state"),abilityCooldown:Ae("ability-cooldown"),draftSummaryRound:Ae("draft-summary-round"),draftSummaryAbility:Ae("draft-summary-ability"),draftSummaryTurrets:Ae("draft-summary-turrets"),draftSummaryUpgrades:Ae("draft-summary-upgrades")},xs=new URLSearchParams(location.search),xc="rigged-roguelike-run-v1";function oT(){try{return Hc(JSON.parse(sessionStorage.getItem(xc)??"null"))}catch{return null}}function jr(){ue&&sessionStorage.setItem(xc,JSON.stringify(ue))}let ue=oT();const od=(i,e)=>Re.clamp(Number.parseInt(xs.get(i)??"0",10)||0,0,e);let os=od("pw",3),Os=od("ew",3),en=Math.max(1,od("round",99)||1),yc=!1;ue&&(ue.round=en);let lt="loading";const cT=3.55,lT=.55;let ng=0,oh=3,Ap=0,ft=null,qe=null,Rp=0,Qa=!1,tc=!1,Zn=0,wr="",nc=0,Ha=Hm.vehicle.defaultId;function eo(){k.round.textContent=String(en).padStart(2,"0"),k.playerRounds.querySelectorAll("i").forEach((i,e)=>i.classList.toggle("won",e<os)),k.enemyRounds.querySelectorAll("i").forEach((i,e)=>i.classList.toggle("won",e<Os)),R.dataset.currentRound=String(en),R.dataset.playerRoundWins=String(os),R.dataset.enemyRoundWins=String(Os)}function uT(){Qg("player")}function hT(){Qg("opponent")}const ig=1,Mn=new Xw({canvas:R,antialias:!0,powerPreference:"high-performance"});Mn.setPixelRatio(Math.min(devicePixelRatio,ig));Mn.setSize(innerWidth,innerHeight,!1);Mn.shadowMap.enabled=!0;Mn.shadowMap.type=Ah;Mn.outputColorSpace=At;Mn.toneMapping=$p;Mn.toneMappingExposure=1.08;const Te=new V_;Te.background=new ye(8227218);Te.fog=new zh(7567998,.0068);const sg=new jh,Gc=sg.load("./assets/cloudy-sky.png");Gc.mapping=dc;Gc.colorSpace=At;Te.background=Gc;Te.backgroundIntensity=.72;Te.environment=Gc;Te.environmentIntensity=.58;function cd(i,e=1,t=e){const n=sg.load(i);return n.wrapS=n.wrapT=us,n.repeat.set(e,t),n.colorSpace=At,n.anisotropy=Math.min(8,Mn.capabilities.getMaxAnisotropy()),n}const ns=cd("./assets/materials/dirty-arena-ground-v1.png"),Mc=cd("./assets/materials/weathered-arena-metal-v1.png"),Gs=cd("./assets/materials/gritty-turret-metal-v1.png",2.4,2.4);function jl(i,e=7.5){const t=i.getAttribute("position"),n=new Float32Array(t.count*2);for(let s=0;s<t.count;s++)n[s*2]=t.getX(s)/e,n[s*2+1]=t.getZ(s)/e;i.setAttribute("uv",new Yt(n,2))}const dT=new qw,Cp=new Map,Pp=new Map;function fT(i){const e=Cp.get(i);if(e)return e;const t=new Promise((n,s)=>{dT.load(i,({scene:r})=>{r.updateMatrixWorld(!0);const a=new Ln().setFromObject(r),o=a.getCenter(new E);r.position.set(-o.x,-a.min.y,-o.z),r.traverse(l=>{if(!(l instanceof j))return;l.castShadow=!1,l.receiveShadow=!0;const u=Array.isArray(l.material)?l.material:[l.material];for(const h of u)h instanceof Kt&&(h.roughness=Math.max(h.roughness,.66),h.metalness=Math.min(h.metalness,.35))});const c=new ot;c.add(r),n(c)},void 0,s)});return Cp.set(i,t),t}async function pT(i){const t=(await fT(i)).clone(!0),n=Number(R.dataset.assetsLoaded??0)+1;return R.dataset.assetsLoaded=String(n),t}function Wc(i,e){R.dataset.assetErrors=String(Number(R.dataset.assetErrors??0)+1),console.error(`[Rigged] Failed to load licensed asset: ${i}`,e)}function mT(i){const e=Pp.get(i);if(e)return e;const t=Fa[i],n=new Promise((s,r)=>{new Ab().load(t.mtl,a=>{a.preload();const o=new Nb;o.setMaterials(a),o.load(t.obj,c=>{c.updateMatrixWorld(!0);const l=new Ln().setFromObject(c),u=l.getCenter(new E);c.position.set(-u.x,-l.min.y,-u.z),c.traverse(d=>{if(!(d instanceof j))return;d.castShadow=!1,d.receiveShadow=!0;const f=Array.isArray(d.material)?d.material:[d.material];for(const m of f)m instanceof Kh&&(m.shininess=Math.min(m.shininess,8),m.specular.setHex(1380877))});const h=new ot;h.name=`racekart-hilly-${i}`,h.userData.sourceSize=l.getSize(new E),h.add(c),s(h)},void 0,r)},void 0,r)});return Pp.set(i,n),n}async function ld(i){const e=await mT(i);return R.dataset.assetsLoaded=String(Number(R.dataset.assetsLoaded??0)+1),e.clone(!0)}const mn=new fn(58,innerWidth/innerHeight,.1,520);mn.position.set(0,7,-11);const ni=new Wb(mn);ni.setMode(ue?.cameraMode??"chase");const gT=new Xv(12372951,3944487,1.35);Te.add(gT);const qn=new Lm(16771792,3.25);qn.position.set(-28,42,-18);qn.castShadow=!0;qn.shadow.mapSize.set(1024,1024);qn.shadow.camera.left=-125;qn.shadow.camera.right=125;qn.shadow.camera.top=125;qn.shadow.camera.bottom=-125;qn.shadow.camera.near=2;qn.shadow.camera.far=180;qn.shadow.bias=-35e-5;qn.shadow.normalBias=.035;Te.add(qn);const Xc=new ot;Xc.name="cloud-break-volumetric-light";const _T=new Oi({transparent:!0,depthWrite:!1,side:Xt,blending:Lr,vertexShader:"varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:"varying vec2 vUv; void main(){float edge=pow(max(0.0,1.0-abs(vUv.x-.5)*2.0),1.8);float fade=smoothstep(0.0,.2,vUv.y)*(1.0-smoothstep(.7,1.0,vUv.y));gl_FragColor=vec4(1.0,.91,.76,edge*fade*.042);}"});for(const[i,e,t,n]of[[-48,-34,18,.08],[-12,8,13,-.05],[28,-10,17,.06],[54,34,12,-.08],[-62,48,10,.04]]){const s=new ot;s.position.set(i,37,e),s.rotation.z=n;for(const r of[0,Math.PI/3,Math.PI*2/3]){const a=new j(new Xr(t*1.7,78),_T);a.rotation.y=r,a.renderOrder=-1,s.add(a)}Xc.add(s)}Te.add(Xc);let Ri=23063;const ic=new Float32Array(760*3);for(let i=0;i<760;i++){Ri=Ri*1664525+1013904223>>>0;const e=Ri/4294967295;Ri=Ri*1664525+1013904223>>>0;const t=Ri/4294967295;Ri=Ri*1664525+1013904223>>>0;const n=Ri/4294967295;ic[i*3]=(e-.5)*236,ic[i*3+1]=.6+t*22,ic[i*3+2]=(n-.5)*236}const rg=new bt;rg.setAttribute("position",new Yt(ic,3));const ud=new xa(rg,new Us({color:14862756,size:.13,transparent:!0,opacity:.22,depthWrite:!1,blending:Lr}));ud.name="volumetric-dust-motes";Te.add(ud);const br=new Kt({color:12081725,map:Gs,bumpMap:Gs,bumpScale:.025,roughness:.74,metalness:.48}),ei=new Kt({color:12631733,map:Gs,bumpMap:Gs,bumpScale:.035,roughness:.48,metalness:.84}),an=new Kt({color:7633010,map:Gs,bumpMap:Gs,bumpScale:.04,roughness:.59,metalness:.82}),ch=new Kt({color:11449006,map:Mc,bumpMap:Mc,bumpScale:.055,roughness:.48,metalness:.74,side:Xt}),vT=new Kt({color:16777215,map:ns,bumpMap:ns,bumpScale:.07,roughness:.96,metalness:0,vertexColors:!0}),ag=new Kt({color:1052945,roughness:.9,metalness:.08});let J=Oc[Vm],Cn=J.radius,tn=!1,$l=!1;const zn=1.12,kn=.95,xT=.72,zt=1/60,yT=.1,Lp=5,Ip=1.15,Vr=[],Ws=[],$r=[],Bi=[],Gn=[],cs=[];let Qi=!1;const Zr=new j(new Hi(.3,10,7),new Qe({color:5439472,depthTest:!1}));Zr.name="vehicle-surface-contact";Zr.renderOrder=30;Zr.visible=!1;Te.add(Zr);Gn.push(Zr);const Xs=new E,lh=new Za(new E(0,1,0),Xs,3.2,7536488,.55,.28),uh=new Za(new E(0,1,0),Xs,3.8,5505009,.6,.3),hh=new Za(new E(0,0,1),Xs,4.5,16768099,.65,.32),sc=new Za(new E(0,0,1),Xs,3,16749375,.6,.3),rc=new Za(new E(1,0,0),Xs,3.5,16731726,.6,.3),ci=new E(0,1,0);for(const i of[lh,uh,hh,sc,rc])i.visible=!1,i.renderOrder=31,Te.add(i),Gn.push(i);const pa=new Set,og=new Set;function wt(i,e){return J.arenaKind==="capsule"&&J.bowl?qt(J.bowl,i,e).height:Math.sin(i*.055)*Math.cos(e*.05)*.035}function MT(i,e){if(J.arenaKind!=="capsule"||!J.bowl)return null;const t=qt(J.bowl,i,e);return t.progress<=.001?null:{ramp:{kind:"wall",label:`${t.band} capsule collider band`,rotation:Math.atan2(t.outwardX,t.outwardZ),length:J.bowl.outerRadius-J.bowl.flatRadius,rise:J.bowl.wallRise},height:t.height,localZ:t.progress}}function cg(i,e){const t=e.contact??{kind:e.kind,label:e.label,rotation:e.rotation,length:e.length,rise:0},n=Fb(i,{label:e.label,centerX:e.x,centerZ:e.z,rotation:e.rotation,width:e.width,length:e.length,metadata:t});let s=Number.POSITIVE_INFINITY,r=Number.NEGATIVE_INFINITY,a=0;for(let c=0;c<n.heights.length;c++)n.valid[c]&&(s=Math.min(s,n.heights[c]),r=Math.max(r,n.heights[c]),a++);t.rise=a?r-s:0,cs.push(n),Bi.push(i);const o=kb(n,e.kind==="bridge"?5505009:e.kind==="ramp"?16760405:7536488);return Te.add(o),Gn.push(o),n}async function Va(i){try{const e=await ld(i.asset),t=i.scale??10,n=e.userData.sourceSize,s=Fa[i.asset],r=s.category==="track"&&n?-n.y*t+.08:0;e.name=`racekart-hilly-${i.asset}${i.label?`-${i.label}`:""}`,e.scale.setScalar(t),e.position.set(i.x,wt(i.x,i.z)+(i.y??r),i.z),e.rotation.y=i.rotation??0,Te.add(e),(s.category==="terrain"||s.category==="track")&&n&&cg(e,{label:i.label??i.asset,x:i.x,z:i.z,rotation:i.rotation??0,width:n.x*t,length:n.z*t,kind:s.category})}catch(e){Wc(Fa[i.asset].obj,e)}}function Sc(i,e,t,n=!1){const s=new j(new ki(4.2,5.2,24),new Qe({color:n?11094834:14195270,side:Xt,transparent:!0,opacity:.68}));s.rotateX(-Math.PI/2),s.rotation.z=t,s.position.set(i,wt(i,e)+.11,e),s.name=n?"opponent-spawn-placeholder":"player-spawn",Te.add(s)}async function lg(){if(J.arenaKind==="capsule"){await ST();return}const i=Cn*2+18,e=new Xr(i,i,112,112);e.rotateX(-Math.PI/2);const t=e.attributes.position;for(let m=0;m<t.count;m++)t.setY(m,wt(t.getX(m),t.getZ(m)));jl(e);const n=new Float32Array(t.count*3),s=new ye(12758417),r=new ye(15783083),a=new ye;for(let m=0;m<t.count;m++){const _=t.getX(m),g=t.getZ(m),p=Re.clamp(.46+Math.sin(_*.19+g*.13)*.1+Math.cos(_*.07-g*.11)*.06,0,1);a.copy(s).lerp(r,p),a.toArray(n,m*3)}e.setAttribute("color",new Yt(n,3)),t.needsUpdate=!0,e.computeVertexNormals();const o=new j(e,vT);o.receiveShadow=!0,o.name="arena-ground-aim-surface",Te.add(o),Bi.push(o);const c=new Kt({color:7827818,map:ns,bumpMap:ns,bumpScale:.035,roughness:.9,metalness:.04,side:Xt}),l=new ki(J.ringInnerRadius,J.ringOuterRadius,128);l.rotateX(-Math.PI/2),jl(l);const u=new j(l,c);u.position.y=.055,u.receiveShadow=!0,u.name="continuous-circular-ring-track",Te.add(u);const h=new Or(J.ringInnerRadius-2.5,96);h.rotateX(-Math.PI/2),jl(h);const d=new j(h,new Kt({color:13677453,map:ns,bumpMap:ns,bumpScale:.07,roughness:.97,metalness:0,side:Xt}));d.position.y=.04,d.receiveShadow=!0,d.name="central-combat-bowl",Te.add(d);for(const[m,_,g]of[[J.ringInnerRadius,12151346,.65],[J.ringOuterRadius,9343886,.85]]){const p=new j(new ki(m-g,m+g,128),new Qe({color:_,side:Xt}));p.rotateX(-Math.PI/2),p.position.y=.075,p.name=m===J.ringInnerRadius?"rust-inner-track-edge":"concrete-outer-track-edge",Te.add(p)}const f=(J.ringInnerRadius+J.ringOuterRadius)*.5;for(let m=0;m<32;m++){const _=m/32*Math.PI*2,g=new j(new st(.32,.035,4.8),new Qe({color:13150836}));g.position.set(Math.sin(_)*f,.095,Math.cos(_)*f),g.rotation.y=_,g.name="ring-lane-marker",Te.add(g)}await Promise.all([...J.terrain.map(Va),...J.track.map(Va),...J.surfaces.map(ug)]);for(const m of J.barriers)dh(m.x,m.z,m.rotation,m.length,m.boundary);for(let m=0;m<36;m++){const _=m/36*Math.PI*2;dh(Math.sin(_)*(Cn-2),Math.cos(_)*(Cn-2),_,Math.PI*(Cn-2)/18+.6,!0)}Sc(J.spawn.x,J.spawn.z,J.spawn.heading),Sc(J.opponentSpawn.x,J.opponentSpawn.z,J.opponentSpawn.heading,!0)}async function ST(){if(!J.bowl)throw new Error("Capsule Circuit layout is missing its surface configuration");const i=J.bowl,e=new Kt({color:16777215,map:ns,bumpMap:ns,bumpScale:.07,vertexColors:!0,roughness:.96,metalness:0,side:Xt}),t=new j(Hb(i),e);t.name="capsule-flat-floor-collider",t.receiveShadow=!0,Te.add(t),Bi.push(t);const n=new Kt({color:13751247,map:Mc,bumpMap:Mc,bumpScale:.05,vertexColors:!0,roughness:.52,metalness:.64,side:Xt}),s=new j(Vb(i),n);s.name="capsule-continuous-layered-wall-ride-surface",s.receiveShadow=!0,Te.add(s),Bi.push(s);const r=new j(Gb(i),ch);r.name="capsule-solid-upper-guard-collider",r.castShadow=!1,r.receiveShadow=!0,Te.add(r);const a=new j(t.geometry,new Qe({color:7536488,wireframe:!0,transparent:!0,opacity:.34,depthTest:!1}));a.name="capsule-flat-floor-collider-debug",a.visible=!1,a.renderOrder=21,Te.add(a),Gn.push(a);const o=new j(s.geometry,new Qe({color:5636066,wireframe:!0,transparent:!0,opacity:.56,depthTest:!1}));o.name="capsule-transition-and-bank-collider-debug",o.visible=!1,o.renderOrder=22,Te.add(o),Gn.push(o);const c=new j(r.geometry,new Qe({color:16738882,wireframe:!0,transparent:!0,opacity:.72,depthTest:!1}));c.name="capsule-upper-guard-collider-debug",c.visible=!1,c.renderOrder=23,Te.add(c),Gn.push(c);const l=new j(new ki(7.2,7.7,48),new Qe({color:10770997,side:Xt,transparent:!0,opacity:.8}));l.rotateX(-Math.PI/2),l.position.y=.08,l.name="capsule-center-mark",Te.add(l);for(let u=-5;u<=5;u++){if(u===0)continue;const h=new j(new st(.28,.035,4.6),new Qe({color:12163689}));h.position.set(0,.09,u*7.3),h.name="capsule-centerline-marker",Te.add(h)}await Promise.all([...J.terrain.map(Va),...J.track.map(Va),...J.surfaces.map(ug)]);for(const u of J.barriers)dh(u.x,u.z,u.rotation,u.length,u.boundary);Sc(J.spawn.x,J.spawn.z,J.spawn.heading),Sc(J.opponentSpawn.x,J.opponentSpawn.z,J.opponentSpawn.heading,!0),R.dataset.capsuleCollision="three-disc-analytic-bands",R.dataset.bowlShape="capsule",R.dataset.bankedWallColliders="3",R.dataset.transitionCollider="continuous",R.dataset.upperGuardCollider="continuous",R.dataset.wallRideSurface="continuous"}async function ug(i){const{x:e,z:t,rotation:n=0,width:s,length:r}=i,a=e-Math.sin(n)*r*.5,o=t-Math.cos(n)*r*.5,c=e+Math.sin(n)*r*.5,l=t+Math.cos(n)*r*.5,u=wt(a,o)+i.startHeight,h=wt(c,l)+i.endHeight,d=h-u,f=Math.atan2(d,r),m=new ot,_=new Qe({color:i.kind==="bridge"?5625797:16753995,wireframe:!0,transparent:!0,opacity:0}),g=new j(new st(s,.32,r),_);g.rotation.x=-f,g.position.y=(u+h)*.5,g.name=`${i.kind}-collider-surface`,g.castShadow=!1,g.receiveShadow=!0,m.add(g),m.position.set(e,0,t),m.rotation.y=n,Te.add(m);const p={group:m,deck:g,position:new E(e,u,t),rotation:n,width:s,length:r,baseHeight:u,rise:d,kind:i.kind,label:i.label??i.asset};if(Vr.push(p),Bi.push(g),i.kind==="bridge")for(const y of[-s*.47,s*.47]){const S=e+Math.cos(n)*y,v=t-Math.sin(n)*y;$r.push({position:new E(S,0,v),halfWidth:r*.5,halfLength:.35,rotation:n+Math.PI/2,label:"bridge rail"})}try{const y=await ld(i.asset),S=y.userData.sourceSize??new E(2,1,1),v=Math.max(.7,i.kind==="bridge"?Math.max(i.startHeight,i.endHeight):Math.abs(i.endHeight-i.startHeight));y.name=`racekart-hilly-driveable-${i.label??i.asset}`,y.scale.set(r/S.x,v/S.y,s/S.z),y.position.y=Math.min(wt(a,o),wt(c,l)),y.rotation.y=i.assetYaw??0,m.add(y),m.updateWorldMatrix(!0,!0),cg(y,{label:p.label,x:e,z:t,rotation:n,width:s*(i.kind==="bridge"?.72:.94),length:r*.995,kind:i.kind,contact:p})}catch(y){Wc(Fa[i.asset].obj,y)}}function dh(i,e,t,n,s=!1){const r=ch.clone();r.color.setHex(s?9080715:9401959);const a=new j(new st(n,1.35,.8),r);a.position.set(i,wt(i,e)+.68,e),a.rotation.y=t,a.castShadow=!1,a.receiveShadow=!0,a.material.transparent=!0,a.material.opacity=.12,a.material.depthWrite=!1,Te.add(a),ld("fence").then(c=>{const l=c.userData.sourceSize??new E(1,.4,.05);c.name=s?"racekart-hilly-arena-fence":"racekart-hilly-scrap-fence",c.scale.set(n/l.x,(s?2.6:1.8)/l.y,.8/l.z),c.position.set(i,wt(i,e),e),c.rotation.y=t,c.traverse(u=>{u instanceof j&&(u.castShadow=!1,u.receiveShadow=!0,u.material=ch)}),Te.add(c)}).catch(c=>Wc(Fa.fence.obj,c)),$r.push({position:new E(i,0,e),halfWidth:n*.5,halfLength:.4,rotation:t,label:s?"arena wall":"scrap barrier"});const o=new cx(a,16757575);o.visible=!1,Te.add(o),Gn.push(o)}async function hg(){const i=J.props.map(e=>{const t=e.scale??10;return(e.asset==="rockWide"||e.asset==="rockTall")&&Ws.push({position:new E(e.x,0,e.z),radius:t*.48,top:wt(e.x,e.z)+t,label:"racekart rock"}),e.asset==="hayBale"&&Ws.push({position:new E(e.x,0,e.z),radius:t*.3,top:wt(e.x,e.z)+t*.55,label:"hay obstacle"}),Va(e)});await Promise.all(i)}function wT(i,e){for(const t of Vr){const n=i-t.position.x,s=e-t.position.z,r=n*Math.cos(t.rotation)-s*Math.sin(t.rotation),a=n*Math.sin(t.rotation)+s*Math.cos(t.rotation),o=-t.length*.5;if(Math.abs(r)<=t.width*.5&&a>=o-Ip&&a<=t.length*.5){const c=Re.clamp((a-o)/t.length,0,1),l=t.baseHeight+c*t.rise+.25;if(a<o){const u=Re.smoothstep(a,o-Ip,o);return{ramp:t,height:Re.lerp(wt(i,e),l,u),localZ:a}}return{ramp:t,height:l,localZ:a}}}return null}function wc(i,e){const t=wt(i,e);let n=null;for(const s of cs){const r=Ob(s,i,e);r===null||r<t-.12||(!n||r>n.height)&&(n={ramp:s.metadata,height:r,localZ:0})}return n??wT(i,e)??MT(i,e)}function di(i,e){return wc(i,e)?.height??wt(i,e)}function dg(){let i=0,e=0;for(const t of cs){let n=0,s=0;const r=Math.cos(t.rotation),a=Math.sin(t.rotation);for(let o=0;o<t.rows;o++){const c=-t.length*.5+o/(t.rows-1)*t.length;for(let l=0;l<t.columns;l++){const u=o*t.columns+l;if(!t.valid[u])continue;n++;const h=-t.width*.5+l/(t.columns-1)*t.width,d=t.center.x+h*r+c*a,f=t.center.y-h*a+c*r;s=Math.max(s,t.heights[u]-wt(d,f))}}n>0&&i++,s>.35&&e++}R.dataset.heightfieldCoverage=i===cs.length?"passed":"failed",R.dataset.heightfieldCoverageCount=`${i}/${cs.length}`,R.dataset.raisedSurfaceColliders=String(e)}function bT(i,e){const t=x.position.x+Math.sin(x.heading)*e,n=x.position.z+Math.cos(x.heading)*e,s=t-i.position.x,r=n-i.position.z,a=Math.cos(i.rotation),o=Math.sin(i.rotation),c=s*a-r*o,l=s*o+r*a,u=Re.clamp(c,-i.halfWidth,i.halfWidth),h=Re.clamp(l,-i.halfLength,i.halfLength);let d=c-u,f=l-h;const m=Math.hypot(d,f);if(m>=zn)return!1;let _;if(m<.001){const y=i.halfWidth+zn-Math.abs(c),S=i.halfLength+zn-Math.abs(l);y<S?(d=Math.sign(c||1),f=0,_=y+.02):(d=0,f=Math.sign(l||1),_=S+.02)}else d/=m,f/=m,_=zn-m+.02;const g=d*a+f*o,p=-d*o+f*a;return x.position.x+=g*_,x.position.z+=p*_,!0}function TT(i,e){const t=x.position.x+Math.sin(x.heading)*e,n=x.position.z+Math.cos(x.heading)*e,s=t-i.position.x,r=n-i.position.z,a=Math.hypot(s,r),o=i.radius+zn;if(a>=o)return!1;const c=a>.001?s/a:Math.sin(x.heading),l=a>.001?r/a:Math.cos(x.heading),u=o-a+.02;return x.position.x+=c*u,x.position.z+=l*u,!0}function fg(){const i=new Qe({color:16747834,wireframe:!0,transparent:!0,opacity:.65});for(const e of Ws){const t=wt(e.position.x,e.position.z),n=Math.max(.12,e.top-t),s=new j(new Ot(e.radius,e.radius,n,18),i);s.position.set(e.position.x,t+n*.5,e.position.z),s.visible=!1,Te.add(s),Gn.push(s)}}function pg(){if(J.arenaKind==="capsule"&&J.bowl){const n=J.bowl,s=[[0,0],[-20,-24],[20,-24],[-20,24],[20,24],[0,-38],[0,38]],r=s.every(([c,l])=>qt(n,c,l).progress===0),o=[[n.flatRadius+7,0],[-(n.flatRadius+7),0],[0,n.straightHalfLength+n.flatRadius+7],[0,-(n.straightHalfLength+n.flatRadius+7)]].every(([c,l])=>{const u=qt(n,c,l);return u.progress>.25&&u.progress<.75&&u.height>2});R.dataset.ringSampleCount=String(s.length),R.dataset.ringClearSamples=String(s.length),R.dataset.ringTrackDrivable=o?"passed":"failed",R.dataset.centralCombatArea=r?"passed":"failed",R.dataset.targetArea=J.targets.length>=3&&J.targets.length<=5?"passed":"failed",R.dataset.futureSpawnSides=J.spawn.z*J.opponentSpawn.z<0?"passed":"failed",R.dataset.ovalBoundary="enclosed",R.dataset.wallSeam=qt(n,n.flatRadius+.05,0).height<.01?"smooth":"failed";return}const i=(J.ringInnerRadius+J.ringOuterRadius)*.5,e=72;let t=0;for(let n=0;n<e;n++){const s=n/e*Math.PI*2,r=Math.sin(s)*i,a=Math.cos(s)*i,o=Ws.some(l=>Math.hypot(r-l.position.x,a-l.position.z)<l.radius+2.2),c=$r.some(l=>{if(l.label==="arena wall")return!1;const u=r-l.position.x,h=a-l.position.z,d=Math.cos(l.rotation),f=Math.sin(l.rotation),m=u*d-h*f,_=u*f+h*d;return Math.abs(m)<l.halfWidth+2.2&&Math.abs(_)<l.halfLength+2.2});!o&&!c&&Math.abs(wt(r,a))<.1&&t++}R.dataset.ringSampleCount=String(e),R.dataset.ringClearSamples=String(t),R.dataset.ringTrackDrivable=t===e?"passed":"failed",R.dataset.centralCombatArea=J.ringInnerRadius>=50?"passed":"failed",R.dataset.targetArea=J.targets.length>=3?"passed":"failed",R.dataset.futureSpawnSides=J.spawn.z*J.opponentSpawn.z<0?"passed":"failed"}const Nt=new ot,Dt=new ot,Tr=[],bc=[],Er=new ot,hs=new j(new Hi(2.65,24,16),new Qe({color:12153087,transparent:!0,opacity:.18,wireframe:!0,depthWrite:!1}));hs.name="reflect-ability-shield";hs.position.y=1.4;hs.visible=!1;const ds=new j(new Hi(2.25,18,12),new Qe({color:16761679,transparent:!0,opacity:.12,wireframe:!0,depthWrite:!1}));ds.name="mega-shroom-aura";ds.position.y=1.25;ds.visible=!1;const fs={mg:{kind:"mg",label:"SCRAP RATTLER",stateLabel:"READY",fireRate:6.7,damage:15,projectileSpeed:58,range:136,automatic:!0,impactColor:16758088},rocket:{kind:"rocket",label:"HELLBOX ROCKETS",stateLabel:"ARMED",fireRate:.78,damage:82,projectileSpeed:34,range:112,automatic:!1,impactColor:16735008,splashRadius:5.4},sniper:{kind:"sniper",label:"LONGLANCE RAIL",stateLabel:"CHARGED",fireRate:.58,damage:110,projectileSpeed:320,range:188,automatic:!1,impactColor:6809599}},mg=new Map;let Et=ue?.activeTurret??"mg",fh=new ot,gg=new yt,ma,Dp=-1/0,_g=null,Np=null,Zl=0,ph=null,mh=null;function Jl(i,e=.4){for(const t of[-1,1]){const n=new j(new Ot(.09,.13,.68,8),ei);n.position.set(t*e,.12,.02),n.rotation.z=t*.42,n.castShadow=!0,i.add(n)}}function ET(i){const e=new ot;e.name=`turret-${i}`;const t=new ot;let n=new yt;if(i==="mg"){const s=new j(new Wr(.48,0),an);s.scale.set(1,.7,1.28),s.position.set(0,.28,.1),s.castShadow=!0,e.add(s);const r=new j(new st(.82,.42,.5),ei);r.position.set(0,.18,-.52),r.rotation.x=.08,r.castShadow=!0,e.add(r),Jl(e);const a=new j(new st(1.24,.72,.12),br);a.position.set(0,.24,.43),a.rotation.x=-.12,a.castShadow=!0,e.add(a),t.position.set(0,.34,.35),e.add(t);const o=new j(new Ot(.17,.2,.72,10),an);o.rotation.x=Math.PI/2,o.position.z=.34,o.castShadow=!0,t.add(o);const c=new j(new Ot(.075,.095,1.82,10),ei);c.rotation.x=Math.PI/2,c.position.z=1.53,c.castShadow=!0,t.add(c);const l=new j(new Ot(.15,.15,.34,10),an);l.rotation.x=Math.PI/2,l.position.z=2.45,l.castShadow=!0,t.add(l);const u=new j(new ki(.055,.13,10),new Qe({color:16747317}));u.position.z=2.63,t.add(u),n.position.z=2.66,t.add(n)}else if(i==="rocket"){const s=new j(new st(1.34,.58,1.18),an);s.position.set(0,.28,-.05),s.rotation.x=-.05,s.castShadow=!0,e.add(s);const r=new j(new st(1.58,.72,.12),br);r.position.set(0,.28,.54),r.rotation.x=-.13,r.castShadow=!0,e.add(r),Jl(e,.5),t.position.set(0,.48,.18),e.add(t);const a=new j(new st(1.28,.9,1.72),an);a.position.z=.62,a.castShadow=!0,t.add(a);for(const c of[-.34,.34])for(const l of[-.23,.23]){const u=new j(new Ot(.19,.23,1.92,10),an);u.rotation.x=Math.PI/2,u.position.set(c,l,.72),u.castShadow=!0,t.add(u);const h=new j(new Dc(.205,.045,7,12),br);h.position.set(c,l,1.69),t.add(h);const d=new j(new Or(.14,10),new Qe({color:16738852}));d.position.set(c,l,1.7),t.add(d)}const o=new j(new st(.86,.08,.04),new Qe({color:16758077}));o.position.set(0,.48,1.5),t.add(o),n.position.z=1.86,t.add(n)}else{const s=new j(new st(1.12,.52,1.48),an);s.position.set(0,.29,.15),s.castShadow=!0,e.add(s);const r=new j(new st(.82,.46,.72),ei);r.position.set(0,.25,-.75),r.castShadow=!0,e.add(r),Jl(e,.43),t.position.set(0,.43,.36),e.add(t);for(const u of[-.25,.25]){const h=new j(new st(.12,.12,3.18),ei);h.position.set(u,0,1.52),h.castShadow=!0,t.add(h)}const a=new j(new Ot(.085,.12,3.5,10),an);a.rotation.x=Math.PI/2,a.position.z=1.72,a.castShadow=!0,t.add(a);const o=new j(new st(.68,.34,.48),an);o.position.z=3.45,o.castShadow=!0,t.add(o);for(const u of[-.27,.27]){const h=new j(new st(.13,.13,.62),new Qe({color:5824504}));h.position.set(u,0,3.47),t.add(h)}const c=new j(new st(.32,.26,.7),ei);c.position.set(0,.39,.45),t.add(c);const l=new j(new Or(.12,12),new Qe({color:9171967}));l.position.set(0,.39,.81),t.add(l),n.position.z=3.76,t.add(n)}return e.visible=i===Et,{root:e,barrelPivot:t,muzzle:n}}function ps(i,e=!0){if(ue&&!ue.ownedTurrets.includes(i)){e&&Pt("TURRET SLOT LOCKED // EARN IT AFTER ROUND 3");return}const t=performance.now()/1e3;if(e&&ue&&t-Dp<ue.swapCooldown)return;Dp=t,Et=i,ue&&(ue.activeTurret=i,jr());const n=fs[i];Sg(),Ga=0,cn(!1);for(const[s,r]of mg)r.root.visible=s===i,s===i&&(fh=r.barrelPivot,gg=r.muzzle);k.weapon.textContent=n.label,k.weaponState.textContent=n.stateLabel,Sd(),R.dataset.selectedTurret=i,R.dataset.weaponVfx=i==="rocket"?"large-world-detonation":i==="sniper"?"tight-cyan-laser-tracer":"scrap-sparks",e&&tn&&Pt(`${n.label} // MOUNT ACTIVE`)}function vg(i){return!!(i&&i in _i)}function xg(i){const e=_i[i].turretHeight;ph&&(ph.position.y=e-.16),mh&&(mh.position.y=e-.04),Er.position.y=e}async function yg(i){const e=_i[i],t=++Zl;R.dataset.vehicleAsset=`loading-kenney-${i}`,xg(i);try{const n=await pT(e.model);if(t!==Zl)return;n.name=`kenney-car-kit-${i}`,n.scale.setScalar(1.84),n.position.y=.06;const s=new ye(14200973);n.traverse(r=>{if(!(r instanceof j))return;r.castShadow=!0;const o=(Array.isArray(r.material)?r.material:[r.material]).map(c=>{const l=c.clone();return l instanceof Kt&&(l.color.multiply(s),l.roughness=.78,l.metalness=.2,l.envMapIntensity=.55),l});r.material=Array.isArray(r.material)?o:o[0]}),Np?.removeFromParent(),_g?.removeFromParent(),Tr.length=0,bc.length=0;for(const r of Hm.vehicle.wheelNodes){const a=n.getObjectByName(r);a&&(Tr.push(a),r.includes("front")&&bc.push(a))}Nt.add(n),Np=n,Ha=i,R.dataset.vehicleAsset=`kenney-car-kit-${i}`,R.dataset.vehicleWheels=String(Tr.length),R.dataset.selectedVehicle=i,wg()}catch(n){if(t!==Zl)return;R.dataset.vehicleAsset="fallback-low-poly",Wc(e.model,n)}}function AT(){const i=new ot;i.name="vehicle-fallback";const e=new j(new st(2.7,.65,4.55),br);e.position.y=1.05,e.castShadow=e.receiveShadow=!0,i.add(e);const t=new j(new Wr(1.18,0),an);t.scale.set(1,.66,1.05),t.position.set(0,1.72,-.32),t.castShadow=!0,i.add(t);for(const r of[-1.45,1.45])for(const a of[-1.45,1.45]){const o=new ot;o.position.set(r,.72,a),i.add(o);const c=new j(new Ot(.57,.57,.42,14),ag);c.rotation.z=Math.PI/2,c.castShadow=!0,o.add(c),Tr.push(c),a>0&&bc.push(o);const l=new j(new Ot(.22,.22,.45,10),ei);l.rotation.z=Math.PI/2,c.add(l)}Nt.add(i),_g=i,yg(Ha),Nt.add(hs,ds);const n=new j(new Ot(.62,.76,.22,12),ei);ph=n,n.castShadow=!0,Nt.add(n);const s=new j(new Dc(.62,.08,8,16),an);mh=s,s.rotation.x=Math.PI/2,s.castShadow=!0,Nt.add(s),Nt.add(Er),xg(Ha);for(const r of["mg","rocket","sniper"]){const a=ET(r);mg.set(r,a),Er.add(a.root)}ps(Et,!1),ma=new j(new st(zn*2,xT,(kn+zn)*2),new Qe({color:5046256,wireframe:!0,transparent:!0,opacity:.8})),ma.position.y=.52,ma.visible=!1,Nt.add(ma),Nt.position.set(0,wt(0,-28),-28),Te.add(Nt)}function RT(){Dt.name="rival-ai-combat-car";const i=new Kt({color:6501275,map:Gs,roughness:.68,metalness:.5}),e=new j(new st(2.75,.72,4.45),i);e.position.y=1.02,e.castShadow=!0,Dt.add(e);const t=new j(new Wr(1.15,0),an.clone());t.scale.set(1,.66,1.05),t.position.set(0,1.68,-.28),t.castShadow=!0,Dt.add(t);for(const l of[-1.43,1.43])for(const u of[-1.42,1.42]){const h=new j(new Ot(.56,.56,.42,14),ag);h.rotation.z=Math.PI/2,h.position.set(l,.7,u),h.castShadow=!0,Dt.add(h)}const n=new j(new Ot(.58,.72,.24,12),i);n.position.y=2.32,Dt.add(n);const s=new ot;s.name="rival-longlance-tracking-turret",s.position.y=2.5,Dt.add(s);const r=new j(new st(1.12,.52,1.48),an);r.position.set(0,.25,.12),r.castShadow=!0,s.add(r);for(const l of[-.25,.25]){const u=new j(new st(.12,.12,3.18),ei);u.position.set(l,.27,1.58),u.castShadow=!0,s.add(u)}const a=new j(new Ot(.085,.12,3.5,10),an);a.rotation.x=Math.PI/2,a.position.set(0,.27,1.78),a.castShadow=!0,s.add(a);const o=new j(new st(.68,.34,.48),an);o.position.set(0,.27,3.52),s.add(o);const c=new j(new Hi(.12,10,7),new Qe({color:6809599}));c.position.set(0,.52,.68),s.add(c),Dt.userData.turret=s,R.dataset.aiTurret="sniper",Te.add(Dt),Bi.push(Dt)}const Mg={maxHealth:150,acceleration:16.5,maxSpeed:27,handling:1.62,traction:7.4,boostPower:1.3,armor:0,ramPower:1,stability:1,weaponDamage:15,fireRate:6.7,projectileSpeed:58},et={...Mg},vn={fireRate:et.fireRate,damage:et.weaponDamage,projectileSpeed:et.projectileSpeed,range:136,automatic:!1};function Sg(){const i=fs[Et],e=ue?.turretStats[Et];vn.fireRate=i.fireRate*(e?.fireRateMultiplier??1),vn.damage=i.damage*(e?.damageMultiplier??1),vn.projectileSpeed=i.projectileSpeed*(e?.projectileSpeedMultiplier??1),vn.range=i.range*(e?.rangeMultiplier??1),vn.automatic=i.automatic,R.dataset.weaponDamage=vn.damage.toFixed(2),R.dataset.weaponFireRate=vn.fireRate.toFixed(2),R.dataset.weaponProjectileCount=String(e?.projectileCount??1)}function wg(){const i=ue?.tireVisual??"stock",e=i==="racing"?1123122:i==="offroad"?2696216:i==="drift"?2437434:i==="grip"?1055e3:i==="turbo"?1517112:i==="heavy"?526602:i==="wall"?1455163:i==="light"?3291194:1052945,t=i==="racing"?new E(.92,1,.9):i==="offroad"?new E(1.16,1.12,1.16):i==="drift"?new E(1.04,.94,1.04):i==="turbo"?new E(.9,.92,.9):i==="heavy"?new E(1.13,1.28,1.13):i==="wall"?new E(1.1,1.08,1.1):i==="light"?new E(.88,.88,.88):new E(1,1,1);Tr.forEach(n=>{n.scale.copy(t),n.traverse(s=>{if(!(s instanceof j))return;const r=Array.isArray(s.material)?s.material:[s.material];for(const a of r)a instanceof Kt&&a.color.r<.35&&a.color.g<.35&&a.color.b<.35&&a.color.setHex(e)})}),R.dataset.tireVisual=i}function ac(){Object.assign(et,Mg);const i=ue?.vehicleStats;i&&(et.maxHealth*=i.maxHealthMultiplier,et.acceleration*=i.accelerationMultiplier,et.maxSpeed*=i.maxSpeedMultiplier,et.handling*=i.handlingMultiplier,et.traction*=i.tractionMultiplier,et.boostPower=(et.boostPower??1.3)*i.boostMultiplier,et.armor=Math.min(.72,(et.armor??0)+i.armorBonus),et.ramPower=i.ramMultiplier,et.stability=i.stabilityMultiplier);const e=i?.sizeMultiplier??1;Nt.scale.setScalar(e*(on==="mega_shroom"?2:1)),Sg(),wg(),R.dataset.vehicleUpgradeStats=`hp:${et.maxHealth.toFixed(0)},accel:${et.acceleration.toFixed(1)},speed:${et.maxSpeed.toFixed(1)},handling:${et.handling.toFixed(2)},traction:${et.traction.toFixed(2)}`}const x={position:new E(0,0,-28),heading:0,speed:0,driftAngle:0,verticalVelocity:0,pitch:0,roll:0,grounded:!0,activeRamp:null,health:150,shield:0,boost:100,collisionCooldown:0,orientation:new Xn,surfaceNormal:new E(0,1,0),projectedForward:new E(0,0,1),velocity:new E,wallContactNormal:new E,wallAssistActive:!1,downforce:0},$={position:new E,heading:Math.PI,speed:0,health:210,maxHealth:210,fireCooldown:1.4,steerBias:1,collisionCooldown:0,burnTime:0,burnDps:0,burnFxCooldown:0,maneuverTimer:0,preferredDistance:24,speedMultiplier:1,weavePhase:0,weaveRate:1.5},qs=[];function bg(i,e,t){const n=new ot,s=new j(new Ot(.75,.9,.35,10),an);s.position.y=.18,s.castShadow=!0,n.add(s);const r=new j(new st(.3,1.8,.3),ei);r.position.y=1.2,r.castShadow=!0,n.add(r);const a=new j(new Ot(.62,.78,1.35,8),new Kt({color:9518119,roughness:.7,metalness:.45,emissive:0}));a.position.y=1.55,a.castShadow=!0,a.name="target-body",n.add(a);const o=new j(new Hi(.13,10,8),new Qe({color:16757830}));o.position.set(0,1.72,.65),n.add(o);for(const c of[-1,1]){const l=new j(new st(.8,.16,.16),ei);l.position.set(c*.78,1.7,0),l.rotation.z=c*.25,n.add(l)}n.position.set(i,wt(i,e),e),n.rotation.y=t,Te.add(n),qs.push({group:n,health:55,alive:!0,hitFlash:0})}const Fi=[],pi=[],zi=[];let Tg=1;const CT=new Qe({color:12683865,transparent:!0,opacity:.35,depthWrite:!1}),Eg=new st(.09,.09,.72),PT=new Hi(.3,6,4),LT=new Wr(.14,0),hd=new ki(.48,.68,28),dd=new qh(.55,1),Ag=new Hi(.18,7,5),IT=new st(.13,3.25,.04),DT=new st(.025,.86,.025),NT=new Ot(.2,.2,1,8,1,!0),UT=new Ot(.055,.055,1,8),FT=new Ot(.018,.018,1,6),OT=new Or(.15,7),Fs=new Zh(16747044,0,5,2);Te.add(Fs);let Ga=0,Rg=!1,oc=0,cc=0,Up=0,Ar=0,Rr=0,gh=0,fi=!1,ms=0,An=0,Hn=0,on="none",Wa=0,lc=0;const ls=new URLSearchParams(location.search).get("physics-smoke")==="ramp",Cr=new URLSearchParams(location.search).get("physics-smoke")==="all-surfaces",Sa=new URLSearchParams(location.search).get("physics-smoke")==="wall",wa=new URLSearchParams(location.search).get("input-smoke")==="hold-fire",Tc=new URLSearchParams(location.search).get("input-smoke")==="boost",fd=new URLSearchParams(location.search).get("combat-smoke")==="round-win",pd=xs.get("ui-preview")==="vehicles",qc=xs.get("ui-preview")==="deck",to=xs.get("ui-preview")==="cards",kT=xs.get("wildcard")!=="0",Ql=qc&&xs.get("team")==="rival",xn=new Audio("./assets/nitro-games.wav");xn.loop=!0;xn.volume=.09;xn.preload="auto";xn.id="soundtrack";xn.hidden=!0;xn.dataset.playback="waiting-for-interaction";const Ht=new Audio("./assets/audio/sfx/vehicle-engine-loop.wav");Ht.loop=!0;Ht.volume=.001;Ht.playbackRate=.68;Ht.preservesPitch=!1;Ht.preload="auto";Ht.id="vehicle-engine-loop";Ht.hidden=!0;Ht.dataset.playback="waiting-for-interaction";document.body.append(xn,Ht);const Cg="rigged-music-muted";function Pg(i){xn.muted=i,k.musicMuted.checked=i,localStorage.setItem(Cg,i?"1":"0"),R.dataset.musicMuted=String(i)}Pg(localStorage.getItem(Cg)==="1");k.musicMuted.addEventListener("change",()=>Pg(k.musicMuted.checked));const BT={"turret-mg":"./assets/audio/sfx/turret-mg-fire.wav","turret-rocket":"./assets/audio/sfx/turret-rocket-fire.ogg","turret-sniper":"./assets/audio/sfx/turret-sniper-fire.ogg","vehicle-hit":"./assets/audio/sfx/vehicle-hit-clank.ogg","confirmed-hit":"./assets/audio/sfx/confirmed-hit-clank.ogg"},Lg=new Map,eu=new Set,Ig=new Map,Dg=new Map;let li=null,_h=null,Fp=!1;const zT=xs.get("audio-smoke")==="fail";for(const[i,e]of Object.entries(BT)){const t=new Audio(e);t.preload="auto",t.load(),Lg.set(i,t),Dg.set(i,fetch(e).then(n=>n.arrayBuffer()))}xn.load();Ht.load();const tu=new E,Op=new E;function ks(i,e,t=.035,n){const s=Ig.get(i);if(li&&s){const o=li.createBufferSource(),c=li.createGain(),l=li.createStereoPanner();o.buffer=s,o.playbackRate.value=1+(Math.random()*2-1)*t;const u=n??x.position;tu.copy(u).sub(mn.position);const h=tu.length();Op.set(1,0,0).applyQuaternion(mn.quaternion);const d=h>.001?tu.dot(Op)/h:0,f=1/(1+Math.max(0,h-7)/28);c.gain.value=Re.clamp(e*f,0,1),l.pan.value=Re.clamp(d,-1,1),o.connect(c).connect(l).connect(li.destination),o.onended=()=>{o.disconnect(),c.disconnect(),l.disconnect()},o.start(),R.dataset.lastSfx=i,R.dataset.spatialAudio="stereo-world-positioned";return}const r=Lg.get(i);if(!r)return;const a=r.cloneNode(!0);a.volume=Re.clamp(e,0,1),a.preservesPitch=!1,a.playbackRate=1+(Math.random()*2-1)*t,eu.add(a),a.addEventListener("ended",()=>eu.delete(a),{once:!0}),a.play().catch(()=>eu.delete(a)),R.dataset.lastSfx=i}function no(){li||(li=new AudioContext,_h=Promise.all([...Dg].map(([i,e])=>e.then(t=>li.decodeAudioData(t.slice(0))).then(t=>Ig.set(i,t)).catch(()=>{}))).then(()=>{R.dataset.combatAudio="decoded"})),li.state==="suspended"&&li.resume(),xn.paused&&(xn.dataset.playback="starting",xn.play().then(()=>{xn.dataset.playback="playing"}).catch(()=>{xn.dataset.playback="blocked"})),Ht.paused&&(Ht.dataset.playback="starting",Ht.play().then(()=>{Ht.dataset.playback="playing"}).catch(()=>{Ht.dataset.playback="blocked"})),R.dataset.musicContinuity="single-document-loop"}let uc=0;function HT(i){const e=Re.clamp(Math.abs(x.speed)/Math.max(1,et.maxSpeed),0,1.25),t=rt.has("KeyW")||rt.has("KeyS"),n=rt.has("ShiftLeft")&&x.boost>0,r=tn&&!fi&&x.health>0?.055+e*.16+(t?.025:0):0,a=.68+e*.82+(n?.12:0);uc=Re.damp(uc,r,6,i),Ht.volume=Re.clamp(uc,0,.26),Ht.playbackRate=Re.damp(Ht.playbackRate,a,7,i),R.dataset.engineVolume=Ht.volume.toFixed(3),R.dataset.enginePlaybackRate=Ht.playbackRate.toFixed(2)}function VT(i){if(!Fp)try{if(HT(i),zT)throw new Error("Simulated audio-frame failure");R.dataset.audioFrame="active"}catch(e){Fp=!0,R.dataset.audioFrame="disabled",console.warn("[Rigged] Audio frame updates disabled; gameplay will continue.",e)}}const rt=new Set,vh=new he(0,.15),rn=new E,nu=new Im,kp=new Ji(new E(0,1,0),0),Ng=new E(0,0,1);let Yc=!1;const Bs=new ot,Ug=new Qe({color:16762972,transparent:!0,opacity:.92,depthTest:!1}),Fg=new j(new ki(.65,.82,24),Ug);Fg.rotation.x=-Math.PI/2;Bs.add(Fg);for(const i of[0,Math.PI/2]){const e=new j(new st(2.25,.025,.08),Ug);e.rotation.y=i,e.position.y=.015,Bs.add(e)}Bs.renderOrder=10;Te.add(Bs);const Ci=new E,Vo=new E,md=new E(0,0,1);function GT(i=10,e=1.35,t=.34){const n=new wm;for(let s=0;s<i*2;s++){const r=s/(i*2)*Math.PI*2-Math.PI/2,a=s%2===0?e:t,o=Math.cos(r)*a,c=Math.sin(r)*a;s===0?n.moveTo(o,c):n.lineTo(o,c)}return n.closePath(),new Yh(n)}const Og=GT(),xh=new E,kg=new E(0,1,0),Ec=[],Bg=()=>new Qe({transparent:!0,depthWrite:!1,side:Xt,blending:Lr});function Vt(i,e=1){const t=Ec.pop()??Bg();return t.color.setHex(i),t.opacity=e,t.visible=!0,t.userData.baseOpacity=e,t}function zg(i){i instanceof Qe&&i.transparent&&i.blending===Lr?(i.opacity=0,Ec.push(i)):i.dispose()}function Jr(i){const e=[],t=[];i.group.traverse(n=>{n instanceof j?e.push(n):n instanceof Zh&&t.push(n)}),zi.push({...i,meshes:e,lights:t})}function gd(i){const e=zi[i];Te.remove(e.group);for(const t of e.meshes){const n=Array.isArray(t.material)?t.material:[t.material];for(const s of n)zg(s)}zi.splice(i,1)}function Xa(i,e,t=!0){const n=fs[i],s=new ot;s.position.copy(e),s.userData.billboard=!0;const r=i==="rocket",a=t&&r?1.8:t?1:.28,o=new j(dd,Vt(r?16758063:16766575,.95));o.scale.setScalar(a),s.add(o);const c=new j(Og,Vt(n.impactColor,i==="mg"?.72:.96));c.scale.setScalar(t?1.24:.26),s.add(c),t&&r&&c.scale.setScalar(2.15);const l=t&&r?5:1;for(let h=0;h<l;h++){const d=new j(hd,Vt(h===0?16777215:n.impactColor,.9-h*.18));d.scale.setScalar((t?1.1:.2)+h*.46),d.position.z=-.03-h*.015,s.add(d)}if(t&&r){for(let d=0;d<20;d++){const f=new j(IT,Vt(d%3?n.impactColor:16777215,.88)),m=d/20*Math.PI*2;f.rotation.z=m,f.position.set(Math.cos(m)*2.1,Math.sin(m)*2.1,-.06),s.add(f)}Ar=.38,Rr=.62,R.dataset.lastImpactEffect="rocket-world-detonation"}const u=t&&r?.82:t?.3:.13;Te.add(s),Jr({group:s,life:u,maxLife:u,kind:"impact",growth:t&&r?7.2:t?2.2:1.3})}function WT(i){const e=new ot;e.position.copy(i),e.userData.billboard=!0;const t=new j(dd,Vt(16777215,.96));t.scale.setScalar(.22),e.add(t);for(let n=0;n<8;n++){const s=n/8*Math.PI*2,r=new j(DT,Vt(n%2?6153727:16777215,.9));r.rotation.z=s,r.position.set(Math.cos(s)*.38,Math.sin(s)*.38,0),e.add(r)}Te.add(e),Jr({group:e,life:.16,maxLife:.16,kind:"impact",growth:.5}),Ar=.055,Rr=.08,R.dataset.lastImpactEffect="sniper-pinpoint-spark"}function Hg(i,e,t){const n=Math.min(t,Math.max(18,i.distanceTo(rn)+8)),s=new ot;xh.copy(i).addScaledVector(e,n*.5),s.position.copy(xh),s.quaternion.setFromUnitVectors(kg,e);const r=new j(NT,Vt(3657727,.34));r.scale.y=n,s.add(r);const a=new j(UT,Vt(15334911,1));a.scale.y=n,s.add(a);const o=new j(FT,Vt(16777215,1));o.scale.y=n,s.add(o),Te.add(s),Jr({group:s,life:.48,maxLife:.48,kind:"laser",growth:0}),R.dataset.sniperTracerLength=n.toFixed(1)}function XT(i,e){const t=new ot;t.position.copy(i).add(new E((Math.random()-.5)*.12,(Math.random()-.5)*.12,(Math.random()-.5)*.12));const n=new j(Ag,Vt(Math.random()>.45?16742947:16767066,.72));t.add(n),Te.add(t),Jr({group:t,life:.28,maxLife:.28,kind:"trail",growth:2.2,sourceId:e})}function Vg(i){for(let e=zi.length-1;e>=0;e--){const t=zi[e];t.kind!=="trail"||t.sourceId!==i||gd(e)}R.dataset.rocketTrailCleanup="detonation-synced"}const hc={standard:new Qe({color:16764762}),incendiary:new Qe({color:16730904}),piercing:new Qe({color:15334399})},qT=new st(.06,.06,9),YT=new st(.24,.24,8.2),Bp={standard:new Qe({color:16777215}),incendiary:new Qe({color:16747061})},iu={standard:Vt(5627135,.58),incendiary:Vt(16726804,.58),piercing:Vt(13236479,.58)},KT=new Ot(.12,.15,.78,9),jT=new Kt({color:3421747,roughness:.55,metalness:.7}),$T=new ja(.15,.34,9),ZT=new st(.38,.04,.32),JT=new ja(.18,.85,9),zp={standard:Vt(16747304,.92),incendiary:Vt(16723984,.92)},ba=[];function QT(i,e){const t=ba.pop()??new j(Eg,i);return t.material=i,t.scale.setScalar(e),t.visible=!0,t}function _d(i,e){i.removeFromParent(),e==="mg"&&i instanceof j&&(i.visible=!1,i.position.set(0,0,0),i.quaternion.identity(),ba.push(i))}function vd(i,e=!1,t=!1,n=!1){if(i==="mg"){const c=e?hc.incendiary:t?hc.piercing:hc.standard;return QT(c,n?1.75:t?1.25:1)}if(i==="sniper"){const c=new ot,l=new j(qT,e?Bp.incendiary:Bp.standard);c.add(l);const u=e?iu.incendiary:t?iu.piercing:iu.standard,h=new j(YT,u);return c.add(h),c.scale.setScalar(n?1.55:1),c}const s=new ot,r=new j(KT,jT);r.rotation.x=Math.PI/2,s.add(r);const a=new j($T,br);a.rotation.x=Math.PI/2,a.position.z=.55,s.add(a);for(const c of[-1,1]){const l=new j(ZT,br);l.position.set(c*.14,0,-.28),l.rotation.z=c*.42,s.add(l)}const o=new j(JT,e?zp.incendiary:zp.standard);return o.rotation.x=-Math.PI/2,o.position.z=-.78,s.add(o),s}let Go=null;function eE(){return Go||(Go=(async()=>{const i=new ot;for(i.name="offscreen-combat-resource-warmup",i.position.set(0,-500,0);ba.length<32;)ba.push(new j(Eg,hc.standard));for(;Ec.length<48;)Ec.push(Bg());const e=[["mg",!1,!1,!1],["mg",!0,!1,!1],["mg",!1,!0,!0],["rocket",!1,!1,!1],["rocket",!0,!1,!0],["sniper",!1,!1,!1],["sniper",!0,!0,!0]],t=[];e.forEach(([s,r,a,o],c)=>{const l=vd(s,r,a,o);l.position.x=c*2,i.add(l),t.push(l)});const n=[Vt(16758063,.95),Vt(16735008,.92),Vt(6809599,.9),Vt(16730904,.8)];i.add(new j(dd,n[0]),new j(Og,n[1]),new j(hd,n[2]),new j(Ag,n[3])),Te.add(i);try{await Mn.compileAsync(Te,mn),_h&&await _h,R.dataset.combatPrewarm="complete"}catch(s){R.dataset.combatPrewarm="partial",console.warn("[Rigged] Combat pre-warm completed with a fallback.",s)}finally{Te.remove(i),t.forEach((s,r)=>_d(s,e[r][0])),n.forEach(zg),R.dataset.projectilePool=String(ba.length)}})(),Go)}function xd(i){const e=new ot;e.position.copy(i).add(new E((Math.random()-.5)*1.4,.7+Math.random()*1.2,(Math.random()-.5)*1.4)),e.userData.billboard=!0;const t=new j(OT,Vt(Math.random()>.35?16730396:16760133,.9));t.scale.setScalar(.73+Math.random()*.6),e.add(t),Te.add(e),Jr({group:e,life:.45,maxLife:.45,kind:"trail",growth:1.7}),R.dataset.burnVfx="ember-active"}function mr(i,e=1){const t=new ot;t.position.copy(x.position),t.position.y=di(x.position.x,x.position.z)+.12;const n=Vt(i,.72),s=new j(hd,n);s.rotation.x=-Math.PI/2,s.scale.setScalar(e),t.add(s),Te.add(t),Jr({group:t,life:.55,maxLife:.55,kind:"impact",growth:3.8})}function Kc(){on==="mega_shroom"&&(x.health=Math.max(1,x.health-Wa),Wa=0,ds.visible=!1,Nt.scale.setScalar(ue?.vehicleStats.sizeMultiplier??1),mr(16757567,1.25)),on==="reflect"&&(hs.visible=!1),on="none",Hn=0}function tE(){if(!ue||lt!=="active"||x.health<=0)return;const i=ue.activeAbility;if(i==="none"){Pt("Q SLOT // NO ABILITY EQUIPPED");return}if(An>0){Pt(`${Vc[i].toUpperCase()} // ${An.toFixed(1)}S`);return}Kc(),on=i,lc=0,i==="bunny_hop"?(An=7,Hn=.58,x.activeRamp=null,x.grounded=!1,x.verticalVelocity=Math.max(x.verticalVelocity,8.2),x.position.y+=.24,mr(15845258,.75),Pt("BUNNY HOP // AIRBORNE")):i==="mega_boost"?(An=10,Hn=1.5,x.speed=Math.max(x.speed,et.maxSpeed*.62),mr(16739106,.95),Pt("MEGA BOOST // FULL BURN")):i==="reflect"?(An=14,Hn=2,hs.visible=!0,mr(12153087,1.1),Pt("REFLECT // SHIELD LIVE")):(An=18,Hn=5,Wa=et.maxHealth,x.health+=Wa,Nt.scale.setScalar((ue.vehicleStats.sizeMultiplier??1)*2),ds.visible=!0,mr(16761679,1.4),Pt("MEGA SHROOM // MAXIMUM RIG")),R.dataset.abilityActivated=i,Gg()}function nE(i){if(An=Math.max(0,An-i),on!=="none"){if(Hn=Math.max(0,Hn-i),lc-=i,on==="reflect"){hs.rotation.y+=i*2.8;const e=hs.material;e.opacity=.14+Math.sin(ms*15)*.055}else if(on==="mega_shroom"){ds.rotation.y-=i*1.7;const e=ds.material;e.opacity=.1+Math.sin(ms*8)*.035}else if(on==="mega_boost"&&lc<=0){lc=.1;const e=new E(-Math.sin(x.heading)*2.2,.45,-Math.cos(x.heading)*2.2).add(x.position);xd(e),R.dataset.megaBoostVfx="exhaust-trail"}Hn<=0&&Kc()}}function Gg(){const i=ue?.activeAbility??"none";k.abilityName.textContent=Vc[i].toUpperCase();const e=i==="bunny_hop"?7:i==="mega_boost"?10:i==="reflect"?14:i==="mega_shroom"?18:1,t=i!=="none"&&An<=0;k.abilityState.textContent=i==="none"?"NO ABILITY":t?"READY":`${An.toFixed(1)}s`,k.abilityCooldown.style.setProperty("--ability-ready",String(i==="none"?0:1-An/e)),k.abilityCooldown.parentElement?.classList.toggle("ready",t),R.dataset.activeAbility=i,R.dataset.abilityCooldown=An.toFixed(2),R.dataset.abilityEffect=on}function Wg(){if(fi||lt!=="active"||x.health<=0||!Yc||Ga>0||Fi.length>=120)return!1;const i=fs[Et],e=ue?.turretStats[Et];Ga=1/vn.fireRate,gg.getWorldPosition(Ci),Vo.copy(rn).sub(Ci).normalize(),Ng.copy(Vo),Up++;const t=e?.projectileCount??1,n=e?.spread??0,s=Up%4===0?e?.splitChambers??0:0,r=Array.from({length:t},(a,o)=>(t===1?0:o/(t-1)-.5)*n+(Math.random()-.5)*n*.12);for(let a=0;a<s;a++)r.push(-(.16+a*.07),.16+a*.07);for(const a of r){const o=Vo.clone().applyAxisAngle(kg,a).normalize(),c=vd(Et,(e?.burnDps??0)>0,(e?.pierces??0)>0,e?.heavyRounds??!1);c.position.copy(Ci),c.quaternion.setFromUnitVectors(md,o),Te.add(c),Fi.push({id:Tg++,mesh:c,velocity:o.multiplyScalar(vn.projectileSpeed),life:vn.range/vn.projectileSpeed,kind:Et,owner:"player",damage:vn.damage*(on==="mega_shroom"?2:1),splashRadius:i.splashRadius??0,trailTimer:0,ricochetsRemaining:e?.ricochets??0,piercesRemaining:e?.pierces??0,burnDps:e?.burnDps??0,burnDuration:e?.burnDuration??0,hitOpponent:!1,hitTargets:new Set})}return R.dataset.shotsFired=String(Number(R.dataset.shotsFired??0)+r.length),R.dataset.splitChamber=s>0?"fired":"idle",k.weaponState.textContent="FIRING",cc=.08,Fs.color.setHex(i.impactColor),Fs.intensity=Et==="rocket"?22:Et==="sniper"?28:8,Fs.distance=Et==="rocket"?10:7,Fs.position.copy(Ci),oc=Et==="mg"?.045:.09,Et==="mg"?ks("turret-mg",.1,.025,Ci):Et==="rocket"?ks("turret-rocket",.44,.025,Ci):ks("turret-sniper",.38,.018,Ci),Et==="sniper"?Hg(Ci,Vo,vn.range):Xa(Et,Ci,!1),!0}const Cs=new E,Wo=new E;function iE(){if(lt!=="active"||$.health<=0||x.health<=0)return;const i=fs.sniper;Cs.copy($.position),Cs.y+=2.72;const e=Math.min(.45,Cs.distanceTo(x.position)/i.projectileSpeed);Wo.copy(x.position).addScaledVector(x.velocity,e).add(xh.set((Math.random()-.5)*.34,1.05+(Math.random()-.5)*.18,(Math.random()-.5)*.34)).sub(Cs).normalize();const t=vd("sniper");t.position.copy(Cs),t.quaternion.setFromUnitVectors(md,Wo),Te.add(t),Fi.push({id:Tg++,mesh:t,velocity:Wo.clone().multiplyScalar(i.projectileSpeed),life:i.range/i.projectileSpeed,kind:"sniper",owner:"opponent",damage:i.damage,splashRadius:0,trailTimer:0,ricochetsRemaining:0,piercesRemaining:0,burnDps:0,burnDuration:0,hitOpponent:!1,hitTargets:new Set}),ks("turret-sniper",.3,.025,Cs),Hg(Cs,Wo,i.range),R.dataset.aiShotsFired=String(Number(R.dataset.aiShotsFired??0)+1)}function cn(i){Rg=i,R.dataset.fireHeld=String(i),i&&Wg()}function Xg(i){Ga=Math.max(0,Ga-i),cc=Math.max(0,cc-i),oc=Math.max(0,oc-i),cc===0&&k.weaponState.textContent==="FIRING"&&(k.weaponState.textContent=fs[Et].stateLabel),oc===0&&(Fs.intensity=0),Rg&&Wg()}const qg=48;function sE(i){if(pi.length>=qg||Math.abs(x.speed)<3||Math.random()>i*Math.min(Math.abs(x.speed),20)*1.15)return;const e=new E(-Math.sin(x.heading)*2,0,-Math.cos(x.heading)*2),t=new j(PT,CT.clone());t.scale.setScalar(.6+Math.random()*.7),t.position.copy(x.position).add(e).add(new E((Math.random()-.5)*1.8,.25,(Math.random()-.5)*.8)),Te.add(t),pi.push({mesh:t,life:.7+Math.random()*.5,velocity:new E((Math.random()-.5)*.5,.45+Math.random()*.3,(Math.random()-.5)*.5)})}function yd(i,e=1.4,t=12){for(let n=0;n<Math.min(t,qg-pi.length);n++){const s=new j(LT,new Qe({color:n%3===0?16761678:12077609}));s.scale.setScalar(.6+Math.random()),s.position.copy(i).add(new E(0,e,0)),Te.add(s),pi.push({mesh:s,life:.7+Math.random()*.8,velocity:new E((Math.random()-.5)*7,2+Math.random()*5,(Math.random()-.5)*7)})}}function yh(i,e){if(i.alive&&(i.health-=e,i.hitFlash=.09,rE(),i.health<=0)){i.alive=!1,yd(i.group.position),Te.remove(i.group);const t=qs.filter(n=>n.alive).length;R.dataset.targetsRemaining=String(t),Pt(t?`TARGET SCRAPPED // ${t} REMAIN`:"TARGET LANE CLEARED // FIND THE RIVAL")}}let Hp=-1/0;function rE(){const i=performance.now();i-Hp<70||(Hp=i,ks("confirmed-hit",.23,.02))}function Pt(i){k.message.textContent=i,k.message.classList.add("show"),clearTimeout(gh),gh=window.setTimeout(()=>k.message.classList.remove("show"),1900)}const Md={mg:"SCRAP RATTLER",rocket:"HELLBOX",sniper:"LONGLANCE"};function Sd(){document.querySelectorAll("[data-weapon]").forEach(t=>{const n=t.dataset.weapon,s=!!ue?.ownedTurrets.includes(n),r=s&&Et===n;t.classList.toggle("owned",s),t.classList.toggle("selected",r),t.disabled=!s,t.setAttribute("aria-pressed",String(r));const a=t.querySelector("small");a&&(a.textContent=r?"ACTIVE":s?"OWNED":`LOCKED // ROUND ${Math.max(3,Math.ceil(en/3)*3)}`)});const i=new Map(Bc.map(t=>[t.id,t.name])),e=(ue?.upgrades??[]).map(t=>i.get(t)??(t.startsWith("add-")?`Added ${Md[t.slice(4)]??"Turret"}`:t.startsWith("mastery-")?"Turret Mastery":t));k.activeUpgrades.replaceChildren(...(e.length?e.slice(-7):["No cards installed"]).map(t=>{const n=document.createElement("li");return n.textContent=t,n})),R.dataset.ownedTurrets=ue?.ownedTurrets.join(",")??"none",R.dataset.activeUpgrades=ue?.upgrades.join(",")??"none"}const wd=560,Ac=350,Vp=1100;function bd(i,e){i.dataset.cardTeam=e?"player":"rival",R.dataset.cardTeam=e?"player-orange":"rival-purple"}function Td(){ue&&(jb(k.cardDraft,{weapon:pr(ue,"weapon"),body:pr(ue,"body"),wheel:pr(ue,"wheel")}),k.draftSummaryRound.textContent=String(ue.round).padStart(2,"0"),k.draftSummaryAbility.textContent=ue.activeAbility==="none"?"NONE":Vc[ue.activeAbility].toUpperCase(),k.draftSummaryTurrets.textContent=String(ue.ownedTurrets.length),k.draftSummaryUpgrades.textContent=String(ue.pickedCards.length),R.dataset.abilityDeckRemaining=String(pr(ue,"ability")))}function jc(){if(!qe||qe.phase!=="starter_draft")return;lt="starter_turret_select",k.starterSelect.hidden=!1,k.vehicleSelect.hidden=!0,k.cardDraft.hidden=!0,k.countdown.hidden=!0,k.weaponSelect.classList.add("draft-open"),R.dataset.roundPhase=lt,R.dataset.starterSelection="visible",Sd();const i=vs(qe).find(t=>t.id===qe?.activePickerId),e=qc?qe.activePickerId==="preview-player":ft?.isMyTurn()??!1;bd(k.starterSelect,e),k.starterTurn.textContent=e?"YOUR PICK // Choose the next roof turret.":`${i?.name??"The other driver"} is choosing. Watch their pick resolve.`,k.starterPickReveal.hidden=!0,document.querySelectorAll(".starter-card").forEach(t=>{const n=t.querySelector("[data-starter-turret]"),s=n.dataset.starterTurret,r=qe?.draftOptions.includes(s)??!1;t.hidden=!r,t.dataset.optionId=s,t.classList.remove("is-picked","is-dealing","is-shuffling-in"),t.classList.toggle("is-watching",!e),n.disabled=!e,n.textContent=e?`MOUNT ${s==="mg"?"RATTLER":s==="rocket"?"HELLBOX":"LONGLANCE"}`:"RIVAL IS CHOOSING"}),sd(k.starterGrid,R)}async function aE(i){if(!ft?.isMyTurn()||!qe?.draftOptions.includes(i))return;const e=qe.runState?structuredClone(qe.runState):ka(i,en);qe.runState&&Ba(e,zc(i)),rd(k.starterGrid,i,R);const t=qe.draftTurn===0?["mg","rocket","sniper"]:Object.keys(_i);try{await ft.submitPick({optionId:i,optionName:Md[i],nextRunState:e,nextOptions:t})}catch(n){ui(n),jc()}}function $c(){if(!qe||qe.phase!=="vehicle_select")return;lt="starter_turret_select",k.starterSelect.hidden=!0,k.cardDraft.hidden=!0,k.vehicleSelect.hidden=!1,k.countdown.hidden=!0,k.weaponSelect.classList.add("draft-open");const i=vs(qe),e=i.find(s=>s.id===qe?.activePickerId),t=pd||(ft?.isMyTurn()??!1);bd(k.vehicleSelect,t),k.vehicleTurn.textContent=t?"YOUR PICK // Choose the car you will drive.":`${e?.name??"The other driver"} is choosing their car.`,k.vehiclePickReveal.hidden=!0;const n=Object.entries(_i).map(([s,r])=>{const a=s,o=document.createElement("button");o.type="button",o.className="vehicle-card",o.dataset.vehicle=a,o.dataset.optionId=a,o.disabled=!t||!qe?.draftOptions.includes(a),o.classList.toggle("is-watching",!t);const c=document.createElement("img");c.src=r.preview,c.alt="";const l=document.createElement("span"),u=document.createElement("b"),h=document.createElement("small"),d=document.createElement("em");u.textContent=r.label.toUpperCase(),h.textContent=r.callout;const f=i.filter(m=>qe?.vehicleSelections?.[m.id]===a).map(m=>m.name);return d.textContent=f.length?`${f.join(" + ")} PICKED THIS`:t?"":"RIVAL IS CHOOSING",l.append(u,h),d.textContent&&l.append(d),o.append(c,l),o.addEventListener("click",()=>{oE(a)}),o});k.vehicleGrid.replaceChildren(...n),R.dataset.roundPhase="vehicle_select",R.dataset.vehicleSelection="visible",sd(k.vehicleGrid,R)}async function oE(i){if(!(!ft?.isMyTurn()||qe?.phase!=="vehicle_select")){rd(k.vehicleGrid,i,R);try{await ft.submitVehiclePick(i,_i[i].label)}catch(e){ui(e),$c()}}}function cE(i){const e=document.createElement("article");e.className="upgrade-card",e.dataset.category=i.category,e.dataset.rarity=i.rarity,e.dataset.optionId=i.id;const t={weapon:"⚙",body:"◆",wheel:"◉",ability:"Q",turret:"+"};e.dataset.cardMark=t[i.category]??"R",e.classList.toggle("is-wildcard",i.category==="ability");const n=document.createElement("div"),s=document.createElement("i"),r=document.createElement("b"),a=document.createElement("small");n.className="card-back",n.setAttribute("aria-hidden","true"),r.textContent=i.category==="ability"?"WILDCARD":i.category==="turret"?"WEAPON":i.category.toUpperCase(),a.textContent=i.category==="ability"?"RARE Q ABILITY":i.category==="weapon"||i.category==="turret"?"ALL TURRETS":i.category==="body"?"VEHICLE FRAME":"HANDLING & GRIP",n.append(s,r,a);const o=document.createElement("div");o.className="upgrade-card__meta";const c=document.createElement("span");c.textContent=`${t[i.category]} ${i.category==="ability"?"RARE Q ABILITY":i.category.toUpperCase()+" DECK"}`;const l=document.createElement("span");l.textContent=i.scope.toUpperCase(),o.append(c,l);const u=document.createElement("h2");u.textContent=i.name.toUpperCase();const h=document.createElement("p");h.textContent=i.description;const d=document.createElement("ul");d.className="upgrade-card__stats";for(const _ of i.stats){const g=document.createElement("li");g.textContent=_,d.append(g)}let f=null;i.category==="ability"&&(f=document.createElement("p"),f.className="upgrade-card__replacement",f.textContent=ue?.activeAbility&&ue.activeAbility!=="none"?`REPLACES: ${Vc[ue.activeAbility].toUpperCase()}`:"NO CURRENT ABILITY");const m=document.createElement("button");return m.type="button",m.textContent=i.category==="turret"?"ADD TO LOADOUT":i.category==="ability"?"EQUIP Q ABILITY":"CHOOSE CARD",m.disabled=!to&&!(ft?.isMyTurn()??!1),m.addEventListener("click",()=>{lE(i)}),e.classList.toggle("is-watching",m.disabled),e.append(n,o,u,h,d),f&&e.append(f),e.append(m),e}function Yg(i){return i.draftTurn+1<vs(i).length*tg(i.round)}function Zc(){if(!ue||!qe||qe.phase!=="upgrade_draft")return;const i=Kg(qe.draftOptions,ue),e=en%3===0,t=to||(ft?.isMyTurn()??!1);bd(k.cardDraft,t),lt="card_select",k.countdown.hidden=!0,k.starterSelect.hidden=!0,k.vehicleSelect.hidden=!0,k.cardDraft.hidden=!1,k.weaponSelect.classList.add("draft-open"),k.draftPickReveal.hidden=!0,k.cardGrid.replaceChildren(...i.map(cE)),Td(),R.dataset.roundPhase=lt,R.dataset.cardDraft="visible",R.dataset.turretReward=e?"offered":"not-due",R.dataset.wildcardOffered=String(i.some(n=>n.category==="ability")),sd(k.cardGrid,R)}async function lE(i){if(!ue||lt!=="card_select"||!qe?.draftOptions.includes(i.id)||jm(k.cardGrid))return;if(to){const n=structuredClone(ue),s=i.deck?pr(n,i.deck):0;Ba(n,i),ue=n,k.cardGrid.querySelectorAll("button").forEach(r=>r.disabled=!0),Km(k.cardGrid,i.id,R),Td(),R.dataset.previewCardApplied=i.id,R.dataset.previewDeckDelta=i.deck?`${s}->${pr(n,i.deck)}`:"special";return}if(!ft?.isMyTurn())return;const e=structuredClone(ue);Ba(e,i),e.round=en,rd(k.cardGrid,i.id,R);const t=Yg(qe)?Ja(e).map(n=>n.id):[];try{await ft.submitPick({optionId:i.id,optionName:i.name,nextRunState:e,nextOptions:t})}catch(n){ui(n),Zc()}}function Kg(i,e){const t=Ja(e),n=[...t,...Bc];for(const s of["mg","rocket","sniper"])n.push(zc(s));return i.map(s=>n.find(r=>r.id===s)).filter(s=>!!s)}function uE(i){if(!ue||ue.ownedTurrets.length<2||lt!=="active")return;const e=ue.ownedTurrets.indexOf(Et),t=(e+i+ue.ownedTurrets.length)%ue.ownedTurrets.length;ps(ue.ownedTurrets[t])}const gs=new E(0,1,0),su=new E,Ps=new E,ru=new E,ai=new E,Gp=new Xe,Wp=new Xn,Is=new Wn(0,0,0,"YXZ"),is=.93;function hE(i,e,t,n){if(n.set(Math.sin(i),0,Math.cos(i)),J.arenaKind!=="capsule"||!J.bowl)return n;const s=qt(J.bowl,e,t);return s.progress<=.001?n:(n.addScaledVector(s.normal,-n.dot(s.normal)),n.lengthSq()<1e-4&&n.set(Math.sin(i),0,Math.cos(i)),n.normalize())}function dE(i,e,t,n){const r=J.arenaKind==="capsule"&&!!J.bowl?qt(J.bowl,x.position.x,x.position.z):null,a=!!(r&&r.progress>.001&&x.grounded),o=r?Re.smoothstep(r.progress,.025,.34):0;Ps.copy(gs),r&&Ps.lerp(r.normal,o*.88).normalize(),x.surfaceNormal.copy(r?.normal??gs),x.wallAssistActive=a,x.downforce=a?3.5+o*5.5:0,ai.set(Math.sin(x.heading),0,Math.cos(x.heading)),ai.addScaledVector(Ps,-ai.dot(Ps)),ai.lengthSq()<1e-4&&ai.set(Math.sin(x.heading),0,Math.cos(x.heading)),ai.normalize(),ru.crossVectors(Ps,ai).normalize(),ai.crossVectors(ru,Ps).normalize(),x.projectedForward.copy(ai),Gp.makeBasis(ru,Ps,ai),Wp.setFromRotationMatrix(Gp),x.orientation.slerp(Wp,1-Math.exp(-(a?11:15)*i)),Is.setFromQuaternion(x.orientation,"YXZ"),x.pitch=Re.clamp(Is.x,-is,is),x.roll=Re.clamp(Is.z,-is,is)+(e?t*.035*n:0),Is.set(x.pitch,Is.y,x.roll,"YXZ"),x.orientation.setFromEuler(Is)}function fE(i,e,t){let n=Math.sin(t)*x.speed,s=Math.cos(t)*x.speed;const r=n*i+s*e;if(r<=0)return;n-=i*r*1.08,s-=e*r*1.08;const a=Math.hypot(n,s);if(x.speed=Math.min(Math.abs(x.speed),a),a>.05){const o=Math.atan2(n,s);x.heading=o-x.driftAngle}x.driftAngle*=.35}function Ys(i){x.collisionCooldown=Math.max(0,x.collisionCooldown-i),x.wallContactNormal.set(0,0,0);const e=rt.has("KeyW")?1:0,t=rt.has("KeyS")?1:0,n=(rt.has("KeyA")?1:0)-(rt.has("KeyD")?1:0),s=rt.has("Space"),r=on==="mega_boost"&&Hn>0,a=rt.has("ShiftLeft")&&e>0&&x.boost>0,o=a||r;(e||r)&&(x.speed+=et.acceleration*(r?2.8:o?et.boostPower??1.3:1)*i),t&&(x.speed-=x.speed>1?et.acceleration*2.35*i:et.acceleration*.68*i),a?x.boost=Math.max(0,x.boost-24*i):x.boost=Math.min(100,x.boost+6*i);const c=et.maxSpeed*(r?1.75:o?et.boostPower??1.3:1);if(x.speed=Re.clamp(x.speed,-11,c),!e&&!t){const A=(s?4.4:2.15)*i;x.speed=Math.abs(x.speed)<=A?0:x.speed-Math.sign(x.speed)*A}const l=Math.min(Math.abs(x.speed)/et.maxSpeed,1),u=x.speed>=0?1:-1,h=.2+l*.8-Math.max(0,l-.72)*.34;x.heading+=n*et.handling*h*(s?1.3:1)*(r?.7:1)*u*i;const d=s&&l>.16?-n*.28*l*u:0;x.driftAngle=Re.damp(x.driftAngle,d,s?4.2*(ue?.vehicleStats.driftControlMultiplier??1):et.traction,i);const f=x.heading+x.driftAngle;hE(f,x.position.x,x.position.z,su),x.velocity.copy(su).multiplyScalar(x.speed),x.position.x+=x.velocity.x*i,x.position.z+=x.velocity.z*i;let m=!1,_=!1;if(J.arenaKind==="capsule"&&J.bowl){const A=Gm(J.bowl,x.position.x,x.position.z,x.heading,kn,zn);A.collided?(x.position.x=A.x,x.position.z=A.z,m=!0,_=!0,fE(A.normalX,A.normalZ,f),x.wallContactNormal.set(-A.normalX,0,-A.normalZ),R.dataset.guardContact="active",R.dataset.guardPenetration=A.penetration.toFixed(3),x.collisionCooldown<=0&&Pt("UPPER GUARD // SLIDE BACK INTO THE ARENA")):R.dataset.guardContact="clear"}else{const A=Math.hypot(x.position.x,x.position.z),L=Cn-(kn+zn);if(A>L){const D=x.position.x/A,b=x.position.z/A;x.position.x=D*L,x.position.z=b*L,m=!0,Pt("BOUNDARY IMPACT // TURN BACK")}}for(const A of Ws)if(!(x.position.y>A.top+.2))for(const L of[-kn,0,kn])TT(A,L)&&(m=!0);for(const A of $r)for(const L of[-kn,0,kn])bT(A,L)&&(m=!0);const g=x.activeRamp;let p=wc(x.position.x,x.position.z);if(on==="bunny_hop"&&Hn>0&&(p=null),m&&(Math.abs(x.speed)>6&&(Rc(Math.round(Math.abs(x.speed)*.32)),Pt("SCRAP COLLISION // HULL DAMAGED")),_||(x.speed*=-.18),x.driftAngle*=.25),p=wc(x.position.x,x.position.z),on==="bunny_hop"&&Hn>0&&(p=null),p){if(x.activeRamp=p.ramp,x.grounded=!0,x.verticalVelocity=0,x.position.y=p.height+.06,p.ramp.kind==="wall"){const A=p.localZ,L=Re.smoothstep(A,.08,.42),D=qt(J.bowl,x.position.x,x.position.z),b=Math.sin(f)*D.outwardX+Math.cos(f)*D.outwardZ,T=Re.smoothstep(A,.62,.9),I=ue?.vehicleStats.wallGripMultiplier??1;x.speed-=b*(5.8*L+12*T)*i/I,x.speed=Re.clamp(x.speed,-11,c),x.driftAngle=Re.damp(x.driftAngle,0,5+L*7,i),x.speed*=Math.exp(-.18*T*i),R.dataset.wallRideGrip=(L*.85+.15).toFixed(2),R.dataset.wallSurfaceBand=D.band,R.dataset.wallSurfaceNormal=`${D.normal.x.toFixed(2)},${D.normal.y.toFixed(2)},${D.normal.z.toFixed(2)}`,A>.18&&Math.abs(x.speed)>5&&(R.dataset.wallRideContact="passed")}}else{const A=wt(x.position.x,x.position.z)+.06;if(g&&g.kind!=="wall"&&x.position.y>A+.45){const L=Math.cos(f-g.rotation),D=x.speed*L*g.rise/g.length,b=Math.abs(x.speed)*Math.max(0,-Math.sin(x.pitch));x.verticalVelocity=Math.max(0,D,b),x.grounded=!1}x.activeRamp=null,x.grounded?x.position.y=A:(x.verticalVelocity-=12.5*i,x.position.y+=x.verticalVelocity*i,x.position.y<=A&&(x.position.y=A,x.verticalVelocity=0,x.grounded=!0))}const y=di(x.position.x+Math.sin(x.heading)*2,x.position.z+Math.cos(x.heading)*2),S=di(x.position.x-Math.sin(x.heading)*2,x.position.z-Math.cos(x.heading)*2),v=di(x.position.x+Math.cos(x.heading)*1.2,x.position.z-Math.sin(x.heading)*1.2),P=di(x.position.x-Math.cos(x.heading)*1.2,x.position.z+Math.sin(x.heading)*1.2);J.arenaKind==="capsule"?dE(i,s,n,l):(x.pitch=x.grounded?Math.atan2(S-y,4):0,x.roll=((x.grounded?Math.atan2(v-P,2.4):0)+(s?n*.055*l:0))/(et.stability??1),x.orientation.setFromEuler(Is.set(x.pitch,x.heading,x.roll,"YXZ")),x.surfaceNormal.set(0,1,0),x.projectedForward.set(Math.sin(x.heading),0,Math.cos(x.heading)),x.wallAssistActive=!1,x.downforce=0),x.velocity.copy(su).multiplyScalar(x.speed),Tr.forEach(A=>A.rotation.x+=x.speed*i/.57),bc.forEach(A=>A.rotation.y=Re.damp(A.rotation.y,-n*.38,12,i));for(const A of qs)A.alive&&A.group.position.distanceTo(x.position)<1.85&&Math.abs(x.speed)>5&&(yh(A,Math.abs(x.speed)*1.8*(et.ramPower??1)*(on==="mega_shroom"?2:1)),x.speed*=-.35,Rc(4));if(!Number.isFinite(x.position.x)||!Number.isFinite(x.position.y)||!Number.isFinite(x.position.z)||x.position.y<-8||Math.abs(x.position.x)>Cn*1.8||Math.abs(x.position.z)>Cn*1.8){Pt("OUT OF BOUNDS // AUTO RECOVERY"),Ks();return}sE(i)}function qa(i,e=!1){$.health<=0||lt==="ended"||lt==="card_select"||($.health=Math.max(0,$.health-i),e||ks("confirmed-hit",.18,.025,$.position),R.dataset.opponentHealth=$.health.toFixed(0),$.health<=0&&(yd($.position,1,28),Dt.visible=!1,Pt("RIVAL SCRAPPED // ROUND SECURED"),uT()))}function pE(i){if(lt!=="active"||$.health<=0||$.burnTime>0&&($.burnTime=Math.max(0,$.burnTime-i),$.burnFxCooldown-=i,qa($.burnDps*i,!0),$.burnFxCooldown<=0&&($.burnFxCooldown=.14,xd($.position.clone().add(new E(0,.5,0)))),R.dataset.burnRemaining=$.burnTime.toFixed(2),$.health<=0))return;$.collisionCooldown=Math.max(0,$.collisionCooldown-i),$.fireCooldown-=i;const e=x.position.x-$.position.x,t=x.position.z-$.position.z,n=Math.hypot(e,t);$.maneuverTimer-=i,$.weavePhase+=i*$.weaveRate,$.maneuverTimer<=0&&($.maneuverTimer=.75+Math.random()*1.65,$.steerBias=Math.random()<.5?-1:1,$.preferredDistance=17+Math.random()*22,$.speedMultiplier=.78+Math.random()*.5,$.weaveRate=1.1+Math.random()*2.1,R.dataset.aiManeuver="rerolled");const s=Math.atan2(e,t),r=n/$.preferredDistance,a=$.steerBias*(.62+Math.sin($.weavePhase)*.32),o=r<.58?s+Math.PI+$.steerBias*.28:r>1.42?s+Math.sin($.weavePhase)*.2:s+a,c=Math.atan2(Math.sin(o-$.heading),Math.cos(o-$.heading));$.heading+=Re.clamp(c,-2.05*i,2.05*i);const l=(r>1.35?20:r<.58?18:13+Math.abs(Math.sin($.weavePhase))*6)*$.speedMultiplier;if($.speed=Re.damp($.speed,l,3,i),$.position.x+=Math.sin($.heading)*$.speed*i,$.position.z+=Math.cos($.heading)*$.speed*i,J.arenaKind==="capsule"&&J.bowl){const h=Gm(J.bowl,$.position.x,$.position.z,$.heading,kn,zn);h.collided&&($.position.x=h.x,$.position.z=h.z,$.heading+=$.steerBias*.7,$.steerBias*=-1)}else{const h=Cn-4,d=Math.hypot($.position.x,$.position.z);d>h&&($.position.multiplyScalar(h/d),$.heading=Math.atan2(-$.position.x,-$.position.z)+$.steerBias*.5,$.steerBias*=-1)}$.position.y=di($.position.x,$.position.z)+.06,Dt.position.copy($.position),Dt.rotation.y=$.heading;const u=Dt.userData.turret;if(u){const h=Math.atan2(e,t);u.rotation.y=Re.damp(u.rotation.y,Math.atan2(Math.sin(h-$.heading),Math.cos(h-$.heading)),8,i)}n<fs.sniper.range&&$.fireCooldown<=0&&(iE(),$.fireCooldown=1/fs.sniper.fireRate+.18+Math.random()*.55),n<2.35&&$.collisionCooldown<=0&&($.collisionCooldown=.8,Rc(10),qa(5*(et.ramPower??1)),$.heading+=Math.PI*.65)}function Rc(i){if(x.collisionCooldown>0||lt==="ended"||lt==="card_select")return;x.collisionCooldown=.45;let e=i*(1-(et.armor??0));if(x.shield>0){const t=Math.min(x.shield,e);x.shield-=t,e-=t,R.dataset.shieldAbsorbed=t.toFixed(1),Pt("EMERGENCY SHIELD // IMPACT ABSORBED")}x.health=Math.max(0,x.health-e),ks("vehicle-hit",.26,.045,x.position),x.health<=0&&(Pt("RIG DISABLED // RIVAL TAKES THE ROUND"),hT())}const au=[],la=new E;function mE(i){nu.setFromCamera(vh,mn),au.length=0,nu.intersectObjects(Bi,!0,au);const e=au[0];if(e)rn.copy(e.point);else{if(kp.constant=0,!nu.ray.intersectPlane(kp,rn))return;rn.y=di(rn.x,rn.z)}Er.getWorldPosition(la);const t=rn.x-la.x,n=rn.z-la.z;if(Math.hypot(t,n)<1.8)return;let r=Math.atan2(t,n)-x.heading;r=Math.atan2(Math.sin(r),Math.cos(r)),Er.rotation.y=Re.damp(Er.rotation.y,r,12,i);const a=-Math.atan2(rn.y-la.y,Math.hypot(t,n));fh.rotation.x=Re.damp(fh.rotation.x,Re.clamp(a,-.42,.2),11,i),Ng.copy(rn).sub(la).normalize(),Yc=!0,Bs.position.copy(rn),Bs.position.y+=.09,Bs.scale.setScalar(1+Math.sin(ms*5)*.06)}const ua=new E,dn=new E,Xp=new E,Fn=new E,Xo=new E,gE=new E;function ou(i,e,t){Xo.copy(e).sub(i);const n=Xo.lengthSq();if(n<=1e-6)return t.distanceToSquared(i);const s=Re.clamp(gE.copy(t).sub(i).dot(Xo)/n,0,1);return Xp.copy(i).addScaledVector(Xo,s),Xp.distanceToSquared(t)}function _E(i,e,t,n=!1,s=!1){if(R.dataset.lastWeaponImpact=i.kind,i.owner==="player"&&i.kind==="rocket"){for(const a of qs){if(!a.alive)continue;dn.copy(a.group.position),dn.y+=1.4;const o=dn.distanceTo(e);if(o>i.splashRadius)continue;const c=a===t?i.damage:i.damage*Math.max(.28,1-o/i.splashRadius);yh(a,c)}dn.copy($.position),dn.y+=1.1;const r=dn.distanceTo(e);$.health>0&&r<=i.splashRadius&&qa(i.damage*Math.max(.3,1-r/i.splashRadius))}else i.owner==="player"&&t&&yh(t,i.damage);i.owner==="player"&&n&&i.kind!=="rocket"&&qa(i.damage),i.owner==="player"&&n&&i.burnDps>0&&($.burnDps=Math.max($.burnDps,i.burnDps),$.burnTime=Math.max($.burnTime,i.burnDuration),xd(e),R.dataset.burnStatus="applied"),i.owner==="opponent"&&s&&Rc(i.damage),i.kind==="rocket"?(Vg(i.id),Xa("rocket",e,!0),yd(e,.2,22)):i.kind==="sniper"?WT(e):Xa("mg",e,!1)}function qp(i){for(let e=Fi.length-1;e>=0;e--){const t=Fi[e];ua.copy(t.mesh.position),t.mesh.position.addScaledVector(t.velocity,i),t.life-=i,t.kind==="rocket"&&(t.trailTimer-=i,t.trailTimer<=0&&(t.trailTimer=.06,XT(t.mesh.position,t.id)));let n=null;if(t.owner==="player")for(const c of qs){if(!c.alive||t.hitTargets.has(c))continue;dn.copy(c.group.position),dn.y+=1.4;const l=t.kind==="rocket"?1.15:.95;if(ou(ua,t.mesh.position,dn)<l*l){n=c;break}}dn.copy($.position),dn.y+=1.1;const s=t.owner==="player"&&!t.hitOpponent&&$.health>0&&ou(ua,t.mesh.position,dn)<(t.kind==="rocket"?1.6:1.35)**2;dn.copy(x.position),dn.y+=1.05;const r=t.owner==="opponent"&&x.health>0&&ou(ua,t.mesh.position,dn)<1.4**2;if(r&&on==="reflect"&&Hn>0){Fn.copy(x.position),Fn.y+=1.2,Xa(t.kind,Fn,!1),mr(14065919,.65),t.owner="player",t.velocity.copy($.position).add(new E(0,1.1,0)).sub(t.mesh.position).normalize().multiplyScalar(Math.max(45,t.velocity.length()*1.08)),t.damage*=1.15,t.life=Math.max(t.life,2),t.hitOpponent=!1,t.mesh.quaternion.setFromUnitVectors(md,t.velocity.clone().normalize()),R.dataset.reflectVfx="projectile-return";continue}const a=di(t.mesh.position.x,t.mesh.position.z)+.1,o=t.mesh.position.y<=a;if(o&&t.ricochetsRemaining>0){t.ricochetsRemaining--,t.mesh.position.copy(ua),t.velocity.y=Math.abs(t.velocity.y)+4,t.velocity.multiplyScalar(.82),Xa("mg",t.mesh.position,!1),R.dataset.ricochetVfx="spark";continue}if(n||s||r||o||t.life<=0){if(n?(Fn.copy(n.group.position),Fn.y+=1.4):s?(Fn.copy($.position),Fn.y+=1.1):r?(Fn.copy(x.position),Fn.y+=1.05):(Fn.copy(t.mesh.position),o&&(Fn.y=a+.08)),(n||s||r||o||t.kind==="rocket")&&_E(t,Fn,n,s,r),t.owner==="player"&&(!!n||s)&&t.piercesRemaining>0&&t.kind!=="rocket"){t.piercesRemaining--,n&&t.hitTargets.add(n),s&&(t.hitOpponent=!0),t.mesh.position.addScaledVector(t.velocity.clone().normalize(),1.8),R.dataset.piercingVfx="bright-tracer";continue}t.kind==="rocket"&&Vg(t.id),_d(t.mesh,t.kind),Fi.splice(e,1)}}for(let e=pi.length-1;e>=0;e--){const t=pi[e];t.life-=i,t.mesh.position.addScaledVector(t.velocity,i),t.velocity.y-=3.5*i,t.mesh.scale.multiplyScalar(1+i*.55);const n=t.mesh.material;n.opacity=Math.max(0,Math.min(n.opacity,t.life*.45)),t.life<=0&&(Te.remove(t.mesh),n.dispose(),pi.splice(e,1))}for(let e=zi.length-1;e>=0;e--){const t=zi[e];t.life-=i;const n=Re.clamp(1-t.life/t.maxLife,0,1),s=Math.pow(1-n,1.45);t.group.userData.billboard&&t.group.quaternion.copy(mn.quaternion),t.kind!=="laser"&&t.group.scale.setScalar((t.kind==="impact"?.48:.68)+n*t.growth);for(const r of t.lights)r.intensity*=Math.max(0,1-i*8);for(const r of t.meshes){const a=Array.isArray(r.material)?r.material:[r.material];for(const o of a)o.opacity=Number(o.userData.baseOpacity??1)*s}t.life<=0&&gd(e)}Ar=Math.max(0,Ar-i),Ar===0&&(Rr=0);for(const e of qs)e.alive&&(e.hitFlash>0?(e.hitFlash-=i,e.group.getObjectByName("target-body").material.emissive.setHex(16739116)):e.group.getObjectByName("target-body").material.emissive.setHex(0))}const cu=new E;let lu=.1;function vE(){return J.arenaKind==="capsule"&&J.bowl?{kind:"capsule",straightHalfLength:J.bowl.straightHalfLength,outerRadius:J.bowl.outerRadius}:{kind:"ring",radius:Cn}}function Jc(){const i=ni.mode==="enemy";k.cameraMode.textContent=i?"ENEMY CAM":"CHASE CAM",k.cameraMode.parentElement?.classList.toggle("enemy",i),R.dataset.cameraMode=ni.mode,R.dataset.enemyCam=i?"locked":"off"}function xE(i){Ar>0?cu.set((Math.random()-.5)*Rr,(Math.random()-.5)*Rr,(Math.random()-.5)*Rr):cu.set(0,0,0);const e=ni.update({dt:i,playerPosition:Nt.position,playerHeading:x.heading,enemyPosition:Dt.position,enemyAvailable:$.health>0&&Dt.visible,groundHeight:di,bounds:vE(),shake:cu});e.fellBackToChase&&(Jc(),Pt("NO TARGET // CHASE CAM")),lu+=i,lu>=.1&&(lu=0,R.dataset.cameraAimMode=e.mode==="enemy"?"enemy-target":"drive-forward",R.dataset.cameraPositionMode=e.mode,R.dataset.cameraTargetDistance=e.targetDistance?.toFixed(2)??"none",R.dataset.cameraPosition=`${mn.position.x.toFixed(2)},${mn.position.y.toFixed(2)},${mn.position.z.toFixed(2)}`,R.dataset.cameraLookAt=`${ni.lookAt.x.toFixed(2)},${ni.lookAt.y.toFixed(2)},${ni.lookAt.z.toFixed(2)}`)}const Pi=new E;function Yp(i,e,t,n){Pi.copy(e),Pi.y+=t,Pi.project(mn);const s=n&&Pi.z>-1&&Pi.z<1&&Math.abs(Pi.x)<1.15&&Math.abs(Pi.y)<1.15;if(i.classList.toggle("world-health--hidden",!s),i.setAttribute("aria-hidden",String(!s)),!s)return;const r=(Pi.x*.5+.5)*innerWidth,a=(-Pi.y*.5+.5)*innerHeight,o=Re.clamp(1.08-mn.position.distanceTo(e)*.0055,.78,1.02);i.style.transform=`translate3d(${r.toFixed(1)}px,${a.toFixed(1)}px,0) translate(-50%,-100%) scale(${o.toFixed(3)})`}function Kp(){const i=tn&&(lt==="countdown"||lt==="active"||lt==="ended");Yp(k.playerHealthTag,Nt.position,3.7,i&&x.health>0&&Nt.visible),Yp(k.rivalHealthTag,Dt.position,3.85,i&&$.health>0&&Dt.visible),R.dataset.worldHealthHud="projected-car-anchors"}function jg(){const i=et.maxHealth+Wa;k.boost.textContent=String(Math.round(x.boost)),k.health.textContent=String(Math.round(x.health)),k.healthBar.style.width=`${x.health/i*100}%`,k.boostBar.style.width=`${x.boost}%`,Gg(),k.health.parentElement.title=x.shield>0?`${Math.round(x.shield)} temporary shield active`:"Hull integrity",R.dataset.shield=x.shield.toFixed(1),k.rivalHealth.textContent=String(Math.round($.health)),k.rivalHealthBar.style.width=`${$.health/$.maxHealth*100}%`,k.boostMeter.classList.toggle("recharging",x.boost<99.5&&!rt.has("ShiftLeft")),R.dataset.boost=x.boost.toFixed(1),R.dataset.boostRechargeRate="6-per-second";const e=wc(x.position.x,x.position.z),t=wt(x.position.x,x.position.z),n=J.arenaKind==="capsule"?"flat-floor":"terrain";R.dataset.groundContact=x.grounded?x.activeRamp?x.activeRamp.kind:n:"airborne",R.dataset.aimRay=Yc?"locked":"searching",R.dataset.aimPoint=`${rn.x.toFixed(1)},${rn.y.toFixed(1)},${rn.z.toFixed(1)}`,R.dataset.vehiclePosition=`${x.position.x.toFixed(1)},${x.position.y.toFixed(1)},${x.position.z.toFixed(1)}`,R.dataset.surfaceLabel=e?.ramp.label??(J.arenaKind==="capsule"?"flat center floor":"base terrain"),R.dataset.surfaceHeight=(e?.height??t).toFixed(2),R.dataset.baseGroundHeight=t.toFixed(2),R.dataset.contactDelta=((e?.height??t)-t).toFixed(2),R.dataset.heightMismatch=e?Math.abs(x.position.y-.06-e.height).toFixed(3):"0.000",R.dataset.wallRideActive=String(e?.ramp.kind==="wall"),Zr.position.set(x.position.x,(e?.height??t)+.16,x.position.z),ci.set(0,1,0).applyQuaternion(x.orientation).normalize(),Xs.copy(x.position).addScaledVector(ci,.7);for(const c of[lh,uh,hh,sc,rc])c.position.copy(Xs);lh.setDirection(ci),uh.setDirection(x.surfaceNormal),hh.setDirection(x.projectedForward);const s=x.velocity.length();sc.setDirection(s>.01?x.velocity.clone().normalize():x.projectedForward),sc.setLength(Re.clamp(s*.24,1.2,7),.6,.3);const r=x.wallContactNormal.lengthSq()>.001;rc.visible=Qi&&r,r&&rc.setDirection(x.wallContactNormal);const a=J.arenaKind==="capsule"&&J.bowl?qt(J.bowl,x.position.x,x.position.z):null,o=x.grounded?R.dataset.guardContact==="active"?"upper-lip":a&&a.progress>.001?a.band:"flat-floor":"airborne";R.dataset.surfaceType=o,R.dataset.carUp=`${ci.x.toFixed(2)},${ci.y.toFixed(2)},${ci.z.toFixed(2)}`,R.dataset.surfaceNormal=`${x.surfaceNormal.x.toFixed(2)},${x.surfaceNormal.y.toFixed(2)},${x.surfaceNormal.z.toFixed(2)}`,R.dataset.projectedForward=`${x.projectedForward.x.toFixed(2)},${x.projectedForward.y.toFixed(2)},${x.projectedForward.z.toFixed(2)}`,R.dataset.velocityVector=`${x.velocity.x.toFixed(2)},${x.velocity.y.toFixed(2)},${x.velocity.z.toFixed(2)}`,R.dataset.wallContactNormal=`${x.wallContactNormal.x.toFixed(2)},${x.wallContactNormal.y.toFixed(2)},${x.wallContactNormal.z.toFixed(2)}`,R.dataset.wallAssist=x.wallAssistActive?"active":"off",R.dataset.wallDownforce=x.downforce.toFixed(2),R.dataset.carRoll=x.roll.toFixed(3),R.dataset.carPitch=x.pitch.toFixed(3),ls&&x.activeRamp?.kind==="ramp"&&(R.dataset.rampDriveUp="passed"),ls&&!x.grounded&&R.dataset.rampDriveUp==="passed"&&(R.dataset.rampLaunch="passed")}const $g=new E(0,0,-28),Zg=new Xn,jp=new Xn;function Jg(){$g.copy(x.position),Zg.copy(x.orientation)}function yE(i){Nt.position.lerpVectors($g,x.position,i),jp.slerpQuaternions(Zg,x.orientation,i),Nt.quaternion.copy(jp)}function Ks(i=!0){const e=J.spawn;Kc(),cn(!1),x.position.set(e.x,wt(e.x,e.z)+.06,e.z),x.heading=e.heading,x.speed=0,x.driftAngle=0,x.verticalVelocity=0,x.pitch=0,x.roll=0,x.grounded=!0,x.activeRamp=null,x.health=et.maxHealth,x.shield=ue?.roundShield??0,x.boost=100,x.orientation.setFromAxisAngle(gs,e.heading),x.surfaceNormal.copy(gs),x.projectedForward.set(Math.sin(e.heading),0,Math.cos(e.heading)),x.velocity.set(0,0,0),x.wallContactNormal.set(0,0,0),x.wallAssistActive=!1,x.downforce=0,Jg(),Nt.position.copy(x.position),Nt.quaternion.copy(x.orientation),ni.snapToChase(x.position,x.heading,di),R.dataset.roundShield=x.shield.toFixed(0),i&&Pt("RIG RECOVERED // SYSTEMS ONLINE")}function Ed(){const i=J.opponentSpawn;$.maxHealth=210*(1+Math.min(.6,(en-1)*.06)),$.position.set(i.x,wt(i.x,i.z)+.06,i.z),$.heading=i.heading,$.speed=0,$.health=$.maxHealth,$.fireCooldown=Math.max(.72,1.25-(en-1)*.025),$.collisionCooldown=0,$.burnTime=0,$.burnDps=0,$.burnFxCooldown=0,$.maneuverTimer=0,$.preferredDistance=24,$.speedMultiplier=1,$.weavePhase=Math.random()*Math.PI*2,$.weaveRate=1.5,Dt.visible=!0,Dt.position.copy($.position),Dt.rotation.y=$.heading,R.dataset.opponentHealth=String($.health),R.dataset.aiScaling=(1+Math.min(.6,(en-1)*.06)).toFixed(2),R.dataset.aiState="countdown-ready"}function Cc(){lt="countdown",ng=performance.now()+cT*1e3,oh=3,clearTimeout(gh),k.message.classList.remove("show"),k.countdown.hidden=!1,k.countdownArena.textContent=J.name,k.countdownValue.textContent="3",k.countdown.querySelector("span").textContent="GET READY",R.dataset.roundPhase=lt}function ME(){if(lt!=="countdown")return;const i=Math.max(0,(ng-performance.now())/1e3),e=Math.max(0,Math.ceil(i-lT));e!==oh&&(oh=e,k.countdownValue.textContent=e>0?String(e):"DRIVE",k.countdown.querySelector("span").textContent=e>0?"GET READY":"FIGHT BACK"),i<=0&&(lt="active",k.countdown.hidden=!0,R.dataset.roundPhase=lt,R.dataset.aiState="hunting",Pt(`ROUND ${en} // ${J.name.toUpperCase()}`))}function Qg(i){if(yc)return;yc=!0,lt="ended",cn(!1),i==="player"?os=Math.min(3,os+1):Os=Math.min(3,Os+1),eo(),R.dataset.roundWinner=i,R.dataset.roundPhase=lt,k.countdown.hidden=!1,k.countdownValue.textContent=i==="player"?"WIN":"LOST",k.countdownArena.textContent=os>=3||Os>=3?"MATCH COMPLETE":`ROUND ${en} COMPLETE`,k.countdown.querySelector("span").textContent="WAITING FOR BOTH DRIVERS",ls||Cr||Sa||wa||Tc||fd||(clearTimeout(Ap),Ap=window.setTimeout(()=>{SE()},1500))}async function SE(){if(!(!ue||!ft)){ue.round=en,jr(),k.countdown.querySelector("span").textContent="YOU'RE READY // WAITING FOR RIVAL";try{await ft.markRoundComplete(Ja(ue).map(i=>i.id),structuredClone(ue)),R.dataset.roundReady="submitted"}catch(i){ui(i)}}}function wE(){cn(!1),rt.clear(),Fs.intensity=0;for(const i of Fi)_d(i.mesh,i.kind);Fi.length=0;for(const i of pi)Te.remove(i.mesh);for(pi.length=0;zi.length;)gd(zi.length-1);for(const i of[...Te.children])pa.has(i)||Te.remove(i);Vr.length=0,Ws.length=0,$r.length=0,Bi.length=0,cs.length=0,qs.length=0,Gn.length=0,Gn.push(...og),R.dataset.roundWorldCleanup="complete"}async function bE(i=en+1){if(lt==="loading")return;const e=os>=3||Os>=3,t=J.id==="dustring"?"ovalbowl":"dustring",n=Math.max(en+1,i);lt="loading",R.dataset.roundPhase=lt,R.dataset.seamlessTransition="loading",k.cardDraft.hidden=!0,k.countdown.hidden=!1,k.countdownValue.textContent="…",k.countdownArena.textContent="NEXT ARENA",k.countdown.querySelector("span").textContent="REBUILDING THE RING",no(),e&&(os=0,Os=0),en=n,ue&&(ue.round=n,jr()),eo(),wE(),J=Oc[t],Cn=J.radius,await lg(),await hg(),fg(),pg(),J.targets.forEach(s=>bg(s.x,s.z,s.rotation)),Bi.push(Dt),dg(),yc=!1,Ks(!1),Ed(),Jc(),R.dataset.targetsRemaining=String(J.targets.length),R.dataset.arenaLayout=J.id,R.dataset.arenaKind=J.arenaKind,R.dataset.arenaRadius=String(Cn),R.dataset.ringInnerRadius=String(J.ringInnerRadius),R.dataset.ringOuterRadius=String(J.ringOuterRadius),R.dataset.mapRotation="alternate-in-document",R.dataset.seamlessTransition="complete",Cc()}function e0(i){tn&&(fi=i??!fi,fi&&cn(!1),k.pause.hidden=!fi)}function TE(i){k.controls.classList.toggle("closed",!0)}function EE(){tn&&(Qi=!Qi,Gn.forEach(i=>i.visible=Qi),ma.visible=Qi,k.debug.hidden=!Qi,Pt(Qi?`PHYSICS DEBUG // ${x.grounded?"GROUNDED":"AIRBORNE"}`:"PHYSICS DEBUG // OFF"))}function AE(){if(!tn)return;const i=ni.toggle($.health>0&&Dt.visible);ue&&(ue.cameraMode=i.mode,jr()),Jc(),Pt(i.noTarget?"ENEMY CAM // WAITING FOR TARGET":i.mode==="enemy"?"ENEMY CAM // ON":"CHASE CAM // ON")}R.dataset.assetsLoaded="0";R.dataset.assetErrors="0";R.dataset.assetManifest="riggedAssetManifest";function RE(i){const e=new E(0,0,-i.length*.5-3).applyAxisAngle(new E(0,1,0),i.rotation),t=i.position.x+e.x,n=i.position.z+e.z;x.position.set(t,wt(t,n)+.06,n),x.heading=i.rotation,x.speed=0,x.driftAngle=0,x.verticalVelocity=0,x.pitch=0,x.roll=0,x.grounded=!0,x.activeRamp=null,x.orientation.setFromAxisAngle(gs,i.rotation),Nt.position.copy(x.position),Nt.quaternion.copy(x.orientation)}function CE(){const i=Vr.filter(n=>n.kind==="ramp"),e=[];let t=0;for(const n of i){RE(n);let s=!1,r=!1,a=!1;rt.add("KeyW");for(let o=0;o<600;o++)if(ms+=zt,Ys(zt),jg(),x.activeRamp?.label===n.label&&(s=!0),s&&!x.grounded&&(r=!0),r&&x.grounded&&x.activeRamp?.label!==n.label){a=!0;break}rt.delete("KeyW"),a&&t++,(!s||!r||!a)&&e.push(`${n.label}:${s?r?"no-landing":"no-launch":"no-contact"}`)}return R.dataset.allRampExpected=String(i.length),R.dataset.allRampPasses=String(i.length-e.length),R.dataset.allRampLandings=String(t),R.dataset.allRampFailures=e.join("|")||"none",R.dataset.rampDriveUp=e.some(n=>n.endsWith("no-contact"))?"failed":"passed",R.dataset.rampLaunch=e.some(n=>n.endsWith("no-launch"))?"failed":"passed",R.dataset.rampLanding=t===i.length?"passed":"failed",e.length===0}function PE(i){const e=i.outerRadius-i.flatRadius,t=i.flatRadius+e*.48,n=Math.PI*.25,s=[{label:"straight-along-bank",x:t,z:-30,heading:0,steps:180,drive:!1,steer:"none"},{label:"turn-left-while-climbing",x:i.flatRadius+2,z:-18,heading:Math.PI/2,steps:170,drive:!0,steer:"left"},{label:"turn-right-while-climbing",x:i.flatRadius+2,z:18,heading:Math.PI/2,steps:170,drive:!0,steer:"right"},{label:"steer-around-rounded-cap",x:Math.cos(n)*t,z:i.straightHalfLength+Math.sin(n)*t,heading:-n,steps:210,drive:!1,steer:"cap"}],r=[];let a=0,o=0,c=1;for(const u of s){x.position.set(u.x,wt(u.x,u.z)+.06,u.z),x.heading=u.heading,x.speed=u.drive?8:14,x.driftAngle=0,x.verticalVelocity=0,x.pitch=0,x.roll=0,x.grounded=!0,x.activeRamp=null,x.orientation.setFromAxisAngle(gs,u.heading);let h=0,d=0,f=0,m=1,_=!0,g=!0;u.drive&&rt.add("KeyW");for(let y=0;y<u.steps;y++){u.steer==="left"&&y>=34&&y<72?rt.add("KeyA"):rt.delete("KeyA"),u.steer==="right"&&y>=34&&y<72||u.steer==="cap"&&y%6===0?rt.add("KeyD"):rt.delete("KeyD"),ms+=zt,Ys(zt),u.steer==="cap"&&rt.delete("KeyD");const S=qt(i,x.position.x,x.position.z);S.progress>.001&&h++,ci.set(0,1,0).applyQuaternion(x.orientation).normalize();const v=ci.dot(S.normal);y>18&&(m=Math.min(m,v)),d=Math.max(d,Math.abs(x.roll)),f=Math.max(f,Math.abs(x.pitch)),g=g&&Number.isFinite(x.position.x)&&Number.isFinite(x.position.y)&&Number.isFinite(x.position.z)&&Number.isFinite(x.roll)&&Number.isFinite(x.pitch);for(const P of[-kn,0,kn]){const A=qt(i,x.position.x+Math.sin(x.heading)*P,x.position.z+Math.cos(x.heading)*P);_=_&&A.distance<=i.outerRadius-zn+.05}}rt.delete("KeyW"),rt.delete("KeyA"),rt.delete("KeyD"),a=Math.max(a,d),o=Math.max(o,f),c=Math.min(c,m),g&&_&&h>=Math.min(90,u.steps*.6)&&d<=is+.025&&f<=is+.025&&m>.72||r.push(`${u.label}:${g?_?h<90?"lost-wall":d>is+.025?"roll":f>is+.025?"pitch":"up-vector":"escaped":"non-finite"}`)}const l=r.length===0;return R.dataset.wallTurningSmoke=l?"passed":"failed",R.dataset.wallTurningCases=String(s.length),R.dataset.wallTurningFailures=r.join("|")||"none",R.dataset.wallTurningMaxRoll=Re.radToDeg(a).toFixed(1),R.dataset.wallTurningMaxPitch=Re.radToDeg(o).toFixed(1),R.dataset.wallTurningMinUpDot=c.toFixed(3),l}function LE(){if(J.arenaKind!=="capsule"||!J.bowl)return R.dataset.wallRideSmoke="skipped-non-bowl",!0;const i=J.bowl,e=[{label:"east-straight",x:i.flatRadius-5,z:0,heading:Math.PI/2},{label:"east-diagonal",x:i.flatRadius-5,z:-14,heading:Math.PI/2-.34},{label:"north-cap",x:0,z:i.straightHalfLength+i.flatRadius-5,heading:0},{label:"north-cap-diagonal",x:-14,z:i.straightHalfLength+i.flatRadius-5,heading:.34}],t=[];let n=0,s=0,r=!0,a=!0;for(const u of e){x.position.set(u.x,wt(u.x,u.z)+.06,u.z),x.heading=u.heading,x.speed=8,x.driftAngle=0,x.verticalVelocity=0,x.pitch=0,x.roll=0,x.grounded=!0,x.activeRamp=null,x.orientation.setFromAxisAngle(gs,u.heading);let h=0,d=0,f=!1;rt.add("KeyW");for(let p=0;p<210;p++){ms+=zt,Ys(zt);const y=qt(i,x.position.x,x.position.z);h=Math.max(h,y.progress),d=Math.max(d,x.position.y),n=Math.max(n,h),s=Math.max(s,d),f=f||y.progress>.001;for(const S of[-kn,0,kn]){const v=qt(i,x.position.x+Math.sin(x.heading)*S,x.position.z+Math.cos(x.heading)*S);r=r&&v.distance<=i.outerRadius-zn+.05}}const m=qt(i,x.position.x,x.position.z);x.heading=Math.atan2(-m.outwardX,-m.outwardZ),x.driftAngle=0,x.speed=Math.max(7,Math.abs(x.speed));for(let p=0;p<180;p++)ms+=zt,Ys(zt);rt.delete("KeyW");const g=qt(i,x.position.x,x.position.z).progress<.08&&x.grounded;a=a&&g,(!f||h<=.28||d<=2||!g)&&t.push(`${u.label}:${f?h<=.28?"too-low":d<=2?"no-rise":"no-return":"no-contact"}`)}const o=PE(i);let c=t.length===0&&r&&a&&o;R.dataset.wallRideApproaches=String(e.length),R.dataset.wallRideFailures=t.join("|")||"none",R.dataset.wallRideMaxProgress=n.toFixed(2),R.dataset.wallRideMaxHeight=s.toFixed(2),R.dataset.wallRideBoundary=r?"passed":"failed",R.dataset.wallRideReturn=a?"passed":"failed",Ks(),ci.set(0,1,0).applyQuaternion(x.orientation);const l=x.position.x===J.spawn.x&&x.position.z===J.spawn.z&&x.speed===0&&x.velocity.lengthSq()===0&&x.verticalVelocity===0&&x.pitch===0&&x.roll===0&&ci.dot(gs)>.999&&x.grounded&&!x.wallAssistActive&&qt(i,x.position.x,x.position.z).progress===0;return R.dataset.wallReset=l?"passed":"failed",c=c&&l,R.dataset.wallRideSmoke=c?"passed":"failed",c}function IE(){let i=!0;if((ls||Cr)&&(i=CE()&&i),(ls||Cr)&&(R.dataset.physicsSmoke=i?"passed":"failed"),Sa&&(R.dataset.physicsSmoke=LE()?"passed":"failed"),wa){rn.copy(x.position).add(new E(0,1,40)),Yc=!0,Nt.updateMatrixWorld(!0),cn(!0);for(let n=0;n<120;n++)Xg(zt);cn(!1);const e=Number(R.dataset.shotsFired??0),t=Math.ceil(2*vn.fireRate)+1;R.dataset.holdFireSmoke=e>=2&&e<=t?"passed":"failed",R.dataset.fireRateLimited=e<=t?"passed":"failed",R.dataset.holdFireShots=String(e)}if(Tc){x.boost=100,rt.add("KeyW"),rt.add("ShiftLeft");for(let n=0;n<60;n++)Ys(zt);const e=x.boost;rt.delete("ShiftLeft");for(let n=0;n<60;n++)Ys(zt);const t=x.boost;rt.clear(),R.dataset.boostAfterUse=e.toFixed(1),R.dataset.boostAfterRecharge=t.toFixed(1),R.dataset.boostSmoke=e<80&&t>e&&t<95?"passed":"failed",Ks()}fd&&(lt="active",qa(999),R.dataset.roundHudSmoke=os===1&&R.dataset.roundWinner==="player"?"passed":"failed")}function ui(i){const e=i instanceof Error?i.message:"Multiplayer connection failed.";k.roomStatus.textContent=e,Pt(e.toUpperCase())}function DE(i){if(!i){k.roomEntry.hidden=!1,k.roomWaiting.hidden=!0,k.addAI.hidden=!0;return}const e=vs(i),t=i.phase==="lobby";k.multiplayerLobby.hidden=!t,k.roomEntry.hidden=!0,k.roomWaiting.hidden=!1,k.roomCodeDisplay.textContent=i.code;const n=e.map(r=>{const a=document.createElement("div");a.className="room-player";const o=document.createElement("b");o.textContent=r.name;const c=document.createElement("span");return c.textContent=r.id===i.hostId?"HOST // PICKS FIRST":r.isAI?"AI RIVAL // PICKS SECOND":"RIVAL // PICKS SECOND",a.append(o,c),a});if(e.length<2){const r=document.createElement("div");r.className="room-player room-player--empty";const a=document.createElement("b");a.textContent="OPEN SEAT";const o=document.createElement("span");o.textContent="SHARE THE ROOM CODE",r.append(a,o),n.push(r)}k.roomPlayers.replaceChildren(...n);const s=ft?.isHost()===!0&&e.length===2;k.addAI.hidden=ft?.isHost()!==!0||e.length>=2,k.addAI.disabled=!t,k.startRun.disabled=!s,k.startRun.textContent=s?"START SHARED RUN":ft?.isHost()?"WAITING FOR RIVAL":"WAITING FOR HOST",k.roomStatus.textContent=e.length<2?"Room ready. Invite a friend or add an AI rival.":s?"Both drivers connected. Launch when ready.":"Both drivers connected. Waiting for the host."}function Mh(i,e){return`${i.code}:${i.phase}:${i.pickSequence}:${e}`}function Pr(i,e=Qa?wd+Ac:Ac){const t=vs(i).find(r=>r.isAI);if(!!!(t&&i.activePickerId===t.id&&ft?.isHost()===!0&&["starter_draft","vehicle_select","upgrade_draft"].includes(i.phase))||!t){Zn&&window.clearTimeout(Zn),Zn=0,wr="";return}const s=Mh(i,t.id);tc||Zn&&wr===s||(Zn&&window.clearTimeout(Zn),wr=s,R.dataset.aiDraftState="queued",Zn=window.setTimeout(()=>{Zn=0,NE(s)},e))}async function NE(i){const e=qe,t=e&&vs(e).find(n=>n.isAI);if(!e||!t||Mh(e,t.id)!==i||e.activePickerId!==t.id||ft?.isHost()!==!0){wr="";return}if(!tc){tc=!0,R.dataset.aiDraftState="choosing";try{const n=[...e.draftOptions];if(!n.length)throw new Error("The AI has no draft options to choose from.");const s=e.phase==="starter_draft"?["sniper","rocket","mg"].find(r=>n.includes(r))??n[0]:n[Math.floor(Math.random()*n.length)];if(e.phase==="vehicle_select"){if(!vg(s))throw new Error("The AI received an invalid vehicle option.");await ft.submitAiVehiclePick(s,_i[s].label)}else if(e.phase==="starter_draft"){const r=s,a=e.runState?structuredClone(e.runState):ka(r,e.round);e.runState&&Ba(a,zc(r));const o=e.draftTurn===0?["mg","rocket","sniper"]:Object.keys(_i);await ft.submitAiPick({optionId:r,optionName:Md[r],nextRunState:a,nextOptions:o})}else{const r=Hc(e.runState)??ue;if(!r)throw new Error("The AI could not load the shared run state.");const a=Kg(n,r).find(l=>l.id===s);if(!a)throw new Error("The AI could not resolve its selected card.");const o=structuredClone(r);Ba(o,a),o.round=e.round;const c=Yg(e)?Ja(o).map(l=>l.id):[];await ft.submitAiPick({optionId:a.id,optionName:a.name,nextRunState:o,nextOptions:c})}R.dataset.aiDraftState="submitted"}catch(n){ui(n),R.dataset.aiDraftState="retrying"}finally{tc=!1,wr="",window.setTimeout(()=>{qe&&t&&qe.activePickerId===t.id&&Mh(qe,t.id)===i&&Pr(qe,Vp)},Vp)}}}function UE(i){if(!i.runState)return;const e=ue?.activeAbility??"none",t=ue?.cameraMode??ni.mode,n=Hc(i.runState);n&&(ue=structuredClone(n),ue.cameraMode=t,ni.setMode(t),jr(),Et=ue.activeTurret,ue.activeAbility!==e&&(Kc(),An=0),tn&&(ac(),ps(Et,!1),Sd()),R.dataset.runState="shared",R.dataset.roomCode=i.code)}function FE(i){if(!ft)return;const e=i.vehicleSelections?.[ft.playerId];!vg(e)||e===Ha||(Ha=e,tn&&yg(e))}function t0(i){const e=k.starterSelect.hidden?k.vehicleSelect.hidden?"upgrade":"vehicle":"starter",t=e==="starter"?k.starterGrid:e==="vehicle"?k.vehicleGrid:k.cardGrid,n=e==="starter"?k.starterPickReveal:e==="vehicle"?k.vehiclePickReveal:k.draftPickReveal,s=qe?vs(qe).find(r=>r.id===i.playerId):null;Km(t,i.optionId,R),e==="upgrade"&&Td(),n.textContent=`${s?.name??"Driver"} picked ${i.optionName}`,n.hidden=!1,Qa=!0,R.dataset.pickAnimation="deck-shuffle",R.dataset.lastCardChosen=i.optionId,window.setTimeout(n0,wd)}function n0(){Qa=!1;const i=qe;if(!i)return;if(i.phase==="starter_draft"){jc(),Pr(i);return}if(i.phase==="vehicle_select"){$c(),Pr(i);return}if(i.phase==="upgrade_draft"){Zc(),Pr(i);return}if(i.phase!=="playing"||i.round<=nc)return;k.starterSelect.hidden=!0,k.vehicleSelect.hidden=!0,k.cardDraft.hidden=!0,k.weaponSelect.classList.remove("draft-open"),R.dataset.starterSelection="complete",R.dataset.vehicleSelection="complete",R.dataset.cardApplied="true",no();const e=nc===0;nc=i.round,e?(en=i.round,eo(),Ks(!1),Ed(),Cc()):bE(i.round)}function i0(i){if(qe=i,DE(i),!i){Zn&&window.clearTimeout(Zn),Zn=0,wr="";return}if(UE(i),FE(i),i.lastPick&&i.lastPick.id>Rp){Rp=i.lastPick.id,tn&&t0(i.lastPick),Pr(i,tn?wd+Ac:Ac);return}if(Pr(i),!(!tn||Qa)){if(i.phase==="starter_draft"){jc();return}if(i.phase==="vehicle_select"){$c();return}if(i.phase==="upgrade_draft"){Zc();return}i.phase==="playing"&&i.round>nc&&n0()}}async function OE(){const i=localStorage.getItem("rigged-player-name")??"";k.playerName.value=i;const e=ah(new URLSearchParams(location.search).get("room")??"");e&&(k.roomCodeInput.value=e),k.hostRoom.disabled=!0,k.startRun.disabled=!0;try{ft=await ad.connect(),ft.onRoom(i0),k.hostRoom.disabled=!1,k.roomStatus.textContent="Firebase online. Host a room or join a friend."}catch(t){ui(t),k.roomStatus.textContent="Could not connect to Firebase. Check the network and reload.";return}k.hostRoom.addEventListener("click",async()=>{if(!ft)return;k.hostRoom.disabled=!0;const t=vc(k.playerName.value);localStorage.setItem("rigged-player-name",t);try{const n=await ft.createRoom(t),s=new URL(location.href);s.searchParams.set("room",n),history.replaceState(null,"",s),sessionStorage.removeItem(xc),ue=null}catch(n){ui(n),k.hostRoom.disabled=!1}}),k.joinRoomForm.addEventListener("submit",async t=>{if(t.preventDefault(),!ft)return;const n=k.joinRoomForm.querySelector("button");n.disabled=!0;const s=vc(k.playerName.value);localStorage.setItem("rigged-player-name",s);try{const r=await ft.joinRoom(k.roomCodeInput.value,s),a=new URL(location.href);a.searchParams.set("room",r),history.replaceState(null,"",a),sessionStorage.removeItem(xc),ue=null}catch(r){ui(r),n.disabled=!1}}),k.startRun.addEventListener("click",()=>ft?.startRun().catch(ui)),k.addAI.addEventListener("click",()=>{k.addAI.disabled=!0,ft?.addAI().catch(t=>{ui(t),k.addAI.disabled=!1})}),k.roomCodeDisplay.addEventListener("click",()=>{qe&&(navigator.clipboard?.writeText(qe.code).catch(()=>{}),k.roomStatus.textContent="Room code copied.")}),k.roomCodeInput.addEventListener("input",()=>{k.roomCodeInput.value=ah(k.roomCodeInput.value)})}async function kE(i){if(tn||$l)return;$l=!0,pa.size===0&&(Te.children.forEach(t=>pa.add(t)),Gn.forEach(t=>og.add(t))),J=Oc[i],Cn=J.radius,Pt(`ASSEMBLING // ${J.name.toUpperCase()}`),document.querySelectorAll("[data-level]").forEach(t=>t.disabled=!0),await lg(),await hg(),fg(),pg(),AT(),RT(),pa.add(Nt),pa.add(Dt),ac(),J.targets.forEach(t=>bg(t.x,t.z,t.rotation)),yc=!1,eo(),R.dataset.targetsRemaining=String(J.targets.length),R.dataset.prototype="rigged-1v1-combat",R.dataset.audioSystem="pooled-stereo-combat-sfx-v3",R.dataset.arenaLayout=J.id,R.dataset.arenaKind=J.arenaKind,R.dataset.arenaRadius=String(Cn),R.dataset.ringInnerRadius=String(J.ringInnerRadius),R.dataset.ringOuterRadius=String(J.ringOuterRadius),R.dataset.rampColliders=String(Vr.filter(t=>t.kind==="ramp").length),R.dataset.bridgeColliders=String(Vr.filter(t=>t.kind==="bridge").length),R.dataset.heightfieldColliders=String(cs.length),R.dataset.majorColliders=String(Ws.length+$r.length+(J.arenaKind==="capsule"?3:0)),R.dataset.vehicleCollider="three-disc-capsule-2.24x4.14x0.72",R.dataset.shotsFired="0",R.dataset.aiShotsFired="0",R.dataset.fireHeld="false",R.dataset.arenaDrops="disabled",R.dataset.racekartAssets="modular-racekart-track-hilly",R.dataset.racingAssetsUsage=J.arenaKind==="capsule"?"rim-railings":"ramps-fences-props",R.dataset.colliderSource=J.arenaKind==="capsule"?"analytic-capsule-bands":"visual-asset-heightfields",R.dataset.wallRideContact="pending",R.dataset.mapRotation="alternate-in-document",dg(),await eE(),tn=!0,$l=!1,fi=!1,Ks(!1),Ed(),Jc();const e=ls||Cr||Sa||wa||Tc||fd;if(e&&(k.multiplayerLobby.hidden=!0),e&&!ue)ue=ka("mg",en),Et="mg",jr(),ac(),ps("mg",!1),Cc();else if(e&&ue)Et=ue.activeTurret,ac(),ps(Et,!1),Cc();else if(to){ue=ka("mg",2);const t=Ja(ue,{forceAbility:kT});qe={code:"CARDS",hostId:"preview-player",phase:"upgrade_draft",round:2,players:{"preview-player":{name:"Preview Driver",joinedAt:1},rival:{name:"Rival Driver",joinedAt:2}},playerOrder:["preview-player","rival"],activePickerId:"preview-player",draftOptions:t.map(n=>n.id),draftTurn:0,pickSequence:0,lastPick:null,vehicleSelections:{},roundReady:{},runState:ue,createdAt:1,updatedAt:1},k.multiplayerLobby.hidden=!0,Zc()}else if(qc){const t=Ql?"rival":"preview-player";qe={code:"DECK",hostId:"preview-player",phase:"starter_draft",round:1,players:{"preview-player":{name:"Preview Driver",joinedAt:1},rival:{name:"Rival Driver",joinedAt:2}},playerOrder:["preview-player","rival"],activePickerId:t,draftOptions:["mg","rocket","sniper"],draftTurn:Ql?1:0,pickSequence:0,lastPick:null,vehicleSelections:{},roundReady:{},runState:null,createdAt:1,updatedAt:1},k.multiplayerLobby.hidden=!0,jc(),window.setTimeout(()=>{const n={id:1,playerId:t,optionId:"rocket",optionName:"HELLBOX",pickedAt:Date.now()};qe&&!Ql&&(qe={...qe,activePickerId:"rival",draftTurn:1,pickSequence:1,lastPick:n}),t0(n)},1200)}else pd?(qe={code:"PREVIEW",hostId:"preview-player",phase:"vehicle_select",round:1,players:{"preview-player":{name:"Preview Driver",joinedAt:1},rival:{name:"Rival Driver",joinedAt:2}},playerOrder:["preview-player","rival"],activePickerId:"preview-player",draftOptions:Object.keys(_i),draftTurn:0,pickSequence:0,lastPick:null,vehicleSelections:{},roundReady:{},runState:null,createdAt:1,updatedAt:1},k.multiplayerLobby.hidden=!0,$c()):qe&&i0(qe);xs.get("auto")==="1"&&ue&&no(),IE(),lt!=="ended"&&(ls||Cr||Sa||wa||Tc)&&Pt(ls?"RAMP SUITE // AUTO DRIVE":Cr?"ALL RAMPS // AUTO DRIVE":Sa?"WALL-RIDE SUITE // AUTO DRIVE":wa?"HOLD-FIRE SMOKE TEST // COMPLETE":"BOOST STAMINA TEST // COMPLETE")}document.querySelectorAll("[data-weapon]").forEach(i=>{i.addEventListener("click",()=>ps(i.dataset.weapon))});document.querySelectorAll("[data-starter-turret]").forEach(i=>{i.addEventListener("click",()=>{aE(i.dataset.starterTurret)})});ps("mg",!1);eo();const uu=new URLSearchParams(location.search).get("level");!pd&&!qc&&!to&&OE();kE(uu&&uu in Oc?uu:Vm);function BE(i){const e=k.starterSelect.hidden?k.vehicleSelect.hidden?k.cardDraft.hidden?null:k.cardGrid:k.vehicleGrid:k.starterGrid;if(!e)return!1;if(Qa||jm(e))return!0;const t=Array.from(e.querySelectorAll(".starter-card,.upgrade-card,.vehicle-card")).filter(r=>!r.hidden),n=t[i];if(!n)return!0;const s=n.matches("button")?n:n.querySelector("button");return s&&!s.disabled&&(s.click(),R.dataset.keyboardDraftPick=String(i+1)),!0}window.addEventListener("keydown",i=>{if(["KeyW","KeyA","KeyS","KeyD","Space","ShiftLeft","KeyC","KeyQ","KeyF","F3","Digit1","Digit2","Digit3"].includes(i.code)&&i.preventDefault(),!i.repeat&&!(i.code.startsWith("Digit")&&BE(Number(i.code.slice(5))-1))&&tn){if(i.code==="Escape"){if(!k.starterSelect.hidden||!k.vehicleSelect.hidden||!k.cardDraft.hidden)return;e0();return}if(i.code==="KeyC"){AE();return}if(i.code==="KeyQ"){tE();return}if(i.code.startsWith("Digit")){const e=["mg","rocket","sniper"][Number(i.code.slice(5))-1];e&&ps(e);return}i.code==="KeyR"&&Ks(),(i.code==="KeyB"||i.code==="KeyH"||i.code==="F3")&&EE(),i.code==="KeyF"&&cn(!0),rt.add(i.code)}});window.addEventListener("keyup",i=>{rt.delete(i.code),i.code==="KeyF"&&cn(!1)});const zE=Ae("crosshair");let ga=R.getBoundingClientRect(),Sh=innerWidth*.5,wh=innerHeight*.5,bh=!0;function s0(){ga=R.getBoundingClientRect()}function HE(){bh&&(bh=!1,zE.style.transform=`translate3d(${Sh}px,${wh}px,0) translate(-50%,-50%)`)}R.addEventListener("pointerenter",s0);R.addEventListener("pointermove",i=>{const e=i.getCoalescedEvents(),t=e.length?e[e.length-1]:i;Sh=t.clientX,wh=t.clientY,vh.x=(Sh-ga.left)/ga.width*2-1,vh.y=-(wh-ga.top)/ga.height*2+1,bh=!0});R.addEventListener("pointerdown",i=>{i.button===0&&cn(!0)});window.addEventListener("pointerup",i=>{i.button===0&&cn(!1)});R.addEventListener("pointerleave",i=>{i.buttons&1&&cn(!1)});R.addEventListener("wheel",i=>{i.preventDefault(),uE(i.deltaY>0?1:-1)},{passive:!1});window.addEventListener("blur",()=>{rt.clear(),cn(!1)});document.addEventListener("visibilitychange",()=>{document.hidden&&(rt.clear(),cn(!1))});window.addEventListener("keydown",no,{capture:!0});window.addEventListener("pointerdown",no,{capture:!0});R.addEventListener("contextmenu",i=>i.preventDefault());Ae("controls-close").addEventListener("click",()=>TE());Ae("resume-button").addEventListener("click",()=>e0(!1));document.querySelectorAll("[data-key]").forEach(i=>{const e=i.dataset.key??"",t=s=>{s.preventDefault(),e==="Fire"?cn(!0):rt.add(e)},n=s=>{s.preventDefault(),e==="Fire"?cn(!1):rt.delete(e)};i.addEventListener("pointerdown",t),i.addEventListener("pointerup",n),i.addEventListener("pointercancel",n),i.addEventListener("pointerleave",n)});window.addEventListener("resize",()=>{mn.aspect=innerWidth/innerHeight,mn.updateProjectionMatrix(),Mn.setSize(innerWidth,innerHeight,!1),Mn.setPixelRatio(Math.min(devicePixelRatio,ig)),s0()});const VE=new Jv;let Zi=0,hu=0,du=0,dr=1/60,Th=0,qo=!1;function GE(i){if(!Qi||(dr=Re.lerp(dr,i,.08),du+=i,du<.2))return;du=0;const e=dr>0?1/dr:0,t=x.grounded?x.activeRamp?x.activeRamp.kind.toUpperCase():J.arenaKind==="capsule"?"FLAT FLOOR":"TERRAIN":"AIRBORNE",n=J.arenaKind==="capsule"?3:cs.length;k.debug.textContent=`COLLISION DEBUG
${t} // ${(R.dataset.surfaceType??"flat-floor").toUpperCase()} // ${R.dataset.surfaceLabel??"base terrain"}
UP [${R.dataset.carUp??"0.00,1.00,0.00"}]  NORMAL [${R.dataset.surfaceNormal??"0.00,1.00,0.00"}]
SURFACE FWD [${R.dataset.projectedForward??"0.00,0.00,1.00"}]
VELOCITY [${R.dataset.velocityVector??"0.00,0.00,0.00"}]  CONTACT N [${R.dataset.wallContactNormal??"0.00,0.00,0.00"}]
ASSIST ${(R.dataset.wallAssist??"off").toUpperCase()}  DOWNFORCE ${R.dataset.wallDownforce??"0.00"}  ROLL ${Re.radToDeg(x.roll).toFixed(1)}°  PITCH ${Re.radToDeg(x.pitch).toFixed(1)}°
SURFACE ${R.dataset.surfaceHeight??"0.00"}M  BASE ${R.dataset.baseGroundHeight??"0.00"}M  ERROR ${R.dataset.heightMismatch??"0.000"}M
${Math.abs(x.speed*4.2).toFixed(0)} KM/H  ${e.toFixed(0)} FPS  ${(dr*1e3).toFixed(1)} MS FRAME
${Th.toFixed(2)} MS PHYSICS  60 HZ  ${n} COLLIDERS
${Mn.info.render.calls} DRAWS  ${Mn.info.render.triangles.toLocaleString()} TRIS  ${Te.children.length+Fi.length+pi.length} OBJECTS`,R.dataset.physicsFps="60",R.dataset.frameDeltaMs=(dr*1e3).toFixed(2),R.dataset.physicsStepMs=Th.toFixed(2)}function r0(){requestAnimationFrame(r0);const i=Math.min(VE.getDelta(),yT);if(HE(),!k.multiplayerLobby.hidden||!k.starterSelect.hidden||!k.vehicleSelect.hidden||!k.cardDraft.hidden||!k.pause.hidden||document.hidden){Zi=0,qo||(qo=!0,uc=0,Ht.volume=0,R.dataset.renderMode="overlay-suspended");return}if(qo&&(qo=!1,R.dataset.renderMode="live"),!fi&&tn&&ME(),Xc.rotation.y+=i*.0025,ud.rotation.y-=i*.0015,VT(i),!fi&&tn){if(lt==="active"){Zi=Math.min(Zi+i,zt*Lp);const t=performance.now();let n=0;for(;Zi>=zt&&n<Lp;)Jg(),ms+=zt,nE(zt),Ys(zt),pE(zt),Xg(zt),qp(zt),Zi-=zt,n++;Th=performance.now()-t,yE(Zi/zt)}else Zi=0,lt==="ended"&&qp(i);xE(i),Kp(),mE(i),hu+=i,hu>.1&&(hu=0,jg())}else Zi=0;(!tn||fi)&&Kp(),Mn.render(Te,mn),GE(i)}r0();function Ae(i){const e=document.getElementById(i);if(!e)throw new Error(`Missing #${i}`);return e}
