import { zodResolver } from "@hookform/resolvers/zod";
import { t, Trans } from "@lingui/macro";
import { ArrowRight, Envelope, Eye, EyeSlash, Lock, User } from "@phosphor-icons/react";
import { loginSchema } from "@reactive-resume/dto";
import { usePasswordToggle } from "@reactive-resume/hooks";
import {
  Alert,
  AlertTitle,
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Card,
  CardContent,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { data, Link,useNavigate } from "react-router";
import { z } from "zod";

import { useLogin } from "@/client/services/auth";
import { useFeatureFlags } from "@/client/services/feature";
import { useToast } from "@/client/components/ToastProvider";
import { axiosForAuth } from "@/client/libs/axios";
import { useAuthStore } from "@/client/stores/auth";

// Local validation schema with better error messages
const localLoginSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .refine((value) => {
      if (value.includes("@")) {
        return z.string().email().safeParse(value).success;
      }
      return value.length >= 3;
    }, {
      message: "Please enter a valid email address or username (at least 3 characters)"
    }),
  password: z.string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long")
});

type FormValues = z.infer<typeof localLoginSchema>;

export const LoginPage = () => {
  const { login, loading } = useLogin();
  const { showToast } = useToast();
  const { flags } = useFeatureFlags();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const formRef = useRef<HTMLFormElement>(null);
  usePasswordToggle(formRef);

  const form = useForm<FormValues>({
    resolver: zodResolver(localLoginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange", // Enable real-time validation
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Check if form is valid before submitting
      const isValid = await form.trigger();
      if (!isValid) {
        console.log("Form validation failed:", form.formState.errors);
        // Force re-render to show errors
        form.trigger();
        return;
      }

      // Convert to the format expected by the API
      const loginData = {
        email: data.email,
        password: data.password
      };

      await login(loginData);
      showToast('Login successful!', 'success');
    } catch (error: any) {
      let errorMessage = error?.response?.data?.message || 'Login failed. Please try again.';
      showToast(errorMessage, 'error');
      form.reset();
    }
  };

  const doItLater=()=>{
    
    axiosForAuth.post("accounts/guest-user/").then((res) => {
      console.log(res.data.data.reference_id,"ress");
      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("reference_id",res.data.data.reference_id);
      // Set user in auth store - critical for ExperienceGuard to work!
      setUser(res.data.data);
      navigate("/onboard/select-template");
    });

    // navigate("/auth/verify-otp");
  }

  // Log form errors for debugging
  console.log("Form errors:", form.formState.errors);
  console.log("Form state:", form.formState);

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-8">
          <Helmet>
            <title>
              {t`Sign in to your account`} - {t`Reactive Resume`}
            </title>
          </Helmet>

          <div className="space-y-1.5 text-center">
            <h2 className="text-3xl font-bold tracking-tight">{t`Sign in to your account`}</h2>
            <h6 className="text-gray-600">
              <span className="opacity-75">{t`Don't have an account?`}</span>
              <Button asChild variant="link" className="px-1.5">
                <Link to="/auth/register">
                  {t({ message: "Create one now", context: "This is a link to create a new account" })}{" "}
                  <ArrowRight className="ml-1" />
                </Link>
              </Button>
            </h6>
          </div>

          {flags.isEmailAuthDisabled && (
            <Alert variant="error">
              <AlertTitle>{t`Signing in via email is currently disabled by the administrator.`}</AlertTitle>
            </Alert>
          )}

          <div className={cn(flags.isEmailAuthDisabled && "pointer-events-none select-none blur-sm")}>
            <Form {...form}>
              <form
                ref={formRef}
                className="flex flex-col gap-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate // Prevent browser validation
              >
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-foreground">{t`Email`}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Envelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <Input
                            autoComplete="email"
                            className={cn(
                              "pl-10 py-6 text-base",
                              form.formState.errors.email && "border-red-500 focus:border-red-500"
                            )}
                            placeholder="john.doe@example.com"
                            {...field}
                            onBlur={() => form.trigger("email")} // Trigger validation on blur
                          />
                        </div>
                      </FormControl>
                      <FormDescription>{t`You can also enter your username.`}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-foreground">{t`Password`}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <Input 
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password" 
                            className={cn(
                              "pl-10 pr-10 py-6 text-base",
                              form.formState.errors.password && "border-red-500 focus:border-red-500"
                            )}
                            {...field} 
                            onBlur={() => form.trigger("password")} // Trigger validation on blur
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

                <Button type="submit" disabled={loading} className="bg-[#D6EF3C]/90 text-black px-6 py-6 rounded-full hover:bg-[#D6EF3C]/30" loading={loading}>
                  Log in
                </Button>

                <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
                  <Button type="button" disabled={loading} className="bg-black text-white rounded-full flex-1 py-3 md:py-6 text-base font-semibold" variant="warning" onClick={doItLater}>
                    Do it Later
                  </Button>

                  <Button asChild variant="link" className="px-4 text-base">
                    <Link to="/auth/forgot-password">{t`Forgot Password?`}</Link>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
