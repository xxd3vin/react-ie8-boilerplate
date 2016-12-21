/*!
 * 
 *    react-ie8-boilerplate - 
 *    Author: tommyshao
 *    Version: v1.0.0
 *    URL: http://github.com/tomieric/react-ie8-boilerplate
 *    License(s): MIT
 * 
 */
webpackJsonp([3],{0:function(t,e,n){t.exports=n(463)},428:function(t,e){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(t){if(l===setTimeout)return setTimeout(t,0);if((l===n||!l)&&setTimeout)return l=setTimeout,setTimeout(t,0);try{return l(t,0)}catch(e){try{return l.call(null,t,0)}catch(e){return l.call(this,t,0)}}}function i(t){if(f===clearTimeout)return clearTimeout(t);if((f===r||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(t);try{return f(t)}catch(e){try{return f.call(null,t)}catch(e){return f.call(this,t)}}}function u(){y&&h&&(y=!1,h.length?d=h.concat(d):v=-1,d.length&&s())}function s(){if(!y){var t=o(u);y=!0;for(var e=d.length;e;){for(h=d,d=[];++v<e;)h&&h[v].run();v=-1,e=d.length}h=null,y=!1,i(t)}}function c(t,e){this.fun=t,this.array=e}function a(){}var l,f,p=t.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:n}catch(t){l=n}try{f="function"==typeof clearTimeout?clearTimeout:r}catch(t){f=r}}();var h,d=[],y=!1,v=-1;p.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];d.push(new c(t,e)),1!==d.length||y||o(s)},c.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=a,p.addListener=a,p.once=a,p.off=a,p.removeListener=a,p.removeAllListeners=a,p.emit=a,p.binding=function(t){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(t){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},458:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.Modal=void 0;var o=n(459),i=r(o);e.Modal=i.default},459:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=n(1),a=r(c),l=function(t){function e(t){o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.state={show:!1,content:"This is a Modal!"},n}return u(e,t),s(e,[{key:"componentDidMount",value:function(){}},{key:"componentWillReceiveProps",value:function(t){this.setState({show:t.show,content:t.content||this.state.content})}},{key:"shouldComponentUpdate",value:function(t){return this.state.show!==t.show}},{key:"render",value:function(){var t={display:this.state.show?"block":"none"};return a.default.createElement("div",{style:t},this.state.content)}}]),e}(c.Component);l.propTypes={show:a.default.PropTypes.bool.isRequired},e.default=l},461:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=n(1),a=r(c),l=n(458),f=function(t){function e(t){o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.showModal=function(t){n.setState({modal:{show:!0,content:t}})},n.hideModal=function(){n.setState({modal:{show:!1,content:""}},function(){console.log(n.state)})},n.state={modal:{show:!0,content:""}},n}return u(e,t),s(e,[{key:"render",value:function(){return a.default.createElement("div",{className:"app"},this.props.children&&a.default.cloneElement(this.props.children,{parent:this}),a.default.createElement(l.Modal,{show:this.state.modal.show}))}}]),e}(c.Component);e.default=f},463:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}n(706);var o=n(1),i=r(o),u=n(13),s=n(471),c=r(s);n(464),(0,u.render)(i.default.createElement(c.default,null),document.getElementById("app"))},464:function(t,e,n){"use strict";n(483).polyfill(),n(475),Object.assign||(Object.assign=n(252))},471:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=n(1),a=r(c),l=n(327),f={component:n(461).default,childRoutes:[{path:"/",indexRoute:{onEnter:function(t,e){return e("","Home")}}},{path:"Home",getComponent:function(t,e){n.e(0,function(t){e(null,n(462).default)})}}]},p=function(t){function e(){return o(this,e),i(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return u(e,t),s(e,[{key:"render",value:function(){return a.default.createElement(l.Router,{history:l.hashHistory,routes:f})}}]),e}(a.default.Component);e.default=p},475:function(t,e){!function(t){"use strict";t.console||(t.console={});for(var e,n,r=t.console,o=function(){},i=["memory"],u="assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(",");e=i.pop();)r[e]||(r[e]={});for(;n=u.pop();)"function"!=typeof r[n]&&(r[n]=o)}("undefined"==typeof window?this:window)},478:function(t,e,n){e=t.exports=n(356)(),e.push([t.id,"body{font:12px/1.5 Microsoft Yahei;color:#666}.box{width:200px;height:500px;background:red;border-radius:2px;border:1px solid #000;transform:scale(1)}.box.blue{background:blue}",""])},483:function(t,e,n){(function(e,r){/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   3.3.1
	 */
!function(e,n){t.exports=n()}(this,function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function o(t){return"function"==typeof t}function i(t){Q=t}function u(t){V=t}function s(){return function(){return e.nextTick(p)}}function c(){return function(){G(p)}}function a(){var t=0,e=new $(p),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function l(){var t=new MessageChannel;return t.port1.onmessage=p,function(){return t.port2.postMessage(0)}}function f(){var t=setTimeout;return function(){return t(p,1)}}function p(){for(var t=0;t<z;t+=2){var e=nt[t],n=nt[t+1];e(n),nt[t]=void 0,nt[t+1]=void 0}z=0}function h(){try{var t=n(707);return G=t.runOnLoop||t.runOnContext,c()}catch(t){return f()}}function d(t,e){var n=arguments,r=this,o=new this.constructor(v);void 0===o[ot]&&Y(o);var i=r._state;return i?!function(){var t=n[i-1];V(function(){return C(i,o,t,r._result)})}():x(r,o,t,e),o}function y(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(v);return j(n,t),n}function v(){}function _(){return new TypeError("You cannot resolve a promise with itself")}function b(){return new TypeError("A promises callback cannot return that same promise.")}function m(t){try{return t.then}catch(t){return ct.error=t,ct}}function w(t,e,n,r){try{t.call(e,n,r)}catch(t){return t}}function g(t,e,n){V(function(t){var r=!1,o=w(n,e,function(n){r||(r=!0,e!==n?j(t,n):M(t,n))},function(e){r||(r=!0,P(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,P(t,o))},t)}function O(t,e){e._state===ut?M(t,e._result):e._state===st?P(t,e._result):x(e,void 0,function(e){return j(t,e)},function(e){return P(t,e)})}function T(t,e,n){e.constructor===t.constructor&&n===d&&e.constructor.resolve===y?O(t,e):n===ct?P(t,ct.error):void 0===n?M(t,e):o(n)?g(t,e,n):M(t,e)}function j(e,n){e===n?P(e,_()):t(n)?T(e,n,m(n)):M(e,n)}function E(t){t._onerror&&t._onerror(t._result),A(t)}function M(t,e){t._state===it&&(t._result=e,t._state=ut,0!==t._subscribers.length&&V(A,t))}function P(t,e){t._state===it&&(t._state=st,t._result=e,V(E,t))}function x(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+ut]=n,o[i+st]=r,0===i&&t._state&&V(A,t)}function A(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,u=0;u<e.length;u+=3)r=e[u],o=e[u+n],r?C(n,r,o,i):o(i);t._subscribers.length=0}}function k(){this.error=null}function S(t,e){try{return t(e)}catch(t){return at.error=t,at}}function C(t,e,n,r){var i=o(n),u=void 0,s=void 0,c=void 0,a=void 0;if(i){if(u=S(n,r),u===at?(a=!0,s=u.error,u=null):c=!0,e===u)return void P(e,b())}else u=r,c=!0;e._state!==it||(i&&c?j(e,u):a?P(e,s):t===ut?M(e,u):t===st&&P(e,u))}function R(t,e){try{e(function(e){j(t,e)},function(e){P(t,e)})}catch(e){P(t,e)}}function L(){return lt++}function Y(t){t[ot]=lt++,t._state=void 0,t._result=void 0,t._subscribers=[]}function H(t,e){this._instanceConstructor=t,this.promise=new t(v),this.promise[ot]||Y(this.promise),K(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?M(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&M(this.promise,this._result))):P(this.promise,D())}function D(){return new Error("Array Methods must be provided an Array")}function F(t){return new H(this,t).promise}function N(t){var e=this;return new e(K(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function U(t){var e=this,n=new e(v);return P(n,t),n}function W(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function q(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function B(t){this[ot]=L(),this._result=this._state=void 0,this._subscribers=[],v!==t&&("function"!=typeof t&&W(),this instanceof B?R(this,t):q())}function I(){var t=void 0;if("undefined"!=typeof r)t=r;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var n=null;try{n=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===n&&!e.cast)return}t.Promise=B}var J=void 0;J=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var K=J,z=0,G=void 0,Q=void 0,V=function(t,e){nt[z]=t,nt[z+1]=e,z+=2,2===z&&(Q?Q(p):rt())},X="undefined"!=typeof window?window:void 0,Z=X||{},$=Z.MutationObserver||Z.WebKitMutationObserver,tt="undefined"==typeof self&&"undefined"!=typeof e&&"[object process]"==={}.toString.call(e),et="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,nt=new Array(1e3),rt=void 0;rt=tt?s():$?a():et?l():void 0===X?h():f();var ot=Math.random().toString(36).substring(16),it=void 0,ut=1,st=2,ct=new k,at=new k,lt=0;return H.prototype._enumerate=function(){for(var t=this.length,e=this._input,n=0;this._state===it&&n<t;n++)this._eachEntry(e[n],n)},H.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===y){var o=m(t);if(o===d&&t._state!==it)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===B){var i=new n(v);T(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},H.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===it&&(this._remaining--,t===st?P(r,n):this._result[e]=n),0===this._remaining&&M(r,this._result)},H.prototype._willSettleAt=function(t,e){var n=this;x(t,void 0,function(t){return n._settledAt(ut,e,t)},function(t){return n._settledAt(st,e,t)})},B.all=F,B.race=N,B.resolve=y,B.reject=U,B._setScheduler=i,B._setAsap=u,B._asap=V,B.prototype={constructor:B,then:d,catch:function(t){return this.then(null,t)}},I(),B.polyfill=I,B.Promise=B,B})}).call(e,n(428),function(){return this}())},706:function(t,e,n){var r=n(478);"string"==typeof r&&(r=[[t.id,r,""]]);n(426)(r,{});r.locals&&(t.exports=r.locals)},707:function(t,e){}});