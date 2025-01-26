import React from "react";
import { LucideIcon } from "lucide-react";
import { Status, statusStyles } from "@/constants/Status";

export interface StatusTagProps {
  status?: Status;
  Icon?: LucideIcon;
  text: string;
  onClick?: () => void;
}

export const StatusTag = ({
  Icon,
  text,
  onClick,
  status = Status.INFO,
}: StatusTagProps) => {
  const { bgColor, textColor } = statusStyles[status];
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium ${bgColor} ${textColor} ${
        onClick ? "cursor-pointer hover:opacity-80" : ""
      }`}
    >
      {Icon && <Icon className={`w-4 h-4 ${textColor}`} />}
      <span>{text}</span>
    </span>
  );
};
