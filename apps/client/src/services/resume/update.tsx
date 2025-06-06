import type { ResumeDto, UpdateResumeDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import debounce from "lodash.debounce";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const updateResume = async (data: UpdateResumeDto) => {
  const isShared = window.location.search.includes('sahredcv=true')
  
  const referenceId = localStorage.getItem("reference_id");
  console.log(data,"data222")
  let payload ={
    "cv_data":data.data || data?.cv_data || data?.data1?.cv_data,
    "visibility":data.visibility || data?.data1?.cv?.visibility,
    "title":data.title || data?.data1?.cv?.title,
    "slug":data.slug || data?.data1?.cv?.slug,
  }
  let response; 
  if(isShared){
    response = await axios.patch<ResumeDto, AxiosResponse<ResumeDto>, UpdateResumeDto>(
      `/cv-manager/share-cv/${data?.data1?.id}/`,
      payload,
    );
  }else{
    response = await axios.patch<ResumeDto, AxiosResponse<ResumeDto>, UpdateResumeDto>(
      referenceId ? `/cv-manager/cvs/${data.id}/?reference_id=${referenceId}` : `/cv-manager/cvs/${data.id}/`,
      payload,
    );
  }

  queryClient.setQueryData<ResumeDto>(["resume", { id: response.data.id }], response.data);

  queryClient.setQueryData<ResumeDto[]>(["resumes"], (cache) => {
    if (!cache) return [response.data];
    return cache.map((resume) => {
      if (resume.id === response.data.id) return response.data;
      return resume;
    });
  });


  return response.data.cv_data;
};

export const debouncedUpdateResume = debounce(updateResume, 500);

export const useUpdateResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: updateResumeFn,
  } = useMutation({
    mutationFn: updateResume,
  });

  return { updateResume: updateResumeFn, loading, error };
};
