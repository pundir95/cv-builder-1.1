import type { CreateResumeDto, ResumeDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";
import { RESUMES_KEY } from "@/client/constants/query-keys";
import { fetchResumes } from "./resumes";

export const createResume = async (data: CreateResumeDto) => {
  const referenceId = localStorage.getItem("reference_id");
  const response = await axios.post<ResumeDto, AxiosResponse<ResumeDto>, CreateResumeDto>(
    referenceId ? `/cv-manager/cvs/?reference_id=${referenceId}` : "/cv-manager/cvs/",
    data,
  );

  return response.data;
};

export const useCreateResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: createResumeFn,
    data: response,
  } = useMutation({
    mutationFn: createResume,
    onSuccess: (data) => {
      queryClient.setQueryData<ResumeDto>(["resume", { id: data.id }], data);
      
      // Invalidate and refetch the resumes query
      queryClient.invalidateQueries({ queryKey: RESUMES_KEY });
      
      queryClient.setQueryData<ResumeDto[]>(["resumes"], (cache) => {
        if (!cache) return [data];
        return [...cache, data];
      });
    },  
  });

  return { createResume: createResumeFn, loading, error, response };
};
