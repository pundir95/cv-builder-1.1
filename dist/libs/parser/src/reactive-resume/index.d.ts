import type { ResumeData } from "@reactive-resume/schema";
import type { Json } from "@reactive-resume/utils";
import type { Schema } from "zod";
import type { Parser } from "../interfaces/parser";
export declare class ReactiveResumeParser implements Parser<Json, ResumeData> {
    schema: Schema;
    constructor();
    readFile(file: File): Promise<Json>;
    validate(data: Json): ResumeData;
    convert(data: ResumeData): {
        id: number;
        basics: {
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
}
