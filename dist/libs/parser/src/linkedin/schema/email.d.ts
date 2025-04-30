import { z } from "zod";
export declare const emailSchema: z.ZodObject<{
    "Email Address": z.ZodString;
    Confirmed: z.ZodEnum<["Yes", "No"]>;
    Primary: z.ZodEnum<["Yes", "No"]>;
    "Updated On": z.ZodString;
}, "strip", z.ZodTypeAny, {
    "Email Address": string;
    Confirmed: "Yes" | "No";
    Primary: "Yes" | "No";
    "Updated On": string;
}, {
    "Email Address": string;
    Confirmed: "Yes" | "No";
    Primary: "Yes" | "No";
    "Updated On": string;
}>;
