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
    UpdateUserDto: function() {
        return UpdateUserDto;
    },
    updateUserSchema: function() {
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