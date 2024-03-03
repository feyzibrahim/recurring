import Recurring from "@/components/common/Recurring";
import { Button } from "@/components/ui/button";
import React from "react";
import { FiClock } from "react-icons/fi";

const NextInvoice = () => {
  return (
    <div className="text-sm bg-backgroundAccent p-7 rounded-md col-span-2">
      <p className="uppercase">Next Invoice</p>
      <h1 className="text-4xl font-bold py-2">₹0.00</h1>
      <p className="flex items-center gap-2 py-2">
        <FiClock /> No date for next payment
      </p>
      <Button disabled>Pay Now</Button>
    </div>
  );
};

export default NextInvoice;
