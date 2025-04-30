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
    defaultEducation: function() {
        return defaultEducation;
    },
    educationSchema: function() {
        return educationSchema;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _zod = require("zod");
const _shared = require("../shared");
const educationSchema = _shared.itemSchema.extend({
    institution: _zod.z.string().min(1),
    studyType: _zod.z.string(),
    area: _zod.z.string(),
    score: _zod.z.string(),
    date: _zod.z.string(),
    summary: _zod.z.string(),
    url: _shared.urlSchema
});
const defaultEducation = _extends._({}, _shared.defaultItem, {
    id: "",
    institution: "",
    studyType: "",
    area: "",
    score: "",
    date: "",
    summary: "",
    url: _shared.defaultUrl
});

//# sourceMappingURL=education.js.map