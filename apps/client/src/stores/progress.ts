import { create } from "zustand";
import { useResumeStore } from "./resume";
import type { SectionKey, SectionWithItem } from "@reactive-resume/schema";
import { profile } from "console";

// Define constants for each section's contribution to progress
export const SECTION_PROGRESS = {
  education: 20,
  skills: 15,
  experience: 20,
  languages: 15,
  summary: 10,
  profiles: 10,
  projects: 10,
  // Add other sections as needed
} as const;

interface ProgressState {
  completedSections: Set<string>;
  incrementProgress: (sectionId: keyof typeof SECTION_PROGRESS) => void;
  decrementProgress: (sectionId: keyof typeof SECTION_PROGRESS) => void;
  resetProgress: () => void;
  getProgress: () => number;
  initializeFromBackend: () => void;
  handleItemDeletion: (sectionId: SectionKey) => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  completedSections: new Set(),
  incrementProgress: (sectionId) =>
    set((state) => {
      if (state.completedSections.has(sectionId)) return state;
      const newCompletedSections = new Set(state.completedSections).add(sectionId);
      const sectionProgress = SECTION_PROGRESS[sectionId] || 0;
      const currentProgress = useResumeStore.getState().resume?.data?.metadata?.template?.progress || 0;
      const newProgress = Math.min(100, currentProgress + sectionProgress);
      useResumeStore.getState().setValue("metadata.template.progress", newProgress);
      return { completedSections: newCompletedSections };
    }),
  decrementProgress: (sectionId) =>
    set((state) => {
      if (!state.completedSections.has(sectionId)) return state;
      const newCompletedSections = new Set(state.completedSections);
      newCompletedSections.delete(sectionId);
      const sectionProgress = SECTION_PROGRESS[sectionId] || 0;
      const currentProgress = useResumeStore.getState().resume?.data?.metadata?.template?.progress || 0;
      const newProgress = Math.max(0, currentProgress - sectionProgress);
      useResumeStore.getState().setValue("metadata.template.progress", newProgress);
      return { completedSections: newCompletedSections };
    }),
  resetProgress: () => {
    set({ completedSections: new Set() });
    useResumeStore.getState().setValue("metadata.template.progress", 0);
  },
  getProgress: () => useResumeStore.getState().resume?.data?.metadata?.template?.progress || 0,
  initializeFromBackend: () => {
    const resume = useResumeStore.getState().resume;
    const progress = resume?.data?.metadata?.template?.progress || 0;
    
    // Initialize completed sections based on existing data
    const completedSections = new Set<string>();
    
    // Check each section that contributes to progress
    Object.keys(SECTION_PROGRESS).forEach((sectionId) => {
      const section = resume?.data?.sections?.[sectionId as keyof typeof resume.data.sections] as SectionWithItem | undefined;
      if (section && 'items' in section && Array.isArray(section.items) && section.items.length > 0) {
        completedSections.add(sectionId);
      }
    });
    
    set({ completedSections });
  },
  handleItemDeletion: (sectionId) => {
    // Wait for the next tick to ensure the deletion has been processed
    setTimeout(() => {
      const resume = useResumeStore.getState().resume;
      let section: SectionWithItem | undefined;
      
      // Handle custom sections
      if (sectionId.startsWith('custom.')) {
        const customId = sectionId.split('custom.')[1];
        section = resume?.data?.sections?.custom?.[customId] as SectionWithItem;
      } else {
        section = resume?.data?.sections?.[sectionId as keyof typeof resume.data.sections] as SectionWithItem;
      }
      
      // If the section has no items after deletion, decrement progress
      if (section && 'items' in section && section.items.length === 0) {
        // Only decrement if the section is in SECTION_PROGRESS
        if (sectionId in SECTION_PROGRESS) {
          get().decrementProgress(sectionId as keyof typeof SECTION_PROGRESS);
        }
      }
    }, 0);
  },
})); 