import CreateButton from "@components/common/CreateButton";
import Heading from "@components/common/Heading";
import CouponList from "@components/coupon/coupon-list";
import { Ticket } from "lucide-react";

const CouponPage = () => {
  return (
    <section>
      <div className="flex w-full items-center justify-between">
        <Heading title="Coupons" description="Manage store coupons" />
        <CreateButton
          link={"/coupons/create"}
          title="+ Coupon"
          icon={<Ticket className="w-5 h-5 mr-2" />}
        />
      </div>
      <CouponList />
    </section>
  );
};

export default CouponPage;
