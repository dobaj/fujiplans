"use client";

import { useEffect } from "react";
import useGetUser from "./useGetUser";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setUserLoading } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";

export default function useRefetch({
  children,
}: {
  children: React.ReactNode;
}) {
  const getUser = useGetUser();
  const { token } = useSelector((state: RootState) => state.token);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { userLoading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    let ignore = false;

    async function refetch() {
      try {
        await getUser();
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("An unknown error occurred:", error);
        }
      } finally {
        if (!ignore) {
          dispatch(setUserLoading(false));
        }
      }
    }

    if (token && !user && !ignore) {
      refetch();
    } else {
      dispatch(setUserLoading(false));
    }

    return () => {
      ignore = true; // Ensure no state updates after unmount
    };
  }, [getUser, token, dispatch, user]);

  return userLoading ? <div>loading...</div> : children;
}
