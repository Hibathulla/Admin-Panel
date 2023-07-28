import React from "react";
import { DashboardIcon } from "@utils/DashboardIcon";

const DashboardCard = ({
  name,
  value,
  icon,
}: {
  name: string;
  value: number;
  icon: string;
}) => {
  const dashboardIcon = DashboardIcon(icon);
  return (
    <div className="bg-zinc-100 rounded-lg p-4 border flex flex-col border-gray-300 gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-black-secondary">{name}</h3>
        {dashboardIcon}
      </div>
      <div className="text-2xl font-bold">
        {icon === "cash" && "₹"}
        {value}
      </div>
    </div>
  );
};

export default DashboardCard;
