import type { MessageDto } from "@reactive-resume/dto";
import type { AxiosInstance, AxiosResponse } from "axios";

export const refreshToken = async (axios: AxiosInstance) => {
  const refreshToken = localStorage.getItem('refresh_token');
  
  const response = await axios.post<MessageDto, AxiosResponse<MessageDto>>("accounts/refresh-email-token/", {
    refresh: refreshToken
  });

  return response.data;
};
