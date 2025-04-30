import { z } from "zod";
export declare const loginSchema: z.ZodEffects<z.ZodObject<{
    email: z.ZodEffects<z.ZodString, string, string>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
declare const LoginDto_base: import("nestjs-zod/dto").ZodDto<{
    email: string;
    password: string;
}, z.ZodEffectsDef<z.ZodObject<{
    email: z.ZodEffects<z.ZodString, string, string>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>>, {
    email: string;
    password: string;
}>;
export declare class LoginDto extends LoginDto_base {
}
export {};
