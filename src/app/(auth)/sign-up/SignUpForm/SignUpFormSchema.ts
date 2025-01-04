import z from "zod";
import {
  ALPHA_NUMERIC_REFINE,
  CREATE_PASSWORD_RULE,
} from "@/constants/commonSchemaFields";

export const SignUpFormSchema = z.object({
  email: z.string().email({
    message: "Must be a valid email",
  }),
  password: CREATE_PASSWORD_RULE,
  username: z
    .string()
    .min(4, {
      message: "Must be at least 4 characters",
    })
    .max(15, {
      message: "Must be less than 15 characters",
    })
    .refine(ALPHA_NUMERIC_REFINE, "Must be alphanumeric and contain no spaces"),
});

export type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;
