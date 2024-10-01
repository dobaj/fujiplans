"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useAppSelector } from "@/utils/reduxHooks";
import useRefreshToken from "./useRefreshToken";

export default function useCustomFetch() {
  const { token } = useAppSelector((state) => state.token);
  const refreshToken = useRefreshToken();

  async function customFetch(
    url: string,
    method: string,
    data = null
  ): Promise<AxiosResponse | undefined> {
    if (!token) return;

    try {
      // Initial request with current token
      const res: AxiosResponse = await axios({
        method,
        url: `http://localhost:8000${url}`,
        data,
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return res;
    } catch (error) {
      // Handle the error when the token has expired
      if (error instanceof AxiosError) {
        if (error?.response?.status === 403) {
          // Access token expired, refresh the token
          try {
            const newToken = await refreshToken(); // Refresh the token

            // Retry the request with the new token
            const newRes: AxiosResponse = await axios({
              method,
              url: `http://localhost:8000${url}`,
              data,
              headers: { Authorization: `Bearer ${newToken}` },
              withCredentials: true,
            });

            return newRes;
          } catch (refreshError) {
            // Handle error during token refresh
            if (refreshError instanceof AxiosError && refreshError.response) {
              console.error(
                refreshError.response.data.message || "Error refreshing token"
              );
            } else {
              console.error("An unknown error occurred while refreshing token");
            }
          }
        } else if (error.response) {
          // Handle other response errors (non-403)
          console.error(error.response.data.message || "Request failed.");
        } else {
          console.error("Request failed without a response.");
        }
      } else {
        console.error("An unknown error occurred.");
      }
    }
  }

  return customFetch;
}
