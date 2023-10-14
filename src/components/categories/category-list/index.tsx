"use client";
import { DataTable } from "@components/ui/data-table";
import { CategoryColumns } from "./CategoryColumn";
import { useGetCategory } from "@services/category";
import { useGetLoggedUser } from "../../../services/user";
import TableSkeleton from "../../../skeletons/tableSkeleton";
import { Category, CategoryData } from "../../../types/category";

const data = [
  {
    id: 1,
    category: "hello",
    createdAt: "12/11/12",
    billboard: "123",
  },
  {
    id: 2,
    category: "hello",
    createdAt: "12/11/12",
    billboard: "123",
  },
];

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

  if (categoryData) {
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
  }
  return null;
};

export default CategoryList;
