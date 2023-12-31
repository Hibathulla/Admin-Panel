"use client";
import { DataTable } from "@components/ui/data-table";
import { useGetCoupon } from "@services/coupon";
import CouponTableSkeleton from "../../../skeletons/couponTableSkeleton";
import { CouponColumns } from "./CouponColumn";

const CouponList = () => {
  const { data: couponData, isLoading } = useGetCoupon();

  if (isLoading) {
    return (
      <div className="mt-4">
        {" "}
        <CouponTableSkeleton />
      </div>
    );
  }

  return (
    <div>
      <DataTable
        searhPlaceholder="Search coupons..."
        searchKey="name"
        columns={CouponColumns}
        data={couponData?.coupon}
      />
    </div>
  );
};

export default CouponList;
