import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText } from '@phosphor-icons/react';

const FirstUploadUI = ({ setSelectedCard, selectedCard, handleDrag, handleDrop, handleFileInput, selectedFile, onStartFromScratch }: { setSelectedCard: (card: 'upload' | 'scratch' | null) => void, selectedCard: 'upload' | 'scratch' | null, handleDrag: (e: React.DragEvent) => void, handleDrop: (e: React.DragEvent) => void, handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void, selectedFile: File | null, onStartFromScratch: () => void }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
    {/* Upload Option */}
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative border-2 ${selectedCard === 'upload' ? 'border-blue-500' : 'border-dashed'} rounded-xl p-6 bg-white shadow-sm cursor-pointer`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => setSelectedCard('upload')}
    >
      <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
        Recommended option to save your time
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <Upload className="w-12 h-12 text-blue-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Yes, upload from my resume</h2>
        <p className="text-gray-500 text-center text-sm mb-4">
          We'll give you expert guidance to fill out your info and enhance your resume, from start to finish
        </p>
        
        {/* <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
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
        )} */}
      </div>
    </motion.div>

    {/* Start from Scratch Option */}
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`border-2 ${selectedCard === 'scratch' ? 'border-blue-500' : ''} rounded-xl p-6 bg-white shadow-sm cursor-pointer`}
      onClick={onStartFromScratch}
    >
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <FileText className="w-12 h-12 text-gray-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">No, start from scratch</h2>
        <p className="text-gray-500 text-center text-sm">
          We'll guide you through the whole process so your skills can shine
        </p>
      </div>
    </motion.div>
  </div>

  );
};

export default FirstUploadUI;
