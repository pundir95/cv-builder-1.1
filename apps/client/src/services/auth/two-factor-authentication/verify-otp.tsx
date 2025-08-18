import type { AuthResponseDto, TwoFactorDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";
import { useAuthStore } from "@/client/stores/auth";

export const verifyOtp = async (data: TwoFactorDto) => {
  const response = await axios.post<AuthResponseDto, AxiosResponse<AuthResponseDto>, TwoFactorDto>(
    "accounts/verify-user/",
    data,
  );

  return response.data;
};

export const useVerifyOtp = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const {
    error,
    isPending: loading,
    mutateAsync: verifyOtpFn,
  } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      setUser(data.data.user);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("token", data.data.access);
      localStorage.setItem("refresh_token", data.data.refresh);
      queryClient.setQueryData(["user"], data.data.user);
      console.log(data.data.user, "data.data.user");
    },
  });

  return { verifyOtp: verifyOtpFn, loading, error };
};


export const resendOtp = async () => {
  const response = await axios.post("/accounts/resend-email-verification-otp/", {
    email: localStorage.getItem("email")
  });

  return response.data;
};

export const useResendOtp = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const {
    error,
    isPending: loading,
    mutateAsync: resendOtpFn,
  } = useMutation({
    mutationFn: resendOtp,
    onSuccess: (data) => {
      setUser(data.data.user);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("token", data.data.access);
      localStorage.setItem("refresh_token", data.data.refresh);
      queryClient.setQueryData(["user"], data.data.user);
      console.log(data.data.user, "data.data.user");
    },
  });

  return { resendOtp: resendOtpFn, loading, error };
};