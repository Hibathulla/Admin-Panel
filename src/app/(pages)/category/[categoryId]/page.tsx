"use client";
import React from "react";
import Heading from "@components/common/Heading";
import { CategoryForm } from "@components/categories/categories-form";
import { Button } from "@components/ui/button";
import { ChevronLeft } from "lucide-react";
import Back from "@components/common/Back";
import { useGetSingleCategory } from "../../../../services/category";

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

  if (categoryData)
    return (
      <section className="space-y-6">
        {/* <Back /> */}
        <Heading
          title="Update Category"
          description="Create a category"
          deleteButton={false}
        />
        <CategoryForm
          className="max-w-[15rem]"
          initialData={categoryData?.data?.category!}
        />
      </section>
    );
};

export default CategoryUpdatePage;
