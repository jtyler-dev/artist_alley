// TODO: split this into files if it gets too big
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

// STYLES / CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// HELPERS
export const capitalizeFirstLetter = (str: string) => {
  if (typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// TIME

export const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

/**
 * Format a date as a string
 * @param date - The date to format
 * @returns The formatted date, relative to the users time zone
 */
export const formatDateRelative = (date: Date) => {
  const localDate = new Date(date); // Automatically adjusts to local time zone
  return format(localDate, "MMM d, yyyy");
};

export const formatDateTimeRelative = (date: Date) => {
  const localDate = new Date(date); // Automatically adjusts to local time zone
  return format(localDate, "MMMM d, yyyy h:mm a");
};

export const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const givenDate = new Date(date);

  // Check if the date is within 24 hours
  const isWithin24Hours =
    now.getTime() - givenDate.getTime() < MILLISECONDS_IN_A_DAY;

  if (isWithin24Hours) {
    // Display relative time (e.g., "5 minutes ago")
    return `${formatDistanceToNow(givenDate, { addSuffix: true })}`;
  } else {
    // Display formatted timestamp (e.g., "Jan, 1, 2025 3:00 PM")
    return format(givenDate, "MMM d, yyyy");
  }
};
