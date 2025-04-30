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
    GetTemplateListDto: function() {
        return GetTemplateListDto;
    },
    getTemplateListSchema: function() {
        return getTemplateListSchema;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _cuid2 = require("@paralleldrive/cuid2");
const _slugify = /*#__PURE__*/ _interop_require_default._(require("@sindresorhus/slugify"));
const _dto = require("nestjs-zod/dto");
const _zod = require("zod");
const getTemplateListSchema = _zod.z.object({
    title: _zod.z.string().min(1),
    slug: _zod.z.string().min(1).transform((value)=>{
        const slug = (0, _slugify.default)(value);
        if (!slug) return (0, _cuid2.createId)();
        return slug;
    }).optional(),
    visibility: _zod.z.enum([
        "public",
        "private"
    ]).default("private")
});
let GetTemplateListDto = class GetTemplateListDto extends (0, _dto.createZodDto)(getTemplateListSchema) {
};

//# sourceMappingURL=template.js.map