import z from "zod";
import { FormFieldType } from "@prisma/client";

export const FormFieldSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Label is required"),
  type: z.enum([
    FormFieldType.TEXT,
    FormFieldType.TEXTAREA,
    FormFieldType.SELECT,
    FormFieldType.CHECKBOX,
    FormFieldType.RADIO,
    FormFieldType.DATE,
    FormFieldType.MULTI_SELECT,
    FormFieldType.NUMBER,
    FormFieldType.FILE,
  ]),
  options: z.array(z.string()).optional(),
  isRequired: z.boolean().optional(),
});

export const FormBuilderSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  fields: z.array(FormFieldSchema).min(1, "At least one field is required"),
});

export type FormBuilderSchemaType = z.infer<typeof FormBuilderSchema>;
export type FormFieldSchemaType = z.infer<typeof FormFieldSchema>;
