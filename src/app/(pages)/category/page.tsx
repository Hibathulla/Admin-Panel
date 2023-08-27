import React from "react";

import { ListPlus, PackagePlus } from "lucide-react";
import Heading from "@components/common/Heading";
import { CategoryColumns } from "@components/categories/category-list/CategoryColumn";
import { useRouter } from "next/navigation";
import CreateButton from "@components/common/CreateButton";
import { routes } from "@services/routes";
import CategoryList from "@components/categories/category-list";

const CategoryPage = () => {
  return (
    <section>
      <div className="flex w-full items-center justify-between">
        <Heading title="Categories" description="Manage store category" />
        <CreateButton
          link={"/category/create"}
          title="Category"
          icon={<ListPlus className="w-5 h-5 mr-2" />}
        />
      </div>
      <CategoryList />
    </section>
  );
};

export default CategoryPage;
