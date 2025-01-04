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
import { SignUpFormSchema, SignUpFormSchemaType } from "./SignUpFormSchema";
import { signUpFormAction } from "./actions";

export const SignUpForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [formState, formAction] = useActionState(signUpFormAction, {
    message: undefined,
    fieldErrors: undefined,
  });

  const form = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      ...(formState?.fields ?? {}), // Populate form fields with data from the server, if provided
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
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(evt) => {
          // this is a custom submit handler that will call the formAction
          // function with the form data, even if js is disabled
          // we are basically just overriding the default form submission
          // and calling the formAction function instead
          evt.preventDefault();
          form.handleSubmit(() => {
            formAction(new FormData(formRef.current!));
          })(evt);
        }}
      >
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {formState?.message !== "" && (
            <div className="font-medium text-destructive">
              {formState.message}
            </div>
          )}
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </Form>
  );
};
