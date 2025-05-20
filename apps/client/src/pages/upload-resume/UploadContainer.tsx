import React from "react";
import { ArrowLeft, ArrowRight, CloudArrowUp, File, Upload } from "@phosphor-icons/react";

export default function UploadContainer({ handleFileInput, selectedFile }: { handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void, selectedFile: File | null }) {
  return (
    <div>
      <div className="bg-white rounded-3xl flex flex-row items-center justify-between gap-8 px-6 py-10 max-w-4xl w-full mb-8 animate-fade-in">
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-blue-600 rounded-xl w-80 h-64 bg-blue-50 hover:bg-blue-100 transition-colors duration-200">
          <Upload className="text-blue-600 text-5xl mb-4 animate-bounce" />
          <div className="font-semibold text-lg mb-3">Drag and drop a file here</div>
           <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
          Choose File
          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileInput}
          />
        </label>
        
        {selectedFile && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {selectedFile.name}
          </p>
        )}
          {/* <button className="bg-blue-700 text-white rounded-full px-8 py-3 text-lg font-semibold hover:bg-blue-800 transition-colors duration-200">
            Browse
          </button> */}
        </div>
        <div className="flex items-center">
          <span className="text-gray-400 font-semibold mx-4">OR</span>
          <div className="w-12 h-0.5 bg-gray-200"></div>
        </div>
        <div className="flex flex-col gap-4">
          <button className="flex items-center gap-3 border-2 border-blue-600 text-blue-700 rounded-full px-8 py-3 font-semibold bg-white hover:bg-blue-600 hover:text-white transition-colors duration-200 w-64">
            <CloudArrowUp className="text-xl" />
            Google Drive
          </button>
          <button className="flex items-center gap-3 border-2 border-blue-600 text-blue-700 rounded-full px-8 py-3 font-semibold bg-white hover:bg-blue-600 hover:text-white transition-colors duration-200 w-64">
            <CloudArrowUp className="text-xl" />
            Dropbox
          </button>
        </div>
      </div>

      
      <div className="text-gray-500 text-center mb-8">
        Files we can read: <b>DOC, DOCX, PDF, HTML, RTF, TXT</b>
      </div>
      </div>
     
  );
}
