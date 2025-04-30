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
        items: _zod.z.array(_customsection.customSectionSchema)
    }),
    summary: sectionSchema.extend({
        id: _zod.z.literal("summary"),
        content: _zod.z.string().default("")
    }),
    awards: sectionSchema.extend({
        id: _zod.z.literal("awards"),
        items: _zod.z.array(_award.awardSchema)
    }),
    certifications: sectionSchema.extend({
        id: _zod.z.literal("certifications"),
        items: _zod.z.array(_certification.certificationSchema)
    }),
    education: sectionSchema.extend({
        id: _zod.z.literal("education"),
        items: _zod.z.array(_education.educationSchema)
    }),
    experience: sectionSchema.extend({
        id: _zod.z.literal("experience"),
        items: _zod.z.array(_experience.experienceSchema)
    }),
    volunteer: sectionSchema.extend({
        id: _zod.z.literal("volunteer"),
        items: _zod.z.array(_volunteer.volunteerSchema)
    }),
    interests: sectionSchema.extend({
        id: _zod.z.literal("interests"),
        items: _zod.z.array(_interest.interestSchema)
    }),
    languages: sectionSchema.extend({
        id: _zod.z.literal("languages"),
        items: _zod.z.array(_language.languageSchema)
    }),
    profiles: sectionSchema.extend({
        id: _zod.z.literal("profiles"),
        items: _zod.z.array(_profile.profileSchema)
    }),
    projects: sectionSchema.extend({
        id: _zod.z.literal("projects"),
        items: _zod.z.array(_project.projectSchema)
    }),
    publications: sectionSchema.extend({
        id: _zod.z.literal("publications"),
        items: _zod.z.array(_publication.publicationSchema)
    }),
    references: sectionSchema.extend({
        id: _zod.z.literal("references"),
        items: _zod.z.array(_reference.referenceSchema)
    }),
    skills: sectionSchema.extend({
        id: _zod.z.literal("skills"),
        items: _zod.z.array(_skill.skillSchema)
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
        items: []
    }),
    summary: _extends._({}, defaultSection, {
        id: "summary",
        name: "Summary",
        content: ""
    }),
    awards: _extends._({}, defaultSection, {
        id: "awards",
        name: "Awards",
        items: []
    }),
    certifications: _extends._({}, defaultSection, {
        id: "certifications",
        name: "Certifications",
        items: []
    }),
    education: _extends._({}, defaultSection, {
        id: "education",
        name: "Education",
        items: []
    }),
    experience: _extends._({}, defaultSection, {
        id: "experience",
        name: "Experience",
        items: []
    }),
    volunteer: _extends._({}, defaultSection, {
        id: "volunteer",
        name: "Volunteering",
        items: []
    }),
    interests: _extends._({}, defaultSection, {
        id: "interests",
        name: "Interests",
        items: []
    }),
    languages: _extends._({}, defaultSection, {
        id: "languages",
        name: "Languages",
        items: []
    }),
    profiles: _extends._({}, defaultSection, {
        id: "profiles",
        name: "Profiles",
        items: []
    }),
    projects: _extends._({}, defaultSection, {
        id: "projects",
        name: "Projects",
        items: []
    }),
    publications: _extends._({}, defaultSection, {
        id: "publications",
        name: "Publications",
        items: []
    }),
    references: _extends._({}, defaultSection, {
        id: "references",
        name: "References",
        items: []
    }),
    skills: _extends._({}, defaultSection, {
        id: "skills",
        name: "Skills",
        items: []
    }),
    custom: {}
};

//# sourceMappingURL=index.js.map