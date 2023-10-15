"use client";

import { ListPlus, PackagePlus, Ruler } from "lucide-react";
import Heading from "@components/common/Heading";
import { CategoryColumns } from "@components/categories/category-list/CategoryColumn";
import { useRouter } from "next/navigation";
import CreateButton from "@components/common/CreateButton";
import { routes } from "@services/routes";
import CategoryList from "@components/categories/category-list";
import SizeList from "@components/sizes/size-list";
import { Metadata } from "next";

interface Props {
  params: string;
}

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Sizes`,
  };
};

const SizePage = () => {
  return (
    <section>
      <div className="flex w-full items-center justify-between">
        <Heading title="Sizes" description="Manage store sizes" />
        <CreateButton
          link={"/size/create"}
          title="+ Size"
          icon={<Ruler className="w-5 h-5 mr-2" />}
        />
      </div>
      <SizeList />
    </section>
  );
};

export default SizePage;
