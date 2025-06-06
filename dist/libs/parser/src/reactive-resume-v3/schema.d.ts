import { z } from "zod";
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
            body?: string | undefined;
            visible?: boolean | undefined;
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
            network?: string | undefined;
            username?: string | undefined;
            url?: string | undefined;
            id?: string | undefined;
        }, {
            network?: string | undefined;
            username?: string | undefined;
            url?: string | undefined;
            id?: string | undefined;
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
        phone?: string | undefined;
        summary?: string | {
            visible: boolean;
            body?: string | undefined;
            heading?: string | undefined;
        } | undefined;
        profiles?: {
            network?: string | undefined;
            username?: string | undefined;
            url?: string | undefined;
            id?: string | undefined;
        }[] | undefined;
        headline?: string | undefined;
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
        phone?: string | undefined;
        summary?: string | {
            body?: string | undefined;
            visible?: boolean | undefined;
            heading?: string | undefined;
        } | undefined;
        profiles?: {
            network?: string | undefined;
            username?: string | undefined;
            url?: string | undefined;
            id?: string | undefined;
        }[] | undefined;
        headline?: string | undefined;
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
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                id?: string | undefined;
            }, {
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                id?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        }, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
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
                url?: string | undefined;
                summary?: string | null | undefined;
                title?: string | undefined;
                date?: string | undefined;
                awarder?: string | undefined;
                id?: string | undefined;
            }, {
                url?: string | undefined;
                summary?: string | null | undefined;
                title?: string | undefined;
                date?: string | undefined;
                awarder?: string | undefined;
                id?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                summary?: string | null | undefined;
                title?: string | undefined;
                date?: string | undefined;
                awarder?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        }, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                summary?: string | null | undefined;
                title?: string | undefined;
                date?: string | undefined;
                awarder?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
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
                name?: string | undefined;
                level?: string | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
            }, {
                levelNum: number;
                name?: string | undefined;
                level?: string | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                levelNum: number;
                name?: string | undefined;
                level?: string | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        }, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                levelNum: number;
                name?: string | undefined;
                level?: string | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
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
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
                description?: string | undefined;
            }, {
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
                description?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
                description?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        }, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
                description?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
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
                url?: string | undefined;
                summary?: string | null | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                institution?: string | undefined;
                area?: string | undefined;
                score?: string | undefined;
                courses?: (string | null)[] | undefined;
                id?: string | undefined;
                degree?: string | undefined;
            }, {
                url?: string | undefined;
                summary?: string | null | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                institution?: string | undefined;
                area?: string | undefined;
                score?: string | undefined;
                courses?: (string | null)[] | undefined;
                id?: string | undefined;
                degree?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                summary?: string | null | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                institution?: string | undefined;
                area?: string | undefined;
                score?: string | undefined;
                courses?: (string | null)[] | undefined;
                id?: string | undefined;
                degree?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        }, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                summary?: string | null | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                institution?: string | undefined;
                area?: string | undefined;
                score?: string | undefined;
                courses?: (string | null)[] | undefined;
                id?: string | undefined;
                degree?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
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
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
            }, {
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        }, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
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
                name?: string | undefined;
                level?: string | undefined;
                id?: string | undefined;
            }, {
                levelNum: number;
                name?: string | undefined;
                level?: string | undefined;
                id?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                levelNum: number;
                name?: string | undefined;
                level?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        }, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                levelNum: number;
                name?: string | undefined;
                level?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
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
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                organization?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                id?: string | undefined;
            }, {
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                organization?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                id?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                organization?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        }, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                organization?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
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
                name?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
                summary?: string | null | undefined;
                id?: string | undefined;
                relationship?: string | undefined;
            }, {
                name?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
                summary?: string | null | undefined;
                id?: string | undefined;
                relationship?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                name?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
                summary?: string | null | undefined;
                id?: string | undefined;
                relationship?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        }, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                name?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
                summary?: string | null | undefined;
                id?: string | undefined;
                relationship?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
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
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: string | undefined;
                publisher?: string | undefined;
                id?: string | undefined;
            }, {
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: string | undefined;
                publisher?: string | undefined;
                id?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: string | undefined;
                publisher?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        }, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: string | undefined;
                publisher?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
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
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: string | undefined;
                issuer?: string | undefined;
                id?: string | undefined;
            }, {
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: string | undefined;
                issuer?: string | undefined;
                id?: string | undefined;
            }>>, "many">;
        }>, "strip", z.ZodTypeAny, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: string | undefined;
                issuer?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        }, {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: string | undefined;
                issuer?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        work?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        volunteer?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                organization?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        education?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                summary?: string | null | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                institution?: string | undefined;
                area?: string | undefined;
                score?: string | undefined;
                courses?: (string | null)[] | undefined;
                id?: string | undefined;
                degree?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        awards?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                summary?: string | null | undefined;
                title?: string | undefined;
                date?: string | undefined;
                awarder?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        publications?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: string | undefined;
                publisher?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        skills?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                levelNum: number;
                name?: string | undefined;
                level?: string | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        languages?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                levelNum: number;
                name?: string | undefined;
                level?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        interests?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        references?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                name?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
                summary?: string | null | undefined;
                id?: string | undefined;
                relationship?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        projects?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
                description?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        certifications?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: string | undefined;
                issuer?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
    }, {
        work?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        volunteer?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                organization?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        education?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                summary?: string | null | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                institution?: string | undefined;
                area?: string | undefined;
                score?: string | undefined;
                courses?: (string | null)[] | undefined;
                id?: string | undefined;
                degree?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        awards?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                summary?: string | null | undefined;
                title?: string | undefined;
                date?: string | undefined;
                awarder?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        publications?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: string | undefined;
                publisher?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        skills?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                levelNum: number;
                name?: string | undefined;
                level?: string | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        languages?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                levelNum: number;
                name?: string | undefined;
                level?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        interests?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        references?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                name?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
                summary?: string | null | undefined;
                id?: string | undefined;
                relationship?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        projects?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
                description?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        certifications?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: string | undefined;
                issuer?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
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
            text?: string | undefined;
            primary?: string | undefined;
            background?: string | undefined;
        }, {
            text?: string | undefined;
            primary?: string | undefined;
            background?: string | undefined;
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
        css?: {
            visible: boolean;
            value?: string | undefined;
        } | undefined;
        theme?: {
            text?: string | undefined;
            primary?: string | undefined;
            background?: string | undefined;
        } | undefined;
        layout?: (string | null)[][][] | undefined;
        locale?: string | undefined;
        template?: string | undefined;
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
    }, {
        date?: {
            format?: string | undefined;
        } | undefined;
        css?: {
            visible: boolean;
            value?: string | undefined;
        } | undefined;
        theme?: {
            text?: string | undefined;
            primary?: string | undefined;
            background?: string | undefined;
        } | undefined;
        layout?: (string | null)[][][] | undefined;
        locale?: string | undefined;
        template?: string | undefined;
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
        phone?: string | undefined;
        summary?: string | {
            visible: boolean;
            body?: string | undefined;
            heading?: string | undefined;
        } | undefined;
        profiles?: {
            network?: string | undefined;
            username?: string | undefined;
            url?: string | undefined;
            id?: string | undefined;
        }[] | undefined;
        headline?: string | undefined;
        birthdate?: string | undefined;
        website?: string | undefined;
    };
    public: boolean;
    sections: {
        work?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        volunteer?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                organization?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        education?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                summary?: string | null | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                institution?: string | undefined;
                area?: string | undefined;
                score?: string | undefined;
                courses?: (string | null)[] | undefined;
                id?: string | undefined;
                degree?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        awards?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                summary?: string | null | undefined;
                title?: string | undefined;
                date?: string | undefined;
                awarder?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        publications?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: string | undefined;
                publisher?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        skills?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                levelNum: number;
                name?: string | undefined;
                level?: string | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        languages?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                levelNum: number;
                name?: string | undefined;
                level?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        interests?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        references?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                name?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
                summary?: string | null | undefined;
                id?: string | undefined;
                relationship?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        projects?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
                description?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
        certifications?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            columns: number | null;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: string | undefined;
                issuer?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
        } | undefined;
    };
    metadata?: {
        date?: {
            format?: string | undefined;
        } | undefined;
        css?: {
            visible: boolean;
            value?: string | undefined;
        } | undefined;
        theme?: {
            text?: string | undefined;
            primary?: string | undefined;
            background?: string | undefined;
        } | undefined;
        layout?: (string | null)[][][] | undefined;
        locale?: string | undefined;
        template?: string | undefined;
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
        phone?: string | undefined;
        summary?: string | {
            body?: string | undefined;
            visible?: boolean | undefined;
            heading?: string | undefined;
        } | undefined;
        profiles?: {
            network?: string | undefined;
            username?: string | undefined;
            url?: string | undefined;
            id?: string | undefined;
        }[] | undefined;
        headline?: string | undefined;
        birthdate?: string | undefined;
        website?: string | undefined;
    };
    public: boolean;
    sections: {
        work?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        volunteer?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                summary?: string | null | undefined;
                position?: string | undefined;
                organization?: string | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        education?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                summary?: string | null | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                institution?: string | undefined;
                area?: string | undefined;
                score?: string | undefined;
                courses?: (string | null)[] | undefined;
                id?: string | undefined;
                degree?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        awards?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                summary?: string | null | undefined;
                title?: string | undefined;
                date?: string | undefined;
                awarder?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        publications?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: string | undefined;
                publisher?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        skills?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                levelNum: number;
                name?: string | undefined;
                level?: string | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        languages?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                levelNum: number;
                name?: string | undefined;
                level?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        interests?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                name?: string | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        references?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                name?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
                summary?: string | null | undefined;
                id?: string | undefined;
                relationship?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        projects?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
                keywords?: (string | null)[] | undefined;
                id?: string | undefined;
                description?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
        certifications?: {
            type: "work" | "custom" | "basic";
            visible: boolean;
            items: ({
                url?: string | undefined;
                name?: string | undefined;
                summary?: string | null | undefined;
                date?: string | undefined;
                issuer?: string | undefined;
                id?: string | undefined;
            } | null)[];
            name?: string | undefined;
            id?: string | undefined;
            columns?: number | null | undefined;
        } | undefined;
    };
    metadata?: {
        date?: {
            format?: string | undefined;
        } | undefined;
        css?: {
            visible: boolean;
            value?: string | undefined;
        } | undefined;
        theme?: {
            text?: string | undefined;
            primary?: string | undefined;
            background?: string | undefined;
        } | undefined;
        layout?: (string | null)[][][] | undefined;
        locale?: string | undefined;
        template?: string | undefined;
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
    } | undefined;
}>;
export type ReactiveResumeV3 = z.infer<typeof reactiveResumeV3Schema>;
