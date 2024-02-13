"use client";
import { getAttendanceByUserId } from "@/app/lib/features/attendance/attendanceActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import React, { useEffect } from "react";
import { AttendanceRow } from "./AttendanceRow";
import EmptyProject from "@/components/empty/EmptyProjects";
import { useSearchParams } from "next/navigation";
import AttendanceBarChart from "./AttendanceBarChart";

interface Props {
  id: string;
}

const AttendanceList = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const { attendances } = useAppSelector((state) => state.attendance);

  useEffect(() => {
    let filter = [];
    if (from) {
      filter.push(`from=${from}`);
    }
    if (to) {
      filter.push(`to=${to}`);
    }
    dispatch(getAttendanceByUserId({ userSlug: id, filter: filter.join("&") }));
  }, [dispatch, from, to, searchParams, id]);

  return (
    <div>
      {attendances && attendances.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <AttendanceBarChart data={attendances} />
          <AttendanceRow attendances={attendances} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <EmptyProject />
          <p className="mt-2">No attendance were marked so far</p>
          <p className="text-sm py-2">
            Click on the above button to add an attendance
          </p>
        </div>
      )}
    </div>
  );
};

export default AttendanceList;
