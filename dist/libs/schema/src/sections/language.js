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
    defaultLanguage: function() {
        return defaultLanguage;
    },
    languageSchema: function() {
        return languageSchema;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _zod = require("zod");
const _shared = require("../shared");
const languageSchema = _shared.itemSchema.extend({
    name: _zod.z.string().min(1),
    description: _zod.z.string(),
    level: _zod.z.coerce.number().min(0).max(5).default(1)
});
const defaultLanguage = _extends._({}, _shared.defaultItem, {
    name: "",
    description: "",
    level: 1
});

//# sourceMappingURL=language.js.map