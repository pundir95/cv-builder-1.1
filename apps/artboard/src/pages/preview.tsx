import type { SectionKey } from "@reactive-resume/schema";
import type { Template } from "@reactive-resume/utils";
import { useMemo } from "react";

import { Page } from "../components/page";
import { AutoPageSplitter } from "../components/auto-page-splitter";
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
      {useAutoPageSplitter ? (
        // Use AutoPageSplitter for automatic page breaking
        <AutoPageSplitter mode="preview">
          <Template isFirstPage={true} columns={layout[0] as SectionKey[][]} />
        </AutoPageSplitter>
      ) : (
        // Use manual layout system
        layout.map((columns, pageIndex) => (
          <Page key={pageIndex} mode="preview" pageNumber={pageIndex + 1}>
            <Template isFirstPage={pageIndex === 0} columns={columns as SectionKey[][]} />
          </Page>
        ))
      )}
    </>
  );
};
