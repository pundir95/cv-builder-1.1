import { t } from "@lingui/macro";
import { ChartLine, Users, Notepad, CurrencyDollar, Gear } from "@phosphor-icons/react";
import { Button } from "@reactive-resume/ui";
import { UserAvatar } from "@/client/components/user-avatar";
import { UserOptions } from "@/client/components/user-options";
import { cn } from "@reactive-resume/utils";
import { Link, useLocation } from "react-router";

export const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      icon: <ChartLine size={20} />,
      label: `Dashboard`,
      path: "/admin"
    },
    {
      icon: <Users size={20} />,
      label: `Users`,
      path: "/admin/users"
    },
    {
      icon: <Notepad size={20} />,
      label: `Template`,
      path: "/admin/templates"
    },
    {
      icon: <CurrencyDollar size={20} />,
      label: `Pricing and Plans`,
      path: "/admin/pricing"
    },
    {
      icon: <Gear size={20} />,
      label: `Settings`, 
      path: "/admin-dashboard/settings"
    }
  ];

  return (
    <div className="w-[240px] bg-blue-500 text-white p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{t`Dashboard`}</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "p-2 rounded cursor-pointer flex items-center gap-2 transition-colors",
                  location.pathname === item.path 
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-600"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <UserOptions>
        <Button size="icon" variant="ghost" className="rounded-full">
          <UserAvatar size={28} />
        </Button>
      </UserOptions>
    </div>
  );
};