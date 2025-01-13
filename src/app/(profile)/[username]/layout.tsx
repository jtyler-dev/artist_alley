import React from "react";
import { MainNavigationLayout } from "@/layouts/MainNavigationLayout";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainNavigationLayout>{children}</MainNavigationLayout>;
};

export default ProfileLayout;
