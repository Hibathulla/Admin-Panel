"use client";
import Heading from "@components/common/Heading";
import UserList from "@components/users/user-list";
import { Metadata } from "next";
import Head from "next/head";

const UsersPage = () => {
  return (
    <section>
      <Head>
        <title>Users</title>
      </Head>
      <div className="flex w-full items-center justify-between">
        <Heading title="Users" description="Manage store users" />
      </div>
      <UserList />
    </section>
  );
};

export default UsersPage;
