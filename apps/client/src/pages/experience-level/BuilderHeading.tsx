import { BUILDER_HEADING } from "./constant";
import { motion } from "framer-motion";

const BuilderHeading = ({ headingValue }: { headingValue: 'experience_time' | 'is_student' | 'experience_level' | 'choose_template' | 'upload_resume' | 'choose_file' }) => {
    let headingItem = BUILDER_HEADING[headingValue] as { main: string; para?: string };
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto text-center mt-8 mb-6"
    >
      <motion.h1 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 tracking-tight"
      >
        {headingItem?.main}
      </motion.h1>
      {headingItem?.para && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed"
        >
          {headingItem.para}
        </motion.p>
      )}
    </motion.div>
  );
};

export default BuilderHeading;
