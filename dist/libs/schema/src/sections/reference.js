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
    defaultReference: function() {
        return defaultReference;
    },
    referenceSchema: function() {
        return referenceSchema;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _zod = require("zod");
const _shared = require("../shared");
const referenceSchema = _shared.itemSchema.extend({
    name: _zod.z.string().min(1),
    description: _zod.z.string(),
    summary: _zod.z.string(),
    url: _shared.urlSchema
});
const defaultReference = _extends._({}, _shared.defaultItem, {
    name: "",
    description: "",
    summary: "",
    url: _shared.defaultUrl
});

//# sourceMappingURL=reference.js.map