import { Navigate, Outlet} from "react-router";

import { useUser } from "@/client/services/user";

export const AuthGuard = () => {
  const userData = localStorage.getItem("user");
  const userDataJson = JSON.parse(userData || "{}");
  const role = userDataJson.role;
  
  const { user, loading } = useUser();
  if (loading) return null;

  if (user && (role === "cv_user" || role === "employee")) {
    return <Outlet />;
  }else{
    return <Navigate replace to={`/admin`} />;
  }

  return <Navigate replace to={`/auth/login`} />;
};
