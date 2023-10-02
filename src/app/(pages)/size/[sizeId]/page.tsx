"use client";
import { CategoryForm } from "@components/categories/category-form";
import Heading from "@components/common/Heading";
import { useDeleteSize, useGetSingleSize } from "@services/size";
import { SizeForm } from "@components/sizes/size-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Metadata } from "next";
import Head from "next/head";

interface Props {
  params: string;
}

const SizeUpdatePage = ({ params }: { params: { sizeId: string } }) => {
  const { data: sizeData } = useGetSingleSize(params?.sizeId);

  const { mutate, isLoading } = useDeleteSize();
  const router = useRouter();

  const onDeletehandler = () => {
    mutate(sizeData?.data?.size!?.id, {
      onSuccess: () => {
        toast.error("Size deleted successfully");
        router.replace("/size");
      },
    });
  };

  if (sizeData)
    return (
      <>
        <Head>
          <title>Settings</title>
        </Head>
        <section className="space-y-6">
          {/* <Back /> */}
          <Heading
            title="Update Size"
            description="Update a size"
            deleteButton={true}
            onConfirm={onDeletehandler}
            loading={isLoading}
          />
          <SizeForm
            className="max-w-[15rem]"
            initialData={sizeData?.data?.size!}
          />
        </section>
      </>
    );
};

export default SizeUpdatePage;
