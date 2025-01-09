import z from "zod";

export const ForgotPasswordFormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Please enter a valid email",
    }),
});

export type ForgotPasswordFormSchemaType = z.infer<
  typeof ForgotPasswordFormSchema
>;
