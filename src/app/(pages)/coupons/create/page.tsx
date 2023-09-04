import Heading from "@components/common/Heading";
import { CouponForm } from "@components/coupon/coupon-form";
import { Metadata } from "next";

interface Props {
  params: string;
}

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Create coupon`,
  };
};

const CouponCreatePage = () => {
  return (
    <section className="space-y-6">
      {/* <Back /> */}
      <Heading
        title="Create Coupon"
        description="Create a coupon"
        deleteButton={false}
      />
      <CouponForm className="max-w-[15rem]" />
    </section>
  );
};

export default CouponCreatePage;
