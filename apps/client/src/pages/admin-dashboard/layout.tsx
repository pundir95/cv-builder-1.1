import { useState } from "react";
import { Navigate, Outlet } from "react-router";
import { motion } from "framer-motion";

import { Sidebar } from "./components/Sidbar";

export const AdminDashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const userData = localStorage.getItem("user");
  const userDataJson = JSON.parse(userData || "{}");
  const role = userDataJson.role;
  console.log(role, "rolew12");
  if(role !== "admin"){
    return <Navigate replace to={`/auth/login`} />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <motion.div
        initial={{ y: -70 }}
        animate={{ y: 0 }}
        className="w-full top-0 left-0 z-50 flex"
      >
        <div className="w-full">
          <Sidebar setOpen={setOpen} />
        </div>
      </motion.div>

      <main className="flex-1 mx-6 my-4 lg:mx-8 lg:pt-[68px]">
        <Outlet />
      </main>
    </div>
  );
};
