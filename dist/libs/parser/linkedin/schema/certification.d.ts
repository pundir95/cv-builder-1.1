import { z } from 'zod';
export declare const certificationSchema: z.ZodObject<{
    Name: z.ZodString;
    Url: z.ZodString;
    Authority: z.ZodString;
    "Started On": z.ZodString;
    "Finished On": z.ZodOptional<z.ZodString>;
    "License Number": z.ZodString;
}, "strip", z.ZodTypeAny, {
    Name: string;
    Url: string;
    Authority: string;
    "Started On": string;
    "License Number": string;
    "Finished On"?: string | undefined;
}, {
    Name: string;
    Url: string;
    Authority: string;
    "Started On": string;
    "License Number": string;
    "Finished On"?: string | undefined;
}>;
