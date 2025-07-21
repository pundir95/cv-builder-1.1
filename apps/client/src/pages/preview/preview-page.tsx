import { useCallback, useEffect, useState } from "react";
import { useResumeStore } from "@/client/stores/resume";
import { Helmet } from "react-helmet-async";
import { useBuilderStore } from "@/client/stores/builder";
import { t } from "@lingui/macro";
import { Button } from "@reactive-resume/ui";
import { usePrintResume } from "@/client/services/resume";
import { CircleNotch, FilePdf, Download, ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import { toast } from "@/client/hooks/use-toast";
import { sharedState } from "@/artboard/utils/sharedState";
import html2pdf from "html2pdf.js";

const HEADER_HEIGHT = 64; // px, adjust if your header is a different height

export const PreviewPage = () => {
    const user=localStorage.getItem("user");
    const userData=JSON.parse(user || "{}");
  const frameRef = useBuilderStore((state) => state.frame.ref);
  const setFrameRef = useBuilderStore((state) => state.frame.setRef);


  const resume = useResumeStore((state) => state.resume);
  const title = useResumeStore((state) => state.resume.title);
  const [loading, setLoading] = useState(false);

  const syncResumeToArtboard = useCallback(() => {
    setTimeout(() => {
      if (!frameRef?.contentWindow) return;
      const message = { type: "SET_RESUME", payload: resume.data };
      frameRef.contentWindow.postMessage(message, "*");
    }, 0);
  }, [frameRef?.contentWindow, resume.data]);

  // Send resume data to iframe on initial load
  useEffect(() => {
    if (!frameRef) return;

    frameRef.addEventListener("load", syncResumeToArtboard);

    return () => {
      frameRef.removeEventListener("load", syncResumeToArtboard);
    };
  }, [frameRef]);

  // Persistently check if iframe has loaded using setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      if (frameRef?.contentWindow?.document.readyState === "complete") {
        syncResumeToArtboard();
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [frameRef]);

  // Send resume data to iframe on change of resume data
  useEffect(syncResumeToArtboard, [resume.data]);


  const onDownloadPdf = async () => {
      if(userData.subscription_details.length == 0){
        toast({
          title: "You need to subscribe to download the resume",
          description: "Please subscribe to download the resume",
          variant: "error",
          style: {
            backgroundColor: "red !important",
            border: "1px solid red !important",
            borderRadius: "10px",
            padding: "10px",
            marginBottom: "100px",
            color: "white !important",
          }
        });
        return;
      }

      const templateRef = sharedState.getTemplateRef();
    
      if (templateRef) {
        setLoading(true);
        let templateString = templateRef.innerHTML;
  
        // Inject print-specific CSS
        const printCSS = `
          <style>
            .card, .section { page-break-inside: avoid; break-inside: avoid; }
            .page-break { page-break-before: always; break-before: always; }
          </style>
        `;
        templateString = printCSS + templateString;
  
        // Replace width: 40% with width: 100% in the template string
        const modifiedTemplateString = templateString.replace(/width:\s*['"]?40%['"]?/, 'width: "100%"');
        console.log(modifiedTemplateString,"templateString");
        
        // Configure PDF options
        const options = {
          margin: 0,
          filename: 'resume.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            margin: 15,
            scale: 2,
            useCORS: true,
            allowTaint: true,
            imageTimeout: 0,
            logging: true,
            paddingOffsetY: 0,
            paddingOffsetX: 0,
          
          },
          jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
          },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };
  
        try {
          // Create a temporary div to hold the HTML content
          const element = document.createElement('div');
          element.innerHTML = modifiedTemplateString;
          
          // Wait for images to load
          const images = element.getElementsByTagName('img');
          await Promise.all(Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
              img.onload = resolve;
              img.onerror = resolve;
            });
          }));
         
          // Generate PDF
          await html2pdf().set(options).from(element).save();
          setLoading(false);
        } catch (error) {
          console.error("Error generating PDF:", error);
        }
      } else {
        console.error("Template reference is null. Please ensure the builder page is loaded.");
      }
  };

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>
          {title} - {t`Reactive Resume`}
        </title>
      </Helmet>

      {/* Back Button Top Left */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "fixed",
          top: 32,
          left: 32,
          zIndex: 1100,
          background: "white",
          border: "none",
          borderRadius: "9999px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          padding: "0.75rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontWeight: 600,
          fontSize: "1.1rem",
          cursor: "pointer"
        }}
      >
        <ArrowLeft size={24} />
        Back
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        //   width: "100vw",
          overflow: "hidden",
       
        }}
      >
        <iframe
          ref={setFrameRef}
          title={resume.id}
          src="/artboard/builder"
            className="w-full h-full"
        />
      </div>
      {/* Floating Download Button */}
      <div style={{ position: "fixed", bottom: 40, right: 40, zIndex: 1000 }}>
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 text-white px-16 py-7 rounded-full font-bold text-xl flex items-center gap-6 shadow-2xl transition-transform duration-200 hover:scale-105 hover:shadow-blue-400/60 focus:outline-none focus:ring-4 focus:ring-blue-300 animate-pulse"
          onClick={onDownloadPdf}
          disabled={loading}
          style={{ boxShadow: '0 8px 32px 0 rgba(0, 80, 200, 0.25)' }}
        >
          {loading ? (
            <CircleNotch size={32} className="animate-spin" />
          ) : (
            <Download size={32} />
          )}
          <span style={{ fontSize: '1.5rem', letterSpacing: '0.03em' }}>Download</span>
        </Button>
      </div>
    </>
  );
};

export default PreviewPage; 