import Heading from "@components/common/Heading";
import { CouponForm } from "@components/coupon/coupon-form";

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
