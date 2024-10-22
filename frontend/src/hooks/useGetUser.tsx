import { useAppSelector, useAppDispatch } from "@/utils/reduxHooks";
import { addUser } from "@/redux/slices/userSlice";
import useAxiosInt from "./useAxiosInt";

export default function useGetUser() {
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.token);

  const axios = useAxiosInt();

  const getUser = async () => {
    try {
      if (token) {
        const res = await axios.get("/users/");
        dispatch(addUser(res?.data.user));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred:", error);
      }
    }
  }

  return getUser;
}
