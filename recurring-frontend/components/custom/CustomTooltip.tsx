import { format } from "date-fns";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow ">
        <p className="label">{`${format(label, "MMM dd")}`}</p>
        {payload.map((entry: any, index: number) => (
          <p
            key={index}
            className={`capitalize ${
              entry.dataKey === "completed" && "text-[#4787FA]"
            } ${entry.dataKey === "planning" && "text-[#1EA7FF]"} ${
              entry.dataKey === "active" && "text-[#2eff70]"
            } ${entry.dataKey === "backlog" && "text-[#ff5353]"}`}
          >{`${entry.dataKey}: ${entry.value}`}</p>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
