"use client";
import { DataTable } from "@components/ui/data-table";
import { useGetCategory } from "@services/category";
import { useGetLoggedUser } from "../../../services/user";
import TableSkeleton from "../../../skeletons/tableSkeleton";
import { useGetProduct } from "../../../services/product";
import { OrderColumns } from "./OrderColumn";
import { useGetOrder } from "../../../services/order";

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

const OrderList = () => {
  const { data: orderData, isLoading } = useGetOrder();
  orderData;

  if (isLoading) {
    return (
      <div className="mt-4">
        {" "}
        <TableSkeleton />
      </div>
    );
  }

  if (orderData) {
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
  }
  return null;
};

export default OrderList;
