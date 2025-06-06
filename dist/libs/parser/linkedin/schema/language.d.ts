import { z } from 'zod';
export declare const languageSchema: z.ZodObject<{
    Name: z.ZodString;
    Proficiency: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    Name: string;
    Proficiency?: string | undefined;
}, {
    Name: string;
    Proficiency?: string | undefined;
}>;
