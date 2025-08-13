import React, { useState, useEffect } from 'react';

import { Upload, FileText, ArrowRight, ArrowLeft, Check, CheckCircle } from "@phosphor-icons/react";
import { useDialog } from '@/client/stores/dialog';
import { LimitReachedModal } from '../select-template/LimitReachedModal';
import { useNavigate, useSearchParams } from 'react-router';
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
import { ErrorPage } from '../public/error';
import UploadPageError from './UploadPageError';
import HumanCheckerModal from './HumanCheckerModal';
import { PaymentModal } from '../builder/sidebars/left/sections/picture/payment-modal';
import { toast } from '@/client/hooks/use-toast';

const UploadResume = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCard, setSelectedCard] = useState<'upload' | 'scratch' | null>(null);
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);
  const [newResume, setNewResume] = useState<any>(null);
  const [humanChecker, setHumanChecker] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
 
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const isResumeChecker = searchParams.get("true") === "resume-checker"
  const resume_id=searchParams.get("resume_id")
  const [paymentId, setPaymentId] = useState<any>(null);

  // Helper function to validate file types and size
  const isValidFile = (file: File): boolean => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/html',
      'text/rtf',
      'text/plain'
    ];
    
    // Check file type
    if (!validTypes.includes(file.type)) {
      return false;
    }
    
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return false;
    }
    
    return true;
  };

  // Check for URL parameters and handle payment verification
  console.log(searchParams.get('human_resume'), 'searchParams 123', searchParams.get('session_id'));
  const sessionId = searchParams.get('session_id');
  
  // Monitor selectedFile changes and prevent progression without file
  useEffect(() => {
    if (selectedStep === 1 && !selectedFile) {
      // If user is on step 1 and no file is selected, ensure they can't proceed
      // This handles cases where user goes back from step 2 to step 1
    }
  }, [selectedStep, selectedFile]);
  
  useEffect(() => {
    const payment_Id = searchParams.get('payment_id') || null;
    const humanResume = searchParams.get('human_resume');
    if(payment_Id){
      setPaymentId(payment_Id)
    }

    if (humanResume && sessionId) {
      handlePaymentVerification(sessionId);
    }
  }, [searchParams]);

  const handlePaymentVerification = async (sessionId: string) => {
    try {
      const response = await axios.get(`/cv-manager/human-verification/check-for-payment/`);
      
      if (response.status === 200) {
        toast({
          title: "Payment verification successful",
          description: "Your human verification request has been confirmed.",
          duration: 5000,
          className: "bg-green-500 text-white",
          icon: <CheckCircle size={24} className="text-white" />,
          variant: "default",
        });
        setPaymentId(response.data.data.payment_id)
        console.log(response.data,"response.data")

        // Clean up the URL by removing the human_resume part and session_id parameter
        const currentUrl = window.location.href;
        const baseUrl = currentUrl.split('human_resume')[0];
        const cleanUrl = baseUrl + '?true=resume-checker';
        
        // Update the URL without the human_resume and session_id
        window.history.replaceState({}, '', cleanUrl);

        // Open HumanCheckerModal after successful payment
        setHumanChecker(true);
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      toast({
        title: "Payment verification failed",
        description: "Please try again or contact support.",
        duration: 5000,
        className: "bg-red-500 text-white",
        variant: "error",
      });
    }
  };

  let cardData={
    simple: {
      upload: {
        title: "Yes, upload from my resume",
        description: "We'll give you expert guidance to fill out your info and enhance your resume, from start to finish",
        recommended: true,
        icon: <Upload />
      },
    scratch: {
      title: "No, I'll start from scratch",
      description: "Start from scratch and build your resume from the ground up",
      icon: <FileText />
    },
    
  },

  with_AI: {
  upload: {
    title: "Check your resume with AI",
    description: "We'll give you AI based feedback to improve your resume",
    recommended: false,
    icon: <CheckCircle />
  },

    scratch: {
      title: "Check your resume with human",
      description: "We'll give you human based feedback to improve your resume",
      recommended: false,
      icon: <Check />
    }
  }
  }

  const onRemoveFile = () => {
    setSelectedFile(null);
  };

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
      
      // Validate file type
      if (!isValidFile(file)) {
        toast({
          title: "Invalid file type or size",
          description: "Please upload a valid resume file (PDF, DOC, DOCX, HTML, RTF, or TXT, max 10MB)",
          duration: 5000,
          className: "bg-red-500 text-white",
          variant: "error",
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!isValidFile(file)) {
        toast({
          title: "Invalid file type or size",
          description: "Please upload a valid resume file (PDF, DOC, DOCX, HTML, RTF, or TXT, max 10MB)",
          duration: 5000,
          className: "bg-red-500 text-white",
          variant: "error",
        });
        return;
      }
      
      setSelectedFile(file);
      // Only proceed to next step after file is set and validated
      handleNextStep();
    }
  };

  const onStartFromScratch = async () => {
  if(isResumeChecker){
    try {
      // First check if payment is already done
      const response = await axios.get(`/cv-manager/human-verification/check-for-payment/`);
      console.log(response.data.data,"response.data123123")
      
      if (response.status === 200 && response.data.data.is_paid && !response.data.data.is_used) {
        // Payment is already done, open HumanCheckerModal
        setHumanChecker(true);
        setPaymentId(response.data.data.payment_id)
      } else {
        // Payment not done, open PaymentModal
        setIsPaymentModalOpen(true);
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      // If there's an error, default to opening PaymentModal
      setIsPaymentModalOpen(true);
    }
  } else {
    navigate(`/builder/${resume_id}`)
  }
  
  
}

const handleNextStep = () => {
  // Prevent moving from step 1 to step 2 without a file
  if (selectedStep === 1 && !selectedFile) {
    return;
  }
  
  // Validate file type if moving from step 1 to step 2
  if (selectedStep === 1 && selectedFile && !isValidFile(selectedFile)) {
    toast({
      title: "Invalid file type or size",
      description: "Please upload a valid resume file (PDF, DOC, DOCX, HTML, RTF, or TXT, max 10MB)",
      duration: 5000,
      className: "bg-red-500 text-white",
      variant: "error",
    });
    return;
  }
  
  if(selectedStep === 4){
    if(isResumeChecker){
      navigate(`/builder/${newResume.data.id}?improve=true`)
    }else{
      navigate(`/builder/${newResume.data.id}`)
    }
  }else{
    setSelectedStep(prev => prev + 1);
  }
}

const handlePreviousStep = () => {
  // If going back to step 1, ensure file is still valid
  if (selectedStep === 2 && selectedFile && !isValidFile(selectedFile)) {
    setSelectedFile(null);
    toast({
      title: "File validation failed",
      description: "The previously selected file is no longer valid. Please upload a new file.",
      duration: 5000,
      className: "bg-yellow-500 text-white",
      variant: "default",
    });
  }
  
  setSelectedStep(prev => prev - 1);
}

const selectedStepHeading: { [key: number]: string } = {
  0: isResumeChecker? "checker" : "upload_resume",
  1: "choose_file",
  2:"choose_file"
}

console.log(selectedFile,"selectedFile")

const handleSubmit = (data: {
  name: string;
  email: string;
  phone: string;
  industry: string;
  file: File | null;
}) => {

  console.log(data,"data")
}


const uploadResume = () => {
  if (selectedFile && isValidFile(selectedFile)) {
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

      const newResume = await createResume({ slug: "New Cv", title: res.data.data.personal_info.name, cv_template:3, visibility: "private", cv_data:resumeData });
      setNewResume(newResume)
      axios.get(`/accounts/api/users/`).then((res)=>{
        localStorage.setItem("user",JSON.stringify(res.data[0]))

      })
      handleNextStep()

      // void navigate(`/builder/${newResume.data.id}`)

    })
    .catch((err)=>{
      setSelectedStep(5)
    })
 
    
  } else {
    toast({
      title: "Invalid file",
      description: "Please select a valid resume file to continue",
      duration: 5000,
      className: "bg-red-500 text-white",
      variant: "error",
    });
  }
}

console.log(selectedStep,"selectedStep")
 

  return (
    <div className="max-w-4xl mx-auto p-6">

       <BuilderHeading headingValue={selectedStepHeading[selectedStep] as 'experience_time' | 'is_student' | 'experience_level' | 'choose_template' | 'upload_resume' | 'choose_file'} />
      {
        selectedStep === 0 && (
          <FirstUploadUI setSelectedCard={setSelectedCard} selectedCard={selectedCard} handleDrag={handleDrag} handleDrop={handleDrop} handleFileInput={handleFileInput} selectedFile={selectedFile} onStartFromScratch={onStartFromScratch} 
          cardData={isResumeChecker ? cardData.with_AI : cardData.simple}
          />
        )
      }
      {
        selectedStep === 1 && (
          <UploadContainer handleFileInput={handleFileInput} selectedFile={selectedFile} onRemoveFile={onRemoveFile}/>
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
      selectedStep === 5 && (
        <UploadPageError/>
      )
    }
    
    

      {
        selectedStep === 4 && (
          <EvaluateFeedback/>
        )
      }
      
     
        
      

      {selectedCard === 'upload' && selectedStep !== 3 && selectedStep !== 5 && <div className="flex justify-between items-center w-full mt-8">
        {selectedStep !== 0 && (
          <button 
            onClick={handlePreviousStep}
            className="flex items-center gap-2 border-2 border-blue-600 text-blue-500 rounded-full px-8 py-3 text-lg font-medium bg-white hover:bg-blue-50 transition-colors duration-200"
          >
            <ArrowLeft />
            Back
          </button>
        )}
        {selectedStep === 0 && <div></div>}
        <div className="flex flex-col items-center">
          {selectedStep === 1 && selectedFile && (
            <div className="mb-2 text-center">
              <p className="text-sm text-green-600 font-medium">
                ✓ Ready to proceed with: {selectedFile.name}
              </p>
            </div>
          )}
          <button 
            onClick={selectedStep === 2 ? uploadResume : (selectedStep === 1 && !selectedFile ? () => {} : handleNextStep)}
            disabled={selectedStep === 1 && !selectedFile}
            className={`bg-[#D6EF3C] border-2 border-yellow-300 text-blue-900 rounded-full px-12 py-3 font-bold text-lg shadow transition-colors duration-200 ${
              selectedStep === 1 && !selectedFile 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-[#D6EF3C]/90'
            }`}
          >
            {selectedStep === 2 ? 'Upload Resume' : 'Next'}
          </button>
          {selectedStep === 1 && !selectedFile && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              Please upload a resume file to continue
            </p>
          )}
        </div>
      </div>}
  
    {humanChecker && <HumanCheckerModal open={humanChecker} onClose={() => setHumanChecker(false)} onSubmit={handleSubmit} paymentId={paymentId} />}
    {/* <LimitReachedModal isOpen={isLimitReachedModalOpen} onClose={onCloseLimitReached} resumeDetailsId={resumeDetailsId} /> */}
     { isPaymentModalOpen &&
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={() => {
          setIsPaymentModalOpen(false);
          handleNextStep();
        }}
        cvId={'newResume.data.id'}
      />
     }

    </div>
  ); 
};

export default UploadResume; 