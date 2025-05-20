import { SidebarSimple } from "@phosphor-icons/react";
import { Button, Sheet, SheetClose, SheetContent, SheetTrigger } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { useState } from "react";
import { Navigate, Outlet } from "react-router";

import { Sidebar } from "./components/Sidbar";

export const AdminDashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const userData = localStorage.getItem("user");
  const userDataJson = JSON.parse(userData || "{}");
  const role = userDataJson.role;
  if(role !== "admin"){
    return <Navigate replace to={`/`} />
  }

  return (
    <div>
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 pb-0 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="bg-background">
              <SidebarSimple />
            </Button>
          </SheetTrigger>

          <SheetContent showClose={false} side="left" className="focus-visible:outline-none">
            <SheetClose asChild className="absolute left-4 top-4">
              <Button size="icon" variant="ghost">
                <SidebarSimple />
              </Button>
            </SheetClose>

            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <motion.div
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[240px]"
      >
        <div className="flex h-screen">
          <Sidebar />
        </div>
      </motion.div>

      <main className="mx-6 my-4 lg:mx-8 lg:pl-[200px]">
        <Outlet />
      </main>
    </div>
  );
};
