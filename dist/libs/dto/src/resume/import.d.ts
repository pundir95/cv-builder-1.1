import { z } from "zod";
export declare const importResumeSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    visibility: z.ZodOptional<z.ZodDefault<z.ZodEnum<["public", "private"]>>>;
    data: z.ZodObject<{
        basics: z.ZodObject<{
            name: z.ZodString;
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
        sections: z.ZodObject<{
            collapse: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"collapse">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    name: z.ZodString;
                    description: z.ZodString;
                    date: z.ZodString;
                    location: z.ZodString;
                    summary: z.ZodString;
                    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
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
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }, {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "collapse";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            }, {
                id: "collapse";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            summary: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"summary">;
                content: z.ZodDefault<z.ZodString>;
            }>, "strip", z.ZodTypeAny, {
                id: "summary";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                content: string;
            }, {
                id: "summary";
                name: string;
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
                content?: string | undefined;
            }>;
            awards: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"awards">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
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
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "awards";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
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
                }[];
            }, {
                id: "awards";
                name: string;
                items: {
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
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            certifications: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"certifications">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    name: z.ZodString;
                    issuer: z.ZodString;
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
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                }, {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                    id?: string | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "certifications";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                }[];
            }, {
                id: "certifications";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            education: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"education">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    institution: z.ZodString;
                    studyType: z.ZodString;
                    area: z.ZodString;
                    score: z.ZodString;
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
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                }, {
                    visible: boolean;
                    date: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                    id?: string | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "education";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                }[];
            }, {
                id: "education";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            experience: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"experience">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    company: z.ZodString;
                    position: z.ZodString;
                    location: z.ZodString;
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
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                }, {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                    id?: string | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "experience";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                }[];
            }, {
                id: "experience";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            volunteer: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"volunteer">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    organization: z.ZodString;
                    position: z.ZodString;
                    location: z.ZodString;
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
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                }, {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                    id?: string | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "volunteer";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                }[];
            }, {
                id: "volunteer";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            interests: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"interests">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    name: z.ZodString;
                    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                }>, "strip", z.ZodTypeAny, {
                    id: string;
                    visible: boolean;
                    name: string;
                    keywords: string[];
                }, {
                    visible: boolean;
                    name: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "interests";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    keywords: string[];
                }[];
            }, {
                id: "interests";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            languages: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"languages">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    name: z.ZodString;
                    description: z.ZodString;
                    level: z.ZodDefault<z.ZodNumber>;
                }>, "strip", z.ZodTypeAny, {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    level: number;
                }, {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    level?: number | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "languages";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    level: number;
                }[];
            }, {
                id: "languages";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    level?: number | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            profiles: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"profiles">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
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
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "profiles";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    icon: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    network: string;
                    username: string;
                }[];
            }, {
                id: "profiles";
                name: string;
                items: {
                    visible: boolean;
                    icon: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    network: string;
                    username: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            projects: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"projects">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    name: z.ZodString;
                    description: z.ZodString;
                    date: z.ZodString;
                    summary: z.ZodString;
                    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
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
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }, {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "projects";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            }, {
                id: "projects";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            publications: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"publications">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    name: z.ZodString;
                    publisher: z.ZodString;
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
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                }, {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                    id?: string | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "publications";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                }[];
            }, {
                id: "publications";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            references: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"references">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    name: z.ZodString;
                    description: z.ZodString;
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
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                }, {
                    visible: boolean;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "references";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                }[];
            }, {
                id: "references";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            skills: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"skills">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    name: z.ZodString;
                    description: z.ZodString;
                    level: z.ZodDefault<z.ZodNumber>;
                    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                }>, "strip", z.ZodTypeAny, {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    keywords: string[];
                    level: number;
                }, {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                    level?: number | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "skills";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    keywords: string[];
                    level: number;
                }[];
            }, {
                id: "skills";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                    level?: number | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            custom: z.ZodRecord<z.ZodString, z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodDefault<z.ZodString>;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    name: z.ZodString;
                    description: z.ZodString;
                    date: z.ZodString;
                    location: z.ZodString;
                    summary: z.ZodString;
                    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
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
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }, {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: string;
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            }, {
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                id?: string | undefined;
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            custom: Record<string, {
                id: string;
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            }>;
            profiles: {
                id: "profiles";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    icon: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    network: string;
                    username: string;
                }[];
            };
            summary: {
                id: "summary";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                content: string;
            };
            experience: {
                id: "experience";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                }[];
            };
            education: {
                id: "education";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                }[];
            };
            projects: {
                id: "projects";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            };
            volunteer: {
                id: "volunteer";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                }[];
            };
            references: {
                id: "references";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                }[];
            };
            skills: {
                id: "skills";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    keywords: string[];
                    level: number;
                }[];
            };
            interests: {
                id: "interests";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    keywords: string[];
                }[];
            };
            certifications: {
                id: "certifications";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                }[];
            };
            awards: {
                id: "awards";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
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
                }[];
            };
            publications: {
                id: "publications";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                }[];
            };
            languages: {
                id: "languages";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    level: number;
                }[];
            };
            collapse: {
                id: "collapse";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            };
        }, {
            custom: Record<string, {
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                id?: string | undefined;
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            profiles: {
                id: "profiles";
                name: string;
                items: {
                    visible: boolean;
                    icon: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    network: string;
                    username: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            summary: {
                id: "summary";
                name: string;
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
                content?: string | undefined;
            };
            experience: {
                id: "experience";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            education: {
                id: "education";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            projects: {
                id: "projects";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            volunteer: {
                id: "volunteer";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            references: {
                id: "references";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            skills: {
                id: "skills";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                    level?: number | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            interests: {
                id: "interests";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            certifications: {
                id: "certifications";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            awards: {
                id: "awards";
                name: string;
                items: {
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
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            publications: {
                id: "publications";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            languages: {
                id: "languages";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    level?: number | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            collapse: {
                id: "collapse";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
        }>;
        metadata: z.ZodObject<{
            template: z.ZodObject<{
                name: z.ZodDefault<z.ZodString>;
                id: z.ZodDefault<z.ZodNumber>;
                withPhoto: z.ZodDefault<z.ZodBoolean>;
                withoutPhoto: z.ZodDefault<z.ZodBoolean>;
                oneColumn: z.ZodDefault<z.ZodBoolean>;
                twoColumn: z.ZodDefault<z.ZodBoolean>;
                progress: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                id: number;
                name: string;
                withPhoto: boolean;
                withoutPhoto: boolean;
                oneColumn: boolean;
                twoColumn: boolean;
                progress: number;
            }, {
                id?: number | undefined;
                name?: string | undefined;
                withPhoto?: boolean | undefined;
                withoutPhoto?: boolean | undefined;
                oneColumn?: boolean | undefined;
                twoColumn?: boolean | undefined;
                progress?: number | undefined;
            }>;
            layout: z.ZodDefault<z.ZodArray<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">, "many">>;
            css: z.ZodObject<{
                value: z.ZodDefault<z.ZodString>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                visible: boolean;
                value: string;
            }, {
                visible?: boolean | undefined;
                value?: string | undefined;
            }>;
            page: z.ZodObject<{
                margin: z.ZodDefault<z.ZodNumber>;
                format: z.ZodDefault<z.ZodEnum<["a4", "letter"]>>;
                options: z.ZodObject<{
                    breakLine: z.ZodDefault<z.ZodBoolean>;
                    pageNumbers: z.ZodDefault<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    breakLine: boolean;
                    pageNumbers: boolean;
                }, {
                    breakLine?: boolean | undefined;
                    pageNumbers?: boolean | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                options: {
                    breakLine: boolean;
                    pageNumbers: boolean;
                };
                margin: number;
                format: "a4" | "letter";
            }, {
                options: {
                    breakLine?: boolean | undefined;
                    pageNumbers?: boolean | undefined;
                };
                margin?: number | undefined;
                format?: "a4" | "letter" | undefined;
            }>;
            theme: z.ZodObject<{
                background: z.ZodDefault<z.ZodString>;
                text: z.ZodDefault<z.ZodString>;
                primary: z.ZodDefault<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                background: string;
                text: string;
                primary: string;
            }, {
                background?: string | undefined;
                text?: string | undefined;
                primary?: string | undefined;
            }>;
            typography: z.ZodObject<{
                font: z.ZodObject<{
                    family: z.ZodDefault<z.ZodString>;
                    subset: z.ZodDefault<z.ZodString>;
                    variants: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                    size: z.ZodDefault<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    size: number;
                    family: string;
                    subset: string;
                    variants: string[];
                }, {
                    size?: number | undefined;
                    family?: string | undefined;
                    subset?: string | undefined;
                    variants?: string[] | undefined;
                }>;
                lineHeight: z.ZodDefault<z.ZodNumber>;
                hideIcons: z.ZodDefault<z.ZodBoolean>;
                underlineLinks: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                font: {
                    size: number;
                    family: string;
                    subset: string;
                    variants: string[];
                };
                lineHeight: number;
                hideIcons: boolean;
                underlineLinks: boolean;
            }, {
                font: {
                    size?: number | undefined;
                    family?: string | undefined;
                    subset?: string | undefined;
                    variants?: string[] | undefined;
                };
                lineHeight?: number | undefined;
                hideIcons?: boolean | undefined;
                underlineLinks?: boolean | undefined;
            }>;
            notes: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            template: {
                id: number;
                name: string;
                withPhoto: boolean;
                withoutPhoto: boolean;
                oneColumn: boolean;
                twoColumn: boolean;
                progress: number;
            };
            layout: string[][][];
            css: {
                visible: boolean;
                value: string;
            };
            page: {
                options: {
                    breakLine: boolean;
                    pageNumbers: boolean;
                };
                margin: number;
                format: "a4" | "letter";
            };
            theme: {
                background: string;
                text: string;
                primary: string;
            };
            typography: {
                font: {
                    size: number;
                    family: string;
                    subset: string;
                    variants: string[];
                };
                lineHeight: number;
                hideIcons: boolean;
                underlineLinks: boolean;
            };
            notes: string;
        }, {
            template: {
                id?: number | undefined;
                name?: string | undefined;
                withPhoto?: boolean | undefined;
                withoutPhoto?: boolean | undefined;
                oneColumn?: boolean | undefined;
                twoColumn?: boolean | undefined;
                progress?: number | undefined;
            };
            css: {
                visible?: boolean | undefined;
                value?: string | undefined;
            };
            page: {
                options: {
                    breakLine?: boolean | undefined;
                    pageNumbers?: boolean | undefined;
                };
                margin?: number | undefined;
                format?: "a4" | "letter" | undefined;
            };
            theme: {
                background?: string | undefined;
                text?: string | undefined;
                primary?: string | undefined;
            };
            typography: {
                font: {
                    size?: number | undefined;
                    family?: string | undefined;
                    subset?: string | undefined;
                    variants?: string[] | undefined;
                };
                lineHeight?: number | undefined;
                hideIcons?: boolean | undefined;
                underlineLinks?: boolean | undefined;
            };
            layout?: string[][][] | undefined;
            notes?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        basics: {
            name: string;
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
        };
        sections: {
            custom: Record<string, {
                id: string;
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            }>;
            profiles: {
                id: "profiles";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    icon: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    network: string;
                    username: string;
                }[];
            };
            summary: {
                id: "summary";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                content: string;
            };
            experience: {
                id: "experience";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                }[];
            };
            education: {
                id: "education";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                }[];
            };
            projects: {
                id: "projects";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            };
            volunteer: {
                id: "volunteer";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                }[];
            };
            references: {
                id: "references";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                }[];
            };
            skills: {
                id: "skills";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    keywords: string[];
                    level: number;
                }[];
            };
            interests: {
                id: "interests";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    keywords: string[];
                }[];
            };
            certifications: {
                id: "certifications";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                }[];
            };
            awards: {
                id: "awards";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
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
                }[];
            };
            publications: {
                id: "publications";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                }[];
            };
            languages: {
                id: "languages";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    level: number;
                }[];
            };
            collapse: {
                id: "collapse";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            };
        };
        metadata: {
            template: {
                id: number;
                name: string;
                withPhoto: boolean;
                withoutPhoto: boolean;
                oneColumn: boolean;
                twoColumn: boolean;
                progress: number;
            };
            layout: string[][][];
            css: {
                visible: boolean;
                value: string;
            };
            page: {
                options: {
                    breakLine: boolean;
                    pageNumbers: boolean;
                };
                margin: number;
                format: "a4" | "letter";
            };
            theme: {
                background: string;
                text: string;
                primary: string;
            };
            typography: {
                font: {
                    size: number;
                    family: string;
                    subset: string;
                    variants: string[];
                };
                lineHeight: number;
                hideIcons: boolean;
                underlineLinks: boolean;
            };
            notes: string;
        };
    }, {
        basics: {
            name: string;
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
        };
        sections: {
            custom: Record<string, {
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                id?: string | undefined;
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            profiles: {
                id: "profiles";
                name: string;
                items: {
                    visible: boolean;
                    icon: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    network: string;
                    username: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            summary: {
                id: "summary";
                name: string;
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
                content?: string | undefined;
            };
            experience: {
                id: "experience";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            education: {
                id: "education";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            projects: {
                id: "projects";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            volunteer: {
                id: "volunteer";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            references: {
                id: "references";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            skills: {
                id: "skills";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                    level?: number | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            interests: {
                id: "interests";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            certifications: {
                id: "certifications";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            awards: {
                id: "awards";
                name: string;
                items: {
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
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            publications: {
                id: "publications";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            languages: {
                id: "languages";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    level?: number | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            collapse: {
                id: "collapse";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
        };
        metadata: {
            template: {
                id?: number | undefined;
                name?: string | undefined;
                withPhoto?: boolean | undefined;
                withoutPhoto?: boolean | undefined;
                oneColumn?: boolean | undefined;
                twoColumn?: boolean | undefined;
                progress?: number | undefined;
            };
            css: {
                visible?: boolean | undefined;
                value?: string | undefined;
            };
            page: {
                options: {
                    breakLine?: boolean | undefined;
                    pageNumbers?: boolean | undefined;
                };
                margin?: number | undefined;
                format?: "a4" | "letter" | undefined;
            };
            theme: {
                background?: string | undefined;
                text?: string | undefined;
                primary?: string | undefined;
            };
            typography: {
                font: {
                    size?: number | undefined;
                    family?: string | undefined;
                    subset?: string | undefined;
                    variants?: string[] | undefined;
                };
                lineHeight?: number | undefined;
                hideIcons?: boolean | undefined;
                underlineLinks?: boolean | undefined;
            };
            layout?: string[][][] | undefined;
            notes?: string | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        basics: {
            name: string;
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
        };
        sections: {
            custom: Record<string, {
                id: string;
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            }>;
            profiles: {
                id: "profiles";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    icon: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    network: string;
                    username: string;
                }[];
            };
            summary: {
                id: "summary";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                content: string;
            };
            experience: {
                id: "experience";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                }[];
            };
            education: {
                id: "education";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                }[];
            };
            projects: {
                id: "projects";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            };
            volunteer: {
                id: "volunteer";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                }[];
            };
            references: {
                id: "references";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                }[];
            };
            skills: {
                id: "skills";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    keywords: string[];
                    level: number;
                }[];
            };
            interests: {
                id: "interests";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    keywords: string[];
                }[];
            };
            certifications: {
                id: "certifications";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                }[];
            };
            awards: {
                id: "awards";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
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
                }[];
            };
            publications: {
                id: "publications";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                }[];
            };
            languages: {
                id: "languages";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    level: number;
                }[];
            };
            collapse: {
                id: "collapse";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            };
        };
        metadata: {
            template: {
                id: number;
                name: string;
                withPhoto: boolean;
                withoutPhoto: boolean;
                oneColumn: boolean;
                twoColumn: boolean;
                progress: number;
            };
            layout: string[][][];
            css: {
                visible: boolean;
                value: string;
            };
            page: {
                options: {
                    breakLine: boolean;
                    pageNumbers: boolean;
                };
                margin: number;
                format: "a4" | "letter";
            };
            theme: {
                background: string;
                text: string;
                primary: string;
            };
            typography: {
                font: {
                    size: number;
                    family: string;
                    subset: string;
                    variants: string[];
                };
                lineHeight: number;
                hideIcons: boolean;
                underlineLinks: boolean;
            };
            notes: string;
        };
    };
    title?: string | undefined;
    slug?: string | undefined;
    visibility?: "public" | "private" | undefined;
}, {
    data: {
        basics: {
            name: string;
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
        };
        sections: {
            custom: Record<string, {
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                id?: string | undefined;
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            profiles: {
                id: "profiles";
                name: string;
                items: {
                    visible: boolean;
                    icon: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    network: string;
                    username: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            summary: {
                id: "summary";
                name: string;
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
                content?: string | undefined;
            };
            experience: {
                id: "experience";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            education: {
                id: "education";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            projects: {
                id: "projects";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            volunteer: {
                id: "volunteer";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            references: {
                id: "references";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            skills: {
                id: "skills";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                    level?: number | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            interests: {
                id: "interests";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            certifications: {
                id: "certifications";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            awards: {
                id: "awards";
                name: string;
                items: {
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
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            publications: {
                id: "publications";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            languages: {
                id: "languages";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    level?: number | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            collapse: {
                id: "collapse";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
        };
        metadata: {
            template: {
                id?: number | undefined;
                name?: string | undefined;
                withPhoto?: boolean | undefined;
                withoutPhoto?: boolean | undefined;
                oneColumn?: boolean | undefined;
                twoColumn?: boolean | undefined;
                progress?: number | undefined;
            };
            css: {
                visible?: boolean | undefined;
                value?: string | undefined;
            };
            page: {
                options: {
                    breakLine?: boolean | undefined;
                    pageNumbers?: boolean | undefined;
                };
                margin?: number | undefined;
                format?: "a4" | "letter" | undefined;
            };
            theme: {
                background?: string | undefined;
                text?: string | undefined;
                primary?: string | undefined;
            };
            typography: {
                font: {
                    size?: number | undefined;
                    family?: string | undefined;
                    subset?: string | undefined;
                    variants?: string[] | undefined;
                };
                lineHeight?: number | undefined;
                hideIcons?: boolean | undefined;
                underlineLinks?: boolean | undefined;
            };
            layout?: string[][][] | undefined;
            notes?: string | undefined;
        };
    };
    title?: string | undefined;
    slug?: string | undefined;
    visibility?: "public" | "private" | undefined;
}>;
declare const ImportResumeDto_base: import("nestjs-zod/dto").ZodDto<{
    data: {
        basics: {
            name: string;
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
        };
        sections: {
            custom: Record<string, {
                id: string;
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            }>;
            profiles: {
                id: "profiles";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    icon: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    network: string;
                    username: string;
                }[];
            };
            summary: {
                id: "summary";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                content: string;
            };
            experience: {
                id: "experience";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                }[];
            };
            education: {
                id: "education";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                }[];
            };
            projects: {
                id: "projects";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            };
            volunteer: {
                id: "volunteer";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                }[];
            };
            references: {
                id: "references";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                }[];
            };
            skills: {
                id: "skills";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    keywords: string[];
                    level: number;
                }[];
            };
            interests: {
                id: "interests";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    keywords: string[];
                }[];
            };
            certifications: {
                id: "certifications";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                }[];
            };
            awards: {
                id: "awards";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
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
                }[];
            };
            publications: {
                id: "publications";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                }[];
            };
            languages: {
                id: "languages";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    level: number;
                }[];
            };
            collapse: {
                id: "collapse";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            };
        };
        metadata: {
            template: {
                id: number;
                name: string;
                withPhoto: boolean;
                withoutPhoto: boolean;
                oneColumn: boolean;
                twoColumn: boolean;
                progress: number;
            };
            layout: string[][][];
            css: {
                visible: boolean;
                value: string;
            };
            page: {
                options: {
                    breakLine: boolean;
                    pageNumbers: boolean;
                };
                margin: number;
                format: "a4" | "letter";
            };
            theme: {
                background: string;
                text: string;
                primary: string;
            };
            typography: {
                font: {
                    size: number;
                    family: string;
                    subset: string;
                    variants: string[];
                };
                lineHeight: number;
                hideIcons: boolean;
                underlineLinks: boolean;
            };
            notes: string;
        };
    };
    title?: string | undefined;
    slug?: string | undefined;
    visibility?: "public" | "private" | undefined;
}, z.ZodObjectDef<{
    title: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    visibility: z.ZodOptional<z.ZodDefault<z.ZodEnum<["public", "private"]>>>;
    data: z.ZodObject<{
        basics: z.ZodObject<{
            name: z.ZodString;
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
        sections: z.ZodObject<{
            collapse: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"collapse">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    name: z.ZodString;
                    description: z.ZodString;
                    date: z.ZodString;
                    location: z.ZodString;
                    summary: z.ZodString;
                    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
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
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }, {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "collapse";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            }, {
                id: "collapse";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            summary: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"summary">;
                content: z.ZodDefault<z.ZodString>;
            }>, "strip", z.ZodTypeAny, {
                id: "summary";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                content: string;
            }, {
                id: "summary";
                name: string;
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
                content?: string | undefined;
            }>;
            awards: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"awards">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
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
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "awards";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
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
                }[];
            }, {
                id: "awards";
                name: string;
                items: {
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
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            certifications: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"certifications">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    name: z.ZodString;
                    issuer: z.ZodString;
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
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                }, {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                    id?: string | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "certifications";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                }[];
            }, {
                id: "certifications";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            education: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"education">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    institution: z.ZodString;
                    studyType: z.ZodString;
                    area: z.ZodString;
                    score: z.ZodString;
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
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                }, {
                    visible: boolean;
                    date: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                    id?: string | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "education";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                }[];
            }, {
                id: "education";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            experience: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"experience">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    company: z.ZodString;
                    position: z.ZodString;
                    location: z.ZodString;
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
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                }, {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                    id?: string | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "experience";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                }[];
            }, {
                id: "experience";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            volunteer: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"volunteer">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    organization: z.ZodString;
                    position: z.ZodString;
                    location: z.ZodString;
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
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                }, {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                    id?: string | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "volunteer";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                }[];
            }, {
                id: "volunteer";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            interests: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"interests">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    name: z.ZodString;
                    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                }>, "strip", z.ZodTypeAny, {
                    id: string;
                    visible: boolean;
                    name: string;
                    keywords: string[];
                }, {
                    visible: boolean;
                    name: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "interests";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    keywords: string[];
                }[];
            }, {
                id: "interests";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            languages: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"languages">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    name: z.ZodString;
                    description: z.ZodString;
                    level: z.ZodDefault<z.ZodNumber>;
                }>, "strip", z.ZodTypeAny, {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    level: number;
                }, {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    level?: number | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "languages";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    level: number;
                }[];
            }, {
                id: "languages";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    level?: number | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            profiles: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"profiles">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
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
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "profiles";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    icon: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    network: string;
                    username: string;
                }[];
            }, {
                id: "profiles";
                name: string;
                items: {
                    visible: boolean;
                    icon: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    network: string;
                    username: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            projects: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"projects">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    name: z.ZodString;
                    description: z.ZodString;
                    date: z.ZodString;
                    summary: z.ZodString;
                    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
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
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }, {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "projects";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            }, {
                id: "projects";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            publications: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"publications">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    name: z.ZodString;
                    publisher: z.ZodString;
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
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                }, {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                    id?: string | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "publications";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                }[];
            }, {
                id: "publications";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            references: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"references">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    name: z.ZodString;
                    description: z.ZodString;
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
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                }, {
                    visible: boolean;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "references";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                }[];
            }, {
                id: "references";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            skills: z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodLiteral<"skills">;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    name: z.ZodString;
                    description: z.ZodString;
                    level: z.ZodDefault<z.ZodNumber>;
                    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                }>, "strip", z.ZodTypeAny, {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    keywords: string[];
                    level: number;
                }, {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                    level?: number | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: "skills";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    keywords: string[];
                    level: number;
                }[];
            }, {
                id: "skills";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                    level?: number | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            custom: z.ZodRecord<z.ZodString, z.ZodObject<z.objectUtil.extendShape<{
                name: z.ZodString;
                columns: z.ZodDefault<z.ZodNumber>;
                separateLinks: z.ZodDefault<z.ZodBoolean>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, {
                id: z.ZodDefault<z.ZodString>;
                items: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodDefault<z.ZodString>;
                    visible: z.ZodBoolean;
                }, {
                    name: z.ZodString;
                    description: z.ZodString;
                    date: z.ZodString;
                    location: z.ZodString;
                    summary: z.ZodString;
                    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
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
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }, {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                id: string;
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            }, {
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                id?: string | undefined;
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            custom: Record<string, {
                id: string;
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            }>;
            profiles: {
                id: "profiles";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    icon: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    network: string;
                    username: string;
                }[];
            };
            summary: {
                id: "summary";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                content: string;
            };
            experience: {
                id: "experience";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                }[];
            };
            education: {
                id: "education";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                }[];
            };
            projects: {
                id: "projects";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            };
            volunteer: {
                id: "volunteer";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                }[];
            };
            references: {
                id: "references";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                }[];
            };
            skills: {
                id: "skills";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    keywords: string[];
                    level: number;
                }[];
            };
            interests: {
                id: "interests";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    keywords: string[];
                }[];
            };
            certifications: {
                id: "certifications";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                }[];
            };
            awards: {
                id: "awards";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
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
                }[];
            };
            publications: {
                id: "publications";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                }[];
            };
            languages: {
                id: "languages";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    level: number;
                }[];
            };
            collapse: {
                id: "collapse";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            };
        }, {
            custom: Record<string, {
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                id?: string | undefined;
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            profiles: {
                id: "profiles";
                name: string;
                items: {
                    visible: boolean;
                    icon: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    network: string;
                    username: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            summary: {
                id: "summary";
                name: string;
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
                content?: string | undefined;
            };
            experience: {
                id: "experience";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            education: {
                id: "education";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            projects: {
                id: "projects";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            volunteer: {
                id: "volunteer";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            references: {
                id: "references";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            skills: {
                id: "skills";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                    level?: number | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            interests: {
                id: "interests";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            certifications: {
                id: "certifications";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            awards: {
                id: "awards";
                name: string;
                items: {
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
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            publications: {
                id: "publications";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            languages: {
                id: "languages";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    level?: number | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            collapse: {
                id: "collapse";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
        }>;
        metadata: z.ZodObject<{
            template: z.ZodObject<{
                name: z.ZodDefault<z.ZodString>;
                id: z.ZodDefault<z.ZodNumber>;
                withPhoto: z.ZodDefault<z.ZodBoolean>;
                withoutPhoto: z.ZodDefault<z.ZodBoolean>;
                oneColumn: z.ZodDefault<z.ZodBoolean>;
                twoColumn: z.ZodDefault<z.ZodBoolean>;
                progress: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                id: number;
                name: string;
                withPhoto: boolean;
                withoutPhoto: boolean;
                oneColumn: boolean;
                twoColumn: boolean;
                progress: number;
            }, {
                id?: number | undefined;
                name?: string | undefined;
                withPhoto?: boolean | undefined;
                withoutPhoto?: boolean | undefined;
                oneColumn?: boolean | undefined;
                twoColumn?: boolean | undefined;
                progress?: number | undefined;
            }>;
            layout: z.ZodDefault<z.ZodArray<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">, "many">>;
            css: z.ZodObject<{
                value: z.ZodDefault<z.ZodString>;
                visible: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                visible: boolean;
                value: string;
            }, {
                visible?: boolean | undefined;
                value?: string | undefined;
            }>;
            page: z.ZodObject<{
                margin: z.ZodDefault<z.ZodNumber>;
                format: z.ZodDefault<z.ZodEnum<["a4", "letter"]>>;
                options: z.ZodObject<{
                    breakLine: z.ZodDefault<z.ZodBoolean>;
                    pageNumbers: z.ZodDefault<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    breakLine: boolean;
                    pageNumbers: boolean;
                }, {
                    breakLine?: boolean | undefined;
                    pageNumbers?: boolean | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                options: {
                    breakLine: boolean;
                    pageNumbers: boolean;
                };
                margin: number;
                format: "a4" | "letter";
            }, {
                options: {
                    breakLine?: boolean | undefined;
                    pageNumbers?: boolean | undefined;
                };
                margin?: number | undefined;
                format?: "a4" | "letter" | undefined;
            }>;
            theme: z.ZodObject<{
                background: z.ZodDefault<z.ZodString>;
                text: z.ZodDefault<z.ZodString>;
                primary: z.ZodDefault<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                background: string;
                text: string;
                primary: string;
            }, {
                background?: string | undefined;
                text?: string | undefined;
                primary?: string | undefined;
            }>;
            typography: z.ZodObject<{
                font: z.ZodObject<{
                    family: z.ZodDefault<z.ZodString>;
                    subset: z.ZodDefault<z.ZodString>;
                    variants: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                    size: z.ZodDefault<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    size: number;
                    family: string;
                    subset: string;
                    variants: string[];
                }, {
                    size?: number | undefined;
                    family?: string | undefined;
                    subset?: string | undefined;
                    variants?: string[] | undefined;
                }>;
                lineHeight: z.ZodDefault<z.ZodNumber>;
                hideIcons: z.ZodDefault<z.ZodBoolean>;
                underlineLinks: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                font: {
                    size: number;
                    family: string;
                    subset: string;
                    variants: string[];
                };
                lineHeight: number;
                hideIcons: boolean;
                underlineLinks: boolean;
            }, {
                font: {
                    size?: number | undefined;
                    family?: string | undefined;
                    subset?: string | undefined;
                    variants?: string[] | undefined;
                };
                lineHeight?: number | undefined;
                hideIcons?: boolean | undefined;
                underlineLinks?: boolean | undefined;
            }>;
            notes: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            template: {
                id: number;
                name: string;
                withPhoto: boolean;
                withoutPhoto: boolean;
                oneColumn: boolean;
                twoColumn: boolean;
                progress: number;
            };
            layout: string[][][];
            css: {
                visible: boolean;
                value: string;
            };
            page: {
                options: {
                    breakLine: boolean;
                    pageNumbers: boolean;
                };
                margin: number;
                format: "a4" | "letter";
            };
            theme: {
                background: string;
                text: string;
                primary: string;
            };
            typography: {
                font: {
                    size: number;
                    family: string;
                    subset: string;
                    variants: string[];
                };
                lineHeight: number;
                hideIcons: boolean;
                underlineLinks: boolean;
            };
            notes: string;
        }, {
            template: {
                id?: number | undefined;
                name?: string | undefined;
                withPhoto?: boolean | undefined;
                withoutPhoto?: boolean | undefined;
                oneColumn?: boolean | undefined;
                twoColumn?: boolean | undefined;
                progress?: number | undefined;
            };
            css: {
                visible?: boolean | undefined;
                value?: string | undefined;
            };
            page: {
                options: {
                    breakLine?: boolean | undefined;
                    pageNumbers?: boolean | undefined;
                };
                margin?: number | undefined;
                format?: "a4" | "letter" | undefined;
            };
            theme: {
                background?: string | undefined;
                text?: string | undefined;
                primary?: string | undefined;
            };
            typography: {
                font: {
                    size?: number | undefined;
                    family?: string | undefined;
                    subset?: string | undefined;
                    variants?: string[] | undefined;
                };
                lineHeight?: number | undefined;
                hideIcons?: boolean | undefined;
                underlineLinks?: boolean | undefined;
            };
            layout?: string[][][] | undefined;
            notes?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        basics: {
            name: string;
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
        };
        sections: {
            custom: Record<string, {
                id: string;
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            }>;
            profiles: {
                id: "profiles";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    icon: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    network: string;
                    username: string;
                }[];
            };
            summary: {
                id: "summary";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                content: string;
            };
            experience: {
                id: "experience";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                }[];
            };
            education: {
                id: "education";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                }[];
            };
            projects: {
                id: "projects";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            };
            volunteer: {
                id: "volunteer";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                }[];
            };
            references: {
                id: "references";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                }[];
            };
            skills: {
                id: "skills";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    keywords: string[];
                    level: number;
                }[];
            };
            interests: {
                id: "interests";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    keywords: string[];
                }[];
            };
            certifications: {
                id: "certifications";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                }[];
            };
            awards: {
                id: "awards";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
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
                }[];
            };
            publications: {
                id: "publications";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                }[];
            };
            languages: {
                id: "languages";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    name: string;
                    description: string;
                    level: number;
                }[];
            };
            collapse: {
                id: "collapse";
                visible: boolean;
                name: string;
                columns: number;
                separateLinks: boolean;
                items: {
                    id: string;
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    keywords: string[];
                }[];
            };
        };
        metadata: {
            template: {
                id: number;
                name: string;
                withPhoto: boolean;
                withoutPhoto: boolean;
                oneColumn: boolean;
                twoColumn: boolean;
                progress: number;
            };
            layout: string[][][];
            css: {
                visible: boolean;
                value: string;
            };
            page: {
                options: {
                    breakLine: boolean;
                    pageNumbers: boolean;
                };
                margin: number;
                format: "a4" | "letter";
            };
            theme: {
                background: string;
                text: string;
                primary: string;
            };
            typography: {
                font: {
                    size: number;
                    family: string;
                    subset: string;
                    variants: string[];
                };
                lineHeight: number;
                hideIcons: boolean;
                underlineLinks: boolean;
            };
            notes: string;
        };
    }, {
        basics: {
            name: string;
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
        };
        sections: {
            custom: Record<string, {
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                id?: string | undefined;
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            profiles: {
                id: "profiles";
                name: string;
                items: {
                    visible: boolean;
                    icon: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    network: string;
                    username: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            summary: {
                id: "summary";
                name: string;
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
                content?: string | undefined;
            };
            experience: {
                id: "experience";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            education: {
                id: "education";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            projects: {
                id: "projects";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            volunteer: {
                id: "volunteer";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            references: {
                id: "references";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            skills: {
                id: "skills";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                    level?: number | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            interests: {
                id: "interests";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            certifications: {
                id: "certifications";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            awards: {
                id: "awards";
                name: string;
                items: {
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
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            publications: {
                id: "publications";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            languages: {
                id: "languages";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    level?: number | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            collapse: {
                id: "collapse";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
        };
        metadata: {
            template: {
                id?: number | undefined;
                name?: string | undefined;
                withPhoto?: boolean | undefined;
                withoutPhoto?: boolean | undefined;
                oneColumn?: boolean | undefined;
                twoColumn?: boolean | undefined;
                progress?: number | undefined;
            };
            css: {
                visible?: boolean | undefined;
                value?: string | undefined;
            };
            page: {
                options: {
                    breakLine?: boolean | undefined;
                    pageNumbers?: boolean | undefined;
                };
                margin?: number | undefined;
                format?: "a4" | "letter" | undefined;
            };
            theme: {
                background?: string | undefined;
                text?: string | undefined;
                primary?: string | undefined;
            };
            typography: {
                font: {
                    size?: number | undefined;
                    family?: string | undefined;
                    subset?: string | undefined;
                    variants?: string[] | undefined;
                };
                lineHeight?: number | undefined;
                hideIcons?: boolean | undefined;
                underlineLinks?: boolean | undefined;
            };
            layout?: string[][][] | undefined;
            notes?: string | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny>, {
    data: {
        basics: {
            name: string;
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
        };
        sections: {
            custom: Record<string, {
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                id?: string | undefined;
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            }>;
            profiles: {
                id: "profiles";
                name: string;
                items: {
                    visible: boolean;
                    icon: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    network: string;
                    username: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            summary: {
                id: "summary";
                name: string;
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
                content?: string | undefined;
            };
            experience: {
                id: "experience";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    company: string;
                    position: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            education: {
                id: "education";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    institution: string;
                    studyType: string;
                    area: string;
                    score: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            projects: {
                id: "projects";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            volunteer: {
                id: "volunteer";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    position: string;
                    organization: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            references: {
                id: "references";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            skills: {
                id: "skills";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                    level?: number | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            interests: {
                id: "interests";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            certifications: {
                id: "certifications";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    issuer: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            awards: {
                id: "awards";
                name: string;
                items: {
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
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            publications: {
                id: "publications";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    publisher: string;
                    id?: string | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            languages: {
                id: "languages";
                name: string;
                items: {
                    visible: boolean;
                    name: string;
                    description: string;
                    id?: string | undefined;
                    level?: number | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
            collapse: {
                id: "collapse";
                name: string;
                items: {
                    visible: boolean;
                    date: string;
                    name: string;
                    location: string;
                    url: {
                        label: string;
                        href: string;
                    };
                    summary: string;
                    description: string;
                    id?: string | undefined;
                    keywords?: string[] | undefined;
                }[];
                visible?: boolean | undefined;
                columns?: number | undefined;
                separateLinks?: boolean | undefined;
            };
        };
        metadata: {
            template: {
                id?: number | undefined;
                name?: string | undefined;
                withPhoto?: boolean | undefined;
                withoutPhoto?: boolean | undefined;
                oneColumn?: boolean | undefined;
                twoColumn?: boolean | undefined;
                progress?: number | undefined;
            };
            css: {
                visible?: boolean | undefined;
                value?: string | undefined;
            };
            page: {
                options: {
                    breakLine?: boolean | undefined;
                    pageNumbers?: boolean | undefined;
                };
                margin?: number | undefined;
                format?: "a4" | "letter" | undefined;
            };
            theme: {
                background?: string | undefined;
                text?: string | undefined;
                primary?: string | undefined;
            };
            typography: {
                font: {
                    size?: number | undefined;
                    family?: string | undefined;
                    subset?: string | undefined;
                    variants?: string[] | undefined;
                };
                lineHeight?: number | undefined;
                hideIcons?: boolean | undefined;
                underlineLinks?: boolean | undefined;
            };
            layout?: string[][][] | undefined;
            notes?: string | undefined;
        };
    };
    title?: string | undefined;
    slug?: string | undefined;
    visibility?: "public" | "private" | undefined;
}>;
export declare class ImportResumeDto extends ImportResumeDto_base {
}
export {};
