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
import type { z } from "zod";

import { useLogin } from "@/client/services/auth";
import { useFeatureFlags } from "@/client/services/feature";
import { useToast } from "@/client/components/ToastProvider";
import axios from "axios";

type FormValues = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const { login, loading } = useLogin();
  const { showToast } = useToast();
  const { flags } = useFeatureFlags();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  usePasswordToggle(formRef);

  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // navigate("/onboard/experience-level");

      await login(data);
      // navigate("/onboard/experience-level");
      showToast('Login successful!', 'success');
    } catch (error: any) {
      let errorMessage = error?.response?.data?.message || 'Login failed. Please try again.';
      showToast(errorMessage, 'error');
      form.reset();
    }
  };

  const doItLater=()=>{
    
    axios.post("https://cvbuilder-api.rexett.com/api/v1/accounts/guest-user/").then((res) => {
      console.log(res.data.data.reference_id,"ress");
      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("reference_id",res.data.data.reference_id);
      navigate("/onboard/experience-level");

    });

    // navigate("/auth/verify-otp");
  }



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
              >
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">{t`Email`}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Envelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <Input
                            autoComplete="email"
                            className="pl-10 py-6 text-base"
                            placeholder="john.doe@example.com"
                            {...field}
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
                      <FormLabel className="text-base">{t`Password`}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <Input 
                            type={showPassword ? "text" : "password"}
                            autoComplete="password" 
                            className="pl-10 pr-10 py-6 text-base"
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

                <Button type="submit" disabled={loading} className="w-full py-6 text-base font-semibold" loading={loading}>
                  Log in
                </Button>

                <div className="mt-4 flex items-center gap-x-4">
                  <Button type="button" disabled={loading} className="flex-1 py-6 text-base font-semibold" variant="warning" onClick={doItLater}>
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
