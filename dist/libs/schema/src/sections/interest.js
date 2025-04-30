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
    defaultInterest: function() {
        return defaultInterest;
    },
    interestSchema: function() {
        return interestSchema;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _zod = require("zod");
const _shared = require("../shared");
const interestSchema = _shared.itemSchema.extend({
    name: _zod.z.string().min(1),
    keywords: _zod.z.array(_zod.z.string()).default([])
});
const defaultInterest = _extends._({}, _shared.defaultItem, {
    name: "",
    keywords: []
});

//# sourceMappingURL=interest.js.map