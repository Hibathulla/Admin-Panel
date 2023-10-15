import CreateButton from "@components/common/CreateButton";
import Heading from "@components/common/Heading";
import { PackagePlus } from "lucide-react";
import Head from "next/head";
import ProductList from "@components/products/product-list";

async function getProducts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product`,
    {
      cache: "no-cache",
    }
  );
  return response?.json();
}

const ProductsPage = async () => {
  const product = await getProducts();
  console.log(product, "pro");

  return (
    <section>
      <Head>
        <title>Products</title>
      </Head>
      <div className="flex w-full items-center justify-between">
        <Heading title="Products" description="Manage store products" />
        <CreateButton
          link={"/products/create"}
          title="Product"
          icon={<PackagePlus className="w-5 h-5 mr-2" />}
        />
      </div>
      <ProductList productData={product?.data} />
    </section>
  );
};

export default ProductsPage;
