"use client";
import { actualCommonRequest } from "@/api/actual_client";
import CustomTooltip from "@/components/custom/CustomTooltip";
import { TaskCount } from "@/constants/Types";
import { API_ROUTES } from "@/lib/routes";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Tooltip, Area, XAxis, YAxis } from "recharts";

const AreaChart = dynamic(
  () => import("recharts").then((recharts) => recharts.AreaChart),
  { ssr: false }
);

const TaskDone = () => {
  const [interval, setInterval] = useState("daily");
  const [data, setData] = useState<TaskCount[]>();

  useEffect(() => {
    const loadData = async () => {
      const res = await actualCommonRequest({
        route: API_ROUTES.PROJECT,
        method: "GET",
        url: `/api/task/task-count?interval=${interval}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.success) {
        setData(res.taskDone);
      }
    };
    loadData();
  }, [interval]);

  return (
    <div className="w-full bg-backgroundAccent rounded-md shadow-lg p-3 mt-5">
      <div className="flex items-center justify-between gap-2 p-2 border-b mb-2">
        <h1 className="text-xl font-bold">Task Done</h1>
        <div className="flex gap-4">
          <p
            className={`hover:underline cursor-pointer ${
              interval === "daily" && "underline"
            }`}
            onClick={() => setInterval("daily")}
          >
            Daily
          </p>
          <p
            className={`hover:underline cursor-pointer ${
              interval === "weekly" && "underline"
            }`}
            onClick={() => setInterval("weekly")}
          >
            Weekly
          </p>
          <p
            className={`hover:underline cursor-pointer ${
              interval === "monthly" && "underline"
            }`}
            onClick={() => setInterval("monthly")}
          >
            Monthly
          </p>
        </div>
      </div>
      <div className="">
        <AreaChart width={1020} height={350} data={data}>
          <XAxis
            axisLine={false}
            tickLine={false}
            domain={["auto", "auto"]}
            dataKey="date"
          />
          <YAxis axisLine={false} tickLine={false} domain={["auto", "auto"]} />
          <Area
            type="monotone"
            dataKey="completed"
            stroke="#4787FA"
            fill="url(#colorUv1)"
            strokeWidth={3}
            dot={true}
          />
          <Area
            type="monotone"
            dataKey="planning"
            stroke="#1EA7FF"
            fill="url(#colorUv2)"
            strokeWidth={3}
            dot={true}
          />
          <Area
            type="monotone"
            dataKey="active"
            stroke="#2eff70"
            fill="url(#colorUv7)"
            strokeWidth={3}
            dot={true}
          />
          <Area
            type="monotone"
            dataKey="backlog"
            stroke="#ff5353"
            fill="url(#colorUv6)"
            strokeWidth={3}
            dot={true}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <defs>
            <linearGradient id="colorUv6" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff5353" stopOpacity={0.2} />
              <stop offset="70%" stopColor="#ff5353" stopOpacity={0} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="colorUv7" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2eff70" stopOpacity={0.2} />
              <stop offset="70%" stopColor="#2eff70" stopOpacity={0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </div>
    </div>
  );
};

export default TaskDone;
