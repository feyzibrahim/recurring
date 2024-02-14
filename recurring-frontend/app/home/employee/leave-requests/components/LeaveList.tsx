"use client";

import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import React, { useEffect } from "react";
import EmptyProject from "@/components/empty/EmptyProjects";
import { useSearchParams } from "next/navigation";
import { LeaveTable } from "./LeaveTable";
import { getLeavesForUser } from "@/app/lib/features/leave/leaveActions";

const LeaveList = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const { leaves } = useAppSelector((state) => state.leave);
  console.log("file: LeaveList.tsx:17 -> LeaveList -> leaves", leaves);

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

  return (
    <div>
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
