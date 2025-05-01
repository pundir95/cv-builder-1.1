import { t } from "@lingui/macro";
import { ScrollArea, Separator } from "@reactive-resume/ui";
import { useRef, useState } from "react";

import { Copyright } from "@/client/components/copyright";
import { ThemeSwitch } from "@/client/components/theme-switch";

import { CssSection } from "./sections/css";
import { ExportSection } from "./sections/export";
import { InformationSection } from "./sections/information";
import { LayoutSection } from "./sections/layout";
import { NotesSection } from "./sections/notes";
import { PageSection } from "./sections/page";
import { SharingSection } from "./sections/sharing";
import { StatisticsSection } from "./sections/statistics";
import { TemplateSection } from "./sections/template";
import { ThemeSection } from "./sections/theme";
import { TypographySection } from "./sections/typography";
import { SectionIcon } from "./shared/section-icon";

interface RightSidebarProps {
  showRightSidebar: boolean;
  setShowRightSidebar: (show: boolean) => void;
  setShowLeftSidebar: (show: boolean) => void;
  showLeftSidebar: boolean;
}

export const RightSidebar = ({ showRightSidebar, setShowRightSidebar, setShowLeftSidebar, showLeftSidebar }: RightSidebarProps) => {
  let showTemplateButton = false;
  const [selectedFilter, setSelectedFilter] = useState<any>(null);
  const containterRef = useRef<HTMLDivElement | null>(null);

  const scrollIntoView = (selector: string) => {
    const section = containterRef.current?.querySelector(selector);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex bg-secondary-accent/30">
      <ScrollArea orientation="vertical" className={`h-screen flex-1 pb-16 lg:pb-0 transition-all duration-300 bg-[#a4abbbbd] ${!showRightSidebar ? 'w-0 opacity-0' : 'w-full opacity-100'}`}>
       <div 
         ref={containterRef} 
         className={`grid gap-y-6 p-6 @container/right transition-all duration-300 ${!showRightSidebar ? 'w-0 opacity-0 translate-x-full' : 'w-full opacity-100 translate-x-0'}`}
       >
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">Advance Features</p>
            {/* <SectionIcon
              id="collapse"
              name={t`Collapse`}
              className="cursor-pointer sm:hidden" 
              onClick={() => {
                const sidebar = containterRef.current?.parentElement;
                sidebar?.classList.toggle("hidden");
              }}
            /> */}
          </div>
          <TemplateSection showTemplateButton={showTemplateButton} selectedFilter={selectedFilter} />
          <Separator />
          <LayoutSection />
          <Separator />
          <TypographySection />
          <Separator />
          <ThemeSection />
          <Separator />
          <PageSection />
          <Separator />
          <ExportSection />
          <Separator />
          {/* <CssSection />
          <Separator /> */}
          {/* <PageSection />
          <Separator /> */}
           <SharingSection /> 
          <Separator />
          <StatisticsSection />
          <Separator />
          {/* <ExportSection /> */}
          {/* <Separator /> */}
          {/* <NotesSection /> */}
          {/* <Separator /> */}
          {/* <InformationSection /> */}
          {/* <Separator /> */}
          {/* <Copyright className="text-center" /> */}
          
        </div>
      </ScrollArea>

      {!showRightSidebar && <div className="hidden basis-12 flex-col items-center justify-between  bg-blue-500 py-4 sm:flex">
        <div className="flex items-center">
          <SectionIcon
            id="collapse"
            name={t`Collapse`}
            className="cursor-pointer"
            onClick={() => {
              setShowRightSidebar(!showRightSidebar);
              setShowLeftSidebar();
            }}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-y-2">
          <SectionIcon
            id="template"
            name={t`Template`}
            onClick={() => {
              scrollIntoView("#template");
              setShowRightSidebar(true);
              setShowLeftSidebar(!showLeftSidebar);
            }}
          />
          <SectionIcon
            id="layout"
            name={t`Layout`}
            onClick={() => {
              scrollIntoView("#layout");
              setShowRightSidebar(true);
              setShowLeftSidebar(!showLeftSidebar);
            }}
          />
          <SectionIcon
            id="typography"
            name={t`Typography`}
            onClick={() => {
              scrollIntoView("#typography");
              setShowRightSidebar(true);
              setShowLeftSidebar(!showLeftSidebar);
            }}
          />
          <SectionIcon
            id="theme"
            name={t`Theme`}
            onClick={() => {
              scrollIntoView("#theme");
              setShowRightSidebar(true);
              setShowLeftSidebar(!showLeftSidebar);
            }}
          />
          <SectionIcon
            id="page"
            name={t`Page`}
            onClick={() => {
              scrollIntoView("#page");
              setShowRightSidebar(true);
              setShowLeftSidebar(!showLeftSidebar);
            }}
          />
          <SectionIcon
            id="export"
            name={t`Export`}
            onClick={() => {
              scrollIntoView("#export");
              setShowRightSidebar(true);
              setShowLeftSidebar(!showLeftSidebar);
            }}
          />
        </div>

        <ThemeSwitch size={14} />
      </div>}
    </div>
  );
};
