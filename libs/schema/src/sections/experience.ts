import { z } from "zod";

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";

// Schema
export const experienceSchema = itemSchema.extend({
  company: z.string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s\-&.,()]+$/, "Company name contains invalid characters"),
  
  position: z.string()
    .min(1, "Position is required")
    .min(2, "Position must be at least 2 characters")
    .max(100, "Position must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s\-&.,()]+$/, "Position contains invalid characters"),
  
  location: z.string()
    .min(1, "Location is required")
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s\-&.,()]+$/, "Location contains invalid characters"),
  
  date: z.string()
    .optional()
    .refine((val) => !val || val.length === 0, "Date field is auto-populated"),
  
  startDate: z.string()
    .min(1, "Start date is required")
    .refine((val) => {
      if (!val) return false;
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, "Please enter a valid start date")
    .refine((val) => {
      if (!val) return false;
      const date = new Date(val);
      const now = new Date();
      return date <= now;
    }, "Start date cannot be in the future"),
  
  endDate: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true; // Optional field
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, "Please enter a valid end date"),
  
  summary: z.string()
    .min(1, "Summary is required")
    .min(10, "Summary must be at least 10 characters")
    .max(1000, "Summary must be less than 1000 characters"),
  
  url: urlSchema,
}).refine((data) => {
  if (data.endDate && data.startDate) {
    const endDate = new Date(data.endDate);
    const startDate = new Date(data.startDate);
    return endDate >= startDate;
  }
  return true;
}, {
  message: "End date must be after start date",
  path: ["endDate"],
});

// Type
export type Experience = z.infer<typeof experienceSchema>;

// Defaults
export const defaultExperience: Experience = {
  ...defaultItem,
  company: "",
  position: "",
  location: "",
  date: "",
  startDate: "",
  endDate: "",
  summary: "",
  url: defaultUrl,
};
