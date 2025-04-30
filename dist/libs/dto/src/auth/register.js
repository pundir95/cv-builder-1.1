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
    RegisterDto: function() {
        return RegisterDto;
    },
    registerSchema: function() {
        return registerSchema;
    }
});
const _dto = require("nestjs-zod/dto");
const _zod = require("zod");
const _user = require("../user");
const registerSchema = _user.userSchema.pick({
    first_name: true,
    last_name: true,
    email: true,
    phone_number: true,
    locale: true
}).extend({
    password: _zod.z.string().min(6),
    confirm_password: _zod.z.string().min(6)
});
let RegisterDto = class RegisterDto extends (0, _dto.createZodDto)(registerSchema) {
};

//# sourceMappingURL=register.js.map