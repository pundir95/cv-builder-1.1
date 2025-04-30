"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "exclude", {
    enumerable: true,
    get: function() {
        return exclude;
    }
});
const exclude = (object, keys)=>{
    if (!object) return object;
    return Object.fromEntries(Object.entries(object).filter(([key])=>!keys.includes(key)));
};

//# sourceMappingURL=object.js.map