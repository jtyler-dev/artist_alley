"use client";
import React, { useRef, useEffect, useActionState } from "react";
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
import { Button } from "@/components/ui/button";
import { TipTap } from "@/components/TipTap";
import {
  DocumentFormSchema,
  DocumentFormSchemaType,
} from "./DocumentFormSchema";
import { DocumentFormState } from "./types";

export interface DocumentFormProps {
  action: (
    prevState: DocumentFormState,
    rawFormData: FormData
  ) => Promise<DocumentFormState>;
}

export const DocumentForm: React.FC<DocumentFormProps> = ({ action }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [formState, formAction, isPending] = useActionState(action, {
    message: undefined,
    fieldErrors: undefined,
  });

  const form = useForm<DocumentFormSchemaType>({
    resolver: zodResolver(DocumentFormSchema),
    defaultValues: {
      title: "",
      content: "",
      ...(formState?.fields ?? {}),
    },
  });

  // useEffect to populate form fields with data from the server
  // if the formState.fieldErrors object is provided
  useEffect(() => {
    if (formState?.fieldErrors) {
      // clear any existing errors
      form.clearErrors();
      // get the keys of the fields that have errors
      const keys = Object.keys(formState.fieldErrors);
      // loop through the keys and set the error message for each field
      keys.forEach((key) => {
        const fieldKey = key as keyof typeof formState.fieldErrors;
        const message =
          formState.fieldErrors![key as keyof typeof formState.fieldErrors];
        form.setError(fieldKey, { message: message![0] });
      });
    }
  }, [form, formState?.fieldErrors, formState]);

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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TipTap {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Save
        </Button>
      </form>
    </Form>
  );
};
