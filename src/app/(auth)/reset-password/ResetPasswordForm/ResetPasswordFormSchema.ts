import z from "zod";
import { CREATE_PASSWORD_RULE } from "@/constants/commonSchemaFields";

export const ResetPasswordFormSchema = z.object({
  password: CREATE_PASSWORD_RULE,
});

export type ResetPasswordFormSchemaType = z.infer<
  typeof ResetPasswordFormSchema
>;
