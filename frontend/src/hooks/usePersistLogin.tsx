"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import useRefreshToken from "./useRefreshToken";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setToken, setTokenLoading } from "@/redux/slices/tokenSlice";

export default function usePersistLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { refreshToken } = useRefreshToken();
  const { token } = useSelector((state: RootState) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    let ignore = false;

    async function verifyRefresh() {
      try {
        const newToken = await refreshToken();
        if (!ignore) {
          // Only update state if not ignored
          dispatch(setToken(newToken));
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
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
    }

    return () => {
      ignore = true; // Cleanup to avoid state update after unmount
    };
  }, [refreshToken, token, dispatch]);

  return children;
}
