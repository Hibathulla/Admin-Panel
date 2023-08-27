"use client";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect } from "react";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const tokenValue = localStorage.getItem("token");

    if (!tokenValue) router.replace("/login");
  }, [router]);

  return <Fragment>{children}</Fragment>;
};

export default ProtectRoute;
