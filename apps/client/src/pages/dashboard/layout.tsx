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

            <Sidebar setOpen={setOpen} />
          </SheetContent>
        </Sheet>
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
        <nav className="flex gap-4">
          <a href="#" className="font-semibold hover:underline">TERMS AND CONDITIONS</a>
          <span>|</span>
          <a href="#" className="font-semibold hover:underline">PRIVACY POLICY</a>
          <span>|</span>
          <a href="#" className="font-semibold hover:underline">ACCESSIBILITY</a>
          <span>|</span>
          <a href="#" className="font-semibold hover:underline">CONTACT US</a>
        </nav>
      </footer>
    </div>
  );
};
