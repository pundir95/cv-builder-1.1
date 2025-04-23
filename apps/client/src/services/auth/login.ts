import type { AuthResponseDto, LoginDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";
import { useAuthStore } from "@/client/stores/auth";

export const login = async (data: LoginDto) => {
  const response = await axios.post<AuthResponseDto, AxiosResponse<AuthResponseDto>, LoginDto>(
    "/accounts/email-login/",
    data,
  );

  return response.data;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    error,
    isPending: loading,
    mutateAsync: loginFn,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.access);
      localStorage.setItem("refresh_token", data.data.refresh);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      // setUser(data.data.user);
      navigate("/onboard/experience-level")

      
      queryClient.setQueryData(["user"], data.data.user);
    },
  });

  return { login: loginFn, loading, error };
};
