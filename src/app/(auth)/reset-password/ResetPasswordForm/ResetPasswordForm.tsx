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
import {
  ResetPasswordFormSchema,
  ResetPasswordFormSchemaType,
} from "./ResetPasswordFormSchema";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import * as Routes from "@/constants/routes";

export const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<ResetPasswordFormSchemaType>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={async () => {
          setIsLoading(true);
          const formData = form.getValues();
          const { error } = await authClient.resetPassword({
            newPassword: formData.password,
          });

          setIsLoading(false);

          if (error) {
            setError(error?.message);
          } else {
            redirect(Routes.SIGN_IN + "?reset=true");
          }
        }}
      >
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error !== "" && (
            <div className="font-medium text-destructive">{error}</div>
          )}
          <Button type="submit" disabled={isLoading}>
            Set New Password
          </Button>
        </div>
      </form>
    </Form>
  );
};
