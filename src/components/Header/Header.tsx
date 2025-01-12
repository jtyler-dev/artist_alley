"use client";
import React from "react";
import { LogoButton } from "@/components/LogoButton";

export interface HeaderProps {
  children?: React.ReactNode;
  includeLogo?: boolean;
}

export const Header = ({ children, includeLogo = false }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
      {includeLogo && <LogoButton />}
      {children}
    </header>
  );
};
