"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "hexToRgb", {
    enumerable: true,
    get: function() {
        return hexToRgb;
    }
});
const hexToRgb = (hex, alpha = 0)=>{
    const r = Number.parseInt(hex.slice(1, 3), 16), g = Number.parseInt(hex.slice(3, 5), 16), b = Number.parseInt(hex.slice(5, 7), 16);
    return alpha ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
};

//# sourceMappingURL=color.js.map