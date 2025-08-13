import { z } from "zod";

import { defaultItem, itemSchema } from "../shared";

// Schema
export const skillSchema = itemSchema.extend({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string(),
  level: z.coerce.number().min(0).max(5).default(1),
  keywords: z.array(z.string().trim().min(1)).min(1, "Add at least one keyword").default([]),
});

// Type
export type Skill = z.infer<typeof skillSchema>;

// Defaults
export const defaultSkill: Skill = {
  ...defaultItem,
  name: "",
  description: "",
  level: 1,
  keywords: [],
};
