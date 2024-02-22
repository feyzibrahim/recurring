"use client";
import React from "react";
import { BiTask } from "react-icons/bi";
import { Tooltip, Area, AreaChart } from "recharts";
const data = [
  { name: "Jan", uv: 5 },
  { name: "Feb", uv: 20 },
  { name: "Mar", uv: 14 },
  { name: "Apr", uv: 18 },
  { name: "May", uv: 30 },
  { name: "Jun", uv: 14 },
  { name: "Jul", uv: 12 },
];

const NewTaskChart: React.FC = () => {
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
    <div className="w-full h-full bg-backgroundAccent rounded-md shadow-lg p-3">
      <div className="flex items-center gap-2 p-2 border-b mb-2">
        <div className="bg-secondary p-2 rounded-full">
          <BiTask />
        </div>
        <p>New Task</p>
      </div>
      <div className="flex gap-2 items-center pt-2">
        <AreaChart width={230} height={100} data={data}>
          <defs>
            <linearGradient id="colorUv2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1EA7FF" stopOpacity={0.2} />
              <stop offset="70%" stopColor="#1EA7FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#1EA7FF"
            fill="url(#colorUv2)" // Shade color
            dot={false}
            strokeWidth={3}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
        </AreaChart>
        <div className="text-xs">
          <p>10+ more</p>
          <p>from last week</p>
        </div>
      </div>
    </div>
  );
};

export default NewTaskChart;
