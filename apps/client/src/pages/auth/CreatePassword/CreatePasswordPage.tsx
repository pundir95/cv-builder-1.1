import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { ArrowRight, Eye, EyeSlash, Lock } from "@phosphor-icons/react";
import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Card, CardContent } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { z } from "zod";

import { useToast } from "@/client/components/ToastProvider";
import { axios } from "@/client/libs/axios";

const createPasswordSchema = z.object({
  password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .max(255, "Password must be less than 255 characters"),
  confirm_password: z.string()
    .min(6, "Confirm password must be at least 6 characters long")
    .max(255, "Confirm password must be less than 255 characters")
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

type FormValues = z.infer<typeof createPasswordSchema>;

const CreatePasswordPage = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token, email } = useParams();

  const form = useForm<FormValues>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      // Here you would typically make an API call to update the password
      // For now, we'll simulate a successful password creation
      console.log("Password data:", data);
      const formData = new FormData();
      formData.append('email', email || '');
      formData.append('password', data.password);
      formData.append('key', token || '');
      

      const response = await axios.post(`/addon-user/password-reset/`,formData);

      console.log(response,"response")
      
      showToast('Password created successfully!', 'success');
      
      // Navigate to the next step or dashboard
      navigate("/dashboard");
    } catch (error: any) {
      let errorMessage = error?.response?.data?.message || 'Password creation failed. Please try again.';
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-8">
          <Helmet>
            <title>{`Create Password`} - {`Reactive Resume`}</title>
          </Helmet>

          <div className="space-y-1.5 text-center">
            <h2 className="text-3xl font-bold tracking-tight">{t`Create your password`}</h2>
            <h6 className="text-gray-600">
              <span className="opacity-75">{t`Set a strong password to secure your account.`}</span>
            </h6>
          </div>

          <div>
            <Form {...form}>
              <form
                className="flex flex-col gap-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">{t`Password`}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <Input 
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password" 
                            className="pl-10 pr-10 py-6 text-base"
                            placeholder="Enter your password"
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
                      <FormDescription>{`Password must be at least 6 characters long`}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="confirm_password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">{`Confirm Password`}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <Input 
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete="new-password" 
                            className="pl-10 pr-10 py-6 text-base"
                            placeholder="Confirm your password"
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
                      <FormDescription>{`Please confirm your password`}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="bg-[#D6EF3C]/90 text-black px-6 py-6 rounded-full hover:bg-[#D6EF3C]/30" 
                  loading={loading}
                >
                  {`Create Password`}
                </Button>

                <div className="mt-4 flex items-center justify-center">
                  <Button asChild variant="link" className="px-4 text-base">
                    <Link to="/auth/login">
                      {`Back to Login`} <ArrowRight className="ml-1" />
                    </Link>
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

export default CreatePasswordPage;