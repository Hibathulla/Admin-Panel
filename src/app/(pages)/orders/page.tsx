"use client";
import Heading from "@components/common/Heading";
import ProductList from "../../../components/products/product-list";
import { Metadata } from "next";
import OrderList from "../../../components/orders/orders-list";
import Head from "next/head";

interface Props {
  params: string;
}

// export const generateMetadata = ({ params }: Props): Metadata => {
//   return {
//     title: `Orders`,
//   };
// };

const OrdersPage = () => {
  return (
    <section>
      <Head>
        <title>Orders</title>
      </Head>
      <div className="flex w-full items-center justify-between">
        <Heading title="Orders" description="Manage store orders" />
      </div>
      <OrderList />
    </section>
  );
};

export default OrdersPage;
