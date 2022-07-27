/*!
 * docsify-themeable
 * v0.8.6
 * https://jhildenbiddle.github.io/docsify-themeable/
 * (c) 2018-2021 John Hildenbiddle
 * MIT license
 */
!function(){"use strict";function e(){return(e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function t(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n={mimeType:t.mimeType||null,onBeforeSend:t.onBeforeSend||Function.prototype,onSuccess:t.onSuccess||Function.prototype,onError:t.onError||Function.prototype,onComplete:t.onComplete||Function.prototype},r=Array.isArray(e)?e:[e],o=Array.apply(null,Array(r.length)).map((function(e){return null}));function a(e){var t="string"==typeof e,n=t&&"<"===e.trim().charAt(0);return t&&!n}function s(e,t){n.onError(e,r[t],t)}function c(e,t){var a=n.onSuccess(e,r[t],t);e=!1===a?"":a||e,o[t]=e,-1===o.indexOf(null)&&n.onComplete(o)}var i=document.createElement("a");r.forEach((function(e,t){if(i.setAttribute("href",e),i.href=String(i.href),Boolean(document.all&&!window.atob)&&i.host.split(":")[0]!==location.host.split(":")[0]){if(i.protocol===location.protocol){var r=new XDomainRequest;r.open("GET",e),r.timeout=0,r.onprogress=Function.prototype,r.ontimeout=Function.prototype,r.onload=function(){var e=r.responseText;a(e)?c(e,t):s(r,t)},r.onerror=function(e){s(r,t)},setTimeout((function(){r.send()}),0)}else console.warn("Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol (".concat(e,")")),s(null,t)}else{var o=new XMLHttpRequest;o.open("GET",e),n.mimeType&&o.overrideMimeType&&o.overrideMimeType(n.mimeType),n.onBeforeSend(o,e,t),o.onreadystatechange=function(){if(4===o.readyState){var e=o.responseText;o.status<400&&a(e)||0===o.status&&a(e)?c(e,t):s(o,t)}},o.send()}}))}function n(e){var n=/\/\*[\s\S]+?\*\//g,o=/(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g,a={rootElement:e.rootElement||document,include:e.include||'style,link[rel="stylesheet"]',exclude:e.exclude||null,filter:e.filter||null,skipDisabled:!1!==e.skipDisabled,useCSSOM:e.useCSSOM||!1,onBeforeSend:e.onBeforeSend||Function.prototype,onSuccess:e.onSuccess||Function.prototype,onError:e.onError||Function.prototype,onComplete:e.onComplete||Function.prototype},s=Array.apply(null,a.rootElement.querySelectorAll(a.include)).filter((function(e){return t=e,n=a.exclude,!(t.matches||t.matchesSelector||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector).call(t,n);var t,n})),c=Array.apply(null,Array(s.length)).map((function(e){return null}));function i(){if(-1===c.indexOf(null)){c.reduce((function(e,t,n){return""===t&&e.push(n),e}),[]).reverse().forEach((function(e){return[s,c].forEach((function(t){return t.splice(e,1)}))}));var e=c.join("");a.onComplete(e,c,s)}}function u(e,t,n,r){var o=a.onSuccess(e,n,r);d(e=void 0!==o&&!1===Boolean(o)?"":o||e,n,r,(function(e,r){null===c[t]&&(r.forEach((function(e){return a.onError(e.xhr,n,e.url)})),!a.filter||a.filter.test(e)?c[t]=e:c[t]="",i())}))}function l(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],s={};return s.rules=(e.replace(n,"").match(o)||[]).filter((function(e){return-1===a.indexOf(e)})),s.urls=s.rules.map((function(e){return e.replace(o,"$1")})),s.absoluteUrls=s.urls.map((function(e){return r(e,t)})),s.absoluteRules=s.rules.map((function(e,n){var o=s.urls[n],a=r(s.absoluteUrls[n],t);return e.replace(o,a)})),s}function d(e,n,r,o){var s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[],c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:[],i=l(e,r,c);i.rules.length?t(i.absoluteUrls,{onBeforeSend:function(e,t,r){a.onBeforeSend(e,n,t)},onSuccess:function(e,t,r){var o=a.onSuccess(e,n,t),s=l(e=!1===o?"":o||e,t,c);return s.rules.forEach((function(t,n){e=e.replace(t,s.absoluteRules[n])})),e},onError:function(t,a,u){s.push({xhr:t,url:a}),c.push(i.rules[u]),d(e,n,r,o,s,c)},onComplete:function(t){t.forEach((function(t,n){e=e.replace(i.rules[n],t)})),d(e,n,r,o,s,c)}}):o(e,s)}s.length?s.forEach((function(e,n){var o=e.getAttribute("href"),s=e.getAttribute("rel"),l="link"===e.nodeName.toLowerCase()&&o&&s&&-1!==s.toLowerCase().indexOf("stylesheet"),d=!1!==a.skipDisabled&&e.disabled,f="style"===e.nodeName.toLowerCase();if(l&&!d)t(o,{mimeType:"text/css",onBeforeSend:function(t,n,r){a.onBeforeSend(t,e,n)},onSuccess:function(t,a,s){var c=r(o);u(t,n,e,c)},onError:function(t,r,o){c[n]="",a.onError(t,e,r),i()}});else if(f&&!d){var m=e.textContent;a.useCSSOM&&(m=Array.apply(null,e.sheet.cssRules).map((function(e){return e.cssText})).join("")),u(m,n,e,location.href)}else c[n]="",i()})):a.onComplete("",[])}function r(e,t){var n=document.implementation.createHTMLDocument(""),r=n.createElement("base"),o=n.createElement("a");return n.head.appendChild(r),n.body.appendChild(o),r.href=t||document.baseURI||(document.querySelector("base")||{}).href||location.href,o.href=e,o.href}var o=a;function a(e,t,n){e instanceof RegExp&&(e=s(e,n)),t instanceof RegExp&&(t=s(t,n));var r=c(e,t,n);return r&&{start:r[0],end:r[1],pre:n.slice(0,r[0]),body:n.slice(r[0]+e.length,r[1]),post:n.slice(r[1]+t.length)}}function s(e,t){var n=t.match(e);return n?n[0]:null}function c(e,t,n){var r,o,a,s,c,i=n.indexOf(e),u=n.indexOf(t,i+1),l=i;if(i>=0&&u>0){if(e===t)return[i,u];for(r=[],a=n.length;l>=0&&!c;)l==i?(r.push(l),i=n.indexOf(e,l+1)):1==r.length?c=[r.pop(),u]:((o=r.pop())<a&&(a=o,s=u),u=n.indexOf(t,l+1)),l=i<u&&i>=0?i:u;r.length&&(c=[a,s])}return c}function i(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r={preserveStatic:!0,removeComments:!1},a=e({},r,n),s=[];function c(e){throw new Error("CSS parse error: ".concat(e))}function i(e){var n=e.exec(t);if(n)return t=t.slice(n[0].length),n}function u(){return i(/^{\s*/)}function l(){return i(/^}/)}function d(){i(/^\s*/)}function f(){if(d(),"/"===t[0]&&"*"===t[1]){for(var e=2;t[e]&&("*"!==t[e]||"/"!==t[e+1]);)e++;if(!t[e])return c("end of comment is missing");var n=t.slice(2,e);return t=t.slice(e+2),{type:"comment",comment:n}}}function m(){for(var e,t=[];e=f();)t.push(e);return a.removeComments?[]:t}function p(){for(d();"}"===t[0];)c("extra closing bracket");var e=i(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);if(e){var n,r=e[0].trim();/\/\*/.test(r)&&(r=r.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g,""));var o=/["']\w*,\w*["']/.test(r);return o&&(r=r.replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g,(function(e){return e.replace(/,/g,"‌")}))),n=/,/.test(r)?r.split(/\s*(?![^(]*\)),\s*/):[r],o&&(n=n.map((function(e){return e.replace(/\u200C/g,",")}))),n}}function v(){if("@"===t[0])return O();i(/^([;\s]*)+/);var e=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,n=i(/^(\*?[-#/*\\\w.]+(\[[0-9a-z_-]+\])?)\s*/);if(n){if(n=n[0].trim(),!i(/^:\s*/))return c("property missing ':'");var r=i(/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/),o={type:"declaration",property:n.replace(e,""),value:r?r[0].replace(e,"").trim():""};return i(/^[;\s]*/),o}}function h(){if(!u())return c("missing '{'");for(var e,t=m();e=v();)t.push(e),t=t.concat(m());return l()?t:c("missing '}'")}function y(){d();for(var e,t=[];e=i(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/);)t.push(e[1]),i(/^,\s*/);if(t.length)return{type:"keyframe",values:t,declarations:h()}}function g(){var e=i(/^@([-\w]+)?keyframes\s*/);if(e){var t=e[1];if(!(e=i(/^([-\w]+)\s*/)))return c("@keyframes missing name");var n,r=e[1];if(!u())return c("@keyframes missing '{'");for(var o=m();n=y();)o.push(n),o=o.concat(m());return l()?{type:"keyframes",name:r,vendor:t,keyframes:o}:c("@keyframes missing '}'")}}function b(){if(i(/^@page */))return{type:"page",selectors:p()||[],declarations:h()}}function w(){var e=i(/@(top|bottom|left|right)-(left|center|right|top|middle|bottom)-?(corner)?\s*/);if(e)return{type:"page-margin-box",name:"".concat(e[1],"-").concat(e[2])+(e[3]?"-".concat(e[3]):""),declarations:h()}}function E(){if(i(/^@font-face\s*/))return{type:"font-face",declarations:h()}}function S(){var e=i(/^@supports *([^{]+)/);if(e)return{type:"supports",supports:e[1].trim(),rules:M()}}function C(){if(i(/^@host\s*/))return{type:"host",rules:M()}}function x(){var e=i(/^@media([^{]+)*/);if(e)return{type:"media",media:(e[1]||"").trim(),rules:M()}}function A(){var e=i(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);if(e)return{type:"custom-media",name:e[1].trim(),media:e[2].trim()}}function k(){var e=i(/^@([-\w]+)?document *([^{]+)/);if(e)return{type:"document",document:e[2].trim(),vendor:e[1]?e[1].trim():null,rules:M()}}function L(){var e=i(/^@(import|charset|namespace)\s*([^;]+);/);if(e)return{type:e[1],name:e[2].trim()}}function O(){if(d(),"@"===t[0]){var e=L()||E()||x()||g()||S()||k()||A()||C()||b()||w();if(e&&!a.preserveStatic){var n=!1;if(e.declarations)n=e.declarations.some((function(e){return/var\(/.test(e.value)}));else n=(e.keyframes||e.rules||[]).some((function(e){return(e.declarations||[]).some((function(e){return/var\(/.test(e.value)}))}));return n?e:{}}return e}}function _(){if(!a.preserveStatic){var e=o("{","}",t);if(e){var n=/:(?:root|host)(?![.:#(])/.test(e.pre)&&/--\S*\s*:/.test(e.body),r=/var\(/.test(e.body);if(!n&&!r)return t=t.slice(e.end+1),{}}}var s=p()||[],i=a.preserveStatic?h():h().filter((function(e){var t=s.some((function(e){return/:(?:root|host)(?![.:#(])/.test(e)}))&&/^--\S/.test(e.property),n=/var\(/.test(e.value);return t||n}));return s.length||c("selector missing"),{type:"rule",selectors:s,declarations:i}}function M(e){if(!e&&!u())return c("missing '{'");for(var n,r=m();t.length&&(e||"}"!==t[0])&&(n=O()||_());)n.type&&r.push(n),r=r.concat(m());return e||l()?r:c("missing '}'")}return{type:"stylesheet",stylesheet:{rules:M(!0),errors:s}}}function u(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r={parseHost:!1,store:{},onWarning:function(){}},o=e({},r,n),a=new RegExp(":".concat(o.parseHost?"host":"root","$"));return"string"==typeof t&&(t=i(t,o)),t.stylesheet.rules.forEach((function(e){"rule"===e.type&&e.selectors.some((function(e){return a.test(e)}))&&e.declarations.forEach((function(e,t){var n=e.property,r=e.value;n&&0===n.indexOf("--")&&(o.store[n]=r)}))})),o.store}function l(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2?arguments[2]:void 0,r={charset:function(e){return"@charset "+e.name+";"},comment:function(e){return 0===e.comment.indexOf("__CSSVARSPONYFILL")?"/*"+e.comment+"*/":""},"custom-media":function(e){return"@custom-media "+e.name+" "+e.media+";"},declaration:function(e){return e.property+":"+e.value+";"},document:function(e){return"@"+(e.vendor||"")+"document "+e.document+"{"+o(e.rules)+"}"},"font-face":function(e){return"@font-face{"+o(e.declarations)+"}"},host:function(e){return"@host{"+o(e.rules)+"}"},import:function(e){return"@import "+e.name+";"},keyframe:function(e){return e.values.join(",")+"{"+o(e.declarations)+"}"},keyframes:function(e){return"@"+(e.vendor||"")+"keyframes "+e.name+"{"+o(e.keyframes)+"}"},media:function(e){return"@media "+e.media+"{"+o(e.rules)+"}"},namespace:function(e){return"@namespace "+e.name+";"},page:function(e){return"@page "+(e.selectors.length?e.selectors.join(", "):"")+"{"+o(e.declarations)+"}"},"page-margin-box":function(e){return"@"+e.name+"{"+o(e.declarations)+"}"},rule:function(e){var t=e.declarations;if(t.length)return e.selectors.join(",")+"{"+o(t)+"}"},supports:function(e){return"@supports "+e.supports+"{"+o(e.rules)+"}"}};function o(e){for(var o="",a=0;a<e.length;a++){var s=e[a];n&&n(s);var c=r[s.type](s);c&&(o+=c,c.length&&s.selectors&&(o+=t))}return o}return o(e.stylesheet.rules)}function d(e,t){e.rules.forEach((function(n){n.rules?d(n,t):n.keyframes?n.keyframes.forEach((function(e){"keyframe"===e.type&&t(e.declarations,n)})):n.declarations&&t(n.declarations,e)}))}a.range=c;function f(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r={preserveStatic:!0,preserveVars:!1,variables:{},onWarning:function(){}},o=e({},r,n);return"string"==typeof t&&(t=i(t,o)),d(t.stylesheet,(function(e,t){for(var n=0;n<e.length;n++){var r=e[n],a=r.type,s=r.property,c=r.value;if("declaration"===a)if(o.preserveVars||!s||0!==s.indexOf("--")){if(-1!==c.indexOf("var(")){var i=p(c,o);i!==r.value&&(i=m(i),o.preserveVars?(e.splice(n,0,{type:a,property:s,value:i}),n++):r.value=i)}}else e.splice(n,1),n--}})),l(t)}function m(e){return(e.match(/calc\(([^)]+)\)/g)||[]).forEach((function(t){var n="calc".concat(t.split("calc").join(""));e=e.replace(t,n)})),e}function p(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0;if(-1===e.indexOf("var("))return e;var r=o("(",")",e);function a(e){var r=e.split(",")[0].replace(/[\s\n\t]/g,""),o=(e.match(/(?:\s*,\s*){1}(.*)?/)||[])[1],a=Object.prototype.hasOwnProperty.call(t.variables,r)?String(t.variables[r]):void 0,s=a||(o?String(o):void 0),c=n||e;return a||t.onWarning('variable "'.concat(r,'" is undefined')),s&&"undefined"!==s&&s.length>0?p(s,t,c):"var(".concat(c,")")}if(r){if("var"===r.pre.slice(-3)){var s=0===r.body.trim().length;return s?(t.onWarning("var() must contain a non-whitespace string"),e):r.pre.slice(0,-3)+a(r.body)+p(r.post,t)}return r.pre+"(".concat(p(r.body,t),")")+p(r.post,t)}return-1!==e.indexOf("var(")&&t.onWarning('missing closing ")" in the value "'.concat(e,'"')),e}var v="undefined"!=typeof window,h=v&&window.CSS&&window.CSS.supports&&window.CSS.supports("(--a: 0)"),y={group:0,job:0},g={rootElement:v?document:null,shadowDOM:!1,include:"style,link[rel=stylesheet]",exclude:"",variables:{},onlyLegacy:!0,preserveStatic:!0,preserveVars:!1,silent:!1,updateDOM:!0,updateURLs:!0,watch:null,onBeforeSend:function(){},onError:function(){},onWarning:function(){},onSuccess:function(){},onComplete:function(){},onFinally:function(){}},b={cssComments:/\/\*[\s\S]+?\*\//g,cssKeyframes:/@(?:-\w*-)?keyframes/,cssMediaQueries:/@media[^{]+\{([\s\S]+?})\s*}/g,cssUrls:/url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,cssVarDeclRules:/(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^}]*})/g,cssVarDecls:/(?:[\s;]*)(-{2}\w[\w-]*)(?:\s*:\s*)([^;]*);/g,cssVarFunc:/var\(\s*--[\w-]/,cssVars:/(?:(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/},w={dom:{},job:{},user:{}},E=!1,S=null,C=0,x=null,A=!1;function k(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r="cssVars(): ",o=e({},g,t);function a(e,t,n,a){!o.silent&&window.console&&console.error("".concat(r).concat(e,"\n"),t),o.onError(e,t,n,a)}function s(e){!o.silent&&window.console&&console.warn("".concat(r).concat(e)),o.onWarning(e)}function c(e){o.onFinally(Boolean(e),h,N()-o.__benchmark)}if(v){if(o.watch)return o.watch=g.watch,L(o),void k(o);if(!1===o.watch&&S&&(S.disconnect(),S=null),!o.__benchmark){if(E===o.rootElement)return void O(t);var d=[].slice.call(o.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])'));if(o.__benchmark=N(),o.exclude=[S?'[data-cssvars]:not([data-cssvars=""])':'[data-cssvars="out"]',"link[disabled]:not([data-cssvars])",o.exclude].filter((function(e){return e})).join(","),o.variables=j(o.variables),d.forEach((function(e){var t="style"===e.nodeName.toLowerCase()&&e.__cssVars.text,n=t&&e.textContent!==e.__cssVars.text;t&&n&&(e.sheet&&(e.sheet.disabled=!1),e.setAttribute("data-cssvars",""))})),!S){var m=[].slice.call(o.rootElement.querySelectorAll('[data-cssvars="out"]'));m.forEach((function(e){var t=e.getAttribute("data-cssvars-group");(t?o.rootElement.querySelector('[data-cssvars="src"][data-cssvars-group="'.concat(t,'"]')):null)||e.parentNode.removeChild(e)})),C&&d.length<C&&(C=d.length,w.dom={})}}if("loading"!==document.readyState)if(h&&o.onlyLegacy){var p=!1;if(o.updateDOM){var x=o.rootElement.host||(o.rootElement===document?document.documentElement:o.rootElement);Object.keys(o.variables).forEach((function(e){var t=o.variables[e];p=p||t!==getComputedStyle(x).getPropertyValue(e),x.style.setProperty(e,t)}))}c(p)}else!A&&(o.shadowDOM||o.rootElement.shadowRoot||o.rootElement.host)?n({rootElement:g.rootElement,include:g.include,exclude:o.exclude,skipDisabled:!1,onSuccess:function(e,t,n){return!((t.sheet||{}).disabled&&!t.__cssVars)&&((e=((e=e.replace(b.cssComments,"").replace(b.cssMediaQueries,"")).match(b.cssVarDeclRules)||[]).join(""))||!1)},onComplete:function(e,t,n){u(e,{store:w.dom,onWarning:s}),A=!0,k(o)}}):(E=o.rootElement,n({rootElement:o.rootElement,include:o.include,exclude:o.exclude,skipDisabled:!1,onBeforeSend:o.onBeforeSend,onError:function(e,t,n){var r=e.responseURL||T(n,location.href),o=e.statusText?"(".concat(e.statusText,")"):"Unspecified Error"+(0===e.status?" (possibly CORS related)":"");a("CSS XHR Error: ".concat(r," ").concat(e.status," ").concat(o),t,e,r)},onSuccess:function(e,t,n){if((t.sheet||{}).disabled&&!t.__cssVars)return!1;var r="link"===t.nodeName.toLowerCase(),a="style"===t.nodeName.toLowerCase()&&e!==t.textContent,s=o.onSuccess(e,t,n);return e=void 0!==s&&!1===Boolean(s)?"":s||e,o.updateURLs&&(r||a)&&(e=M(e,n)),e},onComplete:function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],d=e({},w.dom,w.user);if(w.job={},r.forEach((function(e,t){var r=n[t];if(e.__cssVars=e.__cssVars||{},e.__cssVars.text=r,b.cssVars.test(r))try{var c=i(r,{preserveStatic:o.preserveStatic,removeComments:!0});u(c,{parseHost:Boolean(o.rootElement.host),store:w.dom,onWarning:s}),e.__cssVars.tree=c}catch(t){a(t.message,e)}})),e(w.job,w.dom),o.updateDOM?(e(w.user,o.variables),e(w.job,w.user)):(e(w.job,w.user,o.variables),e(d,o.variables)),y.job>0&&Boolean(Object.keys(w.job).length>Object.keys(d).length||Boolean(Object.keys(d).length&&Object.keys(w.job).some((function(e){return w.job[e]!==d[e]})))))V(o.rootElement),k(o);else{var m=[],p=[],v=!1;if(o.updateDOM&&y.job++,r.forEach((function(t,r){var c=!t.__cssVars.tree;if(t.__cssVars.tree)try{f(t.__cssVars.tree,e({},o,{variables:w.job,onWarning:s}));var i=l(t.__cssVars.tree);if(o.updateDOM){var u=n[r],d=b.cssVarFunc.test(u);if(t.getAttribute("data-cssvars")||t.setAttribute("data-cssvars","src"),i.length&&d){var h=t.getAttribute("data-cssvars-group")||++y.group,g=i.replace(/\s/g,""),E=o.rootElement.querySelector('[data-cssvars="out"][data-cssvars-group="'.concat(h,'"]'))||document.createElement("style");v=v||b.cssKeyframes.test(i),o.preserveStatic&&t.sheet&&(t.sheet.disabled=!0),E.hasAttribute("data-cssvars")||E.setAttribute("data-cssvars","out"),g===t.textContent.replace(/\s/g,"")?(c=!0,E&&E.parentNode&&(t.removeAttribute("data-cssvars-group"),E.parentNode.removeChild(E))):g!==E.textContent.replace(/\s/g,"")&&([t,E].forEach((function(e){e.setAttribute("data-cssvars-job",y.job),e.setAttribute("data-cssvars-group",h)})),E.textContent=i,m.push(i),p.push(E),E.parentNode||t.parentNode.insertBefore(E,t.nextSibling))}}else t.textContent.replace(/\s/g,"")!==i&&m.push(i)}catch(e){a(e.message,t)}c&&t.setAttribute("data-cssvars","skip"),t.hasAttribute("data-cssvars-job")||t.setAttribute("data-cssvars-job",y.job)})),C=o.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])').length,o.shadowDOM)for(var h,g=[].concat(o.rootElement).concat([].slice.call(o.rootElement.querySelectorAll("*"))),S=0;h=g[S];++S)if(h.shadowRoot&&h.shadowRoot.querySelector("style")){var x=e({},o,{rootElement:h.shadowRoot});k(x)}o.updateDOM&&v&&_(o.rootElement),E=!1,o.onComplete(m.join(""),p,JSON.parse(JSON.stringify(w.job)),N()-o.__benchmark),c(p.length)}}}));else document.addEventListener("DOMContentLoaded",(function e(n){k(t),document.removeEventListener("DOMContentLoaded",e)}))}}function L(e){function t(e){var t=n(e)&&e.hasAttribute("disabled"),r=(e.sheet||{}).disabled;return t||r}function n(e){return"link"===e.nodeName.toLowerCase()&&-1!==(e.getAttribute("rel")||"").indexOf("stylesheet")}function r(e){return"style"===e.nodeName.toLowerCase()}window.MutationObserver&&(S&&(S.disconnect(),S=null),(S=new MutationObserver((function(o){o.some((function(o){return function(r){var o=!1;if("attributes"===r.type&&n(r.target)&&!t(r.target)){var a="disabled"===r.attributeName,s="href"===r.attributeName,c="skip"===r.target.getAttribute("data-cssvars"),i="src"===r.target.getAttribute("data-cssvars");a?o=!c&&!i:s&&(c?r.target.setAttribute("data-cssvars",""):i&&V(e.rootElement,!0),o=!0)}return o}(o)||function(e){var t=!1;if("childList"===e.type){var n=r(e.target),o="out"===e.target.getAttribute("data-cssvars");t=n&&!o}return t}(o)||function(e){var o=!1;return"childList"===e.type&&(o=[].slice.call(e.addedNodes).some((function(e){var o=1===e.nodeType&&e.hasAttribute("data-cssvars"),a=r(e)&&b.cssVars.test(e.textContent);return!o&&(n(e)||a)&&!t(e)}))),o}(o)||function(t){var n=!1;return"childList"===t.type&&(n=[].slice.call(t.removedNodes).some((function(t){var n=1===t.nodeType,r=n&&"out"===t.getAttribute("data-cssvars"),o=n&&"src"===t.getAttribute("data-cssvars"),a=o;if(o||r){var s=t.getAttribute("data-cssvars-group"),c=e.rootElement.querySelector('[data-cssvars-group="'.concat(s,'"]'));o&&V(e.rootElement,!0),c&&c.parentNode.removeChild(c)}return a}))),n}(o)}))&&k(e)}))).observe(document.documentElement,{attributes:!0,attributeFilter:["disabled","href"],childList:!0,subtree:!0}))}function O(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;clearTimeout(x),x=setTimeout((function(){e.__benchmark=null,k(e)}),t)}function _(e){var t=["animation-name","-moz-animation-name","-webkit-animation-name"].filter((function(e){return getComputedStyle(document.body)[e]}))[0];if(t){for(var n=e.getElementsByTagName("*"),r=[],o="__CSSVARSPONYFILL-KEYFRAMES__",a=0,s=n.length;a<s;a++){var c=n[a];"none"!==getComputedStyle(c)[t]&&(c.style[t]+=o,r.push(c))}document.body.offsetHeight;for(var i=0,u=r.length;i<u;i++){var l=r[i].style;l[t]=l[t].replace(o,"")}}}function M(e,t){return(e.replace(b.cssComments,"").match(b.cssUrls)||[]).forEach((function(n){var r=n.replace(b.cssUrls,"$1"),o=T(r,t);e=e.replace(n,n.replace(r,o))})),e}function j(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=/^-{2}/;return Object.keys(e).reduce((function(n,r){return n[t.test(r)?r:"--".concat(r.replace(/^-+/,""))]=e[r],n}),{})}function T(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:location.href,n=document.implementation.createHTMLDocument(""),r=n.createElement("base"),o=n.createElement("a");return n.head.appendChild(r),n.body.appendChild(o),r.href=t,o.href=e,o.href}function N(){return v&&(window.performance||{}).now?window.performance.now():(new Date).getTime()}function V(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=[].slice.call(e.querySelectorAll('[data-cssvars="skip"],[data-cssvars="src"]'));n.forEach((function(e){return e.setAttribute("data-cssvars","")})),t&&(w.dom={})}function q(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=3===e.childNodes[0].nodeType,o=e.querySelector("ul");if(r&&o){var a=Array.apply(null,e.children).some((function(e){return e.tabIndex>-1})).length;if(!a){var s=document.createElement("span");for(null!==n&&s.setAttribute("tabindex",n),e.insertBefore(s,o);e.childNodes[0]!==s;)s.appendChild(e.childNodes[0])}}}k.reset=function(){for(var e in y.job=0,y.group=0,E=!1,S&&(S.disconnect(),S=null),C=0,x=null,A=!1,w)w[e]={}};function R(e,t){return Number("0."+((window.Docsify||{}).version||"0").replace(/\./g,""))<Number("0."+e.replace(/\./g,""))?t:null}if(window){var D={onlyLegacy:!/Edge\/1[5678]/i.test(navigator.userAgent),silent:!0};k(D),document.body.setAttribute("data-platform",navigator.platform),window.$docsify=window.$docsify||{},window.$docsify.plugins=[].concat([function(e,t){e.init((function(){!1!==((window.$docsify||{}).themeable||{}).readyTransition&&(document.body.classList.add("ready-transition"),setTimeout((function(){document.body.classList.add("ready-spinner")}),1),e.ready((function(){var e=document.querySelector("main");e.addEventListener("transitionend",(function t(n){document.body.classList.remove("ready-transition"),document.body.classList.remove("ready-spinner"),e.removeEventListener("transitionend",t)}))})))}))},function(e,t){e.doneEach((function(){var e=document.querySelector(".cover h1 > a");e&&(e.parentNode.innerHTML=e.innerHTML)}))},function(e,t){e.doneEach((function(){var e=Array.apply(null,document.querySelectorAll("body > nav.app-nav > ul > li")),t=Array.apply(null,document.querySelectorAll(".sidebar > nav > ul > li"));e.forEach((function(e){var t="focus-within";q(e,"span",0),e.addEventListener("focusin",(function(n){e.contains(document.activeElement)&&e.classList.add(t)})),e.addEventListener("focusout",(function(n){e.contains(document.activeElement)||e.classList.remove(t)}))})),t.forEach((function(e){q(e,"span")}))}))},function(e,t){e.doneEach((function(){Array.apply(null,document.querySelectorAll("pre[data-lang]")).forEach((function(e){var t=e.querySelector("code"),n="language-".concat(e.getAttribute("data-lang"));e.classList.add(n),t.classList.add(n)}))}))},function(e,t){e.mounted((function(){var e=document.querySelector(".content"),t=setInterval((function(){e.textContent.length&&(document.body.classList.add("ready-fix"),clearInterval(t))}),250)})),e.ready((function(){document.body.classList.add("ready-fix")}))},function(e,t){e.init((function(){if(!1!==((window.$docsify||{}).themeable||{}).responsiveTables){var e=window.$docsify.markdown=window.$docsify.markdown||{},t=e.renderer=e.renderer||{};e.smartypants=e.smartypants||!0,t.table=t.table||function(e,t){var n='\n                    <div class="table-wrapper">\n                        <table>\n                            <thead>'.concat(e,"</thead>\n                            <tbody>").concat(t,"</tbody>\n                        </table>\n                    </div>");try{var r=document.createElement("div"),o=document.head.appendChild(document.createElement("style")).sheet,a="_"+Math.random().toString(36).substr(2,9);r.innerHTML=n;var s=r.querySelector("table");Array.apply(null,s.getElementsByTagName("th")).map((function(e){return e.innerHTML.replace("&nbsp;"," ")})).forEach((function(e,t){var n="#".concat(a," td:nth-child(").concat(t+1,')::before{content:"').concat(e,'";}');o.insertRule(n,o.cssRules.length)})),s.id=a,n=r.innerHTML}catch(e){console.log("Failed to render responsive table: "+e)}return n}}}))}],window.$docsify.plugins||[],[function(e,t){e.ready((function(){var e=document.querySelector(".sidebar .search .clear-button");if(e){var t=document.createElement("button");t.className="clear-button",t.setAttribute("aria-label","Clear search"),t.innerHTML='\n                <svg width="16" height="16" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\n                    <circle cx="8" cy="8" r="8" fill="black"></circle>\n                    <path stroke="white" stroke-width="1.5" d="M4.5,4.5,11.5,11.5" vector-effect="non-scaling-stroke"></path>\n                    <path stroke="white" stroke-width="1.5" d="M4.5,11.5,11.5,4.5" vector-effect="non-scaling-stroke"></path>\n                </svg>\n            ',e.parentNode.replaceChild(t,e)}}))},R("4.8.0",(function(e,t){e.ready((function(){var e=document.querySelector(".sidebar .search"),t=document.querySelector(".sidebar .search input[type=search]"),n=document.querySelector(".sidebar .search .clear-button");e&&e.addEventListener("click",(function(r){(r.target===n||n.contains(r.target))&&(e.classList.remove("show"),t.focus())})),t&&t.addEventListener("input",(function(n){t.value.length?e.classList.add("show"):e.classList.remove("show")}))}))})),R("4.8.0",(function(e,t){var n=Element.prototype.matches||Element.prototype.webkitMatchesSelector||Element.prototype.msMatchesSelector;e.doneEach((function(){var e="medium-zoom-image";Array.apply(null,document.querySelectorAll(".".concat(e))).forEach((function(t){var r=n.call(t,"a img"),o=n.call(t,".content img");if(r||!o){var a=t.cloneNode(!0);t.parentNode.replaceChild(a,t),a.classList.remove(e)}}))}))}))]).filter((function(e){return null!==e})),window.$docsify.search=window.$docsify.search||{},window.$docsify.search.hideOtherSidebarContent=!0,window.$docsify.themeable=window.$docsify.themeable||{},window.$docsify.themeable.version="0.8.6",window.$docsify.themeable.util={cssVars:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D;k(e)}}}}();
//# sourceMappingURL=docsify-themeable.min.js.map
