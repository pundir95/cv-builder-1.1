import type { AuthResponseDto, RegisterDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";
import { useAuthStore } from "@/client/stores/auth";

export const register = async (data: RegisterDto) => {
  const response = await axios.post<AuthResponseDto, AxiosResponse<AuthResponseDto>, RegisterDto>(
    "/accounts/register/",
    data,
  );

  return response.data;
};

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const {
    error,
    isPending: loading,
    mutateAsync: registerFn,
  } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setUser(data.data.user);
      queryClient.setQueryData(["user"], data.data.user);
    },
  });

  return { register: registerFn, loading, error };
};
