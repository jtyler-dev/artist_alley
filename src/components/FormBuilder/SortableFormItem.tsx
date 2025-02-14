"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { Card } from "@/components/ui/card";
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
import { FormFieldSelect } from "./FormFieldSelect";
import { UpdateFieldType } from "./types";
export interface SortableFormItemProps {
  field: FormFieldSchemaType;
  onChange: (id: string, update: UpdateFieldType) => void;
}

export const SortableFormItem = ({
  field,
  onChange,
}: SortableFormItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: field.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <FormFieldSelect
        defaultValue={field.type}
        onChange={(selectedType) => onChange(field.id, { type: selectedType })}
      />

      <div>type: {field.type}</div>
    </div>
  );
};
