import CreateButton from "@components/common/CreateButton";
import Heading from "@components/common/Heading";
import UserList from "@components/users/user-list";
import { Ruler } from "lucide-react";

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
