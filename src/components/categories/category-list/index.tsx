"use client";
import { DataTable } from "@components/ui/data-table";
import { CategoryColumns } from "./CategoryColumn";
import { useGetCategory } from "@services/category";
import { useGetLoggedUser } from "../../../services/user";
import TableSkeleton from "../../../skeletons/tableSkeleton";
import { Category, CategoryData } from "../../../types/category";

const CategoryList = () => {
  const { data: categoryData, isLoading } = useGetCategory();

  if (isLoading) {
    return (
      <div className="mt-4">
        {" "}
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div>
      <DataTable
        searhPlaceholder="Search Categories..."
        searchKey="category"
        columns={CategoryColumns}
        data={categoryData?.category as Category[]}
      />
    </div>
  );
};

export default CategoryList;
