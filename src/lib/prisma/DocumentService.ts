import { prisma } from "./prisma";
import { PublishedStatus } from "@prisma/client";
import { DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER } from "./constants";

// get document by id
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

/**
 * Prisma query to get all documents by a given user id.
 * If itemsPerPage is not provided, it will return all documents.
 * If paginationCursor is provided, it will return the next page of documents.
 *
 *
 * @param params - The parameters for the query
 * @param params.userId - The user ID to filter documents
 * @param params.paginationCursor - The cursor to paginate the results (ID of the last fetched item)
 * @param params.itemsPerPage - The number of items per page (default is 50)
 * @param params.sortField - The field to sort by, defaults to "createdAt"
 * @param params.sortOrder - The order to sort by, defaults to "desc"
 * @returns The paginated list of documents
 */
export async function getAllDocumentsByUserId({
  userId,
  paginationCursor,
  itemsPerPage,
  sortField = DEFAULT_SORT_FIELD,
  sortOrder = DEFAULT_SORT_ORDER,
}: {
  userId: string;
  paginationCursor?: string;
  itemsPerPage?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
}) {
  return await prisma.document.findMany({
    where: {
      userId,
      deletedAt: null,
    },
    orderBy: {
      [sortField]: sortOrder,
    },
    ...(itemsPerPage && { take: itemsPerPage }),
    ...(paginationCursor && {
      cursor: { id: paginationCursor },
      skip: 1, // Skip the cursor itself to avoid duplicates
    }),
  });
}

// get all documents by a given user id and published status
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
  richContent?: string;
  description?: string;
  status: PublishedStatus;
  authorId: string;
}) {
  return await prisma.document.create({
    data: {
      name: data.name,
      content: data.content,
      richContent: data.richContent,
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
    richContent?: string;
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
      richContent: data.richContent,
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
