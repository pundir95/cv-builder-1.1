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
import { User, Envelope, Phone, Buildings, UploadSimple, FileText, CheckCircle, X } from '@phosphor-icons/react';
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
            Please fill in your details and upload your CV. Our team will review and provide feedback.
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
            
            <DialogFooter>
              <Button
                type="submit"
                loading={submitting}
                disabled={submitting}
                className="w-full mt-2 bg-gradient-to-r from-[#D6EF3C] to-[#A7E92F] text-black rounded-full shadow-md hover:from-[#A7E92F] hover:to-[#D6EF3C] transition-all border border-[#D6EF3C]/40"
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
