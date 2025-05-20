import React, { useState } from 'react';

import { Upload, FileText, ArrowRight, ArrowLeft } from "@phosphor-icons/react";
import { useDialog } from '@/client/stores/dialog';
import { LimitReachedModal } from '../select-template/LimitReachedModal';
import { useNavigate } from 'react-router';
import { axios } from '@/client/libs/axios';
import { resumeData } from '../dashboard/resumes/constant';
import { createResume } from '@/client/services/resume';
import FirstUploadUI from './FirstUploadUI';
import UploadContainer from './UploadContainer';
import BuilderHeading from '../experience-level/BuilderHeading';
import ChangeUplodedFile from './ChangeUplodedFile';
import EvaluateFeedback from './EvaluateFeedback';
import LoadingResume from './LoadingResume';
import { createId } from "@paralleldrive/cuid2";

const UploadResume = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCard, setSelectedCard] = useState<'upload' | 'scratch' | null>(null);
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);
  const [newResume, setNewResume] = useState<any>(null);
  const navigate = useNavigate()

  

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

  const handleFileInput =async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleNextStep()
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const onStartFromScratch = () => {
  //   if(isSubscriptionHave.length==0 && resumeCount==1){
  //   setSelectedCard('scratch')
  //   setIsLimitReachedModalOpen(true)
    
  // }else{
  //   open("create");
    
  // }
  navigate("/onboard/select-template")
}

const handleNextStep = () => {
  if(selectedStep === 4){
    navigate(`/builder/${newResume.data.id}`)// void navigate(`/builder/${newResume.data.id}`))
  }else{
    setSelectedStep(prev => prev + 1);
  }
}

const handlePreviousStep = () => {
  setSelectedStep(prev => prev - 1);
}

const selectedStepHeading: { [key: number]: string } = {
  1: "upload_resume",
  2: "choose_file",
}

console.log(selectedFile,"selectedFile")

const uploadResume = () => {
  if (selectedFile) {
    handleNextStep()
    console.log(selectedFile,"selectedFile")
    const formData = new FormData();
    formData.append("resume", selectedFile);
    axios.post("/cv-manager/process-resume/", formData).then(async (res) => {
      console.log(res.data.data);
      setIsComplete(true)
      localStorage.setItem("uploadCVName",res.data.data.personal_info.name)
      resumeData.basics.name = res.data.data.personal_info.name;
      resumeData.basics.email = res.data.data?.personal_info?.email;
      resumeData.basics.phone = res.data.data?.personal_info?.phone;
      resumeData.sections.summary.content = res.data.data.summary;
      resumeData.sections.experience.items = res.data.data.work_experience?.map((ele:any)=>{
        return {
          company: ele?.company,
          date:ele?.duration,
          id:createId(),
          location:"",
          position: ele.position,
          summary: Array.isArray(ele.responsibilities) ? ele.responsibilities.join('\n') : ele.responsibilities,
          url:{label: "", href: ""},
          visible:true
        }
      });
      resumeData.sections.skills.items = res.data.data.skills?.technical
      ?.map((ele:any)=>{
        return {
          id:createId(),
          name: ele,
          level: 2,
          visible:true,
          description:"",
          keywords:[]

        }
      });
      resumeData.sections.education.items = res.data.data.education?.map((ele:any)=>{
        return {
          area:ele?.area,
          date:ele?.year,
          id:createId(),
          institution:ele?.institution,
          score:"",
          studyType:ele?.degree,
          summary:ele?.summary,
          url:{label: "", href: ""},
          visible:true
        }
      });


      console.log(resumeData,"resumeData")

      const newResume = await createResume({ slug: "New Cv", title: "new-cv", cv_template:3, visibility: "private", cv_data:resumeData });
      setNewResume(newResume)
      axios.get(`/accounts/api/users/`).then((res)=>{
        localStorage.setItem("user",JSON.stringify(res.data[0]))

      })
      handleNextStep()

      // void navigate(`/builder/${newResume.data.id}`)

    })
 
    
  }
}

console.log(selectedStep,"selectedStep")
 

  return (
    <div className="max-w-4xl mx-auto p-6">

       <BuilderHeading headingValue={selectedStepHeading[selectedStep] as 'experience_time' | 'is_student' | 'experience_level' | 'choose_template' | 'upload_resume' | 'choose_file'} />
      {
        selectedStep === 0 && (
          <FirstUploadUI setSelectedCard={setSelectedCard} selectedCard={selectedCard} handleDrag={handleDrag} handleDrop={handleDrop} handleFileInput={handleFileInput} selectedFile={selectedFile} onStartFromScratch={onStartFromScratch} />
        )
      }
      {
        selectedStep === 1 && (
          <UploadContainer handleFileInput={handleFileInput} selectedFile={selectedFile}/>
        )
      }
      {
        selectedStep === 2 && (
          <ChangeUplodedFile selectedFile={selectedFile} handlePreviousStep={handlePreviousStep}/>
        )
      }
      {
        selectedStep === 3 && (
          <LoadingResume isComplete={isComplete}/>
        )
      }

      {
        selectedStep === 4 && (
          <EvaluateFeedback/>
        )
      }
      
     
        
      

      {selectedCard === 'upload' && selectedStep !== 3 && <div className="flex justify-between items-center w-full mt-8">
        <button 
          onClick={handlePreviousStep}
          className="flex items-center gap-2 border-2 border-blue-600 text-blue-700 rounded-full px-8 py-2 font-medium bg-white hover:bg-blue-50 transition-colors duration-200"
        >
          <ArrowLeft />
          Back
        </button>
        <button 
          onClick={selectedStep === 2 ? uploadResume : handleNextStep}
          className="bg-yellow-300 text-blue-900 rounded-full px-12 py-3 font-bold text-lg shadow hover:bg-yellow-400 transition-colors duration-200"
        >
          Next
        </button>
      </div>}
  
    
    {/* <LimitReachedModal isOpen={isLimitReachedModalOpen} onClose={onCloseLimitReached} resumeDetailsId={resumeDetailsId} /> */}
     
    </div>
  ); 
};

export default UploadResume; 