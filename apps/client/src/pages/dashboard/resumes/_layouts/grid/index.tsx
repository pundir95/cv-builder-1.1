import { sortByDate } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";
import type { ResumeDto } from "@reactive-resume/dto";

import { useResumes } from "@/client/services/resume";

import { BaseCard } from "./_components/base-card";
import { CreateResumeCard } from "./_components/create-card";
import { ImportResumeCard } from "./_components/import-card";
import { ResumeCard } from "./_components/resume-card";
import { LimitReachedModal } from "@/client/pages/select-template/LimitReachedModal";
import { useState } from "react";

export const GridView = ({resumes,loading}:{resumes:any,loading:any}) => {
const [isLimitReachedModalOpen,setIsLimitReachedModalOpen]=useState(false)
const user = localStorage.getItem("user") || '{"isPlanReached":[],"count":0}';
  const userData = JSON.parse(user);
  let isSubscriptionHave = userData?.subscription_details;
  let resumeCount=userData?.resume_count;
  let resumeDetailsId=userData?.resume_details[0]?.id;

const onCloseLimitReached=()=>{
  setIsLimitReachedModalOpen(false)
}
  
  console.log(resumes,"outs")

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {/* <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
        <CreateResumeCard setIsLimitReachedModalOpen={setIsLimitReachedModalOpen} />
      </motion.div> */}

      {/* <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
      >
        <ImportResumeCard />
      </motion.div> */}

      {loading &&
        Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="duration-300 animate-in fade-in"
            style={{ animationFillMode: "backwards", animationDelay: `${i * 300}ms` }}
          >
            <BaseCard />
          </div>
        ))}

      {resumes && (
        <AnimatePresence>
          {resumes
            ?.map((resume: ResumeDto, index: number) => (
              <motion.div
                key={resume.id}
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0, transition: { delay: (index + 2) * 0.1 } }}
                exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.5 } }}
              >
                <ResumeCard resume={resume} />
              </motion.div>
            ))}
        </AnimatePresence>
      )}
      <LimitReachedModal isOpen={isLimitReachedModalOpen} onClose={onCloseLimitReached} resumeDetailsId={resumeDetailsId} />
    </div>
  );
};
