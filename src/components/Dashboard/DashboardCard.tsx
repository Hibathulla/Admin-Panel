"use client";
import React from "react";
import { DashboardIcon } from "@utils/DashboardIcon";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "../../utils/utils";

const DashboardCard = ({
  name,
  value,
  icon,
}: {
  name: string;
  value: number;
  icon: any;
}) => {
  const dashboardIcon = DashboardIcon(icon);
  const { theme } = useTheme();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <Image
          alt={name}
          src={icon}
          className={cn({
            "white-color": theme === "dark",
            "dark-color": theme === "light",
          })}
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
