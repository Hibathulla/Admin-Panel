"use client";
import { DataTable } from "@components/ui/data-table";
import { useGetOrder } from "../../../services/order";
import TableSkeleton from "../../../skeletons/tableSkeleton";
import { OrderColumns } from "./OrderColumn";

const OrderList = () => {
  const { data: orderData, isLoading } = useGetOrder();

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
        searhPlaceholder="Search Orders..."
        searchKey="name"
        columns={OrderColumns}
        data={orderData?.order}
      />
    </div>
  );
};

export default OrderList;
