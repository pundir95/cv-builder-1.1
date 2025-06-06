import { z } from 'zod';
export declare const basicsSchema: z.ZodObject<{
    name: z.ZodString;
    profession: z.ZodString;
    headline: z.ZodString;
    email: z.ZodUnion<[z.ZodLiteral<"">, z.ZodString]>;
    phone: z.ZodString;
    location: z.ZodString;
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
    customFields: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        icon: z.ZodString;
        name: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        value: string;
        icon: string;
        name: string;
    }, {
        id: string;
        value: string;
        icon: string;
        name: string;
    }>, "many">;
    picture: z.ZodObject<{
        url: z.ZodString;
        size: z.ZodDefault<z.ZodNumber>;
        aspectRatio: z.ZodDefault<z.ZodNumber>;
        borderRadius: z.ZodDefault<z.ZodNumber>;
        effects: z.ZodObject<{
            hidden: z.ZodDefault<z.ZodBoolean>;
            border: z.ZodDefault<z.ZodBoolean>;
            grayscale: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            hidden: boolean;
            border: boolean;
            grayscale: boolean;
        }, {
            hidden?: boolean | undefined;
            border?: boolean | undefined;
            grayscale?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        size: number;
        aspectRatio: number;
        borderRadius: number;
        effects: {
            hidden: boolean;
            border: boolean;
            grayscale: boolean;
        };
    }, {
        url: string;
        effects: {
            hidden?: boolean | undefined;
            border?: boolean | undefined;
            grayscale?: boolean | undefined;
        };
        size?: number | undefined;
        aspectRatio?: number | undefined;
        borderRadius?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    profession: string;
    headline: string;
    email: string;
    phone: string;
    location: string;
    url: {
        label: string;
        href: string;
    };
    customFields: {
        id: string;
        value: string;
        icon: string;
        name: string;
    }[];
    picture: {
        url: string;
        size: number;
        aspectRatio: number;
        borderRadius: number;
        effects: {
            hidden: boolean;
            border: boolean;
            grayscale: boolean;
        };
    };
}, {
    name: string;
    profession: string;
    headline: string;
    email: string;
    phone: string;
    location: string;
    url: {
        label: string;
        href: string;
    };
    customFields: {
        id: string;
        value: string;
        icon: string;
        name: string;
    }[];
    picture: {
        url: string;
        effects: {
            hidden?: boolean | undefined;
            border?: boolean | undefined;
            grayscale?: boolean | undefined;
        };
        size?: number | undefined;
        aspectRatio?: number | undefined;
        borderRadius?: number | undefined;
    };
}>;
export type Basics = z.infer<typeof basicsSchema>;
export declare const defaultBasics: Basics;
export * from './custom';
