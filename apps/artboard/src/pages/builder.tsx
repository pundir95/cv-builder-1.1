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
import { eventBus } from "../utils/eventBus";
import { sharedState } from "../utils/sharedState";
import { VerificationModal } from "../../../client/src/pages/builder/_components/verification-modal";

export const BuilderLayout = () => {
  const [wheelPanning, setWheelPanning] = useState(true);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);

  const transformRef = useRef<ReactZoomPanPinchRef>(null);

  const layout = useArtboardStore((state) => state.resume.metadata.layout);
  const format = useArtboardStore((state) => state.resume.metadata.page.format);
  const template = useArtboardStore((state) => state.resume.metadata.template as unknown as Template);
  const Template = useMemo(() => getTemplate(template), [template]);

  useEffect(() => {
    console.log(templateRef,"useEffect")
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
      if (event.data.type === "GET_TEMPLATE_REF") {
        // Send the template reference back
        window.parent.postMessage({ 
          type: "TEMPLATE_REF_RESPONSE", 
          templateRef: templateRef.current 
        }, window.location.origin);
      }
      if (event.data.type === "SHOW_VERIFICATION_MODAL") {
        setShowVerificationModal(true);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [transformRef]);

  // Update shared state when template ref changes
  useEffect(() => {
    const updateTemplateRef = () => {
      if (templateRef.current) {
        sharedState.setTemplateRef(templateRef.current);
      }
    };

    // Initial update
    updateTemplateRef();

    // Set up a mutation observer to watch for changes
    const observer = new MutationObserver(updateTemplateRef);
    if (templateRef.current) {
      observer.observe(templateRef.current, { 
        childList: true, 
        subtree: true,
        attributes: true 
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [templateRef.current]);

  // Check if this is a shared resume view and show verification modal
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const isShared = urlParams.get('shared') === 'true';
  //   const isVerified = localStorage.getItem('resume_verified') === 'true';
    
  //   if (isShared && !isVerified) {
  //     setShowVerificationModal(true);
  //   }
  // }, []);

  // const handleVerificationComplete = (userData: { name: string; email: string; phone: string }) => {
  //   // Store verification data
  //   localStorage.setItem('resume_verified', 'true');
  //   localStorage.setItem('user_verification_data', JSON.stringify(userData));
    
  //   // Close modal
  //   setShowVerificationModal(false);
    
  //   // You can also send this data to your backend here
  //   console.log('User verified:', userData);
  // };

  // console.log(layout,"layout")

  return (
    <>
     
   
          <div 
            ref={templateRef} 
            data-template-ref 
            style={{
              overflowY: "auto",
              height: "100vh",
              backgroundColor: "#F4F5FF",
            }}
          >
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

      {/* Test button for demonstration - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={() => setShowVerificationModal(true)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors z-40"
          style={{ zIndex: 40 }}
        >
          Test Verification Modal
        </button>
      )}
    </>
  );
};
