import { z } from "zod";
export declare const registerSchema: z.ZodObject<z.objectUtil.extendShape<Pick<{
    id: z.ZodDefault<z.ZodString>;
    first_name: z.ZodString;
    last_name: z.ZodString;
    picture: z.ZodUnion<[z.ZodUnion<[z.ZodLiteral<"">, z.ZodNull]>, z.ZodString]>;
    phone_number: z.ZodString;
    username: z.ZodEffects<z.ZodString, string, string>;
    email: z.ZodEffects<z.ZodString, string, string>;
    locale: z.ZodDefault<z.ZodString>;
    emailVerified: z.ZodDefault<z.ZodBoolean>;
    twoFactorEnabled: z.ZodDefault<z.ZodBoolean>;
    provider: z.ZodDefault<z.ZodEnum<["email", "github", "google", "openid"]>>;
    createdAt: z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, Date, string | Date>;
    updatedAt: z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, Date, string | Date>;
}, "email" | "first_name" | "last_name" | "phone_number" | "locale">, {
    password: z.ZodString;
    confirm_password: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    locale: string;
    confirm_password: string;
}, {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    confirm_password: string;
    locale?: string | undefined;
}>;
declare const RegisterDto_base: import("nestjs-zod/dto").ZodDto<{
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    locale: string;
    confirm_password: string;
}, z.ZodObjectDef<z.objectUtil.extendShape<Pick<{
    id: z.ZodDefault<z.ZodString>;
    first_name: z.ZodString;
    last_name: z.ZodString;
    picture: z.ZodUnion<[z.ZodUnion<[z.ZodLiteral<"">, z.ZodNull]>, z.ZodString]>;
    phone_number: z.ZodString;
    username: z.ZodEffects<z.ZodString, string, string>;
    email: z.ZodEffects<z.ZodString, string, string>;
    locale: z.ZodDefault<z.ZodString>;
    emailVerified: z.ZodDefault<z.ZodBoolean>;
    twoFactorEnabled: z.ZodDefault<z.ZodBoolean>;
    provider: z.ZodDefault<z.ZodEnum<["email", "github", "google", "openid"]>>;
    createdAt: z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, Date, string | Date>;
    updatedAt: z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, Date, string | Date>;
}, "email" | "first_name" | "last_name" | "phone_number" | "locale">, {
    password: z.ZodString;
    confirm_password: z.ZodString;
}>, "strip", z.ZodTypeAny>, {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    confirm_password: string;
    locale?: string | undefined;
}>;
export declare class RegisterDto extends RegisterDto_base {
}
export {};
