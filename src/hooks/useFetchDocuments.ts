"use client";
import { useState, useEffect, useCallback } from "react";
import { getAllDocumentsByUserId } from "@/lib/prisma/DocumentService";
import { DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER } from "@/lib/prisma/constants";
import { Document } from "@prisma/client";

// NOTE: Remember, in dev mode next will call effect multiple times to check for side effects.

export interface UseFetchDocumentsProps {
  userId: string;
  itemsPerPage?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
}

export function useFetchDocuments({
  userId,
  itemsPerPage,
  sortField = DEFAULT_SORT_FIELD,
  sortOrder = DEFAULT_SORT_ORDER,
}: UseFetchDocumentsProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [paginationCursor, setPaginationCursor] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const hasMore = totalCount === null || documents.length < totalCount;

  const fetchDocuments = useCallback(
    async (resetData = false) => {
      if (!userId || isLoading) {
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const {
          documents: fetchedDocuments,
          totalCount: fetchedTotalCount,
        }: { documents: Document[]; totalCount: number } =
          await getAllDocumentsByUserId({
            userId,
            paginationCursor: resetData ? undefined : paginationCursor,
            itemsPerPage,
            sortField,
            sortOrder,
          });

        if (resetData) {
          setDocuments(fetchedDocuments);
          setTotalCount(fetchedTotalCount);
        } else {
          setDocuments((prevDocuments) => [
            ...prevDocuments,
            ...fetchedDocuments,
          ]);
        }

        if (fetchedDocuments.length > 0) {
          setPaginationCursor(fetchedDocuments[fetchedDocuments.length - 1].id);
        }
      } catch (error) {
        console.log("Error fetching documents: ", error);
        setError("Error fetching documents.");
      } finally {
        setIsLoading(false);
      }
    },
    // isLoading is causing an infinite loop, so we dont include it in the dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId, itemsPerPage, sortField, sortOrder, paginationCursor]
  );

  // TODO: dont know if I want this fetch it or have the calling component just do it....
  // might also need to update the fetchDocuments to handle updated sortField and sortOrder etc
  useEffect(() => {
    if (!userId) return; // Avoid unnecessary fetch when userId is not provided
    fetchDocuments(true);
    // fetchDocuments is a dependency, but we dont want to call it on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, sortField, sortOrder]);

  return {
    documents,
    fetchMore: () => fetchDocuments(),
    refetchData: () => fetchDocuments(true),
    isLoading,
    hasMore,
    error,
  };
}
