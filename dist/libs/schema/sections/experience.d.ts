import { z } from 'zod';
export declare const experienceSchema: z.ZodEffects<z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodDefault<z.ZodString>;
    visible: z.ZodBoolean;
}, {
    company: z.ZodString;
    position: z.ZodString;
    location: z.ZodString;
    date: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    startDate: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
    endDate: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
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
    location: string;
    url: {
        label: string;
        href: string;
    };
    summary: string;
    startDate: string;
    company: string;
    position: string;
    date?: string | undefined;
    endDate?: string | undefined;
}, {
    visible: boolean;
    location: string;
    url: {
        label: string;
        href: string;
    };
    summary: string;
    startDate: string;
    company: string;
    position: string;
    id?: string | undefined;
    date?: string | undefined;
    endDate?: string | undefined;
}>, {
    id: string;
    visible: boolean;
    location: string;
    url: {
        label: string;
        href: string;
    };
    summary: string;
    startDate: string;
    company: string;
    position: string;
    date?: string | undefined;
    endDate?: string | undefined;
}, {
    visible: boolean;
    location: string;
    url: {
        label: string;
        href: string;
    };
    summary: string;
    startDate: string;
    company: string;
    position: string;
    id?: string | undefined;
    date?: string | undefined;
    endDate?: string | undefined;
}>;
export type Experience = z.infer<typeof experienceSchema>;
export declare const defaultExperience: Experience;
