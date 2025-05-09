import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const uploadImage = (payload: any) => {
  const formData = new FormData();
  formData.append("file", payload.image);
  formData.append("user_id", payload.user_id);
  formData.append("cv_id", payload.cv_id);

  return axios.patch<string, AxiosResponse<string>, FormData>("/cv-manager/cv-image-update/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const useUploadImage = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: uploadImageFn,
  } = useMutation({
    mutationFn: uploadImage,
  });

  return { uploadImage: uploadImageFn, loading, error };
};
