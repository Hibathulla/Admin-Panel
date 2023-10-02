"use client";
import { DataTable } from "@components/ui/data-table";
import { useGetCategory } from "@services/category";
import { useGetLoggedUser } from "../../../services/user";
import TableSkeleton from "../../../skeletons/tableSkeleton";
import { useGetProduct } from "../../../services/product";
import { ProductColumns } from "./ProductColumn";
import { useState } from "react";
import { SortingState } from "@tanstack/react-table";

const data = [
  {
    id: 1,
    category: "hello",
    createdAt: "12/11/12",
    billboard: "123",
  },
  {
    id: 2,
    category: "hello",
    createdAt: "12/11/12",
    billboard: "123",
  },
];

const ProductList = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { data: productData, isLoading } = useGetProduct();

  if (isLoading) {
    return (
      <div className="mt-4">
        {" "}
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div>
      <DataTable
        searhPlaceholder="Search Products..."
        searchKey="name"
        columns={ProductColumns}
        data={productData?.product}
        sorting={sorting}
        setSorting={setSorting}
      />
    </div>
  );
};

export default ProductList;
