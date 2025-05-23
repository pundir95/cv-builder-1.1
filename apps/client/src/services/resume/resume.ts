import type { ResumeDto } from "@reactive-resume/dto";

import { axios } from "@/client/libs/axios";

export const findResumeById = async (data: { id: string }) => {
  const referenceId = localStorage.getItem("reference_id");
  const {data:response} = await axios.get<{data:ResumeDto}>(referenceId ? `/cv-manager/cvs/${data.id}/?reference_id=${referenceId}` : `/cv-manager/cvs/${data.id}/`);
  console.log(response.data,"response");
  return response.data
};

export const findResumeByUsernameSlug = async (data: { username: string; slug: string }) => {
  const response = await axios.get<ResumeDto>(`/resume/public/${data.username}/${data.slug}`);

  return response.data;
};
