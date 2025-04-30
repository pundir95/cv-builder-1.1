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
    defaultUrl: function() {
        return defaultUrl;
    },
    urlSchema: function() {
        return urlSchema;
    }
});
const _zod = require("zod");
const urlSchema = _zod.z.object({
    label: _zod.z.string(),
    href: _zod.z.literal("").or(_zod.z.string().url())
});
const defaultUrl = {
    label: "",
    href: ""
};

//# sourceMappingURL=url.js.map