import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Envelope, ArrowLeft, Clock, CheckCircle } from "@phosphor-icons/react";

interface OTPVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationComplete: (otp: string) => void;
  email?: string;
  onResendOTP?: () => Promise<void>;
  isVerified?: boolean;
  setIsVerified?: (isVerified: boolean) => void;
  onBack?: () => void;
}

export const OTPVerificationModal = ({ 
  isOpen, 
  onClose, 
  onVerificationComplete, 
  email = "user@example.com",
  onResendOTP,
  isVerified = false,
  setIsVerified,
  onBack
}: OTPVerificationModalProps) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);
  // const [isVerified, setIsVerified] = useState(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", "", "", ""]);
      setErrors({});
      setIsSubmitting(false);
      setIsResending(false);
      setTimeLeft(30);
      setIsTimerActive(true);
      // setIsVerified(false);
      // Focus first input
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Timer countdown
  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

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

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error when user starts typing
    if (errors.otp) {
      setErrors(prev => ({ ...prev, otp: "" }));
    }

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '');
    if (pastedData.length === 6) {
      const newOtp = pastedData.split('').slice(0, 6);
      setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
      inputRefs.current[5]?.focus();
    }
  };

  const validateOTP = () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setErrors({ otp: "Please enter the complete 6-digit code" });
      return false;
    }
    if (!/^\d{6}$/.test(otpString)) {
      setErrors({ otp: "Please enter only numbers" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateOTP()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual OTP verification logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any 6-digit code
      const otpString = otp.join('');
      if (otpString.length === 6) {
        // setIsVerified(true);
          onVerificationComplete(otpString);;
      } else {
        setErrors({ otp: "Invalid verification code. Please try again." });
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      setErrors({ otp: "Verification failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (isResending || isTimerActive) return;

    setIsResending(true);
    try {
      if (onResendOTP) {
        await onResendOTP();
      } else {
        // Simulate resend
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      setTimeLeft(30);
      setIsTimerActive(true);
      setOtp(["", "", "", "", "", ""]);
      setErrors({});
      inputRefs.current[0]?.focus();
    } catch (error) {
      setErrors({ resend: "Failed to resend code. Please try again." });
    } finally {
      setIsResending(false);
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
                <h2 className="text-xl font-bold">Verify Your Email</h2>
                <p className="text-blue-100 text-sm">Enter the 6-digit code sent to your email</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {isVerified ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Verification Successful!</h3>
                <p className="text-gray-600">Your email has been verified successfully.</p>
              </motion.div>
            ) : (
              <>
                {/* Email Display */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-6">
                  <Envelope size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Code sent to</p>
                    <p className="font-medium text-gray-900">{email}</p>
                  </div>
                </div>

                {/* Error Messages */}
                {errors.otp && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                    <p className="text-red-600 text-sm">{errors.otp}</p>
                  </div>
                )}

                {errors.resend && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                    <p className="text-red-600 text-sm">{errors.resend}</p>
                  </div>
                )}

                {/* OTP Input Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Enter Verification Code
                    </label>
                    <div className="flex gap-2 justify-center">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={handlePaste}
                          className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                            digit 
                              ? 'border-blue-500 bg-blue-50 text-blue-500' 
                              : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
                          }`}
                          autoComplete="one-time-code"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Resend Section */}
                  <div className="text-center">
                    {isTimerActive ? (
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Clock size={16} />
                        <span>Resend code in {timeLeft}s</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={isResending}
                        className="text-blue-600 hover:text-blue-500 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isResending ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
                            Resending...
                          </div>
                        ) : (
                          "Resend verification code"
                        )}
                      </button>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || otp.join('').length !== 6}
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
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={()=>onBack?.()}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mx-auto"
                  >
                    <ArrowLeft size={16} />
                    Back to previous step
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
