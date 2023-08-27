"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "@components/common/cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductsColumn = {
  id: number;
  name: string;
  price: number;
  category: string;
  isFeatured: boolean;
  createdAt: string;
  //   status: "pending" | "processing" | "success" | "failed";
  //   email: string;
};

export const ProductColumns: ColumnDef<ProductsColumn>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
