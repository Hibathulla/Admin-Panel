"use client";
import { DataTable } from "@components/ui/data-table";
import { useGetUser } from "@services/user";
import TableSkeleton from "../../../skeletons/tableSkeleton";
import { UserColumns } from "./UserColumn";
import UserTableSkeleton from "../../../skeletons/userTableSkeleton";

const UserList = () => {
  const { data: userData, isLoading } = useGetUser();
  userData;

  if (isLoading) {
    return (
      <div className="mt-4">
        {" "}
        <UserTableSkeleton />
      </div>
    );
  }

  return (
    <div>
      <DataTable
        searhPlaceholder="Search users..."
        searchKey="name"
        columns={UserColumns}
        data={userData?.user}
      />
    </div>
  );
};

export default UserList;
