import * as JSZip from "jszip";
import type { Schema } from "zod";
import type { Parser } from "../interfaces/parser";
import type { LinkedIn } from "./schema";
export * from "./schema";
export declare class LinkedInParser implements Parser<JSZip, LinkedIn> {
    schema: Schema;
    constructor();
    readFile(file: File): Promise<JSZip>;
    validate(data: JSZip): Promise<{
        Profile?: {
            "First Name": string;
            "Last Name": string;
            Address: string;
            "Birth Date": string;
            Headline: string;
            Summary: string;
            Industry: string;
            "Geo Location": string;
            "Twitter Handles": string;
            Websites: string;
            "Maiden Name"?: string | undefined;
            "Zip Code"?: string | undefined;
            "Instant Messengers"?: string | undefined;
        }[] | undefined;
        "Email Addresses"?: {
            "Email Address": string;
            Confirmed: "Yes" | "No";
            Primary: "Yes" | "No";
            "Updated On": string;
        }[] | undefined;
        Certifications?: {
            Name: string;
            Url: string;
            Authority: string;
            "Started On": string;
            "License Number": string;
            "Finished On"?: string | undefined;
        }[] | undefined;
        Education?: {
            "School Name": string;
            "Start Date": string;
            "Degree Name": string;
            Activities: string;
            "End Date"?: string | undefined;
            Notes?: string | undefined;
        }[] | undefined;
        Languages?: {
            Name: string;
            Proficiency?: string | undefined;
        }[] | undefined;
        Positions?: {
            "Started On": string;
            "Company Name": string;
            Title: string;
            Location: string;
            "Finished On"?: string | undefined;
            Description?: string | undefined;
        }[] | undefined;
        Projects?: {
            "Started On": string;
            Title: string;
            Description: string;
            Url?: string | undefined;
            "Finished On"?: string | undefined;
        }[] | undefined;
        Skills?: {
            Name: string;
        }[] | undefined;
    }>;
    convert(data: LinkedIn): {
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
}
