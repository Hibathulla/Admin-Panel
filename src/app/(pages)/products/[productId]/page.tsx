"use client";
import { CategoryForm } from "@components/categories/category-form";
import Heading from "@components/common/Heading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  useDeleteProduct,
  useGetSingleProduct,
} from "../../../../services/product";
import { ProductsForm } from "../../../../components/products/product-form";
import { Metadata } from "next";
import Head from "next/head";

interface Props {
  params: string;
}

const ProductUpdatePage = ({ params }: { params: { productId: string } }) => {
  const { data: productData } = useGetSingleProduct(params?.productId);

  const { mutate, isLoading } = useDeleteProduct();
  const router = useRouter();

  const onDeletehandler = () => {
    mutate(productData?.data?.product!?.id, {
      onSuccess: () => {
        toast.error("Product deleted successfully");
        router.replace("/products");
      },
    });
  };

  if (productData)
    return (
      <>
        <Head>
          <title>Edit product</title>
        </Head>
        <section className="space-y-6">
          {/* <Back /> */}
          <Heading
            title="Update Product"
            description="Update a product"
            deleteButton={true}
            onConfirm={onDeletehandler}
            loading={isLoading}
          />
          <ProductsForm
            className="max-w-[45rem]"
            initialData={productData?.data?.product!}
          />
        </section>
      </>
    );
};

export default ProductUpdatePage;
