"use client";
import React from "react";
import Heading from "@components/common/Heading";
import { Separator } from "@components/ui/separator";
import { SettingsForm } from "@components/settings/SettingsForm";
import { useGetSingleSettings } from "../../../../services/settings";
import { Metadata } from "next";

interface Props {
  params: string;
}

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Settings`,
  };
};

const SettingsPage = ({ params }: { params: { settingsId: string } }) => {
  const { data } = useGetSingleSettings(params?.settingsId);

  if (data)
    return (
      <section className="space-y-6">
        <Heading title="Settings" description="Mange store preferences" />
        <SettingsForm
          initialData={data?.data?.settings}
          className="max-w-[15rem]"
        />
      </section>
    );
};

export default SettingsPage;
