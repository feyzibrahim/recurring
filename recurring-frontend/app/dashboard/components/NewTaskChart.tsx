"use client";
import dynamic from "next/dynamic";
import React from "react";
import { BiTask } from "react-icons/bi";
import { Tooltip, Area, XAxis } from "recharts";
import CustomTooltip from "@/components/custom/CustomTooltip";
import { CountByDay } from "@/constants/Types";
import { countTotal } from "@/util/functions";

const AreaChart = dynamic(
  () => import("recharts").then((recharts) => recharts.AreaChart),
  { ssr: false }
);

const NewTaskChart = ({ data }: { data: CountByDay[] }) => {
  return (
    <div className="chart-box-parent">
      <div className="chart-box-header">
        <div className="chart-box-icon">
          <BiTask />
        </div>
        <p>New Task</p>
      </div>
      <div className="chart-box-content">
        <AreaChart width={230} height={100} data={data}>
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey="date"
            tick={false}
          />
          <defs>
            <linearGradient id="colorUv2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1EA7FF" stopOpacity={0.2} />
              <stop offset="70%" stopColor="#1EA7FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="count"
            stroke="#1EA7FF"
            fill="url(#colorUv2)"
            dot={false}
            strokeWidth={3}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
        </AreaChart>
        <div className="text-xs">
          <p>{countTotal(data)}+ more</p>
          <p>from last month</p>
        </div>
      </div>
    </div>
  );
};

export default NewTaskChart;
