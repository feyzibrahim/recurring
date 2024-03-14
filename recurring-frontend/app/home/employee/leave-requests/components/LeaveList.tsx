"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import React, { useEffect, useState } from "react";
import EmptyProject from "@/components/empty/EmptyProjects";
import { useSearchParams } from "next/navigation";
import { LeaveTable } from "./LeaveTable";
import { getLeavesForUser } from "@/app/lib/features/leave/leaveActions";
import { LeavePolicyTypes } from "@/constants/Types";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";

const LeaveList = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const [leavePolicy, setLeavePolicy] = useState<LeavePolicyTypes>();
  const { leaves } = useAppSelector((state) => state.leave);

  useEffect(() => {
    let filter = [];
    if (from) {
      filter.push(`from=${from}`);
    }
    if (to) {
      filter.push(`to=${to}`);
    }
    dispatch(getLeavesForUser({ filter: filter.join("&") }));
  }, [dispatch, from, to, searchParams]);

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
    <div>
      <div>
        <p>Available Leaves this month: </p>{" "}
        {leaves &&
          leavePolicy &&
          leavePolicy.sickLeave + leavePolicy.casualLeave - leaves.length}
        /{leavePolicy && leavePolicy.sickLeave + leavePolicy.casualLeave}
      </div>
      {leaves && leaves.length > 0 ? (
        <LeaveTable leaves={leaves} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <EmptyProject />
          <p className="mt-2">No Leaves were requested so far</p>
          <p className="text-sm py-2">
            Click on the above button to request a leave
          </p>
        </div>
      )}
    </div>
  );
};

export default LeaveList;
