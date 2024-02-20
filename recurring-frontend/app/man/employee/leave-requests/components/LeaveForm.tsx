"use client";

import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useEffect } from "react";
import { removeErrorOnClose } from "@/app/lib/features/attendance/attendanceSlice";
import { Button } from "@/components/ui/button";
import { LeaveTypes } from "@/constants/Types";
import { editLeave } from "@/app/lib/features/leave/leaveActions";

interface PropsTypes {
  setIsModalOpen: any;
  leave: LeaveTypes;
}

export default function LeaveForm({ setIsModalOpen, leave }: PropsTypes) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.attendance);

  async function handleClick(status: string) {
    const values = {
      _id: leave._id,
      status: status,
      employeeId: leave.employeeId,
    };
    const data = await dispatch(editLeave(values));
    if (editLeave.fulfilled.match(data)) {
      setIsModalOpen(false);
    }
  }

  useEffect(() => {
    return () => {
      dispatch(removeErrorOnClose());
    };
  }, [dispatch]);

  return (
    <div>
      <p>Reason</p>
      <div className="bg-backgroundAccent p-2 rounded-sm mb-3">
        <h2>{leave.reason}</h2>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex gap-2">
        <Button
          className="w-full"
          disabled={loading}
          variant="destructive"
          onClick={() => handleClick("reject")}
        >
          {loading ? "Loading..." : "Reject"}
        </Button>
        <Button
          className="w-full"
          disabled={loading}
          onClick={() => handleClick("approve")}
        >
          {loading ? "Loading..." : "Approve"}
        </Button>
      </div>
    </div>
  );
}
