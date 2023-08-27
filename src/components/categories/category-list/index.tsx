"use client";
import { DataTable } from "@components/ui/data-table";
import { CategoryColumns } from "./CategoryColumn";
import { useGetCategory } from "@services/category";
import { useGetLoggedUser } from "../../../services/user";
import TableSkeleton from "../../../skeletons/tableSkeleton";

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
  console.log(categoryData);

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
        data={categoryData?.category}
      />
    </div>
  );
};

export default CategoryList;
