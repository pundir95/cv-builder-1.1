import { t } from "@lingui/macro";
import { CircleNotch, FileJs, FilePdf } from "@phosphor-icons/react";
import { buttonVariants, Card, CardContent, CardDescription, CardTitle } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { saveAs } from "file-saver";
import { generatePDF } from "@/artboard/constants/download";
import { eventBus } from "@/artboard/utils/eventBus";
import { sharedState } from "@/artboard/utils/sharedState";

import { usePrintResume } from "@/client/services/resume/print";
import { useResumeStore } from "@/client/stores/resume";
import { useNavigate } from "react-router";
import { SectionIcon } from "../shared/section-icon";
import { useState, useEffect } from "react";
import { axios } from "@/client/libs/axios";

const onJsonExport = () => {
  const { resume } = useResumeStore.getState();
  const filename = `reactive_resume-${resume.id}.json`;
  const resumeJSON = JSON.stringify(resume.data, null, 2);

  saveAs(new Blob([resumeJSON], { type: "application/json" }), filename);
};

const openInNewTab = (url: string) => {
  const win = window.open(url, "_blank");
  if (win) win.focus();
};

export const ExportSection = () => {
  const navigate = useNavigate();
  const { printResume, loading } = usePrintResume();

  const onPdfExport = async () => {
    console.log("Window parent:", window.parent);
    console.log("Current window:", window);
    console.log("Shared state:", window.__RESUME_BUILDER__);
    
    const templateRef = sharedState.getTemplateRef();
    console.log("Template ref from shared state:", templateRef);
    
    if (templateRef) {
      const templateString = templateRef.innerHTML;
      axios.post(`cv-manager/cv-download/`, {
        
          "html_content": templateString,
          "cv_name": "Dummy"
      
      }, { responseType: 'blob' })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
      // generatePDF(templateRef);
    } else {
      console.error("Template reference is null. Please ensure the builder page is loaded.");
    }
  };

  return (
    <section id="export" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon id="export" size={18} name={t`Export`} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{t`Export`}</h2>
        </div>
      </header>

      <main className="grid gap-y-4">
        <Card
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-auto cursor-pointer flex-row items-center gap-x-5 px-4 pb-3 pt-1",
          )}
          onClick={onJsonExport}
        >
          <FileJs size={22} />
          <CardContent className="flex-1">
            <CardTitle className="text-sm">{t`JSON`}</CardTitle>
            <CardDescription className="font-normal">
              {t`Download a JSON snapshot of your resume. This file can be used to import your resume in the future, or can even be shared with others to collaborate.`}
            </CardDescription>
          </CardContent>
        </Card>

        <Card
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-auto cursor-pointer flex-row items-center gap-x-5 px-4 pb-3 pt-1",
            loading && "pointer-events-none cursor-progress opacity-75",
          )}
          onClick={onPdfExport}
          // onClick={() => {
          //   navigate("/dashboard/plan-pricing");
          // }}
        >
          {loading ? <CircleNotch size={22} className="animate-spin" /> : <FilePdf size={22} />}

          <CardContent className="flex-1">
            <CardTitle className="text-sm">{t`PDF`}</CardTitle>
            <CardDescription className="font-normal">
              {t`Download a PDF of your resume. This file can be used to print your resume, send it to recruiters, or upload on job portals.`}
            </CardDescription>
          </CardContent>
        </Card>
      </main>
    </section>
  );
};
