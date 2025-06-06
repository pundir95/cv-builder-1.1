import { z } from "zod";
export declare const deleteResumeSchema: z.ZodObject<{
    id: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id?: string | undefined;
}>;
declare const DeleteResumeDto_base: import("nestjs-zod/dto").ZodDto<{
    id: string;
}, z.ZodObjectDef<{
    id: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny>, {
    id?: string | undefined;
}>;
export declare class DeleteResumeDto extends DeleteResumeDto_base {
}
export {};
