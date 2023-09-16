"use client";
import Image from "next/image";
import React from "react";
import { Login1, Login2, Login3, Login4, Login5 } from "../../../assets/login";
import { useGetSingleSettings } from "../../../services/settings";

const LeftSide = () => {
  const { data } = useGetSingleSettings("64f591c66c13180f873b9074");
  return (
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div className="absolute inset-0 dark:bg-blue-400 bg-zinc-900 grid place-items-center">
        <Image alt="login image" src={Login5} />
      </div>
      <div className="relative z-20 flex items-center text-lg font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        {data?.data?.settings?.storeName}
      </div>
      {/* <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="text-lg">
            &ldquo;This library has saved me countless hours of work and helped
            me deliver stunning designs to my clients faster than ever
            before.&rdquo;
          </p>
          <footer className="text-sm">Sofia Davis</footer>
        </blockquote>
      </div> */}
    </div>
  );
};

export default LeftSide;
