import { create } from "zustand";
import { useResumeStore } from "./resume";

interface ProgressState {
  progress: number;
  completedSections: Set<string>;
  incrementProgress: (sectionId: string) => void;
  decrementProgress: (sectionId: string) => void;
  resetProgress: () => void;
  getProgress: () => number;
  initializeFromBackend: () => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: 0,
  completedSections: new Set(),
  incrementProgress: (sectionId) =>
    set((state) => {
      if (state.completedSections.has(sectionId)) return state;
      const newCompletedSections = new Set(state.completedSections).add(sectionId);
      const newProgress = Math.round(Math.min(100, (newCompletedSections.size / 30) * 100));
      useResumeStore.getState().setValue("metadata.template.progress", newProgress);
      return { progress: newProgress, completedSections: newCompletedSections };
    }),
  decrementProgress: (sectionId) =>
    set((state) => {
      if (!state.completedSections.has(sectionId)) return state;
      const newCompletedSections = new Set(state.completedSections);
      newCompletedSections.delete(sectionId);
      const newProgress = Math.round(Math.max(0, (newCompletedSections.size / 30) * 100));
      useResumeStore.getState().setValue("metadata.template.progress", newProgress);
      return { progress: newProgress, completedSections: newCompletedSections };
    }),
  resetProgress: () => {
    set({ progress: 0, completedSections: new Set() });
    useResumeStore.getState().setValue("metadata.template.progress", 0);
  },
  getProgress: () => get().progress,
  initializeFromBackend: () => {
    const resume = useResumeStore.getState().resume;
    if (!resume?.data?.metadata?.template?.progress) return;

    const backendProgress = resume.data.metadata.template.progress;
    if (backendProgress > 0) {
      // Calculate how many sections were completed based on the progress
      const completedCount = Math.round((backendProgress / 100) * 30);
      const completedSections = new Set<string>();
      
      // Add dummy section IDs to match the count
      for (let i = 0; i < completedCount; i++) {
        completedSections.add(`section_${i}`);
      }
      
      set({ 
        progress: Math.round(backendProgress),
        completedSections 
      });
    }
  }
})); 