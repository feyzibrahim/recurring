"use client";
import React from "react";
import { Tooltip, Area, AreaChart, XAxis, YAxis } from "recharts";
const data = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];

const TaskDone: React.FC = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-backgroundAccent border border-border p-2 rounded-md shadow ">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full bg-backgroundAccent rounded-md shadow-lg p-3 mt-5">
      <div className="flex items-center justify-between gap-2 p-2 border-b mb-2">
        <h1 className="text-xl font-bold">Task Done</h1>
        <div className="flex gap-2">
          <p className="hover:underline cursor-pointer">Daily</p>
          <p className="hover:underline cursor-pointer">Weekly</p>
          <p className="hover:underline cursor-pointer">Monthly</p>
        </div>
      </div>
      <div className="px-5">
        <AreaChart width={900} height={350} data={data}>
          <XAxis axisLine={false} tickLine={false} domain={["auto", "auto"]} />
          <YAxis axisLine={false} tickLine={false} domain={["auto", "auto"]} />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#4787FA"
            fill="url(#colorUv1)" // Shade color
            strokeWidth={3}
            dot={true}
          />
          <Area
            type="monotone"
            dataKey="amt"
            stroke="#1EA7FF"
            fill="url(#colorUv2)" // Shade color
            strokeWidth={3}
            dot={true}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default TaskDone;
