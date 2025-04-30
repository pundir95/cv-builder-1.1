"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "jsonResumeSchema", {
    enumerable: true,
    get: function() {
        return jsonResumeSchema;
    }
});
const _zod = require("zod");
const urlSchema = _zod.z.literal("").or(_zod.z.string().url()).optional();
const iso8601 = _zod.z.string().regex(/^([12]\d{3}-[01]\d-[0-3]\d|[12]\d{3}-[01]\d|[12]\d{3})$/, "ISO8601 Date Format");
const locationSchema = _zod.z.object({
    address: _zod.z.string().optional(),
    postalCode: _zod.z.string().optional(),
    city: _zod.z.string().optional(),
    countryCode: _zod.z.string().optional(),
    region: _zod.z.string().optional()
});
const profileSchema = _zod.z.object({
    network: _zod.z.string().optional(),
    username: _zod.z.string().optional(),
    url: urlSchema
});
const basicsSchema = _zod.z.object({
    name: _zod.z.string().optional(),
    label: _zod.z.string().optional(),
    image: _zod.z.literal("").or(_zod.z.string().url()).optional(),
    email: _zod.z.literal("").or(_zod.z.string().email()).optional(),
    phone: _zod.z.string().optional(),
    url: urlSchema,
    summary: _zod.z.string().optional(),
    location: locationSchema.optional(),
    profiles: _zod.z.array(profileSchema).optional()
});
const workSchema = _zod.z.object({
    name: _zod.z.string().optional(),
    position: _zod.z.string().optional(),
    url: urlSchema,
    startDate: iso8601.optional(),
    endDate: iso8601.optional(),
    summary: _zod.z.string().optional(),
    highlights: _zod.z.array(_zod.z.string()).optional()
});
const volunteerSchema = _zod.z.object({
    organization: _zod.z.string().optional(),
    position: _zod.z.string().optional(),
    url: urlSchema,
    startDate: iso8601.optional(),
    endDate: iso8601.optional(),
    summary: _zod.z.string().optional(),
    highlights: _zod.z.array(_zod.z.string()).optional()
});
const awardsSchema = _zod.z.object({
    title: _zod.z.string().optional(),
    date: iso8601.optional(),
    awarder: _zod.z.string().optional(),
    summary: _zod.z.string().optional()
});
const certificatesSchema = _zod.z.object({
    name: _zod.z.string().optional(),
    date: iso8601.optional(),
    issuer: _zod.z.string().optional(),
    summary: _zod.z.string().optional()
});
const educationSchema = _zod.z.object({
    institution: _zod.z.string().optional(),
    url: urlSchema,
    area: _zod.z.string().optional(),
    studyType: _zod.z.string().optional(),
    startDate: iso8601.optional(),
    endDate: iso8601.optional(),
    score: _zod.z.string().optional(),
    courses: _zod.z.array(_zod.z.string()).optional()
});
const publicationsSchema = _zod.z.object({
    name: _zod.z.string().optional(),
    publisher: _zod.z.string().optional(),
    releaseDate: iso8601.optional(),
    url: urlSchema,
    summary: _zod.z.string().optional()
});
const skillsSchema = _zod.z.object({
    name: _zod.z.string().optional(),
    level: _zod.z.string().optional(),
    keywords: _zod.z.array(_zod.z.string()).optional()
});
const languagesSchema = _zod.z.object({
    language: _zod.z.string().optional(),
    fluency: _zod.z.string().optional()
});
const interestsSchema = _zod.z.object({
    name: _zod.z.string().optional(),
    keywords: _zod.z.array(_zod.z.string()).optional()
});
const referencesSchema = _zod.z.object({
    name: _zod.z.string().optional(),
    reference: _zod.z.string().optional()
});
const jsonResumeSchema = _zod.z.object({
    basics: basicsSchema.optional(),
    work: _zod.z.array(workSchema).optional(),
    volunteer: _zod.z.array(volunteerSchema).optional(),
    education: _zod.z.array(educationSchema).optional(),
    awards: _zod.z.array(awardsSchema).optional(),
    certificates: _zod.z.array(certificatesSchema).optional(),
    publications: _zod.z.array(publicationsSchema).optional(),
    skills: _zod.z.array(skillsSchema).optional(),
    languages: _zod.z.array(languagesSchema).optional(),
    interests: _zod.z.array(interestsSchema).optional(),
    references: _zod.z.array(referencesSchema).optional()
});

//# sourceMappingURL=schema.js.map