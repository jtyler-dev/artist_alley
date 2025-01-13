import React from "react";
import { MainNavigationLayout } from "@/layouts/MainNavigationLayout";

const StudioLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainNavigationLayout>{children}</MainNavigationLayout>;
};

export default StudioLayout;
