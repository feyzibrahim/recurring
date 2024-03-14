"use client";
import InputBox from "@/components/common/InputBox";
import { Label } from "@/components/ui/label";
import EditButton from "./EditButton";
import { useEffect, useState } from "react";
import { LeavePolicyTypes } from "@/constants/Types";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";

const LeavePolicy = () => {
  const [leavePolicy, setLeavePolicy] = useState<LeavePolicyTypes>();
  useEffect(() => {
    const loadData = async () => {
      const data = await actualCommonRequest({
        route: API_ROUTES.EMPLOYEE,
        method: "GET",
        url: "/api/leavePolicy",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLeavePolicy(data.leavePolicy);
    };

    loadData();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Leave policy</h1>
      </div>

      <div className="md:w-1/2 mb-5">
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">Casual leaves:</p>
          </Label>
          <InputBox data={leavePolicy && leavePolicy.casualLeave} />
        </div>
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">Sick Leaves:</p>
          </Label>
          <InputBox data={leavePolicy && leavePolicy.sickLeave} />
        </div>
      </div>
      {leavePolicy && <EditButton organization={leavePolicy.organization} />}
    </>
  );
};

export default LeavePolicy;
