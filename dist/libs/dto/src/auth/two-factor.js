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
    BackupCodesDto: function() {
        return BackupCodesDto;
    },
    TwoFactorBackupDto: function() {
        return TwoFactorBackupDto;
    },
    TwoFactorDto: function() {
        return TwoFactorDto;
    },
    backupCodesSchema: function() {
        return backupCodesSchema;
    },
    twoFactorBackupSchema: function() {
        return twoFactorBackupSchema;
    },
    twoFactorSchema: function() {
        return twoFactorSchema;
    }
});
const _dto = require("nestjs-zod/dto");
const _zod = require("zod");
const twoFactorSchema = _zod.z.object({
    otp: _zod.z.string().length(6, {
        message: "Code must be a 6 digit number"
    }).regex(/^\d+$/, {
        message: "Code must be a 6 digit number"
    })
});
let TwoFactorDto = class TwoFactorDto extends (0, _dto.createZodDto)(twoFactorSchema) {
};
const backupCodesSchema = _zod.z.object({
    backupCodes: _zod.z.array(_zod.z.string().length(10))
});
let BackupCodesDto = class BackupCodesDto extends (0, _dto.createZodDto)(backupCodesSchema) {
};
const twoFactorBackupSchema = _zod.z.object({
    code: _zod.z.string().length(10)
});
let TwoFactorBackupDto = class TwoFactorBackupDto extends (0, _dto.createZodDto)(twoFactorBackupSchema) {
};

//# sourceMappingURL=two-factor.js.map