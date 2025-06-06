import { z } from 'zod';
export declare const getTemplateListSchema: z.ZodObject<{
    title: z.ZodString;
    slug: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    visibility: z.ZodDefault<z.ZodEnum<["public", "private"]>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    visibility: "public" | "private";
    slug?: string | undefined;
}, {
    title: string;
    slug?: string | undefined;
    visibility?: "public" | "private" | undefined;
}>;
declare const GetTemplateListDto_base: import('nestjs-zod/dto').ZodDto<{
    title: string;
    visibility: "public" | "private";
    slug?: string | undefined;
}, z.ZodObjectDef<{
    title: z.ZodString;
    slug: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    visibility: z.ZodDefault<z.ZodEnum<["public", "private"]>>;
}, "strip", z.ZodTypeAny>, {
    title: string;
    slug?: string | undefined;
    visibility?: "public" | "private" | undefined;
}>;
export declare class GetTemplateListDto extends GetTemplateListDto_base {
}
export {};
