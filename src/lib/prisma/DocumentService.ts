import { prisma } from "./prisma";
import { PublishedStatus } from "@prisma/client";

export async function getDocumentById(id: string) {
  return await prisma.document.findUnique({
    where: { id },
  });
}

export async function createDocument(data: {
  name: string;
  content?: string;
  richContent?: JSON;
  description?: string;
  status: PublishedStatus;
  authorId: string;
}) {
  return await prisma.document.create({
    data: {
      name: data.name,
      content: data.content,
      richContent: JSON.stringify(data.richContent),
      status: data.status,
      user: {
        connect: { id: data.authorId },
      },
    },
  });
}

export async function updateDocument(
  id: string,
  data: {
    name: string;
    content?: string;
    richContent?: JSON;
    description?: string;
    status: PublishedStatus;
  }
) {
  return await prisma.document.update({
    where: { id },
    data: {
      name: data.name,
      content: data.content,
      richContent: JSON.stringify(data.richContent),
      status: data.status,
    },
  });
}

export async function deleteDocument(id: string) {
  return await prisma.document.delete({
    where: { id },
  });
}

// TODO: add pagination
export async function getDocuments() {
  return await prisma.document.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
