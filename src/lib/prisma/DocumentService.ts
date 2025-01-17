import { prisma } from "./prisma";
import { PublishedStatus } from "@prisma/client";

export async function getDocumentById(id: string) {
  return await prisma.document.findUnique({
    where: {
      id,
      deletedAt: null,
    },
    include: {
      user: true,
    },
  });
}

export async function getAllDocumentsByUserId(userId: string) {
  return await prisma.document.findMany({
    where: {
      userId,
      deletedAt: null,
    },
  });
}

export async function getDocumentByPublishedStatus(
  userId: string,
  status: PublishedStatus
) {
  return await prisma.document.findMany({
    where: {
      userId,
      status,
      deletedAt: null,
    },
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
  },
  userId: string
) {
  return await prisma.document.update({
    where: { id, userId },
    data: {
      name: data.name,
      content: data.content,
      richContent: JSON.stringify(data.richContent),
      status: data.status,
    },
  });
}

export const deleteDocument = async (id: string, userId: string) => {
  return await prisma.document.update({
    where: { id, userId },
    data: {
      deletedAt: new Date(),
    },
  });
};

export const restoreDocument = async (id: string, userId: string) => {
  return await prisma.document.update({
    where: { id, userId },
    data: {
      deletedAt: null,
    },
  });
};

export async function hardDeleteDocument(userId: string, documentId: string) {
  return await prisma.document.delete({
    where: { id: documentId, userId },
  });
}

// TODO: add pagination
export async function getDocuments(userId: string) {
  return await prisma.document.findMany({
    where: {
      userId,
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
