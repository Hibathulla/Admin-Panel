import CreateButton from "@components/common/CreateButton";
import Heading from "@components/common/Heading";
import { PackagePlus } from "lucide-react";
import ProductList from "../../../components/products/product-list";

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
      <ProductList />
    </section>
  );
};

export default ProductsPage;
