"use client";
import CustomTooltip from "@/components/custom/CustomTooltip";
import { CountByDay } from "@/constants/Types";
import { countTotal } from "@/util/functions";
import dynamic from "next/dynamic";
import { FiStar } from "react-icons/fi";
import { Tooltip, Area, XAxis } from "recharts";

const AreaChart = dynamic(
  () => import("recharts").then((recharts) => recharts.AreaChart),
  { ssr: false }
);

const TaskCompleteChart = ({ data }: { data: CountByDay[] }) => {
  return (
    <div className="chart-box-parent">
      <div className="chart-box-header">
        <div className="chart-box-icon">
          <FiStar />
        </div>
        <p>Task Completed</p>
      </div>
      {data && data.length > 0 ? (
        <div className="chart-box-content">
          <AreaChart width={230} height={100} data={data}>
            <XAxis
              axisLine={false}
              tickLine={false}
              dataKey="date"
              tick={false}
            />
            <defs>
              <linearGradient id="colorUv1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4787FA" stopOpacity={0.2} />
                <stop offset="70%" stopColor="#4787FA" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="count"
              stroke="#4787FA"
              fill="url(#colorUv1)"
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
      ) : (
        <div className="flex items-center justify-center h-24">
          <p>No data to show Yet!</p>
        </div>
      )}
    </div>
  );
};

export default TaskCompleteChart;
