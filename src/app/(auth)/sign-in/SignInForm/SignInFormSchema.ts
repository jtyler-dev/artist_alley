import z from "zod";

export const SignInFormSchema = z.object({
  username: z
    .string({
      required_error: "User name is required",
    })
    .min(1, {
      message: "Please enter your user name",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, {
      message: "Please enter your password",
    }),
});

export type SignInFormSchemaType = z.infer<typeof SignInFormSchema>;
