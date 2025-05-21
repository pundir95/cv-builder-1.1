import { t } from "@lingui/macro";
import {
  CheckCircle,
  CopySimple,
  DotsThreeVertical,
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

  const onOpen = () => {
    void navigate(`/builder/${resume.id}`);
  };

  const onUpdate = () => {
    open("update", { id: "resume", item: resume });
  };

  const onDuplicate = () => {
    open("duplicate", { id: "resume", item: resume });
  };

  const onLockChange = () => {
    lockOpen(resume.locked ? "update" : "create", { id: "lock", item: resume });
  };

  const onDelete = () => {
  };

  const onDownload = () => {
  };

  const onCheck = () => {
   void navigate(`/builder/${resume.id}?improve=true`);
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
        {resume.locked ? (
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
        )}
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
            <Button size="sm" variant="secondary" onClick={onDownload} title="Download">
              <TrashSimple size={16} />
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
