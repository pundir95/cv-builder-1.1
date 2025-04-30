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
    DeleteResumeDto: function() {
        return DeleteResumeDto;
    },
    deleteResumeSchema: function() {
        return deleteResumeSchema;
    }
});
const _schema = require("@reactive-resume/schema");
const _dto = require("nestjs-zod/dto");
const _zod = require("zod");
const deleteResumeSchema = _zod.z.object({
    id: _schema.idSchema
});
let DeleteResumeDto = class DeleteResumeDto extends (0, _dto.createZodDto)(deleteResumeSchema) {
};

//# sourceMappingURL=delete.js.map