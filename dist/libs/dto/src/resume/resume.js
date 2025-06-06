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
    get ResumeDto () {
        return ResumeDto;
    },
    get resumeSchema () {
        return resumeSchema;
    }
});
const _schema = require("@reactive-resume/schema");
const _utils = require("@reactive-resume/utils");
const _dto = require("nestjs-zod/dto");
const _zod = require("zod");
const _user = require("../user");
const resumeSchema = _zod.z.object({
    id: _schema.idSchema,
    title: _zod.z.string(),
    slug: _zod.z.string(),
    cv_data: _zod.z.any(),
    cv_template: _zod.z.any(),
    data: _schema.resumeDataSchema.default(_schema.defaultResumeData),
    visibility: _zod.z.enum([
        "private",
        "public"
    ]).default("private"),
    locked: _zod.z.boolean().default(false),
    userId: _schema.idSchema,
    user: _user.userSchema.optional(),
    createdAt: _utils.dateSchema,
    updatedAt: _utils.dateSchema,
    created_at: _utils.dateSchema,
    updated_at: _utils.dateSchema
});
let ResumeDto = class ResumeDto extends (0, _dto.createZodDto)(resumeSchema) {
};

//# sourceMappingURL=resume.js.map