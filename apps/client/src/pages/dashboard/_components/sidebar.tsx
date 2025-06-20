import { t } from "@lingui/macro";
import { ChartLine, ChartLineDown, FadersHorizontal, Money, ReadCvLogo, UserCircle } from "@phosphor-icons/react";
import { Button, KeyboardShortcut, Separator } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import useKeyboardShortcut from "use-keyboard-shortcut";

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
        "h-auto justify-start px-4 py-3 relative before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-1/2 before:h-[2px] before:opacity-0 before:duration-300 before:invisible before:bg-[#D6EF3C] before:rounded-full",
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

  useKeyboardShortcut(["shift", "r"], () => {
    void navigate("/dashboard/resumes");
    setOpen?.(false);
  });

  useKeyboardShortcut(["shift", "s"], () => {
    void navigate("/dashboard/settings");
    setOpen?.(false);
  });

  const sidebarItems: SidebarItem[] = [
    {
      path: "/dashboard",
      name: `Dashboard`,
      shortcut: "⇧R",
      icon: <ChartLineDown color="white" />,
    },
    {
      path: "/dashboard/resumes",
      name: `Resumes`,
      shortcut: "⇧R",
      icon: <ReadCvLogo color="white" />,
    },
  
    {
      path: "/dashboard/plan-pricing",
      name: `Plan Pricing`,
      shortcut: "⇧S",
      icon: <Money color="white" />,
    },
    {
      path: "/dashboard/organization-customer",
      name: `Shared Resume List`,
      shortcut: "⇧S",
      icon: <FadersHorizontal color="white" />,
    }, 
    {
      path: "/dashboard/account",
      name: `Account Settings`,
      shortcut: "⇧S",
      icon: <UserCircle color="white" />,
    }, 
 
  ];

  return (
    <div className="flex h-full gap-y-4 bg-blue-500 p-3">
      <div className="ml-12 flex justify-center lg:ml-0">
        <Button asChild size="icon" variant="ghost" className="size-10 p-0">
          <Link to="/">
            {/* <Icon size={24} className="mx-auto hidden lg:block" /> */}
            
          </Link>
        </Button>
      </div>

      {/* <Separator className="opacity-50" /> */}

      <div className="flex gap-x-2 w-full justify-center">
        {sidebarItems.map((item) => (
          <SidebarItem {...item} key={item.path} onClick={() => setOpen?.(false)} />
        ))}
      </div>

      {/* <div className="flex-1" /> */}

      {/* <Separator className="opacity-50" /> */}

      <UserOptions>
        <Button size="lg" variant="ghost" className="justify-start px-3 whitespace-nowrap text-white">
          <UserAvatar size={24} className="mr-3" />
          <span>{user?.name}</span>
        </Button>
      </UserOptions>

      <Copyright className="ml-2" />
    </div>
  );
};
