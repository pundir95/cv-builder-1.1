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
    customSchema: function() {
        return customSchema;
    },
    defaultSection: function() {
        return defaultSection;
    },
    defaultSections: function() {
        return defaultSections;
    },
    sectionSchema: function() {
        return sectionSchema;
    },
    sectionsSchema: function() {
        return sectionsSchema;
    }
});
const _export_star = require("@swc/helpers/_/_export_star");
const _extends = require("@swc/helpers/_/_extends");
const _zod = require("zod");
const _shared = require("../shared");
const _award = _export_star._(require("./award"), exports);
const _certification = _export_star._(require("./certification"), exports);
const _customsection = _export_star._(require("./custom-section"), exports);
const _education = _export_star._(require("./education"), exports);
const _experience = _export_star._(require("./experience"), exports);
const _interest = _export_star._(require("./interest"), exports);
const _language = _export_star._(require("./language"), exports);
const _profile = _export_star._(require("./profile"), exports);
const _project = _export_star._(require("./project"), exports);
const _publication = _export_star._(require("./publication"), exports);
const _reference = _export_star._(require("./reference"), exports);
const _skill = _export_star._(require("./skill"), exports);
const _volunteer = _export_star._(require("./volunteer"), exports);
const sectionSchema = _zod.z.object({
    name: _zod.z.string(),
    columns: _zod.z.number().min(1).max(5).default(1),
    separateLinks: _zod.z.boolean().default(true),
    visible: _zod.z.boolean().default(true)
});
const customSchema = sectionSchema.extend({
    id: _shared.idSchema,
    items: _zod.z.array(_customsection.customSectionSchema)
});
const sectionsSchema = _zod.z.object({
    collapse: sectionSchema.extend({
        id: _zod.z.literal("collapse"),
        items: _zod.z.array(_customsection.customSectionSchema),
        extraDescription: _zod.z.string().default("")
    }),
    summary: sectionSchema.extend({
        id: _zod.z.literal("summary"),
        content: _zod.z.string().default(""),
        extraDescription: _zod.z.string().default("")
    }),
    awards: sectionSchema.extend({
        id: _zod.z.literal("awards"),
        items: _zod.z.array(_award.awardSchema),
        extraDescription: _zod.z.string().default("")
    }),
    certifications: sectionSchema.extend({
        id: _zod.z.literal("certifications"),
        items: _zod.z.array(_certification.certificationSchema),
        extraDescription: _zod.z.string().default("")
    }),
    education: sectionSchema.extend({
        id: _zod.z.literal("education"),
        items: _zod.z.array(_education.educationSchema),
        extraDescription: _zod.z.string().default("")
    }),
    experience: sectionSchema.extend({
        id: _zod.z.literal("experience"),
        items: _zod.z.array(_experience.experienceSchema),
        extraDescription: _zod.z.string().default("")
    }),
    volunteer: sectionSchema.extend({
        id: _zod.z.literal("volunteer"),
        items: _zod.z.array(_volunteer.volunteerSchema),
        extraDescription: _zod.z.string().default("")
    }),
    interests: sectionSchema.extend({
        id: _zod.z.literal("interests"),
        items: _zod.z.array(_interest.interestSchema),
        extraDescription: _zod.z.string().default("")
    }),
    languages: sectionSchema.extend({
        id: _zod.z.literal("languages"),
        items: _zod.z.array(_language.languageSchema),
        extraDescription: _zod.z.string().default("")
    }),
    profiles: sectionSchema.extend({
        id: _zod.z.literal("profiles"),
        items: _zod.z.array(_profile.profileSchema),
        extraDescription: _zod.z.string().default("")
    }),
    projects: sectionSchema.extend({
        id: _zod.z.literal("projects"),
        items: _zod.z.array(_project.projectSchema),
        extraDescription: _zod.z.string().default("")
    }),
    publications: sectionSchema.extend({
        id: _zod.z.literal("publications"),
        items: _zod.z.array(_publication.publicationSchema),
        extraDescription: _zod.z.string().default("")
    }),
    references: sectionSchema.extend({
        id: _zod.z.literal("references"),
        items: _zod.z.array(_reference.referenceSchema),
        extraDescription: _zod.z.string().default("")
    }),
    skills: sectionSchema.extend({
        id: _zod.z.literal("skills"),
        items: _zod.z.array(_skill.skillSchema),
        extraDescription: _zod.z.string().default("")
    }),
    custom: _zod.z.record(_zod.z.string(), customSchema)
});
const defaultSection = {
    name: "",
    columns: 1,
    separateLinks: true,
    visible: true
};
const defaultSections = {
    collapse: _extends._({}, defaultSection, {
        id: "collapse",
        name: "Collapse",
        items: [],
        extraDescription: ""
    }),
    summary: _extends._({}, defaultSection, {
        id: "summary",
        name: "Summary",
        content: "",
        extraDescription: ""
    }),
    awards: _extends._({}, defaultSection, {
        id: "awards",
        name: "Awards",
        items: [],
        extraDescription: ""
    }),
    certifications: _extends._({}, defaultSection, {
        id: "certifications",
        name: "Certifications",
        items: [],
        extraDescription: ""
    }),
    education: _extends._({}, defaultSection, {
        id: "education",
        name: "Education",
        items: [],
        extraDescription: ""
    }),
    experience: _extends._({}, defaultSection, {
        id: "experience",
        name: "Experience",
        items: [],
        extraDescription: ""
    }),
    volunteer: _extends._({}, defaultSection, {
        id: "volunteer",
        name: "Volunteering",
        items: [],
        extraDescription: ""
    }),
    interests: _extends._({}, defaultSection, {
        id: "interests",
        name: "Interests",
        items: [],
        extraDescription: ""
    }),
    languages: _extends._({}, defaultSection, {
        id: "languages",
        name: "Languages",
        items: [],
        extraDescription: ""
    }),
    profiles: _extends._({}, defaultSection, {
        id: "profiles",
        name: "Profiles",
        items: [],
        extraDescription: ""
    }),
    projects: _extends._({}, defaultSection, {
        id: "projects",
        name: "Projects",
        items: [],
        extraDescription: ""
    }),
    publications: _extends._({}, defaultSection, {
        id: "publications",
        name: "Publications",
        items: [],
        extraDescription: ""
    }),
    references: _extends._({}, defaultSection, {
        id: "references",
        name: "References",
        items: [],
        extraDescription: ""
    }),
    skills: _extends._({}, defaultSection, {
        id: "skills",
        name: "Skills",
        items: [],
        extraDescription: ""
    }),
    custom: {}
};

//# sourceMappingURL=index.js.map