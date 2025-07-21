import React, { useState } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
  Input, Label, Button,
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue
} from '@reactive-resume/ui';
import { User, Envelope, Phone, Buildings, UploadSimple, FileText } from '@phosphor-icons/react';

interface HumanCheckerModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    industry: string;
    file: File | null;
  }) => void;
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

export const HumanCheckerModal: React.FC<HumanCheckerModalProps> = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    industry: '',
    file: null as File | null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: string, value: string | File | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (!form.industry) newErrors.industry = 'Industry is required';
    if (!form.file) newErrors.file = 'Please upload your CV';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleChange('file', e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onSubmit(form);
      onClose();
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-2xl shadow-2xl bg-white/90 border border-gray-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="text-blue-600" size={24} />
            Upload Your CV for Human Check
          </DialogTitle>
          <DialogDescription>
            Please fill in your details and upload your CV. Our team will review and provide feedback.
          </DialogDescription>
        </DialogHeader>
        <div className="my-2 border-b border-gray-200" />
        <form onSubmit={handleSubmit} className="space-y-6 mt-2">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2">
                <User size={18} className="text-gray-500" /> Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
                hasError={!!errors.name}
                autoFocus
                className="rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white/80"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Envelope size={18} className="text-gray-500" /> Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
                hasError={!!errors.email}
                className="rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white/80"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone size={18} className="text-gray-500" /> Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('phone', e.target.value)}
                hasError={!!errors.phone}
                className="rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white/80"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <Label htmlFor="industry" className="flex items-center gap-2">
                <Buildings size={18} className="text-gray-500" /> Industry Type
              </Label>
              <Select value={form.industry} onValueChange={(v: string) => handleChange('industry', v)}>
                <SelectTrigger id="industry" className={`rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white/80 ${errors.industry ? 'border-red-300' : ''}`}>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
            </div>
            <div>
              <Label htmlFor="cv" className="flex items-center gap-2">
                <UploadSimple size={18} className="text-gray-500" /> Upload CV
              </Label>
              <input
                id="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFile}
                className={`block w-full text-sm text-gray-700 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all bg-white/80 ${errors.file ? 'border-red-300 bg-red-50' : ''}`}
              />
              {form.file && <p className="text-green-600 text-xs mt-1">Selected: {form.file.name}</p>}
              {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              loading={submitting}
              className="w-full mt-2 bg-gradient-to-r from-[#D6EF3C] to-[#A7E92F] text-black rounded-full shadow-md hover:from-[#A7E92F] hover:to-[#D6EF3C] transition-all border border-[#D6EF3C]/40"
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HumanCheckerModal;
