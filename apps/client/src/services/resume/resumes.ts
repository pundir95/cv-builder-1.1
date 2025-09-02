import type { ResumeDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { CAN_RESUME_DOWNLOAD_KEY, RESUMES_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const fetchResumes = async (page: number = 1, limit: number = 10) => {
  const referenceId = localStorage.getItem("reference_id");
  console.log("Fetching resumes with reference_id:", referenceId, "page:", page, "limit:", limit);
  try {
    const baseUrl = referenceId ? `/cv-manager/cvs/?reference_id=${referenceId}` : "/cv-manager/cvs/";
    const url = `${baseUrl}?page=${page}&limit=${limit}`;
    const response = await axios.get<{ data: ResumeDto[]; count: number }>(url);
    console.log("API Response:", response);
    console.log("Resumes data:", response.data.data);
    return { 
      resumes: response.data.data, 
      pagination: {
        total: response.data?.count,
        page,
        limit,
        totalPages: Math.ceil(response.data?.count / limit)
      } 
    };
  } catch (error) {
    console.error("Error fetching resumes:", error);
    throw error;
  }
};

export const fetchCanResumeDownload = async () => {
  const referenceId = localStorage.getItem("reference_id");
  console.log("Fetching resumes with reference_id:", referenceId);
  try {
    const response = await axios.get<{ data: ResumeDto[] }>(`/subscription/check-subscription-status/`);
    console.log("API Response:", response);
    console.log("Resumes data:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching resumes:", error);
    throw error;
  }
}

export const useResumes = (page: number = 1, limit: number = 10) => {
  const {
    error,
    isPending: loading,
    data: result,
  } = useQuery({
    queryKey: [...RESUMES_KEY, page, limit],
    queryFn: () => fetchResumes(page, limit),
  });

  console.log("useResumes hook state:", { result, loading, error });

  return { 
    resumes: result?.resumes || [], 
    loading, 
    error,
    pagination: result?.pagination
  };
};


export const useCanResumeDownload = () => {
  const {
    error,
    isPending: loading,
    data: resumes,
  } = useQuery({
    queryKey: CAN_RESUME_DOWNLOAD_KEY,
    queryFn: fetchCanResumeDownload,
  });

  return { resumes, loading, error };
};
