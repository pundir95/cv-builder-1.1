import { t } from "@lingui/macro";
import { HouseSimple, Lock, SidebarSimple, ArrowLeft } from "@phosphor-icons/react";
import { Button, Tooltip } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { Link, useNavigate } from "react-router";

import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore } from "@/client/stores/resume";
import { useProgressStore } from "@/client/stores/progress";

export const BuilderHeader = ({ showRightSidebar, setShowRightSidebar,showLeftSidebar,setShowLeftSidebar }: { showRightSidebar: boolean, setShowRightSidebar: (show: boolean) => void,showLeftSidebar:boolean,setShowLeftSidebar:(show:boolean)=>void } ) => {
  const navigate = useNavigate();
  const title = useResumeStore((state) => state.resume.title);
  const locked = useResumeStore((state) => state.resume.locked);
  const progress = useResumeStore((state) => state.resume.data.metadata.template);
  const toggle = useBuilderStore((state) => state.toggle);
  const isDragging = useBuilderStore(
    (state) => state.panel.left.handle.isDragging || state.panel.right.handle.isDragging,
  );
  const leftPanelSize = useBuilderStore((state) => state.panel.left.size);
  const rightPanelSize = useBuilderStore((state) => state.panel.right.size);

  const onToggle = (side: "left" | "right") => {
    toggle(side);
    setShowRightSidebar(!showRightSidebar);
  };

  return (
    <div
      // style={{ left: `${showLeftSidebar ? leftPanelSize : 3}%`, right: `${showRightSidebar ? rightPanelSize : 3}%` }}
      // style={{ left: "0%", right: "1.7%" }}

      className={cn(
        "fixed inset-x-0 top-0 z-[60] h-16  bg-blue-500 backdrop-blur-lg lg:z-20",
        !isDragging && "transition-[left,right]",
      )}
    >
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="flex lg:hidden"
            onClick={() => {
              onToggle("left");
            }}
          >
            <SidebarSimple />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-white mb-5"
          >
            <ArrowLeft />
            Back
          </Button>
        </div>

        <div className="flex items-center justify-center gap-x-1 lg:mx-auto">
          <Button asChild size="icon" variant="ghost">
            <Link to="/dashboard/resumes">
              <HouseSimple color="white" />
            </Link>
          </Button>

          <span className="mr-2 text-xs opacity-40 text-white">{"/"}</span>

          <h1 className="font-medium text-white">{title}</h1>

          {locked && (
            <Tooltip content={t`This resume is locked, please unlock to make further changes.`}>
              <Lock size={14} className="ml-2 opacity-75 text-white" />
            </Tooltip>
          )}
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="flex lg:hidden"
          onClick={() => {
            onToggle("right");
          }}
        >
          <SidebarSimple className="-scale-x-100" />
        </Button>
        <div className="absolute bottom-5 left-0 h-2 w-full bg-muted">
          <div className="mb-4 flex items-center justify-end gap-x-2">
            <span className={`text-xl font-bold transition-colors ${
              progress.progress <= 20 ? 'text-red-500 hover:text-red-400' :
              progress.progress <= 50 ? 'text-yellow-500 hover:text-yellow-400' :
              'text-white hover:text-green-400'
            }`}>Resume Score</span>
            <span className={`text-white  px-4 py-2 rounded-lg text-l font-bold transition-colors ${
              progress.progress <= 20 ? 'bg-red-500 hover:bg-red-600' :
              progress.progress <= 50 ? 'bg-yellow-500 hover:bg-yellow-600' : 
              'bg-green-500 hover:bg-green-600'
            }`}>{progress.progress}%</span>
          </div>
        
         
          <div 
            className={`h-full transition-[width] mb-2 ${
              progress.progress <= 20 ? 'bg-red-500 hover:bg-red-600' :
              progress.progress <= 50 ? 'bg-yellow-500 hover:bg-yellow-600' :
              'bg-green-500 hover:bg-green-600'
            }`}
            style={{ width: `${progress.progress}%`,marginTop:"-27px" }}
          >
          </div>
        </div>
      </div>
    </div>
  );
};
