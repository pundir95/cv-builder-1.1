import type { UserDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useEffect } from "react";

import { axios } from "@/client/libs/axios";
import { useAuthStore } from "@/client/stores/auth";

export const fetchUser = async () => {
  return {
    "id": "cm8fqja5s0klgjee2tcmm08fc",
    "name": "Pankaj Pundir",
    "picture": "https://avatars.githubusercontent.com/u/106310650?v=4",
    "username": "pundir95",
    "email": "pankaj@avioxtechnologie1111s.com",
    "locale": "en-US",
    "emailVerified": true,
    "twoFactorEnabled": false,
    "provider": "github",
    "createdAt": "2025-03-19T09:43:51.089Z",
    "updatedAt": "2025-03-19T09:43:51.089Z"
}
};

export const useUser = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const {
    error,
    isPending: loading,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  useEffect(() => {
    setUser(user ?? null);
  }, [user, setUser]);

  return { user: user, loading, error };
};
