"use client";
import React, { useRef, useActionState } from "react";
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
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import {
  NewCommissionTypeFormSchema,
  NewCommissionTypeFormSchemaType,
} from "./NewCommissionTypeFormSchema";
import { newCommissionTypeFormAction } from "./actions";
import { useSetFormFieldErrors } from "@/hooks/useSetFormFieldErrors";

export const NewCommissionTypeForm = () => {
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
      numberOfSlots: 0,
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
      <form ref={formRef} action={formAction}>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Active</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="allowMessages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allow Messages</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numberOfSlots"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Slots</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {commissionAddOnFields.map((field, index) => (
            <div key={field.id}>
              <FormField
                control={form.control}
                name={`commissionAddOns.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`commissionAddOns.${index}.description`}
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
              <FormField
                control={form.control}
                name={`commissionAddOns.${index}.details`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Details</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`commissionAddOns.${index}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`commissionAddOns.${index}.currency`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
        {formState?.message !== "" && (
          <div className="font-medium text-destructive">
            {formState.message}
          </div>
        )}
        <Button
          onClick={() => {
            appendCommissionAddOnFields(
              {
                name: "",
                description: "",
                details: "",
                price: 0,
                currency: "USD",
              },
              { shouldFocus: true }
            );
          }}
        >
          Add Commission Add-On
        </Button>
        <Button type="submit" disabled={isPending}>
          Create Commission Type
        </Button>
      </form>
    </Form>
  );
};
