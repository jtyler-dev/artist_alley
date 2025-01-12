"use client";
import React from "react";
import { Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Routes from "@/constants/routes";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const LogoButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <div className={cn("p-2", className)}>
      <Button
        variant="outline"
        size="icon"
        aria-label="Home"
        onClick={() => router.push(Routes.HOME)}
      >
        <Triangle className="size-5 fill-foreground" />
      </Button>
    </div>
  );
};
