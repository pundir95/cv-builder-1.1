import { SectionKey } from "@reactive-resume/schema";
import { Template } from "@reactive-resume/utils";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Page } from "../components/page";
import { useArtboardStore } from "../store/artboard";
import { getTemplate } from "../templates";

export const PreviewLayout = () => {
  const layout = useArtboardStore((state) => state.resume.metadata.layout);
  const template = useArtboardStore((state) => state.resume.metadata.template as Template);

  const Template = useMemo(() => getTemplate(template), [template]);

  return (
    <div
      style={{
        overflowY: "auto",
        height: "100vh",
        backgroundColor: "#F4F5FF",
      }}
    >
      <AnimatePresence>
        {layout.map((columns, pageIndex) => (
          <motion.div
            key={pageIndex}
            layout
            initial={{ opacity: 0, x: -200, y: 0 }}
            animate={{ opacity: 1, x: 0, transition: { delay: pageIndex * 0.3 } }}
            exit={{ opacity: 0, x: -200 }}
          >
            <Page mode="preview" pageNumber={pageIndex + 1}>
              <Template isFirstPage={pageIndex === 0} columns={columns as SectionKey[][]} />
            </Page>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
