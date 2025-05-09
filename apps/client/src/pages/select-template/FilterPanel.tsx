import React from "react";

const FilterPanel = ({ setHoveredColor, setSelectedFilter, onChange }: { setHoveredColor: any, setSelectedFilter: any, onChange: any }) => {
  return (
    <div className="mt-4 container mx-auto px-4">
      <div className="bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-shadow duration-300">
        <h5 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          Filters
        </h5>
        <div className="mb-4 space-y-3">
          <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
              onChange={(e) => onChange("withPhoto")}
            />
            <span className="text-gray-700">With photo</span>
          </label>
          <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
              onChange={(e) => onChange("withoutPhoto")}
            />
            <span className="text-gray-700">Without photo</span>
          </label>
        </div>

        <hr className="border-gray-200 my-4" />

        <h5 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Columns
        </h5>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
              onChange={(e) => onChange("oneColumn")}
            />
            <span className="text-gray-700">1 Column</span>
          </label>
          <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
              onChange={(e) => onChange("twoColumn")}
            />
            <span className="text-gray-700">2 Columns</span>
          </label>
        </div>

        <hr className="border-gray-200 my-4" />

        <h5 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          Style
        </h5>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
              onChange={(e) => onChange("traditional")}
            />
            <span className="text-gray-700">Traditional</span>
          </label>
          <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
              onChange={(e) => onChange("creative")}
            />
            <span className="text-gray-700">Creative</span>
          </label>
          <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
              onChange={(e) => onChange("contemporary")}
            />
            <span className="text-gray-700">Contemporary</span>
          </label>
        </div>

        <div className="mt-6 text-center">
          <button
            className="text-blue-500 hover:text-blue-700 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 flex items-center gap-2 mx-auto"
            onClick={() => {
              setSelectedFilter({
                withPhoto: false,
                withoutPhoto: false,
                oneColumn: false,
                twoColumn: false,
                traditional: false,
                creative: false,
                contemporary: false
              });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
