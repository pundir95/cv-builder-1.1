import { t } from "@lingui/macro";
import { cn } from "@reactive-resume/utils";
import { useMemo } from "react";
import { Link, matchRoutes, Outlet, useLocation } from "react-router";

import { LocaleSwitch } from "@/client/components/locale-switch";
import { Logo } from "@/client/components/logo";
import { ThemeSwitch } from "@/client/components/theme-switch";
import { useAuthProviders } from "@/client/services/auth/providers";

import { SocialAuth } from "./_components/social-auth";
import { GoogleOAuthProvider } from "@react-oauth/google";

const authRoutes = [{ path: "/auth/login" }, { path: "/auth/register" }];

export const AuthLayout = () => {
  const location = useLocation();
  const { providers } = useAuthProviders();
  const isAuthRoute = useMemo(() => matchRoutes(authRoutes, location) !== null, [location]);

  if (!providers) return null;

  // Condition (providers.length === 1) hides the divider if providers[] includes only "email"
  const hideDivider = !providers.includes("email") || providers.length === 1;

  return (
    <GoogleOAuthProvider clientId={"48252327683-8asdmh85nur7uiunvo17dvgh0h3tpnmv.apps.googleusercontent.com"}>
      <div className="flex min-h-screen w-screen items-center justify-center bg-gray-50">
        <div className="relative w-full max-w-xl rounded-2xl bg-white p-12 shadow-2xl">
          {/* Group login form and social auth together */}
          <div className="flex flex-col">
            <Outlet />

            {isAuthRoute && (
              <>
                <div className={cn("flex items-center gap-x-4", hideDivider && "hidden")}> 
                  <hr className="flex-1 border-gray-200" />
                  <span className="text-base font-medium text-gray-400 p-3">or continue with</span>
                  <hr className="flex-1 border-gray-200" />
                </div>
                <SocialAuth />
              </>
            )}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};
