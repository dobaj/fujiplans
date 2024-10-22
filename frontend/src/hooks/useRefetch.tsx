"use client";

import { useEffect, useState } from "react";
import useGetUser from "./useGetUser";
import { useAppSelector } from "@/utils/reduxHooks";

export default function useRefetch({
  children,
}: {
  children: React.ReactNode;
}) {
  const getUser = useGetUser();
  const { token } = useAppSelector((state) => state.token);
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(true);

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
          setLoading(false);
        }
      }
    }

    if (token && !user && !ignore) {
      refetch();
    } else {
      setLoading(false);
    }

    return () => {
      ignore = true; // Ensure no state updates after unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? <div>loading...</div> : children;
}
