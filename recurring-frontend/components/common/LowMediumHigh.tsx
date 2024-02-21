import React from "react";

const LowMediumHigh = ({ priority }: { priority: string }) => {
  return (
    <div
      className={`py-1 px-2 flex w-fit items-center gap-2 rounded-full text-xs text-white ${
        priority === "high" && "bg-red-500"
      } ${priority === "medium" && "bg-blue-600"} ${
        priority === "low" && "bg-gray-500"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          priority === "high" && "bg-red-800"
        } ${priority === "medium" && "bg-blue-800"} ${
          priority === "low" && "bg-gray-800"
        }`}
      ></div>
      <p className="capitalize">{priority}</p>
    </div>
  );
};

export default LowMediumHigh;
