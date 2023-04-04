import{r as a}from"./index-f90a43bd.js";var u={},p={get exports(){return u},set exports(t){u=t}},I={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _=a,x=Symbol.for("react.element"),y=Symbol.for("react.fragment"),O=Object.prototype.hasOwnProperty,R=_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,V={key:!0,ref:!0,__self:!0,__source:!0};function E(t,r,e){var o,s={},l=null,c=null;e!==void 0&&(l=""+e),r.key!==void 0&&(l=""+r.key),r.ref!==void 0&&(c=r.ref);for(o in r)O.call(r,o)&&!V.hasOwnProperty(o)&&(s[o]=r[o]);if(t&&t.defaultProps)for(o in r=t.defaultProps,r)s[o]===void 0&&(s[o]=r[o]);return{$$typeof:x,type:t,key:l,ref:c,props:s,_owner:R.current}}I.Fragment=y;I.jsx=E;I.jsxs=E;(function(t){t.exports=I})(p);const N=u.jsx,b=u.jsxs;var n=(t=>(t[t.EMPTY=0]="EMPTY",t[t.WILL_BORN=1]="WILL_BORN",t[t.ALIVE=2]="ALIVE",t[t.WILL_DIE=3]="WILL_DIE",t))(n||{});const h={EMPTY:"white",WILL_BORN:"#88AA88",ALIVE:"black",WILL_DIE:"#AA8888"};var A=(t=>(t[t.GENERATE_MAP=0]="GENERATE_MAP",t[t.EVOLVE=1]="EVOLVE",t[t.NEW_GENERATION=2]="NEW_GENERATION",t))(A||{});const f=80,L=60,m=1e3/30,M=()=>{const t=[];for(let r=0;r<L;r++)for(let e=0;e<f;e++)t.push(Math.round(Math.random())%2===0?n.EMPTY:n.ALIVE);return t},i=(t,r)=>r*f+t,d=t=>({x:t%f,y:Math.floor(t/f)}),g=(t,r)=>{const{x:e,y:o}=d(r);let s=0;return o>0&&(t[i(e-1,o-1)]>=n.ALIVE&&e>0&&s++,t[i(e-0,o-1)]>=n.ALIVE&&s++,t[i(e+1,o-1)]>=n.ALIVE&&e<f-1&&s++),t[i(e-1,o)]>=n.ALIVE&&s++,t[i(e+1,o)]>=n.ALIVE&&s++,o<L-1&&(t[i(e-1,o+1)]>=n.ALIVE&&e>0&&s++,t[i(e-0,o+1)]>=n.ALIVE&&s++,t[i(e+1,o+1)]>=n.ALIVE&&e<f-1&&s++),s},j=t=>{let r=[...t];for(let e=0;e<r.length;e++){const o=g(t,e);r[e]===n.ALIVE&&(o<2||o>3)?r[e]=n.WILL_DIE:r[e]===n.EMPTY&&o===3&&(r[e]=n.WILL_BORN)}return r},B=t=>{let r=[...t];for(let e=0;e<r.length;e++)r[e]===n.WILL_DIE?r[e]=n.EMPTY:r[e]===n.WILL_BORN&&(r[e]=n.ALIVE);return r},v=({cell:t,index:r,size:e})=>{const{x:o,y:s}=d(r),l={position:"absolute",width:e,height:e,left:o*e,top:s*e,borderRadius:e/4,background:h[n[t]]};return N("div",{style:l},`${o}_${s}`)},k=a.memo(v);export{A as M,b as a,f as c,m as d,k as default,j as e,M as g,N as j,B as u};
