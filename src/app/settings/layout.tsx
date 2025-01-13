import React from "react";
import { MainNavigationLayout } from "@/layouts/MainNavigationLayout";

const CommissionLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainNavigationLayout>{children}</MainNavigationLayout>;
};

export default CommissionLayout;
