"use client";

import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAppDispatch, useAppSelector } from "@/utils/reduxHooks";
import { setTokenLoading } from "@/redux/slices/tokenSlice";

export default function usePersistLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const refreshToken = useRefreshToken();

  const { token } = useAppSelector((state) => state.token);

  const dispatch = useAppDispatch();

  const { tokenLoading } = useAppSelector((state) => state.token);

  useEffect(() => {
    let ignore = false;

    async function verifyRefresh() {
      try {
        await refreshToken();
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        } else {
          console.log("An unknown error occurred:", error);
        }
      } finally {
        if (!ignore) {
          dispatch(setTokenLoading(false));
        }
      }
    }

    if (!token) {
      verifyRefresh();
    } else {
      dispatch(setTokenLoading(false));
    }

    return () => {
      ignore = true;
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return tokenLoading ? <div>loading...</div> : children;
}
