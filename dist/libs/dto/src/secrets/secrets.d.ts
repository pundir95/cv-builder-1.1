import { z } from "zod";
export declare const secretsSchema: z.ZodObject<{
    id: z.ZodDefault<z.ZodString>;
    password: z.ZodNullable<z.ZodString>;
    lastSignedIn: z.ZodNullable<z.ZodDate>;
    verificationToken: z.ZodNullable<z.ZodString>;
    twoFactorSecret: z.ZodNullable<z.ZodString>;
    twoFactorBackupCodes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    refreshToken: z.ZodNullable<z.ZodString>;
    resetToken: z.ZodNullable<z.ZodString>;
    userId: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    password: string | null;
    lastSignedIn: Date | null;
    verificationToken: string | null;
    twoFactorSecret: string | null;
    twoFactorBackupCodes: string[];
    refreshToken: string | null;
    resetToken: string | null;
    userId: string;
}, {
    password: string | null;
    lastSignedIn: Date | null;
    verificationToken: string | null;
    twoFactorSecret: string | null;
    refreshToken: string | null;
    resetToken: string | null;
    id?: string | undefined;
    twoFactorBackupCodes?: string[] | undefined;
    userId?: string | undefined;
}>;
