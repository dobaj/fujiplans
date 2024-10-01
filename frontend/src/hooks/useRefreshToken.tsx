
import axios from "@/utils/axios";
import { AxiosError } from "axios";


export default function useRefreshToken() {

  async function refreshToken() {
    try {

      const res = await axios.get("/users/refresh/", {
        withCredentials: true,
      });

      return res.data.access_token;

    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error?.response?.data.message);
      } else if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred:", error);
      }
    }
  }

  return { refreshToken };
}
