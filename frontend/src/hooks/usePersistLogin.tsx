"use client";

import { useEffect, useState } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAppSelector } from "@/utils/reduxHooks";
import Loader from "@/components/loading/Loader";

export default function usePersistLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const refreshToken = useRefreshToken();

  const { token } = useAppSelector((state) => state.token);

  const [loading, setLoading] = useState<boolean>(true);

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
          setLoading(false);
        }
      }
    }

    if (!token) {
      verifyRefresh();
    } else {
      setLoading(false);
    }

    return () => {
      ignore = true;
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? <Loader/> : children;
}
