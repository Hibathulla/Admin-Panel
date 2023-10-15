"use client";
import Heading from "@components/common/Heading";
import { SettingsForm } from "@components/settings/SettingsForm";
import Head from "next/head";
import { useGetSingleSettings } from "../../../../services/settings";

const SettingsPage = ({ params }: { params: { settingsId: string } }) => {
  const { data } = useGetSingleSettings(params?.settingsId);

  if (data)
    return (
      <>
        <Head>
          <title>Settings</title>
        </Head>
        <section className="space-y-6">
          <Heading title="Settings" description="Mange store preferences" />
          <SettingsForm
            initialData={data?.data?.settings}
            className="max-w-[15rem]"
          />
        </section>
      </>
    );
};

export default SettingsPage;
