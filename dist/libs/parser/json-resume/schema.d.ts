import { z } from 'zod';
export declare const jsonResumeSchema: z.ZodObject<{
    basics: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        label: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"">, z.ZodString]>>;
        email: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"">, z.ZodString]>>;
        phone: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"">, z.ZodString]>>;
        summary: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodObject<{
            address: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            region: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            address?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            countryCode?: string | undefined;
            region?: string | undefined;
        }, {
            address?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            countryCode?: string | undefined;
            region?: string | undefined;
        }>>;
        profiles: z.ZodOptional<z.ZodArray<z.ZodObject<{
            network: z.ZodOptional<z.ZodString>;
            username: z.ZodOptional<z.ZodString>;
            url: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"">, z.ZodString]>>;
        }, "strip", z.ZodTypeAny, {
            url?: string | undefined;
            network?: string | undefined;
            username?: string | undefined;
        }, {
            url?: string | undefined;
            network?: string | undefined;
            username?: string | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        label?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        location?: {
            address?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            countryCode?: string | undefined;
            region?: string | undefined;
        } | undefined;
        url?: string | undefined;
        profiles?: {
            url?: string | undefined;
            network?: string | undefined;
            username?: string | undefined;
        }[] | undefined;
        summary?: string | undefined;
        image?: string | undefined;
    }, {
        label?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        location?: {
            address?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            countryCode?: string | undefined;
            region?: string | undefined;
        } | undefined;
        url?: string | undefined;
        profiles?: {
            url?: string | undefined;
            network?: string | undefined;
            username?: string | undefined;
        }[] | undefined;
        summary?: string | undefined;
        image?: string | undefined;
    }>>;
    work: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        position: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"">, z.ZodString]>>;
        startDate: z.ZodOptional<z.ZodString>;
        endDate: z.ZodOptional<z.ZodString>;
        summary: z.ZodOptional<z.ZodString>;
        highlights: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        url?: string | undefined;
        summary?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        position?: string | undefined;
        highlights?: string[] | undefined;
    }, {
        name?: string | undefined;
        url?: string | undefined;
        summary?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        position?: string | undefined;
        highlights?: string[] | undefined;
    }>, "many">>;
    volunteer: z.ZodOptional<z.ZodArray<z.ZodObject<{
        organization: z.ZodOptional<z.ZodString>;
        position: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"">, z.ZodString]>>;
        startDate: z.ZodOptional<z.ZodString>;
        endDate: z.ZodOptional<z.ZodString>;
        summary: z.ZodOptional<z.ZodString>;
        highlights: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        url?: string | undefined;
        summary?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        position?: string | undefined;
        organization?: string | undefined;
        highlights?: string[] | undefined;
    }, {
        url?: string | undefined;
        summary?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        position?: string | undefined;
        organization?: string | undefined;
        highlights?: string[] | undefined;
    }>, "many">>;
    education: z.ZodOptional<z.ZodArray<z.ZodObject<{
        institution: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"">, z.ZodString]>>;
        area: z.ZodOptional<z.ZodString>;
        studyType: z.ZodOptional<z.ZodString>;
        startDate: z.ZodOptional<z.ZodString>;
        endDate: z.ZodOptional<z.ZodString>;
        score: z.ZodOptional<z.ZodString>;
        courses: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        url?: string | undefined;
        institution?: string | undefined;
        studyType?: string | undefined;
        area?: string | undefined;
        score?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        courses?: string[] | undefined;
    }, {
        url?: string | undefined;
        institution?: string | undefined;
        studyType?: string | undefined;
        area?: string | undefined;
        score?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        courses?: string[] | undefined;
    }>, "many">>;
    awards: z.ZodOptional<z.ZodArray<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        date: z.ZodOptional<z.ZodString>;
        awarder: z.ZodOptional<z.ZodString>;
        summary: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        date?: string | undefined;
        summary?: string | undefined;
        title?: string | undefined;
        awarder?: string | undefined;
    }, {
        date?: string | undefined;
        summary?: string | undefined;
        title?: string | undefined;
        awarder?: string | undefined;
    }>, "many">>;
    certificates: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        date: z.ZodOptional<z.ZodString>;
        issuer: z.ZodOptional<z.ZodString>;
        summary: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        date?: string | undefined;
        name?: string | undefined;
        summary?: string | undefined;
        issuer?: string | undefined;
    }, {
        date?: string | undefined;
        name?: string | undefined;
        summary?: string | undefined;
        issuer?: string | undefined;
    }>, "many">>;
    publications: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        publisher: z.ZodOptional<z.ZodString>;
        releaseDate: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"">, z.ZodString]>>;
        summary: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        url?: string | undefined;
        summary?: string | undefined;
        publisher?: string | undefined;
        releaseDate?: string | undefined;
    }, {
        name?: string | undefined;
        url?: string | undefined;
        summary?: string | undefined;
        publisher?: string | undefined;
        releaseDate?: string | undefined;
    }>, "many">>;
    skills: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        level: z.ZodOptional<z.ZodString>;
        keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        keywords?: string[] | undefined;
        level?: string | undefined;
    }, {
        name?: string | undefined;
        keywords?: string[] | undefined;
        level?: string | undefined;
    }>, "many">>;
    languages: z.ZodOptional<z.ZodArray<z.ZodObject<{
        language: z.ZodOptional<z.ZodString>;
        fluency: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        language?: string | undefined;
        fluency?: string | undefined;
    }, {
        language?: string | undefined;
        fluency?: string | undefined;
    }>, "many">>;
    interests: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        keywords?: string[] | undefined;
    }, {
        name?: string | undefined;
        keywords?: string[] | undefined;
    }>, "many">>;
    references: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        reference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        reference?: string | undefined;
    }, {
        name?: string | undefined;
        reference?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    education?: {
        url?: string | undefined;
        institution?: string | undefined;
        studyType?: string | undefined;
        area?: string | undefined;
        score?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        courses?: string[] | undefined;
    }[] | undefined;
    volunteer?: {
        url?: string | undefined;
        summary?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        position?: string | undefined;
        organization?: string | undefined;
        highlights?: string[] | undefined;
    }[] | undefined;
    references?: {
        name?: string | undefined;
        reference?: string | undefined;
    }[] | undefined;
    skills?: {
        name?: string | undefined;
        keywords?: string[] | undefined;
        level?: string | undefined;
    }[] | undefined;
    interests?: {
        name?: string | undefined;
        keywords?: string[] | undefined;
    }[] | undefined;
    awards?: {
        date?: string | undefined;
        summary?: string | undefined;
        title?: string | undefined;
        awarder?: string | undefined;
    }[] | undefined;
    publications?: {
        name?: string | undefined;
        url?: string | undefined;
        summary?: string | undefined;
        publisher?: string | undefined;
        releaseDate?: string | undefined;
    }[] | undefined;
    languages?: {
        language?: string | undefined;
        fluency?: string | undefined;
    }[] | undefined;
    basics?: {
        label?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        location?: {
            address?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            countryCode?: string | undefined;
            region?: string | undefined;
        } | undefined;
        url?: string | undefined;
        profiles?: {
            url?: string | undefined;
            network?: string | undefined;
            username?: string | undefined;
        }[] | undefined;
        summary?: string | undefined;
        image?: string | undefined;
    } | undefined;
    work?: {
        name?: string | undefined;
        url?: string | undefined;
        summary?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        position?: string | undefined;
        highlights?: string[] | undefined;
    }[] | undefined;
    certificates?: {
        date?: string | undefined;
        name?: string | undefined;
        summary?: string | undefined;
        issuer?: string | undefined;
    }[] | undefined;
}, {
    education?: {
        url?: string | undefined;
        institution?: string | undefined;
        studyType?: string | undefined;
        area?: string | undefined;
        score?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        courses?: string[] | undefined;
    }[] | undefined;
    volunteer?: {
        url?: string | undefined;
        summary?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        position?: string | undefined;
        organization?: string | undefined;
        highlights?: string[] | undefined;
    }[] | undefined;
    references?: {
        name?: string | undefined;
        reference?: string | undefined;
    }[] | undefined;
    skills?: {
        name?: string | undefined;
        keywords?: string[] | undefined;
        level?: string | undefined;
    }[] | undefined;
    interests?: {
        name?: string | undefined;
        keywords?: string[] | undefined;
    }[] | undefined;
    awards?: {
        date?: string | undefined;
        summary?: string | undefined;
        title?: string | undefined;
        awarder?: string | undefined;
    }[] | undefined;
    publications?: {
        name?: string | undefined;
        url?: string | undefined;
        summary?: string | undefined;
        publisher?: string | undefined;
        releaseDate?: string | undefined;
    }[] | undefined;
    languages?: {
        language?: string | undefined;
        fluency?: string | undefined;
    }[] | undefined;
    basics?: {
        label?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        location?: {
            address?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            countryCode?: string | undefined;
            region?: string | undefined;
        } | undefined;
        url?: string | undefined;
        profiles?: {
            url?: string | undefined;
            network?: string | undefined;
            username?: string | undefined;
        }[] | undefined;
        summary?: string | undefined;
        image?: string | undefined;
    } | undefined;
    work?: {
        name?: string | undefined;
        url?: string | undefined;
        summary?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        position?: string | undefined;
        highlights?: string[] | undefined;
    }[] | undefined;
    certificates?: {
        date?: string | undefined;
        name?: string | undefined;
        summary?: string | undefined;
        issuer?: string | undefined;
    }[] | undefined;
}>;
export type JsonResume = z.infer<typeof jsonResumeSchema>;
