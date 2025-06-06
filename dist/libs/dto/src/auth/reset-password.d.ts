import { z } from "zod";
export declare const resetPasswordSchema: z.ZodObject<{
    password: z.ZodString;
    confirm_password: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    confirm_password: string;
}, {
    email: string;
    password: string;
    confirm_password: string;
}>;
declare const ResetPasswordDto_base: import("nestjs-zod/dto").ZodDto<{
    email: string;
    password: string;
    confirm_password: string;
}, z.ZodObjectDef<{
    password: z.ZodString;
    confirm_password: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    email: string;
    password: string;
    confirm_password: string;
}>;
export declare class ResetPasswordDto extends ResetPasswordDto_base {
}
export {};
