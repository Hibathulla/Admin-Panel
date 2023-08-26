import React from "react";
import { Button } from "@components/ui/button";
import { Table } from "@components/ui/table";
import { DataTable } from "@components/ui/data-table";
import { columns } from "@components/products/column";
import { PackagePlus } from "lucide-react";

const data = [
  {
    id: 1,
    name: "hello",
    price: 300,
    category: "shirt",
    isFeatured: true,
    createdAt: "12/11/12",
  },
  {
    id: 2,
    name: "shirt",
    price: 300,
    category: "shirt",
    isFeatured: true,
    createdAt: "12/11/12",
  },
  {
    id: 3,
    name: "pant",
    price: 300,
    category: "shirt",
    isFeatured: true,
    createdAt: "12/11/12",
  },
];

const ProductsPage = () => {
  return (
    <section>
      <div className="flex w-full items-center justify-between">
        <div className="space-y-2">
          <h1>Products</h1>
          <div className="font-semibold text-xs text-neutral-800 dark:text-neutral-100">
            <span className="text-neutral-400 dark:text-neutral-50">
              ACTIVE
            </span>
            : 5 PRODUCTS
          </div>
        </div>
        <Button className="" variant={"default"}>
          <PackagePlus className="w-5 h-5 mr-2" />
          New Product
        </Button>
      </div>
      <div>
        <DataTable
          searhPlaceholder="Search Products..."
          searchKey="name"
          columns={columns}
          data={data}
        />
      </div>
    </section>
  );
};

export default ProductsPage;
