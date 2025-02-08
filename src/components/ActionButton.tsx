"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type ActionButtonOptionConfigType = {
  label: string;
  value: string;
  action: () => void;
};

export interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  defaultAction: string;
  defaultLabel?: string;
  options: ActionButtonOptionConfigType[];
}

export const ActionButton = ({
  defaultAction,
  options,
  defaultLabel = "Select Action",
  className,
  ...buttonProps
}: ActionButtonProps) => {
  const [selectedAction, setSelectedAction] = useState(
    defaultAction
      ? options.find((option) => option.value === defaultAction)
      : null
  );

  const handleOnClick = () => {
    if (selectedAction) {
      selectedAction.action();
    }
  };

  return (
    <div className="flex flex-row items-center">
      <Button
        onClick={handleOnClick}
        className={cn(
          "rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none pl-2 pr-1",
          className
        )}
        {...buttonProps}
      >
        {selectedAction ? selectedAction.label : defaultLabel}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="px-2 rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md"
            {...buttonProps}
          >
            ▼
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setSelectedAction(option)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
