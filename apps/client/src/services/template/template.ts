import type { GetTemplateListDto, ResumeDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

interface Template {
  id: number;
  name: string;
  withPhoto: boolean;
  withoutPhoto: boolean;
  oneColumn: boolean;
  twoColumn: boolean;
}

export const getTemplateList = async (data: GetTemplateListDto) => {
  const referenceId = localStorage.getItem("reference_id");
  const response = await axios.get<Template[], AxiosResponse<Template[]>, GetTemplateListDto>(
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
      console.log(data, "dataww");
      return data;
    },
  });

  return { getTemplateList: getTemplateListFn, loading, error, templateData };
};
