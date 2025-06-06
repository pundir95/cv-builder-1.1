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
    get UserDto () {
        return UserDto;
    },
    get UserWithSecrets () {
        return UserWithSecrets;
    },
    get userSchema () {
        return userSchema;
    },
    get userWithSecretsSchema () {
        return userWithSecretsSchema;
    },
    get usernameSchema () {
        return usernameSchema;
    }
});
const _schema = require("@reactive-resume/schema");
const _utils = require("@reactive-resume/utils");
const _dto = require("nestjs-zod/dto");
const _zod = require("zod");
const _secrets = require("../secrets");
const usernameSchema = _zod.z.string().min(3).max(255).regex(/^[\w.-]+$/, {
    message: "Usernames can only contain letters, numbers, periods, hyphens, and underscores."
}).transform((value)=>value.toLowerCase());
const userSchema = _zod.z.object({
    id: _schema.idSchema,
    first_name: _zod.z.string().min(1).max(255),
    last_name: _zod.z.string().min(1).max(255),
    picture: _zod.z.literal("").or(_zod.z.null()).or(_zod.z.string().url()),
    phone_number: _zod.z.string().min(1).max(255),
    username: usernameSchema,
    email: _zod.z.string().email().transform((value)=>value.toLowerCase()),
    locale: _zod.z.string().default("en-US"),
    emailVerified: _zod.z.boolean().default(false),
    twoFactorEnabled: _zod.z.boolean().default(false),
    provider: _zod.z.enum([
        "email",
        "github",
        "google",
        "openid"
    ]).default("email"),
    createdAt: _utils.dateSchema,
    updatedAt: _utils.dateSchema,
    created_at: _utils.dateSchema,
    updated_at: _utils.dateSchema
});
let UserDto = class UserDto extends (0, _dto.createZodDto)(userSchema) {
};
const userWithSecretsSchema = userSchema.merge(_zod.z.object({
    secrets: _secrets.secretsSchema.nullable().default(null)
}));
let UserWithSecrets = class UserWithSecrets extends (0, _dto.createZodDto)(userWithSecretsSchema) {
};

//# sourceMappingURL=user.js.map