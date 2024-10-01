import useCustomFetch from "./useCustomFetch";
import { useAppSelector, useAppDispatch } from "@/utils/reduxHooks";
import { addUser } from "@/redux/slices/userSlice";

export default function useGetUser() {
  const dispatch = useAppDispatch();
  const customFetch = useCustomFetch();
  const { token } = useAppSelector((state) => state.token);

  async function getUser() {
    try {
      if (token) {

        const res = await customFetch("/users/", "get");

        dispatch(addUser(res?.data.user));

      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        console.log("An unknown error occurred:", error);
      }
    }
  }

  return getUser;
}
