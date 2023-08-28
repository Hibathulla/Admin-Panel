"use client";
import { DataTable } from "@components/ui/data-table";
import { useGetCategory } from "@services/category";
import { useGetLoggedUser } from "../../../services/user";
import TableSkeleton from "../../../skeletons/tableSkeleton";
import { SizeColumn, SizeColumns } from "./SizeColumn";
import { useGetSize } from "../../../services/size";

const SizeList = () => {
  const { data: sizeData, isLoading } = useGetSize();
  console.log(sizeData);

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
        searhPlaceholder="Search sizes..."
        searchKey="name"
        columns={SizeColumns}
        data={sizeData?.size}
      />
    </div>
  );
};

export default SizeList;
