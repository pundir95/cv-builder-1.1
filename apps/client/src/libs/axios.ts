import { t } from "@lingui/macro";
import type { ErrorMessage } from "@reactive-resume/utils";
import { deepSearchAndParseDates } from "@reactive-resume/utils";
import _axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { redirect } from "react-router";

import { refreshToken } from "@/client/services/auth";

import { USER_KEY } from "../constants/query-keys";
import { toast } from "../hooks/use-toast";
import { translateError } from "../services/errors/translate-error";
import { queryClient } from "./query-client";

interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export const axios = _axios.create({ baseURL: " http://13.49.228.27/api/v1/", withCredentials: true });

// Add token to every request
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercept responses to transform ISO dates to JS date objects
axios.interceptors.response.use(
  (response) => {
    const transformedResponse = deepSearchAndParseDates(response.data, ["createdAt", "updatedAt"]);
    return { ...response, data: transformedResponse };
  },
  (error) => {
    const message = error.response?.data.message as ErrorMessage;
    const description = translateError(message);

    if (description) {
      toast({
        variant: "error",
        title: t`Oops, the server returned an error.`,
        description,
      });
    }

    return Promise.reject(error);
  },
);

// Create another instance to handle failed refresh tokens
const axiosForRefresh = _axios.create({ baseURL: " http://13.49.228.27/api/v1/", withCredentials: true });

// Interceptor to handle expired access token errors
const handleAuthError = async (failedRequest: any) => {
  try {
    const refreshTokenValue = localStorage.getItem('refresh_token');
    if (!refreshTokenValue) {
      throw new Error('No refresh token available');
    }

    // Add refresh token to the request
    failedRequest.response.config.headers['X-Refresh-Token'] = refreshTokenValue;
    
    const response = await refreshToken(axiosForRefresh);
    const tokenResponse = response as unknown as RefreshTokenResponse;
    if (tokenResponse?.token) {
      localStorage.setItem('token', tokenResponse.token);
      if (tokenResponse.refreshToken) {
        localStorage.setItem('refresh_token', tokenResponse.refreshToken);
      }
      failedRequest.response.config.headers.Authorization = `Bearer ${tokenResponse.token}`;
      return Promise.resolve();
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

// Interceptor to handle expired refresh token errors
const handleRefreshError = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
  await queryClient.invalidateQueries({ queryKey: USER_KEY });
  redirect("/auth/login");
};

// Intercept responses to check for 401 and 403 errors, refresh token and retry the request
createAuthRefreshInterceptor(axios, handleAuthError, { 
  statusCodes: [401, 403],
  pauseInstanceWhileRefreshing: true,
  retryInstance: axios
});

createAuthRefreshInterceptor(axiosForRefresh, handleRefreshError, {
  statusCodes: [401, 403],
  pauseInstanceWhileRefreshing: true
});
