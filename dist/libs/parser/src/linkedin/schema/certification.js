"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "certificationSchema", {
    enumerable: true,
    get: function() {
        return certificationSchema;
    }
});
const _zod = require("zod");
const certificationSchema = _zod.z.object({
    Name: _zod.z.string(),
    Url: _zod.z.string().url(),
    Authority: _zod.z.string(),
    "Started On": _zod.z.string(),
    "Finished On": _zod.z.string().optional(),
    "License Number": _zod.z.string()
});

//# sourceMappingURL=certification.js.map