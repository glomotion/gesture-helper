!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("GestureHelper",[],t):"object"==typeof exports?exports.GestureHelper=t():e.GestureHelper=t()}(window,(function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=3)}([function(e,t,n){(function(t){(function(){var n,i,r,o,s,a;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:null!=t&&t.hrtime?(e.exports=function(){return(n()-s)/1e6},i=t.hrtime,o=(n=function(){var e;return 1e9*(e=i())[0]+e[1]})(),a=1e9*t.uptime(),s=o-a):Date.now?(e.exports=function(){return Date.now()-r},r=Date.now()):(e.exports=function(){return(new Date).getTime()-r},r=(new Date).getTime())}).call(this)}).call(this,n(1))},function(e,t){var n,i,r=e.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(e){if(n===setTimeout)return setTimeout(e,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:o}catch(e){n=o}try{i="function"==typeof clearTimeout?clearTimeout:s}catch(e){i=s}}();var c,u=[],l=!1,h=-1;function f(){l&&c&&(l=!1,c.length?u=c.concat(u):h=-1,u.length&&p())}function p(){if(!l){var e=a(f);l=!0;for(var t=u.length;t;){for(c=u,u=[];++h<t;)c&&c[h].run();h=-1,t=u.length}c=null,l=!1,function(e){if(i===clearTimeout)return clearTimeout(e);if((i===s||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(e);try{i(e)}catch(t){try{return i.call(null,e)}catch(t){return i.call(this,e)}}}(e)}}function v(e,t){this.fun=e,this.array=t}function d(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new v(e,t)),1!==u.length||l||a(p)},v.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=d,r.addListener=d,r.once=d,r.off=d,r.removeListener=d,r.removeAllListeners=d,r.emit=d,r.prependListener=d,r.prependOnceListener=d,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},function(e,t,n){(function(i){var r;
/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */!function(o){var s=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)};function a(){this._events={},this._conf&&c.call(this,this._conf)}function c(e){e?(this._conf=e,e.delimiter&&(this.delimiter=e.delimiter),this._maxListeners=void 0!==e.maxListeners?e.maxListeners:10,e.wildcard&&(this.wildcard=e.wildcard),e.newListener&&(this._newListener=e.newListener),e.removeListener&&(this._removeListener=e.removeListener),e.verboseMemoryLeak&&(this.verboseMemoryLeak=e.verboseMemoryLeak),this.wildcard&&(this.listenerTree={})):this._maxListeners=10}function u(e,t){var n="(node) warning: possible EventEmitter memory leak detected. "+e+" listeners added. Use emitter.setMaxListeners() to increase limit.";if(this.verboseMemoryLeak&&(n+=" Event name: "+t+"."),void 0!==i&&i.emitWarning){var r=new Error(n);r.name="MaxListenersExceededWarning",r.emitter=this,r.count=e,i.emitWarning(r)}else console.error(n),console.trace&&console.trace()}function l(e){this._events={},this._newListener=!1,this._removeListener=!1,this.verboseMemoryLeak=!1,c.call(this,e)}function h(e,t,n,i){if(!n)return[];var r,o,s,a,c,u,l,f=[],p=t.length,v=t[i],d=t[i+1];if(i===p&&n._listeners){if("function"==typeof n._listeners)return e&&e.push(n._listeners),[n];for(r=0,o=n._listeners.length;r<o;r++)e&&e.push(n._listeners[r]);return[n]}if("*"===v||"**"===v||n[v]){if("*"===v){for(s in n)"_listeners"!==s&&n.hasOwnProperty(s)&&(f=f.concat(h(e,t,n[s],i+1)));return f}if("**"===v){for(s in(l=i+1===p||i+2===p&&"*"===d)&&n._listeners&&(f=f.concat(h(e,t,n,p))),n)"_listeners"!==s&&n.hasOwnProperty(s)&&("*"===s||"**"===s?(n[s]._listeners&&!l&&(f=f.concat(h(e,t,n[s],p))),f=f.concat(h(e,t,n[s],i))):f=s===d?f.concat(h(e,t,n[s],i+2)):f.concat(h(e,t,n[s],i)));return f}f=f.concat(h(e,t,n[v],i+1))}if((a=n["*"])&&h(e,t,a,i+1),c=n["**"])if(i<p)for(s in c._listeners&&h(e,t,c,p),c)"_listeners"!==s&&c.hasOwnProperty(s)&&(s===d?h(e,t,c[s],i+2):s===v?h(e,t,c[s],i+1):((u={})[s]=c[s],h(e,t,{"**":u},i+1)));else c._listeners?h(e,t,c,p):c["*"]&&c["*"]._listeners&&h(e,t,c["*"],p);return f}function f(e,t){for(var n=0,i=(e="string"==typeof e?e.split(this.delimiter):e.slice()).length;n+1<i;n++)if("**"===e[n]&&"**"===e[n+1])return;for(var r=this.listenerTree,o=e.shift();void 0!==o;){if(r[o]||(r[o]={}),r=r[o],0===e.length)return r._listeners?("function"==typeof r._listeners&&(r._listeners=[r._listeners]),r._listeners.push(t),!r._listeners.warned&&this._maxListeners>0&&r._listeners.length>this._maxListeners&&(r._listeners.warned=!0,u.call(this,r._listeners.length,o))):r._listeners=t,!0;o=e.shift()}return!0}l.EventEmitter2=l,l.prototype.delimiter=".",l.prototype.setMaxListeners=function(e){void 0!==e&&(this._maxListeners=e,this._conf||(this._conf={}),this._conf.maxListeners=e)},l.prototype.event="",l.prototype.once=function(e,t){return this._once(e,t,!1)},l.prototype.prependOnceListener=function(e,t){return this._once(e,t,!0)},l.prototype._once=function(e,t,n){return this._many(e,1,t,n),this},l.prototype.many=function(e,t,n){return this._many(e,t,n,!1)},l.prototype.prependMany=function(e,t,n){return this._many(e,t,n,!0)},l.prototype._many=function(e,t,n,i){var r=this;if("function"!=typeof n)throw new Error("many only accepts instances of Function");function o(){return 0==--t&&r.off(e,o),n.apply(this,arguments)}return o._origin=n,this._on(e,o,i),r},l.prototype.emit=function(){if(!this._events&&!this._all)return!1;this._events||a.call(this);var e=arguments[0];if("newListener"===e&&!this._newListener&&!this._events.newListener)return!1;var t,n,i,r,o,s=arguments.length;if(this._all&&this._all.length){if(o=this._all.slice(),s>3)for(t=new Array(s),r=0;r<s;r++)t[r]=arguments[r];for(i=0,n=o.length;i<n;i++)switch(this.event=e,s){case 1:o[i].call(this,e);break;case 2:o[i].call(this,e,arguments[1]);break;case 3:o[i].call(this,e,arguments[1],arguments[2]);break;default:o[i].apply(this,t)}}if(this.wildcard){o=[];var c="string"==typeof e?e.split(this.delimiter):e.slice();h.call(this,o,c,this.listenerTree,0)}else{if("function"==typeof(o=this._events[e])){switch(this.event=e,s){case 1:o.call(this);break;case 2:o.call(this,arguments[1]);break;case 3:o.call(this,arguments[1],arguments[2]);break;default:for(t=new Array(s-1),r=1;r<s;r++)t[r-1]=arguments[r];o.apply(this,t)}return!0}o&&(o=o.slice())}if(o&&o.length){if(s>3)for(t=new Array(s-1),r=1;r<s;r++)t[r-1]=arguments[r];for(i=0,n=o.length;i<n;i++)switch(this.event=e,s){case 1:o[i].call(this);break;case 2:o[i].call(this,arguments[1]);break;case 3:o[i].call(this,arguments[1],arguments[2]);break;default:o[i].apply(this,t)}return!0}if(!this._all&&"error"===e)throw arguments[1]instanceof Error?arguments[1]:new Error("Uncaught, unspecified 'error' event.");return!!this._all},l.prototype.emitAsync=function(){if(!this._events&&!this._all)return!1;this._events||a.call(this);var e=arguments[0];if("newListener"===e&&!this._newListener&&!this._events.newListener)return Promise.resolve([!1]);var t,n,i,r,o,s=[],c=arguments.length;if(this._all){if(c>3)for(t=new Array(c),r=1;r<c;r++)t[r]=arguments[r];for(i=0,n=this._all.length;i<n;i++)switch(this.event=e,c){case 1:s.push(this._all[i].call(this,e));break;case 2:s.push(this._all[i].call(this,e,arguments[1]));break;case 3:s.push(this._all[i].call(this,e,arguments[1],arguments[2]));break;default:s.push(this._all[i].apply(this,t))}}if(this.wildcard){o=[];var u="string"==typeof e?e.split(this.delimiter):e.slice();h.call(this,o,u,this.listenerTree,0)}else o=this._events[e];if("function"==typeof o)switch(this.event=e,c){case 1:s.push(o.call(this));break;case 2:s.push(o.call(this,arguments[1]));break;case 3:s.push(o.call(this,arguments[1],arguments[2]));break;default:for(t=new Array(c-1),r=1;r<c;r++)t[r-1]=arguments[r];s.push(o.apply(this,t))}else if(o&&o.length){if(o=o.slice(),c>3)for(t=new Array(c-1),r=1;r<c;r++)t[r-1]=arguments[r];for(i=0,n=o.length;i<n;i++)switch(this.event=e,c){case 1:s.push(o[i].call(this));break;case 2:s.push(o[i].call(this,arguments[1]));break;case 3:s.push(o[i].call(this,arguments[1],arguments[2]));break;default:s.push(o[i].apply(this,t))}}else if(!this._all&&"error"===e)return arguments[1]instanceof Error?Promise.reject(arguments[1]):Promise.reject("Uncaught, unspecified 'error' event.");return Promise.all(s)},l.prototype.on=function(e,t){return this._on(e,t,!1)},l.prototype.prependListener=function(e,t){return this._on(e,t,!0)},l.prototype.onAny=function(e){return this._onAny(e,!1)},l.prototype.prependAny=function(e){return this._onAny(e,!0)},l.prototype.addListener=l.prototype.on,l.prototype._onAny=function(e,t){if("function"!=typeof e)throw new Error("onAny only accepts instances of Function");return this._all||(this._all=[]),t?this._all.unshift(e):this._all.push(e),this},l.prototype._on=function(e,t,n){if("function"==typeof e)return this._onAny(e,t),this;if("function"!=typeof t)throw new Error("on only accepts instances of Function");return this._events||a.call(this),this._newListener&&this.emit("newListener",e,t),this.wildcard?(f.call(this,e,t),this):(this._events[e]?("function"==typeof this._events[e]&&(this._events[e]=[this._events[e]]),n?this._events[e].unshift(t):this._events[e].push(t),!this._events[e].warned&&this._maxListeners>0&&this._events[e].length>this._maxListeners&&(this._events[e].warned=!0,u.call(this,this._events[e].length,e))):this._events[e]=t,this)},l.prototype.off=function(e,t){if("function"!=typeof t)throw new Error("removeListener only takes instances of Function");var n,i=[];if(this.wildcard){var r="string"==typeof e?e.split(this.delimiter):e.slice();i=h.call(this,null,r,this.listenerTree,0)}else{if(!this._events[e])return this;n=this._events[e],i.push({_listeners:n})}for(var o=0;o<i.length;o++){var a=i[o];if(n=a._listeners,s(n)){for(var c=-1,u=0,l=n.length;u<l;u++)if(n[u]===t||n[u].listener&&n[u].listener===t||n[u]._origin&&n[u]._origin===t){c=u;break}if(c<0)continue;return this.wildcard?a._listeners.splice(c,1):this._events[e].splice(c,1),0===n.length&&(this.wildcard?delete a._listeners:delete this._events[e]),this._removeListener&&this.emit("removeListener",e,t),this}(n===t||n.listener&&n.listener===t||n._origin&&n._origin===t)&&(this.wildcard?delete a._listeners:delete this._events[e],this._removeListener&&this.emit("removeListener",e,t))}return function e(t){if(void 0!==t){var n=Object.keys(t);for(var i in n){var r=n[i],o=t[r];o instanceof Function||"object"!=typeof o||null===o||(Object.keys(o).length>0&&e(t[r]),0===Object.keys(o).length&&delete t[r])}}}(this.listenerTree),this},l.prototype.offAny=function(e){var t,n=0,i=0;if(e&&this._all&&this._all.length>0){for(n=0,i=(t=this._all).length;n<i;n++)if(e===t[n])return t.splice(n,1),this._removeListener&&this.emit("removeListenerAny",e),this}else{if(t=this._all,this._removeListener)for(n=0,i=t.length;n<i;n++)this.emit("removeListenerAny",t[n]);this._all=[]}return this},l.prototype.removeListener=l.prototype.off,l.prototype.removeAllListeners=function(e){if(void 0===e)return!this._events||a.call(this),this;if(this.wildcard)for(var t="string"==typeof e?e.split(this.delimiter):e.slice(),n=h.call(this,null,t,this.listenerTree,0),i=0;i<n.length;i++){n[i]._listeners=null}else this._events&&(this._events[e]=null);return this},l.prototype.listeners=function(e){if(this.wildcard){var t=[],n="string"==typeof e?e.split(this.delimiter):e.slice();return h.call(this,t,n,this.listenerTree,0),t}return this._events||a.call(this),this._events[e]||(this._events[e]=[]),s(this._events[e])||(this._events[e]=[this._events[e]]),this._events[e]},l.prototype.eventNames=function(){return Object.keys(this._events)},l.prototype.listenerCount=function(e){return this.listeners(e).length},l.prototype.listenersAny=function(){return this._all?this._all:[]},void 0===(r=function(){return l}.call(t,n,t,e))||(e.exports=r)}()}).call(this,n(1))},function(e,t,n){"use strict";n.r(t);var i,r=n(2),o=n.n(r),s=n(0),a=n.n(s),c=[],u="ResizeObserver loop completed with undelivered notifications.";!function(e){e.BORDER_BOX="border-box",e.CONTENT_BOX="content-box",e.DEVICE_PIXEL_CONTENT_BOX="device-pixel-content-box"}(i||(i={}));var l,h=function(){function e(e,t,n,i){return this.x=e,this.y=t,this.width=n,this.height=i,this.top=this.y,this.left=this.x,this.bottom=this.top+this.height,this.right=this.left+this.width,Object.freeze(this)}return e.prototype.toJSON=function(){var e=this;return{x:e.x,y:e.y,top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.width,height:e.height}},e.fromRect=function(t){return new e(t.x,t.y,t.width,t.height)},e}(),f=function(e){return e instanceof SVGElement&&"getBBox"in e},p=function(e){if(f(e)){var t=e.getBBox(),n=t.width,i=t.height;return!n&&!i}var r=e,o=r.offsetWidth,s=r.offsetHeight;return!(o||s||e.getClientRects().length)},v=function(e){var t,n,i=null===(n=null===(t=e)||void 0===t?void 0:t.ownerDocument)||void 0===n?void 0:n.defaultView;return!!(i&&e instanceof i.Element)},d="undefined"!=typeof window?window:{},y=new WeakMap,m=/auto|scroll/,b=/^tb|vertical/,g=/msie|trident/i.test(d.navigator&&d.navigator.userAgent),_=function(e){return parseFloat(e||"0")},w=function(e,t,n){return void 0===e&&(e=0),void 0===t&&(t=0),void 0===n&&(n=!1),Object.freeze({inlineSize:(n?t:e)||0,blockSize:(n?e:t)||0})},E=Object.freeze({devicePixelContentBoxSize:w(),borderBoxSize:w(),contentBoxSize:w(),contentRect:new h(0,0,0,0)}),x=function(e,t){if(void 0===t&&(t=!1),y.has(e)&&!t)return y.get(e);if(p(e))return y.set(e,E),E;var n=getComputedStyle(e),i=f(e)&&e.ownerSVGElement&&e.getBBox(),r=!g&&"border-box"===n.boxSizing,o=b.test(n.writingMode||""),s=!i&&m.test(n.overflowY||""),a=!i&&m.test(n.overflowX||""),c=i?0:_(n.paddingTop),u=i?0:_(n.paddingRight),l=i?0:_(n.paddingBottom),v=i?0:_(n.paddingLeft),d=i?0:_(n.borderTopWidth),x=i?0:_(n.borderRightWidth),O=i?0:_(n.borderBottomWidth),T=v+u,L=c+l,S=(i?0:_(n.borderLeftWidth))+x,k=d+O,D=a?e.offsetHeight-k-e.clientHeight:0,z=s?e.offsetWidth-S-e.clientWidth:0,M=r?T+S:0,B=r?L+k:0,P=i?i.width:_(n.width)-M-z,j=i?i.height:_(n.height)-B-D,C=P+T+z+S,A=j+L+D+k,R=Object.freeze({devicePixelContentBoxSize:w(Math.round(P*devicePixelRatio),Math.round(j*devicePixelRatio),o),borderBoxSize:w(C,A,o),contentBoxSize:w(P,j,o),contentRect:new h(v,c,P,j)});return y.set(e,R),R},O=function(e,t,n){var r=x(e,n),o=r.borderBoxSize,s=r.contentBoxSize,a=r.devicePixelContentBoxSize;switch(t){case i.DEVICE_PIXEL_CONTENT_BOX:return a;case i.BORDER_BOX:return o;default:return s}},T=function(e){var t=x(e);this.target=e,this.contentRect=t.contentRect,this.borderBoxSize=[t.borderBoxSize],this.contentBoxSize=[t.contentBoxSize],this.devicePixelContentBoxSize=[t.devicePixelContentBoxSize]},L=function(e){if(p(e))return 1/0;for(var t=0,n=e.parentNode;n;)t+=1,n=n.parentNode;return t},S=function(){var e=1/0,t=[];c.forEach((function(n){if(0!==n.activeTargets.length){var i=[];n.activeTargets.forEach((function(t){var n=new T(t.target),r=L(t.target);i.push(n),t.lastReportedSize=O(t.target,t.observedBox),r<e&&(e=r)})),t.push((function(){n.callback.call(n.observer,i,n.observer)})),n.activeTargets.splice(0,n.activeTargets.length)}}));for(var n=0,i=t;n<i.length;n++){(0,i[n])()}return e},k=function(e){c.forEach((function(t){t.activeTargets.splice(0,t.activeTargets.length),t.skippedTargets.splice(0,t.skippedTargets.length),t.observationTargets.forEach((function(n){n.isActive()&&(L(n.target)>e?t.activeTargets.push(n):t.skippedTargets.push(n))}))}))},D=function(){var e,t=0;for(k(t);c.some((function(e){return e.activeTargets.length>0}));)t=S(),k(t);return c.some((function(e){return e.skippedTargets.length>0}))&&("function"==typeof ErrorEvent?e=new ErrorEvent("error",{message:u}):((e=document.createEvent("Event")).initEvent("error",!1,!1),e.message=u),window.dispatchEvent(e)),t>0},z=[],M=function(e){if(!l){var t=0,n=document.createTextNode("");new MutationObserver((function(){return z.splice(0).forEach((function(e){return e()}))})).observe(n,{characterData:!0}),l=function(){n.textContent=""+(t?t--:t++)}}z.push(e),l()},B=0,P={attributes:!0,characterData:!0,childList:!0,subtree:!0},j=["resize","load","transitionend","animationend","animationstart","animationiteration","keyup","keydown","mouseup","mousedown","mouseover","mouseout","blur","focus"],C=function(e){return void 0===e&&(e=0),Date.now()+e},A=!1,R=new(function(){function e(){var e=this;this.stopped=!0,this.listener=function(){return e.schedule()}}return e.prototype.run=function(e){var t=this;if(void 0===e&&(e=250),!A){A=!0;var n,i=C(e);n=function(){var n=!1;try{n=D()}finally{if(A=!1,e=i-C(),!B)return;n?t.run(1e3):e>0?t.run(e):t.start()}},M((function(){requestAnimationFrame(n)}))}},e.prototype.schedule=function(){this.stop(),this.run()},e.prototype.observe=function(){var e=this,t=function(){return e.observer&&e.observer.observe(document.body,P)};document.body?t():d.addEventListener("DOMContentLoaded",t)},e.prototype.start=function(){var e=this;this.stopped&&(this.stopped=!1,this.observer=new MutationObserver(this.listener),this.observe(),j.forEach((function(t){return d.addEventListener(t,e.listener,!0)})))},e.prototype.stop=function(){var e=this;this.stopped||(this.observer&&this.observer.disconnect(),j.forEach((function(t){return d.removeEventListener(t,e.listener,!0)})),this.stopped=!0)},e}()),X=function(e){!B&&e>0&&R.start(),!(B+=e)&&R.stop()},I=function(){function e(e,t){this.target=e,this.observedBox=t||i.CONTENT_BOX,this.lastReportedSize={inlineSize:0,blockSize:0}}return e.prototype.isActive=function(){var e,t=O(this.target,this.observedBox,!0);return e=this.target,f(e)||function(e){switch(e.tagName){case"INPUT":if("image"!==e.type)break;case"VIDEO":case"AUDIO":case"EMBED":case"OBJECT":case"CANVAS":case"IFRAME":case"IMG":return!0}return!1}(e)||"inline"!==getComputedStyle(e).display||(this.lastReportedSize=t),this.lastReportedSize.inlineSize!==t.inlineSize||this.lastReportedSize.blockSize!==t.blockSize},e}(),N=function(e,t){this.activeTargets=[],this.skippedTargets=[],this.observationTargets=[],this.observer=e,this.callback=t},F=new WeakMap,W=function(e,t){for(var n=0;n<e.length;n+=1)if(e[n].target===t)return n;return-1},U=function(){function e(){}return e.connect=function(e,t){var n=new N(e,t);F.set(e,n)},e.observe=function(e,t,n){var i=F.get(e),r=0===i.observationTargets.length;W(i.observationTargets,t)<0&&(r&&c.push(i),i.observationTargets.push(new I(t,n&&n.box)),X(1),R.schedule())},e.unobserve=function(e,t){var n=F.get(e),i=W(n.observationTargets,t),r=1===n.observationTargets.length;i>=0&&(r&&c.splice(c.indexOf(n),1),n.observationTargets.splice(i,1),X(-1))},e.disconnect=function(e){var t=this,n=F.get(e);n.observationTargets.slice().forEach((function(n){return t.unobserve(e,n.target)})),n.activeTargets.splice(0,n.activeTargets.length)},e}();!function(){function e(e){if(0===arguments.length)throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");if("function"!=typeof e)throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");U.connect(this,e)}e.prototype.observe=function(e,t){if(0===arguments.length)throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!v(e))throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");U.observe(this,e,t)},e.prototype.unobserve=function(e){if(0===arguments.length)throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!v(e))throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");U.unobserve(this,e)},e.prototype.disconnect=function(){U.disconnect(this)},e.toString=function(){return"function ResizeObserver () { [polyfill code] }"}}();var V=function(e){if(!("InputDeviceCapabilities"in e||"sourceCapabilities"in UIEvent.prototype)){u.prototype={get firesTouchEvents(){return this.__firesTouchEvents}},e.InputDeviceCapabilities=u;var t,n=new u({firesTouchEvents:!0}),i=new u({firesTouchEvents:!1});document.addEventListener("touchstart",l,!0),document.addEventListener("touchmove",l,!0),document.addEventListener("touchend",l,!0),document.addEventListener("touchcancel",l,!0);var r="__inputDeviceCapabilitiesPolyfill_specifiedSourceCapabilities",o=["resize","error","load","unload","abort"];Object.defineProperty(UIEvent.prototype,"sourceCapabilities",{get:function(){if(r in this)return this[r];if(o.indexOf(this.type)>=0)return null;if(!("TouchEvent"in e))return i;if(this instanceof TouchEvent)return n;if("PointerEvent"in e&&this instanceof PointerEvent)return"touch"==this.pointerType?n:i;var s=Date.now()<t+1e3?n:i;return Object.defineProperty(this,r,{value:s,writable:!1}),s},configurable:!0,enumerable:!0});for(var s=["UIEvent","MouseEvent","TouchEvent","InputEvent","CompositionEvent","FocusEvent","KeyboardEvent","WheelEvent","PointerEvent"],a=0;a<s.length;a++)h(s[a]);var c=Document.prototype.createEvent;Document.prototype.createEvent=function(e){var t=c.call(this,e);if(t instanceof UIEvent)return Object.defineProperty(t,r,{value:null,writable:!1}),t}}function u(e){Object.defineProperty(this,"__firesTouchEvents",{value:!!(e&&"firesTouchEvents"in e)&&e.firesTouchEvents,writable:!1,enumerable:!1})}function l(e){t=Date.now()}function h(t){if(t in e&&"length"in e[t]&&!(e[t].length<1)){var n=e[t];e[t]=function(e,t){var i=t&&t.sourceCapabilities?t.sourceCapabilities:null;t&&delete t.sourceCapabilities;var o=new n(e,t);return Object.defineProperty(o,r,{value:i,writable:!1}),o},e[t].prototype=n.prototype}}};function Y(e){return(Y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function H(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function G(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function q(e,t){return!t||"object"!==Y(t)&&"function"!=typeof t?K(e):t}function J(e){return(J=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function K(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Q(e,t){return(Q=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"default",(function(){return $})),V(window);var $=function(e){function t(){var e;H(this,t),Z(K(e=q(this,J(t).call(this,{wildcard:!0}))),"mouseMove",(function(t){e.handleMove({e:t,x:t.layerX,y:t.layerY})})),Z(K(e),"touchMove",(function(t){e.handleMove({e:t,x:t.touches[0].layerX,y:t.touches[0].layerY})})),Z(K(e),"touchStart",(function(t){e.handleStart({x:t.touches[0].layerX,y:t.touches[0].layerY,e:t}),e.el.addEventListener("touchmove",e.touchMove,e.eventOptions)})),Z(K(e),"touchEnd",(function(t){e.handleEnd(t),e.el.removeEventListener("touchmove",e.touchMove,e.eventOptions)})),Z(K(e),"mouseDown",(function(t){t.sourceCapabilities.firesTouchEvents||(e.handleStart({x:t.layerX,y:t.layerY,e:t}),e.el.addEventListener("mousemove",e.mouseMove,e.eventOptions))})),Z(K(e),"mouseUp",(function(t){t.sourceCapabilities.firesTouchEvents||(e.handleEnd(t),e.el.removeEventListener("mousemove",e.mouseMove,e.eventOptions))})),Z(K(e),"handleEnd",(function(t){var n=a()()-e.startTime;if(e.emit("pan.preend",{sourceEvent:t}),e.panning){e.panning=!1;var i=!1,r=null;e.velocity.max.x>e.options.swipeVelocity&&"horizontal"===e.startDirection?(i=!0,r=e.velocity.current.x>0?"right":"left"):e.velocity.max.y>e.options.swipeVelocity&&"vertical"===e.startDirection&&(i=!0,r=e.velocity.current.y>0?"down":"up"),e.emit("pan.end",{isSwipe:i,swipeDirection:r,sourceEvent:t})}else n<=e.options.maxTapDuration&&e.emit("tap",{srcEvent:t})})),e.el=arguments.length<=0?void 0:arguments[0],e.options=Object.assign({},{sensitivity:5,passive:!1,capture:!1,swipeVelocity:60,maxTapDuration:100,longTapDuration:400,startDirectionLoopCount:2,terminatePanOutsideBounds:!1,outsideBoundsOffset:10},(arguments.length<=1?void 0:arguments[1])||{}),e.panning=!1,e.startDirection=null,e.directionCount=0,e.clearVelocityStats(),e.eventOptions=!1;try{var n=Object.defineProperty({},"passive",{get:function(){e.eventOptions={passive:!!e.options.passive,capture:!!e.options.capture}}});e.el.addEventListener("test",null,n)}catch(t){console.error(t),e.eventOptions={capture:!!e.options.capture}}return e.setup(),e}var n,i,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Q(e,t)}(t,e),n=t,(i=[{key:"clearVelocityStats",value:function(){this.velocity={current:{x:0,y:0},max:{x:0,y:0}}}},{key:"isPanning",value:function(){return this.panning}},{key:"setup",value:function(){this.el.addEventListener("mousedown",this.mouseDown,this.eventOptions),this.el.addEventListener("mouseup",this.mouseUp,this.eventOptions),this.el.addEventListener("touchstart",this.touchStart,this.eventOptions),this.el.addEventListener("touchend",this.touchEnd,this.eventOptions),this.el.addEventListener("touchcancel",this.touchEnd,this.eventOptions)}},{key:"destroy",value:function(){this.el.removeEventListener("mousedown",this.mouseDown,this.eventOptions),this.el.removeEventListener("mouseup",this.mouseUp,this.eventOptions),this.el.removeEventListener("mousemove",this.mouseMove,this.eventOptions),this.el.removeEventListener("touchstart",this.touchStart,this.eventOptions),this.el.removeEventListener("touchend",this.touchEnd,this.eventOptions),this.el.removeEventListener("touchcancel",this.touchEnd,this.eventOptions),this.el.removeEventListener("touchmove",this.touchMove,this.eventOptions)}},{key:"getStartDirection",value:function(e){var t=e.x,n=void 0===t?0:t,i=e.y,r=void 0===i?0:i;return this.directionCount<=this.options.startDirectionLoopCount||Math.abs(n)===Math.abs(r)?(this.directionCount+=1,null):Math.abs(n)>=Math.abs(r)?"horizontal":"vertical"}},{key:"handleStart",value:function(e){var t=e.x,n=void 0===t?0:t,i=e.y,r=void 0===i?0:i,o=e.e,s=void 0===o?{}:o;this.startX=n,this.startY=r,this.startDirection=null,this.directionCount=1,this.panning=!1,this.startTime=a()(),this.clearVelocityStats(),this.emit("pan.prestart",{sourceEvent:s})}},{key:"checkOutOfBounds",value:function(e){var t=e.x,n=e.y,i=this.options.outsideBoundsOffset,r=this.el.offsetWidth-i,o=this.el.offsetHeight-i;return t>=r||t<=i||n>=o||n<=i}},{key:"handleMove",value:function(e){var t=e.e,n=void 0===t?{}:t,i=e.x,r=void 0===i?0:i,o=e.y,s=void 0===o?0:o,c=r-this.startX,u=s-this.startY;if(null===this.startDirection?this.startDirection=this.getStartDirection({x:c,y:u}):!this.panning&&(Math.abs(c)>this.options.sensitivity||Math.abs(u)>this.options.sensitivity)&&(this.panning=!0,this.emit("pan.start",{startDirection:this.startDirection,sourceEvent:n})),this.panning){if(this.checkOutOfBounds({x:c+this.startX,y:u+this.startY})&&this.options.terminatePanOutsideBounds)return this.touchEnd(n),this.mouseUp(n),!1;this.emit("pan.all",{startDirection:this.startDirection,deltaX:c,deltaY:u,sourceEvent:n}),"horizontal"===this.startDirection?c<0?this.emit("pan.x.left",{delta:c,sourceEvent:n}):this.emit("pan.x.right",{delta:c,sourceEvent:n}):"vertical"===this.startDirection&&(u<0?this.emit("pan.y.up",{delta:u,sourceEvent:n}):this.emit("pan.y.down",{delta:u,sourceEvent:n}));var l=a()()-this.startTime;this.velocity.current.x=c/l*100,this.velocity.current.y=u/l*100,this.velocity.max.x=Math.max(this.velocity.max.x,Math.abs(this.velocity.current.x)),this.velocity.max.y=Math.max(this.velocity.max.y,Math.abs(this.velocity.current.y)),this.lastDeltaX=c,this.lastDeltaY=u}}}])&&G(n.prototype,i),r&&G(n,r),t}(o.a)}]).default}));