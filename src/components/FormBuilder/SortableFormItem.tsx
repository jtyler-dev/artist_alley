"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { FormFieldSchemaType } from "./FormBuilderSchema";
import { CSS } from "@dnd-kit/utilities";
import { FormFieldType } from "@prisma/client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FormFieldSelect } from "./FormFieldSelect";
import { UpdateFieldType } from "./types";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
export interface SortableFormItemProps {
  field: FormFieldSchemaType;
  onChange?: (id: string, update: UpdateFieldType) => void;
  onCopy?: (field: FormFieldSchemaType) => void;
}

export const SortableFormItem = ({
  field,
  onChange,
  onCopy,
}: SortableFormItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: field.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
       w-full
       h-[100px]
       max-h-[100]
       rounded-md 
       flex 
       flex-col
       bg-gray-400
        opacity-60
      border-gray-500
       "
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded-md border-solid border border-gray-200 bg-white shadow-sm"
    >
      <div className="p-4">
        <FormFieldSelect
          defaultValue={field.type}
          onChange={(selectedType) =>
            onChange && onChange(field.id, { type: selectedType })
          }
        />
        <div className="flex items-center mt-2">
          <Switch
            checked={field.isRequired}
            onCheckedChange={(checked) =>
              onChange && onChange(field.id, { isRequired: checked })
            }
          />
          <span className="ml-2" onClick={() => console.log("here")}>
            Required
          </span>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => onCopy && onCopy(field)}
              size={"icon"}
            >
              <Copy />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Copy</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
