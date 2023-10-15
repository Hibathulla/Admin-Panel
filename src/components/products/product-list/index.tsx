"use client";
import { DataTable } from "@components/ui/data-table";
import { SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { useGetProduct } from "../../../services/product";
import TableSkeleton from "../../../skeletons/tableSkeleton";
import { ProductColumns } from "./ProductColumn";
import { Product } from "../../../types/product";

const ProductList: React.FC<{ productData: Product["data"] }> = ({
  productData,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  console.log(productData, "dadsa");

  // const { data: productData, isLoading } = useGetProduct();

  // if (isLoading) {
  //   return (
  //     <div className="mt-4">
  //       <TableSkeleton />
  //     </div>
  //   );
  // }

  return (
    <div>
      {productData ? (
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
      ) : null}
    </div>
  );
};

export default ProductList;
