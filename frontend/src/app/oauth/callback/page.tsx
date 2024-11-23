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
      axios
        .get(
          "https://fuji-backend-593347292272.northamerica-northeast2.run.app/users/oauth/google",
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
          console.error("Error:", error);
          // Close the popup and redirect the parent window to an error page
          if (window.opener) {
            window.opener.postMessage({ error: error }, window.location.origin);
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
