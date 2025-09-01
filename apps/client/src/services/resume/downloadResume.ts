import type { AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

interface DownloadResumeDto {
  cv_id: string;
  template_id: string;
}

interface DownloadResumeResponse {
  // Define the response type based on what the API returns
  // This could be a blob for file download or a URL
  data: any;
}

export const downloadResume = async (data: DownloadResumeDto) => {
  const response = await axios.post<Blob, AxiosResponse<Blob>, DownloadResumeDto>(
    "/cv-manager/cv-download/",
    data,
    {
      responseType: 'blob', // Important for file downloads
    }
  );

  // Create blob URL and trigger download
  const blob = response.data;
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  
  // Set filename - you can customize this based on your needs
  link.download = `resume_${data.cv_id}_${data.template_id}.pdf`;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);

  return blob;
};

export const useDownloadResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: downloadResumeFn,
  } = useMutation({
    mutationFn: downloadResume,
    onSuccess: (data) => {
      // File download is automatically triggered in the downloadResume function
      console.log("Resume downloaded successfully");
    },
    onError: (error) => {
      console.error("Failed to download resume:", error);
    },
  });

  return { downloadResume: downloadResumeFn, loading, error };
};
