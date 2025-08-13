import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from '@reactive-resume/ui';
import { CreditCard, ShieldCheck, CheckCircle, X } from '@phosphor-icons/react';
import { axios } from '@/client/libs/axios';
import { toast } from '@/client/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  cvId: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  cvId,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const user = localStorage.getItem("user");
      const userData = JSON.parse(user || "{}");
      
      const response = await axios.post('/cv-manager/human-verification/start-payment/', {
        user_id: userData.id,
        cv_id: cvId,
        amount: 5.00,
        currency: 'USD'
      });
      console.log(response.data,"response.data123123")

      if (response.status === 200) {
        // setIsSuccess(true);
        toast({
          title: "Payment initiated successfully",
          description: "Your human verification request has been submitted.",
          duration: 5000,
          className: "bg-green-500 text-white",
          icon: <CheckCircle size={24} className="text-white" />,
          variant: "default",
        });

        window.location.href = response.data.checkout_url;
        
        // Close modal after showing success state
        // setTimeout(() => {
        //   onSuccess();
        //   onClose();
        // }, 2000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment failed",
        description: "Please try again or contact support.",
        duration: 5000,
        className: "bg-red-500 text-white",
        variant: "error",
      });
    } finally {
      setIsProcessing(false);
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
                <h2 className="text-xl font-bold">Human Verification</h2>
                <p className="text-blue-100 text-sm">Get your resume reviewed by experts</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {!isSuccess ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Professional Resume Review
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Get your resume reviewed by our expert team with detailed feedback and suggestions for improvement.
                  </p>
                  
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">Service Fee:</span>
                      <span className="text-2xl font-bold text-green-600">$05.00</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      One-time payment • 24-hour turnaround
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Expert review by HR professionals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Detailed feedback and suggestions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Industry-specific recommendations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>24-hour delivery guarantee</span>
                    </div>
                  </div>
                </div>

                <DialogFooter className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={isProcessing}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CreditCard size={16} />
                        Pay $05.00
                      </div>
                    )}
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Payment Successful!
                </h3>
                <p className="text-gray-600 text-sm">
                  Your human verification request has been submitted. You'll receive feedback within 24 hours.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}; 