"use client";
// import "./styles.css";
import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Group A", value: 700, color: "#0088FE" },
  { name: "Group B", value: 300, color: "#00C49F" },
  { name: "Group C", value: 300, color: "#FFBB28" },
  { name: "Group D", value: 200, color: "#FF8042" },
];

export default function DashboardPieChart() {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div className="w-full h-full border border-gray-300 rounded-lg flex dark:bg-[#282828] dark:border-0 flex-col py-3 px-4">
      <h2 className="text-xl font-semibold text-black-secondary dark:text-[#ffff]">
        Sale by Category
      </h2>
      <ResponsiveContainer width={"99%"} height={200}>
        <PieChart>
          <Tooltip
            contentStyle={{
              //   background: "#262A56",
              borderRadius: "5px",
              color: "#ffffff",
            }}
            itemStyle={{ color: "white" }}
            labelStyle={{ display: "none" }}
            cursor={{ fill: "none" }}
          />
          <Pie
            data={data}
            innerRadius={"70%"}
            outerRadius={"90%"}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Pie
            data={data}
            cx={420}
            cy={200}
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-between gap-4 flex-wrap mt-auto">
        {data?.map((item) => {
          return (
            <div key={item.name} className="flex items-start gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex flex-col gap-2">
                <h4 className="text-black-secondary text-xs font-semibold dark:text-[#ffff]">
                  {item.name}
                </h4>
                <p className="text-black-secondary text-xs dark:text-[#ffff]">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
