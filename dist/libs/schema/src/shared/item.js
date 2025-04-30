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
    defaultItem: function() {
        return defaultItem;
    },
    itemSchema: function() {
        return itemSchema;
    }
});
const _zod = require("zod");
const _id = require("./id");
const itemSchema = _zod.z.object({
    id: _id.idSchema,
    visible: _zod.z.boolean()
});
const defaultItem = {
    id: "",
    visible: true
};

//# sourceMappingURL=item.js.map