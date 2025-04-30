import { Navigate, Outlet, useSearchParams } from "react-router";
import { useAuthStore } from "@/client/stores/auth";
import { Logo } from "@/client/components/logo";

const ExperienceHeader = () => (
  <div className="fixed inset-x-0 top-0 z-20 h-16 bg-[#0D84F3]">
    <div className="flex h-full items-center justify-between px-4">
      <div className="flex items-center">
        <Logo size={48} />
      </div>
    </div>
  </div>
);

export const ExperienceGuard = () => {
  const isLoggedIn = useAuthStore((state) => !!state.user);
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/dashboard";

  if (isLoggedIn) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <ExperienceHeader />
      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );
};