import { AttendanceTypes } from "@/constants/Types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface AttendanceBarChartProps {
  data: AttendanceTypes[];
}

const AttendanceBarChart: React.FC<AttendanceBarChartProps> = ({ data }) => {
  const getStatusCount = (status: string) => {
    return data.filter((item) => item && item.status && item.status === status)
      .length;
  };

  const chartData = [
    { name: "Present", value: getStatusCount("present") },
    { name: "Absent", value: getStatusCount("absent") },
    { name: "Late", value: getStatusCount("late") },
    { name: "Half Day", value: getStatusCount("half day") },
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

  return (
    <>
      {data && (
        <BarChart
          width={250}
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
          />
          <YAxis
            tick={renderCustomYAxisTick}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          <Bar dataKey="value" fill="currentColor" radius={[4, 4, 0, 0]} />
        </BarChart>
      )}
    </>
  );
};

export default AttendanceBarChart;
