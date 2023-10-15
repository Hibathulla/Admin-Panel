"use client";
import CreateButton from "@components/common/CreateButton";
import Heading from "@components/common/Heading";
import CouponList from "@components/coupon/coupon-list";
import { Ticket } from "lucide-react";
import { Metadata } from "next";
import Head from "next/head";

const CouponPage = () => {
  return (
    <section>
      <Head>
        <title>Coupons</title>
      </Head>
      <div className="flex w-full items-center justify-between">
        <Heading title="Coupons" description="Manage store coupons" />
        <CreateButton
          link={"/coupons/create"}
          title="+ Coupon"
          icon={<Ticket className="w-5 h-5 mr-2" />}
        />
      </div>
      {/* coupon list */}
      <CouponList />
    </section>
  );
};

export default CouponPage;
