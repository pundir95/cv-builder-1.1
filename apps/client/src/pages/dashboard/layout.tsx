import { SidebarSimple } from "@phosphor-icons/react";
import { Button, Sheet, SheetClose, SheetContent, SheetTrigger } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { useState } from "react";
import { Outlet } from "react-router";

import { Sidebar } from "./_components/sidebar";

export const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 pb-4 lg:pb-0 lg:hidden lg:bg-transparent bg-blue-600">
        <Button size="icon" variant="ghost" className="bg-background">
              <SidebarSimple />
        </Button>

          


            <Sidebar setOpen={setOpen} />
          
      </div>

      <motion.div
        initial={{ y: -70 }}
        animate={{ y: 0 }}
        className="hidden lg:fixed w-full top-0 left-0 lg:z-50 lg:flex "
      >
        <div className="w-full">
          <Sidebar />
        </div>
      </motion.div>

      <main className="flex-1 mx-6 my-4 lg:mx-8 lg:pt-[68px]">
        <Outlet />
      </main>

      <footer className="w-full flex justify-center items-center py-4 border-t text-xs text-neutral-900">
        <nav className="flex flex-wrap justify-center gap-2 md:gap-4 px-4">
          <a href="#" className="font-semibold hover:underline whitespace-nowrap">TERMS AND CONDITIONS</a>
          <span className="hidden md:inline">|</span>
          <a href="#" className="font-semibold hover:underline whitespace-nowrap">PRIVACY POLICY</a>
          <span className="hidden md:inline">|</span>
          <a href="#" className="font-semibold hover:underline whitespace-nowrap">ACCESSIBILITY</a>
          <span className="hidden md:inline">|</span>
          <a href="#" className="font-semibold hover:underline whitespace-nowrap">CONTACT US</a>
        </nav>
      </footer>
    </div>
  );
};
