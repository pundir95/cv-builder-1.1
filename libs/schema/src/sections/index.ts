import { z } from "zod";

import type { FilterKeys } from "../shared";
import { idSchema } from "../shared";
import { awardSchema } from "./award";
import { certificationSchema } from "./certification";
import { customSectionSchema } from "./custom-section";
import { educationSchema } from "./education";
import { experienceSchema } from "./experience";
import { interestSchema } from "./interest";
import { languageSchema } from "./language";
import { profileSchema } from "./profile";
import { projectSchema } from "./project";
import { publicationSchema } from "./publication";
import { referenceSchema } from "./reference";
import { skillSchema } from "./skill";
import { volunteerSchema } from "./volunteer";

// Schema
export const sectionSchema = z.object({
  name: z.string(),
  columns: z.number().min(1).max(5).default(1),
  separateLinks: z.boolean().default(true),
  visible: z.boolean().default(true),
});

// Schema
export const customSchema = sectionSchema.extend({
  id: idSchema,
  items: z.array(customSectionSchema),
});

export const sectionsSchema = z.object({
  collapse: sectionSchema.extend({
    id: z.literal("collapse"),
    items: z.array(customSectionSchema),
    extraDescription: z.string().default(""),
  }),
  summary: sectionSchema.extend({
    id: z.literal("summary"),
    content: z.string().default(""),
    extraDescription: z.string().default(""),
  }),
  awards: sectionSchema.extend({
    id: z.literal("awards"),
    items: z.array(awardSchema),
    extraDescription: z.string().default(""),
  }),
  certifications: sectionSchema.extend({
    id: z.literal("certifications"),
    items: z.array(certificationSchema),
    extraDescription: z.string().default(""),
  }),
  education: sectionSchema.extend({
    id: z.literal("education"),
    items: z.array(educationSchema),
    extraDescription: z.string().default(""),
  }),
  experience: sectionSchema.extend({
    id: z.literal("experience"),
    items: z.array(experienceSchema),
    extraDescription: z.string().default(""),
  }),
  volunteer: sectionSchema.extend({
    id: z.literal("volunteer"),
    items: z.array(volunteerSchema),
    extraDescription: z.string().default(""),
  }),
  interests: sectionSchema.extend({
    id: z.literal("interests"),
    items: z.array(interestSchema),
    extraDescription: z.string().default(""),
  }),
  languages: sectionSchema.extend({
    id: z.literal("languages"),
    items: z.array(languageSchema),
    extraDescription: z.string().default(""),
  }),
  profiles: sectionSchema.extend({
    id: z.literal("profiles"),
    items: z.array(profileSchema),
    extraDescription: z.string().default(""),
  }),
  projects: sectionSchema.extend({
    id: z.literal("projects"),
    items: z.array(projectSchema),
    extraDescription: z.string().default(""),
  }),
  publications: sectionSchema.extend({
    id: z.literal("publications"),
    items: z.array(publicationSchema),
    extraDescription: z.string().default(""),
  }),
  references: sectionSchema.extend({
    id: z.literal("references"),
    items: z.array(referenceSchema),
    extraDescription: z.string().default(""),
  }),
  skills: sectionSchema.extend({
    id: z.literal("skills"),
    items: z.array(skillSchema),
    extraDescription: z.string().default(""),
  }),
  custom: z.record(z.string(), customSchema),
});

// Detailed Types
export type Section = z.infer<typeof sectionSchema>;
export type Sections = z.infer<typeof sectionsSchema>;

export type SectionKey = "basics" | keyof Sections | `custom.${string}`;
export type SectionWithItem<T = unknown> = Sections[FilterKeys<Sections, { items: T[] }>];
export type SectionItem = SectionWithItem["items"][number];
export type CustomSectionGroup = z.infer<typeof customSchema>;

// Defaults
export const defaultSection: Section = {
  name: "",
  columns: 1,
  separateLinks: true,
  visible: true,
};

export const defaultSections: Sections = {
  collapse: {
    ...defaultSection,
    id: "collapse",
    name: "Collapse",
    items: [],
    extraDescription: "",
  },
  summary: { ...defaultSection, id: "summary", name: "Summary", content: "", extraDescription: ""  },
  awards: { ...defaultSection, id: "awards", name: "Awards", items: [], extraDescription: "" },
  certifications: { ...defaultSection, id: "certifications", name: "Certifications", items: [], extraDescription: "" },
  education: { ...defaultSection, id: "education", name: "Education", items: [], extraDescription: "" },
  experience: { ...defaultSection, id: "experience", name: "Experience", items: [], extraDescription: "" },
  volunteer: { ...defaultSection, id: "volunteer", name: "Volunteering", items: [], extraDescription: "" },
  interests: { ...defaultSection, id: "interests", name: "Interests", items: [], extraDescription: "" },
  languages: { ...defaultSection, id: "languages", name: "Languages", items: [], extraDescription: "" },
  profiles: { ...defaultSection, id: "profiles", name: "Profiles", items: [], extraDescription: "" },
  projects: { ...defaultSection, id: "projects", name: "Projects", items: [], extraDescription: "" },
  publications: { ...defaultSection, id: "publications", name: "Publications", items: [], extraDescription: "" },
  references: { ...defaultSection, id: "references", name: "References", items: [], extraDescription: "" },
  skills: { ...defaultSection, id: "skills", name: "Skills", items: [], extraDescription: "" },
  custom: {},
};

export * from "./award";
export * from "./certification";
export * from "./custom-section";
export * from "./education";
export * from "./experience";
export * from "./interest";
export * from "./language";
export * from "./profile";
export * from "./project";
export * from "./publication";
export * from "./reference";
export * from "./skill";
export * from "./volunteer";
