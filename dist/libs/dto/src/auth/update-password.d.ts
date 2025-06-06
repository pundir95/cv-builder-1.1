import { z } from "zod";
export declare const updatePasswordSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    currentPassword: string;
    newPassword: string;
}, {
    currentPassword: string;
    newPassword: string;
}>;
declare const UpdatePasswordDto_base: import("nestjs-zod/dto").ZodDto<{
    currentPassword: string;
    newPassword: string;
}, z.ZodObjectDef<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    currentPassword: string;
    newPassword: string;
}>;
export declare class UpdatePasswordDto extends UpdatePasswordDto_base {
}
export {};
