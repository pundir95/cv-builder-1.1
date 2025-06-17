import type { ResumeDto } from "@reactive-resume/dto";

import { axios } from "@/client/libs/axios";

export const findResumeById = async (data: { id: string }) => {
  const referenceId = localStorage.getItem("reference_id");
  const {data:response} = await axios.get<{data:ResumeDto}>(referenceId ? `/cv-manager/cvs/${data.id}/?reference_id=${referenceId}` : `/cv-manager/cvs/${data.id}/`);
  console.log(response.data,"response");
  return response.data
};


export const findSahredResumeById = async (data: { id: string }) => {
  const response = await axios.get<ResumeDto>(`/cv-manager/share-cv/${data.id}/`);
  return response.data;
};


export const findResumeByUsernameSlug = async (data: { username: string; slug: string }) => {
  const response = await axios.get<ResumeDto>(`/resume/public/${data.username}/${data.slug}`);

  return response.data;
};

export const findResumeWithAnyone = async (data: { id: string,shared_id: string }) => {
  const response = await axios.get<ResumeDto>(`/share-resume/shared/${data.shared_id}/ref_id/${data.id}`);
  return response.data;
};
