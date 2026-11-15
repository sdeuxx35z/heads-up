var Tu=Object.defineProperty;var bu=(t)=>t;function wu(t,e){this[t]=bu.bind(null,e)}var Au=(t,e)=>{for(var n in e)Tu(t,n,{get:e[n],enumerable:!0,configurable:!0,set:wu.bind(e,n)})};var cc=0,hc=1,qi=2;var Yi=1000,uc=1001,dc=1002,Io=1003,fc=1004;var pc=1005;var Zi=1006,mc=1007;var Po=1008;var gc=2300,Lo=2301;var _c=0,Tr=1,ws=2;var Be="srgb",Tn="srgb-linear";class pi{addEventListener(t,e){if(this._listeners===void 0)this._listeners={};let n=this._listeners;if(n[t]===void 0)n[t]=[];if(n[t].indexOf(e)===-1)n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let s=i.indexOf(e);if(s!==-1)i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,t);t.target=null}}}var Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qa=1234567,gs=Math.PI/180,Vi=180/Math.PI;function Ke(){let t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Le[t&255]+Le[t>>8&255]+Le[t>>16&255]+Le[t>>24&255]+"-"+Le[e&255]+Le[e>>8&255]+"-"+Le[e>>16&15|64]+Le[e>>24&255]+"-"+Le[n&63|128]+Le[n>>8&255]+"-"+Le[n>>16&255]+Le[n>>24&255]+Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]).toLowerCase()}function Me(t,e,n){return Math.max(e,Math.min(n,t))}function No(t,e){return(t%e+e)%e}function Ru(t,e,n,i,s){return i+(t-e)*(s-i)/(n-e)}function Cu(t,e,n){if(t!==e)return(n-t)/(e-t);else return 0}function _s(t,e,n){return(1-n)*t+n*e}function Iu(t,e,n,i){return _s(t,e,1-Math.exp(-n*i))}function Pu(t,e=1){return e-Math.abs(No(t,e*2)-e)}function Lu(t,e,n){if(t<=e)return 0;if(t>=n)return 1;return t=(t-e)/(n-e),t*t*(3-2*t)}function Nu(t,e,n){if(t<=e)return 0;if(t>=n)return 1;return t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10)}function Du(t,e){return t+Math.floor(Math.random()*(e-t+1))}function Uu(t,e){return t+Math.random()*(e-t)}function Fu(t){return t*(0.5-Math.random())}function Ou(t){if(t!==void 0)qa=t;let e=qa+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Bu(t){return t*gs}function zu(t){return t*Vi}function Hu(t){return(t&t-1)===0&&t!==0}function ku(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function Gu(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function Vu(t,e,n,i,s){let{cos:r,sin:o}=Math,a=r(n/2),l=o(n/2),c=r((e+i)/2),h=o((e+i)/2),u=r((e-i)/2),d=o((e-i)/2),f=r((i-e)/2),g=o((i-e)/2);switch(s){case"XYX":t.set(a*h,l*u,l*d,a*c);break;case"YZY":t.set(l*d,a*h,l*u,a*c);break;case"ZXZ":t.set(l*u,l*d,a*h,a*c);break;case"XZX":t.set(a*h,l*g,l*f,a*c);break;case"YXY":t.set(l*f,a*h,l*g,a*c);break;case"ZYZ":t.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ln(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw Error("Invalid component type.")}}function se(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw Error("Invalid component type.")}}var Fn={DEG2RAD:gs,RAD2DEG:Vi,generateUUID:Ke,clamp:Me,euclideanModulo:No,mapLinear:Ru,inverseLerp:Cu,lerp:_s,damp:Iu,pingpong:Pu,smoothstep:Lu,smootherstep:Nu,randInt:Du,randFloat:Uu,randFloatSpread:Fu,seededRandom:Ou,degToRad:Bu,radToDeg:zu,isPowerOfTwo:Hu,ceilPowerOfTwo:ku,floorPowerOfTwo:Gu,setQuaternionFromProperEuler:Vu,normalize:se,denormalize:ln};class ot{constructor(t=0,e=0){ot.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,r=this.y-t.y;return this.x=s*n-r*i+t.x,this.y=s*i+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ft{constructor(t,e,n,i,s,r,o,a,l){if(Ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0)this.set(t,e,n,i,s,r,o,a,l)}set(t,e,n,i,s,r,o,a,l){let c=this.elements;return c[0]=t,c[1]=i,c[2]=o,c[3]=e,c[4]=s,c[5]=a,c[6]=n,c[7]=r,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,r=n[0],o=n[3],a=n[6],l=n[1],c=n[4],h=n[7],u=n[2],d=n[5],f=n[8],g=i[0],_=i[3],p=i[6],m=i[1],v=i[4],x=i[7],E=i[2],I=i[5],w=i[8];return s[0]=r*g+o*m+a*E,s[3]=r*_+o*v+a*I,s[6]=r*p+o*x+a*w,s[1]=l*g+c*m+h*E,s[4]=l*_+c*v+h*I,s[7]=l*p+c*x+h*w,s[2]=u*g+d*m+f*E,s[5]=u*_+d*v+f*I,s[8]=u*p+d*x+f*w,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],o=t[5],a=t[6],l=t[7],c=t[8];return e*r*c-e*o*l-n*s*c+n*o*a+i*s*l-i*r*a}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],o=t[5],a=t[6],l=t[7],c=t[8],h=c*r-o*l,u=o*a-c*s,d=l*s-r*a,f=e*h+n*u+i*d;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/f;return t[0]=h*g,t[1]=(i*l-c*n)*g,t[2]=(o*n-i*r)*g,t[3]=u*g,t[4]=(c*e-i*a)*g,t[5]=(i*s-o*e)*g,t[6]=d*g,t[7]=(n*a-l*e)*g,t[8]=(r*e-n*s)*g,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,r,o){let a=Math.cos(s),l=Math.sin(s);return this.set(n*a,n*l,-n*(a*r+l*o)+r+t,-i*l,i*a,-i*(-l*r+a*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Vr.makeScale(t,e)),this}rotate(t){return this.premultiply(Vr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Vr.makeTranslation(t,e)),this}makeTranslation(t,e){if(t.isVector2)this.set(1,0,t.x,0,1,t.y,0,0,1);else this.set(1,0,t,0,1,e,0,0,1);return this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}var Vr=new Ft;function xc(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Ms(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function Wu(){let t=Ms("canvas");return t.style.display="block",t}var Ya={};function ps(t){if(t in Ya)return;Ya[t]=!0,console.warn(t)}function Xu(t,e,n){return new Promise(function(i,s){function r(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:s();break;case t.TIMEOUT_EXPIRED:setTimeout(r,n);break;default:i()}}setTimeout(r,n)})}function qu(t){let e=t.elements;e[2]=0.5*e[2]+0.5*e[3],e[6]=0.5*e[6]+0.5*e[7],e[10]=0.5*e[10]+0.5*e[11],e[14]=0.5*e[14]+0.5*e[15]}function Yu(t){let e=t.elements;if(e[11]===-1)e[10]=-e[10]-1,e[14]=-e[14];else e[10]=-e[10],e[14]=-e[14]+1}var Xt={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;if(this.spaces[e].transfer==="srgb")t.r=Dn(t.r),t.g=Dn(t.g),t.b=Dn(t.b);if(this.spaces[e].primaries!==this.spaces[n].primaries)t.applyMatrix3(this.spaces[e].toXYZ),t.applyMatrix3(this.spaces[n].fromXYZ);if(this.spaces[n].transfer==="srgb")t.r=Gi(t.r),t.g=Gi(t.g),t.b=Gi(t.b);return t},fromWorkingColorSpace:function(t,e){return this.convert(t,this.workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this.workingColorSpace)},getPrimaries:function(t){return this.spaces[t].primaries},getTransfer:function(t){if(t==="")return"linear";return this.spaces[t].transfer},getLuminanceCoefficients:function(t,e=this.workingColorSpace){return t.fromArray(this.spaces[e].luminanceCoefficients)},define:function(t){Object.assign(this.spaces,t)},_getMatrix:function(t,e,n){return t.copy(this.spaces[e].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(t){return this.spaces[t].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(t=this.workingColorSpace){return this.spaces[t].workingColorSpaceConfig.unpackColorSpace}};function Dn(t){return t<0.04045?t*0.0773993808:Math.pow(t*0.9478672986+0.0521327014,2.4)}function Gi(t){return t<0.0031308?t*12.92:1.055*Math.pow(t,0.41666)-0.055}var Za=[0.64,0.33,0.3,0.6,0.15,0.06],Ka=[0.2126,0.7152,0.0722],$a=[0.3127,0.329],Ja=new Ft().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),ja=new Ft().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);Xt.define({["srgb-linear"]:{primaries:Za,whitePoint:$a,transfer:"linear",toXYZ:Ja,fromXYZ:ja,luminanceCoefficients:Ka,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Za,whitePoint:$a,transfer:"srgb",toXYZ:Ja,fromXYZ:ja,luminanceCoefficients:Ka,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}});var wi;class yc{static getDataURL(t){if(/^data:/i.test(t.src))return t.src;if(typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{if(wi===void 0)wi=Ms("canvas");wi.width=t.width,wi.height=t.height;let n=wi.getContext("2d");if(t instanceof ImageData)n.putImageData(t,0,0);else n.drawImage(t,0,0,t.width,t.height);e=wi}if(e.width>2048||e.height>2048)return console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",0.6);else return e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ms("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=Dn(s[r]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)if(e instanceof Uint8Array||e instanceof Uint8ClampedArray)e[n]=Math.floor(Dn(e[n]/255)*255);else e[n]=Dn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}var Zu=0;class Do{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Zu++}),this.uuid=Ke(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){if(t===!0)this.version++}toJSON(t){let e=t===void 0||typeof t==="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,o=i.length;r<o;r++)if(i[r].isDataTexture)s.push(Wr(i[r].image));else s.push(Wr(i[r]))}else s=Wr(i);n.url=s}if(!e)t.images[this.uuid]=n;return n}}function Wr(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap)return yc.getDataURL(t);else if(t.data)return{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name};else return console.warn("THREE.Texture: Unable to serialize Texture."),{}}var Ku=0;class Se extends pi{constructor(t=Se.DEFAULT_IMAGE,e=Se.DEFAULT_MAPPING,n=1001,i=1001,s=1006,r=1008,o=1023,a=1009,l=Se.DEFAULT_ANISOTROPY,c=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=Ke(),this.name="",this.source=new Do(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=a,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t==="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)n.userData=this.userData;if(!e)t.textures[this.uuid]=n;return n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==300)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case 1000:t.x=t.x-Math.floor(t.x);break;case 1001:t.x=t.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(t.x)%2)===1)t.x=Math.ceil(t.x)-t.x;else t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case 1000:t.y=t.y-Math.floor(t.y);break;case 1001:t.y=t.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(t.y)%2)===1)t.y=Math.ceil(t.y)-t.y;else t.y=t.y-Math.floor(t.y);break}if(this.flipY)t.y=1-t.y;return t}set needsUpdate(t){if(t===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(t){if(t===!0)this.pmremVersion++}}Se.DEFAULT_IMAGE=null;Se.DEFAULT_MAPPING=300;Se.DEFAULT_ANISOTROPY=1;class $t{constructor(t=0,e=0,n=0,i=1){$t.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*e+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*e+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*e+r[7]*n+r[11]*i+r[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);if(e<0.0001)this.x=1,this.y=0,this.z=0;else this.x=t.x/e,this.y=t.y/e,this.z=t.z/e;return this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,r=0.01,o=0.1,a=t.elements,l=a[0],c=a[4],h=a[8],u=a[1],d=a[5],f=a[9],g=a[2],_=a[6],p=a[10];if(Math.abs(c-u)<0.01&&Math.abs(h-g)<0.01&&Math.abs(f-_)<0.01){if(Math.abs(c+u)<0.1&&Math.abs(h+g)<0.1&&Math.abs(f+_)<0.1&&Math.abs(l+d+p-3)<0.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(l+1)/2,x=(d+1)/2,E=(p+1)/2,I=(c+u)/4,w=(h+g)/4,A=(f+_)/4;if(v>x&&v>E)if(v<0.01)n=0,i=0.707106781,s=0.707106781;else n=Math.sqrt(v),i=I/n,s=w/n;else if(x>E)if(x<0.01)n=0.707106781,i=0,s=0.707106781;else i=Math.sqrt(x),n=I/i,s=A/i;else if(E<0.01)n=0.707106781,i=0.707106781,s=0;else s=Math.sqrt(E),n=w/s,i=A/s;return this.set(n,i,s,e),this}let m=Math.sqrt((_-f)*(_-f)+(h-g)*(h-g)+(u-c)*(u-c));if(Math.abs(m)<0.001)m=1;return this.x=(_-f)/m,this.y=(h-g)/m,this.z=(u-c)/m,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class vc extends pi{constructor(t=1,e=1,n={}){super();this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new $t(0,0,t,e),this.scissorTest=!1,this.viewport=new $t(0,0,t,e);let i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new Se(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let r=n.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);if(this.texture.source=new Do(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null)this.depthTexture=t.depthTexture.clone();return this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $n extends vc{constructor(t=1,e=1,n={}){super(t,e,n);this.isWebGLRenderTarget=!0}}class Uo extends Se{constructor(t=null,e=1,n=1,i=1){super(null);this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Sc extends Se{constructor(t=null,e=1,n=1,i=1){super(null);this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $e{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,r,o){let a=n[i+0],l=n[i+1],c=n[i+2],h=n[i+3],u=s[r+0],d=s[r+1],f=s[r+2],g=s[r+3];if(o===0){t[e+0]=a,t[e+1]=l,t[e+2]=c,t[e+3]=h;return}if(o===1){t[e+0]=u,t[e+1]=d,t[e+2]=f,t[e+3]=g;return}if(h!==g||a!==u||l!==d||c!==f){let _=1-o,p=a*u+l*d+c*f+h*g,m=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let E=Math.sqrt(v),I=Math.atan2(E,p*m);_=Math.sin(_*I)/E,o=Math.sin(o*I)/E}let x=o*m;if(a=a*_+u*x,l=l*_+d*x,c=c*_+f*x,h=h*_+g*x,_===1-o){let E=1/Math.sqrt(a*a+l*l+c*c+h*h);a*=E,l*=E,c*=E,h*=E}}t[e]=a,t[e+1]=l,t[e+2]=c,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,s,r){let o=n[i],a=n[i+1],l=n[i+2],c=n[i+3],h=s[r],u=s[r+1],d=s[r+2],f=s[r+3];return t[e]=o*f+c*h+a*d-l*u,t[e+1]=a*f+c*u+l*h-o*d,t[e+2]=l*f+c*d+o*u-a*h,t[e+3]=c*f-o*h-a*u-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let{_x:n,_y:i,_z:s,_order:r}=t,o=Math.cos,a=Math.sin,l=o(n/2),c=o(i/2),h=o(s/2),u=a(n/2),d=a(i/2),f=a(s/2);switch(r){case"XYZ":this._x=u*c*h+l*d*f,this._y=l*d*h-u*c*f,this._z=l*c*f+u*d*h,this._w=l*c*h-u*d*f;break;case"YXZ":this._x=u*c*h+l*d*f,this._y=l*d*h-u*c*f,this._z=l*c*f-u*d*h,this._w=l*c*h+u*d*f;break;case"ZXY":this._x=u*c*h-l*d*f,this._y=l*d*h+u*c*f,this._z=l*c*f+u*d*h,this._w=l*c*h-u*d*f;break;case"ZYX":this._x=u*c*h-l*d*f,this._y=l*d*h+u*c*f,this._z=l*c*f-u*d*h,this._w=l*c*h+u*d*f;break;case"YZX":this._x=u*c*h+l*d*f,this._y=l*d*h+u*c*f,this._z=l*c*f-u*d*h,this._w=l*c*h-u*d*f;break;case"XZY":this._x=u*c*h-l*d*f,this._y=l*d*h-u*c*f,this._z=l*c*f+u*d*h,this._w=l*c*h+u*d*f;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}if(e===!0)this._onChangeCallback();return this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],h=e[10],u=n+o+h;if(u>0){let d=0.5/Math.sqrt(u+1);this._w=0.25/d,this._x=(c-a)*d,this._y=(s-l)*d,this._z=(r-i)*d}else if(n>o&&n>h){let d=2*Math.sqrt(1+n-o-h);this._w=(c-a)/d,this._x=0.25*d,this._y=(i+r)/d,this._z=(s+l)/d}else if(o>h){let d=2*Math.sqrt(1+o-n-h);this._w=(s-l)/d,this._x=(i+r)/d,this._y=0.25*d,this._z=(a+c)/d}else{let d=2*Math.sqrt(1+h-n-o);this._w=(r-i)/d,this._x=(s+l)/d,this._y=(a+c)/d,this._z=0.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;if(n<Number.EPSILON)if(n=0,Math.abs(t.x)>Math.abs(t.z))this._x=-t.y,this._y=t.x,this._z=0,this._w=n;else this._x=0,this._y=-t.z,this._z=t.y,this._w=n;else this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n;return this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Me(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();if(t===0)this._x=0,this._y=0,this._z=0,this._w=1;else t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t;return this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let{_x:n,_y:i,_z:s,_w:r}=t,o=e._x,a=e._y,l=e._z,c=e._w;return this._x=n*c+r*o+i*l-s*a,this._y=i*c+r*a+s*o-n*l,this._z=s*c+r*l+n*a-i*o,this._w=r*c-n*o-i*a-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,s=this._z,r=this._w,o=r*t._w+n*t._x+i*t._y+s*t._z;if(o<0)this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o;else this.copy(t);if(o>=1)return this._w=r,this._x=n,this._y=i,this._z=s,this;let a=1-o*o;if(a<=Number.EPSILON){let d=1-e;return this._w=d*r+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}let l=Math.sqrt(a),c=Math.atan2(l,o),h=Math.sin((1-e)*c)/l,u=Math.sin(e*c)/l;return this._w=r*h+this._w*u,this._x=n*h+this._x*u,this._y=i*h+this._y*u,this._z=s*h+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class b{constructor(t=0,e=0,n=0){b.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){if(n===void 0)n=this.z;return this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Qa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Qa.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,r=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,r=t.y,o=t.z,a=t.w,l=2*(r*i-o*n),c=2*(o*e-s*i),h=2*(s*n-r*e);return this.x=e+a*l+r*h-o*c,this.y=n+a*c+o*l-s*h,this.z=i+a*h+s*c-r*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let{x:n,y:i,z:s}=t,r=e.x,o=e.y,a=e.z;return this.x=i*a-s*o,this.y=s*r-n*a,this.z=n*o-i*r,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Xr.copy(this).projectOnVector(t),this.sub(Xr)}reflect(t){return this.sub(Xr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var Xr=new b,Qa=new $e;class un{constructor(t=new b(1/0,1/0,1/0),e=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(rn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(rn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=rn.copy(e).multiplyScalar(0.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++){if(t.isMesh===!0)t.getVertexPosition(r,rn);else rn.fromBufferAttribute(s,r);rn.applyMatrix4(t.matrixWorld),this.expandByPoint(rn)}else{if(t.boundingBox!==void 0){if(t.boundingBox===null)t.computeBoundingBox();Ws.copy(t.boundingBox)}else{if(n.boundingBox===null)n.computeBoundingBox();Ws.copy(n.boundingBox)}Ws.applyMatrix4(t.matrixWorld),this.union(Ws)}}let i=t.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,rn),rn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;if(t.normal.x>0)e=t.normal.x*this.min.x,n=t.normal.x*this.max.x;else e=t.normal.x*this.max.x,n=t.normal.x*this.min.x;if(t.normal.y>0)e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y;else e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y;if(t.normal.z>0)e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z;else e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z;return e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(os),Xs.subVectors(this.max,os),Ai.subVectors(t.a,os),Ri.subVectors(t.b,os),Ci.subVectors(t.c,os),Gn.subVectors(Ri,Ai),Vn.subVectors(Ci,Ri),ri.subVectors(Ai,Ci);let e=[0,-Gn.z,Gn.y,0,-Vn.z,Vn.y,0,-ri.z,ri.y,Gn.z,0,-Gn.x,Vn.z,0,-Vn.x,ri.z,0,-ri.x,-Gn.y,Gn.x,0,-Vn.y,Vn.x,0,-ri.y,ri.x,0];if(!qr(e,Ai,Ri,Ci,Xs))return!1;if(e=[1,0,0,0,1,0,0,0,1],!qr(e,Ai,Ri,Ci,Xs))return!1;return qs.crossVectors(Gn,Vn),e=[qs.x,qs.y,qs.z],qr(e,Ai,Ri,Ci,Xs)}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,rn).distanceTo(t)}getBoundingSphere(t){if(this.isEmpty())t.makeEmpty();else this.getCenter(t.center),t.radius=this.getSize(rn).length()*0.5;return t}intersect(t){if(this.min.max(t.min),this.max.min(t.max),this.isEmpty())this.makeEmpty();return this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){if(this.isEmpty())return this;return Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Rn),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}var Rn=[new b,new b,new b,new b,new b,new b,new b,new b],rn=new b,Ws=new un,Ai=new b,Ri=new b,Ci=new b,Gn=new b,Vn=new b,ri=new b,os=new b,Xs=new b,qs=new b,oi=new b;function qr(t,e,n,i,s){for(let r=0,o=t.length-3;r<=o;r+=3){oi.fromArray(t,r);let a=s.x*Math.abs(oi.x)+s.y*Math.abs(oi.y)+s.z*Math.abs(oi.z),l=e.dot(oi),c=n.dot(oi),h=i.dot(oi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var $u=new un,as=new b,Yr=new b;class Je{constructor(t=new b,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;if(e!==void 0)n.copy(e);else $u.setFromPoints(t).getCenter(n);let i=0;for(let s=0,r=t.length;s<r;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);if(e.copy(t),n>this.radius*this.radius)e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center);return e}getBoundingBox(t){if(this.isEmpty())return t.makeEmpty(),t;return t.set(this.center,this.center),t.expandByScalar(this.radius),t}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;as.subVectors(t,this.center);let e=as.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*0.5;this.center.addScaledVector(as,i/n),this.radius+=i}return this}union(t){if(t.isEmpty())return this;if(this.isEmpty())return this.copy(t),this;if(this.center.equals(t.center)===!0)this.radius=Math.max(this.radius,t.radius);else Yr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(as.copy(t.center).add(Yr)),this.expandByPoint(as.copy(t.center).sub(Yr));return this}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}var Cn=new b,Zr=new b,Ys=new b,Wn=new b,Kr=new b,Zs=new b,$r=new b;class Ki{constructor(t=new b,e=new b(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Cn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);if(n<0)return e.copy(this.origin);return e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Cn.subVectors(t,this.origin).dot(this.direction);if(e<0)return this.origin.distanceToSquared(t);return Cn.copy(this.origin).addScaledVector(this.direction,e),Cn.distanceToSquared(t)}distanceSqToSegment(t,e,n,i){Zr.copy(t).add(e).multiplyScalar(0.5),Ys.copy(e).sub(t).normalize(),Wn.copy(this.origin).sub(Zr);let s=t.distanceTo(e)*0.5,r=-this.direction.dot(Ys),o=Wn.dot(this.direction),a=-Wn.dot(Ys),l=Wn.lengthSq(),c=Math.abs(1-r*r),h,u,d,f;if(c>0)if(h=r*a-o,u=r*o-a,f=s*c,h>=0)if(u>=-f)if(u<=f){let g=1/c;h*=g,u*=g,d=h*(h+r*u+2*o)+u*(r*h+u+2*a)+l}else u=s,h=Math.max(0,-(r*u+o)),d=-h*h+u*(u+2*a)+l;else u=-s,h=Math.max(0,-(r*u+o)),d=-h*h+u*(u+2*a)+l;else if(u<=-f)h=Math.max(0,-(-r*s+o)),u=h>0?-s:Math.min(Math.max(-s,-a),s),d=-h*h+u*(u+2*a)+l;else if(u<=f)h=0,u=Math.min(Math.max(-s,-a),s),d=u*(u+2*a)+l;else h=Math.max(0,-(r*s+o)),u=h>0?s:Math.min(Math.max(-s,-a),s),d=-h*h+u*(u+2*a)+l;else u=r>0?-s:s,h=Math.max(0,-(r*u+o)),d=-h*h+u*(u+2*a)+l;if(n)n.copy(this.origin).addScaledVector(this.direction,h);if(i)i.copy(Zr).addScaledVector(Ys,u);return d}intersectSphere(t,e){Cn.subVectors(t.center,this.origin);let n=Cn.dot(this.direction),i=Cn.dot(Cn)-n*n,s=t.radius*t.radius;if(i>s)return null;let r=Math.sqrt(s-i),o=n-r,a=n+r;if(a<0)return null;if(o<0)return this.at(a,e);return this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0){if(t.distanceToPoint(this.origin)===0)return 0;return null}let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);if(n===null)return null;return this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);if(e===0)return!0;if(t.normal.dot(this.direction)*e<0)return!0;return!1}intersectBox(t,e){let n,i,s,r,o,a,l=1/this.direction.x,c=1/this.direction.y,h=1/this.direction.z,u=this.origin;if(l>=0)n=(t.min.x-u.x)*l,i=(t.max.x-u.x)*l;else n=(t.max.x-u.x)*l,i=(t.min.x-u.x)*l;if(c>=0)s=(t.min.y-u.y)*c,r=(t.max.y-u.y)*c;else s=(t.max.y-u.y)*c,r=(t.min.y-u.y)*c;if(n>r||s>i)return null;if(s>n||isNaN(n))n=s;if(r<i||isNaN(i))i=r;if(h>=0)o=(t.min.z-u.z)*h,a=(t.max.z-u.z)*h;else o=(t.max.z-u.z)*h,a=(t.min.z-u.z)*h;if(n>a||o>i)return null;if(o>n||n!==n)n=o;if(a<i||i!==i)i=a;if(i<0)return null;return this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Cn)!==null}intersectTriangle(t,e,n,i,s){Kr.subVectors(e,t),Zs.subVectors(n,t),$r.crossVectors(Kr,Zs);let r=this.direction.dot($r),o;if(r>0){if(i)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Wn.subVectors(this.origin,t);let a=o*this.direction.dot(Zs.crossVectors(Wn,Zs));if(a<0)return null;let l=o*this.direction.dot(Kr.cross(Wn));if(l<0)return null;if(a+l>r)return null;let c=-o*Wn.dot($r);if(c<0)return null;return this.at(c/r,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class At{constructor(t,e,n,i,s,r,o,a,l,c,h,u,d,f,g,_){if(At.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0)this.set(t,e,n,i,s,r,o,a,l,c,h,u,d,f,g,_)}set(t,e,n,i,s,r,o,a,l,c,h,u,d,f,g,_){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=s,p[5]=r,p[9]=o,p[13]=a,p[2]=l,p[6]=c,p[10]=h,p[14]=u,p[3]=d,p[7]=f,p[11]=g,p[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new At().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/Ii.setFromMatrixColumn(t,0).length(),s=1/Ii.setFromMatrixColumn(t,1).length(),r=1/Ii.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,r=Math.cos(n),o=Math.sin(n),a=Math.cos(i),l=Math.sin(i),c=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){let u=r*c,d=r*h,f=o*c,g=o*h;e[0]=a*c,e[4]=-a*h,e[8]=l,e[1]=d+f*l,e[5]=u-g*l,e[9]=-o*a,e[2]=g-u*l,e[6]=f+d*l,e[10]=r*a}else if(t.order==="YXZ"){let u=a*c,d=a*h,f=l*c,g=l*h;e[0]=u+g*o,e[4]=f*o-d,e[8]=r*l,e[1]=r*h,e[5]=r*c,e[9]=-o,e[2]=d*o-f,e[6]=g+u*o,e[10]=r*a}else if(t.order==="ZXY"){let u=a*c,d=a*h,f=l*c,g=l*h;e[0]=u-g*o,e[4]=-r*h,e[8]=f+d*o,e[1]=d+f*o,e[5]=r*c,e[9]=g-u*o,e[2]=-r*l,e[6]=o,e[10]=r*a}else if(t.order==="ZYX"){let u=r*c,d=r*h,f=o*c,g=o*h;e[0]=a*c,e[4]=f*l-d,e[8]=u*l+g,e[1]=a*h,e[5]=g*l+u,e[9]=d*l-f,e[2]=-l,e[6]=o*a,e[10]=r*a}else if(t.order==="YZX"){let u=r*a,d=r*l,f=o*a,g=o*l;e[0]=a*c,e[4]=g-u*h,e[8]=f*h+d,e[1]=h,e[5]=r*c,e[9]=-o*c,e[2]=-l*c,e[6]=d*h+f,e[10]=u-g*h}else if(t.order==="XZY"){let u=r*a,d=r*l,f=o*a,g=o*l;e[0]=a*c,e[4]=-h,e[8]=l*c,e[1]=u*h+g,e[5]=r*c,e[9]=d*h-f,e[2]=f*h-d,e[6]=o*c,e[10]=g*h+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ju,t,ju)}lookAt(t,e,n){let i=this.elements;if(Ve.subVectors(t,e),Ve.lengthSq()===0)Ve.z=1;if(Ve.normalize(),Xn.crossVectors(n,Ve),Xn.lengthSq()===0){if(Math.abs(n.z)===1)Ve.x+=0.0001;else Ve.z+=0.0001;Ve.normalize(),Xn.crossVectors(n,Ve)}return Xn.normalize(),Ks.crossVectors(Ve,Xn),i[0]=Xn.x,i[4]=Ks.x,i[8]=Ve.x,i[1]=Xn.y,i[5]=Ks.y,i[9]=Ve.y,i[2]=Xn.z,i[6]=Ks.z,i[10]=Ve.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,r=n[0],o=n[4],a=n[8],l=n[12],c=n[1],h=n[5],u=n[9],d=n[13],f=n[2],g=n[6],_=n[10],p=n[14],m=n[3],v=n[7],x=n[11],E=n[15],I=i[0],w=i[4],A=i[8],U=i[12],M=i[1],T=i[5],C=i[9],z=i[13],k=i[2],G=i[6],K=i[10],V=i[14],j=i[3],H=i[7],ct=i[11],ut=i[15];return s[0]=r*I+o*M+a*k+l*j,s[4]=r*w+o*T+a*G+l*H,s[8]=r*A+o*C+a*K+l*ct,s[12]=r*U+o*z+a*V+l*ut,s[1]=c*I+h*M+u*k+d*j,s[5]=c*w+h*T+u*G+d*H,s[9]=c*A+h*C+u*K+d*ct,s[13]=c*U+h*z+u*V+d*ut,s[2]=f*I+g*M+_*k+p*j,s[6]=f*w+g*T+_*G+p*H,s[10]=f*A+g*C+_*K+p*ct,s[14]=f*U+g*z+_*V+p*ut,s[3]=m*I+v*M+x*k+E*j,s[7]=m*w+v*T+x*G+E*H,s[11]=m*A+v*C+x*K+E*ct,s[15]=m*U+v*z+x*V+E*ut,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],r=t[1],o=t[5],a=t[9],l=t[13],c=t[2],h=t[6],u=t[10],d=t[14],f=t[3],g=t[7],_=t[11],p=t[15];return f*(+s*a*h-i*l*h-s*o*u+n*l*u+i*o*d-n*a*d)+g*(+e*a*d-e*l*u+s*r*u-i*r*d+i*l*c-s*a*c)+_*(+e*l*h-e*o*d-s*r*h+n*r*d+s*o*c-n*l*c)+p*(-i*o*c-e*a*h+e*o*u+i*r*h-n*r*u+n*a*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;if(t.isVector3)i[12]=t.x,i[13]=t.y,i[14]=t.z;else i[12]=t,i[13]=e,i[14]=n;return this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],o=t[5],a=t[6],l=t[7],c=t[8],h=t[9],u=t[10],d=t[11],f=t[12],g=t[13],_=t[14],p=t[15],m=h*_*l-g*u*l+g*a*d-o*_*d-h*a*p+o*u*p,v=f*u*l-c*_*l-f*a*d+r*_*d+c*a*p-r*u*p,x=c*g*l-f*h*l+f*o*d-r*g*d-c*o*p+r*h*p,E=f*h*a-c*g*a-f*o*u+r*g*u+c*o*_-r*h*_,I=e*m+n*v+i*x+s*E;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/I;return t[0]=m*w,t[1]=(g*u*s-h*_*s-g*i*d+n*_*d+h*i*p-n*u*p)*w,t[2]=(o*_*s-g*a*s+g*i*l-n*_*l-o*i*p+n*a*p)*w,t[3]=(h*a*s-o*u*s-h*i*l+n*u*l+o*i*d-n*a*d)*w,t[4]=v*w,t[5]=(c*_*s-f*u*s+f*i*d-e*_*d-c*i*p+e*u*p)*w,t[6]=(f*a*s-r*_*s-f*i*l+e*_*l+r*i*p-e*a*p)*w,t[7]=(r*u*s-c*a*s+c*i*l-e*u*l-r*i*d+e*a*d)*w,t[8]=x*w,t[9]=(f*h*s-c*g*s-f*n*d+e*g*d+c*n*p-e*h*p)*w,t[10]=(r*g*s-f*o*s+f*n*l-e*g*l-r*n*p+e*o*p)*w,t[11]=(c*o*s-r*h*s-c*n*l+e*h*l+r*n*d-e*o*d)*w,t[12]=E*w,t[13]=(c*g*i-f*h*i+f*n*u-e*g*u-c*n*_+e*h*_)*w,t[14]=(f*o*i-r*g*i-f*n*a+e*g*a+r*n*_-e*o*_)*w,t[15]=(r*h*i-c*o*i+c*n*a-e*h*a-r*n*u+e*o*u)*w,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){if(t.isVector3)this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1);else this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1);return this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,r=t.x,o=t.y,a=t.z,l=s*r,c=s*o;return this.set(l*r+n,l*o-i*a,l*a+i*o,0,l*o+i*a,c*o+n,c*a-i*r,0,l*a-i*o,c*a+i*r,s*a*a+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,r){return this.set(1,n,s,0,t,1,r,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,r=e._y,o=e._z,a=e._w,l=s+s,c=r+r,h=o+o,u=s*l,d=s*c,f=s*h,g=r*c,_=r*h,p=o*h,m=a*l,v=a*c,x=a*h,E=n.x,I=n.y,w=n.z;return i[0]=(1-(g+p))*E,i[1]=(d+x)*E,i[2]=(f-v)*E,i[3]=0,i[4]=(d-x)*I,i[5]=(1-(u+p))*I,i[6]=(_+m)*I,i[7]=0,i[8]=(f+v)*w,i[9]=(_-m)*w,i[10]=(1-(u+g))*w,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,s=Ii.set(i[0],i[1],i[2]).length(),r=Ii.set(i[4],i[5],i[6]).length(),o=Ii.set(i[8],i[9],i[10]).length();if(this.determinant()<0)s=-s;t.x=i[12],t.y=i[13],t.z=i[14],on.copy(this);let l=1/s,c=1/r,h=1/o;return on.elements[0]*=l,on.elements[1]*=l,on.elements[2]*=l,on.elements[4]*=c,on.elements[5]*=c,on.elements[6]*=c,on.elements[8]*=h,on.elements[9]*=h,on.elements[10]*=h,e.setFromRotationMatrix(on),n.x=s,n.y=r,n.z=o,this}makePerspective(t,e,n,i,s,r,o=2000){let a=this.elements,l=2*s/(e-t),c=2*s/(n-i),h=(e+t)/(e-t),u=(n+i)/(n-i),d,f;if(o===2000)d=-(r+s)/(r-s),f=-2*r*s/(r-s);else if(o===2001)d=-r/(r-s),f=-r*s/(r-s);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return a[0]=l,a[4]=0,a[8]=h,a[12]=0,a[1]=0,a[5]=c,a[9]=u,a[13]=0,a[2]=0,a[6]=0,a[10]=d,a[14]=f,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(t,e,n,i,s,r,o=2000){let a=this.elements,l=1/(e-t),c=1/(n-i),h=1/(r-s),u=(e+t)*l,d=(n+i)*c,f,g;if(o===2000)f=(r+s)*h,g=-2*h;else if(o===2001)f=s*h,g=-1*h;else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return a[0]=2*l,a[4]=0,a[8]=0,a[12]=-u,a[1]=0,a[5]=2*c,a[9]=0,a[13]=-d,a[2]=0,a[6]=0,a[10]=g,a[14]=-f,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}var Ii=new b,on=new At,Ju=new b(0,0,0),ju=new b(1,1,1),Xn=new b,Ks=new b,Ve=new b,tl=new At,el=new $e;class hn{constructor(t=0,e=0,n=0,i=hn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],r=i[4],o=i[8],a=i[1],l=i[5],c=i[9],h=i[2],u=i[6],d=i[10];switch(e){case"XYZ":if(this._y=Math.asin(Me(o,-1,1)),Math.abs(o)<0.9999999)this._x=Math.atan2(-c,d),this._z=Math.atan2(-r,s);else this._x=Math.atan2(u,l),this._z=0;break;case"YXZ":if(this._x=Math.asin(-Me(c,-1,1)),Math.abs(c)<0.9999999)this._y=Math.atan2(o,d),this._z=Math.atan2(a,l);else this._y=Math.atan2(-h,s),this._z=0;break;case"ZXY":if(this._x=Math.asin(Me(u,-1,1)),Math.abs(u)<0.9999999)this._y=Math.atan2(-h,d),this._z=Math.atan2(-r,l);else this._y=0,this._z=Math.atan2(a,s);break;case"ZYX":if(this._y=Math.asin(-Me(h,-1,1)),Math.abs(h)<0.9999999)this._x=Math.atan2(u,d),this._z=Math.atan2(a,s);else this._x=0,this._z=Math.atan2(-r,l);break;case"YZX":if(this._z=Math.asin(Me(a,-1,1)),Math.abs(a)<0.9999999)this._x=Math.atan2(-c,l),this._y=Math.atan2(-h,s);else this._x=0,this._y=Math.atan2(o,d);break;case"XZY":if(this._z=Math.asin(-Me(r,-1,1)),Math.abs(r)<0.9999999)this._x=Math.atan2(u,l),this._y=Math.atan2(o,s);else this._x=Math.atan2(-c,d),this._y=0;break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}if(this._order=e,n===!0)this._onChangeCallback();return this}setFromQuaternion(t,e,n){return tl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(tl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return el.setFromEuler(this),this.setFromQuaternion(el,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){if(this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0)this._order=t[3];return this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hn.DEFAULT_ORDER="XYZ";class br{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}var Qu=0,nl=new b,Pi=new $e,In=new At,$s=new b,ls=new b,td=new b,ed=new $e,il=new b(1,0,0),sl=new b(0,1,0),rl=new b(0,0,1),ol={type:"added"},nd={type:"removed"},Li={type:"childadded",child:null},Jr={type:"childremoved",child:null};class le extends pi{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=Ke(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=le.DEFAULT_UP.clone();let t=new b,e=new hn,n=new $e,i=new b(1,1,1);function s(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new At},normalMatrix:{value:new Ft}}),this.matrix=new At,this.matrixWorld=new At,this.matrixAutoUpdate=le.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new br,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Pi.setFromAxisAngle(t,e),this.quaternion.multiply(Pi),this}rotateOnWorldAxis(t,e){return Pi.setFromAxisAngle(t,e),this.quaternion.premultiply(Pi),this}rotateX(t){return this.rotateOnAxis(il,t)}rotateY(t){return this.rotateOnAxis(sl,t)}rotateZ(t){return this.rotateOnAxis(rl,t)}translateOnAxis(t,e){return nl.copy(t).applyQuaternion(this.quaternion),this.position.add(nl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(il,t)}translateY(t){return this.translateOnAxis(sl,t)}translateZ(t){return this.translateOnAxis(rl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(t,e,n){if(t.isVector3)$s.copy(t);else $s.set(t,e,n);let i=this.parent;if(this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)In.lookAt(ls,$s,this.up);else In.lookAt($s,ls,this.up);if(this.quaternion.setFromRotationMatrix(In),i)In.extractRotation(i.matrixWorld),Pi.setFromRotationMatrix(In),this.quaternion.premultiply(Pi.invert())}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}if(t===this)return console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this;if(t&&t.isObject3D)t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ol),Li.child=t,this.dispatchEvent(Li),Li.child=null;else console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t);return this}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);if(e!==-1)t.parent=null,this.children.splice(e,1),t.dispatchEvent(nd),Jr.child=t,this.dispatchEvent(Jr),Jr.child=null;return this}removeFromParent(){let t=this.parent;if(t!==null)t.remove(this);return this}clear(){return this.remove(...this.children)}attach(t){if(this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),t.parent!==null)t.parent.updateWorldMatrix(!0,!1),In.multiply(t.parent.matrixWorld);return t.applyMatrix4(In),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ol),Li.child=t,this.dispatchEvent(Li),Li.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}return}getObjectsByProperty(t,e,n=[]){if(this[t]===e)n.push(this);let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,t,td),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,ed,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;if(e!==null)t(e),e.traverseAncestors(t)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||t){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,t=!0}let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null)n.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);if(e===!0){let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t==="string",n={};if(e)t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"};let i={};if(i.uuid=this.uuid,i.type=this.type,this.name!=="")i.name=this.name;if(this.castShadow===!0)i.castShadow=!0;if(this.receiveShadow===!0)i.receiveShadow=!0;if(this.visible===!1)i.visible=!1;if(this.frustumCulled===!1)i.frustumCulled=!1;if(this.renderOrder!==0)i.renderOrder=this.renderOrder;if(Object.keys(this.userData).length>0)i.userData=this.userData;if(i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1)i.matrixAutoUpdate=!1;if(this.isInstancedMesh){if(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)i.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map((o)=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null)i.colorsTexture=this._colorsTexture.toJSON(t);if(this.boundingSphere!==null)i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius};if(this.boundingBox!==null)i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}}function s(o,a){if(o[a.uuid]===void 0)o[a.uuid]=a.toJSON(t);return a.uuid}if(this.isScene){if(this.background){if(this.background.isColor)i.background=this.background.toJSON();else if(this.background.isTexture)i.background=this.background.toJSON(t).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)i.environment=this.environment.toJSON(t).uuid}else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let a=o.shapes;if(Array.isArray(a))for(let l=0,c=a.length;l<c;l++){let h=a[l];s(t.shapes,h)}else s(t.shapes,a)}}if(this.isSkinnedMesh){if(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let a=0,l=this.material.length;a<l;a++)o.push(s(t.materials,this.material[a]));i.material=o}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let a=this.animations[o];i.animations.push(s(t.animations,a))}}if(e){let o=r(t.geometries),a=r(t.materials),l=r(t.textures),c=r(t.images),h=r(t.shapes),u=r(t.skeletons),d=r(t.animations),f=r(t.nodes);if(o.length>0)n.geometries=o;if(a.length>0)n.materials=a;if(l.length>0)n.textures=l;if(c.length>0)n.images=c;if(h.length>0)n.shapes=h;if(u.length>0)n.skeletons=u;if(d.length>0)n.animations=d;if(f.length>0)n.nodes=f}return n.object=i,n;function r(o){let a=[];for(let l in o){let c=o[l];delete c.metadata,a.push(c)}return a}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}}le.DEFAULT_UP=new b(0,1,0);le.DEFAULT_MATRIX_AUTO_UPDATE=!0;le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var an=new b,Pn=new b,jr=new b,Ln=new b,Ni=new b,Di=new b,al=new b,Qr=new b,to=new b,eo=new b,no=new $t,io=new $t,so=new $t;class cn{constructor(t=new b,e=new b,n=new b){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),an.subVectors(t,e),i.cross(an);let s=i.lengthSq();if(s>0)return i.multiplyScalar(1/Math.sqrt(s));return i.set(0,0,0)}static getBarycoord(t,e,n,i,s){an.subVectors(i,e),Pn.subVectors(n,e),jr.subVectors(t,e);let r=an.dot(an),o=an.dot(Pn),a=an.dot(jr),l=Pn.dot(Pn),c=Pn.dot(jr),h=r*l-o*o;if(h===0)return s.set(0,0,0),null;let u=1/h,d=(l*a-o*c)*u,f=(r*c-o*a)*u;return s.set(1-d-f,f,d)}static containsPoint(t,e,n,i){if(this.getBarycoord(t,e,n,i,Ln)===null)return!1;return Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getInterpolation(t,e,n,i,s,r,o,a){if(this.getBarycoord(t,e,n,i,Ln)===null){if(a.x=0,a.y=0,"z"in a)a.z=0;if("w"in a)a.w=0;return null}return a.setScalar(0),a.addScaledVector(s,Ln.x),a.addScaledVector(r,Ln.y),a.addScaledVector(o,Ln.z),a}static getInterpolatedAttribute(t,e,n,i,s,r){return no.setScalar(0),io.setScalar(0),so.setScalar(0),no.fromBufferAttribute(t,e),io.fromBufferAttribute(t,n),so.fromBufferAttribute(t,i),r.setScalar(0),r.addScaledVector(no,s.x),r.addScaledVector(io,s.y),r.addScaledVector(so,s.z),r}static isFrontFacing(t,e,n,i){return an.subVectors(n,e),Pn.subVectors(t,e),an.cross(Pn).dot(i)<0?!0:!1}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return an.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),an.cross(Pn).length()*0.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(t){return cn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return cn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return cn.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return cn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return cn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,s=this.c,r,o;Ni.subVectors(i,n),Di.subVectors(s,n),Qr.subVectors(t,n);let a=Ni.dot(Qr),l=Di.dot(Qr);if(a<=0&&l<=0)return e.copy(n);to.subVectors(t,i);let c=Ni.dot(to),h=Di.dot(to);if(c>=0&&h<=c)return e.copy(i);let u=a*h-c*l;if(u<=0&&a>=0&&c<=0)return r=a/(a-c),e.copy(n).addScaledVector(Ni,r);eo.subVectors(t,s);let d=Ni.dot(eo),f=Di.dot(eo);if(f>=0&&d<=f)return e.copy(s);let g=d*l-a*f;if(g<=0&&l>=0&&f<=0)return o=l/(l-f),e.copy(n).addScaledVector(Di,o);let _=c*f-d*h;if(_<=0&&h-c>=0&&d-f>=0)return al.subVectors(s,i),o=(h-c)/(h-c+(d-f)),e.copy(i).addScaledVector(al,o);let p=1/(_+g+u);return r=g*p,o=u*p,e.copy(n).addScaledVector(Ni,r).addScaledVector(Di,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}var Mc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qn={h:0,s:0,l:0},Js={h:0,s:0,l:0};function ro(t,e,n){if(n<0)n+=1;if(n>1)n-=1;if(n<0.16666666666666666)return t+(e-t)*6*n;if(n<0.5)return e;if(n<0.6666666666666666)return t+(e-t)*6*(0.6666666666666666-n);return t}class Mt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;if(i&&i.isColor)this.copy(i);else if(typeof i==="number")this.setHex(i);else if(typeof i==="string")this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e="srgb"){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Xt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Xt.workingColorSpace){if(t=No(t,1),e=Me(e,0,1),n=Me(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=0.5?n*(1+e):n+e-n*e,r=2*n-s;this.r=ro(r,s,t+0.3333333333333333),this.g=ro(r,s,t),this.b=ro(r,s,t-0.3333333333333333)}return Xt.toWorkingColorSpace(this,i),this}setStyle(t,e="srgb"){function n(s){if(s===void 0)return;if(parseFloat(s)<1)console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,r=i[1],o=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);else if(r===6)return this.setHex(parseInt(s,16),e);else console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e="srgb"){let n=Mc[t.toLowerCase()];if(n!==void 0)this.setHex(n,e);else console.warn("THREE.Color: Unknown color "+t);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Dn(t.r),this.g=Dn(t.g),this.b=Dn(t.b),this}copyLinearToSRGB(t){return this.r=Gi(t.r),this.g=Gi(t.g),this.b=Gi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t="srgb"){return Xt.fromWorkingColorSpace(Ne.copy(this),t),Math.round(Me(Ne.r*255,0,255))*65536+Math.round(Me(Ne.g*255,0,255))*256+Math.round(Me(Ne.b*255,0,255))}getHexString(t="srgb"){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.fromWorkingColorSpace(Ne.copy(this),e);let{r:n,g:i,b:s}=Ne,r=Math.max(n,i,s),o=Math.min(n,i,s),a,l,c=(o+r)/2;if(o===r)a=0,l=0;else{let h=r-o;switch(l=c<=0.5?h/(r+o):h/(2-r-o),r){case n:a=(i-s)/h+(i<s?6:0);break;case i:a=(s-n)/h+2;break;case s:a=(n-i)/h+4;break}a/=6}return t.h=a,t.s=l,t.l=c,t}getRGB(t,e=Xt.workingColorSpace){return Xt.fromWorkingColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t="srgb"){Xt.fromWorkingColorSpace(Ne.copy(this),t);let{r:e,g:n,b:i}=Ne;if(t!=="srgb")return`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`;return`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(qn),this.setHSL(qn.h+t,qn.s+e,qn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(qn),t.getHSL(Js);let n=_s(qn.h,Js.h,e),i=_s(qn.s,Js.s,e),s=_s(qn.l,Js.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var Ne=new Mt;Mt.NAMES=Mc;var id=0;class Xe extends pi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:id++}),this.uuid=Ke(),this.name="",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Mt(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){if(this._alphaTest>0!==t>0)this.version++;this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t===void 0)return;for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}if(i&&i.isColor)i.set(n);else if(i&&i.isVector3&&(n&&n.isVector3))i.copy(n);else this[e]=n}}toJSON(t){let e=t===void 0||typeof t==="string";if(e)t={textures:{},images:{}};let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};if(n.uuid=this.uuid,n.type=this.type,this.name!=="")n.name=this.name;if(this.color&&this.color.isColor)n.color=this.color.getHex();if(this.roughness!==void 0)n.roughness=this.roughness;if(this.metalness!==void 0)n.metalness=this.metalness;if(this.sheen!==void 0)n.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)n.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)n.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)n.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1)n.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)n.specular=this.specular.getHex();if(this.specularIntensity!==void 0)n.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)n.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)n.shininess=this.shininess;if(this.clearcoat!==void 0)n.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)n.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.dispersion!==void 0)n.dispersion=this.dispersion;if(this.iridescence!==void 0)n.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)n.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)n.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid;if(this.anisotropy!==void 0)n.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)n.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid;if(this.map&&this.map.isTexture)n.map=this.map.toJSON(t).uuid;if(this.matcap&&this.matcap.isTexture)n.matcap=this.matcap.toJSON(t).uuid;if(this.alphaMap&&this.alphaMap.isTexture)n.alphaMap=this.alphaMap.toJSON(t).uuid;if(this.lightMap&&this.lightMap.isTexture)n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)n.roughnessMap=this.roughnessMap.toJSON(t).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)n.metalnessMap=this.metalnessMap.toJSON(t).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)n.emissiveMap=this.emissiveMap.toJSON(t).uuid;if(this.specularMap&&this.specularMap.isTexture)n.specularMap=this.specularMap.toJSON(t).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)n.specularColorMap=this.specularColorMap.toJSON(t).uuid;if(this.envMap&&this.envMap.isTexture){if(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0)n.combine=this.combine}if(this.envMapRotation!==void 0)n.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)n.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)n.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)n.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)n.gradientMap=this.gradientMap.toJSON(t).uuid;if(this.transmission!==void 0)n.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)n.transmissionMap=this.transmissionMap.toJSON(t).uuid;if(this.thickness!==void 0)n.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)n.thicknessMap=this.thicknessMap.toJSON(t).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)n.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)n.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)n.size=this.size;if(this.shadowSide!==null)n.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)n.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)n.blending=this.blending;if(this.side!==0)n.side=this.side;if(this.vertexColors===!0)n.vertexColors=!0;if(this.opacity<1)n.opacity=this.opacity;if(this.transparent===!0)n.transparent=!0;if(this.blendSrc!==204)n.blendSrc=this.blendSrc;if(this.blendDst!==205)n.blendDst=this.blendDst;if(this.blendEquation!==100)n.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)n.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)n.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)n.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)n.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)n.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)n.depthFunc=this.depthFunc;if(this.depthTest===!1)n.depthTest=this.depthTest;if(this.depthWrite===!1)n.depthWrite=this.depthWrite;if(this.colorWrite===!1)n.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)n.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)n.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)n.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)n.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)n.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)n.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)n.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)n.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)n.rotation=this.rotation;if(this.polygonOffset===!0)n.polygonOffset=!0;if(this.polygonOffsetFactor!==0)n.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)n.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)n.linewidth=this.linewidth;if(this.dashSize!==void 0)n.dashSize=this.dashSize;if(this.gapSize!==void 0)n.gapSize=this.gapSize;if(this.scale!==void 0)n.scale=this.scale;if(this.dithering===!0)n.dithering=!0;if(this.alphaTest>0)n.alphaTest=this.alphaTest;if(this.alphaHash===!0)n.alphaHash=!0;if(this.alphaToCoverage===!0)n.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)n.premultipliedAlpha=!0;if(this.forceSinglePass===!0)n.forceSinglePass=!0;if(this.wireframe===!0)n.wireframe=!0;if(this.wireframeLinewidth>1)n.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")n.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")n.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)n.flatShading=!0;if(this.visible===!1)n.visible=!1;if(this.toneMapped===!1)n.toneMapped=!1;if(this.fog===!1)n.fog=!1;if(Object.keys(this.userData).length>0)n.userData=this.userData;function i(s){let r=[];for(let o in s){let a=s[o];delete a.metadata,r.push(a)}return r}if(e){let s=i(t.textures),r=i(t.images);if(s.length>0)n.textures=s;if(r.length>0)n.images=r}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){if(t===!0)this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ne extends Xe{static get type(){return"MeshBasicMaterial"}constructor(t){super();this.isMeshBasicMaterial=!0,this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}var ye=new b,js=new ot;class Ae{constructor(t,e,n=!1){if(Array.isArray(t))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(t){if(t===!0)this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)js.fromBufferAttribute(this,e),js.applyMatrix3(t),this.setXY(e,js.x,js.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];if(this.normalized)n=ln(n,this.array);return n}setComponent(t,e,n){if(this.normalized)n=se(n,this.array);return this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];if(this.normalized)e=ln(e,this.array);return e}setX(t,e){if(this.normalized)e=se(e,this.array);return this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];if(this.normalized)e=ln(e,this.array);return e}setY(t,e){if(this.normalized)e=se(e,this.array);return this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];if(this.normalized)e=ln(e,this.array);return e}setZ(t,e){if(this.normalized)e=se(e,this.array);return this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];if(this.normalized)e=ln(e,this.array);return e}setW(t,e){if(this.normalized)e=se(e,this.array);return this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){if(t*=this.itemSize,this.normalized)e=se(e,this.array),n=se(n,this.array);return this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){if(t*=this.itemSize,this.normalized)e=se(e,this.array),n=se(n,this.array),i=se(i,this.array);return this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){if(t*=this.itemSize,this.normalized)e=se(e,this.array),n=se(n,this.array),i=se(i,this.array),s=se(s,this.array);return this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")t.name=this.name;if(this.usage!==35044)t.usage=this.usage;return t}}class Fo extends Ae{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Oo extends Ae{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Jt extends Ae{constructor(t,e,n){super(new Float32Array(t),e,n)}}var sd=0,Ze=new At,oo=new le,Ui=new b,We=new un,cs=new un,be=new b;class he extends pi{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sd++}),this.uuid=Ke(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){if(Array.isArray(t))this.index=new((xc(t))?Oo:Fo)(t,1);else this.index=t;return this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;if(e!==void 0)e.applyMatrix4(t),e.needsUpdate=!0;let n=this.attributes.normal;if(n!==void 0){let s=new Ft().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;if(i!==void 0)i.transformDirection(t),i.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this}applyQuaternion(t){return Ze.makeRotationFromQuaternion(t),this.applyMatrix4(Ze),this}rotateX(t){return Ze.makeRotationX(t),this.applyMatrix4(Ze),this}rotateY(t){return Ze.makeRotationY(t),this.applyMatrix4(Ze),this}rotateZ(t){return Ze.makeRotationZ(t),this.applyMatrix4(Ze),this}translate(t,e,n){return Ze.makeTranslation(t,e,n),this.applyMatrix4(Ze),this}scale(t,e,n){return Ze.makeScale(t,e,n),this.applyMatrix4(Ze),this}lookAt(t){return oo.lookAt(t),oo.updateMatrix(),this.applyMatrix4(oo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ui).negate(),this.translate(Ui.x,Ui.y,Ui.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,s=t.length;i<s;i++){let r=t[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Jt(n,3))}else{for(let n=0,i=e.count;n<i;n++){let s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}if(t.length>e.count)console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");e.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new un;let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];if(We.setFromBufferAttribute(s),this.morphTargetsRelative)be.addVectors(this.boundingBox.min,We.min),this.boundingBox.expandByPoint(be),be.addVectors(this.boundingBox.max,We.max),this.boundingBox.expandByPoint(be);else this.boundingBox.expandByPoint(We.min),this.boundingBox.expandByPoint(We.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new Je;let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new b,1/0);return}if(t){let n=this.boundingSphere.center;if(We.setFromBufferAttribute(t),e)for(let s=0,r=e.length;s<r;s++){let o=e[s];if(cs.setFromBufferAttribute(o),this.morphTargetsRelative)be.addVectors(We.min,cs.min),We.expandByPoint(be),be.addVectors(We.max,cs.max),We.expandByPoint(be);else We.expandByPoint(cs.min),We.expandByPoint(cs.max)}We.getCenter(n);let i=0;for(let s=0,r=t.count;s<r;s++)be.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(be));if(e)for(let s=0,r=e.length;s<r;s++){let o=e[s],a=this.morphTargetsRelative;for(let l=0,c=o.count;l<c;l++){if(be.fromBufferAttribute(o,l),a)Ui.fromBufferAttribute(t,l),be.add(Ui);i=Math.max(i,n.distanceToSquared(be))}}if(this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius))console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:n,normal:i,uv:s}=e;if(this.hasAttribute("tangent")===!1)this.setAttribute("tangent",new Ae(new Float32Array(4*n.count),4));let r=this.getAttribute("tangent"),o=[],a=[];for(let A=0;A<n.count;A++)o[A]=new b,a[A]=new b;let l=new b,c=new b,h=new b,u=new ot,d=new ot,f=new ot,g=new b,_=new b;function p(A,U,M){l.fromBufferAttribute(n,A),c.fromBufferAttribute(n,U),h.fromBufferAttribute(n,M),u.fromBufferAttribute(s,A),d.fromBufferAttribute(s,U),f.fromBufferAttribute(s,M),c.sub(l),h.sub(l),d.sub(u),f.sub(u);let T=1/(d.x*f.y-f.x*d.y);if(!isFinite(T))return;g.copy(c).multiplyScalar(f.y).addScaledVector(h,-d.y).multiplyScalar(T),_.copy(h).multiplyScalar(d.x).addScaledVector(c,-f.x).multiplyScalar(T),o[A].add(g),o[U].add(g),o[M].add(g),a[A].add(_),a[U].add(_),a[M].add(_)}let m=this.groups;if(m.length===0)m=[{start:0,count:t.count}];for(let A=0,U=m.length;A<U;++A){let M=m[A],T=M.start,C=M.count;for(let z=T,k=T+C;z<k;z+=3)p(t.getX(z+0),t.getX(z+1),t.getX(z+2))}let v=new b,x=new b,E=new b,I=new b;function w(A){E.fromBufferAttribute(i,A),I.copy(E);let U=o[A];v.copy(U),v.sub(E.multiplyScalar(E.dot(U))).normalize(),x.crossVectors(I,U);let T=x.dot(a[A])<0?-1:1;r.setXYZW(A,v.x,v.y,v.z,T)}for(let A=0,U=m.length;A<U;++A){let M=m[A],T=M.start,C=M.count;for(let z=T,k=T+C;z<k;z+=3)w(t.getX(z+0)),w(t.getX(z+1)),w(t.getX(z+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ae(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);let i=new b,s=new b,r=new b,o=new b,a=new b,l=new b,c=new b,h=new b;if(t)for(let u=0,d=t.count;u<d;u+=3){let f=t.getX(u+0),g=t.getX(u+1),_=t.getX(u+2);i.fromBufferAttribute(e,f),s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),c.subVectors(r,s),h.subVectors(i,s),c.cross(h),o.fromBufferAttribute(n,f),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),o.add(c),a.add(c),l.add(c),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z)}else for(let u=0,d=e.count;u<d;u+=3)i.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),r.fromBufferAttribute(e,u+2),c.subVectors(r,s),h.subVectors(i,s),c.cross(h),n.setXYZ(u+0,c.x,c.y,c.z),n.setXYZ(u+1,c.x,c.y,c.z),n.setXYZ(u+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)be.fromBufferAttribute(t,e),be.normalize(),t.setXYZ(e,be.x,be.y,be.z)}toNonIndexed(){function t(o,a){let{array:l,itemSize:c,normalized:h}=o,u=new l.constructor(a.length*c),d=0,f=0;for(let g=0,_=a.length;g<_;g++){if(o.isInterleavedBufferAttribute)d=a[g]*o.data.stride+o.offset;else d=a[g]*c;for(let p=0;p<c;p++)u[f++]=l[d++]}return new Ae(u,c,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new he,n=this.index.array,i=this.attributes;for(let o in i){let a=i[o],l=t(a,n);e.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let a=[],l=s[o];for(let c=0,h=l.length;c<h;c++){let u=l[c],d=t(u,n);a.push(d)}e.morphAttributes[o]=a}e.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,a=r.length;o<a;o++){let l=r[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!=="")t.name=this.name;if(Object.keys(this.userData).length>0)t.userData=this.userData;if(this.parameters!==void 0){let a=this.parameters;for(let l in a)if(a[l]!==void 0)t[l]=a[l];return t}t.data={attributes:{}};let e=this.index;if(e!==null)t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)};let n=this.attributes;for(let a in n){let l=n[a];t.data.attributes[a]=l.toJSON(t.data)}let i={},s=!1;for(let a in this.morphAttributes){let l=this.morphAttributes[a],c=[];for(let h=0,u=l.length;h<u;h++){let d=l[h];c.push(d.toJSON(t.data))}if(c.length>0)i[a]=c,s=!0}if(s)t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;if(r.length>0)t.data.groups=JSON.parse(JSON.stringify(r));let o=this.boundingSphere;if(o!==null)t.data.boundingSphere={center:o.center.toArray(),radius:o.radius};return t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;if(n!==null)this.setIndex(n.clone(e));let i=t.attributes;for(let l in i){let c=i[l];this.setAttribute(l,c.clone(e))}let s=t.morphAttributes;for(let l in s){let c=[],h=s[l];for(let u=0,d=h.length;u<d;u++)c.push(h[u].clone(e));this.morphAttributes[l]=c}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let l=0,c=r.length;l<c;l++){let h=r[l];this.addGroup(h.start,h.count,h.materialIndex)}let o=t.boundingBox;if(o!==null)this.boundingBox=o.clone();let a=t.boundingSphere;if(a!==null)this.boundingSphere=a.clone();return this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}var ll=new At,ai=new Ki,Qs=new Je,cl=new b,tr=new b,er=new b,nr=new b,ao=new b,ir=new b,hl=new b,sr=new b;class vt extends le{constructor(t=new he,e=new ne){super();this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){if(super.copy(t,e),t.morphTargetInfluences!==void 0)this.morphTargetInfluences=t.morphTargetInfluences.slice();if(t.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary);return this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let o=this.morphTargetInfluences;if(s&&o){ir.set(0,0,0);for(let a=0,l=s.length;a<l;a++){let c=o[a],h=s[a];if(c===0)continue;if(ao.fromBufferAttribute(h,t),r)ir.addScaledVector(ao,c);else ir.addScaledVector(ao.sub(e),c)}e.add(ir)}return e}raycast(t,e){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0)return;if(n.boundingSphere===null)n.computeBoundingSphere();if(Qs.copy(n.boundingSphere),Qs.applyMatrix4(s),ai.copy(t.ray).recast(t.near),Qs.containsPoint(ai.origin)===!1){if(ai.intersectSphere(Qs,cl)===null)return;if(ai.origin.distanceToSquared(cl)>(t.far-t.near)**2)return}if(ll.copy(s).invert(),ai.copy(t.ray).applyMatrix4(ll),n.boundingBox!==null){if(ai.intersectsBox(n.boundingBox)===!1)return}this._computeIntersections(t,e,ai)}_computeIntersections(t,e,n){let i,s=this.geometry,r=this.material,o=s.index,a=s.attributes.position,l=s.attributes.uv,c=s.attributes.uv1,h=s.attributes.normal,u=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(r))for(let f=0,g=u.length;f<g;f++){let _=u[f],p=r[_.materialIndex],m=Math.max(_.start,d.start),v=Math.min(o.count,Math.min(_.start+_.count,d.start+d.count));for(let x=m,E=v;x<E;x+=3){let I=o.getX(x),w=o.getX(x+1),A=o.getX(x+2);if(i=rr(this,p,t,n,l,c,h,I,w,A),i)i.faceIndex=Math.floor(x/3),i.face.materialIndex=_.materialIndex,e.push(i)}}else{let f=Math.max(0,d.start),g=Math.min(o.count,d.start+d.count);for(let _=f,p=g;_<p;_+=3){let m=o.getX(_),v=o.getX(_+1),x=o.getX(_+2);if(i=rr(this,r,t,n,l,c,h,m,v,x),i)i.faceIndex=Math.floor(_/3),e.push(i)}}else if(a!==void 0)if(Array.isArray(r))for(let f=0,g=u.length;f<g;f++){let _=u[f],p=r[_.materialIndex],m=Math.max(_.start,d.start),v=Math.min(a.count,Math.min(_.start+_.count,d.start+d.count));for(let x=m,E=v;x<E;x+=3){let I=x,w=x+1,A=x+2;if(i=rr(this,p,t,n,l,c,h,I,w,A),i)i.faceIndex=Math.floor(x/3),i.face.materialIndex=_.materialIndex,e.push(i)}}else{let f=Math.max(0,d.start),g=Math.min(a.count,d.start+d.count);for(let _=f,p=g;_<p;_+=3){let m=_,v=_+1,x=_+2;if(i=rr(this,r,t,n,l,c,h,m,v,x),i)i.faceIndex=Math.floor(_/3),e.push(i)}}}}function rd(t,e,n,i,s,r,o,a){let l;if(e.side===1)l=i.intersectTriangle(o,r,s,!0,a);else l=i.intersectTriangle(s,r,o,e.side===0,a);if(l===null)return null;sr.copy(a),sr.applyMatrix4(t.matrixWorld);let c=n.ray.origin.distanceTo(sr);if(c<n.near||c>n.far)return null;return{distance:c,point:sr.clone(),object:t}}function rr(t,e,n,i,s,r,o,a,l,c){t.getVertexPosition(a,tr),t.getVertexPosition(l,er),t.getVertexPosition(c,nr);let h=rd(t,e,n,i,tr,er,nr,hl);if(h){let u=new b;if(cn.getBarycoord(hl,tr,er,nr,u),s)h.uv=cn.getInterpolatedAttribute(s,a,l,c,u,new ot);if(r)h.uv1=cn.getInterpolatedAttribute(r,a,l,c,u,new ot);if(o){if(h.normal=cn.getInterpolatedAttribute(o,a,l,c,u,new b),h.normal.dot(i.direction)>0)h.normal.multiplyScalar(-1)}let d={a,b:l,c,normal:new b,materialIndex:0};cn.getNormal(tr,er,nr,d.normal),h.face=d,h.barycoord=u}return h}class ze extends he{constructor(t=1,e=1,n=1,i=1,s=1,r=1){super();this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:r};let o=this;i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);let a=[],l=[],c=[],h=[],u=0,d=0;f("z","y","x",-1,-1,n,e,t,r,s,0),f("z","y","x",1,-1,n,e,-t,r,s,1),f("x","z","y",1,1,t,n,e,i,r,2),f("x","z","y",1,-1,t,n,-e,i,r,3),f("x","y","z",1,-1,t,e,n,i,s,4),f("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(a),this.setAttribute("position",new Jt(l,3)),this.setAttribute("normal",new Jt(c,3)),this.setAttribute("uv",new Jt(h,2));function f(g,_,p,m,v,x,E,I,w,A,U){let M=x/w,T=E/A,C=x/2,z=E/2,k=I/2,G=w+1,K=A+1,V=0,j=0,H=new b;for(let ct=0;ct<K;ct++){let ut=ct*T-z;for(let Ct=0;Ct<G;Ct++){let Wt=Ct*M-C;H[g]=Wt*m,H[_]=ut*v,H[p]=k,l.push(H.x,H.y,H.z),H[g]=0,H[_]=0,H[p]=I>0?1:-1,c.push(H.x,H.y,H.z),h.push(Ct/w),h.push(1-ct/A),V+=1}}for(let ct=0;ct<A;ct++)for(let ut=0;ut<w;ut++){let Ct=u+ut+G*ct,Wt=u+ut+G*(ct+1),q=u+(ut+1)+G*(ct+1),tt=u+(ut+1)+G*ct;a.push(Ct,Wt,tt),a.push(Wt,q,tt),j+=6}o.addGroup(d,j,U),d+=j,u+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ze(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Wi(t){let e={};for(let n in t){e[n]={};for(let i in t[n]){let s=t[n][i];if(s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion))if(s.isRenderTargetTexture)console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null;else e[n][i]=s.clone();else if(Array.isArray(s))e[n][i]=s.slice();else e[n][i]=s}}return e}function Fe(t){let e={};for(let n=0;n<t.length;n++){let i=Wi(t[n]);for(let s in i)e[s]=i[s]}return e}function od(t){let e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Ec(t){let e=t.getRenderTarget();if(e===null)return t.outputColorSpace;if(e.isXRRenderTarget===!0)return e.texture.colorSpace;return Xt.workingColorSpace}var ad={clone:Wi,merge:Fe},ld=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Un extends Xe{static get type(){return"ShaderMaterial"}constructor(t){super();if(this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ld,this.fragmentShader=cd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0)this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Wi(t.uniforms),this.uniformsGroups=od(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let r=this.uniforms[i].value;if(r&&r.isTexture)e.uniforms[i]={type:"t",value:r.toJSON(t).uuid};else if(r&&r.isColor)e.uniforms[i]={type:"c",value:r.getHex()};else if(r&&r.isVector2)e.uniforms[i]={type:"v2",value:r.toArray()};else if(r&&r.isVector3)e.uniforms[i]={type:"v3",value:r.toArray()};else if(r&&r.isVector4)e.uniforms[i]={type:"v4",value:r.toArray()};else if(r&&r.isMatrix3)e.uniforms[i]={type:"m3",value:r.toArray()};else if(r&&r.isMatrix4)e.uniforms[i]={type:"m4",value:r.toArray()};else e.uniforms[i]={value:r}}if(Object.keys(this.defines).length>0)e.defines=this.defines;e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)if(this.extensions[i]===!0)n[i]=!0;if(Object.keys(n).length>0)e.extensions=n;return e}}class Bo extends le{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new At,this.projectionMatrix=new At,this.projectionMatrixInverse=new At,this.coordinateSystem=2000}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}var Yn=new b,ul=new ot,dl=new ot;class we extends Bo{constructor(t=50,e=1,n=0.1,i=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=0.5*this.getFilmHeight()/t;this.fov=Vi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(gs*0.5*this.fov);return 0.5*this.getFilmHeight()/t}getEffectiveFOV(){return Vi*2*Math.atan(Math.tan(gs*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Yn.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),e.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z),Yn.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z)}getViewSize(t,e){return this.getViewBounds(t,ul,dl),e.subVectors(dl,ul)}setViewOffset(t,e,n,i,s,r){if(this.aspect=t/e,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(gs*0.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-0.5*i,r=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:a,fullHeight:l}=r;s+=r.offsetX*i/a,e-=r.offsetY*n/l,i*=r.width/a,n*=r.height/l}let o=this.filmOffset;if(o!==0)s+=t*o/this.getFilmWidth();this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);if(e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null)e.object.view=Object.assign({},this.view);return e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}var Fi=-90,Oi=1;class Tc extends le{constructor(t,e,n){super();this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new we(Fi,Oi,t,e);i.layers=this.layers,this.add(i);let s=new we(Fi,Oi,t,e);s.layers=this.layers,this.add(s);let r=new we(Fi,Oi,t,e);r.layers=this.layers,this.add(r);let o=new we(Fi,Oi,t,e);o.layers=this.layers,this.add(o);let a=new we(Fi,Oi,t,e);a.layers=this.layers,this.add(a);let l=new we(Fi,Oi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,s,r,o,a]=e;for(let l of e)this.remove(l);if(t===2000)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),a.up.set(0,1,0),a.lookAt(0,0,-1);else if(t===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),a.up.set(0,-1,0),a.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;if(this.coordinateSystem!==t.coordinateSystem)this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem();let[s,r,o,a,l,c]=this.children,h=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),f=t.xr.enabled;t.xr.enabled=!1;let g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,r),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,a),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,i),t.render(e,c),t.setRenderTarget(h,u,d),t.xr.enabled=f,n.texture.needsPMREMUpdate=!0}}class zo extends Se{constructor(t,e,n,i,s,r,o,a,l,c){t=t!==void 0?t:[],e=e!==void 0?e:301;super(t,e,n,i,s,r,o,a,l,c);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class bc extends $n{constructor(t=1,e={}){super(t,t,e);this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new zo(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:1006}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ze(5,5,5),s=new Un({name:"CubemapFromEquirect",uniforms:Wi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=e;let r=new vt(i,s),o=e.minFilter;if(e.minFilter===1008)e.minFilter=1006;return new Tc(1,10,this).update(t,r),e.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,n,i){let s=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,i);t.setRenderTarget(s)}}var lo=new b,hd=new b,ud=new Ft;class Zn{constructor(t=new b(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=lo.subVectors(n,e).cross(hd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(lo),i=this.normal.dot(n);if(i===0){if(this.distanceToPoint(t.start)===0)return e.copy(t.start);return null}let s=-(t.start.dot(this.normal)+this.constant)/i;if(s<0||s>1)return null;return e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||ud.getNormalMatrix(t),i=this.coplanarPoint(lo).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}var li=new Je,or=new b;class wr{constructor(t=new Zn,e=new Zn,n=new Zn,i=new Zn,s=new Zn,r=new Zn){this.planes=[t,e,n,i,s,r]}set(t,e,n,i,s,r){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(r),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=2000){let n=this.planes,i=t.elements,s=i[0],r=i[1],o=i[2],a=i[3],l=i[4],c=i[5],h=i[6],u=i[7],d=i[8],f=i[9],g=i[10],_=i[11],p=i[12],m=i[13],v=i[14],x=i[15];if(n[0].setComponents(a-s,u-l,_-d,x-p).normalize(),n[1].setComponents(a+s,u+l,_+d,x+p).normalize(),n[2].setComponents(a+r,u+c,_+f,x+m).normalize(),n[3].setComponents(a-r,u-c,_-f,x-m).normalize(),n[4].setComponents(a-o,u-h,_-g,x-v).normalize(),e===2000)n[5].setComponents(a+o,u+h,_+g,x+v).normalize();else if(e===2001)n[5].setComponents(o,h,g,v).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0){if(t.boundingSphere===null)t.computeBoundingSphere();li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld)}else{let e=t.geometry;if(e.boundingSphere===null)e.computeBoundingSphere();li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(li)}intersectsSprite(t){return li.center.set(0,0,0),li.radius=0.7071067811865476,li.applyMatrix4(t.matrixWorld),this.intersectsSphere(li)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(or.x=i.normal.x>0?t.max.x:t.min.x,or.y=i.normal.y>0?t.max.y:t.min.y,or.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(or)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function wc(){let t=null,e=!1,n=null,i=null;function s(r,o){n(r,o),i=t.requestAnimationFrame(s)}return{start:function(){if(e===!0)return;if(n===null)return;i=t.requestAnimationFrame(s),e=!0},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){n=r},setContext:function(r){t=r}}}function dd(t){let e=new WeakMap;function n(a,l){let{array:c,usage:h}=a,u=c.byteLength,d=t.createBuffer();t.bindBuffer(l,d),t.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=t.FLOAT;else if(c instanceof Uint16Array)if(a.isFloat16BufferAttribute)f=t.HALF_FLOAT;else f=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=t.SHORT;else if(c instanceof Uint32Array)f=t.UNSIGNED_INT;else if(c instanceof Int32Array)f=t.INT;else if(c instanceof Int8Array)f=t.BYTE;else if(c instanceof Uint8Array)f=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=t.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){let{array:h,updateRanges:u}=l;if(t.bindBuffer(c,a),u.length===0)t.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],_=u[f];if(_.start<=g.start+g.count+1)g.count=Math.max(g.count,_.start+_.count-g.start);else++d,u[d]=_}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let _=u[f];t.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){if(a.isInterleavedBufferAttribute)a=a.data;return e.get(a)}function r(a){if(a.isInterleavedBufferAttribute)a=a.data;let l=e.get(a);if(l)t.deleteBuffer(l.buffer),e.delete(a)}function o(a,l){if(a.isInterleavedBufferAttribute)a=a.data;if(a.isGLBufferAttribute){let h=e.get(a);if(!h||h.version<a.version)e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class De extends he{constructor(t=1,e=1,n=1,i=1){super();this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let s=t/2,r=e/2,o=Math.floor(n),a=Math.floor(i),l=o+1,c=a+1,h=t/o,u=e/a,d=[],f=[],g=[],_=[];for(let p=0;p<c;p++){let m=p*u-r;for(let v=0;v<l;v++){let x=v*h-s;f.push(x,-m,0),g.push(0,0,1),_.push(v/o),_.push(1-p/a)}}for(let p=0;p<a;p++)for(let m=0;m<o;m++){let v=m+l*p,x=m+l*(p+1),E=m+1+l*(p+1),I=m+1+l*p;d.push(v,x,I),d.push(x,E,I)}this.setIndex(d),this.setAttribute("position",new Jt(f,3)),this.setAttribute("normal",new Jt(g,3)),this.setAttribute("uv",new Jt(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new De(t.width,t.height,t.widthSegments,t.heightSegments)}}var fd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pd=`#ifdef USE_ALPHAHASH
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
#endif`,md=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_d=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,xd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yd=`#ifdef USE_AOMAP
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
#endif`,vd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Sd=`#ifdef USE_BATCHING
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
#endif`,Md=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ed=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Td=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,wd=`#ifdef USE_IRIDESCENCE
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
#endif`,Ad=`#ifdef USE_BUMPMAP
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
#endif`,Rd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Cd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Id=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Pd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ld=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Nd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Dd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ud=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Fd=`#define PI 3.141592653589793
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
} // validated`,Od=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Bd=`vec3 transformedNormal = objectNormal;
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
#endif`,zd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Vd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xd=`#ifdef USE_ENVMAP
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
#endif`,qd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Yd=`#ifdef USE_ENVMAP
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
#endif`,Zd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Kd=`#ifdef USE_ENVMAP
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
#endif`,$d=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tf=`#ifdef USE_GRADIENTMAP
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
}`,ef=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rf=`uniform bool receiveShadow;
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
#endif`,of=`#ifdef USE_ENVMAP
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
#endif`,af=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,uf=`PhysicalMaterial material;
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
#endif`,df=`struct PhysicalMaterial {
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
}`,ff=`
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
#endif`,pf=`#if defined( RE_IndirectDiffuse )
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
#endif`,mf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_f=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ef=`#if defined( USE_POINTS_UV )
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
#endif`,Tf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Af=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Rf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cf=`#ifdef USE_MORPHTARGETS
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
#endif`,If=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Lf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Nf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Df=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Uf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ff=`#ifdef USE_NORMALMAP
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
#endif`,Of=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Hf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Vf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$f=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,jf=`float getShadowMask() {
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
}`,Qf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,tp=`#ifdef USE_SKINNING
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
#endif`,ep=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,np=`#ifdef USE_SKINNING
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
#endif`,ip=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,op=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ap=`#ifdef USE_TRANSMISSION
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
#endif`,lp=`#ifdef USE_TRANSMISSION
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
#endif`,cp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,fp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pp=`uniform sampler2D t2D;
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
}`,mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yp=`#include <common>
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
}`,vp=`#if DEPTH_PACKING == 3200
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
}`,Sp=`#define DISTANCE
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
}`,Mp=`#define DISTANCE
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
}`,Ep=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Tp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bp=`uniform float scale;
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
}`,wp=`uniform vec3 diffuse;
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
}`,Ap=`#include <common>
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
}`,Rp=`uniform vec3 diffuse;
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
}`,Cp=`#define LAMBERT
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
}`,Ip=`#define LAMBERT
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
}`,Pp=`#define MATCAP
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
}`,Lp=`#define MATCAP
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
}`,Np=`#define NORMAL
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
}`,Dp=`#define NORMAL
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
}`,Up=`#define PHONG
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
}`,Fp=`#define PHONG
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
}`,Op=`#define STANDARD
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
}`,Bp=`#define STANDARD
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
}`,zp=`#define TOON
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
}`,Hp=`#define TOON
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
}`,kp=`uniform float size;
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
}`,Gp=`uniform vec3 diffuse;
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
}`,Vp=`#include <common>
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
}`,Wp=`uniform vec3 color;
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
}`,Xp=`uniform float rotation;
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
}`,qp=`uniform vec3 diffuse;
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
}`,Bt={alphahash_fragment:fd,alphahash_pars_fragment:pd,alphamap_fragment:md,alphamap_pars_fragment:gd,alphatest_fragment:_d,alphatest_pars_fragment:xd,aomap_fragment:yd,aomap_pars_fragment:vd,batching_pars_vertex:Sd,batching_vertex:Md,begin_vertex:Ed,beginnormal_vertex:Td,bsdfs:bd,iridescence_fragment:wd,bumpmap_pars_fragment:Ad,clipping_planes_fragment:Rd,clipping_planes_pars_fragment:Cd,clipping_planes_pars_vertex:Id,clipping_planes_vertex:Pd,color_fragment:Ld,color_pars_fragment:Nd,color_pars_vertex:Dd,color_vertex:Ud,common:Fd,cube_uv_reflection_fragment:Od,defaultnormal_vertex:Bd,displacementmap_pars_vertex:zd,displacementmap_vertex:Hd,emissivemap_fragment:kd,emissivemap_pars_fragment:Gd,colorspace_fragment:Vd,colorspace_pars_fragment:Wd,envmap_fragment:Xd,envmap_common_pars_fragment:qd,envmap_pars_fragment:Yd,envmap_pars_vertex:Zd,envmap_physical_pars_fragment:of,envmap_vertex:Kd,fog_vertex:$d,fog_pars_vertex:Jd,fog_fragment:jd,fog_pars_fragment:Qd,gradientmap_pars_fragment:tf,lightmap_pars_fragment:ef,lights_lambert_fragment:nf,lights_lambert_pars_fragment:sf,lights_pars_begin:rf,lights_toon_fragment:af,lights_toon_pars_fragment:lf,lights_phong_fragment:cf,lights_phong_pars_fragment:hf,lights_physical_fragment:uf,lights_physical_pars_fragment:df,lights_fragment_begin:ff,lights_fragment_maps:pf,lights_fragment_end:mf,logdepthbuf_fragment:gf,logdepthbuf_pars_fragment:_f,logdepthbuf_pars_vertex:xf,logdepthbuf_vertex:yf,map_fragment:vf,map_pars_fragment:Sf,map_particle_fragment:Mf,map_particle_pars_fragment:Ef,metalnessmap_fragment:Tf,metalnessmap_pars_fragment:bf,morphinstance_vertex:wf,morphcolor_vertex:Af,morphnormal_vertex:Rf,morphtarget_pars_vertex:Cf,morphtarget_vertex:If,normal_fragment_begin:Pf,normal_fragment_maps:Lf,normal_pars_fragment:Nf,normal_pars_vertex:Df,normal_vertex:Uf,normalmap_pars_fragment:Ff,clearcoat_normal_fragment_begin:Of,clearcoat_normal_fragment_maps:Bf,clearcoat_pars_fragment:zf,iridescence_pars_fragment:Hf,opaque_fragment:kf,packing:Gf,premultiplied_alpha_fragment:Vf,project_vertex:Wf,dithering_fragment:Xf,dithering_pars_fragment:qf,roughnessmap_fragment:Yf,roughnessmap_pars_fragment:Zf,shadowmap_pars_fragment:Kf,shadowmap_pars_vertex:$f,shadowmap_vertex:Jf,shadowmask_pars_fragment:jf,skinbase_vertex:Qf,skinning_pars_vertex:tp,skinning_vertex:ep,skinnormal_vertex:np,specularmap_fragment:ip,specularmap_pars_fragment:sp,tonemapping_fragment:rp,tonemapping_pars_fragment:op,transmission_fragment:ap,transmission_pars_fragment:lp,uv_pars_fragment:cp,uv_pars_vertex:hp,uv_vertex:up,worldpos_vertex:dp,background_vert:fp,background_frag:pp,backgroundCube_vert:mp,backgroundCube_frag:gp,cube_vert:_p,cube_frag:xp,depth_vert:yp,depth_frag:vp,distanceRGBA_vert:Sp,distanceRGBA_frag:Mp,equirect_vert:Ep,equirect_frag:Tp,linedashed_vert:bp,linedashed_frag:wp,meshbasic_vert:Ap,meshbasic_frag:Rp,meshlambert_vert:Cp,meshlambert_frag:Ip,meshmatcap_vert:Pp,meshmatcap_frag:Lp,meshnormal_vert:Np,meshnormal_frag:Dp,meshphong_vert:Up,meshphong_frag:Fp,meshphysical_vert:Op,meshphysical_frag:Bp,meshtoon_vert:zp,meshtoon_frag:Hp,points_vert:kp,points_frag:Gp,shadow_vert:Vp,shadow_frag:Wp,sprite_vert:Xp,sprite_frag:qp},it={common:{diffuse:{value:new Mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},envMapRotation:{value:new Ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new Mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new Mt(16777215)},opacity:{value:1},center:{value:new ot(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},En={basic:{uniforms:Fe([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.fog]),vertexShader:Bt.meshbasic_vert,fragmentShader:Bt.meshbasic_frag},lambert:{uniforms:Fe([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new Mt(0)}}]),vertexShader:Bt.meshlambert_vert,fragmentShader:Bt.meshlambert_frag},phong:{uniforms:Fe([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new Mt(0)},specular:{value:new Mt(1118481)},shininess:{value:30}}]),vertexShader:Bt.meshphong_vert,fragmentShader:Bt.meshphong_frag},standard:{uniforms:Fe([it.common,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.roughnessmap,it.metalnessmap,it.fog,it.lights,{emissive:{value:new Mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag},toon:{uniforms:Fe([it.common,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.gradientmap,it.fog,it.lights,{emissive:{value:new Mt(0)}}]),vertexShader:Bt.meshtoon_vert,fragmentShader:Bt.meshtoon_frag},matcap:{uniforms:Fe([it.common,it.bumpmap,it.normalmap,it.displacementmap,it.fog,{matcap:{value:null}}]),vertexShader:Bt.meshmatcap_vert,fragmentShader:Bt.meshmatcap_frag},points:{uniforms:Fe([it.points,it.fog]),vertexShader:Bt.points_vert,fragmentShader:Bt.points_frag},dashed:{uniforms:Fe([it.common,it.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Bt.linedashed_vert,fragmentShader:Bt.linedashed_frag},depth:{uniforms:Fe([it.common,it.displacementmap]),vertexShader:Bt.depth_vert,fragmentShader:Bt.depth_frag},normal:{uniforms:Fe([it.common,it.bumpmap,it.normalmap,it.displacementmap,{opacity:{value:1}}]),vertexShader:Bt.meshnormal_vert,fragmentShader:Bt.meshnormal_frag},sprite:{uniforms:Fe([it.sprite,it.fog]),vertexShader:Bt.sprite_vert,fragmentShader:Bt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Bt.background_vert,fragmentShader:Bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ft}},vertexShader:Bt.backgroundCube_vert,fragmentShader:Bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Bt.cube_vert,fragmentShader:Bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Bt.equirect_vert,fragmentShader:Bt.equirect_frag},distanceRGBA:{uniforms:Fe([it.common,it.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:Bt.distanceRGBA_vert,fragmentShader:Bt.distanceRGBA_frag},shadow:{uniforms:Fe([it.lights,it.fog,{color:{value:new Mt(0)},opacity:{value:1}}]),vertexShader:Bt.shadow_vert,fragmentShader:Bt.shadow_frag}};En.physical={uniforms:Fe([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new Mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new Mt(0)},specularColor:{value:new Mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag};var ar={r:0,b:0,g:0},ci=new hn,Yp=new At;function Zp(t,e,n,i,s,r,o){let a=new Mt(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(v){let x=v.isScene===!0?v.background:null;if(x&&x.isTexture)x=(v.backgroundBlurriness>0?n:e).get(x);return x}function _(v){let x=!1,E=g(v);if(E===null)m(a,l);else if(E&&E.isColor)m(E,1),x=!0;let I=t.xr.getEnvironmentBlendMode();if(I==="additive")i.buffers.color.setClear(0,0,0,1,o);else if(I==="alpha-blend")i.buffers.color.setClear(0,0,0,0,o);if(t.autoClear||x)i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil)}function p(v,x){let E=g(x);if(E&&(E.isCubeTexture||E.mapping===306)){if(h===void 0)h=new vt(new ze(1,1,1),new Un({name:"BackgroundCubeMaterial",uniforms:Wi(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h);if(ci.copy(x.backgroundRotation),ci.x*=-1,ci.y*=-1,ci.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1)ci.y*=-1,ci.z*=-1;if(h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Yp.makeRotationFromEuler(ci)),h.material.toneMapped=Xt.getTransfer(E.colorSpace)!=="srgb",u!==E||d!==E.version||f!==t.toneMapping)h.material.needsUpdate=!0,u=E,d=E.version,f=t.toneMapping;h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)}else if(E&&E.isTexture){if(c===void 0)c=new vt(new De(2,2),new Un({name:"BackgroundMaterial",uniforms:Wi(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c);if(c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Xt.getTransfer(E.colorSpace)!=="srgb",E.matrixAutoUpdate===!0)E.updateMatrix();if(c.material.uniforms.uvTransform.value.copy(E.matrix),u!==E||d!==E.version||f!==t.toneMapping)c.material.needsUpdate=!0,u=E,d=E.version,f=t.toneMapping;c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)}}function m(v,x){v.getRGB(ar,Ec(t)),i.buffers.color.setClear(ar.r,ar.g,ar.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),l=x,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,m(a,l)},render:_,addToRenderList:p}}function Kp(t,e){let n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},s=d(null),r=s,o=!1;function a(T,C,z,k,G){let K=!1,V=u(k,z,C);if(r!==V)r=V,c(r.object);if(K=f(T,k,z,G),K)g(T,k,z,G);if(G!==null)e.update(G,t.ELEMENT_ARRAY_BUFFER);if(K||o){if(o=!1,E(T,C,z,k),G!==null)t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(G).buffer)}}function l(){return t.createVertexArray()}function c(T){return t.bindVertexArray(T)}function h(T){return t.deleteVertexArray(T)}function u(T,C,z){let k=z.wireframe===!0,G=i[T.id];if(G===void 0)G={},i[T.id]=G;let K=G[C.id];if(K===void 0)K={},G[C.id]=K;let V=K[k];if(V===void 0)V=d(l()),K[k]=V;return V}function d(T){let C=[],z=[],k=[];for(let G=0;G<n;G++)C[G]=0,z[G]=0,k[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:z,attributeDivisors:k,object:T,attributes:{},index:null}}function f(T,C,z,k){let G=r.attributes,K=C.attributes,V=0,j=z.getAttributes();for(let H in j)if(j[H].location>=0){let ut=G[H],Ct=K[H];if(Ct===void 0){if(H==="instanceMatrix"&&T.instanceMatrix)Ct=T.instanceMatrix;if(H==="instanceColor"&&T.instanceColor)Ct=T.instanceColor}if(ut===void 0)return!0;if(ut.attribute!==Ct)return!0;if(Ct&&ut.data!==Ct.data)return!0;V++}if(r.attributesNum!==V)return!0;if(r.index!==k)return!0;return!1}function g(T,C,z,k){let G={},K=C.attributes,V=0,j=z.getAttributes();for(let H in j)if(j[H].location>=0){let ut=K[H];if(ut===void 0){if(H==="instanceMatrix"&&T.instanceMatrix)ut=T.instanceMatrix;if(H==="instanceColor"&&T.instanceColor)ut=T.instanceColor}let Ct={};if(Ct.attribute=ut,ut&&ut.data)Ct.data=ut.data;G[H]=Ct,V++}r.attributes=G,r.attributesNum=V,r.index=k}function _(){let T=r.newAttributes;for(let C=0,z=T.length;C<z;C++)T[C]=0}function p(T){m(T,0)}function m(T,C){let{newAttributes:z,enabledAttributes:k,attributeDivisors:G}=r;if(z[T]=1,k[T]===0)t.enableVertexAttribArray(T),k[T]=1;if(G[T]!==C)t.vertexAttribDivisor(T,C),G[T]=C}function v(){let{newAttributes:T,enabledAttributes:C}=r;for(let z=0,k=C.length;z<k;z++)if(C[z]!==T[z])t.disableVertexAttribArray(z),C[z]=0}function x(T,C,z,k,G,K,V){if(V===!0)t.vertexAttribIPointer(T,C,z,G,K);else t.vertexAttribPointer(T,C,z,k,G,K)}function E(T,C,z,k){_();let G=k.attributes,K=z.getAttributes(),V=C.defaultAttributeValues;for(let j in K){let H=K[j];if(H.location>=0){let ct=G[j];if(ct===void 0){if(j==="instanceMatrix"&&T.instanceMatrix)ct=T.instanceMatrix;if(j==="instanceColor"&&T.instanceColor)ct=T.instanceColor}if(ct!==void 0){let{normalized:ut,itemSize:Ct}=ct,Wt=e.get(ct);if(Wt===void 0)continue;let{buffer:q,type:tt,bytesPerElement:St}=Wt,Et=tt===t.INT||tt===t.UNSIGNED_INT||ct.gpuType===1013;if(ct.isInterleavedBufferAttribute){let st=ct.data,wt=st.stride,re=ct.offset;if(st.isInstancedInterleavedBuffer){for(let qt=0;qt<H.locationSize;qt++)m(H.location+qt,st.meshPerAttribute);if(T.isInstancedMesh!==!0&&k._maxInstanceCount===void 0)k._maxInstanceCount=st.meshPerAttribute*st.count}else for(let qt=0;qt<H.locationSize;qt++)p(H.location+qt);t.bindBuffer(t.ARRAY_BUFFER,q);for(let qt=0;qt<H.locationSize;qt++)x(H.location+qt,Ct/H.locationSize,tt,ut,wt*St,(re+Ct/H.locationSize*qt)*St,Et)}else{if(ct.isInstancedBufferAttribute){for(let st=0;st<H.locationSize;st++)m(H.location+st,ct.meshPerAttribute);if(T.isInstancedMesh!==!0&&k._maxInstanceCount===void 0)k._maxInstanceCount=ct.meshPerAttribute*ct.count}else for(let st=0;st<H.locationSize;st++)p(H.location+st);t.bindBuffer(t.ARRAY_BUFFER,q);for(let st=0;st<H.locationSize;st++)x(H.location+st,Ct/H.locationSize,tt,ut,Ct*St,Ct/H.locationSize*st*St,Et)}}else if(V!==void 0){let ut=V[j];if(ut!==void 0)switch(ut.length){case 2:t.vertexAttrib2fv(H.location,ut);break;case 3:t.vertexAttrib3fv(H.location,ut);break;case 4:t.vertexAttrib4fv(H.location,ut);break;default:t.vertexAttrib1fv(H.location,ut)}}}}v()}function I(){U();for(let T in i){let C=i[T];for(let z in C){let k=C[z];for(let G in k)h(k[G].object),delete k[G];delete C[z]}delete i[T]}}function w(T){if(i[T.id]===void 0)return;let C=i[T.id];for(let z in C){let k=C[z];for(let G in k)h(k[G].object),delete k[G];delete C[z]}delete i[T.id]}function A(T){for(let C in i){let z=i[C];if(z[T.id]===void 0)continue;let k=z[T.id];for(let G in k)h(k[G].object),delete k[G];delete z[T.id]}}function U(){if(M(),o=!0,r===s)return;r=s,c(r.object)}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:U,resetDefaultState:M,dispose:I,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:p,disableUnusedAttributes:v}}function $p(t,e,n){let i;function s(c){i=c}function r(c,h){t.drawArrays(i,c,h),n.update(h,i,1)}function o(c,h,u){if(u===0)return;t.drawArraysInstanced(i,c,h,u),n.update(h,i,u)}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];n.update(f,i,1)}function l(c,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];n.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Jp(t,e,n,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");s=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){if(A!==1023&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function a(A){let U=A===1016&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));if(A!==1009&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==1015&&!U)return!1;return!0}function l(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}if(A==="mediump"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let c=n.precision!==void 0?n.precision:"highp",h=l(c);if(h!==c)console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h;let u=n.logarithmicDepthBuffer===!0,d=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_TEXTURE_SIZE),p=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),m=t.getParameter(t.MAX_VERTEX_ATTRIBS),v=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),x=t.getParameter(t.MAX_VARYING_VECTORS),E=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,w=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:v,maxVaryings:x,maxFragmentUniforms:E,vertexTextures:I,maxSamples:w}}function jp(t){let e=this,n=null,i=0,s=!1,r=!1,o=new Zn,a=new Ft,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||i!==0||s;return s=d,i=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){n=h(u,d,0)},this.setState=function(u,d,f){let{clippingPlanes:g,clipIntersection:_,clipShadows:p}=u,m=t.get(u);if(!s||g===null||g.length===0||r&&!p)if(r)h(null);else c();else{let v=r?0:i,x=v*4,E=m.clippingState||null;l.value=E,E=h(g,d,x,f);for(let I=0;I!==x;++I)E[I]=n[I];m.clippingState=E,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){if(l.value!==n)l.value=n,l.needsUpdate=i>0;e.numPlanes=i,e.numIntersection=0}function h(u,d,f,g){let _=u!==null?u.length:0,p=null;if(_!==0){if(p=l.value,g!==!0||p===null){let m=f+_*4,v=d.matrixWorldInverse;if(a.getNormalMatrix(v),p===null||p.length<m)p=new Float32Array(m);for(let x=0,E=f;x!==_;++x,E+=4)o.copy(u[x]).applyMatrix4(v,a),o.normal.toArray(p,E),p[E+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function Qp(t){let e=new WeakMap;function n(o,a){if(a===303)o.mapping=301;else if(a===304)o.mapping=302;return o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===303||a===304)if(e.has(o)){let l=e.get(o).texture;return n(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new bc(l.height);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",s),n(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=e.get(a);if(l!==void 0)e.delete(a),l.dispose()}function r(){e=new WeakMap}return{get:i,dispose:r}}class As extends Bo{constructor(t=-1,e=1,n=1,i=-1,s=0.1,r=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,r){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-t,r=n+t,o=i+e,a=i-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,r=s+l*this.view.width,o-=c*this.view.offsetY,a=o-c*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,a,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);if(e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null)e.object.view=Object.assign({},this.view);return e}}var Hi=4,fl=[0.125,0.215,0.35,0.446,0.526,0.582],di=20,co=new As,pl=new Mt,ho=null,uo=0,fo=0,po=!1,ui=(1+Math.sqrt(5))/2,Bi=1/ui,ml=[new b(-ui,Bi,0),new b(ui,Bi,0),new b(-Bi,0,ui),new b(Bi,0,ui),new b(0,ui,-Bi),new b(0,ui,Bi),new b(-1,1,-1),new b(1,1,-1),new b(-1,1,1),new b(1,1,1)];class To{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=0.1,i=100){ho=this._renderer.getRenderTarget(),uo=this._renderer.getActiveCubeFace(),fo=this._renderer.getActiveMipmapLevel(),po=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();if(s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0)this._blur(s,0,0,e);return this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=xl(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=_l(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ho,uo,fo),this._renderer.xr.enabled=po,t.scissorTest=!1,lr(t,0,0,t.width,t.height)}_fromTexture(t,e){if(t.mapping===301||t.mapping===302)this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width);else this._setSize(t.image.width/4);ho=this._renderer.getRenderTarget(),uo=this._renderer.getActiveCubeFace(),fo=this._renderer.getActiveMipmapLevel(),po=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:"srgb-linear",depthBuffer:!1},i=gl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=gl(t,e,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=tm(s)),this._blurMaterial=em(s,t,e)}return i}_compileMaterial(t){let e=new vt(this._lodPlanes[0],t);this._renderer.compile(e,co)}_sceneToCubeUV(t,e,n,i){let o=new we(90,1,e,n),a=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,h=c.autoClear,u=c.toneMapping;c.getClearColor(pl),c.toneMapping=0,c.autoClear=!1;let d=new ne({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),f=new vt(new ze,d),g=!1,_=t.background;if(_){if(_.isColor)d.color.copy(_),t.background=null,g=!0}else d.color.copy(pl),g=!0;for(let p=0;p<6;p++){let m=p%3;if(m===0)o.up.set(0,a[p],0),o.lookAt(l[p],0,0);else if(m===1)o.up.set(0,0,a[p]),o.lookAt(0,l[p],0);else o.up.set(0,a[p],0),o.lookAt(0,0,l[p]);let v=this._cubeSize;if(lr(i,m*v,p>2?v:0,v,v),c.setRenderTarget(i),g)c.render(f,o);c.render(t,o)}f.geometry.dispose(),f.material.dispose(),c.toneMapping=u,c.autoClear=h,t.background=_}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===301||t.mapping===302;if(i){if(this._cubemapMaterial===null)this._cubemapMaterial=xl();this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=_l();let s=i?this._cubemapMaterial:this._equirectMaterial,r=new vt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;let a=this._cubeSize;lr(e,0,0,3*a,2*a),n.setRenderTarget(e),n.render(r,co)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=ml[(i-s-1)%ml.length];this._blur(t,s-1,s,r,o)}e.autoClear=n}_blur(t,e,n,i,s){let r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,i,"latitudinal",s),this._halfBlur(r,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,r,o){let a=this._renderer,l=this._blurMaterial;if(r!=="latitudinal"&&r!=="longitudinal")console.error("blur direction must be either latitudinal or longitudinal!");let c=3,h=new vt(this._lodPlanes[i],l),u=l.uniforms,d=this._sizeLods[n]-1,f=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*di-1),g=s/f,_=isFinite(s)?1+Math.floor(c*g):di;if(_>di)console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${di}`);let p=[],m=0;for(let w=0;w<di;++w){let A=w/g,U=Math.exp(-A*A/2);if(p.push(U),w===0)m+=U;else if(w<_)m+=2*U}for(let w=0;w<p.length;w++)p[w]=p[w]/m;if(u.envMap.value=t.texture,u.samples.value=_,u.weights.value=p,u.latitudinal.value=r==="latitudinal",o)u.poleAxis.value=o;let{_lodMax:v}=this;u.dTheta.value=f,u.mipInt.value=v-n;let x=this._sizeLods[i],E=3*x*(i>v-Hi?i-v+Hi:0),I=4*(this._cubeSize-x);lr(e,E,I,3*x,2*x),a.setRenderTarget(e),a.render(h,co)}}function tm(t){let e=[],n=[],i=[],s=t,r=t-Hi+1+fl.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);n.push(a);let l=1/a;if(o>t-Hi)l=fl[o-t+Hi-1];else if(o===0)l=0;i.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,p=2,m=1,v=new Float32Array(_*g*f),x=new Float32Array(p*g*f),E=new Float32Array(m*g*f);for(let w=0;w<f;w++){let A=w%3*2/3-1,U=w>2?0:-1,M=[A,U,0,A+0.6666666666666666,U,0,A+0.6666666666666666,U+1,0,A,U,0,A+0.6666666666666666,U+1,0,A,U+1,0];v.set(M,_*g*w),x.set(d,p*g*w);let T=[w,w,w,w,w,w];E.set(T,m*g*w)}let I=new he;if(I.setAttribute("position",new Ae(v,_)),I.setAttribute("uv",new Ae(x,p)),I.setAttribute("faceIndex",new Ae(E,m)),e.push(I),s>Hi)s--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function gl(t,e,n){let i=new $n(t,e,n);return i.texture.mapping=306,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function lr(t,e,n,i,s){t.viewport.set(e,n,i,s),t.scissor.set(e,n,i,s)}function em(t,e,n){let i=new Float32Array(di),s=new b(0,1,0);return new Un({name:"SphericalGaussianBlur",defines:{n:di,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ho(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function _l(){return new Un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ho(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function xl(){return new Un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ho(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ho(){return`

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
	`}function nm(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===303||l===304,h=l===301||l===302;if(c||h){let u=e.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d){if(n===null)n=new To(t);return u=c?n.fromEquirectangular(a,u):n.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture}else if(u!==void 0)return u.texture;else{let f=a.image;if(c&&f&&f.height>0||h&&f&&s(f)){if(n===null)n=new To(t);return u=c?n.fromEquirectangular(a):n.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture}else return null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)if(a[h]!==void 0)l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=e.get(l);if(c!==void 0)e.delete(l),c.dispose()}function o(){if(e=new WeakMap,n!==null)n.dispose(),n=null}return{get:i,dispose:o}}function im(t){let e={};function n(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=t.getExtension(i)}return e[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let s=n(i);if(s===null)ps("THREE.WebGLRenderer: "+i+" extension not supported.");return s}}}function sm(t,e,n,i){let s={},r=new WeakMap;function o(u){let d=u.target;if(d.index!==null)e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);for(let g in d.morphAttributes){let _=d.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)e.remove(_[p])}d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);if(f)e.remove(f),r.delete(d);if(i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0)delete d._maxInstanceCount;n.memory.geometries--}function a(u,d){if(s[d.id]===!0)return d;return d.addEventListener("dispose",o),s[d.id]=!0,n.memory.geometries++,d}function l(u){let d=u.attributes;for(let g in d)e.update(d[g],t.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let _=f[g];for(let p=0,m=_.length;p<m;p++)e.update(_[p],t.ARRAY_BUFFER)}}function c(u){let d=[],f=u.index,g=u.attributes.position,_=0;if(f!==null){let v=f.array;_=f.version;for(let x=0,E=v.length;x<E;x+=3){let I=v[x+0],w=v[x+1],A=v[x+2];d.push(I,w,w,A,A,I)}}else if(g!==void 0){let v=g.array;_=g.version;for(let x=0,E=v.length/3-1;x<E;x+=3){let I=x+0,w=x+1,A=x+2;d.push(I,w,w,A,A,I)}}else return;let p=new((xc(d))?Oo:Fo)(d,1);p.version=_;let m=r.get(u);if(m)e.remove(m);r.set(u,p)}function h(u){let d=r.get(u);if(d){let f=u.index;if(f!==null){if(d.version<f.version)c(u)}}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function rm(t,e,n){let i;function s(d){i=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){t.drawElements(i,f,r,d*o),n.update(f,i,1)}function c(d,f,g){if(g===0)return;t.drawElementsInstanced(i,f,r,d*o,g),n.update(f,i,g)}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,d,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];n.update(p,i,1)}function u(d,f,g,_){if(g===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)c(d[m]/o,f[m],_[m]);else{p.multiDrawElementsInstancedWEBGL(i,f,0,r,d,0,_,0,g);let m=0;for(let v=0;v<g;v++)m+=f[v]*_[v];n.update(m,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function om(t){let e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(r/3);break;case t.LINES:n.lines+=a*(r/2);break;case t.LINE_STRIP:n.lines+=a*(r-1);break;case t.LINE_LOOP:n.lines+=a*r;break;case t.POINTS:n.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:s,update:i}}function am(t,e,n){let i=new WeakMap,s=new $t;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(a);if(d===void 0||d.count!==u){let M=function(){A.dispose(),i.delete(a),a.removeEventListener("dispose",M)};if(d!==void 0)d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],x=0;if(f===!0)x=1;if(g===!0)x=2;if(_===!0)x=3;let E=a.attributes.position.count*x,I=1;if(E>e.maxTextureSize)I=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize;let w=new Float32Array(E*I*4*u),A=new Uo(w,E,I,u);A.type=1015,A.needsUpdate=!0;let U=x*4;for(let T=0;T<u;T++){let C=p[T],z=m[T],k=v[T],G=E*I*4*T;for(let K=0;K<C.count;K++){let V=K*U;if(f===!0)s.fromBufferAttribute(C,K),w[G+V+0]=s.x,w[G+V+1]=s.y,w[G+V+2]=s.z,w[G+V+3]=0;if(g===!0)s.fromBufferAttribute(z,K),w[G+V+4]=s.x,w[G+V+5]=s.y,w[G+V+6]=s.z,w[G+V+7]=0;if(_===!0)s.fromBufferAttribute(k,K),w[G+V+8]=s.x,w[G+V+9]=s.y,w[G+V+10]=s.z,w[G+V+11]=k.itemSize===4?s.w:1}}d={count:u,texture:A,size:new ot(E,I)},i.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(t,"morphTargetBaseInfluence",g),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",d.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",d.size)}return{update:r}}function lm(t,e,n,i){let s=new WeakMap;function r(l){let c=i.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c)e.update(u),s.set(u,c);if(l.isInstancedMesh){if(l.hasEventListener("dispose",a)===!1)l.addEventListener("dispose",a);if(s.get(l)!==c){if(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null)n.update(l.instanceColor,t.ARRAY_BUFFER);s.set(l,c)}}if(l.isSkinnedMesh){let d=l.skeleton;if(s.get(d)!==c)d.update(),s.set(d,c)}return u}function o(){s=new WeakMap}function a(l){let c=l.target;if(c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null)n.remove(c.instanceColor)}return{update:r,dispose:o}}class ko extends Se{constructor(t,e,n,i,s,r,o,a,l,c=1026){if(c!==1026&&c!==1027)throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");if(n===void 0&&c===1026)n=1014;if(n===void 0&&c===1027)n=1020;super(null,i,s,r,o,a,c,n,l);this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:1003,this.minFilter=a!==void 0?a:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);if(this.compareFunction!==null)e.compareFunction=this.compareFunction;return e}}var Ac=new Se,yl=new ko(1,1),Rc=new Uo,Cc=new Sc,Ic=new zo,vl=[],Sl=[],Ml=new Float32Array(16),El=new Float32Array(9),Tl=new Float32Array(4);function $i(t,e,n){let i=t[0];if(i<=0||i>0)return t;let s=e*n,r=vl[s];if(r===void 0)r=new Float32Array(s),vl[s]=r;if(e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(r,a)}return r}function Ee(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Te(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Ar(t,e){let n=Sl[e];if(n===void 0)n=new Int32Array(e),Sl[e]=n;for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function cm(t,e){let n=this.cache;if(n[0]===e)return;t.uniform1f(this.addr,e),n[0]=e}function hm(t,e){let n=this.cache;if(e.x!==void 0){if(n[0]!==e.x||n[1]!==e.y)t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y}else{if(Ee(n,e))return;t.uniform2fv(this.addr,e),Te(n,e)}}function um(t,e){let n=this.cache;if(e.x!==void 0){if(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z}else if(e.r!==void 0){if(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b}else{if(Ee(n,e))return;t.uniform3fv(this.addr,e),Te(n,e)}}function dm(t,e){let n=this.cache;if(e.x!==void 0){if(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w}else{if(Ee(n,e))return;t.uniform4fv(this.addr,e),Te(n,e)}}function fm(t,e){let n=this.cache,i=e.elements;if(i===void 0){if(Ee(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Te(n,e)}else{if(Ee(n,i))return;Tl.set(i),t.uniformMatrix2fv(this.addr,!1,Tl),Te(n,i)}}function pm(t,e){let n=this.cache,i=e.elements;if(i===void 0){if(Ee(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Te(n,e)}else{if(Ee(n,i))return;El.set(i),t.uniformMatrix3fv(this.addr,!1,El),Te(n,i)}}function mm(t,e){let n=this.cache,i=e.elements;if(i===void 0){if(Ee(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Te(n,e)}else{if(Ee(n,i))return;Ml.set(i),t.uniformMatrix4fv(this.addr,!1,Ml),Te(n,i)}}function gm(t,e){let n=this.cache;if(n[0]===e)return;t.uniform1i(this.addr,e),n[0]=e}function _m(t,e){let n=this.cache;if(e.x!==void 0){if(n[0]!==e.x||n[1]!==e.y)t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y}else{if(Ee(n,e))return;t.uniform2iv(this.addr,e),Te(n,e)}}function xm(t,e){let n=this.cache;if(e.x!==void 0){if(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z}else{if(Ee(n,e))return;t.uniform3iv(this.addr,e),Te(n,e)}}function ym(t,e){let n=this.cache;if(e.x!==void 0){if(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w}else{if(Ee(n,e))return;t.uniform4iv(this.addr,e),Te(n,e)}}function vm(t,e){let n=this.cache;if(n[0]===e)return;t.uniform1ui(this.addr,e),n[0]=e}function Sm(t,e){let n=this.cache;if(e.x!==void 0){if(n[0]!==e.x||n[1]!==e.y)t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y}else{if(Ee(n,e))return;t.uniform2uiv(this.addr,e),Te(n,e)}}function Mm(t,e){let n=this.cache;if(e.x!==void 0){if(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z}else{if(Ee(n,e))return;t.uniform3uiv(this.addr,e),Te(n,e)}}function Em(t,e){let n=this.cache;if(e.x!==void 0){if(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w}else{if(Ee(n,e))return;t.uniform4uiv(this.addr,e),Te(n,e)}}function Tm(t,e,n){let i=this.cache,s=n.allocateTextureUnit();if(i[0]!==s)t.uniform1i(this.addr,s),i[0]=s;let r;if(this.type===t.SAMPLER_2D_SHADOW)yl.compareFunction=515,r=yl;else r=Ac;n.setTexture2D(e||r,s)}function bm(t,e,n){let i=this.cache,s=n.allocateTextureUnit();if(i[0]!==s)t.uniform1i(this.addr,s),i[0]=s;n.setTexture3D(e||Cc,s)}function wm(t,e,n){let i=this.cache,s=n.allocateTextureUnit();if(i[0]!==s)t.uniform1i(this.addr,s),i[0]=s;n.setTextureCube(e||Ic,s)}function Am(t,e,n){let i=this.cache,s=n.allocateTextureUnit();if(i[0]!==s)t.uniform1i(this.addr,s),i[0]=s;n.setTexture2DArray(e||Rc,s)}function Rm(t){switch(t){case 5126:return cm;case 35664:return hm;case 35665:return um;case 35666:return dm;case 35674:return fm;case 35675:return pm;case 35676:return mm;case 5124:case 35670:return gm;case 35667:case 35671:return _m;case 35668:case 35672:return xm;case 35669:case 35673:return ym;case 5125:return vm;case 36294:return Sm;case 36295:return Mm;case 36296:return Em;case 35678:case 36198:case 36298:case 36306:case 35682:return Tm;case 35679:case 36299:case 36307:return bm;case 35680:case 36300:case 36308:case 36293:return wm;case 36289:case 36303:case 36311:case 36292:return Am}}function Cm(t,e){t.uniform1fv(this.addr,e)}function Im(t,e){let n=$i(e,this.size,2);t.uniform2fv(this.addr,n)}function Pm(t,e){let n=$i(e,this.size,3);t.uniform3fv(this.addr,n)}function Lm(t,e){let n=$i(e,this.size,4);t.uniform4fv(this.addr,n)}function Nm(t,e){let n=$i(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function Dm(t,e){let n=$i(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function Um(t,e){let n=$i(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function Fm(t,e){t.uniform1iv(this.addr,e)}function Om(t,e){t.uniform2iv(this.addr,e)}function Bm(t,e){t.uniform3iv(this.addr,e)}function zm(t,e){t.uniform4iv(this.addr,e)}function Hm(t,e){t.uniform1uiv(this.addr,e)}function km(t,e){t.uniform2uiv(this.addr,e)}function Gm(t,e){t.uniform3uiv(this.addr,e)}function Vm(t,e){t.uniform4uiv(this.addr,e)}function Wm(t,e,n){let i=this.cache,s=e.length,r=Ar(n,s);if(!Ee(i,r))t.uniform1iv(this.addr,r),Te(i,r);for(let o=0;o!==s;++o)n.setTexture2D(e[o]||Ac,r[o])}function Xm(t,e,n){let i=this.cache,s=e.length,r=Ar(n,s);if(!Ee(i,r))t.uniform1iv(this.addr,r),Te(i,r);for(let o=0;o!==s;++o)n.setTexture3D(e[o]||Cc,r[o])}function qm(t,e,n){let i=this.cache,s=e.length,r=Ar(n,s);if(!Ee(i,r))t.uniform1iv(this.addr,r),Te(i,r);for(let o=0;o!==s;++o)n.setTextureCube(e[o]||Ic,r[o])}function Ym(t,e,n){let i=this.cache,s=e.length,r=Ar(n,s);if(!Ee(i,r))t.uniform1iv(this.addr,r),Te(i,r);for(let o=0;o!==s;++o)n.setTexture2DArray(e[o]||Rc,r[o])}function Zm(t){switch(t){case 5126:return Cm;case 35664:return Im;case 35665:return Pm;case 35666:return Lm;case 35674:return Nm;case 35675:return Dm;case 35676:return Um;case 5124:case 35670:return Fm;case 35667:case 35671:return Om;case 35668:case 35672:return Bm;case 35669:case 35673:return zm;case 5125:return Hm;case 36294:return km;case 36295:return Gm;case 36296:return Vm;case 35678:case 36198:case 36298:case 36306:case 35682:return Wm;case 35679:case 36299:case 36307:return Xm;case 35680:case 36300:case 36308:case 36293:return qm;case 36289:case 36303:case 36311:case 36292:return Ym}}class Pc{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Rm(e.type)}}class Lc{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Zm(e.type)}}class Nc{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let s=0,r=i.length;s!==r;++s){let o=i[s];o.setValue(t,e[o.id],n)}}}var mo=/(\w+)(\])?(\[|\.)?/g;function bl(t,e){t.seq.push(e),t.map[e.id]=e}function Km(t,e,n){let i=t.name,s=i.length;mo.lastIndex=0;while(!0){let r=mo.exec(i),o=mo.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l)a=a|0;if(c===void 0||c==="["&&o+2===s){bl(n,c===void 0?new Pc(a,t,e):new Lc(a,t,e));break}else{let u=n.map[a];if(u===void 0)u=new Nc(a),bl(n,u);n=u}}}class xs{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=t.getActiveUniform(e,i),r=t.getUniformLocation(e,s.name);Km(s,r,this)}}setValue(t,e,n,i){let s=this.map[e];if(s!==void 0)s.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];if(i!==void 0)this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,r=e.length;s!==r;++s){let o=e[s],a=n[o.id];if(a.needsUpdate!==!1)o.setValue(t,a.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,s=t.length;i!==s;++i){let r=t[i];if(r.id in e)n.push(r)}return n}}function wl(t,e,n){let i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}var $m=37297,Jm=0;function jm(t,e){let n=t.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,n.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}var Al=new Ft;function Qm(t){Xt._getMatrix(Al,Xt.workingColorSpace,t);let e=`mat3( ${Al.elements.map((n)=>n.toFixed(4))} )`;switch(Xt.getTransfer(t)){case"linear":return[e,"LinearTransferOETF"];case"srgb":return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Rl(t,e,n){let i=t.getShaderParameter(e,t.COMPILE_STATUS),s=t.getShaderInfoLog(e).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+jm(t.getShaderSource(e),o)}else return s}function tg(t,e){let n=Qm(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function eg(t,e){let n;switch(e){case 1:n="Linear";break;case 2:n="Reinhard";break;case 3:n="Cineon";break;case 4:n="ACESFilmic";break;case 6:n="AgX";break;case 7:n="Neutral";break;case 5:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var cr=new b;function ng(){Xt.getLuminanceCoefficients(cr);let t=cr.x.toFixed(4),e=cr.y.toFixed(4),n=cr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function ig(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ms).join(`
`)}function sg(t){let e=[];for(let n in t){let i=t[n];if(i===!1)continue;e.push("#define "+n+" "+i)}return e.join(`
`)}function rg(t,e){let n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=t.getActiveAttrib(e,s),o=r.name,a=1;if(r.type===t.FLOAT_MAT2)a=2;if(r.type===t.FLOAT_MAT3)a=3;if(r.type===t.FLOAT_MAT4)a=4;n[o]={type:r.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function ms(t){return t!==""}function Cl(t,e){let n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Il(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var og=/^[ \t]*#include +<([\w\d./]+)>/gm;function bo(t){return t.replace(og,lg)}var ag=new Map;function lg(t,e){let n=Bt[e];if(n===void 0){let i=ag.get(e);if(i!==void 0)n=Bt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw Error("Can not resolve #include <"+e+">")}return bo(n)}var cg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pl(t){return t.replace(cg,hg)}function hg(t,e,n,i){let s="";for(let r=parseInt(e);r<parseInt(n);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ll(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;if(t.precision==="highp")e+=`
#define HIGH_PRECISION`;else if(t.precision==="mediump")e+=`
#define MEDIUM_PRECISION`;else if(t.precision==="lowp")e+=`
#define LOW_PRECISION`;return e}function ug(t){let e="SHADOWMAP_TYPE_BASIC";if(t.shadowMapType===1)e="SHADOWMAP_TYPE_PCF";else if(t.shadowMapType===2)e="SHADOWMAP_TYPE_PCF_SOFT";else if(t.shadowMapType===3)e="SHADOWMAP_TYPE_VSM";return e}function dg(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case 301:case 302:e="ENVMAP_TYPE_CUBE";break;case 306:e="ENVMAP_TYPE_CUBE_UV";break}return e}function fg(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case 302:e="ENVMAP_MODE_REFRACTION";break}return e}function pg(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case 0:e="ENVMAP_BLENDING_MULTIPLY";break;case 1:e="ENVMAP_BLENDING_MIX";break;case 2:e="ENVMAP_BLENDING_ADD";break}return e}function mg(t){let e=t.envMapCubeUVHeight;if(e===null)return null;let n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function gg(t,e,n,i){let s=t.getContext(),r=n.defines,o=n.vertexShader,a=n.fragmentShader,l=ug(n),c=dg(n),h=fg(n),u=pg(n),d=mg(n),f=ig(n),g=sg(r),_=s.createProgram(),p,m,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";if(n.isRawShaderMaterial){if(p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(ms).join(`
`),p.length>0)p+=`
`;if(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(ms).join(`
`),m.length>0)m+=`
`}else p=[Ll(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(ms).join(`
`),m=[Ll(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+h:"",n.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==0?"#define TONE_MAPPING":"",n.toneMapping!==0?Bt.tonemapping_pars_fragment:"",n.toneMapping!==0?eg("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Bt.colorspace_pars_fragment,tg("linearToOutputTexel",n.outputColorSpace),ng(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ms).join(`
`);if(o=bo(o),o=Cl(o,n),o=Il(o,n),a=bo(a),a=Cl(a,n),a=Il(a,n),o=Pl(o),a=Pl(a),n.isRawShaderMaterial!==!0)v=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",n.glslVersion==="300 es"?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion==="300 es"?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m;let x=v+p+o,E=v+m+a,I=wl(s,s.VERTEX_SHADER,x),w=wl(s,s.FRAGMENT_SHADER,E);if(s.attachShader(_,I),s.attachShader(_,w),n.index0AttributeName!==void 0)s.bindAttribLocation(_,0,n.index0AttributeName);else if(n.morphTargets===!0)s.bindAttribLocation(_,0,"position");s.linkProgram(_);function A(C){if(t.debug.checkShaderErrors){let z=s.getProgramInfoLog(_).trim(),k=s.getShaderInfoLog(I).trim(),G=s.getShaderInfoLog(w).trim(),K=!0,V=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(K=!1,typeof t.debug.onShaderError==="function")t.debug.onShaderError(s,_,I,w);else{let j=Rl(s,I,"vertex"),H=Rl(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+z+`
`+j+`
`+H)}else if(z!=="")console.warn("THREE.WebGLProgram: Program Info Log:",z);else if(k===""||G==="")V=!1;if(V)C.diagnostics={runnable:K,programLog:z,vertexShader:{log:k,prefix:p},fragmentShader:{log:G,prefix:m}}}s.deleteShader(I),s.deleteShader(w),U=new xs(s,_),M=rg(s,_)}let U;this.getUniforms=function(){if(U===void 0)A(this);return U};let M;this.getAttributes=function(){if(M===void 0)A(this);return M};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(T===!1)T=s.getProgramParameter(_,$m);return T},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Jm++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=I,this.fragmentShader=w,this}var _g=0;class Dc{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let{vertexShader:e,fragmentShader:n}=t,i=this._getShaderStage(e),s=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);if(r.has(i)===!1)r.add(i),i.usedTimes++;if(r.has(s)===!1)r.add(s),s.usedTimes++;return this}remove(t){let e=this.materialCache.get(t);for(let n of e)if(n.usedTimes--,n.usedTimes===0)this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);if(n===void 0)n=new Set,e.set(t,n);return n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);if(n===void 0)n=new Uc(t),e.set(t,n);return n}}class Uc{constructor(t){this.id=_g++,this.code=t,this.usedTimes=0}}function xg(t,e,n,i,s,r,o){let a=new br,l=new Dc,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){if(c.add(M),M===0)return"uv";return`uv${M}`}function p(M,T,C,z,k){let G=z.fog,K=k.geometry,V=M.isMeshStandardMaterial?z.environment:null,j=(M.isMeshStandardMaterial?n:e).get(M.envMap||V),H=!!j&&j.mapping===306?j.image.height:null,ct=g[M.type];if(M.precision!==null){if(f=s.getMaxPrecision(M.precision),f!==M.precision)console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead.")}let ut=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Ct=ut!==void 0?ut.length:0,Wt=0;if(K.morphAttributes.position!==void 0)Wt=1;if(K.morphAttributes.normal!==void 0)Wt=2;if(K.morphAttributes.color!==void 0)Wt=3;let q,tt,St,Et;if(ct){let jt=En[ct];q=jt.vertexShader,tt=jt.fragmentShader}else q=M.vertexShader,tt=M.fragmentShader,l.update(M),St=l.getVertexShaderID(M),Et=l.getFragmentShaderID(M);let st=t.getRenderTarget(),wt=t.state.buffers.depth.getReversed(),re=k.isInstancedMesh===!0,qt=k.isBatchedMesh===!0,Zt=!!M.map,Re=!!M.matcap,D=!!j,Ce=!!M.aoMap,oe=!!M.lightMap,ae=!!M.bumpMap,mt=!!M.normalMap,_e=!!M.displacementMap,Tt=!!M.emissiveMap,Pt=!!M.metalnessMap,R=!!M.roughnessMap,y=M.anisotropy>0,F=M.clearcoat>0,Z=M.dispersion>0,J=M.iridescence>0,W=M.sheen>0,bt=M.transmission>0,rt=y&&!!M.anisotropyMap,ft=F&&!!M.clearcoatMap,Nt=F&&!!M.clearcoatNormalMap,et=F&&!!M.clearcoatRoughnessMap,dt=J&&!!M.iridescenceMap,kt=J&&!!M.iridescenceThicknessMap,Rt=W&&!!M.sheenColorMap,pt=W&&!!M.sheenRoughnessMap,Dt=!!M.specularMap,Ht=!!M.specularColorMap,pe=!!M.specularIntensityMap,P=bt&&!!M.transmissionMap,Q=bt&&!!M.thicknessMap,X=!!M.gradientMap,Y=!!M.alphaMap,ht=M.alphaTest>0,at=!!M.alphaHash,Ot=!!M.extensions,xe=0;if(M.toneMapped){if(st===null||st.isXRRenderTarget===!0)xe=t.toneMapping}let Ie={shaderID:ct,shaderType:M.type,shaderName:M.name,vertexShader:q,fragmentShader:tt,defines:M.defines,customVertexShaderID:St,customFragmentShaderID:Et,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:qt,batchingColor:qt&&k._colorsTexture!==null,instancing:re,instancingColor:re&&k.instanceColor!==null,instancingMorph:re&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:st===null?t.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:"srgb-linear",alphaToCoverage:!!M.alphaToCoverage,map:Zt,matcap:Re,envMap:D,envMapMode:D&&j.mapping,envMapCubeUVHeight:H,aoMap:Ce,lightMap:oe,bumpMap:ae,normalMap:mt,displacementMap:d&&_e,emissiveMap:Tt,normalMapObjectSpace:mt&&M.normalMapType===1,normalMapTangentSpace:mt&&M.normalMapType===0,metalnessMap:Pt,roughnessMap:R,anisotropy:y,anisotropyMap:rt,clearcoat:F,clearcoatMap:ft,clearcoatNormalMap:Nt,clearcoatRoughnessMap:et,dispersion:Z,iridescence:J,iridescenceMap:dt,iridescenceThicknessMap:kt,sheen:W,sheenColorMap:Rt,sheenRoughnessMap:pt,specularMap:Dt,specularColorMap:Ht,specularIntensityMap:pe,transmission:bt,transmissionMap:P,thicknessMap:Q,gradientMap:X,opaque:M.transparent===!1&&M.blending===1&&M.alphaToCoverage===!1,alphaMap:Y,alphaTest:ht,alphaHash:at,combine:M.combine,mapUv:Zt&&_(M.map.channel),aoMapUv:Ce&&_(M.aoMap.channel),lightMapUv:oe&&_(M.lightMap.channel),bumpMapUv:ae&&_(M.bumpMap.channel),normalMapUv:mt&&_(M.normalMap.channel),displacementMapUv:_e&&_(M.displacementMap.channel),emissiveMapUv:Tt&&_(M.emissiveMap.channel),metalnessMapUv:Pt&&_(M.metalnessMap.channel),roughnessMapUv:R&&_(M.roughnessMap.channel),anisotropyMapUv:rt&&_(M.anisotropyMap.channel),clearcoatMapUv:ft&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Nt&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:dt&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:kt&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:pt&&_(M.sheenRoughnessMap.channel),specularMapUv:Dt&&_(M.specularMap.channel),specularColorMapUv:Ht&&_(M.specularColorMap.channel),specularIntensityMapUv:pe&&_(M.specularIntensityMap.channel),transmissionMapUv:P&&_(M.transmissionMap.channel),thicknessMapUv:Q&&_(M.thicknessMap.channel),alphaMapUv:Y&&_(M.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(mt||y),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!K.attributes.uv&&(Zt||Y),fog:!!G,useFog:M.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:wt,skinning:k.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:Ct,morphTextureStride:Wt,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:t.shadowMap.enabled&&C.length>0,shadowMapType:t.shadowMap.type,toneMapping:xe,decodeVideoTexture:Zt&&M.map.isVideoTexture===!0&&Xt.getTransfer(M.map.colorSpace)==="srgb",decodeVideoTextureEmissive:Tt&&M.emissiveMap.isVideoTexture===!0&&Xt.getTransfer(M.emissiveMap.colorSpace)==="srgb",premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===2,flipSided:M.side===1,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ot&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ot&&M.extensions.multiDraw===!0||qt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Ie.vertexUv1s=c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function m(M){let T=[];if(M.shaderID)T.push(M.shaderID);else T.push(M.customVertexShaderID),T.push(M.customFragmentShaderID);if(M.defines!==void 0)for(let C in M.defines)T.push(C),T.push(M.defines[C]);if(M.isRawShaderMaterial===!1)v(T,M),x(T,M),T.push(t.outputColorSpace);return T.push(M.customProgramCacheKey),T.join()}function v(M,T){M.push(T.precision),M.push(T.outputColorSpace),M.push(T.envMapMode),M.push(T.envMapCubeUVHeight),M.push(T.mapUv),M.push(T.alphaMapUv),M.push(T.lightMapUv),M.push(T.aoMapUv),M.push(T.bumpMapUv),M.push(T.normalMapUv),M.push(T.displacementMapUv),M.push(T.emissiveMapUv),M.push(T.metalnessMapUv),M.push(T.roughnessMapUv),M.push(T.anisotropyMapUv),M.push(T.clearcoatMapUv),M.push(T.clearcoatNormalMapUv),M.push(T.clearcoatRoughnessMapUv),M.push(T.iridescenceMapUv),M.push(T.iridescenceThicknessMapUv),M.push(T.sheenColorMapUv),M.push(T.sheenRoughnessMapUv),M.push(T.specularMapUv),M.push(T.specularColorMapUv),M.push(T.specularIntensityMapUv),M.push(T.transmissionMapUv),M.push(T.thicknessMapUv),M.push(T.combine),M.push(T.fogExp2),M.push(T.sizeAttenuation),M.push(T.morphTargetsCount),M.push(T.morphAttributeCount),M.push(T.numDirLights),M.push(T.numPointLights),M.push(T.numSpotLights),M.push(T.numSpotLightMaps),M.push(T.numHemiLights),M.push(T.numRectAreaLights),M.push(T.numDirLightShadows),M.push(T.numPointLightShadows),M.push(T.numSpotLightShadows),M.push(T.numSpotLightShadowsWithMaps),M.push(T.numLightProbes),M.push(T.shadowMapType),M.push(T.toneMapping),M.push(T.numClippingPlanes),M.push(T.numClipIntersection),M.push(T.depthPacking)}function x(M,T){if(a.disableAll(),T.supportsVertexTextures)a.enable(0);if(T.instancing)a.enable(1);if(T.instancingColor)a.enable(2);if(T.instancingMorph)a.enable(3);if(T.matcap)a.enable(4);if(T.envMap)a.enable(5);if(T.normalMapObjectSpace)a.enable(6);if(T.normalMapTangentSpace)a.enable(7);if(T.clearcoat)a.enable(8);if(T.iridescence)a.enable(9);if(T.alphaTest)a.enable(10);if(T.vertexColors)a.enable(11);if(T.vertexAlphas)a.enable(12);if(T.vertexUv1s)a.enable(13);if(T.vertexUv2s)a.enable(14);if(T.vertexUv3s)a.enable(15);if(T.vertexTangents)a.enable(16);if(T.anisotropy)a.enable(17);if(T.alphaHash)a.enable(18);if(T.batching)a.enable(19);if(T.dispersion)a.enable(20);if(T.batchingColor)a.enable(21);if(M.push(a.mask),a.disableAll(),T.fog)a.enable(0);if(T.useFog)a.enable(1);if(T.flatShading)a.enable(2);if(T.logarithmicDepthBuffer)a.enable(3);if(T.reverseDepthBuffer)a.enable(4);if(T.skinning)a.enable(5);if(T.morphTargets)a.enable(6);if(T.morphNormals)a.enable(7);if(T.morphColors)a.enable(8);if(T.premultipliedAlpha)a.enable(9);if(T.shadowMapEnabled)a.enable(10);if(T.doubleSided)a.enable(11);if(T.flipSided)a.enable(12);if(T.useDepthPacking)a.enable(13);if(T.dithering)a.enable(14);if(T.transmission)a.enable(15);if(T.sheen)a.enable(16);if(T.opaque)a.enable(17);if(T.pointsUvs)a.enable(18);if(T.decodeVideoTexture)a.enable(19);if(T.decodeVideoTextureEmissive)a.enable(20);if(T.alphaToCoverage)a.enable(21);M.push(a.mask)}function E(M){let T=g[M.type],C;if(T){let z=En[T];C=ad.clone(z.uniforms)}else C=M.uniforms;return C}function I(M,T){let C;for(let z=0,k=h.length;z<k;z++){let G=h[z];if(G.cacheKey===T){C=G,++C.usedTimes;break}}if(C===void 0)C=new gg(t,T,M,r),h.push(C);return C}function w(M){if(--M.usedTimes===0){let T=h.indexOf(M);h[T]=h[h.length-1],h.pop(),M.destroy()}}function A(M){l.remove(M)}function U(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:E,acquireProgram:I,releaseProgram:w,releaseShaderCache:A,programs:h,dispose:U}}function yg(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);if(a===void 0)a={},t.set(o,a);return a}function i(o){t.delete(o)}function s(o,a,l){t.get(o)[a]=l}function r(){t=new WeakMap}return{has:e,get:n,remove:i,update:s,dispose:r}}function vg(t,e){if(t.groupOrder!==e.groupOrder)return t.groupOrder-e.groupOrder;else if(t.renderOrder!==e.renderOrder)return t.renderOrder-e.renderOrder;else if(t.material.id!==e.material.id)return t.material.id-e.material.id;else if(t.z!==e.z)return t.z-e.z;else return t.id-e.id}function Nl(t,e){if(t.groupOrder!==e.groupOrder)return t.groupOrder-e.groupOrder;else if(t.renderOrder!==e.renderOrder)return t.renderOrder-e.renderOrder;else if(t.z!==e.z)return e.z-t.z;else return t.id-e.id}function Dl(){let t=[],e=0,n=[],i=[],s=[];function r(){e=0,n.length=0,i.length=0,s.length=0}function o(u,d,f,g,_,p){let m=t[e];if(m===void 0)m={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},t[e]=m;else m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=_,m.group=p;return e++,m}function a(u,d,f,g,_,p){let m=o(u,d,f,g,_,p);if(f.transmission>0)i.push(m);else if(f.transparent===!0)s.push(m);else n.push(m)}function l(u,d,f,g,_,p){let m=o(u,d,f,g,_,p);if(f.transmission>0)i.unshift(m);else if(f.transparent===!0)s.unshift(m);else n.unshift(m)}function c(u,d){if(n.length>1)n.sort(u||vg);if(i.length>1)i.sort(d||Nl);if(s.length>1)s.sort(d||Nl)}function h(){for(let u=e,d=t.length;u<d;u++){let f=t[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:n,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Sg(){let t=new WeakMap;function e(i,s){let r=t.get(i),o;if(r===void 0)o=new Dl,t.set(i,[o]);else if(s>=r.length)o=new Dl,r.push(o);else o=r[s];return o}function n(){t=new WeakMap}return{get:e,dispose:n}}function Mg(){let t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new b,color:new Mt};break;case"SpotLight":n={position:new b,direction:new b,color:new Mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new b,color:new Mt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new b,skyColor:new Mt,groundColor:new Mt};break;case"RectAreaLight":n={color:new Mt,position:new b,halfWidth:new b,halfHeight:new b};break}return t[e.id]=n,n}}}function Eg(){let t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1000};break}return t[e.id]=n,n}}}var Tg=0;function bg(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function wg(t){let e=new Mg,n=Eg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new b);let s=new b,r=new At,o=new At;function a(c){let h=0,u=0,d=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let f=0,g=0,_=0,p=0,m=0,v=0,x=0,E=0,I=0,w=0,A=0;c.sort(bg);for(let M=0,T=c.length;M<T;M++){let C=c[M],z=C.color,k=C.intensity,G=C.distance,K=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=z.r*k,u+=z.g*k,d+=z.b*k;else if(C.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(C.sh.coefficients[V],k);A++}else if(C.isDirectionalLight){let V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let j=C.shadow,H=n.get(C);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,i.directionalShadow[f]=H,i.directionalShadowMap[f]=K,i.directionalShadowMatrix[f]=C.shadow.matrix,v++}i.directional[f]=V,f++}else if(C.isSpotLight){let V=e.get(C);V.position.setFromMatrixPosition(C.matrixWorld),V.color.copy(z).multiplyScalar(k),V.distance=G,V.coneCos=Math.cos(C.angle),V.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),V.decay=C.decay,i.spot[_]=V;let j=C.shadow;if(C.map){if(i.spotLightMap[I]=C.map,I++,j.updateMatrices(C),C.castShadow)w++}if(i.spotLightMatrix[_]=j.matrix,C.castShadow){let H=n.get(C);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,i.spotShadow[_]=H,i.spotShadowMap[_]=K,E++}_++}else if(C.isRectAreaLight){let V=e.get(C);V.color.copy(z).multiplyScalar(k),V.halfWidth.set(C.width*0.5,0,0),V.halfHeight.set(0,C.height*0.5,0),i.rectArea[p]=V,p++}else if(C.isPointLight){let V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),V.distance=C.distance,V.decay=C.decay,C.castShadow){let j=C.shadow,H=n.get(C);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,H.shadowCameraNear=j.camera.near,H.shadowCameraFar=j.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=K,i.pointShadowMatrix[g]=C.shadow.matrix,x++}i.point[g]=V,g++}else if(C.isHemisphereLight){let V=e.get(C);V.skyColor.copy(C.color).multiplyScalar(k),V.groundColor.copy(C.groundColor).multiplyScalar(k),i.hemi[m]=V,m++}}if(p>0)if(t.has("OES_texture_float_linear")===!0)i.rectAreaLTC1=it.LTC_FLOAT_1,i.rectAreaLTC2=it.LTC_FLOAT_2;else i.rectAreaLTC1=it.LTC_HALF_1,i.rectAreaLTC2=it.LTC_HALF_2;i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let U=i.hash;if(U.directionalLength!==f||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==p||U.hemiLength!==m||U.numDirectionalShadows!==v||U.numPointShadows!==x||U.numSpotShadows!==E||U.numSpotMaps!==I||U.numLightProbes!==A)i.directional.length=f,i.spot.length=_,i.rectArea.length=p,i.point.length=g,i.hemi.length=m,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=E+I-w,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=A,U.directionalLength=f,U.pointLength=g,U.spotLength=_,U.rectAreaLength=p,U.hemiLength=m,U.numDirectionalShadows=v,U.numPointShadows=x,U.numSpotShadows=E,U.numSpotMaps=I,U.numLightProbes=A,i.version=Tg++}function l(c,h){let u=0,d=0,f=0,g=0,_=0,p=h.matrixWorldInverse;for(let m=0,v=c.length;m<v;m++){let x=c[m];if(x.isDirectionalLight){let E=i.directional[u];E.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(p),u++}else if(x.isSpotLight){let E=i.spot[f];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(p),f++}else if(x.isRectAreaLight){let E=i.rectArea[g];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(p),o.identity(),r.copy(x.matrixWorld),r.premultiply(p),o.extractRotation(r),E.halfWidth.set(x.width*0.5,0,0),E.halfHeight.set(0,x.height*0.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){let E=i.point[d];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(p),d++}else if(x.isHemisphereLight){let E=i.hemi[_];E.direction.setFromMatrixPosition(x.matrixWorld),E.direction.transformDirection(p),_++}}}return{setup:a,setupView:l,state:i}}function Ul(t){let e=new wg(t),n=[],i=[];function s(h){c.camera=h,n.length=0,i.length=0}function r(h){n.push(h)}function o(h){i.push(h)}function a(){e.setup(n)}function l(h){e.setupView(n,h)}let c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Ag(t){let e=new WeakMap;function n(s,r=0){let o=e.get(s),a;if(o===void 0)a=new Ul(t),e.set(s,[a]);else if(r>=o.length)a=new Ul(t),o.push(a);else a=o[r];return a}function i(){e=new WeakMap}return{get:n,dispose:i}}class Fc extends Xe{static get type(){return"MeshDepthMaterial"}constructor(t){super();this.isMeshDepthMaterial=!0,this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Oc extends Xe{static get type(){return"MeshDistanceMaterial"}constructor(t){super();this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}var Rg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Cg=`uniform sampler2D shadow_pass;
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
}`;function Ig(t,e,n){let i=new wr,s=new ot,r=new ot,o=new $t,a=new Fc({depthPacking:3201}),l=new Oc,c={},h=n.maxTextureSize,u={[0]:1,[1]:0,[2]:2},d=new Un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:Rg,fragmentShader:Cg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new he;g.setAttribute("position",new Ae(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let _=new vt(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let m=this.type;this.render=function(w,A,U){if(p.enabled===!1)return;if(p.autoUpdate===!1&&p.needsUpdate===!1)return;if(w.length===0)return;let M=t.getRenderTarget(),T=t.getActiveCubeFace(),C=t.getActiveMipmapLevel(),z=t.state;z.setBlending(0),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let k=m!==3&&this.type===3,G=m===3&&this.type!==3;for(let K=0,V=w.length;K<V;K++){let j=w[K],H=j.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let ct=H.getFrameExtents();if(s.multiply(ct),r.copy(H.mapSize),s.x>h||s.y>h){if(s.x>h)r.x=Math.floor(h/ct.x),s.x=r.x*ct.x,H.mapSize.x=r.x;if(s.y>h)r.y=Math.floor(h/ct.y),s.y=r.y*ct.y,H.mapSize.y=r.y}if(H.map===null||k===!0||G===!0){let Ct=this.type!==3?{minFilter:1003,magFilter:1003}:{};if(H.map!==null)H.map.dispose();H.map=new $n(s.x,s.y,Ct),H.map.texture.name=j.name+".shadowMap",H.camera.updateProjectionMatrix()}t.setRenderTarget(H.map),t.clear();let ut=H.getViewportCount();for(let Ct=0;Ct<ut;Ct++){let Wt=H.getViewport(Ct);o.set(r.x*Wt.x,r.y*Wt.y,r.x*Wt.z,r.y*Wt.w),z.viewport(o),H.updateMatrices(j,Ct),i=H.getFrustum(),E(A,U,H.camera,j,this.type)}if(H.isPointLightShadow!==!0&&this.type===3)v(H,U);H.needsUpdate=!1}m=this.type,p.needsUpdate=!1,t.setRenderTarget(M,T,C)};function v(w,A){let U=e.update(_);if(d.defines.VSM_SAMPLES!==w.blurSamples)d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0;if(w.mapPass===null)w.mapPass=new $n(s.x,s.y);d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,t.setRenderTarget(w.mapPass),t.clear(),t.renderBufferDirect(A,null,U,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,t.setRenderTarget(w.map),t.clear(),t.renderBufferDirect(A,null,U,f,_,null)}function x(w,A,U,M){let T=null,C=U.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)T=C;else if(T=U.isPointLight===!0?l:a,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let z=T.uuid,k=A.uuid,G=c[z];if(G===void 0)G={},c[z]=G;let K=G[k];if(K===void 0)K=T.clone(),G[k]=K,A.addEventListener("dispose",I);T=K}if(T.visible=A.visible,T.wireframe=A.wireframe,M===3)T.side=A.shadowSide!==null?A.shadowSide:A.side;else T.side=A.shadowSide!==null?A.shadowSide:u[A.side];if(T.alphaMap=A.alphaMap,T.alphaTest=A.alphaTest,T.map=A.map,T.clipShadows=A.clipShadows,T.clippingPlanes=A.clippingPlanes,T.clipIntersection=A.clipIntersection,T.displacementMap=A.displacementMap,T.displacementScale=A.displacementScale,T.displacementBias=A.displacementBias,T.wireframeLinewidth=A.wireframeLinewidth,T.linewidth=A.linewidth,U.isPointLight===!0&&T.isMeshDistanceMaterial===!0){let z=t.properties.get(T);z.light=U}return T}function E(w,A,U,M,T){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)){if((w.castShadow||w.receiveShadow&&T===3)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,w.matrixWorld);let k=e.update(w),G=w.material;if(Array.isArray(G)){let K=k.groups;for(let V=0,j=K.length;V<j;V++){let H=K[V],ct=G[H.materialIndex];if(ct&&ct.visible){let ut=x(w,ct,M,T);w.onBeforeShadow(t,w,A,U,k,ut,H),t.renderBufferDirect(U,null,k,ut,w,H),w.onAfterShadow(t,w,A,U,k,ut,H)}}}else if(G.visible){let K=x(w,G,M,T);w.onBeforeShadow(t,w,A,U,k,K,null),t.renderBufferDirect(U,null,k,K,w,null),w.onAfterShadow(t,w,A,U,k,K,null)}}}let z=w.children;for(let k=0,G=z.length;k<G;k++)E(z[k],A,U,M,T)}function I(w){w.target.removeEventListener("dispose",I);for(let U in c){let M=c[U],T=w.target.uuid;if(T in M)M[T].dispose(),delete M[T]}}}var Pg={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};function Lg(t,e){function n(){let P=!1,Q=new $t,X=null,Y=new $t(0,0,0,0);return{setMask:function(ht){if(X!==ht&&!P)t.colorMask(ht,ht,ht,ht),X=ht},setLocked:function(ht){P=ht},setClear:function(ht,at,Ot,xe,Ie){if(Ie===!0)ht*=xe,at*=xe,Ot*=xe;if(Q.set(ht,at,Ot,xe),Y.equals(Q)===!1)t.clearColor(ht,at,Ot,xe),Y.copy(Q)},reset:function(){P=!1,X=null,Y.set(-1,0,0,0)}}}function i(){let P=!1,Q=!1,X=null,Y=null,ht=null;return{setReversed:function(at){if(Q!==at){let Ot=e.get("EXT_clip_control");if(Q)Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.ZERO_TO_ONE_EXT);else Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.NEGATIVE_ONE_TO_ONE_EXT);let xe=ht;ht=null,this.setClear(xe)}Q=at},getReversed:function(){return Q},setTest:function(at){if(at)st(t.DEPTH_TEST);else wt(t.DEPTH_TEST)},setMask:function(at){if(X!==at&&!P)t.depthMask(at),X=at},setFunc:function(at){if(Q)at=Pg[at];if(Y!==at){switch(at){case 0:t.depthFunc(t.NEVER);break;case 1:t.depthFunc(t.ALWAYS);break;case 2:t.depthFunc(t.LESS);break;case 3:t.depthFunc(t.LEQUAL);break;case 4:t.depthFunc(t.EQUAL);break;case 5:t.depthFunc(t.GEQUAL);break;case 6:t.depthFunc(t.GREATER);break;case 7:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Y=at}},setLocked:function(at){P=at},setClear:function(at){if(ht!==at){if(Q)at=1-at;t.clearDepth(at),ht=at}},reset:function(){P=!1,X=null,Y=null,ht=null,Q=!1}}}function s(){let P=!1,Q=null,X=null,Y=null,ht=null,at=null,Ot=null,xe=null,Ie=null;return{setTest:function(jt){if(!P)if(jt)st(t.STENCIL_TEST);else wt(t.STENCIL_TEST)},setMask:function(jt){if(Q!==jt&&!P)t.stencilMask(jt),Q=jt},setFunc:function(jt,wn,Sn){if(X!==jt||Y!==wn||ht!==Sn)t.stencilFunc(jt,wn,Sn),X=jt,Y=wn,ht=Sn},setOp:function(jt,wn,Sn){if(at!==jt||Ot!==wn||xe!==Sn)t.stencilOp(jt,wn,Sn),at=jt,Ot=wn,xe=Sn},setLocked:function(jt){P=jt},setClear:function(jt){if(Ie!==jt)t.clearStencil(jt),Ie=jt},reset:function(){P=!1,Q=null,X=null,Y=null,ht=null,at=null,Ot=null,xe=null,Ie=null}}}let r=new n,o=new i,a=new s,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],g=null,_=!1,p=null,m=null,v=null,x=null,E=null,I=null,w=null,A=new Mt(0,0,0),U=0,M=!1,T=null,C=null,z=null,k=null,G=null,K=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,j=0,H=t.getParameter(t.VERSION);if(H.indexOf("WebGL")!==-1)j=parseFloat(/^WebGL (\d)/.exec(H)[1]),V=j>=1;else if(H.indexOf("OpenGL ES")!==-1)j=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),V=j>=2;let ct=null,ut={},Ct=t.getParameter(t.SCISSOR_BOX),Wt=t.getParameter(t.VIEWPORT),q=new $t().fromArray(Ct),tt=new $t().fromArray(Wt);function St(P,Q,X,Y){let ht=new Uint8Array(4),at=t.createTexture();t.bindTexture(P,at),t.texParameteri(P,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(P,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ot=0;Ot<X;Ot++)if(P===t.TEXTURE_3D||P===t.TEXTURE_2D_ARRAY)t.texImage3D(Q,0,t.RGBA,1,1,Y,0,t.RGBA,t.UNSIGNED_BYTE,ht);else t.texImage2D(Q+Ot,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ht);return at}let Et={};Et[t.TEXTURE_2D]=St(t.TEXTURE_2D,t.TEXTURE_2D,1),Et[t.TEXTURE_CUBE_MAP]=St(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[t.TEXTURE_2D_ARRAY]=St(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),Et[t.TEXTURE_3D]=St(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),st(t.DEPTH_TEST),o.setFunc(3),ae(!1),mt(1),st(t.CULL_FACE),Ce(0);function st(P){if(h[P]!==!0)t.enable(P),h[P]=!0}function wt(P){if(h[P]!==!1)t.disable(P),h[P]=!1}function re(P,Q){if(u[P]!==Q){if(t.bindFramebuffer(P,Q),u[P]=Q,P===t.DRAW_FRAMEBUFFER)u[t.FRAMEBUFFER]=Q;if(P===t.FRAMEBUFFER)u[t.DRAW_FRAMEBUFFER]=Q;return!0}return!1}function qt(P,Q){let X=f,Y=!1;if(P){if(X=d.get(Q),X===void 0)X=[],d.set(Q,X);let ht=P.textures;if(X.length!==ht.length||X[0]!==t.COLOR_ATTACHMENT0){for(let at=0,Ot=ht.length;at<Ot;at++)X[at]=t.COLOR_ATTACHMENT0+at;X.length=ht.length,Y=!0}}else if(X[0]!==t.BACK)X[0]=t.BACK,Y=!0;if(Y)t.drawBuffers(X)}function Zt(P){if(g!==P)return t.useProgram(P),g=P,!0;return!1}let Re={[100]:t.FUNC_ADD,[101]:t.FUNC_SUBTRACT,[102]:t.FUNC_REVERSE_SUBTRACT};Re[103]=t.MIN,Re[104]=t.MAX;let D={[200]:t.ZERO,[201]:t.ONE,[202]:t.SRC_COLOR,[204]:t.SRC_ALPHA,[210]:t.SRC_ALPHA_SATURATE,[208]:t.DST_COLOR,[206]:t.DST_ALPHA,[203]:t.ONE_MINUS_SRC_COLOR,[205]:t.ONE_MINUS_SRC_ALPHA,[209]:t.ONE_MINUS_DST_COLOR,[207]:t.ONE_MINUS_DST_ALPHA,[211]:t.CONSTANT_COLOR,[212]:t.ONE_MINUS_CONSTANT_COLOR,[213]:t.CONSTANT_ALPHA,[214]:t.ONE_MINUS_CONSTANT_ALPHA};function Ce(P,Q,X,Y,ht,at,Ot,xe,Ie,jt){if(P===0){if(_===!0)wt(t.BLEND),_=!1;return}if(_===!1)st(t.BLEND),_=!0;if(P!==5){if(P!==p||jt!==M){if(m!==100||E!==100)t.blendEquation(t.FUNC_ADD),m=100,E=100;if(jt)switch(P){case 1:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case 2:t.blendFunc(t.ONE,t.ONE);break;case 3:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case 4:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case 1:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case 2:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case 3:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case 4:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}v=null,x=null,I=null,w=null,A.set(0,0,0),U=0,p=P,M=jt}return}if(ht=ht||Q,at=at||X,Ot=Ot||Y,Q!==m||ht!==E)t.blendEquationSeparate(Re[Q],Re[ht]),m=Q,E=ht;if(X!==v||Y!==x||at!==I||Ot!==w)t.blendFuncSeparate(D[X],D[Y],D[at],D[Ot]),v=X,x=Y,I=at,w=Ot;if(xe.equals(A)===!1||Ie!==U)t.blendColor(xe.r,xe.g,xe.b,Ie),A.copy(xe),U=Ie;p=P,M=!1}function oe(P,Q){P.side===2?wt(t.CULL_FACE):st(t.CULL_FACE);let X=P.side===1;if(Q)X=!X;ae(X),P.blending===1&&P.transparent===!1?Ce(0):Ce(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),o.setFunc(P.depthFunc),o.setTest(P.depthTest),o.setMask(P.depthWrite),r.setMask(P.colorWrite);let Y=P.stencilWrite;if(a.setTest(Y),Y)a.setMask(P.stencilWriteMask),a.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),a.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass);Tt(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?st(t.SAMPLE_ALPHA_TO_COVERAGE):wt(t.SAMPLE_ALPHA_TO_COVERAGE)}function ae(P){if(T!==P){if(P)t.frontFace(t.CW);else t.frontFace(t.CCW);T=P}}function mt(P){if(P!==0){if(st(t.CULL_FACE),P!==C)if(P===1)t.cullFace(t.BACK);else if(P===2)t.cullFace(t.FRONT);else t.cullFace(t.FRONT_AND_BACK)}else wt(t.CULL_FACE);C=P}function _e(P){if(P!==z){if(V)t.lineWidth(P);z=P}}function Tt(P,Q,X){if(P){if(st(t.POLYGON_OFFSET_FILL),k!==Q||G!==X)t.polygonOffset(Q,X),k=Q,G=X}else wt(t.POLYGON_OFFSET_FILL)}function Pt(P){if(P)st(t.SCISSOR_TEST);else wt(t.SCISSOR_TEST)}function R(P){if(P===void 0)P=t.TEXTURE0+K-1;if(ct!==P)t.activeTexture(P),ct=P}function y(P,Q,X){if(X===void 0)if(ct===null)X=t.TEXTURE0+K-1;else X=ct;let Y=ut[X];if(Y===void 0)Y={type:void 0,texture:void 0},ut[X]=Y;if(Y.type!==P||Y.texture!==Q){if(ct!==X)t.activeTexture(X),ct=X;t.bindTexture(P,Q||Et[P]),Y.type=P,Y.texture=Q}}function F(){let P=ut[ct];if(P!==void 0&&P.type!==void 0)t.bindTexture(P.type,null),P.type=void 0,P.texture=void 0}function Z(){try{t.compressedTexImage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function J(){try{t.compressedTexImage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function W(){try{t.texSubImage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function bt(){try{t.texSubImage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function rt(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ft(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Nt(){try{t.texStorage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function et(){try{t.texStorage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function dt(){try{t.texImage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function kt(){try{t.texImage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Rt(P){if(q.equals(P)===!1)t.scissor(P.x,P.y,P.z,P.w),q.copy(P)}function pt(P){if(tt.equals(P)===!1)t.viewport(P.x,P.y,P.z,P.w),tt.copy(P)}function Dt(P,Q){let X=c.get(Q);if(X===void 0)X=new WeakMap,c.set(Q,X);let Y=X.get(P);if(Y===void 0)Y=t.getUniformBlockIndex(Q,P.name),X.set(P,Y)}function Ht(P,Q){let Y=c.get(Q).get(P);if(l.get(Q)!==Y)t.uniformBlockBinding(Q,Y,P.__bindingPointIndex),l.set(Q,Y)}function pe(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),h={},ct=null,ut={},u={},d=new WeakMap,f=[],g=null,_=!1,p=null,m=null,v=null,x=null,E=null,I=null,w=null,A=new Mt(0,0,0),U=0,M=!1,T=null,C=null,z=null,k=null,G=null,q.set(0,0,t.canvas.width,t.canvas.height),tt.set(0,0,t.canvas.width,t.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:st,disable:wt,bindFramebuffer:re,drawBuffers:qt,useProgram:Zt,setBlending:Ce,setMaterial:oe,setFlipSided:ae,setCullFace:mt,setLineWidth:_e,setPolygonOffset:Tt,setScissorTest:Pt,activeTexture:R,bindTexture:y,unbindTexture:F,compressedTexImage2D:Z,compressedTexImage3D:J,texImage2D:dt,texImage3D:kt,updateUBOMapping:Dt,uniformBlockBinding:Ht,texStorage2D:Nt,texStorage3D:et,texSubImage2D:W,texSubImage3D:bt,compressedTexSubImage2D:rt,compressedTexSubImage3D:ft,scissor:Rt,viewport:pt,reset:pe}}function Fl(t,e,n,i){let s=Ng(i);switch(n){case 1021:return t*e;case 1024:return t*e;case 1025:return t*e*2;case 1028:return t*e/s.components*s.byteLength;case 1029:return t*e/s.components*s.byteLength;case 1030:return t*e*2/s.components*s.byteLength;case 1031:return t*e*2/s.components*s.byteLength;case 1022:return t*e*3/s.components*s.byteLength;case 1023:return t*e*4/s.components*s.byteLength;case 1033:return t*e*4/s.components*s.byteLength;case 33776:case 33777:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(t,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(t,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case 37496:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case 37808:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(t/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(t/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Ng(t){switch(t){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${t}.`)}function Dg(t,e,n,i,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ot,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(R){}function g(R,y){return f?new OffscreenCanvas(R,y):Ms("canvas")}function _(R,y,F){let Z=1,J=Pt(R);if(J.width>F||J.height>F)Z=F/Math.max(J.width,J.height);if(Z<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let W=Math.floor(Z*J.width),bt=Math.floor(Z*J.height);if(u===void 0)u=g(W,bt);let rt=y?g(W,bt):u;return rt.width=W,rt.height=bt,rt.getContext("2d").drawImage(R,0,0,W,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+W+"x"+bt+")."),rt}else{if("data"in R)console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+").");return R}return R}function p(R){return R.generateMipmaps}function m(R){t.generateMipmap(R)}function v(R){if(R.isWebGLCubeRenderTarget)return t.TEXTURE_CUBE_MAP;if(R.isWebGL3DRenderTarget)return t.TEXTURE_3D;if(R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture)return t.TEXTURE_2D_ARRAY;return t.TEXTURE_2D}function x(R,y,F,Z,J=!1){if(R!==null){if(t[R]!==void 0)return t[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let W=y;if(y===t.RED){if(F===t.FLOAT)W=t.R32F;if(F===t.HALF_FLOAT)W=t.R16F;if(F===t.UNSIGNED_BYTE)W=t.R8}if(y===t.RED_INTEGER){if(F===t.UNSIGNED_BYTE)W=t.R8UI;if(F===t.UNSIGNED_SHORT)W=t.R16UI;if(F===t.UNSIGNED_INT)W=t.R32UI;if(F===t.BYTE)W=t.R8I;if(F===t.SHORT)W=t.R16I;if(F===t.INT)W=t.R32I}if(y===t.RG){if(F===t.FLOAT)W=t.RG32F;if(F===t.HALF_FLOAT)W=t.RG16F;if(F===t.UNSIGNED_BYTE)W=t.RG8}if(y===t.RG_INTEGER){if(F===t.UNSIGNED_BYTE)W=t.RG8UI;if(F===t.UNSIGNED_SHORT)W=t.RG16UI;if(F===t.UNSIGNED_INT)W=t.RG32UI;if(F===t.BYTE)W=t.RG8I;if(F===t.SHORT)W=t.RG16I;if(F===t.INT)W=t.RG32I}if(y===t.RGB_INTEGER){if(F===t.UNSIGNED_BYTE)W=t.RGB8UI;if(F===t.UNSIGNED_SHORT)W=t.RGB16UI;if(F===t.UNSIGNED_INT)W=t.RGB32UI;if(F===t.BYTE)W=t.RGB8I;if(F===t.SHORT)W=t.RGB16I;if(F===t.INT)W=t.RGB32I}if(y===t.RGBA_INTEGER){if(F===t.UNSIGNED_BYTE)W=t.RGBA8UI;if(F===t.UNSIGNED_SHORT)W=t.RGBA16UI;if(F===t.UNSIGNED_INT)W=t.RGBA32UI;if(F===t.BYTE)W=t.RGBA8I;if(F===t.SHORT)W=t.RGBA16I;if(F===t.INT)W=t.RGBA32I}if(y===t.RGB){if(F===t.UNSIGNED_INT_5_9_9_9_REV)W=t.RGB9_E5}if(y===t.RGBA){let bt=J?"linear":Xt.getTransfer(Z);if(F===t.FLOAT)W=t.RGBA32F;if(F===t.HALF_FLOAT)W=t.RGBA16F;if(F===t.UNSIGNED_BYTE)W=bt==="srgb"?t.SRGB8_ALPHA8:t.RGBA8;if(F===t.UNSIGNED_SHORT_4_4_4_4)W=t.RGBA4;if(F===t.UNSIGNED_SHORT_5_5_5_1)W=t.RGB5_A1}if(W===t.R16F||W===t.R32F||W===t.RG16F||W===t.RG32F||W===t.RGBA16F||W===t.RGBA32F)e.get("EXT_color_buffer_float");return W}function E(R,y){let F;if(R){if(y===null||y===1014||y===1020)F=t.DEPTH24_STENCIL8;else if(y===1015)F=t.DEPTH32F_STENCIL8;else if(y===1012)F=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(y===null||y===1014||y===1020)F=t.DEPTH_COMPONENT24;else if(y===1015)F=t.DEPTH_COMPONENT32F;else if(y===1012)F=t.DEPTH_COMPONENT16;return F}function I(R,y){if(p(R)===!0||R.isFramebufferTexture&&R.minFilter!==1003&&R.minFilter!==1006)return Math.log2(Math.max(y.width,y.height))+1;else if(R.mipmaps!==void 0&&R.mipmaps.length>0)return R.mipmaps.length;else if(R.isCompressedTexture&&Array.isArray(R.image))return y.mipmaps.length;else return 1}function w(R){let y=R.target;if(y.removeEventListener("dispose",w),U(y),y.isVideoTexture)h.delete(y)}function A(R){let y=R.target;y.removeEventListener("dispose",A),T(y)}function U(R){let y=i.get(R);if(y.__webglInit===void 0)return;let F=R.source,Z=d.get(F);if(Z){let J=Z[y.__cacheKey];if(J.usedTimes--,J.usedTimes===0)M(R);if(Object.keys(Z).length===0)d.delete(F)}i.remove(R)}function M(R){let y=i.get(R);t.deleteTexture(y.__webglTexture);let F=R.source,Z=d.get(F);delete Z[y.__cacheKey],o.memory.textures--}function T(R){let y=i.get(R);if(R.depthTexture)R.depthTexture.dispose(),i.remove(R.depthTexture);if(R.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(y.__webglFramebuffer[Z]))for(let J=0;J<y.__webglFramebuffer[Z].length;J++)t.deleteFramebuffer(y.__webglFramebuffer[Z][J]);else t.deleteFramebuffer(y.__webglFramebuffer[Z]);if(y.__webglDepthbuffer)t.deleteRenderbuffer(y.__webglDepthbuffer[Z])}else{if(Array.isArray(y.__webglFramebuffer))for(let Z=0;Z<y.__webglFramebuffer.length;Z++)t.deleteFramebuffer(y.__webglFramebuffer[Z]);else t.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer)t.deleteRenderbuffer(y.__webglDepthbuffer);if(y.__webglMultisampledFramebuffer)t.deleteFramebuffer(y.__webglMultisampledFramebuffer);if(y.__webglColorRenderbuffer){for(let Z=0;Z<y.__webglColorRenderbuffer.length;Z++)if(y.__webglColorRenderbuffer[Z])t.deleteRenderbuffer(y.__webglColorRenderbuffer[Z])}if(y.__webglDepthRenderbuffer)t.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let F=R.textures;for(let Z=0,J=F.length;Z<J;Z++){let W=i.get(F[Z]);if(W.__webglTexture)t.deleteTexture(W.__webglTexture),o.memory.textures--;i.remove(F[Z])}i.remove(R)}let C=0;function z(){C=0}function k(){let R=C;if(R>=s.maxTextures)console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures);return C+=1,R}function G(R){let y=[];return y.push(R.wrapS),y.push(R.wrapT),y.push(R.wrapR||0),y.push(R.magFilter),y.push(R.minFilter),y.push(R.anisotropy),y.push(R.internalFormat),y.push(R.format),y.push(R.type),y.push(R.generateMipmaps),y.push(R.premultiplyAlpha),y.push(R.flipY),y.push(R.unpackAlignment),y.push(R.colorSpace),y.join()}function K(R,y){let F=i.get(R);if(R.isVideoTexture)_e(R);if(R.isRenderTargetTexture===!1&&R.version>0&&F.__version!==R.version){let Z=R.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{tt(F,R,y);return}}n.bindTexture(t.TEXTURE_2D,F.__webglTexture,t.TEXTURE0+y)}function V(R,y){let F=i.get(R);if(R.version>0&&F.__version!==R.version){tt(F,R,y);return}n.bindTexture(t.TEXTURE_2D_ARRAY,F.__webglTexture,t.TEXTURE0+y)}function j(R,y){let F=i.get(R);if(R.version>0&&F.__version!==R.version){tt(F,R,y);return}n.bindTexture(t.TEXTURE_3D,F.__webglTexture,t.TEXTURE0+y)}function H(R,y){let F=i.get(R);if(R.version>0&&F.__version!==R.version){St(F,R,y);return}n.bindTexture(t.TEXTURE_CUBE_MAP,F.__webglTexture,t.TEXTURE0+y)}let ct={[1000]:t.REPEAT,[1001]:t.CLAMP_TO_EDGE,[1002]:t.MIRRORED_REPEAT},ut={[1003]:t.NEAREST,[1004]:t.NEAREST_MIPMAP_NEAREST,[1005]:t.NEAREST_MIPMAP_LINEAR,[1006]:t.LINEAR,[1007]:t.LINEAR_MIPMAP_NEAREST,[1008]:t.LINEAR_MIPMAP_LINEAR},Ct={[512]:t.NEVER,[519]:t.ALWAYS,[513]:t.LESS,[515]:t.LEQUAL,[514]:t.EQUAL,[518]:t.GEQUAL,[516]:t.GREATER,[517]:t.NOTEQUAL};function Wt(R,y){if(y.type===1015&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===1006||y.magFilter===1007||y.magFilter===1005||y.magFilter===1008||y.minFilter===1006||y.minFilter===1007||y.minFilter===1005||y.minFilter===1008))console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(t.texParameteri(R,t.TEXTURE_WRAP_S,ct[y.wrapS]),t.texParameteri(R,t.TEXTURE_WRAP_T,ct[y.wrapT]),R===t.TEXTURE_3D||R===t.TEXTURE_2D_ARRAY)t.texParameteri(R,t.TEXTURE_WRAP_R,ct[y.wrapR]);if(t.texParameteri(R,t.TEXTURE_MAG_FILTER,ut[y.magFilter]),t.texParameteri(R,t.TEXTURE_MIN_FILTER,ut[y.minFilter]),y.compareFunction)t.texParameteri(R,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(R,t.TEXTURE_COMPARE_FUNC,Ct[y.compareFunction]);if(e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===1003)return;if(y.minFilter!==1005&&y.minFilter!==1008)return;if(y.type===1015&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let F=e.get("EXT_texture_filter_anisotropic");t.texParameterf(R,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function q(R,y){let F=!1;if(R.__webglInit===void 0)R.__webglInit=!0,y.addEventListener("dispose",w);let Z=y.source,J=d.get(Z);if(J===void 0)J={},d.set(Z,J);let W=G(y);if(W!==R.__cacheKey){if(J[W]===void 0)J[W]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,F=!0;J[W].usedTimes++;let bt=J[R.__cacheKey];if(bt!==void 0){if(J[R.__cacheKey].usedTimes--,bt.usedTimes===0)M(y)}R.__cacheKey=W,R.__webglTexture=J[W].texture}return F}function tt(R,y,F){let Z=t.TEXTURE_2D;if(y.isDataArrayTexture||y.isCompressedArrayTexture)Z=t.TEXTURE_2D_ARRAY;if(y.isData3DTexture)Z=t.TEXTURE_3D;let J=q(R,y),W=y.source;n.bindTexture(Z,R.__webglTexture,t.TEXTURE0+F);let bt=i.get(W);if(W.version!==bt.__version||J===!0){n.activeTexture(t.TEXTURE0+F);let rt=Xt.getPrimaries(Xt.workingColorSpace),ft=y.colorSpace===""?null:Xt.getPrimaries(y.colorSpace),Nt=y.colorSpace===""||rt===ft?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Nt);let et=_(y.image,!1,s.maxTextureSize);et=Tt(y,et);let dt=r.convert(y.format,y.colorSpace),kt=r.convert(y.type),Rt=x(y.internalFormat,dt,kt,y.colorSpace,y.isVideoTexture);Wt(Z,y);let pt,Dt=y.mipmaps,Ht=y.isVideoTexture!==!0,pe=bt.__version===void 0||J===!0,P=W.dataReady,Q=I(y,et);if(y.isDepthTexture){if(Rt=E(y.format===1027,y.type),pe)if(Ht)n.texStorage2D(t.TEXTURE_2D,1,Rt,et.width,et.height);else n.texImage2D(t.TEXTURE_2D,0,Rt,et.width,et.height,0,dt,kt,null)}else if(y.isDataTexture)if(Dt.length>0){if(Ht&&pe)n.texStorage2D(t.TEXTURE_2D,Q,Rt,Dt[0].width,Dt[0].height);for(let X=0,Y=Dt.length;X<Y;X++)if(pt=Dt[X],Ht){if(P)n.texSubImage2D(t.TEXTURE_2D,X,0,0,pt.width,pt.height,dt,kt,pt.data)}else n.texImage2D(t.TEXTURE_2D,X,Rt,pt.width,pt.height,0,dt,kt,pt.data);y.generateMipmaps=!1}else if(Ht){if(pe)n.texStorage2D(t.TEXTURE_2D,Q,Rt,et.width,et.height);if(P)n.texSubImage2D(t.TEXTURE_2D,0,0,0,et.width,et.height,dt,kt,et.data)}else n.texImage2D(t.TEXTURE_2D,0,Rt,et.width,et.height,0,dt,kt,et.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){if(Ht&&pe)n.texStorage3D(t.TEXTURE_2D_ARRAY,Q,Rt,Dt[0].width,Dt[0].height,et.depth);for(let X=0,Y=Dt.length;X<Y;X++)if(pt=Dt[X],y.format!==1023)if(dt!==null)if(Ht){if(P)if(y.layerUpdates.size>0){let ht=Fl(pt.width,pt.height,y.format,y.type);for(let at of y.layerUpdates){let Ot=pt.data.subarray(at*ht/pt.data.BYTES_PER_ELEMENT,(at+1)*ht/pt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,X,0,0,at,pt.width,pt.height,1,dt,Ot)}y.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,X,0,0,0,pt.width,pt.height,et.depth,dt,pt.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,X,Rt,pt.width,pt.height,et.depth,0,pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(Ht){if(P)n.texSubImage3D(t.TEXTURE_2D_ARRAY,X,0,0,0,pt.width,pt.height,et.depth,dt,kt,pt.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,X,Rt,pt.width,pt.height,et.depth,0,dt,kt,pt.data)}else{if(Ht&&pe)n.texStorage2D(t.TEXTURE_2D,Q,Rt,Dt[0].width,Dt[0].height);for(let X=0,Y=Dt.length;X<Y;X++)if(pt=Dt[X],y.format!==1023)if(dt!==null)if(Ht){if(P)n.compressedTexSubImage2D(t.TEXTURE_2D,X,0,0,pt.width,pt.height,dt,pt.data)}else n.compressedTexImage2D(t.TEXTURE_2D,X,Rt,pt.width,pt.height,0,pt.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(Ht){if(P)n.texSubImage2D(t.TEXTURE_2D,X,0,0,pt.width,pt.height,dt,kt,pt.data)}else n.texImage2D(t.TEXTURE_2D,X,Rt,pt.width,pt.height,0,dt,kt,pt.data)}else if(y.isDataArrayTexture)if(Ht){if(pe)n.texStorage3D(t.TEXTURE_2D_ARRAY,Q,Rt,et.width,et.height,et.depth);if(P)if(y.layerUpdates.size>0){let X=Fl(et.width,et.height,y.format,y.type);for(let Y of y.layerUpdates){let ht=et.data.subarray(Y*X/et.data.BYTES_PER_ELEMENT,(Y+1)*X/et.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Y,et.width,et.height,1,dt,kt,ht)}y.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,dt,kt,et.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Rt,et.width,et.height,et.depth,0,dt,kt,et.data);else if(y.isData3DTexture)if(Ht){if(pe)n.texStorage3D(t.TEXTURE_3D,Q,Rt,et.width,et.height,et.depth);if(P)n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,dt,kt,et.data)}else n.texImage3D(t.TEXTURE_3D,0,Rt,et.width,et.height,et.depth,0,dt,kt,et.data);else if(y.isFramebufferTexture){if(pe)if(Ht)n.texStorage2D(t.TEXTURE_2D,Q,Rt,et.width,et.height);else{let{width:X,height:Y}=et;for(let ht=0;ht<Q;ht++)n.texImage2D(t.TEXTURE_2D,ht,Rt,X,Y,0,dt,kt,null),X>>=1,Y>>=1}}else if(Dt.length>0){if(Ht&&pe){let X=Pt(Dt[0]);n.texStorage2D(t.TEXTURE_2D,Q,Rt,X.width,X.height)}for(let X=0,Y=Dt.length;X<Y;X++)if(pt=Dt[X],Ht){if(P)n.texSubImage2D(t.TEXTURE_2D,X,0,0,dt,kt,pt)}else n.texImage2D(t.TEXTURE_2D,X,Rt,dt,kt,pt);y.generateMipmaps=!1}else if(Ht){if(pe){let X=Pt(et);n.texStorage2D(t.TEXTURE_2D,Q,Rt,X.width,X.height)}if(P)n.texSubImage2D(t.TEXTURE_2D,0,0,0,dt,kt,et)}else n.texImage2D(t.TEXTURE_2D,0,Rt,dt,kt,et);if(p(y))m(Z);if(bt.__version=W.version,y.onUpdate)y.onUpdate(y)}R.__version=y.version}function St(R,y,F){if(y.image.length!==6)return;let Z=q(R,y),J=y.source;n.bindTexture(t.TEXTURE_CUBE_MAP,R.__webglTexture,t.TEXTURE0+F);let W=i.get(J);if(J.version!==W.__version||Z===!0){n.activeTexture(t.TEXTURE0+F);let bt=Xt.getPrimaries(Xt.workingColorSpace),rt=y.colorSpace===""?null:Xt.getPrimaries(y.colorSpace),ft=y.colorSpace===""||bt===rt?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);let Nt=y.isCompressedTexture||y.image[0].isCompressedTexture,et=y.image[0]&&y.image[0].isDataTexture,dt=[];for(let Y=0;Y<6;Y++){if(!Nt&&!et)dt[Y]=_(y.image[Y],!0,s.maxCubemapSize);else dt[Y]=et?y.image[Y].image:y.image[Y];dt[Y]=Tt(y,dt[Y])}let kt=dt[0],Rt=r.convert(y.format,y.colorSpace),pt=r.convert(y.type),Dt=x(y.internalFormat,Rt,pt,y.colorSpace),Ht=y.isVideoTexture!==!0,pe=W.__version===void 0||Z===!0,P=J.dataReady,Q=I(y,kt);Wt(t.TEXTURE_CUBE_MAP,y);let X;if(Nt){if(Ht&&pe)n.texStorage2D(t.TEXTURE_CUBE_MAP,Q,Dt,kt.width,kt.height);for(let Y=0;Y<6;Y++){X=dt[Y].mipmaps;for(let ht=0;ht<X.length;ht++){let at=X[ht];if(y.format!==1023)if(Rt!==null)if(Ht){if(P)n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ht,0,0,at.width,at.height,Rt,at.data)}else n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ht,Dt,at.width,at.height,0,at.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(Ht){if(P)n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ht,0,0,at.width,at.height,Rt,pt,at.data)}else n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ht,Dt,at.width,at.height,0,Rt,pt,at.data)}}}else{if(X=y.mipmaps,Ht&&pe){if(X.length>0)Q++;let Y=Pt(dt[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Q,Dt,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(et){if(Ht){if(P)n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,dt[Y].width,dt[Y].height,Rt,pt,dt[Y].data)}else n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Dt,dt[Y].width,dt[Y].height,0,Rt,pt,dt[Y].data);for(let ht=0;ht<X.length;ht++){let Ot=X[ht].image[Y].image;if(Ht){if(P)n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ht+1,0,0,Ot.width,Ot.height,Rt,pt,Ot.data)}else n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ht+1,Dt,Ot.width,Ot.height,0,Rt,pt,Ot.data)}}else{if(Ht){if(P)n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Rt,pt,dt[Y])}else n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Dt,Rt,pt,dt[Y]);for(let ht=0;ht<X.length;ht++){let at=X[ht];if(Ht){if(P)n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ht+1,0,0,Rt,pt,at.image[Y])}else n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ht+1,Dt,Rt,pt,at.image[Y])}}}if(p(y))m(t.TEXTURE_CUBE_MAP);if(W.__version=J.version,y.onUpdate)y.onUpdate(y)}R.__version=y.version}function Et(R,y,F,Z,J,W){let bt=r.convert(F.format,F.colorSpace),rt=r.convert(F.type),ft=x(F.internalFormat,bt,rt,F.colorSpace),Nt=i.get(y),et=i.get(F);if(et.__renderTarget=y,!Nt.__hasExternalTextures){let dt=Math.max(1,y.width>>W),kt=Math.max(1,y.height>>W);if(J===t.TEXTURE_3D||J===t.TEXTURE_2D_ARRAY)n.texImage3D(J,W,ft,dt,kt,y.depth,0,bt,rt,null);else n.texImage2D(J,W,ft,dt,kt,0,bt,rt,null)}if(n.bindFramebuffer(t.FRAMEBUFFER,R),mt(y))a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Z,J,et.__webglTexture,0,ae(y));else if(J===t.TEXTURE_2D||J>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)t.framebufferTexture2D(t.FRAMEBUFFER,Z,J,et.__webglTexture,W);n.bindFramebuffer(t.FRAMEBUFFER,null)}function st(R,y,F){if(t.bindRenderbuffer(t.RENDERBUFFER,R),y.depthBuffer){let Z=y.depthTexture,J=Z&&Z.isDepthTexture?Z.type:null,W=E(y.stencilBuffer,J),bt=y.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,rt=ae(y);if(mt(y))a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,rt,W,y.width,y.height);else if(F)t.renderbufferStorageMultisample(t.RENDERBUFFER,rt,W,y.width,y.height);else t.renderbufferStorage(t.RENDERBUFFER,W,y.width,y.height);t.framebufferRenderbuffer(t.FRAMEBUFFER,bt,t.RENDERBUFFER,R)}else{let Z=y.textures;for(let J=0;J<Z.length;J++){let W=Z[J],bt=r.convert(W.format,W.colorSpace),rt=r.convert(W.type),ft=x(W.internalFormat,bt,rt,W.colorSpace),Nt=ae(y);if(F&&mt(y)===!1)t.renderbufferStorageMultisample(t.RENDERBUFFER,Nt,ft,y.width,y.height);else if(mt(y))a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Nt,ft,y.width,y.height);else t.renderbufferStorage(t.RENDERBUFFER,ft,y.width,y.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function wt(R,y){if(y&&y.isWebGLCubeRenderTarget)throw Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,R),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Z=i.get(y.depthTexture);if(Z.__renderTarget=y,!Z.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0;K(y.depthTexture,0);let J=Z.__webglTexture,W=ae(y);if(y.depthTexture.format===1026)if(mt(y))a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,J,0,W);else t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,J,0);else if(y.depthTexture.format===1027)if(mt(y))a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,J,0,W);else t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,J,0);else throw Error("Unknown depthTexture format")}function re(R){let y=i.get(R),F=R.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==R.depthTexture){let Z=R.depthTexture;if(y.__depthDisposeCallback)y.__depthDisposeCallback();if(Z){let J=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,Z.removeEventListener("dispose",J)};Z.addEventListener("dispose",J),y.__depthDisposeCallback=J}y.__boundDepthTexture=Z}if(R.depthTexture&&!y.__autoAllocateDepthBuffer){if(F)throw Error("target.depthTexture not supported in Cube render targets");wt(y.__webglFramebuffer,R)}else if(F){y.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer[Z]),y.__webglDepthbuffer[Z]===void 0)y.__webglDepthbuffer[Z]=t.createRenderbuffer(),st(y.__webglDepthbuffer[Z],R,!1);else{let J=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,W=y.__webglDepthbuffer[Z];t.bindRenderbuffer(t.RENDERBUFFER,W),t.framebufferRenderbuffer(t.FRAMEBUFFER,J,t.RENDERBUFFER,W)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=t.createRenderbuffer(),st(y.__webglDepthbuffer,R,!1);else{let Z=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,J=y.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,J),t.framebufferRenderbuffer(t.FRAMEBUFFER,Z,t.RENDERBUFFER,J)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function qt(R,y,F){let Z=i.get(R);if(y!==void 0)Et(Z.__webglFramebuffer,R,R.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0);if(F!==void 0)re(R)}function Zt(R){let y=R.texture,F=i.get(R),Z=i.get(y);R.addEventListener("dispose",A);let J=R.textures,W=R.isWebGLCubeRenderTarget===!0,bt=J.length>1;if(!bt){if(Z.__webglTexture===void 0)Z.__webglTexture=t.createTexture();Z.__version=y.version,o.memory.textures++}if(W){F.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer[rt]=[];for(let ft=0;ft<y.mipmaps.length;ft++)F.__webglFramebuffer[rt][ft]=t.createFramebuffer()}else F.__webglFramebuffer[rt]=t.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer=[];for(let rt=0;rt<y.mipmaps.length;rt++)F.__webglFramebuffer[rt]=t.createFramebuffer()}else F.__webglFramebuffer=t.createFramebuffer();if(bt)for(let rt=0,ft=J.length;rt<ft;rt++){let Nt=i.get(J[rt]);if(Nt.__webglTexture===void 0)Nt.__webglTexture=t.createTexture(),o.memory.textures++}if(R.samples>0&&mt(R)===!1){F.__webglMultisampledFramebuffer=t.createFramebuffer(),F.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let rt=0;rt<J.length;rt++){let ft=J[rt];F.__webglColorRenderbuffer[rt]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,F.__webglColorRenderbuffer[rt]);let Nt=r.convert(ft.format,ft.colorSpace),et=r.convert(ft.type),dt=x(ft.internalFormat,Nt,et,ft.colorSpace,R.isXRRenderTarget===!0),kt=ae(R);t.renderbufferStorageMultisample(t.RENDERBUFFER,kt,dt,R.width,R.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+rt,t.RENDERBUFFER,F.__webglColorRenderbuffer[rt])}if(t.bindRenderbuffer(t.RENDERBUFFER,null),R.depthBuffer)F.__webglDepthRenderbuffer=t.createRenderbuffer(),st(F.__webglDepthRenderbuffer,R,!0);n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(W){n.bindTexture(t.TEXTURE_CUBE_MAP,Z.__webglTexture),Wt(t.TEXTURE_CUBE_MAP,y);for(let rt=0;rt<6;rt++)if(y.mipmaps&&y.mipmaps.length>0)for(let ft=0;ft<y.mipmaps.length;ft++)Et(F.__webglFramebuffer[rt][ft],R,y,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+rt,ft);else Et(F.__webglFramebuffer[rt],R,y,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);if(p(y))m(t.TEXTURE_CUBE_MAP);n.unbindTexture()}else if(bt){for(let rt=0,ft=J.length;rt<ft;rt++){let Nt=J[rt],et=i.get(Nt);if(n.bindTexture(t.TEXTURE_2D,et.__webglTexture),Wt(t.TEXTURE_2D,Nt),Et(F.__webglFramebuffer,R,Nt,t.COLOR_ATTACHMENT0+rt,t.TEXTURE_2D,0),p(Nt))m(t.TEXTURE_2D)}n.unbindTexture()}else{let rt=t.TEXTURE_2D;if(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)rt=R.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY;if(n.bindTexture(rt,Z.__webglTexture),Wt(rt,y),y.mipmaps&&y.mipmaps.length>0)for(let ft=0;ft<y.mipmaps.length;ft++)Et(F.__webglFramebuffer[ft],R,y,t.COLOR_ATTACHMENT0,rt,ft);else Et(F.__webglFramebuffer,R,y,t.COLOR_ATTACHMENT0,rt,0);if(p(y))m(rt);n.unbindTexture()}if(R.depthBuffer)re(R)}function Re(R){let y=R.textures;for(let F=0,Z=y.length;F<Z;F++){let J=y[F];if(p(J)){let W=v(R),bt=i.get(J).__webglTexture;n.bindTexture(W,bt),m(W),n.unbindTexture()}}}let D=[],Ce=[];function oe(R){if(R.samples>0){if(mt(R)===!1){let{textures:y,width:F,height:Z}=R,J=t.COLOR_BUFFER_BIT,W=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,bt=i.get(R),rt=y.length>1;if(rt)for(let ft=0;ft<y.length;ft++)n.bindFramebuffer(t.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ft,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,bt.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ft,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let ft=0;ft<y.length;ft++){if(R.resolveDepthBuffer){if(R.depthBuffer)J|=t.DEPTH_BUFFER_BIT;if(R.stencilBuffer&&R.resolveStencilBuffer)J|=t.STENCIL_BUFFER_BIT}if(rt){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,bt.__webglColorRenderbuffer[ft]);let Nt=i.get(y[ft]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Nt,0)}if(t.blitFramebuffer(0,0,F,Z,0,0,F,Z,J,t.NEAREST),l===!0){if(D.length=0,Ce.length=0,D.push(t.COLOR_ATTACHMENT0+ft),R.depthBuffer&&R.resolveDepthBuffer===!1)D.push(W),Ce.push(W),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Ce);t.invalidateFramebuffer(t.READ_FRAMEBUFFER,D)}}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),rt)for(let ft=0;ft<y.length;ft++){n.bindFramebuffer(t.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ft,t.RENDERBUFFER,bt.__webglColorRenderbuffer[ft]);let Nt=i.get(y[ft]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,bt.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ft,t.TEXTURE_2D,Nt,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){let y=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[y])}}}function ae(R){return Math.min(s.maxSamples,R.samples)}function mt(R){let y=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function _e(R){let y=o.render.frame;if(h.get(R)!==y)h.set(R,y),R.update()}function Tt(R,y){let{colorSpace:F,format:Z,type:J}=R;if(R.isCompressedTexture===!0||R.isVideoTexture===!0)return y;if(F!=="srgb-linear"&&F!=="")if(Xt.getTransfer(F)==="srgb"){if(Z!==1023||J!==1009)console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else console.error("THREE.WebGLTextures: Unsupported texture color space:",F);return y}function Pt(R){if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement)c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height;else if(typeof VideoFrame<"u"&&R instanceof VideoFrame)c.width=R.displayWidth,c.height=R.displayHeight;else c.width=R.width,c.height=R.height;return c}this.allocateTextureUnit=k,this.resetTextureUnits=z,this.setTexture2D=K,this.setTexture2DArray=V,this.setTexture3D=j,this.setTextureCube=H,this.rebindTextures=qt,this.setupRenderTarget=Zt,this.updateRenderTargetMipmap=Re,this.updateMultisampleRenderTarget=oe,this.setupDepthRenderbuffer=re,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=mt}function Ug(t,e){function n(i,s=""){let r,o=Xt.getTransfer(s);if(i===1009)return t.UNSIGNED_BYTE;if(i===1017)return t.UNSIGNED_SHORT_4_4_4_4;if(i===1018)return t.UNSIGNED_SHORT_5_5_5_1;if(i===35902)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===1010)return t.BYTE;if(i===1011)return t.SHORT;if(i===1012)return t.UNSIGNED_SHORT;if(i===1013)return t.INT;if(i===1014)return t.UNSIGNED_INT;if(i===1015)return t.FLOAT;if(i===1016)return t.HALF_FLOAT;if(i===1021)return t.ALPHA;if(i===1022)return t.RGB;if(i===1023)return t.RGBA;if(i===1024)return t.LUMINANCE;if(i===1025)return t.LUMINANCE_ALPHA;if(i===1026)return t.DEPTH_COMPONENT;if(i===1027)return t.DEPTH_STENCIL;if(i===1028)return t.RED;if(i===1029)return t.RED_INTEGER;if(i===1030)return t.RG;if(i===1031)return t.RG_INTEGER;if(i===1033)return t.RGBA_INTEGER;if(i===33776||i===33777||i===33778||i===33779)if(o==="srgb")if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===33776)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===33777)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===33778)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===33779)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===33776)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===33777)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===33778)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===33779)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===35840||i===35841||i===35842||i===35843)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===35840)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===35841)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===35842)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===35843)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===36196||i===37492||i===37496)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===36196||i===37492)return o==="srgb"?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===37496)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===37808||i===37809||i===37810||i===37811||i===37812||i===37813||i===37814||i===37815||i===37816||i===37817||i===37818||i===37819||i===37820||i===37821)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===37808)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===37809)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===37810)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===37811)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===37812)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===37813)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===37814)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===37815)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===37816)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===37817)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===37818)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===37819)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===37820)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===37821)return o==="srgb"?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===36492||i===36494||i===36495)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===36492)return o==="srgb"?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===36494)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===36495)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===36283||i===36284||i===36285||i===36286)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===36492)return r.COMPRESSED_RED_RGTC1_EXT;if(i===36284)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===36285)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===36286)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(i===1020)return t.UNSIGNED_INT_24_8;return t[i]!==void 0?t[i]:null}return{convert:n}}class Bc extends we{constructor(t=[]){super();this.isArrayCamera=!0,this.cameras=t}}class ve extends le{constructor(){super();this.isGroup=!0,this.type="Group"}}var Fg={type:"move"};class vr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new ve,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new ve,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new ve,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b;return this._grip}dispatchEvent(t){if(this._targetRay!==null)this._targetRay.dispatchEvent(t);if(this._grip!==null)this._grip.dispatchEvent(t);if(this._hand!==null)this._hand.dispatchEvent(t);return this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){if(this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(t,e,n){let i=null,s=null,r=null,o=this._targetRay,a=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){r=!0;for(let g of t.hand.values()){let _=e.getJointPose(g,n),p=this._getHandJoint(l,g);if(_!==null)p.matrix.fromArray(_.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=_.radius;p.visible=_!==null}let c=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],u=c.position.distanceTo(h.position),d=0.02,f=0.005;if(l.inputState.pinching&&u>d+f)l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this});else if(!l.inputState.pinching&&u<=d-f)l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this})}else if(a!==null&&t.gripSpace){if(s=e.getPose(t.gripSpace,n),s!==null){if(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity)a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity);else a.hasLinearVelocity=!1;if(s.angularVelocity)a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity);else a.hasAngularVelocity=!1}}if(o!==null){if(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null)i=s;if(i!==null){if(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity)o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity);else o.hasLinearVelocity=!1;if(i.angularVelocity)o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity);else o.hasAngularVelocity=!1;this.dispatchEvent(Fg)}}}if(o!==null)o.visible=i!==null;if(a!==null)a.visible=s!==null;if(l!==null)l.visible=r!==null;return this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new ve;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}var Og=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Bg=`
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

}`;class zc{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let i=new Se,s=t.properties.get(i);if(s.__webglTexture=e.texture,e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)this.depthNear=e.depthNear,this.depthFar=e.depthFar;this.texture=i}}getMesh(t){if(this.texture!==null){if(this.mesh===null){let e=t.cameras[0].viewport,n=new Un({vertexShader:Og,fragmentShader:Bg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new vt(new De(20,20),n)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Hc extends pi{constructor(t,e){super();let n=this,i=null,s=1,r=null,o="local-floor",a=1,l=null,c=null,h=null,u=null,d=null,f=null,g=new zc,_=e.getContextAttributes(),p=null,m=null,v=[],x=[],E=new ot,I=null,w=new we;w.viewport=new $t;let A=new we;A.viewport=new $t;let U=[w,A],M=new Bc,T=null,C=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let tt=v[q];if(tt===void 0)tt=new vr,v[q]=tt;return tt.getTargetRaySpace()},this.getControllerGrip=function(q){let tt=v[q];if(tt===void 0)tt=new vr,v[q]=tt;return tt.getGripSpace()},this.getHand=function(q){let tt=v[q];if(tt===void 0)tt=new vr,v[q]=tt;return tt.getHandSpace()};function z(q){let tt=x.indexOf(q.inputSource);if(tt===-1)return;let St=v[tt];if(St!==void 0)St.update(q.inputSource,q.frame,l||r),St.dispatchEvent({type:q.type,data:q.inputSource})}function k(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",k),i.removeEventListener("inputsourceschange",G);for(let q=0;q<v.length;q++){let tt=x[q];if(tt===null)continue;x[q]=null,v[q].disconnect(tt)}T=null,C=null,g.reset(),t.setRenderTarget(p),d=null,u=null,h=null,i=null,m=null,Wt.stop(),n.isPresenting=!1,t.setPixelRatio(I),t.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){if(s=q,n.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){if(o=q,n.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return h},this.getFrame=function(){return f},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",k),i.addEventListener("inputsourceschange",G),_.xrCompatible!==!0)await e.makeXRCompatible();if(I=t.getPixelRatio(),t.getSize(E),i.renderState.layers===void 0){let tt={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,e,tt),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),m=new $n(d.framebufferWidth,d.framebufferHeight,{format:1023,type:1009,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let tt=null,St=null,Et=null;if(_.depth)Et=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=_.stencil?1027:1026,St=_.stencil?1020:1014;let st={colorFormat:e.RGBA8,depthFormat:Et,scaleFactor:s};h=new XRWebGLBinding(i,e),u=h.createProjectionLayer(st),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),m=new $n(u.textureWidth,u.textureHeight,{format:1023,type:1009,depthTexture:new ko(u.textureWidth,u.textureHeight,St,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}m.isXRRenderTarget=!0,this.setFoveation(a),l=null,r=await i.requestReferenceSpace(o),Wt.setContext(i),Wt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function G(q){for(let tt=0;tt<q.removed.length;tt++){let St=q.removed[tt],Et=x.indexOf(St);if(Et>=0)x[Et]=null,v[Et].disconnect(St)}for(let tt=0;tt<q.added.length;tt++){let St=q.added[tt],Et=x.indexOf(St);if(Et===-1){for(let wt=0;wt<v.length;wt++)if(wt>=x.length){x.push(St),Et=wt;break}else if(x[wt]===null){x[wt]=St,Et=wt;break}if(Et===-1)break}let st=v[Et];if(st)st.connect(St)}}let K=new b,V=new b;function j(q,tt,St){K.setFromMatrixPosition(tt.matrixWorld),V.setFromMatrixPosition(St.matrixWorld);let Et=K.distanceTo(V),st=tt.projectionMatrix.elements,wt=St.projectionMatrix.elements,re=st[14]/(st[10]-1),qt=st[14]/(st[10]+1),Zt=(st[9]+1)/st[5],Re=(st[9]-1)/st[5],D=(st[8]-1)/st[0],Ce=(wt[8]+1)/wt[0],oe=re*D,ae=re*Ce,mt=Et/(-D+Ce),_e=mt*-D;if(tt.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(_e),q.translateZ(mt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),st[10]===-1)q.projectionMatrix.copy(tt.projectionMatrix),q.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{let Tt=re+mt,Pt=qt+mt,R=oe-_e,y=ae+(Et-_e),F=Zt*qt/Pt*Tt,Z=Re*qt/Pt*Tt;q.projectionMatrix.makePerspective(R,y,F,Z,Tt,Pt),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function H(q,tt){if(tt===null)q.matrixWorld.copy(q.matrix);else q.matrixWorld.multiplyMatrices(tt.matrixWorld,q.matrix);q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;let{near:tt,far:St}=q;if(g.texture!==null){if(g.depthNear>0)tt=g.depthNear;if(g.depthFar>0)St=g.depthFar}if(M.near=A.near=w.near=tt,M.far=A.far=w.far=St,T!==M.near||C!==M.far)i.updateRenderState({depthNear:M.near,depthFar:M.far}),T=M.near,C=M.far;w.layers.mask=q.layers.mask|2,A.layers.mask=q.layers.mask|4,M.layers.mask=w.layers.mask|A.layers.mask;let Et=q.parent,st=M.cameras;H(M,Et);for(let wt=0;wt<st.length;wt++)H(st[wt],Et);if(st.length===2)j(M,w,A);else M.projectionMatrix.copy(w.projectionMatrix);ct(q,M,Et)};function ct(q,tt,St){if(St===null)q.matrix.copy(tt.matrixWorld);else q.matrix.copy(St.matrixWorld),q.matrix.invert(),q.matrix.multiply(tt.matrixWorld);if(q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(tt.projectionMatrix),q.projectionMatrixInverse.copy(tt.projectionMatrixInverse),q.isPerspectiveCamera)q.fov=Vi*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1}this.getCamera=function(){return M},this.getFoveation=function(){if(u===null&&d===null)return;return a},this.setFoveation=function(q){if(a=q,u!==null)u.fixedFoveation=q;if(d!==null&&d.fixedFoveation!==void 0)d.fixedFoveation=q},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(M)};let ut=null;function Ct(q,tt){if(c=tt.getViewerPose(l||r),f=tt,c!==null){let St=c.views;if(d!==null)t.setRenderTargetFramebuffer(m,d.framebuffer),t.setRenderTarget(m);let Et=!1;if(St.length!==M.cameras.length)M.cameras.length=0,Et=!0;for(let wt=0;wt<St.length;wt++){let re=St[wt],qt=null;if(d!==null)qt=d.getViewport(re);else{let Re=h.getViewSubImage(u,re);if(qt=Re.viewport,wt===0)t.setRenderTargetTextures(m,Re.colorTexture,u.ignoreDepthValues?void 0:Re.depthStencilTexture),t.setRenderTarget(m)}let Zt=U[wt];if(Zt===void 0)Zt=new we,Zt.layers.enable(wt),Zt.viewport=new $t,U[wt]=Zt;if(Zt.matrix.fromArray(re.transform.matrix),Zt.matrix.decompose(Zt.position,Zt.quaternion,Zt.scale),Zt.projectionMatrix.fromArray(re.projectionMatrix),Zt.projectionMatrixInverse.copy(Zt.projectionMatrix).invert(),Zt.viewport.set(qt.x,qt.y,qt.width,qt.height),wt===0)M.matrix.copy(Zt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale);if(Et===!0)M.cameras.push(Zt)}let st=i.enabledFeatures;if(st&&st.includes("depth-sensing")){let wt=h.getDepthInformation(St[0]);if(wt&&wt.isValid&&wt.texture)g.init(t,wt,i.renderState)}}for(let St=0;St<v.length;St++){let Et=x[St],st=v[St];if(Et!==null&&st!==void 0)st.update(Et,tt,l||r)}if(ut)ut(q,tt);if(tt.detectedPlanes)n.dispatchEvent({type:"planesdetected",data:tt});f=null}let Wt=new wc;Wt.setAnimationLoop(Ct),this.setAnimationLoop=function(q){ut=q},this.dispose=function(){}}}var hi=new hn,zg=new At;function Hg(t,e){function n(p,m){if(p.matrixAutoUpdate===!0)p.updateMatrix();m.value.copy(p.matrix)}function i(p,m){if(m.color.getRGB(p.fogColor.value,Ec(t)),m.isFog)p.fogNear.value=m.near,p.fogFar.value=m.far;else if(m.isFogExp2)p.fogDensity.value=m.density}function s(p,m,v,x,E){if(m.isMeshBasicMaterial)r(p,m);else if(m.isMeshLambertMaterial)r(p,m);else if(m.isMeshToonMaterial)r(p,m),u(p,m);else if(m.isMeshPhongMaterial)r(p,m),h(p,m);else if(m.isMeshStandardMaterial){if(r(p,m),d(p,m),m.isMeshPhysicalMaterial)f(p,m,E)}else if(m.isMeshMatcapMaterial)r(p,m),g(p,m);else if(m.isMeshDepthMaterial)r(p,m);else if(m.isMeshDistanceMaterial)r(p,m),_(p,m);else if(m.isMeshNormalMaterial)r(p,m);else if(m.isLineBasicMaterial){if(o(p,m),m.isLineDashedMaterial)a(p,m)}else if(m.isPointsMaterial)l(p,m,v,x);else if(m.isSpriteMaterial)c(p,m);else if(m.isShadowMaterial)p.color.value.copy(m.color),p.opacity.value=m.opacity;else if(m.isShaderMaterial)m.uniformsNeedUpdate=!1}function r(p,m){if(p.opacity.value=m.opacity,m.color)p.diffuse.value.copy(m.color);if(m.emissive)p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity);if(m.map)p.map.value=m.map,n(m.map,p.mapTransform);if(m.alphaMap)p.alphaMap.value=m.alphaMap,n(m.alphaMap,p.alphaMapTransform);if(m.bumpMap){if(p.bumpMap.value=m.bumpMap,n(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===1)p.bumpScale.value*=-1}if(m.normalMap){if(p.normalMap.value=m.normalMap,n(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===1)p.normalScale.value.negate()}if(m.displacementMap)p.displacementMap.value=m.displacementMap,n(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias;if(m.emissiveMap)p.emissiveMap.value=m.emissiveMap,n(m.emissiveMap,p.emissiveMapTransform);if(m.specularMap)p.specularMap.value=m.specularMap,n(m.specularMap,p.specularMapTransform);if(m.alphaTest>0)p.alphaTest.value=m.alphaTest;let v=e.get(m),x=v.envMap,E=v.envMapRotation;if(x){if(p.envMap.value=x,hi.copy(E),hi.x*=-1,hi.y*=-1,hi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1)hi.y*=-1,hi.z*=-1;p.envMapRotation.value.setFromMatrix4(zg.makeRotationFromEuler(hi)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio}if(m.lightMap)p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,n(m.lightMap,p.lightMapTransform);if(m.aoMap)p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,n(m.aoMap,p.aoMapTransform)}function o(p,m){if(p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map)p.map.value=m.map,n(m.map,p.mapTransform)}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,v,x){if(p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*v,p.scale.value=x*0.5,m.map)p.map.value=m.map,n(m.map,p.uvTransform);if(m.alphaMap)p.alphaMap.value=m.alphaMap,n(m.alphaMap,p.alphaMapTransform);if(m.alphaTest>0)p.alphaTest.value=m.alphaTest}function c(p,m){if(p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map)p.map.value=m.map,n(m.map,p.mapTransform);if(m.alphaMap)p.alphaMap.value=m.alphaMap,n(m.alphaMap,p.alphaMapTransform);if(m.alphaTest>0)p.alphaTest.value=m.alphaTest}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,0.0001)}function u(p,m){if(m.gradientMap)p.gradientMap.value=m.gradientMap}function d(p,m){if(p.metalness.value=m.metalness,m.metalnessMap)p.metalnessMap.value=m.metalnessMap,n(m.metalnessMap,p.metalnessMapTransform);if(p.roughness.value=m.roughness,m.roughnessMap)p.roughnessMap.value=m.roughnessMap,n(m.roughnessMap,p.roughnessMapTransform);if(m.envMap)p.envMapIntensity.value=m.envMapIntensity}function f(p,m,v){if(p.ior.value=m.ior,m.sheen>0){if(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap)p.sheenColorMap.value=m.sheenColorMap,n(m.sheenColorMap,p.sheenColorMapTransform);if(m.sheenRoughnessMap)p.sheenRoughnessMap.value=m.sheenRoughnessMap,n(m.sheenRoughnessMap,p.sheenRoughnessMapTransform)}if(m.clearcoat>0){if(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap)p.clearcoatMap.value=m.clearcoatMap,n(m.clearcoatMap,p.clearcoatMapTransform);if(m.clearcoatRoughnessMap)p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,n(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform);if(m.clearcoatNormalMap){if(p.clearcoatNormalMap.value=m.clearcoatNormalMap,n(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===1)p.clearcoatNormalScale.value.negate()}}if(m.dispersion>0)p.dispersion.value=m.dispersion;if(m.iridescence>0){if(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap)p.iridescenceMap.value=m.iridescenceMap,n(m.iridescenceMap,p.iridescenceMapTransform);if(m.iridescenceThicknessMap)p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,n(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform)}if(m.transmission>0){if(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap)p.transmissionMap.value=m.transmissionMap,n(m.transmissionMap,p.transmissionMapTransform);if(p.thickness.value=m.thickness,m.thicknessMap)p.thicknessMap.value=m.thicknessMap,n(m.thicknessMap,p.thicknessMapTransform);p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)}if(m.anisotropy>0){if(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap)p.anisotropyMap.value=m.anisotropyMap,n(m.anisotropyMap,p.anisotropyMapTransform)}if(p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap)p.specularColorMap.value=m.specularColorMap,n(m.specularColorMap,p.specularColorMapTransform);if(m.specularIntensityMap)p.specularIntensityMap.value=m.specularIntensityMap,n(m.specularIntensityMap,p.specularIntensityMapTransform)}function g(p,m){if(m.matcap)p.matcap.value=m.matcap}function _(p,m){let v=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function kg(t,e,n,i){let s={},r={},o=[],a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,x){let E=x.program;i.uniformBlockBinding(v,E)}function c(v,x){let E=s[v.id];if(E===void 0)g(v),E=h(v),s[v.id]=E,v.addEventListener("dispose",p);let I=x.program;i.updateUBOMapping(v,I);let w=e.render.frame;if(r[v.id]!==w)d(v),r[v.id]=w}function h(v){let x=u();v.__bindingPointIndex=x;let E=t.createBuffer(),I=v.__size,w=v.usage;return t.bindBuffer(t.UNIFORM_BUFFER,E),t.bufferData(t.UNIFORM_BUFFER,I,w),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,x,E),E}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){let x=s[v.id],E=v.uniforms,I=v.__cache;t.bindBuffer(t.UNIFORM_BUFFER,x);for(let w=0,A=E.length;w<A;w++){let U=Array.isArray(E[w])?E[w]:[E[w]];for(let M=0,T=U.length;M<T;M++){let C=U[M];if(f(C,w,M,I)===!0){let z=C.__offset,k=Array.isArray(C.value)?C.value:[C.value],G=0;for(let K=0;K<k.length;K++){let V=k[K],j=_(V);if(typeof V==="number"||typeof V==="boolean")C.__data[0]=V,t.bufferSubData(t.UNIFORM_BUFFER,z+G,C.__data);else if(V.isMatrix3)C.__data[0]=V.elements[0],C.__data[1]=V.elements[1],C.__data[2]=V.elements[2],C.__data[3]=0,C.__data[4]=V.elements[3],C.__data[5]=V.elements[4],C.__data[6]=V.elements[5],C.__data[7]=0,C.__data[8]=V.elements[6],C.__data[9]=V.elements[7],C.__data[10]=V.elements[8],C.__data[11]=0;else V.toArray(C.__data,G),G+=j.storage/Float32Array.BYTES_PER_ELEMENT}t.bufferSubData(t.UNIFORM_BUFFER,z,C.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function f(v,x,E,I){let w=v.value,A=x+"_"+E;if(I[A]===void 0){if(typeof w==="number"||typeof w==="boolean")I[A]=w;else I[A]=w.clone();return!0}else{let U=I[A];if(typeof w==="number"||typeof w==="boolean"){if(U!==w)return I[A]=w,!0}else if(U.equals(w)===!1)return U.copy(w),!0}return!1}function g(v){let x=v.uniforms,E=0,I=16;for(let A=0,U=x.length;A<U;A++){let M=Array.isArray(x[A])?x[A]:[x[A]];for(let T=0,C=M.length;T<C;T++){let z=M[T],k=Array.isArray(z.value)?z.value:[z.value];for(let G=0,K=k.length;G<K;G++){let V=k[G],j=_(V),H=E%I,ct=H%j.boundary,ut=H+ct;if(E+=ct,ut!==0&&I-ut<j.storage)E+=I-ut;z.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=E,E+=j.storage}}}let w=E%I;if(w>0)E+=I-w;return v.__size=E,v.__cache={},this}function _(v){let x={boundary:0,storage:0};if(typeof v==="number"||typeof v==="boolean")x.boundary=4,x.storage=4;else if(v.isVector2)x.boundary=8,x.storage=8;else if(v.isVector3||v.isColor)x.boundary=16,x.storage=12;else if(v.isVector4)x.boundary=16,x.storage=16;else if(v.isMatrix3)x.boundary=48,x.storage=48;else if(v.isMatrix4)x.boundary=64,x.storage=64;else if(v.isTexture)console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.");else console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v);return x}function p(v){let x=v.target;x.removeEventListener("dispose",p);let E=o.indexOf(x.__bindingPointIndex);o.splice(E,1),t.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function m(){for(let v in s)t.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:c,dispose:m}}class Go{constructor(t={}){let{canvas:e=Wu(),context:n=null,depth:i=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:a=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=r;let f=new Uint32Array(4),g=new Int32Array(4),_=null,p=null,m=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace="srgb",this.toneMapping=0,this.toneMappingExposure=1;let x=this,E=!1,I=0,w=0,A=null,U=-1,M=null,T=new $t,C=new $t,z=null,k=new Mt(0),G=0,K=e.width,V=e.height,j=1,H=null,ct=null,ut=new $t(0,0,K,V),Ct=new $t(0,0,K,V),Wt=!1,q=new wr,tt=!1,St=!1,Et=new At,st=new At,wt=new b,re=new $t,qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Zt=!1;function Re(){return A===null?j:1}let D=n;function Ce(S,N){return e.getContext(S,N)}try{let S={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:a,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:h};if("setAttribute"in e)e.setAttribute("data-engine","three.js r170");if(e.addEventListener("webglcontextlost",X,!1),e.addEventListener("webglcontextrestored",Y,!1),e.addEventListener("webglcontextcreationerror",ht,!1),D===null){if(D=Ce("webgl2",S),D===null)if(Ce("webgl2"))throw Error("Error creating WebGL context with your selected attributes.");else throw Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let oe,ae,mt,_e,Tt,Pt,R,y,F,Z,J,W,bt,rt,ft,Nt,et,dt,kt,Rt,pt,Dt,Ht,pe;function P(){if(oe=new im(D),oe.init(),Dt=new Ug(D,oe),ae=new Jp(D,oe,t,Dt),mt=new Lg(D,oe),ae.reverseDepthBuffer&&u)mt.buffers.depth.setReversed(!0);_e=new om(D),Tt=new yg,Pt=new Dg(D,oe,mt,Tt,ae,Dt,_e),R=new Qp(x),y=new nm(x),F=new dd(D),Ht=new Kp(D,F),Z=new sm(D,F,_e,Ht),J=new lm(D,Z,F,_e),kt=new am(D,ae,Pt),Nt=new jp(Tt),W=new xg(x,R,y,oe,ae,Ht,Nt),bt=new Hg(x,Tt),rt=new Sg,ft=new Ag(oe),dt=new Zp(x,R,y,mt,J,d,a),et=new Ig(x,J,ae),pe=new kg(D,_e,ae,mt),Rt=new $p(D,oe,_e),pt=new rm(D,oe,_e),_e.programs=W.programs,x.capabilities=ae,x.extensions=oe,x.properties=Tt,x.renderLists=rt,x.shadowMap=et,x.state=mt,x.info=_e}P();let Q=new Hc(x,D);this.xr=Q,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let S=oe.get("WEBGL_lose_context");if(S)S.loseContext()},this.forceContextRestore=function(){let S=oe.get("WEBGL_lose_context");if(S)S.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(S){if(S===void 0)return;j=S,this.setSize(K,V,!1)},this.getSize=function(S){return S.set(K,V)},this.setSize=function(S,N,O=!0){if(Q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}if(K=S,V=N,e.width=Math.floor(S*j),e.height=Math.floor(N*j),O===!0)e.style.width=S+"px",e.style.height=N+"px";this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(K*j,V*j).floor()},this.setDrawingBufferSize=function(S,N,O){K=S,V=N,j=O,e.width=Math.floor(S*O),e.height=Math.floor(N*O),this.setViewport(0,0,S,N)},this.getCurrentViewport=function(S){return S.copy(T)},this.getViewport=function(S){return S.copy(ut)},this.setViewport=function(S,N,O,B){if(S.isVector4)ut.set(S.x,S.y,S.z,S.w);else ut.set(S,N,O,B);mt.viewport(T.copy(ut).multiplyScalar(j).round())},this.getScissor=function(S){return S.copy(Ct)},this.setScissor=function(S,N,O,B){if(S.isVector4)Ct.set(S.x,S.y,S.z,S.w);else Ct.set(S,N,O,B);mt.scissor(C.copy(Ct).multiplyScalar(j).round())},this.getScissorTest=function(){return Wt},this.setScissorTest=function(S){mt.setScissorTest(Wt=S)},this.setOpaqueSort=function(S){H=S},this.setTransparentSort=function(S){ct=S},this.getClearColor=function(S){return S.copy(dt.getClearColor())},this.setClearColor=function(){dt.setClearColor.apply(dt,arguments)},this.getClearAlpha=function(){return dt.getClearAlpha()},this.setClearAlpha=function(){dt.setClearAlpha.apply(dt,arguments)},this.clear=function(S=!0,N=!0,O=!0){let B=0;if(S){let L=!1;if(A!==null){let nt=A.texture.format;L=nt===1033||nt===1031||nt===1029}if(L){let nt=A.texture.type,lt=nt===1009||nt===1014||nt===1012||nt===1020||nt===1017||nt===1018,gt=dt.getClearColor(),_t=dt.getClearAlpha(),It=gt.r,Ut=gt.g,xt=gt.b;if(lt)f[0]=It,f[1]=Ut,f[2]=xt,f[3]=_t,D.clearBufferuiv(D.COLOR,0,f);else g[0]=It,g[1]=Ut,g[2]=xt,g[3]=_t,D.clearBufferiv(D.COLOR,0,g)}else B|=D.COLOR_BUFFER_BIT}if(N)B|=D.DEPTH_BUFFER_BIT;if(O)B|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);D.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",X,!1),e.removeEventListener("webglcontextrestored",Y,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),rt.dispose(),ft.dispose(),Tt.dispose(),R.dispose(),y.dispose(),J.dispose(),Ht.dispose(),pe.dispose(),W.dispose(),Q.dispose(),Q.removeEventListener("sessionstart",Sn),Q.removeEventListener("sessionend",za),si.stop()};function X(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function Y(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;let S=_e.autoReset,N=et.enabled,O=et.autoUpdate,B=et.needsUpdate,L=et.type;P(),_e.autoReset=S,et.enabled=N,et.autoUpdate=O,et.needsUpdate=B,et.type=L}function ht(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function at(S){let N=S.target;N.removeEventListener("dispose",at),Ot(N)}function Ot(S){xe(S),Tt.remove(S)}function xe(S){let N=Tt.get(S).programs;if(N!==void 0){if(N.forEach(function(O){W.releaseProgram(O)}),S.isShaderMaterial)W.releaseShaderCache(S)}}this.renderBufferDirect=function(S,N,O,B,L,nt){if(N===null)N=qt;let lt=L.isMesh&&L.matrixWorld.determinant()<0,gt=Su(S,N,O,B,L);mt.setMaterial(B,lt);let _t=O.index,It=1;if(B.wireframe===!0){if(_t=Z.getWireframeAttribute(O),_t===void 0)return;It=2}let Ut=O.drawRange,xt=O.attributes.position,Kt=Ut.start*It,ce=(Ut.start+Ut.count)*It;if(nt!==null)Kt=Math.max(Kt,nt.start*It),ce=Math.min(ce,(nt.start+nt.count)*It);if(_t!==null)Kt=Math.max(Kt,0),ce=Math.min(ce,_t.count);else if(xt!==void 0&&xt!==null)Kt=Math.max(Kt,0),ce=Math.min(ce,xt.count);let de=ce-Kt;if(de<0||de===1/0)return;Ht.setup(L,B,gt,O,_t);let Oe,Qt=Rt;if(_t!==null)Oe=F.get(_t),Qt=pt,Qt.setIndex(Oe);if(L.isMesh)if(B.wireframe===!0)mt.setLineWidth(B.wireframeLinewidth*Re()),Qt.setMode(D.LINES);else Qt.setMode(D.TRIANGLES);else if(L.isLine){let yt=B.linewidth;if(yt===void 0)yt=1;if(mt.setLineWidth(yt*Re()),L.isLineSegments)Qt.setMode(D.LINES);else if(L.isLineLoop)Qt.setMode(D.LINE_LOOP);else Qt.setMode(D.LINE_STRIP)}else if(L.isPoints)Qt.setMode(D.POINTS);else if(L.isSprite)Qt.setMode(D.TRIANGLES);if(L.isBatchedMesh)if(L._multiDrawInstances!==null)Qt.renderMultiDrawInstances(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount,L._multiDrawInstances);else if(!oe.get("WEBGL_multi_draw")){let{_multiDrawStarts:yt,_multiDrawCounts:An,_multiDrawCount:te}=L,sn=_t?F.get(_t).bytesPerElement:1,bi=Tt.get(B).currentProgram.getUniforms();for(let Ge=0;Ge<te;Ge++)bi.setValue(D,"_gl_DrawID",Ge),Qt.render(yt[Ge]/sn,An[Ge])}else Qt.renderMultiDraw(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount);else if(L.isInstancedMesh)Qt.renderInstances(Kt,de,L.count);else if(O.isInstancedBufferGeometry){let yt=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,An=Math.min(O.instanceCount,yt);Qt.renderInstances(Kt,de,An)}else Qt.render(Kt,de)};function Ie(S,N,O){if(S.transparent===!0&&S.side===2&&S.forceSinglePass===!1)S.side=1,S.needsUpdate=!0,Vs(S,N,O),S.side=0,S.needsUpdate=!0,Vs(S,N,O),S.side=2;else Vs(S,N,O)}this.compile=function(S,N,O=null){if(O===null)O=S;if(p=ft.get(O),p.init(N),v.push(p),O.traverseVisible(function(L){if(L.isLight&&L.layers.test(N.layers)){if(p.pushLight(L),L.castShadow)p.pushShadow(L)}}),S!==O)S.traverseVisible(function(L){if(L.isLight&&L.layers.test(N.layers)){if(p.pushLight(L),L.castShadow)p.pushShadow(L)}});p.setupLights();let B=new Set;return S.traverse(function(L){if(!(L.isMesh||L.isPoints||L.isLine||L.isSprite))return;let nt=L.material;if(nt)if(Array.isArray(nt))for(let lt=0;lt<nt.length;lt++){let gt=nt[lt];Ie(gt,O,L),B.add(gt)}else Ie(nt,O,L),B.add(nt)}),v.pop(),p=null,B},this.compileAsync=function(S,N,O=null){let B=this.compile(S,N,O);return new Promise((L)=>{function nt(){if(B.forEach(function(lt){if(Tt.get(lt).currentProgram.isReady())B.delete(lt)}),B.size===0){L(S);return}setTimeout(nt,10)}if(oe.get("KHR_parallel_shader_compile")!==null)nt();else setTimeout(nt,10)})};let jt=null;function wn(S){if(jt)jt(S)}function Sn(){si.stop()}function za(){si.start()}let si=new wc;if(si.setAnimationLoop(wn),typeof self<"u")si.setContext(self);this.setAnimationLoop=function(S){jt=S,Q.setAnimationLoop(S),S===null?si.stop():si.start()},Q.addEventListener("sessionstart",Sn),Q.addEventListener("sessionend",za),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(S.matrixWorldAutoUpdate===!0)S.updateMatrixWorld();if(N.parent===null&&N.matrixWorldAutoUpdate===!0)N.updateMatrixWorld();if(Q.enabled===!0&&Q.isPresenting===!0){if(Q.cameraAutoUpdate===!0)Q.updateCamera(N);N=Q.getCamera()}if(S.isScene===!0)S.onBeforeRender(x,S,N,A);if(p=ft.get(S,v.length),p.init(N),v.push(p),st.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),q.setFromProjectionMatrix(st),St=this.localClippingEnabled,tt=Nt.init(this.clippingPlanes,St),_=rt.get(S,m.length),_.init(),m.push(_),Q.enabled===!0&&Q.isPresenting===!0){let nt=x.xr.getDepthSensingMesh();if(nt!==null)Gr(nt,N,-1/0,x.sortObjects)}if(Gr(S,N,0,x.sortObjects),_.finish(),x.sortObjects===!0)_.sort(H,ct);if(Zt=Q.enabled===!1||Q.isPresenting===!1||Q.hasDepthSensing()===!1,Zt)dt.addToRenderList(_,S);if(this.info.render.frame++,tt===!0)Nt.beginShadows();let O=p.state.shadowsArray;if(et.render(O,S,N),tt===!0)Nt.endShadows();if(this.info.autoReset===!0)this.info.reset();let{opaque:B,transmissive:L}=_;if(p.setupLights(),N.isArrayCamera){let nt=N.cameras;if(L.length>0)for(let lt=0,gt=nt.length;lt<gt;lt++){let _t=nt[lt];ka(B,L,S,_t)}if(Zt)dt.render(S);for(let lt=0,gt=nt.length;lt<gt;lt++){let _t=nt[lt];Ha(_,S,_t,_t.viewport)}}else{if(L.length>0)ka(B,L,S,N);if(Zt)dt.render(S);Ha(_,S,N)}if(A!==null)Pt.updateMultisampleRenderTarget(A),Pt.updateRenderTargetMipmap(A);if(S.isScene===!0)S.onAfterRender(x,S,N);if(Ht.resetDefaultState(),U=-1,M=null,v.pop(),v.length>0){if(p=v[v.length-1],tt===!0)Nt.setGlobalState(x.clippingPlanes,p.state.camera)}else p=null;if(m.pop(),m.length>0)_=m[m.length-1];else _=null};function Gr(S,N,O,B){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)O=S.renderOrder;else if(S.isLOD){if(S.autoUpdate===!0)S.update(N)}else if(S.isLight){if(p.pushLight(S),S.castShadow)p.pushShadow(S)}else if(S.isSprite){if(!S.frustumCulled||q.intersectsSprite(S)){if(B)re.setFromMatrixPosition(S.matrixWorld).applyMatrix4(st);let lt=J.update(S),gt=S.material;if(gt.visible)_.push(S,lt,gt,O,re.z,null)}}else if(S.isMesh||S.isLine||S.isPoints){if(!S.frustumCulled||q.intersectsObject(S)){let lt=J.update(S),gt=S.material;if(B){if(S.boundingSphere!==void 0){if(S.boundingSphere===null)S.computeBoundingSphere();re.copy(S.boundingSphere.center)}else{if(lt.boundingSphere===null)lt.computeBoundingSphere();re.copy(lt.boundingSphere.center)}re.applyMatrix4(S.matrixWorld).applyMatrix4(st)}if(Array.isArray(gt)){let _t=lt.groups;for(let It=0,Ut=_t.length;It<Ut;It++){let xt=_t[It],Kt=gt[xt.materialIndex];if(Kt&&Kt.visible)_.push(S,lt,Kt,O,re.z,xt)}}else if(gt.visible)_.push(S,lt,gt,O,re.z,null)}}}let nt=S.children;for(let lt=0,gt=nt.length;lt<gt;lt++)Gr(nt[lt],N,O,B)}function Ha(S,N,O,B){let{opaque:L,transmissive:nt,transparent:lt}=S;if(p.setupLightsView(O),tt===!0)Nt.setGlobalState(x.clippingPlanes,O);if(B)mt.viewport(T.copy(B));if(L.length>0)Gs(L,N,O);if(nt.length>0)Gs(nt,N,O);if(lt.length>0)Gs(lt,N,O);mt.buffers.depth.setTest(!0),mt.buffers.depth.setMask(!0),mt.buffers.color.setMask(!0),mt.setPolygonOffset(!1)}function ka(S,N,O,B){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;if(p.state.transmissionRenderTarget[B.id]===void 0)p.state.transmissionRenderTarget[B.id]=new $n(1,1,{generateMipmaps:!0,type:oe.has("EXT_color_buffer_half_float")||oe.has("EXT_color_buffer_float")?1016:1009,minFilter:1008,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xt.workingColorSpace});let nt=p.state.transmissionRenderTarget[B.id],lt=B.viewport||T;nt.setSize(lt.z,lt.w);let gt=x.getRenderTarget();if(x.setRenderTarget(nt),x.getClearColor(k),G=x.getClearAlpha(),G<1)x.setClearColor(16777215,0.5);if(x.clear(),Zt)dt.render(O);let _t=x.toneMapping;x.toneMapping=0;let It=B.viewport;if(B.viewport!==void 0)B.viewport=void 0;if(p.setupLightsView(B),tt===!0)Nt.setGlobalState(x.clippingPlanes,B);if(Gs(S,O,B),Pt.updateMultisampleRenderTarget(nt),Pt.updateRenderTargetMipmap(nt),oe.has("WEBGL_multisampled_render_to_texture")===!1){let Ut=!1;for(let xt=0,Kt=N.length;xt<Kt;xt++){let ce=N[xt],de=ce.object,Oe=ce.geometry,Qt=ce.material,yt=ce.group;if(Qt.side===2&&de.layers.test(B.layers)){let An=Qt.side;Qt.side=1,Qt.needsUpdate=!0,Ga(de,O,B,Oe,Qt,yt),Qt.side=An,Qt.needsUpdate=!0,Ut=!0}}if(Ut===!0)Pt.updateMultisampleRenderTarget(nt),Pt.updateRenderTargetMipmap(nt)}if(x.setRenderTarget(gt),x.setClearColor(k,G),It!==void 0)B.viewport=It;x.toneMapping=_t}function Gs(S,N,O){let B=N.isScene===!0?N.overrideMaterial:null;for(let L=0,nt=S.length;L<nt;L++){let lt=S[L],gt=lt.object,_t=lt.geometry,It=B===null?lt.material:B,Ut=lt.group;if(gt.layers.test(O.layers))Ga(gt,N,O,_t,It,Ut)}}function Ga(S,N,O,B,L,nt){if(S.onBeforeRender(x,N,O,B,L,nt),S.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),L.onBeforeRender(x,N,O,B,S,nt),L.transparent===!0&&L.side===2&&L.forceSinglePass===!1)L.side=1,L.needsUpdate=!0,x.renderBufferDirect(O,N,B,L,S,nt),L.side=0,L.needsUpdate=!0,x.renderBufferDirect(O,N,B,L,S,nt),L.side=2;else x.renderBufferDirect(O,N,B,L,S,nt);S.onAfterRender(x,N,O,B,L,nt)}function Vs(S,N,O){if(N.isScene!==!0)N=qt;let B=Tt.get(S),L=p.state.lights,nt=p.state.shadowsArray,lt=L.state.version,gt=W.getParameters(S,L.state,nt,N,O),_t=W.getProgramCacheKey(gt),It=B.programs;if(B.environment=S.isMeshStandardMaterial?N.environment:null,B.fog=N.fog,B.envMap=(S.isMeshStandardMaterial?y:R).get(S.envMap||B.environment),B.envMapRotation=B.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,It===void 0)S.addEventListener("dispose",at),It=new Map,B.programs=It;let Ut=It.get(_t);if(Ut!==void 0){if(B.currentProgram===Ut&&B.lightsStateVersion===lt)return Wa(S,gt),Ut}else gt.uniforms=W.getUniforms(S),S.onBeforeCompile(gt,x),Ut=W.acquireProgram(gt,_t),It.set(_t,Ut),B.uniforms=gt.uniforms;let xt=B.uniforms;if(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)xt.clippingPlanes=Nt.uniform;if(Wa(S,gt),B.needsLights=Eu(S),B.lightsStateVersion=lt,B.needsLights)xt.ambientLightColor.value=L.state.ambient,xt.lightProbe.value=L.state.probe,xt.directionalLights.value=L.state.directional,xt.directionalLightShadows.value=L.state.directionalShadow,xt.spotLights.value=L.state.spot,xt.spotLightShadows.value=L.state.spotShadow,xt.rectAreaLights.value=L.state.rectArea,xt.ltc_1.value=L.state.rectAreaLTC1,xt.ltc_2.value=L.state.rectAreaLTC2,xt.pointLights.value=L.state.point,xt.pointLightShadows.value=L.state.pointShadow,xt.hemisphereLights.value=L.state.hemi,xt.directionalShadowMap.value=L.state.directionalShadowMap,xt.directionalShadowMatrix.value=L.state.directionalShadowMatrix,xt.spotShadowMap.value=L.state.spotShadowMap,xt.spotLightMatrix.value=L.state.spotLightMatrix,xt.spotLightMap.value=L.state.spotLightMap,xt.pointShadowMap.value=L.state.pointShadowMap,xt.pointShadowMatrix.value=L.state.pointShadowMatrix;return B.currentProgram=Ut,B.uniformsList=null,Ut}function Va(S){if(S.uniformsList===null){let N=S.currentProgram.getUniforms();S.uniformsList=xs.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function Wa(S,N){let O=Tt.get(S);O.outputColorSpace=N.outputColorSpace,O.batching=N.batching,O.batchingColor=N.batchingColor,O.instancing=N.instancing,O.instancingColor=N.instancingColor,O.instancingMorph=N.instancingMorph,O.skinning=N.skinning,O.morphTargets=N.morphTargets,O.morphNormals=N.morphNormals,O.morphColors=N.morphColors,O.morphTargetsCount=N.morphTargetsCount,O.numClippingPlanes=N.numClippingPlanes,O.numIntersection=N.numClipIntersection,O.vertexAlphas=N.vertexAlphas,O.vertexTangents=N.vertexTangents,O.toneMapping=N.toneMapping}function Su(S,N,O,B,L){if(N.isScene!==!0)N=qt;Pt.resetTextureUnits();let nt=N.fog,lt=B.isMeshStandardMaterial?N.environment:null,gt=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:"srgb-linear",_t=(B.isMeshStandardMaterial?y:R).get(B.envMap||lt),It=B.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Ut=!!O.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),xt=!!O.morphAttributes.position,Kt=!!O.morphAttributes.normal,ce=!!O.morphAttributes.color,de=0;if(B.toneMapped){if(A===null||A.isXRRenderTarget===!0)de=x.toneMapping}let Oe=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Qt=Oe!==void 0?Oe.length:0,yt=Tt.get(B),An=p.state.lights;if(tt===!0){if(St===!0||S!==M){let Ye=S===M&&B.id===U;Nt.setState(B,S,Ye)}}let te=!1;if(B.version===yt.__version){if(yt.needsLights&&yt.lightsStateVersion!==An.state.version)te=!0;else if(yt.outputColorSpace!==gt)te=!0;else if(L.isBatchedMesh&&yt.batching===!1)te=!0;else if(!L.isBatchedMesh&&yt.batching===!0)te=!0;else if(L.isBatchedMesh&&yt.batchingColor===!0&&L.colorTexture===null)te=!0;else if(L.isBatchedMesh&&yt.batchingColor===!1&&L.colorTexture!==null)te=!0;else if(L.isInstancedMesh&&yt.instancing===!1)te=!0;else if(!L.isInstancedMesh&&yt.instancing===!0)te=!0;else if(L.isSkinnedMesh&&yt.skinning===!1)te=!0;else if(!L.isSkinnedMesh&&yt.skinning===!0)te=!0;else if(L.isInstancedMesh&&yt.instancingColor===!0&&L.instanceColor===null)te=!0;else if(L.isInstancedMesh&&yt.instancingColor===!1&&L.instanceColor!==null)te=!0;else if(L.isInstancedMesh&&yt.instancingMorph===!0&&L.morphTexture===null)te=!0;else if(L.isInstancedMesh&&yt.instancingMorph===!1&&L.morphTexture!==null)te=!0;else if(yt.envMap!==_t)te=!0;else if(B.fog===!0&&yt.fog!==nt)te=!0;else if(yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==Nt.numPlanes||yt.numIntersection!==Nt.numIntersection))te=!0;else if(yt.vertexAlphas!==It)te=!0;else if(yt.vertexTangents!==Ut)te=!0;else if(yt.morphTargets!==xt)te=!0;else if(yt.morphNormals!==Kt)te=!0;else if(yt.morphColors!==ce)te=!0;else if(yt.toneMapping!==de)te=!0;else if(yt.morphTargetsCount!==Qt)te=!0}else te=!0,yt.__version=B.version;let sn=yt.currentProgram;if(te===!0)sn=Vs(B,N,L);let bi=!1,Ge=!1,ss=!1,fe=sn.getUniforms(),Mn=yt.uniforms;if(mt.useProgram(sn.program))bi=!0,Ge=!0,ss=!0;if(B.id!==U)U=B.id,Ge=!0;if(bi||M!==S){if(mt.buffers.depth.getReversed())Et.copy(S.projectionMatrix),qu(Et),Yu(Et),fe.setValue(D,"projectionMatrix",Et);else fe.setValue(D,"projectionMatrix",S.projectionMatrix);fe.setValue(D,"viewMatrix",S.matrixWorldInverse);let Hn=fe.map.cameraPosition;if(Hn!==void 0)Hn.setValue(D,wt.setFromMatrixPosition(S.matrixWorld));if(ae.logarithmicDepthBuffer)fe.setValue(D,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2));if(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)fe.setValue(D,"isOrthographic",S.isOrthographicCamera===!0);if(M!==S)M=S,Ge=!0,ss=!0}if(L.isSkinnedMesh){fe.setOptional(D,L,"bindMatrix"),fe.setOptional(D,L,"bindMatrixInverse");let Ye=L.skeleton;if(Ye){if(Ye.boneTexture===null)Ye.computeBoneTexture();fe.setValue(D,"boneTexture",Ye.boneTexture,Pt)}}if(L.isBatchedMesh){if(fe.setOptional(D,L,"batchingTexture"),fe.setValue(D,"batchingTexture",L._matricesTexture,Pt),fe.setOptional(D,L,"batchingIdTexture"),fe.setValue(D,"batchingIdTexture",L._indirectTexture,Pt),fe.setOptional(D,L,"batchingColorTexture"),L._colorsTexture!==null)fe.setValue(D,"batchingColorTexture",L._colorsTexture,Pt)}let rs=O.morphAttributes;if(rs.position!==void 0||rs.normal!==void 0||rs.color!==void 0)kt.update(L,O,sn);if(Ge||yt.receiveShadow!==L.receiveShadow)yt.receiveShadow=L.receiveShadow,fe.setValue(D,"receiveShadow",L.receiveShadow);if(B.isMeshGouraudMaterial&&B.envMap!==null)Mn.envMap.value=_t,Mn.flipEnvMap.value=_t.isCubeTexture&&_t.isRenderTargetTexture===!1?-1:1;if(B.isMeshStandardMaterial&&B.envMap===null&&N.environment!==null)Mn.envMapIntensity.value=N.environmentIntensity;if(Ge){if(fe.setValue(D,"toneMappingExposure",x.toneMappingExposure),yt.needsLights)Mu(Mn,ss);if(nt&&B.fog===!0)bt.refreshFogUniforms(Mn,nt);bt.refreshMaterialUniforms(Mn,B,j,V,p.state.transmissionRenderTarget[S.id]),xs.upload(D,Va(yt),Mn,Pt)}if(B.isShaderMaterial&&B.uniformsNeedUpdate===!0)xs.upload(D,Va(yt),Mn,Pt),B.uniformsNeedUpdate=!1;if(B.isSpriteMaterial)fe.setValue(D,"center",L.center);if(fe.setValue(D,"modelViewMatrix",L.modelViewMatrix),fe.setValue(D,"normalMatrix",L.normalMatrix),fe.setValue(D,"modelMatrix",L.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){let Ye=B.uniformsGroups;for(let Hn=0,kn=Ye.length;Hn<kn;Hn++){let Xa=Ye[Hn];pe.update(Xa,sn),pe.bind(Xa,sn)}}return sn}function Mu(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function Eu(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}if(this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(S,N,O){Tt.get(S.texture).__webglTexture=N,Tt.get(S.depthTexture).__webglTexture=O;let B=Tt.get(S);if(B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=O===void 0,!B.__autoAllocateDepthBuffer){if(oe.has("WEBGL_multisampled_render_to_texture")===!0)console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1}},this.setRenderTargetFramebuffer=function(S,N){let O=Tt.get(S);O.__webglFramebuffer=N,O.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(S,N=0,O=0){A=S,I=N,w=O;let B=!0,L=null,nt=!1,lt=!1;if(S){let _t=Tt.get(S);if(_t.__useDefaultFramebuffer!==void 0)mt.bindFramebuffer(D.FRAMEBUFFER,null),B=!1;else if(_t.__webglFramebuffer===void 0)Pt.setupRenderTarget(S);else if(_t.__hasExternalTextures)Pt.rebindTextures(S,Tt.get(S.texture).__webglTexture,Tt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let xt=S.depthTexture;if(_t.__boundDepthTexture!==xt){if(xt!==null&&Tt.has(xt)&&(S.width!==xt.image.width||S.height!==xt.image.height))throw Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Pt.setupDepthRenderbuffer(S)}}let It=S.texture;if(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)lt=!0;let Ut=Tt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget){if(Array.isArray(Ut[N]))L=Ut[N][O];else L=Ut[N];nt=!0}else if(S.samples>0&&Pt.useMultisampledRTT(S)===!1)L=Tt.get(S).__webglMultisampledFramebuffer;else if(Array.isArray(Ut))L=Ut[O];else L=Ut;T.copy(S.viewport),C.copy(S.scissor),z=S.scissorTest}else T.copy(ut).multiplyScalar(j).floor(),C.copy(Ct).multiplyScalar(j).floor(),z=Wt;if(mt.bindFramebuffer(D.FRAMEBUFFER,L)&&B)mt.drawBuffers(S,L);if(mt.viewport(T),mt.scissor(C),mt.setScissorTest(z),nt){let _t=Tt.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+N,_t.__webglTexture,O)}else if(lt){let _t=Tt.get(S.texture),It=N||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,_t.__webglTexture,O||0,It)}U=-1},this.readRenderTargetPixels=function(S,N,O,B,L,nt,lt){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let gt=Tt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&lt!==void 0)gt=gt[lt];if(gt){mt.bindFramebuffer(D.FRAMEBUFFER,gt);try{let _t=S.texture,It=_t.format,Ut=_t.type;if(!ae.textureFormatReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ae.textureTypeReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(N>=0&&N<=S.width-B&&(O>=0&&O<=S.height-L))D.readPixels(N,O,B,L,Dt.convert(It),Dt.convert(Ut),nt)}finally{let _t=A!==null?Tt.get(A).__webglFramebuffer:null;mt.bindFramebuffer(D.FRAMEBUFFER,_t)}}},this.readRenderTargetPixelsAsync=async function(S,N,O,B,L,nt,lt){if(!(S&&S.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let gt=Tt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&lt!==void 0)gt=gt[lt];if(gt){let _t=S.texture,It=_t.format,Ut=_t.type;if(!ae.textureFormatReadable(It))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ae.textureTypeReadable(Ut))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=S.width-B&&(O>=0&&O<=S.height-L)){mt.bindFramebuffer(D.FRAMEBUFFER,gt);let xt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,xt),D.bufferData(D.PIXEL_PACK_BUFFER,nt.byteLength,D.STREAM_READ),D.readPixels(N,O,B,L,Dt.convert(It),Dt.convert(Ut),0);let Kt=A!==null?Tt.get(A).__webglFramebuffer:null;mt.bindFramebuffer(D.FRAMEBUFFER,Kt);let ce=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Xu(D,ce,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,xt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,nt),D.deleteBuffer(xt),D.deleteSync(ce),nt}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,N=null,O=0){if(S.isTexture!==!0)ps("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,S=arguments[1];let B=Math.pow(2,-O),L=Math.floor(S.image.width*B),nt=Math.floor(S.image.height*B),lt=N!==null?N.x:0,gt=N!==null?N.y:0;Pt.setTexture2D(S,0),D.copyTexSubImage2D(D.TEXTURE_2D,O,0,0,lt,gt,L,nt),mt.unbindTexture()},this.copyTextureToTexture=function(S,N,O=null,B=null,L=0){if(S.isTexture!==!0)ps("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,S=arguments[1],N=arguments[2],L=arguments[3]||0,O=null;let nt,lt,gt,_t,It,Ut,xt,Kt,ce,de=S.isCompressedTexture?S.mipmaps[L]:S.image;if(O!==null)nt=O.max.x-O.min.x,lt=O.max.y-O.min.y,gt=O.isBox3?O.max.z-O.min.z:1,_t=O.min.x,It=O.min.y,Ut=O.isBox3?O.min.z:0;else nt=de.width,lt=de.height,gt=de.depth||1,_t=0,It=0,Ut=0;if(B!==null)xt=B.x,Kt=B.y,ce=B.z;else xt=0,Kt=0,ce=0;let Oe=Dt.convert(N.format),Qt=Dt.convert(N.type),yt;if(N.isData3DTexture)Pt.setTexture3D(N,0),yt=D.TEXTURE_3D;else if(N.isDataArrayTexture||N.isCompressedArrayTexture)Pt.setTexture2DArray(N,0),yt=D.TEXTURE_2D_ARRAY;else Pt.setTexture2D(N,0),yt=D.TEXTURE_2D;D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,N.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,N.unpackAlignment);let An=D.getParameter(D.UNPACK_ROW_LENGTH),te=D.getParameter(D.UNPACK_IMAGE_HEIGHT),sn=D.getParameter(D.UNPACK_SKIP_PIXELS),bi=D.getParameter(D.UNPACK_SKIP_ROWS),Ge=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,de.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,de.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,_t),D.pixelStorei(D.UNPACK_SKIP_ROWS,It),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ut);let ss=S.isDataArrayTexture||S.isData3DTexture,fe=N.isDataArrayTexture||N.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){let Mn=Tt.get(S),rs=Tt.get(N),Ye=Tt.get(Mn.__renderTarget),Hn=Tt.get(rs.__renderTarget);mt.bindFramebuffer(D.READ_FRAMEBUFFER,Ye.__webglFramebuffer),mt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Hn.__webglFramebuffer);for(let kn=0;kn<gt;kn++){if(ss)D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Tt.get(S).__webglTexture,L,Ut+kn);if(S.isDepthTexture){if(fe)D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Tt.get(N).__webglTexture,L,ce+kn);D.blitFramebuffer(_t,It,nt,lt,xt,Kt,nt,lt,D.DEPTH_BUFFER_BIT,D.NEAREST)}else if(fe)D.copyTexSubImage3D(yt,L,xt,Kt,ce+kn,_t,It,nt,lt);else D.copyTexSubImage2D(yt,L,xt,Kt,ce+kn,_t,It,nt,lt)}mt.bindFramebuffer(D.READ_FRAMEBUFFER,null),mt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(fe)if(S.isDataTexture||S.isData3DTexture)D.texSubImage3D(yt,L,xt,Kt,ce,nt,lt,gt,Oe,Qt,de.data);else if(N.isCompressedArrayTexture)D.compressedTexSubImage3D(yt,L,xt,Kt,ce,nt,lt,gt,Oe,de.data);else D.texSubImage3D(yt,L,xt,Kt,ce,nt,lt,gt,Oe,Qt,de);else if(S.isDataTexture)D.texSubImage2D(D.TEXTURE_2D,L,xt,Kt,nt,lt,Oe,Qt,de.data);else if(S.isCompressedTexture)D.compressedTexSubImage2D(D.TEXTURE_2D,L,xt,Kt,de.width,de.height,Oe,de.data);else D.texSubImage2D(D.TEXTURE_2D,L,xt,Kt,nt,lt,Oe,Qt,de);if(D.pixelStorei(D.UNPACK_ROW_LENGTH,An),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,te),D.pixelStorei(D.UNPACK_SKIP_PIXELS,sn),D.pixelStorei(D.UNPACK_SKIP_ROWS,bi),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ge),L===0&&N.generateMipmaps)D.generateMipmap(yt);mt.unbindTexture()},this.copyTextureToTexture3D=function(S,N,O=null,B=null,L=0){if(S.isTexture!==!0)ps("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,B=arguments[1]||null,S=arguments[2],N=arguments[3],L=arguments[4]||0;return ps('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,N,O,B,L)},this.initRenderTarget=function(S){if(Tt.get(S).__webglFramebuffer===void 0)Pt.setupRenderTarget(S)},this.initTexture=function(S){if(S.isCubeTexture)Pt.setTextureCube(S,0);else if(S.isData3DTexture)Pt.setTexture3D(S,0);else if(S.isDataArrayTexture||S.isCompressedArrayTexture)Pt.setTexture2DArray(S,0);else Pt.setTexture2D(S,0);mt.unbindTexture()},this.resetState=function(){I=0,w=0,A=null,mt.reset(),Ht.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2000}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=Xt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Xt._getUnpackColorSpace()}}class Rr{constructor(t,e=1,n=1000){this.isFog=!0,this.name="",this.color=new Mt(t),this.near=e,this.far=n}clone(){return new Rr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Vo extends le{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hn,this.environmentIntensity=1,this.environmentRotation=new hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){if(super.copy(t,e),t.background!==null)this.background=t.background.clone();if(t.environment!==null)this.environment=t.environment.clone();if(t.fog!==null)this.fog=t.fog.clone();if(this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null)this.overrideMaterial=t.overrideMaterial.clone();return this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);if(this.fog!==null)e.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)e.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)e.object.backgroundIntensity=this.backgroundIntensity;if(e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1)e.object.environmentIntensity=this.environmentIntensity;return e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Cr{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=Ke()}onUploadCallback(){}set needsUpdate(t){if(t===!0)this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){if(t.arrayBuffers===void 0)t.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=Ke();if(t.arrayBuffers[this.array.buffer._uuid]===void 0)t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){if(t.arrayBuffers===void 0)t.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=Ke();if(t.arrayBuffers[this.array.buffer._uuid]===void 0)t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));return{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}var Ue=new b;class Rs{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];if(this.normalized)n=ln(n,this.array);return n}setComponent(t,e,n){if(this.normalized)n=se(n,this.array);return this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){if(this.normalized)e=se(e,this.array);return this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){if(this.normalized)e=se(e,this.array);return this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){if(this.normalized)e=se(e,this.array);return this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){if(this.normalized)e=se(e,this.array);return this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];if(this.normalized)e=ln(e,this.array);return e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];if(this.normalized)e=ln(e,this.array);return e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];if(this.normalized)e=ln(e,this.array);return e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];if(this.normalized)e=ln(e,this.array);return e}setXY(t,e,n){if(t=t*this.data.stride+this.offset,this.normalized)e=se(e,this.array),n=se(n,this.array);return this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){if(t=t*this.data.stride+this.offset,this.normalized)e=se(e,this.array),n=se(n,this.array),i=se(i,this.array);return this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){if(t=t*this.data.stride+this.offset,this.normalized)e=se(e,this.array),n=se(n,this.array),i=se(i,this.array),s=se(s,this.array);return this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new Ae(new this.array.constructor(e),this.itemSize,this.normalized)}else{if(t.interleavedBuffers===void 0)t.interleavedBuffers={};if(t.interleavedBuffers[this.data.uuid]===void 0)t.interleavedBuffers[this.data.uuid]=this.data.clone(t);return new Rs(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else{if(t.interleavedBuffers===void 0)t.interleavedBuffers={};if(t.interleavedBuffers[this.data.uuid]===void 0)t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}var Ol=new b,Bl=new $t,zl=new $t,Gg=new b,Hl=new At,hr=new b,go=new Je,kl=new At,_o=new Ki;class Wo extends vt{constructor(t,e){super(t,e);this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new At,this.bindMatrixInverse=new At,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;if(this.boundingBox===null)this.boundingBox=new un;this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,hr),this.boundingBox.expandByPoint(hr)}computeBoundingSphere(){let t=this.geometry;if(this.boundingSphere===null)this.boundingSphere=new Je;this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,hr),this.boundingSphere.expandByPoint(hr)}copy(t,e){if(super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null)this.boundingBox=t.boundingBox.clone();if(t.boundingSphere!==null)this.boundingSphere=t.boundingSphere.clone();return this}raycast(t,e){let n=this.material,i=this.matrixWorld;if(n===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(go.copy(this.boundingSphere),go.applyMatrix4(i),t.ray.intersectsSphere(go)===!1)return;if(kl.copy(i).invert(),_o.copy(t.ray).applyMatrix4(kl),this.boundingBox!==null){if(_o.intersectsBox(this.boundingBox)===!1)return}this._computeIntersections(t,e,_o)}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){if(this.skeleton=t,e===void 0)this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld;this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new $t,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);let s=1/t.manhattanLength();if(s!==1/0)t.multiplyScalar(s);else t.set(1,0,0,0);e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){if(super.updateMatrixWorld(t),this.bindMode==="attached")this.bindMatrixInverse.copy(this.matrixWorld).invert();else if(this.bindMode==="detached")this.bindMatrixInverse.copy(this.bindMatrix).invert();else console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,i=this.geometry;Bl.fromBufferAttribute(i.attributes.skinIndex,t),zl.fromBufferAttribute(i.attributes.skinWeight,t),Ol.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let s=0;s<4;s++){let r=zl.getComponent(s);if(r!==0){let o=Bl.getComponent(s);Hl.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),e.addScaledVector(Gg.copy(Ol).applyMatrix4(Hl),r)}}return e.applyMatrix4(this.bindMatrixInverse)}}class Ir extends le{constructor(){super();this.isBone=!0,this.type="Bone"}}class Xo extends Se{constructor(t=null,e=1,n=1,i,s,r,o,a,l=1003,c=1003,h,u){super(null,r,o,a,l,c,i,s,h,u);this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}var Gl=new At,Vg=new At;class Pr{constructor(t=[],e=[]){this.uuid=Ke(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new At)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new At;if(this.bones[t])n.copy(this.bones[t].matrixWorld).invert();this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];if(n)n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];if(n){if(n.parent&&n.parent.isBone)n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld);else n.matrix.copy(n.matrixWorld);n.matrix.decompose(n.position,n.quaternion,n.scale)}}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,r=t.length;s<r;s++){let o=t[s]?t[s].matrixWorld:Vg;Gl.multiplyMatrices(o,e[s]),Gl.toArray(n,s*16)}if(i!==null)i.needsUpdate=!0}clone(){return new Pr(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new Xo(e,t,t,1023,1015);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let i=this.bones[e];if(i.name===t)return i}return}dispose(){if(this.boneTexture!==null)this.boneTexture.dispose(),this.boneTexture=null}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){let s=t.bones[n],r=e[s];if(r===void 0)console.warn("THREE.Skeleton: No bone found with UUID:",s),r=new Ir;this.bones.push(r),this.boneInverses.push(new At().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let i=0,s=e.length;i<s;i++){let r=e[i];t.bones.push(r.uuid);let o=n[i];t.boneInverses.push(o.toArray())}return t}}class Xi extends Ae{constructor(t,e,n,i=1){super(t,e,n);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}var zi=new At,Vl=new At,ur=[],Wl=new un,Wg=new At,hs=new vt,us=new Je;class Cs extends vt{constructor(t,e,n){super(t,e);this.isInstancedMesh=!0,this.instanceMatrix=new Xi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Wg)}computeBoundingBox(){let t=this.geometry,e=this.count;if(this.boundingBox===null)this.boundingBox=new un;if(t.boundingBox===null)t.computeBoundingBox();this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,zi),Wl.copy(t.boundingBox).applyMatrix4(zi),this.boundingBox.union(Wl)}computeBoundingSphere(){let t=this.geometry,e=this.count;if(this.boundingSphere===null)this.boundingSphere=new Je;if(t.boundingSphere===null)t.computeBoundingSphere();this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,zi),us.copy(t.boundingSphere).applyMatrix4(zi),this.boundingSphere.union(us)}copy(t,e){if(super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null)this.morphTexture=t.morphTexture.clone();if(t.instanceColor!==null)this.instanceColor=t.instanceColor.clone();if(this.count=t.count,t.boundingBox!==null)this.boundingBox=t.boundingBox.clone();if(t.boundingSphere!==null)this.boundingSphere=t.boundingSphere.clone();return this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,r=t*s+1;for(let o=0;o<n.length;o++)n[o]=i[r+o]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(hs.geometry=this.geometry,hs.material=this.material,hs.material===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(us.copy(this.boundingSphere),us.applyMatrix4(n),t.ray.intersectsSphere(us)===!1)return;for(let s=0;s<i;s++){this.getMatrixAt(s,zi),Vl.multiplyMatrices(n,zi),hs.matrixWorld=Vl,hs.raycast(t,ur);for(let r=0,o=ur.length;r<o;r++){let a=ur[r];a.instanceId=s,a.object=this,e.push(a)}ur.length=0}}setColorAt(t,e){if(this.instanceColor===null)this.instanceColor=new Xi(new Float32Array(this.instanceMatrix.count*3).fill(1),3);e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;if(this.morphTexture===null)this.morphTexture=new Xo(new Float32Array(i*this.count),i,this.count,1028,1015);let s=this.morphTexture.source.data.data,r=0;for(let l=0;l<n.length;l++)r+=n[l];let o=this.geometry.morphTargetsRelative?1:1-r,a=i*t;s[a]=o,s.set(n,a+1)}updateMorphTargets(){}dispose(){if(this.dispatchEvent({type:"dispose"}),this.morphTexture!==null)this.morphTexture.dispose(),this.morphTexture=null;return this}}class dn extends Xe{static get type(){return"LineBasicMaterial"}constructor(t){super();this.isLineBasicMaterial=!0,this.color=new Mt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}var Sr=new b,Mr=new b,Xl=new At,ds=new Ki,dr=new Je,xo=new b,ql=new b;class bn extends le{constructor(t=new he,e=new dn){super();this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)Sr.fromBufferAttribute(e,i-1),Mr.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Sr.distanceTo(Mr);t.setAttribute("lineDistance",new Jt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null)n.computeBoundingSphere();if(dr.copy(n.boundingSphere),dr.applyMatrix4(i),dr.radius+=s,t.ray.intersectsSphere(dr)===!1)return;Xl.copy(i).invert(),ds.copy(t.ray).applyMatrix4(Xl);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),a=o*o,l=this.isLineSegments?2:1,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let g=d,_=f-1;g<_;g+=l){let p=c.getX(g),m=c.getX(g+1),v=fr(this,t,ds,a,p,m);if(v)e.push(v)}if(this.isLineLoop){let g=c.getX(f-1),_=c.getX(d),p=fr(this,t,ds,a,g,_);if(p)e.push(p)}}else{let d=Math.max(0,r.start),f=Math.min(u.count,r.start+r.count);for(let g=d,_=f-1;g<_;g+=l){let p=fr(this,t,ds,a,g,g+1);if(p)e.push(p)}if(this.isLineLoop){let g=fr(this,t,ds,a,f-1,d);if(g)e.push(g)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function fr(t,e,n,i,s,r){let o=t.geometry.attributes.position;if(Sr.fromBufferAttribute(o,s),Mr.fromBufferAttribute(o,r),n.distanceSqToSegment(Sr,Mr,xo,ql)>i)return;xo.applyMatrix4(t.matrixWorld);let l=e.ray.origin.distanceTo(xo);if(l<e.near||l>e.far)return;return{distance:l,point:ql.clone().applyMatrix4(t.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:t}}var Yl=new b,Zl=new b;class Is extends bn{constructor(t,e){super(t,e);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)Yl.fromBufferAttribute(e,i),Zl.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Yl.distanceTo(Zl);t.setAttribute("lineDistance",new Jt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ps extends bn{constructor(t,e){super(t,e);this.isLineLoop=!0,this.type="LineLoop"}}class Lr extends Xe{static get type(){return"PointsMaterial"}constructor(t){super();this.isPointsMaterial=!0,this.color=new Mt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}var Kl=new At,wo=new Ki,pr=new Je,mr=new b;class qo extends le{constructor(t=new he,e=new Lr){super();this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null)n.computeBoundingSphere();if(pr.copy(n.boundingSphere),pr.applyMatrix4(i),pr.radius+=s,t.ray.intersectsSphere(pr)===!1)return;Kl.copy(i).invert(),wo.copy(t.ray).applyMatrix4(Kl);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),a=o*o,l=n.index,h=n.attributes.position;if(l!==null){let u=Math.max(0,r.start),d=Math.min(l.count,r.start+r.count);for(let f=u,g=d;f<g;f++){let _=l.getX(f);mr.fromBufferAttribute(h,_),$l(mr,_,a,i,t,e,this)}}else{let u=Math.max(0,r.start),d=Math.min(h.count,r.start+r.count);for(let f=u,g=d;f<g;f++)mr.fromBufferAttribute(h,f),$l(mr,f,a,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function $l(t,e,n,i,s,r,o){let a=wo.distanceSqToPoint(t);if(a<n){let l=new b;wo.closestPointToPoint(t,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class fn extends Se{constructor(t,e,n,i,s,r,o,a,l){super(t,e,n,i,s,r,o,a,l);this.isCanvasTexture=!0,this.needsUpdate=!0}}class pn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),s=0;e.push(0);for(let r=1;r<=t;r++)n=this.getPoint(r/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),i=0,s=n.length,r;if(e)r=e;else r=t*n[s-1];let o=0,a=s-1,l;while(o<=a)if(i=Math.floor(o+(a-o)/2),l=n[i]-r,l<0)o=i+1;else if(l>0)a=i-1;else{a=i;break}if(i=a,n[i]===r)return i/(s-1);let c=n[i],u=n[i+1]-c,d=(r-c)/u;return(i+d)/(s-1)}getTangent(t,e){let i=t-0.0001,s=t+0.0001;if(i<0)i=0;if(s>1)s=1;let r=this.getPoint(i),o=this.getPoint(s),a=e||(r.isVector2?new ot:new b);return a.copy(o).sub(r).normalize(),a}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new b,i=[],s=[],r=[],o=new b,a=new At;for(let d=0;d<=t;d++){let f=d/t;i[d]=this.getTangentAt(f,new b)}s[0]=new b,r[0]=new b;let l=Number.MAX_VALUE,c=Math.abs(i[0].x),h=Math.abs(i[0].y),u=Math.abs(i[0].z);if(c<=l)l=c,n.set(1,0,0);if(h<=l)l=h,n.set(0,1,0);if(u<=l)n.set(0,0,1);o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),r[0].crossVectors(i[0],s[0]);for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),r[d]=r[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();let f=Math.acos(Me(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(a.makeRotationAxis(o,f))}r[d].crossVectors(i[d],s[d])}if(e===!0){let d=Math.acos(Me(s[0].dot(s[t]),-1,1));if(d/=t,i[0].dot(o.crossVectors(s[0],s[t]))>0)d=-d;for(let f=1;f<=t;f++)s[f].applyMatrix4(a.makeRotationAxis(i[f],d*f)),r[f].crossVectors(i[f],s[f])}return{tangents:i,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Nr extends pn{constructor(t=0,e=0,n=1,i=1,s=0,r=Math.PI*2,o=!1,a=0){super();this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=o,this.aRotation=a}getPoint(t,e=new ot){let n=e,i=Math.PI*2,s=this.aEndAngle-this.aStartAngle,r=Math.abs(s)<Number.EPSILON;while(s<0)s+=i;while(s>i)s-=i;if(s<Number.EPSILON)if(r)s=0;else s=i;if(this.aClockwise===!0&&!r)if(s===i)s=-i;else s=s-i;let o=this.aStartAngle+t*s,a=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let c=Math.cos(this.aRotation),h=Math.sin(this.aRotation),u=a-this.aX,d=l-this.aY;a=u*c-d*h+this.aX,l=u*h+d*c+this.aY}return n.set(a,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class kc extends Nr{constructor(t,e,n,i,s,r){super(t,e,n,n,i,s,r);this.isArcCurve=!0,this.type="ArcCurve"}}function Yo(){let t=0,e=0,n=0,i=0;function s(r,o,a,l){t=r,e=a,n=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return t+e*r+n*o+i*a}}}var gr=new b,yo=new Yo,vo=new Yo,So=new Yo;class Gc extends pn{constructor(t=[],e=!1,n="centripetal",i=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new b){let n=e,i=this.points,s=i.length,r=(s-(this.closed?0:1))*t,o=Math.floor(r),a=r-o;if(this.closed)o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s;else if(a===0&&o===s-1)o=s-2,a=1;let l,c;if(this.closed||o>0)l=i[(o-1)%s];else gr.subVectors(i[0],i[1]).add(i[0]),l=gr;let h=i[o%s],u=i[(o+1)%s];if(this.closed||o+2<s)c=i[(o+2)%s];else gr.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=gr;if(this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?0.5:0.25,f=Math.pow(l.distanceToSquared(h),d),g=Math.pow(h.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(c),d);if(g<0.0001)g=1;if(f<0.0001)f=g;if(_<0.0001)_=g;yo.initNonuniformCatmullRom(l.x,h.x,u.x,c.x,f,g,_),vo.initNonuniformCatmullRom(l.y,h.y,u.y,c.y,f,g,_),So.initNonuniformCatmullRom(l.z,h.z,u.z,c.z,f,g,_)}else if(this.curveType==="catmullrom")yo.initCatmullRom(l.x,h.x,u.x,c.x,this.tension),vo.initCatmullRom(l.y,h.y,u.y,c.y,this.tension),So.initCatmullRom(l.z,h.z,u.z,c.z,this.tension);return n.set(yo.calc(a),vo.calc(a),So.calc(a)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new b().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Jl(t,e,n,i,s){let r=(i-e)*0.5,o=(s-n)*0.5,a=t*t,l=t*a;return(2*n-2*i+r+o)*l+(-3*n+3*i-2*r-o)*a+r*t+n}function Xg(t,e){let n=1-t;return n*n*e}function qg(t,e){return 2*(1-t)*t*e}function Yg(t,e){return t*t*e}function ys(t,e,n,i){return Xg(t,e)+qg(t,n)+Yg(t,i)}function Zg(t,e){let n=1-t;return n*n*n*e}function Kg(t,e){let n=1-t;return 3*n*n*t*e}function $g(t,e){return 3*(1-t)*t*t*e}function Jg(t,e){return t*t*t*e}function vs(t,e,n,i,s){return Zg(t,e)+Kg(t,n)+$g(t,i)+Jg(t,s)}class Zo extends pn{constructor(t=new ot,e=new ot,n=new ot,i=new ot){super();this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ot){let n=e,i=this.v0,s=this.v1,r=this.v2,o=this.v3;return n.set(vs(t,i.x,s.x,r.x,o.x),vs(t,i.y,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Vc extends pn{constructor(t=new b,e=new b,n=new b,i=new b){super();this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new b){let n=e,i=this.v0,s=this.v1,r=this.v2,o=this.v3;return n.set(vs(t,i.x,s.x,r.x,o.x),vs(t,i.y,s.y,r.y,o.y),vs(t,i.z,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ko extends pn{constructor(t=new ot,e=new ot){super();this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){let n=e;if(t===1)n.copy(this.v2);else n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1);return n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Wc extends pn{constructor(t=new b,e=new b){super();this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new b){let n=e;if(t===1)n.copy(this.v2);else n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1);return n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new b){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $o extends pn{constructor(t=new ot,e=new ot,n=new ot){super();this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ot){let n=e,i=this.v0,s=this.v1,r=this.v2;return n.set(ys(t,i.x,s.x,r.x),ys(t,i.y,s.y,r.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Xc extends pn{constructor(t=new b,e=new b,n=new b){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new b){let n=e,i=this.v0,s=this.v1,r=this.v2;return n.set(ys(t,i.x,s.x,r.x),ys(t,i.y,s.y,r.y),ys(t,i.z,s.z,r.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jo extends pn{constructor(t=[]){super();this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){let n=e,i=this.points,s=(i.length-1)*t,r=Math.floor(s),o=s-r,a=i[r===0?r:r-1],l=i[r],c=i[r>i.length-2?i.length-1:r+1],h=i[r>i.length-3?i.length-1:r+2];return n.set(Jl(o,a.x,l.x,c.x,h.x),Jl(o,a.y,l.y,c.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new ot().fromArray(i))}return this}}var jl=Object.freeze({__proto__:null,ArcCurve:kc,CatmullRomCurve3:Gc,CubicBezierCurve:Zo,CubicBezierCurve3:Vc,EllipseCurve:Nr,LineCurve:Ko,LineCurve3:Wc,QuadraticBezierCurve:$o,QuadraticBezierCurve3:Xc,SplineCurve:Jo});class qc extends pn{constructor(){super();this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new jl[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),s=0;while(s<i.length){if(i[s]>=n){let r=i[s]-n,o=this.curves[s],a=o.getLength(),l=a===0?0:1-r/a;return o.getPointAt(l,e)}s++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));if(this.autoClose)e.push(e[0]);return e}getPoints(t=12){let e=[],n;for(let i=0,s=this.curves;i<s.length;i++){let r=s[i],o=r.isEllipseCurve?t*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?t*r.points.length:t,a=r.getPoints(o);for(let l=0;l<a.length;l++){let c=a[l];if(n&&n.equals(c))continue;e.push(c),n=c}}if(this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0]))e.push(e[0]);return e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new jl[i.type]().fromJSON(i))}return this}}class Er extends qc{constructor(t){super();if(this.type="Path",this.currentPoint=new ot,t)this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Ko(this.currentPoint.clone(),new ot(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let s=new $o(this.currentPoint.clone(),new ot(t,e),new ot(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,r){let o=new Zo(this.currentPoint.clone(),new ot(t,e),new ot(n,i),new ot(s,r));return this.curves.push(o),this.currentPoint.set(s,r),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Jo(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,r){let o=this.currentPoint.x,a=this.currentPoint.y;return this.absarc(t+o,e+a,n,i,s,r),this}absarc(t,e,n,i,s,r){return this.absellipse(t,e,n,n,i,s,r),this}ellipse(t,e,n,i,s,r,o,a){let l=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(t+l,e+c,n,i,s,r,o,a),this}absellipse(t,e,n,i,s,r,o,a){let l=new Nr(t,e,n,i,s,r,o,a);if(this.curves.length>0){let h=l.getPoint(0);if(!h.equals(this.currentPoint))this.lineTo(h.x,h.y)}this.curves.push(l);let c=l.getPoint(1);return this.currentPoint.copy(c),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class jo extends he{constructor(t=[new ot(0,-0.5),new ot(0.5,0),new ot(0,0.5)],e=12,n=0,i=Math.PI*2){super();this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Me(i,0,Math.PI*2);let s=[],r=[],o=[],a=[],l=[],c=1/e,h=new b,u=new ot,d=new b,f=new b,g=new b,_=0,p=0;for(let m=0;m<=t.length-1;m++)switch(m){case 0:_=t[m+1].x-t[m].x,p=t[m+1].y-t[m].y,d.x=p*1,d.y=-_,d.z=p*0,g.copy(d),d.normalize(),a.push(d.x,d.y,d.z);break;case t.length-1:a.push(g.x,g.y,g.z);break;default:_=t[m+1].x-t[m].x,p=t[m+1].y-t[m].y,d.x=p*1,d.y=-_,d.z=p*0,f.copy(d),d.x+=g.x,d.y+=g.y,d.z+=g.z,d.normalize(),a.push(d.x,d.y,d.z),g.copy(f)}for(let m=0;m<=e;m++){let v=n+m*c*i,x=Math.sin(v),E=Math.cos(v);for(let I=0;I<=t.length-1;I++){h.x=t[I].x*x,h.y=t[I].y,h.z=t[I].x*E,r.push(h.x,h.y,h.z),u.x=m/e,u.y=I/(t.length-1),o.push(u.x,u.y);let w=a[3*I+0]*x,A=a[3*I+1],U=a[3*I+0]*E;l.push(w,A,U)}}for(let m=0;m<e;m++)for(let v=0;v<t.length-1;v++){let x=v+m*t.length,E=x,I=x+t.length,w=x+t.length+1,A=x+1;s.push(E,I,A),s.push(w,A,I)}this.setIndex(s),this.setAttribute("position",new Jt(r,3)),this.setAttribute("uv",new Jt(o,2)),this.setAttribute("normal",new Jt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jo(t.points,t.segments,t.phiStart,t.phiLength)}}class mi extends jo{constructor(t=1,e=1,n=4,i=8){let s=new Er;s.absarc(0,-e/2,t,Math.PI*1.5,0),s.absarc(0,e/2,t,0,Math.PI*0.5);super(s.getPoints(n),i);this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new mi(t.radius,t.length,t.capSegments,t.radialSegments)}}class Ji extends he{constructor(t=1,e=32,n=0,i=Math.PI*2){super();this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);let s=[],r=[],o=[],a=[],l=new b,c=new ot;r.push(0,0,0),o.push(0,0,1),a.push(0.5,0.5);for(let h=0,u=3;h<=e;h++,u+=3){let d=n+h/e*i;l.x=t*Math.cos(d),l.y=t*Math.sin(d),r.push(l.x,l.y,l.z),o.push(0,0,1),c.x=(r[u]/t+1)/2,c.y=(r[u+1]/t+1)/2,a.push(c.x,c.y)}for(let h=1;h<=e;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new Jt(r,3)),this.setAttribute("normal",new Jt(o,3)),this.setAttribute("uv",new Jt(a,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ji(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Qn extends he{constructor(t=1,e=1,n=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a};let l=this;i=Math.floor(i),s=Math.floor(s);let c=[],h=[],u=[],d=[],f=0,g=[],_=n/2,p=0;if(m(),r===!1){if(t>0)v(!0);if(e>0)v(!1)}this.setIndex(c),this.setAttribute("position",new Jt(h,3)),this.setAttribute("normal",new Jt(u,3)),this.setAttribute("uv",new Jt(d,2));function m(){let x=new b,E=new b,I=0,w=(e-t)/n;for(let A=0;A<=s;A++){let U=[],M=A/s,T=M*(e-t)+t;for(let C=0;C<=i;C++){let z=C/i,k=z*a+o,G=Math.sin(k),K=Math.cos(k);E.x=T*G,E.y=-M*n+_,E.z=T*K,h.push(E.x,E.y,E.z),x.set(G,w,K).normalize(),u.push(x.x,x.y,x.z),d.push(z,1-M),U.push(f++)}g.push(U)}for(let A=0;A<i;A++)for(let U=0;U<s;U++){let M=g[U][A],T=g[U+1][A],C=g[U+1][A+1],z=g[U][A+1];if(t>0||U!==0)c.push(M,T,z),I+=3;if(e>0||U!==s-1)c.push(T,C,z),I+=3}l.addGroup(p,I,0),p+=I}function v(x){let E=f,I=new ot,w=new b,A=0,U=x===!0?t:e,M=x===!0?1:-1;for(let C=1;C<=i;C++)h.push(0,_*M,0),u.push(0,M,0),d.push(0.5,0.5),f++;let T=f;for(let C=0;C<=i;C++){let k=C/i*a+o,G=Math.cos(k),K=Math.sin(k);w.x=U*K,w.y=_*M,w.z=U*G,h.push(w.x,w.y,w.z),u.push(0,M,0),I.x=G*0.5+0.5,I.y=K*0.5*M+0.5,d.push(I.x,I.y),f++}for(let C=0;C<i;C++){let z=E+C,k=T+C;if(x===!0)c.push(k,k+1,z);else c.push(k+1,k,z);A+=3}l.addGroup(p,A,x===!0?1:2),p+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ls extends Er{constructor(t){super(t);this.uuid=Ke(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(new Er().fromJSON(i))}return this}}var jg={triangulate:function(t,e,n=2){let i=e&&e.length,s=i?e[0]*n:t.length,r=Yc(t,0,s,n,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,d,f;if(i)r=i0(t,e,r,n);if(t.length>80*n){a=c=t[0],l=h=t[1];for(let g=n;g<s;g+=n){if(u=t[g],d=t[g+1],u<a)a=u;if(d<l)l=d;if(u>c)c=u;if(d>h)h=d}f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return Es(r,o,n,a,l,f,0),o}};function Yc(t,e,n,i,s){let r,o;if(s===p0(t,e,n,i)>0)for(r=e;r<n;r+=i)o=Ql(r,t[r],t[r+1],o);else for(r=n-i;r>=e;r-=i)o=Ql(r,t[r],t[r+1],o);if(o&&Dr(o,o.next))bs(o),o=o.next;return o}function fi(t,e){if(!t)return t;if(!e)e=t;let n=t,i;do if(i=!1,!n.steiner&&(Dr(n,n.next)||me(n.prev,n,n.next)===0)){if(bs(n),n=e=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==e);return e}function Es(t,e,n,i,s,r,o){if(!t)return;if(!o&&r)l0(t,i,s,r);let a=t,l,c;while(t.prev!==t.next){if(l=t.prev,c=t.next,r?t0(t,i,s,r):Qg(t)){e.push(l.i/n|0),e.push(t.i/n|0),e.push(c.i/n|0),bs(t),t=c.next,a=c.next;continue}if(t=c,t===a){if(!o)Es(fi(t),e,n,i,s,r,1);else if(o===1)t=e0(fi(t),e,n),Es(t,e,n,i,s,r,2);else if(o===2)n0(t,e,n,i,s,r);break}}}function Qg(t){let e=t.prev,n=t,i=t.next;if(me(e,n,i)>=0)return!1;let s=e.x,r=n.x,o=i.x,a=e.y,l=n.y,c=i.y,h=s<r?s<o?s:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,d=s>r?s>o?s:o:r>o?r:o,f=a>l?a>c?a:c:l>c?l:c,g=i.next;while(g!==e){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&ki(s,a,r,l,o,c,g.x,g.y)&&me(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function t0(t,e,n,i){let s=t.prev,r=t,o=t.next;if(me(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,d=o.y,f=a<l?a<c?a:c:l<c?l:c,g=h<u?h<d?h:d:u<d?u:d,_=a>l?a>c?a:c:l>c?l:c,p=h>u?h>d?h:d:u>d?u:d,m=Ao(f,g,e,n,i),v=Ao(_,p,e,n,i),x=t.prevZ,E=t.nextZ;while(x&&x.z>=m&&E&&E.z<=v){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=p&&x!==s&&x!==o&&ki(a,h,l,u,c,d,x.x,x.y)&&me(x.prev,x,x.next)>=0)return!1;if(x=x.prevZ,E.x>=f&&E.x<=_&&E.y>=g&&E.y<=p&&E!==s&&E!==o&&ki(a,h,l,u,c,d,E.x,E.y)&&me(E.prev,E,E.next)>=0)return!1;E=E.nextZ}while(x&&x.z>=m){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=p&&x!==s&&x!==o&&ki(a,h,l,u,c,d,x.x,x.y)&&me(x.prev,x,x.next)>=0)return!1;x=x.prevZ}while(E&&E.z<=v){if(E.x>=f&&E.x<=_&&E.y>=g&&E.y<=p&&E!==s&&E!==o&&ki(a,h,l,u,c,d,E.x,E.y)&&me(E.prev,E,E.next)>=0)return!1;E=E.nextZ}return!0}function e0(t,e,n){let i=t;do{let s=i.prev,r=i.next.next;if(!Dr(s,r)&&Zc(s,i,i.next,r)&&Ts(s,r)&&Ts(r,s))e.push(s.i/n|0),e.push(i.i/n|0),e.push(r.i/n|0),bs(i),bs(i.next),i=t=r;i=i.next}while(i!==t);return fi(i)}function n0(t,e,n,i,s,r){let o=t;do{let a=o.next.next;while(a!==o.prev){if(o.i!==a.i&&u0(o,a)){let l=Kc(o,a);o=fi(o,o.next),l=fi(l,l.next),Es(o,e,n,i,s,r,0),Es(l,e,n,i,s,r,0);return}a=a.next}o=o.next}while(o!==t)}function i0(t,e,n,i){let s=[],r,o,a,l,c;for(r=0,o=e.length;r<o;r++){if(a=e[r]*i,l=r<o-1?e[r+1]*i:t.length,c=Yc(t,a,l,i,!1),c===c.next)c.steiner=!0;s.push(h0(c))}s.sort(s0);for(r=0;r<s.length;r++)n=r0(s[r],n);return n}function s0(t,e){return t.x-e.x}function r0(t,e){let n=o0(t,e);if(!n)return e;let i=Kc(n,t);return fi(i,i.next),fi(n,n.next)}function o0(t,e){let n=e,i=-1/0,s,r=t.x,o=t.y;do{if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){let d=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(d<=r&&d>i){if(i=d,s=n.x<n.next.x?n:n.next,d===r)return s}}n=n.next}while(n!==e);if(!s)return null;let a=s,l=s.x,c=s.y,h=1/0,u;n=s;do{if(r>=n.x&&n.x>=l&&r!==n.x&&ki(o<c?r:i,o,l,c,o<c?i:r,o,n.x,n.y)){if(u=Math.abs(o-n.y)/(r-n.x),Ts(n,t)&&(u<h||u===h&&(n.x>s.x||n.x===s.x&&a0(s,n))))s=n,h=u}n=n.next}while(n!==a);return s}function a0(t,e){return me(t.prev,t,e.prev)<0&&me(e.next,t,t.next)<0}function l0(t,e,n,i){let s=t;do{if(s.z===0)s.z=Ao(s.x,s.y,e,n,i);s.prevZ=s.prev,s.nextZ=s.next,s=s.next}while(s!==t);s.prevZ.nextZ=null,s.prevZ=null,c0(s)}function c0(t){let e,n,i,s,r,o,a,l,c=1;do{n=t,t=null,r=null,o=0;while(n){o++,i=n,a=0;for(e=0;e<c;e++)if(a++,i=i.nextZ,!i)break;l=c;while(a>0||l>0&&i){if(a!==0&&(l===0||!i||n.z<=i.z))s=n,n=n.nextZ,a--;else s=i,i=i.nextZ,l--;if(r)r.nextZ=s;else t=s;s.prevZ=r,r=s}n=i}r.nextZ=null,c*=2}while(o>1);return t}function Ao(t,e,n,i,s){return t=(t-n)*s|0,e=(e-i)*s|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t|e<<1}function h0(t){let e=t,n=t;do{if(e.x<n.x||e.x===n.x&&e.y<n.y)n=e;e=e.next}while(e!==t);return n}function ki(t,e,n,i,s,r,o,a){return(s-o)*(e-a)>=(t-o)*(r-a)&&(t-o)*(i-a)>=(n-o)*(e-a)&&(n-o)*(r-a)>=(s-o)*(i-a)}function u0(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!d0(t,e)&&(Ts(t,e)&&Ts(e,t)&&f0(t,e)&&(me(t.prev,t,e.prev)||me(t,e.prev,e))||Dr(t,e)&&me(t.prev,t,t.next)>0&&me(e.prev,e,e.next)>0)}function me(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function Dr(t,e){return t.x===e.x&&t.y===e.y}function Zc(t,e,n,i){let s=xr(me(t,e,n)),r=xr(me(t,e,i)),o=xr(me(n,i,t)),a=xr(me(n,i,e));if(s!==r&&o!==a)return!0;if(s===0&&_r(t,n,e))return!0;if(r===0&&_r(t,i,e))return!0;if(o===0&&_r(n,t,i))return!0;if(a===0&&_r(n,e,i))return!0;return!1}function _r(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function xr(t){return t>0?1:t<0?-1:0}function d0(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&Zc(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}function Ts(t,e){return me(t.prev,t,t.next)<0?me(t,e,t.next)>=0&&me(t,t.prev,e)>=0:me(t,e,t.prev)<0||me(t,t.next,e)<0}function f0(t,e){let n=t,i=!1,s=(t.x+e.x)/2,r=(t.y+e.y)/2;do{if(n.y>r!==n.next.y>r&&n.next.y!==n.y&&s<(n.next.x-n.x)*(r-n.y)/(n.next.y-n.y)+n.x)i=!i;n=n.next}while(n!==t);return i}function Kc(t,e){let n=new Ro(t.i,t.x,t.y),i=new Ro(e.i,e.x,e.y),s=t.next,r=e.prev;return t.next=e,e.prev=t,n.next=s,s.prev=n,i.next=n,n.prev=i,r.next=i,i.prev=r,i}function Ql(t,e,n,i){let s=new Ro(t,e,n);if(!i)s.prev=s,s.next=s;else s.next=i.next,s.prev=i,i.next.prev=s,i.next=s;return s}function bs(t){if(t.next.prev=t.prev,t.prev.next=t.next,t.prevZ)t.prevZ.nextZ=t.nextZ;if(t.nextZ)t.nextZ.prevZ=t.prevZ}function Ro(t,e,n){this.i=t,this.x=e,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function p0(t,e,n,i){let s=0;for(let r=e,o=n-i;r<n;r+=i)s+=(t[o]-t[r])*(t[r+1]+t[o+1]),o=r;return s}class Ss{static area(t){let e=t.length,n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*0.5}static isClockWise(t){return Ss.area(t)<0}static triangulateShape(t,e){let n=[],i=[],s=[];tc(t),ec(n,t);let r=t.length;e.forEach(tc);for(let a=0;a<e.length;a++)i.push(r),r+=e[a].length,ec(n,e[a]);let o=jg.triangulate(n,i);for(let a=0;a<o.length;a+=3)s.push(o.slice(a,a+3));return s}}function tc(t){let e=t.length;if(e>2&&t[e-1].equals(t[0]))t.pop()}function ec(t,e){for(let n=0;n<e.length;n++)t.push(e[n].x),t.push(e[n].y)}class Ur extends he{constructor(t=0.5,e=1,n=32,i=1,s=0,r=Math.PI*2){super();this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:r},n=Math.max(3,n),i=Math.max(1,i);let o=[],a=[],l=[],c=[],h=t,u=(e-t)/i,d=new b,f=new ot;for(let g=0;g<=i;g++){for(let _=0;_<=n;_++){let p=s+_/n*r;d.x=h*Math.cos(p),d.y=h*Math.sin(p),a.push(d.x,d.y,d.z),l.push(0,0,1),f.x=(d.x/e+1)/2,f.y=(d.y/e+1)/2,c.push(f.x,f.y)}h+=u}for(let g=0;g<i;g++){let _=g*(n+1);for(let p=0;p<n;p++){let m=p+_,v=m,x=m+n+1,E=m+n+2,I=m+1;o.push(v,x,I),o.push(x,E,I)}}this.setIndex(o),this.setAttribute("position",new Jt(a,3)),this.setAttribute("normal",new Jt(l,3)),this.setAttribute("uv",new Jt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ur(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Ns extends he{constructor(t=new Ls([new ot(0,0.5),new ot(-0.5,-0.5),new ot(0.5,-0.5)]),e=12){super();this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],i=[],s=[],r=[],o=0,a=0;if(Array.isArray(t)===!1)l(t);else for(let c=0;c<t.length;c++)l(t[c]),this.addGroup(o,a,c),o+=a,a=0;this.setIndex(n),this.setAttribute("position",new Jt(i,3)),this.setAttribute("normal",new Jt(s,3)),this.setAttribute("uv",new Jt(r,2));function l(c){let h=i.length/3,u=c.extractPoints(e),d=u.shape,f=u.holes;if(Ss.isClockWise(d)===!1)d=d.reverse();for(let _=0,p=f.length;_<p;_++){let m=f[_];if(Ss.isClockWise(m)===!0)f[_]=m.reverse()}let g=Ss.triangulateShape(d,f);for(let _=0,p=f.length;_<p;_++){let m=f[_];d=d.concat(m)}for(let _=0,p=d.length;_<p;_++){let m=d[_];i.push(m.x,m.y,0),s.push(0,0,1),r.push(m.x,m.y)}for(let _=0,p=g.length;_<p;_++){let m=g[_],v=m[0]+h,x=m[1]+h,E=m[2]+h;n.push(v,x,E),a+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return m0(e,t)}static fromJSON(t,e){let n=[];for(let i=0,s=t.shapes.length;i<s;i++){let r=e[t.shapes[i]];n.push(r)}return new Ns(n,t.curveSegments)}}function m0(t,e){if(e.shapes=[],Array.isArray(t))for(let n=0,i=t.length;n<i;n++){let s=t[n];e.shapes.push(s.uuid)}else e.shapes.push(t.uuid);return e}class mn extends he{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,r=0,o=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:r,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let a=Math.min(r+o,Math.PI),l=0,c=[],h=new b,u=new b,d=[],f=[],g=[],_=[];for(let p=0;p<=n;p++){let m=[],v=p/n,x=0;if(p===0&&r===0)x=0.5/e;else if(p===n&&a===Math.PI)x=-0.5/e;for(let E=0;E<=e;E++){let I=E/e;h.x=-t*Math.cos(i+I*s)*Math.sin(r+v*o),h.y=t*Math.cos(r+v*o),h.z=t*Math.sin(i+I*s)*Math.sin(r+v*o),f.push(h.x,h.y,h.z),u.copy(h).normalize(),g.push(u.x,u.y,u.z),_.push(I+x,1-v),m.push(l++)}c.push(m)}for(let p=0;p<n;p++)for(let m=0;m<e;m++){let v=c[p][m+1],x=c[p][m],E=c[p+1][m],I=c[p+1][m+1];if(p!==0||r>0)d.push(v,x,I);if(p!==n-1||a<Math.PI)d.push(x,E,I)}this.setIndex(d),this.setAttribute("position",new Jt(f,3)),this.setAttribute("normal",new Jt(g,3)),this.setAttribute("uv",new Jt(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new mn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ds extends Xe{static get type(){return"MeshStandardMaterial"}constructor(t){super();this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Mt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class je extends Ds{static get type(){return"MeshPhysicalMaterial"}constructor(t){super();this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ot(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Me(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+0.4*e)/(1-0.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Mt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Mt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Mt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){if(this._anisotropy>0!==t>0)this.version++;this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){if(this._clearcoat>0!==t>0)this.version++;this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){if(this._iridescence>0!==t>0)this.version++;this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){if(this._dispersion>0!==t>0)this.version++;this._dispersion=t}get sheen(){return this._sheen}set sheen(t){if(this._sheen>0!==t>0)this.version++;this._sheen=t}get transmission(){return this._transmission}set transmission(t){if(this._transmission>0!==t>0)this.version++;this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class qe extends Xe{static get type(){return"MeshLambertMaterial"}constructor(t){super();this.isMeshLambertMaterial=!0,this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}function yr(t,e,n){if(!t||!n&&t.constructor===e)return t;if(typeof e.BYTES_PER_ELEMENT==="number")return new e(t);return Array.prototype.slice.call(t)}function g0(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function _0(t){function e(s,r){return t[s]-t[r]}let n=t.length,i=Array(n);for(let s=0;s!==n;++s)i[s]=s;return i.sort(e),i}function nc(t,e,n){let i=t.length,s=new t.constructor(i);for(let r=0,o=0;o!==i;++r){let a=n[r]*e;for(let l=0;l!==e;++l)s[o++]=t[a+l]}return s}function $c(t,e,n,i){let s=1,r=t[0];while(r!==void 0&&r[i]===void 0)r=t[s++];if(r===void 0)return;let o=r[i];if(o===void 0)return;if(Array.isArray(o))do{if(o=r[i],o!==void 0)e.push(r.time),n.push.apply(n,o);r=t[s++]}while(r!==void 0);else if(o.toArray!==void 0)do{if(o=r[i],o!==void 0)e.push(r.time),o.toArray(n,n.length);r=t[s++]}while(r!==void 0);else do{if(o=r[i],o!==void 0)e.push(r.time),n.push(o);r=t[s++]}while(r!==void 0)}class gi{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];n:{t:{let r;e:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=e[++n],t<i)break t}r=e.length;break e}if(!(t>=s)){let o=e[1];if(t<o)n=2,s=o;for(let a=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(i=s,s=e[--n-1],t>=s)break t}r=n,n=0;break e}break n}while(n<r){let o=n+r>>>1;if(t<e[o])r=o;else n=o+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let r=0;r!==i;++r)e[r]=n[s+r];return e}interpolate_(){throw Error("call to abstract method")}intervalChanged_(){}}class Jc extends gi{constructor(t,e,n,i){super(t,e,n,i);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,r=t+1,o=i[s],a=i[r];if(o===void 0)switch(this.getSettings_().endingStart){case 2401:s=t,o=2*e-n;break;case 2402:s=i.length-2,o=e+i[s]-i[s+1];break;default:s=t,o=n}if(a===void 0)switch(this.getSettings_().endingEnd){case 2401:r=t,a=2*n-e;break;case 2402:r=1,a=n+i[1]-i[0];break;default:r=t-1,a=e}let l=(n-e)*0.5,c=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(a-n),this._offsetPrev=s*c,this._offsetNext=r*c}interpolate_(t,e,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=t*o,l=a-o,c=this._offsetPrev,h=this._offsetNext,u=this._weightPrev,d=this._weightNext,f=(n-e)/(i-e),g=f*f,_=g*f,p=-u*_+2*u*g-u*f,m=(1+u)*_+(-1.5-2*u)*g+(-0.5+u)*f+1,v=(-1-d)*_+(1.5+d)*g+0.5*f,x=d*_-d*g;for(let E=0;E!==o;++E)s[E]=p*r[c+E]+m*r[l+E]+v*r[a+E]+x*r[h+E];return s}}class jc extends gi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=t*o,l=a-o,c=(n-e)/(i-e),h=1-c;for(let u=0;u!==o;++u)s[u]=r[l+u]*h+r[a+u]*c;return s}}class Qc extends gi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class gn{constructor(t,e,n,i){if(t===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=yr(e,this.TimeBufferType),this.values=yr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:yr(t.times,Array),values:yr(t.values,Array)};let i=t.getInterpolation();if(i!==t.DefaultInterpolation)n.interpolation=i}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Qc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new jc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Jc(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case 2300:e=this.InterpolantFactoryMethodDiscrete;break;case 2301:e=this.InterpolantFactoryMethodLinear;break;case 2302:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,s=0,r=i-1;while(s!==i&&n[s]<t)++s;while(r!==-1&&n[r]>e)--r;if(++r,s!==0||r!==i){if(s>=r)r=Math.max(r,1),s=r-1;let o=this.getValueSize();this.times=n.slice(s,r),this.values=this.values.slice(s*o,r*o)}return this}validate(){let t=!0,e=this.getValueSize();if(e-Math.floor(e)!==0)console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1;let n=this.times,i=this.values,s=n.length;if(s===0)console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1;let r=null;for(let o=0;o!==s;o++){let a=n[o];if(typeof a==="number"&&isNaN(a)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,a),t=!1;break}if(r!==null&&r>a){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,a,r),t=!1;break}r=a}if(i!==void 0){if(g0(i))for(let o=0,a=i.length;o!==a;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===2302,s=t.length-1,r=1;for(let o=1;o<s;++o){let a=!1,l=t[o],c=t[o+1];if(l!==c&&(o!==1||l!==t[0]))if(!i){let h=o*n,u=h-n,d=h+n;for(let f=0;f!==n;++f){let g=e[h+f];if(g!==e[u+f]||g!==e[d+f]){a=!0;break}}}else a=!0;if(a){if(o!==r){t[r]=t[o];let h=o*n,u=r*n;for(let d=0;d!==n;++d)e[u+d]=e[h+d]}++r}}if(s>0){t[r]=t[s];for(let o=s*n,a=r*n,l=0;l!==n;++l)e[a+l]=e[o+l];++r}if(r!==t.length)this.times=t.slice(0,r),this.values=e.slice(0,r*n);else this.times=t,this.values=e;return this}clone(){let t=this.times.slice(),e=this.values.slice(),i=new this.constructor(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}gn.prototype.TimeBufferType=Float32Array;gn.prototype.ValueBufferType=Float32Array;gn.prototype.DefaultInterpolation=2301;class _i extends gn{constructor(t,e,n){super(t,e,n)}}_i.prototype.ValueTypeName="bool";_i.prototype.ValueBufferType=Array;_i.prototype.DefaultInterpolation=2300;_i.prototype.InterpolantFactoryMethodLinear=void 0;_i.prototype.InterpolantFactoryMethodSmooth=void 0;class Qo extends gn{}Qo.prototype.ValueTypeName="color";class Jn extends gn{}Jn.prototype.ValueTypeName="number";class th extends gi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=(n-e)/(i-e),l=t*o;for(let c=l+o;l!==c;l+=4)$e.slerpFlat(s,0,r,l-o,r,l,a);return s}}class ti extends gn{InterpolantFactoryMethodLinear(t){return new th(this.times,this.values,this.getValueSize(),t)}}ti.prototype.ValueTypeName="quaternion";ti.prototype.InterpolantFactoryMethodSmooth=void 0;class xi extends gn{constructor(t,e,n){super(t,e,n)}}xi.prototype.ValueTypeName="string";xi.prototype.ValueBufferType=Array;xi.prototype.DefaultInterpolation=2300;xi.prototype.InterpolantFactoryMethodLinear=void 0;xi.prototype.InterpolantFactoryMethodSmooth=void 0;class jn extends gn{}jn.prototype.ValueTypeName="vector";class ta{constructor(t="",e=-1,n=[],i=2500){if(this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=Ke(),this.duration<0)this.resetDuration()}static parse(t){let e=[],n=t.tracks,i=1/(t.fps||1);for(let r=0,o=n.length;r!==o;++r)e.push(y0(n[r]).scale(i));let s=new this(t.name,t.duration,e,t.blendMode);return s.uuid=t.uuid,s}static toJSON(t){let e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let s=0,r=n.length;s!==r;++s)e.push(gn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(t,e,n,i){let s=e.length,r=[];for(let o=0;o<s;o++){let a=[],l=[];a.push((o+s-1)%s,o,(o+1)%s),l.push(0,1,0);let c=_0(a);if(a=nc(a,1,c),l=nc(l,1,c),!i&&a[0]===0)a.push(s),l.push(l[0]);r.push(new Jn(".morphTargetInfluences["+e[o].name+"]",a,l).scale(1/n))}return new this(t,-1,r)}static findByName(t,e){let n=t;if(!Array.isArray(t)){let i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,a=t.length;o<a;o++){let l=t[o],c=l.name.match(s);if(c&&c.length>1){let h=c[1],u=i[h];if(!u)i[h]=u=[];u.push(l)}}let r=[];for(let o in i)r.push(this.CreateFromMorphTargetSequence(o,i[o],e,n));return r}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,u,d,f,g){if(d.length!==0){let _=[],p=[];if($c(d,_,p,f),_.length!==0)g.push(new h(u,_,p))}},i=[],s=t.name||"default",r=t.fps||30,o=t.blendMode,a=t.length||-1,l=t.hierarchy||[];for(let h=0;h<l.length;h++){let u=l[h].keys;if(!u||u.length===0)continue;if(u[0].morphTargets){let d={},f;for(f=0;f<u.length;f++)if(u[f].morphTargets)for(let g=0;g<u[f].morphTargets.length;g++)d[u[f].morphTargets[g]]=-1;for(let g in d){let _=[],p=[];for(let m=0;m!==u[f].morphTargets.length;++m){let v=u[f];_.push(v.time),p.push(v.morphTarget===g?1:0)}i.push(new Jn(".morphTargetInfluence["+g+"]",_,p))}a=d.length*r}else{let d=".bones["+e[h].name+"]";n(jn,d+".position",u,"pos",i),n(ti,d+".quaternion",u,"rot",i),n(jn,d+".scale",u,"scl",i)}}if(i.length===0)return null;return new this(s,a,i,o)}resetDuration(){let t=this.tracks,e=0;for(let n=0,i=t.length;n!==i;++n){let s=this.tracks[n];e=Math.max(e,s.times[s.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){let t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function x0(t){switch(t.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Jn;case"vector":case"vector2":case"vector3":case"vector4":return jn;case"color":return Qo;case"quaternion":return ti;case"bool":case"boolean":return _i;case"string":return xi}throw Error("THREE.KeyframeTrack: Unsupported typeName: "+t)}function y0(t){if(t.type===void 0)throw Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=x0(t.type);if(t.times===void 0){let n=[],i=[];$c(t.keys,n,i,"value"),t.times=n,t.values=i}if(e.parse!==void 0)return e.parse(t);else return new e(t.name,t.times,t.values,t.interpolation)}var Kn={enabled:!1,files:{},add:function(t,e){if(this.enabled===!1)return;this.files[t]=e},get:function(t){if(this.enabled===!1)return;return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}};class eh{constructor(t,e,n){let i=this,s=!1,r=0,o=0,a=void 0,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(c){if(o++,s===!1){if(i.onStart!==void 0)i.onStart(c,r,o)}s=!0},this.itemEnd=function(c){if(r++,i.onProgress!==void 0)i.onProgress(c,r,o);if(r===o){if(s=!1,i.onLoad!==void 0)i.onLoad()}},this.itemError=function(c){if(i.onError!==void 0)i.onError(c)},this.resolveURL=function(c){if(a)return a(c);return c},this.setURLModifier=function(c){return a=c,this},this.addHandler=function(c,h){return l.push(c,h),this},this.removeHandler=function(c){let h=l.indexOf(c);if(h!==-1)l.splice(h,2);return this},this.getHandler=function(c){for(let h=0,u=l.length;h<u;h+=2){let d=l[h],f=l[h+1];if(d.global)d.lastIndex=0;if(d.test(c))return f}return null}}}var v0=new eh;class ei{constructor(t){this.manager=t!==void 0?t:v0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}ei.DEFAULT_MATERIAL_NAME="__DEFAULT";var Nn={};class nh extends Error{constructor(t,e){super(t);this.response=e}}class Fr extends ei{constructor(t){super(t)}load(t,e,n,i){if(t===void 0)t="";if(this.path!==void 0)t=this.path+t;t=this.manager.resolveURL(t);let s=Kn.get(t);if(s!==void 0)return this.manager.itemStart(t),setTimeout(()=>{if(e)e(s);this.manager.itemEnd(t)},0),s;if(Nn[t]!==void 0){Nn[t].push({onLoad:e,onProgress:n,onError:i});return}Nn[t]=[],Nn[t].push({onLoad:e,onProgress:n,onError:i});let r=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,a=this.responseType;fetch(r).then((l)=>{if(l.status===200||l.status===0){if(l.status===0)console.warn("THREE.FileLoader: HTTP Status 0 received.");if(typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let c=Nn[t],h=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=u?parseInt(u):0,f=d!==0,g=0,_=new ReadableStream({start(p){m();function m(){h.read().then(({done:v,value:x})=>{if(v)p.close();else{g+=x.byteLength;let E=new ProgressEvent("progress",{lengthComputable:f,loaded:g,total:d});for(let I=0,w=c.length;I<w;I++){let A=c[I];if(A.onProgress)A.onProgress(E)}p.enqueue(x),m()}},(v)=>{p.error(v)})}}});return new Response(_)}else throw new nh(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then((l)=>{switch(a){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then((c)=>new DOMParser().parseFromString(c,o));case"json":return l.json();default:if(o===void 0)return l.text();else{let h=/charset="?([^;"\s]*)"?/i.exec(o),u=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(u);return l.arrayBuffer().then((f)=>d.decode(f))}}}).then((l)=>{Kn.add(t,l);let c=Nn[t];delete Nn[t];for(let h=0,u=c.length;h<u;h++){let d=c[h];if(d.onLoad)d.onLoad(l)}}).catch((l)=>{let c=Nn[t];if(c===void 0)throw this.manager.itemError(t),l;delete Nn[t];for(let h=0,u=c.length;h<u;h++){let d=c[h];if(d.onError)d.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class ih extends ei{constructor(t){super(t)}load(t,e,n,i){if(this.path!==void 0)t=this.path+t;t=this.manager.resolveURL(t);let s=this,r=Kn.get(t);if(r!==void 0)return s.manager.itemStart(t),setTimeout(function(){if(e)e(r);s.manager.itemEnd(t)},0),r;let o=Ms("img");function a(){if(c(),Kn.add(t,this),e)e(this);s.manager.itemEnd(t)}function l(h){if(c(),i)i(h);s.manager.itemError(t),s.manager.itemEnd(t)}function c(){o.removeEventListener("load",a,!1),o.removeEventListener("error",l,!1)}if(o.addEventListener("load",a,!1),o.addEventListener("error",l,!1),t.slice(0,5)!=="data:"){if(this.crossOrigin!==void 0)o.crossOrigin=this.crossOrigin}return s.manager.itemStart(t),o.src=t,o}}class ea extends ei{constructor(t){super(t)}load(t,e,n,i){let s=new Se,r=new ih(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(t,function(o){if(s.image=o,s.needsUpdate=!0,e!==void 0)e(s)},n,i),s}}class Us extends le{constructor(t,e=1){super();this.isLight=!0,this.type="Light",this.color=new Mt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);if(e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0)e.object.groundColor=this.groundColor.getHex();if(this.distance!==void 0)e.object.distance=this.distance;if(this.angle!==void 0)e.object.angle=this.angle;if(this.decay!==void 0)e.object.decay=this.decay;if(this.penumbra!==void 0)e.object.penumbra=this.penumbra;if(this.shadow!==void 0)e.object.shadow=this.shadow.toJSON();if(this.target!==void 0)e.object.target=this.target.uuid;return e}}class na extends Us{constructor(t,e,n){super(t,n);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(le.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Mt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}var Mo=new At,ic=new b,sc=new b;class Or{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.map=null,this.mapPass=null,this.matrix=new At,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wr,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new $t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;ic.setFromMatrixPosition(t.matrixWorld),e.position.copy(ic),sc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(sc),e.updateMatrixWorld(),Mo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Mo),n.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1),n.multiply(Mo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};if(this.intensity!==1)t.intensity=this.intensity;if(this.bias!==0)t.bias=this.bias;if(this.normalBias!==0)t.normalBias=this.normalBias;if(this.radius!==1)t.radius=this.radius;if(this.mapSize.x!==512||this.mapSize.y!==512)t.mapSize=this.mapSize.toArray();return t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class sh extends Or{constructor(){super(new we(50,1,0.5,500));this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){let e=this.camera,n=Vi*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=t.distance||e.far;if(n!==e.fov||i!==e.aspect||s!==e.far)e.fov=n,e.aspect=i,e.far=s,e.updateProjectionMatrix();super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class ia extends Us{constructor(t,e,n=0,i=Math.PI/3,s=0,r=2){super(t,e);this.isSpotLight=!0,this.type="SpotLight",this.position.copy(le.DEFAULT_UP),this.updateMatrix(),this.target=new le,this.distance=n,this.angle=i,this.penumbra=s,this.decay=r,this.map=null,this.shadow=new sh}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}var rc=new At,fs=new b,Eo=new b;class rh extends Or{constructor(){super(new we(90,1,0.5,500));this.isPointLightShadow=!0,this._frameExtents=new ot(4,2),this._viewportCount=6,this._viewports=[new $t(2,1,1,1),new $t(0,1,1,1),new $t(3,1,1,1),new $t(1,1,1,1),new $t(3,0,1,1),new $t(1,0,1,1)],this._cubeDirections=[new b(1,0,0),new b(-1,0,0),new b(0,0,1),new b(0,0,-1),new b(0,1,0),new b(0,-1,0)],this._cubeUps=[new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,0,1),new b(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,i=this.matrix,s=t.distance||n.far;if(s!==n.far)n.far=s,n.updateProjectionMatrix();fs.setFromMatrixPosition(t.matrixWorld),n.position.copy(fs),Eo.copy(n.position),Eo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Eo),n.updateMatrixWorld(),i.makeTranslation(-fs.x,-fs.y,-fs.z),rc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(rc)}}class sa extends Us{constructor(t,e,n=0,i=2){super(t,e);this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new rh}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class oh extends Or{constructor(){super(new As(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class Fs extends Us{constructor(t,e){super(t,e);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(le.DEFAULT_UP),this.updateMatrix(),this.target=new le,this.shadow=new oh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class yi{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch(n){return e}}static extractUrlBase(t){let e=t.lastIndexOf("/");if(e===-1)return"./";return t.slice(0,e+1)}static resolveURL(t,e){if(typeof t!=="string"||t==="")return"";if(/^https?:\/\//i.test(e)&&/^\//.test(t))e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1");if(/^(https?:)?\/\//i.test(t))return t;if(/^data:.*,.*$/i.test(t))return t;if(/^blob:.*$/i.test(t))return t;return e+t}}class ra extends ei{constructor(t){super(t);if(this.isImageBitmapLoader=!0,typeof createImageBitmap>"u")console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported.");if(typeof fetch>"u")console.warn("THREE.ImageBitmapLoader: fetch() not supported.");this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,i){if(t===void 0)t="";if(this.path!==void 0)t=this.path+t;t=this.manager.resolveURL(t);let s=this,r=Kn.get(t);if(r!==void 0){if(s.manager.itemStart(t),r.then){r.then((l)=>{if(e)e(l);s.manager.itemEnd(t)}).catch((l)=>{if(i)i(l)});return}return setTimeout(function(){if(e)e(r);s.manager.itemEnd(t)},0),r}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;let a=fetch(t,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){if(Kn.add(t,l),e)e(l);return s.manager.itemEnd(t),l}).catch(function(l){if(i)i(l);Kn.remove(t),s.manager.itemError(t),s.manager.itemEnd(t)});Kn.add(t,a),s.manager.itemStart(t)}}class oa{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=oc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=oc();t=(e-this.oldTime)/1000,this.oldTime=e,this.elapsedTime+=t}return t}}function oc(){return performance.now()}var aa="\\[\\]\\.:\\/",S0=new RegExp("["+aa+"]","g"),la="[^"+aa+"]",M0="[^"+aa.replace("\\.","")+"]",E0=/((?:WC+[\/:])*)/.source.replace("WC",la),T0=/(WCOD+)?/.source.replace("WCOD",M0),b0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",la),w0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",la),A0=new RegExp("^"+E0+T0+b0+w0+"$"),R0=["material","materials","bones","map"];class ah{constructor(t,e,n){let i=n||ee.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];if(i!==void 0)i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class ee{constructor(t,e,n){this.path=e,this.parsedPath=n||ee.parseTrackName(e),this.node=ee.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){if(!(t&&t.isAnimationObjectGroup))return new ee(t,e,n);else return new ee.Composite(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(S0,"")}static parseTrackName(t){let e=A0.exec(t);if(e===null)throw Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);if(R0.indexOf(s)!==-1)n.nodeName=n.nodeName.substring(0,i),n.objectName=s}if(n.propertyName===null||n.propertyName.length===0)throw Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let r=0;r<s.length;r++){let o=s[r];if(o.name===e||o.uuid===e)return o;let a=n(o.children);if(a)return a}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,s=e.propertyIndex;if(!t)t=ee.findNode(this.rootNode,e.nodeName),this.node=t;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let c=0;c<t.length;c++)if(t[c].name===l){l=c;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let r=t[i];if(r===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;if(this.targetObject=t,t.needsUpdate!==void 0)o=this.Versioning.NeedsUpdate;else if(t.matrixWorldNeedsUpdate!==void 0)o=this.Versioning.MatrixWorldNeedsUpdate;let a=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(t.morphTargetDictionary[s]!==void 0)s=t.morphTargetDictionary[s]}a=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else if(r.fromArray!==void 0&&r.toArray!==void 0)a=this.BindingType.HasFromToArray,this.resolvedProperty=r;else if(Array.isArray(r))a=this.BindingType.EntireArray,this.resolvedProperty=r;else this.propertyName=i;this.getValue=this.GetterByBindingType[a],this.setValue=this.SetterByBindingTypeAndVersioning[a][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ee.Composite=ah;ee.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ee.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ee.prototype.GetterByBindingType=[ee.prototype._getValue_direct,ee.prototype._getValue_array,ee.prototype._getValue_arrayElement,ee.prototype._getValue_toArray];ee.prototype.SetterByBindingTypeAndVersioning=[[ee.prototype._setValue_direct,ee.prototype._setValue_direct_setNeedsUpdate,ee.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ee.prototype._setValue_array,ee.prototype._setValue_array_setNeedsUpdate,ee.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ee.prototype._setValue_arrayElement,ee.prototype._setValue_arrayElement_setNeedsUpdate,ee.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ee.prototype._setValue_fromArray,ee.prototype._setValue_fromArray_setNeedsUpdate,ee.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var b_=new Float32Array(1);var ac=new At;class Os{constructor(t,e,n=0,i=1/0){this.ray=new Ki(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new br,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){if(e.isPerspectiveCamera)this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,0.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e;else if(e.isOrthographicCamera)this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e;else console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ac.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ac),this}intersectObject(t,e=!0,n=[]){return Co(t,this,n,e),n.sort(lc),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)Co(t[i],this,n,e);return n.sort(lc),n}}function lc(t,e){return t.distance-e.distance}function Co(t,e,n,i){let s=!0;if(t.layers.test(e.layers)){if(t.raycast(e,n)===!1)s=!1}if(s===!0&&i===!0){let r=t.children;for(let o=0,a=r.length;o<a;o++)Co(r[o],e,n,!0)}}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));if(typeof window<"u")if(window.__THREE__)console.warn("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="170";function ca(t,e){if(e===_c)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),t;if(e===ws||e===Tr){let n=t.getIndex();if(n===null){let o=[],a=t.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);t.setIndex(o),n=t.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),t}let i=n.count-2,s=[];if(e===ws)for(let o=1;o<=i;o++)s.push(n.getX(0)),s.push(n.getX(o)),s.push(n.getX(o+1));else for(let o=0;o<i;o++)if(o%2===0)s.push(n.getX(o)),s.push(n.getX(o+1)),s.push(n.getX(o+2));else s.push(n.getX(o+2)),s.push(n.getX(o+1)),s.push(n.getX(o));if(s.length/3!==i)console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=t.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),t}class ma extends ei{constructor(t){super(t);this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new mh(e)}),this.register(function(e){return new gh(e)}),this.register(function(e){return new bh(e)}),this.register(function(e){return new wh(e)}),this.register(function(e){return new Ah(e)}),this.register(function(e){return new xh(e)}),this.register(function(e){return new yh(e)}),this.register(function(e){return new vh(e)}),this.register(function(e){return new Sh(e)}),this.register(function(e){return new ph(e)}),this.register(function(e){return new Mh(e)}),this.register(function(e){return new _h(e)}),this.register(function(e){return new Th(e)}),this.register(function(e){return new Eh(e)}),this.register(function(e){return new dh(e)}),this.register(function(e){return new Rh(e)}),this.register(function(e){return new Ch(e)})}load(t,e,n,i){let s=this,r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){let l=yi.extractUrlBase(t);r=yi.resolveURL(l,this.path)}else r=yi.extractUrlBase(t);this.manager.itemStart(t);let o=function(l){if(i)i(l);else console.error(l);s.manager.itemError(t),s.manager.itemEnd(t)},a=new Fr(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(l){try{s.parse(l,r,function(c){e(c),s.manager.itemEnd(t)},o)}catch(c){o(c)}},n,o)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){if(this.pluginCallbacks.indexOf(t)===-1)this.pluginCallbacks.push(t);return this}unregister(t){if(this.pluginCallbacks.indexOf(t)!==-1)this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1);return this}parse(t,e,n,i){let s,r={},o={},a=new TextDecoder;if(typeof t==="string")s=JSON.parse(t);else if(t instanceof ArrayBuffer)if(a.decode(new Uint8Array(t,0,4))===Ih){try{r[Gt.KHR_BINARY_GLTF]=new Ph(t)}catch(h){if(i)i(h);return}s=JSON.parse(r[Gt.KHR_BINARY_GLTF].content)}else s=JSON.parse(a.decode(t));else s=t;if(s.asset===void 0||s.asset.version[0]<2){if(i)i(Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Fh(s,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let c=0;c<this.pluginCallbacks.length;c++){let h=this.pluginCallbacks[c](l);if(!h.name)console.error("THREE.GLTFLoader: Invalid plugin found: missing name");o[h.name]=h,r[h.name]=!0}if(s.extensionsUsed)for(let c=0;c<s.extensionsUsed.length;++c){let h=s.extensionsUsed[c],u=s.extensionsRequired||[];switch(h){case Gt.KHR_MATERIALS_UNLIT:r[h]=new fh;break;case Gt.KHR_DRACO_MESH_COMPRESSION:r[h]=new Lh(s,this.dracoLoader);break;case Gt.KHR_TEXTURE_TRANSFORM:r[h]=new Nh;break;case Gt.KHR_MESH_QUANTIZATION:r[h]=new Dh;break;default:if(u.indexOf(h)>=0&&o[h]===void 0)console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(r),l.setPlugins(o),l.parse(n,i)}parseAsync(t,e){let n=this;return new Promise(function(i,s){n.parse(t,e,i,s)})}}function C0(){let t={};return{get:function(e){return t[e]},add:function(e,n){t[e]=n},remove:function(e){delete t[e]},removeAll:function(){t={}}}}var Gt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class dh{constructor(t){this.parser=t,this.name=Gt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let t=this.parser,e=this.parser.json.nodes||[];for(let n=0,i=e.length;n<i;n++){let s=e[n];if(s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0)t._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(t){let e=this.parser,n="light:"+t,i=e.cache.get(n);if(i)return i;let s=e.json,a=((s.extensions&&s.extensions[this.name]||{}).lights||[])[t],l,c=new Mt(16777215);if(a.color!==void 0)c.setRGB(a.color[0],a.color[1],a.color[2],Tn);let h=a.range!==void 0?a.range:0;switch(a.type){case"directional":l=new Fs(c),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new sa(c),l.distance=h;break;case"spot":l=new ia(c),l.distance=h,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle!==void 0?a.spot.innerConeAngle:0,a.spot.outerConeAngle=a.spot.outerConeAngle!==void 0?a.spot.outerConeAngle:Math.PI/4,l.angle=a.spot.outerConeAngle,l.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw Error("THREE.GLTFLoader: Unexpected light type: "+a.type)}if(l.position.set(0,0,0),l.decay=2,On(l,a),a.intensity!==void 0)l.intensity=a.intensity;return l.name=e.createUniqueName(a.name||"light_"+t),i=Promise.resolve(l),e.cache.add(n,i),i}getDependency(t,e){if(t!=="light")return;return this._loadLight(e)}createNodeAttachment(t){let e=this,n=this.parser,s=n.json.nodes[t],o=(s.extensions&&s.extensions[this.name]||{}).light;if(o===void 0)return null;return this._loadLight(o).then(function(a){return n._getNodeRef(e.cache,o,a)})}}class fh{constructor(){this.name=Gt.KHR_MATERIALS_UNLIT}getMaterialType(){return ne}extendParams(t,e,n){let i=[];t.color=new Mt(1,1,1),t.opacity=1;let s=e.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let r=s.baseColorFactor;t.color.setRGB(r[0],r[1],r[2],Tn),t.opacity=r[3]}if(s.baseColorTexture!==void 0)i.push(n.assignTexture(t,"map",s.baseColorTexture,Be))}return Promise.all(i)}}class ph{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){let i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name].emissiveStrength;if(s!==void 0)e.emissiveIntensity=s;return Promise.resolve()}}class mh{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){let n=this.parser.json.materials[t];if(!n.extensions||!n.extensions[this.name])return null;return je}extendMaterialParams(t,e){let n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];if(r.clearcoatFactor!==void 0)e.clearcoat=r.clearcoatFactor;if(r.clearcoatTexture!==void 0)s.push(n.assignTexture(e,"clearcoatMap",r.clearcoatTexture));if(r.clearcoatRoughnessFactor!==void 0)e.clearcoatRoughness=r.clearcoatRoughnessFactor;if(r.clearcoatRoughnessTexture!==void 0)s.push(n.assignTexture(e,"clearcoatRoughnessMap",r.clearcoatRoughnessTexture));if(r.clearcoatNormalTexture!==void 0){if(s.push(n.assignTexture(e,"clearcoatNormalMap",r.clearcoatNormalTexture)),r.clearcoatNormalTexture.scale!==void 0){let o=r.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new ot(o,o)}}return Promise.all(s)}}class gh{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_DISPERSION}getMaterialType(t){let n=this.parser.json.materials[t];if(!n.extensions||!n.extensions[this.name])return null;return je}extendMaterialParams(t,e){let i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return e.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class _h{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){let n=this.parser.json.materials[t];if(!n.extensions||!n.extensions[this.name])return null;return je}extendMaterialParams(t,e){let n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];if(r.iridescenceFactor!==void 0)e.iridescence=r.iridescenceFactor;if(r.iridescenceTexture!==void 0)s.push(n.assignTexture(e,"iridescenceMap",r.iridescenceTexture));if(r.iridescenceIor!==void 0)e.iridescenceIOR=r.iridescenceIor;if(e.iridescenceThicknessRange===void 0)e.iridescenceThicknessRange=[100,400];if(r.iridescenceThicknessMinimum!==void 0)e.iridescenceThicknessRange[0]=r.iridescenceThicknessMinimum;if(r.iridescenceThicknessMaximum!==void 0)e.iridescenceThicknessRange[1]=r.iridescenceThicknessMaximum;if(r.iridescenceThicknessTexture!==void 0)s.push(n.assignTexture(e,"iridescenceThicknessMap",r.iridescenceThicknessTexture));return Promise.all(s)}}class xh{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_SHEEN}getMaterialType(t){let n=this.parser.json.materials[t];if(!n.extensions||!n.extensions[this.name])return null;return je}extendMaterialParams(t,e){let n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[];e.sheenColor=new Mt(0,0,0),e.sheenRoughness=0,e.sheen=1;let r=i.extensions[this.name];if(r.sheenColorFactor!==void 0){let o=r.sheenColorFactor;e.sheenColor.setRGB(o[0],o[1],o[2],Tn)}if(r.sheenRoughnessFactor!==void 0)e.sheenRoughness=r.sheenRoughnessFactor;if(r.sheenColorTexture!==void 0)s.push(n.assignTexture(e,"sheenColorMap",r.sheenColorTexture,Be));if(r.sheenRoughnessTexture!==void 0)s.push(n.assignTexture(e,"sheenRoughnessMap",r.sheenRoughnessTexture));return Promise.all(s)}}class yh{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){let n=this.parser.json.materials[t];if(!n.extensions||!n.extensions[this.name])return null;return je}extendMaterialParams(t,e){let n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];if(r.transmissionFactor!==void 0)e.transmission=r.transmissionFactor;if(r.transmissionTexture!==void 0)s.push(n.assignTexture(e,"transmissionMap",r.transmissionTexture));return Promise.all(s)}}class vh{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_VOLUME}getMaterialType(t){let n=this.parser.json.materials[t];if(!n.extensions||!n.extensions[this.name])return null;return je}extendMaterialParams(t,e){let n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];if(e.thickness=r.thicknessFactor!==void 0?r.thicknessFactor:0,r.thicknessTexture!==void 0)s.push(n.assignTexture(e,"thicknessMap",r.thicknessTexture));e.attenuationDistance=r.attenuationDistance||1/0;let o=r.attenuationColor||[1,1,1];return e.attenuationColor=new Mt().setRGB(o[0],o[1],o[2],Tn),Promise.all(s)}}class Sh{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_IOR}getMaterialType(t){let n=this.parser.json.materials[t];if(!n.extensions||!n.extensions[this.name])return null;return je}extendMaterialParams(t,e){let i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return e.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class Mh{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_SPECULAR}getMaterialType(t){let n=this.parser.json.materials[t];if(!n.extensions||!n.extensions[this.name])return null;return je}extendMaterialParams(t,e){let n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];if(e.specularIntensity=r.specularFactor!==void 0?r.specularFactor:1,r.specularTexture!==void 0)s.push(n.assignTexture(e,"specularIntensityMap",r.specularTexture));let o=r.specularColorFactor||[1,1,1];if(e.specularColor=new Mt().setRGB(o[0],o[1],o[2],Tn),r.specularColorTexture!==void 0)s.push(n.assignTexture(e,"specularColorMap",r.specularColorTexture,Be));return Promise.all(s)}}class Eh{constructor(t){this.parser=t,this.name=Gt.EXT_MATERIALS_BUMP}getMaterialType(t){let n=this.parser.json.materials[t];if(!n.extensions||!n.extensions[this.name])return null;return je}extendMaterialParams(t,e){let n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];if(e.bumpScale=r.bumpFactor!==void 0?r.bumpFactor:1,r.bumpTexture!==void 0)s.push(n.assignTexture(e,"bumpMap",r.bumpTexture));return Promise.all(s)}}class Th{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){let n=this.parser.json.materials[t];if(!n.extensions||!n.extensions[this.name])return null;return je}extendMaterialParams(t,e){let n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];if(r.anisotropyStrength!==void 0)e.anisotropy=r.anisotropyStrength;if(r.anisotropyRotation!==void 0)e.anisotropyRotation=r.anisotropyRotation;if(r.anisotropyTexture!==void 0)s.push(n.assignTexture(e,"anisotropyMap",r.anisotropyTexture));return Promise.all(s)}}class bh{constructor(t){this.parser=t,this.name=Gt.KHR_TEXTURE_BASISU}loadTexture(t){let e=this.parser,n=e.json,i=n.textures[t];if(!i.extensions||!i.extensions[this.name])return null;let s=i.extensions[this.name],r=e.options.ktx2Loader;if(!r)if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");else return null;return e.loadTextureImage(t,s.source,r)}}class wh{constructor(t){this.parser=t,this.name=Gt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(t){let e=this.name,n=this.parser,i=n.json,s=i.textures[t];if(!s.extensions||!s.extensions[e])return null;let r=s.extensions[e],o=i.images[r.source],a=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);if(l!==null)a=l}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,r.source,a);if(i.extensionsRequired&&i.extensionsRequired.indexOf(e)>=0)throw Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){if(!this.isSupported)this.isSupported=new Promise(function(t){let e=new Image;e.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",e.onload=e.onerror=function(){t(e.height===1)}});return this.isSupported}}class Ah{constructor(t){this.parser=t,this.name=Gt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(t){let e=this.name,n=this.parser,i=n.json,s=i.textures[t];if(!s.extensions||!s.extensions[e])return null;let r=s.extensions[e],o=i.images[r.source],a=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);if(l!==null)a=l}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,r.source,a);if(i.extensionsRequired&&i.extensionsRequired.indexOf(e)>=0)throw Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){if(!this.isSupported)this.isSupported=new Promise(function(t){let e=new Image;e.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",e.onload=e.onerror=function(){t(e.height===1)}});return this.isSupported}}class Rh{constructor(t){this.name=Gt.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){let e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported)if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");else return null;return s.then(function(o){let a=i.byteOffset||0,l=i.byteLength||0,c=i.count,h=i.byteStride,u=new Uint8Array(o,a,l);if(r.decodeGltfBufferAsync)return r.decodeGltfBufferAsync(c,h,u,i.mode,i.filter).then(function(d){return d.buffer});else return r.ready.then(function(){let d=new ArrayBuffer(c*h);return r.decodeGltfBuffer(new Uint8Array(d),c,h,u,i.mode,i.filter),d})})}else return null}}class Ch{constructor(t){this.name=Gt.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){let e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=e.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==Qe.TRIANGLES&&l.mode!==Qe.TRIANGLE_STRIP&&l.mode!==Qe.TRIANGLE_FAN&&l.mode!==void 0)return null;let r=n.extensions[this.name].attributes,o=[],a={};for(let l in r)o.push(this.parser.getDependency("accessor",r[l]).then((c)=>(a[l]=c,a[l])));if(o.length<1)return null;return o.push(this.parser.createNodeMesh(t)),Promise.all(o).then((l)=>{let c=l.pop(),h=c.isGroup?c.children:[c],u=l[0].count,d=[];for(let f of h){let g=new At,_=new b,p=new $e,m=new b(1,1,1),v=new Cs(f.geometry,f.material,u);for(let x=0;x<u;x++){if(a.TRANSLATION)_.fromBufferAttribute(a.TRANSLATION,x);if(a.ROTATION)p.fromBufferAttribute(a.ROTATION,x);if(a.SCALE)m.fromBufferAttribute(a.SCALE,x);v.setMatrixAt(x,g.compose(_,p,m))}for(let x in a)if(x==="_COLOR_0"){let E=a[x];v.instanceColor=new Xi(E.array,E.itemSize,E.normalized)}else if(x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE")f.geometry.setAttribute(x,a[x]);le.prototype.copy.call(v,f),this.parser.assignFinalMaterial(v),d.push(v)}if(c.isGroup)return c.clear(),c.add(...d),c;return d[0]})}}var Ih="glTF",Bs=12,lh={JSON:1313821514,BIN:5130562};class Ph{constructor(t){this.name=Gt.KHR_BINARY_GLTF,this.content=null,this.body=null;let e=new DataView(t,0,Bs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==Ih)throw Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");else if(this.header.version<2)throw Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-Bs,s=new DataView(t,Bs),r=0;while(r<i){let o=s.getUint32(r,!0);r+=4;let a=s.getUint32(r,!0);if(r+=4,a===lh.JSON){let l=new Uint8Array(t,Bs+r,o);this.content=n.decode(l)}else if(a===lh.BIN){let l=Bs+r;this.body=t.slice(l,l+o)}r+=o}if(this.content===null)throw Error("THREE.GLTFLoader: JSON content not found.")}}class Lh{constructor(t,e){if(!e)throw Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Gt.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){let n=this.json,i=this.dracoLoader,s=t.extensions[this.name].bufferView,r=t.extensions[this.name].attributes,o={},a={},l={};for(let c in r){let h=fa[c]||c.toLowerCase();o[h]=r[c]}for(let c in t.attributes){let h=fa[c]||c.toLowerCase();if(r[c]!==void 0){let u=n.accessors[t.attributes[c]],d=ji[u.componentType];l[h]=d.name,a[h]=u.normalized===!0}}return e.getDependency("bufferView",s).then(function(c){return new Promise(function(h,u){i.decodeDracoFile(c,function(d){for(let f in d.attributes){let g=d.attributes[f],_=a[f];if(_!==void 0)g.normalized=_}h(d)},o,l,Tn,u)})})}}class Nh{constructor(){this.name=Gt.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){if((e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0)return t;if(t=t.clone(),e.texCoord!==void 0)t.channel=e.texCoord;if(e.offset!==void 0)t.offset.fromArray(e.offset);if(e.rotation!==void 0)t.rotation=e.rotation;if(e.scale!==void 0)t.repeat.fromArray(e.scale);return t.needsUpdate=!0,t}}class Dh{constructor(){this.name=Gt.KHR_MESH_QUANTIZATION}}class ga extends gi{constructor(t,e,n,i){super(t,e,n,i)}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i*3+i;for(let r=0;r!==i;r++)e[r]=n[s+r];return e}interpolate_(t,e,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=o*2,l=o*3,c=i-e,h=(n-e)/c,u=h*h,d=u*h,f=t*l,g=f-l,_=-2*d+3*u,p=d-u,m=1-_,v=p-u+h;for(let x=0;x!==o;x++){let E=r[g+x+o],I=r[g+x+a]*c,w=r[f+x+o],A=r[f+x]*c;s[x]=m*E+v*I+_*w+p*A}return s}}var I0=new $e;class Uh extends ga{interpolate_(t,e,n,i){let s=super.interpolate_(t,e,n,i);return I0.fromArray(s).normalize().toArray(s),s}}var Qe={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ji={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ch={9728:Io,9729:Zi,9984:fc,9985:mc,9986:pc,9987:Po},hh={33071:uc,33648:dc,10497:Yi},ha={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},fa={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ni={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},P0={CUBICSPLINE:void 0,LINEAR:Lo,STEP:gc},ua={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function L0(t){if(t.DefaultMaterial===void 0)t.DefaultMaterial=new Ds({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:cc});return t.DefaultMaterial}function Si(t,e,n){for(let i in n.extensions)if(t[i]===void 0)e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=n.extensions[i]}function On(t,e){if(e.extras!==void 0)if(typeof e.extras==="object")Object.assign(t.userData,e.extras);else console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras)}function N0(t,e,n){let i=!1,s=!1,r=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0)i=!0;if(u.NORMAL!==void 0)s=!0;if(u.COLOR_0!==void 0)r=!0;if(i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(t);let o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(i){let d=u.POSITION!==void 0?n.getDependency("accessor",u.POSITION):t.attributes.position;o.push(d)}if(s){let d=u.NORMAL!==void 0?n.getDependency("accessor",u.NORMAL):t.attributes.normal;a.push(d)}if(r){let d=u.COLOR_0!==void 0?n.getDependency("accessor",u.COLOR_0):t.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];if(i)t.morphAttributes.position=h;if(s)t.morphAttributes.normal=u;if(r)t.morphAttributes.color=d;return t.morphTargetsRelative=!0,t})}function D0(t,e){if(t.updateMorphTargets(),e.weights!==void 0)for(let n=0,i=e.weights.length;n<i;n++)t.morphTargetInfluences[n]=e.weights[n];if(e.extras&&Array.isArray(e.extras.targetNames)){let n=e.extras.targetNames;if(t.morphTargetInfluences.length===n.length){t.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++)t.morphTargetDictionary[n[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function U0(t){let e,n=t.extensions&&t.extensions[Gt.KHR_DRACO_MESH_COMPRESSION];if(n)e="draco:"+n.bufferView+":"+n.indices+":"+da(n.attributes);else e=t.indices+":"+da(t.attributes)+":"+t.mode;if(t.targets!==void 0)for(let i=0,s=t.targets.length;i<s;i++)e+=":"+da(t.targets[i]);return e}function da(t){let e="",n=Object.keys(t).sort();for(let i=0,s=n.length;i<s;i++)e+=n[i]+":"+t[n[i]]+";";return e}function pa(t){switch(t){case Int8Array:return 0.007874015748031496;case Uint8Array:return 0.00392156862745098;case Int16Array:return 0.00003051850947599719;case Uint16Array:return 0.000015259021896696422;default:throw Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function F0(t){if(t.search(/\.jpe?g($|\?)/i)>0||t.search(/^data\:image\/jpeg/)===0)return"image/jpeg";if(t.search(/\.webp($|\?)/i)>0||t.search(/^data\:image\/webp/)===0)return"image/webp";if(t.search(/\.ktx2($|\?)/i)>0||t.search(/^data\:image\/ktx2/)===0)return"image/ktx2";return"image/png"}var O0=new At;class Fh{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new C0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,r=-1;if(typeof navigator<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let a=o.match(/Version\/(\d+)/);i=n&&a?parseInt(a[1],10):-1,s=o.indexOf("Firefox")>-1,r=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}if(typeof createImageBitmap>"u"||n&&i<17||s&&r<98)this.textureLoader=new ea(this.options.manager);else this.textureLoader=new ra(this.options.manager);if(this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Fr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials")this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){let n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(r){let o={scene:r[0][i.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:i.asset,parser:n,userData:{}};return Si(s,o,i),On(o,i),Promise.all(n._invokeAll(function(a){return a.afterRoot&&a.afterRoot(o)})).then(function(){for(let a of o.scenes)a.updateMatrixWorld();t(o)})}).catch(e)}_markDefs(){let t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=e.length;i<s;i++){let r=e[i].joints;for(let o=0,a=r.length;o<a;o++)t[r[o]].isBone=!0}for(let i=0,s=t.length;i<s;i++){let r=t[i];if(r.mesh!==void 0){if(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0)n[r.mesh].isSkinnedMesh=!0}if(r.camera!==void 0)this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(t,e){if(e===void 0)return;if(t.refs[e]===void 0)t.refs[e]=t.uses[e]=0;t.refs[e]++}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;let i=n.clone(),s=(r,o)=>{let a=this.associations.get(r);if(a!=null)this.associations.set(o,a);for(let[l,c]of r.children.entries())s(c,o.children[l])};return s(n,i),i.name+="_instance_"+t.uses[e]++,i}_invokeOne(t){let e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){let i=t(e[n]);if(i)return i}return null}_invokeAll(t){let e=Object.values(this.plugins);e.unshift(this);let n=[];for(let i=0;i<e.length;i++){let s=t(e[i]);if(s)n.push(s)}return n}getDependency(t,e){let n=t+":"+e,i=this.cache.get(n);if(!i){switch(t){case"scene":i=this.loadScene(e);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(e)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(e)});break;case"accessor":i=this.loadAccessor(e);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(e)});break;case"buffer":i=this.loadBuffer(e);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(e)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(e)});break;case"skin":i=this.loadSkin(e);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(e)});break;case"camera":i=this.loadCamera(e);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(t,e)}),!i)throw Error("Unknown type: "+t);break}this.cache.add(n,i)}return i}getDependencies(t){let e=this.cache.get(t);if(!e){let n=this,i=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(i.map(function(s,r){return n.getDependency(t,r)})),this.cache.add(t,e)}return e}loadBuffer(t){let e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[Gt.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(s,r){n.load(yi.resolveURL(e.uri,i.path),s,void 0,function(){r(Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){let e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){let i=e.byteLength||0,s=e.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(t){let e=this,n=this.json,i=this.json.accessors[t];if(i.bufferView===void 0&&i.sparse===void 0){let r=ha[i.type],o=ji[i.componentType],a=i.normalized===!0,l=new o(i.count*r);return Promise.resolve(new Ae(l,r,a))}let s=[];if(i.bufferView!==void 0)s.push(this.getDependency("bufferView",i.bufferView));else s.push(null);if(i.sparse!==void 0)s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView));return Promise.all(s).then(function(r){let o=r[0],a=ha[i.type],l=ji[i.componentType],c=l.BYTES_PER_ELEMENT,h=c*a,u=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,f=i.normalized===!0,g,_;if(d&&d!==h){let p=Math.floor(u/d),m="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,v=e.cache.get(m);if(!v)g=new l(o,p*d,i.count*d/c),v=new Cr(g,d/c),e.cache.add(m,v);_=new Rs(v,a,u%d/c,f)}else{if(o===null)g=new l(i.count*a);else g=new l(o,u,i.count*a);_=new Ae(g,a,f)}if(i.sparse!==void 0){let p=ha.SCALAR,m=ji[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,x=i.sparse.values.byteOffset||0,E=new m(r[1],v,i.sparse.count*p),I=new l(r[2],x,i.sparse.count*a);if(o!==null)_=new Ae(_.array.slice(),_.itemSize,_.normalized);_.normalized=!1;for(let w=0,A=E.length;w<A;w++){let U=E[w];if(_.setX(U,I[w*a]),a>=2)_.setY(U,I[w*a+1]);if(a>=3)_.setZ(U,I[w*a+2]);if(a>=4)_.setW(U,I[w*a+3]);if(a>=5)throw Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}_.normalized=f}return _})}loadTexture(t){let e=this.json,n=this.options,s=e.textures[t].source,r=e.images[s],o=this.textureLoader;if(r.uri){let a=n.manager.getHandler(r.uri);if(a!==null)o=a}return this.loadTextureImage(t,s,o)}loadTextureImage(t,e,n){let i=this,s=this.json,r=s.textures[t],o=s.images[e],a=(o.uri||o.bufferView)+":"+r.sampler;if(this.textureCache[a])return this.textureCache[a];let l=this.loadImageSource(e,n).then(function(c){if(c.flipY=!1,c.name=r.name||o.name||"",c.name===""&&typeof o.uri==="string"&&o.uri.startsWith("data:image/")===!1)c.name=o.uri;let u=(s.samplers||{})[r.sampler]||{};return c.magFilter=ch[u.magFilter]||Zi,c.minFilter=ch[u.minFilter]||Po,c.wrapS=hh[u.wrapS]||Yi,c.wrapT=hh[u.wrapT]||Yi,c.generateMipmaps=!c.isCompressedTexture&&c.minFilter!==Io&&c.minFilter!==Zi,i.associations.set(c,{textures:t}),c}).catch(function(){return null});return this.textureCache[a]=l,l}loadImageSource(t,e){let n=this,i=this.json,s=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then((h)=>h.clone());let r=i.images[t],o=self.URL||self.webkitURL,a=r.uri||"",l=!1;if(r.bufferView!==void 0)a=n.getDependency("bufferView",r.bufferView).then(function(h){l=!0;let u=new Blob([h],{type:r.mimeType});return a=o.createObjectURL(u),a});else if(r.uri===void 0)throw Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");let c=Promise.resolve(a).then(function(h){return new Promise(function(u,d){let f=u;if(e.isImageBitmapLoader===!0)f=function(g){let _=new Se(g);_.needsUpdate=!0,u(_)};e.load(yi.resolveURL(h,s.path),f,void 0,d)})}).then(function(h){if(l===!0)o.revokeObjectURL(a);return On(h,r),h.userData.mimeType=r.mimeType||F0(r.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",a),h});return this.sourceCache[t]=c,c}assignTexture(t,e,n,i){let s=this;return this.getDependency("texture",n.index).then(function(r){if(!r)return null;if(n.texCoord!==void 0&&n.texCoord>0)r=r.clone(),r.channel=n.texCoord;if(s.extensions[Gt.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[Gt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let a=s.associations.get(r);r=s.extensions[Gt.KHR_TEXTURE_TRANSFORM].extendTexture(r,o),s.associations.set(r,a)}}if(i!==void 0)r.colorSpace=i;return t[e]=r,r})}assignFinalMaterial(t){let{geometry:e,material:n}=t,i=e.attributes.tangent===void 0,s=e.attributes.color!==void 0,r=e.attributes.normal===void 0;if(t.isPoints){let o="PointsMaterial:"+n.uuid,a=this.cache.get(o);if(!a)a=new Lr,Xe.prototype.copy.call(a,n),a.color.copy(n.color),a.map=n.map,a.sizeAttenuation=!1,this.cache.add(o,a);n=a}else if(t.isLine){let o="LineBasicMaterial:"+n.uuid,a=this.cache.get(o);if(!a)a=new dn,Xe.prototype.copy.call(a,n),a.color.copy(n.color),a.map=n.map,this.cache.add(o,a);n=a}if(i||s||r){let o="ClonedMaterial:"+n.uuid+":";if(i)o+="derivative-tangents:";if(s)o+="vertex-colors:";if(r)o+="flat-shading:";let a=this.cache.get(o);if(!a){if(a=n.clone(),s)a.vertexColors=!0;if(r)a.flatShading=!0;if(i){if(a.normalScale)a.normalScale.y*=-1;if(a.clearcoatNormalScale)a.clearcoatNormalScale.y*=-1}this.cache.add(o,a),this.associations.set(a,this.associations.get(n))}n=a}t.material=n}getMaterialType(){return Ds}loadMaterial(t){let e=this,n=this.json,i=this.extensions,s=n.materials[t],r,o={},a=s.extensions||{},l=[];if(a[Gt.KHR_MATERIALS_UNLIT]){let h=i[Gt.KHR_MATERIALS_UNLIT];r=h.getMaterialType(),l.push(h.extendParams(o,s,e))}else{let h=s.pbrMetallicRoughness||{};if(o.color=new Mt(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){let u=h.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],Tn),o.opacity=u[3]}if(h.baseColorTexture!==void 0)l.push(e.assignTexture(o,"map",h.baseColorTexture,Be));if(o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0)l.push(e.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(e.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture));r=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(t,o)})))}if(s.doubleSided===!0)o.side=qi;let c=s.alphaMode||ua.OPAQUE;if(c===ua.BLEND)o.transparent=!0,o.depthWrite=!1;else if(o.transparent=!1,c===ua.MASK)o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:0.5;if(s.normalTexture!==void 0&&r!==ne){if(l.push(e.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new ot(1,1),s.normalTexture.scale!==void 0){let h=s.normalTexture.scale;o.normalScale.set(h,h)}}if(s.occlusionTexture!==void 0&&r!==ne){if(l.push(e.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0)o.aoMapIntensity=s.occlusionTexture.strength}if(s.emissiveFactor!==void 0&&r!==ne){let h=s.emissiveFactor;o.emissive=new Mt().setRGB(h[0],h[1],h[2],Tn)}if(s.emissiveTexture!==void 0&&r!==ne)l.push(e.assignTexture(o,"emissiveMap",s.emissiveTexture,Be));return Promise.all(l).then(function(){let h=new r(o);if(s.name)h.name=s.name;if(On(h,s),e.associations.set(h,{materials:t}),s.extensions)Si(i,h,s);return h})}createUniqueName(t){let e=ee.sanitizeNodeName(t||"");if(e in this.nodeNamesUsed)return e+"_"+ ++this.nodeNamesUsed[e];else return this.nodeNamesUsed[e]=0,e}loadGeometries(t){let e=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[Gt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,e).then(function(a){return uh(a,o,e)})}let r=[];for(let o=0,a=t.length;o<a;o++){let l=t[o],c=U0(l),h=i[c];if(h)r.push(h.promise);else{let u;if(l.extensions&&l.extensions[Gt.KHR_DRACO_MESH_COMPRESSION])u=s(l);else u=uh(new he,l,e);i[c]={primitive:l,promise:u},r.push(u)}}return Promise.all(r)}loadMesh(t){let e=this,n=this.json,i=this.extensions,s=n.meshes[t],r=s.primitives,o=[];for(let a=0,l=r.length;a<l;a++){let c=r[a].material===void 0?L0(this.cache):this.getDependency("material",r[a].material);o.push(c)}return o.push(e.loadGeometries(r)),Promise.all(o).then(function(a){let l=a.slice(0,a.length-1),c=a[a.length-1],h=[];for(let d=0,f=c.length;d<f;d++){let g=c[d],_=r[d],p,m=l[d];if(_.mode===Qe.TRIANGLES||_.mode===Qe.TRIANGLE_STRIP||_.mode===Qe.TRIANGLE_FAN||_.mode===void 0){if(p=s.isSkinnedMesh===!0?new Wo(g,m):new vt(g,m),p.isSkinnedMesh===!0)p.normalizeSkinWeights();if(_.mode===Qe.TRIANGLE_STRIP)p.geometry=ca(p.geometry,Tr);else if(_.mode===Qe.TRIANGLE_FAN)p.geometry=ca(p.geometry,ws)}else if(_.mode===Qe.LINES)p=new Is(g,m);else if(_.mode===Qe.LINE_STRIP)p=new bn(g,m);else if(_.mode===Qe.LINE_LOOP)p=new Ps(g,m);else if(_.mode===Qe.POINTS)p=new qo(g,m);else throw Error("THREE.GLTFLoader: Primitive mode unsupported: "+_.mode);if(Object.keys(p.geometry.morphAttributes).length>0)D0(p,s);if(p.name=e.createUniqueName(s.name||"mesh_"+t),On(p,s),_.extensions)Si(i,p,_);e.assignFinalMaterial(p),h.push(p)}for(let d=0,f=h.length;d<f;d++)e.associations.set(h[d],{meshes:t,primitives:d});if(h.length===1){if(s.extensions)Si(i,h[0],s);return h[0]}let u=new ve;if(s.extensions)Si(i,u,s);e.associations.set(u,{meshes:t});for(let d=0,f=h.length;d<f;d++)u.add(h[d]);return u})}loadCamera(t){let e,n=this.json.cameras[t],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}if(n.type==="perspective")e=new we(Fn.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2000000);else if(n.type==="orthographic")e=new As(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar);if(n.name)e.name=this.createUniqueName(n.name);return On(e,n),Promise.resolve(e)}loadSkin(t){let e=this.json.skins[t],n=[];for(let i=0,s=e.joints.length;i<s;i++)n.push(this._loadNodeShallow(e.joints[i]));if(e.inverseBindMatrices!==void 0)n.push(this.getDependency("accessor",e.inverseBindMatrices));else n.push(null);return Promise.all(n).then(function(i){let s=i.pop(),r=i,o=[],a=[];for(let l=0,c=r.length;l<c;l++){let h=r[l];if(h){o.push(h);let u=new At;if(s!==null)u.fromArray(s.array,l*16);a.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new Pr(o,a)})}loadAnimation(t){let e=this.json,n=this,i=e.animations[t],s=i.name?i.name:"animation_"+t,r=[],o=[],a=[],l=[],c=[];for(let h=0,u=i.channels.length;h<u;h++){let d=i.channels[h],f=i.samplers[d.sampler],g=d.target,_=g.node,p=i.parameters!==void 0?i.parameters[f.input]:f.input,m=i.parameters!==void 0?i.parameters[f.output]:f.output;if(g.node===void 0)continue;r.push(this.getDependency("node",_)),o.push(this.getDependency("accessor",p)),a.push(this.getDependency("accessor",m)),l.push(f),c.push(g)}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c)]).then(function(h){let u=h[0],d=h[1],f=h[2],g=h[3],_=h[4],p=[];for(let m=0,v=u.length;m<v;m++){let x=u[m],E=d[m],I=f[m],w=g[m],A=_[m];if(x===void 0)continue;if(x.updateMatrix)x.updateMatrix();let U=n._createAnimationTracks(x,E,I,w,A);if(U)for(let M=0;M<U.length;M++)p.push(U[M])}return new ta(s,void 0,p)})}createNodeMesh(t){let e=this.json,n=this,i=e.nodes[t];if(i.mesh===void 0)return null;return n.getDependency("mesh",i.mesh).then(function(s){let r=n._getNodeRef(n.meshCache,i.mesh,s);if(i.weights!==void 0)r.traverse(function(o){if(!o.isMesh)return;for(let a=0,l=i.weights.length;a<l;a++)o.morphTargetInfluences[a]=i.weights[a]});return r})}loadNode(t){let e=this.json,n=this,i=e.nodes[t],s=n._loadNodeShallow(t),r=[],o=i.children||[];for(let l=0,c=o.length;l<c;l++)r.push(n.getDependency("node",o[l]));let a=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(r),a]).then(function(l){let c=l[0],h=l[1],u=l[2];if(u!==null)c.traverse(function(d){if(!d.isSkinnedMesh)return;d.bind(u,O0)});for(let d=0,f=h.length;d<f;d++)c.add(h[d]);return c})}_loadNodeShallow(t){let e=this.json,n=this.extensions,i=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];let s=e.nodes[t],r=s.name?i.createUniqueName(s.name):"",o=[],a=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});if(a)o.push(a);if(s.camera!==void 0)o.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)}));return i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){o.push(l)}),this.nodeCache[t]=Promise.all(o).then(function(l){let c;if(s.isBone===!0)c=new Ir;else if(l.length>1)c=new ve;else if(l.length===1)c=l[0];else c=new le;if(c!==l[0])for(let h=0,u=l.length;h<u;h++)c.add(l[h]);if(s.name)c.userData.name=s.name,c.name=r;if(On(c,s),s.extensions)Si(n,c,s);if(s.matrix!==void 0){let h=new At;h.fromArray(s.matrix),c.applyMatrix4(h)}else{if(s.translation!==void 0)c.position.fromArray(s.translation);if(s.rotation!==void 0)c.quaternion.fromArray(s.rotation);if(s.scale!==void 0)c.scale.fromArray(s.scale)}if(!i.associations.has(c))i.associations.set(c,{});return i.associations.get(c).nodes=t,c}),this.nodeCache[t]}loadScene(t){let e=this.extensions,n=this.json.scenes[t],i=this,s=new ve;if(n.name)s.name=i.createUniqueName(n.name);if(On(s,n),n.extensions)Si(e,s,n);let r=n.nodes||[],o=[];for(let a=0,l=r.length;a<l;a++)o.push(i.getDependency("node",r[a]));return Promise.all(o).then(function(a){for(let c=0,h=a.length;c<h;c++)s.add(a[c]);let l=(c)=>{let h=new Map;for(let[u,d]of i.associations)if(u instanceof Xe||u instanceof Se)h.set(u,d);return c.traverse((u)=>{let d=i.associations.get(u);if(d!=null)h.set(u,d)}),h};return i.associations=l(s),s})}_createAnimationTracks(t,e,n,i,s){let r=[],o=t.name?t.name:t.uuid,a=[];if(ni[s.path]===ni.weights)t.traverse(function(u){if(u.morphTargetInfluences)a.push(u.name?u.name:u.uuid)});else a.push(o);let l;switch(ni[s.path]){case ni.weights:l=Jn;break;case ni.rotation:l=ti;break;case ni.position:case ni.scale:l=jn;break;default:switch(n.itemSize){case 1:l=Jn;break;case 2:case 3:default:l=jn;break}break}let c=i.interpolation!==void 0?P0[i.interpolation]:Lo,h=this._getArrayFromAccessor(n);for(let u=0,d=a.length;u<d;u++){let f=new l(a[u]+"."+ni[s.path],e.array,h,c);if(i.interpolation==="CUBICSPLINE")this._createCubicSplineTrackInterpolant(f);r.push(f)}return r}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){let n=pa(e.constructor),i=new Float32Array(e.length);for(let s=0,r=e.length;s<r;s++)i[s]=e[s]*n;e=i}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){return new(this instanceof ti?Uh:ga)(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function B0(t,e,n){let i=e.attributes,s=new un;if(i.POSITION!==void 0){let a=n.json.accessors[i.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(s.set(new b(l[0],l[1],l[2]),new b(c[0],c[1],c[2])),a.normalized){let h=pa(ji[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new b,l=new b;for(let c=0,h=r.length;c<h;c++){let u=r[c];if(u.POSITION!==void 0){let d=n.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let _=pa(ji[d.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}t.boundingBox=s;let o=new Je;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,t.boundingSphere=o}function uh(t,e,n){let i=e.attributes,s=[];function r(o,a){return n.getDependency("accessor",o).then(function(l){t.setAttribute(a,l)})}for(let o in i){let a=fa[o]||o.toLowerCase();if(a in t.attributes)continue;s.push(r(i[o],a))}if(e.indices!==void 0&&!t.index){let o=n.getDependency("accessor",e.indices).then(function(a){t.setIndex(a)});s.push(o)}if(Xt.workingColorSpace!==Tn&&"COLOR_0"in i)console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Xt.workingColorSpace}" not supported.`);return On(t,e),B0(t,e,n),Promise.all(s).then(function(){return e.targets!==void 0?N0(t,e.targets,n):t})}var ge={Handedness:Object.freeze({NONE:"none",LEFT:"left",RIGHT:"right"}),ComponentState:Object.freeze({DEFAULT:"default",TOUCHED:"touched",PRESSED:"pressed"}),ComponentProperty:Object.freeze({BUTTON:"button",X_AXIS:"xAxis",Y_AXIS:"yAxis",STATE:"state"}),ComponentType:Object.freeze({TRIGGER:"trigger",SQUEEZE:"squeeze",TOUCHPAD:"touchpad",THUMBSTICK:"thumbstick",BUTTON:"button"}),ButtonTouchThreshold:0.05,AxisTouchThreshold:0.1,VisualResponseProperty:Object.freeze({TRANSFORM:"transform",VISIBILITY:"visibility"})};async function Oh(t){let e=await fetch(t);if(!e.ok)throw Error(e.statusText);else return e.json()}async function z0(t){if(!t)throw Error("No basePath supplied");return await Oh(`${t}/${"profilesList.json"}`)}async function Bh(t,e,n=null,i=!0){if(!t)throw Error("No xrInputSource supplied");if(!e)throw Error("No basePath supplied");let s=await z0(e),r;if(t.profiles.some((l)=>{let c=s[l];if(c)r={profileId:l,profilePath:`${e}/${c.path}`,deprecated:!!c.deprecated};return!!r}),!r){if(!n)throw Error("No matching profile name found");let l=s[n];if(!l)throw Error(`No matching profile name found and default profile "${n}" missing.`);r={profileId:n,profilePath:`${e}/${l.path}`,deprecated:!!l.deprecated}}let o=await Oh(r.profilePath),a;if(i){let l;if(t.handedness==="any")l=o.layouts[Object.keys(o.layouts)[0]];else l=o.layouts[t.handedness];if(!l)throw Error(`No matching handedness, ${t.handedness}, in profile ${r.profileId}`);if(l.assetPath)a=r.profilePath.replace("profile.json",l.assetPath)}return{profile:o,assetPath:a}}var H0={xAxis:0,yAxis:0,button:0,state:ge.ComponentState.DEFAULT};function k0(t=0,e=0){let n=t,i=e;if(Math.sqrt(t*t+e*e)>1){let o=Math.atan2(e,t);n=Math.cos(o),i=Math.sin(o)}return{normalizedXAxis:n*0.5+0.5,normalizedYAxis:i*0.5+0.5}}class zh{constructor(t){if(this.componentProperty=t.componentProperty,this.states=t.states,this.valueNodeName=t.valueNodeName,this.valueNodeProperty=t.valueNodeProperty,this.valueNodeProperty===ge.VisualResponseProperty.TRANSFORM)this.minNodeName=t.minNodeName,this.maxNodeName=t.maxNodeName;this.value=0,this.updateFromComponent(H0)}updateFromComponent({xAxis:t,yAxis:e,button:n,state:i}){let{normalizedXAxis:s,normalizedYAxis:r}=k0(t,e);switch(this.componentProperty){case ge.ComponentProperty.X_AXIS:this.value=this.states.includes(i)?s:0.5;break;case ge.ComponentProperty.Y_AXIS:this.value=this.states.includes(i)?r:0.5;break;case ge.ComponentProperty.BUTTON:this.value=this.states.includes(i)?n:0;break;case ge.ComponentProperty.STATE:if(this.valueNodeProperty===ge.VisualResponseProperty.VISIBILITY)this.value=this.states.includes(i);else this.value=this.states.includes(i)?1:0;break;default:throw Error(`Unexpected visualResponse componentProperty ${this.componentProperty}`)}}}class Hh{constructor(t,e){if(!t||!e||!e.visualResponses||!e.gamepadIndices||Object.keys(e.gamepadIndices).length===0)throw Error("Invalid arguments supplied");this.id=t,this.type=e.type,this.rootNodeName=e.rootNodeName,this.touchPointNodeName=e.touchPointNodeName,this.visualResponses={},Object.keys(e.visualResponses).forEach((n)=>{let i=new zh(e.visualResponses[n]);this.visualResponses[n]=i}),this.gamepadIndices=Object.assign({},e.gamepadIndices),this.values={state:ge.ComponentState.DEFAULT,button:this.gamepadIndices.button!==void 0?0:void 0,xAxis:this.gamepadIndices.xAxis!==void 0?0:void 0,yAxis:this.gamepadIndices.yAxis!==void 0?0:void 0}}get data(){return{id:this.id,...this.values}}updateFromGamepad(t){if(this.values.state=ge.ComponentState.DEFAULT,this.gamepadIndices.button!==void 0&&t.buttons.length>this.gamepadIndices.button){let e=t.buttons[this.gamepadIndices.button];if(this.values.button=e.value,this.values.button=this.values.button<0?0:this.values.button,this.values.button=this.values.button>1?1:this.values.button,e.pressed||this.values.button===1)this.values.state=ge.ComponentState.PRESSED;else if(e.touched||this.values.button>ge.ButtonTouchThreshold)this.values.state=ge.ComponentState.TOUCHED}if(this.gamepadIndices.xAxis!==void 0&&t.axes.length>this.gamepadIndices.xAxis){if(this.values.xAxis=t.axes[this.gamepadIndices.xAxis],this.values.xAxis=this.values.xAxis<-1?-1:this.values.xAxis,this.values.xAxis=this.values.xAxis>1?1:this.values.xAxis,this.values.state===ge.ComponentState.DEFAULT&&Math.abs(this.values.xAxis)>ge.AxisTouchThreshold)this.values.state=ge.ComponentState.TOUCHED}if(this.gamepadIndices.yAxis!==void 0&&t.axes.length>this.gamepadIndices.yAxis){if(this.values.yAxis=t.axes[this.gamepadIndices.yAxis],this.values.yAxis=this.values.yAxis<-1?-1:this.values.yAxis,this.values.yAxis=this.values.yAxis>1?1:this.values.yAxis,this.values.state===ge.ComponentState.DEFAULT&&Math.abs(this.values.yAxis)>ge.AxisTouchThreshold)this.values.state=ge.ComponentState.TOUCHED}Object.values(this.visualResponses).forEach((e)=>{e.updateFromComponent(this.values)})}}class _a{constructor(t,e,n){if(!t)throw Error("No xrInputSource supplied");if(!e)throw Error("No profile supplied");this.xrInputSource=t,this.assetUrl=n,this.id=e.profileId,this.layoutDescription=e.layouts[t.handedness],this.components={},Object.keys(this.layoutDescription.components).forEach((i)=>{let s=this.layoutDescription.components[i];this.components[i]=new Hh(i,s)}),this.updateFromGamepad()}get gripSpace(){return this.xrInputSource.gripSpace}get targetRaySpace(){return this.xrInputSource.targetRaySpace}get data(){let t=[];return Object.values(this.components).forEach((e)=>{t.push(e.data)}),t}updateFromGamepad(){Object.values(this.components).forEach((t)=>{t.updateFromGamepad(this.xrInputSource.gamepad)})}}var G0="https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles",V0="generic-trigger";class Gh extends le{constructor(){super();this.motionController=null,this.envMap=null}setEnvironmentMap(t){if(this.envMap==t)return this;return this.envMap=t,this.traverse((e)=>{if(e.isMesh)e.material.envMap=this.envMap,e.material.needsUpdate=!0}),this}updateMatrixWorld(t){if(super.updateMatrixWorld(t),!this.motionController)return;this.motionController.updateFromGamepad(),Object.values(this.motionController.components).forEach((e)=>{Object.values(e.visualResponses).forEach((n)=>{let{valueNode:i,minNode:s,maxNode:r,value:o,valueNodeProperty:a}=n;if(!i)return;if(a===ge.VisualResponseProperty.VISIBILITY)i.visible=o;else if(a===ge.VisualResponseProperty.TRANSFORM)i.quaternion.slerpQuaternions(s.quaternion,r.quaternion,o),i.position.lerpVectors(s.position,r.position,o)})})}}function W0(t,e){Object.values(t.components).forEach((n)=>{let{type:i,touchPointNodeName:s,visualResponses:r}=n;if(i===ge.ComponentType.TOUCHPAD)if(n.touchPointNode=e.getObjectByName(s),n.touchPointNode){let o=new mn(0.001),a=new ne({color:255}),l=new vt(o,a);n.touchPointNode.add(l)}else console.warn(`Could not find touch dot, ${n.touchPointNodeName}, in touchpad component ${n.id}`);Object.values(r).forEach((o)=>{let{valueNodeName:a,minNodeName:l,maxNodeName:c,valueNodeProperty:h}=o;if(h===ge.VisualResponseProperty.TRANSFORM){if(o.minNode=e.getObjectByName(l),o.maxNode=e.getObjectByName(c),!o.minNode){console.warn(`Could not find ${l} in the model`);return}if(!o.maxNode){console.warn(`Could not find ${c} in the model`);return}}if(o.valueNode=e.getObjectByName(a),!o.valueNode)console.warn(`Could not find ${a} in the model`)})})}function kh(t,e){if(W0(t.motionController,e),t.envMap)e.traverse((n)=>{if(n.isMesh)n.material.envMap=t.envMap,n.material.needsUpdate=!0});t.add(e)}class xa{constructor(t=null,e=null){if(this.gltfLoader=t,this.path=G0,this._assetCache={},this.onLoad=e,!this.gltfLoader)this.gltfLoader=new ma}setPath(t){return this.path=t,this}createControllerModel(t){let e=new Gh,n=null;return t.addEventListener("connected",(i)=>{let s=i.data;if(s.targetRayMode!=="tracked-pointer"||!s.gamepad||s.hand)return;Bh(s,this.path,V0).then(({profile:r,assetPath:o})=>{e.motionController=new _a(s,r,o);let a=this._assetCache[e.motionController.assetUrl];if(a){if(n=a.scene.clone(),kh(e,n),this.onLoad)this.onLoad(n)}else{if(!this.gltfLoader)throw Error("GLTFLoader not set.");this.gltfLoader.setPath(""),this.gltfLoader.load(e.motionController.assetUrl,(l)=>{if(this._assetCache[e.motionController.assetUrl]=l,n=l.scene.clone(),kh(e,n),this.onLoad)this.onLoad(n)},null,()=>{throw Error(`Asset ${e.motionController.assetUrl} missing or malformed.`)})}}).catch((r)=>{console.warn(r)})}),t.addEventListener("disconnected",()=>{e.motionController=null,e.remove(n),n=null}),e}}var zt={L:105,W:68,HL:52.5,HW:34},ie={x:zt.HL,halfWidth:3.66,height:2.44},Wh={shirt:16742938,shorts:1382170,socks:16742938,number:"#15171a"},Xh={shirt:2047884,shorts:15921384,socks:2047884,number:"#f2f0e8"},qh={shirt:2871678,shorts:1382170,socks:2871678,number:"#15171a"},Yh={shirt:15262266,shorts:1382170,socks:15262266,number:"#15171a"},Mi=[["GK",-47,0,1],["LB",-26,-22,3],["LCB",-31,-8,5],["RCB",-31,8,4],["RB",-26,22,2],["CDM",-19,0,6],["LCM",-10,-11,8],["RCM",-10,11,10],["LW",4,-24,11],["ST",8,0,9],["RW",4,24,7]],X0=[["GK",-47,0,1],["LB",-26,-22,3],["LCB",-31,-8,5],["RCB",-31,8,4],["RB",-26,22,2],["LDM",-18,-7,6],["RDM",-18,7,8],["CAM",-3,0,10],["LW",3,-23,11],["ST",9,0,9],["RW",3,23,7]],Bn=[["GK",49,0,1],["RB",24,-20,2],["RCB",26,-7,5],["LCB",26,7,4],["LB",24,20,3],["RM",10,-21,7],["RCM",12,-7,8],["LCM",12,7,6],["LM",10,21,11],["ST2",-4,-6,9],["ST1",-2,6,10]],He={CB:{name:"CENTRE BACK",formation:Mi,slots:["LCB","RCB"],ballX:-30,group:"def"},FB:{name:"FULL BACK",formation:Mi,slots:["LB","RB"],ballX:-22,group:"def"},CDM:{name:"HOLDING MID",formation:Mi,slots:["CDM"],ballX:-18,group:"def"},CM:{name:"CENTRAL MID",formation:Mi,slots:["LCM","RCM"],ballX:-9,group:"mid"},CAM:{name:"NUMBER 10",formation:X0,slots:["CAM"],ballX:2,group:"att"},W:{name:"WINGER",formation:Mi,slots:["LW","RW"],ballX:10,group:"att"},ST:{name:"STRIKER",formation:Mi,slots:["ST"],ballX:14,group:"att"},GK:{name:"GOALKEEPER",formation:Mi,slots:["GK"],ballX:-40,group:"def",anchor:28}},Zh=Object.keys(He),ya={EASY:{passes:[3,3],presserSpeed:5.4,presserDist:[11,13],window:3.6,scanTarget:2,pressers:1,jitter:1},MEDIUM:{passes:[2,3],presserSpeed:6.2,presserDist:[9,11],window:2.9,scanTarget:3,pressers:1,jitter:1.6},HARD:{passes:[2,2],presserSpeed:6.9,presserDist:[7,9],window:2.3,scanTarget:3,pressers:2,jitter:2.2},ELITE:{passes:[1,2],presserSpeed:7.5,presserDist:[5.5,7],window:1.8,scanTarget:4,pressers:2,jitter:2.8}},va=Object.keys(ya),Sa=["ACADEMY","RESERVES","FIRST TEAM","INTERNATIONAL"],Vh=["CM","CB","W","CDM","FB","ST","CAM","CM","W","CB","ST","CAM"],Qi=Array.from({length:24},(t,e)=>({index:e,stage:Math.floor(e/6),role:Vh[e%Vh.length],difficulty:va[Math.floor(e/6)],reps:6,quizChance:e%6===4?0.8:0.3,drill:e%6===2?"rondo":e%6===4?"awareness":"match"})),Kh=[55,70,85],Lt={font:'"Barlow Condensed", "Arial Narrow", sans-serif',body:'"Barlow", "Helvetica Neue", sans-serif',bg:"rgba(14,17,16,0.94)",card:"#1b2120",cardHi:"#27302e",line:"rgba(242,240,232,0.12)",text:"#f2f0e8",dim:"rgba(242,240,232,0.55)",accent:"#ff7a1a",good:"#4fd88a",bad:"#ff5a4f"};var _n=6;function q0(){let e=(zt.L+_n*2)*18,n=(zt.W+_n*2)*18,i=document.createElement("canvas");i.width=e,i.height=n;let s=i.getContext("2d");s.fillStyle="#245a22",s.fillRect(0,0,e,n);let r=18,o=zt.L*18/r;for(let d=0;d<r;d++)s.fillStyle=d%2?"#2b6a28":"#276124",s.fillRect(_n*18+d*o,0,o,n);let a=s.getImageData(0,0,e,n);for(let d=0;d<a.data.length;d+=4){let f=(Math.random()-0.5)*10;a.data[d]+=f,a.data[d+1]+=f,a.data[d+2]+=f*0.6}s.putImageData(a,0,0);let l=(d)=>(d+zt.HL+_n)*18,c=(d)=>(d+zt.HW+_n)*18,h=(d)=>d*18;s.strokeStyle="rgba(245,245,238,0.92)",s.lineWidth=h(0.12),s.strokeRect(l(-zt.HL),c(-zt.HW),h(zt.L),h(zt.W)),s.beginPath(),s.moveTo(l(0),c(-zt.HW)),s.lineTo(l(0),c(zt.HW)),s.stroke(),s.beginPath(),s.arc(l(0),c(0),h(9.15),0,Math.PI*2),s.stroke(),s.fillStyle="rgba(245,245,238,0.92)";for(let d of[-1,1]){let f=d*zt.HL;s.strokeRect(Math.min(l(f),l(f-d*16.5)),c(-20.16),h(16.5),h(40.32)),s.strokeRect(Math.min(l(f),l(f-d*5.5)),c(-9.16),h(5.5),h(18.32)),s.beginPath(),s.arc(l(f-d*11),c(0),h(0.2),0,Math.PI*2),s.fill(),s.beginPath();let g=Math.acos(0.6010928961748634);if(d>0)s.arc(l(f-11),c(0),h(9.15),Math.PI-g,Math.PI+g);else s.arc(l(f+11),c(0),h(9.15),-g,g);s.stroke()}s.beginPath(),s.arc(l(0),c(0),h(0.2),0,Math.PI*2),s.fill();let u=new fn(i);return u.colorSpace=Be,u.anisotropy=8,u}function $h(t,e){let n=new qe({color:16053487}),i=0.06,s=e*ie.x,r=new Qn(0.06,0.06,ie.height,10);for(let u of[-ie.halfWidth,ie.halfWidth]){let d=new vt(r,n);d.position.set(s,ie.height/2,u),t.add(d)}let o=new vt(new Qn(0.06,0.06,ie.halfWidth*2,10),n);o.rotation.x=Math.PI/2,o.position.set(s,ie.height,0),t.add(o);let a=2,l=[],c=s+e*a;for(let u=-ie.halfWidth;u<=ie.halfWidth+0.01;u+=0.35)l.push(s,ie.height,u,c,ie.height*0.6,u,c,ie.height*0.6,u,c,0,u);for(let u=0;u<=ie.height+0.01;u+=0.35){let d=c,f=Math.min(u,ie.height*0.6);l.push(d,f,-ie.halfWidth,d,f,ie.halfWidth),l.push(s,u,-ie.halfWidth,d,f,-ie.halfWidth,s,u,ie.halfWidth,d,f,ie.halfWidth)}let h=new he;h.setAttribute("position",new Jt(l,3)),t.add(new Is(h,new dn({color:14606296,transparent:!0,opacity:0.45})))}function Y0(t){let e=new qe({color:2764081}),n=new qe({color:1382170}),i=new ze(0.45,0.6,0.35),s=new qe,r=[],o=[{cx:0,cz:-(zt.HW+_n+2),len:zt.L+20,rot:0},{cx:0,cz:zt.HW+_n+2,len:zt.L+20,rot:Math.PI},{cx:-(zt.HL+_n+2),cz:0,len:zt.W+8,rot:Math.PI/2},{cx:zt.HL+_n+2,cz:0,len:zt.W+8,rot:-Math.PI/2}],a=22,l=0.85,c=0.48;for(let g of o){let _=new ve;_.position.set(g.cx,0,g.cz),_.rotation.y=g.rot;let p=18.7,m=10.559999999999999,v=new vt(new ze(g.len,0.4,Math.hypot(p,m)),e);v.rotation.x=Math.atan2(m,p),v.position.set(0,1.2+m/2,-p/2),_.add(v);let x=new vt(new ze(g.len,1.1,0.3),new qe({color:1053204}));x.position.set(0,0.55,0.2),_.add(x);let E=new vt(new ze(g.len,0.5,p+6),n);E.position.set(0,m+7,-p/2+1),E.rotation.x=-0.08,_.add(E);let I=new vt(new ze(g.len,m+8,0.5),n);I.position.set(0,(m+8)/2,-p-0.6),_.add(I),t.add(_),_.updateMatrixWorld();for(let w=0;w<22;w++)for(let A=-g.len/2+0.5;A<g.len/2-0.5;A+=0.55){if(Math.random()<0.18)continue;let U=new b(A+(Math.random()-0.5)*0.1,1.55+w*0.48+0.3,-0.4-w*0.85);r.push(U.applyMatrix4(_.matrixWorld))}}let h=new Cs(i,s,r.length),u=new At,d=new Mt,f=[16742938,16742938,1382170,14276300,3817286,7031610,11684394,2047884,2763306];return r.forEach((g,_)=>{u.makeRotationY(Math.atan2(-g.x,-g.z)+(Math.random()-0.5)*0.4),u.setPosition(g),h.setMatrixAt(_,u),h.setColorAt(_,d.setHex(f[Math.random()*f.length|0]).multiplyScalar(0.55+Math.random()*0.45))}),t.add(h),h}function Z0(t){let e=new qe({color:3816770}),n=new ne({color:16776170});for(let i of[-1,1])for(let s of[-1,1]){let r=i*(zt.HL+14),o=s*(zt.HW+26),a=new vt(new Qn(0.5,0.8,42,8),e);a.position.set(r,21,o),t.add(a);let l=new vt(new ze(8,4,0.6),n);l.position.set(r,43,o),l.lookAt(0,0,0),t.add(l)}}function K0(t){let e=document.createElement("canvas");e.width=1024,e.height=64;let n=e.getContext("2d");n.fillStyle="#0d0f11",n.fillRect(0,0,1024,64),n.fillStyle="#ff7a1a",n.font='700 44px "Barlow Condensed", sans-serif',n.textBaseline="middle";for(let o=20;o<1024;o+=256)n.fillText("HEADS UP",o,34);let i=new fn(e);i.colorSpace=Be,i.wrapS=Yi;let s=new ne({map:i}),r=(o,a,l,c)=>{let h=i.clone();h.needsUpdate=!0,h.repeat.set(o/40,1);let u=new vt(new De(o,0.9),new ne({map:h}));u.position.set(a,0.45,l),u.rotation.y=c,t.add(u)};r(zt.L,0,-(zt.HW+4),0),r(zt.L,0,zt.HW+4,Math.PI),r(zt.W-12,-(zt.HL+4),0,Math.PI/2),r(zt.W-12,zt.HL+4,0,-Math.PI/2),s.dispose()}function Jh(t){t.background=new Mt(461067),t.fog=new Rr(461067,120,260),t.add(new na(14673646,1845784,1.15));let e=new Fs(16774886,1.6);e.position.set(-30,60,20),t.add(e);let n=q0(),i=new vt(new De(zt.L+_n*2,zt.W+_n*2),new qe({map:n}));i.rotation.x=-Math.PI/2,t.add(i);let s=new vt(new De(400,400),new qe({color:1714713}));s.rotation.x=-Math.PI/2,s.position.y=-0.02,t.add(s),$h(t,1),$h(t,-1),Y0(t),Z0(t),K0(t)}var jh=[15845285,14263422,11565650,9067066,6175525],Qh=[1709072,3877404,7031338,921102,11045466],Pe={torso:new mi(0.2,0.42,4,10),shorts:new Qn(0.21,0.23,0.26,10),thigh:new mi(0.085,0.32,3,8),shin:new mi(0.07,0.34,3,8),boot:new ze(0.11,0.07,0.26),arm:new mi(0.06,0.48,3,8),head:new mn(0.12,14,10),hair:new mn(0.125,14,8,0,Math.PI*2,0,Math.PI*0.55),number:new De(0.26,0.26),shadow:new Ji(0.45,20),ring:new Ur(0.62,0.8,32)};Pe.thigh.translate(0,-0.21,0);Pe.shin.translate(0,-0.22,0);Pe.arm.translate(0,-0.27,0);var Ma=new Map,ts=(t)=>{if(!Ma.has(t))Ma.set(t,new qe({color:t}));return Ma.get(t)},tu=new ne({color:0,transparent:!0,opacity:0.35,depthWrite:!1}),$0=ts(1118481);function J0(t,e){let n=document.createElement("canvas");n.width=n.height=128;let i=n.getContext("2d");i.fillStyle=e,i.font='800 104px "Barlow Condensed", sans-serif',i.textAlign="center",i.textBaseline="middle",i.fillText(String(t),64,70);let s=new fn(n);return s.colorSpace=Be,s}class Br{constructor(t,{kit:e,number:n,team:i,slot:s}){this.team=i,this.slot=s,this.number=n,this.pos=new b,this.vel=new b,this.target=new b,this.heading=0,this.maxSpeed=6.5,this.phase=Math.random()*10,this.wobble=Math.random()*100,this.mood=0,this.cel=0,this.dej=0;let r=new ve,o=new ve;r.add(o);let a=ts(jh[Math.random()*jh.length|0]),l=ts(e.shirt),c=ts(e.shorts),h=ts(e.socks),u=new vt(Pe.torso,l);u.position.y=1.22,u.scale.set(1.05,1,0.72),o.add(u);let d=new vt(Pe.shorts,c);d.position.y=0.88,d.scale.z=0.75,o.add(d);let f=new vt(Pe.head,a);f.position.y=1.68,o.add(f),this.head=f;let g=new vt(Pe.hair,ts(Qh[Math.random()*Qh.length|0]));g.position.y=1.7,g.rotation.x=-0.25,o.add(g),this.hair=g;let _=(w)=>{let A=new ve;A.position.set(w*0.1,0.84,0);let U=new vt(Pe.thigh,a);A.add(U);let M=new ve;M.position.y=-0.42;let T=new vt(Pe.shin,h);M.add(T);let C=new vt(Pe.boot,$0);return C.position.set(0,-0.44,0.05),M.add(C),A.add(M),o.add(A),{hip:A,knee:M}},p=(w)=>{let A=new ve;A.position.set(w*0.27,1.45,0);let U=new vt(Pe.arm,a);A.add(U);let M=new vt(Pe.thigh,l);return M.scale.set(0.9,0.42,0.9),A.add(M),A.rotation.z=w*0.12,o.add(A),A};this.legs=[_(-1),_(1)],this.arms=[p(-1),p(1)];let m=J0(n,e.number),v=new ne({map:m,transparent:!0,depthWrite:!1}),x=new vt(Pe.number,v);x.position.set(0,1.28,-0.155),x.rotation.y=Math.PI,o.add(x);let E=new vt(Pe.number,v);E.scale.setScalar(0.45),E.position.set(0.07,1.36,0.155),o.add(E);let I=new vt(Pe.shadow,tu);I.rotation.x=-Math.PI/2,I.position.y=0.012,r.add(I),this.ringMat=new ne({color:16777215,transparent:!0,opacity:0,depthWrite:!1}),this.ring=new vt(Pe.ring,this.ringMat),this.ring.rotation.x=-Math.PI/2,this.ring.position.y=0.02,r.add(this.ring),this.root=r,this.body=o,t.add(r)}place(t,e){this.pos.set(t,0,e),this.target.copy(this.pos),this.vel.set(0,0,0),this.mood=0,this.cel=0,this.dej=0,this.sync()}highlight(t,e){this.ringMat.color.setHex(t),this.ringMat.opacity=e}step(t,e){let n=this.target.clone().sub(this.pos);n.y=0;let i=n.length(),s=i>0.05?n.multiplyScalar(Math.min(this.maxSpeed,i*1.6)/i):n.set(0,0,0),r=9,o=s.sub(this.vel),a=o.length();if(a>r*t)o.multiplyScalar(r*t/a);this.vel.add(o),this.pos.addScaledVector(this.vel,t);let l=this.vel.length(),c=this.heading;if(l>1.6)c=Math.atan2(this.vel.x,this.vel.z);else if(e)c=Math.atan2(e.x-this.pos.x,e.z-this.pos.z);let h=c-this.heading;h=Math.atan2(Math.sin(h),Math.cos(h)),this.heading+=h*Math.min(1,t*7),this.animate(t,l,this.mood===1),this.sync()}animate(t,e,n=!1){let i=Math.min(1,t*8);this.cel+=((n?1:0)-this.cel)*i,this.dej+=((this.mood===2?1:0)-this.dej)*i;let s=this.cel,r=this.dej;this.phase+=t*(3+e*1.55);let o=Math.min(1,e/6)*0.85,a=Math.sin(this.phase);this.legs[0].hip.rotation.x=a*o,this.legs[1].hip.rotation.x=-a*o,this.legs[0].knee.rotation.x=Math.max(0,-Math.cos(this.phase))*o*1.3+0.08,this.legs[1].knee.rotation.x=Math.max(0,Math.cos(this.phase))*o*1.3+0.08;let l=a*o*0.9*(1-0.5*r),c=Math.sin(this.phase*1.6)*0.18;this.arms[0].rotation.x=-l*(1-s)+(-2.6+c)*s,this.arms[1].rotation.x=l*(1-s)+(-2.6-c)*s,this.arms[0].rotation.z=-(0.12+0.45*s),this.arms[1].rotation.z=0.12+0.45*s,this.body.position.y=Math.abs(Math.cos(this.phase))*o*0.06+Math.abs(Math.sin(this.phase*1.2))*0.14*s,this.body.rotation.x=o*0.16+0.22*r,this.head.rotation.x=0.5*r,this.head.position.y=1.68-0.05*r,this.hair.position.y=1.7-0.05*r}sync(){this.root.position.set(this.pos.x,0,this.pos.z),this.root.rotation.y=this.heading}setVisible(t){this.root.visible=t}}class Ea{constructor(t){let e=document.createElement("canvas");e.width=256,e.height=128;let n=e.getContext("2d");n.fillStyle="#f6f5ef",n.fillRect(0,0,256,128),n.fillStyle="#17191c";for(let s=0;s<14;s++){let r=s*37%256,o=18+s*53%96;n.beginPath();for(let a=0;a<5;a++){let l=a/5*Math.PI*2;n.lineTo(r+Math.cos(l)*11,o+Math.sin(l)*11)}n.fill()}let i=new fn(e);i.colorSpace=Be,this.mesh=new vt(new mn(0.11,20,14),new qe({map:i})),this.shadow=new vt(Pe.shadow,tu),this.shadow.scale.setScalar(0.3),this.shadow.rotation.x=-Math.PI/2,this.shadow.position.y=0.011,t.add(this.mesh,this.shadow),this.pos=new b(0,0.11,0),this.flight=null}kick(t,e,n,i=0){let s=Math.hypot(e.x-t.x,e.z-t.z);this.flight={from:t.clone(),to:e.clone(),t:0,dur:Math.max(0.25,s/n),loft:i},this.flight.from.y=0.11,this.flight.to.y=0.11}update(t){if(!this.flight)return!1;let e=this.flight;e.t+=t;let n=Math.min(1,e.t/e.dur),i=this.pos.clone();this.pos.lerpVectors(e.from,e.to,e.loft?n:n*(1.15-0.15*n)),this.pos.y=0.11+(e.loft?Math.sin(Math.PI*n)*e.loft:0);let s=i.distanceTo(this.pos),r=new b(e.to.z-e.from.z,0,-(e.to.x-e.from.x)).normalize();if(this.mesh.rotateOnWorldAxis(r,s/0.11),this.sync(),n>=1)return this.flight=null,!0;return!1}timeLeft(){return this.flight?this.flight.dur-this.flight.t:0}set(t,e,n=0.11){this.pos.set(t,n,e),this.flight=null,this.sync()}sync(){this.mesh.position.copy(this.pos),this.shadow.position.set(this.pos.x,0.011,this.pos.z)}}var es=new b,j0=new $e;class Ta{constructor(t,e,n){this.scene=t,this.rig=e,this.camera=n,this.homeSets=new Map;for(let i of Object.values(He)){if(this.homeSets.has(i.formation))continue;this.homeSets.set(i.formation,i.formation.map(([s,,,r])=>new Br(t,{kit:s==="GK"?qh:Wh,number:r,team:"home",slot:s})))}this.away=Bn.map(([i,,,s])=>new Br(t,{kit:i==="GK"?Yh:Xh,number:s,team:"away",slot:i})),this.ball=new Ea(t),this.rondoSquare=new Ps(new he().setFromPoints([new b(-0.5,0.04,-0.5),new b(0.5,0.04,-0.5),new b(0.5,0.04,0.5),new b(-0.5,0.04,0.5)]),new dn({color:16777215,transparent:!0,opacity:0.6})),this.rondoSquare.visible=!1,t.add(this.rondoSquare),this.home=null,this.useFormation(He.CM.formation),this.idle(),this.buildOverlays()}useFormation(t){for(let[e,n]of this.homeSets)n.forEach((i)=>i.setVisible(e===t));this.away.forEach((e)=>e.setVisible(!0)),this.rondoSquare.visible=!1,this.home=this.homeSets.get(t)}idle(){this.home.forEach((t,e)=>{let[,n,i]=He.CM.formation[e]||[0,0,0];t.place(n*0.9,i),t.setVisible(!0)}),this.away.forEach((t,e)=>{t.setVisible(!0),t.place(Bn[e][1]*0.9,Bn[e][2])}),this.ball.set(0,0),this.idleT=0}showRondo(t,e=0,n=0,i=12){this.rondoSquare.visible=t,this.rondoSquare.position.set(e,0,n),this.rondoSquare.scale.set(i,1,i)}idleStep(t){this.rondoSquare.visible=!1,this.idleT+=t;let e=this.idleT,n=Math.sin(e*0.07)*18,i=Math.sin(e*0.11)*14;this.ball.set(n,i),[...this.home,...this.away].forEach((r,o)=>{let[,a,l]=(r.team==="home"?He.CM.formation:Bn)[o%11];r.maxSpeed=3,r.target.set(a+n*0.5+Math.sin(e*0.3+o)*1.5,0,l*0.85+i*0.3),r.step(t,this.ball.pos)})}userPos(t=new b){return this.camera.getWorldPosition(t),t.y=0,t}headHeight(){return this.camera.getWorldPosition(es),es.y}headYaw(){return this.camera.getWorldDirection(es),Math.atan2(es.x,es.z)}headDir(t=new b){return this.camera.getWorldDirection(t),t.y=0,t.normalize()}placeUser(t,e){let n=es.set(0,0,-1).applyQuaternion(this.camera.quaternion),i=Math.atan2(n.x,n.z);this.rig.rotation.set(0,e-i,0),this.rig.updateMatrixWorld(!0);let s=this.camera.position.clone();s.y=0,s.applyQuaternion(j0.setFromEuler(this.rig.rotation)),this.rig.position.set(t.x-s.x,this.rig.position.y,t.z-s.z),this.rig.updateMatrixWorld(!0)}moveUser(t,e){this.rig.position.x+=t,this.rig.position.z+=e}buildOverlays(){let t=new Ji(9,24,-Math.PI/2-Fn.degToRad(50),Fn.degToRad(100));t.rotateX(-Math.PI/2),this.cone=new vt(t,new ne({color:16769162,transparent:!0,opacity:0.28,depthWrite:!1})),this.cone.position.y=0.03,this.cone.visible=!1,this.scene.add(this.cone);let e=(n)=>new dn({color:n,transparent:!0,opacity:0.95});this.bestLine=new bn(new he().setFromPoints([new b,new b]),e(5232778)),this.choiceLine=new bn(new he().setFromPoints([new b,new b]),e(16777215)),this.bestLine.visible=this.choiceLine.visible=!1,this.scene.add(this.bestLine,this.choiceLine),this.goalGlow=new vt(new De(7.32,2.44),new ne({color:16777215,transparent:!0,opacity:0.18,side:qi,depthWrite:!1})),this.goalGlow.position.set(52.55,1.22,0),this.goalGlow.rotation.y=Math.PI/2,this.goalGlow.visible=!1,this.scene.add(this.goalGlow)}setLine(t,e,n){if(!e||!n){t.visible=!1;return}let i=t.geometry.attributes.position;i.setXYZ(0,e.x,0.06,e.z),i.setXYZ(1,n.x,0.06,n.z),i.needsUpdate=!0,t.geometry.computeBoundingSphere(),t.visible=!0}clearOverlays(){this.cone.visible=!1,this.bestLine.visible=this.choiceLine.visible=!1,this.goalGlow.visible=!1,[...this.home,...this.away].forEach((t)=>t.highlight(16777215,0))}}var tn=(t,e,n)=>Math.max(e,Math.min(n,t)),Q0=17,zs=28,eu=27;function ns(t,e,n,i,s){let r=e.x-t.x,o=e.z-t.z,a=Math.hypot(r,o)||1,l=((n.x-t.x)*r+(n.z-t.z)*o)/(a*a);if(l=tn(l,0,1),s&&l<0.8)l=0.8;let c=t.x+r*l,h=t.z+o*l,u=Math.hypot(n.x-c,n.z-h),d=a*l/i,f=Math.max(0,d-0.22)*6.2+0.9;return u-f}function ba(t,e,n,i,s){let r=1/0,o=null;for(let a of n){let l=ns(t,e,a.pos,i,s);if(l<r)r=l,o=a}return{m:r,who:o}}var wa=(t,e)=>e.reduce((n,i)=>Math.min(n,Math.hypot(i.pos.x-t.x,i.pos.z-t.z)),1/0),t_={safe:0.58,space:0.24,prog:0.12,lines:0.06},e_={def:{safe:0.5,space:0.25,prog:0.15,lines:0.1},mid:{safe:0.4,space:0.25,prog:0.2,lines:0.15},att:{safe:0.34,space:0.2,prog:0.26,lines:0.2}};function nu(t,e,n,i,s={}){let r=!!s.keeper,o=r?t_:e_[i],a=n.filter((u)=>u.slot!=="GK"),l=[];for(let u of e){let d=Math.hypot(u.pos.x-t.x,u.pos.z-t.z);if(d<3)continue;let f=d>zs,g=f?21:Q0,{m:_,who:p}=ba(t,u.pos,n,g,f),m=tn((_+0.4)/3.4,0,1)*(f?0.85:1),v=tn((wa(u.pos,n)-1.5)/7,0,1),x=tn((u.pos.x-t.x+8)/30,0,1),E=Math.min(t.x,u.pos.x),I=Math.max(t.x,u.pos.x),w=u.pos.x>t.x?a.filter((M)=>M.pos.x>E+1&&M.pos.x<I-1).length:0,A=tn(w/4,0,1),U=o.safe*m+o.space*v+o.prog*x+o.lines*A;if(m<0.25)U*=0.45;if(u.slot==="GK")U*=0.7;if(r){let M=wa(u.pos,n);if(M<4)U*=0.6;if(f&&M<6)U*=0.65}l.push({kind:"pass",target:u,value:U,safe:m,space:v,prog:x,lines:A,margin:_,threat:p,lofted:f,speed:g})}let c=ie.x,h=Math.hypot(c-t.x,t.z);if(h<30&&t.x>20){let u=Math.atan2(-ie.halfWidth-t.z,c-t.x),d=Math.atan2(ie.halfWidth-t.z,c-t.x),f=Math.abs(d-u),g={x:c,z:tn(t.z*0.2,-2.6,2.6)},{m:_}=ba(t,g,a,eu,!1),p=tn((_+0.2)/1.6,0,1),m=tn(f/0.55,0,1)*tn((30-h)/18,0,1);l.push({kind:"shot",target:null,aim:g,value:m*(0.25+0.75*p)*1.05,quality:m,open:p,margin:_,speed:eu})}return l.sort((u,d)=>d.value-u.value),l}function iu(t,e){if(!t||!e.length)return 0;let n=e[0].value||0.000001;return Math.round(tn(t.value/n*100,0,100))}function su(t,e,n,i=16){let s=[];for(let r of e){if(Math.hypot(r.pos.x-t.x,r.pos.z-t.z)<2)continue;let{m:o,who:a}=ba(t,r.pos,n,i,!1),l=tn((o+0.4)/2.6,0,1),c=tn((wa(r.pos,n)-1.5)/5,0,1),h=0.75*l+0.25*c;if(l<0.2)h*=0.4;s.push({kind:"pass",target:r,value:h,safe:l,space:c,prog:0,lines:0,margin:o,threat:a,lofted:!1,speed:i})}return s.sort((r,o)=>o.value-r.value),s}var ue=(t,e)=>t+Math.random()*(e-t),ru=(t)=>t[Math.random()*t.length|0],xn=(t,e,n)=>Math.max(e,Math.min(n,t)),zn=(t,e)=>Math.abs(Math.atan2(Math.sin(t-e),Math.cos(t-e))),en=(t,e)=>Math.atan2(e.x-t.x,e.z-t.z),ke=Math.PI/180,n_=58*ke,ou=35*ke,au=48*ke;function i_(t,e,n,i,s=0){let[r,o,a]=t;if(r==="GK")return new b(xn(-47+(e+52)*0.06,-49.5,-40),0,xn(n*0.12,-4,4));let l=o+(e+s)*0.5,c=a*0.9+n*0.3;if(l>i-0.6&&e<i)l=i-0.6;return new b(xn(l,-50,50),0,xn(c,-32,32))}function Aa(t,e,n){let[i,s,r]=t;if(i==="GK")return new b(49-Math.max(0,e-15)*0.05,0,n*0.12);let o=s+e*0.55,a=r*0.75+n*0.4;return new b(xn(o,-48,48),0,xn(a,-32,32))}class Hs{constructor(t,{role:e,difficulty:n,quiz:i,motion:s,fx:r}){this.world=t,this.roleKey=e,this.role=He[e],this.diff=ya[n],this.quizWanted=i,this.motion=s,this.fx=r||{},this.state="setup",this.t=0,this.drillKey="match",this.shift=this.role.anchor||0,this.keeper=e==="GK",this.windowScale=1,this.outcomeLen=2.2,this.holdRange=[0.7,1.3]}ht(t,e,n,i){return i_(this.F[t],e,n,i,this.shift)}evaluate(t){return nu(t,this.mates,this.away,this.role.group,{keeper:this.keeper})}start(){let t=this.world,e=this.role,n=this.diff;t.useFormation(e.formation),t.clearOverlays(),this.outcomeArrived=!1,this.touchT=0,this.F=e.formation,this.home=t.home,this.away=t.away,this.slotName=ru(e.slots),this.userIdx=this.F.findIndex((v)=>v[0]===this.slotName),this.userBody=this.home[this.userIdx],this.userBody.setVisible(!1),this.mates=this.home.filter((v,x)=>x!==this.userIdx),this.opps=this.away;let i=this.slotName.startsWith("L")?-1:this.slotName.startsWith("R")?1:Math.random()<0.5?-1:1,s=e.slots.length===1&&!["W"].includes(this.roleKey),r=e.ballX+ue(-4,4),o=s?ue(-12,12):i*ue(5,16),a=this.roleKey==="CB",l=this.mates.filter((v)=>a||v.slot!=="GK");if(this.keeper)l=l.filter((v)=>/CB|LB|RB/.test(v.slot));let c=30+r*0.55-4,h=this.F.map((v,x)=>this.ht(x,r,o,c)),u=l.map((v)=>({p:v,d:h[this.home.indexOf(v)].distanceTo(new b(r,0,o))})).sort((v,x)=>v.d-x.d);this.carrier=u[Math.random()<0.7?0:1].p;let d=h[this.home.indexOf(this.carrier)];r=d.x,o=d.z;let f=Math.min(...Bn.slice(1,5).map((v)=>Aa(v,r,o).x));this.home.forEach((v,x)=>{let E=this.ht(x,r,o,f);v.place(E.x+ue(-1,1)*n.jitter,E.z+ue(-1,1)*n.jitter),v.maxSpeed=6.2,v.wobble=Math.random()*100}),this.away.forEach((v,x)=>{let E=Aa(Bn[x],r,o);v.place(E.x+ue(-1,1)*n.jitter,E.z+ue(-1,1)*n.jitter),v.maxSpeed=6.2,v.role=null});let g=this.userBody.pos.clone();this.ballAt(this.carrier),t.placeUser(g,en(g,this.carrier.pos)),this.userStart=g.clone(),this.userTarget=g.clone(),this.runOffset=this.keeper?new b(ue(-1,2),0,ue(-2,2)):new b(ue(-2,3),0,ue(-3,3));let _=en(g,this.carrier.pos),p=this.mates.filter((v)=>v!==this.carrier&&v.slot!=="GK"&&zn(en(g,v.pos),_)>95*ke&&v.pos.distanceTo(g)>8&&v.pos.distanceTo(g)<30);if(this.free=p.length?ru(p):null,this.freeDrift=new b,this.free){let v=this.nearestOpp(this.free.pos);if(v)this.freeDrift.copy(this.free.pos).sub(v.pos).setY(0).setLength(3)}this.pressers=[];let m=new Set;for(let v=0;v<n.pressers;v++){let x=_+Math.PI+(v===0?ue(-45,45):(Math.random()<0.5?-1:1)*ue(70,100))*ke,E=ue(...n.presserDist)+v*2,I=new b(g.x+Math.sin(x)*E,0,g.z+Math.cos(x)*E);if(this.keeper){let A=E+7+v*4;I.set(g.x+A,0,g.z+(v===0?ue(-3,3):(v%2?1:-1)*ue(8,12)))}I.x=xn(I.x,-zt.HL+1,zt.HL-1),I.z=xn(I.z,-zt.HW+1,zt.HW-1);let w=this.away.filter((A)=>A.slot!=="GK"&&!m.has(A)).sort((A,U)=>A.pos.distanceTo(I)-U.pos.distanceTo(I))[0];m.add(w),w.place(I.x,I.z),w.role="presser",w.stalk=I.clone().sub(g),this.pressers.push(w)}this.passesLeft=Math.round(ue(n.passes[0],n.passes[1])),this.hold=ue(0.9,1.4),this.receiver=null,this.finalStruck=!1,this.scans=[],this.inScan=!1,this.scanPeak=0,this.sawPresser=this.pressers.map(()=>-99),this.lastSawFree=-99,this.watchedStrike=null,this.watchedTouch=null,this.buildupStart=0,this.events=[],this.frames=[],this.frameClock=0,this.pending=null,this.aimed=null,this.result=null,this.t=0,this.state="buildup",this.fx.whistle?.()}ballAt(t){this.world.ball.set(t.pos.x+Math.sin(t.heading)*0.45,t.pos.z+Math.cos(t.heading)*0.45)}nearestOpp(t,e){let n=null,i=1/0;for(let s of this.away){if(s===e)continue;let r=Math.hypot(s.pos.x-t.x,s.pos.z-t.z);if(r<i)i=r,n=s}return n}update(t){while(t>0.05)this.tick(0.05),t-=0.05;if(t>0)this.tick(t)}tick(t){if(this.state==="quiz"||this.state==="done"||this.state==="setup")return;this.t+=t,this._dtLast=t;let e=this.world,n=e.ball,i=e.userPos();if(this.state==="buildup"){if(!n.flight){if(this.hold-=t,this.ballAt(this.carrier),this.hold<=0)this.nextPass(i)}}if(n.flight){if(n.update(t))this.onArrive()}if(this.moveActors(t,i),this.userBody.pos.copy(e.userPos()),this.userBody.heading=e.headYaw(),this.state==="buildup"||this.state==="incoming")this.trackScan(i,n);if(this.state==="decide"){if(this.decideT+=t,this.updateAimGlow(),this.decideT>this.window)this.timeout(i)}else if(this.state==="incoming")this.updateAimGlow();if(this.state==="outcome"){if(this.outcomeT-=t,this.outcomeAge+=t,this.outcomeT<=0)this.finish()}this.record(t)}timeout(t){let e=[...this.pressers].sort((n,i)=>n.pos.distanceTo(t)-i.pos.distanceTo(t))[0];this.lose(e)}moveActors(t,e){let n=this.world,i=n.ball,s=this.diff,r=i.flight?i.flight.to:i.pos,o=Math.min(...this.away.filter((u)=>/CB|LB|RB/.test(u.slot)).map((u)=>u.pos.x));this.home.forEach((u,d)=>{if(d===this.userIdx)return;let f=this.ht(d,r.x,r.z,o);if(f.x+=Math.sin(this.t*0.6+u.wobble)*1.2,f.z+=Math.cos(this.t*0.5+u.wobble)*1.2,u===this.free)f.add(this.freeDrift);if(u.maxSpeed=6.2,u===this.carrier&&!i.flight&&this.state==="buildup")u.maxSpeed=2.4;if(this.receiver===u&&i.flight)f.copy(i.flight.to);if(this.state==="outcome"&&this.outcomeTarget===u)f.copy(i.flight?i.flight.to:i.pos);u.target.copy(f)});let a=[...this.mates.filter((u)=>u!==this.free&&u.slot!=="GK"),{pos:e}],l=this.state==="buildup"?this.carrier.pos:e,c=null,h=1/0;for(let u of this.away){if(u.role==="presser"||u.slot==="GK")continue;let d=u.pos.distanceTo(l);if(d<h)h=d,c=u}this.away.forEach((u,d)=>{if(this.state==="outcome"&&u===this.outcomeTarget){u.target.copy(i.flight?i.flight.to:i.pos),u.maxSpeed=7;return}if(u.role==="presser"){if(!this.finalStruck){if(this.keeper)u.target.copy(e).addScaledVector(u.stalk,Math.max(0.55,1-this.t*0.07));else u.target.copy(e).add(u.stalk);u.maxSpeed=6}else{let g=u.pos.clone().sub(e).setY(0),_=this.state==="decide"?1:2.5;u.target.copy(e).add(g.setLength(_)),u.maxSpeed=this.state==="decide"?s.presserSpeed:s.presserSpeed*0.7}return}let f=Aa(Bn[d],r.x,r.z);if(u===c&&this.state==="buildup"&&!i.flight){let g=u.pos.clone().sub(l).setY(0).normalize();f=l.clone().addScaledVector(g,2.2)}else if(u.slot!=="GK"){let g=null,_=9;for(let p of a){let m=Math.hypot(p.pos.x-f.x,p.pos.z-f.z);if(m<_)_=m,g=p}if(g)f.lerp(new b(g.pos.x+1.6,0,g.pos.z),0.45);if(this.free){let p=f.clone().sub(this.free.pos).setY(0);if(p.length()<6.5)f.copy(this.free.pos).add(p.setLength(6.5))}}u.target.copy(f),u.maxSpeed=6}),this.reactions();for(let u of this.home)if(u!==this.userBody)u.step(t,i.pos);for(let u of this.away)u.step(t,i.pos);if(this.state==="buildup"&&this.motion){let d=this.ht(this.userIdx,r.x,r.z,o).add(this.runOffset).sub(e).setY(0),f=d.length();if(f>0.3)d.setLength(Math.min(f,2.2*t)),n.moveUser(d.x,d.z)}}afterTouchDirs(t){if(t.team==="home")this._tdx=3.5,this._tdz=t.pos.z>0?-2:2;else this._tdx=-14,this._tdz=-t.pos.z*0.3}reactions(){if(this.state!=="outcome")return;let t=this.outcome,e=this.outcomeTarget,n=this.outcomeAge,i=this.world.ball,s=this.userBody.pos.x,r=this.userBody.pos.z;if(t==="goal"){if(n<0.45)return;for(let o=0;o<this.home.length;o++){let a=this.home[o];if(o===this.userIdx)continue;let l=a.pos.x-s,c=a.pos.z-r;if(l*l+c*c>784){a.mood=0;continue}let h=o*0.9,u=2+o%3*0.8;a.target.set(s+Math.sin(h)*u,0,r+Math.cos(h)*u),a.maxSpeed=7,a.mood=1}return}if((t==="completed"||t==="tight")&&e&&this.outcomeArrived){if(this.touchT+=this._dtLast||0,this.touchT<0.25)e.target.copy(e.pos),e.maxSpeed=1;else e.target.set(e.pos.x+this._tdx,0,e.pos.z+this._tdz),e.maxSpeed=3.4;this.ballAt(e);return}if(t==="intercepted"||t==="lost"){if(e&&this.outcomeArrived)e.target.set(e.pos.x+this._tdx,0,e.pos.z+this._tdz),e.maxSpeed=7.2,this.ballAt(e);if(n<0.35)return;for(let o=0;o<this.home.length;o++){let a=this.home[o];if(o===this.userIdx)continue;let l=a.pos.x-s,c=a.pos.z-r;if(l*l+c*c>900){a.mood=0;continue}a.mood=2,a.maxSpeed=1.5}}}nextPass(t){let e=this.world.ball,n=this.carrier,i;if(this.passesLeft<=1)i=null;else{let s=this.mates.filter((r)=>r!==n&&(this.roleKey==="CB"||r.slot!=="GK")&&r.slot!=="GK").map((r)=>{let o=r.pos.distanceTo(n.pos),a=r.pos.distanceTo(t),l=Math.min(...this.away.map((h)=>ns(n.pos,r.pos,h.pos,16,!1))),c=0;if(o>7&&o<26)c+=2;if(a>9&&a<24)c+=2;if(c+=xn(l,-2,3),r===this.free)c-=4;return{p:r,s:c+Math.random()}}).sort((r,o)=>o.s-r.s);i=s.length?s[0].p:null}if(this.passesLeft--,n.heading=i?en(n.pos,i.pos):en(n.pos,t),this.ballAt(n),i){let s=i.pos.distanceTo(n.pos),r=i.pos.clone().addScaledVector(i.vel,s/16*0.6);e.kick(e.pos,r,ue(15,18),s>zs?s*0.1:0),this.receiver=i,this.events.push({t:this.t,type:"pass"}),this.fx.kick?.(0.7)}else this.finalBall(n,t)}finalBall(t,e){let n=this.world.ball,i=t.pos.clone().sub(e).setY(0).normalize(),s=e.clone().addScaledVector(i,0.6),r=s.distanceTo(t.pos);n.kick(n.pos,s,ue(14,16.5),r>zs?r*0.08:0),this.receiver=null,this.finalStruck=!0,this.state="incoming",this.strikeT=this.t,this.events.push({t:this.t,type:"final"});let o=en(e,this.world.ball.pos);this.watchedStrike=zn(this.world.headYaw(),o)<38*ke,this.strikeWatchUntil=this.t+0.3,this.fx.kick?.(0.8)}onArrive(){if(this.state==="buildup"&&this.receiver){this.carrier=this.receiver,this.receiver=null,this.hold=ue(this.holdRange[0],this.holdRange[1]),this.fx.touch?.();return}if(this.state==="incoming"){let t=this.world.userPos();if(this.receiveT=this.t,this.events.push({t:this.t,type:"receive"}),this.watchedTouch=zn(this.world.headYaw(),en(t,this.world.ball.pos))<45*ke,this.fx.touch?.(),this.inScan)this.closeScan();if(this.scanWindow=Math.max(0.5,this.receiveT-this.buildupStart),this.decideT=0,this.knewPressure=this.sawPresser.every((e)=>this.receiveT-e<2.5),this.window=(this.diff.window+(this.knewPressure?0.6:0))*this.windowScale,this.quizWanted){this.snapshot=this.takeSnapshot(t),this.state="quiz";return}this.enterDecide();return}if(this.state==="outcome"&&!this.outcomeArrived){this.outcomeArrived=!0,this.touchT=0;let t=this.outcomeTarget;if(t)this.afterTouchDirs(t)}}enterDecide(){if(this.state="decide",this.pending){let t=this.pending;this.pending=null,this.execute(t,!0)}}endQuiz(t){this.memory=t,this.enterDecide()}takeSnapshot(t){let e=this.world.headYaw(),n=this.away.filter((c)=>c.slot!=="GK").map((c)=>c.pos.clone()),i=this.mates.map((c)=>({pos:c.pos.clone(),number:c.number,slot:c.slot})),s=n.reduce((c,h)=>c.distanceTo(t)<h.distanceTo(t)?c:h),r=n.filter((c)=>c.distanceTo(t)<10).length,o=null,a=-1,l=i.filter((c)=>c.slot!=="GK"&&c.pos.distanceTo(t)<32);for(let c of l){let h=Math.min(...n.map((u)=>u.distanceTo(c.pos)));if(c.space=h,h>a)a=h,o=c}return{user:t.clone(),fwd:e,toBall:en(t,this.world.ball.pos),opps:n,mates:l,nearest:s,within:r,freest:o}}trackScan(t,e){let n=this.world.headYaw(),i=zn(n,en(t,e.pos));if(this.anchorYaw==null)this.anchorYaw=n;if(!this.inScan){if(i<ou)this.anchorYaw=n;if(i>n_&&zn(n,this.anchorYaw)>40*ke)this.inScan=!0,this.scanStart=this.t,this.scanPeak=i,this.scanPeakYaw=n,this.scanSide=Math.sign(Math.sin(n-en(t,e.pos))),this.fx.tick?.()}else{if(i>this.scanPeak)this.scanPeak=i,this.scanPeakYaw=n;let s=zn(n,this.scanPeakYaw)>40*ke&&zn(n,this.anchorYaw)<25*ke;if(i<ou||s)this.closeScan(),this.anchorYaw=n}if(this.strikeWatchUntil&&this.t<this.strikeWatchUntil&&i<38*ke)this.watchedStrike=!0;if(this.pressers.forEach((s,r)=>{if(zn(n,en(t,s.pos))<au)this.sawPresser[r]=this.t}),this.free&&zn(n,en(t,this.free.pos))<au)this.lastSawFree=this.t}closeScan(){if(this.inScan=!1,this.t-this.scanStart<0.18)return;let t=!!this.world.ball.flight;this.scans.push({t:this.scanStart,end:this.t,peak:this.scanPeak,side:this.scanSide,shoulder:this.scanPeak>100*ke,ballMoving:t})}aim(t,e){if(this.state!=="incoming"&&this.state!=="decide"){this.aimed=null;return}let n=this.world.userPos(),i=null,s=1/0;for(let r of this.mates){let a=r.pos.clone().setY(1).sub(t),l=a.length();if(r.pos.distanceTo(n)<3)continue;let c=a.normalize().angleTo(e),h=Math.max(5*ke,Math.atan(1.1/l));if(c<h&&c<s)s=c,i={kind:"pass",target:r}}if(this.role.group==="att"&&n.x>20&&Math.hypot(ie.x-n.x,n.z)<30){let r=new b(ie.x,1.2,0).sub(t),o=r.length(),a=r.normalize().angleTo(e);if(a<Math.atan(4.2/o)+2*ke&&a<s)i={kind:"shot"}}this.aimed=i}updateAimGlow(){for(let t of this.mates){let e=this.aimed?.kind==="pass"&&this.aimed.target===t,n=this.pending?.kind==="pass"&&this.pending.target===t;t.highlight(n?16742938:16777215,e||n?0.9:0)}this.world.goalGlow.visible=this.aimed?.kind==="shot"||this.pending?.kind==="shot"}select(){if(!this.aimed)return!1;if(this.state==="incoming")return this.pending=this.aimed,this.fx.ui?.(),!0;if(this.state==="decide")return this.execute(this.aimed,!1),!0;return!1}execute(t,e){let n=this.world,i=n.ball,s=i.pos.clone(),r=this.evaluate(s),o=r.find((c)=>c.kind===t.kind&&(c.kind==="shot"||c.target===t.target))||{kind:t.kind,target:t.target,value:0};this.options=r,this.chosen=o,this.decisionScore=iu(o,r),this.oneTouch=e,this.decideTime=this.decideT,this.events.push({t:this.t,type:"decide"}),this.world.clearOverlays(),this.fx.kick?.(1);let a,l;if(o.kind==="pass"){let c=o.target,h=c.pos.distanceTo(s),u=h>zs,d=u?21:17,f=null,g=1/0;for(let _ of this.away){let p=ns(s,c.pos,_.pos,d,u)+ue(-0.15,0.15);if(p<g)g=p,f=_}if(g<0&&f){a="intercepted";let _=c.pos.x-s.x,p=c.pos.z-s.z,m=_*_+p*p,v=((f.pos.x-s.x)*_+(f.pos.z-s.z)*p)/m;v=xn(v,u?0.8:0.08,1);let x=new b(s.x+_*v,0,s.z+p*v);i.kick(s,x,d,u?h*0.09*v:0),l=f}else{a=o.space<0.25||this.keeper&&u&&o.space<0.4?"tight":"completed";let _=c.pos.clone().addScaledVector(c.vel,h/d*0.5);i.kick(s,_,d,u?h*0.09:0),l=c}}else{let c=xn(s.z*-0.15+ue(-2.4,2.4),-3.2,3.2),h=this.away.find((u)=>u.slot==="GK");if(o.open<0.3){a="blocked";let u=this.away.filter((d)=>d.slot!=="GK").sort((d,f)=>d.pos.distanceTo(s)-f.pos.distanceTo(s))[0];i.kick(s,u.pos.clone(),24,0.4),l=u}else if(o.quality*(0.4+0.6*o.open)+ue(0,0.35)>0.55)a="goal",i.kick(s,new b(ie.x+1.2,0,c),27,ue(0.3,1.4)),l=null;else a="saved",i.kick(s,new b(ie.x-0.6,0,c*0.7),27,0.6),l=h}this.outcome=a,this.outcomeTarget=l,this.state="outcome",this.outcomeT=this.outcomeLen,this.outcomeAge=0,n.setLine(n.choiceLine,null,null)}loseSpot(t){return t.pos.clone().add(new b(-8,0,ue(-4,4)))}lose(t){this.options=this.evaluate(this.world.ball.pos),this.chosen=null,this.decisionScore=0,this.decideTime=this.decideT,this.outcome="lost",this.outcomeTarget=t;let e=this.world.ball,n=this.loseSpot(t);e.kick(e.pos.clone(),n,7,0),t.target.copy(n),this.events.push({t:this.t,type:"lost"}),this.state="outcome",this.outcomeT=this.outcomeLen-0.2,this.outcomeAge=0,this.world.clearOverlays(),this.fx.groan?.()}finish(){if(this.inScan)this.closeScan();let t=this.diff,e=this.scans.filter((l)=>l.t<(this.receiveT??this.t)),n=e.length,i=Math.round(Math.min(1,n/t.scanTarget)*60+(this.knewPressure?20:0)+(this.watchedStrike?10:0)+(this.watchedTouch?10:0)),s=this.memory!=null,r=this.decisionScore||0,o=Math.round(s?i*0.3+r*0.45+this.memory*0.25:i*0.4+r*0.6);if(["completed","goal"].includes(this.outcome))this.fx.cheer?.(this.outcome==="goal"?1:0.4);else if(this.outcome!=="lost")this.fx.groan?.();this.result={role:this.roleKey,drill:this.drillKey,scans:n,scanTarget:t.scanTarget,scanRate:n/(this.scanWindow||1),shoulder:e.filter((l)=>l.shoulder).length,watchedStrike:this.watchedStrike,watchedTouch:this.watchedTouch,sawPresser:!!this.knewPressure,sawFree:!this.free||(this.receiveT??this.t)-this.lastSawFree<4,scanScore:i,decision:r,memory:s?this.memory:null,total:o,outcome:this.outcome,oneTouch:!!this.oneTouch,decideTime:this.decideTime,chosen:this.chosen,best:this.options?.[0]||null},this.state="done"}record(t){if(this.frameClock-=t,this.frameClock>0)return;this.frameClock=0.05;let e=this.world,n=e.userPos(),i=new Float32Array(72);i[0]=n.x,i[1]=n.z,i[2]=e.headYaw(),i[3]=e.ball.pos.x,i[4]=e.ball.pos.y,i[5]=e.ball.pos.z;let s=6;for(let r of[...this.home,...this.away])i[s++]=r===this.userBody?n.x:r.pos.x,i[s++]=r===this.userBody?n.z:r.pos.z,i[s++]=r===this.userBody?e.headYaw():r.heading;this.frames.push({t:this.t,f:i})}}var yn=(t,e)=>t+Math.random()*(e-t),lu=(t,e,n)=>Math.max(e,Math.min(n,t)),cu=(t,e)=>Math.abs(Math.atan2(Math.sin(t-e),Math.cos(t-e))),Ti=(t,e)=>Math.atan2(e.x-t.x,e.z-t.z),uu=Math.PI/180,s_=48*uu,Ei=12,ii=Ei/2;function r_(t,e,n,i={x:0,z:0}){t=(t%(4*Ei)+4*Ei)%(4*Ei);let s=Math.floor(t/Ei),r=t-s*Ei;if(s===0)i.x=e-ii+r,i.z=n-ii;else if(s===1)i.x=e+ii,i.z=n-ii+r;else if(s===2)i.x=e+ii-r,i.z=n+ii;else i.x=e-ii,i.z=n+ii-r;return i}class du extends Hs{constructor(t,e){super(t,{...e,role:He[e.role]?e.role:"CM",quiz:!1,motion:!1});this.drillKey="rondo",this.windowScale=0.55,this.outcomeLen=1.7,this.holdRange=[0.3,0.5],this.quizWanted=!1}start(){let t=this.world,e=this.role,n=this.diff;t.useFormation(e.formation),t.clearOverlays(),this.F=e.formation,this.home=t.home,this.away=t.away,this.outcomeArrived=!1,this.touchT=0,this.outcomeAge=0;let i=yn(-22,22),s=yn(-12,12);this.centre=new b(i,0,s),this.focus={x:i,z:s,radius:10},t.showRondo(!0,i,s,Ei);let r=yn(0,9.6),o=n.jitter*0.5,a=[];for(let d=0;d<5;d++)a.push(r_(r+d*9.6+yn(-o,o),i,s));let l=Math.random()*5|0,c=a[l],h=a.filter((d,f)=>f!==l);this.slotName="EDGE",this.userIdx=0,this.userBody=this.home[0],this.userBody.setVisible(!1),this.userBody.place(c.x,c.z),this.mates=this.home.slice(1,5),this.spots=h,this.mates.forEach((d,f)=>{d.place(h[f].x,h[f].z),d.heading=Ti(d.pos,this.centre),d.sync(),d.wobble=Math.random()*100}),this.defenders=[this.away[1],this.away[2]],this.opps=this.defenders,this.pressers=this.defenders,this.defenders.forEach((d,f)=>{d.place(i+(f?1.4:-1.4)+yn(-0.5,0.5),s+yn(-1,1)),d.role=null}),this.home.forEach((d,f)=>{if(f>4)d.setVisible(!1),d.place(300+f*3,300)}),this.away.forEach((d,f)=>{if(f!==1&&f!==2)d.setVisible(!1),d.place(-300-f*3,300)}),this.carrier=this.mates[Math.random()*4|0];let u=c;this.ballAt(this.carrier),t.placeUser(new b(u.x,0,u.z),Ti(u,this.carrier.pos)),this.userStart=new b(u.x,0,u.z),this.userTarget=this.userStart.clone(),this.runOffset=new b,this.free=null,this.freeDrift=new b,this.passesLeft=Math.round(yn(2,3)),this.hold=yn(0.35,0.5),this.receiver=null,this.finalStruck=!1,this.closer=this.defenders[0],this.cutter=this.defenders[1],this.cutMate=this.mates[0],this.scans=[],this.inScan=!1,this.scanPeak=0,this.anchorYaw=null,this.sawPresser=this.pressers.map(()=>-99),this.lastSawFree=-99,this.watchedStrike=null,this.watchedTouch=null,this.buildupStart=0,this.events=[],this.frames=[],this.frameClock=0,this.pending=null,this.aimed=null,this.result=null,this.memory=null,this.t=0,this.state="buildup"}evaluate(t){return su(t,this.mates,this.defenders)}nextPass(t){let e=this.world.ball,n=this.carrier;if(this.passesLeft--,this.passesLeft<1){n.heading=Ti(n.pos,t),this.ballAt(n),this.finalBall(n,t);return}let i=null,s=-1/0;for(let r of this.mates){if(r===n)continue;let o=1/0;for(let l of this.defenders)o=Math.min(o,ns(n.pos,r.pos,l.pos,16,!1));let a=o+yn(0,1.2);if(a>s)s=a,i=r}n.heading=Ti(n.pos,i.pos),this.ballAt(n),e.kick(e.pos,i.pos,yn(14,17),0),this.receiver=i,this.events.push({t:this.t,type:"pass"}),this.fx.kick?.(0.7)}finalBall(t,e){super.finalBall(t,e);let[n,i]=this.defenders,s=Math.hypot(n.pos.x-e.x,n.pos.z-e.z),r=Math.hypot(i.pos.x-e.x,i.pos.z-e.z);this.closer=s<=r?n:i,this.cutter=this.closer===n?i:n;let o=1/0;for(let a of this.mates){let l=Math.hypot(a.pos.x-this.cutter.pos.x,a.pos.z-this.cutter.pos.z);if(l<o)o=l,this.cutMate=a}}loseSpot(t){let e=this.userBody.pos,n=t.pos.x-e.x,i=t.pos.z-e.z,s=Math.hypot(n,i)||1;return new b(t.pos.x+n/s*7,0,t.pos.z+i/s*7)}afterTouchDirs(t){if(t.team==="home"){let e=this.centre.x-t.pos.x,n=this.centre.z-t.pos.z,i=Math.hypot(e,n)||1;this._tdx=e/i*1.3,this._tdz=n/i*1.3}else{let e=this.userBody.pos,n=t.pos.x-e.x,i=t.pos.z-e.z,s=Math.hypot(n,i)||1;this._tdx=n/s*10,this._tdz=i/s*10}}moveActors(t,e){let n=this.world.ball,i=this.state,s=this.centre,r=i==="outcome";for(let c=0;c<this.mates.length;c++){let h=this.mates[c],u=this.spots[c];if(h.target.set(u.x+Math.sin(this.t*1.1+h.wobble)*0.3,0,u.z+Math.cos(this.t*0.9+h.wobble)*0.3),h.maxSpeed=2.5,r&&this.outcomeTarget===h)h.target.copy(n.flight?n.flight.to:n.pos)}let o=this.diff.presserSpeed*0.8,[a,l]=this.defenders;if(r)for(let c of this.defenders)if(c===this.outcomeTarget)c.target.copy(n.flight?n.flight.to:n.pos),c.maxSpeed=7;else c.target.copy(s),c.maxSpeed=2;else if(this.finalStruck){let c=this.closer,h=this.cutter,u=this.cutMate,d=c.pos.x-e.x,f=c.pos.z-e.z,g=Math.hypot(d,f)||1,_=i==="decide"?1.8:3;c.target.set(e.x+d/g*_,0,e.z+f/g*_),c.maxSpeed=i==="decide"?this.diff.presserSpeed:o,h.target.set(e.x+(u.pos.x-e.x)*0.45,0,e.z+(u.pos.z-e.z)*0.45),h.maxSpeed=o}else{let c=n.flight?n.flight.to.x:this.carrier.pos.x,h=n.flight?n.flight.to.z:this.carrier.pos.z,u=Math.hypot(a.pos.x-c,a.pos.z-h)<=Math.hypot(l.pos.x-c,l.pos.z-h),d=u?a:l,f=u?l:a,g=s.x-c,_=s.z-h,p=Math.hypot(g,_)||1;d.target.set(c+g/p*2.2,0,h+_/p*2.2);let m=this.receiver?this.receiver.pos.x:e.x,v=this.receiver?this.receiver.pos.z:e.z;f.target.set(s.x+(m-s.x)*0.4,0,s.z+(v-s.z)*0.4),d.maxSpeed=f.maxSpeed=o}if(!r)for(let c of this.defenders)c.target.x=lu(c.target.x,s.x-5.7,s.x+5.7),c.target.z=lu(c.target.z,s.z-5.7,s.z+5.7);this.reactions();for(let c of this.mates)c.step(t,n.pos);for(let c of this.defenders)c.step(t,n.pos)}}var o_=["#ff3b3b","#b04bff","#22e0e0"],hu=[16726843,11553791,2285792],a_=["RED","PURPLE","CYAN"],l_=0.8;class fu extends Hs{constructor(t,e){super(t,{...e,role:He[e.role]?e.role:"CM"});this.drillKey="awareness",this.quizWanted=!0}start(){super.start(),this.quizWanted=!0,this.passesLeft=Math.max(this.passesLeft,3),this.cueAt=yn(0.5,1.1),this.cueState=0,this.cueP=null,this.cueColor=Math.random()*3|0,this.cueSeen=!1,this.cueLeft=0,this._cu=new b}tick(t){if(super.tick(t),this.state==="buildup"||this.state==="incoming")this.cueStep(t)}cueStep(t){let e=this.world;if(this.cueState===0){if(this.state==="buildup"&&this.t>=this.cueAt)this.fireCue()}else if(this.cueState===1){let n=e.userPos(this._cu);if(cu(e.headYaw(),Ti(n,this.cueP.pos))<s_)this.cueSeen=!0;if(this.cueLeft-=t,this.cueLeft<=0)this.endCue()}}fireCue(){let t=this.world,e=t.userPos(this._cu),n=Ti(e,t.ball.pos),i=this.mates.concat(this.away.filter((a)=>a.slot!=="GK")),s=[],r=null,o=-1;for(let a of i){if(a===this.carrier)continue;let l=cu(Ti(e,a.pos),n),c=Math.hypot(a.pos.x-e.x,a.pos.z-e.z);if(c<3)continue;if(l>100*uu&&c>4&&c<32)s.push(a);if(l>o)o=l,r=a}this.cueP=s.length?s[Math.random()*s.length|0]:r,this.cueP.highlight(hu[this.cueColor],0.95),this.cueState=1,this.cueLeft=l_,this.events.push({t:this.t,type:"cue"})}endCue(){if(this.cueState===1&&this.cueP)this.cueP.highlight(16777215,0);this.cueState=2}onArrive(){if(this.state==="incoming")this.endCue();super.onArrive()}updateAimGlow(){let t=this.cueState===1?this.cueP:null;if(!t){super.updateAimGlow();return}let e=t.ringMat.color.getHex(),n=t.ringMat.opacity;super.updateAimGlow(),t.highlight(e,n)}reactions(){if(this.state==="outcome"){super.reactions();return}let t=this.t;for(let e=0;e<this.home.length;e++){let n=this.home[e];if(e===this.userIdx||n===this.carrier||n===this.receiver||n.slot==="GK")continue;n.target.x+=Math.sin(t*0.8+n.wobble)*2.4,n.target.z+=Math.cos(t*0.7+n.wobble*1.3)*2.4}for(let e=0;e<this.away.length;e++){let n=this.away[e];if(n.role==="presser"||n.slot==="GK")continue;n.target.x+=Math.sin(t*0.7+n.wobble)*2.2,n.target.z+=Math.cos(t*0.9+n.wobble)*2.2}}takeSnapshot(t){let e=super.takeSnapshot(t);return e.cueColor=this.cueColor,e.cueSeen=this.cueSeen,e.cue={color:this.cueColor,colors:o_.slice(),hexes:hu.slice(),names:a_.slice(),seen:this.cueSeen},e}finish(){if(super.finish(),this.result)this.result.cueColor=this.cueColor,this.result.cueSeen=this.cueSeen}}var Ra={match:Hs,rondo:du,awareness:fu},zr={match:"MATCH SITUATION",rondo:"RONDO 5V2",awareness:"AWARENESS"},Ca=Object.keys(Ra);var Vt={panel:"rgba(20,24,26,0.6)",sheen:0.08,edgeTop:0.22,edgeBot:0.06,chip:"rgba(255,255,255,0.10)",chipHi:"rgba(255,255,255,0.19)",chipOff:"rgba(255,255,255,0.04)",card:"rgba(255,255,255,0.075)",cardHi:"rgba(255,255,255,0.14)",dim:"rgba(242,240,232,0.72)",faint:"rgba(242,240,232,0.34)",hair:"rgba(242,240,232,0.14)",off:"#f2f0e8",shadow:"rgba(0,0,0,0.38)",rPanel:36,rBtn:22};function nn(t,e,n,i,s,r,o=Vt.edgeTop,a=Vt.edgeBot){let l=t.createLinearGradient(0,n,0,n+s);l.addColorStop(0,`rgba(255,255,255,${o})`),l.addColorStop(1,`rgba(255,255,255,${a})`),t.strokeStyle=l,t.lineWidth=1.5,vn(t,e+0.75,n+0.75,i-1.5,s-1.5,Math.max(0,r-0.75)),t.stroke()}function Hr(t,e,n,i,s,r,o=Vt.sheen){let a=t.createLinearGradient(0,n,0,n+s);a.addColorStop(0,`rgba(255,255,255,${o})`),a.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=a,vn(t,e,n,i,s,r),t.fill()}function Ia(t,e,n,i,s,r,o=26,a=10){t.save(),t.beginPath(),t.rect(e-200,n-200,i+400,s+400),vn(t,e,n,i,s,r,!1),t.clip("evenodd"),t.shadowColor=Vt.shadow,t.shadowBlur=o,t.shadowOffsetY=a,t.fillStyle="#000",vn(t,e,n,i,s,r),t.fill(),t.restore()}function c_(t,e,n,i,s,r=22,{hi:o=!1,shadow:a=!0,fill:l=null}={}){if(a)Ia(t,e,n,i,s,r,22,8);t.fillStyle=l||(o?Vt.cardHi:Vt.card),vn(t,e,n,i,s,r),t.fill(),Hr(t,e,n,i,s,r,o?0.1:0.07),nn(t,e,n,i,s,r,o?0.34:0.2,0.06)}class ks{constructor(t,e,n,i){this.w=e,this.h=n,this.canvas=document.createElement("canvas"),this.canvas.width=e,this.canvas.height=n,this.g=this.canvas.getContext("2d"),this.tex=new fn(this.canvas),this.tex.colorSpace=Be,this.tex.anisotropy=4,this.tex.generateMipmaps=!1,this.tex.minFilter=Zi;let s=new De(i,i*(n/e));this.mesh=new vt(s,new ne({map:this.tex,transparent:!0,depthTest:!1,depthWrite:!1})),this.mesh.renderOrder=10,this.mesh.visible=!1,this.mesh.userData.panel=this,t.add(this.mesh),this.buttons=[],this.hover=null,this.render=null}show(t){this.render=t,this.hover=null,this.mesh.visible=!0,this.redraw()}hide(){this.mesh.visible=!1,this.render=null,this.buttons=[]}redraw(){if(!this.render)return;this.buttons=[],this.g.clearRect(0,0,this.w,this.h),this.render(this.draw()),this.tex.needsUpdate=!0}draw(){let t=this.g,e=this,n={g:t,w:this.w,h:this.h,bg(i=Vt.rPanel){let a=e.w-24,l=e.h-24;Ia(t,12,12,a,l,i,18,6),t.fillStyle=Vt.panel,vn(t,12,12,a,l,i),t.fill(),Hr(t,12,12,a,l,i),nn(t,12,12,a,l,i)},card:(i,s,r,o,a,l)=>c_(t,i,s,r,o,a,l),text(i,s,r,o,{weight:a=700,color:l=Lt.text,align:c="left",font:h=Lt.font,base:u="alphabetic"}={}){return t.font=`${a} ${o}px ${h}`,t.fillStyle=l,t.textAlign=c,t.textBaseline=u,t.fillText(i,s,r),t.measureText(i).width},button(i,s,r,o,a,l,{onClick:c,primary:h=!1,active:u=!1,disabled:d=!1,size:f=40,sub:g=null,r:_=Vt.rBtn}={}){let p=e.hover===i&&!d;if(h){Ia(t,s,r,o,a,_,20,8),t.fillStyle=p?"#ff9447":Lt.accent,vn(t,s,r,o,a,_),t.fill();let v=t.createLinearGradient(0,r,0,r+a);v.addColorStop(0,"rgba(255,255,255,0.30)"),v.addColorStop(0.5,"rgba(255,255,255,0.06)"),v.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=v,vn(t,s,r,o,a,_),t.fill(),nn(t,s,r,o,a,_,0.5,0.12)}else if(u)t.fillStyle=p?"#fff":Vt.off,vn(t,s,r,o,a,_),t.fill(),Hr(t,s,r,o,a,_,0.35),nn(t,s,r,o,a,_,0.7,0.2);else t.fillStyle=d?Vt.chipOff:p?Vt.chipHi:Vt.chip,vn(t,s,r,o,a,_),t.fill(),Hr(t,s,r,o,a,_,p?0.12:0.07),nn(t,s,r,o,a,_,p?0.5:0.24,p?0.2:0.07);let m=h||u?"#111":d?"rgba(242,240,232,0.3)":Lt.text;if(g)n.text(l,s+o/2,r+a/2-2,f,{color:m,align:"center"}),n.text(g,s+o/2,r+a/2+f*0.75,f*0.55,{color:h||u?"rgba(0,0,0,0.62)":Vt.dim,align:"center",weight:600});else n.text(l,s+o/2,r+a/2,f,{color:m,align:"center",base:"middle"});if(!d&&c)e.buttons.push({id:i,x:s,y:r,w:o,h:a,onClick:c})},hit(i,s,r,o,a,l){e.buttons.push({id:i,x:s,y:r,w:o,h:a,onClick:l})},rr:(i,s,r,o,a)=>vn(t,i,s,r,o,a),hovered:(i)=>e.hover===i};return n}pick(t){let e=t.x*this.w,n=(1-t.y)*this.h;for(let i=this.buttons.length-1;i>=0;i--){let s=this.buttons[i];if(e>=s.x&&e<=s.x+s.w&&n>=s.y&&n<=s.y+s.h)return{b:s,x:e,y:n}}return{b:null,x:e,y:n}}setHover(t){if(t===this.hover)return;this.hover=t,this.redraw()}placeFacing(t,e,n,i=0){this.mesh.position.set(t.x+Math.sin(e)*n,t.y+i,t.z+Math.cos(e)*n),this.mesh.rotation.set(0,e+Math.PI,0)}}function vn(t,e,n,i,s,r,o=!0){if(o)t.beginPath();t.moveTo(e+r,n),t.arcTo(e+i,n,e+i,n+s,r),t.arcTo(e+i,n+s,e,n+s,r),t.arcTo(e,n+s,e,n,r),t.arcTo(e,n,e+i,n,r),t.closePath()}class Pa{constructor(){this.ray=new Os,this.panels=[]}hitPanels(t,e){this.ray.set(t,e);let n=this.panels.filter((o)=>o.mesh.visible).map((o)=>o.mesh),i=this.ray.intersectObjects(n,!1);if(!i.length)return null;let s=i[0],r=s.object.userData.panel;return{panel:r,point:s.point,distance:s.distance,...r.pick(s.uv)}}}class La{constructor(){this.ctx=null,this.volume=0.8,this.ticks=!0}unlock(){if(this.ctx){if(this.ctx.state==="suspended")this.ctx.resume();return}let t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t,this.master=this.ctx.createGain(),this.master.gain.value=this.volume,this.master.connect(this.ctx.destination),this.noise=this.makeNoise(),this.crowd()}setVolume(t){if(this.volume=t,this.master)this.master.gain.value=t}makeNoise(){let t=this.ctx.sampleRate*2,e=this.ctx.createBuffer(1,t,this.ctx.sampleRate),n=e.getChannelData(0),i=0,s=0,r=0;for(let o=0;o<t;o++){let a=Math.random()*2-1;i=0.99765*i+a*0.099,s=0.963*s+a*0.2965,r=0.57*r+a*1.0526,n[o]=(i+s+r+a*0.1848)*0.2}return e}src(){let t=this.ctx.createBufferSource();return t.buffer=this.noise,t.loop=!0,t}crowd(){let t=this.ctx,e=this.src(),n=t.createBiquadFilter();n.type="bandpass",n.frequency.value=700,n.Q.value=0.6,this.crowdGain=t.createGain(),this.crowdGain.gain.value=0.22;let i=t.createOscillator();i.frequency.value=0.09;let s=t.createGain();s.gain.value=0.06,i.connect(s).connect(this.crowdGain.gain),e.connect(n).connect(this.crowdGain).connect(this.master),e.start(),i.start();let r=()=>{this.chant(),setTimeout(r,25000+Math.random()*30000)};setTimeout(r,8000)}swell(t,e=2.2,n=900){if(!this.ctx)return;let i=this.ctx,s=i.currentTime,r=this.src(),o=i.createBiquadFilter();o.type="bandpass",o.frequency.value=n,o.Q.value=0.8;let a=i.createGain();a.gain.setValueAtTime(0.0001,s),a.gain.exponentialRampToValueAtTime(t,s+0.25),a.gain.exponentialRampToValueAtTime(0.0001,s+e),r.connect(o).connect(a).connect(this.master),r.start(s),r.stop(s+e+0.1)}cheer(t=0.5){if(this.swell(0.25+t*0.6,1.6+t*1.8,1000),t>0.3)this.applause(t)}groan(){this.swell(0.35,1.4,380)}out(t){if(!t)return this.master;let e=this.ctx.createStereoPanner();return e.pan.value=Math.max(-1,Math.min(1,t)),e.connect(this.master),e}kick(t=0.8,e=0,n=0){if(!this.ctx)return;let i=this.ctx,s=i.currentTime,r=this.out(e);t*=1-Math.min(0.75,n/50);let o=i.createOscillator();o.type="sine",o.frequency.setValueAtTime(150,s),o.frequency.exponentialRampToValueAtTime(55,s+0.12);let a=i.createGain();a.gain.setValueAtTime(0.5*t,s),a.gain.exponentialRampToValueAtTime(0.001,s+0.16),o.connect(a).connect(r),o.start(s),o.stop(s+0.2);let l=this.src(),c=i.createBiquadFilter();c.type="highpass",c.frequency.value=1800;let h=i.createGain();h.gain.setValueAtTime(0.25*t,s),h.gain.exponentialRampToValueAtTime(0.001,s+0.05),l.connect(c).connect(h).connect(r),l.start(s),l.stop(s+0.08)}step(t=0.5){if(!this.ctx)return;let e=this.ctx,n=e.currentTime,i=this.src(),s=e.createBiquadFilter();s.type="lowpass",s.frequency.value=380+t*300;let r=e.createGain();r.gain.setValueAtTime(0.0001,n),r.gain.exponentialRampToValueAtTime(0.12+t*0.18,n+0.01),r.gain.exponentialRampToValueAtTime(0.0001,n+0.09),i.connect(s).connect(r).connect(this.master),i.start(n,Math.random()),i.stop(n+0.12)}touch(t=0,e=0){this.kick(0.35,t,e)}applause(t=1){if(!this.ctx)return;let e=this.ctx,n=e.currentTime,i=Math.round(60+t*140);for(let s=0;s<i;s++){let r=n+Math.random()*(1.2+t*1.8),o=this.src(),a=e.createBiquadFilter();a.type="bandpass",a.frequency.value=1200+Math.random()*1800,a.Q.value=1.2;let l=e.createGain();l.gain.setValueAtTime(0.0001,r),l.gain.exponentialRampToValueAtTime(0.05*t,r+0.004),l.gain.exponentialRampToValueAtTime(0.0001,r+0.05);let c=e.createStereoPanner();c.pan.value=Math.random()*2-1,o.connect(a).connect(l).connect(c).connect(this.master),o.start(r,Math.random()),o.stop(r+0.07)}}chant(){if(!this.ctx)return;let t=this.ctx,e=t.currentTime,n=this.src(),i=t.createBiquadFilter();i.type="bandpass",i.frequency.value=420,i.Q.value=2.5;let s=t.createGain();s.gain.value=0.0001;let r=0.62;for(let o=0;o<12;o++){let a=e+o*r,l=o%4===3?0.5:0.28;s.gain.setValueAtTime(0.0001,a),s.gain.exponentialRampToValueAtTime(l,a+0.08),s.gain.exponentialRampToValueAtTime(0.0001,a+r*0.9)}n.connect(i).connect(s).connect(this.out(0.6*(Math.random()<0.5?-1:1))),n.start(e),n.stop(e+12*r+0.2)}tick(){if(!this.ctx||!this.ticks)return;let t=this.ctx,e=t.currentTime,n=t.createOscillator();n.type="triangle",n.frequency.value=1320;let i=t.createGain();i.gain.setValueAtTime(0.07,e),i.gain.exponentialRampToValueAtTime(0.001,e+0.07),n.connect(i).connect(this.master),n.start(e),n.stop(e+0.09)}ui(){if(!this.ctx)return;let t=this.ctx,e=t.currentTime,n=t.createOscillator();n.type="sine",n.frequency.setValueAtTime(660,e),n.frequency.exponentialRampToValueAtTime(990,e+0.05);let i=t.createGain();i.gain.setValueAtTime(0.08,e),i.gain.exponentialRampToValueAtTime(0.001,e+0.09),n.connect(i).connect(this.master),n.start(e),n.stop(e+0.1)}whistle(t=!1){if(!this.ctx)return;let e=this.ctx,n=e.currentTime,i=t?0.9:0.35,s=e.createOscillator();s.type="sine",s.frequency.value=2900;let r=e.createOscillator();r.frequency.value=28;let o=e.createGain();o.gain.value=120,r.connect(o).connect(s.frequency);let a=e.createGain();a.gain.setValueAtTime(0.0001,n),a.gain.exponentialRampToValueAtTime(0.12,n+0.03),a.gain.setValueAtTime(0.12,n+i-0.06),a.gain.exponentialRampToValueAtTime(0.0001,n+i),s.connect(a).connect(this.master),s.start(n),r.start(n),s.stop(n+i),r.stop(n+i)}}var pu="headsup.v1",h_=["#ff7a1a","#4fd88a","#5aa9ff"];function u_(t){return{name:`PLAYER ${t+1}`,color:h_[t],stars:Array(24).fill(0),best:Array(24).fill(0),sessions:[]}}function d_(){try{let t=JSON.parse(localStorage.getItem(pu));if(t&&Array.isArray(t.profiles))return t}catch{}return{active:0,profiles:[0,1,2].map(u_),settings:{motion:!1,seated:!1,volume:0.8,ticks:!0}}}var Yt={data:d_(),save(){try{localStorage.setItem(pu,JSON.stringify(this.data))}catch{}},get profile(){return this.data.profiles[this.data.active]},get settings(){return this.data.settings},setActive(t){this.data.active=t,this.save()},unlocked(t){return t===0||this.profile.stars[t-1]>0},starsFor(t){return Kh.filter((e)=>t>=e).length},recordSession(t){let e=this.profile;if(e.sessions.push(t),e.sessions.length>400)e.sessions.shift();if(t.level!=null)e.stars[t.level]=Math.max(e.stars[t.level],this.starsFor(t.score)),e.best[t.level]=Math.max(e.best[t.level],t.score);this.save()},totals(){let t=this.profile.sessions,e=t.reduce((i,s)=>i+s.reps,0),n=(i)=>{let s=t.filter((r)=>r[i]!=null);return s.length?s.reduce((r,o)=>r+o[i]*o.reps,0)/s.reduce((r,o)=>r+o.reps,0):null};return{sessions:t.length,reps:e,scanRate:n("scanRate"),scan:n("scan"),decision:n("decision"),memory:n("memory"),score:n("score"),stars:this.profile.stars.reduce((i,s)=>i+s,0)}}};var Fa={};Au(Fa,{career:()=>m_,home:()=>p_,pause:()=>Na,practice:()=>g_,repCard:()=>Da,settings:()=>x_,stars:()=>kr,stats:()=>__,summary:()=>Ua});var f_=(t,e,n,i,s)=>{let r=t.g;r.beginPath();for(let o=0;o<10;o++){let a=o%2?i*0.42:i,l=-Math.PI/2+o*Math.PI/5;r.lineTo(e+Math.cos(l)*a,n+Math.sin(l)*a)}r.closePath(),r.fillStyle=s?Lt.accent:"rgba(242,240,232,0.22)",r.fill()},kr=(t,e,n,i,s,r=s*2.3)=>{for(let o=0;o<3;o++)f_(t,n+o*r,i,s,o<e)},is=(t)=>t==null?"—":String(Math.round(t));function mu(t,e){Yt.data.profiles.forEach((n,i)=>{let s=Yt.data.active===i,r=t.w-70-(2-i)*70,o=48,a=t.g;a.beginPath(),a.arc(r,70,26,0,Math.PI*2);let l=t.hovered("prof"+i);a.fillStyle=s?n.color:l?Vt.chipHi:Vt.chip,a.fill(),a.strokeStyle=s?"rgba(255,255,255,0.5)":l?n.color:"rgba(255,255,255,0.22)",a.lineWidth=l&&!s?3:1.5,a.stroke(),t.text(String(i+1),r,71,30,{align:"center",base:"middle",color:s?"#111":Vt.dim}),t.hit("prof"+i,r-28,42,56,56,()=>{Yt.setActive(i),e.redraw()})})}function p_(t){return(e)=>{e.bg(),e.text("HEADS UP",70,150,120,{weight:800}),e.g.fillStyle=Lt.accent,e.g.fillRect(74,172,120,8),mu(e,t);let n=Yt.totals(),i=70,s=e.w-140;e.button("career",i,240,s,150,"CAREER",{primary:!0,size:64,onClick:()=>t.go("career")}),e.text(`${n.stars} / 72`,i+s-40,330,40,{align:"right",color:"#111"}),kr(e,1,i+s-250,316,16);let r=(s-40)/3;e.button("practice",i,420,r,130,"PRACTICE",{size:48,onClick:()=>t.go("practice")}),e.button("stats",i+r+20,420,r,130,"STATS",{size:48,onClick:()=>t.go("stats")}),e.button("settings",i+(r+20)*2,420,r,130,"SETTINGS",{size:48,onClick:()=>t.go("settings")});let o=Yt.profile.sessions.at(-1);if(e.card(i,584,s,90,24),e.text(Yt.profile.name,i+32,643,40,{color:Yt.profile.color}),e.text(`${n.reps} REPS`,i+292,643,40,{color:Vt.dim}),o)e.text(`LAST ${o.score}`,i+s-32,643,40,{align:"right",color:Vt.dim});if(t.xrSupported&&!t.inXR)e.button("vr",i,696,s,70,"ENTER VR",{size:38,onClick:()=>t.enterVR()})}}function m_(t){return(e)=>{e.bg();let n=t.careerStage;e.text(Sa[n],70,120,84,{weight:800});let i=Qi.filter((a)=>a.stage===n).reduce((a,l)=>a+Yt.profile.stars[l.index],0);e.text(`${i} / 18`,e.w-70,120,44,{align:"right",color:Vt.dim});let s=Qi.filter((a)=>a.stage===n),r=(e.w-140-40)/3,o=230;s.forEach((a,l)=>{let c=70+l%3*(r+20),h=170+Math.floor(l/3)*(o+20),u=Yt.unlocked(a.index),d="lvl"+a.index,f=e.hovered(d)&&u;e.card(c,h,r,o,26,{hi:f,shadow:u}),e.text(String(a.index+1).padStart(2,"0"),c+28,h+78,64,{weight:800,color:u?Lt.text:"rgba(242,240,232,0.4)"}),e.text(He[a.role].name,c+28,h+132,38,{color:u?Lt.text:"rgba(242,240,232,0.4)"});{let g=a.drill==="rondo"?`${a.difficulty} · RONDO`:a.drill==="awareness"?`${a.difficulty} · AWARENESS`:a.difficulty;e.g.font=`700 28px ${Lt.font}`;let _=e.g.measureText(g).width+36;e.g.fillStyle=u?Vt.chip:Vt.chipOff,e.rr(c+28,h+160,_,44,22),e.g.fill(),nn(e.g,c+28,h+160,_,44,22,u?0.2:0.08,0.05),e.text(g,c+46,h+183,28,{color:u?Lt.text:"rgba(242,240,232,0.25)",base:"middle"})}if(u)kr(e,Yt.profile.stars[a.index],c+r-120,h+62,17,40);else e.text("LOCKED",c+r-28,h+70,28,{align:"right",color:"rgba(242,240,232,0.25)"});if(u)e.hit(d,c,h,r,o,()=>t.startCareer(a.index))}),e.button("back",70,690,200,80,"BACK",{size:36,onClick:()=>t.go("home")}),e.button("prev",e.w-290,690,100,80,"‹",{size:60,disabled:n===0,onClick:()=>{t.careerStage--,t.redraw()}}),e.button("next",e.w-170,690,100,80,"›",{size:60,disabled:n===Sa.length-1,onClick:()=>{t.careerStage++,t.redraw()}})}}function g_(t){return(e)=>{e.bg();let n=t.practiceOpts;e.text("PRACTICE",70,120,84,{weight:800}),e.text(He[n.role].name,e.w-70,120,44,{align:"right",color:Vt.dim});let i=(s,r,o,a,l,c,h=32)=>{let d=(e.w-140-14*(s.length-1))/s.length;s.forEach((f,g)=>e.button(r+f,70+g*(d+14),o,d,a,typeof f==="number"?`${f} REPS`:f,{active:l===f,size:h,onClick:()=>{c(f),t.redraw()}}))};if(i(Ca.map((s)=>zr[s]),"x",160,84,zr[n.drill],(s)=>n.drill=Ca.find((r)=>zr[r]===s),32),i(Zh,"r",264,84,n.role,(s)=>n.role=s,32),i(va,"d",368,84,n.difficulty,(s)=>n.difficulty=s),n.drill==="match")i(["QUIZ OFF","QUIZ SOME","QUIZ EVERY REP"],"q",472,84,n.quiz,(s)=>n.quiz=s);i([5,10,20],"n",n.drill==="match"?576:472,84,n.reps,(s)=>n.reps=s),e.button("back",70,690,200,80,"BACK",{size:36,onClick:()=>t.go("home")}),e.button("start",e.w-70-360,690,360,80,"START",{primary:!0,size:44,onClick:()=>t.startPractice()})}}function __(t){return(e)=>{e.bg(),e.text("STATS",70,120,84,{weight:800}),mu(e,t);let n=Yt.totals(),i=[["REPS",String(n.reps)],["SCANS / SEC",n.scanRate==null?"—":n.scanRate.toFixed(2)],["SCANNING",is(n.scan)],["DECISIONS",is(n.decision)],["MEMORY",is(n.memory)],["STARS",`${n.stars}`]],s=(e.w-140-70)/6;i.forEach(([h,u],d)=>{let f=70+d*(s+14);e.card(f,160,s,150,22),e.text(u,f+22,250,64,{weight:800}),e.text(h,f+22,290,26,{color:Vt.dim,weight:700})});let r=Yt.profile.sessions.slice(-20),o=70,a=350,l=e.w-140,c=300;if(e.card(o,a,l,c,26),r.length<2)e.text(r.length?"ONE SESSION SO FAR":"NO SESSIONS YET",o+l/2,a+c/2,40,{align:"center",base:"middle",color:Vt.dim});else{let h=(f)=>o+40+f/(r.length-1)*(l-80),u=(f)=>a+c-40-f/100*(c-80);e.g.strokeStyle=Vt.hair,e.g.lineWidth=2;for(let f of[25,50,75])e.g.beginPath(),e.g.moveTo(o+40,u(f)),e.g.lineTo(o+l-40,u(f)),e.g.stroke();let d=(f,g,_=1)=>{e.g.strokeStyle=g,e.g.lineWidth=5,e.g.lineJoin="round",e.g.beginPath(),r.forEach((p,m)=>{let v=(p[f]??0)*_;m?e.g.lineTo(h(m),u(v)):e.g.moveTo(h(m),u(v))}),e.g.stroke()};d("score",Lt.accent),d("scan","#f2f0e8"),e.text("SCORE",o+l-40,a+44,28,{align:"right",color:Lt.accent}),e.text("SCANNING",o+l-140,a+44,28,{align:"right",color:Lt.text})}e.button("back",70,690,200,80,"BACK",{size:36,onClick:()=>t.go("home")})}}function x_(t){return(e)=>{e.bg();let n=Yt.settings;e.text("SETTINGS",70,120,84,{weight:800});let i=(r,o,a,l,c)=>{e.text(o,70,a+52,44),e.button(r+"on",e.w-70-300,a,140,76,"ON",{active:n[l],size:34,onClick:()=>{n[l]=!0,Yt.save(),c?.(),t.redraw()}}),e.button(r+"off",e.w-70-145,a,140,76,"OFF",{active:!n[l],size:34,onClick:()=>{n[l]=!1,Yt.save(),c?.(),t.redraw()}})};if(i("mv","AUTO RUN WITH PLAY",150,"motion"),i("st","SEATED",236,"seated",()=>t.applySettings()),i("tk","CLICK ON EACH SCAN",322,"ticks",()=>t.applySettings()),n.vignette===void 0)n.vignette=!0;i("vg","DIM EDGES WHEN RUNNING",408,"vignette"),e.text("VOLUME",70,546,44),e.button("vdn",e.w-70-300,494,90,76,"–",{size:48,onClick:()=>{n.volume=Math.max(0,+(n.volume-0.1).toFixed(1)),Yt.save(),t.applySettings(),t.redraw()}}),e.text(String(Math.round(n.volume*10)),e.w-70-155,546,48,{align:"center"}),e.button("vup",e.w-70-90,494,90,76,"+",{size:48,onClick:()=>{n.volume=Math.min(1,+(n.volume+0.1).toFixed(1)),Yt.save(),t.applySettings(),t.redraw()}});let s=t.resetArmed;e.button("reset",70,590,e.w-140,76,s?`CLEAR ${Yt.profile.name}? PRESS AGAIN`:`CLEAR ${Yt.profile.name}`,{size:34,onClick:()=>{if(!s){t.resetArmed=!0,t.redraw();return}let r=Yt.data.active;Yt.data.profiles[r]={...Yt.data.profiles[r],stars:Array(24).fill(0),best:Array(24).fill(0),sessions:[]},Yt.save(),t.resetArmed=!1,t.redraw()}}),e.button("back",70,690,200,80,"BACK",{size:36,onClick:()=>{t.resetArmed=!1,t.go("home")}}),e.button("tutorial",e.w-70-360,690,360,80,"PLAY TUTORIAL",{size:36,onClick:()=>{t.resetArmed=!1,t.startTutorial()}})}}function Na(t){return(e)=>{e.bg(),e.text("PAUSED",e.w/2,200,110,{weight:800,align:"center"}),e.button("resume",240,300,e.w-480,120,"RESUME",{primary:!0,size:52,onClick:()=>t.resume()}),e.button("quit",240,450,e.w-480,110,"QUIT SESSION",{size:44,onClick:()=>t.quitSession()})}}var y_={completed:["COMPLETED",Lt.good],tight:["COMPLETED UNDER PRESSURE",Lt.text],intercepted:["INTERCEPTED",Lt.bad],lost:["LOST THE BALL",Lt.bad],goal:["GOAL",Lt.good],saved:["SAVED",Lt.text],blocked:["BLOCKED",Lt.bad]};function Da(t,e,n,i,s){return(r)=>{r.bg(),r.text(`${n+1} / ${i}`,60,92,40,{color:Vt.dim});let[o,a]=y_[e.outcome];r.text(o,r.w-60,92,44,{align:"right",color:a}),r.text(String(e.total),60,290,210,{weight:800});let l=[["SCANS",`${e.scans} / ${e.scanTarget}`,e.scanScore],["DECISION",e.outcome==="lost"?"TOO LATE":e.decision===100?"BEST OPTION":`${e.decision}% OF BEST`,e.decision]];if(e.memory!=null)l.push(["MEMORY","",e.memory]);l.forEach(([d,f,g],_)=>{let p=140+_*82;r.text(d,420,p+50,40),r.text(f,640,p+50,36,{color:Vt.dim,weight:600}),r.text(String(g),r.w-60,p+50,48,{align:"right",color:g>=70?Lt.good:g>=40?Lt.text:Lt.bad})});let c=[];if(e.shoulder)c.push([`${e.shoulder} SHOULDER CHECK${e.shoulder>1?"S":""}`,Lt.good]);if(!e.sawPresser)c.push(["PRESSER UNSEEN",Lt.bad]);if(!e.sawFree)c.push(["FREE TEAMMATE UNSEEN",Lt.bad]);if(e.watchedStrike===!1)c.push(["EYES OFF THE PASS",Lt.bad]);if(e.oneTouch)c.push(["ONE TOUCH",Lt.good]);let h=60;r.g.font=`700 30px ${Lt.font}`;for(let[d,f]of c.slice(0,4)){let g=r.g.measureText(d).width+40;if(h+g>r.w-60)break;r.g.fillStyle="rgba(12,14,14,0.5)",r.rr(h,400,g,58,29),r.g.fill(),nn(r.g,h,400,g,58,29,0.24,0.07),r.text(d,h+20,438,30,{color:f}),h+=g+12}r.button("replay",60,500,360,100,"REPLAY",{size:44,onClick:()=>t.openReplay()});let u=n+1>=i;r.button("next",r.w-60-460,500,460,100,u?"FINISH":s!=null?`NEXT  ${s}`:"NEXT",{primary:!0,size:44,onClick:()=>t.nextRep()})}}function Ua(t,e,n,i){return(s)=>{if(s.bg(),s.text(String(e.score),70,320,220,{weight:800}),e.level!=null)kr(s,n,110,380,30,74),s.text(`LEVEL ${e.level+1}`,320,395,44,{color:Vt.dim,align:"left"});if([["SCANNING",is(e.scan)],["DECISIONS",is(e.decision)],["MEMORY",is(e.memory)],["SCANS / SEC",e.scanRate.toFixed(2)],["COMPLETED",`${e.completed} / ${e.reps}`]].forEach(([o,a],l)=>{let c=150+l*72;s.text(o,560,c+40,40,{color:Vt.dim,weight:600}),s.text(a,s.w-70,c+40,48,{align:"right"})}),s.button("menu",70,560,260,100,"MENU",{size:44,onClick:()=>t.go("home")}),s.button("again",350,560,300,100,"AGAIN",{size:44,onClick:()=>t.again()}),i!=null)s.button("nextlvl",670,560,s.w-740,100,`LEVEL ${i+1}`,{primary:!0,size:44,onClick:()=>t.startCareer(i)})}}var gu=(t,e,n)=>Math.max(e,Math.min(n,t)),v_=["nearest","count","free"];function _u(t){if(t.cue)return{type:"cue",snap:t,answered:!1,score:0,guess:null};let e=v_.filter((s)=>s!=="free"||t.mates.length>=3),n=e[Math.random()*e.length|0],i={type:n,snap:t,answered:!1,score:0,guess:null};if(n==="free"){let s=t.mates.filter((r)=>r!==t.freest).sort((r,o)=>r.pos.distanceTo(t.user)-o.pos.distanceTo(t.user)).slice(0,3);i.choices=[t.freest,...s].sort(()=>Math.random()-0.5)}return i}var xu=44;function S_(t,e,n,i){let s=Math.sin(t.toBall),r=Math.cos(t.toBall),o=i/xu,a=e+i/2,l=n+i/2;return{toPx(c){let h=c.x-t.user.x,u=c.z-t.user.z,d=h*s+u*r,f=-h*r+u*s;return{x:a+f*o,y:l-d*o}},toWorld(c,h){let u=(c-a)/o,d=-(h-l)/o;return{x:t.user.x+d*s-u*r,z:t.user.z+d*r+u*s}}}}function Oa(t,e){return(n)=>{n.bg();let i=n.g,s={nearest:"WHERE WAS THE NEAREST OPPONENT?",count:"OPPONENTS WITHIN 10 METRES?",free:"WHO HAD THE MOST SPACE?",cue:"WHAT COLOUR FLASHED BEHIND YOU?"};if(e.type==="cue"){let r=e.snap.cue.colors,o=e.snap.cue.names,a=300,l=30,c=(n.w-960)/2;r.forEach((h,u)=>{let d=c+u*330,f=u===e.snap.cue.color;if(e.answered)i.globalAlpha=f||e.guess===u?1:0.25,i.fillStyle=h,n.rr(d,250,300,260,26),i.fill(),i.globalAlpha=1,n.text(f?"YES":e.guess===u?"NO":"",d+150,390,64,{align:"center",base:"middle",weight:800,color:"#111"});else{if(i.fillStyle=h,n.rr(d,250,300,260,26),i.fill(),n.hovered("cue"+u))i.strokeStyle="#fff",i.lineWidth=6,n.rr(d+3,253,294,254,24),i.stroke();n.text(o[u],d+150,470,40,{align:"center",color:"#111"}),n.hit("cue"+u,d,250,300,260,()=>{e.guess=u,t.answerQuiz(u===e.snap.cue.color?100:0)})}})}if(n.text(s[e.type],n.w/2,90,56,{weight:800,align:"center"}),e.type==="nearest"){let o=(n.w-600)/2,l=S_(e.snap,o,130,600);i.save(),n.rr(o,130,600,600,28),i.clip(),i.fillStyle="rgba(30,70,30,0.78)",i.fillRect(o,130,600,600),i.strokeStyle="rgba(255,255,255,0.12)",i.lineWidth=2;for(let h of[10,20])i.beginPath(),i.arc(o+300,430,h/xu*600,0,Math.PI*2),i.stroke();let c=l.toPx(e.snap.user);if(i.fillStyle=Lt.accent,i.beginPath(),i.moveTo(c.x,c.y-22),i.lineTo(c.x-15,c.y+14),i.lineTo(c.x+15,c.y+14),i.closePath(),i.fill(),e.answered){for(let h of e.snap.opps){let u=l.toPx(h);i.fillStyle=h===e.snap.nearest?"#f2f0e8":"rgba(242,240,232,0.45)",i.beginPath(),i.arc(u.x,u.y,h===e.snap.nearest?16:11,0,Math.PI*2),i.fill()}if(e.guess){let h=l.toPx(e.guess),u=l.toPx(e.snap.nearest);i.strokeStyle=Lt.text,i.lineWidth=3,i.setLineDash([8,8]),i.beginPath(),i.moveTo(h.x,h.y),i.lineTo(u.x,u.y),i.stroke(),i.setLineDash([]),i.strokeStyle=Lt.text,i.lineWidth=5,i.beginPath(),i.arc(h.x,h.y,14,0,Math.PI*2),i.stroke()}}else if(n.hovered("map")&&t.quizCursor)i.strokeStyle=Lt.text,i.lineWidth=4,i.beginPath(),i.arc(t.quizCursor.x,t.quizCursor.y,14,0,Math.PI*2),i.stroke();if(i.restore(),nn(i,o,130,600,600,28),!e.answered)n.hit("map",o,130,600,600,(h,u)=>{let d=l.toWorld(h,u);e.guess={x:d.x,z:d.z};let f=Math.hypot(d.x-e.snap.nearest.x,d.z-e.snap.nearest.z);t.answerQuiz(Math.round(gu(100-(f-2)*9,0,100)))});else n.text(`${e.score}`,o+600+40,220,80,{weight:800,color:e.score>=60?Lt.good:Lt.bad})}if(e.type==="count"){let r=[0,1,2,3,4,5],o=150,a=20,l=(n.w-1000)/2;r.forEach((c,h)=>{let u=c===5?"5+":String(c),d=Math.min(e.snap.within,5)===c,f="c"+c;if(e.answered){let g=d?Lt.good:e.guess===c?Lt.bad:Vt.chipOff;i.fillStyle=g,n.rr(l+h*170,300,150,180,22),i.fill(),nn(i,l+h*170,300,150,180,22,0.3,0.08),n.text(u,l+h*170+75,390,80,{align:"center",base:"middle",color:d||e.guess===c?"#111":Vt.dim})}else n.button(f,l+h*170,300,150,180,u,{size:80,onClick:()=>{e.guess=c;let g=Math.abs(c-Math.min(e.snap.within,5));t.answerQuiz(g===0?100:g===1?50:0)}})})}if(e.type==="free"){let r=e.choices.length,l=(n.w-(220*r+24*(r-1)))/2;e.choices.forEach((c,h)=>{let u="f"+h,d=l+h*244,f=c===e.snap.freest;if(e.answered)i.fillStyle=f?Lt.good:e.guess===c?Lt.bad:Vt.chipOff,n.rr(d,260,220,260,26),i.fill(),nn(i,d,260,220,260,26,0.3,0.08),n.text(String(c.number),d+110,380,130,{align:"center",base:"middle",weight:800,color:f||e.guess===c?"#111":Vt.dim}),n.text(`${c.space.toFixed(0)} M`,d+110,490,36,{align:"center",color:f||e.guess===c?"#111":Vt.dim});else n.button(u,d,260,220,260,String(c.number),{size:130,r:26,onClick:()=>{e.guess=c;let g=e.snap.freest.space||1;t.answerQuiz(c===e.snap.freest?100:Math.round(gu(c.space/g*60,0,60)))}})})}}}var Ba=1.7,yu={optionalFeatures:["local-floor","bounded-floor","hand-tracking"]},M_=new URLSearchParams(location.search).has("app")||matchMedia("(display-mode: standalone)").matches;class vu{constructor(){let t=new Go({antialias:!0});t.setPixelRatio(Math.min(devicePixelRatio,2)),t.setSize(innerWidth,innerHeight),t.xr.enabled=!0,t.xr.setReferenceSpaceType("local-floor"),t.xr.setFoveation(1),document.body.appendChild(t.domElement),this.renderer=t,this.scene=new Vo,this.camera=new we(75,innerWidth/innerHeight,0.05,600),this.camera.rotation.order="YXZ",this.camera.position.y=Ba,this.rig=new ve,this.rig.add(this.camera),this.scene.add(this.rig),Jh(this.scene),this.world=new Ta(this.scene,this.rig,this.camera),this.audio=new La,this.pointer=new Pa,this.panel=new ks(this.scene,1280,800,2),this.bar=new ks(this.scene,1280,430,1.5),this.hint=new ks(this.scene,1100,170,1.4),this.pointer.panels.push(this.panel,this.bar),this.fade=new vt(new mn(0.3,16,12),new ne({color:0,side:hc,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1})),this.fade.renderOrder=9,this.camera.add(this.fade),this.fadeTo=0,this.screen="home",this.careerStage=0,this.practiceOpts={drill:"match",role:"CM",difficulty:"MEDIUM",quiz:"QUIZ SOME",reps:10},this.session=null,this.mode="boot",this.inXR=!1,this.xrSupported=!1,this.look={yaw:0,pitch:0},this.keys=new Set,this.moveSpeed=0,this.stepClock=0,this.buildVignette(),this.buildAttackMarkers(),this.setupDesktopInput(),this.setupXR(),this.applySettings(),this.toMenuView(),this.go("home"),this.clock=new oa,t.setAnimationLoop(()=>this.frame()),this.step=(e,n=30)=>{for(let i=0;i<e*n;i++)this.frame(1/n)},addEventListener("resize",()=>{this.camera.aspect=innerWidth/innerHeight,this.camera.updateProjectionMatrix(),t.setSize(innerWidth,innerHeight)})}setupDesktopInput(){let t=this.renderer.domElement;this.mouse=new ot(0,0),this.mouseActive=!1;let e=null;t.addEventListener("pointerdown",(n)=>{this.mouse.set(n.clientX/innerWidth*2-1,-(n.clientY/innerHeight)*2+1),this.mouseActive=!0,e={x:n.clientX,y:n.clientY,moved:0},t.setPointerCapture(n.pointerId)}),t.addEventListener("pointermove",(n)=>{if(this.mouse.set(n.clientX/innerWidth*2-1,-(n.clientY/innerHeight)*2+1),this.mouseActive=!0,e&&!this.inXR){let{movementX:i,movementY:s}=n;if(e.moved+=Math.abs(i)+Math.abs(s),e.moved>14)this.look.yaw-=i*0.004,this.look.pitch=Fn.clamp(this.look.pitch-s*0.004,-1.35,1.2)}}),t.addEventListener("pointerup",()=>{if(this.xrSupported&&!this.inXR){e=null,this.enterVR();return}if(e&&e.moved<=14)this.select(this.mouseRay());e=null}),addEventListener("keydown",(n)=>{if(this.audio.unlock(),n.key==="Escape")this.mode==="paused"?this.resume():this.pauseGame();let i={ArrowLeft:1,ArrowRight:-1}[n.key];if(i)this.keyTurn=i;this.keys.add(n.key.toLowerCase())}),addEventListener("keyup",(n)=>{if(["ArrowLeft","ArrowRight"].includes(n.key))this.keyTurn=0;this.keys.delete(n.key.toLowerCase())}),addEventListener("blur",()=>this.keys.clear())}mouseRay(){let t=new Os;return t.setFromCamera(this.mouse,this.camera),{origin:t.ray.origin.clone(),dir:t.ray.direction.clone(),src:"mouse"}}setupXR(){if(navigator.xr)navigator.xr.isSessionSupported("immersive-vr").then((e)=>{if(this.xrSupported=e,document.body.classList.toggle("desk",!e),document.body.classList.toggle("vr-ready",e),this.redraw(),!e)return;if(M_)this.enterVR();if(navigator.xr.offerSession)navigator.xr.offerSession("immersive-vr",yu).then((n)=>this.useSession(n)).catch(()=>{})}).catch(()=>{}),navigator.xr.addEventListener?.("sessiongranted",()=>this.enterVR()),document.getElementById("enter")?.addEventListener("click",()=>this.enterVR());else document.body.classList.add("desk");let t=new xa;this.controllers=[0,1].map((e)=>{let n=this.renderer.xr.getController(e),i=new he().setFromPoints([new b(0,0,0),new b(0,0,-1)]),s=new bn(i,new dn({color:16777215,transparent:!0,opacity:0.6}));s.scale.z=5,n.add(s);let r=new vt(new mn(0.012,10,8),new ne({color:16777215,depthTest:!1}));r.renderOrder=11,r.visible=!1,this.scene.add(r),n.userData={line:s,dot:r,index:e,connected:!1},n.addEventListener("connected",(a)=>{n.userData.connected=!0,n.userData.source=a.data}),n.addEventListener("disconnected",()=>{n.userData.connected=!1}),n.addEventListener("selectstart",()=>{this.activeCtrl=e,this.audio.unlock(),n.userData.heldSince=performance.now(),this.select(this.ctrlRay(n))}),n.addEventListener("selectend",()=>{n.userData.heldSince=null}),n.addEventListener("squeezestart",()=>this.pauseGame()),this.rig.add(n);let o=this.renderer.xr.getControllerGrip(e);return o.add(t.createControllerModel(o)),this.rig.add(o),n}),this.activeCtrl=null,this.renderer.xr.addEventListener("sessionstart",()=>{this.inXR=!0,document.body.classList.add("xr"),this.camera.position.set(0,0,0),this.camera.rotation.set(0,0,0),this.applySettings(),setTimeout(()=>{if(this.applySettings(),this.reanchor(),!Yt.data.tutorialDone&&this.mode==="menu")this.startTutorial()},400),this.renderer.xr.getReferenceSpace()?.addEventListener("reset",()=>this.reanchor()),this.redraw()}),this.renderer.xr.addEventListener("sessionend",()=>{this.inXR=!1,document.body.classList.remove("xr"),this.camera.position.set(0,Ba,0),this.rig.position.y=0,this.look.pitch=0,this.reanchor(),this.redraw()})}async enterVR(){if(!navigator.xr||this.inXR||this.entering)return;this.audio.unlock(),this.entering=!0;try{await this.useSession(await navigator.xr.requestSession("immersive-vr",yu))}catch(t){console.warn("VR failed",t);let e=document.getElementById("vrerr");if(e)e.textContent=`VR DIDN'T START: ${t.message||t}`,e.hidden=!1}this.entering=!1}async useSession(t){if(this.inXR)return;await this.renderer.xr.setSession(t)}ctrlRay(t){let e=t.matrixWorld,n=new b().setFromMatrixPosition(e),i=new b(0,0,-1).transformDirection(e);return{origin:n,dir:i,src:t}}rays(){if(!this.inXR)return this.mouseActive?[this.mouseRay()]:[];return this.controllers.filter((t)=>t.userData.connected).map((t)=>this.ctrlRay(t))}activeRay(){if(!this.inXR)return this.mouseActive?this.mouseRay():null;let t=this.controllers[this.activeCtrl];if(t?.userData.connected)return this.ctrlRay(t);let e=this.controllers.find((n)=>n.userData.connected&&n.userData.source?.handedness==="right")||this.controllers.find((n)=>n.userData.connected);return e?this.ctrlRay(e):null}select(t){if(this.audio.unlock(),!t)return;let e=this.pointer.hitPanels(t.origin,t.dir);if(e&&e.b){this.audio.ui(),e.b.onClick(e.x,e.y);return}if(e)return;if(this.mode==="play"&&this.rep)this.rep.aim(t.origin,t.dir),this.rep.select()}buildAttackMarkers(){let t=new Ls;t.moveTo(0,0.22),t.lineTo(0.2,0),t.lineTo(0,-0.22),t.lineTo(-0.08,-0.22),t.lineTo(0.11,0),t.lineTo(-0.08,0.22),t.closePath();let e=new Ns(t);e.rotateX(-Math.PI/2),this.chevrons=new ve,this.chevronMats=[0,1,2].map((i)=>{let s=new ne({color:16742938,transparent:!0,opacity:0.5,depthWrite:!1}),r=new vt(e,s);return r.position.set(0.9+i*0.32,0.015,0),this.chevrons.add(r),s}),this.chevrons.visible=!1,this.scene.add(this.chevrons);let n=new Ls;n.moveTo(-0.7,0.5),n.lineTo(0.7,0.5),n.lineTo(0,-0.55),n.closePath(),this.goalMarker=new vt(new Ns(n),new ne({color:16742938,transparent:!0,opacity:0.85,side:qi,depthWrite:!1})),this.goalMarker.position.set(52.5,4.6,0),this.goalMarker.visible=!1,this.scene.add(this.goalMarker),this.markerT=0}updateAttackMarkers(t){let e=["play","card","quiz"].includes(this.mode)&&this.rep&&this.session?.drill!=="rondo";if(this.chevrons.visible=this.goalMarker.visible=!!e&&this.mode!=="quiz",!e)return;this.markerT+=t;let n=this.world.userPos();this.chevrons.position.set(n.x,0,n.z),this.chevronMats.forEach((r,o)=>{r.opacity=0.25+0.45*Math.max(0,Math.sin(this.markerT*3-o*0.9))});let i=this.headPos(),s=this.goalMarker;s.lookAt(i.x,s.position.y,i.z),s.scale.setScalar(Math.max(1,i.distanceTo(s.position)/22)),s.position.y=4.6+s.scale.x*0.6+Math.sin(this.markerT*2)*0.15}buildVignette(){let t=document.createElement("canvas");t.width=t.height=256;let e=t.getContext("2d"),n=e.createRadialGradient(128,128,40,128,128,128);n.addColorStop(0,"rgba(0,0,0,0)"),n.addColorStop(0.55,"rgba(0,0,0,0)"),n.addColorStop(1,"rgba(0,0,0,1)"),e.fillStyle=n,e.fillRect(0,0,256,256);let i=new fn(t);this.vignette=new vt(new De(0.62,0.62),new ne({map:i,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1})),this.vignette.position.z=-0.2,this.vignette.renderOrder=8,this.vignette.visible=!1,this.camera.add(this.vignette)}locomotion(t){let e=this.rep,n=this.mode==="play"&&e&&(e.state==="buildup"||e.state==="incoming"),i=0,s=0,r=!1,o=this.world.headYaw(),a=0;if(this.inXR){let d=this.renderer.xr.getSession();for(let f of d?.inputSources||[]){let g=f.gamepad;if(!g||g.axes.length<4)continue;if(f.handedness==="left"){if(i=g.axes[2],s=g.axes[3],r=!!g.buttons[3]?.pressed||this.sprintLatch,g.buttons[3]?.pressed)this.sprintLatch=!0;let _=this.controllers.find((p)=>p.userData.source===f);if(_){let p=new b(0,0,-1).transformDirection(_.matrixWorld);o=Math.atan2(p.x,p.z)}}else if(f.handedness==="right")a=g.axes[2]}}else{let d=this.keys;s=(d.has("s")?1:0)-(d.has("w")?1:0),i=(d.has("d")?1:0)-(d.has("a")?1:0),r=d.has("shift")}if(Math.abs(a)>0.7&&!this.turnHeld&&["play","menu","card","summary","replay"].includes(this.mode)){this.turnHeld=!0;let d=Math.sign(a)*-Math.PI/6;this.world.placeUser(this.world.userPos(),this.world.headYaw()+d)}else if(Math.abs(a)<0.3)this.turnHeld=!1;let l=Math.hypot(i,s);if(l<0.15)l=0,this.sprintLatch=!1;let c=0;if(n&&l>0){if(c=(r?7.2:4)*Math.min(1,l),e.state==="incoming")c=Math.min(c,3)}if(this.moveSpeed+=(c-this.moveSpeed)*Math.min(1,t*(c>this.moveSpeed?4:7)),this.moveSpeed>0.05&&l>0&&n){let d=Math.sin(o),f=Math.cos(o),g=-Math.cos(o),_=Math.sin(o),p=d*-s+g*i,m=f*-s+_*i,v=Math.hypot(p,m)||1;p/=v,m/=v;let x=this.world.userPos(),E=Fn.clamp(x.x+p*this.moveSpeed*t,-52,52),I=Fn.clamp(x.z+m*this.moveSpeed*t,-33.5,33.5);if(this.world.moveUser(E-x.x,I-x.z),e.motion=!1,this.stepClock-=t*(1.6+this.moveSpeed*0.32),this.stepClock<=0)this.stepClock=1,this.audio.step(this.moveSpeed/7.2)}else if(!n)this.moveSpeed=0;if(e?.state==="incoming"&&this.world.ball.flight){let d=this.world.ball.flight,f=this.world.userPos(),g=d.from,_=new b(g.x-f.x,0,g.z-f.z).normalize();d.to.set(f.x+_.x*0.6,0.11,f.z+_.z*0.6)}let h=this.vignette.material,u=Yt.settings.vignette!==!1&&this.inXR?Math.min(0.9,this.moveSpeed/7.2):0;h.opacity+=(u-h.opacity)*Math.min(1,t*6),this.vignette.visible=h.opacity>0.02}pollButtons(){if(!this.inXR)return;for(let e of this.controllers){let n=e.userData.heldSince;if(n&&performance.now()-n>1000&&["play","quiz"].includes(this.mode)&&!this.pointer.hitPanels(...Object.values(this.ctrlRay(e)).slice(0,2)))e.userData.heldSince=null,this.pauseGame()}let t=this.renderer.xr.getSession();if(!t)return;for(let e of t.inputSources){let n=e.gamepad?.buttons;if(!n)continue;let i=n[4]?.pressed||n[5]?.pressed,s=e.handedness;if(this.btnPrev=this.btnPrev||{},i&&!this.btnPrev[s]){if(this.mode==="play"||this.mode==="quiz")this.pauseGame();else if(this.mode==="paused")this.resume()}this.btnPrev[s]=i}}applySettings(){let t=Yt.settings;this.audio.setVolume(t.volume),this.audio.ticks=t.ticks,this.rig.position.y=this.eyeOffset()}eyeOffset(){if(!this.inXR||!Yt.settings.seated)return 0;return Math.max(0,1.65-(this.camera.position.y||1.2))}headPos(){let t=new b;return this.camera.getWorldPosition(t),t}toMenuView(){this.world.placeUser(new b(0,0,-37.5),0)}reanchor(){if(this.mode==="menu"||this.mode==="summary"){this.toMenuView(),this.placePanel();return}let t=this.rep;if(t&&t.userBody&&this.mode!=="replay"){if(this.world.placeUser(t.userBody.pos,Math.atan2(this.world.ball.pos.x-t.userBody.pos.x,this.world.ball.pos.z-t.userBody.pos.z)),this.panel.mesh.visible)this.placePanel()}}placePanel(t=-0.1,e=2.3){let n=this.world.headYaw();this.panel.placeFacing(this.headPos(),n,e,t)}go(t){let e=this.mode==="menu";if(this.screen=t,this.mode="menu",this.hideHint(),this.rep=null,this.quiz=null,this.session=null,this.endReplay(),this.bar.hide(),this.panel.show(Fa[t](this)),!e)this.world.clearOverlays(),this.world.idle(),this.toMenuView(),this.setFade(1,!0),this.setFade(0),this.placePanel()}redraw(){if(this.panel.mesh.visible)this.panel.redraw()}startCareer(t){let e=Qi[t];this.beginSession({level:t,role:e.role,difficulty:e.difficulty,reps:e.reps,quizChance:e.quizChance,drill:e.drill})}startPractice(){let t=this.practiceOpts,e={"QUIZ OFF":0,"QUIZ SOME":0.3,"QUIZ EVERY REP":1}[t.quiz];this.beginSession({level:null,role:t.role,difficulty:t.difficulty,reps:t.reps,quizChance:e,drill:t.drill})}again(){this.beginSession({...this.lastSessionOpts})}startTutorial(){this.beginSession({level:null,role:"CM",difficulty:"EASY",reps:3,quizChance:0,tutorial:!0})}tutorialStep(){let t=this.session,e=this.rep;if(!t?.tutorial||!e)return;if(t.index===0&&e.state==="decide")e.decideT=0;let n=e.scans.length+(e.inScan?1:0),i=this.inXR?"POINT AT A TEAMMATE · PULL THE TRIGGER":"CLICK A TEAMMATE TO PASS",s=null,r=this.inXR?"LEFT STICK RUNS · CLICK IT TO SPRINT":"WASD RUNS · SHIFT SPRINTS";if(e.state==="buildup")s=n===0?t.index===0?"LOOK OVER YOUR SHOULDER":r:`SCANS ${n}`;else if(e.state==="incoming"||e.state==="decide")s=t.index<2?i:null;if(t.index===2)s=e.state==="buildup"&&n?`SCANS ${n}`:null;if(s===this.hintText)return;if(this.hintText=s,!s){this.hint.hide();return}if(this.hint.show((o)=>{o.bg(60),o.text(s,o.w/2,o.h/2+4,76,{align:"center",base:"middle",weight:800})}),!this.hintPlaced)this.hintPlaced=!0,this.hint.placeFacing(this.headPos(),this.world.headYaw(),3.2,0.75)}ballPan(){let t=this.world.ball.pos,e=this.headPos(),n=this.world.headYaw(),i=Math.atan2(t.x-e.x,t.z-e.z)-n;return[-Math.sin(i),Math.hypot(t.x-e.x,t.z-e.z)]}hideHint(){this.hint.hide(),this.hintText=null,this.hintPlaced=!1}beginSession(t){this.lastSessionOpts=t,this.session={...t,index:0,results:[]},this.panel.hide(),this.startRep()}startRep(){let t=this.session,e=t.quizChance>=1||Math.random()<t.quizChance||t.quizChance>0.5&&t.index===t.reps-1&&!t.results.some((i)=>i.memory!=null),n=Ra[t.drill||"match"];this.rep=new n(this.world,{role:t.role,difficulty:t.difficulty,quiz:e,motion:Yt.settings.motion,fx:{kick:(i)=>this.audio.kick(i,...this.ballPan()),touch:()=>this.audio.touch(...this.ballPan()),tick:()=>this.audio.tick(),whistle:()=>this.audio.whistle(),cheer:(i)=>this.audio.cheer(i),groan:()=>this.audio.groan(),ui:()=>this.audio.ui()}}),this.mode="play",this.panel.hide(),this.hideHint(),this.quiz=null,this.setFade(1,!0),this.rep.start(),this.look.pitch=0,this.setFade(0),this.holdT=0.6}setFade(t,e=!1){if(this.fadeTo=t,e)this.fade.material.opacity=t}pauseGame(){if(this.mode!=="play"&&this.mode!=="quiz")return;this.pausedFrom=this.mode,this.mode="paused",this.panel.show(Na(this)),this.placePanel()}resume(){if(this.mode!=="paused")return;if(this.mode=this.pausedFrom||"play",this.mode==="quiz"&&this.quiz)this.panel.show(Oa(this,this.quiz)),this.placePanel(-0.05,2.1);else this.panel.hide()}quitSession(){this.go("home")}answerQuiz(t){let e=this.quiz;if(!e||e.answered)return;e.answered=!0,e.score=t,this.audio.ui(),this.panel.redraw(),setTimeout(()=>{if(this.quiz!==e)return;this.panel.hide(),this.quiz=null,this.setFade(0),this.rep.endQuiz(t),this.mode="play"},1700)}showCard(){this.hideHint();let t=this.session,e=this.rep.result;t.results.push(e),this.mode="card",this.cardCountdown=t.index+1<t.reps?6:null,this.cardTimer=0,this.drawCard(),this.placePanel(-0.15,2.2)}drawCard(){let t=this.session;this.panel.show(Da(this,this.rep.result,t.index,t.reps,this.cardCountdown==null?null:Math.ceil(this.cardCountdown)))}nextRep(){let t=this.session;if(this.endReplay(),t.index++,t.index>=t.reps)return this.finishSession();this.startRep()}finishSession(){let t=this.session,e=t.results,n=(o)=>{let a=e.map(o).filter((l)=>l!=null);return a.length?Math.round(a.reduce((l,c)=>l+c,0)/a.length):null},i={date:Date.now(),level:t.level,role:t.role,difficulty:t.difficulty,reps:e.length,score:n((o)=>o.total),scan:n((o)=>o.scanScore),decision:n((o)=>o.decision),memory:n((o)=>o.memory),scanRate:e.reduce((o,a)=>o+a.scanRate,0)/e.length,completed:e.filter((o)=>["completed","tight","goal"].includes(o.outcome)).length};if(Yt.recordSession(i),t.tutorial)Yt.data.tutorialDone=!0,Yt.save();let s=Yt.starsFor(i.score),r=t.level!=null&&t.level<Qi.length-1&&Yt.unlocked(t.level+1)?t.level+1:null;this.audio.whistle(!0),this.mode="summary",this.rep=null,this.world.clearOverlays(),this.world.idle(),this.toMenuView(),this.panel.show(Ua(this,i,s,r)),this.placePanel()}openReplay(){let t=this.rep;if(!t?.frames.length)return;this.mode="replay",this.cardCountdown=null,this.replay={t:t.frames[0].t,playing:!0,view:"above",speed:0.6},t.userBody.setVisible(!0),this.showReplayPanel(),this.setReplayView("above")}showReplayPanel(){let t=this.replay,e=this.rep,n=e.frames[0].t,i=e.frames.at(-1).t;this.panel.hide(),this.bar.show((s)=>{s.bg();let r=60,o=s.w-120,a=120;s.text("REPLAY",r,92,60,{weight:800}),s.text(`${(t.t-n).toFixed(1)} S`,s.w-60,92,44,{align:"right",color:"rgba(242,240,232,0.55)"}),s.g.fillStyle="rgba(242,240,232,0.12)",s.rr(r,a+30,o,16,8),s.g.fill();let l=(d)=>r+(d-n)/(i-n||1)*o;s.g.fillStyle="#f2f0e8",s.rr(r,a+30,l(t.t)-r,16,8),s.g.fill();for(let d of e.scans)s.g.fillStyle=d.shoulder?"#4fd88a":"#ffe08a",s.g.fillRect(l(d.t)-3,a+6,6,64);for(let d of e.events){if(!["final","receive","decide","lost"].includes(d.type))continue;s.g.fillStyle=d.type==="lost"?"#ff5a4f":"#ff7a1a",s.g.beginPath(),s.g.arc(l(d.t),a+38,14,0,Math.PI*2),s.g.fill()}s.hit("scrub",r,a,o,80,(d)=>{t.t=n+(d-r)/o*(i-n),t.playing=!1,this.bar.redraw()});let c=[["SCAN","#ffe08a"],["SHOULDER CHECK","#4fd88a"],["BEST PASS","#4fd88a"],["YOUR PASS","#f2f0e8"]],h=r;c.forEach(([d,f],g)=>{if(s.g.fillStyle=f,g<2)s.g.fillRect(h,238,6,30);else s.g.fillRect(h,250,30,6);h+=g<2?18:42,h+=s.text(d,h,264,30,{color:"rgba(242,240,232,0.7)",weight:600})+34});let u=(o-60)/4;s.button("pp",r,310,u,100,t.playing?"PAUSE":"PLAY",{size:40,onClick:()=>{if(t.playing=!t.playing,t.t>=i)t.t=n;this.bar.redraw()}}),s.button("va",r+(u+20),310,u,100,"ABOVE",{size:40,active:t.view==="above",onClick:()=>this.setReplayView("above")}),s.button("vp",r+(u+20)*2,310,u,100,"ON PITCH",{size:40,active:t.view==="pitch",onClick:()=>this.setReplayView("pitch")}),s.button("done",r+(u+20)*3,310,u,100,"DONE",{primary:!0,size:40,onClick:()=>this.closeReplay()})})}setReplayView(t){let e=this.replay,n=this.rep;this.setFade(1,!0),this.setFade(0),e.view=t;let i=n.frames.find((a)=>n.events.find((l)=>l.type==="receive")?a.t>=n.events.find((l)=>l.type==="receive").t:!0)||n.frames.at(-1),s=i.f[0],r=i.f[1],o=Math.atan2(i.f[3]-s,i.f[5]-r);if(t==="above"){let a=new b(s-Math.sin(o)*9,0,r-Math.cos(o)*9);if(this.world.placeUser(a,o),this.rig.position.y=this.inXR?11:11-Ba+1.7,!this.inXR)this.look.pitch=-0.75}else if(this.rig.position.y=this.eyeOffset(),this.world.placeUser(new b(s,0,r),o),!this.inXR)this.look.pitch=0;if(this.rig.updateMatrixWorld(!0),!this.inXR)this.camera.rotation.set(this.look.pitch,this.look.yaw,0);this.camera.updateMatrixWorld(!0),this.bar.redraw(),this.placeAlongGaze(this.bar,2,0.42)}placeAlongGaze(t,e,n){let i=this.headPos(),s=new b;this.camera.getWorldDirection(s);let r=new b().crossVectors(s,new b(0,1,0)).normalize();s.applyAxisAngle(r,-n),t.mesh.position.copy(i).addScaledVector(s,e),t.mesh.lookAt(i)}replayStep(t){let e=this.replay,n=this.rep,i=n.frames,s=i[0].t,r=i.at(-1).t;if(e.playing){if(e.t+=t*e.speed,e.t>=r)e.t=r,e.playing=!1,this.bar.redraw()}let o=i.findIndex((_)=>_.t>=e.t);if(o<0)o=i.length-1;let a=i[Math.max(0,o-1)],l=i[o],c=l.t>a.t?(e.t-a.t)/(l.t-a.t):0,h=(_)=>a.f[_]+(l.f[_]-a.f[_])*c,u=(_)=>{let p=l.f[_]-a.f[_];return p=Math.atan2(Math.sin(p),Math.cos(p)),a.f[_]+p*c};this.world.ball.set(h(3),h(5),h(4)),[...n.home,...n.away].forEach((_,p)=>{let m=6+p*3,v=h(m),x=h(m+1),E=Math.hypot(v-_.pos.x,x-_.pos.z)/Math.max(t,0.001);_.pos.set(v,0,x),_.heading=u(m+2),_.animate(t*e.speed,e.playing?Math.min(8,E):0),_.sync()});let f=this.world;f.cone.visible=!0,f.cone.position.set(h(0),0.03,h(1)),f.cone.rotation.y=u(2);let g=n.events.find((_)=>_.type==="decide"||_.type==="lost");if(g&&e.t>=g.t-0.05){let _=n.result.best,p=n.result.chosen,m={x:h(0),z:h(1)},v=(x)=>x.kind==="shot"?{x:52.5,z:0}:x.target.pos;f.setLine(f.bestLine,_?m:null,_?v(_):null),f.setLine(f.choiceLine,p?m:null,p?v(p):null)}else f.setLine(f.bestLine,null,null),f.setLine(f.choiceLine,null,null);if(this.replayRedrawT=(this.replayRedrawT||0)-t,e.playing&&this.replayRedrawT<=0)this.replayRedrawT=0.1,this.bar.redraw()}closeReplay(){this.endReplay(),this.mode="card",this.drawCard(),this.placePanel(-0.15,2.2)}endReplay(){if(!this.replay)return;if(this.replay=null,this.bar.hide(),this.world.clearOverlays(),this.rig.position.y=this.eyeOffset(),!this.inXR)this.look.pitch=0;let t=this.rep;if(t){t.userBody.setVisible(!1);let e=t.frames.at(-1).f;this.world.placeUser(new b(e[0],0,e[1]),this.world.headYaw()),this.setFade(1,!0),this.setFade(0)}}frame(t){let e=t??Math.min(0.05,this.clock.getDelta());if(!this.inXR){if(this.keyTurn)this.look.yaw+=this.keyTurn*e*2.4;this.camera.rotation.set(this.look.pitch,this.look.yaw,0)}this.pollButtons(),this.locomotion(e),this.updateAttackMarkers(e);let n=this.fade.material;if(n.opacity+=(this.fadeTo-n.opacity)*Math.min(1,e*8),this.fade.visible=n.opacity>0.01,this.mode==="menu"||this.mode==="summary")this.world.idleStep(e);if(this.mode==="play"&&this.rep){if(this.holdT>0)this.holdT-=e;else this.rep.update(e);this.tutorialStep();let i=this.activeRay();if(i)this.rep.aim(i.origin,i.dir);if(this.rep.state==="quiz"&&!this.quiz)this.quiz=_u(this.rep.snapshot),this.mode="quiz",this.setFade(1),this.panel.show(Oa(this,this.quiz)),this.placePanel(-0.05,2.1);if(this.rep.state==="done")this.showCard()}if(this.mode==="card"&&this.cardCountdown!=null){let i=Math.ceil(this.cardCountdown);if(this.cardCountdown-=e,this.cardCountdown<=0)this.nextRep();else if(Math.ceil(this.cardCountdown)!==i)this.drawCard()}if(this.mode==="replay")this.replayStep(e);this.updatePointers(),this.renderer.render(this.scene,this.camera)}updatePointers(){let t=this.rays(),e=null,n=null,i=null;for(let s of this.controllers)s.userData.dot.visible=!1;for(let s of t){let r=this.pointer.hitPanels(s.origin,s.dir);if(s.src!=="mouse"){let o=s.src.userData;if(o.line.scale.z=r?r.distance:this.mode==="play"?30:5,o.line.material.opacity=r||this.mode!=="play"?0.6:0.3,r)o.dot.visible=!0,o.dot.position.copy(r.point)}if(r){if(r.b&&!e)e=r.b.id,n=r.panel;if(r.b?.id==="map")i={x:r.x,y:r.y}}}if(!this.inXR)this.renderer.domElement.style.cursor=e?"pointer":"grab";if(i){let s=performance.now();if((!this.quizCursor||Math.hypot(i.x-this.quizCursor.x,i.y-this.quizCursor.y)>2)&&s-(this.cursorDrawn||0)>60)this.quizCursor=i,this.cursorDrawn=s,this.panel.redraw()}for(let s of this.pointer.panels)s.setHover(s===n?e:null)}}var E_=Promise.race([Promise.all(['800 40px "Barlow Condensed"','700 40px "Barlow Condensed"','600 40px "Barlow Condensed"'].map((t)=>document.fonts.load(t))),new Promise((t)=>setTimeout(t,2500))]);E_.then(()=>{window.app=new vu,document.getElementById("boot")?.remove()});
