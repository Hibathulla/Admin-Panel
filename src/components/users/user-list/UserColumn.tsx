"use client";

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { UserCellAction } from "./cell-action";
import { userType } from "../../../types/user";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const UserColumns: ColumnDef<userType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ cell }) => {
      var date: any = cell?.getValue();
      const formattedDate = moment(date).format("DD-MM-YY");
      console.log(cell?.getValue(), "date");

      // var fomatted_date = moment(date).format("YYYY-MM-DD");
      return <div className="text-left font-medium">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      return <UserCellAction data={row.original} />;
    },
  },
];
