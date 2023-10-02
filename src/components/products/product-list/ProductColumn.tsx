"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductCellAction } from "./cell-action";
import { SizeType } from "../../../types/size";
import moment from "moment";
import { cn } from "../../../utils/utils";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../../ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductsColumn = {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  category: string;
  size: string;
  isFeatured: boolean;
  createdAt: string;
  //   status: "pending" | "processing" | "success" | "failed";
  //   email: string;
};

export const ProductColumns: ColumnDef<ProductsColumn>[] = [
  // {
  //   accessorKey: "createdAt",
  //   header: "Date",
  //   cell: ({ cell }) => {
  //     var date: any = cell?.getValue();
  //     const formattedDate = moment(date).format("DD-MM-YY");
  //     (cell?.getValue(), "date");

  //     // var fomatted_date = moment(date).format("YYYY-MM-DD");
  //     return <div className="text-left font-medium">{formattedDate}</div>;
  //   },
  // },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      const name: string = cell?.getValue() as any;

      // var fomatted_date = moment(date).format("YYYY-MM-DD");
      return <div className="font-medium flex flex-col">{name}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ cell }) => {
      var price: any = cell?.getValue();

      const discountPrice = cell?.row?.original?.discountPrice;

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
          {discountPrice && <span>₹{discountPrice}</span>}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ cell }) => {
      var category: any = cell?.getValue();

      // var fomatted_date = moment(date).format("YYYY-MM-DD");
      return <div className="font-medium">{category?.category}</div>;
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ cell }) => {
      const size: SizeType[] = cell?.getValue() as any;

      // var fomatted_date = moment(date).format("YYYY-MM-DD");
      return (
        <ul className="font-medium flex flex-col">
          {size?.map((val) => (
            <li key={val?.id}>{val?.name}</li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "outOfStock",
    header: "Out of stock",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      return <ProductCellAction data={row.original} />;
    },
  },
];
