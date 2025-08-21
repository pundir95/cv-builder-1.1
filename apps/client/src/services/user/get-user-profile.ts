import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const getUserProfile = async () => {
  const response = await axios.get<any, AxiosResponse<any>>(
    "/accounts/user-profile/"
  );

  return response.data.data;
};

export const useGetUserProfile = () => {
  const {
    data: userProfile,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  return { userProfile, error, isLoading, refetch };
}; 