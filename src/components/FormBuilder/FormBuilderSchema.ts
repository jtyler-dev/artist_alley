import z from "zod";
import { FormFieldType } from "@prisma/client";

export const FormFieldSchema = z
  .object({
    id: z.string(),
    question: z.string().min(1, "Question is required"),
    description: z.string().optional(),
    type: z.enum([
      FormFieldType.TEXT,
      FormFieldType.TEXTAREA,
      FormFieldType.SELECT,
      FormFieldType.CHECKBOX,
      FormFieldType.RADIO,
      FormFieldType.DATE,
      FormFieldType.TIME,
      FormFieldType.MULTI_SELECT,
      FormFieldType.NUMBER,
      FormFieldType.FILE,
    ]),
    options: z.array(z.string()).optional(),
    isRequired: z.boolean().optional(),
  })
  .refine(
    (data) => {
      // refine the definition to ensure that options are required for certain field types
      // even though it is optional in the schema. This is because the options are required
      // for the field to be valid
      if (
        data.type === FormFieldType.SELECT ||
        data.type === FormFieldType.CHECKBOX ||
        data.type === FormFieldType.RADIO ||
        data.type === FormFieldType.MULTI_SELECT
      ) {
        return (
          data.options && Array.isArray(data.options) && data.options.length > 0
        );
      }

      return true;
    },
    {
      message: "Options are required for this field type",
      path: ["options"],
    }
  );

export const FormBuilderSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  fields: z.array(FormFieldSchema).min(1, "At least one field is required"),
});

export type FormBuilderSchemaType = z.infer<typeof FormBuilderSchema>;
export type FormFieldSchemaType = z.infer<typeof FormFieldSchema>;
