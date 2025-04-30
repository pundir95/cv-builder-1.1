export declare const updateResumeSchema: import("zod").ZodObject<{
    id: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
    title: import("zod").ZodOptional<import("zod").ZodString>;
    slug: import("zod").ZodOptional<import("zod").ZodString>;
    cv_data: import("zod").ZodOptional<import("zod").ZodAny>;
    cv_template: import("zod").ZodOptional<import("zod").ZodAny>;
    data: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodObject<{
        basics: import("zod").ZodObject<{
            name: import("zod").ZodString;
            headline: import("zod").ZodString;
            email: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
            phone: import("zod").ZodString;
            location: import("zod").ZodString;
            url: import("zod").ZodObject<{
                label: import("zod").ZodString;
                href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
            }, "strip", import("zod").ZodTypeAny, {
                label: string;
                href: string;
            }, {
                label: string;
                href: string;
            }>;
            customFields: import("zod").ZodArray<import("zod").ZodObject<{
                id: import("zod").ZodString;
                icon: import("zod").ZodString;
                name: import("zod").ZodString;
                value: import("zod").ZodString;
            }, "strip", import("zod").ZodTypeAny, {
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
            picture: import("zod").ZodObject<{
                url: import("zod").ZodString;
                size: import("zod").ZodDefault<import("zod").ZodNumber>;
                aspectRatio: import("zod").ZodDefault<import("zod").ZodNumber>;
                borderRadius: import("zod").ZodDefault<import("zod").ZodNumber>;
                effects: import("zod").ZodObject<{
                    hidden: import("zod").ZodDefault<import("zod").ZodBoolean>;
                    border: import("zod").ZodDefault<import("zod").ZodBoolean>;
                    grayscale: import("zod").ZodDefault<import("zod").ZodBoolean>;
                }, "strip", import("zod").ZodTypeAny, {
                    hidden: boolean;
                    border: boolean;
                    grayscale: boolean;
                }, {
                    hidden?: boolean | undefined;
                    border?: boolean | undefined;
                    grayscale?: boolean | undefined;
                }>;
            }, "strip", import("zod").ZodTypeAny, {
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
        }, "strip", import("zod").ZodTypeAny, {
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
        sections: import("zod").ZodObject<{
            collapse: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"collapse">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    name: import("zod").ZodString;
                    description: import("zod").ZodString;
                    date: import("zod").ZodString;
                    location: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    keywords: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            summary: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"summary">;
                content: import("zod").ZodDefault<import("zod").ZodString>;
            }>, "strip", import("zod").ZodTypeAny, {
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
            awards: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"awards">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    title: import("zod").ZodString;
                    awarder: import("zod").ZodString;
                    date: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            certifications: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"certifications">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    name: import("zod").ZodString;
                    issuer: import("zod").ZodString;
                    date: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            education: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"education">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    institution: import("zod").ZodString;
                    studyType: import("zod").ZodString;
                    area: import("zod").ZodString;
                    score: import("zod").ZodString;
                    date: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            experience: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"experience">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    company: import("zod").ZodString;
                    position: import("zod").ZodString;
                    location: import("zod").ZodString;
                    date: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            volunteer: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"volunteer">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    organization: import("zod").ZodString;
                    position: import("zod").ZodString;
                    location: import("zod").ZodString;
                    date: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            interests: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"interests">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    name: import("zod").ZodString;
                    keywords: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            languages: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"languages">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    name: import("zod").ZodString;
                    description: import("zod").ZodString;
                    level: import("zod").ZodDefault<import("zod").ZodNumber>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            profiles: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"profiles">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    network: import("zod").ZodString;
                    username: import("zod").ZodString;
                    icon: import("zod").ZodString;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            projects: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"projects">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    name: import("zod").ZodString;
                    description: import("zod").ZodString;
                    date: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    keywords: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            publications: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"publications">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    name: import("zod").ZodString;
                    publisher: import("zod").ZodString;
                    date: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            references: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"references">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    name: import("zod").ZodString;
                    description: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            skills: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"skills">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    name: import("zod").ZodString;
                    description: import("zod").ZodString;
                    level: import("zod").ZodDefault<import("zod").ZodNumber>;
                    keywords: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            custom: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodDefault<import("zod").ZodString>;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    name: import("zod").ZodString;
                    description: import("zod").ZodString;
                    date: import("zod").ZodString;
                    location: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    keywords: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
        }, "strip", import("zod").ZodTypeAny, {
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
        metadata: import("zod").ZodObject<{
            template: import("zod").ZodObject<{
                name: import("zod").ZodDefault<import("zod").ZodString>;
                id: import("zod").ZodDefault<import("zod").ZodNumber>;
                withPhoto: import("zod").ZodDefault<import("zod").ZodBoolean>;
                withoutPhoto: import("zod").ZodDefault<import("zod").ZodBoolean>;
                oneColumn: import("zod").ZodDefault<import("zod").ZodBoolean>;
                twoColumn: import("zod").ZodDefault<import("zod").ZodBoolean>;
                progress: import("zod").ZodDefault<import("zod").ZodNumber>;
            }, "strip", import("zod").ZodTypeAny, {
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
            layout: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodArray<import("zod").ZodArray<import("zod").ZodString, "many">, "many">, "many">>;
            css: import("zod").ZodObject<{
                value: import("zod").ZodDefault<import("zod").ZodString>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, "strip", import("zod").ZodTypeAny, {
                visible: boolean;
                value: string;
            }, {
                visible?: boolean | undefined;
                value?: string | undefined;
            }>;
            page: import("zod").ZodObject<{
                margin: import("zod").ZodDefault<import("zod").ZodNumber>;
                format: import("zod").ZodDefault<import("zod").ZodEnum<["a4", "letter"]>>;
                options: import("zod").ZodObject<{
                    breakLine: import("zod").ZodDefault<import("zod").ZodBoolean>;
                    pageNumbers: import("zod").ZodDefault<import("zod").ZodBoolean>;
                }, "strip", import("zod").ZodTypeAny, {
                    breakLine: boolean;
                    pageNumbers: boolean;
                }, {
                    breakLine?: boolean | undefined;
                    pageNumbers?: boolean | undefined;
                }>;
            }, "strip", import("zod").ZodTypeAny, {
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
            theme: import("zod").ZodObject<{
                background: import("zod").ZodDefault<import("zod").ZodString>;
                text: import("zod").ZodDefault<import("zod").ZodString>;
                primary: import("zod").ZodDefault<import("zod").ZodString>;
            }, "strip", import("zod").ZodTypeAny, {
                background: string;
                text: string;
                primary: string;
            }, {
                background?: string | undefined;
                text?: string | undefined;
                primary?: string | undefined;
            }>;
            typography: import("zod").ZodObject<{
                font: import("zod").ZodObject<{
                    family: import("zod").ZodDefault<import("zod").ZodString>;
                    subset: import("zod").ZodDefault<import("zod").ZodString>;
                    variants: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
                    size: import("zod").ZodDefault<import("zod").ZodNumber>;
                }, "strip", import("zod").ZodTypeAny, {
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
                lineHeight: import("zod").ZodDefault<import("zod").ZodNumber>;
                hideIcons: import("zod").ZodDefault<import("zod").ZodBoolean>;
                underlineLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, "strip", import("zod").ZodTypeAny, {
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
            notes: import("zod").ZodDefault<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
    }, "strip", import("zod").ZodTypeAny, {
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
    }>>>;
    visibility: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEnum<["private", "public"]>>>;
    locked: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodBoolean>>;
    userId: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
    user: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodObject<{
        id: import("zod").ZodDefault<import("zod").ZodString>;
        first_name: import("zod").ZodString;
        last_name: import("zod").ZodString;
        picture: import("zod").ZodUnion<[import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodNull]>, import("zod").ZodString]>;
        phone_number: import("zod").ZodString;
        username: import("zod").ZodEffects<import("zod").ZodString, string, string>;
        email: import("zod").ZodEffects<import("zod").ZodString, string, string>;
        locale: import("zod").ZodDefault<import("zod").ZodString>;
        emailVerified: import("zod").ZodDefault<import("zod").ZodBoolean>;
        twoFactorEnabled: import("zod").ZodDefault<import("zod").ZodBoolean>;
        provider: import("zod").ZodDefault<import("zod").ZodEnum<["email", "github", "google", "openid"]>>;
        createdAt: import("zod").ZodEffects<import("zod").ZodUnion<[import("zod").ZodDate, import("zod").ZodString]>, Date, string | Date>;
        updatedAt: import("zod").ZodEffects<import("zod").ZodUnion<[import("zod").ZodDate, import("zod").ZodString]>, Date, string | Date>;
    }, "strip", import("zod").ZodTypeAny, {
        email: string;
        id: string;
        first_name: string;
        last_name: string;
        picture: string | null;
        phone_number: string;
        username: string;
        locale: string;
        emailVerified: boolean;
        twoFactorEnabled: boolean;
        provider: "email" | "github" | "google" | "openid";
        createdAt: Date;
        updatedAt: Date;
    }, {
        email: string;
        first_name: string;
        last_name: string;
        picture: string | null;
        phone_number: string;
        username: string;
        createdAt: string | Date;
        updatedAt: string | Date;
        id?: string | undefined;
        locale?: string | undefined;
        emailVerified?: boolean | undefined;
        twoFactorEnabled?: boolean | undefined;
        provider?: "email" | "github" | "google" | "openid" | undefined;
    }>>>;
    createdAt: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodUnion<[import("zod").ZodDate, import("zod").ZodString]>, Date, string | Date>>;
    updatedAt: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodUnion<[import("zod").ZodDate, import("zod").ZodString]>, Date, string | Date>>;
}, "strip", import("zod").ZodTypeAny, {
    id?: string | undefined;
    userId?: string | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    data?: {
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
    } | undefined;
    user?: {
        email: string;
        id: string;
        first_name: string;
        last_name: string;
        picture: string | null;
        phone_number: string;
        username: string;
        locale: string;
        emailVerified: boolean;
        twoFactorEnabled: boolean;
        provider: "email" | "github" | "google" | "openid";
        createdAt: Date;
        updatedAt: Date;
    } | undefined;
    title?: string | undefined;
    cv_template?: any;
    cv_data?: any;
    slug?: string | undefined;
    visibility?: "public" | "private" | undefined;
    locked?: boolean | undefined;
}, {
    id?: string | undefined;
    userId?: string | undefined;
    createdAt?: string | Date | undefined;
    updatedAt?: string | Date | undefined;
    data?: {
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
    } | undefined;
    user?: {
        email: string;
        first_name: string;
        last_name: string;
        picture: string | null;
        phone_number: string;
        username: string;
        createdAt: string | Date;
        updatedAt: string | Date;
        id?: string | undefined;
        locale?: string | undefined;
        emailVerified?: boolean | undefined;
        twoFactorEnabled?: boolean | undefined;
        provider?: "email" | "github" | "google" | "openid" | undefined;
    } | undefined;
    title?: string | undefined;
    cv_template?: any;
    cv_data?: any;
    slug?: string | undefined;
    visibility?: "public" | "private" | undefined;
    locked?: boolean | undefined;
}>;
declare const UpdateResumeDto_base: import("nestjs-zod/dto").ZodDto<{
    id?: string | undefined;
    userId?: string | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    data?: {
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
    } | undefined;
    user?: {
        email: string;
        id: string;
        first_name: string;
        last_name: string;
        picture: string | null;
        phone_number: string;
        username: string;
        locale: string;
        emailVerified: boolean;
        twoFactorEnabled: boolean;
        provider: "email" | "github" | "google" | "openid";
        createdAt: Date;
        updatedAt: Date;
    } | undefined;
    title?: string | undefined;
    cv_template?: any;
    cv_data?: any;
    slug?: string | undefined;
    visibility?: "public" | "private" | undefined;
    locked?: boolean | undefined;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
    title: import("zod").ZodOptional<import("zod").ZodString>;
    slug: import("zod").ZodOptional<import("zod").ZodString>;
    cv_data: import("zod").ZodOptional<import("zod").ZodAny>;
    cv_template: import("zod").ZodOptional<import("zod").ZodAny>;
    data: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodObject<{
        basics: import("zod").ZodObject<{
            name: import("zod").ZodString;
            headline: import("zod").ZodString;
            email: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
            phone: import("zod").ZodString;
            location: import("zod").ZodString;
            url: import("zod").ZodObject<{
                label: import("zod").ZodString;
                href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
            }, "strip", import("zod").ZodTypeAny, {
                label: string;
                href: string;
            }, {
                label: string;
                href: string;
            }>;
            customFields: import("zod").ZodArray<import("zod").ZodObject<{
                id: import("zod").ZodString;
                icon: import("zod").ZodString;
                name: import("zod").ZodString;
                value: import("zod").ZodString;
            }, "strip", import("zod").ZodTypeAny, {
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
            picture: import("zod").ZodObject<{
                url: import("zod").ZodString;
                size: import("zod").ZodDefault<import("zod").ZodNumber>;
                aspectRatio: import("zod").ZodDefault<import("zod").ZodNumber>;
                borderRadius: import("zod").ZodDefault<import("zod").ZodNumber>;
                effects: import("zod").ZodObject<{
                    hidden: import("zod").ZodDefault<import("zod").ZodBoolean>;
                    border: import("zod").ZodDefault<import("zod").ZodBoolean>;
                    grayscale: import("zod").ZodDefault<import("zod").ZodBoolean>;
                }, "strip", import("zod").ZodTypeAny, {
                    hidden: boolean;
                    border: boolean;
                    grayscale: boolean;
                }, {
                    hidden?: boolean | undefined;
                    border?: boolean | undefined;
                    grayscale?: boolean | undefined;
                }>;
            }, "strip", import("zod").ZodTypeAny, {
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
        }, "strip", import("zod").ZodTypeAny, {
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
        sections: import("zod").ZodObject<{
            collapse: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"collapse">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    name: import("zod").ZodString;
                    description: import("zod").ZodString;
                    date: import("zod").ZodString;
                    location: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    keywords: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            summary: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"summary">;
                content: import("zod").ZodDefault<import("zod").ZodString>;
            }>, "strip", import("zod").ZodTypeAny, {
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
            awards: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"awards">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    title: import("zod").ZodString;
                    awarder: import("zod").ZodString;
                    date: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            certifications: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"certifications">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    name: import("zod").ZodString;
                    issuer: import("zod").ZodString;
                    date: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            education: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"education">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    institution: import("zod").ZodString;
                    studyType: import("zod").ZodString;
                    area: import("zod").ZodString;
                    score: import("zod").ZodString;
                    date: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            experience: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"experience">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    company: import("zod").ZodString;
                    position: import("zod").ZodString;
                    location: import("zod").ZodString;
                    date: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            volunteer: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"volunteer">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    organization: import("zod").ZodString;
                    position: import("zod").ZodString;
                    location: import("zod").ZodString;
                    date: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            interests: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"interests">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    name: import("zod").ZodString;
                    keywords: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            languages: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"languages">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    name: import("zod").ZodString;
                    description: import("zod").ZodString;
                    level: import("zod").ZodDefault<import("zod").ZodNumber>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            profiles: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"profiles">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    network: import("zod").ZodString;
                    username: import("zod").ZodString;
                    icon: import("zod").ZodString;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            projects: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"projects">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    name: import("zod").ZodString;
                    description: import("zod").ZodString;
                    date: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    keywords: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            publications: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"publications">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    name: import("zod").ZodString;
                    publisher: import("zod").ZodString;
                    date: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            references: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"references">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    name: import("zod").ZodString;
                    description: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            skills: import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodLiteral<"skills">;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    name: import("zod").ZodString;
                    description: import("zod").ZodString;
                    level: import("zod").ZodDefault<import("zod").ZodNumber>;
                    keywords: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
            custom: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                name: import("zod").ZodString;
                columns: import("zod").ZodDefault<import("zod").ZodNumber>;
                separateLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, {
                id: import("zod").ZodDefault<import("zod").ZodString>;
                items: import("zod").ZodArray<import("zod").ZodObject<import("zod").objectUtil.extendShape<{
                    id: import("zod").ZodDefault<import("zod").ZodString>;
                    visible: import("zod").ZodBoolean;
                }, {
                    name: import("zod").ZodString;
                    description: import("zod").ZodString;
                    date: import("zod").ZodString;
                    location: import("zod").ZodString;
                    summary: import("zod").ZodString;
                    keywords: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
                    url: import("zod").ZodObject<{
                        label: import("zod").ZodString;
                        href: import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodString]>;
                    }, "strip", import("zod").ZodTypeAny, {
                        label: string;
                        href: string;
                    }, {
                        label: string;
                        href: string;
                    }>;
                }>, "strip", import("zod").ZodTypeAny, {
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
            }>, "strip", import("zod").ZodTypeAny, {
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
        }, "strip", import("zod").ZodTypeAny, {
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
        metadata: import("zod").ZodObject<{
            template: import("zod").ZodObject<{
                name: import("zod").ZodDefault<import("zod").ZodString>;
                id: import("zod").ZodDefault<import("zod").ZodNumber>;
                withPhoto: import("zod").ZodDefault<import("zod").ZodBoolean>;
                withoutPhoto: import("zod").ZodDefault<import("zod").ZodBoolean>;
                oneColumn: import("zod").ZodDefault<import("zod").ZodBoolean>;
                twoColumn: import("zod").ZodDefault<import("zod").ZodBoolean>;
                progress: import("zod").ZodDefault<import("zod").ZodNumber>;
            }, "strip", import("zod").ZodTypeAny, {
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
            layout: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodArray<import("zod").ZodArray<import("zod").ZodString, "many">, "many">, "many">>;
            css: import("zod").ZodObject<{
                value: import("zod").ZodDefault<import("zod").ZodString>;
                visible: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, "strip", import("zod").ZodTypeAny, {
                visible: boolean;
                value: string;
            }, {
                visible?: boolean | undefined;
                value?: string | undefined;
            }>;
            page: import("zod").ZodObject<{
                margin: import("zod").ZodDefault<import("zod").ZodNumber>;
                format: import("zod").ZodDefault<import("zod").ZodEnum<["a4", "letter"]>>;
                options: import("zod").ZodObject<{
                    breakLine: import("zod").ZodDefault<import("zod").ZodBoolean>;
                    pageNumbers: import("zod").ZodDefault<import("zod").ZodBoolean>;
                }, "strip", import("zod").ZodTypeAny, {
                    breakLine: boolean;
                    pageNumbers: boolean;
                }, {
                    breakLine?: boolean | undefined;
                    pageNumbers?: boolean | undefined;
                }>;
            }, "strip", import("zod").ZodTypeAny, {
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
            theme: import("zod").ZodObject<{
                background: import("zod").ZodDefault<import("zod").ZodString>;
                text: import("zod").ZodDefault<import("zod").ZodString>;
                primary: import("zod").ZodDefault<import("zod").ZodString>;
            }, "strip", import("zod").ZodTypeAny, {
                background: string;
                text: string;
                primary: string;
            }, {
                background?: string | undefined;
                text?: string | undefined;
                primary?: string | undefined;
            }>;
            typography: import("zod").ZodObject<{
                font: import("zod").ZodObject<{
                    family: import("zod").ZodDefault<import("zod").ZodString>;
                    subset: import("zod").ZodDefault<import("zod").ZodString>;
                    variants: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
                    size: import("zod").ZodDefault<import("zod").ZodNumber>;
                }, "strip", import("zod").ZodTypeAny, {
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
                lineHeight: import("zod").ZodDefault<import("zod").ZodNumber>;
                hideIcons: import("zod").ZodDefault<import("zod").ZodBoolean>;
                underlineLinks: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, "strip", import("zod").ZodTypeAny, {
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
            notes: import("zod").ZodDefault<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
    }, "strip", import("zod").ZodTypeAny, {
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
    }>>>;
    visibility: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEnum<["private", "public"]>>>;
    locked: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodBoolean>>;
    userId: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
    user: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodObject<{
        id: import("zod").ZodDefault<import("zod").ZodString>;
        first_name: import("zod").ZodString;
        last_name: import("zod").ZodString;
        picture: import("zod").ZodUnion<[import("zod").ZodUnion<[import("zod").ZodLiteral<"">, import("zod").ZodNull]>, import("zod").ZodString]>;
        phone_number: import("zod").ZodString;
        username: import("zod").ZodEffects<import("zod").ZodString, string, string>;
        email: import("zod").ZodEffects<import("zod").ZodString, string, string>;
        locale: import("zod").ZodDefault<import("zod").ZodString>;
        emailVerified: import("zod").ZodDefault<import("zod").ZodBoolean>;
        twoFactorEnabled: import("zod").ZodDefault<import("zod").ZodBoolean>;
        provider: import("zod").ZodDefault<import("zod").ZodEnum<["email", "github", "google", "openid"]>>;
        createdAt: import("zod").ZodEffects<import("zod").ZodUnion<[import("zod").ZodDate, import("zod").ZodString]>, Date, string | Date>;
        updatedAt: import("zod").ZodEffects<import("zod").ZodUnion<[import("zod").ZodDate, import("zod").ZodString]>, Date, string | Date>;
    }, "strip", import("zod").ZodTypeAny, {
        email: string;
        id: string;
        first_name: string;
        last_name: string;
        picture: string | null;
        phone_number: string;
        username: string;
        locale: string;
        emailVerified: boolean;
        twoFactorEnabled: boolean;
        provider: "email" | "github" | "google" | "openid";
        createdAt: Date;
        updatedAt: Date;
    }, {
        email: string;
        first_name: string;
        last_name: string;
        picture: string | null;
        phone_number: string;
        username: string;
        createdAt: string | Date;
        updatedAt: string | Date;
        id?: string | undefined;
        locale?: string | undefined;
        emailVerified?: boolean | undefined;
        twoFactorEnabled?: boolean | undefined;
        provider?: "email" | "github" | "google" | "openid" | undefined;
    }>>>;
    createdAt: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodUnion<[import("zod").ZodDate, import("zod").ZodString]>, Date, string | Date>>;
    updatedAt: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodUnion<[import("zod").ZodDate, import("zod").ZodString]>, Date, string | Date>>;
}, "strip", import("zod").ZodTypeAny>, {
    id?: string | undefined;
    userId?: string | undefined;
    createdAt?: string | Date | undefined;
    updatedAt?: string | Date | undefined;
    data?: {
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
    } | undefined;
    user?: {
        email: string;
        first_name: string;
        last_name: string;
        picture: string | null;
        phone_number: string;
        username: string;
        createdAt: string | Date;
        updatedAt: string | Date;
        id?: string | undefined;
        locale?: string | undefined;
        emailVerified?: boolean | undefined;
        twoFactorEnabled?: boolean | undefined;
        provider?: "email" | "github" | "google" | "openid" | undefined;
    } | undefined;
    title?: string | undefined;
    cv_template?: any;
    cv_data?: any;
    slug?: string | undefined;
    visibility?: "public" | "private" | undefined;
    locked?: boolean | undefined;
}>;
export declare class UpdateResumeDto extends UpdateResumeDto_base {
}
export {};
