import axios from "@/utils/axios";
import { AxiosError } from "axios";
import { useCallback } from "react";

export default function useRefreshToken() {
  const refreshToken = useCallback(async () => {
    try {
      const res = await axios.get("/users/refresh/");
      return res.data.access_token;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data.message);
      } else if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred:", error);
      }
    }
  }, []);

  return refreshToken;
}
