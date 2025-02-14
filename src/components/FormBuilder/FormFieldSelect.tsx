import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectSeparator,
} from "@/components/ui/select";
import { FormFieldType } from "@prisma/client";
import * as FieldDisplayDef from "./fieldDisplayDefinitions";

const OptionValues = [
  [FieldDisplayDef.TEXT, FieldDisplayDef.TEXTAREA],
  [FieldDisplayDef.RADIO, FieldDisplayDef.SELECT, FieldDisplayDef.CHECKBOX],
  [FieldDisplayDef.DATE, FieldDisplayDef.TIME, FieldDisplayDef.NUMBER],
  [FieldDisplayDef.FILE],
];

export interface FormFieldSelectProps {
  defaultValue?: FormFieldType;
  onChange?: (value: FormFieldType) => void;
}

export const FormFieldSelect = ({
  defaultValue,
  onChange,
}: FormFieldSelectProps) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select an Option" />
      </SelectTrigger>
      <SelectContent>
        {OptionValues.map((options, idx) => (
          <SelectGroup key={idx}>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center flex-row">
                  {option.icon}
                  {option.label}
                </div>
              </SelectItem>
            ))}
            {idx < OptionValues.length - 1 && <SelectSeparator />}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};
