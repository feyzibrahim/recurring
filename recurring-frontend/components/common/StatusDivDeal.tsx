import React from "react";

const StatusDivDeal = ({ status }: { status: string }) => {
  return (
    <div
      className={`py-1 px-2 flex w-fit items-center gap-2 rounded-full text-xs text-white ${
        status === "lead" && "bg-fuchsia-500"
      } ${status === "qualified" && "bg-orange-600"} ${
        status === "proposal" && "bg-cyan-500"
      } ${status === "negotiation" && "bg-yellow-600"} ${
        status === "closed" && "bg-green-600"
      } ${status === "lost" && "bg-red-600"}`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          status === "lead" && "bg-fuchsia-800"
        } ${status === "qualified" && "bg-orange-900"} ${
          status === "proposal" && "bg-cyan-800"
        } ${status === "negotiation" && "bg-yellow-900"} ${
          status === "closed" && "bg-green-900"
        } ${status === "lost" && "bg-red-900"}`}
      ></div>
      <p className="capitalize pr-2">{status}</p>
    </div>
  );
};

export default StatusDivDeal;
