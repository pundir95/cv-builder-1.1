import { t } from "@lingui/macro";
import { ChartLine, Users, Notepad, CurrencyDollar, FileText, X } from "@phosphor-icons/react";
import { Button, KeyboardShortcut } from "@reactive-resume/ui";
import { UserAvatar } from "@/client/components/user-avatar";
import { UserOptions } from "@/client/components/user-options";
import { cn } from "@reactive-resume/utils";
import { Link, useLocation } from "react-router";
import React, { useState } from "react";

type SidebarItem = {
  path: string;
  name: string;
  icon: React.ReactNode;
  shortcut?: string;
};

type SidebarItemProps = SidebarItem & {
  onClick?: () => void;
};

const NavItem = ({ path, name, icon, shortcut, onClick }: SidebarItemProps) => {
  const isActive = useLocation().pathname === path;

  return (
    <Button
      asChild
      size="lg"
      variant="ghost"
      className={cn(
        "h-auto justify-start px-0 xl:px-4 py-3 relative before:content-[''] before:absolute before:bottom-0 lg:before:left-1/2 translate-x-0 lg:before:-translate-x-1/2 before:w-1/2 before:h-[2px] before:opacity-0 before:duration-300 before:invisible before:bg-[#D6EF3C] before:rounded-full",
        isActive && "pointer-events-none before:opacity-1 before:visible text-secondary-foreground",
      )}
      onClick={onClick}
    >
      <Link to={path}>
        <div className="mr-3">{icon}</div>
        <span className="text-white">{name}</span>
        {!isActive && shortcut && <KeyboardShortcut className="ml-auto">{shortcut}</KeyboardShortcut>}
      </Link>
    </Button>
  );
};

type SidebarProps = {
  setOpen?: (open: boolean) => void;
};

export const Sidebar = ({ setOpen }: SidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems: SidebarItem[] = [
    { path: "/admin", name: `Dashboard`, icon: <ChartLine color="white" size={24} /> },
    { path: "/admin/users", name: `Users`, icon: <Users color="white" size={24} /> },
    { path: "/admin/templates", name: `Template`, icon: <Notepad color="white" size={24} /> },
    { path: "/admin/resume-checker", name: `Resume Checker`, icon: <FileText color="white" size={24} /> },
    { path: "/admin/pricing", name: `Pricing and Plans`, icon: <CurrencyDollar color="white" size={24} /> },
  ];

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded bg-blue-600 text-white shadow-md"
        onClick={() => setMobileOpen((open) => !open)}
        aria-label="Open navigation"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
      </button>

      {/* Overlay for mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity lg:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
      />

      {/* Top navbar (acts as sidebar on mobile) */}
      <nav
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-blue-500 p-3 flex flex-col gap-y-4 transition-transform duration-300 lg:static lg:w-auto lg:h-auto lg:flex-row lg:items-center lg:bg-blue-500 lg:p-3",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        {/* Close on mobile */}
        <button
          className="absolute top-4 right-4 z-50 p-2 rounded bg-blue-600 text-white shadow-md lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col gap-y-2 w-full justify-center lg:flex-row lg:gap-x-2 lg:gap-y-0">
          {menuItems.map((item) => (
            <NavItem key={item.path} {...item} onClick={() => { setOpen?.(false); setMobileOpen(false); }} />
          ))}
        </div>

        <div className="lg:block hidden ml-auto">
          <UserOptions>
            <Button size="lg" variant="ghost" className="justify-start px-3 whitespace-nowrap text-white">
              <UserAvatar size={24} className="mr-3" />
              <span>{t`Dashboard`}</span>
            </Button>
          </UserOptions>
        </div>
      </nav>
    </>
  );
};