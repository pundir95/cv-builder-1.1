"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "projectSchema", {
    enumerable: true,
    get: function() {
        return projectSchema;
    }
});
const _zod = require("zod");
const projectSchema = _zod.z.object({
    Title: _zod.z.string(),
    Description: _zod.z.string(),
    Url: _zod.z.literal("").or(_zod.z.string().url()).optional(),
    "Started On": _zod.z.string(),
    "Finished On": _zod.z.string().optional()
});

//# sourceMappingURL=project.js.map