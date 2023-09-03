"use client";
import React from "react";
import { ProfileForm } from "@components/profile/profile-form";
import { useGetLoggedUser } from "@services/user";
import { Separator } from "@components/ui/separator";

const ProfilePage = () => {
  const { data } = useGetLoggedUser();
  console.log(data, "user");
  if (data)
    return (
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
    );
};

export default ProfilePage;
