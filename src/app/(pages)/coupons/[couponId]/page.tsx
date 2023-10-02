"use client";
import Heading from "@components/common/Heading";
import { useDeleteCoupon, useGetSingleCoupon } from "@services/coupon";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CouponForm } from "@components/coupon/coupon-form";
import { Metadata } from "next";
import Head from "next/head";

interface Props {
  params: string;
}

async function getCategory(param: string) {
  let token;
  if (typeof window != "undefined") token = localStorage.getItem("token");
  let res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL! + "/api/category/" + param,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.json();
}

const CouponUpdatePage = ({ params }: { params: { couponId: string } }) => {
  const { data: categoryData } = useGetSingleCoupon(params?.couponId);

  const { mutate, isLoading } = useDeleteCoupon();
  const router = useRouter();

  const onDeletehandler = () => {
    mutate(categoryData?.data?.coupon!?.id, {
      onSuccess: () => {
        toast.error("Coupon deleted successfully");
        router.replace("/coupons");
      },
    });
  };

  if (categoryData)
    return (
      <>
        <Head>
          <title>Edit coupon</title>
        </Head>
        <section className="space-y-6">
          {/* <Back /> */}
          <Heading
            title="Update Coupon"
            description="Update a coupon"
            deleteButton={true}
            onConfirm={onDeletehandler}
            loading={isLoading}
          />
          <CouponForm
            className="max-w-[15rem]"
            initialData={categoryData?.data?.coupon!}
          />
        </section>
      </>
    );
};

export default CouponUpdatePage;
