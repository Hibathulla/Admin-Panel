"use client";
import { DataTable } from "@components/ui/data-table";
import { useGetSize } from "@services/size";
import SizeTableSkeleton from "../../../skeletons/sizeTableSkeleton";
import { SizeColumns } from "./SizeColumn";

const SizeList = () => {
  const { data: sizeData, isLoading } = useGetSize();
  console.log(sizeData);

  if (isLoading) {
    return (
      <div className="mt-4">
        {" "}
        <SizeTableSkeleton />
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
