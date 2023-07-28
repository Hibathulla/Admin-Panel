"use client";
import React from "react";
import { sidebarLinks } from "@resources/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogoIcon } from "@assets/logo";

const Sidebar = () => {
  const pathname = usePathname();
  console.log(pathname, "path");

  return (
    <aside className="border-r">
      <div className="w-52 px-5">
        <div className="flex items-center justify-center py-6 gap-2">
          <Image src={LogoIcon} alt="logo" width={23} height={23} />
          <h1 className="font-bold tracking-wider text-2xl">Buyzillo</h1>
        </div>
        <nav className="mt-6">
          <ul className="flex flex-col justify-center gap-3">
            {sidebarLinks?.map((link) => {
              return (
                <Link href="#" key={link.id}>
                  <div
                    style={{
                      backgroundColor:
                        pathname === `/${link.slug}` ? "#252525" : "#fffff",
                      color: pathname === `/${link.slug}` ? "#ffffff" : "",
                    }}
                    className="parent hover:bg-black-secondary group hover:text-white rounded-xl py-2.5 px-4 flex items-center text-gray-500 gap-2 text-sm font-semibold"
                  >
                    <Image
                      src={link.icon}
                      className={`${
                        pathname === `/${link.slug}` && "white-color"
                      } icon-color`}
                      alt={link.label}
                      width={23}
                      height={23}
                    />{" "}
                    {link.label}
                  </div>
                </Link>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
