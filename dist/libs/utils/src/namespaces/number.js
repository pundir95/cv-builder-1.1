"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "linearTransform", {
    enumerable: true,
    get: function() {
        return linearTransform;
    }
});
const linearTransform = (value, inMin, inMax, outMin, outMax)=>{
    if (inMax === inMin) return value === inMax ? outMin : Number.NaN;
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
};

//# sourceMappingURL=number.js.map