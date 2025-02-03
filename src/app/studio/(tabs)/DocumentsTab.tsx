"use client";
import React from "react";
import { useFetchDocuments } from "@/hooks/useFetchDocuments";
import { DocumentTable } from "@/components/table/DocumentTable";
import { Spinner } from "@/components/Spinner";

export const DocumentsTab = ({ userId }: { userId: string }) => {
  const { documents, fetchDocuments, hasMore, isLoading, error } =
    useFetchDocuments({
      userId,
    });

  return (
    <div>
      <h1>Documents</h1>
      <Spinner />
      <DocumentTable data={documents} />
    </div>
  );
};
