import type { SectionKey } from "@reactive-resume/schema";
import type { Template } from "@reactive-resume/utils";
import { pageSizeMap } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import html2pdf from 'html2pdf.js';

import { MM_TO_PX, Page } from "../components/page";
import { useArtboardStore } from "../store/artboard";
import { getTemplate } from "../templates";

export const BuilderLayout = () => {
  const [wheelPanning, setWheelPanning] = useState(true);
  const templateRef = useRef<HTMLDivElement>(null);

  const transformRef = useRef<ReactZoomPanPinchRef>(null);

  const layout = useArtboardStore((state) => state.resume.metadata.layout);
  const format = useArtboardStore((state) => state.resume.metadata.page.format);
  const template = useArtboardStore((state) => state.resume.metadata.template as unknown as Template);
  const Template = useMemo(() => getTemplate(template), [template]);

  const getTemplateHtml = () => {
    if (templateRef.current) {
      // Get all stylesheets
      const styles = Array.from(document.styleSheets)
        .map(stylesheet => {
          try {
            return Array.from(stylesheet.cssRules)
              .map(rule => rule.cssText)
              .join('\n');
          } catch (e) {
            // Skip external stylesheets
            return '';
          }
        })
        .join('\n');

      // Create style element
      const styleElement = `<style>${styles}</style>`;
      
      // Get HTML content
      const html = templateRef.current.innerHTML;
      
      // Combine style and HTML
      const fullHtml = styleElement + html;
      
      console.log(fullHtml, "html with styles");
      return fullHtml;
    }
    return '';
  };

  const generatePDF = () => {
    const fullHtml = getTemplateHtml();
    if (fullHtml) {
      // Create a temporary container
      const container = document.createElement('div');
      container.innerHTML = fullHtml;
      container.style.width = '800px'; // Set to your resume width (adjust as needed)
      container.style.margin = '0 auto'; // Center it

      const opt = {
        margin: 0, // Remove extra margin
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: true,
          letterRendering: true,
          allowTaint: true
        },
        jsPDF: { 
          unit: 'px', // Use pixels for more control
          format: [800, 1131], // A4 in px at 96dpi, or match your resume
          orientation: 'portrait',
          compress: true,
          precision: 16
        },
        pagebreak: { mode: 'avoid-all' }
      };

      html2pdf().set(opt).from(container).save();
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === "ZOOM_IN") transformRef.current?.zoomIn(0.2);
      if (event.data.type === "ZOOM_OUT") transformRef.current?.zoomOut(0.2);
      if (event.data.type === "CENTER_VIEW") transformRef.current?.centerView();
      if (event.data.type === "RESET_VIEW") {
        transformRef.current?.resetTransform(0);
        setTimeout(() => transformRef.current?.centerView(0.8, 0), 10);
      }
      if (event.data.type === "TOGGLE_PAN_MODE") {
        setWheelPanning(event.data.panMode);
      }
      if (event.data.type === "GET_TEMPLATE_HTML") {
        const html = getTemplateHtml();
        window.postMessage({ type: "TEMPLATE_HTML", html }, window.location.origin);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [transformRef]);

  return (
    <>
      <div className="flex gap-4 p-4">
        <button 
          onClick={getTemplateHtml}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Get HTML
        </button>
        <button 
          onClick={generatePDF}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Download PDF
        </button>
      </div>
      <div ref={templateRef} className="overflow-y-auto h-screen">
        {layout.map((columns, pageIndex) => (
          <motion.div
            key={pageIndex}
            layout
            initial={{ opacity: 0, x: -200, y: 0 }}
            animate={{ opacity: 1, x: 0, transition: { delay: pageIndex * 0.3 } }}
            exit={{ opacity: 0, x: -200 }}
          >
            <Page mode="builder" pageNumber={pageIndex + 1}>
              <Template isFirstPage={pageIndex === 0} columns={columns as SectionKey[][]} />
            </Page>
          </motion.div>
        ))}
      </div>
    </>
  );
};
