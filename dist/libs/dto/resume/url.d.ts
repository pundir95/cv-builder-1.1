import { z } from 'zod';
export declare const urlSchema: z.ZodObject<{
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
}, {
    url: string;
}>;
declare const UrlDto_base: import('nestjs-zod/dto').ZodDto<{
    url: string;
}, z.ZodObjectDef<{
    url: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    url: string;
}>;
export declare class UrlDto extends UrlDto_base {
}
export {};
