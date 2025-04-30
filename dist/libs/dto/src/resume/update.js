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
    UpdateResumeDto: function() {
        return UpdateResumeDto;
    },
    updateResumeSchema: function() {
        return updateResumeSchema;
    }
});
const _dto = require("nestjs-zod/dto");
const _resume = require("./resume");
const updateResumeSchema = _resume.resumeSchema.partial();
let UpdateResumeDto = class UpdateResumeDto extends (0, _dto.createZodDto)(updateResumeSchema) {
};

//# sourceMappingURL=update.js.map