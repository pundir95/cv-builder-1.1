import { t } from "@lingui/macro";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  KeyboardShortcut,
} from "@reactive-resume/ui";
import { useNavigate } from "react-router";

import { useLogout } from "../services/auth";
import { useUser } from "../services/user";
type Props = {
  children: React.ReactNode;
};

export const UserOptions = ({ children }: Props) => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent side="top" align="start" className="w-48">
        {!user?.is_guest_user && (
          <>
            <DropdownMenuItem
              onClick={() => {
                void navigate("/dashboard/settings");
          }}
        >
          {t`Settings`}
          {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
          <KeyboardShortcut>⇧S</KeyboardShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        </>
        )}
        <DropdownMenuItem onClick={() =>{
          localStorage.clear()
          logout()
        }}>
          {t`Logout`}
          {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
          <KeyboardShortcut>⇧Q</KeyboardShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
