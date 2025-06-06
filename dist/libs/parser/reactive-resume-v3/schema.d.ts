import { z } from 'zod';
export declare const reactiveResumeV3Schema: z.ZodObject<{
    public: z.ZodBoolean;
    basics: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodUnion<[z.ZodLiteral<"">, z.ZodString]>;
        phone: z.ZodOptional<z.ZodString>;
        headline: z.ZodOptional<z.ZodString>;
        summary: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            body: z.ZodOptional<z.ZodString>;
            visible: z.ZodDefault<z.ZodBoolean>;
            heading: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            visible: boolean;
            body?: string | undefined;
            heading?: string | undefined;
        }, {
            visible?: boolean | undefined;
            body?: string | undefined;
            heading?: string | undefined;
        }>]>>;
        birthdate: z.ZodOptional<z.ZodString>;
        website: z.ZodOptional<z.ZodString>;
        profiles: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            url: z.ZodOptional<z.ZodString>;
            network: z.ZodOptional<z.ZodString>;
            username: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id?: string | undefined;
            url?: string | undefined;
            network?: string | undefined;
            username?: string | undefined;
        }, {
            id?: string | undefined;
            url?: string | undefined;
            network?: string | undefined;
            username?: string | undefined;
        }>, "many">>;
        location: z.ZodObject<{
            address: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            region: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            address?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            region?: string | undefined;
            country?: string | undefined;
        }, {
            address?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            region?: string | undefined;
            country?: string | undefined;
        }>;
        photo: z.ZodObject<{
            visible: z.ZodBoolean;
            url: z.ZodOptional<z.ZodString>;
            filters: z.ZodObject<{
                shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                size: z.ZodNumber;
                border: z.ZodBoolean;
                grayscale: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                size: number;
                border: boolean;
                grayscale: boolean;
                shape?: string | null | undefined;
            }, {
                size: number;
                border: boolean;
                grayscale: boolean;
                shape?: string | null | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            visible: boolean;
            filters: {
                size: number;
                border: boolean;
                grayscale: boolean;
                shape?: string | null | undefined;
            };
            url?: string | undefined;
        }, {
            visible: boolean;
            filters: {
                size: number;
                border: boolean;
                grayscale: boolean;
                shape?: string | null | undefined;
            };
            url?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        location: {
            address?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            region?: string | undefined;
            country?: string | undefined;
        };
        photo: {
            visible: boolean;
            filters: {
                size: number;
                border: boolean;
                grayscale: boolean;
                shape?: string | null | undefined;
            };
            url?: string | undefined;
        };
        name?: string | undefined;
        headline?: string | undefined;
        phone?: string | undefined;
        profiles?: {
            id?: string | undefined;
            url?: string | undefined;
            network?: string | undefined;
            username?: string | undefined;
        }[] | undefined;
        summary?: string | {
            visible: boolean;
            body?: string | undefined;
            heading?: string | undefined;
        } | undefined;
        birthdate?: string | undefined;
        website?: string | undefined;
    }, {
        email: string;
        location: {
            address?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            region?: string | undefined;
            country?: string | undefined;
        };
        photo: {
            visible: boolean;
            filters: {
                size: number;
                border: boolean;
                grayscale: boolean;
                shape?: string | null | undefined;
            };
            url?: string | undefined;
        };
        name?: string | undefined;
        headline?: string | undefined;
        phone?: string | undefined;
        profiles?: {
            id?: string | undefined;
            url?: string | undefined;
            network?: string | undefined;
            username?: string | undefined;
        }[] | undefined;
        summary?: string | {
            visible?: boolean | undefined;
            body?: string | undefined;
            heading?: string | undefined;
        } | undefined;
        birthdate?: string | undefined;
        website?: string | undefined;
    }>;
    sections: z.ZodObject<{
        work: z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
            id: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            type: z.ZodEnum<["basic", "work", "custom"]>;
            columns: z.ZodDefault<z.ZodUnion<[z.ZodNumber, z.ZodNull]>>;
            visible: z.ZodBoolean;
        }, {
            items: z.ZodArray<z.ZodNullable<z.ZodObject<{
                id: z.ZodOptional<z.ZodString>;
                url: z.ZodOptional<z.ZodString>;
                date: z.ZodOptional<z.ZodObject<{
                    start: z.ZodOptional<z.ZodString>;
                    end: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    start?: string | undefined;
                    end?: string | undefined;
                }, {
                    start?: string | undefined;
                    end?: string | undefined;
                }>>;
                name: z.ZodOptional<z.ZodString>;
                position: z.ZodOptional<z.ZodString>;
                summary: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
            }, {
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        }, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        }>>;
        awards: z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
            id: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            type: z.ZodEnum<["basic", "work", "custom"]>;
            columns: z.ZodDefault<z.ZodUnion<[z.ZodNumber, z.ZodNull]>>;
            visible: z.ZodBoolean;
        }, {
            items: z.ZodArray<z.ZodNullable<z.ZodObject<{
                id: z.ZodOptional<z.ZodString>;
                url: z.ZodOptional<z.ZodString>;
                date: z.ZodOptional<z.ZodString>;
                title: z.ZodOptional<z.ZodString>;
                awarder: z.ZodOptional<z.ZodString>;
                summary: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                id?: string | undefined;
                date?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                title?: string | undefined;
                awarder?: string | undefined;
            }, {
                id?: string | undefined;
                date?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                title?: string | undefined;
                awarder?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                title?: string | undefined;
                awarder?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        }, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                title?: string | undefined;
                awarder?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        }>>;
        skills: z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
            id: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            type: z.ZodEnum<["basic", "work", "custom"]>;
            columns: z.ZodDefault<z.ZodUnion<[z.ZodNumber, z.ZodNull]>>;
            visible: z.ZodBoolean;
        }, {
            items: z.ZodArray<z.ZodNullable<z.ZodObject<{
                id: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                level: z.ZodOptional<z.ZodString>;
                keywords: z.ZodOptional<z.ZodArray<z.ZodNullable<z.ZodString>, "many">>;
                levelNum: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                levelNum: number;
                id?: string | undefined;
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
                level?: string | undefined;
            }, {
                levelNum: number;
                id?: string | undefined;
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
                level?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                levelNum: number;
                id?: string | undefined;
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
                level?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        }, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                levelNum: number;
                id?: string | undefined;
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
                level?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        }>>;
        projects: z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
            id: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            type: z.ZodEnum<["basic", "work", "custom"]>;
            columns: z.ZodDefault<z.ZodUnion<[z.ZodNumber, z.ZodNull]>>;
            visible: z.ZodBoolean;
        }, {
            items: z.ZodArray<z.ZodNullable<z.ZodObject<{
                id: z.ZodOptional<z.ZodString>;
                url: z.ZodOptional<z.ZodString>;
                date: z.ZodOptional<z.ZodObject<{
                    start: z.ZodOptional<z.ZodString>;
                    end: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    start?: string | undefined;
                    end?: string | undefined;
                }, {
                    start?: string | undefined;
                    end?: string | undefined;
                }>>;
                name: z.ZodOptional<z.ZodString>;
                summary: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                keywords: z.ZodOptional<z.ZodArray<z.ZodNullable<z.ZodString>, "many">>;
                description: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                description?: string | undefined;
                keywords?: (string | null)[] | undefined;
            }, {
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                description?: string | undefined;
                keywords?: (string | null)[] | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                description?: string | undefined;
                keywords?: (string | null)[] | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        }, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                description?: string | undefined;
                keywords?: (string | null)[] | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        }>>;
        education: z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
            id: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            type: z.ZodEnum<["basic", "work", "custom"]>;
            columns: z.ZodDefault<z.ZodUnion<[z.ZodNumber, z.ZodNull]>>;
            visible: z.ZodBoolean;
        }, {
            items: z.ZodArray<z.ZodNullable<z.ZodObject<{
                id: z.ZodOptional<z.ZodString>;
                url: z.ZodOptional<z.ZodString>;
                area: z.ZodOptional<z.ZodString>;
                date: z.ZodOptional<z.ZodObject<{
                    start: z.ZodOptional<z.ZodString>;
                    end: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    start?: string | undefined;
                    end?: string | undefined;
                }, {
                    start?: string | undefined;
                    end?: string | undefined;
                }>>;
                score: z.ZodOptional<z.ZodString>;
                degree: z.ZodOptional<z.ZodString>;
                courses: z.ZodOptional<z.ZodArray<z.ZodNullable<z.ZodString>, "many">>;
                summary: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                institution: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                institution?: string | undefined;
                area?: string | undefined;
                score?: string | undefined;
                courses?: (string | null)[] | undefined;
                degree?: string | undefined;
            }, {
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                institution?: string | undefined;
                area?: string | undefined;
                score?: string | undefined;
                courses?: (string | null)[] | undefined;
                degree?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                institution?: string | undefined;
                area?: string | undefined;
                score?: string | undefined;
                courses?: (string | null)[] | undefined;
                degree?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        }, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                institution?: string | undefined;
                area?: string | undefined;
                score?: string | undefined;
                courses?: (string | null)[] | undefined;
                degree?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        }>>;
        interests: z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
            id: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            type: z.ZodEnum<["basic", "work", "custom"]>;
            columns: z.ZodDefault<z.ZodUnion<[z.ZodNumber, z.ZodNull]>>;
            visible: z.ZodBoolean;
        }, {
            items: z.ZodArray<z.ZodNullable<z.ZodObject<{
                id: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                keywords: z.ZodOptional<z.ZodArray<z.ZodNullable<z.ZodString>, "many">>;
            }, "strip", z.ZodTypeAny, {
                id?: string | undefined;
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
            }, {
                id?: string | undefined;
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        }, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        }>>;
        languages: z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
            id: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            type: z.ZodEnum<["basic", "work", "custom"]>;
            columns: z.ZodDefault<z.ZodUnion<[z.ZodNumber, z.ZodNull]>>;
            visible: z.ZodBoolean;
        }, {
            items: z.ZodArray<z.ZodNullable<z.ZodObject<{
                id: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                level: z.ZodOptional<z.ZodString>;
                levelNum: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                levelNum: number;
                id?: string | undefined;
                name?: string | undefined;
                level?: string | undefined;
            }, {
                levelNum: number;
                id?: string | undefined;
                name?: string | undefined;
                level?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                levelNum: number;
                id?: string | undefined;
                name?: string | undefined;
                level?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        }, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                levelNum: number;
                id?: string | undefined;
                name?: string | undefined;
                level?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        }>>;
        volunteer: z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
            id: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            type: z.ZodEnum<["basic", "work", "custom"]>;
            columns: z.ZodDefault<z.ZodUnion<[z.ZodNumber, z.ZodNull]>>;
            visible: z.ZodBoolean;
        }, {
            items: z.ZodArray<z.ZodNullable<z.ZodObject<{
                id: z.ZodOptional<z.ZodString>;
                organization: z.ZodOptional<z.ZodString>;
                position: z.ZodOptional<z.ZodString>;
                date: z.ZodOptional<z.ZodObject<{
                    start: z.ZodOptional<z.ZodString>;
                    end: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    start?: string | undefined;
                    end?: string | undefined;
                }, {
                    start?: string | undefined;
                    end?: string | undefined;
                }>>;
                url: z.ZodOptional<z.ZodString>;
                summary: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                organization?: string | undefined;
            }, {
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                organization?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                organization?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        }, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                organization?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        }>>;
        references: z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
            id: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            type: z.ZodEnum<["basic", "work", "custom"]>;
            columns: z.ZodDefault<z.ZodUnion<[z.ZodNumber, z.ZodNull]>>;
            visible: z.ZodBoolean;
        }, {
            items: z.ZodArray<z.ZodNullable<z.ZodObject<{
                id: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                email: z.ZodOptional<z.ZodString>;
                phone: z.ZodOptional<z.ZodString>;
                summary: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                relationship: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id?: string | undefined;
                name?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
                summary?: string | null | undefined;
                relationship?: string | undefined;
            }, {
                id?: string | undefined;
                name?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
                summary?: string | null | undefined;
                relationship?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                name?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
                summary?: string | null | undefined;
                relationship?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        }, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                name?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
                summary?: string | null | undefined;
                relationship?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        }>>;
        publications: z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
            id: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            type: z.ZodEnum<["basic", "work", "custom"]>;
            columns: z.ZodDefault<z.ZodUnion<[z.ZodNumber, z.ZodNull]>>;
            visible: z.ZodBoolean;
        }, {
            items: z.ZodArray<z.ZodNullable<z.ZodObject<{
                id: z.ZodOptional<z.ZodString>;
                url: z.ZodOptional<z.ZodString>;
                date: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                publisher: z.ZodOptional<z.ZodString>;
                summary: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                id?: string | undefined;
                date?: string | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                publisher?: string | undefined;
            }, {
                id?: string | undefined;
                date?: string | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                publisher?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: string | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                publisher?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        }, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: string | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                publisher?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        }>>;
        certifications: z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
            id: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            type: z.ZodEnum<["basic", "work", "custom"]>;
            columns: z.ZodDefault<z.ZodUnion<[z.ZodNumber, z.ZodNull]>>;
            visible: z.ZodBoolean;
        }, {
            items: z.ZodArray<z.ZodNullable<z.ZodObject<{
                id: z.ZodOptional<z.ZodString>;
                url: z.ZodOptional<z.ZodString>;
                date: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                issuer: z.ZodOptional<z.ZodString>;
                summary: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                id?: string | undefined;
                date?: string | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                issuer?: string | undefined;
            }, {
                id?: string | undefined;
                date?: string | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                issuer?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: string | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                issuer?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        }, {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: string | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                issuer?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        education?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                institution?: string | undefined;
                area?: string | undefined;
                score?: string | undefined;
                courses?: (string | null)[] | undefined;
                degree?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        projects?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                description?: string | undefined;
                keywords?: (string | null)[] | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        volunteer?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                organization?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        references?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                name?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
                summary?: string | null | undefined;
                relationship?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        skills?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                levelNum: number;
                id?: string | undefined;
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
                level?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        interests?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        certifications?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: string | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                issuer?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        awards?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                title?: string | undefined;
                awarder?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        publications?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: string | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                publisher?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        languages?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                levelNum: number;
                id?: string | undefined;
                name?: string | undefined;
                level?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        work?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
    }, {
        education?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                institution?: string | undefined;
                area?: string | undefined;
                score?: string | undefined;
                courses?: (string | null)[] | undefined;
                degree?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        projects?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                description?: string | undefined;
                keywords?: (string | null)[] | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        volunteer?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                organization?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        references?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                name?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
                summary?: string | null | undefined;
                relationship?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        skills?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                levelNum: number;
                id?: string | undefined;
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
                level?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        interests?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        certifications?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: string | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                issuer?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        awards?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                title?: string | undefined;
                awarder?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        publications?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: string | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                publisher?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        languages?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                levelNum: number;
                id?: string | undefined;
                name?: string | undefined;
                level?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        work?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
    }>;
    metadata: z.ZodOptional<z.ZodObject<{
        css: z.ZodOptional<z.ZodObject<{
            value: z.ZodOptional<z.ZodString>;
            visible: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            visible: boolean;
            value?: string | undefined;
        }, {
            visible: boolean;
            value?: string | undefined;
        }>>;
        date: z.ZodOptional<z.ZodObject<{
            format: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            format?: string | undefined;
        }, {
            format?: string | undefined;
        }>>;
        theme: z.ZodOptional<z.ZodObject<{
            text: z.ZodOptional<z.ZodString>;
            primary: z.ZodOptional<z.ZodString>;
            background: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            background?: string | undefined;
            text?: string | undefined;
            primary?: string | undefined;
        }, {
            background?: string | undefined;
            text?: string | undefined;
            primary?: string | undefined;
        }>>;
        layout: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodArray<z.ZodNullable<z.ZodString>, "many">, "many">, "many">>;
        locale: z.ZodOptional<z.ZodString>;
        template: z.ZodOptional<z.ZodString>;
        typography: z.ZodOptional<z.ZodObject<{
            size: z.ZodOptional<z.ZodObject<{
                body: z.ZodOptional<z.ZodNumber>;
                heading: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                body?: number | undefined;
                heading?: number | undefined;
            }, {
                body?: number | undefined;
                heading?: number | undefined;
            }>>;
            family: z.ZodOptional<z.ZodObject<{
                body: z.ZodOptional<z.ZodString>;
                heading: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                body?: string | undefined;
                heading?: string | undefined;
            }, {
                body?: string | undefined;
                heading?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            size?: {
                body?: number | undefined;
                heading?: number | undefined;
            } | undefined;
            family?: {
                body?: string | undefined;
                heading?: string | undefined;
            } | undefined;
        }, {
            size?: {
                body?: number | undefined;
                heading?: number | undefined;
            } | undefined;
            family?: {
                body?: string | undefined;
                heading?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        date?: {
            format?: string | undefined;
        } | undefined;
        template?: string | undefined;
        layout?: (string | null)[][][] | undefined;
        css?: {
            visible: boolean;
            value?: string | undefined;
        } | undefined;
        theme?: {
            background?: string | undefined;
            text?: string | undefined;
            primary?: string | undefined;
        } | undefined;
        typography?: {
            size?: {
                body?: number | undefined;
                heading?: number | undefined;
            } | undefined;
            family?: {
                body?: string | undefined;
                heading?: string | undefined;
            } | undefined;
        } | undefined;
        locale?: string | undefined;
    }, {
        date?: {
            format?: string | undefined;
        } | undefined;
        template?: string | undefined;
        layout?: (string | null)[][][] | undefined;
        css?: {
            visible: boolean;
            value?: string | undefined;
        } | undefined;
        theme?: {
            background?: string | undefined;
            text?: string | undefined;
            primary?: string | undefined;
        } | undefined;
        typography?: {
            size?: {
                body?: number | undefined;
                heading?: number | undefined;
            } | undefined;
            family?: {
                body?: string | undefined;
                heading?: string | undefined;
            } | undefined;
        } | undefined;
        locale?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    basics: {
        email: string;
        location: {
            address?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            region?: string | undefined;
            country?: string | undefined;
        };
        photo: {
            visible: boolean;
            filters: {
                size: number;
                border: boolean;
                grayscale: boolean;
                shape?: string | null | undefined;
            };
            url?: string | undefined;
        };
        name?: string | undefined;
        headline?: string | undefined;
        phone?: string | undefined;
        profiles?: {
            id?: string | undefined;
            url?: string | undefined;
            network?: string | undefined;
            username?: string | undefined;
        }[] | undefined;
        summary?: string | {
            visible: boolean;
            body?: string | undefined;
            heading?: string | undefined;
        } | undefined;
        birthdate?: string | undefined;
        website?: string | undefined;
    };
    sections: {
        education?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                institution?: string | undefined;
                area?: string | undefined;
                score?: string | undefined;
                courses?: (string | null)[] | undefined;
                degree?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        projects?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                description?: string | undefined;
                keywords?: (string | null)[] | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        volunteer?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                organization?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        references?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                name?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
                summary?: string | null | undefined;
                relationship?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        skills?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                levelNum: number;
                id?: string | undefined;
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
                level?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        interests?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        certifications?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: string | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                issuer?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        awards?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                title?: string | undefined;
                awarder?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        publications?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: string | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                publisher?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        languages?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                levelNum: number;
                id?: string | undefined;
                name?: string | undefined;
                level?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
        work?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            columns: number | null;
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
        } | undefined;
    };
    public: boolean;
    metadata?: {
        date?: {
            format?: string | undefined;
        } | undefined;
        template?: string | undefined;
        layout?: (string | null)[][][] | undefined;
        css?: {
            visible: boolean;
            value?: string | undefined;
        } | undefined;
        theme?: {
            background?: string | undefined;
            text?: string | undefined;
            primary?: string | undefined;
        } | undefined;
        typography?: {
            size?: {
                body?: number | undefined;
                heading?: number | undefined;
            } | undefined;
            family?: {
                body?: string | undefined;
                heading?: string | undefined;
            } | undefined;
        } | undefined;
        locale?: string | undefined;
    } | undefined;
}, {
    basics: {
        email: string;
        location: {
            address?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            region?: string | undefined;
            country?: string | undefined;
        };
        photo: {
            visible: boolean;
            filters: {
                size: number;
                border: boolean;
                grayscale: boolean;
                shape?: string | null | undefined;
            };
            url?: string | undefined;
        };
        name?: string | undefined;
        headline?: string | undefined;
        phone?: string | undefined;
        profiles?: {
            id?: string | undefined;
            url?: string | undefined;
            network?: string | undefined;
            username?: string | undefined;
        }[] | undefined;
        summary?: string | {
            visible?: boolean | undefined;
            body?: string | undefined;
            heading?: string | undefined;
        } | undefined;
        birthdate?: string | undefined;
        website?: string | undefined;
    };
    sections: {
        education?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                institution?: string | undefined;
                area?: string | undefined;
                score?: string | undefined;
                courses?: (string | null)[] | undefined;
                degree?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        projects?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                description?: string | undefined;
                keywords?: (string | null)[] | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        volunteer?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                organization?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        references?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                name?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
                summary?: string | null | undefined;
                relationship?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        skills?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                levelNum: number;
                id?: string | undefined;
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
                level?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        interests?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        certifications?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: string | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                issuer?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        awards?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                title?: string | undefined;
                awarder?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        publications?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: string | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                publisher?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        languages?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                levelNum: number;
                id?: string | undefined;
                name?: string | undefined;
                level?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        work?: {
            visible: boolean;
            type: "custom" | "work" | "basic";
            items: ({
                id?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                name?: string | undefined;
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
            } | null)[];
            id?: string | undefined;
            name?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
    };
    public: boolean;
    metadata?: {
        date?: {
            format?: string | undefined;
        } | undefined;
        template?: string | undefined;
        layout?: (string | null)[][][] | undefined;
        css?: {
            visible: boolean;
            value?: string | undefined;
        } | undefined;
        theme?: {
            background?: string | undefined;
            text?: string | undefined;
            primary?: string | undefined;
        } | undefined;
        typography?: {
            size?: {
                body?: number | undefined;
                heading?: number | undefined;
            } | undefined;
            family?: {
                body?: string | undefined;
                heading?: string | undefined;
            } | undefined;
        } | undefined;
        locale?: string | undefined;
    } | undefined;
}>;
export type ReactiveResumeV3 = z.infer<typeof reactiveResumeV3Schema>;
