"use client";
import React, { useState } from "react";
import { sidebarLinks } from "@resources/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogoIcon } from "@assets/logo";
import { cn } from "../../utils/utils";
import { useTheme } from "next-themes";

const Sidebar = () => {
  const [hover, setHover] = useState<any>(null);
  const pathname = usePathname();
  const { theme } = useTheme();
  console.log(hover, "path");

  return (
    <aside className="border-r bg-zinc-100 dark:bg-[#181818] h-screen">
      <div className="w-52 px-5">
        <div className="flex items-center justify-center py-6 gap-2">
          <Image src={LogoIcon} alt="logo" width={23} height={23} />
          <h1 className="font-bold tracking-wider text-2xl">Buyzillo</h1>
        </div>
        <nav className="mt-6">
          <ul className="flex flex-col justify-center gap-3">
            {sidebarLinks?.map((link) => {
              return (
                <Link href={link.url} key={link.id}>
                  <div
                    onMouseEnter={() => setHover(link?.id)}
                    onMouseLeave={() => setHover(null)}
                    className={cn(
                      "group hover:bg-black-secondary dark:hover:bg-[#ffff] hover:text-white dark:hover:text-[#181818] dark:text-[#b3b3b3] rounded-xl py-2.5 px-4 flex items-center text-gray-500 gap-2 text-sm font-semibold",
                      {
                        "bg-[#252525] dark:bg-[#ffff] text-white dark:text-[#181818]":
                          pathname === `/${link.slug}`,
                        // "#ffff": pathname === `/${link.slug}
                      }
                    )}
                  >
                    <Image
                      src={link.icon}
                      className={cn("group-hover:fill-white", {
                        "white-icon": theme === "dark",
                        "dark-color":
                          (theme === "dark" && pathname === `/${link.slug}`) ||
                          (theme === "dark" && hover === link.id),

                        "white-color":
                          (theme === "light" && pathname === `/${link.slug}`) ||
                          (theme === "light" && hover === link.id),
                      })}
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
