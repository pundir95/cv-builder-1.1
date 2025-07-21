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
import {axios} from "@/client/libs/axios";
import { OTPVerificationModal } from "../../../../artboard/src/components/otp-verification";


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

    <BuilderToolbar />
  </>
);

export const BuilderLayout = () => {
  const { isDesktop } = useBreakpoint();
  const location=useLocation()
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showOTPVerificationModal, setShowOTPVerificationModal] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    // Check if URL contains 'anyone'
    if (location.pathname.includes('/anyone/')) {
      const isVerified = localStorage.getItem('resume_verified') === 'true';
      if (!isVerified) {
        setShowVerificationModal(true);
      }
    }
  }, [location]);

  const handleVerificationComplete = async (userData: { name: string; email: string; phone: string }) => {
    // Extract resume ID from URL
    const resumeId = location.pathname.split('/anyone/')[1]?.split('?')[0];
    // Extract ref_id from URL query parameters
    const urlParams = new URLSearchParams(location.search);
    const shreId = urlParams.get('shared_id');
    
    if (!resumeId) {
      console.error('Resume ID not found in URL');
      return;
    }
    try {
      const response = await axios.post('/share-resume/share-resume/', {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        cv:resumeId,
        share_resume_to_anyone_rec:shreId

      });
      setEmail(userData.email)
      setShowOTPVerificationModal(true)
      setShowVerificationModal(false);
      console.log(response,"response")
    } catch (error) {
      console.error('Verification failed:', error);
    }
    // localStorage.setItem('resume_verified', 'true');
    // localStorage.setItem('user_verification_data', JSON.stringify(userData));
    // setShowVerificationModal(false);
  };

  const handleOTPVerificationComplete = async (otp: string) => {
    try {
      const response = await axios.post('/share-resume/verify-email/', {
        otp: otp,
        email:email,
      });
      console.log(response,"response")
      setShowOTPVerificationModal(false)
      setShowVerificationModal(false)
      localStorage.setItem('resume_verified', 'true');
    } catch (error) {
      console.log(error,"error")
    }
  }

  const sheet = useBuilderStore((state) => state.sheet);

  const leftSetSize = useBuilderStore((state) => state.panel.left.setSize);
  const rightSetSize = useBuilderStore((state) => state.panel.right.setSize);

  const leftHandle = useBuilderStore((state) => state.panel.left.handle);
  const rightHandle = useBuilderStore((state) => state.panel.right.handle);
  const [showRightSidebar, setShowRightSidebar] = useState<boolean>(false);
  const [showLeftSidebar, setShowLeftSidebar] = useState<boolean>(true);
  console.log(showLeftSidebar,"showLeftSidebar")

  if (true) {
    return (
      <>
      <div className="relative size-full overflow-hidden">
        <div className="lg:hidden">
          <button className="bg-blue-600 text-white px-6 py-4 rounded-full fixed bottom-4 right-4 z-20">Preview</button>
        </div>
        <PanelGroup direction="horizontal">
         {showLeftSidebar? <Panel
            className={cn("z-10 bg-background !flex-grow-1 lg:!flex-grow-[55] !flex-shrink !basis-0", !leftHandle.isDragging && "transition-[flex]")}
            onResize={leftSetSize}
          >
            <LeftSidebar showLeftSidebar={showLeftSidebar} setShowLeftSidebar={setShowLeftSidebar} setShowRightSidebar={setShowRightSidebar} showRightSidebar={showRightSidebar} />
          </Panel>
          : <LeftSidebar showLeftSidebar={showLeftSidebar} setShowLeftSidebar={setShowLeftSidebar} setShowRightSidebar={setShowRightSidebar} showRightSidebar={showRightSidebar} />}
         
          <Panel className="!flex-grow-0 lg:!flex-grow-[45] !flex-shrink !basis-0">
            <OutletSlot showRightSidebar={showRightSidebar} setShowRightSidebar={setShowRightSidebar} showLeftSidebar={showLeftSidebar} setShowLeftSidebar={setShowLeftSidebar}/>
          </Panel>
        
        {showRightSidebar ?<Panel
            className={cn("z-10 bg-background absolute top-0 right-0 w-[80%] shadow-lg lg:shadow-none lg:relative lg:!flex-grow-[55]  !flex-shrink !basis-0", !rightHandle.isDragging && "transition-[flex]")}
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
      <OTPVerificationModal
        isOpen={showOTPVerificationModal}
        onClose={() => setShowOTPVerificationModal(false)}
        onVerificationComplete={handleOTPVerificationComplete}
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
