"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "idSchema", {
    enumerable: true,
    get: function() {
        return idSchema;
    }
});
const _cuid2 = require("@paralleldrive/cuid2");
const _zod = require("zod");
const idSchema = _zod.z.string().cuid2().default((0, _cuid2.createId)()).describe("Unique identifier for the item in Cuid2 format");

//# sourceMappingURL=id.js.map