import { Button } from "@/components/ui/button";
import React from "react";
import { HiCheckCircle } from "react-icons/hi";
import SubscribeButton from "./SubscribeButton";

export default function SubCards({
  pro,
  business,
}: {
  pro: string;
  business: string;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-8 lg:px-16 mx-36">
      <div className="bg-backgroundAccent rounded-xl p-5">
        <h4 className="text-xl font-bold text-white">Pro</h4>
        <p className="text-white">
          Experiment the power of infinite possibilities
        </p>
        <h1 className="text-4xl py-3 font-bold ">₹{pro}</h1>
        <div className="flex flex-col gap-3 bg-background px-5 pt-10 rounded-xl text-left">
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            All the features of free plan
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            20 Employees
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />5 Departments
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            10 Video Meetings/Month
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            Salary Payroll
          </p>
          <SubscribeButton title="Subscribe to Pro" value={pro} />
        </div>
      </div>
      <div className="bg-backgroundAccent rounded-xl p-5">
        <h4 className="text-xl font-bold">Business</h4>
        <p className="text-foregroundAccent">
          Unveil new superpowers and join the Design League
        </p>
        <h1 className="text-4xl py-3 font-bold">₹{business}</h1>
        <div className="flex flex-col gap-3 bg-background px-5 pt-10 rounded-xl text-left">
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            All the features of pro plan
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            Unlimited Employee
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            Unlimited Departments
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            Unlimited Meetings
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            Dedicated Service
          </p>
          <SubscribeButton title="Subscribe to Business" value={business} />
        </div>
      </div>
    </div>
  );
}
