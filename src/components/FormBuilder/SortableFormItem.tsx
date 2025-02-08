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
import { Input } from "@/components/ui/input";

export interface SortableFormItemProps {
  field: FormFieldSchemaType;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
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
      test
    </div>
  );
};
