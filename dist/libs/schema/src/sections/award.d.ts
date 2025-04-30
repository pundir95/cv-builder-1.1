import { z } from "zod";
export declare const awardSchema: z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodDefault<z.ZodString>;
    visible: z.ZodBoolean;
}, {
    title: z.ZodString;
    awarder: z.ZodString;
    date: z.ZodString;
    summary: z.ZodString;
    url: z.ZodObject<{
        label: z.ZodString;
        href: z.ZodUnion<[z.ZodLiteral<"">, z.ZodString]>;
    }, "strip", z.ZodTypeAny, {
        label: string;
        href: string;
    }, {
        label: string;
        href: string;
    }>;
}>, "strip", z.ZodTypeAny, {
    id: string;
    visible: boolean;
    date: string;
    url: {
        label: string;
        href: string;
    };
    summary: string;
    title: string;
    awarder: string;
}, {
    visible: boolean;
    date: string;
    url: {
        label: string;
        href: string;
    };
    summary: string;
    title: string;
    awarder: string;
    id?: string | undefined;
}>;
export type Award = z.infer<typeof awardSchema>;
export declare const defaultAward: Award;
