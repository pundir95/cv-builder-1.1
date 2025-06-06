import { z } from "zod";
export declare const positionSchema: z.ZodObject<{
    "Company Name": z.ZodString;
    Title: z.ZodString;
    Description: z.ZodOptional<z.ZodString>;
    Location: z.ZodString;
    "Started On": z.ZodString;
    "Finished On": z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    "Started On": string;
    "Company Name": string;
    Title: string;
    Location: string;
    "Finished On"?: string | undefined;
    Description?: string | undefined;
}, {
    "Started On": string;
    "Company Name": string;
    Title: string;
    Location: string;
    "Finished On"?: string | undefined;
    Description?: string | undefined;
}>;
