import Heading from "@components/common/Heading";
import { ProductsForm } from "@components/products/product-form";
import { Metadata } from "next";

interface Props {
  params: string;
}

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Create product`,
  };
};

const ProductCreatePage = () => {
  return (
    <section className="space-y-6">
      {/* <Back /> */}
      <Heading
        title="Create Product"
        description="Create a store product"
        deleteButton={false}
      />
      <ProductsForm className="max-w-[45rem]" />
    </section>
  );
};

export default ProductCreatePage;
