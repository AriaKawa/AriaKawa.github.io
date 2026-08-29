(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const zu="179",$m=0,Vh=1,Zm=2,Hu=1,Jm=2,vi=3,si=0,gn=1,Ht=2,Ki=0,nr=1,pr=2,Gh=3,Wh=4,Qm=5,vs=100,eg=101,tg=102,ng=103,ig=104,sg=200,rg=201,ag=202,og=203,Il=204,Dl=205,cg=206,lg=207,ug=208,hg=209,dg=210,fg=211,pg=212,mg=213,gg=214,Nl=0,Ul=1,Fl=2,mr=3,Ol=4,Bl=5,kl=6,zl=7,Vu=0,_g=1,xg=2,ji=0,vg=1,yg=2,Mg=3,Kf=4,Sg=5,wg=6,bg=7,Xh="attached",Eg="detached",jf=300,gr=301,_r=302,Fo=303,Hl=304,tc=306,es=1e3,Gi=1001,Oo=1002,hn=1003,$f=1004,Kr=1005,En=1006,Mo=1007,wi=1008,ri=1009,Zf=1010,Jf=1011,oa=1012,Gu=1013,Ts=1014,jn=1015,ba=1016,Wu=1017,Xu=1018,ca=1020,Qf=35902,ep=1021,tp=1022,Fn=1023,la=1026,ua=1027,qu=1028,Yu=1029,np=1030,Ku=1031,ju=1033,So=33776,wo=33777,bo=33778,Eo=33779,Vl=35840,Gl=35841,Wl=35842,Xl=35843,ql=36196,Yl=37492,Kl=37496,jl=37808,$l=37809,Zl=37810,Jl=37811,Ql=37812,eu=37813,tu=37814,nu=37815,iu=37816,su=37817,ru=37818,au=37819,ou=37820,cu=37821,To=36492,lu=36494,uu=36495,ip=36283,hu=36284,du=36285,fu=36286,ha=2300,da=2301,vc=2302,qh=2400,Yh=2401,Kh=2402,Tg=2500,Ag=0,sp=1,pu=2,Rg=3200,Cg=3201,$u=0,Pg=1,Vi="",Tt="srgb",dn="srgb-linear",Bo="linear",mt="srgb",Os=7680,jh=519,Lg=512,Ig=513,Dg=514,rp=515,Ng=516,Ug=517,Fg=518,Og=519,mu=35044,$h="300 es",ni=2e3,ko=2001;class Ar{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Zh=1234567;const Qr=Math.PI/180,xr=180/Math.PI;function Bn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]+"-"+tn[e&255]+tn[e>>8&255]+"-"+tn[e>>16&15|64]+tn[e>>24&255]+"-"+tn[t&63|128]+tn[t>>8&255]+"-"+tn[t>>16&255]+tn[t>>24&255]+tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]).toLowerCase()}function Ze(i,e,t){return Math.max(e,Math.min(t,i))}function Zu(i,e){return(i%e+e)%e}function Bg(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function kg(i,e,t){return i!==e?(t-i)/(e-i):0}function ea(i,e,t){return(1-t)*i+t*e}function zg(i,e,t,n){return ea(i,e,1-Math.exp(-t*n))}function Hg(i,e=1){return e-Math.abs(Zu(i,e*2)-e)}function Vg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Gg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Wg(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Xg(i,e){return i+Math.random()*(e-i)}function qg(i){return i*(.5-Math.random())}function Yg(i){i!==void 0&&(Zh=i);let e=Zh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Kg(i){return i*Qr}function jg(i){return i*xr}function $g(i){return(i&i-1)===0&&i!==0}function Zg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Jg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Qg(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),m=a((n-e)/2);switch(s){case"XYX":i.set(o*u,c*h,c*d,o*l);break;case"YZY":i.set(c*d,o*u,c*h,o*l);break;case"ZXZ":i.set(c*h,c*d,o*u,o*l);break;case"XZX":i.set(o*u,c*m,c*f,o*l);break;case"YXY":i.set(c*f,o*u,c*m,o*l);break;case"ZYZ":i.set(c*m,c*f,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function qn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function dt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Re={DEG2RAD:Qr,RAD2DEG:xr,generateUUID:Bn,clamp:Ze,euclideanModulo:Zu,mapLinear:Bg,inverseLerp:kg,lerp:ea,damp:zg,pingpong:Hg,smoothstep:Vg,smootherstep:Gg,randInt:Wg,randFloat:Xg,randFloatSpread:qg,seededRandom:Yg,degToRad:Kg,radToDeg:jg,isPowerOfTwo:$g,ceilPowerOfTwo:Zg,floorPowerOfTwo:Jg,setQuaternionFromProperEuler:Qg,normalize:dt,denormalize:qn};class ue{constructor(e=0,t=0){ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Hn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3];const d=r[a+0],f=r[a+1],m=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=_;return}if(h!==_||c!==d||l!==f||u!==m){let g=1-o;const p=c*d+l*f+u*m+h*_,y=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const R=Math.sqrt(S),A=Math.atan2(R,p*y);g=Math.sin(g*A)/R,o=Math.sin(o*A)/R}const x=o*y;if(c=c*g+d*x,l=l*g+f*x,u=u*g+m*x,h=h*g+_*x,g===1-o){const R=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=R,l*=R,u*=R,h*=R}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[a],d=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+u*h+c*f-l*d,e[t+1]=c*m+u*d+l*h-o*f,e[t+2]=l*m+u*f+o*d-c*h,e[t+3]=u*m-o*h-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),h=o(r/2),d=c(n/2),f=c(s/2),m=c(r/2);switch(a){case"XYZ":this._x=d*u*h+l*f*m,this._y=l*f*h-d*u*m,this._z=l*u*m+d*f*h,this._w=l*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+l*f*m,this._y=l*f*h-d*u*m,this._z=l*u*m-d*f*h,this._w=l*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-l*f*m,this._y=l*f*h+d*u*m,this._z=l*u*m+d*f*h,this._w=l*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-l*f*m,this._y=l*f*h+d*u*m,this._z=l*u*m-d*f*h,this._w=l*u*h+d*f*m;break;case"YZX":this._x=d*u*h+l*f*m,this._y=l*f*h+d*u*m,this._z=l*u*m-d*f*h,this._w=l*u*h-d*f*m;break;case"XZY":this._x=d*u*h-l*f*m,this._y=l*f*h-d*u*m,this._z=l*u*m+d*f*h,this._w=l*u*h+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-t)*u)/l,d=Math.sin(t*u)/l;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(e=0,t=0,n=0){T.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Jh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Jh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),u=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=s+c*h+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return yc.copy(this).projectOnVector(e),this.sub(yc)}reflect(e){return this.sub(yc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const yc=new T,Jh=new Hn;class Ye{constructor(e,t,n,s,r,a,o,c,l){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],f=n[5],m=n[8],_=s[0],g=s[3],p=s[6],y=s[1],S=s[4],x=s[7],R=s[2],A=s[5],P=s[8];return r[0]=a*_+o*y+c*R,r[3]=a*g+o*S+c*A,r[6]=a*p+o*x+c*P,r[1]=l*_+u*y+h*R,r[4]=l*g+u*S+h*A,r[7]=l*p+u*x+h*P,r[2]=d*_+f*y+m*R,r[5]=d*g+f*S+m*A,r[8]=d*p+f*x+m*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,d=o*c-u*r,f=l*r-a*c,m=t*h+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=h*_,e[1]=(s*l-u*n)*_,e[2]=(o*n-s*a)*_,e[3]=d*_,e[4]=(u*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Mc.makeScale(e,t)),this}rotate(e){return this.premultiply(Mc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Mc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Mc=new Ye;function ap(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function fa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function e0(){const i=fa("canvas");return i.style.display="block",i}const Qh={};function ir(i){i in Qh||(Qh[i]=!0,console.warn(i))}function t0(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const ed=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),td=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function n0(){const i={enabled:!0,workingColorSpace:dn,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===mt&&(s.r=Ai(s.r),s.g=Ai(s.g),s.b=Ai(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===mt&&(s.r=sr(s.r),s.g=sr(s.g),s.b=sr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Vi?Bo:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ir("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ir("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[dn]:{primaries:e,whitePoint:n,transfer:Bo,toXYZ:ed,fromXYZ:td,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Tt},outputColorSpaceConfig:{drawingBufferColorSpace:Tt}},[Tt]:{primaries:e,whitePoint:n,transfer:mt,toXYZ:ed,fromXYZ:td,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Tt}}}),i}const Je=n0();function Ai(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function sr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Bs;class i0{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Bs===void 0&&(Bs=fa("canvas")),Bs.width=e.width,Bs.height=e.height;const s=Bs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Bs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=fa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ai(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ai(t[n]/255)*255):t[n]=Ai(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let s0=0;class Ju{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:s0++}),this.uuid=Bn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Sc(s[a].image)):r.push(Sc(s[a]))}else r=Sc(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Sc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?i0.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let r0=0;const wc=new T;class Qt extends Ar{constructor(e=Qt.DEFAULT_IMAGE,t=Qt.DEFAULT_MAPPING,n=Gi,s=Gi,r=En,a=wi,o=Fn,c=ri,l=Qt.DEFAULT_ANISOTROPY,u=Vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:r0++}),this.uuid=Bn(),this.name="",this.source=new Ju(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(wc).x}get height(){return this.source.getSize(wc).y}get depth(){return this.source.getSize(wc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==jf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case es:e.x=e.x-Math.floor(e.x);break;case Gi:e.x=e.x<0?0:1;break;case Oo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case es:e.y=e.y-Math.floor(e.y);break;case Gi:e.y=e.y<0?0:1;break;case Oo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=jf;Qt.DEFAULT_ANISOTROPY=1;class ut{constructor(e=0,t=0,n=0,s=1){ut.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,x=(f+1)/2,R=(p+1)/2,A=(u+d)/4,P=(h+_)/4,N=(m+g)/4;return S>x&&S>R?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=A/n,r=P/n):x>R?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=A/s,r=N/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=P/r,s=N/r),this.set(n,s,r,t),this}let y=Math.sqrt((g-m)*(g-m)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(h-_)/y,this.z=(d-u)/y,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class a0 extends Ar{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:En,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new Qt(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:En,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ju(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class As extends a0{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class op extends Qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=hn,this.minFilter=hn,this.wrapR=Gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class o0 extends Qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=hn,this.minFilter=hn,this.wrapR=Gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cn{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Gn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Gn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Gn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Gn):Gn.fromBufferAttribute(r,a),Gn.applyMatrix4(e.matrixWorld),this.expandByPoint(Gn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Fa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Fa.copy(n.boundingBox)),Fa.applyMatrix4(e.matrixWorld),this.union(Fa)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Gn),Gn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Or),Oa.subVectors(this.max,Or),ks.subVectors(e.a,Or),zs.subVectors(e.b,Or),Hs.subVectors(e.c,Or),Di.subVectors(zs,ks),Ni.subVectors(Hs,zs),os.subVectors(ks,Hs);let t=[0,-Di.z,Di.y,0,-Ni.z,Ni.y,0,-os.z,os.y,Di.z,0,-Di.x,Ni.z,0,-Ni.x,os.z,0,-os.x,-Di.y,Di.x,0,-Ni.y,Ni.x,0,-os.y,os.x,0];return!bc(t,ks,zs,Hs,Oa)||(t=[1,0,0,0,1,0,0,0,1],!bc(t,ks,zs,Hs,Oa))?!1:(Ba.crossVectors(Di,Ni),t=[Ba.x,Ba.y,Ba.z],bc(t,ks,zs,Hs,Oa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Gn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Gn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ui),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ui=[new T,new T,new T,new T,new T,new T,new T,new T],Gn=new T,Fa=new Cn,ks=new T,zs=new T,Hs=new T,Di=new T,Ni=new T,os=new T,Or=new T,Oa=new T,Ba=new T,cs=new T;function bc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){cs.fromArray(i,r);const o=s.x*Math.abs(cs.x)+s.y*Math.abs(cs.y)+s.z*Math.abs(cs.z),c=e.dot(cs),l=t.dot(cs),u=n.dot(cs);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const c0=new Cn,Br=new T,Ec=new T;class ai{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):c0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Br.subVectors(e,this.center);const t=Br.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Br,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ec.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Br.copy(e.center).add(Ec)),this.expandByPoint(Br.copy(e.center).sub(Ec))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const hi=new T,Tc=new T,ka=new T,Ui=new T,Ac=new T,za=new T,Rc=new T;class Ea{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=hi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hi.copy(this.origin).addScaledVector(this.direction,t),hi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Tc.copy(e).add(t).multiplyScalar(.5),ka.copy(t).sub(e).normalize(),Ui.copy(this.origin).sub(Tc);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ka),o=Ui.dot(this.direction),c=-Ui.dot(ka),l=Ui.lengthSq(),u=Math.abs(1-a*a);let h,d,f,m;if(u>0)if(h=a*c-o,d=a*o-c,m=r*u,h>=0)if(d>=-m)if(d<=m){const _=1/u;h*=_,d*=_,f=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d<=-m?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l):d<=m?(h=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Tc).addScaledVector(ka,d),f}intersectSphere(e,t){hi.subVectors(e.center,this.origin);const n=hi.dot(this.direction),s=hi.dot(hi)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,hi)!==null}intersectTriangle(e,t,n,s,r){Ac.subVectors(t,e),za.subVectors(n,e),Rc.crossVectors(Ac,za);let a=this.direction.dot(Rc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ui.subVectors(this.origin,e);const c=o*this.direction.dot(za.crossVectors(Ui,za));if(c<0)return null;const l=o*this.direction.dot(Ac.cross(Ui));if(l<0||c+l>a)return null;const u=-o*Ui.dot(Rc);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Xe{constructor(e,t,n,s,r,a,o,c,l,u,h,d,f,m,_,g){Xe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,u,h,d,f,m,_,g)}set(e,t,n,s,r,a,o,c,l,u,h,d,f,m,_,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Vs.setFromMatrixColumn(e,0).length(),r=1/Vs.setFromMatrixColumn(e,1).length(),a=1/Vs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=a*u,f=a*h,m=o*u,_=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=f+m*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=m+f*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*u,f=c*h,m=l*u,_=l*h;t[0]=d+_*o,t[4]=m*o-f,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-m,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*u,f=c*h,m=l*u,_=l*h;t[0]=d-_*o,t[4]=-a*h,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*u,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*u,f=a*h,m=o*u,_=o*h;t[0]=c*u,t[4]=m*l-f,t[8]=d*l+_,t[1]=c*h,t[5]=_*l+d,t[9]=f*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,f=a*l,m=o*c,_=o*l;t[0]=c*u,t[4]=_-d*h,t[8]=m*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=f*h+m,t[10]=d-_*h}else if(e.order==="XZY"){const d=a*c,f=a*l,m=o*c,_=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=d*h+_,t[5]=a*u,t[9]=f*h-m,t[2]=m*h-f,t[6]=o*u,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(l0,e,u0)}lookAt(e,t,n){const s=this.elements;return Mn.subVectors(e,t),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),Fi.crossVectors(n,Mn),Fi.lengthSq()===0&&(Math.abs(n.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),Fi.crossVectors(n,Mn)),Fi.normalize(),Ha.crossVectors(Mn,Fi),s[0]=Fi.x,s[4]=Ha.x,s[8]=Mn.x,s[1]=Fi.y,s[5]=Ha.y,s[9]=Mn.y,s[2]=Fi.z,s[6]=Ha.z,s[10]=Mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],y=n[3],S=n[7],x=n[11],R=n[15],A=s[0],P=s[4],N=s[8],b=s[12],E=s[1],I=s[5],H=s[9],V=s[13],X=s[2],Q=s[6],j=s[10],ee=s[14],G=s[3],de=s[7],_e=s[11],Le=s[15];return r[0]=a*A+o*E+c*X+l*G,r[4]=a*P+o*I+c*Q+l*de,r[8]=a*N+o*H+c*j+l*_e,r[12]=a*b+o*V+c*ee+l*Le,r[1]=u*A+h*E+d*X+f*G,r[5]=u*P+h*I+d*Q+f*de,r[9]=u*N+h*H+d*j+f*_e,r[13]=u*b+h*V+d*ee+f*Le,r[2]=m*A+_*E+g*X+p*G,r[6]=m*P+_*I+g*Q+p*de,r[10]=m*N+_*H+g*j+p*_e,r[14]=m*b+_*V+g*ee+p*Le,r[3]=y*A+S*E+x*X+R*G,r[7]=y*P+S*I+x*Q+R*de,r[11]=y*N+S*H+x*j+R*_e,r[15]=y*b+S*V+x*ee+R*Le,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],d=e[10],f=e[14],m=e[3],_=e[7],g=e[11],p=e[15];return m*(+r*c*h-s*l*h-r*o*d+n*l*d+s*o*f-n*c*f)+_*(+t*c*f-t*l*d+r*a*d-s*a*f+s*l*u-r*c*u)+g*(+t*l*h-t*o*f-r*a*h+n*a*f+r*o*u-n*l*u)+p*(-s*o*u-t*c*h+t*o*d+s*a*h-n*a*d+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],d=e[10],f=e[11],m=e[12],_=e[13],g=e[14],p=e[15],y=h*g*l-_*d*l+_*c*f-o*g*f-h*c*p+o*d*p,S=m*d*l-u*g*l-m*c*f+a*g*f+u*c*p-a*d*p,x=u*_*l-m*h*l+m*o*f-a*_*f-u*o*p+a*h*p,R=m*h*c-u*_*c-m*o*d+a*_*d+u*o*g-a*h*g,A=t*y+n*S+s*x+r*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/A;return e[0]=y*P,e[1]=(_*d*r-h*g*r-_*s*f+n*g*f+h*s*p-n*d*p)*P,e[2]=(o*g*r-_*c*r+_*s*l-n*g*l-o*s*p+n*c*p)*P,e[3]=(h*c*r-o*d*r-h*s*l+n*d*l+o*s*f-n*c*f)*P,e[4]=S*P,e[5]=(u*g*r-m*d*r+m*s*f-t*g*f-u*s*p+t*d*p)*P,e[6]=(m*c*r-a*g*r-m*s*l+t*g*l+a*s*p-t*c*p)*P,e[7]=(a*d*r-u*c*r+u*s*l-t*d*l-a*s*f+t*c*f)*P,e[8]=x*P,e[9]=(m*h*r-u*_*r-m*n*f+t*_*f+u*n*p-t*h*p)*P,e[10]=(a*_*r-m*o*r+m*n*l-t*_*l-a*n*p+t*o*p)*P,e[11]=(u*o*r-a*h*r-u*n*l+t*h*l+a*n*f-t*o*f)*P,e[12]=R*P,e[13]=(u*_*s-m*h*s+m*n*d-t*_*d-u*n*g+t*h*g)*P,e[14]=(m*o*s-a*_*s-m*n*c+t*_*c+a*n*g-t*o*g)*P,e[15]=(a*h*s-u*o*s+u*n*c-t*h*c-a*n*d+t*o*d)*P,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,h=o+o,d=r*l,f=r*u,m=r*h,_=a*u,g=a*h,p=o*h,y=c*l,S=c*u,x=c*h,R=n.x,A=n.y,P=n.z;return s[0]=(1-(_+p))*R,s[1]=(f+x)*R,s[2]=(m-S)*R,s[3]=0,s[4]=(f-x)*A,s[5]=(1-(d+p))*A,s[6]=(g+y)*A,s[7]=0,s[8]=(m+S)*P,s[9]=(g-y)*P,s[10]=(1-(d+_))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Vs.set(s[0],s[1],s[2]).length();const a=Vs.set(s[4],s[5],s[6]).length(),o=Vs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Wn.copy(this);const l=1/r,u=1/a,h=1/o;return Wn.elements[0]*=l,Wn.elements[1]*=l,Wn.elements[2]*=l,Wn.elements[4]*=u,Wn.elements[5]*=u,Wn.elements[6]*=u,Wn.elements[8]*=h,Wn.elements[9]*=h,Wn.elements[10]*=h,t.setFromRotationMatrix(Wn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=ni,c=!1){const l=this.elements,u=2*r/(t-e),h=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s);let m,_;if(c)m=r/(a-r),_=a*r/(a-r);else if(o===ni)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===ko)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=ni,c=!1){const l=this.elements,u=2/(t-e),h=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s);let m,_;if(c)m=1/(a-r),_=a/(a-r);else if(o===ni)m=-2/(a-r),_=-(a+r)/(a-r);else if(o===ko)m=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=h,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Vs=new T,Wn=new Xe,l0=new T(0,0,0),u0=new T(1,1,1),Fi=new T,Ha=new T,Mn=new T,nd=new Xe,id=new Hn;class zn{constructor(e=0,t=0,n=0,s=zn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return nd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return id.setFromEuler(this),this.setFromQuaternion(id,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}zn.DEFAULT_ORDER="XYZ";class Qu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let h0=0;const sd=new T,Gs=new Hn,di=new Xe,Va=new T,kr=new T,d0=new T,f0=new Hn,rd=new T(1,0,0),ad=new T(0,1,0),od=new T(0,0,1),cd={type:"added"},p0={type:"removed"},Ws={type:"childadded",child:null},Cc={type:"childremoved",child:null};class vt extends Ar{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:h0++}),this.uuid=Bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vt.DEFAULT_UP.clone();const e=new T,t=new zn,n=new Hn,s=new T(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Xe},normalMatrix:{value:new Ye}}),this.matrix=new Xe,this.matrixWorld=new Xe,this.matrixAutoUpdate=vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Gs.setFromAxisAngle(e,t),this.quaternion.multiply(Gs),this}rotateOnWorldAxis(e,t){return Gs.setFromAxisAngle(e,t),this.quaternion.premultiply(Gs),this}rotateX(e){return this.rotateOnAxis(rd,e)}rotateY(e){return this.rotateOnAxis(ad,e)}rotateZ(e){return this.rotateOnAxis(od,e)}translateOnAxis(e,t){return sd.copy(e).applyQuaternion(this.quaternion),this.position.add(sd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(rd,e)}translateY(e){return this.translateOnAxis(ad,e)}translateZ(e){return this.translateOnAxis(od,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(di.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Va.copy(e):Va.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),kr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?di.lookAt(kr,Va,this.up):di.lookAt(Va,kr,this.up),this.quaternion.setFromRotationMatrix(di),s&&(di.extractRotation(s.matrixWorld),Gs.setFromRotationMatrix(di),this.quaternion.premultiply(Gs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(cd),Ws.child=e,this.dispatchEvent(Ws),Ws.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(p0),Cc.child=e,this.dispatchEvent(Cc),Cc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),di.multiply(e.parent.matrixWorld)),e.applyMatrix4(di),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(cd),Ws.child=e,this.dispatchEvent(Ws),Ws.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kr,e,d0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kr,f0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}vt.DEFAULT_UP=new T(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Xn=new T,fi=new T,Pc=new T,pi=new T,Xs=new T,qs=new T,ld=new T,Lc=new T,Ic=new T,Dc=new T,Nc=new ut,Uc=new ut,Fc=new ut;class Yn{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Xn.subVectors(e,t),s.cross(Xn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Xn.subVectors(s,t),fi.subVectors(n,t),Pc.subVectors(e,t);const a=Xn.dot(Xn),o=Xn.dot(fi),c=Xn.dot(Pc),l=fi.dot(fi),u=fi.dot(Pc),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(l*c-o*u)*d,m=(a*u-o*c)*d;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,pi)===null?!1:pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,pi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,pi.x),c.addScaledVector(a,pi.y),c.addScaledVector(o,pi.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Nc.setScalar(0),Uc.setScalar(0),Fc.setScalar(0),Nc.fromBufferAttribute(e,t),Uc.fromBufferAttribute(e,n),Fc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Nc,r.x),a.addScaledVector(Uc,r.y),a.addScaledVector(Fc,r.z),a}static isFrontFacing(e,t,n,s){return Xn.subVectors(n,t),fi.subVectors(e,t),Xn.cross(fi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xn.subVectors(this.c,this.b),fi.subVectors(this.a,this.b),Xn.cross(fi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Yn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Yn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Yn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Yn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Yn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Xs.subVectors(s,n),qs.subVectors(r,n),Lc.subVectors(e,n);const c=Xs.dot(Lc),l=qs.dot(Lc);if(c<=0&&l<=0)return t.copy(n);Ic.subVectors(e,s);const u=Xs.dot(Ic),h=qs.dot(Ic);if(u>=0&&h<=u)return t.copy(s);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Xs,a);Dc.subVectors(e,r);const f=Xs.dot(Dc),m=qs.dot(Dc);if(m>=0&&f<=m)return t.copy(r);const _=f*l-c*m;if(_<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(qs,o);const g=u*m-f*h;if(g<=0&&h-u>=0&&f-m>=0)return ld.subVectors(r,s),o=(h-u)/(h-u+(f-m)),t.copy(s).addScaledVector(ld,o);const p=1/(g+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(Xs,a).addScaledVector(qs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const cp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Oi={h:0,s:0,l:0},Ga={h:0,s:0,l:0};function Oc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ve{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Tt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Je.workingColorSpace){return this.r=e,this.g=t,this.b=n,Je.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Je.workingColorSpace){if(e=Zu(e,1),t=Ze(t,0,1),n=Ze(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Oc(a,r,e+1/3),this.g=Oc(a,r,e),this.b=Oc(a,r,e-1/3)}return Je.colorSpaceToWorking(this,s),this}setStyle(e,t=Tt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Tt){const n=cp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ai(e.r),this.g=Ai(e.g),this.b=Ai(e.b),this}copyLinearToSRGB(e){return this.r=sr(e.r),this.g=sr(e.g),this.b=sr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tt){return Je.workingToColorSpace(nn.copy(this),e),Math.round(Ze(nn.r*255,0,255))*65536+Math.round(Ze(nn.g*255,0,255))*256+Math.round(Ze(nn.b*255,0,255))}getHexString(e=Tt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.workingToColorSpace(nn.copy(this),t);const n=nn.r,s=nn.g,r=nn.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Je.workingColorSpace){return Je.workingToColorSpace(nn.copy(this),t),e.r=nn.r,e.g=nn.g,e.b=nn.b,e}getStyle(e=Tt){Je.workingToColorSpace(nn.copy(this),e);const t=nn.r,n=nn.g,s=nn.b;return e!==Tt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Oi),this.setHSL(Oi.h+e,Oi.s+t,Oi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Oi),e.getHSL(Ga);const n=ea(Oi.h,Ga.h,t),s=ea(Oi.s,Ga.s,t),r=ea(Oi.l,Ga.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const nn=new ve;ve.NAMES=cp;let m0=0;class An extends Ar{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:m0++}),this.uuid=Bn(),this.name="",this.type="Material",this.blending=nr,this.side=si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Il,this.blendDst=Dl,this.blendEquation=vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ve(0,0,0),this.blendAlpha=0,this.depthFunc=mr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Os,this.stencilZFail=Os,this.stencilZPass=Os,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==nr&&(n.blending=this.blending),this.side!==si&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Il&&(n.blendSrc=this.blendSrc),this.blendDst!==Dl&&(n.blendDst=this.blendDst),this.blendEquation!==vs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==mr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Os&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Os&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Os&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class et extends An{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=Vu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Bt=new T,Wa=new ue;let g0=0;class Xt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:g0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=mu,this.updateRanges=[],this.gpuType=jn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Wa.fromBufferAttribute(this,t),Wa.applyMatrix3(e),this.setXY(t,Wa.x,Wa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=qn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=dt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=qn(t,this.array)),t}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=qn(t,this.array)),t}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=qn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=qn(t,this.array)),t}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),s=dt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),s=dt(s,this.array),r=dt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==mu&&(e.usage=this.usage),e}}class lp extends Xt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class up extends Xt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ve extends Xt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let _0=0;const In=new Xe,Bc=new vt,Ys=new T,Sn=new Cn,zr=new Cn,Zt=new T;class wt extends Ar{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_0++}),this.uuid=Bn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ap(e)?up:lp)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ye().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,t,n){return In.makeTranslation(e,t,n),this.applyMatrix4(In),this}scale(e,t,n){return In.makeScale(e,t,n),this.applyMatrix4(In),this}lookAt(e){return Bc.lookAt(e),Bc.updateMatrix(),this.applyMatrix4(Bc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ys).negate(),this.translate(Ys.x,Ys.y,Ys.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ve(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Sn.setFromBufferAttribute(r),this.morphTargetsRelative?(Zt.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(Zt),Zt.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(Zt)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ai);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new T,1/0);return}if(e){const n=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];zr.setFromBufferAttribute(o),this.morphTargetsRelative?(Zt.addVectors(Sn.min,zr.min),Sn.expandByPoint(Zt),Zt.addVectors(Sn.max,zr.max),Sn.expandByPoint(Zt)):(Sn.expandByPoint(zr.min),Sn.expandByPoint(zr.max))}Sn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Zt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Zt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Zt.fromBufferAttribute(o,l),c&&(Ys.fromBufferAttribute(e,l),Zt.add(Ys)),s=Math.max(s,n.distanceToSquared(Zt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Xt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let N=0;N<n.count;N++)o[N]=new T,c[N]=new T;const l=new T,u=new T,h=new T,d=new ue,f=new ue,m=new ue,_=new T,g=new T;function p(N,b,E){l.fromBufferAttribute(n,N),u.fromBufferAttribute(n,b),h.fromBufferAttribute(n,E),d.fromBufferAttribute(r,N),f.fromBufferAttribute(r,b),m.fromBufferAttribute(r,E),u.sub(l),h.sub(l),f.sub(d),m.sub(d);const I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(I),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(I),o[N].add(_),o[b].add(_),o[E].add(_),c[N].add(g),c[b].add(g),c[E].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let N=0,b=y.length;N<b;++N){const E=y[N],I=E.start,H=E.count;for(let V=I,X=I+H;V<X;V+=3)p(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const S=new T,x=new T,R=new T,A=new T;function P(N){R.fromBufferAttribute(s,N),A.copy(R);const b=o[N];S.copy(b),S.sub(R.multiplyScalar(R.dot(b))).normalize(),x.crossVectors(A,b);const I=x.dot(c[N])<0?-1:1;a.setXYZW(N,S.x,S.y,S.z,I)}for(let N=0,b=y.length;N<b;++N){const E=y[N],I=E.start,H=E.count;for(let V=I,X=I+H;V<X;V+=3)P(e.getX(V+0)),P(e.getX(V+1)),P(e.getX(V+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Xt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new T,r=new T,a=new T,o=new T,c=new T,l=new T,u=new T,h=new T;if(e)for(let d=0,f=e.count;d<f;d+=3){const m=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),o.add(u),c.add(u),l.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Zt.fromBufferAttribute(e,t),Zt.normalize(),e.setXYZ(t,Zt.x,Zt.y,Zt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u);let f=0,m=0;for(let _=0,g=c.length;_<g;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*u;for(let p=0;p<u;p++)d[m++]=l[f++]}return new Xt(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new wt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const d=l[u],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const f=l[h];u.push(f.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ud=new Xe,ls=new Ea,Xa=new ai,hd=new T,qa=new T,Ya=new T,Ka=new T,kc=new T,ja=new T,dd=new T,$a=new T;class $ extends vt{constructor(e=new wt,t=new et){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){ja.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(kc.fromBufferAttribute(h,e),a?ja.addScaledVector(kc,u):ja.addScaledVector(kc.sub(t),u))}t.add(ja)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xa.copy(n.boundingSphere),Xa.applyMatrix4(r),ls.copy(e.ray).recast(e.near),!(Xa.containsPoint(ls.origin)===!1&&(ls.intersectSphere(Xa,hd)===null||ls.origin.distanceToSquared(hd)>(e.far-e.near)**2))&&(ud.copy(r).invert(),ls.copy(e.ray).applyMatrix4(ud),!(n.boundingBox!==null&&ls.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ls)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a[g.materialIndex],y=Math.max(g.start,f.start),S=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let x=y,R=S;x<R;x+=3){const A=o.getX(x),P=o.getX(x+1),N=o.getX(x+2);s=Za(this,p,e,n,l,u,h,A,P,N),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const y=o.getX(g),S=o.getX(g+1),x=o.getX(g+2);s=Za(this,a,e,n,l,u,h,y,S,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a[g.materialIndex],y=Math.max(g.start,f.start),S=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let x=y,R=S;x<R;x+=3){const A=x,P=x+1,N=x+2;s=Za(this,p,e,n,l,u,h,A,P,N),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const y=g,S=g+1,x=g+2;s=Za(this,a,e,n,l,u,h,y,S,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function x0(i,e,t,n,s,r,a,o){let c;if(e.side===gn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===si,o),c===null)return null;$a.copy(o),$a.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo($a);return l<t.near||l>t.far?null:{distance:l,point:$a.clone(),object:i}}function Za(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,qa),i.getVertexPosition(c,Ya),i.getVertexPosition(l,Ka);const u=x0(i,e,t,n,qa,Ya,Ka,dd);if(u){const h=new T;Yn.getBarycoord(dd,qa,Ya,Ka,h),s&&(u.uv=Yn.getInterpolatedAttribute(s,o,c,l,h,new ue)),r&&(u.uv1=Yn.getInterpolatedAttribute(r,o,c,l,h,new ue)),a&&(u.normal=Yn.getInterpolatedAttribute(a,o,c,l,h,new T),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new T,materialIndex:0};Yn.getNormal(qa,Ya,Ka,d.normal),u.face=d,u.barycoord=h}return u}class st extends wt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let d=0,f=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Ve(l,3)),this.setAttribute("normal",new Ve(u,3)),this.setAttribute("uv",new Ve(h,2));function m(_,g,p,y,S,x,R,A,P,N,b){const E=x/P,I=R/N,H=x/2,V=R/2,X=A/2,Q=P+1,j=N+1;let ee=0,G=0;const de=new T;for(let _e=0;_e<j;_e++){const Le=_e*I-V;for(let je=0;je<Q;je++){const At=je*E-H;de[_]=At*y,de[g]=Le*S,de[p]=X,l.push(de.x,de.y,de.z),de[_]=0,de[g]=0,de[p]=A>0?1:-1,u.push(de.x,de.y,de.z),h.push(je/P),h.push(1-_e/N),ee+=1}}for(let _e=0;_e<N;_e++)for(let Le=0;Le<P;Le++){const je=d+Le+Q*_e,At=d+Le+Q*(_e+1),_t=d+(Le+1)+Q*(_e+1),Y=d+(Le+1)+Q*_e;c.push(je,At,Y),c.push(At,_t,Y),G+=6}o.addGroup(f,G,b),f+=G,d+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new st(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function vr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function cn(i){const e={};for(let t=0;t<i.length;t++){const n=vr(i[t]);for(const s in n)e[s]=n[s]}return e}function v0(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function hp(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}const y0={clone:vr,merge:cn};var M0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,S0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ci extends An{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=M0,this.fragmentShader=S0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vr(e.uniforms),this.uniformsGroups=v0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class dp extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Xe,this.projectionMatrix=new Xe,this.projectionMatrixInverse=new Xe,this.coordinateSystem=ni,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Bi=new T,fd=new ue,pd=new ue;class un extends dp{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=xr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Qr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xr*2*Math.atan(Math.tan(Qr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bi.x,Bi.y).multiplyScalar(-e/Bi.z),Bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bi.x,Bi.y).multiplyScalar(-e/Bi.z)}getViewSize(e,t){return this.getViewBounds(e,fd,pd),t.subVectors(pd,fd)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Qr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ks=-90,js=1;class w0 extends vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new un(Ks,js,e,t);s.layers=this.layers,this.add(s);const r=new un(Ks,js,e,t);r.layers=this.layers,this.add(r);const a=new un(Ks,js,e,t);a.layers=this.layers,this.add(a);const o=new un(Ks,js,e,t);o.layers=this.layers,this.add(o);const c=new un(Ks,js,e,t);c.layers=this.layers,this.add(c);const l=new un(Ks,js,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===ni)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ko)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class fp extends Qt{constructor(e=[],t=gr,n,s,r,a,o,c,l,u){super(e,t,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class b0 extends As{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new fp(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new st(5,5,5),r=new Ci({name:"CubemapFromEquirect",uniforms:vr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:gn,blending:Ki});r.uniforms.tEquirect.value=t;const a=new $(s,r),o=t.minFilter;return t.minFilter===wi&&(t.minFilter=En),new w0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class ct extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const E0={type:"move"};class zc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ct,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ct,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ct,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,m=.005;l.inputState.pinching&&d>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(E0)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ct;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class eh{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ve(e),this.density=t}clone(){return new eh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class T0 extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zn,this.environmentIntensity=1,this.environmentRotation=new zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class A0{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=mu,this.updateRanges=[],this.version=0,this.uuid=Bn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const on=new T;class th{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)on.fromBufferAttribute(this,t),on.applyMatrix4(e),this.setXYZ(t,on.x,on.y,on.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.applyNormalMatrix(e),this.setXYZ(t,on.x,on.y,on.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.transformDirection(e),this.setXYZ(t,on.x,on.y,on.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=qn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=dt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=qn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=qn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=qn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=qn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),s=dt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),s=dt(s,this.array),r=dt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Xt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new th(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const md=new T,gd=new ut,_d=new ut,R0=new T,xd=new Xe,Ja=new T,Hc=new ai,vd=new Xe,Vc=new Ea;class C0 extends ${constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Xh,this.bindMatrix=new Xe,this.bindMatrixInverse=new Xe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Cn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ja),this.boundingBox.expandByPoint(Ja)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ai),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ja),this.boundingSphere.expandByPoint(Ja)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Hc.copy(this.boundingSphere),Hc.applyMatrix4(s),e.ray.intersectsSphere(Hc)!==!1&&(vd.copy(s).invert(),Vc.copy(e.ray).applyMatrix4(vd),!(this.boundingBox!==null&&Vc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Vc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ut,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Xh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Eg?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;gd.fromBufferAttribute(s.attributes.skinIndex,e),_d.fromBufferAttribute(s.attributes.skinWeight,e),md.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=_d.getComponent(r);if(a!==0){const o=gd.getComponent(r);xd.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(R0.copy(md).applyMatrix4(xd),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class pp extends vt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class mp extends Qt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=hn,u=hn,h,d){super(null,a,o,c,l,u,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const yd=new Xe,P0=new Xe;class nh{constructor(e=[],t=[]){this.uuid=Bn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Xe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Xe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:P0;yd.multiplyMatrices(o,t[r]),yd.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new nh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new mp(t,e,e,Fn,jn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new pp),this.bones.push(a),this.boneInverses.push(new Xe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class gu extends Xt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const $s=new Xe,Md=new Xe,Qa=[],Sd=new Cn,L0=new Xe,Hr=new $,Vr=new ai;class I0 extends ${constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new gu(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,L0)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Cn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,$s),Sd.copy(e.boundingBox).applyMatrix4($s),this.boundingBox.union(Sd)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ai),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,$s),Vr.copy(e.boundingSphere).applyMatrix4($s),this.boundingSphere.union(Vr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Hr.geometry=this.geometry,Hr.material=this.material,Hr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vr.copy(this.boundingSphere),Vr.applyMatrix4(n),e.ray.intersectsSphere(Vr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,$s),Md.multiplyMatrices(n,$s),Hr.matrixWorld=Md,Hr.raycast(e,Qa);for(let a=0,o=Qa.length;a<o;a++){const c=Qa[a];c.instanceId=r,c.object=this,t.push(c)}Qa.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new gu(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new mp(new Float32Array(s*this.count),s,this.count,qu,jn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Gc=new T,D0=new T,N0=new Ye;class zi{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Gc.subVectors(n,t).cross(D0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Gc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||N0.getNormalMatrix(e),s=this.coplanarPoint(Gc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const us=new ai,U0=new ue(.5,.5),eo=new T;class ih{constructor(e=new zi,t=new zi,n=new zi,s=new zi,r=new zi,a=new zi){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ni,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],h=r[5],d=r[6],f=r[7],m=r[8],_=r[9],g=r[10],p=r[11],y=r[12],S=r[13],x=r[14],R=r[15];if(s[0].setComponents(l-a,f-u,p-m,R-y).normalize(),s[1].setComponents(l+a,f+u,p+m,R+y).normalize(),s[2].setComponents(l+o,f+h,p+_,R+S).normalize(),s[3].setComponents(l-o,f-h,p-_,R-S).normalize(),n)s[4].setComponents(c,d,g,x).normalize(),s[5].setComponents(l-c,f-d,p-g,R-x).normalize();else if(s[4].setComponents(l-c,f-d,p-g,R-x).normalize(),t===ni)s[5].setComponents(l+c,f+d,p+g,R+x).normalize();else if(t===ko)s[5].setComponents(c,d,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),us.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),us.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(us)}intersectsSprite(e){us.center.set(0,0,0);const t=U0.distanceTo(e.center);return us.radius=.7071067811865476+t,us.applyMatrix4(e.matrixWorld),this.intersectsSphere(us)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(eo.x=s.normal.x>0?e.max.x:e.min.x,eo.y=s.normal.y>0?e.max.y:e.min.y,eo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(eo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $i extends An{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ve(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const zo=new T,Ho=new T,wd=new Xe,Gr=new Ea,to=new ai,Wc=new T,bd=new T;class nc extends vt{constructor(e=new wt,t=new $i){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)zo.fromBufferAttribute(t,s-1),Ho.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=zo.distanceTo(Ho);e.setAttribute("lineDistance",new Ve(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),to.copy(n.boundingSphere),to.applyMatrix4(s),to.radius+=r,e.ray.intersectsSphere(to)===!1)return;wd.copy(s).invert(),Gr.copy(e.ray).applyMatrix4(wd);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=l){const p=u.getX(_),y=u.getX(_+1),S=no(this,e,Gr,c,p,y,_);S&&t.push(S)}if(this.isLineLoop){const _=u.getX(m-1),g=u.getX(f),p=no(this,e,Gr,c,_,g,m-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=l){const p=no(this,e,Gr,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=no(this,e,Gr,c,m-1,f,m-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function no(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(zo.fromBufferAttribute(o,s),Ho.fromBufferAttribute(o,r),t.distanceSqToSegment(zo,Ho,Wc,bd)>n)return;Wc.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Wc);if(!(l<e.near||l>e.far))return{distance:l,point:bd.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Ed=new T,Td=new T;class pa extends nc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Ed.fromBufferAttribute(t,s),Td.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Ed.distanceTo(Td);e.setAttribute("lineDistance",new Ve(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class F0 extends nc{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Ms extends An{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ve(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ad=new Xe,_u=new Ea,io=new ai,so=new T;class ta extends vt{constructor(e=new wt,t=new Ms){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),io.copy(n.boundingSphere),io.applyMatrix4(s),io.radius+=r,e.ray.intersectsSphere(io)===!1)return;Ad.copy(s).invert(),_u.copy(e.ray).applyMatrix4(Ad);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let m=d,_=f;m<_;m++){const g=l.getX(m);so.fromBufferAttribute(h,g),Rd(so,g,c,s,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let m=d,_=f;m<_;m++)so.fromBufferAttribute(h,m),Rd(so,m,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Rd(i,e,t,n,s,r,a){const o=_u.distanceSqToPoint(i);if(o<t){const c=new T;_u.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class gp extends Qt{constructor(e,t,n=Ts,s,r,a,o=hn,c=hn,l,u=la,h=1){if(u!==la&&u!==ua)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ju(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class yr extends wt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new T,u=new ue;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const f=n+h/t*s;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[d]/e+1)/2,u.y=(a[d+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Ve(a,3)),this.setAttribute("normal",new Ve(o,3)),this.setAttribute("uv",new Ve(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yr(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Nt extends wt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],d=[],f=[];let m=0;const _=[],g=n/2;let p=0;y(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new Ve(h,3)),this.setAttribute("normal",new Ve(d,3)),this.setAttribute("uv",new Ve(f,2));function y(){const x=new T,R=new T;let A=0;const P=(t-e)/n;for(let N=0;N<=r;N++){const b=[],E=N/r,I=E*(t-e)+e;for(let H=0;H<=s;H++){const V=H/s,X=V*c+o,Q=Math.sin(X),j=Math.cos(X);R.x=I*Q,R.y=-E*n+g,R.z=I*j,h.push(R.x,R.y,R.z),x.set(Q,P,j).normalize(),d.push(x.x,x.y,x.z),f.push(V,1-E),b.push(m++)}_.push(b)}for(let N=0;N<s;N++)for(let b=0;b<r;b++){const E=_[b][N],I=_[b+1][N],H=_[b+1][N+1],V=_[b][N+1];(e>0||b!==0)&&(u.push(E,I,V),A+=3),(t>0||b!==r-1)&&(u.push(I,H,V),A+=3)}l.addGroup(p,A,0),p+=A}function S(x){const R=m,A=new ue,P=new T;let N=0;const b=x===!0?e:t,E=x===!0?1:-1;for(let H=1;H<=s;H++)h.push(0,g*E,0),d.push(0,E,0),f.push(.5,.5),m++;const I=m;for(let H=0;H<=s;H++){const X=H/s*c+o,Q=Math.cos(X),j=Math.sin(X);P.x=b*j,P.y=g*E,P.z=b*Q,h.push(P.x,P.y,P.z),d.push(0,E,0),A.x=Q*.5+.5,A.y=j*.5*E+.5,f.push(A.x,A.y),m++}for(let H=0;H<s;H++){const V=R+H,X=I+H;x===!0?u.push(X,X+1,V):u.push(X+1,X,V),N+=3}l.addGroup(p,N,x===!0?1:2),p+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ta extends Nt{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Ta(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ic extends wt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),l(n),u(),this.setAttribute("position",new Ve(r,3)),this.setAttribute("normal",new Ve(r.slice(),3)),this.setAttribute("uv",new Ve(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const S=new T,x=new T,R=new T;for(let A=0;A<t.length;A+=3)f(t[A+0],S),f(t[A+1],x),f(t[A+2],R),c(S,x,R,y)}function c(y,S,x,R){const A=R+1,P=[];for(let N=0;N<=A;N++){P[N]=[];const b=y.clone().lerp(x,N/A),E=S.clone().lerp(x,N/A),I=A-N;for(let H=0;H<=I;H++)H===0&&N===A?P[N][H]=b:P[N][H]=b.clone().lerp(E,H/I)}for(let N=0;N<A;N++)for(let b=0;b<2*(A-N)-1;b++){const E=Math.floor(b/2);b%2===0?(d(P[N][E+1]),d(P[N+1][E]),d(P[N][E])):(d(P[N][E+1]),d(P[N+1][E+1]),d(P[N+1][E]))}}function l(y){const S=new T;for(let x=0;x<r.length;x+=3)S.x=r[x+0],S.y=r[x+1],S.z=r[x+2],S.normalize().multiplyScalar(y),r[x+0]=S.x,r[x+1]=S.y,r[x+2]=S.z}function u(){const y=new T;for(let S=0;S<r.length;S+=3){y.x=r[S+0],y.y=r[S+1],y.z=r[S+2];const x=g(y)/2/Math.PI+.5,R=p(y)/Math.PI+.5;a.push(x,1-R)}m(),h()}function h(){for(let y=0;y<a.length;y+=6){const S=a[y+0],x=a[y+2],R=a[y+4],A=Math.max(S,x,R),P=Math.min(S,x,R);A>.9&&P<.1&&(S<.2&&(a[y+0]+=1),x<.2&&(a[y+2]+=1),R<.2&&(a[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,S){const x=y*3;S.x=e[x+0],S.y=e[x+1],S.z=e[x+2]}function m(){const y=new T,S=new T,x=new T,R=new T,A=new ue,P=new ue,N=new ue;for(let b=0,E=0;b<r.length;b+=9,E+=6){y.set(r[b+0],r[b+1],r[b+2]),S.set(r[b+3],r[b+4],r[b+5]),x.set(r[b+6],r[b+7],r[b+8]),A.set(a[E+0],a[E+1]),P.set(a[E+2],a[E+3]),N.set(a[E+4],a[E+5]),R.copy(y).add(S).add(x).divideScalar(3);const I=g(R);_(A,E+0,y,I),_(P,E+2,S,I),_(N,E+4,x,I)}}function _(y,S,x,R){R<0&&y.x===1&&(a[S]=y.x-1),x.x===0&&x.z===0&&(a[S]=R/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ic(e.vertices,e.indices,e.radius,e.details)}}class Rr extends ic{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Rr(e.radius,e.detail)}}class oi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);const u=n[s],d=n[s+1]-u,f=(a-u)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new ue:new T);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new T,s=[],r=[],a=[],o=new T,c=new Xe;for(let f=0;f<=e;f++){const m=f/e;s[f]=this.getTangentAt(m,new T)}r[0]=new T,a[0]=new T;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(Ze(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,m))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Ze(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],f*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class sh extends oi{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new ue){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*u-f*h+this.aX,l=d*h+f*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class O0 extends sh{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function rh(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,h){let d=(a-r)/l-(o-r)/(l+u)+(o-a)/u,f=(o-a)/u-(c-a)/(u+h)+(c-o)/h;d*=u,f*=u,s(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const ro=new T,Xc=new rh,qc=new rh,Yc=new rh;class B0 extends oi{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new T){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=s[(o-1)%r]:(ro.subVectors(s[0],s[1]).add(s[0]),l=ro);const h=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(ro.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=ro),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(h),f),_=Math.pow(h.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(u),f);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),Xc.initNonuniformCatmullRom(l.x,h.x,d.x,u.x,m,_,g),qc.initNonuniformCatmullRom(l.y,h.y,d.y,u.y,m,_,g),Yc.initNonuniformCatmullRom(l.z,h.z,d.z,u.z,m,_,g)}else this.curveType==="catmullrom"&&(Xc.initCatmullRom(l.x,h.x,d.x,u.x,this.tension),qc.initCatmullRom(l.y,h.y,d.y,u.y,this.tension),Yc.initCatmullRom(l.z,h.z,d.z,u.z,this.tension));return n.set(Xc.calc(c),qc.calc(c),Yc.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new T().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Cd(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function k0(i,e){const t=1-i;return t*t*e}function z0(i,e){return 2*(1-i)*i*e}function H0(i,e){return i*i*e}function na(i,e,t,n){return k0(i,e)+z0(i,t)+H0(i,n)}function V0(i,e){const t=1-i;return t*t*t*e}function G0(i,e){const t=1-i;return 3*t*t*i*e}function W0(i,e){return 3*(1-i)*i*i*e}function X0(i,e){return i*i*i*e}function ia(i,e,t,n,s){return V0(i,e)+G0(i,t)+W0(i,n)+X0(i,s)}class _p extends oi{constructor(e=new ue,t=new ue,n=new ue,s=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ue){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ia(e,s.x,r.x,a.x,o.x),ia(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class q0 extends oi{constructor(e=new T,t=new T,n=new T,s=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new T){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ia(e,s.x,r.x,a.x,o.x),ia(e,s.y,r.y,a.y,o.y),ia(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class xp extends oi{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Y0 extends oi{constructor(e=new T,t=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new T){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new T){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class vp extends oi{constructor(e=new ue,t=new ue,n=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ue){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(na(e,s.x,r.x,a.x),na(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class K0 extends oi{constructor(e=new T,t=new T,n=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new T){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(na(e,s.x,r.x,a.x),na(e,s.y,r.y,a.y),na(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class yp extends oi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],h=s[a>s.length-3?s.length-1:a+2];return n.set(Cd(o,c.x,l.x,u.x,h.x),Cd(o,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new ue().fromArray(s))}return this}}var Pd=Object.freeze({__proto__:null,ArcCurve:O0,CatmullRomCurve3:B0,CubicBezierCurve:_p,CubicBezierCurve3:q0,EllipseCurve:sh,LineCurve:xp,LineCurve3:Y0,QuadraticBezierCurve:vp,QuadraticBezierCurve3:K0,SplineCurve:yp});class j0 extends oi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Pd[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Pd[s.type]().fromJSON(s))}return this}}class Ld extends j0{constructor(e){super(),this.type="Path",this.currentPoint=new ue,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new xp(this.currentPoint.clone(),new ue(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new vp(this.currentPoint.clone(),new ue(e,t),new ue(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const o=new _p(this.currentPoint.clone(),new ue(e,t),new ue(n,s),new ue(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new yp(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,r,a,o,c),this}absellipse(e,t,n,s,r,a,o,c){const l=new sh(e,t,n,s,r,a,o,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Mp extends Ld{constructor(e){super(e),this.uuid=Bn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new Ld().fromJSON(s))}return this}}function $0(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=Sp(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=t_(i,e,r,t)),i.length>80*t){o=1/0,c=1/0;let u=-1/0,h=-1/0;for(let d=t;d<s;d+=t){const f=i[d],m=i[d+1];f<o&&(o=f),m<c&&(c=m),f>u&&(u=f),m>h&&(h=m)}l=Math.max(u-o,h-c),l=l!==0?32767/l:0}return ma(r,a,t,o,c,l,0),a}function Sp(i,e,t,n,s){let r;if(s===d_(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=Id(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Id(a/n|0,i[a],i[a+1],r);return r&&Mr(r,r.next)&&(_a(r),r=r.next),r}function Rs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Mr(t,t.next)||It(t.prev,t,t.next)===0)){if(_a(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ma(i,e,t,n,s,r,a){if(!i)return;!a&&r&&a_(i,n,s,r);let o=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(r?J0(i,n,s,r):Z0(i)){e.push(c.i,i.i,l.i),_a(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=Q0(Rs(i),e),ma(i,e,t,n,s,r,2)):a===2&&e_(i,e,t,n,s,r):ma(Rs(i),e,t,n,s,r,1);break}}}function Z0(i){const e=i.prev,t=i,n=i.next;if(It(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,u=Math.min(s,r,a),h=Math.min(o,c,l),d=Math.max(s,r,a),f=Math.max(o,c,l);let m=n.next;for(;m!==e;){if(m.x>=u&&m.x<=d&&m.y>=h&&m.y<=f&&jr(s,o,r,c,a,l,m.x,m.y)&&It(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function J0(i,e,t,n){const s=i.prev,r=i,a=i.next;if(It(s,r,a)>=0)return!1;const o=s.x,c=r.x,l=a.x,u=s.y,h=r.y,d=a.y,f=Math.min(o,c,l),m=Math.min(u,h,d),_=Math.max(o,c,l),g=Math.max(u,h,d),p=xu(f,m,e,t,n),y=xu(_,g,e,t,n);let S=i.prevZ,x=i.nextZ;for(;S&&S.z>=p&&x&&x.z<=y;){if(S.x>=f&&S.x<=_&&S.y>=m&&S.y<=g&&S!==s&&S!==a&&jr(o,u,c,h,l,d,S.x,S.y)&&It(S.prev,S,S.next)>=0||(S=S.prevZ,x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==s&&x!==a&&jr(o,u,c,h,l,d,x.x,x.y)&&It(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;S&&S.z>=p;){if(S.x>=f&&S.x<=_&&S.y>=m&&S.y<=g&&S!==s&&S!==a&&jr(o,u,c,h,l,d,S.x,S.y)&&It(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;x&&x.z<=y;){if(x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==s&&x!==a&&jr(o,u,c,h,l,d,x.x,x.y)&&It(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Q0(i,e){let t=i;do{const n=t.prev,s=t.next.next;!Mr(n,s)&&bp(n,t,t.next,s)&&ga(n,s)&&ga(s,n)&&(e.push(n.i,t.i,s.i),_a(t),_a(t.next),t=i=s),t=t.next}while(t!==i);return Rs(t)}function e_(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&l_(a,o)){let c=Ep(a,o);a=Rs(a,a.next),c=Rs(c,c.next),ma(a,e,t,n,s,r,0),ma(c,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function t_(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const o=e[r]*n,c=r<a-1?e[r+1]*n:i.length,l=Sp(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(c_(l))}s.sort(n_);for(let r=0;r<s.length;r++)t=i_(s[r],t);return t}function n_(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function i_(i,e){const t=s_(i,e);if(!t)return e;const n=Ep(t,i);return Rs(n,n.next),Rs(t,t.next)}function s_(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(Mr(i,t))return t;do{if(Mr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const h=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>r&&(r=h,a=t.x<t.next.x?t:t.next,h===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,c=a.x,l=a.y;let u=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&wp(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){const h=Math.abs(s-t.y)/(n-t.x);ga(t,i)&&(h<u||h===u&&(t.x>a.x||t.x===a.x&&r_(a,t)))&&(a=t,u=h)}t=t.next}while(t!==o);return a}function r_(i,e){return It(i.prev,i,e.prev)<0&&It(e.next,i,i.next)<0}function a_(i,e,t,n){let s=i;do s.z===0&&(s.z=xu(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,o_(s)}function o_(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function xu(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function c_(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function wp(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function jr(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&wp(i,e,t,n,s,r,a,o)}function l_(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!u_(i,e)&&(ga(i,e)&&ga(e,i)&&h_(i,e)&&(It(i.prev,i,e.prev)||It(i,e.prev,e))||Mr(i,e)&&It(i.prev,i,i.next)>0&&It(e.prev,e,e.next)>0)}function It(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Mr(i,e){return i.x===e.x&&i.y===e.y}function bp(i,e,t,n){const s=oo(It(i,e,t)),r=oo(It(i,e,n)),a=oo(It(t,n,i)),o=oo(It(t,n,e));return!!(s!==r&&a!==o||s===0&&ao(i,t,e)||r===0&&ao(i,n,e)||a===0&&ao(t,i,n)||o===0&&ao(t,e,n))}function ao(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function oo(i){return i>0?1:i<0?-1:0}function u_(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&bp(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function ga(i,e){return It(i.prev,i,i.next)<0?It(i,e,i.next)>=0&&It(i,i.prev,e)>=0:It(i,e,i.prev)<0||It(i,i.next,e)<0}function h_(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Ep(i,e){const t=vu(i.i,i.x,i.y),n=vu(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Id(i,e,t,n){const s=vu(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function _a(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function vu(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function d_(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class f_{static triangulate(e,t,n=2){return $0(e,t,n)}}class rr{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return rr.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Dd(e),Nd(n,e);let a=e.length;t.forEach(Dd);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,Nd(n,t[c]);const o=f_.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}}function Dd(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Nd(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class ah extends ic{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ah(e.radius,e.detail)}}class Cr extends wt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,h=e/o,d=t/c,f=[],m=[],_=[],g=[];for(let p=0;p<u;p++){const y=p*d-a;for(let S=0;S<l;S++){const x=S*h-r;m.push(x,-y,0),_.push(0,0,1),g.push(S/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<o;y++){const S=y+l*p,x=y+l*(p+1),R=y+1+l*(p+1),A=y+1+l*p;f.push(S,x,A),f.push(x,R,A)}this.setIndex(f),this.setAttribute("position",new Ve(m,3)),this.setAttribute("normal",new Ve(_,3)),this.setAttribute("uv",new Ve(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Pi extends wt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],u=[];let h=e;const d=(t-e)/s,f=new T,m=new ue;for(let _=0;_<=s;_++){for(let g=0;g<=n;g++){const p=r+g/n*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,u.push(m.x,m.y)}h+=d}for(let _=0;_<s;_++){const g=_*(n+1);for(let p=0;p<n;p++){const y=p+g,S=y,x=y+n+1,R=y+n+2,A=y+1;o.push(S,x,A),o.push(x,R,A)}}this.setIndex(o),this.setAttribute("position",new Ve(c,3)),this.setAttribute("normal",new Ve(l,3)),this.setAttribute("uv",new Ve(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pi(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class oh extends wt{constructor(e=new Mp([new ue(0,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],a=[];let o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let u=0;u<e.length;u++)l(e[u]),this.addGroup(o,c,u),o+=c,c=0;this.setIndex(n),this.setAttribute("position",new Ve(s,3)),this.setAttribute("normal",new Ve(r,3)),this.setAttribute("uv",new Ve(a,2));function l(u){const h=s.length/3,d=u.extractPoints(t);let f=d.shape;const m=d.holes;rr.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){const y=m[g];rr.isClockWise(y)===!0&&(m[g]=y.reverse())}const _=rr.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){const y=m[g];f=f.concat(y)}for(let g=0,p=f.length;g<p;g++){const y=f[g];s.push(y.x,y.y,0),r.push(0,0,1),a.push(y.x,y.y)}for(let g=0,p=_.length;g<p;g++){const y=_[g],S=y[0]+h,x=y[1]+h,R=y[2]+h;n.push(S,x,R),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return p_(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const a=t[e.shapes[s]];n.push(a)}return new oh(n,e.curveSegments)}}function p_(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class Ns extends wt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new T,d=new T,f=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){const y=[],S=p/n;let x=0;p===0&&a===0?x=.5/t:p===n&&c===Math.PI&&(x=-.5/t);for(let R=0;R<=t;R++){const A=R/t;h.x=-e*Math.cos(s+A*r)*Math.sin(a+S*o),h.y=e*Math.cos(a+S*o),h.z=e*Math.sin(s+A*r)*Math.sin(a+S*o),m.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),g.push(A+x,1-S),y.push(l++)}u.push(y)}for(let p=0;p<n;p++)for(let y=0;y<t;y++){const S=u[p][y+1],x=u[p][y],R=u[p+1][y],A=u[p+1][y+1];(p!==0||a>0)&&f.push(S,x,A),(p!==n-1||c<Math.PI)&&f.push(x,R,A)}this.setIndex(f),this.setAttribute("position",new Ve(m,3)),this.setAttribute("normal",new Ve(_,3)),this.setAttribute("uv",new Ve(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ns(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class sc extends wt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],c=[],l=[],u=new T,h=new T,d=new T;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){const _=m/s*r,g=f/n*Math.PI*2;h.x=(e+t*Math.cos(g))*Math.cos(_),h.y=(e+t*Math.cos(g))*Math.sin(_),h.z=t*Math.sin(g),o.push(h.x,h.y,h.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),d.subVectors(h,u).normalize(),c.push(d.x,d.y,d.z),l.push(m/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){const _=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,y=(s+1)*f+m;a.push(_,g,y),a.push(g,p,y)}this.setIndex(a),this.setAttribute("position",new Ve(o,3)),this.setAttribute("normal",new Ve(c,3)),this.setAttribute("uv",new Ve(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sc(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Yt extends An{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$u,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ci extends Yt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ze(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ve(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ve(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ve(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class ch extends An{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new ve(16777215),this.specular=new ve(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$u,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=Vu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class m_ extends An{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Rg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class g_ extends An{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function co(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function __(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function x_(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Ud(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function Tp(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}class Aa{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class v_ extends Aa{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:qh,endingEnd:qh}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Yh:r=e,o=2*t-n;break;case Kh:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Yh:a=e,c=2*n-t;break;case Kh:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(s-t),_=m*m,g=_*m,p=-d*g+2*d*_-d*m,y=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*m+1,S=(-1-f)*g+(1.5+f)*_+.5*m,x=f*g-f*_;for(let R=0;R!==o;++R)r[R]=p*a[u+R]+y*a[l+R]+S*a[c+R]+x*a[h+R];return r}}class y_ extends Aa{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(s-t),h=1-u;for(let d=0;d!==o;++d)r[d]=a[l+d]*h+a[c+d]*u;return r}}class M_ extends Aa{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class $n{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=co(t,this.TimeBufferType),this.values=co(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:co(e.times,Array),values:co(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new M_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new y_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new v_(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ha:t=this.InterpolantFactoryMethodDiscrete;break;case da:t=this.InterpolantFactoryMethodLinear;break;case vc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ha;case this.InterpolantFactoryMethodLinear:return da;case this.InterpolantFactoryMethodSmooth:return vc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&__(s))for(let o=0,c=s.length;o!==c;++o){const l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===vc,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(s)c=!0;else{const h=o*n,d=h-n,f=h+n;for(let m=0;m!==n;++m){const _=t[h+m];if(_!==t[d+m]||_!==t[f+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const h=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}$n.prototype.ValueTypeName="";$n.prototype.TimeBufferType=Float32Array;$n.prototype.ValueBufferType=Float32Array;$n.prototype.DefaultInterpolation=da;class Pr extends $n{constructor(e,t,n){super(e,t,n)}}Pr.prototype.ValueTypeName="bool";Pr.prototype.ValueBufferType=Array;Pr.prototype.DefaultInterpolation=ha;Pr.prototype.InterpolantFactoryMethodLinear=void 0;Pr.prototype.InterpolantFactoryMethodSmooth=void 0;class Ap extends $n{constructor(e,t,n,s){super(e,t,n,s)}}Ap.prototype.ValueTypeName="color";class Sr extends $n{constructor(e,t,n,s){super(e,t,n,s)}}Sr.prototype.ValueTypeName="number";class S_ extends Aa{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t);let l=e*o;for(let u=l+o;l!==u;l+=4)Hn.slerpFlat(r,0,a,l-o,a,l,c);return r}}class wr extends $n{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new S_(this.times,this.values,this.getValueSize(),e)}}wr.prototype.ValueTypeName="quaternion";wr.prototype.InterpolantFactoryMethodSmooth=void 0;class Lr extends $n{constructor(e,t,n){super(e,t,n)}}Lr.prototype.ValueTypeName="string";Lr.prototype.ValueBufferType=Array;Lr.prototype.DefaultInterpolation=ha;Lr.prototype.InterpolantFactoryMethodLinear=void 0;Lr.prototype.InterpolantFactoryMethodSmooth=void 0;class br extends $n{constructor(e,t,n,s){super(e,t,n,s)}}br.prototype.ValueTypeName="vector";class w_{constructor(e="",t=-1,n=[],s=Tg){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Bn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(E_(n[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push($n.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const u=x_(c);c=Ud(c,1,u),l=Ud(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Sr(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let d=s[h];d||(s[h]=d=[]),d.push(l)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,m,_){if(f.length!==0){const g=[],p=[];Tp(f,g,p,m),g.length!==0&&_.push(new h(d,g,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let h=0;h<l.length;h++){const d=l[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let _=0;_<d[m].morphTargets.length;_++)f[d[m].morphTargets[_]]=-1;for(const _ in f){const g=[],p=[];for(let y=0;y!==d[m].morphTargets.length;++y){const S=d[m];g.push(S.time),p.push(S.morphTarget===_?1:0)}s.push(new Sr(".morphTargetInfluence["+_+"]",g,p))}c=f.length*a}else{const f=".bones["+t[h].name+"]";n(br,f+".position",d,"pos",s),n(wr,f+".quaternion",d,"rot",s),n(br,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function b_(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Sr;case"vector":case"vector2":case"vector3":case"vector4":return br;case"color":return Ap;case"quaternion":return wr;case"bool":case"boolean":return Pr;case"string":return Lr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function E_(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=b_(i.type);if(i.times===void 0){const t=[],n=[];Tp(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const bi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class T_{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){const f=l[h],m=l[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const Rp=new T_;class is{constructor(e){this.manager=e!==void 0?e:Rp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}is.DEFAULT_MATERIAL_NAME="__DEFAULT";const mi={};class A_ extends Error{constructor(e,t){super(e),this.response=t}}class rc extends is{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=bi.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(mi[e]!==void 0){mi[e].push({onLoad:t,onProgress:n,onError:s});return}mi[e]=[],mi[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=mi[e],h=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let _=0;const g=new ReadableStream({start(p){y();function y(){h.read().then(({done:S,value:x})=>{if(S)p.close();else{_+=x.byteLength;const R=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:f});for(let A=0,P=u.length;A<P;A++){const N=u[A];N.onProgress&&N.onProgress(R)}p.enqueue(x),y()}},S=>{p.error(S)})}}});return new Response(g)}else throw new A_(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o==="")return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(m=>f.decode(m))}}}).then(l=>{bi.add(`file:${e}`,l);const u=mi[e];delete mi[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(l)}}).catch(l=>{const u=mi[e];if(u===void 0)throw this.manager.itemError(e),l;delete mi[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Zs=new WeakMap;class R_ extends is{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=bi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let h=Zs.get(a);h===void 0&&(h=[],Zs.set(a,h)),h.push({onLoad:t,onError:s})}return a}const o=fa("img");function c(){u(),t&&t(this);const h=Zs.get(this)||[];for(let d=0;d<h.length;d++){const f=h[d];f.onLoad&&f.onLoad(this)}Zs.delete(this),r.manager.itemEnd(e)}function l(h){u(),s&&s(h),bi.remove(`image:${e}`);const d=Zs.get(this)||[];for(let f=0;f<d.length;f++){const m=d[f];m.onError&&m.onError(h)}Zs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),bi.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class lh extends is{constructor(e){super(e)}load(e,t,n,s){const r=new Qt,a=new R_(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class ac extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ve(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class C_ extends ac{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Kc=new Xe,Fd=new T,Od=new T;class uh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=ri,this.map=null,this.mapPass=null,this.matrix=new Xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ih,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Fd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Fd),Od.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Od),t.updateMatrixWorld(),Kc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Kc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Kc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class P_ extends uh{constructor(){super(new un(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=xr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class L_ extends ac{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new P_}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Bd=new Xe,Wr=new T,jc=new T;class I_ extends uh{constructor(){super(new un(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ue(4,2),this._viewportCount=6,this._viewports=[new ut(2,1,1,1),new ut(0,1,1,1),new ut(3,1,1,1),new ut(1,1,1,1),new ut(3,0,1,1),new ut(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Wr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Wr),jc.copy(n.position),jc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(jc),n.updateMatrixWorld(),s.makeTranslation(-Wr.x,-Wr.y,-Wr.z),Bd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bd,n.coordinateSystem,n.reversedDepth)}}class hh extends ac{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new I_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class dh extends dp{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class D_ extends uh{constructor(){super(new dh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Cp extends ac{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new D_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ar{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const $c=new WeakMap;class N_ extends is{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=bi.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{if($c.has(a)===!0)s&&s($c.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(l),r.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return bi.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),$c.set(c,l),bi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});bi.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class U_ extends un{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class F_{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const fh="\\[\\]\\.:\\/",O_=new RegExp("["+fh+"]","g"),ph="[^"+fh+"]",B_="[^"+fh.replace("\\.","")+"]",k_=/((?:WC+[\/:])*)/.source.replace("WC",ph),z_=/(WCOD+)?/.source.replace("WCOD",B_),H_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ph),V_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ph),G_=new RegExp("^"+k_+z_+H_+V_+"$"),W_=["material","materials","bones","map"];class X_{constructor(e,t,n){const s=n||ft.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ft{constructor(e,t,n){this.path=t,this.parsedPath=n||ft.parseTrackName(t),this.node=ft.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ft.Composite(e,t,n):new ft(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(O_,"")}static parseTrackName(e){const t=G_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);W_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=ft.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[s];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ft.Composite=X_;ft.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ft.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ft.prototype.GetterByBindingType=[ft.prototype._getValue_direct,ft.prototype._getValue_array,ft.prototype._getValue_arrayElement,ft.prototype._getValue_toArray];ft.prototype.SetterByBindingTypeAndVersioning=[[ft.prototype._setValue_direct,ft.prototype._setValue_direct_setNeedsUpdate,ft.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_array,ft.prototype._setValue_array_setNeedsUpdate,ft.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_arrayElement,ft.prototype._setValue_arrayElement_setNeedsUpdate,ft.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_fromArray,ft.prototype._setValue_fromArray_setNeedsUpdate,ft.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const kd=new Xe;class Pp{constructor(e,t,n=0,s=1/0){this.ray=new Ea(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Qu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return kd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(kd),this}intersectObject(e,t=!0,n=[]){return yu(e,this,n,t),n.sort(zd),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)yu(e[s],this,n,t);return n.sort(zd),n}}function zd(i,e){return i.distance-e.distance}function yu(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)yu(r[a],e,t,!0)}}const lo=new Cn;class q_ extends pa{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),s=new Float32Array(24),r=new wt;r.setIndex(new Xt(n,1)),r.setAttribute("position",new Xt(s,3)),super(r,new $i({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&lo.setFromObject(this.object),lo.isEmpty())return;const e=lo.min,t=lo.max,n=this.geometry.attributes.position,s=n.array;s[0]=t.x,s[1]=t.y,s[2]=t.z,s[3]=e.x,s[4]=t.y,s[5]=t.z,s[6]=e.x,s[7]=e.y,s[8]=t.z,s[9]=t.x,s[10]=e.y,s[11]=t.z,s[12]=t.x,s[13]=t.y,s[14]=e.z,s[15]=e.x,s[16]=t.y,s[17]=e.z,s[18]=e.x,s[19]=e.y,s[20]=e.z,s[21]=t.x,s[22]=e.y,s[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}const Hd=new T;let uo,Zc;class Ra extends vt{constructor(e=new T(0,0,1),t=new T(0,0,0),n=1,s=16776960,r=n*.2,a=r*.2){super(),this.type="ArrowHelper",uo===void 0&&(uo=new wt,uo.setAttribute("position",new Ve([0,0,0,0,1,0],3)),Zc=new Ta(.5,1,5,1),Zc.translate(0,-.5,0)),this.position.copy(t),this.line=new nc(uo,new $i({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new $(Zc,new et({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Hd.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Hd,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}function Vd(i,e,t,n){const s=Y_(n);switch(t){case ep:return i*e;case qu:return i*e/s.components*s.byteLength;case Yu:return i*e/s.components*s.byteLength;case np:return i*e*2/s.components*s.byteLength;case Ku:return i*e*2/s.components*s.byteLength;case tp:return i*e*3/s.components*s.byteLength;case Fn:return i*e*4/s.components*s.byteLength;case ju:return i*e*4/s.components*s.byteLength;case So:case wo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case bo:case Eo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Gl:case Xl:return Math.max(i,16)*Math.max(e,8)/4;case Vl:case Wl:return Math.max(i,8)*Math.max(e,8)/2;case ql:case Yl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Kl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case jl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case $l:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Zl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Jl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ql:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case eu:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case tu:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case nu:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case iu:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case su:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ru:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case au:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ou:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case cu:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case To:case lu:case uu:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ip:case hu:return Math.ceil(i/4)*Math.ceil(e/4)*8;case du:case fu:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Y_(i){switch(i){case ri:case Zf:return{byteLength:1,components:1};case oa:case Jf:case ba:return{byteLength:2,components:1};case Wu:case Xu:return{byteLength:2,components:4};case Ts:case Gu:case jn:return{byteLength:4,components:1};case Qf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zu);function Lp(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function K_(i){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,h=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,o),h.length===0)i.bufferSubData(l,0,u);else{h.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<h.length;f++){const m=h[d],_=h[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,h[d]=_)}h.length=d+1;for(let f=0,m=h.length;f<m;f++){const _=h[f];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var j_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$_=`#ifdef USE_ALPHAHASH
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
#endif`,Z_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,J_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Q_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ex=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tx=`#ifdef USE_AOMAP
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
#endif`,nx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ix=`#ifdef USE_BATCHING
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
#endif`,sx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ax=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ox=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,cx=`#ifdef USE_IRIDESCENCE
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
#endif`,lx=`#ifdef USE_BUMPMAP
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
#endif`,ux=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,hx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,px=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,_x=`#if defined( USE_COLOR_ALPHA )
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
#endif`,xx=`#define PI 3.141592653589793
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
} // validated`,vx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,yx=`vec3 transformedNormal = objectNormal;
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
#endif`,Mx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,wx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ex="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ax=`#ifdef USE_ENVMAP
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
#endif`,Rx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Cx=`#ifdef USE_ENVMAP
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
#endif`,Px=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lx=`#ifdef USE_ENVMAP
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
#endif`,Ix=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ux=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fx=`#ifdef USE_GRADIENTMAP
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
}`,Ox=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zx=`uniform bool receiveShadow;
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
#endif`,Hx=`#ifdef USE_ENVMAP
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
#endif`,Vx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qx=`PhysicalMaterial material;
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
#endif`,Yx=`struct PhysicalMaterial {
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
}`,Kx=`
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
#endif`,jx=`#if defined( RE_IndirectDiffuse )
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
#endif`,$x=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zx=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jx=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qx=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ev=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,iv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sv=`#if defined( USE_POINTS_UV )
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
#endif`,rv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,av=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ov=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uv=`#ifdef USE_MORPHTARGETS
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
#endif`,hv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,fv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,pv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_v=`#ifdef USE_NORMALMAP
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
#endif`,xv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,yv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Mv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Sv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,bv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ev=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Av=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Pv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Iv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Dv=`float getShadowMask() {
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
}`,Nv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Uv=`#ifdef USE_SKINNING
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
#endif`,Fv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ov=`#ifdef USE_SKINNING
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
#endif`,Bv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vv=`#ifdef USE_TRANSMISSION
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
#endif`,Gv=`#ifdef USE_TRANSMISSION
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
#endif`,Wv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Kv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jv=`uniform sampler2D t2D;
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
}`,$v=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Jv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ey=`#include <common>
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
}`,ty=`#if DEPTH_PACKING == 3200
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
}`,ny=`#define DISTANCE
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
}`,iy=`#define DISTANCE
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
}`,sy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ry=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ay=`uniform float scale;
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
}`,oy=`uniform vec3 diffuse;
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
}`,cy=`#include <common>
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
}`,ly=`uniform vec3 diffuse;
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
}`,uy=`#define LAMBERT
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
}`,hy=`#define LAMBERT
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
}`,dy=`#define MATCAP
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
}`,fy=`#define MATCAP
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
}`,py=`#define NORMAL
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
}`,my=`#define NORMAL
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
}`,gy=`#define PHONG
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
}`,_y=`#define PHONG
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
}`,xy=`#define STANDARD
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
}`,vy=`#define STANDARD
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
}`,yy=`#define TOON
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
}`,My=`#define TOON
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
}`,Sy=`uniform float size;
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
}`,wy=`uniform vec3 diffuse;
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
}`,by=`#include <common>
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
}`,Ey=`uniform vec3 color;
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
}`,Ty=`uniform float rotation;
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
}`,Ay=`uniform vec3 diffuse;
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
}`,Ke={alphahash_fragment:j_,alphahash_pars_fragment:$_,alphamap_fragment:Z_,alphamap_pars_fragment:J_,alphatest_fragment:Q_,alphatest_pars_fragment:ex,aomap_fragment:tx,aomap_pars_fragment:nx,batching_pars_vertex:ix,batching_vertex:sx,begin_vertex:rx,beginnormal_vertex:ax,bsdfs:ox,iridescence_fragment:cx,bumpmap_pars_fragment:lx,clipping_planes_fragment:ux,clipping_planes_pars_fragment:hx,clipping_planes_pars_vertex:dx,clipping_planes_vertex:fx,color_fragment:px,color_pars_fragment:mx,color_pars_vertex:gx,color_vertex:_x,common:xx,cube_uv_reflection_fragment:vx,defaultnormal_vertex:yx,displacementmap_pars_vertex:Mx,displacementmap_vertex:Sx,emissivemap_fragment:wx,emissivemap_pars_fragment:bx,colorspace_fragment:Ex,colorspace_pars_fragment:Tx,envmap_fragment:Ax,envmap_common_pars_fragment:Rx,envmap_pars_fragment:Cx,envmap_pars_vertex:Px,envmap_physical_pars_fragment:Hx,envmap_vertex:Lx,fog_vertex:Ix,fog_pars_vertex:Dx,fog_fragment:Nx,fog_pars_fragment:Ux,gradientmap_pars_fragment:Fx,lightmap_pars_fragment:Ox,lights_lambert_fragment:Bx,lights_lambert_pars_fragment:kx,lights_pars_begin:zx,lights_toon_fragment:Vx,lights_toon_pars_fragment:Gx,lights_phong_fragment:Wx,lights_phong_pars_fragment:Xx,lights_physical_fragment:qx,lights_physical_pars_fragment:Yx,lights_fragment_begin:Kx,lights_fragment_maps:jx,lights_fragment_end:$x,logdepthbuf_fragment:Zx,logdepthbuf_pars_fragment:Jx,logdepthbuf_pars_vertex:Qx,logdepthbuf_vertex:ev,map_fragment:tv,map_pars_fragment:nv,map_particle_fragment:iv,map_particle_pars_fragment:sv,metalnessmap_fragment:rv,metalnessmap_pars_fragment:av,morphinstance_vertex:ov,morphcolor_vertex:cv,morphnormal_vertex:lv,morphtarget_pars_vertex:uv,morphtarget_vertex:hv,normal_fragment_begin:dv,normal_fragment_maps:fv,normal_pars_fragment:pv,normal_pars_vertex:mv,normal_vertex:gv,normalmap_pars_fragment:_v,clearcoat_normal_fragment_begin:xv,clearcoat_normal_fragment_maps:vv,clearcoat_pars_fragment:yv,iridescence_pars_fragment:Mv,opaque_fragment:Sv,packing:wv,premultiplied_alpha_fragment:bv,project_vertex:Ev,dithering_fragment:Tv,dithering_pars_fragment:Av,roughnessmap_fragment:Rv,roughnessmap_pars_fragment:Cv,shadowmap_pars_fragment:Pv,shadowmap_pars_vertex:Lv,shadowmap_vertex:Iv,shadowmask_pars_fragment:Dv,skinbase_vertex:Nv,skinning_pars_vertex:Uv,skinning_vertex:Fv,skinnormal_vertex:Ov,specularmap_fragment:Bv,specularmap_pars_fragment:kv,tonemapping_fragment:zv,tonemapping_pars_fragment:Hv,transmission_fragment:Vv,transmission_pars_fragment:Gv,uv_pars_fragment:Wv,uv_pars_vertex:Xv,uv_vertex:qv,worldpos_vertex:Yv,background_vert:Kv,background_frag:jv,backgroundCube_vert:$v,backgroundCube_frag:Zv,cube_vert:Jv,cube_frag:Qv,depth_vert:ey,depth_frag:ty,distanceRGBA_vert:ny,distanceRGBA_frag:iy,equirect_vert:sy,equirect_frag:ry,linedashed_vert:ay,linedashed_frag:oy,meshbasic_vert:cy,meshbasic_frag:ly,meshlambert_vert:uy,meshlambert_frag:hy,meshmatcap_vert:dy,meshmatcap_frag:fy,meshnormal_vert:py,meshnormal_frag:my,meshphong_vert:gy,meshphong_frag:_y,meshphysical_vert:xy,meshphysical_frag:vy,meshtoon_vert:yy,meshtoon_frag:My,points_vert:Sy,points_frag:wy,shadow_vert:by,shadow_frag:Ey,sprite_vert:Ty,sprite_frag:Ay},he={common:{diffuse:{value:new ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new ve(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},Qn={basic:{uniforms:cn([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:cn([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new ve(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:cn([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new ve(0)},specular:{value:new ve(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:cn([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:cn([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new ve(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:cn([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:cn([he.points,he.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:cn([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:cn([he.common,he.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:cn([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:cn([he.sprite,he.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distanceRGBA:{uniforms:cn([he.common,he.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distanceRGBA_vert,fragmentShader:Ke.distanceRGBA_frag},shadow:{uniforms:cn([he.lights,he.fog,{color:{value:new ve(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};Qn.physical={uniforms:cn([Qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new ve(0)},specularColor:{value:new ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const ho={r:0,b:0,g:0},hs=new zn,Ry=new Xe;function Cy(i,e,t,n,s,r,a){const o=new ve(0);let c=r===!0?0:1,l,u,h=null,d=0,f=null;function m(S){let x=S.isScene===!0?S.background:null;return x&&x.isTexture&&(x=(S.backgroundBlurriness>0?t:e).get(x)),x}function _(S){let x=!1;const R=m(S);R===null?p(o,c):R&&R.isColor&&(p(R,1),x=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(S,x){const R=m(x);R&&(R.isCubeTexture||R.mapping===tc)?(u===void 0&&(u=new $(new st(1,1,1),new Ci({name:"BackgroundCubeMaterial",uniforms:vr(Qn.backgroundCube.uniforms),vertexShader:Qn.backgroundCube.vertexShader,fragmentShader:Qn.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,P,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),hs.copy(x.backgroundRotation),hs.x*=-1,hs.y*=-1,hs.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(hs.y*=-1,hs.z*=-1),u.material.uniforms.envMap.value=R,u.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Ry.makeRotationFromEuler(hs)),u.material.toneMapped=Je.getTransfer(R.colorSpace)!==mt,(h!==R||d!==R.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=R,d=R.version,f=i.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):R&&R.isTexture&&(l===void 0&&(l=new $(new Cr(2,2),new Ci({name:"BackgroundMaterial",uniforms:vr(Qn.background.uniforms),vertexShader:Qn.background.vertexShader,fragmentShader:Qn.background.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=R,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=Je.getTransfer(R.colorSpace)!==mt,R.matrixAutoUpdate===!0&&R.updateMatrix(),l.material.uniforms.uvTransform.value.copy(R.matrix),(h!==R||d!==R.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=R,d=R.version,f=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,x){S.getRGB(ho,hp(i)),n.buffers.color.setClear(ho.r,ho.g,ho.b,x,a)}function y(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,x=1){o.set(S),c=x,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,p(o,c)},render:_,addToRenderList:g,dispose:y}}function Py(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(E,I,H,V,X){let Q=!1;const j=h(V,H,I);r!==j&&(r=j,l(r.object)),Q=f(E,V,H,X),Q&&m(E,V,H,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(Q||a)&&(a=!1,x(E,I,H,V),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function c(){return i.createVertexArray()}function l(E){return i.bindVertexArray(E)}function u(E){return i.deleteVertexArray(E)}function h(E,I,H){const V=H.wireframe===!0;let X=n[E.id];X===void 0&&(X={},n[E.id]=X);let Q=X[I.id];Q===void 0&&(Q={},X[I.id]=Q);let j=Q[V];return j===void 0&&(j=d(c()),Q[V]=j),j}function d(E){const I=[],H=[],V=[];for(let X=0;X<t;X++)I[X]=0,H[X]=0,V[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:H,attributeDivisors:V,object:E,attributes:{},index:null}}function f(E,I,H,V){const X=r.attributes,Q=I.attributes;let j=0;const ee=H.getAttributes();for(const G in ee)if(ee[G].location>=0){const _e=X[G];let Le=Q[G];if(Le===void 0&&(G==="instanceMatrix"&&E.instanceMatrix&&(Le=E.instanceMatrix),G==="instanceColor"&&E.instanceColor&&(Le=E.instanceColor)),_e===void 0||_e.attribute!==Le||Le&&_e.data!==Le.data)return!0;j++}return r.attributesNum!==j||r.index!==V}function m(E,I,H,V){const X={},Q=I.attributes;let j=0;const ee=H.getAttributes();for(const G in ee)if(ee[G].location>=0){let _e=Q[G];_e===void 0&&(G==="instanceMatrix"&&E.instanceMatrix&&(_e=E.instanceMatrix),G==="instanceColor"&&E.instanceColor&&(_e=E.instanceColor));const Le={};Le.attribute=_e,_e&&_e.data&&(Le.data=_e.data),X[G]=Le,j++}r.attributes=X,r.attributesNum=j,r.index=V}function _(){const E=r.newAttributes;for(let I=0,H=E.length;I<H;I++)E[I]=0}function g(E){p(E,0)}function p(E,I){const H=r.newAttributes,V=r.enabledAttributes,X=r.attributeDivisors;H[E]=1,V[E]===0&&(i.enableVertexAttribArray(E),V[E]=1),X[E]!==I&&(i.vertexAttribDivisor(E,I),X[E]=I)}function y(){const E=r.newAttributes,I=r.enabledAttributes;for(let H=0,V=I.length;H<V;H++)I[H]!==E[H]&&(i.disableVertexAttribArray(H),I[H]=0)}function S(E,I,H,V,X,Q,j){j===!0?i.vertexAttribIPointer(E,I,H,X,Q):i.vertexAttribPointer(E,I,H,V,X,Q)}function x(E,I,H,V){_();const X=V.attributes,Q=H.getAttributes(),j=I.defaultAttributeValues;for(const ee in Q){const G=Q[ee];if(G.location>=0){let de=X[ee];if(de===void 0&&(ee==="instanceMatrix"&&E.instanceMatrix&&(de=E.instanceMatrix),ee==="instanceColor"&&E.instanceColor&&(de=E.instanceColor)),de!==void 0){const _e=de.normalized,Le=de.itemSize,je=e.get(de);if(je===void 0)continue;const At=je.buffer,_t=je.type,Y=je.bytesPerElement,fe=_t===i.INT||_t===i.UNSIGNED_INT||de.gpuType===Gu;if(de.isInterleavedBufferAttribute){const ce=de.data,Ue=ce.stride,Fe=de.offset;if(ce.isInstancedInterleavedBuffer){for(let Ge=0;Ge<G.locationSize;Ge++)p(G.location+Ge,ce.meshPerAttribute);E.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Ge=0;Ge<G.locationSize;Ge++)g(G.location+Ge);i.bindBuffer(i.ARRAY_BUFFER,At);for(let Ge=0;Ge<G.locationSize;Ge++)S(G.location+Ge,Le/G.locationSize,_t,_e,Ue*Y,(Fe+Le/G.locationSize*Ge)*Y,fe)}else{if(de.isInstancedBufferAttribute){for(let ce=0;ce<G.locationSize;ce++)p(G.location+ce,de.meshPerAttribute);E.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let ce=0;ce<G.locationSize;ce++)g(G.location+ce);i.bindBuffer(i.ARRAY_BUFFER,At);for(let ce=0;ce<G.locationSize;ce++)S(G.location+ce,Le/G.locationSize,_t,_e,Le*Y,Le/G.locationSize*ce*Y,fe)}}else if(j!==void 0){const _e=j[ee];if(_e!==void 0)switch(_e.length){case 2:i.vertexAttrib2fv(G.location,_e);break;case 3:i.vertexAttrib3fv(G.location,_e);break;case 4:i.vertexAttrib4fv(G.location,_e);break;default:i.vertexAttrib1fv(G.location,_e)}}}}y()}function R(){N();for(const E in n){const I=n[E];for(const H in I){const V=I[H];for(const X in V)u(V[X].object),delete V[X];delete I[H]}delete n[E]}}function A(E){if(n[E.id]===void 0)return;const I=n[E.id];for(const H in I){const V=I[H];for(const X in V)u(V[X].object),delete V[X];delete I[H]}delete n[E.id]}function P(E){for(const I in n){const H=n[I];if(H[E.id]===void 0)continue;const V=H[E.id];for(const X in V)u(V[X].object),delete V[X];delete H[E.id]}}function N(){b(),a=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:N,resetDefaultState:b,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function Ly(i,e,t){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function o(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let f=0;for(let m=0;m<h;m++)f+=u[m];t.update(f,n,1)}function c(l,u,h,d){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<l.length;m++)a(l[m],u[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let m=0;for(let _=0;_<h;_++)m+=u[_]*d[_];t.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Iy(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==Fn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const N=P===ba&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==ri&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==jn&&!N)}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=m>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:S,maxFragmentUniforms:x,vertexTextures:R,maxSamples:A}}function Dy(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new zi,o=new Ye,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const m=h.clippingPlanes,_=h.clipIntersection,g=h.clipShadows,p=i.get(h);if(!s||m===null||m.length===0||r&&!g)r?u(null):l();else{const y=r?0:n,S=y*4;let x=p.clippingState||null;c.value=x,x=u(m,d,S,f);for(let R=0;R!==S;++R)x[R]=t[R];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,m){const _=h!==null?h.length:0;let g=null;if(_!==0){if(g=c.value,m!==!0||g===null){const p=f+_*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let S=0,x=f;S!==_;++S,x+=4)a.copy(h[S]).applyMatrix4(y,o),a.normal.toArray(g,x),g[x+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function Ny(i){let e=new WeakMap;function t(a,o){return o===Fo?a.mapping=gr:o===Hl&&(a.mapping=_r),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Fo||o===Hl)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new b0(c.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const tr=4,Gd=[.125,.215,.35,.446,.526,.582],ys=20,Jc=new dh,Wd=new ve;let Qc=null,el=0,tl=0,nl=!1;const _s=(1+Math.sqrt(5))/2,Js=1/_s,Xd=[new T(-_s,Js,0),new T(_s,Js,0),new T(-Js,0,_s),new T(Js,0,_s),new T(0,_s,-Js),new T(0,_s,Js),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)],Uy=new T;class qd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Uy}=r;Qc=this._renderer.getRenderTarget(),el=this._renderer.getActiveCubeFace(),tl=this._renderer.getActiveMipmapLevel(),nl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=jd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Qc,el,tl),this._renderer.xr.enabled=nl,e.scissorTest=!1,fo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===gr||e.mapping===_r?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Qc=this._renderer.getRenderTarget(),el=this._renderer.getActiveCubeFace(),tl=this._renderer.getActiveMipmapLevel(),nl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:En,minFilter:En,generateMipmaps:!1,type:ba,format:Fn,colorSpace:dn,depthBuffer:!1},s=Yd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yd(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Fy(r)),this._blurMaterial=Oy(r,e,t)}return s}_compileMaterial(e){const t=new $(this._lodPlanes[0],e);this._renderer.compile(t,Jc)}_sceneToCubeUV(e,t,n,s,r){const c=new un(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Wd),h.toneMapping=ji,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));const _=new et({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1}),g=new $(new st,_);let p=!1;const y=e.background;y?y.isColor&&(_.color.copy(y),e.background=null,p=!0):(_.color.copy(Wd),p=!0);for(let S=0;S<6;S++){const x=S%3;x===0?(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[S],r.y,r.z)):x===1?(c.up.set(0,0,l[S]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[S],r.z)):(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[S]));const R=this._cubeSize;fo(s,x*R,S>2?R:0,R,R),h.setRenderTarget(s),p&&h.render(g,c),h.render(e,c)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=y}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===gr||e.mapping===_r;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=jd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kd());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new $(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;fo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Jc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Xd[(s-r-1)%Xd.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new $(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ys-1),_=r/m,g=isFinite(r)?1+Math.floor(u*_):ys;g>ys&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ys}`);const p=[];let y=0;for(let P=0;P<ys;++P){const N=P/_,b=Math.exp(-N*N/2);p.push(b),P===0?y+=b:P<g&&(y+=2*b)}for(let P=0;P<p.length;P++)p[P]=p[P]/y;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:S}=this;d.dTheta.value=m,d.mipInt.value=S-n;const x=this._sizeLods[s],R=3*x*(s>S-tr?s-S+tr:0),A=4*(this._cubeSize-x);fo(t,R,A,3*x,2*x),c.setRenderTarget(t),c.render(h,Jc)}}function Fy(i){const e=[],t=[],n=[];let s=i;const r=i-tr+1+Gd.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-tr?c=Gd[a-i+tr-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,m=6,_=3,g=2,p=1,y=new Float32Array(_*m*f),S=new Float32Array(g*m*f),x=new Float32Array(p*m*f);for(let A=0;A<f;A++){const P=A%3*2/3-1,N=A>2?0:-1,b=[P,N,0,P+2/3,N,0,P+2/3,N+1,0,P,N,0,P+2/3,N+1,0,P,N+1,0];y.set(b,_*m*A),S.set(d,g*m*A);const E=[A,A,A,A,A,A];x.set(E,p*m*A)}const R=new wt;R.setAttribute("position",new Xt(y,_)),R.setAttribute("uv",new Xt(S,g)),R.setAttribute("faceIndex",new Xt(x,p)),e.push(R),s>tr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Yd(i,e,t){const n=new As(i,e,t);return n.texture.mapping=tc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function fo(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Oy(i,e,t){const n=new Float32Array(ys),s=new T(0,1,0);return new Ci({name:"SphericalGaussianBlur",defines:{n:ys,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:mh(),fragmentShader:`

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
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function Kd(){return new Ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:mh(),fragmentShader:`

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
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function jd(){return new Ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:mh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function mh(){return`

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
	`}function By(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Fo||c===Hl,u=c===gr||c===_r;if(l||u){let h=e.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new qd(i)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return l&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new qd(i)),h=l?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function ky(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&ir("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function zy(i,e,t,n){const s={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function c(h){const d=h.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function l(h){const d=[],f=h.index,m=h.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let S=0,x=y.length;S<x;S+=3){const R=y[S+0],A=y[S+1],P=y[S+2];d.push(R,A,A,P,P,R)}}else if(m!==void 0){const y=m.array;_=m.version;for(let S=0,x=y.length/3-1;S<x;S+=3){const R=S+0,A=S+1,P=S+2;d.push(R,A,A,P,P,R)}}else return;const g=new(ap(d)?up:lp)(d,1);g.version=_;const p=r.get(h);p&&e.remove(p),r.set(h,g)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function Hy(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*a),t.update(f,n,1)}function l(d,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,d*a,m),t.update(f,n,m))}function u(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function h(d,f,m,_){if(m===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,m);let p=0;for(let y=0;y<m;y++)p+=f[y]*_[y];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Vy(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Gy(i,e,t){const n=new WeakMap,s=new ut;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let E=function(){N.dispose(),n.delete(o),o.removeEventListener("dispose",E)};var f=E;d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let x=0;m===!0&&(x=1),_===!0&&(x=2),g===!0&&(x=3);let R=o.attributes.position.count*x,A=1;R>e.maxTextureSize&&(A=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const P=new Float32Array(R*A*4*h),N=new op(P,R,A,h);N.type=jn,N.needsUpdate=!0;const b=x*4;for(let I=0;I<h;I++){const H=p[I],V=y[I],X=S[I],Q=R*A*4*I;for(let j=0;j<H.count;j++){const ee=j*b;m===!0&&(s.fromBufferAttribute(H,j),P[Q+ee+0]=s.x,P[Q+ee+1]=s.y,P[Q+ee+2]=s.z,P[Q+ee+3]=0),_===!0&&(s.fromBufferAttribute(V,j),P[Q+ee+4]=s.x,P[Q+ee+5]=s.y,P[Q+ee+6]=s.z,P[Q+ee+7]=0),g===!0&&(s.fromBufferAttribute(X,j),P[Q+ee+8]=s.x,P[Q+ee+9]=s.y,P[Q+ee+10]=s.z,P[Q+ee+11]=X.itemSize===4?s.w:1)}}d={count:h,texture:N,size:new ue(R,A)},n.set(o,d),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let g=0;g<l.length;g++)m+=l[g];const _=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Wy(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return h}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}const Ip=new Qt,$d=new gp(1,1),Dp=new op,Np=new o0,Up=new fp,Zd=[],Jd=[],Qd=new Float32Array(16),ef=new Float32Array(9),tf=new Float32Array(4);function Ir(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Zd[s];if(r===void 0&&(r=new Float32Array(s),Zd[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function jt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function oc(i,e){let t=Jd[e];t===void 0&&(t=new Int32Array(e),Jd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Xy(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function qy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;i.uniform2fv(this.addr,e),jt(t,e)}}function Yy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Kt(t,e))return;i.uniform3fv(this.addr,e),jt(t,e)}}function Ky(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;i.uniform4fv(this.addr,e),jt(t,e)}}function jy(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),jt(t,e)}else{if(Kt(t,n))return;tf.set(n),i.uniformMatrix2fv(this.addr,!1,tf),jt(t,n)}}function $y(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),jt(t,e)}else{if(Kt(t,n))return;ef.set(n),i.uniformMatrix3fv(this.addr,!1,ef),jt(t,n)}}function Zy(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),jt(t,e)}else{if(Kt(t,n))return;Qd.set(n),i.uniformMatrix4fv(this.addr,!1,Qd),jt(t,n)}}function Jy(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Qy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;i.uniform2iv(this.addr,e),jt(t,e)}}function eM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;i.uniform3iv(this.addr,e),jt(t,e)}}function tM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;i.uniform4iv(this.addr,e),jt(t,e)}}function nM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function iM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;i.uniform2uiv(this.addr,e),jt(t,e)}}function sM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;i.uniform3uiv(this.addr,e),jt(t,e)}}function rM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;i.uniform4uiv(this.addr,e),jt(t,e)}}function aM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?($d.compareFunction=rp,r=$d):r=Ip,t.setTexture2D(e||r,s)}function oM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Np,s)}function cM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Up,s)}function lM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Dp,s)}function uM(i){switch(i){case 5126:return Xy;case 35664:return qy;case 35665:return Yy;case 35666:return Ky;case 35674:return jy;case 35675:return $y;case 35676:return Zy;case 5124:case 35670:return Jy;case 35667:case 35671:return Qy;case 35668:case 35672:return eM;case 35669:case 35673:return tM;case 5125:return nM;case 36294:return iM;case 36295:return sM;case 36296:return rM;case 35678:case 36198:case 36298:case 36306:case 35682:return aM;case 35679:case 36299:case 36307:return oM;case 35680:case 36300:case 36308:case 36293:return cM;case 36289:case 36303:case 36311:case 36292:return lM}}function hM(i,e){i.uniform1fv(this.addr,e)}function dM(i,e){const t=Ir(e,this.size,2);i.uniform2fv(this.addr,t)}function fM(i,e){const t=Ir(e,this.size,3);i.uniform3fv(this.addr,t)}function pM(i,e){const t=Ir(e,this.size,4);i.uniform4fv(this.addr,t)}function mM(i,e){const t=Ir(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function gM(i,e){const t=Ir(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function _M(i,e){const t=Ir(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function xM(i,e){i.uniform1iv(this.addr,e)}function vM(i,e){i.uniform2iv(this.addr,e)}function yM(i,e){i.uniform3iv(this.addr,e)}function MM(i,e){i.uniform4iv(this.addr,e)}function SM(i,e){i.uniform1uiv(this.addr,e)}function wM(i,e){i.uniform2uiv(this.addr,e)}function bM(i,e){i.uniform3uiv(this.addr,e)}function EM(i,e){i.uniform4uiv(this.addr,e)}function TM(i,e,t){const n=this.cache,s=e.length,r=oc(t,s);Kt(n,r)||(i.uniform1iv(this.addr,r),jt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Ip,r[a])}function AM(i,e,t){const n=this.cache,s=e.length,r=oc(t,s);Kt(n,r)||(i.uniform1iv(this.addr,r),jt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Np,r[a])}function RM(i,e,t){const n=this.cache,s=e.length,r=oc(t,s);Kt(n,r)||(i.uniform1iv(this.addr,r),jt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Up,r[a])}function CM(i,e,t){const n=this.cache,s=e.length,r=oc(t,s);Kt(n,r)||(i.uniform1iv(this.addr,r),jt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Dp,r[a])}function PM(i){switch(i){case 5126:return hM;case 35664:return dM;case 35665:return fM;case 35666:return pM;case 35674:return mM;case 35675:return gM;case 35676:return _M;case 5124:case 35670:return xM;case 35667:case 35671:return vM;case 35668:case 35672:return yM;case 35669:case 35673:return MM;case 5125:return SM;case 36294:return wM;case 36295:return bM;case 36296:return EM;case 35678:case 36198:case 36298:case 36306:case 35682:return TM;case 35679:case 36299:case 36307:return AM;case 35680:case 36300:case 36308:case 36293:return RM;case 36289:case 36303:case 36311:case 36292:return CM}}class LM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=uM(t.type)}}class IM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=PM(t.type)}}class DM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const il=/(\w+)(\])?(\[|\.)?/g;function nf(i,e){i.seq.push(e),i.map[e.id]=e}function NM(i,e,t){const n=i.name,s=n.length;for(il.lastIndex=0;;){const r=il.exec(n),a=il.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){nf(t,l===void 0?new LM(o,i,e):new IM(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new DM(o),nf(t,h)),t=h}}}class Ao{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);NM(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function sf(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const UM=37297;let FM=0;function OM(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const rf=new Ye;function BM(i){Je._getMatrix(rf,Je.workingColorSpace,i);const e=`mat3( ${rf.elements.map(t=>t.toFixed(4))} )`;switch(Je.getTransfer(i)){case Bo:return[e,"LinearTransferOETF"];case mt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function af(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+OM(i.getShaderSource(e),o)}else return r}function kM(i,e){const t=BM(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function zM(i,e){let t;switch(e){case vg:t="Linear";break;case yg:t="Reinhard";break;case Mg:t="Cineon";break;case Kf:t="ACESFilmic";break;case wg:t="AgX";break;case bg:t="Neutral";break;case Sg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const po=new T;function HM(){Je.getLuminanceCoefficients(po);const i=po.x.toFixed(4),e=po.y.toFixed(4),t=po.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function VM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($r).join(`
`)}function GM(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function WM(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function $r(i){return i!==""}function of(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function cf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const XM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mu(i){return i.replace(XM,YM)}const qM=new Map;function YM(i,e){let t=Ke[e];if(t===void 0){const n=qM.get(e);if(n!==void 0)t=Ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Mu(t)}const KM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lf(i){return i.replace(KM,jM)}function jM(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function uf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function $M(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Hu?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Jm?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===vi&&(e="SHADOWMAP_TYPE_VSM"),e}function ZM(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case gr:case _r:e="ENVMAP_TYPE_CUBE";break;case tc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function JM(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===_r&&(e="ENVMAP_MODE_REFRACTION"),e}function QM(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Vu:e="ENVMAP_BLENDING_MULTIPLY";break;case _g:e="ENVMAP_BLENDING_MIX";break;case xg:e="ENVMAP_BLENDING_ADD";break}return e}function eS(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function tS(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=$M(t),l=ZM(t),u=JM(t),h=QM(t),d=eS(t),f=VM(t),m=GM(r),_=s.createProgram();let g,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter($r).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter($r).join(`
`),p.length>0&&(p+=`
`)):(g=[uf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($r).join(`
`),p=[uf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ji?"#define TONE_MAPPING":"",t.toneMapping!==ji?Ke.tonemapping_pars_fragment:"",t.toneMapping!==ji?zM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,kM("linearToOutputTexel",t.outputColorSpace),HM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($r).join(`
`)),a=Mu(a),a=of(a,t),a=cf(a,t),o=Mu(o),o=of(o,t),o=cf(o,t),a=lf(a),o=lf(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===$h?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===$h?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=y+g+a,x=y+p+o,R=sf(s,s.VERTEX_SHADER,S),A=sf(s,s.FRAGMENT_SHADER,x);s.attachShader(_,R),s.attachShader(_,A),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function P(I){if(i.debug.checkShaderErrors){const H=s.getProgramInfoLog(_)||"",V=s.getShaderInfoLog(R)||"",X=s.getShaderInfoLog(A)||"",Q=H.trim(),j=V.trim(),ee=X.trim();let G=!0,de=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,R,A);else{const _e=af(s,R,"vertex"),Le=af(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+Q+`
`+_e+`
`+Le)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(j===""||ee==="")&&(de=!1);de&&(I.diagnostics={runnable:G,programLog:Q,vertexShader:{log:j,prefix:g},fragmentShader:{log:ee,prefix:p}})}s.deleteShader(R),s.deleteShader(A),N=new Ao(s,_),b=WM(s,_)}let N;this.getUniforms=function(){return N===void 0&&P(this),N};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let E=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(_,UM)),E},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=FM++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=A,this}let nS=0;class iS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new sS(e),t.set(e,n)),n}}class sS{constructor(e){this.id=nS++,this.code=e,this.usedTimes=0}}function rS(i,e,t,n,s,r,a){const o=new Qu,c=new iS,l=new Set,u=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function g(b,E,I,H,V){const X=H.fog,Q=V.geometry,j=b.isMeshStandardMaterial?H.environment:null,ee=(b.isMeshStandardMaterial?t:e).get(b.envMap||j),G=ee&&ee.mapping===tc?ee.image.height:null,de=m[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const _e=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Le=_e!==void 0?_e.length:0;let je=0;Q.morphAttributes.position!==void 0&&(je=1),Q.morphAttributes.normal!==void 0&&(je=2),Q.morphAttributes.color!==void 0&&(je=3);let At,_t,Y,fe;if(de){const ht=Qn[de];At=ht.vertexShader,_t=ht.fragmentShader}else At=b.vertexShader,_t=b.fragmentShader,c.update(b),Y=c.getVertexShaderID(b),fe=c.getFragmentShaderID(b);const ce=i.getRenderTarget(),Ue=i.state.buffers.depth.getReversed(),Fe=V.isInstancedMesh===!0,Ge=V.isBatchedMesh===!0,Ut=!!b.map,rt=!!b.matcap,D=!!ee,yt=!!b.aoMap,De=!!b.lightMap,lt=!!b.bumpMap,Pe=!!b.normalMap,Rt=!!b.displacementMap,Me=!!b.emissiveMap,$e=!!b.metalnessMap,$t=!!b.roughnessMap,Ft=b.anisotropy>0,C=b.clearcoat>0,M=b.dispersion>0,B=b.iridescence>0,q=b.sheen>0,te=b.transmission>0,W=Ft&&!!b.anisotropyMap,Ce=C&&!!b.clearcoatMap,oe=C&&!!b.clearcoatNormalMap,Ee=C&&!!b.clearcoatRoughnessMap,Te=B&&!!b.iridescenceMap,re=B&&!!b.iridescenceThicknessMap,ge=q&&!!b.sheenColorMap,ke=q&&!!b.sheenRoughnessMap,Ae=!!b.specularMap,pe=!!b.specularColorMap,qe=!!b.specularIntensityMap,U=te&&!!b.transmissionMap,ae=te&&!!b.thicknessMap,le=!!b.gradientMap,ye=!!b.alphaMap,ie=b.alphaTest>0,J=!!b.alphaHash,we=!!b.extensions;let We=ji;b.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(We=i.toneMapping);const Mt={shaderID:de,shaderType:b.type,shaderName:b.name,vertexShader:At,fragmentShader:_t,defines:b.defines,customVertexShaderID:Y,customFragmentShaderID:fe,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Ge,batchingColor:Ge&&V._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&V.instanceColor!==null,instancingMorph:Fe&&V.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ce===null?i.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:dn,alphaToCoverage:!!b.alphaToCoverage,map:Ut,matcap:rt,envMap:D,envMapMode:D&&ee.mapping,envMapCubeUVHeight:G,aoMap:yt,lightMap:De,bumpMap:lt,normalMap:Pe,displacementMap:d&&Rt,emissiveMap:Me,normalMapObjectSpace:Pe&&b.normalMapType===Pg,normalMapTangentSpace:Pe&&b.normalMapType===$u,metalnessMap:$e,roughnessMap:$t,anisotropy:Ft,anisotropyMap:W,clearcoat:C,clearcoatMap:Ce,clearcoatNormalMap:oe,clearcoatRoughnessMap:Ee,dispersion:M,iridescence:B,iridescenceMap:Te,iridescenceThicknessMap:re,sheen:q,sheenColorMap:ge,sheenRoughnessMap:ke,specularMap:Ae,specularColorMap:pe,specularIntensityMap:qe,transmission:te,transmissionMap:U,thicknessMap:ae,gradientMap:le,opaque:b.transparent===!1&&b.blending===nr&&b.alphaToCoverage===!1,alphaMap:ye,alphaTest:ie,alphaHash:J,combine:b.combine,mapUv:Ut&&_(b.map.channel),aoMapUv:yt&&_(b.aoMap.channel),lightMapUv:De&&_(b.lightMap.channel),bumpMapUv:lt&&_(b.bumpMap.channel),normalMapUv:Pe&&_(b.normalMap.channel),displacementMapUv:Rt&&_(b.displacementMap.channel),emissiveMapUv:Me&&_(b.emissiveMap.channel),metalnessMapUv:$e&&_(b.metalnessMap.channel),roughnessMapUv:$t&&_(b.roughnessMap.channel),anisotropyMapUv:W&&_(b.anisotropyMap.channel),clearcoatMapUv:Ce&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:oe&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:re&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:ke&&_(b.sheenRoughnessMap.channel),specularMapUv:Ae&&_(b.specularMap.channel),specularColorMapUv:pe&&_(b.specularColorMap.channel),specularIntensityMapUv:qe&&_(b.specularIntensityMap.channel),transmissionMapUv:U&&_(b.transmissionMap.channel),thicknessMapUv:ae&&_(b.thicknessMap.channel),alphaMapUv:ye&&_(b.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(Pe||Ft),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!Q.attributes.uv&&(Ut||ye),fog:!!X,useFog:b.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Ue,skinning:V.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:Le,morphTextureStride:je,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:We,decodeVideoTexture:Ut&&b.map.isVideoTexture===!0&&Je.getTransfer(b.map.colorSpace)===mt,decodeVideoTextureEmissive:Me&&b.emissiveMap.isVideoTexture===!0&&Je.getTransfer(b.emissiveMap.colorSpace)===mt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ht,flipSided:b.side===gn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:we&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(we&&b.extensions.multiDraw===!0||Ge)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Mt.vertexUv1s=l.has(1),Mt.vertexUv2s=l.has(2),Mt.vertexUv3s=l.has(3),l.clear(),Mt}function p(b){const E=[];if(b.shaderID?E.push(b.shaderID):(E.push(b.customVertexShaderID),E.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)E.push(I),E.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(y(E,b),S(E,b),E.push(i.outputColorSpace)),E.push(b.customProgramCacheKey),E.join()}function y(b,E){b.push(E.precision),b.push(E.outputColorSpace),b.push(E.envMapMode),b.push(E.envMapCubeUVHeight),b.push(E.mapUv),b.push(E.alphaMapUv),b.push(E.lightMapUv),b.push(E.aoMapUv),b.push(E.bumpMapUv),b.push(E.normalMapUv),b.push(E.displacementMapUv),b.push(E.emissiveMapUv),b.push(E.metalnessMapUv),b.push(E.roughnessMapUv),b.push(E.anisotropyMapUv),b.push(E.clearcoatMapUv),b.push(E.clearcoatNormalMapUv),b.push(E.clearcoatRoughnessMapUv),b.push(E.iridescenceMapUv),b.push(E.iridescenceThicknessMapUv),b.push(E.sheenColorMapUv),b.push(E.sheenRoughnessMapUv),b.push(E.specularMapUv),b.push(E.specularColorMapUv),b.push(E.specularIntensityMapUv),b.push(E.transmissionMapUv),b.push(E.thicknessMapUv),b.push(E.combine),b.push(E.fogExp2),b.push(E.sizeAttenuation),b.push(E.morphTargetsCount),b.push(E.morphAttributeCount),b.push(E.numDirLights),b.push(E.numPointLights),b.push(E.numSpotLights),b.push(E.numSpotLightMaps),b.push(E.numHemiLights),b.push(E.numRectAreaLights),b.push(E.numDirLightShadows),b.push(E.numPointLightShadows),b.push(E.numSpotLightShadows),b.push(E.numSpotLightShadowsWithMaps),b.push(E.numLightProbes),b.push(E.shadowMapType),b.push(E.toneMapping),b.push(E.numClippingPlanes),b.push(E.numClipIntersection),b.push(E.depthPacking)}function S(b,E){o.disableAll(),E.supportsVertexTextures&&o.enable(0),E.instancing&&o.enable(1),E.instancingColor&&o.enable(2),E.instancingMorph&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),E.dispersion&&o.enable(20),E.batchingColor&&o.enable(21),E.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),b.push(o.mask)}function x(b){const E=m[b.type];let I;if(E){const H=Qn[E];I=y0.clone(H.uniforms)}else I=b.uniforms;return I}function R(b,E){let I;for(let H=0,V=u.length;H<V;H++){const X=u[H];if(X.cacheKey===E){I=X,++I.usedTimes;break}}return I===void 0&&(I=new tS(i,E,b,r),u.push(I)),I}function A(b){if(--b.usedTimes===0){const E=u.indexOf(b);u[E]=u[u.length-1],u.pop(),b.destroy()}}function P(b){c.remove(b)}function N(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:x,acquireProgram:R,releaseProgram:A,releaseShaderCache:P,programs:u,dispose:N}}function aS(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function oS(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function hf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function df(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,d,f,m,_,g){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:m,renderOrder:h.renderOrder,z:_,group:g},i[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=h.renderOrder,p.z=_,p.group=g),e++,p}function o(h,d,f,m,_,g){const p=a(h,d,f,m,_,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(h,d,f,m,_,g){const p=a(h,d,f,m,_,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function l(h,d){t.length>1&&t.sort(h||oS),n.length>1&&n.sort(d||hf),s.length>1&&s.sort(d||hf)}function u(){for(let h=e,d=i.length;h<d;h++){const f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:u,sort:l}}function cS(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new df,i.set(n,[a])):s>=r.length?(a=new df,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function lS(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new ve};break;case"SpotLight":t={position:new T,direction:new T,color:new ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new ve,groundColor:new ve};break;case"RectAreaLight":t={color:new ve,position:new T,halfWidth:new T,halfHeight:new T};break}return i[e.id]=t,t}}}function uS(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let hS=0;function dS(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function fS(i){const e=new lS,t=uS(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new T);const s=new T,r=new Xe,a=new Xe;function o(l){let u=0,h=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,y=0,S=0,x=0,R=0,A=0,P=0;l.sort(dS);for(let b=0,E=l.length;b<E;b++){const I=l[b],H=I.color,V=I.intensity,X=I.distance,Q=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=H.r*V,h+=H.g*V,d+=H.b*V;else if(I.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(I.sh.coefficients[j],V);P++}else if(I.isDirectionalLight){const j=e.get(I);if(j.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ee=I.shadow,G=t.get(I);G.shadowIntensity=ee.intensity,G.shadowBias=ee.bias,G.shadowNormalBias=ee.normalBias,G.shadowRadius=ee.radius,G.shadowMapSize=ee.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=Q,n.directionalShadowMatrix[f]=I.shadow.matrix,y++}n.directional[f]=j,f++}else if(I.isSpotLight){const j=e.get(I);j.position.setFromMatrixPosition(I.matrixWorld),j.color.copy(H).multiplyScalar(V),j.distance=X,j.coneCos=Math.cos(I.angle),j.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),j.decay=I.decay,n.spot[_]=j;const ee=I.shadow;if(I.map&&(n.spotLightMap[R]=I.map,R++,ee.updateMatrices(I),I.castShadow&&A++),n.spotLightMatrix[_]=ee.matrix,I.castShadow){const G=t.get(I);G.shadowIntensity=ee.intensity,G.shadowBias=ee.bias,G.shadowNormalBias=ee.normalBias,G.shadowRadius=ee.radius,G.shadowMapSize=ee.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=Q,x++}_++}else if(I.isRectAreaLight){const j=e.get(I);j.color.copy(H).multiplyScalar(V),j.halfWidth.set(I.width*.5,0,0),j.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=j,g++}else if(I.isPointLight){const j=e.get(I);if(j.color.copy(I.color).multiplyScalar(I.intensity),j.distance=I.distance,j.decay=I.decay,I.castShadow){const ee=I.shadow,G=t.get(I);G.shadowIntensity=ee.intensity,G.shadowBias=ee.bias,G.shadowNormalBias=ee.normalBias,G.shadowRadius=ee.radius,G.shadowMapSize=ee.mapSize,G.shadowCameraNear=ee.camera.near,G.shadowCameraFar=ee.camera.far,n.pointShadow[m]=G,n.pointShadowMap[m]=Q,n.pointShadowMatrix[m]=I.shadow.matrix,S++}n.point[m]=j,m++}else if(I.isHemisphereLight){const j=e.get(I);j.skyColor.copy(I.color).multiplyScalar(V),j.groundColor.copy(I.groundColor).multiplyScalar(V),n.hemi[p]=j,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=he.LTC_FLOAT_1,n.rectAreaLTC2=he.LTC_FLOAT_2):(n.rectAreaLTC1=he.LTC_HALF_1,n.rectAreaLTC2=he.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const N=n.hash;(N.directionalLength!==f||N.pointLength!==m||N.spotLength!==_||N.rectAreaLength!==g||N.hemiLength!==p||N.numDirectionalShadows!==y||N.numPointShadows!==S||N.numSpotShadows!==x||N.numSpotMaps!==R||N.numLightProbes!==P)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=x+R-A,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=P,N.directionalLength=f,N.pointLength=m,N.spotLength=_,N.rectAreaLength=g,N.hemiLength=p,N.numDirectionalShadows=y,N.numPointShadows=S,N.numSpotShadows=x,N.numSpotMaps=R,N.numLightProbes=P,n.version=hS++)}function c(l,u){let h=0,d=0,f=0,m=0,_=0;const g=u.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const S=l[p];if(S.isDirectionalLight){const x=n.directional[h];x.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),h++}else if(S.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),f++}else if(S.isRectAreaLight){const x=n.rectArea[m];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(g),a.identity(),r.copy(S.matrixWorld),r.premultiply(g),a.extractRotation(r),x.halfWidth.set(S.width*.5,0,0),x.halfHeight.set(0,S.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),m++}else if(S.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(g),d++}else if(S.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(S.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:o,setupView:c,state:n}}function ff(i){const e=new fS(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function pS(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new ff(i),e.set(s,[o])):r>=a.length?(o=new ff(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const mS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gS=`uniform sampler2D shadow_pass;
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
}`;function _S(i,e,t){let n=new ih;const s=new ue,r=new ue,a=new ut,o=new m_({depthPacking:Cg}),c=new g_,l={},u=t.maxTextureSize,h={[si]:gn,[gn]:si,[Ht]:Ht},d=new Ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:mS,fragmentShader:gS}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new wt;m.setAttribute("position",new Xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new $(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hu;let p=this.type;this.render=function(A,P,N){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;const b=i.getRenderTarget(),E=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),H=i.state;H.setBlending(Ki),H.buffers.depth.getReversed()?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const V=p!==vi&&this.type===vi,X=p===vi&&this.type!==vi;for(let Q=0,j=A.length;Q<j;Q++){const ee=A[Q],G=ee.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const de=G.getFrameExtents();if(s.multiply(de),r.copy(G.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/de.x),s.x=r.x*de.x,G.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/de.y),s.y=r.y*de.y,G.mapSize.y=r.y)),G.map===null||V===!0||X===!0){const Le=this.type!==vi?{minFilter:hn,magFilter:hn}:{};G.map!==null&&G.map.dispose(),G.map=new As(s.x,s.y,Le),G.map.texture.name=ee.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const _e=G.getViewportCount();for(let Le=0;Le<_e;Le++){const je=G.getViewport(Le);a.set(r.x*je.x,r.y*je.y,r.x*je.z,r.y*je.w),H.viewport(a),G.updateMatrices(ee,Le),n=G.getFrustum(),x(P,N,G.camera,ee,this.type)}G.isPointLightShadow!==!0&&this.type===vi&&y(G,N),G.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(b,E,I)};function y(A,P){const N=e.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new As(s.x,s.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(P,null,N,d,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(P,null,N,f,_,null)}function S(A,P,N,b){let E=null;const I=N.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(I!==void 0)E=I;else if(E=N.isPointLight===!0?c:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const H=E.uuid,V=P.uuid;let X=l[H];X===void 0&&(X={},l[H]=X);let Q=X[V];Q===void 0&&(Q=E.clone(),X[V]=Q,P.addEventListener("dispose",R)),E=Q}if(E.visible=P.visible,E.wireframe=P.wireframe,b===vi?E.side=P.shadowSide!==null?P.shadowSide:P.side:E.side=P.shadowSide!==null?P.shadowSide:h[P.side],E.alphaMap=P.alphaMap,E.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,E.map=P.map,E.clipShadows=P.clipShadows,E.clippingPlanes=P.clippingPlanes,E.clipIntersection=P.clipIntersection,E.displacementMap=P.displacementMap,E.displacementScale=P.displacementScale,E.displacementBias=P.displacementBias,E.wireframeLinewidth=P.wireframeLinewidth,E.linewidth=P.linewidth,N.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const H=i.properties.get(E);H.light=N}return E}function x(A,P,N,b,E){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&E===vi)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,A.matrixWorld);const V=e.update(A),X=A.material;if(Array.isArray(X)){const Q=V.groups;for(let j=0,ee=Q.length;j<ee;j++){const G=Q[j],de=X[G.materialIndex];if(de&&de.visible){const _e=S(A,de,b,E);A.onBeforeShadow(i,A,P,N,V,_e,G),i.renderBufferDirect(N,null,V,_e,A,G),A.onAfterShadow(i,A,P,N,V,_e,G)}}}else if(X.visible){const Q=S(A,X,b,E);A.onBeforeShadow(i,A,P,N,V,Q,null),i.renderBufferDirect(N,null,V,Q,A,null),A.onAfterShadow(i,A,P,N,V,Q,null)}}const H=A.children;for(let V=0,X=H.length;V<X;V++)x(H[V],P,N,b,E)}function R(A){A.target.removeEventListener("dispose",R);for(const N in l){const b=l[N],E=A.target.uuid;E in b&&(b[E].dispose(),delete b[E])}}}const xS={[Nl]:Ul,[Fl]:kl,[Ol]:zl,[mr]:Bl,[Ul]:Nl,[kl]:Fl,[zl]:Ol,[Bl]:mr};function vS(i,e){function t(){let U=!1;const ae=new ut;let le=null;const ye=new ut(0,0,0,0);return{setMask:function(ie){le!==ie&&!U&&(i.colorMask(ie,ie,ie,ie),le=ie)},setLocked:function(ie){U=ie},setClear:function(ie,J,we,We,Mt){Mt===!0&&(ie*=We,J*=We,we*=We),ae.set(ie,J,we,We),ye.equals(ae)===!1&&(i.clearColor(ie,J,we,We),ye.copy(ae))},reset:function(){U=!1,le=null,ye.set(-1,0,0,0)}}}function n(){let U=!1,ae=!1,le=null,ye=null,ie=null;return{setReversed:function(J){if(ae!==J){const we=e.get("EXT_clip_control");J?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),ae=J;const We=ie;ie=null,this.setClear(We)}},getReversed:function(){return ae},setTest:function(J){J?ce(i.DEPTH_TEST):Ue(i.DEPTH_TEST)},setMask:function(J){le!==J&&!U&&(i.depthMask(J),le=J)},setFunc:function(J){if(ae&&(J=xS[J]),ye!==J){switch(J){case Nl:i.depthFunc(i.NEVER);break;case Ul:i.depthFunc(i.ALWAYS);break;case Fl:i.depthFunc(i.LESS);break;case mr:i.depthFunc(i.LEQUAL);break;case Ol:i.depthFunc(i.EQUAL);break;case Bl:i.depthFunc(i.GEQUAL);break;case kl:i.depthFunc(i.GREATER);break;case zl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ye=J}},setLocked:function(J){U=J},setClear:function(J){ie!==J&&(ae&&(J=1-J),i.clearDepth(J),ie=J)},reset:function(){U=!1,le=null,ye=null,ie=null,ae=!1}}}function s(){let U=!1,ae=null,le=null,ye=null,ie=null,J=null,we=null,We=null,Mt=null;return{setTest:function(ht){U||(ht?ce(i.STENCIL_TEST):Ue(i.STENCIL_TEST))},setMask:function(ht){ae!==ht&&!U&&(i.stencilMask(ht),ae=ht)},setFunc:function(ht,li,Zn){(le!==ht||ye!==li||ie!==Zn)&&(i.stencilFunc(ht,li,Zn),le=ht,ye=li,ie=Zn)},setOp:function(ht,li,Zn){(J!==ht||we!==li||We!==Zn)&&(i.stencilOp(ht,li,Zn),J=ht,we=li,We=Zn)},setLocked:function(ht){U=ht},setClear:function(ht){Mt!==ht&&(i.clearStencil(ht),Mt=ht)},reset:function(){U=!1,ae=null,le=null,ye=null,ie=null,J=null,we=null,We=null,Mt=null}}}const r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let u={},h={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,y=null,S=null,x=null,R=null,A=null,P=new ve(0,0,0),N=0,b=!1,E=null,I=null,H=null,V=null,X=null;const Q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,ee=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(G)[1]),j=ee>=1):G.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),j=ee>=2);let de=null,_e={};const Le=i.getParameter(i.SCISSOR_BOX),je=i.getParameter(i.VIEWPORT),At=new ut().fromArray(Le),_t=new ut().fromArray(je);function Y(U,ae,le,ye){const ie=new Uint8Array(4),J=i.createTexture();i.bindTexture(U,J),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let we=0;we<le;we++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ae,0,i.RGBA,1,1,ye,0,i.RGBA,i.UNSIGNED_BYTE,ie):i.texImage2D(ae+we,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ie);return J}const fe={};fe[i.TEXTURE_2D]=Y(i.TEXTURE_2D,i.TEXTURE_2D,1),fe[i.TEXTURE_CUBE_MAP]=Y(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),fe[i.TEXTURE_2D_ARRAY]=Y(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),fe[i.TEXTURE_3D]=Y(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ce(i.DEPTH_TEST),a.setFunc(mr),lt(!1),Pe(Vh),ce(i.CULL_FACE),yt(Ki);function ce(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function Ue(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function Fe(U,ae){return h[U]!==ae?(i.bindFramebuffer(U,ae),h[U]=ae,U===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ae),U===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ae),!0):!1}function Ge(U,ae){let le=f,ye=!1;if(U){le=d.get(ae),le===void 0&&(le=[],d.set(ae,le));const ie=U.textures;if(le.length!==ie.length||le[0]!==i.COLOR_ATTACHMENT0){for(let J=0,we=ie.length;J<we;J++)le[J]=i.COLOR_ATTACHMENT0+J;le.length=ie.length,ye=!0}}else le[0]!==i.BACK&&(le[0]=i.BACK,ye=!0);ye&&i.drawBuffers(le)}function Ut(U){return m!==U?(i.useProgram(U),m=U,!0):!1}const rt={[vs]:i.FUNC_ADD,[eg]:i.FUNC_SUBTRACT,[tg]:i.FUNC_REVERSE_SUBTRACT};rt[ng]=i.MIN,rt[ig]=i.MAX;const D={[sg]:i.ZERO,[rg]:i.ONE,[ag]:i.SRC_COLOR,[Il]:i.SRC_ALPHA,[dg]:i.SRC_ALPHA_SATURATE,[ug]:i.DST_COLOR,[cg]:i.DST_ALPHA,[og]:i.ONE_MINUS_SRC_COLOR,[Dl]:i.ONE_MINUS_SRC_ALPHA,[hg]:i.ONE_MINUS_DST_COLOR,[lg]:i.ONE_MINUS_DST_ALPHA,[fg]:i.CONSTANT_COLOR,[pg]:i.ONE_MINUS_CONSTANT_COLOR,[mg]:i.CONSTANT_ALPHA,[gg]:i.ONE_MINUS_CONSTANT_ALPHA};function yt(U,ae,le,ye,ie,J,we,We,Mt,ht){if(U===Ki){_===!0&&(Ue(i.BLEND),_=!1);return}if(_===!1&&(ce(i.BLEND),_=!0),U!==Qm){if(U!==g||ht!==b){if((p!==vs||x!==vs)&&(i.blendEquation(i.FUNC_ADD),p=vs,x=vs),ht)switch(U){case nr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pr:i.blendFunc(i.ONE,i.ONE);break;case Gh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case nr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Gh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}y=null,S=null,R=null,A=null,P.set(0,0,0),N=0,g=U,b=ht}return}ie=ie||ae,J=J||le,we=we||ye,(ae!==p||ie!==x)&&(i.blendEquationSeparate(rt[ae],rt[ie]),p=ae,x=ie),(le!==y||ye!==S||J!==R||we!==A)&&(i.blendFuncSeparate(D[le],D[ye],D[J],D[we]),y=le,S=ye,R=J,A=we),(We.equals(P)===!1||Mt!==N)&&(i.blendColor(We.r,We.g,We.b,Mt),P.copy(We),N=Mt),g=U,b=!1}function De(U,ae){U.side===Ht?Ue(i.CULL_FACE):ce(i.CULL_FACE);let le=U.side===gn;ae&&(le=!le),lt(le),U.blending===nr&&U.transparent===!1?yt(Ki):yt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const ye=U.stencilWrite;o.setTest(ye),ye&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Me(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ce(i.SAMPLE_ALPHA_TO_COVERAGE):Ue(i.SAMPLE_ALPHA_TO_COVERAGE)}function lt(U){E!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),E=U)}function Pe(U){U!==$m?(ce(i.CULL_FACE),U!==I&&(U===Vh?i.cullFace(i.BACK):U===Zm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ue(i.CULL_FACE),I=U}function Rt(U){U!==H&&(j&&i.lineWidth(U),H=U)}function Me(U,ae,le){U?(ce(i.POLYGON_OFFSET_FILL),(V!==ae||X!==le)&&(i.polygonOffset(ae,le),V=ae,X=le)):Ue(i.POLYGON_OFFSET_FILL)}function $e(U){U?ce(i.SCISSOR_TEST):Ue(i.SCISSOR_TEST)}function $t(U){U===void 0&&(U=i.TEXTURE0+Q-1),de!==U&&(i.activeTexture(U),de=U)}function Ft(U,ae,le){le===void 0&&(de===null?le=i.TEXTURE0+Q-1:le=de);let ye=_e[le];ye===void 0&&(ye={type:void 0,texture:void 0},_e[le]=ye),(ye.type!==U||ye.texture!==ae)&&(de!==le&&(i.activeTexture(le),de=le),i.bindTexture(U,ae||fe[U]),ye.type=U,ye.texture=ae)}function C(){const U=_e[de];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function M(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function B(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function q(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function te(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ce(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function oe(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ee(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Te(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function re(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ge(U){At.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),At.copy(U))}function ke(U){_t.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),_t.copy(U))}function Ae(U,ae){let le=l.get(ae);le===void 0&&(le=new WeakMap,l.set(ae,le));let ye=le.get(U);ye===void 0&&(ye=i.getUniformBlockIndex(ae,U.name),le.set(U,ye))}function pe(U,ae){const ye=l.get(ae).get(U);c.get(ae)!==ye&&(i.uniformBlockBinding(ae,ye,U.__bindingPointIndex),c.set(ae,ye))}function qe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},de=null,_e={},h={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,y=null,S=null,x=null,R=null,A=null,P=new ve(0,0,0),N=0,b=!1,E=null,I=null,H=null,V=null,X=null,At.set(0,0,i.canvas.width,i.canvas.height),_t.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ce,disable:Ue,bindFramebuffer:Fe,drawBuffers:Ge,useProgram:Ut,setBlending:yt,setMaterial:De,setFlipSided:lt,setCullFace:Pe,setLineWidth:Rt,setPolygonOffset:Me,setScissorTest:$e,activeTexture:$t,bindTexture:Ft,unbindTexture:C,compressedTexImage2D:M,compressedTexImage3D:B,texImage2D:Te,texImage3D:re,updateUBOMapping:Ae,uniformBlockBinding:pe,texStorage2D:oe,texStorage3D:Ee,texSubImage2D:q,texSubImage3D:te,compressedTexSubImage2D:W,compressedTexSubImage3D:Ce,scissor:ge,viewport:ke,reset:qe}}function yS(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ue,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,M){return f?new OffscreenCanvas(C,M):fa("canvas")}function _(C,M,B){let q=1;const te=Ft(C);if((te.width>B||te.height>B)&&(q=B/Math.max(te.width,te.height)),q<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const W=Math.floor(q*te.width),Ce=Math.floor(q*te.height);h===void 0&&(h=m(W,Ce));const oe=M?m(W,Ce):h;return oe.width=W,oe.height=Ce,oe.getContext("2d").drawImage(C,0,0,W,Ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+W+"x"+Ce+")."),oe}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),C;return C}function g(C){return C.generateMipmaps}function p(C){i.generateMipmap(C)}function y(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(C,M,B,q,te=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let W=M;if(M===i.RED&&(B===i.FLOAT&&(W=i.R32F),B===i.HALF_FLOAT&&(W=i.R16F),B===i.UNSIGNED_BYTE&&(W=i.R8)),M===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(W=i.R8UI),B===i.UNSIGNED_SHORT&&(W=i.R16UI),B===i.UNSIGNED_INT&&(W=i.R32UI),B===i.BYTE&&(W=i.R8I),B===i.SHORT&&(W=i.R16I),B===i.INT&&(W=i.R32I)),M===i.RG&&(B===i.FLOAT&&(W=i.RG32F),B===i.HALF_FLOAT&&(W=i.RG16F),B===i.UNSIGNED_BYTE&&(W=i.RG8)),M===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(W=i.RG8UI),B===i.UNSIGNED_SHORT&&(W=i.RG16UI),B===i.UNSIGNED_INT&&(W=i.RG32UI),B===i.BYTE&&(W=i.RG8I),B===i.SHORT&&(W=i.RG16I),B===i.INT&&(W=i.RG32I)),M===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(W=i.RGB8UI),B===i.UNSIGNED_SHORT&&(W=i.RGB16UI),B===i.UNSIGNED_INT&&(W=i.RGB32UI),B===i.BYTE&&(W=i.RGB8I),B===i.SHORT&&(W=i.RGB16I),B===i.INT&&(W=i.RGB32I)),M===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(W=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(W=i.RGBA16UI),B===i.UNSIGNED_INT&&(W=i.RGBA32UI),B===i.BYTE&&(W=i.RGBA8I),B===i.SHORT&&(W=i.RGBA16I),B===i.INT&&(W=i.RGBA32I)),M===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(W=i.RGB9_E5),M===i.RGBA){const Ce=te?Bo:Je.getTransfer(q);B===i.FLOAT&&(W=i.RGBA32F),B===i.HALF_FLOAT&&(W=i.RGBA16F),B===i.UNSIGNED_BYTE&&(W=Ce===mt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(W=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(W=i.RGB5_A1)}return(W===i.R16F||W===i.R32F||W===i.RG16F||W===i.RG32F||W===i.RGBA16F||W===i.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function x(C,M){let B;return C?M===null||M===Ts||M===ca?B=i.DEPTH24_STENCIL8:M===jn?B=i.DEPTH32F_STENCIL8:M===oa&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Ts||M===ca?B=i.DEPTH_COMPONENT24:M===jn?B=i.DEPTH_COMPONENT32F:M===oa&&(B=i.DEPTH_COMPONENT16),B}function R(C,M){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==hn&&C.minFilter!==En?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function A(C){const M=C.target;M.removeEventListener("dispose",A),N(M),M.isVideoTexture&&u.delete(M)}function P(C){const M=C.target;M.removeEventListener("dispose",P),E(M)}function N(C){const M=n.get(C);if(M.__webglInit===void 0)return;const B=C.source,q=d.get(B);if(q){const te=q[M.__cacheKey];te.usedTimes--,te.usedTimes===0&&b(C),Object.keys(q).length===0&&d.delete(B)}n.remove(C)}function b(C){const M=n.get(C);i.deleteTexture(M.__webglTexture);const B=C.source,q=d.get(B);delete q[M.__cacheKey],a.memory.textures--}function E(C){const M=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(M.__webglFramebuffer[q]))for(let te=0;te<M.__webglFramebuffer[q].length;te++)i.deleteFramebuffer(M.__webglFramebuffer[q][te]);else i.deleteFramebuffer(M.__webglFramebuffer[q]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[q])}else{if(Array.isArray(M.__webglFramebuffer))for(let q=0;q<M.__webglFramebuffer.length;q++)i.deleteFramebuffer(M.__webglFramebuffer[q]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let q=0;q<M.__webglColorRenderbuffer.length;q++)M.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[q]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const B=C.textures;for(let q=0,te=B.length;q<te;q++){const W=n.get(B[q]);W.__webglTexture&&(i.deleteTexture(W.__webglTexture),a.memory.textures--),n.remove(B[q])}n.remove(C)}let I=0;function H(){I=0}function V(){const C=I;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),I+=1,C}function X(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function Q(C,M){const B=n.get(C);if(C.isVideoTexture&&$e(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&B.__version!==C.version){const q=C.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{fe(B,C,M);return}}else C.isExternalTexture&&(B.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+M)}function j(C,M){const B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){fe(B,C,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+M)}function ee(C,M){const B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){fe(B,C,M);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+M)}function G(C,M){const B=n.get(C);if(C.version>0&&B.__version!==C.version){ce(B,C,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+M)}const de={[es]:i.REPEAT,[Gi]:i.CLAMP_TO_EDGE,[Oo]:i.MIRRORED_REPEAT},_e={[hn]:i.NEAREST,[$f]:i.NEAREST_MIPMAP_NEAREST,[Kr]:i.NEAREST_MIPMAP_LINEAR,[En]:i.LINEAR,[Mo]:i.LINEAR_MIPMAP_NEAREST,[wi]:i.LINEAR_MIPMAP_LINEAR},Le={[Lg]:i.NEVER,[Og]:i.ALWAYS,[Ig]:i.LESS,[rp]:i.LEQUAL,[Dg]:i.EQUAL,[Fg]:i.GEQUAL,[Ng]:i.GREATER,[Ug]:i.NOTEQUAL};function je(C,M){if(M.type===jn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===En||M.magFilter===Mo||M.magFilter===Kr||M.magFilter===wi||M.minFilter===En||M.minFilter===Mo||M.minFilter===Kr||M.minFilter===wi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,de[M.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,de[M.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,de[M.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,_e[M.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,_e[M.minFilter]),M.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Le[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===hn||M.minFilter!==Kr&&M.minFilter!==wi||M.type===jn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function At(C,M){let B=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",A));const q=M.source;let te=d.get(q);te===void 0&&(te={},d.set(q,te));const W=X(M);if(W!==C.__cacheKey){te[W]===void 0&&(te[W]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),te[W].usedTimes++;const Ce=te[C.__cacheKey];Ce!==void 0&&(te[C.__cacheKey].usedTimes--,Ce.usedTimes===0&&b(M)),C.__cacheKey=W,C.__webglTexture=te[W].texture}return B}function _t(C,M,B){return Math.floor(Math.floor(C/B)/M)}function Y(C,M,B,q){const W=C.updateRanges;if(W.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,B,q,M.data);else{W.sort((re,ge)=>re.start-ge.start);let Ce=0;for(let re=1;re<W.length;re++){const ge=W[Ce],ke=W[re],Ae=ge.start+ge.count,pe=_t(ke.start,M.width,4),qe=_t(ge.start,M.width,4);ke.start<=Ae+1&&pe===qe&&_t(ke.start+ke.count-1,M.width,4)===pe?ge.count=Math.max(ge.count,ke.start+ke.count-ge.start):(++Ce,W[Ce]=ke)}W.length=Ce+1;const oe=i.getParameter(i.UNPACK_ROW_LENGTH),Ee=i.getParameter(i.UNPACK_SKIP_PIXELS),Te=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let re=0,ge=W.length;re<ge;re++){const ke=W[re],Ae=Math.floor(ke.start/4),pe=Math.ceil(ke.count/4),qe=Ae%M.width,U=Math.floor(Ae/M.width),ae=pe,le=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,qe),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,qe,U,ae,le,B,q,M.data)}C.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,oe),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ee),i.pixelStorei(i.UNPACK_SKIP_ROWS,Te)}}function fe(C,M,B){let q=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(q=i.TEXTURE_3D);const te=At(C,M),W=M.source;t.bindTexture(q,C.__webglTexture,i.TEXTURE0+B);const Ce=n.get(W);if(W.version!==Ce.__version||te===!0){t.activeTexture(i.TEXTURE0+B);const oe=Je.getPrimaries(Je.workingColorSpace),Ee=M.colorSpace===Vi?null:Je.getPrimaries(M.colorSpace),Te=M.colorSpace===Vi||oe===Ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);let re=_(M.image,!1,s.maxTextureSize);re=$t(M,re);const ge=r.convert(M.format,M.colorSpace),ke=r.convert(M.type);let Ae=S(M.internalFormat,ge,ke,M.colorSpace,M.isVideoTexture);je(q,M);let pe;const qe=M.mipmaps,U=M.isVideoTexture!==!0,ae=Ce.__version===void 0||te===!0,le=W.dataReady,ye=R(M,re);if(M.isDepthTexture)Ae=x(M.format===ua,M.type),ae&&(U?t.texStorage2D(i.TEXTURE_2D,1,Ae,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,Ae,re.width,re.height,0,ge,ke,null));else if(M.isDataTexture)if(qe.length>0){U&&ae&&t.texStorage2D(i.TEXTURE_2D,ye,Ae,qe[0].width,qe[0].height);for(let ie=0,J=qe.length;ie<J;ie++)pe=qe[ie],U?le&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,pe.width,pe.height,ge,ke,pe.data):t.texImage2D(i.TEXTURE_2D,ie,Ae,pe.width,pe.height,0,ge,ke,pe.data);M.generateMipmaps=!1}else U?(ae&&t.texStorage2D(i.TEXTURE_2D,ye,Ae,re.width,re.height),le&&Y(M,re,ge,ke)):t.texImage2D(i.TEXTURE_2D,0,Ae,re.width,re.height,0,ge,ke,re.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){U&&ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Ae,qe[0].width,qe[0].height,re.depth);for(let ie=0,J=qe.length;ie<J;ie++)if(pe=qe[ie],M.format!==Fn)if(ge!==null)if(U){if(le)if(M.layerUpdates.size>0){const we=Vd(pe.width,pe.height,M.format,M.type);for(const We of M.layerUpdates){const Mt=pe.data.subarray(We*we/pe.data.BYTES_PER_ELEMENT,(We+1)*we/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,We,pe.width,pe.height,1,ge,Mt)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,pe.width,pe.height,re.depth,ge,pe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,Ae,pe.width,pe.height,re.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?le&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,pe.width,pe.height,re.depth,ge,ke,pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,Ae,pe.width,pe.height,re.depth,0,ge,ke,pe.data)}else{U&&ae&&t.texStorage2D(i.TEXTURE_2D,ye,Ae,qe[0].width,qe[0].height);for(let ie=0,J=qe.length;ie<J;ie++)pe=qe[ie],M.format!==Fn?ge!==null?U?le&&t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,pe.width,pe.height,ge,pe.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,Ae,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?le&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,pe.width,pe.height,ge,ke,pe.data):t.texImage2D(i.TEXTURE_2D,ie,Ae,pe.width,pe.height,0,ge,ke,pe.data)}else if(M.isDataArrayTexture)if(U){if(ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Ae,re.width,re.height,re.depth),le)if(M.layerUpdates.size>0){const ie=Vd(re.width,re.height,M.format,M.type);for(const J of M.layerUpdates){const we=re.data.subarray(J*ie/re.data.BYTES_PER_ELEMENT,(J+1)*ie/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,re.width,re.height,1,ge,ke,we)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,ge,ke,re.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ae,re.width,re.height,re.depth,0,ge,ke,re.data);else if(M.isData3DTexture)U?(ae&&t.texStorage3D(i.TEXTURE_3D,ye,Ae,re.width,re.height,re.depth),le&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,ge,ke,re.data)):t.texImage3D(i.TEXTURE_3D,0,Ae,re.width,re.height,re.depth,0,ge,ke,re.data);else if(M.isFramebufferTexture){if(ae)if(U)t.texStorage2D(i.TEXTURE_2D,ye,Ae,re.width,re.height);else{let ie=re.width,J=re.height;for(let we=0;we<ye;we++)t.texImage2D(i.TEXTURE_2D,we,Ae,ie,J,0,ge,ke,null),ie>>=1,J>>=1}}else if(qe.length>0){if(U&&ae){const ie=Ft(qe[0]);t.texStorage2D(i.TEXTURE_2D,ye,Ae,ie.width,ie.height)}for(let ie=0,J=qe.length;ie<J;ie++)pe=qe[ie],U?le&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,ge,ke,pe):t.texImage2D(i.TEXTURE_2D,ie,Ae,ge,ke,pe);M.generateMipmaps=!1}else if(U){if(ae){const ie=Ft(re);t.texStorage2D(i.TEXTURE_2D,ye,Ae,ie.width,ie.height)}le&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge,ke,re)}else t.texImage2D(i.TEXTURE_2D,0,Ae,ge,ke,re);g(M)&&p(q),Ce.__version=W.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function ce(C,M,B){if(M.image.length!==6)return;const q=At(C,M),te=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+B);const W=n.get(te);if(te.version!==W.__version||q===!0){t.activeTexture(i.TEXTURE0+B);const Ce=Je.getPrimaries(Je.workingColorSpace),oe=M.colorSpace===Vi?null:Je.getPrimaries(M.colorSpace),Ee=M.colorSpace===Vi||Ce===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const Te=M.isCompressedTexture||M.image[0].isCompressedTexture,re=M.image[0]&&M.image[0].isDataTexture,ge=[];for(let J=0;J<6;J++)!Te&&!re?ge[J]=_(M.image[J],!0,s.maxCubemapSize):ge[J]=re?M.image[J].image:M.image[J],ge[J]=$t(M,ge[J]);const ke=ge[0],Ae=r.convert(M.format,M.colorSpace),pe=r.convert(M.type),qe=S(M.internalFormat,Ae,pe,M.colorSpace),U=M.isVideoTexture!==!0,ae=W.__version===void 0||q===!0,le=te.dataReady;let ye=R(M,ke);je(i.TEXTURE_CUBE_MAP,M);let ie;if(Te){U&&ae&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,qe,ke.width,ke.height);for(let J=0;J<6;J++){ie=ge[J].mipmaps;for(let we=0;we<ie.length;we++){const We=ie[we];M.format!==Fn?Ae!==null?U?le&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,we,0,0,We.width,We.height,Ae,We.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,we,qe,We.width,We.height,0,We.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,we,0,0,We.width,We.height,Ae,pe,We.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,we,qe,We.width,We.height,0,Ae,pe,We.data)}}}else{if(ie=M.mipmaps,U&&ae){ie.length>0&&ye++;const J=Ft(ge[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,qe,J.width,J.height)}for(let J=0;J<6;J++)if(re){U?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ge[J].width,ge[J].height,Ae,pe,ge[J].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,qe,ge[J].width,ge[J].height,0,Ae,pe,ge[J].data);for(let we=0;we<ie.length;we++){const Mt=ie[we].image[J].image;U?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,we+1,0,0,Mt.width,Mt.height,Ae,pe,Mt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,we+1,qe,Mt.width,Mt.height,0,Ae,pe,Mt.data)}}else{U?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Ae,pe,ge[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,qe,Ae,pe,ge[J]);for(let we=0;we<ie.length;we++){const We=ie[we];U?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,we+1,0,0,Ae,pe,We.image[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,we+1,qe,Ae,pe,We.image[J])}}}g(M)&&p(i.TEXTURE_CUBE_MAP),W.__version=te.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Ue(C,M,B,q,te,W){const Ce=r.convert(B.format,B.colorSpace),oe=r.convert(B.type),Ee=S(B.internalFormat,Ce,oe,B.colorSpace),Te=n.get(M),re=n.get(B);if(re.__renderTarget=M,!Te.__hasExternalTextures){const ge=Math.max(1,M.width>>W),ke=Math.max(1,M.height>>W);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,W,Ee,ge,ke,M.depth,0,Ce,oe,null):t.texImage2D(te,W,Ee,ge,ke,0,Ce,oe,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),Me(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,te,re.__webglTexture,0,Rt(M)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,te,re.__webglTexture,W),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Fe(C,M,B){if(i.bindRenderbuffer(i.RENDERBUFFER,C),M.depthBuffer){const q=M.depthTexture,te=q&&q.isDepthTexture?q.type:null,W=x(M.stencilBuffer,te),Ce=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=Rt(M);Me(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,oe,W,M.width,M.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,oe,W,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,W,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ce,i.RENDERBUFFER,C)}else{const q=M.textures;for(let te=0;te<q.length;te++){const W=q[te],Ce=r.convert(W.format,W.colorSpace),oe=r.convert(W.type),Ee=S(W.internalFormat,Ce,oe,W.colorSpace),Te=Rt(M);B&&Me(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Te,Ee,M.width,M.height):Me(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Te,Ee,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Ee,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ge(C,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(M.depthTexture);q.__renderTarget=M,(!q.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Q(M.depthTexture,0);const te=q.__webglTexture,W=Rt(M);if(M.depthTexture.format===la)Me(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0);else if(M.depthTexture.format===ua)Me(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Ut(C){const M=n.get(C),B=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){const q=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),q){const te=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,q.removeEventListener("dispose",te)};q.addEventListener("dispose",te),M.__depthDisposeCallback=te}M.__boundDepthTexture=q}if(C.depthTexture&&!M.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");const q=C.texture.mipmaps;q&&q.length>0?Ge(M.__webglFramebuffer[0],C):Ge(M.__webglFramebuffer,C)}else if(B){M.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[q]),M.__webglDepthbuffer[q]===void 0)M.__webglDepthbuffer[q]=i.createRenderbuffer(),Fe(M.__webglDepthbuffer[q],C,!1);else{const te=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=M.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,W)}}else{const q=C.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),Fe(M.__webglDepthbuffer,C,!1);else{const te=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,W)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function rt(C,M,B){const q=n.get(C);M!==void 0&&Ue(q.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Ut(C)}function D(C){const M=C.texture,B=n.get(C),q=n.get(M);C.addEventListener("dispose",P);const te=C.textures,W=C.isWebGLCubeRenderTarget===!0,Ce=te.length>1;if(Ce||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=M.version,a.memory.textures++),W){B.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[oe]=[];for(let Ee=0;Ee<M.mipmaps.length;Ee++)B.__webglFramebuffer[oe][Ee]=i.createFramebuffer()}else B.__webglFramebuffer[oe]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let oe=0;oe<M.mipmaps.length;oe++)B.__webglFramebuffer[oe]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Ce)for(let oe=0,Ee=te.length;oe<Ee;oe++){const Te=n.get(te[oe]);Te.__webglTexture===void 0&&(Te.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&Me(C)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let oe=0;oe<te.length;oe++){const Ee=te[oe];B.__webglColorRenderbuffer[oe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[oe]);const Te=r.convert(Ee.format,Ee.colorSpace),re=r.convert(Ee.type),ge=S(Ee.internalFormat,Te,re,Ee.colorSpace,C.isXRRenderTarget===!0),ke=Rt(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,ke,ge,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,B.__webglColorRenderbuffer[oe])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),Fe(B.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(W){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),je(i.TEXTURE_CUBE_MAP,M);for(let oe=0;oe<6;oe++)if(M.mipmaps&&M.mipmaps.length>0)for(let Ee=0;Ee<M.mipmaps.length;Ee++)Ue(B.__webglFramebuffer[oe][Ee],C,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ee);else Ue(B.__webglFramebuffer[oe],C,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);g(M)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ce){for(let oe=0,Ee=te.length;oe<Ee;oe++){const Te=te[oe],re=n.get(Te);let ge=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ge=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ge,re.__webglTexture),je(ge,Te),Ue(B.__webglFramebuffer,C,Te,i.COLOR_ATTACHMENT0+oe,ge,0),g(Te)&&p(ge)}t.unbindTexture()}else{let oe=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(oe=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(oe,q.__webglTexture),je(oe,M),M.mipmaps&&M.mipmaps.length>0)for(let Ee=0;Ee<M.mipmaps.length;Ee++)Ue(B.__webglFramebuffer[Ee],C,M,i.COLOR_ATTACHMENT0,oe,Ee);else Ue(B.__webglFramebuffer,C,M,i.COLOR_ATTACHMENT0,oe,0);g(M)&&p(oe),t.unbindTexture()}C.depthBuffer&&Ut(C)}function yt(C){const M=C.textures;for(let B=0,q=M.length;B<q;B++){const te=M[B];if(g(te)){const W=y(C),Ce=n.get(te).__webglTexture;t.bindTexture(W,Ce),p(W),t.unbindTexture()}}}const De=[],lt=[];function Pe(C){if(C.samples>0){if(Me(C)===!1){const M=C.textures,B=C.width,q=C.height;let te=i.COLOR_BUFFER_BIT;const W=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ce=n.get(C),oe=M.length>1;if(oe)for(let Te=0;Te<M.length;Te++)t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer);const Ee=C.texture.mipmaps;Ee&&Ee.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let Te=0;Te<M.length;Te++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),oe){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[Te]);const re=n.get(M[Te]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,re,0)}i.blitFramebuffer(0,0,B,q,0,0,B,q,te,i.NEAREST),c===!0&&(De.length=0,lt.length=0,De.push(i.COLOR_ATTACHMENT0+Te),C.depthBuffer&&C.resolveDepthBuffer===!1&&(De.push(W),lt.push(W),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,lt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,De))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),oe)for(let Te=0;Te<M.length;Te++){t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[Te]);const re=n.get(M[Te]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,re,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const M=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function Rt(C){return Math.min(s.maxSamples,C.samples)}function Me(C){const M=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function $e(C){const M=a.render.frame;u.get(C)!==M&&(u.set(C,M),C.update())}function $t(C,M){const B=C.colorSpace,q=C.format,te=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||B!==dn&&B!==Vi&&(Je.getTransfer(B)===mt?(q!==Fn||te!==ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),M}function Ft(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=V,this.resetTextureUnits=H,this.setTexture2D=Q,this.setTexture2DArray=j,this.setTexture3D=ee,this.setTextureCube=G,this.rebindTextures=rt,this.setupRenderTarget=D,this.updateRenderTargetMipmap=yt,this.updateMultisampleRenderTarget=Pe,this.setupDepthRenderbuffer=Ut,this.setupFrameBufferTexture=Ue,this.useMultisampledRTT=Me}function MS(i,e){function t(n,s=Vi){let r;const a=Je.getTransfer(s);if(n===ri)return i.UNSIGNED_BYTE;if(n===Wu)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Xu)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Qf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Zf)return i.BYTE;if(n===Jf)return i.SHORT;if(n===oa)return i.UNSIGNED_SHORT;if(n===Gu)return i.INT;if(n===Ts)return i.UNSIGNED_INT;if(n===jn)return i.FLOAT;if(n===ba)return i.HALF_FLOAT;if(n===ep)return i.ALPHA;if(n===tp)return i.RGB;if(n===Fn)return i.RGBA;if(n===la)return i.DEPTH_COMPONENT;if(n===ua)return i.DEPTH_STENCIL;if(n===qu)return i.RED;if(n===Yu)return i.RED_INTEGER;if(n===np)return i.RG;if(n===Ku)return i.RG_INTEGER;if(n===ju)return i.RGBA_INTEGER;if(n===So||n===wo||n===bo||n===Eo)if(a===mt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===So)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===wo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===bo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Eo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===So)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===wo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===bo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Eo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Vl||n===Gl||n===Wl||n===Xl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Vl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Gl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Wl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Xl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ql||n===Yl||n===Kl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ql||n===Yl)return a===mt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Kl)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===jl||n===$l||n===Zl||n===Jl||n===Ql||n===eu||n===tu||n===nu||n===iu||n===su||n===ru||n===au||n===ou||n===cu)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===jl)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===$l)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Zl)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Jl)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ql)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===eu)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===tu)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===nu)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===iu)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===su)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ru)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===au)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ou)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===cu)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===To||n===lu||n===uu)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===To)return a===mt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===lu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===uu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ip||n===hu||n===du||n===fu)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===To)return r.COMPRESSED_RED_RGTC1_EXT;if(n===hu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===du)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===fu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ca?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class Fp extends Qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}}const SS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,wS=`
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

}`;class bS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Fp(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ci({vertexShader:SS,fragmentShader:wS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new $(new Cr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ES extends Ar{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,f=null,m=null;const _=new bS,g={},p=t.getContextAttributes();let y=null,S=null;const x=[],R=[],A=new ue;let P=null;const N=new un;N.viewport=new ut;const b=new un;b.viewport=new ut;const E=[N,b],I=new U_;let H=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let fe=x[Y];return fe===void 0&&(fe=new zc,x[Y]=fe),fe.getTargetRaySpace()},this.getControllerGrip=function(Y){let fe=x[Y];return fe===void 0&&(fe=new zc,x[Y]=fe),fe.getGripSpace()},this.getHand=function(Y){let fe=x[Y];return fe===void 0&&(fe=new zc,x[Y]=fe),fe.getHandSpace()};function X(Y){const fe=R.indexOf(Y.inputSource);if(fe===-1)return;const ce=x[fe];ce!==void 0&&(ce.update(Y.inputSource,Y.frame,l||a),ce.dispatchEvent({type:Y.type,data:Y.inputSource}))}function Q(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",Q),s.removeEventListener("inputsourceschange",j);for(let Y=0;Y<x.length;Y++){const fe=R[Y];fe!==null&&(R[Y]=null,x[Y].disconnect(fe))}H=null,V=null,_.reset();for(const Y in g)delete g[Y];e.setRenderTarget(y),f=null,d=null,h=null,s=null,S=null,_t.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",Q),s.addEventListener("inputsourceschange",j),p.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(A),typeof XRWebGLBinding<"u"&&(h=new XRWebGLBinding(s,t)),h!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let ce=null,Ue=null,Fe=null;p.depth&&(Fe=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=p.stencil?ua:la,Ue=p.stencil?ca:Ts);const Ge={colorFormat:t.RGBA8,depthFormat:Fe,scaleFactor:r};d=h.createProjectionLayer(Ge),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new As(d.textureWidth,d.textureHeight,{format:Fn,type:ri,depthTexture:new gp(d.textureWidth,d.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ce={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ce),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new As(f.framebufferWidth,f.framebufferHeight,{format:Fn,type:ri,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),_t.setContext(s),_t.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function j(Y){for(let fe=0;fe<Y.removed.length;fe++){const ce=Y.removed[fe],Ue=R.indexOf(ce);Ue>=0&&(R[Ue]=null,x[Ue].disconnect(ce))}for(let fe=0;fe<Y.added.length;fe++){const ce=Y.added[fe];let Ue=R.indexOf(ce);if(Ue===-1){for(let Ge=0;Ge<x.length;Ge++)if(Ge>=R.length){R.push(ce),Ue=Ge;break}else if(R[Ge]===null){R[Ge]=ce,Ue=Ge;break}if(Ue===-1)break}const Fe=x[Ue];Fe&&Fe.connect(ce)}}const ee=new T,G=new T;function de(Y,fe,ce){ee.setFromMatrixPosition(fe.matrixWorld),G.setFromMatrixPosition(ce.matrixWorld);const Ue=ee.distanceTo(G),Fe=fe.projectionMatrix.elements,Ge=ce.projectionMatrix.elements,Ut=Fe[14]/(Fe[10]-1),rt=Fe[14]/(Fe[10]+1),D=(Fe[9]+1)/Fe[5],yt=(Fe[9]-1)/Fe[5],De=(Fe[8]-1)/Fe[0],lt=(Ge[8]+1)/Ge[0],Pe=Ut*De,Rt=Ut*lt,Me=Ue/(-De+lt),$e=Me*-De;if(fe.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX($e),Y.translateZ(Me),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Fe[10]===-1)Y.projectionMatrix.copy(fe.projectionMatrix),Y.projectionMatrixInverse.copy(fe.projectionMatrixInverse);else{const $t=Ut+Me,Ft=rt+Me,C=Pe-$e,M=Rt+(Ue-$e),B=D*rt/Ft*$t,q=yt*rt/Ft*$t;Y.projectionMatrix.makePerspective(C,M,B,q,$t,Ft),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function _e(Y,fe){fe===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(fe.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let fe=Y.near,ce=Y.far;_.texture!==null&&(_.depthNear>0&&(fe=_.depthNear),_.depthFar>0&&(ce=_.depthFar)),I.near=b.near=N.near=fe,I.far=b.far=N.far=ce,(H!==I.near||V!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),H=I.near,V=I.far),I.layers.mask=Y.layers.mask|6,N.layers.mask=I.layers.mask&3,b.layers.mask=I.layers.mask&5;const Ue=Y.parent,Fe=I.cameras;_e(I,Ue);for(let Ge=0;Ge<Fe.length;Ge++)_e(Fe[Ge],Ue);Fe.length===2?de(I,N,b):I.projectionMatrix.copy(N.projectionMatrix),Le(Y,I,Ue)};function Le(Y,fe,ce){ce===null?Y.matrix.copy(fe.matrixWorld):(Y.matrix.copy(ce.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(fe.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(fe.projectionMatrix),Y.projectionMatrixInverse.copy(fe.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=xr*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(Y){c=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(I)},this.getCameraTexture=function(Y){return g[Y]};let je=null;function At(Y,fe){if(u=fe.getViewerPose(l||a),m=fe,u!==null){const ce=u.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let Ue=!1;ce.length!==I.cameras.length&&(I.cameras.length=0,Ue=!0);for(let rt=0;rt<ce.length;rt++){const D=ce[rt];let yt=null;if(f!==null)yt=f.getViewport(D);else{const lt=h.getViewSubImage(d,D);yt=lt.viewport,rt===0&&(e.setRenderTargetTextures(S,lt.colorTexture,lt.depthStencilTexture),e.setRenderTarget(S))}let De=E[rt];De===void 0&&(De=new un,De.layers.enable(rt),De.viewport=new ut,E[rt]=De),De.matrix.fromArray(D.transform.matrix),De.matrix.decompose(De.position,De.quaternion,De.scale),De.projectionMatrix.fromArray(D.projectionMatrix),De.projectionMatrixInverse.copy(De.projectionMatrix).invert(),De.viewport.set(yt.x,yt.y,yt.width,yt.height),rt===0&&(I.matrix.copy(De.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Ue===!0&&I.cameras.push(De)}const Fe=s.enabledFeatures;if(Fe&&Fe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&h){const rt=h.getDepthInformation(ce[0]);rt&&rt.isValid&&rt.texture&&_.init(rt,s.renderState)}if(Fe&&Fe.includes("camera-access")&&(e.state.unbindTexture(),h))for(let rt=0;rt<ce.length;rt++){const D=ce[rt].camera;if(D){let yt=g[D];yt||(yt=new Fp,g[D]=yt);const De=h.getCameraImage(D);yt.sourceTexture=De}}}for(let ce=0;ce<x.length;ce++){const Ue=R[ce],Fe=x[ce];Ue!==null&&Fe!==void 0&&Fe.update(Ue,fe,l||a)}je&&je(Y,fe),fe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:fe}),m=null}const _t=new Lp;_t.setAnimationLoop(At),this.setAnimationLoop=function(Y){je=Y},this.dispose=function(){}}}const ds=new zn,TS=new Xe;function AS(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,hp(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,y,S,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),h(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,x)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,y,S):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===gn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===gn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=e.get(p),S=y.envMap,x=y.envMapRotation;S&&(g.envMap.value=S,ds.copy(x),ds.x*=-1,ds.y*=-1,ds.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ds.y*=-1,ds.z*=-1),g.envMapRotation.value.setFromMatrix4(TS.makeRotationFromEuler(ds)),g.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,y,S){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=S*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===gn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const y=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function RS(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,S){const x=S.program;n.uniformBlockBinding(y,x)}function l(y,S){let x=s[y.id];x===void 0&&(m(y),x=u(y),s[y.id]=x,y.addEventListener("dispose",g));const R=S.program;n.updateUBOMapping(y,R);const A=e.render.frame;r[y.id]!==A&&(d(y),r[y.id]=A)}function u(y){const S=h();y.__bindingPointIndex=S;const x=i.createBuffer(),R=y.__size,A=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,R,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,x),x}function h(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const S=s[y.id],x=y.uniforms,R=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let A=0,P=x.length;A<P;A++){const N=Array.isArray(x[A])?x[A]:[x[A]];for(let b=0,E=N.length;b<E;b++){const I=N[b];if(f(I,A,b,R)===!0){const H=I.__offset,V=Array.isArray(I.value)?I.value:[I.value];let X=0;for(let Q=0;Q<V.length;Q++){const j=V[Q],ee=_(j);typeof j=="number"||typeof j=="boolean"?(I.__data[0]=j,i.bufferSubData(i.UNIFORM_BUFFER,H+X,I.__data)):j.isMatrix3?(I.__data[0]=j.elements[0],I.__data[1]=j.elements[1],I.__data[2]=j.elements[2],I.__data[3]=0,I.__data[4]=j.elements[3],I.__data[5]=j.elements[4],I.__data[6]=j.elements[5],I.__data[7]=0,I.__data[8]=j.elements[6],I.__data[9]=j.elements[7],I.__data[10]=j.elements[8],I.__data[11]=0):(j.toArray(I.__data,X),X+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,S,x,R){const A=y.value,P=S+"_"+x;if(R[P]===void 0)return typeof A=="number"||typeof A=="boolean"?R[P]=A:R[P]=A.clone(),!0;{const N=R[P];if(typeof A=="number"||typeof A=="boolean"){if(N!==A)return R[P]=A,!0}else if(N.equals(A)===!1)return N.copy(A),!0}return!1}function m(y){const S=y.uniforms;let x=0;const R=16;for(let P=0,N=S.length;P<N;P++){const b=Array.isArray(S[P])?S[P]:[S[P]];for(let E=0,I=b.length;E<I;E++){const H=b[E],V=Array.isArray(H.value)?H.value:[H.value];for(let X=0,Q=V.length;X<Q;X++){const j=V[X],ee=_(j),G=x%R,de=G%ee.boundary,_e=G+de;x+=de,_e!==0&&R-_e<ee.storage&&(x+=R-_e),H.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=x,x+=ee.storage}}}const A=x%R;return A>0&&(x+=R-A),y.__size=x,y.__cache={},this}function _(y){const S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=48,S.storage=48):y.isMatrix4?(S.boundary=64,S.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),S}function g(y){const S=y.target;S.removeEventListener("dispose",g);const x=a.indexOf(S.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function p(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}class CS{constructor(e={}){const{canvas:t=e0(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const y=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ji,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let R=!1;this._outputColorSpace=Tt;let A=0,P=0,N=null,b=-1,E=null;const I=new ut,H=new ut;let V=null;const X=new ve(0);let Q=0,j=t.width,ee=t.height,G=1,de=null,_e=null;const Le=new ut(0,0,j,ee),je=new ut(0,0,j,ee);let At=!1;const _t=new ih;let Y=!1,fe=!1;const ce=new Xe,Ue=new T,Fe=new ut,Ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ut=!1;function rt(){return N===null?G:1}let D=n;function yt(w,F){return t.getContext(w,F)}try{const w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${zu}`),t.addEventListener("webglcontextlost",le,!1),t.addEventListener("webglcontextrestored",ye,!1),t.addEventListener("webglcontextcreationerror",ie,!1),D===null){const F="webgl2";if(D=yt(F,w),D===null)throw yt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let De,lt,Pe,Rt,Me,$e,$t,Ft,C,M,B,q,te,W,Ce,oe,Ee,Te,re,ge,ke,Ae,pe,qe;function U(){De=new ky(D),De.init(),Ae=new MS(D,De),lt=new Iy(D,De,e,Ae),Pe=new vS(D,De),lt.reversedDepthBuffer&&d&&Pe.buffers.depth.setReversed(!0),Rt=new Vy(D),Me=new aS,$e=new yS(D,De,Pe,Me,lt,Ae,Rt),$t=new Ny(x),Ft=new By(x),C=new K_(D),pe=new Py(D,C),M=new zy(D,C,Rt,pe),B=new Wy(D,M,C,Rt),re=new Gy(D,lt,$e),oe=new Dy(Me),q=new rS(x,$t,Ft,De,lt,pe,oe),te=new AS(x,Me),W=new cS,Ce=new pS(De),Te=new Cy(x,$t,Ft,Pe,B,f,c),Ee=new _S(x,B,lt),qe=new RS(D,Rt,lt,Pe),ge=new Ly(D,De,Rt),ke=new Hy(D,De,Rt),Rt.programs=q.programs,x.capabilities=lt,x.extensions=De,x.properties=Me,x.renderLists=W,x.shadowMap=Ee,x.state=Pe,x.info=Rt}U();const ae=new ES(x,D);this.xr=ae,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const w=De.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=De.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(w){w!==void 0&&(G=w,this.setSize(j,ee,!1))},this.getSize=function(w){return w.set(j,ee)},this.setSize=function(w,F,k=!0){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=w,ee=F,t.width=Math.floor(w*G),t.height=Math.floor(F*G),k===!0&&(t.style.width=w+"px",t.style.height=F+"px"),this.setViewport(0,0,w,F)},this.getDrawingBufferSize=function(w){return w.set(j*G,ee*G).floor()},this.setDrawingBufferSize=function(w,F,k){j=w,ee=F,G=k,t.width=Math.floor(w*k),t.height=Math.floor(F*k),this.setViewport(0,0,w,F)},this.getCurrentViewport=function(w){return w.copy(I)},this.getViewport=function(w){return w.copy(Le)},this.setViewport=function(w,F,k,z){w.isVector4?Le.set(w.x,w.y,w.z,w.w):Le.set(w,F,k,z),Pe.viewport(I.copy(Le).multiplyScalar(G).round())},this.getScissor=function(w){return w.copy(je)},this.setScissor=function(w,F,k,z){w.isVector4?je.set(w.x,w.y,w.z,w.w):je.set(w,F,k,z),Pe.scissor(H.copy(je).multiplyScalar(G).round())},this.getScissorTest=function(){return At},this.setScissorTest=function(w){Pe.setScissorTest(At=w)},this.setOpaqueSort=function(w){de=w},this.setTransparentSort=function(w){_e=w},this.getClearColor=function(w){return w.copy(Te.getClearColor())},this.setClearColor=function(){Te.setClearColor(...arguments)},this.getClearAlpha=function(){return Te.getClearAlpha()},this.setClearAlpha=function(){Te.setClearAlpha(...arguments)},this.clear=function(w=!0,F=!0,k=!0){let z=0;if(w){let O=!1;if(N!==null){const se=N.texture.format;O=se===ju||se===Ku||se===Yu}if(O){const se=N.texture.type,me=se===ri||se===Ts||se===oa||se===ca||se===Wu||se===Xu,Se=Te.getClearColor(),xe=Te.getClearAlpha(),Oe=Se.r,ze=Se.g,Ie=Se.b;me?(m[0]=Oe,m[1]=ze,m[2]=Ie,m[3]=xe,D.clearBufferuiv(D.COLOR,0,m)):(_[0]=Oe,_[1]=ze,_[2]=Ie,_[3]=xe,D.clearBufferiv(D.COLOR,0,_))}else z|=D.COLOR_BUFFER_BIT}F&&(z|=D.DEPTH_BUFFER_BIT),k&&(z|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",le,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),Te.dispose(),W.dispose(),Ce.dispose(),Me.dispose(),$t.dispose(),Ft.dispose(),B.dispose(),pe.dispose(),qe.dispose(),q.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",Zn),ae.removeEventListener("sessionend",Fh),rs.stop()};function le(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ye(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const w=Rt.autoReset,F=Ee.enabled,k=Ee.autoUpdate,z=Ee.needsUpdate,O=Ee.type;U(),Rt.autoReset=w,Ee.enabled=F,Ee.autoUpdate=k,Ee.needsUpdate=z,Ee.type=O}function ie(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function J(w){const F=w.target;F.removeEventListener("dispose",J),we(F)}function we(w){We(w),Me.remove(w)}function We(w){const F=Me.get(w).programs;F!==void 0&&(F.forEach(function(k){q.releaseProgram(k)}),w.isShaderMaterial&&q.releaseShaderCache(w))}this.renderBufferDirect=function(w,F,k,z,O,se){F===null&&(F=Ge);const me=O.isMesh&&O.matrixWorld.determinant()<0,Se=Wm(w,F,k,z,O);Pe.setMaterial(z,me);let xe=k.index,Oe=1;if(z.wireframe===!0){if(xe=M.getWireframeAttribute(k),xe===void 0)return;Oe=2}const ze=k.drawRange,Ie=k.attributes.position;let tt=ze.start*Oe,pt=(ze.start+ze.count)*Oe;se!==null&&(tt=Math.max(tt,se.start*Oe),pt=Math.min(pt,(se.start+se.count)*Oe)),xe!==null?(tt=Math.max(tt,0),pt=Math.min(pt,xe.count)):Ie!=null&&(tt=Math.max(tt,0),pt=Math.min(pt,Ie.count));const Dt=pt-tt;if(Dt<0||Dt===1/0)return;pe.setup(O,z,Se,k,xe);let bt,xt=ge;if(xe!==null&&(bt=C.get(xe),xt=ke,xt.setIndex(bt)),O.isMesh)z.wireframe===!0?(Pe.setLineWidth(z.wireframeLinewidth*rt()),xt.setMode(D.LINES)):xt.setMode(D.TRIANGLES);else if(O.isLine){let Ne=z.linewidth;Ne===void 0&&(Ne=1),Pe.setLineWidth(Ne*rt()),O.isLineSegments?xt.setMode(D.LINES):O.isLineLoop?xt.setMode(D.LINE_LOOP):xt.setMode(D.LINE_STRIP)}else O.isPoints?xt.setMode(D.POINTS):O.isSprite&&xt.setMode(D.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)ir("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),xt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(De.get("WEBGL_multi_draw"))xt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ne=O._multiDrawStarts,Ct=O._multiDrawCounts,ot=O._multiDrawCount,vn=xe?C.get(xe).bytesPerElement:1,Fs=Me.get(z).currentProgram.getUniforms();for(let yn=0;yn<ot;yn++)Fs.setValue(D,"_gl_DrawID",yn),xt.render(Ne[yn]/vn,Ct[yn])}else if(O.isInstancedMesh)xt.renderInstances(tt,Dt,O.count);else if(k.isInstancedBufferGeometry){const Ne=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,Ct=Math.min(k.instanceCount,Ne);xt.renderInstances(tt,Dt,Ct)}else xt.render(tt,Dt)};function Mt(w,F,k){w.transparent===!0&&w.side===Ht&&w.forceSinglePass===!1?(w.side=gn,w.needsUpdate=!0,Ua(w,F,k),w.side=si,w.needsUpdate=!0,Ua(w,F,k),w.side=Ht):Ua(w,F,k)}this.compile=function(w,F,k=null){k===null&&(k=w),p=Ce.get(k),p.init(F),S.push(p),k.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),w!==k&&w.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const z=new Set;return w.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const se=O.material;if(se)if(Array.isArray(se))for(let me=0;me<se.length;me++){const Se=se[me];Mt(Se,k,O),z.add(Se)}else Mt(se,k,O),z.add(se)}),p=S.pop(),z},this.compileAsync=function(w,F,k=null){const z=this.compile(w,F,k);return new Promise(O=>{function se(){if(z.forEach(function(me){Me.get(me).currentProgram.isReady()&&z.delete(me)}),z.size===0){O(w);return}setTimeout(se,10)}De.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let ht=null;function li(w){ht&&ht(w)}function Zn(){rs.stop()}function Fh(){rs.start()}const rs=new Lp;rs.setAnimationLoop(li),typeof self<"u"&&rs.setContext(self),this.setAnimationLoop=function(w){ht=w,ae.setAnimationLoop(w),w===null?rs.stop():rs.start()},ae.addEventListener("sessionstart",Zn),ae.addEventListener("sessionend",Fh),this.render=function(w,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(F),F=ae.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,F,N),p=Ce.get(w,S.length),p.init(F),S.push(p),ce.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),_t.setFromProjectionMatrix(ce,ni,F.reversedDepth),fe=this.localClippingEnabled,Y=oe.init(this.clippingPlanes,fe),g=W.get(w,y.length),g.init(),y.push(g),ae.enabled===!0&&ae.isPresenting===!0){const se=x.xr.getDepthSensingMesh();se!==null&&_c(se,F,-1/0,x.sortObjects)}_c(w,F,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(de,_e),Ut=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,Ut&&Te.addToRenderList(g,w),this.info.render.frame++,Y===!0&&oe.beginShadows();const k=p.state.shadowsArray;Ee.render(k,w,F),Y===!0&&oe.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=g.opaque,O=g.transmissive;if(p.setupLights(),F.isArrayCamera){const se=F.cameras;if(O.length>0)for(let me=0,Se=se.length;me<Se;me++){const xe=se[me];Bh(z,O,w,xe)}Ut&&Te.render(w);for(let me=0,Se=se.length;me<Se;me++){const xe=se[me];Oh(g,w,xe,xe.viewport)}}else O.length>0&&Bh(z,O,w,F),Ut&&Te.render(w),Oh(g,w,F);N!==null&&P===0&&($e.updateMultisampleRenderTarget(N),$e.updateRenderTargetMipmap(N)),w.isScene===!0&&w.onAfterRender(x,w,F),pe.resetDefaultState(),b=-1,E=null,S.pop(),S.length>0?(p=S[S.length-1],Y===!0&&oe.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function _c(w,F,k,z){if(w.visible===!1)return;if(w.layers.test(F.layers)){if(w.isGroup)k=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(F);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||_t.intersectsSprite(w)){z&&Fe.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ce);const me=B.update(w),Se=w.material;Se.visible&&g.push(w,me,Se,k,Fe.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||_t.intersectsObject(w))){const me=B.update(w),Se=w.material;if(z&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Fe.copy(w.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Fe.copy(me.boundingSphere.center)),Fe.applyMatrix4(w.matrixWorld).applyMatrix4(ce)),Array.isArray(Se)){const xe=me.groups;for(let Oe=0,ze=xe.length;Oe<ze;Oe++){const Ie=xe[Oe],tt=Se[Ie.materialIndex];tt&&tt.visible&&g.push(w,me,tt,k,Fe.z,Ie)}}else Se.visible&&g.push(w,me,Se,k,Fe.z,null)}}const se=w.children;for(let me=0,Se=se.length;me<Se;me++)_c(se[me],F,k,z)}function Oh(w,F,k,z){const O=w.opaque,se=w.transmissive,me=w.transparent;p.setupLightsView(k),Y===!0&&oe.setGlobalState(x.clippingPlanes,k),z&&Pe.viewport(I.copy(z)),O.length>0&&Na(O,F,k),se.length>0&&Na(se,F,k),me.length>0&&Na(me,F,k),Pe.buffers.depth.setTest(!0),Pe.buffers.depth.setMask(!0),Pe.buffers.color.setMask(!0),Pe.setPolygonOffset(!1)}function Bh(w,F,k,z){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new As(1,1,{generateMipmaps:!0,type:De.has("EXT_color_buffer_half_float")||De.has("EXT_color_buffer_float")?ba:ri,minFilter:wi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Je.workingColorSpace}));const se=p.state.transmissionRenderTarget[z.id],me=z.viewport||I;se.setSize(me.z*x.transmissionResolutionScale,me.w*x.transmissionResolutionScale);const Se=x.getRenderTarget(),xe=x.getActiveCubeFace(),Oe=x.getActiveMipmapLevel();x.setRenderTarget(se),x.getClearColor(X),Q=x.getClearAlpha(),Q<1&&x.setClearColor(16777215,.5),x.clear(),Ut&&Te.render(k);const ze=x.toneMapping;x.toneMapping=ji;const Ie=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),Y===!0&&oe.setGlobalState(x.clippingPlanes,z),Na(w,k,z),$e.updateMultisampleRenderTarget(se),$e.updateRenderTargetMipmap(se),De.has("WEBGL_multisampled_render_to_texture")===!1){let tt=!1;for(let pt=0,Dt=F.length;pt<Dt;pt++){const bt=F[pt],xt=bt.object,Ne=bt.geometry,Ct=bt.material,ot=bt.group;if(Ct.side===Ht&&xt.layers.test(z.layers)){const vn=Ct.side;Ct.side=gn,Ct.needsUpdate=!0,kh(xt,k,z,Ne,Ct,ot),Ct.side=vn,Ct.needsUpdate=!0,tt=!0}}tt===!0&&($e.updateMultisampleRenderTarget(se),$e.updateRenderTargetMipmap(se))}x.setRenderTarget(Se,xe,Oe),x.setClearColor(X,Q),Ie!==void 0&&(z.viewport=Ie),x.toneMapping=ze}function Na(w,F,k){const z=F.isScene===!0?F.overrideMaterial:null;for(let O=0,se=w.length;O<se;O++){const me=w[O],Se=me.object,xe=me.geometry,Oe=me.group;let ze=me.material;ze.allowOverride===!0&&z!==null&&(ze=z),Se.layers.test(k.layers)&&kh(Se,F,k,xe,ze,Oe)}}function kh(w,F,k,z,O,se){w.onBeforeRender(x,F,k,z,O,se),w.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),O.onBeforeRender(x,F,k,z,w,se),O.transparent===!0&&O.side===Ht&&O.forceSinglePass===!1?(O.side=gn,O.needsUpdate=!0,x.renderBufferDirect(k,F,z,O,w,se),O.side=si,O.needsUpdate=!0,x.renderBufferDirect(k,F,z,O,w,se),O.side=Ht):x.renderBufferDirect(k,F,z,O,w,se),w.onAfterRender(x,F,k,z,O,se)}function Ua(w,F,k){F.isScene!==!0&&(F=Ge);const z=Me.get(w),O=p.state.lights,se=p.state.shadowsArray,me=O.state.version,Se=q.getParameters(w,O.state,se,F,k),xe=q.getProgramCacheKey(Se);let Oe=z.programs;z.environment=w.isMeshStandardMaterial?F.environment:null,z.fog=F.fog,z.envMap=(w.isMeshStandardMaterial?Ft:$t).get(w.envMap||z.environment),z.envMapRotation=z.environment!==null&&w.envMap===null?F.environmentRotation:w.envMapRotation,Oe===void 0&&(w.addEventListener("dispose",J),Oe=new Map,z.programs=Oe);let ze=Oe.get(xe);if(ze!==void 0){if(z.currentProgram===ze&&z.lightsStateVersion===me)return Hh(w,Se),ze}else Se.uniforms=q.getUniforms(w),w.onBeforeCompile(Se,x),ze=q.acquireProgram(Se,xe),Oe.set(xe,ze),z.uniforms=Se.uniforms;const Ie=z.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ie.clippingPlanes=oe.uniform),Hh(w,Se),z.needsLights=qm(w),z.lightsStateVersion=me,z.needsLights&&(Ie.ambientLightColor.value=O.state.ambient,Ie.lightProbe.value=O.state.probe,Ie.directionalLights.value=O.state.directional,Ie.directionalLightShadows.value=O.state.directionalShadow,Ie.spotLights.value=O.state.spot,Ie.spotLightShadows.value=O.state.spotShadow,Ie.rectAreaLights.value=O.state.rectArea,Ie.ltc_1.value=O.state.rectAreaLTC1,Ie.ltc_2.value=O.state.rectAreaLTC2,Ie.pointLights.value=O.state.point,Ie.pointLightShadows.value=O.state.pointShadow,Ie.hemisphereLights.value=O.state.hemi,Ie.directionalShadowMap.value=O.state.directionalShadowMap,Ie.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ie.spotShadowMap.value=O.state.spotShadowMap,Ie.spotLightMatrix.value=O.state.spotLightMatrix,Ie.spotLightMap.value=O.state.spotLightMap,Ie.pointShadowMap.value=O.state.pointShadowMap,Ie.pointShadowMatrix.value=O.state.pointShadowMatrix),z.currentProgram=ze,z.uniformsList=null,ze}function zh(w){if(w.uniformsList===null){const F=w.currentProgram.getUniforms();w.uniformsList=Ao.seqWithValue(F.seq,w.uniforms)}return w.uniformsList}function Hh(w,F){const k=Me.get(w);k.outputColorSpace=F.outputColorSpace,k.batching=F.batching,k.batchingColor=F.batchingColor,k.instancing=F.instancing,k.instancingColor=F.instancingColor,k.instancingMorph=F.instancingMorph,k.skinning=F.skinning,k.morphTargets=F.morphTargets,k.morphNormals=F.morphNormals,k.morphColors=F.morphColors,k.morphTargetsCount=F.morphTargetsCount,k.numClippingPlanes=F.numClippingPlanes,k.numIntersection=F.numClipIntersection,k.vertexAlphas=F.vertexAlphas,k.vertexTangents=F.vertexTangents,k.toneMapping=F.toneMapping}function Wm(w,F,k,z,O){F.isScene!==!0&&(F=Ge),$e.resetTextureUnits();const se=F.fog,me=z.isMeshStandardMaterial?F.environment:null,Se=N===null?x.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:dn,xe=(z.isMeshStandardMaterial?Ft:$t).get(z.envMap||me),Oe=z.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,ze=!!k.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ie=!!k.morphAttributes.position,tt=!!k.morphAttributes.normal,pt=!!k.morphAttributes.color;let Dt=ji;z.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Dt=x.toneMapping);const bt=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,xt=bt!==void 0?bt.length:0,Ne=Me.get(z),Ct=p.state.lights;if(Y===!0&&(fe===!0||w!==E)){const an=w===E&&z.id===b;oe.setState(z,w,an)}let ot=!1;z.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==Ct.state.version||Ne.outputColorSpace!==Se||O.isBatchedMesh&&Ne.batching===!1||!O.isBatchedMesh&&Ne.batching===!0||O.isBatchedMesh&&Ne.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ne.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ne.instancing===!1||!O.isInstancedMesh&&Ne.instancing===!0||O.isSkinnedMesh&&Ne.skinning===!1||!O.isSkinnedMesh&&Ne.skinning===!0||O.isInstancedMesh&&Ne.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ne.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ne.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ne.instancingMorph===!1&&O.morphTexture!==null||Ne.envMap!==xe||z.fog===!0&&Ne.fog!==se||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==oe.numPlanes||Ne.numIntersection!==oe.numIntersection)||Ne.vertexAlphas!==Oe||Ne.vertexTangents!==ze||Ne.morphTargets!==Ie||Ne.morphNormals!==tt||Ne.morphColors!==pt||Ne.toneMapping!==Dt||Ne.morphTargetsCount!==xt)&&(ot=!0):(ot=!0,Ne.__version=z.version);let vn=Ne.currentProgram;ot===!0&&(vn=Ua(z,F,O));let Fs=!1,yn=!1,Fr=!1;const Pt=vn.getUniforms(),Pn=Ne.uniforms;if(Pe.useProgram(vn.program)&&(Fs=!0,yn=!0,Fr=!0),z.id!==b&&(b=z.id,yn=!0),Fs||E!==w){Pe.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),Pt.setValue(D,"projectionMatrix",w.projectionMatrix),Pt.setValue(D,"viewMatrix",w.matrixWorldInverse);const fn=Pt.map.cameraPosition;fn!==void 0&&fn.setValue(D,Ue.setFromMatrixPosition(w.matrixWorld)),lt.logarithmicDepthBuffer&&Pt.setValue(D,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&Pt.setValue(D,"isOrthographic",w.isOrthographicCamera===!0),E!==w&&(E=w,yn=!0,Fr=!0)}if(O.isSkinnedMesh){Pt.setOptional(D,O,"bindMatrix"),Pt.setOptional(D,O,"bindMatrixInverse");const an=O.skeleton;an&&(an.boneTexture===null&&an.computeBoneTexture(),Pt.setValue(D,"boneTexture",an.boneTexture,$e))}O.isBatchedMesh&&(Pt.setOptional(D,O,"batchingTexture"),Pt.setValue(D,"batchingTexture",O._matricesTexture,$e),Pt.setOptional(D,O,"batchingIdTexture"),Pt.setValue(D,"batchingIdTexture",O._indirectTexture,$e),Pt.setOptional(D,O,"batchingColorTexture"),O._colorsTexture!==null&&Pt.setValue(D,"batchingColorTexture",O._colorsTexture,$e));const Ln=k.morphAttributes;if((Ln.position!==void 0||Ln.normal!==void 0||Ln.color!==void 0)&&re.update(O,k,vn),(yn||Ne.receiveShadow!==O.receiveShadow)&&(Ne.receiveShadow=O.receiveShadow,Pt.setValue(D,"receiveShadow",O.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Pn.envMap.value=xe,Pn.flipEnvMap.value=xe.isCubeTexture&&xe.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&F.environment!==null&&(Pn.envMapIntensity.value=F.environmentIntensity),yn&&(Pt.setValue(D,"toneMappingExposure",x.toneMappingExposure),Ne.needsLights&&Xm(Pn,Fr),se&&z.fog===!0&&te.refreshFogUniforms(Pn,se),te.refreshMaterialUniforms(Pn,z,G,ee,p.state.transmissionRenderTarget[w.id]),Ao.upload(D,zh(Ne),Pn,$e)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Ao.upload(D,zh(Ne),Pn,$e),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&Pt.setValue(D,"center",O.center),Pt.setValue(D,"modelViewMatrix",O.modelViewMatrix),Pt.setValue(D,"normalMatrix",O.normalMatrix),Pt.setValue(D,"modelMatrix",O.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const an=z.uniformsGroups;for(let fn=0,xc=an.length;fn<xc;fn++){const as=an[fn];qe.update(as,vn),qe.bind(as,vn)}}return vn}function Xm(w,F){w.ambientLightColor.needsUpdate=F,w.lightProbe.needsUpdate=F,w.directionalLights.needsUpdate=F,w.directionalLightShadows.needsUpdate=F,w.pointLights.needsUpdate=F,w.pointLightShadows.needsUpdate=F,w.spotLights.needsUpdate=F,w.spotLightShadows.needsUpdate=F,w.rectAreaLights.needsUpdate=F,w.hemisphereLights.needsUpdate=F}function qm(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(w,F,k){const z=Me.get(w);z.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),Me.get(w.texture).__webglTexture=F,Me.get(w.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:k,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,F){const k=Me.get(w);k.__webglFramebuffer=F,k.__useDefaultFramebuffer=F===void 0};const Ym=D.createFramebuffer();this.setRenderTarget=function(w,F=0,k=0){N=w,A=F,P=k;let z=!0,O=null,se=!1,me=!1;if(w){const xe=Me.get(w);if(xe.__useDefaultFramebuffer!==void 0)Pe.bindFramebuffer(D.FRAMEBUFFER,null),z=!1;else if(xe.__webglFramebuffer===void 0)$e.setupRenderTarget(w);else if(xe.__hasExternalTextures)$e.rebindTextures(w,Me.get(w.texture).__webglTexture,Me.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Ie=w.depthTexture;if(xe.__boundDepthTexture!==Ie){if(Ie!==null&&Me.has(Ie)&&(w.width!==Ie.image.width||w.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");$e.setupDepthRenderbuffer(w)}}const Oe=w.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(me=!0);const ze=Me.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(ze[F])?O=ze[F][k]:O=ze[F],se=!0):w.samples>0&&$e.useMultisampledRTT(w)===!1?O=Me.get(w).__webglMultisampledFramebuffer:Array.isArray(ze)?O=ze[k]:O=ze,I.copy(w.viewport),H.copy(w.scissor),V=w.scissorTest}else I.copy(Le).multiplyScalar(G).floor(),H.copy(je).multiplyScalar(G).floor(),V=At;if(k!==0&&(O=Ym),Pe.bindFramebuffer(D.FRAMEBUFFER,O)&&z&&Pe.drawBuffers(w,O),Pe.viewport(I),Pe.scissor(H),Pe.setScissorTest(V),se){const xe=Me.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+F,xe.__webglTexture,k)}else if(me){const xe=F;for(let Oe=0;Oe<w.textures.length;Oe++){const ze=Me.get(w.textures[Oe]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Oe,ze.__webglTexture,k,xe)}}else if(w!==null&&k!==0){const xe=Me.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,xe.__webglTexture,k)}b=-1},this.readRenderTargetPixels=function(w,F,k,z,O,se,me,Se=0){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=Me.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&me!==void 0&&(xe=xe[me]),xe){Pe.bindFramebuffer(D.FRAMEBUFFER,xe);try{const Oe=w.textures[Se],ze=Oe.format,Ie=Oe.type;if(!lt.textureFormatReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!lt.textureTypeReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=w.width-z&&k>=0&&k<=w.height-O&&(w.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Se),D.readPixels(F,k,z,O,Ae.convert(ze),Ae.convert(Ie),se))}finally{const Oe=N!==null?Me.get(N).__webglFramebuffer:null;Pe.bindFramebuffer(D.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(w,F,k,z,O,se,me,Se=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=Me.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&me!==void 0&&(xe=xe[me]),xe)if(F>=0&&F<=w.width-z&&k>=0&&k<=w.height-O){Pe.bindFramebuffer(D.FRAMEBUFFER,xe);const Oe=w.textures[Se],ze=Oe.format,Ie=Oe.type;if(!lt.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!lt.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const tt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,tt),D.bufferData(D.PIXEL_PACK_BUFFER,se.byteLength,D.STREAM_READ),w.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Se),D.readPixels(F,k,z,O,Ae.convert(ze),Ae.convert(Ie),0);const pt=N!==null?Me.get(N).__webglFramebuffer:null;Pe.bindFramebuffer(D.FRAMEBUFFER,pt);const Dt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await t0(D,Dt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,tt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,se),D.deleteBuffer(tt),D.deleteSync(Dt),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,F=null,k=0){const z=Math.pow(2,-k),O=Math.floor(w.image.width*z),se=Math.floor(w.image.height*z),me=F!==null?F.x:0,Se=F!==null?F.y:0;$e.setTexture2D(w,0),D.copyTexSubImage2D(D.TEXTURE_2D,k,0,0,me,Se,O,se),Pe.unbindTexture()};const Km=D.createFramebuffer(),jm=D.createFramebuffer();this.copyTextureToTexture=function(w,F,k=null,z=null,O=0,se=null){se===null&&(O!==0?(ir("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),se=O,O=0):se=0);let me,Se,xe,Oe,ze,Ie,tt,pt,Dt;const bt=w.isCompressedTexture?w.mipmaps[se]:w.image;if(k!==null)me=k.max.x-k.min.x,Se=k.max.y-k.min.y,xe=k.isBox3?k.max.z-k.min.z:1,Oe=k.min.x,ze=k.min.y,Ie=k.isBox3?k.min.z:0;else{const Ln=Math.pow(2,-O);me=Math.floor(bt.width*Ln),Se=Math.floor(bt.height*Ln),w.isDataArrayTexture?xe=bt.depth:w.isData3DTexture?xe=Math.floor(bt.depth*Ln):xe=1,Oe=0,ze=0,Ie=0}z!==null?(tt=z.x,pt=z.y,Dt=z.z):(tt=0,pt=0,Dt=0);const xt=Ae.convert(F.format),Ne=Ae.convert(F.type);let Ct;F.isData3DTexture?($e.setTexture3D(F,0),Ct=D.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?($e.setTexture2DArray(F,0),Ct=D.TEXTURE_2D_ARRAY):($e.setTexture2D(F,0),Ct=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,F.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,F.unpackAlignment);const ot=D.getParameter(D.UNPACK_ROW_LENGTH),vn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Fs=D.getParameter(D.UNPACK_SKIP_PIXELS),yn=D.getParameter(D.UNPACK_SKIP_ROWS),Fr=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,bt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,bt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Oe),D.pixelStorei(D.UNPACK_SKIP_ROWS,ze),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ie);const Pt=w.isDataArrayTexture||w.isData3DTexture,Pn=F.isDataArrayTexture||F.isData3DTexture;if(w.isDepthTexture){const Ln=Me.get(w),an=Me.get(F),fn=Me.get(Ln.__renderTarget),xc=Me.get(an.__renderTarget);Pe.bindFramebuffer(D.READ_FRAMEBUFFER,fn.__webglFramebuffer),Pe.bindFramebuffer(D.DRAW_FRAMEBUFFER,xc.__webglFramebuffer);for(let as=0;as<xe;as++)Pt&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Me.get(w).__webglTexture,O,Ie+as),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Me.get(F).__webglTexture,se,Dt+as)),D.blitFramebuffer(Oe,ze,me,Se,tt,pt,me,Se,D.DEPTH_BUFFER_BIT,D.NEAREST);Pe.bindFramebuffer(D.READ_FRAMEBUFFER,null),Pe.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(O!==0||w.isRenderTargetTexture||Me.has(w)){const Ln=Me.get(w),an=Me.get(F);Pe.bindFramebuffer(D.READ_FRAMEBUFFER,Km),Pe.bindFramebuffer(D.DRAW_FRAMEBUFFER,jm);for(let fn=0;fn<xe;fn++)Pt?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ln.__webglTexture,O,Ie+fn):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ln.__webglTexture,O),Pn?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,an.__webglTexture,se,Dt+fn):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,an.__webglTexture,se),O!==0?D.blitFramebuffer(Oe,ze,me,Se,tt,pt,me,Se,D.COLOR_BUFFER_BIT,D.NEAREST):Pn?D.copyTexSubImage3D(Ct,se,tt,pt,Dt+fn,Oe,ze,me,Se):D.copyTexSubImage2D(Ct,se,tt,pt,Oe,ze,me,Se);Pe.bindFramebuffer(D.READ_FRAMEBUFFER,null),Pe.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Pn?w.isDataTexture||w.isData3DTexture?D.texSubImage3D(Ct,se,tt,pt,Dt,me,Se,xe,xt,Ne,bt.data):F.isCompressedArrayTexture?D.compressedTexSubImage3D(Ct,se,tt,pt,Dt,me,Se,xe,xt,bt.data):D.texSubImage3D(Ct,se,tt,pt,Dt,me,Se,xe,xt,Ne,bt):w.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,se,tt,pt,me,Se,xt,Ne,bt.data):w.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,se,tt,pt,bt.width,bt.height,xt,bt.data):D.texSubImage2D(D.TEXTURE_2D,se,tt,pt,me,Se,xt,Ne,bt);D.pixelStorei(D.UNPACK_ROW_LENGTH,ot),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,vn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Fs),D.pixelStorei(D.UNPACK_SKIP_ROWS,yn),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Fr),se===0&&F.generateMipmaps&&D.generateMipmap(Ct),Pe.unbindTexture()},this.copyTextureToTexture3D=function(w,F,k=null,z=null,O=0){return ir('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,F,k,z,O)},this.initRenderTarget=function(w){Me.get(w).__webglFramebuffer===void 0&&$e.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?$e.setTextureCube(w,0):w.isData3DTexture?$e.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?$e.setTexture2DArray(w,0):$e.setTexture2D(w,0),Pe.unbindTexture()},this.resetState=function(){A=0,P=0,N=null,Pe.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Je._getDrawingBufferColorSpace(e),t.unpackColorSpace=Je._getUnpackColorSpace()}}function pf(i,e){if(e===Ag)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===pu||e===sp){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===pu)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class PS extends is{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new US(t)}),this.register(function(t){return new FS(t)}),this.register(function(t){return new XS(t)}),this.register(function(t){return new qS(t)}),this.register(function(t){return new YS(t)}),this.register(function(t){return new BS(t)}),this.register(function(t){return new kS(t)}),this.register(function(t){return new zS(t)}),this.register(function(t){return new HS(t)}),this.register(function(t){return new NS(t)}),this.register(function(t){return new VS(t)}),this.register(function(t){return new OS(t)}),this.register(function(t){return new WS(t)}),this.register(function(t){return new GS(t)}),this.register(function(t){return new IS(t)}),this.register(function(t){return new KS(t)}),this.register(function(t){return new jS(t)})}load(e,t,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=ar.extractUrlBase(e);a=ar.resolveURL(l,this.path)}else a=ar.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new rc(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Op){try{a[Qe.KHR_BINARY_GLTF]=new $S(e)}catch(h){s&&s(h);return}r=JSON.parse(a[Qe.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new lw(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case Qe.KHR_MATERIALS_UNLIT:a[h]=new DS;break;case Qe.KHR_DRACO_MESH_COMPRESSION:a[h]=new ZS(r,this.dracoLoader);break;case Qe.KHR_TEXTURE_TRANSFORM:a[h]=new JS;break;case Qe.KHR_MESH_QUANTIZATION:a[h]=new QS;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function LS(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const Qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class IS{constructor(e){this.parser=e,this.name=Qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const u=new ve(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],dn);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Cp(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new hh(u),l.distance=h;break;case"spot":l=new L_(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Si(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class DS{constructor(){this.name=Qe.KHR_MATERIALS_UNLIT}getMaterialType(){return et}extendParams(e,t,n){const s=[];e.color=new ve(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],dn),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Tt))}return Promise.all(s)}}class NS{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class US{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ue(o,o)}return Promise.all(r)}}class FS{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class OS{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class BS{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new ve(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],dn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Tt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class kS{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class zS{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new ve().setRGB(o[0],o[1],o[2],dn),Promise.all(r)}}class HS{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class VS{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new ve().setRGB(o[0],o[1],o[2],dn),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Tt)),Promise.all(r)}}class GS{constructor(e){this.parser=e,this.name=Qe.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class WS{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ci}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class XS{constructor(e){this.parser=e,this.name=Qe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class qS{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class YS{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class KS{constructor(e){this.name=Qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=s.byteOffset||0,l=s.byteLength||0,u=s.count,h=s.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(f),u,h,d,s.mode,s.filter),f})})}else return null}}class jS{constructor(e){this.name=Qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==Nn.TRIANGLES&&l.mode!==Nn.TRIANGLE_STRIP&&l.mode!==Nn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],d=l[0].count,f=[];for(const m of h){const _=new Xe,g=new T,p=new Hn,y=new T(1,1,1),S=new I0(m.geometry,m.material,d);for(let x=0;x<d;x++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,x),c.SCALE&&y.fromBufferAttribute(c.SCALE,x),S.setMatrixAt(x,_.compose(g,p,y));for(const x in c)if(x==="_COLOR_0"){const R=c[x];S.instanceColor=new gu(R.array,R.itemSize,R.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&m.geometry.setAttribute(x,c[x]);vt.prototype.copy.call(S,m),this.parser.assignFinalMaterial(S),f.push(S)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const Op="glTF",Xr=12,mf={JSON:1313821514,BIN:5130562};class $S{constructor(e){this.name=Qe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Xr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Op)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Xr,r=new DataView(e,Xr);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===mf.JSON){const l=new Uint8Array(e,Xr+a,o);this.content=n.decode(l)}else if(c===mf.BIN){const l=Xr+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class ZS{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const u in a){const h=Su[u]||u.toLowerCase();o[h]=a[u]}for(const u in e.attributes){const h=Su[u]||u.toLowerCase();if(a[u]!==void 0){const d=n.accessors[e.attributes[u]],f=or[d.componentType];l[h]=f.name,c[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){s.decodeDracoFile(u,function(f){for(const m in f.attributes){const _=f.attributes[m],g=c[m];g!==void 0&&(_.normalized=g)}h(f)},o,l,dn,d)})})}}class JS{constructor(){this.name=Qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class QS{constructor(){this.name=Qe.KHR_MESH_QUANTIZATION}}class Bp extends Aa{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=s-t,h=(n-t)/u,d=h*h,f=d*h,m=e*l,_=m-l,g=-2*f+3*d,p=f-d,y=1-g,S=p-d+h;for(let x=0;x!==o;x++){const R=a[_+x+o],A=a[_+x+c]*u,P=a[m+x+o],N=a[m+x]*u;r[x]=y*R+S*A+g*P+p*N}return r}}const ew=new Hn;class tw extends Bp{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return ew.fromArray(r).normalize().toArray(r),r}}const Nn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},or={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},gf={9728:hn,9729:En,9984:$f,9985:Mo,9986:Kr,9987:wi},_f={33071:Gi,33648:Oo,10497:es},sl={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Su={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ki={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},nw={CUBICSPLINE:void 0,LINEAR:da,STEP:ha},rl={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function iw(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Yt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:si})),i.DefaultMaterial}function fs(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Si(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function sw(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,u=e.length;l<u;l++){const h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];if(n){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;a.push(d)}if(s){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;o.push(d)}if(r){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],d=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function rw(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function aw(i){let e;const t=i.extensions&&i.extensions[Qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+al(t.attributes):e=i.indices+":"+al(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+al(i.targets[n]);return e}function al(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function wu(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function ow(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const cw=new Xe;class lw{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new LS,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new lh(this.options.manager):this.textureLoader=new N_(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new rc(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return fs(r,o,s),Si(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,u]of a.children.entries())r(u,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Qe.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(ar.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=sl[s.type],o=or[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new Xt(l,a,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=sl[s.type],l=or[s.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0;let _,g;if(f&&f!==h){const p=Math.floor(d/f),y="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let S=t.cache.get(y);S||(_=new l(o,p*f,s.count*f/u),S=new A0(_,f/u),t.cache.add(y,S)),g=new th(S,c,d%f/u,m)}else o===null?_=new l(s.count*c):_=new l(o,d,s.count*c),g=new Xt(_,c,m);if(s.sparse!==void 0){const p=sl.SCALAR,y=or[s.sparse.indices.componentType],S=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,R=new y(a[1],S,s.sparse.count*p),A=new l(a[2],x,s.sparse.count*c);o!==null&&(g=new Xt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let P=0,N=R.length;P<N;P++){const b=R[P];if(g.setX(b,A[P*c]),c>=2&&g.setY(b,A[P*c+1]),c>=3&&g.setZ(b,A[P*c+2]),c>=4&&g.setW(b,A[P*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return u.magFilter=gf[d.magFilter]||En,u.minFilter=gf[d.minFilter]||wi,u.wrapS=_f[d.wrapS]||es,u.wrapT=_f[d.wrapT]||es,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==hn&&u.minFilter!==En,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=s.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(h){l=!0;const d=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(d,f){let m=d;t.isImageBitmapLoader===!0&&(m=function(_){const g=new Qt(_);g.needsUpdate=!0,d(g)}),t.load(ar.resolveURL(h,r.path),m,void 0,f)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),Si(h,a),h.userData.mimeType=a.mimeType||ow(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Qe.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Qe.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[Qe.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Ms,An.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new $i,An.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Yt}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},l=[];if(c[Qe.KHR_MATERIALS_UNLIT]){const h=s[Qe.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,r,t))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new ve(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],dn),o.opacity=d[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,Tt)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Ht);const u=r.alphaMode||rl.OPAQUE;if(u===rl.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===rl.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==et&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ue(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==et&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==et){const h=r.emissiveFactor;o.emissive=new ve().setRGB(h[0],h[1],h[2],dn)}return r.emissiveTexture!==void 0&&a!==et&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Tt)),Promise.all(l).then(function(){const h=new a(o);return r.name&&(h.name=r.name),Si(h,r),t.associations.set(h,{materials:e}),r.extensions&&fs(s,h,r),h})}createUniqueName(e){const t=ft.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[Qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return xf(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],u=aw(l),h=s[u];if(h)a.push(h.promise);else{let d;l.extensions&&l.extensions[Qe.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=xf(new wt,l,t),s[u]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const u=a[c].material===void 0?iw(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let f=0,m=u.length;f<m;f++){const _=u[f],g=a[f];let p;const y=l[f];if(g.mode===Nn.TRIANGLES||g.mode===Nn.TRIANGLE_STRIP||g.mode===Nn.TRIANGLE_FAN||g.mode===void 0)p=r.isSkinnedMesh===!0?new C0(_,y):new $(_,y),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===Nn.TRIANGLE_STRIP?p.geometry=pf(p.geometry,sp):g.mode===Nn.TRIANGLE_FAN&&(p.geometry=pf(p.geometry,pu));else if(g.mode===Nn.LINES)p=new pa(_,y);else if(g.mode===Nn.LINE_STRIP)p=new nc(_,y);else if(g.mode===Nn.LINE_LOOP)p=new F0(_,y);else if(g.mode===Nn.POINTS)p=new ta(_,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&rw(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Si(p,r),g.extensions&&fs(s,p,g),t.assignFinalMaterial(p),h.push(p)}for(let f=0,m=h.length;f<m;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return r.extensions&&fs(s,h[0],r),h[0];const d=new ct;r.extensions&&fs(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,m=h.length;f<m;f++)d.add(h[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new un(Re.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new dh(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Si(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],c=[];for(let l=0,u=a.length;l<u;l++){const h=a[l];if(h){o.push(h);const d=new Xe;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new nh(o,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let h=0,d=s.channels.length;h<d;h++){const f=s.channels[h],m=s.samplers[f.sampler],_=f.target,g=_.node,p=s.parameters!==void 0?s.parameters[m.input]:m.input,y=s.parameters!==void 0?s.parameters[m.output]:m.output;_.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",y)),l.push(m),u.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const d=h[0],f=h[1],m=h[2],_=h[3],g=h[4],p=[];for(let y=0,S=d.length;y<S;y++){const x=d[y],R=f[y],A=m[y],P=_[y],N=g[y];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const b=n._createAnimationTracks(x,R,A,P,N);if(b)for(let E=0;E<b.length;E++)p.push(b[E])}return new w_(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const u=l[0],h=l[1],d=l[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,cw)});for(let f=0,m=h.length;f<m;f++)u.add(h[f]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new pp:l.length>1?u=new ct:l.length===1?u=l[0]:u=new vt,u!==l[0])for(let h=0,d=l.length;h<d;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=a),Si(u,r),r.extensions&&fs(n,u,r),r.matrix!==void 0){const h=new Xe;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const h=s.associations.get(u);s.associations.set(u,{...h})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new ct;n.name&&(r.name=s.createUniqueName(n.name)),Si(r,n),n.extensions&&fs(t,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);const l=u=>{const h=new Map;for(const[d,f]of s.associations)(d instanceof An||d instanceof Qt)&&h.set(d,f);return u.traverse(d=>{const f=s.associations.get(d);f!=null&&h.set(d,f)}),h};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const a=[],o=e.name?e.name:e.uuid,c=[];ki[r.path]===ki.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(ki[r.path]){case ki.weights:l=Sr;break;case ki.rotation:l=wr;break;case ki.translation:case ki.scale:l=br;break;default:n.itemSize===1?l=Sr:l=br;break}const u=s.interpolation!==void 0?nw[s.interpolation]:da,h=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const m=new l(c[d]+"."+ki[r.path],t.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=wu(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof wr?tw:Bp;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function uw(i,e,t){const n=e.attributes,s=new Cn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new T(c[0],c[1],c[2]),new T(l[0],l[1],l[2])),o.normalized){const u=wu(or[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new T,c=new T;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){const _=wu(or[d.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new ai;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function xf(i,e,t){const n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(const a in n){const o=Su[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return Je.workingColorSpace!==dn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Je.workingColorSpace}" not supported.`),Si(i,e),uw(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?sw(i,e.targets,t):i})}class hw extends is{constructor(e){super(e)}load(e,t,n,s){const r=this,a=this.path===""?ar.extractUrlBase(e):this.path,o=new rc(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(c){try{t(r.parse(c,a))}catch(l){s?s(l):console.error(l),r.manager.itemError(e)}},n,s)}setMaterialOptions(e){return this.materialOptions=e,this}parse(e,t){const n=e.split(`
`);let s={};const r=/\s+/,a={};for(let c=0;c<n.length;c++){let l=n[c];if(l=l.trim(),l.length===0||l.charAt(0)==="#")continue;const u=l.indexOf(" ");let h=u>=0?l.substring(0,u):l;h=h.toLowerCase();let d=u>=0?l.substring(u+1):"";if(d=d.trim(),h==="newmtl")s={name:d},a[d]=s;else if(h==="ka"||h==="kd"||h==="ks"||h==="ke"){const f=d.split(r,3);s[h]=[parseFloat(f[0]),parseFloat(f[1]),parseFloat(f[2])]}else s[h]=d}const o=new dw(this.resourcePath||t,this.materialOptions);return o.setCrossOrigin(this.crossOrigin),o.setManager(this.manager),o.setMaterials(a),o}}class dw{constructor(e="",t={}){this.baseUrl=e,this.options=t,this.materialsInfo={},this.materials={},this.materialsArray=[],this.nameLookup={},this.crossOrigin="anonymous",this.side=this.options.side!==void 0?this.options.side:si,this.wrap=this.options.wrap!==void 0?this.options.wrap:es}setCrossOrigin(e){return this.crossOrigin=e,this}setManager(e){this.manager=e}setMaterials(e){this.materialsInfo=this.convert(e),this.materials={},this.materialsArray=[],this.nameLookup={}}convert(e){if(!this.options)return e;const t={};for(const n in e){const s=e[n],r={};t[n]=r;for(const a in s){let o=!0,c=s[a];const l=a.toLowerCase();switch(l){case"kd":case"ka":case"ks":this.options&&this.options.normalizeRGB&&(c=[c[0]/255,c[1]/255,c[2]/255]),this.options&&this.options.ignoreZeroRGBs&&c[0]===0&&c[1]===0&&c[2]===0&&(o=!1);break}o&&(r[l]=c)}}return t}preload(){for(const e in this.materialsInfo)this.create(e)}getIndex(e){return this.nameLookup[e]}getAsArray(){let e=0;for(const t in this.materialsInfo)this.materialsArray[e]=this.create(t),this.nameLookup[t]=e,e++;return this.materialsArray}create(e){return this.materials[e]===void 0&&this.createMaterial_(e),this.materials[e]}createMaterial_(e){const t=this,n=this.materialsInfo[e],s={name:e,side:this.side};function r(o,c){return typeof c!="string"||c===""?"":/^https?:\/\//i.test(c)?c:o+c}function a(o,c){if(s[o])return;const l=t.getTextureParams(c,s),u=t.loadTexture(r(t.baseUrl,l.url));u.repeat.copy(l.scale),u.offset.copy(l.offset),u.wrapS=t.wrap,u.wrapT=t.wrap,(o==="map"||o==="emissiveMap")&&(u.colorSpace=Tt),s[o]=u}for(const o in n){const c=n[o];let l;if(c!=="")switch(o.toLowerCase()){case"kd":s.color=Je.colorSpaceToWorking(new ve().fromArray(c),Tt);break;case"ks":s.specular=Je.colorSpaceToWorking(new ve().fromArray(c),Tt);break;case"ke":s.emissive=Je.colorSpaceToWorking(new ve().fromArray(c),Tt);break;case"map_kd":a("map",c);break;case"map_ks":a("specularMap",c);break;case"map_ke":a("emissiveMap",c);break;case"norm":a("normalMap",c);break;case"map_bump":case"bump":a("bumpMap",c);break;case"disp":a("displacementMap",c);break;case"map_d":a("alphaMap",c),s.transparent=!0;break;case"ns":s.shininess=parseFloat(c);break;case"d":l=parseFloat(c),l<1&&(s.opacity=l,s.transparent=!0);break;case"tr":l=parseFloat(c),this.options&&this.options.invertTrProperty&&(l=1-l),l>0&&(s.opacity=1-l,s.transparent=!0);break}}return this.materials[e]=new ch(s),this.materials[e]}getTextureParams(e,t){const n={scale:new ue(1,1),offset:new ue(0,0)},s=e.split(/\s+/);let r;return r=s.indexOf("-bm"),r>=0&&(t.bumpScale=parseFloat(s[r+1]),s.splice(r,2)),r=s.indexOf("-mm"),r>=0&&(t.displacementBias=parseFloat(s[r+1]),t.displacementScale=parseFloat(s[r+2]),s.splice(r,3)),r=s.indexOf("-s"),r>=0&&(n.scale.set(parseFloat(s[r+1]),parseFloat(s[r+2])),s.splice(r,4)),r=s.indexOf("-o"),r>=0&&(n.offset.set(parseFloat(s[r+1]),parseFloat(s[r+2])),s.splice(r,4)),n.url=s.join(" ").trim(),n}loadTexture(e,t,n,s,r){const a=this.manager!==void 0?this.manager:Rp;let o=a.getHandler(e);o===null&&(o=new lh(a)),o.setCrossOrigin&&o.setCrossOrigin(this.crossOrigin);const c=o.load(e,n,s,r);return t!==void 0&&(c.mapping=t),c}}const fw=/^[og]\s*(.+)?/,pw=/^mtllib /,mw=/^usemtl /,gw=/^usemap /,vf=/\s+/,yf=new T,ol=new T,Mf=new T,Sf=new T,Dn=new T,mo=new ve;function _w(){const i={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=t!==!1;return}const n=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:t!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(s,r){const a=this._finalize(!1);a&&(a.inherited||a.groupCount<=0)&&this.materials.splice(a.index,1);const o={index:this.materials.length,name:s||"",mtllib:Array.isArray(r)&&r.length>0?r[r.length-1]:"",smooth:a!==void 0?a.smooth:this.smooth,groupStart:a!==void 0?a.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(c){const l={index:typeof c=="number"?c:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return l.clone=this.clone.bind(l),l}};return this.materials.push(o),o},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(s){const r=this.currentMaterial();if(r&&r.groupEnd===-1&&(r.groupEnd=this.geometry.vertices.length/3,r.groupCount=r.groupEnd-r.groupStart,r.inherited=!1),s&&this.materials.length>1)for(let a=this.materials.length-1;a>=0;a--)this.materials[a].groupCount<=0&&this.materials.splice(a,1);return s&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),r}},n&&n.name&&typeof n.clone=="function"){const s=n.clone(0);s.inherited=!0,this.object.materials.push(s)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseNormalIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseUVIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/2)*2},addVertex:function(e,t,n){const s=this.vertices,r=this.object.geometry.vertices;r.push(s[e+0],s[e+1],s[e+2]),r.push(s[t+0],s[t+1],s[t+2]),r.push(s[n+0],s[n+1],s[n+2])},addVertexPoint:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,n){const s=this.normals,r=this.object.geometry.normals;r.push(s[e+0],s[e+1],s[e+2]),r.push(s[t+0],s[t+1],s[t+2]),r.push(s[n+0],s[n+1],s[n+2])},addFaceNormal:function(e,t,n){const s=this.vertices,r=this.object.geometry.normals;yf.fromArray(s,e),ol.fromArray(s,t),Mf.fromArray(s,n),Dn.subVectors(Mf,ol),Sf.subVectors(yf,ol),Dn.cross(Sf),Dn.normalize(),r.push(Dn.x,Dn.y,Dn.z),r.push(Dn.x,Dn.y,Dn.z),r.push(Dn.x,Dn.y,Dn.z)},addColor:function(e,t,n){const s=this.colors,r=this.object.geometry.colors;s[e]!==void 0&&r.push(s[e+0],s[e+1],s[e+2]),s[t]!==void 0&&r.push(s[t+0],s[t+1],s[t+2]),s[n]!==void 0&&r.push(s[n+0],s[n+1],s[n+2])},addUV:function(e,t,n){const s=this.uvs,r=this.object.geometry.uvs;r.push(s[e+0],s[e+1]),r.push(s[t+0],s[t+1]),r.push(s[n+0],s[n+1])},addDefaultUV:function(){const e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){const t=this.uvs;this.object.geometry.uvs.push(t[e+0],t[e+1])},addFace:function(e,t,n,s,r,a,o,c,l){const u=this.vertices.length;let h=this.parseVertexIndex(e,u),d=this.parseVertexIndex(t,u),f=this.parseVertexIndex(n,u);if(this.addVertex(h,d,f),this.addColor(h,d,f),o!==void 0&&o!==""){const m=this.normals.length;h=this.parseNormalIndex(o,m),d=this.parseNormalIndex(c,m),f=this.parseNormalIndex(l,m),this.addNormal(h,d,f)}else this.addFaceNormal(h,d,f);if(s!==void 0&&s!==""){const m=this.uvs.length;h=this.parseUVIndex(s,m),d=this.parseUVIndex(r,m),f=this.parseUVIndex(a,m),this.addUV(h,d,f),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";const t=this.vertices.length;for(let n=0,s=e.length;n<s;n++){const r=this.parseVertexIndex(e[n],t);this.addVertexPoint(r),this.addColor(r)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";const n=this.vertices.length,s=this.uvs.length;for(let r=0,a=e.length;r<a;r++)this.addVertexLine(this.parseVertexIndex(e[r],n));for(let r=0,a=t.length;r<a;r++)this.addUVLine(this.parseUVIndex(t[r],s))}};return i.startObject("",!1),i}class xw extends is{constructor(e){super(e),this.materials=null}load(e,t,n,s){const r=this,a=new rc(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(r.parse(o))}catch(c){s?s(c):console.error(c),r.manager.itemError(e)}},n,s)}setMaterials(e){return this.materials=e,this}parse(e){const t=new _w;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));const n=e.split(`
`);let s=[];for(let o=0,c=n.length;o<c;o++){const l=n[o].trimStart();if(l.length===0)continue;const u=l.charAt(0);if(u!=="#")if(u==="v"){const h=l.split(vf);switch(h[0]){case"v":t.vertices.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3])),h.length>=7?(mo.setRGB(parseFloat(h[4]),parseFloat(h[5]),parseFloat(h[6]),Tt),t.colors.push(mo.r,mo.g,mo.b)):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3]));break;case"vt":t.uvs.push(parseFloat(h[1]),parseFloat(h[2]));break}}else if(u==="f"){const d=l.slice(1).trim().split(vf),f=[];for(let _=0,g=d.length;_<g;_++){const p=d[_];if(p.length>0){const y=p.split("/");f.push(y)}}const m=f[0];for(let _=1,g=f.length-1;_<g;_++){const p=f[_],y=f[_+1];t.addFace(m[0],p[0],y[0],m[1],p[1],y[1],m[2],p[2],y[2])}}else if(u==="l"){const h=l.substring(1).trim().split(" ");let d=[];const f=[];if(l.indexOf("/")===-1)d=h;else for(let m=0,_=h.length;m<_;m++){const g=h[m].split("/");g[0]!==""&&d.push(g[0]),g[1]!==""&&f.push(g[1])}t.addLineGeometry(d,f)}else if(u==="p"){const d=l.slice(1).trim().split(" ");t.addPointGeometry(d)}else if((s=fw.exec(l))!==null){const h=(" "+s[0].slice(1).trim()).slice(1);t.startObject(h)}else if(mw.test(l))t.object.startMaterial(l.substring(7).trim(),t.materialLibraries);else if(pw.test(l))t.materialLibraries.push(l.substring(7).trim());else if(gw.test(l))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(u==="s"){if(s=l.split(" "),s.length>1){const d=s[1].trim().toLowerCase();t.object.smooth=d!=="0"&&d!=="off"}else t.object.smooth=!0;const h=t.object.currentMaterial();h&&(h.smooth=t.object.smooth)}else{if(l==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+l+'"')}}t.finalize();const r=new ct;if(r.materialLibraries=[].concat(t.materialLibraries),!(t.objects.length===1&&t.objects[0].geometry.vertices.length===0)===!0)for(let o=0,c=t.objects.length;o<c;o++){const l=t.objects[o],u=l.geometry,h=l.materials,d=u.type==="Line",f=u.type==="Points";let m=!1;if(u.vertices.length===0)continue;const _=new wt;_.setAttribute("position",new Ve(u.vertices,3)),u.normals.length>0&&_.setAttribute("normal",new Ve(u.normals,3)),u.colors.length>0&&(m=!0,_.setAttribute("color",new Ve(u.colors,3))),u.hasUVIndices===!0&&_.setAttribute("uv",new Ve(u.uvs,2));const g=[];for(let y=0,S=h.length;y<S;y++){const x=h[y],R=x.name+"_"+x.smooth+"_"+m;let A=t.materials[R];if(this.materials!==null){if(A=this.materials.create(x.name),d&&A&&!(A instanceof $i)){const P=new $i;An.prototype.copy.call(P,A),P.color.copy(A.color),A=P}else if(f&&A&&!(A instanceof Ms)){const P=new Ms({size:10,sizeAttenuation:!1});An.prototype.copy.call(P,A),P.color.copy(A.color),P.map=A.map,A=P}}A===void 0&&(d?A=new $i:f?A=new Ms({size:1,sizeAttenuation:!1}):A=new ch,A.name=x.name,A.flatShading=!x.smooth,A.vertexColors=m,t.materials[R]=A),g.push(A)}let p;if(g.length>1){for(let y=0,S=h.length;y<S;y++){const x=h[y];_.addGroup(x.groupStart,x.groupCount,y)}d?p=new pa(_,g):f?p=new ta(_,g):p=new $(_,g)}else d?p=new pa(_,g[0]):f?p=new ta(_,g[0]):p=new $(_,g[0]);p.name=l.name,r.add(p)}else if(t.vertices.length>0){const o=new Ms({size:1,sizeAttenuation:!1}),c=new wt;c.setAttribute("position",new Ve(t.vertices,3)),t.colors.length>0&&t.colors[0]!==void 0&&(c.setAttribute("color",new Ve(t.colors,3)),o.vertexColors=!0);const l=new ta(c,o);r.add(l)}return r}}const ss={"hatchback-sports":{label:"Hatchback Sport",callout:"LIGHT // QUICK",model:"./assets/rigged/vehicles/kenney-hatchback-sports.glb",preview:"./assets/rigged/vehicles/previews/hatchback-sports.png",turretHeight:2.34},police:{label:"Police Interceptor",callout:"PURSUIT // TOUGH",model:"./assets/rigged/vehicles/kenney-police.glb",preview:"./assets/rigged/vehicles/previews/police.png",turretHeight:2.56},"race-future":{label:"Future Racer",callout:"LOW // EXOTIC",model:"./assets/rigged/vehicles/kenney-race-future.glb",preview:"./assets/rigged/vehicles/previews/race-future.png",turretHeight:2.16},race:{label:"Track Racer",callout:"LOW // FAST",model:"./assets/rigged/vehicles/kenney-race.glb",preview:"./assets/rigged/vehicles/previews/race.png",turretHeight:2.12},"sedan-sports":{label:"Sport Sedan",callout:"BALANCED // SHARP",model:"./assets/rigged/vehicles/kenney-sedan-sports.glb",preview:"./assets/rigged/vehicles/previews/sedan-sports.png",turretHeight:2.28},sedan:{label:"Street Sedan",callout:"BALANCED // CLEAN",model:"./assets/rigged/vehicles/kenney-sedan.glb",preview:"./assets/rigged/vehicles/previews/sedan.png",turretHeight:2.38},"suv-luxury":{label:"Luxury SUV",callout:"HIGH // HEAVY",model:"./assets/rigged/vehicles/kenney-suv-luxury.glb",preview:"./assets/rigged/vehicles/previews/suv-luxury.png",turretHeight:2.64},suv:{label:"Scrap SUV",callout:"RUGGED // READY",model:"./assets/rigged/vehicles/kenney-suv.glb",preview:"./assets/rigged/vehicles/previews/suv.png",turretHeight:2.54},taxi:{label:"Battle Taxi",callout:"LOUD // ICONIC",model:"./assets/rigged/vehicles/kenney-taxi.glb",preview:"./assets/rigged/vehicles/previews/taxi.png",turretHeight:2.67}},kp={vehicle:{defaultId:"suv",models:ss,palette:"./assets/rigged/vehicles/Textures/colormap.png",wheelNodes:["wheel-back-left","wheel-back-right","wheel-front-left","wheel-front-right"]},weapon:{model:null,fallback:"Three original low-poly roof turrets and anime-style weapon VFX assembled in Three.js"},arena:{ramp:"./assets/rigged/arena/kenney-ramp.glb",barrier:"./assets/rigged/arena/kenney-barrier-wall.glb",pylon:"./assets/rigged/arena/kenney-pylon.glb"},props:{palette:"./assets/rigged/props/Textures/colormap.png",crate:"./assets/rigged/props/kenney-crate.glb",tire:"./assets/rigged/props/kenney-debris-tire.glb",bumper:"./assets/rigged/props/kenney-debris-bumper.glb"},packs:{carKit:{name:"Kenney Car Kit 3.1",creator:"Kenney",source:"https://kenney.nl/assets/car-kit",license:"CC0 1.0",creditRequired:!1,licenseFile:"./assets/rigged/licenses/kenney-car-kit.txt"},racingKit:{name:"Kenney Racing Kit 2.0",creator:"Kenney",source:"https://kenney.nl/assets/racing-kit",license:"CC0 1.0",creditRequired:!1,licenseFile:"./assets/rigged/licenses/kenney-racing-kit.txt"}}},wf="./assets/rigged/racekart-hilly",kt=(i,e)=>({obj:`${wf}/${i}.obj`,mtl:`${wf}/${i}.mtl`,category:e}),xa={terrainFlat:kt("Terrain_Grass_Flat_1x1","terrain"),terrainHillSide:kt("Terrain_Hill_Side_1x3","terrain"),terrainHillCorner:kt("Terrain_Hill_Corner_Outer_4x4","terrain"),trackStraight:kt("Track_Standard_Straight_Double","track"),trackStraightStriped:kt("Track_Striped_Straight_Double","track"),trackCurve:kt("Track_Standard_Curve_Double_4x4","track"),trackCurveStriped:kt("Track_Striped_Curve_Double_4x4","track"),trackBank:kt("Track_Standard_Incline_Double","track"),trackBankStriped:kt("Track_Striped_Incline_Double","track"),bridgeStart:kt("Track_Bridge_Start","bridge"),bridgeIncline:kt("Track_Bridge_Incline_Gentle_Supported","bridge"),bridgeFlat:kt("Track_Bridge_Flat_Supported","bridge"),bridgeCurve:kt("Track_Bridge_Curve_3x3","bridge"),stuntRamp:kt("Prop_Track_Ramp","stunt"),stuntRailing:kt("Prop_Track_Ramp_Railing","stunt"),trackArch:kt("Prop_Track_Arch_1x4","prop"),fence:kt("Prop_Decorative_Fence_Railing","prop"),rockWide:kt("Prop_Decorative_Rock_2","prop"),rockTall:kt("Prop_Decorative_Rock_5","prop"),hayBale:kt("Prop_Decorative_Hay_Bale_Box","prop")},wn=Math.PI/2,bf=Math.PI,cc={dustring:{id:"dustring",name:"Dust Ring",callsign:"LEVEL 01 // SCRAP RING",description:"One clean combat loop with an open center, four readable jumps, and room to hunt the rival.",difficulty:"COMBAT READY",arenaKind:"ring",radius:100,ringInnerRadius:60,ringOuterRadius:88,spawn:{x:0,z:-74,heading:0},opponentSpawn:{x:0,z:74,heading:bf},objective:"Run the circuit. Hit the ramps. Scrap the rival.",surfaces:[{asset:"stuntRamp",kind:"ramp",x:0,z:-57,rotation:0,width:12,length:22,startHeight:0,endHeight:4.8,scale:11,assetYaw:wn,label:"south inward ramp"},{asset:"stuntRamp",kind:"ramp",x:0,z:57,rotation:0,width:12,length:22,startHeight:0,endHeight:4.8,scale:11,assetYaw:wn,label:"north outward ramp"},{asset:"stuntRamp",kind:"ramp",x:-57,z:0,rotation:-wn,width:12,length:22,startHeight:0,endHeight:4.8,scale:11,assetYaw:wn,label:"west outward ramp"},{asset:"stuntRamp",kind:"ramp",x:57,z:0,rotation:-wn,width:12,length:22,startHeight:0,endHeight:4.8,scale:11,assetYaw:wn,label:"east inward ramp"}],track:[],terrain:[],props:[{asset:"rockWide",x:-23,z:19,rotation:.25,scale:5.2,label:"center west rock"},{asset:"rockTall",x:-18,z:-18,rotation:-.4,scale:4.2,label:"center south rock"},{asset:"hayBale",x:18,z:-24,rotation:.15,scale:3.8,label:"center hay one"},{asset:"hayBale",x:23,z:-24,rotation:-.12,scale:3.8,label:"center hay two"}],barriers:[{x:31,z:-21,rotation:wn,length:19},{x:31,z:21,rotation:wn,length:19},{x:-8,z:31,rotation:0,length:13},{x:-31,z:-4,rotation:wn,length:13}],targets:[]},ovalbowl:{id:"ovalbowl",name:"Capsule Circuit",callsign:"ARENA 02 // CAPSULE WALL-RIDE",description:"A flat capsule stadium with long straights, rounded ends, a layered bank, and a hard upper guard.",difficulty:"WALL RIDE READY",arenaKind:"capsule",radius:112,ringInnerRadius:44,ringOuterRadius:62,bowl:{straightHalfLength:46,flatRadius:44,outerRadius:62,wallRise:11.5,guardHeight:4.5},spawn:{x:0,z:-22,heading:0},opponentSpawn:{x:0,z:22,heading:bf},objective:"Own the open floor. Carry speed into the bank. Scrap the rival.",surfaces:[],track:[],terrain:[],props:[{asset:"stuntRailing",x:-63.2,z:-17,rotation:wn,scale:8,label:"west rim racing rail south"},{asset:"stuntRailing",x:-63.2,z:17,rotation:wn,scale:8,label:"west rim racing rail north"},{asset:"stuntRailing",x:63.2,z:-17,rotation:wn,scale:8,label:"east rim racing rail south"},{asset:"stuntRailing",x:63.2,z:17,rotation:wn,scale:8,label:"east rim racing rail north"}],barriers:[],targets:[]}},zp="dustring",vw=new T(0,-1,0);function yw(i,e){i.updateWorldMatrix(!0,!0);const t=new Cn().setFromObject(i),n=e.sampleSpacing??1.15,s=Re.clamp(Math.ceil(e.width/n)+1,3,49),r=Re.clamp(Math.ceil(e.length/n)+1,3,49),a=new Float32Array(s*r),o=new Uint8Array(s*r),c=new Pp,l=Math.cos(e.rotation),u=Math.sin(e.rotation),h=t.max.y+2,d=Math.max(8,t.max.y-t.min.y+4),f=e.width*.995,m=e.length*.995;for(let _=0;_<r;_++){const g=-m*.5+_/(r-1)*m;for(let p=0;p<s;p++){const y=-f*.5+p/(s-1)*f,S=e.centerX+y*l+g*u,x=e.centerZ-y*u+g*l;c.set(new T(S,h,x),vw),c.far=d;const R=c.intersectObject(i,!0)[0],A=_*s+p;R&&(a[A]=R.point.y,o[A]=1)}}return{label:e.label,center:new ue(e.centerX,e.centerZ),rotation:e.rotation,width:e.width,length:e.length,columns:s,rows:r,heights:a,valid:o,metadata:e.metadata}}function Mw(i,e,t){const n=e-i.center.x,s=t-i.center.y,r=Math.cos(i.rotation),a=Math.sin(i.rotation),o=n*r-s*a,c=n*a+s*r,l=o/i.width+.5,u=c/i.length+.5;if(l<0||l>1||u<0||u>1)return null;const h=l*(i.columns-1),d=u*(i.rows-1),f=Math.min(Math.floor(h),i.columns-2),m=Math.min(Math.floor(d),i.rows-2),_=h-f,g=d-m,p=[[m*i.columns+f,(1-_)*(1-g)],[m*i.columns+f+1,_*(1-g)],[(m+1)*i.columns+f,(1-_)*g],[(m+1)*i.columns+f+1,_*g]];let y=0,S=0;for(const[x,R]of p)i.valid[x]&&(y+=i.heights[x]*R,S+=R);return S>.24?y/S:null}function Sw(i,e){const t=[],n=Math.cos(i.rotation),s=Math.sin(i.rotation),r=(u,h)=>{const d=-i.width*.5+u/(i.columns-1)*i.width,f=-i.length*.5+h/(i.rows-1)*i.length,m=i.center.x+d*n+f*s,_=i.center.y-d*s+f*n;return[m,i.heights[h*i.columns+u]+.055,_]},a=(u,h,d,f)=>{const m=h*i.columns+u,_=f*i.columns+d;!i.valid[m]||!i.valid[_]||t.push(...r(u,h),...r(d,f))};for(let u=0;u<i.rows;u++)for(let h=0;h<i.columns;h++)h+1<i.columns&&a(h,u,h+1,u),u+1<i.rows&&a(h,u,h,u+1);const o=new wt;o.setAttribute("position",new Ve(t,3));const c=new $i({color:e,transparent:!0,opacity:.9,depthTest:!1}),l=new pa(o,c);return l.name=`heightfield-debug-${i.label}`,l.renderOrder=20,l.visible=!1,l}const ww=(i,e)=>Math.sin(i*.075)*Math.cos(e*.058)*.035,cl=i=>i*i*(3-2*i),ll=i=>6*i*(1-i);function bw(i,e,t){if(i<=0)return{height:0,slope:0,band:"floor"};if(i<.28){const s=i/.28;return{height:t*.14*cl(s),slope:t*.14*ll(s)/(.28*e),band:"transition"}}if(i<.78){const s=(i-.28)/.5;return{height:t*(.14+.66*cl(s)),slope:t*.66*ll(s)/(.5*e),band:"bank"}}const n=(i-.78)/.22;return{height:t*(.8+.2*cl(n)),slope:t*.2*ll(n)/(.22*e),band:"upper-bank"}}function Vt(i,e,t){const n=Re.clamp(t,-i.straightHalfLength,i.straightHalfLength),s=e,r=t-n,a=Math.hypot(s,r),o=a>1e-4?s/a:1,c=a>1e-4?r/a:0,l=i.outerRadius-i.flatRadius,u=Re.clamp((a-i.flatRadius)/l,0,1),h=bw(u,l,i.wallRise),d=1-Re.smoothstep(a,i.flatRadius-8,i.flatRadius),f=ww(e,t)*d+h.height,m=h.slope,_=new T(-o*m,1,-c*m).normalize();return{height:f,distance:a,progress:u,anchorZ:n,outwardX:o,outwardZ:c,normal:_,band:h.band}}function Hp(i,e,t,n,s,r){let a=e,o=t,c=!1,l=0,u=0,h=0;const d=i.outerRadius-r-.12;for(let f=0;f<3;f++){let m=0,_=0,g=0;for(const p of[-s,0,s]){const y=a+Math.sin(n)*p,S=o+Math.cos(n)*p,x=Vt(i,y,S),R=x.distance-d;R<=m||(m=R,_=x.outwardX,g=x.outwardZ)}if(m<=0)break;a-=_*(m+.015),o-=g*(m+.015),c=!0,l=_,u=g,h=Math.max(h,m)}return{x:a,z:o,collided:c,normalX:l,normalZ:u,penetration:h}}function gh(i,e,t=48,n=40){const s=[];for(let r=0;r<t;r++){const a=r/t*Math.PI;s.push(new ue(Math.cos(a)*i,e+Math.sin(a)*i))}for(let r=0;r<n;r++){const a=r/n;s.push(new ue(-i,Re.lerp(e,-e,a)))}for(let r=0;r<t;r++){const a=Math.PI+r/t*Math.PI;s.push(new ue(Math.cos(a)*i,-e+Math.sin(a)*i))}for(let r=0;r<n;r++){const a=r/n;s.push(new ue(i,Re.lerp(-e,e,a)))}return s}function Vp(i,e){i.setAttribute("color",new Ve(e,3));const t=i.getAttribute("position"),n=new Float32Array(t.count*2);for(let s=0;s<t.count;s++)n[s*2]=t.getX(s)/7.5,n[s*2+1]=t.getZ(s)/7.5;i.setAttribute("uv",new Ve(n,2)),i.computeVertexNormals(),i.computeBoundingSphere()}function Ew(i){const e=gh(i.flatRadius,i.straightHalfLength),t=[],n=[],s=new ve(12429711),r=new ve(14796193),a=new ve;for(const u of e){const h=Vt(i,u.x,u.y).height;t.push(u.x,h,u.y);const d=Re.clamp(.48+Math.sin(u.x*.13+u.y*.09)*.12,0,1);a.copy(s).lerp(r,d).toArray(n,n.length)}const o=rr.triangulateShape(e,[]),c=[];for(const[u,h,d]of o)c.push(u,d,h);const l=new wt;return l.setAttribute("position",new Ve(t,3)),l.setIndex(c),Vp(l,n),l}function Tw(i,e=30){const t=[];for(let d=0;d<=e;d++){const f=Re.lerp(i.flatRadius,i.outerRadius,d/e);t.push(gh(f,i.straightHalfLength))}const n=t[0].length,s=[],r=[],a=new ve(12764608),o=new ve(7764856),c=new ve(12020290),l=new ve;for(let d=0;d<t.length;d++){const f=d/e;for(const m of t[d])s.push(m.x,Vt(i,m.x,m.y).height,m.y),l.copy(a).lerp(o,f),(f>.28&&f<.32||f>.76&&f<.8)&&l.lerp(c,.68),l.toArray(r,r.length)}const u=[];for(let d=0;d<e;d++)for(let f=0;f<n;f++){const m=(f+1)%n,_=d*n+f,g=d*n+m,p=(d+1)*n+f,y=(d+1)*n+m;u.push(_,g,p,g,y,p)}const h=new wt;return h.setAttribute("position",new Ve(s,3)),h.setIndex(u),Vp(h,r),h}function Aw(i){const e=gh(i.outerRadius,i.straightHalfLength),t=[],n=[],s=[],r=[0];for(let o=1;o<=e.length;o++)r.push(r[o-1]+e[(o-1)%e.length].distanceTo(e[o%e.length]));for(let o=0;o<e.length;o++){const c=e[o],l=Vt(i,c.x,c.y).height;t.push(c.x,l-.08,c.y),t.push(c.x,l+i.guardHeight,c.y);const u=r[o]/7.5;n.push(u,0,u,i.guardHeight/7.5)}for(let o=0;o<e.length;o++){const c=(o+1)%e.length,l=o*2,u=l+1,h=c*2,d=h+1;s.push(l,u,h,h,u,d)}const a=new wt;return a.setAttribute("position",new Ve(t,3)),a.setAttribute("uv",new Ve(n,2)),a.setIndex(s),a.computeVertexNormals(),a.computeBoundingSphere(),a}const go=11.5,_o=6.3,Ef=2.6,Tf=4.5;class Rw{mode="chase";camera;desiredPosition=new T;desiredLook=new T;smoothedLook=new T;forward=new T;toEnemy=new T;orbitYaw=0;followDistance=go;followHeight=_o;initialized=!1;constructor(e){this.camera=e}toggle(e){return this.mode==="enemy"?(this.mode="chase",{mode:this.mode,noTarget:!1}):e?(this.mode="enemy",{mode:this.mode,noTarget:!1}):{mode:this.mode,noTarget:!0}}snapToChase(e,t,n){this.orbitYaw=t,this.followDistance=go,this.followHeight=_o,this.forward.set(Math.sin(t),0,Math.cos(t)),this.camera.position.copy(e).addScaledVector(this.forward,-go),this.camera.position.y=Math.max(e.y+_o,n(this.camera.position.x,this.camera.position.z)+Ef),this.smoothedLook.copy(e).addScaledVector(this.forward,4),this.smoothedLook.y=e.y+1.2,this.camera.lookAt(this.smoothedLook),this.initialized=!0}update(e){const t=Re.clamp(e.dt,0,.03333333333333333);let n=!1;this.mode==="enemy"&&(!e.enemyAvailable||!e.enemyPosition)&&(this.mode="chase",n=!0),this.forward.set(Math.sin(e.playerHeading),0,Math.cos(e.playerHeading));let s=null;if(this.mode==="enemy"&&e.enemyPosition){if(this.toEnemy.copy(e.enemyPosition).sub(e.playerPosition),this.toEnemy.y=0,s=this.toEnemy.length(),s>.75){const c=Math.atan2(this.toEnemy.x,this.toEnemy.z),l=Math.atan2(Math.sin(c-this.orbitYaw),Math.cos(c-this.orbitYaw));this.orbitYaw+=l*this.response(5.4,t)}const r=Re.clamp(8.9+s*.105,9.5,14.5),a=Re.clamp(6.4+s*.035,6.4,9.2);this.followDistance=Re.lerp(this.followDistance,r,this.response(4.2,t)),this.followHeight=Re.lerp(this.followHeight,a,this.response(4.2,t)),this.forward.set(Math.sin(this.orbitYaw),0,Math.cos(this.orbitYaw)),this.desiredPosition.copy(e.playerPosition).addScaledVector(this.forward,-this.followDistance),this.desiredPosition.y=e.playerPosition.y+this.followHeight;const o=Re.clamp(.36+s*.002,.36,.54);this.desiredLook.lerpVectors(e.playerPosition,e.enemyPosition,o),this.desiredLook.y+=1.25}else this.orbitYaw=e.playerHeading,this.followDistance=Re.lerp(this.followDistance,go,this.response(4.8,t)),this.followHeight=Re.lerp(this.followHeight,_o,this.response(4.8,t)),this.desiredPosition.copy(e.playerPosition).addScaledVector(this.forward,-this.followDistance),this.desiredPosition.y=e.playerPosition.y+this.followHeight,this.desiredLook.copy(e.playerPosition).addScaledVector(this.forward,4),this.desiredLook.y=e.playerPosition.y+1.2;return e.shake&&this.desiredPosition.add(e.shake),this.constrainToArena(this.desiredPosition,e.bounds),this.desiredPosition.y=Math.max(this.desiredPosition.y,e.groundHeight(this.desiredPosition.x,this.desiredPosition.z)+Ef),this.initialized||this.snapToChase(e.playerPosition,e.playerHeading,e.groundHeight),this.camera.position.lerp(this.desiredPosition,this.response(6.5,t)),this.smoothedLook.lerp(this.desiredLook,this.response(8.5,t)),this.camera.up.set(0,1,0),this.camera.lookAt(this.smoothedLook),{mode:this.mode,fellBackToChase:n,targetDistance:s}}get lookAt(){return this.smoothedLook}response(e,t){return 1-Math.exp(-e*t)}constrainToArena(e,t){if(t.kind==="ring"){const c=Math.max(1,t.radius-Tf),l=Math.hypot(e.x,e.z);l>c&&(e.x*=c/l,e.z*=c/l);return}const n=Re.clamp(e.z,-t.straightHalfLength,t.straightHalfLength),s=e.x,r=e.z-n,a=Math.hypot(s,r),o=Math.max(1,t.outerRadius-Tf);a<=o||(e.x=s*o/a,e.z=n+r*o/a)}}const ul=()=>({damageMultiplier:1,fireRateMultiplier:1,projectileSpeedMultiplier:1,rangeMultiplier:1,projectileCount:1,spread:0,ricochets:0,pierces:0,burnDps:0,burnDuration:0,heavyRounds:!1});function Gp(i,e=1){return{version:1,round:e,ownedTurrets:[i],activeTurret:i,turretStats:{mg:ul(),rocket:ul(),sniper:ul()},vehicleStats:{maxHealthMultiplier:1,accelerationMultiplier:1,maxSpeedMultiplier:1,handlingMultiplier:1,tractionMultiplier:1,boostMultiplier:1,armorBonus:0,ramMultiplier:1,stabilityMultiplier:1},upgrades:[],repairAfterRound:0,roundShield:0,swapCooldown:.16,tireVisual:"stock"}}const yi=i=>i.turretStats[i.activeTurret],Mi=i=>({...i,category:"weapon",scope:"Current turret"}),ps=i=>({...i,category:"vehicle",scope:"Vehicle"}),hl=i=>({...i,category:"utility",scope:"Whole rig"}),Vo=[Mi({id:"double-tap",name:"Double Tap",rarity:"common",description:"A twitchy trigger job for the turret you have mounted.",stats:["+35% fire rate","-10% damage"],quote:"Twice the noise. Almost twice the trouble.",apply:i=>{const e=yi(i);e.fireRateMultiplier*=1.35,e.damageMultiplier*=.9}}),Mi({id:"heavy-rounds",name:"Heavy Rounds",rarity:"rare",description:"Turns the active turret into a slow, brutal wrecking tool.",stats:["+100% damage","-50% fire rate","Larger shot VFX"],quote:"Slow. Loud. Final.",apply:i=>{const e=yi(i);e.damageMultiplier*=2,e.fireRateMultiplier*=.5,e.heavyRounds=!0}}),Mi({id:"multishot",name:"Multishot",rarity:"epic",description:"The active turret throws a fan of scrap downrange.",stats:["+2 projectiles","-35% damage","+12° spread"],quote:"Accuracy is a problem for the other car.",apply:i=>{const e=yi(i);e.projectileCount+=2,e.damageMultiplier*=.65,e.spread+=Math.PI/15}}),Mi({id:"ricochet-rounds",name:"Ricochet Rounds",rarity:"rare",description:"Shots from the active turret rebound from the arena once.",stats:["+1 ricochet","-15% projectile speed"],quote:"Miss once. Hit later.",apply:i=>{const e=yi(i);e.ricochets+=1,e.projectileSpeedMultiplier*=.85}}),Mi({id:"incendiary-rounds",name:"Incendiary Rounds",rarity:"epic",description:"Orange-hot shots ignite the rival and leave ember impacts.",stats:["12 burn damage / sec","3 sec burn","-20% impact damage"],quote:"Make the whole arena smell like bad decisions.",apply:i=>{const e=yi(i);e.burnDps+=12,e.burnDuration=Math.max(e.burnDuration,3),e.damageMultiplier*=.8}}),Mi({id:"piercing-rounds",name:"Piercing Rounds",rarity:"rare",description:"The active turret punches through one target before stopping.",stats:["Pierces 1 target","-20% damage","Brighter tracer"],quote:"Armor is just scenery.",apply:i=>{const e=yi(i);e.pierces+=1,e.damageMultiplier*=.8}}),Mi({id:"overclocked-trigger",name:"Overclocked Trigger",rarity:"epic",description:"Unsafe wiring makes the active turret frantic and inaccurate.",stats:["+60% fire rate","+20° spread"],quote:"The red wire was probably optional.",apply:i=>{const e=yi(i);e.fireRateMultiplier*=1.6,e.spread+=Math.PI/9}}),Mi({id:"long-barrel",name:"Long Barrel",rarity:"common",description:"More velocity and reach, paid for with a heavier firing cycle.",stats:["+30% projectile speed","+20% range","-10% fire rate"],quote:"Reach out and ruin somebody's afternoon.",apply:i=>{const e=yi(i);e.projectileSpeedMultiplier*=1.3,e.rangeMultiplier*=1.2,e.fireRateMultiplier*=.9}}),ps({id:"racing-tires",name:"Racing Tires",rarity:"common",description:"Sleek dark rubber bites hard on fast corners.",stats:["+30% handling","+18% traction","-8% max health"],quote:"Grip now. Regret the pothole later.",apply:i=>{i.vehicleStats.handlingMultiplier*=1.3,i.vehicleStats.tractionMultiplier*=1.18,i.vehicleStats.maxHealthMultiplier*=.92,i.tireVisual="racing"}}),ps({id:"offroad-tires",name:"Offroad Tires",rarity:"common",description:"Chunky tires calm the rig on ramps and rough ground.",stats:["+32% traction","+20% stability","-5% top speed"],quote:"Ugly tires. Beautiful landings.",apply:i=>{i.vehicleStats.tractionMultiplier*=1.32,i.vehicleStats.stabilityMultiplier*=1.2,i.vehicleStats.maxSpeedMultiplier*=.95,i.tireVisual="offroad"}}),ps({id:"turbocharger",name:"Turbocharger",rarity:"rare",description:"Violent spool turns every straight into a launch lane.",stats:["+35% acceleration","+18% top speed","-12% handling"],quote:"Point first. Boost second.",apply:i=>{i.vehicleStats.accelerationMultiplier*=1.35,i.vehicleStats.maxSpeedMultiplier*=1.18,i.vehicleStats.handlingMultiplier*=.88}}),ps({id:"reinforced-plating",name:"Reinforced Plating",rarity:"common",description:"Riveted steel keeps the hull together at the cost of response.",stats:["+45% max health","+10% armor","-18% acceleration"],quote:"Fast is temporary. Steel is stubborn.",apply:i=>{i.vehicleStats.maxHealthMultiplier*=1.45,i.vehicleStats.armorBonus+=.1,i.vehicleStats.accelerationMultiplier*=.82}}),ps({id:"light-frame",name:"Light Frame",rarity:"rare",description:"Strip the rig down until speed is the only defense left.",stats:["+18% top speed","+25% acceleration","-30% max health"],quote:"If they hit you, the build was wrong.",apply:i=>{i.vehicleStats.maxSpeedMultiplier*=1.18,i.vehicleStats.accelerationMultiplier*=1.25,i.vehicleStats.maxHealthMultiplier*=.7}}),ps({id:"heavy-frame",name:"Heavy Frame",rarity:"rare",description:"A wide, dark wheel-and-frame package built for ramming.",stats:["+55% ramming force","+8% armor","-22% handling"],quote:"Cornering is optional when the other car moves.",apply:i=>{i.vehicleStats.ramMultiplier*=1.55,i.vehicleStats.armorBonus+=.08,i.vehicleStats.handlingMultiplier*=.78,i.tireVisual="heavy"}}),ps({id:"stabilizer-kit",name:"Stabilizer Kit",rarity:"common",description:"Bracing resists ugly rolls and keeps the tires under you.",stats:["+35% stability","+12% traction","-6% top speed"],quote:"Land dirty. Drive away clean.",apply:i=>{i.vehicleStats.stabilityMultiplier*=1.35,i.vehicleStats.tractionMultiplier*=1.12,i.vehicleStats.maxSpeedMultiplier*=.94}}),hl({id:"field-repair",name:"Field Repair",rarity:"common",description:"The pit crew patches the hull after every round.",stats:["Repair 25 hull after each round"],quote:"Nothing a hammer and optimism can't fix.",apply:i=>{i.repairAfterRound+=25}}),hl({id:"emergency-shield",name:"Emergency Shield",rarity:"rare",description:"A disposable field catches the opening burst each round.",stats:["Start rounds with 35 shield"],quote:"One free mistake. Spend it loudly.",apply:i=>{i.roundShield+=35}}),hl({id:"quick-swap",name:"Quick Swap",rarity:"common",description:"Powered bearings snap owned turrets into place faster.",stats:["-65% turret swap delay","+8% handling"],quote:"Wrong gun? Not for long.",apply:i=>{i.swapCooldown=Math.max(.035,i.swapCooldown*.35),i.vehicleStats.handlingMultiplier*=1.08}})],Go={mg:"Scrap Rattler",rocket:"Hellbox Rockets",sniper:"Longlance Rail"};function _h(i){return{id:`add-${i}`,name:`Add ${Go[i]}`,rarity:"epic",category:"turret",scope:"New turret slot",description:`Bolt ${Go[i]} into the rig's owned turret loadout and equip it now.`,stats:["+1 owned turret","Mouse wheel / number-key swapping"],quote:"A new answer to an old problem.",apply:e=>{e.ownedTurrets.includes(i)||e.ownedTurrets.push(i),e.activeTurret=i}}}function dl(i,e){const t=[...i];let n=(e||1)>>>0;for(let s=t.length-1;s>0;s--){n=n*1664525+1013904223>>>0;const r=n%(s+1);[t[s],t[r]]=[t[r],t[s]]}return t}function xh(i){const e=i.round*7919+i.upgrades.length*104729+i.ownedTurrets.length*31,t=dl(Vo.filter(r=>!i.upgrades.includes(r.id)),e),n=t.length>=3?t:dl(Vo,e);if(i.round%3!==0)return n.slice(0,3);const s=Object.keys(Go).filter(r=>!i.ownedTurrets.includes(r));return s.length===0?[Mi({id:`mastery-${i.activeTurret}-${i.round}`,name:`${Go[i.activeTurret]} Mastery`,rarity:"epic",description:"With every turret slot filled, refine the active weapon instead.",stats:["+45% damage","+20% projectile speed"],quote:"Three guns. One favorite.",apply:a=>{const o=yi(a);o.damageMultiplier*=1.45,o.projectileSpeedMultiplier*=1.2}}),...n.slice(0,2)]:[_h(dl(s,e)[0]),...n.slice(0,2)]}function Wp(i,e){return e.apply(i),i.upgrades.push(e.id),i}function Cw(i){if(!i||typeof i!="object")return!1;const e=i;return e.version===1&&Array.isArray(e.ownedTurrets)&&e.ownedTurrets.length>0&&typeof e.activeTurret=="string"&&!!e.turretStats&&!!e.vehicleStats&&Array.isArray(e.upgrades)}const Pw={apiKey:"AIzaSyDRniZatGeylxphjHQadYjucOcirNBRIdk",authDomain:"multiplayer-640ec.firebaseapp.com",databaseURL:"https://multiplayer-640ec-default-rtdb.firebaseio.com",projectId:"multiplayer-640ec",storageBucket:"multiplayer-640ec.firebasestorage.app",messagingSenderId:"94914236381",appId:"1:94914236381:web:55ab00cc690140180cf034"},Af="riggedRooms",Rf="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",Lw="https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js",Iw="https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js",Dw="https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";function Wo(i){return i.replace(/\s+/g," ").trim().slice(0,18)||"Road warrior"}function bu(i){return i.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,5)}function Nw(i=Math.random){return Array.from({length:5},()=>Rf[Math.floor(i()*Rf.length)]).join("")}function Dr(i){return i?Object.entries(i.players??{}).map(([e,t])=>({id:e,...t})).sort((e,t)=>e.joinedAt-t.joinedAt):[]}function Uw(i,e,t,n=Date.now()){if(!(i.phase==="starter_draft"||i.phase==="upgrade_draft")||i.activePickerId!==e||!i.draftOptions.includes(t.optionId))return;const r=lc(i),a=i.draftTurn+1,o=a>=r.length,c=o&&i.phase==="starter_draft";return{...i,phase:c?"vehicle_select":o?"playing":i.phase,round:o&&i.phase==="upgrade_draft"?i.round+1:i.round,activePickerId:c?r[0]:o?"":r[a],draftOptions:c?t.nextOptions:o?[]:t.nextOptions,draftTurn:c?0:a,pickSequence:(i.pickSequence??0)+1,lastPick:{id:(i.pickSequence??0)+1,playerId:e,optionId:t.optionId,optionName:t.optionName,pickedAt:n},roundReady:o?{}:i.roundReady,runState:t.nextRunState,updatedAt:n}}function Fw(i,e,t,n,s=Date.now()){if(i.phase!=="vehicle_select"||i.activePickerId!==e||!i.draftOptions.includes(t))return;const r=lc(i),a=i.draftTurn+1,o=a>=r.length;return{...i,phase:o?"playing":"vehicle_select",activePickerId:o?"":r[a],draftTurn:a,draftOptions:o?[]:i.draftOptions,pickSequence:(i.pickSequence??0)+1,lastPick:{id:(i.pickSequence??0)+1,playerId:e,optionId:t,optionName:n,pickedAt:s},vehicleSelections:{...i.vehicleSelections??{},[e]:t},updatedAt:s}}function Ow(i,e,t,n,s=Date.now()){if(i.phase!=="playing")return;const r=lc(i),a={...i.roundReady??{},[e]:!0},o=r.length===2&&r.every(c=>a[c]);return{...i,phase:o?"upgrade_draft":i.phase,activePickerId:o?r[0]:i.activePickerId,draftOptions:o?t:i.draftOptions,draftTurn:o?0:i.draftTurn,lastPick:o?null:i.lastPick,roundReady:a,runState:n,updatedAt:s}}async function Bw(){const[i,e,t]=await Promise.all([import(Lw),import(Iw),import(Dw)]),n=i.initializeApp(Pw);return{auth:e.getAuth(n),db:t.getDatabase(n),ref:t.ref,get:t.get,onValue:t.onValue,onDisconnect:t.onDisconnect,runTransaction:t.runTransaction,signInAnonymously:e.signInAnonymously}}class vh{playerId;room=null;sdk;unsubscribe=null;roomListener=()=>{};constructor(e,t){this.sdk=e,this.playerId=t}static async connect(){const e=await Bw(),t=await e.signInAnonymously(e.auth);return new vh(e,t.user.uid)}onRoom(e){this.roomListener=e,e(this.room)}isHost(){return this.room?.hostId===this.playerId}isMyTurn(){return this.room?.activePickerId===this.playerId}async createRoom(e){for(let t=0;t<8;t+=1){const n=Nw(),s=Date.now(),r={code:n,hostId:this.playerId,phase:"lobby",round:1,players:{[this.playerId]:{name:Wo(e),joinedAt:s}},playerOrder:[this.playerId],activePickerId:"",draftOptions:[],draftTurn:0,pickSequence:0,lastPick:null,vehicleSelections:{},roundReady:{},runState:null,createdAt:s,updatedAt:s};if((await this.sdk.runTransaction(this.roomRef(n),o=>o?void 0:r)).committed)return await this.watchRoom(n),n}throw new Error("Could not reserve a room code. Try again.")}async joinRoom(e,t){const n=bu(e);if(n.length!==5)throw new Error("Enter the five-character room code.");const s=Date.now();if(!(await this.sdk.runTransaction(this.roomRef(n),a=>{if(!a||a.phase!=="lobby")return;const o=Object.keys(a.players??{});if(!a.players?.[this.playerId]&&o.length>=2)return;const c={...a.players??{},[this.playerId]:{name:Wo(t),joinedAt:a.players?.[this.playerId]?.joinedAt??s}},l=[...(a.playerOrder??[]).filter(u=>c[u])];return l.includes(this.playerId)||l.push(this.playerId),{...a,players:c,playerOrder:l,updatedAt:s}})).committed)throw(await this.sdk.get(this.roomRef(n))).exists()?new Error("That room is already running or full."):new Error("That room does not exist.");return await this.watchRoom(n),n}async startRun(){if(!await this.transact(t=>{const n=lc(t);if(!(t.hostId!==this.playerId||t.phase!=="lobby"||n.length!==2))return{...t,phase:"starter_draft",playerOrder:n,activePickerId:n[0],draftOptions:["mg","rocket","sniper"],draftTurn:0,pickSequence:0,lastPick:null,vehicleSelections:{},runState:null,updatedAt:Date.now()}}))throw new Error("The host can launch once two players are in the room.")}async submitPick(e){if(!await this.transact(n=>Uw(n,this.playerId,e)))throw new Error("That pick is no longer available.")}async submitVehiclePick(e,t){if(!await this.transact(s=>Fw(s,this.playerId,e,t)))throw new Error("That vehicle pick is no longer available.")}async markRoundComplete(e,t){if(!await this.transact(s=>Ow(s,this.playerId,e,t)))throw new Error("The room is not accepting round results.")}roomRef(e=this.room?.code??""){return this.sdk.ref(this.sdk.db,`${Af}/${e}`)}async transact(e){return this.room?.code?(await this.sdk.runTransaction(this.roomRef(),n=>n?e(n):void 0)).committed:!1}async watchRoom(e){this.unsubscribe?.();const t=this.sdk.ref(this.sdk.db,`${Af}/${e}/players/${this.playerId}`);await this.sdk.onDisconnect(t).remove(),this.unsubscribe=this.sdk.onValue(this.roomRef(e),n=>{this.room=n.val()??null,this.roomListener(this.room)})}}function lc(i){const e=new Set(Object.keys(i.players??{})),t=[...(i.playerOrder??[]).filter(n=>e.has(n))];for(const n of Dr(i))t.includes(n.id)||t.push(n.id);return t.slice(0,2)}const L=Be("game"),K={health:Be("health-value"),healthBar:Be("health-bar"),boost:Be("boost-value"),boostBar:Be("boost-bar"),boostMeter:document.querySelector(".status-meter--boost"),weapon:Be("weapon-part"),weaponState:Be("weapon-state"),message:Be("message"),controls:Be("controls"),pause:Be("pause"),debug:Be("physics-debug"),multiplayerLobby:Be("multiplayer-lobby"),round:Be("round-value"),playerRounds:Be("player-rounds"),enemyRounds:Be("enemy-rounds"),countdown:Be("round-countdown"),countdownValue:Be("round-countdown-value"),countdownArena:Be("round-countdown-arena"),rivalHealth:Be("rival-health-value"),rivalHealthBar:Be("rival-health-bar"),cameraMode:Be("camera-mode-value"),starterSelect:Be("starter-select"),cardDraft:Be("card-draft"),cardGrid:Be("card-grid"),vehicleSelect:Be("vehicle-select"),vehicleGrid:Be("vehicle-grid"),vehicleTurn:Be("vehicle-turn"),vehiclePickReveal:Be("vehicle-pick-reveal"),draftEyebrow:Be("draft-eyebrow"),draftTitle:Be("card-draft-title"),draftSubtitle:Be("draft-subtitle"),starterTurn:Be("starter-turn"),starterPickReveal:Be("starter-pick-reveal"),draftPickReveal:Be("draft-pick-reveal"),roomEntry:Be("room-entry"),roomWaiting:Be("room-waiting"),playerName:Be("player-name"),roomCodeInput:Be("room-code-input"),roomCodeDisplay:Be("room-code-display"),roomPlayers:Be("room-players"),roomStatus:Be("room-status"),hostRoom:Be("host-room"),joinRoomForm:Be("join-room-form"),startRun:Be("start-run"),activeUpgrades:Be("active-upgrades"),weaponSelect:Be("weapon-select")},uc=new URLSearchParams(location.search),Xo="rigged-roguelike-run-v1";function kw(){try{const i=JSON.parse(sessionStorage.getItem(Xo)??"null");return Cw(i)?i:null}catch{return null}}function Ca(){He&&sessionStorage.setItem(Xo,JSON.stringify(He))}let He=kw();const yh=(i,e)=>Re.clamp(Number.parseInt(uc.get(i)??"0",10)||0,0,e);let Zi=yh("pw",3),ws=yh("ew",3),qt=Math.max(1,yh("round",99)||1),qo=!1;He&&(He.round=qt);let gt="loading";const zw=3.55,Hw=.55;let Xp=0,Eu=3,Cf=0,Lt=null,at=null,Pf=0,Mh=!1,Ro=0,va=kp.vehicle.defaultId;function Pa(){K.round.textContent=String(qt).padStart(2,"0"),K.playerRounds.querySelectorAll("i").forEach((i,e)=>i.classList.toggle("won",e<Zi)),K.enemyRounds.querySelectorAll("i").forEach((i,e)=>i.classList.toggle("won",e<ws)),L.dataset.currentRound=String(qt),L.dataset.playerRoundWins=String(Zi),L.dataset.enemyRoundWins=String(ws)}function Vw(){km("player")}function Gw(){km("opponent")}const qp=1.25,_n=new CS({canvas:L,antialias:!0,powerPreference:"high-performance"});_n.setPixelRatio(Math.min(devicePixelRatio,qp));_n.setSize(innerWidth,innerHeight,!1);_n.shadowMap.enabled=!0;_n.shadowMap.type=Hu;_n.outputColorSpace=Tt;_n.toneMapping=Kf;_n.toneMappingExposure=1.08;const be=new T0;be.background=new ve(8227218);be.fog=new eh(7567998,.0068);const Yp=new lh,hc=Yp.load("./assets/cloudy-sky.png");hc.mapping=Fo;hc.colorSpace=Tt;be.background=hc;be.backgroundIntensity=.72;be.environment=hc;be.environmentIntensity=.58;function Sh(i,e=1,t=e){const n=Yp.load(i);return n.wrapS=n.wrapT=es,n.repeat.set(e,t),n.colorSpace=Tt,n.anisotropy=Math.min(8,_n.capabilities.getMaxAnisotropy()),n}const Wi=Sh("./assets/materials/dirty-arena-ground-v1.png"),Yo=Sh("./assets/materials/weathered-arena-metal-v1.png"),Cs=Sh("./assets/materials/gritty-turret-metal-v1.png",2.4,2.4);function fl(i,e=7.5){const t=i.getAttribute("position"),n=new Float32Array(t.count*2);for(let s=0;s<t.count;s++)n[s*2]=t.getX(s)/e,n[s*2+1]=t.getZ(s)/e;i.setAttribute("uv",new Xt(n,2))}const Ww=new PS,Lf=new Map,If=new Map;function Xw(i){const e=Lf.get(i);if(e)return e;const t=new Promise((n,s)=>{Ww.load(i,({scene:r})=>{r.updateMatrixWorld(!0);const a=new Cn().setFromObject(r),o=a.getCenter(new T);r.position.set(-o.x,-a.min.y,-o.z),r.traverse(l=>{if(!(l instanceof $))return;l.castShadow=!1,l.receiveShadow=!0;const u=Array.isArray(l.material)?l.material:[l.material];for(const h of u)h instanceof Yt&&(h.roughness=Math.max(h.roughness,.66),h.metalness=Math.min(h.metalness,.35))});const c=new ct;c.add(r),n(c)},void 0,s)});return Lf.set(i,t),t}async function qw(i){const t=(await Xw(i)).clone(!0),n=Number(L.dataset.assetsLoaded??0)+1;return L.dataset.assetsLoaded=String(n),t}function dc(i,e){L.dataset.assetErrors=String(Number(L.dataset.assetErrors??0)+1),console.error(`[Rigged] Failed to load licensed asset: ${i}`,e)}function Yw(i){const e=If.get(i);if(e)return e;const t=xa[i],n=new Promise((s,r)=>{new hw().load(t.mtl,a=>{a.preload();const o=new xw;o.setMaterials(a),o.load(t.obj,c=>{c.updateMatrixWorld(!0);const l=new Cn().setFromObject(c),u=l.getCenter(new T);c.position.set(-u.x,-l.min.y,-u.z),c.traverse(d=>{if(!(d instanceof $))return;d.castShadow=!1,d.receiveShadow=!0;const f=Array.isArray(d.material)?d.material:[d.material];for(const m of f)m instanceof ch&&(m.shininess=Math.min(m.shininess,8),m.specular.setHex(1380877))});const h=new ct;h.name=`racekart-hilly-${i}`,h.userData.sourceSize=l.getSize(new T),h.add(c),s(h)},void 0,r)},void 0,r)});return If.set(i,n),n}async function wh(i){const e=await Yw(i);return L.dataset.assetsLoaded=String(Number(L.dataset.assetsLoaded??0)+1),e.clone(!0)}const Rn=new un(58,innerWidth/innerHeight,.1,520);Rn.position.set(0,7,-11);const Xi=new Rw(Rn),Kw=new C_(12372951,3944487,1.35);be.add(Kw);const Vn=new Cp(16771792,3.25);Vn.position.set(-28,42,-18);Vn.castShadow=!0;Vn.shadow.mapSize.set(1024,1024);Vn.shadow.camera.left=-125;Vn.shadow.camera.right=125;Vn.shadow.camera.top=125;Vn.shadow.camera.bottom=-125;Vn.shadow.camera.near=2;Vn.shadow.camera.far=180;Vn.shadow.bias=-35e-5;Vn.shadow.normalBias=.035;be.add(Vn);const fc=new ct;fc.name="cloud-break-volumetric-light";const jw=new Ci({transparent:!0,depthWrite:!1,side:Ht,blending:pr,vertexShader:"varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:"varying vec2 vUv; void main(){float edge=pow(max(0.0,1.0-abs(vUv.x-.5)*2.0),1.8);float fade=smoothstep(0.0,.2,vUv.y)*(1.0-smoothstep(.7,1.0,vUv.y));gl_FragColor=vec4(1.0,.91,.76,edge*fade*.042);}"});for(const[i,e,t,n]of[[-48,-34,18,.08],[-12,8,13,-.05],[28,-10,17,.06],[54,34,12,-.08],[-62,48,10,.04]]){const s=new ct;s.position.set(i,37,e),s.rotation.z=n;for(const r of[0,Math.PI/3,Math.PI*2/3]){const a=new $(new Cr(t*1.7,78),jw);a.rotation.y=r,a.renderOrder=-1,s.add(a)}fc.add(s)}be.add(fc);let gi=23063;const Co=new Float32Array(760*3);for(let i=0;i<760;i++){gi=gi*1664525+1013904223>>>0;const e=gi/4294967295;gi=gi*1664525+1013904223>>>0;const t=gi/4294967295;gi=gi*1664525+1013904223>>>0;const n=gi/4294967295;Co[i*3]=(e-.5)*236,Co[i*3+1]=.6+t*22,Co[i*3+2]=(n-.5)*236}const Kp=new wt;Kp.setAttribute("position",new Xt(Co,3));const bh=new ta(Kp,new Ms({color:14862756,size:.13,transparent:!0,opacity:.22,depthWrite:!1,blending:pr}));bh.name="volumetric-dust-motes";be.add(bh);const cr=new Yt({color:12081725,map:Cs,bumpMap:Cs,bumpScale:.025,roughness:.74,metalness:.48}),Kn=new Yt({color:12631733,map:Cs,bumpMap:Cs,bumpScale:.035,roughness:.48,metalness:.84}),pn=new Yt({color:7633010,map:Cs,bumpMap:Cs,bumpScale:.04,roughness:.59,metalness:.82}),Tu=new Yt({color:11449006,map:Yo,bumpMap:Yo,bumpScale:.055,roughness:.48,metalness:.74,side:Ht}),$w=new Yt({color:16777215,map:Wi,bumpMap:Wi,bumpScale:.07,roughness:.96,metalness:0,vertexColors:!0}),jp=new Yt({color:1052945,roughness:.9,metalness:.08});let Z=cc[zp],Tn=Z.radius,xn=!1,pl=!1;const On=1.12,Un=.95,Zw=.72,zt=1/60,Jw=.1,Df=5,Nf=1.15,Er=[],Ps=[],Nr=[],Li=[],kn=[],Ji=[];let Hi=!1;const Ur=new $(new Ns(.3,10,7),new et({color:5439472,depthTest:!1}));Ur.name="vehicle-surface-contact";Ur.renderOrder=30;Ur.visible=!1;be.add(Ur);kn.push(Ur);const Ls=new T,Au=new Ra(new T(0,1,0),Ls,3.2,7536488,.55,.28),Ru=new Ra(new T(0,1,0),Ls,3.8,5505009,.6,.3),Cu=new Ra(new T(0,0,1),Ls,4.5,16768099,.65,.32),Po=new Ra(new T(0,0,1),Ls,3,16749375,.6,.3),Lo=new Ra(new T(1,0,0),Ls,3.5,16731726,.6,.3),ei=new T(0,1,0);for(const i of[Au,Ru,Cu,Po,Lo])i.visible=!1,i.renderOrder=31,be.add(i),kn.push(i);const Zr=new Set,$p=new Set;function St(i,e){return Z.arenaKind==="capsule"&&Z.bowl?Vt(Z.bowl,i,e).height:Math.sin(i*.055)*Math.cos(e*.05)*.035}function Qw(i,e){if(Z.arenaKind!=="capsule"||!Z.bowl)return null;const t=Vt(Z.bowl,i,e);return t.progress<=.001?null:{ramp:{kind:"wall",label:`${t.band} capsule collider band`,rotation:Math.atan2(t.outwardX,t.outwardZ),length:Z.bowl.outerRadius-Z.bowl.flatRadius,rise:Z.bowl.wallRise},height:t.height,localZ:t.progress}}function Zp(i,e){const t=e.contact??{kind:e.kind,label:e.label,rotation:e.rotation,length:e.length,rise:0},n=yw(i,{label:e.label,centerX:e.x,centerZ:e.z,rotation:e.rotation,width:e.width,length:e.length,metadata:t});let s=Number.POSITIVE_INFINITY,r=Number.NEGATIVE_INFINITY,a=0;for(let c=0;c<n.heights.length;c++)n.valid[c]&&(s=Math.min(s,n.heights[c]),r=Math.max(r,n.heights[c]),a++);t.rise=a?r-s:0,Ji.push(n),Li.push(i);const o=Sw(n,e.kind==="bridge"?5505009:e.kind==="ramp"?16760405:7536488);return be.add(o),kn.push(o),n}async function ya(i){try{const e=await wh(i.asset),t=i.scale??10,n=e.userData.sourceSize,s=xa[i.asset],r=s.category==="track"&&n?-n.y*t+.08:0;e.name=`racekart-hilly-${i.asset}${i.label?`-${i.label}`:""}`,e.scale.setScalar(t),e.position.set(i.x,St(i.x,i.z)+(i.y??r),i.z),e.rotation.y=i.rotation??0,be.add(e),(s.category==="terrain"||s.category==="track")&&n&&Zp(e,{label:i.label??i.asset,x:i.x,z:i.z,rotation:i.rotation??0,width:n.x*t,length:n.z*t,kind:s.category})}catch(e){dc(xa[i.asset].obj,e)}}function Ko(i,e,t,n=!1){const s=new $(new Pi(4.2,5.2,24),new et({color:n?11094834:14195270,side:Ht,transparent:!0,opacity:.68}));s.rotateX(-Math.PI/2),s.rotation.z=t,s.position.set(i,St(i,e)+.11,e),s.name=n?"opponent-spawn-placeholder":"player-spawn",be.add(s)}async function Jp(){if(Z.arenaKind==="capsule"){await eb();return}const i=Tn*2+18,e=new Cr(i,i,112,112);e.rotateX(-Math.PI/2);const t=e.attributes.position;for(let m=0;m<t.count;m++)t.setY(m,St(t.getX(m),t.getZ(m)));fl(e);const n=new Float32Array(t.count*3),s=new ve(12758417),r=new ve(15783083),a=new ve;for(let m=0;m<t.count;m++){const _=t.getX(m),g=t.getZ(m),p=Re.clamp(.46+Math.sin(_*.19+g*.13)*.1+Math.cos(_*.07-g*.11)*.06,0,1);a.copy(s).lerp(r,p),a.toArray(n,m*3)}e.setAttribute("color",new Xt(n,3)),t.needsUpdate=!0,e.computeVertexNormals();const o=new $(e,$w);o.receiveShadow=!0,o.name="arena-ground-aim-surface",be.add(o),Li.push(o);const c=new Yt({color:7827818,map:Wi,bumpMap:Wi,bumpScale:.035,roughness:.9,metalness:.04,side:Ht}),l=new Pi(Z.ringInnerRadius,Z.ringOuterRadius,128);l.rotateX(-Math.PI/2),fl(l);const u=new $(l,c);u.position.y=.055,u.receiveShadow=!0,u.name="continuous-circular-ring-track",be.add(u);const h=new yr(Z.ringInnerRadius-2.5,96);h.rotateX(-Math.PI/2),fl(h);const d=new $(h,new Yt({color:13677453,map:Wi,bumpMap:Wi,bumpScale:.07,roughness:.97,metalness:0,side:Ht}));d.position.y=.04,d.receiveShadow=!0,d.name="central-combat-bowl",be.add(d);for(const[m,_,g]of[[Z.ringInnerRadius,12151346,.65],[Z.ringOuterRadius,9343886,.85]]){const p=new $(new Pi(m-g,m+g,128),new et({color:_,side:Ht}));p.rotateX(-Math.PI/2),p.position.y=.075,p.name=m===Z.ringInnerRadius?"rust-inner-track-edge":"concrete-outer-track-edge",be.add(p)}const f=(Z.ringInnerRadius+Z.ringOuterRadius)*.5;for(let m=0;m<32;m++){const _=m/32*Math.PI*2,g=new $(new st(.32,.035,4.8),new et({color:13150836}));g.position.set(Math.sin(_)*f,.095,Math.cos(_)*f),g.rotation.y=_,g.name="ring-lane-marker",be.add(g)}await Promise.all([...Z.terrain.map(ya),...Z.track.map(ya),...Z.surfaces.map(Qp)]);for(const m of Z.barriers)Pu(m.x,m.z,m.rotation,m.length,m.boundary);for(let m=0;m<36;m++){const _=m/36*Math.PI*2;Pu(Math.sin(_)*(Tn-2),Math.cos(_)*(Tn-2),_,Math.PI*(Tn-2)/18+.6,!0)}Ko(Z.spawn.x,Z.spawn.z,Z.spawn.heading),Ko(Z.opponentSpawn.x,Z.opponentSpawn.z,Z.opponentSpawn.heading,!0)}async function eb(){if(!Z.bowl)throw new Error("Capsule Circuit layout is missing its surface configuration");const i=Z.bowl,e=new Yt({color:16777215,map:Wi,bumpMap:Wi,bumpScale:.07,vertexColors:!0,roughness:.96,metalness:0,side:Ht}),t=new $(Ew(i),e);t.name="capsule-flat-floor-collider",t.receiveShadow=!0,be.add(t),Li.push(t);const n=new Yt({color:13751247,map:Yo,bumpMap:Yo,bumpScale:.05,vertexColors:!0,roughness:.52,metalness:.64,side:Ht}),s=new $(Tw(i),n);s.name="capsule-continuous-layered-wall-ride-surface",s.receiveShadow=!0,be.add(s),Li.push(s);const r=new $(Aw(i),Tu);r.name="capsule-solid-upper-guard-collider",r.castShadow=!1,r.receiveShadow=!0,be.add(r);const a=new $(t.geometry,new et({color:7536488,wireframe:!0,transparent:!0,opacity:.34,depthTest:!1}));a.name="capsule-flat-floor-collider-debug",a.visible=!1,a.renderOrder=21,be.add(a),kn.push(a);const o=new $(s.geometry,new et({color:5636066,wireframe:!0,transparent:!0,opacity:.56,depthTest:!1}));o.name="capsule-transition-and-bank-collider-debug",o.visible=!1,o.renderOrder=22,be.add(o),kn.push(o);const c=new $(r.geometry,new et({color:16738882,wireframe:!0,transparent:!0,opacity:.72,depthTest:!1}));c.name="capsule-upper-guard-collider-debug",c.visible=!1,c.renderOrder=23,be.add(c),kn.push(c);const l=new $(new Pi(7.2,7.7,48),new et({color:10770997,side:Ht,transparent:!0,opacity:.8}));l.rotateX(-Math.PI/2),l.position.y=.08,l.name="capsule-center-mark",be.add(l);for(let u=-5;u<=5;u++){if(u===0)continue;const h=new $(new st(.28,.035,4.6),new et({color:12163689}));h.position.set(0,.09,u*7.3),h.name="capsule-centerline-marker",be.add(h)}await Promise.all([...Z.terrain.map(ya),...Z.track.map(ya),...Z.surfaces.map(Qp)]);for(const u of Z.barriers)Pu(u.x,u.z,u.rotation,u.length,u.boundary);Ko(Z.spawn.x,Z.spawn.z,Z.spawn.heading),Ko(Z.opponentSpawn.x,Z.opponentSpawn.z,Z.opponentSpawn.heading,!0),L.dataset.capsuleCollision="three-disc-analytic-bands",L.dataset.bowlShape="capsule",L.dataset.bankedWallColliders="3",L.dataset.transitionCollider="continuous",L.dataset.upperGuardCollider="continuous",L.dataset.wallRideSurface="continuous"}async function Qp(i){const{x:e,z:t,rotation:n=0,width:s,length:r}=i,a=e-Math.sin(n)*r*.5,o=t-Math.cos(n)*r*.5,c=e+Math.sin(n)*r*.5,l=t+Math.cos(n)*r*.5,u=St(a,o)+i.startHeight,h=St(c,l)+i.endHeight,d=h-u,f=Math.atan2(d,r),m=new ct,_=new et({color:i.kind==="bridge"?5625797:16753995,wireframe:!0,transparent:!0,opacity:0}),g=new $(new st(s,.32,r),_);g.rotation.x=-f,g.position.y=(u+h)*.5,g.name=`${i.kind}-collider-surface`,g.castShadow=!1,g.receiveShadow=!0,m.add(g),m.position.set(e,0,t),m.rotation.y=n,be.add(m);const p={group:m,deck:g,position:new T(e,u,t),rotation:n,width:s,length:r,baseHeight:u,rise:d,kind:i.kind,label:i.label??i.asset};if(Er.push(p),Li.push(g),i.kind==="bridge")for(const y of[-s*.47,s*.47]){const S=e+Math.cos(n)*y,x=t-Math.sin(n)*y;Nr.push({position:new T(S,0,x),halfWidth:r*.5,halfLength:.35,rotation:n+Math.PI/2,label:"bridge rail"})}try{const y=await wh(i.asset),S=y.userData.sourceSize??new T(2,1,1),x=Math.max(.7,i.kind==="bridge"?Math.max(i.startHeight,i.endHeight):Math.abs(i.endHeight-i.startHeight));y.name=`racekart-hilly-driveable-${i.label??i.asset}`,y.scale.set(r/S.x,x/S.y,s/S.z),y.position.y=Math.min(St(a,o),St(c,l)),y.rotation.y=i.assetYaw??0,m.add(y),m.updateWorldMatrix(!0,!0),Zp(y,{label:p.label,x:e,z:t,rotation:n,width:s*(i.kind==="bridge"?.72:.94),length:r*.995,kind:i.kind,contact:p})}catch(y){dc(xa[i.asset].obj,y)}}function Pu(i,e,t,n,s=!1){const r=Tu.clone();r.color.setHex(s?9080715:9401959);const a=new $(new st(n,1.35,.8),r);a.position.set(i,St(i,e)+.68,e),a.rotation.y=t,a.castShadow=!1,a.receiveShadow=!0,a.material.transparent=!0,a.material.opacity=.12,a.material.depthWrite=!1,be.add(a),wh("fence").then(c=>{const l=c.userData.sourceSize??new T(1,.4,.05);c.name=s?"racekart-hilly-arena-fence":"racekart-hilly-scrap-fence",c.scale.set(n/l.x,(s?2.6:1.8)/l.y,.8/l.z),c.position.set(i,St(i,e),e),c.rotation.y=t,c.traverse(u=>{u instanceof $&&(u.castShadow=!1,u.receiveShadow=!0,u.material=Tu)}),be.add(c)}).catch(c=>dc(xa.fence.obj,c)),Nr.push({position:new T(i,0,e),halfWidth:n*.5,halfLength:.4,rotation:t,label:s?"arena wall":"scrap barrier"});const o=new q_(a,16757575);o.visible=!1,be.add(o),kn.push(o)}async function em(){const i=Z.props.map(e=>{const t=e.scale??10;return(e.asset==="rockWide"||e.asset==="rockTall")&&Ps.push({position:new T(e.x,0,e.z),radius:t*.48,top:St(e.x,e.z)+t,label:"racekart rock"}),e.asset==="hayBale"&&Ps.push({position:new T(e.x,0,e.z),radius:t*.3,top:St(e.x,e.z)+t*.55,label:"hay obstacle"}),ya(e)});await Promise.all(i)}function tb(i,e){for(const t of Er){const n=i-t.position.x,s=e-t.position.z,r=n*Math.cos(t.rotation)-s*Math.sin(t.rotation),a=n*Math.sin(t.rotation)+s*Math.cos(t.rotation),o=-t.length*.5;if(Math.abs(r)<=t.width*.5&&a>=o-Nf&&a<=t.length*.5){const c=Re.clamp((a-o)/t.length,0,1),l=t.baseHeight+c*t.rise+.25;if(a<o){const u=Re.smoothstep(a,o-Nf,o);return{ramp:t,height:Re.lerp(St(i,e),l,u),localZ:a}}return{ramp:t,height:l,localZ:a}}}return null}function jo(i,e){const t=St(i,e);let n=null;for(const s of Ji){const r=Mw(s,i,e);r===null||r<t-.12||(!n||r>n.height)&&(n={ramp:s.metadata,height:r,localZ:0})}return n??tb(i,e)??Qw(i,e)}function Ei(i,e){return jo(i,e)?.height??St(i,e)}function tm(){let i=0,e=0;for(const t of Ji){let n=0,s=0;const r=Math.cos(t.rotation),a=Math.sin(t.rotation);for(let o=0;o<t.rows;o++){const c=-t.length*.5+o/(t.rows-1)*t.length;for(let l=0;l<t.columns;l++){const u=o*t.columns+l;if(!t.valid[u])continue;n++;const h=-t.width*.5+l/(t.columns-1)*t.width,d=t.center.x+h*r+c*a,f=t.center.y-h*a+c*r;s=Math.max(s,t.heights[u]-St(d,f))}}n>0&&i++,s>.35&&e++}L.dataset.heightfieldCoverage=i===Ji.length?"passed":"failed",L.dataset.heightfieldCoverageCount=`${i}/${Ji.length}`,L.dataset.raisedSurfaceColliders=String(e)}function nb(i,e){const t=v.position.x+Math.sin(v.heading)*e,n=v.position.z+Math.cos(v.heading)*e,s=t-i.position.x,r=n-i.position.z,a=Math.cos(i.rotation),o=Math.sin(i.rotation),c=s*a-r*o,l=s*o+r*a,u=Re.clamp(c,-i.halfWidth,i.halfWidth),h=Re.clamp(l,-i.halfLength,i.halfLength);let d=c-u,f=l-h;const m=Math.hypot(d,f);if(m>=On)return!1;let _;if(m<.001){const y=i.halfWidth+On-Math.abs(c),S=i.halfLength+On-Math.abs(l);y<S?(d=Math.sign(c||1),f=0,_=y+.02):(d=0,f=Math.sign(l||1),_=S+.02)}else d/=m,f/=m,_=On-m+.02;const g=d*a+f*o,p=-d*o+f*a;return v.position.x+=g*_,v.position.z+=p*_,!0}function ib(i,e){const t=v.position.x+Math.sin(v.heading)*e,n=v.position.z+Math.cos(v.heading)*e,s=t-i.position.x,r=n-i.position.z,a=Math.hypot(s,r),o=i.radius+On;if(a>=o)return!1;const c=a>.001?s/a:Math.sin(v.heading),l=a>.001?r/a:Math.cos(v.heading),u=o-a+.02;return v.position.x+=c*u,v.position.z+=l*u,!0}function nm(){const i=new et({color:16747834,wireframe:!0,transparent:!0,opacity:.65});for(const e of Ps){const t=St(e.position.x,e.position.z),n=Math.max(.12,e.top-t),s=new $(new Nt(e.radius,e.radius,n,18),i);s.position.set(e.position.x,t+n*.5,e.position.z),s.visible=!1,be.add(s),kn.push(s)}}function im(){if(Z.arenaKind==="capsule"&&Z.bowl){const n=Z.bowl,s=[[0,0],[-20,-24],[20,-24],[-20,24],[20,24],[0,-38],[0,38]],r=s.every(([c,l])=>Vt(n,c,l).progress===0),o=[[n.flatRadius+7,0],[-(n.flatRadius+7),0],[0,n.straightHalfLength+n.flatRadius+7],[0,-(n.straightHalfLength+n.flatRadius+7)]].every(([c,l])=>{const u=Vt(n,c,l);return u.progress>.25&&u.progress<.75&&u.height>2});L.dataset.ringSampleCount=String(s.length),L.dataset.ringClearSamples=String(s.length),L.dataset.ringTrackDrivable=o?"passed":"failed",L.dataset.centralCombatArea=r?"passed":"failed",L.dataset.targetArea=Z.targets.length>=3&&Z.targets.length<=5?"passed":"failed",L.dataset.futureSpawnSides=Z.spawn.z*Z.opponentSpawn.z<0?"passed":"failed",L.dataset.ovalBoundary="enclosed",L.dataset.wallSeam=Vt(n,n.flatRadius+.05,0).height<.01?"smooth":"failed";return}const i=(Z.ringInnerRadius+Z.ringOuterRadius)*.5,e=72;let t=0;for(let n=0;n<e;n++){const s=n/e*Math.PI*2,r=Math.sin(s)*i,a=Math.cos(s)*i,o=Ps.some(l=>Math.hypot(r-l.position.x,a-l.position.z)<l.radius+2.2),c=Nr.some(l=>{if(l.label==="arena wall")return!1;const u=r-l.position.x,h=a-l.position.z,d=Math.cos(l.rotation),f=Math.sin(l.rotation),m=u*d-h*f,_=u*f+h*d;return Math.abs(m)<l.halfWidth+2.2&&Math.abs(_)<l.halfLength+2.2});!o&&!c&&Math.abs(St(r,a))<.1&&t++}L.dataset.ringSampleCount=String(e),L.dataset.ringClearSamples=String(t),L.dataset.ringTrackDrivable=t===e?"passed":"failed",L.dataset.centralCombatArea=Z.ringInnerRadius>=50?"passed":"failed",L.dataset.targetArea=Z.targets.length>=3?"passed":"failed",L.dataset.futureSpawnSides=Z.spawn.z*Z.opponentSpawn.z<0?"passed":"failed"}const en=new ct,Ot=new ct,lr=[],$o=[],ur=new ct,La={mg:{kind:"mg",label:"SCRAP RATTLER",stateLabel:"READY",fireRate:6.7,damage:15,projectileSpeed:58,range:136,automatic:!0,impactColor:16758088},rocket:{kind:"rocket",label:"HELLBOX ROCKETS",stateLabel:"ARMED",fireRate:.78,damage:82,projectileSpeed:34,range:112,automatic:!1,impactColor:16735008,splashRadius:5.4},sniper:{kind:"sniper",label:"LONGLANCE RAIL",stateLabel:"CHARGED",fireRate:.58,damage:110,projectileSpeed:320,range:188,automatic:!1,impactColor:6809599}},sm=new Map;let Et=He?.activeTurret??"mg",Lu=new ct,rm=new vt,Jr,Uf=-1/0,am=null,Ff=null,ml=0,Iu=null,Du=null;function gl(i,e=.4){for(const t of[-1,1]){const n=new $(new Nt(.09,.13,.68,8),Kn);n.position.set(t*e,.12,.02),n.rotation.z=t*.42,n.castShadow=!0,i.add(n)}}function sb(i){const e=new ct;e.name=`turret-${i}`;const t=new ct;let n=new vt;if(i==="mg"){const s=new $(new Rr(.48,0),pn);s.scale.set(1,.7,1.28),s.position.set(0,.28,.1),s.castShadow=!0,e.add(s);const r=new $(new st(.82,.42,.5),Kn);r.position.set(0,.18,-.52),r.rotation.x=.08,r.castShadow=!0,e.add(r),gl(e);const a=new $(new st(1.24,.72,.12),cr);a.position.set(0,.24,.43),a.rotation.x=-.12,a.castShadow=!0,e.add(a),t.position.set(0,.34,.35),e.add(t);const o=new $(new Nt(.17,.2,.72,10),pn);o.rotation.x=Math.PI/2,o.position.z=.34,o.castShadow=!0,t.add(o);const c=new $(new Nt(.075,.095,1.82,10),Kn);c.rotation.x=Math.PI/2,c.position.z=1.53,c.castShadow=!0,t.add(c);const l=new $(new Nt(.15,.15,.34,10),pn);l.rotation.x=Math.PI/2,l.position.z=2.45,l.castShadow=!0,t.add(l);const u=new $(new Pi(.055,.13,10),new et({color:16747317}));u.position.z=2.63,t.add(u),n.position.z=2.66,t.add(n)}else if(i==="rocket"){const s=new $(new st(1.34,.58,1.18),pn);s.position.set(0,.28,-.05),s.rotation.x=-.05,s.castShadow=!0,e.add(s);const r=new $(new st(1.58,.72,.12),cr);r.position.set(0,.28,.54),r.rotation.x=-.13,r.castShadow=!0,e.add(r),gl(e,.5),t.position.set(0,.48,.18),e.add(t);const a=new $(new st(1.28,.9,1.72),pn);a.position.z=.62,a.castShadow=!0,t.add(a);for(const c of[-.34,.34])for(const l of[-.23,.23]){const u=new $(new Nt(.19,.23,1.92,10),pn);u.rotation.x=Math.PI/2,u.position.set(c,l,.72),u.castShadow=!0,t.add(u);const h=new $(new sc(.205,.045,7,12),cr);h.position.set(c,l,1.69),t.add(h);const d=new $(new yr(.14,10),new et({color:16738852}));d.position.set(c,l,1.7),t.add(d)}const o=new $(new st(.86,.08,.04),new et({color:16758077}));o.position.set(0,.48,1.5),t.add(o),n.position.z=1.86,t.add(n)}else{const s=new $(new st(1.12,.52,1.48),pn);s.position.set(0,.29,.15),s.castShadow=!0,e.add(s);const r=new $(new st(.82,.46,.72),Kn);r.position.set(0,.25,-.75),r.castShadow=!0,e.add(r),gl(e,.43),t.position.set(0,.43,.36),e.add(t);for(const u of[-.25,.25]){const h=new $(new st(.12,.12,3.18),Kn);h.position.set(u,0,1.52),h.castShadow=!0,t.add(h)}const a=new $(new Nt(.085,.12,3.5,10),pn);a.rotation.x=Math.PI/2,a.position.z=1.72,a.castShadow=!0,t.add(a);const o=new $(new st(.68,.34,.48),pn);o.position.z=3.45,o.castShadow=!0,t.add(o);for(const u of[-.27,.27]){const h=new $(new st(.13,.13,.62),new et({color:5824504}));h.position.set(u,0,3.47),t.add(h)}const c=new $(new st(.32,.26,.7),Kn);c.position.set(0,.39,.45),t.add(c);const l=new $(new yr(.12,12),new et({color:9171967}));l.position.set(0,.39,.81),t.add(l),n.position.z=3.76,t.add(n)}return e.visible=i===Et,{root:e,barrelPivot:t,muzzle:n}}function ts(i,e=!0){if(He&&!He.ownedTurrets.includes(i)){e&&Jt("TURRET SLOT LOCKED // EARN IT AFTER ROUND 3");return}const t=performance.now()/1e3;if(e&&He&&t-Uf<He.swapCooldown)return;Uf=t,Et=i,He&&(He.activeTurret=i,Ca());const n=La[i];um(),Ma=0,rn(!1);for(const[s,r]of sm)r.root.visible=s===i,s===i&&(Lu=r.barrelPivot,rm=r.muzzle);K.weapon.textContent=n.label,K.weaponState.textContent=n.stateLabel,Ih(),L.dataset.selectedTurret=i,L.dataset.weaponVfx=i==="rocket"?"large-world-detonation":i==="sniper"?"tight-cyan-laser-tracer":"scrap-sparks",e&&xn&&Jt(`${n.label} // ACTIVE TURRET`)}function rb(i){return!!(i&&i in ss)}function om(i){const e=ss[i].turretHeight;Iu&&(Iu.position.y=e-.16),Du&&(Du.position.y=e-.04),ur.position.y=e}async function cm(i){const e=ss[i],t=++ml;L.dataset.vehicleAsset=`loading-kenney-${i}`,om(i);try{const n=await qw(e.model);if(t!==ml)return;n.name=`kenney-car-kit-${i}`,n.scale.setScalar(1.84),n.position.y=.06;const s=new ve(14200973);n.traverse(r=>{if(!(r instanceof $))return;r.castShadow=!0;const o=(Array.isArray(r.material)?r.material:[r.material]).map(c=>{const l=c.clone();return l instanceof Yt&&(l.color.multiply(s),l.roughness=.78,l.metalness=.2,l.envMapIntensity=.55),l});r.material=Array.isArray(r.material)?o:o[0]}),Ff?.removeFromParent(),am?.removeFromParent(),lr.length=0,$o.length=0;for(const r of kp.vehicle.wheelNodes){const a=n.getObjectByName(r);a&&(lr.push(a),r.includes("front")&&$o.push(a))}en.add(n),Ff=n,va=i,L.dataset.vehicleAsset=`kenney-car-kit-${i}`,L.dataset.vehicleWheels=String(lr.length),L.dataset.selectedVehicle=i,hm()}catch(n){if(t!==ml)return;L.dataset.vehicleAsset="fallback-low-poly",dc(e.model,n)}}function ab(){const i=new ct;i.name="vehicle-fallback";const e=new $(new st(2.7,.65,4.55),cr);e.position.y=1.05,e.castShadow=e.receiveShadow=!0,i.add(e);const t=new $(new Rr(1.18,0),pn);t.scale.set(1,.66,1.05),t.position.set(0,1.72,-.32),t.castShadow=!0,i.add(t);for(const r of[-1.45,1.45])for(const a of[-1.45,1.45]){const o=new ct;o.position.set(r,.72,a),i.add(o);const c=new $(new Nt(.57,.57,.42,14),jp);c.rotation.z=Math.PI/2,c.castShadow=!0,o.add(c),lr.push(c),a>0&&$o.push(o);const l=new $(new Nt(.22,.22,.45,10),Kn);l.rotation.z=Math.PI/2,c.add(l)}en.add(i),am=i,cm(va);const n=new $(new Nt(.62,.76,.22,12),Kn);Iu=n,n.castShadow=!0,en.add(n);const s=new $(new sc(.62,.08,8,16),pn);Du=s,s.rotation.x=Math.PI/2,s.castShadow=!0,en.add(s),en.add(ur),om(va);for(const r of["mg","rocket","sniper"]){const a=sb(r);sm.set(r,a),ur.add(a.root)}ts(Et,!1),Jr=new $(new st(On*2,Zw,(Un+On)*2),new et({color:5046256,wireframe:!0,transparent:!0,opacity:.8})),Jr.position.y=.52,Jr.visible=!1,en.add(Jr),en.position.set(0,St(0,-28),-28),be.add(en)}function ob(){Ot.name="rival-ai-combat-car";const i=new Yt({color:6501275,map:Cs,roughness:.68,metalness:.5}),e=new $(new st(2.75,.72,4.45),i);e.position.y=1.02,e.castShadow=!0,Ot.add(e);const t=new $(new Rr(1.15,0),pn.clone());t.scale.set(1,.66,1.05),t.position.set(0,1.68,-.28),t.castShadow=!0,Ot.add(t);for(const o of[-1.43,1.43])for(const c of[-1.42,1.42]){const l=new $(new Nt(.56,.56,.42,14),jp);l.rotation.z=Math.PI/2,l.position.set(o,.7,c),l.castShadow=!0,Ot.add(l)}const n=new $(new Nt(.58,.72,.24,12),i);n.position.y=2.32,Ot.add(n);const s=new ct;s.name="rival-tracking-turret",s.position.y=2.5,Ot.add(s);const r=new $(new st(.82,.48,1.05),pn);r.position.y=.18,s.add(r);for(const o of[-.18,.18]){const c=new $(new Nt(.065,.08,1.72,9),Kn);c.rotation.x=Math.PI/2,c.position.set(o,.18,1.16),s.add(c)}const a=new $(new Ns(.1,10,7),new et({color:14249215}));a.position.set(0,.38,.52),s.add(a),Ot.userData.turret=s,be.add(Ot),Li.push(Ot)}const lm={maxHealth:100,acceleration:16.5,maxSpeed:27,handling:1.62,traction:7.4,boostPower:1.3,armor:0,ramPower:1,stability:1,weaponDamage:15,fireRate:6.7,projectileSpeed:58},nt={...lm},mn={fireRate:nt.fireRate,damage:nt.weaponDamage,projectileSpeed:nt.projectileSpeed,range:136,automatic:!1};function um(){const i=La[Et],e=He?.turretStats[Et];mn.fireRate=i.fireRate*(e?.fireRateMultiplier??1),mn.damage=i.damage*(e?.damageMultiplier??1),mn.projectileSpeed=i.projectileSpeed*(e?.projectileSpeedMultiplier??1),mn.range=i.range*(e?.rangeMultiplier??1),mn.automatic=i.automatic,L.dataset.weaponDamage=mn.damage.toFixed(2),L.dataset.weaponFireRate=mn.fireRate.toFixed(2),L.dataset.weaponProjectileCount=String(e?.projectileCount??1)}function hm(){const i=He?.tireVisual??"stock",e=i==="racing"?1514530:i==="offroad"?2696216:i==="heavy"?526602:1052945,t=i==="racing"?new T(.92,1,.9):i==="offroad"?new T(1.16,1.12,1.16):i==="heavy"?new T(1.13,1.28,1.13):new T(1,1,1);lr.forEach(n=>{n.scale.copy(t),n.traverse(s=>{if(!(s instanceof $))return;const r=Array.isArray(s.material)?s.material:[s.material];for(const a of r)a instanceof Yt&&a.color.r<.35&&a.color.g<.35&&a.color.b<.35&&a.color.setHex(e)})}),L.dataset.tireVisual=i}function Io(){Object.assign(nt,lm);const i=He?.vehicleStats;i&&(nt.maxHealth*=i.maxHealthMultiplier,nt.acceleration*=i.accelerationMultiplier,nt.maxSpeed*=i.maxSpeedMultiplier,nt.handling*=i.handlingMultiplier,nt.traction*=i.tractionMultiplier,nt.boostPower=(nt.boostPower??1.3)*i.boostMultiplier,nt.armor=Math.min(.72,(nt.armor??0)+i.armorBonus),nt.ramPower=i.ramMultiplier,nt.stability=i.stabilityMultiplier),um(),hm(),L.dataset.vehicleUpgradeStats=`hp:${nt.maxHealth.toFixed(0)},accel:${nt.acceleration.toFixed(1)},speed:${nt.maxSpeed.toFixed(1)},handling:${nt.handling.toFixed(2)},traction:${nt.traction.toFixed(2)}`}const v={position:new T(0,0,-28),heading:0,speed:0,driftAngle:0,verticalVelocity:0,pitch:0,roll:0,grounded:!0,activeRamp:null,health:100,shield:0,boost:100,collisionCooldown:0,orientation:new Hn,surfaceNormal:new T(0,1,0),projectedForward:new T(0,0,1),velocity:new T,wallContactNormal:new T,wallAssistActive:!1,downforce:0},ne={position:new T,heading:Math.PI,speed:0,health:140,maxHealth:140,fireCooldown:1.4,steerBias:1,collisionCooldown:0,burnTime:0,burnDps:0,burnFxCooldown:0},Is=[];function dm(i,e,t){const n=new ct,s=new $(new Nt(.75,.9,.35,10),pn);s.position.y=.18,s.castShadow=!0,n.add(s);const r=new $(new st(.3,1.8,.3),Kn);r.position.y=1.2,r.castShadow=!0,n.add(r);const a=new $(new Nt(.62,.78,1.35,8),new Yt({color:9518119,roughness:.7,metalness:.45,emissive:0}));a.position.y=1.55,a.castShadow=!0,a.name="target-body",n.add(a);const o=new $(new Ns(.13,10,8),new et({color:16757830}));o.position.set(0,1.72,.65),n.add(o);for(const c of[-1,1]){const l=new $(new st(.8,.16,.16),Kn);l.position.set(c*.78,1.7,0),l.rotation.z=c*.25,n.add(l)}n.position.set(i,St(i,e),e),n.rotation.y=t,be.add(n),Is.push({group:n,health:55,alive:!0,hitFlash:0})}const Ri=[],ii=[],Ii=[];let fm=1;const cb=new et({color:12683865,transparent:!0,opacity:.35,depthWrite:!1}),pm=new st(.09,.09,.72),lb=new Ns(.3,6,4),ub=new Rr(.14,0),mm=new Pi(.48,.68,28),Eh=new ah(.55,1),gm=new Ns(.18,7,5),hb=new st(.13,3.25,.04),db=new st(.025,.86,.025),fb=new Nt(.2,.2,1,8,1,!0),pb=new Nt(.055,.055,1,8),mb=new Nt(.018,.018,1,6),gb=new yr(.15,7),Ss=new hh(16747044,0,5,2);be.add(Ss);let Ma=0,_m=!1,Do=0,No=0,hr=0,dr=0,Nu=0,Ti=!1,Tr=0;const Qi=new URLSearchParams(location.search).get("physics-smoke")==="ramp",fr=new URLSearchParams(location.search).get("physics-smoke")==="all-surfaces",sa=new URLSearchParams(location.search).get("physics-smoke")==="wall",ra=new URLSearchParams(location.search).get("input-smoke")==="hold-fire",Zo=new URLSearchParams(location.search).get("input-smoke")==="boost",Th=new URLSearchParams(location.search).get("combat-smoke")==="round-win",Ah=uc.get("ui-preview")==="vehicles",bn=new Audio("./assets/nitro-games.wav");bn.loop=!0;bn.volume=.12;bn.preload="auto";bn.id="soundtrack";bn.hidden=!0;bn.dataset.playback="waiting-for-interaction";const Gt=new Audio("./assets/audio/sfx/vehicle-engine-loop.wav");Gt.loop=!0;Gt.volume=.001;Gt.playbackRate=.68;Gt.preservesPitch=!1;Gt.preload="auto";Gt.id="vehicle-engine-loop";Gt.hidden=!0;Gt.dataset.playback="waiting-for-interaction";document.body.append(bn,Gt);const _b={"turret-mg":"./assets/audio/sfx/turret-mg-fire.wav","turret-rocket":"./assets/audio/sfx/turret-rocket-fire.ogg","turret-sniper":"./assets/audio/sfx/turret-sniper-fire.ogg","vehicle-hit":"./assets/audio/sfx/vehicle-hit-clank.ogg","confirmed-hit":"./assets/audio/sfx/confirmed-hit-clank.ogg"},xm=new Map,_l=new Set,vm=new Map,ym=new Map;let ti=null,Uu=null,Of=!1;const xb=uc.get("audio-smoke")==="fail";for(const[i,e]of Object.entries(_b)){const t=new Audio(e);t.preload="auto",t.load(),xm.set(i,t),ym.set(i,fetch(e).then(n=>n.arrayBuffer()))}bn.load();Gt.load();const xl=new T,Bf=new T;function bs(i,e,t=.035,n){const s=vm.get(i);if(ti&&s){const o=ti.createBufferSource(),c=ti.createGain(),l=ti.createStereoPanner();o.buffer=s,o.playbackRate.value=1+(Math.random()*2-1)*t;const u=n??v.position;xl.copy(u).sub(Rn.position);const h=xl.length();Bf.set(1,0,0).applyQuaternion(Rn.quaternion);const d=h>.001?xl.dot(Bf)/h:0,f=1/(1+Math.max(0,h-7)/28);c.gain.value=Re.clamp(e*f,0,1),l.pan.value=Re.clamp(d,-1,1),o.connect(c).connect(l).connect(ti.destination),o.onended=()=>{o.disconnect(),c.disconnect(),l.disconnect()},o.start(),L.dataset.lastSfx=i,L.dataset.spatialAudio="stereo-world-positioned";return}const r=xm.get(i);if(!r)return;const a=r.cloneNode(!0);a.volume=Re.clamp(e,0,1),a.preservesPitch=!1,a.playbackRate=1+(Math.random()*2-1)*t,_l.add(a),a.addEventListener("ended",()=>_l.delete(a),{once:!0}),a.play().catch(()=>_l.delete(a)),L.dataset.lastSfx=i}function Ia(){ti||(ti=new AudioContext,Uu=Promise.all([...ym].map(([i,e])=>e.then(t=>ti.decodeAudioData(t.slice(0))).then(t=>vm.set(i,t)).catch(()=>{}))).then(()=>{L.dataset.combatAudio="decoded"})),ti.state==="suspended"&&ti.resume(),bn.paused&&(bn.dataset.playback="starting",bn.play().then(()=>{bn.dataset.playback="playing"}).catch(()=>{bn.dataset.playback="blocked"})),Gt.paused&&(Gt.dataset.playback="starting",Gt.play().then(()=>{Gt.dataset.playback="playing"}).catch(()=>{Gt.dataset.playback="blocked"})),L.dataset.musicContinuity="single-document-loop"}let vl=0;function vb(i){const e=Re.clamp(Math.abs(v.speed)/Math.max(1,nt.maxSpeed),0,1.25),t=it.has("KeyW")||it.has("KeyS"),n=it.has("ShiftLeft")&&v.boost>0,r=xn&&!Ti&&v.health>0?.055+e*.16+(t?.025:0):0,a=.68+e*.82+(n?.12:0);vl=Re.damp(vl,r,6,i),Gt.volume=Re.clamp(vl,0,.26),Gt.playbackRate=Re.damp(Gt.playbackRate,a,7,i),L.dataset.engineVolume=Gt.volume.toFixed(3),L.dataset.enginePlaybackRate=Gt.playbackRate.toFixed(2)}function yb(i){if(!Of)try{if(vb(i),xb)throw new Error("Simulated audio-frame failure");L.dataset.audioFrame="active"}catch(e){Of=!0,L.dataset.audioFrame="disabled",console.warn("[Rigged] Audio frame updates disabled; gameplay will continue.",e)}}const it=new Set,Fu=new ue(0,.15),sn=new T,yl=new Pp,kf=new zi(new T(0,1,0),0),Mm=new T(0,0,1);let pc=!1;const Es=new ct,Sm=new et({color:16762972,transparent:!0,opacity:.92,depthTest:!1}),wm=new $(new Pi(.65,.82,24),Sm);wm.rotation.x=-Math.PI/2;Es.add(wm);for(const i of[0,Math.PI/2]){const e=new $(new st(2.25,.025,.08),Sm);e.rotation.y=i,e.position.y=.015,Es.add(e)}Es.renderOrder=10;be.add(Es);const _i=new T,xo=new T,bm=new T(0,0,1);function Mb(i=10,e=1.35,t=.34){const n=new Mp;for(let s=0;s<i*2;s++){const r=s/(i*2)*Math.PI*2-Math.PI/2,a=s%2===0?e:t,o=Math.cos(r)*a,c=Math.sin(r)*a;s===0?n.moveTo(o,c):n.lineTo(o,c)}return n.closePath(),new oh(n)}const Em=Mb(),Ou=new T,Tm=new T(0,1,0),Jo=[],Am=()=>new et({transparent:!0,depthWrite:!1,side:Ht,blending:pr});function Wt(i,e=1){const t=Jo.pop()??Am();return t.color.setHex(i),t.opacity=e,t.visible=!0,t.userData.baseOpacity=e,t}function Rm(i){i instanceof et&&i.transparent&&i.blending===pr?(i.opacity=0,Jo.push(i)):i.dispose()}function Da(i){const e=[],t=[];i.group.traverse(n=>{n instanceof $?e.push(n):n instanceof hh&&t.push(n)}),Ii.push({...i,meshes:e,lights:t})}function Rh(i){const e=Ii[i];be.remove(e.group);for(const t of e.meshes){const n=Array.isArray(t.material)?t.material:[t.material];for(const s of n)Rm(s)}Ii.splice(i,1)}function Sa(i,e,t=!0){const n=La[i],s=new ct;s.position.copy(e),s.userData.billboard=!0;const r=i==="rocket",a=t&&r?1.8:t?1:.28,o=new $(Eh,Wt(r?16758063:16766575,.95));o.scale.setScalar(a),s.add(o);const c=new $(Em,Wt(n.impactColor,i==="mg"?.72:.96));c.scale.setScalar(t?1.24:.26),s.add(c),t&&r&&c.scale.setScalar(2.15);const l=t&&r?5:1;for(let h=0;h<l;h++){const d=new $(mm,Wt(h===0?16777215:n.impactColor,.9-h*.18));d.scale.setScalar((t?1.1:.2)+h*.46),d.position.z=-.03-h*.015,s.add(d)}if(t&&r){for(let d=0;d<20;d++){const f=new $(hb,Wt(d%3?n.impactColor:16777215,.88)),m=d/20*Math.PI*2;f.rotation.z=m,f.position.set(Math.cos(m)*2.1,Math.sin(m)*2.1,-.06),s.add(f)}hr=.38,dr=.62,L.dataset.lastImpactEffect="rocket-world-detonation"}const u=t&&r?.82:t?.3:.13;be.add(s),Da({group:s,life:u,maxLife:u,kind:"impact",growth:t&&r?7.2:t?2.2:1.3})}function Sb(i){const e=new ct;e.position.copy(i),e.userData.billboard=!0;const t=new $(Eh,Wt(16777215,.96));t.scale.setScalar(.22),e.add(t);for(let n=0;n<8;n++){const s=n/8*Math.PI*2,r=new $(db,Wt(n%2?6153727:16777215,.9));r.rotation.z=s,r.position.set(Math.cos(s)*.38,Math.sin(s)*.38,0),e.add(r)}be.add(e),Da({group:e,life:.16,maxLife:.16,kind:"impact",growth:.5}),hr=.055,dr=.08,L.dataset.lastImpactEffect="sniper-pinpoint-spark"}function wb(i,e,t){const n=Math.min(t,Math.max(18,i.distanceTo(sn)+8)),s=new ct;Ou.copy(i).addScaledVector(e,n*.5),s.position.copy(Ou),s.quaternion.setFromUnitVectors(Tm,e);const r=new $(fb,Wt(3657727,.34));r.scale.y=n,s.add(r);const a=new $(pb,Wt(15334911,1));a.scale.y=n,s.add(a);const o=new $(mb,Wt(16777215,1));o.scale.y=n,s.add(o),be.add(s),Da({group:s,life:.48,maxLife:.48,kind:"laser",growth:0}),L.dataset.sniperTracerLength=n.toFixed(1)}function bb(i,e){const t=new ct;t.position.copy(i).add(new T((Math.random()-.5)*.12,(Math.random()-.5)*.12,(Math.random()-.5)*.12));const n=new $(gm,Wt(Math.random()>.45?16742947:16767066,.72));t.add(n),be.add(t),Da({group:t,life:.28,maxLife:.28,kind:"trail",growth:2.2,sourceId:e})}function Cm(i){for(let e=Ii.length-1;e>=0;e--){const t=Ii[e];t.kind!=="trail"||t.sourceId!==i||Rh(e)}L.dataset.rocketTrailCleanup="detonation-synced"}const Uo={standard:new et({color:16764762}),incendiary:new et({color:16730904}),piercing:new et({color:15334399})},Eb=new st(.06,.06,9),Tb=new st(.24,.24,8.2),zf={standard:new et({color:16777215}),incendiary:new et({color:16747061})},Ml={standard:Wt(5627135,.58),incendiary:Wt(16726804,.58),piercing:Wt(13236479,.58)},Ab=new Nt(.12,.15,.78,9),Rb=new Yt({color:3421747,roughness:.55,metalness:.7}),Cb=new Ta(.15,.34,9),Pb=new st(.38,.04,.32),Lb=new Ta(.18,.85,9),Hf={standard:Wt(16747304,.92),incendiary:Wt(16723984,.92)},aa=[];function Ib(i,e){const t=aa.pop()??new $(pm,i);return t.material=i,t.scale.setScalar(e),t.visible=!0,t}function Ch(i,e){i.removeFromParent(),e==="mg"&&i instanceof $&&(i.visible=!1,i.position.set(0,0,0),i.quaternion.identity(),aa.push(i))}function Ph(i,e=!1,t=!1,n=!1){if(i==="mg"){const c=e?Uo.incendiary:t?Uo.piercing:Uo.standard;return Ib(c,n?1.75:t?1.25:1)}if(i==="sniper"){const c=new ct,l=new $(Eb,e?zf.incendiary:zf.standard);c.add(l);const u=e?Ml.incendiary:t?Ml.piercing:Ml.standard,h=new $(Tb,u);return c.add(h),c.scale.setScalar(n?1.55:1),c}const s=new ct,r=new $(Ab,Rb);r.rotation.x=Math.PI/2,s.add(r);const a=new $(Cb,cr);a.rotation.x=Math.PI/2,a.position.z=.55,s.add(a);for(const c of[-1,1]){const l=new $(Pb,cr);l.position.set(c*.14,0,-.28),l.rotation.z=c*.42,s.add(l)}const o=new $(Lb,e?Hf.incendiary:Hf.standard);return o.rotation.x=-Math.PI/2,o.position.z=-.78,s.add(o),s}let vo=null;function Db(){return vo||(vo=(async()=>{const i=new ct;for(i.name="offscreen-combat-resource-warmup",i.position.set(0,-500,0);aa.length<32;)aa.push(new $(pm,Uo.standard));for(;Jo.length<48;)Jo.push(Am());const e=[["mg",!1,!1,!1],["mg",!0,!1,!1],["mg",!1,!0,!0],["rocket",!1,!1,!1],["rocket",!0,!1,!0],["sniper",!1,!1,!1],["sniper",!0,!0,!0]],t=[];e.forEach(([s,r,a,o],c)=>{const l=Ph(s,r,a,o);l.position.x=c*2,i.add(l),t.push(l)});const n=[Wt(16758063,.95),Wt(16735008,.92),Wt(6809599,.9),Wt(16730904,.8)];i.add(new $(Eh,n[0]),new $(Em,n[1]),new $(mm,n[2]),new $(gm,n[3])),be.add(i);try{await _n.compileAsync(be,Rn),Uu&&await Uu,L.dataset.combatPrewarm="complete"}catch(s){L.dataset.combatPrewarm="partial",console.warn("[Rigged] Combat pre-warm completed with a fallback.",s)}finally{be.remove(i),t.forEach((s,r)=>Ch(s,e[r][0])),n.forEach(Rm),L.dataset.projectilePool=String(aa.length)}})(),vo)}function Pm(i){const e=new ct;e.position.copy(i).add(new T((Math.random()-.5)*1.4,.7+Math.random()*1.2,(Math.random()-.5)*1.4)),e.userData.billboard=!0;const t=new $(gb,Wt(Math.random()>.35?16730396:16760133,.9));t.scale.setScalar(.73+Math.random()*.6),e.add(t),be.add(e),Da({group:e,life:.45,maxLife:.45,kind:"trail",growth:1.7}),L.dataset.burnVfx="ember-active"}function Lm(){if(Ti||gt!=="active"||v.health<=0||!pc||Ma>0||Ri.length>=120)return!1;const i=La[Et],e=He?.turretStats[Et];Ma=1/mn.fireRate,rm.getWorldPosition(_i),xo.copy(sn).sub(_i).normalize(),Mm.copy(xo);const t=e?.projectileCount??1,n=e?.spread??0;for(let s=0;s<t;s++){const r=t===1?0:s/(t-1)-.5,a=r*n+(Math.random()-.5)*n*.12,o=xo.clone().applyAxisAngle(Tm,a).normalize(),c=Ph(Et,(e?.burnDps??0)>0,(e?.pierces??0)>0,e?.heavyRounds??!1);c.position.copy(_i),c.quaternion.setFromUnitVectors(bm,o),be.add(c),Ri.push({id:fm++,mesh:c,velocity:o.multiplyScalar(mn.projectileSpeed),life:mn.range/mn.projectileSpeed,kind:Et,owner:"player",damage:mn.damage,splashRadius:i.splashRadius??0,trailTimer:0,ricochetsRemaining:e?.ricochets??0,piercesRemaining:e?.pierces??0,burnDps:e?.burnDps??0,burnDuration:e?.burnDuration??0,hitOpponent:!1,hitTargets:new Set})}return L.dataset.shotsFired=String(Number(L.dataset.shotsFired??0)+t),K.weaponState.textContent="FIRING",No=.08,Ss.color.setHex(i.impactColor),Ss.intensity=Et==="rocket"?22:Et==="sniper"?28:8,Ss.distance=Et==="rocket"?10:7,Ss.position.copy(_i),Do=Et==="mg"?.045:.09,Et==="mg"?bs("turret-mg",.1,.025,_i):Et==="rocket"?bs("turret-rocket",.44,.025,_i):bs("turret-sniper",.38,.018,_i),Et==="sniper"?wb(_i,xo,mn.range):Sa(Et,_i,!1),!0}const Qs=new T,Sl=new T;function Nb(){if(gt!=="active"||ne.health<=0||v.health<=0)return;Qs.copy(ne.position),Qs.y+=2.72,Sl.copy(v.position).add(Ou.set((Math.random()-.5)*1.2,1.05+(Math.random()-.5)*.45,(Math.random()-.5)*1.2)).sub(Qs).normalize();const i=Ph("mg");i.position.copy(Qs),i.quaternion.setFromUnitVectors(bm,Sl),be.add(i),Ri.push({id:fm++,mesh:i,velocity:Sl.clone().multiplyScalar(48),life:2.3,kind:"mg",owner:"opponent",damage:8,splashRadius:0,trailTimer:0,ricochetsRemaining:0,piercesRemaining:0,burnDps:0,burnDuration:0,hitOpponent:!1,hitTargets:new Set}),bs("turret-mg",.075,.045,Qs),Sa("mg",Qs,!1),L.dataset.aiShotsFired=String(Number(L.dataset.aiShotsFired??0)+1)}function rn(i){_m=i,L.dataset.fireHeld=String(i),i&&Lm()}function Im(i){Ma=Math.max(0,Ma-i),No=Math.max(0,No-i),Do=Math.max(0,Do-i),No===0&&K.weaponState.textContent==="FIRING"&&(K.weaponState.textContent=La[Et].stateLabel),Do===0&&(Ss.intensity=0),_m&&Lm()}const Dm=48;function Ub(i){if(ii.length>=Dm||Math.abs(v.speed)<3||Math.random()>i*Math.min(Math.abs(v.speed),20)*1.15)return;const e=new T(-Math.sin(v.heading)*2,0,-Math.cos(v.heading)*2),t=new $(lb,cb.clone());t.scale.setScalar(.6+Math.random()*.7),t.position.copy(v.position).add(e).add(new T((Math.random()-.5)*1.8,.25,(Math.random()-.5)*.8)),be.add(t),ii.push({mesh:t,life:.7+Math.random()*.5,velocity:new T((Math.random()-.5)*.5,.45+Math.random()*.3,(Math.random()-.5)*.5)})}function Lh(i,e=1.4,t=12){for(let n=0;n<Math.min(t,Dm-ii.length);n++){const s=new $(ub,new et({color:n%3===0?16761678:12077609}));s.scale.setScalar(.6+Math.random()),s.position.copy(i).add(new T(0,e,0)),be.add(s),ii.push({mesh:s,life:.7+Math.random()*.8,velocity:new T((Math.random()-.5)*7,2+Math.random()*5,(Math.random()-.5)*7)})}}function Bu(i,e){if(i.alive&&(i.health-=e,i.hitFlash=.09,Fb(),i.health<=0)){i.alive=!1,Lh(i.group.position),be.remove(i.group);const t=Is.filter(n=>n.alive).length;L.dataset.targetsRemaining=String(t),Jt(t?`TARGET SCRAPPED // ${t} REMAIN`:"TARGET LANE CLEARED // FIND THE RIVAL")}}let Vf=-1/0;function Fb(){const i=performance.now();i-Vf<70||(Vf=i,bs("confirmed-hit",.23,.02))}function Jt(i){K.message.textContent=i,K.message.classList.add("show"),clearTimeout(Nu),Nu=window.setTimeout(()=>K.message.classList.remove("show"),1900)}const Nm={mg:"SCRAP RATTLER",rocket:"HELLBOX",sniper:"LONGLANCE"};function Ih(){document.querySelectorAll("[data-weapon]").forEach(t=>{const n=t.dataset.weapon,s=!!He?.ownedTurrets.includes(n),r=s&&Et===n;t.classList.toggle("owned",s),t.classList.toggle("selected",r),t.disabled=!s,t.setAttribute("aria-pressed",String(r));const a=t.querySelector("small");a&&(a.textContent=r?"ACTIVE":s?"OWNED":`LOCKED // ROUND ${Math.max(3,Math.ceil(qt/3)*3)}`)});const i=new Map(Vo.map(t=>[t.id,t.name])),e=(He?.upgrades??[]).map(t=>i.get(t)??(t.startsWith("add-")?`Added ${Nm[t.slice(4)]??"Turret"}`:t.startsWith("mastery-")?"Turret Mastery":t));K.activeUpgrades.replaceChildren(...(e.length?e.slice(-7):["No cards installed"]).map(t=>{const n=document.createElement("li");return n.textContent=t,n})),L.dataset.ownedTurrets=He?.ownedTurrets.join(",")??"none",L.dataset.activeUpgrades=He?.upgrades.join(",")??"none"}function Dh(){if(!at||at.phase!=="starter_draft")return;gt="starter_turret_select",K.starterSelect.hidden=!1,K.vehicleSelect.hidden=!0,K.cardDraft.hidden=!0,K.countdown.hidden=!0,K.weaponSelect.classList.add("draft-open"),L.dataset.roundPhase=gt,L.dataset.starterSelection="visible",Ih();const i=Dr(at).find(t=>t.id===at?.activePickerId),e=Lt?.isMyTurn()??!1;K.starterTurn.textContent=e?"YOUR PICK // Choose the next roof turret.":`${i?.name??"The other driver"} is choosing. Watch their pick resolve.`,K.starterPickReveal.hidden=!0,document.querySelectorAll(".starter-card").forEach(t=>{const n=t.querySelector("[data-starter-turret]"),s=n.dataset.starterTurret,r=at?.draftOptions.includes(s)??!1;t.hidden=!r,t.dataset.optionId=s,t.classList.remove("is-picked","is-fizzling"),t.classList.toggle("is-watching",!e),n.disabled=!e,n.textContent=e?`MOUNT ${s==="mg"?"RATTLER":s==="rocket"?"HELLBOX":"LONGLANCE"}`:"RIVAL IS CHOOSING"})}async function Ob(i){if(!Lt?.isMyTurn()||!at?.draftOptions.includes(i))return;const e=at.runState?structuredClone(at.runState):Gp(i,qt);at.runState&&Wp(e,_h(i)),document.querySelectorAll("[data-starter-turret]").forEach(n=>n.disabled=!0);const t=at.draftTurn===0?["mg","rocket","sniper"].filter(n=>n!==i):Object.keys(ss);try{await Lt.submitPick({optionId:i,optionName:Nm[i],nextRunState:e,nextOptions:t})}catch(n){Yi(n),Dh()}}function mc(){if(!at||at.phase!=="vehicle_select")return;gt="starter_turret_select",K.starterSelect.hidden=!0,K.cardDraft.hidden=!0,K.vehicleSelect.hidden=!1,K.countdown.hidden=!0,K.weaponSelect.classList.add("draft-open");const i=Dr(at),e=i.find(s=>s.id===at?.activePickerId),t=Ah||(Lt?.isMyTurn()??!1);K.vehicleTurn.textContent=t?"YOUR PICK // Choose the car you will drive.":`${e?.name??"The other driver"} is choosing their car.`,K.vehiclePickReveal.hidden=!0;const n=Object.entries(ss).map(([s,r])=>{const a=s,o=document.createElement("button");o.type="button",o.className="vehicle-card",o.dataset.vehicle=a,o.dataset.optionId=a,o.disabled=!t||!at?.draftOptions.includes(a),o.classList.toggle("is-watching",!t);const c=document.createElement("img");c.src=r.preview,c.alt="";const l=document.createElement("span"),u=document.createElement("b"),h=document.createElement("small"),d=document.createElement("em");u.textContent=r.label.toUpperCase(),h.textContent=r.callout;const f=i.filter(m=>at?.vehicleSelections?.[m.id]===a).map(m=>m.name);return d.textContent=f.length?`${f.join(" + ")} PICKED THIS`:t?"SELECT VEHICLE":"RIVAL IS CHOOSING",l.append(u,h,d),o.append(c,l),o.addEventListener("click",()=>{Bb(a)}),o});K.vehicleGrid.replaceChildren(...n),L.dataset.roundPhase="vehicle_select",L.dataset.vehicleSelection="visible"}async function Bb(i){if(!(!Lt?.isMyTurn()||at?.phase!=="vehicle_select")){K.vehicleGrid.querySelectorAll("button").forEach(e=>e.disabled=!0);try{await Lt.submitVehiclePick(i,ss[i].label)}catch(e){Yi(e),mc()}}}function kb(i){const e=document.createElement("article");e.className="upgrade-card",e.dataset.category=i.category,e.dataset.optionId=i.id;const t=document.createElement("div");t.className="upgrade-card__meta";const n=document.createElement("span");n.textContent=i.category.toUpperCase();const s=document.createElement("span");s.textContent=i.scope.toUpperCase(),t.append(n,s);const r=document.createElement("h2");r.textContent=i.name.toUpperCase();const a=document.createElement("p");a.textContent=i.description;const o=document.createElement("ul");o.className="upgrade-card__stats";for(const u of i.stats){const h=document.createElement("li");h.textContent=u,o.append(h)}const c=document.createElement("p");c.className="upgrade-card__quote",c.textContent=`“${i.quote}”`;const l=document.createElement("button");return l.type="button",l.textContent=i.category==="turret"?"ADD TO LOADOUT":"CHOOSE CARD",l.disabled=!(Lt?.isMyTurn()??!1),l.addEventListener("click",()=>{zb(i)}),e.classList.toggle("is-watching",l.disabled),e.append(t,r,a,o,c,l),e}function Nh(){if(!He||!at||at.phase!=="upgrade_draft")return;const i=Hb(at.draftOptions,He),e=qt%3===0,t=Dr(at).find(s=>s.id===at?.activePickerId),n=Lt?.isMyTurn()??!1;gt="card_select",K.countdown.hidden=!0,K.starterSelect.hidden=!0,K.vehicleSelect.hidden=!0,K.cardDraft.hidden=!1,K.weaponSelect.classList.add("draft-open"),K.draftEyebrow.textContent=e?`ROUND ${qt} // TURRET SALVAGE`:`ROUND ${qt} COMPLETE // SALVAGE DRAFT`,K.draftTitle.textContent=n?e?"EXPAND THE RIG OR UPGRADE":"CHOOSE ONE UPGRADE":`${(t?.name??"RIVAL").toUpperCase()} IS PICKING`,K.draftSubtitle.textContent=n?"YOUR PICK // Install one card into the shared rig.":`You can see every option. ${t?.name??"The other driver"} has control.`,K.draftPickReveal.hidden=!0,K.cardGrid.replaceChildren(...i.map(kb)),L.dataset.roundPhase=gt,L.dataset.cardDraft="visible",L.dataset.turretReward=e?"offered":"not-due"}async function zb(i){if(!He||gt!=="card_select"||!Lt?.isMyTurn()||!at?.draftOptions.includes(i.id))return;const e=structuredClone(He);Wp(e,i),e.round=qt,K.cardGrid.querySelectorAll("button").forEach(n=>n.disabled=!0);const t=at.draftTurn===0?xh(e).map(n=>n.id):[];try{await Lt.submitPick({optionId:i.id,optionName:i.name,nextRunState:e,nextOptions:t})}catch(n){Yi(n),Nh()}}function Hb(i,e){const t=xh(e),n=[...t,...Vo];for(const s of["mg","rocket","sniper"])n.push(_h(s));return i.map(s=>n.find(r=>r.id===s)).filter(s=>!!s)}function Vb(i){if(!He||He.ownedTurrets.length<2||gt!=="active")return;const e=He.ownedTurrets.indexOf(Et),t=(e+i+He.ownedTurrets.length)%He.ownedTurrets.length;ts(He.ownedTurrets[t])}const ns=new T(0,1,0),wl=new T,ms=new T,bl=new T,Jn=new T,Gf=new Xe,Wf=new Hn,xs=new zn(0,0,0,"YXZ"),qi=.93;function Gb(i,e,t,n){if(n.set(Math.sin(i),0,Math.cos(i)),Z.arenaKind!=="capsule"||!Z.bowl)return n;const s=Vt(Z.bowl,e,t);return s.progress<=.001?n:(n.addScaledVector(s.normal,-n.dot(s.normal)),n.lengthSq()<1e-4&&n.set(Math.sin(i),0,Math.cos(i)),n.normalize())}function Wb(i,e,t,n){const r=Z.arenaKind==="capsule"&&!!Z.bowl?Vt(Z.bowl,v.position.x,v.position.z):null,a=!!(r&&r.progress>.001&&v.grounded),o=r?Re.smoothstep(r.progress,.025,.34):0;ms.copy(ns),r&&ms.lerp(r.normal,o*.88).normalize(),v.surfaceNormal.copy(r?.normal??ns),v.wallAssistActive=a,v.downforce=a?3.5+o*5.5:0,Jn.set(Math.sin(v.heading),0,Math.cos(v.heading)),Jn.addScaledVector(ms,-Jn.dot(ms)),Jn.lengthSq()<1e-4&&Jn.set(Math.sin(v.heading),0,Math.cos(v.heading)),Jn.normalize(),bl.crossVectors(ms,Jn).normalize(),Jn.crossVectors(bl,ms).normalize(),v.projectedForward.copy(Jn),Gf.makeBasis(bl,ms,Jn),Wf.setFromRotationMatrix(Gf),v.orientation.slerp(Wf,1-Math.exp(-(a?11:15)*i)),xs.setFromQuaternion(v.orientation,"YXZ"),v.pitch=Re.clamp(xs.x,-qi,qi),v.roll=Re.clamp(xs.z,-qi,qi)+(e?t*.035*n:0),xs.set(v.pitch,xs.y,v.roll,"YXZ"),v.orientation.setFromEuler(xs)}function Xb(i,e,t){let n=Math.sin(t)*v.speed,s=Math.cos(t)*v.speed;const r=n*i+s*e;if(r<=0)return;n-=i*r*1.08,s-=e*r*1.08;const a=Math.hypot(n,s);if(v.speed=Math.min(Math.abs(v.speed),a),a>.05){const o=Math.atan2(n,s);v.heading=o-v.driftAngle}v.driftAngle*=.35}function Ds(i){v.collisionCooldown=Math.max(0,v.collisionCooldown-i),v.wallContactNormal.set(0,0,0);const e=it.has("KeyW")?1:0,t=it.has("KeyS")?1:0,n=(it.has("KeyA")?1:0)-(it.has("KeyD")?1:0),s=it.has("Space"),r=it.has("ShiftLeft")&&e>0&&v.boost>0;e&&(v.speed+=nt.acceleration*(r?nt.boostPower??1.3:1)*i),t&&(v.speed-=v.speed>1?nt.acceleration*2.35*i:nt.acceleration*.68*i),r?v.boost=Math.max(0,v.boost-24*i):v.boost=Math.min(100,v.boost+6*i);const a=nt.maxSpeed*(r?nt.boostPower??1.3:1);if(v.speed=Re.clamp(v.speed,-11,a),!e&&!t){const x=(s?4.4:2.15)*i;v.speed=Math.abs(v.speed)<=x?0:v.speed-Math.sign(v.speed)*x}const o=Math.min(Math.abs(v.speed)/nt.maxSpeed,1),c=v.speed>=0?1:-1,l=.2+o*.8-Math.max(0,o-.72)*.34;v.heading+=n*nt.handling*l*(s?1.3:1)*c*i;const u=s&&o>.16?-n*.28*o*c:0;v.driftAngle=Re.damp(v.driftAngle,u,s?4.2:nt.traction,i);const h=v.heading+v.driftAngle;Gb(h,v.position.x,v.position.z,wl),v.velocity.copy(wl).multiplyScalar(v.speed),v.position.x+=v.velocity.x*i,v.position.z+=v.velocity.z*i;let d=!1,f=!1;if(Z.arenaKind==="capsule"&&Z.bowl){const x=Hp(Z.bowl,v.position.x,v.position.z,v.heading,Un,On);x.collided?(v.position.x=x.x,v.position.z=x.z,d=!0,f=!0,Xb(x.normalX,x.normalZ,h),v.wallContactNormal.set(-x.normalX,0,-x.normalZ),L.dataset.guardContact="active",L.dataset.guardPenetration=x.penetration.toFixed(3),v.collisionCooldown<=0&&Jt("UPPER GUARD // SLIDE BACK INTO THE ARENA")):L.dataset.guardContact="clear"}else{const x=Math.hypot(v.position.x,v.position.z),R=Tn-(Un+On);if(x>R){const A=v.position.x/x,P=v.position.z/x;v.position.x=A*R,v.position.z=P*R,d=!0,Jt("BOUNDARY IMPACT // TURN BACK")}}for(const x of Ps)if(!(v.position.y>x.top+.2))for(const R of[-Un,0,Un])ib(x,R)&&(d=!0);for(const x of Nr)for(const R of[-Un,0,Un])nb(x,R)&&(d=!0);const m=v.activeRamp;let _=jo(v.position.x,v.position.z);if(d&&(Math.abs(v.speed)>6&&(Qo(Math.round(Math.abs(v.speed)*.32)),Jt("SCRAP COLLISION // HULL DAMAGED")),f||(v.speed*=-.18),v.driftAngle*=.25),_=jo(v.position.x,v.position.z),_){if(v.activeRamp=_.ramp,v.grounded=!0,v.verticalVelocity=0,v.position.y=_.height+.06,_.ramp.kind==="wall"){const x=_.localZ,R=Re.smoothstep(x,.08,.42),A=Vt(Z.bowl,v.position.x,v.position.z),P=Math.sin(h)*A.outwardX+Math.cos(h)*A.outwardZ,N=Re.smoothstep(x,.62,.9);v.speed-=P*(5.8*R+12*N)*i,v.speed=Re.clamp(v.speed,-11,a),v.driftAngle=Re.damp(v.driftAngle,0,5+R*7,i),v.speed*=Math.exp(-.18*N*i),L.dataset.wallRideGrip=(R*.85+.15).toFixed(2),L.dataset.wallSurfaceBand=A.band,L.dataset.wallSurfaceNormal=`${A.normal.x.toFixed(2)},${A.normal.y.toFixed(2)},${A.normal.z.toFixed(2)}`,x>.18&&Math.abs(v.speed)>5&&(L.dataset.wallRideContact="passed")}}else{const x=St(v.position.x,v.position.z)+.06;if(m&&m.kind!=="wall"&&v.position.y>x+.45){const R=Math.cos(h-m.rotation),A=v.speed*R*m.rise/m.length,P=Math.abs(v.speed)*Math.max(0,-Math.sin(v.pitch));v.verticalVelocity=Math.max(0,A,P),v.grounded=!1}v.activeRamp=null,v.grounded?v.position.y=x:(v.verticalVelocity-=12.5*i,v.position.y+=v.verticalVelocity*i,v.position.y<=x&&(v.position.y=x,v.verticalVelocity=0,v.grounded=!0))}const g=Ei(v.position.x+Math.sin(v.heading)*2,v.position.z+Math.cos(v.heading)*2),p=Ei(v.position.x-Math.sin(v.heading)*2,v.position.z-Math.cos(v.heading)*2),y=Ei(v.position.x+Math.cos(v.heading)*1.2,v.position.z-Math.sin(v.heading)*1.2),S=Ei(v.position.x-Math.cos(v.heading)*1.2,v.position.z+Math.sin(v.heading)*1.2);Z.arenaKind==="capsule"?Wb(i,s,n,o):(v.pitch=v.grounded?Math.atan2(p-g,4):0,v.roll=((v.grounded?Math.atan2(y-S,2.4):0)+(s?n*.055*o:0))/(nt.stability??1),v.orientation.setFromEuler(xs.set(v.pitch,v.heading,v.roll,"YXZ")),v.surfaceNormal.set(0,1,0),v.projectedForward.set(Math.sin(v.heading),0,Math.cos(v.heading)),v.wallAssistActive=!1,v.downforce=0),v.velocity.copy(wl).multiplyScalar(v.speed),lr.forEach(x=>x.rotation.x+=v.speed*i/.57),$o.forEach(x=>x.rotation.y=Re.damp(x.rotation.y,-n*.38,12,i));for(const x of Is)x.alive&&x.group.position.distanceTo(v.position)<1.85&&Math.abs(v.speed)>5&&(Bu(x,Math.abs(v.speed)*1.8),v.speed*=-.35,Qo(4));if(!Number.isFinite(v.position.x)||!Number.isFinite(v.position.y)||!Number.isFinite(v.position.z)||v.position.y<-8||Math.abs(v.position.x)>Tn*1.8||Math.abs(v.position.z)>Tn*1.8){Jt("OUT OF BOUNDS // AUTO RECOVERY"),Us();return}Ub(i)}function wa(i,e=!1){ne.health<=0||gt==="ended"||gt==="card_select"||(ne.health=Math.max(0,ne.health-i),e||bs("confirmed-hit",.18,.025,ne.position),L.dataset.opponentHealth=ne.health.toFixed(0),ne.health<=0&&(Lh(ne.position,1,28),Ot.visible=!1,Jt("RIVAL SCRAPPED // ROUND SECURED"),Vw()))}function qb(i){if(gt!=="active"||ne.health<=0||ne.burnTime>0&&(ne.burnTime=Math.max(0,ne.burnTime-i),ne.burnFxCooldown-=i,wa(ne.burnDps*i,!0),ne.burnFxCooldown<=0&&(ne.burnFxCooldown=.14,Pm(ne.position.clone().add(new T(0,.5,0)))),L.dataset.burnRemaining=ne.burnTime.toFixed(2),ne.health<=0))return;ne.collisionCooldown=Math.max(0,ne.collisionCooldown-i),ne.fireCooldown-=i;const e=v.position.x-ne.position.x,t=v.position.z-ne.position.z,n=Math.hypot(e,t),s=Math.atan2(e,t)+ne.steerBias*(n<18?.72:.18),r=Math.atan2(Math.sin(s-ne.heading),Math.cos(s-ne.heading));ne.heading+=Re.clamp(r,-1.35*i,1.35*i);const a=n>13?17:n<8?6:11;if(ne.speed=Re.damp(ne.speed,a,2.2,i),ne.position.x+=Math.sin(ne.heading)*ne.speed*i,ne.position.z+=Math.cos(ne.heading)*ne.speed*i,Z.arenaKind==="capsule"&&Z.bowl){const c=Hp(Z.bowl,ne.position.x,ne.position.z,ne.heading,Un,On);c.collided&&(ne.position.x=c.x,ne.position.z=c.z,ne.heading+=ne.steerBias*.7,ne.steerBias*=-1)}else{const c=Tn-4,l=Math.hypot(ne.position.x,ne.position.z);l>c&&(ne.position.multiplyScalar(c/l),ne.heading=Math.atan2(-ne.position.x,-ne.position.z)+ne.steerBias*.5,ne.steerBias*=-1)}ne.position.y=Ei(ne.position.x,ne.position.z)+.06,Ot.position.copy(ne.position),Ot.rotation.y=ne.heading;const o=Ot.userData.turret;if(o){const c=Math.atan2(e,t);o.rotation.y=Re.damp(o.rotation.y,Math.atan2(Math.sin(c-ne.heading),Math.cos(c-ne.heading)),8,i)}n<62&&ne.fireCooldown<=0&&(Nb(),ne.fireCooldown=.82+Math.random()*.45),n<2.35&&ne.collisionCooldown<=0&&(ne.collisionCooldown=.8,Qo(10),wa(5*(nt.ramPower??1)),ne.heading+=Math.PI*.65)}function Qo(i){if(v.collisionCooldown>0||gt==="ended"||gt==="card_select")return;v.collisionCooldown=.45;let e=i*(1-(nt.armor??0));if(v.shield>0){const t=Math.min(v.shield,e);v.shield-=t,e-=t,L.dataset.shieldAbsorbed=t.toFixed(1),Jt("EMERGENCY SHIELD // IMPACT ABSORBED")}v.health=Math.max(0,v.health-e),bs("vehicle-hit",.26,.045,v.position),v.health<=0&&(Jt("RIG DISABLED // RIVAL TAKES THE ROUND"),Gw())}const El=[],qr=new T;function Yb(i){yl.setFromCamera(Fu,Rn),El.length=0,yl.intersectObjects(Li,!0,El);const e=El[0];if(e)sn.copy(e.point);else{if(kf.constant=0,!yl.ray.intersectPlane(kf,sn))return;sn.y=Ei(sn.x,sn.z)}ur.getWorldPosition(qr);const t=sn.x-qr.x,n=sn.z-qr.z;if(Math.hypot(t,n)<1.8)return;let r=Math.atan2(t,n)-v.heading;r=Math.atan2(Math.sin(r),Math.cos(r)),ur.rotation.y=Re.damp(ur.rotation.y,r,12,i);const a=-Math.atan2(sn.y-qr.y,Math.hypot(t,n));Lu.rotation.x=Re.damp(Lu.rotation.x,Re.clamp(a,-.42,.2),11,i),Mm.copy(sn).sub(qr).normalize(),pc=!0,Es.position.copy(sn),Es.position.y+=.09,Es.scale.setScalar(1+Math.sin(Tr*5)*.06)}const Yr=new T,ln=new T,Xf=new T,xi=new T,yo=new T,Kb=new T;function Tl(i,e,t){yo.copy(e).sub(i);const n=yo.lengthSq();if(n<=1e-6)return t.distanceToSquared(i);const s=Re.clamp(Kb.copy(t).sub(i).dot(yo)/n,0,1);return Xf.copy(i).addScaledVector(yo,s),Xf.distanceToSquared(t)}function jb(i,e,t,n=!1,s=!1){if(L.dataset.lastWeaponImpact=i.kind,i.owner==="player"&&i.kind==="rocket"){for(const a of Is){if(!a.alive)continue;ln.copy(a.group.position),ln.y+=1.4;const o=ln.distanceTo(e);if(o>i.splashRadius)continue;const c=a===t?i.damage:i.damage*Math.max(.28,1-o/i.splashRadius);Bu(a,c)}ln.copy(ne.position),ln.y+=1.1;const r=ln.distanceTo(e);ne.health>0&&r<=i.splashRadius&&wa(i.damage*Math.max(.3,1-r/i.splashRadius))}else i.owner==="player"&&t&&Bu(t,i.damage);i.owner==="player"&&n&&i.kind!=="rocket"&&wa(i.damage),i.owner==="player"&&n&&i.burnDps>0&&(ne.burnDps=Math.max(ne.burnDps,i.burnDps),ne.burnTime=Math.max(ne.burnTime,i.burnDuration),Pm(e),L.dataset.burnStatus="applied"),i.owner==="opponent"&&s&&Qo(i.damage),i.kind==="rocket"?(Cm(i.id),Sa("rocket",e,!0),Lh(e,.2,22)):i.kind==="sniper"?Sb(e):Sa("mg",e,!1)}function qf(i){for(let e=Ri.length-1;e>=0;e--){const t=Ri[e];Yr.copy(t.mesh.position),t.mesh.position.addScaledVector(t.velocity,i),t.life-=i,t.kind==="rocket"&&(t.trailTimer-=i,t.trailTimer<=0&&(t.trailTimer=.06,bb(t.mesh.position,t.id)));let n=null;if(t.owner==="player")for(const c of Is){if(!c.alive||t.hitTargets.has(c))continue;ln.copy(c.group.position),ln.y+=1.4;const l=t.kind==="rocket"?1.15:.95;if(Tl(Yr,t.mesh.position,ln)<l*l){n=c;break}}ln.copy(ne.position),ln.y+=1.1;const s=t.owner==="player"&&!t.hitOpponent&&ne.health>0&&Tl(Yr,t.mesh.position,ln)<(t.kind==="rocket"?1.6:1.35)**2;ln.copy(v.position),ln.y+=1.05;const r=t.owner==="opponent"&&v.health>0&&Tl(Yr,t.mesh.position,ln)<1.4**2,a=Ei(t.mesh.position.x,t.mesh.position.z)+.1,o=t.mesh.position.y<=a;if(o&&t.ricochetsRemaining>0){t.ricochetsRemaining--,t.mesh.position.copy(Yr),t.velocity.y=Math.abs(t.velocity.y)+4,t.velocity.multiplyScalar(.82),Sa("mg",t.mesh.position,!1),L.dataset.ricochetVfx="spark";continue}if(n||s||r||o||t.life<=0){if(n?(xi.copy(n.group.position),xi.y+=1.4):s?(xi.copy(ne.position),xi.y+=1.1):r?(xi.copy(v.position),xi.y+=1.05):(xi.copy(t.mesh.position),o&&(xi.y=a+.08)),(n||s||r||o||t.kind==="rocket")&&jb(t,xi,n,s,r),t.owner==="player"&&(!!n||s)&&t.piercesRemaining>0&&t.kind!=="rocket"){t.piercesRemaining--,n&&t.hitTargets.add(n),s&&(t.hitOpponent=!0),t.mesh.position.addScaledVector(t.velocity.clone().normalize(),1.8),L.dataset.piercingVfx="bright-tracer";continue}t.kind==="rocket"&&Cm(t.id),Ch(t.mesh,t.kind),Ri.splice(e,1)}}for(let e=ii.length-1;e>=0;e--){const t=ii[e];t.life-=i,t.mesh.position.addScaledVector(t.velocity,i),t.velocity.y-=3.5*i,t.mesh.scale.multiplyScalar(1+i*.55);const n=t.mesh.material;n.opacity=Math.max(0,Math.min(n.opacity,t.life*.45)),t.life<=0&&(be.remove(t.mesh),n.dispose(),ii.splice(e,1))}for(let e=Ii.length-1;e>=0;e--){const t=Ii[e];t.life-=i;const n=Re.clamp(1-t.life/t.maxLife,0,1),s=Math.pow(1-n,1.45);t.group.userData.billboard&&t.group.quaternion.copy(Rn.quaternion),t.kind!=="laser"&&t.group.scale.setScalar((t.kind==="impact"?.48:.68)+n*t.growth);for(const r of t.lights)r.intensity*=Math.max(0,1-i*8);for(const r of t.meshes){const a=Array.isArray(r.material)?r.material:[r.material];for(const o of a)o.opacity=Number(o.userData.baseOpacity??1)*s}t.life<=0&&Rh(e)}hr=Math.max(0,hr-i),hr===0&&(dr=0);for(const e of Is)e.alive&&(e.hitFlash>0?(e.hitFlash-=i,e.group.getObjectByName("target-body").material.emissive.setHex(16739116)):e.group.getObjectByName("target-body").material.emissive.setHex(0))}const Al=new T;let Rl=.1;function $b(){return Z.arenaKind==="capsule"&&Z.bowl?{kind:"capsule",straightHalfLength:Z.bowl.straightHalfLength,outerRadius:Z.bowl.outerRadius}:{kind:"ring",radius:Tn}}function gc(){const i=Xi.mode==="enemy";K.cameraMode.textContent=i?"ENEMY CAM":"CHASE CAM",K.cameraMode.parentElement?.classList.toggle("enemy",i),L.dataset.cameraMode=Xi.mode,L.dataset.enemyCam=i?"locked":"off"}function Zb(i){hr>0?Al.set((Math.random()-.5)*dr,(Math.random()-.5)*dr,(Math.random()-.5)*dr):Al.set(0,0,0);const e=Xi.update({dt:i,playerPosition:en.position,playerHeading:v.heading,enemyPosition:Ot.position,enemyAvailable:ne.health>0&&Ot.visible,groundHeight:Ei,bounds:$b(),shake:Al});e.fellBackToChase&&(gc(),Jt("NO TARGET // CHASE CAM")),Rl+=i,Rl>=.1&&(Rl=0,L.dataset.cameraAimMode=e.mode==="enemy"?"enemy-target":"drive-forward",L.dataset.cameraPositionMode=e.mode,L.dataset.cameraTargetDistance=e.targetDistance?.toFixed(2)??"none",L.dataset.cameraPosition=`${Rn.position.x.toFixed(2)},${Rn.position.y.toFixed(2)},${Rn.position.z.toFixed(2)}`,L.dataset.cameraLookAt=`${Xi.lookAt.x.toFixed(2)},${Xi.lookAt.y.toFixed(2)},${Xi.lookAt.z.toFixed(2)}`)}function Um(){K.boost.textContent=String(Math.round(v.boost)),K.health.textContent=String(Math.round(v.health)),K.healthBar.style.width=`${v.health/nt.maxHealth*100}%`,K.boostBar.style.width=`${v.boost}%`,K.health.parentElement.title=v.shield>0?`${Math.round(v.shield)} temporary shield active`:"Hull integrity",L.dataset.shield=v.shield.toFixed(1),K.rivalHealth.textContent=String(Math.round(ne.health)),K.rivalHealthBar.style.width=`${ne.health/ne.maxHealth*100}%`,K.boostMeter.classList.toggle("recharging",v.boost<99.5&&!it.has("ShiftLeft")),L.dataset.boost=v.boost.toFixed(1),L.dataset.boostRechargeRate="6-per-second";const i=jo(v.position.x,v.position.z),e=St(v.position.x,v.position.z),t=Z.arenaKind==="capsule"?"flat-floor":"terrain";L.dataset.groundContact=v.grounded?v.activeRamp?v.activeRamp.kind:t:"airborne",L.dataset.aimRay=pc?"locked":"searching",L.dataset.aimPoint=`${sn.x.toFixed(1)},${sn.y.toFixed(1)},${sn.z.toFixed(1)}`,L.dataset.vehiclePosition=`${v.position.x.toFixed(1)},${v.position.y.toFixed(1)},${v.position.z.toFixed(1)}`,L.dataset.surfaceLabel=i?.ramp.label??(Z.arenaKind==="capsule"?"flat center floor":"base terrain"),L.dataset.surfaceHeight=(i?.height??e).toFixed(2),L.dataset.baseGroundHeight=e.toFixed(2),L.dataset.contactDelta=((i?.height??e)-e).toFixed(2),L.dataset.heightMismatch=i?Math.abs(v.position.y-.06-i.height).toFixed(3):"0.000",L.dataset.wallRideActive=String(i?.ramp.kind==="wall"),Ur.position.set(v.position.x,(i?.height??e)+.16,v.position.z),ei.set(0,1,0).applyQuaternion(v.orientation).normalize(),Ls.copy(v.position).addScaledVector(ei,.7);for(const o of[Au,Ru,Cu,Po,Lo])o.position.copy(Ls);Au.setDirection(ei),Ru.setDirection(v.surfaceNormal),Cu.setDirection(v.projectedForward);const n=v.velocity.length();Po.setDirection(n>.01?v.velocity.clone().normalize():v.projectedForward),Po.setLength(Re.clamp(n*.24,1.2,7),.6,.3);const s=v.wallContactNormal.lengthSq()>.001;Lo.visible=Hi&&s,s&&Lo.setDirection(v.wallContactNormal);const r=Z.arenaKind==="capsule"&&Z.bowl?Vt(Z.bowl,v.position.x,v.position.z):null,a=v.grounded?L.dataset.guardContact==="active"?"upper-lip":r&&r.progress>.001?r.band:"flat-floor":"airborne";L.dataset.surfaceType=a,L.dataset.carUp=`${ei.x.toFixed(2)},${ei.y.toFixed(2)},${ei.z.toFixed(2)}`,L.dataset.surfaceNormal=`${v.surfaceNormal.x.toFixed(2)},${v.surfaceNormal.y.toFixed(2)},${v.surfaceNormal.z.toFixed(2)}`,L.dataset.projectedForward=`${v.projectedForward.x.toFixed(2)},${v.projectedForward.y.toFixed(2)},${v.projectedForward.z.toFixed(2)}`,L.dataset.velocityVector=`${v.velocity.x.toFixed(2)},${v.velocity.y.toFixed(2)},${v.velocity.z.toFixed(2)}`,L.dataset.wallContactNormal=`${v.wallContactNormal.x.toFixed(2)},${v.wallContactNormal.y.toFixed(2)},${v.wallContactNormal.z.toFixed(2)}`,L.dataset.wallAssist=v.wallAssistActive?"active":"off",L.dataset.wallDownforce=v.downforce.toFixed(2),L.dataset.carRoll=v.roll.toFixed(3),L.dataset.carPitch=v.pitch.toFixed(3),Qi&&v.activeRamp?.kind==="ramp"&&(L.dataset.rampDriveUp="passed"),Qi&&!v.grounded&&L.dataset.rampDriveUp==="passed"&&(L.dataset.rampLaunch="passed")}const Fm=new T(0,0,-28),Om=new Hn,Yf=new Hn;function Bm(){Fm.copy(v.position),Om.copy(v.orientation)}function Jb(i){en.position.lerpVectors(Fm,v.position,i),Yf.slerpQuaternions(Om,v.orientation,i),en.quaternion.copy(Yf)}function Us(i=!0){const e=Z.spawn;rn(!1),v.position.set(e.x,St(e.x,e.z)+.06,e.z),v.heading=e.heading,v.speed=0,v.driftAngle=0,v.verticalVelocity=0,v.pitch=0,v.roll=0,v.grounded=!0,v.activeRamp=null,v.health=nt.maxHealth,v.shield=He?.roundShield??0,v.boost=100,v.orientation.setFromAxisAngle(ns,e.heading),v.surfaceNormal.copy(ns),v.projectedForward.set(Math.sin(e.heading),0,Math.cos(e.heading)),v.velocity.set(0,0,0),v.wallContactNormal.set(0,0,0),v.wallAssistActive=!1,v.downforce=0,Bm(),en.position.copy(v.position),en.quaternion.copy(v.orientation),Xi.snapToChase(v.position,v.heading,Ei),L.dataset.roundShield=v.shield.toFixed(0),i&&Jt("RIG RECOVERED // SYSTEMS ONLINE")}function Uh(){const i=Z.opponentSpawn;ne.maxHealth=140*(1+Math.min(.6,(qt-1)*.06)),ne.position.set(i.x,St(i.x,i.z)+.06,i.z),ne.heading=i.heading,ne.speed=0,ne.health=ne.maxHealth,ne.fireCooldown=Math.max(.72,1.25-(qt-1)*.025),ne.collisionCooldown=0,ne.burnTime=0,ne.burnDps=0,ne.burnFxCooldown=0,Ot.visible=!0,Ot.position.copy(ne.position),Ot.rotation.y=ne.heading,L.dataset.opponentHealth=String(ne.health),L.dataset.aiScaling=(1+Math.min(.6,(qt-1)*.06)).toFixed(2),L.dataset.aiState="countdown-ready"}function ec(){gt="countdown",Xp=performance.now()+zw*1e3,Eu=3,clearTimeout(Nu),K.message.classList.remove("show"),K.countdown.hidden=!1,K.countdownArena.textContent=Z.name,K.countdownValue.textContent="3",K.countdown.querySelector("span").textContent="GET READY",L.dataset.roundPhase=gt}function Qb(){if(gt!=="countdown")return;const i=Math.max(0,(Xp-performance.now())/1e3),e=Math.max(0,Math.ceil(i-Hw));e!==Eu&&(Eu=e,K.countdownValue.textContent=e>0?String(e):"DRIVE",K.countdown.querySelector("span").textContent=e>0?"GET READY":"FIGHT BACK"),i<=0&&(gt="active",K.countdown.hidden=!0,L.dataset.roundPhase=gt,L.dataset.aiState="hunting",Jt(`ROUND ${qt} // ${Z.name.toUpperCase()}`))}function km(i){if(qo)return;qo=!0,gt="ended",rn(!1),i==="player"?Zi=Math.min(3,Zi+1):ws=Math.min(3,ws+1),Pa(),L.dataset.roundWinner=i,L.dataset.roundPhase=gt,K.countdown.hidden=!1,K.countdownValue.textContent=i==="player"?"WIN":"LOST",K.countdownArena.textContent=Zi>=3||ws>=3?"MATCH COMPLETE":`ROUND ${qt} COMPLETE`,K.countdown.querySelector("span").textContent="WAITING FOR BOTH DRIVERS",Qi||fr||sa||ra||Zo||Th||(clearTimeout(Cf),Cf=window.setTimeout(()=>{eE()},1500))}async function eE(){if(!(!He||!Lt)){He.round=qt,Ca(),K.countdown.querySelector("span").textContent="YOU'RE READY // WAITING FOR RIVAL";try{await Lt.markRoundComplete(xh(He).map(i=>i.id),structuredClone(He)),L.dataset.roundReady="submitted"}catch(i){Yi(i)}}}function tE(){rn(!1),it.clear(),Ss.intensity=0;for(const i of Ri)Ch(i.mesh,i.kind);Ri.length=0;for(const i of ii)be.remove(i.mesh);for(ii.length=0;Ii.length;)Rh(Ii.length-1);for(const i of[...be.children])Zr.has(i)||be.remove(i);Er.length=0,Ps.length=0,Nr.length=0,Li.length=0,Ji.length=0,Is.length=0,kn.length=0,kn.push(...$p),L.dataset.roundWorldCleanup="complete"}async function nE(i=qt+1){if(gt==="loading")return;const e=Zi>=3||ws>=3,t=Z.id==="dustring"?"ovalbowl":"dustring",n=Math.max(qt+1,i);gt="loading",L.dataset.roundPhase=gt,L.dataset.seamlessTransition="loading",K.cardDraft.hidden=!0,K.countdown.hidden=!1,K.countdownValue.textContent="…",K.countdownArena.textContent="NEXT ARENA",K.countdown.querySelector("span").textContent="REBUILDING THE RING",Ia(),e&&(Zi=0,ws=0),qt=n,He&&(He.round=n,Ca()),Pa(),tE(),Z=cc[t],Tn=Z.radius,await Jp(),await em(),nm(),im(),Z.targets.forEach(s=>dm(s.x,s.z,s.rotation)),Li.push(Ot),tm(),qo=!1,Us(!1),Uh(),gc(),L.dataset.targetsRemaining=String(Z.targets.length),L.dataset.arenaLayout=Z.id,L.dataset.arenaKind=Z.arenaKind,L.dataset.arenaRadius=String(Tn),L.dataset.ringInnerRadius=String(Z.ringInnerRadius),L.dataset.ringOuterRadius=String(Z.ringOuterRadius),L.dataset.mapRotation="alternate-in-document",L.dataset.seamlessTransition="complete",ec()}function zm(i){xn&&(Ti=i??!Ti,Ti&&rn(!1),K.pause.hidden=!Ti)}function iE(i){K.controls.classList.toggle("closed",!0)}function sE(){xn&&(Hi=!Hi,kn.forEach(i=>i.visible=Hi),Jr.visible=Hi,K.debug.hidden=!Hi,Jt(Hi?`PHYSICS DEBUG // ${v.grounded?"GROUNDED":"AIRBORNE"}`:"PHYSICS DEBUG // OFF"))}function rE(){if(!xn)return;const i=Xi.toggle(ne.health>0&&Ot.visible);gc(),Jt(i.noTarget?"NO TARGET // CHASE CAM":i.mode==="enemy"?"ENEMY CAM // ON":"CHASE CAM // ON")}L.dataset.assetsLoaded="0";L.dataset.assetErrors="0";L.dataset.assetManifest="riggedAssetManifest";function aE(i){const e=new T(0,0,-i.length*.5-3).applyAxisAngle(new T(0,1,0),i.rotation),t=i.position.x+e.x,n=i.position.z+e.z;v.position.set(t,St(t,n)+.06,n),v.heading=i.rotation,v.speed=0,v.driftAngle=0,v.verticalVelocity=0,v.pitch=0,v.roll=0,v.grounded=!0,v.activeRamp=null,v.orientation.setFromAxisAngle(ns,i.rotation),en.position.copy(v.position),en.quaternion.copy(v.orientation)}function oE(){const i=Er.filter(n=>n.kind==="ramp"),e=[];let t=0;for(const n of i){aE(n);let s=!1,r=!1,a=!1;it.add("KeyW");for(let o=0;o<600;o++)if(Tr+=zt,Ds(zt),Um(),v.activeRamp?.label===n.label&&(s=!0),s&&!v.grounded&&(r=!0),r&&v.grounded&&v.activeRamp?.label!==n.label){a=!0;break}it.delete("KeyW"),a&&t++,(!s||!r||!a)&&e.push(`${n.label}:${s?r?"no-landing":"no-launch":"no-contact"}`)}return L.dataset.allRampExpected=String(i.length),L.dataset.allRampPasses=String(i.length-e.length),L.dataset.allRampLandings=String(t),L.dataset.allRampFailures=e.join("|")||"none",L.dataset.rampDriveUp=e.some(n=>n.endsWith("no-contact"))?"failed":"passed",L.dataset.rampLaunch=e.some(n=>n.endsWith("no-launch"))?"failed":"passed",L.dataset.rampLanding=t===i.length?"passed":"failed",e.length===0}function cE(i){const e=i.outerRadius-i.flatRadius,t=i.flatRadius+e*.48,n=Math.PI*.25,s=[{label:"straight-along-bank",x:t,z:-30,heading:0,steps:180,drive:!1,steer:"none"},{label:"turn-left-while-climbing",x:i.flatRadius+2,z:-18,heading:Math.PI/2,steps:170,drive:!0,steer:"left"},{label:"turn-right-while-climbing",x:i.flatRadius+2,z:18,heading:Math.PI/2,steps:170,drive:!0,steer:"right"},{label:"steer-around-rounded-cap",x:Math.cos(n)*t,z:i.straightHalfLength+Math.sin(n)*t,heading:-n,steps:210,drive:!1,steer:"cap"}],r=[];let a=0,o=0,c=1;for(const u of s){v.position.set(u.x,St(u.x,u.z)+.06,u.z),v.heading=u.heading,v.speed=u.drive?8:14,v.driftAngle=0,v.verticalVelocity=0,v.pitch=0,v.roll=0,v.grounded=!0,v.activeRamp=null,v.orientation.setFromAxisAngle(ns,u.heading);let h=0,d=0,f=0,m=1,_=!0,g=!0;u.drive&&it.add("KeyW");for(let y=0;y<u.steps;y++){u.steer==="left"&&y>=34&&y<72?it.add("KeyA"):it.delete("KeyA"),u.steer==="right"&&y>=34&&y<72||u.steer==="cap"&&y%6===0?it.add("KeyD"):it.delete("KeyD"),Tr+=zt,Ds(zt),u.steer==="cap"&&it.delete("KeyD");const S=Vt(i,v.position.x,v.position.z);S.progress>.001&&h++,ei.set(0,1,0).applyQuaternion(v.orientation).normalize();const x=ei.dot(S.normal);y>18&&(m=Math.min(m,x)),d=Math.max(d,Math.abs(v.roll)),f=Math.max(f,Math.abs(v.pitch)),g=g&&Number.isFinite(v.position.x)&&Number.isFinite(v.position.y)&&Number.isFinite(v.position.z)&&Number.isFinite(v.roll)&&Number.isFinite(v.pitch);for(const R of[-Un,0,Un]){const A=Vt(i,v.position.x+Math.sin(v.heading)*R,v.position.z+Math.cos(v.heading)*R);_=_&&A.distance<=i.outerRadius-On+.05}}it.delete("KeyW"),it.delete("KeyA"),it.delete("KeyD"),a=Math.max(a,d),o=Math.max(o,f),c=Math.min(c,m),g&&_&&h>=Math.min(90,u.steps*.6)&&d<=qi+.025&&f<=qi+.025&&m>.72||r.push(`${u.label}:${g?_?h<90?"lost-wall":d>qi+.025?"roll":f>qi+.025?"pitch":"up-vector":"escaped":"non-finite"}`)}const l=r.length===0;return L.dataset.wallTurningSmoke=l?"passed":"failed",L.dataset.wallTurningCases=String(s.length),L.dataset.wallTurningFailures=r.join("|")||"none",L.dataset.wallTurningMaxRoll=Re.radToDeg(a).toFixed(1),L.dataset.wallTurningMaxPitch=Re.radToDeg(o).toFixed(1),L.dataset.wallTurningMinUpDot=c.toFixed(3),l}function lE(){if(Z.arenaKind!=="capsule"||!Z.bowl)return L.dataset.wallRideSmoke="skipped-non-bowl",!0;const i=Z.bowl,e=[{label:"east-straight",x:i.flatRadius-5,z:0,heading:Math.PI/2},{label:"east-diagonal",x:i.flatRadius-5,z:-14,heading:Math.PI/2-.34},{label:"north-cap",x:0,z:i.straightHalfLength+i.flatRadius-5,heading:0},{label:"north-cap-diagonal",x:-14,z:i.straightHalfLength+i.flatRadius-5,heading:.34}],t=[];let n=0,s=0,r=!0,a=!0;for(const u of e){v.position.set(u.x,St(u.x,u.z)+.06,u.z),v.heading=u.heading,v.speed=8,v.driftAngle=0,v.verticalVelocity=0,v.pitch=0,v.roll=0,v.grounded=!0,v.activeRamp=null,v.orientation.setFromAxisAngle(ns,u.heading);let h=0,d=0,f=!1;it.add("KeyW");for(let p=0;p<210;p++){Tr+=zt,Ds(zt);const y=Vt(i,v.position.x,v.position.z);h=Math.max(h,y.progress),d=Math.max(d,v.position.y),n=Math.max(n,h),s=Math.max(s,d),f=f||y.progress>.001;for(const S of[-Un,0,Un]){const x=Vt(i,v.position.x+Math.sin(v.heading)*S,v.position.z+Math.cos(v.heading)*S);r=r&&x.distance<=i.outerRadius-On+.05}}const m=Vt(i,v.position.x,v.position.z);v.heading=Math.atan2(-m.outwardX,-m.outwardZ),v.driftAngle=0,v.speed=Math.max(7,Math.abs(v.speed));for(let p=0;p<180;p++)Tr+=zt,Ds(zt);it.delete("KeyW");const g=Vt(i,v.position.x,v.position.z).progress<.08&&v.grounded;a=a&&g,(!f||h<=.28||d<=2||!g)&&t.push(`${u.label}:${f?h<=.28?"too-low":d<=2?"no-rise":"no-return":"no-contact"}`)}const o=cE(i);let c=t.length===0&&r&&a&&o;L.dataset.wallRideApproaches=String(e.length),L.dataset.wallRideFailures=t.join("|")||"none",L.dataset.wallRideMaxProgress=n.toFixed(2),L.dataset.wallRideMaxHeight=s.toFixed(2),L.dataset.wallRideBoundary=r?"passed":"failed",L.dataset.wallRideReturn=a?"passed":"failed",Us(),ei.set(0,1,0).applyQuaternion(v.orientation);const l=v.position.x===Z.spawn.x&&v.position.z===Z.spawn.z&&v.speed===0&&v.velocity.lengthSq()===0&&v.verticalVelocity===0&&v.pitch===0&&v.roll===0&&ei.dot(ns)>.999&&v.grounded&&!v.wallAssistActive&&Vt(i,v.position.x,v.position.z).progress===0;return L.dataset.wallReset=l?"passed":"failed",c=c&&l,L.dataset.wallRideSmoke=c?"passed":"failed",c}function uE(){let i=!0;if((Qi||fr)&&(i=oE()&&i),(Qi||fr)&&(L.dataset.physicsSmoke=i?"passed":"failed"),sa&&(L.dataset.physicsSmoke=lE()?"passed":"failed"),ra){sn.copy(v.position).add(new T(0,1,40)),pc=!0,en.updateMatrixWorld(!0),rn(!0);for(let n=0;n<120;n++)Im(zt);rn(!1);const e=Number(L.dataset.shotsFired??0),t=Math.ceil(2*mn.fireRate)+1;L.dataset.holdFireSmoke=e>=2&&e<=t?"passed":"failed",L.dataset.fireRateLimited=e<=t?"passed":"failed",L.dataset.holdFireShots=String(e)}if(Zo){v.boost=100,it.add("KeyW"),it.add("ShiftLeft");for(let n=0;n<60;n++)Ds(zt);const e=v.boost;it.delete("ShiftLeft");for(let n=0;n<60;n++)Ds(zt);const t=v.boost;it.clear(),L.dataset.boostAfterUse=e.toFixed(1),L.dataset.boostAfterRecharge=t.toFixed(1),L.dataset.boostSmoke=e<80&&t>e&&t<95?"passed":"failed",Us()}Th&&(gt="active",wa(999),L.dataset.roundHudSmoke=Zi===1&&L.dataset.roundWinner==="player"?"passed":"failed")}function Yi(i){const e=i instanceof Error?i.message:"Multiplayer connection failed.";K.roomStatus.textContent=e,Jt(e.toUpperCase())}function hE(i){if(!i){K.roomEntry.hidden=!1,K.roomWaiting.hidden=!0;return}const e=Dr(i),t=i.phase==="lobby";K.multiplayerLobby.hidden=!t,K.roomEntry.hidden=!0,K.roomWaiting.hidden=!1,K.roomCodeDisplay.textContent=i.code;const n=e.map(r=>{const a=document.createElement("div");a.className="room-player";const o=document.createElement("b");o.textContent=r.name;const c=document.createElement("span");return c.textContent=r.id===i.hostId?"HOST // PICKS FIRST":"RIVAL // PICKS SECOND",a.append(o,c),a});if(e.length<2){const r=document.createElement("div");r.className="room-player room-player--empty";const a=document.createElement("b");a.textContent="OPEN SEAT";const o=document.createElement("span");o.textContent="SHARE THE ROOM CODE",r.append(a,o),n.push(r)}K.roomPlayers.replaceChildren(...n);const s=Lt?.isHost()===!0&&e.length===2;K.startRun.disabled=!s,K.startRun.textContent=s?"START SHARED RUN":Lt?.isHost()?"WAITING FOR RIVAL":"WAITING FOR HOST",K.roomStatus.textContent=e.length<2?"Room ready. Send the code to one other driver.":s?"Both drivers connected. Launch when ready.":"Both drivers connected. Waiting for the host."}function dE(i){i.runState&&(He=structuredClone(i.runState),Ca(),Et=He.activeTurret,xn&&(Io(),ts(Et,!1),Ih()),L.dataset.runState="shared",L.dataset.roomCode=i.code)}function fE(i){if(!Lt)return;const e=i.vehicleSelections?.[Lt.playerId];!rb(e)||e===va||(va=e,xn&&cm(e))}function pE(i){const e=K.starterSelect.hidden?K.vehicleSelect.hidden?"upgrade":"vehicle":"starter",t=e==="starter"?K.starterSelect:e==="vehicle"?K.vehicleGrid:K.cardGrid,n=e==="starter"?K.starterPickReveal:e==="vehicle"?K.vehiclePickReveal:K.draftPickReveal,s=at?Dr(at).find(r=>r.id===i.playerId):null;t.querySelectorAll(".starter-card,.upgrade-card,.vehicle-card").forEach(r=>{const a=r.dataset.optionId===i.optionId;r.classList.toggle("is-picked",a),r.classList.toggle("is-fizzling",!a&&!r.hidden),r.querySelectorAll("button").forEach(o=>o.disabled=!0)}),n.textContent=`${s?.name??"Driver"} picked ${i.optionName}`,n.hidden=!1,Mh=!0,L.dataset.pickAnimation="fizzle",L.dataset.lastCardChosen=i.optionId,window.setTimeout(Hm,720)}function Hm(){Mh=!1;const i=at;if(!i)return;if(i.phase==="starter_draft"){Dh();return}if(i.phase==="vehicle_select"){mc();return}if(i.phase==="upgrade_draft"){Nh();return}if(i.phase!=="playing"||i.round<=Ro)return;K.starterSelect.hidden=!0,K.vehicleSelect.hidden=!0,K.cardDraft.hidden=!0,K.weaponSelect.classList.remove("draft-open"),L.dataset.starterSelection="complete",L.dataset.vehicleSelection="complete",L.dataset.cardApplied="true",Ia();const e=Ro===0;Ro=i.round,e?(qt=i.round,Pa(),Us(!1),Uh(),ec()):nE(i.round)}function Vm(i){if(at=i,hE(i),!i)return;if(dE(i),fE(i),i.lastPick&&i.lastPick.id>Pf){Pf=i.lastPick.id,xn&&pE(i.lastPick);return}if(!(!xn||Mh)){if(i.phase==="starter_draft"){Dh();return}if(i.phase==="vehicle_select"){mc();return}if(i.phase==="upgrade_draft"){Nh();return}i.phase==="playing"&&i.round>Ro&&Hm()}}async function mE(){const i=localStorage.getItem("rigged-player-name")??"";K.playerName.value=i;const e=bu(new URLSearchParams(location.search).get("room")??"");e&&(K.roomCodeInput.value=e),K.hostRoom.disabled=!0,K.startRun.disabled=!0;try{Lt=await vh.connect(),Lt.onRoom(Vm),K.hostRoom.disabled=!1,K.roomStatus.textContent="Firebase online. Host a room or join a friend."}catch(t){Yi(t),K.roomStatus.textContent="Could not connect to Firebase. Check the network and reload.";return}K.hostRoom.addEventListener("click",async()=>{if(!Lt)return;K.hostRoom.disabled=!0;const t=Wo(K.playerName.value);localStorage.setItem("rigged-player-name",t);try{const n=await Lt.createRoom(t),s=new URL(location.href);s.searchParams.set("room",n),history.replaceState(null,"",s),sessionStorage.removeItem(Xo),He=null}catch(n){Yi(n),K.hostRoom.disabled=!1}}),K.joinRoomForm.addEventListener("submit",async t=>{if(t.preventDefault(),!Lt)return;const n=K.joinRoomForm.querySelector("button");n.disabled=!0;const s=Wo(K.playerName.value);localStorage.setItem("rigged-player-name",s);try{const r=await Lt.joinRoom(K.roomCodeInput.value,s),a=new URL(location.href);a.searchParams.set("room",r),history.replaceState(null,"",a),sessionStorage.removeItem(Xo),He=null}catch(r){Yi(r),n.disabled=!1}}),K.startRun.addEventListener("click",()=>Lt?.startRun().catch(Yi)),K.roomCodeDisplay.addEventListener("click",()=>{at&&(navigator.clipboard?.writeText(at.code).catch(()=>{}),K.roomStatus.textContent="Room code copied.")}),K.roomCodeInput.addEventListener("input",()=>{K.roomCodeInput.value=bu(K.roomCodeInput.value)})}async function gE(i){if(xn||pl)return;pl=!0,Zr.size===0&&(be.children.forEach(t=>Zr.add(t)),kn.forEach(t=>$p.add(t))),Z=cc[i],Tn=Z.radius,Jt(`ASSEMBLING // ${Z.name.toUpperCase()}`),document.querySelectorAll("[data-level]").forEach(t=>t.disabled=!0),await Jp(),await em(),nm(),im(),ab(),ob(),Zr.add(en),Zr.add(Ot),Io(),Z.targets.forEach(t=>dm(t.x,t.z,t.rotation)),qo=!1,Pa(),L.dataset.targetsRemaining=String(Z.targets.length),L.dataset.prototype="rigged-1v1-combat",L.dataset.audioSystem="pooled-stereo-combat-sfx-v3",L.dataset.arenaLayout=Z.id,L.dataset.arenaKind=Z.arenaKind,L.dataset.arenaRadius=String(Tn),L.dataset.ringInnerRadius=String(Z.ringInnerRadius),L.dataset.ringOuterRadius=String(Z.ringOuterRadius),L.dataset.rampColliders=String(Er.filter(t=>t.kind==="ramp").length),L.dataset.bridgeColliders=String(Er.filter(t=>t.kind==="bridge").length),L.dataset.heightfieldColliders=String(Ji.length),L.dataset.majorColliders=String(Ps.length+Nr.length+(Z.arenaKind==="capsule"?3:0)),L.dataset.vehicleCollider="three-disc-capsule-2.24x4.14x0.72",L.dataset.shotsFired="0",L.dataset.aiShotsFired="0",L.dataset.fireHeld="false",L.dataset.arenaDrops="disabled",L.dataset.racekartAssets="modular-racekart-track-hilly",L.dataset.racingAssetsUsage=Z.arenaKind==="capsule"?"rim-railings":"ramps-fences-props",L.dataset.colliderSource=Z.arenaKind==="capsule"?"analytic-capsule-bands":"visual-asset-heightfields",L.dataset.wallRideContact="pending",L.dataset.mapRotation="alternate-in-document",tm(),await Db(),xn=!0,pl=!1,Ti=!1,Us(!1),Uh(),gc();const e=Qi||fr||sa||ra||Zo||Th;e&&!He?(He=Gp("mg",qt),Et="mg",Ca(),Io(),ts("mg",!1),ec()):e&&He?(Et=He.activeTurret,Io(),ts(Et,!1),ec()):Ah?(at={code:"PREVIEW",hostId:"preview-player",phase:"vehicle_select",round:1,players:{"preview-player":{name:"Preview Driver",joinedAt:1},rival:{name:"Rival Driver",joinedAt:2}},playerOrder:["preview-player","rival"],activePickerId:"preview-player",draftOptions:Object.keys(ss),draftTurn:0,pickSequence:0,lastPick:null,vehicleSelections:{},roundReady:{},runState:null,createdAt:1,updatedAt:1},K.multiplayerLobby.hidden=!0,mc()):at&&Vm(at),uc.get("auto")==="1"&&He&&Ia(),uE(),gt!=="ended"&&(Qi||fr||sa||ra||Zo)&&Jt(Qi?"RAMP SUITE // AUTO DRIVE":fr?"ALL RAMPS // AUTO DRIVE":sa?"WALL-RIDE SUITE // AUTO DRIVE":ra?"HOLD-FIRE SMOKE TEST // COMPLETE":"BOOST STAMINA TEST // COMPLETE")}document.querySelectorAll("[data-weapon]").forEach(i=>{i.addEventListener("click",()=>ts(i.dataset.weapon))});document.querySelectorAll("[data-starter-turret]").forEach(i=>{i.addEventListener("click",()=>{Ob(i.dataset.starterTurret)})});ts("mg",!1);Pa();const Cl=new URLSearchParams(location.search).get("level");Ah||mE();gE(Cl&&Cl in cc?Cl:zp);window.addEventListener("keydown",i=>{if(["KeyW","KeyA","KeyS","KeyD","Space","ShiftLeft","KeyC","KeyF","F3","Digit1","Digit2","Digit3"].includes(i.code)&&i.preventDefault(),!(i.repeat||!xn)){if(i.code==="Escape"){zm();return}if(i.code==="KeyC"){rE();return}if(i.code.startsWith("Digit")){const e=["mg","rocket","sniper"][Number(i.code.slice(5))-1];e&&ts(e);return}i.code==="KeyR"&&Us(),(i.code==="KeyB"||i.code==="KeyH"||i.code==="F3")&&sE(),i.code==="KeyF"&&rn(!0),it.add(i.code)}});window.addEventListener("keyup",i=>{it.delete(i.code),i.code==="KeyF"&&rn(!1)});L.addEventListener("pointermove",i=>{const e=L.getBoundingClientRect();Fu.x=(i.clientX-e.left)/e.width*2-1,Fu.y=-(i.clientY-e.top)/e.height*2+1;const t=Be("crosshair");t.style.left=`${i.clientX}px`,t.style.top=`${i.clientY}px`});L.addEventListener("pointerdown",i=>{i.button===0&&rn(!0)});window.addEventListener("pointerup",i=>{i.button===0&&rn(!1)});L.addEventListener("pointerleave",i=>{i.buttons&1&&rn(!1)});L.addEventListener("wheel",i=>{i.preventDefault(),Vb(i.deltaY>0?1:-1)},{passive:!1});window.addEventListener("blur",()=>{it.clear(),rn(!1)});document.addEventListener("visibilitychange",()=>{document.hidden&&(it.clear(),rn(!1))});window.addEventListener("keydown",Ia,{capture:!0});window.addEventListener("pointerdown",Ia,{capture:!0});L.addEventListener("contextmenu",i=>i.preventDefault());Be("controls-close").addEventListener("click",()=>iE());Be("resume-button").addEventListener("click",()=>zm(!1));document.querySelectorAll("[data-key]").forEach(i=>{const e=i.dataset.key??"",t=s=>{s.preventDefault(),e==="Fire"?rn(!0):it.add(e)},n=s=>{s.preventDefault(),e==="Fire"?rn(!1):it.delete(e)};i.addEventListener("pointerdown",t),i.addEventListener("pointerup",n),i.addEventListener("pointercancel",n),i.addEventListener("pointerleave",n)});window.addEventListener("resize",()=>{Rn.aspect=innerWidth/innerHeight,Rn.updateProjectionMatrix(),_n.setSize(innerWidth,innerHeight,!1),_n.setPixelRatio(Math.min(devicePixelRatio,qp))});const _E=new F_;let gs=0,Pl=0,Ll=0,er=1/60,ku=0;function xE(i){if(!Hi||(er=Re.lerp(er,i,.08),Ll+=i,Ll<.2))return;Ll=0;const e=er>0?1/er:0,t=v.grounded?v.activeRamp?v.activeRamp.kind.toUpperCase():Z.arenaKind==="capsule"?"FLAT FLOOR":"TERRAIN":"AIRBORNE",n=Z.arenaKind==="capsule"?3:Ji.length;K.debug.textContent=`COLLISION DEBUG
${t} // ${(L.dataset.surfaceType??"flat-floor").toUpperCase()} // ${L.dataset.surfaceLabel??"base terrain"}
UP [${L.dataset.carUp??"0.00,1.00,0.00"}]  NORMAL [${L.dataset.surfaceNormal??"0.00,1.00,0.00"}]
SURFACE FWD [${L.dataset.projectedForward??"0.00,0.00,1.00"}]
VELOCITY [${L.dataset.velocityVector??"0.00,0.00,0.00"}]  CONTACT N [${L.dataset.wallContactNormal??"0.00,0.00,0.00"}]
ASSIST ${(L.dataset.wallAssist??"off").toUpperCase()}  DOWNFORCE ${L.dataset.wallDownforce??"0.00"}  ROLL ${Re.radToDeg(v.roll).toFixed(1)}°  PITCH ${Re.radToDeg(v.pitch).toFixed(1)}°
SURFACE ${L.dataset.surfaceHeight??"0.00"}M  BASE ${L.dataset.baseGroundHeight??"0.00"}M  ERROR ${L.dataset.heightMismatch??"0.000"}M
${Math.abs(v.speed*4.2).toFixed(0)} KM/H  ${e.toFixed(0)} FPS  ${(er*1e3).toFixed(1)} MS FRAME
${ku.toFixed(2)} MS PHYSICS  60 HZ  ${n} COLLIDERS
${_n.info.render.calls} DRAWS  ${_n.info.render.triangles.toLocaleString()} TRIS  ${be.children.length+Ri.length+ii.length} OBJECTS`,L.dataset.physicsFps="60",L.dataset.frameDeltaMs=(er*1e3).toFixed(2),L.dataset.physicsStepMs=ku.toFixed(2)}function Gm(){requestAnimationFrame(Gm);const i=Math.min(_E.getDelta(),Jw);if(!Ti&&xn&&Qb(),fc.rotation.y+=i*.0025,bh.rotation.y-=i*.0015,yb(i),!Ti&&xn){if(gt==="active"){gs=Math.min(gs+i,zt*Df);const e=performance.now();let t=0;for(;gs>=zt&&t<Df;)Bm(),Tr+=zt,Ds(zt),qb(zt),Im(zt),qf(zt),gs-=zt,t++;ku=performance.now()-e,Jb(gs/zt)}else gs=0,gt==="ended"&&qf(i);Zb(i),Yb(i),Pl+=i,Pl>.1&&(Pl=0,Um())}else gs=0;_n.render(be,Rn),xE(i)}Gm();function Be(i){const e=document.getElementById(i);if(!e)throw new Error(`Missing #${i}`);return e}
