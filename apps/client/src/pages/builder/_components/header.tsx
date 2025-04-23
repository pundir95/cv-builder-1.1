import { t } from "@lingui/macro";
import { HouseSimple, Lock, SidebarSimple } from "@phosphor-icons/react";
import { Button, Tooltip } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { Link } from "react-router";

import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore } from "@/client/stores/resume";

export const BuilderHeader = ({ showRightSidebar, setShowRightSidebar,showLeftSidebar,setShowLeftSidebar }: { showRightSidebar: boolean, setShowRightSidebar: (show: boolean) => void,showLeftSidebar:boolean,setShowLeftSidebar:(show:boolean)=>void } ) => {
  const title = useResumeStore((state) => state.resume.title);
  const locked = useResumeStore((state) => state.resume.locked);

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
      style={{ left: `${showLeftSidebar ? leftPanelSize : 3}%`, right: `${showRightSidebar ? rightPanelSize : 3}%` }}
      className={cn(
        "fixed inset-x-0 top-0 z-[60] h-16  bg-blue-500 backdrop-blur-lg lg:z-20",
        !isDragging && "transition-[left,right]",
      )}
    >
      <div className="flex h-full items-center justify-between px-4">
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
          <div className="mb-1">
          <span className="bg-green-500 text-white px-1 mb-4 rounded">{30}%</span>
          <span className="ml-2 text-white text-bold">Resume Score</span>
          </div>
         
          <div 
            className="h-full bg-green-500 transition-[width] mb-2 hover:bg-green-600"
            style={{ width: `${30}%` }}
          >
          </div>
        </div>
      </div>
    </div>
  );
};
