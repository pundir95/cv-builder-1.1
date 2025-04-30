import { t } from "@lingui/macro";
import { Fingerprint, GithubLogo, GoogleLogo, LinkedinLogo } from "@phosphor-icons/react";
import { Button } from "@reactive-resume/ui";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
} from '@react-oauth/google';

import { useAuthProviders } from "@/client/services/auth/providers";

export const SocialAuth = () => {
  const { providers } = useAuthProviders();

  if (!providers || providers.length === 0) return null;

  const handleSuccess = (credentialResponse: any) => {
    console.log('User Info:', credentialResponse);
    // Save user info or token in localStorage, context, etc.
  };

  const handleLinkedInLogin = () => {
    // LinkedIn OAuth URL with required parameters
    const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_LINKEDIN_CALLBACK_URL;
    const state = Math.random().toString(36).substring(2, 15);
    const scope = 'r_liteprofile r_emailaddress';
    
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
    
    window.location.href = linkedInAuthUrl;
  };
      
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button 
        onClick={handleLinkedInLogin}
        size="lg" 
        className="w-full !bg-[#222] !text-white hover:!bg-[#222]/80"
      >
        <LinkedinLogo className="mr-3 size-4" />
        Linkedin
      </Button>

      <GoogleLogin onSuccess={handleSuccess} />
    </div>
  );
};
