import { TaskTypes } from "@/constants/Types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface TasksBarChartProps {
  data: TaskTypes[];
}

const TasksBarChart: React.FC<TasksBarChartProps> = ({ data }) => {
  const getStatusCount = (status: string) => {
    return data.filter((item) => item && item.status && item.status === status)
      .length;
  };

  const chartData = [
    { name: "Completed", value: getStatusCount("completed") },
    { name: "Active", value: getStatusCount("active") },
    { name: "Planning", value: getStatusCount("planning") },
    { name: "Backlog", value: getStatusCount("backlog") },
  ];

  // Filter out data points with zero values
  const filteredChartData = chartData.filter((entry) => entry.value !== 0);

  const renderCustomXAxisTick = ({ x, y, payload }: any) => {
    return (
      <text x={x} y={y} dy={16} textAnchor="middle" fill="#666">
        {payload.value}
      </text>
    );
  };

  const renderCustomYAxisTick = ({ x, y, payload }: any) => {
    return (
      <text x={x} y={y} dx={-5} dy={5} textAnchor="end" fill="#666">
        {payload.value}
      </text>
    );
  };

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
    <>
      {data && (
        <BarChart
          width={350}
          height={250}
          data={filteredChartData}
          margin={{ top: 10, right: 10, bottom: 5, left: -25 }}
          className="bg-backgroundAccent rounded-md mt-3 pt-5"
        >
          <XAxis
            dataKey="name"
            tick={renderCustomXAxisTick}
            axisLine={false}
            tickLine={false}
            className="text-[15px]"
          />
          <YAxis
            tick={renderCustomYAxisTick}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          {/* <Legend /> */}
          <Bar
            dataKey="value"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
        </BarChart>
      )}
    </>
  );
};

export default TasksBarChart;
