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
      queryClient.setQueryData(["user"], data.data.user);
    },
  });

  return { verifyOtp: verifyOtpFn, loading, error };
};
