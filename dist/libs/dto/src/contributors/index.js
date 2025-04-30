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
    ContributorDto: function() {
        return ContributorDto;
    },
    contributorSchema: function() {
        return contributorSchema;
    }
});
const _dto = require("nestjs-zod/dto");
const _zod = require("zod");
const contributorSchema = _zod.z.object({
    id: _zod.z.number(),
    name: _zod.z.string(),
    url: _zod.z.string(),
    avatar: _zod.z.string()
});
let ContributorDto = class ContributorDto extends (0, _dto.createZodDto)(contributorSchema) {
};

//# sourceMappingURL=index.js.map