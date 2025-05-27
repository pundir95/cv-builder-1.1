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

type Props = {
  resume: ResumeDto;
  asTableRow?: boolean;
};

export const ResumeListItem = ({ resume, asTableRow }: Props) => {
  const navigate = useNavigate();
  const { open } = useDialog<ResumeDto>("resume");
  const { open: lockOpen } = useDialog<ResumeDto>("lock");

  const lastUpdated = dayjs().to(resume.updatedAt);
  const createdAt = dayjs(resume.createdAt).format("DD/MM/YYYY");
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

      const templateRef = sharedState.getTemplateRef();
      
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
            <Button size="sm" variant="success" onClick={onDuplicate} title="Check">
              <CheckCircle size={16} />
              <span className="ml-1 hidden sm:inline" onClick={onCheck}>Check</span>
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
          // onCheck={onDuplicate}
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
