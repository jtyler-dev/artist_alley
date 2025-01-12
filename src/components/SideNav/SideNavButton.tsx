"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export interface SideNavButtonProps {
  ariaLabel: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  tooltip: string;
  route: string;
  className?: string;
  isDisabled?: boolean;
}

export const SideNavButton = ({
  ariaLabel,
  Icon,
  tooltip,
  route,
  className,
  isDisabled = false,
}: SideNavButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(route);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          disabled={isDisabled}
          variant="ghost"
          size="icon"
          className={cn("rounded-lg", className)}
          aria-label={ariaLabel}
          onClick={handleClick}
        >
          <Icon className="size-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
};
