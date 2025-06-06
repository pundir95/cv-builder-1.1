import { z } from 'zod';
export declare const projectSchema: z.ZodObject<{
    Title: z.ZodString;
    Description: z.ZodString;
    Url: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"">, z.ZodString]>>;
    "Started On": z.ZodString;
    "Finished On": z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    "Started On": string;
    Title: string;
    Description: string;
    Url?: string | undefined;
    "Finished On"?: string | undefined;
}, {
    "Started On": string;
    Title: string;
    Description: string;
    Url?: string | undefined;
    "Finished On"?: string | undefined;
}>;
