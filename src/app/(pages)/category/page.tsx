"use client";

import CategoryList from "@components/categories/category-list";
import CreateButton from "@components/common/CreateButton";
import Heading from "@components/common/Heading";
import { ListPlus } from "lucide-react";
import Head from "next/head";

const CategoryPage = () => {
  return (
    <section>
      <Head>
        <title>Categories</title>
      </Head>
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
