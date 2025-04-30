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
    defaultVolunteer: function() {
        return defaultVolunteer;
    },
    volunteerSchema: function() {
        return volunteerSchema;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _zod = require("zod");
const _shared = require("../shared");
const volunteerSchema = _shared.itemSchema.extend({
    organization: _zod.z.string().min(1),
    position: _zod.z.string(),
    location: _zod.z.string(),
    date: _zod.z.string(),
    summary: _zod.z.string(),
    url: _shared.urlSchema
});
const defaultVolunteer = _extends._({}, _shared.defaultItem, {
    organization: "",
    position: "",
    location: "",
    date: "",
    summary: "",
    url: _shared.defaultUrl
});

//# sourceMappingURL=volunteer.js.map