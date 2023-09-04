import CreateButton from "@components/common/CreateButton";
import Heading from "@components/common/Heading";
import UserList from "@components/users/user-list";
import { Ruler } from "lucide-react";
import { Metadata } from "next";

interface Props {
  params: string;
}

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Users`,
  };
};

const UsersPage = () => {
  return (
    <section>
      <div className="flex w-full items-center justify-between">
        <Heading title="Users" description="Manage store users" />
      </div>
      <UserList />
    </section>
  );
};

export default UsersPage;
