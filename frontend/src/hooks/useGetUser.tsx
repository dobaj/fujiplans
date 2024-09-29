import useCustomFetch from "./useCustomFetch";
import { useDispatch } from "react-redux";
import { addUser } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function useGetUser() {
  const dispatch = useDispatch();
  const customFetch = useCustomFetch();
  const { token } = useSelector((state: RootState) => state.token);

  async function getUser() {
    try {
      if (token) {
        const res = await customFetch("/users", "get");
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
