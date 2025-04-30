import { z } from "zod";
export declare const contributorSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    url: z.ZodString;
    avatar: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    url: string;
    avatar: string;
}, {
    id: number;
    name: string;
    url: string;
    avatar: string;
}>;
declare const ContributorDto_base: import("nestjs-zod/dto").ZodDto<{
    id: number;
    name: string;
    url: string;
    avatar: string;
}, z.ZodObjectDef<{
    id: z.ZodNumber;
    name: z.ZodString;
    url: z.ZodString;
    avatar: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    id: number;
    name: string;
    url: string;
    avatar: string;
}>;
export declare class ContributorDto extends ContributorDto_base {
}
export {};
