import React from "react";
import { MainNavigationLayout } from "@/layouts/MainNavigationLayout";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainNavigationLayout>{children}</MainNavigationLayout>;
};

export default HomeLayout;
