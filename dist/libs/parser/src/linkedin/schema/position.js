"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "positionSchema", {
    enumerable: true,
    get: function() {
        return positionSchema;
    }
});
const _zod = require("zod");
const positionSchema = _zod.z.object({
    "Company Name": _zod.z.string(),
    Title: _zod.z.string(),
    Description: _zod.z.string().optional(),
    Location: _zod.z.string(),
    "Started On": _zod.z.string(),
    "Finished On": _zod.z.string().optional()
});

//# sourceMappingURL=position.js.map