import { getGoogleOAuthURL } from "./getGoogleUrl";

export function openGooglePopup(){
  // Define the popup dimensions and URL for Google OAuth
  const width = 500;
  const height = 600;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;

  const googleAuthUrl = getGoogleOAuthURL();

  // Open the Google OAuth popup
  window.open(
    googleAuthUrl,
    "Google OAuth",
    `width=${width},height=${height},top=${top},left=${left}`
  );
};
