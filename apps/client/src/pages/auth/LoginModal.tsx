import { GoogleOAuthProvider } from "@react-oauth/google";
import { SocialAuth } from "./_components/social-auth";
import { LoginPage } from "./login/page";
import { cn } from "@reactive-resume/utils";

export const LoginModal = () => {
  return<>
   <GoogleOAuthProvider clientId={"48252327683-8asdmh85nur7uiunvo17dvgh0h3tpnmv.apps.googleusercontent.com"}>  
  <div className="flex flex-col items-center justify-center w-full mt-[60px]">
  <button 
      onClick={() => window.history.back()}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors absolute top-[100px] left-4"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg"   
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round"  
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M10 19l-7-7m0 0l7-7m-7 7h18" 
        />
      </svg>
      <span className="font-medium">Back</span>
    </button>

    <LoginPage />
    <div className={cn("flex items-center gap-x-4")}> 
                  <hr className="flex-1 border-gray-200" />
                  <span className="text-base font-medium text-gray-400 p-3">or continue with</span>
                  <hr className="flex-1 border-gray-200" />
                </div>
    <SocialAuth />
    </div>
    </GoogleOAuthProvider>
  </>;
};
