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
    defaultProject: function() {
        return defaultProject;
    },
    projectSchema: function() {
        return projectSchema;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _zod = require("zod");
const _shared = require("../shared");
const projectSchema = _shared.itemSchema.extend({
    name: _zod.z.string().min(1),
    description: _zod.z.string(),
    date: _zod.z.string(),
    summary: _zod.z.string(),
    keywords: _zod.z.array(_zod.z.string()).default([]),
    url: _shared.urlSchema
});
const defaultProject = _extends._({}, _shared.defaultItem, {
    name: "",
    description: "",
    date: "",
    summary: "",
    keywords: [],
    url: _shared.defaultUrl
});

//# sourceMappingURL=project.js.map