import { t } from "@lingui/macro";
import {
  CheckCircle,
  CopySimple,
  DotsThreeVertical,
  Download,
  FolderOpen,
  Lock,
  LockOpen,
  PencilSimple,
  TrashSimple,
} from "@phosphor-icons/react";
import type { ResumeDto } from "@reactive-resume/dto";
import {
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@reactive-resume/ui";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

import { useDialog } from "@/client/stores/dialog";

import { BaseListItem } from "./base-item";
import { sharedState } from "@/artboard/utils/sharedState";
import { axios } from "@/client/libs/axios";
import { toast } from "@/client/hooks/use-toast";
import html2pdf from "html2pdf.js";

type Props = {
  resume: ResumeDto;
  asTableRow?: boolean;
};

export const ResumeListItem = ({ resume, asTableRow }: Props) => {
  const navigate = useNavigate();
  const { open } = useDialog<ResumeDto>("resume");
  const { open: lockOpen } = useDialog<ResumeDto>("lock");

  const lastUpdated = dayjs().to(resume.updated_at);
  const createdAt = dayjs(resume.created_at).format("DD/MM/YYYY");
  const strength = resume.cv_data?.metadata?.template?.progress || 0;
  const user=localStorage.getItem("user");
  const userData=JSON.parse(user || "{}");

  const onCheck = () => {
    if(userData.subscription_details.length == 0){
      toast({
        title: "You need to subscribe to check the resume",
        description: "Please subscribe to check the improvement of your resume",
        variant: "error",
      });
      return;
    }
    void navigate(`/builder/${resume.id}?improve=true`);
   };

  const onOpen = () => {
    void navigate(`/builder/${resume.id}`);
  };

  const onUpdate = () => {
    open("update", { id: "resume", item: resume });
  };

  const onDuplicate = () => {
    if(userData.subscription_details.length === 0){
      toast({
        title: "You need to subscribe to duplicate resumes",
        description: "Please subscribe to duplicate resumes",
        variant: "error",
      });
      return;   
    }
    open("duplicate", { id: "resume", item: resume });
  };

  const onLockChange = () => {
    lockOpen(resume.locked ? "update" : "create", { id: "lock", item: resume });
  };

  const onDelete = () => {
    open("delete", { id: "resume", item: resume });
    
  };

    const onPdfExport = async () => {
      if(userData.subscription_details.length == 0){
        toast({
          title: "You need to subscribe to download the resume",
          description: "Please subscribe to download the resume",
          variant: "error",
        });
        return;
      }

      // First try to get template reference from shared state
      let templateRef = sharedState.getTemplateRef();
      console.log("Initial template ref:", templateRef);
      
      // If not available, try to get it from the builder iframe
      if (!templateRef) {
        console.log("Template ref not found in shared state, loading builder iframe...");
        // Create a temporary iframe to load the builder
        const tempIframe = document.createElement('iframe');
        tempIframe.style.display = 'none';
        tempIframe.src = `/builder/${resume.id}`;
        document.body.appendChild(tempIframe);

        // Wait for the iframe to load and request template reference
      
      }

      console.log("go to here", templateRef);
      
      if (templateRef) {
        console.log("Got template ref, preparing to generate PDF...");
        const templateString = templateRef.innerHTML;
        console.log("Template content length:", templateString.length);
        
        // Configure PDF options
        const options = {
          margin: 10,
          filename: `${resume.title || 'resume'}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            scale: 2,
            useCORS: true,
            allowTaint: true,
            imageTimeout: 0,
            logging: true,
            onclone: (clonedDoc: Document) => {
              // Ensure all styles are properly applied in the cloned document
              const styleSheets = document.styleSheets;
              for (let i = 0; i < styleSheets.length; i++) {
                try {
                  const rules = styleSheets[i].cssRules;
                  for (let j = 0; j < rules.length; j++) {
                    clonedDoc.styleSheets[i].insertRule(rules[j].cssText);
                  }
                } catch (e) {
                  console.warn('Could not copy stylesheet:', e);
                }
              }
            }
          },
          jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
          }
        };
  
        try {
          // Create a temporary div to hold the HTML content
          const element = document.createElement('div');
          element.innerHTML = templateString;
          
          // Copy all styles from the original template
          const originalStyles = templateRef.getAttribute('style');
          if (originalStyles) {
            element.setAttribute('style', originalStyles);
          }
          
          // Wait for images to load
          const images = element.getElementsByTagName('img');
          console.log("Found images to load:", images.length);
          await Promise.all(Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
              img.onload = resolve;
              img.onerror = resolve;
            });
          }));
          
          // Add a small delay to ensure everything is properly rendered
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          console.log("Generating PDF...");
          // Generate PDF
          await html2pdf().set(options).from(element).save();
          console.log("PDF generation completed");
        } catch (error) {
          console.error("Error generating PDF:", error);
          toast({
            title: "Error generating PDF",
            description: "There was an error generating your PDF. Please try again.",
            variant: "error",
          });
        }
      } else {
        console.error("Could not get template reference. Please try again.");
        toast({
          title: "Error",
          description: "Could not generate PDF. Please try again.",
          variant: "error",
        });
      }
    };



   
     
    
  

 

  const dropdownMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="aspect-square">
        <Button size="icon" variant="ghost">
          <DotsThreeVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            onOpen();
          }}
        >
          <FolderOpen size={14} className="mr-2" />
          {t`Open`}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            onUpdate();
          }}
        >
          <PencilSimple size={14} className="mr-2" />
          {t`Rename`}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            onDuplicate();
          }}
        >
          <CopySimple size={14} className="mr-2" />
          {t`Duplicate`}
        </DropdownMenuItem>
        {/* {resume.locked ? (
          <DropdownMenuItem
            onClick={(event) => {
              event.stopPropagation();
              onLockChange();
            }}
          >
            <LockOpen size={14} className="mr-2" />
            {t`Unlock`}
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={(event) => {
              event.stopPropagation();
              onLockChange();
            }}
          >
            <Lock size={14} className="mr-2" />
            {t`Lock`}
          </DropdownMenuItem>
        )} */}
        <ContextMenuSeparator />
        <DropdownMenuItem
          className="text-error"
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
        >
          <TrashSimple size={14} className="mr-2" />
          {t`Delete`}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (asTableRow) {
    return (
      <>
        <td className="px-6 py-4 align-middle">
          <div className="font-medium text-gray-900">{resume.title}</div>
          <div className="text-xs text-gray-500">{lastUpdated}</div>
        </td>
        <td className="px-6 py-4 align-middle text-gray-700">{createdAt}</td>
        <td className="px-6 py-4 align-middle text-right">
          <span className="inline-block rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
            {strength}
          </span>
        </td>
        <td className="px-6 py-4 align-middle text-right">
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="primary" onClick={onOpen} title="Edit">
              <PencilSimple size={16} />
              <span className="ml-1 hidden sm:inline">Edit</span>
            </Button>
            <Button size="sm" variant="success"  title="Check" onClick={onCheck}>
              <CheckCircle size={16} />
              <span className="ml-1 hidden sm:inline" id="check">Check</span>
            </Button>
            <Button size="sm" variant="secondary" className="bg-blue-500 text-white" onClick={onPdfExport} title="Download">
              <Download size={16} />
              <span className="ml-1 hidden sm:inline">Download</span>
            </Button>
            {dropdownMenu}
          </div>
        </td>
      </>
    );
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger className="even:bg-secondary/20">
        <BaseListItem
          className="group"
          title={resume.title}
          description={t`${lastUpdated}`}
          created={createdAt}
          strength={strength}
          end={dropdownMenu}
          onClick={onOpen}
          onEdit={onUpdate}
          onDownload={onDelete}
        />
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem onClick={onOpen}>
          <FolderOpen size={14} className="mr-2" />
          {t`Open`}
        </ContextMenuItem>
        <ContextMenuItem onClick={onUpdate}>
          <PencilSimple size={14} className="mr-2" />
          {t`Rename`}
        </ContextMenuItem>
        <ContextMenuItem onClick={onDuplicate}>
          <CopySimple size={14} className="mr-2" />
          {t`Duplicate`}
        </ContextMenuItem>
        {resume.locked ? (
          <ContextMenuItem onClick={onLockChange}>
            <LockOpen size={14} className="mr-2" />
            {t`Unlock`}
          </ContextMenuItem>
        ) : (
          <ContextMenuItem onClick={onLockChange}>
            <Lock size={14} className="mr-2" />
            {t`Lock`}
          </ContextMenuItem>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem className="text-error" onClick={onDelete}>
          <TrashSimple size={14} className="mr-2" />
          {t`Delete`}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
