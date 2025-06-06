"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthProvidersDto", {
    enumerable: true,
    get: function() {
        return AuthProvidersDto;
    }
});
const _dto = require("nestjs-zod/dto");
const _zod = require("zod");
const authProvidersSchema = _zod.z.array(_zod.z.enum([
    "email",
    "github",
    "google",
    "openid"
]));
let AuthProvidersDto = class AuthProvidersDto extends (0, _dto.createZodDto)(authProvidersSchema) {
};

//# sourceMappingURL=providers.js.map