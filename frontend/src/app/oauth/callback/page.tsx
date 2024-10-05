"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";
import { useAppDispatch } from "@/utils/reduxHooks";
import { setToken } from "@/redux/slices/tokenSlice";
import { addUser } from "@/redux/slices/userSlice";

export default function OAuthCallback() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Parse the authorization code from the query parameters
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");

    // Send the code to the backend to complete the OAuth flow
    if (code) {
      axios
        .get(`http://localhost:8000/users/oauth/google`, {
          params: {
            code,
          },
        })
        .then((response) => {
          // Extract the access token from the response
          const { data } = response;
          const { access_token, user } = data;

          dispatch(setToken(access_token));
          dispatch(addUser(user));

          router.push("/home");
        })
        .catch((error) => {
          console.error("Error:", error);
          // Redirect to error page
          router.push("/oauth/error");
        });
    }
  }, [router, dispatch]);

  return <div>Logging in with Google...</div>;
};
