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
    defaultExperience: function() {
        return defaultExperience;
    },
    experienceSchema: function() {
        return experienceSchema;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _zod = require("zod");
const _shared = require("../shared");
const experienceSchema = _shared.itemSchema.extend({
    company: _zod.z.string().min(1),
    position: _zod.z.string(),
    location: _zod.z.string(),
    date: _zod.z.string(),
    summary: _zod.z.string(),
    url: _shared.urlSchema
});
const defaultExperience = _extends._({}, _shared.defaultItem, {
    company: "",
    position: "",
    location: "",
    date: "",
    summary: "",
    url: _shared.defaultUrl
});

//# sourceMappingURL=experience.js.map