"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

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
      <Button onClick={handleOnClick} {...buttonProps}>
        {selectedAction ? selectedAction.label : defaultLabel}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="px-2">
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
