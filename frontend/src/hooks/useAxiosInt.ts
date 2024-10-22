import axios from "@/utils/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAppSelector } from "@/utils/reduxHooks";

export default function useAxiosInt() {

  const refreshToken = useRefreshToken();

  const { token } = useAppSelector((state) => state.token);

  useEffect(() => {
    //attach token for every request
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      //if response is successful, return response
      (response) => response,
      //if response is not successful, check if the status code is 403
      async (error) => {
        const prevReq = error?.config;
        //if status code is 403, means access token expired so refresh the access token using the refresh token
        if (error?.response?.status === 403 && !prevReq?.sent) {
          //set sent to true to prevent infinite loop
          prevReq.sent = true;
          const newAccessToken = await refreshToken();
          prevReq.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(prevReq);
        }
        return Promise.reject(error);
      }
    );

    //clean up
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return axios;
}
