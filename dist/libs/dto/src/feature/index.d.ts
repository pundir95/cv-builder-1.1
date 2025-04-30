import { z } from "zod";
export declare const featureSchema: z.ZodObject<{
    isSignupsDisabled: z.ZodDefault<z.ZodBoolean>;
    isEmailAuthDisabled: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    isSignupsDisabled: boolean;
    isEmailAuthDisabled: boolean;
}, {
    isSignupsDisabled?: boolean | undefined;
    isEmailAuthDisabled?: boolean | undefined;
}>;
declare const FeatureDto_base: import("nestjs-zod/dto").ZodDto<{
    isSignupsDisabled: boolean;
    isEmailAuthDisabled: boolean;
}, z.ZodObjectDef<{
    isSignupsDisabled: z.ZodDefault<z.ZodBoolean>;
    isEmailAuthDisabled: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny>, {
    isSignupsDisabled?: boolean | undefined;
    isEmailAuthDisabled?: boolean | undefined;
}>;
export declare class FeatureDto extends FeatureDto_base {
}
export {};
