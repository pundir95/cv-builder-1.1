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
    defaultPublication: function() {
        return defaultPublication;
    },
    publicationSchema: function() {
        return publicationSchema;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _zod = require("zod");
const _shared = require("../shared");
const publicationSchema = _shared.itemSchema.extend({
    name: _zod.z.string().min(1),
    publisher: _zod.z.string(),
    date: _zod.z.string(),
    summary: _zod.z.string(),
    url: _shared.urlSchema
});
const defaultPublication = _extends._({}, _shared.defaultItem, {
    name: "",
    publisher: "",
    date: "",
    summary: "",
    url: _shared.defaultUrl
});

//# sourceMappingURL=publication.js.map