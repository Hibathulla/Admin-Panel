"use client";
import { DataTable } from "@components/ui/data-table";
import { useGetCategory } from "@services/category";
import { useGetLoggedUser } from "../../../services/user";
import TableSkeleton from "../../../skeletons/tableSkeleton";
import { useGetProduct } from "../../../services/product";
import { ProductColumns } from "./ProductColumn";
import { useState } from "react";
import { SortingState } from "@tanstack/react-table";

const ProductList = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { data: productData, isLoading } = useGetProduct();

  return (
    <div>
      {isLoading ? (
        <div className="mt-4">
          {" "}
          <TableSkeleton />
        </div>
      ) : (
        <DataTable
          searhPlaceholder="Search Products..."
          searchKey="name"
          columns={ProductColumns}
          data={productData?.product}
          sorting={sorting}
          setSorting={setSorting}
        />
      )}
    </div>
  );
};

export default ProductList;
