import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { ArrowRight, Eye, EyeSlash, X, User, Envelope, Phone, Lock, CheckCircle, ArrowClockwise } from "@phosphor-icons/react";
import { usePasswordToggle } from "@reactive-resume/hooks";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { useRegister } from "@/client/services/auth";
import { useVerifyOtp } from "@/client/services/auth/two-factor-authentication/verify-otp";
import { useToast } from "@/client/components/ToastProvider";
import { ErrorMessage } from "@reactive-resume/utils";
import { translateError } from "@/client/services/errors/translate-error";
import { axios, axiosForAuth } from "@/client/libs/axios";
import { useUser } from "../services/user";

// Registration form schema
const registerSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirm_password: z.string().min(1, "Please confirm your password"),
  phone_number: z.string().min(1, "Phone number is required"),
  locale: z.string().default("en-US"),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

// OTP verification schema
const otpSchema = z.object({
  otp: z.string().min(6, "Please enter the 6-digit OTP").max(6, "OTP should be 6 digits"),
});

type FormValues = z.infer<typeof registerSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

interface GuestRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuestRegistrationModal = ({ isOpen, onClose }: GuestRegistrationModalProps) => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { register, loading, error } = useRegister();
  const { verifyOtp, loading: otpVerifying } = useVerifyOtp();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState<'registration' | 'verification'>('registration');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [canResend, setCanResend] = useState(true);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [resendingOtp, setResendingOtp] = useState(false);
  const { user } = useUser();
  console.log(user,"user123")
  const formRef = useRef<HTMLFormElement>(null);
  usePasswordToggle(formRef);

  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      phone_number: "",
      locale: "en-US",
    },
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    localStorage.setItem("email", data.email);
    setUserEmail(data.email);
    setUserPassword(data.password);
    console.log(user,"user")
    try {
      // Call the new guest email verification API
      const response = await axiosForAuth.post("/accounts/guest/email-verification/", {
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        user_id: user?.id // Using email as user_id for now, adjust if you have a different user_id
      });
      
      // Store the user_id from response if provided
      if (response.data.user_id) {
        setUserId(response.data.user_id);
      } else {
        setUserId(data.email); // Fallback to email if no user_id in response
      }
      
      setCurrentStep('verification');
      showToast('Registration successful! Please check your email for the OTP.', 'success');
    } catch (err) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err instanceof Error) {
        if (err.message === ErrorMessage.UserAlreadyExists) {
          errorMessage = translateError(ErrorMessage.UserAlreadyExists) || 'A user with this email already exists.';
          showToast(errorMessage, 'error');
        } else {
          errorMessage = err.message;
          showToast(errorMessage, 'error');
        }
      } else {
        showToast('Registration failed. Please try again.', 'error');
      }
    }
  };

  const onOtpSubmit = async (data: OtpFormValues) => {
    try {
      // Call the new guest verify conversion OTP API
      const response = await axiosForAuth.post("/accounts/guest/verify-conversion-otp/", {
        email: userEmail,
        otp: data.otp,
        user_id: user?.id
      });
      
      showToast('Email verified successfully! Redirecting to subscription page...', 'success');
      console.log(response.data.data,"response.data.data")
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      localStorage.setItem("token", response.data.data.access);
      localStorage.setItem("refresh_token", response.data.data.refresh);
      onClose();
      const res = await axios.get("/accounts/api/users/",{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
       
      })
      if(res?.data?.length>0){
        localStorage.setItem("user",JSON.stringify(res.data[0]));
        // if(res.data[0].subscription_details.length>0){
        //   void navigate("/dashboard");
        // }else{
        //   void navigate("/onboard/select-template");
        // }
      }
      void navigate("/dashboard/plan-pricing");
      
      // Redirect to subscription page
      // navigate('/dashboard/plan-pricing');
    } catch (err) {
      showToast('OTP verification failed. Please check the code and try again.', 'error');
    }
  };

  const handleResendOtp = async () => {
    setResendingOtp(true);
    try {
      // Use the new guest email verification API to resend OTP
      const response = await axiosForAuth.post("/api/v1/accounts/guest/email-verification/", {
        email: userEmail,
        password: userPassword,
        user_id: userId
      });
      
      showToast('OTP resent successfully! Please check your email.', 'success');
      setCanResend(false);
      setResendCountdown(60);
      
      // Start countdown
      const interval = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      showToast('Failed to resend OTP. Please try again.', 'error');
    } finally {
      setResendingOtp(false);
    }
  };

  const handleClose = () => {
    setCurrentStep('registration');
    form.reset();
    otpForm.reset();
    setUserEmail('');
    setUserPassword('');
    setUserId('');
    setCanResend(true);
    setResendCountdown(0);
    setResendingOtp(false);
    onClose();
  };

  const handleBackToRegistration = () => {
    setCurrentStep('registration');
    otpForm.reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              {currentStep === 'verification' ? (
                <CheckCircle size={20} className="text-white" weight="fill" />
              ) : (
                <User size={20} className="text-white" weight="fill" />
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              {currentStep === 'verification' ? 'Verify Your Email' : 'Complete Your Registration'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === 'registration' ? (
            <>
              <p className="text-gray-600 mb-6 leading-relaxed">
                To access premium features and download your resume, please complete your registration below.
              </p>
              
              <div className="max-w-2xl mx-auto">
                <Form {...form}>
                  <form
                    ref={formRef}
                    className="flex flex-col gap-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <div className="flex gap-4">
                      <FormField
                        name="first_name"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel className="text-foreground flex items-center gap-2">
                              <User size={16} />
                              First Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="last_name"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel className="text-foreground flex items-center gap-2">
                              <User size={16} />
                              Last Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Doe"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex gap-4">
                      <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel className="text-foreground flex items-center gap-2">
                              <Envelope size={16} />
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                className="lowercase"
                                placeholder="john.doe@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="phone_number" 
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel className="text-foreground flex items-center gap-2">
                              <Phone size={16} />
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <PhoneInput
                                country="IN"
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                                inputClass="!w-full !h-11 !pl-16"
                                containerClass="phonefield-wrapper"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex gap-4">
                      <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground flex items-center gap-2">
                              <Lock size={16} />
                              Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input 
                                  type={showPassword ? "text" : "password"} 
                                  {...field} 
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showPassword ? (
                                    <Eye size={20} />
                                  ) : (
                                    <EyeSlash size={20} />
                                  )}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="confirm_password"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground flex items-center gap-2">
                              <Lock size={16} />
                              Confirm Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input 
                                  type={showConfirmPassword ? "text" : "password"} 
                                  {...field} 
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showConfirmPassword ? (
                                    <Eye size={20} />
                                  ) : (
                                    <EyeSlash size={20} />
                                  )}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 mt-6">
                      <Button 
                        disabled={loading} 
                        loading={loading} 
                        className="w-full bg-[#D6EF3C]/90 text-black py-3 rounded-xl font-semibold hover:bg-[#D6EF3C] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <User size={18} className="mr-2" />
                        Complete Registration
                      </Button>
                      
                      <Button
                        variant="ghost"
                        onClick={handleClose}
                        className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" weight="fill" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Check Your Email</h3>
                <p className="text-gray-600">
                  We've sent a 6-digit verification code to <span className="font-semibold">{userEmail}</span>
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <Form {...otpForm}>
                  <form
                    className="flex flex-col gap-y-4"
                    onSubmit={otpForm.handleSubmit(onOtpSubmit)}
                  >
                    <FormField
                      name="otp"
                      control={otpForm.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Enter Verification Code</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="123456"
                              maxLength={6}
                              className="text-center text-2xl font-mono tracking-widest"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Resend OTP Section */}
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleResendOtp}
                        disabled={!canResend || resendingOtp}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        {resendingOtp ? (
                          <ArrowClockwise size={16} className="mr-2 animate-spin" />
                        ) : (
                          <ArrowClockwise size={16} className="mr-2" />
                        )}
                        {resendingOtp 
                          ? 'Resending...' 
                          : canResend 
                            ? 'Resend OTP' 
                            : `Resend in ${resendCountdown}s`
                        }
                      </Button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 mt-6">
                      <Button 
                        disabled={otpVerifying} 
                        loading={otpVerifying} 
                        className="w-full bg-[#D6EF3C]/90 text-black py-3 rounded-xl font-semibold hover:bg-[#D6EF3C] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <CheckCircle size={18} className="mr-2" />
                        Verify Email
                      </Button>
                      
                      <Button
                        variant="ghost"
                        onClick={handleBackToRegistration}
                        className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                      >
                        ← Back to Registration
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}; 