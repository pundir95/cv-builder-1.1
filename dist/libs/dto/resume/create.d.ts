import { z } from 'zod';
export declare const createResumeSchema: z.ZodObject<{
    title: z.ZodString;
    cv_template: z.ZodDefault<z.ZodNumber>;
    cv_data: z.ZodAny;
    slug: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    visibility: z.ZodDefault<z.ZodEnum<["public", "private"]>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    cv_template: number;
    visibility: "public" | "private";
    cv_data?: any;
    slug?: string | undefined;
}, {
    title: string;
    cv_template?: number | undefined;
    cv_data?: any;
    slug?: string | undefined;
    visibility?: "public" | "private" | undefined;
}>;
declare const CreateResumeDto_base: import('nestjs-zod/dto').ZodDto<{
    title: string;
    cv_template: number;
    visibility: "public" | "private";
    cv_data?: any;
    slug?: string | undefined;
}, z.ZodObjectDef<{
    title: z.ZodString;
    cv_template: z.ZodDefault<z.ZodNumber>;
    cv_data: z.ZodAny;
    slug: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    visibility: z.ZodDefault<z.ZodEnum<["public", "private"]>>;
}, "strip", z.ZodTypeAny>, {
    title: string;
    cv_template?: number | undefined;
    cv_data?: any;
    slug?: string | undefined;
    visibility?: "public" | "private" | undefined;
}>;
export declare class CreateResumeDto extends CreateResumeDto_base {
}
export {};
