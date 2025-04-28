import { useEffect } from "react";
import { useProgressStore } from "../stores/progress";
import { useResumeStore } from "../stores/resume";

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const initializeFromBackend = useProgressStore((state) => state.initializeFromBackend);
  const resume = useResumeStore((state) => state.resume);

  useEffect(() => {
    if (resume?.data?.metadata?.template?.progress !== undefined) {
      initializeFromBackend();
    }
  }, [resume?.data?.metadata?.template?.progress]);

  return <>{children}</>;
}; 