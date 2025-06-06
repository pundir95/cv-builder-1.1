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
    get StatisticsDto () {
        return StatisticsDto;
    },
    get statisticsSchema () {
        return statisticsSchema;
    }
});
const _dto = require("nestjs-zod/dto");
const _zod = require("zod");
const statisticsSchema = _zod.z.object({
    views: _zod.z.number().int().default(0),
    downloads: _zod.z.number().int().default(0)
});
let StatisticsDto = class StatisticsDto extends (0, _dto.createZodDto)(statisticsSchema) {
};

//# sourceMappingURL=index.js.map