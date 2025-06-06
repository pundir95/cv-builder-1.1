"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "secretsSchema", {
    enumerable: true,
    get: function() {
        return secretsSchema;
    }
});
const _schema = require("@reactive-resume/schema");
const _zod = require("zod");
const secretsSchema = _zod.z.object({
    id: _schema.idSchema,
    password: _zod.z.string().nullable(),
    lastSignedIn: _zod.z.date().nullable(),
    verificationToken: _zod.z.string().nullable(),
    twoFactorSecret: _zod.z.string().nullable(),
    twoFactorBackupCodes: _zod.z.array(_zod.z.string()).default([]),
    refreshToken: _zod.z.string().nullable(),
    resetToken: _zod.z.string().nullable(),
    userId: _schema.idSchema
});

//# sourceMappingURL=secrets.js.map