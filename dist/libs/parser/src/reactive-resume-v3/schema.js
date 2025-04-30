"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "reactiveResumeV3Schema", {
    enumerable: true,
    get: function() {
        return reactiveResumeV3Schema;
    }
});
const _zod = require("zod");
const dateSchema = _zod.z.object({
    start: _zod.z.string().optional(),
    end: _zod.z.string().optional()
}).optional();
const profileSchema = _zod.z.object({
    id: _zod.z.string().optional(),
    url: _zod.z.string().optional(),
    network: _zod.z.string().optional(),
    username: _zod.z.string().optional()
});
const basicsSchema = _zod.z.object({
    name: _zod.z.string().optional(),
    email: _zod.z.literal("").or(_zod.z.string().email()),
    phone: _zod.z.string().optional(),
    headline: _zod.z.string().optional(),
    summary: _zod.z.string().or(_zod.z.object({
        body: _zod.z.string().optional(),
        visible: _zod.z.boolean().default(true),
        heading: _zod.z.string().optional()
    })).optional(),
    birthdate: _zod.z.string().optional(),
    website: _zod.z.string().optional(),
    profiles: _zod.z.array(profileSchema).optional(),
    location: _zod.z.object({
        address: _zod.z.string().optional(),
        postalCode: _zod.z.string().optional(),
        city: _zod.z.string().optional(),
        country: _zod.z.string().optional(),
        region: _zod.z.string().optional()
    }),
    photo: _zod.z.object({
        visible: _zod.z.boolean(),
        url: _zod.z.string().optional(),
        filters: _zod.z.object({
            shape: _zod.z.string().nullable().optional(),
            size: _zod.z.coerce.number(),
            border: _zod.z.boolean(),
            grayscale: _zod.z.boolean()
        })
    })
});
const sectionSchema = _zod.z.object({
    id: _zod.z.string().optional(),
    name: _zod.z.string().optional(),
    type: _zod.z.enum([
        "basic",
        "work",
        "custom"
    ]),
    columns: _zod.z.coerce.number().or(_zod.z.null()).default(1),
    visible: _zod.z.boolean()
});
const workSchema = _zod.z.object({
    id: _zod.z.string().optional(),
    url: _zod.z.string().optional(),
    date: dateSchema,
    name: _zod.z.string().optional(),
    position: _zod.z.string().optional(),
    summary: _zod.z.string().nullable().optional()
}).nullable();
const awardSchema = _zod.z.object({
    id: _zod.z.string().optional(),
    url: _zod.z.string().optional(),
    date: _zod.z.string().optional(),
    title: _zod.z.string().optional(),
    awarder: _zod.z.string().optional(),
    summary: _zod.z.string().nullable().optional()
}).nullable();
const skillSchema = _zod.z.object({
    id: _zod.z.string().optional(),
    name: _zod.z.string().optional(),
    level: _zod.z.coerce.string().optional(),
    keywords: _zod.z.array(_zod.z.string().nullable()).optional(),
    levelNum: _zod.z.coerce.number()
}).nullable();
const projectSchema = _zod.z.object({
    id: _zod.z.string().optional(),
    url: _zod.z.string().optional(),
    date: dateSchema,
    name: _zod.z.string().optional(),
    summary: _zod.z.string().nullable().optional(),
    keywords: _zod.z.array(_zod.z.string().nullable()).optional(),
    description: _zod.z.string().optional()
}).nullable();
const educationSchema = _zod.z.object({
    id: _zod.z.string().optional(),
    url: _zod.z.string().optional(),
    area: _zod.z.string().optional(),
    date: dateSchema,
    score: _zod.z.string().optional(),
    degree: _zod.z.string().optional(),
    courses: _zod.z.array(_zod.z.string().nullable()).optional(),
    summary: _zod.z.string().nullable().optional(),
    institution: _zod.z.string().optional()
}).nullable();
const interestSchema = _zod.z.object({
    id: _zod.z.string().optional(),
    name: _zod.z.string().optional(),
    keywords: _zod.z.array(_zod.z.string().nullable()).optional()
}).nullable();
const languageSchema = _zod.z.object({
    id: _zod.z.string().optional(),
    name: _zod.z.string().optional(),
    level: _zod.z.string().optional(),
    levelNum: _zod.z.coerce.number()
}).nullable();
const volunteerSchema = _zod.z.object({
    id: _zod.z.string().optional(),
    organization: _zod.z.string().optional(),
    position: _zod.z.string().optional(),
    date: dateSchema,
    url: _zod.z.string().optional(),
    summary: _zod.z.string().nullable().optional()
}).nullable();
const referenceSchema = _zod.z.object({
    id: _zod.z.string().optional(),
    name: _zod.z.string().optional(),
    email: _zod.z.string().optional(),
    phone: _zod.z.string().optional(),
    summary: _zod.z.string().nullable().optional(),
    relationship: _zod.z.string().optional()
}).nullable();
const publicationSchema = _zod.z.object({
    id: _zod.z.string().optional(),
    url: _zod.z.string().optional(),
    date: _zod.z.string().optional(),
    name: _zod.z.string().optional(),
    publisher: _zod.z.string().optional(),
    summary: _zod.z.string().nullable().optional()
}).nullable();
const certificationSchema = _zod.z.object({
    id: _zod.z.string().optional(),
    url: _zod.z.string().optional(),
    date: _zod.z.string().optional(),
    name: _zod.z.string().optional(),
    issuer: _zod.z.string().optional(),
    summary: _zod.z.string().nullable().optional()
}).nullable();
const metadataSchema = _zod.z.object({
    css: _zod.z.object({
        value: _zod.z.string().optional(),
        visible: _zod.z.boolean()
    }).optional(),
    date: _zod.z.object({
        format: _zod.z.string().optional()
    }).optional(),
    theme: _zod.z.object({
        text: _zod.z.string().optional(),
        primary: _zod.z.string().optional(),
        background: _zod.z.string().optional()
    }).optional(),
    layout: _zod.z.array(_zod.z.array(_zod.z.array(_zod.z.string().nullable()))).optional(),
    locale: _zod.z.string().optional(),
    template: _zod.z.string().optional(),
    typography: _zod.z.object({
        size: _zod.z.object({
            body: _zod.z.coerce.number().optional(),
            heading: _zod.z.coerce.number().optional()
        }).optional(),
        family: _zod.z.object({
            body: _zod.z.string().optional(),
            heading: _zod.z.string().optional()
        }).optional()
    }).optional()
}).optional();
const reactiveResumeV3Schema = _zod.z.object({
    public: _zod.z.boolean(),
    basics: basicsSchema,
    sections: _zod.z.object({
        work: sectionSchema.extend({
            items: _zod.z.array(workSchema)
        }).optional(),
        awards: sectionSchema.extend({
            items: _zod.z.array(awardSchema)
        }).optional(),
        skills: sectionSchema.extend({
            items: _zod.z.array(skillSchema)
        }).optional(),
        projects: sectionSchema.extend({
            items: _zod.z.array(projectSchema)
        }).optional(),
        education: sectionSchema.extend({
            items: _zod.z.array(educationSchema)
        }).optional(),
        interests: sectionSchema.extend({
            items: _zod.z.array(interestSchema)
        }).optional(),
        languages: sectionSchema.extend({
            items: _zod.z.array(languageSchema)
        }).optional(),
        volunteer: sectionSchema.extend({
            items: _zod.z.array(volunteerSchema)
        }).optional(),
        references: sectionSchema.extend({
            items: _zod.z.array(referenceSchema)
        }).optional(),
        publications: sectionSchema.extend({
            items: _zod.z.array(publicationSchema)
        }).optional(),
        certifications: sectionSchema.extend({
            items: _zod.z.array(certificationSchema)
        }).optional()
    }),
    metadata: metadataSchema
});

//# sourceMappingURL=schema.js.map