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
    UrlDto: function() {
        return UrlDto;
    },
    urlSchema: function() {
        return urlSchema;
    }
});
const _dto = require("nestjs-zod/dto");
const _zod = require("zod");
const urlSchema = _zod.z.object({
    url: _zod.z.string().url()
});
let UrlDto = class UrlDto extends (0, _dto.createZodDto)(urlSchema) {
};

//# sourceMappingURL=url.js.map