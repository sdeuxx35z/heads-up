var zh=Object.defineProperty;var Hh=(e)=>e;function kh(e,t){this[e]=Hh.bind(null,t)}var Gh=(e,t)=>{for(var n in t)zh(e,n,{get:t[n],enumerable:!0,configurable:!0,set:kh.bind(t,n)})};var Dl=0,Ul=1,er=2;var Di=1000,Fl=1001,Ol=1002,ro=1003,Bl=1004;var zl=1005;var Ui=1006,Hl=1007;var oo=1008;var kl=2300,ao=2301;var Gl=0,tr=1,hs=2;var Ut="srgb",mn="srgb-linear";class oi{addEventListener(e,t){if(this._listeners===void 0)this._listeners={};let n=this._listeners;if(n[e]===void 0)n[e]=[];if(n[e].indexOf(t)===-1)n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let s=i.indexOf(t);if(s!==-1)i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,e);e.target=null}}}var It=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],va=1234567,ss=Math.PI/180,Pi=180/Math.PI;function sn(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(It[e&255]+It[e>>8&255]+It[e>>16&255]+It[e>>24&255]+"-"+It[t&255]+It[t>>8&255]+"-"+It[t>>16&15|64]+It[t>>24&255]+"-"+It[n&63|128]+It[n>>8&255]+"-"+It[n>>16&255]+It[n>>24&255]+It[i&255]+It[i>>8&255]+It[i>>16&255]+It[i>>24&255]).toLowerCase()}function yt(e,t,n){return Math.max(t,Math.min(n,e))}function lo(e,t){return(e%t+t)%t}function Vh(e,t,n,i,s){return i+(e-t)*(s-i)/(n-t)}function Wh(e,t,n){if(e!==t)return(n-e)/(t-e);else return 0}function rs(e,t,n){return(1-n)*e+n*t}function Xh(e,t,n,i){return rs(e,t,1-Math.exp(-n*i))}function qh(e,t=1){return t-Math.abs(lo(e,t*2)-t)}function Yh(e,t,n){if(e<=t)return 0;if(e>=n)return 1;return e=(e-t)/(n-t),e*e*(3-2*e)}function Zh(e,t,n){if(e<=t)return 0;if(e>=n)return 1;return e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10)}function Kh(e,t){return e+Math.floor(Math.random()*(t-e+1))}function $h(e,t){return e+Math.random()*(t-e)}function Jh(e){return e*(0.5-Math.random())}function jh(e){if(e!==void 0)va=e;let t=va+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Qh(e){return e*ss}function eu(e){return e*Pi}function tu(e){return(e&e-1)===0&&e!==0}function nu(e){return Math.pow(2,Math.ceil(Math.log(e)/Math.LN2))}function iu(e){return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))}function su(e,t,n,i,s){let{cos:r,sin:o}=Math,a=r(n/2),l=o(n/2),c=r((t+i)/2),h=o((t+i)/2),u=r((t-i)/2),d=o((t-i)/2),f=r((i-t)/2),g=o((i-t)/2);switch(s){case"XYX":e.set(a*h,l*u,l*d,a*c);break;case"YZY":e.set(l*d,a*h,l*u,a*c);break;case"ZXZ":e.set(l*u,l*d,a*h,a*c);break;case"XZX":e.set(a*h,l*g,l*f,a*c);break;case"YXY":e.set(l*f,a*h,l*g,a*c);break;case"ZYZ":e.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function tn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error("Invalid component type.")}}function tt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error("Invalid component type.")}}var ai={DEG2RAD:ss,RAD2DEG:Pi,generateUUID:sn,clamp:yt,euclideanModulo:lo,mapLinear:Vh,inverseLerp:Wh,lerp:rs,damp:Xh,pingpong:qh,smoothstep:Yh,smootherstep:Zh,randInt:Kh,randFloat:$h,randFloatSpread:Jh,seededRandom:jh,degToRad:Qh,radToDeg:eu,isPowerOfTwo:tu,ceilPowerOfTwo:nu,floorPowerOfTwo:iu,setQuaternionFromProperEuler:su,normalize:tt,denormalize:tn};class ue{constructor(e=0,t=0){ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(yt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*n-r*i+e.x,this.y=s*i+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Fe{constructor(e,t,n,i,s,r,o,a,l){if(Fe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0)this.set(e,t,n,i,s,r,o,a,l)}set(e,t,n,i,s,r,o,a,l){let c=this.elements;return c[0]=e,c[1]=i,c[2]=o,c[3]=t,c[4]=s,c[5]=a,c[6]=n,c[7]=r,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,r=n[0],o=n[3],a=n[6],l=n[1],c=n[4],h=n[7],u=n[2],d=n[5],f=n[8],g=i[0],_=i[3],p=i[6],m=i[1],v=i[4],x=i[7],T=i[2],I=i[5],b=i[8];return s[0]=r*g+o*m+a*T,s[3]=r*_+o*v+a*I,s[6]=r*p+o*x+a*b,s[1]=l*g+c*m+h*T,s[4]=l*_+c*v+h*I,s[7]=l*p+c*x+h*b,s[2]=u*g+d*m+f*T,s[5]=u*_+d*v+f*I,s[8]=u*p+d*x+f*b,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],a=e[6],l=e[7],c=e[8];return t*r*c-t*o*l-n*s*c+n*o*a+i*s*l-i*r*a}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],a=e[6],l=e[7],c=e[8],h=c*r-o*l,u=o*a-c*s,d=l*s-r*a,f=t*h+n*u+i*d;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/f;return e[0]=h*g,e[1]=(i*l-c*n)*g,e[2]=(o*n-i*r)*g,e[3]=u*g,e[4]=(c*t-i*a)*g,e[5]=(i*s-o*t)*g,e[6]=d*g,e[7]=(n*a-l*t)*g,e[8]=(r*t-n*s)*g,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,r,o){let a=Math.cos(s),l=Math.sin(s);return this.set(n*a,n*l,-n*(a*r+l*o)+r+e,-i*l,i*a,-i*(-l*r+a*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Mr.makeScale(e,t)),this}rotate(e){return this.premultiply(Mr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Mr.makeTranslation(e,t)),this}makeTranslation(e,t){if(e.isVector2)this.set(1,0,e.x,0,1,e.y,0,0,1);else this.set(1,0,e,0,1,t,0,0,1);return this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}var Mr=new Fe;function Vl(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function cs(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function ru(){let e=cs("canvas");return e.style.display="block",e}var Ma={};function ns(e){if(e in Ma)return;Ma[e]=!0,console.warn(e)}function ou(e,t,n){return new Promise(function(i,s){function r(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(r,n);break;default:i()}}setTimeout(r,n)})}function au(e){let t=e.elements;t[2]=0.5*t[2]+0.5*t[3],t[6]=0.5*t[6]+0.5*t[7],t[10]=0.5*t[10]+0.5*t[11],t[14]=0.5*t[14]+0.5*t[15]}function lu(e){let t=e.elements;if(t[11]===-1)t[10]=-t[10]-1,t[14]=-t[14];else t[10]=-t[10],t[14]=-t[14]+1}var We={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(e,t,n){if(this.enabled===!1||t===n||!t||!n)return e;if(this.spaces[t].transfer==="srgb")e.r=An(e.r),e.g=An(e.g),e.b=An(e.b);if(this.spaces[t].primaries!==this.spaces[n].primaries)e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ);if(this.spaces[n].transfer==="srgb")e.r=Ii(e.r),e.g=Ii(e.g),e.b=Ii(e.b);return e},fromWorkingColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},toWorkingColorSpace:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){if(e==="")return"linear";return this.spaces[e].transfer},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}};function An(e){return e<0.04045?e*0.0773993808:Math.pow(e*0.9478672986+0.0521327014,2.4)}function Ii(e){return e<0.0031308?e*12.92:1.055*Math.pow(e,0.41666)-0.055}var Sa=[0.64,0.33,0.3,0.6,0.15,0.06],Ea=[0.2126,0.7152,0.0722],Ta=[0.3127,0.329],ba=new Fe().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),wa=new Fe().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);We.define({["srgb-linear"]:{primaries:Sa,whitePoint:Ta,transfer:"linear",toXYZ:ba,fromXYZ:wa,luminanceCoefficients:Ea,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Sa,whitePoint:Ta,transfer:"srgb",toXYZ:ba,fromXYZ:wa,luminanceCoefficients:Ea,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}});var mi;class Wl{static getDataURL(e){if(/^data:/i.test(e.src))return e.src;if(typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{if(mi===void 0)mi=cs("canvas");mi.width=e.width,mi.height=e.height;let n=mi.getContext("2d");if(e instanceof ImageData)n.putImageData(e,0,0);else n.drawImage(e,0,0,e.width,e.height);t=mi}if(t.width>2048||t.height>2048)return console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",0.6);else return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=cs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=An(s[r]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)if(t instanceof Uint8Array||t instanceof Uint8ClampedArray)t[n]=Math.floor(An(t[n]/255)*255);else t[n]=An(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}var cu=0;class co{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:cu++}),this.uuid=sn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){if(e===!0)this.version++}toJSON(e){let t=e===void 0||typeof e==="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,o=i.length;r<o;r++)if(i[r].isDataTexture)s.push(Sr(i[r].image));else s.push(Sr(i[r]))}else s=Sr(i);n.url=s}if(!t)e.images[this.uuid]=n;return n}}function Sr(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap)return Wl.getDataURL(e);else if(e.data)return{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name};else return console.warn("THREE.Texture: Unable to serialize Texture."),{}}var hu=0;class xt extends oi{constructor(e=xt.DEFAULT_IMAGE,t=xt.DEFAULT_MAPPING,n=1001,i=1001,s=1006,r=1008,o=1023,a=1009,l=xt.DEFAULT_ANISOTROPY,c=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=sn(),this.name="",this.source=new co(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=a,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e==="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)n.userData=this.userData;if(!t)e.textures[this.uuid]=n;return n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1000:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(e.x)%2)===1)e.x=Math.ceil(e.x)-e.x;else e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1000:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(e.y)%2)===1)e.y=Math.ceil(e.y)-e.y;else e.y=e.y-Math.floor(e.y);break}if(this.flipY)e.y=1-e.y;return e}set needsUpdate(e){if(e===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(e){if(e===!0)this.pmremVersion++}}xt.DEFAULT_IMAGE=null;xt.DEFAULT_MAPPING=300;xt.DEFAULT_ANISOTROPY=1;class Ze{constructor(e=0,t=0,n=0,i=1){Ze.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*t+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*t+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*t+r[7]*n+r[11]*i+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);if(t<0.0001)this.x=1,this.y=0,this.z=0;else this.x=e.x/t,this.y=e.y/t,this.z=e.z/t;return this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,r=0.01,o=0.1,a=e.elements,l=a[0],c=a[4],h=a[8],u=a[1],d=a[5],f=a[9],g=a[2],_=a[6],p=a[10];if(Math.abs(c-u)<0.01&&Math.abs(h-g)<0.01&&Math.abs(f-_)<0.01){if(Math.abs(c+u)<0.1&&Math.abs(h+g)<0.1&&Math.abs(f+_)<0.1&&Math.abs(l+d+p-3)<0.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(l+1)/2,x=(d+1)/2,T=(p+1)/2,I=(c+u)/4,b=(h+g)/4,A=(f+_)/4;if(v>x&&v>T)if(v<0.01)n=0,i=0.707106781,s=0.707106781;else n=Math.sqrt(v),i=I/n,s=b/n;else if(x>T)if(x<0.01)n=0.707106781,i=0,s=0.707106781;else i=Math.sqrt(x),n=I/i,s=A/i;else if(T<0.01)n=0.707106781,i=0.707106781,s=0;else s=Math.sqrt(T),n=b/s,i=A/s;return this.set(n,i,s,t),this}let m=Math.sqrt((_-f)*(_-f)+(h-g)*(h-g)+(u-c)*(u-c));if(Math.abs(m)<0.001)m=1;return this.x=(_-f)/m,this.y=(h-g)/m,this.z=(u-c)/m,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xl extends oi{constructor(e=1,t=1,n={}){super();this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ze(0,0,e,t),this.scissorTest=!1,this.viewport=new Ze(0,0,e,t);let i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new xt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let r=n.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);if(this.texture.source=new co(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null)this.depthTexture=e.depthTexture.clone();return this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wn extends Xl{constructor(e=1,t=1,n={}){super(e,t,n);this.isWebGLRenderTarget=!0}}class ho extends xt{constructor(e=null,t=1,n=1,i=1){super(null);this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ql extends xt{constructor(e=null,t=1,n=1,i=1){super(null);this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,r,o){let a=n[i+0],l=n[i+1],c=n[i+2],h=n[i+3],u=s[r+0],d=s[r+1],f=s[r+2],g=s[r+3];if(o===0){e[t+0]=a,e[t+1]=l,e[t+2]=c,e[t+3]=h;return}if(o===1){e[t+0]=u,e[t+1]=d,e[t+2]=f,e[t+3]=g;return}if(h!==g||a!==u||l!==d||c!==f){let _=1-o,p=a*u+l*d+c*f+h*g,m=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let T=Math.sqrt(v),I=Math.atan2(T,p*m);_=Math.sin(_*I)/T,o=Math.sin(o*I)/T}let x=o*m;if(a=a*_+u*x,l=l*_+d*x,c=c*_+f*x,h=h*_+g*x,_===1-o){let T=1/Math.sqrt(a*a+l*l+c*c+h*h);a*=T,l*=T,c*=T,h*=T}}e[t]=a,e[t+1]=l,e[t+2]=c,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,r){let o=n[i],a=n[i+1],l=n[i+2],c=n[i+3],h=s[r],u=s[r+1],d=s[r+2],f=s[r+3];return e[t]=o*f+c*h+a*d-l*u,e[t+1]=a*f+c*u+l*h-o*d,e[t+2]=l*f+c*d+o*u-a*h,e[t+3]=c*f-o*h-a*u-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let{_x:n,_y:i,_z:s,_order:r}=e,o=Math.cos,a=Math.sin,l=o(n/2),c=o(i/2),h=o(s/2),u=a(n/2),d=a(i/2),f=a(s/2);switch(r){case"XYZ":this._x=u*c*h+l*d*f,this._y=l*d*h-u*c*f,this._z=l*c*f+u*d*h,this._w=l*c*h-u*d*f;break;case"YXZ":this._x=u*c*h+l*d*f,this._y=l*d*h-u*c*f,this._z=l*c*f-u*d*h,this._w=l*c*h+u*d*f;break;case"ZXY":this._x=u*c*h-l*d*f,this._y=l*d*h+u*c*f,this._z=l*c*f+u*d*h,this._w=l*c*h-u*d*f;break;case"ZYX":this._x=u*c*h-l*d*f,this._y=l*d*h+u*c*f,this._z=l*c*f-u*d*h,this._w=l*c*h+u*d*f;break;case"YZX":this._x=u*c*h+l*d*f,this._y=l*d*h+u*c*f,this._z=l*c*f-u*d*h,this._w=l*c*h-u*d*f;break;case"XZY":this._x=u*c*h-l*d*f,this._y=l*d*h-u*c*f,this._z=l*c*f+u*d*h,this._w=l*c*h+u*d*f;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}if(t===!0)this._onChangeCallback();return this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10],u=n+o+h;if(u>0){let d=0.5/Math.sqrt(u+1);this._w=0.25/d,this._x=(c-a)*d,this._y=(s-l)*d,this._z=(r-i)*d}else if(n>o&&n>h){let d=2*Math.sqrt(1+n-o-h);this._w=(c-a)/d,this._x=0.25*d,this._y=(i+r)/d,this._z=(s+l)/d}else if(o>h){let d=2*Math.sqrt(1+o-n-h);this._w=(s-l)/d,this._x=(i+r)/d,this._y=0.25*d,this._z=(a+c)/d}else{let d=2*Math.sqrt(1+h-n-o);this._w=(r-i)/d,this._x=(s+l)/d,this._y=(a+c)/d,this._z=0.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;if(n<Number.EPSILON)if(n=0,Math.abs(e.x)>Math.abs(e.z))this._x=-e.y,this._y=e.x,this._z=0,this._w=n;else this._x=0,this._y=-e.z,this._z=e.y,this._w=n;else this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n;return this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(yt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();if(e===0)this._x=0,this._y=0,this._z=0,this._w=1;else e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e;return this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let{_x:n,_y:i,_z:s,_w:r}=e,o=t._x,a=t._y,l=t._z,c=t._w;return this._x=n*c+r*o+i*l-s*a,this._y=i*c+r*a+s*o-n*l,this._z=s*c+r*l+n*a-i*o,this._w=r*c-n*o-i*a-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,r=this._w,o=r*e._w+n*e._x+i*e._y+s*e._z;if(o<0)this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o;else this.copy(e);if(o>=1)return this._w=r,this._x=n,this._y=i,this._z=s,this;let a=1-o*o;if(a<=Number.EPSILON){let d=1-t;return this._w=d*r+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}let l=Math.sqrt(a),c=Math.atan2(l,o),h=Math.sin((1-t)*c)/l,u=Math.sin(t*c)/l;return this._w=r*h+this._w*u,this._x=n*h+this._x*u,this._y=i*h+this._y*u,this._z=s*h+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(e=0,t=0,n=0){w.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){if(n===void 0)n=this.z;return this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Aa.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Aa.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,r=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,r=e.y,o=e.z,a=e.w,l=2*(r*i-o*n),c=2*(o*t-s*i),h=2*(s*n-r*t);return this.x=t+a*l+r*h-o*c,this.y=n+a*c+o*l-s*h,this.z=i+a*h+s*c-r*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let{x:n,y:i,z:s}=e,r=t.x,o=t.y,a=t.z;return this.x=i*a-s*o,this.y=s*r-n*a,this.z=n*o-i*r,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Er.copy(this).projectOnVector(e),this.sub(Er)}reflect(e){return this.sub(Er.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(yt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var Er=new w,Aa=new qt;class on{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=jt.copy(t).multiplyScalar(0.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++){if(e.isMesh===!0)e.getVertexPosition(r,jt);else jt.fromBufferAttribute(s,r);jt.applyMatrix4(e.matrixWorld),this.expandByPoint(jt)}else{if(e.boundingBox!==void 0){if(e.boundingBox===null)e.computeBoundingBox();Es.copy(e.boundingBox)}else{if(n.boundingBox===null)n.computeBoundingBox();Es.copy(n.boundingBox)}Es.applyMatrix4(e.matrixWorld),this.union(Es)}}let i=e.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jt),jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;if(e.normal.x>0)t=e.normal.x*this.min.x,n=e.normal.x*this.max.x;else t=e.normal.x*this.max.x,n=e.normal.x*this.min.x;if(e.normal.y>0)t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y;else t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y;if(e.normal.z>0)t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z;else t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z;return t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zi),Ts.subVectors(this.max,Zi),gi.subVectors(e.a,Zi),_i.subVectors(e.b,Zi),xi.subVectors(e.c,Zi),Fn.subVectors(_i,gi),On.subVectors(xi,_i),jn.subVectors(gi,xi);let t=[0,-Fn.z,Fn.y,0,-On.z,On.y,0,-jn.z,jn.y,Fn.z,0,-Fn.x,On.z,0,-On.x,jn.z,0,-jn.x,-Fn.y,Fn.x,0,-On.y,On.x,0,-jn.y,jn.x,0];if(!Tr(t,gi,_i,xi,Ts))return!1;if(t=[1,0,0,0,1,0,0,0,1],!Tr(t,gi,_i,xi,Ts))return!1;return bs.crossVectors(Fn,On),t=[bs.x,bs.y,bs.z],Tr(t,gi,_i,xi,Ts)}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jt).distanceTo(e)}getBoundingSphere(e){if(this.isEmpty())e.makeEmpty();else this.getCenter(e.center),e.radius=this.getSize(jt).length()*0.5;return e}intersect(e){if(this.min.max(e.min),this.max.min(e.max),this.isEmpty())this.makeEmpty();return this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){if(this.isEmpty())return this;return Mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mn),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}var Mn=[new w,new w,new w,new w,new w,new w,new w,new w],jt=new w,Es=new on,gi=new w,_i=new w,xi=new w,Fn=new w,On=new w,jn=new w,Zi=new w,Ts=new w,bs=new w,Qn=new w;function Tr(e,t,n,i,s){for(let r=0,o=e.length-3;r<=o;r+=3){Qn.fromArray(e,r);let a=s.x*Math.abs(Qn.x)+s.y*Math.abs(Qn.y)+s.z*Math.abs(Qn.z),l=t.dot(Qn),c=n.dot(Qn),h=i.dot(Qn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var uu=new on,Ki=new w,br=new w;class Yt{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;if(t!==void 0)n.copy(t);else uu.setFromPoints(e).getCenter(n);let i=0;for(let s=0,r=e.length;s<r;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);if(t.copy(e),n>this.radius*this.radius)t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center);return t}getBoundingBox(e){if(this.isEmpty())return e.makeEmpty(),e;return e.set(this.center,this.center),e.expandByScalar(this.radius),e}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ki.subVectors(e,this.center);let t=Ki.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*0.5;this.center.addScaledVector(Ki,i/n),this.radius+=i}return this}union(e){if(e.isEmpty())return this;if(this.isEmpty())return this.copy(e),this;if(this.center.equals(e.center)===!0)this.radius=Math.max(this.radius,e.radius);else br.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ki.copy(e.center).add(br)),this.expandByPoint(Ki.copy(e.center).sub(br));return this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}var Sn=new w,wr=new w,ws=new w,Bn=new w,Ar=new w,As=new w,Rr=new w;class Fi{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);if(n<0)return t.copy(this.origin);return t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Sn.subVectors(e,this.origin).dot(this.direction);if(t<0)return this.origin.distanceToSquared(e);return Sn.copy(this.origin).addScaledVector(this.direction,t),Sn.distanceToSquared(e)}distanceSqToSegment(e,t,n,i){wr.copy(e).add(t).multiplyScalar(0.5),ws.copy(t).sub(e).normalize(),Bn.copy(this.origin).sub(wr);let s=e.distanceTo(t)*0.5,r=-this.direction.dot(ws),o=Bn.dot(this.direction),a=-Bn.dot(ws),l=Bn.lengthSq(),c=Math.abs(1-r*r),h,u,d,f;if(c>0)if(h=r*a-o,u=r*o-a,f=s*c,h>=0)if(u>=-f)if(u<=f){let g=1/c;h*=g,u*=g,d=h*(h+r*u+2*o)+u*(r*h+u+2*a)+l}else u=s,h=Math.max(0,-(r*u+o)),d=-h*h+u*(u+2*a)+l;else u=-s,h=Math.max(0,-(r*u+o)),d=-h*h+u*(u+2*a)+l;else if(u<=-f)h=Math.max(0,-(-r*s+o)),u=h>0?-s:Math.min(Math.max(-s,-a),s),d=-h*h+u*(u+2*a)+l;else if(u<=f)h=0,u=Math.min(Math.max(-s,-a),s),d=u*(u+2*a)+l;else h=Math.max(0,-(r*s+o)),u=h>0?s:Math.min(Math.max(-s,-a),s),d=-h*h+u*(u+2*a)+l;else u=r>0?-s:s,h=Math.max(0,-(r*u+o)),d=-h*h+u*(u+2*a)+l;if(n)n.copy(this.origin).addScaledVector(this.direction,h);if(i)i.copy(wr).addScaledVector(ws,u);return d}intersectSphere(e,t){Sn.subVectors(e.center,this.origin);let n=Sn.dot(this.direction),i=Sn.dot(Sn)-n*n,s=e.radius*e.radius;if(i>s)return null;let r=Math.sqrt(s-i),o=n-r,a=n+r;if(a<0)return null;if(o<0)return this.at(a,t);return this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0){if(e.distanceToPoint(this.origin)===0)return 0;return null}let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);if(n===null)return null;return this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);if(t===0)return!0;if(e.normal.dot(this.direction)*t<0)return!0;return!1}intersectBox(e,t){let n,i,s,r,o,a,l=1/this.direction.x,c=1/this.direction.y,h=1/this.direction.z,u=this.origin;if(l>=0)n=(e.min.x-u.x)*l,i=(e.max.x-u.x)*l;else n=(e.max.x-u.x)*l,i=(e.min.x-u.x)*l;if(c>=0)s=(e.min.y-u.y)*c,r=(e.max.y-u.y)*c;else s=(e.max.y-u.y)*c,r=(e.min.y-u.y)*c;if(n>r||s>i)return null;if(s>n||isNaN(n))n=s;if(r<i||isNaN(i))i=r;if(h>=0)o=(e.min.z-u.z)*h,a=(e.max.z-u.z)*h;else o=(e.max.z-u.z)*h,a=(e.min.z-u.z)*h;if(n>a||o>i)return null;if(o>n||n!==n)n=o;if(a<i||i!==i)i=a;if(i<0)return null;return this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Sn)!==null}intersectTriangle(e,t,n,i,s){Ar.subVectors(t,e),As.subVectors(n,e),Rr.crossVectors(Ar,As);let r=this.direction.dot(Rr),o;if(r>0){if(i)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Bn.subVectors(this.origin,e);let a=o*this.direction.dot(As.crossVectors(Bn,As));if(a<0)return null;let l=o*this.direction.dot(Ar.cross(Bn));if(l<0)return null;if(a+l>r)return null;let c=-o*Bn.dot(Rr);if(c<0)return null;return this.at(c/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Re{constructor(e,t,n,i,s,r,o,a,l,c,h,u,d,f,g,_){if(Re.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0)this.set(e,t,n,i,s,r,o,a,l,c,h,u,d,f,g,_)}set(e,t,n,i,s,r,o,a,l,c,h,u,d,f,g,_){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=r,p[9]=o,p[13]=a,p[2]=l,p[6]=c,p[10]=h,p[14]=u,p[3]=d,p[7]=f,p[11]=g,p[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Re().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/yi.setFromMatrixColumn(e,0).length(),s=1/yi.setFromMatrixColumn(e,1).length(),r=1/yi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,r=Math.cos(n),o=Math.sin(n),a=Math.cos(i),l=Math.sin(i),c=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){let u=r*c,d=r*h,f=o*c,g=o*h;t[0]=a*c,t[4]=-a*h,t[8]=l,t[1]=d+f*l,t[5]=u-g*l,t[9]=-o*a,t[2]=g-u*l,t[6]=f+d*l,t[10]=r*a}else if(e.order==="YXZ"){let u=a*c,d=a*h,f=l*c,g=l*h;t[0]=u+g*o,t[4]=f*o-d,t[8]=r*l,t[1]=r*h,t[5]=r*c,t[9]=-o,t[2]=d*o-f,t[6]=g+u*o,t[10]=r*a}else if(e.order==="ZXY"){let u=a*c,d=a*h,f=l*c,g=l*h;t[0]=u-g*o,t[4]=-r*h,t[8]=f+d*o,t[1]=d+f*o,t[5]=r*c,t[9]=g-u*o,t[2]=-r*l,t[6]=o,t[10]=r*a}else if(e.order==="ZYX"){let u=r*c,d=r*h,f=o*c,g=o*h;t[0]=a*c,t[4]=f*l-d,t[8]=u*l+g,t[1]=a*h,t[5]=g*l+u,t[9]=d*l-f,t[2]=-l,t[6]=o*a,t[10]=r*a}else if(e.order==="YZX"){let u=r*a,d=r*l,f=o*a,g=o*l;t[0]=a*c,t[4]=g-u*h,t[8]=f*h+d,t[1]=h,t[5]=r*c,t[9]=-o*c,t[2]=-l*c,t[6]=d*h+f,t[10]=u-g*h}else if(e.order==="XZY"){let u=r*a,d=r*l,f=o*a,g=o*l;t[0]=a*c,t[4]=-h,t[8]=l*c,t[1]=u*h+g,t[5]=r*c,t[9]=d*h-f,t[2]=f*h-d,t[6]=o*c,t[10]=g*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(du,e,fu)}lookAt(e,t,n){let i=this.elements;if(Ht.subVectors(e,t),Ht.lengthSq()===0)Ht.z=1;if(Ht.normalize(),zn.crossVectors(n,Ht),zn.lengthSq()===0){if(Math.abs(n.z)===1)Ht.x+=0.0001;else Ht.z+=0.0001;Ht.normalize(),zn.crossVectors(n,Ht)}return zn.normalize(),Rs.crossVectors(Ht,zn),i[0]=zn.x,i[4]=Rs.x,i[8]=Ht.x,i[1]=zn.y,i[5]=Rs.y,i[9]=Ht.y,i[2]=zn.z,i[6]=Rs.z,i[10]=Ht.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,r=n[0],o=n[4],a=n[8],l=n[12],c=n[1],h=n[5],u=n[9],d=n[13],f=n[2],g=n[6],_=n[10],p=n[14],m=n[3],v=n[7],x=n[11],T=n[15],I=i[0],b=i[4],A=i[8],F=i[12],S=i[1],E=i[5],C=i[9],z=i[13],k=i[2],G=i[6],K=i[10],V=i[14],j=i[3],H=i[7],ce=i[11],de=i[15];return s[0]=r*I+o*S+a*k+l*j,s[4]=r*b+o*E+a*G+l*H,s[8]=r*A+o*C+a*K+l*ce,s[12]=r*F+o*z+a*V+l*de,s[1]=c*I+h*S+u*k+d*j,s[5]=c*b+h*E+u*G+d*H,s[9]=c*A+h*C+u*K+d*ce,s[13]=c*F+h*z+u*V+d*de,s[2]=f*I+g*S+_*k+p*j,s[6]=f*b+g*E+_*G+p*H,s[10]=f*A+g*C+_*K+p*ce,s[14]=f*F+g*z+_*V+p*de,s[3]=m*I+v*S+x*k+T*j,s[7]=m*b+v*E+x*G+T*H,s[11]=m*A+v*C+x*K+T*ce,s[15]=m*F+v*z+x*V+T*de,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],r=e[1],o=e[5],a=e[9],l=e[13],c=e[2],h=e[6],u=e[10],d=e[14],f=e[3],g=e[7],_=e[11],p=e[15];return f*(+s*a*h-i*l*h-s*o*u+n*l*u+i*o*d-n*a*d)+g*(+t*a*d-t*l*u+s*r*u-i*r*d+i*l*c-s*a*c)+_*(+t*l*h-t*o*d-s*r*h+n*r*d+s*o*c-n*l*c)+p*(-i*o*c-t*a*h+t*o*u+i*r*h-n*r*u+n*a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;if(e.isVector3)i[12]=e.x,i[13]=e.y,i[14]=e.z;else i[12]=e,i[13]=t,i[14]=n;return this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],a=e[6],l=e[7],c=e[8],h=e[9],u=e[10],d=e[11],f=e[12],g=e[13],_=e[14],p=e[15],m=h*_*l-g*u*l+g*a*d-o*_*d-h*a*p+o*u*p,v=f*u*l-c*_*l-f*a*d+r*_*d+c*a*p-r*u*p,x=c*g*l-f*h*l+f*o*d-r*g*d-c*o*p+r*h*p,T=f*h*a-c*g*a-f*o*u+r*g*u+c*o*_-r*h*_,I=t*m+n*v+i*x+s*T;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let b=1/I;return e[0]=m*b,e[1]=(g*u*s-h*_*s-g*i*d+n*_*d+h*i*p-n*u*p)*b,e[2]=(o*_*s-g*a*s+g*i*l-n*_*l-o*i*p+n*a*p)*b,e[3]=(h*a*s-o*u*s-h*i*l+n*u*l+o*i*d-n*a*d)*b,e[4]=v*b,e[5]=(c*_*s-f*u*s+f*i*d-t*_*d-c*i*p+t*u*p)*b,e[6]=(f*a*s-r*_*s-f*i*l+t*_*l+r*i*p-t*a*p)*b,e[7]=(r*u*s-c*a*s+c*i*l-t*u*l-r*i*d+t*a*d)*b,e[8]=x*b,e[9]=(f*h*s-c*g*s-f*n*d+t*g*d+c*n*p-t*h*p)*b,e[10]=(r*g*s-f*o*s+f*n*l-t*g*l-r*n*p+t*o*p)*b,e[11]=(c*o*s-r*h*s-c*n*l+t*h*l+r*n*d-t*o*d)*b,e[12]=T*b,e[13]=(c*g*i-f*h*i+f*n*u-t*g*u-c*n*_+t*h*_)*b,e[14]=(f*o*i-r*g*i-f*n*a+t*g*a+r*n*_-t*o*_)*b,e[15]=(r*h*i-c*o*i+c*n*a-t*h*a-r*n*u+t*o*u)*b,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){if(e.isVector3)this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1);else this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1);return this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,r=e.x,o=e.y,a=e.z,l=s*r,c=s*o;return this.set(l*r+n,l*o-i*a,l*a+i*o,0,l*o+i*a,c*o+n,c*a-i*r,0,l*a-i*o,c*a+i*r,s*a*a+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,r){return this.set(1,n,s,0,e,1,r,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,r=t._y,o=t._z,a=t._w,l=s+s,c=r+r,h=o+o,u=s*l,d=s*c,f=s*h,g=r*c,_=r*h,p=o*h,m=a*l,v=a*c,x=a*h,T=n.x,I=n.y,b=n.z;return i[0]=(1-(g+p))*T,i[1]=(d+x)*T,i[2]=(f-v)*T,i[3]=0,i[4]=(d-x)*I,i[5]=(1-(u+p))*I,i[6]=(_+m)*I,i[7]=0,i[8]=(f+v)*b,i[9]=(_-m)*b,i[10]=(1-(u+g))*b,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=yi.set(i[0],i[1],i[2]).length(),r=yi.set(i[4],i[5],i[6]).length(),o=yi.set(i[8],i[9],i[10]).length();if(this.determinant()<0)s=-s;e.x=i[12],e.y=i[13],e.z=i[14],Qt.copy(this);let l=1/s,c=1/r,h=1/o;return Qt.elements[0]*=l,Qt.elements[1]*=l,Qt.elements[2]*=l,Qt.elements[4]*=c,Qt.elements[5]*=c,Qt.elements[6]*=c,Qt.elements[8]*=h,Qt.elements[9]*=h,Qt.elements[10]*=h,t.setFromRotationMatrix(Qt),n.x=s,n.y=r,n.z=o,this}makePerspective(e,t,n,i,s,r,o=2000){let a=this.elements,l=2*s/(t-e),c=2*s/(n-i),h=(t+e)/(t-e),u=(n+i)/(n-i),d,f;if(o===2000)d=-(r+s)/(r-s),f=-2*r*s/(r-s);else if(o===2001)d=-r/(r-s),f=-r*s/(r-s);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return a[0]=l,a[4]=0,a[8]=h,a[12]=0,a[1]=0,a[5]=c,a[9]=u,a[13]=0,a[2]=0,a[6]=0,a[10]=d,a[14]=f,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(e,t,n,i,s,r,o=2000){let a=this.elements,l=1/(t-e),c=1/(n-i),h=1/(r-s),u=(t+e)*l,d=(n+i)*c,f,g;if(o===2000)f=(r+s)*h,g=-2*h;else if(o===2001)f=s*h,g=-1*h;else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return a[0]=2*l,a[4]=0,a[8]=0,a[12]=-u,a[1]=0,a[5]=2*c,a[9]=0,a[13]=-d,a[2]=0,a[6]=0,a[10]=g,a[14]=-f,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}var yi=new w,Qt=new Re,du=new w(0,0,0),fu=new w(1,1,1),zn=new w,Rs=new w,Ht=new w,Ra=new Re,Ca=new qt;class rn{constructor(e=0,t=0,n=0,i=rn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],r=i[4],o=i[8],a=i[1],l=i[5],c=i[9],h=i[2],u=i[6],d=i[10];switch(t){case"XYZ":if(this._y=Math.asin(yt(o,-1,1)),Math.abs(o)<0.9999999)this._x=Math.atan2(-c,d),this._z=Math.atan2(-r,s);else this._x=Math.atan2(u,l),this._z=0;break;case"YXZ":if(this._x=Math.asin(-yt(c,-1,1)),Math.abs(c)<0.9999999)this._y=Math.atan2(o,d),this._z=Math.atan2(a,l);else this._y=Math.atan2(-h,s),this._z=0;break;case"ZXY":if(this._x=Math.asin(yt(u,-1,1)),Math.abs(u)<0.9999999)this._y=Math.atan2(-h,d),this._z=Math.atan2(-r,l);else this._y=0,this._z=Math.atan2(a,s);break;case"ZYX":if(this._y=Math.asin(-yt(h,-1,1)),Math.abs(h)<0.9999999)this._x=Math.atan2(u,d),this._z=Math.atan2(a,s);else this._x=0,this._z=Math.atan2(-r,l);break;case"YZX":if(this._z=Math.asin(yt(a,-1,1)),Math.abs(a)<0.9999999)this._x=Math.atan2(-c,l),this._y=Math.atan2(-h,s);else this._x=0,this._y=Math.atan2(o,d);break;case"XZY":if(this._z=Math.asin(-yt(r,-1,1)),Math.abs(r)<0.9999999)this._x=Math.atan2(u,l),this._y=Math.atan2(o,s);else this._x=Math.atan2(-c,d),this._y=0;break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}if(this._order=t,n===!0)this._onChangeCallback();return this}setFromQuaternion(e,t,n){return Ra.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ra,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ca.setFromEuler(this),this.setFromQuaternion(Ca,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){if(this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0)this._order=e[3];return this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}rn.DEFAULT_ORDER="XYZ";class nr{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}var pu=0,Ia=new w,vi=new qt,En=new Re,Cs=new w,$i=new w,mu=new w,gu=new qt,Pa=new w(1,0,0),La=new w(0,1,0),Na=new w(0,0,1),Da={type:"added"},_u={type:"removed"},Mi={type:"childadded",child:null},Cr={type:"childremoved",child:null};class ot extends oi{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:pu++}),this.uuid=sn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ot.DEFAULT_UP.clone();let e=new w,t=new rn,n=new qt,i=new w(1,1,1);function s(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Re},normalMatrix:{value:new Fe}}),this.matrix=new Re,this.matrixWorld=new Re,this.matrixAutoUpdate=ot.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return vi.setFromAxisAngle(e,t),this.quaternion.multiply(vi),this}rotateOnWorldAxis(e,t){return vi.setFromAxisAngle(e,t),this.quaternion.premultiply(vi),this}rotateX(e){return this.rotateOnAxis(Pa,e)}rotateY(e){return this.rotateOnAxis(La,e)}rotateZ(e){return this.rotateOnAxis(Na,e)}translateOnAxis(e,t){return Ia.copy(e).applyQuaternion(this.quaternion),this.position.add(Ia.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Pa,e)}translateY(e){return this.translateOnAxis(La,e)}translateZ(e){return this.translateOnAxis(Na,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(En.copy(this.matrixWorld).invert())}lookAt(e,t,n){if(e.isVector3)Cs.copy(e);else Cs.set(e,t,n);let i=this.parent;if(this.updateWorldMatrix(!0,!1),$i.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)En.lookAt($i,Cs,this.up);else En.lookAt(Cs,$i,this.up);if(this.quaternion.setFromRotationMatrix(En),i)En.extractRotation(i.matrixWorld),vi.setFromRotationMatrix(En),this.quaternion.premultiply(vi.invert())}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}if(e===this)return console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this;if(e&&e.isObject3D)e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Da),Mi.child=e,this.dispatchEvent(Mi),Mi.child=null;else console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e);return this}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);if(t!==-1)e.parent=null,this.children.splice(t,1),e.dispatchEvent(_u),Cr.child=e,this.dispatchEvent(Cr),Cr.child=null;return this}removeFromParent(){let e=this.parent;if(e!==null)e.remove(this);return this}clear(){return this.remove(...this.children)}attach(e){if(this.updateWorldMatrix(!0,!1),En.copy(this.matrixWorld).invert(),e.parent!==null)e.parent.updateWorldMatrix(!0,!1),En.multiply(e.parent.matrixWorld);return e.applyMatrix4(En),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Da),Mi.child=e,this.dispatchEvent(Mi),Mi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}return}getObjectsByProperty(e,t,n=[]){if(this[e]===t)n.push(this);let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($i,e,mu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($i,gu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;if(t!==null)e(t),t.traverseAncestors(e)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||e){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,e=!0}let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null)n.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);if(t===!0){let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e==="string",n={};if(t)e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"};let i={};if(i.uuid=this.uuid,i.type=this.type,this.name!=="")i.name=this.name;if(this.castShadow===!0)i.castShadow=!0;if(this.receiveShadow===!0)i.receiveShadow=!0;if(this.visible===!1)i.visible=!1;if(this.frustumCulled===!1)i.frustumCulled=!1;if(this.renderOrder!==0)i.renderOrder=this.renderOrder;if(Object.keys(this.userData).length>0)i.userData=this.userData;if(i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1)i.matrixAutoUpdate=!1;if(this.isInstancedMesh){if(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)i.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map((o)=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null)i.colorsTexture=this._colorsTexture.toJSON(e);if(this.boundingSphere!==null)i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius};if(this.boundingBox!==null)i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}}function s(o,a){if(o[a.uuid]===void 0)o[a.uuid]=a.toJSON(e);return a.uuid}if(this.isScene){if(this.background){if(this.background.isColor)i.background=this.background.toJSON();else if(this.background.isTexture)i.background=this.background.toJSON(e).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)i.environment=this.environment.toJSON(e).uuid}else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let a=o.shapes;if(Array.isArray(a))for(let l=0,c=a.length;l<c;l++){let h=a[l];s(e.shapes,h)}else s(e.shapes,a)}}if(this.isSkinnedMesh){if(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let a=0,l=this.material.length;a<l;a++)o.push(s(e.materials,this.material[a]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let a=this.animations[o];i.animations.push(s(e.animations,a))}}if(t){let o=r(e.geometries),a=r(e.materials),l=r(e.textures),c=r(e.images),h=r(e.shapes),u=r(e.skeletons),d=r(e.animations),f=r(e.nodes);if(o.length>0)n.geometries=o;if(a.length>0)n.materials=a;if(l.length>0)n.textures=l;if(c.length>0)n.images=c;if(h.length>0)n.shapes=h;if(u.length>0)n.skeletons=u;if(d.length>0)n.animations=d;if(f.length>0)n.nodes=f}return n.object=i,n;function r(o){let a=[];for(let l in o){let c=o[l];delete c.metadata,a.push(c)}return a}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}}ot.DEFAULT_UP=new w(0,1,0);ot.DEFAULT_MATRIX_AUTO_UPDATE=!0;ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var en=new w,Tn=new w,Ir=new w,bn=new w,Si=new w,Ei=new w,Ua=new w,Pr=new w,Lr=new w,Nr=new w,Dr=new Ze,Ur=new Ze,Fr=new Ze;class nn{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),en.subVectors(e,t),i.cross(en);let s=i.lengthSq();if(s>0)return i.multiplyScalar(1/Math.sqrt(s));return i.set(0,0,0)}static getBarycoord(e,t,n,i,s){en.subVectors(i,t),Tn.subVectors(n,t),Ir.subVectors(e,t);let r=en.dot(en),o=en.dot(Tn),a=en.dot(Ir),l=Tn.dot(Tn),c=Tn.dot(Ir),h=r*l-o*o;if(h===0)return s.set(0,0,0),null;let u=1/h,d=(l*a-o*c)*u,f=(r*c-o*a)*u;return s.set(1-d-f,f,d)}static containsPoint(e,t,n,i){if(this.getBarycoord(e,t,n,i,bn)===null)return!1;return bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(e,t,n,i,s,r,o,a){if(this.getBarycoord(e,t,n,i,bn)===null){if(a.x=0,a.y=0,"z"in a)a.z=0;if("w"in a)a.w=0;return null}return a.setScalar(0),a.addScaledVector(s,bn.x),a.addScaledVector(r,bn.y),a.addScaledVector(o,bn.z),a}static getInterpolatedAttribute(e,t,n,i,s,r){return Dr.setScalar(0),Ur.setScalar(0),Fr.setScalar(0),Dr.fromBufferAttribute(e,t),Ur.fromBufferAttribute(e,n),Fr.fromBufferAttribute(e,i),r.setScalar(0),r.addScaledVector(Dr,s.x),r.addScaledVector(Ur,s.y),r.addScaledVector(Fr,s.z),r}static isFrontFacing(e,t,n,i){return en.subVectors(n,t),Tn.subVectors(e,t),en.cross(Tn).dot(i)<0?!0:!1}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return en.subVectors(this.c,this.b),Tn.subVectors(this.a,this.b),en.cross(Tn).length()*0.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(e){return nn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return nn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return nn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return nn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return nn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,r,o;Si.subVectors(i,n),Ei.subVectors(s,n),Pr.subVectors(e,n);let a=Si.dot(Pr),l=Ei.dot(Pr);if(a<=0&&l<=0)return t.copy(n);Lr.subVectors(e,i);let c=Si.dot(Lr),h=Ei.dot(Lr);if(c>=0&&h<=c)return t.copy(i);let u=a*h-c*l;if(u<=0&&a>=0&&c<=0)return r=a/(a-c),t.copy(n).addScaledVector(Si,r);Nr.subVectors(e,s);let d=Si.dot(Nr),f=Ei.dot(Nr);if(f>=0&&d<=f)return t.copy(s);let g=d*l-a*f;if(g<=0&&l>=0&&f<=0)return o=l/(l-f),t.copy(n).addScaledVector(Ei,o);let _=c*f-d*h;if(_<=0&&h-c>=0&&d-f>=0)return Ua.subVectors(s,i),o=(h-c)/(h-c+(d-f)),t.copy(i).addScaledVector(Ua,o);let p=1/(_+g+u);return r=g*p,o=u*p,t.copy(n).addScaledVector(Si,r).addScaledVector(Ei,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}var Yl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hn={h:0,s:0,l:0},Is={h:0,s:0,l:0};function Or(e,t,n){if(n<0)n+=1;if(n>1)n-=1;if(n<0.16666666666666666)return e+(t-e)*6*n;if(n<0.5)return t;if(n<0.6666666666666666)return e+(t-e)*6*(0.6666666666666666-n);return e}class Ee{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;if(i&&i.isColor)this.copy(i);else if(typeof i==="number")this.setHex(i);else if(typeof i==="string")this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t="srgb"){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,We.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=We.workingColorSpace){return this.r=e,this.g=t,this.b=n,We.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=We.workingColorSpace){if(e=lo(e,1),t=yt(t,0,1),n=yt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=0.5?n*(1+t):n+t-n*t,r=2*n-s;this.r=Or(r,s,e+0.3333333333333333),this.g=Or(r,s,e),this.b=Or(r,s,e-0.3333333333333333)}return We.toWorkingColorSpace(this,i),this}setStyle(e,t="srgb"){function n(s){if(s===void 0)return;if(parseFloat(s)<1)console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,r=i[1],o=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);else if(r===6)return this.setHex(parseInt(s,16),t);else console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t="srgb"){let n=Yl[e.toLowerCase()];if(n!==void 0)this.setHex(n,t);else console.warn("THREE.Color: Unknown color "+e);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=An(e.r),this.g=An(e.g),this.b=An(e.b),this}copyLinearToSRGB(e){return this.r=Ii(e.r),this.g=Ii(e.g),this.b=Ii(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e="srgb"){return We.fromWorkingColorSpace(Pt.copy(this),e),Math.round(yt(Pt.r*255,0,255))*65536+Math.round(yt(Pt.g*255,0,255))*256+Math.round(yt(Pt.b*255,0,255))}getHexString(e="srgb"){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=We.workingColorSpace){We.fromWorkingColorSpace(Pt.copy(this),t);let{r:n,g:i,b:s}=Pt,r=Math.max(n,i,s),o=Math.min(n,i,s),a,l,c=(o+r)/2;if(o===r)a=0,l=0;else{let h=r-o;switch(l=c<=0.5?h/(r+o):h/(2-r-o),r){case n:a=(i-s)/h+(i<s?6:0);break;case i:a=(s-n)/h+2;break;case s:a=(n-i)/h+4;break}a/=6}return e.h=a,e.s=l,e.l=c,e}getRGB(e,t=We.workingColorSpace){return We.fromWorkingColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e="srgb"){We.fromWorkingColorSpace(Pt.copy(this),e);let{r:t,g:n,b:i}=Pt;if(e!=="srgb")return`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`;return`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Hn),this.setHSL(Hn.h+e,Hn.s+t,Hn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Hn),e.getHSL(Is);let n=rs(Hn.h,Is.h,t),i=rs(Hn.s,Is.s,t),s=rs(Hn.l,Is.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var Pt=new Ee;Ee.NAMES=Yl;var xu=0;class Gt extends oi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:xu++}),this.uuid=sn(),this.name="",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ee(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){if(this._alphaTest>0!==e>0)this.version++;this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e===void 0)return;for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}if(i&&i.isColor)i.set(n);else if(i&&i.isVector3&&(n&&n.isVector3))i.copy(n);else this[t]=n}}toJSON(e){let t=e===void 0||typeof e==="string";if(t)e={textures:{},images:{}};let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};if(n.uuid=this.uuid,n.type=this.type,this.name!=="")n.name=this.name;if(this.color&&this.color.isColor)n.color=this.color.getHex();if(this.roughness!==void 0)n.roughness=this.roughness;if(this.metalness!==void 0)n.metalness=this.metalness;if(this.sheen!==void 0)n.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)n.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)n.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)n.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1)n.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)n.specular=this.specular.getHex();if(this.specularIntensity!==void 0)n.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)n.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)n.shininess=this.shininess;if(this.clearcoat!==void 0)n.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)n.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.dispersion!==void 0)n.dispersion=this.dispersion;if(this.iridescence!==void 0)n.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)n.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)n.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid;if(this.anisotropy!==void 0)n.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)n.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid;if(this.map&&this.map.isTexture)n.map=this.map.toJSON(e).uuid;if(this.matcap&&this.matcap.isTexture)n.matcap=this.matcap.toJSON(e).uuid;if(this.alphaMap&&this.alphaMap.isTexture)n.alphaMap=this.alphaMap.toJSON(e).uuid;if(this.lightMap&&this.lightMap.isTexture)n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)n.roughnessMap=this.roughnessMap.toJSON(e).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)n.metalnessMap=this.metalnessMap.toJSON(e).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)n.emissiveMap=this.emissiveMap.toJSON(e).uuid;if(this.specularMap&&this.specularMap.isTexture)n.specularMap=this.specularMap.toJSON(e).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)n.specularColorMap=this.specularColorMap.toJSON(e).uuid;if(this.envMap&&this.envMap.isTexture){if(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0)n.combine=this.combine}if(this.envMapRotation!==void 0)n.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)n.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)n.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)n.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)n.gradientMap=this.gradientMap.toJSON(e).uuid;if(this.transmission!==void 0)n.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)n.transmissionMap=this.transmissionMap.toJSON(e).uuid;if(this.thickness!==void 0)n.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)n.thicknessMap=this.thicknessMap.toJSON(e).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)n.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)n.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)n.size=this.size;if(this.shadowSide!==null)n.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)n.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)n.blending=this.blending;if(this.side!==0)n.side=this.side;if(this.vertexColors===!0)n.vertexColors=!0;if(this.opacity<1)n.opacity=this.opacity;if(this.transparent===!0)n.transparent=!0;if(this.blendSrc!==204)n.blendSrc=this.blendSrc;if(this.blendDst!==205)n.blendDst=this.blendDst;if(this.blendEquation!==100)n.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)n.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)n.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)n.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)n.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)n.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)n.depthFunc=this.depthFunc;if(this.depthTest===!1)n.depthTest=this.depthTest;if(this.depthWrite===!1)n.depthWrite=this.depthWrite;if(this.colorWrite===!1)n.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)n.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)n.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)n.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)n.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)n.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)n.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)n.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)n.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)n.rotation=this.rotation;if(this.polygonOffset===!0)n.polygonOffset=!0;if(this.polygonOffsetFactor!==0)n.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)n.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)n.linewidth=this.linewidth;if(this.dashSize!==void 0)n.dashSize=this.dashSize;if(this.gapSize!==void 0)n.gapSize=this.gapSize;if(this.scale!==void 0)n.scale=this.scale;if(this.dithering===!0)n.dithering=!0;if(this.alphaTest>0)n.alphaTest=this.alphaTest;if(this.alphaHash===!0)n.alphaHash=!0;if(this.alphaToCoverage===!0)n.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)n.premultipliedAlpha=!0;if(this.forceSinglePass===!0)n.forceSinglePass=!0;if(this.wireframe===!0)n.wireframe=!0;if(this.wireframeLinewidth>1)n.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")n.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")n.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)n.flatShading=!0;if(this.visible===!1)n.visible=!1;if(this.toneMapped===!1)n.toneMapped=!1;if(this.fog===!1)n.fog=!1;if(Object.keys(this.userData).length>0)n.userData=this.userData;function i(s){let r=[];for(let o in s){let a=s[o];delete a.metadata,r.push(a)}return r}if(t){let s=i(e.textures),r=i(e.images);if(s.length>0)n.textures=s;if(r.length>0)n.images=r}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){if(e===!0)this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class at extends Gt{static get type(){return"MeshBasicMaterial"}constructor(e){super();this.isMeshBasicMaterial=!0,this.color=new Ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}var _t=new w,Ps=new ue;class bt{constructor(e,t,n=!1){if(Array.isArray(e))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){if(e===!0)this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ps.fromBufferAttribute(this,t),Ps.applyMatrix3(e),this.setXY(t,Ps.x,Ps.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix3(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix4(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyNormalMatrix(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.transformDirection(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];if(this.normalized)n=tn(n,this.array);return n}setComponent(e,t,n){if(this.normalized)n=tt(n,this.array);return this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];if(this.normalized)t=tn(t,this.array);return t}setX(e,t){if(this.normalized)t=tt(t,this.array);return this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];if(this.normalized)t=tn(t,this.array);return t}setY(e,t){if(this.normalized)t=tt(t,this.array);return this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];if(this.normalized)t=tn(t,this.array);return t}setZ(e,t){if(this.normalized)t=tt(t,this.array);return this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];if(this.normalized)t=tn(t,this.array);return t}setW(e,t){if(this.normalized)t=tt(t,this.array);return this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){if(e*=this.itemSize,this.normalized)t=tt(t,this.array),n=tt(n,this.array);return this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){if(e*=this.itemSize,this.normalized)t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array);return this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){if(e*=this.itemSize,this.normalized)t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array),s=tt(s,this.array);return this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")e.name=this.name;if(this.usage!==35044)e.usage=this.usage;return e}}class uo extends bt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class fo extends bt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class rt extends bt{constructor(e,t,n){super(new Float32Array(e),t,n)}}var yu=0,Xt=new Re,Br=new ot,Ti=new w,kt=new on,Ji=new on,Et=new w;class ut extends oi{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yu++}),this.uuid=sn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){if(Array.isArray(e))this.index=new((Vl(e))?fo:uo)(e,1);else this.index=e;return this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;if(t!==void 0)t.applyMatrix4(e),t.needsUpdate=!0;let n=this.attributes.normal;if(n!==void 0){let s=new Fe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;if(i!==void 0)i.transformDirection(e),i.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this}applyQuaternion(e){return Xt.makeRotationFromQuaternion(e),this.applyMatrix4(Xt),this}rotateX(e){return Xt.makeRotationX(e),this.applyMatrix4(Xt),this}rotateY(e){return Xt.makeRotationY(e),this.applyMatrix4(Xt),this}rotateZ(e){return Xt.makeRotationZ(e),this.applyMatrix4(Xt),this}translate(e,t,n){return Xt.makeTranslation(e,t,n),this.applyMatrix4(Xt),this}scale(e,t,n){return Xt.makeScale(e,t,n),this.applyMatrix4(Xt),this}lookAt(e){return Br.lookAt(e),Br.updateMatrix(),this.applyMatrix4(Br.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ti).negate(),this.translate(Ti.x,Ti.y,Ti.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let r=e[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new rt(n,3))}else{for(let n=0,i=t.count;n<i;n++){let s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}if(e.length>t.count)console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");t.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new on;let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];if(kt.setFromBufferAttribute(s),this.morphTargetsRelative)Et.addVectors(this.boundingBox.min,kt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,kt.max),this.boundingBox.expandByPoint(Et);else this.boundingBox.expandByPoint(kt.min),this.boundingBox.expandByPoint(kt.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new Yt;let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(e){let n=this.boundingSphere.center;if(kt.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){let o=t[s];if(Ji.setFromBufferAttribute(o),this.morphTargetsRelative)Et.addVectors(kt.min,Ji.min),kt.expandByPoint(Et),Et.addVectors(kt.max,Ji.max),kt.expandByPoint(Et);else kt.expandByPoint(Ji.min),kt.expandByPoint(Ji.max)}kt.getCenter(n);let i=0;for(let s=0,r=e.count;s<r;s++)Et.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Et));if(t)for(let s=0,r=t.length;s<r;s++){let o=t[s],a=this.morphTargetsRelative;for(let l=0,c=o.count;l<c;l++){if(Et.fromBufferAttribute(o,l),a)Ti.fromBufferAttribute(e,l),Et.add(Ti);i=Math.max(i,n.distanceToSquared(Et))}}if(this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius))console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:n,normal:i,uv:s}=t;if(this.hasAttribute("tangent")===!1)this.setAttribute("tangent",new bt(new Float32Array(4*n.count),4));let r=this.getAttribute("tangent"),o=[],a=[];for(let A=0;A<n.count;A++)o[A]=new w,a[A]=new w;let l=new w,c=new w,h=new w,u=new ue,d=new ue,f=new ue,g=new w,_=new w;function p(A,F,S){l.fromBufferAttribute(n,A),c.fromBufferAttribute(n,F),h.fromBufferAttribute(n,S),u.fromBufferAttribute(s,A),d.fromBufferAttribute(s,F),f.fromBufferAttribute(s,S),c.sub(l),h.sub(l),d.sub(u),f.sub(u);let E=1/(d.x*f.y-f.x*d.y);if(!isFinite(E))return;g.copy(c).multiplyScalar(f.y).addScaledVector(h,-d.y).multiplyScalar(E),_.copy(h).multiplyScalar(d.x).addScaledVector(c,-f.x).multiplyScalar(E),o[A].add(g),o[F].add(g),o[S].add(g),a[A].add(_),a[F].add(_),a[S].add(_)}let m=this.groups;if(m.length===0)m=[{start:0,count:e.count}];for(let A=0,F=m.length;A<F;++A){let S=m[A],E=S.start,C=S.count;for(let z=E,k=E+C;z<k;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let v=new w,x=new w,T=new w,I=new w;function b(A){T.fromBufferAttribute(i,A),I.copy(T);let F=o[A];v.copy(F),v.sub(T.multiplyScalar(T.dot(F))).normalize(),x.crossVectors(I,F);let E=x.dot(a[A])<0?-1:1;r.setXYZW(A,v.x,v.y,v.z,E)}for(let A=0,F=m.length;A<F;++A){let S=m[A],E=S.start,C=S.count;for(let z=E,k=E+C;z<k;z+=3)b(e.getX(z+0)),b(e.getX(z+1)),b(e.getX(z+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new bt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);let i=new w,s=new w,r=new w,o=new w,a=new w,l=new w,c=new w,h=new w;if(e)for(let u=0,d=e.count;u<d;u+=3){let f=e.getX(u+0),g=e.getX(u+1),_=e.getX(u+2);i.fromBufferAttribute(t,f),s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),c.subVectors(r,s),h.subVectors(i,s),c.cross(h),o.fromBufferAttribute(n,f),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),o.add(c),a.add(c),l.add(c),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z)}else for(let u=0,d=t.count;u<d;u+=3)i.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),r.fromBufferAttribute(t,u+2),c.subVectors(r,s),h.subVectors(i,s),c.cross(h),n.setXYZ(u+0,c.x,c.y,c.z),n.setXYZ(u+1,c.x,c.y,c.z),n.setXYZ(u+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(o,a){let{array:l,itemSize:c,normalized:h}=o,u=new l.constructor(a.length*c),d=0,f=0;for(let g=0,_=a.length;g<_;g++){if(o.isInterleavedBufferAttribute)d=a[g]*o.data.stride+o.offset;else d=a[g]*c;for(let p=0;p<c;p++)u[f++]=l[d++]}return new bt(u,c,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new ut,n=this.index.array,i=this.attributes;for(let o in i){let a=i[o],l=e(a,n);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let a=[],l=s[o];for(let c=0,h=l.length;c<h;c++){let u=l[c],d=e(u,n);a.push(d)}t.morphAttributes[o]=a}t.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,a=r.length;o<a;o++){let l=r[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!=="")e.name=this.name;if(Object.keys(this.userData).length>0)e.userData=this.userData;if(this.parameters!==void 0){let a=this.parameters;for(let l in a)if(a[l]!==void 0)e[l]=a[l];return e}e.data={attributes:{}};let t=this.index;if(t!==null)e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)};let n=this.attributes;for(let a in n){let l=n[a];e.data.attributes[a]=l.toJSON(e.data)}let i={},s=!1;for(let a in this.morphAttributes){let l=this.morphAttributes[a],c=[];for(let h=0,u=l.length;h<u;h++){let d=l[h];c.push(d.toJSON(e.data))}if(c.length>0)i[a]=c,s=!0}if(s)e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;if(r.length>0)e.data.groups=JSON.parse(JSON.stringify(r));let o=this.boundingSphere;if(o!==null)e.data.boundingSphere={center:o.center.toArray(),radius:o.radius};return e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;if(n!==null)this.setIndex(n.clone(t));let i=e.attributes;for(let l in i){let c=i[l];this.setAttribute(l,c.clone(t))}let s=e.morphAttributes;for(let l in s){let c=[],h=s[l];for(let u=0,d=h.length;u<d;u++)c.push(h[u].clone(t));this.morphAttributes[l]=c}this.morphTargetsRelative=e.morphTargetsRelative;let r=e.groups;for(let l=0,c=r.length;l<c;l++){let h=r[l];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;if(o!==null)this.boundingBox=o.clone();let a=e.boundingSphere;if(a!==null)this.boundingSphere=a.clone();return this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}var Fa=new Re,ei=new Fi,Ls=new Yt,Oa=new w,Ns=new w,Ds=new w,Us=new w,zr=new w,Fs=new w,Ba=new w,Os=new w;class Me extends ot{constructor(e=new ut,t=new at){super();this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){if(super.copy(e,t),e.morphTargetInfluences!==void 0)this.morphTargetInfluences=e.morphTargetInfluences.slice();if(e.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary);return this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){Fs.set(0,0,0);for(let a=0,l=s.length;a<l;a++){let c=o[a],h=s[a];if(c===0)continue;if(zr.fromBufferAttribute(h,e),r)Fs.addScaledVector(zr,c);else Fs.addScaledVector(zr.sub(t),c)}t.add(Fs)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0)return;if(n.boundingSphere===null)n.computeBoundingSphere();if(Ls.copy(n.boundingSphere),Ls.applyMatrix4(s),ei.copy(e.ray).recast(e.near),Ls.containsPoint(ei.origin)===!1){if(ei.intersectSphere(Ls,Oa)===null)return;if(ei.origin.distanceToSquared(Oa)>(e.far-e.near)**2)return}if(Fa.copy(s).invert(),ei.copy(e.ray).applyMatrix4(Fa),n.boundingBox!==null){if(ei.intersectsBox(n.boundingBox)===!1)return}this._computeIntersections(e,t,ei)}_computeIntersections(e,t,n){let i,s=this.geometry,r=this.material,o=s.index,a=s.attributes.position,l=s.attributes.uv,c=s.attributes.uv1,h=s.attributes.normal,u=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(r))for(let f=0,g=u.length;f<g;f++){let _=u[f],p=r[_.materialIndex],m=Math.max(_.start,d.start),v=Math.min(o.count,Math.min(_.start+_.count,d.start+d.count));for(let x=m,T=v;x<T;x+=3){let I=o.getX(x),b=o.getX(x+1),A=o.getX(x+2);if(i=Bs(this,p,e,n,l,c,h,I,b,A),i)i.faceIndex=Math.floor(x/3),i.face.materialIndex=_.materialIndex,t.push(i)}}else{let f=Math.max(0,d.start),g=Math.min(o.count,d.start+d.count);for(let _=f,p=g;_<p;_+=3){let m=o.getX(_),v=o.getX(_+1),x=o.getX(_+2);if(i=Bs(this,r,e,n,l,c,h,m,v,x),i)i.faceIndex=Math.floor(_/3),t.push(i)}}else if(a!==void 0)if(Array.isArray(r))for(let f=0,g=u.length;f<g;f++){let _=u[f],p=r[_.materialIndex],m=Math.max(_.start,d.start),v=Math.min(a.count,Math.min(_.start+_.count,d.start+d.count));for(let x=m,T=v;x<T;x+=3){let I=x,b=x+1,A=x+2;if(i=Bs(this,p,e,n,l,c,h,I,b,A),i)i.faceIndex=Math.floor(x/3),i.face.materialIndex=_.materialIndex,t.push(i)}}else{let f=Math.max(0,d.start),g=Math.min(a.count,d.start+d.count);for(let _=f,p=g;_<p;_+=3){let m=_,v=_+1,x=_+2;if(i=Bs(this,r,e,n,l,c,h,m,v,x),i)i.faceIndex=Math.floor(_/3),t.push(i)}}}}function vu(e,t,n,i,s,r,o,a){let l;if(t.side===1)l=i.intersectTriangle(o,r,s,!0,a);else l=i.intersectTriangle(s,r,o,t.side===0,a);if(l===null)return null;Os.copy(a),Os.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(Os);if(c<n.near||c>n.far)return null;return{distance:c,point:Os.clone(),object:e}}function Bs(e,t,n,i,s,r,o,a,l,c){e.getVertexPosition(a,Ns),e.getVertexPosition(l,Ds),e.getVertexPosition(c,Us);let h=vu(e,t,n,i,Ns,Ds,Us,Ba);if(h){let u=new w;if(nn.getBarycoord(Ba,Ns,Ds,Us,u),s)h.uv=nn.getInterpolatedAttribute(s,a,l,c,u,new ue);if(r)h.uv1=nn.getInterpolatedAttribute(r,a,l,c,u,new ue);if(o){if(h.normal=nn.getInterpolatedAttribute(o,a,l,c,u,new w),h.normal.dot(i.direction)>0)h.normal.multiplyScalar(-1)}let d={a,b:l,c,normal:new w,materialIndex:0};nn.getNormal(Ns,Ds,Us,d.normal),h.face=d,h.barycoord=u}return h}class Ft extends ut{constructor(e=1,t=1,n=1,i=1,s=1,r=1){super();this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:r};let o=this;i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);let a=[],l=[],c=[],h=[],u=0,d=0;f("z","y","x",-1,-1,n,t,e,r,s,0),f("z","y","x",1,-1,n,t,-e,r,s,1),f("x","z","y",1,1,e,n,t,i,r,2),f("x","z","y",1,-1,e,n,-t,i,r,3),f("x","y","z",1,-1,e,t,n,i,s,4),f("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(a),this.setAttribute("position",new rt(l,3)),this.setAttribute("normal",new rt(c,3)),this.setAttribute("uv",new rt(h,2));function f(g,_,p,m,v,x,T,I,b,A,F){let S=x/b,E=T/A,C=x/2,z=T/2,k=I/2,G=b+1,K=A+1,V=0,j=0,H=new w;for(let ce=0;ce<K;ce++){let de=ce*E-z;for(let Ie=0;Ie<G;Ie++){let Ve=Ie*S-C;H[g]=Ve*m,H[_]=de*v,H[p]=k,l.push(H.x,H.y,H.z),H[g]=0,H[_]=0,H[p]=I>0?1:-1,c.push(H.x,H.y,H.z),h.push(Ie/b),h.push(1-ce/A),V+=1}}for(let ce=0;ce<A;ce++)for(let de=0;de<b;de++){let Ie=u+de+G*ce,Ve=u+de+G*(ce+1),q=u+(de+1)+G*(ce+1),ee=u+(de+1)+G*ce;a.push(Ie,Ve,ee),a.push(Ve,q,ee),j+=6}o.addGroup(d,j,F),d+=j,u+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ft(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Li(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let s=e[n][i];if(s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion))if(s.isRenderTargetTexture)console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null;else t[n][i]=s.clone();else if(Array.isArray(s))t[n][i]=s.slice();else t[n][i]=s}}return t}function Nt(e){let t={};for(let n=0;n<e.length;n++){let i=Li(e[n]);for(let s in i)t[s]=i[s]}return t}function Mu(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Zl(e){let t=e.getRenderTarget();if(t===null)return e.outputColorSpace;if(t.isXRRenderTarget===!0)return t.texture.colorSpace;return We.workingColorSpace}var Su={clone:Li,merge:Nt},Eu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Tu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rn extends Gt{static get type(){return"ShaderMaterial"}constructor(e){super();if(this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Eu,this.fragmentShader=Tu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0)this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Li(e.uniforms),this.uniformsGroups=Mu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let r=this.uniforms[i].value;if(r&&r.isTexture)t.uniforms[i]={type:"t",value:r.toJSON(e).uuid};else if(r&&r.isColor)t.uniforms[i]={type:"c",value:r.getHex()};else if(r&&r.isVector2)t.uniforms[i]={type:"v2",value:r.toArray()};else if(r&&r.isVector3)t.uniforms[i]={type:"v3",value:r.toArray()};else if(r&&r.isVector4)t.uniforms[i]={type:"v4",value:r.toArray()};else if(r&&r.isMatrix3)t.uniforms[i]={type:"m3",value:r.toArray()};else if(r&&r.isMatrix4)t.uniforms[i]={type:"m4",value:r.toArray()};else t.uniforms[i]={value:r}}if(Object.keys(this.defines).length>0)t.defines=this.defines;t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)if(this.extensions[i]===!0)n[i]=!0;if(Object.keys(n).length>0)t.extensions=n;return t}}class po extends ot{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Re,this.projectionMatrix=new Re,this.projectionMatrixInverse=new Re,this.coordinateSystem=2000}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}var kn=new w,za=new ue,Ha=new ue;class Tt extends po{constructor(e=50,t=1,n=0.1,i=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=0.5*this.getFilmHeight()/e;this.fov=Pi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ss*0.5*this.fov);return 0.5*this.getFilmHeight()/e}getEffectiveFOV(){return Pi*2*Math.atan(Math.tan(ss*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){kn.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),t.set(kn.x,kn.y).multiplyScalar(-e/kn.z),kn.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),n.set(kn.x,kn.y).multiplyScalar(-e/kn.z)}getViewSize(e,t){return this.getViewBounds(e,za,Ha),t.subVectors(Ha,za)}setViewOffset(e,t,n,i,s,r){if(this.aspect=e/t,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ss*0.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-0.5*i,r=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:a,fullHeight:l}=r;s+=r.offsetX*i/a,t-=r.offsetY*n/l,i*=r.width/a,n*=r.height/l}let o=this.filmOffset;if(o!==0)s+=e*o/this.getFilmWidth();this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);if(t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null)t.object.view=Object.assign({},this.view);return t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}var bi=-90,wi=1;class Kl extends ot{constructor(e,t,n){super();this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Tt(bi,wi,e,t);i.layers=this.layers,this.add(i);let s=new Tt(bi,wi,e,t);s.layers=this.layers,this.add(s);let r=new Tt(bi,wi,e,t);r.layers=this.layers,this.add(r);let o=new Tt(bi,wi,e,t);o.layers=this.layers,this.add(o);let a=new Tt(bi,wi,e,t);a.layers=this.layers,this.add(a);let l=new Tt(bi,wi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,r,o,a]=t;for(let l of t)this.remove(l);if(e===2000)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),a.up.set(0,1,0),a.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),a.up.set(0,-1,0),a.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;if(this.coordinateSystem!==e.coordinateSystem)this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem();let[s,r,o,a,l,c]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.xr.enabled;e.xr.enabled=!1;let g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,r),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,a),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,c),e.setRenderTarget(h,u,d),e.xr.enabled=f,n.texture.needsPMREMUpdate=!0}}class mo extends xt{constructor(e,t,n,i,s,r,o,a,l,c){e=e!==void 0?e:[],t=t!==void 0?t:301;super(e,t,n,i,s,r,o,a,l,c);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class $l extends Wn{constructor(e=1,t={}){super(e,e,t);this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new mo(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:1006}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ft(5,5,5),s=new Rn({name:"CubemapFromEquirect",uniforms:Li(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let r=new Me(i,s),o=t.minFilter;if(t.minFilter===1008)t.minFilter=1006;return new Kl(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t,n,i){let s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,i);e.setRenderTarget(s)}}var Hr=new w,bu=new w,wu=new Fe;class Gn{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Hr.subVectors(n,t).cross(bu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Hr),i=this.normal.dot(n);if(i===0){if(this.distanceToPoint(e.start)===0)return t.copy(e.start);return null}let s=-(e.start.dot(this.normal)+this.constant)/i;if(s<0||s>1)return null;return t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||wu.getNormalMatrix(e),i=this.coplanarPoint(Hr).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}var ti=new Yt,zs=new w;class ir{constructor(e=new Gn,t=new Gn,n=new Gn,i=new Gn,s=new Gn,r=new Gn){this.planes=[e,t,n,i,s,r]}set(e,t,n,i,s,r){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(r),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2000){let n=this.planes,i=e.elements,s=i[0],r=i[1],o=i[2],a=i[3],l=i[4],c=i[5],h=i[6],u=i[7],d=i[8],f=i[9],g=i[10],_=i[11],p=i[12],m=i[13],v=i[14],x=i[15];if(n[0].setComponents(a-s,u-l,_-d,x-p).normalize(),n[1].setComponents(a+s,u+l,_+d,x+p).normalize(),n[2].setComponents(a+r,u+c,_+f,x+m).normalize(),n[3].setComponents(a-r,u-c,_-f,x-m).normalize(),n[4].setComponents(a-o,u-h,_-g,x-v).normalize(),t===2000)n[5].setComponents(a+o,u+h,_+g,x+v).normalize();else if(t===2001)n[5].setComponents(o,h,g,v).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0){if(e.boundingSphere===null)e.computeBoundingSphere();ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld)}else{let t=e.geometry;if(t.boundingSphere===null)t.computeBoundingSphere();ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ti)}intersectsSprite(e){return ti.center.set(0,0,0),ti.radius=0.7071067811865476,ti.applyMatrix4(e.matrixWorld),this.intersectsSphere(ti)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(zs.x=i.normal.x>0?e.max.x:e.min.x,zs.y=i.normal.y>0?e.max.y:e.min.y,zs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(zs)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Jl(){let e=null,t=!1,n=null,i=null;function s(r,o){n(r,o),i=e.requestAnimationFrame(s)}return{start:function(){if(t===!0)return;if(n===null)return;i=e.requestAnimationFrame(s),t=!0},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){n=r},setContext:function(r){e=r}}}function Au(e){let t=new WeakMap;function n(a,l){let{array:c,usage:h}=a,u=c.byteLength,d=e.createBuffer();e.bindBuffer(l,d),e.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=e.FLOAT;else if(c instanceof Uint16Array)if(a.isFloat16BufferAttribute)f=e.HALF_FLOAT;else f=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=e.SHORT;else if(c instanceof Uint32Array)f=e.UNSIGNED_INT;else if(c instanceof Int32Array)f=e.INT;else if(c instanceof Int8Array)f=e.BYTE;else if(c instanceof Uint8Array)f=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=e.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){let{array:h,updateRanges:u}=l;if(e.bindBuffer(c,a),u.length===0)e.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],_=u[f];if(_.start<=g.start+g.count+1)g.count=Math.max(g.count,_.start+_.count-g.start);else++d,u[d]=_}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let _=u[f];e.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){if(a.isInterleavedBufferAttribute)a=a.data;return t.get(a)}function r(a){if(a.isInterleavedBufferAttribute)a=a.data;let l=t.get(a);if(l)e.deleteBuffer(l.buffer),t.delete(a)}function o(a,l){if(a.isInterleavedBufferAttribute)a=a.data;if(a.isGLBufferAttribute){let h=t.get(a);if(!h||h.version<a.version)t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Ot extends ut{constructor(e=1,t=1,n=1,i=1){super();this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,r=t/2,o=Math.floor(n),a=Math.floor(i),l=o+1,c=a+1,h=e/o,u=t/a,d=[],f=[],g=[],_=[];for(let p=0;p<c;p++){let m=p*u-r;for(let v=0;v<l;v++){let x=v*h-s;f.push(x,-m,0),g.push(0,0,1),_.push(v/o),_.push(1-p/a)}}for(let p=0;p<a;p++)for(let m=0;m<o;m++){let v=m+l*p,x=m+l*(p+1),T=m+1+l*(p+1),I=m+1+l*p;d.push(v,x,I),d.push(x,T,I)}this.setIndex(d),this.setAttribute("position",new rt(f,3)),this.setAttribute("normal",new rt(g,3)),this.setAttribute("uv",new rt(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ot(e.width,e.height,e.widthSegments,e.heightSegments)}}var Ru=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Cu=`#ifdef USE_ALPHAHASH
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
#endif`,Iu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Pu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Nu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Du=`#ifdef USE_AOMAP
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
#endif`,Uu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Fu=`#ifdef USE_BATCHING
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
#endif`,Ou=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ku=`#ifdef USE_IRIDESCENCE
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
#endif`,Gu=`#ifdef USE_BUMPMAP
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
#endif`,Vu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Wu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Zu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ku=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,$u=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ju=`#define PI 3.141592653589793
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
} // validated`,ju=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Qu=`vec3 transformedNormal = objectNormal;
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
#endif`,ed=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,td=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,id=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sd="gl_FragColor = linearToOutputTexel( gl_FragColor );",rd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,od=`#ifdef USE_ENVMAP
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
#endif`,ad=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ld=`#ifdef USE_ENVMAP
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
#endif`,cd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hd=`#ifdef USE_ENVMAP
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
#endif`,ud=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,md=`#ifdef USE_GRADIENTMAP
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
}`,gd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_d=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yd=`uniform bool receiveShadow;
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
#endif`,vd=`#ifdef USE_ENVMAP
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
#endif`,Md=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Sd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ed=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Td=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bd=`PhysicalMaterial material;
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
#endif`,wd=`struct PhysicalMaterial {
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
}`,Ad=`
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
#endif`,Rd=`#if defined( RE_IndirectDiffuse )
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
#endif`,Cd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Id=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ld=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Dd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ud=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Fd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Od=`#if defined( USE_POINTS_UV )
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
#endif`,Bd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,kd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Gd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vd=`#ifdef USE_MORPHTARGETS
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
#endif`,Wd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,qd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Yd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$d=`#ifdef USE_NORMALMAP
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
#endif`,Jd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,jd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ef=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,sf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,of=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,af=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
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
#endif`,uf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,df=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ff=`float getShadowMask() {
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
}`,pf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mf=`#ifdef USE_SKINNING
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
#endif`,gf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_f=`#ifdef USE_SKINNING
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
#endif`,xf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Sf=`#ifdef USE_TRANSMISSION
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
#endif`,Ef=`#ifdef USE_TRANSMISSION
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
#endif`,Tf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Af=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Rf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cf=`uniform sampler2D t2D;
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
}`,If=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Lf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Df=`#include <common>
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
}`,Uf=`#if DEPTH_PACKING == 3200
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
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ff=`#define DISTANCE
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
}`,Of=`#define DISTANCE
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
}`,Bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hf=`uniform float scale;
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
}`,kf=`uniform vec3 diffuse;
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
}`,Gf=`#include <common>
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
}`,Vf=`uniform vec3 diffuse;
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
}`,Wf=`#define LAMBERT
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
}`,Xf=`#define LAMBERT
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
}`,qf=`#define MATCAP
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
}`,Yf=`#define MATCAP
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
}`,Zf=`#define NORMAL
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
}`,Kf=`#define NORMAL
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
}`,$f=`#define PHONG
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
}`,Jf=`#define PHONG
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
}`,jf=`#define STANDARD
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
}`,Qf=`#define STANDARD
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
}`,ep=`#define TOON
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
}`,tp=`#define TOON
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
}`,np=`uniform float size;
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
}`,ip=`uniform vec3 diffuse;
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
}`,sp=`#include <common>
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
}`,rp=`uniform vec3 color;
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
}`,op=`uniform float rotation;
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
}`,ap=`uniform vec3 diffuse;
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
}`,Be={alphahash_fragment:Ru,alphahash_pars_fragment:Cu,alphamap_fragment:Iu,alphamap_pars_fragment:Pu,alphatest_fragment:Lu,alphatest_pars_fragment:Nu,aomap_fragment:Du,aomap_pars_fragment:Uu,batching_pars_vertex:Fu,batching_vertex:Ou,begin_vertex:Bu,beginnormal_vertex:zu,bsdfs:Hu,iridescence_fragment:ku,bumpmap_pars_fragment:Gu,clipping_planes_fragment:Vu,clipping_planes_pars_fragment:Wu,clipping_planes_pars_vertex:Xu,clipping_planes_vertex:qu,color_fragment:Yu,color_pars_fragment:Zu,color_pars_vertex:Ku,color_vertex:$u,common:Ju,cube_uv_reflection_fragment:ju,defaultnormal_vertex:Qu,displacementmap_pars_vertex:ed,displacementmap_vertex:td,emissivemap_fragment:nd,emissivemap_pars_fragment:id,colorspace_fragment:sd,colorspace_pars_fragment:rd,envmap_fragment:od,envmap_common_pars_fragment:ad,envmap_pars_fragment:ld,envmap_pars_vertex:cd,envmap_physical_pars_fragment:vd,envmap_vertex:hd,fog_vertex:ud,fog_pars_vertex:dd,fog_fragment:fd,fog_pars_fragment:pd,gradientmap_pars_fragment:md,lightmap_pars_fragment:gd,lights_lambert_fragment:_d,lights_lambert_pars_fragment:xd,lights_pars_begin:yd,lights_toon_fragment:Md,lights_toon_pars_fragment:Sd,lights_phong_fragment:Ed,lights_phong_pars_fragment:Td,lights_physical_fragment:bd,lights_physical_pars_fragment:wd,lights_fragment_begin:Ad,lights_fragment_maps:Rd,lights_fragment_end:Cd,logdepthbuf_fragment:Id,logdepthbuf_pars_fragment:Pd,logdepthbuf_pars_vertex:Ld,logdepthbuf_vertex:Nd,map_fragment:Dd,map_pars_fragment:Ud,map_particle_fragment:Fd,map_particle_pars_fragment:Od,metalnessmap_fragment:Bd,metalnessmap_pars_fragment:zd,morphinstance_vertex:Hd,morphcolor_vertex:kd,morphnormal_vertex:Gd,morphtarget_pars_vertex:Vd,morphtarget_vertex:Wd,normal_fragment_begin:Xd,normal_fragment_maps:qd,normal_pars_fragment:Yd,normal_pars_vertex:Zd,normal_vertex:Kd,normalmap_pars_fragment:$d,clearcoat_normal_fragment_begin:Jd,clearcoat_normal_fragment_maps:jd,clearcoat_pars_fragment:Qd,iridescence_pars_fragment:ef,opaque_fragment:tf,packing:nf,premultiplied_alpha_fragment:sf,project_vertex:rf,dithering_fragment:of,dithering_pars_fragment:af,roughnessmap_fragment:lf,roughnessmap_pars_fragment:cf,shadowmap_pars_fragment:hf,shadowmap_pars_vertex:uf,shadowmap_vertex:df,shadowmask_pars_fragment:ff,skinbase_vertex:pf,skinning_pars_vertex:mf,skinning_vertex:gf,skinnormal_vertex:_f,specularmap_fragment:xf,specularmap_pars_fragment:yf,tonemapping_fragment:vf,tonemapping_pars_fragment:Mf,transmission_fragment:Sf,transmission_pars_fragment:Ef,uv_pars_fragment:Tf,uv_pars_vertex:bf,uv_vertex:wf,worldpos_vertex:Af,background_vert:Rf,background_frag:Cf,backgroundCube_vert:If,backgroundCube_frag:Pf,cube_vert:Lf,cube_frag:Nf,depth_vert:Df,depth_frag:Uf,distanceRGBA_vert:Ff,distanceRGBA_frag:Of,equirect_vert:Bf,equirect_frag:zf,linedashed_vert:Hf,linedashed_frag:kf,meshbasic_vert:Gf,meshbasic_frag:Vf,meshlambert_vert:Wf,meshlambert_frag:Xf,meshmatcap_vert:qf,meshmatcap_frag:Yf,meshnormal_vert:Zf,meshnormal_frag:Kf,meshphong_vert:$f,meshphong_frag:Jf,meshphysical_vert:jf,meshphysical_frag:Qf,meshtoon_vert:ep,meshtoon_frag:tp,points_vert:np,points_frag:ip,shadow_vert:sp,shadow_frag:rp,sprite_vert:op,sprite_frag:ap},ie={common:{diffuse:{value:new Ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new Ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Ee(16777215)},opacity:{value:1},center:{value:new ue(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},pn={basic:{uniforms:Nt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:Nt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Ee(0)}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:Nt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Ee(0)},specular:{value:new Ee(1118481)},shininess:{value:30}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:Nt([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new Ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:Nt([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new Ee(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:Nt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:Nt([ie.points,ie.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:Nt([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:Nt([ie.common,ie.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:Nt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:Nt([ie.sprite,ie.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distanceRGBA:{uniforms:Nt([ie.common,ie.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:Be.distanceRGBA_vert,fragmentShader:Be.distanceRGBA_frag},shadow:{uniforms:Nt([ie.lights,ie.fog,{color:{value:new Ee(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};pn.physical={uniforms:Nt([pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Ee(0)},specularColor:{value:new Ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};var Hs={r:0,b:0,g:0},ni=new rn,lp=new Re;function cp(e,t,n,i,s,r,o){let a=new Ee(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(v){let x=v.isScene===!0?v.background:null;if(x&&x.isTexture)x=(v.backgroundBlurriness>0?n:t).get(x);return x}function _(v){let x=!1,T=g(v);if(T===null)m(a,l);else if(T&&T.isColor)m(T,1),x=!0;let I=e.xr.getEnvironmentBlendMode();if(I==="additive")i.buffers.color.setClear(0,0,0,1,o);else if(I==="alpha-blend")i.buffers.color.setClear(0,0,0,0,o);if(e.autoClear||x)i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil)}function p(v,x){let T=g(x);if(T&&(T.isCubeTexture||T.mapping===306)){if(h===void 0)h=new Me(new Ft(1,1,1),new Rn({name:"BackgroundCubeMaterial",uniforms:Li(pn.backgroundCube.uniforms),vertexShader:pn.backgroundCube.vertexShader,fragmentShader:pn.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h);if(ni.copy(x.backgroundRotation),ni.x*=-1,ni.y*=-1,ni.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1)ni.y*=-1,ni.z*=-1;if(h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(lp.makeRotationFromEuler(ni)),h.material.toneMapped=We.getTransfer(T.colorSpace)!=="srgb",u!==T||d!==T.version||f!==e.toneMapping)h.material.needsUpdate=!0,u=T,d=T.version,f=e.toneMapping;h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)}else if(T&&T.isTexture){if(c===void 0)c=new Me(new Ot(2,2),new Rn({name:"BackgroundMaterial",uniforms:Li(pn.background.uniforms),vertexShader:pn.background.vertexShader,fragmentShader:pn.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c);if(c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=We.getTransfer(T.colorSpace)!=="srgb",T.matrixAutoUpdate===!0)T.updateMatrix();if(c.material.uniforms.uvTransform.value.copy(T.matrix),u!==T||d!==T.version||f!==e.toneMapping)c.material.needsUpdate=!0,u=T,d=T.version,f=e.toneMapping;c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)}}function m(v,x){v.getRGB(Hs,Zl(e)),i.buffers.color.setClear(Hs.r,Hs.g,Hs.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),l=x,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,m(a,l)},render:_,addToRenderList:p}}function hp(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=d(null),r=s,o=!1;function a(E,C,z,k,G){let K=!1,V=u(k,z,C);if(r!==V)r=V,c(r.object);if(K=f(E,k,z,G),K)g(E,k,z,G);if(G!==null)t.update(G,e.ELEMENT_ARRAY_BUFFER);if(K||o){if(o=!1,T(E,C,z,k),G!==null)e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(G).buffer)}}function l(){return e.createVertexArray()}function c(E){return e.bindVertexArray(E)}function h(E){return e.deleteVertexArray(E)}function u(E,C,z){let k=z.wireframe===!0,G=i[E.id];if(G===void 0)G={},i[E.id]=G;let K=G[C.id];if(K===void 0)K={},G[C.id]=K;let V=K[k];if(V===void 0)V=d(l()),K[k]=V;return V}function d(E){let C=[],z=[],k=[];for(let G=0;G<n;G++)C[G]=0,z[G]=0,k[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:z,attributeDivisors:k,object:E,attributes:{},index:null}}function f(E,C,z,k){let G=r.attributes,K=C.attributes,V=0,j=z.getAttributes();for(let H in j)if(j[H].location>=0){let de=G[H],Ie=K[H];if(Ie===void 0){if(H==="instanceMatrix"&&E.instanceMatrix)Ie=E.instanceMatrix;if(H==="instanceColor"&&E.instanceColor)Ie=E.instanceColor}if(de===void 0)return!0;if(de.attribute!==Ie)return!0;if(Ie&&de.data!==Ie.data)return!0;V++}if(r.attributesNum!==V)return!0;if(r.index!==k)return!0;return!1}function g(E,C,z,k){let G={},K=C.attributes,V=0,j=z.getAttributes();for(let H in j)if(j[H].location>=0){let de=K[H];if(de===void 0){if(H==="instanceMatrix"&&E.instanceMatrix)de=E.instanceMatrix;if(H==="instanceColor"&&E.instanceColor)de=E.instanceColor}let Ie={};if(Ie.attribute=de,de&&de.data)Ie.data=de.data;G[H]=Ie,V++}r.attributes=G,r.attributesNum=V,r.index=k}function _(){let E=r.newAttributes;for(let C=0,z=E.length;C<z;C++)E[C]=0}function p(E){m(E,0)}function m(E,C){let{newAttributes:z,enabledAttributes:k,attributeDivisors:G}=r;if(z[E]=1,k[E]===0)e.enableVertexAttribArray(E),k[E]=1;if(G[E]!==C)e.vertexAttribDivisor(E,C),G[E]=C}function v(){let{newAttributes:E,enabledAttributes:C}=r;for(let z=0,k=C.length;z<k;z++)if(C[z]!==E[z])e.disableVertexAttribArray(z),C[z]=0}function x(E,C,z,k,G,K,V){if(V===!0)e.vertexAttribIPointer(E,C,z,G,K);else e.vertexAttribPointer(E,C,z,k,G,K)}function T(E,C,z,k){_();let G=k.attributes,K=z.getAttributes(),V=C.defaultAttributeValues;for(let j in K){let H=K[j];if(H.location>=0){let ce=G[j];if(ce===void 0){if(j==="instanceMatrix"&&E.instanceMatrix)ce=E.instanceMatrix;if(j==="instanceColor"&&E.instanceColor)ce=E.instanceColor}if(ce!==void 0){let{normalized:de,itemSize:Ie}=ce,Ve=t.get(ce);if(Ve===void 0)continue;let{buffer:q,type:ee,bytesPerElement:Se}=Ve,Te=ee===e.INT||ee===e.UNSIGNED_INT||ce.gpuType===1013;if(ce.isInterleavedBufferAttribute){let se=ce.data,Ae=se.stride,nt=ce.offset;if(se.isInstancedInterleavedBuffer){for(let Xe=0;Xe<H.locationSize;Xe++)m(H.location+Xe,se.meshPerAttribute);if(E.isInstancedMesh!==!0&&k._maxInstanceCount===void 0)k._maxInstanceCount=se.meshPerAttribute*se.count}else for(let Xe=0;Xe<H.locationSize;Xe++)p(H.location+Xe);e.bindBuffer(e.ARRAY_BUFFER,q);for(let Xe=0;Xe<H.locationSize;Xe++)x(H.location+Xe,Ie/H.locationSize,ee,de,Ae*Se,(nt+Ie/H.locationSize*Xe)*Se,Te)}else{if(ce.isInstancedBufferAttribute){for(let se=0;se<H.locationSize;se++)m(H.location+se,ce.meshPerAttribute);if(E.isInstancedMesh!==!0&&k._maxInstanceCount===void 0)k._maxInstanceCount=ce.meshPerAttribute*ce.count}else for(let se=0;se<H.locationSize;se++)p(H.location+se);e.bindBuffer(e.ARRAY_BUFFER,q);for(let se=0;se<H.locationSize;se++)x(H.location+se,Ie/H.locationSize,ee,de,Ie*Se,Ie/H.locationSize*se*Se,Te)}}else if(V!==void 0){let de=V[j];if(de!==void 0)switch(de.length){case 2:e.vertexAttrib2fv(H.location,de);break;case 3:e.vertexAttrib3fv(H.location,de);break;case 4:e.vertexAttrib4fv(H.location,de);break;default:e.vertexAttrib1fv(H.location,de)}}}}v()}function I(){F();for(let E in i){let C=i[E];for(let z in C){let k=C[z];for(let G in k)h(k[G].object),delete k[G];delete C[z]}delete i[E]}}function b(E){if(i[E.id]===void 0)return;let C=i[E.id];for(let z in C){let k=C[z];for(let G in k)h(k[G].object),delete k[G];delete C[z]}delete i[E.id]}function A(E){for(let C in i){let z=i[C];if(z[E.id]===void 0)continue;let k=z[E.id];for(let G in k)h(k[G].object),delete k[G];delete z[E.id]}}function F(){if(S(),o=!0,r===s)return;r=s,c(r.object)}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:F,resetDefaultState:S,dispose:I,releaseStatesOfGeometry:b,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:p,disableUnusedAttributes:v}}function up(e,t,n){let i;function s(c){i=c}function r(c,h){e.drawArrays(i,c,h),n.update(h,i,1)}function o(c,h,u){if(u===0)return;e.drawArraysInstanced(i,c,h,u),n.update(h,i,u)}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];n.update(f,i,1)}function l(c,h,u,d){if(u===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];n.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function dp(e,t,n,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){if(A!==1023&&i.convert(A)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function a(A){let F=A===1016&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));if(A!==1009&&i.convert(A)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==1015&&!F)return!1;return!0}function l(A){if(A==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";A="mediump"}if(A==="mediump"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let c=n.precision!==void 0?n.precision:"highp",h=l(c);if(h!==c)console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h;let u=n.logarithmicDepthBuffer===!0,d=n.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=e.getParameter(e.MAX_TEXTURE_SIZE),p=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),m=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),x=e.getParameter(e.MAX_VARYING_VECTORS),T=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,b=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:v,maxVaryings:x,maxFragmentUniforms:T,vertexTextures:I,maxSamples:b}}function fp(e){let t=this,n=null,i=0,s=!1,r=!1,o=new Gn,a=new Fe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||i!==0||s;return s=d,i=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){n=h(u,d,0)},this.setState=function(u,d,f){let{clippingPlanes:g,clipIntersection:_,clipShadows:p}=u,m=e.get(u);if(!s||g===null||g.length===0||r&&!p)if(r)h(null);else c();else{let v=r?0:i,x=v*4,T=m.clippingState||null;l.value=T,T=h(g,d,x,f);for(let I=0;I!==x;++I)T[I]=n[I];m.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){if(l.value!==n)l.value=n,l.needsUpdate=i>0;t.numPlanes=i,t.numIntersection=0}function h(u,d,f,g){let _=u!==null?u.length:0,p=null;if(_!==0){if(p=l.value,g!==!0||p===null){let m=f+_*4,v=d.matrixWorldInverse;if(a.getNormalMatrix(v),p===null||p.length<m)p=new Float32Array(m);for(let x=0,T=f;x!==_;++x,T+=4)o.copy(u[x]).applyMatrix4(v,a),o.normal.toArray(p,T),p[T+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function pp(e){let t=new WeakMap;function n(o,a){if(a===303)o.mapping=301;else if(a===304)o.mapping=302;return o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===303||a===304)if(t.has(o)){let l=t.get(o).texture;return n(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new $l(l.height);return c.fromEquirectangularTexture(e,o),t.set(o,c),o.addEventListener("dispose",s),n(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);if(l!==void 0)t.delete(a),l.dispose()}function r(){t=new WeakMap}return{get:i,dispose:r}}class us extends po{constructor(e=-1,t=1,n=1,i=-1,s=0.1,r=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,r){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,r=n+e,o=i+t,a=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,r=s+l*this.view.width,o-=c*this.view.offsetY,a=o-c*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,a,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);if(t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null)t.object.view=Object.assign({},this.view);return t}}var Ci=4,ka=[0.125,0.215,0.35,0.446,0.526,0.582],ri=20,kr=new us,Ga=new Ee,Gr=null,Vr=0,Wr=0,Xr=!1,si=(1+Math.sqrt(5))/2,Ai=1/si,Va=[new w(-si,Ai,0),new w(si,Ai,0),new w(-Ai,0,si),new w(Ai,0,si),new w(0,si,-Ai),new w(0,si,Ai),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)];class to{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=0.1,i=100){Gr=this._renderer.getRenderTarget(),Vr=this._renderer.getActiveCubeFace(),Wr=this._renderer.getActiveMipmapLevel(),Xr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();if(s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0)this._blur(s,0,0,t);return this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=qa(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=Xa(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Gr,Vr,Wr),this._renderer.xr.enabled=Xr,e.scissorTest=!1,ks(e,0,0,e.width,e.height)}_fromTexture(e,t){if(e.mapping===301||e.mapping===302)this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width);else this._setSize(e.image.width/4);Gr=this._renderer.getRenderTarget(),Vr=this._renderer.getActiveCubeFace(),Wr=this._renderer.getActiveMipmapLevel(),Xr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:"srgb-linear",depthBuffer:!1},i=Wa(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=Wa(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=mp(s)),this._blurMaterial=gp(s,e,t)}return i}_compileMaterial(e){let t=new Me(this._lodPlanes[0],e);this._renderer.compile(t,kr)}_sceneToCubeUV(e,t,n,i){let o=new Tt(90,1,t,n),a=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,h=c.autoClear,u=c.toneMapping;c.getClearColor(Ga),c.toneMapping=0,c.autoClear=!1;let d=new at({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),f=new Me(new Ft,d),g=!1,_=e.background;if(_){if(_.isColor)d.color.copy(_),e.background=null,g=!0}else d.color.copy(Ga),g=!0;for(let p=0;p<6;p++){let m=p%3;if(m===0)o.up.set(0,a[p],0),o.lookAt(l[p],0,0);else if(m===1)o.up.set(0,0,a[p]),o.lookAt(0,l[p],0);else o.up.set(0,a[p],0),o.lookAt(0,0,l[p]);let v=this._cubeSize;if(ks(i,m*v,p>2?v:0,v,v),c.setRenderTarget(i),g)c.render(f,o);c.render(e,o)}f.geometry.dispose(),f.material.dispose(),c.toneMapping=u,c.autoClear=h,e.background=_}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===301||e.mapping===302;if(i){if(this._cubemapMaterial===null)this._cubemapMaterial=qa();this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=Xa();let s=i?this._cubemapMaterial:this._equirectMaterial,r=new Me(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;let a=this._cubeSize;ks(t,0,0,3*a,2*a),n.setRenderTarget(t),n.render(r,kr)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Va[(i-s-1)%Va.length];this._blur(e,s-1,s,r,o)}t.autoClear=n}_blur(e,t,n,i,s){let r=this._pingPongRenderTarget;this._halfBlur(e,r,t,n,i,"latitudinal",s),this._halfBlur(r,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,r,o){let a=this._renderer,l=this._blurMaterial;if(r!=="latitudinal"&&r!=="longitudinal")console.error("blur direction must be either latitudinal or longitudinal!");let c=3,h=new Me(this._lodPlanes[i],l),u=l.uniforms,d=this._sizeLods[n]-1,f=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*ri-1),g=s/f,_=isFinite(s)?1+Math.floor(c*g):ri;if(_>ri)console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${ri}`);let p=[],m=0;for(let b=0;b<ri;++b){let A=b/g,F=Math.exp(-A*A/2);if(p.push(F),b===0)m+=F;else if(b<_)m+=2*F}for(let b=0;b<p.length;b++)p[b]=p[b]/m;if(u.envMap.value=e.texture,u.samples.value=_,u.weights.value=p,u.latitudinal.value=r==="latitudinal",o)u.poleAxis.value=o;let{_lodMax:v}=this;u.dTheta.value=f,u.mipInt.value=v-n;let x=this._sizeLods[i],T=3*x*(i>v-Ci?i-v+Ci:0),I=4*(this._cubeSize-x);ks(t,T,I,3*x,2*x),a.setRenderTarget(t),a.render(h,kr)}}function mp(e){let t=[],n=[],i=[],s=e,r=e-Ci+1+ka.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);n.push(a);let l=1/a;if(o>e-Ci)l=ka[o-e+Ci-1];else if(o===0)l=0;i.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,p=2,m=1,v=new Float32Array(_*g*f),x=new Float32Array(p*g*f),T=new Float32Array(m*g*f);for(let b=0;b<f;b++){let A=b%3*2/3-1,F=b>2?0:-1,S=[A,F,0,A+0.6666666666666666,F,0,A+0.6666666666666666,F+1,0,A,F,0,A+0.6666666666666666,F+1,0,A,F+1,0];v.set(S,_*g*b),x.set(d,p*g*b);let E=[b,b,b,b,b,b];T.set(E,m*g*b)}let I=new ut;if(I.setAttribute("position",new bt(v,_)),I.setAttribute("uv",new bt(x,p)),I.setAttribute("faceIndex",new bt(T,m)),t.push(I),s>Ci)s--}return{lodPlanes:t,sizeLods:n,sigmas:i}}function Wa(e,t,n){let i=new Wn(e,t,n);return i.texture.mapping=306,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ks(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function gp(e,t,n){let i=new Float32Array(ri),s=new w(0,1,0);return new Rn({name:"SphericalGaussianBlur",defines:{n:ri,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:go(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Xa(){return new Rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:go(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function qa(){return new Rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:go(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function go(){return`

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
	`}function _p(e){let t=new WeakMap,n=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===303||l===304,h=l===301||l===302;if(c||h){let u=t.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d){if(n===null)n=new to(e);return u=c?n.fromEquirectangular(a,u):n.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture}else if(u!==void 0)return u.texture;else{let f=a.image;if(c&&f&&f.height>0||h&&f&&s(f)){if(n===null)n=new to(e);return u=c?n.fromEquirectangular(a):n.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture}else return null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)if(a[h]!==void 0)l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);if(c!==void 0)t.delete(l),c.dispose()}function o(){if(t=new WeakMap,n!==null)n.dispose(),n=null}return{get:i,dispose:o}}function xp(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=e.getExtension(i)}return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let s=n(i);if(s===null)ns("THREE.WebGLRenderer: "+i+" extension not supported.");return s}}}function yp(e,t,n,i){let s={},r=new WeakMap;function o(u){let d=u.target;if(d.index!==null)t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);for(let g in d.morphAttributes){let _=d.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)t.remove(_[p])}d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);if(f)t.remove(f),r.delete(d);if(i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0)delete d._maxInstanceCount;n.memory.geometries--}function a(u,d){if(s[d.id]===!0)return d;return d.addEventListener("dispose",o),s[d.id]=!0,n.memory.geometries++,d}function l(u){let d=u.attributes;for(let g in d)t.update(d[g],e.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let _=f[g];for(let p=0,m=_.length;p<m;p++)t.update(_[p],e.ARRAY_BUFFER)}}function c(u){let d=[],f=u.index,g=u.attributes.position,_=0;if(f!==null){let v=f.array;_=f.version;for(let x=0,T=v.length;x<T;x+=3){let I=v[x+0],b=v[x+1],A=v[x+2];d.push(I,b,b,A,A,I)}}else if(g!==void 0){let v=g.array;_=g.version;for(let x=0,T=v.length/3-1;x<T;x+=3){let I=x+0,b=x+1,A=x+2;d.push(I,b,b,A,A,I)}}else return;let p=new((Vl(d))?fo:uo)(d,1);p.version=_;let m=r.get(u);if(m)t.remove(m);r.set(u,p)}function h(u){let d=r.get(u);if(d){let f=u.index;if(f!==null){if(d.version<f.version)c(u)}}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function vp(e,t,n){let i;function s(d){i=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){e.drawElements(i,f,r,d*o),n.update(f,i,1)}function c(d,f,g){if(g===0)return;e.drawElementsInstanced(i,f,r,d*o,g),n.update(f,i,g)}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,d,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];n.update(p,i,1)}function u(d,f,g,_){if(g===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)c(d[m]/o,f[m],_[m]);else{p.multiDrawElementsInstancedWEBGL(i,f,0,r,d,0,_,0,g);let m=0;for(let v=0;v<g;v++)m+=f[v]*_[v];n.update(m,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Mp(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(n.calls++,o){case e.TRIANGLES:n.triangles+=a*(r/3);break;case e.LINES:n.lines+=a*(r/2);break;case e.LINE_STRIP:n.lines+=a*(r-1);break;case e.LINE_LOOP:n.lines+=a*r;break;case e.POINTS:n.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function Sp(e,t,n){let i=new WeakMap,s=new Ze;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(a);if(d===void 0||d.count!==u){let S=function(){A.dispose(),i.delete(a),a.removeEventListener("dispose",S)};if(d!==void 0)d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],x=0;if(f===!0)x=1;if(g===!0)x=2;if(_===!0)x=3;let T=a.attributes.position.count*x,I=1;if(T>t.maxTextureSize)I=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize;let b=new Float32Array(T*I*4*u),A=new ho(b,T,I,u);A.type=1015,A.needsUpdate=!0;let F=x*4;for(let E=0;E<u;E++){let C=p[E],z=m[E],k=v[E],G=T*I*4*E;for(let K=0;K<C.count;K++){let V=K*F;if(f===!0)s.fromBufferAttribute(C,K),b[G+V+0]=s.x,b[G+V+1]=s.y,b[G+V+2]=s.z,b[G+V+3]=0;if(g===!0)s.fromBufferAttribute(z,K),b[G+V+4]=s.x,b[G+V+5]=s.y,b[G+V+6]=s.z,b[G+V+7]=0;if(_===!0)s.fromBufferAttribute(k,K),b[G+V+8]=s.x,b[G+V+9]=s.y,b[G+V+10]=s.z,b[G+V+11]=k.itemSize===4?s.w:1}}d={count:u,texture:A,size:new ue(T,I)},i.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",o.morphTexture,n);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(e,"morphTargetBaseInfluence",g),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",d.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",d.size)}return{update:r}}function Ep(e,t,n,i){let s=new WeakMap;function r(l){let c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c)t.update(u),s.set(u,c);if(l.isInstancedMesh){if(l.hasEventListener("dispose",a)===!1)l.addEventListener("dispose",a);if(s.get(l)!==c){if(n.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null)n.update(l.instanceColor,e.ARRAY_BUFFER);s.set(l,c)}}if(l.isSkinnedMesh){let d=l.skeleton;if(s.get(d)!==c)d.update(),s.set(d,c)}return u}function o(){s=new WeakMap}function a(l){let c=l.target;if(c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null)n.remove(c.instanceColor)}return{update:r,dispose:o}}class _o extends xt{constructor(e,t,n,i,s,r,o,a,l,c=1026){if(c!==1026&&c!==1027)throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");if(n===void 0&&c===1026)n=1014;if(n===void 0&&c===1027)n=1020;super(null,i,s,r,o,a,c,n,l);this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:1003,this.minFilter=a!==void 0?a:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);if(this.compareFunction!==null)t.compareFunction=this.compareFunction;return t}}var jl=new xt,Ya=new _o(1,1),Ql=new ho,ec=new ql,tc=new mo,Za=[],Ka=[],$a=new Float32Array(16),Ja=new Float32Array(9),ja=new Float32Array(4);function Oi(e,t,n){let i=e[0];if(i<=0||i>0)return e;let s=t*n,r=Za[s];if(r===void 0)r=new Float32Array(s),Za[s]=r;if(t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=n,e[o].toArray(r,a)}return r}function Mt(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function St(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function sr(e,t){let n=Ka[t];if(n===void 0)n=new Int32Array(t),Ka[t]=n;for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function Tp(e,t){let n=this.cache;if(n[0]===t)return;e.uniform1f(this.addr,t),n[0]=t}function bp(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y)e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y}else{if(Mt(n,t))return;e.uniform2fv(this.addr,t),St(n,t)}}function wp(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z}else if(t.r!==void 0){if(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b}else{if(Mt(n,t))return;e.uniform3fv(this.addr,t),St(n,t)}}function Ap(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w}else{if(Mt(n,t))return;e.uniform4fv(this.addr,t),St(n,t)}}function Rp(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Mt(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),St(n,t)}else{if(Mt(n,i))return;ja.set(i),e.uniformMatrix2fv(this.addr,!1,ja),St(n,i)}}function Cp(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Mt(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),St(n,t)}else{if(Mt(n,i))return;Ja.set(i),e.uniformMatrix3fv(this.addr,!1,Ja),St(n,i)}}function Ip(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Mt(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),St(n,t)}else{if(Mt(n,i))return;$a.set(i),e.uniformMatrix4fv(this.addr,!1,$a),St(n,i)}}function Pp(e,t){let n=this.cache;if(n[0]===t)return;e.uniform1i(this.addr,t),n[0]=t}function Lp(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y)e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y}else{if(Mt(n,t))return;e.uniform2iv(this.addr,t),St(n,t)}}function Np(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z}else{if(Mt(n,t))return;e.uniform3iv(this.addr,t),St(n,t)}}function Dp(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w}else{if(Mt(n,t))return;e.uniform4iv(this.addr,t),St(n,t)}}function Up(e,t){let n=this.cache;if(n[0]===t)return;e.uniform1ui(this.addr,t),n[0]=t}function Fp(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y)e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y}else{if(Mt(n,t))return;e.uniform2uiv(this.addr,t),St(n,t)}}function Op(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z}else{if(Mt(n,t))return;e.uniform3uiv(this.addr,t),St(n,t)}}function Bp(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w}else{if(Mt(n,t))return;e.uniform4uiv(this.addr,t),St(n,t)}}function zp(e,t,n){let i=this.cache,s=n.allocateTextureUnit();if(i[0]!==s)e.uniform1i(this.addr,s),i[0]=s;let r;if(this.type===e.SAMPLER_2D_SHADOW)Ya.compareFunction=515,r=Ya;else r=jl;n.setTexture2D(t||r,s)}function Hp(e,t,n){let i=this.cache,s=n.allocateTextureUnit();if(i[0]!==s)e.uniform1i(this.addr,s),i[0]=s;n.setTexture3D(t||ec,s)}function kp(e,t,n){let i=this.cache,s=n.allocateTextureUnit();if(i[0]!==s)e.uniform1i(this.addr,s),i[0]=s;n.setTextureCube(t||tc,s)}function Gp(e,t,n){let i=this.cache,s=n.allocateTextureUnit();if(i[0]!==s)e.uniform1i(this.addr,s),i[0]=s;n.setTexture2DArray(t||Ql,s)}function Vp(e){switch(e){case 5126:return Tp;case 35664:return bp;case 35665:return wp;case 35666:return Ap;case 35674:return Rp;case 35675:return Cp;case 35676:return Ip;case 5124:case 35670:return Pp;case 35667:case 35671:return Lp;case 35668:case 35672:return Np;case 35669:case 35673:return Dp;case 5125:return Up;case 36294:return Fp;case 36295:return Op;case 36296:return Bp;case 35678:case 36198:case 36298:case 36306:case 35682:return zp;case 35679:case 36299:case 36307:return Hp;case 35680:case 36300:case 36308:case 36293:return kp;case 36289:case 36303:case 36311:case 36292:return Gp}}function Wp(e,t){e.uniform1fv(this.addr,t)}function Xp(e,t){let n=Oi(t,this.size,2);e.uniform2fv(this.addr,n)}function qp(e,t){let n=Oi(t,this.size,3);e.uniform3fv(this.addr,n)}function Yp(e,t){let n=Oi(t,this.size,4);e.uniform4fv(this.addr,n)}function Zp(e,t){let n=Oi(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Kp(e,t){let n=Oi(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function $p(e,t){let n=Oi(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Jp(e,t){e.uniform1iv(this.addr,t)}function jp(e,t){e.uniform2iv(this.addr,t)}function Qp(e,t){e.uniform3iv(this.addr,t)}function em(e,t){e.uniform4iv(this.addr,t)}function tm(e,t){e.uniform1uiv(this.addr,t)}function nm(e,t){e.uniform2uiv(this.addr,t)}function im(e,t){e.uniform3uiv(this.addr,t)}function sm(e,t){e.uniform4uiv(this.addr,t)}function rm(e,t,n){let i=this.cache,s=t.length,r=sr(n,s);if(!Mt(i,r))e.uniform1iv(this.addr,r),St(i,r);for(let o=0;o!==s;++o)n.setTexture2D(t[o]||jl,r[o])}function om(e,t,n){let i=this.cache,s=t.length,r=sr(n,s);if(!Mt(i,r))e.uniform1iv(this.addr,r),St(i,r);for(let o=0;o!==s;++o)n.setTexture3D(t[o]||ec,r[o])}function am(e,t,n){let i=this.cache,s=t.length,r=sr(n,s);if(!Mt(i,r))e.uniform1iv(this.addr,r),St(i,r);for(let o=0;o!==s;++o)n.setTextureCube(t[o]||tc,r[o])}function lm(e,t,n){let i=this.cache,s=t.length,r=sr(n,s);if(!Mt(i,r))e.uniform1iv(this.addr,r),St(i,r);for(let o=0;o!==s;++o)n.setTexture2DArray(t[o]||Ql,r[o])}function cm(e){switch(e){case 5126:return Wp;case 35664:return Xp;case 35665:return qp;case 35666:return Yp;case 35674:return Zp;case 35675:return Kp;case 35676:return $p;case 5124:case 35670:return Jp;case 35667:case 35671:return jp;case 35668:case 35672:return Qp;case 35669:case 35673:return em;case 5125:return tm;case 36294:return nm;case 36295:return im;case 36296:return sm;case 35678:case 36198:case 36298:case 36306:case 35682:return rm;case 35679:case 36299:case 36307:return om;case 35680:case 36300:case 36308:case 36293:return am;case 36289:case 36303:case 36311:case 36292:return lm}}class nc{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Vp(t.type)}}class ic{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=cm(t.type)}}class sc{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,r=i.length;s!==r;++s){let o=i[s];o.setValue(e,t[o.id],n)}}}var qr=/(\w+)(\])?(\[|\.)?/g;function Qa(e,t){e.seq.push(t),e.map[t.id]=t}function hm(e,t,n){let i=e.name,s=i.length;qr.lastIndex=0;while(!0){let r=qr.exec(i),o=qr.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l)a=a|0;if(c===void 0||c==="["&&o+2===s){Qa(n,c===void 0?new nc(a,e,t):new ic(a,e,t));break}else{let u=n.map[a];if(u===void 0)u=new sc(a),Qa(n,u);n=u}}}class os{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i),r=e.getUniformLocation(t,s.name);hm(s,r,this)}}setValue(e,t,n,i){let s=this.map[t];if(s!==void 0)s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];if(i!==void 0)this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,r=t.length;s!==r;++s){let o=t[s],a=n[o.id];if(a.needsUpdate!==!1)o.setValue(e,a.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let r=e[i];if(r.id in t)n.push(r)}return n}}function el(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}var um=37297,dm=0;function fm(e,t){let n=e.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,n.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}var tl=new Fe;function pm(e){We._getMatrix(tl,We.workingColorSpace,e);let t=`mat3( ${tl.elements.map((n)=>n.toFixed(4))} )`;switch(We.getTransfer(e)){case"linear":return[t,"LinearTransferOETF"];case"srgb":return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function nl(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),s=e.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+fm(e.getShaderSource(t),o)}else return s}function mm(e,t){let n=pm(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function gm(e,t){let n;switch(t){case 1:n="Linear";break;case 2:n="Reinhard";break;case 3:n="Cineon";break;case 4:n="ACESFilmic";break;case 6:n="AgX";break;case 7:n="Neutral";break;case 5:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var Gs=new w;function _m(){We.getLuminanceCoefficients(Gs);let e=Gs.x.toFixed(4),t=Gs.y.toFixed(4),n=Gs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function xm(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(is).join(`
`)}function ym(e){let t=[];for(let n in e){let i=e[n];if(i===!1)continue;t.push("#define "+n+" "+i)}return t.join(`
`)}function vm(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=e.getActiveAttrib(t,s),o=r.name,a=1;if(r.type===e.FLOAT_MAT2)a=2;if(r.type===e.FLOAT_MAT3)a=3;if(r.type===e.FLOAT_MAT4)a=4;n[o]={type:r.type,location:e.getAttribLocation(t,o),locationSize:a}}return n}function is(e){return e!==""}function il(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function sl(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Mm=/^[ \t]*#include +<([\w\d./]+)>/gm;function no(e){return e.replace(Mm,Em)}var Sm=new Map;function Em(e,t){let n=Be[t];if(n===void 0){let i=Sm.get(t);if(i!==void 0)n=Be[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw Error("Can not resolve #include <"+t+">")}return no(n)}var Tm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rl(e){return e.replace(Tm,bm)}function bm(e,t,n,i){let s="";for(let r=parseInt(t);r<parseInt(n);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ol(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;if(e.precision==="highp")t+=`
#define HIGH_PRECISION`;else if(e.precision==="mediump")t+=`
#define MEDIUM_PRECISION`;else if(e.precision==="lowp")t+=`
#define LOW_PRECISION`;return t}function wm(e){let t="SHADOWMAP_TYPE_BASIC";if(e.shadowMapType===1)t="SHADOWMAP_TYPE_PCF";else if(e.shadowMapType===2)t="SHADOWMAP_TYPE_PCF_SOFT";else if(e.shadowMapType===3)t="SHADOWMAP_TYPE_VSM";return t}function Am(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case 301:case 302:t="ENVMAP_TYPE_CUBE";break;case 306:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Rm(e){let t="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case 302:t="ENVMAP_MODE_REFRACTION";break}return t}function Cm(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case 0:t="ENVMAP_BLENDING_MULTIPLY";break;case 1:t="ENVMAP_BLENDING_MIX";break;case 2:t="ENVMAP_BLENDING_ADD";break}return t}function Im(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function Pm(e,t,n,i){let s=e.getContext(),r=n.defines,o=n.vertexShader,a=n.fragmentShader,l=wm(n),c=Am(n),h=Rm(n),u=Cm(n),d=Im(n),f=xm(n),g=ym(r),_=s.createProgram(),p,m,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";if(n.isRawShaderMaterial){if(p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(is).join(`
`),p.length>0)p+=`
`;if(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(is).join(`
`),m.length>0)m+=`
`}else p=[ol(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(is).join(`
`),m=[ol(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+h:"",n.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==0?"#define TONE_MAPPING":"",n.toneMapping!==0?Be.tonemapping_pars_fragment:"",n.toneMapping!==0?gm("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,mm("linearToOutputTexel",n.outputColorSpace),_m(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(is).join(`
`);if(o=no(o),o=il(o,n),o=sl(o,n),a=no(a),a=il(a,n),a=sl(a,n),o=rl(o),a=rl(a),n.isRawShaderMaterial!==!0)v=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",n.glslVersion==="300 es"?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion==="300 es"?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m;let x=v+p+o,T=v+m+a,I=el(s,s.VERTEX_SHADER,x),b=el(s,s.FRAGMENT_SHADER,T);if(s.attachShader(_,I),s.attachShader(_,b),n.index0AttributeName!==void 0)s.bindAttribLocation(_,0,n.index0AttributeName);else if(n.morphTargets===!0)s.bindAttribLocation(_,0,"position");s.linkProgram(_);function A(C){if(e.debug.checkShaderErrors){let z=s.getProgramInfoLog(_).trim(),k=s.getShaderInfoLog(I).trim(),G=s.getShaderInfoLog(b).trim(),K=!0,V=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(K=!1,typeof e.debug.onShaderError==="function")e.debug.onShaderError(s,_,I,b);else{let j=nl(s,I,"vertex"),H=nl(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+z+`
`+j+`
`+H)}else if(z!=="")console.warn("THREE.WebGLProgram: Program Info Log:",z);else if(k===""||G==="")V=!1;if(V)C.diagnostics={runnable:K,programLog:z,vertexShader:{log:k,prefix:p},fragmentShader:{log:G,prefix:m}}}s.deleteShader(I),s.deleteShader(b),F=new os(s,_),S=vm(s,_)}let F;this.getUniforms=function(){if(F===void 0)A(this);return F};let S;this.getAttributes=function(){if(S===void 0)A(this);return S};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(E===!1)E=s.getProgramParameter(_,um);return E},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=dm++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=I,this.fragmentShader=b,this}var Lm=0;class rc{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let{vertexShader:t,fragmentShader:n}=e,i=this._getShaderStage(t),s=this._getShaderStage(n),r=this._getShaderCacheForMaterial(e);if(r.has(i)===!1)r.add(i),i.usedTimes++;if(r.has(s)===!1)r.add(s),s.usedTimes++;return this}remove(e){let t=this.materialCache.get(e);for(let n of t)if(n.usedTimes--,n.usedTimes===0)this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);if(n===void 0)n=new Set,t.set(e,n);return n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);if(n===void 0)n=new oc(e),t.set(e,n);return n}}class oc{constructor(e){this.id=Lm++,this.code=e,this.usedTimes=0}}function Nm(e,t,n,i,s,r,o){let a=new nr,l=new rc,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){if(c.add(S),S===0)return"uv";return`uv${S}`}function p(S,E,C,z,k){let G=z.fog,K=k.geometry,V=S.isMeshStandardMaterial?z.environment:null,j=(S.isMeshStandardMaterial?n:t).get(S.envMap||V),H=!!j&&j.mapping===306?j.image.height:null,ce=g[S.type];if(S.precision!==null){if(f=s.getMaxPrecision(S.precision),f!==S.precision)console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead.")}let de=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Ie=de!==void 0?de.length:0,Ve=0;if(K.morphAttributes.position!==void 0)Ve=1;if(K.morphAttributes.normal!==void 0)Ve=2;if(K.morphAttributes.color!==void 0)Ve=3;let q,ee,Se,Te;if(ce){let $e=pn[ce];q=$e.vertexShader,ee=$e.fragmentShader}else q=S.vertexShader,ee=S.fragmentShader,l.update(S),Se=l.getVertexShaderID(S),Te=l.getFragmentShaderID(S);let se=e.getRenderTarget(),Ae=e.state.buffers.depth.getReversed(),nt=k.isInstancedMesh===!0,Xe=k.isBatchedMesh===!0,qe=!!S.map,wt=!!S.matcap,D=!!j,At=!!S.aoMap,it=!!S.lightMap,st=!!S.bumpMap,ge=!!S.normalMap,pt=!!S.displacementMap,be=!!S.emissiveMap,Le=!!S.metalnessMap,R=!!S.roughnessMap,y=S.anisotropy>0,U=S.clearcoat>0,Z=S.dispersion>0,J=S.iridescence>0,W=S.sheen>0,we=S.transmission>0,re=y&&!!S.anisotropyMap,pe=U&&!!S.clearcoatMap,Ne=U&&!!S.clearcoatNormalMap,te=U&&!!S.clearcoatRoughnessMap,fe=J&&!!S.iridescenceMap,ke=J&&!!S.iridescenceThicknessMap,Ce=W&&!!S.sheenColorMap,me=W&&!!S.sheenRoughnessMap,De=!!S.specularMap,He=!!S.specularColorMap,dt=!!S.specularIntensityMap,P=we&&!!S.transmissionMap,Q=we&&!!S.thicknessMap,X=!!S.gradientMap,Y=!!S.alphaMap,he=S.alphaTest>0,oe=!!S.alphaHash,Oe=!!S.extensions,mt=0;if(S.toneMapped){if(se===null||se.isXRRenderTarget===!0)mt=e.toneMapping}let Rt={shaderID:ce,shaderType:S.type,shaderName:S.name,vertexShader:q,fragmentShader:ee,defines:S.defines,customVertexShaderID:Se,customFragmentShaderID:Te,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Xe,batchingColor:Xe&&k._colorsTexture!==null,instancing:nt,instancingColor:nt&&k.instanceColor!==null,instancingMorph:nt&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:se===null?e.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:"srgb-linear",alphaToCoverage:!!S.alphaToCoverage,map:qe,matcap:wt,envMap:D,envMapMode:D&&j.mapping,envMapCubeUVHeight:H,aoMap:At,lightMap:it,bumpMap:st,normalMap:ge,displacementMap:d&&pt,emissiveMap:be,normalMapObjectSpace:ge&&S.normalMapType===1,normalMapTangentSpace:ge&&S.normalMapType===0,metalnessMap:Le,roughnessMap:R,anisotropy:y,anisotropyMap:re,clearcoat:U,clearcoatMap:pe,clearcoatNormalMap:Ne,clearcoatRoughnessMap:te,dispersion:Z,iridescence:J,iridescenceMap:fe,iridescenceThicknessMap:ke,sheen:W,sheenColorMap:Ce,sheenRoughnessMap:me,specularMap:De,specularColorMap:He,specularIntensityMap:dt,transmission:we,transmissionMap:P,thicknessMap:Q,gradientMap:X,opaque:S.transparent===!1&&S.blending===1&&S.alphaToCoverage===!1,alphaMap:Y,alphaTest:he,alphaHash:oe,combine:S.combine,mapUv:qe&&_(S.map.channel),aoMapUv:At&&_(S.aoMap.channel),lightMapUv:it&&_(S.lightMap.channel),bumpMapUv:st&&_(S.bumpMap.channel),normalMapUv:ge&&_(S.normalMap.channel),displacementMapUv:pt&&_(S.displacementMap.channel),emissiveMapUv:be&&_(S.emissiveMap.channel),metalnessMapUv:Le&&_(S.metalnessMap.channel),roughnessMapUv:R&&_(S.roughnessMap.channel),anisotropyMapUv:re&&_(S.anisotropyMap.channel),clearcoatMapUv:pe&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Ne&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:ke&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:me&&_(S.sheenRoughnessMap.channel),specularMapUv:De&&_(S.specularMap.channel),specularColorMapUv:He&&_(S.specularColorMap.channel),specularIntensityMapUv:dt&&_(S.specularIntensityMap.channel),transmissionMapUv:P&&_(S.transmissionMap.channel),thicknessMapUv:Q&&_(S.thicknessMap.channel),alphaMapUv:Y&&_(S.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(ge||y),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!K.attributes.uv&&(qe||Y),fog:!!G,useFog:S.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ae,skinning:k.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:Ie,morphTextureStride:Ve,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:e.shadowMap.enabled&&C.length>0,shadowMapType:e.shadowMap.type,toneMapping:mt,decodeVideoTexture:qe&&S.map.isVideoTexture===!0&&We.getTransfer(S.map.colorSpace)==="srgb",decodeVideoTextureEmissive:be&&S.emissiveMap.isVideoTexture===!0&&We.getTransfer(S.emissiveMap.colorSpace)==="srgb",premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===2,flipSided:S.side===1,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Oe&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Oe&&S.extensions.multiDraw===!0||Xe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Rt.vertexUv1s=c.has(1),Rt.vertexUv2s=c.has(2),Rt.vertexUv3s=c.has(3),c.clear(),Rt}function m(S){let E=[];if(S.shaderID)E.push(S.shaderID);else E.push(S.customVertexShaderID),E.push(S.customFragmentShaderID);if(S.defines!==void 0)for(let C in S.defines)E.push(C),E.push(S.defines[C]);if(S.isRawShaderMaterial===!1)v(E,S),x(E,S),E.push(e.outputColorSpace);return E.push(S.customProgramCacheKey),E.join()}function v(S,E){S.push(E.precision),S.push(E.outputColorSpace),S.push(E.envMapMode),S.push(E.envMapCubeUVHeight),S.push(E.mapUv),S.push(E.alphaMapUv),S.push(E.lightMapUv),S.push(E.aoMapUv),S.push(E.bumpMapUv),S.push(E.normalMapUv),S.push(E.displacementMapUv),S.push(E.emissiveMapUv),S.push(E.metalnessMapUv),S.push(E.roughnessMapUv),S.push(E.anisotropyMapUv),S.push(E.clearcoatMapUv),S.push(E.clearcoatNormalMapUv),S.push(E.clearcoatRoughnessMapUv),S.push(E.iridescenceMapUv),S.push(E.iridescenceThicknessMapUv),S.push(E.sheenColorMapUv),S.push(E.sheenRoughnessMapUv),S.push(E.specularMapUv),S.push(E.specularColorMapUv),S.push(E.specularIntensityMapUv),S.push(E.transmissionMapUv),S.push(E.thicknessMapUv),S.push(E.combine),S.push(E.fogExp2),S.push(E.sizeAttenuation),S.push(E.morphTargetsCount),S.push(E.morphAttributeCount),S.push(E.numDirLights),S.push(E.numPointLights),S.push(E.numSpotLights),S.push(E.numSpotLightMaps),S.push(E.numHemiLights),S.push(E.numRectAreaLights),S.push(E.numDirLightShadows),S.push(E.numPointLightShadows),S.push(E.numSpotLightShadows),S.push(E.numSpotLightShadowsWithMaps),S.push(E.numLightProbes),S.push(E.shadowMapType),S.push(E.toneMapping),S.push(E.numClippingPlanes),S.push(E.numClipIntersection),S.push(E.depthPacking)}function x(S,E){if(a.disableAll(),E.supportsVertexTextures)a.enable(0);if(E.instancing)a.enable(1);if(E.instancingColor)a.enable(2);if(E.instancingMorph)a.enable(3);if(E.matcap)a.enable(4);if(E.envMap)a.enable(5);if(E.normalMapObjectSpace)a.enable(6);if(E.normalMapTangentSpace)a.enable(7);if(E.clearcoat)a.enable(8);if(E.iridescence)a.enable(9);if(E.alphaTest)a.enable(10);if(E.vertexColors)a.enable(11);if(E.vertexAlphas)a.enable(12);if(E.vertexUv1s)a.enable(13);if(E.vertexUv2s)a.enable(14);if(E.vertexUv3s)a.enable(15);if(E.vertexTangents)a.enable(16);if(E.anisotropy)a.enable(17);if(E.alphaHash)a.enable(18);if(E.batching)a.enable(19);if(E.dispersion)a.enable(20);if(E.batchingColor)a.enable(21);if(S.push(a.mask),a.disableAll(),E.fog)a.enable(0);if(E.useFog)a.enable(1);if(E.flatShading)a.enable(2);if(E.logarithmicDepthBuffer)a.enable(3);if(E.reverseDepthBuffer)a.enable(4);if(E.skinning)a.enable(5);if(E.morphTargets)a.enable(6);if(E.morphNormals)a.enable(7);if(E.morphColors)a.enable(8);if(E.premultipliedAlpha)a.enable(9);if(E.shadowMapEnabled)a.enable(10);if(E.doubleSided)a.enable(11);if(E.flipSided)a.enable(12);if(E.useDepthPacking)a.enable(13);if(E.dithering)a.enable(14);if(E.transmission)a.enable(15);if(E.sheen)a.enable(16);if(E.opaque)a.enable(17);if(E.pointsUvs)a.enable(18);if(E.decodeVideoTexture)a.enable(19);if(E.decodeVideoTextureEmissive)a.enable(20);if(E.alphaToCoverage)a.enable(21);S.push(a.mask)}function T(S){let E=g[S.type],C;if(E){let z=pn[E];C=Su.clone(z.uniforms)}else C=S.uniforms;return C}function I(S,E){let C;for(let z=0,k=h.length;z<k;z++){let G=h[z];if(G.cacheKey===E){C=G,++C.usedTimes;break}}if(C===void 0)C=new Pm(e,E,S,r),h.push(C);return C}function b(S){if(--S.usedTimes===0){let E=h.indexOf(S);h[E]=h[h.length-1],h.pop(),S.destroy()}}function A(S){l.remove(S)}function F(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:T,acquireProgram:I,releaseProgram:b,releaseShaderCache:A,programs:h,dispose:F}}function Dm(){let e=new WeakMap;function t(o){return e.has(o)}function n(o){let a=e.get(o);if(a===void 0)a={},e.set(o,a);return a}function i(o){e.delete(o)}function s(o,a,l){e.get(o)[a]=l}function r(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:r}}function Um(e,t){if(e.groupOrder!==t.groupOrder)return e.groupOrder-t.groupOrder;else if(e.renderOrder!==t.renderOrder)return e.renderOrder-t.renderOrder;else if(e.material.id!==t.material.id)return e.material.id-t.material.id;else if(e.z!==t.z)return e.z-t.z;else return e.id-t.id}function al(e,t){if(e.groupOrder!==t.groupOrder)return e.groupOrder-t.groupOrder;else if(e.renderOrder!==t.renderOrder)return e.renderOrder-t.renderOrder;else if(e.z!==t.z)return t.z-e.z;else return e.id-t.id}function ll(){let e=[],t=0,n=[],i=[],s=[];function r(){t=0,n.length=0,i.length=0,s.length=0}function o(u,d,f,g,_,p){let m=e[t];if(m===void 0)m={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},e[t]=m;else m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=_,m.group=p;return t++,m}function a(u,d,f,g,_,p){let m=o(u,d,f,g,_,p);if(f.transmission>0)i.push(m);else if(f.transparent===!0)s.push(m);else n.push(m)}function l(u,d,f,g,_,p){let m=o(u,d,f,g,_,p);if(f.transmission>0)i.unshift(m);else if(f.transparent===!0)s.unshift(m);else n.unshift(m)}function c(u,d){if(n.length>1)n.sort(u||Um);if(i.length>1)i.sort(d||al);if(s.length>1)s.sort(d||al)}function h(){for(let u=t,d=e.length;u<d;u++){let f=e[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:n,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Fm(){let e=new WeakMap;function t(i,s){let r=e.get(i),o;if(r===void 0)o=new ll,e.set(i,[o]);else if(s>=r.length)o=new ll,r.push(o);else o=r[s];return o}function n(){e=new WeakMap}return{get:t,dispose:n}}function Om(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new w,color:new Ee};break;case"SpotLight":n={position:new w,direction:new w,color:new Ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new w,color:new Ee,distance:0,decay:0};break;case"HemisphereLight":n={direction:new w,skyColor:new Ee,groundColor:new Ee};break;case"RectAreaLight":n={color:new Ee,position:new w,halfWidth:new w,halfHeight:new w};break}return e[t.id]=n,n}}}function Bm(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1000};break}return e[t.id]=n,n}}}var zm=0;function Hm(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function km(e){let t=new Om,n=Bm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new w);let s=new w,r=new Re,o=new Re;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let f=0,g=0,_=0,p=0,m=0,v=0,x=0,T=0,I=0,b=0,A=0;c.sort(Hm);for(let S=0,E=c.length;S<E;S++){let C=c[S],z=C.color,k=C.intensity,G=C.distance,K=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=z.r*k,u+=z.g*k,d+=z.b*k;else if(C.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(C.sh.coefficients[V],k);A++}else if(C.isDirectionalLight){let V=t.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let j=C.shadow,H=n.get(C);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,i.directionalShadow[f]=H,i.directionalShadowMap[f]=K,i.directionalShadowMatrix[f]=C.shadow.matrix,v++}i.directional[f]=V,f++}else if(C.isSpotLight){let V=t.get(C);V.position.setFromMatrixPosition(C.matrixWorld),V.color.copy(z).multiplyScalar(k),V.distance=G,V.coneCos=Math.cos(C.angle),V.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),V.decay=C.decay,i.spot[_]=V;let j=C.shadow;if(C.map){if(i.spotLightMap[I]=C.map,I++,j.updateMatrices(C),C.castShadow)b++}if(i.spotLightMatrix[_]=j.matrix,C.castShadow){let H=n.get(C);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,i.spotShadow[_]=H,i.spotShadowMap[_]=K,T++}_++}else if(C.isRectAreaLight){let V=t.get(C);V.color.copy(z).multiplyScalar(k),V.halfWidth.set(C.width*0.5,0,0),V.halfHeight.set(0,C.height*0.5,0),i.rectArea[p]=V,p++}else if(C.isPointLight){let V=t.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),V.distance=C.distance,V.decay=C.decay,C.castShadow){let j=C.shadow,H=n.get(C);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,H.shadowCameraNear=j.camera.near,H.shadowCameraFar=j.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=K,i.pointShadowMatrix[g]=C.shadow.matrix,x++}i.point[g]=V,g++}else if(C.isHemisphereLight){let V=t.get(C);V.skyColor.copy(C.color).multiplyScalar(k),V.groundColor.copy(C.groundColor).multiplyScalar(k),i.hemi[m]=V,m++}}if(p>0)if(e.has("OES_texture_float_linear")===!0)i.rectAreaLTC1=ie.LTC_FLOAT_1,i.rectAreaLTC2=ie.LTC_FLOAT_2;else i.rectAreaLTC1=ie.LTC_HALF_1,i.rectAreaLTC2=ie.LTC_HALF_2;i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let F=i.hash;if(F.directionalLength!==f||F.pointLength!==g||F.spotLength!==_||F.rectAreaLength!==p||F.hemiLength!==m||F.numDirectionalShadows!==v||F.numPointShadows!==x||F.numSpotShadows!==T||F.numSpotMaps!==I||F.numLightProbes!==A)i.directional.length=f,i.spot.length=_,i.rectArea.length=p,i.point.length=g,i.hemi.length=m,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=T+I-b,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=A,F.directionalLength=f,F.pointLength=g,F.spotLength=_,F.rectAreaLength=p,F.hemiLength=m,F.numDirectionalShadows=v,F.numPointShadows=x,F.numSpotShadows=T,F.numSpotMaps=I,F.numLightProbes=A,i.version=zm++}function l(c,h){let u=0,d=0,f=0,g=0,_=0,p=h.matrixWorldInverse;for(let m=0,v=c.length;m<v;m++){let x=c[m];if(x.isDirectionalLight){let T=i.directional[u];T.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),u++}else if(x.isSpotLight){let T=i.spot[f];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(p),T.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),f++}else if(x.isRectAreaLight){let T=i.rectArea[g];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(p),o.identity(),r.copy(x.matrixWorld),r.premultiply(p),o.extractRotation(r),T.halfWidth.set(x.width*0.5,0,0),T.halfHeight.set(0,x.height*0.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){let T=i.point[d];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(p),d++}else if(x.isHemisphereLight){let T=i.hemi[_];T.direction.setFromMatrixPosition(x.matrixWorld),T.direction.transformDirection(p),_++}}}return{setup:a,setupView:l,state:i}}function cl(e){let t=new km(e),n=[],i=[];function s(h){c.camera=h,n.length=0,i.length=0}function r(h){n.push(h)}function o(h){i.push(h)}function a(){t.setup(n)}function l(h){t.setupView(n,h)}let c={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Gm(e){let t=new WeakMap;function n(s,r=0){let o=t.get(s),a;if(o===void 0)a=new cl(e),t.set(s,[a]);else if(r>=o.length)a=new cl(e),o.push(a);else a=o[r];return a}function i(){t=new WeakMap}return{get:n,dispose:i}}class ac extends Gt{static get type(){return"MeshDepthMaterial"}constructor(e){super();this.isMeshDepthMaterial=!0,this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class lc extends Gt{static get type(){return"MeshDistanceMaterial"}constructor(e){super();this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}var Vm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Wm=`uniform sampler2D shadow_pass;
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
}`;function Xm(e,t,n){let i=new ir,s=new ue,r=new ue,o=new Ze,a=new ac({depthPacking:3201}),l=new lc,c={},h=n.maxTextureSize,u={[0]:1,[1]:0,[2]:2},d=new Rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:Vm,fragmentShader:Wm}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new ut;g.setAttribute("position",new bt(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let _=new Me(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let m=this.type;this.render=function(b,A,F){if(p.enabled===!1)return;if(p.autoUpdate===!1&&p.needsUpdate===!1)return;if(b.length===0)return;let S=e.getRenderTarget(),E=e.getActiveCubeFace(),C=e.getActiveMipmapLevel(),z=e.state;z.setBlending(0),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let k=m!==3&&this.type===3,G=m===3&&this.type!==3;for(let K=0,V=b.length;K<V;K++){let j=b[K],H=j.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let ce=H.getFrameExtents();if(s.multiply(ce),r.copy(H.mapSize),s.x>h||s.y>h){if(s.x>h)r.x=Math.floor(h/ce.x),s.x=r.x*ce.x,H.mapSize.x=r.x;if(s.y>h)r.y=Math.floor(h/ce.y),s.y=r.y*ce.y,H.mapSize.y=r.y}if(H.map===null||k===!0||G===!0){let Ie=this.type!==3?{minFilter:1003,magFilter:1003}:{};if(H.map!==null)H.map.dispose();H.map=new Wn(s.x,s.y,Ie),H.map.texture.name=j.name+".shadowMap",H.camera.updateProjectionMatrix()}e.setRenderTarget(H.map),e.clear();let de=H.getViewportCount();for(let Ie=0;Ie<de;Ie++){let Ve=H.getViewport(Ie);o.set(r.x*Ve.x,r.y*Ve.y,r.x*Ve.z,r.y*Ve.w),z.viewport(o),H.updateMatrices(j,Ie),i=H.getFrustum(),T(A,F,H.camera,j,this.type)}if(H.isPointLightShadow!==!0&&this.type===3)v(H,F);H.needsUpdate=!1}m=this.type,p.needsUpdate=!1,e.setRenderTarget(S,E,C)};function v(b,A){let F=t.update(_);if(d.defines.VSM_SAMPLES!==b.blurSamples)d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0;if(b.mapPass===null)b.mapPass=new Wn(s.x,s.y);d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,e.setRenderTarget(b.mapPass),e.clear(),e.renderBufferDirect(A,null,F,d,_,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,e.setRenderTarget(b.map),e.clear(),e.renderBufferDirect(A,null,F,f,_,null)}function x(b,A,F,S){let E=null,C=F.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(C!==void 0)E=C;else if(E=F.isPointLight===!0?l:a,e.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let z=E.uuid,k=A.uuid,G=c[z];if(G===void 0)G={},c[z]=G;let K=G[k];if(K===void 0)K=E.clone(),G[k]=K,A.addEventListener("dispose",I);E=K}if(E.visible=A.visible,E.wireframe=A.wireframe,S===3)E.side=A.shadowSide!==null?A.shadowSide:A.side;else E.side=A.shadowSide!==null?A.shadowSide:u[A.side];if(E.alphaMap=A.alphaMap,E.alphaTest=A.alphaTest,E.map=A.map,E.clipShadows=A.clipShadows,E.clippingPlanes=A.clippingPlanes,E.clipIntersection=A.clipIntersection,E.displacementMap=A.displacementMap,E.displacementScale=A.displacementScale,E.displacementBias=A.displacementBias,E.wireframeLinewidth=A.wireframeLinewidth,E.linewidth=A.linewidth,F.isPointLight===!0&&E.isMeshDistanceMaterial===!0){let z=e.properties.get(E);z.light=F}return E}function T(b,A,F,S,E){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)){if((b.castShadow||b.receiveShadow&&E===3)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,b.matrixWorld);let k=t.update(b),G=b.material;if(Array.isArray(G)){let K=k.groups;for(let V=0,j=K.length;V<j;V++){let H=K[V],ce=G[H.materialIndex];if(ce&&ce.visible){let de=x(b,ce,S,E);b.onBeforeShadow(e,b,A,F,k,de,H),e.renderBufferDirect(F,null,k,de,b,H),b.onAfterShadow(e,b,A,F,k,de,H)}}}else if(G.visible){let K=x(b,G,S,E);b.onBeforeShadow(e,b,A,F,k,K,null),e.renderBufferDirect(F,null,k,K,b,null),b.onAfterShadow(e,b,A,F,k,K,null)}}}let z=b.children;for(let k=0,G=z.length;k<G;k++)T(z[k],A,F,S,E)}function I(b){b.target.removeEventListener("dispose",I);for(let F in c){let S=c[F],E=b.target.uuid;if(E in S)S[E].dispose(),delete S[E]}}}var qm={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};function Ym(e,t){function n(){let P=!1,Q=new Ze,X=null,Y=new Ze(0,0,0,0);return{setMask:function(he){if(X!==he&&!P)e.colorMask(he,he,he,he),X=he},setLocked:function(he){P=he},setClear:function(he,oe,Oe,mt,Rt){if(Rt===!0)he*=mt,oe*=mt,Oe*=mt;if(Q.set(he,oe,Oe,mt),Y.equals(Q)===!1)e.clearColor(he,oe,Oe,mt),Y.copy(Q)},reset:function(){P=!1,X=null,Y.set(-1,0,0,0)}}}function i(){let P=!1,Q=!1,X=null,Y=null,he=null;return{setReversed:function(oe){if(Q!==oe){let Oe=t.get("EXT_clip_control");if(Q)Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT);else Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT);let mt=he;he=null,this.setClear(mt)}Q=oe},getReversed:function(){return Q},setTest:function(oe){if(oe)se(e.DEPTH_TEST);else Ae(e.DEPTH_TEST)},setMask:function(oe){if(X!==oe&&!P)e.depthMask(oe),X=oe},setFunc:function(oe){if(Q)oe=qm[oe];if(Y!==oe){switch(oe){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}Y=oe}},setLocked:function(oe){P=oe},setClear:function(oe){if(he!==oe){if(Q)oe=1-oe;e.clearDepth(oe),he=oe}},reset:function(){P=!1,X=null,Y=null,he=null,Q=!1}}}function s(){let P=!1,Q=null,X=null,Y=null,he=null,oe=null,Oe=null,mt=null,Rt=null;return{setTest:function($e){if(!P)if($e)se(e.STENCIL_TEST);else Ae(e.STENCIL_TEST)},setMask:function($e){if(Q!==$e&&!P)e.stencilMask($e),Q=$e},setFunc:function($e,yn,dn){if(X!==$e||Y!==yn||he!==dn)e.stencilFunc($e,yn,dn),X=$e,Y=yn,he=dn},setOp:function($e,yn,dn){if(oe!==$e||Oe!==yn||mt!==dn)e.stencilOp($e,yn,dn),oe=$e,Oe=yn,mt=dn},setLocked:function($e){P=$e},setClear:function($e){if(Rt!==$e)e.clearStencil($e),Rt=$e},reset:function(){P=!1,Q=null,X=null,Y=null,he=null,oe=null,Oe=null,mt=null,Rt=null}}}let r=new n,o=new i,a=new s,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],g=null,_=!1,p=null,m=null,v=null,x=null,T=null,I=null,b=null,A=new Ee(0,0,0),F=0,S=!1,E=null,C=null,z=null,k=null,G=null,K=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,j=0,H=e.getParameter(e.VERSION);if(H.indexOf("WebGL")!==-1)j=parseFloat(/^WebGL (\d)/.exec(H)[1]),V=j>=1;else if(H.indexOf("OpenGL ES")!==-1)j=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),V=j>=2;let ce=null,de={},Ie=e.getParameter(e.SCISSOR_BOX),Ve=e.getParameter(e.VIEWPORT),q=new Ze().fromArray(Ie),ee=new Ze().fromArray(Ve);function Se(P,Q,X,Y){let he=new Uint8Array(4),oe=e.createTexture();e.bindTexture(P,oe),e.texParameteri(P,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(P,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Oe=0;Oe<X;Oe++)if(P===e.TEXTURE_3D||P===e.TEXTURE_2D_ARRAY)e.texImage3D(Q,0,e.RGBA,1,1,Y,0,e.RGBA,e.UNSIGNED_BYTE,he);else e.texImage2D(Q+Oe,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,he);return oe}let Te={};Te[e.TEXTURE_2D]=Se(e.TEXTURE_2D,e.TEXTURE_2D,1),Te[e.TEXTURE_CUBE_MAP]=Se(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),Te[e.TEXTURE_2D_ARRAY]=Se(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),Te[e.TEXTURE_3D]=Se(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),se(e.DEPTH_TEST),o.setFunc(3),st(!1),ge(1),se(e.CULL_FACE),At(0);function se(P){if(h[P]!==!0)e.enable(P),h[P]=!0}function Ae(P){if(h[P]!==!1)e.disable(P),h[P]=!1}function nt(P,Q){if(u[P]!==Q){if(e.bindFramebuffer(P,Q),u[P]=Q,P===e.DRAW_FRAMEBUFFER)u[e.FRAMEBUFFER]=Q;if(P===e.FRAMEBUFFER)u[e.DRAW_FRAMEBUFFER]=Q;return!0}return!1}function Xe(P,Q){let X=f,Y=!1;if(P){if(X=d.get(Q),X===void 0)X=[],d.set(Q,X);let he=P.textures;if(X.length!==he.length||X[0]!==e.COLOR_ATTACHMENT0){for(let oe=0,Oe=he.length;oe<Oe;oe++)X[oe]=e.COLOR_ATTACHMENT0+oe;X.length=he.length,Y=!0}}else if(X[0]!==e.BACK)X[0]=e.BACK,Y=!0;if(Y)e.drawBuffers(X)}function qe(P){if(g!==P)return e.useProgram(P),g=P,!0;return!1}let wt={[100]:e.FUNC_ADD,[101]:e.FUNC_SUBTRACT,[102]:e.FUNC_REVERSE_SUBTRACT};wt[103]=e.MIN,wt[104]=e.MAX;let D={[200]:e.ZERO,[201]:e.ONE,[202]:e.SRC_COLOR,[204]:e.SRC_ALPHA,[210]:e.SRC_ALPHA_SATURATE,[208]:e.DST_COLOR,[206]:e.DST_ALPHA,[203]:e.ONE_MINUS_SRC_COLOR,[205]:e.ONE_MINUS_SRC_ALPHA,[209]:e.ONE_MINUS_DST_COLOR,[207]:e.ONE_MINUS_DST_ALPHA,[211]:e.CONSTANT_COLOR,[212]:e.ONE_MINUS_CONSTANT_COLOR,[213]:e.CONSTANT_ALPHA,[214]:e.ONE_MINUS_CONSTANT_ALPHA};function At(P,Q,X,Y,he,oe,Oe,mt,Rt,$e){if(P===0){if(_===!0)Ae(e.BLEND),_=!1;return}if(_===!1)se(e.BLEND),_=!0;if(P!==5){if(P!==p||$e!==S){if(m!==100||T!==100)e.blendEquation(e.FUNC_ADD),m=100,T=100;if($e)switch(P){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}v=null,x=null,I=null,b=null,A.set(0,0,0),F=0,p=P,S=$e}return}if(he=he||Q,oe=oe||X,Oe=Oe||Y,Q!==m||he!==T)e.blendEquationSeparate(wt[Q],wt[he]),m=Q,T=he;if(X!==v||Y!==x||oe!==I||Oe!==b)e.blendFuncSeparate(D[X],D[Y],D[oe],D[Oe]),v=X,x=Y,I=oe,b=Oe;if(mt.equals(A)===!1||Rt!==F)e.blendColor(mt.r,mt.g,mt.b,Rt),A.copy(mt),F=Rt;p=P,S=!1}function it(P,Q){P.side===2?Ae(e.CULL_FACE):se(e.CULL_FACE);let X=P.side===1;if(Q)X=!X;st(X),P.blending===1&&P.transparent===!1?At(0):At(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),o.setFunc(P.depthFunc),o.setTest(P.depthTest),o.setMask(P.depthWrite),r.setMask(P.colorWrite);let Y=P.stencilWrite;if(a.setTest(Y),Y)a.setMask(P.stencilWriteMask),a.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),a.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass);be(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?se(e.SAMPLE_ALPHA_TO_COVERAGE):Ae(e.SAMPLE_ALPHA_TO_COVERAGE)}function st(P){if(E!==P){if(P)e.frontFace(e.CW);else e.frontFace(e.CCW);E=P}}function ge(P){if(P!==0){if(se(e.CULL_FACE),P!==C)if(P===1)e.cullFace(e.BACK);else if(P===2)e.cullFace(e.FRONT);else e.cullFace(e.FRONT_AND_BACK)}else Ae(e.CULL_FACE);C=P}function pt(P){if(P!==z){if(V)e.lineWidth(P);z=P}}function be(P,Q,X){if(P){if(se(e.POLYGON_OFFSET_FILL),k!==Q||G!==X)e.polygonOffset(Q,X),k=Q,G=X}else Ae(e.POLYGON_OFFSET_FILL)}function Le(P){if(P)se(e.SCISSOR_TEST);else Ae(e.SCISSOR_TEST)}function R(P){if(P===void 0)P=e.TEXTURE0+K-1;if(ce!==P)e.activeTexture(P),ce=P}function y(P,Q,X){if(X===void 0)if(ce===null)X=e.TEXTURE0+K-1;else X=ce;let Y=de[X];if(Y===void 0)Y={type:void 0,texture:void 0},de[X]=Y;if(Y.type!==P||Y.texture!==Q){if(ce!==X)e.activeTexture(X),ce=X;e.bindTexture(P,Q||Te[P]),Y.type=P,Y.texture=Q}}function U(){let P=de[ce];if(P!==void 0&&P.type!==void 0)e.bindTexture(P.type,null),P.type=void 0,P.texture=void 0}function Z(){try{e.compressedTexImage2D.apply(e,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function J(){try{e.compressedTexImage3D.apply(e,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function W(){try{e.texSubImage2D.apply(e,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function we(){try{e.texSubImage3D.apply(e,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function re(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function pe(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ne(){try{e.texStorage2D.apply(e,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function te(){try{e.texStorage3D.apply(e,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function fe(){try{e.texImage2D.apply(e,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ke(){try{e.texImage3D.apply(e,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ce(P){if(q.equals(P)===!1)e.scissor(P.x,P.y,P.z,P.w),q.copy(P)}function me(P){if(ee.equals(P)===!1)e.viewport(P.x,P.y,P.z,P.w),ee.copy(P)}function De(P,Q){let X=c.get(Q);if(X===void 0)X=new WeakMap,c.set(Q,X);let Y=X.get(P);if(Y===void 0)Y=e.getUniformBlockIndex(Q,P.name),X.set(P,Y)}function He(P,Q){let Y=c.get(Q).get(P);if(l.get(Q)!==Y)e.uniformBlockBinding(Q,Y,P.__bindingPointIndex),l.set(Q,Y)}function dt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),h={},ce=null,de={},u={},d=new WeakMap,f=[],g=null,_=!1,p=null,m=null,v=null,x=null,T=null,I=null,b=null,A=new Ee(0,0,0),F=0,S=!1,E=null,C=null,z=null,k=null,G=null,q.set(0,0,e.canvas.width,e.canvas.height),ee.set(0,0,e.canvas.width,e.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:se,disable:Ae,bindFramebuffer:nt,drawBuffers:Xe,useProgram:qe,setBlending:At,setMaterial:it,setFlipSided:st,setCullFace:ge,setLineWidth:pt,setPolygonOffset:be,setScissorTest:Le,activeTexture:R,bindTexture:y,unbindTexture:U,compressedTexImage2D:Z,compressedTexImage3D:J,texImage2D:fe,texImage3D:ke,updateUBOMapping:De,uniformBlockBinding:He,texStorage2D:Ne,texStorage3D:te,texSubImage2D:W,texSubImage3D:we,compressedTexSubImage2D:re,compressedTexSubImage3D:pe,scissor:Ce,viewport:me,reset:dt}}function hl(e,t,n,i){let s=Zm(i);switch(n){case 1021:return e*t;case 1024:return e*t;case 1025:return e*t*2;case 1028:return e*t/s.components*s.byteLength;case 1029:return e*t/s.components*s.byteLength;case 1030:return e*t*2/s.components*s.byteLength;case 1031:return e*t*2/s.components*s.byteLength;case 1022:return e*t*3/s.components*s.byteLength;case 1023:return e*t*4/s.components*s.byteLength;case 1033:return e*t*4/s.components*s.byteLength;case 33776:case 33777:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case 33778:case 33779:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case 35841:case 35843:return Math.max(e,16)*Math.max(t,8)/4;case 35840:case 35842:return Math.max(e,8)*Math.max(t,8)/2;case 36196:case 37492:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case 37496:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case 37808:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case 37809:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case 37810:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case 37811:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case 37812:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case 37813:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case 37814:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case 37815:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case 37816:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case 37817:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case 37818:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case 37819:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case 37820:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case 37821:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(e/4)*Math.ceil(t/4)*16;case 36283:case 36284:return Math.ceil(e/4)*Math.ceil(t/4)*8;case 36285:case 36286:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Zm(e){switch(e){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${e}.`)}function Km(e,t,n,i,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ue,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(R){}function g(R,y){return f?new OffscreenCanvas(R,y):cs("canvas")}function _(R,y,U){let Z=1,J=Le(R);if(J.width>U||J.height>U)Z=U/Math.max(J.width,J.height);if(Z<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let W=Math.floor(Z*J.width),we=Math.floor(Z*J.height);if(u===void 0)u=g(W,we);let re=y?g(W,we):u;return re.width=W,re.height=we,re.getContext("2d").drawImage(R,0,0,W,we),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+W+"x"+we+")."),re}else{if("data"in R)console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+").");return R}return R}function p(R){return R.generateMipmaps}function m(R){e.generateMipmap(R)}function v(R){if(R.isWebGLCubeRenderTarget)return e.TEXTURE_CUBE_MAP;if(R.isWebGL3DRenderTarget)return e.TEXTURE_3D;if(R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture)return e.TEXTURE_2D_ARRAY;return e.TEXTURE_2D}function x(R,y,U,Z,J=!1){if(R!==null){if(e[R]!==void 0)return e[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let W=y;if(y===e.RED){if(U===e.FLOAT)W=e.R32F;if(U===e.HALF_FLOAT)W=e.R16F;if(U===e.UNSIGNED_BYTE)W=e.R8}if(y===e.RED_INTEGER){if(U===e.UNSIGNED_BYTE)W=e.R8UI;if(U===e.UNSIGNED_SHORT)W=e.R16UI;if(U===e.UNSIGNED_INT)W=e.R32UI;if(U===e.BYTE)W=e.R8I;if(U===e.SHORT)W=e.R16I;if(U===e.INT)W=e.R32I}if(y===e.RG){if(U===e.FLOAT)W=e.RG32F;if(U===e.HALF_FLOAT)W=e.RG16F;if(U===e.UNSIGNED_BYTE)W=e.RG8}if(y===e.RG_INTEGER){if(U===e.UNSIGNED_BYTE)W=e.RG8UI;if(U===e.UNSIGNED_SHORT)W=e.RG16UI;if(U===e.UNSIGNED_INT)W=e.RG32UI;if(U===e.BYTE)W=e.RG8I;if(U===e.SHORT)W=e.RG16I;if(U===e.INT)W=e.RG32I}if(y===e.RGB_INTEGER){if(U===e.UNSIGNED_BYTE)W=e.RGB8UI;if(U===e.UNSIGNED_SHORT)W=e.RGB16UI;if(U===e.UNSIGNED_INT)W=e.RGB32UI;if(U===e.BYTE)W=e.RGB8I;if(U===e.SHORT)W=e.RGB16I;if(U===e.INT)W=e.RGB32I}if(y===e.RGBA_INTEGER){if(U===e.UNSIGNED_BYTE)W=e.RGBA8UI;if(U===e.UNSIGNED_SHORT)W=e.RGBA16UI;if(U===e.UNSIGNED_INT)W=e.RGBA32UI;if(U===e.BYTE)W=e.RGBA8I;if(U===e.SHORT)W=e.RGBA16I;if(U===e.INT)W=e.RGBA32I}if(y===e.RGB){if(U===e.UNSIGNED_INT_5_9_9_9_REV)W=e.RGB9_E5}if(y===e.RGBA){let we=J?"linear":We.getTransfer(Z);if(U===e.FLOAT)W=e.RGBA32F;if(U===e.HALF_FLOAT)W=e.RGBA16F;if(U===e.UNSIGNED_BYTE)W=we==="srgb"?e.SRGB8_ALPHA8:e.RGBA8;if(U===e.UNSIGNED_SHORT_4_4_4_4)W=e.RGBA4;if(U===e.UNSIGNED_SHORT_5_5_5_1)W=e.RGB5_A1}if(W===e.R16F||W===e.R32F||W===e.RG16F||W===e.RG32F||W===e.RGBA16F||W===e.RGBA32F)t.get("EXT_color_buffer_float");return W}function T(R,y){let U;if(R){if(y===null||y===1014||y===1020)U=e.DEPTH24_STENCIL8;else if(y===1015)U=e.DEPTH32F_STENCIL8;else if(y===1012)U=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(y===null||y===1014||y===1020)U=e.DEPTH_COMPONENT24;else if(y===1015)U=e.DEPTH_COMPONENT32F;else if(y===1012)U=e.DEPTH_COMPONENT16;return U}function I(R,y){if(p(R)===!0||R.isFramebufferTexture&&R.minFilter!==1003&&R.minFilter!==1006)return Math.log2(Math.max(y.width,y.height))+1;else if(R.mipmaps!==void 0&&R.mipmaps.length>0)return R.mipmaps.length;else if(R.isCompressedTexture&&Array.isArray(R.image))return y.mipmaps.length;else return 1}function b(R){let y=R.target;if(y.removeEventListener("dispose",b),F(y),y.isVideoTexture)h.delete(y)}function A(R){let y=R.target;y.removeEventListener("dispose",A),E(y)}function F(R){let y=i.get(R);if(y.__webglInit===void 0)return;let U=R.source,Z=d.get(U);if(Z){let J=Z[y.__cacheKey];if(J.usedTimes--,J.usedTimes===0)S(R);if(Object.keys(Z).length===0)d.delete(U)}i.remove(R)}function S(R){let y=i.get(R);e.deleteTexture(y.__webglTexture);let U=R.source,Z=d.get(U);delete Z[y.__cacheKey],o.memory.textures--}function E(R){let y=i.get(R);if(R.depthTexture)R.depthTexture.dispose(),i.remove(R.depthTexture);if(R.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(y.__webglFramebuffer[Z]))for(let J=0;J<y.__webglFramebuffer[Z].length;J++)e.deleteFramebuffer(y.__webglFramebuffer[Z][J]);else e.deleteFramebuffer(y.__webglFramebuffer[Z]);if(y.__webglDepthbuffer)e.deleteRenderbuffer(y.__webglDepthbuffer[Z])}else{if(Array.isArray(y.__webglFramebuffer))for(let Z=0;Z<y.__webglFramebuffer.length;Z++)e.deleteFramebuffer(y.__webglFramebuffer[Z]);else e.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer)e.deleteRenderbuffer(y.__webglDepthbuffer);if(y.__webglMultisampledFramebuffer)e.deleteFramebuffer(y.__webglMultisampledFramebuffer);if(y.__webglColorRenderbuffer){for(let Z=0;Z<y.__webglColorRenderbuffer.length;Z++)if(y.__webglColorRenderbuffer[Z])e.deleteRenderbuffer(y.__webglColorRenderbuffer[Z])}if(y.__webglDepthRenderbuffer)e.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let U=R.textures;for(let Z=0,J=U.length;Z<J;Z++){let W=i.get(U[Z]);if(W.__webglTexture)e.deleteTexture(W.__webglTexture),o.memory.textures--;i.remove(U[Z])}i.remove(R)}let C=0;function z(){C=0}function k(){let R=C;if(R>=s.maxTextures)console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures);return C+=1,R}function G(R){let y=[];return y.push(R.wrapS),y.push(R.wrapT),y.push(R.wrapR||0),y.push(R.magFilter),y.push(R.minFilter),y.push(R.anisotropy),y.push(R.internalFormat),y.push(R.format),y.push(R.type),y.push(R.generateMipmaps),y.push(R.premultiplyAlpha),y.push(R.flipY),y.push(R.unpackAlignment),y.push(R.colorSpace),y.join()}function K(R,y){let U=i.get(R);if(R.isVideoTexture)pt(R);if(R.isRenderTargetTexture===!1&&R.version>0&&U.__version!==R.version){let Z=R.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ee(U,R,y);return}}n.bindTexture(e.TEXTURE_2D,U.__webglTexture,e.TEXTURE0+y)}function V(R,y){let U=i.get(R);if(R.version>0&&U.__version!==R.version){ee(U,R,y);return}n.bindTexture(e.TEXTURE_2D_ARRAY,U.__webglTexture,e.TEXTURE0+y)}function j(R,y){let U=i.get(R);if(R.version>0&&U.__version!==R.version){ee(U,R,y);return}n.bindTexture(e.TEXTURE_3D,U.__webglTexture,e.TEXTURE0+y)}function H(R,y){let U=i.get(R);if(R.version>0&&U.__version!==R.version){Se(U,R,y);return}n.bindTexture(e.TEXTURE_CUBE_MAP,U.__webglTexture,e.TEXTURE0+y)}let ce={[1000]:e.REPEAT,[1001]:e.CLAMP_TO_EDGE,[1002]:e.MIRRORED_REPEAT},de={[1003]:e.NEAREST,[1004]:e.NEAREST_MIPMAP_NEAREST,[1005]:e.NEAREST_MIPMAP_LINEAR,[1006]:e.LINEAR,[1007]:e.LINEAR_MIPMAP_NEAREST,[1008]:e.LINEAR_MIPMAP_LINEAR},Ie={[512]:e.NEVER,[519]:e.ALWAYS,[513]:e.LESS,[515]:e.LEQUAL,[514]:e.EQUAL,[518]:e.GEQUAL,[516]:e.GREATER,[517]:e.NOTEQUAL};function Ve(R,y){if(y.type===1015&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===1006||y.magFilter===1007||y.magFilter===1005||y.magFilter===1008||y.minFilter===1006||y.minFilter===1007||y.minFilter===1005||y.minFilter===1008))console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(e.texParameteri(R,e.TEXTURE_WRAP_S,ce[y.wrapS]),e.texParameteri(R,e.TEXTURE_WRAP_T,ce[y.wrapT]),R===e.TEXTURE_3D||R===e.TEXTURE_2D_ARRAY)e.texParameteri(R,e.TEXTURE_WRAP_R,ce[y.wrapR]);if(e.texParameteri(R,e.TEXTURE_MAG_FILTER,de[y.magFilter]),e.texParameteri(R,e.TEXTURE_MIN_FILTER,de[y.minFilter]),y.compareFunction)e.texParameteri(R,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(R,e.TEXTURE_COMPARE_FUNC,Ie[y.compareFunction]);if(t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===1003)return;if(y.minFilter!==1005&&y.minFilter!==1008)return;if(y.type===1015&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let U=t.get("EXT_texture_filter_anisotropic");e.texParameterf(R,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function q(R,y){let U=!1;if(R.__webglInit===void 0)R.__webglInit=!0,y.addEventListener("dispose",b);let Z=y.source,J=d.get(Z);if(J===void 0)J={},d.set(Z,J);let W=G(y);if(W!==R.__cacheKey){if(J[W]===void 0)J[W]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,U=!0;J[W].usedTimes++;let we=J[R.__cacheKey];if(we!==void 0){if(J[R.__cacheKey].usedTimes--,we.usedTimes===0)S(y)}R.__cacheKey=W,R.__webglTexture=J[W].texture}return U}function ee(R,y,U){let Z=e.TEXTURE_2D;if(y.isDataArrayTexture||y.isCompressedArrayTexture)Z=e.TEXTURE_2D_ARRAY;if(y.isData3DTexture)Z=e.TEXTURE_3D;let J=q(R,y),W=y.source;n.bindTexture(Z,R.__webglTexture,e.TEXTURE0+U);let we=i.get(W);if(W.version!==we.__version||J===!0){n.activeTexture(e.TEXTURE0+U);let re=We.getPrimaries(We.workingColorSpace),pe=y.colorSpace===""?null:We.getPrimaries(y.colorSpace),Ne=y.colorSpace===""||re===pe?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);let te=_(y.image,!1,s.maxTextureSize);te=be(y,te);let fe=r.convert(y.format,y.colorSpace),ke=r.convert(y.type),Ce=x(y.internalFormat,fe,ke,y.colorSpace,y.isVideoTexture);Ve(Z,y);let me,De=y.mipmaps,He=y.isVideoTexture!==!0,dt=we.__version===void 0||J===!0,P=W.dataReady,Q=I(y,te);if(y.isDepthTexture){if(Ce=T(y.format===1027,y.type),dt)if(He)n.texStorage2D(e.TEXTURE_2D,1,Ce,te.width,te.height);else n.texImage2D(e.TEXTURE_2D,0,Ce,te.width,te.height,0,fe,ke,null)}else if(y.isDataTexture)if(De.length>0){if(He&&dt)n.texStorage2D(e.TEXTURE_2D,Q,Ce,De[0].width,De[0].height);for(let X=0,Y=De.length;X<Y;X++)if(me=De[X],He){if(P)n.texSubImage2D(e.TEXTURE_2D,X,0,0,me.width,me.height,fe,ke,me.data)}else n.texImage2D(e.TEXTURE_2D,X,Ce,me.width,me.height,0,fe,ke,me.data);y.generateMipmaps=!1}else if(He){if(dt)n.texStorage2D(e.TEXTURE_2D,Q,Ce,te.width,te.height);if(P)n.texSubImage2D(e.TEXTURE_2D,0,0,0,te.width,te.height,fe,ke,te.data)}else n.texImage2D(e.TEXTURE_2D,0,Ce,te.width,te.height,0,fe,ke,te.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){if(He&&dt)n.texStorage3D(e.TEXTURE_2D_ARRAY,Q,Ce,De[0].width,De[0].height,te.depth);for(let X=0,Y=De.length;X<Y;X++)if(me=De[X],y.format!==1023)if(fe!==null)if(He){if(P)if(y.layerUpdates.size>0){let he=hl(me.width,me.height,y.format,y.type);for(let oe of y.layerUpdates){let Oe=me.data.subarray(oe*he/me.data.BYTES_PER_ELEMENT,(oe+1)*he/me.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,X,0,0,oe,me.width,me.height,1,fe,Oe)}y.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,X,0,0,0,me.width,me.height,te.depth,fe,me.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,X,Ce,me.width,me.height,te.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(He){if(P)n.texSubImage3D(e.TEXTURE_2D_ARRAY,X,0,0,0,me.width,me.height,te.depth,fe,ke,me.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,X,Ce,me.width,me.height,te.depth,0,fe,ke,me.data)}else{if(He&&dt)n.texStorage2D(e.TEXTURE_2D,Q,Ce,De[0].width,De[0].height);for(let X=0,Y=De.length;X<Y;X++)if(me=De[X],y.format!==1023)if(fe!==null)if(He){if(P)n.compressedTexSubImage2D(e.TEXTURE_2D,X,0,0,me.width,me.height,fe,me.data)}else n.compressedTexImage2D(e.TEXTURE_2D,X,Ce,me.width,me.height,0,me.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(He){if(P)n.texSubImage2D(e.TEXTURE_2D,X,0,0,me.width,me.height,fe,ke,me.data)}else n.texImage2D(e.TEXTURE_2D,X,Ce,me.width,me.height,0,fe,ke,me.data)}else if(y.isDataArrayTexture)if(He){if(dt)n.texStorage3D(e.TEXTURE_2D_ARRAY,Q,Ce,te.width,te.height,te.depth);if(P)if(y.layerUpdates.size>0){let X=hl(te.width,te.height,y.format,y.type);for(let Y of y.layerUpdates){let he=te.data.subarray(Y*X/te.data.BYTES_PER_ELEMENT,(Y+1)*X/te.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,Y,te.width,te.height,1,fe,ke,he)}y.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,fe,ke,te.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,Ce,te.width,te.height,te.depth,0,fe,ke,te.data);else if(y.isData3DTexture)if(He){if(dt)n.texStorage3D(e.TEXTURE_3D,Q,Ce,te.width,te.height,te.depth);if(P)n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,fe,ke,te.data)}else n.texImage3D(e.TEXTURE_3D,0,Ce,te.width,te.height,te.depth,0,fe,ke,te.data);else if(y.isFramebufferTexture){if(dt)if(He)n.texStorage2D(e.TEXTURE_2D,Q,Ce,te.width,te.height);else{let{width:X,height:Y}=te;for(let he=0;he<Q;he++)n.texImage2D(e.TEXTURE_2D,he,Ce,X,Y,0,fe,ke,null),X>>=1,Y>>=1}}else if(De.length>0){if(He&&dt){let X=Le(De[0]);n.texStorage2D(e.TEXTURE_2D,Q,Ce,X.width,X.height)}for(let X=0,Y=De.length;X<Y;X++)if(me=De[X],He){if(P)n.texSubImage2D(e.TEXTURE_2D,X,0,0,fe,ke,me)}else n.texImage2D(e.TEXTURE_2D,X,Ce,fe,ke,me);y.generateMipmaps=!1}else if(He){if(dt){let X=Le(te);n.texStorage2D(e.TEXTURE_2D,Q,Ce,X.width,X.height)}if(P)n.texSubImage2D(e.TEXTURE_2D,0,0,0,fe,ke,te)}else n.texImage2D(e.TEXTURE_2D,0,Ce,fe,ke,te);if(p(y))m(Z);if(we.__version=W.version,y.onUpdate)y.onUpdate(y)}R.__version=y.version}function Se(R,y,U){if(y.image.length!==6)return;let Z=q(R,y),J=y.source;n.bindTexture(e.TEXTURE_CUBE_MAP,R.__webglTexture,e.TEXTURE0+U);let W=i.get(J);if(J.version!==W.__version||Z===!0){n.activeTexture(e.TEXTURE0+U);let we=We.getPrimaries(We.workingColorSpace),re=y.colorSpace===""?null:We.getPrimaries(y.colorSpace),pe=y.colorSpace===""||we===re?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);let Ne=y.isCompressedTexture||y.image[0].isCompressedTexture,te=y.image[0]&&y.image[0].isDataTexture,fe=[];for(let Y=0;Y<6;Y++){if(!Ne&&!te)fe[Y]=_(y.image[Y],!0,s.maxCubemapSize);else fe[Y]=te?y.image[Y].image:y.image[Y];fe[Y]=be(y,fe[Y])}let ke=fe[0],Ce=r.convert(y.format,y.colorSpace),me=r.convert(y.type),De=x(y.internalFormat,Ce,me,y.colorSpace),He=y.isVideoTexture!==!0,dt=W.__version===void 0||Z===!0,P=J.dataReady,Q=I(y,ke);Ve(e.TEXTURE_CUBE_MAP,y);let X;if(Ne){if(He&&dt)n.texStorage2D(e.TEXTURE_CUBE_MAP,Q,De,ke.width,ke.height);for(let Y=0;Y<6;Y++){X=fe[Y].mipmaps;for(let he=0;he<X.length;he++){let oe=X[he];if(y.format!==1023)if(Ce!==null)if(He){if(P)n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,0,0,oe.width,oe.height,Ce,oe.data)}else n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,De,oe.width,oe.height,0,oe.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(He){if(P)n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,0,0,oe.width,oe.height,Ce,me,oe.data)}else n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,De,oe.width,oe.height,0,Ce,me,oe.data)}}}else{if(X=y.mipmaps,He&&dt){if(X.length>0)Q++;let Y=Le(fe[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,Q,De,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(te){if(He){if(P)n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,fe[Y].width,fe[Y].height,Ce,me,fe[Y].data)}else n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,De,fe[Y].width,fe[Y].height,0,Ce,me,fe[Y].data);for(let he=0;he<X.length;he++){let Oe=X[he].image[Y].image;if(He){if(P)n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,0,0,Oe.width,Oe.height,Ce,me,Oe.data)}else n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,De,Oe.width,Oe.height,0,Ce,me,Oe.data)}}else{if(He){if(P)n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Ce,me,fe[Y])}else n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,De,Ce,me,fe[Y]);for(let he=0;he<X.length;he++){let oe=X[he];if(He){if(P)n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,0,0,Ce,me,oe.image[Y])}else n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,De,Ce,me,oe.image[Y])}}}if(p(y))m(e.TEXTURE_CUBE_MAP);if(W.__version=J.version,y.onUpdate)y.onUpdate(y)}R.__version=y.version}function Te(R,y,U,Z,J,W){let we=r.convert(U.format,U.colorSpace),re=r.convert(U.type),pe=x(U.internalFormat,we,re,U.colorSpace),Ne=i.get(y),te=i.get(U);if(te.__renderTarget=y,!Ne.__hasExternalTextures){let fe=Math.max(1,y.width>>W),ke=Math.max(1,y.height>>W);if(J===e.TEXTURE_3D||J===e.TEXTURE_2D_ARRAY)n.texImage3D(J,W,pe,fe,ke,y.depth,0,we,re,null);else n.texImage2D(J,W,pe,fe,ke,0,we,re,null)}if(n.bindFramebuffer(e.FRAMEBUFFER,R),ge(y))a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Z,J,te.__webglTexture,0,st(y));else if(J===e.TEXTURE_2D||J>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)e.framebufferTexture2D(e.FRAMEBUFFER,Z,J,te.__webglTexture,W);n.bindFramebuffer(e.FRAMEBUFFER,null)}function se(R,y,U){if(e.bindRenderbuffer(e.RENDERBUFFER,R),y.depthBuffer){let Z=y.depthTexture,J=Z&&Z.isDepthTexture?Z.type:null,W=T(y.stencilBuffer,J),we=y.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,re=st(y);if(ge(y))a.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,re,W,y.width,y.height);else if(U)e.renderbufferStorageMultisample(e.RENDERBUFFER,re,W,y.width,y.height);else e.renderbufferStorage(e.RENDERBUFFER,W,y.width,y.height);e.framebufferRenderbuffer(e.FRAMEBUFFER,we,e.RENDERBUFFER,R)}else{let Z=y.textures;for(let J=0;J<Z.length;J++){let W=Z[J],we=r.convert(W.format,W.colorSpace),re=r.convert(W.type),pe=x(W.internalFormat,we,re,W.colorSpace),Ne=st(y);if(U&&ge(y)===!1)e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne,pe,y.width,y.height);else if(ge(y))a.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne,pe,y.width,y.height);else e.renderbufferStorage(e.RENDERBUFFER,pe,y.width,y.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ae(R,y){if(y&&y.isWebGLCubeRenderTarget)throw Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(e.FRAMEBUFFER,R),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Z=i.get(y.depthTexture);if(Z.__renderTarget=y,!Z.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0;K(y.depthTexture,0);let J=Z.__webglTexture,W=st(y);if(y.depthTexture.format===1026)if(ge(y))a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,J,0,W);else e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,J,0);else if(y.depthTexture.format===1027)if(ge(y))a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,J,0,W);else e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,J,0);else throw Error("Unknown depthTexture format")}function nt(R){let y=i.get(R),U=R.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==R.depthTexture){let Z=R.depthTexture;if(y.__depthDisposeCallback)y.__depthDisposeCallback();if(Z){let J=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,Z.removeEventListener("dispose",J)};Z.addEventListener("dispose",J),y.__depthDisposeCallback=J}y.__boundDepthTexture=Z}if(R.depthTexture&&!y.__autoAllocateDepthBuffer){if(U)throw Error("target.depthTexture not supported in Cube render targets");Ae(y.__webglFramebuffer,R)}else if(U){y.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(n.bindFramebuffer(e.FRAMEBUFFER,y.__webglFramebuffer[Z]),y.__webglDepthbuffer[Z]===void 0)y.__webglDepthbuffer[Z]=e.createRenderbuffer(),se(y.__webglDepthbuffer[Z],R,!1);else{let J=R.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,W=y.__webglDepthbuffer[Z];e.bindRenderbuffer(e.RENDERBUFFER,W),e.framebufferRenderbuffer(e.FRAMEBUFFER,J,e.RENDERBUFFER,W)}}else if(n.bindFramebuffer(e.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=e.createRenderbuffer(),se(y.__webglDepthbuffer,R,!1);else{let Z=R.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,J=y.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,J),e.framebufferRenderbuffer(e.FRAMEBUFFER,Z,e.RENDERBUFFER,J)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Xe(R,y,U){let Z=i.get(R);if(y!==void 0)Te(Z.__webglFramebuffer,R,R.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0);if(U!==void 0)nt(R)}function qe(R){let y=R.texture,U=i.get(R),Z=i.get(y);R.addEventListener("dispose",A);let J=R.textures,W=R.isWebGLCubeRenderTarget===!0,we=J.length>1;if(!we){if(Z.__webglTexture===void 0)Z.__webglTexture=e.createTexture();Z.__version=y.version,o.memory.textures++}if(W){U.__webglFramebuffer=[];for(let re=0;re<6;re++)if(y.mipmaps&&y.mipmaps.length>0){U.__webglFramebuffer[re]=[];for(let pe=0;pe<y.mipmaps.length;pe++)U.__webglFramebuffer[re][pe]=e.createFramebuffer()}else U.__webglFramebuffer[re]=e.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){U.__webglFramebuffer=[];for(let re=0;re<y.mipmaps.length;re++)U.__webglFramebuffer[re]=e.createFramebuffer()}else U.__webglFramebuffer=e.createFramebuffer();if(we)for(let re=0,pe=J.length;re<pe;re++){let Ne=i.get(J[re]);if(Ne.__webglTexture===void 0)Ne.__webglTexture=e.createTexture(),o.memory.textures++}if(R.samples>0&&ge(R)===!1){U.__webglMultisampledFramebuffer=e.createFramebuffer(),U.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let re=0;re<J.length;re++){let pe=J[re];U.__webglColorRenderbuffer[re]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,U.__webglColorRenderbuffer[re]);let Ne=r.convert(pe.format,pe.colorSpace),te=r.convert(pe.type),fe=x(pe.internalFormat,Ne,te,pe.colorSpace,R.isXRRenderTarget===!0),ke=st(R);e.renderbufferStorageMultisample(e.RENDERBUFFER,ke,fe,R.width,R.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+re,e.RENDERBUFFER,U.__webglColorRenderbuffer[re])}if(e.bindRenderbuffer(e.RENDERBUFFER,null),R.depthBuffer)U.__webglDepthRenderbuffer=e.createRenderbuffer(),se(U.__webglDepthRenderbuffer,R,!0);n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(W){n.bindTexture(e.TEXTURE_CUBE_MAP,Z.__webglTexture),Ve(e.TEXTURE_CUBE_MAP,y);for(let re=0;re<6;re++)if(y.mipmaps&&y.mipmaps.length>0)for(let pe=0;pe<y.mipmaps.length;pe++)Te(U.__webglFramebuffer[re][pe],R,y,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+re,pe);else Te(U.__webglFramebuffer[re],R,y,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);if(p(y))m(e.TEXTURE_CUBE_MAP);n.unbindTexture()}else if(we){for(let re=0,pe=J.length;re<pe;re++){let Ne=J[re],te=i.get(Ne);if(n.bindTexture(e.TEXTURE_2D,te.__webglTexture),Ve(e.TEXTURE_2D,Ne),Te(U.__webglFramebuffer,R,Ne,e.COLOR_ATTACHMENT0+re,e.TEXTURE_2D,0),p(Ne))m(e.TEXTURE_2D)}n.unbindTexture()}else{let re=e.TEXTURE_2D;if(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)re=R.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY;if(n.bindTexture(re,Z.__webglTexture),Ve(re,y),y.mipmaps&&y.mipmaps.length>0)for(let pe=0;pe<y.mipmaps.length;pe++)Te(U.__webglFramebuffer[pe],R,y,e.COLOR_ATTACHMENT0,re,pe);else Te(U.__webglFramebuffer,R,y,e.COLOR_ATTACHMENT0,re,0);if(p(y))m(re);n.unbindTexture()}if(R.depthBuffer)nt(R)}function wt(R){let y=R.textures;for(let U=0,Z=y.length;U<Z;U++){let J=y[U];if(p(J)){let W=v(R),we=i.get(J).__webglTexture;n.bindTexture(W,we),m(W),n.unbindTexture()}}}let D=[],At=[];function it(R){if(R.samples>0){if(ge(R)===!1){let{textures:y,width:U,height:Z}=R,J=e.COLOR_BUFFER_BIT,W=R.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,we=i.get(R),re=y.length>1;if(re)for(let pe=0;pe<y.length;pe++)n.bindFramebuffer(e.FRAMEBUFFER,we.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+pe,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,we.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+pe,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let pe=0;pe<y.length;pe++){if(R.resolveDepthBuffer){if(R.depthBuffer)J|=e.DEPTH_BUFFER_BIT;if(R.stencilBuffer&&R.resolveStencilBuffer)J|=e.STENCIL_BUFFER_BIT}if(re){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,we.__webglColorRenderbuffer[pe]);let Ne=i.get(y[pe]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Ne,0)}if(e.blitFramebuffer(0,0,U,Z,0,0,U,Z,J,e.NEAREST),l===!0){if(D.length=0,At.length=0,D.push(e.COLOR_ATTACHMENT0+pe),R.depthBuffer&&R.resolveDepthBuffer===!1)D.push(W),At.push(W),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,At);e.invalidateFramebuffer(e.READ_FRAMEBUFFER,D)}}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),re)for(let pe=0;pe<y.length;pe++){n.bindFramebuffer(e.FRAMEBUFFER,we.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+pe,e.RENDERBUFFER,we.__webglColorRenderbuffer[pe]);let Ne=i.get(y[pe]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,we.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+pe,e.TEXTURE_2D,Ne,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){let y=R.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[y])}}}function st(R){return Math.min(s.maxSamples,R.samples)}function ge(R){let y=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function pt(R){let y=o.render.frame;if(h.get(R)!==y)h.set(R,y),R.update()}function be(R,y){let{colorSpace:U,format:Z,type:J}=R;if(R.isCompressedTexture===!0||R.isVideoTexture===!0)return y;if(U!=="srgb-linear"&&U!=="")if(We.getTransfer(U)==="srgb"){if(Z!==1023||J!==1009)console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else console.error("THREE.WebGLTextures: Unsupported texture color space:",U);return y}function Le(R){if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement)c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height;else if(typeof VideoFrame<"u"&&R instanceof VideoFrame)c.width=R.displayWidth,c.height=R.displayHeight;else c.width=R.width,c.height=R.height;return c}this.allocateTextureUnit=k,this.resetTextureUnits=z,this.setTexture2D=K,this.setTexture2DArray=V,this.setTexture3D=j,this.setTextureCube=H,this.rebindTextures=Xe,this.setupRenderTarget=qe,this.updateRenderTargetMipmap=wt,this.updateMultisampleRenderTarget=it,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=ge}function $m(e,t){function n(i,s=""){let r,o=We.getTransfer(s);if(i===1009)return e.UNSIGNED_BYTE;if(i===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(i===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(i===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===1010)return e.BYTE;if(i===1011)return e.SHORT;if(i===1012)return e.UNSIGNED_SHORT;if(i===1013)return e.INT;if(i===1014)return e.UNSIGNED_INT;if(i===1015)return e.FLOAT;if(i===1016)return e.HALF_FLOAT;if(i===1021)return e.ALPHA;if(i===1022)return e.RGB;if(i===1023)return e.RGBA;if(i===1024)return e.LUMINANCE;if(i===1025)return e.LUMINANCE_ALPHA;if(i===1026)return e.DEPTH_COMPONENT;if(i===1027)return e.DEPTH_STENCIL;if(i===1028)return e.RED;if(i===1029)return e.RED_INTEGER;if(i===1030)return e.RG;if(i===1031)return e.RG_INTEGER;if(i===1033)return e.RGBA_INTEGER;if(i===33776||i===33777||i===33778||i===33779)if(o==="srgb")if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===33776)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===33777)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===33778)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===33779)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===33776)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===33777)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===33778)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===33779)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===35840||i===35841||i===35842||i===35843)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===35840)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===35841)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===35842)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===35843)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===36196||i===37492||i===37496)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===36196||i===37492)return o==="srgb"?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===37496)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===37808||i===37809||i===37810||i===37811||i===37812||i===37813||i===37814||i===37815||i===37816||i===37817||i===37818||i===37819||i===37820||i===37821)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===37808)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===37809)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===37810)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===37811)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===37812)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===37813)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===37814)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===37815)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===37816)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===37817)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===37818)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===37819)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===37820)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===37821)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===36492||i===36494||i===36495)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===36492)return o==="srgb"?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===36494)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===36495)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===36283||i===36284||i===36285||i===36286)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===36492)return r.COMPRESSED_RED_RGTC1_EXT;if(i===36284)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===36285)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===36286)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(i===1020)return e.UNSIGNED_INT_24_8;return e[i]!==void 0?e[i]:null}return{convert:n}}class cc extends Tt{constructor(e=[]){super();this.isArrayCamera=!0,this.cameras=e}}class vt extends ot{constructor(){super();this.isGroup=!0,this.type="Group"}}var Jm={type:"move"};class Js{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new vt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new vt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new vt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w;return this._grip}dispatchEvent(e){if(this._targetRay!==null)this._targetRay.dispatchEvent(e);if(this._grip!==null)this._grip.dispatchEvent(e);if(this._hand!==null)this._hand.dispatchEvent(e);return this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){if(this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(e,t,n){let i=null,s=null,r=null,o=this._targetRay,a=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){r=!0;for(let g of e.hand.values()){let _=t.getJointPose(g,n),p=this._getHandJoint(l,g);if(_!==null)p.matrix.fromArray(_.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=_.radius;p.visible=_!==null}let c=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],u=c.position.distanceTo(h.position),d=0.02,f=0.005;if(l.inputState.pinching&&u>d+f)l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this});else if(!l.inputState.pinching&&u<=d-f)l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this})}else if(a!==null&&e.gripSpace){if(s=t.getPose(e.gripSpace,n),s!==null){if(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity)a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity);else a.hasLinearVelocity=!1;if(s.angularVelocity)a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity);else a.hasAngularVelocity=!1}}if(o!==null){if(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null)i=s;if(i!==null){if(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity)o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity);else o.hasLinearVelocity=!1;if(i.angularVelocity)o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity);else o.hasAngularVelocity=!1;this.dispatchEvent(Jm)}}}if(o!==null)o.visible=i!==null;if(a!==null)a.visible=s!==null;if(l!==null)l.visible=r!==null;return this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new vt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}var jm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Qm=`
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

}`;class hc{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let i=new xt,s=e.properties.get(i);if(s.__webglTexture=t.texture,t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)this.depthNear=t.depthNear,this.depthFar=t.depthFar;this.texture=i}}getMesh(e){if(this.texture!==null){if(this.mesh===null){let t=e.cameras[0].viewport,n=new Rn({vertexShader:jm,fragmentShader:Qm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Me(new Ot(20,20),n)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class uc extends oi{constructor(e,t){super();let n=this,i=null,s=1,r=null,o="local-floor",a=1,l=null,c=null,h=null,u=null,d=null,f=null,g=new hc,_=t.getContextAttributes(),p=null,m=null,v=[],x=[],T=new ue,I=null,b=new Tt;b.viewport=new Ze;let A=new Tt;A.viewport=new Ze;let F=[b,A],S=new cc,E=null,C=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ee=v[q];if(ee===void 0)ee=new Js,v[q]=ee;return ee.getTargetRaySpace()},this.getControllerGrip=function(q){let ee=v[q];if(ee===void 0)ee=new Js,v[q]=ee;return ee.getGripSpace()},this.getHand=function(q){let ee=v[q];if(ee===void 0)ee=new Js,v[q]=ee;return ee.getHandSpace()};function z(q){let ee=x.indexOf(q.inputSource);if(ee===-1)return;let Se=v[ee];if(Se!==void 0)Se.update(q.inputSource,q.frame,l||r),Se.dispatchEvent({type:q.type,data:q.inputSource})}function k(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",k),i.removeEventListener("inputsourceschange",G);for(let q=0;q<v.length;q++){let ee=x[q];if(ee===null)continue;x[q]=null,v[q].disconnect(ee)}E=null,C=null,g.reset(),e.setRenderTarget(p),d=null,u=null,h=null,i=null,m=null,Ve.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){if(s=q,n.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){if(o=q,n.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return h},this.getFrame=function(){return f},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",k),i.addEventListener("inputsourceschange",G),_.xrCompatible!==!0)await t.makeXRCompatible();if(I=e.getPixelRatio(),e.getSize(T),i.renderState.layers===void 0){let ee={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,ee),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),m=new Wn(d.framebufferWidth,d.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let ee=null,Se=null,Te=null;if(_.depth)Te=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=_.stencil?1027:1026,Se=_.stencil?1020:1014;let se={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:s};h=new XRWebGLBinding(i,t),u=h.createProjectionLayer(se),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),m=new Wn(u.textureWidth,u.textureHeight,{format:1023,type:1009,depthTexture:new _o(u.textureWidth,u.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}m.isXRRenderTarget=!0,this.setFoveation(a),l=null,r=await i.requestReferenceSpace(o),Ve.setContext(i),Ve.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function G(q){for(let ee=0;ee<q.removed.length;ee++){let Se=q.removed[ee],Te=x.indexOf(Se);if(Te>=0)x[Te]=null,v[Te].disconnect(Se)}for(let ee=0;ee<q.added.length;ee++){let Se=q.added[ee],Te=x.indexOf(Se);if(Te===-1){for(let Ae=0;Ae<v.length;Ae++)if(Ae>=x.length){x.push(Se),Te=Ae;break}else if(x[Ae]===null){x[Ae]=Se,Te=Ae;break}if(Te===-1)break}let se=v[Te];if(se)se.connect(Se)}}let K=new w,V=new w;function j(q,ee,Se){K.setFromMatrixPosition(ee.matrixWorld),V.setFromMatrixPosition(Se.matrixWorld);let Te=K.distanceTo(V),se=ee.projectionMatrix.elements,Ae=Se.projectionMatrix.elements,nt=se[14]/(se[10]-1),Xe=se[14]/(se[10]+1),qe=(se[9]+1)/se[5],wt=(se[9]-1)/se[5],D=(se[8]-1)/se[0],At=(Ae[8]+1)/Ae[0],it=nt*D,st=nt*At,ge=Te/(-D+At),pt=ge*-D;if(ee.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(pt),q.translateZ(ge),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),se[10]===-1)q.projectionMatrix.copy(ee.projectionMatrix),q.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{let be=nt+ge,Le=Xe+ge,R=it-pt,y=st+(Te-pt),U=qe*Xe/Le*be,Z=wt*Xe/Le*be;q.projectionMatrix.makePerspective(R,y,U,Z,be,Le),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function H(q,ee){if(ee===null)q.matrixWorld.copy(q.matrix);else q.matrixWorld.multiplyMatrices(ee.matrixWorld,q.matrix);q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;let{near:ee,far:Se}=q;if(g.texture!==null){if(g.depthNear>0)ee=g.depthNear;if(g.depthFar>0)Se=g.depthFar}if(S.near=A.near=b.near=ee,S.far=A.far=b.far=Se,E!==S.near||C!==S.far)i.updateRenderState({depthNear:S.near,depthFar:S.far}),E=S.near,C=S.far;b.layers.mask=q.layers.mask|2,A.layers.mask=q.layers.mask|4,S.layers.mask=b.layers.mask|A.layers.mask;let Te=q.parent,se=S.cameras;H(S,Te);for(let Ae=0;Ae<se.length;Ae++)H(se[Ae],Te);if(se.length===2)j(S,b,A);else S.projectionMatrix.copy(b.projectionMatrix);ce(q,S,Te)};function ce(q,ee,Se){if(Se===null)q.matrix.copy(ee.matrixWorld);else q.matrix.copy(Se.matrixWorld),q.matrix.invert(),q.matrix.multiply(ee.matrixWorld);if(q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ee.projectionMatrix),q.projectionMatrixInverse.copy(ee.projectionMatrixInverse),q.isPerspectiveCamera)q.fov=Pi*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1}this.getCamera=function(){return S},this.getFoveation=function(){if(u===null&&d===null)return;return a},this.setFoveation=function(q){if(a=q,u!==null)u.fixedFoveation=q;if(d!==null&&d.fixedFoveation!==void 0)d.fixedFoveation=q},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(S)};let de=null;function Ie(q,ee){if(c=ee.getViewerPose(l||r),f=ee,c!==null){let Se=c.views;if(d!==null)e.setRenderTargetFramebuffer(m,d.framebuffer),e.setRenderTarget(m);let Te=!1;if(Se.length!==S.cameras.length)S.cameras.length=0,Te=!0;for(let Ae=0;Ae<Se.length;Ae++){let nt=Se[Ae],Xe=null;if(d!==null)Xe=d.getViewport(nt);else{let wt=h.getViewSubImage(u,nt);if(Xe=wt.viewport,Ae===0)e.setRenderTargetTextures(m,wt.colorTexture,u.ignoreDepthValues?void 0:wt.depthStencilTexture),e.setRenderTarget(m)}let qe=F[Ae];if(qe===void 0)qe=new Tt,qe.layers.enable(Ae),qe.viewport=new Ze,F[Ae]=qe;if(qe.matrix.fromArray(nt.transform.matrix),qe.matrix.decompose(qe.position,qe.quaternion,qe.scale),qe.projectionMatrix.fromArray(nt.projectionMatrix),qe.projectionMatrixInverse.copy(qe.projectionMatrix).invert(),qe.viewport.set(Xe.x,Xe.y,Xe.width,Xe.height),Ae===0)S.matrix.copy(qe.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale);if(Te===!0)S.cameras.push(qe)}let se=i.enabledFeatures;if(se&&se.includes("depth-sensing")){let Ae=h.getDepthInformation(Se[0]);if(Ae&&Ae.isValid&&Ae.texture)g.init(e,Ae,i.renderState)}}for(let Se=0;Se<v.length;Se++){let Te=x[Se],se=v[Se];if(Te!==null&&se!==void 0)se.update(Te,ee,l||r)}if(de)de(q,ee);if(ee.detectedPlanes)n.dispatchEvent({type:"planesdetected",data:ee});f=null}let Ve=new Jl;Ve.setAnimationLoop(Ie),this.setAnimationLoop=function(q){de=q},this.dispose=function(){}}}var ii=new rn,eg=new Re;function tg(e,t){function n(p,m){if(p.matrixAutoUpdate===!0)p.updateMatrix();m.value.copy(p.matrix)}function i(p,m){if(m.color.getRGB(p.fogColor.value,Zl(e)),m.isFog)p.fogNear.value=m.near,p.fogFar.value=m.far;else if(m.isFogExp2)p.fogDensity.value=m.density}function s(p,m,v,x,T){if(m.isMeshBasicMaterial)r(p,m);else if(m.isMeshLambertMaterial)r(p,m);else if(m.isMeshToonMaterial)r(p,m),u(p,m);else if(m.isMeshPhongMaterial)r(p,m),h(p,m);else if(m.isMeshStandardMaterial){if(r(p,m),d(p,m),m.isMeshPhysicalMaterial)f(p,m,T)}else if(m.isMeshMatcapMaterial)r(p,m),g(p,m);else if(m.isMeshDepthMaterial)r(p,m);else if(m.isMeshDistanceMaterial)r(p,m),_(p,m);else if(m.isMeshNormalMaterial)r(p,m);else if(m.isLineBasicMaterial){if(o(p,m),m.isLineDashedMaterial)a(p,m)}else if(m.isPointsMaterial)l(p,m,v,x);else if(m.isSpriteMaterial)c(p,m);else if(m.isShadowMaterial)p.color.value.copy(m.color),p.opacity.value=m.opacity;else if(m.isShaderMaterial)m.uniformsNeedUpdate=!1}function r(p,m){if(p.opacity.value=m.opacity,m.color)p.diffuse.value.copy(m.color);if(m.emissive)p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity);if(m.map)p.map.value=m.map,n(m.map,p.mapTransform);if(m.alphaMap)p.alphaMap.value=m.alphaMap,n(m.alphaMap,p.alphaMapTransform);if(m.bumpMap){if(p.bumpMap.value=m.bumpMap,n(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===1)p.bumpScale.value*=-1}if(m.normalMap){if(p.normalMap.value=m.normalMap,n(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===1)p.normalScale.value.negate()}if(m.displacementMap)p.displacementMap.value=m.displacementMap,n(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias;if(m.emissiveMap)p.emissiveMap.value=m.emissiveMap,n(m.emissiveMap,p.emissiveMapTransform);if(m.specularMap)p.specularMap.value=m.specularMap,n(m.specularMap,p.specularMapTransform);if(m.alphaTest>0)p.alphaTest.value=m.alphaTest;let v=t.get(m),x=v.envMap,T=v.envMapRotation;if(x){if(p.envMap.value=x,ii.copy(T),ii.x*=-1,ii.y*=-1,ii.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1)ii.y*=-1,ii.z*=-1;p.envMapRotation.value.setFromMatrix4(eg.makeRotationFromEuler(ii)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio}if(m.lightMap)p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,n(m.lightMap,p.lightMapTransform);if(m.aoMap)p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,n(m.aoMap,p.aoMapTransform)}function o(p,m){if(p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map)p.map.value=m.map,n(m.map,p.mapTransform)}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,v,x){if(p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*v,p.scale.value=x*0.5,m.map)p.map.value=m.map,n(m.map,p.uvTransform);if(m.alphaMap)p.alphaMap.value=m.alphaMap,n(m.alphaMap,p.alphaMapTransform);if(m.alphaTest>0)p.alphaTest.value=m.alphaTest}function c(p,m){if(p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map)p.map.value=m.map,n(m.map,p.mapTransform);if(m.alphaMap)p.alphaMap.value=m.alphaMap,n(m.alphaMap,p.alphaMapTransform);if(m.alphaTest>0)p.alphaTest.value=m.alphaTest}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,0.0001)}function u(p,m){if(m.gradientMap)p.gradientMap.value=m.gradientMap}function d(p,m){if(p.metalness.value=m.metalness,m.metalnessMap)p.metalnessMap.value=m.metalnessMap,n(m.metalnessMap,p.metalnessMapTransform);if(p.roughness.value=m.roughness,m.roughnessMap)p.roughnessMap.value=m.roughnessMap,n(m.roughnessMap,p.roughnessMapTransform);if(m.envMap)p.envMapIntensity.value=m.envMapIntensity}function f(p,m,v){if(p.ior.value=m.ior,m.sheen>0){if(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap)p.sheenColorMap.value=m.sheenColorMap,n(m.sheenColorMap,p.sheenColorMapTransform);if(m.sheenRoughnessMap)p.sheenRoughnessMap.value=m.sheenRoughnessMap,n(m.sheenRoughnessMap,p.sheenRoughnessMapTransform)}if(m.clearcoat>0){if(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap)p.clearcoatMap.value=m.clearcoatMap,n(m.clearcoatMap,p.clearcoatMapTransform);if(m.clearcoatRoughnessMap)p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,n(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform);if(m.clearcoatNormalMap){if(p.clearcoatNormalMap.value=m.clearcoatNormalMap,n(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===1)p.clearcoatNormalScale.value.negate()}}if(m.dispersion>0)p.dispersion.value=m.dispersion;if(m.iridescence>0){if(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap)p.iridescenceMap.value=m.iridescenceMap,n(m.iridescenceMap,p.iridescenceMapTransform);if(m.iridescenceThicknessMap)p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,n(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform)}if(m.transmission>0){if(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap)p.transmissionMap.value=m.transmissionMap,n(m.transmissionMap,p.transmissionMapTransform);if(p.thickness.value=m.thickness,m.thicknessMap)p.thicknessMap.value=m.thicknessMap,n(m.thicknessMap,p.thicknessMapTransform);p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)}if(m.anisotropy>0){if(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap)p.anisotropyMap.value=m.anisotropyMap,n(m.anisotropyMap,p.anisotropyMapTransform)}if(p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap)p.specularColorMap.value=m.specularColorMap,n(m.specularColorMap,p.specularColorMapTransform);if(m.specularIntensityMap)p.specularIntensityMap.value=m.specularIntensityMap,n(m.specularIntensityMap,p.specularIntensityMapTransform)}function g(p,m){if(m.matcap)p.matcap.value=m.matcap}function _(p,m){let v=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function ng(e,t,n,i){let s={},r={},o=[],a=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,x){let T=x.program;i.uniformBlockBinding(v,T)}function c(v,x){let T=s[v.id];if(T===void 0)g(v),T=h(v),s[v.id]=T,v.addEventListener("dispose",p);let I=x.program;i.updateUBOMapping(v,I);let b=t.render.frame;if(r[v.id]!==b)d(v),r[v.id]=b}function h(v){let x=u();v.__bindingPointIndex=x;let T=e.createBuffer(),I=v.__size,b=v.usage;return e.bindBuffer(e.UNIFORM_BUFFER,T),e.bufferData(e.UNIFORM_BUFFER,I,b),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,x,T),T}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){let x=s[v.id],T=v.uniforms,I=v.__cache;e.bindBuffer(e.UNIFORM_BUFFER,x);for(let b=0,A=T.length;b<A;b++){let F=Array.isArray(T[b])?T[b]:[T[b]];for(let S=0,E=F.length;S<E;S++){let C=F[S];if(f(C,b,S,I)===!0){let z=C.__offset,k=Array.isArray(C.value)?C.value:[C.value],G=0;for(let K=0;K<k.length;K++){let V=k[K],j=_(V);if(typeof V==="number"||typeof V==="boolean")C.__data[0]=V,e.bufferSubData(e.UNIFORM_BUFFER,z+G,C.__data);else if(V.isMatrix3)C.__data[0]=V.elements[0],C.__data[1]=V.elements[1],C.__data[2]=V.elements[2],C.__data[3]=0,C.__data[4]=V.elements[3],C.__data[5]=V.elements[4],C.__data[6]=V.elements[5],C.__data[7]=0,C.__data[8]=V.elements[6],C.__data[9]=V.elements[7],C.__data[10]=V.elements[8],C.__data[11]=0;else V.toArray(C.__data,G),G+=j.storage/Float32Array.BYTES_PER_ELEMENT}e.bufferSubData(e.UNIFORM_BUFFER,z,C.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function f(v,x,T,I){let b=v.value,A=x+"_"+T;if(I[A]===void 0){if(typeof b==="number"||typeof b==="boolean")I[A]=b;else I[A]=b.clone();return!0}else{let F=I[A];if(typeof b==="number"||typeof b==="boolean"){if(F!==b)return I[A]=b,!0}else if(F.equals(b)===!1)return F.copy(b),!0}return!1}function g(v){let x=v.uniforms,T=0,I=16;for(let A=0,F=x.length;A<F;A++){let S=Array.isArray(x[A])?x[A]:[x[A]];for(let E=0,C=S.length;E<C;E++){let z=S[E],k=Array.isArray(z.value)?z.value:[z.value];for(let G=0,K=k.length;G<K;G++){let V=k[G],j=_(V),H=T%I,ce=H%j.boundary,de=H+ce;if(T+=ce,de!==0&&I-de<j.storage)T+=I-de;z.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=T,T+=j.storage}}}let b=T%I;if(b>0)T+=I-b;return v.__size=T,v.__cache={},this}function _(v){let x={boundary:0,storage:0};if(typeof v==="number"||typeof v==="boolean")x.boundary=4,x.storage=4;else if(v.isVector2)x.boundary=8,x.storage=8;else if(v.isVector3||v.isColor)x.boundary=16,x.storage=12;else if(v.isVector4)x.boundary=16,x.storage=16;else if(v.isMatrix3)x.boundary=48,x.storage=48;else if(v.isMatrix4)x.boundary=64,x.storage=64;else if(v.isTexture)console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.");else console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v);return x}function p(v){let x=v.target;x.removeEventListener("dispose",p);let T=o.indexOf(x.__bindingPointIndex);o.splice(T,1),e.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function m(){for(let v in s)e.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:c,dispose:m}}class xo{constructor(e={}){let{canvas:t=ru(),context:n=null,depth:i=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:a=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=r;let f=new Uint32Array(4),g=new Int32Array(4),_=null,p=null,m=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace="srgb",this.toneMapping=0,this.toneMappingExposure=1;let x=this,T=!1,I=0,b=0,A=null,F=-1,S=null,E=new Ze,C=new Ze,z=null,k=new Ee(0),G=0,K=t.width,V=t.height,j=1,H=null,ce=null,de=new Ze(0,0,K,V),Ie=new Ze(0,0,K,V),Ve=!1,q=new ir,ee=!1,Se=!1,Te=new Re,se=new Re,Ae=new w,nt=new Ze,Xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},qe=!1;function wt(){return A===null?j:1}let D=n;function At(M,N){return t.getContext(M,N)}try{let M={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:a,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:h};if("setAttribute"in t)t.setAttribute("data-engine","three.js r170");if(t.addEventListener("webglcontextlost",X,!1),t.addEventListener("webglcontextrestored",Y,!1),t.addEventListener("webglcontextcreationerror",he,!1),D===null){if(D=At("webgl2",M),D===null)if(At("webgl2"))throw Error("Error creating WebGL context with your selected attributes.");else throw Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let it,st,ge,pt,be,Le,R,y,U,Z,J,W,we,re,pe,Ne,te,fe,ke,Ce,me,De,He,dt;function P(){if(it=new xp(D),it.init(),De=new $m(D,it),st=new dp(D,it,e,De),ge=new Ym(D,it),st.reverseDepthBuffer&&u)ge.buffers.depth.setReversed(!0);pt=new Mp(D),be=new Dm,Le=new Km(D,it,ge,be,st,De,pt),R=new pp(x),y=new _p(x),U=new Au(D),He=new hp(D,U),Z=new yp(D,U,pt,He),J=new Ep(D,Z,U,pt),ke=new Sp(D,st,Le),Ne=new fp(be),W=new Nm(x,R,y,it,st,He,Ne),we=new tg(x,be),re=new Fm,pe=new Gm(it),fe=new cp(x,R,y,ge,J,d,a),te=new Xm(x,J,st),dt=new ng(D,pt,st,ge),Ce=new up(D,it,pt),me=new vp(D,it,pt),pt.programs=W.programs,x.capabilities=st,x.extensions=it,x.properties=be,x.renderLists=re,x.shadowMap=te,x.state=ge,x.info=pt}P();let Q=new uc(x,D);this.xr=Q,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let M=it.get("WEBGL_lose_context");if(M)M.loseContext()},this.forceContextRestore=function(){let M=it.get("WEBGL_lose_context");if(M)M.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(M){if(M===void 0)return;j=M,this.setSize(K,V,!1)},this.getSize=function(M){return M.set(K,V)},this.setSize=function(M,N,O=!0){if(Q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}if(K=M,V=N,t.width=Math.floor(M*j),t.height=Math.floor(N*j),O===!0)t.style.width=M+"px",t.style.height=N+"px";this.setViewport(0,0,M,N)},this.getDrawingBufferSize=function(M){return M.set(K*j,V*j).floor()},this.setDrawingBufferSize=function(M,N,O){K=M,V=N,j=O,t.width=Math.floor(M*O),t.height=Math.floor(N*O),this.setViewport(0,0,M,N)},this.getCurrentViewport=function(M){return M.copy(E)},this.getViewport=function(M){return M.copy(de)},this.setViewport=function(M,N,O,B){if(M.isVector4)de.set(M.x,M.y,M.z,M.w);else de.set(M,N,O,B);ge.viewport(E.copy(de).multiplyScalar(j).round())},this.getScissor=function(M){return M.copy(Ie)},this.setScissor=function(M,N,O,B){if(M.isVector4)Ie.set(M.x,M.y,M.z,M.w);else Ie.set(M,N,O,B);ge.scissor(C.copy(Ie).multiplyScalar(j).round())},this.getScissorTest=function(){return Ve},this.setScissorTest=function(M){ge.setScissorTest(Ve=M)},this.setOpaqueSort=function(M){H=M},this.setTransparentSort=function(M){ce=M},this.getClearColor=function(M){return M.copy(fe.getClearColor())},this.setClearColor=function(){fe.setClearColor.apply(fe,arguments)},this.getClearAlpha=function(){return fe.getClearAlpha()},this.setClearAlpha=function(){fe.setClearAlpha.apply(fe,arguments)},this.clear=function(M=!0,N=!0,O=!0){let B=0;if(M){let L=!1;if(A!==null){let ne=A.texture.format;L=ne===1033||ne===1031||ne===1029}if(L){let ne=A.texture.type,ae=ne===1009||ne===1014||ne===1012||ne===1020||ne===1017||ne===1018,_e=fe.getClearColor(),xe=fe.getClearAlpha(),Pe=_e.r,Ue=_e.g,ye=_e.b;if(ae)f[0]=Pe,f[1]=Ue,f[2]=ye,f[3]=xe,D.clearBufferuiv(D.COLOR,0,f);else g[0]=Pe,g[1]=Ue,g[2]=ye,g[3]=xe,D.clearBufferiv(D.COLOR,0,g)}else B|=D.COLOR_BUFFER_BIT}if(N)B|=D.DEPTH_BUFFER_BIT;if(O)B|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);D.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",X,!1),t.removeEventListener("webglcontextrestored",Y,!1),t.removeEventListener("webglcontextcreationerror",he,!1),re.dispose(),pe.dispose(),be.dispose(),R.dispose(),y.dispose(),J.dispose(),He.dispose(),dt.dispose(),W.dispose(),Q.dispose(),Q.removeEventListener("sessionstart",dn),Q.removeEventListener("sessionend",fa),Jn.stop()};function X(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Y(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let M=pt.autoReset,N=te.enabled,O=te.autoUpdate,B=te.needsUpdate,L=te.type;P(),pt.autoReset=M,te.enabled=N,te.autoUpdate=O,te.needsUpdate=B,te.type=L}function he(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function oe(M){let N=M.target;N.removeEventListener("dispose",oe),Oe(N)}function Oe(M){mt(M),be.remove(M)}function mt(M){let N=be.get(M).programs;if(N!==void 0){if(N.forEach(function(O){W.releaseProgram(O)}),M.isShaderMaterial)W.releaseShaderCache(M)}}this.renderBufferDirect=function(M,N,O,B,L,ne){if(N===null)N=Xe;let ae=L.isMesh&&L.matrixWorld.determinant()<0,_e=Fh(M,N,O,B,L);ge.setMaterial(B,ae);let xe=O.index,Pe=1;if(B.wireframe===!0){if(xe=Z.getWireframeAttribute(O),xe===void 0)return;Pe=2}let Ue=O.drawRange,ye=O.attributes.position,Ye=Ue.start*Pe,lt=(Ue.start+Ue.count)*Pe;if(ne!==null)Ye=Math.max(Ye,ne.start*Pe),lt=Math.min(lt,(ne.start+ne.count)*Pe);if(xe!==null)Ye=Math.max(Ye,0),lt=Math.min(lt,xe.count);else if(ye!==void 0&&ye!==null)Ye=Math.max(Ye,0),lt=Math.min(lt,ye.count);let ct=lt-Ye;if(ct<0||ct===1/0)return;He.setup(L,B,_e,O,xe);let Dt,Je=Ce;if(xe!==null)Dt=U.get(xe),Je=me,Je.setIndex(Dt);if(L.isMesh)if(B.wireframe===!0)ge.setLineWidth(B.wireframeLinewidth*wt()),Je.setMode(D.LINES);else Je.setMode(D.TRIANGLES);else if(L.isLine){let ve=B.linewidth;if(ve===void 0)ve=1;if(ge.setLineWidth(ve*wt()),L.isLineSegments)Je.setMode(D.LINES);else if(L.isLineLoop)Je.setMode(D.LINE_LOOP);else Je.setMode(D.LINE_STRIP)}else if(L.isPoints)Je.setMode(D.POINTS);else if(L.isSprite)Je.setMode(D.TRIANGLES);if(L.isBatchedMesh)if(L._multiDrawInstances!==null)Je.renderMultiDrawInstances(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount,L._multiDrawInstances);else if(!it.get("WEBGL_multi_draw")){let{_multiDrawStarts:ve,_multiDrawCounts:vn,_multiDrawCount:je}=L,Jt=xe?U.get(xe).bytesPerElement:1,pi=be.get(B).currentProgram.getUniforms();for(let zt=0;zt<je;zt++)pi.setValue(D,"_gl_DrawID",zt),Je.render(ve[zt]/Jt,vn[zt])}else Je.renderMultiDraw(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount);else if(L.isInstancedMesh)Je.renderInstances(Ye,ct,L.count);else if(O.isInstancedBufferGeometry){let ve=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,vn=Math.min(O.instanceCount,ve);Je.renderInstances(Ye,ct,vn)}else Je.render(Ye,ct)};function Rt(M,N,O){if(M.transparent===!0&&M.side===2&&M.forceSinglePass===!1)M.side=1,M.needsUpdate=!0,Ss(M,N,O),M.side=0,M.needsUpdate=!0,Ss(M,N,O),M.side=2;else Ss(M,N,O)}this.compile=function(M,N,O=null){if(O===null)O=M;if(p=pe.get(O),p.init(N),v.push(p),O.traverseVisible(function(L){if(L.isLight&&L.layers.test(N.layers)){if(p.pushLight(L),L.castShadow)p.pushShadow(L)}}),M!==O)M.traverseVisible(function(L){if(L.isLight&&L.layers.test(N.layers)){if(p.pushLight(L),L.castShadow)p.pushShadow(L)}});p.setupLights();let B=new Set;return M.traverse(function(L){if(!(L.isMesh||L.isPoints||L.isLine||L.isSprite))return;let ne=L.material;if(ne)if(Array.isArray(ne))for(let ae=0;ae<ne.length;ae++){let _e=ne[ae];Rt(_e,O,L),B.add(_e)}else Rt(ne,O,L),B.add(ne)}),v.pop(),p=null,B},this.compileAsync=function(M,N,O=null){let B=this.compile(M,N,O);return new Promise((L)=>{function ne(){if(B.forEach(function(ae){if(be.get(ae).currentProgram.isReady())B.delete(ae)}),B.size===0){L(M);return}setTimeout(ne,10)}if(it.get("KHR_parallel_shader_compile")!==null)ne();else setTimeout(ne,10)})};let $e=null;function yn(M){if($e)$e(M)}function dn(){Jn.stop()}function fa(){Jn.start()}let Jn=new Jl;if(Jn.setAnimationLoop(yn),typeof self<"u")Jn.setContext(self);this.setAnimationLoop=function(M){$e=M,Q.setAnimationLoop(M),M===null?Jn.stop():Jn.start()},Q.addEventListener("sessionstart",dn),Q.addEventListener("sessionend",fa),this.render=function(M,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(M.matrixWorldAutoUpdate===!0)M.updateMatrixWorld();if(N.parent===null&&N.matrixWorldAutoUpdate===!0)N.updateMatrixWorld();if(Q.enabled===!0&&Q.isPresenting===!0){if(Q.cameraAutoUpdate===!0)Q.updateCamera(N);N=Q.getCamera()}if(M.isScene===!0)M.onBeforeRender(x,M,N,A);if(p=pe.get(M,v.length),p.init(N),v.push(p),se.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),q.setFromProjectionMatrix(se),Se=this.localClippingEnabled,ee=Ne.init(this.clippingPlanes,Se),_=re.get(M,m.length),_.init(),m.push(_),Q.enabled===!0&&Q.isPresenting===!0){let ne=x.xr.getDepthSensingMesh();if(ne!==null)vr(ne,N,-1/0,x.sortObjects)}if(vr(M,N,0,x.sortObjects),_.finish(),x.sortObjects===!0)_.sort(H,ce);if(qe=Q.enabled===!1||Q.isPresenting===!1||Q.hasDepthSensing()===!1,qe)fe.addToRenderList(_,M);if(this.info.render.frame++,ee===!0)Ne.beginShadows();let O=p.state.shadowsArray;if(te.render(O,M,N),ee===!0)Ne.endShadows();if(this.info.autoReset===!0)this.info.reset();let{opaque:B,transmissive:L}=_;if(p.setupLights(),N.isArrayCamera){let ne=N.cameras;if(L.length>0)for(let ae=0,_e=ne.length;ae<_e;ae++){let xe=ne[ae];ma(B,L,M,xe)}if(qe)fe.render(M);for(let ae=0,_e=ne.length;ae<_e;ae++){let xe=ne[ae];pa(_,M,xe,xe.viewport)}}else{if(L.length>0)ma(B,L,M,N);if(qe)fe.render(M);pa(_,M,N)}if(A!==null)Le.updateMultisampleRenderTarget(A),Le.updateRenderTargetMipmap(A);if(M.isScene===!0)M.onAfterRender(x,M,N);if(He.resetDefaultState(),F=-1,S=null,v.pop(),v.length>0){if(p=v[v.length-1],ee===!0)Ne.setGlobalState(x.clippingPlanes,p.state.camera)}else p=null;if(m.pop(),m.length>0)_=m[m.length-1];else _=null};function vr(M,N,O,B){if(M.visible===!1)return;if(M.layers.test(N.layers)){if(M.isGroup)O=M.renderOrder;else if(M.isLOD){if(M.autoUpdate===!0)M.update(N)}else if(M.isLight){if(p.pushLight(M),M.castShadow)p.pushShadow(M)}else if(M.isSprite){if(!M.frustumCulled||q.intersectsSprite(M)){if(B)nt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(se);let ae=J.update(M),_e=M.material;if(_e.visible)_.push(M,ae,_e,O,nt.z,null)}}else if(M.isMesh||M.isLine||M.isPoints){if(!M.frustumCulled||q.intersectsObject(M)){let ae=J.update(M),_e=M.material;if(B){if(M.boundingSphere!==void 0){if(M.boundingSphere===null)M.computeBoundingSphere();nt.copy(M.boundingSphere.center)}else{if(ae.boundingSphere===null)ae.computeBoundingSphere();nt.copy(ae.boundingSphere.center)}nt.applyMatrix4(M.matrixWorld).applyMatrix4(se)}if(Array.isArray(_e)){let xe=ae.groups;for(let Pe=0,Ue=xe.length;Pe<Ue;Pe++){let ye=xe[Pe],Ye=_e[ye.materialIndex];if(Ye&&Ye.visible)_.push(M,ae,Ye,O,nt.z,ye)}}else if(_e.visible)_.push(M,ae,_e,O,nt.z,null)}}}let ne=M.children;for(let ae=0,_e=ne.length;ae<_e;ae++)vr(ne[ae],N,O,B)}function pa(M,N,O,B){let{opaque:L,transmissive:ne,transparent:ae}=M;if(p.setupLightsView(O),ee===!0)Ne.setGlobalState(x.clippingPlanes,O);if(B)ge.viewport(E.copy(B));if(L.length>0)Ms(L,N,O);if(ne.length>0)Ms(ne,N,O);if(ae.length>0)Ms(ae,N,O);ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function ma(M,N,O,B){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;if(p.state.transmissionRenderTarget[B.id]===void 0)p.state.transmissionRenderTarget[B.id]=new Wn(1,1,{generateMipmaps:!0,type:it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float")?1016:1009,minFilter:1008,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:We.workingColorSpace});let ne=p.state.transmissionRenderTarget[B.id],ae=B.viewport||E;ne.setSize(ae.z,ae.w);let _e=x.getRenderTarget();if(x.setRenderTarget(ne),x.getClearColor(k),G=x.getClearAlpha(),G<1)x.setClearColor(16777215,0.5);if(x.clear(),qe)fe.render(O);let xe=x.toneMapping;x.toneMapping=0;let Pe=B.viewport;if(B.viewport!==void 0)B.viewport=void 0;if(p.setupLightsView(B),ee===!0)Ne.setGlobalState(x.clippingPlanes,B);if(Ms(M,O,B),Le.updateMultisampleRenderTarget(ne),Le.updateRenderTargetMipmap(ne),it.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let ye=0,Ye=N.length;ye<Ye;ye++){let lt=N[ye],ct=lt.object,Dt=lt.geometry,Je=lt.material,ve=lt.group;if(Je.side===2&&ct.layers.test(B.layers)){let vn=Je.side;Je.side=1,Je.needsUpdate=!0,ga(ct,O,B,Dt,Je,ve),Je.side=vn,Je.needsUpdate=!0,Ue=!0}}if(Ue===!0)Le.updateMultisampleRenderTarget(ne),Le.updateRenderTargetMipmap(ne)}if(x.setRenderTarget(_e),x.setClearColor(k,G),Pe!==void 0)B.viewport=Pe;x.toneMapping=xe}function Ms(M,N,O){let B=N.isScene===!0?N.overrideMaterial:null;for(let L=0,ne=M.length;L<ne;L++){let ae=M[L],_e=ae.object,xe=ae.geometry,Pe=B===null?ae.material:B,Ue=ae.group;if(_e.layers.test(O.layers))ga(_e,N,O,xe,Pe,Ue)}}function ga(M,N,O,B,L,ne){if(M.onBeforeRender(x,N,O,B,L,ne),M.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),L.onBeforeRender(x,N,O,B,M,ne),L.transparent===!0&&L.side===2&&L.forceSinglePass===!1)L.side=1,L.needsUpdate=!0,x.renderBufferDirect(O,N,B,L,M,ne),L.side=0,L.needsUpdate=!0,x.renderBufferDirect(O,N,B,L,M,ne),L.side=2;else x.renderBufferDirect(O,N,B,L,M,ne);M.onAfterRender(x,N,O,B,L,ne)}function Ss(M,N,O){if(N.isScene!==!0)N=Xe;let B=be.get(M),L=p.state.lights,ne=p.state.shadowsArray,ae=L.state.version,_e=W.getParameters(M,L.state,ne,N,O),xe=W.getProgramCacheKey(_e),Pe=B.programs;if(B.environment=M.isMeshStandardMaterial?N.environment:null,B.fog=N.fog,B.envMap=(M.isMeshStandardMaterial?y:R).get(M.envMap||B.environment),B.envMapRotation=B.environment!==null&&M.envMap===null?N.environmentRotation:M.envMapRotation,Pe===void 0)M.addEventListener("dispose",oe),Pe=new Map,B.programs=Pe;let Ue=Pe.get(xe);if(Ue!==void 0){if(B.currentProgram===Ue&&B.lightsStateVersion===ae)return xa(M,_e),Ue}else _e.uniforms=W.getUniforms(M),M.onBeforeCompile(_e,x),Ue=W.acquireProgram(_e,xe),Pe.set(xe,Ue),B.uniforms=_e.uniforms;let ye=B.uniforms;if(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)ye.clippingPlanes=Ne.uniform;if(xa(M,_e),B.needsLights=Bh(M),B.lightsStateVersion=ae,B.needsLights)ye.ambientLightColor.value=L.state.ambient,ye.lightProbe.value=L.state.probe,ye.directionalLights.value=L.state.directional,ye.directionalLightShadows.value=L.state.directionalShadow,ye.spotLights.value=L.state.spot,ye.spotLightShadows.value=L.state.spotShadow,ye.rectAreaLights.value=L.state.rectArea,ye.ltc_1.value=L.state.rectAreaLTC1,ye.ltc_2.value=L.state.rectAreaLTC2,ye.pointLights.value=L.state.point,ye.pointLightShadows.value=L.state.pointShadow,ye.hemisphereLights.value=L.state.hemi,ye.directionalShadowMap.value=L.state.directionalShadowMap,ye.directionalShadowMatrix.value=L.state.directionalShadowMatrix,ye.spotShadowMap.value=L.state.spotShadowMap,ye.spotLightMatrix.value=L.state.spotLightMatrix,ye.spotLightMap.value=L.state.spotLightMap,ye.pointShadowMap.value=L.state.pointShadowMap,ye.pointShadowMatrix.value=L.state.pointShadowMatrix;return B.currentProgram=Ue,B.uniformsList=null,Ue}function _a(M){if(M.uniformsList===null){let N=M.currentProgram.getUniforms();M.uniformsList=os.seqWithValue(N.seq,M.uniforms)}return M.uniformsList}function xa(M,N){let O=be.get(M);O.outputColorSpace=N.outputColorSpace,O.batching=N.batching,O.batchingColor=N.batchingColor,O.instancing=N.instancing,O.instancingColor=N.instancingColor,O.instancingMorph=N.instancingMorph,O.skinning=N.skinning,O.morphTargets=N.morphTargets,O.morphNormals=N.morphNormals,O.morphColors=N.morphColors,O.morphTargetsCount=N.morphTargetsCount,O.numClippingPlanes=N.numClippingPlanes,O.numIntersection=N.numClipIntersection,O.vertexAlphas=N.vertexAlphas,O.vertexTangents=N.vertexTangents,O.toneMapping=N.toneMapping}function Fh(M,N,O,B,L){if(N.isScene!==!0)N=Xe;Le.resetTextureUnits();let ne=N.fog,ae=B.isMeshStandardMaterial?N.environment:null,_e=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:"srgb-linear",xe=(B.isMeshStandardMaterial?y:R).get(B.envMap||ae),Pe=B.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Ue=!!O.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),ye=!!O.morphAttributes.position,Ye=!!O.morphAttributes.normal,lt=!!O.morphAttributes.color,ct=0;if(B.toneMapped){if(A===null||A.isXRRenderTarget===!0)ct=x.toneMapping}let Dt=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Je=Dt!==void 0?Dt.length:0,ve=be.get(B),vn=p.state.lights;if(ee===!0){if(Se===!0||M!==S){let Wt=M===S&&B.id===F;Ne.setState(B,M,Wt)}}let je=!1;if(B.version===ve.__version){if(ve.needsLights&&ve.lightsStateVersion!==vn.state.version)je=!0;else if(ve.outputColorSpace!==_e)je=!0;else if(L.isBatchedMesh&&ve.batching===!1)je=!0;else if(!L.isBatchedMesh&&ve.batching===!0)je=!0;else if(L.isBatchedMesh&&ve.batchingColor===!0&&L.colorTexture===null)je=!0;else if(L.isBatchedMesh&&ve.batchingColor===!1&&L.colorTexture!==null)je=!0;else if(L.isInstancedMesh&&ve.instancing===!1)je=!0;else if(!L.isInstancedMesh&&ve.instancing===!0)je=!0;else if(L.isSkinnedMesh&&ve.skinning===!1)je=!0;else if(!L.isSkinnedMesh&&ve.skinning===!0)je=!0;else if(L.isInstancedMesh&&ve.instancingColor===!0&&L.instanceColor===null)je=!0;else if(L.isInstancedMesh&&ve.instancingColor===!1&&L.instanceColor!==null)je=!0;else if(L.isInstancedMesh&&ve.instancingMorph===!0&&L.morphTexture===null)je=!0;else if(L.isInstancedMesh&&ve.instancingMorph===!1&&L.morphTexture!==null)je=!0;else if(ve.envMap!==xe)je=!0;else if(B.fog===!0&&ve.fog!==ne)je=!0;else if(ve.numClippingPlanes!==void 0&&(ve.numClippingPlanes!==Ne.numPlanes||ve.numIntersection!==Ne.numIntersection))je=!0;else if(ve.vertexAlphas!==Pe)je=!0;else if(ve.vertexTangents!==Ue)je=!0;else if(ve.morphTargets!==ye)je=!0;else if(ve.morphNormals!==Ye)je=!0;else if(ve.morphColors!==lt)je=!0;else if(ve.toneMapping!==ct)je=!0;else if(ve.morphTargetsCount!==Je)je=!0}else je=!0,ve.__version=B.version;let Jt=ve.currentProgram;if(je===!0)Jt=Ss(B,N,L);let pi=!1,zt=!1,qi=!1,ht=Jt.getUniforms(),fn=ve.uniforms;if(ge.useProgram(Jt.program))pi=!0,zt=!0,qi=!0;if(B.id!==F)F=B.id,zt=!0;if(pi||S!==M){if(ge.buffers.depth.getReversed())Te.copy(M.projectionMatrix),au(Te),lu(Te),ht.setValue(D,"projectionMatrix",Te);else ht.setValue(D,"projectionMatrix",M.projectionMatrix);ht.setValue(D,"viewMatrix",M.matrixWorldInverse);let Dn=ht.map.cameraPosition;if(Dn!==void 0)Dn.setValue(D,Ae.setFromMatrixPosition(M.matrixWorld));if(st.logarithmicDepthBuffer)ht.setValue(D,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2));if(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)ht.setValue(D,"isOrthographic",M.isOrthographicCamera===!0);if(S!==M)S=M,zt=!0,qi=!0}if(L.isSkinnedMesh){ht.setOptional(D,L,"bindMatrix"),ht.setOptional(D,L,"bindMatrixInverse");let Wt=L.skeleton;if(Wt){if(Wt.boneTexture===null)Wt.computeBoneTexture();ht.setValue(D,"boneTexture",Wt.boneTexture,Le)}}if(L.isBatchedMesh){if(ht.setOptional(D,L,"batchingTexture"),ht.setValue(D,"batchingTexture",L._matricesTexture,Le),ht.setOptional(D,L,"batchingIdTexture"),ht.setValue(D,"batchingIdTexture",L._indirectTexture,Le),ht.setOptional(D,L,"batchingColorTexture"),L._colorsTexture!==null)ht.setValue(D,"batchingColorTexture",L._colorsTexture,Le)}let Yi=O.morphAttributes;if(Yi.position!==void 0||Yi.normal!==void 0||Yi.color!==void 0)ke.update(L,O,Jt);if(zt||ve.receiveShadow!==L.receiveShadow)ve.receiveShadow=L.receiveShadow,ht.setValue(D,"receiveShadow",L.receiveShadow);if(B.isMeshGouraudMaterial&&B.envMap!==null)fn.envMap.value=xe,fn.flipEnvMap.value=xe.isCubeTexture&&xe.isRenderTargetTexture===!1?-1:1;if(B.isMeshStandardMaterial&&B.envMap===null&&N.environment!==null)fn.envMapIntensity.value=N.environmentIntensity;if(zt){if(ht.setValue(D,"toneMappingExposure",x.toneMappingExposure),ve.needsLights)Oh(fn,qi);if(ne&&B.fog===!0)we.refreshFogUniforms(fn,ne);we.refreshMaterialUniforms(fn,B,j,V,p.state.transmissionRenderTarget[M.id]),os.upload(D,_a(ve),fn,Le)}if(B.isShaderMaterial&&B.uniformsNeedUpdate===!0)os.upload(D,_a(ve),fn,Le),B.uniformsNeedUpdate=!1;if(B.isSpriteMaterial)ht.setValue(D,"center",L.center);if(ht.setValue(D,"modelViewMatrix",L.modelViewMatrix),ht.setValue(D,"normalMatrix",L.normalMatrix),ht.setValue(D,"modelMatrix",L.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){let Wt=B.uniformsGroups;for(let Dn=0,Un=Wt.length;Dn<Un;Dn++){let ya=Wt[Dn];dt.update(ya,Jt),dt.bind(ya,Jt)}}return Jt}function Oh(M,N){M.ambientLightColor.needsUpdate=N,M.lightProbe.needsUpdate=N,M.directionalLights.needsUpdate=N,M.directionalLightShadows.needsUpdate=N,M.pointLights.needsUpdate=N,M.pointLightShadows.needsUpdate=N,M.spotLights.needsUpdate=N,M.spotLightShadows.needsUpdate=N,M.rectAreaLights.needsUpdate=N,M.hemisphereLights.needsUpdate=N}function Bh(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}if(this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(M,N,O){be.get(M.texture).__webglTexture=N,be.get(M.depthTexture).__webglTexture=O;let B=be.get(M);if(B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=O===void 0,!B.__autoAllocateDepthBuffer){if(it.has("WEBGL_multisampled_render_to_texture")===!0)console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1}},this.setRenderTargetFramebuffer=function(M,N){let O=be.get(M);O.__webglFramebuffer=N,O.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(M,N=0,O=0){A=M,I=N,b=O;let B=!0,L=null,ne=!1,ae=!1;if(M){let xe=be.get(M);if(xe.__useDefaultFramebuffer!==void 0)ge.bindFramebuffer(D.FRAMEBUFFER,null),B=!1;else if(xe.__webglFramebuffer===void 0)Le.setupRenderTarget(M);else if(xe.__hasExternalTextures)Le.rebindTextures(M,be.get(M.texture).__webglTexture,be.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let ye=M.depthTexture;if(xe.__boundDepthTexture!==ye){if(ye!==null&&be.has(ye)&&(M.width!==ye.image.width||M.height!==ye.image.height))throw Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Le.setupDepthRenderbuffer(M)}}let Pe=M.texture;if(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)ae=!0;let Ue=be.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget){if(Array.isArray(Ue[N]))L=Ue[N][O];else L=Ue[N];ne=!0}else if(M.samples>0&&Le.useMultisampledRTT(M)===!1)L=be.get(M).__webglMultisampledFramebuffer;else if(Array.isArray(Ue))L=Ue[O];else L=Ue;E.copy(M.viewport),C.copy(M.scissor),z=M.scissorTest}else E.copy(de).multiplyScalar(j).floor(),C.copy(Ie).multiplyScalar(j).floor(),z=Ve;if(ge.bindFramebuffer(D.FRAMEBUFFER,L)&&B)ge.drawBuffers(M,L);if(ge.viewport(E),ge.scissor(C),ge.setScissorTest(z),ne){let xe=be.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+N,xe.__webglTexture,O)}else if(ae){let xe=be.get(M.texture),Pe=N||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,xe.__webglTexture,O||0,Pe)}F=-1},this.readRenderTargetPixels=function(M,N,O,B,L,ne,ae){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=be.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ae!==void 0)_e=_e[ae];if(_e){ge.bindFramebuffer(D.FRAMEBUFFER,_e);try{let xe=M.texture,Pe=xe.format,Ue=xe.type;if(!st.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!st.textureTypeReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(N>=0&&N<=M.width-B&&(O>=0&&O<=M.height-L))D.readPixels(N,O,B,L,De.convert(Pe),De.convert(Ue),ne)}finally{let xe=A!==null?be.get(A).__webglFramebuffer:null;ge.bindFramebuffer(D.FRAMEBUFFER,xe)}}},this.readRenderTargetPixelsAsync=async function(M,N,O,B,L,ne,ae){if(!(M&&M.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=be.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ae!==void 0)_e=_e[ae];if(_e){let xe=M.texture,Pe=xe.format,Ue=xe.type;if(!st.textureFormatReadable(Pe))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!st.textureTypeReadable(Ue))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=M.width-B&&(O>=0&&O<=M.height-L)){ge.bindFramebuffer(D.FRAMEBUFFER,_e);let ye=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,ye),D.bufferData(D.PIXEL_PACK_BUFFER,ne.byteLength,D.STREAM_READ),D.readPixels(N,O,B,L,De.convert(Pe),De.convert(Ue),0);let Ye=A!==null?be.get(A).__webglFramebuffer:null;ge.bindFramebuffer(D.FRAMEBUFFER,Ye);let lt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await ou(D,lt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,ye),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ne),D.deleteBuffer(ye),D.deleteSync(lt),ne}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(M,N=null,O=0){if(M.isTexture!==!0)ns("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,M=arguments[1];let B=Math.pow(2,-O),L=Math.floor(M.image.width*B),ne=Math.floor(M.image.height*B),ae=N!==null?N.x:0,_e=N!==null?N.y:0;Le.setTexture2D(M,0),D.copyTexSubImage2D(D.TEXTURE_2D,O,0,0,ae,_e,L,ne),ge.unbindTexture()},this.copyTextureToTexture=function(M,N,O=null,B=null,L=0){if(M.isTexture!==!0)ns("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,M=arguments[1],N=arguments[2],L=arguments[3]||0,O=null;let ne,ae,_e,xe,Pe,Ue,ye,Ye,lt,ct=M.isCompressedTexture?M.mipmaps[L]:M.image;if(O!==null)ne=O.max.x-O.min.x,ae=O.max.y-O.min.y,_e=O.isBox3?O.max.z-O.min.z:1,xe=O.min.x,Pe=O.min.y,Ue=O.isBox3?O.min.z:0;else ne=ct.width,ae=ct.height,_e=ct.depth||1,xe=0,Pe=0,Ue=0;if(B!==null)ye=B.x,Ye=B.y,lt=B.z;else ye=0,Ye=0,lt=0;let Dt=De.convert(N.format),Je=De.convert(N.type),ve;if(N.isData3DTexture)Le.setTexture3D(N,0),ve=D.TEXTURE_3D;else if(N.isDataArrayTexture||N.isCompressedArrayTexture)Le.setTexture2DArray(N,0),ve=D.TEXTURE_2D_ARRAY;else Le.setTexture2D(N,0),ve=D.TEXTURE_2D;D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,N.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,N.unpackAlignment);let vn=D.getParameter(D.UNPACK_ROW_LENGTH),je=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Jt=D.getParameter(D.UNPACK_SKIP_PIXELS),pi=D.getParameter(D.UNPACK_SKIP_ROWS),zt=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,ct.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ct.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,xe),D.pixelStorei(D.UNPACK_SKIP_ROWS,Pe),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ue);let qi=M.isDataArrayTexture||M.isData3DTexture,ht=N.isDataArrayTexture||N.isData3DTexture;if(M.isRenderTargetTexture||M.isDepthTexture){let fn=be.get(M),Yi=be.get(N),Wt=be.get(fn.__renderTarget),Dn=be.get(Yi.__renderTarget);ge.bindFramebuffer(D.READ_FRAMEBUFFER,Wt.__webglFramebuffer),ge.bindFramebuffer(D.DRAW_FRAMEBUFFER,Dn.__webglFramebuffer);for(let Un=0;Un<_e;Un++){if(qi)D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,be.get(M).__webglTexture,L,Ue+Un);if(M.isDepthTexture){if(ht)D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,be.get(N).__webglTexture,L,lt+Un);D.blitFramebuffer(xe,Pe,ne,ae,ye,Ye,ne,ae,D.DEPTH_BUFFER_BIT,D.NEAREST)}else if(ht)D.copyTexSubImage3D(ve,L,ye,Ye,lt+Un,xe,Pe,ne,ae);else D.copyTexSubImage2D(ve,L,ye,Ye,lt+Un,xe,Pe,ne,ae)}ge.bindFramebuffer(D.READ_FRAMEBUFFER,null),ge.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(ht)if(M.isDataTexture||M.isData3DTexture)D.texSubImage3D(ve,L,ye,Ye,lt,ne,ae,_e,Dt,Je,ct.data);else if(N.isCompressedArrayTexture)D.compressedTexSubImage3D(ve,L,ye,Ye,lt,ne,ae,_e,Dt,ct.data);else D.texSubImage3D(ve,L,ye,Ye,lt,ne,ae,_e,Dt,Je,ct);else if(M.isDataTexture)D.texSubImage2D(D.TEXTURE_2D,L,ye,Ye,ne,ae,Dt,Je,ct.data);else if(M.isCompressedTexture)D.compressedTexSubImage2D(D.TEXTURE_2D,L,ye,Ye,ct.width,ct.height,Dt,ct.data);else D.texSubImage2D(D.TEXTURE_2D,L,ye,Ye,ne,ae,Dt,Je,ct);if(D.pixelStorei(D.UNPACK_ROW_LENGTH,vn),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,je),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Jt),D.pixelStorei(D.UNPACK_SKIP_ROWS,pi),D.pixelStorei(D.UNPACK_SKIP_IMAGES,zt),L===0&&N.generateMipmaps)D.generateMipmap(ve);ge.unbindTexture()},this.copyTextureToTexture3D=function(M,N,O=null,B=null,L=0){if(M.isTexture!==!0)ns("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,B=arguments[1]||null,M=arguments[2],N=arguments[3],L=arguments[4]||0;return ns('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(M,N,O,B,L)},this.initRenderTarget=function(M){if(be.get(M).__webglFramebuffer===void 0)Le.setupRenderTarget(M)},this.initTexture=function(M){if(M.isCubeTexture)Le.setTextureCube(M,0);else if(M.isData3DTexture)Le.setTexture3D(M,0);else if(M.isDataArrayTexture||M.isCompressedArrayTexture)Le.setTexture2DArray(M,0);else Le.setTexture2D(M,0);ge.unbindTexture()},this.resetState=function(){I=0,b=0,A=null,ge.reset(),He.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2000}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=We._getDrawingBufferColorSpace(e),t.unpackColorSpace=We._getUnpackColorSpace()}}class rr{constructor(e,t=1,n=1000){this.isFog=!0,this.name="",this.color=new Ee(e),this.near=t,this.far=n}clone(){return new rr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class yo extends ot{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new rn,this.environmentIntensity=1,this.environmentRotation=new rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){if(super.copy(e,t),e.background!==null)this.background=e.background.clone();if(e.environment!==null)this.environment=e.environment.clone();if(e.fog!==null)this.fog=e.fog.clone();if(this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null)this.overrideMaterial=e.overrideMaterial.clone();return this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);if(this.fog!==null)t.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)t.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)t.object.backgroundIntensity=this.backgroundIntensity;if(t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1)t.object.environmentIntensity=this.environmentIntensity;return t.object.environmentRotation=this.environmentRotation.toArray(),t}}class or{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=sn()}onUploadCallback(){}set needsUpdate(e){if(e===!0)this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){if(e.arrayBuffers===void 0)e.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=sn();if(e.arrayBuffers[this.array.buffer._uuid]===void 0)e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){if(e.arrayBuffers===void 0)e.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=sn();if(e.arrayBuffers[this.array.buffer._uuid]===void 0)e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));return{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}var Lt=new w;class ds{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];if(this.normalized)n=tn(n,this.array);return n}setComponent(e,t,n){if(this.normalized)n=tt(n,this.array);return this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){if(this.normalized)t=tt(t,this.array);return this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){if(this.normalized)t=tt(t,this.array);return this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){if(this.normalized)t=tt(t,this.array);return this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){if(this.normalized)t=tt(t,this.array);return this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];if(this.normalized)t=tn(t,this.array);return t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];if(this.normalized)t=tn(t,this.array);return t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];if(this.normalized)t=tn(t,this.array);return t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];if(this.normalized)t=tn(t,this.array);return t}setXY(e,t,n){if(e=e*this.data.stride+this.offset,this.normalized)t=tt(t,this.array),n=tt(n,this.array);return this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){if(e=e*this.data.stride+this.offset,this.normalized)t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array);return this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){if(e=e*this.data.stride+this.offset,this.normalized)t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array),s=tt(s,this.array);return this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new bt(new this.array.constructor(t),this.itemSize,this.normalized)}else{if(e.interleavedBuffers===void 0)e.interleavedBuffers={};if(e.interleavedBuffers[this.data.uuid]===void 0)e.interleavedBuffers[this.data.uuid]=this.data.clone(e);return new ds(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else{if(e.interleavedBuffers===void 0)e.interleavedBuffers={};if(e.interleavedBuffers[this.data.uuid]===void 0)e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}var ul=new w,dl=new Ze,fl=new Ze,ig=new w,pl=new Re,Vs=new w,Yr=new Yt,ml=new Re,Zr=new Fi;class vo extends Me{constructor(e,t){super(e,t);this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new Re,this.bindMatrixInverse=new Re,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;if(this.boundingBox===null)this.boundingBox=new on;this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Vs),this.boundingBox.expandByPoint(Vs)}computeBoundingSphere(){let e=this.geometry;if(this.boundingSphere===null)this.boundingSphere=new Yt;this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Vs),this.boundingSphere.expandByPoint(Vs)}copy(e,t){if(super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null)this.boundingBox=e.boundingBox.clone();if(e.boundingSphere!==null)this.boundingSphere=e.boundingSphere.clone();return this}raycast(e,t){let n=this.material,i=this.matrixWorld;if(n===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(Yr.copy(this.boundingSphere),Yr.applyMatrix4(i),e.ray.intersectsSphere(Yr)===!1)return;if(ml.copy(i).invert(),Zr.copy(e.ray).applyMatrix4(ml),this.boundingBox!==null){if(Zr.intersectsBox(this.boundingBox)===!1)return}this._computeIntersections(e,t,Zr)}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){if(this.skeleton=e,t===void 0)this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld;this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Ze,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();if(s!==1/0)e.multiplyScalar(s);else e.set(1,0,0,0);t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.bindMode==="attached")this.bindMatrixInverse.copy(this.matrixWorld).invert();else if(this.bindMode==="detached")this.bindMatrixInverse.copy(this.bindMatrix).invert();else console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;dl.fromBufferAttribute(i.attributes.skinIndex,e),fl.fromBufferAttribute(i.attributes.skinWeight,e),ul.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let r=fl.getComponent(s);if(r!==0){let o=dl.getComponent(s);pl.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(ig.copy(ul).applyMatrix4(pl),r)}}return t.applyMatrix4(this.bindMatrixInverse)}}class ar extends ot{constructor(){super();this.isBone=!0,this.type="Bone"}}class Mo extends xt{constructor(e=null,t=1,n=1,i,s,r,o,a,l=1003,c=1003,h,u){super(null,r,o,a,l,c,i,s,h,u);this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}var gl=new Re,sg=new Re;class lr{constructor(e=[],t=[]){this.uuid=sn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Re)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Re;if(this.bones[e])n.copy(this.bones[e].matrixWorld).invert();this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];if(n)n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];if(n){if(n.parent&&n.parent.isBone)n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld);else n.matrix.copy(n.matrixWorld);n.matrix.decompose(n.position,n.quaternion,n.scale)}}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,r=e.length;s<r;s++){let o=e[s]?e[s].matrixWorld:sg;gl.multiplyMatrices(o,t[s]),gl.toArray(n,s*16)}if(i!==null)i.needsUpdate=!0}clone(){return new lr(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Mo(t,e,e,1023,1015);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}return}dispose(){if(this.boneTexture!==null)this.boneTexture.dispose(),this.boneTexture=null}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],r=t[s];if(r===void 0)console.warn("THREE.Skeleton: No bone found with UUID:",s),r=new ar;this.bones.push(r),this.boneInverses.push(new Re().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let r=t[i];e.bones.push(r.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}}class Ni extends bt{constructor(e,t,n,i=1){super(e,t,n);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}var Ri=new Re,_l=new Re,Ws=[],xl=new on,rg=new Re,ji=new Me,Qi=new Yt;class fs extends Me{constructor(e,t,n){super(e,t);this.isInstancedMesh=!0,this.instanceMatrix=new Ni(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,rg)}computeBoundingBox(){let e=this.geometry,t=this.count;if(this.boundingBox===null)this.boundingBox=new on;if(e.boundingBox===null)e.computeBoundingBox();this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ri),xl.copy(e.boundingBox).applyMatrix4(Ri),this.boundingBox.union(xl)}computeBoundingSphere(){let e=this.geometry,t=this.count;if(this.boundingSphere===null)this.boundingSphere=new Yt;if(e.boundingSphere===null)e.computeBoundingSphere();this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ri),Qi.copy(e.boundingSphere).applyMatrix4(Ri),this.boundingSphere.union(Qi)}copy(e,t){if(super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null)this.morphTexture=e.morphTexture.clone();if(e.instanceColor!==null)this.instanceColor=e.instanceColor.clone();if(this.count=e.count,e.boundingBox!==null)this.boundingBox=e.boundingBox.clone();if(e.boundingSphere!==null)this.boundingSphere=e.boundingSphere.clone();return this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,r=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[r+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(ji.geometry=this.geometry,ji.material=this.material,ji.material===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(Qi.copy(this.boundingSphere),Qi.applyMatrix4(n),e.ray.intersectsSphere(Qi)===!1)return;for(let s=0;s<i;s++){this.getMatrixAt(s,Ri),_l.multiplyMatrices(n,Ri),ji.matrixWorld=_l,ji.raycast(e,Ws);for(let r=0,o=Ws.length;r<o;r++){let a=Ws[r];a.instanceId=s,a.object=this,t.push(a)}Ws.length=0}}setColorAt(e,t){if(this.instanceColor===null)this.instanceColor=new Ni(new Float32Array(this.instanceMatrix.count*3).fill(1),3);t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;if(this.morphTexture===null)this.morphTexture=new Mo(new Float32Array(i*this.count),i,this.count,1028,1015);let s=this.morphTexture.source.data.data,r=0;for(let l=0;l<n.length;l++)r+=n[l];let o=this.geometry.morphTargetsRelative?1:1-r,a=i*e;s[a]=o,s.set(n,a+1)}updateMorphTargets(){}dispose(){if(this.dispatchEvent({type:"dispose"}),this.morphTexture!==null)this.morphTexture.dispose(),this.morphTexture=null;return this}}class gn extends Gt{static get type(){return"LineBasicMaterial"}constructor(e){super();this.isLineBasicMaterial=!0,this.color=new Ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}var js=new w,Qs=new w,yl=new Re,es=new Fi,Xs=new Yt,Kr=new w,vl=new w;class _n extends ot{constructor(e=new ut,t=new gn){super();this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)js.fromBufferAttribute(t,i-1),Qs.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=js.distanceTo(Qs);e.setAttribute("lineDistance",new rt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null)n.computeBoundingSphere();if(Xs.copy(n.boundingSphere),Xs.applyMatrix4(i),Xs.radius+=s,e.ray.intersectsSphere(Xs)===!1)return;yl.copy(i).invert(),es.copy(e.ray).applyMatrix4(yl);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),a=o*o,l=this.isLineSegments?2:1,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let g=d,_=f-1;g<_;g+=l){let p=c.getX(g),m=c.getX(g+1),v=qs(this,e,es,a,p,m);if(v)t.push(v)}if(this.isLineLoop){let g=c.getX(f-1),_=c.getX(d),p=qs(this,e,es,a,g,_);if(p)t.push(p)}}else{let d=Math.max(0,r.start),f=Math.min(u.count,r.start+r.count);for(let g=d,_=f-1;g<_;g+=l){let p=qs(this,e,es,a,g,g+1);if(p)t.push(p)}if(this.isLineLoop){let g=qs(this,e,es,a,f-1,d);if(g)t.push(g)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function qs(e,t,n,i,s,r){let o=e.geometry.attributes.position;if(js.fromBufferAttribute(o,s),Qs.fromBufferAttribute(o,r),n.distanceSqToSegment(js,Qs,Kr,vl)>i)return;Kr.applyMatrix4(e.matrixWorld);let l=t.ray.origin.distanceTo(Kr);if(l<t.near||l>t.far)return;return{distance:l,point:vl.clone().applyMatrix4(e.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:e}}var Ml=new w,Sl=new w;class ps extends _n{constructor(e,t){super(e,t);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Ml.fromBufferAttribute(t,i),Sl.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ml.distanceTo(Sl);e.setAttribute("lineDistance",new rt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class So extends _n{constructor(e,t){super(e,t);this.isLineLoop=!0,this.type="LineLoop"}}class cr extends Gt{static get type(){return"PointsMaterial"}constructor(e){super();this.isPointsMaterial=!0,this.color=new Ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}var El=new Re,io=new Fi,Ys=new Yt,Zs=new w;class Eo extends ot{constructor(e=new ut,t=new cr){super();this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null)n.computeBoundingSphere();if(Ys.copy(n.boundingSphere),Ys.applyMatrix4(i),Ys.radius+=s,e.ray.intersectsSphere(Ys)===!1)return;El.copy(i).invert(),io.copy(e.ray).applyMatrix4(El);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),a=o*o,l=n.index,h=n.attributes.position;if(l!==null){let u=Math.max(0,r.start),d=Math.min(l.count,r.start+r.count);for(let f=u,g=d;f<g;f++){let _=l.getX(f);Zs.fromBufferAttribute(h,_),Tl(Zs,_,a,i,e,t,this)}}else{let u=Math.max(0,r.start),d=Math.min(h.count,r.start+r.count);for(let f=u,g=d;f<g;f++)Zs.fromBufferAttribute(h,f),Tl(Zs,f,a,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Tl(e,t,n,i,s,r,o){let a=io.distanceSqToPoint(e);if(a<n){let l=new w;io.closestPointToPoint(e,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Cn extends xt{constructor(e,t,n,i,s,r,o,a,l){super(e,t,n,i,s,r,o,a,l);this.isCanvasTexture=!0,this.needsUpdate=!0}}class an{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let r=1;r<=e;r++)n=this.getPoint(r/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),i=0,s=n.length,r;if(t)r=t;else r=e*n[s-1];let o=0,a=s-1,l;while(o<=a)if(i=Math.floor(o+(a-o)/2),l=n[i]-r,l<0)o=i+1;else if(l>0)a=i-1;else{a=i;break}if(i=a,n[i]===r)return i/(s-1);let c=n[i],u=n[i+1]-c,d=(r-c)/u;return(i+d)/(s-1)}getTangent(e,t){let i=e-0.0001,s=e+0.0001;if(i<0)i=0;if(s>1)s=1;let r=this.getPoint(i),o=this.getPoint(s),a=t||(r.isVector2?new ue:new w);return a.copy(o).sub(r).normalize(),a}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new w,i=[],s=[],r=[],o=new w,a=new Re;for(let d=0;d<=e;d++){let f=d/e;i[d]=this.getTangentAt(f,new w)}s[0]=new w,r[0]=new w;let l=Number.MAX_VALUE,c=Math.abs(i[0].x),h=Math.abs(i[0].y),u=Math.abs(i[0].z);if(c<=l)l=c,n.set(1,0,0);if(h<=l)l=h,n.set(0,1,0);if(u<=l)n.set(0,0,1);o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),r[0].crossVectors(i[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),r[d]=r[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();let f=Math.acos(yt(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(a.makeRotationAxis(o,f))}r[d].crossVectors(i[d],s[d])}if(t===!0){let d=Math.acos(yt(s[0].dot(s[e]),-1,1));if(d/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0)d=-d;for(let f=1;f<=e;f++)s[f].applyMatrix4(a.makeRotationAxis(i[f],d*f)),r[f].crossVectors(i[f],s[f])}return{tangents:i,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class hr extends an{constructor(e=0,t=0,n=1,i=1,s=0,r=Math.PI*2,o=!1,a=0){super();this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=o,this.aRotation=a}getPoint(e,t=new ue){let n=t,i=Math.PI*2,s=this.aEndAngle-this.aStartAngle,r=Math.abs(s)<Number.EPSILON;while(s<0)s+=i;while(s>i)s-=i;if(s<Number.EPSILON)if(r)s=0;else s=i;if(this.aClockwise===!0&&!r)if(s===i)s=-i;else s=s-i;let o=this.aStartAngle+e*s,a=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let c=Math.cos(this.aRotation),h=Math.sin(this.aRotation),u=a-this.aX,d=l-this.aY;a=u*c-d*h+this.aX,l=u*h+d*c+this.aY}return n.set(a,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class dc extends hr{constructor(e,t,n,i,s,r){super(e,t,n,n,i,s,r);this.isArcCurve=!0,this.type="ArcCurve"}}function To(){let e=0,t=0,n=0,i=0;function s(r,o,a,l){e=r,t=a,n=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return e+t*r+n*o+i*a}}}var Ks=new w,$r=new To,Jr=new To,jr=new To;class fc extends an{constructor(e=[],t=!1,n="centripetal",i=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new w){let n=t,i=this.points,s=i.length,r=(s-(this.closed?0:1))*e,o=Math.floor(r),a=r-o;if(this.closed)o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s;else if(a===0&&o===s-1)o=s-2,a=1;let l,c;if(this.closed||o>0)l=i[(o-1)%s];else Ks.subVectors(i[0],i[1]).add(i[0]),l=Ks;let h=i[o%s],u=i[(o+1)%s];if(this.closed||o+2<s)c=i[(o+2)%s];else Ks.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=Ks;if(this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?0.5:0.25,f=Math.pow(l.distanceToSquared(h),d),g=Math.pow(h.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(c),d);if(g<0.0001)g=1;if(f<0.0001)f=g;if(_<0.0001)_=g;$r.initNonuniformCatmullRom(l.x,h.x,u.x,c.x,f,g,_),Jr.initNonuniformCatmullRom(l.y,h.y,u.y,c.y,f,g,_),jr.initNonuniformCatmullRom(l.z,h.z,u.z,c.z,f,g,_)}else if(this.curveType==="catmullrom")$r.initCatmullRom(l.x,h.x,u.x,c.x,this.tension),Jr.initCatmullRom(l.y,h.y,u.y,c.y,this.tension),jr.initCatmullRom(l.z,h.z,u.z,c.z,this.tension);return n.set($r.calc(a),Jr.calc(a),jr.calc(a)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new w().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function bl(e,t,n,i,s){let r=(i-t)*0.5,o=(s-n)*0.5,a=e*e,l=e*a;return(2*n-2*i+r+o)*l+(-3*n+3*i-2*r-o)*a+r*e+n}function og(e,t){let n=1-e;return n*n*t}function ag(e,t){return 2*(1-e)*e*t}function lg(e,t){return e*e*t}function as(e,t,n,i){return og(e,t)+ag(e,n)+lg(e,i)}function cg(e,t){let n=1-e;return n*n*n*t}function hg(e,t){let n=1-e;return 3*n*n*e*t}function ug(e,t){return 3*(1-e)*e*e*t}function dg(e,t){return e*e*e*t}function ls(e,t,n,i,s){return cg(e,t)+hg(e,n)+ug(e,i)+dg(e,s)}class bo extends an{constructor(e=new ue,t=new ue,n=new ue,i=new ue){super();this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ue){let n=t,i=this.v0,s=this.v1,r=this.v2,o=this.v3;return n.set(ls(e,i.x,s.x,r.x,o.x),ls(e,i.y,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class pc extends an{constructor(e=new w,t=new w,n=new w,i=new w){super();this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,r=this.v2,o=this.v3;return n.set(ls(e,i.x,s.x,r.x,o.x),ls(e,i.y,s.y,r.y,o.y),ls(e,i.z,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class wo extends an{constructor(e=new ue,t=new ue){super();this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){let n=t;if(e===1)n.copy(this.v2);else n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1);return n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mc extends an{constructor(e=new w,t=new w){super();this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){let n=t;if(e===1)n.copy(this.v2);else n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1);return n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ao extends an{constructor(e=new ue,t=new ue,n=new ue){super();this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ue){let n=t,i=this.v0,s=this.v1,r=this.v2;return n.set(as(e,i.x,s.x,r.x),as(e,i.y,s.y,r.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class gc extends an{constructor(e=new w,t=new w,n=new w){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,r=this.v2;return n.set(as(e,i.x,s.x,r.x),as(e,i.y,s.y,r.y),as(e,i.z,s.z,r.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ro extends an{constructor(e=[]){super();this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){let n=t,i=this.points,s=(i.length-1)*e,r=Math.floor(s),o=s-r,a=i[r===0?r:r-1],l=i[r],c=i[r>i.length-2?i.length-1:r+1],h=i[r>i.length-3?i.length-1:r+2];return n.set(bl(o,a.x,l.x,c.x,h.x),bl(o,a.y,l.y,c.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ue().fromArray(i))}return this}}var wl=Object.freeze({__proto__:null,ArcCurve:dc,CatmullRomCurve3:fc,CubicBezierCurve:bo,CubicBezierCurve3:pc,EllipseCurve:hr,LineCurve:wo,LineCurve3:mc,QuadraticBezierCurve:Ao,QuadraticBezierCurve3:gc,SplineCurve:Ro});class _c extends an{constructor(){super();this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new wl[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;while(s<i.length){if(i[s]>=n){let r=i[s]-n,o=this.curves[s],a=o.getLength(),l=a===0?0:1-r/a;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));if(this.autoClose)t.push(t[0]);return t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let r=s[i],o=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,a=r.getPoints(o);for(let l=0;l<a.length;l++){let c=a[l];if(n&&n.equals(c))continue;t.push(c),n=c}}if(this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0]))t.push(t[0]);return t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new wl[i.type]().fromJSON(i))}return this}}class xc extends _c{constructor(e){super();if(this.type="Path",this.currentPoint=new ue,e)this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new wo(this.currentPoint.clone(),new ue(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new Ao(this.currentPoint.clone(),new ue(e,t),new ue(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,r){let o=new bo(this.currentPoint.clone(),new ue(e,t),new ue(n,i),new ue(s,r));return this.curves.push(o),this.currentPoint.set(s,r),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Ro(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,r){let o=this.currentPoint.x,a=this.currentPoint.y;return this.absarc(e+o,t+a,n,i,s,r),this}absarc(e,t,n,i,s,r){return this.absellipse(e,t,n,n,i,s,r),this}ellipse(e,t,n,i,s,r,o,a){let l=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(e+l,t+c,n,i,s,r,o,a),this}absellipse(e,t,n,i,s,r,o,a){let l=new hr(e,t,n,i,s,r,o,a);if(this.curves.length>0){let h=l.getPoint(0);if(!h.equals(this.currentPoint))this.lineTo(h.x,h.y)}this.curves.push(l);let c=l.getPoint(1);return this.currentPoint.copy(c),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Co extends ut{constructor(e=[new ue(0,-0.5),new ue(0.5,0),new ue(0,0.5)],t=12,n=0,i=Math.PI*2){super();this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=yt(i,0,Math.PI*2);let s=[],r=[],o=[],a=[],l=[],c=1/t,h=new w,u=new ue,d=new w,f=new w,g=new w,_=0,p=0;for(let m=0;m<=e.length-1;m++)switch(m){case 0:_=e[m+1].x-e[m].x,p=e[m+1].y-e[m].y,d.x=p*1,d.y=-_,d.z=p*0,g.copy(d),d.normalize(),a.push(d.x,d.y,d.z);break;case e.length-1:a.push(g.x,g.y,g.z);break;default:_=e[m+1].x-e[m].x,p=e[m+1].y-e[m].y,d.x=p*1,d.y=-_,d.z=p*0,f.copy(d),d.x+=g.x,d.y+=g.y,d.z+=g.z,d.normalize(),a.push(d.x,d.y,d.z),g.copy(f)}for(let m=0;m<=t;m++){let v=n+m*c*i,x=Math.sin(v),T=Math.cos(v);for(let I=0;I<=e.length-1;I++){h.x=e[I].x*x,h.y=e[I].y,h.z=e[I].x*T,r.push(h.x,h.y,h.z),u.x=m/t,u.y=I/(e.length-1),o.push(u.x,u.y);let b=a[3*I+0]*x,A=a[3*I+1],F=a[3*I+0]*T;l.push(b,A,F)}}for(let m=0;m<t;m++)for(let v=0;v<e.length-1;v++){let x=v+m*e.length,T=x,I=x+e.length,b=x+e.length+1,A=x+1;s.push(T,I,A),s.push(b,A,I)}this.setIndex(s),this.setAttribute("position",new rt(r,3)),this.setAttribute("uv",new rt(o,2)),this.setAttribute("normal",new rt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Co(e.points,e.segments,e.phiStart,e.phiLength)}}class li extends Co{constructor(e=1,t=1,n=4,i=8){let s=new xc;s.absarc(0,-t/2,e,Math.PI*1.5,0),s.absarc(0,t/2,e,0,Math.PI*0.5);super(s.getPoints(n),i);this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new li(e.radius,e.length,e.capSegments,e.radialSegments)}}class Bi extends ut{constructor(e=1,t=32,n=0,i=Math.PI*2){super();this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],r=[],o=[],a=[],l=new w,c=new ue;r.push(0,0,0),o.push(0,0,1),a.push(0.5,0.5);for(let h=0,u=3;h<=t;h++,u+=3){let d=n+h/t*i;l.x=e*Math.cos(d),l.y=e*Math.sin(d),r.push(l.x,l.y,l.z),o.push(0,0,1),c.x=(r[u]/e+1)/2,c.y=(r[u+1]/e+1)/2,a.push(c.x,c.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new rt(r,3)),this.setAttribute("normal",new rt(o,3)),this.setAttribute("uv",new rt(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bi(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Yn extends ut{constructor(e=1,t=1,n=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a};let l=this;i=Math.floor(i),s=Math.floor(s);let c=[],h=[],u=[],d=[],f=0,g=[],_=n/2,p=0;if(m(),r===!1){if(e>0)v(!0);if(t>0)v(!1)}this.setIndex(c),this.setAttribute("position",new rt(h,3)),this.setAttribute("normal",new rt(u,3)),this.setAttribute("uv",new rt(d,2));function m(){let x=new w,T=new w,I=0,b=(t-e)/n;for(let A=0;A<=s;A++){let F=[],S=A/s,E=S*(t-e)+e;for(let C=0;C<=i;C++){let z=C/i,k=z*a+o,G=Math.sin(k),K=Math.cos(k);T.x=E*G,T.y=-S*n+_,T.z=E*K,h.push(T.x,T.y,T.z),x.set(G,b,K).normalize(),u.push(x.x,x.y,x.z),d.push(z,1-S),F.push(f++)}g.push(F)}for(let A=0;A<i;A++)for(let F=0;F<s;F++){let S=g[F][A],E=g[F+1][A],C=g[F+1][A+1],z=g[F][A+1];if(e>0||F!==0)c.push(S,E,z),I+=3;if(t>0||F!==s-1)c.push(E,C,z),I+=3}l.addGroup(p,I,0),p+=I}function v(x){let T=f,I=new ue,b=new w,A=0,F=x===!0?e:t,S=x===!0?1:-1;for(let C=1;C<=i;C++)h.push(0,_*S,0),u.push(0,S,0),d.push(0.5,0.5),f++;let E=f;for(let C=0;C<=i;C++){let k=C/i*a+o,G=Math.cos(k),K=Math.sin(k);b.x=F*K,b.y=_*S,b.z=F*G,h.push(b.x,b.y,b.z),u.push(0,S,0),I.x=G*0.5+0.5,I.y=K*0.5*S+0.5,d.push(I.x,I.y),f++}for(let C=0;C<i;C++){let z=T+C,k=E+C;if(x===!0)c.push(k,k+1,z);else c.push(k+1,k,z);A+=3}l.addGroup(p,A,x===!0?1:2),p+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ur extends ut{constructor(e=0.5,t=1,n=32,i=1,s=0,r=Math.PI*2){super();this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:r},n=Math.max(3,n),i=Math.max(1,i);let o=[],a=[],l=[],c=[],h=e,u=(t-e)/i,d=new w,f=new ue;for(let g=0;g<=i;g++){for(let _=0;_<=n;_++){let p=s+_/n*r;d.x=h*Math.cos(p),d.y=h*Math.sin(p),a.push(d.x,d.y,d.z),l.push(0,0,1),f.x=(d.x/t+1)/2,f.y=(d.y/t+1)/2,c.push(f.x,f.y)}h+=u}for(let g=0;g<i;g++){let _=g*(n+1);for(let p=0;p<n;p++){let m=p+_,v=m,x=m+n+1,T=m+n+2,I=m+1;o.push(v,x,I),o.push(x,T,I)}}this.setIndex(o),this.setAttribute("position",new rt(a,3)),this.setAttribute("normal",new rt(l,3)),this.setAttribute("uv",new rt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ur(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class ln extends ut{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,r=0,o=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let a=Math.min(r+o,Math.PI),l=0,c=[],h=new w,u=new w,d=[],f=[],g=[],_=[];for(let p=0;p<=n;p++){let m=[],v=p/n,x=0;if(p===0&&r===0)x=0.5/t;else if(p===n&&a===Math.PI)x=-0.5/t;for(let T=0;T<=t;T++){let I=T/t;h.x=-e*Math.cos(i+I*s)*Math.sin(r+v*o),h.y=e*Math.cos(r+v*o),h.z=e*Math.sin(i+I*s)*Math.sin(r+v*o),f.push(h.x,h.y,h.z),u.copy(h).normalize(),g.push(u.x,u.y,u.z),_.push(I+x,1-v),m.push(l++)}c.push(m)}for(let p=0;p<n;p++)for(let m=0;m<t;m++){let v=c[p][m+1],x=c[p][m],T=c[p+1][m],I=c[p+1][m+1];if(p!==0||r>0)d.push(v,x,I);if(p!==n-1||a<Math.PI)d.push(x,T,I)}this.setIndex(d),this.setAttribute("position",new rt(f,3)),this.setAttribute("normal",new rt(g,3)),this.setAttribute("uv",new rt(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ln(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ms extends Gt{static get type(){return"MeshStandardMaterial"}constructor(e){super();this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Zt extends ms{static get type(){return"MeshPhysicalMaterial"}constructor(e){super();this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return yt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+0.4*t)/(1-0.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){if(this._anisotropy>0!==e>0)this.version++;this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){if(this._clearcoat>0!==e>0)this.version++;this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){if(this._iridescence>0!==e>0)this.version++;this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){if(this._dispersion>0!==e>0)this.version++;this._dispersion=e}get sheen(){return this._sheen}set sheen(e){if(this._sheen>0!==e>0)this.version++;this._sheen=e}get transmission(){return this._transmission}set transmission(e){if(this._transmission>0!==e>0)this.version++;this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Vt extends Gt{static get type(){return"MeshLambertMaterial"}constructor(e){super();this.isMeshLambertMaterial=!0,this.color=new Ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function $s(e,t,n){if(!e||!n&&e.constructor===t)return e;if(typeof t.BYTES_PER_ELEMENT==="number")return new t(e);return Array.prototype.slice.call(e)}function fg(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function pg(e){function t(s,r){return e[s]-e[r]}let n=e.length,i=Array(n);for(let s=0;s!==n;++s)i[s]=s;return i.sort(t),i}function Al(e,t,n){let i=e.length,s=new e.constructor(i);for(let r=0,o=0;o!==i;++r){let a=n[r]*t;for(let l=0;l!==t;++l)s[o++]=e[a+l]}return s}function yc(e,t,n,i){let s=1,r=e[0];while(r!==void 0&&r[i]===void 0)r=e[s++];if(r===void 0)return;let o=r[i];if(o===void 0)return;if(Array.isArray(o))do{if(o=r[i],o!==void 0)t.push(r.time),n.push.apply(n,o);r=e[s++]}while(r!==void 0);else if(o.toArray!==void 0)do{if(o=r[i],o!==void 0)t.push(r.time),o.toArray(n,n.length);r=e[s++]}while(r!==void 0);else do{if(o=r[i],o!==void 0)t.push(r.time),n.push(o);r=e[s++]}while(r!==void 0)}class ci{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let r;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}r=t.length;break t}if(!(e>=s)){let o=t[1];if(e<o)n=2,s=o;for(let a=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(i=s,s=t[--n-1],e>=s)break e}r=n,n=0;break t}break n}while(n<r){let o=n+r>>>1;if(e<t[o])r=o;else n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let r=0;r!==i;++r)t[r]=n[s+r];return t}interpolate_(){throw Error("call to abstract method")}intervalChanged_(){}}class vc extends ci{constructor(e,t,n,i){super(e,t,n,i);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,r=e+1,o=i[s],a=i[r];if(o===void 0)switch(this.getSettings_().endingStart){case 2401:s=e,o=2*t-n;break;case 2402:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(a===void 0)switch(this.getSettings_().endingEnd){case 2401:r=e,a=2*n-t;break;case 2402:r=1,a=n+i[1]-i[0];break;default:r=e-1,a=t}let l=(n-t)*0.5,c=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(a-n),this._offsetPrev=s*c,this._offsetNext=r*c}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=e*o,l=a-o,c=this._offsetPrev,h=this._offsetNext,u=this._weightPrev,d=this._weightNext,f=(n-t)/(i-t),g=f*f,_=g*f,p=-u*_+2*u*g-u*f,m=(1+u)*_+(-1.5-2*u)*g+(-0.5+u)*f+1,v=(-1-d)*_+(1.5+d)*g+0.5*f,x=d*_-d*g;for(let T=0;T!==o;++T)s[T]=p*r[c+T]+m*r[l+T]+v*r[a+T]+x*r[h+T];return s}}class Mc extends ci{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=e*o,l=a-o,c=(n-t)/(i-t),h=1-c;for(let u=0;u!==o;++u)s[u]=r[l+u]*h+r[a+u]*c;return s}}class Sc extends ci{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class cn{constructor(e,t,n,i){if(e===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=$s(t,this.TimeBufferType),this.values=$s(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:$s(e.times,Array),values:$s(e.values,Array)};let i=e.getInterpolation();if(i!==e.DefaultInterpolation)n.interpolation=i}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Sc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Mc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new vc(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,r=i-1;while(s!==i&&n[s]<e)++s;while(r!==-1&&n[r]>t)--r;if(++r,s!==0||r!==i){if(s>=r)r=Math.max(r,1),s=r-1;let o=this.getValueSize();this.times=n.slice(s,r),this.values=this.values.slice(s*o,r*o)}return this}validate(){let e=!0,t=this.getValueSize();if(t-Math.floor(t)!==0)console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1;let n=this.times,i=this.values,s=n.length;if(s===0)console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1;let r=null;for(let o=0;o!==s;o++){let a=n[o];if(typeof a==="number"&&isNaN(a)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,a),e=!1;break}if(r!==null&&r>a){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,a,r),e=!1;break}r=a}if(i!==void 0){if(fg(i))for(let o=0,a=i.length;o!==a;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===2302,s=e.length-1,r=1;for(let o=1;o<s;++o){let a=!1,l=e[o],c=e[o+1];if(l!==c&&(o!==1||l!==e[0]))if(!i){let h=o*n,u=h-n,d=h+n;for(let f=0;f!==n;++f){let g=t[h+f];if(g!==t[u+f]||g!==t[d+f]){a=!0;break}}}else a=!0;if(a){if(o!==r){e[r]=e[o];let h=o*n,u=r*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++r}}if(s>0){e[r]=e[s];for(let o=s*n,a=r*n,l=0;l!==n;++l)t[a+l]=t[o+l];++r}if(r!==e.length)this.times=e.slice(0,r),this.values=t.slice(0,r*n);else this.times=e,this.values=t;return this}clone(){let e=this.times.slice(),t=this.values.slice(),i=new this.constructor(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}cn.prototype.TimeBufferType=Float32Array;cn.prototype.ValueBufferType=Float32Array;cn.prototype.DefaultInterpolation=2301;class hi extends cn{constructor(e,t,n){super(e,t,n)}}hi.prototype.ValueTypeName="bool";hi.prototype.ValueBufferType=Array;hi.prototype.DefaultInterpolation=2300;hi.prototype.InterpolantFactoryMethodLinear=void 0;hi.prototype.InterpolantFactoryMethodSmooth=void 0;class Io extends cn{}Io.prototype.ValueTypeName="color";class Xn extends cn{}Xn.prototype.ValueTypeName="number";class Ec extends ci{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=(n-t)/(i-t),l=e*o;for(let c=l+o;l!==c;l+=4)qt.slerpFlat(s,0,r,l-o,r,l,a);return s}}class Zn extends cn{InterpolantFactoryMethodLinear(e){return new Ec(this.times,this.values,this.getValueSize(),e)}}Zn.prototype.ValueTypeName="quaternion";Zn.prototype.InterpolantFactoryMethodSmooth=void 0;class ui extends cn{constructor(e,t,n){super(e,t,n)}}ui.prototype.ValueTypeName="string";ui.prototype.ValueBufferType=Array;ui.prototype.DefaultInterpolation=2300;ui.prototype.InterpolantFactoryMethodLinear=void 0;ui.prototype.InterpolantFactoryMethodSmooth=void 0;class qn extends cn{}qn.prototype.ValueTypeName="vector";class Po{constructor(e="",t=-1,n=[],i=2500){if(this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=sn(),this.duration<0)this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let r=0,o=n.length;r!==o;++r)t.push(gg(n[r]).scale(i));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,r=n.length;s!==r;++s)t.push(cn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let s=t.length,r=[];for(let o=0;o<s;o++){let a=[],l=[];a.push((o+s-1)%s,o,(o+1)%s),l.push(0,1,0);let c=pg(a);if(a=Al(a,1,c),l=Al(l,1,c),!i&&a[0]===0)a.push(s),l.push(l[0]);r.push(new Xn(".morphTargetInfluences["+t[o].name+"]",a,l).scale(1/n))}return new this(e,-1,r)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,a=e.length;o<a;o++){let l=e[o],c=l.name.match(s);if(c&&c.length>1){let h=c[1],u=i[h];if(!u)i[h]=u=[];u.push(l)}}let r=[];for(let o in i)r.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return r}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,u,d,f,g){if(d.length!==0){let _=[],p=[];if(yc(d,_,p,f),_.length!==0)g.push(new h(u,_,p))}},i=[],s=e.name||"default",r=e.fps||30,o=e.blendMode,a=e.length||-1,l=e.hierarchy||[];for(let h=0;h<l.length;h++){let u=l[h].keys;if(!u||u.length===0)continue;if(u[0].morphTargets){let d={},f;for(f=0;f<u.length;f++)if(u[f].morphTargets)for(let g=0;g<u[f].morphTargets.length;g++)d[u[f].morphTargets[g]]=-1;for(let g in d){let _=[],p=[];for(let m=0;m!==u[f].morphTargets.length;++m){let v=u[f];_.push(v.time),p.push(v.morphTarget===g?1:0)}i.push(new Xn(".morphTargetInfluence["+g+"]",_,p))}a=d.length*r}else{let d=".bones["+t[h].name+"]";n(qn,d+".position",u,"pos",i),n(Zn,d+".quaternion",u,"rot",i),n(qn,d+".scale",u,"scl",i)}}if(i.length===0)return null;return new this(s,a,i,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function mg(e){switch(e.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Xn;case"vector":case"vector2":case"vector3":case"vector4":return qn;case"color":return Io;case"quaternion":return Zn;case"bool":case"boolean":return hi;case"string":return ui}throw Error("THREE.KeyframeTrack: Unsupported typeName: "+e)}function gg(e){if(e.type===void 0)throw Error("THREE.KeyframeTrack: track type undefined, can not parse");let t=mg(e.type);if(e.times===void 0){let n=[],i=[];yc(e.keys,n,i,"value"),e.times=n,e.values=i}if(t.parse!==void 0)return t.parse(e);else return new t(e.name,e.times,e.values,e.interpolation)}var Vn={enabled:!1,files:{},add:function(e,t){if(this.enabled===!1)return;this.files[e]=t},get:function(e){if(this.enabled===!1)return;return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};class Tc{constructor(e,t,n){let i=this,s=!1,r=0,o=0,a=void 0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(c){if(o++,s===!1){if(i.onStart!==void 0)i.onStart(c,r,o)}s=!0},this.itemEnd=function(c){if(r++,i.onProgress!==void 0)i.onProgress(c,r,o);if(r===o){if(s=!1,i.onLoad!==void 0)i.onLoad()}},this.itemError=function(c){if(i.onError!==void 0)i.onError(c)},this.resolveURL=function(c){if(a)return a(c);return c},this.setURLModifier=function(c){return a=c,this},this.addHandler=function(c,h){return l.push(c,h),this},this.removeHandler=function(c){let h=l.indexOf(c);if(h!==-1)l.splice(h,2);return this},this.getHandler=function(c){for(let h=0,u=l.length;h<u;h+=2){let d=l[h],f=l[h+1];if(d.global)d.lastIndex=0;if(d.test(c))return f}return null}}}var _g=new Tc;class Kn{constructor(e){this.manager=e!==void 0?e:_g,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Kn.DEFAULT_MATERIAL_NAME="__DEFAULT";var wn={};class bc extends Error{constructor(e,t){super(e);this.response=t}}class dr extends Kn{constructor(e){super(e)}load(e,t,n,i){if(e===void 0)e="";if(this.path!==void 0)e=this.path+e;e=this.manager.resolveURL(e);let s=Vn.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{if(t)t(s);this.manager.itemEnd(e)},0),s;if(wn[e]!==void 0){wn[e].push({onLoad:t,onProgress:n,onError:i});return}wn[e]=[],wn[e].push({onLoad:t,onProgress:n,onError:i});let r=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,a=this.responseType;fetch(r).then((l)=>{if(l.status===200||l.status===0){if(l.status===0)console.warn("THREE.FileLoader: HTTP Status 0 received.");if(typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let c=wn[e],h=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=u?parseInt(u):0,f=d!==0,g=0,_=new ReadableStream({start(p){m();function m(){h.read().then(({done:v,value:x})=>{if(v)p.close();else{g+=x.byteLength;let T=new ProgressEvent("progress",{lengthComputable:f,loaded:g,total:d});for(let I=0,b=c.length;I<b;I++){let A=c[I];if(A.onProgress)A.onProgress(T)}p.enqueue(x),m()}},(v)=>{p.error(v)})}}});return new Response(_)}else throw new bc(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then((l)=>{switch(a){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then((c)=>new DOMParser().parseFromString(c,o));case"json":return l.json();default:if(o===void 0)return l.text();else{let h=/charset="?([^;"\s]*)"?/i.exec(o),u=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(u);return l.arrayBuffer().then((f)=>d.decode(f))}}}).then((l)=>{Vn.add(e,l);let c=wn[e];delete wn[e];for(let h=0,u=c.length;h<u;h++){let d=c[h];if(d.onLoad)d.onLoad(l)}}).catch((l)=>{let c=wn[e];if(c===void 0)throw this.manager.itemError(e),l;delete wn[e];for(let h=0,u=c.length;h<u;h++){let d=c[h];if(d.onError)d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class wc extends Kn{constructor(e){super(e)}load(e,t,n,i){if(this.path!==void 0)e=this.path+e;e=this.manager.resolveURL(e);let s=this,r=Vn.get(e);if(r!==void 0)return s.manager.itemStart(e),setTimeout(function(){if(t)t(r);s.manager.itemEnd(e)},0),r;let o=cs("img");function a(){if(c(),Vn.add(e,this),t)t(this);s.manager.itemEnd(e)}function l(h){if(c(),i)i(h);s.manager.itemError(e),s.manager.itemEnd(e)}function c(){o.removeEventListener("load",a,!1),o.removeEventListener("error",l,!1)}if(o.addEventListener("load",a,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"){if(this.crossOrigin!==void 0)o.crossOrigin=this.crossOrigin}return s.manager.itemStart(e),o.src=e,o}}class Lo extends Kn{constructor(e){super(e)}load(e,t,n,i){let s=new xt,r=new wc(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(o){if(s.image=o,s.needsUpdate=!0,t!==void 0)t(s)},n,i),s}}class gs extends ot{constructor(e,t=1){super();this.isLight=!0,this.type="Light",this.color=new Ee(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);if(t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0)t.object.groundColor=this.groundColor.getHex();if(this.distance!==void 0)t.object.distance=this.distance;if(this.angle!==void 0)t.object.angle=this.angle;if(this.decay!==void 0)t.object.decay=this.decay;if(this.penumbra!==void 0)t.object.penumbra=this.penumbra;if(this.shadow!==void 0)t.object.shadow=this.shadow.toJSON();if(this.target!==void 0)t.object.target=this.target.uuid;return t}}class No extends gs{constructor(e,t,n){super(e,n);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ot.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ee(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}var Qr=new Re,Rl=new w,Cl=new w;class fr{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.map=null,this.mapPass=null,this.matrix=new Re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ir,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new Ze(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Rl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Rl),Cl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Cl),t.updateMatrixWorld(),Qr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qr),n.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1),n.multiply(Qr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};if(this.intensity!==1)e.intensity=this.intensity;if(this.bias!==0)e.bias=this.bias;if(this.normalBias!==0)e.normalBias=this.normalBias;if(this.radius!==1)e.radius=this.radius;if(this.mapSize.x!==512||this.mapSize.y!==512)e.mapSize=this.mapSize.toArray();return e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Ac extends fr{constructor(){super(new Tt(50,1,0.5,500));this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=Pi*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;if(n!==t.fov||i!==t.aspect||s!==t.far)t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix();super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Do extends gs{constructor(e,t,n=0,i=Math.PI/3,s=0,r=2){super(e,t);this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ot.DEFAULT_UP),this.updateMatrix(),this.target=new ot,this.distance=n,this.angle=i,this.penumbra=s,this.decay=r,this.map=null,this.shadow=new Ac}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}var Il=new Re,ts=new w,eo=new w;class Rc extends fr{constructor(){super(new Tt(90,1,0.5,500));this.isPointLightShadow=!0,this._frameExtents=new ue(4,2),this._viewportCount=6,this._viewports=[new Ze(2,1,1,1),new Ze(0,1,1,1),new Ze(3,1,1,1),new Ze(1,1,1,1),new Ze(3,0,1,1),new Ze(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;if(s!==n.far)n.far=s,n.updateProjectionMatrix();ts.setFromMatrixPosition(e.matrixWorld),n.position.copy(ts),eo.copy(n.position),eo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(eo),n.updateMatrixWorld(),i.makeTranslation(-ts.x,-ts.y,-ts.z),Il.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Il)}}class Uo extends gs{constructor(e,t,n=0,i=2){super(e,t);this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Rc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Cc extends fr{constructor(){super(new us(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class _s extends gs{constructor(e,t){super(e,t);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ot.DEFAULT_UP),this.updateMatrix(),this.target=new ot,this.shadow=new Cc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class di{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch(n){return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");if(t===-1)return"./";return e.slice(0,t+1)}static resolveURL(e,t){if(typeof e!=="string"||e==="")return"";if(/^https?:\/\//i.test(t)&&/^\//.test(e))t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1");if(/^(https?:)?\/\//i.test(e))return e;if(/^data:.*,.*$/i.test(e))return e;if(/^blob:.*$/i.test(e))return e;return t+e}}class Fo extends Kn{constructor(e){super(e);if(this.isImageBitmapLoader=!0,typeof createImageBitmap>"u")console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported.");if(typeof fetch>"u")console.warn("THREE.ImageBitmapLoader: fetch() not supported.");this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){if(e===void 0)e="";if(this.path!==void 0)e=this.path+e;e=this.manager.resolveURL(e);let s=this,r=Vn.get(e);if(r!==void 0){if(s.manager.itemStart(e),r.then){r.then((l)=>{if(t)t(l);s.manager.itemEnd(e)}).catch((l)=>{if(i)i(l)});return}return setTimeout(function(){if(t)t(r);s.manager.itemEnd(e)},0),r}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;let a=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){if(Vn.add(e,l),t)t(l);return s.manager.itemEnd(e),l}).catch(function(l){if(i)i(l);Vn.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});Vn.add(e,a),s.manager.itemStart(e)}}class Oo{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Pl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=Pl();e=(t-this.oldTime)/1000,this.oldTime=t,this.elapsedTime+=e}return e}}function Pl(){return performance.now()}var Bo="\\[\\]\\.:\\/",xg=new RegExp("["+Bo+"]","g"),zo="[^"+Bo+"]",yg="[^"+Bo.replace("\\.","")+"]",vg=/((?:WC+[\/:])*)/.source.replace("WC",zo),Mg=/(WCOD+)?/.source.replace("WCOD",yg),Sg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",zo),Eg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",zo),Tg=new RegExp("^"+vg+Mg+Sg+Eg+"$"),bg=["material","materials","bones","map"];class Ic{constructor(e,t,n){let i=n||Qe.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];if(i!==void 0)i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Qe{constructor(e,t,n){this.path=t,this.parsedPath=n||Qe.parseTrackName(t),this.node=Qe.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){if(!(e&&e.isAnimationObjectGroup))return new Qe(e,t,n);else return new Qe.Composite(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(xg,"")}static parseTrackName(e){let t=Tg.exec(e);if(t===null)throw Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);if(bg.indexOf(s)!==-1)n.nodeName=n.nodeName.substring(0,i),n.objectName=s}if(n.propertyName===null||n.propertyName.length===0)throw Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let r=0;r<s.length;r++){let o=s[r];if(o.name===t||o.uuid===t)return o;let a=n(o.children);if(a)return a}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(!e)e=Qe.findNode(this.rootNode,t.nodeName),this.node=e;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let c=0;c<e.length;c++)if(e[c].name===l){l=c;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let r=e[i];if(r===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;if(this.targetObject=e,e.needsUpdate!==void 0)o=this.Versioning.NeedsUpdate;else if(e.matrixWorldNeedsUpdate!==void 0)o=this.Versioning.MatrixWorldNeedsUpdate;let a=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(e.morphTargetDictionary[s]!==void 0)s=e.morphTargetDictionary[s]}a=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else if(r.fromArray!==void 0&&r.toArray!==void 0)a=this.BindingType.HasFromToArray,this.resolvedProperty=r;else if(Array.isArray(r))a=this.BindingType.EntireArray,this.resolvedProperty=r;else this.propertyName=i;this.getValue=this.GetterByBindingType[a],this.setValue=this.SetterByBindingTypeAndVersioning[a][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Qe.Composite=Ic;Qe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Qe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Qe.prototype.GetterByBindingType=[Qe.prototype._getValue_direct,Qe.prototype._getValue_array,Qe.prototype._getValue_arrayElement,Qe.prototype._getValue_toArray];Qe.prototype.SetterByBindingTypeAndVersioning=[[Qe.prototype._setValue_direct,Qe.prototype._setValue_direct_setNeedsUpdate,Qe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_array,Qe.prototype._setValue_array_setNeedsUpdate,Qe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_arrayElement,Qe.prototype._setValue_arrayElement_setNeedsUpdate,Qe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_fromArray,Qe.prototype._setValue_fromArray_setNeedsUpdate,Qe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var p0=new Float32Array(1);var Ll=new Re;class xs{constructor(e,t,n=0,i=1/0){this.ray=new Fi(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new nr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){if(t.isPerspectiveCamera)this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,0.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t;else if(t.isOrthographicCamera)this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t;else console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ll.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ll),this}intersectObject(e,t=!0,n=[]){return so(e,this,n,t),n.sort(Nl),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)so(e[i],this,n,t);return n.sort(Nl),n}}function Nl(e,t){return e.distance-t.distance}function so(e,t,n,i){let s=!0;if(e.layers.test(t.layers)){if(e.raycast(t,n)===!1)s=!1}if(s===!0&&i===!0){let r=e.children;for(let o=0,a=r.length;o<a;o++)so(r[o],t,n,!0)}}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));if(typeof window<"u")if(window.__THREE__)console.warn("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="170";function Ho(e,t){if(t===Gl)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),e;if(t===hs||t===tr){let n=e.getIndex();if(n===null){let o=[],a=e.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);e.setIndex(o),n=e.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),e}let i=n.count-2,s=[];if(t===hs)for(let o=1;o<=i;o++)s.push(n.getX(0)),s.push(n.getX(o)),s.push(n.getX(o+1));else for(let o=0;o<i;o++)if(o%2===0)s.push(n.getX(o)),s.push(n.getX(o+1)),s.push(n.getX(o+2));else s.push(n.getX(o+2)),s.push(n.getX(o+1)),s.push(n.getX(o));if(s.length/3!==i)console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=e.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),e}class qo extends Kn{constructor(e){super(e);this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Bc(t)}),this.register(function(t){return new zc(t)}),this.register(function(t){return new Zc(t)}),this.register(function(t){return new Kc(t)}),this.register(function(t){return new $c(t)}),this.register(function(t){return new kc(t)}),this.register(function(t){return new Gc(t)}),this.register(function(t){return new Vc(t)}),this.register(function(t){return new Wc(t)}),this.register(function(t){return new Oc(t)}),this.register(function(t){return new Xc(t)}),this.register(function(t){return new Hc(t)}),this.register(function(t){return new Yc(t)}),this.register(function(t){return new qc(t)}),this.register(function(t){return new Uc(t)}),this.register(function(t){return new Jc(t)}),this.register(function(t){return new jc(t)})}load(e,t,n,i){let s=this,r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){let l=di.extractUrlBase(e);r=di.resolveURL(l,this.path)}else r=di.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){if(i)i(l);else console.error(l);s.manager.itemError(e),s.manager.itemEnd(e)},a=new dr(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){try{s.parse(l,r,function(c){t(c),s.manager.itemEnd(e)},o)}catch(c){o(c)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){if(this.pluginCallbacks.indexOf(e)===-1)this.pluginCallbacks.push(e);return this}unregister(e){if(this.pluginCallbacks.indexOf(e)!==-1)this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1);return this}parse(e,t,n,i){let s,r={},o={},a=new TextDecoder;if(typeof e==="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(a.decode(new Uint8Array(e,0,4))===Qc){try{r[Ge.KHR_BINARY_GLTF]=new eh(e)}catch(h){if(i)i(h);return}s=JSON.parse(r[Ge.KHR_BINARY_GLTF].content)}else s=JSON.parse(a.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){if(i)i(Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new rh(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let c=0;c<this.pluginCallbacks.length;c++){let h=this.pluginCallbacks[c](l);if(!h.name)console.error("THREE.GLTFLoader: Invalid plugin found: missing name");o[h.name]=h,r[h.name]=!0}if(s.extensionsUsed)for(let c=0;c<s.extensionsUsed.length;++c){let h=s.extensionsUsed[c],u=s.extensionsRequired||[];switch(h){case Ge.KHR_MATERIALS_UNLIT:r[h]=new Fc;break;case Ge.KHR_DRACO_MESH_COMPRESSION:r[h]=new th(s,this.dracoLoader);break;case Ge.KHR_TEXTURE_TRANSFORM:r[h]=new nh;break;case Ge.KHR_MESH_QUANTIZATION:r[h]=new ih;break;default:if(u.indexOf(h)>=0&&o[h]===void 0)console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(r),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function wg(){let e={};return{get:function(t){return e[t]},add:function(t,n){e[t]=n},remove:function(t){delete e[t]},removeAll:function(){e={}}}}var Ge={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Uc{constructor(e){this.parser=e,this.name=Ge.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let s=t[n];if(s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0)e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let s=t.json,a=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],l,c=new Ee(16777215);if(a.color!==void 0)c.setRGB(a.color[0],a.color[1],a.color[2],mn);let h=a.range!==void 0?a.range:0;switch(a.type){case"directional":l=new _s(c),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Uo(c),l.distance=h;break;case"spot":l=new Do(c),l.distance=h,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle!==void 0?a.spot.innerConeAngle:0,a.spot.outerConeAngle=a.spot.outerConeAngle!==void 0?a.spot.outerConeAngle:Math.PI/4,l.angle=a.spot.outerConeAngle,l.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw Error("THREE.GLTFLoader: Unexpected light type: "+a.type)}if(l.position.set(0,0,0),l.decay=2,In(l,a),a.intensity!==void 0)l.intensity=a.intensity;return l.name=t.createUniqueName(a.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e!=="light")return;return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;if(o===void 0)return null;return this._loadLight(o).then(function(a){return n._getNodeRef(t.cache,o,a)})}}class Fc{constructor(){this.name=Ge.KHR_MATERIALS_UNLIT}getMaterialType(){return at}extendParams(e,t,n){let i=[];e.color=new Ee(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let r=s.baseColorFactor;e.color.setRGB(r[0],r[1],r[2],mn),e.opacity=r[3]}if(s.baseColorTexture!==void 0)i.push(n.assignTexture(e,"map",s.baseColorTexture,Ut))}return Promise.all(i)}}class Oc{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name].emissiveStrength;if(s!==void 0)t.emissiveIntensity=s;return Promise.resolve()}}class Bc{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return null;return Zt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];if(r.clearcoatFactor!==void 0)t.clearcoat=r.clearcoatFactor;if(r.clearcoatTexture!==void 0)s.push(n.assignTexture(t,"clearcoatMap",r.clearcoatTexture));if(r.clearcoatRoughnessFactor!==void 0)t.clearcoatRoughness=r.clearcoatRoughnessFactor;if(r.clearcoatRoughnessTexture!==void 0)s.push(n.assignTexture(t,"clearcoatRoughnessMap",r.clearcoatRoughnessTexture));if(r.clearcoatNormalTexture!==void 0){if(s.push(n.assignTexture(t,"clearcoatNormalMap",r.clearcoatNormalTexture)),r.clearcoatNormalTexture.scale!==void 0){let o=r.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ue(o,o)}}return Promise.all(s)}}class zc{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return null;return Zt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class Hc{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return null;return Zt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];if(r.iridescenceFactor!==void 0)t.iridescence=r.iridescenceFactor;if(r.iridescenceTexture!==void 0)s.push(n.assignTexture(t,"iridescenceMap",r.iridescenceTexture));if(r.iridescenceIor!==void 0)t.iridescenceIOR=r.iridescenceIor;if(t.iridescenceThicknessRange===void 0)t.iridescenceThicknessRange=[100,400];if(r.iridescenceThicknessMinimum!==void 0)t.iridescenceThicknessRange[0]=r.iridescenceThicknessMinimum;if(r.iridescenceThicknessMaximum!==void 0)t.iridescenceThicknessRange[1]=r.iridescenceThicknessMaximum;if(r.iridescenceThicknessTexture!==void 0)s.push(n.assignTexture(t,"iridescenceThicknessMap",r.iridescenceThicknessTexture));return Promise.all(s)}}class kc{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return null;return Zt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[];t.sheenColor=new Ee(0,0,0),t.sheenRoughness=0,t.sheen=1;let r=i.extensions[this.name];if(r.sheenColorFactor!==void 0){let o=r.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],mn)}if(r.sheenRoughnessFactor!==void 0)t.sheenRoughness=r.sheenRoughnessFactor;if(r.sheenColorTexture!==void 0)s.push(n.assignTexture(t,"sheenColorMap",r.sheenColorTexture,Ut));if(r.sheenRoughnessTexture!==void 0)s.push(n.assignTexture(t,"sheenRoughnessMap",r.sheenRoughnessTexture));return Promise.all(s)}}class Gc{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return null;return Zt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];if(r.transmissionFactor!==void 0)t.transmission=r.transmissionFactor;if(r.transmissionTexture!==void 0)s.push(n.assignTexture(t,"transmissionMap",r.transmissionTexture));return Promise.all(s)}}class Vc{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return null;return Zt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];if(t.thickness=r.thicknessFactor!==void 0?r.thicknessFactor:0,r.thicknessTexture!==void 0)s.push(n.assignTexture(t,"thicknessMap",r.thicknessTexture));t.attenuationDistance=r.attenuationDistance||1/0;let o=r.attenuationColor||[1,1,1];return t.attenuationColor=new Ee().setRGB(o[0],o[1],o[2],mn),Promise.all(s)}}class Wc{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return null;return Zt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class Xc{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return null;return Zt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];if(t.specularIntensity=r.specularFactor!==void 0?r.specularFactor:1,r.specularTexture!==void 0)s.push(n.assignTexture(t,"specularIntensityMap",r.specularTexture));let o=r.specularColorFactor||[1,1,1];if(t.specularColor=new Ee().setRGB(o[0],o[1],o[2],mn),r.specularColorTexture!==void 0)s.push(n.assignTexture(t,"specularColorMap",r.specularColorTexture,Ut));return Promise.all(s)}}class qc{constructor(e){this.parser=e,this.name=Ge.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return null;return Zt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];if(t.bumpScale=r.bumpFactor!==void 0?r.bumpFactor:1,r.bumpTexture!==void 0)s.push(n.assignTexture(t,"bumpMap",r.bumpTexture));return Promise.all(s)}}class Yc{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return null;return Zt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];if(r.anisotropyStrength!==void 0)t.anisotropy=r.anisotropyStrength;if(r.anisotropyRotation!==void 0)t.anisotropyRotation=r.anisotropyRotation;if(r.anisotropyTexture!==void 0)s.push(n.assignTexture(t,"anisotropyMap",r.anisotropyTexture));return Promise.all(s)}}class Zc{constructor(e){this.parser=e,this.name=Ge.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let s=i.extensions[this.name],r=t.options.ktx2Loader;if(!r)if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");else return null;return t.loadTextureImage(e,s.source,r)}}class Kc{constructor(e){this.parser=e,this.name=Ge.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let r=s.extensions[t],o=i.images[r.source],a=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);if(l!==null)a=l}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,r.source,a);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){if(!this.isSupported)this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}});return this.isSupported}}class $c{constructor(e){this.parser=e,this.name=Ge.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let r=s.extensions[t],o=i.images[r.source],a=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);if(l!==null)a=l}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,r.source,a);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){if(!this.isSupported)this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}});return this.isSupported}}class Jc{constructor(e){this.name=Ge.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported)if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");else return null;return s.then(function(o){let a=i.byteOffset||0,l=i.byteLength||0,c=i.count,h=i.byteStride,u=new Uint8Array(o,a,l);if(r.decodeGltfBufferAsync)return r.decodeGltfBufferAsync(c,h,u,i.mode,i.filter).then(function(d){return d.buffer});else return r.ready.then(function(){let d=new ArrayBuffer(c*h);return r.decodeGltfBuffer(new Uint8Array(d),c,h,u,i.mode,i.filter),d})})}else return null}}class jc{constructor(e){this.name=Ge.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==Kt.TRIANGLES&&l.mode!==Kt.TRIANGLE_STRIP&&l.mode!==Kt.TRIANGLE_FAN&&l.mode!==void 0)return null;let r=n.extensions[this.name].attributes,o=[],a={};for(let l in r)o.push(this.parser.getDependency("accessor",r[l]).then((c)=>(a[l]=c,a[l])));if(o.length<1)return null;return o.push(this.parser.createNodeMesh(e)),Promise.all(o).then((l)=>{let c=l.pop(),h=c.isGroup?c.children:[c],u=l[0].count,d=[];for(let f of h){let g=new Re,_=new w,p=new qt,m=new w(1,1,1),v=new fs(f.geometry,f.material,u);for(let x=0;x<u;x++){if(a.TRANSLATION)_.fromBufferAttribute(a.TRANSLATION,x);if(a.ROTATION)p.fromBufferAttribute(a.ROTATION,x);if(a.SCALE)m.fromBufferAttribute(a.SCALE,x);v.setMatrixAt(x,g.compose(_,p,m))}for(let x in a)if(x==="_COLOR_0"){let T=a[x];v.instanceColor=new Ni(T.array,T.itemSize,T.normalized)}else if(x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE")f.geometry.setAttribute(x,a[x]);ot.prototype.copy.call(v,f),this.parser.assignFinalMaterial(v),d.push(v)}if(c.isGroup)return c.clear(),c.add(...d),c;return d[0]})}}var Qc="glTF",ys=12,Pc={JSON:1313821514,BIN:5130562};class eh{constructor(e){this.name=Ge.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ys),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Qc)throw Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");else if(this.header.version<2)throw Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-ys,s=new DataView(e,ys),r=0;while(r<i){let o=s.getUint32(r,!0);r+=4;let a=s.getUint32(r,!0);if(r+=4,a===Pc.JSON){let l=new Uint8Array(e,ys+r,o);this.content=n.decode(l)}else if(a===Pc.BIN){let l=ys+r;this.body=e.slice(l,l+o)}r+=o}if(this.content===null)throw Error("THREE.GLTFLoader: JSON content not found.")}}class th{constructor(e,t){if(!t)throw Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ge.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,o={},a={},l={};for(let c in r){let h=Wo[c]||c.toLowerCase();o[h]=r[c]}for(let c in e.attributes){let h=Wo[c]||c.toLowerCase();if(r[c]!==void 0){let u=n.accessors[e.attributes[c]],d=Hi[u.componentType];l[h]=d.name,a[h]=u.normalized===!0}}return t.getDependency("bufferView",s).then(function(c){return new Promise(function(h,u){i.decodeDracoFile(c,function(d){for(let f in d.attributes){let g=d.attributes[f],_=a[f];if(_!==void 0)g.normalized=_}h(d)},o,l,mn,u)})})}}class nh{constructor(){this.name=Ge.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0)e.channel=t.texCoord;if(t.offset!==void 0)e.offset.fromArray(t.offset);if(t.rotation!==void 0)e.rotation=t.rotation;if(t.scale!==void 0)e.repeat.fromArray(t.scale);return e.needsUpdate=!0,e}}class ih{constructor(){this.name=Ge.KHR_MESH_QUANTIZATION}}class Yo extends ci{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let r=0;r!==i;r++)t[r]=n[s+r];return t}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=o*2,l=o*3,c=i-t,h=(n-t)/c,u=h*h,d=u*h,f=e*l,g=f-l,_=-2*d+3*u,p=d-u,m=1-_,v=p-u+h;for(let x=0;x!==o;x++){let T=r[g+x+o],I=r[g+x+a]*c,b=r[f+x+o],A=r[f+x]*c;s[x]=m*T+v*I+_*b+p*A}return s}}var Ag=new qt;class sh extends Yo{interpolate_(e,t,n,i){let s=super.interpolate_(e,t,n,i);return Ag.fromArray(s).normalize().toArray(s),s}}var Kt={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Hi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Lc={9728:ro,9729:Ui,9984:Bl,9985:Hl,9986:zl,9987:oo},Nc={33071:Fl,33648:Ol,10497:Di},ko={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Wo={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},$n={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Rg={CUBICSPLINE:void 0,LINEAR:ao,STEP:kl},Go={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Cg(e){if(e.DefaultMaterial===void 0)e.DefaultMaterial=new ms({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Dl});return e.DefaultMaterial}function fi(e,t,n){for(let i in n.extensions)if(e[i]===void 0)t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[i]=n.extensions[i]}function In(e,t){if(t.extras!==void 0)if(typeof t.extras==="object")Object.assign(e.userData,t.extras);else console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras)}function Ig(e,t,n){let i=!1,s=!1,r=!1;for(let c=0,h=t.length;c<h;c++){let u=t[c];if(u.POSITION!==void 0)i=!0;if(u.NORMAL!==void 0)s=!0;if(u.COLOR_0!==void 0)r=!0;if(i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(e);let o=[],a=[],l=[];for(let c=0,h=t.length;c<h;c++){let u=t[c];if(i){let d=u.POSITION!==void 0?n.getDependency("accessor",u.POSITION):e.attributes.position;o.push(d)}if(s){let d=u.NORMAL!==void 0?n.getDependency("accessor",u.NORMAL):e.attributes.normal;a.push(d)}if(r){let d=u.COLOR_0!==void 0?n.getDependency("accessor",u.COLOR_0):e.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];if(i)e.morphAttributes.position=h;if(s)e.morphAttributes.normal=u;if(r)e.morphAttributes.color=d;return e.morphTargetsRelative=!0,e})}function Pg(e,t){if(e.updateMorphTargets(),t.weights!==void 0)for(let n=0,i=t.weights.length;n<i;n++)e.morphTargetInfluences[n]=t.weights[n];if(t.extras&&Array.isArray(t.extras.targetNames)){let n=t.extras.targetNames;if(e.morphTargetInfluences.length===n.length){e.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++)e.morphTargetDictionary[n[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Lg(e){let t,n=e.extensions&&e.extensions[Ge.KHR_DRACO_MESH_COMPRESSION];if(n)t="draco:"+n.bufferView+":"+n.indices+":"+Vo(n.attributes);else t=e.indices+":"+Vo(e.attributes)+":"+e.mode;if(e.targets!==void 0)for(let i=0,s=e.targets.length;i<s;i++)t+=":"+Vo(e.targets[i]);return t}function Vo(e){let t="",n=Object.keys(e).sort();for(let i=0,s=n.length;i<s;i++)t+=n[i]+":"+e[n[i]]+";";return t}function Xo(e){switch(e){case Int8Array:return 0.007874015748031496;case Uint8Array:return 0.00392156862745098;case Int16Array:return 0.00003051850947599719;case Uint16Array:return 0.000015259021896696422;default:throw Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Ng(e){if(e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0)return"image/jpeg";if(e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0)return"image/webp";if(e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0)return"image/ktx2";return"image/png"}var Dg=new Re;class rh{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new wg,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,r=-1;if(typeof navigator<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let a=o.match(/Version\/(\d+)/);i=n&&a?parseInt(a[1],10):-1,s=o.indexOf("Firefox")>-1,r=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}if(typeof createImageBitmap>"u"||n&&i<17||s&&r<98)this.textureLoader=new Lo(this.options.manager);else this.textureLoader=new Fo(this.options.manager);if(this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new dr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials")this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(r){let o={scene:r[0][i.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:i.asset,parser:n,userData:{}};return fi(s,o,i),In(o,i),Promise.all(n._invokeAll(function(a){return a.afterRoot&&a.afterRoot(o)})).then(function(){for(let a of o.scenes)a.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){let r=t[i].joints;for(let o=0,a=r.length;o<a;o++)e[r[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){let r=e[i];if(r.mesh!==void 0){if(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0)n[r.mesh].isSkinnedMesh=!0}if(r.camera!==void 0)this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){if(t===void 0)return;if(e.refs[t]===void 0)e.refs[t]=e.uses[t]=0;e.refs[t]++}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),s=(r,o)=>{let a=this.associations.get(r);if(a!=null)this.associations.set(o,a);for(let[l,c]of r.children.entries())s(c,o.children[l])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let s=e(t[i]);if(s)n.push(s)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ge.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(s,r){n.load(di.resolveURL(t.uri,i.path),s,void 0,function(){r(Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let r=ko[i.type],o=Hi[i.componentType],a=i.normalized===!0,l=new o(i.count*r);return Promise.resolve(new bt(l,r,a))}let s=[];if(i.bufferView!==void 0)s.push(this.getDependency("bufferView",i.bufferView));else s.push(null);if(i.sparse!==void 0)s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView));return Promise.all(s).then(function(r){let o=r[0],a=ko[i.type],l=Hi[i.componentType],c=l.BYTES_PER_ELEMENT,h=c*a,u=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,f=i.normalized===!0,g,_;if(d&&d!==h){let p=Math.floor(u/d),m="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,v=t.cache.get(m);if(!v)g=new l(o,p*d,i.count*d/c),v=new or(g,d/c),t.cache.add(m,v);_=new ds(v,a,u%d/c,f)}else{if(o===null)g=new l(i.count*a);else g=new l(o,u,i.count*a);_=new bt(g,a,f)}if(i.sparse!==void 0){let p=ko.SCALAR,m=Hi[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,x=i.sparse.values.byteOffset||0,T=new m(r[1],v,i.sparse.count*p),I=new l(r[2],x,i.sparse.count*a);if(o!==null)_=new bt(_.array.slice(),_.itemSize,_.normalized);_.normalized=!1;for(let b=0,A=T.length;b<A;b++){let F=T[b];if(_.setX(F,I[b*a]),a>=2)_.setY(F,I[b*a+1]);if(a>=3)_.setZ(F,I[b*a+2]);if(a>=4)_.setW(F,I[b*a+3]);if(a>=5)throw Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}_.normalized=f}return _})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,r=t.images[s],o=this.textureLoader;if(r.uri){let a=n.manager.getHandler(r.uri);if(a!==null)o=a}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){let i=this,s=this.json,r=s.textures[e],o=s.images[t],a=(o.uri||o.bufferView)+":"+r.sampler;if(this.textureCache[a])return this.textureCache[a];let l=this.loadImageSource(t,n).then(function(c){if(c.flipY=!1,c.name=r.name||o.name||"",c.name===""&&typeof o.uri==="string"&&o.uri.startsWith("data:image/")===!1)c.name=o.uri;let u=(s.samplers||{})[r.sampler]||{};return c.magFilter=Lc[u.magFilter]||Ui,c.minFilter=Lc[u.minFilter]||oo,c.wrapS=Nc[u.wrapS]||Di,c.wrapT=Nc[u.wrapT]||Di,c.generateMipmaps=!c.isCompressedTexture&&c.minFilter!==ro&&c.minFilter!==Ui,i.associations.set(c,{textures:e}),c}).catch(function(){return null});return this.textureCache[a]=l,l}loadImageSource(e,t){let n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then((h)=>h.clone());let r=i.images[e],o=self.URL||self.webkitURL,a=r.uri||"",l=!1;if(r.bufferView!==void 0)a=n.getDependency("bufferView",r.bufferView).then(function(h){l=!0;let u=new Blob([h],{type:r.mimeType});return a=o.createObjectURL(u),a});else if(r.uri===void 0)throw Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let c=Promise.resolve(a).then(function(h){return new Promise(function(u,d){let f=u;if(t.isImageBitmapLoader===!0)f=function(g){let _=new xt(g);_.needsUpdate=!0,u(_)};t.load(di.resolveURL(h,s.path),f,void 0,d)})}).then(function(h){if(l===!0)o.revokeObjectURL(a);return In(h,r),h.userData.mimeType=r.mimeType||Ng(r.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",a),h});return this.sourceCache[e]=c,c}assignTexture(e,t,n,i){let s=this;return this.getDependency("texture",n.index).then(function(r){if(!r)return null;if(n.texCoord!==void 0&&n.texCoord>0)r=r.clone(),r.channel=n.texCoord;if(s.extensions[Ge.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[Ge.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let a=s.associations.get(r);r=s.extensions[Ge.KHR_TEXTURE_TRANSFORM].extendTexture(r,o),s.associations.set(r,a)}}if(i!==void 0)r.colorSpace=i;return e[t]=r,r})}assignFinalMaterial(e){let{geometry:t,material:n}=e,i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,a=this.cache.get(o);if(!a)a=new cr,Gt.prototype.copy.call(a,n),a.color.copy(n.color),a.map=n.map,a.sizeAttenuation=!1,this.cache.add(o,a);n=a}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,a=this.cache.get(o);if(!a)a=new gn,Gt.prototype.copy.call(a,n),a.color.copy(n.color),a.map=n.map,this.cache.add(o,a);n=a}if(i||s||r){let o="ClonedMaterial:"+n.uuid+":";if(i)o+="derivative-tangents:";if(s)o+="vertex-colors:";if(r)o+="flat-shading:";let a=this.cache.get(o);if(!a){if(a=n.clone(),s)a.vertexColors=!0;if(r)a.flatShading=!0;if(i){if(a.normalScale)a.normalScale.y*=-1;if(a.clearcoatNormalScale)a.clearcoatNormalScale.y*=-1}this.cache.add(o,a),this.associations.set(a,this.associations.get(n))}n=a}e.material=n}getMaterialType(){return ms}loadMaterial(e){let t=this,n=this.json,i=this.extensions,s=n.materials[e],r,o={},a=s.extensions||{},l=[];if(a[Ge.KHR_MATERIALS_UNLIT]){let h=i[Ge.KHR_MATERIALS_UNLIT];r=h.getMaterialType(),l.push(h.extendParams(o,s,t))}else{let h=s.pbrMetallicRoughness||{};if(o.color=new Ee(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){let u=h.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],mn),o.opacity=u[3]}if(h.baseColorTexture!==void 0)l.push(t.assignTexture(o,"map",h.baseColorTexture,Ut));if(o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0)l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture));r=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}if(s.doubleSided===!0)o.side=er;let c=s.alphaMode||Go.OPAQUE;if(c===Go.BLEND)o.transparent=!0,o.depthWrite=!1;else if(o.transparent=!1,c===Go.MASK)o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:0.5;if(s.normalTexture!==void 0&&r!==at){if(l.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new ue(1,1),s.normalTexture.scale!==void 0){let h=s.normalTexture.scale;o.normalScale.set(h,h)}}if(s.occlusionTexture!==void 0&&r!==at){if(l.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0)o.aoMapIntensity=s.occlusionTexture.strength}if(s.emissiveFactor!==void 0&&r!==at){let h=s.emissiveFactor;o.emissive=new Ee().setRGB(h[0],h[1],h[2],mn)}if(s.emissiveTexture!==void 0&&r!==at)l.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,Ut));return Promise.all(l).then(function(){let h=new r(o);if(s.name)h.name=s.name;if(In(h,s),t.associations.set(h,{materials:e}),s.extensions)fi(i,h,s);return h})}createUniqueName(e){let t=Qe.sanitizeNodeName(e||"");if(t in this.nodeNamesUsed)return t+"_"+ ++this.nodeNamesUsed[t];else return this.nodeNamesUsed[t]=0,t}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[Ge.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(a){return Dc(a,o,t)})}let r=[];for(let o=0,a=e.length;o<a;o++){let l=e[o],c=Lg(l),h=i[c];if(h)r.push(h.promise);else{let u;if(l.extensions&&l.extensions[Ge.KHR_DRACO_MESH_COMPRESSION])u=s(l);else u=Dc(new ut,l,t);i[c]={primitive:l,promise:u},r.push(u)}}return Promise.all(r)}loadMesh(e){let t=this,n=this.json,i=this.extensions,s=n.meshes[e],r=s.primitives,o=[];for(let a=0,l=r.length;a<l;a++){let c=r[a].material===void 0?Cg(this.cache):this.getDependency("material",r[a].material);o.push(c)}return o.push(t.loadGeometries(r)),Promise.all(o).then(function(a){let l=a.slice(0,a.length-1),c=a[a.length-1],h=[];for(let d=0,f=c.length;d<f;d++){let g=c[d],_=r[d],p,m=l[d];if(_.mode===Kt.TRIANGLES||_.mode===Kt.TRIANGLE_STRIP||_.mode===Kt.TRIANGLE_FAN||_.mode===void 0){if(p=s.isSkinnedMesh===!0?new vo(g,m):new Me(g,m),p.isSkinnedMesh===!0)p.normalizeSkinWeights();if(_.mode===Kt.TRIANGLE_STRIP)p.geometry=Ho(p.geometry,tr);else if(_.mode===Kt.TRIANGLE_FAN)p.geometry=Ho(p.geometry,hs)}else if(_.mode===Kt.LINES)p=new ps(g,m);else if(_.mode===Kt.LINE_STRIP)p=new _n(g,m);else if(_.mode===Kt.LINE_LOOP)p=new So(g,m);else if(_.mode===Kt.POINTS)p=new Eo(g,m);else throw Error("THREE.GLTFLoader: Primitive mode unsupported: "+_.mode);if(Object.keys(p.geometry.morphAttributes).length>0)Pg(p,s);if(p.name=t.createUniqueName(s.name||"mesh_"+e),In(p,s),_.extensions)fi(i,p,_);t.assignFinalMaterial(p),h.push(p)}for(let d=0,f=h.length;d<f;d++)t.associations.set(h[d],{meshes:e,primitives:d});if(h.length===1){if(s.extensions)fi(i,h[0],s);return h[0]}let u=new vt;if(s.extensions)fi(i,u,s);t.associations.set(u,{meshes:e});for(let d=0,f=h.length;d<f;d++)u.add(h[d]);return u})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}if(n.type==="perspective")t=new Tt(ai.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2000000);else if(n.type==="orthographic")t=new us(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar);if(n.name)t.name=this.createUniqueName(n.name);return In(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));if(t.inverseBindMatrices!==void 0)n.push(this.getDependency("accessor",t.inverseBindMatrices));else n.push(null);return Promise.all(n).then(function(i){let s=i.pop(),r=i,o=[],a=[];for(let l=0,c=r.length;l<c;l++){let h=r[l];if(h){o.push(h);let u=new Re;if(s!==null)u.fromArray(s.array,l*16);a.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new lr(o,a)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,r=[],o=[],a=[],l=[],c=[];for(let h=0,u=i.channels.length;h<u;h++){let d=i.channels[h],f=i.samplers[d.sampler],g=d.target,_=g.node,p=i.parameters!==void 0?i.parameters[f.input]:f.input,m=i.parameters!==void 0?i.parameters[f.output]:f.output;if(g.node===void 0)continue;r.push(this.getDependency("node",_)),o.push(this.getDependency("accessor",p)),a.push(this.getDependency("accessor",m)),l.push(f),c.push(g)}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c)]).then(function(h){let u=h[0],d=h[1],f=h[2],g=h[3],_=h[4],p=[];for(let m=0,v=u.length;m<v;m++){let x=u[m],T=d[m],I=f[m],b=g[m],A=_[m];if(x===void 0)continue;if(x.updateMatrix)x.updateMatrix();let F=n._createAnimationTracks(x,T,I,b,A);if(F)for(let S=0;S<F.length;S++)p.push(F[S])}return new Po(s,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];if(i.mesh===void 0)return null;return n.getDependency("mesh",i.mesh).then(function(s){let r=n._getNodeRef(n.meshCache,i.mesh,s);if(i.weights!==void 0)r.traverse(function(o){if(!o.isMesh)return;for(let a=0,l=i.weights.length;a<l;a++)o.morphTargetInfluences[a]=i.weights[a]});return r})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),r=[],o=i.children||[];for(let l=0,c=o.length;l<c;l++)r.push(n.getDependency("node",o[l]));let a=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(r),a]).then(function(l){let c=l[0],h=l[1],u=l[2];if(u!==null)c.traverse(function(d){if(!d.isSkinnedMesh)return;d.bind(u,Dg)});for(let d=0,f=h.length;d<f;d++)c.add(h[d]);return c})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],r=s.name?i.createUniqueName(s.name):"",o=[],a=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});if(a)o.push(a);if(s.camera!==void 0)o.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)}));return i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let c;if(s.isBone===!0)c=new ar;else if(l.length>1)c=new vt;else if(l.length===1)c=l[0];else c=new ot;if(c!==l[0])for(let h=0,u=l.length;h<u;h++)c.add(l[h]);if(s.name)c.userData.name=s.name,c.name=r;if(In(c,s),s.extensions)fi(n,c,s);if(s.matrix!==void 0){let h=new Re;h.fromArray(s.matrix),c.applyMatrix4(h)}else{if(s.translation!==void 0)c.position.fromArray(s.translation);if(s.rotation!==void 0)c.quaternion.fromArray(s.rotation);if(s.scale!==void 0)c.scale.fromArray(s.scale)}if(!i.associations.has(c))i.associations.set(c,{});return i.associations.get(c).nodes=e,c}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,s=new vt;if(n.name)s.name=i.createUniqueName(n.name);if(In(s,n),n.extensions)fi(t,s,n);let r=n.nodes||[],o=[];for(let a=0,l=r.length;a<l;a++)o.push(i.getDependency("node",r[a]));return Promise.all(o).then(function(a){for(let c=0,h=a.length;c<h;c++)s.add(a[c]);let l=(c)=>{let h=new Map;for(let[u,d]of i.associations)if(u instanceof Gt||u instanceof xt)h.set(u,d);return c.traverse((u)=>{let d=i.associations.get(u);if(d!=null)h.set(u,d)}),h};return i.associations=l(s),s})}_createAnimationTracks(e,t,n,i,s){let r=[],o=e.name?e.name:e.uuid,a=[];if($n[s.path]===$n.weights)e.traverse(function(u){if(u.morphTargetInfluences)a.push(u.name?u.name:u.uuid)});else a.push(o);let l;switch($n[s.path]){case $n.weights:l=Xn;break;case $n.rotation:l=Zn;break;case $n.position:case $n.scale:l=qn;break;default:switch(n.itemSize){case 1:l=Xn;break;case 2:case 3:default:l=qn;break}break}let c=i.interpolation!==void 0?Rg[i.interpolation]:ao,h=this._getArrayFromAccessor(n);for(let u=0,d=a.length;u<d;u++){let f=new l(a[u]+"."+$n[s.path],t.array,h,c);if(i.interpolation==="CUBICSPLINE")this._createCubicSplineTrackInterpolant(f);r.push(f)}return r}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Xo(t.constructor),i=new Float32Array(t.length);for(let s=0,r=t.length;s<r;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){return new(this instanceof Zn?sh:Yo)(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Ug(e,t,n){let i=t.attributes,s=new on;if(i.POSITION!==void 0){let a=n.json.accessors[i.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(s.set(new w(l[0],l[1],l[2]),new w(c[0],c[1],c[2])),a.normalized){let h=Xo(Hi[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=t.targets;if(r!==void 0){let a=new w,l=new w;for(let c=0,h=r.length;c<h;c++){let u=r[c];if(u.POSITION!==void 0){let d=n.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let _=Xo(Hi[d.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}e.boundingBox=s;let o=new Yt;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,e.boundingSphere=o}function Dc(e,t,n){let i=t.attributes,s=[];function r(o,a){return n.getDependency("accessor",o).then(function(l){e.setAttribute(a,l)})}for(let o in i){let a=Wo[o]||o.toLowerCase();if(a in e.attributes)continue;s.push(r(i[o],a))}if(t.indices!==void 0&&!e.index){let o=n.getDependency("accessor",t.indices).then(function(a){e.setIndex(a)});s.push(o)}if(We.workingColorSpace!==mn&&"COLOR_0"in i)console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${We.workingColorSpace}" not supported.`);return In(e,t),Ug(e,t,n),Promise.all(s).then(function(){return t.targets!==void 0?Ig(e,t.targets,n):e})}var ft={Handedness:Object.freeze({NONE:"none",LEFT:"left",RIGHT:"right"}),ComponentState:Object.freeze({DEFAULT:"default",TOUCHED:"touched",PRESSED:"pressed"}),ComponentProperty:Object.freeze({BUTTON:"button",X_AXIS:"xAxis",Y_AXIS:"yAxis",STATE:"state"}),ComponentType:Object.freeze({TRIGGER:"trigger",SQUEEZE:"squeeze",TOUCHPAD:"touchpad",THUMBSTICK:"thumbstick",BUTTON:"button"}),ButtonTouchThreshold:0.05,AxisTouchThreshold:0.1,VisualResponseProperty:Object.freeze({TRANSFORM:"transform",VISIBILITY:"visibility"})};async function oh(e){let t=await fetch(e);if(!t.ok)throw Error(t.statusText);else return t.json()}async function Fg(e){if(!e)throw Error("No basePath supplied");return await oh(`${e}/${"profilesList.json"}`)}async function ah(e,t,n=null,i=!0){if(!e)throw Error("No xrInputSource supplied");if(!t)throw Error("No basePath supplied");let s=await Fg(t),r;if(e.profiles.some((l)=>{let c=s[l];if(c)r={profileId:l,profilePath:`${t}/${c.path}`,deprecated:!!c.deprecated};return!!r}),!r){if(!n)throw Error("No matching profile name found");let l=s[n];if(!l)throw Error(`No matching profile name found and default profile "${n}" missing.`);r={profileId:n,profilePath:`${t}/${l.path}`,deprecated:!!l.deprecated}}let o=await oh(r.profilePath),a;if(i){let l;if(e.handedness==="any")l=o.layouts[Object.keys(o.layouts)[0]];else l=o.layouts[e.handedness];if(!l)throw Error(`No matching handedness, ${e.handedness}, in profile ${r.profileId}`);if(l.assetPath)a=r.profilePath.replace("profile.json",l.assetPath)}return{profile:o,assetPath:a}}var Og={xAxis:0,yAxis:0,button:0,state:ft.ComponentState.DEFAULT};function Bg(e=0,t=0){let n=e,i=t;if(Math.sqrt(e*e+t*t)>1){let o=Math.atan2(t,e);n=Math.cos(o),i=Math.sin(o)}return{normalizedXAxis:n*0.5+0.5,normalizedYAxis:i*0.5+0.5}}class lh{constructor(e){if(this.componentProperty=e.componentProperty,this.states=e.states,this.valueNodeName=e.valueNodeName,this.valueNodeProperty=e.valueNodeProperty,this.valueNodeProperty===ft.VisualResponseProperty.TRANSFORM)this.minNodeName=e.minNodeName,this.maxNodeName=e.maxNodeName;this.value=0,this.updateFromComponent(Og)}updateFromComponent({xAxis:e,yAxis:t,button:n,state:i}){let{normalizedXAxis:s,normalizedYAxis:r}=Bg(e,t);switch(this.componentProperty){case ft.ComponentProperty.X_AXIS:this.value=this.states.includes(i)?s:0.5;break;case ft.ComponentProperty.Y_AXIS:this.value=this.states.includes(i)?r:0.5;break;case ft.ComponentProperty.BUTTON:this.value=this.states.includes(i)?n:0;break;case ft.ComponentProperty.STATE:if(this.valueNodeProperty===ft.VisualResponseProperty.VISIBILITY)this.value=this.states.includes(i);else this.value=this.states.includes(i)?1:0;break;default:throw Error(`Unexpected visualResponse componentProperty ${this.componentProperty}`)}}}class ch{constructor(e,t){if(!e||!t||!t.visualResponses||!t.gamepadIndices||Object.keys(t.gamepadIndices).length===0)throw Error("Invalid arguments supplied");this.id=e,this.type=t.type,this.rootNodeName=t.rootNodeName,this.touchPointNodeName=t.touchPointNodeName,this.visualResponses={},Object.keys(t.visualResponses).forEach((n)=>{let i=new lh(t.visualResponses[n]);this.visualResponses[n]=i}),this.gamepadIndices=Object.assign({},t.gamepadIndices),this.values={state:ft.ComponentState.DEFAULT,button:this.gamepadIndices.button!==void 0?0:void 0,xAxis:this.gamepadIndices.xAxis!==void 0?0:void 0,yAxis:this.gamepadIndices.yAxis!==void 0?0:void 0}}get data(){return{id:this.id,...this.values}}updateFromGamepad(e){if(this.values.state=ft.ComponentState.DEFAULT,this.gamepadIndices.button!==void 0&&e.buttons.length>this.gamepadIndices.button){let t=e.buttons[this.gamepadIndices.button];if(this.values.button=t.value,this.values.button=this.values.button<0?0:this.values.button,this.values.button=this.values.button>1?1:this.values.button,t.pressed||this.values.button===1)this.values.state=ft.ComponentState.PRESSED;else if(t.touched||this.values.button>ft.ButtonTouchThreshold)this.values.state=ft.ComponentState.TOUCHED}if(this.gamepadIndices.xAxis!==void 0&&e.axes.length>this.gamepadIndices.xAxis){if(this.values.xAxis=e.axes[this.gamepadIndices.xAxis],this.values.xAxis=this.values.xAxis<-1?-1:this.values.xAxis,this.values.xAxis=this.values.xAxis>1?1:this.values.xAxis,this.values.state===ft.ComponentState.DEFAULT&&Math.abs(this.values.xAxis)>ft.AxisTouchThreshold)this.values.state=ft.ComponentState.TOUCHED}if(this.gamepadIndices.yAxis!==void 0&&e.axes.length>this.gamepadIndices.yAxis){if(this.values.yAxis=e.axes[this.gamepadIndices.yAxis],this.values.yAxis=this.values.yAxis<-1?-1:this.values.yAxis,this.values.yAxis=this.values.yAxis>1?1:this.values.yAxis,this.values.state===ft.ComponentState.DEFAULT&&Math.abs(this.values.yAxis)>ft.AxisTouchThreshold)this.values.state=ft.ComponentState.TOUCHED}Object.values(this.visualResponses).forEach((t)=>{t.updateFromComponent(this.values)})}}class Zo{constructor(e,t,n){if(!e)throw Error("No xrInputSource supplied");if(!t)throw Error("No profile supplied");this.xrInputSource=e,this.assetUrl=n,this.id=t.profileId,this.layoutDescription=t.layouts[e.handedness],this.components={},Object.keys(this.layoutDescription.components).forEach((i)=>{let s=this.layoutDescription.components[i];this.components[i]=new ch(i,s)}),this.updateFromGamepad()}get gripSpace(){return this.xrInputSource.gripSpace}get targetRaySpace(){return this.xrInputSource.targetRaySpace}get data(){let e=[];return Object.values(this.components).forEach((t)=>{e.push(t.data)}),e}updateFromGamepad(){Object.values(this.components).forEach((e)=>{e.updateFromGamepad(this.xrInputSource.gamepad)})}}var zg="https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles",Hg="generic-trigger";class uh extends ot{constructor(){super();this.motionController=null,this.envMap=null}setEnvironmentMap(e){if(this.envMap==e)return this;return this.envMap=e,this.traverse((t)=>{if(t.isMesh)t.material.envMap=this.envMap,t.material.needsUpdate=!0}),this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),!this.motionController)return;this.motionController.updateFromGamepad(),Object.values(this.motionController.components).forEach((t)=>{Object.values(t.visualResponses).forEach((n)=>{let{valueNode:i,minNode:s,maxNode:r,value:o,valueNodeProperty:a}=n;if(!i)return;if(a===ft.VisualResponseProperty.VISIBILITY)i.visible=o;else if(a===ft.VisualResponseProperty.TRANSFORM)i.quaternion.slerpQuaternions(s.quaternion,r.quaternion,o),i.position.lerpVectors(s.position,r.position,o)})})}}function kg(e,t){Object.values(e.components).forEach((n)=>{let{type:i,touchPointNodeName:s,visualResponses:r}=n;if(i===ft.ComponentType.TOUCHPAD)if(n.touchPointNode=t.getObjectByName(s),n.touchPointNode){let o=new ln(0.001),a=new at({color:255}),l=new Me(o,a);n.touchPointNode.add(l)}else console.warn(`Could not find touch dot, ${n.touchPointNodeName}, in touchpad component ${n.id}`);Object.values(r).forEach((o)=>{let{valueNodeName:a,minNodeName:l,maxNodeName:c,valueNodeProperty:h}=o;if(h===ft.VisualResponseProperty.TRANSFORM){if(o.minNode=t.getObjectByName(l),o.maxNode=t.getObjectByName(c),!o.minNode){console.warn(`Could not find ${l} in the model`);return}if(!o.maxNode){console.warn(`Could not find ${c} in the model`);return}}if(o.valueNode=t.getObjectByName(a),!o.valueNode)console.warn(`Could not find ${a} in the model`)})})}function hh(e,t){if(kg(e.motionController,t),e.envMap)t.traverse((n)=>{if(n.isMesh)n.material.envMap=e.envMap,n.material.needsUpdate=!0});e.add(t)}class Ko{constructor(e=null,t=null){if(this.gltfLoader=e,this.path=zg,this._assetCache={},this.onLoad=t,!this.gltfLoader)this.gltfLoader=new qo}setPath(e){return this.path=e,this}createControllerModel(e){let t=new uh,n=null;return e.addEventListener("connected",(i)=>{let s=i.data;if(s.targetRayMode!=="tracked-pointer"||!s.gamepad||s.hand)return;ah(s,this.path,Hg).then(({profile:r,assetPath:o})=>{t.motionController=new Zo(s,r,o);let a=this._assetCache[t.motionController.assetUrl];if(a){if(n=a.scene.clone(),hh(t,n),this.onLoad)this.onLoad(n)}else{if(!this.gltfLoader)throw Error("GLTFLoader not set.");this.gltfLoader.setPath(""),this.gltfLoader.load(t.motionController.assetUrl,(l)=>{if(this._assetCache[t.motionController.assetUrl]=l,n=l.scene.clone(),hh(t,n),this.onLoad)this.onLoad(n)},null,()=>{throw Error(`Asset ${t.motionController.assetUrl} missing or malformed.`)})}}).catch((r)=>{console.warn(r)})}),e.addEventListener("disconnected",()=>{t.motionController=null,t.remove(n),n=null}),t}}var ze={L:105,W:68,HL:52.5,HW:34},et={x:ze.HL,halfWidth:3.66,height:2.44},fh={shirt:16742938,shorts:1382170,socks:16742938,number:"#15171a"},ph={shirt:2047884,shorts:15921384,socks:2047884,number:"#f2f0e8"},mh={shirt:2871678,shorts:1382170,socks:2871678,number:"#15171a"},gh={shirt:15262266,shorts:1382170,socks:15262266,number:"#15171a"},ki=[["GK",-47,0,1],["LB",-26,-22,3],["LCB",-31,-8,5],["RCB",-31,8,4],["RB",-26,22,2],["CDM",-19,0,6],["LCM",-10,-11,8],["RCM",-10,11,10],["LW",4,-24,11],["ST",8,0,9],["RW",4,24,7]],Gg=[["GK",-47,0,1],["LB",-26,-22,3],["LCB",-31,-8,5],["RCB",-31,8,4],["RB",-26,22,2],["LDM",-18,-7,6],["RDM",-18,7,8],["CAM",-3,0,10],["LW",3,-23,11],["ST",9,0,9],["RW",3,23,7]],Pn=[["GK",49,0,1],["RB",24,-20,2],["RCB",26,-7,5],["LCB",26,7,4],["LB",24,20,3],["RM",10,-21,7],["RCM",12,-7,8],["LCM",12,7,6],["LM",10,21,11],["ST2",-4,-6,9],["ST1",-2,6,10]],hn={CB:{name:"CENTRE BACK",formation:ki,slots:["LCB","RCB"],ballX:-30,group:"def"},FB:{name:"FULL BACK",formation:ki,slots:["LB","RB"],ballX:-22,group:"def"},CDM:{name:"HOLDING MID",formation:ki,slots:["CDM"],ballX:-18,group:"def"},CM:{name:"CENTRAL MID",formation:ki,slots:["LCM","RCM"],ballX:-9,group:"mid"},CAM:{name:"NUMBER 10",formation:Gg,slots:["CAM"],ballX:2,group:"att"},W:{name:"WINGER",formation:ki,slots:["LW","RW"],ballX:10,group:"att"},ST:{name:"STRIKER",formation:ki,slots:["ST"],ballX:14,group:"att"}},_h=Object.keys(hn),$o={EASY:{passes:[3,3],presserSpeed:5.4,presserDist:[11,13],window:3.6,scanTarget:2,pressers:1,jitter:1},MEDIUM:{passes:[2,3],presserSpeed:6.2,presserDist:[9,11],window:2.9,scanTarget:3,pressers:1,jitter:1.6},HARD:{passes:[2,2],presserSpeed:6.9,presserDist:[7,9],window:2.3,scanTarget:3,pressers:2,jitter:2.2},ELITE:{passes:[1,2],presserSpeed:7.5,presserDist:[5.5,7],window:1.8,scanTarget:4,pressers:2,jitter:2.8}},Jo=Object.keys($o),jo=["ACADEMY","RESERVES","FIRST TEAM","INTERNATIONAL"],dh=["CM","CB","W","CDM","FB","ST","CAM","CM","W","CB","ST","CAM"],Gi=Array.from({length:24},(e,t)=>({index:t,stage:Math.floor(t/6),role:dh[t%dh.length],difficulty:Jo[Math.floor(t/6)],reps:6,quizChance:t%6===4?0.8:0.3})),xh=[55,70,85],le={font:'"Barlow Condensed", "Arial Narrow", sans-serif',body:'"Barlow", "Helvetica Neue", sans-serif',bg:"rgba(14,17,16,0.94)",card:"#1b2120",cardHi:"#27302e",line:"rgba(242,240,232,0.12)",text:"#f2f0e8",dim:"rgba(242,240,232,0.55)",accent:"#ff7a1a",good:"#4fd88a",bad:"#ff5a4f"};var un=6;function Vg(){let t=(ze.L+un*2)*18,n=(ze.W+un*2)*18,i=document.createElement("canvas");i.width=t,i.height=n;let s=i.getContext("2d");s.fillStyle="#245a22",s.fillRect(0,0,t,n);let r=18,o=ze.L*18/r;for(let d=0;d<r;d++)s.fillStyle=d%2?"#2b6a28":"#276124",s.fillRect(un*18+d*o,0,o,n);let a=s.getImageData(0,0,t,n);for(let d=0;d<a.data.length;d+=4){let f=(Math.random()-0.5)*10;a.data[d]+=f,a.data[d+1]+=f,a.data[d+2]+=f*0.6}s.putImageData(a,0,0);let l=(d)=>(d+ze.HL+un)*18,c=(d)=>(d+ze.HW+un)*18,h=(d)=>d*18;s.strokeStyle="rgba(245,245,238,0.92)",s.lineWidth=h(0.12),s.strokeRect(l(-ze.HL),c(-ze.HW),h(ze.L),h(ze.W)),s.beginPath(),s.moveTo(l(0),c(-ze.HW)),s.lineTo(l(0),c(ze.HW)),s.stroke(),s.beginPath(),s.arc(l(0),c(0),h(9.15),0,Math.PI*2),s.stroke(),s.fillStyle="rgba(245,245,238,0.92)";for(let d of[-1,1]){let f=d*ze.HL;s.strokeRect(Math.min(l(f),l(f-d*16.5)),c(-20.16),h(16.5),h(40.32)),s.strokeRect(Math.min(l(f),l(f-d*5.5)),c(-9.16),h(5.5),h(18.32)),s.beginPath(),s.arc(l(f-d*11),c(0),h(0.2),0,Math.PI*2),s.fill(),s.beginPath();let g=Math.acos(0.6010928961748634);if(d>0)s.arc(l(f-11),c(0),h(9.15),Math.PI-g,Math.PI+g);else s.arc(l(f+11),c(0),h(9.15),-g,g);s.stroke()}s.beginPath(),s.arc(l(0),c(0),h(0.2),0,Math.PI*2),s.fill();let u=new Cn(i);return u.colorSpace=Ut,u.anisotropy=8,u}function yh(e,t){let n=new Vt({color:16053487}),i=0.06,s=t*et.x,r=new Yn(0.06,0.06,et.height,10);for(let u of[-et.halfWidth,et.halfWidth]){let d=new Me(r,n);d.position.set(s,et.height/2,u),e.add(d)}let o=new Me(new Yn(0.06,0.06,et.halfWidth*2,10),n);o.rotation.x=Math.PI/2,o.position.set(s,et.height,0),e.add(o);let a=2,l=[],c=s+t*a;for(let u=-et.halfWidth;u<=et.halfWidth+0.01;u+=0.35)l.push(s,et.height,u,c,et.height*0.6,u,c,et.height*0.6,u,c,0,u);for(let u=0;u<=et.height+0.01;u+=0.35){let d=c,f=Math.min(u,et.height*0.6);l.push(d,f,-et.halfWidth,d,f,et.halfWidth),l.push(s,u,-et.halfWidth,d,f,-et.halfWidth,s,u,et.halfWidth,d,f,et.halfWidth)}let h=new ut;h.setAttribute("position",new rt(l,3)),e.add(new ps(h,new gn({color:14606296,transparent:!0,opacity:0.45})))}function Wg(e){let t=new Vt({color:2764081}),n=new Vt({color:1382170}),i=new Ft(0.45,0.6,0.35),s=new Vt,r=[],o=[{cx:0,cz:-(ze.HW+un+2),len:ze.L+20,rot:0},{cx:0,cz:ze.HW+un+2,len:ze.L+20,rot:Math.PI},{cx:-(ze.HL+un+2),cz:0,len:ze.W+8,rot:Math.PI/2},{cx:ze.HL+un+2,cz:0,len:ze.W+8,rot:-Math.PI/2}],a=22,l=0.85,c=0.48;for(let g of o){let _=new vt;_.position.set(g.cx,0,g.cz),_.rotation.y=g.rot;let p=18.7,m=10.559999999999999,v=new Me(new Ft(g.len,0.4,Math.hypot(p,m)),t);v.rotation.x=Math.atan2(m,p),v.position.set(0,1.2+m/2,-p/2),_.add(v);let x=new Me(new Ft(g.len,1.1,0.3),new Vt({color:1053204}));x.position.set(0,0.55,0.2),_.add(x);let T=new Me(new Ft(g.len,0.5,p+6),n);T.position.set(0,m+7,-p/2+1),T.rotation.x=-0.08,_.add(T);let I=new Me(new Ft(g.len,m+8,0.5),n);I.position.set(0,(m+8)/2,-p-0.6),_.add(I),e.add(_),_.updateMatrixWorld();for(let b=0;b<22;b++)for(let A=-g.len/2+0.5;A<g.len/2-0.5;A+=0.55){if(Math.random()<0.18)continue;let F=new w(A+(Math.random()-0.5)*0.1,1.55+b*0.48+0.3,-0.4-b*0.85);r.push(F.applyMatrix4(_.matrixWorld))}}let h=new fs(i,s,r.length),u=new Re,d=new Ee,f=[16742938,16742938,1382170,14276300,3817286,7031610,11684394,2047884,2763306];return r.forEach((g,_)=>{u.makeRotationY(Math.atan2(-g.x,-g.z)+(Math.random()-0.5)*0.4),u.setPosition(g),h.setMatrixAt(_,u),h.setColorAt(_,d.setHex(f[Math.random()*f.length|0]).multiplyScalar(0.55+Math.random()*0.45))}),e.add(h),h}function Xg(e){let t=new Vt({color:3816770}),n=new at({color:16776170});for(let i of[-1,1])for(let s of[-1,1]){let r=i*(ze.HL+14),o=s*(ze.HW+26),a=new Me(new Yn(0.5,0.8,42,8),t);a.position.set(r,21,o),e.add(a);let l=new Me(new Ft(8,4,0.6),n);l.position.set(r,43,o),l.lookAt(0,0,0),e.add(l)}}function qg(e){let t=document.createElement("canvas");t.width=1024,t.height=64;let n=t.getContext("2d");n.fillStyle="#0d0f11",n.fillRect(0,0,1024,64),n.fillStyle="#ff7a1a",n.font='700 44px "Barlow Condensed", sans-serif',n.textBaseline="middle";for(let o=20;o<1024;o+=256)n.fillText("HEADS UP",o,34);let i=new Cn(t);i.colorSpace=Ut,i.wrapS=Di;let s=new at({map:i}),r=(o,a,l,c)=>{let h=i.clone();h.needsUpdate=!0,h.repeat.set(o/40,1);let u=new Me(new Ot(o,0.9),new at({map:h}));u.position.set(a,0.45,l),u.rotation.y=c,e.add(u)};r(ze.L,0,-(ze.HW+4),0),r(ze.L,0,ze.HW+4,Math.PI),r(ze.W-12,-(ze.HL+4),0,Math.PI/2),r(ze.W-12,ze.HL+4,0,-Math.PI/2),s.dispose()}function vh(e){e.background=new Ee(461067),e.fog=new rr(461067,120,260),e.add(new No(14673646,1845784,1.15));let t=new _s(16774886,1.6);t.position.set(-30,60,20),e.add(t);let n=Vg(),i=new Me(new Ot(ze.L+un*2,ze.W+un*2),new Vt({map:n}));i.rotation.x=-Math.PI/2,e.add(i);let s=new Me(new Ot(400,400),new Vt({color:1714713}));s.rotation.x=-Math.PI/2,s.position.y=-0.02,e.add(s),yh(e,1),yh(e,-1),Wg(e),Xg(e),qg(e)}var Mh=[15845285,14263422,11565650,9067066,6175525],Sh=[1709072,3877404,7031338,921102,11045466],Ct={torso:new li(0.2,0.42,4,10),shorts:new Yn(0.21,0.23,0.26,10),thigh:new li(0.085,0.32,3,8),shin:new li(0.07,0.34,3,8),boot:new Ft(0.11,0.07,0.26),arm:new li(0.06,0.48,3,8),head:new ln(0.12,14,10),hair:new ln(0.125,14,8,0,Math.PI*2,0,Math.PI*0.55),number:new Ot(0.26,0.26),shadow:new Bi(0.45,20),ring:new ur(0.62,0.8,32)};Ct.thigh.translate(0,-0.21,0);Ct.shin.translate(0,-0.22,0);Ct.arm.translate(0,-0.27,0);var Qo=new Map,Vi=(e)=>{if(!Qo.has(e))Qo.set(e,new Vt({color:e}));return Qo.get(e)},Eh=new at({color:0,transparent:!0,opacity:0.35,depthWrite:!1}),Yg=Vi(1118481);function Zg(e,t){let n=document.createElement("canvas");n.width=n.height=128;let i=n.getContext("2d");i.fillStyle=t,i.font='800 104px "Barlow Condensed", sans-serif',i.textAlign="center",i.textBaseline="middle",i.fillText(String(e),64,70);let s=new Cn(n);return s.colorSpace=Ut,s}class pr{constructor(e,{kit:t,number:n,team:i,slot:s}){this.team=i,this.slot=s,this.number=n,this.pos=new w,this.vel=new w,this.target=new w,this.heading=0,this.maxSpeed=6.5,this.phase=Math.random()*10,this.wobble=Math.random()*100;let r=new vt,o=new vt;r.add(o);let a=Vi(Mh[Math.random()*Mh.length|0]),l=Vi(t.shirt),c=Vi(t.shorts),h=Vi(t.socks),u=new Me(Ct.torso,l);u.position.y=1.22,u.scale.set(1.05,1,0.72),o.add(u);let d=new Me(Ct.shorts,c);d.position.y=0.88,d.scale.z=0.75,o.add(d);let f=new Me(Ct.head,a);f.position.y=1.68,o.add(f);let g=new Me(Ct.hair,Vi(Sh[Math.random()*Sh.length|0]));g.position.y=1.7,g.rotation.x=-0.25,o.add(g);let _=(b)=>{let A=new vt;A.position.set(b*0.1,0.84,0);let F=new Me(Ct.thigh,a);A.add(F);let S=new vt;S.position.y=-0.42;let E=new Me(Ct.shin,h);S.add(E);let C=new Me(Ct.boot,Yg);return C.position.set(0,-0.44,0.05),S.add(C),A.add(S),o.add(A),{hip:A,knee:S}},p=(b)=>{let A=new vt;A.position.set(b*0.27,1.45,0);let F=new Me(Ct.arm,a);A.add(F);let S=new Me(Ct.thigh,l);return S.scale.set(0.9,0.42,0.9),A.add(S),A.rotation.z=b*0.12,o.add(A),A};this.legs=[_(-1),_(1)],this.arms=[p(-1),p(1)];let m=Zg(n,t.number),v=new at({map:m,transparent:!0,depthWrite:!1}),x=new Me(Ct.number,v);x.position.set(0,1.28,-0.155),x.rotation.y=Math.PI,o.add(x);let T=new Me(Ct.number,v);T.scale.setScalar(0.45),T.position.set(0.07,1.36,0.155),o.add(T);let I=new Me(Ct.shadow,Eh);I.rotation.x=-Math.PI/2,I.position.y=0.012,r.add(I),this.ringMat=new at({color:16777215,transparent:!0,opacity:0,depthWrite:!1}),this.ring=new Me(Ct.ring,this.ringMat),this.ring.rotation.x=-Math.PI/2,this.ring.position.y=0.02,r.add(this.ring),this.root=r,this.body=o,e.add(r)}place(e,t){this.pos.set(e,0,t),this.target.copy(this.pos),this.vel.set(0,0,0),this.sync()}highlight(e,t){this.ringMat.color.setHex(e),this.ringMat.opacity=t}step(e,t){let n=this.target.clone().sub(this.pos);n.y=0;let i=n.length(),s=i>0.05?n.multiplyScalar(Math.min(this.maxSpeed,i*1.6)/i):n.set(0,0,0),r=9,o=s.sub(this.vel),a=o.length();if(a>r*e)o.multiplyScalar(r*e/a);this.vel.add(o),this.pos.addScaledVector(this.vel,e);let l=this.vel.length(),c=this.heading;if(l>1.6)c=Math.atan2(this.vel.x,this.vel.z);else if(t)c=Math.atan2(t.x-this.pos.x,t.z-this.pos.z);let h=c-this.heading;h=Math.atan2(Math.sin(h),Math.cos(h)),this.heading+=h*Math.min(1,e*7),this.animate(e,l),this.sync()}animate(e,t){this.phase+=e*(3+t*1.55);let n=Math.min(1,t/6)*0.85,i=Math.sin(this.phase);this.legs[0].hip.rotation.x=i*n,this.legs[1].hip.rotation.x=-i*n,this.legs[0].knee.rotation.x=Math.max(0,-Math.cos(this.phase))*n*1.3+0.08,this.legs[1].knee.rotation.x=Math.max(0,Math.cos(this.phase))*n*1.3+0.08,this.arms[0].rotation.x=-i*n*0.9,this.arms[1].rotation.x=i*n*0.9,this.body.position.y=Math.abs(Math.cos(this.phase))*n*0.06,this.body.rotation.x=n*0.16}sync(){this.root.position.set(this.pos.x,0,this.pos.z),this.root.rotation.y=this.heading}setVisible(e){this.root.visible=e}}class ea{constructor(e){let t=document.createElement("canvas");t.width=256,t.height=128;let n=t.getContext("2d");n.fillStyle="#f6f5ef",n.fillRect(0,0,256,128),n.fillStyle="#17191c";for(let s=0;s<14;s++){let r=s*37%256,o=18+s*53%96;n.beginPath();for(let a=0;a<5;a++){let l=a/5*Math.PI*2;n.lineTo(r+Math.cos(l)*11,o+Math.sin(l)*11)}n.fill()}let i=new Cn(t);i.colorSpace=Ut,this.mesh=new Me(new ln(0.11,20,14),new Vt({map:i})),this.shadow=new Me(Ct.shadow,Eh),this.shadow.scale.setScalar(0.3),this.shadow.rotation.x=-Math.PI/2,this.shadow.position.y=0.011,e.add(this.mesh,this.shadow),this.pos=new w(0,0.11,0),this.flight=null}kick(e,t,n,i=0){let s=Math.hypot(t.x-e.x,t.z-e.z);this.flight={from:e.clone(),to:t.clone(),t:0,dur:Math.max(0.25,s/n),loft:i},this.flight.from.y=0.11,this.flight.to.y=0.11}update(e){if(!this.flight)return!1;let t=this.flight;t.t+=e;let n=Math.min(1,t.t/t.dur),i=this.pos.clone();this.pos.lerpVectors(t.from,t.to,t.loft?n:n*(1.15-0.15*n)),this.pos.y=0.11+(t.loft?Math.sin(Math.PI*n)*t.loft:0);let s=i.distanceTo(this.pos),r=new w(t.to.z-t.from.z,0,-(t.to.x-t.from.x)).normalize();if(this.mesh.rotateOnWorldAxis(r,s/0.11),this.sync(),n>=1)return this.flight=null,!0;return!1}timeLeft(){return this.flight?this.flight.dur-this.flight.t:0}set(e,t,n=0.11){this.pos.set(e,n,t),this.flight=null,this.sync()}sync(){this.mesh.position.copy(this.pos),this.shadow.position.set(this.pos.x,0.011,this.pos.z)}}var Wi=new w,Kg=new qt;class ta{constructor(e,t,n){this.scene=e,this.rig=t,this.camera=n,this.homeSets=new Map;for(let i of Object.values(hn)){if(this.homeSets.has(i.formation))continue;this.homeSets.set(i.formation,i.formation.map(([s,,,r])=>new pr(e,{kit:s==="GK"?mh:fh,number:r,team:"home",slot:s})))}this.away=Pn.map(([i,,,s])=>new pr(e,{kit:i==="GK"?gh:ph,number:s,team:"away",slot:i})),this.ball=new ea(e),this.home=null,this.useFormation(hn.CM.formation),this.idle(),this.buildOverlays()}useFormation(e){for(let[t,n]of this.homeSets)n.forEach((i)=>i.setVisible(t===e));this.home=this.homeSets.get(e)}idle(){this.home.forEach((e,t)=>{let[,n,i]=hn.CM.formation[t]||[0,0,0];e.place(n*0.9,i),e.setVisible(!0)}),this.away.forEach((e,t)=>e.place(Pn[t][1]*0.9,Pn[t][2])),this.ball.set(0,0),this.idleT=0}idleStep(e){this.idleT+=e;let t=this.idleT,n=Math.sin(t*0.07)*18,i=Math.sin(t*0.11)*14;this.ball.set(n,i),[...this.home,...this.away].forEach((r,o)=>{let[,a,l]=(r.team==="home"?hn.CM.formation:Pn)[o%11];r.maxSpeed=3,r.target.set(a+n*0.5+Math.sin(t*0.3+o)*1.5,0,l*0.85+i*0.3),r.step(e,this.ball.pos)})}userPos(e=new w){return this.camera.getWorldPosition(e),e.y=0,e}headHeight(){return this.camera.getWorldPosition(Wi),Wi.y}headYaw(){return this.camera.getWorldDirection(Wi),Math.atan2(Wi.x,Wi.z)}headDir(e=new w){return this.camera.getWorldDirection(e),e.y=0,e.normalize()}placeUser(e,t){let n=Wi.set(0,0,-1).applyQuaternion(this.camera.quaternion),i=Math.atan2(n.x,n.z);this.rig.rotation.set(0,t-i,0),this.rig.updateMatrixWorld(!0);let s=this.camera.position.clone();s.y=0,s.applyQuaternion(Kg.setFromEuler(this.rig.rotation)),this.rig.position.set(e.x-s.x,this.rig.position.y,e.z-s.z),this.rig.updateMatrixWorld(!0)}moveUser(e,t){this.rig.position.x+=e,this.rig.position.z+=t}buildOverlays(){let e=new Bi(9,24,-Math.PI/2-ai.degToRad(50),ai.degToRad(100));e.rotateX(-Math.PI/2),this.cone=new Me(e,new at({color:16769162,transparent:!0,opacity:0.28,depthWrite:!1})),this.cone.position.y=0.03,this.cone.visible=!1,this.scene.add(this.cone);let t=(n)=>new gn({color:n,transparent:!0,opacity:0.95});this.bestLine=new _n(new ut().setFromPoints([new w,new w]),t(5232778)),this.choiceLine=new _n(new ut().setFromPoints([new w,new w]),t(16777215)),this.bestLine.visible=this.choiceLine.visible=!1,this.scene.add(this.bestLine,this.choiceLine),this.goalGlow=new Me(new Ot(7.32,2.44),new at({color:16777215,transparent:!0,opacity:0.18,side:er,depthWrite:!1})),this.goalGlow.position.set(52.55,1.22,0),this.goalGlow.rotation.y=Math.PI/2,this.goalGlow.visible=!1,this.scene.add(this.goalGlow)}setLine(e,t,n){if(!t||!n){e.visible=!1;return}let i=e.geometry.attributes.position;i.setXYZ(0,t.x,0.06,t.z),i.setXYZ(1,n.x,0.06,n.z),i.needsUpdate=!0,e.geometry.computeBoundingSphere(),e.visible=!0}clearOverlays(){this.cone.visible=!1,this.bestLine.visible=this.choiceLine.visible=!1,this.goalGlow.visible=!1,[...this.home,...this.away].forEach((e)=>e.highlight(16777215,0))}}var xn=(e,t,n)=>Math.max(t,Math.min(n,e)),$g=17,vs=28,Th=27;function mr(e,t,n,i,s){let r=t.x-e.x,o=t.z-e.z,a=Math.hypot(r,o)||1,l=((n.x-e.x)*r+(n.z-e.z)*o)/(a*a);if(l=xn(l,0,1),s&&l<0.8)l=0.8;let c=e.x+r*l,h=e.z+o*l,u=Math.hypot(n.x-c,n.z-h),d=a*l/i,f=Math.max(0,d-0.22)*6.2+0.9;return u-f}function bh(e,t,n,i,s){let r=1/0,o=null;for(let a of n){let l=mr(e,t,a.pos,i,s);if(l<r)r=l,o=a}return{m:r,who:o}}var Jg=(e,t)=>t.reduce((n,i)=>Math.min(n,Math.hypot(i.pos.x-e.x,i.pos.z-e.z)),1/0),jg={def:{safe:0.5,space:0.25,prog:0.15,lines:0.1},mid:{safe:0.4,space:0.25,prog:0.2,lines:0.15},att:{safe:0.34,space:0.2,prog:0.26,lines:0.2}};function na(e,t,n,i){let s=jg[i],r=n.filter((c)=>c.slot!=="GK"),o=[];for(let c of t){let h=Math.hypot(c.pos.x-e.x,c.pos.z-e.z);if(h<3)continue;let u=h>vs,d=u?21:$g,{m:f,who:g}=bh(e,c.pos,n,d,u),_=xn((f+0.4)/3.4,0,1)*(u?0.85:1),p=xn((Jg(c.pos,n)-1.5)/7,0,1),m=xn((c.pos.x-e.x+8)/30,0,1),v=Math.min(e.x,c.pos.x),x=Math.max(e.x,c.pos.x),T=c.pos.x>e.x?r.filter((A)=>A.pos.x>v+1&&A.pos.x<x-1).length:0,I=xn(T/4,0,1),b=s.safe*_+s.space*p+s.prog*m+s.lines*I;if(_<0.25)b*=0.45;if(c.slot==="GK")b*=0.7;o.push({kind:"pass",target:c,value:b,safe:_,space:p,prog:m,lines:I,margin:f,threat:g,lofted:u,speed:d})}let a=et.x,l=Math.hypot(a-e.x,e.z);if(l<30&&e.x>20){let c=Math.atan2(-et.halfWidth-e.z,a-e.x),h=Math.atan2(et.halfWidth-e.z,a-e.x),u=Math.abs(h-c),d={x:a,z:xn(e.z*0.2,-2.6,2.6)},{m:f}=bh(e,d,r,Th,!1),g=xn((f+0.2)/1.6,0,1),_=xn(u/0.55,0,1)*xn((30-l)/18,0,1);o.push({kind:"shot",target:null,aim:d,value:_*(0.25+0.75*g)*1.05,quality:_,open:g,margin:f,speed:Th})}return o.sort((c,h)=>h.value-c.value),o}function wh(e,t){if(!e||!t.length)return 0;let n=t[0].value||0.000001;return Math.round(xn(e.value/n*100,0,100))}var gt=(e,t)=>e+Math.random()*(t-e),Ah=(e)=>e[Math.random()*e.length|0],Nn=(e,t,n)=>Math.max(t,Math.min(n,e)),Ln=(e,t)=>Math.abs(Math.atan2(Math.sin(e-t),Math.cos(e-t))),$t=(e,t)=>Math.atan2(t.x-e.x,t.z-e.z),Bt=Math.PI/180,Qg=58*Bt,Rh=35*Bt,Ch=48*Bt;function gr(e,t,n,i){let[s,r,o]=e;if(s==="GK")return new w(-47+(t+52)*0.06,0,n*0.12);let a=r+t*0.5,l=o*0.9+n*0.3;if(a>i-0.6&&t<i)a=i-0.6;return new w(Nn(a,-50,50),0,Nn(l,-32,32))}function ia(e,t,n){let[i,s,r]=e;if(i==="GK")return new w(49-Math.max(0,t-15)*0.05,0,n*0.12);let o=s+t*0.55,a=r*0.75+n*0.4;return new w(Nn(o,-48,48),0,Nn(a,-32,32))}class sa{constructor(e,{role:t,difficulty:n,quiz:i,motion:s,fx:r}){this.world=e,this.roleKey=t,this.role=hn[t],this.diff=$o[n],this.quizWanted=i,this.motion=s,this.fx=r||{},this.state="setup",this.t=0}start(){let e=this.world,t=this.role,n=this.diff;e.useFormation(t.formation),e.clearOverlays(),this.F=t.formation,this.home=e.home,this.away=e.away,this.slotName=Ah(t.slots),this.userIdx=this.F.findIndex((v)=>v[0]===this.slotName),this.userBody=this.home[this.userIdx],this.userBody.setVisible(!1),this.mates=this.home.filter((v,x)=>x!==this.userIdx),this.opps=this.away;let i=this.slotName.startsWith("L")?-1:this.slotName.startsWith("R")?1:Math.random()<0.5?-1:1,s=t.slots.length===1&&!["W"].includes(this.roleKey),r=t.ballX+gt(-4,4),o=s?gt(-12,12):i*gt(5,16),a=this.roleKey==="CB",l=this.mates.filter((v)=>a||v.slot!=="GK"),c=30+r*0.55-4,h=this.F.map((v)=>gr(v,r,o,c)),u=l.map((v)=>({p:v,d:h[this.home.indexOf(v)].distanceTo(new w(r,0,o))})).sort((v,x)=>v.d-x.d);this.carrier=u[Math.random()<0.7?0:1].p;let d=h[this.home.indexOf(this.carrier)];r=d.x,o=d.z;let f=Math.min(...Pn.slice(1,5).map((v)=>ia(v,r,o).x));this.home.forEach((v,x)=>{let T=gr(this.F[x],r,o,f);v.place(T.x+gt(-1,1)*n.jitter,T.z+gt(-1,1)*n.jitter),v.maxSpeed=6.2,v.wobble=Math.random()*100}),this.away.forEach((v,x)=>{let T=ia(Pn[x],r,o);v.place(T.x+gt(-1,1)*n.jitter,T.z+gt(-1,1)*n.jitter),v.maxSpeed=6.2,v.role=null});let g=this.userBody.pos.clone();this.ballAt(this.carrier),e.placeUser(g,$t(g,this.carrier.pos)),this.userStart=g.clone(),this.userTarget=g.clone(),this.runOffset=new w(gt(-2,3),0,gt(-3,3));let _=$t(g,this.carrier.pos),p=this.mates.filter((v)=>v!==this.carrier&&v.slot!=="GK"&&Ln($t(g,v.pos),_)>95*Bt&&v.pos.distanceTo(g)>8&&v.pos.distanceTo(g)<30);if(this.free=p.length?Ah(p):null,this.freeDrift=new w,this.free){let v=this.nearestOpp(this.free.pos);if(v)this.freeDrift.copy(this.free.pos).sub(v.pos).setY(0).setLength(3)}this.pressers=[];let m=new Set;for(let v=0;v<n.pressers;v++){let x=_+Math.PI+(v===0?gt(-45,45):(Math.random()<0.5?-1:1)*gt(70,100))*Bt,T=gt(...n.presserDist)+v*2,I=new w(g.x+Math.sin(x)*T,0,g.z+Math.cos(x)*T);I.x=Nn(I.x,-ze.HL+1,ze.HL-1),I.z=Nn(I.z,-ze.HW+1,ze.HW-1);let b=this.away.filter((A)=>A.slot!=="GK"&&!m.has(A)).sort((A,F)=>A.pos.distanceTo(I)-F.pos.distanceTo(I))[0];m.add(b),b.place(I.x,I.z),b.role="presser",b.stalk=I.clone().sub(g),this.pressers.push(b)}this.passesLeft=Math.round(gt(n.passes[0],n.passes[1])),this.hold=gt(0.9,1.4),this.receiver=null,this.finalStruck=!1,this.scans=[],this.inScan=!1,this.scanPeak=0,this.sawPresser=this.pressers.map(()=>-99),this.lastSawFree=-99,this.watchedStrike=null,this.watchedTouch=null,this.buildupStart=0,this.events=[],this.frames=[],this.frameClock=0,this.pending=null,this.aimed=null,this.result=null,this.t=0,this.state="buildup",this.fx.whistle?.()}ballAt(e){let t=new w(Math.sin(e.heading),0,Math.cos(e.heading)).multiplyScalar(0.45);this.world.ball.set(e.pos.x+t.x,e.pos.z+t.z)}nearestOpp(e,t){let n=null,i=1/0;for(let s of this.away){if(s===t)continue;let r=Math.hypot(s.pos.x-e.x,s.pos.z-e.z);if(r<i)i=r,n=s}return n}update(e){if(this.state==="quiz"||this.state==="done"||this.state==="setup")return;this.t+=e;let t=this.world,n=t.ball,i=this.diff,s=t.userPos();if(this.state==="buildup"){if(!n.flight){if(this.hold-=e,this.ballAt(this.carrier),this.hold<=0)this.nextPass(s)}}if(n.flight){if(n.update(e))this.onArrive()}let r=n.flight?n.flight.to:n.pos,o=Math.min(...this.away.filter((u)=>/CB|LB|RB/.test(u.slot)).map((u)=>u.pos.x));this.home.forEach((u,d)=>{if(d===this.userIdx)return;let f=gr(this.F[d],r.x,r.z,o);if(f.x+=Math.sin(this.t*0.6+u.wobble)*1.2,f.z+=Math.cos(this.t*0.5+u.wobble)*1.2,u===this.free)f.add(this.freeDrift);if(u.maxSpeed=6.2,u===this.carrier&&!n.flight&&this.state==="buildup")u.maxSpeed=2.4;if(this.receiver===u&&n.flight)f.copy(n.flight.to);if(this.state==="outcome"&&this.outcomeTarget===u)f.copy(n.flight?n.flight.to:n.pos);u.target.copy(f)});let a=[...this.mates.filter((u)=>u!==this.free&&u.slot!=="GK"),{pos:s}],l=this.state==="buildup"?this.carrier.pos:s,c=null,h=1/0;for(let u of this.away){if(u.role==="presser"||u.slot==="GK")continue;let d=u.pos.distanceTo(l);if(d<h)h=d,c=u}this.away.forEach((u,d)=>{if(this.state==="outcome"&&u===this.outcomeTarget){u.target.copy(n.flight?n.flight.to:n.pos),u.maxSpeed=7;return}if(u.role==="presser"){if(!this.finalStruck)u.target.copy(s).add(u.stalk),u.maxSpeed=6;else{let g=u.pos.clone().sub(s).setY(0),_=this.state==="decide"?1:2.5;u.target.copy(s).add(g.setLength(_)),u.maxSpeed=this.state==="decide"?i.presserSpeed:i.presserSpeed*0.7}return}let f=ia(Pn[d],r.x,r.z);if(u===c&&this.state==="buildup"&&!n.flight){let g=u.pos.clone().sub(l).setY(0).normalize();f=l.clone().addScaledVector(g,2.2)}else if(u.slot!=="GK"){let g=null,_=9;for(let p of a){let m=Math.hypot(p.pos.x-f.x,p.pos.z-f.z);if(m<_)_=m,g=p}if(g)f.lerp(new w(g.pos.x+1.6,0,g.pos.z),0.45);if(this.free){let p=f.clone().sub(this.free.pos).setY(0);if(p.length()<6.5)f.copy(this.free.pos).add(p.setLength(6.5))}}u.target.copy(f),u.maxSpeed=6});for(let u of this.home)if(u!==this.userBody)u.step(e,n.pos);for(let u of this.away)u.step(e,n.pos);if(this.state==="buildup"&&this.motion){let d=gr(this.F[this.userIdx],r.x,r.z,o).add(this.runOffset).sub(s).setY(0),f=d.length();if(f>0.3)d.setLength(Math.min(f,2.2*e)),t.moveUser(d.x,d.z)}if(this.userBody.pos.copy(t.userPos()),this.userBody.heading=t.headYaw(),this.state==="buildup"||this.state==="incoming")this.trackScan(s,n);if(this.state==="decide"){if(this.decideT+=e,this.updateAimGlow(),this.decideT>this.window){let u=[...this.pressers].sort((d,f)=>d.pos.distanceTo(s)-f.pos.distanceTo(s))[0];this.lose(u)}}else if(this.state==="incoming")this.updateAimGlow();if(this.state==="outcome"){if(this.outcomeT-=e,this.outcomeT<=0)this.finish()}this.record(e)}nextPass(e){let t=this.world.ball,n=this.carrier,i;if(this.passesLeft<=1)i=null;else{let s=this.mates.filter((r)=>r!==n&&(this.roleKey==="CB"||r.slot!=="GK")&&r.slot!=="GK").map((r)=>{let o=r.pos.distanceTo(n.pos),a=r.pos.distanceTo(e),l=Math.min(...this.away.map((h)=>mr(n.pos,r.pos,h.pos,16,!1))),c=0;if(o>7&&o<26)c+=2;if(a>9&&a<24)c+=2;if(c+=Nn(l,-2,3),r===this.free)c-=4;return{p:r,s:c+Math.random()}}).sort((r,o)=>o.s-r.s);i=s.length?s[0].p:null}if(this.passesLeft--,n.heading=i?$t(n.pos,i.pos):$t(n.pos,e),this.ballAt(n),i){let s=i.pos.distanceTo(n.pos),r=i.pos.clone().addScaledVector(i.vel,s/16*0.6);t.kick(t.pos,r,gt(15,18),s>vs?s*0.1:0),this.receiver=i,this.events.push({t:this.t,type:"pass"}),this.fx.kick?.(0.7)}else{let s=n.pos.clone().sub(e).setY(0).normalize(),r=e.clone().addScaledVector(s,0.6),o=r.distanceTo(n.pos);t.kick(t.pos,r,gt(14,16.5),o>vs?o*0.08:0),this.receiver=null,this.finalStruck=!0,this.state="incoming",this.strikeT=this.t,this.events.push({t:this.t,type:"final"});let a=$t(e,this.world.ball.pos);this.watchedStrike=Ln(this.world.headYaw(),a)<38*Bt,this.strikeWatchUntil=this.t+0.3,this.fx.kick?.(0.8)}}onArrive(){if(this.state==="buildup"&&this.receiver){this.carrier=this.receiver,this.receiver=null,this.hold=gt(0.7,1.3),this.fx.touch?.();return}if(this.state==="incoming"){let e=this.world.userPos();if(this.receiveT=this.t,this.events.push({t:this.t,type:"receive"}),this.watchedTouch=Ln(this.world.headYaw(),$t(e,this.world.ball.pos))<45*Bt,this.fx.touch?.(),this.inScan)this.closeScan();if(this.scanWindow=Math.max(0.5,this.receiveT-this.buildupStart),this.decideT=0,this.knewPressure=this.sawPresser.every((t)=>this.receiveT-t<2.5),this.window=this.diff.window+(this.knewPressure?0.6:0),this.quizWanted){this.snapshot=this.takeSnapshot(e),this.state="quiz";return}this.enterDecide();return}if(this.state==="outcome")this.outcomeArrived=!0}enterDecide(){if(this.state="decide",this.pending){let e=this.pending;this.pending=null,this.execute(e,!0)}}endQuiz(e){this.memory=e,this.enterDecide()}takeSnapshot(e){let t=this.world.headYaw(),n=this.away.filter((c)=>c.slot!=="GK").map((c)=>c.pos.clone()),i=this.mates.map((c)=>({pos:c.pos.clone(),number:c.number,slot:c.slot})),s=n.reduce((c,h)=>c.distanceTo(e)<h.distanceTo(e)?c:h),r=n.filter((c)=>c.distanceTo(e)<10).length,o=null,a=-1,l=i.filter((c)=>c.slot!=="GK"&&c.pos.distanceTo(e)<32);for(let c of l){let h=Math.min(...n.map((u)=>u.distanceTo(c.pos)));if(c.space=h,h>a)a=h,o=c}return{user:e.clone(),fwd:t,toBall:$t(e,this.world.ball.pos),opps:n,mates:l,nearest:s,within:r,freest:o}}trackScan(e,t){let n=this.world.headYaw(),i=Ln(n,$t(e,t.pos));if(this.anchorYaw==null)this.anchorYaw=n;if(!this.inScan){if(i<Rh)this.anchorYaw=n;if(i>Qg&&Ln(n,this.anchorYaw)>40*Bt)this.inScan=!0,this.scanStart=this.t,this.scanPeak=i,this.scanPeakYaw=n,this.scanSide=Math.sign(Math.sin(n-$t(e,t.pos))),this.fx.tick?.()}else{if(i>this.scanPeak)this.scanPeak=i,this.scanPeakYaw=n;let s=Ln(n,this.scanPeakYaw)>40*Bt&&Ln(n,this.anchorYaw)<25*Bt;if(i<Rh||s)this.closeScan(),this.anchorYaw=n}if(this.strikeWatchUntil&&this.t<this.strikeWatchUntil&&i<38*Bt)this.watchedStrike=!0;if(this.pressers.forEach((s,r)=>{if(Ln(n,$t(e,s.pos))<Ch)this.sawPresser[r]=this.t}),this.free&&Ln(n,$t(e,this.free.pos))<Ch)this.lastSawFree=this.t}closeScan(){if(this.inScan=!1,this.t-this.scanStart<0.18)return;let e=!!this.world.ball.flight;this.scans.push({t:this.scanStart,end:this.t,peak:this.scanPeak,side:this.scanSide,shoulder:this.scanPeak>100*Bt,ballMoving:e})}aim(e,t){if(this.state!=="incoming"&&this.state!=="decide"){this.aimed=null;return}let n=this.world.userPos(),i=null,s=1/0;for(let r of this.mates){let a=r.pos.clone().setY(1).sub(e),l=a.length();if(r.pos.distanceTo(n)<3)continue;let c=a.normalize().angleTo(t),h=Math.max(5*Bt,Math.atan(1.1/l));if(c<h&&c<s)s=c,i={kind:"pass",target:r}}if(this.role.group==="att"&&n.x>20&&Math.hypot(et.x-n.x,n.z)<30){let r=new w(et.x,1.2,0).sub(e),o=r.length(),a=r.normalize().angleTo(t);if(a<Math.atan(4.2/o)+2*Bt&&a<s)i={kind:"shot"}}this.aimed=i}updateAimGlow(){for(let e of this.mates){let t=this.aimed?.kind==="pass"&&this.aimed.target===e,n=this.pending?.kind==="pass"&&this.pending.target===e;e.highlight(n?16742938:16777215,t||n?0.9:0)}this.world.goalGlow.visible=this.aimed?.kind==="shot"||this.pending?.kind==="shot"}select(){if(!this.aimed)return!1;if(this.state==="incoming")return this.pending=this.aimed,this.fx.ui?.(),!0;if(this.state==="decide")return this.execute(this.aimed,!1),!0;return!1}execute(e,t){let n=this.world,i=n.ball,s=i.pos.clone(),r=na(s,this.mates,this.away,this.role.group),o=r.find((c)=>c.kind===e.kind&&(c.kind==="shot"||c.target===e.target))||{kind:e.kind,target:e.target,value:0};this.options=r,this.chosen=o,this.decisionScore=wh(o,r),this.oneTouch=t,this.decideTime=this.decideT,this.events.push({t:this.t,type:"decide"}),this.world.clearOverlays(),this.fx.kick?.(1);let a,l;if(o.kind==="pass"){let c=o.target,h=c.pos.distanceTo(s),u=h>vs,d=u?21:17,f=null,g=1/0;for(let _ of this.away){let p=mr(s,c.pos,_.pos,d,u)+gt(-0.15,0.15);if(p<g)g=p,f=_}if(g<0&&f){a="intercepted";let _=c.pos.x-s.x,p=c.pos.z-s.z,m=_*_+p*p,v=((f.pos.x-s.x)*_+(f.pos.z-s.z)*p)/m;v=Nn(v,u?0.8:0.08,1);let x=new w(s.x+_*v,0,s.z+p*v);i.kick(s,x,d,u?h*0.09*v:0),l=f}else{a=o.space<0.25?"tight":"completed";let _=c.pos.clone().addScaledVector(c.vel,h/d*0.5);i.kick(s,_,d,u?h*0.09:0),l=c}}else{let c=Nn(s.z*-0.15+gt(-2.4,2.4),-3.2,3.2),h=this.away.find((u)=>u.slot==="GK");if(o.open<0.3){a="blocked";let u=this.away.filter((d)=>d.slot!=="GK").sort((d,f)=>d.pos.distanceTo(s)-f.pos.distanceTo(s))[0];i.kick(s,u.pos.clone(),24,0.4),l=u}else if(o.quality*(0.4+0.6*o.open)+gt(0,0.35)>0.55)a="goal",i.kick(s,new w(et.x+1.2,0,c),27,gt(0.3,1.4)),l=null;else a="saved",i.kick(s,new w(et.x-0.6,0,c*0.7),27,0.6),l=h}this.outcome=a,this.outcomeTarget=l,this.state="outcome",this.outcomeT=2.2,n.setLine(n.choiceLine,null,null)}lose(e){this.options=na(this.world.ball.pos.clone(),this.mates,this.away,this.role.group),this.chosen=null,this.decisionScore=0,this.decideTime=this.decideT,this.outcome="lost",this.outcomeTarget=e;let t=this.world.ball,n=e.pos.clone().add(new w(-8,0,gt(-4,4)));t.kick(t.pos.clone(),n,7,0),e.target.copy(n),this.events.push({t:this.t,type:"lost"}),this.state="outcome",this.outcomeT=2,this.world.clearOverlays(),this.fx.groan?.()}finish(){if(this.inScan)this.closeScan();let e=this.diff,t=this.scans.filter((l)=>l.t<(this.receiveT??this.t)),n=t.length,i=Math.round(Math.min(1,n/e.scanTarget)*60+(this.knewPressure?20:0)+(this.watchedStrike?10:0)+(this.watchedTouch?10:0)),s=this.memory!=null,r=this.decisionScore||0,o=Math.round(s?i*0.3+r*0.45+this.memory*0.25:i*0.4+r*0.6);if(["completed","goal"].includes(this.outcome))this.fx.cheer?.(this.outcome==="goal"?1:0.4);else if(this.outcome!=="lost")this.fx.groan?.();this.result={role:this.roleKey,scans:n,scanTarget:e.scanTarget,scanRate:n/(this.scanWindow||1),shoulder:t.filter((l)=>l.shoulder).length,watchedStrike:this.watchedStrike,watchedTouch:this.watchedTouch,sawPresser:!!this.knewPressure,sawFree:!this.free||(this.receiveT??this.t)-this.lastSawFree<4,scanScore:i,decision:r,memory:s?this.memory:null,total:o,outcome:this.outcome,oneTouch:!!this.oneTouch,decideTime:this.decideTime,chosen:this.chosen,best:this.options?.[0]||null},this.state="done"}record(e){if(this.frameClock-=e,this.frameClock>0)return;this.frameClock=0.05;let t=this.world,n=t.userPos(),i=new Float32Array(72);i[0]=n.x,i[1]=n.z,i[2]=t.headYaw(),i[3]=t.ball.pos.x,i[4]=t.ball.pos.y,i[5]=t.ball.pos.z;let s=6;for(let r of[...this.home,...this.away])i[s++]=r===this.userBody?n.x:r.pos.x,i[s++]=r===this.userBody?n.z:r.pos.z,i[s++]=r===this.userBody?t.headYaw():r.heading;this.frames.push({t:this.t,f:i})}}class xr{constructor(e,t,n,i){this.w=t,this.h=n,this.canvas=document.createElement("canvas"),this.canvas.width=t,this.canvas.height=n,this.g=this.canvas.getContext("2d"),this.tex=new Cn(this.canvas),this.tex.colorSpace=Ut,this.tex.anisotropy=4,this.tex.generateMipmaps=!1,this.tex.minFilter=Ui;let s=new Ot(i,i*(n/t));this.mesh=new Me(s,new at({map:this.tex,transparent:!0,depthTest:!1,depthWrite:!1})),this.mesh.renderOrder=10,this.mesh.visible=!1,this.mesh.userData.panel=this,e.add(this.mesh),this.buttons=[],this.hover=null,this.render=null}show(e){this.render=e,this.hover=null,this.mesh.visible=!0,this.redraw()}hide(){this.mesh.visible=!1,this.render=null,this.buttons=[]}redraw(){if(!this.render)return;this.buttons=[],this.g.clearRect(0,0,this.w,this.h),this.render(this.draw()),this.tex.needsUpdate=!0}draw(){let e=this.g,t=this,n={g:e,w:this.w,h:this.h,bg(i=28){e.fillStyle=le.bg,_r(e,0,0,t.w,t.h,i),e.fill()},text(i,s,r,o,{weight:a=700,color:l=le.text,align:c="left",font:h=le.font,base:u="alphabetic"}={}){return e.font=`${a} ${o}px ${h}`,e.fillStyle=l,e.textAlign=c,e.textBaseline=u,e.fillText(i,s,r),e.measureText(i).width},button(i,s,r,o,a,l,{onClick:c,primary:h=!1,active:u=!1,disabled:d=!1,size:f=40,sub:g=null,r:_=18}={}){let p=t.hover===i&&!d;if(e.fillStyle=h?p?"#ff9447":le.accent:u?le.text:p?le.cardHi:le.card,_r(e,s,r,o,a,_),e.fill(),p&&!h&&!u)e.strokeStyle="rgba(242,240,232,0.35)",e.lineWidth=3,_r(e,s+1.5,r+1.5,o-3,a-3,_),e.stroke();let m=h||u?"#111":d?"rgba(242,240,232,0.25)":le.text;if(g)n.text(l,s+o/2,r+a/2-2,f,{color:m,align:"center"}),n.text(g,s+o/2,r+a/2+f*0.75,f*0.55,{color:h||u?"rgba(0,0,0,0.6)":le.dim,align:"center",weight:600});else n.text(l,s+o/2,r+a/2,f,{color:m,align:"center",base:"middle"});if(!d&&c)t.buttons.push({id:i,x:s,y:r,w:o,h:a,onClick:c})},hit(i,s,r,o,a,l){t.buttons.push({id:i,x:s,y:r,w:o,h:a,onClick:l})},rr:(i,s,r,o,a)=>_r(e,i,s,r,o,a),hovered:(i)=>t.hover===i};return n}pick(e){let t=e.x*this.w,n=(1-e.y)*this.h;for(let i=this.buttons.length-1;i>=0;i--){let s=this.buttons[i];if(t>=s.x&&t<=s.x+s.w&&n>=s.y&&n<=s.y+s.h)return{b:s,x:t,y:n}}return{b:null,x:t,y:n}}setHover(e){if(e===this.hover)return;this.hover=e,this.redraw()}placeFacing(e,t,n,i=0){this.mesh.position.set(e.x+Math.sin(t)*n,e.y+i,e.z+Math.cos(t)*n),this.mesh.rotation.set(0,t+Math.PI,0)}}function _r(e,t,n,i,s,r){e.beginPath(),e.moveTo(t+r,n),e.arcTo(t+i,n,t+i,n+s,r),e.arcTo(t+i,n+s,t,n+s,r),e.arcTo(t,n+s,t,n,r),e.arcTo(t,n,t+i,n,r),e.closePath()}class ra{constructor(){this.ray=new xs,this.panels=[]}hitPanels(e,t){this.ray.set(e,t);let n=this.panels.filter((o)=>o.mesh.visible).map((o)=>o.mesh),i=this.ray.intersectObjects(n,!1);if(!i.length)return null;let s=i[0],r=s.object.userData.panel;return{panel:r,point:s.point,distance:s.distance,...r.pick(s.uv)}}}class oa{constructor(){this.ctx=null,this.volume=0.8,this.ticks=!0}unlock(){if(this.ctx){if(this.ctx.state==="suspended")this.ctx.resume();return}let e=window.AudioContext||window.webkitAudioContext;if(!e)return;this.ctx=new e,this.master=this.ctx.createGain(),this.master.gain.value=this.volume,this.master.connect(this.ctx.destination),this.noise=this.makeNoise(),this.crowd()}setVolume(e){if(this.volume=e,this.master)this.master.gain.value=e}makeNoise(){let e=this.ctx.sampleRate*2,t=this.ctx.createBuffer(1,e,this.ctx.sampleRate),n=t.getChannelData(0),i=0,s=0,r=0;for(let o=0;o<e;o++){let a=Math.random()*2-1;i=0.99765*i+a*0.099,s=0.963*s+a*0.2965,r=0.57*r+a*1.0526,n[o]=(i+s+r+a*0.1848)*0.2}return t}src(){let e=this.ctx.createBufferSource();return e.buffer=this.noise,e.loop=!0,e}crowd(){let e=this.ctx,t=this.src(),n=e.createBiquadFilter();n.type="bandpass",n.frequency.value=700,n.Q.value=0.6,this.crowdGain=e.createGain(),this.crowdGain.gain.value=0.22;let i=e.createOscillator();i.frequency.value=0.09;let s=e.createGain();s.gain.value=0.06,i.connect(s).connect(this.crowdGain.gain),t.connect(n).connect(this.crowdGain).connect(this.master),t.start(),i.start()}swell(e,t=2.2,n=900){if(!this.ctx)return;let i=this.ctx,s=i.currentTime,r=this.src(),o=i.createBiquadFilter();o.type="bandpass",o.frequency.value=n,o.Q.value=0.8;let a=i.createGain();a.gain.setValueAtTime(0.0001,s),a.gain.exponentialRampToValueAtTime(e,s+0.25),a.gain.exponentialRampToValueAtTime(0.0001,s+t),r.connect(o).connect(a).connect(this.master),r.start(s),r.stop(s+t+0.1)}cheer(e=0.5){this.swell(0.25+e*0.6,1.6+e*1.8,1000)}groan(){this.swell(0.35,1.4,380)}kick(e=0.8){if(!this.ctx)return;let t=this.ctx,n=t.currentTime,i=t.createOscillator();i.type="sine",i.frequency.setValueAtTime(150,n),i.frequency.exponentialRampToValueAtTime(55,n+0.12);let s=t.createGain();s.gain.setValueAtTime(0.5*e,n),s.gain.exponentialRampToValueAtTime(0.001,n+0.16),i.connect(s).connect(this.master),i.start(n),i.stop(n+0.2);let r=this.src(),o=t.createBiquadFilter();o.type="highpass",o.frequency.value=1800;let a=t.createGain();a.gain.setValueAtTime(0.25*e,n),a.gain.exponentialRampToValueAtTime(0.001,n+0.05),r.connect(o).connect(a).connect(this.master),r.start(n),r.stop(n+0.08)}touch(){this.kick(0.35)}tick(){if(!this.ctx||!this.ticks)return;let e=this.ctx,t=e.currentTime,n=e.createOscillator();n.type="triangle",n.frequency.value=1320;let i=e.createGain();i.gain.setValueAtTime(0.07,t),i.gain.exponentialRampToValueAtTime(0.001,t+0.07),n.connect(i).connect(this.master),n.start(t),n.stop(t+0.09)}ui(){if(!this.ctx)return;let e=this.ctx,t=e.currentTime,n=e.createOscillator();n.type="sine",n.frequency.setValueAtTime(660,t),n.frequency.exponentialRampToValueAtTime(990,t+0.05);let i=e.createGain();i.gain.setValueAtTime(0.08,t),i.gain.exponentialRampToValueAtTime(0.001,t+0.09),n.connect(i).connect(this.master),n.start(t),n.stop(t+0.1)}whistle(e=!1){if(!this.ctx)return;let t=this.ctx,n=t.currentTime,i=e?0.9:0.35,s=t.createOscillator();s.type="sine",s.frequency.value=2900;let r=t.createOscillator();r.frequency.value=28;let o=t.createGain();o.gain.value=120,r.connect(o).connect(s.frequency);let a=t.createGain();a.gain.setValueAtTime(0.0001,n),a.gain.exponentialRampToValueAtTime(0.12,n+0.03),a.gain.setValueAtTime(0.12,n+i-0.06),a.gain.exponentialRampToValueAtTime(0.0001,n+i),s.connect(a).connect(this.master),s.start(n),r.start(n),s.stop(n+i),r.stop(n+i)}}var Ih="headsup.v1",e0=["#ff7a1a","#4fd88a","#5aa9ff"];function t0(e){return{name:`PLAYER ${e+1}`,color:e0[e],stars:Array(24).fill(0),best:Array(24).fill(0),sessions:[]}}function n0(){try{let e=JSON.parse(localStorage.getItem(Ih));if(e&&Array.isArray(e.profiles))return e}catch{}return{active:0,profiles:[0,1,2].map(t0),settings:{motion:!1,seated:!1,volume:0.8,ticks:!0}}}var Ke={data:n0(),save(){try{localStorage.setItem(Ih,JSON.stringify(this.data))}catch{}},get profile(){return this.data.profiles[this.data.active]},get settings(){return this.data.settings},setActive(e){this.data.active=e,this.save()},unlocked(e){return e===0||this.profile.stars[e-1]>0},starsFor(e){return xh.filter((t)=>e>=t).length},recordSession(e){let t=this.profile;if(t.sessions.push(e),t.sessions.length>400)t.sessions.shift();if(e.level!=null)t.stars[e.level]=Math.max(t.stars[e.level],this.starsFor(e.score)),t.best[e.level]=Math.max(t.best[e.level],e.score);this.save()},totals(){let e=this.profile.sessions,t=e.reduce((i,s)=>i+s.reps,0),n=(i)=>{let s=e.filter((r)=>r[i]!=null);return s.length?s.reduce((r,o)=>r+o[i]*o.reps,0)/s.reduce((r,o)=>r+o.reps,0):null};return{sessions:e.length,reps:t,scanRate:n("scanRate"),scan:n("scan"),decision:n("decision"),memory:n("memory"),score:n("score"),stars:this.profile.stars.reduce((i,s)=>i+s,0)}}};var ha={};Gh(ha,{career:()=>r0,home:()=>s0,pause:()=>aa,practice:()=>o0,repCard:()=>la,settings:()=>l0,stars:()=>yr,stats:()=>a0,summary:()=>ca});var i0=(e,t,n,i,s)=>{let r=e.g;r.beginPath();for(let o=0;o<10;o++){let a=o%2?i*0.42:i,l=-Math.PI/2+o*Math.PI/5;r.lineTo(t+Math.cos(l)*a,n+Math.sin(l)*a)}r.closePath(),r.fillStyle=s?le.accent:"rgba(242,240,232,0.16)",r.fill()},yr=(e,t,n,i,s,r=s*2.3)=>{for(let o=0;o<3;o++)i0(e,n+o*r,i,s,o<t)},Xi=(e)=>e==null?"—":String(Math.round(e));function Ph(e,t){Ke.data.profiles.forEach((n,i)=>{let s=Ke.data.active===i,r=e.w-70-(2-i)*70,o=48,a=e.g;if(a.beginPath(),a.arc(r,70,26,0,Math.PI*2),a.fillStyle=s?n.color:le.card,a.fill(),e.hovered("prof"+i)&&!s)a.strokeStyle=n.color,a.lineWidth=3,a.stroke();e.text(String(i+1),r,71,30,{align:"center",base:"middle",color:s?"#111":le.dim}),e.hit("prof"+i,r-28,42,56,56,()=>{Ke.setActive(i),t.redraw()})})}function s0(e){return(t)=>{t.bg(),t.text("HEADS UP",70,150,120,{weight:800}),t.g.fillStyle=le.accent,t.g.fillRect(74,172,120,8),Ph(t,e);let n=Ke.totals(),i=70,s=t.w-140;t.button("career",i,240,s,150,"CAREER",{primary:!0,size:64,onClick:()=>e.go("career")}),t.text(`${n.stars} / 72`,i+s-40,330,40,{align:"right",color:"#111"}),yr(t,1,i+s-200,316,16);let r=(s-40)/3;t.button("practice",i,420,r,130,"PRACTICE",{size:48,onClick:()=>e.go("practice")}),t.button("stats",i+r+20,420,r,130,"STATS",{size:48,onClick:()=>e.go("stats")}),t.button("settings",i+(r+20)*2,420,r,130,"SETTINGS",{size:48,onClick:()=>e.go("settings")});let o=Ke.profile.sessions.at(-1);if(t.g.fillStyle=le.line,t.g.fillRect(i,600,s,2),t.text(Ke.profile.name,i,668,40,{color:Ke.profile.color}),t.text(`${n.reps} REPS`,i+260,668,40,{color:le.dim}),o)t.text(`LAST ${o.score}`,i+s,668,40,{align:"right",color:le.dim});if(e.xrSupported&&!e.inXR)t.button("vr",i,700,s,70,"ENTER VR",{size:38,onClick:()=>e.enterVR()})}}function r0(e){return(t)=>{t.bg();let n=e.careerStage;t.text(jo[n],70,120,84,{weight:800});let i=Gi.filter((a)=>a.stage===n).reduce((a,l)=>a+Ke.profile.stars[l.index],0);t.text(`${i} / 18`,t.w-70,120,44,{align:"right",color:le.dim});let s=Gi.filter((a)=>a.stage===n),r=(t.w-140-40)/3,o=230;s.forEach((a,l)=>{let c=70+l%3*(r+20),h=170+Math.floor(l/3)*(o+20),u=Ke.unlocked(a.index),d="lvl"+a.index,f=t.hovered(d)&&u;if(t.g.fillStyle=f?le.cardHi:le.card,t.rr(c,h,r,o,22),t.g.fill(),t.text(String(a.index+1).padStart(2,"0"),c+28,h+78,64,{weight:800,color:u?le.text:"rgba(242,240,232,0.2)"}),t.text(hn[a.role].name,c+28,h+132,38,{color:u?le.text:"rgba(242,240,232,0.2)"}),t.text(a.quizChance>0.5?`${a.difficulty} · MEMORY`:a.difficulty,c+28,h+176,30,{color:u?le.dim:"rgba(242,240,232,0.15)",weight:600}),u)yr(t,Ke.profile.stars[a.index],c+r-120,h+62,17,40);else t.text("LOCKED",c+r-28,h+70,28,{align:"right",color:"rgba(242,240,232,0.25)"});if(u)t.hit(d,c,h,r,o,()=>e.startCareer(a.index))}),t.button("back",70,690,200,80,"BACK",{size:36,onClick:()=>e.go("home")}),t.button("prev",t.w-290,690,100,80,"‹",{size:60,disabled:n===0,onClick:()=>{e.careerStage--,e.redraw()}}),t.button("next",t.w-170,690,100,80,"›",{size:60,disabled:n===jo.length-1,onClick:()=>{e.careerStage++,e.redraw()}})}}function o0(e){return(t)=>{t.bg();let n=e.practiceOpts;t.text("PRACTICE",70,120,84,{weight:800});let i=(s,r,o,a,l,c,h=32)=>{let d=(t.w-140-14*(s.length-1))/s.length;s.forEach((f,g)=>t.button(r+f,70+g*(d+14),o,d,a,typeof f==="number"?`${f} REPS`:f,{active:l===f,size:h,onClick:()=>{c(f),e.redraw()}}))};i(_h,"r",170,90,n.role,(s)=>n.role=s,34),t.text(hn[n.role].name,70,312,36,{color:le.dim,weight:600}),i(Jo,"d",340,80,n.difficulty,(s)=>n.difficulty=s),i(["QUIZ OFF","QUIZ SOME","QUIZ EVERY REP"],"q",440,80,n.quiz,(s)=>n.quiz=s),i([5,10,20],"n",540,80,n.reps,(s)=>n.reps=s),t.button("back",70,690,200,80,"BACK",{size:36,onClick:()=>e.go("home")}),t.button("start",t.w-70-360,690,360,80,"START",{primary:!0,size:44,onClick:()=>e.startPractice()})}}function a0(e){return(t)=>{t.bg(),t.text("STATS",70,120,84,{weight:800}),Ph(t,e);let n=Ke.totals(),i=[["REPS",String(n.reps)],["SCANS / SEC",n.scanRate==null?"—":n.scanRate.toFixed(2)],["SCANNING",Xi(n.scan)],["DECISIONS",Xi(n.decision)],["MEMORY",Xi(n.memory)],["STARS",`${n.stars}`]],s=(t.w-140-70)/6;i.forEach(([h,u],d)=>{let f=70+d*(s+14);t.g.fillStyle=le.card,t.rr(f,160,s,150,20),t.g.fill(),t.text(u,f+22,250,64,{weight:800}),t.text(h,f+22,290,26,{color:le.dim,weight:600})});let r=Ke.profile.sessions.slice(-20),o=70,a=350,l=t.w-140,c=300;if(t.g.fillStyle=le.card,t.rr(o,a,l,c,20),t.g.fill(),r.length<2)t.text(r.length?"ONE SESSION SO FAR":"NO SESSIONS YET",o+l/2,a+c/2,40,{align:"center",base:"middle",color:le.dim});else{let h=(f)=>o+40+f/(r.length-1)*(l-80),u=(f)=>a+c-40-f/100*(c-80);t.g.strokeStyle=le.line,t.g.lineWidth=2;for(let f of[25,50,75])t.g.beginPath(),t.g.moveTo(o+40,u(f)),t.g.lineTo(o+l-40,u(f)),t.g.stroke();let d=(f,g,_=1)=>{t.g.strokeStyle=g,t.g.lineWidth=5,t.g.lineJoin="round",t.g.beginPath(),r.forEach((p,m)=>{let v=(p[f]??0)*_;m?t.g.lineTo(h(m),u(v)):t.g.moveTo(h(m),u(v))}),t.g.stroke()};d("score",le.accent),d("scan","#f2f0e8"),t.text("SCORE",o+l-40,a+44,28,{align:"right",color:le.accent}),t.text("SCANNING",o+l-140,a+44,28,{align:"right",color:le.text})}t.button("back",70,690,200,80,"BACK",{size:36,onClick:()=>e.go("home")})}}function l0(e){return(t)=>{t.bg();let n=Ke.settings;t.text("SETTINGS",70,120,84,{weight:800});let i=(r,o,a,l,c)=>{t.text(o,70,a+52,44),t.button(r+"on",t.w-70-300,a,140,76,"ON",{active:n[l],size:34,onClick:()=>{n[l]=!0,Ke.save(),c?.(),e.redraw()}}),t.button(r+"off",t.w-70-145,a,140,76,"OFF",{active:!n[l],size:34,onClick:()=>{n[l]=!1,Ke.save(),c?.(),e.redraw()}})};i("mv","MOVE WITH PLAY",170,"motion"),i("st","SEATED",266,"seated",()=>e.applySettings()),i("tk","CLICK ON EACH SCAN",362,"ticks",()=>e.applySettings()),t.text("VOLUME",70,510,44),t.button("vdn",t.w-70-300,458,90,76,"–",{size:48,onClick:()=>{n.volume=Math.max(0,+(n.volume-0.1).toFixed(1)),Ke.save(),e.applySettings(),e.redraw()}}),t.text(String(Math.round(n.volume*10)),t.w-70-155,510,48,{align:"center"}),t.button("vup",t.w-70-90,458,90,76,"+",{size:48,onClick:()=>{n.volume=Math.min(1,+(n.volume+0.1).toFixed(1)),Ke.save(),e.applySettings(),e.redraw()}});let s=e.resetArmed;t.button("reset",70,580,t.w-140,76,s?`CLEAR ${Ke.profile.name}? PRESS AGAIN`:`CLEAR ${Ke.profile.name}`,{size:34,onClick:()=>{if(!s){e.resetArmed=!0,e.redraw();return}let r=Ke.data.active;Ke.data.profiles[r]={...Ke.data.profiles[r],stars:Array(24).fill(0),best:Array(24).fill(0),sessions:[]},Ke.save(),e.resetArmed=!1,e.redraw()}}),t.button("back",70,690,200,80,"BACK",{size:36,onClick:()=>{e.resetArmed=!1,e.go("home")}})}}function aa(e){return(t)=>{t.bg(),t.text("PAUSED",t.w/2,200,110,{weight:800,align:"center"}),t.button("resume",240,300,t.w-480,120,"RESUME",{primary:!0,size:52,onClick:()=>e.resume()}),t.button("quit",240,450,t.w-480,110,"QUIT SESSION",{size:44,onClick:()=>e.quitSession()})}}var c0={completed:["COMPLETED",le.good],tight:["COMPLETED UNDER PRESSURE",le.text],intercepted:["INTERCEPTED",le.bad],lost:["LOST THE BALL",le.bad],goal:["GOAL",le.good],saved:["SAVED",le.text],blocked:["BLOCKED",le.bad]};function la(e,t,n,i,s){return(r)=>{r.bg(),r.text(`${n+1} / ${i}`,60,92,40,{color:le.dim});let[o,a]=c0[t.outcome];r.text(o,r.w-60,92,44,{align:"right",color:a}),r.text(String(t.total),60,290,210,{weight:800});let l=[["SCANS",`${t.scans} / ${t.scanTarget}`,t.scanScore],["DECISION",t.outcome==="lost"?"TOO LATE":t.decision===100?"BEST OPTION":`${t.decision}% OF BEST`,t.decision]];if(t.memory!=null)l.push(["MEMORY","",t.memory]);l.forEach(([d,f,g],_)=>{let p=140+_*82;r.text(d,420,p+50,40),r.text(f,640,p+50,36,{color:le.dim,weight:600}),r.text(String(g),r.w-60,p+50,48,{align:"right",color:g>=70?le.good:g>=40?le.text:le.bad})});let c=[];if(t.shoulder)c.push([`${t.shoulder} SHOULDER CHECK${t.shoulder>1?"S":""}`,le.good]);if(!t.sawPresser)c.push(["PRESSER UNSEEN",le.bad]);if(!t.sawFree)c.push(["FREE TEAMMATE UNSEEN",le.bad]);if(t.watchedStrike===!1)c.push(["EYES OFF THE PASS",le.bad]);if(t.oneTouch)c.push(["ONE TOUCH",le.good]);let h=60;r.g.font=`700 30px ${le.font}`;for(let[d,f]of c.slice(0,4)){let g=r.g.measureText(d).width+40;if(h+g>r.w-60)break;r.g.fillStyle=le.card,r.rr(h,400,g,58,29),r.g.fill(),r.text(d,h+20,438,30,{color:f}),h+=g+12}r.button("replay",60,500,360,100,"REPLAY",{size:44,onClick:()=>e.openReplay()});let u=n+1>=i;r.button("next",r.w-60-460,500,460,100,u?"FINISH":s!=null?`NEXT  ${s}`:"NEXT",{primary:!0,size:44,onClick:()=>e.nextRep()})}}function ca(e,t,n,i){return(s)=>{if(s.bg(),s.text(t.level!=null?`LEVEL ${t.level+1}`:"SESSION",70,110,60,{weight:800,color:le.dim}),s.text(String(t.score),70,320,220,{weight:800}),t.level!=null)yr(s,n,110,380,30,74);if([["SCANNING",Xi(t.scan)],["DECISIONS",Xi(t.decision)],["MEMORY",Xi(t.memory)],["SCANS / SEC",t.scanRate.toFixed(2)],["COMPLETED",`${t.completed} / ${t.reps}`]].forEach(([o,a],l)=>{let c=150+l*72;s.text(o,560,c+40,40,{color:le.dim,weight:600}),s.text(a,s.w-70,c+40,48,{align:"right"})}),s.button("menu",70,560,260,100,"MENU",{size:44,onClick:()=>e.go("home")}),s.button("again",350,560,300,100,"AGAIN",{size:44,onClick:()=>e.again()}),i!=null)s.button("nextlvl",670,560,s.w-740,100,`LEVEL ${i+1}`,{primary:!0,size:44,onClick:()=>e.startCareer(i)})}}var Lh=(e,t,n)=>Math.max(t,Math.min(n,e)),h0=["nearest","count","free"];function Nh(e){let t=h0.filter((s)=>s!=="free"||e.mates.length>=3),n=t[Math.random()*t.length|0],i={type:n,snap:e,answered:!1,score:0,guess:null};if(n==="free"){let s=e.mates.filter((r)=>r!==e.freest).sort((r,o)=>r.pos.distanceTo(e.user)-o.pos.distanceTo(e.user)).slice(0,3);i.choices=[e.freest,...s].sort(()=>Math.random()-0.5)}return i}var Dh=44;function u0(e,t,n,i){let s=Math.sin(e.toBall),r=Math.cos(e.toBall),o=i/Dh,a=t+i/2,l=n+i/2;return{toPx(c){let h=c.x-e.user.x,u=c.z-e.user.z,d=h*s+u*r,f=-h*r+u*s;return{x:a+f*o,y:l-d*o}},toWorld(c,h){let u=(c-a)/o,d=-(h-l)/o;return{x:e.user.x+d*s-u*r,z:e.user.z+d*r+u*s}}}}function ua(e,t){return(n)=>{n.bg();let i=n.g,s={nearest:"WHERE WAS THE NEAREST OPPONENT?",count:"OPPONENTS WITHIN 10 METRES?",free:"WHO HAD THE MOST SPACE?"};if(n.text(s[t.type],n.w/2,90,56,{weight:800,align:"center"}),t.type==="nearest"){let o=(n.w-600)/2,l=u0(t.snap,o,130,600);i.save(),n.rr(o,130,600,600,24),i.clip(),i.fillStyle="#21451f",i.fillRect(o,130,600,600),i.strokeStyle="rgba(255,255,255,0.12)",i.lineWidth=2;for(let h of[10,20])i.beginPath(),i.arc(o+300,430,h/Dh*600,0,Math.PI*2),i.stroke();let c=l.toPx(t.snap.user);if(i.fillStyle=le.accent,i.beginPath(),i.moveTo(c.x,c.y-22),i.lineTo(c.x-15,c.y+14),i.lineTo(c.x+15,c.y+14),i.closePath(),i.fill(),t.answered){for(let h of t.snap.opps){let u=l.toPx(h);i.fillStyle=h===t.snap.nearest?"#5aa9ff":"rgba(90,169,255,0.4)",i.beginPath(),i.arc(u.x,u.y,h===t.snap.nearest?16:11,0,Math.PI*2),i.fill()}if(t.guess){let h=l.toPx(t.guess),u=l.toPx(t.snap.nearest);i.strokeStyle=le.text,i.lineWidth=3,i.setLineDash([8,8]),i.beginPath(),i.moveTo(h.x,h.y),i.lineTo(u.x,u.y),i.stroke(),i.setLineDash([]),i.strokeStyle=le.text,i.lineWidth=5,i.beginPath(),i.arc(h.x,h.y,14,0,Math.PI*2),i.stroke()}}else if(n.hovered("map")&&e.quizCursor)i.strokeStyle=le.text,i.lineWidth=4,i.beginPath(),i.arc(e.quizCursor.x,e.quizCursor.y,14,0,Math.PI*2),i.stroke();if(i.restore(),!t.answered)n.hit("map",o,130,600,600,(h,u)=>{let d=l.toWorld(h,u);t.guess={x:d.x,z:d.z};let f=Math.hypot(d.x-t.snap.nearest.x,d.z-t.snap.nearest.z);e.answerQuiz(Math.round(Lh(100-(f-2)*9,0,100)))});else n.text(`${t.score}`,o+600+40,220,80,{weight:800,color:t.score>=60?le.good:le.bad})}if(t.type==="count"){let r=[0,1,2,3,4,5],o=150,a=20,l=(n.w-1000)/2;r.forEach((c,h)=>{let u=c===5?"5+":String(c),d=Math.min(t.snap.within,5)===c,f="c"+c;if(t.answered){let g=d?le.good:t.guess===c?le.bad:le.card;i.fillStyle=g,n.rr(l+h*170,300,150,180,22),i.fill(),n.text(u,l+h*170+75,390,80,{align:"center",base:"middle",color:d||t.guess===c?"#111":le.dim})}else n.button(f,l+h*170,300,150,180,u,{size:80,onClick:()=>{t.guess=c;let g=Math.abs(c-Math.min(t.snap.within,5));e.answerQuiz(g===0?100:g===1?50:0)}})})}if(t.type==="free"){let r=t.choices.length,l=(n.w-(220*r+24*(r-1)))/2;t.choices.forEach((c,h)=>{let u="f"+h,d=l+h*244,f=c===t.snap.freest;if(t.answered)i.fillStyle=f?le.good:t.guess===c?le.bad:le.card,n.rr(d,260,220,260,26),i.fill(),n.text(String(c.number),d+110,380,130,{align:"center",base:"middle",weight:800,color:f||t.guess===c?"#111":le.dim}),n.text(`${c.space.toFixed(0)} M`,d+110,490,36,{align:"center",color:f||t.guess===c?"#111":le.dim});else n.button(u,d,260,220,260,String(c.number),{size:130,r:26,onClick:()=>{t.guess=c;let g=t.snap.freest.space||1;e.answerQuiz(c===t.snap.freest?100:Math.round(Lh(c.space/g*60,0,60)))}})})}}}var da=1.7;class Uh{constructor(){let e=new xo({antialias:!0});e.setPixelRatio(Math.min(devicePixelRatio,2)),e.setSize(innerWidth,innerHeight),e.xr.enabled=!0,e.xr.setReferenceSpaceType("local-floor"),e.xr.setFoveation(1),document.body.appendChild(e.domElement),this.renderer=e,this.scene=new yo,this.camera=new Tt(75,innerWidth/innerHeight,0.05,600),this.camera.rotation.order="YXZ",this.camera.position.y=da,this.rig=new vt,this.rig.add(this.camera),this.scene.add(this.rig),vh(this.scene),this.world=new ta(this.scene,this.rig,this.camera),this.audio=new oa,this.pointer=new ra,this.panel=new xr(this.scene,1280,800,2),this.bar=new xr(this.scene,1280,430,1.5),this.pointer.panels.push(this.panel,this.bar),this.fade=new Me(new ln(0.3,16,12),new at({color:0,side:Ul,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1})),this.fade.renderOrder=9,this.camera.add(this.fade),this.fadeTo=0,this.screen="home",this.careerStage=0,this.practiceOpts={role:"CM",difficulty:"MEDIUM",quiz:"QUIZ SOME",reps:10},this.session=null,this.mode="boot",this.inXR=!1,this.xrSupported=!1,this.look={yaw:0,pitch:0},this.setupDesktopInput(),this.setupXR(),this.applySettings(),this.toMenuView(),this.go("home"),this.clock=new Oo,e.setAnimationLoop(()=>this.frame()),this.step=(t,n=30)=>{for(let i=0;i<t*n;i++)this.frame(1/n)},addEventListener("resize",()=>{this.camera.aspect=innerWidth/innerHeight,this.camera.updateProjectionMatrix(),e.setSize(innerWidth,innerHeight)})}setupDesktopInput(){let e=this.renderer.domElement;this.mouse=new ue(0,0),this.mouseActive=!1;let t=null;e.addEventListener("pointerdown",(n)=>{this.mouse.set(n.clientX/innerWidth*2-1,-(n.clientY/innerHeight)*2+1),this.mouseActive=!0,t={x:n.clientX,y:n.clientY,moved:0},e.setPointerCapture(n.pointerId)}),e.addEventListener("pointermove",(n)=>{if(this.mouse.set(n.clientX/innerWidth*2-1,-(n.clientY/innerHeight)*2+1),this.mouseActive=!0,t&&!this.inXR){let{movementX:i,movementY:s}=n;if(t.moved+=Math.abs(i)+Math.abs(s),t.moved>6)this.look.yaw-=i*0.004,this.look.pitch=ai.clamp(this.look.pitch-s*0.004,-1.35,1.2)}}),e.addEventListener("pointerup",()=>{if(t&&t.moved<=6)this.select(this.mouseRay());t=null}),addEventListener("keydown",(n)=>{if(this.audio.unlock(),n.key==="Escape")this.mode==="paused"?this.resume():this.pauseGame();let i={ArrowLeft:1,a:1,ArrowRight:-1,d:-1}[n.key];if(i)this.keyTurn=i}),addEventListener("keyup",(n)=>{if(["ArrowLeft","a","ArrowRight","d"].includes(n.key))this.keyTurn=0})}mouseRay(){let e=new xs;return e.setFromCamera(this.mouse,this.camera),{origin:e.ray.origin.clone(),dir:e.ray.direction.clone(),src:"mouse"}}setupXR(){if(navigator.xr)navigator.xr.isSessionSupported("immersive-vr").then((t)=>{this.xrSupported=t,document.body.classList.toggle("desk",!t),this.redraw()}).catch(()=>{});else document.body.classList.add("desk");let e=new Ko;this.controllers=[0,1].map((t)=>{let n=this.renderer.xr.getController(t),i=new ut().setFromPoints([new w(0,0,0),new w(0,0,-1)]),s=new _n(i,new gn({color:16777215,transparent:!0,opacity:0.6}));s.scale.z=5,n.add(s);let r=new Me(new ln(0.012,10,8),new at({color:16777215,depthTest:!1}));r.renderOrder=11,r.visible=!1,this.scene.add(r),n.userData={line:s,dot:r,index:t,connected:!1},n.addEventListener("connected",(a)=>{n.userData.connected=!0,n.userData.source=a.data}),n.addEventListener("disconnected",()=>{n.userData.connected=!1}),n.addEventListener("selectstart",()=>{this.activeCtrl=t,this.audio.unlock(),n.userData.heldSince=performance.now(),this.select(this.ctrlRay(n))}),n.addEventListener("selectend",()=>{n.userData.heldSince=null}),n.addEventListener("squeezestart",()=>this.pauseGame()),this.rig.add(n);let o=this.renderer.xr.getControllerGrip(t);return o.add(e.createControllerModel(o)),this.rig.add(o),n}),this.activeCtrl=null,this.renderer.xr.addEventListener("sessionstart",()=>{this.inXR=!0,document.body.classList.add("xr"),this.camera.position.set(0,0,0),this.camera.rotation.set(0,0,0),this.applySettings(),setTimeout(()=>{this.applySettings(),this.reanchor()},400),this.renderer.xr.getReferenceSpace()?.addEventListener("reset",()=>this.reanchor()),this.redraw()}),this.renderer.xr.addEventListener("sessionend",()=>{this.inXR=!1,document.body.classList.remove("xr"),this.camera.position.set(0,da,0),this.rig.position.y=0,this.look.pitch=0,this.reanchor(),this.redraw()})}async enterVR(){if(!navigator.xr||this.inXR)return;this.audio.unlock();try{let e=await navigator.xr.requestSession("immersive-vr",{optionalFeatures:["local-floor","bounded-floor","hand-tracking"]});await this.renderer.xr.setSession(e)}catch(e){console.warn("VR failed",e)}}ctrlRay(e){let t=e.matrixWorld,n=new w().setFromMatrixPosition(t),i=new w(0,0,-1).transformDirection(t);return{origin:n,dir:i,src:e}}rays(){if(!this.inXR)return this.mouseActive?[this.mouseRay()]:[];return this.controllers.filter((e)=>e.userData.connected).map((e)=>this.ctrlRay(e))}activeRay(){if(!this.inXR)return this.mouseActive?this.mouseRay():null;let e=this.controllers[this.activeCtrl];if(e?.userData.connected)return this.ctrlRay(e);let t=this.controllers.find((n)=>n.userData.connected&&n.userData.source?.handedness==="right")||this.controllers.find((n)=>n.userData.connected);return t?this.ctrlRay(t):null}select(e){if(this.audio.unlock(),!e)return;let t=this.pointer.hitPanels(e.origin,e.dir);if(t&&t.b){this.audio.ui(),t.b.onClick(t.x,t.y);return}if(t)return;if(this.mode==="play"&&this.rep)this.rep.aim(e.origin,e.dir),this.rep.select()}pollButtons(){if(!this.inXR)return;for(let t of this.controllers){let n=t.userData.heldSince;if(n&&performance.now()-n>1000&&["play","quiz"].includes(this.mode)&&!this.pointer.hitPanels(...Object.values(this.ctrlRay(t)).slice(0,2)))t.userData.heldSince=null,this.pauseGame()}let e=this.renderer.xr.getSession();if(!e)return;for(let t of e.inputSources){let n=t.gamepad?.buttons;if(!n)continue;let i=n[4]?.pressed||n[5]?.pressed,s=t.handedness;if(this.btnPrev=this.btnPrev||{},i&&!this.btnPrev[s]){if(this.mode==="play"||this.mode==="quiz")this.pauseGame();else if(this.mode==="paused")this.resume()}this.btnPrev[s]=i}}applySettings(){let e=Ke.settings;this.audio.setVolume(e.volume),this.audio.ticks=e.ticks,this.rig.position.y=this.eyeOffset()}eyeOffset(){if(!this.inXR||!Ke.settings.seated)return 0;return Math.max(0,1.65-(this.camera.position.y||1.2))}headPos(){let e=new w;return this.camera.getWorldPosition(e),e}toMenuView(){this.world.placeUser(new w(0,0,-37.5),0)}reanchor(){if(this.mode==="menu"||this.mode==="summary"){this.toMenuView(),this.placePanel();return}let e=this.rep;if(e&&e.userBody&&this.mode!=="replay"){if(this.world.placeUser(e.userBody.pos,Math.atan2(this.world.ball.pos.x-e.userBody.pos.x,this.world.ball.pos.z-e.userBody.pos.z)),this.panel.mesh.visible)this.placePanel()}}placePanel(e=-0.1,t=2.3){let n=this.world.headYaw();this.panel.placeFacing(this.headPos(),n,t,e)}go(e){let t=this.mode==="menu";if(this.screen=e,this.mode="menu",this.rep=null,this.quiz=null,this.session=null,this.endReplay(),this.bar.hide(),this.panel.show(ha[e](this)),!t)this.world.clearOverlays(),this.world.idle(),this.toMenuView(),this.setFade(1,!0),this.setFade(0),this.placePanel()}redraw(){if(this.panel.mesh.visible)this.panel.redraw()}startCareer(e){let t=Gi[e];this.beginSession({level:e,role:t.role,difficulty:t.difficulty,reps:t.reps,quizChance:t.quizChance})}startPractice(){let e=this.practiceOpts,t={"QUIZ OFF":0,"QUIZ SOME":0.3,"QUIZ EVERY REP":1}[e.quiz];this.beginSession({level:null,role:e.role,difficulty:e.difficulty,reps:e.reps,quizChance:t})}again(){this.beginSession({...this.lastSessionOpts})}beginSession(e){this.lastSessionOpts=e,this.session={...e,index:0,results:[]},this.panel.hide(),this.startRep()}startRep(){let e=this.session,t=e.quizChance>=1||Math.random()<e.quizChance||e.quizChance>0.5&&e.index===e.reps-1&&!e.results.some((n)=>n.memory!=null);this.rep=new sa(this.world,{role:e.role,difficulty:e.difficulty,quiz:t,motion:Ke.settings.motion,fx:{kick:(n)=>this.audio.kick(n),touch:()=>this.audio.touch(),tick:()=>this.audio.tick(),whistle:()=>this.audio.whistle(),cheer:(n)=>this.audio.cheer(n),groan:()=>this.audio.groan(),ui:()=>this.audio.ui()}}),this.mode="play",this.panel.hide(),this.quiz=null,this.setFade(1,!0),this.rep.start(),this.look.pitch=0,this.setFade(0),this.holdT=0.6}setFade(e,t=!1){if(this.fadeTo=e,t)this.fade.material.opacity=e}pauseGame(){if(this.mode!=="play"&&this.mode!=="quiz")return;this.pausedFrom=this.mode,this.mode="paused",this.panel.show(aa(this)),this.placePanel()}resume(){if(this.mode!=="paused")return;if(this.mode=this.pausedFrom||"play",this.mode==="quiz"&&this.quiz)this.panel.show(ua(this,this.quiz)),this.placePanel(-0.05,2.1);else this.panel.hide()}quitSession(){this.go("home")}answerQuiz(e){let t=this.quiz;if(!t||t.answered)return;t.answered=!0,t.score=e,this.audio.ui(),this.panel.redraw(),setTimeout(()=>{if(this.quiz!==t)return;this.panel.hide(),this.quiz=null,this.setFade(0),this.rep.endQuiz(e),this.mode="play"},1700)}showCard(){let e=this.session,t=this.rep.result;e.results.push(t),this.mode="card",this.cardCountdown=e.index+1<e.reps?6:null,this.cardTimer=0,this.drawCard(),this.placePanel(-0.15,2.2)}drawCard(){let e=this.session;this.panel.show(la(this,this.rep.result,e.index,e.reps,this.cardCountdown==null?null:Math.ceil(this.cardCountdown)))}nextRep(){let e=this.session;if(this.endReplay(),e.index++,e.index>=e.reps)return this.finishSession();this.startRep()}finishSession(){let e=this.session,t=e.results,n=(o)=>{let a=t.map(o).filter((l)=>l!=null);return a.length?Math.round(a.reduce((l,c)=>l+c,0)/a.length):null},i={date:Date.now(),level:e.level,role:e.role,difficulty:e.difficulty,reps:t.length,score:n((o)=>o.total),scan:n((o)=>o.scanScore),decision:n((o)=>o.decision),memory:n((o)=>o.memory),scanRate:t.reduce((o,a)=>o+a.scanRate,0)/t.length,completed:t.filter((o)=>["completed","tight","goal"].includes(o.outcome)).length};Ke.recordSession(i);let s=Ke.starsFor(i.score),r=e.level!=null&&e.level<Gi.length-1&&Ke.unlocked(e.level+1)?e.level+1:null;this.audio.whistle(!0),this.mode="summary",this.rep=null,this.world.clearOverlays(),this.world.idle(),this.toMenuView(),this.panel.show(ca(this,i,s,r)),this.placePanel()}openReplay(){let e=this.rep;if(!e?.frames.length)return;this.mode="replay",this.cardCountdown=null,this.replay={t:e.frames[0].t,playing:!0,view:"above",speed:0.6},e.userBody.setVisible(!0),this.showReplayPanel(),this.setReplayView("above")}showReplayPanel(){let e=this.replay,t=this.rep,n=t.frames[0].t,i=t.frames.at(-1).t;this.panel.hide(),this.bar.show((s)=>{s.bg();let r=60,o=s.w-120,a=120;s.text("REPLAY",r,92,60,{weight:800}),s.text(`${(e.t-n).toFixed(1)} S`,s.w-60,92,44,{align:"right",color:"rgba(242,240,232,0.55)"}),s.g.fillStyle="rgba(242,240,232,0.12)",s.rr(r,a+30,o,16,8),s.g.fill();let l=(d)=>r+(d-n)/(i-n||1)*o;s.g.fillStyle="#f2f0e8",s.rr(r,a+30,l(e.t)-r,16,8),s.g.fill();for(let d of t.scans)s.g.fillStyle=d.shoulder?"#4fd88a":"#ffe08a",s.g.fillRect(l(d.t)-3,a+6,6,64);for(let d of t.events){if(!["final","receive","decide","lost"].includes(d.type))continue;s.g.fillStyle=d.type==="lost"?"#ff5a4f":"#ff7a1a",s.g.beginPath(),s.g.arc(l(d.t),a+38,14,0,Math.PI*2),s.g.fill()}s.hit("scrub",r,a,o,80,(d)=>{e.t=n+(d-r)/o*(i-n),e.playing=!1,this.bar.redraw()});let c=[["SCAN","#ffe08a"],["SHOULDER CHECK","#4fd88a"],["BEST PASS","#4fd88a"],["YOUR PASS","#f2f0e8"]],h=r;c.forEach(([d,f],g)=>{if(s.g.fillStyle=f,g<2)s.g.fillRect(h,238,6,30);else s.g.fillRect(h,250,30,6);h+=g<2?18:42,h+=s.text(d,h,264,30,{color:"rgba(242,240,232,0.7)",weight:600})+34});let u=(o-60)/4;s.button("pp",r,310,u,100,e.playing?"PAUSE":"PLAY",{size:40,onClick:()=>{if(e.playing=!e.playing,e.t>=i)e.t=n;this.bar.redraw()}}),s.button("va",r+(u+20),310,u,100,"ABOVE",{size:40,active:e.view==="above",onClick:()=>this.setReplayView("above")}),s.button("vp",r+(u+20)*2,310,u,100,"ON PITCH",{size:40,active:e.view==="pitch",onClick:()=>this.setReplayView("pitch")}),s.button("done",r+(u+20)*3,310,u,100,"DONE",{primary:!0,size:40,onClick:()=>this.closeReplay()})})}setReplayView(e){let t=this.replay,n=this.rep;this.setFade(1,!0),this.setFade(0),t.view=e;let i=n.frames.find((a)=>n.events.find((l)=>l.type==="receive")?a.t>=n.events.find((l)=>l.type==="receive").t:!0)||n.frames.at(-1),s=i.f[0],r=i.f[1],o=Math.atan2(i.f[3]-s,i.f[5]-r);if(e==="above"){let a=new w(s-Math.sin(o)*9,0,r-Math.cos(o)*9);if(this.world.placeUser(a,o),this.rig.position.y=this.inXR?11:11-da+1.7,!this.inXR)this.look.pitch=-0.75}else if(this.rig.position.y=this.eyeOffset(),this.world.placeUser(new w(s,0,r),o),!this.inXR)this.look.pitch=0;if(this.rig.updateMatrixWorld(!0),!this.inXR)this.camera.rotation.set(this.look.pitch,this.look.yaw,0);this.camera.updateMatrixWorld(!0),this.bar.redraw(),this.placeAlongGaze(this.bar,2,0.42)}placeAlongGaze(e,t,n){let i=this.headPos(),s=new w;this.camera.getWorldDirection(s);let r=new w().crossVectors(s,new w(0,1,0)).normalize();s.applyAxisAngle(r,-n),e.mesh.position.copy(i).addScaledVector(s,t),e.mesh.lookAt(i)}replayStep(e){let t=this.replay,n=this.rep,i=n.frames,s=i[0].t,r=i.at(-1).t;if(t.playing){if(t.t+=e*t.speed,t.t>=r)t.t=r,t.playing=!1,this.bar.redraw()}let o=i.findIndex((_)=>_.t>=t.t);if(o<0)o=i.length-1;let a=i[Math.max(0,o-1)],l=i[o],c=l.t>a.t?(t.t-a.t)/(l.t-a.t):0,h=(_)=>a.f[_]+(l.f[_]-a.f[_])*c,u=(_)=>{let p=l.f[_]-a.f[_];return p=Math.atan2(Math.sin(p),Math.cos(p)),a.f[_]+p*c};this.world.ball.set(h(3),h(5),h(4)),[...n.home,...n.away].forEach((_,p)=>{let m=6+p*3,v=h(m),x=h(m+1),T=Math.hypot(v-_.pos.x,x-_.pos.z)/Math.max(e,0.001);_.pos.set(v,0,x),_.heading=u(m+2),_.animate(e*t.speed,t.playing?Math.min(8,T):0),_.sync()});let f=this.world;f.cone.visible=!0,f.cone.position.set(h(0),0.03,h(1)),f.cone.rotation.y=u(2);let g=n.events.find((_)=>_.type==="decide"||_.type==="lost");if(g&&t.t>=g.t-0.05){let _=n.result.best,p=n.result.chosen,m={x:h(0),z:h(1)},v=(x)=>x.kind==="shot"?{x:52.5,z:0}:x.target.pos;f.setLine(f.bestLine,_?m:null,_?v(_):null),f.setLine(f.choiceLine,p?m:null,p?v(p):null)}else f.setLine(f.bestLine,null,null),f.setLine(f.choiceLine,null,null);if(this.replayRedrawT=(this.replayRedrawT||0)-e,t.playing&&this.replayRedrawT<=0)this.replayRedrawT=0.1,this.bar.redraw()}closeReplay(){this.endReplay(),this.mode="card",this.drawCard(),this.placePanel(-0.15,2.2)}endReplay(){if(!this.replay)return;if(this.replay=null,this.bar.hide(),this.world.clearOverlays(),this.rig.position.y=this.eyeOffset(),!this.inXR)this.look.pitch=0;let e=this.rep;if(e){e.userBody.setVisible(!1);let t=e.frames.at(-1).f;this.world.placeUser(new w(t[0],0,t[1]),this.world.headYaw()),this.setFade(1,!0),this.setFade(0)}}frame(e){let t=e??Math.min(0.05,this.clock.getDelta());if(!this.inXR){if(this.keyTurn)this.look.yaw+=this.keyTurn*t*2.4;this.camera.rotation.set(this.look.pitch,this.look.yaw,0)}this.pollButtons();let n=this.fade.material;if(n.opacity+=(this.fadeTo-n.opacity)*Math.min(1,t*8),this.fade.visible=n.opacity>0.01,this.mode==="menu"||this.mode==="summary")this.world.idleStep(t);if(this.mode==="play"&&this.rep){if(this.holdT>0)this.holdT-=t;else this.rep.update(t);let i=this.activeRay();if(i)this.rep.aim(i.origin,i.dir);if(this.rep.state==="quiz"&&!this.quiz)this.quiz=Nh(this.rep.snapshot),this.mode="quiz",this.setFade(1),this.panel.show(ua(this,this.quiz)),this.placePanel(-0.05,2.1);if(this.rep.state==="done")this.showCard()}if(this.mode==="card"&&this.cardCountdown!=null){let i=Math.ceil(this.cardCountdown);if(this.cardCountdown-=t,this.cardCountdown<=0)this.nextRep();else if(Math.ceil(this.cardCountdown)!==i)this.drawCard()}if(this.mode==="replay")this.replayStep(t);this.updatePointers(),this.renderer.render(this.scene,this.camera)}updatePointers(){let e=this.rays(),t=null,n=null,i=null;for(let s of this.controllers)s.userData.dot.visible=!1;for(let s of e){let r=this.pointer.hitPanels(s.origin,s.dir);if(s.src!=="mouse"){let o=s.src.userData;if(o.line.scale.z=r?r.distance:this.mode==="play"?30:5,o.line.material.opacity=r||this.mode!=="play"?0.6:0.3,r)o.dot.visible=!0,o.dot.position.copy(r.point)}if(r){if(r.b&&!t)t=r.b.id,n=r.panel;if(r.b?.id==="map")i={x:r.x,y:r.y}}}if(!this.inXR)this.renderer.domElement.style.cursor=t?"pointer":"grab";if(i){let s=performance.now();if((!this.quizCursor||Math.hypot(i.x-this.quizCursor.x,i.y-this.quizCursor.y)>2)&&s-(this.cursorDrawn||0)>60)this.quizCursor=i,this.cursorDrawn=s,this.panel.redraw()}for(let s of this.pointer.panels)s.setHover(s===n?t:null)}}var d0=Promise.race([Promise.all(['800 40px "Barlow Condensed"','700 40px "Barlow Condensed"','600 40px "Barlow Condensed"'].map((e)=>document.fonts.load(e))),new Promise((e)=>setTimeout(e,2500))]);d0.then(()=>{window.app=new Uh,document.getElementById("boot")?.remove()});
