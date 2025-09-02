import { sortByDate } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";
import type { ResumeDto } from "@reactive-resume/dto";
import { useMemo } from "react";

import { BaseCard } from "./_components/base-card";
import { CreateResumeCard } from "./_components/create-card";
import { ImportResumeCard } from "./_components/import-card";
import { ResumeCard } from "./_components/resume-card";
import { LimitReachedModal } from "@/client/pages/select-template/LimitReachedModal";
import { Pagination } from "@/client/components/pagination";
import { useState } from "react";

interface GridViewProps {
  resumes: any[];
  loading: boolean;
  pagination: any;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const GridView = ({resumes, loading, pagination, currentPage, itemsPerPage, onPageChange}: GridViewProps) => {
const [isLimitReachedModalOpen,setIsLimitReachedModalOpen]=useState(false)
const user = localStorage.getItem("user") || '{"isPlanReached":[],"count":0}';
  const userData = JSON.parse(user);
  let isSubscriptionHave = userData?.subscription_details;
  let resumeCount=userData?.resume_count;
  let resumeDetailsId=userData?.resume_details[0]?.id;

const onCloseLimitReached=()=>{
  setIsLimitReachedModalOpen(false)
}

  // Calculate pagination values from server response
  const totalItems = pagination?.total || 0;
  const totalPages = pagination?.totalPages || Math.ceil(totalItems / itemsPerPage);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  // Sort resumes by date (server should handle this, but keeping as fallback)
  const sortedResumes = useMemo(() => {
    return resumes.sort((a, b) => sortByDate(a, b, "updatedAt"));
  }, [resumes]);

  // Pagination handlers
  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (hasPreviousPage) {
      onPageChange(currentPage - 1);
    }
  };
  
  console.log(resumes,"outs")

  return (
    <div className="space-y-6">
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
          {sortedResumes
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
      </div>

      {/* Pagination Component */}
      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          isLoading={loading}
          className="mt-4"
        />
      )}

      <LimitReachedModal isOpen={isLimitReachedModalOpen} onClose={onCloseLimitReached} resumeDetailsId={resumeDetailsId} />
    </div>
  );
};
