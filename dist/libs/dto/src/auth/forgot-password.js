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
    get ForgotPasswordDto () {
        return ForgotPasswordDto;
    },
    get forgotPasswordSchema () {
        return forgotPasswordSchema;
    }
});
const _dto = require("nestjs-zod/dto");
const _zod = require("zod");
const forgotPasswordSchema = _zod.z.object({
    email: _zod.z.string().email()
});
let ForgotPasswordDto = class ForgotPasswordDto extends (0, _dto.createZodDto)(forgotPasswordSchema) {
};

//# sourceMappingURL=forgot-password.js.map