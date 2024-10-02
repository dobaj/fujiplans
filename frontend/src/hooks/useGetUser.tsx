import { useCallback, useRef } from "react";
import useCustomFetch from "./useCustomFetch";
import { useAppSelector, useAppDispatch } from "@/utils/reduxHooks";
import { addUser } from "@/redux/slices/userSlice";

export default function useGetUser() {
  const dispatch = useAppDispatch();
  const customFetch = useCustomFetch();
  const { token } = useAppSelector((state) => state.token);
  const tokenRef = useRef(token);

  // Wrap getUser with useCallback
  const getUser = useCallback(async () => {
    try {
      if (tokenRef.current) {
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
  }, [dispatch, customFetch]);

  return getUser;
}
