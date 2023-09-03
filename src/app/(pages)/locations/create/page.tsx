import Heading from "@components/common/Heading";
import { CouponForm } from "@components/coupon/coupon-form";
import { LocationForm } from "../../../../components/locations/location-form";

const LocationCreatePage = () => {
  return (
    <section className="space-y-6">
      {/* <Back /> */}
      <Heading
        title="Create Location"
        description="Create a delivery location"
        deleteButton={false}
      />
      <LocationForm className="max-w-[15rem]" />
    </section>
  );
};

export default LocationCreatePage;
