import { z } from 'zod';
export declare const profileSchema: z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodDefault<z.ZodString>;
    visible: z.ZodBoolean;
}, {
    network: z.ZodString;
    username: z.ZodString;
    icon: z.ZodString;
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
    icon: string;
    url: {
        label: string;
        href: string;
    };
    network: string;
    username: string;
}, {
    visible: boolean;
    icon: string;
    url: {
        label: string;
        href: string;
    };
    network: string;
    username: string;
    id?: string | undefined;
}>;
export type Profile = z.infer<typeof profileSchema>;
export declare const defaultProfile: Profile;
