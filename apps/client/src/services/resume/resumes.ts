import type { ResumeDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { RESUMES_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const fetchResumes = async () => {
  const referenceId = localStorage.getItem("reference_id");
  console.log("Fetching resumes with reference_id:", referenceId);
  try {
    const response = await axios.get<{ data: ResumeDto[] }>(referenceId ? `/cv-manager/cvs/?reference_id=${referenceId}` : "/cv-manager/cvs/");
    console.log("API Response:", response);
    console.log("Resumes data:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching resumes:", error);
    throw error;
  }
};

export const useResumes = () => {
  const {
    error,
    isPending: loading,
    data: resumes,
  } = useQuery({
    queryKey: RESUMES_KEY,
    queryFn: fetchResumes,
  });

  console.log("useResumes hook state:", { resumes, loading, error });

  return { resumes, loading, error };
};
