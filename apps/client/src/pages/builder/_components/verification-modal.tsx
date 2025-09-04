import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Envelope, Phone, ShieldCheck } from "@phosphor-icons/react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/client/components/ToastProvider";

// Validation schema matching the application's pattern
const verificationSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z.string()
    .min(1, "Phone number is required")
    .max(255, "Phone number must be less than 255 characters")
});

type FormValues = z.infer<typeof verificationSchema>;

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationComplete: (userData: { name: string; email: string; phone: string }) => void;
}

export const VerificationModal = ({ isOpen, onClose, onVerificationComplete }: VerificationModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    }
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      form.reset();
      setIsSubmitting(false);
    }
  }, [isOpen, form]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual verification logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onVerificationComplete(data);
    } catch (error) {
      console.error('Verification failed:', error);
      showToast('Verification failed. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };


  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-full">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Resume Verification</h2>
                <p className="text-blue-100 text-sm">Please verify your details to continue</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="text-gray-500" />
                Full Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...form.register("name")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  form.formState.errors.name ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="Enter your full name"
                autoComplete="name"
                autoFocus
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Envelope size={16} className="text-gray-500" />
                Email Address
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...form.register("email")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  form.formState.errors.email ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="Enter your email address"
                autoComplete="email"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Phone size={16} className="text-gray-500" />
                Phone Number
                <span className="text-red-500">*</span>
              </label>
              <PhoneInput
                country="IN"
                value={form.watch("phone")}
                onChange={(value) => {
                  form.setValue("phone", value);
                  form.trigger("phone"); // Trigger validation when value changes
                }}
                inputClass={`!w-full !px-4 !py-3 !pl-11 !border !rounded-lg focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition-colors !h-12 ${
                  form.formState.errors.phone ? "!border-red-300 !bg-red-50" : "!border-gray-300 hover:!border-gray-400"
                }`}
                containerClass="!w-full"
                buttonClass={`!border-r !border-gray-300 !rounded-l-lg !h-12 ${
                  form.formState.errors.phone ? "!border-red-300" : ""
                }`}
                dropdownClass="!z-50"
                placeholder="Enter your phone number"
              />
              {form.formState.errors.phone && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-500 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Verifying...
                  </div>
                ) : (
                  "Verify & Continue"
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Your information will be used for verification purposes only
            </p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}; 