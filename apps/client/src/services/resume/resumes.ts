import type { ResumeDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { RESUMES_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const fetchResumes = async () => {
  const referenceId = localStorage.getItem("reference_id");
  const response = await axios.get<{ data: ResumeDto[] }>(referenceId ? `/cv-manager/cvs/?reference_id=${referenceId}` : "/cv-manager/cvs/");
  console.log(response.data.data, "response.data.data")
  return response.data.data;
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

  return { resumes, loading, error };
};
