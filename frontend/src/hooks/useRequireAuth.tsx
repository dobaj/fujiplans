"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/utils/reduxHooks";
import { RootState } from "@/redux/store";
import Loader from "@/components/loading/Loader";
export default function useRequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const { token } = useAppSelector((state: RootState) => state.token);

  const { user } = useAppSelector((state: RootState) => state.user);

  const router = useRouter();

  const restrictedPath = "/home";

  const noAuth = !token || !user;

  useEffect(() => {
    if (noAuth) {
      if (pathname.startsWith(restrictedPath)) {
        router.push("/login");
      }
    } else {
      if (
        pathname === "/" ||
        pathname === "/login" ||
        pathname === "/register"
      ) {
        router.push("/home");
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, router]);

  if(((noAuth) && pathname.startsWith(restrictedPath)) || (!noAuth && (pathname === "/" || pathname === "/login" || pathname === "/register"))) {
    return <Loader />;
  }

  return children;
}
