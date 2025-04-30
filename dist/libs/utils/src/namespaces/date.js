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
    dateSchema: function() {
        return dateSchema;
    },
    deepSearchAndParseDates: function() {
        return deepSearchAndParseDates;
    },
    sortByDate: function() {
        return sortByDate;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _dayjs = /*#__PURE__*/ _interop_require_default._(require("dayjs"));
const _zod = require("zod");
const dateSchema = _zod.z.union([
    _zod.z.date(),
    _zod.z.string().datetime()
]).transform((value)=>{
    if (typeof value === "string") return (0, _dayjs.default)(value).toDate();
    return value;
});
const sortByDate = (a, b, key, desc = true)=>{
    if (!a[key] || !b[key]) return 0;
    if (!(a[key] instanceof Date) || !(b[key] instanceof Date)) return 0;
    if ((0, _dayjs.default)(a[key]).isSame((0, _dayjs.default)(b[key]))) return 0;
    if (desc) return (0, _dayjs.default)(a[key]).isBefore((0, _dayjs.default)(b[key])) ? 1 : -1;
    else return (0, _dayjs.default)(a[key]).isBefore((0, _dayjs.default)(b[key])) ? -1 : 1;
};
const deepSearchAndParseDates = (obj, dateKeys)=>{
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }
    const keys = Object.keys(obj);
    if (keys.length === 0) {
        return obj;
    }
    for (const key of keys){
        let value = obj[key];
        if (dateKeys.includes(key) && typeof value === "string") {
            const parsedDate = new Date(value);
            if (!Number.isNaN(parsedDate.getTime())) {
                value = parsedDate;
            }
        }
        obj[key] = deepSearchAndParseDates(value, dateKeys);
    }
    return obj;
};

//# sourceMappingURL=date.js.map