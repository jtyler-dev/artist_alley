"use client";
import { ColumnDef } from "@tanstack/react-table";
import { PublishedStatus } from "@prisma/client";
import { SortableHeader } from "@/components/table/SortableHeader";
import { DateCell } from "@/components/table/cells";
import { StatusTag } from "@/components/StatusTag";
import { capitalizeFirstLetter } from "@/lib/utils";
import { NotebookPen, BookCheck } from "lucide-react";
import { Status } from "@/constants/Status";

export type DocumentTableData = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: PublishedStatus;
};

export const DocumentTableColDef: ColumnDef<DocumentTableData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortableHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      return <DateCell date={row.original.createdAt} />;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <SortableHeader column={column} title="Last Updated" />
    ),
    cell: ({ row }) => {
      return <DateCell date={row.original.createdAt} />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
    cell: ({ row }) => {
      return (
        <StatusTag
          Icon={PublishedStatus.DRAFT ? NotebookPen : BookCheck}
          status={PublishedStatus.DRAFT ? Status.INFO : Status.SUCCESS}
          text={capitalizeFirstLetter(row.original.status)}
        />
      );
    },
  },
];
