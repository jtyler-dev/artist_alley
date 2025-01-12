import React from "react";
import { MainNavigationLayout } from "@/layouts/MainNavigationLayout";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainNavigationLayout>{children}</MainNavigationLayout>;
};

export default DashboardLayout;
