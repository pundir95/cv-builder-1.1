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
    awardSchema: function() {
        return awardSchema;
    },
    defaultAward: function() {
        return defaultAward;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _zod = require("zod");
const _shared = require("../shared");
const awardSchema = _shared.itemSchema.extend({
    title: _zod.z.string().min(1),
    awarder: _zod.z.string(),
    date: _zod.z.string(),
    summary: _zod.z.string(),
    url: _shared.urlSchema
});
const defaultAward = _extends._({}, _shared.defaultItem, {
    title: "",
    awarder: "",
    date: "",
    summary: "",
    url: _shared.defaultUrl
});

//# sourceMappingURL=award.js.map