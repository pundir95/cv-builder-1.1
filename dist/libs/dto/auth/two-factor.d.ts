import { z } from 'zod';
export declare const twoFactorSchema: z.ZodObject<{
    otp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    otp: string;
}, {
    otp: string;
}>;
declare const TwoFactorDto_base: import('nestjs-zod/dto').ZodDto<{
    otp: string;
}, z.ZodObjectDef<{
    otp: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    otp: string;
}>;
export declare class TwoFactorDto extends TwoFactorDto_base {
}
export declare const backupCodesSchema: z.ZodObject<{
    backupCodes: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    backupCodes: string[];
}, {
    backupCodes: string[];
}>;
declare const BackupCodesDto_base: import('nestjs-zod/dto').ZodDto<{
    backupCodes: string[];
}, z.ZodObjectDef<{
    backupCodes: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny>, {
    backupCodes: string[];
}>;
export declare class BackupCodesDto extends BackupCodesDto_base {
}
export declare const twoFactorBackupSchema: z.ZodObject<{
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
}, {
    code: string;
}>;
declare const TwoFactorBackupDto_base: import('nestjs-zod/dto').ZodDto<{
    code: string;
}, z.ZodObjectDef<{
    code: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    code: string;
}>;
export declare class TwoFactorBackupDto extends TwoFactorBackupDto_base {
}
export {};
