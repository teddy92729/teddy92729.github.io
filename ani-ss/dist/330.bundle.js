"use strict";(self.webpackChunkani_ss=self.webpackChunkani_ss||[]).push([[330],{624:(n,e,t)=>{t.d(e,{_s:()=>I,ug:()=>S,Pd:()=>T,mH:()=>P,dT:()=>O,oH:()=>C,rf:()=>D,HK:()=>H,dr:()=>k,sr:()=>B,_7:()=>L,aZ:()=>F,ZB:()=>$,Bu:()=>K,k5:()=>N,Km:()=>U,aJ:()=>W,lC:()=>q,vs:()=>M,UK:()=>j,Ct:()=>R,zV:()=>V,LN:()=>z,eK:()=>Z,cA:()=>G,OW:()=>J,T2:()=>X,jm:()=>Y,CU:()=>Q,RA:()=>nn,Si:()=>en,de:()=>tn,cu:()=>rn,f$:()=>on,Bq:()=>un,Nd:()=>cn,_K:()=>an,WP:()=>fn,eu:()=>ln,d$:()=>sn,Wb:()=>dn,PB:()=>gn,tv:()=>mn,WG:()=>_n,NW:()=>wn,xQ:()=>bn,Hv:()=>hn,vy:()=>vn,gZ:()=>yn,M1:()=>pn,TY:()=>An,GW:()=>En,oM:()=>xn,kZ:()=>In,Uc:()=>Sn,qE:()=>Tn,XT:()=>Pn,BC:()=>On,X$:()=>Cn,Ih:()=>Dn,yq:()=>Hn,gk:()=>kn,h4:()=>Bn,fY:()=>Ln,Or:()=>Fn,_4:()=>$n,Dy:()=>Kn,MH:()=>Nn,mR:()=>Un,hz:()=>Wn});var r=t(579);n=t.hmd(n);var o=t(731).TextDecoder,i=t(731).TextEncoder;const u=new Array(32).fill(void 0);function c(n){return u[n]}u.push(void 0,null,!0,!1);let a=u.length;function f(n){a===u.length&&u.push(u.length+1);const e=a;return a=u[e],u[e]=n,e}function l(n){return null==n}let s=null,d=null;function g(){return null!==d&&d.buffer===r.memory.buffer||(d=new Int32Array(r.memory.buffer)),d}let m=new(void 0===o?(0,n.require)("util").TextDecoder:o)("utf-8",{ignoreBOM:!0,fatal:!0});m.decode();let _=null;function w(){return null!==_&&_.buffer===r.memory.buffer||(_=new Uint8Array(r.memory.buffer)),_}function b(n,e){return m.decode(w().subarray(n,n+e))}function h(n){const e=typeof n;if("number"==e||"boolean"==e||null==n)return`${n}`;if("string"==e)return`"${n}"`;if("symbol"==e){const e=n.description;return null==e?"Symbol":`Symbol(${e})`}if("function"==e){const e=n.name;return"string"==typeof e&&e.length>0?`Function(${e})`:"Function"}if(Array.isArray(n)){const e=n.length;let t="[";e>0&&(t+=h(n[0]));for(let r=1;r<e;r++)t+=", "+h(n[r]);return t+="]",t}const t=/\[object ([^\]]+)\]/.exec(toString.call(n));let r;if(!(t.length>1))return toString.call(n);if(r=t[1],"Object"==r)try{return"Object("+JSON.stringify(n)+")"}catch(n){return"Object"}return n instanceof Error?`${n.name}: ${n.message}\n${n.stack}`:r}let v=0,y=new(void 0===i?(0,n.require)("util").TextEncoder:i)("utf-8");const p="function"==typeof y.encodeInto?function(n,e){return y.encodeInto(n,e)}:function(n,e){const t=y.encode(n);return e.set(t),{read:n.length,written:t.length}};function A(n,e,t){if(void 0===t){const t=y.encode(n),r=e(t.length);return w().subarray(r,r+t.length).set(t),v=t.length,r}let r=n.length,o=e(r);const i=w();let u=0;for(;u<r;u++){const e=n.charCodeAt(u);if(e>127)break;i[o+u]=e}if(u!==r){0!==u&&(n=n.slice(u)),o=t(o,r,r=u+3*n.length);const e=w().subarray(o+u,o+r);u+=p(n,e).written}return v=u,o}function E(n,e){return w().subarray(n/1,n/1+e)}function x(n,e){try{return n.apply(this,e)}catch(n){r.__wbindgen_exn_store(f(n))}}class I{static __wrap(n){const e=Object.create(I.prototype);return e.ptr=n,e}__destroy_into_raw(){const n=this.ptr;return this.ptr=0,n}free(){const n=this.__destroy_into_raw();r.__wbg_aniss_free(n)}constructor(n){var e=r.aniss_new(f(n));return I.__wrap(e)}resizeTextures(){r.aniss_resizeTextures(this.ptr)}setScale(n){r.aniss_setScale(this.ptr,!l(n),l(n)?0:n)}setSource(n){r.aniss_setSource(this.ptr,f(n))}addProgram(n){var e=A(n,r.__wbindgen_malloc,r.__wbindgen_realloc),t=v;return 0!==r.aniss_addProgram(this.ptr,e,t)}render(){return 0!==r.aniss_render(this.ptr)}}function S(n){!function(n){const e=c(n);(function(n){n<36||(u[n]=a,a=n)})(n)}(n)}function T(n){var e=c(n).createTexture();return l(e)?0:f(e)}function P(n,e,t){c(n).bindTexture(e>>>0,c(t))}function O(n,e,t,r){c(n).texParameteri(e>>>0,t>>>0,r)}function C(){return f(r.memory)}function D(n){return f(c(n).buffer)}function H(n,e,t){return f(new Float32Array(c(n),e>>>0,t>>>0))}function k(n){return f(new Float32Array(c(n)))}function B(n){return f(c(n).buffer)}function L(n){var e=c(n).createBuffer();return l(e)?0:f(e)}function F(n,e,t){c(n).bindBuffer(e>>>0,c(t))}function $(n,e,t,r){c(n).bufferData(e>>>0,c(t),r>>>0)}function K(n){var e=c(n).createFramebuffer();return l(e)?0:f(e)}function N(n){var e=c(n).createProgram();return l(e)?0:f(e)}function U(n,e){var t=c(n).createShader(e>>>0);return l(t)?0:f(t)}function W(n,e,t){c(n).attachShader(c(e),c(t))}function q(n,e){c(n).linkProgram(c(e))}function M(n,e,t){return f(c(n).getProgramParameter(c(e),t>>>0))}function j(n){return!c(n)}function R(){return x((function(n,e,t,r,o,i,u,a,f,l,s){c(n).texImage2D(e>>>0,t,r,o,i,u,a>>>0,f>>>0,0===l?void 0:E(l,s))}),arguments)}function V(n){return c(n).width}function z(n){return c(n).height}function Z(n){return c(n).videoWidth}function G(n){return c(n).videoHeight}function J(n){return c(n).width}function X(n){return c(n).height}function Y(n){var e=c(n).canvas;return l(e)?0:f(e)}function Q(n){return c(n)instanceof HTMLCanvasElement}function nn(n,e){c(n).width=e>>>0}function en(n,e){c(n).height=e>>>0}function tn(n,e){var t=A(c(e).tagName,r.__wbindgen_malloc,r.__wbindgen_realloc),o=v;g()[n/4+1]=o,g()[n/4+0]=t}function rn(n){return c(n)instanceof HTMLVideoElement}function on(n){return c(n)instanceof HTMLImageElement}function un(n,e,t){var o=c(e).getProgramInfoLog(c(t)),i=l(o)?0:A(o,r.__wbindgen_malloc,r.__wbindgen_realloc),u=v;g()[n/4+1]=u,g()[n/4+0]=i}function cn(){return x((function(n,e,t,r,o,i,u){c(n).texImage2D(e>>>0,t,r,o>>>0,i>>>0,c(u))}),arguments)}function an(){return x((function(n,e,t,r,o,i,u){c(n).texImage2D(e>>>0,t,r,o>>>0,i>>>0,c(u))}),arguments)}function fn(){return x((function(n,e,t,r,o,i,u){c(n).texImage2D(e>>>0,t,r,o>>>0,i>>>0,c(u))}),arguments)}function ln(n,e){c(n).disable(e>>>0)}function sn(n,e,t,r,o){c(n).viewport(e,t,r,o)}function dn(n,e,t){c(n).bindFramebuffer(e>>>0,c(t))}function gn(n,e,t,r,o,i){c(n).framebufferTexture2D(e>>>0,t>>>0,r>>>0,c(o),i)}function mn(n,e){c(n).useProgram(c(e))}function _n(n,e){c(n).enableVertexAttribArray(e>>>0)}function wn(n,e,t,r,o,i,u){c(n).vertexAttribPointer(e>>>0,t,r>>>0,0!==o,i,u)}function bn(n,e){c(n).activeTexture(e>>>0)}function hn(n,e,t){c(n).uniform1i(c(e),t)}function vn(n,e,t,r){c(n).uniform2f(c(e),t,r)}function yn(n,e,t,r){c(n).drawArrays(e>>>0,t,r)}function pn(n,e){const t=c(e);var o="number"==typeof t?t:void 0;(null!==s&&s.buffer===r.memory.buffer||(s=new Float64Array(r.memory.buffer)),s)[n/8+1]=l(o)?0:o,g()[n/4+0]=!l(o)}function An(n,e,t){var r=c(n).getActiveAttrib(c(e),t>>>0);return l(r)?0:f(r)}function En(n,e){var t=A(c(e).name,r.__wbindgen_malloc,r.__wbindgen_realloc),o=v;g()[n/4+1]=o,g()[n/4+0]=t}function xn(n,e,t,r){return c(n).getAttribLocation(c(e),b(t,r))}function In(n,e,t){var r=c(n).getActiveUniform(c(e),t>>>0);return l(r)?0:f(r)}function Sn(n,e,t,r){var o=c(n).getUniformLocation(c(e),b(t,r));return l(o)?0:f(o)}function Tn(n,e,t,r){c(n).shaderSource(c(e),b(t,r))}function Pn(n,e){c(n).compileShader(c(e))}function On(n,e,t){return f(c(n).getShaderParameter(c(e),t>>>0))}function Cn(n,e,t){var o=c(e).getShaderInfoLog(c(t)),i=l(o)?0:A(o,r.__wbindgen_malloc,r.__wbindgen_realloc),u=v;g()[n/4+1]=u,g()[n/4+0]=i}function Dn(){return f(new Error)}function Hn(n,e){var t=A(c(e).stack,r.__wbindgen_malloc,r.__wbindgen_realloc),o=v;g()[n/4+1]=o,g()[n/4+0]=t}function kn(n,e){try{console.error(b(n,e))}finally{r.__wbindgen_free(n,e)}}function Bn(n,e){return f(b(n,e))}function Ln(n,e){var t=A(h(c(e)),r.__wbindgen_malloc,r.__wbindgen_realloc),o=v;g()[n/4+1]=o,g()[n/4+0]=t}function Fn(n,e){throw new Error(b(n,e))}function $n(n,e,t,r){console.debug(c(n),c(e),c(t),c(r))}function Kn(n,e,t,r){console.error(c(n),c(e),c(t),c(r))}function Nn(n,e,t,r){console.info(c(n),c(e),c(t),c(r))}function Un(n,e,t,r){console.log(c(n),c(e),c(t),c(r))}function Wn(n,e,t,r){console.warn(c(n),c(e),c(t),c(r))}},330:(n,e,t)=>{t.r(e);var r=t(624);let o=null;const i=function(n){return!o||o.addProgram(n)};window.addCustomProgram=i,function(){const n=document.getElementById("vid"),e=document.getElementById("canv"),t=e.getContext("webgl2");n.addEventListener("canplaythrough",(function(){n.play()}),!0),n.addEventListener("loadeddata",(function(){o||(o=new r._s(t)),o.setSource(n)}),!0),n.addEventListener("error",(function(){alert("Can't load the video.")}),!0),o=new r._s(t),console.log(n),console.log(e),document.dispatchEvent(new CustomEvent("anime4kReady")),requestAnimationFrame((function n(){o&&o.render(),requestAnimationFrame(n)}))}(),window.addSimpleProgram=function(){o&&(o.addProgram("\n//!DESC Linear-Upscale\n//!HOOK NATIVE\n//!BIND HOOKED\n//!WIDTH NATIVE.w 2 *\n//!HEIGHT NATIVE.h 2 *\n\nvec4 hook() {\n    return HOOKED_tex(HOOKED_pos);\n}\n    "),alert("Added simple program"))},window.onSelectShader=function(n){if(n.files&&n.files[0]){let e=new FileReader;e.onload=n=>{let e=n.target.result;i(e)?alert("Program was added successfully!"):alert("Custom program added with error, check log for details")},e.readAsText(n.files[0])}},window.onSelectFile=function(n){if(n.files&&n.files[0]){let e=new FileReader;e.onload=e=>{let t=e.target.result;"img"===function(n){const e=["mp4","webm","ogv","ogg"];let t=n.split(".").pop().split(/\#|\?/)[0];for(let n of e)if(t===n)return"mov";return"img"}(n.value)?function(n){const e=document.getElementById("vid"),t=document.getElementById("canv").getContext("webgl2");e.paused||e.pause();const i=new Image;i.crossOrigin="Anonymous",i.src=n,i.onload=function(){o||(o=new r._s(t)),o.setSource(i)},i.onerror=function(){alert("Can't load the image.")}}(t):function(n){document.getElementById("vid").src=n}(t)},e.readAsDataURL(n.files[0])}}},579:(n,e,t)=>{var r=t.w[n.id];n.exports=r,t(624),r[""]()}}]);