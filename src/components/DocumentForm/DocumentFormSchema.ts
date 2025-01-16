import z from "zod";
import { PublishedStatus } from "@prisma/client";

export const DocumentFormSchema = z.object({
  title: z.string({ required_error: "Document title is required" }),
  content: z.string({ required_error: "Document content is required" }),
  status: z.enum([PublishedStatus.DRAFT, PublishedStatus.PUBLISHED]),
});

export type DocumentFormSchemaType = z.infer<typeof DocumentFormSchema>;
