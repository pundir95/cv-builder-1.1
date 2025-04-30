"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    breakpoints: function() {
        return breakpoints;
    },
    cn: function() {
        return cn;
    }
});
const _clsx = require("clsx");
const _tailwindmerge = require("tailwind-merge");
const breakpoints = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1400
};
const cn = (...inputs)=>(0, _tailwindmerge.twMerge)((0, _clsx.clsx)(inputs));

//# sourceMappingURL=style.js.map