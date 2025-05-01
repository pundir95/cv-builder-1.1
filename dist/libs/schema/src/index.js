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
    defaultResumeData: function() {
        return defaultResumeData;
    },
    resumeDataSchema: function() {
        return resumeDataSchema;
    }
});
const _export_star = require("@swc/helpers/_/_export_star");
const _zod = require("zod");
const _basics = _export_star._(require("./basics"), exports);
const _metadata = _export_star._(require("./metadata"), exports);
const _sections = _export_star._(require("./sections"), exports);
_export_star._(require("./sample"), exports);
_export_star._(require("./shared"), exports);
const resumeDataSchema = _zod.z.object({
    basics: _basics.basicsSchema,
    sections: _sections.sectionsSchema,
    metadata: _metadata.metadataSchema,
    id: _zod.z.number()
});
const defaultResumeData = {
    basics: _basics.defaultBasics,
    sections: _sections.defaultSections,
    metadata: _metadata.defaultMetadata,
    id: 0
};

//# sourceMappingURL=index.js.map