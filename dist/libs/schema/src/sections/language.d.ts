import { z } from "zod";
export declare const languageSchema: z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodDefault<z.ZodString>;
    visible: z.ZodBoolean;
}, {
    name: z.ZodString;
    description: z.ZodString;
    level: z.ZodDefault<z.ZodNumber>;
}>, "strip", z.ZodTypeAny, {
    id: string;
    visible: boolean;
    name: string;
    description: string;
    level: number;
}, {
    visible: boolean;
    name: string;
    description: string;
    id?: string | undefined;
    level?: number | undefined;
}>;
export type Language = z.infer<typeof languageSchema>;
export declare const defaultLanguage: Language;
