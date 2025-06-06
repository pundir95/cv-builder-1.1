import { z } from "zod";
export declare const authResponseSchema: z.ZodObject<{
    status: z.ZodEnum<["authenticated", "2fa_required"]>;
    data: z.ZodObject<{
        access: z.ZodString;
        refresh: z.ZodString;
        user: z.ZodObject<{
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
            created_at: z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, Date, string | Date>;
            updated_at: z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, Date, string | Date>;
        }, "strip", z.ZodTypeAny, {
            email: string;
            id: string;
            first_name: string;
            last_name: string;
            picture: string | null;
            phone_number: string;
            username: string;
            locale: string;
            emailVerified: boolean;
            twoFactorEnabled: boolean;
            provider: "email" | "github" | "google" | "openid";
            createdAt: Date;
            updatedAt: Date;
            created_at: Date;
            updated_at: Date;
        }, {
            email: string;
            first_name: string;
            last_name: string;
            picture: string | null;
            phone_number: string;
            username: string;
            createdAt: string | Date;
            updatedAt: string | Date;
            created_at: string | Date;
            updated_at: string | Date;
            id?: string | undefined;
            locale?: string | undefined;
            emailVerified?: boolean | undefined;
            twoFactorEnabled?: boolean | undefined;
            provider?: "email" | "github" | "google" | "openid" | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        access: string;
        refresh: string;
        user: {
            email: string;
            id: string;
            first_name: string;
            last_name: string;
            picture: string | null;
            phone_number: string;
            username: string;
            locale: string;
            emailVerified: boolean;
            twoFactorEnabled: boolean;
            provider: "email" | "github" | "google" | "openid";
            createdAt: Date;
            updatedAt: Date;
            created_at: Date;
            updated_at: Date;
        };
    }, {
        access: string;
        refresh: string;
        user: {
            email: string;
            first_name: string;
            last_name: string;
            picture: string | null;
            phone_number: string;
            username: string;
            createdAt: string | Date;
            updatedAt: string | Date;
            created_at: string | Date;
            updated_at: string | Date;
            id?: string | undefined;
            locale?: string | undefined;
            emailVerified?: boolean | undefined;
            twoFactorEnabled?: boolean | undefined;
            provider?: "email" | "github" | "google" | "openid" | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    status: "authenticated" | "2fa_required";
    data: {
        access: string;
        refresh: string;
        user: {
            email: string;
            id: string;
            first_name: string;
            last_name: string;
            picture: string | null;
            phone_number: string;
            username: string;
            locale: string;
            emailVerified: boolean;
            twoFactorEnabled: boolean;
            provider: "email" | "github" | "google" | "openid";
            createdAt: Date;
            updatedAt: Date;
            created_at: Date;
            updated_at: Date;
        };
    };
}, {
    status: "authenticated" | "2fa_required";
    data: {
        access: string;
        refresh: string;
        user: {
            email: string;
            first_name: string;
            last_name: string;
            picture: string | null;
            phone_number: string;
            username: string;
            createdAt: string | Date;
            updatedAt: string | Date;
            created_at: string | Date;
            updated_at: string | Date;
            id?: string | undefined;
            locale?: string | undefined;
            emailVerified?: boolean | undefined;
            twoFactorEnabled?: boolean | undefined;
            provider?: "email" | "github" | "google" | "openid" | undefined;
        };
    };
}>;
declare const AuthResponseDto_base: import("nestjs-zod/dto").ZodDto<{
    status: "authenticated" | "2fa_required";
    data: {
        access: string;
        refresh: string;
        user: {
            email: string;
            id: string;
            first_name: string;
            last_name: string;
            picture: string | null;
            phone_number: string;
            username: string;
            locale: string;
            emailVerified: boolean;
            twoFactorEnabled: boolean;
            provider: "email" | "github" | "google" | "openid";
            createdAt: Date;
            updatedAt: Date;
            created_at: Date;
            updated_at: Date;
        };
    };
}, z.ZodObjectDef<{
    status: z.ZodEnum<["authenticated", "2fa_required"]>;
    data: z.ZodObject<{
        access: z.ZodString;
        refresh: z.ZodString;
        user: z.ZodObject<{
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
            created_at: z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, Date, string | Date>;
            updated_at: z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, Date, string | Date>;
        }, "strip", z.ZodTypeAny, {
            email: string;
            id: string;
            first_name: string;
            last_name: string;
            picture: string | null;
            phone_number: string;
            username: string;
            locale: string;
            emailVerified: boolean;
            twoFactorEnabled: boolean;
            provider: "email" | "github" | "google" | "openid";
            createdAt: Date;
            updatedAt: Date;
            created_at: Date;
            updated_at: Date;
        }, {
            email: string;
            first_name: string;
            last_name: string;
            picture: string | null;
            phone_number: string;
            username: string;
            createdAt: string | Date;
            updatedAt: string | Date;
            created_at: string | Date;
            updated_at: string | Date;
            id?: string | undefined;
            locale?: string | undefined;
            emailVerified?: boolean | undefined;
            twoFactorEnabled?: boolean | undefined;
            provider?: "email" | "github" | "google" | "openid" | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        access: string;
        refresh: string;
        user: {
            email: string;
            id: string;
            first_name: string;
            last_name: string;
            picture: string | null;
            phone_number: string;
            username: string;
            locale: string;
            emailVerified: boolean;
            twoFactorEnabled: boolean;
            provider: "email" | "github" | "google" | "openid";
            createdAt: Date;
            updatedAt: Date;
            created_at: Date;
            updated_at: Date;
        };
    }, {
        access: string;
        refresh: string;
        user: {
            email: string;
            first_name: string;
            last_name: string;
            picture: string | null;
            phone_number: string;
            username: string;
            createdAt: string | Date;
            updatedAt: string | Date;
            created_at: string | Date;
            updated_at: string | Date;
            id?: string | undefined;
            locale?: string | undefined;
            emailVerified?: boolean | undefined;
            twoFactorEnabled?: boolean | undefined;
            provider?: "email" | "github" | "google" | "openid" | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny>, {
    status: "authenticated" | "2fa_required";
    data: {
        access: string;
        refresh: string;
        user: {
            email: string;
            first_name: string;
            last_name: string;
            picture: string | null;
            phone_number: string;
            username: string;
            createdAt: string | Date;
            updatedAt: string | Date;
            created_at: string | Date;
            updated_at: string | Date;
            id?: string | undefined;
            locale?: string | undefined;
            emailVerified?: boolean | undefined;
            twoFactorEnabled?: boolean | undefined;
            provider?: "email" | "github" | "google" | "openid" | undefined;
        };
    };
}>;
export declare class AuthResponseDto extends AuthResponseDto_base {
}
export {};
