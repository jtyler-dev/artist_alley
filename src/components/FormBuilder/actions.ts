"use server";
import { prisma } from "@/lib/prisma/prisma";
import { FormBuilderSchema } from "./FormBuilderSchema";
import { FormBuilderActionFormState } from "./types";

export async function FormBuilderAction(
  prevState: FormBuilderActionFormState,
  rawFormData: FormData
): Promise<FormBuilderActionFormState> {
  console.log("--------------Here-------------------");
  console.log("rawFormData", rawFormData);
  // Convert FormData to object
  const formData = Object.fromEntries(rawFormData);
  // then use zods schema to validate the form data on the server
  const parsed = FormBuilderSchema.safeParse(formData);

  console.log("---------------------------------");
  console.log("parsed", parsed);
  console.log("error: ", parsed?.error?.flatten().fieldErrors);
  console.log("---------------------------------");

  // get the fields from the form data
  const fields: Record<string, string> = {};
  for (const key of Object.keys(formData)) {
    fields[key] = formData[key].toString();
  }

  // if the form data is invalid, return an error message
  if (!parsed.success) {
    return {
      message: undefined,
      fieldErrors: parsed.error.flatten().fieldErrors,
      fields,
    };
  }

  return new Promise((resolve, reject) => {});
}
