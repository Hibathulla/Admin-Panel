import React from "react";
import Heading from "@components/common/Heading";
import { CategoryForm } from "@components/categories/categories-form";
import { Button } from "@components/ui/button";
import { ChevronLeft } from "lucide-react";
import Back from "@components/common/Back";

const CategoryCreatePage = () => {
  return (
    <section className="space-y-6">
      {/* <Back /> */}
      <Heading
        title="Create Category"
        description="Create a category"
        deleteButton={false}
      />
      <CategoryForm className="max-w-[15rem]" />
    </section>
  );
};

export default CategoryCreatePage;
