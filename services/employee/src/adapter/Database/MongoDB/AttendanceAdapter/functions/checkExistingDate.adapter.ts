import { Attendance } from "../../../../../Entities/Attendance";
import AttendanceModal from "../../Modal/AttendanceModel";

export const checkExistingDate = async (attendance: Attendance) => {
  try {
    const newAttendance = await AttendanceModal.findOne({
      date: attendance.date,
    });
    return newAttendance as Attendance;
  } catch (error) {
    console.log("AttendanceAdapter: checkExistingDate -> error", error);
    return false;
  }
};
