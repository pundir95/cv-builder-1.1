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
    get UpdatePasswordDto () {
        return UpdatePasswordDto;
    },
    get updatePasswordSchema () {
        return updatePasswordSchema;
    }
});
const _dto = require("nestjs-zod/dto");
const _zod = require("zod");
const updatePasswordSchema = _zod.z.object({
    currentPassword: _zod.z.string().min(6),
    newPassword: _zod.z.string().min(6)
});
let UpdatePasswordDto = class UpdatePasswordDto extends (0, _dto.createZodDto)(updatePasswordSchema) {
};

//# sourceMappingURL=update-password.js.map