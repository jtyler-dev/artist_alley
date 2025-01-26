"use client";
import React from "react";
import { DataTable } from "@/components/ui/DataTable";
import {
  type DocumentTableData,
  DocumentTableColDef,
} from "./DocumentTableColDef";
import { useRouter } from "next/navigation";
import * as Routes from "@/constants/routes";

interface DocumentTableProps {
  data: DocumentTableData[];
}

export const DocumentTable = ({ data }: DocumentTableProps) => {
  const router = useRouter();

  const onRowClick = (row: DocumentTableData) => {
    router.push(`${Routes.STUDIO_DOCUMENT}/${row.id}`);
  };

  return (
    <DataTable
      columns={DocumentTableColDef}
      data={data}
      onRowClick={onRowClick}
    />
  );
};
