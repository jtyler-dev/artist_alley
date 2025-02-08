"use client";
import React from "react";
import { useFetchDocuments } from "@/hooks/useFetchDocuments";
import { DocumentTable } from "@/components/table/DocumentTable";
import { Spinner } from "@/components/Spinner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Routes from "@/constants/routes";
import { useRouter } from "next/navigation";

export const DocumentsTab = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const { documents, fetchDocuments, hasMore, isLoading, error } =
    useFetchDocuments({
      userId,
    });

  return (
    <div className="h-full">
      {(isLoading || documents === undefined) && (
        <Spinner className="justify-center items-center" />
      )}
      {!isLoading && documents && (
        <>
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={() => {
                router.push(Routes.STUDIO_NEW_DOCUMENT);
              }}
            >
              <Plus />
              New Document
            </Button>
          </div>
          <DocumentTable data={documents} />
        </>
      )}
    </div>
  );
};
