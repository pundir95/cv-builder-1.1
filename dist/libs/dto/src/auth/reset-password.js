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
    ResetPasswordDto: function() {
        return ResetPasswordDto;
    },
    resetPasswordSchema: function() {
        return resetPasswordSchema;
    }
});
const _dto = require("nestjs-zod/dto");
const _zod = require("zod");
const resetPasswordSchema = _zod.z.object({
    token: _zod.z.string(),
    password: _zod.z.string().min(6)
});
let ResetPasswordDto = class ResetPasswordDto extends (0, _dto.createZodDto)(resetPasswordSchema) {
};

//# sourceMappingURL=reset-password.js.map