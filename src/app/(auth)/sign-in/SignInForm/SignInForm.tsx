"use client";
import React, { useRef, useState } from "react";
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
import { SignInFormSchema, SignInFormSchemaType } from "./SignInFormSchema";
import { authClient } from "@/lib/auth-client";
import * as ROUTES from "@/constants/routes";
import { redirect } from "next/navigation";

export const SignInForm = () => {
  // this is doing a simple signin form
  // so we dont need to do any complex server action
  // so we can just let the form handle the action
  // and the better-auth client will handle the rest
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<SignInFormSchemaType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={async () => {
          const formData = form.getValues();
          await authClient.signIn.username(
            {
              username: formData.username,
              password: formData.password,
            },
            {
              onSuccess: () => {
                redirect(ROUTES.DASHBOARD);
              },
              onRequest: () => {
                setIsLoading(true);
              },
              onResponse: () => {
                setIsLoading(false);
              },
              onError: (ctx) => {
                console.log("Sign in Error: ", ctx.error);
                setError(ctx.error.message);
              },
            }
          );
        }}
      >
        <div className="flex flex-col gap-4">
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
          {error !== "" && (
            <div className="font-medium text-destructive">{error}</div>
          )}
          <Button type="submit" disabled={isLoading}>
            Sign In
          </Button>
        </div>
      </form>
    </Form>
  );
};
