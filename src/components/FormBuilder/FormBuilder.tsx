"use client";
import React, { useRef, useActionState, useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormBuilderSchema,
  type FormBuilderSchemaType,
  type FormFieldSchemaType,
} from "./FormBuilderSchema";
import { FormBuilderAction } from "./actions";
import { useSetFormFieldErrors } from "@/hooks/useSetFormFieldErrors";
import { v4 as uuidv4 } from "uuid";
import { FormFieldType } from "@prisma/client";
import z from "zod";
import { SortableFormItem } from "./SortableFormItem";

export interface FormBuilderProps {
  defaultValues?: FormBuilderSchemaType;
  isEditing?: boolean;
}

export const FormBuilder = ({
  defaultValues,
  isEditing = false,
}: FormBuilderProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, formAction, isPending] = useActionState(FormBuilderAction, {
    message: undefined,
    fieldErrors: undefined,
  });

  const form = useForm<FormBuilderSchemaType>({
    resolver: zodResolver(FormBuilderSchema),
    defaultValues: defaultValues ?? {
      title: "",
      description: "",
      fields: [],
      ...(formState?.fields ?? {}),
    },
  });

  useSetFormFieldErrors({
    formState,
    formClearErrors: form.clearErrors,
    formSetError: form.setError,
  });

  // Add a new field to the form
  const fields = form.watch("fields");
  const addField = (type: FormFieldType) => {
    form.setValue("fields", [
      ...fields,
      {
        id: uuidv4(),
        label: "",
        type,
        options: [],
        isRequired: false,
      },
    ]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex: number = fields.findIndex(
      (f: FormFieldSchemaType) => f.id === active.id
    );

    const newIndex: number = fields.findIndex(
      (f: FormFieldSchemaType) => f.id === over?.id
    );

    const newFields = arrayMove(fields, oldIndex, newIndex);
    form.setValue("fields", newFields);
  };

  return (
    <Form {...form}>
      <form ref={formRef} action={formAction}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="button" onClick={() => addField("TEXT")}>
          Add Text Field
        </button>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={fields.map((f) => f.id)}>
            {fields.map((field, index) => {
              return <SortableFormItem key={field.id} field={field} />;
              // // return (
              // //   <FormField
              // //     key={field.id}
              // //     control={form.control}
              // //     name={`fields.${index}.label`}
              // //     render={({ field }) => (
              // //       <FormItem>
              // //         <FormLabel>Field Label</FormLabel>
              // //         <FormControl>
              // //           <Input {...field} />
              // //         </FormControl>
              // //         <FormMessage />
              // //       </FormItem>
              // //     )}
              // //   />
              // );
            })}
          </SortableContext>
        </DndContext>
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
};
