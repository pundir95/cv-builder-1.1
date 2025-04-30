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
    defaultProfile: function() {
        return defaultProfile;
    },
    profileSchema: function() {
        return profileSchema;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _zod = require("zod");
const _shared = require("../shared");
const profileSchema = _shared.itemSchema.extend({
    network: _zod.z.string().min(1),
    username: _zod.z.string().min(1),
    icon: _zod.z.string().describe('Slug for the icon from https://simpleicons.org. For example, "github", "linkedin", etc.'),
    url: _shared.urlSchema
});
const defaultProfile = _extends._({}, _shared.defaultItem, {
    network: "",
    username: "",
    icon: "",
    url: _shared.defaultUrl
});

//# sourceMappingURL=profile.js.map