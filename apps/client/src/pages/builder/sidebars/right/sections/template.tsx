import { t } from "@lingui/macro";
import { AspectRatio } from "@reactive-resume/ui";
import { cn, templatesList } from "@reactive-resume/utils";
import { motion } from "framer-motion";

import { useResumeStore } from "@/client/stores/resume";
import { useDialog } from "@/client/stores/dialog";
import { SectionIcon } from "../shared/section-icon";
import { useGetTemplateList } from "@/client/services/template/template";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LimitReachedModal } from "@/client/pages/select-template/LimitReachedModal";

interface Template {
  id: number;
  name: string;
  withPhoto: boolean;
  withoutPhoto: boolean;
  oneColumn: boolean;
  twoColumn: boolean;
}

export const TemplateSection = ({selectedFilter,showTemplateButton}:{selectedFilter:any,showTemplateButton:any}) => {
  const setValue = useResumeStore((state) => state.setValue);
  const progress = useResumeStore((state) => state?.resume?.data?.metadata?.template);
  const { open } = useDialog("resume");
  console.log(templatesList,"templatesList")
  const [templatesItem, setTemplatesItem] = useState<Template[]>([]);
  const { getTemplateList, loading, templateData } = useGetTemplateList();
  const [isLimitReachedModalOpen, setIsLimitReachedModalOpen] = useState(false);
  const user = localStorage.getItem("user") || '{"isPlanReached":[],"count":0}';
  const userData = JSON.parse(user);
  let isSubscriptionHave = userData?.subscription_details;
  let resumeCount=userData?.resume_count;
  let resumeDetailsId=userData?.resume_details[0]?.id;

  const navigate = useNavigate()

   useEffect(()=>{
    if(selectedFilter?.withPhoto){
      setTemplatesItem(templatesList.filter((template)=>template.withPhoto))
    }else{
      setTemplatesItem(templatesList)
    }


    if(selectedFilter?.withoutPhoto){
      setTemplatesItem(templatesList.filter((template)=>template.withoutPhoto))
    }else{
      setTemplatesItem(templatesList)
    }
    
      if(selectedFilter?.oneColumn){
      setTemplatesItem(templatesList.filter((template)=>template.oneColumn))
    }
    if(selectedFilter?.twoColumn){
      setTemplatesItem(templatesList.filter((template)=>template.twoColumn))
    }

   },[selectedFilter])

useEffect(()=>{
  getTemplateList({title:"",visibility:"public"})
  setTemplatesItem(templatesList)
},[])

const selectedTemplateId = (crrTemplate: string) => {
  // const templateId = templateData?.find((template:any) => template.internal_name === crrTemplate)
  // if (templateId) {
  //   localStorage.setItem("templateId", templateId.id.toString())
  //   navigate(`/onboard/upload-resume`)
  // }

  if((isSubscriptionHave?.length==0|| isSubscriptionHave==null) && resumeCount==1){
    setIsLimitReachedModalOpen(true)
  }else{
     const templateId = templateData?.find((template:any) => template.internal_name === crrTemplate)
     console.log(templateId,"templateId")
     if (templateId) {
    localStorage.setItem("templatedata", JSON.stringify(templateId))
    open("create");

    // navigate(`/onboard/upload-resume`)
  }
  }

}
 
  return (
    <section id="template" className="grid gap-y-6">
      {!showTemplateButton && <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon id="template" size={18} name={t`Template`} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{t`Template`}</h2>
        </div>
      </header>}
      <main className="grid grid-cols-3 gap-8 @lg/right:grid-cols-3 @2xl/right:grid-cols-4">
        {templatesItem.map((template, index) => (
          <AspectRatio key={template.id} ratio={1 / 1.4142}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: index * 0.1 } }}
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
              className={cn(
                "relative cursor-pointer rounded-sm ring-primary transition-all hover:ring-1"
                // currentTemplate === template.name && "ring-2",
              )}
              onClick={() => {
                if(!showTemplateButton){
                  let newData={
                    ...template,
                    progress:progress.progress
                  }

                  console.log(newData,"templateNew");
                  setValue("metadata.template", newData);
                }
              }}
            > 
              <img src={`/templates/jpg/${template.name}.jpg`} alt={template.name} className="rounded-sm" />

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* <p className="font-bold capitalize text-primary bg-white/80 px-4 py-1 rounded">
                  {template.name}
                </p> */}
               <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50 border-0">
                  { showTemplateButton && <button 
                    className="bg-blue-500 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      selectedTemplateId(template.name)

                      // 
                      // open("create");
                      // setValue("metadata.template", template);
                    }}
                  >
                    Use This Template
                  </button>}
                </div>
              </div>
            </motion.div>
          </AspectRatio>
        ))}
      </main>
      <LimitReachedModal isOpen={isLimitReachedModalOpen} onClose={() => setIsLimitReachedModalOpen(false)} resumeDetailsId={resumeDetailsId} />
    </section>
  );
};
