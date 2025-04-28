import { useEffect } from "react";
import { useProgressStore } from "@/client/stores/progress";

export const useSectionProgress = (sectionId: string, isCompleted: boolean) => {
  const { incrementProgress, decrementProgress } = useProgressStore();

  useEffect(() => {
    if (isCompleted) {
      incrementProgress(sectionId);
    } else {
      decrementProgress(sectionId);
    }
  }, [isCompleted, sectionId, incrementProgress, decrementProgress]);
}; 