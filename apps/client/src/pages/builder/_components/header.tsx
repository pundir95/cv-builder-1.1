import { t } from "@lingui/macro";
import { HouseSimple, Lock, SidebarSimple, ArrowLeft, ChartLine } from "@phosphor-icons/react";
import { Button, Tooltip } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { Link, useNavigate } from "react-router";

import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore } from "@/client/stores/resume";
import { useProgressStore } from "@/client/stores/progress";

export const BuilderHeader = ({ showRightSidebar, setShowRightSidebar, showLeftSidebar, setShowLeftSidebar }: { showRightSidebar: boolean, setShowRightSidebar: (show: boolean) => void, showLeftSidebar: boolean, setShowLeftSidebar: (show: boolean) => void }) => {
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

  const getProgressColor = (progress: number) => {
    if (progress <= 50) return 'bg-yellow-500 hover:bg-yellow-600';
    if (progress <= 100) return 'bg-green-500 hover:bg-green-600';
    return 'bg-red-500 hover:bg-red-600';
  };

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-[60] h-16 bg-[#0D84F3]  backdrop-blur-lg lg:z-20 shadow-lg",
        !isDragging && "transition-[left,right]",
      )}
    >
      <div className="flex h-full items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            className="flex lg:hidden text-white hover:bg-blue-500"
            onClick={() => onToggle("left")}
          >
            <SidebarSimple size={24} />
          </Button>

          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/resumes')}
            className="text-white hover:bg-blue-500 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </Button>
        </div>

        {/* Center Section */}
        <div className="flex items-center justify-center gap-x-2 lg:mx-auto">
          <Button asChild size="icon" variant="ghost" className="text-white hover:bg-blue-500">
            <Link to="/dashboard/resumes">
              <HouseSimple size={22} />
            </Link>
          </Button>

          <span className="text-white/40 text-sm">/</span>

          <h1 className="font-medium text-white text-lg">{title}</h1>

          {locked && (
            <Tooltip content={t`This resume is locked, please unlock to make further changes.`}>
              <Lock size={16} className="ml-1 opacity-75 text-white" />
            </Tooltip>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Resume Score Card */}
          <div className="hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <ChartLine size={20} className="text-white" />
            <div className="flex flex-col">
              <span className="text-white/80 text-sm">Resume Score</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-white/80 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-300",
                      getProgressColor(progress.progress)
                    )}
                    style={{ width: `${progress.progress || 0}%` }}
                  />
                </div>
                <span className={cn(
                  "text-sm font-semibold px-2 py-0.5 rounded",
                  getProgressColor(progress.progress),
                  "text-white"
                )}>
                  {progress.progress || 0}%
                </span>
              </div>
            </div>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="flex lg:hidden text-white hover:bg-blue-500"
            onClick={() => onToggle("right")}
          >
            <SidebarSimple className="-scale-x-100" size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};
