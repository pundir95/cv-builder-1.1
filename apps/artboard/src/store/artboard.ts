import type { ResumeData } from "@reactive-resume/schema";
import { create } from "zustand";

const defaultResume: ResumeData = {
  id: 1,
  basics: {
    name: "New Resume",
    headline: "",
    profession: "",
    email: "",
    phone: "",
    location: "",
    url: { label: "", href: "" },
    customFields: [],
    picture: {
      url: "",
      size: 120,
      aspectRatio: 1,
      borderRadius: 0,
      effects: {
        hidden: false,
        border: false,
        grayscale: false,
      },
    },
  },
  metadata: {
    template: {
      name: "gengar",
      id: 1,
      withPhoto: true,
      withoutPhoto: true,
      oneColumn: true,
      twoColumn: true,
      progress: 0,
    },
    layout: [[["summary"], ["experience"]], [["education"], ["skills"]]],
    css: { value: "", visible: false },
    typography: {
      font: {
        family: "Open Sans",
        subset: "latin",
        variants: ["regular"],
        size: 14
      },
      lineHeight: 1.5,
      hideIcons: false,
      underlineLinks: true,
    },
    page: {
      options: {
        breakLine: false,
        pageNumbers: true,
      },
      margin: 20,
      format: "a4"
    },
    theme: {
      background: "#ffffff",
      text: "#000000",
      primary: "#1a91ff",
    },
    notes: "",
  },
  sections: {
    custom: {},
    collapse: {
      name: "Collapse",
      id: "collapse",
      columns: 1,
      visible: true,
      separateLinks: false,
      items: [],
      extraDescription: "",
    },
    awards: {
      name: "Awards",
      id: "awards",
      columns: 1,
      visible: true,
      separateLinks: false,
      items: [],
      extraDescription: "",
    },
    certifications: {
      name: "Certifications",
      id: "certifications",
      columns: 1,
      visible: true,
      separateLinks: false,
      items: [],
      extraDescription: "",
    },
    interests: {
      name: "Interests",
      id: "interests",
      columns: 1,
      visible: true,
      separateLinks: false,
      items: [],
      extraDescription: "",
    },
    languages: {
      name: "Languages",
      id: "languages",
      columns: 1,
      visible: true,
      separateLinks: false,
      items: [],
      extraDescription: "",
    },
    profiles: {
      name: "Profiles",
      id: "profiles",
      columns: 1,
      visible: true,
      separateLinks: false,
      items: [],
      extraDescription: "",
    },
    projects: {
      name: "Projects",
      id: "projects",
      columns: 1,
      visible: true,
      separateLinks: false,
      items: [],
      extraDescription: "",
    },
    publications: {
      name: "Publications",
      id: "publications",
      columns: 1,
      visible: true,
      separateLinks: false,
      items: [],
      extraDescription: "",
    },
    references: {
      name: "References",
      id: "references",
      columns: 1,
      visible: true,
      separateLinks: false,
      items: [],
      extraDescription: "",
    },
    volunteer: {
      name: "Volunteer Work",
      id: "volunteer",
      columns: 1,
      visible: true,
      separateLinks: false,
      items: [],
      extraDescription: "",
    },
    summary: {
      name: "Professional Summary",
      id: "summary",
      columns: 1,
      visible: true,
      separateLinks: false,
      content: "",
      extraDescription: "",
    },
    experience: {
      name: "Work Experience",
      id: "experience",
      columns: 1,
      visible: true,
      separateLinks: false,
      items: [],
      extraDescription: "",
    },
    education: {
      name: "Education",
      id: "education",
      columns: 1,
      visible: true,
      separateLinks: false,
      items: [],
      extraDescription: "",
    },
    skills: {
      name: "Skills",
      id: "skills",
      columns: 1,
      visible: true,
      separateLinks: false,
      items: [],
      extraDescription: "",
    },
  }
};

export type ArtboardStore = {
  resume: ResumeData;
  setResume: (resume: ResumeData) => void;
};

export const useArtboardStore = create<ArtboardStore>()((set) => ({
  resume: defaultResume,
  setResume: (resume) => {
    set({ resume });
  },
}));
