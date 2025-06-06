"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "emailSchema", {
    enumerable: true,
    get: function() {
        return emailSchema;
    }
});
const _zod = require("zod");
const emailSchema = _zod.z.object({
    "Email Address": _zod.z.string().email(),
    Confirmed: _zod.z.enum([
        "Yes",
        "No"
    ]),
    Primary: _zod.z.enum([
        "Yes",
        "No"
    ]),
    "Updated On": _zod.z.string()
});

//# sourceMappingURL=email.js.map