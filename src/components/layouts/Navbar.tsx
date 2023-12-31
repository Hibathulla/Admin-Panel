import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";

const Navbar = () => {
  return (
    <header className="px-10 w-full dark:bg-[#181818]">
      <div className="py-4 flex items-start justify-between">
        <div>
          {/* <h1 className="text-black-secondary text-3xl tracking-wider font-semibold">
            Dashboard
          </h1> */}
          {/* <p className="text-base text-gray-400 font-medium">
            Welcome, Annette
          </p> */}
        </div>
        {/* <div></div> */}
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
