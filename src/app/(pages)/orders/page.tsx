import Heading from "@components/common/Heading";
import ProductList from "../../../components/products/product-list";
import { Metadata } from "next";
import OrderList from "../../../components/orders/orders-list";

interface Props {
  params: string;
}

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Orders`,
  };
};

const OrdersPage = () => {
  return (
    <section>
      <div className="flex w-full items-center justify-between">
        <Heading title="Orders" description="Manage store orders" />
      </div>
      <OrderList />
    </section>
  );
};

export default OrdersPage;