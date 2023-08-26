"use client";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect } from "react";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  let value: string | null;
  // Get the value from local storage if it exists
  value = localStorage.getItem("token") || null;

  useEffect(() => {
    if (!value) router.replace("/login");
  }, [router, value]);

  return <Fragment>{children}</Fragment>;
};

export default ProtectRoute;
