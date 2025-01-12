"use client";
import React from "react";
import {
  // LifeBuoy,
  Settings2,
  SquareUser,
  House,
  LibraryBig,
  LayoutDashboard,
  User,
  UserCog,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SideNavButton } from "./SideNavButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import * as Routes from "@/constants/routes";
import { LogoButton } from "@/components/LogoButton";
import { authClient } from "@/lib/auth-client";

export const SideNav = () => {
  const router = useRouter();
  const session = authClient.useSession();
  authClient.signOut();

  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
      <LogoButton className="border-b p-2" />
      <nav className="grid gap-1 p-2">
        <SideNavButton
          ariaLabel="Home"
          Icon={House}
          tooltip="Home"
          route={Routes.HOME}
        />
        <SideNavButton
          ariaLabel="Dashboard"
          Icon={LayoutDashboard}
          tooltip="Dashboard"
          route={Routes.DASHBOARD}
        />
        <SideNavButton
          ariaLabel="Studio"
          Icon={LibraryBig}
          tooltip="Studio"
          route={Routes.STUDIO}
        />
        <SideNavButton
          ariaLabel="Settings"
          Icon={Settings2}
          tooltip="Settings"
          route={Routes.SETTINGS}
        />
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        {/* <SideNavButton
          Icon={LifeBuoy}
          tooltip="Help"
          route={Routes.HELP}
          ariaLabel="Help"
          className="mt-auto"
        /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label={"Account"}
            >
              <SquareUser className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right">
            <DropdownMenuItem
              aria-label="My Profile"
              onSelect={() => router.push(`/${session.data?.user?.username}`)}
              className="h-10"
            >
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              aria-label="Account Settings"
              onSelect={() => router.push(Routes.SETTINGS)}
              className="h-10"
            >
              <UserCog className="mr-2 h-4 w-4" />
              <span>Account Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              aria-label="Sign out"
              onSelect={async () =>
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => router.push(Routes.SIGN_IN),
                  },
                })
              }
              className="h-10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </aside>
  );
};
