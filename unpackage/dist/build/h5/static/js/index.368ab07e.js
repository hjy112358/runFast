(function(e){function n(n){for(var a,i,u=n[0],l=n[1],c=n[2],s=0,d=[];s<u.length;s++)i=u[s],r[i]&&d.push(r[i][0]),r[i]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);f&&f(n);while(d.length)d.shift()();return o.push.apply(o,c||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],a=!0,i=1;i<t.length;i++){var l=t[i];0!==r[l]&&(a=!1)}a&&(o.splice(n--,1),e=u(u.s=t[0]))}return e}var a={},r={index:0},o=[];function i(e){return u.p+"static/js/"+({"pages-poker-newIndex":"pages-poker-newIndex"}[e]||e)+"."+{"pages-poker-newIndex":"34676956"}[e]+".js"}function u(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.e=function(e){var n=[],t=r[e];if(0!==t)if(t)n.push(t[2]);else{var a=new Promise(function(n,a){t=r[e]=[n,a]});n.push(t[2]=a);var o,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=i(e),o=function(n){l.onerror=l.onload=null,clearTimeout(c);var t=r[e];if(0!==t){if(t){var a=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src,i=new Error("Loading chunk "+e+" failed.\n("+a+": "+o+")");i.type=a,i.request=o,t[1](i)}r[e]=void 0}};var c=setTimeout(function(){o({type:"timeout",target:l})},12e4);l.onerror=l.onload=o,document.head.appendChild(l)}return Promise.all(n)},u.m=e,u.c=a,u.d=function(e,n,t){u.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,n){if(1&n&&(e=u(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)u.d(t,a,function(n){return e[n]}.bind(null,a));return t},u.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(n,"a",n),n},u.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},u.p="/../../",u.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=n,l=l.slice();for(var s=0;s<l.length;s++)n(l[s]);var f=c;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("541c")},"0b1e":function(e,n,t){var a=t("6fb8");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var r=t("4f06").default;r("02f48113",a,!0,{sourceMap:!1,shadowMode:!1})},"48eb":function(e,n,t){"use strict";var a=t("288e");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=a(t("e814")),o=a(t("59ad"));function i(){(function(e,n){var t,a=e.document,i=a.documentElement,u=a.querySelector('meta[name="viewport"]'),l=a.querySelector('meta[name="flexible"]'),c=0,s=0,f=n.flexible||(n.flexible={});if(u){var d=u.getAttribute("content").match(/initial\-scale=([\d\.]+)/);d&&(s=(0,o.default)(d[1]),c=(0,r.default)(1/s))}else if(l){var h=l.getAttribute("content");if(h){var g=h.match(/initial\-dpr=([\d\.]+)/),p=h.match(/maximum\-dpr=([\d\.]+)/);g&&(c=(0,o.default)(g[1]),s=(0,o.default)((1/c).toFixed(2))),p&&(c=(0,o.default)(p[1]),s=(0,o.default)((1/c).toFixed(2)))}}if(!c&&!s){e.navigator.appVersion.match(/android/gi);var v=e.navigator.appVersion.match(/iphone/gi),_=e.devicePixelRatio;c=v?_>=3&&(!c||c>=3)?3:_>=2&&(!c||c>=2)?2:1:1,s=1/c}if(i.setAttribute("data-dpr",c),!u)if(u=a.createElement("meta"),u.setAttribute("name","viewport"),u.setAttribute("content","initial-scale="+s+", maximum-scale="+s+", minimum-scale="+s+", user-scalable=no"),i.firstElementChild)i.firstElementChild.appendChild(u);else{var m=a.createElement("div");m.appendChild(u),a.write(m.innerHTML)}function b(){var n=i.getBoundingClientRect().width;n/c>750&&(n=750*c);var t=n/750*100;i.style.fontSize=t+"px",f.rem=e.rem=t}e.addEventListener("resize",function(){clearTimeout(t),t=setTimeout(b,300)},!1),e.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(t),t=setTimeout(b,300))},!1),"complete"===a.readyState?a.body.style.fontSize=12*c+"px":a.addEventListener("DOMContentLoaded",function(e){a.body.style.fontSize=12*c+"px"},!1),b(),f.dpr=e.dpr=c,f.refreshRem=b,f.rem2px=function(e){var n=(0,o.default)(e)*this.rem;return"string"===typeof e&&e.match(/rem$/)&&(n+="px"),n},f.px2rem=function(e){var n=(0,o.default)(e)/this.rem;return"string"===typeof e&&e.match(/px$/)&&(n+="rem"),n}})(window,window["lib"]||(window["lib"]={}))}t("4917");var u=i;n.default=u},"4ded":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={appid:"__UNI__815F9EA"};n.default=a},"541c":function(e,n,t){"use strict";var a=t("288e"),r=a(t("cebc"));t("cadf"),t("551c"),t("097d"),t("6d59"),t("1c31"),t("921b");var o=a(t("e143")),i=a(t("8ae9")),u=a(t("a2e2")),l=a(t("d06c")),c=a(t("9510")),s=a(t("48eb"));o.default.config.productionTip=!1,o.default.prototype.judgeCards=u.default,o.default.prototype.hintCards=l.default,o.default.prototype.follow=c.default,o.default.prototype.remFn=s.default,i.default.mpType="app";var f=new o.default((0,r.default)({},i.default));f.$mount()},"54ae":function(e,n,t){"use strict";var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("App",{attrs:{keepAliveInclude:e.keepAliveInclude}})},r=[];t.d(n,"a",function(){return a}),t.d(n,"b",function(){return r})},"6d59":function(e,n,t){"use strict";(function(e){var n=t("288e"),a=n(t("5176")),r=n(t("e143"));e["____815F9EA____"]=!0,delete e["____815F9EA____"],e.__uniConfig={globalStyle:{navigationBarTextStyle:"black",navigationBarTitleText:"棋牌",navigationBarBackgroundColor:"#F8F8F8",backgroundColor:"#F8F8F8",navigationStyle:"custom"}},e.__uniConfig.router={mode:"hash",base:"/../../"},e.__uniConfig["async"]={loading:"AsyncLoading",error:"AsyncError",delay:200,timeout:3e3},e.__uniConfig.debug=!1,e.__uniConfig.networkTimeout={request:6e3,connectSocket:6e3,uploadFile:6e3,downloadFile:6e3},e.__uniConfig.sdkConfigs={},e.__uniConfig.qqMapKey="XVXBZ-NDMC4-JOGUS-XGIEE-QVHDZ-AMFV2",e.__uniConfig.nvue={"flex-direction":"column"},r.default.component("pages-poker-newIndex",function(e){var n={component:t.e("pages-poker-newIndex").then(function(){return e(t("98e9"))}.bind(null,t)).catch(t.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(n.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(n.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),n}),e.__uniRoutes=[{path:"/",alias:"/pages/poker/newIndex",component:{render:function(e){return e("Page",{props:(0,a.default)({isQuit:!0,isEntry:!0},__uniConfig.globalStyle,{navigationBarTitleText:"棋牌"})},[e("pages-poker-newIndex",{slot:"page"})])}},meta:{id:1,name:"pages-poker-newIndex",isNVue:!1,pagePath:"pages/poker/newIndex",isQuit:!0,isEntry:!0,windowTop:0}},{path:"/preview-image",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-preview-image",{slot:"page"})])}},meta:{name:"preview-image",pagePath:"/preview-image"}},{path:"/choose-location",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-choose-location",{slot:"page"})])}},meta:{name:"choose-location",pagePath:"/choose-location"}},{path:"/open-location",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-open-location",{slot:"page"})])}},meta:{name:"open-location",pagePath:"/open-location"}}]}).call(this,t("c8ba"))},"6fb8":function(e,n,t){n=e.exports=t("2350")(!1),n.push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*每个页面公共css */",""])},"78b1":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={pages:{"pages/poker/newIndex":{navigationBarTitleText:"棋牌"}},globalStyle:{navigationBarTextStyle:"black",navigationBarTitleText:"棋牌",navigationBarBackgroundColor:"#F8F8F8",backgroundColor:"#F8F8F8",navigationStyle:"custom"}};n.default=a},"8ae9":function(e,n,t){"use strict";t.r(n);var a=t("54ae"),r=t("8ea3");for(var o in r)"default"!==o&&function(e){t.d(n,e,function(){return r[e]})}(o);t("f554");var i=t("2877"),u=Object(i["a"])(r["default"],a["a"],a["b"],!1,null,null,null);n["default"]=u.exports},"8ea3":function(e,n,t){"use strict";t.r(n);var a=t("bd01"),r=t.n(a);for(var o in a)"default"!==o&&function(e){t.d(n,e,function(){return a[e]})}(o);n["default"]=r.a},9510:function(e,n,t){"use strict";function a(e,n){console.log(e),console.log(n);var t=!0;return e.cardKind==n.cardKind?(t=r(e.val,n.val),t):"KINGBOMB"!=e.val&&("BOMB"!=e.val||("KINGBOMB"==n.val||(t=r(e.val,n.val),t)))}function r(e,n){return e<n}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a;n.default=o},a2e2:function(e,n,t){"use strict";var a=t("288e");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=a(t("e814"));t("ac6a");var o=a(t("b748")),i=t("c75a");function u(e){var n={status:!1},t=e.length,a=[];switch(e.forEach(function(e){a.push((0,r.default)(e.card))}),t){case 1:n={status:!0,cardKind:"ONE",val:a[0],size:t};break;case 2:n=l(a)?{status:!0,cardKind:"PAIRS",val:a[0],size:t}:E(a)?{status:!0,cardKind:"KINGBOMB",val:(0,i.getMaxVal)(a,1),size:t}:{status:!1};break;case 3:n=c(a)?{status:!0,cardKind:"THREE",val:a[0],size:t}:{status:!1};break;case 4:n=s(a)?{status:!0,cardKind:"THREE_ONE",val:(0,i.getMaxVal)(a,3),size:t}:b(a)?{status:!0,cardKind:"BOMB",val:a[0],size:t}:{status:!1};break;default:n=f(a)?{status:!0,cardKind:"THREE_TWO",val:(0,i.getMaxVal)(a,3),size:t}:d(a)?{status:!0,cardKind:"PROGRESSION",val:(0,i.getMaxVal)(a,1),size:t}:h(a)?{status:!0,cardKind:"PROGRESSION_PAIRS",val:(0,i.getMaxVal)(a,2),size:t}:g(a)?{status:!0,cardKind:"PLANE",val:(0,i.getMaxVal)(a,3),size:t}:p(a,e)?{status:!0,cardKind:"PLANE_ONE",val:(0,i.getMaxVal)((0,o.default)(e)._plane[0],3),size:t}:v(a)?{status:!0,cardKind:"PLANE_PAIRS",val:(0,i.getMaxVal)(a,3),size:t}:_(a)?{status:!0,cardKind:"FOUR_TWO",val:(0,i.getMaxVal)(a,4),size:t}:m(a)?{status:!0,cardKind:"FOUR_PAIRS",val:(0,i.getMaxVal)(a,4),size:t}:{status:!1};break}return n}function l(e){return 2==e.length&&e[0]===e[1]}function c(e){return 3==e.length&&e[0]===e[1]&&e[1]===e[2]}function s(e){if(4==e.length){var n=(0,i.valCount)(e);return 2==n.length&&(3==n[0].count||3==n[1].count)}return!1}function f(e){if(5==e.length){var n=(0,i.valCount)(e);return 2==n.length&&(3==n[0].count||3==n[1].count)}return!1}function d(e){if(e.length<5||e.length>12)return!1;for(var n=(0,i.sortCard)(e),t=0;t<n.length-1;t++)if(n[t+1]-1!=n[t])return!1;return!0}function h(e){if(e.length<6||e.length>24)return!1;for(var n=(0,i.valCount)((0,i.sortCard)(e)),t=0;t<n.length;t++){if(2!=n[t].count)return!1;if(t<n.length-1&&n[t+1].val-1!=n[t].val)return!1}return!0}function g(e){if(e.length<6||e.length>36)return!1;for(var n=(0,i.valCount)((0,i.sortCard)(e)),t=0;t<n.length;t++){if(3!=n[t].count||n[t].val>14)return!1;if(t<n.length-1&&n[t+1].val-1!=n[t].val)return!1}return!0}function p(e,n){var t=(0,o.default)(n);return!t._bomb.length&&!t._kingBomb.length&&(1==t._plane.length&&(t._plane[0].length/3==t._three.length-1||(t._plane[0].length/3==t._one.length+2*t._pairs.length||void 0)))}function v(e){if(e.length<10||e.length%5!=0)return!1;var n=(0,i.valCount)((0,i.sortCard)(e)),t=[],a=[],r=e.length/5;if(n.forEach(function(e){if(3==e.count)t.push(e);else{if(2!=e.count)return!1;a.push(e)}}),t.length!=r||a.length!=r||t[r-1].val>14)return!1;for(var o=0;o<t.length-1;o++)if(t[o].val+1!=t[o+1].val)return!1;return!0}function _(e){var n=(0,i.valCount)(e);if(6!=e.length||n.length>3)return!1;for(var t=0;t<n.length;t++)if(4==n[t].count)return!0;return!1}function m(e){var n=(0,i.valCount)(e),t=[];return n.forEach(function(e){2==e.count&&t.push(e)}),8==e.length&&3==n.length&&2==t.length}function b(e){return 4==e.length&&e[0]==e[1]&&e[0]==e[2]&&e[0]==e[3]}function E(e){return 2==e.length&&e[0]+e[1]==33}var y=u;n.default=y},b748:function(e,n,t){"use strict";var a=t("288e");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=a(t("e814"));t("ac6a");var o=t("c75a");function i(e){var n=[],t=[],a=[],i={_one:[],_pairs:[],_three:[],_plane:[],_progression:[],_progressionPairs:[],_kingBomb:[],_bomb:[]},u=[];e.forEach(function(e){n.push((0,r.default)(e.card))}),t=(0,o.sortCard)(n.slice(0)),a=(0,o.valCount)(t),t.slice(-2)[0]+t.slice(-2)[1]==33&&i._kingBomb.push([16,17]),a.forEach(function(e){4==e.count?i._bomb.push([e.val,e.val,e.val,e.val]):t.forEach(function(n){n==e.val&&u.push(n)})}),a.forEach(function(e){3==e.count&&i._three.push([e.val,e.val,e.val])});var l=[];a.forEach(function(e){e.val<15&&3==e.count&&l.push(e.val)}),(0,o.arrange)(l).forEach(function(e){if(e.length>1){var n=[];e.forEach(function(e){n.push(e,e,e)}),i._plane.push(n)}});var c=[];a.forEach(function(e){e.count<4&&e.val<15&&c.push(e.val)}),(0,o.arrange)(c).forEach(function(e){e.length>=5&&i._progression.push(e)});var s=[];return a.forEach(function(e){2==e.count&&(i._pairs.push([e.val,e.val]),e.val<15&&s.push(e.val))}),(0,o.arrange)(s).forEach(function(e){if(e.length>2){var n=[];e.forEach(function(e){n.push(e,e)}),i._progressionPairs.push(n)}}),a.forEach(function(e){1==e.count&&0==i._kingBomb.length&&i._one.push([e.val])}),i}var u=i;n.default=u},bd01:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={};n.default=a},c75a:function(e,n,t){"use strict";function a(e){for(var n=[],t=0;t<e.length;t++)a(n,e[t]);function a(e,n){for(var t=0;t<e.length;t++)if(e[t].val==n)return void e[t].count++;e.push({val:n,count:1})}return n}function r(e,n){var t=a(e),r=0;return t.forEach(function(e){e.count===n&&e.val>r&&(r=e.val)}),r}function o(e){for(var n,t=0;t<e.length-1;t++)for(var a=t+1;a<e.length;a++)e[t]>e[a]&&(n=e[a],e[a]=e[t],e[t]=n);return e}function i(e){for(var n,t,a=[],r=0;r<e.length;r++){var o=e[r];if(null!=o){if(n===o){t.push(n),n++;continue}t=[o],n=o+1,a.push(t)}}return a}Object.defineProperty(n,"__esModule",{value:!0}),n.valCount=a,n.getMaxVal=r,n.sortCard=o,n.arrange=i,t("ac6a")},d06c:function(e,n,t){"use strict";var a=t("288e");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,t("ac6a");var r=a(t("a2e2")),o=a(t("b748"));function i(e,n){var t=null,a=e.length&&(0,r.default)(e).status?(0,r.default)(e):null,i=[];n.forEach(function(e){e.isHint&&i.push(e)});var l=(0,o.default)(i);return a?"BOMB"==a.cardKind?(l._bomb.length&&l._bomb.forEach(function(e){e[0]>a.val&&!t&&(t=e,u(t,n))}),l._kingBomb.length&&!t&&(t=l._kingBomb[0],n.forEach(function(e){e.isHint=!1}))):"KINGBOMB"==a.cardKind?t=null:("ONE"==a.cardKind&&l._one.length?l._one.forEach(function(e){e[0]>a.val&&!t&&(t=e,u(t,n))}):"PAIRS"==a.cardKind&&l._pairs.length?l._pairs.forEach(function(e){e[0]>a.val&&!t&&(t=e,u(t,n))}):"THREE"==a.cardKind&&l._three.length?l._three.forEach(function(e){e[0]>a.val&&!t&&(t=e,u(t,n))}):"THREE_ONE"==a.cardKind&&l._three.length?(l._one.length||l._pairs.length)&&l._three.forEach(function(e){e[0]>a.val&&!t&&(t=e,u(t,n),l._one.length?t.push(l._one[0][0]):l._pairs.length&&t.push(l._pairs[0][0]))}):"THREE_TWO"==a.cardKind&&l._three.length?l._pairs.length&&l._three.forEach(function(e){e[0]>a.val&&!t&&(t=e,u(t,n),t=t.concat(l._pairs[0]))}):"PROGRESSION"==a.cardKind&&l._progression.length?l._progression.forEach(function(e){e.length>=a.size&&e.forEach(function(r,o){r+a.size-1>a.val&&r+a.size-1<=e[e.length-1]&&!t&&(t=e.slice(o,a.size+o),u([r],n))})}):"PROGRESSION_PAIRS"==a.cardKind&&l._progressionPairs.length?l._progressionPairs.forEach(function(e){e.length>=a.size&&e.forEach(function(r,o){r+a.size/2-1>a.val&&r+a.size/2-1<=e[e.length-1]&&!t&&(t=e.slice(o,a.size+o),u([r,r],n))})}):"PLANE"==a.cardKind&&l._plane.length?l._plane.forEach(function(e){e.length>=a.size&&e.forEach(function(r,o){r+a.size/3-1>a.val&&r+a.size/3-1<=e[e.length-1]&&!t&&(t=e.slice(o,a.size+o),u([r,r,r],n))})}):"PLANE_ONE"==a.cardKind&&l._plane.length?l._one.length+2*l._pairs.length>=a.size/4&&l._plane.forEach(function(e){e.length>=a.size/4*3&&e.forEach(function(r,o){r+a.size/4-1>a.val&&r+a.size/4-1<=e[e.length-1]&&!t&&(t=e.slice(o,a.size/4*3+o),u([r,r,r],n),l._one.forEach(function(e){t.length<a.size&&t.push(e[0])}),t.length<a.size&&l._pairs.forEach(function(e){e.forEach(function(e){t.length<a.size&&t.push(e)})}))})}):"PLANE_PAIRS"==a.cardKind&&l._plane.length?l._pairs.length>=a.size/5&&l._plane.forEach(function(e){e.length>=a.size/5*3&&e.forEach(function(r,o){r+a.size/5-1>a.val&&r+a.size/5-1<=e[e.length-1]&&!t&&(t=e.slice(o,a.size/5*3+o),u([r,r,r],n),l._pairs.forEach(function(e){t.length<a.size&&(t=t.concat(e))}))})}):"FOUR_TWO"!=a.cardKind&&"FOUR_PAIRS"!=a.cardKind||(l._bomb.length&&!t?l._bomb.forEach(function(e){t=e,u(e,n)}):l._kingBomb.length&&!t&&(t=l._kingBomb[0],n.forEach(function(e){e.isHint=!1}))),t||(l._bomb.length?(t=l._bomb[0],u(t,n)):l._kingBomb.length&&(t=l._kingBomb[0],n.forEach(function(e){e.isHint=!1})))):l._one.length?(t=l._one[0],u(t,n)):l._pairs.length?(t=l._pairs[0],u(t,n)):l._three.length?(t=l._three[0],u(t,n)):l._bomb.length?(t=l._bomb[0],u(t,n)):l._kingBomb.length&&(t=l._kingBomb[0],n.forEach(function(e){16!=e.card&&17!=e.card||(e.isHint=!1)})),t||n.forEach(function(e){e.isHint=!0}),t}function u(e,n){n.forEach(function(n){n.card==e[0]&&(n.isHint=!1)})}var l=i;n.default=l},f554:function(e,n,t){"use strict";var a=t("0b1e"),r=t.n(a);r.a}});