"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AuthResponseDto: function() {
        return AuthResponseDto;
    },
    authResponseSchema: function() {
        return authResponseSchema;
    }
});
const _dto = require("nestjs-zod/dto");
const _zod = require("zod");
const _user = require("../user");
const authResponseSchema = _zod.z.object({
    status: _zod.z.enum([
        "authenticated",
        "2fa_required"
    ]),
    data: _zod.z.object({
        access: _zod.z.string(),
        refresh: _zod.z.string(),
        user: _user.userSchema
    })
});
let AuthResponseDto = class AuthResponseDto extends (0, _dto.createZodDto)(authResponseSchema) {
};

//# sourceMappingURL=response.js.map