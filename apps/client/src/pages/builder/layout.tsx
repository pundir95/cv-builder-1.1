import { useBreakpoint } from "@reactive-resume/hooks";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  VisuallyHidden,
} from "@reactive-resume/ui";
import { VerificationModal } from "../builder/_components/verification-modal";
import { cn } from "@reactive-resume/utils";
import { Outlet, useLocation } from "react-router";

import { useBuilderStore } from "@/client/stores/builder";

import { BuilderHeader } from "./_components/header";
import { BuilderToolbar } from "./_components/toolbar";
import { LeftSidebar } from "./sidebars/left";
import { RightSidebar } from "./sidebars/right";
import { useEffect, useState } from "react";
import ImproveResume from "@/client/components/ImproveResume";

const onOpenAutoFocus = (event: Event) => {
  event.preventDefault();
};

const OutletSlot = ({ showRightSidebar, setShowRightSidebar,showLeftSidebar,setShowLeftSidebar }: { showRightSidebar: boolean, setShowRightSidebar: (show: boolean) => void,showLeftSidebar:boolean,setShowLeftSidebar:(show:boolean)=>void }) => (

  <>
    <BuilderHeader showRightSidebar={showRightSidebar} setShowRightSidebar={setShowRightSidebar} showLeftSidebar={showLeftSidebar} setShowLeftSidebar={setShowLeftSidebar}/>
    {window.location.search.includes('improve=true') && <ImproveResume />}
    {/* <div className="absolute inset-0"> */}
      <Outlet />
    {/* </div> */}

    {/* <BuilderToolbar /> */}
  </>
);

export const BuilderLayout = () => {
  const { isDesktop } = useBreakpoint();
  const location=useLocation()
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  useEffect(() => {
    // Check if URL contains 'anyone'
    if (location.pathname.includes('/anyone/')) {
      const isVerified = localStorage.getItem('resume_verified') === 'true';
      if (!isVerified) {
        setShowVerificationModal(true);
      }
    }
  }, [location]);

  const handleVerificationComplete = (userData: { name: string; email: string; phone: string }) => {
    localStorage.setItem('resume_verified', 'true');
    localStorage.setItem('user_verification_data', JSON.stringify(userData));
    setShowVerificationModal(false);
  };

  const sheet = useBuilderStore((state) => state.sheet);

  const leftSetSize = useBuilderStore((state) => state.panel.left.setSize);
  const rightSetSize = useBuilderStore((state) => state.panel.right.setSize);

  const leftHandle = useBuilderStore((state) => state.panel.left.handle);
  const rightHandle = useBuilderStore((state) => state.panel.right.handle);
  const [showRightSidebar, setShowRightSidebar] = useState<boolean>(false);
  const [showLeftSidebar, setShowLeftSidebar] = useState<boolean>(true);
  console.log(showLeftSidebar,"showLeftSidebar")

  if (isDesktop) {
    return (
      <>
      <div className="relative size-full overflow-hidden">
        <PanelGroup direction="horizontal">
         {showLeftSidebar? <Panel
            minSize={50}
            maxSize={55}
            defaultSize={55}
            className={cn("z-10 bg-background", !leftHandle.isDragging && "transition-[flex]")}
            onResize={leftSetSize}
          >
            <LeftSidebar showLeftSidebar={showLeftSidebar} setShowLeftSidebar={setShowLeftSidebar} setShowRightSidebar={setShowRightSidebar} showRightSidebar={showRightSidebar} />
          </Panel>
          : <LeftSidebar showLeftSidebar={showLeftSidebar} setShowLeftSidebar={setShowLeftSidebar} setShowRightSidebar={setShowRightSidebar} showRightSidebar={showRightSidebar} />}
         
          <Panel>
            <OutletSlot showRightSidebar={showRightSidebar} setShowRightSidebar={setShowRightSidebar} showLeftSidebar={showLeftSidebar} setShowLeftSidebar={setShowLeftSidebar}/>
          </Panel>
        
        {showRightSidebar ?<Panel
            minSize={45}
            maxSize={45}
            defaultSize={45}
            className={cn("z-10 bg-background", !rightHandle.isDragging && "transition-[flex]")}
            onResize={rightSetSize}
          >
            <RightSidebar showRightSidebar={showRightSidebar} setShowRightSidebar={setShowRightSidebar} setShowLeftSidebar={setShowLeftSidebar}  showLeftSidebar={showLeftSidebar}/>
          </Panel> : <RightSidebar showRightSidebar={showRightSidebar} setShowRightSidebar={setShowRightSidebar} setShowLeftSidebar={setShowLeftSidebar} showLeftSidebar={showLeftSidebar} />}
        </PanelGroup>
      </div>
      <VerificationModal 
        isOpen={showVerificationModal}
        onClose={() =>setShowVerificationModal(false)}
        onVerificationComplete={handleVerificationComplete}
      />
      </>
    );
  }

  return (
    <div className="relative">
      <Sheet open={sheet.left.open} onOpenChange={sheet.left.setOpen}>
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>
        </VisuallyHidden>

        <SheetContent
          side="left"
          showClose={false}
          className="top-16 p-0 sm:max-w-xl"
          onOpenAutoFocus={onOpenAutoFocus}
        >
          <LeftSidebar showLeftSidebar={showLeftSidebar} setShowLeftSidebar={setShowLeftSidebar} setShowRightSidebar={setShowRightSidebar} showRightSidebar={showRightSidebar} />
        </SheetContent>
      </Sheet>

      <OutletSlot showRightSidebar={showRightSidebar} setShowRightSidebar={setShowRightSidebar} showLeftSidebar={showLeftSidebar} setShowLeftSidebar={setShowLeftSidebar}/>

      <Sheet open={sheet.right.open} onOpenChange={sheet.right.setOpen}>
        <SheetContent
          side="right"
          showClose={false}
          className="top-16 p-0 sm:max-w-xl"
          onOpenAutoFocus={onOpenAutoFocus}
        >
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle />
              <SheetDescription />
            </SheetHeader>
          </VisuallyHidden>

          <RightSidebar showRightSidebar={showRightSidebar} setShowRightSidebar={setShowRightSidebar} setShowLeftSidebar={setShowLeftSidebar} showLeftSidebar={showLeftSidebar} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
