import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { ArrowRight } from "@phosphor-icons/react";
import { twoFactorSchema } from "@reactive-resume/dto";
import { usePasswordToggle } from "@reactive-resume/hooks";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@reactive-resume/ui";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import type { z } from "zod";

import { useVerifyOtp } from "@/client/services/auth";
import { useToast } from "@/client/components/ToastProvider";
type FormValues = z.infer<typeof twoFactorSchema>;

export const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const { verifyOtp, loading } = useVerifyOtp();
  const { showToast } = useToast();


  const formRef = useRef<HTMLFormElement>(null);
  usePasswordToggle(formRef);

  const form = useForm<FormValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: { otp: "" },
  });

  const onSubmit = async (data: FormValues) => {
    let newPayload = {
      otp: data.otp,
      email: localStorage.getItem("email"),
    };
    try {
      await verifyOtp(newPayload);
      showToast('Operation successful!', 'success');

      void navigate("/auth/login");
    } catch (error: any) {
      console.log(error);
      let errorMessage = error?.response?.data?.data?.non_field_errors?.[0] || 'Operation failed. Please try again.';
      showToast(errorMessage, 'error');
      form.reset();
    }
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>
          {t`Two-Factor Authentication`} - {t`Reactive Resume`}
        </title>
      </Helmet>

      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">{t`Two-Factor Authentication`}</h2>
        <h6>
          <span className="leading-relaxed opacity-60">
            Enter the one-time password provided by your authenticator app below.
          </span>
        </h6>
      </div>

      <div>
        <Form {...form}>
          <form
            ref={formRef}
            className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="otp"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`One-Time Password`}</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" autoComplete="one-time-code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="link" 
              className="w-full"
              onClick={() => {
                form.reset();
                showToast('OTP reset. Please try again.', 'info');
              }}
            >
              {t`Reset OTP`}
            </Button>

            <Button type="submit" disabled={loading} className="mt-4 w-full" loading={loading}>
              {t`Submit`}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
