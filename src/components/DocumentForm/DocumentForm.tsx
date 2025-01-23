"use client";
import React, { useRef, useEffect, useActionState, useState } from "react";
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
import { TipTap } from "@/components/TipTap";
import {
  DocumentFormSchema,
  DocumentFormSchemaType,
} from "./DocumentFormSchema";
import { PublishedStatus } from "@prisma/client";
import { DocumentFormState } from "./types";
import { ActionButton } from "@/components/ActionButton";

export interface DocumentFormProps {
  action: (
    prevState: DocumentFormState,
    rawFormData: FormData
  ) => Promise<DocumentFormState>;
  onSuccess?: (documentId: string) => void;
  onError?: (message: string) => void;
  defaultPublishedStatus?: PublishedStatus;
}

export const DocumentForm: React.FC<DocumentFormProps> = ({
  action,
  defaultPublishedStatus,
}) => {
  const [publishedStatus, setPublishedStatus] = useState<PublishedStatus>(
    defaultPublishedStatus ?? PublishedStatus.DRAFT
  );
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
      status: publishedStatus,
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
                <div>
                  {/* input from tiptap isnt a native input element, so we have to capture the */}
                  {/* maybe move this directly into the tiptap component? */}
                  <input type="hidden" {...field} />
                  <TipTap value={field.value} onChange={field.onChange} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* Hidden input field for status */}
                <input type="hidden" {...field} value={publishedStatus} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ActionButton
          type="submit"
          disabled={isPending}
          defaultAction={publishedStatus}
          options={[
            {
              label: "Save as Draft",
              value: PublishedStatus.DRAFT,
              action: () => setPublishedStatus(PublishedStatus.DRAFT),
            },
            {
              label: "Save and Publish",
              value: PublishedStatus.PUBLISHED,
              action: () => setPublishedStatus(PublishedStatus.PUBLISHED),
            },
          ]}
        />
      </form>
    </Form>
  );
};
