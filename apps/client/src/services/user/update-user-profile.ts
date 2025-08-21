import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const updateUserProfile = async (formData: FormData) => {
  const response = await axios.patch<any, AxiosResponse<any>, FormData>(
    "/accounts/update-user-profile/",
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

export const useUpdateUserProfile = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: updateUserProfileFn,
  } = useMutation({
    mutationFn: updateUserProfile,
  });

  return { updateUserProfile: updateUserProfileFn, loading, error };
}; 