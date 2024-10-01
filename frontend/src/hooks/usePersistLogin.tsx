"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import useRefreshToken from "./useRefreshToken";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setTokenLoading } from "@/redux/slices/tokenSlice";
import { setToken } from "@/redux/slices/tokenSlice";

export default function usePersistLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { refreshToken } = useRefreshToken();
  const { token } = useSelector((state: RootState) => state.token);
  const dispatch = useDispatch();
  const { tokenLoading } = useSelector((state: RootState) => state.token);

  useEffect(() => {

    let ignore = false;

    async function verifyRefresh() {
      try {
        const newToken = await refreshToken();
        if (!ignore) {
          dispatch(setToken(newToken));
        }
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
  }, [token, refreshToken, dispatch]);

  return tokenLoading ? <div>loading...</div> : children;
}
