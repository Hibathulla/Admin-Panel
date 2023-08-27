import CreateButton from "@components/common/CreateButton";
import Heading from "@components/common/Heading";
import { ProductColumns } from "@components/products/product-list/column";
import { DataTable } from "@components/ui/data-table";
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
        <Heading title="Products" description="Manage store products" />
        <CreateButton
          link={"/products/create"}
          title="Product"
          icon={<PackagePlus className="w-5 h-5 mr-2" />}
        />
      </div>
      <div>
        <DataTable
          searhPlaceholder="Search Products..."
          searchKey="name"
          columns={ProductColumns}
          data={data}
        />
      </div>
    </section>
  );
};

export default ProductsPage;
