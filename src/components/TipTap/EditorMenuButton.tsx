import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export interface EditorMenuButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel: string;
  tooltip?: string;
  isActive?: boolean;
  isDisabled?: boolean;
}

export const EditorMenuButton = ({
  onClick,
  children,
  ariaLabel,
  tooltip,
  isDisabled = false,
  isActive = false,
}: EditorMenuButtonProps) => {
  const BtnComp = (
    <Button
      className={`p-2 ${isActive ? "bg-violet-500 text-white rounded-md" : ""}`}
      variant={isActive ? "secondary" : "ghost"}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
    >
      {children}
    </Button>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{BtnComp}</TooltipTrigger>
        <TooltipContent side="bottom">{tooltip}</TooltipContent>
      </Tooltip>
    );
  }
  return BtnComp;
};
