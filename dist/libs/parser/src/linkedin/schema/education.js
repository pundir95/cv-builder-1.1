"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "educationSchema", {
    enumerable: true,
    get: function() {
        return educationSchema;
    }
});
const _zod = require("zod");
const educationSchema = _zod.z.object({
    "School Name": _zod.z.string(),
    "Start Date": _zod.z.string(),
    "End Date": _zod.z.string().optional(),
    Notes: _zod.z.string().optional(),
    "Degree Name": _zod.z.string(),
    Activities: _zod.z.string()
});

//# sourceMappingURL=education.js.map