import { Attendance } from "../../../../../Entities/Attendance";
import AttendanceModal from "../../Modal/AttendanceModel";

export const updateAttendance = async (attendance: Attendance) => {
  console.log(
    "file: updateAttendance.adapter.ts:5 -> updateAttendance -> attendance",
    attendance
  );
  try {
    const updatedAttendance = await AttendanceModal.findOneAndUpdate(
      { employeeId: attendance.employeeId },
      { $set: attendance },
      { new: true }
    );

    return updatedAttendance as Attendance;
  } catch (error) {
    console.log("AttendanceAdapter: updateAttendance -> error", error);
    return false;
  }
};
