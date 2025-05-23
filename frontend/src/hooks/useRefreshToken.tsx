import { AxiosError } from "axios";
import { useAppDispatch } from "@/utils/reduxHooks";
import axios from "@/utils/axios";
import { setToken } from "@/redux/slices/tokenSlice";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slices/tokenSlice";
import { logoutUser } from "@/redux/slices/userSlice";

export default function useRefreshToken() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const res = await axios.post("/users/refresh/", {
        refresh_token: refreshToken,
      });
      dispatch(setToken(res.data.access_token));
      return res.data.access_token;
    } catch (error) {
      if (error instanceof AxiosError) {
        //refresh token token doesn't work, logout user
        console.log(error);
        if (error.response?.status === 498 || error.response?.status === 400) {
          dispatch(logout());
          dispatch(logoutUser());
          router.push("/login");
        }
      } else if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred:", error);
      }
    }
  };

  return refreshToken;
}
