"use strict";var __importDefault=this&&this.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.BooruError=exports.resolveSite=exports.sites=exports.BooruClass=exports.commonfy=exports.search=exports.forSite=void 0;const Constants_1=require("./Constants"),util_1=require("util"),Booru_1=__importDefault(require("./boorus/Booru")),Derpibooru_1=__importDefault(require("./boorus/Derpibooru")),XmlBooru_1=__importDefault(require("./boorus/XmlBooru")),Site_1=__importDefault(require("./structures/Site")),Utils_1=require("./Utils"),BooruTypes={derpi:Derpibooru_1.default,xml:XmlBooru_1.default},booruCache={};function booruFrom(r,e){return new(void 0!==r.type&&BooruTypes[r.type]?BooruTypes[r.type]:Booru_1.default)(r,e)}function booruForSite(r,e=null){const o=(0,Utils_1.resolveSite)(r);if(!o)throw new Constants_1.BooruError("Site not supported");return booruFrom(new Site_1.default(Constants_1.sites[o]),e)}function search(r,e=[],{limit:o=1,random:t=!1,page:s=0,credentials:u}={}){const n=(0,Utils_1.resolveSite)(r);if("string"==typeof o&&(o=parseInt(o,10)),null===n)throw new Constants_1.BooruError("Site not supported");if(!Array.isArray(e)&&"string"!=typeof e)throw new Constants_1.BooruError("`tags` should be an array or string");if("number"!=typeof o||Number.isNaN(o))throw new Constants_1.BooruError("`limit` should be an int");const i=new Site_1.default(Constants_1.sites[n]);return booruCache[n]||(booruCache[n]=booruFrom(i)),booruCache[n].search(e,{limit:o,random:t,page:s,credentials:u})}exports.forSite=booruForSite,exports.default=booruForSite,exports.search=search;const deprecatedCommonfy=(0,util_1.deprecate)((()=>{}),"Common is now deprecated, just access the properties directly");function commonfy(r){return deprecatedCommonfy(),Promise.resolve(r)}exports.commonfy=commonfy;var Booru_2=require("./boorus/Booru");Object.defineProperty(exports,"BooruClass",{enumerable:!0,get:function(){return Booru_2.Booru}});var Constants_2=require("./Constants");Object.defineProperty(exports,"sites",{enumerable:!0,get:function(){return Constants_2.sites}});var Utils_2=require("./Utils");Object.defineProperty(exports,"resolveSite",{enumerable:!0,get:function(){return Utils_2.resolveSite}});var Constants_3=require("./Constants");Object.defineProperty(exports,"BooruError",{enumerable:!0,get:function(){return Constants_3.BooruError}});