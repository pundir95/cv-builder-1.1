import type { ResumeDto } from "@reactive-resume/dto";

import { axios } from "@/client/libs/axios";

export const findResumeById = async (data: { id: string }) => {
  const {data:response} = await axios.get<{data:ResumeDto}>(`cv-manager/cvs/${data.id}/`);
  console.log(response.data,"response");
  return {
    "title": "Pankaj",
    "slug": "Pankaj",
    "id": response.data.id,
    "data": response.data.cv_data,
    
}
};

export const findResumeByUsernameSlug = async (data: { username: string; slug: string }) => {
  const response = await axios.get<ResumeDto>(`/resume/public/${data.username}/${data.slug}`);

  return response.data;
};
