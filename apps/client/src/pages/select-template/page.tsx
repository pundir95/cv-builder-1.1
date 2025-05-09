import { useState } from "react";
import BuilderHeading from "../experience-level/BuilderHeading";
import FilterPanel from "./FilterPanel";
import { TemplateSection } from "../builder/sidebars/right/sections/template";
import { LimitReachedModal } from "./LimitReachedModal";
import { ResumeDialog } from "../dashboard/resumes/_dialogs/resume";
import { useDialog } from "@/client/stores/dialog";


const ChooseTemplate = () => {
  const [hoveredColor, setHoveredColor] = useState(null);
  let showTemplateButton=true
  const [selectedFilter,setSelectedFilter]=useState({
    withPhoto:false,
    withoutPhoto:false,
    oneColumn:false,
    twoColumn:false,
    traditional:false,
    creative:false,
    contemporary:false,
  })
 

const onChange=(value: keyof typeof selectedFilter)=>{
  setSelectedFilter((prev)=>({
    ...prev,
    [value]:!prev[value]
  }))
}


  return (
    <>
      <div className="min-h-screen bg-white">
        <BuilderHeading headingValue="choose_template" />
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            <div className="w-72 shrink-0">
              <FilterPanel 
                setHoveredColor={setHoveredColor}
                setSelectedFilter={setSelectedFilter}
                onChange={onChange}
              />
            </div>

            <div className="w-full bg-gray-50 rounded-xl p-8 shadow-inner">
              <div className="max-w-4xl mx-auto bg-[#F4F5FF] rounded-lg shadow-sm">
                <TemplateSection selectedFilter={selectedFilter} showTemplateButton={showTemplateButton}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <LimitReachedModal isOpen={isLimitReachedModalOpen} onClose={() => setIsLimitReachedModalOpen(false)} resumeDetailsId={resumeDetailsId} /> */}
      {/* <ResumeDialog /> */}
    </>
  );
};

export default ChooseTemplate;
