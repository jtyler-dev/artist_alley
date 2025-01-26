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
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  NewCommissionTypeFormSchema,
  NewCommissionTypeFormSchemaType,
} from "./NewCommissionTypeFormSchema";
import { newCommissionTypeFormAction } from "./actions";
import { useSetFormFieldErrors } from "@/hooks/useSetFormFieldErrors";

// useFieldArray -> add dynamic form fields
export interface NewCommissionTypeFormProps {}

export const NewCommissionTypeForm: React.FC<
  NewCommissionTypeFormProps
> = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, formAction, isPending] = useActionState(
    newCommissionTypeFormAction,
    {
      message: undefined,
      fieldErrors: undefined,
    }
  );

  const form = useForm<NewCommissionTypeFormSchemaType>({
    resolver: zodResolver(NewCommissionTypeFormSchema),
    defaultValues: {
      name: "",
      description: "",
      details: "",
      price: 0,
      currency: "USD",
      isActive: false,
      allowMessages: false,
      numberOfSlots: null,
      commissionAddOns: [],
      ...(formState?.fields ?? {}), // Populate form fields with data from the server, if provided
    },
  });

  // useEffect to populate form fields with data from the server
  // if the formState.fieldErrors object is provided
  useSetFormFieldErrors({
    formState,
    formClearErrors: form.clearErrors,
    formSetError: form.setError,
  });

  // setup field array for commissionAddOns
  const { fields: commissionAddOnFields, append: appendCommissionAddOnFields } =
    useFieldArray({
      name: "commissionAddOns",
      control: form.control,
    });

  return (
    <Form {...form}>
      <form ref={formRef} action={formAction}></form>
    </Form>
  );
};
