import React from "react";
import {
  FaArrowCircleDown,
  FaArrowCircleRight,
  FaArrowCircleUp,
} from "react-icons/fa";

const LowMediumHigh = ({ priority }: { priority: string }) => {
  return (
    <div className="capitalize flex items-center gap-2">
      {priority === "high" && <FaArrowCircleUp />}
      {priority === "medium" && <FaArrowCircleRight />}
      {priority === "low" && <FaArrowCircleDown />}
      {priority}
    </div>
  );
};

export default LowMediumHigh;
