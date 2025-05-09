import { Navigate, Outlet, useSearchParams } from "react-router";
import { useAuthStore } from "@/client/stores/auth";
import { Logo } from "@/client/components/logo";
import { useLogout } from "@/client/services/auth";
import { SignOut, User } from "@phosphor-icons/react";
import { Button } from "@reactive-resume/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@reactive-resume/ui";
import { useNavigate } from "react-router";

const ExperienceHeader = () => {
  const user = useAuthStore((state) => state.user);
  const { logout } = useLogout();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-x-0 top-0 z-20 h-16 bg-[#0D84F3]">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center">
          <Logo size={48} />
        </div>
        {user && (
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-white hover:text-white hover:bg-blue-600"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt={user.first_name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <span className="font-medium">
                    {user.first_name} {user.last_name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {/* <DropdownMenuItem
                  onClick={() => navigate("/dashboard/settings")}
                  className="cursor-pointer"
                >
                  Settings
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="cursor-pointer text-red-600"
                >
                  <SignOut className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export const ExperienceGuard = () => {
  const isLoggedIn = useAuthStore((state) => !!state.user);
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/dashboard";

//   if (isLoggedIn) {
//     return <Navigate to={redirect} />;
//   }

  return (
    <>
      <ExperienceHeader />
      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );
};