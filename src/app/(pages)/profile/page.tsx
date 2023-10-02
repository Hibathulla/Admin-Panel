"use client";
import React from "react";
import { ProfileForm } from "@components/profile/profile-form";
import { useGetLoggedUser } from "@services/user";
import { Separator } from "@components/ui/separator";
import { Metadata } from "next";
import Head from "next/head";

interface Props {
  params: string;
}

const ProfilePage = () => {
  const { data } = useGetLoggedUser();
  if (data)
    return (
      <>
        <Head>
          <title>Profile</title>
        </Head>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Profile</h3>
            <p className="text-sm text-muted-foreground">
              This is how others will see you on the site.
            </p>
          </div>
          <Separator />
          <ProfileForm initialData={data?.user} />
        </div>
      </>
    );
};

export default ProfilePage;
