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
    MessageDto: function() {
        return MessageDto;
    },
    messageSchema: function() {
        return messageSchema;
    }
});
const _dto = require("nestjs-zod/dto");
const _zod = require("zod");
const messageSchema = _zod.z.object({
    message: _zod.z.string()
});
let MessageDto = class MessageDto extends (0, _dto.createZodDto)(messageSchema) {
};

//# sourceMappingURL=message.js.map