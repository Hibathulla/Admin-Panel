"use client";
import React from "react";
import { Button } from "@components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Back = () => {
  const router = useRouter();
  return (
    <Button
      className="flex items-center justify-start !pr-3 !pl-0 "
      variant="ghost"
      onClick={() => router.back()}
    >
      <ChevronLeft className="!w-5 !h-5" /> Back
    </Button>
  );
};

export default Back;
