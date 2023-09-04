import Heading from "@components/common/Heading";
import { SizeForm } from "@components/sizes/size-form";
import { Metadata } from "next";

interface Props {
  params: string;
}

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Create size`,
  };
};

const SizeCreatePage = () => {
  return (
    <section className="space-y-6">
      {/* <Back /> */}
      <Heading
        title="Create Size"
        description="Create a size"
        deleteButton={false}
      />
      <SizeForm className="max-w-[20rem]" />
    </section>
  );
};

export default SizeCreatePage;
