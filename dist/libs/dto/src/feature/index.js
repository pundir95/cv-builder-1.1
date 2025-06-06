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
    get FeatureDto () {
        return FeatureDto;
    },
    get featureSchema () {
        return featureSchema;
    }
});
const _dto = require("nestjs-zod/dto");
const _zod = require("zod");
const featureSchema = _zod.z.object({
    isSignupsDisabled: _zod.z.boolean().default(false),
    isEmailAuthDisabled: _zod.z.boolean().default(false)
});
let FeatureDto = class FeatureDto extends (0, _dto.createZodDto)(featureSchema) {
};

//# sourceMappingURL=index.js.map