import { z } from "zod";
export declare const statisticsSchema: z.ZodObject<{
    views: z.ZodDefault<z.ZodNumber>;
    downloads: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    views: number;
    downloads: number;
}, {
    views?: number | undefined;
    downloads?: number | undefined;
}>;
declare const StatisticsDto_base: import("nestjs-zod/dto").ZodDto<{
    views: number;
    downloads: number;
}, z.ZodObjectDef<{
    views: z.ZodDefault<z.ZodNumber>;
    downloads: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny>, {
    views?: number | undefined;
    downloads?: number | undefined;
}>;
export declare class StatisticsDto extends StatisticsDto_base {
}
export {};
