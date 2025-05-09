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
    basicsSchema: function() {
        return basicsSchema;
    },
    defaultBasics: function() {
        return defaultBasics;
    }
});
const _export_star = require("@swc/helpers/_/_export_star");
const _zod = require("zod");
const _shared = require("../shared");
const _custom = _export_star._(require("./custom"), exports);
const basicsSchema = _zod.z.object({
    name: _zod.z.string(),
    profession: _zod.z.string(),
    headline: _zod.z.string(),
    email: _zod.z.literal("").or(_zod.z.string().email()),
    phone: _zod.z.string(),
    location: _zod.z.string(),
    url: _shared.urlSchema,
    customFields: _zod.z.array(_custom.customFieldSchema),
    picture: _zod.z.object({
        url: _zod.z.string(),
        size: _zod.z.number().default(64),
        aspectRatio: _zod.z.number().default(1),
        borderRadius: _zod.z.number().default(0),
        effects: _zod.z.object({
            hidden: _zod.z.boolean().default(false),
            border: _zod.z.boolean().default(false),
            grayscale: _zod.z.boolean().default(false)
        })
    })
});
const defaultBasics = {
    name: "",
    profession: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
    url: _shared.defaultUrl,
    customFields: [],
    picture: {
        url: "",
        size: 64,
        aspectRatio: 1,
        borderRadius: 0,
        effects: {
            hidden: false,
            border: false,
            grayscale: false
        }
    }
};

//# sourceMappingURL=index.js.map