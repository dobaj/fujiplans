"use client";

import { useEffect, useRef } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAppDispatch, useAppSelector } from "@/utils/reduxHooks";
import { setTokenLoading } from "@/redux/slices/tokenSlice";
import { setToken } from "@/redux/slices/tokenSlice";

export default function usePersistLogin({
  children,
}: {
  children: React.ReactNode;
}) {


  const refreshToken = useRefreshToken();

  const { token } = useAppSelector((state) => state.token);
  
  const dispatch = useAppDispatch();

  const { tokenLoading } = useAppSelector((state) => state.token);

  const tokenRef = useRef(token);

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

    if (!tokenRef.current) {
      verifyRefresh();
    } else {
      dispatch(setTokenLoading(false));
    }

    return () => {
      ignore = true;
    };
  }, [refreshToken, dispatch]);

  return tokenLoading ? <div>loading...</div> : children;
}
