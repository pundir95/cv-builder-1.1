"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "profileSchema", {
    enumerable: true,
    get: function() {
        return profileSchema;
    }
});
const _zod = require("zod");
const profileSchema = _zod.z.object({
    "First Name": _zod.z.string().default("John"),
    "Last Name": _zod.z.string().default("Doe"),
    "Maiden Name": _zod.z.string().optional(),
    Address: _zod.z.string().default("123 Example Street, Somewhere, USA"),
    "Birth Date": _zod.z.string().default("January 1st, 1970"),
    Headline: _zod.z.string().default(""),
    Summary: _zod.z.string().default(""),
    Industry: _zod.z.string().default(""),
    "Zip Code": _zod.z.string().optional(),
    "Geo Location": _zod.z.string().default("Somewhere"),
    "Twitter Handles": _zod.z.string().default("@test"),
    Websites: _zod.z.string().default("https://www.example.com"),
    "Instant Messengers": _zod.z.string().optional()
});

//# sourceMappingURL=profile.js.map