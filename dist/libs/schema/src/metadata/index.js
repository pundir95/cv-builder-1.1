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
    defaultLayout: function() {
        return defaultLayout;
    },
    defaultMetadata: function() {
        return defaultMetadata;
    },
    metadataSchema: function() {
        return metadataSchema;
    }
});
const _zod = require("zod");
const defaultLayout = [
    [
        [
            "profiles",
            "summary",
            "experience",
            "education",
            "projects",
            "volunteer",
            "references"
        ],
        [
            "skills",
            "interests",
            "certifications",
            "awards",
            "publications",
            "languages"
        ]
    ]
];
const metadataSchema = _zod.z.object({
    template: _zod.z.object({
        name: _zod.z.string().default("cv_template_2"),
        id: _zod.z.number().default(2),
        withPhoto: _zod.z.boolean().default(false),
        withoutPhoto: _zod.z.boolean().default(true),
        oneColumn: _zod.z.boolean().default(true),
        twoColumn: _zod.z.boolean().default(false),
        progress: _zod.z.number().default(0)
    }),
    layout: _zod.z.array(_zod.z.array(_zod.z.array(_zod.z.string()))).default(defaultLayout),
    css: _zod.z.object({
        value: _zod.z.string().default("* {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}"),
        visible: _zod.z.boolean().default(false)
    }),
    page: _zod.z.object({
        margin: _zod.z.number().default(18),
        format: _zod.z.enum([
            "a4",
            "letter"
        ]).default("a4"),
        options: _zod.z.object({
            breakLine: _zod.z.boolean().default(true),
            pageNumbers: _zod.z.boolean().default(true)
        })
    }),
    theme: _zod.z.object({
        background: _zod.z.string().default("#ffffff"),
        text: _zod.z.string().default("#000000"),
        primary: _zod.z.string().default("#dc2626")
    }),
    typography: _zod.z.object({
        font: _zod.z.object({
            family: _zod.z.string().default("IBM Plex Serif"),
            subset: _zod.z.string().default("latin"),
            variants: _zod.z.array(_zod.z.string()).default([
                "regular"
            ]),
            size: _zod.z.number().default(14)
        }),
        lineHeight: _zod.z.number().default(1.5),
        hideIcons: _zod.z.boolean().default(false),
        underlineLinks: _zod.z.boolean().default(true)
    }),
    notes: _zod.z.string().default("")
});
const defaultMetadata = {
    template: {
        name: "cv_template_2",
        id: 2,
        withPhoto: false,
        withoutPhoto: true,
        oneColumn: true,
        twoColumn: false,
        progress: 0
    },
    layout: defaultLayout,
    css: {
        value: "* {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
        visible: false
    },
    page: {
        margin: 18,
        format: "a4",
        options: {
            breakLine: true,
            pageNumbers: true
        }
    },
    theme: {
        background: "#ffffff",
        text: "#000000",
        primary: "#dc2626"
    },
    typography: {
        font: {
            family: "IBM Plex Serif",
            subset: "latin",
            variants: [
                "regular",
                "italic",
                "600"
            ],
            size: 14
        },
        lineHeight: 1.5,
        hideIcons: false,
        underlineLinks: true
    },
    notes: ""
};

//# sourceMappingURL=index.js.map