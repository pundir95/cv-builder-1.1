import type { GetTemplateListDto, ResumeDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const getTemplateList = async (data: GetTemplateListDto) => {
  const referenceId = localStorage.getItem("reference_id");
  const response = await axios.get<ResumeDto, AxiosResponse<ResumeDto>, GetTemplateListDto>(
    referenceId ? `/cv-manager/templates-list/?reference_id=${referenceId}` : "/cv-manager/templates-list",
  );

  return response.data;
};


export const useGetTemplateList = () => {
  const {
    error,
    isPending: loading,
    data: templateData,
    mutateAsync: getTemplateListFn,
  } = useMutation({
    mutationFn: getTemplateList,
    onSuccess: (data) => {
        console.log(data,"dataww");
      queryClient.setQueryData<ResumeDto>(["resume", { id: data.id }], data);
      return data.data;

    //   queryClient.setQueryData<ResumeDto[]>(["resumes"], (cache) => {
    //     if (!cache) return [data];
    //     return [data];
    //   });
    },
  });

  return { getTemplateList: getTemplateListFn, loading, error, templateData: templateData?.data };
};
