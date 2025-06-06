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
    get LoginDto () {
        return LoginDto;
    },
    get loginSchema () {
        return loginSchema;
    }
});
const _dto = require("nestjs-zod/dto");
const _zod = require("zod");
const _user = require("../user");
const loginSchema = _zod.z.object({
    email: _zod.z.string().transform((value)=>value.toLowerCase()),
    password: _zod.z.string()
}).refine((value)=>{
    return value.email.includes("@") ? _zod.z.string().email().parse(value.email) : _user.usernameSchema.parse(value.email);
}, {
    message: "InvalidCredentials"
});
let LoginDto = class LoginDto extends (0, _dto.createZodDto)(loginSchema) {
};

//# sourceMappingURL=login.js.map