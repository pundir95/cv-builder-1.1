import { z } from "zod";
export declare const dateSchema: z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, Date, string | Date>;
export declare const sortByDate: <T>(a: T, b: T, key: keyof T, desc?: boolean) => 1 | 0 | -1;
export declare const deepSearchAndParseDates: (obj: any, dateKeys: string[]) => any;
