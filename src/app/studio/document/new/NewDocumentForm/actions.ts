"use server";
import { auth } from "@/lib/auth";
import {
  DocumentFormSchema,
  DocumentFormState,
} from "@/components/DocumentForm";
import { createDocument } from "@/lib/prisma/DocumentService";
import { headers } from "next/headers";
import { PublishedStatus } from "@prisma/client";

export async function newDocumentFormAction(
  prevState: DocumentFormState,
  rawFormData: FormData
): Promise<DocumentFormState> {
  console.log("-------newDocumentFormAction-----");

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // if the user is not logged in, return an error message
  if (!session) {
    return {
      message: "You must be logged in to create a document.",
      fieldErrors: undefined,
      fields: {},
    };
  }

  console.log(session);

  // Convert FormData to object
  const formData = Object.fromEntries(rawFormData);

  console.log(formData);
  // then use zods schema to validate the form data on the server
  const parsed = DocumentFormSchema.safeParse(formData);

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

  try {
    const document = await createDocument({
      name: parsed.data.title,
      content: parsed.data.content,
      authorId: session.user.id,
      status: PublishedStatus.DRAFT,
    });

    return {
      message: "Document created successfully.",
      data: {
        documentId: document.id,
      },
      fieldErrors: undefined,
      fields: {},
    };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while creating the document.",
      fieldErrors: undefined,
      fields,
    };
  }
}
