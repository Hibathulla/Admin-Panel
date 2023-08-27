"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CreateButton: React.FC<{ title: string; link: string; icon: any }> = ({
  title,
  icon,
  link,
}) => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push(link)} variant={"default"}>
      {icon} {title}
    </Button>
  );
};

export default CreateButton;
