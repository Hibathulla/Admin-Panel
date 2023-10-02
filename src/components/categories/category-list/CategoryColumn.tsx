"use client";

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { CategoryCellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoriesColumn = {
  category: string;
  billboard?: string;
  billboardLabel?: string;
  createdAt?: string;
  //   status: "pending" | "processing" | "success" | "failed";
  //   email: string;
};

export const CategoryColumns: ColumnDef<CategoriesColumn>[] = [
  {
    accessorKey: "category",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ cell }) => {
      var date: any = cell?.getValue();
      const formattedDate = moment(date).format("DD-MM-YY");
      cell?.getValue(), "date";

      // var fomatted_date = moment(date).format("YYYY-MM-DD");
      return <div className="text-left font-medium">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      return <CategoryCellAction data={row.original} />;
    },
  },
];
