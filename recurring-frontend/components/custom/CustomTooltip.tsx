import { format } from "date-fns";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow ">
        <p className="label">{`${format(label, "MMM dd")}`}</p>
        {payload.map((entry: any, index: number) => (
          <p
            key={index}
            className="capitalize"
          >{`${entry.dataKey}: ${entry.value}`}</p>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
