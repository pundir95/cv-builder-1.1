import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
  Input, Label, Button,
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@reactive-resume/ui';
import { User, Envelope, Phone, Buildings, UploadSimple, FileText, CheckCircle, X, Target, Briefcase, Question, Lightbulb } from '@phosphor-icons/react';
import { axios } from '@/client/libs/axios';
import { toast } from '@/client/hooks/use-toast';
import { useNavigate } from 'react-router';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface HumanCheckerModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    industry: string;
    yearsOfExperience: string;
    cv_goals: string;
    job_role: string;
    extra_help: string;
    extra_feedback: string;
    file: File | null;
  }) => void;
  paymentId: string | null;
}

const INDUSTRIES = [
  'Information Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Marketing',
  'Engineering',
  'Other',
];

// Define the schema for form validation
const humanCheckerSchema = z.object({
  // name: z.string().min(1, "Name is required"),
  // email: z.string().email("Invalid email address"),
  // phone: z.string().min(1, "Phone number is required"),
  industry: z.string().min(1, "Industry is required"),
  yearsOfExperience: z.string().min(1, "Years of experience is required"),
  cv_goals: z.string().min(1, "Please select your goal"),
  job_role: z.string().min(1, "Job role is required"),
  extra_help: z.string().optional(),
  extra_feedback: z.string().optional(),
  file: z.instanceof(File, { message: "Please upload your CV" }),
});

type FormValues = z.infer<typeof humanCheckerSchema>;

export const HumanCheckerModal: React.FC<HumanCheckerModalProps> = ({ open, onClose, onSubmit, paymentId }) => {
  const [submitting, setSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);    
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(humanCheckerSchema),
    defaultValues: {
      industry: "",
      yearsOfExperience: "",
      cv_goals: "",
      job_role: "",
      extra_help: "",
      extra_feedback: "",
      file: undefined as any,
    },
  });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      form.setValue("file", e.target.files[0]);
    }
  };

  const handleSubmit = async (data: FormValues) => {
    setSubmitting(true);
    console.log(data, "form");
    
      const formData = new FormData();
      // formData.append("name", data.name);
      // formData.append("email", data.email);
      // formData.append("phone", data.phone);
      formData.append("industry", data.industry);
      formData.append("years_of_experience", data.yearsOfExperience);
      formData.append("cv_goals", data.cv_goals);
      formData.append("job_role", data.job_role);
      formData.append("extra_help", data.extra_help || "");
      formData.append("extra_feedback", data.extra_feedback || "");
      formData.append("file", data.file);
      formData.append("payment_id", paymentId || "");
      
      axios.post("/cv-manager/human-resume-verification/", formData).then(async (res) => {
        console.log(res.data.data);
        setIsComplete(true);
        setSubmitting(false);
        toast({
          title: "Resume verified successfully",
          description: "Our team will review and provide feedback within 24 hours.",
          duration: 5000,
          className: "bg-green-500 text-white",
          icon: <CheckCircle size={24} className="text-white" />, 
          variant: "default",
        });
        navigate("/dashboard/resumes");
        onClose();
      }).catch((err)=>{
        console.log(err);
        toast({
          title: "Error",
          description: "Something went wrong",
          duration: 5000,
          className: "bg-red-500 text-white",
          icon: <X size={24} className="text-white" />, 
          variant: "error",
        });
        setSubmitting(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-2xl shadow-2xl bg-white/90 border border-gray-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="text-blue-600" size={24} />
            Check your resume with human
          </DialogTitle>
          <DialogDescription>
            Please fill in your details, answer a few questions about your goals, and upload your CV. Our team will review and provide personalized feedback.
          </DialogDescription>
        </DialogHeader>
        <div className="my-2 border-b border-gray-200" />
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-2">
            <div className="grid grid-cols-1 gap-4">
              {/* <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User size={18} className="text-gray-500" /> Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        className="rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white/80"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Envelope size={18} className="text-gray-500" /> Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white/80"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone size={18} className="text-gray-500" /> Phone Number
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        country="IN"
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        inputClass="!w-full !h-11 !pl-16"
                        containerClass="phonefield-wrapper"
                        placeholder="Phone Number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              
              <FormField
                name="industry"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Buildings size={18} className="text-gray-500" /> Industry Type
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white/80">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {INDUSTRIES.map((ind) => (
                          <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                name="yearsOfExperience"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User size={18} className="text-gray-500" /> Years of Experience
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter years of experience"
                        className="rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white/80"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Question 1 - CV Goals */}
              <FormField
                name="cv_goals"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Target size={18} className="text-gray-500" /> What is your goal with your CV?
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        {[
                          { value: "new_industry", label: "I am looking for a job in a new industry" },
                          { value: "improve_cv", label: "I want to improve my current CV" },
                          { value: "specific_job", label: "I am looking for a specific job and want feedback" },
                          { value: "unsure_quality", label: "I am unsure if my CV is good enough" }
                        ].map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => field.onChange(option.value)}
                            className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 focus:outline-none ${
                              field.value === option.value
                                ? 'bg-blue-50 border-blue-400 text-blue-700'
                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                field.value === option.value
                                  ? 'border-blue-400 bg-blue-400'
                                  : 'border-gray-300'
                              }`}>
                                {field.value === option.value && (
                                  <div className="w-2 h-2 rounded-full bg-white"></div>
                                )}
                              </div>
                              <span className="text-sm">{option.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Question 2 - Job Role */}
              <FormField
                name="job_role"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Briefcase size={18} className="text-gray-500" /> What type of job or role are you looking for?
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Salesperson, Finance Assistant, Front-end Developer, Retail Job"
                        className="rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white/80"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Question 3 - Extra Help (Optional) */}
              <FormField
                name="extra_help"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Question size={18} className="text-gray-500" /> Is there anything on your CV that you are unsure about? (Optional)
                    </FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        placeholder="e.g., 'I don't know if I have the right experience', 'I think the language is uncertain', 'It feels too long'"
                        className="w-full min-h-[80px] px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white/80 resize-none"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Question 4 - Extra Feedback (Optional) */}
              <FormField
                name="extra_feedback"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Lightbulb size={18} className="text-gray-500" /> What would you like us to focus on the most? (Optional)
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        {[
                          { value: "layout_design", label: "Layout & design" },
                          { value: "wording_language", label: "Wording & language" },
                          { value: "content_experience", label: "Content & experience" },
                          { value: "results_focus", label: "Results focus (e.g. measurable achievements)" },
                          { value: "ats_adaptation", label: "ATS adaptation (automatic selection compatibility)" }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <input
                              type="checkbox"
                              value={option.value}
                              checked={field.value?.includes(option.value) || false}
                              onChange={(e) => {
                                const currentValues = field.value ? field.value.split(',') : [];
                                if (e.target.checked) {
                                  const newValues = [...currentValues, option.value];
                                  field.onChange(newValues.join(','));
                                } else {
                                  const newValues = currentValues.filter(val => val !== option.value);
                                  field.onChange(newValues.join(','));
                                }
                              }}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <span className="text-sm text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                name="file"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <UploadSimple size={18} className="text-gray-500" /> Upload CV
                    </FormLabel>
                    <FormControl>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFile}
                        className="block w-full text-sm text-gray-700 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all bg-white/80"
                      />
                    </FormControl>
                    {form.watch("file") && (
                      <p className="text-green-600 text-xs mt-1">Selected: {form.watch("file")?.name}</p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter className="mt-4 border-t border-gray-200 pt-4">
              <Button
                type="submit"
                loading={submitting}
                disabled={submitting}
                className="w-full bg-gradient-to-r from-[#D6EF3C] to-[#A7E92F] text-black rounded-full shadow-md hover:from-[#A7E92F] hover:to-[#D6EF3C] transition-all border border-[#D6EF3C]/40"
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default HumanCheckerModal;
