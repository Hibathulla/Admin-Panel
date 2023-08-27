import React from "react";
import Heading from "@components/common/Heading";
import { Separator } from "@components/ui/separator";
import { SettingsForm } from "@components/settings/SettingsForm";

const SettingsPage = () => {
  return (
    <section className="space-y-6">
      <Heading title="Settings" description="Mange store preferences" />
      <SettingsForm className="max-w-[15rem]" />
    </section>
  );
};

export default SettingsPage;
