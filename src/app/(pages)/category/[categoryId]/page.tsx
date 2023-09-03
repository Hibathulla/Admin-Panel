"use client";
import React from "react";
import Heading from "@components/common/Heading";
import { CategoryForm } from "@components/categories/category-form";
import { Button } from "@components/ui/button";
import { ChevronLeft } from "lucide-react";
import Back from "@components/common/Back";
import { useDeleteCategory, useGetSingleCategory } from "@services/category";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

async function getCategory(param: string) {
  let token;
  if (typeof window != "undefined") token = localStorage.getItem("token");
  let res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL! + "/api/category/" + param,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.json();
}

const CategoryUpdatePage = ({ params }: { params: { categoryId: string } }) => {
  const { data: categoryData } = useGetSingleCategory(params?.categoryId);
  console.log(categoryData, "res");

  const { mutate, isLoading } = useDeleteCategory();
  const router = useRouter();

  const onDeletehandler = () => {
    mutate(categoryData?.data?.category!?.id, {
      onSuccess: () => {
        toast.error("Product deleted successfully");
        router.replace("/category");
      },
    });
  };

  if (categoryData)
    return (
      <section className="space-y-6">
        {/* <Back /> */}
        <Heading
          title="Update Category"
          description="Update a category"
          deleteButton={true}
          onConfirm={onDeletehandler}
          loading={isLoading}
        />
        <CategoryForm
          className="max-w-[15rem]"
          initialData={categoryData?.data?.category!}
        />
      </section>
    );
};

export default CategoryUpdatePage;
