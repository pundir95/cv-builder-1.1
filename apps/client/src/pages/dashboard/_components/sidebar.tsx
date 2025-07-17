import { t } from "@lingui/macro";
import { ChartLine, ChartLineDown, CheckCircle, FadersHorizontal, Money, ReadCvLogo, UserCircle, X } from "@phosphor-icons/react";
import { Button, KeyboardShortcut, Separator } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import useKeyboardShortcut from "use-keyboard-shortcut";
import React, { useState } from "react";

import { Copyright } from "@/client/components/copyright";
import { Icon } from "@/client/components/icon";
import { UserAvatar } from "@/client/components/user-avatar";
import { UserOptions } from "@/client/components/user-options";
import { useUser } from "@/client/services/user";

type Props = {
  className?: string;
};

const ActiveIndicator = ({ className }: Props) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className={cn(
      "size-1.5 animate-pulse rounded-full bg-info shadow-[0_0_12px] shadow-info",
      className,
    )}
  />
);

type SidebarItem = {
  path: string;
  name: string;
  shortcut?: string;
  icon: React.ReactNode;
};

type SidebarItemProps = SidebarItem & {
  onClick?: () => void;
};

const SidebarItem = ({ path, name, shortcut, icon, onClick }: SidebarItemProps) => {
  const isActive = useLocation().pathname === path;

  return (
    <Button
      asChild
      size="lg"
      variant="ghost"
      className={cn(
        "h-auto justify-start px-4 py-3 relative before:content-[''] before:absolute before:bottom-0 lg:before:left-1/2 translate-x-0 lg:before:-translate-x-1/2 before:w-1/2 before:h-[2px] before:opacity-0 before:duration-300 before:invisible before:bg-[#D6EF3C] before:rounded-full",
        isActive && "pointer-events-none before:opacity-1 before:visible text-secondary-foreground",
      )}
      onClick={onClick}
    >
      <Link to={path}>
        <div className="mr-3">{icon}</div>
        <span className="text-white">{name}</span>
        {!isActive && <KeyboardShortcut className="ml-auto">{shortcut}</KeyboardShortcut>}
        {/* {isActive && <ActiveIndicator className="ml-auto" />} */}
      </Link>
    </Button>
  );
};

type SidebarProps = {
  setOpen?: (open: boolean) => void;
};

export const Sidebar = ({ setOpen }: SidebarProps) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useKeyboardShortcut(["shift", "r"], () => {
    void navigate("/dashboard/resumes");
    setOpen?.(false);
    setMobileOpen(false);
  });

  useKeyboardShortcut(["shift", "s"], () => {
    void navigate("/dashboard/settings");
    setOpen?.(false);
    setMobileOpen(false);
  });

  const sidebarItems: SidebarItem[] = [
    {
      path: "/dashboard",
      name: `Dashboard`,
      shortcut: "⇧R",
      icon: <ChartLineDown color="white" size={24} />,
    },
    {
      path: "/dashboard/resumes",
      name: `Resumes`,
      shortcut: "⇧R",
      icon: <ReadCvLogo color="white" />,
    },
    {
      path: "/onboard/upload-resume?true=resume-checker",
      name: `Resumes Checker`,
      shortcut: "⇧R",
      icon: <CheckCircle color="white" size={24} />,
    },
    {
      path: "/dashboard/plan-pricing",
      name: `Plan Pricing`,
      shortcut: "⇧S",
      icon: <Money color="white" size={24} />,
    },
    {
      path: "/dashboard/organization-customer",
      name: `Shared Resume List`,
      shortcut: "⇧S",
      icon: <FadersHorizontal color="white" size={24} />,
    },
    {
      path: "/dashboard/account",
      name: `Account Settings`,
      shortcut: "⇧S",
      icon: <UserCircle color="white" size={24} />,
    },

  ];

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded bg-blue-600 text-white shadow-md"
        onClick={() => setMobileOpen((open) => !open)}
        aria-label="Open sidebar"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
      </button>

      {/* Profile icon */}
      <div className="lg:hidden">
        <UserOptions>
          <Button size="lg" variant="ghost" className="justify-start px-3 whitespace-nowrap text-white">
            <UserAvatar size={24} />
            <span>{user?.name}</span>
          </Button>
        </UserOptions>
      </div>

      {/* Sidebar overlay for mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity lg:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar itself */}
      <nav
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-blue-500 p-3 flex flex-col gap-y-4 transition-transform duration-300 lg:static lg:w-auto lg:h-full lg:flex-row lg:items-center lg:bg-blue-500 lg:p-3 lg:gap-y-4",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
        style={{ minWidth: "200px" }}
      >
        {/* Close button for mobile sidebar */}
        <button
          className="absolute top-4 right-4 z-50 p-2 rounded bg-blue-600 text-white shadow-md lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>
        <div className="ml-4 flex justify-center lg:ml-0">
          <Button asChild size="icon" variant="ghost" className="size-10 p-0">
            <Link to="/">
              {/* <Icon size={24} className="mx-auto hidden lg:block" /> */}
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-y-2 w-full justify-center lg:flex-row lg:gap-x-2 lg:gap-y-0">
          {sidebarItems.map((item) => (
            <SidebarItem {...item} key={item.path} onClick={() => { setOpen?.(false); setMobileOpen(false); }} />
          ))}
          <div className="lg:block hidden">
            <UserOptions>
              <Button size="lg" variant="ghost" className="justify-start px-3 whitespace-nowrap text-white">
                <UserAvatar size={24} className="mr-3" />
                <span>{user?.name}</span>
              </Button>
            </UserOptions>

          </div>

        </div>

        <Copyright className="ml-2" />
      </nav>
    </>
  );
};
