import { useEffect, useRef } from "react";
import { useProgressStore } from "@/client/stores/progress";
import { SECTION_PROGRESS } from "@/client/stores/progress";

export const useSectionProgress = (sectionId: string, isCompleted: boolean) => {
  const { incrementProgress, decrementProgress } = useProgressStore();
  const isInitialMount = useRef(true);
  const prevIsCompleted = useRef(isCompleted);

  useEffect(() => {
    // Skip the first mount to prevent progress updates on page load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevIsCompleted.current = isCompleted;
      return;
    }

    // Only update progress if isCompleted has actually changed
    if (prevIsCompleted.current !== isCompleted && sectionId in SECTION_PROGRESS) {
      if (isCompleted) {
        incrementProgress(sectionId as keyof typeof SECTION_PROGRESS);
      } else {
        decrementProgress(sectionId as keyof typeof SECTION_PROGRESS);
      }
      prevIsCompleted.current = isCompleted;
    }
  }, [isCompleted, sectionId, incrementProgress, decrementProgress]);
}; 