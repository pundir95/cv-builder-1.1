import { cn } from "@reactive-resume/utils";
import { PencilSimple, CheckCircle, DownloadSimple } from "@phosphor-icons/react";

type Props = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  start?: React.ReactNode;
  end?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onEdit?: () => void;
  onCheck?: () => void;
  onDownload?: () => void;
  created?: string;
  strength?: string;
};

export const BaseListItem = ({ title, description, created, strength, start, end, className, onClick, onEdit, onDownload }: Props) => (
  <div
    className={cn(
      "flex cursor-pointer items-center rounded-lg p-4 transition-all hover:bg-secondary/30 hover:shadow-md",
      className,
    )}
  >
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex flex-1 items-center gap-4">
        {start && <div className="flex size-5 items-center justify-center">{start}</div>}
        <div className="flex flex-col">
          <h4 className="w-[220px] truncate font-medium text-gray-900 lg:w-[320px]">
            {(title?.toString() ?? '').length > 20 ? `${title?.toString().substring(0, 20)}...` : title?.toString() ?? ''}
          </h4>
          <p className="hidden text-sm text-gray-600 sm:block">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {created && (
          <p className="hidden text-sm text-gray-500 sm:block">{created}</p>
        )}
        
        {strength && (
          <div className="hidden rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 sm:block">
            {strength}
          </div>
        )}

     

        {end && <div className="flex size-5 items-center justify-center">{end}</div>}
      </div>
    </div>
  </div>
);
