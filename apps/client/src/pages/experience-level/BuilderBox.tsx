import { useState } from "react";
import BuilderHeading from "./BuilderHeading";
import { motion } from "framer-motion";

const BuilderBox = ({ data, handleClick, headingValue }: { data: any, handleClick: any, headingValue: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BuilderHeading headingValue={headingValue} />
      <div className="flex justify-center">
        <div className="w-full md:w-9/12">
          <div className="mt-6 md:mt-8">
            <div className="flex flex-row flex-wrap gap-4 justify-center">
              {data?.map((item: any, index: number) => {
                return (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 text-base font-medium shadow-sm ${
                      item?.isSelected 
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md" 
                        : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                    }`}
                    onClick={() => handleClick(item, index, headingValue)}
                  >
                    {item.name || item.label}
                  </motion.span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BuilderBox;
