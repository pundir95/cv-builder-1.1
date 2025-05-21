import { sortByDate } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Trash, Download } from "@phosphor-icons/react";

import { useResumes } from "@/client/services/resume";

import { BaseListItem } from "./_components/base-item";
import { CreateResumeListItem } from "./_components/create-item";
import { ImportResumeListItem } from "./_components/import-item";
import { ResumeListItem } from "./_components/resume-item";

export const ListView = ({ resumes, loading }: { resumes: any[], loading: boolean } ) => {
  return (
    <div className="grid gap-y-2">
      {/* <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
        <CreateResumeListItem />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
      >
        <ImportResumeListItem />
      </motion.div> */}

      {loading ? (
        Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="duration-300 animate-in fade-in"
            style={{ animationFillMode: "backwards", animationDelay: `${i * 300}ms` }}
          >
            <BaseListItem className="bg-secondary/40" />
          </div>
        ))
      ) : (
        <div className="overflow-x-auto rounded-lg border border-secondary/20">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-blue-500 hover:bg-blue-600 text-white">
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Creation</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-white">Strength</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {resumes
                  .sort((a, b) => sortByDate(a, b, "updatedAt"))
                  .map((resume, index) => (
                    <motion.tr
                      key={resume.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                      exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.5 } }}
                      className="border-b border-secondary/20 hover:bg-secondary/5"
                    >
                      <ResumeListItem resume={resume} asTableRow />
                    </motion.tr>
                  ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
