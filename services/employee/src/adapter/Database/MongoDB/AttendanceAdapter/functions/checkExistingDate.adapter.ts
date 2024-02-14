import { Attendance } from "../../../../../Entities/Attendance";
import AttendanceModal from "../../Modal/AttendanceModel";

export const checkExistingDate = async (attendance: Attendance) => {
  try {
    const newAttendance = await AttendanceModal.findOne({
      employeeId: attendance.employeeId,
      date: {
        $gte: new Date(new Date(attendance.date).setHours(0, 0, 0)),
        $lt: new Date(new Date(attendance.date).setHours(23, 59, 59)),
      },
    });

    return newAttendance as Attendance;
  } catch (error) {
    console.log("AttendanceAdapter: checkExistingDate -> error", error);
    return false;
  }
};
