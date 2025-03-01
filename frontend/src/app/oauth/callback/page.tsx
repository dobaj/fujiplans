"use client";

import React, { useEffect } from "react";
import axios from "@/utils/axios";
import Loader from "@/components/loading/Loader";

export default function OAuthCallback() {
  useEffect(() => {
    // Parse the authorization code from the query parameters
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");

    // Send the code to the backend to complete the OAuth flow
    if (code) {
      const backendURL = process.env.NEXT_PUBLIC_OAUTH_URL ? process.env.NEXT_PUBLIC_OAUTH_URL : "http://localhost:8080/users/oauth/google/"
      axios
        .get(
          backendURL,
          {
            params: { code },
          },
        )
        .then((response) => {
          // Extract the access token and user info from the response
          const { data } = response;
          const { access_token, user } = data;

          // Send the token and user info to the parent window
          if (window.opener) {
            window.opener.postMessage(
              { access_token, user },
              window.location.origin,
            );
          }

          // Close the popup window
          window.close();
        })
        .catch((error) => {
          // Create a serializable error object instead of passing the entire error
          const serializableError = { 
            message: error.message || "OAuth authentication failed",
            status: error.response?.status || 500,
            data: error.response?.data || {}
          };
          // Close the popup and redirect the parent window to an error page
          if (window.opener) {
            window.opener.postMessage({ error: serializableError }, window.location.origin);
          }
          window.close();
        });
    } else {
      // If there's no code, send an error message to the parent window and close the popup
      if (window.opener) {
        window.opener.postMessage({ error: true }, window.location.origin);
      }
      window.close();
    }
  }, []);

  return <Loader />;
}
