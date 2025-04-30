"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "languageSchema", {
    enumerable: true,
    get: function() {
        return languageSchema;
    }
});
const _zod = require("zod");
const languageSchema = _zod.z.object({
    Name: _zod.z.string(),
    Proficiency: _zod.z.string().optional()
});

//# sourceMappingURL=language.js.map