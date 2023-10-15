"use client";
import { DataTable } from "@components/ui/data-table";
import { SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { useGetProduct } from "../../../services/product";
import TableSkeleton from "../../../skeletons/tableSkeleton";
import { ProductColumns } from "./ProductColumn";
import { Product, productType } from "../../../types/product";

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
          data={
            (productData?.product as Product["data"]["product"]) ||
            ([] as Product["data"]["product"])
          }
          sorting={sorting}
          setSorting={setSorting}
        />
      )}
    </div>
  );
};

export default ProductList;
