import { z } from "zod";
export declare const resetPasswordSchema: z.ZodObject<{
    token: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    token: string;
}, {
    password: string;
    token: string;
}>;
declare const ResetPasswordDto_base: import("nestjs-zod/dto").ZodDto<{
    password: string;
    token: string;
}, z.ZodObjectDef<{
    token: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    password: string;
    token: string;
}>;
export declare class ResetPasswordDto extends ResetPasswordDto_base {
}
export {};
