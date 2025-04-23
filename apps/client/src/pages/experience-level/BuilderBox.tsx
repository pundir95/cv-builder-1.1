import { useState } from "react";
import BuilderHeading from "./BuilderHeading";

const BuilderBox = ({ data, handleClick, headingValue }: { data: any, handleClick: any, headingValue: any }) => {
  return (
    <>
      <BuilderHeading headingValue={headingValue} />
      <div className="flex justify-center">
        <div className="w-full md:w-10/12">
          <div className="mt-8 md:mt-10">
            <div className="flex flex-row flex-wrap gap-6 justify-center">
              {data?.map((item: any, index: number) => {
                return (
                  <>
                    <span
                      key={index}
                      className={`px-8 py-4 rounded-lg cursor-pointer transition-colors duration-200 text-xl font-medium ${
                        item?.isSelected 
                          ? "bg-blue-500 text-white" 
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      onClick={() => handleClick(item, index, headingValue)}
                    >
                      {item.name || item.label}
                    </span>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuilderBox;
