import type { ResumeDto } from "@reactive-resume/dto";

import { axios } from "@/client/libs/axios";

export const findResumeById = async (data: { id: string }) => {
  
  return{
    "id": "cm8fxu9m20lj9jee2nfxps3kg",
    "title": "asd",
    "slug": "asd",
    "data": {
        "basics": {
            "name": "Pankaj Pundir",
            "headline": "",
            "email": "pankaj@avioxtechnologies.com",
            "phone": "",
            "location": "",
            "url": {
                "label": "",
                "href": ""
            },
            "customFields": [],
            "picture": {
                "url": "https://avatars.githubusercontent.com/u/106310650?v=4",
                "size": 64,
                "aspectRatio": 1,
                "borderRadius": 0,
                "effects": {
                    "hidden": false,
                    "border": false,
                    "grayscale": false
                }
            }
        },
        "sections": {
            "summary": {
                "name": "Summary",
                "columns": 1,
                "separateLinks": true,
                "visible": true,
                "id": "summary",
                "content": ""
            },
            "awards": {
                "name": "Awards",
                "columns": 1,
                "separateLinks": true,
                "visible": true,
                "id": "awards",
                "items": []
            },
            "certifications": {
                "name": "Certifications",
                "columns": 1,
                "separateLinks": true,
                "visible": true,
                "id": "certifications",
                "items": []
            },
            "education": {
                "name": "Education",
                "columns": 1,
                "separateLinks": true,
                "visible": true,
                "id": "education",
                "items": []
            },
            "experience": {
                "name": "Experience",
                "columns": 1,
                "separateLinks": true,
                "visible": true,
                "id": "experience",
                "items": []
            },
            "volunteer": {
                "name": "Volunteering",
                "columns": 1,
                "separateLinks": true,
                "visible": true,
                "id": "volunteer",
                "items": []
            },
            "interests": {
                "name": "Interests",
                "columns": 1,
                "separateLinks": true,
                "visible": true,
                "id": "interests",
                "items": []
            },
            "languages": {
                "name": "Languages",
                "columns": 1,
                "separateLinks": true,
                "visible": true,
                "id": "languages",
                "items": []
            },
            "profiles": {
                "name": "Profiles",
                "columns": 1,
                "separateLinks": true,
                "visible": true,
                "id": "profiles",
                "items": []
            },
            "projects": {
                "name": "Projects",
                "columns": 1,
                "separateLinks": true,
                "visible": true,
                "id": "projects",
                "items": []
            },
            "publications": {
                "name": "Publications",
                "columns": 1,
                "separateLinks": true,
                "visible": true,
                "id": "publications",
                "items": []
            },
            "references": {
                "name": "References",
                "columns": 1,
                "separateLinks": true,
                "visible": true,
                "id": "references",
                "items": []
            },
            "skills": {
                "name": "Skills",
                "columns": 1,
                "separateLinks": true,
                "visible": true,
                "id": "skills",
                "items": []
            },
            "custom": {}
        },
        "metadata": {
            "template": "rhyhorn",
            "layout": [
                [
                    [
                        "profiles",
                        "summary",
                        "experience",
                        "education",
                        "projects",
                        "volunteer",
                        "references"
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
            "css": {
                "value": "* {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
                "visible": false
            },
            "page": {
                "margin": 18,
                "format": "a4",
                "options": {
                    "breakLine": true,
                    "pageNumbers": true
                }
            },
            "theme": {
                "background": "#ffffff",
                "text": "#000000",
                "primary": "#dc2626"
            },
            "typography": {
                "font": {
                    "family": "IBM Plex Serif",
                    "subset": "latin",
                    "variants": [
                        "regular",
                        "italic",
                        "600"
                    ],
                    "size": 14
                },
                "lineHeight": 1.5,
                "hideIcons": false,
                "underlineLinks": true
            },
            "notes": ""
        }
    },
    "visibility": "private",
    "locked": false,
    "userId": "cm8fqja5s0klgjee2tcmm08fc",
    "createdAt": "2025-03-19T13:08:20.906Z",
    "updatedAt": "2025-03-19T13:08:20.906Z"
}
};

export const findResumeByUsernameSlug = async (data: { username: string; slug: string }) => {
  const response = await axios.get<ResumeDto>(`/resume/public/${data.username}/${data.slug}`);

  return response.data;
};
