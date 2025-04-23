import React from "react";

const FilterPanel = ({setHoveredColor,setSelectedFilter,onChange}:{setHoveredColor:any,setSelectedFilter:any,onChange:any}) => {

  return (
    <div className="mt-4 container mx-auto px-4">
      <div className="bg-white rounded-lg shadow p-6">

        <h5 className="text-lg font-medium mb-3 mt-4">Filters</h5>
        <div className="mb-2 space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox rounded text-blue-500" onChange={(e)=>{
              onChange("withPhoto")
            }} />
            <span>With photo</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox rounded text-blue-500" onChange={(e)=>{
              onChange("withoutPhoto")
            }} />
            <span>Without photo</span>
          </label>
        </div>

        <hr className="border-gray-200 my-4" />

        <h5 className="text-lg font-medium mb-3">Columns</h5>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox rounded text-blue-500" onChange={(e)=>{
              onChange("oneColumn")
            }} />
            <span>1 Column</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox rounded text-blue-500" onChange={(e)=>{
              onChange("twoColumn")
            }} />
            <span>2 Columns</span>
          </label>
        </div>
        <hr className="border-gray-200 my-4" /> 

        <h5 className="text-lg font-medium mb-3">Style</h5>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox rounded text-blue-500" onChange={(e)=>{
              onChange("traditional")
            }} />
            <span>Traditional</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox rounded text-blue-500" onChange={(e)=>{
              onChange("creative")
            }} />
            <span>Creative</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox rounded text-blue-500" onChange={(e)=>{
            onChange("contemporary")
            }} />
            <span>Contemporary</span>
          </label>
        </div>

        <div className="mt-6 text-center">
          <button className="text-blue-500 hover:text-blue-700 font-medium" onClick={()=>{
            setSelectedFilter({
                withPhoto:false,
                withoutPhoto:false,
                oneColumn:false,
                twoColumn:false,
                traditional:false,
                creative:false,
                contemporary:false
            })
          }}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
