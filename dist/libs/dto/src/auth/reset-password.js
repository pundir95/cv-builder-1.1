"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get ResetPasswordDto () {
        return ResetPasswordDto;
    },
    get resetPasswordSchema () {
        return resetPasswordSchema;
    }
});
const _dto = require("nestjs-zod/dto");
const _zod = require("zod");
const resetPasswordSchema = _zod.z.object({
    password: _zod.z.string().min(6),
    confirm_password: _zod.z.string().min(6),
    email: _zod.z.string()
});
let ResetPasswordDto = class ResetPasswordDto extends (0, _dto.createZodDto)(resetPasswordSchema) {
};

//# sourceMappingURL=reset-password.js.map