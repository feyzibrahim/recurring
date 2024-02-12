"use client";
import { getAttendanceByUserId } from "@/app/lib/features/attendance/attendanceActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import React, { useEffect } from "react";
import { AttendanceRow } from "./AttendanceRow";
import EmptyProject from "@/components/empty/EmptyProjects";
import { useSearchParams } from "next/navigation";

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
  }, [dispatch, from, to, searchParams]);

  return (
    <div>
      {attendances && attendances.length > 0 ? (
        <AttendanceRow attendances={attendances} />
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
