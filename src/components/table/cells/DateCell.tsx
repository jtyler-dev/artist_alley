import React from "react";
import { formatDateTimeRelative, formatTimeAgo } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DateCellProps {
  date: Date;
}

export const DateCell = ({ date }: DateCellProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div>{formatTimeAgo(date)}</div>
        </TooltipTrigger>
        <TooltipContent>
          <div>{formatDateTimeRelative(date)}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
