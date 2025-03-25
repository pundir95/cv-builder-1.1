import type { ResumeDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { RESUMES_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const fetchResumes = async () => {
  const response = await axios.get<ResumeDto[], AxiosResponse<ResumeDto[]>>("/resume");

  return [
    {
        "id": "cm8n04fkw15qbjee20euo25jf",
        "title": "Boiling Elderly Guineafowl",
        "slug": "boiling-elderly-guineafowl",
        "data": {
            "basics": {
                "url": {
                    "href": "https://johndoe.me/",
                    "label": ""
                },
                "name": "John Doe",
                "email": "john.doe@gmail.com",
                "phone": "(555) 123-4567",
                "picture": {
                    "url": "https://i.imgur.com/HgwyOuJ.jpg",
                    "size": 120,
                    "effects": {
                        "border": false,
                        "hidden": false,
                        "grayscale": false
                    },
                    "aspectRatio": 1,
                    "borderRadius": 0
                },
                "headline": "Creative and Innovative Web Developer",
                "location": "Pleasantville, CA 94588",
                "customFields": []
            },
            "metadata": {
                "css": {
                    "value": "* {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n\tbackground:green;\n\tfont-size:23px\n}",
                    "visible": false
                },
                "page": {
                    "format": "letter",
                    "margin": 14,
                    "options": {
                        "breakLine": true,
                        "pageNumbers": true
                    }
                },
                "notes": "",
                "theme": {
                    "text": "#000000",
                    "primary": "#0284c7",
                    "background": "#ffffff"
                },
                "layout": [
                    [
                        [
                            "profiles",
                            "summary",
                            "experience",
                            "projects",
                            "volunteer",
                            "references"
                        ],
                        [
                            "skills",
                            "interests",
                            "certifications",
                            "publications",
                            "languages"
                        ]
                    ],
                    [
                        [
                            "education"
                        ],
                        [
                            "awards"
                        ]
                    ]
                ],
                "template": "azurill",
                "typography": {
                    "font": {
                        "size": 18,
                        "family": "Merriweather",
                        "subset": "latin",
                        "variants": [
                            "regular"
                        ]
                    },
                    "hideIcons": false,
                    "lineHeight": 1.25,
                    "underlineLinks": true
                }
            },
            "sections": {
                "awards": {
                    "id": "awards",
                    "name": "Awards",
                    "items": [],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "custom": {},
                "skills": {
                    "id": "skills",
                    "name": "Skills",
                    "items": [
                        {
                            "id": "hn0keriukh6c0ojktl9gsgjm",
                            "name": "Web Technologies",
                            "level": 0,
                            "visible": true,
                            "keywords": [
                                "HTML5",
                                "JavaScript",
                                "PHP",
                                "Python"
                            ],
                            "description": "Advanced"
                        },
                        {
                            "id": "r8c3y47vykausqrgmzwg5pur",
                            "name": "Web Frameworks",
                            "level": 0,
                            "visible": true,
                            "keywords": [
                                "React.js",
                                "Angular",
                                "Vue.js",
                                "Laravel",
                                "Django"
                            ],
                            "description": "Intermediate"
                        },
                        {
                            "id": "b5l75aseexqv17quvqgh73fe",
                            "name": "Tools",
                            "level": 0,
                            "visible": true,
                            "keywords": [
                                "Webpack",
                                "Git",
                                "Jenkins",
                                "Docker",
                                "JIRA"
                            ],
                            "description": "Intermediate"
                        }
                    ],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "summary": {
                    "id": "summary",
                    "name": "Summary",
                    "columns": 1,
                    "content": "<p>Innovative Web Developer with 5 years of experience in building impactful and user-friendly websites and applications. Specializes in <strong>front-end technologies</strong> and passionate about modern web standards and cutting-edge development techniques. Proven track record of leading successful projects from concept to deployment.</p>",
                    "visible": true,
                    "separateLinks": true
                },
                "profiles": {
                    "id": "profiles",
                    "name": "Profiles",
                    "items": [
                        {
                            "id": "cnbk5f0aeqvhx69ebk7hktwd",
                            "url": {
                                "href": "https://linkedin.com/in/johndoe",
                                "label": ""
                            },
                            "icon": "linkedin",
                            "network": "LinkedIn",
                            "visible": true,
                            "username": "johndoe"
                        },
                        {
                            "id": "ukl0uecvzkgm27mlye0wazlb",
                            "url": {
                                "href": "https://github.com/johndoe",
                                "label": ""
                            },
                            "icon": "github",
                            "network": "GitHub",
                            "visible": true,
                            "username": "johndoe"
                        }
                    ],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "projects": {
                    "id": "projects",
                    "name": "Projects",
                    "items": [
                        {
                            "id": "ncxgdjjky54gh59iz2t1xi1v",
                            "url": {
                                "href": "",
                                "label": ""
                            },
                            "date": "",
                            "name": "Interactive Dashboard",
                            "summary": "<p>Created an interactive analytics dashboard for a SaaS application, enhancing data visualization for clients.</p>",
                            "visible": true,
                            "keywords": [],
                            "description": "Frontend Developer"
                        },
                        {
                            "id": "yw843emozcth8s1ubi1ubvlf",
                            "url": {
                                "href": "",
                                "label": ""
                            },
                            "date": "",
                            "name": "E-Commerce Platform33333",
                            "summary": "<p>Led the development of a full-stack e-commerce platform, improving sales conversion by 25%.</p>",
                            "visible": true,
                            "keywords": [],
                            "description": "Project Lead"
                        }
                    ],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "education": {
                    "id": "education",
                    "name": "Education",
                    "items": [
                        {
                            "id": "yo3p200zo45c6cdqc6a2vtt3",
                            "url": {
                                "href": "",
                                "label": ""
                            },
                            "area": "Berkeley, CA",
                            "date": "August 2012 to May 2016",
                            "score": "",
                            "summary": "",
                            "visible": true,
                            "studyType": "Bachelor's in Computer Science",
                            "institution": "University of California"
                        }
                    ],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "interests": {
                    "id": "interests",
                    "name": "Interests",
                    "items": [],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "languages": {
                    "id": "languages",
                    "name": "Languages",
                    "items": [],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "volunteer": {
                    "id": "volunteer",
                    "name": "Volunteering",
                    "items": [],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "experience": {
                    "id": "experience",
                    "name": "Experience",
                    "items": [
                        {
                            "id": "lhw25d7gf32wgdfpsktf6e0x",
                            "url": {
                                "href": "https://creativesolutions.inc/",
                                "label": ""
                            },
                            "date": "January 2019 to Present",
                            "company": "Creative Solutions Inc.",
                            "summary": "<ul><li><p>Spearheaded the redesign of the main product website, resulting in a 40% increase in user engagement.</p></li><li><p>Developed and implemented a new responsive framework, improving cross-device compatibility.</p></li><li><p>Mentored a team of four junior developers, fostering a culture of technical excellence.</p></li></ul>",
                            "visible": true,
                            "location": "San Francisco, CA",
                            "position": "Senior Web Developer"
                        },
                        {
                            "id": "r6543lil53ntrxmvel53gbtm",
                            "url": {
                                "href": "https://techadvancers.com/",
                                "label": ""
                            },
                            "date": "June 2016 to December 2018",
                            "company": "TechAdvancers",
                            "summary": "<ul><li><p>Collaborated in a team of 10 to develop high-quality web applications using React.js and Node.js.</p></li><li><p>Managed the integration of third-party services such as Stripe for payments and Twilio for SMS services.</p></li><li><p>Optimized application performance, achieving a 30% reduction in load times.</p></li></ul>",
                            "visible": true,
                            "location": "San Jose, CA",
                            "position": "Web Developer"
                        }
                    ],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "references": {
                    "id": "references",
                    "name": "References",
                    "items": [
                        {
                            "id": "f2sv5z0cce6ztjl87yuk8fak",
                            "url": {
                                "href": "",
                                "label": ""
                            },
                            "name": "Available upon request",
                            "summary": "",
                            "visible": true,
                            "description": ""
                        }
                    ],
                    "columns": 1,
                    "visible": false,
                    "separateLinks": true
                },
                "publications": {
                    "id": "publications",
                    "name": "Publications",
                    "items": [],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "certifications": {
                    "id": "certifications",
                    "name": "Certifications",
                    "items": [
                        {
                            "id": "spdhh9rrqi1gvj0yqnbqunlo",
                            "url": {
                                "href": "",
                                "label": ""
                            },
                            "date": "2020",
                            "name": "Full-Stack Web Development",
                            "issuer": "CodeAcademy",
                            "summary": "",
                            "visible": true
                        },
                        {
                            "id": "n838rddyqv47zexn6cxauwqp",
                            "url": {
                                "href": "",
                                "label": ""
                            },
                            "date": "2019",
                            "name": "AWS Certified Developer",
                            "issuer": "Amazon Web Services",
                            "summary": "",
                            "visible": true
                        }
                    ],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                }
            }
        },
        "visibility": "public",
        "locked": false,
        "userId": "cm8fqja5s0klgjee2tcmm08fc",
        "createdAt": "2025-03-24T11:46:37.664Z",
        "updatedAt": "2025-03-24T13:35:38.573Z"
    },
    {
        "id": "cm8fqju7c0klpjee28ugpdwgj",
        "title": "mkl",
        "slug": "mkl",
        "data": {
            "basics": {
                "url": {
                    "href": "",
                    "label": ""
                },
                "name": "Pankaj Pundir",
                "email": "pankaj@avioxtechnologies.com",
                "phone": "",
                "picture": {
                    "url": "https://avatars.githubusercontent.com/u/106310650?v=4",
                    "size": 64,
                    "effects": {
                        "border": false,
                        "hidden": false,
                        "grayscale": false
                    },
                    "aspectRatio": 1,
                    "borderRadius": 0
                },
                "headline": "",
                "location": "",
                "customFields": []
            },
            "metadata": {
                "css": {
                    "value": "* {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
                    "visible": false
                },
                "page": {
                    "format": "a4",
                    "margin": 18,
                    "options": {
                        "breakLine": true,
                        "pageNumbers": true
                    }
                },
                "notes": "",
                "theme": {
                    "text": "#000000",
                    "primary": "#dc2626",
                    "background": "#ffffff"
                },
                "layout": [
                    [
                        [
                            "profiles",
                            "summary",
                            "experience",
                            "education",
                            "projects",
                            "volunteer",
                            "references",
                            "custom.y6rgvsn1eqi83l7wu9qhy80u",
                            "custom.n5xo9867l11l8y8w15q3wrrb"
                        ],
                        [
                            "skills",
                            "interests",
                            "certifications",
                            "awards",
                            "publications",
                            "languages"
                        ]
                    ]
                ],
                "template": "azurill",
                "typography": {
                    "font": {
                        "size": 14,
                        "family": "IBM Plex Serif",
                        "subset": "latin",
                        "variants": [
                            "regular",
                            "italic",
                            "600"
                        ]
                    },
                    "hideIcons": false,
                    "lineHeight": 1.5,
                    "underlineLinks": true
                }
            },
            "sections": {
                "awards": {
                    "id": "awards",
                    "name": "Awards",
                    "items": [],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "custom": {
                    "n5xo9867l11l8y8w15q3wrrb": {
                        "id": "n5xo9867l11l8y8w15q3wrrb",
                        "name": "Custom Section",
                        "items": [],
                        "columns": 1,
                        "visible": true,
                        "separateLinks": true
                    },
                    "y6rgvsn1eqi83l7wu9qhy80u": {
                        "id": "y6rgvsn1eqi83l7wu9qhy80u",
                        "name": "Custom Section",
                        "items": [],
                        "columns": 1,
                        "visible": true,
                        "separateLinks": true
                    }
                },
                "skills": {
                    "id": "skills",
                    "name": "Skills",
                    "items": [],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "summary": {
                    "id": "summary",
                    "name": "Summary",
                    "columns": 1,
                    "content": "",
                    "visible": true,
                    "separateLinks": true
                },
                "profiles": {
                    "id": "profiles",
                    "name": "Profiles",
                    "items": [],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "projects": {
                    "id": "projects",
                    "name": "Projects",
                    "items": [],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "education": {
                    "id": "education",
                    "name": "Education",
                    "items": [],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "interests": {
                    "id": "interests",
                    "name": "Interests",
                    "items": [],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "languages": {
                    "id": "languages",
                    "name": "Languages",
                    "items": [],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "volunteer": {
                    "id": "volunteer",
                    "name": "Volunteering",
                    "items": [],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "experience": {
                    "id": "experience",
                    "name": "Experience",
                    "items": [],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "references": {
                    "id": "references",
                    "name": "References",
                    "items": [],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "publications": {
                    "id": "publications",
                    "name": "Publications",
                    "items": [],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                },
                "certifications": {
                    "id": "certifications",
                    "name": "Certifications",
                    "items": [],
                    "columns": 1,
                    "visible": true,
                    "separateLinks": true
                }
            }
        },
        "visibility": "private",
        "locked": false,
        "userId": "cm8fqja5s0klgjee2tcmm08fc",
        "createdAt": "2025-03-19T09:44:17.064Z",
        "updatedAt": "2025-03-24T11:46:29.828Z"
    }
    
    
];
};

export const useResumes = () => {
  const {
    error,
    isPending: loading,
    data: resumes,
  } = useQuery({
    queryKey: RESUMES_KEY,
    queryFn: fetchResumes,
  });

  return { resumes, loading, error };
};
