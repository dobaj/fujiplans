import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/utils/reduxHooks";
import { setToken } from "@/redux/slices/tokenSlice";
import { addUser } from "@/redux/slices/userSlice";

interface OAuthMessageData {
  access_token?: string;
  refresh_token?: string;
  user?: {
    _id: string;
    email: string;
    name: string;
  };
  error?: boolean;
  oAuthUrl?: string;
}

export default function useGoogleLogin() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    // Listen for messages from the popup window
    const handleMessage = (event: MessageEvent<OAuthMessageData>) => {
      if (event.origin === window.location.origin) {
        const { access_token, user, refresh_token, error } = event.data;

        if (error) {
          // Handle error case, maybe redirect to an error page
          console.log(error);
          //router.push("/oauth/error");
        }

        if (access_token && user && refresh_token) {
          // Store the access token and user info
          dispatch(setToken(access_token));
          dispatch(addUser(user));
          localStorage.setItem("refresh_token", refresh_token);

          // Redirect to the home page
          router.push("/home");
        }
      }
    };

    window.addEventListener("message", handleMessage);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("message", handleMessage);
  }, [router, dispatch]);
}
