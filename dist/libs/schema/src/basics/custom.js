"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "customFieldSchema", {
    enumerable: true,
    get: function() {
        return customFieldSchema;
    }
});
const _zod = require("zod");
const customFieldSchema = _zod.z.object({
    id: _zod.z.string().cuid2(),
    icon: _zod.z.string(),
    name: _zod.z.string(),
    value: _zod.z.string()
});

//# sourceMappingURL=custom.js.map