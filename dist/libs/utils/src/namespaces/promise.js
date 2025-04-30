"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "delay", {
    enumerable: true,
    get: function() {
        return delay;
    }
});
const delay = (time)=>new Promise((resolve)=>setTimeout(resolve, time));

//# sourceMappingURL=promise.js.map