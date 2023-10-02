"use client";

import { ColumnDef } from "@tanstack/react-table";
import { OrderCellAction } from "./cell-action";
import { SizeType } from "../../../types/size";
import moment from "moment";
import { cn } from "../../../utils/utils";
import { Check } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductsColumn = {
  id: number;
  orderId: string;
  price: number;
  discount: number;
  isPaid: boolean;
  status: string;

  createdAt: string;
  //   status: "pending" | "processing" | "success" | "failed";
  //   email: string;
};

export const OrderColumns: ColumnDef<ProductsColumn>[] = [
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
    accessorKey: "orderId",
    header: "Order",
    cell: ({ cell }) => {
      const orderId: string = cell?.getValue() as any;

      // var fomatted_date = moment(date).format("YYYY-MM-DD");
      return <div className="font-medium flex flex-col">{orderId}</div>;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ cell }) => {
      var price: any = cell?.getValue();

      const discountPrice = cell?.row?.original?.discount;

      // var fomatted_date = moment(date).format("YYYY-MM-DD");
      return (
        <div className="font-medium">
          <span
            className={cn(
              discountPrice ? "line-through text-xs text-gray-400" : ""
            )}
          >
            ₹{price}
          </span>{" "}
          {discountPrice ? <span>₹{discountPrice}</span> : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell: ({ cell }) => {
      var paid: any = cell?.getValue();

      // var fomatted_date = moment(date).format("YYYY-MM-DD");
      return (
        <div className="font-medium">
          {" "}
          {paid ? (
            <div className="bg-green-400 w-5 h-5 flex items-center justify-center rounded-full">
              <Check size={12} color="white" />
            </div>
          ) : (
            ""
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ cell }) => {
      var status: any = cell?.getValue();

      // var fomatted_date = moment(date).format("YYYY-MM-DD");
      return <div className="font-medium">{status}</div>;
    },
  },

  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      return <OrderCellAction data={row.original} />;
    },
  },
];
