import { z } from 'zod';
export declare const experienceSchema: z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodDefault<z.ZodString>;
    visible: z.ZodBoolean;
}, {
    company: z.ZodString;
    position: z.ZodString;
    location: z.ZodString;
    date: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodOptional<z.ZodString>;
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
    location: string;
    url: {
        label: string;
        href: string;
    };
    summary: string;
    startDate: string;
    company: string;
    position: string;
    endDate?: string | undefined;
}, {
    visible: boolean;
    date: string;
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
    endDate?: string | undefined;
}>;
export type Experience = z.infer<typeof experienceSchema>;
export declare const defaultExperience: Experience;
