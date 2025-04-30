import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, ArrowRight } from "@phosphor-icons/react";
import { useDialog } from '@/client/stores/dialog';



const UploadResume = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCard, setSelectedCard] = useState<'upload' | 'scratch' | null>(null);
  const { open } = useDialog("resume");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.type === 'application/msword' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setSelectedFile(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const onStartFromScratch = () => {
    setSelectedCard('scratch')
    open("create");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">
        Are you uploading an existing resume?
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Just review, edit, and update it with new information
      </p>

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

     
    </div>
  );
};

export default UploadResume; 