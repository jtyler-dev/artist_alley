export enum Status {
  CRITICAL = "CRITICAL",
  WARNING = "WARNING",
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  PENDING = "PENDING",
  ERROR = "ERROR",
}

export const statusStyles = {
  [Status.CRITICAL]: {
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
  [Status.WARNING]: {
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  [Status.INFO]: {
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
  [Status.SUCCESS]: {
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  [Status.PENDING]: {
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
  },
  [Status.ERROR]: {
    bgColor: "bg-orange-100",
    textColor: "text-orange-800",
  },
};
