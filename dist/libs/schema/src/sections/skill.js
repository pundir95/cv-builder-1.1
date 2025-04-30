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
    defaultSkill: function() {
        return defaultSkill;
    },
    skillSchema: function() {
        return skillSchema;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _zod = require("zod");
const _shared = require("../shared");
const skillSchema = _shared.itemSchema.extend({
    name: _zod.z.string(),
    description: _zod.z.string(),
    level: _zod.z.coerce.number().min(0).max(5).default(1),
    keywords: _zod.z.array(_zod.z.string()).default([])
});
const defaultSkill = _extends._({}, _shared.defaultItem, {
    name: "",
    description: "",
    level: 1,
    keywords: []
});

//# sourceMappingURL=skill.js.map