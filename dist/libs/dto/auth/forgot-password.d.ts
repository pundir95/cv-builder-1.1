import { z } from 'zod';
export declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
declare const ForgotPasswordDto_base: import('nestjs-zod/dto').ZodDto<{
    email: string;
}, z.ZodObjectDef<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    email: string;
}>;
export declare class ForgotPasswordDto extends ForgotPasswordDto_base {
}
export {};
