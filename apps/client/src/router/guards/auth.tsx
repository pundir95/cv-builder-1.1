import { Navigate, Outlet, useLocation} from "react-router";

import { useUser } from "@/client/services/user";

export const AuthGuard = () => {
  const location = useLocation();
  const userData = localStorage.getItem("user");
  const userDataJson = JSON.parse(userData || "{}");
  const role = userDataJson.role;
  const refId = location.search.includes("ref_id");
  const refIdValue = location.search.split("ref_id=")[1];
  console.log(refId,"refId")
  console.log(refIdValue,"refIdValue")

  const { user, loading } = useUser();
  if (loading) return null;

  if (user && (role === "cv_user" || role === "employee") || refId) {
    return <Outlet />;
  }else{
    return <Navigate replace to={`/admin`} />;
  }

  return <Navigate replace to={`/auth/login`} />;
};
