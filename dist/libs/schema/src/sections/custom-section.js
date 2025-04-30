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
    customSectionSchema: function() {
        return customSectionSchema;
    },
    defaultCustomSection: function() {
        return defaultCustomSection;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _zod = require("zod");
const _shared = require("../shared");
const customSectionSchema = _shared.itemSchema.extend({
    name: _zod.z.string(),
    description: _zod.z.string(),
    date: _zod.z.string(),
    location: _zod.z.string(),
    summary: _zod.z.string(),
    keywords: _zod.z.array(_zod.z.string()).default([]),
    url: _shared.urlSchema
});
const defaultCustomSection = _extends._({}, _shared.defaultItem, {
    name: "",
    description: "",
    date: "",
    location: "",
    summary: "",
    keywords: [],
    url: _shared.defaultUrl
});

//# sourceMappingURL=custom-section.js.map