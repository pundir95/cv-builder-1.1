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
    certificationSchema: function() {
        return certificationSchema;
    },
    defaultCertification: function() {
        return defaultCertification;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _zod = require("zod");
const _shared = require("../shared");
const certificationSchema = _shared.itemSchema.extend({
    name: _zod.z.string().min(1),
    issuer: _zod.z.string(),
    date: _zod.z.string(),
    summary: _zod.z.string(),
    url: _shared.urlSchema
});
const defaultCertification = _extends._({}, _shared.defaultItem, {
    name: "",
    issuer: "",
    date: "",
    summary: "",
    url: _shared.defaultUrl
});

//# sourceMappingURL=certification.js.map