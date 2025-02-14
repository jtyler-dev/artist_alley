import React from "react";
import { FormFieldType } from "@prisma/client";
import {
  Clock,
  Calendar1,
  CircleChevronDown,
  Check,
  CircleDot,
  Hash,
  FileUp,
  AlignLeft,
  AlignCenter,
} from "lucide-react";

export const TEXT = {
  label: "Short Answer",
  value: FormFieldType.TEXT,
  icon: <AlignLeft className="w-4 h-4 mr-2" />,
};

export const TEXTAREA = {
  label: "Long Answer",
  value: FormFieldType.TEXTAREA,
  icon: <AlignCenter className="w-4 h-4 mr-2" />,
};

export const RADIO = {
  label: "Multiple Choice",
  value: FormFieldType.RADIO,
  icon: <CircleDot className="w-4 h-4 mr-2" />,
};

export const SELECT = {
  label: "Dropdown",
  value: FormFieldType.SELECT,
  icon: <CircleChevronDown className="w-4 h-4 mr-2" />,
};

export const CHECKBOX = {
  label: "Check Box",
  value: FormFieldType.CHECKBOX,
  icon: <Check className="w-4 h-4 mr-2" />,
};

export const DATE = {
  label: "Date",
  value: FormFieldType.DATE,
  icon: <Calendar1 className="w-4 h-4 mr-2" />,
};

export const TIME = {
  label: "Time",
  value: FormFieldType.TIME,
  icon: <Clock className="w-4 h-4 mr-2" />,
};

export const NUMBER = {
  label: "Number",
  value: FormFieldType.NUMBER,
  icon: <Hash className="w-4 h-4 mr-2" />,
};

export const FILE = {
  label: "File",
  value: FormFieldType.FILE,
  icon: <FileUp className="w-4 h-4 mr-2" />,
};
