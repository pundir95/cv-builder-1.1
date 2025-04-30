import { zodResolver } from "@hookform/resolvers/zod";
import { t, Trans } from "@lingui/macro";
import { ArrowRight } from "@phosphor-icons/react";
import { registerSchema } from "@reactive-resume/dto";
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
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import type { z } from "zod";

import { useRegister } from "@/client/services/auth";
import { useFeatureFlags } from "@/client/services/feature";
import { useToast } from "@/client/components/ToastProvider";
import { ErrorMessage } from "@reactive-resume/utils";
import { translateError } from "@/client/services/errors/translate-error";

type FormValues = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { flags } = useFeatureFlags();
  const { register, loading, error } = useRegister();

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

  const onSubmit = async (data: FormValues) => {
    localStorage.setItem("email", data.email);
    try {
      await register(data);
      void navigate("/auth/verify-otp");
      showToast('Registration successful!', 'success');
    } catch (err) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err instanceof Error) {
        if (err.message === ErrorMessage.UserAlreadyExists) {
          errorMessage = translateError(ErrorMessage.UserAlreadyExists) || 'A user with this email already exists.';
          showToast(errorMessage, 'error');
        } else {
          errorMessage = err.message;
          showToast("A user with this email already exists", 'error');
        }
      } else {
        showToast('Registration failed. Please try again.', 'error');
      }
      
      form.reset();
    }
  };

  return (
    <div className="space-y-8" style={{width: "500px"}}>
      <Helmet>
        <title>
          {t`Create a new account`} - {t`Reactive Resume`}
        </title>
      </Helmet>

      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">{t`Create a new account`}</h2>
        <h6>
          <span className="opacity-75">{t`Already have an account?`}</span>
          <Button asChild variant="link" className="px-1.5">
            <Link to="/auth/login">
              {t`Sign in now`} <ArrowRight className="ml-1" />
            </Link>
          </Button>
        </h6>
      </div>

      {/* {flags.isSignupsDisabled && (
        <Alert variant="error">
          <AlertTitle>{t`Signups are currently disabled by the administrator.`}</AlertTitle>
        </Alert>
      )} */}

      {/* {error && (
        <Alert variant="error">
          <AlertTitle>{t`Registration Error`}</AlertTitle>
          <p>{error instanceof Error ? error.message : 'An error occurred during registration.'}</p>
        </Alert>
      )} */}

      <div className={cn(flags.isSignupsDisabled && "pointer-events-none select-none blur-sm", "max-w-2xl mx-auto")}>
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
                  <FormLabel>First Name</FormLabel>
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
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="lowercase"
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
                <FormItem>
                  <FormLabel>{t`Email`}</FormLabel>
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
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
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
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    <Trans>
                      Hold <code className="text-xs font-bold">Ctrl</code> to display your password
                      temporarily.
                    </Trans>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              name="confirm_password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Password`}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    <Trans>
                      Hold <code className="text-xs font-bold">Ctrl</code> to display your password
                      temporarily.
                    </Trans>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <Button disabled={loading} loading={loading} className="mt-4 w-full">
              {t`Sign up`}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
