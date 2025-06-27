import type { SectionKey } from "@reactive-resume/schema";
import type { Template } from "@reactive-resume/utils";
import { useMemo } from "react";

import { Page } from "../components/page";
import { useArtboardStore } from "../store/artboard";
import { getTemplate } from "../templates";

export const PreviewLayout = () => {
  const layout = useArtboardStore((state) => state.resume.metadata.layout);
  const template = useArtboardStore((state) => state.resume.metadata.template as Template);

  const Template = useMemo(() => getTemplate(template), [template]);

  // Check if we should use auto page splitting (when there's only one page in layout)
  const useAutoPageSplitter = layout.length === 1;

  return (
    <>
     
<></>
    
    </>
  );
};
