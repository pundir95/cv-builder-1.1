export declare const updateUserSchema: import('zod').ZodObject<Pick<{
    id: import('zod').ZodOptional<import('zod').ZodDefault<import('zod').ZodString>>;
    first_name: import('zod').ZodOptional<import('zod').ZodString>;
    last_name: import('zod').ZodOptional<import('zod').ZodString>;
    picture: import('zod').ZodOptional<import('zod').ZodUnion<[import('zod').ZodUnion<[import('zod').ZodLiteral<"">, import('zod').ZodNull]>, import('zod').ZodString]>>;
    phone_number: import('zod').ZodOptional<import('zod').ZodString>;
    username: import('zod').ZodOptional<import('zod').ZodEffects<import('zod').ZodString, string, string>>;
    email: import('zod').ZodOptional<import('zod').ZodEffects<import('zod').ZodString, string, string>>;
    locale: import('zod').ZodOptional<import('zod').ZodDefault<import('zod').ZodString>>;
    emailVerified: import('zod').ZodOptional<import('zod').ZodDefault<import('zod').ZodBoolean>>;
    twoFactorEnabled: import('zod').ZodOptional<import('zod').ZodDefault<import('zod').ZodBoolean>>;
    provider: import('zod').ZodOptional<import('zod').ZodDefault<import('zod').ZodEnum<["email", "github", "google", "openid"]>>>;
    createdAt: import('zod').ZodOptional<import('zod').ZodEffects<import('zod').ZodUnion<[import('zod').ZodDate, import('zod').ZodString]>, Date, string | Date>>;
    updatedAt: import('zod').ZodOptional<import('zod').ZodEffects<import('zod').ZodUnion<[import('zod').ZodDate, import('zod').ZodString]>, Date, string | Date>>;
    created_at: import('zod').ZodOptional<import('zod').ZodEffects<import('zod').ZodUnion<[import('zod').ZodDate, import('zod').ZodString]>, Date, string | Date>>;
    updated_at: import('zod').ZodOptional<import('zod').ZodEffects<import('zod').ZodUnion<[import('zod').ZodDate, import('zod').ZodString]>, Date, string | Date>>;
}, "email" | "picture" | "username" | "locale">, "strip", import('zod').ZodTypeAny, {
    email?: string | undefined;
    picture?: string | null | undefined;
    username?: string | undefined;
    locale?: string | undefined;
}, {
    email?: string | undefined;
    picture?: string | null | undefined;
    username?: string | undefined;
    locale?: string | undefined;
}>;
declare const UpdateUserDto_base: import('nestjs-zod/dto').ZodDto<{
    email?: string | undefined;
    picture?: string | null | undefined;
    username?: string | undefined;
    locale?: string | undefined;
}, import('zod').ZodObjectDef<Pick<{
    id: import('zod').ZodOptional<import('zod').ZodDefault<import('zod').ZodString>>;
    first_name: import('zod').ZodOptional<import('zod').ZodString>;
    last_name: import('zod').ZodOptional<import('zod').ZodString>;
    picture: import('zod').ZodOptional<import('zod').ZodUnion<[import('zod').ZodUnion<[import('zod').ZodLiteral<"">, import('zod').ZodNull]>, import('zod').ZodString]>>;
    phone_number: import('zod').ZodOptional<import('zod').ZodString>;
    username: import('zod').ZodOptional<import('zod').ZodEffects<import('zod').ZodString, string, string>>;
    email: import('zod').ZodOptional<import('zod').ZodEffects<import('zod').ZodString, string, string>>;
    locale: import('zod').ZodOptional<import('zod').ZodDefault<import('zod').ZodString>>;
    emailVerified: import('zod').ZodOptional<import('zod').ZodDefault<import('zod').ZodBoolean>>;
    twoFactorEnabled: import('zod').ZodOptional<import('zod').ZodDefault<import('zod').ZodBoolean>>;
    provider: import('zod').ZodOptional<import('zod').ZodDefault<import('zod').ZodEnum<["email", "github", "google", "openid"]>>>;
    createdAt: import('zod').ZodOptional<import('zod').ZodEffects<import('zod').ZodUnion<[import('zod').ZodDate, import('zod').ZodString]>, Date, string | Date>>;
    updatedAt: import('zod').ZodOptional<import('zod').ZodEffects<import('zod').ZodUnion<[import('zod').ZodDate, import('zod').ZodString]>, Date, string | Date>>;
    created_at: import('zod').ZodOptional<import('zod').ZodEffects<import('zod').ZodUnion<[import('zod').ZodDate, import('zod').ZodString]>, Date, string | Date>>;
    updated_at: import('zod').ZodOptional<import('zod').ZodEffects<import('zod').ZodUnion<[import('zod').ZodDate, import('zod').ZodString]>, Date, string | Date>>;
}, "email" | "picture" | "username" | "locale">, "strip", import('zod').ZodTypeAny>, {
    email?: string | undefined;
    picture?: string | null | undefined;
    username?: string | undefined;
    locale?: string | undefined;
}>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
