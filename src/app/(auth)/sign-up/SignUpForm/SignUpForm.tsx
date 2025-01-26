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
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignUpFormSchema, SignUpFormSchemaType } from "./SignUpFormSchema";
import { signUpFormAction } from "./actions";
import { useSetFormFieldErrors } from "@/hooks/useSetFormFieldErrors";

export const SignUpForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [formState, formAction, isPending] = useActionState(signUpFormAction, {
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

  useSetFormFieldErrors({
    formState,
    formClearErrors: form.clearErrors,
    formSetError: form.setError,
  });

  return (
    <Form {...form}>
      <form ref={formRef} action={formAction}>
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
          <Button type="submit" disabled={isPending}>
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
};
