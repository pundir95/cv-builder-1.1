import { t } from "@lingui/macro";
import { Fingerprint, GithubLogo, GoogleLogo, LinkedinLogo } from "@phosphor-icons/react";
import { Button } from "@reactive-resume/ui";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
} from '@react-oauth/google';


import { useAuthProviders } from "@/client/services/auth/providers";
import axios from "axios";
import { useNavigate } from "react-router";

export const SocialAuth = () => {
  const { providers } = useAuthProviders();
  const navigate = useNavigate();

  // if (!providers || providers.length === 0) return null;

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse,"tokenResponse");
        axios.post("https://cvbuilder-api.rexett.com/api/v1/accounts/google/",{
        access_token:tokenResponse.access_token
      }).then((res) => {
        console.log(res,"ress");
        localStorage.setItem("token",res.data.access);
        localStorage.setItem("refresh_token",res.data.refresh);

        axios.get("https://cvbuilder-api.rexett.com/api/v1/accounts/api/users/",{
          headers:{
            Authorization:`Bearer ${res.data.access}`
          }
         
        }).then((res) => {
          localStorage.setItem("user",JSON.stringify(res.data[0]));
          if(res.data[0].subscription_details.length>0){
            navigate("/dashboard")
          }else{
            navigate("/onboard/experience-level")
          }
        })

        // navigate("/onboard/experience-level");

      });
      
    },
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    flow: 'implicit', // or "auth-code" depending on your setup
  });

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
        className="w-full py-6 text-base font-semibold !bg-[#0077B5] !text-white hover:!bg-[#0077B5]/90 transition-all duration-200"
      >
        <LinkedinLogo className="mr-3 size-5" weight="fill" />
        LinkedIn
      </Button>

      {/* <GoogleLogin onSuccess={handleSuccess} /> */}
      <Button 
        onClick={() => login()}
        size="lg" 
        className="w-full py-6 text-base font-semibold !bg-white !text-gray-700 hover:!bg-gray-50 transition-all duration-200 border border-gray-200"
      >
        <GoogleLogo className="mr-3 size-5" weight="fill" />
        Google
      </Button>
    </div>
  );
};
