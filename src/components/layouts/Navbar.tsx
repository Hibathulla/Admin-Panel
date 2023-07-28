import React from "react";

const Navbar = () => {
  return (
    <header className="px-10 w-full">
      <div className="border-b border-b-black-primary/10 py-4 flex items-start justify-between">
        <div>
          <h1 className="text-black-secondary text-3xl tracking-wider font-semibold">
            Dashboard
          </h1>
          <p className="text-base text-gray-400 font-medium">
            Welcome, Annette
          </p>
        </div>
        <div>
          <div className="w-10 h-10 rounded-full bg-gray-500"></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
