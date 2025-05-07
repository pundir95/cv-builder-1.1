import { t } from "@lingui/macro";
import limitReachedImage from "../../assets/limit.png";
import { Dialog, DialogContent } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

interface LimitReachedModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeDetailsId: string;
}

export const LimitReachedModal = ({ isOpen, onClose, resumeDetailsId }: LimitReachedModalProps) => {
  const navigate=useNavigate();

  const skipModal=()=>{
    navigate(`/builder/${resumeDetailsId}`)
    
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-white to-gray-50 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative"
          >
            <img 
              src={limitReachedImage} 
              alt="Limit Reached"
              className="w-56 h-56 mb-6 drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)]" 
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl -z-10" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm"
          >
            You are over the resume limit
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 mb-8 text-lg"
          >
            {`Only one resume is available on the free plan. Upgrade your plan to create an unlimited number of resumes.`}
          </motion.p>

          <div className="w-full bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300">
            <h3 className="font-semibold text-left mb-4 text-lg text-gray-800">ALSO UNLOCK:</h3>
            <ul className="space-y-4 text-left mb-8">
              {[
                `Access to all templates`,
                `Unlimited resume downloads`,
                `Access to advanced features`,

              ].map((feature, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                    <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-base">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex justify-end gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={skipModal}
                className="px-6 py-2.5 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Skip
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={()=>{
                  navigate("/dashboard/plan-pricing")
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-[0_4px_14px_rgba(59,130,246,0.4)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.5)]"
              >
                Upgrade Plan
              </motion.button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

