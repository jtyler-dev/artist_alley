import z from "zod";
import { PublishedStatus } from "@prisma/client";

export const DocumentFormSchema = z.object({
  title: z.string().min(1, "Document title is required").trim(),
  content: z.string().min(1, "Document content is required").trim(),
  status: z.enum([PublishedStatus.DRAFT, PublishedStatus.PUBLISHED]).optional(),
});

export type DocumentFormSchemaType = z.infer<typeof DocumentFormSchema>;
