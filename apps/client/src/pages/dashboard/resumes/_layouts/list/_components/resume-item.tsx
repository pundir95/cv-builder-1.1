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
  UserCheck,
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
import { useState } from "react";

import { useDialog } from "@/client/stores/dialog";
import { SubscriptionModal } from "@/client/components";

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
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: "", message: "" });

  const lastUpdated = dayjs().to(resume.updated_at);
  const createdAt = dayjs(resume.created_at).format("DD/MM/YYYY");
  const strength = resume.cv_data?.metadata?.template?.progress || 0;
  const user=localStorage.getItem("user");
  const userData=JSON.parse(user || "{}");
  const hasSubscription = userData?.subscription_details?.length > 0;

  const showSubscriptionRequiredModal = (title: string, message: string) => {
    setModalConfig({ title, message });
    setShowSubscriptionModal(true);
  };

  const onCheck = () => {
    if(userData.subscription_details.length == 0){
      showSubscriptionRequiredModal(
        "Upgrade to Check Resume",
        "Checking resume improvements requires a premium subscription. Upgrade now to unlock AI-powered resume analysis!"
      );
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
      showSubscriptionRequiredModal(
        "Upgrade to Duplicate Resume",
        "Duplicating resumes requires a premium subscription. Upgrade now to create multiple versions of your resume!"
      );
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
      // if(userData.subscription_details.length == 0){
      //   toast({
      //     title: "You need to subscribe to download the resume",
      //     description: "Please subscribe to download the resume",
      //     variant: "error",
      //   });
      //   return;
      // }
      if(!hasSubscription){
        showSubscriptionRequiredModal(
          "Upgrade to Download Resume",
          "Downloading resumes requires a premium subscription. Upgrade now to export your resume in multiple formats!"
        );
        return;
      }
      void navigate(`/preview/${resume.id}`);
    }
    
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
          <div className="flex items-center gap-2">
            <div className="font-medium text-gray-900 whitespace-nowrap">{resume.title}</div>
            {resume.human_verification && (
              <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                <UserCheck size={12} />
                <span>Human Verified</span>
              </div>
            )}
          </div>
          <div className="text-xs text-gray-500 whitespace-nowrap">{lastUpdated}</div>
        </td>
        <td className="px-6 py-4 align-middle text-gray-700">{createdAt}</td>
        <td className="px-6 py-4 align-middle text-center lg:text-right">
          <span className="inline-block rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-500">
            {strength}
          </span>
        </td>
        <td className="px-6 py-4 align-middle text-right">
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="primary" className="text-white px-4 py-2 rounded-full" onClick={onOpen} title="Edit">
              <PencilSimple size={16} />
              <span className="ml-1 hidden sm:inline">Edit</span>
            </Button>
            <Button size="sm" variant="success" className="text-white px-4 py-2 rounded-full"  title="Check" onClick={onCheck}>
              <CheckCircle size={16} />
              <span className="ml-1 whitespace-nowrap hidden sm:inline" id="check">Improve Resume</span>
            </Button>
            <Button size="sm" className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-800" onClick={onPdfExport} title="Download">
              <Download size={16} />
              <span className="ml-1 hidden sm:inline">Download</span>
            </Button>
            {dropdownMenu}
          </div>
        </td>
        {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        title={modalConfig.title}
        message={modalConfig.message}
      />
      </>
    );
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger className="even:bg-secondary/20">
        <BaseListItem
          className="group"
          title={
            <div className="flex items-center gap-2">
              <span>{resume.title}</span>
              {resume.human_verification && (
                <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  <UserCheck size={12} />
                  <span>Human Verified</span>
                </div>
              )}
            </div>
          }
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
