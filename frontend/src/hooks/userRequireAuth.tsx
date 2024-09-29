"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function useRequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { token } = useSelector((state: RootState) => state.token);
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const restrictedPath = "/home";

  useEffect(() => {
    let ignore = false;

    const checkAuth = () => {
      if (!token || !user) {
        // User is not authenticated
        if (pathname.startsWith(restrictedPath)) {
          if (!ignore) {
            router.push("/login");
          }
        }
        // Do not redirect from /login or /register when unauthenticated
      } else {
        // User is authenticated
        if (
          pathname === "/" ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          if (!ignore) {
            router.push("/home");
          }
        }
      }

      if (!ignore) {
        setLoading(false);
      }
    };

    checkAuth();

    return () => {
      ignore = true;
    };
  }, [token, user, pathname, router]);

  if (loading || (!user && pathname.startsWith(restrictedPath))) {
    return <div>Loading...</div>;
  }
  
  if (!pathname.startsWith(restrictedPath) && user) {
    return <div>Redirecting...</div>;
  }

  return children;
}

