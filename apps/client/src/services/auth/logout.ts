import { useMutation } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";
import { useAuthStore } from "@/client/stores/auth";

export const logout = async () => {
  localStorage.clear();
  queryClient.setQueryData(["user"], null);
  return Promise.resolve();
};

export const useLogout = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const {
    error,
    isPending: loading,
    mutateAsync: logoutFn,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.clear();
      setUser(null);
      queryClient.setQueryData(["user"], null);
      // Use navigate instead of window.location.href for better React Router integration
      window.location.href = "/auth/login";
    },
    onError: () => {
      setUser(null);
      queryClient.setQueryData(["user"], null);
    },
  });

  return { logout: logoutFn, loading, error };
};
