import React from "react";
import { SideNav } from "@/components/SideNav";
// import { Header } from "@/components/Header";

export interface MainNavigationLayoutProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
}

export const MainNavigationLayout = ({
  children,
}: MainNavigationLayoutProps) => {
  return (
    <div className="flex flex-row h-full">
      <SideNav />
      <main className="flex-1 gap-4 overflow-auto p-4 w-full">{children}</main>
    </div>
  );
  // return (
  //   <div className="grid h-screen w-full pl-[56px]">
  //     <SideNav />
  //     <div className="flex flex-col">
  //       <Header />
  //       <main className="flex-1 gap-4 overflow-auto p-4">{children}</main>
  //     </div>
  //   </div>
  // );
};
