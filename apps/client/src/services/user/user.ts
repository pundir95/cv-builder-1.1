import type { UserDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useEffect } from "react";

import { axios } from "@/client/libs/axios";
import { useAuthStore } from "@/client/stores/auth";

export const fetchUser = async () => {
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user ?? "{}");
  console.log(userData, "userData");
  return {
    id: userData.id,
    name: userData.first_name + " " + userData.last_name,
    first_name: userData.first_name,
    last_name: userData.last_name,
    phone_number: userData.phone_number,
    picture: userData.picture,
    username: userData.username,
    email: userData.email,
    locale: "en-US",
    emailVerified: true,
    twoFactorEnabled: false,
    provider: (userData.provider ?? "github") as "github" | "email" | "google" | "openid",
    createdAt: userData.created_at,
    updatedAt: userData.updated_at
  };
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
