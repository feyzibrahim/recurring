import React from "react";
import { HiCheckCircle } from "react-icons/hi";
import { Button } from "../ui/button";

export default function SubCards({
  pro,
  business,
}: {
  pro: string;
  business: string;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 py-8 lg:px-16">
      <div className="bg-backgroundAccent rounded-xl p-5">
        <h4 className="text-xl font-bold">Free</h4>
        <p className="text-foregroundAccent">Have a go and test your</p>
        <p className="text-foregroundAccent">superpowers</p>
        <h1 className="text-4xl py-3 font-bold">₹0</h1>
        <div className="flex flex-col gap-3 bg-background px-5 pt-10 rounded-xl text-left">
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />5 Employee
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />2 Departments
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            Public Share & Comments
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />
            Chat Support{" "}
          </p>
          <p className="flex gap-2 items-center">
            <HiCheckCircle className="text-primary text-xl" />5 Projects
          </p>
          <Button className="my-5">Sign Up for free</Button>
        </div>
      </div>
      <div className="bg-primary rounded-xl p-5">
        <h4 className="text-xl font-bold text-white">Pro</h4>
        <p className="text-white">
          Experiment the power of infinite possibilities
        </p>
        <h1 className="text-4xl py-3 font-bold text-white">₹{pro}</h1>
        <div className="flex flex-col gap-3 bg-white text-black px-5 pt-10 rounded-xl text-left">
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
          <Button className="my-5">Goto pro</Button>
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
          <Button className="my-5">Goto Business</Button>
        </div>
      </div>
    </div>
  );
}
