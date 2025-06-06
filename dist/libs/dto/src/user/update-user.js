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
    get UpdateUserDto () {
        return UpdateUserDto;
    },
    get updateUserSchema () {
        return updateUserSchema;
    }
});
const _dto = require("nestjs-zod/dto");
const _user = require("./user");
const updateUserSchema = _user.userSchema.partial().pick({
    locale: true,
    username: true,
    email: true,
    picture: true
});
let UpdateUserDto = class UpdateUserDto extends (0, _dto.createZodDto)(updateUserSchema) {
};

//# sourceMappingURL=update-user.js.map