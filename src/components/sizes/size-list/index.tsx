"use client";
import { DataTable } from "@components/ui/data-table";
import { useGetSize } from "@services/size";
import SizeTableSkeleton from "../../../skeletons/sizeTableSkeleton";
import { SizeColumns } from "./SizeColumn";

const SizeList = () => {
  const { data: sizeData, isLoading } = useGetSize();
  sizeData;

  if (isLoading) {
    return (
      <div className="mt-4">
        {" "}
        <SizeTableSkeleton />
      </div>
    );
  }

  if (sizeData) {
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
  }
  return null;
};

export default SizeList;
