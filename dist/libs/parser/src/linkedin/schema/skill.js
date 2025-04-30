"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "skillSchema", {
    enumerable: true,
    get: function() {
        return skillSchema;
    }
});
const _zod = require("zod");
const skillSchema = _zod.z.object({
    Name: _zod.z.string()
});

//# sourceMappingURL=skill.js.map