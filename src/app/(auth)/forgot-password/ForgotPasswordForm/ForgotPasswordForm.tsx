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
  ForgotPasswordFormSchema,
  ForgotPasswordFormSchemaType,
} from "./ForgotPasswordFormSchema";
import { authClient } from "@/lib/auth-client";
import * as ROUTES from "@/constants/routes";
import { toast } from "sonner";

export const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<ForgotPasswordFormSchemaType>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={async () => {
          setIsLoading(true);
          const formData = form.getValues();
          // forget password will not return an error if the email is not found
          // to prevent email enumeration attacks
          // so if we get an error back, its an error and not just an email not found
          const { error } = await authClient.forgetPassword({
            email: formData.email,
            redirectTo: ROUTES.RESET_PASSWORD,
          });

          if (error) {
            setError(error?.message);
          }

          setIsLoading(false);
          form.resetField("email");
          toast.success("Password reset email sent!");
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

          {error !== "" && (
            <div className="font-medium text-destructive">{error}</div>
          )}
          <Button type="submit" disabled={isLoading}>
            Request Password Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};
