"use client";

import { useEffect } from "react";
import useGetUser from "./useGetUser";
import { setUserLoading } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/utils/reduxHooks";

export default function useRefetch({
  children,
}: {
  children: React.ReactNode;
}) {
  const getUser = useGetUser();
  const { token } = useAppSelector((state) => state.token);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { userLoading } = useAppSelector((state) => state.user);

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
  }, []);

  return userLoading ? <div>loading...</div> : children;
}