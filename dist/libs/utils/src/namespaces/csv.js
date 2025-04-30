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
    parseArrayLikeCSVEntry: function() {
        return parseArrayLikeCSVEntry;
    },
    parseCSV: function() {
        return parseCSV;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _papaparse = /*#__PURE__*/ _interop_require_default._(require("papaparse"));
const parseCSV = async (string)=>{
    return new Promise((resolve, reject)=>{
        _papaparse.default.parse(string, {
            header: true,
            skipEmptyLines: true,
            complete: (results)=>{
                resolve(results.data);
            },
            error: (error)=>{
                reject(error);
            }
        });
    });
};
const parseArrayLikeCSVEntry = (csvEntry)=>csvEntry.replace(/^\[/, "").replace(/$]/, "").split(",");

//# sourceMappingURL=csv.js.map